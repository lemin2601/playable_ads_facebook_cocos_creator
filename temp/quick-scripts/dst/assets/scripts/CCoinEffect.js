
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/CCoinEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ0NvaW5FZmZlY3QuanMiXSwibmFtZXMiOlsiQ29pbkVmZmVjdCIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInJ1bm5pbmciLCJjb2xsaWRlZCIsImN0b3IiLCJncmF2aXR5IiwidHlwZSIsInNwZWVkWCIsInNwZWVkWSIsInNwZWVkUiIsImZsb29yUG9zaXRpb24iLCJWZWMyIiwib25Mb2FkIiwiQ29uc3QiLCJHUkFWSVRZIiwiVFlQRSIsIlJBSU4iLCJNYXRoIiwicmFuZG9tIiwiUkFURV9TUEVFRF9ZIiwiUkFURV9TUEVFRF9SIiwicGFyZW50Iiwibm9kZSIsImdldFBhcmVudCIsIngiLCJ3aWR0aCIsInkiLCJoZWlnaHQiLCJSQVRFX1Bvc2l0aW9uX1kiLCJzZXRQb3NpdGlvbiIsInZhbHVlUmFuIiwiTUFYX1NDQUxFIiwiTUlOX1NDQUxFIiwic2V0U2NhbGUiLCJhbmdsZSIsImFjdGl2ZSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJjdXJPcGEiLCJvcGFjaXR5IiwicG9zIiwiZ2V0UG9zaXRpb24iLCJzaXplIiwiZ2V0Q29udGVudFNpemUiLCJzY2FsZSIsImFicyIsIlJBVEVfSlVNUF9CQUNLIiwiYW5pbWF0aW9uIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsT0FBTyxFQUFDO0FBQ0osaUJBQVE7QUFESixLQWhCQTtBQW1CUkMsSUFB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RCxDQUZrRixDQUlsRjs7QUFDQSxVQUFJRyxTQUFTLEdBQUcsS0FBS0MsWUFBTCxDQUFrQm5ELEVBQUUsQ0FBQ29ELFNBQXJCLENBQWhCO0FBQ0FGLE1BQUFBLFNBQVMsQ0FBQ0csSUFBVjtBQUNBLFdBQUtqRCxPQUFMLEdBQWUsS0FBZjtBQUNIOztBQUNELFNBQUtvQixJQUFMLENBQVVrQixPQUFWLEdBQW9CRCxNQUFNLEdBQUMsR0FBUCxHQUFXLEdBQVgsR0FBZUEsTUFBbkM7QUFDQSxTQUFLakIsSUFBTCxDQUFVWSxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLFNBQUtaLElBQUwsQ0FBVU8sV0FBVixDQUFzQlksR0FBdEIsRUF4Q1EsQ0F5Q1I7QUFDSDtBQTVHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29pbkVmZmVjdCA9IHJlcXVpcmUoJ0NvaW5FZmZlY3QnKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgcnVubmluZzp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xsaWRlZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gMDtcclxuICAgICAgICB0aGlzLnR5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcclxuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZFIgPSAwO1xyXG4gICAgICAgIHRoaXMuZmxvb3JQb3NpdGlvbiA9IGNjLlZlYzIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy9raG9pIHRhbyBiYW4gZGF1XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gQ29pbkVmZmVjdC5Db25zdC5HUkFWSVRZO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IENvaW5FZmZlY3QuQ29uc3QuVFlQRS5SQUlOO1xyXG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcclxuICAgICAgICB0aGlzLnNwZWVkWSA9IE1hdGgucmFuZG9tKCkgKiBDb2luRWZmZWN0LkNvbnN0LlJBVEVfU1BFRURfWTtcclxuICAgICAgICAvLyB0aGlzLnNwZWVkUiA9IE1hdGgucmFuZG9tKCkgKiBDb2luRWZmZWN0LkNvbnN0LlJBVEVfU1BFRURfUjtcclxuICAgICAgICB0aGlzLnNwZWVkUiA9IENvaW5FZmZlY3QuQ29uc3QuUkFURV9TUEVFRF9SO1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLm5vZGUuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgaWYocGFyZW50KXtcclxuICAgICAgICAgICAgdmFyIHggPSBNYXRoLnJhbmRvbSgpICogcGFyZW50LndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHBhcmVudC5oZWlnaHQgKyB0aGlzLm5vZGUuaGVpZ2h0ICsgTWF0aC5yYW5kb20oKSAqIENvaW5FZmZlY3QuQ29uc3QuUkFURV9Qb3NpdGlvbl9ZO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oeCx5KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKDAsMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdmFsdWVSYW4gPSBNYXRoLnJhbmRvbSgpICogKENvaW5FZmZlY3QuQ29uc3QuTUFYX1NDQUxFIC0gQ29pbkVmZmVjdC5Db25zdC5NSU5fU0NBTEUpICsgQ29pbkVmZmVjdC5Db25zdC5NSU5fU0NBTEU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKHZhbHVlUmFuKTtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAtKE1hdGgucmFuZG9tKCkgKiAzNjApO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5zZXRQb3NpdGlvbigwLDApO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnJ1bm5pbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGN1ck9wYSA9IHRoaXMubm9kZS5vcGFjaXR5O1xyXG4gICAgICAgIHZhciBhbmdsZSA9IHRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgICAgY3VyT3BhICs9IDE1MDAqZHQ7XHJcbiAgICAgICAgcG9zLnggKz0gdGhpcy5zcGVlZFggKiBkdDtcclxuICAgICAgICBwb3MueSArPSB0aGlzLnNwZWVkWSAqIGR0O1xyXG4gICAgICAgIGFuZ2xlID0gYW5nbGUgKyB0aGlzLnNwZWVkUiAqIGR0O1xyXG5cclxuICAgICAgICB0aGlzLnNwZWVkWSAtPSB0aGlzLmdyYXZpdHkgKiBkdDtcclxuXHJcblxyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMubm9kZS5zY2FsZTtcclxuXHJcbiAgICAgICAgLy8ganVtcCBvbmNlIGFmdGVyIGdvaW5nIHRvIGZsb29yWVxyXG4gICAgICAgIGlmIChwb3MueSA8IHRoaXMuZmxvb3JQb3NpdGlvbi55ICYmICF0aGlzLmNvbGxpZGVkKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3BlZWRZIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZm9yY2UgdXBkYXRlIHBvc1kgdG8gZmxvb3JZXHJcbiAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMuZmxvb3JQb3NpdGlvbi55ICsgKHNpemUuaGVpZ2h0ICogMC41ICogc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSBNYXRoLmFicyh0aGlzLnNwZWVkWSkgKiAoTWF0aC5yYW5kb20oKSAqIChDb2luRWZmZWN0LkNvbnN0LlJBVEVfSlVNUF9CQUNLLTAuMykgKyAwLjMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFggPSAwLjQgKiB0aGlzLnNwZWVkWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwb3MueSAtIChzaXplLmhlaWdodCAqIDAuNSAqIHNjYWxlKSA8IHRoaXMuZmxvb3JQb3NpdGlvbi55ICYmIHRoaXMuY29sbGlkZWQpIHtcclxuICAgICAgICAgICAgLy8gZm9yY2UgdXBkYXRlIHBvc1kgdG8gZmxvb3JZXHJcbiAgICAgICAgICAgIHBvcy55ID0gdGhpcy5mbG9vclBvc2l0aW9uLnkgKyAoc2l6ZS5oZWlnaHQgKiAwLjUgKiBzY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9wIGlmIHRoaXMgaXMgYmVsb3cgZmxvb3JZXHJcbiAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBhbmltYXRpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBjdXJPcGE+MjU1PzI1NTpjdXJPcGE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zcGVlZFkgKyBKU09OLnN0cmluZ2lmeShwb3MpICsgc2NhbGUpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==