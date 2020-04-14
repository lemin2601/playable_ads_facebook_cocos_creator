"use strict";
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
};
var CardGroup = {
  NONE: 0,
  STRAIGHT: 1,
  FULL_HOUSE: 2,
  FOUR_OF_KIND: 3
}; //["♣", "♠", "♥", "♦"];

var actions = [{
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("7", "♠"), Card.from("8", "♥"), Card.from("9", "♣"), Card.from("10", "♠"), Card.from("J", "♥")],
  group: CardGroup.STRAIGHT,
  emo: 0,
  time: 3,
  //delay action (s)
  sound: SoundType.STRAIGHT,
  next: 2
}, {
  index: 2,
  //bot 2
  type: ActionType.DISCARD,
  cards: [Card.from("5", "♦"), Card.from("9", "♦"), Card.from("J", "♦"), Card.from("K", "♦"), Card.from("A", "♦")],
  group: CardGroup.FLUSH,
  emo: [1, 2],
  time: 3,
  //delay action (s)
  sound: SoundType.FLUSH,
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("3", "♠"), Card.from("3", "♥"), Card.from("4", "♣"), Card.from("4", "♠"), Card.from("4", "♥")],
  group: CardGroup.FULL_HOUSE,
  emo: 3,
  time: 4,
  //delay action (s)
  sound: SoundType.FULL_HOUSE,
  next: 1,
  suggest: true
}, {
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("6", "♠"), Card.from("6", "♥"), Card.from("9", "♣"), Card.from("9", "♠"), Card.from("9", "♥")],
  group: CardGroup.FULL_HOUSE,
  emo: 4,
  time: 3,
  //delay action (s)
  sound: SoundType.FULL_HOUSE,
  next: 2
}, {
  index: 2,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  cards: [],
  time: 2,
  //delay action (s)
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("K", "♠"), Card.from("2", "♣"), Card.from("2", "♠"), Card.from("2", "♥"), Card.from("2", "♦")],
  group: CardGroup.FOUR_OF_KIND,
  time: 1,
  //delay action (s)
  emo: 5,
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