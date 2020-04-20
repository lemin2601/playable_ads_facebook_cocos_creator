
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
    this.groupExpects = []; //group cards

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

    this._poolCard = new cc.NodePool(CCard); //region khoi tao ban dau game

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
    //endregion khoi tao ban dau game
    //region add event touch card


    this.node.on("card-touch", this.onTouchCard, this); //endregion add event touch card
    //region execute action number 1
    //enter turn + execute action

    var actionConfig = this._gameFake.getAction();

    var delayTime = actionConfig.time;
    this.curIndex = actionConfig.index;
    this.onEnterTurn(actionConfig.index);

    if (delayTime > 0) {
      this.scheduleOnce(function () {
        this.executeAction();
      }.bind(this), delayTime);
    } //endregion execute action number 1

  },
  start: function start() {// setTimeout(function () {
    //     this.effectWin.active = true;
    // }.bind(this),2000);
  },
  onEnable: function onEnable() {
    console.log("onEnable players:" + this.players.length);
  },
  beforeExecuteAction: function beforeExecuteAction() {
    var actionConfig = this._gameFake.getAction();

    var index = actionConfig.index;

    if (index === 0) {
      if (actionConfig.type === ActionType.PASS) {
        this.executeAction();
        return;
      }

      this.audio.playSoundYourTurn();
      this.setGroupExpects(actionConfig.cards);

      if (actionConfig.suggest) {
        //neu co suggest
        cc.log("show suggest");
        this.nodeSuggestGesture.active = true;
        this.players[0].getComponent(CPlayer).onSuggestCard(this.groupExpects);
      } else {
        this.scheduleOnce(this.autoShowSuggest, 3);
      }

      return;
    }

    this.executeAction();
  },

  /**
   *
   * @param cardExpect {Card} card mong muon danh
   */
  executeAction: function executeAction(cardExpect) {
    //1. turn off viec suggest
    //2. close turn
    //3. discard | pass
    //4. play sound
    //5. play emo
    //6. check ended game
    //7. next action|next turn
    //1. turn off viec suggest
    this._turnOffAutoSuggest();

    var actionConfig = this._gameFake.getAction(); //2. close turn


    var index = actionConfig.index;
    this.onCloseTurn(index); //3. discard | pass

    var type = actionConfig.type;

    switch (type) {
      case ActionType.PASS:
        this.onPassAt(index);
        break;

      case ActionType.DISCARD:
        this.onDiscardAt(index, actionConfig.cards, actionConfig.group, cardExpect);
        break;
    } //4. play sound


    var sound = actionConfig.sound;

    if (sound) {
      setTimeout(function () {
        this.audio.playAudio(sound);
      }.bind(this), 500);
    } //5. play emo


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
    } //6. check ended game


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
      //7. next action|next turn
      this.curIndex = actionConfig.next;

      var actionNext = this._gameFake.next();

      if (actionNext) {
        this.onEnterTurn(actionNext.index);
        console.log("actionNext:" + JSON.stringify(actionNext));
        var delayTime = actionNext.time;

        if (delayTime > 0) {
          this.scheduleOnce(function () {
            this.beforeExecuteAction();
          }.bind(this), delayTime);
        }
      }
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
                  this.executeAction(cCard.card);
                  cc.log("Discard on my turn:" + cCard.card);
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
  onCloseTurn: function onCloseTurn(index) {
    var player = this.players[index];

    if (player) {
      var cPlayer = player.getComponent(CPlayer);

      if (player) {
        cPlayer.onCloseTurn();
        return;
      }
    }

    console.log("missing player or CPlayer at index:" + index);
  },
  autoShowSuggest: function autoShowSuggest() {
    this.nodeSuggestGesture.active = true;
  },
  _playEmo: function _playEmo(index) {
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
  _turnOffAutoSuggest: function _turnOffAutoSuggest() {
    this.unschedule(this.autoShowSuggest);
    this.nodeSuggestGesture.active = false;
  },
  onPassAt: function onPassAt(index) {
    console.log("onPassAt:" + index);
    var cPlayer = this.players[index].getComponent(CPlayer);
    cPlayer.onPass();
  },
  onDiscardAt: function onDiscardAt(index, cardsOrGroup, groupType, cardExpect) {
    function getCards(cardsOrGroup, cardExpect, playerPrefab) {
      cc.log("getCardsDicard: " + index + "|" + cardExpect);
      var l = cardsOrGroup.length;

      if (l > 0) {
        if (cardsOrGroup[0] instanceof Array) {
          for (var i = 0; i < l; i++) {
            var cards = cardsOrGroup[i];

            for (var j = 0; j < cards.length; j++) {
              cc.log("isgroup:" + cardExpect + "|" + cards[j]);

              if (cards[j].id === cardExpect.id) {
                //check xem co full card trong player
                if (index === 0) {
                  var cPlayer = playerPrefab.getComponent(CPlayer);

                  if (cPlayer.isContainAll(cards)) {
                    return cards;
                  }
                }
              }
            }
          }

          cc.error("not found card in group");
          return cardsOrGroup[0];
        }
      }

      return cardsOrGroup;
    }

    var playerPrefab = this.players[index];
    var cards = getCards(cardsOrGroup, cardExpect, playerPrefab);
    var s = '';

    for (var i = 0; i < cards.length; i++) {
      s += " " + cards[i];
    }

    console.log("onDiscardAt:" + index + "|" + cardExpect + "|" + s);
    var cTable = this.table.getComponent(CTable);
    var cardPrefabs = playerPrefab.getComponent(CPlayer).onDiscard(cards);

    var effectDiscard = function effectDiscard(cardPrefab) {
      //1. move den dock -> xoay lai 0 do -> nay bat ra ra 1 ti
      var cCard = cardPrefab.getComponent(CCard);
      var len = cTable.numCard;
      var index = cCard.index;
      var p = cTable.getPositionCard(cCard);
      var duration = 0.3;
      var duration1 = 0.15;
      cardPrefab.setRotation(330, 0, 0);
      cardPrefab.runAction(cc.sequence(cc.spawn(cc.moveTo(duration, p), cc.rotateTo(duration, 0), cc.sequence(cc.scaleTo(duration / 2, 1.1, 1.1), cc.scaleTo(duration / 2, 0.85, 0.85))), cc.spawn(cc.scaleTo(duration1, 0.90, 0.90), cc.moveTo(duration1, p.x + Math.random() * 30 * (index - (len - 1) / 2), p.y + Math.random() * 20), cc.rotateTo(duration1, (index - (len - 1) / 2) * Math.random() * 8))));
    };

    var len = cardPrefabs.length;
    cTable.setNumCard(len);
    cc.log("imgHighLight:" + this.zIndexCard);
    this.imgHighLight.zIndex = ++this.zIndexCard;
    this.imgHighLight.active = true;
    this.imgHighLight.opacity = 0;
    this.imgHighLight.runAction(cc.sequence(cc.hide(), cc.delayTime(0.4), cc.show(), cc.spawn(cc.scaleTo(0.2, 1.2, 1.2), cc.fadeIn(0.2)), cc.scaleTo(0.2, 1, 1), cc.delayTime(1), cc.fadeOut(0.3), cc.callFunc(function (sender) {
      sender.active = false;
    }, this)));

    for (var k = 0; k < len; k++) {
      var cardPrefab = cardPrefabs[k];
      var cCard = cardPrefab.getComponent(CCard);
      cCard.index = k;
      cCard.owner = cTable;
      cardPrefab.zIndex = ++this.zIndexCard;
      cc.log("cardPrefab:" + this.zIndexCard);
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
  setGroupExpects: function setGroupExpects(cards) {
    var groups = [];
    var lG = cards.length;

    if (lG > 0) {
      if (cards[0] instanceof Array) {
        for (var g = 0; g < lG; g++) {
          groups.push(cards[g]);
        }
      } else {
        groups.push(cards);
      }
    } else {
      groups.push(cards);
    }

    this.groupExpects = groups;
  },
  isContainGroupExpects: function isContainGroupExpects(card) {
    var lg = this.groupExpects.length;

    for (var i = 0; i < lg; i++) {
      var cards = this.groupExpects[i];
      var lc = cards.length;

      for (var j = 0; j < lc; j++) {
        if (cards[j].id === card.id) {
          return true;
        }
      }
    }

    return false;
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
    return this.isContainGroupExpects(card);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGxheWFibGVTdGF0ZSIsInJlcXVpcmUiLCJQb29sSGFuZGxlciIsIkNDYXJkIiwiQ1RhYmxlIiwiQ1BsYXllciIsIkNhcmQiLCJUYWJsZSIsIlBsYXllciIsIkFjdGlvblR5cGUiLCJHYW1lRmFrZSIsIlNvdW5kVHlwZSIsIkNhcmRHcm91cCIsIlBsYXlhYmxlQWRzIiwiQ0F1ZGlvIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWFibGVTdGF0ZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImJ0bkR1bXAiLCJidG5QYXNzIiwibGF5ZXJHYW1lIiwiTm9kZSIsImxheWVyQWN0aW9uIiwidGFibGUiLCJwbGF5ZXJzIiwibGF5ZXJDYXJkIiwibm9kZVN1Z2dlc3RHZXN0dXJlIiwibm9kZUNIUGxheSIsImVmZmVjdFdpbiIsImVmZmVjdENhcmRHcm91cCIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJpbWdIYW5kcyIsIlNwcml0ZSIsImVtb1BsYXllcnMiLCJpbWdIaWdoTGlnaHQiLCJfcG9vbENhcmQiLCJOb2RlUG9vbCIsIl9nYW1lRmFrZSIsImN0b3IiLCJjdXJJbmRleCIsImdyb3VwRXhwZWN0cyIsInN0YXJ0UG9pbnRUb3VjaCIsInpJbmRleENhcmQiLCJhdWRpbyIsIl9wb3NIYW5kcyIsIm9uTG9hZCIsImkiLCJsZW5ndGgiLCJwdXNoIiwibm9kZSIsImdldFBvc2l0aW9uIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZUNvbnRyb2xsZXIiLCJhdHRhY2hMYXllckNhcmRUb1BsYXllciIsImdhbWVJbmZvIiwiZ2V0RGVmYXVsdEluZm8iLCJ0YWJsZUNvbmZpZyIsImlkIiwic3Rha2UiLCJwb3QiLCJzZXRUYWJsZSIsImNhcmRzIiwiZG9jayIsImNUYWJsZSIsInNldE51bUNhcmQiLCJqIiwiYyIsImNhcmRQcmVmYWJzIiwiZ2V0IiwiaW5zdGFudGlhdGUiLCJjQ2FyZCIsInNldENhcmQiLCJpbmRleCIsInNldE93bmVyIiwicCIsImdldFBvc2l0aW9uQ2FyZCIsImFuZ2xlIiwiTWF0aCIsInJhbmRvbSIsInNldFBvc2l0aW9uIiwiYWRkQ2hpbGQiLCJwbGF5ZXJzQ29uZmlnIiwiayIsInBsYXllckNvbmZpZyIsInBsYXllciIsImRpc3BsYXlOYW1lIiwiZ29sZCIsImF2YXRhckluZGV4IiwiY1BsYXllciIsInNldEdhbWVDb250cm9sbGVyIiwic2V0UGxheWVyIiwib24iLCJvblRvdWNoQ2FyZCIsImFjdGlvbkNvbmZpZyIsImdldEFjdGlvbiIsImRlbGF5VGltZSIsInRpbWUiLCJvbkVudGVyVHVybiIsInNjaGVkdWxlT25jZSIsImV4ZWN1dGVBY3Rpb24iLCJiaW5kIiwic3RhcnQiLCJvbkVuYWJsZSIsImNvbnNvbGUiLCJsb2ciLCJiZWZvcmVFeGVjdXRlQWN0aW9uIiwiUEFTUyIsInBsYXlTb3VuZFlvdXJUdXJuIiwic2V0R3JvdXBFeHBlY3RzIiwic3VnZ2VzdCIsIm9uU3VnZ2VzdENhcmQiLCJhdXRvU2hvd1N1Z2dlc3QiLCJjYXJkRXhwZWN0IiwiX3R1cm5PZmZBdXRvU3VnZ2VzdCIsIm9uQ2xvc2VUdXJuIiwib25QYXNzQXQiLCJESVNDQVJEIiwib25EaXNjYXJkQXQiLCJncm91cCIsInNvdW5kIiwic2V0VGltZW91dCIsInBsYXlBdWRpbyIsImVtbyIsIkFycmF5IiwiX3BsYXlFbW8iLCJpc0VuZGVkIiwiaGFuZCIsInJ1bkFjdGlvbiIsIm1vdmVCeSIsIldJTiIsIm5leHQiLCJhY3Rpb25OZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsImV2ZW50IiwiZGF0YSIsImdldFVzZXJEYXRhIiwiY2FyZCIsIm93bmVyIiwiaXNNeVR1cm4iLCJpc1RvdWNoRXhwZWN0Q2FyZHMiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsImdldExvY2F0aW9uIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsInBvcyIsInkiLCJvblBsYXlOb3ciLCJvbkNUQUNsaWNrIiwib25Ub3VjaER1bXAiLCJvblRvdWNoUGFzcyIsImxlbiIsInNldExheWVyQ2FyZCIsInNwaW5lIiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJzZXRBbmltYXRpb24iLCJfcGxheUVmZmVjdEdyb3VwIiwibmFtZSIsImNsZWFyVHJhY2tzIiwidW5zY2hlZHVsZSIsIm9uUGFzcyIsImNhcmRzT3JHcm91cCIsImdyb3VwVHlwZSIsImdldENhcmRzIiwicGxheWVyUHJlZmFiIiwibCIsImlzQ29udGFpbkFsbCIsImVycm9yIiwicyIsIm9uRGlzY2FyZCIsImVmZmVjdERpc2NhcmQiLCJudW1DYXJkIiwiZHVyYXRpb24iLCJkdXJhdGlvbjEiLCJzZXRSb3RhdGlvbiIsInNlcXVlbmNlIiwic3Bhd24iLCJtb3ZlVG8iLCJyb3RhdGVUbyIsInNjYWxlVG8iLCJ4IiwiekluZGV4Iiwib3BhY2l0eSIsImhpZGUiLCJzaG93IiwiZmFkZUluIiwiZmFkZU91dCIsImNhbGxGdW5jIiwic2VuZGVyIiwiRkxVU0giLCJTVFJBSUdIVCIsIkZVTExfSE9VU0UiLCJGT1VSX09GX0tJTkQiLCJOT05FIiwiZ3JvdXBzIiwibEciLCJnIiwiaXNDb250YWluR3JvdXBFeHBlY3RzIiwibGciLCJsYyIsImdldE5ld0NhcmQiLCJzaG93Tm9kZUNIUGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQTNCOztBQUNBLElBQUlDLFdBQVcsR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBekI7O0FBQ0EsSUFBSUUsS0FBSyxHQUFHRixPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRyxNQUFNLEdBQUdILE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlJLE9BQU8sR0FBR0osT0FBTyxDQUFDLFNB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bG1CSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGxheWFibGVTdGF0ZSA9IHJlcXVpcmUoJ1BsYXlhYmxlU3RhdGUnKTtcclxudmFyIFBvb2xIYW5kbGVyID0gcmVxdWlyZShcIlBvb2xIYW5kbGVyXCIpO1xyXG52YXIgQ0NhcmQgPSByZXF1aXJlKFwiQ0NhcmRcIik7XHJcbnZhciBDVGFibGUgPSByZXF1aXJlKFwiQ1RhYmxlXCIpO1xyXG52YXIgQ1BsYXllciA9IHJlcXVpcmUoXCJDUGxheWVyXCIpO1xyXG52YXIge0NhcmQsVGFibGUsUGxheWVyfSA9IHJlcXVpcmUoXCJUeXBlc1wiKTtcclxudmFyIHtBY3Rpb25UeXBlLEdhbWVGYWtlLFNvdW5kVHlwZSxDYXJkR3JvdXB9ID0gcmVxdWlyZShcIkdhbWVGYWtlXCIpO1xyXG52YXIgUGxheWFibGVBZHMgPSByZXF1aXJlKFwiUGxheWFibGVBZHNcIik7XHJcbnZhciBDQXVkaW8gPSByZXF1aXJlKFwiQ0F1ZGlvXCIpO1xyXG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kcyAgIDogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBsYXlhYmxlU3RhdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdCAgICAgOiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlICAgICAgICA6IFBsYXlhYmxlU3RhdGUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZpc2libGUgICAgIDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0blBsYXlOb3cgICA6IGNjLkJ1dHRvbixcclxuICAgICAgICBidG5EdW1wICAgICAgOiBjYy5CdXR0b24sXHJcbiAgICAgICAgYnRuUGFzcyAgICAgIDogY2MuQnV0dG9uLFxyXG4gICAgICAgIGxheWVyR2FtZSAgICA6IGNjLk5vZGUsXHJcbiAgICAgICAgbGF5ZXJBY3Rpb24gIDogY2MuTm9kZSxcclxuICAgICAgICB0YWJsZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXJzICA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxheWVyQ2FyZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBub2RlU3VnZ2VzdEdlc3R1cmU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9kZUNIUGxheTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZmZlY3RXaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0Q2FyZEdyb3VwOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWdIYW5kczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6W2NjLlNwcml0ZV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtb1BsYXllcnM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5Ob2RlXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1nSGlnaExpZ2h0OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9wb29sQ2FyZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlUG9vbCxcclxuICAgICAgICAgICAgdmlzaWJsZTpmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2dhbWVGYWtlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBHYW1lRmFrZSxcclxuICAgICAgICAgICAgdmlzaWJsZTpmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5ncm91cEV4cGVjdHMgPSBbXTsgLy9ncm91cCBjYXJkc1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb2ludFRvdWNoID0gbnVsbDtcclxuICAgICAgICB0aGlzLnpJbmRleENhcmQgPSAxMDtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9wb3NIYW5kcyA9IFtdO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbWdIYW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3NIYW5kcy5wdXNoKHRoaXMuaW1nSGFuZHNbaV0ubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlQ0hQbGF5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0Q2FyZEdyb3VwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0V2luLmdldENvbXBvbmVudChcIkNFZmZlY3RXaW5cIikuZ2FtZUNvbnRyb2xsZXIgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChDQXVkaW8pO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0V2luLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vMS4ga2hvaSB0YW8gaW5mbyBiYW4gZGF1XHJcbiAgICAgICAgdGhpcy5fcG9vbENhcmQgPSBuZXcgY2MuTm9kZVBvb2woQ0NhcmQpO1xyXG5cclxuICAgICAgICAvL3JlZ2lvbiBraG9pIHRhbyBiYW4gZGF1IGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRmFrZSA9IG5ldyBHYW1lRmFrZSgpO1xyXG4gICAgICAgIHZhciBnYW1lSW5mbyA9IHRoaXMuX2dhbWVGYWtlLmdldERlZmF1bHRJbmZvKCk7XHJcbiAgICAgICAgdmFyIHRhYmxlQ29uZmlnID0gZ2FtZUluZm8udGFibGU7XHJcbiAgICAgICAgdmFyIHRhYmxlID0gbmV3IFRhYmxlKHRhYmxlQ29uZmlnLmlkLHRhYmxlQ29uZmlnLnN0YWtlLHRhYmxlQ29uZmlnLnBvdCk7XHJcbiAgICAgICAgdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKS5zZXRUYWJsZSh0YWJsZSk7XHJcblxyXG4gICAgICAgIC8vY3JlYXRlIG5ldyBDYXJkIG9uIERvY2tcclxuICAgICAgICB2YXIgY2FyZHMgPSB0YWJsZUNvbmZpZy5kb2NrO1xyXG4gICAgICAgIHZhciBjVGFibGUgPSB0aGlzLnRhYmxlLmdldENvbXBvbmVudChDVGFibGUpO1xyXG4gICAgICAgIGNUYWJsZS5zZXROdW1DYXJkKGNhcmRzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgYyA9IGNhcmRzW2pdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRQcmVmYWJzID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmKCFjYXJkUHJlZmFicyl7Y2FyZFByZWZhYnMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuXHJcbiAgICAgICAgICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWJzLmdldENvbXBvbmVudChDQ2FyZCk7XHJcblxyXG4gICAgICAgICAgICBjQ2FyZC5zZXRDYXJkKGMpO1xyXG4gICAgICAgICAgICBjQ2FyZC5pbmRleCA9IChqKTtcclxuICAgICAgICAgICAgY0NhcmQuc2V0T3duZXIoY1RhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIGNDYXJkLm5vZGUuYW5nbGUgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA0MDtcclxuICAgICAgICAgICAgY2FyZFByZWZhYnMuc2V0UG9zaXRpb24ocCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJDYXJkLmFkZENoaWxkKGNhcmRQcmVmYWJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MubG9nKFwib25FbmFibGUgcGxheWVyczpcIiArIHRoaXMucGxheWVycy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvL3VwZGF0ZSBpbmZvIGF2YXRhciArIGxvYWQgY2FyZFxyXG4gICAgICAgIHZhciBwbGF5ZXJzQ29uZmlnID0gZ2FtZUluZm8ucGxheWVycztcclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBsYXllcnNDb25maWcubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllckNvbmZpZyA9IHBsYXllcnNDb25maWdba107XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZy5pbmRleCxwbGF5ZXJDb25maWcuZGlzcGxheU5hbWUscGxheWVyQ29uZmlnLmdvbGQscGxheWVyQ29uZmlnLmF2YXRhckluZGV4LHBsYXllckNvbmZpZy5jYXJkcyk7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW3BsYXllci5pbmRleF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgICAgICBjUGxheWVyLnNldEdhbWVDb250cm9sbGVyKHRoaXMpO1xyXG4gICAgICAgICAgICBjUGxheWVyLnNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xvYWQgcHJlZmFiIGNhcmRQcmVmYWJzXHJcbiAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL2NhcmRQcmVmYWJcIiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAvLyAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbigxMDAsMTAwKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgLy8gICAgIC8vIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgLy8gfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvL2VuZHJlZ2lvbiBraG9pIHRhbyBiYW4gZGF1IGdhbWVcclxuXHJcbiAgICAgICAgLy9yZWdpb24gYWRkIGV2ZW50IHRvdWNoIGNhcmRcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJjYXJkLXRvdWNoXCIsdGhpcy5vblRvdWNoQ2FyZCx0aGlzKTtcclxuICAgICAgICAvL2VuZHJlZ2lvbiBhZGQgZXZlbnQgdG91Y2ggY2FyZFxyXG5cclxuICAgICAgICAvL3JlZ2lvbiBleGVjdXRlIGFjdGlvbiBudW1iZXIgMVxyXG4gICAgICAgIC8vZW50ZXIgdHVybiArIGV4ZWN1dGUgYWN0aW9uXHJcbiAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgIHZhciBkZWxheVRpbWUgPSBhY3Rpb25Db25maWcudGltZTtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gYWN0aW9uQ29uZmlnLmluZGV4O1xyXG4gICAgICAgIHRoaXMub25FbnRlclR1cm4oYWN0aW9uQ29uZmlnLmluZGV4KTtcclxuICAgICAgICBpZihkZWxheVRpbWU+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksZGVsYXlUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lbmRyZWdpb24gZXhlY3V0ZSBhY3Rpb24gbnVtYmVyIDFcclxuICAgIH0sXHJcbiAgICBzdGFydDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH0uYmluZCh0aGlzKSwyMDAwKTtcclxuICAgIH0sXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbmFibGUgcGxheWVyczpcIiArIHRoaXMucGxheWVycy5sZW5ndGgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiZWZvcmVFeGVjdXRlQWN0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICBpZihpbmRleCA9PT0gMCApe1xyXG4gICAgICAgICAgICBpZihhY3Rpb25Db25maWcudHlwZSA9PT0gQWN0aW9uVHlwZS5QQVNTKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheVNvdW5kWW91clR1cm4oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRHcm91cEV4cGVjdHMoYWN0aW9uQ29uZmlnLmNhcmRzKTtcclxuICAgICAgICAgICAgaWYoYWN0aW9uQ29uZmlnLnN1Z2dlc3Qpey8vbmV1IGNvIHN1Z2dlc3RcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcInNob3cgc3VnZ2VzdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbMF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpLm9uU3VnZ2VzdENhcmQodGhpcy5ncm91cEV4cGVjdHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuYXV0b1Nob3dTdWdnZXN0LDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leGVjdXRlQWN0aW9uKCk7XHJcblxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYXJkRXhwZWN0IHtDYXJkfSBjYXJkIG1vbmcgbXVvbiBkYW5oXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVBY3Rpb246ZnVuY3Rpb24oY2FyZEV4cGVjdCl7XHJcbiAgICAgICAgLy8xLiB0dXJuIG9mZiB2aWVjIHN1Z2dlc3RcclxuICAgICAgICAvLzIuIGNsb3NlIHR1cm5cclxuICAgICAgICAvLzMuIGRpc2NhcmQgfCBwYXNzXHJcbiAgICAgICAgLy80LiBwbGF5IHNvdW5kXHJcbiAgICAgICAgLy81LiBwbGF5IGVtb1xyXG4gICAgICAgIC8vNi4gY2hlY2sgZW5kZWQgZ2FtZVxyXG4gICAgICAgIC8vNy4gbmV4dCBhY3Rpb258bmV4dCB0dXJuXHJcblxyXG4gICAgICAgIC8vMS4gdHVybiBvZmYgdmllYyBzdWdnZXN0XHJcbiAgICAgICAgdGhpcy5fdHVybk9mZkF1dG9TdWdnZXN0KCk7XHJcblxyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy8yLiBjbG9zZSB0dXJuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gYWN0aW9uQ29uZmlnLmluZGV4O1xyXG4gICAgICAgIHRoaXMub25DbG9zZVR1cm4oaW5kZXgpO1xyXG5cclxuICAgICAgICAvLzMuIGRpc2NhcmQgfCBwYXNzXHJcbiAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25Db25maWcudHlwZTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlBBU1M6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFzc0F0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGUuRElTQ0FSRDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25EaXNjYXJkQXQoaW5kZXgsYWN0aW9uQ29uZmlnLmNhcmRzLGFjdGlvbkNvbmZpZy5ncm91cCxjYXJkRXhwZWN0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy80LiBwbGF5IHNvdW5kXHJcbiAgICAgICAgdmFyIHNvdW5kID0gYWN0aW9uQ29uZmlnLnNvdW5kO1xyXG4gICAgICAgIGlmKHNvdW5kKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlBdWRpbyhzb3VuZCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSw1MDApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vNS4gcGxheSBlbW9cclxuICAgICAgICB2YXIgZW1vID0gYWN0aW9uQ29uZmlnLmVtbztcclxuICAgICAgICBpZihlbW8gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGVtbyBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZW1vLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLGVtb1trXSksayAgKiAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGVtbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vNi4gY2hlY2sgZW5kZWQgZ2FtZVxyXG4gICAgICAgIGlmKGFjdGlvbkNvbmZpZy5pc0VuZGVkKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1nSGFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZCA9IHRoaXMuaW1nSGFuZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZC5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMC41LDAsLTMwMCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMTAwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QXVkaW8oU291bmRUeXBlLldJTik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMjUwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAvLzcuIG5leHQgYWN0aW9ufG5leHQgdHVyblxyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gYWN0aW9uQ29uZmlnLm5leHQ7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25OZXh0ID0gdGhpcy5fZ2FtZUZha2UubmV4dCgpO1xyXG4gICAgICAgICAgICBpZihhY3Rpb25OZXh0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlclR1cm4oYWN0aW9uTmV4dC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdGlvbk5leHQ6XCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uTmV4dC50aW1lO1xyXG4gICAgICAgICAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaENhcmQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICB2YXIgY0NhcmQgPSBkYXRhLmNhcmQ7XHJcbiAgICAgICAgdmFyIG93bmVyID0gY0NhcmQub3duZXI7XHJcbiAgICAgICAgaWYob3duZXIgaW5zdGFuY2VvZiBDVGFibGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3NpbmcgY2FyZCBvbiB0YWJsZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvd25lciBpbnN0YW5jZW9mIENQbGF5ZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzTXlUdXJuKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1RvdWNoRXhwZWN0Q2FyZHMoY0NhcmQuY2FyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnRUb3VjaCA9IGRhdGEuZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGFydFBvaW50VG91Y2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBkYXRhLmV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9zLnkgLSB0aGlzLnN0YXJ0UG9pbnRUb3VjaC55ID4gNDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oY0NhcmQuY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkRpc2NhcmQgb24gbXkgdHVybjpcIiArIGNDYXJkLmNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCIhIURpc2NhcmQgb24gbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ0b3VjaDpcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhcnRQb2ludFRvdWNoKSArXCJ8IFwiKyBKU09OLnN0cmluZ2lmeShwb3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwibm90IGV4cGVjdHMgY2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJub3QgbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvd25lci5vblRvdWNoQ2FyZChkYXRhLmV2ZW50LGRhdGEuY2FyZClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblRvdWNoQ2FyZCBhdCBjb250cm9sZXJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUGxheU5vdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25QbGF5IHBhdGggbWFpblwiKTtcclxuICAgICAgICBQbGF5YWJsZUFkcy5vbkNUQUNsaWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hEdW1wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b3VjaCBEdW1wXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRvdWNoUGFzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggUGFzc1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5wbGF5ZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2ldLmdldENvbXBvbmVudChcIkNQbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIGNQbGF5ZXIuc2V0TGF5ZXJDYXJkKHRoaXMubGF5ZXJDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25FbnRlclR1cm46ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbnRlclR1cm46IFwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vbkVudGVyVHVybigpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xvc2VUdXJuOmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XTtcclxuICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHBsYXllci5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgICAgICBjUGxheWVyLm9uQ2xvc2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtaXNzaW5nIHBsYXllciBvciBDUGxheWVyIGF0IGluZGV4OlwiICsgaW5kZXgpO1xyXG4gICAgfSxcclxuICAgIGF1dG9TaG93U3VnZ2VzdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFbW86ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIHZhciBlbW8gPSB0aGlzLmVtb1BsYXllcnNbaW5kZXhdO1xyXG4gICAgICAgIGlmKGVtbyl7XHJcbiAgICAgICAgICAgIHZhciBzcGluZSA9IGVtby5nZXRDb21wb25lbnQoJ3NwLlNrZWxldG9uJyk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldFN0YXJ0TGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gc3RhcnQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRJbnRlcnJ1cHRMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gaW50ZXJydXB0LlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0RW5kTGlzdGVuZXIoZnVuY3Rpb24gKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGVuZC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldERpc3Bvc2VMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gd2lsbCBiZSBkaXNwb3NlZC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgICAgICBlbW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyBpZiAoYW5pbWF0aW9uTmFtZSA9PT0gJ3Nob290Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gICAgIHRoaXMuc3BpbmUuY2xlYXJUcmFjaygxKTtcclxuICAgICAgICAgICAgICAgIC8vIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHZhciBsb29wQ291bnQgPSBNYXRoLmZsb29yKHRyYWNrRW50cnkudHJhY2tUaW1lIC8gdHJhY2tFbnRyeS5hbmltYXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGNvbXBsZXRlOiAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGxvb3BDb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRFdmVudExpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnksIGV2ZW50KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBldmVudDogJXMsICVzLCAlcywgJXNcIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lLCBldmVudC5kYXRhLm5hbWUsIGV2ZW50LmludFZhbHVlLCBldmVudC5mbG9hdFZhbHVlLCBldmVudC5zdHJpbmdWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdhbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9wbGF5RWZmZWN0R3JvdXA6ZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJfcGxheUVmZmVjdEdyb3VwOlwiICsgbmFtZSk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuZWZmZWN0Q2FyZEdyb3VwO1xyXG4gICAgICAgIGlmKGVtbyl7XHJcbiAgICAgICAgICAgIHZhciBzcGluZSA9IGVtby5nZXRDb21wb25lbnQoJ3NwLlNrZWxldG9uJyk7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIC8vIGlmIChhbmltYXRpb25OYW1lID09PSAnc2hvb3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyAgICAgdGhpcy5zcGluZS5jbGVhclRyYWNrKDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGxvb3BDb3VudCA9IE1hdGguZmxvb3IodHJhY2tFbnRyeS50cmFja1RpbWUgLyB0cmFja0VudHJ5LmFuaW1hdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gY29tcGxldGU6ICVzXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSwgbG9vcENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgbmFtZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9LDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF90dXJuT2ZmQXV0b1N1Z2dlc3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5hdXRvU2hvd1N1Z2dlc3QpO1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG9uUGFzc0F0OmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUGFzc0F0OlwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vblBhc3MoKTtcclxuICAgIH0sXHJcbiAgICBvbkRpc2NhcmRBdDpmdW5jdGlvbihpbmRleCxjYXJkc09yR3JvdXAsZ3JvdXBUeXBlLGNhcmRFeHBlY3Qpe1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldENhcmRzKGNhcmRzT3JHcm91cCxjYXJkRXhwZWN0LHBsYXllclByZWZhYil7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImdldENhcmRzRGljYXJkOiBcIiArIGluZGV4ICtcInxcIiArIGNhcmRFeHBlY3QpO1xyXG4gICAgICAgICAgICB2YXIgbCA9IGNhcmRzT3JHcm91cC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGwgPiAwKXtcclxuICAgICAgICAgICAgICAgIGlmKGNhcmRzT3JHcm91cFswXSBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZHMgPSBjYXJkc09yR3JvdXBbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcImlzZ3JvdXA6XCIgKyBjYXJkRXhwZWN0ICtcInxcIiArIGNhcmRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhcmRzW2pdLmlkID09PSBjYXJkRXhwZWN0LmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHhlbSBjbyBmdWxsIGNhcmQgdHJvbmcgcGxheWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY1BsYXllciA9IHBsYXllclByZWZhYi5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNQbGF5ZXIuaXNDb250YWluQWxsKGNhcmRzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJub3QgZm91bmQgY2FyZCBpbiBncm91cFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZHNPckdyb3VwWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjYXJkc09yR3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwbGF5ZXJQcmVmYWIgPSB0aGlzLnBsYXllcnNbaW5kZXhdO1xyXG4gICAgICAgIHZhciBjYXJkcyA9IGdldENhcmRzKGNhcmRzT3JHcm91cCxjYXJkRXhwZWN0LHBsYXllclByZWZhYik7XHJcbiAgICAgICAgdmFyIHMgPSAnJztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgKz0gXCIgXCIrIGNhcmRzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRGlzY2FyZEF0OlwiICsgaW5kZXggK1wifFwiKyBjYXJkRXhwZWN0ICsgXCJ8XCIrIHMpO1xyXG4gICAgICAgIHZhciBjVGFibGUgPSB0aGlzLnRhYmxlLmdldENvbXBvbmVudChDVGFibGUpO1xyXG4gICAgICAgIHZhciBjYXJkUHJlZmFicyA9IHBsYXllclByZWZhYi5nZXRDb21wb25lbnQoQ1BsYXllcikub25EaXNjYXJkKGNhcmRzKTtcclxuXHJcbiAgICAgICAgdmFyIGVmZmVjdERpc2NhcmQgPSBmdW5jdGlvbiAoY2FyZFByZWZhYikge1xyXG4gICAgICAgICAgICAvLzEuIG1vdmUgZGVuIGRvY2sgLT4geG9heSBsYWkgMCBkbyAtPiBuYXkgYmF0IHJhIHJhIDEgdGlcclxuICAgICAgICAgICAgdmFyIGNDYXJkID0gY2FyZFByZWZhYi5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gY1RhYmxlLm51bUNhcmQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGNDYXJkLmluZGV4O1xyXG5cclxuICAgICAgICAgICAgdmFyIHAgPSBjVGFibGUuZ2V0UG9zaXRpb25DYXJkKGNDYXJkKTtcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gMC4zO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24xID0gMC4xNTtcclxuICAgICAgICAgICAgY2FyZFByZWZhYi5zZXRSb3RhdGlvbigzMzAsMCwwKTtcclxuICAgICAgICAgICAgY2FyZFByZWZhYi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24scCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24sMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24vMiwxLjEsMS4xKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbi8yLDAuODUsMC44NSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbjEsMC45MCwwLjkwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24xLHAueCsgKE1hdGgucmFuZG9tKCkgKiAzMCAqIChpbmRleCAtIChsZW4tMSkvMikpLHAueSArIChNYXRoLnJhbmRvbSgpICogMjApKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbjEsIChpbmRleCAtIChsZW4gLSAxKS8yKSAqIE1hdGgucmFuZG9tKCkgKiA4KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBsZW4gPSBjYXJkUHJlZmFicy5sZW5ndGg7XHJcbiAgICAgICAgY1RhYmxlLnNldE51bUNhcmQobGVuKTtcclxuXHJcbiAgICAgICAgY2MubG9nKFwiaW1nSGlnaExpZ2h0OlwiICArIHRoaXMuekluZGV4Q2FyZCk7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQuekluZGV4ID0gKyt0aGlzLnpJbmRleENhcmQ7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmltZ0hpZ2hMaWdodC5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmltZ0hpZ2hMaWdodC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmhpZGUoKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuNCksXHJcbiAgICAgICAgICAgIGNjLnNob3coKSxcclxuICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwxLjIsMS4yKSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVJbigwLjIpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLDEsMSksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2MuZmFkZU91dCgwLjMpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZW5kZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sdGhpcylcclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47IGsrKykge1xyXG4gICAgICAgICAgICB2YXIgY2FyZFByZWZhYiA9IGNhcmRQcmVmYWJzW2tdO1xyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFiLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgICAgIGNDYXJkLmluZGV4ID0gKGspO1xyXG4gICAgICAgICAgICBjQ2FyZC5vd25lciA9IGNUYWJsZTtcclxuICAgICAgICAgICAgY2FyZFByZWZhYi56SW5kZXggPSArKyB0aGlzLnpJbmRleENhcmQ7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImNhcmRQcmVmYWI6XCIgICsgdGhpcy56SW5kZXhDYXJkKTtcclxuXHJcbiAgICAgICAgICAgIGVmZmVjdERpc2NhcmQoY2FyZFByZWZhYik7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICAvLyBjYXJkUHJlZmFiLnJ1bkFjdGlvbihjYy5zcGF3bihcclxuICAgICAgICAgICAgLy8gICAgIGNjLm1vdmVUbygwLjE1LHApLFxyXG4gICAgICAgICAgICAvLyAgICAgY2Mucm90YXRlVG8oMSwwKVxyXG4gICAgICAgICAgICAvLyApKTtcclxuICAgICAgICAgICAgLy8gY2MubG9nKFwibmV3WkluZGV4OlwiICsgdGhpcy56SW5kZXhDYXJkKTtcclxuXHJcbiAgICAgICAgICAgIC8vZHVvYyBhZGQga2hpIHRhbyByYVxyXG4gICAgICAgICAgICAvLyB0aGlzLmxheWVyR2FtZS5hZGRDaGlsZChjYXJkUHJlZmFiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzd2l0Y2ggKGdyb3VwVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GTFVTSDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnZmx1c2gnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5TVFJBSUdIVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnc3RyYWlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GVUxMX0hPVVNFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVmZmVjdEdyb3VwKCdmdWxsaG91c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GT1VSX09GX0tJTkQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ2Zvcm9mYWtpbmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5OT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAvLyAgICAgdmFyIGMgPSBjYXJkc1tqXTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgY2FyZFByZWZhYnMgPSB0aGlzLl9wb29sQ2FyZC5nZXQoKTtcclxuICAgICAgICAvLyAgICAgaWYoIWNhcmRQcmVmYWJzKXtjYXJkUHJlZmFicyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFByZWZhYik7fVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWJzLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgY0NhcmQuc2V0Q2FyZChjKTtcclxuICAgICAgICAvLyAgICAgY0NhcmQuaW5kZXggPSAoaik7XHJcbiAgICAgICAgLy8gICAgIGNDYXJkLm93bmVyID0gY1RhYmxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgLy8gICAgIGNhcmRQcmVmYWJzLnNldFBvc2l0aW9uKHApO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxheWVyR2FtZS5hZGRDaGlsZChjYXJkUHJlZmFicyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRHcm91cEV4cGVjdHM6ZnVuY3Rpb24oY2FyZHMpe1xyXG4gICAgICAgIHZhciBncm91cHMgPSBbXTtcclxuICAgICAgICB2YXIgbEcgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgaWYobEcgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGNhcmRzWzBdIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZyA9IDA7IGcgPCBsRzsgZysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goY2FyZHNbZ10pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goY2FyZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBncm91cHMucHVzaChjYXJkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdXBFeHBlY3RzID0gZ3JvdXBzO1xyXG4gICAgfSxcclxuICAgIGlzQ29udGFpbkdyb3VwRXhwZWN0czpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgbGcgPSB0aGlzLmdyb3VwRXhwZWN0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkcyA9IHRoaXMuZ3JvdXBFeHBlY3RzW2ldO1xyXG4gICAgICAgICAgICB2YXIgbGMgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoY2FyZHNbal0uaWQgPT09IGNhcmQuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBnZXROZXdDYXJkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNhcmRQcmVmYWIgPSB0aGlzLl9wb29sQ2FyZC5nZXQoKTtcclxuICAgICAgICBpZighY2FyZFByZWZhYil7Y2FyZFByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFByZWZhYik7fVxyXG4gICAgICAgIHJldHVybiBjYXJkUHJlZmFiO1xyXG4gICAgfSxcclxuICAgIGlzTXlUdXJuOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJJbmRleCA9PT0gMDtcclxuICAgIH0sXHJcbiAgICBpc1RvdWNoRXhwZWN0Q2FyZHM6ZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0NvbnRhaW5Hcm91cEV4cGVjdHMoY2FyZCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd05vZGVDSFBsYXk6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNIUGxheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG59KTsiXX0=