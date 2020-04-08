window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BtnDownload: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa848opgmhMQKfD6xZOvgcV", "BtnDownload");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      onTouch: function onTouch() {
        console.log("Touch Download");
        FbPlayableAd && FbPlayableAd.onCTAClick();
      }
    });
    cc._RF.pop();
  }, {} ],
  BtnStep1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d6d7ZBIxZHcYYuxM2WLEVS", "BtnStep1");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnStep2: cc.Button
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 1");
        this.node.active = false;
        this.btnStep2.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  BtnStep2: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a174h5XKVDDqPz6uctC+1/", "BtnStep2");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        btnStep3: cc.Button
      },
      onLoad: function onLoad() {
        this.node.active = false;
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 2");
        this.node.active = false;
        this.btnStep3.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  BtnStep3: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb4b83rgAhPLYZOZ/FJGXMT", "BtnStep3");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.active = false;
      },
      start: function start() {},
      onTouch: function onTouch() {
        console.log("touch step 3");
        FbPlayableAd && FbPlayableAd.onCTAClick();
      }
    });
    cc._RF.pop();
  }, {} ],
  FirstComp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4169dlAnhdA1a5TMiiU6TQl", "FirstComp");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      return new Blob([ u8arr ], {
        type: mime
      });
    }
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {
        var arrayBufferHandler = function(item, callback) {
          var data = window.resMap[item.url];
          callback(null, dataURLtoBlob(data));
        };
        var jsonBufferHandler = function(item, callback) {
          var str = window.resMap[item.url];
          callback(null, str);
        };
        cc.loader.addDownloadHandlers({
          png: arrayBufferHandler
        });
        cc.loader.addDownloadHandlers({
          json: jsonBufferHandler
        });
      };
      NewClass.prototype.onLoad = function() {
        cc.director.loadScene("helloworld");
        var image = new Image();
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Helloworld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b90/rohdEk4SdmmEZANaD", "Helloworld");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Helloworld = function(_super) {
      __extends(Helloworld, _super);
      function Helloworld() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      Helloworld.prototype.start = function() {
        this.label.string = this.text;
      };
      __decorate([ property(cc.Label) ], Helloworld.prototype, "label", void 0);
      __decorate([ property ], Helloworld.prototype, "text", void 0);
      Helloworld = __decorate([ ccclass ], Helloworld);
      return Helloworld;
    }(cc.Component);
    exports.default = Helloworld;
    cc._RF.pop();
  }, {} ],
  "use_v2.0.x_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe3beTJ7JpC+onOsVF/3MEf", "use_v2.0.x_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_check = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "BtnDownload", "BtnStep1", "BtnStep2", "BtnStep3", "FirstComp", "Helloworld", "use_v2.0.x_cc.Toggle_event" ]);