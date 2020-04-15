
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CEffectWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0VmZmVjdFdpbi5qcyJdLCJuYW1lcyI6WyJVdGlsaXR5IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BpbmUiLCJ0eXBlIiwiTm9kZSIsImxiTG9zZTEiLCJMYWJlbCIsImxiTG9zZTIiLCJpbWdMb3NlMSIsIlNwcml0ZSIsImltZ0xvc2UyIiwibGJXaW4iLCJsYlBvdCIsInBsYXllcjEiLCJwbGF5ZXIyIiwiY3RvciIsImdhbWVDb250cm9sbGVyIiwib25Mb2FkIiwib25FbmFibGUiLCJsb3NlMSIsImxvc2UyIiwicG90Iiwid2luIiwicnVuVXBkYXRlR29sZCIsImdldENvbXBvbmVudCIsImdvbGQiLCJlbW8iLCJjbGVhclRyYWNrcyIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJ0cmFja0VudHJ5IiwiYWN0aXZlIiwic2V0QW5pbWF0aW9uIiwibm9kZSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJzaG93Tm9kZUNIUGxheSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUM7QUFDRixpQkFBUSxJQUROO0FBRUZDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZOLEtBREU7QUFLUkMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1E7QUFGSixLQUxBO0FBU1JDLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRLElBREo7QUFFSkosTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNRO0FBRkosS0FUQTtBQWFSRSxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVztBQUZILEtBYkQ7QUFpQlJDLElBQUFBLFFBQVEsRUFBQztBQUNMLGlCQUFRLElBREg7QUFFTFAsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXO0FBRkgsS0FqQkQ7QUFxQlJFLElBQUFBLEtBQUssRUFBQztBQUNGLGlCQUFRLElBRE47QUFFRlIsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNRO0FBRk4sS0FyQkU7QUF5QlJNLElBQUFBLEtBQUssRUFBQztBQUNGLGlCQUFRLElBRE47QUFFRlQsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNRO0FBRk4sS0F6QkU7QUE2QlJPLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRLElBREo7QUFFSlYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkosS0E3QkE7QUFpQ1JVLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRLElBREo7QUFFSlgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRko7QUFqQ0EsR0FIUDtBQTBDTFcsRUFBQUEsSUFBSSxFQUFDLGdCQUFVO0FBQ1gsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNILEdBNUNJO0FBOENMO0FBRUFDLEVBQUFBLE1BaERLLG9CQWdESyxDQUVULENBbERJO0FBb0RMQyxFQUFBQSxRQUFRLEVBQUMsb0JBQVU7QUFDZixRQUFJQyxLQUFLLEdBQUcsUUFBWjtBQUNBLFFBQUlDLEtBQUssR0FBRyxRQUFaO0FBQ0EsUUFBSUMsR0FBRyxHQUFHLFFBQVY7QUFDQSxRQUFJQyxHQUFHLEdBQUdELEdBQUcsR0FBR0YsS0FBTixHQUFjQyxLQUF4QjtBQUNBeEIsSUFBQUEsT0FBTyxDQUFDMkIsYUFBUixDQUFzQixLQUFLbEIsT0FBM0IsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBQ2MsS0FBdEM7QUFDQXZCLElBQUFBLE9BQU8sQ0FBQzJCLGFBQVIsQ0FBc0IsS0FBS2hCLE9BQTNCLEVBQW1DLENBQW5DLEVBQXFDLENBQUNhLEtBQXRDO0FBQ0F4QixJQUFBQSxPQUFPLENBQUMyQixhQUFSLENBQXNCLEtBQUtYLEtBQTNCLEVBQWlDUyxHQUFqQyxFQUFxQyxDQUFyQztBQUNBekIsSUFBQUEsT0FBTyxDQUFDMkIsYUFBUixDQUFzQixLQUFLWixLQUEzQixFQUFpQyxDQUFqQyxFQUFtQ1csR0FBbkM7QUFDQTFCLElBQUFBLE9BQU8sQ0FBQzJCLGFBQVIsQ0FBc0IsS0FBS1YsT0FBTCxDQUFhVyxZQUFiLENBQTBCLFNBQTFCLEVBQXFDQyxJQUEzRCxFQUFnRU4sS0FBaEUsRUFBc0UsQ0FBdEU7QUFDQXZCLElBQUFBLE9BQU8sQ0FBQzJCLGFBQVIsQ0FBc0IsS0FBS1QsT0FBTCxDQUFhVSxZQUFiLENBQTBCLFNBQTFCLEVBQXFDQyxJQUEzRCxFQUFnRUwsS0FBaEUsRUFBc0UsQ0FBdEU7QUFDQSxRQUFJTSxHQUFHLEdBQUcsS0FBS3hCLEtBQWY7QUFDQSxRQUFJQSxLQUFLLEdBQUd3QixHQUFHLENBQUNGLFlBQUosQ0FBaUIsYUFBakIsQ0FBWjtBQUNBdEIsSUFBQUEsS0FBSyxDQUFDeUIsV0FBTjtBQUNBekIsSUFBQUEsS0FBSyxDQUFDMEIsbUJBQU4sQ0FBMEIsVUFBU0MsVUFBVCxFQUFvQixDQUMxQztBQUNBO0FBQ0gsS0FIRDtBQUlBSCxJQUFBQSxHQUFHLENBQUNJLE1BQUosR0FBYSxJQUFiO0FBQ0E1QixJQUFBQSxLQUFLLENBQUM2QixZQUFOLENBQW1CLENBQW5CLEVBQXNCLFdBQXRCLEVBQW1DLEtBQW5DO0FBRUEsU0FBS0MsSUFBTCxDQUFVQyxTQUFWLENBQW9CbkMsRUFBRSxDQUFDb0MsUUFBSCxDQUNoQnBDLEVBQUUsQ0FBQ3FDLFNBQUgsQ0FBYSxDQUFiLENBRGdCLEVBRWhCckMsRUFBRSxDQUFDc0MsUUFBSCxDQUFZLFlBQVk7QUFDcEIsV0FBSzVCLFFBQUwsQ0FBY3dCLElBQWQsQ0FBbUJGLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsV0FBS3BCLFFBQUwsQ0FBY3NCLElBQWQsQ0FBbUJGLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsV0FBS25CLEtBQUwsQ0FBV3FCLElBQVgsQ0FBZ0JGLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsV0FBS08sY0FBTDtBQUNILEtBTEQsRUFLRSxJQUxGLENBRmdCLENBQXBCO0FBU0gsR0FsRkk7QUFvRkxBLEVBQUFBLGNBQWMsRUFBQywwQkFBVTtBQUNyQixTQUFLckIsY0FBTCxDQUFvQnFCLGNBQXBCO0FBQ0gsR0F0Rkk7QUF1RkxDLEVBQUFBLEtBdkZLLG1CQXVGSSxDQUVSLENBekZJLENBMkZMOztBQTNGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwaW5lOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiTG9zZTE6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiTG9zZTI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0xvc2UxOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0xvc2UyOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiV2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYlBvdDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyMTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXIyOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxvc2UxID0gNDcwMDAwMDA7XHJcbiAgICAgICAgdmFyIGxvc2UyID0gNTgwMDAwMDA7XHJcbiAgICAgICAgdmFyIHBvdCA9IDQwMDAwMDAwO1xyXG4gICAgICAgIHZhciB3aW4gPSBwb3QgKyBsb3NlMSArIGxvc2UyO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiTG9zZTEsMCwtbG9zZTEpO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiTG9zZTIsMCwtbG9zZTIpO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiUG90LHBvdCwwKTtcclxuICAgICAgICBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYldpbiwwLHdpbik7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMS5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTEsMCk7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMi5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTIsMCk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuc3BpbmU7XHJcbiAgICAgICAgdmFyIHNwaW5lID0gZW1vLmdldENvbXBvbmVudCgnc3AuU2tlbGV0b24nKTtcclxuICAgICAgICBzcGluZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgICAgIC8vIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbW8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgJ2FuaW1hdGlvbicsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDQpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0xvc2UxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0xvc2UyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxiV2luLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb2RlQ0hQbGF5KCk7XHJcbiAgICAgICAgICAgIH0sdGhpcylcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93Tm9kZUNIUGxheTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIuc2hvd05vZGVDSFBsYXkoKTtcclxuICAgIH0sXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==