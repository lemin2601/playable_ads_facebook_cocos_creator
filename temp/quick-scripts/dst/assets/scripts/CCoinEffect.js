
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0NDb2luRWZmZWN0LmpzIl0sIm5hbWVzIjpbIkNvaW5FZmZlY3QiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJydW5uaW5nIiwiY29sbGlkZWQiLCJjdG9yIiwiZ3Jhdml0eSIsInR5cGUiLCJzcGVlZFgiLCJzcGVlZFkiLCJzcGVlZFIiLCJmbG9vclBvc2l0aW9uIiwiVmVjMiIsIm9uTG9hZCIsIkNvbnN0IiwiR1JBVklUWSIsIlRZUEUiLCJSQUlOIiwiTWF0aCIsInJhbmRvbSIsIlJBVEVfU1BFRURfWSIsIlJBVEVfU1BFRURfUiIsInBhcmVudCIsIm5vZGUiLCJnZXRQYXJlbnQiLCJ4Iiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwiUkFURV9Qb3NpdGlvbl9ZIiwic2V0UG9zaXRpb24iLCJ2YWx1ZVJhbiIsIk1BWF9TQ0FMRSIsIk1JTl9TQ0FMRSIsInNldFNjYWxlIiwiYW5nbGUiLCJhY3RpdmUiLCJzdGFydCIsInVwZGF0ZSIsImR0IiwiY3VyT3BhIiwib3BhY2l0eSIsInBvcyIsImdldFBvc2l0aW9uIiwic2l6ZSIsImdldENvbnRlbnRTaXplIiwic2NhbGUiLCJhYnMiLCJSQVRFX0pVTVBfQkFDSyIsImFuaW1hdGlvbiIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInN0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRO0FBREosS0FoQkE7QUFtQlJDLElBQUFBLFFBQVEsRUFBQztBQUNMLGlCQUFRO0FBREg7QUFuQkQsR0FIUDtBQTJCTEMsRUFBQUEsSUFBSSxFQUFDLGdCQUFVO0FBQ1gsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGFBQUwsR0FBcUJaLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLENBQXJCO0FBQ0EsU0FBS1QsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsR0FwQ0k7QUFxQ0xTLEVBQUFBLE1BckNLLG9CQXFDSztBQUNOO0FBQ0EsU0FBS1AsT0FBTCxHQUFlVCxVQUFVLENBQUNpQixLQUFYLENBQWlCQyxPQUFoQztBQUNBLFNBQUtSLElBQUwsR0FBWVYsVUFBVSxDQUFDaUIsS0FBWCxDQUFpQkUsSUFBakIsQ0FBc0JDLElBQWxDO0FBQ0EsU0FBS1QsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWNTLElBQUksQ0FBQ0MsTUFBTCxLQUFnQnRCLFVBQVUsQ0FBQ2lCLEtBQVgsQ0FBaUJNLFlBQS9DLENBTE0sQ0FNTjs7QUFDQSxTQUFLVixNQUFMLEdBQWNiLFVBQVUsQ0FBQ2lCLEtBQVgsQ0FBaUJPLFlBQS9CO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFiOztBQUNBLFFBQUdGLE1BQUgsRUFBVTtBQUNOLFVBQUlHLENBQUMsR0FBR1AsSUFBSSxDQUFDQyxNQUFMLEtBQWdCRyxNQUFNLENBQUNJLEtBQS9CO0FBQ0EsVUFBSUMsQ0FBQyxHQUFHTCxNQUFNLENBQUNNLE1BQVAsR0FBZ0IsS0FBS0wsSUFBTCxDQUFVSyxNQUExQixHQUFtQ1YsSUFBSSxDQUFDQyxNQUFMLEtBQWdCdEIsVUFBVSxDQUFDaUIsS0FBWCxDQUFpQmUsZUFBNUU7QUFDQSxXQUFLTixJQUFMLENBQVVPLFdBQVYsQ0FBc0JMLENBQXRCLEVBQXdCRSxDQUF4QjtBQUNILEtBSkQsTUFJSztBQUNELFdBQUtKLElBQUwsQ0FBVU8sV0FBVixDQUFzQixDQUF0QixFQUF3QixDQUF4QjtBQUNIOztBQUVELFFBQUlDLFFBQVEsR0FBR2IsSUFBSSxDQUFDQyxNQUFMLE1BQWlCdEIsVUFBVSxDQUFDaUIsS0FBWCxDQUFpQmtCLFNBQWpCLEdBQTZCbkMsVUFBVSxDQUFDaUIsS0FBWCxDQUFpQm1CLFNBQS9ELElBQTRFcEMsVUFBVSxDQUFDaUIsS0FBWCxDQUFpQm1CLFNBQTVHO0FBQ0EsU0FBS1YsSUFBTCxDQUFVVyxRQUFWLENBQW1CSCxRQUFuQjtBQUNBLFNBQUtSLElBQUwsQ0FBVVksS0FBVixHQUFrQixFQUFFakIsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQWxCLENBQWxCO0FBQ0EsU0FBS0ksSUFBTCxDQUFVYSxNQUFWLEdBQW1CLEtBQW5CLENBcEJNLENBcUJOO0FBQ0E7QUFDSCxHQTVESTtBQThETEMsRUFBQUEsS0E5REssbUJBOERJLENBQ0w7QUFDSCxHQWhFSTtBQWtFTEMsRUFBQUEsTUFsRUssa0JBa0VHQyxFQWxFSCxFQWtFTztBQUNSLFFBQUcsQ0FBQyxLQUFLcEMsT0FBVCxFQUFrQjtBQUVsQixRQUFJcUMsTUFBTSxHQUFHLEtBQUtqQixJQUFMLENBQVVrQixPQUF2QjtBQUNBLFFBQUlOLEtBQUssR0FBRyxLQUFLWixJQUFMLENBQVVZLEtBQXRCO0FBQ0EsUUFBSU8sR0FBRyxHQUFHLEtBQUtuQixJQUFMLENBQVVvQixXQUFWLEVBQVY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS3JCLElBQUwsQ0FBVXNCLGNBQVYsRUFBWDtBQUVBTCxJQUFBQSxNQUFNLElBQUksT0FBS0QsRUFBZjtBQUNBRyxJQUFBQSxHQUFHLENBQUNqQixDQUFKLElBQVMsS0FBS2pCLE1BQUwsR0FBYytCLEVBQXZCO0FBQ0FHLElBQUFBLEdBQUcsQ0FBQ2YsQ0FBSixJQUFTLEtBQUtsQixNQUFMLEdBQWM4QixFQUF2QjtBQUNBSixJQUFBQSxLQUFLLEdBQUdBLEtBQUssR0FBRyxLQUFLekIsTUFBTCxHQUFjNkIsRUFBOUI7QUFFQSxTQUFLOUIsTUFBTCxJQUFlLEtBQUtILE9BQUwsR0FBZWlDLEVBQTlCO0FBR0EsUUFBSU8sS0FBSyxHQUFHLEtBQUt2QixJQUFMLENBQVV1QixLQUF0QixDQWhCUSxDQWtCUjs7QUFDQSxRQUFJSixHQUFHLENBQUNmLENBQUosR0FBUSxLQUFLaEIsYUFBTCxDQUFtQmdCLENBQTNCLElBQWdDLENBQUMsS0FBS3ZCLFFBQTFDLEVBQW9EO0FBQ2hELFVBQUcsS0FBS0ssTUFBTCxHQUFjLENBQWpCLEVBQW9CO0FBQ2hCO0FBQ0FpQyxRQUFBQSxHQUFHLENBQUNmLENBQUosR0FBUSxLQUFLaEIsYUFBTCxDQUFtQmdCLENBQW5CLEdBQXdCaUIsSUFBSSxDQUFDaEIsTUFBTCxHQUFjLEdBQWQsR0FBb0JrQixLQUFwRDtBQUVBLGFBQUsxQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0ssTUFBTCxHQUFjUyxJQUFJLENBQUM2QixHQUFMLENBQVMsS0FBS3RDLE1BQWQsS0FBeUJTLElBQUksQ0FBQ0MsTUFBTCxNQUFpQnRCLFVBQVUsQ0FBQ2lCLEtBQVgsQ0FBaUJrQyxjQUFqQixHQUFnQyxHQUFqRCxJQUF3RCxHQUFqRixDQUFkO0FBQ0EsYUFBS3hDLE1BQUwsR0FBYyxNQUFNLEtBQUtBLE1BQXpCO0FBQ0g7QUFDSixLQVRELE1BVUssSUFBSWtDLEdBQUcsQ0FBQ2YsQ0FBSixHQUFTaUIsSUFBSSxDQUFDaEIsTUFBTCxHQUFjLEdBQWQsR0FBb0JrQixLQUE3QixHQUFzQyxLQUFLbkMsYUFBTCxDQUFtQmdCLENBQXpELElBQThELEtBQUt2QixRQUF2RSxFQUFpRjtBQUNsRjtBQUNBc0MsTUFBQUEsR0FBRyxDQUFDZixDQUFKLEdBQVEsS0FBS2hCLGFBQUwsQ0FBbUJnQixDQUFuQixHQUF3QmlCLElBQUksQ0FBQ2hCLE1BQUwsR0FBYyxHQUFkLEdBQW9Ca0IsS0FBcEQsQ0FGa0YsQ0FJbEY7O0FBQ0EsVUFBSUcsU0FBUyxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JuRCxFQUFFLENBQUNvRCxTQUFyQixDQUFoQjtBQUNBRixNQUFBQSxTQUFTLENBQUNHLElBQVY7QUFDQSxXQUFLakQsT0FBTCxHQUFlLEtBQWY7QUFDSDs7QUFDRCxTQUFLb0IsSUFBTCxDQUFVa0IsT0FBVixHQUFvQkQsTUFBTSxHQUFDLEdBQVAsR0FBVyxHQUFYLEdBQWVBLE1BQW5DO0FBQ0EsU0FBS2pCLElBQUwsQ0FBVVksS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxTQUFLWixJQUFMLENBQVVPLFdBQVYsQ0FBc0JZLEdBQXRCLEVBeENRLENBeUNSO0FBQ0g7QUE1R0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIENvaW5FZmZlY3QgPSByZXF1aXJlKCdDb2luRWZmZWN0Jyk7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIHJ1bm5pbmc6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OmZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sbGlkZWQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OmZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gMDtcclxuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWRSID0gMDtcclxuICAgICAgICB0aGlzLmZsb29yUG9zaXRpb24gPSBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZWQgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8va2hvaSB0YW8gYmFuIGRhdVxyXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IENvaW5FZmZlY3QuQ29uc3QuR1JBVklUWTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBDb2luRWZmZWN0LkNvbnN0LlRZUEUuUkFJTjtcclxuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZFkgPSBNYXRoLnJhbmRvbSgpICogQ29pbkVmZmVjdC5Db25zdC5SQVRFX1NQRUVEX1k7XHJcbiAgICAgICAgLy8gdGhpcy5zcGVlZFIgPSBNYXRoLnJhbmRvbSgpICogQ29pbkVmZmVjdC5Db25zdC5SQVRFX1NQRUVEX1I7XHJcbiAgICAgICAgdGhpcy5zcGVlZFIgPSBDb2luRWZmZWN0LkNvbnN0LlJBVEVfU1BFRURfUjtcclxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5ub2RlLmdldFBhcmVudCgpO1xyXG4gICAgICAgIGlmKHBhcmVudCl7XHJcbiAgICAgICAgICAgIHZhciB4ID0gTWF0aC5yYW5kb20oKSAqIHBhcmVudC53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHkgPSBwYXJlbnQuaGVpZ2h0ICsgdGhpcy5ub2RlLmhlaWdodCArIE1hdGgucmFuZG9tKCkgKiBDb2luRWZmZWN0LkNvbnN0LlJBVEVfUG9zaXRpb25fWTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHgseSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbigwLDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHZhbHVlUmFuID0gTWF0aC5yYW5kb20oKSAqIChDb2luRWZmZWN0LkNvbnN0Lk1BWF9TQ0FMRSAtIENvaW5FZmZlY3QuQ29uc3QuTUlOX1NDQUxFKSArIENvaW5FZmZlY3QuQ29uc3QuTUlOX1NDQUxFO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZSh2YWx1ZVJhbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gLShNYXRoLnJhbmRvbSgpICogMzYwKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuc2V0UG9zaXRpb24oMCwwKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8vIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBjdXJPcGEgPSB0aGlzLm5vZGUub3BhY2l0eTtcclxuICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLm5vZGUuYW5nbGU7XHJcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciBzaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcblxyXG4gICAgICAgIGN1ck9wYSArPSAxNTAwKmR0O1xyXG4gICAgICAgIHBvcy54ICs9IHRoaXMuc3BlZWRYICogZHQ7XHJcbiAgICAgICAgcG9zLnkgKz0gdGhpcy5zcGVlZFkgKiBkdDtcclxuICAgICAgICBhbmdsZSA9IGFuZ2xlICsgdGhpcy5zcGVlZFIgKiBkdDtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZFkgLT0gdGhpcy5ncmF2aXR5ICogZHQ7XHJcblxyXG5cclxuICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLm5vZGUuc2NhbGU7XHJcblxyXG4gICAgICAgIC8vIGp1bXAgb25jZSBhZnRlciBnb2luZyB0byBmbG9vcllcclxuICAgICAgICBpZiAocG9zLnkgPCB0aGlzLmZsb29yUG9zaXRpb24ueSAmJiAhdGhpcy5jb2xsaWRlZCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNwZWVkWSA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBwb3NZIHRvIGZsb29yWVxyXG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmZsb29yUG9zaXRpb24ueSArIChzaXplLmhlaWdodCAqIDAuNSAqIHNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gTWF0aC5hYnModGhpcy5zcGVlZFkpICogKE1hdGgucmFuZG9tKCkgKiAoQ29pbkVmZmVjdC5Db25zdC5SQVRFX0pVTVBfQkFDSy0wLjMpICsgMC4zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWRYID0gMC40ICogdGhpcy5zcGVlZFg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9zLnkgLSAoc2l6ZS5oZWlnaHQgKiAwLjUgKiBzY2FsZSkgPCB0aGlzLmZsb29yUG9zaXRpb24ueSAmJiB0aGlzLmNvbGxpZGVkKSB7XHJcbiAgICAgICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBwb3NZIHRvIGZsb29yWVxyXG4gICAgICAgICAgICBwb3MueSA9IHRoaXMuZmxvb3JQb3NpdGlvbi55ICsgKHNpemUuaGVpZ2h0ICogMC41ICogc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcCBpZiB0aGlzIGlzIGJlbG93IGZsb29yWVxyXG4gICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gY3VyT3BhPjI1NT8yNTU6Y3VyT3BhO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3BlZWRZICsgSlNPTi5zdHJpbmdpZnkocG9zKSArIHNjYWxlKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=