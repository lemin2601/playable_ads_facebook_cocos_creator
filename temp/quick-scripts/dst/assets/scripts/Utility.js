
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Utility.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03f42tN4dFFZ57ZmRNgSNMC', 'Utility');
// scripts/Utility.js

"use strict";

var Utility = {};
Utility.units = [{
  prefix: 'G',
  l: 12,
  div: 1000000000000
}, {
  prefix: 'B',
  l: 9,
  div: 1000000000
}, {
  prefix: 'M',
  l: 6,
  div: 1000000
}, {
  prefix: 'K',
  l: 4,
  div: 1000
}, {
  prefix: '',
  l: 3,
  div: 1
}];
/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */

Utility.formatMoney = function (money, unit, separator) {
  if (unit === undefined) unit = "";
  return unit + Utility.formatAlignNumber(money, separator);
};
/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */


Utility.formatMoneyFull = function (money, unit, separator) {
  if (unit === undefined) unit = "";
  return unit + Utility.formatAlignNumber(money, separator, true);
};
/**
 *
 * @param number
 * @param separator
 * @param isFull
 * @returns {*}
 */


Utility.formatAlignNumber = function (number, separator, isFull) {
  if (number === undefined) return "0";
  number -= -0.1; //magic

  if (separator === undefined) {
    separator = ",";
  }

  if (isFull === undefined) {
    isFull = false;
  }

  var isNegative = number < 0;
  number = Math.abs(Math.round(number));
  var numString = number.toString();

  if (isFull) {
    var curIndex = numString.length - 3;

    while (curIndex > 0) {
      numString = numString.insertAt(curIndex, separator);
      curIndex -= 3;
    }
  } else {
    var units = Utility.units;

    for (var i = 0, length = units.length; i < length; ++i) {
      if (numString.length > units[i].l) {
        var tmpNumArr = (number / units[i].div).toString().split('.');
        var fixedLength = tmpNumArr[0].length > 2 ? 1 : 2; // insert separator

        if (tmpNumArr[0].length > 3) {
          curIndex = tmpNumArr[0].length - 3;

          while (curIndex > 0) {
            tmpNumArr[0] = tmpNumArr[0].insertAt(curIndex, separator);
            curIndex -= 3;
          }
        }

        numString = tmpNumArr[0]; // append fixed

        if (tmpNumArr.length > 1) {
          numString += '.' + tmpNumArr[1].substr(0, fixedLength);
        }

        numString += units[i].prefix;
        break;
      }
    }
  }

  if (isNegative) {
    numString = "-" + numString;
  } //ZLog.debug("num String = %s", numString);


  return numString;
};

