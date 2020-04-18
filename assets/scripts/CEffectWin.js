var Utility = require("Utility");
cc.Class({
    extends: cc.Component,

    properties: {
        spine:{
            default:null,
            type:cc.Node
        },
        lbLose1:{
            default:null,
            type:cc.Label
        },
        lbLose2:{
            default:null,
            type:cc.Label
        },
        imgLose1:{
            default:null,
            type:cc.Sprite
        },
        imgLose2:{
            default:null,
            type:cc.Sprite
        },
        lbWin:{
            default:null,
            type:cc.Label
        },
        lbPot:{
            default:null,
            type:cc.Label
        },
        player1:{
            default:null,
            type:cc.Node
        },
        player2:{
            default:null,
            type:cc.Node
        },
        emotions:{
            default:[],
            type:[cc.Node]
        }
    },

    ctor:function(){
        this.gameController = null;
    },

    // onLoad () {},
    // start () {},
    // update (dt) {},

    onEnable:function(){
        this._playEffectX8();
        this._playEffectLabelGold();
        this._playAllEmotions();
        this._delayShowCHPlay();
    },

    showNodeCHPlay:function(){
        this.gameController.showNodeCHPlay();
    },
    _playAllEmotions:function(){
        function playEmo(emo) {
            if(emo){
                var spine = emo.getComponent('sp.Skeleton'); spine.setCompleteListener(function(trackEntry){
                    emo.active = false;
                });
                setTimeout(function () {
                    emo.active = true;
                    spine.setAnimation(0, 'animation', false);
                },1000);
            }
        }
        var l = this.emotions.length;
        for (var i = 0; i < l; i++) {
            var emo = this.emotions[i];
            playEmo(emo);
        }
    },
    _playEffectX8: function () {
        var emo = this.spine;
        var spine = emo.getComponent('sp.Skeleton');
        spine.clearTracks();
        spine.setCompleteListener(function(trackEntry){
            // spine.clearTracks();
            // emo.active = false;
        });
        emo.active = true;
        spine.setAnimation(0, 'animation', false);
    },
    _playEffectLabelGold: function () {
        var lose1 = 47000000;
        var lose2 = 58000000;
        var pot = 40000000;
        var win = pot + lose1 + lose2;
        function hideLabelonDone(label){
            label.node.active = false;
        }
        Utility.runUpdateGold(this.lbLose1, 0, -lose1, undefined, undefined, hideLabelonDone, undefined, "", "","$");
        Utility.runUpdateGold(this.lbLose2, 0, -lose1, undefined, undefined, hideLabelonDone, undefined, "", "","$");
        Utility.runUpdateGold(this.lbWin, 0, win, undefined, undefined, undefined, undefined, "", "+","$");
        // Utility.runUpdateGold(this.lbLose2,0,-lose2);
        // Utility.runUpdateGold(this.lbWin,0,win);
        Utility.runUpdateGold(this.player1.getComponent("CPlayer").gold,lose1,0);
        Utility.runUpdateGold(this.player2.getComponent("CPlayer").gold,lose2,0);
    },
    _delayShowCHPlay: function () {
        this.node.runAction(cc.sequence(
            cc.delayTime(4),
            cc.callFunc(function () {
                this.imgLose1.node.active = false;
                this.imgLose2.node.active = false;
                this.lbWin.node.active = false;
                this.showNodeCHPlay();
            },this)
        ));
    }
});
