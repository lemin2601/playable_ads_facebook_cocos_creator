
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
    return new cc.Vec2(startX + offset * index, y);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1RhYmxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJUYWJsZSIsIkNhcmQiLCJVdGlsaXR5IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYlBvdCIsIkxhYmVsIiwibGJJZCIsImxiU3Rha2UiLCJjdG9yIiwibnVtQ2FyZCIsInRhYmxlIiwib25Mb2FkIiwic3RyaW5nIiwiZm9ybWF0TW9uZXlGdWxsIiwicG90IiwiZm9ybWF0TW9uZXkiLCJpZCIsInN0YWtlIiwiY29uc29sZSIsImVycm9yIiwic3RhcnQiLCJzZXRUYWJsZSIsImdldFBvc2l0aW9uQ2FyZCIsImNhcmQiLCJpbmRleCIsImdldFBvc2l0aW9uVmlhIiwibnVtIiwieSIsInN0YXJ0WCIsImVuZFgiLCJtYXhPZmZzZXRYIiwib2Zmc2V0IiwiVmVjMiIsInNldE51bUNhcmQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQW1CQSxPQUFPLENBQUMsT0FBRDtJQUFyQkMsaUJBQUFBO0lBQU1DLGdCQUFBQTs7QUFDWCxJQUFJQyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDSixFQUFFLENBQUNLLEtBREQ7QUFFUkMsSUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNLLEtBRkE7QUFHUkUsSUFBQUEsT0FBTyxFQUFDUCxFQUFFLENBQUNLO0FBSEgsR0FIUDtBQVFMRyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBOztBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0gsR0FaSTtBQWNMO0FBRUFDLEVBQUFBLE1BaEJLLG9CQWdCSztBQUNOLFFBQUcsS0FBS0QsS0FBUixFQUFjO0FBQ1YsV0FBS04sS0FBTCxDQUFXUSxNQUFYLEdBQW9CYixPQUFPLENBQUNjLGVBQVIsQ0FBd0IsS0FBS0gsS0FBTCxDQUFXSSxHQUFuQyxDQUFwQjtBQUNBLFdBQUtSLElBQUwsQ0FBVU0sTUFBVixHQUFtQixPQUFPYixPQUFPLENBQUNnQixXQUFSLENBQW9CLEtBQUtMLEtBQUwsQ0FBV00sRUFBL0IsQ0FBMUI7QUFDQSxXQUFLVCxPQUFMLENBQWFLLE1BQWIsR0FBc0IsT0FBT2IsT0FBTyxDQUFDZ0IsV0FBUixDQUFvQixLQUFLTCxLQUFMLENBQVdPLEtBQS9CLENBQTdCO0FBQ0gsS0FKRCxNQUlLO0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkO0FBQ0g7QUFDSixHQXhCSTtBQTBCTEMsRUFBQUEsS0ExQkssbUJBMEJJLENBQ0w7QUFDSCxHQTVCSTtBQThCTEMsRUFBQUEsUUFBUSxFQUFDLGtCQUFTWCxLQUFULEVBQWU7QUFDcEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0gsR0FoQ0k7O0FBaUNMOzs7O0FBSUFZLEVBQUFBLGVBQWUsRUFBQyx5QkFBVUMsSUFBVixFQUFnQjtBQUM1QixRQUFJQyxLQUFLLEdBQUdELElBQUksQ0FBQ0MsS0FBakI7QUFDQSxXQUFPLEtBQUtDLGNBQUwsQ0FBb0JELEtBQXBCLENBQVA7QUFDSCxHQXhDSTtBQXlDTEMsRUFBQUEsY0FBYyxFQUFDLHdCQUFTRCxLQUFULEVBQWU7QUFDMUIsUUFBSUUsR0FBRyxHQUFHLEtBQUtqQixPQUFMLEdBQWUsQ0FBZixHQUFtQixLQUFLQSxPQUF4QixHQUFrQyxDQUE1QztBQUNBLFFBQUlrQixDQUFDLEdBQUcsQ0FBUjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFFLEdBQWY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsR0FBWDtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFDRixJQUFJLEdBQUdELE1BQVIsS0FBbUJGLEdBQUcsR0FBRyxDQUF6QixDQUFiO0FBQ0EsUUFBR0ssTUFBTSxHQUFHRCxVQUFaLEVBQXdCQyxNQUFNLEdBQUdELFVBQVQsQ0FQRSxDQVExQjs7QUFDQUYsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUksQ0FBQ0MsSUFBSSxHQUFHRCxNQUFQLEdBQWlCRyxNQUFNLElBQUdMLEdBQUcsR0FBRyxDQUFULENBQXhCLElBQXNDLENBQXpEO0FBQ0EsV0FBTyxJQUFJMUIsRUFBRSxDQUFDZ0MsSUFBUCxDQUFZSixNQUFNLEdBQUlHLE1BQU0sR0FBR1AsS0FBL0IsRUFBdUNHLENBQXZDLENBQVA7QUFDSCxHQXBESTtBQXFETE0sRUFBQUEsVUFBVSxFQUFDLG9CQUFVQyxNQUFWLEVBQWtCO0FBQ3pCLFNBQUt6QixPQUFMLEdBQWV5QixNQUFmO0FBQ0gsR0F2REksQ0F3REw7O0FBeERLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7VGFibGUsQ2FyZH0gPSByZXF1aXJlKFwiVHlwZXNcIik7XHJcbnZhciBVdGlsaXR5ID0gcmVxdWlyZShcIlV0aWxpdHlcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGJQb3Q6Y2MuTGFiZWwsXHJcbiAgICAgICAgbGJJZDpjYy5MYWJlbCxcclxuICAgICAgICBsYlN0YWtlOmNjLkxhYmVsXHJcbiAgICB9LFxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubnVtQ2FyZCA9IDA7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtUYWJsZX0qL1xyXG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGlmKHRoaXMudGFibGUpe1xyXG4gICAgICAgICAgICB0aGlzLmxiUG90LnN0cmluZyA9IFV0aWxpdHkuZm9ybWF0TW9uZXlGdWxsKHRoaXMudGFibGUucG90KTtcclxuICAgICAgICAgICAgdGhpcy5sYklkLnN0cmluZyA9IFwiOiBcIiArIFV0aWxpdHkuZm9ybWF0TW9uZXkodGhpcy50YWJsZS5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMubGJTdGFrZS5zdHJpbmcgPSBcIjogXCIgKyBVdGlsaXR5LmZvcm1hdE1vbmV5KHRoaXMudGFibGUuc3Rha2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmVlZCBzZXRUYWJsZSBiZWZvcmUgbG9hZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAvLyBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYlBvdCwxMDAwMDAwLDUwMDAwMDAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VGFibGU6ZnVuY3Rpb24odGFibGUpe1xyXG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2FyZCB7Q0NhcmR9XHJcbiAgICAgKi9cclxuICAgIGdldFBvc2l0aW9uQ2FyZDpmdW5jdGlvbiAoY2FyZCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNhcmQuaW5kZXg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9zaXRpb25WaWEoaW5kZXgpO1xyXG4gICAgfSxcclxuICAgIGdldFBvc2l0aW9uVmlhOmZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICB2YXIgbnVtID0gdGhpcy5udW1DYXJkID4gMCA/IHRoaXMubnVtQ2FyZCA6IDE7XHJcbiAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgIHZhciBzdGFydFggPSAtIDI1MDtcclxuICAgICAgICB2YXIgZW5kWCA9IDI1MDtcclxuICAgICAgICB2YXIgbWF4T2Zmc2V0WCA9IDUwO1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSAoZW5kWCAtIHN0YXJ0WCkgLyAobnVtIC0gMSk7XHJcbiAgICAgICAgaWYob2Zmc2V0ID4gbWF4T2Zmc2V0WCkgb2Zmc2V0ID0gbWF4T2Zmc2V0WDtcclxuICAgICAgICAvL3JlLWNhbGwgc3RhcnRYO1xyXG4gICAgICAgIHN0YXJ0WCA9IHN0YXJ0WCArICAoZW5kWCAtIHN0YXJ0WCAtIChvZmZzZXQgKihudW0gLSAxKSkpLzI7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMyKHN0YXJ0WCArIChvZmZzZXQgKiBpbmRleCksIHkpO1xyXG4gICAgfSxcclxuICAgIHNldE51bUNhcmQ6ZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtQ2FyZCA9IG51bWJlcjtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19