
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CStep1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56903XzTf9Ol6mWlpC3td6k', 'CStep1');
// scripts/CStep1.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    sprite: {
      "default": null,
      type: cc.Sprite
    },
    bg: {
      "default": null,
      type: cc.Sprite
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.sprite) this.sprite.node.active = false;

    if (this.bg) {
      this.bg.node.active = false;
    }
  },
  onEnable: function onEnable() {
    if (this.sprite) {
      var node = this.sprite.node;
      var pos = node.getPosition();
      node.active = true;
      node.stopAllActions();
      node.x = -700;
      node.opacity = 0;
      node.runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.moveTo(0.5, 0, pos.y).easing(cc.easeBackOut()), cc.fadeIn(0.3)), cc.delayTime(1.5), cc.spawn(cc.fadeOut(0.5), cc.moveTo(0.5, 700, pos.y).easing(cc.easeBackInOut()))));
    }

    if (this.bg) {
      this.bg.node.active = true;
      this.bg.node.opacity = 0;
      this.bg.node.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeTo(0.5, 180), cc.delayTime(1.5), cc.fadeOut(0.5)));
    }
  },
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NTdGVwMS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNwcml0ZSIsInR5cGUiLCJTcHJpdGUiLCJiZyIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJvbkVuYWJsZSIsInBvcyIsImdldFBvc2l0aW9uIiwic3RvcEFsbEFjdGlvbnMiLCJ4Iiwib3BhY2l0eSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwic3Bhd24iLCJtb3ZlVG8iLCJ5IiwiZWFzaW5nIiwiZWFzZUJhY2tPdXQiLCJmYWRlSW4iLCJmYWRlT3V0IiwiZWFzZUJhY2tJbk91dCIsImZhZGVUbyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGTCxLQURBO0FBS1JDLElBQUFBLEVBQUUsRUFBQztBQUNDLGlCQUFRLElBRFQ7QUFFQ0YsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRlQ7QUFMSyxHQUhQO0FBZUw7QUFFQUUsRUFBQUEsTUFqQkssb0JBaUJLO0FBQ04sUUFBRyxLQUFLSixNQUFSLEVBQ0ksS0FBS0EsTUFBTCxDQUFZSyxJQUFaLENBQWlCQyxNQUFqQixHQUEwQixLQUExQjs7QUFDSixRQUFHLEtBQUtILEVBQVIsRUFBVztBQUNQLFdBQUtBLEVBQUwsQ0FBUUUsSUFBUixDQUFhQyxNQUFiLEdBQXNCLEtBQXRCO0FBQ0g7QUFDSixHQXZCSTtBQXlCTEMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2YsUUFBRyxLQUFLUCxNQUFSLEVBQWU7QUFDWCxVQUFJSyxJQUFJLEdBQUcsS0FBS0wsTUFBTCxDQUFZSyxJQUF2QjtBQUNBLFVBQUlHLEdBQUcsR0FBR0gsSUFBSSxDQUFDSSxXQUFMLEVBQVY7QUFDQUosTUFBQUEsSUFBSSxDQUFDQyxNQUFMLEdBQWMsSUFBZDtBQUNBRCxNQUFBQSxJQUFJLENBQUNLLGNBQUw7QUFDQUwsTUFBQUEsSUFBSSxDQUFDTSxDQUFMLEdBQVMsQ0FBQyxHQUFWO0FBQ0FOLE1BQUFBLElBQUksQ0FBQ08sT0FBTCxHQUFlLENBQWY7QUFDQVAsTUFBQUEsSUFBSSxDQUFDUSxTQUFMLENBQWVqQixFQUFFLENBQUNrQixRQUFILENBQ1hsQixFQUFFLENBQUNtQixTQUFILENBQWEsQ0FBYixDQURXLEVBRVhuQixFQUFFLENBQUNvQixLQUFILENBQ0lwQixFQUFFLENBQUNxQixNQUFILENBQVUsR0FBVixFQUFjLENBQWQsRUFBZ0JULEdBQUcsQ0FBQ1UsQ0FBcEIsRUFBdUJDLE1BQXZCLENBQThCdkIsRUFBRSxDQUFDd0IsV0FBSCxFQUE5QixDQURKLEVBRUl4QixFQUFFLENBQUN5QixNQUFILENBQVUsR0FBVixDQUZKLENBRlcsRUFNWHpCLEVBQUUsQ0FBQ21CLFNBQUgsQ0FBYSxHQUFiLENBTlcsRUFPWG5CLEVBQUUsQ0FBQ29CLEtBQUgsQ0FDSXBCLEVBQUUsQ0FBQzBCLE9BQUgsQ0FBVyxHQUFYLENBREosRUFFSTFCLEVBQUUsQ0FBQ3FCLE1BQUgsQ0FBVSxHQUFWLEVBQWMsR0FBZCxFQUFrQlQsR0FBRyxDQUFDVSxDQUF0QixFQUF5QkMsTUFBekIsQ0FBZ0N2QixFQUFFLENBQUMyQixhQUFILEVBQWhDLENBRkosQ0FQVyxDQUFmO0FBWUg7O0FBQ0QsUUFBRyxLQUFLcEIsRUFBUixFQUFXO0FBQ1AsV0FBS0EsRUFBTCxDQUFRRSxJQUFSLENBQWFDLE1BQWIsR0FBc0IsSUFBdEI7QUFDQSxXQUFLSCxFQUFMLENBQVFFLElBQVIsQ0FBYU8sT0FBYixHQUF1QixDQUF2QjtBQUNBLFdBQUtULEVBQUwsQ0FBUUUsSUFBUixDQUFhUSxTQUFiLENBQXVCakIsRUFBRSxDQUFDa0IsUUFBSCxDQUNuQmxCLEVBQUUsQ0FBQ21CLFNBQUgsQ0FBYSxHQUFiLENBRG1CLEVBRW5CbkIsRUFBRSxDQUFDNEIsTUFBSCxDQUFVLEdBQVYsRUFBYyxHQUFkLENBRm1CLEVBR25CNUIsRUFBRSxDQUFDbUIsU0FBSCxDQUFhLEdBQWIsQ0FIbUIsRUFJbkJuQixFQUFFLENBQUMwQixPQUFILENBQVcsR0FBWCxDQUptQixDQUF2QjtBQU1IO0FBQ0osR0F4REk7QUF5RExHLEVBQUFBLEtBekRLLG1CQXlESSxDQUVSLENBM0RJLENBNkRMOztBQTdESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3ByaXRlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmc6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZSlcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLmJnKXtcclxuICAgICAgICAgICAgdGhpcy5iZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZSl7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zcHJpdGUubm9kZTtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IG5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IC03MDA7XHJcbiAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwwLHBvcy55KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMylcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMS41KSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LDcwMCxwb3MueSkuZWFzaW5nKGNjLmVhc2VCYWNrSW5PdXQoKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZyl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJnLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuYmcubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC41KSxcclxuICAgICAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsMTgwKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjUpXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19