module.exports = Utility;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVXRpbGl0eS5qcyJdLCJuYW1lcyI6WyJVdGlsaXR5IiwidW5pdHMiLCJwcmVmaXgiLCJsIiwiZGl2IiwiZm9ybWF0TW9uZXkiLCJtb25leSIsInVuaXQiLCJzZXBhcmF0b3IiLCJ1bmRlZmluZWQiLCJmb3JtYXRBbGlnbk51bWJlciIsImZvcm1hdE1vbmV5RnVsbCIsIm51bWJlciIsImlzRnVsbCIsImlzTmVnYXRpdmUiLCJNYXRoIiwiYWJzIiwicm91bmQiLCJudW1TdHJpbmciLCJ0b1N0cmluZyIsImN1ckluZGV4IiwibGVuZ3RoIiwiaW5zZXJ0QXQiLCJpIiwidG1wTnVtQXJyIiwic3BsaXQiLCJmaXhlZExlbmd0aCIsInN1YnN0ciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEVBQWQ7QUFDQUEsT0FBTyxDQUFDQyxLQUFSLEdBQWdCLENBQ1o7QUFBQ0MsRUFBQUEsTUFBTSxFQUFFLEdBQVQ7QUFBY0MsRUFBQUEsQ0FBQyxFQUFFLEVBQWpCO0FBQXFCQyxFQUFBQSxHQUFHLEVBQUU7QUFBMUIsQ0FEWSxFQUVaO0FBQUNGLEVBQUFBLE1BQU0sRUFBRSxHQUFUO0FBQWNDLEVBQUFBLENBQUMsRUFBRSxDQUFqQjtBQUFvQkMsRUFBQUEsR0FBRyxFQUFFO0FBQXpCLENBRlksRUFHWjtBQUFDRixFQUFBQSxNQUFNLEVBQUUsR0FBVDtBQUFjQyxFQUFBQSxDQUFDLEVBQUUsQ0FBakI7QUFBb0JDLEVBQUFBLEdBQUcsRUFBRTtBQUF6QixDQUhZLEVBSVo7QUFBQ0YsRUFBQUEsTUFBTSxFQUFFLEdBQVQ7QUFBY0MsRUFBQUEsQ0FBQyxFQUFFLENBQWpCO0FBQW9CQyxFQUFBQSxHQUFHLEVBQUU7QUFBekIsQ0FKWSxFQUtaO0FBQUNGLEVBQUFBLE1BQU0sRUFBRSxFQUFUO0FBQWFDLEVBQUFBLENBQUMsRUFBRSxDQUFoQjtBQUFtQkMsRUFBQUEsR0FB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QyxDQUFELENBQVQsR0FBZUEsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhRixRQUFiLENBQXNCRixRQUF0QixFQUFnQ1osU0FBaEMsQ0FBZjtBQUNBWSxZQUFBQSxRQUFRLElBQUksQ0FBWjtBQUNIO0FBQ0o7O0FBRURGLFFBQUFBLFNBQVMsR0FBR00sU0FBUyxDQUFDLENBQUQsQ0FBckIsQ0FkNkIsQ0FlN0I7O0FBQ0EsWUFBR0EsU0FBUyxDQUFDSCxNQUFWLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3BCSCxVQUFBQSxTQUFTLElBQUksTUFBTU0sU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhRyxNQUFiLENBQW9CLENBQXBCLEVBQXVCRCxXQUF2QixDQUFuQjtBQUNIOztBQUNEUixRQUFBQSxTQUFTLElBQUlqQixLQUFLLENBQUNzQixDQUFELENBQUwsQ0FBU3JCLE1BQXRCO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsTUFBR1ksVUFBSCxFQUFjO0FBQ1ZJLElBQUFBLFNBQVMsR0FBRyxNQUFNQSxTQUFsQjtBQUNILEdBdEQwRCxDQXdEM0Q7OztBQUNBLFNBQU9BLFNBQVA7QUFDSCxDQTFERDs7QUEyREFVLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLE9BQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVXRpbGl0eSA9IHt9O1xyXG5VdGlsaXR5LnVuaXRzID0gW1xyXG4gICAge3ByZWZpeDogJ0cnLCBsOiAxMiwgZGl2OiAxMDAwMDAwMDAwMDAwfSxcclxuICAgIHtwcmVmaXg6ICdCJywgbDogOSwgZGl2OiAxMDAwMDAwMDAwfSxcclxuICAgIHtwcmVmaXg6ICdNJywgbDogNiwgZGl2OiAxMDAwMDAwfSxcclxuICAgIHtwcmVmaXg6ICdLJywgbDogNCwgZGl2OiAxMDAwfSxcclxuICAgIHtwcmVmaXg6ICcnLCBsOiAzLCBkaXY6IDF9XHJcbl07XHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbW9uZXlcclxuICogQHBhcmFtIHVuaXRcclxuICogQHBhcmFtIHNlcGFyYXRvclxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblV0aWxpdHkuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihtb25leSwgdW5pdCwgc2VwYXJhdG9yKXtcclxuICAgIGlmKHVuaXQgPT09IHVuZGVmaW5lZCkgdW5pdCA9IFwiXCI7XHJcblxyXG4gICAgcmV0dXJuIHVuaXQgKyBVdGlsaXR5LmZvcm1hdEFsaWduTnVtYmVyKG1vbmV5LCBzZXBhcmF0b3IpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBtb25leVxyXG4gKiBAcGFyYW0gdW5pdFxyXG4gKiBAcGFyYW0gc2VwYXJhdG9yXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuVXRpbGl0eS5mb3JtYXRNb25leUZ1bGwgPSBmdW5jdGlvbihtb25leSwgdW5pdCwgc2VwYXJhdG9yKXtcclxuICAgIGlmKHVuaXQgPT09IHVuZGVmaW5lZCkgdW5pdCA9IFwiXCI7XHJcblxyXG4gICAgcmV0dXJuIHVuaXQgKyBVdGlsaXR5LmZvcm1hdEFsaWduTnVtYmVyKG1vbmV5LCBzZXBhcmF0b3IsIHRydWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBudW1iZXJcclxuICogQHBhcmFtIHNlcGFyYXRvclxyXG4gKiBAcGFyYW0gaXNGdWxsXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuVXRpbGl0eS5mb3JtYXRBbGlnbk51bWJlciA9IGZ1bmN0aW9uKG51bWJlciwgc2VwYXJhdG9yLCBpc0Z1bGwpe1xyXG4gICAgaWYobnVtYmVyID09PSB1bmRlZmluZWQpIHJldHVybiBcIjBcIjtcclxuXHJcbiAgICBudW1iZXIgLT0gLTAuMTsgLy9tYWdpY1xyXG4gICAgaWYoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNlcGFyYXRvciA9IFwiLFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzRnVsbCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBpc0Z1bGwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNOZWdhdGl2ZSA9IG51bWJlciA8IDA7XHJcbiAgICBudW1iZXIgPSBNYXRoLmFicyhNYXRoLnJvdW5kKG51bWJlcikpO1xyXG4gICAgdmFyIG51bVN0cmluZyA9IG51bWJlci50b1N0cmluZygpO1xyXG5cclxuICAgIGlmKGlzRnVsbCl7XHJcbiAgICAgICAgdmFyIGN1ckluZGV4ID0gbnVtU3RyaW5nLmxlbmd0aCAtIDM7XHJcblxyXG4gICAgICAgIHdoaWxlKGN1ckluZGV4ID4gMCl7XHJcbiAgICAgICAgICAgIG51bVN0cmluZyA9IG51bVN0cmluZy5pbnNlcnRBdChjdXJJbmRleCwgc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgY3VySW5kZXggLT0gMztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHZhciB1bml0cyA9IFV0aWxpdHkudW5pdHM7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuZ3RoID0gdW5pdHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICBpZihudW1TdHJpbmcubGVuZ3RoID4gdW5pdHNbaV0ubCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG1wTnVtQXJyID0gKG51bWJlciAvIHVuaXRzW2ldLmRpdikudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpeGVkTGVuZ3RoID0gdG1wTnVtQXJyWzBdLmxlbmd0aCA+IDIgPyAxIDogMjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbnNlcnQgc2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICBpZih0bXBOdW1BcnJbMF0ubGVuZ3RoID4gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VySW5kZXggPSB0bXBOdW1BcnJbMF0ubGVuZ3RoIC0gMztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoY3VySW5kZXggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wTnVtQXJyWzBdID0gdG1wTnVtQXJyWzBdLmluc2VydEF0KGN1ckluZGV4LCBzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJJbmRleCAtPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBudW1TdHJpbmcgPSB0bXBOdW1BcnJbMF07XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgZml4ZWRcclxuICAgICAgICAgICAgICAgIGlmKHRtcE51bUFyci5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBudW1TdHJpbmcgKz0gJy4nICsgdG1wTnVtQXJyWzFdLnN1YnN0cigwLCBmaXhlZExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBudW1TdHJpbmcgKz0gdW5pdHNbaV0ucHJlZml4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaXNOZWdhdGl2ZSl7XHJcbiAgICAgICAgbnVtU3RyaW5nID0gXCItXCIgKyBudW1TdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy9aTG9nLmRlYnVnKFwibnVtIFN0cmluZyA9ICVzXCIsIG51bVN0cmluZyk7XHJcbiAgICByZXR1cm4gbnVtU3RyaW5nO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdHk7Il19