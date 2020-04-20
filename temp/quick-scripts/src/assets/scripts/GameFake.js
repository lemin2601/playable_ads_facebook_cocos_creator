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
  FOUR_OF_KIND: 4,
  WIN: 5,
  PASS: 6,
  NONE: 7,
  PAIR: 8,
  DOS_OUT: 9,
  VOICE_10: 10,
  VOICE_11: 11,
  VOICE_13: 13,
  VOICE_14: 14
};
var CardGroup = {
  NONE: 0,
  PAIR: 4,
  STRAIGHT: 1,
  FULL_HOUSE: 2,
  FOUR_OF_KIND: 3
}; //["♣", "♠", "♥", "♦"];
// var actions = [
//     {
//         index:1,//bot 1
//         type:ActionType.DISCARD,
//         cards:[
//             Card.from("7","♠"),
//             Card.from("8","♥"),
//             Card.from("9","♣"),
//             Card.from("10","♠"),
//             Card.from("J","♥")
//         ],
//         group:CardGroup.STRAIGHT,
//         emo:0,
//         time:6,//delay action (s)
//         sound:SoundType.STRAIGHT,
//         next:2
//     },
//     {
//         index:2,//bot 2
//         type:ActionType.DISCARD,
//         cards:[
//             Card.from("5","♦"),
//             Card.from("9","♦"),
//             Card.from("J","♦"),
//             Card.from("K","♦"),
//             Card.from("A","♦")
//         ],
//         group:CardGroup.FLUSH,
//         emo:[1,2],
//         time:3,//delay action (s)
//         sound:SoundType.FLUSH,
//         next:0
//     },
//     {
//         index:0,//nguoi choi
//         type:ActionType.DISCARD,
//         cards:[
//             Card.from("3","♠"),
//             Card.from("3","♥"),
//             Card.from("4","♣"),
//             Card.from("4","♠"),
//             Card.from("4","♥")
//         ],
//         group:CardGroup.FULL_HOUSE,
//         emo:3,
//         time:2,//delay action (s)
//         sound:SoundType.FULL_HOUSE,
//         next:1,
//         suggest:true
//     },
//     {
//         index:1,//bot 1
//         type:ActionType.DISCARD,
//         cards:[
//             Card.from("6","♠"),
//             Card.from("6","♥"),
//             Card.from("9","♣"),
//             Card.from("9","♠"),
//             Card.from("9","♥")
//         ],
//         group:CardGroup.FULL_HOUSE,
//         emo:4,
//         time:3,//delay action (s)
//         sound:SoundType.FULL_HOUSE,
//         next:2
//     },
//     {
//         index:2,//bot
//         type:ActionType.PASS,
//         group:CardGroup.NONE,
//         sound:SoundType.PASS,
//         cards:[],
//         time:2,//delay action (s)
//         next:0
//     },
//     {
//         index:0,//nguoi choi
//         type:ActionType.DISCARD,
//         cards:[
//             Card.from("K","♠"),
//             Card.from("2","♣"),
//             Card.from("2","♠"),
//             Card.from("2","♥"),
//             Card.from("2","♦")
//         ],
//         group:CardGroup.FOUR_OF_KIND,
//         sound:SoundType.FOUR_OF_KIND,
//         time:1,//delay action (s)
//         emo:5,
//         isEnded:true
//     }
// ];
//["♣", "♠", "♥", "♦"];

