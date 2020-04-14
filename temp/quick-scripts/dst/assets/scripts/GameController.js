
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0998cn5M2hCaJbNVw/MXvof', 'GameController');
// scripts/GameController.js

"use strict";

var PlayableState = require('PlayableState');

var PoolHandler = require("PoolHandler");

var CCard = require("CCard");

var CTable = require("CTable");

var CPlayer = require("CPlayer");

var _require = require("Types"),
    Card = _require.Card,
    Table = _require.Table,
    Player = _require.Player;

var _require2 = require("GameFake"),
    ActionType = _require2.ActionType,
    GameFake = _require2.GameFake,
    SoundType = _require2.SoundType;

var PlayableAds = require("PlayableAds");

var CAudio = require("CAudio");

var Utility = require("Utility");

cc.Class({
  "extends": cc.Component,
  properties: {
    playableState: {
      "default": null,
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
      "default": null,
      type: cc.Node
    },
    players: {
      "default": [],
      type: cc.Node
    },
    layerCard: {
      "default": null,
      type: cc.Node
    },
    nodeSuggestGesture: {
      "default": null,
      type: cc.Node
    },
    nodeCHPlay: {
      "default": null,
      type: cc.Node
    },
    effectWin: {
      "default": null,
      type: cc.Node
    },
    cardPrefab: {
      "default": null,
      type: cc.Prefab
    },
    imgHands: {
      "default": [],
      type: [cc.Sprite]
    },
    emoPlayers: {
      "default": [],
      type: [cc.Node]
    },
    _poolCard: {
      "default": null,
      type: cc.NodePool,
      visible: false
    },
    _gameFake: {
      "default": null,
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
    this._posHands = [];
  },
  onLoad: function onLoad() {
    for (var i = 0; i < this.imgHands.length; i++) {
      this._posHands.push(this.imgHands[i].node.getPosition());
    }

    this.nodeCHPlay.active = false;
    this.effectWin.getComponent("CEffectWin").gameController = this;
    this.nodeSuggestGesture.active = false;
    this.attachLayerCardToPlayer();
    this.audio = this.node.getComponent(CAudio);
    this.effectWin.active = false; //1. khoi tao info ban dau

    this._poolCard = new cc.NodePool(CCard);
    this._gameFake = new GameFake();

    var gameInfo = this._gameFake.getDefaultInfo();

    var tableConfig = gameInfo.table;
    var table = new Table(tableConfig.id, tableConfig.stake, tableConfig.pot);
    this.table.getComponent(CTable).setTable(table); //create new Card on Dock

    var cards = tableConfig.dock;
    var cTable = this.table.getComponent(CTable);
    cTable.setNumCard(cards.length);

    for (var j = 0; j < cards.length; j++) {
      var c = cards[j];

      var cardPrefabs = this._poolCard.get();

      if (!cardPrefabs) {
        cardPrefabs = cc.instantiate(this.cardPrefab);
      }

      var cCard = cardPrefabs.getComponent(CCard);
      cCard.setCard(c);
      cCard.index = j;
      cCard.setOwner(cTable);
      var p = cTable.getPositionCard(cCard);
      cardPrefabs.setPosition(p);
      this.layerCard.addChild(cardPrefabs);
    }

    console.log("onEnable players:" + this.players.length); //update info avatar + load card

    var playersConfig = gameInfo.players;

    for (var k = 0; k < playersConfig.length; k++) {
      var playerConfig = playersConfig[k];
      var player = new Player(playerConfig.index, playerConfig.displayName, playerConfig.gold, playerConfig.avatarIndex, playerConfig.cards);
      console.log("get palyer at:" + player.index);
      var cPlayer = this.players[player.index].getComponent(CPlayer);
      cPlayer.setGameController(this);
      cPlayer.setPlayer(player);
    } //load prefab cardPrefabs
    // cc.loader.loadRes("prefabs/cardPrefab", function (err, prefab) {
    //     var newNode = cc.instantiate(prefab);
    //     newNode.setPosition(100,100);
    //     this.layerGame.addChild(newNode);
    //     // cc.director.getScene().addChild(newNode);
    // }.bind(this));


    this.node.on("card-touch", this.onTouchCard, this);

    var actionConfig = this._gameFake.getAction();

    var delayTime = actionConfig.time;
    this.curIndex = actionConfig.index;
    this.onEnterTurn(actionConfig.index);

    if (delayTime > 0) {
      this.scheduleOnce(function () {
        this.executeAction();
      }.bind(this), delayTime);
    } // this._playEmo(5);
    //
    // setTimeout(function () {
    //     this._playEmo(4);
    // }.bind(this),2000);

  },
  _playEmo: function _playEmo(index) {
    console.log("play emo:" + index);
    var emo = this.emoPlayers[index];

    if (emo) {
      var spine = emo.getComponent('sp.Skeleton'); // spine.setStartListener(function(trackEntry){
      //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
      //     cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
      // });
      // spine.setInterruptListener(function (trackEntry){
      //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
      //     cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
      // });
      // spine.setEndListener(function (trackEntry){
      //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
      //     cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
      // });
      // spine.setDisposeListener(function (trackEntry){
      //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
      //     cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
      // });

      spine.setCompleteListener(function (trackEntry) {
        emo.active = false; // var animationName = trackEntry.animation ? trackEntry.animation.name : "";
        // // if (animationName === 'shoot') {
        // //     this.spine.clearTrack(1);
        // // }
        // var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
        // cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
      }); // spine.setEventListener(function(trackEntry, event){
      //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
      //     cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
      // });

      emo.active = true;
      spine.setAnimation(0, 'animation', false);
    }
  },
  start: function start() {},
  onEnable: function onEnable() {
    console.log("onEnable players:" + this.players.length);
  },
  attachLayerCardToPlayer: function attachLayerCardToPlayer() {
    var len = this.players.length;

    for (var i = 0; i < len; i++) {
      var cPlayer = this.players[i].getComponent("CPlayer");
      cPlayer.setLayerCard(this.layerCard);
    }
  },
  onEnterTurn: function onEnterTurn(index) {
    console.log("onEnterTurn: " + index);
    var cPlayer = this.players[index].getComponent(CPlayer);
    cPlayer.onEnterTurn();
  },
  executeAction: function executeAction() {
    this.nodeSuggestGesture.active = false;

    var actionConfig = this._gameFake.getAction();

    console.log("executeAction:" + JSON.stringify(actionConfig));
    var index = actionConfig.index;
    var type = actionConfig.type;

    switch (type) {
      case ActionType.PASS:
        this.onPassAt(index);
        break;

      case ActionType.DISCARD:
        this.onDiscardAt(index, actionConfig.cards, actionConfig.group);
        break;
    }

    var sound = actionConfig.sound;

    if (sound) {
      this.audio.playAudio(sound);
    }

    var emo = actionConfig.emo;

    if (emo != null) {
      if (emo instanceof Array) {
        for (var k = 0; k < emo.length; k++) {
          setTimeout(function (i) {
            this._playEmo(i);
          }.bind(this, emo[k]), k * 2000);
        }
      } else {
        this._playEmo(emo);
      }
    }

    if (actionConfig.isEnded) {
      this.effectWin.active = true;

      for (var i = 0; i < this.imgHands.length; i++) {
        var hand = this.imgHands[i];
        hand.node.runAction(cc.moveBy(0.5, 0, -300));
      }
    } else {
      this.curIndex = actionConfig.next;

      var actionNext = this._gameFake.next();

      if (actionNext) {
        this.onEnterTurn(actionNext.index);
        console.log("actionNext:" + JSON.stringify(actionNext));
        var delayTime = actionNext.time;

        if (delayTime > 0) {
          this.scheduleOnce(function () {
            var actionConfig = this._gameFake.getAction();

            var index = actionConfig.index;

            if (index === 0) {
              if (actionConfig.suggest) {
                //neu co suggest
                this.nodeSuggestGesture.active = true;
                this.players[0].getComponent(CPlayer).onSuggestCard(actionConfig.cards);
              }

              this.cardExpects = actionConfig.cards;
              return;
            }

            this.executeAction();
          }.bind(this), delayTime);
        }
      }
    }
  },
  onPassAt: function onPassAt(index) {
    console.log("onPassAt:" + index);
    var cPlayer = this.players[index].getComponent(CPlayer);
    cPlayer.onPass();
  },
  onDiscardAt: function onDiscardAt(index, cards, groupType) {
    console.log("onDiscardAt:" + index + "|" + JSON.stringify(cards));
    var cTable = this.table.getComponent(CTable);
    var cardPrefabs = this.players[index].getComponent(CPlayer).onDiscard(cards);

    var effectDiscard = function effectDiscard(cardPrefab) {
      //1. move den dock -> xoay lai 0 do -> nay bat ra ra 1 ti
      var cCard = cardPrefab.getComponent(CCard);
      var len = cTable.numCard;
      var index = cCard.index;
      var p = cTable.getPositionCard(cCard);
      var duration = 0.3;
      var duration1 = 0.15;
      cardPrefab.runAction(cc.sequence(cc.spawn(cc.moveTo(duration, p), cc.rotateTo(duration, 0), cc.sequence(cc.scaleTo(duration / 2, 1.2, 1.2), cc.scaleTo(duration / 2, 0.95, 0.95))), cc.spawn(cc.scaleTo(duration1, 1, 1), cc.moveTo(duration1, p.x + Math.random() * 10 * (index - (len - 1) / 2), p.y), cc.rotateTo(duration1, (index - (len - 1) / 2) * Math.random() * 4))));
    };

    var len = cardPrefabs.length;
    cTable.setNumCard(len);

    for (var k = 0; k < len; k++) {
      var cardPrefab = cardPrefabs[k];
      var cCard = cardPrefab.getComponent(CCard);
      cCard.index = k;
      cCard.owner = cTable;
      cardPrefab.zIndex = ++this.zIndexCard;
      effectDiscard(cardPrefab); // var p = cTable.getPositionCard(cCard);
      // cardPrefab.runAction(cc.spawn(
      //     cc.moveTo(0.15,p),
      //     cc.rotateTo(1,0)
      // ));
      // cc.log("newZIndex:" + this.zIndexCard);
      //duoc add khi tao ra
      // this.layerGame.addChild(cardPrefab);
    } // for (var j = 0; j < cards.length; j++) {
    //     var c = cards[j];
    //
    //     var cardPrefabs = this._poolCard.get();
    //     if(!cardPrefabs){cardPrefabs = cc.instantiate(this.cardPrefab);}
    //
    //     var cCard = cardPrefabs.getComponent(CCard);
    //
    //     cCard.setCard(c);
    //     cCard.index = (j);
    //     cCard.owner = cTable;
    //
    //     var p = cTable.getPositionCard(cCard);
    //     cardPrefabs.setPosition(p);
    //     this.layerGame.addChild(cardPrefabs);
    // }

  },
  onTouchCard: function onTouchCard(event) {
    var data = event.getUserData();
    var cCard = data.card;
    var owner = cCard.owner;

    if (owner instanceof CTable) {
      console.log("passing card on table");
      return;
    }

    if (owner instanceof CPlayer) {
      if (this.isMyTurn()) {
        if (this.isTouchExpectCards(cCard.card)) {
          switch (data.event.type) {
            case cc.Node.EventType.TOUCH_START:
              this.startPointTouch = data.event.getLocation();
              break;

            case cc.Node.EventType.TOUCH_MOVE:
              break;

            case cc.Node.EventType.TOUCH_END:
            case cc.Node.EventType.TOUCH_CANCEL:
              if (this.startPointTouch) {
                var pos = data.event.getLocation();

                if (pos.y - this.startPointTouch.y > 45) {
                  this.executeAction();
                  cc.log("Discard on my turn");
                } else {
                  cc.log("!!Discard on my turn");
                }
              }

              cc.log("touch:" + JSON.stringify(this.startPointTouch) + "| " + JSON.stringify(pos));
              break;
          }
        } else {
          cc.log("not expects card");
        }
      } else {
        cc.log("not my turn");
      } // owner.onTouchCard(data.event,data.card)

    } // console.log("onTouchCard at controler");

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

    if (!cardPrefab) {
      cardPrefab = cc.instantiate(this.cardPrefab);
    }

    return cardPrefab;
  },
  isMyTurn: function isMyTurn() {
    return this.curIndex === 0;
  },
  isTouchExpectCards: function isTouchExpectCards(card) {
    var len = this.cardExpects.length;

    for (var i = 0; i < len; i++) {
      var c = this.cardExpects[i];

      if (c.id === card.id) {
        return true;
      }
    }

    return false;
  },
  showNodeCHPlay: function showNodeCHPlay() {
    this.nodeCHPlay.active = true;
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGxheWFibGVTdGF0ZSIsInJlcXVpcmUiLCJQb29sSGFuZGxlciIsIkNDYXJkIiwiQ1RhYmxlIiwiQ1BsYXllciIsIkNhcmQiLCJUYWJsZSIsIlBsYXllciIsIkFjdGlvblR5cGUiLCJHYW1lRmFrZSIsIlNvdW5kVHlwZSIsIlBsYXlhYmxlQWRzIiwiQ0F1ZGlvIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWFibGVTdGF0ZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImJ0bkR1bXAiLCJidG5QYXNzIiwibGF5ZXJHYW1lIiwiTm9kZSIsImxheWVyQWN0aW9uIiwidGFibGUiLCJwbGF5ZXJzIiwibGF5ZXJDYXJkIiwibm9kZVN1Z2dlc3RHZXN0dXJlIiwibm9kZUNIUGxheSIsImVmZmVjdFdpbiIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJpbWdIYW5kcyIsIlNwcml0ZSIsImVtb1BsYXllcnMiLCJfcG9vbENhcmQiLCJOb2RlUG9vbCIsIl9nYW1lRmFrZSIsImN0b3IiLCJjdXJJbmRleCIsImNhcmRFeHBlY3RzIiwic3RhcnRQb2ludFRvdWNoIiwiekluZGV4Q2FyZCIsImF1ZGlvIiwiX3Bvc0hhbmRzIiwib25Mb2FkIiwiaSIsImxlbmd0aCIsInB1c2giLCJub2RlIiwiZ2V0UG9zaXRpb24iLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJnYW1lQ29udHJvbGxlciIsImF0dGFjaExheWVyQ2FyZFRvUGxheWVyIiwiZ2FtZUluZm8iLCJnZXREZWZhdWx0SW5mbyIsInRhYmxlQ29uZmlnIiwiaWQiLCJzdGFrZSIsInBvdCIsInNldFRhYmxlIiwiY2FyZHMiLCJkb2NrIiwiY1RhYmxlIiwic2V0TnVtQ2FyZCIsImoiLCJjIiwiY2FyZFByZWZhYnMiLCJnZXQiLCJpbnN0YW50aWF0ZSIsImNDYXJkIiwic2V0Q2FyZCIsImluZGV4Iiwic2V0T3duZXIiLCJwIiwiZ2V0UG9zaXRpb25DYXJkIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJzQ29uZmlnIiwiayIsInBsYXllckNvbmZpZyIsInBsYXllciIsImRpc3BsYXlOYW1lIiwiZ29sZCIsImF2YXRhckluZGV4IiwiY1BsYXllciIsInNldEdhbWVDb250cm9sbGVyIiwic2V0UGxheWVyIiwib24iLCJvblRvdWNoQ2FyZCIsImFjdGlvbkNvbmZpZyIsImdldEFjdGlvbiIsImRlbGF5VGltZSIsInRpbWUiLCJvbkVudGVyVHVybiIsInNjaGVkdWxlT25jZSIsImV4ZWN1dGVBY3Rpb24iLCJiaW5kIiwiX3BsYXlFbW8iLCJlbW8iLCJzcGluZSIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJ0cmFja0VudHJ5Iiwic2V0QW5pbWF0aW9uIiwic3RhcnQiLCJvbkVuYWJsZSIsImxlbiIsInNldExheWVyQ2FyZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJQQVNTIiwib25QYXNzQXQiLCJESVNDQVJEIiwib25EaXNjYXJkQXQiLCJncm91cCIsInNvdW5kIiwicGxheUF1ZGlvIiwiQXJyYXkiLCJzZXRUaW1lb3V0IiwiaXNFbmRlZCIsImhhbmQiLCJydW5BY3Rpb24iLCJtb3ZlQnkiLCJuZXh0IiwiYWN0aW9uTmV4dCIsInN1Z2dlc3QiLCJvblN1Z2dlc3RDYXJkIiwib25QYXNzIiwiZ3JvdXBUeXBlIiwib25EaXNjYXJkIiwiZWZmZWN0RGlzY2FyZCIsIm51bUNhcmQiLCJkdXJhdGlvbiIsImR1cmF0aW9uMSIsInNlcXVlbmNlIiwic3Bhd24iLCJtb3ZlVG8iLCJyb3RhdGVUbyIsInNjYWxlVG8iLCJ4IiwiTWF0aCIsInJhbmRvbSIsInkiLCJvd25lciIsInpJbmRleCIsImV2ZW50IiwiZGF0YSIsImdldFVzZXJEYXRhIiwiY2FyZCIsImlzTXlUdXJuIiwiaXNUb3VjaEV4cGVjdENhcmRzIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJnZXRMb2NhdGlvbiIsIlRPVUNIX01PVkUiLCJUT1VDSF9FTkQiLCJUT1VDSF9DQU5DRUwiLCJwb3MiLCJvblBsYXlOb3ciLCJvbkNUQUNsaWNrIiwib25Ub3VjaER1bXAiLCJvblRvdWNoUGFzcyIsImdldE5ld0NhcmQiLCJzaG93Tm9kZUNIUGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQTNCOztBQUNBLElBQUlDLFdBQVcsR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBekI7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRyxNQUFNLEdBQUdILE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlJLE9BQU8sR0FBR0osT0FBTyxDQUFDLFNBQUQsQ0FBckI7O2VBQzBCQSxPQUFPLENBQUMsT0FBRDtJQUE1QkssZ0JBQUFBO0lBQUtDLGlCQUFBQTtJQUFNQyxrQkFBQUE7O2dCQUNzQlAsT0FBTyxDQUFDLFVBQUQ7SUFBeENRLHVCQUFBQTtJQUFXQyxxQkFBQUE7SUFBU0Msc0JBQUFBOztBQUN6QixJQUFJQyxXQUFXLEdBQUdYLE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLElBQUlZLE1BQU0sR0FBR1osT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSWEsT0FBTyxHQUFHYixPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFFQWMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFZRCxFQUFFLENBQUNFLFNBRFY7QUFFTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFjLElBREg7QUFFWEMsTUFBQUEsSUFBSSxFQUFVcEIsYUFGSDtBQUdYcUIsTUFBQUEsWUFBWSxFQUFFLEtBSEg7QUFJWEMsTUFBQUEsT0FBTyxFQUFPO0FBSkgsS0FEUDtBQU9SQyxJQUFBQSxVQUFVLEVBQUtS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RUFBQUEsUUFBUSxFQUFDLG9CQUFZO0FBQ2pCLFdBQU8sS0FBS2pILFFBQUwsS0FBa0IsQ0FBekI7QUFDSCxHQWxaSTtBQW1aTGtILEVBQUFBLGtCQUFrQixFQUFDLDRCQUFVRixJQUFWLEVBQWdCO0FBQy9CLFFBQUkxQyxHQUFHLEdBQUcsS0FBS3JFLFdBQUwsQ0FBaUJPLE1BQTNCOztBQUNBLFNBQUssSUFBSUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRytELEdBQXBCLEVBQXlCL0QsQ0FBQyxFQUExQixFQUE4QjtBQUMxQixVQUFJcUIsQ0FBQyxHQUFHLEtBQUszQixXQUFMLENBQWlCTSxDQUFqQixDQUFSOztBQUNBLFVBQUdxQixDQUFDLENBQUNULEVBQUYsS0FBUzZGLElBQUksQ0FBQzdGLEVBQWpCLEVBQW9CO0FBQ2hCLGVBQU8sSUFBUDtBQUNIO0FBQ0o7O0FBQ0QsV0FBTyxLQUFQO0FBQ0gsR0E1Wkk7QUE2Wkw0RyxFQUFBQSxjQUFjLEVBQUMsMEJBQVk7QUFDdkIsU0FBSzFJLFVBQUwsQ0FBZ0J1QixNQUFoQixHQUF5QixJQUF6QjtBQUNIO0FBL1pJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBQbGF5YWJsZVN0YXRlID0gcmVxdWlyZSgnUGxheWFibGVTdGF0ZScpO1xyXG52YXIgUG9vbEhhbmRsZXIgPSByZXF1aXJlKFwiUG9vbEhhbmRsZXJcIik7XHJcbnZhciBDQ2FyZCA9IHJlcXVpcmUoXCJDQ2FyZFwiKTtcclxudmFyIENUYWJsZSA9IHJlcXVpcmUoXCJDVGFibGVcIik7XHJcbnZhciBDUGxheWVyID0gcmVxdWlyZShcIkNQbGF5ZXJcIik7XHJcbnZhciB7Q2FyZCxUYWJsZSxQbGF5ZXJ9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIge0FjdGlvblR5cGUsR2FtZUZha2UsU291bmRUeXBlfSA9IHJlcXVpcmUoXCJHYW1lRmFrZVwiKTtcclxudmFyIFBsYXlhYmxlQWRzID0gcmVxdWlyZShcIlBsYXlhYmxlQWRzXCIpO1xyXG52YXIgQ0F1ZGlvID0gcmVxdWlyZShcIkNBdWRpb1wiKTtcclxudmFyIFV0aWxpdHkgPSByZXF1aXJlKFwiVXRpbGl0eVwiKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHMgICA6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwbGF5YWJsZVN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgICAgICAgOiBQbGF5YWJsZVN0YXRlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlICAgICA6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QbGF5Tm93ICAgOiBjYy5CdXR0b24sXHJcbiAgICAgICAgYnRuRHVtcCAgICAgIDogY2MuQnV0dG9uLFxyXG4gICAgICAgIGJ0blBhc3MgICAgICA6IGNjLkJ1dHRvbixcclxuICAgICAgICBsYXllckdhbWUgICAgOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxheWVyQWN0aW9uICA6IGNjLk5vZGUsXHJcbiAgICAgICAgdGFibGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVycyAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXllckNhcmQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9kZVN1Z2dlc3RHZXN0dXJlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vZGVDSFBsYXk6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0V2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWdIYW5kczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6W2NjLlNwcml0ZV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtb1BsYXllcnM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5Ob2RlXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3Bvb2xDYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLk5vZGVQb29sLFxyXG4gICAgICAgICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZ2FtZUZha2U6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEdhbWVGYWtlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmNhcmRFeHBlY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFydFBvaW50VG91Y2ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuekluZGV4Q2FyZCA9IDEwO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Bvc0hhbmRzID0gW107XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmltZ0hhbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc0hhbmRzLnB1c2godGhpcy5pbWdIYW5kc1tpXS5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVDSFBsYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RXaW4uZ2V0Q29tcG9uZW50KFwiQ0VmZmVjdFdpblwiKS5nYW1lQ29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlU3VnZ2VzdEdlc3R1cmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXllckNhcmRUb1BsYXllcigpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KENBdWRpbyk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RXaW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8xLiBraG9pIHRhbyBpbmZvIGJhbiBkYXVcclxuICAgICAgICB0aGlzLl9wb29sQ2FyZCA9IG5ldyBjYy5Ob2RlUG9vbChDQ2FyZCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUZha2UgPSBuZXcgR2FtZUZha2UoKTtcclxuICAgICAgICB2YXIgZ2FtZUluZm8gPSB0aGlzLl9nYW1lRmFrZS5nZXREZWZhdWx0SW5mbygpO1xyXG4gICAgICAgIHZhciB0YWJsZUNvbmZpZyA9IGdhbWVJbmZvLnRhYmxlO1xyXG4gICAgICAgIHZhciB0YWJsZSA9IG5ldyBUYWJsZSh0YWJsZUNvbmZpZy5pZCx0YWJsZUNvbmZpZy5zdGFrZSx0YWJsZUNvbmZpZy5wb3QpO1xyXG4gICAgICAgIHRoaXMudGFibGUuZ2V0Q29tcG9uZW50KENUYWJsZSkuc2V0VGFibGUodGFibGUpO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBuZXcgQ2FyZCBvbiBEb2NrXHJcbiAgICAgICAgdmFyIGNhcmRzID0gdGFibGVDb25maWcuZG9jaztcclxuICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICBjVGFibGUuc2V0TnVtQ2FyZChjYXJkcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBjYXJkc1tqXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkUHJlZmFicyA9IHRoaXMuX3Bvb2xDYXJkLmdldCgpO1xyXG4gICAgICAgICAgICBpZighY2FyZFByZWZhYnMpe2NhcmRQcmVmYWJzID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTt9XHJcblxyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFicy5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG5cclxuICAgICAgICAgICAgY0NhcmQuc2V0Q2FyZChjKTtcclxuICAgICAgICAgICAgY0NhcmQuaW5kZXggPSAoaik7XHJcbiAgICAgICAgICAgIGNDYXJkLnNldE93bmVyKGNUYWJsZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFicy5zZXRQb3NpdGlvbihwKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllckNhcmQuYWRkQ2hpbGQoY2FyZFByZWZhYnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgaW5mbyBhdmF0YXIgKyBsb2FkIGNhcmRcclxuICAgICAgICB2YXIgcGxheWVyc0NvbmZpZyA9IGdhbWVJbmZvLnBsYXllcnM7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGF5ZXJzQ29uZmlnLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJDb25maWcgPSBwbGF5ZXJzQ29uZmlnW2tdO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcuaW5kZXgscGxheWVyQ29uZmlnLmRpc3BsYXlOYW1lLHBsYXllckNvbmZpZy5nb2xkLHBsYXllckNvbmZpZy5hdmF0YXJJbmRleCxwbGF5ZXJDb25maWcuY2FyZHMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCBwYWx5ZXIgYXQ6XCIgKyBwbGF5ZXIuaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1twbGF5ZXIuaW5kZXhdLmdldENvbXBvbmVudChDUGxheWVyKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRHYW1lQ29udHJvbGxlcih0aGlzKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sb2FkIHByZWZhYiBjYXJkUHJlZmFic1xyXG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9jYXJkUHJlZmFiXCIsIGZ1bmN0aW9uIChlcnIsIHByZWZhYikge1xyXG4gICAgICAgIC8vICAgICB2YXIgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgLy8gICAgIG5ld05vZGUuc2V0UG9zaXRpb24oMTAwLDEwMCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vICAgICAvLyBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwiY2FyZC10b3VjaFwiLHRoaXMub25Ub3VjaENhcmQsdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uQ29uZmlnLnRpbWU7XHJcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICB0aGlzLm9uRW50ZXJUdXJuKGFjdGlvbkNvbmZpZy5pbmRleCk7XHJcbiAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGRlbGF5VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuX3BsYXlFbW8oNSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fcGxheUVtbyg0KTtcclxuICAgICAgICAvLyB9LmJpbmQodGhpcyksMjAwMCk7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFbW86ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBlbW86XCIgKyBpbmRleCk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuZW1vUGxheWVyc1tpbmRleF07XHJcbiAgICAgICAgaWYoZW1vKXtcclxuICAgICAgICAgICAgdmFyIHNwaW5lID0gZW1vLmdldENvbXBvbmVudCgnc3AuU2tlbGV0b24nKTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0U3RhcnRMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBzdGFydC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldEludGVycnVwdExpc3RlbmVyKGZ1bmN0aW9uICh0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBpbnRlcnJ1cHQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRFbmRMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gZW5kLlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0RGlzcG9zZUxpc3RlbmVyKGZ1bmN0aW9uICh0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSB3aWxsIGJlIGRpc3Bvc2VkLlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIC8vIGlmIChhbmltYXRpb25OYW1lID09PSAnc2hvb3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyAgICAgdGhpcy5zcGluZS5jbGVhclRyYWNrKDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGxvb3BDb3VudCA9IE1hdGguZmxvb3IodHJhY2tFbnRyeS50cmFja1RpbWUgLyB0cmFja0VudHJ5LmFuaW1hdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gY29tcGxldGU6ICVzXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSwgbG9vcENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldEV2ZW50TGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSwgZXZlbnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGV2ZW50OiAlcywgJXMsICVzLCAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGV2ZW50LmRhdGEubmFtZSwgZXZlbnQuaW50VmFsdWUsIGV2ZW50LmZsb2F0VmFsdWUsIGV2ZW50LnN0cmluZ1ZhbHVlKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIGVtby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgJ2FuaW1hdGlvbicsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9LFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5wbGF5ZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2ldLmdldENvbXBvbmVudChcIkNQbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIGNQbGF5ZXIuc2V0TGF5ZXJDYXJkKHRoaXMubGF5ZXJDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25FbnRlclR1cm46ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbnRlclR1cm46IFwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vbkVudGVyVHVybigpO1xyXG4gICAgfSxcclxuICAgIGV4ZWN1dGVBY3Rpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGVTdWdnZXN0R2VzdHVyZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgYWN0aW9uQ29uZmlnID0gdGhpcy5fZ2FtZUZha2UuZ2V0QWN0aW9uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJleGVjdXRlQWN0aW9uOlwiICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uQ29uZmlnKSk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gYWN0aW9uQ29uZmlnLmluZGV4O1xyXG5cclxuICAgICAgICB2YXIgdHlwZSA9IGFjdGlvbkNvbmZpZy50eXBlO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGUuUEFTUzpcclxuICAgICAgICAgICAgICAgIHRoaXMub25QYXNzQXQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZS5ESVNDQVJEOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRpc2NhcmRBdChpbmRleCxhY3Rpb25Db25maWcuY2FyZHMsYWN0aW9uQ29uZmlnLmdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc291bmQgPSBhY3Rpb25Db25maWcuc291bmQ7XHJcbiAgICAgICAgaWYoc291bmQpe1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlBdWRpbyhzb3VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZW1vID0gYWN0aW9uQ29uZmlnLmVtbztcclxuICAgICAgICBpZihlbW8gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGVtbyBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZW1vLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLGVtb1trXSksayAgKiAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGVtbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWN0aW9uQ29uZmlnLmlzRW5kZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1nSGFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kID0gdGhpcy5pbWdIYW5kc1tpXTtcclxuICAgICAgICAgICAgICAgIGhhbmQubm9kZS5ydW5BY3Rpb24oY2MubW92ZUJ5KDAuNSwwLC0zMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gYWN0aW9uQ29uZmlnLm5leHQ7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25OZXh0ID0gdGhpcy5fZ2FtZUZha2UubmV4dCgpO1xyXG4gICAgICAgICAgICBpZihhY3Rpb25OZXh0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlclR1cm4oYWN0aW9uTmV4dC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdGlvbk5leHQ6XCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uTmV4dC50aW1lO1xyXG4gICAgICAgICAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhY3Rpb25Db25maWcuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhY3Rpb25Db25maWcuc3VnZ2VzdCl7Ly9uZXUgY28gc3VnZ2VzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzWzBdLmdldENvbXBvbmVudChDUGxheWVyKS5vblN1Z2dlc3RDYXJkKGFjdGlvbkNvbmZpZy5jYXJkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRFeHBlY3RzID0gYWN0aW9uQ29uZmlnLmNhcmRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxkZWxheVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uUGFzc0F0OmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUGFzc0F0OlwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vblBhc3MoKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2NhcmRBdDpmdW5jdGlvbihpbmRleCxjYXJkcyxncm91cFR5cGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25EaXNjYXJkQXQ6XCIgKyBpbmRleCArXCJ8XCIgKyBKU09OLnN0cmluZ2lmeShjYXJkcykpO1xyXG4gICAgICAgIHZhciBjVGFibGUgPSB0aGlzLnRhYmxlLmdldENvbXBvbmVudChDVGFibGUpO1xyXG4gICAgICAgIHZhciBjYXJkUHJlZmFicyA9IHRoaXMucGxheWVyc1tpbmRleF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpLm9uRGlzY2FyZChjYXJkcyk7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3REaXNjYXJkID0gZnVuY3Rpb24gKGNhcmRQcmVmYWIpIHtcclxuICAgICAgICAgICAgLy8xLiBtb3ZlIGRlbiBkb2NrIC0+IHhvYXkgbGFpIDAgZG8gLT4gbmF5IGJhdCByYSByYSAxIHRpXHJcbiAgICAgICAgICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWIuZ2V0Q29tcG9uZW50KENDYXJkKTtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IGNUYWJsZS5udW1DYXJkO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBjQ2FyZC5pbmRleDtcclxuXHJcbiAgICAgICAgICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IDAuMztcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uMSA9IDAuMTU7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKGR1cmF0aW9uLHApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKGR1cmF0aW9uLDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uLzIsMS4yLDEuMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24vMiwwLjk1LDAuOTUpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24xLDEsMSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKGR1cmF0aW9uMSxwLngrIChNYXRoLnJhbmRvbSgpICogMTAgKiAoaW5kZXggLSAobGVuLTEpLzIpKSxwLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKGR1cmF0aW9uMSwgKGluZGV4IC0gKGxlbiAtIDEpLzIpICogTWF0aC5yYW5kb20oKSAqIDQpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGxlbiA9IGNhcmRQcmVmYWJzLmxlbmd0aDtcclxuICAgICAgICBjVGFibGUuc2V0TnVtQ2FyZChsZW4pO1xyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIGNhcmRQcmVmYWIgPSBjYXJkUHJlZmFic1trXTtcclxuICAgICAgICAgICAgdmFyIGNDYXJkID0gY2FyZFByZWZhYi5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG4gICAgICAgICAgICBjQ2FyZC5pbmRleCA9IChrKTtcclxuICAgICAgICAgICAgY0NhcmQub3duZXIgPSBjVGFibGU7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWIuekluZGV4ID0gKysgdGhpcy56SW5kZXhDYXJkO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0RGlzY2FyZChjYXJkUHJlZmFiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIC8vIGNhcmRQcmVmYWIucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAvLyAgICAgY2MubW92ZVRvKDAuMTUscCksXHJcbiAgICAgICAgICAgIC8vICAgICBjYy5yb3RhdGVUbygxLDApXHJcbiAgICAgICAgICAgIC8vICkpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJuZXdaSW5kZXg6XCIgKyB0aGlzLnpJbmRleENhcmQpO1xyXG5cclxuICAgICAgICAgICAgLy9kdW9jIGFkZCBraGkgdGFvIHJhXHJcbiAgICAgICAgICAgIC8vIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKGNhcmRQcmVmYWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9yICh2YXIgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8vICAgICB2YXIgYyA9IGNhcmRzW2pdO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHZhciBjYXJkUHJlZmFicyA9IHRoaXMuX3Bvb2xDYXJkLmdldCgpO1xyXG4gICAgICAgIC8vICAgICBpZighY2FyZFByZWZhYnMpe2NhcmRQcmVmYWJzID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTt9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgdmFyIGNDYXJkID0gY2FyZFByZWZhYnMuZ2V0Q29tcG9uZW50KENDYXJkKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBjQ2FyZC5zZXRDYXJkKGMpO1xyXG4gICAgICAgIC8vICAgICBjQ2FyZC5pbmRleCA9IChqKTtcclxuICAgICAgICAvLyAgICAgY0NhcmQub3duZXIgPSBjVGFibGU7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgdmFyIHAgPSBjVGFibGUuZ2V0UG9zaXRpb25DYXJkKGNDYXJkKTtcclxuICAgICAgICAvLyAgICAgY2FyZFByZWZhYnMuc2V0UG9zaXRpb24ocCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKGNhcmRQcmVmYWJzKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hDYXJkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZGF0YSA9IGV2ZW50LmdldFVzZXJEYXRhKCk7XHJcbiAgICAgICAgdmFyIGNDYXJkID0gZGF0YS5jYXJkO1xyXG4gICAgICAgIHZhciBvd25lciA9IGNDYXJkLm93bmVyO1xyXG4gICAgICAgIGlmKG93bmVyIGluc3RhbmNlb2YgQ1RhYmxlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzaW5nIGNhcmQgb24gdGFibGVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3duZXIgaW5zdGFuY2VvZiBDUGxheWVyKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc015VHVybigpKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNUb3VjaEV4cGVjdENhcmRzKGNDYXJkLmNhcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50VG91Y2ggPSBkYXRhLmV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhcnRQb2ludFRvdWNoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gZGF0YS5ldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBvcy55IC0gdGhpcy5zdGFydFBvaW50VG91Y2gueSA+IDQ1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkRpc2NhcmQgb24gbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiISFEaXNjYXJkIG9uIG15IHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwidG91Y2g6XCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXJ0UG9pbnRUb3VjaCkgK1wifCBcIisgSlNPTi5zdHJpbmdpZnkocG9zKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm5vdCBleHBlY3RzIGNhcmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwibm90IG15IHR1cm5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3duZXIub25Ub3VjaENhcmQoZGF0YS5ldmVudCxkYXRhLmNhcmQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Ub3VjaENhcmQgYXQgY29udHJvbGVyXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblBsYXlOb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUGxheSBwYXRoIG1haW5cIik7XHJcbiAgICAgICAgUGxheWFibGVBZHMub25DVEFDbGljaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRvdWNoRHVtcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggRHVtcFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaFBhc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdWNoIFBhc3NcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldE5ld0NhcmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgY2FyZFByZWZhYiA9IHRoaXMuX3Bvb2xDYXJkLmdldCgpO1xyXG4gICAgICAgIGlmKCFjYXJkUHJlZmFiKXtjYXJkUHJlZmFiID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTt9XHJcbiAgICAgICAgcmV0dXJuIGNhcmRQcmVmYWI7XHJcbiAgICB9LFxyXG5cclxuICAgIGlzTXlUdXJuOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJJbmRleCA9PT0gMDtcclxuICAgIH0sXHJcbiAgICBpc1RvdWNoRXhwZWN0Q2FyZHM6ZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5jYXJkRXhwZWN0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYyA9IHRoaXMuY2FyZEV4cGVjdHNbaV07XHJcbiAgICAgICAgICAgIGlmKGMuaWQgPT09IGNhcmQuaWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIHNob3dOb2RlQ0hQbGF5OmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGVDSFBsYXkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxufSk7Il19