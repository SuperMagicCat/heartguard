(function () {
  var SUITS = [
    { id: 'spade', name: '黑桃' },
    { id: 'club', name: '梅花' },
    { id: 'diamond', name: '方块' },
    { id: 'heart', name: '红心' }
  ]
  var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  var BONUS = [
    { id: 'mag', name: '镁' },
    { id: 'coq10', name: '辅酶 Q10' },
    { id: 'omega3', name: 'Omega-3' }
  ]
  var PHOTO_SPEC = {
    shop: { w: 512, h: 512, label: '物品照片', tip: '建议 512×512 px，PNG 透明底。游戏会按原比例缩小，请不要把图拉变形。' },
    wardrobe: { w: 512, h: 512, label: '物品照片', tip: '建议 512×512 px，PNG 透明底。游戏会按原比例缩小，请不要把图拉变形。' },
    cards: { w: 1024, h: 736, maxEdge: 1600, label: '正面插画', tip: '任意尺寸都能传，过大的图会自动缩小。建议横图、透明底 PNG。' },
    plan: { w: 256, h: 256, label: '奖励图标（可选）', tip: '建议 256×256 px，PNG 透明底。不上传则用心跳币爱心或水滴。' },
    medals: { w: 512, h: 640, label: '徽章图片', tip: '建议 512×640 px，PNG 透明底。竖图，含绶带和圆牌，游戏会按原比例缩小。' }
  }
  var HINTS = {
    shop: ['商城', '食品吃下后直接增加对应元素。加成数值填整数，例如 3 表示 +3。关掉「上架」后，游戏里就看不到它。'],
    wardrobe: ['衣橱', '穿上后提高对应元素获得率。加成数值填小数，例如 0.08 表示 +8%。衣服 / 饰品 / 鞋履 各占一个槽位。'],
    cards: ['卡牌库', '上传卡牌插画、标题和知识说明，再绑定到扑克槽位。图片多大都能选，后台会自动缩小。'],
    plan: ['计划', '今日计划条目可自由增删改。登录类进入游戏即完成，勾选类由玩家自己点完成。'],
    medals: ['徽章', '和卡牌一样左右滑动查看。可自由添加徽章图、名称和获得说明。'],
    quiz: ['知识问答', '快问快答题库。难度 1～3 会按现在的出题循环使用。']
  }

  var state = {
    tab: 'shop',
    pack: null,
    dirty: false,
    selected: { shop: '', wardrobe: '', library: 'deep-fish', plan: '', medals: '' }
  }

  function $(id) { return document.getElementById(id) }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
  }
  function copy(v) { return JSON.parse(JSON.stringify(v)) }
  function markDirty() {
    state.dirty = true
    var el = $('saveState')
    el.textContent = '有未保存的修改'
    el.className = 'dirty'
  }
  function markClean(text) {
    state.dirty = false
    var el = $('saveState')
    el.textContent = text || '已保存'
    el.className = text ? 'ok' : ''
  }
  function toast(text, ok) {
    var el = $('saveState')
    el.textContent = text
    el.className = ok ? 'ok' : 'dirty'
  }
  function newId(prefix, used) {
    var n = 1
    var id = prefix + '-' + n
    while (used[id]) { n += 1; id = prefix + '-' + n }
    return id
  }
  function usedIds(items) {
    var map = {}
    items.forEach(function (it) { map[it.id] = true })
    return map
  }
  function cardKey(suit, rank) { return suit + '-' + rank }
  function suitName(id) {
    var i
    for (i = 0; i < SUITS.length; i++) {
      if (SUITS[i].id === id) return SUITS[i].name
    }
    return id
  }
  function slotLabel(slot) {
    if (!slot) return '未绑定扑克'
    var i = String(slot).indexOf('-')
    if (i < 0) return slot
    return suitName(slot.slice(0, i)) + ' ' + slot.slice(i + 1)
  }
  function hasCardContent(it) {
    return !!(it && (it.title || it.desc || it.artSrc || it.art))
  }
  function ensureCardLibrary() {
    var data = state.pack.cards
    if (!data || typeof data !== 'object') {
      state.pack.cards = { cost: 5, library: [], cards: {} }
      data = state.pack.cards
    }
    if (!Array.isArray(data.library)) data.library = []
    if (!data.cards || typeof data.cards !== 'object') data.cards = {}
    var cost = Number(data.cost)
    if (!cost || cost < 1) data.cost = 5
    if (data.library.length) return
    Object.keys(data.cards).forEach(function (key) {
      var c = data.cards[key]
      if (!hasCardContent(c)) return
      data.library.push({
        id: c.art && c.art !== 'fish' ? String(c.art).replace(/\s+/g, '-') : ('card-' + key.replace(/[^a-z0-9]+/gi, '-')),
        title: c.title || '',
        desc: c.desc || '',
        art: c.art || '',
        artSrc: c.artSrc || '',
        slot: key,
        owned: !!c.owned
      })
    })
  }
  function syncCardsFromLibrary() {
    ensureCardLibrary()
    var map = {}
    state.pack.cards.library.forEach(function (it) {
      if (!it || !it.slot) return
      map[it.slot] = {
        title: it.title || '',
        desc: it.desc || '',
        art: it.art || it.id || '',
        artSrc: it.artSrc || '',
        owned: !!it.owned
      }
    })
    state.pack.cards.cards = map
  }
  function slotOptions(currentId, currentSlot) {
    var used = {}
    state.pack.cards.library.forEach(function (it) {
      if (it && it.slot && it.id !== currentId) used[it.slot] = it.title || it.id
    })
    var html = '<option value="">暂不绑定扑克牌</option>'
    SUITS.forEach(function (s) {
      html += '<optgroup label="' + esc(s.name) + '">'
      RANKS.forEach(function (r) {
        var key = cardKey(s.id, r)
        var taken = used[key]
        html += '<option value="' + esc(key) + '"' + (key === currentSlot ? ' selected' : '') + '>'
          + esc(s.name + ' ' + r + (taken ? '（已绑 ' + taken + '）' : ''))
          + '</option>'
      })
      html += '</optgroup>'
    })
    return html
  }
  function photoBlock(kind) {
    var spec = PHOTO_SPEC[kind] || PHOTO_SPEC.shop
    return ''
      + '<div class="photo-field">'
      + '<div class="list-head"><b>' + esc(spec.label) + '</b><span class="size-note">' + (kind === 'cards' ? '自动适配 · 最大边 ' + (spec.maxEdge || 1600) + ' px' : spec.w + ' × ' + spec.h + ' px') + '</span></div>'
      + '<div class="preview-row">'
      + '<img id="iconPrev"' + (kind === 'cards' ? ' class="card-art"' : '') + ' alt="">'
      + '<div><input type="file" id="iconFile" accept="image/png,image/jpeg,image/webp">'
      + '<p class="hint">' + esc(spec.tip) + '</p></div></div></div>'
  }

  function bindValue(el, get, set) {
    el.value = get()
    el.addEventListener('input', function () {
      set(el.type === 'number' ? Number(el.value) : el.value)
      markDirty()
    })
    el.addEventListener('change', function () {
      set(el.type === 'number' ? Number(el.value) : el.value)
      markDirty()
      if (state.tab === 'shop' || state.tab === 'wardrobe' || state.tab === 'cards' || state.tab === 'plan' || state.tab === 'medals') render()
    })
  }

  function itemList(kind) {
    var data = state.pack[kind]
    var selected = state.selected[kind] || (data.items[0] && data.items[0].id) || ''
    state.selected[kind] = selected
    var item = data.items.filter(function (it) { return it.id === selected })[0] || null
    var html = '<div class="layout"><div class="panel"><div class="list-head"><b>列表</b><button type="button" id="btnAdd">新增</button></div>'
    if (!data.items.length) html += '<p class="empty">还没有条目</p>'
    data.items.forEach(function (it) {
      html += '<button type="button" class="item' + (it.id === selected ? ' on' : '') + '" data-id="' + esc(it.id) + '">'
      html += it.iconSrc ? '<img src="/' + esc(it.iconSrc) + '" alt="">' : '<span class="thumb"></span>'
      html += '<div><b>' + esc(it.name || it.id) + '</b><span>' + esc(it.cat) + ' · ' + (it.on === false ? '已下架' : it.price + ' 币') + '</span></div></button>'
    })
    html += '</div><div class="panel">'
    if (!item) html += '<p class="empty">选一条开始编辑</p>'
    else {
      html += '<div class="form" id="itemForm"></div>'
    }
    html += '</div></div>'
    $('view').innerHTML = html
    $('view').querySelectorAll('.item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selected[kind] = btn.getAttribute('data-id')
        render()
      })
    })
    $('btnAdd').addEventListener('click', function () {
      var id = newId(kind === 'shop' ? 'food' : 'wear', usedIds(data.items))
      var fresh = {
        id: id,
        cat: data.cats[0] ? data.cats[0].id : '',
        name: '新物品',
        price: kind === 'shop' ? 80 : 280,
        bonusKey: 'mag',
        bonus: kind === 'shop' ? 3 : 0.08,
        bonusText: '',
        desc: '',
        icon: id,
        iconSrc: 'image/hub/item_placeholder.png',
        wear: id,
        wearSrc: '',
        placeholder: true,
        on: true
      }
      fresh.bonusText = makeBonusText(kind, fresh)
      data.items.push(fresh)
      state.selected[kind] = id
      markDirty()
      render()
      save()
    })
    if (item) fillItemForm(kind, item, data)
  }

  function fullBonusName(key) {
    if (key === 'coq10') return '辅酶 Q10'
    if (key === 'omega3') return 'Omega-3'
    return '镁元素'
  }

  function makeBonusText(kind, item) {
    var name = fullBonusName(item.bonusKey)
    var n = Number(item.bonus) || 0
    if (kind === 'wardrobe') {
      var pct = Math.round(n * 1000) / 10
      if (Math.abs(pct - Math.round(pct)) < 0.05) pct = Math.round(pct)
      return name + '的获得率 + ' + pct + '%'
    }
    return name + ' +' + (Math.round(n * 10) / 10)
  }

  function fillItemForm(kind, item, data) {
    var form = $('itemForm')
    var catOpts = data.cats.map(function (c) {
      return '<option value="' + esc(c.id) + '"' + (c.id === item.cat ? ' selected' : '') + '>' + esc(c.title) + '</option>'
    }).join('')
    var bonusOpts = BONUS.map(function (b) {
      return '<option value="' + b.id + '"' + (b.id === item.bonusKey ? ' selected' : '') + '>' + b.name + '</option>'
    }).join('')
    var bonusLabel = kind === 'wardrobe' ? '获得率（0.08 = +8%）' : '增加数量'
    var bonusStep = kind === 'wardrobe' ? '0.01' : '1'
    form.innerHTML = ''
      + '<div class="list-head"><b>编辑</b><button type="button" class="danger" id="btnDel">删除</button></div>'
      + photoBlock(kind)
      + '<div class="grid-2"><label>编号<input id="fId"></label><label>分类<select id="fCat">' + catOpts + '</select></label></div>'
      + '<label>名称<input id="fName"></label>'
      + '<div class="grid-2"><label>价格<input id="fPrice" type="number" min="0"></label><label>营养种类<select id="fBonus">' + bonusOpts + '</select></label></div>'
      + '<div class="grid-2"><label>' + bonusLabel + '<input id="fBonusVal" type="number" step="' + bonusStep + '"></label><label>加成说明<input id="fBonusText"></label></div>'
      + '<label>介绍<textarea id="fDesc"></textarea></label>'
      + '<label class="check"><input id="fOn" type="checkbox"> 上架（游戏里可见）</label>'

    $('iconPrev').src = item.iconSrc ? '/' + item.iconSrc + '?t=' + Date.now() : ''
    bindValue($('fId'), function () { return item.id }, function (v) {
      var old = item.id
      item.id = String(v || old).replace(/\s+/g, '-')
      item.icon = item.icon === old ? item.id : item.icon
      state.selected[kind] = item.id
    })
    bindValue($('fCat'), function () { return item.cat }, function (v) { item.cat = v })
    bindValue($('fName'), function () { return item.name }, function (v) { item.name = v })
    bindValue($('fPrice'), function () { return item.price }, function (v) { item.price = isNaN(v) ? 0 : v })
    bindValue($('fBonus'), function () { return item.bonusKey }, function (v) {
      item.bonusKey = v
      item.bonusText = makeBonusText(kind, item)
      if ($('fBonusText')) $('fBonusText').value = item.bonusText
    })
    bindValue($('fBonusVal'), function () { return item.bonus }, function (v) {
      item.bonus = isNaN(v) ? 0 : v
      item.bonusText = makeBonusText(kind, item)
      if ($('fBonusText')) $('fBonusText').value = item.bonusText
    })
    bindValue($('fBonusText'), function () { return item.bonusText }, function (v) { item.bonusText = v })
    bindValue($('fDesc'), function () { return item.desc }, function (v) { item.desc = v })
    $('fOn').checked = item.on !== false
    $('fOn').addEventListener('change', function () {
      item.on = $('fOn').checked
      markDirty()
      render()
    })
    $('btnDel').addEventListener('click', function () {
      if (!confirm('删除「' + item.name + '」？已购买的玩家会丢这件物品。')) return
      data.items = data.items.filter(function (it) { return it.id !== item.id })
      state.selected[kind] = data.items[0] ? data.items[0].id : ''
      markDirty()
      render()
    })
    $('iconFile').addEventListener('change', function () {
      var file = $('iconFile').files[0]
      if (!file) return
      uploadIcon(kind, item, file)
    })
  }

  function uploadIcon(kind, item, file) {
    toast('正在处理图片…', true)
    prepareUpload(kind, file).then(function (ready) {
      return fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: kind === 'cards' ? 'cards' : kind,
          id: item.id || item.art || 'icon',
          name: ready.name,
          data: ready.data
        })
      })
    }).then(function (res) { return res.json() }).then(function (out) {
      if (out.error) throw new Error(out.error)
      if (kind === 'cards') {
        item.artSrc = out.src
        item.art = item.art || item.id || 'art'
        syncCardsFromLibrary()
      } else {
        item.iconSrc = out.src
        item.icon = item.icon || item.id
        item.placeholder = false
        if (kind === 'wardrobe') {
          item.wearSrc = out.src
          item.wear = item.wear || item.icon
        }
      }
      markDirty()
      render()
      save()
    }).catch(function (err) {
      toast(err.message || '上传失败，请用 python admin/server.py 启动后台', false)
    })
  }

  function prepareUpload(kind, file) {
    return new Promise(function (resolve, reject) {
      var spec = PHOTO_SPEC[kind] || {}
      var maxEdge = spec.maxEdge || 0
      var reader = new FileReader()
      reader.onerror = function () { reject(new Error('读图失败')) }
      reader.onload = function () {
        var data = reader.result
        if (!maxEdge && file.size < 2.5 * 1024 * 1024) {
          resolve({ name: file.name, data: data })
          return
        }
        var img = new Image()
        img.onload = function () {
          var w = img.naturalWidth || img.width
          var h = img.naturalHeight || img.height
          if (!w || !h) {
            reject(new Error('图片读不出宽高'))
            return
          }
          var edge = maxEdge || Math.max(spec.w || 1024, spec.h || 1024, 1024)
          var scale = Math.min(1, edge / Math.max(w, h))
          var heavy = file.size > 2.5 * 1024 * 1024
          if (scale >= 1 && !heavy) {
            resolve({ name: file.name, data: data })
            return
          }
          var cw = Math.max(1, Math.round(w * scale))
          var ch = Math.max(1, Math.round(h * scale))
          var canvas = document.createElement('canvas')
          canvas.width = cw
          canvas.height = ch
          var ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, cw, ch)
          var keepAlpha = file.type === 'image/png' || /\.png$/i.test(file.name)
          var out = keepAlpha ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.88)
          var base = String(file.name || 'card').replace(/\.[^.]+$/, '') || 'card'
          if (out.length > 5.5 * 1024 * 1024) {
            resolve({ name: base + '.jpg', data: canvas.toDataURL('image/jpeg', 0.82) })
            return
          }
          resolve({ name: base + (keepAlpha ? '.png' : '.jpg'), data: out })
        }
        img.onerror = function () { reject(new Error('图片格式读不了，请换 png / jpg / webp')) }
        img.src = data
      }
      reader.readAsDataURL(file)
    })
  }

  function renderCards() {
    ensureCardLibrary()
    var data = state.pack.cards
    var list = data.library
    var selected = state.selected.library || (list[0] && list[0].id) || ''
    if (selected && !list.filter(function (it) { return it.id === selected }).length) {
      selected = list[0] ? list[0].id : ''
    }
    state.selected.library = selected
    var item = list.filter(function (it) { return it.id === selected })[0] || null
    var bound = 0
    list.forEach(function (it) { if (it.slot) bound += 1 })
    var html = '<div class="layout"><div class="panel"><div class="list-head"><b>上传库 · ' + list.length + ' 张</b><button type="button" id="btnAdd">新增</button></div>'
    html += '<label class="cost-field">兑换消耗（营养药丸）<input id="fCost" type="number" min="1"></label>'
    html += '<p class="hint">已绑定扑克 ' + bound + ' / 52</p>'
    html += '<div class="lib-scroll">'
    if (!list.length) html += '<p class="empty">还没有卡牌，点新增后上传插画和说明</p>'
    list.forEach(function (it) {
      html += '<button type="button" class="item' + (it.id === selected ? ' on' : '') + '" data-id="' + esc(it.id) + '">'
      html += it.artSrc ? '<img class="card-art" src="/' + esc(it.artSrc) + '" alt="">' : '<span class="thumb"></span>'
      html += '<div><b>' + esc(it.title || it.id) + '</b><span>' + esc(slotLabel(it.slot)) + (it.owned ? ' · 默认已获得' : '') + '</span></div></button>'
    })
    html += '</div></div><div class="panel">'
    if (!item) html += '<p class="empty">选一条开始编辑，或点新增上传卡牌</p>'
    else html += '<div class="form" id="cardForm"></div>'
    html += '</div></div>'
    $('view').innerHTML = html
    bindValue($('fCost'), function () { return data.cost }, function (v) {
      var n = Number(v)
      data.cost = !n || n < 1 ? 1 : Math.round(n)
    })
    $('view').querySelectorAll('.item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selected.library = btn.getAttribute('data-id')
        render()
      })
    })
    $('btnAdd').addEventListener('click', function () {
      var id = newId('card', usedIds(list))
      list.push({
        id: id,
        title: '新卡牌',
        desc: '',
        art: id,
        artSrc: '',
        slot: '',
        owned: false
      })
      state.selected.library = id
      markDirty()
      syncCardsFromLibrary()
      render()
      save()
    })
    if (!item) return
    var form = $('cardForm')
    form.innerHTML = ''
      + '<div class="list-head"><b>编辑卡牌</b><button type="button" class="danger" id="btnDel">删除</button></div>'
      + photoBlock('cards')
      + '<div class="grid-2"><label>编号<input id="fId"></label><label>绑定扑克<select id="fSlot">' + slotOptions(item.id, item.slot || '') + '</select></label></div>'
      + '<label>标题<input id="fTitle"></label>'
      + '<label>知识说明<textarea id="fDesc"></textarea></label>'
      + '<label class="check"><input id="fOwned" type="checkbox"> 进入游戏时默认已获得（调试用）</label>'
    $('iconPrev').src = item.artSrc ? '/' + item.artSrc + '?t=' + Date.now() : ''
    bindValue($('fId'), function () { return item.id }, function (v) {
      var old = item.id
      item.id = String(v || old).replace(/\s+/g, '-')
      if (item.art === old) item.art = item.id
      state.selected.library = item.id
    })
    bindValue($('fTitle'), function () { return item.title }, function (v) { item.title = v })
    bindValue($('fDesc'), function () { return item.desc }, function (v) { item.desc = v })
    $('fOwned').checked = !!item.owned
    $('fOwned').addEventListener('change', function () {
      item.owned = $('fOwned').checked
      markDirty()
      syncCardsFromLibrary()
    })
    $('fSlot').addEventListener('change', function () {
      var v = $('fSlot').value
      var other = null
      list.forEach(function (it) {
        if (it.id !== item.id && it.slot === v && v) other = it
      })
      if (other) {
        if (!confirm('「' + (other.title || other.id) + '」已经绑定这张扑克，要改绑到当前卡牌吗？')) {
          $('fSlot').value = item.slot || ''
          return
        }
        other.slot = ''
      }
      item.slot = v
      markDirty()
      syncCardsFromLibrary()
      render()
    })
    $('iconFile').addEventListener('change', function () {
      var file = $('iconFile').files[0]
      if (!file) return
      uploadIcon('cards', item, file)
    })
    $('btnDel').addEventListener('click', function () {
      if (!confirm('删除「' + (item.title || item.id) + '」？')) return
      data.library = data.library.filter(function (it) { return it.id !== item.id })
      state.selected.library = data.library[0] ? data.library[0].id : ''
      markDirty()
      syncCardsFromLibrary()
      render()
    })
  }

  function renderQuiz() {
    var list = state.pack.quiz.questions
    var html = '<div class="panel"><div class="list-head"><b>共 ' + list.length + ' 题</b><button type="button" id="btnAddQ">新增题目</button></div>'
    html += '<table class="q-table"><thead><tr><th>难度</th><th>题目</th><th>正确答案</th><th>错误项 1</th><th>错误项 2</th><th></th></tr></thead><tbody>'
    list.forEach(function (q, i) {
      html += '<tr data-i="' + i + '">'
        + '<td><select data-k="d"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></td>'
        + '<td><input data-k="q"></td>'
        + '<td><input data-k="ok"></td>'
        + '<td><input data-k="bad0"></td>'
        + '<td><input data-k="bad1"></td>'
        + '<td><button type="button" class="danger" data-del="' + i + '">删</button></td>'
        + '</tr>'
    })
    html += '</tbody></table></div>'
    $('view').innerHTML = html
    $('btnAddQ').addEventListener('click', function () {
      list.push({ id: newId('q', usedIds(list)), d: 1, q: '新的问题？', ok: '正确项', bad: ['错误项', '错误项'] })
      markDirty()
      render()
    })
    $('view').querySelectorAll('tr[data-i]').forEach(function (row) {
      var i = Number(row.getAttribute('data-i'))
      var q = list[i]
      row.querySelector('[data-k="d"]').value = String(q.d || 1)
      row.querySelector('[data-k="q"]').value = q.q || ''
      row.querySelector('[data-k="ok"]').value = q.ok || ''
      row.querySelector('[data-k="bad0"]').value = (q.bad && q.bad[0]) || ''
      row.querySelector('[data-k="bad1"]').value = (q.bad && q.bad[1]) || ''
      row.querySelectorAll('input, select').forEach(function (el) {
        el.addEventListener('input', function () { writeQuizRow(q, row); markDirty() })
        el.addEventListener('change', function () { writeQuizRow(q, row); markDirty() })
      })
    })
    $('view').querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        list.splice(Number(btn.getAttribute('data-del')), 1)
        markDirty()
        render()
      })
    })
  }

  function renderMedals() {
    var data = state.pack.medals
    if (!data.items) data.items = []
    var selected = state.selected.medals || (data.items[0] && data.items[0].id) || ''
    state.selected.medals = selected
    var item = data.items.filter(function (it) { return it.id === selected })[0] || null
    var html = '<div class="layout"><div class="panel"><div class="list-head"><b>列表</b><button type="button" id="btnAdd">新增</button></div>'
    if (!data.items.length) html += '<p class="empty">还没有徽章</p>'
    data.items.forEach(function (it) {
      html += '<button type="button" class="item' + (it.id === selected ? ' on' : '') + '" data-id="' + esc(it.id) + '">'
      html += it.iconSrc ? '<img src="/' + esc(it.iconSrc) + '" alt="">' : '<span class="thumb"></span>'
      html += '<div><b>' + esc(it.title || it.id) + '</b><span>' + (it.owned ? '默认已获得' : '未获得') + (it.on === false ? ' · 已下架' : '') + '</span></div></button>'
    })
    html += '</div><div class="panel">'
    if (!item) html += '<p class="empty">选一条开始编辑</p>'
    else html += '<div class="form" id="itemForm"></div>'
    html += '</div></div>'
    $('view').innerHTML = html
    $('view').querySelectorAll('.item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selected.medals = btn.getAttribute('data-id')
        render()
      })
    })
    $('btnAdd').addEventListener('click', function () {
      var id = newId('medal', usedIds(data.items))
      data.items.push({
        id: id,
        title: '新徽章',
        desc: '',
        tone: 'gold',
        icon: id,
        iconSrc: '',
        owned: false,
        on: true
      })
      state.selected.medals = id
      markDirty()
      render()
    })
    if (!item) return
    var form = $('itemForm')
    form.innerHTML = ''
      + '<div class="list-head"><b>编辑</b><button type="button" class="danger" id="btnDel">删除</button></div>'
      + photoBlock('medals')
      + '<div class="grid-2"><label>编号<input id="fId"></label><label>色泽<select id="fTone"><option value="gold">金</option><option value="silver">银</option><option value="bronze">铜</option></select></label></div>'
      + '<label>名称<input id="fName"></label>'
      + '<label>获得说明<textarea id="fDesc"></textarea></label>'
      + '<label class="check"><input id="fOwned" type="checkbox"> 进入游戏时默认已获得（调试用）</label>'
      + '<label class="check"><input id="fOn" type="checkbox"> 上架（游戏里可见）</label>'
    $('iconPrev').src = item.iconSrc ? '/' + item.iconSrc + '?t=' + Date.now() : ''
    bindValue($('fId'), function () { return item.id }, function (v) {
      var old = item.id
      item.id = String(v || old).replace(/\s+/g, '-')
      item.icon = item.icon === old ? item.id : item.icon
      state.selected.medals = item.id
    })
    bindValue($('fTone'), function () { return item.tone || 'gold' }, function (v) { item.tone = v })
    bindValue($('fName'), function () { return item.title }, function (v) { item.title = v })
    bindValue($('fDesc'), function () { return item.desc }, function (v) { item.desc = v })
    $('fOwned').checked = !!item.owned
    $('fOwned').addEventListener('change', function () {
      item.owned = $('fOwned').checked
      markDirty()
    })
    $('fOn').checked = item.on !== false
    $('fOn').addEventListener('change', function () {
      item.on = $('fOn').checked
      markDirty()
      render()
    })
    $('btnDel').addEventListener('click', function () {
      if (!confirm('删除「' + (item.title || item.id) + '」？')) return
      data.items = data.items.filter(function (it) { return it.id !== item.id })
      state.selected.medals = data.items[0] ? data.items[0].id : ''
      markDirty()
      render()
    })
    $('iconFile').addEventListener('change', function () {
      var file = $('iconFile').files[0]
      if (!file) return
      uploadIcon('medals', item, file)
    })
  }

  function renderPlan() {
    var data = state.pack.plan
    if (!data.items) data.items = []
    if (!data.title) data.title = '今日计划'
    var selected = state.selected.plan || (data.items[0] && data.items[0].id) || ''
    state.selected.plan = selected
    var item = data.items.filter(function (it) { return it.id === selected })[0] || null
    var html = '<div class="layout"><div class="panel"><div class="list-head"><b>列表</b><button type="button" id="btnAdd">新增</button></div>'
    html += '<label>页面标题<input id="fPlanTitle"></label>'
    if (!data.items.length) html += '<p class="empty">还没有计划</p>'
    data.items.forEach(function (it) {
      html += '<button type="button" class="item' + (it.id === selected ? ' on' : '') + '" data-id="' + esc(it.id) + '">'
      html += it.iconSrc ? '<img src="/' + esc(it.iconSrc) + '" alt="">' : '<span class="thumb"></span>'
      html += '<div><b>' + esc(it.title || it.id) + '</b><span>' + (it.kind === 'login' ? '登录自动' : '游戏自动检测') + ' · ' + (it.reward || 0) + (it.pay === 'capsules' ? ' 胶囊' : ' 币') + (it.on === false ? ' · 已下架' : '') + '</span></div></button>'
    })
    html += '</div><div class="panel">'
    if (!item) html += '<p class="empty">选一条开始编辑</p>'
    else html += '<div class="form" id="itemForm"></div>'
    html += '</div></div>'
    $('view').innerHTML = html
    bindValue($('fPlanTitle'), function () { return data.title }, function (v) { data.title = v })
    $('view').querySelectorAll('.item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selected.plan = btn.getAttribute('data-id')
        render()
      })
    })
    $('btnAdd').addEventListener('click', function () {
      var id = newId('plan', usedIds(data.items))
      data.items.push({
        id: id,
        title: '新的计划',
        desc: '',
        kind: 'check',
        reward: 50,
        pay: 'coins',
        icon: id,
        iconSrc: '',
        on: true
      })
      state.selected.plan = id
      markDirty()
      render()
    })
    if (!item) return
    var form = $('itemForm')
    form.innerHTML = ''
      + '<div class="list-head"><b>编辑</b><button type="button" class="danger" id="btnDel">删除</button></div>'
      + photoBlock('plan')
      + '<div class="grid-2"><label>编号<input id="fId"></label><label>完成方式<select id="fKind"><option value="login">进入游戏即完成</option><option value="check">游戏自动检测</option></select></label></div>'
      + '<label>标题<input id="fName"></label>'
      + '<label>说明<textarea id="fDesc"></textarea></label>'
      + '<div class="grid-2"><label>奖励数量<input id="fReward" type="number" min="0"></label><label>奖励发放<select id="fPay"><option value="coins">心跳币</option><option value="capsules">营养胶囊</option></select></label></div>'
      + '<label class="check"><input id="fOn" type="checkbox"> 上架（游戏里可见）</label>'
    $('iconPrev').src = item.iconSrc ? '/' + item.iconSrc + '?t=' + Date.now() : ''
    bindValue($('fId'), function () { return item.id }, function (v) {
      var old = item.id
      item.id = String(v || old).replace(/\s+/g, '-')
      item.icon = item.icon === old ? item.id : item.icon
      state.selected.plan = item.id
    })
    bindValue($('fKind'), function () { return item.kind || 'check' }, function (v) { item.kind = v })
    bindValue($('fName'), function () { return item.title }, function (v) { item.title = v })
    bindValue($('fDesc'), function () { return item.desc }, function (v) { item.desc = v })
    bindValue($('fReward'), function () { return item.reward }, function (v) { item.reward = isNaN(v) ? 0 : v })
    bindValue($('fPay'), function () { return item.pay || 'coins' }, function (v) { item.pay = v })
    $('fOn').checked = item.on !== false
    $('fOn').addEventListener('change', function () {
      item.on = $('fOn').checked
      markDirty()
      render()
    })
    $('btnDel').addEventListener('click', function () {
      if (!confirm('删除「' + (item.title || item.id) + '」？')) return
      data.items = data.items.filter(function (it) { return it.id !== item.id })
      state.selected.plan = data.items[0] ? data.items[0].id : ''
      markDirty()
      render()
    })
    $('iconFile').addEventListener('change', function () {
      var file = $('iconFile').files[0]
      if (!file) return
      uploadIcon('plan', item, file)
    })
  }

  function writeQuizRow(q, row) {
    q.d = Number(row.querySelector('[data-k="d"]').value) || 1
    q.q = row.querySelector('[data-k="q"]').value
    q.ok = row.querySelector('[data-k="ok"]').value
    q.bad = [
      row.querySelector('[data-k="bad0"]').value,
      row.querySelector('[data-k="bad1"]').value
    ]
  }

  function render() {
    var meta = HINTS[state.tab]
    $('pageTitle').textContent = meta[0]
    $('pageHint').textContent = meta[1]
    document.querySelectorAll('nav button').forEach(function (btn) {
      btn.classList.toggle('on', btn.getAttribute('data-tab') === state.tab)
    })
    if (state.tab === 'shop' || state.tab === 'wardrobe') itemList(state.tab)
    else if (state.tab === 'cards') renderCards()
    else if (state.tab === 'plan') renderPlan()
    else if (state.tab === 'medals') renderMedals()
    else renderQuiz()
  }

  function save() {
    if (state.pack && state.pack.cards) syncCardsFromLibrary()
    fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.pack)
    }).then(function (res) { return res.json().then(function (body) { return { res: res, body: body } }) })
      .then(function (out) {
        if (!out.res.ok) throw new Error(out.body.error || '保存失败')
        state.pack = out.body.content
        markClean('已保存。浏览器预览请刷新；微信开发者工具请重新编译')
      })
      .catch(function (err) {
        toast((err.message || '保存失败') + '。若只开了普通预览服务，请改用 python admin/server.py', false)
      })
  }

  function exportPack() {
    var blob = new Blob([JSON.stringify(state.pack, null, 2)], { type: 'application/json' })
    var a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'heartguard-content.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function importPack(file) {
    var reader = new FileReader()
    reader.onload = function () {
      try {
        var pack = JSON.parse(reader.result)
        if (!pack.shop || !pack.wardrobe || !pack.cards || !pack.quiz) throw new Error('文件里缺少 shop / wardrobe / cards / quiz')
        if (!pack.plan) pack.plan = { title: '今日计划', items: [] }
        if (!pack.medals) pack.medals = { items: [] }
        state.pack = pack
        markDirty()
        render()
        toast('已导入，请点保存全部写入项目', true)
      } catch (err) {
        toast(err.message || '导入失败', false)
      }
    }
    reader.readAsText(file, 'utf-8')
  }

  function load() {
    var fallback = function () {
      return Promise.all([
        fetch('/content/shop.json').then(function (r) { return r.json() }),
        fetch('/content/wardrobe.json').then(function (r) { return r.json() }),
        fetch('/content/cards.json').then(function (r) { return r.json() }),
        fetch('/content/quiz.json').then(function (r) { return r.json() }),
        fetch('/content/plan.json').then(function (r) { return r.json() }).catch(function () { return { title: '今日计划', items: [] } }),
        fetch('/content/medals.json').then(function (r) { return r.json() }).catch(function () { return { items: [] } })
      ]).then(function (parts) {
        return { shop: parts[0], wardrobe: parts[1], cards: parts[2], quiz: parts[3], plan: parts[4], medals: parts[5] }
      })
    }
    return fetch('/api/content').then(function (res) {
      if (!res.ok) throw new Error('no api')
      return res.json()
    }).catch(fallback)
  }

  document.querySelectorAll('nav button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.tab = btn.getAttribute('data-tab')
      render()
    })
  })
  $('btnSave').addEventListener('click', save)
  $('btnExport').addEventListener('click', exportPack)
  $('btnImport').addEventListener('click', function () { $('fileImport').click() })
  $('fileImport').addEventListener('change', function () {
    var file = $('fileImport').files[0]
    $('fileImport').value = ''
    if (file) importPack(file)
  })
  window.addEventListener('beforeunload', function (e) {
    if (!state.dirty) return
    e.preventDefault()
    e.returnValue = ''
  })

  load().then(function (pack) {
    pack.cards = pack.cards || { cards: {}, library: [], cost: 5 }
    pack.cards.cards = pack.cards.cards || {}
    pack.quiz = pack.quiz || { questions: [] }
    pack.quiz.questions = pack.quiz.questions || []
    pack.plan = pack.plan || { title: '今日计划', items: [] }
    pack.plan.items = pack.plan.items || []
    pack.medals = pack.medals || { items: [] }
    pack.medals.items = pack.medals.items || []
    state.pack = pack
    ensureCardLibrary()
    state.selected.library = pack.cards.library[0] ? pack.cards.library[0].id : ''
    state.selected.shop = pack.shop.items[0] ? pack.shop.items[0].id : ''
    state.selected.wardrobe = pack.wardrobe.items[0] ? pack.wardrobe.items[0].id : ''
    state.selected.plan = pack.plan.items[0] ? pack.plan.items[0].id : ''
    state.selected.medals = pack.medals.items[0] ? pack.medals.items[0].id : ''
    markClean('已载入')
    render()
  }).catch(function (err) {
    $('view').innerHTML = '<div class="panel"><p>载入失败。请在项目根目录运行 <code>python admin/server.py</code>，然后打开 <code>http://127.0.0.1:8780/admin/</code></p><p>' + esc(err.message) + '</p></div>'
  })
})()
