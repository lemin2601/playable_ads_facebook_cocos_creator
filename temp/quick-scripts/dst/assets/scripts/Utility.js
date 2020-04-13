
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
      numString = numString.slice(0, curIndex) + separator + numString.slice(curIndex); // numString = numString.insertAt(curIndex, separator);

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

Utility.runUpdateGold = function (label, curGold, tarGold, funcFormat, cbInterval, cbDone, speratorFuncFormat, unitFuncFormat) {
  if (funcFormat === undefined) funcFormat = this.formatMoneyFull;
  if (curGold === undefined) curGold = 0;
  if (tarGold === undefined) tarGold = 0;
  label.string = funcFormat(10000);
  var numOfUpdate = 30;
  var delay = 0.05;
  var offset = (tarGold - curGold) / numOfUpdate;
  label.node.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(delay), cc.callFunc(function (sender) {
    curGold = Math.floor(curGold + offset);
    console.log("update new gold:" + curGold);
    label.string = funcFormat(curGold, unitFuncFormat, speratorFuncFormat);
    cbInterval && cbInterval(label, curGold);
  })), numOfUpdate), cc.callFunc(function (sender) {
    label.string = funcFormat(tarGold, unitFuncFormat, speratorFuncFormat);
    console.log("update tar gold:" + tarGold);
    cbDone && cbDone(label);
  })));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVXRpbGl0eS5qcyJdLCJuYW1lcyI6WyJVdGlsaXR5IiwidW5pdHMiLCJwcmVmaXgiLCJsIiwiZGl2IiwiZm9ybWF0TW9uZXkiLCJtb25leSIsInVuaXQiLCJzZXBhcmF0b3IiLCJ1bmRlZmluZWQiLCJmb3JtYXRBbGlnbk51bWJlciIsImZvcm1hdE1vbmV5RnVsbCIsIm51bWJlciIsImlzRnVsbCIsImlzTmVnYXRpdmUiLCJNYXRoIiwiYWJzIiwicm91bmQiLCJudW1TdHJpbmciLCJ0b1N0cmluZyIsImN1ckluZGV4IiwibGVuZ3RoIiwic2xpY2UiLCJpIiwidG1wTnVtQXJyIiwic3BsaXQiLCJmaXhlZExlbmd0aCIsImluc2VydEF0Iiwic3Vic3RyIiwicnVuVXBkYXRlR29sZCIsImxhYmVsIiwiY3VyR29sZCIsInRhckdvbGQiLCJmdW5jRm9ybWF0IiwiY2JJbnRlcnZhbCIsImNiRG9uZSIsInNwZXJhdG9yRnVuY0Zvcm1hdCIsInVuaXRGdW5jRm9ybWF0Iiwic3RyaW5nIiwibnVtT2ZVcGRhdGUiLCJkZWxheSIsIm9mZnNldCIsIm5vZGUiLCJydW5BY3Rpb24iLCJjYyIsInNlcXVlbmNlIiwicmVwZWF0IiwiZGVsYXlUaW1lIiwiY2FsbEZ1bmMiLCJzZW5kZXIiLCJmbG9vciIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBRyxFQUFkO0FBQ0FBLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQixDQUNaO0FBQUNDLEVBQUFBLE1BQU0sRUFBRSxHQUFUO0FBQWNDLEVBQUFBLENBQUMsRUFBRSxFQUFqQjtBQUFxQkMsRUFBQUEsR0FBRyxFQUFFO0FBQTFCLENBRFksRUFFWjtBQUFDRixFQUFBQSxNQUFNLEVBQUUsR0FBVDtBQUFjQyxFQUFBQSxDQUFDLEVBQUUsQ0FBakI7QUFBb0JDLEVBQUFBLEdBQUcsRUFBRTtBQUF6QixDQUZZ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LENBQVksVUFBVUMsTUFBVixFQUFrQjtBQUMxQm5CLElBQUFBLEtBQUssQ0FBQ1EsTUFBTixHQUFlTCxVQUFVLENBQUNELE9BQUQsRUFBU0ssY0FBVCxFQUF3QkQsa0JBQXhCLENBQXpCO0FBQ0FlLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFxQnBCLE9BQWpDO0FBQ0FHLElBQUFBLE1BQU0sSUFBSUEsTUFBTSxDQUFDTCxLQUFELENBQWhCO0FBQ0gsR0FKRCxDQVZpQixDQUFyQjtBQWdCSCxDQXpCRDs7QUEwQkF1QixNQUFNLENBQUNDLE9BQVAsR0FBaUJ0RCxPQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFV0aWxpdHkgPSB7fTtcclxuVXRpbGl0eS51bml0cyA9IFtcclxuICAgIHtwcmVmaXg6ICdHJywgbDogMTIsIGRpdjogMTAwMDAwMDAwMDAwMH0sXHJcbiAgICB7cHJlZml4OiAnQicsIGw6IDksIGRpdjogMTAwMDAwMDAwMH0sXHJcbiAgICB7cHJlZml4OiAnTScsIGw6IDYsIGRpdjogMTAwMDAwMH0sXHJcbiAgICB7cHJlZml4OiAnSycsIGw6IDQsIGRpdjogMTAwMH0sXHJcbiAgICB7cHJlZml4OiAnJywgbDogMywgZGl2OiAxfVxyXG5dO1xyXG4vKipcclxuICpcclxuICogQHBhcmFtIG1vbmV5XHJcbiAqIEBwYXJhbSB1bml0XHJcbiAqIEBwYXJhbSBzZXBhcmF0b3JcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5VdGlsaXR5LmZvcm1hdE1vbmV5ID0gZnVuY3Rpb24obW9uZXksIHVuaXQsIHNlcGFyYXRvcil7XHJcbiAgICBpZih1bml0ID09PSB1bmRlZmluZWQpIHVuaXQgPSBcIlwiO1xyXG5cclxuICAgIHJldHVybiB1bml0ICsgVXRpbGl0eS5mb3JtYXRBbGlnbk51bWJlcihtb25leSwgc2VwYXJhdG9yKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbW9uZXlcclxuICogQHBhcmFtIHVuaXRcclxuICogQHBhcmFtIHNlcGFyYXRvclxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblV0aWxpdHkuZm9ybWF0TW9uZXlGdWxsID0gZnVuY3Rpb24obW9uZXksIHVuaXQsIHNlcGFyYXRvcil7XHJcbiAgICBpZih1bml0ID09PSB1bmRlZmluZWQpIHVuaXQgPSBcIlwiO1xyXG5cclxuICAgIHJldHVybiB1bml0ICsgVXRpbGl0eS5mb3JtYXRBbGlnbk51bWJlcihtb25leSwgc2VwYXJhdG9yLCB0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gbnVtYmVyXHJcbiAqIEBwYXJhbSBzZXBhcmF0b3JcclxuICogQHBhcmFtIGlzRnVsbFxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblV0aWxpdHkuZm9ybWF0QWxpZ25OdW1iZXIgPSBmdW5jdGlvbihudW1iZXIsIHNlcGFyYXRvciwgaXNGdWxsKXtcclxuICAgIGlmKG51bWJlciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCIwXCI7XHJcblxyXG4gICAgbnVtYmVyIC09IC0wLjE7IC8vbWFnaWNcclxuICAgIGlmKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzZXBhcmF0b3IgPSBcIixcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZihpc0Z1bGwgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaXNGdWxsID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzTmVnYXRpdmUgPSBudW1iZXIgPCAwO1xyXG4gICAgbnVtYmVyID0gTWF0aC5hYnMoTWF0aC5yb3VuZChudW1iZXIpKTtcclxuICAgIHZhciBudW1TdHJpbmcgPSBudW1iZXIudG9TdHJpbmcoKTtcclxuXHJcbiAgICBpZihpc0Z1bGwpe1xyXG4gICAgICAgIHZhciBjdXJJbmRleCA9IG51bVN0cmluZy5sZW5ndGggLSAzO1xyXG5cclxuICAgICAgICB3aGlsZShjdXJJbmRleCA+IDApe1xyXG4gICAgICAgICAgICBudW1TdHJpbmcgPSBudW1TdHJpbmcuc2xpY2UoMCwgY3VySW5kZXgpICsgc2VwYXJhdG9yICsgbnVtU3RyaW5nLnNsaWNlKGN1ckluZGV4KTtcclxuICAgICAgICAgICAgLy8gbnVtU3RyaW5nID0gbnVtU3RyaW5nLmluc2VydEF0KGN1ckluZGV4LCBzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBjdXJJbmRleCAtPSAzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdmFyIHVuaXRzID0gVXRpbGl0eS51bml0cztcclxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW5ndGggPSB1bml0cy5sZW5ndGg7IGkgPCBsZW5ndGg7ICsraSl7XHJcbiAgICAgICAgICAgIGlmKG51bVN0cmluZy5sZW5ndGggPiB1bml0c1tpXS5sKXtcclxuICAgICAgICAgICAgICAgIHZhciB0bXBOdW1BcnIgPSAobnVtYmVyIC8gdW5pdHNbaV0uZGl2KS50b1N0cmluZygpLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZml4ZWRMZW5ndGggPSB0bXBOdW1BcnJbMF0ubGVuZ3RoID4gMiA/IDEgOiAyO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGluc2VydCBzZXBhcmF0b3JcclxuICAgICAgICAgICAgICAgIGlmKHRtcE51bUFyclswXS5sZW5ndGggPiAzKXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJJbmRleCA9IHRtcE51bUFyclswXS5sZW5ndGggLSAzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZShjdXJJbmRleCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBOdW1BcnJbMF0gPSB0bXBOdW1BcnJbMF0uaW5zZXJ0QXQoY3VySW5kZXgsIHNlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckluZGV4IC09IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG51bVN0cmluZyA9IHRtcE51bUFyclswXTtcclxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBmaXhlZFxyXG4gICAgICAgICAgICAgICAgaWYodG1wTnVtQXJyLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIG51bVN0cmluZyArPSAnLicgKyB0bXBOdW1BcnJbMV0uc3Vic3RyKDAsIGZpeGVkTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG51bVN0cmluZyArPSB1bml0c1tpXS5wcmVmaXg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihpc05lZ2F0aXZlKXtcclxuICAgICAgICBudW1TdHJpbmcgPSBcIi1cIiArIG51bVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvL1pMb2cuZGVidWcoXCJudW0gU3RyaW5nID0gJXNcIiwgbnVtU3RyaW5nKTtcclxuICAgIHJldHVybiBudW1TdHJpbmc7XHJcbn07XHJcblxyXG5VdGlsaXR5LnJ1blVwZGF0ZUdvbGQgPSBmdW5jdGlvbihsYWJlbCxjdXJHb2xkLHRhckdvbGQsZnVuY0Zvcm1hdCxjYkludGVydmFsLGNiRG9uZSxzcGVyYXRvckZ1bmNGb3JtYXQsdW5pdEZ1bmNGb3JtYXQpe1xyXG4gICAgaWYoZnVuY0Zvcm1hdCA9PT0gdW5kZWZpbmVkKSBmdW5jRm9ybWF0ID0gdGhpcy5mb3JtYXRNb25leUZ1bGw7XHJcbiAgICBpZihjdXJHb2xkID09PSB1bmRlZmluZWQpIGN1ckdvbGQgPSAwO1xyXG4gICAgaWYodGFyR29sZCA9PT0gdW5kZWZpbmVkKSB0YXJHb2xkID0gMDtcclxuXHJcbiAgICBsYWJlbC5zdHJpbmcgPSBmdW5jRm9ybWF0KDEwMDAwKTtcclxuICAgIHZhciBudW1PZlVwZGF0ZSA9IDMwO1xyXG4gICAgdmFyIGRlbGF5ID0gMC4wNTtcclxuICAgIHZhciBvZmZzZXQgPSAodGFyR29sZCAtIGN1ckdvbGQpL251bU9mVXBkYXRlO1xyXG4gICAgbGFiZWwubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgY2MucmVwZWF0KGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICBjYy5kZWxheVRpbWUoZGVsYXkpLFxyXG4gICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJHb2xkID0gTWF0aC5mbG9vcihjdXJHb2xkICsgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRlIG5ldyBnb2xkOlwiICsgY3VyR29sZCk7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBmdW5jRm9ybWF0KGN1ckdvbGQsdW5pdEZ1bmNGb3JtYXQsc3BlcmF0b3JGdW5jRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIGNiSW50ZXJ2YWwgJiYgY2JJbnRlcnZhbChsYWJlbCxjdXJHb2xkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApLG51bU9mVXBkYXRlKSxcclxuICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGZ1bmNGb3JtYXQodGFyR29sZCx1bml0RnVuY0Zvcm1hdCxzcGVyYXRvckZ1bmNGb3JtYXQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVwZGF0ZSB0YXIgZ29sZDpcIiArIHRhckdvbGQpO1xyXG4gICAgICAgICAgICBjYkRvbmUgJiYgY2JEb25lKGxhYmVsKTtcclxuICAgICAgICB9KVxyXG4gICAgKSk7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gVXRpbGl0eTsiXX0=