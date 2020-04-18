
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CCoinFallEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
  start: function start() {},
  onEnable: function onEnable() {
    setTimeout(function () {
      var len = this.listCoin.length;

      for (var i = 0; i < len; i++) {
        var coinEffect = this.listCoin[i];
        coinEffect.node.active = true;
        coinEffect.running = true;
      }
    }.bind(this), 100);
  },
  update: function update(dt) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NDb2luRmFsbEVmZmVjdC5qcyJdLCJuYW1lcyI6WyJDQ29pbkVmZmVjdCIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNvaW5QcmVmYWIiLCJ0eXBlIiwiUHJlZmFiIiwiY3RvciIsImxpc3RDb2luIiwibnVtT2ZDb2luIiwib25Mb2FkIiwiaSIsImluc3RhbnRpYXRlIiwiY29pbkVmZmVjdCIsImdldENvbXBvbmVudCIsImFjdGl2ZSIsIm5vZGUiLCJhZGRDaGlsZCIsInB1c2giLCJzdGFydCIsIm9uRW5hYmxlIiwic2V0VGltZW91dCIsImxlbiIsImxlbmd0aCIsInJ1bm5pbmciLCJiaW5kIiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBQztBQUNQLGlCQUFRLElBREQ7QUFFUEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkQ7QUFESCxHQUhQO0FBU0xDLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBRUgsR0FiSTtBQWNMO0FBRUFDLEVBQUFBLE1BaEJLLG9CQWdCSztBQUNOLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLRixTQUF6QixFQUFvQ0UsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxVQUFJUCxVQUFVLEdBQUdKLEVBQUUsQ0FBQ1ksV0FBSCxDQUFnQixLQUFLUixVQUFyQixDQUFqQjtBQUNBLFVBQUlTLFVBQVUsR0FBR1QsVUFBVSxDQUFDVSxZQUFYLENBQXdCLGFBQXhCLENBQWpCO0FBQ0FELE1BQUFBLFVBQVUsQ0FBQ0UsTUFBWCxHQUFvQixLQUFwQjtBQUNBLFdBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQmIsVUFBbkI7QUFDQSxXQUFLSSxRQUFMLENBQWNVLElBQWQsQ0FBbUJMLFVBQW5CO0FBQ0g7QUFDSixHQXhCSTtBQTBCTE0sRUFBQUEsS0ExQkssbUJBMEJJLENBQ1IsQ0EzQkk7QUE0QkxDLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNmQyxJQUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQixVQUFJQyxHQUFHLEdBQUcsS0FBS2QsUUFBTCxDQUFjZSxNQUF4Qjs7QUFDQSxXQUFLLElBQUlaLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdXLEdBQXBCLEVBQXlCWCxDQUFDLEVBQTFCLEVBQThCO0FBQzFCLFlBQUlFLFVBQVUsR0FBRyxLQUFLTCxRQUFMLENBQWNHLENBQWQsQ0FBakI7QUFDQUUsUUFBQUEsVUFBVSxDQUFDRyxJQUFYLENBQWdCRCxNQUFoQixHQUF5QixJQUF6QjtBQUNBRixRQUFBQSxVQUFVLENBQUNXLE9BQVgsR0FBcUIsSUFBckI7QUFDSDtBQUNKLEtBUFUsQ0FPVEMsSUFQUyxDQU9KLElBUEksQ0FBRCxFQU9HLEdBUEgsQ0FBVjtBQVFILEdBckNJO0FBdUNMQyxFQUFBQSxNQXZDSyxrQkF1Q0dDLEVBdkNILEVBdUNPLENBQUU7QUF2Q1QsQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbnZhciBDQ29pbkVmZmVjdCA9IHJlcXVpcmUoJ0NDb2luRWZmZWN0Jyk7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY29pblByZWZhYjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubGlzdENvaW4gPSBbXTtcclxuICAgICAgICB0aGlzLm51bU9mQ29pbiA9IDE1MDtcclxuXHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubnVtT2ZDb2luOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvaW5QcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSAodGhpcy5jb2luUHJlZmFiKTtcclxuICAgICAgICAgICAgdmFyIGNvaW5FZmZlY3QgPSBjb2luUHJlZmFiLmdldENvbXBvbmVudChcIkNDb2luRWZmZWN0XCIpO1xyXG4gICAgICAgICAgICBjb2luRWZmZWN0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoY29pblByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvaW4ucHVzaChjb2luRWZmZWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgIH0sXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5saXN0Q29pbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2luRWZmZWN0ID0gdGhpcy5saXN0Q29pbltpXTtcclxuICAgICAgICAgICAgICAgIGNvaW5FZmZlY3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29pbkVmZmVjdC5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwxMDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==