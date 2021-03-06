"use strict";
cc._RF.push(module, '232c0/7U/pGL5sEqox0aXqB', 'CAudio');
// scripts/CAudio.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var _require = require("GameFake"),
    SoundType = _require.SoundType;

cc.Class({
  "extends": cc.Component,
  properties: {
    audioWelcome: {
      "default": null,
      type: cc.AudioClip
    },
    audioDiscardStraight: {
      "default": null,
      type: cc.AudioClip
    },
    audioDiscardFlush: {
      "default": null,
      type: cc.AudioClip
    },
    audioDiscardCulu: {
      "default": null,
      type: cc.AudioClip
    },
    soundDiscard: {
      "default": null,
      type: cc.AudioClip
    },
    audioWin: {
      "default": null,
      type: cc.AudioClip
    },
    soundWin: {
      "default": null,
      type: cc.AudioClip
    },
    soundCountDow: {
      "default": null,
      type: cc.AudioClip
    },
    soundYourTurn: {
      "default": null,
      type: cc.AudioClip
    },
    soundFourOfKind: {
      "default": null,
      type: cc.AudioClip
    },
    soundPass: {
      "default": null,
      type: cc.AudioClip
    },
    audioDosout: {
      "default": null,
      type: cc.AudioClip
    },
    soundCountDown: {
      "default": null,
      type: cc.AudioClip
    },
    voice10: {
      "default": null,
      type: cc.AudioClip
    },
    voice11: {
      "default": null,
      type: cc.AudioClip
    },
    voice13: {
      "default": null,
      type: cc.AudioClip
    },
    voice14: {
      "default": null,
      type: cc.AudioClip
    }
  },
  ctor: function ctor() {
    this.audioPool = [];
    this._isPlayingCountDown = false;
    this._idPlayingCountDown = false;
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    cc.log("play");
    cc.audioEngine.getMaxAudioInstance();
    var id = cc.audioEngine.play(this.audioWelcome, false, 1);
    this.audioPool.push(id);
  },
  playCountDown: function playCountDown() {
    if (!this._isPlayingCountDown) {
      this._idPlayingCountDown = cc.audioEngine.play(this.soundCountDown, true, 1);
      this._isPlayingCountDown = true;
    }
  },
  stopCountDown: function stopCountDown() {
    if (this._isPlayingCountDown) {
      cc.audioEngine.stop(this._idPlayingCountDown);
    }

    this._isPlayingCountDown = false;
  },
  playAudio: function playAudio(soundType) {
    if (soundType instanceof Array) {
      for (var i = 0; i < soundType.length; i++) {
        this.playAudio(soundType[i]);
      }

      return;
    }

    switch (soundType) {
      case SoundType.NONE:
      case SoundType.PAIR:
        cc.audioEngine.play(this.soundDiscard, false, 1);
        break;

      case SoundType.DOS_OUT:
        cc.audioEngine.play(this.soundDiscard, false, 1);
        cc.audioEngine.play(this.audioDosout, false, 1);
        break;

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
        cc.audioEngine.play(this.soundWin, false, 1);
        cc.audioEngine.play(this.audioWin, false, 1);
        break;

      case SoundType.PASS:
        cc.audioEngine.play(this.soundPass, false, 1);
        break;

      case SoundType.VOICE_10:
        cc.audioEngine.play(this.voice10, false, 1);
        break;

      case SoundType.VOICE_11:
        cc.audioEngine.play(this.voice11, false, 1);
        break;

      case SoundType.VOICE_13:
        cc.audioEngine.play(this.voice13, false, 1);
        break;

      case SoundType.VOICE_14:
        cc.audioEngine.play(this.voice14, false, 1);
        break;
    }
  },
  playSoundYourTurn: function playSoundYourTurn() {
    cc.audioEngine.play(this.soundYourTurn, false, 1);
  } // update (dt) {},

});

cc._RF.pop();