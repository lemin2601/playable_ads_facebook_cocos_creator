// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var {SoundType} = require("GameFake");
cc.Class({
    extends: cc.Component,

    properties: {
        audioWelcome:{
            default:null,
            type:cc.AudioClip
        },
        audioDiscardStraight:{
            default:null,
            type:cc.AudioClip
        },
        audioDiscardFlush:{
            default:null,
            type:cc.AudioClip
        },
        audioDiscardCulu:{
            default:null,
            type:cc.AudioClip
        },
        soundDiscard:{
            default:null,
            type:cc.AudioClip
        },
        audioWin:{
            default:null,
            type:cc.AudioClip
        },
        soundCountDow:{
            default:null,
            type:cc.AudioClip
        },
        soundYourTurn:{
            default:null,
            type:cc.AudioClip
        },
        soundFourOfKind:{
            default:null,
            type:cc.AudioClip
        },
        soundPass:{
            default:null,
            type:cc.AudioClip
        }
    },
    ctor:function(){
        this.audioPool = [];
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    start () {
        cc.log("play");
        cc.audioEngine.getMaxAudioInstance();
        var id = cc.audioEngine.play(this.audioWelcome, false, 1);
        this.audioPool.push(id);
    },
    playAudio:function (soundType) {
        switch (soundType) {
            case SoundType.FOUR_OF_KIND:
                cc.audioEngine.play(this.soundFourOfKind, false, 1);
                cc.audioEngine.play(this.soundDiscard, false, 1);
                break;
            case SoundType.FULL_HOUSE:
                cc.audioEngine.play(this.soundDiscard, false, 1);
                cc.audioEngine.play(this.audioDiscardCulu, false, 1);
                break;
            case SoundType.FLUSH:
                cc.audioEngine.play(this.soundDiscard, false, 1);
                cc.audioEngine.play(this.audioDiscardFlush, false, 1);
                break;
            case SoundType.STRAIGHT:
                cc.audioEngine.play(this.soundDiscard, false, 1);
                cc.audioEngine.play(this.audioDiscardStraight, false, 1);
                break;
            case SoundType.WELCOME:
                cc.audioEngine.play(this.soundDiscard, false, 1);
                cc.audioEngine.play(this.audioWelcome, false, 1);
                break;
            case SoundType.WIN:
                cc.audioEngine.play(this.soundDiscard, false, 1);
                cc.audioEngine.play(this.audioWin, false, 1);
                break;
            case SoundType.PASS:
                cc.audioEngine.play(this.soundPass, false, 1);
                break;
        }
    },
    playSoundYourTurn:function () {
        cc.audioEngine.play(this.soundYourTurn, false, 1);
    }
    // update (dt) {},
});
