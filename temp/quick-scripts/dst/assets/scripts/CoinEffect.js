
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CoinEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb6b7QuI2dEGKS9rirjqIoi', 'CoinEffect');
// scripts/CoinEffect.js

"use strict";

module.exports = {
  Const: {
    TYPE: {
      RAIN: 0
    },
    GRAVITY: 800,
    RATE_SPEED_X: 300,
    RATE_SPEED_Y: -600,
    RATE_SPEED_R: 250,
    RATE_Position_Y: 400,
    MIN_SCALE: 0.67,
    MAX_SCALE: 1,
    RATE_JUMP_BACK: 0.5
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ29pbkVmZmVjdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiQ29uc3QiLCJUWVBFIiwiUkFJTiIsIkdSQVZJVFkiLCJSQVRFX1NQRUVEX1giLCJSQVRFX1NQRUVEX1kiLCJSQVRFX1NQRUVEX1IiLCJSQVRFX1Bvc2l0aW9uX1kiLCJNSU5fU0NBTEUiLCJNQVhfU0NBTEUiLCJSQVRFX0pVTVBfQkFDSyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JDLEVBQUFBLEtBQUssRUFBQztBQUNGQyxJQUFBQSxJQUFJLEVBQUM7QUFDREMsTUFBQUEsSUFBSSxFQUFDO0FBREosS0FESDtBQUlGQyxJQUFBQSxPQUFPLEVBQUMsR0FKTjtBQUtGQyxJQUFBQSxZQUFZLEVBQUMsR0FMWDtBQU1GQyxJQUFBQSxZQUFZLEVBQUMsQ0FBQyxHQU5aO0FBT0ZDLElBQUFBLFlBQVksRUFBQyxHQVBYO0FBUUZDLElBQUFBLGVBQWUsRUFBQyxHQVJkO0FBU0ZDLElBQUFBLFNBQVMsRUFBQyxJQVRSO0FBVUZDLElBQUFBLFNBQVMsRUFBQyxDQVZSO0FBV0ZDLElBQUFBLGNBQWMsRUFBQztBQVhiO0FBRE8sQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgQ29uc3Q6e1xyXG4gICAgICAgIFRZUEU6e1xyXG4gICAgICAgICAgICBSQUlOOjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIEdSQVZJVFk6ODAwLFxyXG4gICAgICAgIFJBVEVfU1BFRURfWDozMDAsXHJcbiAgICAgICAgUkFURV9TUEVFRF9ZOi02MDAsXHJcbiAgICAgICAgUkFURV9TUEVFRF9SOjI1MCxcclxuICAgICAgICBSQVRFX1Bvc2l0aW9uX1k6NDAwLFxyXG4gICAgICAgIE1JTl9TQ0FMRTowLjY3LFxyXG4gICAgICAgIE1BWF9TQ0FMRToxLFxyXG4gICAgICAgIFJBVEVfSlVNUF9CQUNLOjAuNVxyXG4gICAgfVxyXG59Il19