
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CCHplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1895cduJFZDs6rxI33vPPph', 'CCHplay');
// scripts/CCHplay.js

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
    bgSearch: {
      "default": null,
      type: cc.Sprite
    },
    iconSearch: {
      "default": null,
      type: cc.Sprite
    },
    lbSearch: {
      "default": null,
      type: cc.Label
    },
    btnPlayNow: {
      "default": null,
      type: cc.Button
    }
  },
  ctor: function ctor() {
    this._posSearch = null;
    this._posButton = null;
  },
  onLoad: function onLoad() {
    this._posSearch = this.bgSearch.node.getPosition(); // this._posButton = this.btnPlayNow.node.getPosition();

    this._posButton = new cc.Vec2(0, -325);
  },
  onEnable: function onEnable() {
    this.node.stopAllActions(); // this.bgSearch.node.setPosition(this._posSearch.x,-680);
    // this.btnPlayNow.node.setPosition(this._posButton.x,-480);

    this.bgSearch.node.opacity = 0;
    this.bgSearch.node.scale = 2;
    this.iconSearch.node.scale = 0;
    var str = "Pusoy Dos ZingPlay";
    var len = str.length;
    var s = '';
    var index = 0;
    var timeMoveButton = 0.8;
    var timeSearch = 0.5;
    var timeIconSearch = 0.3;
    var timeText = 1;
    this.lbSearch.string = s;
    this.bgSearch.node.runAction(cc.sequence(cc.delayTime(timeMoveButton), cc.spawn(cc.scaleTo(timeSearch, 1, 1), cc.fadeIn(timeSearch / 2))));
    this.iconSearch.node.runAction(cc.sequence(cc.hide(), cc.delayTime(timeMoveButton + timeSearch), cc.show(), cc.scaleTo(timeIconSearch, 1, 1)));
    this.lbSearch.node.runAction(cc.sequence(cc.delayTime(timeMoveButton + timeSearch + timeIconSearch), cc.repeat(cc.sequence(cc.callFunc(function (sender) {
      s = s + str[index++];
      sender.getComponent(cc.Label).string = s;
    }), cc.delayTime(timeText / len)), len)));
    this.btnPlayNow.node.runAction(cc.moveTo(timeMoveButton, this._posButton.x, this._posButton.y).easing(cc.easeBackOut()));
    this.btnPlayNow.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2), cc.rotateTo(0.2, -1), cc.rotateTo(0.2, 2), cc.rotateTo(0.2, -1), cc.rotateTo(0.2, 0), cc.delayTime(1), cc.jumpTo(1, this._posButton, 5, 3))));
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NIcGxheS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnU2VhcmNoIiwidHlwZSIsIlNwcml0ZSIsImljb25TZWFyY2giLCJsYlNlYXJjaCIsIkxhYmVsIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImN0b3IiLCJfcG9zU2VhcmNoIiwiX3Bvc0J1dHRvbiIsIm9uTG9hZCIsIm5vZGUiLCJnZXRQb3NpdGlvbiIsIlZlYzIiLCJvbkVuYWJsZSIsInN0b3BBbGxBY3Rpb25zIiwib3BhY2l0eSIsInNjYWxlIiwic3RyIiwibGVuIiwibGVuZ3RoIiwicyIsImluZGV4IiwidGltZU1vdmVCdXR0b24iLCJ0aW1lU2VhcmNoIiwidGltZUljb25TZWFyY2giLCJ0aW1lVGV4dCIsInN0cmluZyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwic3Bhd24iLCJzY2FsZVRvIiwiZmFkZUluIiwiaGlkZSIsInNob3ciLCJyZXBlYXQiLCJjYWxsRnVuYyIsInNlbmRlciIsImdldENvbXBvbmVudCIsIm1vdmVUbyIsIngiLCJ5IiwiZWFzaW5nIiwiZWFzZUJhY2tPdXQiLCJyZXBlYXRGb3JldmVyIiwicm90YXRlVG8iLCJqdW1wVG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZILEtBREQ7QUFLUkMsSUFBQUEsVUFBVSxFQUFDO0FBQ1AsaUJBQVEsSUFERDtBQUVQRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRCxLQUxIO0FBU1JF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bGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmdTZWFyY2g6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpY29uU2VhcmNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJTZWFyY2g6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0blBsYXlOb3c6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQnV0dG9uXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLl9wb3NTZWFyY2ggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3Bvc0J1dHRvbiA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fcG9zU2VhcmNoID0gdGhpcy5iZ1NlYXJjaC5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgLy8gdGhpcy5fcG9zQnV0dG9uID0gdGhpcy5idG5QbGF5Tm93Lm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLl9wb3NCdXR0b24gPSBuZXcgY2MuVmVjMigwLC0zMjUpO1xyXG4gICAgfSxcclxuICAgIG9uRW5hYmxlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAvLyB0aGlzLmJnU2VhcmNoLm5vZGUuc2V0UG9zaXRpb24odGhpcy5fcG9zU2VhcmNoLngsLTY4MCk7XHJcbiAgICAgICAgLy8gdGhpcy5idG5QbGF5Tm93Lm5vZGUuc2V0UG9zaXRpb24odGhpcy5fcG9zQnV0dG9uLngsLTQ4MCk7XHJcbiAgICAgICAgdGhpcy5iZ1NlYXJjaC5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMuYmdTZWFyY2gubm9kZS5zY2FsZSA9IDI7XHJcbiAgICAgICAgdGhpcy5pY29uU2VhcmNoLm5vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHZhciBzdHIgPSBcIlB1c295IERvcyBaaW5nUGxheVwiO1xyXG4gICAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzID0gJyc7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVNb3ZlQnV0dG9uID0gMC44O1xyXG4gICAgICAgIHZhciB0aW1lU2VhcmNoID0gMC41O1xyXG4gICAgICAgIHZhciB0aW1lSWNvblNlYXJjaCA9IDAuMztcclxuICAgICAgICB2YXIgdGltZVRleHQgPSAxO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sYlNlYXJjaC5zdHJpbmcgPSBzO1xyXG4gICAgICAgIHRoaXMuYmdTZWFyY2gubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSh0aW1lTW92ZUJ1dHRvbiksXHJcbiAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbyh0aW1lU2VhcmNoLDEsMSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlSW4odGltZVNlYXJjaC8yKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgdGhpcy5pY29uU2VhcmNoLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSh0aW1lTW92ZUJ1dHRvbit0aW1lU2VhcmNoKSxcclxuICAgICAgICAgICAgY2Muc2hvdygpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKHRpbWVJY29uU2VhcmNoLDEsMSkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxiU2VhcmNoLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUodGltZU1vdmVCdXR0b24rdGltZVNlYXJjaCt0aW1lSWNvblNlYXJjaCksXHJcbiAgICAgICAgICAgIGNjLnJlcGVhdChjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gcyArIHN0cltpbmRleCArK107XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcztcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRpbWVUZXh0L2xlbilcclxuICAgICAgICAgICAgKSxsZW4pXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgdGhpcy5idG5QbGF5Tm93Lm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbyh0aW1lTW92ZUJ1dHRvbix0aGlzLl9wb3NCdXR0b24ueCwgdGhpcy5fcG9zQnV0dG9uLnkpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSk7XHJcbiAgICAgICAgdGhpcy5idG5QbGF5Tm93Lm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgyKSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLC0xKSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLDIpLFxyXG4gICAgICAgICAgICBjYy5yb3RhdGVUbygwLjIsLTEpLFxyXG4gICAgICAgICAgICBjYy5yb3RhdGVUbygwLjIsMCksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxKSxcclxuICAgICAgICAgICAgY2MuanVtcFRvKDEsdGhpcy5fcG9zQnV0dG9uLDUsMylcclxuICAgICAgICApKSk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==