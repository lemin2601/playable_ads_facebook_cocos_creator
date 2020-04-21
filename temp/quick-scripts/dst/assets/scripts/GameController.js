
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
    // cc.director.setDisplayStats(false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiUGxheWFibGVTdGF0ZSIsInJlcXVpcmUiLCJQb29sSGFuZGxlciIsIkNDYXJkIiwiQ1RhYmxlIiwiQ1BsYXllciIsIkNhcmQiLCJUYWJsZSIsIlBsYXllciIsIkFjdGlvblR5cGUiLCJHYW1lRmFrZSIsIlNvdW5kVHlwZSIsIkNhcmRHcm91cCIsIlBsYXlhYmxlQWRzIiwiQ0F1ZGlvIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWFibGVTdGF0ZSIsInR5cGUiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImJ0bkR1bXAiLCJidG5QYXNzIiwibGF5ZXJHYW1lIiwiTm9kZSIsImxheWVyQWN0aW9uIiwidGFibGUiLCJwbGF5ZXJzIiwibGF5ZXJDYXJkIiwibm9kZVN1Z2dlc3RHZXN0dXJlIiwibm9kZUNIUGxheSIsImVmZmVjdFdpbiIsImVmZmVjdENhcmRHcm91cCIsImNhcmRQcmVmYWIiLCJQcmVmYWIiLCJpbWdIYW5kcyIsIlNwcml0ZSIsImVtb1BsYXllcnMiLCJpbWdIaWdoTGlnaHQiLCJfcG9vbENhcmQiLCJOb2RlUG9vbCIsIl9nYW1lRmFrZSIsImN0b3IiLCJjdXJJbmRleCIsImdyb3VwRXhwZWN0cyIsInN0YXJ0UG9pbnRUb3VjaCIsInpJbmRleENhcmQiLCJhdWRpbyIsIl9wb3NIYW5kcyIsIm9uTG9hZCIsImkiLCJsZW5ndGgiLCJwdXNoIiwibm9kZSIsImdldFBvc2l0aW9uIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZUNvbnRyb2xsZXIiLCJhdHRhY2hMYXllckNhcmRUb1BsYXllciIsImdhbWVJbmZvIiwiZ2V0RGVmYXVsdEluZm8iLCJ0YWJsZUNvbmZpZyIsImlkIiwic3Rha2UiLCJwb3QiLCJzZXRUYWJsZSIsImNhcmRzIiwiZG9jayIsImNUYWJsZSIsInNldE51bUNhcmQiLCJqIiwiYyIsImNhcmRQcmVmYWJzIiwiZ2V0IiwiaW5zdGFudGlhdGUiLCJjQ2FyZCIsInNldENhcmQiLCJpbmRleCIsInNldE93bmVyIiwicCIsImdldFBvc2l0aW9uQ2FyZCIsImFuZ2xlIiwiTWF0aCIsInJhbmRvbSIsInNldFBvc2l0aW9uIiwiYWRkQ2hpbGQiLCJhZGRDYXJkcyIsInBsYXllcnNDb25maWciLCJrIiwicGxheWVyQ29uZmlnIiwicGxheWVyIiwiZGlzcGxheU5hbWUiLCJnb2xkIiwiYXZhdGFySW5kZXgiLCJjUGxheWVyIiwic2V0R2FtZUNvbnRyb2xsZXIiLCJzZXRQbGF5ZXIiLCJvbiIsIm9uVG91Y2hDYXJkIiwiYWN0aW9uQ29uZmlnIiwiZ2V0QWN0aW9uIiwiZGVsYXlUaW1lIiwidGltZSIsIm9uRW50ZXJUdXJuIiwic2NoZWR1bGVPbmNlIiwiZXhlY3V0ZUFjdGlvbiIsImJpbmQiLCJzdGFydCIsIm9uRW5hYmxlIiwiY29uc29sZSIsImxvZyIsImJlZm9yZUV4ZWN1dGVBY3Rpb24iLCJQQVNTIiwicGxheVNvdW5kWW91clR1cm4iLCJzZXRHcm91cEV4cGVjdHMiLCJzdWdnZXN0Iiwib25TdWdnZXN0Q2FyZCIsImF1dG9TaG93U3VnZ2VzdCIsImNhcmRFeHBlY3QiLCJfdHVybk9mZkF1dG9TdWdnZXN0Iiwib25DbG9zZVR1cm4iLCJvblBhc3NBdCIsImlzTmV3Um91bmQiLCJESVNDQVJEIiwib25EaXNjYXJkQXQiLCJncm91cCIsInNvdW5kIiwic2V0VGltZW91dCIsInBsYXlBdWRpbyIsImVtbyIsIkFycmF5IiwiX3BsYXlFbW8iLCJpc0VuZGVkIiwiaGFuZCIsInJ1bkFjdGlvbiIsIm1vdmVCeSIsIldJTiIsIm5leHQiLCJhY3Rpb25OZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsImV2ZW50IiwiZGF0YSIsImdldFVzZXJEYXRhIiwiY2FyZCIsIm93bmVyIiwiaXNNeVR1cm4iLCJpc1RvdWNoRXhwZWN0Q2FyZHMiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsImdldExvY2F0aW9uIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsInBvcyIsInkiLCJvblBsYXlOb3ciLCJvbkNUQUNsaWNrIiwib25Ub3VjaER1bXAiLCJvblRvdWNoUGFzcyIsImxlbiIsInNldExheWVyQ2FyZCIsInNwaW5lIiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJzZXRBbmltYXRpb24iLCJfcGxheUVmZmVjdEdyb3VwIiwibmFtZSIsImNsZWFyVHJhY2tzIiwidW5zY2hlZHVsZSIsIm9uUGFzcyIsIm9uTmV3Um91bmQiLCJjYXJkc09yR3JvdXAiLCJncm91cFR5cGUiLCJnZXRDYXJkcyIsInBsYXllclByZWZhYiIsImwiLCJpc0NvbnRhaW5BbGwiLCJlcnJvciIsInMiLCJvbkRpc2NhcmQiLCJlZmZlY3REaXNjYXJkIiwibnVtQ2FyZCIsImR1cmF0aW9uIiwiZHVyYXRpb24xIiwic2V0Um90YXRpb24iLCJzZXF1ZW5jZSIsInNwYXduIiwibW92ZVRvIiwicm90YXRlVG8iLCJzY2FsZVRvIiwieCIsInpJbmRleCIsIm9wYWNpdHkiLCJoaWRlIiwic2hvdyIsImZhZGVJbiIsImZhZGVPdXQiLCJjYWxsRnVuYyIsInNlbmRlciIsIkZMVVNIIiwiU1RSQUlHSFQiLCJGVUxMX0hPVVNFIiwiRk9VUl9PRl9LSU5EIiwiTk9ORSIsImdyb3VwcyIsImxHIiwiZyIsImlzQ29udGFpbkdyb3VwRXhwZWN0cyIsImxnIiwibGMiLCJnZXROZXdDYXJkIiwic2hvd05vZGVDSFBsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsYUFBYSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUEzQjs7QUFDQSxJQUFJQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLElBQUlFLEtBQUssR0FBR0YsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBQ0EsSUFBSUcsTUFBTSxHQUFHSCxPQUFPLENBQUMsUUFBRCxDQUFw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Q0FBYjtBQUE4Qzs7QUFDOUQsV0FBT0EsVUFBUDtBQUNILEdBam1CSTtBQWttQkxpSCxFQUFBQSxRQUFRLEVBQUMsb0JBQVk7QUFDakIsV0FBTyxLQUFLdkcsUUFBTCxLQUFrQixDQUF6QjtBQUNILEdBcG1CSTtBQXFtQkx3RyxFQUFBQSxrQkFBa0IsRUFBQyw0QkFBVUgsSUFBVixFQUFnQjtBQUMvQixXQUFPLEtBQUtnRSxxQkFBTCxDQUEyQmhFLElBQTNCLENBQVA7QUFDSCxHQXZtQkk7QUF3bUJMb0UsRUFBQUEsY0FBYyxFQUFDLDBCQUFZO0FBQ3ZCLFNBQUt0TCxVQUFMLENBQWdCeUIsTUFBaEIsR0FBeUIsSUFBekI7QUFDSDtBQTFtQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFBsYXlhYmxlU3RhdGUgPSByZXF1aXJlKCdQbGF5YWJsZVN0YXRlJyk7XHJcbnZhciBQb29sSGFuZGxlciA9IHJlcXVpcmUoXCJQb29sSGFuZGxlclwiKTtcclxudmFyIENDYXJkID0gcmVxdWlyZShcIkNDYXJkXCIpO1xyXG52YXIgQ1RhYmxlID0gcmVxdWlyZShcIkNUYWJsZVwiKTtcclxudmFyIENQbGF5ZXIgPSByZXF1aXJlKFwiQ1BsYXllclwiKTtcclxudmFyIHtDYXJkLFRhYmxlLFBsYXllcn0gPSByZXF1aXJlKFwiVHlwZXNcIik7XHJcbnZhciB7QWN0aW9uVHlwZSxHYW1lRmFrZSxTb3VuZFR5cGUsQ2FyZEdyb3VwfSA9IHJlcXVpcmUoXCJHYW1lRmFrZVwiKTtcclxudmFyIFBsYXlhYmxlQWRzID0gcmVxdWlyZShcIlBsYXlhYmxlQWRzXCIpO1xyXG52YXIgQ0F1ZGlvID0gcmVxdWlyZShcIkNBdWRpb1wiKTtcclxudmFyIFV0aWxpdHkgPSByZXF1aXJlKFwiVXRpbGl0eVwiKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHMgICA6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwbGF5YWJsZVN0YXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgICAgICAgOiBQbGF5YWJsZVN0YXRlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlICAgICA6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QbGF5Tm93ICAgOiBjYy5CdXR0b24sXHJcbiAgICAgICAgYnRuRHVtcCAgICAgIDogY2MuQnV0dG9uLFxyXG4gICAgICAgIGJ0blBhc3MgICAgICA6IGNjLkJ1dHRvbixcclxuICAgICAgICBsYXllckdhbWUgICAgOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxheWVyQWN0aW9uICA6IGNjLk5vZGUsXHJcbiAgICAgICAgdGFibGU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVycyAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXllckNhcmQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9kZVN1Z2dlc3RHZXN0dXJlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vZGVDSFBsYXk6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWZmZWN0V2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVmZmVjdENhcmRHcm91cDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkUHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1nSGFuZHM6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5TcHJpdGVdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbW9QbGF5ZXJzOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpbY2MuTm9kZV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0hpZ2hMaWdodDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcG9vbENhcmQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuTm9kZVBvb2wsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9nYW1lRmFrZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTogR2FtZUZha2UsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBFeHBlY3RzID0gW107IC8vZ3JvdXAgY2FyZHNcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnRUb3VjaCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy56SW5kZXhDYXJkID0gMTA7XHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcG9zSGFuZHMgPSBbXTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5zZXREaXNwbGF5U3RhdHMoZmFsc2UpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbWdIYW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3NIYW5kcy5wdXNoKHRoaXMuaW1nSGFuZHNbaV0ubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlQ0hQbGF5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0Q2FyZEdyb3VwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0V2luLmdldENvbXBvbmVudChcIkNFZmZlY3RXaW5cIikuZ2FtZUNvbnRyb2xsZXIgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChDQXVkaW8pO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0V2luLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vMS4ga2hvaSB0YW8gaW5mbyBiYW4gZGF1XHJcbiAgICAgICAgdGhpcy5fcG9vbENhcmQgPSBuZXcgY2MuTm9kZVBvb2woQ0NhcmQpO1xyXG5cclxuICAgICAgICAvL3JlZ2lvbiBraG9pIHRhbyBiYW4gZGF1IGdhbWVcclxuICAgICAgICB0aGlzLl9nYW1lRmFrZSA9IG5ldyBHYW1lRmFrZSgpO1xyXG4gICAgICAgIHZhciBnYW1lSW5mbyA9IHRoaXMuX2dhbWVGYWtlLmdldERlZmF1bHRJbmZvKCk7XHJcbiAgICAgICAgdmFyIHRhYmxlQ29uZmlnID0gZ2FtZUluZm8udGFibGU7XHJcbiAgICAgICAgdmFyIHRhYmxlID0gbmV3IFRhYmxlKHRhYmxlQ29uZmlnLmlkLHRhYmxlQ29uZmlnLnN0YWtlLHRhYmxlQ29uZmlnLnBvdCk7XHJcbiAgICAgICAgdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKS5zZXRUYWJsZSh0YWJsZSk7XHJcblxyXG4gICAgICAgIC8vY3JlYXRlIG5ldyBDYXJkIG9uIERvY2tcclxuICAgICAgICB2YXIgY2FyZHMgPSB0YWJsZUNvbmZpZy5kb2NrO1xyXG4gICAgICAgIHZhciBjVGFibGUgPSB0aGlzLnRhYmxlLmdldENvbXBvbmVudChDVGFibGUpO1xyXG4gICAgICAgIGNUYWJsZS5zZXROdW1DYXJkKGNhcmRzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgYyA9IGNhcmRzW2pdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRQcmVmYWJzID0gdGhpcy5fcG9vbENhcmQuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmKCFjYXJkUHJlZmFicyl7Y2FyZFByZWZhYnMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO31cclxuXHJcbiAgICAgICAgICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWJzLmdldENvbXBvbmVudChDQ2FyZCk7XHJcblxyXG4gICAgICAgICAgICBjQ2FyZC5zZXRDYXJkKGMpO1xyXG4gICAgICAgICAgICBjQ2FyZC5pbmRleCA9IChqKTtcclxuICAgICAgICAgICAgY0NhcmQuc2V0T3duZXIoY1RhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIGNDYXJkLm5vZGUuYW5nbGUgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA0MDtcclxuICAgICAgICAgICAgY2FyZFByZWZhYnMuc2V0UG9zaXRpb24ocCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJDYXJkLmFkZENoaWxkKGNhcmRQcmVmYWJzKTtcclxuICAgICAgICAgICAgY1RhYmxlLmFkZENhcmRzKFtjYXJkUHJlZmFic10pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MubG9nKFwib25FbmFibGUgcGxheWVyczpcIiArIHRoaXMucGxheWVycy5sZW5ndGgpO1xyXG5cclxuICAgICAgICAvL3VwZGF0ZSBpbmZvIGF2YXRhciArIGxvYWQgY2FyZFxyXG4gICAgICAgIHZhciBwbGF5ZXJzQ29uZmlnID0gZ2FtZUluZm8ucGxheWVycztcclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBsYXllcnNDb25maWcubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllckNvbmZpZyA9IHBsYXllcnNDb25maWdba107XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllckNvbmZpZy5pbmRleCxwbGF5ZXJDb25maWcuZGlzcGxheU5hbWUscGxheWVyQ29uZmlnLmdvbGQscGxheWVyQ29uZmlnLmF2YXRhckluZGV4LHBsYXllckNvbmZpZy5jYXJkcyk7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW3BsYXllci5pbmRleF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgICAgICBjUGxheWVyLnNldEdhbWVDb250cm9sbGVyKHRoaXMpO1xyXG4gICAgICAgICAgICBjUGxheWVyLnNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xvYWQgcHJlZmFiIGNhcmRQcmVmYWJzXHJcbiAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoXCJwcmVmYWJzL2NhcmRQcmVmYWJcIiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAvLyAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbigxMDAsMTAwKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgLy8gICAgIC8vIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQobmV3Tm9kZSk7XHJcbiAgICAgICAgLy8gfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvL2VuZHJlZ2lvbiBraG9pIHRhbyBiYW4gZGF1IGdhbWVcclxuXHJcbiAgICAgICAgLy9yZWdpb24gYWRkIGV2ZW50IHRvdWNoIGNhcmRcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJjYXJkLXRvdWNoXCIsdGhpcy5vblRvdWNoQ2FyZCx0aGlzKTtcclxuICAgICAgICAvL2VuZHJlZ2lvbiBhZGQgZXZlbnQgdG91Y2ggY2FyZFxyXG5cclxuICAgICAgICAvL3JlZ2lvbiBleGVjdXRlIGFjdGlvbiBudW1iZXIgMVxyXG4gICAgICAgIC8vZW50ZXIgdHVybiArIGV4ZWN1dGUgYWN0aW9uXHJcbiAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgIHZhciBkZWxheVRpbWUgPSBhY3Rpb25Db25maWcudGltZTtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gYWN0aW9uQ29uZmlnLmluZGV4O1xyXG4gICAgICAgIHRoaXMub25FbnRlclR1cm4oYWN0aW9uQ29uZmlnLmluZGV4KTtcclxuICAgICAgICBpZihkZWxheVRpbWU+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksZGVsYXlUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lbmRyZWdpb24gZXhlY3V0ZSBhY3Rpb24gbnVtYmVyIDFcclxuICAgIH0sXHJcbiAgICBzdGFydDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH0uYmluZCh0aGlzKSwyMDAwKTtcclxuICAgIH0sXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbmFibGUgcGxheWVyczpcIiArIHRoaXMucGxheWVycy5sZW5ndGgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiZWZvcmVFeGVjdXRlQWN0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFjdGlvbkNvbmZpZyA9IHRoaXMuX2dhbWVGYWtlLmdldEFjdGlvbigpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbkNvbmZpZy5pbmRleDtcclxuICAgICAgICBpZihpbmRleCA9PT0gMCApe1xyXG4gICAgICAgICAgICBpZihhY3Rpb25Db25maWcudHlwZSA9PT0gQWN0aW9uVHlwZS5QQVNTKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheVNvdW5kWW91clR1cm4oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRHcm91cEV4cGVjdHMoYWN0aW9uQ29uZmlnLmNhcmRzKTtcclxuICAgICAgICAgICAgaWYoYWN0aW9uQ29uZmlnLnN1Z2dlc3Qpey8vbmV1IGNvIHN1Z2dlc3RcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcInNob3cgc3VnZ2VzdFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbMF0uZ2V0Q29tcG9uZW50KENQbGF5ZXIpLm9uU3VnZ2VzdENhcmQodGhpcy5ncm91cEV4cGVjdHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuYXV0b1Nob3dTdWdnZXN0LDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leGVjdXRlQWN0aW9uKCk7XHJcblxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYXJkRXhwZWN0IHtDYXJkfSBjYXJkIG1vbmcgbXVvbiBkYW5oXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGVBY3Rpb246ZnVuY3Rpb24oY2FyZEV4cGVjdCl7XHJcbiAgICAgICAgLy8xLiB0dXJuIG9mZiB2aWVjIHN1Z2dlc3RcclxuICAgICAgICAvLzIuIGNsb3NlIHR1cm5cclxuICAgICAgICAvLzMuIGRpc2NhcmQgfCBwYXNzXHJcbiAgICAgICAgLy80LiBwbGF5IHNvdW5kXHJcbiAgICAgICAgLy81LiBwbGF5IGVtb1xyXG4gICAgICAgIC8vNi4gY2hlY2sgZW5kZWQgZ2FtZVxyXG4gICAgICAgIC8vNy4gbmV4dCBhY3Rpb258bmV4dCB0dXJuXHJcblxyXG4gICAgICAgIC8vMS4gdHVybiBvZmYgdmllYyBzdWdnZXN0XHJcbiAgICAgICAgdGhpcy5fdHVybk9mZkF1dG9TdWdnZXN0KCk7XHJcblxyXG4gICAgICAgIHZhciBhY3Rpb25Db25maWcgPSB0aGlzLl9nYW1lRmFrZS5nZXRBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgLy8yLiBjbG9zZSB0dXJuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gYWN0aW9uQ29uZmlnLmluZGV4O1xyXG4gICAgICAgIHRoaXMub25DbG9zZVR1cm4oaW5kZXgpO1xyXG5cclxuICAgICAgICAvLzMuIGRpc2NhcmQgfCBwYXNzXHJcbiAgICAgICAgdmFyIHR5cGUgPSBhY3Rpb25Db25maWcudHlwZTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpb25UeXBlLlBBU1M6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFzc0F0KGluZGV4LGFjdGlvbkNvbmZpZy5pc05ld1JvdW5kKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGlvblR5cGUuRElTQ0FSRDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25EaXNjYXJkQXQoaW5kZXgsYWN0aW9uQ29uZmlnLmNhcmRzLGFjdGlvbkNvbmZpZy5ncm91cCxjYXJkRXhwZWN0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy80LiBwbGF5IHNvdW5kXHJcbiAgICAgICAgdmFyIHNvdW5kID0gYWN0aW9uQ29uZmlnLnNvdW5kO1xyXG4gICAgICAgIGlmKHNvdW5kKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnBsYXlBdWRpbyhzb3VuZCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSw1MDApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vNS4gcGxheSBlbW9cclxuICAgICAgICB2YXIgZW1vID0gYWN0aW9uQ29uZmlnLmVtbztcclxuICAgICAgICBpZihlbW8gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKGVtbyBpbnN0YW5jZW9mIEFycmF5KXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZW1vLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzLGVtb1trXSksayAgKiAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RW1vKGVtbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vNi4gY2hlY2sgZW5kZWQgZ2FtZVxyXG4gICAgICAgIGlmKGFjdGlvbkNvbmZpZy5pc0VuZGVkKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW1nSGFuZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZCA9IHRoaXMuaW1nSGFuZHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZC5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMC41LDAsLTMwMCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMTAwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5QXVkaW8oU291bmRUeXBlLldJTik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdFdpbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksMjUwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAvLzcuIG5leHQgYWN0aW9ufG5leHQgdHVyblxyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gYWN0aW9uQ29uZmlnLm5leHQ7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb25OZXh0ID0gdGhpcy5fZ2FtZUZha2UubmV4dCgpO1xyXG4gICAgICAgICAgICBpZihhY3Rpb25OZXh0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlclR1cm4oYWN0aW9uTmV4dC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjdGlvbk5leHQ6XCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsYXlUaW1lID0gYWN0aW9uTmV4dC50aW1lO1xyXG4gICAgICAgICAgICAgICAgaWYoZGVsYXlUaW1lPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVFeGVjdXRlQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGRlbGF5VGltZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25Ub3VjaENhcmQ6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICB2YXIgY0NhcmQgPSBkYXRhLmNhcmQ7XHJcbiAgICAgICAgdmFyIG93bmVyID0gY0NhcmQub3duZXI7XHJcbiAgICAgICAgaWYob3duZXIgaW5zdGFuY2VvZiBDVGFibGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhc3NpbmcgY2FyZCBvbiB0YWJsZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvd25lciBpbnN0YW5jZW9mIENQbGF5ZXIpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzTXlUdXJuKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1RvdWNoRXhwZWN0Q2FyZHMoY0NhcmQuY2FyZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnRUb3VjaCA9IGRhdGEuZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGFydFBvaW50VG91Y2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBkYXRhLmV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9zLnkgLSB0aGlzLnN0YXJ0UG9pbnRUb3VjaC55ID4gNDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVBY3Rpb24oY0NhcmQuY2FyZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkRpc2NhcmQgb24gbXkgdHVybjpcIiArIGNDYXJkLmNhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCIhIURpc2NhcmQgb24gbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ0b3VjaDpcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhcnRQb2ludFRvdWNoKSArXCJ8IFwiKyBKU09OLnN0cmluZ2lmeShwb3MpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwibm90IGV4cGVjdHMgY2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJub3QgbXkgdHVyblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvd25lci5vblRvdWNoQ2FyZChkYXRhLmV2ZW50LGRhdGEuY2FyZClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblRvdWNoQ2FyZCBhdCBjb250cm9sZXJcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUGxheU5vdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25QbGF5IHBhdGggbWFpblwiKTtcclxuICAgICAgICBQbGF5YWJsZUFkcy5vbkNUQUNsaWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hEdW1wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0b3VjaCBEdW1wXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRvdWNoUGFzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggUGFzc1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXR0YWNoTGF5ZXJDYXJkVG9QbGF5ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5wbGF5ZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2ldLmdldENvbXBvbmVudChcIkNQbGF5ZXJcIik7XHJcbiAgICAgICAgICAgIGNQbGF5ZXIuc2V0TGF5ZXJDYXJkKHRoaXMubGF5ZXJDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25FbnRlclR1cm46ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25FbnRlclR1cm46IFwiICsgaW5kZXgpO1xyXG4gICAgICAgIHZhciBjUGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XS5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgY1BsYXllci5vbkVudGVyVHVybigpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xvc2VUdXJuOmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5wbGF5ZXJzW2luZGV4XTtcclxuICAgICAgICBpZihwbGF5ZXIpe1xyXG4gICAgICAgICAgICB2YXIgY1BsYXllciA9IHBsYXllci5nZXRDb21wb25lbnQoQ1BsYXllcik7XHJcbiAgICAgICAgICAgIGlmKHBsYXllcil7XHJcbiAgICAgICAgICAgICAgICBjUGxheWVyLm9uQ2xvc2VUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtaXNzaW5nIHBsYXllciBvciBDUGxheWVyIGF0IGluZGV4OlwiICsgaW5kZXgpO1xyXG4gICAgfSxcclxuICAgIGF1dG9TaG93U3VnZ2VzdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFbW86ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIHZhciBlbW8gPSB0aGlzLmVtb1BsYXllcnNbaW5kZXhdO1xyXG4gICAgICAgIGlmKGVtbyl7XHJcbiAgICAgICAgICAgIHZhciBzcGluZSA9IGVtby5nZXRDb21wb25lbnQoJ3NwLlNrZWxldG9uJyk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldFN0YXJ0TGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gc3RhcnQuXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRJbnRlcnJ1cHRMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gaW50ZXJydXB0LlwiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gc3BpbmUuc2V0RW5kTGlzdGVuZXIoZnVuY3Rpb24gKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGVuZC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLnNldERpc3Bvc2VMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gd2lsbCBiZSBkaXNwb3NlZC5cIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgICAgICBlbW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgYW5pbWF0aW9uTmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyBpZiAoYW5pbWF0aW9uTmFtZSA9PT0gJ3Nob290Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gICAgIHRoaXMuc3BpbmUuY2xlYXJUcmFjaygxKTtcclxuICAgICAgICAgICAgICAgIC8vIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHZhciBsb29wQ291bnQgPSBNYXRoLmZsb29yKHRyYWNrRW50cnkudHJhY2tUaW1lIC8gdHJhY2tFbnRyeS5hbmltYXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwiW3RyYWNrICVzXVthbmltYXRpb24gJXNdIGNvbXBsZXRlOiAlc1wiLCB0cmFja0VudHJ5LnRyYWNrSW5kZXgsIGFuaW1hdGlvbk5hbWUsIGxvb3BDb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGluZS5zZXRFdmVudExpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnksIGV2ZW50KXtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhcIlt0cmFjayAlc11bYW5pbWF0aW9uICVzXSBldmVudDogJXMsICVzLCAlcywgJXNcIiwgdHJhY2tFbnRyeS50cmFja0luZGV4LCBhbmltYXRpb25OYW1lLCBldmVudC5kYXRhLm5hbWUsIGV2ZW50LmludFZhbHVlLCBldmVudC5mbG9hdFZhbHVlLCBldmVudC5zdHJpbmdWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdhbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9wbGF5RWZmZWN0R3JvdXA6ZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJfcGxheUVmZmVjdEdyb3VwOlwiICsgbmFtZSk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuZWZmZWN0Q2FyZEdyb3VwO1xyXG4gICAgICAgIGlmKGVtbyl7XHJcbiAgICAgICAgICAgIHZhciBzcGluZSA9IGVtby5nZXRDb21wb25lbnQoJ3NwLlNrZWxldG9uJyk7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZhciBhbmltYXRpb25OYW1lID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIC8vIGlmIChhbmltYXRpb25OYW1lID09PSAnc2hvb3QnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAvLyAgICAgdGhpcy5zcGluZS5jbGVhclRyYWNrKDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGxvb3BDb3VudCA9IE1hdGguZmxvb3IodHJhY2tFbnRyeS50cmFja1RpbWUgLyB0cmFja0VudHJ5LmFuaW1hdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJbdHJhY2sgJXNdW2FuaW1hdGlvbiAlc10gY29tcGxldGU6ICVzXCIsIHRyYWNrRW50cnkudHJhY2tJbmRleCwgYW5pbWF0aW9uTmFtZSwgbG9vcENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgbmFtZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9LDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF90dXJuT2ZmQXV0b1N1Z2dlc3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5hdXRvU2hvd1N1Z2dlc3QpO1xyXG4gICAgICAgIHRoaXMubm9kZVN1Z2dlc3RHZXN0dXJlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG9uUGFzc0F0OmZ1bmN0aW9uKGluZGV4LGlzTmV3Um91bmQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25QYXNzQXQ6XCIgKyBpbmRleCk7XHJcbiAgICAgICAgdmFyIGNQbGF5ZXIgPSB0aGlzLnBsYXllcnNbaW5kZXhdLmdldENvbXBvbmVudChDUGxheWVyKTtcclxuICAgICAgICBjUGxheWVyLm9uUGFzcygpO1xyXG4gICAgICAgIGlmKGlzTmV3Um91bmQpe1xyXG4gICAgICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICAgICAgY1RhYmxlLm9uTmV3Um91bmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25EaXNjYXJkQXQ6ZnVuY3Rpb24oaW5kZXgsY2FyZHNPckdyb3VwLGdyb3VwVHlwZSxjYXJkRXhwZWN0KXtcclxuICAgICAgICBmdW5jdGlvbiBnZXRDYXJkcyhjYXJkc09yR3JvdXAsY2FyZEV4cGVjdCxwbGF5ZXJQcmVmYWIpe1xyXG4gICAgICAgICAgICBjYy5sb2coXCJnZXRDYXJkc0RpY2FyZDogXCIgKyBpbmRleCArXCJ8XCIgKyBjYXJkRXhwZWN0KTtcclxuICAgICAgICAgICAgdmFyIGwgPSBjYXJkc09yR3JvdXAubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihsID4gMCl7XHJcbiAgICAgICAgICAgICAgICBpZihjYXJkc09yR3JvdXBbMF0gaW5zdGFuY2VvZiBBcnJheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmRzID0gY2FyZHNPckdyb3VwW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJpc2dyb3VwOlwiICsgY2FyZEV4cGVjdCArXCJ8XCIgKyBjYXJkc1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjYXJkc1tqXS5pZCA9PT0gY2FyZEV4cGVjdC5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB4ZW0gY28gZnVsbCBjYXJkIHRyb25nIHBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID09PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNQbGF5ZXIgPSBwbGF5ZXJQcmVmYWIuZ2V0Q29tcG9uZW50KENQbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjUGxheWVyLmlzQ29udGFpbkFsbChjYXJkcykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwibm90IGZvdW5kIGNhcmQgaW4gZ3JvdXBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmRzT3JHcm91cFswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2FyZHNPckdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGxheWVyUHJlZmFiID0gdGhpcy5wbGF5ZXJzW2luZGV4XTtcclxuICAgICAgICB2YXIgY2FyZHMgPSBnZXRDYXJkcyhjYXJkc09yR3JvdXAsY2FyZEV4cGVjdCxwbGF5ZXJQcmVmYWIpO1xyXG4gICAgICAgIHZhciBzID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzICs9IFwiIFwiKyBjYXJkc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkRpc2NhcmRBdDpcIiArIGluZGV4ICtcInxcIisgY2FyZEV4cGVjdCArIFwifFwiKyBzKTtcclxuICAgICAgICB2YXIgY1RhYmxlID0gdGhpcy50YWJsZS5nZXRDb21wb25lbnQoQ1RhYmxlKTtcclxuICAgICAgICB2YXIgY2FyZFByZWZhYnMgPSBwbGF5ZXJQcmVmYWIuZ2V0Q29tcG9uZW50KENQbGF5ZXIpLm9uRGlzY2FyZChjYXJkcyk7XHJcblxyXG4gICAgICAgIHZhciBlZmZlY3REaXNjYXJkID0gZnVuY3Rpb24gKGNhcmRQcmVmYWIpIHtcclxuICAgICAgICAgICAgLy8xLiBtb3ZlIGRlbiBkb2NrIC0+IHhvYXkgbGFpIDAgZG8gLT4gbmF5IGJhdCByYSByYSAxIHRpXHJcbiAgICAgICAgICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWIuZ2V0Q29tcG9uZW50KENDYXJkKTtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IGNUYWJsZS5udW1DYXJkO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBjQ2FyZC5pbmRleDtcclxuXHJcbiAgICAgICAgICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IDAuMztcclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uMSA9IDAuMTU7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWIuc2V0Um90YXRpb24oMzMwLDAsMCk7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWIucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKGR1cmF0aW9uLHApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJvdGF0ZVRvKGR1cmF0aW9uLDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKGR1cmF0aW9uLzIsMS4xLDEuMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24vMiwwLjg1LDAuODUpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oZHVyYXRpb24xLDAuOTAsMC45MCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKGR1cmF0aW9uMSxwLngrIChNYXRoLnJhbmRvbSgpICogMzAgKiAoaW5kZXggLSAobGVuLTEpLzIpKSxwLnkgKyAoTWF0aC5yYW5kb20oKSAqIDIwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mucm90YXRlVG8oZHVyYXRpb24xLCAoaW5kZXggLSAobGVuIC0gMSkvMikgKiBNYXRoLnJhbmRvbSgpICogOClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbGVuID0gY2FyZFByZWZhYnMubGVuZ3RoO1xyXG4gICAgICAgIGNUYWJsZS5zZXROdW1DYXJkKGxlbik7XHJcblxyXG4gICAgICAgIGNjLmxvZyhcImltZ0hpZ2hMaWdodDpcIiAgKyB0aGlzLnpJbmRleENhcmQpO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LnpJbmRleCA9ICsrdGhpcy56SW5kZXhDYXJkO1xyXG4gICAgICAgIHRoaXMuaW1nSGlnaExpZ2h0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbWdIaWdoTGlnaHQucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjQpLFxyXG4gICAgICAgICAgICBjYy5zaG93KCksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsMS4yLDEuMiksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4yKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuMiwxLDEpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLmZhZGVPdXQoMC4zKSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKHNlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgc2VuZGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LHRoaXMpXHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIGNhcmRQcmVmYWIgPSBjYXJkUHJlZmFic1trXTtcclxuICAgICAgICAgICAgdmFyIGNDYXJkID0gY2FyZFByZWZhYi5nZXRDb21wb25lbnQoQ0NhcmQpO1xyXG4gICAgICAgICAgICBjQ2FyZC5pbmRleCA9IChrKTtcclxuICAgICAgICAgICAgY0NhcmQub3duZXIgPSBjVGFibGU7XHJcbiAgICAgICAgICAgIGNhcmRQcmVmYWIuekluZGV4ID0gKysgdGhpcy56SW5kZXhDYXJkO1xyXG4gICAgICAgICAgICBjYy5sb2coXCJjYXJkUHJlZmFiOlwiICArIHRoaXMuekluZGV4Q2FyZCk7XHJcblxyXG4gICAgICAgICAgICBlZmZlY3REaXNjYXJkKGNhcmRQcmVmYWIpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIHAgPSBjVGFibGUuZ2V0UG9zaXRpb25DYXJkKGNDYXJkKTtcclxuICAgICAgICAgICAgLy8gY2FyZFByZWZhYi5ydW5BY3Rpb24oY2Muc3Bhd24oXHJcbiAgICAgICAgICAgIC8vICAgICBjYy5tb3ZlVG8oMC4xNSxwKSxcclxuICAgICAgICAgICAgLy8gICAgIGNjLnJvdGF0ZVRvKDEsMClcclxuICAgICAgICAgICAgLy8gKSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhcIm5ld1pJbmRleDpcIiArIHRoaXMuekluZGV4Q2FyZCk7XHJcblxyXG4gICAgICAgICAgICAvL2R1b2MgYWRkIGtoaSB0YW8gcmFcclxuICAgICAgICAgICAgLy8gdGhpcy5sYXllckdhbWUuYWRkQ2hpbGQoY2FyZFByZWZhYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNUYWJsZS5hZGRDYXJkcyhjYXJkUHJlZmFicyk7XHJcblxyXG5cclxuICAgICAgICBzd2l0Y2ggKGdyb3VwVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GTFVTSDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnZmx1c2gnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5TVFJBSUdIVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlFZmZlY3RHcm91cCgnc3RyYWlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GVUxMX0hPVVNFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUVmZmVjdEdyb3VwKCdmdWxsaG91c2UnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5GT1VSX09GX0tJTkQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5RWZmZWN0R3JvdXAoJ2Zvcm9mYWtpbmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENhcmRHcm91cC5OT05FOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvciAodmFyIGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAvLyAgICAgdmFyIGMgPSBjYXJkc1tqXTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB2YXIgY2FyZFByZWZhYnMgPSB0aGlzLl9wb29sQ2FyZC5nZXQoKTtcclxuICAgICAgICAvLyAgICAgaWYoIWNhcmRQcmVmYWJzKXtjYXJkUHJlZmFicyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFByZWZhYik7fVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHZhciBjQ2FyZCA9IGNhcmRQcmVmYWJzLmdldENvbXBvbmVudChDQ2FyZCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgY0NhcmQuc2V0Q2FyZChjKTtcclxuICAgICAgICAvLyAgICAgY0NhcmQuaW5kZXggPSAoaik7XHJcbiAgICAgICAgLy8gICAgIGNDYXJkLm93bmVyID0gY1RhYmxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHZhciBwID0gY1RhYmxlLmdldFBvc2l0aW9uQ2FyZChjQ2FyZCk7XHJcbiAgICAgICAgLy8gICAgIGNhcmRQcmVmYWJzLnNldFBvc2l0aW9uKHApO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxheWVyR2FtZS5hZGRDaGlsZChjYXJkUHJlZmFicyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRHcm91cEV4cGVjdHM6ZnVuY3Rpb24oY2FyZHMpe1xyXG4gICAgICAgIHZhciBncm91cHMgPSBbXTtcclxuICAgICAgICB2YXIgbEcgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgaWYobEcgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGNhcmRzWzBdIGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZyA9IDA7IGcgPCBsRzsgZysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goY2FyZHNbZ10pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goY2FyZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBncm91cHMucHVzaChjYXJkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdXBFeHBlY3RzID0gZ3JvdXBzO1xyXG4gICAgfSxcclxuICAgIGlzQ29udGFpbkdyb3VwRXhwZWN0czpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgbGcgPSB0aGlzLmdyb3VwRXhwZWN0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkcyA9IHRoaXMuZ3JvdXBFeHBlY3RzW2ldO1xyXG4gICAgICAgICAgICB2YXIgbGMgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoY2FyZHNbal0uaWQgPT09IGNhcmQuaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBnZXROZXdDYXJkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNhcmRQcmVmYWIgPSB0aGlzLl9wb29sQ2FyZC5nZXQoKTtcclxuICAgICAgICBpZighY2FyZFByZWZhYil7Y2FyZFByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFByZWZhYik7fVxyXG4gICAgICAgIHJldHVybiBjYXJkUHJlZmFiO1xyXG4gICAgfSxcclxuICAgIGlzTXlUdXJuOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJJbmRleCA9PT0gMDtcclxuICAgIH0sXHJcbiAgICBpc1RvdWNoRXhwZWN0Q2FyZHM6ZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0NvbnRhaW5Hcm91cEV4cGVjdHMoY2FyZCk7XHJcbiAgICB9LFxyXG4gICAgc2hvd05vZGVDSFBsYXk6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNIUGxheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG59KTsiXX0=