var actions1 = [{
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("3", "♦"), Card.from("3", "♠")],
  group: CardGroup.PAIR,
  emo: 0,
  time: 6,
  //delay action (s)
  sound: [SoundType.PAIR, SoundType.VOICE_10],
  next: 2
}, {
  index: 2,
  //bot 2
  type: ActionType.DISCARD,
  cards: [Card.from("5", "♦"), Card.from("5", "♥")],
  group: CardGroup.PAIR,
  emo: [1, 2],
  time: 3,
  //delay action (s)
  sound: SoundType.PAIR,
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("7", "♦"), Card.from("7", "♠")],
  group: CardGroup.PAIR,
  emo: 3,
  time: 2,
  //delay action (s)
  sound: [SoundType.PAIR, SoundType.VOICE_11],
  next: 1,
  suggest: true
}, {
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("10", "♠"), Card.from("10", "♣")],
  group: CardGroup.PAIR,
  emo: 4,
  time: 3,
  //delay action (s)
  sound: SoundType.PAIR,
  next: 2
}, {
  index: 2,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  sound: SoundType.PASS,
  cards: [],
  time: 2,
  //delay action (s)
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [[Card.from("J", "♦"), Card.from("J", "♥")], [Card.from("K", "♠"), Card.from("K", "♥")]],
  group: CardGroup.PAIR,
  sound: [SoundType.PAIR, SoundType.VOICE_14],
  time: 1,
  //delay action (s)
  emo: 5,
  suggest: true,
  isEnded: false,
  next: 1
}, {
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("2", "♠"), Card.from("2", "♦")],
  group: [CardGroup.PAIR, SoundType.VOICE_13],
  emo: 4,
  time: 3,
  //delay action (s)
  sound: SoundType.DOS_OUT,
  next: 2
}, {
  index: 2,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  sound: SoundType.PASS,
  cards: [],
  time: 0.7,
  //delay action (s)
  next: 0
}, {
  index: 0,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  sound: SoundType.PASS,
  cards: [],
  time: 0.7,
  //delay action (s)
  next: 1,
  isNewRound: true
}, {
  index: 1,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("7", "♥"), Card.from("8", "♥"), Card.from("9", "♣"), Card.from("10", "♦"), Card.from("J", "♣")],
  group: CardGroup.STRAIGHT,
  emo: 4,
  time: 3,
  //delay action (s)
  sound: SoundType.STRAIGHT,
  next: 2
}, {
  index: 2,
  //bot 1
  type: ActionType.DISCARD,
  cards: [Card.from("5", "♦"), Card.from("8", "♦"), Card.from("9", "♦"), Card.from("K", "♦"), Card.from("A", "♦")],
  group: CardGroup.FLUSH,
  emo: 4,
  time: 3,
  //delay action (s)
  sound: SoundType.FLUSH,
  next: 0
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [[Card.from("J", "♦"), Card.from("J", "♥"), Card.from("4", "♠"), Card.from("4", "♣"), Card.from("4", "♥")], [Card.from("K", "♠"), Card.from("K", "♥"), Card.from("4", "♠"), Card.from("4", "♣"), Card.from("4", "♥")]],
  group: CardGroup.FULL_HOUSE,
  sound: SoundType.FULL_HOUSE,
  time: 3,
  //delay action (s)
  emo: 5,
  next: 1,
  suggest: true
}, {
  index: 1,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  sound: SoundType.PASS,
  cards: [],
  time: 2,
  //delay action (s)
  next: 2
}, {
  index: 2,
  //bot
  type: ActionType.PASS,
  group: CardGroup.NONE,
  sound: SoundType.PASS,
  cards: [],
  time: 2,
  //delay action (s)
  next: 0,
  isNewRound: true
}, {
  index: 0,
  //nguoi choi
  type: ActionType.DISCARD,
  cards: [Card.from("2", "♥")],
  group: CardGroup.NONE,
  sound: SoundType.DOS_OUT,
  time: 1,
  //delay action (s)
  emo: 5,
  isEnded: true
}]; // var gameInfo = {
//     players:[
//         {
//             index:0,
//             displayName:"You",
//             gold:27000000,
//             avatarIndex:0,
//             cards:[
//                 Card.from("K","♠"),
//                 Card.from("2","♣"),
//                 Card.from("3","♠"),
//                 Card.from("3","♥"),
//                 Card.from("4","♣"),
//                 Card.from("4","♠"),
//                 Card.from("4","♥"),
//                 Card.from("2","♠"),
//                 Card.from("2","♥"),
//                 Card.from("2","♦")
//             ]
//         },
//         {
//             index:1,
//             displayName:"Maria",
//             gold:47000000,
//             avatarIndex:1,
//             cards:[]
//         },
//         {
//             index:2,
//             displayName:"Michelle",
//             gold:58000000,
//             avatarIndex:2,
//             cards:[]
//         }
//     ],
//     table:{
//         id:456,
//         stake:10000000,
//         pot:40000000,
//         dock:[
//             Card.from("Q","♦"),
//             Card.from("K","♣"),
//             Card.from("A","♠")
//         ]
//     }
// };

var gameInfo1 = {
  players: [{
    index: 0,
    displayName: "You",
    gold: 27000000,
    avatarIndex: 0,
    // cards:[
    //     Card.from("4","♣"),
    //     Card.from("4","♠"),
    //     Card.from("K","♠"),
    //     Card.from("K","♥"),
    //     Card.from("7","♠"),
    //     Card.from("7","♦"),
    //     Card.from("J","♥"),
    //     Card.from("J","♦"),
    //     Card.from("4","♥"),
    //     Card.from("2","♦"),
    // ]
    cards: [Card.from("4", "♣"), Card.from("4", "♠"), Card.from("4", "♥"), Card.from("7", "♠"), Card.from("7", "♦"), Card.from("J", "♥"), Card.from("J", "♦"), Card.from("K", "♠"), Card.from("K", "♥"), Card.from("2", "♥")]
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
  return actions1[this.curIndex];
};

GameFake.prototype.getDefaultInfo = function () {
  return gameInfo1;
};

module.exports = {
  GameFake: GameFake,
  ActionType: ActionType,
  SoundType: SoundType,
  CardGroup: CardGroup
};

cc._RF.pop();