"use strict";
cc._RF.push(module, 'c90b5cwF5ZKgbNi6oY6LKVY', 'CPlayer');
// scripts/CPlayer.js

"use strict";

var Types = require("Types");

var Utility = require("Utility");

var CPlayer = cc.Class({
  "extends": cc.Component,
  properties: {
    avatar: cc.Node,
    displayName: cc.Label,
    gold: cc.Label,
    spriteAvatar: {
      "default": [],
      type: [cc.SpriteFrame]
    },
    layerCard: {
      "default": null,
      type: cc.Node
    },
    imgPass: {
      "default": null,
      type: cc.Node
    },
    progressBar: {
      "default": null,
      type: cc.ProgressBar
    },
    headProgressBar: {
      "default": null,
      type: cc.ParticleSystem
    },
    backCard: {
      "default": null,
      type: cc.Sprite
    },
    lbNumCard: {
      "default": null,
      type: cc.Label
    }
  },
  ctor: function ctor() {
    /** @type {Player}*/
    this.player = null;
    /** @type {GameController}*/

    this.gameController = null;
    /** @type {[cardPrefab]}*/

    this.cards = [];
    this._isMyTurn = false;
    this._numCard = 0;
  },
  onLoad: function onLoad() {
    this.setMyTurn(this._isMyTurn);

    if (this.player) {
      if (this.player.index === 0) {
        this.backCard.node.active = false;
      }

      this.displayName.string = this.player.name;
      this.gold.string = Utility.formatMoneyFull(this.player.gold); // var circleAvatar = this.avatar.getComponent("CCircleAvatar");
      // circleAvatar.changeAvatar(this.spriteAvatar[this.player.avatar]);
      //loadCards

      this._loadCards();
    } else {
      console.error("need load setPlayer info onLoad");
    }

    if (this.imgPass) {
      this.imgPass.active = false;
    }
  },
  start: function start() {},
  update: function update(dt) {
    if (this._isMyTurn) {
      var progressBar = this.progressBar;
      var progress = progressBar.progress;

      if (progress > 0) {
        progress -= dt * 0.1;
      }

      progressBar.progress = progress;
      var p = new cc.Vec2(0, 75);
      p = p.rotate(progress * 2 * 3.14);
      this.headProgressBar.node.setPosition(p);
    }
  },
  setGameController: function setGameController(gameController) {
    this.gameController = gameController;
  },
  setPlayer: function setPlayer(player) {
    this.player = player;

    if (this.player.index !== 0) {
      this._numCard = 11;
    }
  },
  updateUI: function updateUI() {},
  _loadCards: function _loadCards() {
    var midIndex = this.getNumCard() / 2;
    var midPos = this.getPositionVia(midIndex);
    var midRot = this.getRotationVia(midIndex);

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
        var r = this.getRotationCard(cCard); // cardPrefab.setPosition(p);
        // cardPrefab.angle = (-r);

        cardPrefab.setPosition(midPos);
        cardPrefab.angle = -midRot;
        cardPrefab.runAction(cc.spawn(cc.moveTo(0.6, p.x, p.y), cc.rotateTo(0.6, r)));
        this.layerCard.addChild(cardPrefab);
        this.cards.push(cardPrefab);
      }

      this.lbNumCard.string = this.getNumCard();
    } else {
      console.error("don't have GameControler in Player, so can't create newCard");
    }
  },
  setLayerCard: function setLayerCard(layerCard) {
    this.layerCard = layerCard;
  },
  onDiscard: function onDiscard(cards) {
    this.setMyTurn(false);

    if (this.layerCard == null) {
      console.error("you need add layerCard to player beforeDiscard");
      return [];
    }

    var cardPrefabs = [];

    if (this.player && this.player.index === 0) {
      var isContain = function isContain(c) {
        for (var i = 0; i < cards.length; i++) {
          if (c.id === cards[i].id) {
            return true;
          }
        }

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
    } else {
      var pos = this.node.getPosition();
      pos.x += this.backCard.node.getPosition().x;

      for (var k = 0; k < cards.length; k++) {
        var cardPrefab = this.gameController.getNewCard();
        var cCard = cardPrefab.getComponent("CCard");
        cCard.setCard(cards[k]);
        cardPrefab.angle = 0;
        cCard.setPositionCenter(pos);
        cardPrefabs.push(cardPrefab);
        this.layerCard.addChild(cardPrefab);
      }

      this._numCard -= cards.length;
    }

    this.lbNumCard.string = this.getNumCard();
    return cardPrefabs;
  },
  _updatePosCards: function _updatePosCards() {
    console.log("_updatePosCards");
    var midIndex = this.getNumCard() / 2;
    var midPos = this.getPositionVia(midIndex);
    var midRot = this.getRotationVia(midIndex);

    if (this.gameController) {
      var cards = this.cards;

      for (var i = 0; i < cards.length; i++) {
        var cardPrefab = cards[i];
        var cCard = cardPrefab.getComponent("CCard");
        cCard.index = i;
        var p = this.getPositionCard(cCard);
        var r = this.getRotationCard(cCard); // cardPrefab.setPosition(p);
        // cardPrefab.angle = (-r);
        // cardPrefab.setPosition(midPos);
        // cardPrefab.angle = -midRot;

        cardPrefab.runAction(cc.spawn(cc.moveTo(0.2, p.x, p.y), cc.rotateTo(0.2, r)));
      }
    } else {
      console.error("don't have GameControler in Player, so can't create newCard");
    }
  },
  getNumCard: function getNumCard() {
    if (this.player) {
      if (this.player.index !== 0) {
        return this._numCard;
      }

      return this.player.cards.length;
    }

    return 1;
  },
  getRotationCard: function getRotationCard(cCard) {
    var index = cCard.index;
    return this.getRotationVia(index);
  },
  getRotationVia: function getRotationVia(index) {
    var num = this.getNumCard();
    var y = 0;
    var startX = -95;
    var endX = 75; // var startX = -60;
    // var endX = 48;

    var maxOffsetX = num < 7 ? 20 : 50;
    var offset = (endX - startX) / (num - 1);
    if (offset > maxOffsetX) offset = maxOffsetX; //re-call startX;

    startX = startX + (endX - startX - offset * (num - 1)) / 2;
    return startX + offset * index;
  },

  /**
   *
   * @param cCard {CCard}
   */
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
    if (offset > maxOffsetX) offset = maxOffsetX; //re-call startX;

    startX = startX + (endX - startX - offset * (num - 1)) / 2;
    return this.getCirclePos(new cc.Vec2(startX + offset * index, y));
  },

  /**
   *
   * @param pos {cc.Vec2}
   */
  getCirclePos: function getCirclePos(pos) {
    var x = pos.x;
    pos.y = -1 / 100 * (x * x) / 1000 - 440;
    return pos;
  },
  onPass: function onPass() {
    this.setMyTurn(false);

    if (this.imgPass) {
      this.imgPass.active = true;
      this.avatar.getComponent("CCircleAvatar").img.node.color = cc.Color.GRAY;
      this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
        this.imgPass.active = false;
        this.avatar.getComponent("CCircleAvatar").img.node.color = cc.Color.WHITE;
      }.bind(this))));
    }
  },

  /**
   *
   * @param event {cc.EventTouch}
   * @param card {Card}
   */
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
        break;
    }
  },
  onCloseTurn: function onCloseTurn() {
    cc.log("onCloseTurn:" + this.player.index);

    if (this.player.index === 0) {
      this.node.stopAllActions();
      this.node.runAction(cc.scaleTo(0.5, 1, 1)); // this.node.scale = 1;
    }
  },
  onEnterTurn: function onEnterTurn() {
    if (this.player.index === 0) {
      this.node.runAction(cc.scaleTo(0.5, 1.2, 1.2).easing(cc.easeBackOut())); // this.node.scale = 1.17;
      // return;
    }

    this.progressBar.progress = 1;
    this.setMyTurn(true);
  },
  setMyTurn: function setMyTurn(b) {
    this._isMyTurn = b;
    this.progressBar.node.active = b;
    var len = this.cards.length;

    for (var i = 0; i < len; i++) {
      var cardPrefab = this.cards[i];
      var cCard = cardPrefab.getComponent("CCard");
      cCard.setSuggest(true);
    }

    if (!b) {
      this.headProgressBar.stopSystem();
    } else {
      this.headProgressBar.resetSystem();
    } // this.headProgressBar.active = b;

  },
  onSuggestCard: function onSuggestCard(cards) {
    var isContain = function isContain(card) {
      var l = cards.length;

      for (var i = 0; i < l; i++) {
        if (cards[i].id === card.id) {
          return true;
        }
      }

      return false;
    };

    var len = this.cards.length;

    for (var i = 0; i < len; i++) {
      var cardPrefab = this.cards[i];
      var cCard = cardPrefab.getComponent("CCard");
      cCard.setSuggest(isContain(cCard.card));
    }
  }
});
module.exports = CPlayer;

cc._RF.pop();