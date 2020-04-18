// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        sprite: {
            default: null,
            type: cc.Sprite
        },
        bg:{
            default:null,
            type:cc.Sprite
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.sprite)
            this.sprite.node.active = false;
        if(this.bg){
            this.bg.node.active = false;
        }
    },

    onEnable:function(){
        if(this.sprite){
            var node = this.sprite.node;
            var pos = node.getPosition();
            node.active = true;
            node.stopAllActions();
            node.x = -700;
            node.opacity = 0;
            node.runAction(cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveTo(0.5,0,pos.y).easing(cc.easeBackOut()),
                    cc.fadeIn(0.3)
                ),
                cc.delayTime(1.5),
                cc.spawn(
                    cc.fadeOut(0.5),
                    cc.moveTo(0.5,700,pos.y).easing(cc.easeBackInOut())
                )
            ))
        }
        if(this.bg){
            this.bg.node.active = true;
            this.bg.node.opacity = 0;
            this.bg.node.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.fadeTo(0.5,180),
                cc.delayTime(1.5),
                cc.fadeOut(0.5)
            ))
        }
    },
    start () {

    },

    // update (dt) {},
});
