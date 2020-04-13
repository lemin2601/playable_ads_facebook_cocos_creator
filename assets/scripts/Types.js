var Rank     = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];
var Suit     = ["♣", "♠", "♥", "♦"];

/**
 * 扑克牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 * 因此全局只需要有 52 个实例（去掉大小王），不论有多少副牌
 * @class Card
 * @constructor
 * @param {Number} point - 0->12
 * @param {Suit} suit - 0->3
 */
function Card(point, suit) {
    Object.defineProperties(this, {
        point: {
            value   : point,
            writable: false
        },

        suit: {
            value   : suit,
            writable: false
        },

        /**
         * @property {Number} id - 可能的值为 0 到 51
         */
        id: {
            value   : (suit) * 13 + (point),
            writable: false
        },

        //
        pointName  : {
            get: function () {
                return Rank[this.point];
            }
        },
        suitName   : {
            get: function () {
                return Suit[this.suit];
            }
        },
        isBlackSuit: {
            get: function () {
                return this.suit === 0 || this.suit === 1;
            }
        },
        isRedSuit  : {
            get: function () {
                return this.suit === 2 || this.suit === 3;
            }
        },
        isAce:{
            get: function () {
                return this.point === 11;
            }
        },
        isFace:{
            get: function () {
                return this.point >= 8 && this.point <=10;
            }
        }
    });
}

Card.prototype.toString = function () {
    return this.pointName + this.suitName;
};

//bo bai 52 quan
var cards = new Array(52);

/**
 * get card from id
 * @param {Number} id - 0 -> 51
 */
Card.fromId = function (id) {
    return cards[id];
};
Card.from = function (point, suit) {
    return Card.fromId(Rank.indexOf(point) + Suit.indexOf(suit) * 13);
};
function Player(index,name,gold,avatar,cards){
    gold = gold === undefined ? 0 : gold;
    avatar = avatar === undefined ? 0 : avatar;
    cards = cards === undefined ? [] : cards;
    Object.defineProperties(this, {
        index:{
            value   : index,
            writable: false
        },
        name: {
            value   : name,
            writable: false
        },
        gold:{
            writable: true,
            value:gold
        },
        avatar:{
            writable: true,
            value:avatar
        },
        cards:{
            writable:true,
            value:cards
        }
    });
}
function Table(id,stake,pot){
    Object.defineProperties(this, {
        id: {
            value   : id,
            writable: false
        },
        stake: {
            value   : stake,
            writable: false
        },
        pot:{
            writable: true,
            value:pot
        },
    });
}

//auto creator
(function createCards() {
    for (var s = 0; s < 4; s++) {
        for (var p = 0; p < 13; p++) {
            var card       = new Card(p, s);
            cards[card.id] = card;
        }
    }
})();

module.exports = {
    Rank: Rank,
    Suit: Suit,
    Card: Card,
    Player:Player,
    Table:Table
};