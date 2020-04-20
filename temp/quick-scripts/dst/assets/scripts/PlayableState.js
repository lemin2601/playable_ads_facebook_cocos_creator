
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PlayableState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd7e39F4OClL1IwzfB5UPkvI', 'PlayableState');
// scripts/PlayableState.js

"use strict";

var StateMachine = require('state-machine');

var visualize = require('state-machine-visualize');

var Transition = cc.Enum({
  PLAY: "play",
  ACTION1: "action1",
  ACTION2: 'action2',
  ACTION3: 'action3'
});
var State = cc.Enum({
  IDLE: "idle",
  STEP1: "step1",
  STEP2: "step2",
  STEP3: 'step3',
  FINISH: "finish"
});
var PlayableState = cc.Class({
  properties: {
    fsm: {
      "default": null,
      type: StateMachine,
      serializable: false,
      visible: false
    }
  },
  ctor: function ctor() {},
  load: function load() {
    this.fsm = new StateMachine({
      init: State.IDLE,
      transitions: [{
        name: Transition.PLAY,
        from: State.IDLE,
        to: State.STEP1
      }, {
        name: Transition.ACTION1,
        from: State.STEP1,
        to: State.STEP2
      }, {
        name: Transition.ACTION2,
        from: State.STEP2,
        to: State.STEP3
      }, {
        name: Transition.ACTION3,
        from: State.STEP3,
        to: State.FINISH
      }],
      methods: {
        onInvalidTransition: function onInvalidTransition(transition, from, to) {
          console.error("onInvalidTransition");
        },
        onPendingTransition: function onPendingTransition(transition, from, to) {
          console.error("onPendingTransition");
        },
        onBeforeMelt: function onBeforeMelt() {
          console.log('onEnter melted');
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              console.log('onEnter melted done');
              reject("abc");
            }, 200);
          });
        },
        onMelt: function onMelt() {
          console.log('I melted');
        },
        onFreeze: function onFreeze() {
          console.log('I froze');
        },
        onVaporize: function onVaporize() {
          console.log('I vaporized');
        },
        onCondense: function onCondense() {
          console.log('I condensed');
        }
      }
    });
    console.log("before" + this.fsm.state);

    try {
      this.fsm.melt();
    } catch (e) {
      console.log("catch day nef");
    }

    console.log("after" + this.fsm.state);
    setTimeout(function () {
      console.log("after1" + this.fsm.state);
      console.log(this.fsm.state);
    }.bind(this), 500);
    setTimeout(function () {
      console.log("continue meltd");
      this.fsm.melt(); // console.log("freeeze");
      // this.fsm.freeze();

      console.log(this.fsm.state);
    }.bind(this), 1000);
    this.fsm.freeze();
    console.log(this.fsm.state);
    console.log(visualize(this.fsm));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWFibGVTdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZU1hY2hpbmUiLCJyZXF1aXJlIiwidmlzdWFsaXplIiwiVHJhbnNpdGlvbiIsImNjIiwiRW51bSIsIlBMQVkiLCJBQ1RJT04xIiwiQUNUSU9OMiIsIkFDVElPTjMiLCJTdGF0ZSIsIklETEUiLCJTVEVQMSIsIlNURVAyIiwiU1RFUDMiLCJGSU5JU0giLCJQbGF5YWJsZVN0YXRlIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiZnNtIiwidHlwZSIsInNlcmlhbGl6YWJsZSIsInZpc2libGUiLCJjdG9yIiwibG9hZCIsImluaXQiLCJ0cmFuc2l0aW9ucyIsIm5hbWUiLCJmcm9tIiwidG8iLCJtZXRob2RzIiwib25JbnZhbGlkVHJhbnNpdGlvbiIsInRyYW5zaXRpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJvblBlbmRpbmdUcmFuc2l0aW9uIiwib25CZWZvcmVNZWx0IiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwib25NZWx0Iiwib25GcmVlemUiLCJvblZhcG9yaXplIiwib25Db25kZW5zZSIsInN0YXRlIiwibWVsdCIsImUiLCJiaW5kIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFlBQVksR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBMUI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRCxPQUFPLENBQUMseUJBQUQsQ0FBdkI7O0FBQ0EsSUFBSUUsVUFBVSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNyQkMsRUFBQUEsSUFBSSxFQUFLLE1BRFk7QUFFckJDLEVBQUFBLE9BQU8sRUFBRSxTQUZZO0FBR3JCQyxFQUFBQSxPQUFPLEVBQUUsU0FIWTtBQUlyQkMsRUFBQUEsT0FBTyxFQUFFO0FBSlksQ0FBUixDQUFqQjtBQU1BLElBQUlDLEtBQUssR0FBR04sRUFBRSxDQUFDQyxJQUFILENB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QUEsT0FBTyxDQUFDSSxHQUFSLENBQVluQyxTQUFTLENBQUMsS0FBS2lCLEdBQU4sQ0FBckI7QUFDSDtBQTFEd0IsQ0FBVCxDQUFwQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFN0YXRlTWFjaGluZSA9IHJlcXVpcmUoJ3N0YXRlLW1hY2hpbmUnKTtcclxudmFyIHZpc3VhbGl6ZSA9IHJlcXVpcmUoJ3N0YXRlLW1hY2hpbmUtdmlzdWFsaXplJyk7XHJcbnZhciBUcmFuc2l0aW9uID0gY2MuRW51bSh7XHJcbiAgICBQTEFZICAgOiBcInBsYXlcIixcclxuICAgIEFDVElPTjE6IFwiYWN0aW9uMVwiLFxyXG4gICAgQUNUSU9OMjogJ2FjdGlvbjInLFxyXG4gICAgQUNUSU9OMzogJ2FjdGlvbjMnXHJcbn0pO1xyXG52YXIgU3RhdGUgPSBjYy5FbnVtKHtcclxuICAgIElETEU6XCJpZGxlXCIsXHJcbiAgICBTVEVQMTpcInN0ZXAxXCIsXHJcbiAgICBTVEVQMjpcInN0ZXAyXCIsXHJcbiAgICBTVEVQMzonc3RlcDMnLFxyXG4gICAgRklOSVNIOlwiZmluaXNoXCJcclxufSk7XHJcblxyXG52YXIgUGxheWFibGVTdGF0ZSA9IGNjLkNsYXNzKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBmc206IHtcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOlN0YXRlTWFjaGluZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZTpmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uICgpIHt9LFxyXG4gICAgbG9hZDpmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGlzLmZzbSA9IG5ldyBTdGF0ZU1hY2hpbmUoe1xyXG4gICAgICAgICAgICBpbml0OiBTdGF0ZS5JRExFLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uczogW1xyXG4gICAgICAgICAgICAgICAge25hbWU6IFRyYW5zaXRpb24uUExBWSwgZnJvbTogU3RhdGUuSURMRSwgdG86IFN0YXRlLlNURVAxfSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiBUcmFuc2l0aW9uLkFDVElPTjEsIGZyb206IFN0YXRlLlNURVAxLCB0bzogU3RhdGUuU1RFUDJ9LFxyXG4gICAgICAgICAgICAgICAge25hbWU6IFRyYW5zaXRpb24uQUNUSU9OMiwgZnJvbTogU3RhdGUuU1RFUDIsIHRvOiBTdGF0ZS5TVEVQM30sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTogVHJhbnNpdGlvbi5BQ1RJT04zLCBmcm9tOiBTdGF0ZS5TVEVQMywgdG86IFN0YXRlLkZJTklTSH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkVHJhbnNpdGlvbjogZnVuY3Rpb24odHJhbnNpdGlvbiwgZnJvbSwgdG8pIHtjb25zb2xlLmVycm9yKFwib25JbnZhbGlkVHJhbnNpdGlvblwiKTt9LFxyXG4gICAgICAgICAgICAgICAgb25QZW5kaW5nVHJhbnNpdGlvbjogZnVuY3Rpb24odHJhbnNpdGlvbiwgZnJvbSwgdG8pIHtjb25zb2xlLmVycm9yKFwib25QZW5kaW5nVHJhbnNpdGlvblwiKTt9LFxyXG4gICAgICAgICAgICAgICAgb25CZWZvcmVNZWx0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25FbnRlciBtZWx0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRW50ZXIgbWVsdGVkIGRvbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcImFiY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25NZWx0OiAgICAgZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKCdJIG1lbHRlZCcpICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZyZWV6ZTogICBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ0kgZnJvemUnKSAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uVmFwb3JpemU6IGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZygnSSB2YXBvcml6ZWQnKSB9LFxyXG4gICAgICAgICAgICAgICAgb25Db25kZW5zZTogZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKCdJIGNvbmRlbnNlZCcpIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmVmb3JlXCIrdGhpcy5mc20uc3RhdGUpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnNtLm1lbHQoKTtcclxuICAgICAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXRjaCBkYXkgbmVmXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyXCIrdGhpcy5mc20uc3RhdGUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFmdGVyMVwiK3RoaXMuZnNtLnN0YXRlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5mc20uc3RhdGUpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSw1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRpbnVlIG1lbHRkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmZzbS5tZWx0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZnJlZWV6ZVwiKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5mc20uZnJlZXplKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnNtLnN0YXRlKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksMTAwMCk7XHJcbiAgICAgICAgdGhpcy5mc20uZnJlZXplKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mc20uc3RhdGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHZpc3VhbGl6ZSh0aGlzLmZzbSkpO1xyXG4gICAgfVxyXG5cclxufSk7Il19