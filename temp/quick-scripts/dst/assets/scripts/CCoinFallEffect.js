
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NvaW5GYWxsRWZmZWN0LmpzIl0sIm5hbWVzIjpbIkNDb2luRWZmZWN0IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29pblByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJjdG9yIiwibGlzdENvaW4iLCJudW1PZkNvaW4iLCJvbkxvYWQiLCJpIiwiaW5zdGFudGlhdGUiLCJjb2luRWZmZWN0IiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwibm9kZSIsImFkZENoaWxkIiwicHVzaCIsInN0YXJ0Iiwib25FbmFibGUiLCJzZXRUaW1lb3V0IiwibGVuIiwibGVuZ3RoIiwicnVubmluZyIsImJpbmQiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFDO0FBQ1AsaUJBQVEsSUFERDtBQUVQQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRDtBQURILEdBSFA7QUFTTEMsRUFBQUEsSUFBSSxFQUFDLGdCQUFVO0FBQ1gsU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsR0FBakI7QUFFSCxHQWJJO0FBY0w7QUFFQUMsRUFBQUEsTUFoQkssb0JBZ0JLO0FBQ04sU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtGLFNBQXpCLEVBQW9DRSxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDLFVBQUlQLFVBQVUsR0FBR0osRUFBRSxDQUFDWSxXQUFILENBQWdCLEtBQUtSLFVBQXJCLENBQWpCO0FBQ0EsVUFBSVMsVUFBVSxHQUFHVCxVQUFVLENBQUNVLFlBQVgsQ0FBd0IsYUFBeEIsQ0FBakI7QUFDQUQsTUFBQUEsVUFBVSxDQUFDRSxNQUFYLEdBQW9CLEtBQXBCO0FBQ0EsV0FBS0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CYixVQUFuQjtBQUNBLFdBQUtJLFFBQUwsQ0FBY1UsSUFBZCxDQUFtQkwsVUFBbkI7QUFDSDtBQUNKLEdBeEJJO0FBMEJMTSxFQUFBQSxLQTFCSyxtQkEwQkksQ0FDUixDQTNCSTtBQTRCTEMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2ZDLElBQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CLFVBQUlDLEdBQUcsR0FBRyxLQUFLZCxRQUFMLENBQWNlLE1BQXhCOztBQUNBLFdBQUssSUFBSVosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1csR0FBcEIsRUFBeUJYLENBQUMsRUFBMUIsRUFBOEI7QUFDMUIsWUFBSUUsVUFBVSxHQUFHLEtBQUtMLFFBQUwsQ0FBY0csQ0FBZCxDQUFqQjtBQUNBRSxRQUFBQSxVQUFVLENBQUNHLElBQVgsQ0FBZ0JELE1BQWhCLEdBQXlCLElBQXpCO0FBQ0FGLFFBQUFBLFVBQVUsQ0FBQ1csT0FBWCxHQUFxQixJQUFyQjtBQUNIO0FBQ0osS0FQVSxDQU9UQyxJQVBTLENBT0osSUFQSSxDQUFELEVBT0csR0FQSCxDQUFWO0FBUUgsR0FyQ0k7QUF1Q0xDLEVBQUFBLE1BdkNLLGtCQXVDR0MsRUF2Q0gsRUF1Q08sQ0FBRTtBQXZDVCxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIENDb2luRWZmZWN0ID0gcmVxdWlyZSgnQ0NvaW5FZmZlY3QnKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb2luUHJlZmFiOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5saXN0Q29pbiA9IFtdO1xyXG4gICAgICAgIHRoaXMubnVtT2ZDb2luID0gMTUwO1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1PZkNvaW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29pblByZWZhYiA9IGNjLmluc3RhbnRpYXRlICh0aGlzLmNvaW5QcmVmYWIpO1xyXG4gICAgICAgICAgICB2YXIgY29pbkVmZmVjdCA9IGNvaW5QcmVmYWIuZ2V0Q29tcG9uZW50KFwiQ0NvaW5FZmZlY3RcIik7XHJcbiAgICAgICAgICAgIGNvaW5FZmZlY3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChjb2luUHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29pbi5wdXNoKGNvaW5FZmZlY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgfSxcclxuICAgIG9uRW5hYmxlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxpc3RDb2luLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvaW5FZmZlY3QgPSB0aGlzLmxpc3RDb2luW2ldO1xyXG4gICAgICAgICAgICAgICAgY29pbkVmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb2luRWZmZWN0LnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLDEwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19