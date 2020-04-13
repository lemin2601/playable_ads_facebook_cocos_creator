
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    // console.log("loadCard:" + this.card +"|" + this.index);
    if (this.card) {
      this.init(this.card);
    }

    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouch, this); // this.node.on("cardtouch",this.onEmit,this);
  },
  onEmit: function onEmit() {
    console.log("onEmit card:" + this.card.toString());
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
    this.node.setPosition(pos.x - 50, pos.y - 65);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NhcmQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkNhcmQiLCJSYW5rIiwiQ0NhcmQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBvaW50IiwiTGFiZWwiLCJzdWl0IiwiU3ByaXRlIiwibWFpblBpYyIsImNhcmRCRyIsInJlZFRleHRDb2xvciIsIkNvbG9yIiwiUkVEIiwiYmxhY2tUZXh0Q29sb3IiLCJXSElURSIsInRleEZyb250QkciLCJTcHJpdGVGcmFtZSIsInRleEZhY2VzIiwidHlwZSIsInRleEFjZSIsInRleFN1aXRCaWciLCJ0ZXhTdWl0U21hbGwiLCJpbmRleCIsIkludGVnZXIiLCJ2aXNpYmxlIiwiaXNTZWxlY3RlZCIsIm93bmVyIiwiTm9kZSIsImlzRHJhZ2luZyIsImNhcmQiLCJzZXRPd25lciIsIm9uTG9hZCIsImluaXQiLCJub2RlIiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsIm9uVG91Y2giLCJUT1VDSF9NT1ZFIiwiVE9VQ0hfRU5EIiwiVE9VQ0hfQ0FOQ0VMIiwib25FbWl0IiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiZXZlbnQiLCJjdXN0b21FdmVudCIsIkV2ZW50IiwiRXZlbnRDdXN0b20iLCJzZXRVc2VyRGF0YSIsImRpc3BhdGNoRXZlbnQiLCJpZCIsInN0YXJ0Iiwic2V0Q2FyZCIsInNwcml0ZUZyYW1lIiwiaXNSZWRTdWl0IiwiY29sb3IiLCJzdHJpbmciLCJwb2ludE5hbWUiLCJpc0FjZSIsImlzRmFjZSIsInNldFBvc2l0aW9uQ2VudGVyIiwicG9zIiwic2V0UG9zaXRpb24iLCJ4IiwieSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBa0JBLE9BQU8sQ0FBQyxPQUFEO0lBQXBCQyxnQkFBQUE7SUFBS0MsZ0JBQUFBLE1BQ1Y7O0FBQ0E7Ozs7O0FBR0EsSUFBSUMsS0FBSyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztB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Q0UsQ0FBSixHQUFRLEVBQTlCLEVBQWlDRixHQUFHLENBQUNHLENBQUosR0FBUSxFQUF6QztBQUNIO0FBbElnQixDQUFULENBQVoiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7Q2FyZCxSYW5rfSA9IHJlcXVpcmUoXCJUeXBlc1wiKTtcclxuLy8gaW1wb3J0IHtDYXJkfSBmcm9tIFwiVHlwZXNcIjtcclxuLyoqXHJcbiAqIEBjbGFzcyBDQ2FyZFxyXG4gKi9cclxudmFyIENDYXJkID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBub2Rlc1xyXG4gICAgICAgIHBvaW50ICAgOiBjYy5MYWJlbCxcclxuICAgICAgICBzdWl0ICAgOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgbWFpblBpYzogY2MuU3ByaXRlLFxyXG4gICAgICAgIGNhcmRCRyA6IGNjLlNwcml0ZSxcclxuXHJcbiAgICAgICAgLy8gcmVzb3VyY2VzXHJcbiAgICAgICAgcmVkVGV4dENvbG9yICA6IGNjLkNvbG9yLlJFRCxcclxuICAgICAgICBibGFja1RleHRDb2xvcjogY2MuQ29sb3IuV0hJVEUsXHJcbiAgICAgICAgdGV4RnJvbnRCRyAgICA6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIC8vIHRleEJhY2tCRyAgICAgOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICB0ZXhGYWNlcyAgICA6IHsvL0osUSxLXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4QWNlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4U3VpdEJpZyAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4U3VpdFNtYWxsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5kZXggICAgICAgOiB7Ly92aSB0cmkgdHJvbmcgZ3JvdXAga2hpIGRhbmggcmFcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU2VsZWN0ZWQgIDogeyAvLyB0cmFuZyB0aGFpIGNvIHNlbGVjdCBraG9uZ1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIG93bmVyICAgICAgIDogey8vc28gaHV1IHF1YW4gYmFpLCBteVBsYXllciBob2FjIGRvY2sgZHVvaSB0YWJsZVxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEcmFnaW5nICAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IENhcmQsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbXkgcGxheWVyIHwgZG9ja1xyXG4gICAgICogQHBhcmFtIG93bmVyIHtjYy5Ob2RlfVxyXG4gICAgICovXHJcbiAgICBzZXRPd25lcjpmdW5jdGlvbihvd25lcil7XHJcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZENhcmQ6XCIgKyB0aGlzLmNhcmQgK1wifFwiICsgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgaWYodGhpcy5jYXJkKXtcclxuICAgICAgICAgICB0aGlzLmluaXQodGhpcy5jYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJjYXJkdG91Y2hcIix0aGlzLm9uRW1pdCx0aGlzKTtcclxuXHJcbiAgICB9LFxyXG4gICAgb25FbWl0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkVtaXQgY2FyZDpcIiArIHRoaXMuY2FyZC50b1N0cmluZygpKTtcclxuICAgIH0sXHJcbiAgICBvblRvdWNoOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZih0aGlzLm93bmVyKXtcclxuICAgICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCdjYXJkLXRvdWNoJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN1c3RvbUV2ZW50LnNldFVzZXJEYXRhKHtcclxuICAgICAgICAgICAgICAgIGNhcmQ6dGhpcyxcclxuICAgICAgICAgICAgICAgIGV2ZW50OmV2ZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XHJcbiAgICAgICAgICAgIC8vIHZhciBjUGxheWVyID0gdGhpcy5vd25lci5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpO1xyXG4gICAgICAgICAgICAvLyBjUGxheWVyLm9uVG91Y2hDYXJkKGV2ZW50LHRoaXMpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBmb3VuZCBvd25lcidzIGNhcmQ6XCIgKyB0aGlzLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudCggbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCdjYXJkdG91Y2gnLCB0cnVlKSApO1xyXG4gICAgfSxcclxuICAgIHNldENhcmQ6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzZXRDYXJkOlwiICsgY2FyZCArXCJ8cG9pbnQ6XCIgKyBjYXJkLnBvaW50ICtcInxzdWl0OlwiICsgY2FyZC5zdWl0KTtcclxuICAgICAgICB0aGlzLmNhcmQgPSBjYXJkO1xyXG4gICAgfSxcclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICAvL2NoYXRcclxuICAgICAgICB0aGlzLnN1aXQuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRTbWFsbFtjYXJkLnN1aXRdO1xyXG5cclxuICAgICAgICAvL3NvXHJcbiAgICAgICAgaWYgKGNhcmQuaXNSZWRTdWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnQubm9kZS5jb2xvciA9IHRoaXMucmVkVGV4dENvbG9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnQubm9kZS5jb2xvciA9IHRoaXMuYmxhY2tUZXh0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9pbnQuc3RyaW5nID0gY2FyZC5wb2ludE5hbWU7XHJcblxyXG4gICAgICAgIC8vaGluaFxyXG4gICAgICAgIGlmKGNhcmQuaXNBY2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5QaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnRleEFjZVtjYXJkLnN1aXRdO1xyXG4gICAgICAgIH1lbHNlIGlmKGNhcmQuaXNGYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluUGljLnNwcml0ZUZyYW1lID0gdGhpcy50ZXhGYWNlc1tjYXJkLnBvaW50IC0gOF07XHJcbiAgICAgICAgICAgIGlmIChjYXJkLmlzUmVkU3VpdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluUGljLm5vZGUuY29sb3IgPSB0aGlzLnJlZFRleHRDb2xvcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblBpYy5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy9iaW5oIHRodW9uZyAyLT4xMFxyXG4gICAgICAgICAgICB0aGlzLm1haW5QaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRCaWdbY2FyZC5zdWl0XTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBvc2l0aW9uQ2VudGVyOmZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zLnggLSA1MCxwb3MueSAtIDY1KTtcclxuICAgIH1cclxufSk7Il19