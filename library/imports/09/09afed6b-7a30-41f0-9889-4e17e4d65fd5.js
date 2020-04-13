"use strict";
cc._RF.push(module, '09afe1rejBB8JiJThfk1l/V', 'CCoinFallEffect');
// scripts/CCoinFallEffect.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CCoinEffect = require('CCoinEffect');

cc.Class({
  "extends": cc.Component,
  properties: {
    coinPrefab: {
      "default": null,
      type: cc.Prefab
    }
  },
  ctor: function ctor() {
    this.listCoin = [];
    this.numOfCoin = 150;
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    for (var i = 0; i < this.numOfCoin; i++) {
      var coinPrefab = cc.instantiate(this.coinPrefab);
      var coinEffect = coinPrefab.getComponent("CCoinEffect");
      coinEffect.active = false;
      this.node.addChild(coinPrefab);
      this.listCoin.push(coinEffect);
    }
  },
  start: function start() {
    setTimeout(function () {
      var len = this.listCoin.length;

      for (var i = 0; i < len; i++) {
        var coinEffect = this.listCoin[i];
        coinEffect.node.active = true;
        coinEffect.running = true;
      }
    }.bind(this), 500);
  },
  update: function update(dt) {}
});

cc._RF.pop();