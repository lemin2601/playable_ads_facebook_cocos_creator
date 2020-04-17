
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
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.sprite) this.sprite.node.active = false;
  },
  onEnable: function onEnable() {
    if (this.sprite) {
      var node = this.sprite.node;
      var pos = node.getPosition();
      node.active = true;
      node.stopAllActions();
      node.x = -700;
      node.opacity = 0;
      node.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5, 0, pos.y).easing(cc.easeBackOut()), cc.fadeIn(0.3)), cc.delayTime(1.5), cc.spawn(cc.fadeOut(0.5), cc.moveTo(0.5, 700, pos.y).easing(cc.easeBackInOut()))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1N0ZXAxLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3ByaXRlIiwidHlwZSIsIlNwcml0ZSIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJvbkVuYWJsZSIsInBvcyIsImdldFBvc2l0aW9uIiwic3RvcEFsbEFjdGlvbnMiLCJ4Iiwib3BhY2l0eSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwic3Bhd24iLCJtb3ZlVG8iLCJ5IiwiZWFzaW5nIiwiZWFzZUJhY2tPdXQiLCJmYWRlSW4iLCJkZWxheVRpbWUiLCJmYWRlT3V0IiwiZWFzZUJhY2tJbk91dCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFDO0FBQ0gsaUJBQVEsSUFETDtBQUVIQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGTDtBQURDLEdBSFA7QUFVTDtBQUVBQyxFQUFBQSxNQVpLLG9CQVlLO0FBQ04sUUFBRyxLQUFLSCxNQUFSLEVBQ0ksS0FBS0EsTUFBTCxDQUFZSSxJQUFaLENBQWlCQyxNQUFqQixHQUEwQixLQUExQjtBQUNQLEdBZkk7QUFpQkxDLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNmLFFBQUcsS0FBS04sTUFBUixFQUFlO0FBQ1gsVUFBSUksSUFBSSxHQUFHLEtBQUtKLE1BQUwsQ0FBWUksSUFBdkI7QUFDQSxVQUFJRyxHQUFHLEdBQUdILElBQUksQ0FBQ0ksV0FBTCxFQUFWO0FBQ0FKLE1BQUFBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLElBQWQ7QUFDQUQsTUFBQUEsSUFBSSxDQUFDSyxjQUFMO0FBQ0FMLE1BQUFBLElBQUksQ0FBQ00sQ0FBTCxHQUFTLENBQUMsR0FBVjtBQUNBTixNQUFBQSxJQUFJLENBQUNPLE9BQUwsR0FBZSxDQUFmO0FBQ0FQLE1BQUFBLElBQUksQ0FBQ1EsU0FBTCxDQUFlaEIsRUFBRSxDQUFDaUIsUUFBSCxDQUNYakIsRUFBRSxDQUFDa0IsS0FBSCxDQUNJbEIsRUFBRSxDQUFDbUIsTUFBSCxDQUFVLEdBQVYsRUFBYyxDQUFkLEVBQWdCUixHQUFHLENBQUNTLENBQXBCLEVBQXVCQyxNQUF2QixDQUE4QnJCLEVBQUUsQ0FBQ3NCLFdBQUgsRUFBOUIsQ0FESixFQUVJdEIsRUFBRSxDQUFDdUIsTUFBSCxDQUFVLEdBQVYsQ0FGSixDQURXLEVBS1h2QixFQUFFLENBQUN3QixTQUFILENBQWEsR0FBYixDQUxXLEVBTVh4QixFQUFFLENBQUNrQixLQUFILENBQ0lsQixFQUFFLENBQUN5QixPQUFILENBQVcsR0FBWCxDQURKLEVBRUl6QixFQUFFLENBQUNtQixNQUFILENBQVUsR0FBVixFQUFjLEdBQWQsRUFBa0JSLEdBQUcsQ0FBQ1MsQ0FBdEIsRUFBeUJDLE1BQXpCLENBQWdDckIsRUFBRSxDQUFDMEIsYUFBSCxFQUFoQyxDQUZKLENBTlcsQ0FBZjtBQVdIO0FBQ0osR0FyQ0k7QUFzQ0xDLEVBQUFBLEtBdENLLG1CQXNDSSxDQUVSLENBeENJLENBMENMOztBQTFDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3ByaXRlOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZSlcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLnNwcml0ZSl7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5zcHJpdGUubm9kZTtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IG5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIG5vZGUueCA9IC03MDA7XHJcbiAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDAuNSwwLHBvcy55KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZUluKDAuMylcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMS41KSxcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVPdXQoMC41KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LDcwMCxwb3MueSkuZWFzaW5nKGNjLmVhc2VCYWNrSW5PdXQoKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=