
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NDSHBsYXkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiZ1NlYXJjaCIsInR5cGUiLCJTcHJpdGUiLCJpY29uU2VhcmNoIiwibGJTZWFyY2giLCJMYWJlbCIsImJ0blBsYXlOb3ciLCJCdXR0b24iLCJjdG9yIiwiX3Bvc1NlYXJjaCIsIl9wb3NCdXR0b24iLCJvbkxvYWQiLCJub2RlIiwiZ2V0UG9zaXRpb24iLCJWZWMyIiwib25FbmFibGUiLCJzdG9wQWxsQWN0aW9ucyIsIm9wYWNpdHkiLCJzY2FsZSIsInN0ciIsImxlbiIsImxlbmd0aCIsInMiLCJpbmRleCIsInRpbWVNb3ZlQnV0dG9uIiwidGltZVNlYXJjaCIsInRpbWVJY29uU2VhcmNoIiwidGltZVRleHQiLCJzdHJpbmciLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsInNwYXduIiwic2NhbGVUbyIsImZhZGVJbiIsImhpZGUiLCJzaG93IiwicmVwZWF0IiwiY2FsbEZ1bmMiLCJzZW5kZXIiLCJnZXRDb21wb25lbnQiLCJtb3ZlVG8iLCJ4IiwieSIsImVhc2luZyIsImVhc2VCYWNrT3V0IiwicmVwZWF0Rm9yZXZlciIsInJvdGF0ZVRvIiwianVtcFRvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFDO0FBQ0wsaUJBQVEsSUFESDtBQUVMQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSCxLQUREO0FBS1JDLElBQUFBLFVBQVUsRUFBQztBQUNQLGlCQUFRLElBREQ7QUFFUEYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkQsS0FMSDtBQVNSRSxJ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c3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnU2VhcmNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWNvblNlYXJjaDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiU2VhcmNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QbGF5Tm93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkJ1dHRvblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fcG9zU2VhcmNoID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9wb3NCdXR0b24gPSBudWxsO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3Bvc1NlYXJjaCA9IHRoaXMuYmdTZWFyY2gubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuX3Bvc0J1dHRvbiA9IHRoaXMuYnRuUGxheU5vdy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fcG9zQnV0dG9uID0gbmV3IGNjLlZlYzIoMCwtMzI1KTtcclxuICAgIH0sXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgLy8gdGhpcy5iZ1NlYXJjaC5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX3Bvc1NlYXJjaC54LC02ODApO1xyXG4gICAgICAgIC8vIHRoaXMuYnRuUGxheU5vdy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX3Bvc0J1dHRvbi54LC00ODApO1xyXG4gICAgICAgIHRoaXMuYmdTZWFyY2gubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmJnU2VhcmNoLm5vZGUuc2NhbGUgPSAyO1xyXG4gICAgICAgIHRoaXMuaWNvblNlYXJjaC5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICB2YXIgc3RyID0gXCJQdXNveSBEb3MgWmluZ1BsYXlcIjtcclxuICAgICAgICB2YXIgbGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgICB2YXIgcyA9ICcnO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcblxyXG4gICAgICAgIHZhciB0aW1lTW92ZUJ1dHRvbiA9IDAuODtcclxuICAgICAgICB2YXIgdGltZVNlYXJjaCA9IDAuNTtcclxuICAgICAgICB2YXIgdGltZUljb25TZWFyY2ggPSAwLjM7XHJcbiAgICAgICAgdmFyIHRpbWVUZXh0ID0gMTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubGJTZWFyY2guc3RyaW5nID0gcztcclxuICAgICAgICB0aGlzLmJnU2VhcmNoLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUodGltZU1vdmVCdXR0b24pLFxyXG4gICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8odGltZVNlYXJjaCwxLDEpLFxyXG4gICAgICAgICAgICAgICAgY2MuZmFkZUluKHRpbWVTZWFyY2gvMilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHRoaXMuaWNvblNlYXJjaC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUodGltZU1vdmVCdXR0b24rdGltZVNlYXJjaCksXHJcbiAgICAgICAgICAgIGNjLnNob3coKSxcclxuICAgICAgICAgICAgY2Muc2NhbGVUbyh0aW1lSWNvblNlYXJjaCwxLDEpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sYlNlYXJjaC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRpbWVNb3ZlQnV0dG9uK3RpbWVTZWFyY2grdGltZUljb25TZWFyY2gpLFxyXG4gICAgICAgICAgICBjYy5yZXBlYXQoY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyA9IHMgKyBzdHJbaW5kZXggKytdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRlci5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHM7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSh0aW1lVGV4dC9sZW4pXHJcbiAgICAgICAgICAgICksbGVuKVxyXG4gICAgICAgICkpO1xyXG4gICAgICAgIHRoaXMuYnRuUGxheU5vdy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8odGltZU1vdmVCdXR0b24sdGhpcy5fcG9zQnV0dG9uLngsIHRoaXMuX3Bvc0J1dHRvbi55KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgIHRoaXMuYnRuUGxheU5vdy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMiwtMSksXHJcbiAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMiwyKSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLC0xKSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLDApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygxLHRoaXMuX3Bvc0J1dHRvbiw1LDMpXHJcbiAgICAgICAgKSkpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=