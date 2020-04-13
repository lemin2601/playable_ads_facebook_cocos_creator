
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NvaW5GYWxsRWZmZWN0LmpzIl0sIm5hbWVzIjpbIkNDb2luRWZmZWN0IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29pblByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJjdG9yIiwibGlzdENvaW4iLCJudW1PZkNvaW4iLCJvbkxvYWQiLCJpIiwiaW5zdGFudGlhdGUiLCJjb2luRWZmZWN0IiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwibm9kZSIsImFkZENoaWxkIiwicHVzaCIsInN0YXJ0Iiwic2V0VGltZW91dCIsImxlbiIsImxlbmd0aCIsInJ1bm5pbmciLCJiaW5kIiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBQztBQUNQLGlCQUFRLElBREQ7QUFFUEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkQ7QUFESCxHQUhQO0FBU0xDLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBRUgsR0FiSTtBQWNMO0FBRUFDLEVBQUFBLE1BaEJLLG9CQWdCSztBQUNOLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLRixTQUF6QixFQUFvQ0UsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxVQUFJUCxVQUFVLEdBQUdKLEVBQUUsQ0FBQ1ksV0FBSCxDQUFnQixLQUFLUixVQUFyQixDQUFqQjtBQUNBLFVBQUlTLFVBQVUsR0FBR1QsVUFBVSxDQUFDVSxZQUFYLENBQXdCLGFBQXhCLENBQWpCO0FBQ0FELE1BQUFBLFVBQVUsQ0FBQ0UsTUFBWCxHQUFvQixLQUFwQjtBQUNBLFdBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQmIsVUFBbkI7QUFDQSxXQUFLSSxRQUFMLENBQWNVLElBQWQsQ0FBbUJMLFVBQW5CO0FBQ0g7QUFDSixHQXhCSTtBQTBCTE0sRUFBQUEsS0ExQkssbUJBMEJJO0FBQ0xDLElBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CLFVBQUlDLEdBQUcsR0FBRyxLQUFLYixRQUFMLENBQWNjLE1BQXhCOztBQUNBLFdBQUssSUFBSVgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1UsR0FBcEIsRUFBeUJWLENBQUMsRUFBMUIsRUFBOEI7QUFDMUIsWUFBSUUsVUFBVSxHQUFHLEtBQUtMLFFBQUwsQ0FBY0csQ0FBZCxDQUFqQjtBQUNBRSxRQUFBQSxVQUFVLENBQUNHLElBQVgsQ0FBZ0JELE1BQWhCLEdBQXlCLElBQXpCO0FBQ0FGLFFBQUFBLFVBQVUsQ0FBQ1UsT0FBWCxHQUFxQixJQUFyQjtBQUNIO0FBQ0osS0FQVSxDQU9UQyxJQVBTLENBT0osSUFQSSxDQUFELEVBT0csR0FQSCxDQUFWO0FBUUgsR0FuQ0k7QUFxQ0xDLEVBQUFBLE1BckNLLGtCQXFDR0MsRUFyQ0gsRUFxQ08sQ0FBRTtBQXJDVCxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIENDb2luRWZmZWN0ID0gcmVxdWlyZSgnQ0NvaW5FZmZlY3QnKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb2luUHJlZmFiOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0Q29pbiA9IFtdO1xyXG4gICAgICAgIHRoaXMubnVtT2ZDb2luID0gMTUwO1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1PZkNvaW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29pblByZWZhYiA9IGNjLmluc3RhbnRpYXRlICh0aGlzLmNvaW5QcmVmYWIpO1xyXG4gICAgICAgICAgICB2YXIgY29pbkVmZmVjdCA9IGNvaW5QcmVmYWIuZ2V0Q29tcG9uZW50KFwiQ0NvaW5FZmZlY3RcIik7XHJcbiAgICAgICAgICAgIGNvaW5FZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChjb2luUHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29pbi5wdXNoKGNvaW5FZmZlY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5saXN0Q29pbi5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2luRWZmZWN0ID0gdGhpcy5saXN0Q29pbltpXTtcclxuICAgICAgICAgICAgICAgIGNvaW5FZmZlY3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29pbkVmZmVjdC5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSw1MDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==