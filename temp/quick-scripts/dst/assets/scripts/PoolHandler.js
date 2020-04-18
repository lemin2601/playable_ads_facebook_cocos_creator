
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1Bvb2xIYW5kbGVyLmpzIl0sIm5hbWVzIjpbImxhc3RDbGljayIsInBhdXNlcmVzdW1lIiwibm93IiwiRGF0ZSIsInN0b3BBbGxBY3Rpb25zIiwicG9vbCIsImdldENvbXBvbmVudCIsIl9wb29sIiwicHV0IiwicmVtb3ZlRnJvbVBhcmVudCIsInBhdXNlZCIsImNjIiwiZGlyZWN0b3IiLCJnZXRBY3Rpb25NYW5hZ2VyIiwicmVzdW1lVGFyZ2V0IiwicGF1c2VUYXJnZXQiLCJQb29sSGFuZGxlciIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsInJldXNlIiwidW51c2UiLCJub2RlIiwib2ZmIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIm9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUcsQ0FBaEI7O0FBRUEsU0FBU0MsV0FBVCxHQUF3QjtBQUNwQixNQUFJQyxHQUFHLEdBQUdDLElBQUksQ0FBQ0QsR0FBTCxFQUFWLENBRG9CLENBRXBCOztBQUNBLE1BQUlBLEdBQUcsR0FBR0YsU0FBTixHQUFrQixHQUF0QixFQUEyQjtBQUN2QixTQUFLSSxjQUFMOztBQUNBLFFBQUlDLElBQUksR0FBRyxLQUFLQyxZQUFMLENBQWtCLGFBQWxCLEVBQWlDQyxLQUE1Qzs7QUFDQSxRQUFJRixJQUFKLEVBQVU7QUFDTkEsTUFBQUEsSUFBSSxDQUFDRyxHQUFMLENBQVMsSUFBVDtBQUNILEtBRkQsTUFHSztBQUNELFdBQUtDLGdCQUFMLENBQXNCLElBQXRCO0FBQ0g7QUFDSixHQVRELENBVUE7QUFWQSxPQVdLO0FBQ0QsVUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2JDLFFBQUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxnQkFBWixHQUErQkMsWUFBL0IsQ0FBNEMsSUFBNUM7QUFDSCxPQUZELE1BR0s7QUFDREgsUUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLGdCQUFaLEdBQStCRSxXQUEvQixDQUEyQyxJQUEzQztBQUNIOztBQUNELFdBQUtMLE1BQUwsR0FBYyxDQUFDLEtBQUtBLE1BQXBCO0FBQ0g7O0FBQ0RWLEVBQUFBLFNBQVMsR0FBR0UsR0FBWjtBQUNIOztBQUVELElBQUljLFdBQVcsR0FBR0wsRUFBRSxDQUFDTSxLQUFILENBQVM7QUFDdkIsYUFBU04sRUFBRSxDQUFDTyxTQURXO0FBR3ZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUlosSUFBQUEsS0FBSyxFQUFFO0FBREMsR0FIVztBQU92QmEsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLFNBQUtDLEtBQUw7QUFDSCxHQVRzQjtBQVd2QkMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsU0FBS0MsSUFBTCxDQUFVQyxHQUFWLENBQWNiLEVBQUUsQ0FBQ2MsSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxTQUFoQyxFQUEyQzFCLFdBQTNDLEVBQXdELEtBQUtzQixJQUE3RDtBQUNILEdBYnNCO0FBZXZCRixFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZixTQUFLRSxJQUFMLENBQVViLE1BQVYsR0FBbUIsS0FBbkI7QUFDQSxTQUFLYSxJQUFMLENBQVVLLEVBQVYsQ0FBYWpCLEVBQUUsQ0FBQ2MsSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxTQUEvQixFQUEwQzFCLFdBQTFDLEVBQXVELEtBQUtzQixJQUE1RDtBQUNIO0FBbEJzQixDQUFULENBQWxCO0FBcUJBTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFdBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGFzdENsaWNrID0gMDtcclxuXHJcbmZ1bmN0aW9uIHBhdXNlcmVzdW1lICgpIHtcclxuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgLy8gRG91YmxlIGNsaWNrIGluIDMwMCBtc1xyXG4gICAgaWYgKG5vdyAtIGxhc3RDbGljayA8IDMwMCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB2YXIgcG9vbCA9IHRoaXMuZ2V0Q29tcG9uZW50KCdQb29sSGFuZGxlcicpLl9wb29sO1xyXG4gICAgICAgIGlmIChwb29sKSB7XHJcbiAgICAgICAgICAgIHBvb2wucHV0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENsaWNrXHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlc3VtZVRhcmdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSAhdGhpcy5wYXVzZWQ7XHJcbiAgICB9XHJcbiAgICBsYXN0Q2xpY2sgPSBub3c7XHJcbn1cclxuXHJcbnZhciBQb29sSGFuZGxlciA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3Bvb2w6IG51bGxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZXVzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bnVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBwYXVzZXJlc3VtZSwgdGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgcGF1c2VyZXN1bWUsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb29sSGFuZGxlcjsiXX0=