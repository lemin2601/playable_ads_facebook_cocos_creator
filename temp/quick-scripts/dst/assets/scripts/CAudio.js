
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NBdWRpby5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiU291bmRUeXBlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJhdWRpb1dlbGNvbWUiLCJ0eXBlIiwiQXVkaW9DbGlwIiwiYXVkaW9EaXNjYXJkU3RyYWlnaHQiLCJhdWRpb0Rpc2NhcmRGbHVzaCIsImF1ZGlvRGlzY2FyZEN1bHUiLCJzb3VuZERpc2NhcmQiLCJhdWRpb1dpbiIsInNvdW5kV2luIiwic291bmRDb3VudERvdyIsInNvdW5kWW91clR1cm4iLCJzb3VuZEZvdXJPZktpbmQiLCJzb3VuZFBhc3MiLCJjdG9yIiwiYXVkaW9Qb29sIiwib25Mb2FkIiwic3RhcnQiLCJsb2ciLCJhdWRpb0VuZ2luZSIsImdldE1heEF1ZGlvSW5zdGFuY2UiLCJpZCIsInBsYXkiLCJwdXNoIiwicGxheUF1ZGlvIiwic291bmRUeXBlIiwiRk9VUl9PRl9LSU5EIiwiRlVMTF9IT1VTRSIsIkZMVVNIIiwiU1RSQUlHSFQiLCJXRUxDT01FIiwiV0lOIiwiUEFTUyIsInBsYXlTb3VuZFlvdXJUdXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtlQUNrQkEsT0FBTyxDQUFDLFVBQUQ7SUFBcEJDLHFCQUFBQTs7QUFDTEMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBQztBQUNULGlCQUFRLElBREM7QUFFVEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkMsS0FETDtBQUtSQyxJQUFBQSxvQkFBb0IsRUFBQztBQUNqQixpQkFBUSxJQURTO0FBRWpCRixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGUyxLQUxiO0FBU1JFLElBQUFBLGlCQUFpQixFQUFDO0FBQ2QsaUJBQVEsSUFETTtBQUVkSCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGTSxLQVRWO0FBYVJHLElBQUFBLGdCQUFnQixFQUFDO0FBQ2IsaUJBQVEsSUFESztBQUViSixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGSyxLQWJUO0FBaUJSSSxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUSxJQURDO0FBRVRMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZDLEtBakJMO0FBcUJSSyxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxOLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZILEtBckJEO0FBeUJSTSxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUSxJQURIO0FBRUxQLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZILEtBekJEO0FBNkJSTyxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUSxJQURFO0FBRVZSLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZFLEtBN0JOO0FBaUNSUSxJQUFBQSxhQUFhLEVBQUM7QUFDVixpQkFBUSxJQURFO0FBRVZULE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZFLEtBakNOO0FBcUNSUyxJQUFBQSxlQUFlLEVBQUM7QUFDWixpQkFBUSxJQURJO0FBRVpWLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZJLEtBckNSO0FBeUNSVSxJQUFBQSxTQUFTLEVBQUM7QUFDTixpQkFBUSxJQURGO0FBRU5YLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTTtBQUZGO0FBekNGLEdBSFA7QUFpRExXLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDSCxHQW5ESTtBQW9ETDtBQUVBQyxFQUFBQSxNQXRESyxvQkFzREssQ0FDVCxDQXZESTtBQXdETEMsRUFBQUEsS0F4REssbUJBd0RJO0FBQ0xwQixJQUFBQSxFQUFFLENBQUNxQixHQUFILENBQU8sTUFBUDtBQUNBckIsSUFBQUEsRUFBRSxDQUFDc0IsV0FBSCxDQUFlQyxtQkFBZjtBQUNBLFFBQUlDLEVBQUUsR0FBR3hCLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLckIsWUFBekIsRUFBdUMsS0FBdkMsRUFBOEMsQ0FBOUMsQ0FBVDtBQUNBLFNBQUtjLFNBQUwsQ0FBZVEsSUFBZixDQUFvQkYsRUFBcEI7QUFDSCxHQTdESTtBQThETEcsRUFBQUEsU0FBUyxFQUFDLG1CQUFVQyxTQUFWLEVBQXFCO0FBQzNCLFlBQVFBLFNBQVI7QUFDSSxXQUFLN0IsU0FBUyxDQUFDOEIsWUFBZjtBQUNJN0IsUUFBQUEsRUFBRSxDQUFDc0IsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtWLGVBQXpCLEVBQTBDLEtBQTFDLEVBQWlELENBQWpEO0FBQ0FmLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZixZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBOztBQUNKLFdBQUtYLFNBQVMsQ0FBQytCLFVBQWY7QUFDSTlCLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZixZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBVixRQUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2hCLGdCQUF6QixFQUEyQyxLQUEzQyxFQUFrRCxDQUFsRDtBQUNBOztBQUNKLFdBQUtWLFNBQVMsQ0FBQ2dDLEtBQWY7QUFDSS9CLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZixZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBVixRQUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2pCLGlCQUF6QixFQUE0QyxLQUE1QyxFQUFtRCxDQUFuRDtBQUNBOztBQUNKLFdBQUtULFNBQVMsQ0FBQ2lDLFFBQWY7QUFDSWhDLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZixZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBVixRQUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS2xCLG9CQUF6QixFQUErQyxLQUEvQyxFQUFzRCxDQUF0RDtBQUNBOztBQUNKLFdBQUtSLFNBQVMsQ0FBQ2tDLE9BQWY7QUFDSWpDLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZixZQUF6QixFQUF1QyxLQUF2QyxFQUE4QyxDQUE5QztBQUNBVixRQUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS3JCLFlBQXpCLEVBQXVDLEtBQXZDLEVBQThDLENBQTlDO0FBQ0E7O0FBQ0osV0FBS0wsU0FBUyxDQUFDbUMsR0FBZjtBQUNJbEMsUUFBQUEsRUFBRSxDQUFDc0IsV0FBSCxDQUFlRyxJQUFmLENBQW9CLEtBQUtiLFFBQXpCLEVBQW1DLEtBQW5DLEVBQTBDLENBQTFDO0FBQ0FaLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLZCxRQUF6QixFQUFtQyxLQUFuQyxFQUEwQyxDQUExQztBQUNBOztBQUNKLFdBQUtaLFNBQVMsQ0FBQ29DLElBQWY7QUFDSW5DLFFBQUFBLEVBQUUsQ0FBQ3NCLFdBQUgsQ0FBZUcsSUFBZixDQUFvQixLQUFLVCxTQUF6QixFQUFvQyxLQUFwQyxFQUEyQyxDQUEzQztBQUNBO0FBM0JSO0FBNkJILEdBNUZJO0FBNkZMb0IsRUFBQUEsaUJBQWlCLEVBQUMsNkJBQVk7QUFDMUJwQyxJQUFBQSxFQUFFLENBQUNzQixXQUFILENBQWVHLElBQWYsQ0FBb0IsS0FBS1gsYUFBekIsRUFBd0MsS0FBeEMsRUFBK0MsQ0FBL0M7QUFDSCxHQS9GSSxDQWdHTDs7QUFoR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbnZhciB7U291bmRUeXBlfSA9IHJlcXVpcmUoXCJHYW1lRmFrZVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBhdWRpb1dlbGNvbWU6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdWRpb0Rpc2NhcmRTdHJhaWdodDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvRGlzY2FyZEZsdXNoOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXVkaW9EaXNjYXJkQ3VsdTp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kRGlzY2FyZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGF1ZGlvV2luOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRXaW46e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb3VuZENvdW50RG93OntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc291bmRZb3VyVHVybjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kRm91ck9mS2luZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvdW5kUGFzczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sID0gW107XHJcbiAgICB9LFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgIH0sXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgY2MubG9nKFwicGxheVwiKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5nZXRNYXhBdWRpb0luc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIGlkID0gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Qb29sLnB1c2goaWQpO1xyXG4gICAgfSxcclxuICAgIHBsYXlBdWRpbzpmdW5jdGlvbiAoc291bmRUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChzb3VuZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuRk9VUl9PRl9LSU5EOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRm91ck9mS2luZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZVTExfSE9VU0U6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkQ3VsdSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLkZMVVNIOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvRGlzY2FyZEZsdXNoLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuc291bmREaXNjYXJkLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9EaXNjYXJkU3RyYWlnaHQsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNvdW5kVHlwZS5XRUxDT01FOlxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kRGlzY2FyZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2VsY29tZSwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU291bmRUeXBlLldJTjpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZFdpbiwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmF1ZGlvV2luLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTb3VuZFR5cGUuUEFTUzpcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5zb3VuZFBhc3MsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5U291bmRZb3VyVHVybjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLnNvdW5kWW91clR1cm4sIGZhbHNlLCAxKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19