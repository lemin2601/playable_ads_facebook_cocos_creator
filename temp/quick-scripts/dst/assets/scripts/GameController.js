
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
    SoundType = _require2.SoundType,
    CardGroup = _require2.CardGroup;

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
    effectCardGroup: {
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
    imgHighLight: {
      "default": null,
      type: cc.Node
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
    this.imgHighLight.active = false;
    this.effectCardGroup.active = false;
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
      cCard.node.angle = (Math.random() - 0.5) * 40;
      cardPrefabs.setPosition(p);
      this.layerCard.addChild(cardPrefabs);
    } // cc.log("onEnable players:" + this.players.length);
    //update info avatar + load card


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

      setTimeout(function () {
        emo.active = true;
        spine.setAnimation(0, 'animation', false);
      }, 1000);
    }
  },
  _playEffectGroup: function _playEffectGroup(name) {
    console.log("_playEffectGroup:" + name);
    var emo = this.effectCardGroup;

    if (emo) {
      var spine = emo.getComponent('sp.Skeleton');
      spine.setCompleteListener(function (trackEntry) {
        spine.clearTracks();
        emo.active = false; // var animationName = trackEntry.animation ? trackEntry.animation.name : "";
        // // if (animationName === 'shoot') {
        // //     this.spine.clearTrack(1);
        // // }
        // var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
        // cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
      });
      setTimeout(function () {
        emo.active = true;
        spine.setAnimation(0, name, false);
      }, 500);
    }
  },
  start: function start() {// setTimeout(function () {
    //     this.effectWin.active = true;
    // }.bind(this),2000);
  },
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
  autoShowSuggest: function autoShowSuggest() {
    this.nodeSuggestGesture.active = true;
  },
  executeAction: function executeAction() {
    this.unschedule(this.autoShowSuggest);
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
      setTimeout(function () {
        this.audio.playAudio(sound);
      }.bind(this), 500);
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

        if (emo === 5) {
          this._playEmo(6);
        }
      }
    }

    if (actionConfig.isEnded) {
      setTimeout(function () {
        for (var i = 0; i < this.imgHands.length; i++) {
          var hand = this.imgHands[i];
          hand.node.runAction(cc.moveBy(0.5, 0, -300));
        }
      }.bind(this), 1000);
      setTimeout(function () {
        this.audio.playAudio(SoundType.WIN);
        this.effectWin.active = true;
      }.bind(this), 2500);
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
              this.audio.playSoundYourTurn();

              if (actionConfig.suggest) {
                //neu co suggest
                this.nodeSuggestGesture.active = true;
                this.players[0].getComponent(CPlayer).onSuggestCard(actionConfig.cards);
              } else {
                this.scheduleOnce(this.autoShowSuggest, 3);
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
      cardPrefab.setRotation(330, 0, 0);
      cardPrefab.runAction(cc.sequence(cc.spawn(cc.moveTo(duration, p), cc.rotateTo(duration, 0), cc.sequence(cc.scaleTo(duration / 2, 1.1, 1.1), cc.scaleTo(duration / 2, 0.85, 0.85))), cc.spawn(cc.scaleTo(duration1, 0.90, 0.90), cc.moveTo(duration1, p.x + Math.random() * 10 * (index - (len - 1) / 2), p.y), cc.rotateTo(duration1, (index - (len - 1) / 2) * Math.random() * 4))));
    };

    var len = cardPrefabs.length;
    cTable.setNumCard(len);
    this.imgHighLight.zIndex = this.zIndexCard;
    this.imgHighLight.active = true;
    this.imgHighLight.opacity = 0;
    this.imgHighLight.runAction(cc.sequence(cc.hide(), cc.delayTime(0.6), cc.show(), cc.fadeIn(0.3), cc.delayTime(1), cc.fadeOut(0.3), cc.callFunc(function (sender) {
      sender.active = false;
    }, this)));

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
    }

    switch (groupType) {
      case CardGroup.FLUSH:
        this._playEffectGroup('flush');

        break;

      case CardGroup.STRAIGHT:
        this._playEffectGroup('straight');

        break;

      case CardGroup.FULL_HOUSE:
        this._playEffectGroup('fullhouse');

        break;

      case CardGroup.FOUR_OF_KIND:
        this._playEffectGroup('forofakind');

        break;

      case CardGroup.NONE:
      default:
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGxheWFibGVTdGF0ZSIsInJlcXVpcmUiLCJQb29sSGFuZGxlciIsIkNDYXJkIiwiQ1RhYmxlIiwiQ1BsYXllciIsIkNhcmQiLCJUYWJsZSIsIlBsYXllciIsIkFjdGlvblR5cGUiLCJHYW1lRmFrZSIsIlNvdW5kVHlwZSIsIkNhcmRHcm91cCIsIlBsYXlhYmxlQWRzIiwiQ0F1ZGlvIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWFibGVTdGF0ZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImJ0bkR1bXAiLCJidG5QYXNzIiwibGF5ZXJHYW1lIiwiTm9kZSIsImxheWVyQWN0aW9uIiwidGFibGUiLCJwbGF5ZXJzIiwibGF5ZXJDYXJkIiwibm9kZVN1Z2dlc3RHZXN0dXJlIiwibm9kZUNIUGxheSIsImVmZmVjdFdpbiIsImVmZmVjdENhcmRHcm91cCIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJpbWdIYW5kcyIsIlNwcml0ZSIsImVtb1BsYXllcnMiLCJpbWdIaWdoTGlnaHQiLCJfcG9vbENhcmQiLCJOb2RlUG9vbCIsIl9nYW1lRmFrZSIsImN0b3IiLCJjdXJJbmRleCIsImNhcmRFeHBlY3RzIiwic3RhcnRQb2ludFRvdWNoIiwiekluZGV4Q2FyZCIsImF1ZGlvIiwiX3Bvc0hhbmRzIiwib25Mb2FkIiwiaSIsImxlbmd0aCIsInB1c2giLCJub2RlIiwiZ2V0UG9zaXRpb24iLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJnYW1lQ29udHJvbGxlciIsImF0dGFjaExheWVyQ2FyZFRvUGxheWVyIiwiZ2FtZUluZm8iLCJnZXREZWZhdWx0SW5mbyIsInRhYmxlQ29uZmlnIiwiaWQiLCJzdGFrZSIsInBvdCIsInNldFRhYmxlIiwiY2FyZHMiLCJkb2NrIiwiY1RhYmxlIiwic2V0TnVtQ2FyZCIsImoiLCJjIiwiY2FyZFByZWZhYnMiLCJnZXQiLCJpbnN0YW50aWF0ZSIsImNDYXJkIiwic2V0Q2FyZCIsImluZGV4Iiwic2V0T3duZXIiLCJwIiwiZ2V0UG9zaXRpb25DYXJkIiwiYW5nbGUiLCJNYXRoIiwicmFuZG9tIiwic2V0UG9zaXRpb24iLCJhZGRDaGlsZCIsInBsYXllcnNDb25maWciLCJrIiwicGxheWVyQ29uZmlnIiwicGxheWVyIiwiZGlzcGxheU5hbWUiLCJnb2xkIiwiYXZhdGFySW5kZXgiLCJjb25zb2xlIiwibG9nIiwiY1BsYXllciIsInNldEdhbWVDb250cm9sbGVyIiwic2V0UGxheWVyIiwib24iLCJvblRvdWNoQ2FyZCIsImFjdGlvbkNvbmZpZyIsImdldEFjdGlvbiIsImRlbGF5VGltZSIsInRpbWUiLCJvbkVudGVyVHVybiIsInNjaGVkdWxlT25jZSIsImV4ZWN1dGVBY3Rpb24iLCJiaW5kIiwiX3BsYXlFbW8iLCJlbW8iLCJzcGluZSIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJ0cmFja0VudHJ5Iiwic2V0VGltZW91dCIsInNldEFuaW1hdGlvbiIsIl9wbGF5RWZmZWN0R3JvdXAiLCJuYW1lIiwiY2xlYXJUcmFja3MiLCJzdGFydCIsIm9uRW5hYmxlIiwibGVuIiwic2V0TGF5ZXJDYXJkIiwiYXV0b1Nob3dTdWdnZXN0IiwidW5zY2hlZHVsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQQVNTIiwib25QYXNzQXQiLCJESVNDQVJEIiwib25EaXNjYXJkQXQiLCJncm91cCIsInNvdW5kIiwicGxheUF1ZGlvIiwiQXJyYXkiLCJpc0VuZGVkIiwiaGFuZCIsInJ1bkFjdGlvbiIsIm1vdmVCeSIsIldJTiIsIm5leHQiLCJhY3Rpb25OZXh0IiwicGxheVNvdW5kWW91clR1cm4iLCJzdWdnZXN0Iiwib25TdWdnZXN0Q2FyZCIsIm9uUGFzcyIsImdyb3VwVHlwZSIsIm9uRGlzY2FyZCIsImVmZmVjdERpc2NhcmQiLCJudW1DYXJkIiwiZHVyYXRpb24iLCJkdXJhdGlvbjEiLCJzZXRSb3RhdGlvbiIsInNlcXVlbmNlIiwic3Bhd24iLCJtb3ZlVG8iLCJyb3RhdGVUbyIsInNjYWxlVG8iLCJ4IiwieSIsInpJbmRleCIsIm9wYWNpdHkiLCJoaWRlIiwic2hvdyIsImZhZGVJbiIsImZhZGVPdXQiLCJjYWxsRnVuYyIsInNlbmRlciIsIm93bmVyIiwiRkxVU0giLCJTVFJBSUdIVCIsIkZVTExfSE9VU0UiLCJGT1VSX09GX0tJTkQiLCJOT05FIiwiZXZlbnQiLCJkYXRhIiwiZ2V0VXNlckRhdGEiLCJjYXJkIiwiaXNNeVR1cm4iLCJpc1RvdWNoRXhwZWN0Q2FyZHMiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsImdldExvY2F0aW9uIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsInBvcyIsIm9uUGxheU5vdyIsIm9uQ1RBQ2xpY2siLCJvblRvdWNoRHVtcCIsIm9uVG91Y2hQYXNzIiwiZ2V0TmV3Q2FyZCIsInNob3dOb2RlQ0hQbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGFBQWEsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxJQUFJRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlHLE1BQU0sR0FBR0gsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBSUksT0FBTyxHQUFHSixPQUFPLENBQUMsU0FBRCxDQUFyQjs7ZUFDMEJBLE9BQU8sQ0FBQyxPQUFEO0lBQTVCSyxnQkFBQUE7SUFBS0MsaUJBQUFBO0lBQU1DLGtCQUFBQTs7Z0JBQ2dDUCxPQUFPLENBQUMsVUFBRDtJQUFsRFEsdUJBQUFBO0lBQVdDLHFCQUFBQTtJQUFTQyxzQkFBQUE7SUFBVUMsc0JBQUFBOztBQUNuQyxJQUFJQyxXQUFXLEdBQUdaLE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLElBQUlhLE1BQU0sR0FB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QUNILEdBdmVJO0FBeWVMZ0osRUFBQUEsUUFBUSxFQUFDLG9CQUFZO0FBQ2pCLFdBQU8sS0FBS3RJLFFBQUwsS0FBa0IsQ0FBekI7QUFDSCxHQTNlSTtBQTRlTHVJLEVBQUFBLGtCQUFrQixFQUFDLDRCQUFVRixJQUFWLEVBQWdCO0FBQy9CLFFBQUl4RCxHQUFHLEdBQUcsS0FBSzVFLFdBQUwsQ0FBaUJPLE1BQTNCOztBQUNBLFNBQUssSUFBSUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3NFLEdBQXBCLEVBQXlCdEUsQ0FBQyxFQUExQixFQUE4QjtBQUMxQixVQUFJcUIsQ0FBQyxHQUFHLEtBQUszQixXQUFMLENBQWlCTSxDQUFqQixDQUFSOztBQUNBLFVBQUdxQixDQUFDLENBQUNULEVBQUYsS0FBU2tILElBQUksQ0FBQ2xILEVBQWpCLEVBQW9CO0FBQ2hCLGVBQU8sSUFBUDtBQUNIO0FBQ0o7O0FBQ0QsV0FBTyxLQUFQO0FBQ0gsR0FyZkk7QUFzZkxpSSxFQUFBQSxjQUFjLEVBQUMsMEJBQVk7QUFDdkIsU0FBS2pLLFVBQUwsQ0FBZ0J5QixNQUFoQixHQUF5QixJQUF6QjtBQUNIO0FBeGZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBQbGF5YWJsZVN0YXRlID0gcmVxdWlyZSgnUGxheWFibGVTdGF0ZScpO1xyXG52YXIgUG9vbEhhbmRsZXIgPSByZXF1aXJlKFwiUG9vbEhhbmRsZXJcIik7XHJcbnZhciBDQ2FyZCA9IHJlcXVpcmUoXCJDQ2FyZFwiKTtcclxudmFyIENUYWJsZSA9IHJlcXVpcmUoXCJDVGFibGVcIik7XHJcbnZhciBDUGxheWVyID0gcmVxdWlyZShcIkNQbGF5ZXJcIik7XHJcbnZhciB7Q2FyZCxUYWJsZSxQbGF5ZXJ9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIge0FjdGlvblR5cGUsR2FtZUZha2UsU291bmRUeXBlLENhcmRHcm91cH0gPSByZXF1aXJlKFwiR2FtZUZha2VcIik7XHJcbnZhciBQbGF5YWJsZUFkcyA9IHJlcXVpcmUoXCJQbGF5YWJsZUFkc1wiKTtcclxudmFyIENBdWRpbyA9IHJlcXVpcmUoXCJDQXVkaW9cIik7XHJcbnZhciBVdGlsaXR5ID0gcmVxdWlyZShcIlV0aWxpdHlcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzICAgOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGxheWFibGVTdGF0ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0ICAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICAgICAgIDogUGxheWFibGVTdGF0ZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZSAgICAgOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuUGxheU5vdyAgIDogY2MuQnV0dG9uLFxyXG4gICAgICAgIGJ0bkR1bXAgICAgICA6IGNjLkJ1dHRvbixcclxuICAgICAgICBidG5QYXNzICAgICAgOiBjYy5CdXR0b24sXHJcbiAgICAgICAgbGF5ZXJHYW1lICAgIDogY2MuTm9kZSxcclxuICAgICAgICBsYXllckFjdGlvbiAgOiBjYy5Ob2RlLFxyXG4gICAgICAgIHRhYmxlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsYXllcnMgIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGF5ZXJDYXJkOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vZGVTdWdnZXN0R2VzdHVyZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBub2RlQ0hQbGF5OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdFdpbjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RDYXJkR3JvdXA6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZFByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0hhbmRzOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpbY2MuU3ByaXRlXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1vUGxheWVyczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6W2NjLk5vZGVdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWdIaWdoTGlnaHQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3Bvb2xDYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLk5vZGVQb29sLFxyXG4gICAgICAgICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZ2FtZUZha2U6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEdhbWVGYWtlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmNhcmRFeHBlY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFydFBvaW50VG91Y2ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuekluZGV4Q2FyZCA9IDEwO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Bvc0hhbmRzID0gW107XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmltZ0hhbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc0hhbmRzLnB1c2godGhpcy5pbWdIYW5kc1tpXS5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVDSFBsYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RDYXJkR3JvdXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RXaW4uZ2V0Q29tcG9uZW50KFwiQ0VmZmVjdFdpblwiKS5nYW1lQ29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ub2RlU3VnZ2VzdEdlc3R1cmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hMYXllckNhcmRUb1BsYXllcigpO1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KENBdWRpbyk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RXaW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8xLiBraG9pIHRhbyBpbmZvIGJhbiBkYXVcclxuICAgICAgICB0aGlzLl9wb29sQ2FyZCA9IG5ldyBjYy5Ob2RlUG9vbChDQ2FyZCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUZha2UgPSBuZXcgR2FtZUZha2UoKTtcclxuICAgICAgICB2YXIgZ2FtZUluZm8gPSB0aGlzLl9nYW1lRmFrZS5nZXREZWZhdWx0SW5mbygpO1xyXG4gICAgICAgIHZhciB0YWJsZUNvbmZpZyA9IGdhbWVJbmZvLnRhYmxlO1xyXG4gICAgICAgIHZhciB0YWJsZSA9IG5ldyBUYWJsZSh0YWJsZUNvbmZpZy5pZCx0YWJsZUNvbmZpZy5zdGFrZSx0YWJsZUNvbmZpZy5wb3QpO1xyXG4gICAgICAgIHRoaXMudGFibGUuZ2V0Q29tcG9uZW50KENUYWJsZSkuc2V0VGFibGUodGFibGUpO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBuZXcgQ2FyZCBvbiBEb2NrXHJcbiAgICAgICAgdmFyIGNhcmRzID0gdGFibGVDb25maWcuZG9jaztcclxuICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICBjVGFibGUuc2V0TnVtQ2FyZChjYXJkcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBjYXJkc1tqXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkUHJlZmFicyA9IHRoaXMuX3Bvb2xDYXJkLmdldCgpO1xyXG4gICAgICAgICAgICBpZighY2FyZFByZWZhYnMpe2NhcmRQcmVmYWJzID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTt9XHJcblxyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFicy5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG5cclxuICAgICAgICAgICAgY0NhcmQuc2V0Q2FyZChjKTtcclxuICAgICAgICAgICAgY0NhcmQuaW5kZXggPSAoaik7XHJcbiAgICAgICAgICAgIGNDYXJkLnNldE93bmVyKGNUYWJsZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICBjQ2FyZC5ub2RlLmFuZ2xlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNDA7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWJzLnNldFBvc2l0aW9uKHApO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyQ2FyZC5hZGRDaGlsZChjYXJkUHJlZmFicyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgaW5mbyBhdmF0YXIgKyBsb2FkIGNhcmRcclxuICAgICAgICB2YXIgcGxheWVyc0NvbmZpZyA9IGdhbWVJbmZvLnBsYXllcnM7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGF5ZXJzQ29uZmlnLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJDb25maWcgPSBwbGF5ZXJzQ29uZmlnW2tdO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcuaW5kZXgscGxheWVyQ29uZmlnLmRpc3BsYXlOYW1lLHBsYXllckNvbmZpZy5nb2xkLHBsYXllckNvbmZpZy5hdmF0YXJJbmRleCxwbGF5ZXJDb25maWcuY2FyZHMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldCBwYWx5ZXIgYXQ6XCIgKyBwbGF5ZXIuaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1twbGF5ZXIuaW5kZXhdLmdldENvbXBvbmVudChDUGxheWVyKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRHYW1lQ29udHJvbGxlcih0aGlzKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sb2FkIHByZWZhYiBjYXJkUHJlZmFic1xyXG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9jYXJkUHJlZmFiXCIsIGZ1bmN0aW9uIChlcnIsIHByZWZhYikge1xyXG4gICAgICAgIC8vICAgICB2YXIgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgLy8gICAgIG5ld05vZGUuc2V0UG9zaXRpb24oMTAwLDEwMCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vICAgICAvLyBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwiY2FyZC10b3VjaFwiLHRoaXMub25Ub3VjaENhcmQsdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uQ29uZmlnLnRpbWU7XHJcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICB0aGlzLm9uRW50ZXJUdXJuKGFjdGlvbkNvbmZpZy5pbmRleCk7XHJcbiAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGRlbGF5VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuX3BsYXlFbW8oNSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fcGxheUVtbyg0KTtcclxuICAgICAgICAvLyB9LmJpbmQodGhpcyksMjAwMCk7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFbW86ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGxheSBlbW86XCIgKyBpbmRleCk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuZW1vUGxheWVyc1tpbmRleF07XHJcbiAgICAgICAgaWYoZW1vKXtcclxuICAgICAgICAgICAgdmFyIHNwaW5lID0gZW1vLmdldENvbXBvbmVudCgnc3AuU2tlbGV0b24nKTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0U3RhcnRMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBzdGFydC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldEludGVycnVwdExpc3RlbmVyKGZ1bmN0aW9uICh0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBpbnRlcnJ1cHQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRFbmRMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gZW5kLlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0RGlzcG9zZUxpc3RlbmVyKGZ1bmN0aW9uICh0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSB3aWxsIGJlIGRpc3Bvc2VkLlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIC8vIGlmIChhbmltYXRpb25OYW1lID09PSAnc2hvb3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyAgICAgdGhpcy5zcGluZS5jbGVhclRyYWNrKDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGxvb3BDb3VudCA9IE1hdGguZmxvb3IodHJhY2tFbnRyeS50cmFja1RpbWUgLyB0cmFja0VudHJ5LmFuaW1hdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gY29tcGxldGU6ICVzXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSwgbG9vcENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldEV2ZW50TGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSwgZXZlbnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGV2ZW50OiAlcywgJXMsICVzLCAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGV2ZW50LmRhdGEubmFtZSwgZXZlbnQuaW50VmFsdWUsIGV2ZW50LmZsb2F0VmFsdWUsIGV2ZW50LnN0cmluZ1ZhbHVlKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgJ2FuaW1hdGlvbicsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFZmZlY3RHcm91cDpmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9wbGF5RWZmZWN0R3JvdXA6XCIgKyBuYW1lKTtcclxuICAgICAgICB2YXIgZW1vID0gdGhpcy5lZmZlY3RDYXJkR3JvdXA7XHJcbiAgICAgICAgaWYoZW1vKXtcclxuICAgICAgICAgICAgdmFyIHNwaW5lID0gZW1vLmdldENvbXBvbmVudCgnc3AuU2tlbGV0b24nKTtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgICAgIHNwaW5lLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBlbW8uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gaWYgKGFuaW1hdGlvbk5hbWUgPT09ICdzaG9vdCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIC8vICAgICB0aGlzLnNwaW5lLmNsZWFyVHJhY2soMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgbG9vcENvdW50ID0gTWF0aC5mbG9vcih0cmFja0VudHJ5LnRyYWNrVGltZSAvIHRyYWNrRW50cnkuYW5pbWF0aW9uRW5kKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBjb21wbGV0ZTogJXNcIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lLCBsb29wQ291bnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlbW8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNwaW5lLnNldEFuaW1hdGlvbigwLCBuYW1lLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5lZmZlY3RXaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9LmJpbmQodGhpcyksMjAwMCk7XHJcbiAgICB9LFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5wbGF5ZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2ldLmdldENvbXBvbmVudChcIkNQbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIGNQbGF5ZXIuc2V0TGF5ZXJDYXJkKHRoaXMubGF5ZXJDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25FbnRlclR1cm46ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbnRlclR1cm46IFwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vbkVudGVyVHVybigpO1xyXG4gICAgfSxcclxuICAgIGF1dG9TaG93U3VnZ2VzdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgZXhlY3V0ZUFjdGlvbjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmF1dG9TaG93U3VnZ2VzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlU3VnZ2VzdEdlc3R1cmUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhlY3V0ZUFjdGlvbjpcIiArIEpTT04uc3RyaW5naWZ5KGFjdGlvbkNvbmZpZykpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuXHJcbiAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25Db25maWcudHlwZTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlBBU1M6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFzc0F0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGUuRElTQ0FSRDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25EaXNjYXJkQXQoaW5kZXgsYWN0aW9uQ29uZmlnLmNhcmRzLGFjdGlvbkNvbmZpZy5ncm91cCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNvdW5kID0gYWN0aW9uQ29uZmlnLnNvdW5kO1xyXG4gICAgICAgIGlmKHNvdW5kKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlBdWRpbyhzb3VuZCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSw1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGVtbyA9IGFjdGlvbkNvbmZpZy5lbW87XHJcbiAgICAgICAgaWYoZW1vICE9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihlbW8gaW5zdGFuY2VvZiBBcnJheSl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGVtby5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheUVtbyhpKTtcclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyxlbW9ba10pLGsgICogMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVtbyhlbW8pO1xyXG4gICAgICAgICAgICAgICAgaWYoZW1vID09PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKDYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFjdGlvbkNvbmZpZy5pc0VuZGVkKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1nSGFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZCA9IHRoaXMuaW1nSGFuZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZC5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMC41LDAsLTMwMCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMTAwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QXVkaW8oU291bmRUeXBlLldJTik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMjUwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSBhY3Rpb25Db25maWcubmV4dDtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbk5leHQgPSB0aGlzLl9nYW1lRmFrZS5uZXh0KCk7XHJcbiAgICAgICAgICAgIGlmKGFjdGlvbk5leHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyVHVybihhY3Rpb25OZXh0LmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0aW9uTmV4dDpcIiArIEpTT04uc3RyaW5naWZ5KGFjdGlvbk5leHQpKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZWxheVRpbWUgPSBhY3Rpb25OZXh0LnRpbWU7XHJcbiAgICAgICAgICAgICAgICBpZihkZWxheVRpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uQ29uZmlnID0gdGhpcy5fZ2FtZUZha2UuZ2V0QWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT09IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheVNvdW5kWW91clR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFjdGlvbkNvbmZpZy5zdWdnZXN0KXsvL25ldSBjbyBzdWdnZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlU3VnZ2VzdEdlc3R1cmUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbMF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpLm9uU3VnZ2VzdENhcmQoYWN0aW9uQ29uZmlnLmNhcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuYXV0b1Nob3dTdWdnZXN0LDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhwZWN0cyA9IGFjdGlvbkNvbmZpZy5jYXJkcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksZGVsYXlUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblBhc3NBdDpmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvblBhc3NBdDpcIiArIGluZGV4KTtcclxuICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1tpbmRleF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgIGNQbGF5ZXIub25QYXNzKCk7XHJcbiAgICB9LFxyXG4gICAgb25EaXNjYXJkQXQ6ZnVuY3Rpb24oaW5kZXgsY2FyZHMsZ3JvdXBUeXBlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRGlzY2FyZEF0OlwiICsgaW5kZXggK1wifFwiICsgSlNPTi5zdHJpbmdpZnkoY2FyZHMpKTtcclxuICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICB2YXIgY2FyZFByZWZhYnMgPSB0aGlzLnBsYXllcnNbaW5kZXhdLmdldENvbXBvbmVudChDUGxheWVyKS5vbkRpc2NhcmQoY2FyZHMpO1xyXG5cclxuICAgICAgICB2YXIgZWZmZWN0RGlzY2FyZCA9IGZ1bmN0aW9uIChjYXJkUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIC8vMS4gbW92ZSBkZW4gZG9jayAtPiB4b2F5IGxhaSAwIGRvIC0+IG5heSBiYXQgcmEgcmEgMSB0aVxyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFiLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBjVGFibGUubnVtQ2FyZDtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gY0NhcmQuaW5kZXg7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSAwLjM7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbjEgPSAwLjE1O1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFiLnNldFJvdGF0aW9uKDMzMCwwLDApO1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFiLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbixwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbi8yLDEuMSwxLjEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uLzIsMC44NSwwLjg1KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uMSwwLjkwLDAuOTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbjEscC54KyAoTWF0aC5yYW5kb20oKSAqIDEwICogKGluZGV4IC0gKGxlbi0xKS8yKSkscC55KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbjEsIChpbmRleCAtIChsZW4gLSAxKS8yKSAqIE1hdGgucmFuZG9tKCkgKiA0KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBsZW4gPSBjYXJkUHJlZmFicy5sZW5ndGg7XHJcbiAgICAgICAgY1RhYmxlLnNldE51bUNhcmQobGVuKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQuekluZGV4ID0gdGhpcy56SW5kZXhDYXJkO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjYpLFxyXG4gICAgICAgICAgICBjYy5zaG93KCksXHJcbiAgICAgICAgICAgIGNjLmZhZGVJbigwLjMpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4zKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKHNlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgc2VuZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LHRoaXMpXHJcbiAgICAgICAgKSlcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47IGsrKykge1xyXG4gICAgICAgICAgICB2YXIgY2FyZFByZWZhYiA9IGNhcmRQcmVmYWJzW2tdO1xyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFiLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgICAgIGNDYXJkLmluZGV4ID0gKGspO1xyXG4gICAgICAgICAgICBjQ2FyZC5vd25lciA9IGNUYWJsZTtcclxuICAgICAgICAgICAgY2FyZFByZWZhYi56SW5kZXggPSArKyB0aGlzLnpJbmRleENhcmQ7XHJcblxyXG4gICAgICAgICAgICBlZmZlY3REaXNjYXJkKGNhcmRQcmVmYWIpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIHAgPSBjVGFibGUuZ2V0UG9zaXRpb25DYXJkKGNDYXJkKTtcclxuICAgICAgICAgICAgLy8gY2FyZFByZWZhYi5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIC8vICAgICBjYy5tb3ZlVG8oMC4xNSxwKSxcclxuICAgICAgICAgICAgLy8gICAgIGNjLnJvdGF0ZVRvKDEsMClcclxuICAgICAgICAgICAgLy8gKSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIm5ld1pJbmRleDpcIiArIHRoaXMuekluZGV4Q2FyZCk7XHJcblxyXG4gICAgICAgICAgICAvL2R1b2MgYWRkIGtoaSB0YW8gcmFcclxuICAgICAgICAgICAgLy8gdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQoY2FyZFByZWZhYik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChncm91cFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRkxVU0g6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ2ZsdXNoJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ3N0cmFpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRlVMTF9IT1VTRTpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnZnVsbGhvdXNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRk9VUl9PRl9LSU5EOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVmZmVjdEdyb3VwKCdmb3JvZmFraW5kJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IgKHZhciBqID0gMDsgaiA8IGNhcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBjID0gY2FyZHNbal07XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgdmFyIGNhcmRQcmVmYWJzID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgIGlmKCFjYXJkUHJlZmFicyl7Y2FyZFByZWZhYnMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFicy5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGNDYXJkLnNldENhcmQoYyk7XHJcbiAgICAgICAgLy8gICAgIGNDYXJkLmluZGV4ID0gKGopO1xyXG4gICAgICAgIC8vICAgICBjQ2FyZC5vd25lciA9IGNUYWJsZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgIC8vICAgICBjYXJkUHJlZmFicy5zZXRQb3NpdGlvbihwKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQoY2FyZFByZWZhYnMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaENhcmQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICB2YXIgY0NhcmQgPSBkYXRhLmNhcmQ7XHJcbiAgICAgICAgdmFyIG93bmVyID0gY0NhcmQub3duZXI7XHJcbiAgICAgICAgaWYob3duZXIgaW5zdGFuY2VvZiBDVGFibGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3NpbmcgY2FyZCBvbiB0YWJsZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvd25lciBpbnN0YW5jZW9mIENQbGF5ZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzTXlUdXJuKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1RvdWNoRXhwZWN0Q2FyZHMoY0NhcmQuY2FyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnRUb3VjaCA9IGRhdGEuZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGFydFBvaW50VG91Y2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBkYXRhLmV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9zLnkgLSB0aGlzLnN0YXJ0UG9pbnRUb3VjaC55ID4gNDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiRGlzY2FyZCBvbiBteSB0dXJuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCIhIURpc2NhcmQgb24gbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ0b3VjaDpcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhcnRQb2ludFRvdWNoKSArXCJ8IFwiKyBKU09OLnN0cmluZ2lmeShwb3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwibm90IGV4cGVjdHMgY2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJub3QgbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvd25lci5vblRvdWNoQ2FyZChkYXRhLmV2ZW50LGRhdGEuY2FyZClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblRvdWNoQ2FyZCBhdCBjb250cm9sZXJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUGxheU5vdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25QbGF5IHBhdGggbWFpblwiKTtcclxuICAgICAgICBQbGF5YWJsZUFkcy5vbkNUQUNsaWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hEdW1wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b3VjaCBEdW1wXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRvdWNoUGFzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggUGFzc1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TmV3Q2FyZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjYXJkUHJlZmFiID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgaWYoIWNhcmRQcmVmYWIpe2NhcmRQcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuICAgICAgICByZXR1cm4gY2FyZFByZWZhYjtcclxuICAgIH0sXHJcblxyXG4gICAgaXNNeVR1cm46ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1ckluZGV4ID09PSAwO1xyXG4gICAgfSxcclxuICAgIGlzVG91Y2hFeHBlY3RDYXJkczpmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIHZhciBsZW4gPSB0aGlzLmNhcmRFeHBlY3RzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gdGhpcy5jYXJkRXhwZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYoYy5pZCA9PT0gY2FyZC5pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc2hvd05vZGVDSFBsYXk6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNIUGxheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG59KTsiXX0=