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
    }
  },
  ctor: function ctor() {
    /** @type {Player}*/
    this.player = null;
    /** @type {GameController}*/

    this.gameController = null;
    this.cards = [];
  },
  onLoad: function onLoad() {
    if (this.player) {
      this.displayName.string = this.player.name;
      this.gold.string = Utility.formatMoney(this.player.gold);
      var circleAvatar = this.avatar.getComponent("CCircleAvatar");
      circleAvatar.changeAvatar(this.spriteAvatar[this.player.avatar]); //loadCards

      this._loadCards();
    } else {
      console.error("need load setPlayer info onLoad");
    }

    if (this.imgPass) {
      this.imgPass.active = false;
    }

    this.node.on("card-touch", this.onTouchCard, this);
  },
  start: function start() {},
  // update (dt) {},
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
    } else {
      console.error("don't have GameControler in Player, so can't create newCard");
    }
  },
  onDiscard: function onDiscard(cards) {
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
      for (var k = 0; k < cards.length; k++) {
        var cardPrefab = this.gameController.getNewCard();
        var cCard = cardPrefab.getComponent("CCard");
        cCard.setCard(cards[k]);
        cardPrefab.angle = 0;
        cCard.setPositionCenter(this.node.getPosition());
        cardPrefabs.push(cardPrefab);
        this.layerCard.addChild(cardPrefab);
      }
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
    } else {
      console.error("don't have GameControler in Player, so can't create newCard");
    }
  },
  getNumCard: function getNumCard() {
    if (this.player) {
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
    var startX = -60;
    var endX = 48;
    var maxOffsetX = 12;
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
    pos.y = -1 / 250 * (x * x) - 280;
    return pos;
  },
  onPass: function onPass() {
    if (this.imgPass) {
      this.imgPass.active = true;
      this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
        this.imgPass.active = false;
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
  }
});
module.exports = CPlayer;

cc._RF.pop();