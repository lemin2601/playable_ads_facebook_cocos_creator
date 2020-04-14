// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var CCoinEffect = require('CCoinEffect');
cc.Class({
    extends: cc.Component,

    properties: {
        coinPrefab:{
            default:null,
            type:cc.Prefab
        }
    },
    ctor:function(){
        this.listCoin = [];
        this.numOfCoin = 150;

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (var i = 0; i < this.numOfCoin; i++) {
            var coinPrefab = cc.instantiate (this.coinPrefab);
            var coinEffect = coinPrefab.getComponent("CCoinEffect");
            coinEffect.active = false;
            this.node.addChild(coinPrefab);
            this.listCoin.push(coinEffect);
        }
    },

    start () {
    },
    onEnable:function(){
        setTimeout(function () {
            var len = this.listCoin.length;
            for (var i = 0; i < len; i++) {
                var coinEffect = this.listCoin[i];
                coinEffect.node.active = true;
                coinEffect.running = true;
            }
        }.bind(this),100);
    },

    update (dt) {},
});
