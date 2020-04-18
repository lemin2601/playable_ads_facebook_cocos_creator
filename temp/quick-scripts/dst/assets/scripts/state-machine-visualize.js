
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/state-machine-visualize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a309EP+LRF8YsSguHpvS/m', 'state-machine-visualize');
// scripts/state-machine-visualize.js

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("StateMachineVisualize", [], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["StateMachineVisualize"] = factory();else root["StateMachineVisualize"] = factory();
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
      "use strict";

      module.exports = function (target, sources) {
        var n, source, key;

        for (n = 1; n < arguments.length; n++) {
          source = arguments[n];

          for (key in source) {
            if (source.hasOwnProperty(key)) target[key] = source[key];
          }
        }

        return target;
      };
      /***/

    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0); //-------------------------------------------------------------------------------------------------


      function visualize(fsm, options) {
        return dotify(dotcfg(fsm, options));
      } //-------------------------------------------------------------------------------------------------


      function dotcfg(fsm, options) {
        options = options || {};
        var config = dotcfg.fetch(fsm),
            name = options.name,
            rankdir = dotcfg.rankdir(options.orientation),
            states = dotcfg.states(config, options),
            transitions = dotcfg.transitions(config, options),
            result = {};
        if (name) result.name = name;
        if (rankdir) result.rankdir = rankdir;
        if (states && states.length > 0) result.states = states;
        if (transitions && transitions.length > 0) result.transitions = transitions;
        return result;
      } //-------------------------------------------------------------------------------------------------


      dotcfg.fetch = function (fsm) {
        return typeof fsm === 'function' ? fsm.prototype._fsm.config : fsm._fsm.config;
      };

      dotcfg.rankdir = function (orientation) {
        if (orientation === 'horizontal') return 'LR';else if (orientation === 'vertical') return 'TB';
      };

      dotcfg.states = function (config, options) {
        var index,
            states = config.states;

        if (!options.init) {
          // if not showing init transition, then slice out the implied init :from state
          index = states.indexOf(config.init.from);
          states = states.slice(0, index).concat(states.slice(index + 1));
        }

        return states;
      };

      dotcfg.transitions = function (config, options) {
        var n,
            max,
            transition,
            init = config.init,
            transitions = config.options.transitions || [],
            // easier to visualize using the ORIGINAL transition declarations rather than our run-time mapping
        output = [];
        if (options.init && init.active) dotcfg.transition(init.name, init.from, init.to, init.dot, config, options, output);

        for (n = 0, max = transitions.length; n < max; n++) {
          transition = config.options.transitions[n];
          dotcfg.transition(transition.name, transition.from, transition.to, transition.dot, config, options, output);
        }

        return output;
      };

      dotcfg.transition = function (name, from, to, dot, config, options, output) {
        var n,
            max,
            wildcard = config.defaults.wildcard;

        if (Array.isArray(from)) {
          for (n = 0, max = from.length; n < max; n++) {
            dotcfg.transition(name, from[n], to, dot, config, options, output);
          }
        } else if (from === wildcard || from === undefined) {
          for (n = 0, max = config.states.length; n < max; n++) {
            dotcfg.transition(name, config.states[n], to, dot, config, options, output);
          }
        } else if (to === wildcard || to === undefined) {
          dotcfg.transition(name, from, from, dot, config, options, output);
        } else if (typeof to === 'function') {// do nothing, can't display conditional transition
        } else {
          output.push(mixin({}, {
            from: from,
            to: to,
            label: pad(name)
          }, dot || {}));
        }
      }; //-------------------------------------------------------------------------------------------------


      function pad(name) {
        return " " + name + " ";
      }

      function quote(name) {
        return "\"" + name + "\"";
      }

      function dotify(dotcfg) {
        dotcfg = dotcfg || {};
        var name = dotcfg.name || 'fsm',
            states = dotcfg.states || [],
            transitions = dotcfg.transitions || [],
            rankdir = dotcfg.rankdir,
            output = [],
            n,
            max;
        output.push("digraph " + quote(name) + " {");
        if (rankdir) output.push("  rankdir=" + rankdir + ";");

        for (n = 0, max = states.length; n < max; n++) {
          output.push(dotify.state(states[n]));
        }

        for (n = 0, max = transitions.length; n < max; n++) {
          output.push(dotify.edge(transitions[n]));
        }

        output.push("}");
        return output.join("\n");
      }

      dotify.state = function (state) {
        return "  " + quote(state) + ";";
      };

      dotify.edge = function (edge) {
        return "  " + quote(edge.from) + " -> " + quote(edge.to) + dotify.edge.attr(edge) + ";";
      };

      dotify.edge.attr = function (edge) {
        var n,
            max,
            key,
            keys = Object.keys(edge).sort(),
            output = [];

        for (n = 0, max = keys.length; n < max; n++) {
          key = keys[n];
          if (key !== 'from' && key !== 'to') output.push(key + "=" + quote(edge[key]));
        }

        return output.length > 0 ? " [ " + output.join(" ; ") + " ]" : "";
      }; //-------------------------------------------------------------------------------------------------


      visualize.dotcfg = dotcfg;
      visualize.dotify = dotify; //-------------------------------------------------------------------------------------------------

      module.exports = visualize; //-------------------------------------------------------------------------------------------------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N0YXRlLW1hY2hpbmUtdmlzdWFsaXplLmpzIl0sIm5hbWVzIjpbIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJpIiwibCIsImNhbGwiLCJtIiwiYyIsInZhbHVlIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiZ2V0IiwibiIsIl9fZXNNb2R1bGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsInRhcmdldCIsInNvdXJjZXMiLCJzb3VyY2UiLCJrZXkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJtaXhpbiIsInZpc3VhbGl6ZSIsImZzbSIsIm9wdGlvbnMiLCJkb3RpZnkiLCJkb3RjZmciLCJjb25maWciLCJmZXRjaCIsInJhbmtkaXIiLCJvcmllbnRhdGlvbiIsInN0YXRlcyIsInRyYW5zaXRpb25zIiwicmVzdWx0IiwiX2ZzbSIsImluZGV4IiwiaW5pdCIsImluZGV4T2YiLCJmcm9tIiwic2xpY2UiLCJjb25jYXQiLCJtYXgiLCJ0cmFuc2l0aW9uIiwib3V0cHV0IiwiYWN0aXZlIiwidG8iLCJkb3QiLCJ3aWxkY2FyZCIsImRlZmF1bHRzIiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwicHVzaCIsImxhYmVsIiwicGFkIiwicXVvdGUiLCJzdGF0ZSIsImVkZ2UiLCJqb2luIiwiYXR0ciIsImtleXMiLCJzb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxT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ZUFBT3lCLE1BQU0sQ0FBQ3ZCLE1BQVAsR0FBZ0IsQ0FBaEIsR0FBb0IsUUFBUXVCLE1BQU0sQ0FBQ2UsSUFBUCxDQUFZLEtBQVosQ0FBUixHQUE2QixJQUFqRCxHQUF3RCxFQUEvRDtBQUNELE9BUkQsQ0FoSnNELENBMEp0RDs7O0FBRUFwQyxNQUFBQSxTQUFTLENBQUNJLE1BQVYsR0FBbUJBLE1BQW5CO0FBQ0FKLE1BQUFBLFNBQVMsQ0FBQ0csTUFBVixHQUFtQkEsTUFBbkIsQ0E3SnNELENBK0p0RDs7QUFFQTFDLE1BQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQndDLFNBQWpCLENBaktzRCxDQW1LdEQ7O0FBR0E7QUFBTztBQUNQO0FBN0xVLEtBcEVNO0FBQWhCO0FBa1FDLENBNVFEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlN0YXRlTWFjaGluZVZpc3VhbGl6ZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTdGF0ZU1hY2hpbmVWaXN1YWxpemVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3RhdGVNYWNoaW5lVmlzdWFsaXplXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIHZhciBuLCBzb3VyY2UsIGtleTtcbiAgZm9yKG4gPSAxIDsgbiA8IGFyZ3VtZW50cy5sZW5ndGggOyBuKyspIHtcbiAgICBzb3VyY2UgPSBhcmd1bWVudHNbbl07XG4gICAgZm9yKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBtaXhpbiA9IF9fd2VicGFja19yZXF1aXJlX18oMClcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHZpc3VhbGl6ZShmc20sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRvdGlmeShkb3RjZmcoZnNtLCBvcHRpb25zKSk7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBkb3RjZmcoZnNtLCBvcHRpb25zKSB7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgY29uZmlnICAgICAgPSBkb3RjZmcuZmV0Y2goZnNtKSxcbiAgICAgIG5hbWUgICAgICAgID0gb3B0aW9ucy5uYW1lLFxuICAgICAgcmFua2RpciAgICAgPSBkb3RjZmcucmFua2RpcihvcHRpb25zLm9yaWVudGF0aW9uKSxcbiAgICAgIHN0YXRlcyAgICAgID0gZG90Y2ZnLnN0YXRlcyhjb25maWcsIG9wdGlvbnMpLFxuICAgICAgdHJhbnNpdGlvbnMgPSBkb3RjZmcudHJhbnNpdGlvbnMoY29uZmlnLCBvcHRpb25zKSxcbiAgICAgIHJlc3VsdCAgICAgID0geyB9XG5cbiAgaWYgKG5hbWUpXG4gICAgcmVzdWx0Lm5hbWUgPSBuYW1lXG5cbiAgaWYgKHJhbmtkaXIpXG4gICAgcmVzdWx0LnJhbmtkaXIgPSByYW5rZGlyXG5cbiAgaWYgKHN0YXRlcyAmJiBzdGF0ZXMubGVuZ3RoID4gMClcbiAgICByZXN1bHQuc3RhdGVzID0gc3RhdGVzXG5cbiAgaWYgKHRyYW5zaXRpb25zICYmIHRyYW5zaXRpb25zLmxlbmd0aCA+IDApXG4gICAgcmVzdWx0LnRyYW5zaXRpb25zID0gdHJhbnNpdGlvbnNcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5kb3RjZmcuZmV0Y2ggPSBmdW5jdGlvbihmc20pIHtcbiAgcmV0dXJuICh0eXBlb2YgZnNtID09PSAnZnVuY3Rpb24nKSA/IGZzbS5wcm90b3R5cGUuX2ZzbS5jb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZzbS5fZnNtLmNvbmZpZ1xufVxuXG5kb3RjZmcucmFua2RpciA9IGZ1bmN0aW9uKG9yaWVudGF0aW9uKSB7XG4gIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKVxuICAgIHJldHVybiAnTFInO1xuICBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJylcbiAgICByZXR1cm4gJ1RCJztcbn1cblxuZG90Y2ZnLnN0YXRlcyA9IGZ1bmN0aW9uKGNvbmZpZywgb3B0aW9ucykge1xuICB2YXIgaW5kZXgsIHN0YXRlcyA9IGNvbmZpZy5zdGF0ZXM7XG4gIGlmICghb3B0aW9ucy5pbml0KSB7IC8vIGlmIG5vdCBzaG93aW5nIGluaXQgdHJhbnNpdGlvbiwgdGhlbiBzbGljZSBvdXQgdGhlIGltcGxpZWQgaW5pdCA6ZnJvbSBzdGF0ZVxuICAgIGluZGV4ICA9IHN0YXRlcy5pbmRleE9mKGNvbmZpZy5pbml0LmZyb20pO1xuICAgIHN0YXRlcyA9IHN0YXRlcy5zbGljZSgwLCBpbmRleCkuY29uY2F0KHN0YXRlcy5zbGljZShpbmRleCsxKSk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlcztcbn1cblxuZG90Y2ZnLnRyYW5zaXRpb25zID0gZnVuY3Rpb24oY29uZmlnLCBvcHRpb25zKSB7XG4gIHZhciBuLCBtYXgsIHRyYW5zaXRpb24sXG4gICAgICBpbml0ICAgICAgICA9IGNvbmZpZy5pbml0LFxuICAgICAgdHJhbnNpdGlvbnMgPSBjb25maWcub3B0aW9ucy50cmFuc2l0aW9ucyB8fCBbXSwgLy8gZWFzaWVyIHRvIHZpc3VhbGl6ZSB1c2luZyB0aGUgT1JJR0lOQUwgdHJhbnNpdGlvbiBkZWNsYXJhdGlvbnMgcmF0aGVyIHRoYW4gb3VyIHJ1bi10aW1lIG1hcHBpbmdcbiAgICAgIG91dHB1dCA9IFtdO1xuICBpZiAob3B0aW9ucy5pbml0ICYmIGluaXQuYWN0aXZlKVxuICAgIGRvdGNmZy50cmFuc2l0aW9uKGluaXQubmFtZSwgaW5pdC5mcm9tLCBpbml0LnRvLCBpbml0LmRvdCwgY29uZmlnLCBvcHRpb25zLCBvdXRwdXQpXG4gIGZvciAobiA9IDAsIG1heCA9IHRyYW5zaXRpb25zLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspIHtcbiAgICB0cmFuc2l0aW9uID0gY29uZmlnLm9wdGlvbnMudHJhbnNpdGlvbnNbbl1cbiAgICBkb3RjZmcudHJhbnNpdGlvbih0cmFuc2l0aW9uLm5hbWUsIHRyYW5zaXRpb24uZnJvbSwgdHJhbnNpdGlvbi50bywgdHJhbnNpdGlvbi5kb3QsIGNvbmZpZywgb3B0aW9ucywgb3V0cHV0KVxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxuZG90Y2ZnLnRyYW5zaXRpb24gPSBmdW5jdGlvbihuYW1lLCBmcm9tLCB0bywgZG90LCBjb25maWcsIG9wdGlvbnMsIG91dHB1dCkge1xuICB2YXIgbiwgbWF4LCB3aWxkY2FyZCA9IGNvbmZpZy5kZWZhdWx0cy53aWxkY2FyZFxuXG4gIGlmIChBcnJheS5pc0FycmF5KGZyb20pKSB7XG4gICAgZm9yKG4gPSAwLCBtYXggPSBmcm9tLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspXG4gICAgICBkb3RjZmcudHJhbnNpdGlvbihuYW1lLCBmcm9tW25dLCB0bywgZG90LCBjb25maWcsIG9wdGlvbnMsIG91dHB1dClcbiAgfVxuICBlbHNlIGlmIChmcm9tID09PSB3aWxkY2FyZCB8fCBmcm9tID09PSB1bmRlZmluZWQpIHtcbiAgICBmb3IobiA9IDAsIG1heCA9IGNvbmZpZy5zdGF0ZXMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKylcbiAgICAgIGRvdGNmZy50cmFuc2l0aW9uKG5hbWUsIGNvbmZpZy5zdGF0ZXNbbl0sIHRvLCBkb3QsIGNvbmZpZywgb3B0aW9ucywgb3V0cHV0KVxuICB9XG4gIGVsc2UgaWYgKHRvID09PSB3aWxkY2FyZCB8fCB0byA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZG90Y2ZnLnRyYW5zaXRpb24obmFtZSwgZnJvbSwgZnJvbSwgZG90LCBjb25maWcsIG9wdGlvbnMsIG91dHB1dClcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgdG8gPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBkbyBub3RoaW5nLCBjYW4ndCBkaXNwbGF5IGNvbmRpdGlvbmFsIHRyYW5zaXRpb25cbiAgfVxuICBlbHNlIHtcbiAgICBvdXRwdXQucHVzaChtaXhpbih7fSwgeyBmcm9tOiBmcm9tLCB0bzogdG8sIGxhYmVsOiBwYWQobmFtZSkgfSwgZG90IHx8IHt9KSlcbiAgfVxuXG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBwYWQobmFtZSkge1xuICByZXR1cm4gXCIgXCIgKyBuYW1lICsgXCIgXCJcbn1cblxuZnVuY3Rpb24gcXVvdGUobmFtZSkge1xuICByZXR1cm4gXCJcXFwiXCIgKyBuYW1lICsgXCJcXFwiXCJcbn1cblxuZnVuY3Rpb24gZG90aWZ5KGRvdGNmZykge1xuXG4gIGRvdGNmZyA9IGRvdGNmZyB8fCB7fTtcblxuICB2YXIgbmFtZSAgICAgICAgPSBkb3RjZmcubmFtZSB8fCAnZnNtJyxcbiAgICAgIHN0YXRlcyAgICAgID0gZG90Y2ZnLnN0YXRlcyB8fCBbXSxcbiAgICAgIHRyYW5zaXRpb25zID0gZG90Y2ZnLnRyYW5zaXRpb25zIHx8IFtdLFxuICAgICAgcmFua2RpciAgICAgPSBkb3RjZmcucmFua2RpcixcbiAgICAgIG91dHB1dCAgICAgID0gW10sXG4gICAgICBuLCBtYXg7XG5cbiAgb3V0cHV0LnB1c2goXCJkaWdyYXBoIFwiICsgcXVvdGUobmFtZSkgKyBcIiB7XCIpXG4gIGlmIChyYW5rZGlyKVxuICAgIG91dHB1dC5wdXNoKFwiICByYW5rZGlyPVwiICsgcmFua2RpciArIFwiO1wiKVxuICBmb3IobiA9IDAsIG1heCA9IHN0YXRlcy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKVxuICAgIG91dHB1dC5wdXNoKGRvdGlmeS5zdGF0ZShzdGF0ZXNbbl0pKVxuICBmb3IobiA9IDAsIG1heCA9IHRyYW5zaXRpb25zLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspXG4gICAgb3V0cHV0LnB1c2goZG90aWZ5LmVkZ2UodHJhbnNpdGlvbnNbbl0pKVxuICBvdXRwdXQucHVzaChcIn1cIilcbiAgcmV0dXJuIG91dHB1dC5qb2luKFwiXFxuXCIpXG5cbn1cblxuZG90aWZ5LnN0YXRlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgcmV0dXJuIFwiICBcIiArIHF1b3RlKHN0YXRlKSArIFwiO1wiXG59XG5cbmRvdGlmeS5lZGdlID0gZnVuY3Rpb24oZWRnZSkge1xuICByZXR1cm4gXCIgIFwiICsgcXVvdGUoZWRnZS5mcm9tKSArIFwiIC0+IFwiICsgcXVvdGUoZWRnZS50bykgKyBkb3RpZnkuZWRnZS5hdHRyKGVkZ2UpICsgXCI7XCJcbn1cblxuZG90aWZ5LmVkZ2UuYXR0ciA9IGZ1bmN0aW9uKGVkZ2UpIHtcbiAgdmFyIG4sIG1heCwga2V5LCBrZXlzID0gT2JqZWN0LmtleXMoZWRnZSkuc29ydCgpLCBvdXRwdXQgPSBbXTtcbiAgZm9yKG4gPSAwLCBtYXggPSBrZXlzLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspIHtcbiAgICBrZXkgPSBrZXlzW25dO1xuICAgIGlmIChrZXkgIT09ICdmcm9tJyAmJiBrZXkgIT09ICd0bycpXG4gICAgICBvdXRwdXQucHVzaChrZXkgKyBcIj1cIiArIHF1b3RlKGVkZ2Vba2V5XSkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiAwID8gXCIgWyBcIiArIG91dHB1dC5qb2luKFwiIDsgXCIpICsgXCIgXVwiIDogXCJcIlxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmlzdWFsaXplLmRvdGNmZyA9IGRvdGNmZztcbnZpc3VhbGl6ZS5kb3RpZnkgPSBkb3RpZnk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZpc3VhbGl6ZTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7Il19