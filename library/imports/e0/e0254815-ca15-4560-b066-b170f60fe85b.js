"use strict";
cc._RF.push(module, 'e0254gVyhVFYLBmsXD2D+hb', 'CCoinEffect');
// scripts/CCoinEffect.js

"use strict";

var CoinEffect = require('CoinEffect');

cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
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
    running: {
      "default": false
    },
    collided: {
      "default": false
    }
  },
  ctor: function ctor() {
    this.gravity = 0;
    this.type = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedR = 0;
    this.floorPosition = cc.Vec2(0, 0);
    this.running = false;
    this.collided = false;
  },
  onLoad: function onLoad() {
    //khoi tao ban dau
    this.gravity = CoinEffect.Const.GRAVITY;
    this.type = CoinEffect.Const.TYPE.RAIN;
    this.speedX = 0;
    this.speedY = Math.random() * CoinEffect.Const.RATE_SPEED_Y; // this.speedR = Math.random() * CoinEffect.Const.RATE_SPEED_R;

    this.speedR = CoinEffect.Const.RATE_SPEED_R;
    var parent = this.node.getParent();

    if (parent) {
      var x = Math.random() * parent.width;
      var y = parent.height + this.node.height + Math.random() * CoinEffect.Const.RATE_Position_Y;
      this.node.setPosition(x, y);
    } else {
      this.node.setPosition(0, 0);
    }

    var valueRan = Math.random() * (CoinEffect.Const.MAX_SCALE - CoinEffect.Const.MIN_SCALE) + CoinEffect.Const.MIN_SCALE;
    this.node.setScale(valueRan);
    this.node.angle = -(Math.random() * 360);
    this.node.active = false; // this.active = false;
    // this.node.setPosition(0,0);
  },
  start: function start() {// this.running = true;
  },
  update: function update(dt) {
    if (!this.running) return;
    var curOpa = this.node.opacity;
    var angle = this.node.angle;
    var pos = this.node.getPosition();
    var size = this.node.getContentSize();
    curOpa += 1500 * dt;
    pos.x += this.speedX * dt;
    pos.y += this.speedY * dt;
    angle = angle + this.speedR * dt;
    this.speedY -= this.gravity * dt;
    var scale = this.node.scale; // jump once after going to floorY

    if (pos.y < this.floorPosition.y && !this.collided) {
      if (this.speedY < 0) {
        // force update posY to floorY
        pos.y = this.floorPosition.y + size.height * 0.5 * scale;
        this.collided = true;
        this.speedY = Math.abs(this.speedY) * (Math.random() * (CoinEffect.Const.RATE_JUMP_BACK - 0.3) + 0.3);
        this.speedX = 0.4 * this.speedX;
      }
    } else if (pos.y - size.height * 0.5 * scale < this.floorPosition.y && this.collided) {
      // force update posY to floorY
      pos.y = this.floorPosition.y + size.height * 0.5 * scale; // stop if this is below floorY

      var animation = this.getComponent(cc.Animation);
      animation.stop();
      this.running = false;
    }

    this.node.opacity = curOpa > 255 ? 255 : curOpa;
    this.node.angle = angle;
    this.node.setPosition(pos); // console.log(this.speedY + JSON.stringify(pos) + scale);
  }
});

cc._RF.pop();