
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameFake.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af1531lKdNCeqAorUj+Evyi', 'GameFake');
// scripts/GameFake.js

"use strict";

var _require = require("Types"),
    Card = _require.Card,
    Rank = _require.Rank,
    Suit = _require.Suit;

var ActionType = {
  DISCARD: 0,
  PASS: 1
};
var SoundType = {
  WELCOME: 0,
  STRAIGHT: 1,
  FLUSH: 2,
  FULL_HOUSE: 3,
  WIN: 4
}; //["♣", "♠", "♥", "♦"];

var actions = [{
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("7", "♠"), Card.from("8", "♥"), Card.from("9", "♣"), Card.from("10", "♠"), Card.from("J", "♥")],
  time: 3,
  //delay action (s)
  sound: SoundType.STRAIGHT,
  next: 2
}, {
  index: 2,
  //bot 2
  type: ActionType.DISCARD,
  cards: [Card.from("5", "♦"), Card.from("9", "♦"), Card.from("J", "♦"), Card.from("K", "♦"), Card.from("A", "♦")],
  time: 1,
  //delay action (s)
  sound: SoundType.FLUSH,
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("3", "♠"), Card.from("3", "♥"), Card.from("4", "♣"), Card.from("4", "♠"), Card.from("4", "♥")],
  time: 1,
  //delay action (s)
  sound: SoundType.FULL_HOUSE,
  next: 1,
  suggest: true
}, {
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("6", "♠"), Card.from("6", "♥"), Card.from("9", "♣"), Card.from("9", "♠"), Card.from("9", "♥")],
  time: 1,
  //delay action (s)
  sound: SoundType.FULL_HOUSE,
  next: 2
}, {
  index: 2,
  //bot
  type: ActionType.PASS,
  cards: [],
  time: 1,
  //delay action (s)
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("K", "♠"), Card.from("2", "♣"), Card.from("2", "♠"), Card.from("2", "♥"), Card.from("2", "♦")],
  time: 1,
  //delay action (s)
  sound: SoundType.WIN,
  isEnded: true
}];
var gameInfo = {
  players: [{
    index: 0,
    displayName: "You",
    gold: 27000000,
    avatarIndex: 0,
    cards: [Card.from("K", "♠"), Card.from("2", "♣"), Card.from("3", "♠"), Card.from("3", "♥"), Card.from("4", "♣"), Card.from("4", "♠"), Card.from("4", "♥"), Card.from("2", "♠"), Card.from("2", "♥"), Card.from("2", "♦")]
  }, {
    index: 1,
    displayName: "Maria",
    gold: 47000000,
    avatarIndex: 1,
    cards: []
  }, {
    index: 2,
    displayName: "Michelle",
    gold: 58000000,
    avatarIndex: 2,
    cards: []
  }],
  table: {
    id: 456,
    stake: 10000000,
    pot: 40000000,
    dock: [Card.from("Q", "♦"), Card.from("K", "♣"), Card.from("A", "♠")]
  }
};

function GameFake() {
  this.curIndex = 0;
}

GameFake.prototype.reset = function () {
  this.curIndex = 0;
};

GameFake.prototype.next = function () {
  this.curIndex++;
  return this.getAction();
};

GameFake.prototype.getAction = function () {
  return actions[this.curIndex];
};

GameFake.prototype.getDefaultInfo = function () {
  return gameInfo;
};

