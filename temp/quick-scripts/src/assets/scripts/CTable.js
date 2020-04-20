"use strict";
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