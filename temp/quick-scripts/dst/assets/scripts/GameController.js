
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
      cTable.addCards([cardPrefabs]);
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
        this.onPassAt(index, actionConfig.isNewRound);
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
  onPassAt: function onPassAt(index, isNewRound) {
    console.log("onPassAt:" + index);
    var cPlayer = this.players[index].getComponent(CPlayer);
    cPlayer.onPass();

    if (isNewRound) {
      var cTable = this.table.getComponent(CTable);
      cTable.onNewRound();
    }
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

    cTable.addCards(cardPrefabs);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGxheWFibGVTdGF0ZSIsInJlcXVpcmUiLCJQb29sSGFuZGxlciIsIkNDYXJkIiwiQ1RhYmxlIiwiQ1BsYXllciIsIkNhcmQiLCJUYWJsZSIsIlBsYXllciIsIkFjdGlvblR5cGUiLCJHYW1lRmFrZSIsIlNvdW5kVHlwZSIsIkNhcmRHcm91cCIsIlBsYXlhYmxlQWRzIiwiQ0F1ZGlvIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWFibGVTdGF0ZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImJ0bkR1bXAiLCJidG5QYXNzIiwibGF5ZXJHYW1lIiwiTm9kZSIsImxheWVyQWN0aW9uIiwidGFibGUiLCJwbGF5ZXJzIiwibGF5ZXJDYXJkIiwibm9kZVN1Z2dlc3RHZXN0dXJlIiwibm9kZUNIUGxheSIsImVmZmVjdFdpbiIsImVmZmVjdENhcmRHcm91cCIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJpbWdIYW5kcyIsIlNwcml0ZSIsImVtb1BsYXllcnMiLCJpbWdIaWdoTGlnaHQiLCJfcG9vbENhcmQiLCJOb2RlUG9vbCIsIl9nYW1lRmFrZSIsImN0b3IiLCJjdXJJbmRleCIsImdyb3VwRXhwZWN0cyIsInN0YXJ0UG9pbnRUb3VjaCIsInpJbmRleENhcmQiLCJhdWRpbyIsIl9wb3NIYW5kcyIsIm9uTG9hZCIsImkiLCJsZW5ndGgiLCJwdXNoIiwibm9kZSIsImdldFBvc2l0aW9uIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZUNvbnRyb2xsZXIiLCJhdHRhY2hMYXllckNhcmRUb1BsYXllciIsImdhbWVJbmZvIiwiZ2V0RGVmYXVsdEluZm8iLCJ0YWJsZUNvbmZpZyIsImlkIiwic3Rha2UiLCJwb3QiLCJzZXRUYWJsZSIsImNhcmRzIiwiZG9jayIsImNUYWJsZSIsInNldE51bUNhcmQiLCJqIiwiYyIsImNhcmRQcmVmYWJzIiwiZ2V0IiwiaW5zdGFudGlhdGUiLCJjQ2FyZCIsInNldENhcmQiLCJpbmRleCIsInNldE93bmVyIiwicCIsImdldFBvc2l0aW9uQ2FyZCIsImFuZ2xlIiwiTWF0aCIsInJhbmRvbSIsInNldFBvc2l0aW9uIiwiYWRkQ2hpbGQiLCJhZGRDYXJkcyIsInBsYXllcnNDb25maWciLCJrIiwicGxheWVyQ29uZmlnIiwicGxheWVyIiwiZGlzcGxheU5hbWUiLCJnb2xkIiwiYXZhdGFySW5kZXgiLCJjUGxheWVyIiwic2V0R2FtZUNvbnRyb2xsZXIiLCJzZXRQbGF5ZXIiLCJvbiIsIm9uVG91Y2hDYXJkIiwiYWN0aW9uQ29uZmlnIiwiZ2V0QWN0aW9uIiwiZGVsYXlUaW1lIiwidGltZSIsIm9uRW50ZXJUdXJuIiwic2NoZWR1bGVPbmNlIiwiZXhlY3V0ZUFjdGlvbiIsImJpbmQiLCJzdGFydCIsIm9uRW5hYmxlIiwiY29uc29sZSIsImxvZyIsImJlZm9yZUV4ZWN1dGVBY3Rpb24iLCJQQVNTIiwicGxheVNvdW5kWW91clR1cm4iLCJzZXRHcm91cEV4cGVjdHMiLCJzdWdnZXN0Iiwib25TdWdnZXN0Q2FyZCIsImF1dG9TaG93U3VnZ2VzdCIsImNhcmRFeHBlY3QiLCJfdHVybk9mZkF1dG9TdWdnZXN0Iiwib25DbG9zZVR1cm4iLCJvblBhc3NBdCIsImlzTmV3Um91bmQiLCJESVNDQVJEIiwib25EaXNjYXJkQXQiLCJncm91cCIsInNvdW5kIiwic2V0VGltZW91dCIsInBsYXlBdWRpbyIsImVtbyIsIkFycmF5IiwiX3BsYXlFbW8iLCJpc0VuZGVkIiwiaGFuZCIsInJ1bkFjdGlvbiIsIm1vdmVCeSIsIldJTiIsIm5leHQiLCJhY3Rpb25OZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsImV2ZW50IiwiZGF0YSIsImdldFVzZXJEYXRhIiwiY2FyZCIsIm93bmVyIiwiaXNNeVR1cm4iLCJpc1RvdWNoRXhwZWN0Q2FyZHMiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsImdldExvY2F0aW9uIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsInBvcyIsInkiLCJvblBsYXlOb3ciLCJvbkNUQUNsaWNrIiwib25Ub3VjaER1bXAiLCJvblRvdWNoUGFzcyIsImxlbiIsInNldExheWVyQ2FyZCIsInNwaW5lIiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJzZXRBbmltYXRpb24iLCJfcGxheUVmZmVjdEdyb3VwIiwibmFtZSIsImNsZWFyVHJhY2tzIiwidW5zY2hlZHVsZSIsIm9uUGFzcyIsIm9uTmV3Um91bmQiLCJjYXJkc09yR3JvdXAiLCJncm91cFR5cGUiLCJnZXRDYXJkcyIsInBsYXllclByZWZhYiIsImwiLCJpc0NvbnRhaW5BbGwiLCJlcnJvciIsInMiLCJvbkRpc2NhcmQiLCJlZmZlY3REaXNjYXJkIiwibnVtQ2FyZCIsImR1cmF0aW9uIiwiZHVyYXRpb24xIiwic2V0Um90YXRpb24iLCJzZXF1ZW5jZSIsInNwYXduIiwibW92ZVRvIiwicm90YXRlVG8iLCJzY2FsZVRvIiwieCIsInpJbmRleCIsIm9wYWNpdHkiLCJoaWRlIiwic2hvdyIsImZhZGVJbiIsImZhZGVPdXQiLCJjYWxsRnVuYyIsInNlbmRlciIsIkZMVVNIIiwiU1RSQUlHSFQiLCJGVUxMX0hPVVNFIiwiRk9VUl9PRl9LSU5EIiwiTk9ORSIsImdyb3VwcyIsImxHIiwiZyIsImlzQ29udGFpbkdyb3VwRXhwZWN0cyIsImxnIiwibGMiLCJnZXROZXdDYXJkIiwic2hvd05vZGVDSFBsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUEzQjs7QUFDQSxJQUFJQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLElBQUlFLEtBQUssR0FBR0YsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUcsTUFBTSxHQUFHSCxPQUFPLENBQUMsUUFBRCxDQUFw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QUE4Qzs7QUFDOUQsV0FBT0EsVUFBUDtBQUNILEdBaG1CSTtBQWltQkxpSCxFQUFBQSxRQUFRLEVBQUMsb0JBQVk7QUFDakIsV0FBTyxLQUFLdkcsUUFBTCxLQUFrQixDQUF6QjtBQUNILEdBbm1CSTtBQW9tQkx3RyxFQUFBQSxrQkFBa0IsRUFBQyw0QkFBVUgsSUFBVixFQUFnQjtBQUMvQixXQUFPLEtBQUtnRSxxQkFBTCxDQUEyQmhFLElBQTNCLENBQVA7QUFDSCxHQXRtQkk7QUF1bUJMb0UsRUFBQUEsY0FBYyxFQUFDLDBCQUFZO0FBQ3ZCLFNBQUt0TCxVQUFMLENBQWdCeUIsTUFBaEIsR0FBeUIsSUFBekI7QUFDSDtBQXptQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFBsYXlhYmxlU3RhdGUgPSByZXF1aXJlKCdQbGF5YWJsZVN0YXRlJyk7XHJcbnZhciBQb29sSGFuZGxlciA9IHJlcXVpcmUoXCJQb29sSGFuZGxlclwiKTtcclxudmFyIENDYXJkID0gcmVxdWlyZShcIkNDYXJkXCIpO1xyXG52YXIgQ1RhYmxlID0gcmVxdWlyZShcIkNUYWJsZVwiKTtcclxudmFyIENQbGF5ZXIgPSByZXF1aXJlKFwiQ1BsYXllclwiKTtcclxudmFyIHtDYXJkLFRhYmxlLFBsYXllcn0gPSByZXF1aXJlKFwiVHlwZXNcIik7XHJcbnZhciB7QWN0aW9uVHlwZSxHYW1lRmFrZSxTb3VuZFR5cGUsQ2FyZEdyb3VwfSA9IHJlcXVpcmUoXCJHYW1lRmFrZVwiKTtcclxudmFyIFBsYXlhYmxlQWRzID0gcmVxdWlyZShcIlBsYXlhYmxlQWRzXCIpO1xyXG52YXIgQ0F1ZGlvID0gcmVxdWlyZShcIkNBdWRpb1wiKTtcclxudmFyIFV0aWxpdHkgPSByZXF1aXJlKFwiVXRpbGl0eVwiKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHMgICA6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwbGF5YWJsZVN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgICAgICAgOiBQbGF5YWJsZVN0YXRlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlICAgICA6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QbGF5Tm93ICAgOiBjYy5CdXR0b24sXHJcbiAgICAgICAgYnRuRHVtcCAgICAgIDogY2MuQnV0dG9uLFxyXG4gICAgICAgIGJ0blBhc3MgICAgICA6IGNjLkJ1dHRvbixcclxuICAgICAgICBsYXllckdhbWUgICAgOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxheWVyQWN0aW9uICA6IGNjLk5vZGUsXHJcbiAgICAgICAgdGFibGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVycyAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXllckNhcmQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9kZVN1Z2dlc3RHZXN0dXJlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vZGVDSFBsYXk6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0V2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdENhcmRHcm91cDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1nSGFuZHM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5TcHJpdGVdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbW9QbGF5ZXJzOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpbY2MuTm9kZV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0hpZ2hMaWdodDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcG9vbENhcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuTm9kZVBvb2wsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9nYW1lRmFrZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTogR2FtZUZha2UsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBFeHBlY3RzID0gW107IC8vZ3JvdXAgY2FyZHNcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnRUb3VjaCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy56SW5kZXhDYXJkID0gMTA7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcG9zSGFuZHMgPSBbXTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1nSGFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9zSGFuZHMucHVzaCh0aGlzLmltZ0hhbmRzW2ldLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZUNIUGxheS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltZ0hpZ2hMaWdodC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdENhcmRHcm91cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFdpbi5nZXRDb21wb25lbnQoXCJDRWZmZWN0V2luXCIpLmdhbWVDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICB0aGlzLm5vZGVTdWdnZXN0R2VzdHVyZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF0dGFjaExheWVyQ2FyZFRvUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoQ0F1ZGlvKTtcclxuICAgICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLzEuIGtob2kgdGFvIGluZm8gYmFuIGRhdVxyXG4gICAgICAgIHRoaXMuX3Bvb2xDYXJkID0gbmV3IGNjLk5vZGVQb29sKENDYXJkKTtcclxuXHJcbiAgICAgICAgLy9yZWdpb24ga2hvaSB0YW8gYmFuIGRhdSBnYW1lXHJcbiAgICAgICAgdGhpcy5fZ2FtZUZha2UgPSBuZXcgR2FtZUZha2UoKTtcclxuICAgICAgICB2YXIgZ2FtZUluZm8gPSB0aGlzLl9nYW1lRmFrZS5nZXREZWZhdWx0SW5mbygpO1xyXG4gICAgICAgIHZhciB0YWJsZUNvbmZpZyA9IGdhbWVJbmZvLnRhYmxlO1xyXG4gICAgICAgIHZhciB0YWJsZSA9IG5ldyBUYWJsZSh0YWJsZUNvbmZpZy5pZCx0YWJsZUNvbmZpZy5zdGFrZSx0YWJsZUNvbmZpZy5wb3QpO1xyXG4gICAgICAgIHRoaXMudGFibGUuZ2V0Q29tcG9uZW50KENUYWJsZSkuc2V0VGFibGUodGFibGUpO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBuZXcgQ2FyZCBvbiBEb2NrXHJcbiAgICAgICAgdmFyIGNhcmRzID0gdGFibGVDb25maWcuZG9jaztcclxuICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICBjVGFibGUuc2V0TnVtQ2FyZChjYXJkcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBjYXJkc1tqXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkUHJlZmFicyA9IHRoaXMuX3Bvb2xDYXJkLmdldCgpO1xyXG4gICAgICAgICAgICBpZighY2FyZFByZWZhYnMpe2NhcmRQcmVmYWJzID0gY2MuaW5zdGFudGlhdGUodGhpcy5jYXJkUHJlZmFiKTt9XHJcblxyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFicy5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG5cclxuICAgICAgICAgICAgY0NhcmQuc2V0Q2FyZChjKTtcclxuICAgICAgICAgICAgY0NhcmQuaW5kZXggPSAoaik7XHJcbiAgICAgICAgICAgIGNDYXJkLnNldE93bmVyKGNUYWJsZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICBjQ2FyZC5ub2RlLmFuZ2xlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNDA7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWJzLnNldFBvc2l0aW9uKHApO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyQ2FyZC5hZGRDaGlsZChjYXJkUHJlZmFicyk7XHJcbiAgICAgICAgICAgIGNUYWJsZS5hZGRDYXJkcyhbY2FyZFByZWZhYnNdKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy91cGRhdGUgaW5mbyBhdmF0YXIgKyBsb2FkIGNhcmRcclxuICAgICAgICB2YXIgcGxheWVyc0NvbmZpZyA9IGdhbWVJbmZvLnBsYXllcnM7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGF5ZXJzQ29uZmlnLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJDb25maWcgPSBwbGF5ZXJzQ29uZmlnW2tdO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJDb25maWcuaW5kZXgscGxheWVyQ29uZmlnLmRpc3BsYXlOYW1lLHBsYXllckNvbmZpZy5nb2xkLHBsYXllckNvbmZpZy5hdmF0YXJJbmRleCxwbGF5ZXJDb25maWcuY2FyZHMpO1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1twbGF5ZXIuaW5kZXhdLmdldENvbXBvbmVudChDUGxheWVyKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRHYW1lQ29udHJvbGxlcih0aGlzKTtcclxuICAgICAgICAgICAgY1BsYXllci5zZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sb2FkIHByZWZhYiBjYXJkUHJlZmFic1xyXG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy9jYXJkUHJlZmFiXCIsIGZ1bmN0aW9uIChlcnIsIHByZWZhYikge1xyXG4gICAgICAgIC8vICAgICB2YXIgbmV3Tm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgLy8gICAgIG5ld05vZGUuc2V0UG9zaXRpb24oMTAwLDEwMCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vICAgICAvLyBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgIC8vIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy9lbmRyZWdpb24ga2hvaSB0YW8gYmFuIGRhdSBnYW1lXHJcblxyXG4gICAgICAgIC8vcmVnaW9uIGFkZCBldmVudCB0b3VjaCBjYXJkXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwiY2FyZC10b3VjaFwiLHRoaXMub25Ub3VjaENhcmQsdGhpcyk7XHJcbiAgICAgICAgLy9lbmRyZWdpb24gYWRkIGV2ZW50IHRvdWNoIGNhcmRcclxuXHJcbiAgICAgICAgLy9yZWdpb24gZXhlY3V0ZSBhY3Rpb24gbnVtYmVyIDFcclxuICAgICAgICAvL2VudGVyIHR1cm4gKyBleGVjdXRlIGFjdGlvblxyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uQ29uZmlnLnRpbWU7XHJcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICB0aGlzLm9uRW50ZXJUdXJuKGFjdGlvbkNvbmZpZy5pbmRleCk7XHJcbiAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGRlbGF5VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZW5kcmVnaW9uIGV4ZWN1dGUgYWN0aW9uIG51bWJlciAxXHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5lZmZlY3RXaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9LmJpbmQodGhpcyksMjAwMCk7XHJcbiAgICB9LFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW5hYmxlIHBsYXllcnM6XCIgKyB0aGlzLnBsYXllcnMubGVuZ3RoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmVmb3JlRXhlY3V0ZUFjdGlvbjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuICAgICAgICB2YXIgaW5kZXggPSBhY3Rpb25Db25maWcuaW5kZXg7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IDAgKXtcclxuICAgICAgICAgICAgaWYoYWN0aW9uQ29uZmlnLnR5cGUgPT09IEFjdGlvblR5cGUuUEFTUyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlTb3VuZFlvdXJUdXJuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0R3JvdXBFeHBlY3RzKGFjdGlvbkNvbmZpZy5jYXJkcyk7XHJcbiAgICAgICAgICAgIGlmKGFjdGlvbkNvbmZpZy5zdWdnZXN0KXsvL25ldSBjbyBzdWdnZXN0XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJzaG93IHN1Z2dlc3RcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVTdWdnZXN0R2VzdHVyZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzWzBdLmdldENvbXBvbmVudChDUGxheWVyKS5vblN1Z2dlc3RDYXJkKHRoaXMuZ3JvdXBFeHBlY3RzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmF1dG9TaG93U3VnZ2VzdCwzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG5cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2FyZEV4cGVjdCB7Q2FyZH0gY2FyZCBtb25nIG11b24gZGFuaFxyXG4gICAgICovXHJcbiAgICBleGVjdXRlQWN0aW9uOmZ1bmN0aW9uKGNhcmRFeHBlY3Qpe1xyXG4gICAgICAgIC8vMS4gdHVybiBvZmYgdmllYyBzdWdnZXN0XHJcbiAgICAgICAgLy8yLiBjbG9zZSB0dXJuXHJcbiAgICAgICAgLy8zLiBkaXNjYXJkIHwgcGFzc1xyXG4gICAgICAgIC8vNC4gcGxheSBzb3VuZFxyXG4gICAgICAgIC8vNS4gcGxheSBlbW9cclxuICAgICAgICAvLzYuIGNoZWNrIGVuZGVkIGdhbWVcclxuICAgICAgICAvLzcuIG5leHQgYWN0aW9ufG5leHQgdHVyblxyXG5cclxuICAgICAgICAvLzEuIHR1cm4gb2ZmIHZpZWMgc3VnZ2VzdFxyXG4gICAgICAgIHRoaXMuX3R1cm5PZmZBdXRvU3VnZ2VzdCgpO1xyXG5cclxuICAgICAgICB2YXIgYWN0aW9uQ29uZmlnID0gdGhpcy5fZ2FtZUZha2UuZ2V0QWN0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vMi4gY2xvc2UgdHVyblxyXG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICB0aGlzLm9uQ2xvc2VUdXJuKGluZGV4KTtcclxuXHJcbiAgICAgICAgLy8zLiBkaXNjYXJkIHwgcGFzc1xyXG4gICAgICAgIHZhciB0eXBlID0gYWN0aW9uQ29uZmlnLnR5cGU7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aW9uVHlwZS5QQVNTOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhc3NBdChpbmRleCxhY3Rpb25Db25maWcuaXNOZXdSb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlLkRJU0NBUkQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGlzY2FyZEF0KGluZGV4LGFjdGlvbkNvbmZpZy5jYXJkcyxhY3Rpb25Db25maWcuZ3JvdXAsY2FyZEV4cGVjdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vNC4gcGxheSBzb3VuZFxyXG4gICAgICAgIHZhciBzb3VuZCA9IGFjdGlvbkNvbmZpZy5zb3VuZDtcclxuICAgICAgICBpZihzb3VuZCl7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QXVkaW8oc291bmQpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksNTAwKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLzUuIHBsYXkgZW1vXHJcbiAgICAgICAgdmFyIGVtbyA9IGFjdGlvbkNvbmZpZy5lbW87XHJcbiAgICAgICAgaWYoZW1vICE9IG51bGwpe1xyXG4gICAgICAgICAgICBpZihlbW8gaW5zdGFuY2VvZiBBcnJheSl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGVtby5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheUVtbyhpKTtcclxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyxlbW9ba10pLGsgICogMjAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVtbyhlbW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLzYuIGNoZWNrIGVuZGVkIGdhbWVcclxuICAgICAgICBpZihhY3Rpb25Db25maWcuaXNFbmRlZCl7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmltZ0hhbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmQgPSB0aGlzLmltZ0hhbmRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmQubm9kZS5ydW5BY3Rpb24oY2MubW92ZUJ5KDAuNSwwLC0zMDApKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLDEwMDApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheUF1ZGlvKFNvdW5kVHlwZS5XSU4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RXaW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLDI1MDApO1xyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgLy83LiBuZXh0IGFjdGlvbnxuZXh0IHR1cm5cclxuICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IGFjdGlvbkNvbmZpZy5uZXh0O1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uTmV4dCA9IHRoaXMuX2dhbWVGYWtlLm5leHQoKTtcclxuICAgICAgICAgICAgaWYoYWN0aW9uTmV4dCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJUdXJuKGFjdGlvbk5leHQuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhY3Rpb25OZXh0OlwiICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uTmV4dCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbGF5VGltZSA9IGFjdGlvbk5leHQudGltZTtcclxuICAgICAgICAgICAgICAgIGlmKGRlbGF5VGltZT4wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlRXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxkZWxheVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uVG91Y2hDYXJkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZGF0YSA9IGV2ZW50LmdldFVzZXJEYXRhKCk7XHJcbiAgICAgICAgdmFyIGNDYXJkID0gZGF0YS5jYXJkO1xyXG4gICAgICAgIHZhciBvd25lciA9IGNDYXJkLm93bmVyO1xyXG4gICAgICAgIGlmKG93bmVyIGluc3RhbmNlb2YgQ1RhYmxlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXNzaW5nIGNhcmQgb24gdGFibGVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3duZXIgaW5zdGFuY2VvZiBDUGxheWVyKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc015VHVybigpKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNUb3VjaEV4cGVjdENhcmRzKGNDYXJkLmNhcmQpKXtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50VG91Y2ggPSBkYXRhLmV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhcnRQb2ludFRvdWNoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gZGF0YS5ldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBvcy55IC0gdGhpcy5zdGFydFBvaW50VG91Y2gueSA+IDQ1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlQWN0aW9uKGNDYXJkLmNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJEaXNjYXJkIG9uIG15IHR1cm46XCIgKyBjQ2FyZC5jYXJkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiISFEaXNjYXJkIG9uIG15IHR1cm5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwidG91Y2g6XCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXJ0UG9pbnRUb3VjaCkgK1wifCBcIisgSlNPTi5zdHJpbmdpZnkocG9zKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm5vdCBleHBlY3RzIGNhcmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwibm90IG15IHR1cm5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3duZXIub25Ub3VjaENhcmQoZGF0YS5ldmVudCxkYXRhLmNhcmQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Ub3VjaENhcmQgYXQgY29udHJvbGVyXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblBsYXlOb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUGxheSBwYXRoIG1haW5cIik7XHJcbiAgICAgICAgUGxheWFibGVBZHMub25DVEFDbGljaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRvdWNoRHVtcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggRHVtcFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaFBhc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRvdWNoIFBhc3NcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIGF0dGFjaExheWVyQ2FyZFRvUGxheWVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMucGxheWVycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1tpXS5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpO1xyXG4gICAgICAgICAgICBjUGxheWVyLnNldExheWVyQ2FyZCh0aGlzLmxheWVyQ2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uRW50ZXJUdXJuOmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uRW50ZXJUdXJuOiBcIiArIGluZGV4KTtcclxuICAgICAgICB2YXIgY1BsYXllciA9IHRoaXMucGxheWVyc1tpbmRleF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgIGNQbGF5ZXIub25FbnRlclR1cm4oKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlVHVybjpmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgdmFyIHBsYXllciA9IHRoaXMucGxheWVyc1tpbmRleF07XHJcbiAgICAgICAgaWYocGxheWVyKXtcclxuICAgICAgICAgICAgdmFyIGNQbGF5ZXIgPSBwbGF5ZXIuZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgY1BsYXllci5vbkNsb3NlVHVybigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibWlzc2luZyBwbGF5ZXIgb3IgQ1BsYXllciBhdCBpbmRleDpcIiArIGluZGV4KTtcclxuICAgIH0sXHJcbiAgICBhdXRvU2hvd1N1Z2dlc3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGVTdWdnZXN0R2VzdHVyZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIF9wbGF5RW1vOmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICB2YXIgZW1vID0gdGhpcy5lbW9QbGF5ZXJzW2luZGV4XTtcclxuICAgICAgICBpZihlbW8pe1xyXG4gICAgICAgICAgICB2YXIgc3BpbmUgPSBlbW8uZ2V0Q29tcG9uZW50KCdzcC5Ta2VsZXRvbicpO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRTdGFydExpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIHN0YXJ0LlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0SW50ZXJydXB0TGlzdGVuZXIoZnVuY3Rpb24gKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGludGVycnVwdC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldEVuZExpc3RlbmVyKGZ1bmN0aW9uICh0cmFja0VudHJ5KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBlbmQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXREaXNwb3NlTGlzdGVuZXIoZnVuY3Rpb24gKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIHdpbGwgYmUgZGlzcG9zZWQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gaWYgKGFuaW1hdGlvbk5hbWUgPT09ICdzaG9vdCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIC8vICAgICB0aGlzLnNwaW5lLmNsZWFyVHJhY2soMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgbG9vcENvdW50ID0gTWF0aC5mbG9vcih0cmFja0VudHJ5LnRyYWNrVGltZSAvIHRyYWNrRW50cnkuYW5pbWF0aW9uRW5kKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBjb21wbGV0ZTogJXNcIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lLCBsb29wQ291bnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0RXZlbnRMaXN0ZW5lcihmdW5jdGlvbih0cmFja0VudHJ5LCBldmVudCl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gZXZlbnQ6ICVzLCAlcywgJXMsICVzXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSwgZXZlbnQuZGF0YS5uYW1lLCBldmVudC5pbnRWYWx1ZSwgZXZlbnQuZmxvYXRWYWx1ZSwgZXZlbnQuc3RyaW5nVmFsdWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlbW8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNwaW5lLnNldEFuaW1hdGlvbigwLCAnYW5pbWF0aW9uJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9LDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfcGxheUVmZmVjdEdyb3VwOmZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX3BsYXlFZmZlY3RHcm91cDpcIiArIG5hbWUpO1xyXG4gICAgICAgIHZhciBlbW8gPSB0aGlzLmVmZmVjdENhcmRHcm91cDtcclxuICAgICAgICBpZihlbW8pe1xyXG4gICAgICAgICAgICB2YXIgc3BpbmUgPSBlbW8uZ2V0Q29tcG9uZW50KCdzcC5Ta2VsZXRvbicpO1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAgICAgc3BpbmUuY2xlYXJUcmFja3MoKTtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyBpZiAoYW5pbWF0aW9uTmFtZSA9PT0gJ3Nob290Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gICAgIHRoaXMuc3BpbmUuY2xlYXJUcmFjaygxKTtcclxuICAgICAgICAgICAgICAgIC8vIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHZhciBsb29wQ291bnQgPSBNYXRoLmZsb29yKHRyYWNrRW50cnkudHJhY2tUaW1lIC8gdHJhY2tFbnRyeS5hbmltYXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGNvbXBsZXRlOiAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGxvb3BDb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsIG5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSw1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfdHVybk9mZkF1dG9TdWdnZXN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuYXV0b1Nob3dTdWdnZXN0KTtcclxuICAgICAgICB0aGlzLm5vZGVTdWdnZXN0R2VzdHVyZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBvblBhc3NBdDpmdW5jdGlvbihpbmRleCxpc05ld1JvdW5kKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uUGFzc0F0OlwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vblBhc3MoKTtcclxuICAgICAgICBpZihpc05ld1JvdW5kKXtcclxuICAgICAgICAgICAgdmFyIGNUYWJsZSA9IHRoaXMudGFibGUuZ2V0Q29tcG9uZW50KENUYWJsZSk7XHJcbiAgICAgICAgICAgIGNUYWJsZS5vbk5ld1JvdW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uRGlzY2FyZEF0OmZ1bmN0aW9uKGluZGV4LGNhcmRzT3JHcm91cCxncm91cFR5cGUsY2FyZEV4cGVjdCl7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q2FyZHMoY2FyZHNPckdyb3VwLGNhcmRFeHBlY3QscGxheWVyUHJlZmFiKXtcclxuICAgICAgICAgICAgY2MubG9nKFwiZ2V0Q2FyZHNEaWNhcmQ6IFwiICsgaW5kZXggK1wifFwiICsgY2FyZEV4cGVjdCk7XHJcbiAgICAgICAgICAgIHZhciBsID0gY2FyZHNPckdyb3VwLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYobCA+IDApe1xyXG4gICAgICAgICAgICAgICAgaWYoY2FyZHNPckdyb3VwWzBdIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJkcyA9IGNhcmRzT3JHcm91cFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiaXNncm91cDpcIiArIGNhcmRFeHBlY3QgK1wifFwiICsgY2FyZHNbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FyZHNbal0uaWQgPT09IGNhcmRFeHBlY3QuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgeGVtIGNvIGZ1bGwgY2FyZCB0cm9uZyBwbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjUGxheWVyID0gcGxheWVyUHJlZmFiLmdldENvbXBvbmVudChDUGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY1BsYXllci5pc0NvbnRhaW5BbGwoY2FyZHMpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJkcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIm5vdCBmb3VuZCBjYXJkIGluIGdyb3VwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJkc09yR3JvdXBbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNhcmRzT3JHcm91cDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBsYXllclByZWZhYiA9IHRoaXMucGxheWVyc1tpbmRleF07XHJcbiAgICAgICAgdmFyIGNhcmRzID0gZ2V0Q2FyZHMoY2FyZHNPckdyb3VwLGNhcmRFeHBlY3QscGxheWVyUHJlZmFiKTtcclxuICAgICAgICB2YXIgcyA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcyArPSBcIiBcIisgY2FyZHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25EaXNjYXJkQXQ6XCIgKyBpbmRleCArXCJ8XCIrIGNhcmRFeHBlY3QgKyBcInxcIisgcyk7XHJcbiAgICAgICAgdmFyIGNUYWJsZSA9IHRoaXMudGFibGUuZ2V0Q29tcG9uZW50KENUYWJsZSk7XHJcbiAgICAgICAgdmFyIGNhcmRQcmVmYWJzID0gcGxheWVyUHJlZmFiLmdldENvbXBvbmVudChDUGxheWVyKS5vbkRpc2NhcmQoY2FyZHMpO1xyXG5cclxuICAgICAgICB2YXIgZWZmZWN0RGlzY2FyZCA9IGZ1bmN0aW9uIChjYXJkUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIC8vMS4gbW92ZSBkZW4gZG9jayAtPiB4b2F5IGxhaSAwIGRvIC0+IG5heSBiYXQgcmEgcmEgMSB0aVxyXG4gICAgICAgICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFiLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSBjVGFibGUubnVtQ2FyZDtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gY0NhcmQuaW5kZXg7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSAwLjM7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbjEgPSAwLjE1O1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFiLnNldFJvdGF0aW9uKDMzMCwwLDApO1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFiLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbixwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5yb3RhdGVUbyhkdXJhdGlvbiwwKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbyhkdXJhdGlvbi8yLDEuMSwxLjEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uLzIsMC44NSwwLjg1KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uMSwwLjkwLDAuOTApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbjEscC54KyAoTWF0aC5yYW5kb20oKSAqIDMwICogKGluZGV4IC0gKGxlbi0xKS8yKSkscC55ICsgKE1hdGgucmFuZG9tKCkgKiAyMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKGR1cmF0aW9uMSwgKGluZGV4IC0gKGxlbiAtIDEpLzIpICogTWF0aC5yYW5kb20oKSAqIDgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGxlbiA9IGNhcmRQcmVmYWJzLmxlbmd0aDtcclxuICAgICAgICBjVGFibGUuc2V0TnVtQ2FyZChsZW4pO1xyXG5cclxuICAgICAgICBjYy5sb2coXCJpbWdIaWdoTGlnaHQ6XCIgICsgdGhpcy56SW5kZXhDYXJkKTtcclxuICAgICAgICB0aGlzLmltZ0hpZ2hMaWdodC56SW5kZXggPSArK3RoaXMuekluZGV4Q2FyZDtcclxuICAgICAgICB0aGlzLmltZ0hpZ2hMaWdodC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC40KSxcclxuICAgICAgICAgICAgY2Muc2hvdygpLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4yLDEuMiwxLjIpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMilcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsMSwxKSxcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICBjYy5mYWRlT3V0KDAuMyksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgIHNlbmRlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSx0aGlzKVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGxlbjsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkUHJlZmFiID0gY2FyZFByZWZhYnNba107XHJcbiAgICAgICAgICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWIuZ2V0Q29tcG9uZW50KENDYXJkKTtcclxuICAgICAgICAgICAgY0NhcmQuaW5kZXggPSAoayk7XHJcbiAgICAgICAgICAgIGNDYXJkLm93bmVyID0gY1RhYmxlO1xyXG4gICAgICAgICAgICBjYXJkUHJlZmFiLnpJbmRleCA9ICsrIHRoaXMuekluZGV4Q2FyZDtcclxuICAgICAgICAgICAgY2MubG9nKFwiY2FyZFByZWZhYjpcIiAgKyB0aGlzLnpJbmRleENhcmQpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0RGlzY2FyZChjYXJkUHJlZmFiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIC8vIGNhcmRQcmVmYWIucnVuQWN0aW9uKGNjLnNwYXduKFxyXG4gICAgICAgICAgICAvLyAgICAgY2MubW92ZVRvKDAuMTUscCksXHJcbiAgICAgICAgICAgIC8vICAgICBjYy5yb3RhdGVUbygxLDApXHJcbiAgICAgICAgICAgIC8vICkpO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coXCJuZXdaSW5kZXg6XCIgKyB0aGlzLnpJbmRleENhcmQpO1xyXG5cclxuICAgICAgICAgICAgLy9kdW9jIGFkZCBraGkgdGFvIHJhXHJcbiAgICAgICAgICAgIC8vIHRoaXMubGF5ZXJHYW1lLmFkZENoaWxkKGNhcmRQcmVmYWIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjVGFibGUuYWRkQ2FyZHMoY2FyZFByZWZhYnMpO1xyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChncm91cFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRkxVU0g6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ2ZsdXNoJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ3N0cmFpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRlVMTF9IT1VTRTpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnZnVsbGhvdXNlJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuRk9VUl9PRl9LSU5EOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVmZmVjdEdyb3VwKCdmb3JvZmFraW5kJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDYXJkR3JvdXAuTk9ORTpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IgKHZhciBqID0gMDsgaiA8IGNhcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBjID0gY2FyZHNbal07XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgdmFyIGNhcmRQcmVmYWJzID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgIGlmKCFjYXJkUHJlZmFicyl7Y2FyZFByZWZhYnMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgY0NhcmQgPSBjYXJkUHJlZmFicy5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGNDYXJkLnNldENhcmQoYyk7XHJcbiAgICAgICAgLy8gICAgIGNDYXJkLmluZGV4ID0gKGopO1xyXG4gICAgICAgIC8vICAgICBjQ2FyZC5vd25lciA9IGNUYWJsZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgcCA9IGNUYWJsZS5nZXRQb3NpdGlvbkNhcmQoY0NhcmQpO1xyXG4gICAgICAgIC8vICAgICBjYXJkUHJlZmFicy5zZXRQb3NpdGlvbihwKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQoY2FyZFByZWZhYnMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0R3JvdXBFeHBlY3RzOmZ1bmN0aW9uKGNhcmRzKXtcclxuICAgICAgICB2YXIgZ3JvdXBzID0gW107XHJcbiAgICAgICAgdmFyIGxHID0gY2FyZHMubGVuZ3RoO1xyXG4gICAgICAgIGlmKGxHID4gMCkge1xyXG4gICAgICAgICAgICBpZihjYXJkc1swXSBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGcgPSAwOyBnIDwgbEc7IGcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGNhcmRzW2ddKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGNhcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgZ3JvdXBzLnB1c2goY2FyZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VwRXhwZWN0cyA9IGdyb3VwcztcclxuICAgIH0sXHJcbiAgICBpc0NvbnRhaW5Hcm91cEV4cGVjdHM6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIGxnID0gdGhpcy5ncm91cEV4cGVjdHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGc7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2FyZHMgPSB0aGlzLmdyb3VwRXhwZWN0c1tpXTtcclxuICAgICAgICAgICAgdmFyIGxjID0gY2FyZHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxjOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGNhcmRzW2pdLmlkID09PSBjYXJkLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgZ2V0TmV3Q2FyZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjYXJkUHJlZmFiID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgaWYoIWNhcmRQcmVmYWIpe2NhcmRQcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuICAgICAgICByZXR1cm4gY2FyZFByZWZhYjtcclxuICAgIH0sXHJcbiAgICBpc015VHVybjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VySW5kZXggPT09IDA7XHJcbiAgICB9LFxyXG4gICAgaXNUb3VjaEV4cGVjdENhcmRzOmZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDb250YWluR3JvdXBFeHBlY3RzKGNhcmQpO1xyXG4gICAgfSxcclxuICAgIHNob3dOb2RlQ0hQbGF5OmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGVDSFBsYXkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxufSk7Il19