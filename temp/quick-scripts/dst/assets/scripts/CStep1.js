
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1N0ZXAxLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3ByaXRlIiwidHlwZSIsIlNwcml0ZSIsImJnIiwib25Mb2FkIiwibm9kZSIsImFjdGl2ZSIsIm9uRW5hYmxlIiwicG9zIiwiZ2V0UG9zaXRpb24iLCJzdG9wQWxsQWN0aW9ucyIsIngiLCJvcGFjaXR5IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJzcGF3biIsIm1vdmVUbyIsInkiLCJlYXNpbmciLCJlYXNlQmFja091dCIsImZhZGVJbiIsImZhZGVPdXQiLCJlYXNlQmFja0luT3V0IiwiZmFkZVRvIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZMLEtBREE7QUFLUkMsSUFBQUEsRUFBRSxFQUFDO0FBQ0MsaUJBQVEsSUFEVDtBQUVDRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGVDtBQUxLLEdBSFA7QUFlTDtBQUVBRSxFQUFBQSxNQWpCSyxvQkFpQks7QUFDTixRQUFHLEtBQUtKLE1BQVIsRUFDSSxLQUFLQSxNQUFMLENBQVlLLElBQVosQ0FBaUJDLE1BQWpCLEdBQTBCLEtBQTFCOztBQUNKLFFBQUcsS0FBS0gsRUFBUixFQUFXO0FBQ1AsV0FBS0EsRUFBTCxDQUFRRSxJQUFSLENBQWFDLE1BQWIsR0FBc0IsS0FBdEI7QUFDSDtBQUNKLEdBdkJJO0FBeUJMQyxFQUFBQSxRQUFRLEVBQUMsb0JBQVU7QUFDZixRQUFHLEtBQUtQLE1BQVIsRUFBZTtBQUNYLFVBQUlLLElBQUksR0FBRyxLQUFLTCxNQUFMLENBQVlLLElBQXZCO0FBQ0EsVUFBSUcsR0FBRyxHQUFHSCxJQUFJLENBQUNJLFdBQUwsRUFBVjtBQUNBSixNQUFBQSxJQUFJLENBQUNDLE1BQUwsR0FBYyxJQUFkO0FBQ0FELE1BQUFBLElBQUksQ0FBQ0ssY0FBTDtBQUNBTCxNQUFBQSxJQUFJLENBQUNNLENBQUwsR0FBUyxDQUFDLEdBQVY7QUFDQU4sTUFBQUEsSUFBSSxDQUFDTyxPQUFMLEdBQWUsQ0FBZjtBQUNBUCxNQUFBQSxJQUFJLENBQUNRLFNBQUwsQ0FBZWpCLEVBQUUsQ0FBQ2tCLFFBQUgsQ0FDWGxCLEVBQUUsQ0FBQ21CLFNBQUgsQ0FBYSxDQUFiLENBRFcsRUFFWG5CLEVBQUUsQ0FBQ29CLEtBQUgsQ0FDSXBCLEVBQUUsQ0FBQ3FCLE1BQUgsQ0FBVSxHQUFWLEVBQWMsQ0FBZCxFQUFnQlQsR0FBRyxDQUFDVSxDQUFwQixFQUF1QkMsTUFBdkIsQ0FBOEJ2QixFQUFFLENBQUN3QixXQUFILEVBQTlCLENBREosRUFFSXhCLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVSxHQUFWLENBRkosQ0FGVyxFQU1YekIsRUFBRSxDQUFDbUIsU0FBSCxDQUFhLEdBQWIsQ0FOVyxFQU9YbkIsRUFBRSxDQUFDb0IsS0FBSCxDQUNJcEIsRUFBRSxDQUFDMEIsT0FBSCxDQUFXLEdBQVgsQ0FESixFQUVJMUIsRUFBRSxDQUFDcUIsTUFBSCxDQUFVLEdBQVYsRUFBYyxHQUFkLEVBQWtCVCxHQUFHLENBQUNVLENBQXRCLEVBQXlCQyxNQUF6QixDQUFnQ3ZCLEVBQUUsQ0FBQzJCLGFBQUgsRUFBaEMsQ0FGSixDQVBXLENBQWY7QUFZSDs7QUFDRCxRQUFHLEtBQUtwQixFQUFSLEVBQVc7QUFDUCxXQUFLQSxFQUFMLENBQVFFLElBQVIsQ0FBYUMsTUFBYixHQUFzQixJQUF0QjtBQUNBLFdBQUtILEVBQUwsQ0FBUUUsSUFBUixDQUFhTyxPQUFiLEdBQXVCLENBQXZCO0FBQ0EsV0FBS1QsRUFBTCxDQUFRRSxJQUFSLENBQWFRLFNBQWIsQ0FBdUJqQixFQUFFLENBQUNrQixRQUFILENBQ25CbEIsRUFBRSxDQUFDbUIsU0FBSCxDQUFhLEdBQWIsQ0FEbUIsRUFFbkJuQixFQUFFLENBQUM0QixNQUFILENBQVUsR0FBVixFQUFjLEdBQWQsQ0FGbUIsRUFHbkI1QixFQUFFLENBQUNtQixTQUFILENBQWEsR0FBYixDQUhtQixFQUluQm5CLEVBQUUsQ0FBQzBCLE9BQUgsQ0FBVyxHQUFYLENBSm1CLENBQXZCO0FBTUg7QUFDSixHQXhESTtBQXlETEcsRUFBQUEsS0F6REssbUJBeURJLENBRVIsQ0EzREksQ0E2REw7O0FBN0RLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzcHJpdGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZzp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc3ByaXRlKVxyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuYmcpe1xyXG4gICAgICAgICAgICB0aGlzLmJnLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuc3ByaXRlKXtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnNwcml0ZS5ub2RlO1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gbm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgbm9kZS54ID0gLTcwMDtcclxuICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC41LDAscG9zLnkpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlSW4oMC4zKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjUpLFxyXG4gICAgICAgICAgICAgICAgY2Muc3Bhd24oXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZU91dCgwLjUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjUsNzAwLHBvcy55KS5lYXNpbmcoY2MuZWFzZUJhY2tJbk91dCgpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJnKXtcclxuICAgICAgICAgICAgdGhpcy5iZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmcubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5iZy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjUpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZVRvKDAuNSwxODApLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEuNSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDAuNSlcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=