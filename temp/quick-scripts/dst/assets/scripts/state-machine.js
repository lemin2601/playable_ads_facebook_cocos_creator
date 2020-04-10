
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/state-machine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75189ssjqRPIJjNg8SblrCG', 'state-machine');
// scripts/state-machine.js

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("StateMachine", [], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["StateMachine"] = factory();else root["StateMachine"] = factory();
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

      return __webpack_require__(__webpack_require__.s = 5);
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


      module.exports = {
        build: function build(target, config) {
          var n,
              max,
              plugin,
              plugins = config.plugins;

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            if (plugin.methods) mixin(target, plugin.methods);
            if (plugin.properties) Object.defineProperties(target, plugin.properties);
          }
        },
        hook: function hook(fsm, name, additional) {
          var n,
              max,
              method,
              plugin,
              plugins = fsm.config.plugins,
              args = [fsm.context];
          if (additional) args = args.concat(additional);

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            method = plugins[n][name];
            if (method) method.apply(plugin, args);
          }
        }
      }; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 2 */

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
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-------------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0),
          camelize = __webpack_require__(2); //-------------------------------------------------------------------------------------------------


      function Config(options, StateMachine) {
        options = options || {};
        this.options = options; // preserving original options can be useful (e.g visualize plugin)

        this.defaults = StateMachine.defaults;
        this.states = [];
        this.transitions = [];
        this.map = {};
        this.lifecycle = this.configureLifecycle();
        this.init = this.configureInitTransition(options.init);
        this.data = this.configureData(options.data);
        this.methods = this.configureMethods(options.methods);
        this.map[this.defaults.wildcard] = {};
        this.configureTransitions(options.transitions || []);
        this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);
      } //-------------------------------------------------------------------------------------------------


      mixin(Config.prototype, {
        addState: function addState(name) {
          if (!this.map[name]) {
            this.states.push(name);
            this.addStateLifecycleNames(name);
            this.map[name] = {};
          }
        },
        addStateLifecycleNames: function addStateLifecycleNames(name) {
          this.lifecycle.onEnter[name] = camelize.prepended('onEnter', name);
          this.lifecycle.onLeave[name] = camelize.prepended('onLeave', name);
          this.lifecycle.on[name] = camelize.prepended('on', name);
        },
        addTransition: function addTransition(name) {
          if (this.transitions.indexOf(name) < 0) {
            this.transitions.push(name);
            this.addTransitionLifecycleNames(name);
          }
        },
        addTransitionLifecycleNames: function addTransitionLifecycleNames(name) {
          this.lifecycle.onBefore[name] = camelize.prepended('onBefore', name);
          this.lifecycle.onAfter[name] = camelize.prepended('onAfter', name);
          this.lifecycle.on[name] = camelize.prepended('on', name);
        },
        mapTransition: function mapTransition(transition) {
          var name = transition.name,
              from = transition.from,
              to = transition.to;
          this.addState(from);
          if (typeof to !== 'function') this.addState(to);
          this.addTransition(name);
          this.map[from][name] = transition;
          return transition;
        },
        configureLifecycle: function configureLifecycle() {
          return {
            onBefore: {
              transition: 'onBeforeTransition'
            },
            onAfter: {
              transition: 'onAfterTransition'
            },
            onEnter: {
              state: 'onEnterState'
            },
            onLeave: {
              state: 'onLeaveState'
            },
            on: {
              transition: 'onTransition'
            }
          };
        },
        configureInitTransition: function configureInitTransition(init) {
          if (typeof init === 'string') {
            return this.mapTransition(mixin({}, this.defaults.init, {
              to: init,
              active: true
            }));
          } else if (_typeof(init) === 'object') {
            return this.mapTransition(mixin({}, this.defaults.init, init, {
              active: true
            }));
          } else {
            this.addState(this.defaults.init.from);
            return this.defaults.init;
          }
        },
        configureData: function configureData(data) {
          if (typeof data === 'function') return data;else if (_typeof(data) === 'object') return function () {
            return data;
          };else return function () {
            return {};
          };
        },
        configureMethods: function configureMethods(methods) {
          return methods || {};
        },
        configurePlugins: function configurePlugins(plugins, builtin) {
          plugins = plugins || [];
          var n, max, plugin;

          for (n = 0, max = plugins.length; n < max; n++) {
            plugin = plugins[n];
            if (typeof plugin === 'function') plugins[n] = plugin = plugin();
            if (plugin.configure) plugin.configure(this);
          }

          return plugins;
        },
        configureTransitions: function configureTransitions(transitions) {
          var i,
              n,
              transition,
              from,
              to,
              wildcard = this.defaults.wildcard;

          for (n = 0; n < transitions.length; n++) {
            transition = transitions[n];
            from = Array.isArray(transition.from) ? transition.from : [transition.from || wildcard];
            to = transition.to || wildcard;

            for (i = 0; i < from.length; i++) {
              this.mapTransition({
                name: transition.name,
                from: from[i],
                to: to
              });
            }
          }
        },
        transitionFor: function transitionFor(state, transition) {
          var wildcard = this.defaults.wildcard;
          return this.map[state][transition] || this.map[wildcard][transition];
        },
        transitionsFor: function transitionsFor(state) {
          var wildcard = this.defaults.wildcard;
          return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));
        },
        allStates: function allStates() {
          return this.states;
        },
        allTransitions: function allTransitions() {
          return this.transitions;
        }
      }); //-------------------------------------------------------------------------------------------------

      module.exports = Config; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      var mixin = __webpack_require__(0),
          Exception = __webpack_require__(6),
          plugin = __webpack_require__(1),
          UNOBSERVED = [null, []]; //-------------------------------------------------------------------------------------------------


      function JSM(context, config) {
        this.context = context;
        this.config = config;
        this.state = config.init.from;
        this.observers = [context];
      } //-------------------------------------------------------------------------------------------------


      mixin(JSM.prototype, {
        init: function init(args) {
          mixin(this.context, this.config.data.apply(this.context, args));
          plugin.hook(this, 'init');
          if (this.config.init.active) return this.fire(this.config.init.name, []);
        },
        is: function is(state) {
          return Array.isArray(state) ? state.indexOf(this.state) >= 0 : this.state === state;
        },
        isPending: function isPending() {
          return this.pending;
        },
        can: function can(transition) {
          return !this.isPending() && !!this.seek(transition);
        },
        cannot: function cannot(transition) {
          return !this.can(transition);
        },
        allStates: function allStates() {
          return this.config.allStates();
        },
        allTransitions: function allTransitions() {
          return this.config.allTransitions();
        },
        transitions: function transitions() {
          return this.config.transitionsFor(this.state);
        },
        seek: function seek(transition, args) {
          var wildcard = this.config.defaults.wildcard,
              entry = this.config.transitionFor(this.state, transition),
              to = entry && entry.to;
          if (typeof to === 'function') return to.apply(this.context, args);else if (to === wildcard) return this.state;else return to;
        },
        fire: function fire(transition, args) {
          return this.transit(transition, this.state, this.seek(transition, args), args);
        },
        transit: function transit(transition, from, to, args) {
          var lifecycle = this.config.lifecycle,
              changed = this.config.options.observeUnchangedState || from !== to;
          if (!to) return this.context.onInvalidTransition(transition, from, to);
          if (this.isPending()) return this.context.onPendingTransition(transition, from, to);
          this.config.addState(to); // might need to add this state if it's unknown (e.g. conditional transition or goto)

          this.beginTransit();
          args.unshift({
            // this context will be passed to each lifecycle event observer
            transition: transition,
            from: from,
            to: to,
            fsm: this.context
          });
          return this.observeEvents([this.observersForEvent(lifecycle.onBefore.transition), this.observersForEvent(lifecycle.onBefore[transition]), changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED, this.observersForEvent(lifecycle.on.transition), changed ? ['doTransit', [this]] : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter[to]) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.on[to]) : UNOBSERVED, this.observersForEvent(lifecycle.onAfter.transition), this.observersForEvent(lifecycle.onAfter[transition]), this.observersForEvent(lifecycle.on[transition])], args);
        },
        beginTransit: function beginTransit() {
          this.pending = true;
        },
        endTransit: function endTransit(result) {
          this.pending = false;
          return result;
        },
        failTransit: function failTransit(result) {
          this.pending = false;
          /*throw result;*/
        },
        doTransit: function doTransit(lifecycle) {
          this.state = lifecycle.to;
        },
        observe: function observe(args) {
          if (args.length === 2) {
            var observer = {};
            observer[args[0]] = args[1];
            this.observers.push(observer);
          } else {
            this.observers.push(args[0]);
          }
        },
        observersForEvent: function observersForEvent(event) {
          // TODO: this could be cached
          var n = 0,
              max = this.observers.length,
              observer,
              result = [];

          for (; n < max; n++) {
            observer = this.observers[n];
            if (observer[event]) result.push(observer);
          }

          return [event, result, true];
        },
        observeEvents: function observeEvents(events, args, previousEvent, previousResult) {
          if (events.length === 0) {
            return this.endTransit(previousResult === undefined ? true : previousResult);
          }

          var event = events[0][0],
              observers = events[0][1],
              pluggable = events[0][2];
          args[0].event = event;
          if (event && pluggable && event !== previousEvent) plugin.hook(this, 'lifecycle', args);

          if (observers.length === 0) {
            events.shift();
            return this.observeEvents(events, args, event, previousResult);
          } else {
            var observer = observers.shift(),
                result = observer[event].apply(observer, args);

            if (result && typeof result.then === 'function') {
              return result.then(this.observeEvents.bind(this, events, args, event))["catch"](this.failTransit.bind(this));
            } else if (result === false) {
              return this.endTransit(false);
            } else {
              return this.observeEvents(events, args, event, result);
            }
          }
        },
        onInvalidTransition: function onInvalidTransition(transition, from, to) {
          throw new Exception("transition is invalid in current state", transition, from, to, this.state);
        },
        onPendingTransition: function onPendingTransition(transition, from, to) {
          throw new Exception("transition is invalid while previous transition is still in progress", transition, from, to, this.state);
        }
      }); //-------------------------------------------------------------------------------------------------

      module.exports = JSM; //-------------------------------------------------------------------------------------------------

      /***/
    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; //-----------------------------------------------------------------------------------------------

      var mixin = __webpack_require__(0),
          camelize = __webpack_require__(2),
          plugin = __webpack_require__(1),
          Config = __webpack_require__(3),
          JSM = __webpack_require__(4); //-----------------------------------------------------------------------------------------------


      var PublicMethods = {
        is: function is(state) {
          return this._fsm.is(state);
        },
        can: function can(transition) {
          return this._fsm.can(transition);
        },
        cannot: function cannot(transition) {
          return this._fsm.cannot(transition);
        },
        observe: function observe() {
          return this._fsm.observe(arguments);
        },
        transitions: function transitions() {
          return this._fsm.transitions();
        },
        allTransitions: function allTransitions() {
          return this._fsm.allTransitions();
        },
        allStates: function allStates() {
          return this._fsm.allStates();
        },
        onInvalidTransition: function onInvalidTransition(t, from, to) {
          return this._fsm.onInvalidTransition(t, from, to);
        },
        onPendingTransition: function onPendingTransition(t, from, to) {
          return this._fsm.onPendingTransition(t, from, to);
        }
      };
      var PublicProperties = {
        state: {
          configurable: false,
          enumerable: true,
          get: function get() {
            return this._fsm.state;
          },
          set: function set(state) {
            throw Error('use transitions to change state');
          }
        }
      }; //-----------------------------------------------------------------------------------------------

      function StateMachine(options) {
        return apply(this || {}, options);
      }

      function factory() {
        var cstor, options;

        if (typeof arguments[0] === 'function') {
          cstor = arguments[0];
          options = arguments[1] || {};
        } else {
          cstor = function cstor() {
            this._fsm.apply(this, arguments);
          };

          options = arguments[0] || {};
        }

        var config = new Config(options, StateMachine);
        build(cstor.prototype, config);
        cstor.prototype._fsm.config = config; // convenience access to shared config without needing an instance

        return cstor;
      } //-------------------------------------------------------------------------------------------------


      function apply(instance, options) {
        var config = new Config(options, StateMachine);
        build(instance, config);

        instance._fsm();

        return instance;
      }

      function build(target, config) {
        if (_typeof(target) !== 'object' || Array.isArray(target)) throw Error('StateMachine can only be applied to objects');
        plugin.build(target, config);
        Object.defineProperties(target, PublicProperties);
        mixin(target, PublicMethods);
        mixin(target, config.methods);
        config.allTransitions().forEach(function (transition) {
          target[camelize(transition)] = function () {
            return this._fsm.fire(transition, [].slice.call(arguments));
          };
        });

        target._fsm = function () {
          this._fsm = new JSM(this, config);

          this._fsm.init(arguments);
        };
      } //-----------------------------------------------------------------------------------------------


      StateMachine.version = '3.0.1';
      StateMachine.factory = factory;
      StateMachine.apply = apply;
      StateMachine.defaults = {
        wildcard: '*',
        init: {
          name: 'init',
          from: 'none'
        }
      }; //===============================================================================================

      module.exports = StateMachine;
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      module.exports = function (message, transition, from, to, current) {
        this.message = message;
        this.transition = transition;
        this.from = from;
        this.to = to;
        this.current = current;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhdGUtbWFjaGluZS5qcyJdLCJuYW1lcyI6WyJ3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiaSIsImwiLCJjYWxsIiwibSIsImMiLCJ2YWx1ZSIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsImdldCIsIm4iLCJfX2VzTW9kdWxlIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJ0YXJnZXQiLCJzb3VyY2VzIiwic291cmNlIiwia2V5IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibWl4aW4iLCJidWlsZCIsImNvbmZpZyIsIm1heCIsInBsdWdpbiIsInBsdWdpbnMiLCJtZXRob2RzIiwicHJvcGVydGllcyIsImRlZmluZVByb3BlcnRpZXMiLCJob29rIiwiZnNtIiwiYWRkaXRpb25hbCIsIm1ldGhvZCIsImFyZ3MiLCJjb250ZXh0IiwiY29uY2F0IiwiYXBwbHkiLCJjYW1lbGl6ZSIsImxhYmVsIiwicmVzdWx0Iiwid29yZCIsIndvcmRzIiwic3BsaXQiLCJ0b0xvd2VyQ2FzZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwicHJlcGVuZGVkIiwicHJlcGVuZCIsIkNvbmZpZyIsIm9wdGlvbnMiLCJTdGF0ZU1hY2hpbmUiLCJkZWZhdWx0cyIsInN0YXRlcyIsInRyYW5zaXRpb25zIiwibWFwIiwibGlmZWN5Y2xlIiwiY29uZmlndXJlTGlmZWN5Y2xlIiwiaW5pdCIsImNvbmZpZ3VyZUluaXRUcmFuc2l0aW9uIiwiZGF0YSIsImNvbmZpZ3VyZURhdGEiLCJjb25maWd1cmVNZXRob2RzIiwid2lsZGNhcmQiLCJjb25maWd1cmVUcmFuc2l0aW9ucyIsImNvbmZpZ3VyZVBsdWdpbnMiLCJhZGRTdGF0ZSIsInB1c2giLCJhZGRTdGF0ZUxpZmVjeWNsZU5hbWVzIiwib25FbnRlciIsIm9uTGVhdmUiLCJvbiIsImFkZFRyYW5zaXRpb24iLCJpbmRleE9mIiwiYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzIiwib25CZWZvcmUiLCJvbkFmdGVyIiwibWFwVHJhbnNpdGlvbiIsInRyYW5zaXRpb24iLCJmcm9tIiwidG8iLCJzdGF0ZSIsImFjdGl2ZSIsImJ1aWx0aW4iLCJjb25maWd1cmUiLCJBcnJheSIsImlzQXJyYXkiLCJ0cmFuc2l0aW9uRm9yIiwidHJhbnNpdGlvbnNGb3IiLCJrZXlzIiwiYWxsU3RhdGVzIiwiYWxsVHJhbnNpdGlvbnMiLCJFeGNlcHRpb24iLCJVTk9CU0VSVkVEIiwiSlNNIiwib2JzZXJ2ZXJzIiwiZmlyZSIsImlzIiwiaXNQZW5kaW5nIiwicGVuZGluZyIsImNhbiIsInNlZWsiLCJjYW5ub3QiLCJlbnRyeSIsInRyYW5zaXQiLCJjaGFuZ2VkIiwib2JzZXJ2ZVVuY2hhbmdlZFN0YXRlIiwib25JbnZhbGlkVHJhbnNpdGlvbiIsIm9uUGVuZGluZ1RyYW5zaXRpb24iLCJiZWdpblRyYW5zaXQiLCJ1bnNoaWZ0Iiwib2JzZXJ2ZUV2ZW50cyIsIm9ic2VydmVyc0ZvckV2ZW50IiwiZW5kVHJhbnNpdCIsImZhaWxUcmFuc2l0IiwiZG9UcmFuc2l0Iiwib2JzZXJ2ZSIsIm9ic2VydmVyIiwiZXZlbnQiLCJldmVudHMiLCJwcmV2aW91c0V2ZW50IiwicHJldmlvdXNSZXN1bHQiLCJ1bmRlZmluZWQiLCJwbHVnZ2FibGUiLCJzaGlmdCIsInRoZW4iLCJiaW5kIiwiUHVibGljTWV0aG9kcyIsIl9mc20iLCJ0IiwiUHVibGljUHJvcGVydGllcyIsInNldCIsIkVycm9yIiwiY3N0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LE1BQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQnNFLFlBQWpCO0FBR0E7QUFBTyxLQTVqQkc7QUE2akJWOztBQUNBO0FBQU8sY0FBU3JFLE1BQVQsRUFBaUJELE9BQWpCLEVBQTBCTSxtQkFBMUIsRUFBK0M7QUFFdEQ7O0FBR0FMLE1BQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQixVQUFTNkosT0FBVCxFQUFrQjVELFVBQWxCLEVBQThCQyxJQUE5QixFQUFvQ0MsRUFBcEMsRUFBd0MyRCxPQUF4QyxFQUFpRDtBQUNoRSxhQUFLRCxPQUFMLEdBQWtCQSxPQUFsQjtBQUNBLGFBQUs1RCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLGFBQUtDLElBQUwsR0FBa0JBLElBQWxCO0FBQ0EsYUFBS0MsRUFBTCxHQUFrQkEsRUFBbEI7QUFDQSxhQUFLMkQsT0FBTCxHQUFrQkEsT0FBbEI7QUFDRCxPQU5EO0FBU0E7O0FBQU87QUFDUDtBQTdrQlUsS0FwRU07QUFBaEI7QUFrcEJDLENBNXBCRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJTdGF0ZU1hY2hpbmVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3RhdGVNYWNoaW5lXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN0YXRlTWFjaGluZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlcykge1xuICB2YXIgbiwgc291cmNlLCBrZXk7XG4gIGZvcihuID0gMSA7IG4gPCBhcmd1bWVudHMubGVuZ3RoIDsgbisrKSB7XG4gICAgc291cmNlID0gYXJndW1lbnRzW25dO1xuICAgIGZvcihrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgbWl4aW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgYnVpbGQ6IGZ1bmN0aW9uKHRhcmdldCwgY29uZmlnKSB7XG4gICAgdmFyIG4sIG1heCwgcGx1Z2luLCBwbHVnaW5zID0gY29uZmlnLnBsdWdpbnM7XG4gICAgZm9yKG4gPSAwLCBtYXggPSBwbHVnaW5zLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspIHtcbiAgICAgIHBsdWdpbiA9IHBsdWdpbnNbbl07XG4gICAgICBpZiAocGx1Z2luLm1ldGhvZHMpXG4gICAgICAgIG1peGluKHRhcmdldCwgcGx1Z2luLm1ldGhvZHMpO1xuICAgICAgaWYgKHBsdWdpbi5wcm9wZXJ0aWVzKVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHBsdWdpbi5wcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH0sXG5cbiAgaG9vazogZnVuY3Rpb24oZnNtLCBuYW1lLCBhZGRpdGlvbmFsKSB7XG4gICAgdmFyIG4sIG1heCwgbWV0aG9kLCBwbHVnaW4sXG4gICAgICAgIHBsdWdpbnMgPSBmc20uY29uZmlnLnBsdWdpbnMsXG4gICAgICAgIGFyZ3MgICAgPSBbZnNtLmNvbnRleHRdO1xuXG4gICAgaWYgKGFkZGl0aW9uYWwpXG4gICAgICBhcmdzID0gYXJncy5jb25jYXQoYWRkaXRpb25hbClcblxuICAgIGZvcihuID0gMCwgbWF4ID0gcGx1Z2lucy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKSB7XG4gICAgICBwbHVnaW4gPSBwbHVnaW5zW25dXG4gICAgICBtZXRob2QgPSBwbHVnaW5zW25dW25hbWVdXG4gICAgICBpZiAobWV0aG9kKVxuICAgICAgICBtZXRob2QuYXBwbHkocGx1Z2luLCBhcmdzKTtcbiAgICB9XG4gIH1cblxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNhbWVsaXplKGxhYmVsKSB7XG5cbiAgaWYgKGxhYmVsLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gbGFiZWw7XG5cbiAgdmFyIG4sIHJlc3VsdCwgd29yZCwgd29yZHMgPSBsYWJlbC5zcGxpdCgvW18tXS8pO1xuXG4gIC8vIHNpbmdsZSB3b3JkIHdpdGggZmlyc3QgY2hhcmFjdGVyIGFscmVhZHkgbG93ZXJjYXNlLCByZXR1cm4gdW50b3VjaGVkXG4gIGlmICgod29yZHMubGVuZ3RoID09PSAxKSAmJiAod29yZHNbMF1bMF0udG9Mb3dlckNhc2UoKSA9PT0gd29yZHNbMF1bMF0pKVxuICAgIHJldHVybiBsYWJlbDtcblxuICByZXN1bHQgPSB3b3Jkc1swXS50b0xvd2VyQ2FzZSgpO1xuICBmb3IobiA9IDEgOyBuIDwgd29yZHMubGVuZ3RoIDsgbisrKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0ICsgd29yZHNbbl0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tuXS5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jYW1lbGl6ZS5wcmVwZW5kZWQgPSBmdW5jdGlvbihwcmVwZW5kLCBsYWJlbCkge1xuICBsYWJlbCA9IGNhbWVsaXplKGxhYmVsKTtcbiAgcmV0dXJuIHByZXBlbmQgKyBsYWJlbFswXS50b1VwcGVyQ2FzZSgpICsgbGFiZWwuc3Vic3RyaW5nKDEpO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZTtcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBtaXhpbiAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMCksXG4gICAgY2FtZWxpemUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gQ29uZmlnKG9wdGlvbnMsIFN0YXRlTWFjaGluZSkge1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMub3B0aW9ucyAgICAgPSBvcHRpb25zOyAvLyBwcmVzZXJ2aW5nIG9yaWdpbmFsIG9wdGlvbnMgY2FuIGJlIHVzZWZ1bCAoZS5nIHZpc3VhbGl6ZSBwbHVnaW4pXG4gIHRoaXMuZGVmYXVsdHMgICAgPSBTdGF0ZU1hY2hpbmUuZGVmYXVsdHM7XG4gIHRoaXMuc3RhdGVzICAgICAgPSBbXTtcbiAgdGhpcy50cmFuc2l0aW9ucyA9IFtdO1xuICB0aGlzLm1hcCAgICAgICAgID0ge307XG4gIHRoaXMubGlmZWN5Y2xlICAgPSB0aGlzLmNvbmZpZ3VyZUxpZmVjeWNsZSgpO1xuICB0aGlzLmluaXQgICAgICAgID0gdGhpcy5jb25maWd1cmVJbml0VHJhbnNpdGlvbihvcHRpb25zLmluaXQpO1xuICB0aGlzLmRhdGEgICAgICAgID0gdGhpcy5jb25maWd1cmVEYXRhKG9wdGlvbnMuZGF0YSk7XG4gIHRoaXMubWV0aG9kcyAgICAgPSB0aGlzLmNvbmZpZ3VyZU1ldGhvZHMob3B0aW9ucy5tZXRob2RzKTtcblxuICB0aGlzLm1hcFt0aGlzLmRlZmF1bHRzLndpbGRjYXJkXSA9IHt9O1xuXG4gIHRoaXMuY29uZmlndXJlVHJhbnNpdGlvbnMob3B0aW9ucy50cmFuc2l0aW9ucyB8fCBbXSk7XG5cbiAgdGhpcy5wbHVnaW5zID0gdGhpcy5jb25maWd1cmVQbHVnaW5zKG9wdGlvbnMucGx1Z2lucywgU3RhdGVNYWNoaW5lLnBsdWdpbik7XG5cbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1peGluKENvbmZpZy5wcm90b3R5cGUsIHtcblxuICBhZGRTdGF0ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIGlmICghdGhpcy5tYXBbbmFtZV0pIHtcbiAgICAgIHRoaXMuc3RhdGVzLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLmFkZFN0YXRlTGlmZWN5Y2xlTmFtZXMobmFtZSk7XG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IHt9O1xuICAgIH1cbiAgfSxcblxuICBhZGRTdGF0ZUxpZmVjeWNsZU5hbWVzOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5saWZlY3ljbGUub25FbnRlcltuYW1lXSA9IGNhbWVsaXplLnByZXBlbmRlZCgnb25FbnRlcicsIG5hbWUpO1xuICAgIHRoaXMubGlmZWN5Y2xlLm9uTGVhdmVbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uTGVhdmUnLCBuYW1lKTtcbiAgICB0aGlzLmxpZmVjeWNsZS5vbltuYW1lXSAgICAgID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbicsICAgICAgbmFtZSk7XG4gIH0sXG5cbiAgYWRkVHJhbnNpdGlvbjogZnVuY3Rpb24obmFtZSkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25zLmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25zLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLmFkZFRyYW5zaXRpb25MaWZlY3ljbGVOYW1lcyhuYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkVHJhbnNpdGlvbkxpZmVjeWNsZU5hbWVzOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5saWZlY3ljbGUub25CZWZvcmVbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uQmVmb3JlJywgbmFtZSk7XG4gICAgdGhpcy5saWZlY3ljbGUub25BZnRlcltuYW1lXSAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uQWZ0ZXInLCAgbmFtZSk7XG4gICAgdGhpcy5saWZlY3ljbGUub25bbmFtZV0gICAgICAgPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uJywgICAgICAgbmFtZSk7XG4gIH0sXG5cbiAgbWFwVHJhbnNpdGlvbjogZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICAgIHZhciBuYW1lID0gdHJhbnNpdGlvbi5uYW1lLFxuICAgICAgICBmcm9tID0gdHJhbnNpdGlvbi5mcm9tLFxuICAgICAgICB0byAgID0gdHJhbnNpdGlvbi50bztcbiAgICB0aGlzLmFkZFN0YXRlKGZyb20pO1xuICAgIGlmICh0eXBlb2YgdG8gIT09ICdmdW5jdGlvbicpXG4gICAgICB0aGlzLmFkZFN0YXRlKHRvKTtcbiAgICB0aGlzLmFkZFRyYW5zaXRpb24obmFtZSk7XG4gICAgdGhpcy5tYXBbZnJvbV1bbmFtZV0gPSB0cmFuc2l0aW9uO1xuICAgIHJldHVybiB0cmFuc2l0aW9uO1xuICB9LFxuXG4gIGNvbmZpZ3VyZUxpZmVjeWNsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uQmVmb3JlOiB7IHRyYW5zaXRpb246ICdvbkJlZm9yZVRyYW5zaXRpb24nIH0sXG4gICAgICBvbkFmdGVyOiAgeyB0cmFuc2l0aW9uOiAnb25BZnRlclRyYW5zaXRpb24nICB9LFxuICAgICAgb25FbnRlcjogIHsgc3RhdGU6ICAgICAgJ29uRW50ZXJTdGF0ZScgICAgICAgfSxcbiAgICAgIG9uTGVhdmU6ICB7IHN0YXRlOiAgICAgICdvbkxlYXZlU3RhdGUnICAgICAgIH0sXG4gICAgICBvbjogICAgICAgeyB0cmFuc2l0aW9uOiAnb25UcmFuc2l0aW9uJyAgICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBjb25maWd1cmVJbml0VHJhbnNpdGlvbjogZnVuY3Rpb24oaW5pdCkge1xuICAgIGlmICh0eXBlb2YgaW5pdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcFRyYW5zaXRpb24obWl4aW4oe30sIHRoaXMuZGVmYXVsdHMuaW5pdCwgeyB0bzogaW5pdCwgYWN0aXZlOiB0cnVlIH0pKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGluaXQgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBUcmFuc2l0aW9uKG1peGluKHt9LCB0aGlzLmRlZmF1bHRzLmluaXQsIGluaXQsIHsgYWN0aXZlOiB0cnVlIH0pKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFkZFN0YXRlKHRoaXMuZGVmYXVsdHMuaW5pdC5mcm9tKTtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRzLmluaXQ7XG4gICAgfVxuICB9LFxuXG4gIGNvbmZpZ3VyZURhdGE6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBkYXRhOyB9XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4ge307ICB9XG4gIH0sXG5cbiAgY29uZmlndXJlTWV0aG9kczogZnVuY3Rpb24obWV0aG9kcykge1xuICAgIHJldHVybiBtZXRob2RzIHx8IHt9O1xuICB9LFxuXG4gIGNvbmZpZ3VyZVBsdWdpbnM6IGZ1bmN0aW9uKHBsdWdpbnMsIGJ1aWx0aW4pIHtcbiAgICBwbHVnaW5zID0gcGx1Z2lucyB8fCBbXTtcbiAgICB2YXIgbiwgbWF4LCBwbHVnaW47XG4gICAgZm9yKG4gPSAwLCBtYXggPSBwbHVnaW5zLmxlbmd0aCA7IG4gPCBtYXggOyBuKyspIHtcbiAgICAgIHBsdWdpbiA9IHBsdWdpbnNbbl07XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcGx1Z2luc1tuXSA9IHBsdWdpbiA9IHBsdWdpbigpXG4gICAgICBpZiAocGx1Z2luLmNvbmZpZ3VyZSlcbiAgICAgICAgcGx1Z2luLmNvbmZpZ3VyZSh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBsdWdpbnNcbiAgfSxcblxuICBjb25maWd1cmVUcmFuc2l0aW9uczogZnVuY3Rpb24odHJhbnNpdGlvbnMpIHtcbiAgICB2YXIgaSwgbiwgdHJhbnNpdGlvbiwgZnJvbSwgdG8sIHdpbGRjYXJkID0gdGhpcy5kZWZhdWx0cy53aWxkY2FyZDtcbiAgICBmb3IobiA9IDAgOyBuIDwgdHJhbnNpdGlvbnMubGVuZ3RoIDsgbisrKSB7XG4gICAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbnNbbl07XG4gICAgICBmcm9tICA9IEFycmF5LmlzQXJyYXkodHJhbnNpdGlvbi5mcm9tKSA/IHRyYW5zaXRpb24uZnJvbSA6IFt0cmFuc2l0aW9uLmZyb20gfHwgd2lsZGNhcmRdXG4gICAgICB0byAgICA9IHRyYW5zaXRpb24udG8gfHwgd2lsZGNhcmQ7XG4gICAgICBmb3IoaSA9IDAgOyBpIDwgZnJvbS5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgdGhpcy5tYXBUcmFuc2l0aW9uKHsgbmFtZTogdHJhbnNpdGlvbi5uYW1lLCBmcm9tOiBmcm9tW2ldLCB0bzogdG8gfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRyYW5zaXRpb25Gb3I6IGZ1bmN0aW9uKHN0YXRlLCB0cmFuc2l0aW9uKSB7XG4gICAgdmFyIHdpbGRjYXJkID0gdGhpcy5kZWZhdWx0cy53aWxkY2FyZDtcbiAgICByZXR1cm4gdGhpcy5tYXBbc3RhdGVdW3RyYW5zaXRpb25dIHx8XG4gICAgICAgICAgIHRoaXMubWFwW3dpbGRjYXJkXVt0cmFuc2l0aW9uXTtcbiAgfSxcblxuICB0cmFuc2l0aW9uc0ZvcjogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICB2YXIgd2lsZGNhcmQgPSB0aGlzLmRlZmF1bHRzLndpbGRjYXJkO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1hcFtzdGF0ZV0pLmNvbmNhdChPYmplY3Qua2V5cyh0aGlzLm1hcFt3aWxkY2FyZF0pKTtcbiAgfSxcblxuICBhbGxTdGF0ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcztcbiAgfSxcblxuICBhbGxUcmFuc2l0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbnM7XG4gIH1cblxufSk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbmZpZztcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblxudmFyIG1peGluICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxuICAgIEV4Y2VwdGlvbiAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLFxuICAgIHBsdWdpbiAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIFVOT0JTRVJWRUQgPSBbIG51bGwsIFtdIF07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBKU00oY29udGV4dCwgY29uZmlnKSB7XG4gIHRoaXMuY29udGV4dCAgID0gY29udGV4dDtcbiAgdGhpcy5jb25maWcgICAgPSBjb25maWc7XG4gIHRoaXMuc3RhdGUgICAgID0gY29uZmlnLmluaXQuZnJvbTtcbiAgdGhpcy5vYnNlcnZlcnMgPSBbY29udGV4dF07XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5taXhpbihKU00ucHJvdG90eXBlLCB7XG5cbiAgaW5pdDogZnVuY3Rpb24oYXJncykge1xuICAgIG1peGluKHRoaXMuY29udGV4dCwgdGhpcy5jb25maWcuZGF0YS5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3MpKTtcbiAgICBwbHVnaW4uaG9vayh0aGlzLCAnaW5pdCcpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5pbml0LmFjdGl2ZSlcbiAgICAgIHJldHVybiB0aGlzLmZpcmUodGhpcy5jb25maWcuaW5pdC5uYW1lLCBbXSk7XG4gIH0sXG5cbiAgaXM6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RhdGUpID8gKHN0YXRlLmluZGV4T2YodGhpcy5zdGF0ZSkgPj0gMCkgOiAodGhpcy5zdGF0ZSA9PT0gc3RhdGUpO1xuICB9LFxuXG4gIGlzUGVuZGluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZztcbiAgfSxcblxuICBjYW46IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcbiAgICByZXR1cm4gIXRoaXMuaXNQZW5kaW5nKCkgJiYgISF0aGlzLnNlZWsodHJhbnNpdGlvbik7XG4gIH0sXG5cbiAgY2Fubm90OiBmdW5jdGlvbih0cmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuICF0aGlzLmNhbih0cmFuc2l0aW9uKTtcbiAgfSxcblxuICBhbGxTdGF0ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hbGxTdGF0ZXMoKTtcbiAgfSxcblxuICBhbGxUcmFuc2l0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFsbFRyYW5zaXRpb25zKCk7XG4gIH0sXG5cbiAgdHJhbnNpdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2l0aW9uc0Zvcih0aGlzLnN0YXRlKTtcbiAgfSxcblxuICBzZWVrOiBmdW5jdGlvbih0cmFuc2l0aW9uLCBhcmdzKSB7XG4gICAgdmFyIHdpbGRjYXJkID0gdGhpcy5jb25maWcuZGVmYXVsdHMud2lsZGNhcmQsXG4gICAgICAgIGVudHJ5ICAgID0gdGhpcy5jb25maWcudHJhbnNpdGlvbkZvcih0aGlzLnN0YXRlLCB0cmFuc2l0aW9uKSxcbiAgICAgICAgdG8gICAgICAgPSBlbnRyeSAmJiBlbnRyeS50bztcbiAgICBpZiAodHlwZW9mIHRvID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuIHRvLmFwcGx5KHRoaXMuY29udGV4dCwgYXJncyk7XG4gICAgZWxzZSBpZiAodG8gPT09IHdpbGRjYXJkKVxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGVcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdG9cbiAgfSxcblxuICBmaXJlOiBmdW5jdGlvbih0cmFuc2l0aW9uLCBhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNpdCh0cmFuc2l0aW9uLCB0aGlzLnN0YXRlLCB0aGlzLnNlZWsodHJhbnNpdGlvbiwgYXJncyksIGFyZ3MpO1xuICB9LFxuXG4gIHRyYW5zaXQ6IGZ1bmN0aW9uKHRyYW5zaXRpb24sIGZyb20sIHRvLCBhcmdzKSB7XG5cbiAgICB2YXIgbGlmZWN5Y2xlID0gdGhpcy5jb25maWcubGlmZWN5Y2xlLFxuICAgICAgICBjaGFuZ2VkICAgPSB0aGlzLmNvbmZpZy5vcHRpb25zLm9ic2VydmVVbmNoYW5nZWRTdGF0ZSB8fCAoZnJvbSAhPT0gdG8pO1xuXG4gICAgaWYgKCF0bylcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQub25JbnZhbGlkVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0byk7XG5cbiAgICBpZiAodGhpcy5pc1BlbmRpbmcoKSlcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQub25QZW5kaW5nVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0byk7XG5cbiAgICB0aGlzLmNvbmZpZy5hZGRTdGF0ZSh0byk7ICAvLyBtaWdodCBuZWVkIHRvIGFkZCB0aGlzIHN0YXRlIGlmIGl0J3MgdW5rbm93biAoZS5nLiBjb25kaXRpb25hbCB0cmFuc2l0aW9uIG9yIGdvdG8pXG5cbiAgICB0aGlzLmJlZ2luVHJhbnNpdCgpO1xuXG4gICAgYXJncy51bnNoaWZ0KHsgICAgICAgICAgICAgLy8gdGhpcyBjb250ZXh0IHdpbGwgYmUgcGFzc2VkIHRvIGVhY2ggbGlmZWN5Y2xlIGV2ZW50IG9ic2VydmVyXG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuICAgICAgZnJvbTogICAgICAgZnJvbSxcbiAgICAgIHRvOiAgICAgICAgIHRvLFxuICAgICAgZnNtOiAgICAgICAgdGhpcy5jb250ZXh0XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5vYnNlcnZlRXZlbnRzKFtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkJlZm9yZS50cmFuc2l0aW9uKSxcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkJlZm9yZVt0cmFuc2l0aW9uXSksXG4gICAgICBjaGFuZ2VkID8gdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25MZWF2ZS5zdGF0ZSkgOiBVTk9CU0VSVkVELFxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uTGVhdmVbZnJvbV0pIDogVU5PQlNFUlZFRCxcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbi50cmFuc2l0aW9uKSxcbiAgICAgIGNoYW5nZWQgPyBbICdkb1RyYW5zaXQnLCBbIHRoaXMgXSBdICAgICAgICAgICAgICAgICAgICAgICA6IFVOT0JTRVJWRUQsXG4gICAgICBjaGFuZ2VkID8gdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25FbnRlci5zdGF0ZSkgOiBVTk9CU0VSVkVELFxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uRW50ZXJbdG9dKSAgIDogVU5PQlNFUlZFRCxcbiAgICAgIGNoYW5nZWQgPyB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vblt0b10pICAgICAgICA6IFVOT0JTRVJWRUQsXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25BZnRlci50cmFuc2l0aW9uKSxcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkFmdGVyW3RyYW5zaXRpb25dKSxcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vblt0cmFuc2l0aW9uXSlcbiAgICBdLCBhcmdzKTtcbiAgfSxcblxuICBiZWdpblRyYW5zaXQ6IGZ1bmN0aW9uKCkgICAgICAgICAgeyB0aGlzLnBlbmRpbmcgPSB0cnVlOyAgICAgICAgICAgICAgICAgfSxcbiAgZW5kVHJhbnNpdDogICBmdW5jdGlvbihyZXN1bHQpICAgIHsgdGhpcy5wZW5kaW5nID0gZmFsc2U7IHJldHVybiByZXN1bHQ7IH0sXG4gIGZhaWxUcmFuc2l0OiAgZnVuY3Rpb24ocmVzdWx0KSAgICB7IHRoaXMucGVuZGluZyA9IGZhbHNlOyAvKnRocm93IHJlc3VsdDsqLyB9LFxuICBkb1RyYW5zaXQ6ICAgIGZ1bmN0aW9uKGxpZmVjeWNsZSkgeyB0aGlzLnN0YXRlID0gbGlmZWN5Y2xlLnRvOyAgICAgICAgICAgfSxcblxuICBvYnNlcnZlOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSB7fTtcbiAgICAgIG9ic2VydmVyW2FyZ3NbMF1dID0gYXJnc1sxXTtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goYXJnc1swXSk7XG4gICAgfVxuICB9LFxuXG4gIG9ic2VydmVyc0ZvckV2ZW50OiBmdW5jdGlvbihldmVudCkgeyAvLyBUT0RPOiB0aGlzIGNvdWxkIGJlIGNhY2hlZFxuICAgIHZhciBuID0gMCwgbWF4ID0gdGhpcy5vYnNlcnZlcnMubGVuZ3RoLCBvYnNlcnZlciwgcmVzdWx0ID0gW107XG4gICAgZm9yKCA7IG4gPCBtYXggOyBuKyspIHtcbiAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNbbl07XG4gICAgICBpZiAob2JzZXJ2ZXJbZXZlbnRdKVxuICAgICAgICByZXN1bHQucHVzaChvYnNlcnZlcik7XG4gICAgfVxuICAgIHJldHVybiBbIGV2ZW50LCByZXN1bHQsIHRydWUgXVxuICB9LFxuXG4gIG9ic2VydmVFdmVudHM6IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgcHJldmlvdXNFdmVudCwgcHJldmlvdXNSZXN1bHQpIHtcbiAgICBpZiAoZXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kVHJhbnNpdChwcmV2aW91c1Jlc3VsdCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHByZXZpb3VzUmVzdWx0KTtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnQgICAgID0gZXZlbnRzWzBdWzBdLFxuICAgICAgICBvYnNlcnZlcnMgPSBldmVudHNbMF1bMV0sXG4gICAgICAgIHBsdWdnYWJsZSA9IGV2ZW50c1swXVsyXTtcblxuICAgIGFyZ3NbMF0uZXZlbnQgPSBldmVudDtcbiAgICBpZiAoZXZlbnQgJiYgcGx1Z2dhYmxlICYmIGV2ZW50ICE9PSBwcmV2aW91c0V2ZW50KVxuICAgICAgcGx1Z2luLmhvb2sodGhpcywgJ2xpZmVjeWNsZScsIGFyZ3MpO1xuXG4gICAgaWYgKG9ic2VydmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGV2ZW50cy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2ZUV2ZW50cyhldmVudHMsIGFyZ3MsIGV2ZW50LCBwcmV2aW91c1Jlc3VsdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG9ic2VydmVyID0gb2JzZXJ2ZXJzLnNoaWZ0KCksXG4gICAgICAgICAgcmVzdWx0ID0gb2JzZXJ2ZXJbZXZlbnRdLmFwcGx5KG9ic2VydmVyLCBhcmdzKTtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQudGhlbih0aGlzLm9ic2VydmVFdmVudHMuYmluZCh0aGlzLCBldmVudHMsIGFyZ3MsIGV2ZW50KSlcbiAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmZhaWxUcmFuc2l0LmJpbmQodGhpcykpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZFRyYW5zaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9ic2VydmVFdmVudHMoZXZlbnRzLCBhcmdzLCBldmVudCwgcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgb25JbnZhbGlkVHJhbnNpdGlvbjogZnVuY3Rpb24odHJhbnNpdGlvbiwgZnJvbSwgdG8pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwidHJhbnNpdGlvbiBpcyBpbnZhbGlkIGluIGN1cnJlbnQgc3RhdGVcIiwgdHJhbnNpdGlvbiwgZnJvbSwgdG8sIHRoaXMuc3RhdGUpO1xuICB9LFxuXG4gIG9uUGVuZGluZ1RyYW5zaXRpb246IGZ1bmN0aW9uKHRyYW5zaXRpb24sIGZyb20sIHRvKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcInRyYW5zaXRpb24gaXMgaW52YWxpZCB3aGlsZSBwcmV2aW91cyB0cmFuc2l0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzXCIsIHRyYW5zaXRpb24sIGZyb20sIHRvLCB0aGlzLnN0YXRlKTtcbiAgfVxuXG59KTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gSlNNO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgbWl4aW4gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxuICAgIGNhbWVsaXplID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKSxcbiAgICBwbHVnaW4gICA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gICAgQ29uZmlnICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpLFxuICAgIEpTTSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgUHVibGljTWV0aG9kcyA9IHtcbiAgaXM6ICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3RhdGUpICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5pcyhzdGF0ZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgY2FuOiAgICAgICAgICAgICAgICAgZnVuY3Rpb24odHJhbnNpdGlvbikgIHsgcmV0dXJuIHRoaXMuX2ZzbS5jYW4odHJhbnNpdGlvbikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgY2Fubm90OiAgICAgICAgICAgICAgZnVuY3Rpb24odHJhbnNpdGlvbikgIHsgcmV0dXJuIHRoaXMuX2ZzbS5jYW5ub3QodHJhbnNpdGlvbikgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgb2JzZXJ2ZTogICAgICAgICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5vYnNlcnZlKGFyZ3VtZW50cykgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgdHJhbnNpdGlvbnM6ICAgICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS50cmFuc2l0aW9ucygpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgYWxsVHJhbnNpdGlvbnM6ICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5hbGxUcmFuc2l0aW9ucygpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgYWxsU3RhdGVzOiAgICAgICAgICAgZnVuY3Rpb24oKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2ZzbS5hbGxTdGF0ZXMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgb25JbnZhbGlkVHJhbnNpdGlvbjogZnVuY3Rpb24odCwgZnJvbSwgdG8pIHsgcmV0dXJuIHRoaXMuX2ZzbS5vbkludmFsaWRUcmFuc2l0aW9uKHQsIGZyb20sIHRvKSAgICAgICAgICAgICAgfSxcbiAgb25QZW5kaW5nVHJhbnNpdGlvbjogZnVuY3Rpb24odCwgZnJvbSwgdG8pIHsgcmV0dXJuIHRoaXMuX2ZzbS5vblBlbmRpbmdUcmFuc2l0aW9uKHQsIGZyb20sIHRvKSAgICAgICAgICAgICAgfSxcbn1cblxudmFyIFB1YmxpY1Byb3BlcnRpZXMgPSB7XG4gIHN0YXRlOiB7XG4gICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mc20uc3RhdGU7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB0aHJvdyBFcnJvcigndXNlIHRyYW5zaXRpb25zIHRvIGNoYW5nZSBzdGF0ZScpXG4gICAgfVxuICB9XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gU3RhdGVNYWNoaW5lKG9wdGlvbnMpIHtcbiAgcmV0dXJuIGFwcGx5KHRoaXMgfHwge30sIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBmYWN0b3J5KCkge1xuICB2YXIgY3N0b3IsIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY3N0b3IgICA9IGFyZ3VtZW50c1swXTtcbiAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICB9XG4gIGVsc2Uge1xuICAgIGNzdG9yICAgPSBmdW5jdGlvbigpIHsgdGhpcy5fZnNtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfTtcbiAgICBvcHRpb25zID0gYXJndW1lbnRzWzBdIHx8IHt9O1xuICB9XG4gIHZhciBjb25maWcgPSBuZXcgQ29uZmlnKG9wdGlvbnMsIFN0YXRlTWFjaGluZSk7XG4gIGJ1aWxkKGNzdG9yLnByb3RvdHlwZSwgY29uZmlnKTtcbiAgY3N0b3IucHJvdG90eXBlLl9mc20uY29uZmlnID0gY29uZmlnOyAvLyBjb252ZW5pZW5jZSBhY2Nlc3MgdG8gc2hhcmVkIGNvbmZpZyB3aXRob3V0IG5lZWRpbmcgYW4gaW5zdGFuY2VcbiAgcmV0dXJuIGNzdG9yO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYXBwbHkoaW5zdGFuY2UsIG9wdGlvbnMpIHtcbiAgdmFyIGNvbmZpZyA9IG5ldyBDb25maWcob3B0aW9ucywgU3RhdGVNYWNoaW5lKTtcbiAgYnVpbGQoaW5zdGFuY2UsIGNvbmZpZyk7XG4gIGluc3RhbmNlLl9mc20oKTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5mdW5jdGlvbiBidWlsZCh0YXJnZXQsIGNvbmZpZykge1xuICBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB8fCBBcnJheS5pc0FycmF5KHRhcmdldCkpXG4gICAgdGhyb3cgRXJyb3IoJ1N0YXRlTWFjaGluZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIG9iamVjdHMnKTtcbiAgcGx1Z2luLmJ1aWxkKHRhcmdldCwgY29uZmlnKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBQdWJsaWNQcm9wZXJ0aWVzKTtcbiAgbWl4aW4odGFyZ2V0LCBQdWJsaWNNZXRob2RzKTtcbiAgbWl4aW4odGFyZ2V0LCBjb25maWcubWV0aG9kcyk7XG4gIGNvbmZpZy5hbGxUcmFuc2l0aW9ucygpLmZvckVhY2goZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICAgIHRhcmdldFtjYW1lbGl6ZSh0cmFuc2l0aW9uKV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mc20uZmlyZSh0cmFuc2l0aW9uLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgfVxuICB9KTtcbiAgdGFyZ2V0Ll9mc20gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9mc20gPSBuZXcgSlNNKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy5fZnNtLmluaXQoYXJndW1lbnRzKTtcbiAgfVxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblN0YXRlTWFjaGluZS52ZXJzaW9uICA9ICczLjAuMSc7XG5TdGF0ZU1hY2hpbmUuZmFjdG9yeSAgPSBmYWN0b3J5O1xuU3RhdGVNYWNoaW5lLmFwcGx5ICAgID0gYXBwbHk7XG5TdGF0ZU1hY2hpbmUuZGVmYXVsdHMgPSB7XG4gIHdpbGRjYXJkOiAnKicsXG4gIGluaXQ6IHtcbiAgICBuYW1lOiAnaW5pdCcsXG4gICAgZnJvbTogJ25vbmUnXG4gIH1cbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlTWFjaGluZTtcblxuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXNzYWdlLCB0cmFuc2l0aW9uLCBmcm9tLCB0bywgY3VycmVudCkge1xuICB0aGlzLm1lc3NhZ2UgICAgPSBtZXNzYWdlO1xuICB0aGlzLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICB0aGlzLmZyb20gICAgICAgPSBmcm9tO1xuICB0aGlzLnRvICAgICAgICAgPSB0bztcbiAgdGhpcy5jdXJyZW50ICAgID0gY3VycmVudDtcbn1cblxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTsiXX0=