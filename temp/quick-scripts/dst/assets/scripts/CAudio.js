
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
        cc.audioEngine.play(this.soundDiscard, false, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTb3VuZFR5cGUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImF1ZGlvV2VsY29tZSIsInR5cGUiLCJBdWRpb0NsaXAiLCJhdWRpb0Rpc2NhcmRTdHJhaWdodCIsImF1ZGlvRGlzY2FyZEZsdXNoIiwiYXVkaW9EaXNjYXJkQ3VsdSIsInNvdW5kRGlzY2FyZCIsImF1ZGlvV2luIiwic291bmRDb3VudERvdyIsInNvdW5kWW91clR1cm4iLCJzb3VuZEZvdXJPZktpbmQiLCJzb3VuZFBhc3MiLCJjdG9yIiwiYXVkaW9Qb29sIiwib25Mb2FkIiwic3RhcnQiLCJsb2ciLCJhdWRpb0VuZ2luZSIsImdldE1heEF1ZGlvSW5zdGFuY2UiLCJpZCIsInBsYXkiLCJwdXNoIiwicGxheUF1ZGlvIiwic291bmRUeXBlIiwiRk9VUl9PRl9LSU5EIiwiRlVMTF9IT1VTRSIsIkZMVVNIIiwiU1RSQUlHSFQiLCJXRUxDT01FIiwiV0lOIiwiUEFTUyIsInBsYXlTb3VuZFlvdXJUdXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtlQUNrQkEsT0FBTyxDQUFDLFVBQUQ7SUFBcEJDLHFCQUFBQTs7QUFDTEMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBQztBQUNULGlCQUFRLElBREM7QUFFVEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkMsS0FETDtBQUtSQyxJQUFBQSxvQkFBb0IsRUFBQztBQUNqQixpQkFBUSxJQURTO0FBRWpCRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGUyxLQUxiO0FBU1JFLElBQUFBLGlCQUFpQixFQUFDO0FBQ2QsaUJBQVEsSUFETTtBQUVkSCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGTSxLQVRWO0FBYVJHLElBQUFBLGdCQUFnQixFQUFDO0FBQ2IsaUJBQVEsSUFESztBQUViSixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSyxLQWJUO0FBaUJSSSxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUSxJQURDO0FBRVRMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZDLEtBakJMO0FBcUJSSyxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxOLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZILEtBckJEO0FBeUJSTSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUSxJQURFO0FBRVZQLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZFLEtBekJOO0FBNkJSTyxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUSxJQURFO0FBRVZSLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZFLEtBN0JOO0FBaUNSUSxJQUFBQSxlQUFlLEVBQUM7QUFDWixpQkFBUSxJQURJO0FBRVpULE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZJLEtBakNSO0FBcUNSUyxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUSxJQURGO0FBRU5WLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZGO0FBckNGLEdBSFA7QUE2Q0xVLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDSCxHQS9DSTtBQWdETDtBQUVBQyxFQUFBQSxNQWxESyxvQkFrREssQ0FDVCxDQW5ESTtBQW9ETEMsRUFBQUEsS0FwREssbUJBb0RJO0FBQ0xuQixJQUFBQSxFQUFFLENBQUNvQixHQUFILENBQU8sTUFBUDtBQUNBcEIsSUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlQyxtQkFBZjtBQUNBLFFBQUlDLEVBQUUsR0FBR3ZCLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLcEIsWUFBekIsRUFBdUMsS0FBdkMsRUFBOEMsQ0FBOUMsQ0FBVDtBQUNBLFNBQUthLFNBQUwsQ0FBZVEsSUFBZixDQUFvQkYsRUFBcEI7QUFDSCxHQXpESTtBQTBETEcsRUFBQUEsU0FBUyxFQUFDLG1CQUFVQyxTQUFWLEVBQXFCO0FBQzNCLFlBQVFBLFNBQVI7QUFDSSxXQUFLNUIsU0FBUyxDQUFDNkIsWUFBZjtBQUNJNUIsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtWLGVBQXpCLEVBQTBDLEtBQTFDLEVBQWlELENBQWpEO0FBQ0FkLFFBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZCxZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBOztBQUNKLFdBQUtYLFNBQVMsQ0FBQzhCLFVBQWY7QUFDSTdCLFFBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZCxZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBVixRQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2YsZ0JBQXpCLEVBQTJDLEtBQTNDLEVBQWtELENBQWxEO0FBQ0E7O0FBQ0osV0FBS1YsU0FBUyxDQUFDK0IsS0FBZjtBQUNJOUIsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtkLFlBQXpCLEVBQXVDLEtBQXZDLEVBQThDLENBQTlDO0FBQ0FWLFFBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLaEIsaUJBQXpCLEVBQTRDLEtBQTVDLEVBQW1ELENBQW5EO0FBQ0E7O0FBQ0osV0FBS1QsU0FBUyxDQUFDZ0MsUUFBZjtBQUNJL0IsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtkLFlBQXpCLEVBQXVDLEtBQXZDLEVBQThDLENBQTlDO0FBQ0FWLFFBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLakIsb0JBQXpCLEVBQStDLEtBQS9DLEVBQXNELENBQXREO0FBQ0E7O0FBQ0osV0FBS1IsU0FBUyxDQUFDaUMsT0FBZjtBQUNJaEMsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtkLFlBQXpCLEVBQXVDLEtBQXZDLEVBQThDLENBQTlDO0FBQ0FWLFFBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLcEIsWUFBekIsRUFBdUMsS0FBdkMsRUFBOEMsQ0FBOUM7QUFDQTs7QUFDSixXQUFLTCxTQUFTLENBQUNrQyxHQUFmO0FBQ0lqQyxRQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2QsWUFBekIsRUFBdUMsS0FBdkMsRUFBOEMsQ0FBOUM7QUFDQVYsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtiLFFBQXpCLEVBQW1DLEtBQW5DLEVBQTBDLENBQTFDO0FBQ0E7O0FBQ0osV0FBS1osU0FBUyxDQUFDbUMsSUFBZjtBQUNJbEMsUUFBQUEsRUFBRSxDQUFDcUIsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtULFNBQXpCLEVBQW9DLEtBQXBDLEVBQTJDLENBQTNDO0FBQ0E7QUEzQlI7QUE2QkgsR0F4Rkk7QUF5RkxvQixFQUFBQSxpQkFBaUIsRUFBQyw2QkFBWTtBQUMxQm5DLElBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLWCxhQUF6QixFQUF3QyxLQUF4QyxFQUErQyxDQUEvQztBQUNILEdBM0ZJLENBNEZMOztBQTVGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIHtTb3VuZFR5cGV9ID0gcmVxdWlyZShcIkdhbWVGYWtlXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGF1ZGlvV2VsY29tZTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvRGlzY2FyZFN0cmFpZ2h0OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9EaXNjYXJkRmx1c2g6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpb0Rpc2NhcmRDdWx1OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmREaXNjYXJkOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9XaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZENvdW50RG93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRZb3VyVHVybjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kRm91ck9mS2luZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kUGFzczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sID0gW107XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgIH0sXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgY2MubG9nKFwicGxheVwiKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5nZXRNYXhBdWRpb0luc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIGlkID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sLnB1c2goaWQpO1xyXG4gICAgfSxcclxuICAgIHBsYXlBdWRpbzpmdW5jdGlvbiAoc291bmRUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzb3VuZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuRk9VUl9PRl9LSU5EOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRm91ck9mS2luZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZVTExfSE9VU0U6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkQ3VsdSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZMVVNIOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvRGlzY2FyZEZsdXNoLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkU3RyYWlnaHQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5XRUxDT01FOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLldJTjpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZERpc2NhcmQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5hdWRpb1dpbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLlBBU1M6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmRQYXNzLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheVNvdW5kWW91clR1cm46ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZFlvdXJUdXJuLCBmYWxzZSwgMSk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==