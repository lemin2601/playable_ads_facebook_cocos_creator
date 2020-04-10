
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
      this.lbPot.string = Utility.formatMoney(this.table.pot);
      this.lbId.string = Utility.formatMoney(this.table.id);
      this.lbStake.string = Utility.formatMoney(this.table.stake);
    } else {
      console.error("need setTable before load");
    }
  },
  start: function start() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1RhYmxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJUYWJsZSIsIkNhcmQiLCJVdGlsaXR5IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYlBvdCIsIkxhYmVsIiwibGJJZCIsImxiU3Rha2UiLCJjdG9yIiwibnVtQ2FyZCIsInRhYmxlIiwib25Mb2FkIiwic3RyaW5nIiwiZm9ybWF0TW9uZXkiLCJwb3QiLCJpZCIsInN0YWtlIiwiY29uc29sZSIsImVycm9yIiwic3RhcnQiLCJzZXRUYWJsZSIsImdldFBvc2l0aW9uQ2FyZCIsImNhcmQiLCJpbmRleCIsImdldFBvc2l0aW9uVmlhIiwibnVtIiwieSIsInN0YXJ0WCIsImVuZFgiLCJtYXhPZmZzZXRYIiwib2Zmc2V0IiwiVmVjMiIsInNldE51bUNhcmQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQW1CQSxPQUFPLENBQUMsT0FBRDtJQUFyQkMsaUJBQUFBO0lBQU1DLGdCQUFBQTs7QUFDWCxJQUFJQyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBSSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDSixFQUFFLENBQUNLLEtBREQ7QUFFUkMsSUFBQUEsSUFBSSxFQUFDTixFQUFFLENBQUNLLEtBRkE7QUFHUkUsSUFBQUEsT0FBTyxFQUFDUCxFQUFFLENBQUNLO0FBSEgsR0FIUDtBQVFMRyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBOztBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0gsR0FaSTtBQWNMO0FBRUFDLEVBQUFBLE1BaEJLLG9CQWdCSztBQUNOLFFBQUcsS0FBS0QsS0FBUixFQUFjO0FBQ1YsV0FBS04sS0FBTCxDQUFXUSxNQUFYLEdBQW9CYixPQUFPLENBQUNjLFdBQVIsQ0FBb0IsS0FBS0gsS0FBTCxDQUFXSSxHQUEvQixDQUFwQjtBQUNBLFdBQUtSLElBQUwsQ0FBVU0sTUFBVixHQUFtQmIsT0FBTyxDQUFDYyxXQUFSLENBQW9CLEtBQUtILEtBQUwsQ0FBV0ssRUFBL0IsQ0FBbkI7QUFDQSxXQUFLUixPQUFMLENBQWFLLE1BQWIsR0FBc0JiLE9BQU8sQ0FBQ2MsV0FBUixDQUFvQixLQUFLSCxLQUFMLENBQVdNLEtBQS9CLENBQXRCO0FBQ0gsS0FKRCxNQUlLO0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJCQUFkO0FBQ0g7QUFDSixHQXhCSTtBQTBCTEMsRUFBQUEsS0ExQkssbUJBMEJJLENBQUUsQ0ExQk47QUE0QkxDLEVBQUFBLFFBQVEsRUFBQyxrQkFBU1YsS0FBVCxFQUFlO0FBQ3BCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNILEdBOUJJOztBQStCTDs7OztBQUlBVyxFQUFBQSxlQUFlLEVBQUMseUJBQVVDLElBQVYsRUFBZ0I7QUFDNUIsUUFBSUMsS0FBSyxHQUFHRCxJQUFJLENBQUNDLEtBQWpCO0FBQ0EsV0FBTyxLQUFLQyxjQUFMLENBQW9CRCxLQUFwQixDQUFQO0FBQ0gsR0F0Q0k7QUF1Q0xDLEVBQUFBLGNBQWMsRUFBQyx3QkFBU0QsS0FBVCxFQUFlO0FBQzFCLFFBQUlFLEdBQUcsR0FBRyxLQUFLaEIsT0FBTCxHQUFlLENBQWYsR0FBbUIsS0FBS0EsT0FBeEIsR0FBa0MsQ0FBNUM7QUFDQSxRQUFJaUIsQ0FBQyxHQUFHLENBQVI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBRSxHQUFmO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEdBQVg7QUFDQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBQ0YsSUFBSSxHQUFHRCxNQUFSLEtBQW1CRixHQUFHLEdBQUcsQ0FBekIsQ0FBYjtBQUNBLFFBQUdLLE1BQU0sR0FBR0QsVUFBWixFQUF3QkMsTUFBTSxHQUFHRCxVQUFULENBUEUsQ0FRMUI7O0FBQ0FGLElBQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFJLENBQUNDLElBQUksR0FBR0QsTUFBUCxHQUFpQkcsTUFBTSxJQUFHTCxHQUFHLEdBQUcsQ0FBVCxDQUF4QixJQUFzQyxDQUF6RDtBQUNBLFdBQU8sSUFBSXpCLEVBQUUsQ0FBQytCLElBQVAsQ0FBWUosTUFBTSxHQUFJRyxNQUFNLEdBQUdQLEtBQS9CLEVBQXVDRyxDQUF2QyxDQUFQO0FBQ0gsR0FsREk7QUFtRExNLEVBQUFBLFVBQVUsRUFBQyxvQkFBVUMsTUFBVixFQUFrQjtBQUN6QixTQUFLeEIsT0FBTCxHQUFld0IsTUFBZjtBQUNILEdBckRJLENBc0RMOztBQXRESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1RhYmxlLENhcmR9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxiUG90OmNjLkxhYmVsLFxyXG4gICAgICAgIGxiSWQ6Y2MuTGFiZWwsXHJcbiAgICAgICAgbGJTdGFrZTpjYy5MYWJlbFxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm51bUNhcmQgPSAwO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7VGFibGV9Ki9cclxuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZih0aGlzLnRhYmxlKXtcclxuICAgICAgICAgICAgdGhpcy5sYlBvdC5zdHJpbmcgPSBVdGlsaXR5LmZvcm1hdE1vbmV5KHRoaXMudGFibGUucG90KTtcclxuICAgICAgICAgICAgdGhpcy5sYklkLnN0cmluZyA9IFV0aWxpdHkuZm9ybWF0TW9uZXkodGhpcy50YWJsZS5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMubGJTdGFrZS5zdHJpbmcgPSBVdGlsaXR5LmZvcm1hdE1vbmV5KHRoaXMudGFibGUuc3Rha2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmVlZCBzZXRUYWJsZSBiZWZvcmUgbG9hZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHt9LFxyXG5cclxuICAgIHNldFRhYmxlOmZ1bmN0aW9uKHRhYmxlKXtcclxuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNhcmQge0NDYXJkfVxyXG4gICAgICovXHJcbiAgICBnZXRQb3NpdGlvbkNhcmQ6ZnVuY3Rpb24gKGNhcmQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBjYXJkLmluZGV4O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBvc2l0aW9uVmlhKGluZGV4KTtcclxuICAgIH0sXHJcbiAgICBnZXRQb3NpdGlvblZpYTpmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMubnVtQ2FyZCA+IDAgPyB0aGlzLm51bUNhcmQgOiAxO1xyXG4gICAgICAgIHZhciB5ID0gMDtcclxuICAgICAgICB2YXIgc3RhcnRYID0gLSAyNTA7XHJcbiAgICAgICAgdmFyIGVuZFggPSAyNTA7XHJcbiAgICAgICAgdmFyIG1heE9mZnNldFggPSA1MDtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gKGVuZFggLSBzdGFydFgpIC8gKG51bSAtIDEpO1xyXG4gICAgICAgIGlmKG9mZnNldCA+IG1heE9mZnNldFgpIG9mZnNldCA9IG1heE9mZnNldFg7XHJcbiAgICAgICAgLy9yZS1jYWxsIHN0YXJ0WDtcclxuICAgICAgICBzdGFydFggPSBzdGFydFggKyAgKGVuZFggLSBzdGFydFggLSAob2Zmc2V0ICoobnVtIC0gMSkpKS8yO1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuVmVjMihzdGFydFggKyAob2Zmc2V0ICogaW5kZXgpLCB5KTtcclxuICAgIH0sXHJcbiAgICBzZXROdW1DYXJkOmZ1bmN0aW9uIChudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm51bUNhcmQgPSBudW1iZXI7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==