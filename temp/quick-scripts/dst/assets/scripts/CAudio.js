
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
    soundCountDow: {
      "default": null,
      type: cc.AudioClip
    } // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },

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
      case SoundType.FULL_HOUSE:
        cc.audioEngine.play(this.audioDiscardCulu, false, 1);
        break;

      case SoundType.FLUSH:
        cc.audioEngine.play(this.audioDiscardFlush, false, 1);
        break;

      case SoundType.STRAIGHT:
        cc.audioEngine.play(this.audioDiscardStraight, false, 1);
        break;

      case SoundType.WELCOME:
        cc.audioEngine.play(this.audioWelcome, false, 1);
        break;

      case SoundType.WIN:
        cc.audioEngine.play(this.audioWin, false, 1);
        break;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTb3VuZFR5cGUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImF1ZGlvV2VsY29tZSIsInR5cGUiLCJBdWRpb0NsaXAiLCJhdWRpb0Rpc2NhcmRTdHJhaWdodCIsImF1ZGlvRGlzY2FyZEZsdXNoIiwiYXVkaW9EaXNjYXJkQ3VsdSIsInNvdW5kRGlzY2FyZCIsImF1ZGlvV2luIiwic291bmRDb3VudERvdyIsImN0b3IiLCJhdWRpb1Bvb2wiLCJvbkxvYWQiLCJzdGFydCIsImxvZyIsImF1ZGlvRW5naW5lIiwiZ2V0TWF4QXVkaW9JbnN0YW5jZSIsImlkIiwicGxheSIsInB1c2giLCJwbGF5QXVkaW8iLCJzb3VuZFR5cGUiLCJGVUxMX0hPVVNFIiwiRkxVU0giLCJTVFJBSUdIVCIsIldFTENPTUUiLCJXSU4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ2tCQSxPQUFPLENBQUMsVUFBRDtJQUFwQkMscUJBQUFBOztBQUNMQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFDO0FBQ1QsaUJBQVEsSUFEQztBQUVUQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGQyxLQURMO0FBS1JDLElBQUFBLG9CQUFvQixFQUFDO0FBQ2pCLGlCQUFRLElBRFM7QUFFakJGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZTLEtBTGI7QUFTUkUsSUFBQUEsaUJBQWlCLEVBQUM7QUFDZCxpQkFBUSxJQURNO0FBRWRILE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZNLEtBVFY7QUFhUkcsSUFBQUEsZ0JBQWdCLEVBQUM7QUFDYixpQkFBUSxJQURLO0FBRWJKLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZLLEtBYlQ7QUFpQlJJLElBQUFBLFlBQVksRUFBQztBQUNULGlCQUFRLElBREM7QUFFVEwsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkMsS0FqQkw7QUFxQlJLLElBQUFBLFFBQVEsRUFBQztBQUNMLGlCQUFRLElBREg7QUFFTE4sTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkgsS0FyQkQ7QUF5QlJNLElBQUFBLGFBQWEsRUFBQztBQUNWLGlCQUFRLElBREU7QUFFVlAsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkUsS0F6Qk4sQ0E2QlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTNDUSxHQUhQO0FBZ0RMTyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0gsR0FsREk7QUFtREw7QUFFQUMsRUFBQUEsTUFyREssb0JBcURLLENBQUUsQ0FyRFA7QUF1RExDLEVBQUFBLEtBdkRLLG1CQXVESTtBQUNMaEIsSUFBQUEsRUFBRSxDQUFDaUIsR0FBSCxDQUFPLE1BQVA7QUFDQWpCLElBQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUMsbUJBQWY7QUFDQSxRQUFJQyxFQUFFLEdBQUdwQixFQUFFLENBQUNrQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2pCLFlBQXpCLEVBQXVDLEtBQXZDLEVBQThDLENBQTlDLENBQVQ7QUFDQSxTQUFLVSxTQUFMLENBQWVRLElBQWYsQ0FBb0JGLEVBQXBCO0FBQ0gsR0E1REk7QUE2RExHLEVBQUFBLFNBQVMsRUFBQyxtQkFBVUMsU0FBVixFQUFxQjtBQUMzQixZQUFRQSxTQUFSO0FBQ0ksV0FBS3pCLFNBQVMsQ0FBQzBCLFVBQWY7QUFDSXpCLFFBQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLWixnQkFBekIsRUFBMkMsS0FBM0MsRUFBa0QsQ0FBbEQ7QUFDQTs7QUFDSixXQUFLVixTQUFTLENBQUMyQixLQUFmO0FBQ0kxQixRQUFBQSxFQUFFLENBQUNrQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2IsaUJBQXpCLEVBQTRDLEtBQTVDLEVBQW1ELENBQW5EO0FBQ0E7O0FBQ0osV0FBS1QsU0FBUyxDQUFDNEIsUUFBZjtBQUNJM0IsUUFBQUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtkLG9CQUF6QixFQUErQyxLQUEvQyxFQUFzRCxDQUF0RDtBQUNBOztBQUNKLFdBQUtSLFNBQVMsQ0FBQzZCLE9BQWY7QUFDSTVCLFFBQUFBLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLakIsWUFBekIsRUFBdUMsS0FBdkMsRUFBOEMsQ0FBOUM7QUFDQTs7QUFDSixXQUFLTCxTQUFTLENBQUM4QixHQUFmO0FBQ0k3QixRQUFBQSxFQUFFLENBQUNrQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS1YsUUFBekIsRUFBbUMsS0FBbkMsRUFBMEMsQ0FBMUM7QUFDQTtBQWZSO0FBa0JILEdBaEZJLENBaUZMOztBQWpGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIHtTb3VuZFR5cGV9ID0gcmVxdWlyZShcIkdhbWVGYWtlXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvV2VsY29tZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvRGlzY2FyZFN0cmFpZ2h0OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9EaXNjYXJkRmx1c2g6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpb0Rpc2NhcmRDdWx1OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmREaXNjYXJkOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9XaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZENvdW50RG93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgIH0sXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5hdWRpb1Bvb2wgPSBbXTtcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGNjLmxvZyhcInBsYXlcIik7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuZ2V0TWF4QXVkaW9JbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb1dlbGNvbWUsIGZhbHNlLCAxKTtcclxuICAgICAgICB0aGlzLmF1ZGlvUG9vbC5wdXNoKGlkKTtcclxuICAgIH0sXHJcbiAgICBwbGF5QXVkaW86ZnVuY3Rpb24gKHNvdW5kVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoc291bmRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZVTExfSE9VU0U6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkQ3VsdSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZMVVNIOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvRGlzY2FyZEZsdXNoLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkU3RyYWlnaHQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5XRUxDT01FOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLldJTjpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb1dpbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19