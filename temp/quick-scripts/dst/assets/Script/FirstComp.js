
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/FirstComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4169dlAnhdA1a5TMiiU6TQl', 'FirstComp');
// Script/FirstComp.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        // web加载数据方法
        var arrayBufferHandler = function (item, callback) {
            var data = window.resMap[item.url];
            callback(null, dataURLtoBlob(data));
        };
        // web加载数据方法
        var jsonBufferHandler = function (item, callback) {
            var str = window.resMap[item.url];
            callback(null, str);
        };
        // 添加加载函数
        cc.loader.addDownloadHandlers({
            png: arrayBufferHandler,
        });
        cc.loader.addDownloadHandlers({
            json: jsonBufferHandler,
        });
    };
    NewClass.prototype.onLoad = function () {
        cc.director.loadScene("helloworld");
        var image = new Image();
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxGaXJzdENvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixpRkFBaUY7QUFDakYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiwyRkFBMkY7QUFDM0YsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5QiwyRkFBMkY7QUFDM0YsbUdBQW1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbkcsU0FBUyxhQUFhLENBQUMsT0FBTztJQUMxQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxPQUFNLENBQUMsRUFBRSxFQUFDO1FBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUssSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDs7SUFrQ0EsQ0FBQztJQWpDRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLHdCQUFLLEdBQUw7UUFDSSxZQUFZO1FBQ1osSUFBSSxrQkFBa0IsR0FBRyxVQUFDLElBQUksRUFBRSxRQUFRO1lBQ3BDLElBQUksSUFBSSxHQUFJLE1BQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDO1FBRUYsWUFBWTtRQUNaLElBQUksaUJBQWlCLEdBQUcsVUFBQyxJQUFJLEVBQUUsUUFBUTtZQUNuQyxJQUFJLEdBQUcsR0FBSSxNQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQztRQUVGLFNBQVM7UUFDVCxFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQzFCLEdBQUcsRUFBRSxrQkFBa0I7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUMxQixJQUFJLEVBQUUsaUJBQWlCO1NBQzFCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5QkFBTSxHQUFOO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBL0JnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBa0M1QjtJQUFELGVBQUM7Q0FsQ0QsQUFrQ0MsQ0FsQ3FDLEVBQUUsQ0FBQyxTQUFTLEdBa0NqRDtrQkFsQ29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5mdW5jdGlvbiBkYXRhVVJMdG9CbG9iKGRhdGF1cmwpIHtcbiAgICB2YXIgYXJyID0gZGF0YXVybC5zcGxpdCgnLCcpLCBtaW1lID0gYXJyWzBdLm1hdGNoKC86KC4qPyk7LylbMV0sXG4gICAgYnN0ciA9IGF0b2IoZGF0YXVybCksIG4gPSBic3RyLmxlbmd0aCwgdThhcnIgPSBuZXcgVWludDhBcnJheShuKTtcbiAgICB3aGlsZShuLS0pe1xuICAgICAgdThhcnJbbl0gPSBic3RyLmNoYXJDb2RlQXQobik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmxvYihbdThhcnJdLCB7dHlwZTptaW1lfSk7XG59XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vIHdlYuWKoOi9veaVsOaNruaWueazlVxuICAgICAgICBsZXQgYXJyYXlCdWZmZXJIYW5kbGVyID0gKGl0ZW0sIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9ICh3aW5kb3cgYXMgYW55KS5yZXNNYXBbaXRlbS51cmxdO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YVVSTHRvQmxvYihkYXRhKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gd2Vi5Yqg6L295pWw5o2u5pa55rOVXG4gICAgICAgIGxldCBqc29uQnVmZmVySGFuZGxlciA9IChpdGVtLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ciA9ICh3aW5kb3cgYXMgYW55KS5yZXNNYXBbaXRlbS51cmxdO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RyKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDmt7vliqDliqDovb3lh73mlbBcbiAgICAgICAgY2MubG9hZGVyLmFkZERvd25sb2FkSGFuZGxlcnMoe1xuICAgICAgICAgICAgcG5nOiBhcnJheUJ1ZmZlckhhbmRsZXIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNjLmxvYWRlci5hZGREb3dubG9hZEhhbmRsZXJzKHtcbiAgICAgICAgICAgIGpzb246IGpzb25CdWZmZXJIYW5kbGVyLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImhlbGxvd29ybGRcIik7XG4gICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59Il19