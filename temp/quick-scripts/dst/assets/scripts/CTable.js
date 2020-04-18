
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CTable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '876d07NSSZBu4d949Frr7aA', 'CTable');
// scripts/CTable.js

"use strict";

var _require = require("Types"),
    Table = _require.Table,
    Card = _require.Card;

var Utility = require("Utility");

cc.Class({
  "extends": cc.Component,
  properties: {
    lbPot: cc.Label,
    lbId: cc.Label,
    lbStake: cc.Label
  },
  ctor: function ctor() {
    this.numCard = 0;
    /** @type {Table}*/

    this.table = null;
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.table) {
      this.lbPot.string = Utility.formatMoneyFull(this.table.pot);
      this.lbId.string = ": " + Utility.formatMoney(this.table.id);
      this.lbStake.string = ": " + Utility.formatMoney(this.table.stake);
    } else {
      console.error("need setTable before load");
    }
  },
  start: function start() {// Utility.runUpdateGold(this.lbPot,1000000,50000000);
  },
  setTable: function setTable(table) {
    this.table = table;
  },

  /**
   *
   * @param card {CCard}
   */
  getPositionCard: function getPositionCard(card) {
    var index = card.index;
    return this.getPositionVia(index);
  },
  getPositionVia: function getPositionVia(index) {
    var num = this.numCard > 0 ? this.numCard : 1;
    var y = 0;
    var startX = -250;
    var endX = 250;
    var maxOffsetX = 50;
    var offset = (endX - startX) / (num - 1);
    if (offset > maxOffsetX) offset = maxOffsetX; //re-call startX;

    startX = startX + (endX - startX - offset * (num - 1)) / 2;
    return new cc.Vec2(startX + offset * index - 73, y - 98);
  },
  setNumCard: function setNumCard(number) {
    this.numCard = number;
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NUYWJsZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiVGFibGUiLCJDYXJkIiwiVXRpbGl0eSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibGJQb3QiLCJMYWJlbCIsImxiSWQiLCJsYlN0YWtlIiwiY3RvciIsIm51bUNhcmQiLCJ0YWJsZSIsIm9uTG9hZCIsInN0cmluZyIsImZvcm1hdE1vbmV5RnVsbCIsInBvdCIsImZvcm1hdE1vbmV5IiwiaWQiLCJzdGFrZSIsImNvbnNvbGUiLCJlcnJvciIsInN0YXJ0Iiwic2V0VGFibGUiLCJnZXRQb3NpdGlvbkNhcmQiLCJjYXJkIiwiaW5kZXgiLCJnZXRQb3NpdGlvblZpYSIsIm51bSIsInkiLCJzdGFydFgiLCJlbmRYIiwibWF4T2Zmc2V0WCIsIm9mZnNldCIsIlZlYzIiLCJzZXROdW1DYXJkIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztlQUFtQkEsT0FBTyxDQUFDLE9BQUQ7SUFBckJDLGlCQUFBQTtJQUFNQyxnQkFBQUE7O0FBQ1gsSUFBSUMsT0FBTyxHQUFHSCxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUksRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBQ0osRUFBRSxDQUFDSyxLQUREO0FBRVJDLElBQUFBLElBQUksRUFBQ04sRUFBRSxDQUFDSyxLQUZBO0FBR1JFLElBQUFBLE9BQU8sRUFBQ1AsRUFBRSxDQUFDSztBQUhILEdBSFA7QUFRTEcsRUFBQUEsSUFBSSxFQUFDLGdCQUFVO0FBQ1gsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQTs7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNILEdBWkk7QUFjTDtBQUVBQyxFQUFBQSxNQWhCSyxvQkFnQks7QUFDTixRQUFHLEtBQUtELEtBQVIsRUFBYztBQUNWLFdBQUtOLEtBQUwsQ0FBV1EsTUFBWCxHQUFvQmIsT0FBTyxDQUFDYyxlQUFSLENBQXdCLEtBQUtILEtBQUwsQ0FBV0ksR0FBbkMsQ0FBcEI7QUFDQSxXQUFLUixJQUFMLENBQVVNLE1BQVYsR0FBbUIsT0FBT2IsT0FBTyxDQUFDZ0IsV0FBUixDQUFvQixLQUFLTCxLQUFMLENBQVdNLEVBQS9CLENBQTFCO0FBQ0EsV0FBS1QsT0FBTCxDQUFhSyxNQUFiLEdBQXNCLE9BQU9iLE9BQU8sQ0FBQ2dCLFdBQVIsQ0FBb0IsS0FBS0wsS0FBTCxDQUFXTyxLQUEvQixDQUE3QjtBQUNILEtBSkQsTUFJSztBQUNEQyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywyQkFBZDtBQUNIO0FBQ0osR0F4Qkk7QUEwQkxDLEVBQUFBLEtBMUJLLG1CQTBCSSxDQUNMO0FBQ0gsR0E1Qkk7QUE4QkxDLEVBQUFBLFFBQVEsRUFBQyxrQkFBU1gsS0FBVCxFQUFlO0FBQ3BCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNILEdBaENJOztBQWlDTDs7OztBQUlBWSxFQUFBQSxlQUFlLEVBQUMseUJBQVVDLElBQVYsRUFBZ0I7QUFDNUIsUUFBSUMsS0FBSyxHQUFHRCxJQUFJLENBQUNDLEtBQWpCO0FBQ0EsV0FBTyxLQUFLQyxjQUFMLENBQW9CRCxLQUFwQixDQUFQO0FBQ0gsR0F4Q0k7QUF5Q0xDLEVBQUFBLGNBQWMsRUFBQyx3QkFBU0QsS0FBVCxFQUFlO0FBQzFCLFFBQUlFLEdBQUcsR0FBRyxLQUFLakIsT0FBTCxHQUFlLENBQWYsR0FBbUIsS0FBS0EsT0FBeEIsR0FBa0MsQ0FBNUM7QUFDQSxRQUFJa0IsQ0FBQyxHQUFHLENBQVI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBRSxHQUFmO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEdBQVg7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBQ0YsSUFBSSxHQUFHRCxNQUFSLEtBQW1CRixHQUFHLEdBQUcsQ0FBekIsQ0FBYjtBQUNBLFFBQUdLLE1BQU0sR0FBR0QsVUFBWixFQUF3QkMsTUFBTSxHQUFHRCxVQUFULENBUEUsQ0FRMUI7O0FBQ0FGLElBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFJLENBQUNDLElBQUksR0FBR0QsTUFBUCxHQUFpQkcsTUFBTSxJQUFHTCxHQUFHLEdBQUcsQ0FBVCxDQUF4QixJQUFzQyxDQUF6RDtBQUNBLFdBQU8sSUFBSTFCLEVBQUUsQ0FBQ2dDLElBQVAsQ0FBWUosTUFBTSxHQUFJRyxNQUFNLEdBQUdQLEtBQW5CLEdBQTRCLEVBQXhDLEVBQTRDRyxDQUFDLEdBQUcsRUFBaEQsQ0FBUDtBQUNILEdBcERJO0FBcURMTSxFQUFBQSxVQUFVLEVBQUMsb0JBQVVDLE1BQVYsRUFBa0I7QUFDekIsU0FBS3pCLE9BQUwsR0FBZXlCLE1BQWY7QUFDSCxHQXZESSxDQXdETDs7QUF4REssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtUYWJsZSxDYXJkfSA9IHJlcXVpcmUoXCJUeXBlc1wiKTtcclxudmFyIFV0aWxpdHkgPSByZXF1aXJlKFwiVXRpbGl0eVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBsYlBvdDpjYy5MYWJlbCxcclxuICAgICAgICBsYklkOmNjLkxhYmVsLFxyXG4gICAgICAgIGxiU3Rha2U6Y2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5udW1DYXJkID0gMDtcclxuICAgICAgICAvKiogQHR5cGUge1RhYmxlfSovXHJcbiAgICAgICAgdGhpcy50YWJsZSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYodGhpcy50YWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMubGJQb3Quc3RyaW5nID0gVXRpbGl0eS5mb3JtYXRNb25leUZ1bGwodGhpcy50YWJsZS5wb3QpO1xyXG4gICAgICAgICAgICB0aGlzLmxiSWQuc3RyaW5nID0gXCI6IFwiICsgVXRpbGl0eS5mb3JtYXRNb25leSh0aGlzLnRhYmxlLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5sYlN0YWtlLnN0cmluZyA9IFwiOiBcIiArIFV0aWxpdHkuZm9ybWF0TW9uZXkodGhpcy50YWJsZS5zdGFrZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuZWVkIHNldFRhYmxlIGJlZm9yZSBsb2FkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8vIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiUG90LDEwMDAwMDAsNTAwMDAwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUYWJsZTpmdW5jdGlvbih0YWJsZSl7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYXJkIHtDQ2FyZH1cclxuICAgICAqL1xyXG4gICAgZ2V0UG9zaXRpb25DYXJkOmZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2FyZC5pbmRleDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQb3NpdGlvblZpYShpbmRleCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UG9zaXRpb25WaWE6ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIHZhciBudW0gPSB0aGlzLm51bUNhcmQgPiAwID8gdGhpcy5udW1DYXJkIDogMTtcclxuICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IC0gMjUwO1xyXG4gICAgICAgIHZhciBlbmRYID0gMjUwO1xyXG4gICAgICAgIHZhciBtYXhPZmZzZXRYID0gNTA7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IChlbmRYIC0gc3RhcnRYKSAvIChudW0gLSAxKTtcclxuICAgICAgICBpZihvZmZzZXQgPiBtYXhPZmZzZXRYKSBvZmZzZXQgPSBtYXhPZmZzZXRYO1xyXG4gICAgICAgIC8vcmUtY2FsbCBzdGFydFg7XHJcbiAgICAgICAgc3RhcnRYID0gc3RhcnRYICsgIChlbmRYIC0gc3RhcnRYIC0gKG9mZnNldCAqKG51bSAtIDEpKSkvMjtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLlZlYzIoc3RhcnRYICsgKG9mZnNldCAqIGluZGV4KSAtIDczLCB5IC0gOTgpO1xyXG4gICAgfSxcclxuICAgIHNldE51bUNhcmQ6ZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtQ2FyZCA9IG51bWJlcjtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19