// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgSearch:{
            default:null,
            type:cc.Sprite
        },
        iconSearch:{
            default:null,
            type:cc.Sprite
        },
        lbSearch:{
            default:null,
            type:cc.Label
        },
        btnPlayNow:{
            default:null,
            type:cc.Button
        }
    },
    ctor:function(){
        this._posSearch = null;
        this._posButton = null;
    },
    onLoad:function(){
        this._posSearch = this.bgSearch.node.getPosition();
        // this._posButton = this.btnPlayNow.node.getPosition();
        this._posButton = new cc.Vec2(0,-325);
    },
    onEnable:function () {
        this.node.stopAllActions();
        // this.bgSearch.node.setPosition(this._posSearch.x,-680);
        // this.btnPlayNow.node.setPosition(this._posButton.x,-480);
        this.bgSearch.node.opacity = 0;
        this.bgSearch.node.scale = 2;
        this.iconSearch.node.scale = 0;
        var str = "Pusoy Dos Zingplay";
        var len = str.length;
        var s = '';
        var index = 0;
        this.lbSearch.string = s;
        this.bgSearch.node.runAction(cc.sequence(
            cc.delayTime(1.5),
            cc.spawn(
                cc.scaleTo(0.5,1,1),
                cc.fadeIn(0.2)
            )
        ));
        this.iconSearch.node.runAction(cc.sequence(
            cc.hide(),
            cc.delayTime(2.2),
            cc.show(),
            cc.scaleTo(0.3,1,1))
        );
        this.lbSearch.node.runAction(cc.sequence(
            cc.delayTime(3.5),
            cc.repeat(cc.sequence(
                cc.callFunc(function (sender) {
                    s = s + str[index ++];
                    sender.getComponent(cc.Label).string = s;
                }),
                cc.delayTime(0.1)
            ),len)
        ));
        this.btnPlayNow.node.runAction(
            cc.sequence(
                cc.delayTime(0.5),
                cc.spawn(
                    cc.moveTo(0.5,this._posButton.x, this._posButton.y),
                    cc.scaleTo(0.5,0.7,0.7)
                )
            ));
        this.btnPlayNow.node.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(2),
            cc.rotateTo(0.2,-2),
            cc.rotateTo(0.2,4),
            cc.rotateTo(0.2,-3),
            cc.rotateTo(0.2,0),
            cc.delayTime(1),
            cc.jumpTo(1,this._posButton,10,3)
        )));
    }
    // update (dt) {},
});
