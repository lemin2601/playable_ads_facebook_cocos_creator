
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhdGUtbWFjaGluZS12aXN1YWxpemUuanMiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwidmFsdWUiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJuIiwiX19lc01vZHVsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwidGFyZ2V0Iiwic291cmNlcyIsInNvdXJjZSIsImtleSIsImFyZ3VtZW50cyIsImxlbmd0aCIsIm1peGluIiwidmlzdWFsaXplIiwiZnNtIiwib3B0aW9ucyIsImRvdGlmeSIsImRvdGNmZyIsImNvbmZpZyIsImZldGNoIiwicmFua2RpciIsIm9yaWVudGF0aW9uIiwic3RhdGVzIiwidHJhbnNpdGlvbnMiLCJyZXN1bHQiLCJfZnNtIiwiaW5kZXgiLCJpbml0IiwiaW5kZXhPZiIsImZyb20iLCJzbGljZSIsImNvbmNhdCIsIm1heCIsInRyYW5zaXRpb24iLCJvdXRwdXQiLCJhY3RpdmUiLCJ0byIsImRvdCIsIndpbGRjYXJkIiwiZGVmYXVsdHMiLCJBcnJheSIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJwdXNoIiwibGFiZWwiLCJwYWQiLCJxdW90ZSIsInN0YXRlIiwiZWRnZSIsImpvaW4iLCJhdHRyIiwia2V5cyIsInNvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFD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RCxlQUFPeUIsTUFBTSxDQUFDdkIsTUFBUCxHQUFnQixDQUFoQixHQUFvQixRQUFRdUIsTUFBTSxDQUFDZSxJQUFQLENBQVksS0FBWixDQUFSLEdBQTZCLElBQWpELEdBQXdELEVBQS9EO0FBQ0QsT0FSRCxDQWhKc0QsQ0EwSnREOzs7QUFFQXBDLE1BQUFBLFNBQVMsQ0FBQ0ksTUFBVixHQUFtQkEsTUFBbkI7QUFDQUosTUFBQUEsU0FBUyxDQUFDRyxNQUFWLEdBQW1CQSxNQUFuQixDQTdKc0QsQ0ErSnREOztBQUVBMUMsTUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWlCd0MsU0FBakIsQ0FqS3NELENBbUt0RDs7QUFHQTtBQUFPO0FBQ1A7QUE3TFUsS0FwRU07QUFBaEI7QUFrUUMsQ0E1UUQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiU3RhdGVNYWNoaW5lVmlzdWFsaXplXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlN0YXRlTWFjaGluZVZpc3VhbGl6ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTdGF0ZU1hY2hpbmVWaXN1YWxpemVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgdmFyIG4sIHNvdXJjZSwga2V5O1xuICBmb3IobiA9IDEgOyBuIDwgYXJndW1lbnRzLmxlbmd0aCA7IG4rKykge1xuICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tuXTtcbiAgICBmb3Ioa2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIG1peGluID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gdmlzdWFsaXplKGZzbSwgb3B0aW9ucykge1xuICByZXR1cm4gZG90aWZ5KGRvdGNmZyhmc20sIG9wdGlvbnMpKTtcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGRvdGNmZyhmc20sIG9wdGlvbnMpIHtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBjb25maWcgICAgICA9IGRvdGNmZy5mZXRjaChmc20pLFxuICAgICAgbmFtZSAgICAgICAgPSBvcHRpb25zLm5hbWUsXG4gICAgICByYW5rZGlyICAgICA9IGRvdGNmZy5yYW5rZGlyKG9wdGlvbnMub3JpZW50YXRpb24pLFxuICAgICAgc3RhdGVzICAgICAgPSBkb3RjZmcuc3RhdGVzKGNvbmZpZywgb3B0aW9ucyksXG4gICAgICB0cmFuc2l0aW9ucyA9IGRvdGNmZy50cmFuc2l0aW9ucyhjb25maWcsIG9wdGlvbnMpLFxuICAgICAgcmVzdWx0ICAgICAgPSB7IH1cblxuICBpZiAobmFtZSlcbiAgICByZXN1bHQubmFtZSA9IG5hbWVcblxuICBpZiAocmFua2RpcilcbiAgICByZXN1bHQucmFua2RpciA9IHJhbmtkaXJcblxuICBpZiAoc3RhdGVzICYmIHN0YXRlcy5sZW5ndGggPiAwKVxuICAgIHJlc3VsdC5zdGF0ZXMgPSBzdGF0ZXNcblxuICBpZiAodHJhbnNpdGlvbnMgJiYgdHJhbnNpdGlvbnMubGVuZ3RoID4gMClcbiAgICByZXN1bHQudHJhbnNpdGlvbnMgPSB0cmFuc2l0aW9uc1xuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmRvdGNmZy5mZXRjaCA9IGZ1bmN0aW9uKGZzbSkge1xuICByZXR1cm4gKHR5cGVvZiBmc20gPT09ICdmdW5jdGlvbicpID8gZnNtLnByb3RvdHlwZS5fZnNtLmNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZnNtLl9mc20uY29uZmlnXG59XG5cbmRvdGNmZy5yYW5rZGlyID0gZnVuY3Rpb24ob3JpZW50YXRpb24pIHtcbiAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpXG4gICAgcmV0dXJuICdMUic7XG4gIGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKVxuICAgIHJldHVybiAnVEInO1xufVxuXG5kb3RjZmcuc3RhdGVzID0gZnVuY3Rpb24oY29uZmlnLCBvcHRpb25zKSB7XG4gIHZhciBpbmRleCwgc3RhdGVzID0gY29uZmlnLnN0YXRlcztcbiAgaWYgKCFvcHRpb25zLmluaXQpIHsgLy8gaWYgbm90IHNob3dpbmcgaW5pdCB0cmFuc2l0aW9uLCB0aGVuIHNsaWNlIG91dCB0aGUgaW1wbGllZCBpbml0IDpmcm9tIHN0YXRlXG4gICAgaW5kZXggID0gc3RhdGVzLmluZGV4T2YoY29uZmlnLmluaXQuZnJvbSk7XG4gICAgc3RhdGVzID0gc3RhdGVzLnNsaWNlKDAsIGluZGV4KS5jb25jYXQoc3RhdGVzLnNsaWNlKGluZGV4KzEpKTtcbiAgfVxuICByZXR1cm4gc3RhdGVzO1xufVxuXG5kb3RjZmcudHJhbnNpdGlvbnMgPSBmdW5jdGlvbihjb25maWcsIG9wdGlvbnMpIHtcbiAgdmFyIG4sIG1heCwgdHJhbnNpdGlvbixcbiAgICAgIGluaXQgICAgICAgID0gY29uZmlnLmluaXQsXG4gICAgICB0cmFuc2l0aW9ucyA9IGNvbmZpZy5vcHRpb25zLnRyYW5zaXRpb25zIHx8IFtdLCAvLyBlYXNpZXIgdG8gdmlzdWFsaXplIHVzaW5nIHRoZSBPUklHSU5BTCB0cmFuc2l0aW9uIGRlY2xhcmF0aW9ucyByYXRoZXIgdGhhbiBvdXIgcnVuLXRpbWUgbWFwcGluZ1xuICAgICAgb3V0cHV0ID0gW107XG4gIGlmIChvcHRpb25zLmluaXQgJiYgaW5pdC5hY3RpdmUpXG4gICAgZG90Y2ZnLnRyYW5zaXRpb24oaW5pdC5uYW1lLCBpbml0LmZyb20sIGluaXQudG8sIGluaXQuZG90LCBjb25maWcsIG9wdGlvbnMsIG91dHB1dClcbiAgZm9yIChuID0gMCwgbWF4ID0gdHJhbnNpdGlvbnMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKykge1xuICAgIHRyYW5zaXRpb24gPSBjb25maWcub3B0aW9ucy50cmFuc2l0aW9uc1tuXVxuICAgIGRvdGNmZy50cmFuc2l0aW9uKHRyYW5zaXRpb24ubmFtZSwgdHJhbnNpdGlvbi5mcm9tLCB0cmFuc2l0aW9uLnRvLCB0cmFuc2l0aW9uLmRvdCwgY29uZmlnLCBvcHRpb25zLCBvdXRwdXQpXG4gIH1cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5kb3RjZmcudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIGZyb20sIHRvLCBkb3QsIGNvbmZpZywgb3B0aW9ucywgb3V0cHV0KSB7XG4gIHZhciBuLCBtYXgsIHdpbGRjYXJkID0gY29uZmlnLmRlZmF1bHRzLndpbGRjYXJkXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbSkpIHtcbiAgICBmb3IobiA9IDAsIG1heCA9IGZyb20ubGVuZ3RoIDsgbiA8IG1heCA7IG4rKylcbiAgICAgIGRvdGNmZy50cmFuc2l0aW9uKG5hbWUsIGZyb21bbl0sIHRvLCBkb3QsIGNvbmZpZywgb3B0aW9ucywgb3V0cHV0KVxuICB9XG4gIGVsc2UgaWYgKGZyb20gPT09IHdpbGRjYXJkIHx8IGZyb20gPT09IHVuZGVmaW5lZCkge1xuICAgIGZvcihuID0gMCwgbWF4ID0gY29uZmlnLnN0YXRlcy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKVxuICAgICAgZG90Y2ZnLnRyYW5zaXRpb24obmFtZSwgY29uZmlnLnN0YXRlc1tuXSwgdG8sIGRvdCwgY29uZmlnLCBvcHRpb25zLCBvdXRwdXQpXG4gIH1cbiAgZWxzZSBpZiAodG8gPT09IHdpbGRjYXJkIHx8IHRvID09PSB1bmRlZmluZWQpIHtcbiAgICBkb3RjZmcudHJhbnNpdGlvbihuYW1lLCBmcm9tLCBmcm9tLCBkb3QsIGNvbmZpZywgb3B0aW9ucywgb3V0cHV0KVxuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiB0byA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIGRvIG5vdGhpbmcsIGNhbid0IGRpc3BsYXkgY29uZGl0aW9uYWwgdHJhbnNpdGlvblxuICB9XG4gIGVsc2Uge1xuICAgIG91dHB1dC5wdXNoKG1peGluKHt9LCB7IGZyb206IGZyb20sIHRvOiB0bywgbGFiZWw6IHBhZChuYW1lKSB9LCBkb3QgfHwge30pKVxuICB9XG5cbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHBhZChuYW1lKSB7XG4gIHJldHVybiBcIiBcIiArIG5hbWUgKyBcIiBcIlxufVxuXG5mdW5jdGlvbiBxdW90ZShuYW1lKSB7XG4gIHJldHVybiBcIlxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIlxufVxuXG5mdW5jdGlvbiBkb3RpZnkoZG90Y2ZnKSB7XG5cbiAgZG90Y2ZnID0gZG90Y2ZnIHx8IHt9O1xuXG4gIHZhciBuYW1lICAgICAgICA9IGRvdGNmZy5uYW1lIHx8ICdmc20nLFxuICAgICAgc3RhdGVzICAgICAgPSBkb3RjZmcuc3RhdGVzIHx8IFtdLFxuICAgICAgdHJhbnNpdGlvbnMgPSBkb3RjZmcudHJhbnNpdGlvbnMgfHwgW10sXG4gICAgICByYW5rZGlyICAgICA9IGRvdGNmZy5yYW5rZGlyLFxuICAgICAgb3V0cHV0ICAgICAgPSBbXSxcbiAgICAgIG4sIG1heDtcblxuICBvdXRwdXQucHVzaChcImRpZ3JhcGggXCIgKyBxdW90ZShuYW1lKSArIFwiIHtcIilcbiAgaWYgKHJhbmtkaXIpXG4gICAgb3V0cHV0LnB1c2goXCIgIHJhbmtkaXI9XCIgKyByYW5rZGlyICsgXCI7XCIpXG4gIGZvcihuID0gMCwgbWF4ID0gc3RhdGVzLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspXG4gICAgb3V0cHV0LnB1c2goZG90aWZ5LnN0YXRlKHN0YXRlc1tuXSkpXG4gIGZvcihuID0gMCwgbWF4ID0gdHJhbnNpdGlvbnMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKylcbiAgICBvdXRwdXQucHVzaChkb3RpZnkuZWRnZSh0cmFuc2l0aW9uc1tuXSkpXG4gIG91dHB1dC5wdXNoKFwifVwiKVxuICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcXG5cIilcblxufVxuXG5kb3RpZnkuc3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICByZXR1cm4gXCIgIFwiICsgcXVvdGUoc3RhdGUpICsgXCI7XCJcbn1cblxuZG90aWZ5LmVkZ2UgPSBmdW5jdGlvbihlZGdlKSB7XG4gIHJldHVybiBcIiAgXCIgKyBxdW90ZShlZGdlLmZyb20pICsgXCIgLT4gXCIgKyBxdW90ZShlZGdlLnRvKSArIGRvdGlmeS5lZGdlLmF0dHIoZWRnZSkgKyBcIjtcIlxufVxuXG5kb3RpZnkuZWRnZS5hdHRyID0gZnVuY3Rpb24oZWRnZSkge1xuICB2YXIgbiwgbWF4LCBrZXksIGtleXMgPSBPYmplY3Qua2V5cyhlZGdlKS5zb3J0KCksIG91dHB1dCA9IFtdO1xuICBmb3IobiA9IDAsIG1heCA9IGtleXMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKykge1xuICAgIGtleSA9IGtleXNbbl07XG4gICAgaWYgKGtleSAhPT0gJ2Zyb20nICYmIGtleSAhPT0gJ3RvJylcbiAgICAgIG91dHB1dC5wdXNoKGtleSArIFwiPVwiICsgcXVvdGUoZWRnZVtrZXldKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IDAgPyBcIiBbIFwiICsgb3V0cHV0LmpvaW4oXCIgOyBcIikgKyBcIiBdXCIgOiBcIlwiXG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52aXN1YWxpemUuZG90Y2ZnID0gZG90Y2ZnO1xudmlzdWFsaXplLmRvdGlmeSA9IGRvdGlmeTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gdmlzdWFsaXplO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTsiXX0=