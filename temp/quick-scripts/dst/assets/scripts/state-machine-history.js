
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/state-machine-history.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6bd92evp1ZJZ6xCHMU25nST', 'state-machine-history');
// scripts/state-machine-history.js

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("StateMachineHistory", [], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["StateMachineHistory"] = factory();else root["StateMachineHistory"] = factory();
})(void 0, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // identity function for calling harmony imports with the correct context

      /******/

      __webpack_require__.i = function (value) {
        return value;
      };
      /******/

      /******/
      // define getter function for harmony exports

      /******/


      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 1);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      function camelize(label) {
        if (label.length === 0) return label;
        var n,
            result,
            word,
            words = label.split(/[_-]/); // single word with first character already lowercase, return untouched

        if (words.length === 1 && words[0][0].toLowerCase() === words[0][0]) return label;
        result = words[0].toLowerCase();

        for (n = 1; n < words.length; n++) {
          result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
        }

        return result;
      } //-------------------------------------------------------------------------------------------------


      camelize.prepended = function (prepend, label) {
        label = camelize(label);
        return prepend + label[0].toUpperCase() + label.substring(1);
      }; //-------------------------------------------------------------------------------------------------


      module.exports = camelize;
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      var camelize = __webpack_require__(0); //-------------------------------------------------------------------------------------------------


      module.exports = function (options) {
        options = options || {};
        var past = camelize(options.name || options.past || 'history'),
            future = camelize(options.future || 'future'),
            clear = camelize.prepended('clear', past),
            back = camelize.prepended(past, 'back'),
            forward = camelize.prepended(past, 'forward'),
            canBack = camelize.prepended('can', back),
            canForward = camelize.prepended('can', forward),
            max = options.max;
        var plugin = {
          configure: function configure(config) {
            config.addTransitionLifecycleNames(back);
            config.addTransitionLifecycleNames(forward);
          },
          init: function init(instance) {
            instance[past] = [];
            instance[future] = [];
          },
          lifecycle: function lifecycle(instance, _lifecycle) {
            if (_lifecycle.event === 'onEnterState') {
              instance[past].push(_lifecycle.to);
              if (max && instance[past].length > max) instance[past].shift();
              if (_lifecycle.transition !== back && _lifecycle.transition !== forward) instance[future].length = 0;
            }
          },
          methods: {},
          properties: {}
        };

        plugin.methods[clear] = function () {
          this[past].length = 0;
          this[future].length = 0;
        };

        plugin.properties[canBack] = {
          get: function get() {
            return this[past].length > 1;
          }
        };
        plugin.properties[canForward] = {
          get: function get() {
            return this[future].length > 0;
          }
        };

        plugin.methods[back] = function () {
          if (!this[canBack]) throw Error('no history');
          var from = this[past].pop(),
              to = this[past].pop();
          this[future].push(from);

          this._fsm.transit(back, from, to, []);
        };

        plugin.methods[forward] = function () {
          if (!this[canForward]) throw Error('no history');
          var from = this.state,
              to = this[future].pop();

          this._fsm.transit(forward, from, to, []);
        };

        return plugin;
      };
      /***/

    }
    /******/
    ])
  );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhdGUtbWFjaGluZS1oaXN0b3J5LmpzIl0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpIiwibCIsImNhbGwiLCJtIiwiYyIsInZhbHVlIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImNhbWVsaXplIiwibGFiZWwiLCJsZW5ndGgiLCJyZXN1bHQiLCJ3b3JkIiwid29yZHMiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJwcmVwZW5kZWQiLCJwcmVwZW5kIiwib3B0aW9ucyIsInBhc3QiLCJmdXR1cmUiLCJjbGVhciIsImJhY2siLCJmb3J3YXJkIiwiY2FuQmFjayIsImNhbkZvcndhcmQiLCJtYXgiLCJwbHVnaW4iLCJjb25maWd1cmUiLCJjb25maWciLCJhZGRUcmFuc2l0aW9uTGlmZWN5Y2xlTmFtZXMiLCJpbml0IiwiaW5zdGFuY2UiLCJsaWZlY3ljbGUiLCJldmVudCIsInB1c2giLCJ0byIsInNoaWZ0IiwidHJhbnNpdGlvbiIsIm1ldGhvZHMiLCJwcm9wZXJ0aWVzIiwiRXJyb3IiLCJmcm9tIiwicG9wIiwiX2ZzbSIsInRyYW5zaXQiLCJzdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLENBQUMs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UUEsZUFBT1QsTUFBUDtBQUVELE9BMUVEO0FBNkVBOztBQUFPO0FBQ1A7QUFuSVUsS0FwRU07QUFBaEI7QUF3TUMsQ0FsTkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiU3RhdGVNYWNoaW5lSGlzdG9yeVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTdGF0ZU1hY2hpbmVIaXN0b3J5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN0YXRlTWFjaGluZUhpc3RvcnlcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNhbWVsaXplKGxhYmVsKSB7XG5cbiAgaWYgKGxhYmVsLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gbGFiZWw7XG5cbiAgdmFyIG4sIHJlc3VsdCwgd29yZCwgd29yZHMgPSBsYWJlbC5zcGxpdCgvW18tXS8pO1xuXG4gIC8vIHNpbmdsZSB3b3JkIHdpdGggZmlyc3QgY2hhcmFjdGVyIGFscmVhZHkgbG93ZXJjYXNlLCByZXR1cm4gdW50b3VjaGVkXG4gIGlmICgod29yZHMubGVuZ3RoID09PSAxKSAmJiAod29yZHNbMF1bMF0udG9Mb3dlckNhc2UoKSA9PT0gd29yZHNbMF1bMF0pKVxuICAgIHJldHVybiBsYWJlbDtcblxuICByZXN1bHQgPSB3b3Jkc1swXS50b0xvd2VyQ2FzZSgpO1xuICBmb3IobiA9IDEgOyBuIDwgd29yZHMubGVuZ3RoIDsgbisrKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgd29yZHNbbl0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tuXS5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jYW1lbGl6ZS5wcmVwZW5kZWQgPSBmdW5jdGlvbihwcmVwZW5kLCBsYWJlbCkge1xuICBsYWJlbCA9IGNhbWVsaXplKGxhYmVsKTtcbiAgcmV0dXJuIHByZXBlbmQgKyBsYWJlbFswXS50b1VwcGVyQ2FzZSgpICsgbGFiZWwuc3Vic3RyaW5nKDEpO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZTtcblxuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjYW1lbGl6ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHsgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHBhc3QgICAgICAgPSBjYW1lbGl6ZShvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5wYXN0ICAgfHwgJ2hpc3RvcnknKSxcbiAgICAgIGZ1dHVyZSAgICAgPSBjYW1lbGl6ZSggICAgICAgICAgICAgICAgb3B0aW9ucy5mdXR1cmUgfHwgJ2Z1dHVyZScpLFxuICAgICAgY2xlYXIgICAgICA9IGNhbWVsaXplLnByZXBlbmRlZCgnY2xlYXInLCBwYXN0KSxcbiAgICAgIGJhY2sgICAgICAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQocGFzdCwgICAnYmFjaycpLFxuICAgICAgZm9yd2FyZCAgICA9IGNhbWVsaXplLnByZXBlbmRlZChwYXN0LCAgICdmb3J3YXJkJyksXG4gICAgICBjYW5CYWNrICAgID0gY2FtZWxpemUucHJlcGVuZGVkKCdjYW4nLCAgIGJhY2spLFxuICAgICAgY2FuRm9yd2FyZCA9IGNhbWVsaXplLnByZXBlbmRlZCgnY2FuJywgICBmb3J3YXJkKSxcbiAgICAgIG1heCAgICAgICAgPSBvcHRpb25zLm1heDtcblxuICB2YXIgcGx1Z2luID0ge1xuXG4gICAgY29uZmlndXJlOiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgIGNvbmZpZy5hZGRUcmFuc2l0aW9uTGlmZWN5Y2xlTmFtZXMoYmFjayk7XG4gICAgICBjb25maWcuYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzKGZvcndhcmQpO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgICAgaW5zdGFuY2VbcGFzdF0gICA9IFtdO1xuICAgICAgaW5zdGFuY2VbZnV0dXJlXSA9IFtdO1xuICAgIH0sXG5cbiAgICBsaWZlY3ljbGU6IGZ1bmN0aW9uKGluc3RhbmNlLCBsaWZlY3ljbGUpIHtcbiAgICAgIGlmIChsaWZlY3ljbGUuZXZlbnQgPT09ICdvbkVudGVyU3RhdGUnKSB7XG4gICAgICAgIGluc3RhbmNlW3Bhc3RdLnB1c2gobGlmZWN5Y2xlLnRvKTtcbiAgICAgICAgaWYgKG1heCAmJiBpbnN0YW5jZVtwYXN0XS5sZW5ndGggPiBtYXgpXG4gICAgICAgICAgaW5zdGFuY2VbcGFzdF0uc2hpZnQoKTtcbiAgICAgICAgaWYgKGxpZmVjeWNsZS50cmFuc2l0aW9uICE9PSBiYWNrICYmIGxpZmVjeWNsZS50cmFuc2l0aW9uICE9PSBmb3J3YXJkKVxuICAgICAgICAgIGluc3RhbmNlW2Z1dHVyZV0ubGVuZ3RoID0gMDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbWV0aG9kczogICAge30sXG4gICAgcHJvcGVydGllczoge31cblxuICB9XG5cbiAgcGx1Z2luLm1ldGhvZHNbY2xlYXJdID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1twYXN0XS5sZW5ndGggPSAwXG4gICAgdGhpc1tmdXR1cmVdLmxlbmd0aCA9IDBcbiAgfVxuXG4gIHBsdWdpbi5wcm9wZXJ0aWVzW2NhbkJhY2tdID0ge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1twYXN0XS5sZW5ndGggPiAxXG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLnByb3BlcnRpZXNbY2FuRm9yd2FyZF0gPSB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzW2Z1dHVyZV0ubGVuZ3RoID4gMFxuICAgIH1cbiAgfVxuXG4gIHBsdWdpbi5tZXRob2RzW2JhY2tdID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzW2NhbkJhY2tdKVxuICAgICAgdGhyb3cgRXJyb3IoJ25vIGhpc3RvcnknKTtcbiAgICB2YXIgZnJvbSA9IHRoaXNbcGFzdF0ucG9wKCksXG4gICAgICAgIHRvICAgPSB0aGlzW3Bhc3RdLnBvcCgpO1xuICAgIHRoaXNbZnV0dXJlXS5wdXNoKGZyb20pO1xuICAgIHRoaXMuX2ZzbS50cmFuc2l0KGJhY2ssIGZyb20sIHRvLCBbXSk7XG4gIH1cblxuICBwbHVnaW4ubWV0aG9kc1tmb3J3YXJkXSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpc1tjYW5Gb3J3YXJkXSlcbiAgICAgIHRocm93IEVycm9yKCdubyBoaXN0b3J5Jyk7XG4gICAgdmFyIGZyb20gPSB0aGlzLnN0YXRlLFxuICAgICAgICB0byA9IHRoaXNbZnV0dXJlXS5wb3AoKTtcbiAgICB0aGlzLl9mc20udHJhbnNpdChmb3J3YXJkLCBmcm9tLCB0bywgW10pO1xuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcblxufVxuXG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pOyJdfQ==