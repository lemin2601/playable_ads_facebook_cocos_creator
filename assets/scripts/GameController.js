var PlayableState = require('PlayableState');
var PoolHandler = require("PoolHandler");
var CCard = require("CCard");
var CTable = require("CTable");
var CPlayer = require("CPlayer");
var {Card,Table,Player} = require("Types");
var {ActionType,GameFake,SoundType} = require("GameFake");
var PlayableAds = require("PlayableAds");
var CAudio = require("CAudio");
var Utility = require("Utility");

cc.Class({
    extends   : cc.Component,
    properties: {
        playableState: {
            default     : null,
            type        : PlayableState,
            serializable: false,
            visible     : false
        },
        btnPlayNow   : cc.Button,
        btnDump      : cc.Button,
        btnPass      : cc.Button,
        layerGame    : cc.Node,
        layerAction  : cc.Node,
        table:{
            default:null,
            type:cc.Node
        },
        players  : {
            default: [],
            type   : cc.Node
        },
        layerCard:{
            default:null,
            type:cc.Node
        },
        nodeSuggestGesture:{
            default:null,
            type:cc.Node
        },
        nodeCHPlay:{
            default:null,
            type:cc.Node
        },
        effectWin:{
            default:null,
            type:cc.Node
        },
        cardPrefab: {
            default: null,
            type   : cc.Prefab
        },
        imgHands:{
            default:[],
            type:[cc.Sprite]
        },
        emoPlayers:{
            default:[],
            type:[cc.Node]
        },
        _poolCard: {
            default: null,
            type   : cc.NodePool,
            visible:false
        },
        _gameFake:{
            default:null,
            type: GameFake,
            visible:false
        },
    },

    ctor: function () {
        this.curIndex = -1;
        this.cardExpects = [];
        this.startPointTouch = null;
        this.zIndexCard = 10;
        this.audio = null;
        this._posHands = [];
    },
    onLoad: function () {
        for (var i = 0; i < this.imgHands.length; i++) {
            this._posHands.push(this.imgHands[i].node.getPosition());
        }
        this.nodeCHPlay.active = false;
        this.effectWin.getComponent("CEffectWin").gameController = this;
        this.nodeSuggestGesture.active = false;
        this.attachLayerCardToPlayer();
        this.audio = this.node.getComponent(CAudio);
        this.effectWin.active = false;
        //1. khoi tao info ban dau
        this._poolCard = new cc.NodePool(CCard);
        this._gameFake = new GameFake();
        var gameInfo = this._gameFake.getDefaultInfo();
        var tableConfig = gameInfo.table;
        var table = new Table(tableConfig.id,tableConfig.stake,tableConfig.pot);
        this.table.getComponent(CTable).setTable(table);

        //create new Card on Dock
        var cards = tableConfig.dock;
        var cTable = this.table.getComponent(CTable);
        cTable.setNumCard(cards.length);
        for (var j = 0; j < cards.length; j++) {
            var c = cards[j];

            var cardPrefabs = this._poolCard.get();
            if(!cardPrefabs){cardPrefabs = cc.instantiate(this.cardPrefab);}

            var cCard = cardPrefabs.getComponent(CCard);

            cCard.setCard(c);
            cCard.index = (j);
            cCard.setOwner(cTable);

            var p = cTable.getPositionCard(cCard);
            cardPrefabs.setPosition(p);
            this.layerCard.addChild(cardPrefabs);
        }
        console.log("onEnable players:" + this.players.length);

        //update info avatar + load card
        var playersConfig = gameInfo.players;
        for (var k = 0; k < playersConfig.length; k++) {
            var playerConfig = playersConfig[k];
            var player = new Player(playerConfig.index,playerConfig.displayName,playerConfig.gold,playerConfig.avatarIndex,playerConfig.cards);
            console.log("get palyer at:" + player.index);
            var cPlayer = this.players[player.index].getComponent(CPlayer);
            cPlayer.setGameController(this);
            cPlayer.setPlayer(player);
        }
        //load prefab cardPrefabs
        // cc.loader.loadRes("prefabs/cardPrefab", function (err, prefab) {
        //     var newNode = cc.instantiate(prefab);
        //     newNode.setPosition(100,100);
        //     this.layerGame.addChild(newNode);
        //     // cc.director.getScene().addChild(newNode);
        // }.bind(this));
        this.node.on("card-touch",this.onTouchCard,this);

        var actionConfig = this._gameFake.getAction();
        var delayTime = actionConfig.time;
        this.curIndex = actionConfig.index;
        this.onEnterTurn(actionConfig.index);
        if(delayTime>0){
            this.scheduleOnce(function () {
                this.executeAction();
            }.bind(this),delayTime);
        }
        // this._playEmo(5);
        //
        // setTimeout(function () {
        //     this._playEmo(4);
        // }.bind(this),2000);
    },
    _playEmo:function(index){
        console.log("play emo:" + index);
        var emo = this.emoPlayers[index];
        if(emo){
            var spine = emo.getComponent('sp.Skeleton');
            // spine.setStartListener(function(trackEntry){
            //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            //     cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
            // });
            // spine.setInterruptListener(function (trackEntry){
            //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            //     cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
            // });
            // spine.setEndListener(function (trackEntry){
            //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            //     cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            // });
            // spine.setDisposeListener(function (trackEntry){
            //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            //     cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
            // });
            spine.setCompleteListener(function(trackEntry){
                emo.active = false;
                // var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                // // if (animationName === 'shoot') {
                // //     this.spine.clearTrack(1);
                // // }
                // var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                // cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
            });
            // spine.setEventListener(function(trackEntry, event){
            //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            //     cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
            // });
            emo.active = true;
            spine.setAnimation(0, 'animation', false);
        }
    },
    start:function(){

    },
    onEnable:function(){
        console.log("onEnable players:" + this.players.length);
    },

    attachLayerCardToPlayer:function(){
        var len = this.players.length;
        for (var i = 0; i < len; i++) {
            var cPlayer = this.players[i].getComponent("CPlayer");
            cPlayer.setLayerCard(this.layerCard);
        }
    },
    onEnterTurn:function(index){
        console.log("onEnterTurn: " + index);
        var cPlayer = this.players[index].getComponent(CPlayer);
        cPlayer.onEnterTurn();
    },
    executeAction:function(){
        this.nodeSuggestGesture.active = false;
        var actionConfig = this._gameFake.getAction();
        console.log("executeAction:" + JSON.stringify(actionConfig));
        var index = actionConfig.index;

        var type = actionConfig.type;
        switch (type) {
            case ActionType.PASS:
                this.onPassAt(index);
                break;
            case ActionType.DISCARD:
                this.onDiscardAt(index,actionConfig.cards,actionConfig.group);
                break;
        }
        var sound = actionConfig.sound;
        if(sound){
            this.audio.playAudio(sound);
        }

        var emo = actionConfig.emo;
        if(emo != null){
            if(emo instanceof Array){
                for (var k = 0; k < emo.length; k++) {
                    setTimeout(function (i) {
                        this._playEmo(i);
                    }.bind(this,emo[k]),k  * 2000);
                }
            }else{
                this._playEmo(emo);
            }
        }
        if(actionConfig.isEnded){
            this.effectWin.active = true;
            for (var i = 0; i < this.imgHands.length; i++) {
                var hand = this.imgHands[i];
                hand.node.runAction(cc.moveBy(0.5,0,-300));
            }
        }else{
            this.curIndex = actionConfig.next;
            var actionNext = this._gameFake.next();
            if(actionNext){
                this.onEnterTurn(actionNext.index);
                console.log("actionNext:" + JSON.stringify(actionNext));
                var delayTime = actionNext.time;
                if(delayTime>0){
                    this.scheduleOnce(function () {
                        var actionConfig = this._gameFake.getAction();
                        var index = actionConfig.index;
                        if(index === 0 ){
                            if(actionConfig.suggest){//neu co suggest
                                this.nodeSuggestGesture.active = true;
                                this.players[0].getComponent(CPlayer).onSuggestCard(actionConfig.cards);
                            }
                            this.cardExpects = actionConfig.cards;
                            return;
                        }
                        this.executeAction();
                    }.bind(this),delayTime);
                }
            }
        }
    },
    onPassAt:function(index){
        console.log("onPassAt:" + index);
        var cPlayer = this.players[index].getComponent(CPlayer);
        cPlayer.onPass();
    },
    onDiscardAt:function(index,cards,groupType){
        console.log("onDiscardAt:" + index +"|" + JSON.stringify(cards));
        var cTable = this.table.getComponent(CTable);
        var cardPrefabs = this.players[index].getComponent(CPlayer).onDiscard(cards);

        var effectDiscard = function (cardPrefab) {
            //1. move den dock -> xoay lai 0 do -> nay bat ra ra 1 ti
            var cCard = cardPrefab.getComponent(CCard);
            var len = cTable.numCard;
            var index = cCard.index;

            var p = cTable.getPositionCard(cCard);
            var duration = 0.3;
            var duration1 = 0.15;
            cardPrefab.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(duration,p),
                    cc.rotateTo(duration,0),
                    cc.sequence(
                        cc.scaleTo(duration/2,1.2,1.2),
                        cc.scaleTo(duration/2,0.95,0.95)
                    )
                ),
                cc.spawn(
                    cc.scaleTo(duration1,1,1),
                    cc.moveTo(duration1,p.x+ (Math.random() * 10 * (index - (len-1)/2)),p.y),
                    cc.rotateTo(duration1, (index - (len - 1)/2) * Math.random() * 4)
                )
            ));
        };
        var len = cardPrefabs.length;
        cTable.setNumCard(len);
        for (var k = 0; k < len; k++) {
            var cardPrefab = cardPrefabs[k];
            var cCard = cardPrefab.getComponent(CCard);
            cCard.index = (k);
            cCard.owner = cTable;
            cardPrefab.zIndex = ++ this.zIndexCard;

            effectDiscard(cardPrefab);

            // var p = cTable.getPositionCard(cCard);
            // cardPrefab.runAction(cc.spawn(
            //     cc.moveTo(0.15,p),
            //     cc.rotateTo(1,0)
            // ));
            // cc.log("newZIndex:" + this.zIndexCard);

            //duoc add khi tao ra
            // this.layerGame.addChild(cardPrefab);
        }

        // for (var j = 0; j < cards.length; j++) {
        //     var c = cards[j];
        //
        //     var cardPrefabs = this._poolCard.get();
        //     if(!cardPrefabs){cardPrefabs = cc.instantiate(this.cardPrefab);}
        //
        //     var cCard = cardPrefabs.getComponent(CCard);
        //
        //     cCard.setCard(c);
        //     cCard.index = (j);
        //     cCard.owner = cTable;
        //
        //     var p = cTable.getPositionCard(cCard);
        //     cardPrefabs.setPosition(p);
        //     this.layerGame.addChild(cardPrefabs);
        // }
    },

    onTouchCard:function(event){
        var data = event.getUserData();
        var cCard = data.card;
        var owner = cCard.owner;
        if(owner instanceof CTable){
            console.log("passing card on table");
            return;
        }
        if(owner instanceof CPlayer){
            if(this.isMyTurn()){
                if(this.isTouchExpectCards(cCard.card)){
                    switch (data.event.type) {
                        case cc.Node.EventType.TOUCH_START:
                            this.startPointTouch = data.event.getLocation();
                            break;
                        case cc.Node.EventType.TOUCH_MOVE:
                            break;
                        case cc.Node.EventType.TOUCH_END:
                        case cc.Node.EventType.TOUCH_CANCEL:
                            if(this.startPointTouch){
                                var pos = data.event.getLocation();
                                if(pos.y - this.startPointTouch.y > 45){
                                    this.executeAction();
                                    cc.log("Discard on my turn");
                                }else{
                                    cc.log("!!Discard on my turn");
                                }
                            }
                            cc.log("touch:" + JSON.stringify(this.startPointTouch) +"| "+ JSON.stringify(pos))
                            break;
                    }
                }else{
                    cc.log("not expects card");
                }
            }else{
                cc.log("not my turn");
            }
            // owner.onTouchCard(data.event,data.card)
        }
        // console.log("onTouchCard at controler");
    },

    onPlayNow: function () {
        console.log("onPlay path main");
        PlayableAds.onCTAClick();
    },

    onTouchDump: function () {
        console.log("touch Dump");
    },

    onTouchPass: function () {
        console.log("touch Pass");
    },

    getNewCard:function(){
        var cardPrefab = this._poolCard.get();
        if(!cardPrefab){cardPrefab = cc.instantiate(this.cardPrefab);}
        return cardPrefab;
    },

    isMyTurn:function () {
        return this.curIndex === 0;
    },
    isTouchExpectCards:function (card) {
        var len = this.cardExpects.length;
        for (var i = 0; i < len; i++) {
            var c = this.cardExpects[i];
            if(c.id === card.id){
                return true;
            }
        }
        return false;
    },
    showNodeCHPlay:function () {
        this.nodeCHPlay.active = true;
    }
});