module.exports = {
  GameFake: GameFake,
  ActionType: ActionType,
  SoundType: SoundType
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUZha2UuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkNhcmQiLCJSYW5rIiwiU3VpdCIsIkFjdGlvblR5cGUiLCJESVNDQVJEIiwiUEFTUyIsIlNvdW5kVHlwZSIsIldFTENPTUUiLCJTVFJBSUdIVCIsIkZMVVNIIiwiRlVMTF9IT1VTRSIsIldJTiIsImFjdGlvbnMiLCJpbmRleCIsInR5cGUiLCJjYXJkcyIsImZyb20iLCJ0aW1lIiwic291bmQiLCJuZXh0Iiwic3VnZ2VzdCIsImlzRW5kZWQiLCJnYW1lSW5mbyIsInBsYXllcnMiLCJkaXNwbGF5TmFtZSIsImdvbGQiLCJhdmF0YXJJbmRleCIsInRhYmxlIiwiaWQiLCJzdGFrZSIsInBvdCIsImRvY2siLCJHYW1lRmFrZSIsImN1ckluZGV4IiwicHJvdG90eXBlIiwicmVzZXQiLCJnZXRBY3Rpb24iLCJnZXREZWZhdWx0SW5mbyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQXVCQSxPQUFPLENBQUMsT0FBRDtJQUF6QkMsZ0JBQUFBO0lBQUtDLGdCQUFBQTtJQUFLQyxnQkFBQUE7O0FBQ2YsSUFBSUMsVUFBVSxHQUFHO0FBQ2JDLEVBQUFBLE9BQU8sRUFBQyxDQURLO0FBRWJDLEVBQUFBLElBQUksRUFBQztBQUZRLENBQWpCO0FBSUEsSUFBSUMsU0FBUyxHQUFHO0FBQ1pDLEVBQUFBLE9BQU8sRUFBQyxDQURJO0FBRVpDLEVBQUFBLFFBQVEsRUFBQyxDQUZHO0FBR1pDLEVBQUFBLEtBQUssRUFBQyxDQUhNO0FBSVpDLEVBQUFBLFVBQVUsRUFBQyxDQUpDO0FBS1pDLEVBQUFBLEdBQUcsRUFBQztBQUxRLENBQWhCLEVBT0E7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHLENBQ1Y7QUFDSUMsRUFBQUEsS0FBSyxFQUFDLENBRFY7QUFDWTtBQUNSQyxFQUFBQSxJQUFJLEVBQUNYLFVBQVUsQ0FBQ0MsT0FGcEI7QUFHSVcsRUFBQUEs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QUNnQixJQUFMLENBQVUsR0FBVixFQUFjLEdBQWQsQ0FIQztBQUpIO0FBbkNLLENBQWY7O0FBOENBLFNBQVNnQixRQUFULEdBQW9CO0FBQ2hCLE9BQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDSDs7QUFDREQsUUFBUSxDQUFDRSxTQUFULENBQW1CQyxLQUFuQixHQUEyQixZQUFVO0FBQ2pDLE9BQUtGLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDSCxDQUZEOztBQUdBRCxRQUFRLENBQUNFLFNBQVQsQ0FBbUJmLElBQW5CLEdBQTBCLFlBQVU7QUFDaEMsT0FBS2MsUUFBTDtBQUNBLFNBQU8sS0FBS0csU0FBTCxFQUFQO0FBQ0gsQ0FIRDs7QUFJQUosUUFBUSxDQUFDRSxTQUFULENBQW1CRSxTQUFuQixHQUErQixZQUFVO0FBQ3JDLFNBQU94QixPQUFPLENBQUMsS0FBS3FCLFFBQU4sQ0FBZDtBQUNILENBRkQ7O0FBR0FELFFBQVEsQ0FBQ0UsU0FBVCxDQUFtQkcsY0FBbkIsR0FBb0MsWUFBVTtBQUMxQyxTQUFPZixRQUFQO0FBQ0gsQ0FGRDs7QUFLQWdCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiUCxFQUFBQSxRQUFRLEVBQUNBLFFBREk7QUFFYjdCLEVBQUFBLFVBQVUsRUFBQ0EsVUFGRTtBQUdiRyxFQUFBQSxTQUFTLEVBQUNBO0FBSEcsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7Q2FyZCxSYW5rLFN1aXR9ID0gcmVxdWlyZShcIlR5cGVzXCIpO1xyXG52YXIgQWN0aW9uVHlwZSA9IHtcclxuICAgIERJU0NBUkQ6MCxcclxuICAgIFBBU1M6MVxyXG59O1xyXG52YXIgU291bmRUeXBlID0ge1xyXG4gICAgV0VMQ09NRTowLFxyXG4gICAgU1RSQUlHSFQ6MSxcclxuICAgIEZMVVNIOjIsXHJcbiAgICBGVUxMX0hPVVNFOjMsXHJcbiAgICBXSU46NFxyXG59O1xyXG4vL1tcIuKZo1wiLCBcIuKZoFwiLCBcIuKZpVwiLCBcIuKZplwiXTtcclxudmFyIGFjdGlvbnMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgaW5kZXg6MSwvL2JvdCAxXHJcbiAgICAgICAgdHlwZTpBY3Rpb25UeXBlLkRJU0NBUkQsXHJcbiAgICAgICAgY2FyZHM6W1xyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCI3XCIsXCLimaBcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjhcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiOVwiLFwi4pmjXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCIxMFwiLFwi4pmgXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCJKXCIsXCLimaVcIilcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRpbWU6MywvL2RlbGF5IGFjdGlvbiAocylcclxuICAgICAgICBzb3VuZDpTb3VuZFR5cGUuU1RSQUlHSFQsXHJcbiAgICAgICAgbmV4dDoyXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGluZGV4OjIsLy9ib3QgMlxyXG4gICAgICAgIHR5cGU6QWN0aW9uVHlwZS5ESVNDQVJELFxyXG4gICAgICAgIGNhcmRzOltcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiNVwiLFwi4pmmXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCI5XCIsXCLimaZcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIkpcIixcIuKZplwiKSxcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiS1wiLFwi4pmmXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCJBXCIsXCLimaZcIilcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRpbWU6MSwvL2RlbGF5IGFjdGlvbiAocylcclxuICAgICAgICBzb3VuZDpTb3VuZFR5cGUuRkxVU0gsXHJcbiAgICAgICAgbmV4dDowXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGluZGV4OjAsLy9uZ3VvaSBjaG9pXHJcbiAgICAgICAgdHlwZTpBY3Rpb25UeXBlLkRJU0NBUkQsXHJcbiAgICAgICAgY2FyZHM6W1xyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCIzXCIsXCLimaBcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjNcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiNFwiLFwi4pmjXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCI0XCIsXCLimaBcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjRcIixcIuKZpVwiKVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdGltZToxLC8vZGVsYXkgYWN0aW9uIChzKVxyXG4gICAgICAgIHNvdW5kOlNvdW5kVHlwZS5GVUxMX0hPVVNFLFxyXG4gICAgICAgIG5leHQ6MSxcclxuICAgICAgICBzdWdnZXN0OnRydWVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaW5kZXg6MSwvL2JvdCAxXHJcbiAgICAgICAgdHlwZTpBY3Rpb25UeXBlLkRJU0NBUkQsXHJcbiAgICAgICAgY2FyZHM6W1xyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCI2XCIsXCLimaBcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjZcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiOVwiLFwi4pmjXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCI5XCIsXCLimaBcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjlcIixcIuKZpVwiKVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdGltZToxLC8vZGVsYXkgYWN0aW9uIChzKVxyXG4gICAgICAgIHNvdW5kOlNvdW5kVHlwZS5GVUxMX0hPVVNFLFxyXG4gICAgICAgIG5leHQ6MlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpbmRleDoyLC8vYm90XHJcbiAgICAgICAgdHlwZTpBY3Rpb25UeXBlLlBBU1MsXHJcbiAgICAgICAgY2FyZHM6W10sXHJcbiAgICAgICAgdGltZToxLC8vZGVsYXkgYWN0aW9uIChzKVxyXG4gICAgICAgIG5leHQ6MFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpbmRleDowLC8vbmd1b2kgY2hvaVxyXG4gICAgICAgIHR5cGU6QWN0aW9uVHlwZS5ESVNDQVJELFxyXG4gICAgICAgIGNhcmRzOltcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiS1wiLFwi4pmgXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCIyXCIsXCLimaNcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIjJcIixcIuKZoFwiKSxcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiMlwiLFwi4pmlXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCIyXCIsXCLimaZcIilcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRpbWU6MSwvL2RlbGF5IGFjdGlvbiAocylcclxuICAgICAgICBzb3VuZDpTb3VuZFR5cGUuV0lOLFxyXG4gICAgICAgIGlzRW5kZWQ6dHJ1ZVxyXG4gICAgfVxyXG5dO1xyXG52YXIgZ2FtZUluZm8gPSB7XHJcbiAgICBwbGF5ZXJzOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGluZGV4OjAsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiWW91XCIsXHJcbiAgICAgICAgICAgIGdvbGQ6MjcwMDAwMDAsXHJcbiAgICAgICAgICAgIGF2YXRhckluZGV4OjAsXHJcbiAgICAgICAgICAgIGNhcmRzOltcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIktcIixcIuKZoFwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjJcIixcIuKZo1wiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjNcIixcIuKZoFwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjNcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjRcIixcIuKZo1wiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjRcIixcIuKZoFwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjRcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjJcIixcIuKZoFwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjJcIixcIuKZpVwiKSxcclxuICAgICAgICAgICAgICAgIENhcmQuZnJvbShcIjJcIixcIuKZplwiKVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGluZGV4OjEsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOlwiTWFyaWFcIixcclxuICAgICAgICAgICAgZ29sZDo0NzAwMDAwMCxcclxuICAgICAgICAgICAgYXZhdGFySW5kZXg6MSxcclxuICAgICAgICAgICAgY2FyZHM6W11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5kZXg6MixcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6XCJNaWNoZWxsZVwiLFxyXG4gICAgICAgICAgICBnb2xkOjU4MDAwMDAwLFxyXG4gICAgICAgICAgICBhdmF0YXJJbmRleDoyLFxyXG4gICAgICAgICAgICBjYXJkczpbXVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0YWJsZTp7XHJcbiAgICAgICAgaWQ6NDU2LFxyXG4gICAgICAgIHN0YWtlOjEwMDAwMDAwLFxyXG4gICAgICAgIHBvdDo0MDAwMDAwMCxcclxuICAgICAgICBkb2NrOltcclxuICAgICAgICAgICAgQ2FyZC5mcm9tKFwiUVwiLFwi4pmmXCIpLFxyXG4gICAgICAgICAgICBDYXJkLmZyb20oXCJLXCIsXCLimaNcIiksXHJcbiAgICAgICAgICAgIENhcmQuZnJvbShcIkFcIixcIuKZoFwiKVxyXG4gICAgICAgIF1cclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gR2FtZUZha2UoKSB7XHJcbiAgICB0aGlzLmN1ckluZGV4ID0gMDtcclxufVxyXG5HYW1lRmFrZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5jdXJJbmRleCA9IDA7XHJcbn07XHJcbkdhbWVGYWtlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuY3VySW5kZXggKys7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRBY3Rpb24oKTtcclxufTtcclxuR2FtZUZha2UucHJvdG90eXBlLmdldEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gYWN0aW9uc1t0aGlzLmN1ckluZGV4XTtcclxufTtcclxuR2FtZUZha2UucHJvdG90eXBlLmdldERlZmF1bHRJbmZvID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBnYW1lSW5mbztcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEdhbWVGYWtlOkdhbWVGYWtlLFxyXG4gICAgQWN0aW9uVHlwZTpBY3Rpb25UeXBlLFxyXG4gICAgU291bmRUeXBlOlNvdW5kVHlwZVxyXG59OyJdfQ==