var Utility = {};
Utility.units = [
    {prefix: 'G', l: 12, div: 1000000000000},
    {prefix: 'B', l: 9, div: 1000000000},
    {prefix: 'M', l: 6, div: 1000000},
    {prefix: 'K', l: 4, div: 1000},
    {prefix: '', l: 3, div: 1}
];
/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */
Utility.formatMoney = function(money, unit, separator){
    if(unit === undefined) unit = "";

    return unit + Utility.formatAlignNumber(money, separator);
};

/**
 *
 * @param money
 * @param unit
 * @param separator
 * @returns {*}
 */
Utility.formatMoneyFull = function(money, unit, separator){
    if(unit === undefined) unit = "";

    return unit + Utility.formatAlignNumber(money, separator, true);
};

/**
 *
 * @param number
 * @param separator
 * @param isFull
 * @returns {*}
 */
Utility.formatAlignNumber = function(number, separator, isFull){
    if(number === undefined) return "0";

    number -= -0.1; //magic
    if(separator === undefined){
        separator = ",";
    }

    if(isFull === undefined){
        isFull = false;
    }

    var isNegative = number < 0;
    number = Math.abs(Math.round(number));
    var numString = number.toString();

    if(isFull){
        var curIndex = numString.length - 3;

        while(curIndex > 0){
            numString = numString.slice(0, curIndex) + separator + numString.slice(curIndex);
            // numString = numString.insertAt(curIndex, separator);
            curIndex -= 3;
        }
    }
    else{
        var units = Utility.units;
        for(var i = 0, length = units.length; i < length; ++i){
            if(numString.length > units[i].l){
                var tmpNumArr = (number / units[i].div).toString().split('.');
                var fixedLength = tmpNumArr[0].length > 2 ? 1 : 2;

                // insert separator
                if(tmpNumArr[0].length > 3){
                    curIndex = tmpNumArr[0].length - 3;

                    while(curIndex > 0){
                        tmpNumArr[0] = tmpNumArr[0].insertAt(curIndex, separator);
                        curIndex -= 3;
                    }
                }

                numString = tmpNumArr[0];
                // append fixed
                if(tmpNumArr.length > 1){
                    numString += '.' + tmpNumArr[1].substr(0, fixedLength);
                }
                numString += units[i].prefix;
                break;
            }
        }
    }

    if(isNegative){
        numString = "-" + numString;
    }

    //ZLog.debug("num String = %s", numString);
    return numString;
};

Utility.runUpdateGold = function(label,curGold,tarGold,funcFormat,cbInterval,cbDone,speratorFuncFormat,unitFuncFormat){
    if(funcFormat === undefined) funcFormat = this.formatMoneyFull;
    if(curGold === undefined) curGold = 0;
    if(tarGold === undefined) tarGold = 0;

    label.string = funcFormat(10000);
    var numOfUpdate = 30;
    var delay = 0.05;
    var offset = (tarGold - curGold)/numOfUpdate;
    label.node.runAction(cc.sequence(
        cc.repeat(cc.sequence(
            cc.delayTime(delay),
            cc.callFunc(function (sender) {
                curGold = Math.floor(curGold + offset);
                console.log("update new gold:" + curGold);
                label.string = funcFormat(curGold,unitFuncFormat,speratorFuncFormat);
                cbInterval && cbInterval(label,curGold);
            })
        ),numOfUpdate),
        cc.callFunc(function (sender) {
            label.string = funcFormat(tarGold,unitFuncFormat,speratorFuncFormat);
            console.log("update tar gold:" + tarGold);
            cbDone && cbDone(label);
        })
    ));
};
module.exports = Utility;