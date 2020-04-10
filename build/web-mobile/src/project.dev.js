window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "232c0/7U/pGL5sEqox0aXqB", "CAudio");
    "use strict";
    var _require = require("GameFake"), SoundType = _require.SoundType;
    cc.Class({
      extends: cc.Component,
      properties: {
        audioWelcome: {
          default: null,
          type: cc.AudioClip
        },
        audioDiscardStraight: {
          default: null,
          type: cc.AudioClip
        },
        audioDiscardFlush: {
          default: null,
          type: cc.AudioClip
        },
        audioDiscardCulu: {
          default: null,
          type: cc.AudioClip
        },
        soundDiscard: {
          default: null,
          type: cc.AudioClip
        },
        audioWin: {
          default: null,
          type: cc.AudioClip
        },
        soundCountDow: {
          default: null,
          type: cc.AudioClip
        }
      },
      ctor: function ctor() {
        this.audioPool = [];
      },
      onLoad: function onLoad() {},
      start: function start() {
        cc.log("play");
        cc.audioEngine.getMaxAudioInstance();
        var id = cc.audioEngine.play(this.audioWelcome, false, 1);
        this.audioPool.push(id);
      },
      playAudio: function playAudio(soundType) {
        switch (soundType) {
         case SoundType.FULL_HOUSE:
          cc.audioEngine.play(this.audioDiscardCulu, false, 1);
          break;

         case SoundType.FLUSH:
          cc.audioEngine.play(this.audioDiscardFlush, false, 1);
          break;

         case SoundType.STRAIGHT:
          cc.audioEngine.play(this.audioDiscardStraight, false, 1);
          break;

         case SoundType.WELCOME:
          cc.audioEngine.play(this.audioWelcome, false, 1);
          break;

         case SoundType.WIN:
          cc.audioEngine.play(this.audioWin, false, 1);
        }
      }
    });
    cc._RF.pop();
  }, {
    GameFake: "GameFake"
  } ],
  CBtnDownload: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa848opgmhMQKfD6xZOvgcV", "CBtnDownload");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      onTouch: function onTouch() {
        console.log("Touch Download");
        FbPlayableAd && FbPlayableAd.onCTAClick();
      }
    });
    cc._RF.pop();
  }, {} ],
  CBtnStep1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d6d7ZBIxZHcYYuxM2WLEVS", "CBtnStep1");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnStep2: cc.Button
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 1");
        this.node.active = false;
        this.btnStep2.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  CBtnStep2: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a174h5XKVDDqPz6uctC+1/", "CBtnStep2");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnStep3: cc.Button
      },
      onLoad: function onLoad() {
        this.node.active = false;
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 2");
        this.node.active = false;
        this.btnStep3.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  CBtnStep3: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb4b83rgAhPLYZOZ/FJGXMT", "CBtnStep3");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.active = false;
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 3");
        var ads = require("PlayableAds");
        ads.onCTAClick();
      }
    });
    cc._RF.pop();
  }, {
    PlayableAds: "PlayableAds"
  } ],
  CCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34036kNa6RCAoMIlraaHio6", "CCard");
    "use strict";
    var _require = require("Types"), Card = _require.Card, Rank = _require.Rank;
    var CCard = cc.Class({
      extends: cc.Component,
      properties: {
        point: cc.Label,
        suit: cc.Sprite,
        mainPic: cc.Sprite,
        cardBG: cc.Sprite,
        redTextColor: cc.Color.RED,
        blackTextColor: cc.Color.WHITE,
        texFrontBG: cc.SpriteFrame,
        texBackBG: cc.SpriteFrame,
        texFaces: {
          default: [],
          type: cc.SpriteFrame
        },
        texSuitBig: {
          default: [],
          type: cc.SpriteFrame
        },
        texSuitSmall: {
          default: [],
          type: cc.SpriteFrame
        },
        index: {
          default: 0,
          type: cc.Integer,
          visible: false
        },
        isSelected: {
          default: false,
          visible: false
        },
        owner: {
          default: null,
          type: cc.Node,
          visible: false
        },
        isDraging: {
          default: true,
          visible: false
        },
        card: {
          default: null,
          type: Card,
          visible: false
        }
      },
      setOwner: function setOwner(owner) {
        this.owner = owner;
      },
      onLoad: function onLoad() {
        console.log("loadCard:" + this.card + "|" + this.index);
        this.card && this.init(this.card);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this);
      },
      onEmit: function onEmit() {
        console.log("onEmit card:" + this.card.toString());
      },
      onTouch: function onTouch(event) {
        if (this.owner) {
          var customEvent = new cc.Event.EventCustom("card-touch", true);
          customEvent.setUserData({
            card: this,
            event: event
          });
          this.node.dispatchEvent(customEvent);
        } else console.log("not found owner's card:" + this.id);
      },
      start: function start() {
        this.node.dispatchEvent(new cc.Event.EventCustom("cardtouch", true));
      },
      setCard: function setCard(card) {
        console.log("setCard:" + card + "|point:" + card.point + "|suit:" + card.suit);
        this.card = card;
      },
      init: function init(card) {
        var isFaceCard = 8 <= card.point && card.point <= 10;
        console.log("isFace:" + card.toString() + "|" + isFaceCard);
        this.mainPic.spriteFrame = isFaceCard ? this.texFaces[card.point - 9] : this.texSuitBig[card.suit];
        this.point.string = card.pointName;
        card.isRedSuit ? this.point.node.color = this.redTextColor : this.point.node.color = this.blackTextColor;
        this.suit.spriteFrame = this.texSuitSmall[card.suit];
      },
      reveal: function reveal(isFaceUp) {
        this.point.node.active = isFaceUp;
        this.suit.node.active = isFaceUp;
        this.mainPic.node.active = isFaceUp;
        this.cardBG.spriteFrame = isFaceUp ? this.texFrontBG : this.texBackBG;
      },
      setPositionCenter: function setPositionCenter(pos) {
        this.node.setPosition(pos.x - 50, pos.y - 65);
      }
    });
    cc._RF.pop();
  }, {
    Types: "Types"
  } ],
  CCircleAvatar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df8ceAeEYhFxZKP0qg+RXYg", "CCircleAvatar");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        mask: cc.Mask,
        img: cc.Sprite
      },
      start: function start() {},
      changeAvatar: function changeAvatar(spriteFrame) {
        this.img.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {} ],
  CEffectWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3f96EHNXtD9KukPp20CQBY", "CEffectWin");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  CLayerGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9fbfbH6inNCBbIvpP5ZqCUf", "CLayerGame");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("cardtouch", this.onEmit);
      },
      onEmit: function onEmit() {
        console.log("onEmit LayerCard");
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  CPlayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c90b5cwF5ZKgbNi6oY6LKVY", "CPlayer");
    "use strict";
    var Types = require("Types");
    var Utility = require("Utility");
    var CPlayer = cc.Class({
      extends: cc.Component,
      properties: {
        avatar: cc.Node,
        displayName: cc.Label,
        gold: cc.Label,
        spriteAvatar: {
          default: [],
          type: [ cc.SpriteFrame ]
        },
        layerCard: {
          default: null,
          type: cc.Node
        },
        imgPass: {
          default: null,
          type: cc.Node
        }
      },
      ctor: function ctor() {
        this.player = null;
        this.gameController = null;
        this.cards = [];
      },
      onLoad: function onLoad() {
        if (this.player) {
          this.displayName.string = this.player.name;
          this.gold.string = Utility.formatMoney(this.player.gold);
          var circleAvatar = this.avatar.getComponent("CCircleAvatar");
          circleAvatar.changeAvatar(this.spriteAvatar[this.player.avatar]);
          this._loadCards();
        } else console.error("need load setPlayer info onLoad");
        this.imgPass && (this.imgPass.active = false);
        this.node.on("card-touch", this.onTouchCard, this);
      },
      start: function start() {},
      setGameController: function setGameController(gameController) {
        this.gameController = gameController;
      },
      setPlayer: function setPlayer(player) {
        this.player = player;
      },
      updateUI: function updateUI() {},
      _loadCards: function _loadCards() {
        if (this.gameController) {
          var cards = this.player.cards;
          for (var i = 0; i < cards.length; i++) {
            var c = cards[i];
            var cardPrefab = this.gameController.getNewCard();
            var cCard = cardPrefab.getComponent("CCard");
            cCard.setCard(c);
            cCard.index = i;
            cCard.setOwner(this);
            var p = this.getPositionCard(cCard);
            var r = this.getRotationCard(cCard);
            cardPrefab.setPosition(p);
            cardPrefab.angle = -r;
            this.layerCard.addChild(cardPrefab);
            this.cards.push(cardPrefab);
          }
        } else console.error("don't have GameControler in Player, so can't create newCard");
      },
      onDiscard: function onDiscard(cards) {
        var cardPrefabs = [];
        if (this.player && 0 === this.player.index) {
          var isContain = function isContain(c) {
            for (var i = 0; i < cards.length; i++) if (c.id === cards[i].id) return true;
            return false;
          };
          var len = this.cards.length;
          for (var i = len - 1; i >= 0; i--) {
            var cardPrefab = this.cards[i];
            var cCard = cardPrefab.getComponent("CCard");
            if (isContain(cCard.card)) {
              cardPrefabs.unshift(cardPrefab);
              this.cards.splice(i, 1);
              this.player.cards.splice(i, 1);
            }
          }
          this._updatePosCards();
        } else for (var k = 0; k < cards.length; k++) {
          var cardPrefab = this.gameController.getNewCard();
          var cCard = cardPrefab.getComponent("CCard");
          cCard.setCard(cards[k]);
          cardPrefab.angle = 0;
          cCard.setPositionCenter(this.node.getPosition());
          cardPrefabs.push(cardPrefab);
          this.layerCard.addChild(cardPrefab);
        }
        return cardPrefabs;
      },
      _updatePosCards: function _updatePosCards() {
        console.log("_updatePosCards");
        if (this.gameController) {
          var cards = this.cards;
          for (var i = 0; i < cards.length; i++) {
            var cardPrefab = cards[i];
            var cCard = cardPrefab.getComponent("CCard");
            cCard.index = i;
            var p = this.getPositionCard(cCard);
            var r = this.getRotationCard(cCard);
            cardPrefab.setPosition(p);
            cardPrefab.angle = -r;
          }
        } else console.error("don't have GameControler in Player, so can't create newCard");
      },
      getNumCard: function getNumCard() {
        if (this.player) return this.player.cards.length;
        return 1;
      },
      getRotationCard: function getRotationCard(cCard) {
        var index = cCard.index;
        return this.getRotationVia(index);
      },
      getRotationVia: function getRotationVia(index) {
        var num = this.getNumCard();
        var y = 0;
        var startX = -60;
        var endX = 48;
        var maxOffsetX = 12;
        var offset = (endX - startX) / (num - 1);
        offset > maxOffsetX && (offset = maxOffsetX);
        startX += (endX - startX - offset * (num - 1)) / 2;
        return startX + offset * index;
      },
      getPositionCard: function getPositionCard(cCard) {
        var index = cCard.index;
        return this.getPositionVia(index);
      },
      getPositionVia: function getPositionVia(index) {
        var num = this.getNumCard();
        var y = 0;
        var startX = -250;
        var endX = 250;
        var maxOffsetX = 5;
        var offset = (endX - startX) / (num - 1);
        offset > maxOffsetX && (offset = maxOffsetX);
        startX += (endX - startX - offset * (num - 1)) / 2;
        return this.getCirclePos(new cc.Vec2(startX + offset * index, y));
      },
      getCirclePos: function getCirclePos(pos) {
        var x = pos.x;
        pos.y = x * x * -.004 - 280;
        return pos;
      },
      onPass: function onPass() {
        if (this.imgPass) {
          this.imgPass.active = true;
          this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
            this.imgPass.active = false;
          }.bind(this))));
        }
      },
      onTouchCard: function onTouchCard(event, card, owner) {
        switch (event.type) {
         case cc.Node.EventType.TOUCH_START:
          break;

         case cc.Node.EventType.TOUCH_MOVE:
          card.isDraging = true;
          var pos = card.node.getParent().convertToNodeSpaceAR(event.getLocation());
          card.node.setPosition(pos);
          break;

         case cc.Node.EventType.TOUCH_END:
          card.isDraging = false;
          card.isSelected = !card.isSelected;
          card.node.setPosition(this.getPositionCard(card));
          break;

         case cc.Node.EventType.TOUCH_CANCEL:
          card.isDraging = false;
          card.node.setPosition(this.getPositionCard(card));
        }
      }
    });
    module.exports = CPlayer;
    cc._RF.pop();
  }, {
    Types: "Types",
    Utility: "Utility"
  } ],
  CProgressWaterAni: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a9d8h1T4hAJrxWvcw6Gm89", "CProgressWaterAni");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sheepAnim: {
          default: null,
          type: cc.Animation
        }
      },
      onLoad: function onLoad() {},
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  CTable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "876d07NSSZBu4d949Frr7aA", "CTable");
    "use strict";
    var _require = require("Types"), Table = _require.Table, Card = _require.Card;
    var Utility = require("Utility");
    cc.Class({
      extends: cc.Component,
      properties: {
        lbPot: cc.Label,
        lbId: cc.Label,
        lbStake: cc.Label
      },
      ctor: function ctor() {
        this.numCard = 0;
        this.table = null;
      },
      onLoad: function onLoad() {
        if (this.table) {
          this.lbPot.string = Utility.formatMoney(this.table.pot);
          this.lbId.string = Utility.formatMoney(this.table.id);
          this.lbStake.string = Utility.formatMoney(this.table.stake);
        } else console.error("need setTable before load");
      },
      start: function start() {},
      setTable: function setTable(table) {
        this.table = table;
      },
      getPositionCard: function getPositionCard(card) {
        var index = card.index;
        return this.getPositionVia(index);
      },
      getPositionVia: function getPositionVia(index) {
        var num = this.numCard > 0 ? this.numCard : 1;
        var y = 0;
        var startX = -250;
        var endX = 250;
        var maxOffsetX = 50;
        var offset = (endX - startX) / (num - 1);
        offset > maxOffsetX && (offset = maxOffsetX);
        startX += (endX - startX - offset * (num - 1)) / 2;
        return new cc.Vec2(startX + offset * index, y);
      },
      setNumCard: function setNumCard(number) {
        this.numCard = number;
      }
    });
    cc._RF.pop();
  }, {
    Types: "Types",
    Utility: "Utility"
  } ],
  CardUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0382uKtHJMSoEGLa7Q4Fz0", "CardUtils");
    "use strict";
    cc._RF.pop();
  }, {} ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0998cn5M2hCaJbNVw/MXvof", "GameController");
    "use strict";
    var PlayableState = require("PlayableState");
    var PoolHandler = require("PoolHandler");
    var CCard = require("CCard");
    var CTable = require("CTable");
    var CPlayer = require("CPlayer");
    var _require = require("Types"), Card = _require.Card, Table = _require.Table, Player = _require.Player;
    var _require2 = require("GameFake"), ActionType = _require2.ActionType, GameFake = _require2.GameFake, SoundType = _require2.SoundType;
    var PlayableAds = require("PlayableAds");
    var CAudio = require("CAudio");
    cc.Class({
      extends: cc.Component,
      properties: {
        playableState: {
          default: null,
          type: PlayableState,
          serializable: false,
          visible: false
        },
        btnPlayNow: cc.Button,
        btnDump: cc.Button,
        btnPass: cc.Button,
        layerGame: cc.Node,
        layerAction: cc.Node,
        table: {
          default: null,
          type: cc.Node
        },
        players: {
          default: [],
          type: cc.Node
        },
        layerCard: {
          default: null,
          type: cc.Node
        },
        effectWin: {
          default: null,
          type: cc.Node
        },
        cardPrefab: {
          default: null,
          type: cc.Prefab
        },
        _poolCard: {
          default: null,
          type: cc.NodePool,
          visible: false
        },
        _gameFake: {
          default: null,
          type: GameFake,
          visible: false
        }
      },
      ctor: function ctor() {
        this.curIndex = -1;
        this.cardExpects = [];
        this.startPointTouch = null;
        this.zIndexCard = 10;
        this.audio = null;
      },
      onEnable: function onEnable() {
        console.log("onEnable players:" + this.players.length);
      },
      onLoad: function onLoad() {
        this.audio = this.node.getComponent(CAudio);
        this.effectWin.active = false;
        this._poolCard = new cc.NodePool(CCard);
        this._gameFake = new GameFake();
        var gameInfo = this._gameFake.getDefaultInfo();
        var tableConfig = gameInfo.table;
        var table = new Table(tableConfig.id, tableConfig.stake, tableConfig.pot);
        this.table.getComponent(CTable).setTable(table);
        var cards = tableConfig.dock;
        var cTable = this.table.getComponent(CTable);
        cTable.setNumCard(cards.length);
        for (var j = 0; j < cards.length; j++) {
          var c = cards[j];
          var cardPrefabs = this._poolCard.get();
          cardPrefabs || (cardPrefabs = cc.instantiate(this.cardPrefab));
          var cCard = cardPrefabs.getComponent(CCard);
          cCard.setCard(c);
          cCard.index = j;
          cCard.setOwner(cTable);
          var p = cTable.getPositionCard(cCard);
          cardPrefabs.setPosition(p);
          this.layerCard.addChild(cardPrefabs);
        }
        console.log("onEnable players:" + this.players.length);
        var playersConfig = gameInfo.players;
        for (var k = 0; k < playersConfig.length; k++) {
          var playerConfig = playersConfig[k];
          var player = new Player(playerConfig.index, playerConfig.displayName, playerConfig.gold, playerConfig.avatarIndex, playerConfig.cards);
          console.log("get palyer at:" + player.index);
          var cPlayer = this.players[player.index].getComponent(CPlayer);
          cPlayer.setGameController(this);
          cPlayer.setPlayer(player);
        }
        this.node.on("card-touch", this.onTouchCard, this);
        var actionConfig = this._gameFake.getAction();
        var delayTime = actionConfig.time;
        delayTime > 0 && this.scheduleOnce(function() {
          this.executeAction();
        }.bind(this), delayTime);
      },
      start: function start() {},
      executeAction: function executeAction() {
        var actionConfig = this._gameFake.getAction();
        console.log("executeAction:" + JSON.stringify(actionConfig));
        var index = actionConfig.index;
        var type = actionConfig.type;
        switch (type) {
         case ActionType.PASS:
          this.onPassAt(index);
          break;

         case ActionType.DISCARD:
          this.onDiscardAt(index, actionConfig.cards);
        }
        var sound = actionConfig.sound;
        sound && this.audio.playAudio(sound);
        if (actionConfig.isEnded) this.effectWin.active = true; else {
          this.curIndex = actionConfig.next;
          var actionNext = this._gameFake.next();
          if (actionNext) {
            console.log("actionNext:" + JSON.stringify(actionNext));
            var delayTime = actionNext.time;
            delayTime > 0 && this.scheduleOnce(function() {
              var actionConfig = this._gameFake.getAction();
              var index = actionConfig.index;
              if (0 === index) {
                actionConfig.suggest;
                this.cardExpects = actionConfig.cards;
                return;
              }
              this.executeAction();
            }.bind(this), delayTime);
          }
        }
      },
      onPassAt: function onPassAt(index) {
        console.log("onPassAt:" + index);
        var cPlayer = this.players[index].getComponent(CPlayer);
        cPlayer.onPass();
      },
      onDiscardAt: function onDiscardAt(index, cards) {
        console.log("onDiscardAt:" + index + "|" + JSON.stringify(cards));
        var cTable = this.table.getComponent(CTable);
        var cardPrefabs = this.players[index].getComponent(CPlayer).onDiscard(cards);
        var len = cardPrefabs.length;
        cTable.setNumCard(len);
        for (var k = 0; k < len; k++) {
          var cardPrefab = cardPrefabs[k];
          var cCard = cardPrefab.getComponent(CCard);
          cCard.index = k;
          cCard.owner = cTable;
          var p = cTable.getPositionCard(cCard);
          cardPrefab.zIndex = ++this.zIndexCard;
          cardPrefab.runAction(cc.spawn(cc.moveTo(1, p), cc.rotateTo(1, 0)));
          cc.log("newZIndex:" + this.zIndexCard);
        }
      },
      onTouchCard: function onTouchCard(event) {
        var data = event.getUserData();
        var cCard = data.card;
        var owner = cCard.owner;
        if (owner instanceof CTable) {
          console.log("passing card on table");
          return;
        }
        if (owner instanceof CPlayer) if (this.isMyTurn()) if (this.isTouchExpectCards(cCard.card)) switch (data.event.type) {
         case cc.Node.EventType.TOUCH_START:
          this.startPointTouch = data.event.getLocation();
          break;

         case cc.Node.EventType.TOUCH_MOVE:
          break;

         case cc.Node.EventType.TOUCH_END:
         case cc.Node.EventType.TOUCH_CANCEL:
          var pos = data.event.getLocation();
          if (pos.y - this.startPointTouch.y > 45) {
            this.executeAction();
            cc.log("Discard on my turn");
          } else cc.log("!!Discard on my turn");
          cc.log("touch:" + JSON.stringify(this.startPointTouch) + "| " + JSON.stringify(pos));
        } else cc.log("not expects card"); else cc.log("not my turn");
      },
      onPlayNow: function onPlayNow() {
        console.log("onPlay path main");
        PlayableAds.onCTAClick();
      },
      onTouchDump: function onTouchDump() {
        console.log("touch Dump");
      },
      onTouchPass: function onTouchPass() {
        console.log("touch Pass");
      },
      getNewCard: function getNewCard() {
        var cardPrefab = this._poolCard.get();
        cardPrefab || (cardPrefab = cc.instantiate(this.cardPrefab));
        return cardPrefab;
      },
      isMyTurn: function isMyTurn() {
        return 0 === this.curIndex;
      },
      isTouchExpectCards: function isTouchExpectCards(card) {
        var len = this.cardExpects.length;
        for (var i = 0; i < len; i++) {
          var c = this.cardExpects[i];
          if (c.id === card.id) return true;
        }
        return false;
      }
    });
    cc._RF.pop();
  }, {
    CAudio: "CAudio",
    CCard: "CCard",
    CPlayer: "CPlayer",
    CTable: "CTable",
    GameFake: "GameFake",
    PlayableAds: "PlayableAds",
    PlayableState: "PlayableState",
    PoolHandler: "PoolHandler",
    Types: "Types"
  } ],
  GameFake: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af1531lKdNCeqAorUj+Evyi", "GameFake");
    "use strict";
    var _require = require("Types"), Card = _require.Card, Rank = _require.Rank, Suit = _require.Suit;
    var ActionType = {
      DISCARD: 0,
      PASS: 1
    };
    var SoundType = {
      WELCOME: 0,
      STRAIGHT: 1,
      FLUSH: 2,
      FULL_HOUSE: 3,
      WIN: 4
    };
    var actions = [ {
      index: 1,
      type: ActionType.DISCARD,
      cards: [ Card.from("7", "\u2660"), Card.from("8", "\u2665"), Card.from("9", "\u2663"), Card.from("10", "\u2660"), Card.from("J", "\u2665") ],
      time: 1,
      sound: SoundType.STRAIGHT,
      next: 2
    }, {
      index: 2,
      type: ActionType.DISCARD,
      cards: [ Card.from("5", "\u2666"), Card.from("9", "\u2666"), Card.from("J", "\u2666"), Card.from("K", "\u2666"), Card.from("A", "\u2666") ],
      time: 1,
      sound: SoundType.FLUSH,
      next: 0
    }, {
      index: 0,
      type: ActionType.DISCARD,
      cards: [ Card.from("3", "\u2660"), Card.from("3", "\u2665"), Card.from("4", "\u2663"), Card.from("4", "\u2660"), Card.from("4", "\u2665") ],
      time: 1,
      sound: SoundType.FULL_HOUSE,
      next: 1,
      suggest: true
    }, {
      index: 1,
      type: ActionType.DISCARD,
      cards: [ Card.from("6", "\u2660"), Card.from("6", "\u2665"), Card.from("9", "\u2663"), Card.from("9", "\u2660"), Card.from("9", "\u2665") ],
      time: 1,
      sound: SoundType.FULL_HOUSE,
      next: 2
    }, {
      index: 2,
      type: ActionType.PASS,
      cards: [],
      time: 1,
      next: 0
    }, {
      index: 0,
      type: ActionType.DISCARD,
      cards: [ Card.from("K", "\u2660"), Card.from("2", "\u2663"), Card.from("2", "\u2660"), Card.from("2", "\u2665"), Card.from("2", "\u2666") ],
      time: 1,
      sound: SoundType.WIN,
      isEnded: true
    } ];
    var gameInfo = {
      players: [ {
        index: 0,
        displayName: "You",
        gold: 27e6,
        avatarIndex: 0,
        cards: [ Card.from("3", "\u2660"), Card.from("3", "\u2665"), Card.from("4", "\u2663"), Card.from("4", "\u2660"), Card.from("4", "\u2665"), Card.from("K", "\u2660"), Card.from("2", "\u2663"), Card.from("2", "\u2660"), Card.from("2", "\u2665"), Card.from("2", "\u2666") ]
      }, {
        index: 1,
        displayName: "Maria",
        gold: 47e6,
        avatarIndex: 1,
        cards: []
      }, {
        index: 2,
        displayName: "Michelle",
        gold: 58e6,
        avatarIndex: 2,
        cards: []
      } ],
      table: {
        id: 456,
        stake: 1e7,
        pot: 4e7,
        dock: [ Card.from("Q", "\u2666"), Card.from("K", "\u2663"), Card.from("A", "\u2660") ]
      }
    };
    function GameFake() {
      this.curIndex = 0;
    }
    GameFake.prototype.reset = function() {
      this.curIndex = 0;
    };
    GameFake.prototype.next = function() {
      this.curIndex++;
      return this.getAction();
    };
    GameFake.prototype.getAction = function() {
      return actions[this.curIndex];
    };
    GameFake.prototype.getDefaultInfo = function() {
      return gameInfo;
    };
    module.exports = {
      GameFake: GameFake,
      ActionType: ActionType,
      SoundType: SoundType
    };
    cc._RF.pop();
  }, {
    Types: "Types"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0973a4zPWhAZpuFLPEljN0e", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  PlayableAds: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ce239sy/55Ox5FRnSgYmiSY", "PlayableAds");
    "use strict";
    module.exports = {
      onCTAClick: function onCTAClick() {
        try {
          FbPlayableAd.onCTAClick();
          console.log("onCTAClick finish");
        } catch (e) {
          console.log("onCTAClick redirect");
          var r = confirm("Not playableAds, open store?");
          true === r && (window.location.href = "https://play.google.com/store/apps/details?id=com.rummy.pusoy.dos");
        }
      }
    };
    cc._RF.pop();
  }, {} ],
  PlayableState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d7e39F4OClL1IwzfB5UPkvI", "PlayableState");
    "use strict";
    var StateMachine = require("state-machine");
    var visualize = require("state-machine-visualize");
    var Transition = cc.Enum({
      PLAY: "play",
      ACTION1: "action1",
      ACTION2: "action2",
      ACTION3: "action3"
    });
    var State = cc.Enum({
      IDLE: "idle",
      STEP1: "step1",
      STEP2: "step2",
      STEP3: "step3",
      FINISH: "finish"
    });
    var PlayableState = cc.Class({
      properties: {
        fsm: {
          default: null,
          type: StateMachine,
          serializable: false,
          visible: false
        }
      },
      ctor: function ctor() {},
      load: function load() {
        this.fsm = new StateMachine({
          init: State.IDLE,
          transitions: [ {
            name: Transition.PLAY,
            from: State.IDLE,
            to: State.STEP1
          }, {
            name: Transition.ACTION1,
            from: State.STEP1,
            to: State.STEP2
          }, {
            name: Transition.ACTION2,
            from: State.STEP2,
            to: State.STEP3
          }, {
            name: Transition.ACTION3,
            from: State.STEP3,
            to: State.FINISH
          } ],
          methods: {
            onInvalidTransition: function onInvalidTransition(transition, from, to) {
              console.error("onInvalidTransition");
            },
            onPendingTransition: function onPendingTransition(transition, from, to) {
              console.error("onPendingTransition");
            },
            onBeforeMelt: function onBeforeMelt() {
              console.log("onEnter melted");
              return new Promise(function(resolve, reject) {
                setTimeout(function() {
                  console.log("onEnter melted done");
                  reject("abc");
                }, 200);
              });
            },
            onMelt: function onMelt() {
              console.log("I melted");
            },
            onFreeze: function onFreeze() {
              console.log("I froze");
            },
            onVaporize: function onVaporize() {
              console.log("I vaporized");
            },
            onCondense: function onCondense() {
              console.log("I condensed");
            }
          }
        });
        console.log("before" + this.fsm.state);
        try {
          this.fsm.melt();
        } catch (e) {
          console.log("catch day nef");
        }
        console.log("after" + this.fsm.state);
        setTimeout(function() {
          console.log("after1" + this.fsm.state);
          console.log(this.fsm.state);
        }.bind(this), 500);
        setTimeout(function() {
          console.log("continue meltd");
          this.fsm.melt();
          console.log(this.fsm.state);
        }.bind(this), 1e3);
        this.fsm.freeze();
        console.log(this.fsm.state);
        console.log(visualize(this.fsm));
      }
    });
    cc._RF.pop();
  }, {
    "state-machine": "state-machine",
    "state-machine-visualize": "state-machine-visualize"
  } ],
  PoolHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2abece5O/9CH4bM2CUim0ve", "PoolHandler");
    "use strict";
    var lastClick = 0;
    function pauseresume() {
      var now = Date.now();
      if (now - lastClick < 300) {
        this.stopAllActions();
        var pool = this.getComponent("PoolHandler")._pool;
        pool ? pool.put(this) : this.removeFromParent(true);
      } else {
        this.paused ? cc.director.getActionManager().resumeTarget(this) : cc.director.getActionManager().pauseTarget(this);
        this.paused = !this.paused;
      }
      lastClick = now;
    }
    var PoolHandler = cc.Class({
      extends: cc.Component,
      properties: {
        _pool: null
      },
      onLoad: function onLoad() {
        this.reuse();
      },
      unuse: function unuse() {
        this.node.off(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
      },
      reuse: function reuse() {
        this.node.paused = false;
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
      }
    });
    module.exports = PoolHandler;
    cc._RF.pop();
  }, {} ],
  Types: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6265atsTFIyIyUEOexlFUc", "Types");
    "use strict";
    var Rank = [ "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2" ];
    var Suit = [ "\u2663", "\u2660", "\u2665", "\u2666" ];
    function Card(point, suit) {
      Object.defineProperties(this, {
        point: {
          value: point,
          writable: false
        },
        suit: {
          value: suit,
          writable: false
        },
        id: {
          value: 13 * suit + point,
          writable: false
        },
        pointName: {
          get: function get() {
            return Rank[this.point];
          }
        },
        suitName: {
          get: function get() {
            return Suit[this.suit];
          }
        },
        isBlackSuit: {
          get: function get() {
            return 0 === this.suit || 1 === this.suit;
          }
        },
        isRedSuit: {
          get: function get() {
            return 2 === this.suit || 3 === this.suit;
          }
        }
      });
    }
    Card.prototype.toString = function() {
      return this.pointName + this.suitName;
    };
    var cards = new Array(52);
    Card.fromId = function(id) {
      return cards[id];
    };
    Card.from = function(point, suit) {
      return Card.fromId(Rank.indexOf(point) + 13 * Suit.indexOf(suit));
    };
    function Player(index, name, gold, avatar, cards) {
      gold = void 0 === gold ? 0 : gold;
      avatar = void 0 === avatar ? 0 : avatar;
      cards = void 0 === cards ? [] : cards;
      Object.defineProperties(this, {
        index: {
          value: index,
          writable: false
        },
        name: {
          value: name,
          writable: false
        },
        gold: {
          writable: true,
          value: gold
        },
        avatar: {
          writable: true,
          value: avatar
        },
        cards: {
          writable: true,
          value: cards
        }
      });
    }
    function Table(id, stake, pot) {
      Object.defineProperties(this, {
        id: {
          value: id,
          writable: false
        },
        stake: {
          value: stake,
          writable: false
        },
        pot: {
          writable: true,
          value: pot
        }
      });
    }
    (function createCards() {
      for (var s = 0; s < 4; s++) for (var p = 0; p < 13; p++) {
        var card = new Card(p, s);
        cards[card.id] = card;
      }
    })();
    module.exports = {
      Rank: Rank,
      Suit: Suit,
      Card: Card,
      Player: Player,
      Table: Table
    };
    cc._RF.pop();
  }, {} ],
  Utility: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03f42tN4dFFZ57ZmRNgSNMC", "Utility");
    "use strict";
    var Utility = {};
    Utility.units = [ {
      prefix: "G",
      l: 12,
      div: 1e12
    }, {
      prefix: "B",
      l: 9,
      div: 1e9
    }, {
      prefix: "M",
      l: 6,
      div: 1e6
    }, {
      prefix: "K",
      l: 4,
      div: 1e3
    }, {
      prefix: "",
      l: 3,
      div: 1
    } ];
    Utility.formatMoney = function(money, unit, separator) {
      void 0 === unit && (unit = "");
      return unit + Utility.formatAlignNumber(money, separator);
    };
    Utility.formatMoneyFull = function(money, unit, separator) {
      void 0 === unit && (unit = "");
      return unit + Utility.formatAlignNumber(money, separator, true);
    };
    Utility.formatAlignNumber = function(number, separator, isFull) {
      if (void 0 === number) return "0";
      number -= -.1;
      void 0 === separator && (separator = ",");
      void 0 === isFull && (isFull = false);
      var isNegative = number < 0;
      number = Math.abs(Math.round(number));
      var numString = number.toString();
      if (isFull) {
        var curIndex = numString.length - 3;
        while (curIndex > 0) {
          numString = numString.insertAt(curIndex, separator);
          curIndex -= 3;
        }
      } else {
        var units = Utility.units;
        for (var i = 0, length = units.length; i < length; ++i) if (numString.length > units[i].l) {
          var tmpNumArr = (number / units[i].div).toString().split(".");
          var fixedLength = tmpNumArr[0].length > 2 ? 1 : 2;
          if (tmpNumArr[0].length > 3) {
            curIndex = tmpNumArr[0].length - 3;
            while (curIndex > 0) {
              tmpNumArr[0] = tmpNumArr[0].insertAt(curIndex, separator);
              curIndex -= 3;
            }
          }
          numString = tmpNumArr[0];
          tmpNumArr.length > 1 && (numString += "." + tmpNumArr[1].substr(0, fixedLength));
          numString += units[i].prefix;
          break;
        }
      }
      isNegative && (numString = "-" + numString);
      return numString;
    };
    module.exports = Utility;
    cc._RF.pop();
  }, {} ],
  "state-machine-history": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bd92evp1ZJZ6xCHMU25nST", "state-machine-history");
    "use strict";
    function _typeof(obj) {
      _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj;
      } : function _typeof(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      return _typeof(obj);
    }
    (function webpackUniversalModuleDefinition(root, factory) {
      "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) ? module.exports = factory() : "function" === typeof define && define.amd ? define("StateMachineHistory", [], factory) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? exports["StateMachineHistory"] = factory() : root["StateMachineHistory"] = factory();
    })(void 0, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.l = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
          return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
          __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        };
        __webpack_require__.n = function(module) {
          var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
          } : function getModuleExports() {
            return module;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 1);
      }([ function(module, exports, __webpack_require__) {
        function camelize(label) {
          if (0 === label.length) return label;
          var n, result, word, words = label.split(/[_-]/);
          if (1 === words.length && words[0][0].toLowerCase() === words[0][0]) return label;
          result = words[0].toLowerCase();
          for (n = 1; n < words.length; n++) result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
          return result;
        }
        camelize.prepended = function(prepend, label) {
          label = camelize(label);
          return prepend + label[0].toUpperCase() + label.substring(1);
        };
        module.exports = camelize;
      }, function(module, exports, __webpack_require__) {
        var camelize = __webpack_require__(0);
        module.exports = function(options) {
          options = options || {};
          var past = camelize(options.name || options.past || "history"), future = camelize(options.future || "future"), clear = camelize.prepended("clear", past), back = camelize.prepended(past, "back"), forward = camelize.prepended(past, "forward"), canBack = camelize.prepended("can", back), canForward = camelize.prepended("can", forward), max = options.max;
          var plugin = {
            configure: function configure(config) {
              config.addTransitionLifecycleNames(back);
              config.addTransitionLifecycleNames(forward);
            },
            init: function init(instance) {
              instance[past] = [];
              instance[future] = [];
            },
            lifecycle: function lifecycle(instance, _lifecycle) {
              if ("onEnterState" === _lifecycle.event) {
                instance[past].push(_lifecycle.to);
                max && instance[past].length > max && instance[past].shift();
                _lifecycle.transition !== back && _lifecycle.transition !== forward && (instance[future].length = 0);
              }
            },
            methods: {},
            properties: {}
          };
          plugin.methods[clear] = function() {
            this[past].length = 0;
            this[future].length = 0;
          };
          plugin.properties[canBack] = {
            get: function get() {
              return this[past].length > 1;
            }
          };
          plugin.properties[canForward] = {
            get: function get() {
              return this[future].length > 0;
            }
          };
          plugin.methods[back] = function() {
            if (!this[canBack]) throw Error("no history");
            var from = this[past].pop(), to = this[past].pop();
            this[future].push(from);
            this._fsm.transit(back, from, to, []);
          };
          plugin.methods[forward] = function() {
            if (!this[canForward]) throw Error("no history");
            var from = this.state, to = this[future].pop();
            this._fsm.transit(forward, from, to, []);
          };
          return plugin;
        };
      } ]);
    });
    cc._RF.pop();
  }, {} ],
  "state-machine-visualize": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a309EP+LRF8YsSguHpvS/m", "state-machine-visualize");
    "use strict";
    function _typeof(obj) {
      _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj;
      } : function _typeof(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      return _typeof(obj);
    }
    (function webpackUniversalModuleDefinition(root, factory) {
      "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) ? module.exports = factory() : "function" === typeof define && define.amd ? define("StateMachineVisualize", [], factory) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? exports["StateMachineVisualize"] = factory() : root["StateMachineVisualize"] = factory();
    })(void 0, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.l = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
          return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
          __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        };
        __webpack_require__.n = function(module) {
          var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
          } : function getModuleExports() {
            return module;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 1);
      }([ function(module, exports, __webpack_require__) {
        module.exports = function(target, sources) {
          var n, source, key;
          for (n = 1; n < arguments.length; n++) {
            source = arguments[n];
            for (key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
          }
          return target;
        };
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0);
        function visualize(fsm, options) {
          return dotify(dotcfg(fsm, options));
        }
        function dotcfg(fsm, options) {
          options = options || {};
          var config = dotcfg.fetch(fsm), name = options.name, rankdir = dotcfg.rankdir(options.orientation), states = dotcfg.states(config, options), transitions = dotcfg.transitions(config, options), result = {};
          name && (result.name = name);
          rankdir && (result.rankdir = rankdir);
          states && states.length > 0 && (result.states = states);
          transitions && transitions.length > 0 && (result.transitions = transitions);
          return result;
        }
        dotcfg.fetch = function(fsm) {
          return "function" === typeof fsm ? fsm.prototype._fsm.config : fsm._fsm.config;
        };
        dotcfg.rankdir = function(orientation) {
          if ("horizontal" === orientation) return "LR";
          if ("vertical" === orientation) return "TB";
        };
        dotcfg.states = function(config, options) {
          var index, states = config.states;
          if (!options.init) {
            index = states.indexOf(config.init.from);
            states = states.slice(0, index).concat(states.slice(index + 1));
          }
          return states;
        };
        dotcfg.transitions = function(config, options) {
          var n, max, transition, init = config.init, transitions = config.options.transitions || [], output = [];
          options.init && init.active && dotcfg.transition(init.name, init.from, init.to, init.dot, config, options, output);
          for (n = 0, max = transitions.length; n < max; n++) {
            transition = config.options.transitions[n];
            dotcfg.transition(transition.name, transition.from, transition.to, transition.dot, config, options, output);
          }
          return output;
        };
        dotcfg.transition = function(name, from, to, dot, config, options, output) {
          var n, max, wildcard = config.defaults.wildcard;
          if (Array.isArray(from)) for (n = 0, max = from.length; n < max; n++) dotcfg.transition(name, from[n], to, dot, config, options, output); else if (from === wildcard || void 0 === from) for (n = 0, 
          max = config.states.length; n < max; n++) dotcfg.transition(name, config.states[n], to, dot, config, options, output); else to === wildcard || void 0 === to ? dotcfg.transition(name, from, from, dot, config, options, output) : "function" === typeof to || output.push(mixin({}, {
            from: from,
            to: to,
            label: pad(name)
          }, dot || {}));
        };
        function pad(name) {
          return " " + name + " ";
        }
        function quote(name) {
          return '"' + name + '"';
        }
        function dotify(dotcfg) {
          dotcfg = dotcfg || {};
          var name = dotcfg.name || "fsm", states = dotcfg.states || [], transitions = dotcfg.transitions || [], rankdir = dotcfg.rankdir, output = [], n, max;
          output.push("digraph " + quote(name) + " {");
          rankdir && output.push("  rankdir=" + rankdir + ";");
          for (n = 0, max = states.length; n < max; n++) output.push(dotify.state(states[n]));
          for (n = 0, max = transitions.length; n < max; n++) output.push(dotify.edge(transitions[n]));
          output.push("}");
          return output.join("\n");
        }
        dotify.state = function(state) {
          return "  " + quote(state) + ";";
        };
        dotify.edge = function(edge) {
          return "  " + quote(edge.from) + " -> " + quote(edge.to) + dotify.edge.attr(edge) + ";";
        };
        dotify.edge.attr = function(edge) {
          var n, max, key, keys = Object.keys(edge).sort(), output = [];
          for (n = 0, max = keys.length; n < max; n++) {
            key = keys[n];
            "from" !== key && "to" !== key && output.push(key + "=" + quote(edge[key]));
          }
          return output.length > 0 ? " [ " + output.join(" ; ") + " ]" : "";
        };
        visualize.dotcfg = dotcfg;
        visualize.dotify = dotify;
        module.exports = visualize;
      } ]);
    });
    cc._RF.pop();
  }, {} ],
  "state-machine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75189ssjqRPIJjNg8SblrCG", "state-machine");
    "use strict";
    function _typeof(obj) {
      _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj;
      } : function _typeof(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      return _typeof(obj);
    }
    (function webpackUniversalModuleDefinition(root, factory) {
      "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) ? module.exports = factory() : "function" === typeof define && define.amd ? define("StateMachine", [], factory) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? exports["StateMachine"] = factory() : root["StateMachine"] = factory();
    })(void 0, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.l = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
          return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
          __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        };
        __webpack_require__.n = function(module) {
          var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
          } : function getModuleExports() {
            return module;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 5);
      }([ function(module, exports, __webpack_require__) {
        module.exports = function(target, sources) {
          var n, source, key;
          for (n = 1; n < arguments.length; n++) {
            source = arguments[n];
            for (key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
          }
          return target;
        };
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0);
        module.exports = {
          build: function build(target, config) {
            var n, max, plugin, plugins = config.plugins;
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              plugin.methods && mixin(target, plugin.methods);
              plugin.properties && Object.defineProperties(target, plugin.properties);
            }
          },
          hook: function hook(fsm, name, additional) {
            var n, max, method, plugin, plugins = fsm.config.plugins, args = [ fsm.context ];
            additional && (args = args.concat(additional));
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              method = plugins[n][name];
              method && method.apply(plugin, args);
            }
          }
        };
      }, function(module, exports, __webpack_require__) {
        function camelize(label) {
          if (0 === label.length) return label;
          var n, result, word, words = label.split(/[_-]/);
          if (1 === words.length && words[0][0].toLowerCase() === words[0][0]) return label;
          result = words[0].toLowerCase();
          for (n = 1; n < words.length; n++) result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
          return result;
        }
        camelize.prepended = function(prepend, label) {
          label = camelize(label);
          return prepend + label[0].toUpperCase() + label.substring(1);
        };
        module.exports = camelize;
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), camelize = __webpack_require__(2);
        function Config(options, StateMachine) {
          options = options || {};
          this.options = options;
          this.defaults = StateMachine.defaults;
          this.states = [];
          this.transitions = [];
          this.map = {};
          this.lifecycle = this.configureLifecycle();
          this.init = this.configureInitTransition(options.init);
          this.data = this.configureData(options.data);
          this.methods = this.configureMethods(options.methods);
          this.map[this.defaults.wildcard] = {};
          this.configureTransitions(options.transitions || []);
          this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);
        }
        mixin(Config.prototype, {
          addState: function addState(name) {
            if (!this.map[name]) {
              this.states.push(name);
              this.addStateLifecycleNames(name);
              this.map[name] = {};
            }
          },
          addStateLifecycleNames: function addStateLifecycleNames(name) {
            this.lifecycle.onEnter[name] = camelize.prepended("onEnter", name);
            this.lifecycle.onLeave[name] = camelize.prepended("onLeave", name);
            this.lifecycle.on[name] = camelize.prepended("on", name);
          },
          addTransition: function addTransition(name) {
            if (this.transitions.indexOf(name) < 0) {
              this.transitions.push(name);
              this.addTransitionLifecycleNames(name);
            }
          },
          addTransitionLifecycleNames: function addTransitionLifecycleNames(name) {
            this.lifecycle.onBefore[name] = camelize.prepended("onBefore", name);
            this.lifecycle.onAfter[name] = camelize.prepended("onAfter", name);
            this.lifecycle.on[name] = camelize.prepended("on", name);
          },
          mapTransition: function mapTransition(transition) {
            var name = transition.name, from = transition.from, to = transition.to;
            this.addState(from);
            "function" !== typeof to && this.addState(to);
            this.addTransition(name);
            this.map[from][name] = transition;
            return transition;
          },
          configureLifecycle: function configureLifecycle() {
            return {
              onBefore: {
                transition: "onBeforeTransition"
              },
              onAfter: {
                transition: "onAfterTransition"
              },
              onEnter: {
                state: "onEnterState"
              },
              onLeave: {
                state: "onLeaveState"
              },
              on: {
                transition: "onTransition"
              }
            };
          },
          configureInitTransition: function configureInitTransition(init) {
            if ("string" === typeof init) return this.mapTransition(mixin({}, this.defaults.init, {
              to: init,
              active: true
            }));
            if ("object" === _typeof(init)) return this.mapTransition(mixin({}, this.defaults.init, init, {
              active: true
            }));
            this.addState(this.defaults.init.from);
            return this.defaults.init;
          },
          configureData: function configureData(data) {
            return "function" === typeof data ? data : "object" === _typeof(data) ? function() {
              return data;
            } : function() {
              return {};
            };
          },
          configureMethods: function configureMethods(methods) {
            return methods || {};
          },
          configurePlugins: function configurePlugins(plugins, builtin) {
            plugins = plugins || [];
            var n, max, plugin;
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              "function" === typeof plugin && (plugins[n] = plugin = plugin());
              plugin.configure && plugin.configure(this);
            }
            return plugins;
          },
          configureTransitions: function configureTransitions(transitions) {
            var i, n, transition, from, to, wildcard = this.defaults.wildcard;
            for (n = 0; n < transitions.length; n++) {
              transition = transitions[n];
              from = Array.isArray(transition.from) ? transition.from : [ transition.from || wildcard ];
              to = transition.to || wildcard;
              for (i = 0; i < from.length; i++) this.mapTransition({
                name: transition.name,
                from: from[i],
                to: to
              });
            }
          },
          transitionFor: function transitionFor(state, transition) {
            var wildcard = this.defaults.wildcard;
            return this.map[state][transition] || this.map[wildcard][transition];
          },
          transitionsFor: function transitionsFor(state) {
            var wildcard = this.defaults.wildcard;
            return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));
          },
          allStates: function allStates() {
            return this.states;
          },
          allTransitions: function allTransitions() {
            return this.transitions;
          }
        });
        module.exports = Config;
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), Exception = __webpack_require__(6), plugin = __webpack_require__(1), UNOBSERVED = [ null, [] ];
        function JSM(context, config) {
          this.context = context;
          this.config = config;
          this.state = config.init.from;
          this.observers = [ context ];
        }
        mixin(JSM.prototype, {
          init: function init(args) {
            mixin(this.context, this.config.data.apply(this.context, args));
            plugin.hook(this, "init");
            if (this.config.init.active) return this.fire(this.config.init.name, []);
          },
          is: function is(state) {
            return Array.isArray(state) ? state.indexOf(this.state) >= 0 : this.state === state;
          },
          isPending: function isPending() {
            return this.pending;
          },
          can: function can(transition) {
            return !this.isPending() && !!this.seek(transition);
          },
          cannot: function cannot(transition) {
            return !this.can(transition);
          },
          allStates: function allStates() {
            return this.config.allStates();
          },
          allTransitions: function allTransitions() {
            return this.config.allTransitions();
          },
          transitions: function transitions() {
            return this.config.transitionsFor(this.state);
          },
          seek: function seek(transition, args) {
            var wildcard = this.config.defaults.wildcard, entry = this.config.transitionFor(this.state, transition), to = entry && entry.to;
            return "function" === typeof to ? to.apply(this.context, args) : to === wildcard ? this.state : to;
          },
          fire: function fire(transition, args) {
            return this.transit(transition, this.state, this.seek(transition, args), args);
          },
          transit: function transit(transition, from, to, args) {
            var lifecycle = this.config.lifecycle, changed = this.config.options.observeUnchangedState || from !== to;
            if (!to) return this.context.onInvalidTransition(transition, from, to);
            if (this.isPending()) return this.context.onPendingTransition(transition, from, to);
            this.config.addState(to);
            this.beginTransit();
            args.unshift({
              transition: transition,
              from: from,
              to: to,
              fsm: this.context
            });
            return this.observeEvents([ this.observersForEvent(lifecycle.onBefore.transition), this.observersForEvent(lifecycle.onBefore[transition]), changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED, this.observersForEvent(lifecycle.on.transition), changed ? [ "doTransit", [ this ] ] : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter[to]) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.on[to]) : UNOBSERVED, this.observersForEvent(lifecycle.onAfter.transition), this.observersForEvent(lifecycle.onAfter[transition]), this.observersForEvent(lifecycle.on[transition]) ], args);
          },
          beginTransit: function beginTransit() {
            this.pending = true;
          },
          endTransit: function endTransit(result) {
            this.pending = false;
            return result;
          },
          failTransit: function failTransit(result) {
            this.pending = false;
          },
          doTransit: function doTransit(lifecycle) {
            this.state = lifecycle.to;
          },
          observe: function observe(args) {
            if (2 === args.length) {
              var observer = {};
              observer[args[0]] = args[1];
              this.observers.push(observer);
            } else this.observers.push(args[0]);
          },
          observersForEvent: function observersForEvent(event) {
            var n = 0, max = this.observers.length, observer, result = [];
            for (;n < max; n++) {
              observer = this.observers[n];
              observer[event] && result.push(observer);
            }
            return [ event, result, true ];
          },
          observeEvents: function observeEvents(events, args, previousEvent, previousResult) {
            if (0 === events.length) return this.endTransit(void 0 === previousResult || previousResult);
            var event = events[0][0], observers = events[0][1], pluggable = events[0][2];
            args[0].event = event;
            event && pluggable && event !== previousEvent && plugin.hook(this, "lifecycle", args);
            if (0 === observers.length) {
              events.shift();
              return this.observeEvents(events, args, event, previousResult);
            }
            var observer = observers.shift(), result = observer[event].apply(observer, args);
            return result && "function" === typeof result.then ? result.then(this.observeEvents.bind(this, events, args, event))["catch"](this.failTransit.bind(this)) : false === result ? this.endTransit(false) : this.observeEvents(events, args, event, result);
          },
          onInvalidTransition: function onInvalidTransition(transition, from, to) {
            throw new Exception("transition is invalid in current state", transition, from, to, this.state);
          },
          onPendingTransition: function onPendingTransition(transition, from, to) {
            throw new Exception("transition is invalid while previous transition is still in progress", transition, from, to, this.state);
          }
        });
        module.exports = JSM;
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), camelize = __webpack_require__(2), plugin = __webpack_require__(1), Config = __webpack_require__(3), JSM = __webpack_require__(4);
        var PublicMethods = {
          is: function is(state) {
            return this._fsm.is(state);
          },
          can: function can(transition) {
            return this._fsm.can(transition);
          },
          cannot: function cannot(transition) {
            return this._fsm.cannot(transition);
          },
          observe: function observe() {
            return this._fsm.observe(arguments);
          },
          transitions: function transitions() {
            return this._fsm.transitions();
          },
          allTransitions: function allTransitions() {
            return this._fsm.allTransitions();
          },
          allStates: function allStates() {
            return this._fsm.allStates();
          },
          onInvalidTransition: function onInvalidTransition(t, from, to) {
            return this._fsm.onInvalidTransition(t, from, to);
          },
          onPendingTransition: function onPendingTransition(t, from, to) {
            return this._fsm.onPendingTransition(t, from, to);
          }
        };
        var PublicProperties = {
          state: {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this._fsm.state;
            },
            set: function set(state) {
              throw Error("use transitions to change state");
            }
          }
        };
        function StateMachine(options) {
          return apply(this || {}, options);
        }
        function factory() {
          var cstor, options;
          if ("function" === typeof arguments[0]) {
            cstor = arguments[0];
            options = arguments[1] || {};
          } else {
            cstor = function cstor() {
              this._fsm.apply(this, arguments);
            };
            options = arguments[0] || {};
          }
          var config = new Config(options, StateMachine);
          build(cstor.prototype, config);
          cstor.prototype._fsm.config = config;
          return cstor;
        }
        function apply(instance, options) {
          var config = new Config(options, StateMachine);
          build(instance, config);
          instance._fsm();
          return instance;
        }
        function build(target, config) {
          if ("object" !== _typeof(target) || Array.isArray(target)) throw Error("StateMachine can only be applied to objects");
          plugin.build(target, config);
          Object.defineProperties(target, PublicProperties);
          mixin(target, PublicMethods);
          mixin(target, config.methods);
          config.allTransitions().forEach(function(transition) {
            target[camelize(transition)] = function() {
              return this._fsm.fire(transition, [].slice.call(arguments));
            };
          });
          target._fsm = function() {
            this._fsm = new JSM(this, config);
            this._fsm.init(arguments);
          };
        }
        StateMachine.version = "3.0.1";
        StateMachine.factory = factory;
        StateMachine.apply = apply;
        StateMachine.defaults = {
          wildcard: "*",
          init: {
            name: "init",
            from: "none"
          }
        };
        module.exports = StateMachine;
      }, function(module, exports, __webpack_require__) {
        module.exports = function(message, transition, from, to, current) {
          this.message = message;
          this.transition = transition;
          this.from = from;
          this.to = to;
          this.current = current;
        };
      } ]);
    });
    cc._RF.pop();
  }, {} ],
  "use_v2.0.x_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe3beTJ7JpC+onOsVF/3MEf", "use_v2.0.x_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_check = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Game", "CAudio", "CBtnDownload", "CBtnStep1", "CBtnStep2", "CBtnStep3", "CCard", "CCircleAvatar", "CEffectWin", "CLayerGame", "CPlayer", "CProgressWaterAni", "CTable", "CardUtils", "GameController", "GameFake", "PlayableAds", "PlayableState", "PoolHandler", "Types", "Utility", "state-machine-history", "state-machine-visualize", "state-machine" ]);