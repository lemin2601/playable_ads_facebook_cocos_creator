"use strict";
cc._RF.push(module, 'c3f96EHNXtD9KukPp20CQBY', 'CEffectWin');
// scripts/CEffectWin.js

"use strict";

var Utility = require("Utility");

cc.Class({
  "extends": cc.Component,
  properties: {
    spine: {
      "default": null,
      type: cc.Node
    },
    lbLose1: {
      "default": null,
      type: cc.Label
    },
    lbLose2: {
      "default": null,
      type: cc.Label
    },
    imgLose1: {
      "default": null,
      type: cc.Sprite
    },
    imgLose2: {
      "default": null,
      type: cc.Sprite
    },
    lbWin: {
      "default": null,
      type: cc.Label
    },
    lbPot: {
      "default": null,
      type: cc.Label
    },
    player1: {
      "default": null,
      type: cc.Node
    },
    player2: {
      "default": null,
      type: cc.Node
    }
  },
  ctor: function ctor() {
    this.gameController = null;
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  onEnable: function onEnable() {
    var lose1 = 47000000;
    var lose2 = 58000000;
    var pot = 40000000;
    var win = pot + lose1 + lose2;
    Utility.runUpdateGold(this.lbLose1, 0, -lose1);
    Utility.runUpdateGold(this.lbLose2, 0, -lose2);
    Utility.runUpdateGold(this.lbPot, pot, 0);
    Utility.runUpdateGold(this.lbWin, 0, win);
    Utility.runUpdateGold(this.player1.getComponent("CPlayer").gold, lose1, 0);
    Utility.runUpdateGold(this.player2.getComponent("CPlayer").gold, lose2, 0);
    var emo = this.spine;
    var spine = emo.getComponent('sp.Skeleton');
    spine.clearTracks();
    spine.setCompleteListener(function (trackEntry) {// spine.clearTracks();
      // emo.active = false;
    });
    emo.active = true;
    spine.setAnimation(0, 'animation', false);
    this.node.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(function () {
      this.imgLose1.node.active = false;
      this.imgLose2.node.active = false;
      this.lbWin.node.active = false;
      this.showNodeCHPlay();
    }, this)));
  },
  showNodeCHPlay: function showNodeCHPlay() {
    this.gameController.showNodeCHPlay();
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();