
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1BsYXlhYmxlQWRzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvbkNUQUNsaWNrIiwiRmJQbGF5YWJsZUFkIiwiY29uc29sZSIsImxvZyIsImUiLCJyIiwiY29uZmlybSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JDLEVBQUFBLFVBQVUsRUFBQyxzQkFBVTtBQUNqQixRQUFHO0FBQ0NDLE1BQUFBLFlBQVksQ0FBQ0QsVUFBYjtBQUNBRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNILEtBSEQsQ0FHQyxPQUFPQyxDQUFQLEVBQVU7QUFDUEYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDQSxVQUFJRSxDQUFDLEdBQUdDLE9BQU8sQ0FBQyw4QkFBRCxDQUFmOztBQUNBLFVBQUlELENBQUMsS0FBSyxJQUFWLEVBQWdCO0FBQ1pFLFFBQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsbUVBQXZCO0FBQ0g7QUFDSjtBQUNKO0FBWlksQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgb25DVEFDbGljazpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgRmJQbGF5YWJsZUFkLm9uQ1RBQ2xpY2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkNUQUNsaWNrIGZpbmlzaFwiKTtcclxuICAgICAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkNUQUNsaWNrIHJlZGlyZWN0XCIpO1xyXG4gICAgICAgICAgICBsZXQgciA9IGNvbmZpcm0oXCJOb3QgcGxheWFibGVBZHMsIG9wZW4gc3RvcmU/XCIpO1xyXG4gICAgICAgICAgICBpZiAociA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD1jb20ucnVtbXkucHVzb3kuZG9zXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il19