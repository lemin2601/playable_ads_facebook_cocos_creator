var PlayableState = require('PlayableState');
var PoolHandler = require("PoolHandler");
var CCard = require("CCard");
var CTable = require("CTable");
var CPlayer = require("CPlayer");
var {Card,Table,Player} = require("Types");
var {ActionType,GameFake,SoundType,CardGroup} = require("GameFake");
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
        effectCardGroup:{
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
        imgHighLight:{
            default:null,
            type:cc.Node
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
        this.groupExpects = []; //group cards
        this.startPointTouch = null;
        this.zIndexCard = 10;
        this.audio = null;
        this._posHands = [];
    },
    onLoad: function () {
        // cc.director.setDisplayStats(false);
        for (var i = 0; i < this.imgHands.length; i++) {
            this._posHands.push(this.imgHands[i].node.getPosition());
        }
        this.nodeCHPlay.active = false;
        this.imgHighLight.active = false;
        this.effectCardGroup.active = false;
        this.effectWin.getComponent("CEffectWin").gameController = this;
        this.nodeSuggestGesture.active = false;
        this.attachLayerCardToPlayer();
        this.audio = this.node.getComponent(CAudio);
        this.effectWin.active = false;
        //1. khoi tao info ban dau
        this._poolCard = new cc.NodePool(CCard);

        //region khoi tao ban dau game
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
            cCard.node.angle = (Math.random() - 0.5) * 40;
            cardPrefabs.setPosition(p);
            this.layerCard.addChild(cardPrefabs);
            cTable.addCards([cardPrefabs]);

        }
        // cc.log("onEnable players:" + this.players.length);

        //update info avatar + load card
        var playersConfig = gameInfo.players;
        for (var k = 0; k < playersConfig.length; k++) {
            var playerConfig = playersConfig[k];
            var player = new Player(playerConfig.index,playerConfig.displayName,playerConfig.gold,playerConfig.avatarIndex,playerConfig.cards);
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
        //endregion khoi tao ban dau game

        //region add event touch card
        this.node.on("card-touch",this.onTouchCard,this);
        //endregion add event touch card

        //region execute action number 1
        //enter turn + execute action
        var actionConfig = this._gameFake.getAction();
        var delayTime = actionConfig.time;
        this.curIndex = actionConfig.index;
        this.onEnterTurn(actionConfig.index);
        if(delayTime>0){
            this.scheduleOnce(function () {
                this.executeAction();
            }.bind(this),delayTime);
        }
        //endregion execute action number 1
    },
    start:function(){
        // setTimeout(function () {
        //     this.effectWin.active = true;
        // }.bind(this),2000);
    },
    onEnable:function(){
        console.log("onEnable players:" + this.players.length);
    },

    beforeExecuteAction:function(){
        var actionConfig = this._gameFake.getAction();
        var index = actionConfig.index;
        if(index === 0 ){
            if(actionConfig.type === ActionType.PASS){
                this.executeAction();
                return;
            }
            this.audio.playSoundYourTurn();
            this.setGroupExpects(actionConfig.cards);
            if(actionConfig.suggest){//neu co suggest
                cc.log("show suggest");
                this.nodeSuggestGesture.active = true;
                this.players[0].getComponent(CPlayer).onSuggestCard(this.groupExpects);
            }else{
                this.scheduleOnce(this.autoShowSuggest,3);
            }
            return;
        }
        this.executeAction();

    },
    /**
     *
     * @param cardExpect {Card} card mong muon danh
     */
    executeAction:function(cardExpect){
        //1. turn off viec suggest
        //2. close turn
        //3. discard | pass
        //4. play sound
        //5. play emo
        //6. check ended game
        //7. next action|next turn

        //1. turn off viec suggest
        this._turnOffAutoSuggest();

        var actionConfig = this._gameFake.getAction();

        //2. close turn
        var index = actionConfig.index;
        this.onCloseTurn(index);

        //3. discard | pass
        var type = actionConfig.type;
        switch (type) {
            case ActionType.PASS:
                this.onPassAt(index,actionConfig.isNewRound);
                break;
            case ActionType.DISCARD:
                this.onDiscardAt(index,actionConfig.cards,actionConfig.group,cardExpect);
                break;
        }

        //4. play sound
        var sound = actionConfig.sound;
        if(sound){
            setTimeout(function () {
                this.audio.playAudio(sound);
            }.bind(this),500);
        }


        //5. play emo
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

        //6. check ended game
        if(actionConfig.isEnded){
            setTimeout(function () {
                for (var i = 0; i < this.imgHands.length; i++) {
                    var hand = this.imgHands[i];
                    hand.node.runAction(cc.moveBy(0.5,0,-300));
                }
            }.bind(this),1000);
            setTimeout(function () {
                this.audio.playAudio(SoundType.WIN);
                this.effectWin.active = true;
            }.bind(this),2500);
        }else{

            //7. next action|next turn
            this.curIndex = actionConfig.next;
            var actionNext = this._gameFake.next();
            if(actionNext){
                this.onEnterTurn(actionNext.index);
                console.log("actionNext:" + JSON.stringify(actionNext));
                var delayTime = actionNext.time;
                if(delayTime>0){
                    this.scheduleOnce(function () {
                        this.beforeExecuteAction();
                    }.bind(this),delayTime);
                }
            }
        }
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
                                    this.executeAction(cCard.card);
                                    cc.log("Discard on my turn:" + cCard.card);
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
    onCloseTurn:function(index){
        var player = this.players[index];
        if(player){
            var cPlayer = player.getComponent(CPlayer);
            if(player){
                cPlayer.onCloseTurn();
                return;
            }
        }
        console.log("missing player or CPlayer at index:" + index);
    },
    autoShowSuggest:function(){
        this.nodeSuggestGesture.active = true;
    },
    _playEmo:function(index){
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
            setTimeout(function () {
                emo.active = true;
                spine.setAnimation(0, 'animation', false);
            },1000);
        }
    },
    _playEffectGroup:function(name){
        console.log("_playEffectGroup:" + name);
        var emo = this.effectCardGroup;
        if(emo){
            var spine = emo.getComponent('sp.Skeleton');
            spine.setCompleteListener(function(trackEntry){
                spine.clearTracks();
                emo.active = false;

                // var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                // // if (animationName === 'shoot') {
                // //     this.spine.clearTrack(1);
                // // }
                // var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
                // cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
            });
            setTimeout(function () {
                emo.active = true;
                spine.setAnimation(0, name, false);
            },500);
        }
    },
    _turnOffAutoSuggest:function(){
        this.unschedule(this.autoShowSuggest);
        this.nodeSuggestGesture.active = false;
    },
    onPassAt:function(index,isNewRound){
        console.log("onPassAt:" + index);
        var cPlayer = this.players[index].getComponent(CPlayer);
        cPlayer.onPass();
        if(isNewRound){
            var cTable = this.table.getComponent(CTable);
            cTable.onNewRound();
        }
    },
    onDiscardAt:function(index,cardsOrGroup,groupType,cardExpect){
        function getCards(cardsOrGroup,cardExpect,playerPrefab){
            cc.log("getCardsDicard: " + index +"|" + cardExpect);
            var l = cardsOrGroup.length;
            if(l > 0){
                if(cardsOrGroup[0] instanceof Array){
                    for (var i = 0; i < l; i++) {
                        var cards = cardsOrGroup[i];
                        for (var j = 0; j < cards.length; j++) {
                            cc.log("isgroup:" + cardExpect +"|" + cards[j]);
                            if(cards[j].id === cardExpect.id){
                                //check xem co full card trong player
                                if(index === 0){
                                    var cPlayer = playerPrefab.getComponent(CPlayer);
                                    if(cPlayer.isContainAll(cards)){
                                        return cards;
                                    }
                                }
                            }
                        }
                    }
                    cc.error("not found card in group");
                    return cardsOrGroup[0];
                }
            }
            return cardsOrGroup;
        }
        var playerPrefab = this.players[index];
        var cards = getCards(cardsOrGroup,cardExpect,playerPrefab);
        var s = '';
        for (var i = 0; i < cards.length; i++) {
            s += " "+ cards[i];
        }
        console.log("onDiscardAt:" + index +"|"+ cardExpect + "|"+ s);
        var cTable = this.table.getComponent(CTable);
        var cardPrefabs = playerPrefab.getComponent(CPlayer).onDiscard(cards);

        var effectDiscard = function (cardPrefab) {
            //1. move den dock -> xoay lai 0 do -> nay bat ra ra 1 ti
            var cCard = cardPrefab.getComponent(CCard);
            var len = cTable.numCard;
            var index = cCard.index;

            var p = cTable.getPositionCard(cCard);
            var duration = 0.3;
            var duration1 = 0.15;
            cardPrefab.setRotation(330,0,0);
            cardPrefab.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(duration,p),
                    cc.rotateTo(duration,0),
                    cc.sequence(
                        cc.scaleTo(duration/2,1.1,1.1),
                        cc.scaleTo(duration/2,0.85,0.85)
                    )
                ),
                cc.spawn(
                    cc.scaleTo(duration1,0.90,0.90),
                    cc.moveTo(duration1,p.x+ (Math.random() * 30 * (index - (len-1)/2)),p.y + (Math.random() * 20)),
                    cc.rotateTo(duration1, (index - (len - 1)/2) * Math.random() * 8)
                )
            ));
        };
        var len = cardPrefabs.length;
        cTable.setNumCard(len);

        cc.log("imgHighLight:"  + this.zIndexCard);
        this.imgHighLight.zIndex = ++this.zIndexCard;
        this.imgHighLight.active = true;
        this.imgHighLight.opacity = 0;
        this.imgHighLight.runAction(cc.sequence(
            cc.hide(),
            cc.delayTime(0.4),
            cc.show(),
            cc.spawn(
                cc.scaleTo(0.2,1.2,1.2),
                cc.fadeIn(0.2)
            ),
            cc.scaleTo(0.2,1,1),
            cc.delayTime(1),
            cc.fadeOut(0.3),
            cc.callFunc(function (sender) {
                sender.active = false;
            },this)
        ));

        for (var k = 0; k < len; k++) {
            var cardPrefab = cardPrefabs[k];
            var cCard = cardPrefab.getComponent(CCard);
            cCard.index = (k);
            cCard.owner = cTable;
            cardPrefab.zIndex = ++ this.zIndexCard;
            cc.log("cardPrefab:"  + this.zIndexCard);

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
        cTable.addCards(cardPrefabs);


        switch (groupType) {
            case CardGroup.FLUSH:
                this._playEffectGroup('flush');
                break;
            case CardGroup.STRAIGHT:
                this._playEffectGroup('straight');
                break;
            case CardGroup.FULL_HOUSE:
                this._playEffectGroup('fullhouse');
                break;
            case CardGroup.FOUR_OF_KIND:
                this._playEffectGroup('forofakind');
                break;
            case CardGroup.NONE:
            default:
                break;
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

    setGroupExpects:function(cards){
        var groups = [];
        var lG = cards.length;
        if(lG > 0) {
            if(cards[0] instanceof Array){
                for (var g = 0; g < lG; g++) {
                    groups.push(cards[g])
                }
            }else{
                groups.push(cards);
            }
        }else {
            groups.push(cards);
        }
        this.groupExpects = groups;
    },
    isContainGroupExpects:function(card){
        var lg = this.groupExpects.length;
        for (var i = 0; i < lg; i++) {
            var cards = this.groupExpects[i];
            var lc = cards.length;
            for (var j = 0; j < lc; j++) {
                if(cards[j].id === card.id){
                    return true;
                }
            }
        }
        return false;
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
        return this.isContainGroupExpects(card);
    },
    showNodeCHPlay:function () {
        this.nodeCHPlay.active = true;
    }
});