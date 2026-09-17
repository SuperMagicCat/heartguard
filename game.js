/**
 * HeartGuard / 心援计划
 * 封面静止；两个按钮可点。「开始」进入问诊页。
 */
;(function () {
  var isWx = typeof wx !== 'undefined' && typeof wx.createCanvas === 'function'

  function detectFinePointer() {
    if (isWx) {
      try {
        if (typeof wx.getSystemInfoSync === 'function' && wx.getSystemInfoSync().platform === 'devtools') return true
      } catch (err) {}
      return false
    }
    if (typeof window === 'undefined' || !window.matchMedia) return true
    try {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches
    } catch (err) {
      return true
    }
  }

  function cprMouseMode(game) {
    if (game && game.finePointer) return true
    return detectFinePointer()
  }

  function cprPressLabel(game) {
    return cprMouseMode(game) ? '按住点击' : '双指同时点击'
  }

  function markPointerKind(game, type) {
    if (!game) return
    if (type === 'mouse' || type === 'pen') game.finePointer = true
    else if (type === 'touch') game.finePointer = false
  }

  var PARTS = 'godot-heart/heart-walk/parts/'
  var ASSET_LIST = [
    { id: 'bg', src: 'image/home/bg.png' },
    { id: 'bgEmpty', src: 'image/home/bg_empty.png' },
    { id: 'logo', src: 'image/home/logo.png' },
    { id: 'btnStart', src: 'image/home/btn_start.png' },
    { id: 'btnSettings', src: 'image/home/btn_settings.png' },
    { id: 'body', src: PARTS + 'body.png' },
    { id: 'armL', src: PARTS + 'arm_l.png' },
    { id: 'armR', src: PARTS + 'arm_r.png' },
    { id: 'thighL', src: PARTS + 'thigh_l.png' },
    { id: 'thighR', src: PARTS + 'thigh_r.png' },
    { id: 'shinL', src: PARTS + 'shin_l.png' },
    { id: 'shinR', src: PARTS + 'shin_r.png' },
    { id: 'pupilL', src: PARTS + 'pupil_l.png' },
    { id: 'pupilR', src: PARTS + 'pupil_r.png' },
    { id: 'q1_left', src: 'image/quiz/q1_left.png', optional: true },
    { id: 'q1_right', src: 'image/quiz/q1_right.png', optional: true },
    { id: 'q2_left', src: 'image/quiz/q2_left.png', optional: true },
    { id: 'q2_right', src: 'image/quiz/q2_right.png', optional: true },
    { id: 'q3_left', src: 'image/quiz/q3_left.png', optional: true },
    { id: 'q3_right', src: 'image/quiz/q3_right.png', optional: true },
    { id: 'q4_left', src: 'image/quiz/q4_left.png', optional: true },
    { id: 'q4_right', src: 'image/quiz/q4_right.png', optional: true },
    { id: 'chicken', src: 'image/morph/chicken.png', optional: true },
    { id: 'cola', src: 'image/morph/cola.png', optional: true },
    { id: 'apple', src: 'image/morph/apple.png', optional: true },
    { id: 'carrot', src: 'image/morph/carrot.png', optional: true },
    { id: 'darkCircles', src: 'image/morph/dark_circles.png', optional: true },
    { id: 'cig', src: 'image/morph/smoke.png', optional: true },
    { id: 'wine', src: 'image/morph/wine.png', optional: true },
    { id: 'slipper', src: 'image/morph/slipper.png', optional: true },
    { id: 'sportshoe', src: 'image/morph/sportshoe.png', optional: true },
    { id: 'professional', src: 'image/morph/professional.png', optional: true },
    { id: 'hubMe', src: 'image/hub/btn_me.png', optional: true },
    { id: 'hubSettings', src: 'image/hub/btn_settings.png', optional: true },
    { id: 'hubHistory', src: 'image/hub/btn_history.png', optional: true },
    { id: 'hubAvatar', src: 'image/hub/avatar.png', optional: true },
    { id: 'iconCoin', src: 'image/hub/icon_coin.png', optional: true },
    { id: 'iconCapsule', src: 'image/hub/icon_capsule.png', optional: true },
    { id: 'iconCoq10', src: 'image/hub/icon_coq10.png', optional: true },
    { id: 'iconOmega3', src: 'image/hub/icon_omega3.png', optional: true },
    { id: 'iconMagnesium', src: 'image/hub/icon_magnesium.png', optional: true },
    { id: 'modeTimed', src: 'image/hub/mode_timed.png', optional: true },
    { id: 'modeQuiz', src: 'image/hub/mode_quiz.png', optional: true },
    { id: 'hubDepart', src: 'image/hub/btn_depart.png', optional: true },
    { id: 'navWardrobe', src: 'image/hub/nav_wardrobe.png', optional: true },
    { id: 'navShop', src: 'image/hub/nav_shop.png', optional: true },
    { id: 'navPlan', src: 'image/hub/nav_plan.png', optional: true },
    { id: 'navMedal', src: 'image/hub/nav_medal.png', optional: true },
    { id: 'navCards', src: 'image/hub/nav_cards.png', optional: true },
    { id: 'iconGiftCards', src: 'image/hub/icon_gift_cards.png?v=3', optional: true },
    { id: 'wardBg', src: 'image/wardrobe/bg.png', optional: true },
    { id: 'wardBuy', src: 'image/wardrobe/btn_buy.png', optional: true },
    { id: 'catClothes', src: 'image/wardrobe/cat_clothes.png', optional: true },
    { id: 'catGlasses', src: 'image/wardrobe/cat_glasses.png', optional: true },
    { id: 'catShoes', src: 'image/wardrobe/cat_shoes.png', optional: true },
    { id: 'itemShawl', src: 'image/wardrobe/items/item_shawl.png', optional: true },
    { id: 'itemClothesModel', src: 'image/wardrobe/clothesmodel.png', optional: true },
    { id: 'wearClothesModel', src: 'image/wardrobe/items/wear_clothesmodel.png', optional: true },
    { id: 'keepBody', src: 'image/npc/keeper/body.png', optional: true },
    { id: 'keepArmL', src: 'image/npc/keeper/arm_l.png', optional: true },
    { id: 'keepArmR', src: 'image/npc/keeper/arm_r.png', optional: true },
    { id: 'keepLegL', src: 'image/npc/keeper/leg_l.png', optional: true },
    { id: 'keepPupilL', src: 'image/npc/keeper/pupil_l.png', optional: true },
    { id: 'keepPupilR', src: 'image/npc/keeper/pupil_r.png', optional: true },
    { id: 'shopBg', src: 'image/shop/bg.png', optional: true },
    { id: 'mgrBody', src: 'image/npc/manager/body.png', optional: true },
    { id: 'mgrArmR', src: 'image/npc/manager/arm_r.png', optional: true },
    { id: 'mgrLegL', src: 'image/npc/manager/leg_l.png', optional: true },
    { id: 'mgrPupilL', src: 'image/npc/manager/pupil_l.png', optional: true },
    { id: 'mgrPupilR', src: 'image/npc/manager/pupil_r.png', optional: true },
    { id: 'aidHome', src: 'image/firstaid/levels/home.png', optional: true },
    { id: 'aidOffice', src: 'image/firstaid/levels/office.png', optional: true },
    { id: 'aidOfficeBg', src: 'image/firstaid/levels/office/bg.png', optional: true },
    { id: 'aidOfficeMan', src: 'image/firstaid/levels/office/people.png', optional: true },
    { id: 'aidOfficeShirt', src: 'image/firstaid/levels/office/shirts.png', optional: true },
    { id: 'aidOfficeAed', src: 'image/firstaid/levels/office/aed.png', optional: true },
    { id: 'aidPlaza', src: 'image/firstaid/levels/plaza.png', optional: true },
    { id: 'timedCpr', src: 'image/train/cpr.png', optional: true },
    { id: 'timedAed', src: 'image/train/aed.png', optional: true },
    { id: 'aidOldman', src: 'image/firstaid/levels/home/oldman.png', optional: true },
    { id: 'aidFloor', src: 'image/firstaid/levels/home/floor.png', optional: true },
    { id: 'aidPhone', src: 'image/firstaid/levels/home/phone.png', optional: true },
    { id: 'aidPad', src: 'image/firstaid/levels/home/number.png', optional: true },
    { id: 'aidTelIcon', src: 'image/firstaid/levels/home/icon_telephone.png', optional: true },
    { id: 'aidHandP', src: 'image/firstaid/levels/home/hand_player.png', optional: true },
    { id: 'aidHandF', src: 'image/firstaid/levels/home/hand.png', optional: true },
    { id: 'aidCar', src: 'image/firstaid/levels/home/car.png', optional: true },
    { id: 'aidIconPerfect', src: 'image/firstaid/levels/home/perfect.png', optional: true },
    { id: 'aidIconTime', src: 'image/firstaid/levels/home/time.png', optional: true },
    { id: 'aidIconHeart', src: 'image/firstaid/levels/home/heart.png', optional: true },
    { id: 'aidIconPill', src: 'image/firstaid/levels/home/pill.png', optional: true },
    { id: 'qBg', src: 'image/question/bg.png', optional: true },
    { id: 'teachBody', src: 'image/npc/teacher/body.png', optional: true },
    { id: 'teachArmL', src: 'image/npc/teacher/arm_l.png', optional: true },
    { id: 'teachArmR', src: 'image/npc/teacher/arm_r.png', optional: true },
    { id: 'teachLegL', src: 'image/npc/teacher/leg_l.png', optional: true },
    { id: 'teachPupilL', src: 'image/npc/teacher/pupil_l.png', optional: true },
    { id: 'teachPupilR', src: 'image/npc/teacher/pupil_r.png', optional: true },
    { id: 'cardBg', src: 'image/card/bg.png', optional: true },
    { id: 'cardSpade', src: 'image/card/spade.png', optional: true },
    { id: 'cardClub', src: 'image/card/club.png', optional: true },
    { id: 'cardDiamond', src: 'image/card/square.png', optional: true },
    { id: 'cardFang', src: 'image/card/diamond.png', optional: true },
    { id: 'cardHeart', src: 'image/card/heart.png', optional: true },
    { id: 'cardFish', src: 'image/card/fish.png', optional: true },
    { id: 'planBg', src: 'image/plan/bg.png', optional: true },
    { id: 'medalBg', src: 'image/medal/bg.png', optional: true },
    { id: 'medalGold', src: 'image/medal/gold.png', optional: true },
    { id: 'medalSilver', src: 'image/medal/silver.png', optional: true },
    { id: 'medalBronze', src: 'image/medal/bronze.png', optional: true },
    { id: 'itemPlaceholder', src: 'image/hub/item_placeholder.png', optional: true }
  ]

  var SOUND_LIST = [
    { id: 'tap', src: 'audio/public/buttonpress.mp3', volume: 0.82 },
    { id: 'chooseRight', src: 'audio/question/chooseright.mp3', volume: 0.88 },
    { id: 'chooseWrong', src: 'audio/question/choosewrong.mp3', volume: 0.88 },
    { id: 'dialog', src: 'audio/public/dialogbubble.mp3', volume: 0.78 },
    { id: 'cardMove', src: 'audio/card/cardmove.mp3', volume: 0.72 },
    { id: 'step', src: 'audio/quiz/walk.mp3', loop: true, volume: 0.48 },
    { id: 'bgHome', src: 'audio/home/bg.mp3', loop: true, volume: 0.36 },
    { id: 'bgQuiz', src: 'audio/quiz/bg.mp3', loop: true, volume: 0.36 },
    { id: 'bgAid', src: 'audio/firstaid/bg.mp3', loop: true, volume: 0.38 }
  ]
  var BGM_LOOP_IDS = ['bgHome', 'bgQuiz', 'bgAid']

  var DIALOGUE = [
    { text: '哟，怎么是你？' },
    { text: '我是你的心脏呀，不记得了？' },
    { text: '在开始之前，我要问你几个问题' },
    { text: '和你的生活习惯有关，得给我老实回答' },
    { text: '准备好了吗？', button: '准备好了' }
  ]
  var TYPE_CPS = 16
  var FONT_FILE = 'fonts/ui.ttf'
  var FONT_FAMILY = ''

  function quoteFamily(name) {
    if (!name) return ''
    if (name.indexOf(' ') !== -1 && name.charAt(0) !== '"') return '"' + name + '"'
    return name
  }

  function uiFont(size, weight) {
    var custom = quoteFamily(FONT_FAMILY)
    if (isWx) {
      return size + 'px ' + (custom || 'sans-serif')
    }
    var stack = custom
      ? custom + ', "PingFang SC", sans-serif'
      : '"PingFang SC", "Microsoft YaHei", sans-serif'
    return (weight ? weight + ' ' : '') + size + 'px ' + stack
  }

  /**
   * MEPA 4 项。左右示意小图放 image/quiz/ 。
   */
  var QUIZ_TITLE = '基于 MEPA 4项健康行为量表'
  var QUIZ_QUESTIONS = [
    {
      text: '1. 你平时的饮食习惯如何？',
      left: 'q1_left',
      right: 'q1_right',
      bands: [
        { max: 2, text: '饮食很不健康' },
        { max: 4, text: '饮食比较差' },
        { max: 6, text: '饮食好坏参半' },
        { max: 8, text: '饮食比较健康' },
        { max: 10, text: '饮食很健康' }
      ]
    },
    {
      text: '2. 你平时的运动习惯如何？',
      left: 'q2_left',
      right: 'q2_right',
      bands: [
        { max: 2, text: '几乎不运动' },
        { max: 4, text: '运动很少' },
        { max: 6, text: '运动一般' },
        { max: 8, text: '运动比较规律' },
        { max: 10, text: '运动很充分' }
      ]
    },
    {
      text: '3. 你平时的睡眠情况如何？',
      left: 'q3_left',
      right: 'q3_right',
      bands: [
        { max: 2, text: '睡眠很差' },
        { max: 4, text: '睡眠不太好' },
        { max: 6, text: '睡眠时好时坏' },
        { max: 8, text: '睡眠比较好' },
        { max: 10, text: '睡眠很充足' }
      ]
    },
    {
      text: '4. 你吸烟或喝酒的情况如何？',
      left: 'q4_left',
      right: 'q4_right',
      bands: [
        { max: 2, text: '烟酒很频繁' },
        { max: 4, text: '烟酒比较多' },
        { max: 6, text: '偶尔烟酒' },
        { max: 8, text: '很少烟酒' },
        { max: 10, text: '几乎不沾烟酒' }
      ]
    }
  ]

  var DIET_MORPH = [
    { max: 3, hats: ['chicken', 'cola'], line: '妈呀你消停一下吧' },
    { max: 7, hats: ['cola', 'apple'], line: '偶尔放纵也没事' },
    { max: 10, hats: ['apple', 'carrot'], line: '一天一苹果，医生就是我' }
  ]
  var EXERCISE_MORPH = [
    { max: 3, line: '躺平也得有个度吧', shoe: 'slipper' },
    { max: 7, line: '动一动我还能撑住', shoe: 'sportshoe' },
    { max: 10, line: '这体魄，我喜欢', shoe: 'professional' }
  ]
  var SLEEP_MORPH = [
    { max: 2, line: '黑眼圈都要掉下来了' },
    { max: 5, line: '再这样我可熬不住' },
    { max: 8, line: '睡得还行，再补补' },
    { max: 10, line: '睡饱了，神清气爽' }
  ]
  var VICE_MORPH = [
    { max: 2, line: '烟酒齐上，我要罢工了' },
    { max: 5, line: '少来点行不行' },
    { max: 8, line: '偶尔一口就算了' },
    { max: 10, line: '不抽烟不喝酒，健康宝宝' }
  ]
  var HOLD_LAYOUT = [
    { x: 36, y: 72, rot: -0.16, h: 132 },
    { x: 66, y: 86, rot: 0.52, h: 164 }
  ]
  var HOLD_BOTTLE = { x: 116, y: 36, rot: 0.38, h: 200 }
  var HOLD_ARM = {
    color: '#8a1f20',
    width: 18,
    fromX: 143,
    fromY: 39,
    c1x: 172,
    c1y: 72,
    c2x: 148,
    c2y: 148,
    toX: 18,
    toY: 98
  }
  var LEFT_BOTTLE = { x: -22, y: 318, rot: 0.48, h: 290 }
  var MOUTH = { x: -96, y: 102, r: 11 }
  var SMILE = {
    color: '#6e1b1f',
    width: 7,
    x0: -18,
    y0: 8,
    cx: 6,
    cy: 13,
    x1: 26,
    y1: -7
  }
  var CIG_IN_MOUTH = {
    filterX: 0.081,
    filterY: 0.837,
    tipX: 0.904,
    tipY: 0.155,
    pin: -0.08,
    tips: [
      { dx: -142, dy: 14 },
      { dx: -128, dy: 42 }
    ],
    puffs: [
      { u: 1.06, v: -0.12, r: 20 },
      { u: 1.22, v: 0.1, r: 30 },
      { u: 1.34, v: -0.06, r: 22 },
      { u: 1.16, v: 0.28, r: 16 },
      { u: 1.4, v: 0.16, r: 18 }
    ]
  }
  var SPARKLE = { x: 118, y: -188, r: 40 }
  var MORPH_SMOKE = 0.85
  var MORPH_HAT_AT = 0.22
  var MORPH_TEXT_AT = 0.4
  var MORPH_TEXT_HOLD = 2
  var DARK_CIRCLES = { x: -96.5, y: 50, scale: 105 / 180 }
  var SHOE_SPEC = {
    slipper: { x: -6, y: 116, rot: 0, h: 28, rightX: 10 },
    sportshoe: { x: -14, y: 110, rot: 0.04, h: 45, rightX: 10 },
    professional: { x: -14, y: 110, rot: 0.04, h: 47, rightX: 10 }
  }
  var CLOTHES_FIT = {
    clothesmodel: { ox: 85, oy: 333, scale: 0.71 },
    clothes1: { ox: 85, oy: 333, scale: 0.71 }
  }
  var CLOTHES_BOX = { w: 474 * 0.71, bottom: 333 + 308 * 0.71, ox: 85 }
  var ACCESSORY_FIT = {
    'wear-1': { cx: -96.5, cy: 8, width: 228, overFace: true },
    band: { cx: -96.5, cy: 14, width: 232, overFace: true },
    scarf: { cx: -88, cy: 108, width: 390, overFace: false, clipBody: true }
  }
  var ACCESSORY_FIT_DEFAULT = { cx: -96.5, cy: 12, width: 230, overFace: true }
  var _clothesClip = {}
  var SHOW_FOOT_DUR = 0.82
  var NICK_MAX = 6
  var NICK_HINT = '请输入昵称'
  var NICK_EMPTY = '先给我取个名字吧！'
  var NICK_BAD = '这个名字不太合适'
  var NICK_BLOCKED = [
    '操', '草泥', '傻逼', '傻b', '煞笔', '去死', '废物',
    '操你', '妈的', '他妈', '你妈', '尼玛', '卧槽', '鸡巴',
    '色情', '裸体', '做爱', '约炮',
    '法轮', '纳粹', '希特勒',
    'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'nigger'
  ]

  function nickLen(s) {
    return Array.from(s || '').length
  }

  function nickHasBad(s) {
    var t = String(s || '').toLowerCase().replace(/\s+/g, '')
    var i
    for (i = 0; i < NICK_BLOCKED.length; i++) {
      if (t.indexOf(NICK_BLOCKED[i].toLowerCase()) !== -1) return true
    }
    return false
  }

  function sleepCircleAlpha(score) {
    if (score <= 2) return 1
    if (score <= 5) return 0.6
    if (score <= 8) return 0.2
    return 0
  }

  function viceMorphFor(score) {
    if (score <= 2) return { cigs: 2, leftBottle: true, holdBottle: false, smile: false }
    if (score <= 5) return { cigs: 1, leftBottle: true, holdBottle: false, smile: false }
    if (score <= 8) return { cigs: 1, leftBottle: false, holdBottle: false, smile: false }
    return { cigs: 0, leftBottle: false, holdBottle: false, smile: true }
  }

  var NUTRIENT_FULL = 10
  function emptyNutrients() {
    return { coq10: 0, omega3: 0, magnesium: 0 }
  }
  var NUTRIENT_RING_TRACK = '#d8d8d8'
  var NUTRIENT_RING_FILL = '#a45a32'
  var NUTRIENT_DOT_EMPTY = '#d0d0d0'
  var NUTRIENT_TOGGLE = '#e23b3b'
  var NUTRIENT_HINT = '通过收集三种心脏必须的营养素合成药丸，也可以从小游戏中随机获得，快去试试吧！'
  var NUTRIENT_BARS = [
    { id: 'coq10', icon: 'iconCoq10', color: '#6b8f3a', name: '辅酶 Q10', effect: '为心肌供能，养护心脏', bonusKey: 'coq10' },
    { id: 'omega3', icon: 'iconOmega3', color: '#e8b01a', name: 'Omega3', effect: '调节血脂，保护血管', bonusKey: 'omega3' },
    { id: 'magnesium', icon: 'iconMagnesium', color: '#7eb8d8', name: '镁元素', effect: '舒缓神经，稳定心律', bonusKey: 'mag' }
  ]
  var HUB_NAV = [
    { id: 'wardrobe', icon: 'navWardrobe', label: '衣橱' },
    { id: 'shop', icon: 'navShop', label: '商店' },
    { id: 'plan', icon: 'navPlan', label: '计划' },
    { id: 'medal', icon: 'navMedal', label: '勋章' },
    { id: 'cards', icon: 'navCards', label: '卡牌' }
  ]
  var HUB_GUIDE = [
    {
      id: 'nutrients',
      holes: ['collect'],
      wait: 'collectOpen',
      text: '第一次来吧？我来简单介绍一下。这是营养合成器，原料由三种元素构成：辅酶Q10、Omega-3、镁，点击小三角展开详情。'
    },
    {
      id: 'nutrientsLook',
      holes: ['collect'],
      wait: 'next',
      keepOpen: true,
      text: '三种元素全部满槽时，就可以合成一颗营养药丸，用于购买物品和兑换卡牌。三种元素的获得来源就是商店和右边的急救板块啦，我们看右边。'
    },
    {
      id: 'modes',
      holes: ['modes'],
      wait: 'next',
      text: '你要的东西基本都从这儿来。急救模拟可以提前熟悉一些操作和仪器用法，快问快答可以帮你巩固急救知识，出发急救则是真正考验你的时候。'
    },
    {
      id: 'wardrobe',
      holes: ['nav:wardrobe'],
      wait: 'next',
      text: '这里是你的衣橱，获得奖励之后可以美美装扮我哦。'
    },
    {
      id: 'shop',
      holes: ['nav:shop'],
      wait: 'next',
      text: '商店可以购买食物，补充三大元素必不可少。'
    },
    {
      id: 'plan',
      holes: ['nav:plan'],
      wait: 'next',
      text: '完成任务可以获得丰厚的奖励哦。'
    },
    {
      id: 'medal',
      holes: ['nav:medal'],
      wait: 'next',
      text: '这里是记录你获得勋章的地方。'
    },
    {
      id: 'cards',
      holes: ['nav:cards'],
      wait: 'next',
      text: '营养药丸可以兑换卡牌！争取集齐所有卡牌吧！'
    },
    {
      id: 'bye',
      holes: [],
      wait: 'next',
      text: '好啦，现在开始你的心援之旅吧！'
    }
  ]
  var WELCOME_GIFT = { coins: 500, pills: 10, cards: 1 }
  var PLAN_TITLE = '今日计划'
  var PLAN_INK = '#2a2a2a'
  var PLAN_MUTED = '#8a8a8a'
  var PLAN_ROW = '#ffffff'
  var PLAN_CHECK = '#d8d8d8'
  var PLAN_CLAIM = '#c4453a'
  var PLAN_WAIT = '#5c5c5c'
  var PLAN_DONE = '#9a9a9a'
  var PLAN_TASKS = [
    { id: 'login', title: '登陆游戏', desc: '来了就不容易了', kind: 'login', reward: 50, pay: 'coins', on: true },
    { id: 'water', title: '喝杯水吧？', desc: '给小心脏买一杯水喝，别忘了自己也要多喝水哦', kind: 'check', reward: 50, pay: 'coins', on: true },
    { id: 'fruit', title: '吃点水果', desc: '给小心脏吃点水果，别忘了自己也要多吃水果哦', kind: 'check', reward: 50, pay: 'coins', on: true },
    { id: 'sport', title: '运动一下', desc: '适量运动对心脏有很大的好处!', kind: 'check', reward: 50, pay: 'coins', on: true }
  ]
  var MEDAL_INK = '#2a2a2a'
  var MEDAL_MUTED = '#6a6a6a'
  var MEDAL_ITEMS = [
    { id: 'rookie', title: '急救新手', desc: '第一次完成限时模拟或急救训练后获得。', tone: 'silver', icon: 'medalSilver', on: true },
    { id: 'guard', title: '心脏卫士', desc: '坚持守护心脏健康，完成今日计划后点亮。', tone: 'gold', icon: 'medalGold', on: true },
    { id: 'steady', title: '坚持之心', desc: '连续完成多日计划后获得。', tone: 'silver', icon: 'medalSilver', on: true },
    { id: 'scholar', title: '知识达人', desc: '在快问快答中累计答对足够多的题目。', tone: 'bronze', icon: 'medalBronze', on: true }
  ]
  var MEDAL_OWNED_DEFAULTS = { guard: true }
  var STORE_ORANGE = '#EFB250'
  var STORE_FILL = 'rgba(239,178,80,0.25)'
  var STORE_WHITE = 'rgba(255,255,255,0.90)'
  var STORE_MAROON = '#A4322C'
  var SHOP_PURPLE = '#A47CB8'
  var SHOP_FILL = 'rgba(164,124,184,0.25)'
  var WARDROBE_CATS = [
    { id: 'clothes', icon: 'catClothes', title: '衣服' },
    { id: 'glasses', icon: 'catGlasses', title: '饰品' },
    { id: 'shoes', icon: 'catShoes', title: '鞋履' }
  ]
  var WARDROBE_ITEMS = [
    {
      id: 'clothes1',
      cat: 'clothes',
      name: '暖心针织背心',
      price: 280,
      bonusKey: 'mag',
      bonus: 0.08,
      bonusText: '镁元素的获得率 + 8%',
      desc: '贴着小心身形织的暖背心。穿上后，限时模拟和急救里拿到的镁都会多一点。',
      icon: 'itemClothesModel',
      wear: 'itemClothesModel'
    },
    {
      id: 'shawl',
      cat: 'clothes',
      name: '小心着凉的披肩',
      price: 420,
      bonusKey: 'omega3',
      bonus: 0.12,
      bonusText: 'Omega-3 的获得率 + 12%',
      desc: '四面漏风但气场很稳。金色限量款被小心霸占了，这件蓝的专补 Omega-3。',
      icon: 'itemShawl'
    },
    {
      id: 'hoodie',
      cat: 'clothes',
      name: '周末运动卫衣',
      price: 360,
      bonusKey: 'coq10',
      bonus: 0.09,
      bonusText: '辅酶 Q10 的获得率 + 9%',
      desc: '松松的，方便抬手做操。穿出去散步时，游戏里拿到的辅酶 Q10 会更厚道。',
      icon: 'hoodie',
      placeholder: true
    },
    {
      id: 'pajama',
      cat: 'clothes',
      name: '早睡棉睡衣',
      price: 250,
      bonusKey: 'mag',
      bonus: 0.06,
      bonusText: '镁元素的获得率 + 6%',
      desc: '软棉触感，提醒你十点前躺下。睡得好，镁的获得率也会老实涨一点。',
      icon: 'pajama',
      placeholder: true
    },
    {
      id: 'wear-1',
      cat: 'glasses',
      name: '护目小圆镜',
      price: 320,
      bonusKey: 'coq10',
      bonus: 0.1,
      bonusText: '辅酶 Q10 的获得率 + 10%',
      desc: '把加班时的刺眼屏幕挡回去一点。戴上后，游戏里拿到的辅酶 Q10 会更厚道。',
      icon: 'wear-1'
    },
    {
      id: 'scarf',
      cat: 'glasses',
      name: '暖颈小围巾',
      price: 300,
      bonusKey: 'mag',
      bonus: 0.07,
      bonusText: '镁元素的获得率 + 7%',
      desc: '围上就不那么容易缩肩膀。保暖的同时，镁的获得率悄悄加一截。',
      icon: 'scarf',
      placeholder: true
    },
    {
      id: 'band',
      cat: 'glasses',
      name: '专注发带',
      price: 210,
      bonusKey: 'omega3',
      bonus: 0.05,
      bonusText: 'Omega-3 的获得率 + 5%',
      desc: '把刘海和杂念一起束起来。做急救训练时，Omega-3 掉落会更听话。',
      icon: 'band',
      placeholder: true
    },
    {
      id: 'wear-2',
      cat: 'shoes',
      name: '散步软底鞋',
      price: 240,
      bonusKey: 'omega3',
      bonus: 0.06,
      bonusText: 'Omega-3 的获得率 + 6%',
      desc: '软软的，适合出门走走。和背心、圆镜一起穿，三种元素都能吃到提成。',
      icon: 'wear-2'
    },
    {
      id: 'slipper',
      cat: 'shoes',
      name: '室内软拖鞋',
      price: 190,
      bonusKey: 'mag',
      bonus: 0.05,
      bonusText: '镁元素的获得率 + 5%',
      desc: '回家第一件事：换掉出门那双。脚放松了，镁也愿意多待一会儿。',
      icon: 'slipper',
      placeholder: true
    },
    {
      id: 'runner',
      cat: 'shoes',
      name: '轻快慢跑鞋',
      price: 340,
      bonusKey: 'coq10',
      bonus: 0.08,
      bonusText: '辅酶 Q10 的获得率 + 8%',
      desc: '轻，弹，鼓励你小跑而不是猛冲。运动时拿到的辅酶 Q10 会多给一点。',
      icon: 'runner',
      placeholder: true
    }
  ]
  var KEEPER_TALK = '欢迎光临小心的服装店哦！衣服、饰品、鞋履各穿一件，三种元素都能吃到提成...'
  var SHOP_TALK = '欢迎光临小心的食品店哦！货架上全是对心脏友善的吃食，今天想补点什么呢...'
  var SHOP_CATS = [
    { id: 'produce', icon: 'apple', title: '蔬果' },
    { id: 'meat', icon: 'food-1', title: '肉类' },
    { id: 'drink', icon: 'water', title: '饮料' }
  ]
  var SHOP_ITEMS = [
    {
      id: 'apple',
      cat: 'produce',
      name: '小心牌红苹果',
      price: 55,
      bonusKey: 'mag',
      bonus: 3,
      bonusText: '镁元素 +3',
      desc: '一天一苹果，小心少操劳。皮薄汁多，便宜好入口，适合先把镁槽补到能合成的边儿上。',
      icon: 'apple'
    },
    {
      id: 'banana',
      cat: 'produce',
      name: '能量小香蕉',
      price: 90,
      bonusKey: 'mag',
      bonus: 5,
      bonusText: '镁元素 +5',
      desc: '钾和镁的老搭档。吃一根，心跳稳一点，加班到腿软时也不那么容易抽筋。',
      icon: 'banana'
    },
    {
      id: 'carrot',
      cat: 'produce',
      name: '护心胡萝卜',
      price: 65,
      bonusKey: 'coq10',
      bonus: 3,
      bonusText: '辅酶 Q10 +3',
      desc: '脆生生的一小根，给心肌续一点燃料。夜视是谣言，面对健康餐单的勇气是真的。',
      icon: 'carrot'
    },
    {
      id: 'tomato',
      cat: 'produce',
      name: '红润小番茄',
      price: 85,
      bonusKey: 'coq10',
      bonus: 4,
      bonusText: '辅酶 Q10 +4',
      desc: '红得像小心害羞。番茄红素帮血管做一次温和打扫，生吃热炒都欢迎。',
      icon: 'tomato'
    },
    {
      id: 'kiwi',
      cat: 'produce',
      name: '清甜猕猴桃',
      price: 80,
      bonusKey: 'mag',
      bonus: 4,
      bonusText: '镁元素 +4',
      desc: '酸甜刚好，维生素 C 很慷慨。挖一勺，心情和镁槽一起往上抬一点。',
      icon: 'kiwi',
      placeholder: true
    },
    {
      id: 'walnut',
      cat: 'produce',
      name: '原味核桃仁',
      price: 135,
      bonusKey: 'omega3',
      bonus: 5,
      bonusText: 'Omega-3 +5',
      desc: '不加油不裹糖，咔嚓一口就是植物里的 Omega-3。当零食刚刚好，别整袋消灭。',
      icon: 'walnut',
      placeholder: true
    },
    {
      id: 'food-1',
      cat: 'meat',
      name: '深海护心鱼',
      price: 170,
      bonusKey: 'omega3',
      bonus: 6,
      bonusText: 'Omega-3 +6',
      desc: '三文鱼、鲭鱼这一挂的老朋友。清蒸或水煮，一次补足大半槽 Omega-3，店长最推荐。',
      icon: 'food-1'
    },
    {
      id: 'breast',
      cat: 'meat',
      name: '清蒸嫩鸡胸',
      price: 155,
      bonusKey: 'coq10',
      bonus: 6,
      bonusText: '辅酶 Q10 +6',
      desc: '去皮清蒸，蛋白质来得干净。给心肌供能，却不把油锅一起端上桌。',
      icon: 'breast',
      placeholder: true
    },
    {
      id: 'water',
      cat: 'drink',
      name: '温热白开水',
      price: 30,
      bonusKey: 'mag',
      bonus: 2,
      bonusText: '镁元素 +2',
      desc: '最便宜也最老实的护心饮料。温一口，血液不那么黏，镁也更好吸收。',
      icon: 'water',
      placeholder: true
    },
    {
      id: 'soy',
      cat: 'drink',
      name: '无糖鲜豆浆',
      price: 70,
      bonusKey: 'omega3',
      bonus: 3,
      bonusText: 'Omega-3 +3',
      desc: '不另加糖，豆香自己会说话。植物脂肪温和，适合配核桃或鱼做一套护心早餐。',
      icon: 'soy',
      placeholder: true
    }
  ]
  var WARDROBE_SPEC = {
    id: 'wardrobe',
    bg: 'wardBg',
    talk: KEEPER_TALK,
    cats: WARDROBE_CATS,
    items: WARDROBE_ITEMS,
    theme: { accent: STORE_ORANGE, fill: STORE_FILL },
    actor: 'keeper',
    defaultCat: 'clothes',
    defaultItem: 'clothes1',
    emptyHint: '挑选一件看看吧',
    sideTitle: '服装店',
    ownedKey: 'ownedItems',
    favKey: 'favItems',
    canEquip: true,
    actorLayout: { scale: 0.00062, left: 360, right: 430, foot: 643 }
  }
  var SHOP_SPEC = {
    id: 'shop',
    bg: 'shopBg',
    talk: SHOP_TALK,
    cats: SHOP_CATS,
    items: SHOP_ITEMS,
    theme: { accent: SHOP_PURPLE, fill: SHOP_FILL },
    actor: 'manager',
    defaultCat: 'produce',
    defaultItem: 'apple',
    emptyHint: '挑点吃的吧',
    sideTitle: '食品店',
    ownedKey: 'ownedFood',
    favKey: 'favFood',
    canEquip: false,
    consumable: true,
    actorLayout: { scale: 0.00056, left: 340, right: 410, foot: 700 }
  }
  var FOOD_BAG_MAX = 8
  var FOOD_BUBBLE_SLOTS = [
    { x: 0.285, y: -0.175, s: 1.04 },
    { x: 0.39, y: 0.008, s: 0.98 },
    { x: 0.24, y: 0.198, s: 0.9 },
    { x: 0.345, y: -0.285, s: 0.94 },
    { x: 0.43, y: 0.155, s: 0.9 },
    { x: 0.255, y: 0.02, s: 0.96 },
    { x: 0.37, y: -0.075, s: 0.88 },
    { x: 0.31, y: 0.295, s: 0.86 }
  ]
  var FOOD_EAT_FLY = 0.4
  var FOOD_EAT_CHEW = 0.78
  var AID_BG = '#F2C15C'
  var AID_INK = '#2b2b2b'
  var AID_RED = '#E24A3C'
  var AID_LEVELS = [
    {
      id: 'home',
      name: '幸福小区',
      stars: 1,
      limit: 130,
      art: 'aidHome',
      story: '深夜，家中老人突发心梗倒地，无意识、无呼吸，现场没有AED。好在你有一位家人与你一起完成急救。',
      storyHi: ['没有AED'],
      task: '在急救人员赶来前，与家属交替完成心肺复苏和人工呼吸，维持患者生命体征。',
      rewardCoins: 500,
      rewardPills: 20,
      rewardCoq10: 7,
      rewardOmega3: 7,
      rewardMag: 7
    },
    {
      id: 'office',
      name: '星辰大厦',
      stars: 2,
      limit: 130,
      art: 'aidOffice',
      story: '工作日，星辰大厦办公室内一名同事突然倒地，无意识、无呼吸。好在楼层配有AED，还有同事可以协助你完成急救。',
      storyHi: ['配有AED'],
      task: '在急救人员赶来前，与同事交替完成心肺复苏，并正确使用AED，维持患者生命体征。',
      rewardCoins: 800,
      rewardPills: 15,
      rewardCoq10: 8,
      rewardOmega3: 8,
      rewardMag: 8
    },
    {
      id: 'plaza',
      name: '城市广场',
      stars: 3,
      limit: 120,
      art: 'aidPlaza',
      locked: true,
      story: '白天，城市广场上一名路人突然倒地，无意识、无呼吸。现场有AED，但围观的人很多，需要你来指挥急救。',
      storyHi: ['围观的人很多'],
      task: '在急救人员赶来前，疏导围观、指挥路人呼救，完成心肺复苏并使用AED，维持患者生命体征。',
      rewardCoins: 1200,
      rewardPills: 20,
      rewardCoq10: 10,
      rewardOmega3: 10,
      rewardMag: 10
    }
  ]

  function aidLevel(id) {
    var i
    for (i = 0; i < AID_LEVELS.length; i++) {
      if (AID_LEVELS[i].id === id) return AID_LEVELS[i]
    }
    return AID_LEVELS[0]
  }

  function aidLevelLock(game, level) {
    if (!level) return { on: true, why: '暂未开放，敬请期待哦' }
    if (level.locked) return { on: true, why: '暂未开放，敬请期待哦' }
    var done = (game && game.timedClear) || {}
    if (level.id === 'home' && !done.cpr) return { on: true, why: '先去限时模拟，把心肺复苏练完再来' }
    if (level.id === 'office' && !done.aed) return { on: true, why: '先去限时模拟，把AED练完再来' }
    return { on: false, why: '' }
  }

  function aidArtAspect(images) {
    var i
    var img
    for (i = 0; i < AID_LEVELS.length; i++) {
      img = images[AID_LEVELS[i].art]
      if (img && img.width && img.height) return img.width / img.height
    }
    return 16 / 9
  }

  function formatAidClock(sec) {
    var s = Math.max(0, Math.floor(sec))
    var m = Math.floor(s / 60)
    var r = s % 60
    return m + ':' + (r < 10 ? '0' : '') + r
  }

  var AID_DIRS = ['up', 'down', 'left', 'right']
  var AID_TALK1 = '快拨120！我先把他抬到平坦的地方上去'
  var AID_TALK_CPR = '快做心肺复苏！我先来！'
  var AID_TALK_OFFICE1 = '快拨120！我去拿楼层AED，你先呼叫！'
  var AID_TALK_OFFICE_CUT = '电极必须贴在裸露皮肤上，先把衣服从中间划开！'
  var AID_MEDIC = '您好120急救中心，请问您的位置是？'
  var AID_MEDIC_MISS = '缺少未知信息！'
  var AID_TASK1 = '呼叫并拨打120'
  var AID_TASK2 = '向医护报告正确地址'
  var AID_TASK3 = '双手胸外按压'
  var AID_TASK_OFFICE = ['呼叫并拨打120', '向医护报告所在楼层', '剪开衣服并按提示使用AED']
  var AID_AED_ATTACH = '将电极片贴在患者裸露胸部，一片贴右上胸，一片贴左胸外侧'
  var AID_AED_ANALYZE = '正在分析心律，请勿接触患者。'
  var AID_AED_SHOCK = '建议电击。请按下闪烁的电击键。'
  var AID_AED_CLEAR = '电击完成。立即开始心肺复苏。'
  var AID_AED_TOUCH = '检测到接触，分析中断。请离开患者。'
  var AID_AED_NOSHOCK = '不建议电击。'
  var AID_PAD_FREE_MOVES = 2
  var AID_PAD_MOVE_SCORE = 0.3
  var AID_PAD_MOVE_COINS = 10
  var AID_CPR_TEAL = '#1a9aa3'
  var AID_CPR_ORANGE = '#e8962a'
  var AID_CPR_BTN = '双指同时点击'
  var AID_VENT_BTN = '单手长按口部'
  var AID_TALK_SWAP = '换我来！'
  var AID_TALK_VENT = '30次按压完毕，现在给他两次人工呼吸！'
  var AID_CPR_PLAY1 = 15
  var AID_CPR_PLAY2 = 20
  var TIMED_CPR_EASY = 30
  var TIMED_CPR_HARD = 30
  var TIMED_AED_SEC = 30
  var TIMED_AED_ANALYZE = 2
  var TIMED_LEVELS = [
    {
      id: 'cpr',
      name: '心肺复苏',
      stars: 1,
      limit: TIMED_CPR_EASY + TIMED_CPR_HARD,
      art: 'timedCpr',
      rewardCoins: 80,
      rewardPills: 2,
      rewardCoq10: 5,
      rewardOmega3: 5,
      rewardMag: 5
    },
    {
      id: 'aed',
      name: 'AED使用',
      stars: 2,
      limit: TIMED_AED_SEC,
      art: 'timedAed',
      rewardCoins: 120,
      rewardPills: 3,
      rewardCoq10: 6,
      rewardOmega3: 6,
      rewardMag: 6
    }
  ]

  function timedLevel(id) {
    var i
    for (i = 0; i < TIMED_LEVELS.length; i++) {
      if (TIMED_LEVELS[i].id === id) return TIMED_LEVELS[i]
    }
    return TIMED_LEVELS[0]
  }

  function nutrientIconId(bonusKey) {
    if (bonusKey === 'coq10') return 'iconCoq10'
    if (bonusKey === 'omega3') return 'iconOmega3'
    return 'iconMagnesium'
  }

  function levelHasNutrientRewards(level) {
    return !!(level && (level.rewardCoq10 || level.rewardOmega3 || level.rewardMag))
  }

  function levelRewardEntries(level) {
    var out = []
    if (!level) return out
    if (level.rewardCoq10) out.push({ icon: 'iconCoq10', amount: level.rewardCoq10 })
    if (level.rewardOmega3) out.push({ icon: 'iconOmega3', amount: level.rewardOmega3 })
    if (level.rewardMag) out.push({ icon: 'iconMagnesium', amount: level.rewardMag })
    if (level.rewardCoins) out.push({ icon: 'iconCoin', amount: level.rewardCoins })
    if (level.rewardPills) out.push({ icon: 'iconCapsule', amount: level.rewardPills })
    return out
  }

  function levelNutrientFace(level) {
    if (!level) return level
    return {
      rewardCoq10: level.rewardCoq10,
      rewardOmega3: level.rewardOmega3,
      rewardMag: level.rewardMag
    }
  }

  function applyScaledNutrientReward(reward, level, q) {
    if (!reward || !level) return
    q = q == null ? 1 : q
    reward.coq10 = Math.round((level.rewardCoq10 || 0) * q * 10) / 10
    reward.omega3 = Math.round((level.rewardOmega3 || 0) * q * 10) / 10
    reward.mag = Math.round((level.rewardMag || 0) * q * 10) / 10
    reward.quality = q
  }
  var AID_CPR_FAM = 2
  var AID_CPR_FAM_AFTER = 2
  var AID_CPR_QUIZ = 8
  var AID_CPR_VENT = 1.5
  var AID_CPR_VENTS = 2
  var AID_TRAP_SEC = 10
  var AID_COIN_PERFECT = 10
  var AID_PILL_QUIZ = 1
  var AID_SCORE_PERFECT_CAP = 18
  var AID_END_TEXT = '救护车已及时赶到，病人前往就医...'
  var AID_SCORE_GOLD = '#E8B423'
  var AID_SCORE_TILE = '#F5C96A'
  var RAPID_SEC = 10
  var RAPID_BROWN = '#7A4A32'
  var RAPID_BTN = '#6E4030'
  var RAPID_TALK = '勇敢的挑战者，欢迎你来到快问快答知识大赛。老规矩，10秒一题，奖金累加，想停下随时都可以，但要继续的话，答错了可就一分钱都拿不走了哦...'
  var RAPID_BANK = [
    { d: 1, q: '冠心病稳定期，推荐每周有氧运动总时长至少为？', ok: '150分钟', bad: ['75分钟', '300分钟'] },
    { d: 1, q: '高血压人群控盐，每日食盐建议不超过？', ok: '5g', bad: ['8g', '10g'] },
    { d: 1, q: '运动中出现持续压榨样胸痛，正确做法是？', ok: '立刻停下休息并呼救', bad: ['放慢速度坚持完成运动', '大量喝水缓解不适'] },
    { d: 1, q: '下列哪种油脂更适合心血管高危人群日常食用？', ok: '橄榄油', bad: ['猪油', '棕榈油'] },
    { d: 1, q: '成年人维持心脏健康，推荐睡眠时长优先选择？', ok: '7～9小时', bad: ['5小时内', '10小时以上'] },
    { d: 1, q: '疑似心绞痛发作，休息后未缓解，应该？', ok: '尽快拨打120', bad: ['自行多服止痛药', '走动促进血液循环'] },
    { d: 1, q: '对于保护心血管，下列饮品更推荐？', ok: '白开水', bad: ['含糖奶茶', '浓咖啡'] },
    { d: 1, q: '有心脏病史人群，最佳运动时机应避开？', ok: '清晨寒冷时段', bad: ['傍晚', '午后'] },
    { d: 1, q: '血脂偏高人群，优先少吃哪一类食物？', ok: '动物内脏', bad: ['深海鱼', '新鲜果蔬'] },
    { d: 1, q: '长期大量饮酒对心脏主要危害是？', ok: '诱发心律失常', bad: ['保护心肌', '改善血管弹性'] },
    { d: 2, q: '心源性猝死，急性症状发作至死亡的时间界限为？', ok: '1小时内', bad: ['6小时内', '24小时内'] },
    { d: 2, q: '下列哪一项属于心源性猝死独立危险因素？', ok: '高血压', bad: ['缺铁性贫血', '过敏性鼻炎'] },
    { d: 2, q: '成年人心脏骤停胸外按压，推荐按压深度是？', ok: '5–6cm', bad: ['3–4cm', '7–8cm'] },
    { d: 2, q: '发生心脏骤停，AED分析心律阶段应当？', ok: '离开患者', bad: ['持续按压', '人工通气'] },
    { d: 2, q: '以下哪种疾病最易引发心源性猝死？', ok: '肥厚型心肌病', bad: ['房间隔缺损', '心包囊肿'] },
    { d: 2, q: '心脏骤停复苏成功后，目标体温管理推荐维持体温？', ok: '32–36℃', bad: ['28–31℃', '37.5–38.5℃'] },
    { d: 2, q: '下列哪类心律失常，是院外猝死最常见初始心律？', ok: '心室颤动', bad: ['心房颤动', '阵发性室上速'] },
    { d: 2, q: '对于猝死高危人群，可用于风险筛查的检查是？', ok: '24小时动态心电图', bad: ['下肢血管超声', '胃镜'] },
    { d: 2, q: '下列哪项是诱发心源性猝死的急性诱因？', ok: '剧烈情绪激动', bad: ['轻度皮肤擦伤', '普通感冒'] },
    { d: 2, q: '单人施救成人心脏骤停，按压通气比为？', ok: '30:2', bad: ['15:2', '60:2'] },
    { d: 3, q: '下列哪一项不属于心源性猝死的结构性病因？', ok: '长QT综合征', bad: ['致心律失常性右室心肌病', '冠状动脉粥样硬化'] },
    { d: 3, q: '成人胸外按压，中断按压的单次最长时间建议不超过？', ok: '10秒', bad: ['15秒', '20秒'] },
    { d: 3, q: '以下哪项情况，不影响AED电极片贴放？', ok: '胸壁有轻微体毛', bad: ['胸壁有水', '胸前有植入式除颤器'] },
    { d: 3, q: '属于心源性猝死可干预危险因素的是？', ok: '高血脂', bad: ['男性性别', '家族猝死史'] },
    { d: 3, q: '心脏骤停复苏后目标体温管理一般持续多久？', ok: '24h', bad: ['12h', '48h'] },
    { d: 3, q: '下列心律失常，不属于恶性室性心律失常的是？', ok: '加速性室性自主心律', bad: ['多形性室速', '单形性持续性室速'] },
    { d: 3, q: '目击院外心脏骤停，优先选择的干预措施是？', ok: '胸外按压+AED', bad: ['人工呼吸', '静脉给药'] },
    { d: 3, q: '急性心梗早期，诱发室颤最主要机制是？', ok: '心肌折返激动', bad: ['心肌细胞坏死', '心室壁变薄'] },
    { d: 3, q: '下列哪类人群，猝死风险相对最低？', ok: '单纯房性早搏', bad: ['陈旧心梗伴射血分数35%', '肥厚型心肌病'] },
    { d: 3, q: '肾上腺素用于心脏骤停，推荐给药间隔为？', ok: '3～5分钟', bad: ['1～2分钟', '6～8分钟'] }
  ]
  var AID_CPR_QUIZ_LIST = [
    {
      talk: '口袋里有速效救心丸，现在喂他吃吗？',
      opts: [
        { text: '先别喂，继续按压', ok: true },
        { text: '马上喂下去', ok: false }
      ]
    },
    {
      talk: '要不要垫个枕头，让他躺高一点好呼吸？',
      opts: [
        { text: '垫高一点更舒服', ok: false },
        { text: '不要垫，保持平躺', ok: true }
      ]
    }
  ]
  var AID_CPR_QUIZ_OFFICE = {
    talk: '他带了金属手链！是否要在下一次电击前摘下来？',
    opts: [
      { text: '那先立即摘掉手链', ok: false },
      { text: '不管它，保持按压', ok: true }
    ]
  }
  var AID_CPR_QUIZ_OFFICE_NOSHOCK = {
    talk: 'AED 提示「不建议电击」，我们要停下吗？',
    opts: [
      { text: '停下，不建议电击就结束', ok: false },
      { text: '继续按压，不要停', ok: true }
    ]
  }
  var AID_CONTACTS = [
    { id: 'mom', name: '妈妈', sub: '手机' },
    { id: 'er', name: '120急救中心', sub: '急救电话', num: '120' },
    { id: 'prop', name: '社区物业', sub: '座机' }
  ]
  var AID_RECENT = [
    { id: 'r1', name: '物业', sub: '昨天 18:21' },
    { id: 'r2', name: '张医生', sub: '星期一' },
    { id: 'er2', name: '120急救中心', sub: '紧急', num: '120' }
  ]
  var AID_ADDR = [
    { id: 'cn', text: '中国' },
    { id: 'zj', text: '浙江省' },
    { id: 'hz', text: '杭州市', need: true },
    { id: 'xq', text: '幸福小区', need: true },
    { id: 'cr', text: '十字路口' },
    { id: 'tr', text: '红绿灯右转', trap: true },
    { id: 'st', text: '南方' },
    { id: 'un', text: '1栋1单元', need: true },
    { id: 'rm', text: '301室', need: true },
    { id: 'sf', text: '沙发' },
    { id: 'go', text: '路口直行', trap: true }
  ]
  var AID_NEED = ['hz', 'xq', 'un', 'rm']
  var AID_ADDR_OFFICE = [
    { id: 'ofcn', text: '中国' },
    { id: 'ofhz', text: '杭州市', need: true },
    { id: 'ofxd', text: '星辰大厦', need: true },
    { id: 'of18', text: '18楼', need: true },
    { id: 'ofrm', text: '会议室A', need: true },
    { id: 'ofhall', text: '浙江省' },
    { id: 'ofpark', text: '最大的办公室', trap: true },
    { id: 'ofnext', text: '隔壁写字楼', trap: true },
    { id: 'ofst', text: '南方' },
    { id: 'ofgo', text: '电梯口直行', trap: true }
  ]
  var AID_NEED_OFFICE = ['ofhz', 'ofxd', 'of18', 'ofrm']

  function aidAddrBank(levelId) {
    return levelId === 'office' ? AID_ADDR_OFFICE : AID_ADDR
  }

  function aidNeedList(levelId) {
    return levelId === 'office' ? AID_NEED_OFFICE : AID_NEED
  }

  function aidAddrById(id) {
    var i
    for (i = 0; i < AID_ADDR.length; i++) {
      if (AID_ADDR[i].id === id) return AID_ADDR[i]
    }
    for (i = 0; i < AID_ADDR_OFFICE.length; i++) {
      if (AID_ADDR_OFFICE[i].id === id) return AID_ADDR_OFFICE[i]
    }
    return null
  }

  var COLORS = {
    wall: '#ecf5f2',
    ink: '#2c3d3d',
    muted: '#5e7373',
    card: 'rgba(255,255,255,0.94)',
    track: '#d5e6e4',
    fill: '#c45c55',
    btn: '#c45c55',
    btnText: '#ffffff'
  }

  function createImageNode() {
    return isWx ? wx.createImage() : new Image()
  }

  function tryWxLoadFont(path) {
    if (!path || typeof wx.loadFont !== 'function') return ''
    try {
      var family = wx.loadFont(path)
      return family || ''
    } catch (err) {
      console.warn('wx.loadFont fail', path, err)
      return ''
    }
  }

  function finishWxFont(resolve, err) {
    if (!FONT_FAMILY) console.warn('custom font missing', err)
    else console.log('custom font', FONT_FAMILY)
    resolve()
  }

  function loadWxFontFromUserData(srcPath, resolve) {
    var fs = wx.getFileSystemManager()
    var dest = wx.env.USER_DATA_PATH + '/ui.ttf'
    function loadDest(err) {
      var family = tryWxLoadFont(dest)
      if (family) FONT_FAMILY = family
      finishWxFont(resolve, FONT_FAMILY ? null : err)
    }
    fs.readFile({
      filePath: srcPath,
      success: function (res) {
        fs.writeFile({
          filePath: dest,
          data: res.data,
          success: function () { loadDest() },
          fail: function (err) { loadDest(err) }
        })
      },
      fail: function (err) {
        console.warn('font read fail', srcPath, err)
        finishWxFont(resolve, err)
      }
    })
  }

  function loadDialogFont() {
    return new Promise(function (resolve) {
      if (isWx) {
        var paths = [FONT_FILE, '/' + FONT_FILE]
        var i
        var family
        for (i = 0; i < paths.length; i++) {
          family = tryWxLoadFont(paths[i])
          if (family) {
            FONT_FAMILY = family
            finishWxFont(resolve)
            return
          }
        }
        try {
          loadWxFontFromUserData(FONT_FILE, resolve)
        } catch (err) {
          console.warn('font copy fail', err)
          finishWxFont(resolve)
        }
        return
      }
      if (typeof FontFace !== 'undefined' && document.fonts) {
        var face = new FontFace('FZSJ-NIDHJMT', 'url(' + FONT_FILE + ')')
        face.load().then(function (loaded) {
          document.fonts.add(loaded)
          FONT_FAMILY = 'FZSJ-NIDHJMT'
          resolve()
        }).catch(function (err) {
          console.warn('font load fail', err)
          resolve()
        })
        return
      }
      resolve()
    })
  }

  function loadImage(src, optional) {
    return new Promise(function (resolve, reject) {
      if (src) src = String(src).split('?')[0]
      var img = createImageNode()
      img.onload = function () { resolve(img) }
      img.onerror = function () {
        if (optional) resolve(null)
        else reject(new Error('Failed to load ' + src))
      }
      img.src = src
    })
  }

  function SoundBank() {
    this.players = {}
    this.loops = {}
    this.unlocked = !isWx
    this.bgmId = ''
    this.pendingBgm = ''
    this.sfxMul = 1
    this.bgmMul = 1
    var i
    var item
    for (i = 0; i < SOUND_LIST.length; i++) {
      item = SOUND_LIST[i]
      if (item.loop) this.loops[item.id] = makeLoop(item, this)
      else this.players[item.id] = makeSfx(item, this)
    }
  }

  function soundGain(base, mul) {
    return clamp(base * (mul == null ? 1 : mul), 0, 1)
  }

  function makeSfx(item, bank) {
    var base = item.volume != null ? item.volume : 0.8
    var src = item.src
    function vol() {
      return soundGain(base, bank && bank.sfxMul)
    }
    if (isWx && typeof wx.createInnerAudioContext === 'function') {
      var nodes = [0, 1, 2].map(function () {
        var a = wx.createInnerAudioContext()
        a.src = src
        a.volume = vol()
        return a
      })
      var n = 0
      return function () {
        var a = nodes[n++ % nodes.length]
        try {
          a.volume = vol()
          a.stop()
          if (typeof a.seek === 'function') a.seek(0)
          a.play()
        } catch (err) {}
      }
    }
    var proto = typeof Audio !== 'undefined' ? new Audio(src) : null
    if (proto) {
      proto.preload = 'auto'
      proto.volume = vol()
    }
    return function () {
      if (!proto) return
      var a = proto.cloneNode(true)
      a.volume = vol()
      var play = a.play()
      if (play && play.catch) play.catch(function () {})
    }
  }

  function makeLoop(item, bank) {
    var base = item.volume != null ? item.volume : 0.36
    var src = item.src
    var isBgm = BGM_LOOP_IDS.indexOf(item.id) !== -1
    function vol() {
      return soundGain(base, isBgm ? (bank && bank.bgmMul) : (bank && bank.sfxMul))
    }
    if (isWx && typeof wx.createInnerAudioContext === 'function') {
      var a = wx.createInnerAudioContext()
      a.src = src
      a.loop = true
      a.volume = vol()
      return {
        playing: false,
        applyVolume: function () {
          try { a.volume = vol() } catch (err) {}
        },
        play: function () {
          try {
            a.loop = true
            a.volume = vol()
            if (typeof a.stop === 'function') a.stop()
            if (typeof a.seek === 'function') a.seek(0)
            a.play()
          } catch (err) {}
        },
        stop: function () {
          try {
            a.loop = false
            a.stop()
            if (typeof a.seek === 'function') a.seek(0)
          } catch (err) {}
        }
      }
    }
    var html = typeof Audio !== 'undefined' ? new Audio(src) : null
    if (html) {
      html.loop = true
      html.preload = 'auto'
      html.volume = vol()
    }
    return {
      playing: false,
      applyVolume: function () {
        if (html) html.volume = vol()
      },
      play: function () {
        if (!html) return
        html.loop = true
        html.volume = vol()
        try { html.currentTime = 0 } catch (err) {}
        var play = html.play()
        if (play && play.catch) play.catch(function () {})
      },
      stop: function () {
        if (!html) return
        html.loop = false
        html.pause()
        html.volume = 0
        try { html.currentTime = 0 } catch (err) {}
      }
    }
  }

  SoundBank.prototype.unlock = function () {
    this.unlocked = true
  }

  SoundBank.prototype.stopAllBgm = function () {
    var i
    var loop
    this.pendingBgm = ''
    this.bgmId = ''
    for (i = 0; i < BGM_LOOP_IDS.length; i++) {
      loop = this.loops[BGM_LOOP_IDS[i]]
      if (!loop) continue
      loop.playing = false
      loop.stop()
    }
    this.stop('step')
  }

  SoundBank.prototype.play = function (id) {
    if (!this.unlocked) return
    var fn = this.players[id]
    if (fn) fn()
  }

  SoundBank.prototype.start = function (id) {
    if (!this.unlocked) return
    var loop = this.loops[id]
    if (!loop || loop.playing) return
    loop.playing = true
    loop.play()
  }

  SoundBank.prototype.stop = function (id) {
    var loop = this.loops[id]
    if (!loop) return
    loop.playing = false
    loop.stop()
    if (this.bgmId === id) this.bgmId = ''
  }

  SoundBank.prototype.playBgm = function (id) {
    if (!id) {
      this.stopAllBgm()
      return
    }
    if (!this.unlocked) {
      this.stopAllBgm()
      this.pendingBgm = id
      return
    }
    if (this.bgmId === id) {
      this.ensureSoloBgm(id)
      return
    }
    this.stopAllBgm()
    var loop = this.loops[id]
    if (!loop) return
    this.pendingBgm = ''
    this.bgmId = id
    loop.playing = true
    loop.play()
  }

  SoundBank.prototype.ensureSoloBgm = function (keepId) {
    var i
    var id
    var loop
    for (i = 0; i < BGM_LOOP_IDS.length; i++) {
      id = BGM_LOOP_IDS[i]
      if (id === keepId) continue
      loop = this.loops[id]
      if (!loop) continue
      loop.playing = false
      loop.stop()
    }
    this.pendingBgm = ''
    this.bgmId = keepId
  }

  SoundBank.prototype.stopBgm = function () {
    this.stopAllBgm()
  }

  SoundBank.prototype.applyLoopVolumes = function () {
    var id
    var loop
    for (id in this.loops) {
      if (!Object.prototype.hasOwnProperty.call(this.loops, id)) continue
      loop = this.loops[id]
      if (loop && loop.applyVolume) loop.applyVolume()
    }
  }

  SoundBank.prototype.setSfxMul = function (v) {
    this.sfxMul = clamp(v, 0, 1)
    this.applyLoopVolumes()
  }

  SoundBank.prototype.setBgmMul = function (v) {
    this.bgmMul = clamp(v, 0, 1)
    this.applyLoopVolumes()
  }

  function setupCanvas() {
    var canvas
    var cssWidth
    var cssHeight
    var dpr

    if (isWx) {
      canvas = wx.createCanvas()
      var info = wx.getSystemInfoSync()
      dpr = info.pixelRatio || 1
      cssWidth = info.windowWidth
      cssHeight = info.windowHeight
    } else {
      canvas = document.getElementById('game')
      dpr = window.devicePixelRatio || 1
      cssWidth = canvas.clientWidth || window.innerWidth
      cssHeight = canvas.clientHeight || window.innerHeight
    }

    canvas.width = Math.round(cssWidth * dpr)
    canvas.height = Math.round(cssHeight * dpr)
    if (!isWx) {
      canvas.style.width = cssWidth + 'px'
      canvas.style.height = cssHeight + 'px'
    }

    var ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    return { canvas: canvas, ctx: ctx, dpr: dpr, width: cssWidth, height: cssHeight }
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v))
  }

  function shuffle(list) {
    var a = list.slice()
    var i
    var j
    var t
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      t = a[i]
      a[i] = a[j]
      a[j] = t
    }
    return a
  }

  function lerp(a, b, t) {
    return a + (b - a) * t
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  function easeInCubic(t) {
    return t * t * t
  }

  function hash01(n) {
    var x = Math.sin((n || 0) * 127.1) * 43758.5453
    return x - Math.floor(x)
  }

  function addRoundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2)
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    addRoundRect(ctx, x, y, w, h, r)
  }

  function containRect(imgW, imgH, w, h) {
    var ir = imgW / imgH
    var sr = w / h
    if (ir > sr) {
      var dh = w / ir
      return { x: 0, y: (h - dh) / 2, w: w, h: dh }
    }
    var dw = h * ir
    return { x: (w - dw) / 2, y: 0, w: dw, h: h }
  }

  function fitSize(img, targetW) {
    var ratio = img.width / img.height
    return { w: targetW, h: targetW / ratio }
  }

  function hitRect(px, py, cx, cy, w, h, pad) {
    pad = pad || 0
    return px >= cx - w / 2 - pad && px <= cx + w / 2 + pad &&
      py >= cy - h / 2 - pad && py <= cy + h / 2 + pad
  }

  function hitBox(px, py, x, y, w, h, pad) {
    pad = pad || 0
    return px >= x - pad && px <= x + w + pad && py >= y - pad && py <= y + h + pad
  }

  function hitCircle(px, py, x, y, r, pad) {
    pad = pad || 0
    var dx = px - x
    var dy = py - y
    return dx * dx + dy * dy <= (r + pad) * (r + pad)
  }

  function wxMenuRect(view) {
    var w = view.width
    var h = view.height
    var capW = Math.min(w * 0.16, h * 0.26, 110)
    var capH = Math.min(h * 0.085, 32)
    var fallback = {
      x: w - capW - h * 0.028,
      y: h * 0.022,
      w: capW,
      h: capH
    }
    if (!isWx || typeof wx.getMenuButtonBoundingClientRect !== 'function') return fallback
    try {
      var r = wx.getMenuButtonBoundingClientRect()
      var info = wx.getSystemInfoSync()
      var ww = info.windowWidth || w
      var wh = info.windowHeight || h
      return {
        x: r.left * (w / ww),
        y: r.top * (h / wh),
        w: r.width * (w / ww),
        h: r.height * (h / wh)
      }
    } catch (err) {
      return fallback
    }
  }

  function hubInsets(view) {
    var w = view.width
    var h = view.height
    var inset = {
      l: h * 0.11,
      t: h * 0.11,
      r: h * 0.05,
      b: h * 0.04
    }
    if (!isWx || typeof wx.getSystemInfoSync !== 'function') return inset
    try {
      var info = wx.getSystemInfoSync()
      var ww = info.windowWidth || w
      var wh = info.windowHeight || h
      var sx = w / ww
      var sy = h / wh
      if (info.safeArea) {
        inset.l = Math.max(inset.l, info.safeArea.left * sx + h * 0.025)
        inset.t = Math.max(inset.t, info.safeArea.top * sy + h * 0.02)
        inset.r = Math.max(inset.r, (ww - info.safeArea.right) * sx + h * 0.02)
        inset.b = Math.max(inset.b, (wh - info.safeArea.bottom) * sy + h * 0.02)
      }
    } catch (err) {}
    return inset
  }

  function imgBox(img, targetW, fallbackRatio) {
    var ratio = fallbackRatio || 1
    if (img && img.width && img.height) ratio = img.height / img.width
    return { w: targetW, h: targetW * ratio }
  }

  function fillRoundRect(ctx, x, y, w, h, r, color) {
    if (w <= 0 || h <= 0) return
    roundRect(ctx, x, y, w, h, r)
    ctx.fillStyle = color
    ctx.fill()
  }

  function fillFatText(ctx, text, x, y) {
    ctx.fillText(text, x, y)
    ctx.fillText(text, x + 0.7, y)
  }

  function drawStar(ctx, x, y, r, color) {
    var i
    ctx.save()
    ctx.beginPath()
    for (i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
      var b = a + Math.PI / 5
      var ox = x + Math.cos(a) * r
      var oy = y + Math.sin(a) * r
      var ix = x + Math.cos(b) * r * 0.42
      var iy = y + Math.sin(b) * r * 0.42
      if (i === 0) ctx.moveTo(ox, oy)
      else ctx.lineTo(ox, oy)
      ctx.lineTo(ix, iy)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }

  function drawCover(ctx, img, x, y, w, h) {
    if (!img || !img.width) return
    var ir = img.width / img.height
    var tr = w / h
    var dw
    var dh
    var dx
    var dy
    if (ir > tr) {
      dh = h
      dw = h * ir
      dx = x - (dw - w) / 2
      dy = y
    } else {
      dw = w
      dh = w / ir
      dx = x
      dy = y - (dh - h) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  function makeOffscreen(w, h) {
    if (isWx && typeof wx.createOffscreenCanvas === 'function') {
      try {
        var wxC = wx.createOffscreenCanvas({ type: '2d', width: w, height: h })
        if (wxC) {
          wxC.width = w
          wxC.height = h
          return wxC
        }
      } catch (err) {}
    }
    if (typeof document !== 'undefined' && document.createElement) {
      var c = document.createElement('canvas')
      c.width = w
      c.height = h
      return c
    }
    return null
  }

  function cutEdgeBlack(img, thresh) {
    if (!img || !img.width) return img
    if (img.__cutBlack) return img.__cutBlack
    var canvas = makeOffscreen(img.width, img.height)
    if (!canvas || !canvas.getContext) {
      img.__cutBlack = img
      return img
    }
    try {
      var g = canvas.getContext('2d')
      g.drawImage(img, 0, 0)
      var data = g.getImageData(0, 0, canvas.width, canvas.height)
      var px = data.data
      var w = canvas.width
      var h = canvas.height
      var t = thresh == null ? 28 : thresh
      var vis = new Uint8Array(w * h)
      var stack = []
      function dark(i) {
        return px[i] <= t && px[i + 1] <= t && px[i + 2] <= t && px[i + 3] > 8
      }
      function push(x, y) {
        if (x < 0 || y < 0 || x >= w || y >= h) return
        var id = y * w + x
        if (vis[id]) return
        vis[id] = 1
        if (dark(id * 4)) stack.push(id)
      }
      var x
      var y
      for (x = 0; x < w; x++) {
        push(x, 0)
        push(x, h - 1)
      }
      for (y = 0; y < h; y++) {
        push(0, y)
        push(w - 1, y)
      }
      while (stack.length) {
        var id = stack.pop()
        px[id * 4 + 3] = 0
        x = id % w
        y = (id / w) | 0
        push(x - 1, y)
        push(x + 1, y)
        push(x, y - 1)
        push(x, y + 1)
      }
      g.putImageData(data, 0, 0)
      img.__cutBlack = canvas
      return canvas
    } catch (err) {
      img.__cutBlack = img
      return img
    }
  }

  function storePanel(ctx, x, y, w, h, r, lw, fill, stroke) {
    if (w <= 0 || h <= 0) return
    roundRect(ctx, x, y, w, h, r)
    ctx.fillStyle = fill || STORE_FILL
    ctx.fill()
    ctx.strokeStyle = stroke || STORE_ORANGE
    ctx.lineWidth = lw || 2.2
    ctx.stroke()
  }

  function addEllipse(ctx, x, y, rx, ry) {
    if (typeof ctx.ellipse === 'function') {
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
      return
    }
    var i
    var n = 28
    for (i = 0; i <= n; i++) {
      var a = (i / n) * Math.PI * 2
      var px = x + Math.cos(a) * rx
      var py = y + Math.sin(a) * ry
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
  }

  function drawHeartOutline(ctx, x, y, s, fill) {
    ctx.beginPath()
    ctx.moveTo(x, y + s * 0.55)
    ctx.bezierCurveTo(x - s * 1.15, y - s * 0.05, x - s * 0.42, y - s * 0.95, x, y - s * 0.28)
    ctx.bezierCurveTo(x + s * 0.42, y - s * 0.95, x + s * 1.15, y - s * 0.05, x, y + s * 0.55)
    if (fill) ctx.fill()
    else ctx.stroke()
  }

  function drawRoundBase(ctx, x, y, r, pressed) {
    ctx.save()
    ctx.globalAlpha = pressed ? 0.78 : 1
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.96)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(44,61,61,0.12)'
    ctx.lineWidth = Math.max(1.2, r * 0.05)
    ctx.stroke()
    ctx.restore()
  }

  function drawDefaultAvatar(ctx, x, y, r) {
    ctx.save()
    ctx.fillStyle = '#c45c55'
    ctx.beginPath()
    var s = r * 0.72
    ctx.moveTo(x, y + s * 0.58)
    ctx.bezierCurveTo(x - s * 1.15, y - s * 0.02, x - s * 0.42, y - s * 0.98, x, y - s * 0.28)
    ctx.bezierCurveTo(x + s * 0.42, y - s * 0.98, x + s * 1.15, y - s * 0.02, x, y + s * 0.58)
    ctx.fill()
    ctx.restore()
  }

  function drawNutrientBar(ctx, x, y, w, h, color, ratio, track) {
    var r = h / 2
    fillRoundRect(ctx, x, y, w, h, r, track || '#e4ecea')
    var fw = w * clamp(ratio, 0, 1)
    if (fw < 1) return
    ctx.save()
    roundRect(ctx, x, y, w, h, r)
    ctx.clip()
    fillRoundRect(ctx, x, y, Math.max(fw, h * 0.85), h, r, color)
    ctx.restore()
  }

  function nutrientCollectProgress(game) {
    var sum = 0
    var i
    for (i = 0; i < NUTRIENT_BARS.length; i++) {
      sum += Math.max(0, (game.nutrients && game.nutrients[NUTRIENT_BARS[i].id]) || 0)
    }
    var total = NUTRIENT_FULL * NUTRIENT_BARS.length
    return { sum: sum, total: total, ratio: total ? clamp(sum / total, 0, 1) : 0 }
  }

  function formatNutrientAmt(v) {
    v = v || 0
    if (Math.abs(v - Math.round(v)) < 0.05) return String(Math.round(v))
    return (Math.round(v * 10) / 10).toFixed(1)
  }

  function formatBonusPct(bonus) {
    var pct = (bonus || 0) * 100
    if (Math.abs(pct - Math.round(pct)) < 0.05) return '+' + Math.round(pct) + '%'
    return '+' + (Math.round(pct * 10) / 10).toFixed(1) + '%'
  }

  function drawCollectRing(ctx, cx, cy, r, ratio, lw) {
    ctx.save()
    ctx.lineWidth = lw
    ctx.lineCap = 'round'
    ctx.strokeStyle = NUTRIENT_RING_TRACK
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    var t = clamp(ratio, 0, 1)
    if (t > 0.001) {
      ctx.strokeStyle = NUTRIENT_RING_FILL
      ctx.beginPath()
      ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + t * Math.PI * 2)
      ctx.stroke()
    }
    ctx.restore()
  }

  function drawCollectTri(ctx, x, y, s, dir) {
    ctx.beginPath()
    ctx.moveTo(x + dir * s * 0.42, y)
    ctx.lineTo(x - dir * s * 0.32, y - s * 0.34)
    ctx.lineTo(x - dir * s * 0.32, y + s * 0.34)
    ctx.closePath()
    ctx.fillStyle = NUTRIENT_TOGGLE
    ctx.fill()
  }

  function wrapText(ctx, text, maxWidth) {
    var lines = []
    var line = ''
    for (var i = 0; i < text.length; i++) {
      var test = line + text[i]
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line)
        line = text[i]
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
    return lines
  }

  function markFlags(text, phrases) {
    var hi = []
    var i
    var p
    var at
    var k
    var word
    for (i = 0; i < text.length; i++) hi.push(false)
    if (!phrases) return hi
    for (p = 0; p < phrases.length; p++) {
      word = phrases[p]
      if (!word) continue
      at = 0
      while ((at = text.indexOf(word, at)) !== -1) {
        for (k = 0; k < word.length; k++) hi[at + k] = true
        at += word.length
      }
    }
    return hi
  }

  function wrapMarked(ctx, text, phrases, maxWidth) {
    var hi = markFlags(text || '', phrases)
    var lines = []
    var chars = []
    var width = 0
    var i
    var ch
    var cw
    text = text || ''
    for (i = 0; i < text.length; i++) {
      ch = text[i]
      cw = ctx.measureText(ch).width
      if (chars.length && width + cw > maxWidth) {
        lines.push(chars)
        chars = []
        width = 0
      }
      chars.push({ ch: ch, hi: hi[i] })
      width += cw
    }
    if (chars.length) lines.push(chars)
    return lines
  }

  function drawMarkedLines(ctx, lines, x, y, lineH, ink, accent) {
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var i
    var j
    var cx
    var run
    var runHi
    var item
    for (i = 0; i < lines.length; i++) {
      cx = x
      run = ''
      runHi = null
      for (j = 0; j < lines[i].length; j++) {
        item = lines[i][j]
        if (run && item.hi !== runHi) {
          ctx.fillStyle = runHi ? accent : ink
          fillFatText(ctx, run, cx, y + i * lineH)
          cx += ctx.measureText(run).width
          run = ''
        }
        runHi = item.hi
        run += item.ch
      }
      if (run) {
        ctx.fillStyle = runHi ? accent : ink
        fillFatText(ctx, run, cx, y + i * lineH)
      }
    }
  }

  function drawAidTag(ctx, text, x, y, h) {
    var padX = h * 0.46
    ctx.font = uiFont(Math.round(h * 0.52))
    var w = ctx.measureText(text).width + padX * 2
    fillRoundRect(ctx, x, y, w, h, Math.min(h * 0.32, 12), AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, text, x + w / 2, y + h / 2 + 1)
    return w
  }

  function drawAidReward(ctx, img, amount, x, y, iconS, hint) {
    if (img) drawContain(ctx, img, x + iconS / 2, y, iconS, iconS)
    var label = '× ' + amount + (hint || '')
    ctx.fillStyle = AID_INK
    ctx.font = uiFont(Math.round(iconS * 0.52))
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, label, x + iconS + iconS * 0.2, y + 1)
    return iconS + iconS * 0.2 + ctx.measureText(label).width
  }

  function drawLevelRewardRow(ctx, images, level, x, y, w, iconS) {
    var list = levelRewardEntries(level)
    if (!list.length) return 0
    var gap = iconS * 0.42
    var widths = []
    var total = 0
    var i
    ctx.font = uiFont(Math.round(iconS * 0.62))
    for (i = 0; i < list.length; i++) {
      widths[i] = iconS + iconS * 0.18 + ctx.measureText(String(list[i].amount)).width
      total += widths[i] + (i ? gap : 0)
    }
    var cx = x + Math.max(0, (w - total) / 2)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    for (i = 0; i < list.length; i++) {
      if (images[list[i].icon]) {
        drawContain(ctx, images[list[i].icon], cx + iconS / 2, y, iconS, iconS)
      }
      ctx.fillStyle = AID_INK
      ctx.font = uiFont(Math.round(iconS * 0.62))
      fillFatText(ctx, String(list[i].amount), cx + iconS + iconS * 0.16, y + 1)
      cx += widths[i] + gap
    }
    return total
  }

  function drawAidHand(ctx, x, y, ang, scale, flip) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(ang)
    ctx.scale((flip ? -1 : 1) * scale, scale)
    ctx.fillStyle = '#e8c4a4'
    ctx.strokeStyle = '#6a4a38'
    ctx.lineWidth = 3
    roundRect(ctx, -34, -22, 68, 78, 22)
    ctx.fill()
    ctx.stroke()
    var i
    for (i = 0; i < 4; i++) {
      var fx = -24 + i * 16
      roundRect(ctx, fx, -52, 14, 38, 7)
      ctx.fill()
      ctx.stroke()
    }
    ctx.beginPath()
    addEllipse(ctx, -40, 6, 14, 22)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  function drawPadArrow(ctx, x, y, dir, on, r) {
    ctx.save()
    ctx.translate(x, y)
    if (dir === 'right') ctx.rotate(Math.PI / 2)
    else if (dir === 'down') ctx.rotate(Math.PI)
    else if (dir === 'left') ctx.rotate(-Math.PI / 2)
    ctx.fillStyle = on ? AID_RED : 'rgba(255,255,255,0.86)'
    ctx.strokeStyle = on ? '#9a2c22' : 'rgba(40,40,40,0.2)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.strokeStyle = on ? '#ffffff' : AID_INK
    ctx.lineWidth = Math.max(5, r * 0.18)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(-r * 0.28, r * 0.18)
    ctx.lineTo(0, -r * 0.34)
    ctx.lineTo(r * 0.28, r * 0.18)
    ctx.stroke()
    ctx.restore()
  }

  function drawSprite(ctx, img, cx, cy, w, h, scale) {
    scale = scale == null ? 1 : scale
    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(scale, scale)
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    ctx.restore()
  }

  function nowSec() {
    if (typeof performance !== 'undefined' && performance.now) return performance.now() / 1000
    return Date.now() / 1000
  }

  function HomeScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.pressed = null
    this.fit = containRect(
      this.images.bg.width,
      this.images.bg.height,
      this.view.width,
      this.view.height
    )
    this.layout = this.computeLayout()
  }

  HomeScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var logoW = w * 0.36
    var logo = fitSize(this.images.logo, logoW)
    var start = fitSize(this.images.btnStart, w * 0.44)
    return {
      logo: { x: w * 0.95 - logo.w / 2, y: h * 0.30, w: logo.w, h: logo.h },
      start: { x: w * 0.5, y: h * 0.84, w: start.w, h: start.h }
    }
  }

  HomeScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    ctx.fillStyle = COLORS.wall
    ctx.fillRect(0, 0, w, h)
    drawCover(ctx, this.images.bg, 0, 0, w, h)

    var startScale = this.pressed === 'start' ? 0.96 : 1
    drawSprite(ctx, this.images.logo, L.logo.x, L.logo.y, L.logo.w, L.logo.h, 1)
    drawSprite(ctx, this.images.btnStart, L.start.x, L.start.y, L.start.w, L.start.h, startScale)
  }

  HomeScene.prototype.hit = function (x, y) {
    var L = this.layout
    if (hitRect(x, y, L.start.x, L.start.y, L.start.w, L.start.h, 8)) return 'start'
    return null
  }

  HomeScene.prototype.onDown = function (x, y) {
    this.pressed = this.hit(x, y)
  }

  HomeScene.prototype.onMove = function () {}

  HomeScene.prototype.onUp = function (x, y) {
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.game.sounds.unlock()
    this.game.sounds.play('tap')
    if (id === 'start') this.game.go('quiz')
  }

  function BackBtn(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.pressed = false
  }

  BackBtn.prototype.hit = function (px, py) {
    var dx = px - this.x
    var dy = py - this.y
    return dx * dx + dy * dy <= (this.r + 10) * (this.r + 10)
  }

  BackBtn.prototype.draw = function (ctx) {
    ctx.save()
    ctx.globalAlpha = this.pressed ? 0.7 : 1
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(44,61,61,0.12)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.strokeStyle = COLORS.ink
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(this.x + 4, this.y - 8)
    ctx.lineTo(this.x - 6, this.y)
    ctx.lineTo(this.x + 4, this.y + 8)
    ctx.stroke()
    ctx.restore()
  }

  var WALK_LEN = 1.2
  var REST_POSE = {
    armL: { x: -163, y: 24, rot: -0.0054993033 },
    armR: { x: 143, y: 39, rot: 0.0053786337 },
    legL: { x: -57, y: 208, rot: 0.019364348 },
    shinL: { x: 2, y: 127, rot: 0.09011556 },
    legR: { x: 71, y: 214, rot: 0.004826978 },
    shinR: { x: -5.3868914, y: 127.02743, rot: 0.07454823 },
    pupilL: { x: -149, y: 14 },
    pupilR: { x: -44, y: 14 }
  }
  var WALK_TRACKS = {
    armL: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
      rot: [-0.27787003, -0.36114234, -0.23778799, 0.034404244, 0.09022908, -0.11055226, -0.27787003],
      x: [-170, -168, -173, -161, -163, -165, -166],
      y: [24, 33, 26, 24, 15, 18, 31]
    },
    armR: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.2],
      rot: [0.27897695, 0.38821703, 0.18753351, 0.023586184, -0.059553407, 0.27897695]
    },
    legL: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
      rot: [0.46944618, 0.24454176, 0.03369239, -0.36192223, -0.47315368, 0.22033776, 0.45739618]
    },
    shinL: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
      rot: [0.008598074, -0.07054494, -0.10089362, 0.0059271827, -0.23535421, -0.79516244, -0.019996047]
    },
    legR: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
      rot: [-0.28181124, 0.00421717, 0.49686334, 0.6943607, 0.549388, -0.005998373, -0.35742512]
    },
    shinR: {
      t: [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2],
      rot: [-0.03265705, -0.15734352, -0.8226472, -0.3170017, 0.17577684, 0.13539873, -0.032731473],
      x: [-5, -5, -5, -5, -5, -5, -5],
      y: [126, 126, 126, 126, 126, 126, 126]
    }
  }

  function sampleTrack(track, t) {
    var times = track.t
    var values = track.v
    t = t % WALK_LEN
    if (t <= times[0]) return values[0]
    var i
    for (i = 1; i < times.length; i++) {
      if (t <= times[i]) {
        var u = (t - times[i - 1]) / (times[i] - times[i - 1] || 1)
        return lerp(values[i - 1], values[i], u)
      }
    }
    return values[values.length - 1]
  }

  function clonePose(src) {
    var out = {}
    var k
    for (k in src) {
      out[k] = { x: src[k].x, y: src[k].y, rot: src[k].rot || 0 }
    }
    return out
  }

  function lerpPose(from, to, u) {
    var out = clonePose(to)
    var k
    for (k in from) {
      out[k].x = lerp(from[k].x, to[k].x, u)
      out[k].y = lerp(from[k].y, to[k].y, u)
      out[k].rot = lerp(from[k].rot || 0, to[k].rot || 0, u)
    }
    return out
  }

  function idleLook(t) {
    var c = t % 5.4
    var look = 0
    if (c < 0.7) look = 0
    else if (c < 1.15) look = lerp(0, -1, (c - 0.7) / 0.45)
    else if (c < 2.0) look = -1
    else if (c < 2.45) look = lerp(-1, 1, (c - 2.0) / 0.45)
    else if (c < 3.3) look = 1
    else if (c < 3.75) look = lerp(1, 0, (c - 3.3) / 0.45)
    else look = 0
    return { x: look * 11, y: Math.abs(look) * 2 }
  }

  function HeartActor(images, sounds) {
    this.images = images
    this.sounds = sounds
    this.time = 0
    this.mode = 'idle'
    this.stopT = 0
    this.stopDur = 0.55
    this.stopFrom = null
    this.idleTime = 0
    this.bobY = 0
    this.lastFoot = 0
    this.hatIds = []
    this.darkAlpha = 0
    this.leftBottle = false
    this.holdBottle = false
    this.cigCount = 0
    this.smile = false
    this.sparkle = false
    this.shoeId = ''
    this.clothesId = ''
    this.glassesId = ''
    this.showFootT = SHOW_FOOT_DUR
    this.showFootDur = SHOW_FOOT_DUR
    this.eatT = FOOD_EAT_CHEW
    this.eatDur = FOOD_EAT_CHEW
    this.pose = clonePose(REST_POSE)
  }

  HeartActor.prototype.snapshotLook = function () {
    return {
      hatIds: (this.hatIds || []).slice(),
      darkAlpha: this.darkAlpha || 0,
      leftBottle: !!this.leftBottle,
      holdBottle: !!this.holdBottle,
      cigCount: this.cigCount || 0,
      smile: !!this.smile,
      sparkle: !!this.sparkle,
      shoeId: this.shoeId || '',
      clothesId: this.clothesId || '',
      glassesId: this.glassesId || ''
    }
  }

  HeartActor.prototype.applyLook = function (look) {
    if (!look) return
    this.hatIds = (look.hatIds || []).slice()
    this.darkAlpha = look.darkAlpha || 0
    this.leftBottle = !!look.leftBottle
    this.holdBottle = !!look.holdBottle
    this.cigCount = look.cigCount || 0
    this.smile = !!look.smile
    this.sparkle = !!look.sparkle
    this.shoeId = look.shoeId || ''
    this.clothesId = look.clothesId || ''
    this.glassesId = look.glassesId || ''
  }

  HeartActor.prototype.syncWardrobe = function (game) {
    var eq = (game && game.equipped) || {}
    this.clothesId = eq.clothes || ''
    this.glassesId = eq.glasses || ''
  }

  HeartActor.prototype.startWalk = function () {
    this.mode = 'walk'
    this.time = 0
    this.lastFoot = 0
    this.pose = clonePose(REST_POSE)
  }

  HeartActor.prototype.beginStop = function () {
    if (this.mode === 'stopping' || this.mode === 'idle') return
    this.mode = 'stopping'
    this.stopFrom = clonePose(this.pose)
    this.stopT = 0
    if (this.sounds) this.sounds.stop('step')
  }

  HeartActor.prototype.applyWalk = function () {
    var p = this.pose
    var time = this.time
    function bone(name) {
      var tr = WALK_TRACKS[name]
      var rest = REST_POSE[name]
      p[name].rot = sampleTrack({ t: tr.t, v: tr.rot }, time)
      p[name].x = tr.x ? sampleTrack({ t: tr.t, v: tr.x }, time) : rest.x
      p[name].y = tr.y ? sampleTrack({ t: tr.t, v: tr.y }, time) : rest.y
    }
    bone('armL')
    bone('armR')
    bone('legL')
    bone('shinL')
    bone('legR')
    bone('shinR')
    p.pupilL.x = REST_POSE.pupilL.x
    p.pupilL.y = REST_POSE.pupilL.y
    p.pupilR.x = REST_POSE.pupilR.x
    p.pupilR.y = REST_POSE.pupilR.y
    this.bobY = Math.abs(Math.sin(this.time / WALK_LEN * Math.PI * 2)) * 5
    var beat = Math.floor((this.time + WALK_LEN * 0.25) / (WALK_LEN / 2))
    if (beat !== this.lastFoot) this.lastFoot = beat
  }

  HeartActor.prototype.applyIdle = function () {
    this.pose = clonePose(REST_POSE)
    var look = idleLook(this.idleTime)
    this.pose.pupilL.x = REST_POSE.pupilL.x + look.x
    this.pose.pupilR.x = REST_POSE.pupilR.x + look.x
    this.pose.pupilL.y = REST_POSE.pupilL.y + look.y
    this.pose.pupilR.y = REST_POSE.pupilR.y + look.y
    this.pose.armL.rot = REST_POSE.armL.rot + Math.sin(this.idleTime * 1.3) * 0.03
    if (!this.isHolding()) {
      this.pose.armR.rot = REST_POSE.armR.rot + Math.sin(this.idleTime * 1.3 + 0.8) * 0.03
    } else {
      this.pose.armR.rot = REST_POSE.armR.rot
    }
    this.bobY = Math.sin(this.idleTime * 1.6) * 2.5
    if (this.isEating()) {
      this.bobY += Math.sin(this.eatT * Math.PI * 7) * 5
    }
  }

  HeartActor.prototype.startEat = function () {
    this.eatT = 0
    this.eatDur = FOOD_EAT_CHEW
  }

  HeartActor.prototype.isEating = function () {
    return this.eatT < this.eatDur
  }

  HeartActor.prototype.startShowFoot = function () {
    this.showFootT = 0
  }

  HeartActor.prototype.applyShowFoot = function () {
    var t = clamp(this.showFootT / this.showFootDur, 0, 1)
    var lift
    if (t < 0.34) lift = easeOutCubic(t / 0.34)
    else if (t < 0.5) lift = 1
    else lift = 1 - easeInCubic((t - 0.5) / 0.5)
    this.pose.legL.rot = REST_POSE.legL.rot - 0.82 * lift
    this.pose.shinL.rot = REST_POSE.shinL.rot + 0.38 * lift
  }

  HeartActor.prototype.update = function (dt) {
    if (this.eatT < this.eatDur) this.eatT += dt
    if (this.mode === 'walk') {
      this.time += dt
      this.applyWalk()
    } else if (this.mode === 'stopping') {
      this.stopT += dt
      var u = easeOutCubic(clamp(this.stopT / this.stopDur, 0, 1))
      this.pose = lerpPose(this.stopFrom, REST_POSE, u)
      this.bobY = lerp(this.bobY, 0, u)
      if (u >= 1) {
        this.mode = 'idle'
        this.idleTime = 0
      }
    } else {
      this.idleTime += dt
      this.applyIdle()
      if (this.showFootT < this.showFootDur) {
        this.applyShowFoot()
        this.showFootT += dt
      }
    }
  }

  HeartActor.prototype.drawPart = function (ctx, img, x, y, rot, ox, oy, flipH) {
    var w = img.width
    var h = img.height
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (flipH) ctx.scale(-1, 1)
    ctx.drawImage(img, ox - w / 2, oy - h / 2, w, h)
    ctx.restore()
  }

  HeartActor.prototype.draw = function (ctx, x, y, scale) {
    var img = this.images
    var p = this.pose
    ctx.save()
    ctx.translate(x, y + this.bobY * scale)
    ctx.scale(scale, scale)

    this.drawPart(ctx, img.armL, p.armL.x, p.armL.y, p.armL.rot, 0, 173.5, false)
    this.drawLeftBottle(ctx)

    ctx.save()
    ctx.translate(p.legL.x, p.legL.y)
    ctx.rotate(p.legL.rot)
    this.drawPart(ctx, img.thighL, 0, 0, 0, 0, 69, false)
    this.drawShin(ctx, img.shinL, p.shinL.x, p.shinL.y, p.shinL.rot, 'L')
    ctx.restore()

    ctx.save()
    ctx.translate(p.legR.x, p.legR.y)
    ctx.rotate(p.legR.rot)
    this.drawPart(ctx, img.thighR, 0, 0, 0, 0, 69, false)
    this.drawShin(ctx, img.shinR, p.shinR.x, p.shinR.y, p.shinR.rot, 'R')
    ctx.restore()

    var bw = img.body.width
    var bh = img.body.height
    ctx.drawImage(img.body, -bw / 2, -bh / 2, bw, bh)
    this.drawClothes(ctx)
    this.drawAccessory(ctx, false)
    this.drawDarkCircles(ctx)
    ctx.drawImage(img.pupilL, p.pupilL.x - img.pupilL.width / 2, p.pupilL.y - img.pupilL.height / 2)
    ctx.drawImage(img.pupilR, p.pupilR.x - img.pupilR.width / 2, p.pupilR.y - img.pupilR.height / 2)
    this.drawMouth(ctx)
    this.drawAccessory(ctx, true)

    if (this.isHolding()) {
      this.drawHeldFood(ctx)
      this.drawHoldArm(ctx)
    } else {
      this.drawPart(ctx, img.armR, p.armR.x, p.armR.y, p.armR.rot, 0, 173.5, false)
    }
    this.drawSparkle(ctx)
    this.drawCigs(ctx)
    ctx.restore()
  }

  HeartActor.prototype.isHolding = function () {
    return (this.hatIds && this.hatIds.length) || this.holdBottle
  }

  HeartActor.prototype.drawShin = function (ctx, img, x, y, rot, side) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (side === 'R') ctx.scale(-1, 1)
    ctx.drawImage(img, -img.width / 2, 69 - img.height / 2, img.width, img.height)
    this.drawShoeOnShin(ctx, side)
    ctx.restore()
  }

  HeartActor.prototype.drawShoeOnShin = function (ctx, side) {
    var pic = this.shoeId ? this.images[this.shoeId] : null
    var L = pic ? SHOE_SPEC[this.shoeId] : null
    if (!pic || !L) return
    var s = L.h / pic.height
    var x = L.x + (side === 'R' ? (L.rightX || 0) : 0)
    ctx.save()
    ctx.translate(x, L.y)
    ctx.rotate(L.rot || 0)
    if (L.faceRight) ctx.scale(-1, 1)
    if (side === 'R') ctx.scale(-1, 1)
    ctx.drawImage(pic, -pic.width * s / 2, -pic.height * s / 2, pic.width * s, pic.height * s)
    ctx.restore()
  }

  HeartActor.prototype.drawProp = function (ctx, pic, L) {
    if (!pic || !L) return
    var s = L.h / pic.height
    ctx.save()
    ctx.translate(L.x, L.y)
    ctx.rotate(L.rot || 0)
    ctx.drawImage(pic, -pic.width * s / 2, -pic.height * s / 2, pic.width * s, pic.height * s)
    ctx.restore()
  }

  HeartActor.prototype.drawHoldArm = function (ctx) {
    var a = HOLD_ARM
    ctx.save()
    ctx.strokeStyle = a.color
    ctx.lineWidth = a.width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(a.fromX, a.fromY)
    ctx.bezierCurveTo(a.c1x, a.c1y, a.c2x, a.c2y, a.toX, a.toY)
    ctx.stroke()
    ctx.restore()
  }

  HeartActor.prototype.drawHeldFood = function (ctx) {
    var i
    for (i = 0; i < this.hatIds.length; i++) {
      var pic = this.images[this.hatIds[i]]
      if (!pic) continue
      var L = HOLD_LAYOUT[i] || HOLD_LAYOUT[0]
      this.drawProp(ctx, pic, L)
    }
    if (this.holdBottle) this.drawProp(ctx, this.images.wine, HOLD_BOTTLE)
  }

  HeartActor.prototype.drawLeftBottle = function (ctx) {
    if (!this.leftBottle || !this.images.wine) return
    var p = this.pose.armL
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    this.drawProp(ctx, this.images.wine, LEFT_BOTTLE)
    ctx.restore()
  }

  HeartActor.prototype.drawMouth = function (ctx) {
    if (this.isEating()) {
      var chew = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(this.eatT * Math.PI * 8))
      ctx.save()
      ctx.fillStyle = '#3a1414'
      ctx.beginPath()
      addEllipse(ctx, MOUTH.x, MOUTH.y + 6, MOUTH.r * (0.95 + chew * 0.55), MOUTH.r * (0.28 + chew * 1.05))
      ctx.fill()
      ctx.restore()
      return
    }
    if (this.cigCount > 0) {
      ctx.save()
      ctx.fillStyle = '#3a1414'
      ctx.beginPath()
      ctx.arc(MOUTH.x, MOUTH.y, MOUTH.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#1a0a0a'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()
      return
    }
    if (!this.smile) return
    var s = SMILE
    ctx.save()
    ctx.strokeStyle = s.color
    ctx.lineWidth = s.width
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(MOUTH.x + s.x0, MOUTH.y + s.y0)
    ctx.quadraticCurveTo(MOUTH.x + s.cx, MOUTH.y + s.cy, MOUTH.x + s.x1, MOUTH.y + s.y1)
    ctx.stroke()
    ctx.restore()
  }

  HeartActor.prototype.drawCigs = function (ctx) {
    var pic = this.images.cig
    var n = Math.min(this.cigCount || 0, CIG_IN_MOUTH.tips.length)
    if (!pic || n <= 0) return
    var fx = pic.width * CIG_IN_MOUTH.filterX
    var fy = pic.height * CIG_IN_MOUTH.filterY
    var tx = pic.width * CIG_IN_MOUTH.tipX
    var ty = pic.height * CIG_IN_MOUTH.tipY
    var srcAng = Math.atan2(ty - fy, tx - fx)
    var srcLen = Math.hypot(tx - fx, ty - fy)
    var pin = CIG_IN_MOUTH.pin
    var i
    for (i = 0; i < n; i++) {
      var tip = CIG_IN_MOUTH.tips[i]
      var dstAng = Math.atan2(tip.dy, tip.dx)
      var dstLen = Math.hypot(tip.dx, tip.dy)
      ctx.save()
      ctx.translate(MOUTH.x - tip.dx * pin, MOUTH.y - tip.dy * pin)
      ctx.rotate(dstAng - srcAng)
      ctx.scale(dstLen / srcLen, dstLen / srcLen)
      ctx.drawImage(pic, -fx, -fy)
      ctx.restore()
      this.drawCigPuffs(ctx, tip, pin)
    }
  }

  HeartActor.prototype.drawCigPuffs = function (ctx, tip, pin) {
    var puffs = CIG_IN_MOUTH.puffs
    if (!puffs || !puffs.length) return
    var fx = MOUTH.x - tip.dx * pin
    var fy = MOUTH.y - tip.dy * pin
    var len = Math.hypot(tip.dx, tip.dy) || 1
    var px = -tip.dy / len
    var py = tip.dx / len
    var pulse = 0.92 + 0.08 * Math.sin((this.idleTime || 0) * 6)
    var i
    for (i = 0; i < puffs.length; i++) {
      var p = puffs[i]
      ctx.save()
      ctx.translate(fx + tip.dx * p.u + px * p.v * len, fy + tip.dy * p.u + py * p.v * len)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.beginPath()
      ctx.arc(0, 0, p.r * pulse, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  HeartActor.prototype.drawSparkle = function (ctx) {
    if (!this.sparkle) return
    var r = SPARKLE.r * (0.92 + 0.08 * Math.sin((this.idleTime || 0) * 5))
    ctx.save()
    ctx.translate(SPARKLE.x, SPARKLE.y)
    ctx.rotate(0.18)
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'
    ctx.shadowBlur = 10
    ctx.beginPath()
    var i
    for (i = 0; i < 4; i++) {
      var a = i * Math.PI / 2 - Math.PI / 2
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
      var b = a + Math.PI / 4
      ctx.lineTo(Math.cos(b) * r * 0.26, Math.sin(b) * r * 0.26)
    }
    ctx.closePath()
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.strokeStyle = 'rgba(90, 40, 40, 0.35)'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  }

  HeartActor.prototype.drawDarkCircles = function (ctx) {
    var pic = this.images.darkCircles
    if (!pic || this.darkAlpha <= 0) return
    var s = DARK_CIRCLES.scale
    ctx.save()
    ctx.globalAlpha = this.darkAlpha
    ctx.drawImage(
      pic,
      DARK_CIRCLES.x - pic.width * s / 2,
      DARK_CIRCLES.y - pic.height * s / 2,
      pic.width * s,
      pic.height * s
    )
    ctx.restore()
  }

  function imageContentBox(img) {
    var full = { x: 0, y: 0, w: img && img.width ? img.width : 0, h: img && img.height ? img.height : 0 }
    if (!img || !img.width) return full
    if (img.__contentBox) return img.__contentBox
    var canvas = makeOffscreen(img.width, img.height)
    if (!canvas || !canvas.getContext) {
      img.__contentBox = full
      return full
    }
    try {
      var g = canvas.getContext('2d')
      g.clearRect(0, 0, img.width, img.height)
      g.drawImage(img, 0, 0)
      var data = g.getImageData(0, 0, img.width, img.height).data
      var w = img.width
      var h = img.height
      var minX = w
      var minY = h
      var maxX = 0
      var maxY = 0
      var x
      var y
      var a
      for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
          a = data[(y * w + x) * 4 + 3]
          if (a > 12) {
            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
          }
        }
      }
      if (maxX < minX) {
        img.__contentBox = full
        return full
      }
      img.__contentBox = { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
      return img.__contentBox
    } catch (err) {
      img.__contentBox = full
      return full
    }
  }

  HeartActor.prototype.drawAccessory = function (ctx, overFace) {
    var id = this.glassesId
    if (!id) return
    var item = wardrobeItem(id)
    var pic = this.images[(item && item.wear) || (item && item.icon) || id]
    if (!pic) return
    var spec = ACCESSORY_FIT[id] || ACCESSORY_FIT_DEFAULT
    if (!!spec.overFace !== !!overFace) return
    var box = imageContentBox(pic)
    var srcW = Math.max(1, box.w)
    var srcH = Math.max(1, box.h)
    var scale = spec.width / srcW
    var dw = srcW * scale
    var dh = srcH * scale
    var dx = spec.cx - dw / 2
    var dy = spec.cy - dh / 2
    if (spec.clipBody) {
      var body = this.images.body
      if (!body) return
      var sheet = accessoryClipSheet(body, pic, box, dx + body.width / 2, dy + body.height / 2, dw, dh, id)
      if (sheet) {
        ctx.drawImage(sheet, -body.width / 2, -body.height / 2, body.width, body.height)
        return
      }
    }
    ctx.drawImage(pic, box.x, box.y, srcW, srcH, dx, dy, dw, dh)
  }

  function accessoryClipSheet(body, pic, box, ox, oy, dw, dh, id) {
    var key = 'acc:' + id + ':' + pic.width + 'x' + pic.height + ':' + ox + ',' + oy + ',' + dw + ',' + dh
    if (_clothesClip[key]) return _clothesClip[key]
    var c = makeOffscreen(body.width, body.height)
    if (!c || !c.getContext) return null
    var g = c.getContext('2d')
    if (!g) return null
    g.clearRect(0, 0, body.width, body.height)
    g.drawImage(pic, box.x, box.y, box.w, box.h, ox, oy, dw, dh)
    g.globalCompositeOperation = 'destination-in'
    g.drawImage(body, 0, 0)
    g.globalCompositeOperation = 'source-over'
    _clothesClip[key] = c
    return c
  }

  HeartActor.prototype.drawClothes = function (ctx) {
    var id = this.clothesId
    if (!id) return
    var item = wardrobeItem(id)
    var pic = this.images[(item && item.wear) || (item && item.icon) || id]
    var body = this.images.body
    if (!pic || !body) return
    var spec = CLOTHES_FIT[id] || clothesFitFor(body, pic)
    var sheet = fittedClothesSheet(body, pic, spec, id)
    if (sheet) {
      ctx.drawImage(sheet, -body.width / 2, -body.height / 2, body.width, body.height)
      return
    }
    var s = spec.scale
    ctx.drawImage(pic, -body.width / 2 + spec.ox, -body.height / 2 + spec.oy, pic.width * s, pic.height * s)
  }

  function clothesFitFor(body, pic) {
    if (pic.width === body.width && pic.height === body.height) {
      return { ox: 0, oy: 0, scale: 1 }
    }
    var scale = CLOTHES_BOX.w / pic.width
    return {
      ox: CLOTHES_BOX.ox,
      oy: CLOTHES_BOX.bottom - pic.height * scale,
      scale: scale
    }
  }

  function fittedClothesSheet(body, pic, spec, id) {
    var key = id + ':' + pic.width + 'x' + pic.height + ':' + spec.ox + ',' + spec.oy + ',' + spec.scale
    if (_clothesClip[key]) return _clothesClip[key]
    var c = makeOffscreen(body.width, body.height)
    if (!c || !c.getContext) return null
    var g = c.getContext('2d')
    if (!g) return null
    g.clearRect(0, 0, body.width, body.height)
    g.drawImage(pic, spec.ox, spec.oy, pic.width * spec.scale, pic.height * spec.scale)
    g.globalCompositeOperation = 'destination-in'
    g.drawImage(body, 0, 0)
    g.globalCompositeOperation = 'source-over'
    _clothesClip[key] = c
    return c
  }

  HeartActor.prototype.drawHats = function (ctx) {
    this.drawHeldFood(ctx)
  }

  function SmokeBurst(x, y, scale) {
    this.x = x
    this.y = y
    this.t = 0
    this.dur = MORPH_SMOKE
    this.puffs = []
    var i
    for (i = 0; i < 26; i++) {
      var a = Math.random() * Math.PI * 2
      this.puffs.push({
        a: a,
        dist: (18 + Math.random() * 170) * scale,
        r: (24 + Math.random() * 36) * scale,
        delay: Math.random() * 0.1,
        drift: (Math.random() - 0.5) * 28 * scale,
        squash: 0.7 + Math.random() * 0.5
      })
    }
  }

  SmokeBurst.prototype.update = function (dt) {
    this.t += dt
  }

  SmokeBurst.prototype.alive = function () {
    return this.t < this.dur
  }

  SmokeBurst.prototype.draw = function (ctx) {
    var i
    for (i = 0; i < this.puffs.length; i++) {
      var p = this.puffs[i]
      var u = clamp((this.t - p.delay) / (this.dur - p.delay), 0, 1)
      if (u <= 0) continue
      var e = 1 - (1 - u) * (1 - u)
      var x = this.x + Math.cos(p.a) * p.dist * e + p.drift * e
      var y = this.y + Math.sin(p.a) * p.dist * e * 0.86 - 8 * e
      var r = p.r * (0.45 + e * 1.05)
      var alpha = u < 0.22 ? u / 0.22 : 1 - (u - 0.22) / 0.78
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(p.a)
      ctx.scale(1, p.squash || 0.85)
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255,255,255,' + (0.72 * alpha) + ')'
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  function pickMorphRow(rows, score) {
    var i
    for (i = 0; i < rows.length; i++) {
      if (score <= rows[i].max) return rows[i]
    }
    return rows[rows.length - 1]
  }

  function dietMorphFor(score) {
    return pickMorphRow(DIET_MORPH, score)
  }

  function ensureNickInput() {
    if (isWx || typeof document === 'undefined') return null
    var el = document.getElementById('hg-nick')
    if (el) return el
    el = document.createElement('input')
    el.id = 'hg-nick'
    el.type = 'text'
    el.maxLength = NICK_MAX
    el.autocomplete = 'off'
    el.setAttribute('enterkeyhint', 'done')
    el.style.cssText = 'position:fixed;left:0;top:0;opacity:0;width:1px;height:1px;border:0;padding:0;margin:0;'
    document.body.appendChild(el)
    return el
  }

  function QuizScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.actor = new HeartActor(game.images, game.sounds)
    this.phase = 'walkIn'
    this.walkT = 0
    this.dialogIndex = 0
    this.typed = 0
    this.readyHit = null
    this.index = 0
    this.answers = []
    this.dragging = false
    this.done = false
    this.pressed = null
    this.optionHits = []
    this.back = new BackBtn(this.view.height * 0.08, this.view.height * 0.1, this.view.height * 0.045)
    this.value = 5
    this.smoke = null
    this.morphActive = false
    this.morphT = 0
    this.morphLine = ''
    this.morphHats = []
    this.pendingDarkAlpha = null
    this.pendingSparkle = null
    this.pendingVice = null
    this.pendingShoe = null
    this.pendingDone = false
    this.nickname = ''
    this.nickFocus = false
    this.toast = null
    var bg = this.images.bgEmpty || this.images.bg
    this.fit = containRect(bg.width, bg.height, this.view.width, this.view.height)
    this.layout = this.computeLayout()
    this.heartX = this.layout.fromX
    this.heartY = this.layout.heartY
    this.actor.startWalk()
  }

  QuizScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var cardW = Math.min(w * 0.54, 560)
    var cardH = Math.min(h * 0.74, 440)
    return {
      fromX: w + 160,
      centerX: w * 0.5,
      leftX: w * 0.2,
      heartY: h * 0.42,
      heartScale: h * 0.001,
      walkInDur: WALK_LEN * 5,
      walkLeftDur: WALK_LEN * 3,
      cardX: w * 0.64,
      cardY: h * 0.45,
      cardW: cardW,
      cardH: cardH
    }
  }

  QuizScene.prototype.update = function (dt) {
    var L = this.layout
    if (this.phase === 'walkIn') {
      this.walkT = Math.min(1, this.walkT + dt / L.walkInDur)
      this.heartX = lerp(L.fromX, L.centerX, this.walkT)
      if (this.walkT >= 1) {
        this.heartX = L.centerX
        this.actor.beginStop()
        this.phase = 'arriveTalk'
      }
    } else if (this.phase === 'arriveTalk') {
      if (this.actor.mode === 'idle') {
        this.phase = 'talk'
        this.typed = 0
        if (this.sounds) this.sounds.play('dialog')
      }
    } else if (this.phase === 'talk') {
      var line = DIALOGUE[this.dialogIndex]
      if (this.typed < line.text.length) {
        this.typed = Math.min(line.text.length, this.typed + dt * TYPE_CPS)
      }
    } else if (this.phase === 'walkLeft') {
      this.walkT = Math.min(1, this.walkT + dt / L.walkLeftDur)
      this.heartX = lerp(L.centerX, L.leftX, this.walkT)
      if (this.walkT >= 1) {
        this.heartX = L.leftX
        this.actor.beginStop()
        this.phase = 'arriveQuiz'
      }
    } else if (this.phase === 'arriveQuiz') {
      if (this.actor.mode === 'idle') this.phase = 'quiz'
    }
    if (this.morphActive) {
      this.morphT += dt
      if (this.smoke) this.smoke.update(dt)
      if (this.morphT >= MORPH_HAT_AT) {
        this.actor.hatIds = this.morphHats
        if (this.pendingDarkAlpha != null) {
          this.actor.darkAlpha = this.pendingDarkAlpha
          this.pendingDarkAlpha = null
        }
        if (this.pendingSparkle != null) {
          this.actor.sparkle = this.pendingSparkle
          this.pendingSparkle = null
        }
        if (this.pendingVice) {
          var v = this.pendingVice
          this.actor.cigCount = v.cigs
          this.actor.leftBottle = v.leftBottle
          this.actor.holdBottle = v.holdBottle
          this.actor.smile = v.smile
          this.pendingVice = null
        }
        if (this.pendingShoe) {
          this.actor.shoeId = this.pendingShoe
          this.actor.startShowFoot()
          this.pendingShoe = null
        }
      }
      if (this.morphT >= MORPH_TEXT_AT + MORPH_TEXT_HOLD && (!this.smoke || !this.smoke.alive())) {
        this.morphActive = false
        this.smoke = null
        if (this.pendingDone) {
          this.pendingDone = false
          this.done = true
        }
      }
    }
    this.actor.update(dt)
    if (this.toast) {
      this.toast.t += dt
      if (this.toast.t >= this.toast.dur) this.toast = null
    }
  }

  QuizScene.prototype.sliderGeom = function () {
    var L = this.layout
    var cardX = L.cardX - L.cardW / 2
    var cardY = L.cardY - L.cardH / 2
    var inset = 32
    var trackPad = 40
    var icon = Math.min(104, L.cardH * 0.32)
    var knob = hKnob(this.view.height)
    var iconY = cardY + L.cardH - inset - icon / 2
    var fromIcons = iconY - icon / 2 - 16 - knob * 0.35
    var minTrackY = cardY + 72 + 52 + knob * 0.5
    return {
      x: cardX + trackPad,
      y: Math.max(minTrackY, fromIcons),
      w: L.cardW - trackPad * 2,
      h: Math.max(12, this.view.height * 0.022),
      knob: knob,
      icon: icon,
      iconY: iconY,
      iconLeft: cardX + inset + icon / 2,
      iconRight: cardX + L.cardW - inset - icon / 2,
      cardX: cardX,
      cardY: cardY
    }
  }

  function hKnob(h) {
    return Math.max(24, h * 0.048)
  }

  function capsuleSize(view, maxW) {
    var h = Math.max(36, view.height * 0.068)
    var w = Math.min(maxW, h * 4.2)
    return { w: w, h: h }
  }

  function bandText(q, value) {
    var i
    for (i = 0; i < q.bands.length; i++) {
      if (value <= q.bands[i].max) return q.bands[i].text
    }
    return q.bands[q.bands.length - 1].text
  }

  function drawContain(ctx, img, cx, cy, maxW, maxH) {
    if (!img) return
    var s = Math.min(maxW / img.width, maxH / img.height)
    var dw = img.width * s
    var dh = img.height * s
    ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh)
  }

  function isStorePlaceholder(item) {
    if (!item) return true
    var src = item.iconSrc || ''
    return !!item.placeholder || !src || src.indexOf('placeholder') !== -1
  }

  function storeItemPic(images, item) {
    if (!item || isStorePlaceholder(item)) return null
    return images[item.icon] || null
  }

  function drawItemPlaceholder(ctx, x, y, w, h) {
    var r = Math.min(14, Math.min(w, h) * 0.14)
    fillRoundRect(ctx, x, y, w, h, r, 'rgba(214, 222, 222, 0.95)')
    ctx.save()
    ctx.strokeStyle = 'rgba(90, 110, 110, 0.42)'
    ctx.lineWidth = Math.max(1.6, Math.min(w, h) * 0.032)
    ctx.setLineDash([Math.max(4, w * 0.09), Math.max(3, w * 0.055)])
    roundRect(ctx, x + 3, y + 3, Math.max(4, w - 6), Math.max(4, h - 6), r)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(70, 88, 88, 0.62)'
    ctx.font = uiFont(Math.max(10, Math.round(Math.min(w, h) * 0.2)))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('待配图', x + w / 2, y + h / 2 + 1)
    ctx.restore()
  }

  QuizScene.prototype.current = function () {
    return QUIZ_QUESTIONS[this.index]
  }

  QuizScene.prototype.knobX = function () {
    var g = this.sliderGeom()
    return g.x + (this.value / 10) * g.w
  }

  QuizScene.prototype.setFromPointer = function (px) {
    var g = this.sliderGeom()
    var t = clamp((px - g.x) / g.w, 0, 1)
    var next = Math.round(t * 10)
    this.value = next
  }

  QuizScene.prototype.hitSlider = function (px, py) {
    var g = this.sliderGeom()
    var kx = this.knobX()
    var pad = 28
    return px >= g.x - pad && px <= g.x + g.w + pad &&
      py >= g.y - pad && py <= g.y + pad
      || hitRect(px, py, kx, g.y, g.knob * 2, g.knob * 2, 8)
  }

  QuizScene.prototype.navBtn = function (side) {
    var L = this.layout
    var size = capsuleSize(this.view, Math.min(L.cardW * 0.38, 186))
    var cardLeft = L.cardX - L.cardW / 2
    var cardRight = L.cardX + L.cardW / 2
    var cardBottom = L.cardY + L.cardH / 2
    var gap = Math.max(12, this.view.height * 0.02)
    var y = Math.min(this.view.height - size.h / 2 - 10, cardBottom + gap + size.h / 2)
    if (side === 'prev') {
      return { x: cardLeft + size.w / 2, y: y, w: size.w, h: size.h }
    }
    return { x: cardRight - size.w / 2, y: y, w: size.w, h: size.h }
  }

  QuizScene.prototype.nextBtn = function () {
    return this.navBtn('next')
  }

  QuizScene.prototype.prevBtn = function () {
    return this.navBtn('prev')
  }

  QuizScene.prototype.drawNavBtn = function (ctx, btn, label, pressKey) {
    ctx.save()
    ctx.translate(btn.x, btn.y)
    ctx.scale(this.pressed === pressKey ? 0.96 : 1, this.pressed === pressKey ? 0.96 : 1)
    ctx.fillStyle = COLORS.btn
    roundRect(ctx, -btn.w / 2, -btn.h / 2, btn.w, btn.h, btn.h / 2)
    ctx.fill()
    ctx.fillStyle = COLORS.btnText
    ctx.font = uiFont(18, 'bold')
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 0, 1)
    ctx.restore()
  }

  QuizScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    ctx.fillStyle = COLORS.wall
    ctx.fillRect(0, 0, w, h)
    if (this.images.bgEmpty) drawCover(ctx, this.images.bgEmpty, 0, 0, w, h)

    this.actor.draw(ctx, this.heartX, this.heartY, L.heartScale)
    this.back.draw(ctx)

    if (this.phase === 'talk') this.drawTalk(ctx)
    if (this.morphActive) this.drawMorph(ctx)
    if (this.phase === 'quiz' && !this.done) this.drawCard(ctx)
    if (this.phase === 'quiz' && this.done) this.drawSummary(ctx)
    this.drawToast(ctx)
  }

  QuizScene.prototype.advanceTalk = function () {
    var line = DIALOGUE[this.dialogIndex]
    if (this.typed < line.text.length) {
      this.typed = line.text.length
      return
    }
    if (line.button) return
    if (this.dialogIndex < DIALOGUE.length - 1) {
      this.dialogIndex += 1
      this.typed = 0
      if (this.sounds) this.sounds.play('dialog')
    }
  }

  QuizScene.prototype.startWalkLeft = function () {
    this.phase = 'walkLeft'
    this.walkT = 0
    this.actor.startWalk()
  }

  QuizScene.prototype.startDietMorph = function (score) {
    var spec = dietMorphFor(score)
    this.morphActive = true
    this.morphT = 0
    this.morphLine = spec.line
    this.morphHats = spec.hats
    this.actor.hatIds = []
    this.smoke = new SmokeBurst(this.heartX, this.heartY, this.layout.heartScale)
    this.index += 1
    this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
  }

  QuizScene.prototype.startExerciseMorph = function (score) {
    var row = pickMorphRow(EXERCISE_MORPH, score)
    this.morphActive = true
    this.morphT = 0
    this.morphLine = row.line
    this.morphHats = this.actor.hatIds
    this.pendingShoe = row.shoe || ''
    this.actor.shoeId = ''
    this.smoke = new SmokeBurst(this.heartX, this.heartY, this.layout.heartScale)
    this.index += 1
    this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
  }

  QuizScene.prototype.startSleepMorph = function (score) {
    this.morphActive = true
    this.morphT = 0
    this.morphLine = pickMorphRow(SLEEP_MORPH, score).line
    this.morphHats = this.actor.hatIds
    this.pendingDarkAlpha = sleepCircleAlpha(score)
    this.pendingSparkle = score >= 9
    this.actor.darkAlpha = 0
    this.actor.sparkle = false
    this.smoke = new SmokeBurst(this.heartX, this.heartY, this.layout.heartScale)
    this.index += 1
    this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
  }

  QuizScene.prototype.startViceMorph = function (score) {
    this.morphActive = true
    this.morphT = 0
    this.morphLine = pickMorphRow(VICE_MORPH, score).line
    this.morphHats = this.actor.hatIds.slice()
    this.pendingVice = viceMorphFor(score)
    this.actor.cigCount = 0
    this.actor.leftBottle = false
    this.actor.holdBottle = false
    this.actor.smile = false
    this.smoke = new SmokeBurst(this.heartX, this.heartY, this.layout.heartScale)
    this.pendingDone = true
  }

  QuizScene.prototype.drawMorph = function (ctx) {
    if (this.smoke && this.smoke.alive()) this.smoke.draw(ctx)
    if (!this.morphLine) return
    if (this.morphT < MORPH_TEXT_AT || this.morphT >= MORPH_TEXT_AT + MORPH_TEXT_HOLD) return

    var fontPx = Math.max(17, Math.round(this.view.height * 0.018))
    ctx.font = fontPx + 'px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var maxW = Math.min(320, this.view.width * 0.36)
    var rows = wrapText(ctx, this.morphLine, maxW - 28)
    var i
    var lineH = fontPx + 8
    var bw = 0
    for (i = 0; i < rows.length; i++) {
      bw = Math.max(bw, ctx.measureText(rows[i]).width)
    }
    bw = Math.max(140, bw + 44)
    var bh = Math.max(36, rows.length * lineH + 20)
    var bx = this.heartX
    var by = this.heartY + this.view.height * 0.34

    ctx.save()
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(44,61,61,0.16)'
    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 3
    roundRect(ctx, bx - bw / 2, by - bh / 2, bw, bh, Math.min(18, bh / 2))
    ctx.fill()
    ctx.restore()

    ctx.fillStyle = COLORS.ink
    ctx.font = fontPx + 'px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var startY = by - ((rows.length - 1) * lineH) / 2
    for (i = 0; i < rows.length; i++) {
      ctx.fillText(rows[i], bx, startY + i * lineH)
    }
  }

  QuizScene.prototype.drawTalk = function (ctx) {
    var line = DIALOGUE[this.dialogIndex]
    var w = this.view.width
    var h = this.view.height
    var shown = line.text.slice(0, Math.floor(this.typed))
    var done = this.typed >= line.text.length
    var fontPx = Math.max(20, Math.round(h * 0.034))
    var lineH = fontPx * 1.42
    var boxW = Math.min(w * 0.58, h * 1.22)
    var padX = h * 0.04
    var padTop = h * 0.03
    var padBot = h * 0.026

    ctx.font = uiFont(fontPx)
    var rows = wrapText(ctx, shown || ' ', boxW - padX * 2)
    var textH = Math.max(lineH, rows.length * lineH)

    var hint = ''
    var btnSize = null
    this.readyHit = null
    if (done && line.button) {
      btnSize = capsuleSize(this.view, Math.min(186, w * 0.2))
    } else if (done && this.dialogIndex === 0) {
      hint = '点击任意空白处继续'
    }

    var extraH = 0
    if (btnSize) extraH = btnSize.h + h * 0.018
    else if (hint) extraH = h * 0.034

    var boxH = padTop + textH + extraH + padBot
    var boxX = (w - boxW) / 2
    var boxY = h - Math.max(h * 0.05, 16) - boxH
    var cx = w / 2
    var radius = Math.min(22, boxH / 2)

    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.82)'
    roundRect(ctx, boxX, boxY, boxW, boxH, radius)
    ctx.fill()
    ctx.strokeStyle = 'rgba(44,61,61,0.08)'
    ctx.lineWidth = 1.2
    roundRect(ctx, boxX, boxY, boxW, boxH, radius)
    ctx.stroke()
    ctx.restore()

    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(fontPx)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var i
    for (i = 0; i < rows.length; i++) {
      ctx.fillText(rows[i], cx, boxY + padTop + lineH * 0.5 + i * lineH)
    }

    if (btnSize) {
      this.readyHit = {
        x: cx,
        y: boxY + boxH - padBot - btnSize.h / 2,
        w: btnSize.w,
        h: btnSize.h
      }
      this.drawNavBtn(ctx, this.readyHit, line.button, 'ready')
      return
    }

    if (!hint) return
    ctx.save()
    ctx.globalAlpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(nowSec() * 4.2))
    ctx.fillStyle = COLORS.muted
    ctx.font = uiFont(Math.max(12, Math.round(h * 0.02)))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(hint, cx, boxY + boxH - padBot - h * 0.01)
    ctx.restore()
  }

  QuizScene.prototype.drawCard = function (ctx) {
    var L = this.layout
    var q = this.current()
    var x = L.cardX - L.cardW / 2
    var y = L.cardY - L.cardH / 2
    ctx.save()
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(44,61,61,0.12)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 6
    roundRect(ctx, x, y, L.cardW, L.cardH, 28)
    ctx.fill()
    ctx.restore()

    ctx.fillStyle = '#9aa6b2'
    ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(QUIZ_TITLE, x + 24, y + 32)

    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(24, 'bold')
    var lines = wrapText(ctx, q.text, L.cardW - 48)
    var i
    for (i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x + 24, y + 72 + i * 32)
    }

    var g = this.sliderGeom()
    var kx = this.knobX()

    ctx.fillStyle = '#d8dee6'
    roundRect(ctx, g.x, g.y - g.h / 2, g.w, g.h, g.h / 2)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = COLORS.fill
    ctx.lineWidth = 4
    ctx.arc(kx, g.y, g.knob * 0.48, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = COLORS.ink
    ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(String(this.value), kx, g.y - g.knob * 0.48 - 4)

    drawContain(ctx, this.images[q.left], g.iconLeft, g.iconY, g.icon, g.icon)
    drawContain(ctx, this.images[q.right], g.iconRight, g.iconY, g.icon, g.icon)

    ctx.fillStyle = COLORS.fill
    ctx.font = '16px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(bandText(q, this.value), L.cardX, g.iconY)

    if (this.index > 0) this.drawNavBtn(ctx, this.prevBtn(), '上一题', 'prev')
    this.drawNavBtn(
      ctx,
      this.nextBtn(),
      this.index === QUIZ_QUESTIONS.length - 1 ? '生成角色' : '下一题',
      'next'
    )
  }

  QuizScene.prototype.nickBox = function () {
    var L = this.layout
    var x = L.cardX - L.cardW / 2
    var y = L.cardY - L.cardH / 2
    return {
      x: x + 24 + (L.cardW - 48) / 2,
      y: y + 44,
      w: L.cardW - 48,
      h: Math.max(40, this.view.height * 0.058)
    }
  }

  QuizScene.prototype.startNickEdit = function () {
    this.nickFocus = true
    var self = this
    if (isWx && typeof wx.showKeyboard === 'function') {
      wx.showKeyboard({
        defaultValue: this.nickname || '',
        maxLength: NICK_MAX,
        multiple: false,
        confirmHold: false,
        confirmType: 'done'
      })
      return
    }
    var el = ensureNickInput()
    if (!el) return
    el.value = this.nickname || ''
    el.oninput = function () {
      self.nickname = Array.from(el.value || '').slice(0, NICK_MAX).join('')
      if (el.value !== self.nickname) el.value = self.nickname
    }
    el.onblur = function () {
      self.nickFocus = false
    }
    el.onkeydown = function (e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        el.blur()
      }
    }
    setTimeout(function () { el.focus() }, 0)
  }

  QuizScene.prototype.stopNickEdit = function () {
    this.nickFocus = false
    if (isWx && typeof wx.hideKeyboard === 'function') {
      try { wx.hideKeyboard() } catch (err) {}
    }
    if (!isWx) {
      var el = document.getElementById('hg-nick')
      if (el) el.blur()
    }
  }

  QuizScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 0, dur: 1.8 }
    if (isWx && typeof wx.showToast === 'function') {
      wx.showToast({ title: text, icon: 'none', duration: 1800 })
    }
  }

  QuizScene.prototype.drawToast = function (ctx) {
    if (!this.toast || isWx) return
    var u = this.toast.t / this.toast.dur
    var alpha = u < 0.12 ? u / 0.12 : u > 0.82 ? (1 - u) / 0.18 : 1
    if (alpha <= 0) return
    var fontPx = Math.max(16, Math.round(this.view.height * 0.022))
    ctx.font = uiFont(fontPx)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var padX = 28
    var padY = 16
    var tw = ctx.measureText(this.toast.text).width
    var bw = Math.min(this.view.width * 0.72, tw + padX * 2)
    var bh = fontPx + padY * 2
    var x = this.view.width * 0.5
    var y = this.view.height * 0.42
    ctx.save()
    ctx.globalAlpha = 0.92 * alpha
    ctx.fillStyle = 'rgba(44,44,44,0.88)'
    ctx.shadowColor = 'rgba(0,0,0,0.18)'
    ctx.shadowBlur = 16
    roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, bh / 2)
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = alpha
    ctx.fillText(this.toast.text, x, y)
    ctx.restore()
  }

  QuizScene.prototype.confirmNickname = function () {
    var name = (this.nickname || '').trim()
    if (!name || nickLen(name) < 1 || nickLen(name) > NICK_MAX) {
      this.showToast(NICK_EMPTY)
      this.startNickEdit()
      return
    }
    if (nickHasBad(name)) {
      this.showToast(NICK_BAD)
      this.startNickEdit()
      return
    }
    this.stopNickEdit()
    this.game.nickname = name
    this.game.hubLook = this.actor.snapshotLook()
    this.game.go('play')
  }

  QuizScene.prototype.drawSummary = function (ctx) {
    var L = this.layout
    var x = L.cardX - L.cardW / 2
    var y = L.cardY - L.cardH / 2
    ctx.save()
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(44,61,61,0.12)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 6
    roundRect(ctx, x, y, L.cardW, L.cardH, 28)
    ctx.fill()
    ctx.restore()

    var box = this.nickBox()
    ctx.save()
    ctx.fillStyle = this.nickFocus ? '#eef6f5' : '#f4f7f8'
    roundRect(ctx, box.x - box.w / 2, box.y - box.h / 2, box.w, box.h, box.h / 2)
    ctx.fill()
    ctx.strokeStyle = this.nickFocus ? COLORS.fill : 'rgba(44,61,61,0.12)'
    ctx.lineWidth = this.nickFocus ? 2 : 1
    roundRect(ctx, box.x - box.w / 2, box.y - box.h / 2, box.w, box.h, box.h / 2)
    ctx.stroke()
    ctx.restore()

    var nick = this.nickname || ''
    ctx.font = uiFont(18)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var textX = box.x - box.w / 2 + 18
    if (nick) {
      ctx.fillStyle = COLORS.ink
      ctx.fillText(nick, textX, box.y)
      if (this.nickFocus && Math.floor(nowSec() * 2) % 2 === 0) {
        var tw = ctx.measureText(nick).width
        ctx.fillStyle = COLORS.fill
        ctx.fillRect(textX + tw + 2, box.y - 10, 2, 20)
      }
    } else {
      ctx.fillStyle = COLORS.muted
      ctx.fillText(NICK_HINT, textX, box.y)
      if (this.nickFocus && Math.floor(nowSec() * 2) % 2 === 0) {
        ctx.fillStyle = COLORS.fill
        ctx.fillRect(textX, box.y - 10, 2, 20)
      }
    }

    var i
    var listTop = box.y + box.h / 2 + 28
    for (i = 0; i < this.answers.length; i++) {
      var q = QUIZ_QUESTIONS[i]
      ctx.fillStyle = COLORS.muted
      ctx.font = uiFont(14)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillText(q.text, x + 24, listTop + i * 52)
      ctx.fillStyle = COLORS.fill
      ctx.font = uiFont(18, 'bold')
      ctx.fillText(this.answers[i] + ' 分', x + 24, listTop + 22 + i * 52)
    }

    this.drawNavBtn(ctx, this.prevBtn(), '上一题', 'prev')
    this.drawNavBtn(ctx, this.nextBtn(), '确定', 'confirm')
  }

  QuizScene.prototype.onDown = function (x, y) {
    this.back.pressed = this.back.hit(x, y)
    if (this.back.pressed) return
    if (this.phase === 'walkIn' || this.phase === 'walkLeft' || this.phase === 'arriveTalk' || this.phase === 'arriveQuiz') return
    if (this.phase === 'talk') {
      var line = DIALOGUE[this.dialogIndex]
      if (line.button && this.readyHit && hitRect(x, y, this.readyHit.x, this.readyHit.y, this.readyHit.w, this.readyHit.h, 4)) {
        this.pressed = 'ready'
      } else if (!line.button) {
        this.pressed = 'continue'
      }
      return
    }
    if (this.done) {
      var nick = this.nickBox()
      if (hitRect(x, y, nick.x, nick.y, nick.w, nick.h, 4)) this.pressed = 'nick'
      var cb = this.nextBtn()
      if (hitRect(x, y, cb.x, cb.y, cb.w, cb.h, 4)) this.pressed = 'confirm'
      var pb = this.prevBtn()
      if (hitRect(x, y, pb.x, pb.y, pb.w, pb.h, 4)) this.pressed = 'prev'
      return
    }
    if (this.morphActive) return
    var nb = this.nextBtn()
    if (hitRect(x, y, nb.x, nb.y, nb.w, nb.h, 4)) {
      this.pressed = 'next'
      return
    }
    if (this.index > 0) {
      var pb = this.prevBtn()
      if (hitRect(x, y, pb.x, pb.y, pb.w, pb.h, 4)) {
        this.pressed = 'prev'
        return
      }
    }
    if (this.hitSlider(x, y)) {
      this.dragging = true
      this.setFromPointer(x)
    }
  }

  QuizScene.prototype.onMove = function (x, y) {
    if (this.dragging) this.setFromPointer(x)
  }

  QuizScene.prototype.onUp = function (x, y) {
    if (this.back.pressed) {
      this.back.pressed = false
      if (this.back.hit(x, y)) {
        this.sounds.play('tap')
        this.game.go('home')
      }
      return
    }
    if (this.dragging) {
      this.dragging = false
      return
    }
    var act = this.pressed
    this.pressed = null
    if (this.phase === 'talk') {
      if (act === 'ready' && this.readyHit && hitRect(x, y, this.readyHit.x, this.readyHit.y, this.readyHit.w, this.readyHit.h, 4)) {
        var last = DIALOGUE[this.dialogIndex]
        if (this.typed < last.text.length) this.typed = last.text.length
        else {
          this.sounds.play('tap')
          this.startWalkLeft()
        }
      } else if (act === 'continue') {
        this.advanceTalk()
      }
      return
    }
    if (this.phase !== 'quiz') return
    if (this.done) {
      var nick = this.nickBox()
      if (act === 'nick' && hitRect(x, y, nick.x, nick.y, nick.w, nick.h, 4)) {
        this.startNickEdit()
        return
      }
      var cb = this.nextBtn()
      if (act === 'confirm' && hitRect(x, y, cb.x, cb.y, cb.w, cb.h, 4)) {
        this.sounds.play('tap')
        this.confirmNickname()
        return
      }
      var backQ = this.prevBtn()
      if (act === 'prev' && hitRect(x, y, backQ.x, backQ.y, backQ.w, backQ.h, 4)) {
        this.sounds.play('tap')
        this.stopNickEdit()
        this.done = false
        this.index = QUIZ_QUESTIONS.length - 1
        this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
        return
      }
      if (act === 'nick') return
      this.stopNickEdit()
      return
    }
    var nb = this.nextBtn()
    if (act === 'next' && hitRect(x, y, nb.x, nb.y, nb.w, nb.h, 4)) {
      this.sounds.play('tap')
      this.answers[this.index] = this.value
      if (this.index === 0) {
        this.startDietMorph(this.value)
        return
      }
      if (this.index === 1) {
        this.startExerciseMorph(this.value)
        return
      }
      if (this.index === 2) {
        this.startSleepMorph(this.value)
        return
      }
      if (this.index === 3) {
        this.startViceMorph(this.value)
        return
      }
      if (this.index < QUIZ_QUESTIONS.length - 1) {
        this.index += 1
        this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
      } else {
        this.done = true
      }
      return
    }
    var pb = this.prevBtn()
    if (act === 'prev' && this.index > 0 && hitRect(x, y, pb.x, pb.y, pb.w, pb.h, 4)) {
      this.sounds.play('tap')
      this.answers[this.index] = this.value
      this.index -= 1
      this.value = this.answers[this.index] != null ? this.answers[this.index] : 5
    }
  }

  function showSceneToast(scene, text) {
    scene.toast = { text: text, t: 0, dur: 1.6 }
    if (isWx && typeof wx.showToast === 'function') {
      wx.showToast({ title: text, icon: 'none', duration: 1600 })
    }
  }

  function tickSceneToast(scene, dt) {
    if (!scene.toast) return
    scene.toast.t += dt
    if (scene.toast.t >= scene.toast.dur) scene.toast = null
  }

  function drawSceneToast(ctx, view, toast) {
    if (!toast || isWx) return
    var u = toast.t / toast.dur
    var alpha = u < 0.12 ? u / 0.12 : u > 0.82 ? (1 - u) / 0.18 : 1
    if (alpha <= 0) return
    var fontPx = Math.max(16, Math.round(view.height * 0.022))
    ctx.font = uiFont(fontPx)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var tw = ctx.measureText(toast.text).width
    var bw = Math.min(view.width * 0.7, tw + 56)
    var bh = fontPx + 32
    ctx.save()
    ctx.globalAlpha = 0.92 * alpha
    ctx.fillStyle = 'rgba(44,44,44,0.88)'
    ctx.shadowColor = 'rgba(0,0,0,0.18)'
    ctx.shadowBlur = 16
    roundRect(ctx, view.width * 0.5 - bw / 2, view.height * 0.42 - bh / 2, bw, bh, bh / 2)
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = alpha
    ctx.fillText(toast.text, view.width * 0.5, view.height * 0.42)
    ctx.restore()
  }

  function SettingsScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.pressed = null
    this.drag = null
    this.toast = null
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.layout = this.computeLayout()
  }

  SettingsScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var inset = hubInsets(this.view)
    var backR = h * 0.042
    this.back.r = backR
    this.back.x = Math.max(h * 0.028, inset.l) + backR
    this.back.y = Math.max(h * 0.055, inset.t * 0.5) + backR
    var pw = Math.min(w * 0.62, h * 1.12)
    var ph = h * 0.7
    var px = (w - pw) / 2
    var py = (h - ph) / 2
    var rowH = h * 0.11
    var rowX = px + h * 0.06
    var rowW = pw - h * 0.12
    var sfxY = py + h * 0.16
    var bgmY = sfxY + rowH + h * 0.028
    var btnW = (rowW - h * 0.03) / 2
    var btnH = h * 0.12
    var btnY = bgmY + rowH + h * 0.07
    return {
      panel: { x: px, y: py, w: pw, h: ph },
      sfx: { x: rowX, y: sfxY, w: rowW, h: rowH, id: 'sfx' },
      bgm: { x: rowX, y: bgmY, w: rowW, h: rowH, id: 'bgm' },
      extra: [
        { id: 'vibe', label: '振动', x: rowX + btnW / 2, y: btnY + btnH / 2, w: btnW, h: btnH },
        { id: 'lang', label: '语言', x: rowX + btnW + h * 0.03 + btnW / 2, y: btnY + btnH / 2, w: btnW, h: btnH }
      ]
    }
  }

  SettingsScene.prototype.sliderValue = function (id) {
    var sounds = this.sounds || (this.game && this.game.sounds)
    if (!sounds) return 1
    if (id === 'bgm') return sounds.bgmMul == null ? 1 : sounds.bgmMul
    return sounds.sfxMul == null ? 1 : sounds.sfxMul
  }

  SettingsScene.prototype.setSliderValue = function (id, v) {
    var sounds = this.sounds || (this.game && this.game.sounds)
    if (!sounds) return
    if (id === 'bgm') sounds.setBgmMul(v)
    else sounds.setSfxMul(v)
  }

  SettingsScene.prototype.sliderTrack = function (row) {
    var h = this.view.height
    var labW = h * 0.14
    var pctW = h * 0.1
    var x = row.x + labW
    var w = Math.max(8, row.w - labW - pctW)
    var th = Math.max(8, h * 0.016)
    return {
      x: x,
      y: row.y + row.h * 0.62,
      w: w,
      h: th,
      knob: Math.max(18, h * 0.034)
    }
  }

  SettingsScene.prototype.hitSlider = function (x, y) {
    var ids = ['sfx', 'bgm']
    var i
    var row
    var tr
    for (i = 0; i < ids.length; i++) {
      row = this.layout[ids[i]]
      tr = this.sliderTrack(row)
      if (hitBox(x, y, row.x, row.y, row.w, row.h, 6)) return ids[i]
      if (hitBox(x, y, tr.x, tr.y - tr.knob, tr.w, tr.h + tr.knob * 2, 8)) return ids[i]
    }
    return null
  }

  SettingsScene.prototype.hitExtra = function (x, y) {
    var i
    var b
    for (i = 0; i < this.layout.extra.length; i++) {
      b = this.layout.extra[i]
      if (hitRect(x, y, b.x, b.y, b.w, b.h, 6)) return b.id
    }
    return null
  }

  SettingsScene.prototype.applySliderAt = function (id, x) {
    var tr = this.sliderTrack(this.layout[id])
    this.setSliderValue(id, clamp((x - tr.x) / tr.w, 0, 1))
  }

  SettingsScene.prototype.drawSlider = function (ctx, row, value) {
    var h = this.view.height
    var tr = this.sliderTrack(row)
    var kx = tr.x + tr.w * clamp(value, 0, 1)
    fillRoundRect(ctx, row.x, row.y, row.w, row.h, h * 0.022, '#fff7f2')
    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(aidFont(h, 0.032, 15))
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(row.id === 'bgm' ? '音乐' : '音效', row.x + h * 0.028, row.y + row.h * 0.38)
    ctx.fillStyle = COLORS.muted
    ctx.textAlign = 'right'
    ctx.font = uiFont(aidFont(h, 0.026, 13))
    ctx.fillText(Math.round(clamp(value, 0, 1) * 100) + '%', row.x + row.w - h * 0.028, row.y + row.h * 0.38)
    fillRoundRect(ctx, tr.x, tr.y - tr.h / 2, tr.w, tr.h, tr.h / 2, '#eadfd8')
    if (value > 0.004) {
      fillRoundRect(ctx, tr.x, tr.y - tr.h / 2, tr.w * value, tr.h, tr.h / 2, AID_RED)
    }
    ctx.beginPath()
    ctx.arc(kx, tr.y, tr.knob / 2, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = Math.max(2, h * 0.003)
    ctx.strokeStyle = AID_RED
    ctx.stroke()
  }

  SettingsScene.prototype.drawExtra = function (ctx, btn, pressed) {
    var h = this.view.height
    var s = pressed ? 0.96 : 1
    ctx.save()
    ctx.translate(btn.x, btn.y)
    ctx.scale(s, s)
    fillRoundRect(ctx, -btn.w / 2, -btn.h / 2, btn.w, btn.h, h * 0.022, '#fff7f2')
    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(aidFont(h, 0.03, 15))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(btn.label, 0, -btn.h * 0.14)
    ctx.fillStyle = '#c45c55'
    ctx.font = uiFont(aidFont(h, 0.022, 12))
    ctx.fillText('开发中', 0, btn.h * 0.22)
    ctx.restore()
  }

  SettingsScene.prototype.update = function (dt) {
    tickSceneToast(this, dt)
  }

  SettingsScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var p = L.panel
    ctx.fillStyle = COLORS.wall
    ctx.fillRect(0, 0, w, h)
    drawCover(ctx, this.images.bgEmpty || this.images.bg, 0, 0, w, h)
    ctx.fillStyle = 'rgba(28,18,17,0.28)'
    ctx.fillRect(0, 0, w, h)
    fillRoundRect(ctx, p.x, p.y, p.w, p.h, h * 0.036, '#ffffff')
    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(aidFont(h, 0.042, 18))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('设置', w / 2, p.y + h * 0.075)
    this.drawSlider(ctx, L.sfx, this.sliderValue('sfx'))
    this.drawSlider(ctx, L.bgm, this.sliderValue('bgm'))
    var i
    for (i = 0; i < L.extra.length; i++) {
      this.drawExtra(ctx, L.extra[i], this.pressed === L.extra[i].id)
    }
    this.back.draw(ctx)
    drawSceneToast(ctx, this.view, this.toast)
  }

  SettingsScene.prototype.onDown = function (x, y) {
    this.back.pressed = this.back.hit(x, y)
    if (this.back.pressed) {
      this.pressed = 'back'
      this.drag = null
      return
    }
    var extra = this.hitExtra(x, y)
    if (extra) {
      this.pressed = extra
      this.drag = null
      return
    }
    var slide = this.hitSlider(x, y)
    if (slide) {
      this.drag = slide
      this.pressed = slide
      this.applySliderAt(slide, x)
      return
    }
    this.pressed = null
    this.drag = null
  }

  SettingsScene.prototype.onMove = function (x, y) {
    if (!this.drag) return
    this.applySliderAt(this.drag, x)
  }

  SettingsScene.prototype.onUp = function (x, y) {
    var drag = this.drag
    var act = this.pressed
    this.drag = null
    this.pressed = null
    this.back.pressed = false
    if (drag === 'sfx') {
      this.game.sounds.unlock()
      this.game.sounds.play('tap')
      return
    }
    if (drag) return
    if (act === 'back' && this.back.hit(x, y)) {
      this.game.sounds.unlock()
      this.game.sounds.play('tap')
      this.game.go('play')
      return
    }
    var extra = this.hitExtra(x, y)
    if (act && extra === act) {
      this.game.sounds.unlock()
      this.game.sounds.play('tap')
      showSceneToast(this, '开发中')
    }
  }

  function PlayHomeScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    game.ensureHubDemo()
    markPlanLogin(game)
    this.actor = new HeartActor(game.images, game.sounds)
    this.actor.mode = 'idle'
    this.actor.applyLook(game.hubLook)
    this.actor.syncWardrobe(game)
    var bg = this.images.bgEmpty || this.images.bg
    this.fit = containRect(bg.width, bg.height, this.view.width, this.view.height)
    this.layout = this.computeLayout()
    this.pressed = null
    this.nutrientsOpen = false
    this.foodTime = 0
    this.dragFood = null
    this.snapFood = null
    this.eatFood = null
    this.guideStep = game.hubGuideDone ? HUB_GUIDE.length : (game.hubGuideStep || 0)
    this.guideTalk = 0
    this.guideTime = 0
    if (this.guideOn() && this.guideStepData() && this.guideStepData().keepOpen) this.nutrientsOpen = true
    if (this.guideOn()) this.game.sounds.play('dialog')
    this.giftOpen = false
    this.giftT = 0
    this.giftCardKey = ''
  }

  PlayHomeScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var imgs = this.images
    var menu = wxMenuRect(this.view)
    var inset = hubInsets(this.view)
    var left = inset.l
    var i

    var topR = h * 0.042
    var topGap = h * 0.028
    var safeRight = menu.x - h * 0.03
    var topAlign = Math.max(h * 0.03, (menu.y + menu.h / 2) - topR)
    var topY = topAlign + topR
    var history = { x: safeRight - topR, y: topY, r: topR }
    var settings = { x: history.x - (topR * 2 + topGap), y: topY, r: topR }
    var me = { x: settings.x - (topR * 2 + topGap), y: topY, r: topR }

    var nameH = h * 0.1
    var avR = nameH * 0.5
    var avatar = { x: left + avR, y: topAlign + avR, r: avR }
    var nameW = h * 0.4
    var nameplate = {
      x: avatar.x + avR + h * 0.018,
      y: topAlign,
      w: nameW,
      h: nameH
    }

    var stackGap = h * 0.026
    var pillH = h * 0.06
    var pillW = h * 0.21
    var pillGap = h * 0.012
    var pillY = nameplate.y + nameH + stackGap
    var coin = { x: left, y: pillY, w: pillW, h: pillH }
    var capsule = { x: left + pillW + pillGap, y: pillY, w: pillW, h: pillH }

    var iconS = h * 0.05
    var collectY = pillY + pillH + stackGap
    var collectPad = h * 0.032
    var ringR = h * 0.052
    var rowGap = h * 0.048
    var afterRing = h * 0.072
    var collectH = collectPad * 2 + ringR * 2 + afterRing + iconS * 3 + rowGap * 2 + h * 0.03
    var collectClosedW = h * 0.15
    var collectOpenW = Math.min(h * 0.64, w * 0.36)
    var collectX = left
    var toggleW = h * 0.046
    var toggleGap = h * 0.01
    var ringCx = collectX + collectClosedW / 2
    var ringCy = collectY + collectPad + ringR
    var barH = h * 0.012
    var collectRows = []
    for (i = 0; i < NUTRIENT_BARS.length; i++) {
      var nb = NUTRIENT_BARS[i]
      var rowY = ringCy + ringR + afterRing + i * (iconS + rowGap) + iconS / 2
      collectRows.push({
        id: nb.id,
        icon: nb.icon,
        color: nb.color,
        name: nb.name,
        effect: nb.effect,
        bonusKey: nb.bonusKey,
        iconX: collectX + collectPad + iconS / 2,
        iconY: rowY,
        iconS: iconS,
        dotR: h * 0.016,
        dotX: collectX + collectClosedW - collectPad - h * 0.016,
        dotY: rowY,
        barY: rowY + h * 0.018,
        barH: barH
      })
    }

    var navH = h * 0.145
    var navSample = imgBox(imgs.navWardrobe, navH * (160 / 232), 232 / 160)
    var navW = navSample.w
    navH = navSample.h
    var navGap = h * 0.03
    var navY = h - inset.b - navH * 0.42
    var navTop = navY - navH * 0.5
    if (collectY + collectH > navTop - h * 0.016) {
      collectH = Math.max(h * 0.28, navTop - collectY - h * 0.016)
    }
    var nav = []
    for (i = 0; i < HUB_NAV.length; i++) {
      var navImg = imgs[HUB_NAV[i].icon]
      var ns = imgBox(navImg, navW, 232 / 160)
      nav.push({
        id: HUB_NAV[i].id,
        icon: HUB_NAV[i].icon,
        x: left + ns.w / 2 + i * (ns.w + navGap),
        y: navY,
        w: ns.w,
        h: ns.h
      })
    }

    var modeW = h * 0.23
    var timedSize = imgBox(imgs.modeTimed, modeW, 412 / 303)
    var quizSize = imgBox(imgs.modeQuiz, modeW, 421 / 367)
    var depSize = imgBox(imgs.hubDepart, Math.min(h * 0.56, w * 0.31), 296 / 896)
    var modeGap = h * 0.01
    var rightEdge = Math.min(w - 8, menu.x + menu.w)
    var departY = h - inset.b - depSize.h / 2
    var quizY = departY - depSize.h / 2 - modeGap - quizSize.h / 2
    var timedY = quizY - quizSize.h / 2 - modeGap - timedSize.h / 2
    var minTimedTop = me.y + topR + h * 0.016
    if (timedY - timedSize.h / 2 < minTimedTop) {
      timedY = minTimedTop + timedSize.h / 2
      quizY = timedY + timedSize.h / 2 + modeGap + quizSize.h / 2
      departY = quizY + quizSize.h / 2 + modeGap + depSize.h / 2
    }
    var timed = { x: rightEdge - timedSize.w / 2, y: timedY, w: timedSize.w, h: timedSize.h, r: timedSize.w / 2 }
    var quiz = { x: rightEdge - quizSize.w / 2, y: quizY, w: quizSize.w, h: quizSize.h, r: quizSize.w / 2 }
    var depart = { x: rightEdge - depSize.w / 2, y: departY, w: depSize.w, h: depSize.h }

    return {
      menu: menu,
      me: me,
      settings: settings,
      history: history,
      nameplate: nameplate,
      avatar: avatar,
      coin: coin,
      capsule: capsule,
      collect: {
        x: collectX,
        y: collectY,
        h: collectH,
        closedW: collectClosedW,
        openW: collectOpenW,
        pad: collectPad,
        ringCx: ringCx,
        ringCy: ringCy,
        ringR: ringR,
        toggleW: toggleW,
        toggleGap: toggleGap,
        rows: collectRows
      },
      nav: nav,
      timed: timed,
      quiz: quiz,
      depart: depart,
      heartX: w * 0.48,
      heartY: h * 0.42,
      heartScale: h * 0.00092
    }
  }

  PlayHomeScene.prototype.collectBox = function () {
    var c = this.layout.collect
    var w = this.nutrientsOpen ? c.openW : c.closedW
    return {
      x: c.x,
      y: c.y,
      w: w,
      h: c.h,
      toggleX: c.x + w + c.toggleGap,
      toggleW: c.toggleW
    }
  }

  PlayHomeScene.prototype.foodItem = function (id) {
    return storeItem(SHOP_SPEC.items, id)
  }

  PlayHomeScene.prototype.foodHome = function (index, uid) {
    var L = this.layout
    var h = this.view.height
    var slot = FOOD_BUBBLE_SLOTS[index] || FOOD_BUBBLE_SLOTS[0]
    var jx = (hash01(uid * 3.17) - 0.5) * h * 0.02
    var jy = (hash01(uid * 8.41) - 0.5) * h * 0.02
    return {
      x: L.heartX + h * slot.x + jx,
      y: L.heartY + h * slot.y + jy,
      r: h * 0.054 * slot.s
    }
  }

  PlayHomeScene.prototype.heartMouth = function () {
    var L = this.layout
    var s = L.heartScale
    return {
      x: L.heartX + MOUTH.x * s,
      y: L.heartY + this.actor.bobY * s + MOUTH.y * s
    }
  }

  PlayHomeScene.prototype.heartHit = function (x, y) {
    var L = this.layout
    var h = this.view.height
    return hitCircle(x, y, L.heartX - h * 0.02, L.heartY + h * 0.02, h * 0.17, 10)
  }

  PlayHomeScene.prototype.foodBubbles = function () {
    var bag = this.game.foodBag || []
    var shown = bag.slice(0, FOOD_BAG_MAX)
    var out = []
    var i
    for (i = 0; i < shown.length; i++) {
      var home = this.foodHome(i, shown[i].uid)
      var x = home.x
      var y = home.y
      var r = home.r
      var scale = 1
      var alpha = 1
      var drag = this.dragFood && this.dragFood.uid === shown[i].uid
      var snap = this.snapFood && this.snapFood.uid === shown[i].uid
      if (drag) {
        x = this.dragFood.x
        y = this.dragFood.y
        scale = 1.08
      } else if (snap) {
        var su = easeOutCubic(clamp(this.snapFood.t / this.snapFood.dur, 0, 1))
        x = lerp(this.snapFood.fromX, home.x, su)
        y = lerp(this.snapFood.fromY, home.y, su)
      } else {
        y += Math.sin(this.foodTime * 2.15 + i * 1.25) * this.view.height * 0.006
      }
      out.push({
        uid: shown[i].uid,
        id: shown[i].id,
        x: x,
        y: y,
        r: r,
        scale: scale,
        alpha: alpha,
        homeX: home.x,
        homeY: home.y
      })
    }
    return out
  }

  PlayHomeScene.prototype.hitFood = function (x, y) {
    var list = this.foodBubbles()
    var i
    for (i = list.length - 1; i >= 0; i--) {
      if (hitCircle(x, y, list[i].x, list[i].y, list[i].r, 8)) return list[i]
    }
    return null
  }

  PlayHomeScene.prototype.beginEat = function (bubble) {
    var mouth = this.heartMouth()
    this.game.removeFood(bubble.uid)
    this.eatFood = {
      id: bubble.id,
      fromX: bubble.x,
      fromY: bubble.y,
      toX: mouth.x,
      toY: mouth.y,
      r: bubble.r,
      t: 0,
      dur: FOOD_EAT_FLY
    }
    this.actor.startEat()
    this.game.sounds.play('tap')
  }

  PlayHomeScene.prototype.finishEat = function (entry) {
    var item = this.foodItem(entry.id)
    this.game.eatShopFood(item)
    this.eatFood = null
  }

  PlayHomeScene.prototype.guideOn = function () {
    return this.guideStep < HUB_GUIDE.length
  }

  PlayHomeScene.prototype.guideStepData = function () {
    return HUB_GUIDE[this.guideStep] || null
  }

  PlayHomeScene.prototype.navBox = function (id) {
    var nav = this.layout.nav || []
    var i
    for (i = 0; i < nav.length; i++) {
      if (nav[i].id === id) return nav[i]
    }
    return null
  }

  PlayHomeScene.prototype.guideSpotHoles = function () {
    var step = this.guideStepData()
    if (!step) return []
    var out = []
    var i
    var names = step.holes || []
    for (i = 0; i < names.length; i++) {
      var hole = this.guideHole(names[i])
      if (hole) out.push(hole)
    }
    return out
  }

  PlayHomeScene.prototype.guideHoles = function () {
    return this.guideSpotHoles()
  }

  PlayHomeScene.prototype.guideHole = function (name) {
    var L = this.layout
    var h = this.view.height
    var pad = h * 0.014
    var box
    var n
    if (name === 'collect') {
      box = this.collectBox()
      return {
        type: 'round',
        x: box.x - pad,
        y: box.y - pad,
        w: box.w + box.toggleW + this.layout.collect.toggleGap + pad * 2,
        h: box.h + pad * 2,
        r: h * 0.03
      }
    }
    if (name === 'modes') {
      var left = Math.min(L.timed.x - L.timed.w / 2, L.quiz.x - L.quiz.w / 2, L.depart.x - L.depart.w / 2)
      var right = Math.max(L.timed.x + L.timed.w / 2, L.quiz.x + L.quiz.w / 2, L.depart.x + L.depart.w / 2)
      var top = Math.min(L.timed.y - L.timed.h / 2, L.quiz.y - L.quiz.h / 2, L.depart.y - L.depart.h / 2)
      var bot = Math.max(L.timed.y + L.timed.h / 2, L.quiz.y + L.quiz.h / 2, L.depart.y + L.depart.h / 2)
      return { type: 'round', x: left - pad, y: top - pad, w: right - left + pad * 2, h: bot - top + pad * 2, r: h * 0.04 }
    }
    if (name === 'timed') {
      return {
        type: 'round',
        x: L.timed.x - L.timed.w / 2 - pad,
        y: L.timed.y - L.timed.h / 2 - pad,
        w: L.timed.w + pad * 2,
        h: L.timed.h + pad * 2,
        r: h * 0.04
      }
    }
    if (name.indexOf('nav:') === 0) {
      n = this.navBox(name.slice(4))
      if (!n) return null
      return {
        type: 'round',
        x: n.x - n.w / 2 - pad,
        y: n.y - n.h / 2 - pad,
        w: n.w + pad * 2,
        h: n.h + pad * 2,
        r: h * 0.028
      }
    }
    return null
  }

  PlayHomeScene.prototype.guideSkipBox = function () {
    var h = this.view.height
    var L = this.layout
    var bw = h * 0.16
    var bh = h * 0.054
    return {
      x: L.history.x + L.history.r - bw,
      y: L.history.y + L.history.r + h * 0.02,
      w: bw,
      h: bh
    }
  }

  PlayHomeScene.prototype.hitGuideSkip = function (x, y) {
    var box = this.guideSkipBox()
    return hitBox(x, y, box.x, box.y, box.w, box.h, 4)
  }

  PlayHomeScene.prototype.drawGuideSkip = function (ctx) {
    var box = this.guideSkipBox()
    var h = this.view.height
    var pressed = this.pressed === 'guideSkip'
    ctx.save()
    ctx.translate(box.x + box.w / 2, box.y + box.h / 2)
    ctx.scale(pressed ? 0.96 : 1, pressed ? 0.96 : 1)
    fillRoundRect(ctx, -box.w / 2, -box.h / 2, box.w, box.h, box.h / 2, 'rgba(255,255,255,0.18)')
    ctx.strokeStyle = 'rgba(255,255,255,0.72)'
    ctx.lineWidth = Math.max(1.5, h * 0.0028)
    roundRect(ctx, -box.w / 2, -box.h / 2, box.w, box.h, box.h / 2)
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(h * 0.026))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('跳过', 0, 1)
    ctx.restore()
  }

  PlayHomeScene.prototype.hitGuide = function (x, y) {
    var holes = this.guideSpotHoles()
    var i
    if (!holes.length) return true
    for (i = 0; i < holes.length; i++) {
      var hole = holes[i]
      if (hitBox(x, y, hole.x, hole.y, hole.w, hole.h, 4)) return true
    }
    return false
  }

  PlayHomeScene.prototype.guideAdvance = function () {
    var step = this.guideStepData()
    if (step && step.wait === 'collectOpen') this.nutrientsOpen = true
    this.guideStep += 1
    this.guideTalk = 0
    this.game.hubGuideStep = this.guideStep
    var next = this.guideStepData()
    this.nutrientsOpen = !!(next && next.keepOpen)
    if (this.guideStep >= HUB_GUIDE.length) this.finishGuide()
  }

  PlayHomeScene.prototype.finishGuide = function () {
    this.guideStep = HUB_GUIDE.length
    this.game.hubGuideDone = true
    this.game.hubGuideStep = HUB_GUIDE.length
    this.openWelcomeGift()
  }

  PlayHomeScene.prototype.openWelcomeGift = function () {
    if (this.game.welcomeGiftDone) return
    this.game.welcomeGiftDone = true
    this.giftOpen = true
    this.giftT = 0
    this.game.coins = (this.game.coins || 0) + WELCOME_GIFT.coins
    this.game.capsules = (this.game.capsules || 0) + WELCOME_GIFT.pills
    this.giftCardKey = grantWelcomeCard(this.game)
  }

  PlayHomeScene.prototype.giftBox = function () {
    var w = this.view.width
    var h = this.view.height
    var pw = Math.min(w * 0.62, h * 1.08)
    var ph = h * 0.42
    var py = h * 0.2
    return { pw: pw, ph: ph, px: (w - pw) / 2, py: py }
  }

  PlayHomeScene.prototype.giftOkBtn = function () {
    var w = this.view.width
    var h = this.view.height
    var box = this.giftBox()
    return {
      x: w / 2,
      y: box.py + box.ph + h * 0.07,
      w: Math.min(h * 0.34, w * 0.22),
      h: h * 0.088
    }
  }

  PlayHomeScene.prototype.drawWelcomeGift = function (ctx) {
    if (!this.giftOpen) return
    var w = this.view.width
    var h = this.view.height
    var imgs = this.images
    var pop = 1 - Math.exp(-7 * this.giftT) * Math.cos(this.giftT * 15) * 0.22
    var box = this.giftBox()
    var pw = box.pw
    var ph = box.ph
    var px = box.px
    var py = box.py
    var tiles = [
      { img: imgs.iconCoin || imgs.aidIconHeart, num: String(WELCOME_GIFT.coins), lab: '心跳币' },
      { img: imgs.iconCapsule || imgs.aidIconPill, num: String(WELCOME_GIFT.pills), lab: '营养药丸' },
      { img: imgs.iconGiftCards || imgs.navCards, num: String(WELCOME_GIFT.cards), lab: '卡牌', bigIcon: true }
    ]
    ctx.save()
    ctx.fillStyle = 'rgba(20,16,14,0.46)'
    ctx.fillRect(0, 0, w, h)
    ctx.translate(w / 2, h / 2)
    ctx.scale(pop, pop)
    ctx.translate(-w / 2, -h / 2)
    fillRoundRect(ctx, px, py, pw, ph, h * 0.036, '#ffffff')
    ctx.fillStyle = AID_INK
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = uiFont(aidFont(h, 0.042, 18))
    ctx.fillText('见面礼', w / 2, py + h * 0.07)
    ctx.fillStyle = '#6a6a6a'
    ctx.font = uiFont(aidFont(h, 0.026, 13))
    ctx.fillText('欢迎加入心援计划，请收下这份心意', w / 2, py + h * 0.125)
    var tile = h * 0.138
    var gap = (pw - h * 0.1 - tile * 3) / 2
    var tx0 = px + (pw - (tile * 3 + gap * 2)) / 2
    var ty = py + h * 0.175
    var i
    for (i = 0; i < tiles.length; i++) {
      var x = tx0 + i * (tile + gap)
      fillRoundRect(ctx, x, ty, tile, tile, h * 0.016, AID_SCORE_TILE)
      if (tiles[i].img) {
        if (tiles[i].bigIcon) {
          drawContain(ctx, tiles[i].img, x + tile / 2, ty + tile * 0.4, tile * 0.86, tile * 0.78)
        } else {
          drawContain(ctx, tiles[i].img, x + tile / 2, ty + tile * 0.32, tile * 0.5, tile * 0.5)
        }
      }
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(aidFont(h, 0.036, 15))
      ctx.textAlign = 'center'
      ctx.fillText(tiles[i].num, x + tile / 2, ty + tile * 0.72)
      ctx.fillStyle = AID_INK
      ctx.font = uiFont(aidFont(h, 0.024, 12))
      ctx.fillText(tiles[i].lab, x + tile / 2, ty + tile + h * 0.032)
    }
    ctx.restore()
    var b = this.giftOkBtn()
    var u = Math.min(1, Math.max(0, this.giftT - 0.12) / 0.18)
    if (u <= 0) return
    var scale = (this.pressed === 'giftOk' ? 0.96 : 1) * (0.92 + 0.08 * u)
    ctx.save()
    ctx.globalAlpha = u
    ctx.translate(b.x, b.y)
    ctx.scale(scale, scale)
    fillRoundRect(ctx, -b.w / 2, -b.h / 2, b.w, b.h, b.h / 2, this.pressed === 'giftOk' ? '#c43a32' : AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(b.h * 0.46))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '收下', 0, 1)
    ctx.restore()
  }

  PlayHomeScene.prototype.hit = function (x, y) {
    var L = this.layout
    var box = this.collectBox()
    if (hitBox(x, y, box.toggleX, box.y, box.toggleW, box.h, 6)) return 'collectToggle'
    if (!this.nutrientsOpen && hitBox(x, y, box.x, box.y, box.w, box.h, 4)) return 'collectToggle'
    if (hitCircle(x, y, L.me.x, L.me.y, L.me.r, 8)) return 'me'
    if (hitCircle(x, y, L.settings.x, L.settings.y, L.settings.r, 8)) return 'settings'
    if (hitCircle(x, y, L.history.x, L.history.y, L.history.r, 8)) return 'history'
    if (hitRect(x, y, L.timed.x, L.timed.y, L.timed.w, L.timed.h, 6)) return 'timed'
    if (hitRect(x, y, L.quiz.x, L.quiz.y, L.quiz.w, L.quiz.h, 6)) return 'quiz'
    if (hitRect(x, y, L.depart.x, L.depart.y, L.depart.w, L.depart.h, 6)) return 'depart'
    var i
    for (i = 0; i < L.nav.length; i++) {
      var n = L.nav[i]
      if (hitRect(x, y, n.x, n.y, n.w, n.h, 6)) return n.id
    }
    return null
  }

  PlayHomeScene.prototype.update = function (dt) {
    this.actor.syncWardrobe(this.game)
    this.foodTime += dt
    this.guideTime += dt
    if (this.guideOn()) {
      var step = this.guideStepData()
      if (step) this.guideTalk = step.text.length
    }
    this.actor.update(dt)
    if (this.eatFood) {
      var mouth = this.heartMouth()
      this.eatFood.toX = mouth.x
      this.eatFood.toY = mouth.y
      this.eatFood.t += dt
      if (this.eatFood.t >= this.eatFood.dur) this.finishEat(this.eatFood)
    }
    if (this.snapFood) {
      this.snapFood.t += dt
      if (this.snapFood.t >= this.snapFood.dur) this.snapFood = null
    }
    if (this.giftOpen) this.giftT += dt
    tickSceneToast(this, dt)
  }

  PlayHomeScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var imgs = this.images
    var g = this.game
    var i
    var pressed = this.pressed

    ctx.fillStyle = COLORS.wall
    ctx.fillRect(0, 0, w, h)
    drawCover(ctx, imgs.bgEmpty || imgs.bg, 0, 0, w, h)

    if (!this.guideOn()) this.actor.draw(ctx, L.heartX, L.heartY, L.heartScale)
    this.drawFoodBubbles(ctx)

    var np = L.nameplate
    fillRoundRect(ctx, np.x, np.y, np.w, np.h, np.h / 2, COLORS.card)
    this.drawAvatar(ctx, L.avatar, imgs.hubAvatar)
    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(Math.round(np.h * 0.34))
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(g.nickname || '大心脏', np.x + np.h * 0.38, np.y + np.h / 2)

    this.drawCurrency(ctx, L.coin, imgs.iconCoin, g.coins, '#d4544a', pressed === 'coin')
    this.drawCurrency(ctx, L.capsule, imgs.iconCapsule, g.capsules, '#c17a3a', pressed === 'capsule')
    this.drawCollect(ctx, L, pressed)

    this.drawTopBtn(ctx, L.me, imgs.hubMe, pressed === 'me')
    this.drawTopBtn(ctx, L.settings, imgs.hubSettings, pressed === 'settings')
    this.drawTopBtn(ctx, L.history, imgs.hubHistory, pressed === 'history')

    this.drawIconBox(ctx, L.timed, imgs.modeTimed, pressed === 'timed')
    this.drawIconBox(ctx, L.quiz, imgs.modeQuiz, pressed === 'quiz')

    var depScale = pressed === 'depart' ? 0.96 : 1
    if (imgs.hubDepart) {
      drawSprite(ctx, imgs.hubDepart, L.depart.x, L.depart.y, L.depart.w, L.depart.h, depScale)
    }

    for (i = 0; i < L.nav.length; i++) {
      this.drawIconBox(ctx, L.nav[i], imgs[L.nav[i].icon], pressed === L.nav[i].id)
    }
    this.drawEatFood(ctx)
    this.drawDragFood(ctx)
    this.drawGuide(ctx)
    this.drawWelcomeGift(ctx)
    drawSceneToast(ctx, this.view, this.toast)
  }

  PlayHomeScene.prototype.drawGuide = function (ctx) {
    if (!this.guideOn()) return
    var step = this.guideStepData()
    if (!step) return
    var w = this.view.width
    var h = this.view.height
    var spots = this.guideSpotHoles()
    var L = this.layout
    var i
    ctx.save()
    ctx.fillStyle = 'rgba(18, 12, 16, 0.72)'
    ctx.beginPath()
    ctx.rect(0, 0, w, h)
    for (i = 0; i < spots.length; i++) this.guideHolePath(ctx, spots[i])
    ctx.fill('evenodd')
    var pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(this.guideTime * 3.4))
    for (i = 0; i < spots.length; i++) {
      ctx.save()
      ctx.strokeStyle = 'rgba(255, 236, 176, ' + (0.35 + 0.45 * pulse) + ')'
      ctx.lineWidth = Math.max(3, h * 0.006)
      this.guideHolePath(ctx, spots[i], true)
      ctx.stroke()
      ctx.restore()
    }
    ctx.restore()
    this.actor.draw(ctx, L.heartX, L.heartY, L.heartScale)
    this.drawGuideBubble(ctx, step)
    this.drawGuideHint(ctx, spots[0])
    this.drawGuideSkip(ctx)
  }

  PlayHomeScene.prototype.guideHolePath = function (ctx, hole, stroke) {
    if (!hole) return
    if (hole.type === 'ellipse') {
      if (stroke) ctx.beginPath()
      addEllipse(ctx, hole.cx, hole.cy, hole.rx, hole.ry)
      ctx.closePath()
      return
    }
    if (stroke) {
      roundRect(ctx, hole.x, hole.y, hole.w, hole.h, hole.r || 16)
      return
    }
    addRoundRect(ctx, hole.x, hole.y, hole.w, hole.h, hole.r || 16)
  }

  PlayHomeScene.prototype.drawGuideHint = function (ctx, hole) {
    if (!hole) return
    var L = this.layout
    var h = this.view.height
    var hx = hole.x + hole.w / 2
    var hy = hole.y + hole.h / 2
    var dx = L.heartX - hx
    var dy = L.heartY - hy
    var compact = hole.w < h * 0.22 && hole.h < h * 0.22
    var bob = Math.sin(this.guideTime * 4.6) * h * 0.006
    var inset = h * 0.028
    var x
    var y
    var dir
    if (compact) {
      x = hx
      y = hole.y - h * 0.018 + bob
      dir = 'bottom'
    } else if (Math.abs(dx) >= Math.abs(dy) * 0.75) {
      var low = Math.min(this.guideFaceBottom() + h * 0.02, hole.y + hole.h - inset)
      y = Math.max(hy, low)
      if (dx >= 0) {
        x = hole.x + hole.w - inset + bob
        dir = 'left'
      } else {
        x = hole.x + inset - bob
        dir = 'right'
      }
    } else if (dy >= 0) {
      x = hx
      y = hole.y + hole.h - inset + bob
      dir = 'top'
    } else {
      x = hx
      y = hole.y + inset - bob
      dir = 'bottom'
    }
    this.drawGuideFinger(ctx, x, y, h * 0.03, dir)
  }

  PlayHomeScene.prototype.drawGuideFinger = function (ctx, x, y, s, dir) {
    ctx.save()
    ctx.translate(x, y)
    if (dir === 'left') ctx.rotate(Math.PI)
    else if (dir === 'top') ctx.rotate(-Math.PI / 2)
    else if (dir === 'bottom') ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(s * 0.58, 0)
    ctx.lineTo(-s * 0.12, -s * 0.4)
    ctx.lineTo(-s * 0.12, -s * 0.16)
    ctx.lineTo(-s * 0.58, -s * 0.16)
    ctx.lineTo(-s * 0.58, s * 0.16)
    ctx.lineTo(-s * 0.12, s * 0.16)
    ctx.lineTo(-s * 0.12, s * 0.4)
    ctx.closePath()
    ctx.fillStyle = '#c45c55'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.92)'
    ctx.lineWidth = Math.max(1.5, s * 0.08)
    ctx.lineJoin = 'round'
    ctx.stroke()
    ctx.restore()
  }

  PlayHomeScene.prototype.guideFaceBottom = function () {
    return this.layout.heartY + this.view.height * 0.1
  }

  PlayHomeScene.prototype.guideFaceRect = function () {
    var L = this.layout
    var h = this.view.height
    return {
      x: L.heartX - h * 0.18,
      y: L.heartY - h * 0.22,
      w: h * 0.34,
      h: h * 0.42
    }
  }

  PlayHomeScene.prototype.guideSafePad = function () {
    var h = this.view.height
    var inset = hubInsets(this.view)
    return {
      l: Math.max(inset.l, h * 0.08),
      r: Math.max(inset.r, h * 0.03),
      t: Math.max(h * 0.055, inset.t * 0.4),
      b: Math.max(h * 0.08, inset.b)
    }
  }

  PlayHomeScene.prototype.guideBubbleRect = function (x, y, bw, bh) {
    return { x: x - bw / 2, y: y - bh / 2, w: bw, h: bh }
  }

  PlayHomeScene.prototype.guideRectsHit = function (a, b, pad) {
    pad = pad || 0
    return a.x < b.x + b.w + pad && a.x + a.w > b.x - pad && a.y < b.y + b.h + pad && a.y + a.h > b.y - pad
  }

  PlayHomeScene.prototype.guideOverlapArea = function (a, b) {
    var x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
    var y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
    return x * y
  }

  PlayHomeScene.prototype.guidePlaceOk = function (x, y, bw, bh, hole) {
    var h = this.view.height
    var w = this.view.width
    var safe = this.guideSafePad()
    var box = this.guideBubbleRect(x, y, bw, bh)
    if (box.x < safe.l - 1 || box.x + box.w > w - safe.r + 1) return false
    if (box.y < safe.t - 1 || box.y + box.h > h - safe.b + 1) return false
    if (this.guideRectsHit(box, this.guideFaceRect(), h * 0.012)) return false
    if (hole && this.guideRectsHit(box, { x: hole.x, y: hole.y, w: hole.w, h: hole.h }, h * 0.01)) return false
    return true
  }

  PlayHomeScene.prototype.guideOverlapCost = function (x, y, bw, bh, hole) {
    var h = this.view.height
    var w = this.view.width
    var safe = this.guideSafePad()
    var box = this.guideBubbleRect(x, y, bw, bh)
    var cost = this.guideOverlapArea(box, this.guideFaceRect()) * 3
    if (hole) cost += this.guideOverlapArea(box, { x: hole.x, y: hole.y, w: hole.w, h: hole.h }) * 4
    if (box.x < safe.l) cost += (safe.l - box.x) * box.h
    if (box.x + box.w > w - safe.r) cost += (box.x + box.w - (w - safe.r)) * box.h
    if (box.y < safe.t) cost += (safe.t - box.y) * box.w
    if (box.y + box.h > h - safe.b) cost += (box.y + box.h - (h - safe.b)) * box.w
    return cost
  }

  PlayHomeScene.prototype.guideCandidates = function (hole, bw, bh) {
    var h = this.view.height
    var w = this.view.width
    var safe = this.guideSafePad()
    var gap = h * 0.018
    var face = this.guideFaceRect()
    var belowY = face.y + face.h + gap + bh / 2
    var list = []
    var add = function (x, y, arrow) {
      list.push({
        x: clamp(x, safe.l + bw / 2, w - safe.r - bw / 2),
        y: clamp(y, safe.t + bh / 2, h - safe.b - bh / 2),
        arrow: arrow
      })
    }
    if (!hole) {
      add(face.x - gap - bw / 2, belowY, 'right')
      add(face.x + face.w + gap + bw / 2, belowY, 'left')
      return list
    }
    var hx = hole.x + hole.w / 2
    var hy = hole.y + hole.h / 2
    var leftish = hx < w * 0.4
    var rightish = hx > w * 0.6
    var lowish = hy > h * 0.62
    var sides
    if (lowish) sides = ['top', 'right', 'left']
    else if (leftish) sides = ['right', 'top', 'left']
    else if (rightish) sides = ['left', 'top', 'right']
    else sides = ['right', 'left', 'top', 'bottom']
    var i
    var side
    for (i = 0; i < sides.length; i++) {
      side = sides[i]
      if (side === 'right') {
        add(hole.x + hole.w + gap + bw / 2, belowY, 'left')
        add(hole.x + hole.w + gap + bw / 2, hy, 'left')
      } else if (side === 'left') {
        add(hole.x - gap - bw / 2, belowY, 'right')
        add(hole.x - gap - bw / 2, hy, 'right')
      } else if (side === 'top') {
        add(hx, hole.y - gap - bh / 2, 'bottom')
        add(safe.l + bw / 2, hole.y - gap - bh / 2, 'bottom')
        add(hx + bw * 0.22, hole.y - gap - bh / 2, 'bottom')
      } else {
        add(hx, hole.y + hole.h + gap + bh / 2, 'top')
      }
    }
    return list
  }

  PlayHomeScene.prototype.guideBubbleBox = function (hole, bw, bh) {
    var cands = this.guideCandidates(hole, bw, bh)
    var pick = null
    var best = null
    var bestCost = Infinity
    var i
    var c
    var cost
    for (i = 0; i < cands.length; i++) {
      c = cands[i]
      if (!pick && this.guidePlaceOk(c.x, c.y, bw, bh, hole)) pick = c
      cost = this.guideOverlapCost(c.x, c.y, bw, bh, hole)
      if (cost < bestCost) {
        bestCost = cost
        best = c
      }
    }
    if (!pick) pick = best || cands[0] || { x: this.view.width * 0.5, y: this.view.height * 0.55, arrow: 'bottom' }
    return {
      x: pick.x,
      y: pick.y,
      arrow: pick.arrow,
      hx: hole ? hole.x + hole.w / 2 : pick.x,
      hy: hole ? hole.y + hole.h / 2 : pick.y
    }
  }

  PlayHomeScene.prototype.drawGuideBubble = function (ctx, step) {
    var h = this.view.height
    var w = this.view.width
    var shown = step.text
    var fontPx = Math.round(h * 0.034)
    ctx.font = uiFont(fontPx)
    var bw = Math.min(h * 0.58, w * 0.34)
    var rows = wrapText(ctx, shown || ' ', bw - h * 0.05)
    var lh = fontPx * 1.32
    var bh = Math.max(h * 0.12, rows.length * lh + h * 0.054)
    var hole = this.guideSpotHoles()[0]
    var box = this.guideBubbleBox(hole, bw, bh)
    var x = box.x
    var y = box.y
    var r = Math.min(18, bh / 2)
    var tip = h * 0.018
    var base = h * 0.016
    var tipX = clamp(box.hx != null ? box.hx : x, x - bw / 2 + r, x + bw / 2 - r)
    var tipY = clamp(box.hy != null ? box.hy : y, y - bh / 2 + r, y + bh / 2 - r)
    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.96)'
    roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, r)
    ctx.fill()
    ctx.beginPath()
    if (box.arrow === 'left') {
      ctx.moveTo(x - bw / 2 + 2, tipY - base)
      ctx.lineTo(x - bw / 2 + 2, tipY + base)
      ctx.lineTo(x - bw / 2 - tip, tipY)
    } else if (box.arrow === 'right') {
      ctx.moveTo(x + bw / 2 - 2, tipY - base)
      ctx.lineTo(x + bw / 2 - 2, tipY + base)
      ctx.lineTo(x + bw / 2 + tip, tipY)
    } else if (box.arrow === 'top') {
      ctx.moveTo(tipX - base, y - bh / 2 + 2)
      ctx.lineTo(tipX + base, y - bh / 2 + 2)
      ctx.lineTo(tipX, y - bh / 2 - tip)
    } else {
      ctx.moveTo(tipX - base, y + bh / 2 - 2)
      ctx.lineTo(tipX + base, y + bh / 2 - 2)
      ctx.lineTo(tipX, y + bh / 2 + tip)
    }
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = COLORS.ink
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var start = y - ((Math.max(rows.length, 1) - 1) * lh) / 2
    var i
    for (i = 0; i < rows.length; i++) {
      ctx.fillText(rows[i], x - bw / 2 + h * 0.022, start + i * lh)
      ctx.fillText(rows[i], x - bw / 2 + h * 0.022 + 0.6, start + i * lh)
    }
    ctx.restore()
  }

  PlayHomeScene.prototype.drawFoodBubbles = function (ctx) {
    var list = this.foodBubbles()
    var i
    for (i = 0; i < list.length; i++) {
      if (this.dragFood && this.dragFood.uid === list[i].uid) continue
      this.drawFoodBubble(ctx, list[i])
    }
  }

  PlayHomeScene.prototype.drawDragFood = function (ctx) {
    if (!this.dragFood) return
    var list = this.foodBubbles()
    var i
    for (i = 0; i < list.length; i++) {
      if (list[i].uid === this.dragFood.uid) this.drawFoodBubble(ctx, list[i])
    }
  }

  PlayHomeScene.prototype.drawEatFood = function (ctx) {
    var fly = this.eatFood
    if (!fly) return
    var u = easeInCubic(clamp(fly.t / fly.dur, 0, 1))
    this.drawFoodBubble(ctx, {
      id: fly.id,
      x: lerp(fly.fromX, fly.toX, u),
      y: lerp(fly.fromY, fly.toY, u),
      r: fly.r,
      scale: 1 - u * 0.78,
      alpha: 1 - u * 0.15
    })
  }

  PlayHomeScene.prototype.drawFoodBubble = function (ctx, b) {
    var item = this.foodItem(b.id)
    var pic = storeItemPic(this.images, item)
    var s = b.scale == null ? 1 : b.scale
    ctx.save()
    ctx.globalAlpha = b.alpha == null ? 1 : b.alpha
    ctx.translate(b.x, b.y)
    ctx.scale(s, s)
    ctx.beginPath()
    ctx.arc(2, b.r * 0.1, b.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(40, 40, 40, 0.1)'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0, b.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.96)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(44,61,61,0.1)'
    ctx.lineWidth = Math.max(1.2, b.r * 0.045)
    ctx.stroke()
    if (pic) drawContain(ctx, pic, 0, 0, b.r * 1.32, b.r * 1.32)
    else drawItemPlaceholder(ctx, -b.r * 0.62, -b.r * 0.62, b.r * 1.24, b.r * 1.24)
    ctx.restore()
  }

  PlayHomeScene.prototype.drawAvatar = function (ctx, av, img) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(av.x, av.y, av.r, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    if (img) drawContain(ctx, img, av.x, av.y, av.r * 2, av.r * 2)
    else {
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      drawDefaultAvatar(ctx, av.x, av.y, av.r)
    }
    ctx.restore()
  }

  PlayHomeScene.prototype.drawCurrency = function (ctx, box, icon, value, color, pressed) {
    ctx.save()
    ctx.globalAlpha = pressed ? 0.8 : 1
    fillRoundRect(ctx, box.x, box.y, box.w, box.h, box.h / 2, COLORS.card)
    if (icon) drawContain(ctx, icon, box.x + box.h * 0.58, box.y + box.h / 2, box.h * 0.78, box.h * 0.78)
    var label = String(value == null ? 0 : value)
    var size = Math.round(box.h * 0.42)
    var tx = box.x + box.w - box.h * 0.32
    var ty = box.y + box.h / 2 + 1
    ctx.fillStyle = color || COLORS.ink
    ctx.font = uiFont(size, 'bold')
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, tx, ty)
    ctx.fillText(label, tx + 0.7, ty)
    ctx.restore()
  }

  PlayHomeScene.prototype.drawCollect = function (ctx, L, pressed) {
    var h = this.view.height
    var g = this.game
    var imgs = this.images
    var c = L.collect
    var open = this.nutrientsOpen
    var boxW = open ? c.openW : c.closedW
    var lw = Math.max(3.2, h * 0.0072)
    var prog = nutrientCollectProgress(g)
    var i
    var row
    var val
    var bonus

    fillRoundRect(ctx, c.x, c.y, boxW, c.h, h * 0.028, COLORS.card)
    drawCollectRing(ctx, c.ringCx, c.ringCy, c.ringR, prog.ratio, lw)
    if (imgs.iconCapsule) {
      drawContain(ctx, imgs.iconCapsule, c.ringCx, c.ringCy, c.ringR * 1.32, c.ringR * 1.32)
    }

    var textX = c.ringCx + c.ringR + h * 0.022
    var textRight = c.x + boxW - c.pad
    if (open) {
      var pct = String(Math.round(prog.ratio * 100)) + '%'
      var pctSize = Math.round(h * 0.036) + 2
      ctx.fillStyle = '#5a6b3a'
      ctx.font = uiFont(pctSize)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      var pctY = c.ringCy - c.ringR * 0.28
      fillFatText(ctx, pct, textX, pctY)
      var pctW = ctx.measureText(pct).width + 2
      ctx.fillStyle = COLORS.muted
      ctx.font = uiFont(Math.round(h * 0.02) + 2)
      ctx.fillText('收集进度', textX + pctW + h * 0.012, pctY)

      ctx.fillStyle = 'rgba(94,115,115,0.82)'
      ctx.font = uiFont(Math.round(h * 0.016) + 3)
      var hintW = Math.max(40, textRight - textX)
      var hints = wrapText(ctx, NUTRIENT_HINT, hintW)
      var hintLh = h * 0.024 + 3
      var hintY = pctY + h * 0.026
      var hintLimit = c.rows[0].iconY - h * 0.006
      ctx.textBaseline = 'top'
      for (i = 0; i < hints.length && i < 5; i++) {
        if (hintY + (i + 1) * hintLh > hintLimit) break
        ctx.fillText(hints[i], textX, hintY + i * hintLh)
      }
    }

    ctx.textBaseline = 'middle'
    for (i = 0; i < c.rows.length; i++) {
      row = c.rows[i]
      val = (g.nutrients && g.nutrients[row.id]) || 0
      if (imgs[row.icon]) drawContain(ctx, imgs[row.icon], row.iconX, row.iconY, row.iconS, row.iconS)
      if (!open) {
        ctx.beginPath()
        ctx.arc(row.dotX, row.dotY, row.dotR, 0, Math.PI * 2)
        ctx.fillStyle = val >= NUTRIENT_FULL ? row.color : NUTRIENT_DOT_EMPTY
        ctx.fill()
      } else {
        bonus = g.nutrientGainBonus(row.id)
        var amt = formatNutrientAmt(val) + '/' + NUTRIENT_FULL
        var bonusLab = formatBonusPct(bonus)
        ctx.fillStyle = COLORS.ink
        ctx.font = uiFont(Math.round(h * 0.02) + 2)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        var title = row.name + '：' + row.effect
        var titleMax = Math.max(8, textRight - textX)
        ctx.save()
        ctx.beginPath()
        ctx.rect(textX - 1, row.iconY - row.iconS / 2, titleMax, row.iconS)
        ctx.clip()
        ctx.fillText(title, textX, row.iconY)
        ctx.restore()

        ctx.font = uiFont(Math.round(h * 0.016) + 2)
        var bonusW = ctx.measureText(bonusLab).width
        var amtW = ctx.measureText(amt).width
        var statsW = bonusW + amtW + h * 0.028
        var barW = Math.max(8, textRight - textX - statsW)
        var barMid = row.barY + row.barH / 2
        drawNutrientBar(ctx, textX, row.barY, barW, row.barH, row.color, val / NUTRIENT_FULL)
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = bonus > 0 ? '#5a6b3a' : COLORS.muted
        ctx.fillText(bonusLab, textRight, barMid)
        ctx.fillStyle = COLORS.ink
        ctx.fillText(amt, textRight - bonusW - h * 0.012, barMid)
      }
    }

    var toggleX = c.x + boxW + c.toggleGap
    ctx.save()
    ctx.globalAlpha = pressed === 'collectToggle' ? 0.82 : 1
    fillRoundRect(ctx, toggleX, c.y, c.toggleW, c.h, c.toggleW / 2, COLORS.card)
    drawCollectTri(ctx, toggleX + c.toggleW / 2, c.y + c.h / 2, h * 0.03, open ? -1 : 1)
    ctx.restore()
  }

  PlayHomeScene.prototype.drawTopBtn = function (ctx, btn, icon, pressed) {
    var s = pressed ? 0.92 : 1
    ctx.save()
    ctx.globalAlpha = pressed ? 0.82 : 1
    ctx.translate(btn.x, btn.y)
    ctx.scale(s, s)
    if (icon) drawContain(ctx, icon, 0, 0, btn.r * 2, btn.r * 2)
    ctx.restore()
  }

  PlayHomeScene.prototype.drawIconBox = function (ctx, box, icon, pressed) {
    var s = pressed ? 0.96 : 1
    ctx.save()
    ctx.translate(box.x, box.y)
    ctx.scale(s, s)
    if (icon) drawContain(ctx, icon, 0, 0, box.w, box.h)
    ctx.restore()
  }

  PlayHomeScene.prototype.onDown = function (x, y) {
    if (this.giftOpen) {
      var ok = this.giftOkBtn()
      this.pressed = hitRect(x, y, ok.x, ok.y, ok.w, ok.h, 8) ? 'giftOk' : null
      return
    }
    if (this.guideOn()) {
      if (this.hitGuideSkip(x, y)) {
        this.pressed = 'guideSkip'
        return
      }
      this.pressed = this.hitGuide(x, y) ? (this.hit(x, y) || 'guideHole') : null
      return
    }
    if (this.eatFood) return
    var food = this.hitFood(x, y)
    if (food) {
      this.game.sounds.unlock()
      this.dragFood = {
        uid: food.uid,
        id: food.id,
        x: food.x,
        y: food.y,
        homeX: food.homeX,
        homeY: food.homeY,
        r: food.r,
        grabX: x - food.x,
        grabY: y - food.y
      }
      this.pressed = null
      return
    }
    this.pressed = this.hit(x, y)
  }

  PlayHomeScene.prototype.onMove = function (x, y) {
    if (!this.dragFood) return
    this.dragFood.x = x - this.dragFood.grabX
    this.dragFood.y = y - this.dragFood.grabY
  }

  PlayHomeScene.prototype.onUp = function (x, y) {
    if (this.giftOpen) {
      var id = this.pressed
      this.pressed = null
      var ok = this.giftOkBtn()
      if (id !== 'giftOk' || !hitRect(x, y, ok.x, ok.y, ok.w, ok.h, 8)) return
      this.game.sounds.unlock()
      this.game.sounds.play('tap')
      this.giftOpen = false
      return
    }
    if (this.guideOn()) {
      var step = this.guideStepData()
      var id = this.pressed
      this.pressed = null
      if (id === 'guideSkip') {
        if (!this.hitGuideSkip(x, y)) return
        this.game.sounds.unlock()
        this.game.sounds.play('tap')
        this.finishGuide()
        return
      }
      if (!step || !id || !this.hitGuide(x, y)) return
      this.game.sounds.unlock()
      this.game.sounds.play('dialog')
      this.guideAdvance()
      return
    }
    if (this.dragFood) {
      var df = this.dragFood
      this.dragFood = null
      var movedLeft = df.x < df.homeX - this.view.height * 0.03
      var onHeart = this.heartHit(x, y) || this.heartHit(df.x, df.y)
      if (movedLeft && onHeart) {
        this.beginEat({
          uid: df.uid,
          id: df.id,
          x: df.x,
          y: df.y,
          r: df.r
        })
      } else if (Math.hypot(df.x - df.homeX, df.y - df.homeY) > 4) {
        this.snapFood = {
          uid: df.uid,
          fromX: df.x,
          fromY: df.y,
          t: 0,
          dur: 0.22
        }
      }
      this.pressed = null
      return
    }
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.game.sounds.unlock()
    if (id !== 'collectToggle' && id !== 'wardrobe' && id !== 'shop' && id !== 'depart' && id !== 'timed' && id !== 'quiz' && id !== 'cards' && id !== 'plan' && id !== 'medal' && id !== 'settings' && id !== 'me' && id !== 'history') return
    this.game.sounds.play('tap')
    if (id === 'collectToggle') this.nutrientsOpen = !this.nutrientsOpen
    if (id === 'wardrobe') this.game.go('wardrobe')
    if (id === 'shop') this.game.go('shop')
    if (id === 'depart') this.game.go('levels')
    if (id === 'timed') this.game.go('timed')
    if (id === 'quiz') this.game.go('rapid')
    if (id === 'cards') this.game.go('cards')
    if (id === 'plan') this.game.go('plan')
    if (id === 'medal') this.game.go('medal')
    if (id === 'settings') this.game.go('settings')
    if (id === 'me' || id === 'history') showSceneToast(this, '开发中')
  }

  function LevelSelectScene(game, spec) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.spec = spec || {}
    this.levels = this.spec.levels || AID_LEVELS
    this.titleText = this.spec.title || '选择关卡'
    this.backTo = this.spec.backTo || 'play'
    this.index = 0
    var want = this.spec.pickKey ? game[this.spec.pickKey] : game.aidLevelId
    if (want) {
      var i
      for (i = 0; i < this.levels.length; i++) {
        if (this.levels[i].id === want) this.index = i
      }
    }
    this.pressed = null
    this.dragX = 0
    this.dragFrom = null
    this.dragBase = 0
    this.dragging = false
    this.slideX = 0
    this.animFrom = 0
    this.animTo = 0
    this.animT = 1
    this.animDur = 0.36
    this.pendingIndex = null
    this.toast = null
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.layout = this.computeLayout()
  }

  LevelSelectScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var inset = hubInsets(this.view)
    var backR = h * 0.042
    this.back.r = backR
    var leftSafe = h * 0.008
    if (isWx && typeof wx.getSystemInfoSync === 'function') {
      try {
        var info = wx.getSystemInfoSync()
        var ww = info.windowWidth || w
        if (info.safeArea) {
          leftSafe = Math.min(info.safeArea.left * (w / ww) * 0.28, h * 0.018)
        }
      } catch (err) {}
    }
    this.back.x = leftSafe + backR
    var titleY = Math.max(h * 0.072, inset.t * 0.55)
    this.back.y = titleY
    var aspect = aidArtAspect(this.images)
    var hasNutrientReward = false
    var li
    for (li = 0; li < this.levels.length; li++) {
      if (levelHasNutrientRewards(this.levels[li])) {
        hasNutrientReward = true
        break
      }
    }
    var infoH = h * (hasNutrientReward ? 0.235 : 0.168)
    var startW = Math.min(h * 0.34, w * 0.22)
    var startH = h * 0.092
    var startY = h - Math.max(h * 0.05, inset.b) - startH / 2
    var arrowGap = h * 0.11
    var maxCardW = Math.min(w - arrowGap * 2, w * 0.78)
    var maxCardH = startY + startH * 0.18 - titleY - h * 0.07
    if (maxCardH > h * 0.7) maxCardH = h * 0.7
    var cardW = maxCardW
    var cardH = cardW / aspect
    if (cardH > maxCardH) {
      cardH = maxCardH
      cardW = cardH * aspect
    }
    cardW = Math.round(cardW)
    cardH = Math.round(cardH)
    var cardX = Math.round((w - cardW) / 2)
    var minY = Math.round(titleY + h * 0.048)
    var cardY = Math.round(titleY + (startY - startH * 0.35 - titleY - cardH) / 2)
    if (cardY < minY) cardY = minY
    var arrowR = h * 0.055
    var arrowY = Math.round(cardY + cardH / 2)
    return {
      titleY: titleY,
      card: { x: cardX, y: cardY, w: cardW, h: cardH, r: h * 0.04 },
      imgH: cardH,
      infoH: Math.round(infoH),
      stride: Math.round(Math.max(cardW + h * 0.08, w - cardX + 8)),
      arrowL: { x: Math.round(cardX - h * 0.075), y: arrowY, r: arrowR },
      arrowR: { x: Math.round(cardX + cardW + h * 0.075), y: arrowY, r: arrowR },
      start: {
        x: w - Math.max(h * 0.04, inset.r * 0.35) - startW / 2,
        y: startY,
        w: startW,
        h: startH
      }
    }
  }

  LevelSelectScene.prototype.hit = function (x, y) {
    var L = this.layout
    if (this.back.hit(x, y)) return 'back'
    if (hitCircle(x, y, L.arrowL.x, L.arrowL.y, L.arrowL.r, 8)) return 'prev'
    if (hitCircle(x, y, L.arrowR.x, L.arrowR.y, L.arrowR.r, 8)) return 'next'
    if (hitRect(x, y, L.start.x, L.start.y, L.start.w, L.start.h, 6)) return 'start'
    var c = L.card
    if (hitBox(x, y, c.x, c.y, c.w, c.h, 0)) return 'card'
    return null
  }

  LevelSelectScene.prototype.slideStride = function () {
    var L = this.layout || this.computeLayout()
    return L.stride
  }

  LevelSelectScene.prototype.offsetX = function () {
    if (this.dragging) return this.dragX
    return this.slideX
  }

  LevelSelectScene.prototype.busy = function () {
    return this.animT < 1
  }

  LevelSelectScene.prototype.startSlide = function (dir) {
    var next = this.index + dir
    if (next < 0 || next >= this.levels.length) return false
    if (this.busy() && this.pendingIndex != null) return false
    var stride = this.slideStride()
    this.animFrom = this.dragging ? this.dragX : this.slideX
    this.animTo = -dir * stride
    this.animT = 0
    this.pendingIndex = next
    this.dragging = false
    this.dragFrom = null
    this.dragX = 0
    return true
  }

  LevelSelectScene.prototype.snapBack = function (fromX) {
    this.animFrom = fromX
    this.animTo = 0
    this.animT = 0
    this.pendingIndex = null
  }

  LevelSelectScene.prototype.shift = function (dir) {
    return this.startSlide(dir)
  }

  LevelSelectScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 2.2 }
  }

  LevelSelectScene.prototype.levelLock = function (level) {
    if (this.spec.pickKey === 'timedId') return { on: !!level.locked, why: '暂未开放，敬请期待哦' }
    return aidLevelLock(this.game, level)
  }

  LevelSelectScene.prototype.update = function (dt) {
    if (this.toast) {
      this.toast.t -= dt
      if (this.toast.t <= 0) this.toast = null
    }
    if (this.dragging || this.animT >= 1) return
    this.animT = Math.min(1, this.animT + dt / this.animDur)
    var u = easeOutCubic(this.animT)
    this.slideX = lerp(this.animFrom, this.animTo, u)
    if (this.animT >= 1) {
      if (this.pendingIndex != null) this.index = this.pendingIndex
      this.pendingIndex = null
      this.slideX = 0
      this.animFrom = 0
      this.animTo = 0
    }
  }

  LevelSelectScene.prototype.drawChevron = function (ctx, x, y, dir, on) {
    var s = this.view.height * 0.038
    ctx.save()
    ctx.globalAlpha = on ? 1 : 0.32
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = Math.max(8, this.view.height * 0.012)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(x - dir * s * 0.35, y - s)
    ctx.lineTo(x + dir * s * 0.55, y)
    ctx.lineTo(x - dir * s * 0.35, y + s)
    ctx.stroke()
    ctx.restore()
  }

  LevelSelectScene.prototype.drawCard = function (ctx, level, ox) {
    var L = this.layout
    var c = L.card
    var x = c.x + ox
    var y = c.y
    var w = c.w
    var h = c.h
    var r = c.r
    var infoH = L.infoH
    var img = level.art ? this.images[level.art] : null
    ctx.save()
    roundRect(ctx, x, y, w, h, r)
    ctx.clip()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x, y, w, h)
    if (img) drawCover(ctx, img, x, y, w, h)
    else {
      ctx.fillStyle = '#f6e2ad'
      ctx.fillRect(x, y, w, h)
    }
    var lock = this.levelLock(level)
    if (lock.on) {
      ctx.fillStyle = 'rgba(43,43,43,0.38)'
      ctx.fillRect(x, y, w, h - infoH)
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = uiFont(Math.round(this.view.height * 0.036))
      var why = lock.why || '暂未开放，敬请期待哦'
      var whyRows = wrapText(ctx, why, w * 0.72)
      var whyLh = this.view.height * 0.048
      var whyY = y + (h - infoH) * 0.5 - ((whyRows.length - 1) * whyLh) / 2
      var wi
      for (wi = 0; wi < whyRows.length; wi++) {
        fillFatText(ctx, whyRows[wi], x + w / 2, whyY + wi * whyLh)
      }
    }
    ctx.fillStyle = 'rgba(255,255,255,0.62)'
    ctx.fillRect(x, y + h - infoH, w, infoH + 2)
    ctx.restore()

    ctx.fillStyle = AID_INK
    ctx.font = uiFont(Math.round(this.view.height * 0.055))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var hasRewards = levelHasNutrientRewards(level)
    fillFatText(ctx, level.name, x + w / 2, y + h - infoH * (hasRewards ? 0.74 : 0.62))

    var statsY = y + h - infoH * (hasRewards ? 0.48 : 0.28)
    var starR = this.view.height * 0.016
    var gap = starR * 2.15
    var labSize = Math.round(this.view.height * 0.028)
    ctx.font = uiFont(labSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var leftX = x + w * 0.12
    ctx.fillStyle = AID_INK
    fillFatText(ctx, '难度：', leftX, statsY)
    ctx.font = uiFont(labSize)
    var labW = ctx.measureText('难度：').width
    var i
    for (i = 0; i < level.stars; i++) {
      drawStar(ctx, leftX + labW + starR + i * gap, statsY, starR, AID_BG)
    }
    var timeX = x + w * 0.58
    ctx.fillStyle = AID_INK
    ctx.font = uiFont(labSize)
    fillFatText(ctx, '时限：' + formatAidClock(level.limit), timeX, statsY)
    if (hasRewards) {
      drawLevelRewardRow(
        ctx,
        this.images,
        this.spec.pickKey === 'timedId' ? level : levelNutrientFace(level),
        x + w * 0.06,
        y + h - infoH * 0.2,
        w * 0.88,
        this.view.height * 0.038
      )
    }
  }

  LevelSelectScene.prototype.draw = function () {
    this.layout = this.computeLayout()
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var ox = this.offsetX()
    var stride = this.slideStride()
    ctx.fillStyle = AID_BG
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(h * 0.048))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, this.titleText, w / 2, L.titleY)

    ctx.save()
    ctx.beginPath()
    ctx.rect(0, L.card.y - 8, w, L.card.h + 16)
    ctx.clip()
    this.drawCard(ctx, this.levels[this.index], ox)
    if (this.index > 0) this.drawCard(ctx, this.levels[this.index - 1], ox - stride)
    if (this.index < this.levels.length - 1) {
      this.drawCard(ctx, this.levels[this.index + 1], ox + stride)
    }
    ctx.restore()

    this.drawChevron(ctx, L.arrowL.x, L.arrowL.y, -1, this.index > 0)
    this.drawChevron(ctx, L.arrowR.x, L.arrowR.y, 1, this.index < this.levels.length - 1)

    var st = L.start
    var scale = this.pressed === 'start' ? 0.96 : 1
    ctx.save()
    ctx.translate(st.x, st.y)
    ctx.scale(scale, scale)
    fillRoundRect(ctx, -st.w / 2, -st.h / 2, st.w, st.h, st.h / 2, STORE_MAROON)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(st.h * 0.42))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '开始', 0, 1)
    ctx.restore()

    this.back.draw(ctx)
    if (this.toast) {
      var ty = h * 0.84
      ctx.globalAlpha = Math.min(1, this.toast.t * 1.5)
      fillRoundRect(ctx, w / 2 - h * 0.42, ty, h * 0.84, h * 0.08, 14, 'rgba(40,40,40,0.84)')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(h * 0.032))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      fillFatText(ctx, this.toast.text, w / 2, ty + h * 0.04)
      ctx.globalAlpha = 1
    }
  }

  LevelSelectScene.prototype.onDown = function (x, y) {
    this.back.pressed = this.back.hit(x, y)
    this.pressed = this.hit(x, y)
    if (this.busy()) {
      this.dragging = false
      this.dragFrom = null
      return
    }
    this.dragging = this.pressed === 'card'
    this.dragFrom = this.dragging ? x : null
    this.dragBase = this.slideX
    this.dragX = this.slideX
  }

  LevelSelectScene.prototype.onMove = function (x) {
    if (!this.dragging || this.dragFrom == null) return
    var stride = this.slideStride()
    var minX = this.index < this.levels.length - 1 ? -stride : 0
    var maxX = this.index > 0 ? stride : 0
    this.dragX = clamp(x - this.dragFrom + this.dragBase, minX, maxX)
  }

  LevelSelectScene.prototype.onUp = function (x, y) {
    var dragged = this.dragging
    var dx = this.dragX
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    if (dragged) {
      var thresh = this.view.height * 0.08
      var dir = dx < 0 ? 1 : -1
      if (Math.abs(dx) > thresh && this.startSlide(dir)) {
        this.sounds.unlock()
        this.sounds.play('cardMove')
      } else {
        this.dragging = false
        this.dragFrom = null
        this.dragX = 0
        this.snapBack(dx)
      }
      return
    }
    this.dragging = false
    this.dragFrom = null
    this.dragX = 0
    if (this.busy()) return
    if (!id || this.hit(x, y) !== id) return
    this.sounds.unlock()
    if (id === 'back') {
      this.sounds.play('tap')
      this.game.go(this.backTo)
      return
    }
    if (id === 'prev' || id === 'next') {
      if (this.shift(id === 'next' ? 1 : -1)) this.sounds.play('cardMove')
      else this.sounds.play('tap')
      return
    }
    this.sounds.play('tap')
    if (id === 'start') {
      var level = this.levels[this.index]
      var lock = this.levelLock(level)
      if (lock.on) {
        this.showToast(lock.why || '暂未开放，敬请期待哦')
        return
      }
      if (this.spec.onStart) {
        this.spec.onStart(this.game, level)
        return
      }
      this.game.timedId = null
      this.game.aidCprOnly = false
      this.game.aidLevelId = level.id
      this.game.go('aid')
    }
  }

  function aidPlaceBack(view, back) {
    var w = view.width
    var h = view.height
    var inset = hubInsets(view)
    var backR = h * 0.042
    back.r = backR
    var leftSafe = h * 0.008
    if (isWx && typeof wx.getSystemInfoSync === 'function') {
      try {
        var info = wx.getSystemInfoSync()
        var ww = info.windowWidth || w
        if (info.safeArea) {
          leftSafe = Math.min(info.safeArea.left * (w / ww) * 0.28, h * 0.018)
        }
      } catch (err) {}
    }
    back.x = leftSafe + backR
    back.y = Math.max(h * 0.072, inset.t * 0.55)
    return { titleY: back.y, inset: inset }
  }

  function AidBriefScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.level = aidLevel(game.aidLevelId)
    this.pressed = null
    this.enterT = 0
    this.enterDur = 0.34
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.layout = this.computeLayout()
  }

  AidBriefScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var ctx = this.view.ctx
    var place = aidPlaceBack(this.view, this.back)
    var inset = place.inset
    var titleY = place.titleY
    var startW = Math.min(h * 0.34, w * 0.22)
    var startH = h * 0.092
    var startY = h - Math.max(h * 0.048, inset.b) - startH / 2
    var panelW = Math.min(w * 0.78, h * 1.32)
    var padX = h * 0.055
    var padY = h * 0.05
    var tagH = h * 0.048
    var bodySize = Math.round(h * 0.038)
    var lineH = bodySize * 1.52
    var iconS = h * 0.062
    var innerW = panelW - padX * 2
    ctx.font = uiFont(bodySize)
    var storyLines = wrapMarked(ctx, this.level.story, this.level.storyHi, innerW)
    var taskLines = wrapMarked(ctx, this.level.task, null, innerW)
    var gapTag = h * 0.02
    var secGap = h * 0.036
    var rewardH = iconS
    if (levelHasNutrientRewards(this.level)) rewardH += iconS + h * 0.018
    var contentH = padY +
      tagH + gapTag + storyLines.length * lineH + secGap +
      tagH + gapTag + taskLines.length * lineH + secGap +
      tagH + gapTag + rewardH + padY
    var top = titleY + h * 0.058
    var bot = startY - startH / 2 - h * 0.028
    var panelH = Math.min(contentH, bot - top)
    var panelY = top + Math.max(0, (bot - top - panelH) / 2)
    return {
      titleY: titleY,
      panel: { x: (w - panelW) / 2, y: panelY, w: panelW, h: panelH, r: h * 0.045 },
      padX: padX,
      padY: padY,
      tagH: tagH,
      bodySize: bodySize,
      lineH: lineH,
      iconS: iconS,
      gapTag: gapTag,
      secGap: secGap,
      storyLines: storyLines,
      taskLines: taskLines,
      innerW: innerW,
      start: { x: w / 2, y: startY, w: startW, h: startH }
    }
  }

  AidBriefScene.prototype.hit = function (x, y) {
    var st = this.layout.start
    if (this.back.hit(x, y)) return 'back'
    if (hitRect(x, y, st.x, st.y, st.w, st.h, 6)) return 'start'
    return null
  }

  AidBriefScene.prototype.update = function (dt) {
    this.enterT = Math.min(1, this.enterT + dt / this.enterDur)
  }

  AidBriefScene.prototype.draw = function () {
    this.layout = this.computeLayout()
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var level = this.level
    var art = this.images[level.art]
    var u = easeOutCubic(this.enterT)
    ctx.fillStyle = '#f3f1ec'
    ctx.fillRect(0, 0, w, h)
    if (art) {
      ctx.globalAlpha = 0.22
      drawCover(ctx, art, 0, 0, w, h)
      ctx.globalAlpha = 1
    }
    ctx.fillStyle = 'rgba(255,255,255,0.46)'
    ctx.fillRect(0, 0, w, h)

    ctx.save()
    ctx.globalAlpha = u

    ctx.fillStyle = AID_INK
    ctx.font = uiFont(Math.round(h * 0.062))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, level.name, w / 2, L.titleY)

    var p = L.panel
    ctx.save()
    roundRect(ctx, p.x, p.y, p.w, p.h, p.r)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.strokeStyle = AID_RED
    ctx.lineWidth = Math.max(7, h * 0.011)
    ctx.stroke()
    ctx.clip()

    var x = p.x + L.padX
    var y = p.y + L.padY
    drawAidTag(ctx, '背景', x, y, L.tagH)
    y += L.tagH + L.gapTag
    ctx.font = uiFont(L.bodySize)
    drawMarkedLines(ctx, L.storyLines, x, y + L.lineH * 0.42, L.lineH, AID_INK, AID_RED)
    y += L.storyLines.length * L.lineH + L.secGap

    drawAidTag(ctx, '任务', x, y, L.tagH)
    y += L.tagH + L.gapTag
    ctx.font = uiFont(L.bodySize)
    drawMarkedLines(ctx, L.taskLines, x, y + L.lineH * 0.42, L.lineH, AID_INK, AID_RED)
    y += L.taskLines.length * L.lineH + L.secGap

    drawAidTag(ctx, '最高可获得奖励', x, y, L.tagH)
    y += L.tagH + L.gapTag + L.iconS / 2
    if (levelHasNutrientRewards(level)) {
      drawLevelRewardRow(ctx, this.images, levelNutrientFace(level), x, y, L.innerW || p.w - L.padX * 2, L.iconS)
      y += L.iconS + h * 0.018
    }
    var rw = drawAidReward(ctx, this.images.iconCoin, level.rewardCoins, x, y, L.iconS)
    drawAidReward(ctx, this.images.iconCapsule, level.rewardPills, x + rw + h * 0.055, y, L.iconS)
    ctx.restore()

    var st = L.start
    var scale = this.pressed === 'start' ? 0.96 : 1
    ctx.save()
    ctx.translate(st.x, st.y)
    ctx.scale(scale, scale)
    fillRoundRect(ctx, -st.w / 2, -st.h / 2, st.w, st.h, st.h / 2, AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(st.h * 0.42))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '开始', 0, 1)
    ctx.restore()

    this.back.draw(ctx)
    ctx.restore()
  }

  AidBriefScene.prototype.onDown = function (x, y) {
    this.back.pressed = this.back.hit(x, y)
    this.pressed = this.hit(x, y)
  }

  AidBriefScene.prototype.onMove = function () {}

  AidBriefScene.prototype.onUp = function (x, y) {
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.sounds.unlock()
    this.sounds.play('tap')
    if (id === 'back') this.game.go('levels')
    else if (id === 'start') {
      if (aidLevelLock(this.game, this.level).on) return
      this.game.aidCprOnly = false
      this.game.go('aidPlay')
    }
  }

  function FirstAidScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.level = aidLevel(game.aidLevelId)
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.pressed = null
    this.clock = this.level.limit
    this.flashClock = 0
    this.introT = 0
    this.taskU = 0
    this.bubbleU = 0
    this.phoneU = 0
    this.dpadU = 0
    this.clockOn = false
    this.dial = ''
    this.called = false
    this.talk = this.level.id === 'office' ? AID_TALK_OFFICE1 : AID_TALK1
    this.talkTyped = 0
    if (this.talk) this.sounds.play('dialog')
    this.okU = 0
    this.phoneReady = false
    this.helpOpen = false
    this.moveNeed = 6
    this.moveGot = 0
    this.moveDir = AID_DIRS[Math.floor(Math.random() * AID_DIRS.length)]
    this.moveAnim = 1
    this.wrongT = 0
    this.lookY = 0
    this.toast = null
    this.phonePhase = 'dial'
    this.medicU = 0
    this.chipOrder = shuffle(aidAddrBank(this.level.id).map(function (a) { return a.id }))
    this.picked = []
    this.addrDone = false
    this.medicTalk = AID_MEDIC
    this.touches = {}
    this.handL = false
    this.handR = false
    this.cprOn = false
    this.cprCountT = 0
    this.cprT = 0
    this.cprDepth = 0
    this.cprHolding = false
    this.cprRhythmOk = false
    this.cprEnded = false
    this.zoomU = 0
    this.cprStats = { perfect: 0, missRhythm: 0, missDepth: 0, fail: 0, quizOk: 0, quizMiss: 0, ventOk: 0, padMoves: 0 }
    this.cprPhase = 'count'
    this.cprRound = 0
    this.cprPlayT = 0
    this.famU = 0
    this.famPressT = 0
    this.famDip = 0
    this.headU = 0
    this.ventGot = 0
    this.ventT = 0
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.quiz = null
    this.quizTyped = 0
    this.quizBar = 0
    this.quizShowOpt = false
    this.quizHit = []
    this.clockPlayed = 0
    this.endT = 0
    this.endManU = 0
    this.endTextN = 0
    this.endCardT = -1
    this.endTextHold = 0
    this.playSec = 0
    this.timedId = game.timedId || null
    this.cprHard = false
    this.cprOnly = !!game.aidCprOnly || !!this.timedId
    this.officePhase = 'cut'
    this.cutPts = []
    this.cutting = false
    this.cutHintU = -1
    this.shirtOpened = false
    this.shirtOpen = 0
    this.aedU = 0
    this.aedLine = ''
    this.aedTyped = 0
    this.aedWait = 0
    this.aedShocked = false
    this.aedShockCount = 0
    this.aedAnalyzeT = 0
    this.pads = [
      { x: 0, y: 0, ok: false, side: 'R' },
      { x: 0, y: 0, ok: false, side: 'L' }
    ]
    this.padsInited = false
    this.padMoves = 0
    this.padDragFrom = null
    this.padDragWasOk = false
    this.dragPad = -1
    this.layout = this.computeLayout()
    if (this.isAedDrill()) this.skipToAedDrill()
    else if (this.cprOnly) this.skipToCpr()
  }

  FirstAidScene.prototype.isHome = function () {
    return this.level.id === 'home'
  }

  FirstAidScene.prototype.isOffice = function () {
    return this.level.id === 'office'
  }

  FirstAidScene.prototype.isTimed = function () {
    return this.timedId === 'cpr' || this.timedId === 'aed'
  }

  FirstAidScene.prototype.isCprDrill = function () {
    return this.timedId === 'cpr'
  }

  FirstAidScene.prototype.isAedDrill = function () {
    return this.timedId === 'aed'
  }

  FirstAidScene.prototype.cprNeedDepth = function () {
    if (this.isCprDrill()) return !!this.cprHard
    if (this.isAedDrill()) return false
    return this.isHome()
  }

  FirstAidScene.prototype.leaveTo = function () {
    if (this.isTimed()) return 'timed'
    if (this.cprOnly) return 'play'
    return 'aid'
  }

  FirstAidScene.prototype.isPlayable = function () {
    return this.isHome() || this.isOffice()
  }

  FirstAidScene.prototype.skipToCpr = function () {
    this.called = true
    this.addrDone = true
    this.phoneReady = true
    this.phoneU = 0
    this.phonePhase = 'done'
    this.bubbleU = 0
    this.talk = AID_TALK_CPR
    this.talkTyped = this.talk.length
    this.zoomU = 1
    this.clockOn = true
    this.clock = this.level.limit
    this.okU = 0
    this.medicU = 0
    this.cprCountT = 0.01
    this.cprOn = false
    this.cprEnded = false
    this.cprPhase = 'count'
    this.cprRound = 0
    this.cprPlayT = 0
    this.headU = 0
    this.ventGot = 0
    this.ventT = 0
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.famU = 0
    this.layout = this.computeLayout()
    if (this.isCprDrill()) {
      this.clock = TIMED_CPR_EASY + TIMED_CPR_HARD
      this.cprHard = false
      this.talk = ''
      this.talkTyped = 0
      this.bubbleU = 0
    }
  }

  FirstAidScene.prototype.skipToAedDrill = function () {
    this.called = true
    this.addrDone = true
    this.phoneReady = true
    this.phoneU = 0
    this.phonePhase = 'done'
    this.bubbleU = 0
    this.talk = ''
    this.talkTyped = 0
    this.zoomU = 1
    this.clockOn = true
    this.clock = TIMED_AED_SEC
    this.okU = 0
    this.medicU = 0
    this.cprCountT = 0
    this.cprOn = false
    this.cprEnded = false
    this.cprPhase = 'waitAed'
    this.cprRound = 0
    this.cprPlayT = 0
    this.headU = 0
    this.famU = 0
    this.officePhase = 'pads'
    this.shirtOpened = true
    this.shirtOpen = 1
    this.aedU = 1
    this.aedLine = AID_AED_ATTACH
    this.aedTyped = this.aedLine.length
    this.layout = this.computeLayout()
    this.padsInited = false
    this.initPads(this.layout)
  }

  FirstAidScene.prototype.randDir = function () {
    var next = this.moveDir
    var guard = 0
    while (next === this.moveDir && guard < 8) {
      next = AID_DIRS[Math.floor(Math.random() * AID_DIRS.length)]
      guard += 1
    }
    this.moveDir = next
  }

  FirstAidScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 2.4 }
  }

  FirstAidScene.prototype.officeTasks = function () {
    if (this.isCprDrill()) return ['30秒简易：只看节奏', '30秒困难：节奏加深度', '坚持按到时间结束']
    if (this.isAedDrill()) return ['按提示贴好电极片', '分析后按下电击键', '电击后立即胸外按压']
    return this.isOffice() ? AID_TASK_OFFICE : [AID_TASK1, AID_TASK2, AID_TASK3]
  }

  FirstAidScene.prototype.padsBothOk = function () {
    return !!(this.pads[0] && this.pads[1] && this.pads[0].ok && this.pads[1].ok)
  }

  FirstAidScene.prototype.padInZone = function (pad, zone) {
    return hitCircle(pad.x, pad.y, zone.x, zone.y, zone.r, this.view.height * 0.012)
  }

  FirstAidScene.prototype.padOkCount = function () {
    var n = 0
    if (this.pads[0] && this.pads[0].ok) n += 1
    if (this.pads[1] && this.pads[1].ok) n += 1
    return n
  }

  FirstAidScene.prototype.syncPadOk = function (L) {
    var i
    var p
    var home
    var zone
    if (!this.shirtOpened) {
      if (this.pads[0]) this.pads[0].ok = false
      if (this.pads[1]) this.pads[1].ok = false
      return
    }
    for (i = 0; i < this.pads.length; i++) {
      p = this.pads[i]
      home = L.padHome && L.padHome[i]
      zone = p.side === 'L' ? L.zoneB : L.zoneA
      p.ok = !this.padDocked(p, home) && this.padInZone(p, zone)
    }
  }

  FirstAidScene.prototype.setAedLine = function (text) {
    if (this.aedLine === text) return
    this.aedLine = text
    this.aedTyped = 0
    if (text && this.sounds) this.sounds.play('dialog')
  }

  FirstAidScene.prototype.initPads = function (L) {
    if (this.padsInited) return
    this.pads = [
      { x: L.padHome[0].x, y: L.padHome[0].y, ok: false, side: 'R' },
      { x: L.padHome[1].x, y: L.padHome[1].y, ok: false, side: 'L' }
    ]
    this.padsInited = true
  }

  FirstAidScene.prototype.cutScore = function (L) {
    var pts = this.cutPts
    var ax = L.cutFrom.x
    var ay = L.cutFrom.y
    var bx = L.cutTo.x
    var by = L.cutTo.y
    var abx = bx - ax
    var aby = by - ay
    var len2 = abx * abx + aby * aby
    if (!pts || pts.length < 8 || len2 < 4) return false
    var i
    var t
    var px
    var py
    var dx
    var dy
    var d
    var minT = 1
    var maxT = 0
    var avg = 0
    for (i = 0; i < pts.length; i++) {
      px = pts[i].x - ax
      py = pts[i].y - ay
      t = clamp((px * abx + py * aby) / len2, 0, 1)
      dx = pts[i].x - (ax + t * abx)
      dy = pts[i].y - (ay + t * aby)
      d = Math.sqrt(dx * dx + dy * dy)
      avg += d
      if (t < minT) minT = t
      if (t > maxT) maxT = t
    }
    avg /= pts.length
    return avg < this.view.height * 0.058 && maxT - minT > 0.58
  }

  FirstAidScene.prototype.finishCut = function (L) {
    if (this.shirtOpened) return
    if (this.cutScore(L)) {
      this.shirtOpened = true
      this.cutPts = []
      this.officePhase = 'pads'
      this.bubbleU = 0
      this.talkTyped = this.talk.length
      this.setAedLine(AID_AED_ATTACH)
      this.aedWait = 0
      this.showToast('皮肤已暴露，按机器提示贴电极')
    } else {
      this.cutPts = []
      this.showToast('从衣领中间向下划开')
    }
  }

  FirstAidScene.prototype.hitPad = function (x, y, L) {
    var i
    var p
    var best = -1
    var bestD = 1e9
    var d
    var dx
    var dy
    for (i = 0; i < this.pads.length; i++) {
      p = this.pads[i]
      dx = x - p.x
      dy = y - p.y
      d = dx * dx + dy * dy
      if (d < bestD && hitRect(x, y, p.x, p.y, L.padW, L.padH, 10)) {
        best = i
        bestD = d
      }
    }
    return best
  }

  FirstAidScene.prototype.startOfficeCpr = function () {
    this.aedShocked = true
    this.aedShockCount = Math.max(1, this.aedShockCount || 0)
    this.officePhase = 'cpr'
    this.setAedLine(AID_AED_CLEAR)
    this.talk = AID_TALK_CPR
    this.talkTyped = this.talk.length
    this.bubbleU = 0
    this.cprRound = 0
    this.cprPlayT = 0
    if (this.isAedDrill()) {
      this.cprCountT = 0
      this.cprOn = true
      this.cprPhase = 'player'
    } else {
      this.cprCountT = 0.01
      this.cprOn = false
      this.cprPhase = 'count'
    }
  }

  FirstAidScene.prototype.startOfficeReshock = function () {
    if (this.cprHolding) this.scoreCpr()
    this.cprHolding = false
    this.cprDepth = 0
    this.touches = {}
    this.handL = false
    this.handR = false
    this.cprOn = false
    this.cprPhase = 'waitShock'
    this.officePhase = 'shock'
    this.setAedLine(AID_AED_SHOCK)
    this.bubbleU = 0
  }

  FirstAidScene.prototype.resumeOfficeCpr = function () {
    this.aedShockCount = 2
    this.officePhase = 'cpr'
    this.setAedLine(AID_AED_CLEAR)
    this.cprRound = 2
    this.cprPhase = 'player'
    this.cprOn = true
    this.cprPlayT = 0
    this.cprCountT = 0
    this.cprHolding = false
    this.cprDepth = 0
    this.touches = {}
    this.handL = false
    this.handR = false
    this.bubbleU = 0
  }

  FirstAidScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var place = aidPlaceBack(this.view, this.back)
    var phoneImg = this.images.aidPhone
    var phoneH = h * 0.94
    var phoneW = phoneImg && phoneImg.width
      ? phoneH * (phoneImg.width / phoneImg.height)
      : phoneH * 0.503
    if (phoneW > w * 0.4) {
      phoneW = w * 0.4
      phoneH = phoneImg && phoneImg.width ? phoneW * (phoneImg.height / phoneImg.width) : phoneW / 0.503
    }
    var phone = {
      x: Math.max(h * 0.14, w * 0.14),
      y: (h - phoneH) * 0.62,
      w: phoneW,
      h: phoneH
    }
    var keys = []
    var labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    var gridX = phone.x + phone.w * 0.1
    var gridY = phone.y + phone.h * 0.22
    var gridW = phone.w * 0.8
    var gridH = phone.h * 0.54
    var cellW = gridW / 3
    var cellH = gridH / 4
    var keyR = Math.min(cellW, cellH) * 0.45
    var i
    for (i = 0; i < 9; i++) {
      keys.push({
        id: labels[i],
        x: gridX + (i % 3) * cellW + cellW / 2,
        y: gridY + Math.floor(i / 3) * cellH + cellH / 2,
        r: keyR
      })
    }
    var rowY = gridY + cellH * 3.5
    var zero = { id: '0', x: gridX + cellW * 1.5, y: rowY, r: keyR }
    var del = { x: gridX + cellW * 0.5, y: rowY, r: keyR }
    keys.push(zero)
    var call = { x: gridX + cellW * 2.5, y: rowY, r: keyR }
    var zoom = this.zoomU || 0
    var manH = h * (1.24 + zoom * 0.86)
    var man = this.isOffice() ? this.images.aidOfficeMan : this.images.aidOldman
    var manW = man && man.width ? manH * (man.width / man.height) : manH * 0.42
    var manX = w * (0.68 - 0.18 * zoom)
    if (this.isOffice()) manX = w * (0.70 - 0.12 * zoom)
    var manYCpr = h * (0.82 + 0.10 * zoom) + this.lookY
    var manYBreath = h * 0.5 + manH / 2 - manH * 0.175
    var headU = this.headU || 0
    var manY = manYCpr + (manYBreath - manYCpr) * headU
    var chestY = manY - manH / 2 + manH * 0.33
    var mouthY = manY - manH / 2 + manH * 0.22
    var dpr = h * 0.055
    var dpad = { x: w * 0.8, y: h * 0.52, r: dpr, gap: h * 0.118 }
    var menu = wxMenuRect(this.view)
    var nodeGap = h * 0.062
    var nodeR = h * 0.015
    var nodeLast = Math.min(w - h * 0.06, menu.x - h * 0.05)
    var nodeX = nodeLast - nodeGap * 3
    var clockW = h * 0.27
    var bubbleW = this.cprPhase === 'breath' ? Math.min(w * 0.38, h * 0.7) : Math.min(w * 0.28, h * 0.52)
    var hintR = h * 0.042
    var addr = this.layoutAddr(phone, h)
    var shirtW = manW * 0.92
    var shirtH = manH * 0.36
    var shirt = {
      x: manX - shirtW / 2,
      y: manY - manH / 2 + manH * 0.235,
      w: shirtW,
      h: shirtH
    }
    var aedImg = this.images.aidOfficeAed
    var aedH = h * 0.62
    var aedW = aedImg && aedImg.width ? aedH * (aedImg.width / aedImg.height) : h * 0.4
    if (aedW > w * 0.34) {
      aedW = w * 0.34
      aedH = aedImg && aedImg.width ? aedW * (aedImg.height / aedImg.width) : aedW * 1.32
    }
    var aed = {
      x: Math.max(h * 0.09, w * 0.055),
      y: h - aedH - h * 0.028,
      w: aedW,
      h: aedH
    }
    var padW = Math.max(h * 0.078, aedW * 0.26)
    var padH = Math.max(h * 0.1, aedH * 0.145)
    var padHome = [
      { x: aed.x + aed.w * 0.32, y: aed.y + aed.h * 0.72 },
      { x: aed.x + aed.w * 0.68, y: aed.y + aed.h * 0.72 }
    ]
    return {
      titleY: place.titleY,
      nodes: { x: nodeX, y: h * 0.042, gap: nodeGap, r: nodeR },
      clock: {
        x: nodeLast - clockW + nodeR,
        y: h * 0.078,
        w: clockW,
        h: h * 0.056
      },
      phone: phone,
      keys: keys,
      zero: zero,
      del: del,
      call: call,
      dialY: phone.y + phone.h * 0.168,
      pad: { x: gridX, y: gridY, w: gridW, h: gridH, cellW: cellW, cellH: cellH },
      man: {
        x: manX,
        y: manY,
        w: manW,
        h: manH
      },
      bubble: {
        x: w - bubbleW - h * 0.035,
        y: h * 0.205,
        w: bubbleW,
        h: h * 0.16
      },
      ok: {
        x: w - bubbleW / 2 - h * 0.035,
        y: h * 0.66,
        w: h * 0.24,
        h: h * 0.09
      },
      hint: {
        x: w - hintR - h * 0.032,
        y: h - hintR - h * 0.032,
        r: hintR
      },
      help: {
        x: w / 2,
        y: h * 0.48,
        w: Math.min(w * 0.52, h * 0.9),
        h: h * 0.34
      },
      addrPicked: addr.picked,
      addrPool: addr.pool,
      addrSend: addr.send,
      addrChipH: addr.chipH,
      medic: {
        x: phone.x + phone.w + h * 0.02,
        y: phone.y + phone.h * 0.2,
        w: Math.min(w * 0.3, h * 0.52),
        h: h * 0.18
      },
      chest: { x: manX, y: chestY, r: h * (0.1 + zoom * 0.078) },
      mouth: { x: manX, y: mouthY, r: h * 0.09 },
      handL: { x: manX - h * 0.08, y: chestY, r: h * 0.075 },
      handR: { x: manX + h * 0.06, y: chestY, r: h * 0.075 },
      pend: {
        x: this.isOffice() && this.addrDone ? w - h * 0.2 : w * 0.145,
        y: this.isOffice() && this.addrDone ? h * 0.4 : h * 0.34,
        r: this.isOffice() && this.addrDone ? h * 0.1 : h * 0.125
      },
      depth: { x: w * 0.695, y: h * 0.32, w: h * 0.4, h: h * 0.054 },
      dpad: dpad,
      dirs: {
        up: { x: dpad.x, y: dpad.y - dpad.gap, r: dpr },
        down: { x: dpad.x, y: dpad.y + dpad.gap, r: dpr },
        left: { x: dpad.x - dpad.gap, y: dpad.y, r: dpr },
        right: { x: dpad.x + dpad.gap, y: dpad.y, r: dpr }
      },
      shirt: shirt,
      cutFrom: { x: manX, y: shirt.y + shirt.h * 0.1 },
      cutTo: { x: manX, y: shirt.y + shirt.h * 0.9 },
      aed: aed,
      shock: {
        x: aed.x + aed.w * 0.5,
        y: aed.y + aed.h * 0.875,
        r: Math.max(h * 0.032, aed.w * 0.09)
      },
      aedScreen: {
        x: aed.x + aed.w * 0.12,
        y: aed.y + aed.h * 0.305,
        w: aed.w * 0.76,
        h: aed.h * 0.3
      },
      zoneA: { x: manX - manW * 0.17, y: manY - manH * 0.22, r: h * 0.068 },
      zoneB: { x: manX + manW * 0.2, y: manY - manH * 0.06, r: h * 0.072 },
      padHome: padHome,
      padW: padW,
      padH: padH
    }
  }

  FirstAidScene.prototype.fly = function (delay, dur, t) {
    return easeOutCubic(clamp((t - delay) / dur, 0, 1))
  }

  FirstAidScene.prototype.flowChips = function (ids, x, y, maxW, chipH, h, extra) {
    var ctx = this.view.ctx
    var gap = Math.max(10, h * 0.012)
    var padX = Math.max(14, h * 0.02)
    extra = extra || ''
    ctx.font = uiFont(Math.round(chipH * 0.46))
    var cx = x
    var cy = y
    var out = []
    var i
    var item
    var label
    var tw
    var cw
    for (i = 0; i < ids.length; i++) {
      item = aidAddrById(ids[i])
      if (!item) continue
      label = item.text + extra
      tw = ctx.measureText(label).width
      cw = Math.max(tw + padX * 2, chipH * 2.1)
      if (cx > x && cx + cw > x + maxW) {
        cx = x
        cy += chipH + gap
      }
      out.push({ id: item.id, text: item.text, label: label, x: cx, y: cy, w: cw, h: chipH })
      cx += cw + gap
    }
    return out
  }

  FirstAidScene.prototype.layoutAddr = function (phone, h) {
    var innerX = phone.x + phone.w * 0.1
    var innerW = phone.w * 0.8
    var chipH = Math.max(h * 0.048, phone.h * 0.054)
    var sendH = Math.max(h * 0.058, phone.h * 0.068)
    var send = {
      x: phone.x + phone.w * 0.14,
      y: phone.y + phone.h * 0.775,
      w: phone.w * 0.72,
      h: sendH
    }
    if (this.phonePhase === 'dial') {
      return { picked: [], pool: [], send: send, chipH: chipH }
    }
    var pickedY = phone.y + phone.h * 0.21
    var picked = this.flowChips(this.picked, innerX, pickedY, innerW, chipH, h, ' ×')
    var pickedBottom = pickedY
    if (picked.length) {
      pickedBottom = picked[picked.length - 1].y + chipH + h * 0.014
    }
    var remain = []
    var i
    var id
    for (i = 0; i < this.chipOrder.length; i++) {
      id = this.chipOrder[i]
      if (this.picked.indexOf(id) < 0) remain.push(id)
    }
    var pool = this.flowChips(remain, innerX, pickedBottom, innerW, chipH, h, '')
    if (pool.length && pool[pool.length - 1].y + chipH > send.y - h * 0.012) {
      chipH = Math.max(h * 0.042, phone.h * 0.048)
      picked = this.flowChips(this.picked, innerX, pickedY, innerW, chipH, h, ' ×')
      pickedBottom = picked.length ? picked[picked.length - 1].y + chipH + h * 0.012 : pickedY
      pool = this.flowChips(remain, innerX, pickedBottom, innerW, chipH, h, '')
    }
    return { picked: picked, pool: pool, send: send, chipH: chipH }
  }

  FirstAidScene.prototype.measureBubble = function (L, h) {
    var b = L.bubble
    var ctx = this.view.ctx
    var fontPx = aidFont(h, 0.03, 13)
    ctx.font = uiFont(fontPx)
    var pad = Math.max(8, h * 0.022)
    var maxW = b.w - pad * 2
    var full = wrapText(ctx, this.talk, maxW)
    var lineH = Math.max(Math.round(fontPx * 1.55), aidFont(h, 0.046, 18))
    var bh = lineH * Math.max(full.length, 1) + pad * 1.8
    return { x: b.x, y: b.y, w: b.w, h: bh, pad: pad, lineH: lineH, full: full, maxW: maxW, fontPx: fontPx }
  }

  FirstAidScene.prototype.syncOk = function (L, h) {
    var box = this.measureBubble(L, h)
    L.ok.x = box.x + box.w / 2
    L.ok.y = box.y + box.h + h * 0.05 + L.ok.h / 2
    return box
  }

  FirstAidScene.prototype.hit = function (x, y) {
    var L = this.layout
    var i
    if (this.back.hit(x, y)) return 'back'
    if (this.cprEnded && this.endCardT >= 0) {
      var ex = this.endExitBtn(this.view.width, this.view.height)
      if (hitRect(x, y, ex.x, ex.y, ex.w, ex.h, 8)) return 'exit'
      return null
    }
    if (!this.isPlayable()) return null
    if (this.helpOpen) return 'helpClose'
    if (this.cprPhase === 'quiz' && this.quizShowOpt) {
      for (i = 0; i < this.quizHit.length; i++) {
        if (hitBox(x, y, this.quizHit[i].x, this.quizHit[i].y, this.quizHit[i].w, this.quizHit[i].h, 4)) {
          return 'quiz:' + i
        }
      }
    }
    if (hitCircle(x, y, L.hint.x, L.hint.y, L.hint.r, 6)) return 'help'
    this.syncOk(L, this.view.height)
    if (!this.phoneReady && this.okU >= 1 && hitRect(x, y, L.ok.x, L.ok.y, L.ok.w, L.ok.h, 8)) return 'ok'
    if (!this.called && this.phoneReady && this.phoneU >= 1) {
      for (i = 0; i < L.keys.length; i++) {
        if (hitCircle(x, y, L.keys[i].x, L.keys[i].y, L.keys[i].r, 4)) {
          return 'key:' + L.keys[i].id
        }
      }
      if (hitCircle(x, y, L.del.x, L.del.y, L.del.r, 4)) return 'del'
      if (hitCircle(x, y, L.call.x, L.call.y, L.call.r, 4)) return 'call'
    }
    if (this.called && !this.addrDone && this.phonePhase === 'addr') {
      if (L.addrSend && hitBox(x, y, L.addrSend.x, L.addrSend.y, L.addrSend.w, L.addrSend.h, 4)) {
        return 'addrSend'
      }
      for (i = 0; i < L.addrPicked.length; i++) {
        if (hitBox(x, y, L.addrPicked[i].x, L.addrPicked[i].y, L.addrPicked[i].w, L.addrPicked[i].h, 4)) {
          return 'picked:' + L.addrPicked[i].id
        }
      }
      for (i = 0; i < L.addrPool.length; i++) {
        if (hitBox(x, y, L.addrPool[i].x, L.addrPool[i].y, L.addrPool[i].w, L.addrPool[i].h, 4)) {
          return 'pool:' + L.addrPool[i].id
        }
      }
    }
    if (this.isOffice() && this.aedU > 0.6 && this.officePhase === 'shock' && !this.cprEnded) {
      if (hitCircle(x, y, L.shock.x, L.shock.y, L.shock.r, 8)) return 'aedShock'
    }
    return null
  }

  FirstAidScene.prototype.connect120 = function () {
    if (this.called) return
    this.called = true
    this.dial = '120'
    this.phonePhase = 'addr'
    this.clockOn = true
  }

  FirstAidScene.prototype.pickAddr = function (id) {
    if (this.addrDone || this.picked.indexOf(id) >= 0) return
    if (!aidAddrById(id)) return
    this.picked.push(id)
  }

  FirstAidScene.prototype.dropAddr = function (id) {
    if (this.addrDone) return
    var i = this.picked.indexOf(id)
    if (i < 0) return
    this.picked.splice(i, 1)
  }

  FirstAidScene.prototype.sendAddr = function () {
    if (this.addrDone) return
    var i
    var item
    var miss = 0
    var trap = 0
    var need = aidNeedList(this.level.id)
    for (i = 0; i < need.length; i++) {
      if (this.picked.indexOf(need[i]) < 0) miss += 1
    }
    for (i = 0; i < this.picked.length; i++) {
      item = aidAddrById(this.picked[i])
      if (item && item.trap) trap += 1
    }
    if (miss || !this.picked.length) {
      this.medicTalk = AID_MEDIC_MISS
      this.medicU = 0.2
      return
    }
    if (trap) {
      var cut = trap * AID_TRAP_SEC
      this.clock = Math.max(0, this.clock - cut)
      this.flashClock = 0.5
      this.showToast('多余干扰信息 −' + cut + '秒')
    }
    this.addrDone = true
    this.phonePhase = 'done'
    this.talk = this.isOffice() ? AID_TALK_OFFICE_CUT : AID_TALK_CPR
    this.talkTyped = 0
    this.bubbleU = 0
    if (this.talk) this.sounds.play('dialog')
    this.medicTalk = AID_MEDIC
    if (this.isOffice()) this.officePhase = 'cut'
  }

  FirstAidScene.prototype.cprClock = function () {
    return this.cprT
  }

  FirstAidScene.prototype.cprAngle = function () {
    return Math.sin((this.cprClock() / 1.7) * Math.PI * 2) * 1.22
  }

  FirstAidScene.prototype.cprInGreen = function () {
    return Math.abs(this.cprAngle()) < 0.5
  }

  FirstAidScene.prototype.cprCountNum = function () {
    if (this.cprOn || this.cprCountT <= 0) return 0
    if (this.cprCountT < 0.8) return 3
    if (this.cprCountT < 1.6) return 2
    if (this.cprCountT < 2.4) return 1
    return 0
  }

  FirstAidScene.prototype.cprDepthOk = function () {
    return this.cprDepth >= 0.56 && this.cprDepth <= 0.76
  }

  FirstAidScene.prototype.cprBoth = function () {
    return this.handL && this.handR
  }

  FirstAidScene.prototype.syncCprHands = function () {
    var n = 0
    var id
    for (id in this.touches) {
      if (Object.prototype.hasOwnProperty.call(this.touches, id)) n += 1
    }
    this.handL = n >= 1
    this.handR = n >= 2 || (n >= 1 && cprMouseMode(this.game))
  }

  FirstAidScene.prototype.pressCpr = function (x, y, pid) {
    if (this.cprEnded || !this.cprOn || this.cprPhase !== 'player') return false
    var L = this.layout
    if (!hitCircle(x, y, L.chest.x, L.chest.y, L.chest.r, 18)) return false
    this.touches[pid] = { on: true }
    this.syncCprHands()
    return true
  }

  FirstAidScene.prototype.moveCpr = function (x, y, pid) {
    if (!this.touches[pid]) return
    var L = this.layout
    if (!hitCircle(x, y, L.chest.x, L.chest.y, L.chest.r, 22)) {
      this.releaseCpr(pid)
      return
    }
    this.touches[pid] = { on: true }
    this.syncCprHands()
  }

  FirstAidScene.prototype.releaseCpr = function (pid) {
    delete this.touches[pid]
    this.syncCprHands()
  }

  FirstAidScene.prototype.scoreCpr = function () {
    var rhythm = this.cprRhythmOk
    var perfect = false
    if (!this.cprNeedDepth()) {
      if (rhythm) {
        this.cprStats.perfect += 1
        perfect = true
      } else this.cprStats.missRhythm += 1
    } else {
      var depth = this.cprDepthOk()
      if (rhythm && depth) {
        this.cprStats.perfect += 1
        perfect = true
      } else if (depth) this.cprStats.missRhythm += 1
      else if (rhythm) this.cprStats.missDepth += 1
      else this.cprStats.fail += 1
    }
    if (perfect && this.sounds) this.sounds.play('chooseRight')
  }

  FirstAidScene.prototype.timedRewardQuality = function () {
    if (this.isCprDrill()) {
      var perfect = this.cprStats.perfect || 0
      return clamp(0.45 + 0.55 * Math.min(1, perfect / 12), 0.45, 1)
    }
    if (this.isAedDrill()) {
      var q = 0.4
      var pads = this.padOkCount()
      var extra = Math.max(0, (this.padMoves || 0) - AID_PAD_FREE_MOVES)
      if (pads >= 1) q += 0.15
      if (pads >= 2) q += 0.2
      if (this.aedShocked || this.aedShockCount) q += 0.25
      q -= extra * 0.04
      return clamp(q, 0.4, 1)
    }
    return 1
  }

  FirstAidScene.prototype.cprReward = function () {
    var s = this.cprStats
    var quizN = this.isTimed() ? 0 : (this.isOffice() ? 2 : AID_CPR_QUIZ_LIST.length)
    var quizOk = s.quizOk || 0
    var perfect = s.perfect || 0
    var pressU = Math.min(1, perfect / AID_SCORE_PERFECT_CAP)
    var quizU = quizN ? quizOk / quizN : 0
    var extraMoves = Math.max(0, (s.padMoves || this.padMoves || 0) - AID_PAD_FREE_MOVES)
    var score = Math.round((5 * (0.65 * pressU + 0.35 * quizU)) * 10) / 10
    var reward = {
      coins: Math.max(0, perfect * AID_COIN_PERFECT - extraMoves * AID_PAD_MOVE_COINS),
      pills: quizOk * AID_PILL_QUIZ,
      score: score,
      playSec: this.playSec || Math.round(this.clockPlayed || this.level.limit),
      stats: {
        perfect: perfect,
        missRhythm: s.missRhythm,
        missDepth: s.missDepth,
        fail: s.fail,
        quizOk: quizOk,
        quizMiss: s.quizMiss || 0,
        quizN: quizN,
        ventOk: s.ventOk || 0,
        padMoves: s.padMoves || this.padMoves || 0,
        score: score
      }
    }
    if (this.isTimed()) {
      var tl = timedLevel(this.timedId) || {}
      var q = this.timedRewardQuality()
      reward.coins = Math.round((tl.rewardCoins || 0) * q)
      reward.pills = Math.max(0, Math.round((tl.rewardPills || 0) * q))
      applyScaledNutrientReward(reward, tl, q)
    } else if (levelHasNutrientRewards(this.level)) {
      applyScaledNutrientReward(
        reward,
        this.level,
        clamp(0.45 + 0.55 * Math.min(1, (reward.score || 0) / 5), 0.45, 1)
      )
    }
    return reward
  }

  FirstAidScene.prototype.finishCpr = function () {
    if (this.cprEnded) return
    if (this.cprHolding) this.scoreCpr()
    this.cprHolding = false
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.cprOn = false
    this.famU = 0
    this.helpOpen = false
    this.cprEnded = true
    this.endT = 0
    this.endManU = 0
    this.endTextN = 0
    this.endCardT = -1
    this.endTextHold = 0
    this.playSec = Math.max(1, Math.round(this.clockPlayed || this.level.limit - this.clock))
    this.cprStats.padMoves = this.padMoves || 0
    var reward = this.cprReward()
    this.game.lastAidReward = reward
    this.game.lastAidCpr = reward.stats
    this.game.coins = (this.game.coins || 0) + reward.coins
    this.game.capsules = (this.game.capsules || 0) + reward.pills
    if (reward.coq10) reward.coq10Got = this.game.applyNutrientGain('coq10', reward.coq10)
    if (reward.omega3) reward.omega3Got = this.game.applyNutrientGain('omega3', reward.omega3)
    if (reward.mag) reward.magGot = this.game.applyNutrientGain('mag', reward.mag)
    if (!this.game.timedClear) this.game.timedClear = { cpr: false, aed: false }
    if (this.isCprDrill()) this.game.timedClear.cpr = true
    if (this.isAedDrill()) this.game.timedClear.aed = true
    markPlanDone(this.game, 'sport')
  }

  FirstAidScene.prototype.updateEnd = function (dt) {
    if (!this.cprEnded) return
    this.endT += dt
    var carIn = 0.42
    var shake = 0.56
    var carOut = 0.4
    var manStart = carIn + shake * 0.45
    this.endManU = clamp((this.endT - manStart) / 0.72, 0, 1)
    if (this.endManU >= 0.92) {
      this.endTextN = Math.min(AID_END_TEXT.length, this.endTextN + dt * 15)
    }
    if (this.endTextN >= AID_END_TEXT.length) this.endTextHold += dt
    if ((this.endTextHold || 0) >= 2 && this.endCardT < 0) this.endCardT = 0
    if (this.endCardT >= 0) this.endCardT += dt
  }

  FirstAidScene.prototype.cprShowMeters = function () {
    if (this.cprEnded || (this.headU || 0) > 0.06) return false
    var p = this.cprPhase
    if (this.isOffice() || this.isTimed()) return p === 'count' || p === 'player'
    return p === 'count' || p === 'player' || p === 'famIn' || p === 'famPress'
  }

  FirstAidScene.prototype.cprPlayNeed = function () {
    if (this.isOffice()) {
      if (this.cprRound < 3) return AID_CPR_PLAY1
      return 1e9
    }
    if (this.cprRound <= 0) return AID_CPR_PLAY1
    if (this.cprRound === 1) return AID_CPR_PLAY2
    return 1e9
  }

  FirstAidScene.prototype.updateCpr = function (dt) {
    if (this.cprEnded) return
    if (this.clock <= 0) {
      this.finishCpr()
      return
    }
    if (!(this.cprOn && this.cprBoth())) this.cprT += dt
    if (!this.cprOn) return
    var both = this.cprBoth()
    if (both && !this.cprHolding) {
      this.cprHolding = true
      this.cprRhythmOk = this.cprInGreen()
      this.cprDepth = 0
    }
    if (both && this.cprHolding) {
      this.cprDepth = Math.min(1.2, this.cprDepth + dt / 0.82)
    }
    if (!both && this.cprHolding) {
      this.scoreCpr()
      this.cprHolding = false
      this.cprDepth = 0
      this.cprRhythmOk = false
    }
    if (this.isTimed()) {
      if (this.isCprDrill() && this.cprPhase === 'player' && !this.cprHard) {
        this.cprPlayT += dt
        if (this.cprPlayT >= TIMED_CPR_EASY) {
          if (this.cprHolding) this.scoreCpr()
          this.cprHolding = false
          this.cprDepth = 0
          this.cprHard = true
          this.showToast('困难：跟上节奏并按到绿色深度')
        }
      }
    } else if (this.cprPhase === 'player' && this.cprRound < (this.isOffice() ? 3 : 2)) {
      this.cprPlayT += dt
      if (this.cprPlayT >= this.cprPlayNeed()) {
        if (this.isOffice() && this.cprRound === 1) this.startOfficeReshock()
        else this.startFamily()
      }
    }
  }

  FirstAidScene.prototype.startFamily = function () {
    if (this.cprHolding) this.scoreCpr()
    this.cprHolding = false
    this.cprDepth = 0
    this.touches = {}
    this.handL = false
    this.handR = false
    this.cprOn = false
    this.cprPhase = 'famIn'
    this.talk = AID_TALK_SWAP
    this.talkTyped = 0
    this.bubbleU = 0.15
    if (this.talk) this.sounds.play('dialog')
    this.famU = 0
    this.famPressT = 0
    this.famDip = 0
    this.quiz = null
    this.quizShowOpt = false
    if (this.isOffice() && this.cprRound >= 2) this.setAedLine(AID_AED_NOSHOCK)
  }

  FirstAidScene.prototype.beginQuiz = function () {
    var item = this.isOffice()
      ? (this.cprRound >= 2 ? AID_CPR_QUIZ_OFFICE_NOSHOCK : AID_CPR_QUIZ_OFFICE)
      : AID_CPR_QUIZ_LIST[Math.min(this.cprRound, AID_CPR_QUIZ_LIST.length - 1)]
    this.cprPhase = 'quiz'
    this.quiz = item
    this.quizTyped = 0
    this.quizBar = 0
    this.quizShowOpt = false
    this.quizHit = []
    this.bubbleU = 0
    if (this.sounds) this.sounds.play('dialog')
  }

  FirstAidScene.prototype.answerQuiz = function (ok) {
    if (this.cprPhase !== 'quiz') return
    if (this.sounds) this.sounds.play(ok ? 'chooseRight' : 'chooseWrong')
    if (ok) this.cprStats.quizOk += 1
    else this.cprStats.quizMiss += 1
    this.cprRound += 1
    this.cprPhase = 'famAfter'
    this.famPressT = 0
    this.quizShowOpt = false
    this.quiz = null
  }

  FirstAidScene.prototype.updateFamily = function (dt) {
    if (this.cprEnded || this.cprOn) return
    var phase = this.cprPhase
    if (phase === 'famIn') {
      this.famU = Math.min(1, this.famU + dt / 0.55)
      if (this.famU >= 1 && this.talkTyped >= this.talk.length) {
        this.cprPhase = 'famPress'
        this.famPressT = 0
      }
      return
    }
    if (phase === 'famPress') {
      this.famPressT += dt
      this.famDip = this.cprInGreen() ? 1 : Math.max(0, this.famDip - dt / 0.14)
      if (this.famPressT >= AID_CPR_FAM) this.beginQuiz()
      return
    }
    if (phase === 'quiz' && this.quiz) {
      this.famDip = this.cprInGreen() ? 1 : Math.max(0, this.famDip - dt / 0.14)
      if (this.quizTyped < this.quiz.talk.length) {
        this.quizTyped = Math.min(this.quiz.talk.length, this.quizTyped + dt * 22)
        return
      }
      this.quizShowOpt = true
      this.quizBar = Math.min(AID_CPR_QUIZ, this.quizBar + dt)
      if (this.quizBar >= AID_CPR_QUIZ) this.answerQuiz(false)
      return
    }
    if (phase === 'famAfter') {
      this.famPressT += dt
      this.famDip = this.cprInGreen() ? 1 : Math.max(0, this.famDip - dt / 0.14)
      if (this.famPressT >= AID_CPR_FAM_AFTER) {
        if (this.isOffice() && this.cprRound >= 3) this.endFamilyToPlayer()
        else this.startVent()
      }
      return
    }
    if (phase === 'famOut') {
      this.famU = Math.max(0, this.famU - dt / 0.42)
      this.famDip = 0
      if (this.famU <= 0) this.startVent()
    }
  }

  FirstAidScene.prototype.startVent = function () {
    this.cprPhase = 'breath'
    this.talk = AID_TALK_VENT
    this.talkTyped = 0
    this.bubbleU = 0.15
    if (this.talk) this.sounds.play('dialog')
    this.ventGot = 0
    this.ventT = 0
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.cprOn = false
    this.touches = {}
    this.handL = false
    this.handR = false
  }

  FirstAidScene.prototype.endFamilyToPlayer = function () {
    this.cprPhase = 'player'
    this.cprPlayT = 0
    this.cprOn = true
    this.famU = 0
    this.famDip = 0
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.ventT = 0
    this.touches = {}
    this.handL = false
    this.handR = false
    this.bubbleU = 0
  }

  FirstAidScene.prototype.endVent = function () {
    this.cprPhase = 'player'
    this.cprPlayT = 0
    this.cprOn = true
    this.ventHold = false
    this.ventNeedUp = false
    this.ventPid = null
    this.ventT = 0
    this.touches = {}
    this.handL = false
    this.handR = false
  }

  FirstAidScene.prototype.pressVent = function (x, y, pid) {
    if (this.cprEnded || this.cprPhase !== 'breath' || this.headU < 0.7) return false
    if (this.ventNeedUp) return false
    if (this.ventHold) return true
    var m = this.layout.mouth
    if (!hitCircle(x, y, m.x, m.y, m.r, 18)) return false
    this.ventPid = pid
    this.ventHold = true
    this.ventT = 0
    return true
  }

  FirstAidScene.prototype.moveVent = function (x, y, pid) {
    if (!this.ventHold || (this.ventPid != null && pid !== this.ventPid)) return
    var m = this.layout.mouth
    if (!hitCircle(x, y, m.x, m.y, m.r, 24)) this.releaseVent()
  }

  FirstAidScene.prototype.releaseVent = function () {
    this.ventHold = false
    this.ventPid = null
    this.ventNeedUp = false
    if (this.ventT < AID_CPR_VENT) this.ventT = 0
  }

  FirstAidScene.prototype.updateVent = function (dt) {
    if (this.cprPhase === 'breath') {
      this.headU = Math.min(1, this.headU + dt / 0.48)
      this.famU = Math.max(0, this.famU - dt / 0.32)
      this.famDip = 0
    } else {
      this.headU = Math.max(0, this.headU - dt / 0.48)
    }
    if (this.cprEnded || this.cprPhase !== 'breath') return
    if (this.clock <= 0) {
      this.finishCpr()
      return
    }
    if (this.ventHold && !this.ventNeedUp && this.headU >= 0.7) {
      this.ventT += dt
      if (this.ventT >= AID_CPR_VENT) {
        this.ventGot += 1
        this.cprStats.ventOk += 1
        this.ventT = 0
        this.ventNeedUp = true
      }
    }
    if (this.ventGot >= AID_CPR_VENTS && !this.ventHold) this.endVent()
  }

  FirstAidScene.prototype.addDigit = function (n) {
    if (this.called || this.dial.length >= 3) return
    this.dial += String(n)
  }

  FirstAidScene.prototype.pressDir = function (dir) {
    if (this.moveGot >= this.moveNeed) return
    if (dir !== this.moveDir) {
      this.wrongT = 0.22
      this.clock = Math.max(0, this.clock - 1)
      this.flashClock = 0.5
      this.showToast('方向不对 −1秒')
      return
    }
    this.moveGot += 1
    this.moveAnim = 0
    if (this.moveGot >= this.moveNeed) {
      this.showToast('已移到平坦地面')
    } else {
      this.randDir()
    }
  }

  FirstAidScene.prototype.updateOffice = function (dt) {
    var L = this.layout
    if (this.shirtOpened) this.shirtOpen = Math.min(1, this.shirtOpen + dt / 0.16)
    if (this.officePhase === 'cut') {
      if (this.cutting || (this.cutPts && this.cutPts.length > 1)) this.cutHintU = 1
      else if (this.addrDone && this.zoomU > 0.62 && !this.shirtOpened && this.cutHintU < 1) {
        if (this.cutHintU < 0) this.cutHintU = 0
        this.cutHintU = Math.min(1, this.cutHintU + dt / 1.12)
      }
      return
    }
    this.aedU = Math.min(1, this.aedU + dt / 0.4)
    this.initPads(L)
    if (this.dragPad < 0) this.syncPadOk(L)
    if (this.aedTyped < this.aedLine.length) {
      this.aedTyped = Math.min(this.aedLine.length, this.aedTyped + dt * 22)
      return
    }
    if (this.officePhase === 'pads') {
      if (this.padsBothOk()) {
        this.officePhase = 'analyze'
        this.aedAnalyzeT = 0
        this.setAedLine(AID_AED_ANALYZE)
        this.aedWait = 0
      }
      return
    }
    if (this.officePhase === 'analyze') {
      if (this.dragPad >= 0) {
        this.setAedLine(AID_AED_TOUCH)
        this.officePhase = 'pads'
        this.aedWait = 0
        return
      }
      this.aedAnalyzeT += dt
      if (this.aedAnalyzeT >= (this.isAedDrill() ? TIMED_AED_ANALYZE : 4.8)) {
        this.officePhase = 'shock'
        this.setAedLine(AID_AED_SHOCK)
      }
      return
    }
  }

  FirstAidScene.prototype.update = function (dt) {
    if (!this.isPlayable()) return
    this.introT += dt
    this.taskU = this.fly(0.2, 0.4, this.introT)
    if (this.cprOnly) {
      this.zoomU = 1
      this.taskU = 1
      this.phoneU = 0
      this.medicU = 0
      if (this.isAedDrill()) {
        this.updateOffice(dt)
        if (this.cprPhase === 'count' && !this.cprEnded && this.aedShocked) {
          this.cprCountT += dt
          if (this.cprCountT >= 2.4) {
            this.cprHolding = false
            this.cprDepth = 0
            this.cprT = 0
            this.cprOn = true
            this.cprPhase = 'player'
            this.cprPlayT = 0
          }
        }
      } else if (this.cprPhase === 'count' && !this.cprEnded) {
        this.cprCountT += dt
        if (this.cprCountT >= 2.4) {
          this.cprHolding = false
          this.cprDepth = 0
          this.cprT = 0
          this.cprOn = true
          this.cprPhase = 'player'
          this.cprPlayT = 0
          if (this.isCprDrill()) this.showToast('简易：只看节奏')
        }
      }
      if (this.isTimed()) {
        this.bubbleU = 0
      } else if (this.cprPhase === 'famIn' || this.cprPhase === 'famPress' || this.cprPhase === 'breath') {
        this.bubbleU = Math.min(1, this.bubbleU + dt / 0.28)
      } else {
        this.bubbleU = Math.max(0, this.bubbleU - dt / 0.28)
      }
      if (!this.isTimed() && this.bubbleU >= 0.7 && this.talkTyped < this.talk.length) {
        this.talkTyped = Math.min(this.talk.length, this.talkTyped + dt * 22)
      }
      this.updateCpr(dt)
      if (!this.isTimed()) {
        this.updateFamily(dt)
        this.updateVent(dt)
      }
      this.updateEnd(dt)
      if (this.clockOn && !this.cprEnded) {
        if (!(this.isCprDrill() && this.cprPhase === 'count')) {
          this.clock = Math.max(0, this.clock - dt)
          this.clockPlayed += dt
        }
      }
      if (this.flashClock > 0) this.flashClock -= dt
      if (this.toast) {
        this.toast.t -= dt
        if (this.toast.t <= 0) this.toast = null
      }
      return
    }
    if (!this.called) {
      this.bubbleU = this.fly(0.55, 0.4, this.introT)
    } else if (this.addrDone) {
      this.zoomU = Math.min(1, this.zoomU + dt / 0.48)
      if (this.cprPhase === 'famIn' || this.cprPhase === 'famPress' || this.cprPhase === 'breath') {
        this.bubbleU = Math.min(1, this.bubbleU + dt / 0.28)
      } else if (this.cprOn || this.cprCountT > 0 || this.cprPhase === 'quiz' || this.cprPhase === 'famAfter' || this.cprPhase === 'famOut' || this.cprPhase === 'waitShock') {
        this.bubbleU = Math.max(0, this.bubbleU - dt / 0.28)
      } else {
        this.bubbleU = Math.min(1, this.bubbleU + dt / 0.36)
      }
      this.medicU = Math.max(0, this.medicU - dt / 0.22)
      this.phoneU = Math.max(0, this.phoneU - dt / 0.38)
      if (this.cprPhase === 'count' && !this.cprEnded && this.talkTyped >= this.talk.length && this.zoomU >= 0.92 && (this.isHome() || this.aedShocked)) {
        this.cprCountT += dt
        if (this.cprCountT >= 2.4) {
          this.cprHolding = false
          this.cprDepth = 0
          this.cprT = 0
          this.cprOn = true
          this.cprPhase = 'player'
          this.cprPlayT = 0
        }
      }
    } else {
      this.medicU = Math.min(1, this.medicU + dt / 0.32)
    }
    if (this.bubbleU >= 0.7 && this.talkTyped < this.talk.length) {
      this.talkTyped = Math.min(this.talk.length, this.talkTyped + dt * 22)
    }
    if (!this.called && !this.phoneReady && this.talkTyped >= this.talk.length && this.bubbleU >= 1) {
      this.okU = Math.min(1, this.okU + dt / 0.28)
    }
    if (!this.addrDone && this.phoneReady && this.phoneU < 1) {
      this.phoneU = Math.min(1, this.phoneU + dt / 0.42)
    }
    if (this.addrDone) {
      this.updateCpr(dt)
      if (this.isHome() || this.isOffice()) {
        this.updateFamily(dt)
        this.updateVent(dt)
      }
      if (this.isOffice()) this.updateOffice(dt)
    }
    if (this.cprPhase === 'famIn' || this.cprPhase === 'famPress' || this.cprPhase === 'breath') {
      this.bubbleU = Math.min(1, this.bubbleU + dt / 0.28)
    }
    if (this.phoneU >= 1) this.clockOn = true
    if (this.clockOn && !this.cprEnded) {
      this.clock = Math.max(0, this.clock - dt)
      this.clockPlayed += dt
    }
    this.updateEnd(dt)
    if (this.flashClock > 0) this.flashClock -= dt
    if (this.wrongT > 0) this.wrongT -= dt
    if (this.moveAnim < 1) this.moveAnim = Math.min(1, this.moveAnim + dt / 0.28)
    if (this.toast) {
      this.toast.t -= dt
      if (this.toast.t <= 0) this.toast = null
    }
  }

  FirstAidScene.prototype.drawBg = function (ctx, w, h) {
    ctx.fillStyle = this.isOffice() ? '#9aa7b2' : '#c9a882'
    ctx.fillRect(0, 0, w, h)
    var floor = this.isOffice() ? this.images.aidOfficeBg : this.images.aidFloor
    if (floor) drawCover(ctx, floor, 0, 0, w, h)
  }

  FirstAidScene.prototype.drawMan = function (ctx, L) {
    var man = this.isOffice() ? this.images.aidOfficeMan : this.images.aidOldman
    if (!man) return
    var h = this.view.height
    var pic = cutEdgeBlack(man)
    var shake = this.wrongT > 0 ? Math.sin(this.wrongT * 40) * 7 : 0
    ctx.drawImage(
      pic,
      L.man.x - L.man.w / 2 + shake,
      L.man.y - L.man.h / 2 + (this.endManU || 0) * h * 1.2,
      L.man.w,
      L.man.h
    )
    if (this.isOffice()) this.drawOfficeShirt(ctx, L, shake)
    if (this.isOffice()) this.drawCutHint(ctx, L, h)
  }

  FirstAidScene.prototype.drawOfficeShirt = function (ctx, L, shake) {
    var img = this.images.aidOfficeShirt
    var s = L.shirt
    var h = this.view.height
    var x = s.x + (shake || 0)
    var y = s.y + (this.endManU || 0) * h * 1.2
    var pic = img ? cutEdgeBlack(img) : null
    var u = this.shirtOpen
    var i
    function drawHalf(side, split, alpha) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      if (side < 0) ctx.rect(x - 4 + side * split, y - 4, s.w / 2 + 8, s.h + 8)
      else ctx.rect(x + s.w / 2 + side * split - 4, y - 4, s.w / 2 + 8, s.h + 8)
      ctx.clip()
      if (pic) ctx.drawImage(pic, x + side * split, y, s.w, s.h)
      else {
        ctx.fillStyle = '#d8d8d8'
        ctx.fillRect(x + side * split, y, s.w, s.h)
      }
      ctx.restore()
    }
    if (this.shirtOpened) {
      if (u < 0.99) {
        drawHalf(-1, s.w * (0.08 + u * 0.9), 1 - u)
        drawHalf(1, s.w * (0.08 + u * 0.9), 1 - u)
      }
      return
    }
    if (pic) ctx.drawImage(pic, x, y, s.w, s.h)
    else {
      ctx.fillStyle = '#d8d8d8'
      ctx.fillRect(x, y, s.w, s.h)
    }
    if (this.cutPts.length > 1 && this.officePhase === 'cut') {
      ctx.save()
      ctx.strokeStyle = '#8a8a8a'
      ctx.lineWidth = Math.max(2, h * 0.0048)
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'round'
      ctx.setLineDash([Math.max(5, h * 0.016), Math.max(4, h * 0.011)])
      ctx.beginPath()
      ctx.moveTo(this.cutPts[0].x, this.cutPts[0].y)
      for (i = 1; i < this.cutPts.length; i++) ctx.lineTo(this.cutPts[i].x, this.cutPts[i].y)
      ctx.stroke()
      ctx.restore()
    }
  }

  FirstAidScene.prototype.drawCutHint = function (ctx, L, h) {
    if (!this.isOffice() || this.officePhase !== 'cut' || this.shirtOpened) return
    if (this.cutting || (this.cutPts && this.cutPts.length > 1)) return
    if (this.cutHintU < 0 || this.cutHintU >= 1) return
    var t = this.cutHintU
    var ease = t * t * (3 - 2 * t)
    var x = L.cutFrom.x + (L.cutTo.x - L.cutFrom.x) * ease
    var y = L.cutFrom.y + (L.cutTo.y - L.cutFrom.y) * ease
    var s = h * 0.15
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(0.12)
    ctx.lineWidth = Math.max(2, s * 0.08)
    ctx.strokeStyle = '#3b3b3b'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(-s * 0.06, s * 0.02)
    ctx.lineTo(-s * 0.18, s * 0.58)
    ctx.lineTo(-s * 0.02, s * 0.62)
    ctx.closePath()
    ctx.fillStyle = '#d5d8dc'
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(s * 0.06, s * 0.02)
    ctx.lineTo(s * 0.18, s * 0.58)
    ctx.lineTo(s * 0.02, s * 0.62)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = AID_RED
    ctx.save()
    ctx.translate(-s * 0.22, -s * 0.3)
    ctx.rotate(-0.45)
    ctx.scale(1, 1.25)
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.16, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.save()
    ctx.translate(s * 0.22, -s * 0.3)
    ctx.rotate(0.45)
    ctx.scale(1, 1.25)
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.16, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    ctx.beginPath()
    ctx.moveTo(-s * 0.1, -s * 0.08)
    ctx.lineTo(s * 0.1, s * 0.1)
    ctx.moveTo(s * 0.1, -s * 0.08)
    ctx.lineTo(-s * 0.1, s * 0.1)
    ctx.stroke()
    ctx.restore()
  }

  FirstAidScene.prototype.padDocked = function (p, home) {
    if (!p || !home) return false
    var dx = p.x - home.x
    var dy = p.y - home.y
    return dx * dx + dy * dy < 64
  }

  FirstAidScene.prototype.drawAedPad = function (ctx, p, L, h) {
    fillRoundRect(ctx, p.x - L.padW / 2, p.y - L.padH / 2, L.padW, L.padH, h * 0.012, p.ok ? '#3aa35a' : '#e8ece8')
    ctx.fillStyle = p.ok ? '#ffffff' : AID_INK
    ctx.font = uiFont(aidFont(h, 0.026, 12))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, p.side || 'L', p.x, p.y + 1)
  }

  FirstAidScene.prototype.drawOfficeAed = function (ctx, L, h) {
    if (!this.isOffice() || this.officePhase === 'cut' || this.aedU <= 0.01) return
    var u = this.aedU
    var a = L.aed
    var img = this.images.aidOfficeAed
    var pic = img ? cutEdgeBlack(img) : null
    var i
    var p
    ctx.save()
    ctx.globalAlpha = Math.min(1, u * 1.2)
    ctx.translate(-(1 - u) * (a.w + h * 0.12), 0)
    if (pic) ctx.drawImage(pic, a.x, a.y, a.w, a.h)
    else fillRoundRect(ctx, a.x, a.y, a.w, a.h, h * 0.04, '#e5736a')
    var sc = L.aedScreen
    fillRoundRect(ctx, sc.x, sc.y, sc.w, sc.h, h * 0.012, '#1c2420')
    ctx.save()
    roundRect(ctx, sc.x, sc.y, sc.w, sc.h, h * 0.012)
    ctx.clip()
    ctx.fillStyle = '#b7f0c8'
    var screenFont = aidFont(h, 0.032, 14)
    ctx.font = uiFont(screenFont)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    var screenPad = Math.max(3, h * 0.008)
    var shown = wrapText(ctx, (this.aedLine || '').slice(0, Math.floor(this.aedTyped)), sc.w - screenPad * 2)
    var lineH = (sc.h - screenPad * 2) / 4
    for (i = 0; i < Math.min(shown.length, 4); i++) {
      ctx.fillText(shown[i], sc.x + screenPad, sc.y + screenPad + i * lineH)
    }
    ctx.restore()
    var sh = L.shock
    var pulse = this.officePhase === 'shock' ? 1 + Math.sin(nowSec() * 7) * 0.12 : 1
    ctx.beginPath()
    ctx.arc(sh.x, sh.y, sh.r * pulse, 0, Math.PI * 2)
    ctx.fillStyle = this.officePhase === 'shock' ? AID_RED : '#8a8a8a'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(aidFont(h, 0.022, 11))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '电击', sh.x, sh.y + 1)
    if (this.padsInited) {
      for (i = 0; i < this.pads.length; i++) {
        p = this.pads[i]
        if (this.padDocked(p, L.padHome[i])) this.drawAedPad(ctx, p, L, h)
      }
    }
    ctx.restore()
    if (!this.padsInited) return
    for (i = 0; i < this.pads.length; i++) {
      p = this.pads[i]
      if (!this.padDocked(p, L.padHome[i])) this.drawAedPad(ctx, p, L, h)
    }
  }

  FirstAidScene.prototype.drawPadZones = function (ctx, L, h) {
    if (!this.isAedDrill()) return
    if (this.officePhase !== 'pads' && this.officePhase !== 'analyze') return
    if (!this.shirtOpened) return
    var pulse = 0.5 + 0.5 * Math.sin(nowSec() * 5.4)
    var alpha = 0.18 + 0.42 * pulse
    var scale = 0.92 + 0.1 * pulse
    var pw = L.padW * 1.12
    var ph = L.padH * 1.12
    var r = h * 0.014
    var zones = [
      { zone: L.zoneA, pad: this.pads[0] },
      { zone: L.zoneB, pad: this.pads[1] }
    ]
    var i
    var item
    var z
    ctx.save()
    for (i = 0; i < zones.length; i++) {
      item = zones[i]
      if (item.pad && item.pad.ok) continue
      z = item.zone
      ctx.globalAlpha = alpha
      ctx.save()
      ctx.translate(z.x, z.y)
      ctx.scale(scale, scale)
      fillRoundRect(ctx, -pw / 2, -ph / 2, pw, ph, r, '#ffffff')
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = Math.max(2, h * 0.006)
      roundRect(ctx, -pw / 2, -ph / 2, pw, ph, r)
      ctx.stroke()
      ctx.restore()
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawPadHud = function (ctx, w, h, L) {
    if (!this.isOffice() || (this.officePhase !== 'pads' && this.officePhase !== 'analyze')) return
    if (!this.padsInited) return
    var ok = this.padOkCount()
    var boxW = h * 0.46
    var boxH = h * 0.255
    var x = w - boxW - h * 0.03
    if (L.clock) x = Math.min(x, L.clock.x + L.clock.w - boxW)
    var y = (L.clock ? L.clock.y + L.clock.h : h * 0.12) + h * 0.02
    fillRoundRect(ctx, x, y, boxW, boxH, h * 0.02, 'rgba(40,40,40,0.78)')
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(aidFont(h, 0.028, 12))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '贴对 ' + ok + '/2', x + boxW / 2, y + h * 0.036)
    fillFatText(ctx, '移动 ' + (this.padMoves || 0) + '次', x + boxW / 2, y + h * 0.076)
    ctx.fillStyle = 'rgba(255,255,255,0.86)'
    var notes = ['放下电极片后', '变绿则代表位置贴对', '前2次移动不扣钱']
    var maxW = boxW - h * 0.05
    var ni
    var px
    for (ni = 0; ni < notes.length; ni++) {
      px = aidFont(h, 0.022, 10)
      ctx.font = uiFont(px)
      while (px > 8 && ctx.measureText(notes[ni]).width > maxW) {
        px -= 1
        ctx.font = uiFont(px)
      }
      ctx.fillText(notes[ni], x + boxW / 2, y + h * 0.118 + ni * h * 0.038)
    }
  }

  FirstAidScene.prototype.drawNodes = function (ctx, L, h) {
    if (this.taskU <= 0.2) return
    var n = L.nodes
    var step = (this.cprOn || this.cprCountT > 0 || this.aedShocked) ? 3 : this.addrDone ? 2 : this.called ? 1 : 0
    var i
    ctx.save()
    ctx.globalAlpha = this.taskU
    ctx.strokeStyle = 'rgba(255,255,255,0.95)'
    ctx.lineWidth = Math.max(3, h * 0.005)
    ctx.beginPath()
    ctx.moveTo(n.x, n.y)
    ctx.lineTo(n.x + n.gap * 3, n.y)
    ctx.stroke()
    for (i = 0; i < 4; i++) {
      var cx = n.x + n.gap * i
      ctx.beginPath()
      ctx.arc(cx, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = i <= step ? '#ffffff' : 'rgba(40,40,40,0.35)'
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = Math.max(2.5, h * 0.004)
      ctx.stroke()
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawClock = function (ctx, L, h) {
    if (!this.clockOn) return
    var c = L.clock
    var flash = this.flashClock > 0
    fillRoundRect(ctx, c.x, c.y, c.w, c.h, c.h / 2, flash ? '#c43a32' : AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(c.h * 0.5))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '剩余 ' + Math.ceil(this.clock) + 's', c.x + c.w / 2, c.y + c.h / 2 + 1)
  }

  FirstAidScene.prototype.drawBubble = function (ctx, L, w, h) {
    if ((this.called && !this.addrDone) || this.bubbleU <= 0.01) return
    var box = this.syncOk(L, h)
    var u = this.bubbleU
    var x = box.x + (1 - u) * (box.w + h * 0.18)
    ctx.font = uiFont(box.fontPx || aidFont(h, 0.03, 13))
    var shown = wrapText(ctx, this.talk.slice(0, Math.floor(this.talkTyped)), box.maxW)
    ctx.save()
    ctx.globalAlpha = Math.min(1, u * 1.2)
    fillRoundRect(ctx, x, box.y, box.w, box.h, h * 0.026, 'rgba(255,255,255,0.95)')
    ctx.fillStyle = AID_INK
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var i
    for (i = 0; i < shown.length; i++) {
      fillFatText(ctx, shown[i], x + box.pad, box.y + box.pad + box.lineH * (i + 0.45))
    }
    if (this.talkTyped < this.talk.length && Math.floor(nowSec() * 2) % 2 === 0) {
      var last = shown[shown.length - 1] || ''
      var cx = x + box.pad + (last ? ctx.measureText(last).width + 4 : 0)
      var cy = box.y + box.pad + box.lineH * (Math.max(shown.length, 1) - 0.55)
      ctx.fillRect(cx, cy - box.lineH * 0.32, 2, box.lineH * 0.64)
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawOk = function (ctx, L, h) {
    if (this.phoneReady || this.okU <= 0.01) return
    this.syncOk(L, h)
    var b = L.ok
    var pulse = 1 + Math.sin(nowSec() * 4.8) * 0.16
    var s = pulse * (0.84 + 0.16 * this.okU)
    ctx.save()
    ctx.globalAlpha = Math.min(1, this.okU * 1.2)
    ctx.translate(b.x, b.y)
    ctx.scale(s, s)
    fillRoundRect(ctx, -b.w / 2, -b.h / 2, b.w, b.h, b.h / 2, this.pressed === 'ok' ? '#c43a32' : AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(b.h * 0.5))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, 'OK', 0, 1)
    ctx.restore()
  }

  FirstAidScene.prototype.drawHud = function (ctx, w, h, L) {
    if (!this.cprOnly) this.drawNodes(ctx, L, h)
    this.drawClock(ctx, L, h)
  }

  FirstAidScene.prototype.drawPhone = function (ctx, L, h) {
    if (this.phoneU <= 0.01) return
    var p = L.phone
    var u = this.phoneU
    ctx.save()
    ctx.globalAlpha = Math.min(1, u * 1.15)
    ctx.translate(-(1 - u) * (p.w + h * 0.16), 0)
    var img = this.images.aidPhone
    if (img) ctx.drawImage(img, p.x, p.y, p.w, p.h)
    else fillRoundRect(ctx, p.x, p.y, p.w, p.h, p.w * 0.18, '#3d8fd4')
    ctx.fillStyle = this.called ? '#2f7d4a' : AID_INK
    ctx.font = uiFont(aidFont(h, 0.046, 16))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (this.phonePhase === 'addr' || this.phonePhase === 'done') {
      this.drawAddr(ctx, L, h)
      ctx.restore()
      return
    }
    fillFatText(ctx, this.dial || '', p.x + p.w / 2, L.dialY)
    function drawKey(x, y, r, fill) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = fill
      ctx.fill()
    }
    var i
    for (i = 0; i < L.keys.length; i++) {
      var k = L.keys[i]
      drawKey(k.x, k.y, k.r, this.pressed === 'key:' + k.id ? '#3a7fb8' : '#4d9de0')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(k.r * 0.92))
      fillFatText(ctx, k.id, k.x, k.y + 1)
    }
    drawKey(L.del.x, L.del.y, L.del.r, this.pressed === 'del' ? '#c43a32' : '#ef4a4a')
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = Math.max(2.5, L.del.r * 0.16)
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(L.del.x - L.del.r * 0.32, L.del.y - L.del.r * 0.32)
    ctx.lineTo(L.del.x + L.del.r * 0.32, L.del.y + L.del.r * 0.32)
    ctx.moveTo(L.del.x + L.del.r * 0.32, L.del.y - L.del.r * 0.32)
    ctx.lineTo(L.del.x - L.del.r * 0.32, L.del.y + L.del.r * 0.32)
    ctx.stroke()
    drawKey(L.call.x, L.call.y, L.call.r, this.pressed === 'call' ? '#278a4e' : '#2f9e5a')
    var tel = this.images.aidTelIcon
    var iconS = L.call.r * 1.28
    if (tel) drawContain(ctx, cutEdgeBlack(tel), L.call.x, L.call.y, iconS, iconS)
    else {
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(L.call.r * 0.62))
      fillFatText(ctx, '拨', L.call.x, L.call.y + 1)
    }
    if (this.pressed) {
      var hit = null
      if (this.pressed.indexOf('key:') === 0) {
        for (i = 0; i < L.keys.length; i++) {
          if ('key:' + L.keys[i].id === this.pressed) hit = L.keys[i]
        }
      } else if (this.pressed === 'del') hit = L.del
      else if (this.pressed === 'call') hit = L.call
      if (hit) {
        ctx.beginPath()
        ctx.arc(hit.x, hit.y, hit.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,0,0,0.16)'
        ctx.fill()
      }
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawAddrChip = function (ctx, chip, kind, h) {
    var down = this.pressed === kind + ':' + chip.id
    var fill
    var ink
    if (kind === 'picked') {
      fill = down ? '#c43a32' : AID_RED
      ink = '#ffffff'
    } else {
      fill = down ? '#d8eaf8' : '#eaf4fb'
      ink = AID_INK
    }
    fillRoundRect(ctx, chip.x, chip.y, chip.w, chip.h, chip.h / 2, fill)
    if (kind === 'pool') {
      ctx.strokeStyle = '#7eb7e0'
      ctx.lineWidth = Math.max(2, h * 0.003)
      roundRect(ctx, chip.x, chip.y, chip.w, chip.h, chip.h / 2)
      ctx.stroke()
    }
    ctx.fillStyle = ink
    ctx.font = uiFont(Math.round(chip.h * 0.52))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var label = chip.label || chip.text
    fillFatText(ctx, label, chip.x + chip.w / 2, chip.y + chip.h / 2 + 1)
  }

  FirstAidScene.prototype.drawAddr = function (ctx, L, h) {
    var p = L.phone
    var i
    ctx.fillStyle = 'rgba(43,43,43,0.55)'
    ctx.font = uiFont(aidFont(h, 0.028, 13))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '多选正确的地址并告诉医护人员', p.x + p.w / 2, p.y + p.h * 0.168)
    for (i = 0; i < L.addrPicked.length; i++) {
      this.drawAddrChip(ctx, L.addrPicked[i], 'picked', h)
    }
    if (!this.addrDone) {
      for (i = 0; i < L.addrPool.length; i++) {
        this.drawAddrChip(ctx, L.addrPool[i], 'pool', h)
      }
    }
    var s = L.addrSend
    if (!s) return
    var down = this.pressed === 'addrSend'
    if (!this.addrDone) {
      fillRoundRect(ctx, s.x, s.y, s.w, s.h, s.h / 2, down ? '#278a4e' : '#2f9e5a')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(s.h * 0.5))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      fillFatText(ctx, '确认', s.x + s.w / 2, s.y + s.h / 2 + 1)
    } else {
      fillRoundRect(ctx, s.x, s.y, s.w, s.h, s.h / 2, '#2f7d4a')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(s.h * 0.5))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      fillFatText(ctx, '已确认', s.x + s.w / 2, s.y + s.h / 2 + 1)
    }
  }

  FirstAidScene.prototype.drawMedic = function (ctx, L, h) {
    if (!this.called || this.medicU <= 0.01) return
    var b = L.medic
    var u = this.medicU
    var pad = h * 0.018
    ctx.save()
    ctx.globalAlpha = Math.min(1, u * 1.2)
    ctx.font = uiFont(aidFont(h, 0.03, 13))
    var maxW = b.w - pad * 2
    var lines = wrapText(ctx, this.medicTalk || AID_MEDIC, maxW)
    var lineH = Math.max(Math.round(aidFont(h, 0.03, 13) * 1.55), aidFont(h, 0.048, 18))
    var bh = lineH * lines.length + pad * 1.7
    var x = b.x + (1 - u) * h * 0.12
    fillRoundRect(ctx, x, b.y, b.w, bh, h * 0.024, '#3d9be8')
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var i
    for (i = 0; i < lines.length; i++) {
      fillFatText(ctx, lines[i], x + pad, b.y + pad + lineH * (i + 0.45))
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawMove = function (ctx, L, w, h) {
    if (this.dpadU <= 0.01 || this.moveGot >= this.moveNeed) return
    var u = this.dpadU
    ctx.save()
    ctx.globalAlpha = Math.min(1, u * 1.2)
    ctx.translate((1 - u) * w * 0.22, 0)
    var d
    for (d = 0; d < AID_DIRS.length; d++) {
      var id = AID_DIRS[d]
      var b = L.dirs[id]
      var pulse = this.moveDir === id ? 1 + Math.sin(nowSec() * 8) * 0.07 : 1
      drawPadArrow(ctx, b.x, b.y, id, this.moveDir === id, b.r * pulse)
    }
    ctx.restore()
  }

  FirstAidScene.prototype.drawCprHand = function (ctx, x, y, r, img, pressed, flip) {
    ctx.save()
    ctx.translate(x, y + (pressed ? r * 0.14 : 0))
    if (flip) ctx.scale(-1, 1)
    var size = r * 2.35
    if (img) drawContain(ctx, cutEdgeBlack(img), 0, 0, size, size)
    else {
      ctx.fillStyle = pressed ? '#e4a57c' : '#f2c4a4'
      ctx.beginPath()
      ctx.ellipse(0, 0, r * 0.7, r * 0.96, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(90,48,32,0.28)'
      ctx.lineWidth = Math.max(2, r * 0.08)
      ctx.stroke()
    }
    ctx.restore()
  }

  FirstAidScene.prototype.cprShowPress = function () {
    if (this.cprEnded) return false
    if (this.cprPhase !== 'count' && this.cprPhase !== 'player') return false
    if (this.zoomU < 0.25 && this.cprCountT <= 0 && !this.cprOn) return false
    return true
  }

  FirstAidScene.prototype.drawCprPress = function (ctx, L, w, h) {
    if (!this.cprShowPress()) return
    var green = this.cprInGreen()
    var hold = this.cprOn && this.cprHolding
    var btn = L.chest
    var count = this.cprCountNum()
    var wave = hold ? 0.4 : 1
    var i
    for (i = 0; i < 3; i++) {
      var u = (nowSec() * 0.75 + i / 3) % 1
      ctx.beginPath()
      ctx.arc(btn.x, btn.y, btn.r * (1 + u * 0.62 * wave), 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.5 * (1 - u) * wave) + ')'
      ctx.lineWidth = Math.max(3, h * 0.008) * (1 - u)
      ctx.stroke()
    }
    var beat = 1 + Math.sin(nowSec() * 3.4) * (hold ? 0.02 : 0.07)
    var br = btn.r * beat * (hold ? 0.94 : 1)
    ctx.beginPath()
    ctx.arc(btn.x, btn.y, br, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (count > 0) {
      var phase = this.cprCountT % 0.8
      var pop = 1 + (1 - phase / 0.8) * 0.28
      ctx.save()
      ctx.translate(btn.x, btn.y)
      ctx.scale(pop, pop)
      ctx.fillStyle = AID_INK
      ctx.font = uiFont(Math.round(br * 0.72))
      fillFatText(ctx, String(count), 0, 4)
      ctx.restore()
    } else if (this.cprPhase === 'player' || this.cprPhase === 'count') {
      ctx.fillStyle = hold ? '#8a8a8a' : '#b8b8b8'
      ctx.font = uiFont(Math.round(br * 0.26))
      fillFatText(ctx, cprPressLabel(this.game), btn.x, btn.y + 1)
    }
  }

  FirstAidScene.prototype.drawCpr = function (ctx, L, w, h, skipPress) {
    if (this.cprEnded) {
      this.drawEnd(ctx, L, w, h)
      return
    }
    if (this.zoomU < 0.25 && this.cprCountT <= 0 && !this.cprOn && this.famU <= 0) return
    var green = this.cprInGreen()
    var hold = this.cprOn && this.cprHolding
    if (!skipPress) this.drawCprPress(ctx, L, w, h)
    this.drawFamilyHands(ctx, L, w, h)
    if (this.cprShowMeters()) {
      this.drawCprMeters(ctx, L, w, h, green && (hold || this.famU > 0.5), hold)
    }
    this.drawCprVent(ctx, L, w, h)
    this.drawCprQuiz(ctx, L, w, h)
  }

  FirstAidScene.prototype.drawFamilyHands = function (ctx, L, w, h) {
    if (this.famU <= 0.01) return
    var btn = L.chest
    var ease = this.famU * this.famU * (3 - 2 * this.famU)
    var dip = this.famDip * h * 0.028
    var img = this.images.aidHandF
    if (img) {
      var dw = h * 0.8
      var dh = dw * ((img.height || 1) / (img.width || 1))
      var destY = btn.y - dh * 0.2
      var y = h + (destY - h) * ease + dip
      ctx.save()
      ctx.globalAlpha = Math.min(1, this.famU * 1.15)
      ctx.drawImage(img, btn.x - dw / 2, y, dw, dh)
      ctx.restore()
      return
    }
    var destY = btn.y + h * 0.06
    var y = h * 1.15 + (destY - h * 1.15) * ease + dip
    var gap = h * 0.07
    this.drawBeigeHand(ctx, btn.x - gap, y, h * 0.11, 1)
    this.drawBeigeHand(ctx, btn.x + gap, y, h * 0.11, -1)
  }

  FirstAidScene.prototype.drawBeigeHand = function (ctx, x, y, s, dir) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(dir, 1)
    ctx.fillStyle = '#c4b194'
    roundRect(ctx, -s * 0.42, -s * 0.15, s * 0.84, s * 2.4, s * 0.28)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(0, -s * 0.05, s * 0.5, s * 0.58, 0, 0, Math.PI * 2)
    ctx.fill()
    var i
    for (i = 0; i < 4; i++) {
      ctx.beginPath()
      ctx.ellipse(-s * 0.34 + i * s * 0.23, -s * 0.72, s * 0.14, s * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.strokeStyle = 'rgba(90,70,50,0.18)'
    ctx.lineWidth = Math.max(2, s * 0.04)
    ctx.beginPath()
    ctx.moveTo(-s * 0.18, s * 0.2)
    ctx.quadraticCurveTo(0, s * 0.45, s * 0.12, s * 0.22)
    ctx.stroke()
    ctx.restore()
  }

  FirstAidScene.prototype.drawCprVent = function (ctx, L, w, h) {
    if (this.cprPhase !== 'breath' || this.cprEnded) return
    var m = L.mouth
    var ringR = m.r * 1.42
    var ringW = Math.max(10, h * 0.016)
    var t = 0
    if (this.ventNeedUp) t = 1
    else if (this.ventHold) t = clamp(this.ventT / AID_CPR_VENT, 0, 1)
    var ang = -Math.PI / 2 + t * Math.PI * 2
    var i
    var wave = this.ventHold ? 0.35 : 1
    for (i = 0; i < 3; i++) {
      var u = (nowSec() * 0.75 + i / 3) % 1
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.r * (1 + u * 0.5 * wave), 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.46 * (1 - u) * wave) + ')'
      ctx.lineWidth = Math.max(3, h * 0.007) * (1 - u)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(m.x, m.y, m.r * (this.ventHold ? 0.92 : 1), 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(m.x, m.y, ringR, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.88)'
    ctx.lineWidth = ringW
    ctx.stroke()
    if (t > 0.002) {
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(m.x, m.y, ringR, -Math.PI / 2, ang, false)
      ctx.strokeStyle = t >= 1 ? '#17b0b8' : AID_CPR_TEAL
      ctx.lineWidth = ringW + 2
      ctx.stroke()
    }
    var bx = m.x + Math.cos(ang) * ringR
    var by = m.y + Math.sin(ang) * ringR
    ctx.beginPath()
    ctx.arc(bx, by, h * 0.016, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.strokeStyle = t > 0.02 ? AID_CPR_TEAL : 'rgba(80,80,80,0.25)'
    ctx.lineWidth = Math.max(2, h * 0.003)
    ctx.stroke()
    ctx.fillStyle = this.ventHold ? '#8a8a8a' : '#b8b8b8'
    ctx.font = uiFont(Math.round(m.r * 0.3))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '单手长按', m.x, m.y - m.r * 0.16)
    fillFatText(ctx, '口部', m.x, m.y + m.r * 0.22)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(aidFont(h, 0.028, 13))
    fillFatText(ctx, '人工呼吸 ' + this.ventGot + '/' + AID_CPR_VENTS, m.x, m.y + ringR + h * 0.042)
  }

  FirstAidScene.prototype.drawCprQuiz = function (ctx, L, w, h) {
    if (this.cprPhase !== 'quiz' || !this.quiz) {
      this.quizHit = []
      return
    }
    var boxW = Math.min(w * 0.46, h * 0.86)
    var x = w - boxW - h * 0.035
    var y = h * 0.16
    var pad = h * 0.028
    var quizFont = aidFont(h, 0.032, 14)
    ctx.font = uiFont(quizFont)
    var shown = wrapText(ctx, this.quiz.talk.slice(0, Math.floor(this.quizTyped)), boxW - pad * 2)
    var lineH = Math.max(Math.round(quizFont * 1.5), aidFont(h, 0.05, 20))
    var textH = lineH * Math.max(shown.length, 1) + pad * 1.8
    var optH = h * 0.088
    var optGap = h * 0.032
    var barH = h * 0.014
    var optsH = this.quizShowOpt ? this.quiz.opts.length * (optH + optGap) + barH + pad : 0
    var bh = textH + optsH + pad
    fillRoundRect(ctx, x, y, boxW, bh, h * 0.024, 'rgba(255,255,255,0.96)')
    ctx.fillStyle = AID_INK
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var i
    for (i = 0; i < shown.length; i++) {
      fillFatText(ctx, shown[i], x + pad, y + pad + lineH * (i + 0.45))
    }
    this.quizHit = []
    if (!this.quizShowOpt) return
    var oy = y + textH
    for (i = 0; i < this.quiz.opts.length; i++) {
      var ox = x + pad
      var ow = boxW - pad * 2
      var down = this.pressed === 'quiz:' + i
      fillRoundRect(ctx, ox, oy, ow, optH, optH / 2, down ? '#c43a32' : AID_RED)
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.font = uiFont(aidFont(h, 0.03, 13))
      fillFatText(ctx, this.quiz.opts[i].text, ox + ow / 2, oy + optH / 2 + 1)
      this.quizHit.push({ x: ox, y: oy, w: ow, h: optH })
      oy += optH + optGap
    }
    var left = 1 - this.quizBar / AID_CPR_QUIZ
    fillRoundRect(ctx, x + pad, oy + h * 0.006, boxW - pad * 2, barH, barH / 2, 'rgba(43,43,43,0.12)')
    fillRoundRect(ctx, x + pad, oy + h * 0.006, (boxW - pad * 2) * left, barH, barH / 2, AID_RED)
  }

  FirstAidScene.prototype.drawCprMeters = function (ctx, L, w, h, green, hold) {
    var p = L.pend
    if (this.cprOn && !this.cprEnded && this.cprNeedDepth()) {
      var clock = L.clock
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(aidFont(h, 0.026, 12))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      fillFatText(ctx, '完美按压 ' + this.cprStats.perfect, clock.x + clock.w / 2, clock.y + clock.h + h * 0.04)
    }
    var ang = (this.cprOn || this.famU > 0.01 || this.cprPhase === 'famPress' || this.cprPhase === 'quiz') ? this.cprAngle() : 0
    var ringW = Math.max(10, h * 0.018)
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.88)'
    ctx.lineWidth = ringW
    ctx.stroke()
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, Math.PI * 0.5 - 0.55, Math.PI * 0.5 + 0.55)
    ctx.strokeStyle = green ? '#17b0b8' : AID_CPR_TEAL
    ctx.lineWidth = ringW + 3
    ctx.stroke()
    var bx = p.x + Math.sin(ang) * p.r
    var by = p.y + Math.cos(ang) * p.r
    ctx.beginPath()
    ctx.arc(bx, by, h * 0.016, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.strokeStyle = green ? AID_CPR_TEAL : 'rgba(80,80,80,0.25)'
    ctx.lineWidth = Math.max(2, h * 0.003)
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(aidFont(h, 0.026, 12))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (!this.cprNeedDepth() && this.cprOn) {
      fillFatText(ctx, '完美按压 ' + this.cprStats.perfect, p.x, p.y - p.r - h * 0.038)
    }
    ctx.font = uiFont(aidFont(h, 0.028, 13))
    fillFatText(ctx, '节奏', p.x, p.y + p.r + h * 0.042)
    if (!this.cprNeedDepth()) return

    var d = L.depth
    var trackH = d.h
    var trackY = d.y - trackH / 2
    ctx.save()
    roundRect(ctx, d.x, trackY, d.w, trackH, trackH / 2)
    ctx.clip()
    ctx.fillStyle = 'rgba(255,255,255,0.88)'
    ctx.fill()
    ctx.fillStyle = AID_CPR_ORANGE
    ctx.fillRect(d.x + d.w * 0.56, trackY, d.w * 0.2, trackH)
    ctx.restore()
    var t = clamp(hold ? this.cprDepth : 0, 0, 1)
    var knobX = d.x + d.w * (0.08 + 0.84 * t)
    var knobW = Math.max(16, h * 0.028)
    var knobH = trackH * 1.38
    fillRoundRect(ctx, knobX - knobW / 2, d.y - knobH / 2, knobW, knobH, knobW / 2, '#ffffff')
    ctx.fillStyle = '#ffffff'
    fillFatText(ctx, '深度', d.x + d.w / 2, d.y + trackH * 0.5 + h * 0.038)
  }

  FirstAidScene.prototype.drawEnd = function (ctx, L, w, h) {
    this.drawEndCar(ctx, w, h)
    if (this.endTextN > 0 && this.endCardT < 0) {
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(aidFont(h, 0.04, 16))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(AID_END_TEXT.slice(0, Math.floor(this.endTextN)), w / 2, h * 0.48)
    }
    if (this.endCardT >= 0) this.drawCprResult(ctx, w, h)
  }

  FirstAidScene.prototype.drawEndCar = function (ctx, w, h) {
    var t = this.endT
    var carIn = 0.42
    var shakeT = 0.56
    var carOut = 0.4
    var u = 0
    var shake = 0
    if (t < carIn) u = t / carIn
    else if (t < carIn + shakeT) {
      u = 1
      shake = Math.sin(((t - carIn) / 0.28) * Math.PI * 2) * h * 0.012
    } else if (t < carIn + shakeT + carOut) u = 1 - (t - carIn - shakeT) / carOut
    else return
    var ease = u * u * (3 - 2 * u)
    var img = this.images.aidCar
    var iw = h * 0.13
    var ih = img && img.width ? iw * (img.height / img.width) : iw * 0.62
    var x = -iw + (h * 0.055 + iw) * ease + shake
    var y = h * 0.78
    ctx.save()
    if (img) ctx.drawImage(img, x, y, iw, ih)
    else {
      fillRoundRect(ctx, x, y, iw, ih, 8, '#ffffff')
      ctx.fillStyle = AID_RED
      fillFatText(ctx, '+', x + iw / 2, y + ih / 2)
    }
    ctx.restore()
  }

  FirstAidScene.prototype.showNutrientResult = function () {
    var r = this.game.lastAidReward
    if (r && (r.coq10 || r.omega3 || r.mag || r.coq10Got || r.omega3Got || r.magGot)) return true
    return this.isTimed() || levelHasNutrientRewards(this.level)
  }

  FirstAidScene.prototype.endCardBox = function (w, h) {
    var extra = this.showNutrientResult() ? h * 0.09 : 0
    var pw = Math.min(w * 0.62, h * 1.08)
    var ph = h * 0.48 + extra
    var py = h * 0.155 - extra * 0.35
    return { pw: pw, ph: ph, px: (w - pw) / 2, py: py }
  }

  FirstAidScene.prototype.drawCprResult = function (ctx, w, h) {
    var reward = this.game.lastAidReward || this.cprReward()
    var stats = reward.stats || this.cprStats
    var score = reward.score != null ? reward.score : 0
    var play = reward.playSec != null ? reward.playSec : (this.playSec || Math.round(this.level.limit))
    var tiles = [
      { img: this.images.aidIconPerfect, num: String(stats.perfect || 0), lab: '完美按压' },
      { img: this.images.aidIconTime, num: String(play), lab: '参与时长' },
      { img: this.images.aidIconHeart, num: String(reward.coins || 0), lab: '获心跳币' },
      { img: this.images.aidIconPill, num: String(reward.pills || 0), lab: '获营养丸' }
    ]
    var pop = this.endCardT < 0 ? 1 : 1 - Math.exp(-7 * this.endCardT) * Math.cos(this.endCardT * 15) * 0.22
    var box = this.endCardBox(w, h)
    var pw = box.pw
    var ph = box.ph
    var px = box.px
    var py = box.py
    ctx.save()
    ctx.translate(w / 2, h / 2)
    ctx.scale(pop, pop)
    ctx.translate(-w / 2, -h / 2)
    fillRoundRect(ctx, px, py, pw, ph, h * 0.036, '#ffffff')
    ctx.fillStyle = AID_INK
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = uiFont(aidFont(h, 0.034, 15))
    ctx.fillText('急救评分', w / 2, py + h * 0.062)
    var main = score.toFixed(1)
    var sub = '/5.0'
    ctx.font = uiFont(aidFont(h, 0.078, 28))
    var mw = ctx.measureText(main).width
    ctx.font = uiFont(aidFont(h, 0.036, 15))
    var sw = ctx.measureText(sub).width
    var sx = w / 2 - (mw + sw + 6) / 2
    ctx.fillStyle = AID_SCORE_GOLD
    ctx.font = uiFont(aidFont(h, 0.078, 28))
    ctx.textAlign = 'left'
    ctx.fillText(main, sx, py + h * 0.148)
    ctx.fillStyle = AID_INK
    ctx.font = uiFont(aidFont(h, 0.036, 15))
    ctx.fillText(sub, sx + mw + 6, py + h * 0.155)
    var tile = h * 0.138
    var gap = (pw - h * 0.08 - tile * 4) / 3
    var tx0 = px + h * 0.04
    var ty = py + h * 0.255
    var i
    for (i = 0; i < tiles.length; i++) {
      var x = tx0 + i * (tile + gap)
      fillRoundRect(ctx, x, ty, tile, tile, h * 0.016, AID_SCORE_TILE)
      if (tiles[i].img) {
        drawContain(ctx, tiles[i].img, x + tile / 2, ty - tile * 0.04, tile * 0.72, tile * 0.72)
      }
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(aidFont(h, 0.044, 16))
      ctx.textAlign = 'center'
      ctx.fillText(tiles[i].num, x + tile / 2, ty + tile * 0.64)
      ctx.fillStyle = AID_INK
      ctx.font = uiFont(aidFont(h, 0.026, 12))
      ctx.fillText(tiles[i].lab, x + tile / 2, ty + tile + h * 0.036)
    }
    if (this.showNutrientResult()) {
      var nuts = [
        { img: this.images.iconCoq10, num: formatNutrientAmt(reward.coq10Got || reward.coq10 || 0), lab: '辅酶Q10' },
        { img: this.images.iconOmega3, num: formatNutrientAmt(reward.omega3Got || reward.omega3 || 0), lab: 'Omega-3' },
        { img: this.images.iconMagnesium, num: formatNutrientAmt(reward.magGot || reward.mag || 0), lab: '镁元素' }
      ]
      var nutW = tile * 0.92
      var nutGap = (pw - h * 0.1 - nutW * 3) / 2
      var nx0 = px + (pw - (nutW * 3 + nutGap * 2)) / 2
      var ny = ty + tile + h * 0.062
      var ni
      for (ni = 0; ni < nuts.length; ni++) {
        var nx = nx0 + ni * (nutW + nutGap)
        fillRoundRect(ctx, nx, ny, nutW, h * 0.062, h * 0.014, '#FFF4D6')
        if (nuts[ni].img) {
          drawContain(ctx, nuts[ni].img, nx + h * 0.028, ny + h * 0.031, h * 0.04, h * 0.04)
        }
        ctx.fillStyle = AID_INK
        ctx.font = uiFont(aidFont(h, 0.022, 11))
        ctx.textAlign = 'left'
        ctx.fillText(nuts[ni].lab + ' +' + nuts[ni].num, nx + h * 0.052, ny + h * 0.033)
      }
    }
    ctx.restore()
    this.drawEndExit(ctx, w, h)
  }

  FirstAidScene.prototype.endExitBtn = function (w, h) {
    var box = this.endCardBox(w, h)
    var pw = box.pw
    var ph = box.ph
    var py = box.py
    return {
      x: w / 2,
      y: py + ph + h * 0.07,
      w: Math.min(h * 0.34, w * 0.22),
      h: h * 0.088
    }
  }

  FirstAidScene.prototype.drawEndExit = function (ctx, w, h) {
    if (this.endCardT < 0) return
    var b = this.endExitBtn(w, h)
    var u = Math.min(1, Math.max(0, this.endCardT - 0.12) / 0.18)
    if (u <= 0) return
    var scale = (this.pressed === 'exit' ? 0.96 : 1) * (0.92 + 0.08 * u)
    ctx.save()
    ctx.globalAlpha = u
    ctx.translate(b.x, b.y)
    ctx.scale(scale, scale)
    fillRoundRect(ctx, -b.w / 2, -b.h / 2, b.w, b.h, b.h / 2, this.pressed === 'exit' ? '#c43a32' : AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(b.h * 0.46))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '退出', 0, 1)
    ctx.restore()
  }

  FirstAidScene.prototype.drawHint = function (ctx, L, h) {
    var b = L.hint
    var down = this.pressed === 'help'
    ctx.save()
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fillStyle = down ? '#e0b40a' : '#f5c518'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(b.r * 1.45))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '?', b.x, b.y + b.r * 0.06)
    ctx.restore()
  }

  FirstAidScene.prototype.drawHelp = function (ctx, w, h, L) {
    if (!this.helpOpen || this.cprEnded) return
    ctx.fillStyle = 'rgba(20,16,14,0.46)'
    ctx.fillRect(0, 0, w, h)
    var p = L.help
    var pw = p.w
    var ph = h * 0.36
    var px = p.x - pw / 2
    var py = p.y - ph / 2
    fillRoundRect(ctx, px, py, pw, ph, h * 0.03, 'rgba(255,255,255,0.97)')
    ctx.strokeStyle = AID_RED
    ctx.lineWidth = Math.max(4, h * 0.006)
    roundRect(ctx, px, py, pw, ph, h * 0.03)
    ctx.stroke()
    ctx.fillStyle = AID_RED
    ctx.font = uiFont(aidFont(h, 0.038, 16))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, '当前任务', p.x, py + h * 0.055)
    ctx.fillStyle = AID_INK
    ctx.font = uiFont(aidFont(h, 0.034, 15))
    ctx.textAlign = 'left'
    var tasks = this.officeTasks()
    var tx = px + h * 0.05
    fillFatText(ctx, tasks[0], tx, py + h * 0.115)
    fillFatText(ctx, tasks[1], tx, py + h * 0.165)
    fillFatText(ctx, tasks[2], tx, py + h * 0.215)
    ctx.fillStyle = 'rgba(43,43,43,0.5)'
    ctx.font = uiFont(aidFont(h, 0.024, 12))
    ctx.textAlign = 'center'
    fillFatText(ctx, '点击空白处关闭', p.x, py + ph - h * 0.04)
  }

  FirstAidScene.prototype.draw = function () {
    this.layout = this.computeLayout()
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    this.drawBg(ctx, w, h)
    if (!this.isPlayable()) {
      ctx.fillStyle = AID_INK
      ctx.font = uiFont(aidFont(h, 0.046, 16))
      ctx.textAlign = 'center'
      fillFatText(ctx, this.level.name, w / 2, h * 0.48)
      ctx.font = uiFont(aidFont(h, 0.032, 14))
      ctx.fillStyle = 'rgba(43,43,43,0.65)'
      fillFatText(ctx, '暂未开放，敬请期待哦', w / 2, h * 0.56)
      this.back.draw(ctx)
      return
    }
    this.drawMan(ctx, L)
    this.drawPadZones(ctx, this.layout || L, h)
    var officeAed = this.isOffice() && this.aedU > 0.2 && this.officePhase !== 'cut'
    if (this.isHome() || this.aedShocked || this.cprOn || this.cprEnded || this.cprCountT > 0) {
      this.drawCpr(ctx, L, w, h, officeAed)
    }
    if (!this.cprEnded && !this.isTimed() && (this.cprPhase === 'famIn' || this.cprPhase === 'famPress' || this.cprPhase === 'breath' || (!this.cprOnly && !(this.isOffice() && this.addrDone && this.officePhase !== 'cut')))) {
      this.drawBubble(ctx, L, w, h)
    }
    if (!this.cprEnded) {
      if (!this.cprOnly) {
        this.drawOk(ctx, L, h)
        this.drawPhone(ctx, L, h)
        this.drawMedic(ctx, L, h)
      }
      if (!this.cprOnly || this.isAedDrill()) this.drawOfficeAed(ctx, L, h)
    }
    if (!this.cprEnded) {
      this.drawHud(ctx, w, h, L)
      this.drawPadHud(ctx, w, h, L)
      this.drawHint(ctx, L, h)
    }
    if (officeAed && (this.aedShocked || this.cprOn || this.cprCountT > 0) && !this.cprEnded) {
      this.drawCprPress(ctx, L, w, h)
    }
    if (this.toast && !this.cprEnded) {
      var ty = this.zoomU > 0.4 ? h * 0.12 : h * 0.84
      ctx.globalAlpha = Math.min(1, this.toast.t * 1.4)
      fillRoundRect(ctx, w / 2 - h * 0.4, ty, h * 0.8, h * 0.08, 14, 'rgba(40,40,40,0.84)')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(aidFont(h, 0.03, 13))
      ctx.textAlign = 'center'
      fillFatText(ctx, this.toast.text, w / 2, ty + h * 0.04)
      ctx.globalAlpha = 1
    }
    this.back.draw(ctx)
    this.drawHelp(ctx, w, h, L)
  }

  FirstAidScene.prototype.onDown = function (x, y, pid) {
    pid = pid == null ? 0 : pid
    var id = this.hit(x, y)
    if (id === 'back' || id === 'help' || id === 'helpClose' || id === 'exit' || id === 'aedShock') {
      this.back.pressed = id === 'back'
      this.pressed = id
      return
    }
    if (id && id.indexOf('quiz:') === 0) {
      this.pressed = id
      return
    }
    if (!id && this.isOffice() && this.officePhase === 'cut' && this.addrDone && this.zoomU > 0.7) {
      var sh = this.layout.shirt
      if (hitBox(x, y, sh.x, sh.y, sh.w, sh.h, 12)) {
        this.cutting = true
        this.cutPts = [{ x: x, y: y }]
        this.pressed = 'cut'
        return
      }
    }
    if (this.isOffice() && this.aedU > 0.6 && (this.officePhase === 'pads' || this.officePhase === 'analyze')) {
      var pad = this.hitPad(x, y, this.layout)
      if (pad >= 0) {
        this.dragPad = pad
        this.padDragFrom = { x: this.pads[pad].x, y: this.pads[pad].y }
        this.padDragWasOk = !!this.pads[pad].ok
        this.pads[pad].ok = false
        this.pressed = 'pad'
        return
      }
    }
    if (this.cprPhase === 'breath' && this.pressVent(x, y, pid)) return
    if (this.cprOn && this.cprPhase === 'player' && this.pressCpr(x, y, pid)) return
    this.back.pressed = false
    this.pressed = id
  }

  FirstAidScene.prototype.onMove = function (x, y, pid) {
    pid = pid == null ? 0 : pid
    if (this.cutting) {
      this.cutPts.push({ x: x, y: y })
      return
    }
    if (this.dragPad >= 0 && this.pads[this.dragPad]) {
      this.pads[this.dragPad].x = x
      this.pads[this.dragPad].y = y
      return
    }
    if (this.cprPhase === 'breath') {
      this.moveVent(x, y, pid)
      return
    }
    if (!this.cprOn) return
    this.moveCpr(x, y, pid)
  }

  FirstAidScene.prototype.onUp = function (x, y, pid) {
    pid = pid == null ? 0 : pid
    if (this.cutting) {
      this.cutting = false
      this.finishCut(this.layout)
      this.back.pressed = false
      this.pressed = null
      return
    }
    if (this.dragPad >= 0) {
      var from = this.padDragFrom
      var dx = from ? x - from.x : 0
      var dy = from ? y - from.y : 0
      if (from && dx * dx + dy * dy > this.view.height * 0.012 * this.view.height * 0.012) {
        this.padMoves += 1
        this.cprStats.padMoves = this.padMoves
      }
      this.syncPadOk(this.layout)
      if (!this.padDragWasOk && this.pads[this.dragPad] && this.pads[this.dragPad].ok && this.sounds) {
        this.sounds.play('chooseRight')
      }
      this.dragPad = -1
      this.padDragFrom = null
      this.padDragWasOk = false
      this.back.pressed = false
      this.pressed = null
      return
    }
    if (this.ventHold && (this.ventPid == null || pid === this.ventPid)) {
      this.releaseVent()
      this.back.pressed = false
      this.pressed = null
      return
    }
    if (this.touches[pid]) {
      this.releaseCpr(pid)
      this.back.pressed = false
      this.pressed = null
      return
    }
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.sounds.unlock()
    if (id === 'back') {
      this.sounds.play('tap')
      this.game.aidCprOnly = false
      if (!this.isTimed()) this.game.timedId = null
      this.game.go(this.leaveTo())
      return
    }
    if (id === 'exit') {
      this.sounds.play('tap')
      this.game.aidCprOnly = false
      if (!this.isTimed()) this.game.timedId = null
      this.game.go(this.isTimed() ? 'timed' : 'play')
      return
    }
    if (!this.isPlayable()) return
    if (id.indexOf('quiz:') === 0) {
      var qi = parseInt(id.slice(5), 10)
      var opt = this.quiz && this.quiz.opts[qi]
      this.answerQuiz(!!(opt && opt.ok))
      return
    }
    this.sounds.play('tap')
    if (id === 'ok') {
      this.phoneReady = true
      this.okU = 0
      this.showToast(this.isOffice() ? '从同事手中接过电话，拨打120' : '从家属手中接过电话，拨打120')
      return
    }
    if (id === 'aedShock') {
      if (this.officePhase !== 'shock') return
      if (this.aedShockCount >= 1) this.resumeOfficeCpr()
      else this.startOfficeCpr()
      return
    }
    if (id === 'help') {
      this.helpOpen = true
      return
    }
    if (id === 'helpClose') {
      this.helpOpen = false
      return
    }
    if (id.indexOf('key:') === 0) {
      this.addDigit(id.slice(4))
      return
    }
    if (id === 'del') {
      if (!this.called) this.dial = this.dial.slice(0, -1)
      return
    }
    if (id === 'call') {
      if (this.dial === '120') this.connect120()
      else this.showToast('请先拨对 120，再点接通')
      return
    }
    if (id.indexOf('pool:') === 0) {
      this.pickAddr(id.slice(5))
      return
    }
    if (id.indexOf('picked:') === 0) {
      this.dropAddr(id.slice(7))
      return
    }
    if (id === 'addrSend') {
      this.sendAddr()
      return
    }
  }

  var KEEPER_POSE = {
    eyeL: { x: -206.2, y: 28.2, rx: 48, ry: 17.5 },
    eyeR: { x: -61.9, y: 26.4, rx: 50, ry: 18.5 },
    pupilL: { x: -206.5, y: 32 },
    pupilR: { x: -62, y: 31 },
    hipL: { x: -78, y: 298 },
    hipR: { x: 92, y: 300 },
    boaL: { x: -218, y: 262, rot: 0.58 },
    boaR: { x: 158, y: 248, rot: -0.48 }
  }
  var KEEPER_LEG_H = 351
  var KEEPER_LEFT = 470
  var KEEPER_RIGHT = 490
  var BUY_GAP_X = (151 + 410) / 2 / 640 - 0.5

  function KeeperActor(images) {
    this.images = images
    this.idleTime = 0
    this.showFootT = 0
    this.showFootDur = SHOW_FOOT_DUR
    this.bobY = 0
  }

  KeeperActor.prototype.startKick = function () {
    this.showFootT = 0
  }

  KeeperActor.prototype.update = function (dt) {
    this.idleTime += dt
    this.bobY = Math.sin(this.idleTime * 1.55) * 2.4
    if (this.showFootT < this.showFootDur) this.showFootT += dt
  }

  KeeperActor.prototype.legLift = function () {
    if (this.showFootT >= this.showFootDur) return 0
    var t = clamp(this.showFootT / this.showFootDur, 0, 1)
    if (t < 0.34) return easeOutCubic(t / 0.34)
    if (t < 0.5) return 1
    return 1 - easeInCubic((t - 0.5) / 0.5)
  }

  KeeperActor.prototype.drawPupils = function (ctx, img, look) {
    var pL = img.keepPupilL
    var pR = img.keepPupilR
    if (!pL && !pR) return
    ctx.save()
    ctx.beginPath()
    var eL = KEEPER_POSE.eyeL
    var eR = KEEPER_POSE.eyeR
    addEllipse(ctx, eL.x, eL.y, eL.rx, eL.ry)
    addEllipse(ctx, eR.x, eR.y, eR.rx, eR.ry)
    ctx.clip()
    if (pL) {
      ctx.drawImage(
        pL,
        KEEPER_POSE.pupilL.x + look.x * 0.7 - pL.width / 2,
        KEEPER_POSE.pupilL.y + look.y - pL.height / 2
      )
    }
    if (pR) {
      ctx.drawImage(
        pR,
        KEEPER_POSE.pupilR.x + look.x * 0.7 - pR.width / 2,
        KEEPER_POSE.pupilR.y + look.y - pR.height / 2
      )
    }
    ctx.restore()
  }

  KeeperActor.prototype.drawLeg = function (ctx, img, x, y, rot, flip) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -73, -4, img.width, img.height)
    ctx.restore()
  }

  KeeperActor.prototype.draw = function (ctx, x, y, scale) {
    var img = this.images
    if (!img.keepBody) return
    var look = idleLook(this.idleTime)
    var lift = this.legLift()
    ctx.save()
    ctx.translate(x, y + this.bobY * scale)
    ctx.scale(scale, scale)

    this.drawLeg(ctx, img.keepLegL, KEEPER_POSE.hipL.x, KEEPER_POSE.hipL.y, REST_POSE.legL.rot - 0.82 * lift, false)
    this.drawLeg(ctx, img.keepLegL, KEEPER_POSE.hipR.x, KEEPER_POSE.hipR.y, REST_POSE.legR.rot + 0.04, true)

    var bw = img.keepBody.width
    var bh = img.keepBody.height
    ctx.drawImage(img.keepBody, -bw / 2, -bh / 2)

    this.drawPupils(ctx, img, look)

    this.drawBoa(ctx, img.keepArmL, KEEPER_POSE.boaL)
    this.drawBoa(ctx, img.keepArmR, KEEPER_POSE.boaR)
    ctx.restore()
  }

  KeeperActor.prototype.drawBoa = function (ctx, img, pose) {
    if (!img) return
    ctx.save()
    ctx.translate(pose.x, pose.y)
    ctx.rotate(pose.rot || 0)
    ctx.drawImage(img, -img.width / 2, -img.height / 2)
    ctx.restore()
  }

  var MANAGER_POSE = {
    eyeL: { x: -236.7, y: 21.3, rx: 50, ry: 18 },
    eyeR: { x: -78.2, y: 21.8, rx: 50, ry: 18 },
    pupilL: { x: -236.7, y: 28 },
    pupilR: { x: -78.2, y: 28 },
    hipL: { x: -96, y: 328 },
    hipR: { x: 94, y: 328 },
    armL: { x: -270, y: 163 },
    armR: { x: 214, y: 168 }
  }

  function ManagerActor(images) {
    this.images = images
    this.idleTime = 0
    this.showFootT = 0
    this.showFootDur = 0.88
    this.bobY = 0
  }

  ManagerActor.prototype.startKick = function () {
    this.showFootT = 0
  }

  ManagerActor.prototype.update = function (dt) {
    this.idleTime += dt
    this.bobY = Math.sin(this.idleTime * 1.4) * 2.2
    if (this.showFootT < this.showFootDur) this.showFootT += dt
  }

  ManagerActor.prototype.wave = function () {
    var idle = Math.sin(this.idleTime * 1.15) * 0.05
    if (this.showFootT >= this.showFootDur) return idle
    var t = clamp(this.showFootT / this.showFootDur, 0, 1)
    var lift = t < 0.38 ? easeOutCubic(t / 0.38) : 1 - easeInCubic((t - 0.38) / 0.62)
    return idle + 0.55 * lift
  }

  ManagerActor.prototype.legLift = function () {
    if (this.showFootT >= this.showFootDur) return 0
    var t = clamp(this.showFootT / this.showFootDur, 0, 1)
    if (t < 0.34) return easeOutCubic(t / 0.34)
    if (t < 0.5) return 1
    return 1 - easeInCubic((t - 0.5) / 0.5)
  }

  ManagerActor.prototype.drawPupils = function (ctx, img, look) {
    var pL = img.mgrPupilL
    var pR = img.mgrPupilR
    if (!pL && !pR) return
    ctx.save()
    ctx.beginPath()
    var eL = MANAGER_POSE.eyeL
    var eR = MANAGER_POSE.eyeR
    addEllipse(ctx, eL.x, eL.y, eL.rx, eL.ry)
    addEllipse(ctx, eR.x, eR.y, eR.rx, eR.ry)
    ctx.clip()
    if (pL) {
      ctx.drawImage(
        pL,
        MANAGER_POSE.pupilL.x + look.x * 0.7 - pL.width / 2,
        MANAGER_POSE.pupilL.y + look.y - pL.height / 2
      )
    }
    if (pR) {
      ctx.drawImage(
        pR,
        MANAGER_POSE.pupilR.x + look.x * 0.7 - pR.width / 2,
        MANAGER_POSE.pupilR.y + look.y - pR.height / 2
      )
    }
    ctx.restore()
  }

  ManagerActor.prototype.drawLeg = function (ctx, img, x, y, rot, flip) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -58, -6)
    ctx.restore()
  }

  ManagerActor.prototype.drawArm = function (ctx, img, x, y, rot, flip) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -img.width / 2, -8)
    ctx.restore()
  }

  ManagerActor.prototype.draw = function (ctx, x, y, scale) {
    var img = this.images
    if (!img.mgrBody) return
    var look = idleLook(this.idleTime)
    var wave = this.wave()
    var lift = this.legLift()
    ctx.save()
    ctx.translate(x, y + this.bobY * scale)
    ctx.scale(scale, scale)

    this.drawLeg(ctx, img.mgrLegL, MANAGER_POSE.hipL.x, MANAGER_POSE.hipL.y, REST_POSE.legL.rot - 0.55 * lift, false)
    this.drawLeg(ctx, img.mgrLegL, MANAGER_POSE.hipR.x, MANAGER_POSE.hipR.y, REST_POSE.legR.rot + 0.04, true)

    var bw = img.mgrBody.width
    var bh = img.mgrBody.height
    ctx.drawImage(img.mgrBody, -bw / 2, -bh / 2)

    this.drawPupils(ctx, img, look)

    this.drawArm(ctx, img.mgrArmR, MANAGER_POSE.armL.x, MANAGER_POSE.armL.y, -wave, true)
    this.drawArm(ctx, img.mgrArmR, MANAGER_POSE.armR.x, MANAGER_POSE.armR.y, wave * 0.9, false)
    ctx.restore()
  }

  function wardrobeItem(id) {
    return storeItem(WARDROBE_ITEMS, id)
  }

  function storeItem(list, id) {
    var i
    for (i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i]
    }
    return null
  }

  function StoreScene(game, spec) {
    spec = spec || WARDROBE_SPEC
    this.spec = spec
    this.theme = spec.theme
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    if (!game[spec.ownedKey]) game[spec.ownedKey] = {}
    if (!game[spec.favKey]) game[spec.favKey] = {}
    if (!game.equipped) game.equipped = { clothes: '', glasses: '', shoes: '' }
    this.owned = game[spec.ownedKey]
    this.favs = game[spec.favKey]
    this.cat = spec.defaultCat
    this.tab = 'all'
    this.favOnly = false
    this.selected = spec.defaultItem
    this.pressed = null
    this.toast = null
    this.keeper = spec.actor === 'manager' ? new ManagerActor(game.images) : new KeeperActor(game.images)
    this.keeper.startKick()
    this.talkTyped = 0
    if (this.sounds) this.sounds.play('dialog')
    var bg = this.images[spec.bg] || this.images.bgEmpty || this.images.bg
    this.fit = containRect(bg.width, bg.height, this.view.width, this.view.height)
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.layout = this.computeLayout()
  }

  StoreScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var inset = hubInsets(this.view)
    var backR = h * 0.042
    this.back.r = backR
    var leftSafe = h * 0.008
    if (isWx && typeof wx.getSystemInfoSync === 'function') {
      try {
        var info = wx.getSystemInfoSync()
        var ww = info.windowWidth || w
        if (info.safeArea) {
          leftSafe = Math.min(info.safeArea.left * (w / ww) * 0.28, h * 0.018)
        }
      } catch (err) {}
    }
    this.back.x = leftSafe + backR
    var topPad = Math.max(h * 0.055, inset.t * 0.5)
    var panelY = topPad
    this.back.y = panelY + backR
    var panelX = this.back.x + backR + h * 0.018
    var panelH = h * 0.88
    var al = this.spec.actorLayout
    var scale = h * al.scale
    var keeperLeftLocal = al.left
    var titleY = panelY + h * 0.072
    var catR = h * 0.05
    var catPadX = h * 0.042
    var catPointer = h * 0.036
    var catX = panelX + catPadX + catR
    var catTop = titleY + h * 0.10
    var catGap = h * 0.15
    var cats = []
    var i
    for (i = 0; i < this.spec.cats.length; i++) {
      cats.push({
        id: this.spec.cats[i].id,
        icon: this.spec.cats[i].icon,
        x: catX,
        y: catTop + i * catGap,
        r: catR
      })
    }
    var midX = catX + catR + catPointer + h * 0.018
    var midY = panelY + h * 0.032
    var midH = panelH - h * 0.064
    var tabInset = h * 0.02
    var tabH = h * 0.055
    var tabGap = h * 0.01
    var tabY = titleY + h * 0.042
    var slotCols = 4
    var slotRows = 2
    var slotN = slotCols * slotRows
    var slotPad = h * 0.022
    var slotGap = h * 0.016
    var detailPad = h * 0.042
    var favItemR = h * 0.044
    var rightEdge = w - Math.max(h * 0.008, inset.r * 0.2)
    var keeperX = rightEdge - al.right * scale
    var keeperGap = h * 0.04
    var panelRight = keeperX - keeperLeftLocal * scale - keeperGap
    var keeperLeft = keeperX - keeperLeftLocal * scale
    if (panelRight + keeperGap > keeperLeft) {
      keeperX = Math.min(panelRight + keeperGap + keeperLeftLocal * scale, rightEdge - 400 * scale)
      keeperLeft = keeperX - keeperLeftLocal * scale
      if (panelRight + keeperGap > keeperLeft) panelRight = keeperLeft - keeperGap
    }
    var panelW = panelRight - panelX
    keeperX = Math.min(keeperX + h * 0.032, rightEdge - (al.right - 50) * scale)
    var restW = panelRight - (catX + catR + catPointer + catPadX) - h * 0.022
    var midW = restW * 0.60 + (catPadX - h * 0.018)
    var tabW = Math.min(h * 0.118, (midW - tabInset * 2 - tabGap * 3 - h * 0.03) / 4)
    var slotW = (midW - slotPad * 2 - slotGap * (slotCols - 1)) / slotCols
    var slotY = tabY + tabH + h * 0.02
    var slots = []
    for (i = 0; i < slotN; i++) {
      slots.push({
        x: midX + slotPad + (i % slotCols) * (slotW + slotGap),
        y: slotY + Math.floor(i / slotCols) * (slotW + slotGap),
        w: slotW,
        h: slotW
      })
    }
    var detailX = midX + midW + h * 0.018
    var detailY = midY
    var detailH = midH
    var detailW = panelRight - detailX - h * 0.022
    var buyW = Math.min(detailW - detailPad * 2, h * 0.56)
    var buyH = buyW * (132 / 640)
    var footLocal = al.foot
    var keeperY = panelY + panelH - footLocal * scale - h * 0.01
    var coinH = h * 0.056
    var coinW = h * 0.22
    var titleSize = Math.round(h * 0.04)
    var nameY = detailY + detailH * 0.44
    var prevH = detailH * 0.32
    var picCy = detailY + detailH * 0.20
    var picBoxH = prevH
    var picBoxW = Math.min(detailW - detailPad * 2, prevH * 1.18)
    if (picBoxW < h * 0.16) picBoxW = Math.max(h * 0.16, detailW - detailPad * 2)
    var picCx = detailX + detailW / 2
    var picW = picBoxW
    var picH = picBoxH
    var curItem = this.selectedItem()
    var pic = curItem ? this.images[curItem.icon] : null
    if (pic && pic.width && pic.height) {
      var picS = Math.min(picBoxW / pic.width, picBoxH / pic.height)
      picW = pic.width * picS
      picH = pic.height * picS
    }
    var buyX = detailX + detailW / 2
    var buyY = detailY + detailH - buyH / 2 - h * 0.018
    var equip = null
    if (this.spec.canEquip && curItem && this.owned[curItem.id]) {
      equip = {
        x: buyX,
        y: buyY - buyH - h * 0.014,
        w: buyW,
        h: buyH
      }
    }
    var favItemX = buyX + buyW / 2 - favItemR
    var favItemY = picCy + picH / 2 - favItemR * 0.4
    var bubbleW = Math.min(h * 0.48, w * 0.26)
    var bubbleH = h * 0.145
    var bubbleX = keeperX - h * 0.04
    if (bubbleX - bubbleW / 2 < panelRight + h * 0.01) bubbleX = panelRight + h * 0.01 + bubbleW / 2
    if (bubbleX + bubbleW / 2 > w - h * 0.012) bubbleX = w - h * 0.012 - bubbleW / 2
    return {
      panel: { x: panelX, y: panelY, w: panelW, h: panelH },
      titleY: titleY,
      titleSize: titleSize,
      cats: cats,
      mid: { x: midX, y: midY, w: midW, h: midH },
      coin: {
        x: midX + midW - coinW - h * 0.018,
        y: titleY - coinH / 2,
        w: coinW,
        h: coinH
      },
      tabAll: { x: midX + tabInset, y: tabY, w: tabW, h: tabH },
      tabOwned: { x: midX + tabInset + tabW + tabGap, y: tabY, w: tabW, h: tabH },
      tabUnowned: { x: midX + tabInset + (tabW + tabGap) * 2, y: tabY, w: tabW, h: tabH },
      favBtn: { x: midX + midW - tabInset - tabW, y: tabY, w: tabW, h: tabH },
      slots: slots,
      detail: { x: detailX, y: detailY, w: detailW, h: detailH, pad: detailPad, nameY: nameY },
      preview: { x: picCx, y: picCy, w: picBoxW, h: picBoxH },
      favItem: { x: favItemX, y: favItemY, r: favItemR },
      buy: { x: buyX, y: buyY, w: buyW, h: buyH },
      equip: equip,
      keeperX: keeperX,
      keeperY: keeperY,
      keeperScale: scale,
      bubble: {
        x: bubbleX,
        y: Math.max(h * 0.11, keeperY - 410 * scale - h * 0.08),
        w: bubbleW,
        h: bubbleH
      }
    }
  }

  StoreScene.prototype.visibleItems = function () {
    var self = this
    return this.spec.items.filter(function (it) {
      if (isStorePlaceholder(it) || !storeItemPic(self.images, it)) return false
      if (it.cat !== self.cat) return false
      if (self.tab === 'owned' && !self.owned[it.id]) return false
      if (self.tab === 'unowned' && self.owned[it.id]) return false
      if (self.favOnly && !self.favs[it.id]) return false
      return true
    })
  }

  StoreScene.prototype.selectedItem = function () {
    var it = storeItem(this.spec.items, this.selected)
    if (it && it.cat === this.cat) {
      if (this.tab === 'owned' && !this.owned[it.id]) it = null
      if (this.tab === 'unowned' && this.owned[it.id]) it = null
      if (this.favOnly && !this.favs[it.id]) it = null
    } else it = null
    if (it) return it
    var list = this.visibleItems()
    return list[0] || null
  }

  StoreScene.prototype.hit = function (x, y) {
    var L = this.layout
    var h = this.view.height
    var i
    if (this.back.hit(x, y)) return 'back'
    for (i = 0; i < L.cats.length; i++) {
      if (hitCircle(x, y, L.cats[i].x, L.cats[i].y, L.cats[i].r, 6)) return 'cat:' + L.cats[i].id
    }
    if (hitRect(x, y, L.tabAll.x + L.tabAll.w / 2, L.tabAll.y + L.tabAll.h / 2, L.tabAll.w, L.tabAll.h, 4)) return 'tab:all'
    if (hitRect(x, y, L.tabOwned.x + L.tabOwned.w / 2, L.tabOwned.y + L.tabOwned.h / 2, L.tabOwned.w, L.tabOwned.h, 4)) return 'tab:owned'
    if (hitRect(x, y, L.tabUnowned.x + L.tabUnowned.w / 2, L.tabUnowned.y + L.tabUnowned.h / 2, L.tabUnowned.w, L.tabUnowned.h, 4)) return 'tab:unowned'
    if (hitRect(x, y, L.favBtn.x + L.favBtn.w / 2, L.favBtn.y + L.favBtn.h / 2, L.favBtn.w, L.favBtn.h, 4)) return 'favFilter'
    var list = this.visibleItems()
    for (i = 0; i < L.slots.length; i++) {
      var s = L.slots[i]
      if (hitBox(x, y, s.x, s.y, s.w, s.h, 2) && list[i]) return 'item:' + list[i].id
    }
    var cur = this.selectedItem()
    if (cur && hitCircle(x, y, L.favItem.x, L.favItem.y, L.favItem.r, 6)) {
      return 'favItem'
    }
    if (cur && L.equip && hitRect(x, y, L.equip.x, L.equip.y, L.equip.w, L.equip.h, 4)) return 'equip'
    if (cur && hitRect(x, y, L.buy.x, L.buy.y, L.buy.w, L.buy.h, 4)) return 'buy'
    if (hitRect(x, y, L.bubble.x, L.bubble.y, L.bubble.w, L.bubble.h, 6)) return 'keeper'
    if (hitCircle(x, y, L.keeperX, L.keeperY + h * 0.02, 310 * L.keeperScale, 12)) return 'keeper'
    return null
  }

  function hScale(scene, n) {
    return scene.view.height * n
  }

  StoreScene.prototype.update = function (dt) {
    this.keeper.update(dt)
    this.talkTyped = Math.min(this.spec.talk.length, this.talkTyped + dt * TYPE_CPS)
    if (this.toast) {
      this.toast.t += dt
      if (this.toast.t >= this.toast.dur) this.toast = null
    }
  }

  StoreScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 0, dur: 1.6 }
    if (isWx && typeof wx.showToast === 'function') {
      wx.showToast({ title: text, icon: 'none', duration: 1600 })
    }
  }

  StoreScene.prototype.draw = function () {
    this.layout = this.computeLayout()
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var imgs = this.images
    var lw = Math.max(2, h * 0.0028)
    var catMeta = this.spec.cats.filter(function (c) { return c.id === this.cat }.bind(this))[0]
    var catTitle = catMeta ? catMeta.title : this.spec.cats[0].title
    var titleSize = L.titleSize || Math.round(h * 0.04)
    var theme = this.theme

    ctx.fillStyle = '#e8f3f3'
    ctx.fillRect(0, 0, w, h)
    var bg = imgs[this.spec.bg] || imgs.bgEmpty || imgs.bg
    if (bg) drawCover(ctx, bg, 0, 0, w, h)

    fillRoundRect(ctx, L.panel.x, L.panel.y, L.panel.w, L.panel.h, h * 0.038, STORE_WHITE)

    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(titleSize)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.spec.sideTitle || '分类', L.cats[0].x, L.titleY)

    var i
    for (i = 0; i < L.cats.length; i++) {
      this.drawCat(ctx, L.cats[i], imgs[L.cats[i].icon], this.cat === L.cats[i].id, this.pressed === 'cat:' + L.cats[i].id, lw)
    }

    fillRoundRect(ctx, L.mid.x, L.mid.y, L.mid.w, L.mid.h, h * 0.028, theme.fill)
    ctx.fillStyle = theme.accent
    ctx.font = uiFont(titleSize)
    ctx.textAlign = 'left'
    ctx.fillText(catTitle, L.mid.x + h * 0.028, L.titleY)
    this.drawBalance(ctx, L.coin)

    this.drawTab(ctx, L.tabAll, '全部', this.tab === 'all', lw)
    this.drawTab(ctx, L.tabOwned, '已购买', this.tab === 'owned', lw)
    this.drawTab(ctx, L.tabUnowned, '未购买', this.tab === 'unowned', lw)
    this.drawTab(ctx, L.favBtn, '收藏', this.favOnly, lw)

    var list = this.visibleItems()
    var selected = this.selectedItem()
    for (i = 0; i < L.slots.length; i++) {
      this.drawSlot(ctx, L.slots[i], list[i], selected && list[i] && list[i].id === selected.id, lw)
    }

    this.drawDetail(ctx, L, selected, lw)
    this.keeper.draw(ctx, L.keeperX, L.keeperY, L.keeperScale)
    this.drawBubble(ctx, L.bubble)
    this.back.draw(ctx)
    this.drawToast(ctx)
  }

  StoreScene.prototype.drawCat = function (ctx, cat, icon, on, pressed, lw) {
    var s = pressed ? 0.94 : 1
    ctx.save()
    ctx.translate(cat.x, cat.y)
    ctx.scale(s, s)
    ctx.beginPath()
    ctx.arc(0, 0, cat.r, 0, Math.PI * 2)
    if (on) {
      ctx.fillStyle = this.theme.accent
      ctx.fill()
    } else {
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.strokeStyle = this.theme.accent
      ctx.lineWidth = Math.max(1, lw + 0.8 - 1)
      ctx.stroke()
    }
    if (icon) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(0, 0, cat.r, 0, Math.PI * 2)
      ctx.clip()
      drawContain(ctx, icon, 0, 0, cat.r * 1.28, cat.r * 1.28)
      ctx.restore()
    }
    if (on) {
      ctx.fillStyle = this.theme.accent
      ctx.beginPath()
      ctx.moveTo(cat.r + 2, 0)
      ctx.lineTo(cat.r + hScale(this, 0.034), -hScale(this, 0.024))
      ctx.lineTo(cat.r + hScale(this, 0.034), hScale(this, 0.024))
      ctx.closePath()
      ctx.fill()
    }
    ctx.restore()
  }

  StoreScene.prototype.drawBalance = function (ctx, box) {
    if (!box) return
    fillRoundRect(ctx, box.x, box.y, box.w, box.h, box.h / 2, 'rgba(255,255,255,0.94)')
    var icon = this.images.iconCoin
    if (icon) drawContain(ctx, icon, box.x + box.h * 0.52, box.y + box.h / 2, box.h * 0.78, box.h * 0.78)
    var label = String(this.game.coins == null ? 0 : this.game.coins)
    var tx = box.x + box.w - box.h * 0.28
    var ty = box.y + box.h / 2 + 1
    ctx.fillStyle = '#d4544a'
    ctx.font = uiFont(Math.round(box.h * 0.56))
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, tx, ty)
    ctx.fillText(label, tx + 0.7, ty)
  }

  StoreScene.prototype.drawTab = function (ctx, tab, label, on, lw) {
    var accent = this.theme.accent
    ctx.save()
    roundRect(ctx, tab.x, tab.y, tab.w, tab.h, tab.h / 2)
    if (on) {
      ctx.fillStyle = accent
      ctx.fill()
      ctx.fillStyle = '#ffffff'
    } else {
      ctx.strokeStyle = accent
      ctx.lineWidth = Math.max(1, lw - 1)
      ctx.stroke()
      ctx.fillStyle = accent
    }
    ctx.font = uiFont(Math.max(10, Math.round(tab.h * 0.60) - 1))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, tab.x + tab.w / 2, tab.y + tab.h / 2 + 1)
    ctx.restore()
  }

  StoreScene.prototype.drawSlot = function (ctx, slot, item, on, lw) {
    if (!item) return
    ctx.save()
    var r = Math.min(18, slot.w * 0.18)
    if (on) storePanel(ctx, slot.x, slot.y, slot.w, slot.h, r, Math.max(1, lw + 1.6 - 1), STORE_WHITE, this.theme.accent)
    else fillRoundRect(ctx, slot.x, slot.y, slot.w, slot.h, r, STORE_WHITE)
    if (item) {
      var pic = storeItemPic(this.images, item)
      if (pic) drawContain(ctx, pic, slot.x + slot.w / 2, slot.y + slot.h / 2, slot.w * 0.78, slot.h * 0.78)
      else {
        drawItemPlaceholder(ctx, slot.x + slot.w * 0.12, slot.y + slot.h * 0.12, slot.w * 0.76, slot.h * 0.76)
      }
    }
    ctx.restore()
  }

  StoreScene.prototype.drawDetail = function (ctx, L, item, lw) {
    var h = this.view.height
    var d = L.detail
    var pad = d.pad || h * 0.042
    var tx = d.x + pad
    var tw = d.w - pad * 2
    if (!item) {
      ctx.fillStyle = 'rgba(44,61,61,0.35)'
      ctx.font = uiFont(Math.round(h * 0.022))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.spec.emptyHint, d.x + d.w / 2, d.y + d.h * 0.4)
      return
    }
    var fav = !!this.favs[item.id]
    var pic = storeItemPic(this.images, item)
    var prev = L.preview
    if (pic && prev) drawContain(ctx, pic, prev.x, prev.y, prev.w, prev.h)
    else if (pic) drawContain(ctx, pic, d.x + d.w / 2, d.y + d.h * 0.20, tw * 0.92, d.h * 0.32)
    else if (prev) {
      drawItemPlaceholder(ctx, prev.x - prev.w / 2, prev.y - prev.h / 2, prev.w, prev.h)
    } else {
      drawItemPlaceholder(ctx, d.x + d.w * 0.18, d.y + d.h * 0.04, tw * 0.64, d.h * 0.28)
    }

    var favX = L.favItem.x
    var favY = L.favItem.y
    ctx.beginPath()
    ctx.arc(favX, favY, L.favItem.r, 0, Math.PI * 2)
    ctx.fillStyle = '#1a1a1a'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = Math.max(1.8, L.favItem.r * 0.08)
    drawHeartOutline(ctx, favX, favY + 1, L.favItem.r * 0.55, fav)

    ctx.fillStyle = COLORS.ink
    var nameSize = L.titleSize || Math.round(h * 0.04)
    ctx.font = uiFont(nameSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    var wrapW = tw
    var nameRows = wrapText(ctx, item.name, wrapW)
    var ny = d.nameY || (d.y + d.h * 0.44)
    var nameLh = nameSize * 1.15
    var i
    for (i = 0; i < nameRows.length; i++) {
      ctx.fillText(nameRows[i], tx, ny + i * nameLh)
      ctx.fillText(nameRows[i], tx + 0.6, ny + i * nameLh)
    }

    var subSize = Math.round(nameSize * 0.62)
    var tagY = ny + nameRows.length * nameLh + h * 0.016
    var tagH = Math.max(h * 0.042, subSize + h * 0.016)
    ctx.font = uiFont(subSize)
    var tagTextW = ctx.measureText(item.bonusText).width
    var tagW = Math.min(tw, tagH * 1.2 + tagTextW + tagH * 0.5)
    fillRoundRect(ctx, tx, tagY, tagW, tagH, tagH / 2, 'rgba(174,217,224,0.95)')
    var bonusIcon = this.images[nutrientIconId(item.bonusKey)]
    if (bonusIcon) {
      drawContain(ctx, bonusIcon, tx + tagH * 0.52, tagY + tagH / 2, tagH * 0.68, tagH * 0.68)
    }
    ctx.fillStyle = COLORS.ink
    ctx.font = uiFont(subSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(item.bonusText, tx + tagH * 1.02, tagY + tagH / 2)

    ctx.fillStyle = 'rgba(44,61,61,0.52)'
    ctx.font = uiFont(subSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    var descRows = wrapText(ctx, item.desc, tw)
    var dy = tagY + tagH + h * 0.048
    var descLh = subSize * 1.28
    for (i = 0; i < descRows.length; i++) ctx.fillText(descRows[i], tx, dy + i * descLh)

    if (L.equip) this.drawEquip(ctx, L.equip, item)
    this.drawBuy(ctx, L.buy, item)
  }

  StoreScene.prototype.drawEquip = function (ctx, box, item) {
    var on = this.game.equipped && this.game.equipped[item.cat] === item.id
    var s = this.pressed === 'equip' ? 0.96 : 1
    ctx.save()
    ctx.translate(box.x, box.y)
    ctx.scale(s, s)
    fillRoundRect(ctx, -box.w / 2, -box.h / 2, box.w, box.h, box.h / 2, on ? this.theme.accent : '#1a1a1a')
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(box.h * 0.42))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var label = on ? '脱下' : '穿上'
    ctx.fillText(label, 0, 1)
    ctx.fillText(label, 0.6, 1)
    ctx.restore()
  }

  StoreScene.prototype.drawBuy = function (ctx, buy, item) {
    var owned = !!this.owned[item.id]
    var locked = owned && !this.spec.consumable
    var img = this.images.wardBuy
    var s = this.pressed === 'buy' ? 0.96 : 1
    ctx.save()
    ctx.translate(buy.x, buy.y)
    ctx.scale(s, s)
    if (img) ctx.drawImage(img, -buy.w / 2, -buy.h / 2, buy.w, buy.h)
    else fillRoundRect(ctx, -buy.w / 2, -buy.h / 2, buy.w, buy.h, buy.h / 2, '#1a1a1a')
    var price = locked ? '已拥有' : String(item.price)
    var size = Math.round(buy.h * (locked ? 0.34 : 0.5))
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(size)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(price, buy.w * BUY_GAP_X, buy.h * 0.16)
    ctx.fillText(price, buy.w * BUY_GAP_X + 0.7, buy.h * 0.16)
    ctx.restore()
  }

  StoreScene.prototype.drawBubble = function (ctx, b) {
    var shown = this.spec.talk.slice(0, Math.floor(this.talkTyped))
    var r = Math.min(18, b.h / 2)
    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.94)'
    roundRect(ctx, b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, r)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(b.x - 10, b.y + b.h / 2 - 2)
    ctx.lineTo(b.x + 10, b.y + b.h / 2 - 2)
    ctx.lineTo(b.x, b.y + b.h / 2 + 12)
    ctx.closePath()
    ctx.fill()
    var fontPx = Math.round(this.view.height * 0.038)
    ctx.font = uiFont(fontPx)
    ctx.fillStyle = COLORS.ink
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var rows = wrapText(ctx, shown, b.w - 36)
    var i
    var lh = fontPx * 1.28
    var start = b.y - ((Math.max(rows.length, 1) - 1) * lh) / 2
    for (i = 0; i < rows.length; i++) {
      ctx.fillText(rows[i], b.x, start + i * lh)
      ctx.fillText(rows[i], b.x + 0.6, start + i * lh)
    }
    ctx.restore()
  }

  StoreScene.prototype.drawToast = function (ctx) {
    if (!this.toast || isWx) return
    var u = this.toast.t / this.toast.dur
    var alpha = u < 0.12 ? u / 0.12 : u > 0.82 ? (1 - u) / 0.18 : 1
    if (alpha <= 0) return
    var fontPx = Math.max(16, Math.round(this.view.height * 0.022))
    ctx.font = uiFont(fontPx)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var tw = ctx.measureText(this.toast.text).width
    var bw = Math.min(this.view.width * 0.7, tw + 56)
    var bh = fontPx + 32
    ctx.save()
    ctx.globalAlpha = 0.92 * alpha
    fillRoundRect(ctx, this.view.width / 2 - bw / 2, this.view.height * 0.82 - bh / 2, bw, bh, 18, 'rgba(40,40,40,0.88)')
    ctx.fillStyle = '#ffffff'
    ctx.fillText(this.toast.text, this.view.width / 2, this.view.height * 0.82)
    ctx.restore()
  }

  StoreScene.prototype.onDown = function (x, y) {
    this.back.pressed = this.back.hit(x, y)
    this.pressed = this.hit(x, y)
  }

  StoreScene.prototype.onMove = function () {}

  StoreScene.prototype.onUp = function (x, y) {
    if (this.back.pressed) {
      this.back.pressed = false
      if (this.back.hit(x, y)) {
        this.sounds.play('tap')
        this.game.go('play')
      }
      this.pressed = null
      return
    }
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.sounds.unlock()
    if (id === 'keeper') {
      this.sounds.play('dialog')
      this.keeper.startKick()
      this.talkTyped = 0
      return
    }
    this.sounds.play('tap')
    if (id.indexOf('cat:') === 0) {
      this.cat = id.slice(4)
      var vis = this.visibleItems()
      this.selected = vis[0] ? vis[0].id : ''
      return
    }
    if (id === 'tab:all') this.tab = 'all'
    if (id === 'tab:owned') this.tab = 'owned'
    if (id === 'tab:unowned') this.tab = 'unowned'
    if (id === 'favFilter') this.favOnly = !this.favOnly
    if (id.indexOf('item:') === 0) this.selected = id.slice(5)
    if (id === 'favItem') {
      var it = this.selectedItem()
      if (it) this.favs[it.id] = !this.favs[it.id]
    }
    if (id === 'buy') this.tryBuy()
    if (id === 'equip') this.tryEquip()
  }

  StoreScene.prototype.tryBuy = function () {
    var item = this.selectedItem()
    if (!item) return
    if (!this.spec.consumable && this.owned[item.id]) {
      this.showToast('已拥有')
      return
    }
    if (this.spec.consumable && (this.game.foodBag || []).length >= FOOD_BAG_MAX) {
      this.showToast('已经有很多食物啦，先吃掉一些再购买吧')
      return
    }
    if ((this.game.coins || 0) < item.price) {
      this.showToast('心跳币不够')
      return
    }
    this.game.coins -= item.price
    this.owned[item.id] = true
    if (this.spec.consumable) {
      this.game.addFood(item.id)
      if (item.id === 'water' || item.cat === 'drink') markPlanDone(this.game, 'water')
      this.showToast('买到啦，回主页喂小心')
    } else {
      this.showToast(this.spec.canEquip ? '买到啦，可以穿上了' : '买到啦')
    }
  }

  StoreScene.prototype.tryEquip = function () {
    var item = this.selectedItem()
    if (!item || !this.spec.canEquip || !this.owned[item.id]) return
    if (this.game.equipped[item.cat] === item.id) {
      this.game.equipped[item.cat] = ''
      this.showToast('已脱下')
      return
    }
    this.game.equipped[item.cat] = item.id
    this.showToast('已穿上')
  }

  var TEACHER_POSE = {
    eyeL: { x: -128, y: 28, rx: 46, ry: 16 },
    eyeR: { x: -24, y: 30, rx: 46, ry: 16 },
    pupilL: { x: -128, y: 34 },
    pupilR: { x: -24, y: 36 },
    hipL: { x: -96, y: 318 },
    hipR: { x: 108, y: 318 },
    armL: { x: -232, y: 82, rot: 0.16 },
    armR: { x: 128, y: 108, rot: 0.08 }
  }

  function TeacherActor(images) {
    this.images = images
    this.idleTime = 0
    this.bobY = 0
  }

  TeacherActor.prototype.update = function (dt) {
    this.idleTime += dt
    this.bobY = Math.sin(this.idleTime * 1.5) * 3
  }

  TeacherActor.prototype.draw = function (ctx, x, y, scale) {
    var img = this.images
    if (!img.teachBody) return
    var look = idleLook(this.idleTime)
    ctx.save()
    ctx.translate(x, y + this.bobY * scale)
    ctx.scale(scale, scale)
    var sway = Math.sin(this.idleTime * 1.15) * 0.05
    this.drawArmL(ctx, img.teachArmL, TEACHER_POSE.armL.x, TEACHER_POSE.armL.y, TEACHER_POSE.armL.rot + sway)
    this.drawLeg(ctx, img.teachLegL, TEACHER_POSE.hipL.x, TEACHER_POSE.hipL.y, 0.08, false)
    this.drawLeg(ctx, img.teachLegL, TEACHER_POSE.hipR.x, TEACHER_POSE.hipR.y, -0.08, true)
    var bw = img.teachBody.width
    var bh = img.teachBody.height
    ctx.drawImage(img.teachBody, -bw / 2, -bh / 2)
    this.drawPupils(ctx, img, look)
    this.drawArm(ctx, img.teachArmR, TEACHER_POSE.armR.x, TEACHER_POSE.armR.y, TEACHER_POSE.armR.rot - sway * 0.8, false)
    ctx.restore()
  }

  TeacherActor.prototype.drawLeg = function (ctx, img, x, y, rot, flip) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -img.width / 2, -8)
    ctx.restore()
  }

  TeacherActor.prototype.drawArm = function (ctx, img, x, y, rot, flip) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot || 0)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -img.width / 2, -8)
    ctx.restore()
  }

  TeacherActor.prototype.drawArmL = function (ctx, img, x, y, rot) {
    if (!img) return
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot || 0)
    ctx.drawImage(img, -img.width + 16, -10)
    ctx.restore()
  }

  TeacherActor.prototype.drawPupils = function (ctx, img, look) {
    var pL = img.teachPupilL
    var pR = img.teachPupilR
    if (!pL && !pR) return
    ctx.save()
    ctx.beginPath()
    addEllipse(ctx, TEACHER_POSE.eyeL.x, TEACHER_POSE.eyeL.y, TEACHER_POSE.eyeL.rx, TEACHER_POSE.eyeL.ry)
    addEllipse(ctx, TEACHER_POSE.eyeR.x, TEACHER_POSE.eyeR.y, TEACHER_POSE.eyeR.rx, TEACHER_POSE.eyeR.ry)
    ctx.clip()
    if (pL) {
      ctx.drawImage(pL, TEACHER_POSE.pupilL.x + look.x * 0.6 - pL.width / 2, TEACHER_POSE.pupilL.y + look.y - pL.height / 2)
    }
    if (pR) {
      ctx.drawImage(pR, TEACHER_POSE.pupilR.x + look.x * 0.6 - pR.width / 2, TEACHER_POSE.pupilR.y + look.y - pR.height / 2)
    }
    ctx.restore()
  }

  function rapidStake(n) {
    var q = Math.max(1, n | 0)
    return 5 * Math.pow(2, q - 1)
  }

  function rapidType(h, ratio, min) {
    return Math.max(min, Math.round(h * ratio))
  }

  function aidFont(h, ratio, min) {
    return Math.max(min, Math.round(h * ratio))
  }

  function RapidQuizScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.teacher = new TeacherActor(game.images)
    this.phase = 'intro'
    this.talkTyped = 0
    this.pressed = null
    this.toast = null
    this.pool = 0
    this.asked = 0
    this.cycle = 0
    this.piles = { 1: [], 2: [], 3: [] }
    this.item = null
    this.opts = []
    this.picked = -1
    this.left = RAPID_SEC
    this.askTalk = ''
    this.lastOk = false
    this.revealed = false
    this.layout = this.computeLayout()
    this.refill(1)
    this.refill(2)
    this.refill(3)
    if (this.sounds) this.sounds.play('dialog')
  }

  RapidQuizScene.prototype.refill = function (d) {
    var list = []
    var i
    for (i = 0; i < RAPID_BANK.length; i++) {
      if (RAPID_BANK[i].d === d) list.push(RAPID_BANK[i])
    }
    this.piles[d] = shuffle(list)
  }

  RapidQuizScene.prototype.deal = function () {
    var d = (this.cycle % 3) + 1
    if (!this.piles[d].length) this.refill(d)
    var src = this.piles[d].shift()
    this.cycle += 1
    this.asked += 1
    this.item = src
    var opts = [{ t: src.ok, ok: true }]
    var i
    for (i = 0; i < src.bad.length; i++) opts.push({ t: src.bad[i], ok: false })
    this.opts = shuffle(opts)
    this.picked = -1
    this.revealed = false
    this.left = RAPID_SEC
    this.phase = 'play'
  }

  RapidQuizScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    aidPlaceBack(this.view, this.back)
    var intro = this.phase === 'intro'
    var titleSize = rapidType(h, intro ? 0.064 : 0.06, 18)
    var bodySize = rapidType(h, intro ? 0.056 : 0.054, 16)
    var lineH = Math.max(Math.round(bodySize * 1.36), rapidType(h, intro ? 0.078 : 0.074, 22))
    var qPad = Math.max(12, Math.round(h * 0.03))
    var qTitleY = qPad + titleSize * 0.52
    var titleGap = intro ? Math.max(12, Math.round(h * 0.042)) : Math.max(6, Math.round(h * 0.014))
    var qBodyY = qTitleY + titleSize * 0.5 + bodySize * 0.55 + titleGap
    var readyW = Math.max(128, Math.round(h * 0.4))
    var readyH = Math.max(34, Math.round(h * 0.11))
    var scale = h * 0.0006
    var qW
    var qX
    var qH
    var qY
    var boxW
    var boxX
    var barY
    var clockR
    var gap
    var barW
    var secW
    var groupW
    var groupX
    var poolY
    var panelY
    var panelH
    var pad
    var cardGap
    var cardW
    var cardH
    var cards
    var i
    var sideX
    var sideY
    if (intro) {
      qW = Math.min(w * 0.62, h * 1.28)
      qX = w * 0.07
      qH = qBodyY + lineH * 4.15 + qPad * 0.5
      qH = Math.min(Math.max(qH, h * 0.38), h * 0.52)
      var readyGap = Math.max(4, Math.round(h * 0.008))
      var readyY = h * 0.855
      qY = readyY - readyH / 2 - readyGap - qH
      qY = Math.max(h * 0.28, Math.min(qY, h * 0.5))
      readyY = qY + qH + readyGap + readyH / 2
      return {
        q: { x: qX, y: qY, w: qW, h: qH },
        titleSize: titleSize,
        bodySize: bodySize,
        lineH: lineH,
        qPad: qPad,
        qTitleY: qTitleY,
        qBodyY: qBodyY,
        clock: { x: 0, y: 0, r: 1 },
        bar: { x: 0, y: 0, w: 1, h: 1 },
        sec: { x: 0, y: 0 },
        panel: { x: 0, y: 0, w: 1, h: 1 },
        cards: [],
        confirm: { x: 0, y: 0, w: 1, h: 1 },
        ready: {
          x: qX + qW - readyW / 2,
          y: readyY,
          w: readyW,
          h: readyH
        },
        goOn: { x: 0, y: 0, w: 1, h: 1 },
        cash: { x: 0, y: 0, w: 1, h: 1 },
        restart: { x: 0, y: 0, w: 1, h: 1 },
        pool: { x: h * 0.055, y: h * 0.9, s: h * 0.07 },
        teacher: { x: w * 0.82, y: h * 0.9 - 670 * scale, scale: scale }
      }
    }
    var btnW = Math.max(108, Math.round(h * 0.3))
    var sidePad = Math.max(10, Math.round(h * 0.038))
    var leftGutter = Math.max(h * 0.17, w * 0.065)
    var rightGutter = btnW + sidePad * 2
    boxX = leftGutter
    boxW = w - leftGutter - rightGutter
    qH = Math.max(h * 0.28, qBodyY + lineH * 2.1 + qPad * 0.6)
    qH = Math.min(qH, h * 0.32)
    qY = h * 0.07
    barY = qY + qH + h * 0.04
    clockR = Math.max(10, h * 0.032)
    gap = h * 0.016
    secW = Math.max(40, h * 0.1)
    barW = Math.max(h * 0.38, boxW - clockR * 2 - gap * 2 - secW)
    groupW = clockR * 2 + gap + barW + gap + secW
    groupX = boxX + (boxW - groupW) / 2
    pad = Math.max(10, h * 0.034)
    cardGap = Math.max(10, h * 0.03)
    poolY = h * 0.925
    panelY = barY + h * 0.04
    panelH = Math.max(h * 0.28, poolY - panelY)
    var titleH = Math.max(22, Math.round(h * 0.08))
    cardW = (boxW - pad * 2 - cardGap * 2) / 3
    cardH = panelH - titleH - pad * 2
    cards = []
    for (i = 0; i < 3; i++) {
      cards.push({
        x: boxX + pad + i * (cardW + cardGap),
        y: panelY + titleH + pad,
        w: cardW,
        h: cardH
      })
    }
    sideX = boxX + boxW + sidePad + btnW / 2
    sideY = poolY
    var btnH = Math.max(34, Math.round(h * 0.11))
    var cashH = Math.max(34, Math.round(h * 0.108))
    var goH = Math.max(34, Math.round(h * 0.108))
    var btnGap = Math.max(8, h * 0.016)
    var poolS = Math.max(18, h * 0.066)
    var poolGap = h * 0.02
    var topBtnTop = poolY - btnH
    if (this.phase === 'ask' && this.lastOk) topBtnTop = poolY - cashH - btnGap - goH
    return {
      q: { x: boxX, y: qY, w: boxW, h: qH },
      titleSize: titleSize,
      bodySize: bodySize,
      lineH: lineH,
      qPad: qPad,
      qTitleY: qTitleY,
      qBodyY: qBodyY,
      optSize: rapidType(h, 0.052, 16),
      optLine: Math.max(22, Math.round(rapidType(h, 0.052, 16) * 1.32)),
      askSize: rapidType(h, 0.054, 16),
      secSize: rapidType(h, 0.054, 16),
      poolSize: rapidType(h, 0.062, 18),
      clock: { x: groupX + clockR, y: barY, r: clockR },
      bar: { x: groupX + clockR * 2 + gap, y: barY, w: barW, h: Math.max(10, h * 0.034) },
      sec: { x: groupX + clockR * 2 + gap + barW + gap, y: barY },
      panel: { x: boxX, y: panelY, w: boxW, h: panelH },
      cards: cards,
      confirm: { x: sideX, y: poolY - btnH / 2, w: btnW, h: btnH },
      ready: { x: 0, y: 0, w: readyW, h: readyH },
      goOn: { x: sideX, y: poolY - cashH - btnGap - goH / 2, w: btnW, h: goH },
      cash: { x: sideX, y: poolY - cashH / 2, w: btnW, h: cashH },
      restart: { x: sideX, y: poolY - btnH / 2, w: btnW, h: btnH },
      pool: { x: sideX, y: topBtnTop - poolGap - poolS / 2, s: poolS },
      teacher: { x: w * 0.82, y: h * 0.9 - 670 * scale, scale: scale }
    }
  }

  RapidQuizScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 2.2 }
  }

  RapidQuizScene.prototype.update = function (dt) {
    this.layout = this.computeLayout()
    this.teacher.update(dt)
    if (this.phase === 'intro' && this.talkTyped < RAPID_TALK.length) {
      this.talkTyped = Math.min(RAPID_TALK.length, this.talkTyped + dt * 28)
    }
    if (this.phase === 'play') {
      this.left = Math.max(0, this.left - dt)
      if (this.left <= 0) this.finish(false, true)
    }
    if (this.toast) {
      this.toast.t -= dt
      if (this.toast.t <= 0) this.toast = null
    }
  }

  RapidQuizScene.prototype.finish = function (ok, timeout) {
    if (this.phase !== 'play') return
    var stake = rapidStake(this.asked)
    this.lastOk = !!ok
    if (ok) {
      this.pool += stake
      if (this.sounds) this.sounds.play('chooseRight')
    } else {
      this.pool = 0
      if (this.sounds) this.sounds.play('chooseWrong')
    }
    this.revealed = true
    if (ok) {
      this.askTalk = '答对了！本轮奖池 +' + stake + '，当前 ' + this.pool + '。要继续吗？'
    } else if (timeout) {
      this.askTalk = '时间到，视为答错，奖池清零。只能重新来过了。'
    } else {
      this.askTalk = '答错了，奖池清零。只能重新来过了。'
    }
    this.phase = 'ask'
  }

  RapidQuizScene.prototype.restart = function () {
    this.pool = 0
    this.asked = 0
    this.cycle = 0
    this.refill(1)
    this.refill(2)
    this.refill(3)
    this.deal()
  }

  RapidQuizScene.prototype.cashOut = function () {
    this.game.coins = (this.game.coins || 0) + this.pool
    this.game.go('play')
  }

  RapidQuizScene.prototype.drawBg = function (ctx, w, h) {
    ctx.fillStyle = '#f4f1ea'
    ctx.fillRect(0, 0, w, h)
    var bg = this.images.qBg
    if (bg) drawCover(ctx, bg, 0, 0, w, h)
  }

  RapidQuizScene.prototype.drawPill = function (ctx, b, label, key) {
    var down = this.pressed === key
    ctx.save()
    ctx.translate(b.x, b.y)
    ctx.scale(down ? 0.96 : 1, down ? 0.96 : 1)
    fillRoundRect(ctx, -b.w / 2, -b.h / 2, b.w, b.h, b.h / 2, down ? '#5a3428' : RAPID_BTN)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.max(14, Math.round(b.h * 0.44)))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 0, 1)
    ctx.restore()
  }

  RapidQuizScene.prototype.drawBubble = function (ctx, L, h, title, body, intro) {
    var b = L.q
    var titleSize = L.titleSize
    var bodySize = L.bodySize
    var lineH = L.lineH
    var pad = L.qPad
    ctx.save()
    fillRoundRect(ctx, b.x, b.y, b.w, b.h, h * 0.028, '#ffffff')
    ctx.strokeStyle = RAPID_BROWN
    ctx.lineWidth = Math.max(3, h * 0.005)
    roundRect(ctx, b.x, b.y, b.w, b.h, h * 0.028)
    ctx.stroke()
    ctx.fillStyle = RAPID_BROWN
    ctx.font = uiFont(titleSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(title, b.x + pad, b.y + L.qTitleY)
    ctx.fillStyle = '#2b2b2b'
    ctx.font = uiFont(bodySize)
    var lines = wrapText(ctx, body || '', b.w - pad * 2)
    var maxLines = Math.max(2, Math.floor((b.h - L.qBodyY - pad * 0.2) / lineH + 0.2))
    if (lines.length > maxLines) lines = lines.slice(0, maxLines)
    var i
    for (i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], b.x + pad, b.y + L.qBodyY + i * lineH)
    }
    ctx.restore()
  }

  RapidQuizScene.prototype.drawIntro = function (ctx, L, w, h) {
    this.teacher.draw(ctx, L.teacher.x, L.teacher.y, L.teacher.scale)
    var shown = RAPID_TALK.slice(0, Math.floor(this.talkTyped))
    this.drawBubble(ctx, L, h, '心心博士', shown, true)
    if (this.talkTyped >= RAPID_TALK.length) this.drawPill(ctx, L.ready, '我准备好了！', 'ready')
  }

  RapidQuizScene.prototype.drawClock = function (ctx, L) {
    var clock = this.images.aidIconTime
    if (clock) {
      drawContain(ctx, clock, L.clock.x, L.clock.y, L.clock.r * 2.2, L.clock.r * 2.2)
      return
    }
    ctx.save()
    ctx.beginPath()
    ctx.arc(L.clock.x, L.clock.y, L.clock.r, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.strokeStyle = RAPID_BROWN
    ctx.lineWidth = Math.max(2, L.clock.r * 0.14)
    ctx.stroke()
    ctx.restore()
  }

  RapidQuizScene.prototype.drawPlay = function (ctx, L, w, h) {
    var body = this.phase === 'ask' ? this.askTalk : (this.item ? this.item.q : '')
    this.drawBubble(ctx, L, h, '提问', body, false)
    var t = this.phase === 'play' ? this.left / RAPID_SEC : 0
    this.drawClock(ctx, L)
    var bar = L.bar
    ctx.save()
    roundRect(ctx, bar.x, bar.y - bar.h / 2, bar.w, bar.h, bar.h / 2)
    ctx.strokeStyle = RAPID_BROWN
    ctx.lineWidth = Math.max(2, h * 0.003)
    ctx.stroke()
    ctx.save()
    roundRect(ctx, bar.x, bar.y - bar.h / 2, bar.w, bar.h, bar.h / 2)
    ctx.clip()
    ctx.fillStyle = RAPID_BROWN
    ctx.fillRect(bar.x, bar.y - bar.h / 2, bar.w * t, bar.h)
    ctx.restore()
    ctx.restore()
    ctx.fillStyle = RAPID_BROWN
    ctx.font = uiFont(L.secSize)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(Math.ceil(this.phase === 'play' ? this.left : 0) + 's', L.sec.x, L.bar.y)
    var p = L.panel
    fillRoundRect(ctx, p.x, p.y, p.w, p.h, h * 0.03, RAPID_BROWN)
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(L.askSize)
    ctx.textAlign = 'left'
    ctx.fillText('回答', p.x + h * 0.03, p.y + Math.max(16, h * 0.052))
    var i
    for (i = 0; i < L.cards.length; i++) {
      var c = L.cards[i]
      var opt = this.opts[i]
      var on = this.picked === i && !this.revealed
      fillRoundRect(ctx, c.x, c.y, c.w, c.h, h * 0.016, '#ffffff')
      if (this.revealed && opt) {
        ctx.strokeStyle = opt.ok ? '#3aa35a' : (this.picked === i ? '#c45c55' : 'transparent')
        ctx.lineWidth = Math.max(4, h * 0.006)
        if (opt.ok || this.picked === i) {
          roundRect(ctx, c.x, c.y, c.w, c.h, h * 0.016)
          ctx.stroke()
        }
      } else if (on) {
        ctx.strokeStyle = '#f5c518'
        ctx.lineWidth = Math.max(4, h * 0.006)
        roundRect(ctx, c.x, c.y, c.w, c.h, h * 0.016)
        ctx.stroke()
      }
      if (opt) {
        ctx.fillStyle = '#2b2b2b'
        ctx.font = uiFont(L.optSize)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        var rows = wrapText(ctx, opt.t, c.w - h * 0.04)
        var maxRows = Math.max(2, Math.floor(c.h / L.optLine))
        if (rows.length > maxRows) rows = rows.slice(0, maxRows)
        var j
        var start = c.y + c.h / 2 - (rows.length - 1) * L.optLine / 2
        for (j = 0; j < rows.length; j++) {
          ctx.fillText(rows[j], c.x + c.w / 2, start + j * L.optLine)
        }
      }
    }
    if (this.phase === 'play') {
      this.drawPill(ctx, L.confirm, '确认答案', 'confirm')
    } else if (this.lastOk) {
      this.drawPill(ctx, L.goOn, '继续答题', 'goOn')
      this.drawPill(ctx, L.cash, '结束答题', 'cash')
    } else {
      this.drawPill(ctx, L.restart, '重新来过', 'restart')
    }
    var heart = this.images.aidIconHeart || this.images.iconCoin
    var poolStr = String(this.pool)
    ctx.font = uiFont(L.poolSize)
    var numW = ctx.measureText(poolStr).width
    var iconS = L.pool.s
    var iconGap = h * 0.012
    var rowW = iconS + iconGap + numW
    var rowLeft = L.pool.x - rowW / 2
    if (heart) drawContain(ctx, heart, rowLeft + iconS / 2, L.pool.y, iconS, iconS)
    ctx.fillStyle = RAPID_BROWN
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(poolStr, rowLeft + iconS + iconGap, L.pool.y)
  }

  RapidQuizScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    this.drawBg(ctx, w, h)
    if (this.phase === 'intro') this.drawIntro(ctx, L, w, h)
    else this.drawPlay(ctx, L, w, h)
    this.back.draw(ctx)
    if (this.toast) {
      var toastH = Math.max(30, h * 0.085)
      ctx.globalAlpha = Math.min(1, this.toast.t * 1.5)
      fillRoundRect(ctx, w / 2 - h * 0.4, h * 0.11, h * 0.8, toastH, 16, 'rgba(40,40,40,0.84)')
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(rapidType(h, 0.048, 16))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.toast.text, w / 2, h * 0.11 + toastH / 2)
      ctx.globalAlpha = 1
    }
  }

  RapidQuizScene.prototype.hit = function (x, y) {
    var L = this.layout
    var i
    if (this.back.hit(x, y)) return 'back'
    if (this.phase === 'intro') {
      if (hitRect(x, y, L.ready.x, L.ready.y, L.ready.w, L.ready.h, 8)) return 'ready'
      return 'skip'
    }
    if (this.phase === 'ask') {
      if (this.lastOk) {
        if (hitRect(x, y, L.goOn.x, L.goOn.y, L.goOn.w, L.goOn.h, 8)) return 'goOn'
        if (hitRect(x, y, L.cash.x, L.cash.y, L.cash.w, L.cash.h, 8)) return 'cash'
      } else if (hitRect(x, y, L.restart.x, L.restart.y, L.restart.w, L.restart.h, 8)) {
        return 'restart'
      }
      return null
    }
    for (i = 0; i < L.cards.length; i++) {
      var c = L.cards[i]
      if (hitBox(x, y, c.x, c.y, c.w, c.h, 4)) return 'opt:' + i
    }
    if (hitRect(x, y, L.confirm.x, L.confirm.y, L.confirm.w, L.confirm.h, 8)) return 'confirm'
    return null
  }

  RapidQuizScene.prototype.onDown = function (x, y) {
    this.pressed = this.hit(x, y)
    this.back.pressed = this.pressed === 'back'
  }

  RapidQuizScene.prototype.onMove = function () {}

  RapidQuizScene.prototype.onUp = function (x, y) {
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    if (!id || this.hit(x, y) !== id) return
    this.sounds.unlock()
    if (id === 'back') {
      this.sounds.play('tap')
      if (this.phase === 'intro') this.game.go('play')
      else this.cashOut()
      return
    }
    if (id === 'skip') {
      if (this.talkTyped < RAPID_TALK.length) this.sounds.play('dialog')
      this.talkTyped = RAPID_TALK.length
      return
    }
    if (id === 'ready') {
      if (this.talkTyped < RAPID_TALK.length) {
        this.sounds.play('dialog')
        this.talkTyped = RAPID_TALK.length
        return
      }
      this.sounds.play('tap')
      this.deal()
      return
    }
    if (id.indexOf('opt:') === 0) {
      this.sounds.play('tap')
      this.picked = parseInt(id.slice(4), 10)
      return
    }
    if (id === 'confirm') {
      if (this.picked < 0 || !this.opts[this.picked]) {
        this.sounds.play('tap')
        this.showToast('请先选择一个答案')
        return
      }
      this.finish(!!this.opts[this.picked].ok, false)
      return
    }
    if (id === 'goOn') {
      if (!this.lastOk) return
      this.sounds.play('tap')
      this.deal()
      return
    }
    if (id === 'restart') {
      this.sounds.play('tap')
      this.restart()
      return
    }
    if (id === 'cash') {
      this.sounds.play('tap')
      this.cashOut()
    }
  }

  function livePlanTasks() {
    var out = []
    var i
    for (i = 0; i < PLAN_TASKS.length; i++) {
      if (PLAN_TASKS[i] && PLAN_TASKS[i].on !== false) out.push(PLAN_TASKS[i])
    }
    return out
  }

  function ensurePlanProgress(game) {
    if (!game.planProgress) game.planProgress = {}
  }

  function planState(game, id) {
    ensurePlanProgress(game)
    if (!game.planProgress[id]) game.planProgress[id] = { done: false, claimed: false }
    return game.planProgress[id]
  }

  function markPlanDone(game, id) {
    if (!game || !id) return
    var st = planState(game, id)
    if (!st.claimed) st.done = true
  }

  function markPlanLogin(game) {
    var list = livePlanTasks()
    var i
    for (i = 0; i < list.length; i++) {
      if (list[i].kind === 'login') markPlanDone(game, list[i].id)
    }
    if (game.timedClear && (game.timedClear.cpr || game.timedClear.aed)) markPlanDone(game, 'sport')
  }

  function drawWaterDrop(ctx, x, y, s) {
    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = '#7db8e8'
    ctx.beginPath()
    ctx.moveTo(0, -s * 0.52)
    ctx.bezierCurveTo(s * 0.42, -s * 0.08, s * 0.38, s * 0.42, 0, s * 0.48)
    ctx.bezierCurveTo(-s * 0.38, s * 0.42, -s * 0.42, -s * 0.08, 0, -s * 0.52)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.beginPath()
    ctx.ellipse(-s * 0.12, -s * 0.08, s * 0.1, s * 0.16, -0.45, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function PlanScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    game.ensureHubDemo()
    markPlanLogin(game)
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.pressed = null
    this.scroll = 0
    this.drag = false
    this.dragFrom = 0
    this.dragStart = 0
    this.layout = this.computeLayout()
  }

  PlanScene.prototype.tasks = function () {
    return livePlanTasks()
  }

  PlanScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    var head = aidPlaceBack(this.view, this.back)
    var titleY = Math.max(head.titleY, h * 0.11)
    var listTop = titleY + h * 0.08
    var listBottom = h - h * 0.06
    var rowH = Math.min(h * 0.145, (listBottom - listTop) / Math.max(4, this.tasks().length))
    var gap = h * 0.018
    var listW = Math.min(w * 0.86, h * 1.55)
    var listX = (w - listW) / 2
    var btnW = Math.max(h * 0.2, listW * 0.16)
    var btnH = rowH * 0.48
    var rows = []
    var i
    var list = this.tasks()
    for (i = 0; i < list.length; i++) {
      var y = listTop + i * (rowH + gap) - this.scroll
      rows.push({
        id: list[i].id,
        i: i,
        x: listX,
        y: y,
        w: listW,
        h: rowH,
        btn: { x: listX + listW - rowH * 0.28 - btnW / 2, y: y + rowH / 2, w: btnW, h: btnH }
      })
    }
    var contentH = list.length * (rowH + gap) - gap
    var viewH = listBottom - listTop
    return {
      titleY: titleY,
      listTop: listTop,
      listBottom: listBottom,
      listX: listX,
      listW: listW,
      rowH: rowH,
      gap: gap,
      rows: rows,
      scrollMax: Math.max(0, contentH - viewH)
    }
  }

  PlanScene.prototype.update = function () {
    this.scroll = clamp(this.scroll, 0, this.computeLayout().scrollMax)
    this.layout = this.computeLayout()
  }

  PlanScene.prototype.drawDropOrIcon = function (ctx, item, x, y, s) {
    var img = null
    if (item.icon && this.images[item.icon]) img = this.images[item.icon]
    else if (item.pay === 'coins') img = this.images.iconCoin
    else if (item.pay === 'capsules' && item.iconSrc) img = this.images[item.icon]
    if (img) {
      drawContain(ctx, img, x, y, s, s)
      return
    }
    if (item.pay === 'capsules') drawWaterDrop(ctx, x, y, s * 0.5)
    else if (this.images.iconCoin) drawContain(ctx, this.images.iconCoin, x, y, s, s)
  }

  PlanScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var bg = this.images.planBg
    if (bg) drawCover(ctx, bg, 0, 0, w, h)
    else {
      ctx.fillStyle = '#fff6b0'
      ctx.fillRect(0, 0, w, h)
    }
    ctx.fillStyle = PLAN_INK
    ctx.font = uiFont(Math.round(h * 0.055))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    fillFatText(ctx, PLAN_TITLE, w / 2, L.titleY)
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, L.listTop - h * 0.01, w, L.listBottom - L.listTop + h * 0.02)
    ctx.clip()
    var list = this.tasks()
    var i
    for (i = 0; i < L.rows.length; i++) {
      var row = L.rows[i]
      var item = list[i]
      var st = planState(this.game, item.id)
      var on = this.pressed === 'claim:' + i
      fillRoundRect(ctx, row.x, row.y, row.w, row.h, row.h / 2, PLAN_ROW)
      var textX = row.x + row.h * 0.28
      var btn = row.btn
      var textR = btn.x - btn.w / 2 - h * 0.18
      ctx.fillStyle = PLAN_INK
      ctx.font = uiFont(Math.round(row.h * 0.26))
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(item.title, textX, row.y + row.h * 0.36)
      ctx.fillStyle = PLAN_MUTED
      ctx.font = uiFont(Math.round(row.h * 0.18))
      var desc = item.desc || ''
      if (ctx.measureText(desc).width > textR - textX) {
        while (desc.length && ctx.measureText(desc + '…').width > textR - textX) desc = desc.slice(0, -1)
        desc += '…'
      }
      ctx.fillText(desc, textX, row.y + row.h * 0.68)
      var iconX = btn.x - btn.w / 2 - h * 0.09
      this.drawDropOrIcon(ctx, item, iconX, row.y + row.h / 2, row.h * 0.42)
      ctx.fillStyle = PLAN_INK
      ctx.font = uiFont(Math.round(row.h * 0.24))
      ctx.textAlign = 'left'
      ctx.fillText(String(item.reward || 0), iconX + row.h * 0.26, row.y + row.h / 2)
      var label = st.claimed ? '已领取' : (st.done ? '领取奖励' : '未完成')
      var col = st.claimed ? PLAN_DONE : (st.done ? PLAN_CLAIM : PLAN_WAIT)
      fillRoundRect(ctx, btn.x - btn.w / 2, btn.y - btn.h / 2, btn.w, btn.h, btn.h / 2, on && !st.claimed ? '#a03830' : col)
      ctx.fillStyle = '#ffffff'
      ctx.font = uiFont(Math.round(btn.h * 0.42))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, btn.x, btn.y + 1)
    }
    ctx.restore()
    this.back.draw(ctx)
  }

  PlanScene.prototype.hit = function (x, y) {
    var L = this.layout
    if (this.back.hit(x, y)) return 'back'
    if (y < L.listTop || y > L.listBottom) return null
    var i
    for (i = 0; i < L.rows.length; i++) {
      var row = L.rows[i]
      if (hitRect(x, y, row.btn.x, row.btn.y, row.btn.w, row.btn.h, 4)) return 'claim:' + i
    }
    return 'swipe'
  }

  PlanScene.prototype.onDown = function (x, y) {
    this.pressed = this.hit(x, y)
    this.back.pressed = this.pressed === 'back'
    this.drag = this.pressed && this.pressed !== 'back'
    this.dragFrom = y
    this.dragStart = this.scroll
  }

  PlanScene.prototype.onMove = function (x, y) {
    if (!this.drag) return
    this.scroll = clamp(this.dragStart - (y - this.dragFrom), 0, this.layout.scrollMax)
  }

  PlanScene.prototype.onUp = function (x, y) {
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    var dragged = this.drag && Math.abs(y - this.dragFrom) > this.view.height * 0.02
    this.drag = false
    if (dragged || !id) return
    if (this.hit(x, y) !== id) return
    if (id === 'swipe') return
    this.sounds.unlock()
    if (id === 'back') {
      this.sounds.play('tap')
      this.game.go('play')
      return
    }
    var parts = id.split(':')
    var act = parts[0]
    var idx = parseInt(parts[1], 10)
    var item = this.tasks()[idx]
    if (!item || act !== 'claim') return
    var st = planState(this.game, item.id)
    this.sounds.play('tap')
    if (!st.done || st.claimed) return
    st.claimed = true
    var n = Number(item.reward) || 0
    if (item.pay === 'capsules') this.game.capsules = (this.game.capsules || 0) + n
    else this.game.coins = (this.game.coins || 0) + n
  }

  var CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  var CARD_SUITS = [
    { id: 'spade', name: '黑桃' },
    { id: 'club', name: '梅花' },
    { id: 'diamond', name: '方块' },
    { id: 'heart', name: '红心' }
  ]
  var CARD_BANK = {
    'club-2': {
      title: '深海鱼',
      desc: '例如三文鱼、鲭鱼、沙丁鱼等，深海鱼富含 Omega-3, 具有减轻血管炎症、稳定心律的功效',
      art: 'fish'
    }
  }
  var CARD_OWNED_DEFAULTS = { 'club-2': true }
  var CARD_REDEEM_COST = 5
  var CARD_BG = '#d4ebe4'
  var CARD_INK = '#1c1c1c'
  var CARD_MUTED = '#6a6a6a'
  var CARD_LOCKED = '#d8dbe0'
  var CARD_SEL = '#c4453a'

  function cardKey(suit, rank) {
    return suit + '-' + rank
  }

  function splitCardKey(key) {
    var text = String(key || '')
    var i = text.indexOf('-')
    if (i < 0) return { suit: '', rank: '' }
    return { suit: text.slice(0, i), rank: text.slice(i + 1) }
  }

  function cardRedeemCost() {
    var n = Number(CARD_REDEEM_COST)
    if (!n || n < 1) return 5
    return Math.round(n)
  }

  function cardHasContent(info) {
    return !!(info && (info.title || info.desc || info.art || info.artId))
  }

  function redeemableCardKeys(game) {
    var owned = (game && game.ownedCards) || {}
    var out = []
    var key
    for (key in CARD_BANK) {
      if (!Object.prototype.hasOwnProperty.call(CARD_BANK, key)) continue
      if (owned[key]) continue
      if (cardHasContent(CARD_BANK[key])) out.push(key)
    }
    return out
  }

  function grantWelcomeCard(game) {
    if (!game.ownedCards) game.ownedCards = {}
    var s
    var r
    var key
    for (s = 0; s < CARD_SUITS.length; s++) {
      for (r = 0; r < CARD_RANKS.length; r++) {
        key = cardKey(CARD_SUITS[s].id, CARD_RANKS[r])
        if (!game.ownedCards[key]) {
          game.ownedCards[key] = true
          return key
        }
      }
    }
    return ''
  }

  function suitImage(images, id) {
    if (!images) return null
    if (id === 'spade') return images.cardSpade
    if (id === 'club') return images.cardClub
    if (id === 'heart') return images.cardHeart
    return images.cardDiamond || images.cardFang
  }

  var _suitTint = null
  function suitTintCanvas() {
    if (_suitTint) return _suitTint
    if (typeof document !== 'undefined') {
      _suitTint = document.createElement('canvas')
      return _suitTint
    }
    if (typeof wx !== 'undefined' && typeof wx.createOffscreenCanvas === 'function') {
      try {
        _suitTint = wx.createOffscreenCanvas({ type: '2d', width: 128, height: 128 })
        return _suitTint
      } catch (err) {}
    }
    return null
  }

  function drawSuitMark(ctx, images, id, x, y, s, color) {
    var img = suitImage(images, id)
    if (!img || !(img.width > 1) || !(img.height > 1)) return
    var col = color || CARD_INK
    var max = s * 2
    var k = Math.min(max / img.width, max / img.height)
    var dw = img.width * k
    var dh = img.height * k
    var src = img
    try {
      var off = suitTintCanvas()
      var g = off && off.getContext('2d')
      if (g) {
        var cap = 256
        var ts = Math.min(1, cap / Math.max(img.width, img.height))
        var tw = Math.max(1, Math.round(img.width * ts))
        var th = Math.max(1, Math.round(img.height * ts))
        if (off.width !== tw) off.width = tw
        if (off.height !== th) off.height = th
        g.setTransform(1, 0, 0, 1, 0, 0)
        g.globalCompositeOperation = 'source-over'
        g.clearRect(0, 0, tw, th)
        g.drawImage(img, 0, 0, tw, th)
        g.globalCompositeOperation = 'source-atop'
        g.fillStyle = col
        g.fillRect(0, 0, tw, th)
        src = off
      }
    } catch (err) {}
    ctx.drawImage(src, x - dw / 2, y - dh / 2, dw, dh)
  }

  function drawCardFish(ctx, x, y, s) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(s / 110, s / 110)
    ctx.beginPath()
    ctx.ellipse(-6, 0, 44, 27, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#c4453a'
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(2, 12, 30, 15, 0.05, 0, Math.PI * 2)
    ctx.fillStyle = '#e39b4a'
    ctx.fill()
    ctx.fillStyle = '#3a8bb8'
    ctx.beginPath()
    ctx.moveTo(32, 2)
    ctx.lineTo(64, -24)
    ctx.lineTo(50, 2)
    ctx.lineTo(64, 24)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(-10, -26)
    ctx.lineTo(14, -28)
    ctx.lineTo(2, -8)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(-2, 18)
    ctx.lineTo(16, 32)
    ctx.lineTo(8, 14)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(-28, -4, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#2a2a2a'
    ctx.fill()
    ctx.restore()
  }

  function CardAlbumScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    this.suit = 1
    this.pos = 1
    this.target = 1
    this.drag = false
    this.dragFrom = 0
    this.dragStart = 1
    this.pressed = null
    this.flip = 0
    this.flipTo = 0
    this.toast = null
    this.centerNote = null
    this.layout = this.computeLayout()
  }

  CardAlbumScene.prototype.ranks = function () {
    return CARD_RANKS
  }

  CardAlbumScene.prototype.suitId = function () {
    return CARD_SUITS[this.suit].id
  }

  CardAlbumScene.prototype.owned = function (rank) {
    var map = this.game.ownedCards || {}
    return !!map[cardKey(this.suitId(), rank)]
  }

  CardAlbumScene.prototype.info = function (rank) {
    return CARD_BANK[cardKey(this.suitId(), rank)] || null
  }

  CardAlbumScene.prototype.focusKey = function (key) {
    var parts = splitCardKey(key)
    var i
    if (!parts.suit) return
    for (i = 0; i < CARD_SUITS.length; i++) {
      if (CARD_SUITS[i].id === parts.suit) this.suit = i
    }
    i = CARD_RANKS.indexOf(parts.rank)
    if (i >= 0) {
      this.pos = i
      this.target = i
    }
    this.flip = 0
    this.flipTo = 0
  }

  CardAlbumScene.prototype.showToast = function (text) {
    this.toast = { text: text, t: 0, dur: 1.6 }
    if (isWx && typeof wx.showToast === 'function') {
      wx.showToast({ title: text, icon: 'none', duration: 1600 })
    }
  }

  CardAlbumScene.prototype.showCenterNote = function (text) {
    this.centerNote = { text: text, t: 0, dur: 2.2 }
    if (isWx && typeof wx.showToast === 'function') {
      wx.showToast({ title: text, icon: 'none', duration: 2000 })
    }
  }

  CardAlbumScene.prototype.centerRank = function () {
    var ranks = this.ranks()
    var i = Math.round(this.target != null ? this.target : this.pos)
    if (i < 0) i = 0
    if (i >= ranks.length) i = ranks.length - 1
    return ranks[i] || ''
  }

  CardAlbumScene.prototype.doRedeem = function () {
    var cost = cardRedeemCost()
    var have = this.game.capsules || 0
    var rank = this.centerRank()
    var key = rank ? cardKey(this.suitId(), rank) : ''
    var info = key ? CARD_BANK[key] : null
    if (!key) {
      this.sounds.play('tap')
      this.showToast('没有选中卡牌')
      return
    }
    if (this.owned(rank)) {
      this.sounds.play('tap')
      this.showToast('已经拥有这张卡了')
      return
    }
    if (have < cost) {
      this.sounds.play('tap')
      this.showToast('营养药丸不够，兑换需要 ' + cost + ' 颗')
      return
    }
    if (!this.game.ownedCards) this.game.ownedCards = {}
    this.game.capsules = have - cost
    this.game.ownedCards[key] = true
    this.flipTo = 0
    this.showToast(info && info.title ? '获得「' + info.title + '」' : '获得一张新卡牌')
    this.sounds.play('cardMove')
  }

  CardAlbumScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    aidPlaceBack(this.view, this.back)
    var cardH = h * 0.58
    var cardW = cardH * 0.74
    var navW = Math.min(w * 0.4, h * 0.7)
    var navH = h * 0.12
    var navY = h * 0.9
    var cy = h * 0.4
    var hintY = cy + cardH * 0.5 + h * 0.036
    var padX = navH * 0.58
    var padY = navH * 0.22
    var iconBox = navH - padY * 2
    var inner = navW - padX * 2
    var gap = inner / CARD_SUITS.length
    var navLeft = w / 2 - navW / 2
    var suits = []
    var i
    for (i = 0; i < CARD_SUITS.length; i++) {
      suits.push({
        id: CARD_SUITS[i].id,
        x: navLeft + padX + gap * (i + 0.5),
        y: navY,
        s: iconBox / 2
      })
    }
    var padR = h * 0.03
    var padB = h * 0.038
    var pillH = h * 0.068
    var pillW = h * 0.26
    var btnH = h * 0.082
    var btnW = h * 0.26
    var stackGap = h * 0.01
    var btnX = w - padR - btnW
    var btnY = h - padB - btnH
    var pillX = btnX
    var pillY = btnY - stackGap - pillH
    return {
      cardW: cardW,
      cardH: cardH,
      cx: w / 2,
      cy: cy,
      stride: cardW * 1.12,
      hintY: hintY,
      nav: { x: w / 2, y: navY, w: navW, h: navH },
      suits: suits,
      pills: { x: pillX, y: pillY, w: pillW, h: pillH },
      redeem: { x: btnX, y: btnY, w: btnW, h: btnH }
    }
  }

  CardAlbumScene.prototype.update = function (dt) {
    this.layout = this.computeLayout()
    if (!this.drag) {
      this.pos += (this.target - this.pos) * Math.min(1, dt * 12)
      if (Math.abs(this.pos - this.target) < 0.002) this.pos = this.target
    }
    this.flip += (this.flipTo - this.flip) * Math.min(1, dt * 11)
    if (Math.abs(this.flip - this.flipTo) < 0.01) this.flip = this.flipTo
    if (this.toast) {
      this.toast.t += dt
      if (this.toast.t >= this.toast.dur) this.toast = null
    }
    if (this.centerNote) {
      this.centerNote.t += dt
      if (this.centerNote.t >= this.centerNote.dur) this.centerNote = null
    }
  }

  CardAlbumScene.prototype.drawBg = function (ctx, w, h) {
    ctx.fillStyle = CARD_BG
    ctx.fillRect(0, 0, w, h)
    var bg = this.images.cardBg
    if (bg) drawCover(ctx, bg, 0, 0, w, h)
  }

  CardAlbumScene.prototype.drawCorners = function (ctx, w, h, rank, suit, color) {
    var fs = rank === '10' ? Math.round(h * 0.09) : Math.round(h * 0.105)
    var sx = w * 0.16
    var sy = h * 0.05
    var markY = h * 0.2
    var markS = h * 0.048
    ctx.fillStyle = color
    ctx.font = uiFont(fs)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(rank, sx, sy)
    drawSuitMark(ctx, this.images, suit, sx, markY, markS, color)
    ctx.save()
    ctx.translate(w, h)
    ctx.rotate(Math.PI)
    ctx.font = uiFont(fs)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(rank, sx, sy)
    drawSuitMark(ctx, this.images, suit, sx, markY, markS, color)
    ctx.restore()
  }

  CardAlbumScene.prototype.artImage = function (info) {
    if (!info) return null
    var imgs = this.images || {}
    var img = (info.artId && imgs[info.artId]) || (info.art && imgs[info.art]) || null
    if (img && img.width > 1) return img
    if (info.art === 'fish' && imgs.cardFish && imgs.cardFish.width > 1) return imgs.cardFish
    return null
  }

  CardAlbumScene.prototype.drawArt = function (ctx, info, x, y, s) {
    if (!info) return
    var img = this.artImage(info)
    if (img) {
      var box = imageContentBox(img)
      var srcW = Math.max(1, box.w)
      var srcH = Math.max(1, box.h)
      var k = Math.min(s / srcW, (s * 0.88) / srcH)
      var dw = srcW * k
      var dh = srcH * k
      ctx.drawImage(img, box.x, box.y, srcW, srcH, x - dw / 2, y - dh / 2, dw, dh)
      return
    }
    if (info.art === 'fish') drawCardFish(ctx, x, y, s * 0.7)
  }

  CardAlbumScene.prototype.drawFront = function (ctx, w, h, rank, owned) {
    var suit = this.suitId()
    var r = h * 0.06
    var info = this.info(rank)
    var art = this.artImage(info)
    if (!owned) fillRoundRect(ctx, 0, 0, w, h, r, CARD_LOCKED)
    else fillRoundRect(ctx, 0, 0, w, h, r, '#ffffff')
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0
    ctx.save()
    roundRect(ctx, 0, 0, w, h, r)
    ctx.clip()
    this.drawCorners(ctx, w, h, rank, suit, CARD_INK)
    if (owned && art) {
      this.drawArt(ctx, info, w / 2, h * 0.52, h * 0.46)
    } else if (!owned) {
      ctx.fillStyle = '#4a4a4a'
      ctx.font = uiFont(Math.round(h * 0.28))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('?', w / 2, h * 0.5)
    }
    ctx.restore()
  }

  CardAlbumScene.prototype.drawBack = function (ctx, w, h, rank) {
    var info = this.info(rank)
    var empty = !cardHasContent(info)
    var r = h * 0.06
    fillRoundRect(ctx, 0, 0, w, h, r, '#ffffff')
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0
    ctx.save()
    roundRect(ctx, 0, 0, w, h, r)
    ctx.clip()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (empty) {
      this.drawCorners(ctx, w, h, rank, this.suitId(), CARD_INK)
      ctx.restore()
      return
    }
    this.drawArt(ctx, info, w / 2, h * 0.28, h * 0.28)
    ctx.fillStyle = CARD_INK
    ctx.font = uiFont(Math.round(h * 0.09))
    ctx.fillText(info.title || '', w / 2, h * 0.5)
    ctx.fillStyle = '#333333'
    ctx.font = uiFont(Math.round(h * 0.055))
    var lines = wrapText(ctx, info.desc || '', w * 0.78)
    var i
    for (i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], w / 2, h * 0.62 + i * h * 0.075)
    }
    ctx.restore()
  }

  CardAlbumScene.prototype.drawOne = function (ctx, rank, x, y, w, h, rot, scale, flipU) {
    var owned = this.owned(rank)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    ctx.scale(scale, scale)
    var sx = Math.cos(flipU * Math.PI)
    ctx.scale(Math.max(0.02, Math.abs(sx)), 1)
    ctx.translate(-w / 2, -h / 2)
    ctx.shadowColor = 'rgba(40,60,55,0.18)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 8
    if (sx >= 0) this.drawFront(ctx, w, h, rank, owned)
    else this.drawBack(ctx, w, h, rank)
    ctx.restore()
  }

  CardAlbumScene.prototype.drawHint = function (ctx, L, h) {
    var ranks = this.ranks()
    var idx = Math.round(this.pos)
    var rank = ranks[idx]
    if (!rank || this.flipTo > 0.5) return
    ctx.save()
    ctx.fillStyle = CARD_MUTED
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (!this.owned(rank)) {
      ctx.font = uiFont(Math.round(h * 0.022))
      ctx.fillText('还未获得这张卡', L.cx, L.hintY)
      ctx.restore()
      return
    }
    if (!cardHasContent(this.info(rank))) {
      ctx.restore()
      return
    }
    ctx.font = uiFont(Math.round(h * 0.026))
    ctx.strokeStyle = CARD_MUTED
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(L.cx - h * 0.16, L.hintY, h * 0.014, Math.PI * 0.15, Math.PI * 1.35)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(L.cx - h * 0.16, L.hintY, h * 0.014, Math.PI * 1.15, Math.PI * 0.35)
    ctx.stroke()
    ctx.fillText('翻转查看背面内容', L.cx + h * 0.02, L.hintY)
    ctx.restore()
  }

  CardAlbumScene.prototype.drawNav = function (ctx, L, h) {
    var n = L.nav
    fillRoundRect(ctx, n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, n.h / 2, '#ffffff')
    var i
    for (i = 0; i < L.suits.length; i++) {
      var s = L.suits[i]
      var on = this.pressed === 'suit:' + i
      var col = i === this.suit ? CARD_SEL : CARD_INK
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.scale(on ? 0.92 : 1, on ? 0.92 : 1)
      drawSuitMark(ctx, this.images, s.id, 0, 0, s.s, col)
      ctx.restore()
    }
  }

  CardAlbumScene.prototype.drawPills = function (ctx, L) {
    var box = L.pills
    var img = this.images.iconCapsule
    var n = this.game.capsules || 0
    fillRoundRect(ctx, box.x, box.y, box.w, box.h, box.h / 2, '#ffffff')
    if (img) drawContain(ctx, img, box.x + box.h * 0.58, box.y + box.h / 2, box.h * 0.78, box.h * 0.78)
    ctx.fillStyle = '#c17a3a'
    ctx.font = uiFont(Math.round(box.h * 0.42), 'bold')
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    var tx = box.x + box.w - box.h * 0.28
    var ty = box.y + box.h / 2 + 1
    ctx.fillText(String(n), tx, ty)
    ctx.fillText(String(n), tx + 0.7, ty)
  }

  CardAlbumScene.prototype.drawRedeem = function (ctx, L) {
    var b = L.redeem
    var on = this.pressed === 'redeem'
    ctx.save()
    ctx.translate(b.x + b.w / 2, b.y + b.h / 2)
    ctx.scale(on ? 0.94 : 1, on ? 0.94 : 1)
    fillRoundRect(ctx, -b.w / 2, -b.h / 2, b.w, b.h, b.h / 2, on ? '#c43a32' : AID_RED)
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = uiFont(Math.round(b.h * 0.4))
    ctx.fillText('兑换', 0, -b.h * 0.1)
    ctx.font = uiFont(Math.round(b.h * 0.24))
    ctx.globalAlpha = 0.92
    ctx.fillText(String(cardRedeemCost()) + ' 药丸', 0, b.h * 0.26)
    ctx.restore()
  }

  CardAlbumScene.prototype.drawToast = function (ctx, w, h) {
    if (!this.toast) return
    var toastH = Math.max(30, h * 0.085)
    ctx.save()
    ctx.globalAlpha = Math.min(1, this.toast.t * 1.5)
    fillRoundRect(ctx, w / 2 - h * 0.4, h * 0.11, h * 0.8, toastH, 16, 'rgba(40,40,40,0.84)')
    ctx.fillStyle = '#ffffff'
    ctx.font = uiFont(Math.round(h * 0.032))
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.toast.text, w / 2, h * 0.11 + toastH / 2)
    ctx.restore()
  }

  CardAlbumScene.prototype.drawCenterNote = function (ctx, w, h) {
    var note = this.centerNote
    if (!note) return
    var u = note.t / note.dur
    var alpha = u < 0.1 ? u / 0.1 : u > 0.78 ? Math.max(0, (1 - u) / 0.22) : 1
    if (alpha <= 0) return
    var fontPx = Math.max(18, Math.round(h * 0.036))
    ctx.save()
    ctx.globalAlpha = 0.94 * alpha
    ctx.font = uiFont(fontPx)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    var tw = ctx.measureText(note.text).width
    var bw = Math.min(w * 0.72, tw + h * 0.08)
    var bh = fontPx + h * 0.05
    fillRoundRect(ctx, w / 2 - bw / 2, h * 0.4 - bh / 2, bw, bh, bh / 2, 'rgba(40,40,40,0.88)')
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = alpha
    ctx.fillText(note.text, w / 2, h * 0.4)
    ctx.restore()
  }

  CardAlbumScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var ranks = this.ranks()
    this.drawBg(ctx, w, h)
    var i
    var order = []
    for (i = 0; i < ranks.length; i++) {
      var t = i - this.pos
      if (Math.abs(t) > 2.1) continue
      order.push(i)
    }
    order.sort(function (a, b) {
      return Math.abs(b - this.pos) - Math.abs(a - this.pos)
    }.bind(this))
    for (i = 0; i < order.length; i++) {
      var idx = order[i]
      var u = idx - this.pos
      var x = L.cx + u * L.stride
      var sc = lerp(0.76, 1, Math.max(0, 1 - Math.abs(u)))
      var rot = u * 0.22
      var fl = Math.abs(u) < 0.45 ? this.flip : 0
      this.drawOne(ctx, ranks[idx], x, L.cy, L.cardW, L.cardH, rot, sc, fl)
    }
    this.drawHint(ctx, L, h)
    this.drawNav(ctx, L, h)
    this.drawPills(ctx, L)
    this.drawRedeem(ctx, L)
    this.back.draw(ctx)
    this.drawToast(ctx, w, h)
    this.drawCenterNote(ctx, w, h)
  }

  CardAlbumScene.prototype.hit = function (x, y) {
    var L = this.layout
    var i
    if (this.back.hit(x, y)) return 'back'
    if (hitBox(x, y, L.redeem.x, L.redeem.y, L.redeem.w, L.redeem.h, 4)) return 'redeem'
    if (hitBox(x, y, L.pills.x, L.pills.y, L.pills.w, L.pills.h, 4)) return 'pills'
    for (i = 0; i < L.suits.length; i++) {
      var s = L.suits[i]
      if (hitCircle(x, y, s.x, s.y, s.s * 1.6, 8)) return 'suit:' + i
    }
    if (hitRect(x, y, L.cx, L.cy, L.cardW * 0.92, L.cardH * 0.92, 8)) return 'card'
    return 'swipe'
  }

  CardAlbumScene.prototype.onDown = function (x, y) {
    this.pressed = this.hit(x, y)
    this.back.pressed = this.pressed === 'back'
    var startDrag = this.pressed === 'card' || this.pressed === 'swipe'
    this.drag = startDrag
    this.dragFrom = x
    this.dragStart = this.pos
  }

  CardAlbumScene.prototype.onMove = function (x) {
    if (!this.drag) return
    this.pos = clamp(this.dragStart - (x - this.dragFrom) / this.layout.stride, 0, this.ranks().length - 1)
    if (Math.abs(x - this.dragFrom) > 12) this.flipTo = 0
  }

  CardAlbumScene.prototype.onUp = function (x, y) {
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    var dx = x - this.dragFrom
    var dragged = this.drag && Math.abs(dx) > this.view.height * 0.04
    this.drag = false
    if (dragged) {
      this.target = clamp(Math.round(this.pos), 0, this.ranks().length - 1)
      this.flipTo = 0
      return
    }
    this.target = clamp(Math.round(this.pos), 0, this.ranks().length - 1)
    this.pos = this.target
    if (!id || this.hit(x, y) !== id) return
    if (id === 'swipe' || id === 'pills') return
    this.sounds.unlock()
    if (id === 'redeem') {
      this.doRedeem()
      return
    }
    if (id === 'card') {
      var rank = this.ranks()[this.target]
      if (this.owned(rank)) {
        this.sounds.play('cardMove')
        this.flipTo = this.flipTo > 0.5 ? 0 : 1
      }
      return
    }
    this.sounds.play('tap')
    if (id === 'back') {
      this.game.go('play')
      return
    }
    if (id.indexOf('suit:') === 0) {
      this.suit = parseInt(id.slice(5), 10)
      this.flipTo = 0
      this.flip = 0
    }
  }

  function liveMedals() {
    var out = []
    var i
    for (i = 0; i < MEDAL_ITEMS.length; i++) {
      if (MEDAL_ITEMS[i] && MEDAL_ITEMS[i].on !== false) out.push(MEDAL_ITEMS[i])
    }
    return out
  }

  function medalToneColor(tone) {
    if (tone === 'gold') return { face: '#f0b429', edge: '#d49a14' }
    if (tone === 'bronze') return { face: '#c47a4a', edge: '#9a5a32' }
    return { face: '#c8c8c8', edge: '#9a9a9a' }
  }

  function drawMedalShape(ctx, x, y, s, tone) {
    var c = medalToneColor(tone)
    ctx.save()
    ctx.translate(x, y)
    ctx.strokeStyle = '#c4453a'
    ctx.lineWidth = s * 0.045
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(-s * 0.18, -s * 0.48)
    ctx.lineTo(0, -s * 0.18)
    ctx.lineTo(s * 0.18, -s * 0.48)
    ctx.stroke()
    ctx.fillStyle = c.edge
    ctx.beginPath()
    ctx.ellipse(0, s * 0.22, s * 0.32, s * 0.12, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = c.face
    ctx.beginPath()
    ctx.arc(0, s * 0.08, s * 0.32, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    var i
    var r = s * 0.13
    for (i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * Math.PI * 0.4
      var b = a + Math.PI * 0.2
      if (i === 0) ctx.moveTo(Math.cos(a) * r, s * 0.08 + Math.sin(a) * r)
      else ctx.lineTo(Math.cos(a) * r, s * 0.08 + Math.sin(a) * r)
      ctx.lineTo(Math.cos(b) * r * 0.42, s * 0.08 + Math.sin(b) * r * 0.42)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  function MedalAlbumScene(game) {
    this.game = game
    this.view = game.view
    this.images = game.images
    this.sounds = game.sounds
    this.back = new BackBtn(0, 0, this.view.height * 0.042)
    var items = liveMedals()
    var start = 0
    var i
    for (i = 0; i < items.length; i++) {
      if (items[i].id === 'guard') start = i
    }
    this.pos = start
    this.target = start
    this.drag = false
    this.dragFrom = 0
    this.dragStart = start
    this.pressed = null
    this.flip = 0
    this.flipTo = 0
    this.layout = this.computeLayout()
  }

  MedalAlbumScene.prototype.items = function () {
    return liveMedals()
  }

  MedalAlbumScene.prototype.owned = function (item) {
    var map = this.game.ownedMedals || {}
    return !!(item && map[item.id])
  }

  MedalAlbumScene.prototype.computeLayout = function () {
    var w = this.view.width
    var h = this.view.height
    aidPlaceBack(this.view, this.back)
    var medalH = h * 0.52
    var medalW = medalH * 0.8
    var cy = h * 0.4
    return {
      medalW: medalW,
      medalH: medalH,
      cx: w / 2,
      cy: cy,
      stride: medalW * 0.92,
      nameY: cy + medalH * 0.48,
      hintY: cy + medalH * 0.48 + h * 0.055
    }
  }

  MedalAlbumScene.prototype.update = function (dt) {
    this.layout = this.computeLayout()
    if (!this.drag) {
      this.pos += (this.target - this.pos) * Math.min(1, dt * 12)
      if (Math.abs(this.pos - this.target) < 0.002) this.pos = this.target
    }
    this.flip += (this.flipTo - this.flip) * Math.min(1, dt * 11)
    if (Math.abs(this.flip - this.flipTo) < 0.01) this.flip = this.flipTo
  }

  MedalAlbumScene.prototype.medalImage = function (item) {
    if (!item) return null
    if (item.icon && this.images[item.icon]) return this.images[item.icon]
    if (item.tone === 'gold') return this.images.medalGold
    if (item.tone === 'bronze') return this.images.medalBronze
    return this.images.medalSilver
  }

  MedalAlbumScene.prototype.drawOne = function (ctx, item, x, y, w, h, rot, scale, flipU) {
    var owned = this.owned(item)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rot)
    ctx.scale(scale, scale)
    var sx = Math.cos(flipU * Math.PI)
    ctx.scale(Math.max(0.02, Math.abs(sx)), 1)
    if (sx >= 0) {
      var img = this.medalImage(item)
      ctx.globalAlpha = owned ? 1 : 0.38
      if (img) drawContain(ctx, img, 0, 0, w, h)
      else drawMedalShape(ctx, 0, 0, h * 0.42, item.tone || 'silver')
      if (!owned) {
        ctx.globalAlpha = 1
        ctx.fillStyle = '#4a4a4a'
        ctx.font = uiFont(Math.round(h * 0.18))
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('?', 0, h * 0.08)
      }
    } else {
      fillRoundRect(ctx, -w * 0.42, -h * 0.38, w * 0.84, h * 0.76, h * 0.06, '#ffffff')
      ctx.fillStyle = MEDAL_INK
      ctx.font = uiFont(Math.round(h * 0.08))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(item.title || '', 0, -h * 0.12)
      ctx.fillStyle = '#333333'
      ctx.font = uiFont(Math.round(h * 0.05))
      var lines = wrapText(ctx, item.desc || '暂无说明', w * 0.7)
      var i
      for (i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 0, h * 0.04 + i * h * 0.07)
      }
    }
    ctx.restore()
  }

  MedalAlbumScene.prototype.draw = function () {
    var ctx = this.view.ctx
    var w = this.view.width
    var h = this.view.height
    var L = this.layout
    var items = this.items()
    var bg = this.images.medalBg
    if (bg) drawCover(ctx, bg, 0, 0, w, h)
    else {
      ctx.fillStyle = '#ffe8ec'
      ctx.fillRect(0, 0, w, h)
    }
    var i
    var order = []
    for (i = 0; i < items.length; i++) {
      if (Math.abs(i - this.pos) > 2.1) continue
      order.push(i)
    }
    order.sort(function (a, b) {
      return Math.abs(b - this.pos) - Math.abs(a - this.pos)
    }.bind(this))
    for (i = 0; i < order.length; i++) {
      var idx = order[i]
      var u = idx - this.pos
      var x = L.cx + u * L.stride
      var sc = lerp(0.72, 1, Math.max(0, 1 - Math.abs(u)))
      var rot = u * 0.16
      var fl = Math.abs(u) < 0.45 ? this.flip : 0
      this.drawOne(ctx, items[idx], x, L.cy, L.medalW, L.medalH, rot, sc, fl)
    }
    var cur = items[Math.round(this.pos)]
    if (cur && this.flipTo < 0.5) {
      ctx.fillStyle = MEDAL_INK
      ctx.font = uiFont(Math.round(h * 0.036))
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(cur.title || '', L.cx, L.nameY)
      ctx.fillStyle = MEDAL_MUTED
      ctx.font = uiFont(Math.round(h * 0.022))
      ctx.fillText(this.owned(cur) ? '翻转查看获得条件' : '还未获得这枚徽章', L.cx, L.hintY)
    }
    this.back.draw(ctx)
  }

  MedalAlbumScene.prototype.hit = function (x, y) {
    var L = this.layout
    if (this.back.hit(x, y)) return 'back'
    if (hitRect(x, y, L.cx, L.cy, L.medalW * 0.9, L.medalH * 0.9, 8)) return 'medal'
    return 'swipe'
  }

  MedalAlbumScene.prototype.onDown = function (x, y) {
    this.pressed = this.hit(x, y)
    this.back.pressed = this.pressed === 'back'
    this.drag = this.pressed === 'medal' || this.pressed === 'swipe'
    this.dragFrom = x
    this.dragStart = this.pos
  }

  MedalAlbumScene.prototype.onMove = function (x) {
    if (!this.drag) return
    this.pos = clamp(this.dragStart - (x - this.dragFrom) / this.layout.stride, 0, Math.max(0, this.items().length - 1))
    if (Math.abs(x - this.dragFrom) > 12) this.flipTo = 0
  }

  MedalAlbumScene.prototype.onUp = function (x, y) {
    this.back.pressed = false
    var id = this.pressed
    this.pressed = null
    var dx = x - this.dragFrom
    var last = Math.max(0, this.items().length - 1)
    var dragged = this.drag && Math.abs(dx) > this.view.height * 0.04
    this.drag = false
    if (dragged) {
      this.target = clamp(Math.round(this.pos), 0, last)
      this.sounds.unlock()
      this.sounds.play('cardMove')
      this.flipTo = 0
      return
    }
    this.target = clamp(Math.round(this.pos), 0, last)
    this.pos = this.target
    if (!id || this.hit(x, y) !== id) return
    if (id === 'swipe') return
    this.sounds.unlock()
    if (id === 'medal') {
      var item = this.items()[this.target]
      if (this.owned(item)) {
        this.sounds.play('cardMove')
        this.flipTo = this.flipTo > 0.5 ? 0 : 1
      }
      return
    }
    this.sounds.play('tap')
    if (id === 'back') {
      this.game.go('play')
    }
  }

  function Game(view, images, sounds) {
    this.view = view
    this.images = images
    this.sounds = sounds
    this.finePointer = detectFinePointer()
    this.scene = null
    this.hubLook = null
    this.nickname = ''
    this.coins = 0
    this.capsules = 0
    this.nutrients = emptyNutrients()
    this.ownedItems = {}
    this.favItems = {}
    this.ownedFood = {}
    this.favFood = {}
    this.foodBag = []
    this.foodSeq = 0
    this.foodBonus = {}
    this.hubGuideDone = false
    this.hubGuideStep = 0
    this.welcomeGiftDone = false
    this.timedClear = { cpr: false, aed: false }
    this.equipped = { clothes: '', glasses: '', shoes: '' }
    this.ownedCards = {}
    var ck
    for (ck in CARD_OWNED_DEFAULTS) {
      if (CARD_OWNED_DEFAULTS[ck]) this.ownedCards[ck] = true
    }
    this.planProgress = {}
    this.ownedMedals = {}
    var mk
    for (mk in MEDAL_OWNED_DEFAULTS) {
      if (MEDAL_OWNED_DEFAULTS[mk]) this.ownedMedals[mk] = true
    }
    this.go('home')
  }

  Game.prototype.ensureHubDemo = function () {
    if (!this.nickname) this.nickname = '大心脏'
    if (!this.hubLook) {
      this.hubLook = {
        hatIds: ['apple', 'carrot'],
        darkAlpha: 0.55,
        leftBottle: false,
        holdBottle: true,
        cigCount: 0,
        smile: true,
        sparkle: false,
        shoeId: 'slipper'
      }
    }
    if (this.coins == null) this.coins = 0
    if (this.capsules == null) this.capsules = 0
    if (!this.nutrients) this.nutrients = emptyNutrients()
    if (!this.ownedItems) this.ownedItems = {}
    if (!this.favItems) this.favItems = {}
    if (!this.ownedFood) this.ownedFood = {}
    if (!this.favFood) this.favFood = {}
    if (!this.foodBag) this.foodBag = []
    if (!this.foodSeq) this.foodSeq = 0
    if (!this.foodBonus) this.foodBonus = {}
    if (this.hubGuideDone == null) this.hubGuideDone = false
    if (this.hubGuideStep == null) this.hubGuideStep = 0
    if (this.welcomeGiftDone == null) this.welcomeGiftDone = false
    if (!this.timedClear) this.timedClear = { cpr: false, aed: false }
    if (!this.equipped) this.equipped = { clothes: '', glasses: '', shoes: '' }
    if (!this.ownedCards) {
      this.ownedCards = {}
      var dk
      for (dk in CARD_OWNED_DEFAULTS) {
        if (CARD_OWNED_DEFAULTS[dk]) this.ownedCards[dk] = true
      }
    }
    if (!this.planProgress) this.planProgress = {}
    if (!this.ownedMedals) {
      this.ownedMedals = {}
      var mk
      for (mk in MEDAL_OWNED_DEFAULTS) {
        if (MEDAL_OWNED_DEFAULTS[mk]) this.ownedMedals[mk] = true
      }
    }
  }

  Game.prototype.bgmFor = function (name) {
    if (name === 'home' || name === 'play' || name === 'settings' || name === 'wardrobe' || name === 'shop') return 'bgHome'
    if (name === 'quiz' || name === 'rapid') return 'bgQuiz'
    if (name === 'aidPlay' || name === 'aid' || name === 'levels' || name === 'timed') return 'bgAid'
    return ''
  }

  Game.prototype.syncBgm = function (name) {
    if (!this.sounds) return
    if (name === 'quiz') this.sounds.stop('step')
    var id = this.bgmFor(name)
    if (id) this.sounds.playBgm(id)
    else this.sounds.stopBgm()
  }

  Game.prototype.go = function (name) {
    if (this.scene && this.scene.stopNickEdit) this.scene.stopNickEdit()
    if (this.sounds) this.sounds.stop('step')
    if (name === 'quiz') this.scene = new QuizScene(this)
    else if (name === 'rapid') this.scene = new RapidQuizScene(this)
    else if (name === 'settings') this.scene = new SettingsScene(this)
    else if (name === 'play') this.scene = new PlayHomeScene(this)
    else if (name === 'wardrobe') this.scene = new StoreScene(this, WARDROBE_SPEC)
    else if (name === 'shop') this.scene = new StoreScene(this, SHOP_SPEC)
    else if (name === 'cards') this.scene = new CardAlbumScene(this)
    else if (name === 'plan') this.scene = new PlanScene(this)
    else if (name === 'medal') this.scene = new MedalAlbumScene(this)
    else if (name === 'levels') this.scene = new LevelSelectScene(this)
    else if (name === 'timed') {
      this.scene = new LevelSelectScene(this, {
        levels: TIMED_LEVELS,
        title: '限时模拟',
        backTo: 'play',
        pickKey: 'timedId',
        onStart: function (game, level) {
          game.timedId = level.id
          game.aidCprOnly = true
          game.aidLevelId = level.id === 'aed' ? 'office' : 'home'
          game.go('aidPlay')
        }
      })
    }
    else if (name === 'aid') this.scene = new AidBriefScene(this)
    else if (name === 'aidPlay') this.scene = new FirstAidScene(this)
    else this.scene = new HomeScene(this)
    this.syncBgm(name)
  }

  Game.prototype.nutrientGainBonus = function (nutrientId) {
    var want = nutrientId === 'magnesium' ? 'mag' : nutrientId
    var sum = 0
    var eq = this.equipped || {}
    var slots = ['clothes', 'glasses', 'shoes']
    var i
    var it
    for (i = 0; i < slots.length; i++) {
      it = wardrobeItem(eq[slots[i]])
      if (it && it.bonusKey === want) sum += it.bonus || 0
    }
    if (this.foodBonus && this.foodBonus[want]) sum += this.foodBonus[want]
    return sum
  }

  Game.prototype.addFood = function (itemId) {
    if (!itemId) return false
    if (!this.foodBag) this.foodBag = []
    if (this.foodBag.length >= FOOD_BAG_MAX) return false
    this.foodSeq = (this.foodSeq || 0) + 1
    this.foodBag.push({ id: itemId, uid: this.foodSeq })
    return true
  }

  Game.prototype.removeFood = function (uid) {
    if (!this.foodBag) return null
    var i
    for (i = 0; i < this.foodBag.length; i++) {
      if (this.foodBag[i].uid === uid) return this.foodBag.splice(i, 1)[0]
    }
    return null
  }

  Game.prototype.eatShopFood = function (item) {
    if (!item) return
    var bonus = item.bonus || 0
    if (bonus > 0) this.applyNutrientGain(item.bonusKey, bonus)
    if (item.cat === 'produce') markPlanDone(this, 'fruit')
    if (item.id === 'water' || item.cat === 'drink') markPlanDone(this, 'water')
  }

  Game.prototype.magGainBonus = function () {
    return this.nutrientGainBonus('magnesium')
  }

  Game.prototype.applyNutrientGain = function (nutrientId, amount) {
    if (nutrientId === 'mag') nutrientId = 'magnesium'
    if (!nutrientId || !amount) return 0
    var got = amount * (1 + this.nutrientGainBonus(nutrientId))
    if (!this.nutrients) this.nutrients = emptyNutrients()
    this.nutrients[nutrientId] = (this.nutrients[nutrientId] || 0) + got
    return got
  }

  Game.prototype.tick = function (dt) {
    if (this.scene.update) this.scene.update(dt)
    this.scene.draw()
  }

  function bindInput(canvas, game, view) {
    function pointFromTouch(t) {
      if (isWx) return { x: t.clientX, y: t.clientY }
      var rect = canvas.getBoundingClientRect()
      return {
        x: ((t.clientX - rect.left) / rect.width) * view.width,
        y: ((t.clientY - rect.top) / rect.height) * view.height
      }
    }

    function down(p, id) {
      if (game.scene.onDown) game.scene.onDown(p.x, p.y, id)
    }
    function move(p, id) {
      if (game.scene.onMove) game.scene.onMove(p.x, p.y, id)
    }
    function up(p, id) {
      if (game.scene.onUp) game.scene.onUp(p.x, p.y, id)
    }

    function eachTouch(e, fn) {
      var list = e.changedTouches || []
      var i
      for (i = 0; i < list.length; i++) {
        fn(pointFromTouch(list[i]), list[i].identifier)
      }
    }

    if (isWx) {
      try {
        if (wx.getSystemInfoSync().platform === 'devtools') game.finePointer = true
      } catch (err) {}
      wx.onTouchStart(function (e) { eachTouch(e, down) })
      wx.onTouchMove(function (e) { eachTouch(e, move) })
      wx.onTouchEnd(function (e) { eachTouch(e, up) })
      wx.onTouchCancel(function (e) { eachTouch(e, up) })
      if (typeof wx.onKeyboardInput === 'function') {
        wx.onKeyboardInput(function (res) {
          var s = game.scene
          if (s && s.nickFocus) {
            s.nickname = Array.from(String(res.value || '')).slice(0, NICK_MAX).join('')
          }
        })
      }
      if (typeof wx.onKeyboardComplete === 'function') {
        wx.onKeyboardComplete(function (res) {
          var s = game.scene
          if (!s) return
          if (res && res.value != null) s.nickname = Array.from(String(res.value)).slice(0, NICK_MAX).join('')
          s.nickFocus = false
        })
      }
      return
    }

    canvas.addEventListener('contextmenu', function (e) { e.preventDefault() })
    canvas.addEventListener('pointerdown', function (e) {
      e.preventDefault()
      markPointerKind(game, e.pointerType)
      try { canvas.setPointerCapture(e.pointerId) } catch (err) {}
      down(pointFromTouch(e), e.pointerId)
    })
    canvas.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse' && e.buttons === 0) return
      move(pointFromTouch(e), e.pointerId)
    })
    canvas.addEventListener('pointerup', function (e) {
      up(pointFromTouch(e), e.pointerId)
    })
    canvas.addEventListener('pointercancel', function (e) {
      up(pointFromTouch(e), e.pointerId)
    })
    canvas.addEventListener('mousedown', function (e) {
      if (window.PointerEvent) return
      e.preventDefault()
      game.finePointer = true
      down(pointFromTouch(e), 1)
    })
    canvas.addEventListener('mousemove', function (e) {
      if (window.PointerEvent || !(e.buttons & 1)) return
      move(pointFromTouch(e), 1)
    })
    canvas.addEventListener('mouseup', function (e) {
      if (window.PointerEvent) return
      up(pointFromTouch(e), 1)
    })
  }

  function loadSubpackages() {
    if (!isWx || typeof wx.loadSubpackage !== 'function') return Promise.resolve()
    var names = ['image', 'godot', 'audio']
    return Promise.all(names.map(function (name) {
      return new Promise(function (resolve, reject) {
        wx.loadSubpackage({
          name: name,
          success: function () { resolve() },
          fail: function (err) { reject(err || new Error('load ' + name)) }
        })
      })
    }))
  }

  function showBootFail(view, err) {
    console.error(err)
    var ctx = view.ctx
    ctx.fillStyle = COLORS.wall
    ctx.fillRect(0, 0, view.width, view.height)
    ctx.fillStyle = COLORS.fill
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('资源加载失败', view.width / 2, view.height / 2)
  }

  function replaceList(target, next) {
    if (!next || typeof next.length !== 'number') return
    target.length = 0
    var i
    for (i = 0; i < next.length; i++) target.push(next[i])
  }

  function addContentAsset(id, src) {
    if (!id || !src) return
    src = String(src).split('?')[0]
    var i
    for (i = 0; i < ASSET_LIST.length; i++) {
      if (ASSET_LIST[i].id === id) {
        ASSET_LIST[i].src = src
        ASSET_LIST[i].optional = true
        return
      }
    }
    ASSET_LIST.push({ id: id, src: src, optional: true })
  }

  function bindStoreItemAssets(items) {
    var i
    var it
    if (!items) return
    for (i = 0; i < items.length; i++) {
      it = items[i]
      if (!it) continue
      if (!it.icon && it.id) it.icon = it.id
      var src = it.iconSrc || ''
      var placeholder = !!it.placeholder || !src || src.indexOf('placeholder') !== -1
      if (it.iconSrc && !it.wearSrc && !placeholder) it.wearSrc = it.iconSrc
      if (!it.wear && it.icon) it.wear = it.icon
      if (it.icon && it.iconSrc) addContentAsset(it.icon, it.iconSrc)
      if (it.wear && it.wearSrc) {
        if (it.wear === it.icon && it.wearSrc !== it.iconSrc) it.wear = (it.id || it.icon) + '_wear'
        addContentAsset(it.wear, it.wearSrc)
      }
    }
  }

  function publishedItems(list) {
    var out = []
    var i
    if (!list) return out
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].on !== false) out.push(list[i])
    }
    return out
  }

  function applyStorePack(spec, pack) {
    if (!pack) return
    if (pack.cats && pack.cats.length) replaceList(spec.cats, pack.cats)
    if (pack.items) replaceList(spec.items, publishedItems(pack.items))
    bindStoreItemAssets(pack.items || [])
    if (pack.talk) spec.talk = pack.talk
    if (pack.defaultCat) spec.defaultCat = pack.defaultCat
    if (pack.defaultItem) spec.defaultItem = pack.defaultItem
    if (spec.defaultItem && !storeItem(spec.items, spec.defaultItem) && spec.items[0]) {
      spec.defaultItem = spec.items[0].id
      spec.defaultCat = spec.items[0].cat || spec.defaultCat
    }
  }

  function applyContentPack(pack) {
    if (!pack) return
    if (pack.shop) applyStorePack(SHOP_SPEC, pack.shop)
    if (pack.wardrobe) applyStorePack(WARDROBE_SPEC, pack.wardrobe)
    if (pack.cards) {
      var src = pack.cards.cards || {}
      var lib = pack.cards.library || []
      var next = {}
      var owned = {}
      var key
      var li
      var cost = Number(pack.cards.cost)
      if (cost && cost >= 1) CARD_REDEEM_COST = Math.round(cost)
      function ingestCard(slot, info) {
        if (!slot || !info) return
        var entry = {
          title: info.title || '',
          desc: info.desc || '',
          art: info.art || ''
        }
        var artKey = info.id || slot
        if (info.artSrc) {
          entry.artId = 'cardArt_' + String(artKey).replace(/[^a-z0-9]+/gi, '_')
          addContentAsset(entry.artId, info.artSrc)
        } else if (info.art === 'fish') {
          entry.artId = 'cardFish'
        }
        if (entry.title || entry.desc || entry.art || entry.artId) next[slot] = entry
        if (info.owned) owned[slot] = true
      }
      for (key in src) {
        if (!Object.prototype.hasOwnProperty.call(src, key)) continue
        ingestCard(key, src[key])
      }
      for (li = 0; li < lib.length; li++) {
        if (lib[li] && lib[li].slot) ingestCard(lib[li].slot, lib[li])
      }
      for (key in CARD_BANK) {
        if (Object.prototype.hasOwnProperty.call(CARD_BANK, key)) delete CARD_BANK[key]
      }
      for (key in next) {
        if (Object.prototype.hasOwnProperty.call(next, key)) CARD_BANK[key] = next[key]
      }
      for (key in CARD_OWNED_DEFAULTS) {
        if (Object.prototype.hasOwnProperty.call(CARD_OWNED_DEFAULTS, key)) delete CARD_OWNED_DEFAULTS[key]
      }
      for (key in owned) {
        if (Object.prototype.hasOwnProperty.call(owned, key)) CARD_OWNED_DEFAULTS[key] = true
      }
    }
    if (pack.quiz && pack.quiz.questions) replaceList(RAPID_BANK, pack.quiz.questions)
    if (pack.plan) {
      if (pack.plan.title) PLAN_TITLE = pack.plan.title
      if (pack.plan.items) replaceList(PLAN_TASKS, publishedItems(pack.plan.items))
      var pi
      var allPlan = pack.plan.items || []
      for (pi = 0; pi < allPlan.length; pi++) {
        if (allPlan[pi] && allPlan[pi].icon && allPlan[pi].iconSrc) addContentAsset(allPlan[pi].icon, allPlan[pi].iconSrc)
      }
    }
    if (pack.medals && pack.medals.items) {
      replaceList(MEDAL_ITEMS, publishedItems(pack.medals.items))
      var mi
      var ownedM = {}
      var allM = pack.medals.items
      for (mi = 0; mi < allM.length; mi++) {
        if (allM[mi] && allM[mi].icon && allM[mi].iconSrc) addContentAsset(allM[mi].icon, allM[mi].iconSrc)
        if (allM[mi] && allM[mi].owned) ownedM[allM[mi].id] = true
      }
      for (mi in MEDAL_OWNED_DEFAULTS) {
        if (Object.prototype.hasOwnProperty.call(MEDAL_OWNED_DEFAULTS, mi)) delete MEDAL_OWNED_DEFAULTS[mi]
      }
      for (mi in ownedM) {
        if (Object.prototype.hasOwnProperty.call(ownedM, mi)) MEDAL_OWNED_DEFAULTS[mi] = true
      }
    }
  }

  function bundledContent() {
    if (typeof HG_CONTENT !== 'undefined' && HG_CONTENT) return HG_CONTENT
    if (typeof require === 'function') {
      var paths = ['./content/bundle.js', 'content/bundle.js', '/content/bundle.js']
      var i
      for (i = 0; i < paths.length; i++) {
        try {
          var pack = require(paths[i])
          if (pack) return pack
        } catch (err) {}
      }
    }
    return null
  }

  function fetchJson(url) {
    return fetch(url + (url.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now()).then(function (r) {
      return r.ok ? r.json() : null
    }).catch(function () { return null })
  }

  function loadContentPack() {
    var bundled = bundledContent()
    if (isWx) return Promise.resolve(bundled)
    return Promise.all([
      fetchJson('content/shop.json'),
      fetchJson('content/wardrobe.json'),
      fetchJson('content/cards.json'),
      fetchJson('content/quiz.json'),
      fetchJson('content/plan.json'),
      fetchJson('content/medals.json')
    ]).then(function (parts) {
      if (!parts[0] && !parts[1] && !parts[2] && !parts[3] && !parts[4] && !parts[5]) return bundled
      return { shop: parts[0], wardrobe: parts[1], cards: parts[2], quiz: parts[3], plan: parts[4], medals: parts[5] }
    })
  }

  function boot() {
    var view = setupCanvas()
    loadContentPack().then(function (pack) {
      applyContentPack(pack)
      return loadSubpackages()
    }).then(function () {
      var jobs = ASSET_LIST.map(function (item) {
        return loadImage(item.src, item.optional).then(function (img) {
          return { id: item.id, img: img }
        })
      })
      jobs.push(loadDialogFont())
      return Promise.all(jobs)
    }).then(function (loaded) {
      var images = {}
      loaded.forEach(function (item) {
        if (item && item.id) images[item.id] = item.img
      })
      var game = new Game(view, images, new SoundBank())
      bindInput(view.canvas, game, view)
      if (!isWx) window.__hgGame = game
      var last = nowSec()
      function frame() {
        var now = nowSec()
        var dt = Math.min(0.05, now - last)
        last = now
        game.tick(dt)
        requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }).catch(function (err) {
      showBootFail(view, err)
    })

    if (!isWx) {
      window.addEventListener('resize', function () {
        window.location.reload()
      })
    }
  }

  if (isWx) {
    boot()
  } else if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
    else boot()
  }
})()
