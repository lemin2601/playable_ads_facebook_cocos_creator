// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        imgHand:{
            default:null,
            type:cc.Sprite
        },
        imgArrows:{
            default:[],
            type:[cc.Sprite]
        }
    },

    ctor:function(){
        this._posHand = null;
    },
    onLoad () {
        this._posHand = this.imgHand.node.getPosition();
        // this.imgHand.active = false;
        // var len = this.imgArrows.length;
        // for (var i = 0; i < len; i++) {
        //     this.imgArrows[i].active = false;
        // }
    },

    start () {

    },

    update (dt) {},

    onEnable:function () {
        var times = 3;
        var offset = 200;
        var duration = 0.7;
        var period = 0.3;
        var delay = 3;
        this.imgHand.node.stopAllActions();
        this.imgHand.node.setPosition(this._posHand);
        this.imgHand.node.runAction(cc.repeatForever(
            cc.sequence(
                cc.repeat(
                    cc.sequence(
                        cc.moveTo(0,this._posHand.x,this._posHand.y),
                        cc.show(),
                        cc.moveTo(duration,this._posHand.x,this._posHand.y + offset),
                        cc.delayTime(period),
                        cc.hide()
                    )
                ,times),
                cc.hide(),
                cc.delayTime(delay)
            )
        ));
        var len = this.imgArrows.length;
        for (var i = 0; i < len; i++) {
            var row = this.imgArrows[i];
            row.node.stopAllActions();
            row.node.runAction(cc.repeatForever(
                cc.sequence(
                    cc.repeat(
                        cc.sequence(
                            cc.hide(),
                            cc.delayTime(0.125 * i),
                            cc.show(),
                            cc.delayTime(0.125 * (len + 1 - i)),
                            cc.hide()
                        ),times * 2),
                    cc.hide(),
                    cc.delayTime(delay)
                )
            ));
        }
        // this.imgHand.active = true;
        // var len = this.imgArrows.length;
        // for (var i = 0; i < len; i++) {
        //     this.imgArrows[i].active = true;
        // }
    },
    onDisable:function () {
        // this.imgHand.active = false;
        // var len = this.imgArrows.length;
        // for (var i = 0; i < len; i++) {
        //     this.imgArrows[i].active = false;
        // }
    }
});
