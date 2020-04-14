
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
    this._posSearch = this.bgSearch.node.getPosition();
    this._posButton = this.btnPlayNow.node.getPosition();
  },
  onEnable: function onEnable() {
    this.node.stopAllActions();
    this.bgSearch.node.setPosition(this._posSearch.x, -480);
    this.btnPlayNow.node.setPosition(this._posButton.x, -480);
    this.iconSearch.node.scale = 0;
    var str = "Pusoy Dos Zingplay.";
    var len = str.length;
    var s = '';
    var index = 0;
    this.lbSearch.string = s;
    this.bgSearch.node.runAction(cc.moveTo(0.5, this._posSearch));
    this.iconSearch.node.runAction(cc.sequence(cc.hide(), cc.delayTime(0.7), cc.show(), cc.scaleTo(0.5, 1, 1)));
    this.lbSearch.node.runAction(cc.sequence(cc.delayTime(1.5), cc.repeat(cc.sequence(cc.callFunc(function (sender) {
      s = s + str[index++];
      sender.getComponent(cc.Label).string = s;
    }), cc.delayTime(0.1)), len)));
    this.btnPlayNow.node.runAction(cc.sequence(cc.hide(), cc.delayTime(1.5), cc.show(), cc.moveTo(0.5, this._posButton)));
    this.btnPlayNow.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2), cc.rotateTo(0.2, -2), cc.rotateTo(0.2, 4), cc.rotateTo(0.2, -3), cc.rotateTo(0.2, 0), cc.delayTime(1), cc.jumpTo(1, this._posButton, 20, 3))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NIcGxheS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJnU2VhcmNoIiwidHlwZSIsIlNwcml0ZSIsImljb25TZWFyY2giLCJsYlNlYXJjaCIsIkxhYmVsIiwiYnRuUGxheU5vdyIsIkJ1dHRvbiIsImN0b3IiLCJfcG9zU2VhcmNoIiwiX3Bvc0J1dHRvbiIsIm9uTG9hZCIsIm5vZGUiLCJnZXRQb3NpdGlvbiIsIm9uRW5hYmxlIiwic3RvcEFsbEFjdGlvbnMiLCJzZXRQb3NpdGlvbiIsIngiLCJzY2FsZSIsInN0ciIsImxlbiIsImxlbmd0aCIsInMiLCJpbmRleCIsInN0cmluZyIsInJ1bkFjdGlvbiIsIm1vdmVUbyIsInNlcXVlbmNlIiwiaGlkZSIsImRlbGF5VGltZSIsInNob3ciLCJzY2FsZVRvIiwicmVwZWF0IiwiY2FsbEZ1bmMiLCJzZW5kZXIiLCJnZXRDb21wb25lbnQiLCJyZXBlYXRGb3JldmVyIiwicm90YXRlVG8iLCJqdW1wVG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZILEtBREQ7QUFLUkMsSUFBQUEsVUFBVSxFQUFDO0FBQ1AsaUJBQVEsSUFERDtBQUVQRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGRCxLQUxIO0FBU1JFLElBQUFBLFFBQVEsRUFBQztBQUNMLGlCQUFRLElBREg7QUFFTEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNTO0FBRkgsS0FURDtBQWFSQyxJQUFBQSxVQUFVLEVBQUM7QUFDUCxp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cUJhLFNBQXJCLENBQStCN0IsRUFBRSxDQUFDd0MsYUFBSCxDQUFpQnhDLEVBQUUsQ0FBQytCLFFBQUgsQ0FDNUMvQixFQUFFLENBQUNpQyxTQUFILENBQWEsQ0FBYixDQUQ0QyxFQUU1Q2pDLEVBQUUsQ0FBQ3lDLFFBQUgsQ0FBWSxHQUFaLEVBQWdCLENBQUMsQ0FBakIsQ0FGNEMsRUFHNUN6QyxFQUFFLENBQUN5QyxRQUFILENBQVksR0FBWixFQUFnQixDQUFoQixDQUg0QyxFQUk1Q3pDLEVBQUUsQ0FBQ3lDLFFBQUgsQ0FBWSxHQUFaLEVBQWdCLENBQUMsQ0FBakIsQ0FKNEMsRUFLNUN6QyxFQUFFLENBQUN5QyxRQUFILENBQVksR0FBWixFQUFnQixDQUFoQixDQUw0QyxFQU01Q3pDLEVBQUUsQ0FBQ2lDLFNBQUgsQ0FBYSxDQUFiLENBTjRDLEVBTzVDakMsRUFBRSxDQUFDMEMsTUFBSCxDQUFVLENBQVYsRUFBWSxLQUFLNUIsVUFBakIsRUFBNEIsRUFBNUIsRUFBK0IsQ0FBL0IsQ0FQNEMsQ0FBakIsQ0FBL0I7QUFTSCxHQXZFSSxDQXdFTDs7QUF4RUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJnU2VhcmNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWNvblNlYXJjaDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiU2VhcmNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QbGF5Tm93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkJ1dHRvblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5fcG9zU2VhcmNoID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9wb3NCdXR0b24gPSBudWxsO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3Bvc1NlYXJjaCA9IHRoaXMuYmdTZWFyY2gubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3Bvc0J1dHRvbiA9IHRoaXMuYnRuUGxheU5vdy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgb25FbmFibGU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuYmdTZWFyY2gubm9kZS5zZXRQb3NpdGlvbih0aGlzLl9wb3NTZWFyY2gueCwtNDgwKTtcclxuICAgICAgICB0aGlzLmJ0blBsYXlOb3cubm9kZS5zZXRQb3NpdGlvbih0aGlzLl9wb3NCdXR0b24ueCwtNDgwKTtcclxuICAgICAgICB0aGlzLmljb25TZWFyY2gubm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiUHVzb3kgRG9zIFppbmdwbGF5LlwiO1xyXG4gICAgICAgIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzID0gJyc7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxiU2VhcmNoLnN0cmluZyA9IHM7XHJcbiAgICAgICAgdGhpcy5iZ1NlYXJjaC5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC41LHRoaXMuX3Bvc1NlYXJjaCkpO1xyXG4gICAgICAgIHRoaXMuaWNvblNlYXJjaC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuaGlkZSgpLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMC43KSxcclxuICAgICAgICAgICAgY2Muc2hvdygpLFxyXG4gICAgICAgICAgICBjYy5zY2FsZVRvKDAuNSwxLDEpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sYlNlYXJjaC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEuNSksXHJcbiAgICAgICAgICAgIGNjLnJlcGVhdChjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKGZ1bmN0aW9uIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gcyArIHN0cltpbmRleCArK107XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcztcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDAuMSlcclxuICAgICAgICAgICAgKSxsZW4pXHJcbiAgICAgICAgKSk7XHJcbiAgICAgICAgdGhpcy5idG5QbGF5Tm93Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5oaWRlKCksXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjUpLFxyXG4gICAgICAgICAgICBjYy5zaG93KCksXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbygwLjUsdGhpcy5fcG9zQnV0dG9uKSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYnRuUGxheU5vdy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMiwtMiksXHJcbiAgICAgICAgICAgIGNjLnJvdGF0ZVRvKDAuMiw0KSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLC0zKSxcclxuICAgICAgICAgICAgY2Mucm90YXRlVG8oMC4yLDApLFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgIGNjLmp1bXBUbygxLHRoaXMuX3Bvc0J1dHRvbiwyMCwzKVxyXG4gICAgICAgICkpKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19