var HG_CONTENT = {
  "shop": {
    "talk": "欢迎光临小心的食品店哦！货架上全是对心脏友善的吃食，今天想补点什么呢...",
    "defaultCat": "produce",
    "defaultItem": "apple",
    "cats": [
      {
        "id": "produce",
        "icon": "apple",
        "title": "蔬果"
      },
      {
        "id": "meat",
        "icon": "food-1",
        "title": "肉类"
      },
      {
        "id": "drink",
        "icon": "water",
        "title": "饮料"
      }
    ],
    "items": [
      {
        "id": "apple",
        "cat": "produce",
        "name": "小心牌红苹果",
        "price": 55,
        "bonusKey": "mag",
        "bonus": 3,
        "bonusText": "镁元素 +3",
        "desc": "一天一苹果，小心少操劳。皮薄汁多，便宜好入口，适合先把镁槽补到能合成的边儿上。",
        "icon": "apple",
        "iconSrc": "image/uploads/shop/apple.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "banana",
        "cat": "produce",
        "name": "能量小香蕉",
        "price": 90,
        "bonusKey": "mag",
        "bonus": 5,
        "bonusText": "镁元素 +5",
        "desc": "钾和镁的老搭档。吃一根，心跳稳一点，加班到腿软时也不那么容易抽筋。",
        "icon": "banana",
        "iconSrc": "image/uploads/shop/banana.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "carrot",
        "cat": "produce",
        "name": "护心胡萝卜",
        "price": 65,
        "bonusKey": "coq10",
        "bonus": 3,
        "bonusText": "辅酶 Q10 +3",
        "desc": "脆生生的一小根，给心肌续一点燃料。夜视是谣言，面对健康餐单的勇气是真的。",
        "icon": "carrot",
        "iconSrc": "image/uploads/shop/carrot.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "tomato",
        "cat": "produce",
        "name": "红润小番茄",
        "price": 85,
        "bonusKey": "coq10",
        "bonus": 4,
        "bonusText": "辅酶 Q10 +4",
        "desc": "红得像小心害羞。番茄红素帮血管做一次温和打扫，生吃热炒都欢迎。",
        "icon": "tomato",
        "iconSrc": "image/uploads/shop/tomato.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "kiwi",
        "cat": "produce",
        "name": "清甜猕猴桃",
        "price": 80,
        "bonusKey": "mag",
        "bonus": 4,
        "bonusText": "镁元素 +4",
        "desc": "酸甜刚好，维生素 C 很慷慨。挖一勺，心情和镁槽一起往上抬一点。",
        "icon": "kiwi",
        "iconSrc": "image/uploads/shop/kiwi.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "walnut",
        "cat": "produce",
        "name": "原味核桃仁",
        "price": 135,
        "bonusKey": "omega3",
        "bonus": 5,
        "bonusText": "Omega-3 +5",
        "desc": "不加油不裹糖，咔嚓一口就是植物里的 Omega-3。当零食刚刚好，别整袋消灭。",
        "icon": "walnut",
        "iconSrc": "image/uploads/shop/walnut.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "food-1",
        "cat": "meat",
        "name": "深海护心鱼",
        "price": 170,
        "bonusKey": "omega3",
        "bonus": 6,
        "bonusText": "Omega-3 +6",
        "desc": "三文鱼、鲭鱼这一挂的老朋友。清蒸或水煮，一次补足大半槽 Omega-3，店长最推荐。",
        "icon": "food-1",
        "iconSrc": "image/uploads/shop/food-1.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "breast",
        "cat": "meat",
        "name": "清蒸嫩鸡胸",
        "price": 155,
        "bonusKey": "coq10",
        "bonus": 6,
        "bonusText": "辅酶 Q10 +6",
        "desc": "去皮清蒸，蛋白质来得干净。给心肌供能，却不把油锅一起端上桌。",
        "icon": "breast",
        "iconSrc": "image/uploads/shop/breast.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "water",
        "cat": "drink",
        "name": "温热白开水",
        "price": 30,
        "bonusKey": "mag",
        "bonus": 2,
        "bonusText": "镁元素 +2",
        "desc": "最便宜也最老实的护心饮料。温一口，血液不那么黏，镁也更好吸收。",
        "icon": "water",
        "iconSrc": "image/uploads/shop/water.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "soy",
        "cat": "drink",
        "name": "无糖鲜豆浆",
        "price": 70,
        "bonusKey": "omega3",
        "bonus": 3,
        "bonusText": "Omega-3 +3",
        "desc": "不另加糖，豆香自己会说话。植物脂肪温和，适合配核桃或鱼做一套护心早餐。",
        "icon": "soy",
        "iconSrc": "image/uploads/shop/soy.png",
        "placeholder": false,
        "on": true
      }
    ]
  },
  "wardrobe": {
    "talk": "欢迎光临小心的服装店哦！衣服、饰品、鞋履各穿一件，三种元素都能吃到提成...",
    "defaultCat": "clothes",
    "defaultItem": "clothes1",
    "cats": [
      {
        "id": "clothes",
        "icon": "catClothes",
        "title": "衣服"
      },
      {
        "id": "glasses",
        "icon": "catGlasses",
        "title": "饰品"
      },
      {
        "id": "shoes",
        "icon": "catShoes",
        "title": "鞋履"
      }
    ],
    "items": [
      {
        "id": "clothes1",
        "cat": "clothes",
        "name": "暖心针织背心",
        "price": 280,
        "bonusKey": "mag",
        "bonus": 0.08,
        "bonusText": "镁元素的获得率 + 8%",
        "desc": "贴着小心身形织的暖围兜。穿上后，限时模拟和急救里拿到的镁都会多一点。",
        "icon": "itemClothesModel",
        "iconSrc": "image/uploads/wardrobe/clothes1.png",
        "wear": "itemClothesModel",
        "wearSrc": "image/uploads/wardrobe/clothes1.png",
        "placeholder": false,
        "on": true
      },
      {
        "id": "shawl",
        "cat": "clothes",
        "name": "小心着凉的披肩",
        "price": 420,
        "bonusKey": "omega3",
        "bonus": 0.12,
        "bonusText": "Omega-3 的获得率 + 12%",
        "desc": "四面漏风但气场很稳。金色限量款被小心霸占了，这件蓝的专补 Omega-3。",
        "icon": "itemShawl",
        "iconSrc": "image/wardrobe/items/item_shawl.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/wardrobe/items/item_shawl.png",
        "wear": "itemShawl"
      },
      {
        "id": "hoodie",
        "cat": "clothes",
        "name": "周末运动卫衣",
        "price": 360,
        "bonusKey": "coq10",
        "bonus": 0.09,
        "bonusText": "辅酶 Q10 的获得率 + 9%",
        "desc": "松松的，方便抬手做操。穿出去散步时，游戏里拿到的辅酶 Q10 会更厚道。",
        "icon": "hoodie",
        "iconSrc": "image/uploads/wardrobe/hoodie.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/hoodie.png",
        "wear": "hoodie"
      },
      {
        "id": "pajama",
        "cat": "clothes",
        "name": "早睡棉睡衣",
        "price": 250,
        "bonusKey": "mag",
        "bonus": 0.06,
        "bonusText": "镁元素的获得率 + 6%",
        "desc": "软棉触感，提醒你十点前躺下。睡得好，镁的获得率也会老实涨一点。",
        "icon": "pajama",
        "iconSrc": "image/uploads/wardrobe/pajama.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/pajama.png",
        "wear": "pajama"
      },
      {
        "id": "wear-1",
        "cat": "glasses",
        "name": "护目小圆镜",
        "price": 320,
        "bonusKey": "coq10",
        "bonus": 0.1,
        "bonusText": "辅酶 Q10 的获得率 + 10%",
        "desc": "把加班时的刺眼屏幕挡回去一点。戴上后，游戏里拿到的辅酶 Q10 会更厚道。",
        "icon": "wear-1",
        "iconSrc": "image/uploads/wardrobe/wear-1.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/wear-1.png",
        "wear": "wear-1"
      },
      {
        "id": "scarf",
        "cat": "glasses",
        "name": "暖颈小围巾",
        "price": 300,
        "bonusKey": "mag",
        "bonus": 0.07,
        "bonusText": "镁元素的获得率 + 7%",
        "desc": "围上就不那么容易缩肩膀。保暖的同时，镁的获得率悄悄加一截。",
        "icon": "scarf",
        "iconSrc": "image/uploads/wardrobe/scarf.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/scarf.png",
        "wear": "scarf"
      },
      {
        "id": "band",
        "cat": "glasses",
        "name": "知识派眼镜",
        "price": 210,
        "bonusKey": "omega3",
        "bonus": 0.05,
        "bonusText": "Omega-3 的获得率 + 5%",
        "desc": "看透一切的眼镜，你貌似变得更有文化了。做急救训练时，Omega-3 掉落会更听话。",
        "icon": "band",
        "iconSrc": "image/uploads/wardrobe/band.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/band.png",
        "wear": "band"
      },
      {
        "id": "wear-2",
        "cat": "shoes",
        "name": "散步软底鞋",
        "price": 240,
        "bonusKey": "omega3",
        "bonus": 0.06,
        "bonusText": "Omega-3 的获得率 + 6%",
        "desc": "软软的，适合出门走走。和背心、圆镜一起穿，三种元素都能吃到提成。",
        "icon": "wear-2",
        "iconSrc": "image/uploads/wardrobe/wear-2.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/wear-2.png",
        "wear": "wear-2"
      },
      {
        "id": "slipper",
        "cat": "shoes",
        "name": "室内软拖鞋",
        "price": 190,
        "bonusKey": "mag",
        "bonus": 0.05,
        "bonusText": "镁元素的获得率 + 5%",
        "desc": "回家第一件事：换掉出门那双。脚放松了，镁也愿意多待一会儿。",
        "icon": "slipper",
        "iconSrc": "image/uploads/wardrobe/slipper.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/slipper.png",
        "wear": "slipper"
      },
      {
        "id": "runner",
        "cat": "shoes",
        "name": "轻快慢跑鞋",
        "price": 340,
        "bonusKey": "coq10",
        "bonus": 0.08,
        "bonusText": "辅酶 Q10 的获得率 + 8%",
        "desc": "轻，弹，鼓励你小跑而不是猛冲。运动时拿到的辅酶 Q10 会多给一点。",
        "icon": "runner",
        "iconSrc": "image/uploads/wardrobe/runner.png",
        "placeholder": false,
        "on": true,
        "wearSrc": "image/uploads/wardrobe/runner.png",
        "wear": "runner"
      }
    ]
  },
  "cards": {
    "cost": 2,
    "library": [
      {
        "id": "deep-fish",
        "title": "深海鱼",
        "desc": "例如三文鱼、鲭鱼、沙丁鱼等，深海鱼富含 Omega-3，能减轻血管炎症、帮助稳定心律。",
        "art": "fish",
        "artSrc": "image/card/fish.png",
        "slot": "club-2",
        "owned": true
      },
      {
        "id": "card-1",
        "title": "香蕉",
        "desc": "钾和镁的老搭档。吃一根，心跳稳一点，加班到腿软时也不那么容易抽筋。",
        "art": "card-1",
        "artSrc": "image/uploads/cards/card-1.png",
        "slot": "spade-A",
        "owned": false
      },
      {
        "id": "card-2",
        "title": "胡萝卜",
        "desc": "脆生生的一小根，给心肌续一点燃料。橙黄蔬菜里的抗氧化物质，对血管很友善。",
        "art": "card-2",
        "artSrc": "image/uploads/cards/card-2.png",
        "slot": "spade-10",
        "owned": false
      },
      {
        "id": "card-3",
        "title": "鸡胸肉",
        "desc": "去皮清蒸，蛋白质来得干净。给心肌供能，却不把油锅一起端上桌。",
        "art": "card-3",
        "artSrc": "image/uploads/cards/card-3.png",
        "slot": "spade-4",
        "owned": false
      },
      {
        "id": "card-4",
        "title": "苹果",
        "desc": "一天一苹果，小心少操劳。膳食纤维帮你稳血糖，也让血管轻松一点。",
        "art": "card-4",
        "artSrc": "image/uploads/cards/card-4.png",
        "slot": "club-A",
        "owned": false
      },
      {
        "id": "card-5",
        "title": "豆浆",
        "desc": "不另加糖，豆香自己会说话。植物蛋白温和，适合做成一套护心早餐。",
        "art": "card-5",
        "artSrc": "image/uploads/cards/card-5.png",
        "slot": "spade-K",
        "owned": false
      },
      {
        "id": "card-6",
        "title": "白开水",
        "desc": "最老实的护心饮料。温一口，血液不那么黏，代谢也更顺。",
        "art": "card-6",
        "artSrc": "image/uploads/cards/card-6.png",
        "slot": "heart-7",
        "owned": false
      },
      {
        "id": "card-7",
        "title": "橙子",
        "desc": "维生素 C 很慷慨。酸甜一口，心情和血管弹性一起抬一点。",
        "art": "card-7",
        "artSrc": "image/uploads/cards/card-7.png",
        "slot": "heart-10",
        "owned": false
      },
      {
        "id": "card-8",
        "title": "猕猴桃",
        "desc": "酸甜刚好，钾和维生素都在。挖一勺，比甜饮料更懂小心。",
        "art": "card-8",
        "artSrc": "image/uploads/cards/card-8.png",
        "slot": "spade-6",
        "owned": false
      },
      {
        "id": "card-9",
        "title": "含糖汽水",
        "desc": "冰镇很爽，糖分却悄悄加重心脏负担。解渴请先找白开水。",
        "art": "card-9",
        "artSrc": "image/uploads/cards/card-9.png",
        "slot": "diamond-J",
        "owned": false
      },
      {
        "id": "card-10",
        "title": "绿叶菜",
        "desc": "深绿叶子里藏着镁和叶酸。炒一盘，血压和心律都更稳妥。",
        "art": "card-10",
        "artSrc": "image/uploads/cards/card-10.png",
        "slot": "heart-A",
        "owned": false
      },
      {
        "id": "card-11",
        "title": "蓝莓",
        "desc": "小小一捧花青素。抗氧化，给血管做一次温和打扫。",
        "art": "card-11",
        "artSrc": "image/uploads/cards/card-11.png",
        "slot": "diamond-4",
        "owned": false
      },
      {
        "id": "card-12",
        "title": "优质油脂",
        "desc": "橄榄油、鱼油这类不饱和脂肪，适量用，比反复油炸更护心。",
        "art": "card-12",
        "artSrc": "image/uploads/cards/card-12.png",
        "slot": "club-4",
        "owned": false
      },
      {
        "id": "card-13",
        "title": "心跳监测",
        "desc": "安静时摸摸脉搏。过快、过慢或乱跳，都值得停下来问问医生。",
        "art": "card-13",
        "artSrc": "image/uploads/cards/card-13.png",
        "slot": "heart-Q",
        "owned": false
      },
      {
        "id": "card-14",
        "title": "香烟",
        "desc": "烟雾让血管收缩、心跳加快。少抽一支，小心就轻松一支。",
        "art": "card-14",
        "artSrc": "image/uploads/cards/card-14.png",
        "slot": "spade-8",
        "owned": false
      },
      {
        "id": "card-15",
        "title": "酒精",
        "desc": "少喝或最好不喝。过量会让血压升高、心律不稳，心脏加班到累。",
        "art": "card-15",
        "artSrc": "image/uploads/cards/card-15.png",
        "slot": "club-3",
        "owned": false
      },
      {
        "id": "card-16",
        "title": "油炸食品",
        "desc": "外酥里香，多余油脂和盐却堆在血管里。偶尔解馋，别天天见。",
        "art": "card-16",
        "artSrc": "image/uploads/cards/card-16.png",
        "slot": "heart-4",
        "owned": false
      },
      {
        "id": "card-17",
        "title": "及时就医",
        "desc": "胸痛、气短、冷汗别硬扛。早一分钟呼救，就多一分生机。",
        "art": "card-17",
        "artSrc": "image/uploads/cards/card-17.png",
        "slot": "spade-9",
        "owned": false
      },
      {
        "id": "card-18",
        "title": "蘑菇",
        "desc": "低油低负担，钾和膳食纤维都在。清炒或煮汤，给心脏一碗清淡的。",
        "art": "card-18",
        "artSrc": "image/uploads/cards/card-18.png",
        "slot": "heart-5",
        "owned": false
      },
      {
        "id": "card-19",
        "title": "运动",
        "desc": "动一动，心跳才有底气。每周累计 150 分钟中等强度，比一直坐着强。",
        "art": "card-19",
        "artSrc": "image/uploads/cards/card-19.png",
        "slot": "heart-9",
        "owned": false
      },
      {
        "id": "card-20",
        "title": "睡眠",
        "desc": "枕头和被子就位。睡够 7 小时，血压和情绪都比较听话。",
        "art": "card-20",
        "artSrc": "image/uploads/cards/card-20.png",
        "slot": "club-10",
        "owned": false
      },
      {
        "id": "card-21",
        "title": "咖啡",
        "desc": "提神可以，别灌到心慌。每天一两杯，过了下午就停。",
        "art": "card-21",
        "artSrc": "image/uploads/cards/card-21.png",
        "slot": "diamond-8",
        "owned": false
      },
      {
        "id": "card-22",
        "title": "均衡饮食",
        "desc": "盘子里颜色越多越好。蔬果、优质蛋白搭配着来，心脏才吃得明白。",
        "art": "card-22",
        "artSrc": "image/uploads/cards/card-22.png",
        "slot": "club-6",
        "owned": false
      },
      {
        "id": "card-23",
        "title": "规律作息",
        "desc": "固定睡觉，少熬夜。小心也需要休息日，第二天心跳才不加班。",
        "art": "card-23",
        "artSrc": "image/uploads/cards/card-23.png",
        "slot": "club-Q",
        "owned": false
      }
    ],
    "cards": {
      "club-2": {
        "title": "深海鱼",
        "desc": "例如三文鱼、鲭鱼、沙丁鱼等，深海鱼富含 Omega-3，能减轻血管炎症、帮助稳定心律。",
        "art": "fish",
        "artSrc": "image/card/fish.png",
        "owned": true
      },
      "spade-A": {
        "title": "香蕉",
        "desc": "钾和镁的老搭档。吃一根，心跳稳一点，加班到腿软时也不那么容易抽筋。",
        "art": "card-1",
        "artSrc": "image/uploads/cards/card-1.png",
        "owned": false
      },
      "spade-10": {
        "title": "胡萝卜",
        "desc": "脆生生的一小根，给心肌续一点燃料。橙黄蔬菜里的抗氧化物质，对血管很友善。",
        "art": "card-2",
        "artSrc": "image/uploads/cards/card-2.png",
        "owned": false
      },
      "spade-4": {
        "title": "鸡胸肉",
        "desc": "去皮清蒸，蛋白质来得干净。给心肌供能，却不把油锅一起端上桌。",
        "art": "card-3",
        "artSrc": "image/uploads/cards/card-3.png",
        "owned": false
      },
      "club-A": {
        "title": "苹果",
        "desc": "一天一苹果，小心少操劳。膳食纤维帮你稳血糖，也让血管轻松一点。",
        "art": "card-4",
        "artSrc": "image/uploads/cards/card-4.png",
        "owned": false
      },
      "spade-K": {
        "title": "豆浆",
        "desc": "不另加糖，豆香自己会说话。植物蛋白温和，适合做成一套护心早餐。",
        "art": "card-5",
        "artSrc": "image/uploads/cards/card-5.png",
        "owned": false
      },
      "heart-7": {
        "title": "白开水",
        "desc": "最老实的护心饮料。温一口，血液不那么黏，代谢也更顺。",
        "art": "card-6",
        "artSrc": "image/uploads/cards/card-6.png",
        "owned": false
      },
      "heart-10": {
        "title": "橙子",
        "desc": "维生素 C 很慷慨。酸甜一口，心情和血管弹性一起抬一点。",
        "art": "card-7",
        "artSrc": "image/uploads/cards/card-7.png",
        "owned": false
      },
      "spade-6": {
        "title": "猕猴桃",
        "desc": "酸甜刚好，钾和维生素都在。挖一勺，比甜饮料更懂小心。",
        "art": "card-8",
        "artSrc": "image/uploads/cards/card-8.png",
        "owned": false
      },
      "diamond-J": {
        "title": "含糖汽水",
        "desc": "冰镇很爽，糖分却悄悄加重心脏负担。解渴请先找白开水。",
        "art": "card-9",
        "artSrc": "image/uploads/cards/card-9.png",
        "owned": false
      },
      "heart-A": {
        "title": "绿叶菜",
        "desc": "深绿叶子里藏着镁和叶酸。炒一盘，血压和心律都更稳妥。",
        "art": "card-10",
        "artSrc": "image/uploads/cards/card-10.png",
        "owned": false
      },
      "diamond-4": {
        "title": "蓝莓",
        "desc": "小小一捧花青素。抗氧化，给血管做一次温和打扫。",
        "art": "card-11",
        "artSrc": "image/uploads/cards/card-11.png",
        "owned": false
      },
      "club-4": {
        "title": "优质油脂",
        "desc": "橄榄油、鱼油这类不饱和脂肪，适量用，比反复油炸更护心。",
        "art": "card-12",
        "artSrc": "image/uploads/cards/card-12.png",
        "owned": false
      },
      "heart-Q": {
        "title": "心跳监测",
        "desc": "安静时摸摸脉搏。过快、过慢或乱跳，都值得停下来问问医生。",
        "art": "card-13",
        "artSrc": "image/uploads/cards/card-13.png",
        "owned": false
      },
      "spade-8": {
        "title": "香烟",
        "desc": "烟雾让血管收缩、心跳加快。少抽一支，小心就轻松一支。",
        "art": "card-14",
        "artSrc": "image/uploads/cards/card-14.png",
        "owned": false
      },
      "club-3": {
        "title": "酒精",
        "desc": "少喝或最好不喝。过量会让血压升高、心律不稳，心脏加班到累。",
        "art": "card-15",
        "artSrc": "image/uploads/cards/card-15.png",
        "owned": false
      },
      "heart-4": {
        "title": "油炸食品",
        "desc": "外酥里香，多余油脂和盐却堆在血管里。偶尔解馋，别天天见。",
        "art": "card-16",
        "artSrc": "image/uploads/cards/card-16.png",
        "owned": false
      },
      "spade-9": {
        "title": "及时就医",
        "desc": "胸痛、气短、冷汗别硬扛。早一分钟呼救，就多一分生机。",
        "art": "card-17",
        "artSrc": "image/uploads/cards/card-17.png",
        "owned": false
      },
      "heart-5": {
        "title": "蘑菇",
        "desc": "低油低负担，钾和膳食纤维都在。清炒或煮汤，给心脏一碗清淡的。",
        "art": "card-18",
        "artSrc": "image/uploads/cards/card-18.png",
        "owned": false
      },
      "heart-9": {
        "title": "运动",
        "desc": "动一动，心跳才有底气。每周累计 150 分钟中等强度，比一直坐着强。",
        "art": "card-19",
        "artSrc": "image/uploads/cards/card-19.png",
        "owned": false
      },
      "club-10": {
        "title": "睡眠",
        "desc": "枕头和被子就位。睡够 7 小时，血压和情绪都比较听话。",
        "art": "card-20",
        "artSrc": "image/uploads/cards/card-20.png",
        "owned": false
      },
      "diamond-8": {
        "title": "咖啡",
        "desc": "提神可以，别灌到心慌。每天一两杯，过了下午就停。",
        "art": "card-21",
        "artSrc": "image/uploads/cards/card-21.png",
        "owned": false
      },
      "club-6": {
        "title": "均衡饮食",
        "desc": "盘子里颜色越多越好。蔬果、优质蛋白搭配着来，心脏才吃得明白。",
        "art": "card-22",
        "artSrc": "image/uploads/cards/card-22.png",
        "owned": false
      },
      "club-Q": {
        "title": "规律作息",
        "desc": "固定睡觉，少熬夜。小心也需要休息日，第二天心跳才不加班。",
        "art": "card-23",
        "artSrc": "image/uploads/cards/card-23.png",
        "owned": false
      }
    }
  },
  "quiz": {
    "questions": [
      {
        "id": "d1-01",
        "d": 1,
        "q": "冠心病稳定期，推荐每周有氧运动总时长至少为？",
        "ok": "150分钟",
        "bad": [
          "75分钟",
          "300分钟"
        ]
      },
      {
        "id": "d1-02",
        "d": 1,
        "q": "高血压人群控盐，每日食盐建议不超过？",
        "ok": "5g",
        "bad": [
          "8g",
          "10g"
        ]
      },
      {
        "id": "d1-03",
        "d": 1,
        "q": "运动中出现持续压榨样胸痛，正确做法是？",
        "ok": "立刻停下休息并呼救",
        "bad": [
          "放慢速度坚持完成运动",
          "大量喝水缓解不适"
        ]
      },
      {
        "id": "d1-04",
        "d": 1,
        "q": "下列哪种油脂更适合心血管高危人群日常食用？",
        "ok": "橄榄油",
        "bad": [
          "猪油",
          "棕榈油"
        ]
      },
      {
        "id": "d1-05",
        "d": 1,
        "q": "成年人维持心脏健康，推荐睡眠时长优先选择？",
        "ok": "7～9小时",
        "bad": [
          "5小时内",
          "10小时以上"
        ]
      },
      {
        "id": "d1-06",
        "d": 1,
        "q": "疑似心绞痛发作，休息后未缓解，应该？",
        "ok": "尽快拨打120",
        "bad": [
          "自行多服止痛药",
          "走动促进血液循环"
        ]
      },
      {
        "id": "d1-07",
        "d": 1,
        "q": "对于保护心血管，下列饮品更推荐？",
        "ok": "白开水",
        "bad": [
          "含糖奶茶",
          "浓咖啡"
        ]
      },
      {
        "id": "d1-08",
        "d": 1,
        "q": "有心脏病史人群，最佳运动时机应避开？",
        "ok": "清晨寒冷时段",
        "bad": [
          "傍晚",
          "午后"
        ]
      },
      {
        "id": "d1-09",
        "d": 1,
        "q": "血脂偏高人群，优先少吃哪一类食物？",
        "ok": "动物内脏",
        "bad": [
          "深海鱼",
          "新鲜果蔬"
        ]
      },
      {
        "id": "d1-10",
        "d": 1,
        "q": "长期大量饮酒对心脏主要危害是？",
        "ok": "诱发心律失常",
        "bad": [
          "保护心肌",
          "改善血管弹性"
        ]
      },
      {
        "id": "d2-01",
        "d": 2,
        "q": "心源性猝死，急性症状发作至死亡的时间界限为？",
        "ok": "1小时内",
        "bad": [
          "6小时内",
          "24小时内"
        ]
      },
      {
        "id": "d2-02",
        "d": 2,
        "q": "下列哪一项属于心源性猝死独立危险因素？",
        "ok": "高血压",
        "bad": [
          "缺铁性贫血",
          "过敏性鼻炎"
        ]
      },
      {
        "id": "d2-03",
        "d": 2,
        "q": "成年人心脏骤停胸外按压，推荐按压深度是？",
        "ok": "5–6cm",
        "bad": [
          "3–4cm",
          "7–8cm"
        ]
      },
      {
        "id": "d2-04",
        "d": 2,
        "q": "发生心脏骤停，AED分析心律阶段应当？",
        "ok": "离开患者",
        "bad": [
          "持续按压",
          "人工通气"
        ]
      },
      {
        "id": "d2-05",
        "d": 2,
        "q": "以下哪种疾病最易引发心源性猝死？",
        "ok": "肥厚型心肌病",
        "bad": [
          "房间隔缺损",
          "心包囊肿"
        ]
      },
      {
        "id": "d2-06",
        "d": 2,
        "q": "心脏骤停复苏成功后，目标体温管理推荐维持体温？",
        "ok": "32–36℃",
        "bad": [
          "28–31℃",
          "37.5–38.5℃"
        ]
      },
      {
        "id": "d2-07",
        "d": 2,
        "q": "下列哪类心律失常，是院外猝死最常见初始心律？",
        "ok": "心室颤动",
        "bad": [
          "心房颤动",
          "阵发性室上速"
        ]
      },
      {
        "id": "d2-08",
        "d": 2,
        "q": "对于猝死高危人群，可用于风险筛查的检查是？",
        "ok": "24小时动态心电图",
        "bad": [
          "下肢血管超声",
          "胃镜"
        ]
      },
      {
        "id": "d2-09",
        "d": 2,
        "q": "下列哪项是诱发心源性猝死的急性诱因？",
        "ok": "剧烈情绪激动",
        "bad": [
          "轻度皮肤擦伤",
          "普通感冒"
        ]
      },
      {
        "id": "d2-10",
        "d": 2,
        "q": "单人施救成人心脏骤停，按压通气比为？",
        "ok": "30:2",
        "bad": [
          "15:2",
          "60:2"
        ]
      },
      {
        "id": "d3-01",
        "d": 3,
        "q": "下列哪一项不属于心源性猝死的结构性病因？",
        "ok": "长QT综合征",
        "bad": [
          "致心律失常性右室心肌病",
          "冠状动脉粥样硬化"
        ]
      },
      {
        "id": "d3-02",
        "d": 3,
        "q": "成人胸外按压，中断按压的单次最长时间建议不超过？",
        "ok": "10秒",
        "bad": [
          "15秒",
          "20秒"
        ]
      },
      {
        "id": "d3-03",
        "d": 3,
        "q": "以下哪项情况，不影响AED电极片贴放？",
        "ok": "胸壁有轻微体毛",
        "bad": [
          "胸壁有水",
          "胸前有植入式除颤器"
        ]
      },
      {
        "id": "d3-04",
        "d": 3,
        "q": "属于心源性猝死可干预危险因素的是？",
        "ok": "高血脂",
        "bad": [
          "男性性别",
          "家族猝死史"
        ]
      },
      {
        "id": "d3-05",
        "d": 3,
        "q": "心脏骤停复苏后目标体温管理一般持续多久？",
        "ok": "24h",
        "bad": [
          "12h",
          "48h"
        ]
      },
      {
        "id": "d3-06",
        "d": 3,
        "q": "下列心律失常，不属于恶性室性心律失常的是？",
        "ok": "加速性室性自主心律",
        "bad": [
          "多形性室速",
          "单形性持续性室速"
        ]
      },
      {
        "id": "d3-07",
        "d": 3,
        "q": "目击院外心脏骤停，优先选择的干预措施是？",
        "ok": "胸外按压+AED",
        "bad": [
          "人工呼吸",
          "静脉给药"
        ]
      },
      {
        "id": "d3-08",
        "d": 3,
        "q": "急性心梗早期，诱发室颤最主要机制是？",
        "ok": "心肌折返激动",
        "bad": [
          "心肌细胞坏死",
          "心室壁变薄"
        ]
      },
      {
        "id": "d3-09",
        "d": 3,
        "q": "下列哪类人群，猝死风险相对最低？",
        "ok": "单纯房性早搏",
        "bad": [
          "陈旧心梗伴射血分数35%",
          "肥厚型心肌病"
        ]
      },
      {
        "id": "d3-10",
        "d": 3,
        "q": "肾上腺素用于心脏骤停，推荐给药间隔为？",
        "ok": "3～5分钟",
        "bad": [
          "1～2分钟",
          "6～8分钟"
        ]
      }
    ]
  },
  "plan": {
    "title": "今日计划",
    "items": [
      {
        "id": "login",
        "title": "登陆游戏",
        "desc": "来了就不容易了",
        "kind": "login",
        "reward": 50,
        "pay": "coins",
        "on": true
      },
      {
        "id": "water",
        "title": "喝杯水吧？",
        "desc": "给小心脏买一杯水喝，别忘了自己也要多喝水哦",
        "kind": "check",
        "reward": 50,
        "pay": "coins",
        "on": true
      },
      {
        "id": "fruit",
        "title": "吃点水果",
        "desc": "给小心脏吃点水果，别忘了自己也要多吃水果哦",
        "kind": "check",
        "reward": 50,
        "pay": "coins",
        "on": true
      },
      {
        "id": "sport",
        "title": "运动一下",
        "desc": "适量运动对心脏有很大的好处!",
        "kind": "check",
        "reward": 50,
        "pay": "coins",
        "on": true
      }
    ]
  },
  "medals": {
    "items": [
      {
        "id": "rookie",
        "title": "急救新手",
        "desc": "第一次完成限时模拟或急救训练后获得。",
        "tone": "silver",
        "icon": "medalSilver",
        "iconSrc": "image/medal/silver.png",
        "owned": false,
        "on": true
      },
      {
        "id": "guard",
        "title": "心脏卫士",
        "desc": "坚持守护心脏健康，完成今日计划后点亮。",
        "tone": "gold",
        "icon": "medalGold",
        "iconSrc": "image/medal/gold.png",
        "owned": true,
        "on": true
      },
      {
        "id": "steady",
        "title": "坚持之心",
        "desc": "连续完成多日计划后获得。",
        "tone": "silver",
        "icon": "medalSilver",
        "iconSrc": "image/medal/silver.png",
        "owned": false,
        "on": true
      },
      {
        "id": "scholar",
        "title": "知识达人",
        "desc": "在快问快答中累计答对足够多的题目。",
        "tone": "bronze",
        "icon": "medalBronze",
        "iconSrc": "image/medal/bronze.png",
        "owned": false,
        "on": true
      }
    ]
  }
};
if (typeof module !== 'undefined' && module.exports) module.exports = HG_CONTENT;
