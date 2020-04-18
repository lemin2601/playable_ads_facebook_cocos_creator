
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N0YXRlLW1hY2hpbmUtaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJjYW1lbGl6ZSIsImxhYmVsIiwibGVuZ3RoIiwicmVzdWx0Iiwid29yZCIsIndvcmRzIiwic3BsaXQiLCJ0b0xvd2VyQ2FzZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwicHJlcGVuZGVkIiwicHJlcGVuZCIsIm9wdGlvbnMiLCJwYXN0IiwiZnV0dXJlIiwiY2xlYXIiLCJiYWNrIiwiZm9yd2FyZCIsImNhbkJhY2siLCJjYW5Gb3J3YXJkIiwibWF4IiwicGx1Z2luIiwiY29uZmlndXJlIiwiY29uZmlnIiwiYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzIiwiaW5pdCIsImluc3RhbmNlIiwibGlmZWN5Y2xlIiwiZXZlbnQiLCJwdXNoIiwidG8iLCJzaGlmdCIsInRyYW5zaXRpb24iLCJtZXRob2RzIiwicHJvcGVydGllcyIsIkVycm9yIiwiZnJvbSIsInBvcCIsIl9mc20iLCJ0cmFuc2l0Iiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFNB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LGVBQU9ULE1BQVA7QUFFRCxPQTFFRDtBQTZFQTs7QUFBTztBQUNQO0FBbklVLEtBcEVNO0FBQWhCO0FBd01DLENBbE5EIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlN0YXRlTWFjaGluZUhpc3RvcnlcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3RhdGVNYWNoaW5lSGlzdG9yeVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTdGF0ZU1hY2hpbmVIaXN0b3J5XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBjYW1lbGl6ZShsYWJlbCkge1xuXG4gIGlmIChsYWJlbC5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGxhYmVsO1xuXG4gIHZhciBuLCByZXN1bHQsIHdvcmQsIHdvcmRzID0gbGFiZWwuc3BsaXQoL1tfLV0vKTtcblxuICAvLyBzaW5nbGUgd29yZCB3aXRoIGZpcnN0IGNoYXJhY3RlciBhbHJlYWR5IGxvd2VyY2FzZSwgcmV0dXJuIHVudG91Y2hlZFxuICBpZiAoKHdvcmRzLmxlbmd0aCA9PT0gMSkgJiYgKHdvcmRzWzBdWzBdLnRvTG93ZXJDYXNlKCkgPT09IHdvcmRzWzBdWzBdKSlcbiAgICByZXR1cm4gbGFiZWw7XG5cbiAgcmVzdWx0ID0gd29yZHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgZm9yKG4gPSAxIDsgbiA8IHdvcmRzLmxlbmd0aCA7IG4rKykge1xuICAgIHJlc3VsdCA9IHJlc3VsdCArIHdvcmRzW25dLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZHNbbl0uc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2FtZWxpemUucHJlcGVuZGVkID0gZnVuY3Rpb24ocHJlcGVuZCwgbGFiZWwpIHtcbiAgbGFiZWwgPSBjYW1lbGl6ZShsYWJlbCk7XG4gIHJldHVybiBwcmVwZW5kICsgbGFiZWxbMF0udG9VcHBlckNhc2UoKSArIGxhYmVsLnN1YnN0cmluZygxKTtcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxpemU7XG5cblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY2FtZWxpemUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRpb25zKSB7IG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBwYXN0ICAgICAgID0gY2FtZWxpemUob3B0aW9ucy5uYW1lIHx8IG9wdGlvbnMucGFzdCAgIHx8ICdoaXN0b3J5JyksXG4gICAgICBmdXR1cmUgICAgID0gY2FtZWxpemUoICAgICAgICAgICAgICAgIG9wdGlvbnMuZnV0dXJlIHx8ICdmdXR1cmUnKSxcbiAgICAgIGNsZWFyICAgICAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ2NsZWFyJywgcGFzdCksXG4gICAgICBiYWNrICAgICAgID0gY2FtZWxpemUucHJlcGVuZGVkKHBhc3QsICAgJ2JhY2snKSxcbiAgICAgIGZvcndhcmQgICAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQocGFzdCwgICAnZm9yd2FyZCcpLFxuICAgICAgY2FuQmFjayAgICA9IGNhbWVsaXplLnByZXBlbmRlZCgnY2FuJywgICBiYWNrKSxcbiAgICAgIGNhbkZvcndhcmQgPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ2NhbicsICAgZm9yd2FyZCksXG4gICAgICBtYXggICAgICAgID0gb3B0aW9ucy5tYXg7XG5cbiAgdmFyIHBsdWdpbiA9IHtcblxuICAgIGNvbmZpZ3VyZTogZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICBjb25maWcuYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzKGJhY2spO1xuICAgICAgY29uZmlnLmFkZFRyYW5zaXRpb25MaWZlY3ljbGVOYW1lcyhmb3J3YXJkKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlW3Bhc3RdICAgPSBbXTtcbiAgICAgIGluc3RhbmNlW2Z1dHVyZV0gPSBbXTtcbiAgICB9LFxuXG4gICAgbGlmZWN5Y2xlOiBmdW5jdGlvbihpbnN0YW5jZSwgbGlmZWN5Y2xlKSB7XG4gICAgICBpZiAobGlmZWN5Y2xlLmV2ZW50ID09PSAnb25FbnRlclN0YXRlJykge1xuICAgICAgICBpbnN0YW5jZVtwYXN0XS5wdXNoKGxpZmVjeWNsZS50byk7XG4gICAgICAgIGlmIChtYXggJiYgaW5zdGFuY2VbcGFzdF0ubGVuZ3RoID4gbWF4KVxuICAgICAgICAgIGluc3RhbmNlW3Bhc3RdLnNoaWZ0KCk7XG4gICAgICAgIGlmIChsaWZlY3ljbGUudHJhbnNpdGlvbiAhPT0gYmFjayAmJiBsaWZlY3ljbGUudHJhbnNpdGlvbiAhPT0gZm9yd2FyZClcbiAgICAgICAgICBpbnN0YW5jZVtmdXR1cmVdLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6ICAgIHt9LFxuICAgIHByb3BlcnRpZXM6IHt9XG5cbiAgfVxuXG4gIHBsdWdpbi5tZXRob2RzW2NsZWFyXSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbcGFzdF0ubGVuZ3RoID0gMFxuICAgIHRoaXNbZnV0dXJlXS5sZW5ndGggPSAwXG4gIH1cblxuICBwbHVnaW4ucHJvcGVydGllc1tjYW5CYWNrXSA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNbcGFzdF0ubGVuZ3RoID4gMVxuICAgIH1cbiAgfVxuXG4gIHBsdWdpbi5wcm9wZXJ0aWVzW2NhbkZvcndhcmRdID0ge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1tmdXR1cmVdLmxlbmd0aCA+IDBcbiAgICB9XG4gIH1cblxuICBwbHVnaW4ubWV0aG9kc1tiYWNrXSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpc1tjYW5CYWNrXSlcbiAgICAgIHRocm93IEVycm9yKCdubyBoaXN0b3J5Jyk7XG4gICAgdmFyIGZyb20gPSB0aGlzW3Bhc3RdLnBvcCgpLFxuICAgICAgICB0byAgID0gdGhpc1twYXN0XS5wb3AoKTtcbiAgICB0aGlzW2Z1dHVyZV0ucHVzaChmcm9tKTtcbiAgICB0aGlzLl9mc20udHJhbnNpdChiYWNrLCBmcm9tLCB0bywgW10pO1xuICB9XG5cbiAgcGx1Z2luLm1ldGhvZHNbZm9yd2FyZF0gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXNbY2FuRm9yd2FyZF0pXG4gICAgICB0aHJvdyBFcnJvcignbm8gaGlzdG9yeScpO1xuICAgIHZhciBmcm9tID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgdG8gPSB0aGlzW2Z1dHVyZV0ucG9wKCk7XG4gICAgdGhpcy5fZnNtLnRyYW5zaXQoZm9yd2FyZCwgZnJvbSwgdG8sIFtdKTtcbiAgfVxuXG4gIHJldHVybiBwbHVnaW47XG5cbn1cblxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTsiXX0=