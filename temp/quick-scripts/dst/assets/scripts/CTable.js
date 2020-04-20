
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
    this.cards = [];
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
  },
  onNewRound: function onNewRound() {
    var l = this.cards.length;

    for (var i = 0; i < l; i++) {
      var card = this.cards[i];
      card.runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(0.5)));
    }
  },
  addCards: function addCards(cards) {
    var l = cards.length;

    for (var i = 0; i < l; i++) {
      this.cards.push(cards[i]);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1RhYmxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJUYWJsZSIsIkNhcmQiLCJVdGlsaXR5IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYlBvdCIsIkxhYmVsIiwibGJJZCIsImxiU3Rha2UiLCJjdG9yIiwibnVtQ2FyZCIsInRhYmxlIiwiY2FyZHMiLCJvbkxvYWQiLCJzdHJpbmciLCJmb3JtYXRNb25leUZ1bGwiLCJwb3QiLCJmb3JtYXRNb25leSIsImlkIiwic3Rha2UiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFydCIsInNldFRhYmxlIiwiZ2V0UG9zaXRpb25DYXJkIiwiY2FyZCIsImluZGV4IiwiZ2V0UG9zaXRpb25WaWEiLCJudW0iLCJ5Iiwic3RhcnRYIiwiZW5kWCIsIm1heE9mZnNldFgiLCJvZmZzZXQiLCJWZWMyIiwic2V0TnVtQ2FyZCIsIm51bWJlciIsIm9uTmV3Um91bmQiLCJsIiwibGVuZ3RoIiwiaSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiZmFkZU91dCIsImFkZENhcmRzIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBbUJBLE9BQU8sQ0FBQyxPQUFEO0lBQXJCQyxpQkFBQUE7SUFBTUMsZ0JBQUFBOztBQUNYLElBQUlDLE9BQU8sR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0FJLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUNKLEVBQUUsQ0FBQ0ssS0FERDtBQUVSQyxJQUFBQSxJQUFJLEVBQUNOLEVBQUUsQ0FBQ0ssS0FGQTtBQUdSRSxJQUFBQSxPQUFPLEVBQUNQLEVBQUUsQ0FBQ0s7QUFISCxHQUhQO0FBUUxHLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLE9BQUwsR0FBZSxD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STBCLENBQUMsR0FBRzFCLEtBQUssQ0FBQzJCLE1BQWQ7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixDQUFwQixFQUF1QkUsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QixXQUFLNUIsS0FBTCxDQUFXa0MsSUFBWCxDQUFnQmxDLEtBQUssQ0FBQzRCLENBQUQsQ0FBckI7QUFDSDtBQUNKLEdBeEVJLENBeUVMOztBQXpFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1RhYmxlLENhcmR9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxiUG90OmNjLkxhYmVsLFxyXG4gICAgICAgIGxiSWQ6Y2MuTGFiZWwsXHJcbiAgICAgICAgbGJTdGFrZTpjYy5MYWJlbFxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm51bUNhcmQgPSAwO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7VGFibGV9Ki9cclxuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhcmRzID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYodGhpcy50YWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMubGJQb3Quc3RyaW5nID0gVXRpbGl0eS5mb3JtYXRNb25leUZ1bGwodGhpcy50YWJsZS5wb3QpO1xyXG4gICAgICAgICAgICB0aGlzLmxiSWQuc3RyaW5nID0gXCI6IFwiICsgVXRpbGl0eS5mb3JtYXRNb25leSh0aGlzLnRhYmxlLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5sYlN0YWtlLnN0cmluZyA9IFwiOiBcIiArIFV0aWxpdHkuZm9ybWF0TW9uZXkodGhpcy50YWJsZS5zdGFrZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuZWVkIHNldFRhYmxlIGJlZm9yZSBsb2FkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8vIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiUG90LDEwMDAwMDAsNTAwMDAwMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUYWJsZTpmdW5jdGlvbih0YWJsZSl7XHJcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjYXJkIHtDQ2FyZH1cclxuICAgICAqL1xyXG4gICAgZ2V0UG9zaXRpb25DYXJkOmZ1bmN0aW9uIChjYXJkKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gY2FyZC5pbmRleDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQb3NpdGlvblZpYShpbmRleCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UG9zaXRpb25WaWE6ZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIHZhciBudW0gPSB0aGlzLm51bUNhcmQgPiAwID8gdGhpcy5udW1DYXJkIDogMTtcclxuICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IC0gMjUwO1xyXG4gICAgICAgIHZhciBlbmRYID0gMjUwO1xyXG4gICAgICAgIHZhciBtYXhPZmZzZXRYID0gNTA7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IChlbmRYIC0gc3RhcnRYKSAvIChudW0gLSAxKTtcclxuICAgICAgICBpZihvZmZzZXQgPiBtYXhPZmZzZXRYKSBvZmZzZXQgPSBtYXhPZmZzZXRYO1xyXG4gICAgICAgIC8vcmUtY2FsbCBzdGFydFg7XHJcbiAgICAgICAgc3RhcnRYID0gc3RhcnRYICsgIChlbmRYIC0gc3RhcnRYIC0gKG9mZnNldCAqKG51bSAtIDEpKSkvMjtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLlZlYzIoc3RhcnRYICsgKG9mZnNldCAqIGluZGV4KSAtIDczLCB5IC0gOTgpO1xyXG4gICAgfSxcclxuICAgIHNldE51bUNhcmQ6ZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtQ2FyZCA9IG51bWJlcjtcclxuICAgIH0sXHJcbiAgICBvbk5ld1JvdW5kOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbCA9IHRoaXMuY2FyZHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXJkID0gdGhpcy5jYXJkc1tpXTtcclxuICAgICAgICAgICAgY2FyZC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuNSlcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWRkQ2FyZHM6ZnVuY3Rpb24gKGNhcmRzKSB7XHJcbiAgICAgICAgdmFyIGwgPSBjYXJkcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==