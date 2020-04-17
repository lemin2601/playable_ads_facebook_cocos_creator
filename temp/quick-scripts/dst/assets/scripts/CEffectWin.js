
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
    },
    emotions: {
      "default": [],
      type: [cc.Node]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0VmZmVjdFdpbi5qcyJdLCJuYW1lcyI6WyJVdGlsaXR5IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BpbmUiLCJ0eXBlIiwiTm9kZSIsImxiTG9zZTEiLCJMYWJlbCIsImxiTG9zZTIiLCJpbWdMb3NlMSIsIlNwcml0ZSIsImltZ0xvc2UyIiwibGJXaW4iLCJsYlBvdCIsInBsYXllcjEiLCJwbGF5ZXIyIiwiZW1vdGlvbnMiLCJjdG9yIiwiZ2FtZUNvbnRyb2xsZXIiLCJvbkxvYWQiLCJvbkVuYWJsZSIsImxvc2UxIiwibG9zZTIiLCJwb3QiLCJ3aW4iLCJydW5VcGRhdGVHb2xkIiwiZ2V0Q29tcG9uZW50IiwiZ29sZCIsImVtbyIsImNsZWFyVHJhY2tzIiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJhY3RpdmUiLCJzZXRBbmltYXRpb24iLCJub2RlIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInNob3dOb2RlQ0hQbGF5Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBQztBQUNGLGlCQUFRLElBRE47QUFFRkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRk4sS0FERTtBQUtSQyxJQUFBQSxPQUFPLEVBQUM7QUFDSixpQkFBUSxJQURKO0FBRUpGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDUTtBQUZKLEtBTEE7QUFTUkMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVEsSUFESjtBQUVKSixNQUFBQSxJQUFJLEVBQUNMLEVBQUUs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dEMsRUFBRSxDQUFDdUMsUUFBSCxDQUFZLFlBQVk7QUFDcEIsV0FBSzdCLFFBQUwsQ0FBY3lCLElBQWQsQ0FBbUJGLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsV0FBS3JCLFFBQUwsQ0FBY3VCLElBQWQsQ0FBbUJGLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsV0FBS3BCLEtBQUwsQ0FBV3NCLElBQVgsQ0FBZ0JGLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsV0FBS08sY0FBTDtBQUNILEtBTEQsRUFLRSxJQUxGLENBRmdCLENBQXBCO0FBU0gsR0F0Rkk7QUF3RkxBLEVBQUFBLGNBQWMsRUFBQywwQkFBVTtBQUNyQixTQUFLckIsY0FBTCxDQUFvQnFCLGNBQXBCO0FBQ0gsR0ExRkk7QUEyRkxDLEVBQUFBLEtBM0ZLLG1CQTJGSSxDQUVSLENBN0ZJLENBK0ZMOztBQS9GSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoXCJVdGlsaXR5XCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNwaW5lOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiTG9zZTE6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiTG9zZTI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0xvc2UxOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGltZ0xvc2UyOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiV2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYlBvdDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyMTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXIyOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtb3Rpb25zOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpbY2MuTm9kZV1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxvc2UxID0gNDcwMDAwMDA7XHJcbiAgICAgICAgdmFyIGxvc2UyID0gNTgwMDAwMDA7XHJcbiAgICAgICAgdmFyIHBvdCA9IDQwMDAwMDAwO1xyXG4gICAgICAgIHZhciB3aW4gPSBwb3QgKyBsb3NlMSArIGxvc2UyO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiTG9zZTEsMCwtbG9zZTEpO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiTG9zZTIsMCwtbG9zZTIpO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiUG90LHBvdCwwKTtcclxuICAgICAgICBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYldpbiwwLHdpbik7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMS5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTEsMCk7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMi5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTIsMCk7XHJcbiAgICAgICAgdmFyIGVtbyA9IHRoaXMuc3BpbmU7XHJcbiAgICAgICAgdmFyIHNwaW5lID0gZW1vLmdldENvbXBvbmVudCgnc3AuU2tlbGV0b24nKTtcclxuICAgICAgICBzcGluZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoZnVuY3Rpb24odHJhY2tFbnRyeSl7XHJcbiAgICAgICAgICAgIC8vIHNwaW5lLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgICAgIC8vIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbW8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwgJ2FuaW1hdGlvbicsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDQpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0xvc2UxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0xvc2UyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxiV2luLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb2RlQ0hQbGF5KCk7XHJcbiAgICAgICAgICAgIH0sdGhpcylcclxuICAgICAgICApKVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93Tm9kZUNIUGxheTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIuc2hvd05vZGVDSFBsYXkoKTtcclxuICAgIH0sXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==