
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PlayableAds.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce239sy/55Ox5FRnSgYmiSY', 'PlayableAds');
// scripts/PlayableAds.js

"use strict";

module.exports = {
  onCTAClick: function onCTAClick() {
    try {
      FbPlayableAd.onCTAClick();
      console.log("onCTAClick finish");
    } catch (e) {
      console.log("onCTAClick redirect");
      var r = confirm("Not playableAds, open store?");

      if (r === true) {
        window.location.href = "https://play.google.com/store/apps/details?id=com.rummy.pusoy.dos";
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWFibGVBZHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm9uQ1RBQ2xpY2siLCJGYlBsYXlhYmxlQWQiLCJjb25zb2xlIiwibG9nIiwiZSIsInIiLCJjb25maXJtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkMsRUFBQUEsVUFBVSxFQUFDLHNCQUFVO0FBQ2pCLFFBQUc7QUFDQ0MsTUFBQUEsWUFBWSxDQUFDRCxVQUFiO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaO0FBQ0gsS0FIRCxDQUdDLE9BQU9DLENBQVAsRUFBVTtBQUNQRixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBLFVBQUlFLENBQUMsR0FBR0MsT0FBTyxDQUFDLDhCQUFELENBQWY7O0FBQ0EsVUFBSUQsQ0FBQyxLQUFLLElBQVYsRUFBZ0I7QUFDWkUsUUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixtRUFBdkI7QUFDSDtBQUNKO0FBQ0o7QUFaWSxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBvbkNUQUNsaWNrOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBGYlBsYXlhYmxlQWQub25DVEFDbGljaygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ1RBQ2xpY2sgZmluaXNoXCIpO1xyXG4gICAgICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ1RBQ2xpY2sgcmVkaXJlY3RcIik7XHJcbiAgICAgICAgICAgIGxldCByID0gY29uZmlybShcIk5vdCBwbGF5YWJsZUFkcywgb3BlbiBzdG9yZT9cIik7XHJcbiAgICAgICAgICAgIGlmIChyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cHM6Ly9wbGF5Lmdvb2dsZS5jb20vc3RvcmUvYXBwcy9kZXRhaWxzP2lkPWNvbS5ydW1teS5wdXNveS5kb3NcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsiXX0=