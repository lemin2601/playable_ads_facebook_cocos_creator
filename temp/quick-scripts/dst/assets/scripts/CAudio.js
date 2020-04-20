
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
      case SoundType.NONE:
        break;

      case SoundType.PAIR:
        cc.audioEngine.play(this.soundDiscard, false, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTb3VuZFR5cGUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImF1ZGlvV2VsY29tZSIsInR5cGUiLCJBdWRpb0NsaXAiLCJhdWRpb0Rpc2NhcmRTdHJhaWdodCIsImF1ZGlvRGlzY2FyZEZsdXNoIiwiYXVkaW9EaXNjYXJkQ3VsdSIsInNvdW5kRGlzY2FyZCIsImF1ZGlvV2luIiwic291bmRXaW4iLCJzb3VuZENvdW50RG93Iiwic291bmRZb3VyVHVybiIsInNvdW5kRm91ck9mS2luZCIsInNvdW5kUGFzcyIsImN0b3IiLCJhdWRpb1Bvb2wiLCJvbkxvYWQiLCJzdGFydCIsImxvZyIsImF1ZGlvRW5naW5lIiwiZ2V0TWF4QXVkaW9JbnN0YW5jZSIsImlkIiwicGxheSIsInB1c2giLCJwbGF5QXVkaW8iLCJzb3VuZFR5cGUiLCJOT05FIiwiUEFJUiIsIkZPVVJfT0ZfS0lORCIsIkZVTExfSE9VU0UiLCJGTFVTSCIsIlNUUkFJR0hUIiwiV0VMQ09NRSIsIldJTiIsIlBBU1MiLCJwbGF5U291bmRZb3VyVHVybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFDa0JBLE9BQU8sQ0FBQyxVQUFEO0lBQXBCQyxxQkFBQUE7O0FBQ0xDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUSxJQURDO0FBRVRDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZDLEtBREw7QUFLUkMsSUFBQUEsb0JBQW9CLEVBQUM7QUFDakIsaUJBQVEsSUFEUztBQUVqQkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRlMsS0FMYjtBQVNSRSxJQUFBQSxpQkFB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QUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS1gsYUFBekIsRUFBd0MsS0FBeEMsRUFBK0MsQ0FBL0M7QUFDSCxHQXBHSSxDQXFHTDs7QUFyR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbnZhciB7U291bmRUeXBlfSA9IHJlcXVpcmUoXCJHYW1lRmFrZVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBhdWRpb1dlbGNvbWU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpb0Rpc2NhcmRTdHJhaWdodDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvRGlzY2FyZEZsdXNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9EaXNjYXJkQ3VsdTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kRGlzY2FyZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvV2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRXaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZENvdW50RG93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRZb3VyVHVybjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kRm91ck9mS2luZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kUGFzczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sID0gW107XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgIH0sXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgY2MubG9nKFwicGxheVwiKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5nZXRNYXhBdWRpb0luc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIGlkID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sLnB1c2goaWQpO1xyXG4gICAgfSxcclxuICAgIHBsYXlBdWRpbzpmdW5jdGlvbiAoc291bmRUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzb3VuZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuTk9ORTpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5QQUlSOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZPVVJfT0ZfS0lORDpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZEZvdXJPZktpbmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5GVUxMX0hPVVNFOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvRGlzY2FyZEN1bHUsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5GTFVTSDpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb0Rpc2NhcmRGbHVzaCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLlNUUkFJR0hUOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvRGlzY2FyZFN0cmFpZ2h0LCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuV0VMQ09NRTpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb1dlbGNvbWUsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5XSU46XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRXaW4sIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb1dpbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLlBBU1M6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRQYXNzLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheVNvdW5kWW91clR1cm46ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZFlvdXJUdXJuLCBmYWxzZSwgMSk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==