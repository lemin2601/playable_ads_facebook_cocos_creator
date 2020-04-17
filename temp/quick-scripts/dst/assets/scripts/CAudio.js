
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    }
  },
  ctor: function ctor() {
    this.audioPool = [];
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    cc.log("play");
    cc.audioEngine.getMaxAudioInstance();
    var id = cc.audioEngine.play(this.audioWelcome, false, 1);
    this.audioPool.push(id);
  },
  playAudio: function playAudio(soundType) {
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
        cc.audioEngine.play(this.soundWin, false, 1);
        cc.audioEngine.play(this.audioWin, false, 1);
        break;

      case SoundType.PASS:
        cc.audioEngine.play(this.soundPass, false, 1);
        break;
    }
  },
  playSoundYourTurn: function playSoundYourTurn() {
    cc.audioEngine.play(this.soundYourTurn, false, 1);
  } // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTb3VuZFR5cGUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImF1ZGlvV2VsY29tZSIsInR5cGUiLCJBdWRpb0NsaXAiLCJhdWRpb0Rpc2NhcmRTdHJhaWdodCIsImF1ZGlvRGlzY2FyZEZsdXNoIiwiYXVkaW9EaXNjYXJkQ3VsdSIsInNvdW5kRGlzY2FyZCIsImF1ZGlvV2luIiwic291bmRXaW4iLCJzb3VuZENvdW50RG93Iiwic291bmRZb3VyVHVybiIsInNvdW5kRm91ck9mS2luZCIsInNvdW5kUGFzcyIsImN0b3IiLCJhdWRpb1Bvb2wiLCJvbkxvYWQiLCJzdGFydCIsImxvZyIsImF1ZGlvRW5naW5lIiwiZ2V0TWF4QXVkaW9JbnN0YW5jZSIsImlkIiwicGxheSIsInB1c2giLCJwbGF5QXVkaW8iLCJzb3VuZFR5cGUiLCJGT1VSX09GX0tJTkQiLCJGVUxMX0hPVVNFIiwiRkxVU0giLCJTVFJBSUdIVCIsIldFTENPTUUiLCJXSU4iLCJQQVNTIiwicGxheVNvdW5kWW91clR1cm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ2tCQSxPQUFPLENBQUMsVUFBRDtJQUFwQkMscUJBQUFBOztBQUNMQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFDO0FBQ1QsaUJBQVEsSUFEQztBQUVUQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGQyxLQURMO0FBS1JDLElBQUFBLG9CQUFvQixFQUFDO0FBQ2pCLGlCQUFRLElBRFM7QUFFakJGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZTLEtBTGI7QUFTUkUsSUFBQUEsaUJBQWlCLEVBQUM7QUFDZCxp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IC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIHtTb3VuZFR5cGV9ID0gcmVxdWlyZShcIkdhbWVGYWtlXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvV2VsY29tZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvRGlzY2FyZFN0cmFpZ2h0OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9EaXNjYXJkRmx1c2g6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpb0Rpc2NhcmRDdWx1OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmREaXNjYXJkOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9XaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZFdpbjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kQ291bnREb3c6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZFlvdXJUdXJuOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRGb3VyT2ZLaW5kOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRQYXNzOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5hdWRpb1Bvb2wgPSBbXTtcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfSxcclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBjYy5sb2coXCJwbGF5XCIpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLmdldE1heEF1ZGlvSW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgaWQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9XZWxjb21lLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgdGhpcy5hdWRpb1Bvb2wucHVzaChpZCk7XHJcbiAgICB9LFxyXG4gICAgcGxheUF1ZGlvOmZ1bmN0aW9uIChzb3VuZFR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHNvdW5kVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5GT1VSX09GX0tJTkQ6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRGb3VyT2ZLaW5kLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuRlVMTF9IT1VTRTpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb0Rpc2NhcmRDdWx1LCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuRkxVU0g6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkRmx1c2gsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5TVFJBSUdIVDpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb0Rpc2NhcmRTdHJhaWdodCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLldFTENPTUU6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9XZWxjb21lLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuV0lOOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kV2luLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9XaW4sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5QQVNTOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kUGFzcywgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXlTb3VuZFlvdXJUdXJuOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRZb3VyVHVybiwgZmFsc2UsIDEpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=