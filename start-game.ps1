# 心援计划：本地一键启动（由 启动游戏.bat 调用）
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 8780
$PlayUrl = "http://127.0.0.1:$Port/"

Set-Location -LiteralPath $Root
try { [Console]::Title = "HeartGuard" } catch {}

function Test-PortOpen {
    $client = $null
    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $client.ReceiveTimeout = 300
        $client.SendTimeout = 300
        $client.Connect("127.0.0.1", $Port)
        return $client.Connected
    } catch {
        return $false
    } finally {
        if ($client) { $client.Close() }
    }
}

function Open-Game {
    Start-Process $PlayUrl
}

function Test-Python3 {
    param(
        [Parameter(Mandatory = $true)][string]$File,
        [string[]]$PrefixArgs = @()
    )
    try {
        $out = & $File @PrefixArgs -c "import sys; print(1 if sys.version_info >= (3, 7) else 0)" 2>$null
        return ($out -match "1")
    } catch {
        return $false
    }
}

Write-Host ""
Write-Host "  HeartGuard / XinYuan"
Write-Host "  Local play page"
Write-Host ""

$need = @(
    "index.html",
    "game.js",
    "content\bundle.js",
    "image\home\bg.png",
    "godot-heart\heart-walk\parts\body.png",
    "admin\server.py"
)
$missing = @()
foreach ($rel in $need) {
    if (-not (Test-Path -LiteralPath (Join-Path $Root $rel))) { $missing += $rel }
}
if ($missing.Count -gt 0) {
    Write-Host "Folder incomplete, missing:"
    $missing | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    Write-Host "Unzip the whole archive to one folder, then run start-game.bat"
    Write-Host "Do not open index.html directly."
    Read-Host "Press Enter to exit"
    exit 1
}

if (Test-PortOpen) {
    Write-Host "Server already running, opening game..."
    Write-Host "  $PlayUrl"
    Open-Game
    Start-Sleep -Seconds 2
    exit 0
}

$py = $null
if (Test-Python3 -File "py" -PrefixArgs @("-3")) {
    $py = @{ File = "py"; Args = @("-3", "admin/server.py", "--open") }
} elseif (Test-Python3 -File "python") {
    $py = @{ File = "python"; Args = @("admin/server.py", "--open") }
} elseif (Test-Python3 -File "python3") {
    $py = @{ File = "python3"; Args = @("admin/server.py", "--open") }
}

if ($py) {
    Write-Host "Starting local server..."
    Write-Host "  $PlayUrl"
    Write-Host "Close this window to stop."
    Write-Host ""
    & $py.File @($py.Args)
    exit $LASTEXITCODE
}

Write-Host "Python 3.7+ not found, using built-in HTTP listener..."
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($PlayUrl)
try {
    $listener.Start()
} catch {
    $err = $_.Exception.Message
    Write-Host "Start failed: $err"
    Write-Host "Install Python 3 (check Add python.exe to PATH), then run start-game.bat again."
    Read-Host "Press Enter to exit"
    exit 1
}

$mimes = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".mp3"  = "audio/mpeg"
    ".wav"  = "audio/wav"
    ".ogg"  = "audio/ogg"
    ".ttf"  = "font/ttf"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".wasm" = "application/wasm"
    ".ico"  = "image/x-icon"
}

$rootFull = [System.IO.Path]::GetFullPath($Root).TrimEnd("\", "/") + [IO.Path]::DirectorySeparatorChar
Open-Game
Write-Host "Play: $PlayUrl"
Write-Host "Close this window to stop."
Write-Host ""

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    try {
        $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
        if ([string]::IsNullOrWhiteSpace($rel) -or $rel -eq "/") { $rel = "/index.html" }
        $rel = $rel.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
        $full = [System.IO.Path]::GetFullPath((Join-Path $rootFull $rel))
        if (-not $full.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
            $res.StatusCode = 403
        } elseif (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
            $res.StatusCode = 404
        } else {
            $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
            if ($mimes.ContainsKey($ext)) { $res.ContentType = $mimes[$ext] }
            else { $res.ContentType = "application/octet-stream" }
            if ($rel -match "content\\|game\.js$") {
                $res.AddHeader("Cache-Control", "no-store")
            }
            $bytes = [IO.File]::ReadAllBytes($full)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
    } catch {
        try { $res.StatusCode = 500 } catch {}
    } finally {
        try { $res.OutputStream.Close() } catch {}
    }
}
