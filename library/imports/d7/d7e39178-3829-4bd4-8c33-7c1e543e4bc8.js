"use strict";
cc._RF.push(module, 'd7e39F4OClL1IwzfB5UPkvI', 'PlayableState');
// scripts/PlayableState.js

"use strict";

var StateMachine = require('state-machine');

var visualize = require('state-machine-visualize');

var Transition = cc.Enum({
  PLAY: "play",
  ACTION1: "action1",
  ACTION2: 'action2',
  ACTION3: 'action3'
});
var State = cc.Enum({
  IDLE: "idle",
  STEP1: "step1",
  STEP2: "step2",
  STEP3: 'step3',
  FINISH: "finish"
});
var PlayableState = cc.Class({
  properties: {
    fsm: {
      "default": null,
      type: StateMachine,
      serializable: false,
      visible: false
    }
  },
  ctor: function ctor() {},
  load: function load() {
    this.fsm = new StateMachine({
      init: State.IDLE,
      transitions: [{
        name: Transition.PLAY,
        from: State.IDLE,
        to: State.STEP1
      }, {
        name: Transition.ACTION1,
        from: State.STEP1,
        to: State.STEP2
      }, {
        name: Transition.ACTION2,
        from: State.STEP2,
        to: State.STEP3
      }, {
        name: Transition.ACTION3,
        from: State.STEP3,
        to: State.FINISH
      }],
      methods: {
        onInvalidTransition: function onInvalidTransition(transition, from, to) {
          console.error("onInvalidTransition");
        },
        onPendingTransition: function onPendingTransition(transition, from, to) {
          console.error("onPendingTransition");
        },
        onBeforeMelt: function onBeforeMelt() {
          console.log('onEnter melted');
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              console.log('onEnter melted done');
              reject("abc");
            }, 200);
          });
        },
        onMelt: function onMelt() {
          console.log('I melted');
        },
        onFreeze: function onFreeze() {
          console.log('I froze');
        },
        onVaporize: function onVaporize() {
          console.log('I vaporized');
        },
        onCondense: function onCondense() {
          console.log('I condensed');
        }
      }
    });
    console.log("before" + this.fsm.state);

    try {
      this.fsm.melt();
    } catch (e) {
      console.log("catch day nef");
    }

    console.log("after" + this.fsm.state);
    setTimeout(function () {
      console.log("after1" + this.fsm.state);
      console.log(this.fsm.state);
    }.bind(this), 500);
    setTimeout(function () {
      console.log("continue meltd");
      this.fsm.melt(); // console.log("freeeze");
      // this.fsm.freeze();

      console.log(this.fsm.state);
    }.bind(this), 1000);
    this.fsm.freeze();
    console.log(this.fsm.state);
    console.log(visualize(this.fsm));
  }
});

cc._RF.pop();