"use strict";
cc._RF.push(module, '34036kNa6RCAoMIlraaHio6', 'CCard');
// scripts/CCard.js

"use strict";

var _require = require("Types"),
    Card = _require.Card,
    Rank = _require.Rank; // import {Card} from "Types";

/**
 * @class CCard
 */


var CCard = cc.Class({
  "extends": cc.Component,
  properties: {
    // nodes
    point: cc.Label,
    suit: cc.Sprite,
    mainPic: cc.Sprite,
    cardBG: cc.Sprite,
    // resources
    redTextColor: cc.Color.RED,
    blackTextColor: cc.Color.WHITE,
    texFrontBG: cc.SpriteFrame,
    // texBackBG     : cc.SpriteFrame,
    texFaces: {
      //J,Q,K
      "default": [],
      type: cc.SpriteFrame
    },
    texAce: {
      "default": [],
      type: cc.SpriteFrame
    },
    texSuitBig: {
      "default": [],
      type: cc.SpriteFrame
    },
    texSuitSmall: {
      "default": [],
      type: cc.SpriteFrame
    },
    layerSuggest: {
      "default": null,
      type: cc.Node
    },
    index: {
      //vi tri trong group khi danh ra
      "default": 0,
      type: cc.Integer,
      visible: false
    },
    isSelected: {
      // trang thai co select khong
      "default": false,
      visible: false
    },
    owner: {
      //so huu quan bai, myPlayer hoac dock duoi table
      "default": null,
      type: cc.Node,
      visible: false
    },
    isDraging: {
      "default": true,
      visible: false
    },
    card: {
      "default": null,
      type: Card,
      visible: false
    }
  },

  /**
   * my player | dock
   * @param owner {cc.Node}
   */
  setOwner: function setOwner(owner) {
    this.owner = owner;
  },
  onLoad: function onLoad() {
    this.layerSuggest.active = false; // console.log("loadCard:" + this.card +"|" + this.index);

    if (this.card) {
      this.init(this.card);
    }

    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this); // this.node.on("card-touch",this.onEmit,this);
  },
  onEmit: function onEmit() {
    console.log("card-touch:" + this.card.toString());
  },
  onTouch: function onTouch(event) {
    if (this.owner) {
      var customEvent = new cc.Event.EventCustom('card-touch', true);
      customEvent.setUserData({
        card: this,
        event: event
      });
      this.node.dispatchEvent(customEvent); // var cPlayer = this.owner.getComponent("CPlayer");
      // cPlayer.onTouchCard(event,this);
    } else {
      console.log("not found owner's card:" + this.id);
    }
  },
  start: function start() {
    this.node.dispatchEvent(new cc.Event.EventCustom('cardtouch', true));
  },
  setCard: function setCard(card) {
    // console.log("setCard:" + card +"|point:" + card.point +"|suit:" + card.suit);
    this.card = card;
  },
  // use this for initialization
  init: function init(card) {
    //chat
    this.suit.spriteFrame = this.texSuitSmall[card.suit]; //so

    if (card.isRedSuit) {
      this.point.node.color = this.redTextColor;
    } else {
      this.point.node.color = this.blackTextColor;
    }

    this.point.string = card.pointName; //hinh

    if (card.isAce) {
      this.mainPic.spriteFrame = this.texAce[card.suit];
    } else if (card.isFace) {
      this.mainPic.spriteFrame = this.texFaces[card.point - 8];

      if (card.isRedSuit) {
        this.mainPic.node.color = this.redTextColor;
      } else {
        this.mainPic.node.color = cc.Color.WHITE;
      }
    } else {
      //binh thuong 2->10
      this.mainPic.spriteFrame = this.texSuitBig[card.suit];
    }
  },
  setPositionCenter: function setPositionCenter(pos) {
    this.node.setPosition(pos.x - 73, pos.y - 98);
  },
  setSuggest: function setSuggest(b) {
    this.layerSuggest.active = !b;
  }
});

cc._RF.pop();