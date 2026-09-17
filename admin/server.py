"""
心援计划 · 本地内容后台
在项目根目录运行：  python admin/server.py
然后打开：  http://127.0.0.1:8780/admin/
"""
from __future__ import print_function

import json
import os
import re
import sys
import base64
import socket
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
try:
    from http.server import ThreadingHTTPServer
except ImportError:
    ThreadingHTTPServer = HTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
UPLOAD = os.path.join(ROOT, "image", "uploads")
PORT = 8780
HOST = "0.0.0.0"


def lan_ip():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        sock.close()
MAX_BODY = 32 * 1024 * 1024
SAFE_ID = re.compile(r"^[a-zA-Z0-9_-]{1,64}$")
SAFE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def read_json(name, fallback):
    path = os.path.join(CONTENT, name)
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return fallback


def write_json(name, data):
    os.makedirs(CONTENT, exist_ok=True)
    path = os.path.join(CONTENT, name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def load_pack():
    return {
        "shop": read_json("shop.json", {"cats": [], "items": []}),
        "wardrobe": read_json("wardrobe.json", {"cats": [], "items": []}),
        "cards": read_json("cards.json", {"cards": {}}),
        "quiz": read_json("quiz.json", {"questions": []}),
        "plan": read_json("plan.json", {"title": "今日计划", "items": []}),
        "medals": read_json("medals.json", {"items": []}),
    }


def write_bundle(pack):
    os.makedirs(CONTENT, exist_ok=True)
    text = (
        "var HG_CONTENT = "
        + json.dumps(pack, ensure_ascii=False, indent=2)
        + ";\n"
        + "if (typeof module !== 'undefined' && module.exports) module.exports = HG_CONTENT;\n"
    )
    with open(os.path.join(CONTENT, "bundle.js"), "w", encoding="utf-8") as f:
        f.write(text)


def normalize_wardrobe(wardrobe):
    items = wardrobe.get("items") if isinstance(wardrobe.get("items"), list) else []
    for it in items:
        if not isinstance(it, dict):
            continue
        if it.get("iconSrc") and not it.get("wearSrc"):
            it["wearSrc"] = it["iconSrc"]
        if it.get("icon") and not it.get("wear"):
            it["wear"] = it["icon"]
        if not it.get("icon") and it.get("id"):
            it["icon"] = it["id"]
    return wardrobe


def save_pack(pack):
    if not isinstance(pack, dict):
        raise ValueError("内容格式不对")
    shop = pack.get("shop") if isinstance(pack.get("shop"), dict) else {}
    wardrobe = normalize_wardrobe(pack.get("wardrobe") if isinstance(pack.get("wardrobe"), dict) else {})
    cards = pack.get("cards") if isinstance(pack.get("cards"), dict) else {}
    quiz = pack.get("quiz") if isinstance(pack.get("quiz"), dict) else {}
    plan = pack.get("plan") if isinstance(pack.get("plan"), dict) else {}
    medals = pack.get("medals") if isinstance(pack.get("medals"), dict) else {}
    write_json("shop.json", shop)
    write_json("wardrobe.json", wardrobe)
    write_json("cards.json", cards)
    write_json("quiz.json", quiz)
    write_json("plan.json", plan)
    write_json("medals.json", medals)
    merged = {"shop": shop, "wardrobe": wardrobe, "cards": cards, "quiz": quiz, "plan": plan, "medals": medals}
    write_bundle(merged)
    return merged


def save_upload(payload):
    module = str(payload.get("module") or "misc")
    item_id = str(payload.get("id") or "")
    filename = str(payload.get("name") or "icon.png")
    data = payload.get("data") or ""
    if module not in ("shop", "wardrobe", "cards", "quiz", "plan", "medals"):
        raise ValueError("不能传到这个模块")
    if not SAFE_ID.match(item_id):
        raise ValueError("编号只能用字母、数字、下划线和短横线")
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".jpeg":
        ext = ".jpg"
    if ext not in SAFE_EXT:
        raise ValueError("图片请用 png / jpg / webp")
    if "," in data:
        data = data.split(",", 1)[1]
    raw = base64.b64decode(data)
    if len(raw) > 24 * 1024 * 1024:
        raise ValueError("图片太大了")
    folder = os.path.join(UPLOAD, module)
    os.makedirs(folder, exist_ok=True)
    rel = "image/uploads/%s/%s%s" % (module, item_id, ext)
    abs_path = os.path.join(ROOT, *rel.split("/"))
    with open(abs_path, "wb") as f:
        f.write(raw)
    return {"src": rel}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def _send(self, code, payload, ctype="application/json; charset=utf-8"):
        body = payload if isinstance(payload, bytes) else json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        path = self.path.split("?", 1)[0]
        if (
            path.startswith("/content/")
            or path.startswith("/image/uploads/")
            or path.endswith("/game.js")
            or path.endswith("preview.html")
        ):
            self.send_header("Cache-Control", "no-store")
        SimpleHTTPRequestHandler.end_headers(self)

    def _read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length > MAX_BODY:
            raise ValueError("内容太大了")
        return self.rfile.read(length)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/content":
            self._send(200, load_pack())
            return
        if path == "/admin" or path == "/admin/":
            self.path = "/admin/index.html"
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_PUT(self):
        path = self.path.split("?", 1)[0]
        if path != "/api/content":
            self._send(404, {"error": "没有这个接口"})
            return
        try:
            pack = json.loads(self._read_body().decode("utf-8"))
            saved = save_pack(pack)
            self._send(200, {"ok": True, "content": saved})
        except Exception as err:
            self._send(400, {"error": str(err)})

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path != "/api/upload":
            self._send(404, {"error": "没有这个接口"})
            return
        try:
            payload = json.loads(self._read_body().decode("utf-8"))
            result = save_upload(payload)
            self._send(200, result)
        except Exception as err:
            self._send(400, {"error": str(err)})


def open_play(delay=0):
    if "--open" not in sys.argv:
        return

    def _go():
        try:
            import webbrowser
            webbrowser.open("http://127.0.0.1:%s/" % PORT)
        except Exception:
            pass

    if delay and delay > 0:
        threading.Timer(delay, _go).start()
    else:
        _go()


def main():
    os.makedirs(CONTENT, exist_ok=True)
    os.makedirs(UPLOAD, exist_ok=True)
    write_bundle(load_pack())
    try:
        server = ThreadingHTTPServer((HOST, PORT), Handler)
    except OSError:
        print("端口 %s 已被占用，正在打开已有页面" % PORT, flush=True)
        print("H5 游玩: http://127.0.0.1:%s/" % PORT, flush=True)
        open_play()
        return
    ip = lan_ip()
    print("H5 游玩: http://127.0.0.1:%s/" % PORT, flush=True)
    if ip and ip != "127.0.0.1":
        print("同网手机: http://%s:%s/" % (ip, PORT), flush=True)
    print("内容后台: http://127.0.0.1:%s/admin/" % PORT, flush=True)
    print("按 Ctrl+C 停止", flush=True)
    open_play(0.5)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止")
        server.server_close()


if __name__ == "__main__":
    main()
