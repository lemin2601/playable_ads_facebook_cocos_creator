
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PoolHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2abece5O/9CH4bM2CUim0ve', 'PoolHandler');
// scripts/PoolHandler.js

"use strict";

var lastClick = 0;

function pauseresume() {
  var now = Date.now(); // Double click in 300 ms

  if (now - lastClick < 300) {
    this.stopAllActions();

    var pool = this.getComponent('PoolHandler')._pool;

    if (pool) {
      pool.put(this);
    } else {
      this.removeFromParent(true);
    }
  } // Click
  else {
      if (this.paused) {
        cc.director.getActionManager().resumeTarget(this);
      } else {
        cc.director.getActionManager().pauseTarget(this);
      }

      this.paused = !this.paused;
    }

  lastClick = now;
}

var PoolHandler = cc.Class({
  "extends": cc.Component,
  properties: {
    _pool: null
  },
  onLoad: function onLoad() {
    this.reuse();
  },
  unuse: function unuse() {
    this.node.off(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
  },
  reuse: function reuse() {
    this.node.paused = false;
    this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
  }
});
module.exports = PoolHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUG9vbEhhbmRsZXIuanMiXSwibmFtZXMiOlsibGFzdENsaWNrIiwicGF1c2VyZXN1bWUiLCJub3ciLCJEYXRlIiwic3RvcEFsbEFjdGlvbnMiLCJwb29sIiwiZ2V0Q29tcG9uZW50IiwiX3Bvb2wiLCJwdXQiLCJyZW1vdmVGcm9tUGFyZW50IiwicGF1c2VkIiwiY2MiLCJkaXJlY3RvciIsImdldEFjdGlvbk1hbmFnZXIiLCJyZXN1bWVUYXJnZXQiLCJwYXVzZVRhcmdldCIsIlBvb2xIYW5kbGVyIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwicmV1c2UiLCJ1bnVzZSIsIm5vZGUiLCJvZmYiLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwib24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBRyxDQUFoQjs7QUFFQSxTQUFTQyxXQUFULEdBQXdCO0FBQ3BCLE1BQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDRCxHQUFMLEVBQVYsQ0FEb0IsQ0FFcEI7O0FBQ0EsTUFBSUEsR0FBRyxHQUFHRixTQUFOLEdBQWtCLEdBQXRCLEVBQTJCO0FBQ3ZCLFNBQUtJLGNBQUw7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUNDLEtBQTVDOztBQUNBLFFBQUlGLElBQUosRUFBVTtBQUNOQSxNQUFBQSxJQUFJLENBQUNHLEdBQUwsQ0FBUyxJQUFUO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsV0FBS0MsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDSDtBQUNKLEdBVEQsQ0FVQTtBQVZBLE9BV0s7QUFDRCxVQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYkMsUUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLGdCQUFaLEdBQStCQyxZQUEvQixDQUE0QyxJQUE1QztBQUNILE9BRkQsTUFHSztBQUNESCxRQUFBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsZ0JBQVosR0FBK0JFLFdBQS9CLENBQTJDLElBQTNDO0FBQ0g7O0FBQ0QsV0FBS0wsTUFBTCxHQUFjLENBQUMsS0FBS0EsTUFBcEI7QUFDSDs7QUFDRFYsRUFBQUEsU0FBUyxHQUFHRSxHQUFaO0FBQ0g7O0FBRUQsSUFBSWMsV0FBVyxHQUFHTCxFQUFFLENBQUNNLEtBQUgsQ0FBUztBQUN2QixhQUFTTixFQUFFLENBQUNPLFNBRFc7QUFHdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSWixJQUFBQSxLQUFLLEVBQUU7QUFEQyxHQUhXO0FBT3ZCYSxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsU0FBS0MsS0FBTDtBQUNILEdBVHNCO0FBV3ZCQyxFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZixTQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBY2IsRUFBRSxDQUFDYyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQWhDLEVBQTJDMUIsV0FBM0MsRUFBd0QsS0FBS3NCLElBQTdEO0FBQ0gsR0Fic0I7QUFldkJGLEVBQUFBLEtBQUssRUFBRSxpQkFBWTtBQUNmLFNBQUtFLElBQUwsQ0FBVWIsTUFBVixHQUFtQixLQUFuQjtBQUNBLFNBQUthLElBQUwsQ0FBVUssRUFBVixDQUFhakIsRUFBRSxDQUFDYyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDMUIsV0FBMUMsRUFBdUQsS0FBS3NCLElBQTVEO0FBQ0g7QUFsQnNCLENBQVQsQ0FBbEI7QUFxQkFNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmQsV0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsYXN0Q2xpY2sgPSAwO1xyXG5cclxuZnVuY3Rpb24gcGF1c2VyZXN1bWUgKCkge1xyXG4gICAgdmFyIG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAvLyBEb3VibGUgY2xpY2sgaW4gMzAwIG1zXHJcbiAgICBpZiAobm93IC0gbGFzdENsaWNrIDwgMzAwKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHZhciBwb29sID0gdGhpcy5nZXRDb21wb25lbnQoJ1Bvb2xIYW5kbGVyJykuX3Bvb2w7XHJcbiAgICAgICAgaWYgKHBvb2wpIHtcclxuICAgICAgICAgICAgcG9vbC5wdXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2xpY2tcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVzdW1lVGFyZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnBhdXNlVGFyZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhdXNlZCA9ICF0aGlzLnBhdXNlZDtcclxuICAgIH1cclxuICAgIGxhc3RDbGljayA9IG5vdztcclxufVxyXG5cclxudmFyIFBvb2xIYW5kbGVyID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfcG9vbDogbnVsbFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJldXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVudXNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHBhdXNlcmVzdW1lLCB0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBwYXVzZXJlc3VtZSwgdGhpcy5ub2RlKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xIYW5kbGVyOyJdfQ==