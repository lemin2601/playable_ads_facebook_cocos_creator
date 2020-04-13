
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CSuggestGesture.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70d39mJjwVHm5ysckvxpTmp', 'CSuggestGesture');
// scripts/CSuggestGesture.js

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
    imgHand: {
      "default": null,
      type: cc.Sprite
    },
    imgArrows: {
      "default": [],
      type: [cc.Sprite]
    }
  },
  ctor: function ctor() {
    this._posHand = null;
  },
  onLoad: function onLoad() {
    this._posHand = this.imgHand.node.getPosition(); // this.imgHand.active = false;
    // var len = this.imgArrows.length;
    // for (var i = 0; i < len; i++) {
    //     this.imgArrows[i].active = false;
    // }
  },
  start: function start() {},
  update: function update(dt) {},
  onEnable: function onEnable() {
    var times = 3;
    var offset = 200;
    var duration = 0.7;
    var period = 0.3;
    var delay = 3;
    this.imgHand.node.stopAllActions();
    this.imgHand.node.setPosition(this._posHand);
    this.imgHand.node.runAction(cc.repeatForever(cc.sequence(cc.repeat(cc.sequence(cc.moveTo(0, this._posHand.x, this._posHand.y), cc.show(), cc.moveTo(duration, this._posHand.x, this._posHand.y + offset), cc.delayTime(period), cc.hide()), times), cc.hide(), cc.delayTime(delay))));
    var len = this.imgArrows.length;

    for (var i = 0; i < len; i++) {
      var row = this.imgArrows[i];
      row.node.stopAllActions();
      row.node.runAction(cc.repeatForever(cc.sequence(cc.repeat(cc.sequence(cc.hide(), cc.delayTime(0.125 * i), cc.show(), cc.delayTime(0.125 * (len + 1 - i)), cc.hide()), times * 2), cc.hide(), cc.delayTime(delay))));
    } // this.imgHand.active = true;
    // var len = this.imgArrows.length;
    // for (var i = 0; i < len; i++) {
    //     this.imgArrows[i].active = true;
    // }

  },
  onDisable: function onDisable() {// this.imgHand.active = false;
    // var len = this.imgArrows.length;
    // for (var i = 0; i < len; i++) {
    //     this.imgArrows[i].active = false;
    // }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ1N1Z2dlc3RHZXN0dXJlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaW1nSGFuZCIsInR5cGUiLCJTcHJpdGUiLCJpbWdBcnJvd3MiLCJjdG9yIiwiX3Bvc0hhbmQiLCJvbkxvYWQiLCJub2RlIiwiZ2V0UG9zaXRpb24iLCJzdGFydCIsInVwZGF0ZSIsImR0Iiwib25FbmFibGUiLCJ0aW1lcyIsIm9mZnNldCIsImR1cmF0aW9uIiwicGVyaW9kIiwiZGVsYXkiLCJzdG9wQWxsQWN0aW9ucyIsInNldFBvc2l0aW9uIiwicnVuQWN0aW9uIiwicmVwZWF0Rm9yZXZlciIsInNlcXVlbmNlIiwicmVwZWF0IiwibW92ZVRvIiwieCIsInkiLCJzaG93IiwiZGVsYXlUaW1lIiwiaGlkZSIsImxlbiIsImxlbmd0aCIsImkiLCJyb3ciLCJvbkRpc2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUM7QUFDSixpQkFBUSxJQURKO0FBRUpDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZKLEtBREE7QUFLUkMsSUFBQUEsU0FBUyxFQUFDO0FBQ04saUJBQVEsRUFERjtBQUVORixNQUFBQSxJQUFJLEVBQUMsQ0FBQ0wsRUFBRSxDQUFDTSxNQUFKO0FBRkM7QUFMRixHQUhQO0FBY0xFLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxHQWhCSTtBQWlCTEMsRUFBQUEsTUFqQkssb0JBaUJLO0FBQ04sU0FBS0QsUUFBTCxHQUFnQixLQUFLTCxPQUFMLENBQWFPLElBQWIsQ0FBa0JDLFdBQWxCLEVB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IC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaW1nSGFuZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0Fycm93czp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6W2NjLlNwcml0ZV1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLl9wb3NIYW5kID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3Bvc0hhbmQgPSB0aGlzLmltZ0hhbmQubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuaW1nSGFuZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB2YXIgbGVuID0gdGhpcy5pbWdBcnJvd3MubGVuZ3RoO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5pbWdBcnJvd3NbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7fSxcclxuXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVzID0gMztcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gMjAwO1xyXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IDAuNztcclxuICAgICAgICB2YXIgcGVyaW9kID0gMC4zO1xyXG4gICAgICAgIHZhciBkZWxheSA9IDM7XHJcbiAgICAgICAgdGhpcy5pbWdIYW5kLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmltZ0hhbmQubm9kZS5zZXRQb3NpdGlvbih0aGlzLl9wb3NIYW5kKTtcclxuICAgICAgICB0aGlzLmltZ0hhbmQubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5yZXBlYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLHRoaXMuX3Bvc0hhbmQueCx0aGlzLl9wb3NIYW5kLnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zaG93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhkdXJhdGlvbix0aGlzLl9wb3NIYW5kLngsdGhpcy5fcG9zSGFuZC55ICsgb2Zmc2V0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHBlcmlvZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICx0aW1lcyksXHJcbiAgICAgICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoZGVsYXkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5pbWdBcnJvd3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuaW1nQXJyb3dzW2ldO1xyXG4gICAgICAgICAgICByb3cubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICByb3cubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJlcGVhdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4xMjUgKiBpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNob3coKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgwLjEyNSAqIChsZW4gKyAxIC0gaSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksdGltZXMgKiAyKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGRlbGF5KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5pbWdIYW5kLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdmFyIGxlbiA9IHRoaXMuaW1nQXJyb3dzLmxlbmd0aDtcclxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW1nQXJyb3dzW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSxcclxuICAgIG9uRGlzYWJsZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pbWdIYW5kLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHZhciBsZW4gPSB0aGlzLmltZ0Fycm93cy5sZW5ndGg7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmltZ0Fycm93c1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=