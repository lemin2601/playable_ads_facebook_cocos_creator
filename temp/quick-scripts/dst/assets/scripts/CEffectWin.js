
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
  // onLoad () {},
  // start () {},
  // update (dt) {},
  onEnable: function onEnable() {
    this._playEffectX8();

    this._playEffectLabelGold();

    this._playAllEmotions();

    this._delayShowCHPlay();
  },
  showNodeCHPlay: function showNodeCHPlay() {
    this.gameController.showNodeCHPlay();
  },
  _playAllEmotions: function _playAllEmotions() {
    function playEmo(emo) {
      if (emo) {
        var spine = emo.getComponent('sp.Skeleton');
        spine.setCompleteListener(function (trackEntry) {
          emo.active = false;
        });
        setTimeout(function () {
          emo.active = true;
          spine.setAnimation(0, 'animation', false);
        }, 1000);
      }
    }

    var l = this.emotions.length;

    for (var i = 0; i < l; i++) {
      var emo = this.emotions[i];
      playEmo(emo);
    }
  },
  _playEffectX8: function _playEffectX8() {
    var emo = this.spine;
    var spine = emo.getComponent('sp.Skeleton');
    spine.clearTracks();
    spine.setCompleteListener(function (trackEntry) {// spine.clearTracks();
      // emo.active = false;
    });
    emo.active = true;
    spine.setAnimation(0, 'animation', false);
  },
  _playEffectLabelGold: function _playEffectLabelGold() {
    var lose1 = 47000000;
    var lose2 = 58000000;
    var pot = 40000000;
    var win = pot + lose1 + lose2;

    function hideLabelonDone(label) {
      label.node.active = false;
    }

    Utility.runUpdateGold(this.lbLose1, 0, -lose1, undefined, undefined, hideLabelonDone, undefined, "", "", "$");
    Utility.runUpdateGold(this.lbLose2, 0, -lose1, undefined, undefined, hideLabelonDone, undefined, "", "", "$");
    Utility.runUpdateGold(this.lbWin, 0, win, undefined, undefined, undefined, undefined, "", "+", "$"); // Utility.runUpdateGold(this.lbLose2,0,-lose2);
    // Utility.runUpdateGold(this.lbWin,0,win);

    Utility.runUpdateGold(this.player1.getComponent("CPlayer").gold, lose1, 0);
    Utility.runUpdateGold(this.player2.getComponent("CPlayer").gold, lose2, 0);
  },
  _delayShowCHPlay: function _delayShowCHPlay() {
    this.node.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(function () {
      this.imgLose1.node.active = false;
      this.imgLose2.node.active = false;
      this.lbWin.node.active = false;
      this.showNodeCHPlay();
    }, this)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0VmZmVjdFdpbi5qcyJdLCJuYW1lcyI6WyJVdGlsaXR5IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3BpbmUiLCJ0eXBlIiwiTm9kZSIsImxiTG9zZTEiLCJMYWJlbCIsImxiTG9zZTIiLCJpbWdMb3NlMSIsIlNwcml0ZSIsImltZ0xvc2UyIiwibGJXaW4iLCJsYlBvdCIsInBsYXllcjEiLCJwbGF5ZXIyIiwiZW1vdGlvbnMiLCJjdG9yIiwiZ2FtZUNvbnRyb2xsZXIiLCJvbkVuYWJsZSIsIl9wbGF5RWZmZWN0WDgiLCJfcGxheUVmZmVjdExhYmVsR29sZCIsIl9wbGF5QWxsRW1vdGlvbnMiLCJfZGVsYXlTaG93Q0hQbGF5Iiwic2hvd05vZGVDSFBsYXkiLCJwbGF5RW1vIiwiZW1vIiwiZ2V0Q29tcG9uZW50Iiwic2V0Q29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJhY3RpdmUiLCJzZXRUaW1lb3V0Iiwic2V0QW5pbWF0aW9uIiwibCIsImxlbmd0aCIsImkiLCJjbGVhclRyYWNrcyIsImxvc2UxIiwibG9zZTIiLCJwb3QiLCJ3aW4iLCJoaWRlTGFiZWxvbkRvbmUiLCJsYWJlbCIsIm5vZGUiLCJydW5VcGRhdGVHb2xkIiwidW5kZWZpbmVkIiwiZ29sZCIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEtBQUssRUFBQztBQUNGLGlCQUFRLElBRE47QUFFRkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRk4sS0FERTtBQUtSQyxJQUFB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LFNBQWhFLEVBQTJFQSxTQUEzRSxFQUFzRixFQUF0RixFQUEwRixHQUExRixFQUE4RixHQUE5RixFQVY4QixDQVc5QjtBQUNBOztBQUNBaEQsSUFBQUEsT0FBTyxDQUFDK0MsYUFBUixDQUFzQixLQUFLOUIsT0FBTCxDQUFhYSxZQUFiLENBQTBCLFNBQTFCLEVBQXFDbUIsSUFBM0QsRUFBZ0VULEtBQWhFLEVBQXNFLENBQXRFO0FBQ0F4QyxJQUFBQSxPQUFPLENBQUMrQyxhQUFSLENBQXNCLEtBQUs3QixPQUFMLENBQWFZLFlBQWIsQ0FBMEIsU0FBMUIsRUFBcUNtQixJQUEzRCxFQUFnRVIsS0FBaEUsRUFBc0UsQ0FBdEU7QUFDSCxHQTVHSTtBQTZHTGYsRUFBQUEsZ0JBQWdCLEVBQUUsNEJBQVk7QUFDMUIsU0FBS29CLElBQUwsQ0FBVUksU0FBVixDQUFvQmhELEVBQUUsQ0FBQ2lELFFBQUgsQ0FDaEJqRCxFQUFFLENBQUNrRCxTQUFILENBQWEsQ0FBYixDQURnQixFQUVoQmxELEVBQUUsQ0FBQ21ELFFBQUgsQ0FBWSxZQUFZO0FBQ3BCLFdBQUt6QyxRQUFMLENBQWNrQyxJQUFkLENBQW1CYixNQUFuQixHQUE0QixLQUE1QjtBQUNBLFdBQUtuQixRQUFMLENBQWNnQyxJQUFkLENBQW1CYixNQUFuQixHQUE0QixLQUE1QjtBQUNBLFdBQUtsQixLQUFMLENBQVcrQixJQUFYLENBQWdCYixNQUFoQixHQUF5QixLQUF6QjtBQUNBLFdBQUtOLGNBQUw7QUFDSCxLQUxELEVBS0UsSUFMRixDQUZnQixDQUFwQjtBQVNIO0FBdkhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBVdGlsaXR5ID0gcmVxdWlyZShcIlV0aWxpdHlcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3BpbmU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJMb3NlMTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGJMb3NlMjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1nTG9zZTE6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuU3ByaXRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbWdMb3NlMjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5TcHJpdGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxiV2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYlBvdDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyMTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXIyOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtb3Rpb25zOntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpbY2MuTm9kZV1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG4gICAgLy8gc3RhcnQgKCkge30sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxuXHJcbiAgICBvbkVuYWJsZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3BsYXlFZmZlY3RYOCgpO1xyXG4gICAgICAgIHRoaXMuX3BsYXlFZmZlY3RMYWJlbEdvbGQoKTtcclxuICAgICAgICB0aGlzLl9wbGF5QWxsRW1vdGlvbnMoKTtcclxuICAgICAgICB0aGlzLl9kZWxheVNob3dDSFBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd05vZGVDSFBsYXk6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmdhbWVDb250cm9sbGVyLnNob3dOb2RlQ0hQbGF5KCk7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlBbGxFbW90aW9uczpmdW5jdGlvbigpe1xyXG4gICAgICAgIGZ1bmN0aW9uIHBsYXlFbW8oZW1vKSB7XHJcbiAgICAgICAgICAgIGlmKGVtbyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BpbmUgPSBlbW8uZ2V0Q29tcG9uZW50KCdzcC5Ta2VsZXRvbicpOyBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVtby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdhbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsID0gdGhpcy5lbW90aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGVtbyA9IHRoaXMuZW1vdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHBsYXlFbW8oZW1vKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFZmZlY3RYODogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbW8gPSB0aGlzLnNwaW5lO1xyXG4gICAgICAgIHZhciBzcGluZSA9IGVtby5nZXRDb21wb25lbnQoJ3NwLlNrZWxldG9uJyk7XHJcbiAgICAgICAgc3BpbmUuY2xlYXJUcmFja3MoKTtcclxuICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKGZ1bmN0aW9uKHRyYWNrRW50cnkpe1xyXG4gICAgICAgICAgICAvLyBzcGluZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICAvLyBlbW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZW1vLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdhbmltYXRpb24nLCBmYWxzZSk7XHJcbiAgICB9LFxyXG4gICAgX3BsYXlFZmZlY3RMYWJlbEdvbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbG9zZTEgPSA0NzAwMDAwMDtcclxuICAgICAgICB2YXIgbG9zZTIgPSA1ODAwMDAwMDtcclxuICAgICAgICB2YXIgcG90ID0gNDAwMDAwMDA7XHJcbiAgICAgICAgdmFyIHdpbiA9IHBvdCArIGxvc2UxICsgbG9zZTI7XHJcbiAgICAgICAgZnVuY3Rpb24gaGlkZUxhYmVsb25Eb25lKGxhYmVsKXtcclxuICAgICAgICAgICAgbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMubGJMb3NlMSwgMCwgLWxvc2UxLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGlkZUxhYmVsb25Eb25lLCB1bmRlZmluZWQsIFwiXCIsIFwiXCIsXCIkXCIpO1xyXG4gICAgICAgIFV0aWxpdHkucnVuVXBkYXRlR29sZCh0aGlzLmxiTG9zZTIsIDAsIC1sb3NlMSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpZGVMYWJlbG9uRG9uZSwgdW5kZWZpbmVkLCBcIlwiLCBcIlwiLFwiJFwiKTtcclxuICAgICAgICBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYldpbiwgMCwgd2luLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXCIsIFwiK1wiLFwiJFwiKTtcclxuICAgICAgICAvLyBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYkxvc2UyLDAsLWxvc2UyKTtcclxuICAgICAgICAvLyBVdGlsaXR5LnJ1blVwZGF0ZUdvbGQodGhpcy5sYldpbiwwLHdpbik7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMS5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTEsMCk7XHJcbiAgICAgICAgVXRpbGl0eS5ydW5VcGRhdGVHb2xkKHRoaXMucGxheWVyMi5nZXRDb21wb25lbnQoXCJDUGxheWVyXCIpLmdvbGQsbG9zZTIsMCk7XHJcbiAgICB9LFxyXG4gICAgX2RlbGF5U2hvd0NIUGxheTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSg0KSxcclxuICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdMb3NlMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdMb3NlMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYldpbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Tm9kZUNIUGxheSgpO1xyXG4gICAgICAgICAgICB9LHRoaXMpXHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=