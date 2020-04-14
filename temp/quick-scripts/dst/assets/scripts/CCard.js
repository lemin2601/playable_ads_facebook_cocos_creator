
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NhcmQuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkNhcmQiLCJSYW5rIiwiQ0NhcmQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBvaW50IiwiTGFiZWwiLCJzdWl0IiwiU3ByaXRlIiwibWFpblBpYyIsImNhcmRCRyIsInJlZFRleHRDb2xvciIsIkNvbG9yIiwiUkVEIiwiYmxhY2tUZXh0Q29sb3IiLCJXSElURSIsInRleEZyb250QkciLCJTcHJpdGVGcmFtZSIsInRleEZhY2VzIiwidHlwZSIsInRleEFjZSIsInRleFN1aXRCaWciLCJ0ZXhTdWl0U21hbGwiLCJsYXllclN1Z2dlc3QiLCJOb2RlIiwiaW5kZXgiLCJJbnRlZ2VyIiwidmlzaWJsZSIsImlzU2VsZWN0ZWQiLCJvd25lciIsImlzRHJhZ2luZyIsImNhcmQiLCJzZXRPd25lciIsIm9uTG9hZCIsImFjdGl2ZSIsImluaXQiLCJub2RlIiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsIm9uVG91Y2giLCJUT1VDSF9NT1ZFIiwiVE9VQ0hfRU5EIiwiVE9VQ0hfQ0FOQ0VMIiwib25FbWl0IiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwiZXZlbnQiLCJjdXN0b21FdmVudCIsIkV2ZW50IiwiRXZlbnRDdXN0b20iLCJzZXRVc2VyRGF0YSIsImRpc3BhdGNoRXZlbnQiLCJpZCIsInN0YXJ0Iiwic2V0Q2FyZCIsInNwcml0ZUZyYW1lIiwiaXNSZWRTdWl0IiwiY29sb3IiLCJzdHJpbmciLCJwb2ludE5hbWUiLCJpc0FjZSIsImlzRmFjZSIsInNldFBvc2l0aW9uQ2VudGVyIiwicG9zIiwic2V0UG9zaXRpb24iLCJ4IiwieSIsInNldFN1Z2dlc3QiLCJiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztlQUFrQkEsT0FBTyxDQUFDLE9BQUQ7SUFBcEJDLGdCQUFBQTtJQUFLQyxnQkFBQUEsTUFDVjs7QUFDQTs7Ozs7QUFHQSxJQUFJQyxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2pCLGFBQVNELEVBQUUsQ0FBQ0UsU0FESztBQUdqQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsS0FBSyxFQUFLSixFQUFFLENBQUNLLEtBRkw7QUFHUkMsSUFBQUEsSUFBSSxFQUFLTixFQUFFLENBQUNPLE1BSEo7QUFJUkMsSUFBQUEsT0FBTyxFQUFFUixFQUFFLENBQUNPLE1BSko7QUFLUkUsSUFBQUEsTUFBTSxFQUFHVCxFQUFFLENBQUNPLE1BTEo7QUFPUjtBQUNBRyxJQUFBQSxZQUFZLEVBQUlWLEVBQUUsQ0FBQ1csS0FBSCxDQUFTQyxHQVJqQjtBQVNSQyxJQUFBQSxjQUFjLEVBQUViLEVBQUUsQ0FBQ1csS0FBSCxDQUFTRyxLQVRqQjtBQVVSQyxJQUFBQSxVQUFVLEVBQU1mLEVBQUUsQ0FBQ2dCLFdBVlg7QUFXUjtBQUNBQyxJQUFBQSxRQUFRLEVBQU07QUFBQztBQUNYLGlCQUFTLEVBREM7QUFFVkMsTUFBQUEsSUFBSSxFQUFLbEIsRUFBRSxDQUFDZ0I7QUFGRixLQVpOO0FBZ0JSRyxJQUFBQSxNQUFNLEVBQUM7QUFDSCxpQkFBUSxFQURMO0FBRUhELE1BQUFBLElBQUksRUFBQ2xCLEVBQUUsQ0FBQ2dCO0FBRkwsS0FoQkM7QUFvQlJJLElBQUFBLFVBQVUsRUFBSTtBQUNWLGlCQUFTLEVBREM7QUFFVkYsTUFBQUEsSUFBSSxFQUFLbEIsRUFBRSxDQUFDZ0I7QUFGRixLQXBCTjtBQXdCUkssSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsRUFEQztBQUVWSCxNQUFBQSxJQUFJLEVBQUtsQixFQUFFLENBQUNnQjtBQUZGLEtBeEJOO0FBNEJSTSxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUSxJQURDO0FBRVRKLE1BQUFBLElBQUksRUFBQ2xCLEVBQUUsQ0FBQ3VCO0FBRkMsS0E1Qkw7QUFnQ1JDLElBQUFBLEtBQUssRUFBUztBQUFDO0FBQ1gsaUJBQVMsQ0FEQztBQUVWTixNQUFBQSxJQUFJLEVBQUtsQixFQUFFLENBQUN5QixPQUZGO0FBR1ZDLE1BQUFBLE9BQU8sRUFBRTtBQUhDLEtBaENOO0FBcUNSQyxJQUFBQSxVQUFVLEVBQUk7QUFBRTtBQUNaLGlCQUFTLEtBREM7QUFFVkQsTUFBQUEsT0FBTyxFQUFFO0FBRkMsS0FyQ047QUF5Q1JFLElBQUFBLEtBQUssRUFBUztBQUFDO0FBQ1gsaUJBQVMsSUFEQztBQUVWVixNQUFBQSxJQUFJLEVBQUtsQixFQUFFLENBQUN1QixJQUZGO0FBR1ZHLE1BQUFBLE9BQU8sRUFBRTtBQUhDLEtBekNOO0FBOENSRyxJQUFBQSxTQUFTLEVBQUs7QUFDVixpQkFBUyxJQURDO0FBRVZILE1BQUFBLE9BQU8sRUFBRTtBQUZDLEtBOUNOO0FBa0RSSSxJQUFBQSxJQUFJLEVBQUU7QUFDRixpQkFBUyxJQURQO0FBRUZaLE1BQUFBLElBQUksRUFBS3JCLElBRlA7QUFHRjZCLE1BQUFBLE9BQU8sRUFBQztBQUhOO0FBbERFLEdBSEs7O0FBNERqQjs7OztBQUlBSyxFQUFBQSxRQUFRLEVBQUMsa0JBQVNILEtBQVQsRUFBZTtBQUNwQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSCxHQWxFZ0I7QUFtRWpCSSxFQUFBQSxNQUFNLEVBQUMsa0JBQVU7QUFDYixTQUFLVixZQUFMLENBQWtCVyxNQUFsQixHQUEyQixLQUEzQixDQURhLENBRWI7O0FBQ0EsUUFBRyxLQUFLSCxJQUFSLEVBQWE7QUFDVixXQUFLSSxJQUFMLENBQVUsS0FBS0osSUFBZjtBQUNGOztBQUNELFNBQUtLLElBQUwsQ0FBVUMsRUFBVixDQUFhcEMsRUFBRSxDQUFDdUIsSUFBSCxDQUFRYyxTQUFSLENBQWtCQyxXQUEvQixFQUE0QyxLQUFLQyxPQUFqRCxFQUEwRCxJQUExRDtBQUNBLFNBQUtKLElBQUwsQ0FBVUMsRUFBVixDQUFhcEMsRUFBRSxDQUFDdUIsSUFBSCxDQUFRYyxTQUFSLENBQWtCRyxVQUEvQixFQUEyQyxLQUFLRCxPQUFoRCxFQUF5RCxJQUF6RDtBQUNBLFNBQUtKLElBQUwsQ0FBVUMsRUFBVixDQUFhcEMsRUFBRSxDQUFDdUIsSUFBSCxDQUFRYyxTQUFSLENBQWtCSSxTQUEvQixFQUEwQyxLQUFLRixPQUEvQyxFQUF3RCxJQUF4RDtBQUNBLFNBQUtKLElBQUwsQ0FBVUMsRUFBVixDQUFhcEMsRUFBRSxDQUFDdUIsSUFBSCxDQUFRYyxTQUFSLENBQWtCSyxZQUEvQixFQUE2QyxLQUFLSCxPQUFsRCxFQUEyRCxJQUEzRCxFQVRhLENBVWI7QUFFSCxHQS9FZ0I7QUFnRmpCSSxFQUFBQSxNQUFNLEVBQUMsa0JBQVU7QUFDYkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQWdCLEtBQUtmLElBQUwsQ0FBVWdCLFFBQVYsRUFBNUI7QUFDSCxHQWxGZ0I7QUFtRmpCUCxFQUFBQSxPQUFPLEVBQUMsaUJBQVNRLEtBQVQsRUFBZTtBQUNuQixRQUFHLEtBQUtuQixLQUFSLEVBQWM7QUFDVixVQUFJb0IsV0FBVyxHQUFHLElBQUloRCxFQUFFLENBQUNpRCxLQUFILENBQVNDLFdBQWIsQ0FBeUIsWUFBekIsRUFBdUMsSUFBdkMsQ0FBbEI7QUFDQUYsTUFBQUEsV0FBVyxDQUFDRyxXQUFaLENBQXdCO0FBQ3BCckIsUUFBQUEsSUFBSSxFQUFDLElBRGU7QUFFcEJpQixRQUFBQSxLQUFLLEVBQUNBO0FBRmMsT0FBeEI7QUFJQSxXQUFLWixJQUFMLENBQVVpQixhQUFWLENBQXdCSixXQUF4QixFQU5VLENBT1Y7QUFDQTtBQUNILEtBVEQsTUFTSztBQUNESixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBNEIsS0FBS1EsRUFBN0M7QUFDSDtBQUNKLEdBaEdnQjtBQWlHakJDLEVBQUFBLEtBQUssRUFBQyxpQkFBVTtBQUNaLFNBQUtuQixJQUFMLENBQVVpQixhQUFWLENBQXlCLElBQUlwRCxFQUFFLENBQUNpRCxLQUFILENBQVNDLFdBQWIsQ0FBeUIsV0FBekIsRUFBc0MsSUFBdEMsQ0FBekI7QUFDSCxHQW5HZ0I7QUFvR2pCSyxFQUFBQSxPQUFPLEVBQUMsaUJBQVN6QixJQUFULEVBQWM7QUFDbEI7QUFDQSxTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSCxHQXZHZ0I7QUF3R2pCO0FBQ0FJLEVBQUFBLElBQUksRUFBRSxjQUFVSixJQUFWLEVBQWdCO0FBQ2xCO0FBQ0EsU0FBS3hCLElBQUwsQ0FBVWtELFdBQVYsR0FBd0IsS0FBS25DLFlBQUwsQ0FBa0JTLElBQUksQ0FBQ3hCLElBQXZCLENBQXhCLENBRmtCLENBSWxCOztBQUNBLFFBQUl3QixJQUFJLENBQUMyQixTQUFULEVBQW9CO0FBQ2hCLFdBQUtyRCxLQUFMLENBQVcrQixJQUFYLENBQWdCdUIsS0FBaEIsR0FBd0IsS0FBS2hELFlBQTdCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS04sS0FBTCxDQUFXK0IsSUFBWCxDQUFnQnVCLEtBQWhCLEdBQXdCLEtBQUs3QyxjQUE3QjtBQUNIOztBQUNELFNBQUtULEtBQUwsQ0FBV3VELE1BQVgsR0FBb0I3QixJQUFJLENBQUM4QixTQUF6QixDQVZrQixDQVlsQjs7QUFDQSxRQUFHOUIsSUFBSSxDQUFDK0IsS0FBUixFQUFjO0FBQ1YsV0FBS3JELE9BQUwsQ0FBYWdELFdBQWIsR0FBMkIsS0FBS3JDLE1BQUwsQ0FBWVcsSUFBSSxDQUFDeEIsSUFBakIsQ0FBM0I7QUFDSCxLQUZELE1BRU0sSUFBR3dCLElBQUksQ0FBQ2dDLE1BQVIsRUFBZTtBQUNqQixXQUFLdEQsT0FBTCxDQUFhZ0QsV0FBYixHQUEyQixLQUFLdkMsUUFBTCxDQUFjYSxJQUFJLENBQUMxQixLQUFMLEdBQWEsQ0FBM0IsQ0FBM0I7O0FBQ0EsVUFBSTBCLElBQUksQ0FBQzJCLFNBQVQsRUFBb0I7QUFDaEIsYUFBS2pELE9BQUwsQ0FBYTJCLElBQWIsQ0FBa0J1QixLQUFsQixHQUEwQixLQUFLaEQsWUFBL0I7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLRixPQUFMLENBQWEyQixJQUFiLENBQWtCdUIsS0FBbEIsR0FBMEIxRCxFQUFFLENBQUNXLEtBQUgsQ0FBU0csS0FBbkM7QUFDSDtBQUNKLEtBUEssTUFPRDtBQUNEO0FBQ0EsV0FBS04sT0FBTCxDQUFhZ0QsV0FBYixHQUEyQixLQUFLcEMsVUFBTCxDQUFnQlUsSUFBSSxDQUFDeEIsSUFBckIsQ0FBM0I7QUFDSDtBQUNKLEdBbklnQjtBQXFJakJ5RCxFQUFBQSxpQkFBaUIsRUFBQywyQkFBVUMsR0FBVixFQUFlO0FBQzdCLFNBQUs3QixJQUFMLENBQVU4QixXQUFWLENBQXNCRCxHQUFHLENBQUNFLENBQUosR0FBUSxFQUE5QixFQUFpQ0YsR0FBRyxDQUFDRyxDQUFKLEdBQVEsRUFBekM7QUFDSCxHQXZJZ0I7QUF3SWpCQyxFQUFBQSxVQUFVLEVBQUMsb0JBQVVDLENBQVYsRUFBYTtBQUNwQixTQUFLL0MsWUFBTCxDQUFrQlcsTUFBbEIsR0FBMkIsQ0FBQ29DLENBQTVCO0FBQ0g7QUExSWdCLENBQVQsQ0FBWiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtDYXJkLFJhbmt9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG4vLyBpbXBvcnQge0NhcmR9IGZyb20gXCJUeXBlc1wiO1xyXG4vKipcclxuICogQGNsYXNzIENDYXJkXHJcbiAqL1xyXG52YXIgQ0NhcmQgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIG5vZGVzXHJcbiAgICAgICAgcG9pbnQgICA6IGNjLkxhYmVsLFxyXG4gICAgICAgIHN1aXQgICA6IGNjLlNwcml0ZSxcclxuICAgICAgICBtYWluUGljOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgY2FyZEJHIDogY2MuU3ByaXRlLFxyXG5cclxuICAgICAgICAvLyByZXNvdXJjZXNcclxuICAgICAgICByZWRUZXh0Q29sb3IgIDogY2MuQ29sb3IuUkVELFxyXG4gICAgICAgIGJsYWNrVGV4dENvbG9yOiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICB0ZXhGcm9udEJHICAgIDogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgLy8gdGV4QmFja0JHICAgICA6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIHRleEZhY2VzICAgIDogey8vSixRLEtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXhBY2U6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXhTdWl0QmlnICA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXhTdWl0U21hbGw6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGUgICA6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXllclN1Z2dlc3Q6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5kZXggICAgICAgOiB7Ly92aSB0cmkgdHJvbmcgZ3JvdXAga2hpIGRhbmggcmFcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZSAgIDogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU2VsZWN0ZWQgIDogeyAvLyB0cmFuZyB0aGFpIGNvIHNlbGVjdCBraG9uZ1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIG93bmVyICAgICAgIDogey8vc28gaHV1IHF1YW4gYmFpLCBteVBsYXllciBob2FjIGRvY2sgZHVvaSB0YWJsZVxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlICAgOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNEcmFnaW5nICAgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGUgICA6IENhcmQsXHJcbiAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbXkgcGxheWVyIHwgZG9ja1xyXG4gICAgICogQHBhcmFtIG93bmVyIHtjYy5Ob2RlfVxyXG4gICAgICovXHJcbiAgICBzZXRPd25lcjpmdW5jdGlvbihvd25lcil7XHJcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubGF5ZXJTdWdnZXN0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZENhcmQ6XCIgKyB0aGlzLmNhcmQgK1wifFwiICsgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgaWYodGhpcy5jYXJkKXtcclxuICAgICAgICAgICB0aGlzLmluaXQodGhpcy5jYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2gsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUub24oXCJjYXJkLXRvdWNoXCIsdGhpcy5vbkVtaXQsdGhpcyk7XHJcblxyXG4gICAgfSxcclxuICAgIG9uRW1pdDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FyZC10b3VjaDpcIiArIHRoaXMuY2FyZC50b1N0cmluZygpKTtcclxuICAgIH0sXHJcbiAgICBvblRvdWNoOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZih0aGlzLm93bmVyKXtcclxuICAgICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCdjYXJkLXRvdWNoJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN1c3RvbUV2ZW50LnNldFVzZXJEYXRhKHtcclxuICAgICAgICAgICAgICAgIGNhcmQ6dGhpcyxcclxuICAgICAgICAgICAgICAgIGV2ZW50OmV2ZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XHJcbiAgICAgICAgICAgIC8vIHZhciBjUGxheWVyID0gdGhpcy5vd25lci5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpO1xyXG4gICAgICAgICAgICAvLyBjUGxheWVyLm9uVG91Y2hDYXJkKGV2ZW50LHRoaXMpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBmb3VuZCBvd25lcidzIGNhcmQ6XCIgKyB0aGlzLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudCggbmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKCdjYXJkdG91Y2gnLCB0cnVlKSApO1xyXG4gICAgfSxcclxuICAgIHNldENhcmQ6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzZXRDYXJkOlwiICsgY2FyZCArXCJ8cG9pbnQ6XCIgKyBjYXJkLnBvaW50ICtcInxzdWl0OlwiICsgY2FyZC5zdWl0KTtcclxuICAgICAgICB0aGlzLmNhcmQgPSBjYXJkO1xyXG4gICAgfSxcclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICAvL2NoYXRcclxuICAgICAgICB0aGlzLnN1aXQuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRTbWFsbFtjYXJkLnN1aXRdO1xyXG5cclxuICAgICAgICAvL3NvXHJcbiAgICAgICAgaWYgKGNhcmQuaXNSZWRTdWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnQubm9kZS5jb2xvciA9IHRoaXMucmVkVGV4dENvbG9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnQubm9kZS5jb2xvciA9IHRoaXMuYmxhY2tUZXh0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9pbnQuc3RyaW5nID0gY2FyZC5wb2ludE5hbWU7XHJcblxyXG4gICAgICAgIC8vaGluaFxyXG4gICAgICAgIGlmKGNhcmQuaXNBY2Upe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5QaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnRleEFjZVtjYXJkLnN1aXRdO1xyXG4gICAgICAgIH1lbHNlIGlmKGNhcmQuaXNGYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluUGljLnNwcml0ZUZyYW1lID0gdGhpcy50ZXhGYWNlc1tjYXJkLnBvaW50IC0gOF07XHJcbiAgICAgICAgICAgIGlmIChjYXJkLmlzUmVkU3VpdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluUGljLm5vZGUuY29sb3IgPSB0aGlzLnJlZFRleHRDb2xvcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblBpYy5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy9iaW5oIHRodW9uZyAyLT4xMFxyXG4gICAgICAgICAgICB0aGlzLm1haW5QaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRCaWdbY2FyZC5zdWl0XTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBvc2l0aW9uQ2VudGVyOmZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zLnggLSA3Myxwb3MueSAtIDk4KTtcclxuICAgIH0sXHJcbiAgICBzZXRTdWdnZXN0OmZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgdGhpcy5sYXllclN1Z2dlc3QuYWN0aXZlID0gIWI7XHJcbiAgICB9XHJcbn0pOyJdfQ==