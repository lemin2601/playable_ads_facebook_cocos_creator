
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NTdWdnZXN0R2VzdHVyZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImltZ0hhbmQiLCJ0eXBlIiwiU3ByaXRlIiwiaW1nQXJyb3dzIiwiY3RvciIsIl9wb3NIYW5kIiwib25Mb2FkIiwibm9kZSIsImdldFBvc2l0aW9uIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsIm9uRW5hYmxlIiwidGltZXMiLCJvZmZzZXQiLCJkdXJhdGlvbiIsInBlcmlvZCIsImRlbGF5Iiwic3RvcEFsbEFjdGlvbnMiLCJzZXRQb3NpdGlvbiIsInJ1bkFjdGlvbiIsInJlcGVhdEZvcmV2ZXIiLCJzZXF1ZW5jZSIsInJlcGVhdCIsIm1vdmVUbyIsIngiLCJ5Iiwic2hvdyIsImRlbGF5VGltZSIsImhpZGUiLCJsZW4iLCJsZW5ndGgiLCJpIiwicm93Iiwib25EaXNhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSixLQURBO0FBS1JDLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFRLEVBREY7QUFFTkYsTUFBQUEsSUFBSSxFQUFDLENBQUNMLEVBQUUsQ0FBQ00sTUFBSjtBQUZDO0FBTEYsR0FIUDtBQWNMRSxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsR0FoQkk7QUFpQkxDLEVBQUFBLE1BakJLLG9CQWlCSztBQUNOLFNBQUtELFFBQUwsR0FBZ0IsS0FBS0wsT0FBTCxDQUFhTyxJQUFiLENBQWtCQyxXQUFsQixFQUFo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IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGltZ0hhbmQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWdBcnJvd3M6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5TcHJpdGVdXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fcG9zSGFuZCA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLl9wb3NIYW5kID0gdGhpcy5pbWdIYW5kLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAvLyB0aGlzLmltZ0hhbmQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdmFyIGxlbiA9IHRoaXMuaW1nQXJyb3dzLmxlbmd0aDtcclxuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW1nQXJyb3dzW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge30sXHJcblxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aW1lcyA9IDM7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IDIwMDtcclxuICAgICAgICB2YXIgZHVyYXRpb24gPSAwLjc7XHJcbiAgICAgICAgdmFyIHBlcmlvZCA9IDAuMztcclxuICAgICAgICB2YXIgZGVsYXkgPSAzO1xyXG4gICAgICAgIHRoaXMuaW1nSGFuZC5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pbWdIYW5kLm5vZGUuc2V0UG9zaXRpb24odGhpcy5fcG9zSGFuZCk7XHJcbiAgICAgICAgdGhpcy5pbWdIYW5kLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgY2MucmVwZWF0KFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMCx0aGlzLl9wb3NIYW5kLngsdGhpcy5fcG9zSGFuZC55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2hvdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oZHVyYXRpb24sdGhpcy5fcG9zSGFuZC54LHRoaXMuX3Bvc0hhbmQueSArIG9mZnNldCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShwZXJpb2QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5oaWRlKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAsdGltZXMpLFxyXG4gICAgICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKGRlbGF5KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuaW1nQXJyb3dzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmltZ0Fycm93c1tpXTtcclxuICAgICAgICAgICAgcm93Lm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgcm93Lm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5yZXBlYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMTI1ICogaSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zaG93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMC4xMjUgKiAobGVuICsgMSAtIGkpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLHRpbWVzICogMiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZShkZWxheSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuaW1nSGFuZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHZhciBsZW4gPSB0aGlzLmltZ0Fycm93cy5sZW5ndGg7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmltZ0Fycm93c1tpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcbiAgICBvbkRpc2FibGU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIHRoaXMuaW1nSGFuZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB2YXIgbGVuID0gdGhpcy5pbWdBcnJvd3MubGVuZ3RoO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5pbWdBcnJvd3NbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59KTtcclxuIl19