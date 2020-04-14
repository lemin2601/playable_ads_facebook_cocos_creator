
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1RhYmxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJUYWJsZSIsIkNhcmQiLCJVdGlsaXR5IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYlBvdCIsIkxhYmVsIiwibGJJZCIsImxiU3Rha2UiLCJjdG9yIiwibnVtQ2FyZCIsInRhYmxlIiwib25Mb2FkIiwic3RyaW5nIiwiZm9ybWF0TW9uZXlGdWxsIiwicG90IiwiZm9ybWF0TW9uZXkiLCJpZCIsInN0YWtlIiwiY29uc29sZSIsImVycm9yIiwic3RhcnQiLCJzZXRUYWJsZSIsImdldFBvc2l0aW9uQ2FyZCIsImNhcmQiLCJpbmRleCIsImdldFBvc2l0aW9uVmlhIiwibnVtIiwieSIsInN0YXJ0WCIsImVuZFgiLCJtYXhPZmZzZXRYIiwib2Zmc2V0IiwiVmVjMiIsInNldE51bUNhcmQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQW1CQSxPQUFPLENBQUMsT0FBRDtJQUFyQkMsaUJBQUFBO0lBQU1DLGdCQUFBQTs7QUFDWCxJQUFJQyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDSixFQUFFLENBQUNLLEtBREQ7QUFFUkMsSUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNLLEtBRkE7QUFHUkUsSUFBQUEsT0FBTyxFQUFDUCxFQUFFLENBQUNLO0FBSEgsR0FIUDtBQVFMRyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBOztBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0gsR0FaSTtBQWNMO0FBRUFDLEVBQUFBLE1BaEJLLG9CQWdCSztBQUNOLFFBQUcsS0FBS0QsS0FBUixFQUFjO0FBQ1YsV0FBS04sS0FBTCxDQUFXUSxNQUFYLEdBQW9CYixPQUFPLENBQUNjLGVBQVIsQ0FBd0IsS0FBS0gsS0FBTCxDQUFXSSxHQUFuQyxDQUFwQjtBQUNBLFdBQUtSLElBQUwsQ0FBVU0sTUFBVixHQUFtQixPQUFPYixPQUFPLENBQUNnQixXQUFSLENBQW9CLEtBQUtMLEtBQUwsQ0FBV00sRUFBL0IsQ0FBMUI7QUFDQSxXQUFLVCxPQUFMLENBQWFLLE1BQWIsR0FBc0IsT0FBT2IsT0FBTyxDQUFDZ0IsV0FBUixDQUFvQixLQUFLTCxLQUFMLENBQVdPLEtBQS9CLENBQTdCO0FBQ0gsS0FKRCxNQUlLO0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkO0FBQ0g7QUFDSixHQXhCSTtBQTBCTEMsRUFBQUEsS0ExQkssbUJBMEJJLENBQ0w7QUFDSCxHQTVCSTtBQThCTEMsRUFBQUEsUUFBUSxFQUFDLGtCQUFTWCxLQUFULEVBQWU7QUFDcEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0gsR0FoQ0k7O0FBaUNMOzs7O0FBSUFZLEVBQUFBLGVBQWUsRUFBQyx5QkFBVUMsSUFBVixFQUFnQjtBQUM1QixRQUFJQyxLQUFLLEdBQUdELElBQUksQ0FBQ0MsS0FBakI7QUFDQSxXQUFPLEtBQUtDLGNBQUwsQ0FBb0JELEtBQXBCLENBQVA7QUFDSCxHQXhDSTtBQXlDTEMsRUFBQUEsY0FBYyxFQUFDLHdCQUFTRCxLQUFULEVBQWU7QUFDMUIsUUFBSUUsR0FBRyxHQUFHLEtBQUtqQixPQUFMLEdBQWUsQ0FBZixHQUFtQixLQUFLQSxPQUF4QixHQUFrQyxDQUE1QztBQUNBLFFBQUlrQixDQUFDLEdBQUcsQ0FBUjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFFLEdBQWY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsR0FBWDtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBRyxDQUFDRixJQUFJLEdBQUdELE1BQVIsS0FBbUJGLEdBQUcsR0FBRyxDQUF6QixDQUFiO0FBQ0EsUUFBR0ssTUFBTSxHQUFHRCxVQUFaLEVBQXdCQyxNQUFNLEdBQUdELFVBQVQsQ0FQRSxDQVExQjs7QUFDQUYsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUksQ0FBQ0MsSUFBSSxHQUFHRCxNQUFQLEdBQWlCRyxNQUFNLElBQUdMLEdBQUcsR0FBRyxDQUFULENBQXhCLElBQXNDLENBQXpEO0FBQ0EsV0FBTyxJQUFJMUIsRUFBRSxDQUFDZ0MsSUFBUCxDQUFZSixNQUFNLEdBQUlHLE1BQU0sR0FBR1AsS0FBbkIsR0FBNEIsRUFBeEMsRUFBNENHLENBQUMsR0FBRyxFQUFoRCxDQUFQO0FBQ0gsR0FwREk7QUFxRExNLEVBQUFBLFVBQVUsRUFBQyxvQkFBVUMsTUFBVixFQUFrQjtBQUN6QixTQUFLekIsT0FBTCxHQUFleUIsTUFBZjtBQUNILEdBdkRJLENBd0RMOztBQXhESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1RhYmxlLENhcmR9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxiUG90OmNjLkxhYmVsLFxyXG4gICAgICAgIGxiSWQ6Y2MuTGFiZWwsXHJcbiAgICAgICAgbGJTdGFrZTpjYy5MYWJlbFxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm51bUNhcmQgPSAwO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7VGFibGV9Ki9cclxuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZih0aGlzLnRhYmxlKXtcclxuICAgICAgICAgICAgdGhpcy5sYlBvdC5zdHJpbmcgPSBVdGlsaXR5LmZvcm1hdE1vbmV5RnVsbCh0aGlzLnRhYmxlLnBvdCk7XHJcbiAgICAgICAgICAgIHRoaXMubGJJZC5zdHJpbmcgPSBcIjogXCIgKyBVdGlsaXR5LmZvcm1hdE1vbmV5KHRoaXMudGFibGUuaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmxiU3Rha2Uuc3RyaW5nID0gXCI6IFwiICsgVXRpbGl0eS5mb3JtYXRNb25leSh0aGlzLnRhYmxlLnN0YWtlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm5lZWQgc2V0VGFibGUgYmVmb3JlIGxvYWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgLy8gVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMubGJQb3QsMTAwMDAwMCw1MDAwMDAwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhYmxlOmZ1bmN0aW9uKHRhYmxlKXtcclxuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNhcmQge0NDYXJkfVxyXG4gICAgICovXHJcbiAgICBnZXRQb3NpdGlvbkNhcmQ6ZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBjYXJkLmluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBvc2l0aW9uVmlhKGluZGV4KTtcclxuICAgIH0sXHJcbiAgICBnZXRQb3NpdGlvblZpYTpmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMubnVtQ2FyZCA+IDAgPyB0aGlzLm51bUNhcmQgOiAxO1xyXG4gICAgICAgIHZhciB5ID0gMDtcclxuICAgICAgICB2YXIgc3RhcnRYID0gLSAyNTA7XHJcbiAgICAgICAgdmFyIGVuZFggPSAyNTA7XHJcbiAgICAgICAgdmFyIG1heE9mZnNldFggPSA1MDtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gKGVuZFggLSBzdGFydFgpIC8gKG51bSAtIDEpO1xyXG4gICAgICAgIGlmKG9mZnNldCA+IG1heE9mZnNldFgpIG9mZnNldCA9IG1heE9mZnNldFg7XHJcbiAgICAgICAgLy9yZS1jYWxsIHN0YXJ0WDtcclxuICAgICAgICBzdGFydFggPSBzdGFydFggKyAgKGVuZFggLSBzdGFydFggLSAob2Zmc2V0ICoobnVtIC0gMSkpKS8yO1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuVmVjMihzdGFydFggKyAob2Zmc2V0ICogaW5kZXgpIC0gNzMsIHkgLSA5OCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TnVtQ2FyZDpmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5udW1DYXJkID0gbnVtYmVyO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=