"use strict";
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