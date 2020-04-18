
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3N0YXRlLW1hY2hpbmUuanMiXSwibmFtZXMiOlsid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwidmFsdWUiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJuIiwiX19lc01vZHVsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwidGFyZ2V0Iiwic291cmNlcyIsInNvdXJjZSIsImtleSIsImFyZ3VtZW50cyIsImxlbmd0aCIsIm1peGluIiwiYnVpbGQiLCJjb25maWciLCJtYXgiLCJwbHVnaW4iLCJwbHVnaW5zIiwibWV0aG9kcyIsInByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiaG9vayIsImZzbSIsImFkZGl0aW9uYWwiLCJtZXRob2QiLCJhcmdzIiwiY29udGV4dCIsImNvbmNhdCIsImFwcGx5IiwiY2FtZWxpemUiLCJsYWJlbCIsInJlc3VsdCIsIndvcmQiLCJ3b3JkcyIsInNwbGl0IiwidG9Mb3dlckNhc2UiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsInByZXBlbmRlZCIsInByZXBlbmQiLCJDb25maWciLCJvcHRpb25zIiwiU3RhdGVNYWNoaW5lIiwiZGVmYXVsdHMiLCJzdGF0ZXMiLCJ0cmFuc2l0aW9ucyIsIm1hcCIsImxpZmVjeWNsZSIsImNvbmZpZ3VyZUxpZmVjeWNsZSIsImluaXQiLCJjb25maWd1cmVJbml0VHJhbnNpdGlvbiIsImRhdGEiLCJjb25maWd1cmVEYXRhIiwiY29uZmlndXJlTWV0aG9kcyIsIndpbGRjYXJkIiwiY29uZmlndXJlVHJhbnNpdGlvbnMiLCJjb25maWd1cmVQbHVnaW5zIiwiYWRkU3RhdGUiLCJwdXNoIiwiYWRkU3RhdGVMaWZlY3ljbGVOYW1lcyIsIm9uRW50ZXIiLCJvbkxlYXZlIiwib24iLCJhZGRUcmFuc2l0aW9uIiwiaW5kZXhPZiIsImFkZFRyYW5zaXRpb25MaWZlY3ljbGVOYW1lcyIsIm9uQmVmb3JlIiwib25BZnRlciIsIm1hcFRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwiZnJvbSIsInRvIiwic3RhdGUiLCJhY3RpdmUiLCJidWlsdGluIiwiY29uZmlndXJlIiwiQXJyYXkiLCJpc0FycmF5IiwidHJhbnNpdGlvbkZvciIsInRyYW5zaXRpb25zRm9yIiwia2V5cyIsImFsbFN0YXRlcyIsImFsbFRyYW5zaXRpb25zIiwiRXhjZXB0aW9uIiwiVU5PQlNFUlZFRCIsIkpTTSIsIm9ic2VydmVycyIsImZpcmUiLCJpcyIsImlzUGVuZGluZyIsInBlbmRpbmciLCJjYW4iLCJzZWVrIiwiY2Fubm90IiwiZW50cnkiLCJ0cmFuc2l0IiwiY2hhbmdlZCIsIm9ic2VydmVVbmNoYW5nZWRTdGF0ZSIsIm9uSW52YWxpZFRyYW5zaXRpb24iLCJvblBlbmRpbmdUcmFuc2l0aW9uIiwiYmVnaW5UcmFuc2l0IiwidW5zaGlmdCIsIm9ic2VydmVFdmVudHMiLCJvYnNlcnZlcnNGb3JFdmVudCIsImVuZFRyYW5zaXQiLCJmYWlsVHJhbnNpdCIsImRvVHJhbnNpdCIsIm9ic2VydmUiLCJvYnNlcnZlciIsImV2ZW50IiwiZXZlbnRzIiwicHJldmlvdXNFdmVudCIsInByZXZpb3VzUmVzdWx0IiwidW5kZWZpbmVkIiwicGx1Z2dhYmxlIiwic2hpZnQiLCJ0aGVuIiwiYmluZCIsIlB1YmxpY01ldGhvZHMiLCJfZnNtIiwidCIsIlB1YmxpY1Byb3BlcnRpZXMiLCJzZXQiLCJFcnJvciIsImNzdG9y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QUFBQSxNQUFNLENBQUNELE9BQVAsR0FBaUJzRSxZQUFqQjtBQUdBO0FBQU8sS0E1akJHO0FBNmpCVjs7QUFDQTtBQUFPLGNBQVNyRSxNQUFULEVBQWlCRCxPQUFqQixFQUEwQk0sbUJBQTFCLEVBQStDO0FBRXREOztBQUdBTCxNQUFBQSxNQUFNLENBQUNELE9BQVAsR0FBaUIsVUFBUzZKLE9BQVQsRUFBa0I1RCxVQUFsQixFQUE4QkMsSUFBOUIsRUFBb0NDLEVBQXBDLEVBQXdDMkQsT0FBeEMsRUFBaUQ7QUFDaEUsYUFBS0QsT0FBTCxHQUFrQkEsT0FBbEI7QUFDQSxhQUFLNUQsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxhQUFLQyxJQUFMLEdBQWtCQSxJQUFsQjtBQUNBLGFBQUtDLEVBQUwsR0FBa0JBLEVBQWxCO0FBQ0EsYUFBSzJELE9BQUwsR0FBa0JBLE9BQWxCO0FBQ0QsT0FORDtBQVNBOztBQUFPO0FBQ1A7QUE3a0JVLEtBcEVNO0FBQWhCO0FBa3BCQyxDQTVwQkQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiU3RhdGVNYWNoaW5lXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlN0YXRlTWFjaGluZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTdGF0ZU1hY2hpbmVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgdmFyIG4sIHNvdXJjZSwga2V5O1xuICBmb3IobiA9IDEgOyBuIDwgYXJndW1lbnRzLmxlbmd0aCA7IG4rKykge1xuICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tuXTtcbiAgICBmb3Ioa2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIG1peGluID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGJ1aWxkOiBmdW5jdGlvbih0YXJnZXQsIGNvbmZpZykge1xuICAgIHZhciBuLCBtYXgsIHBsdWdpbiwgcGx1Z2lucyA9IGNvbmZpZy5wbHVnaW5zO1xuICAgIGZvcihuID0gMCwgbWF4ID0gcGx1Z2lucy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKSB7XG4gICAgICBwbHVnaW4gPSBwbHVnaW5zW25dO1xuICAgICAgaWYgKHBsdWdpbi5tZXRob2RzKVxuICAgICAgICBtaXhpbih0YXJnZXQsIHBsdWdpbi5tZXRob2RzKTtcbiAgICAgIGlmIChwbHVnaW4ucHJvcGVydGllcylcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwbHVnaW4ucHJvcGVydGllcyk7XG4gICAgfVxuICB9LFxuXG4gIGhvb2s6IGZ1bmN0aW9uKGZzbSwgbmFtZSwgYWRkaXRpb25hbCkge1xuICAgIHZhciBuLCBtYXgsIG1ldGhvZCwgcGx1Z2luLFxuICAgICAgICBwbHVnaW5zID0gZnNtLmNvbmZpZy5wbHVnaW5zLFxuICAgICAgICBhcmdzICAgID0gW2ZzbS5jb250ZXh0XTtcblxuICAgIGlmIChhZGRpdGlvbmFsKVxuICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KGFkZGl0aW9uYWwpXG5cbiAgICBmb3IobiA9IDAsIG1heCA9IHBsdWdpbnMubGVuZ3RoIDsgbiA8IG1heCA7IG4rKykge1xuICAgICAgcGx1Z2luID0gcGx1Z2luc1tuXVxuICAgICAgbWV0aG9kID0gcGx1Z2luc1tuXVtuYW1lXVxuICAgICAgaWYgKG1ldGhvZClcbiAgICAgICAgbWV0aG9kLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gICAgfVxuICB9XG5cbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBjYW1lbGl6ZShsYWJlbCkge1xuXG4gIGlmIChsYWJlbC5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGxhYmVsO1xuXG4gIHZhciBuLCByZXN1bHQsIHdvcmQsIHdvcmRzID0gbGFiZWwuc3BsaXQoL1tfLV0vKTtcblxuICAvLyBzaW5nbGUgd29yZCB3aXRoIGZpcnN0IGNoYXJhY3RlciBhbHJlYWR5IGxvd2VyY2FzZSwgcmV0dXJuIHVudG91Y2hlZFxuICBpZiAoKHdvcmRzLmxlbmd0aCA9PT0gMSkgJiYgKHdvcmRzWzBdWzBdLnRvTG93ZXJDYXNlKCkgPT09IHdvcmRzWzBdWzBdKSlcbiAgICByZXR1cm4gbGFiZWw7XG5cbiAgcmVzdWx0ID0gd29yZHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgZm9yKG4gPSAxIDsgbiA8IHdvcmRzLmxlbmd0aCA7IG4rKykge1xuICAgIHJlc3VsdCA9IHJlc3VsdCArIHdvcmRzW25dLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZHNbbl0uc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2FtZWxpemUucHJlcGVuZGVkID0gZnVuY3Rpb24ocHJlcGVuZCwgbGFiZWwpIHtcbiAgbGFiZWwgPSBjYW1lbGl6ZShsYWJlbCk7XG4gIHJldHVybiBwcmVwZW5kICsgbGFiZWxbMF0udG9VcHBlckNhc2UoKSArIGxhYmVsLnN1YnN0cmluZygxKTtcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxpemU7XG5cblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgbWl4aW4gICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxuICAgIGNhbWVsaXplID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIENvbmZpZyhvcHRpb25zLCBTdGF0ZU1hY2hpbmUpIHtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uczsgLy8gcHJlc2VydmluZyBvcmlnaW5hbCBvcHRpb25zIGNhbiBiZSB1c2VmdWwgKGUuZyB2aXN1YWxpemUgcGx1Z2luKVxuICB0aGlzLmRlZmF1bHRzICAgID0gU3RhdGVNYWNoaW5lLmRlZmF1bHRzO1xuICB0aGlzLnN0YXRlcyAgICAgID0gW107XG4gIHRoaXMudHJhbnNpdGlvbnMgPSBbXTtcbiAgdGhpcy5tYXAgICAgICAgICA9IHt9O1xuICB0aGlzLmxpZmVjeWNsZSAgID0gdGhpcy5jb25maWd1cmVMaWZlY3ljbGUoKTtcbiAgdGhpcy5pbml0ICAgICAgICA9IHRoaXMuY29uZmlndXJlSW5pdFRyYW5zaXRpb24ob3B0aW9ucy5pbml0KTtcbiAgdGhpcy5kYXRhICAgICAgICA9IHRoaXMuY29uZmlndXJlRGF0YShvcHRpb25zLmRhdGEpO1xuICB0aGlzLm1ldGhvZHMgICAgID0gdGhpcy5jb25maWd1cmVNZXRob2RzKG9wdGlvbnMubWV0aG9kcyk7XG5cbiAgdGhpcy5tYXBbdGhpcy5kZWZhdWx0cy53aWxkY2FyZF0gPSB7fTtcblxuICB0aGlzLmNvbmZpZ3VyZVRyYW5zaXRpb25zKG9wdGlvbnMudHJhbnNpdGlvbnMgfHwgW10pO1xuXG4gIHRoaXMucGx1Z2lucyA9IHRoaXMuY29uZmlndXJlUGx1Z2lucyhvcHRpb25zLnBsdWdpbnMsIFN0YXRlTWFjaGluZS5wbHVnaW4pO1xuXG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5taXhpbihDb25maWcucHJvdG90eXBlLCB7XG5cbiAgYWRkU3RhdGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMubWFwW25hbWVdKSB7XG4gICAgICB0aGlzLnN0YXRlcy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5hZGRTdGF0ZUxpZmVjeWNsZU5hbWVzKG5hbWUpO1xuICAgICAgdGhpcy5tYXBbbmFtZV0gPSB7fTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkU3RhdGVMaWZlY3ljbGVOYW1lczogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMubGlmZWN5Y2xlLm9uRW50ZXJbbmFtZV0gPSBjYW1lbGl6ZS5wcmVwZW5kZWQoJ29uRW50ZXInLCBuYW1lKTtcbiAgICB0aGlzLmxpZmVjeWNsZS5vbkxlYXZlW25hbWVdID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbkxlYXZlJywgbmFtZSk7XG4gICAgdGhpcy5saWZlY3ljbGUub25bbmFtZV0gICAgICA9IGNhbWVsaXplLnByZXBlbmRlZCgnb24nLCAgICAgIG5hbWUpO1xuICB9LFxuXG4gIGFkZFRyYW5zaXRpb246IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9ucy5pbmRleE9mKG5hbWUpIDwgMCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9ucy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5hZGRUcmFuc2l0aW9uTGlmZWN5Y2xlTmFtZXMobmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIGFkZFRyYW5zaXRpb25MaWZlY3ljbGVOYW1lczogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMubGlmZWN5Y2xlLm9uQmVmb3JlW25hbWVdID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbkJlZm9yZScsIG5hbWUpO1xuICAgIHRoaXMubGlmZWN5Y2xlLm9uQWZ0ZXJbbmFtZV0gID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbkFmdGVyJywgIG5hbWUpO1xuICAgIHRoaXMubGlmZWN5Y2xlLm9uW25hbWVdICAgICAgID0gY2FtZWxpemUucHJlcGVuZGVkKCdvbicsICAgICAgIG5hbWUpO1xuICB9LFxuXG4gIG1hcFRyYW5zaXRpb246IGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcbiAgICB2YXIgbmFtZSA9IHRyYW5zaXRpb24ubmFtZSxcbiAgICAgICAgZnJvbSA9IHRyYW5zaXRpb24uZnJvbSxcbiAgICAgICAgdG8gICA9IHRyYW5zaXRpb24udG87XG4gICAgdGhpcy5hZGRTdGF0ZShmcm9tKTtcbiAgICBpZiAodHlwZW9mIHRvICE9PSAnZnVuY3Rpb24nKVxuICAgICAgdGhpcy5hZGRTdGF0ZSh0byk7XG4gICAgdGhpcy5hZGRUcmFuc2l0aW9uKG5hbWUpO1xuICAgIHRoaXMubWFwW2Zyb21dW25hbWVdID0gdHJhbnNpdGlvbjtcbiAgICByZXR1cm4gdHJhbnNpdGlvbjtcbiAgfSxcblxuICBjb25maWd1cmVMaWZlY3ljbGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkJlZm9yZTogeyB0cmFuc2l0aW9uOiAnb25CZWZvcmVUcmFuc2l0aW9uJyB9LFxuICAgICAgb25BZnRlcjogIHsgdHJhbnNpdGlvbjogJ29uQWZ0ZXJUcmFuc2l0aW9uJyAgfSxcbiAgICAgIG9uRW50ZXI6ICB7IHN0YXRlOiAgICAgICdvbkVudGVyU3RhdGUnICAgICAgIH0sXG4gICAgICBvbkxlYXZlOiAgeyBzdGF0ZTogICAgICAnb25MZWF2ZVN0YXRlJyAgICAgICB9LFxuICAgICAgb246ICAgICAgIHsgdHJhbnNpdGlvbjogJ29uVHJhbnNpdGlvbicgICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgY29uZmlndXJlSW5pdFRyYW5zaXRpb246IGZ1bmN0aW9uKGluaXQpIHtcbiAgICBpZiAodHlwZW9mIGluaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBUcmFuc2l0aW9uKG1peGluKHt9LCB0aGlzLmRlZmF1bHRzLmluaXQsIHsgdG86IGluaXQsIGFjdGl2ZTogdHJ1ZSB9KSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpbml0ID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwVHJhbnNpdGlvbihtaXhpbih7fSwgdGhpcy5kZWZhdWx0cy5pbml0LCBpbml0LCB7IGFjdGl2ZTogdHJ1ZSB9KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hZGRTdGF0ZSh0aGlzLmRlZmF1bHRzLmluaXQuZnJvbSk7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0cy5pbml0O1xuICAgIH1cbiAgfSxcblxuICBjb25maWd1cmVEYXRhOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZGF0YTsgfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyAgfVxuICB9LFxuXG4gIGNvbmZpZ3VyZU1ldGhvZHM6IGZ1bmN0aW9uKG1ldGhvZHMpIHtcbiAgICByZXR1cm4gbWV0aG9kcyB8fCB7fTtcbiAgfSxcblxuICBjb25maWd1cmVQbHVnaW5zOiBmdW5jdGlvbihwbHVnaW5zLCBidWlsdGluKSB7XG4gICAgcGx1Z2lucyA9IHBsdWdpbnMgfHwgW107XG4gICAgdmFyIG4sIG1heCwgcGx1Z2luO1xuICAgIGZvcihuID0gMCwgbWF4ID0gcGx1Z2lucy5sZW5ndGggOyBuIDwgbWF4IDsgbisrKSB7XG4gICAgICBwbHVnaW4gPSBwbHVnaW5zW25dO1xuICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHBsdWdpbnNbbl0gPSBwbHVnaW4gPSBwbHVnaW4oKVxuICAgICAgaWYgKHBsdWdpbi5jb25maWd1cmUpXG4gICAgICAgIHBsdWdpbi5jb25maWd1cmUodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBwbHVnaW5zXG4gIH0sXG5cbiAgY29uZmlndXJlVHJhbnNpdGlvbnM6IGZ1bmN0aW9uKHRyYW5zaXRpb25zKSB7XG4gICAgdmFyIGksIG4sIHRyYW5zaXRpb24sIGZyb20sIHRvLCB3aWxkY2FyZCA9IHRoaXMuZGVmYXVsdHMud2lsZGNhcmQ7XG4gICAgZm9yKG4gPSAwIDsgbiA8IHRyYW5zaXRpb25zLmxlbmd0aCA7IG4rKykge1xuICAgICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb25zW25dO1xuICAgICAgZnJvbSAgPSBBcnJheS5pc0FycmF5KHRyYW5zaXRpb24uZnJvbSkgPyB0cmFuc2l0aW9uLmZyb20gOiBbdHJhbnNpdGlvbi5mcm9tIHx8IHdpbGRjYXJkXVxuICAgICAgdG8gICAgPSB0cmFuc2l0aW9uLnRvIHx8IHdpbGRjYXJkO1xuICAgICAgZm9yKGkgPSAwIDsgaSA8IGZyb20ubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIHRoaXMubWFwVHJhbnNpdGlvbih7IG5hbWU6IHRyYW5zaXRpb24ubmFtZSwgZnJvbTogZnJvbVtpXSwgdG86IHRvIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmFuc2l0aW9uRm9yOiBmdW5jdGlvbihzdGF0ZSwgdHJhbnNpdGlvbikge1xuICAgIHZhciB3aWxkY2FyZCA9IHRoaXMuZGVmYXVsdHMud2lsZGNhcmQ7XG4gICAgcmV0dXJuIHRoaXMubWFwW3N0YXRlXVt0cmFuc2l0aW9uXSB8fFxuICAgICAgICAgICB0aGlzLm1hcFt3aWxkY2FyZF1bdHJhbnNpdGlvbl07XG4gIH0sXG5cbiAgdHJhbnNpdGlvbnNGb3I6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgdmFyIHdpbGRjYXJkID0gdGhpcy5kZWZhdWx0cy53aWxkY2FyZDtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tYXBbc3RhdGVdKS5jb25jYXQoT2JqZWN0LmtleXModGhpcy5tYXBbd2lsZGNhcmRdKSk7XG4gIH0sXG5cbiAgYWxsU3RhdGVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXM7XG4gIH0sXG5cbiAgYWxsVHJhbnNpdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb25zO1xuICB9XG5cbn0pO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBDb25maWc7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cbnZhciBtaXhpbiAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgICBFeGNlcHRpb24gID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSxcbiAgICBwbHVnaW4gICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKSxcbiAgICBVTk9CU0VSVkVEID0gWyBudWxsLCBbXSBdO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSlNNKGNvbnRleHQsIGNvbmZpZykge1xuICB0aGlzLmNvbnRleHQgICA9IGNvbnRleHQ7XG4gIHRoaXMuY29uZmlnICAgID0gY29uZmlnO1xuICB0aGlzLnN0YXRlICAgICA9IGNvbmZpZy5pbml0LmZyb207XG4gIHRoaXMub2JzZXJ2ZXJzID0gW2NvbnRleHRdO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubWl4aW4oSlNNLnByb3RvdHlwZSwge1xuXG4gIGluaXQ6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBtaXhpbih0aGlzLmNvbnRleHQsIHRoaXMuY29uZmlnLmRhdGEuYXBwbHkodGhpcy5jb250ZXh0LCBhcmdzKSk7XG4gICAgcGx1Z2luLmhvb2sodGhpcywgJ2luaXQnKTtcbiAgICBpZiAodGhpcy5jb25maWcuaW5pdC5hY3RpdmUpXG4gICAgICByZXR1cm4gdGhpcy5maXJlKHRoaXMuY29uZmlnLmluaXQubmFtZSwgW10pO1xuICB9LFxuXG4gIGlzOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0YXRlKSA/IChzdGF0ZS5pbmRleE9mKHRoaXMuc3RhdGUpID49IDApIDogKHRoaXMuc3RhdGUgPT09IHN0YXRlKTtcbiAgfSxcblxuICBpc1BlbmRpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBlbmRpbmc7XG4gIH0sXG5cbiAgY2FuOiBmdW5jdGlvbih0cmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzUGVuZGluZygpICYmICEhdGhpcy5zZWVrKHRyYW5zaXRpb24pO1xuICB9LFxuXG4gIGNhbm5vdDogZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICAgIHJldHVybiAhdGhpcy5jYW4odHJhbnNpdGlvbik7XG4gIH0sXG5cbiAgYWxsU3RhdGVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYWxsU3RhdGVzKCk7XG4gIH0sXG5cbiAgYWxsVHJhbnNpdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hbGxUcmFuc2l0aW9ucygpO1xuICB9LFxuXG4gIHRyYW5zaXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNpdGlvbnNGb3IodGhpcy5zdGF0ZSk7XG4gIH0sXG5cbiAgc2VlazogZnVuY3Rpb24odHJhbnNpdGlvbiwgYXJncykge1xuICAgIHZhciB3aWxkY2FyZCA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLndpbGRjYXJkLFxuICAgICAgICBlbnRyeSAgICA9IHRoaXMuY29uZmlnLnRyYW5zaXRpb25Gb3IodGhpcy5zdGF0ZSwgdHJhbnNpdGlvbiksXG4gICAgICAgIHRvICAgICAgID0gZW50cnkgJiYgZW50cnkudG87XG4gICAgaWYgKHR5cGVvZiB0byA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldHVybiB0by5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3MpO1xuICAgIGVsc2UgaWYgKHRvID09PSB3aWxkY2FyZClcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRvXG4gIH0sXG5cbiAgZmlyZTogZnVuY3Rpb24odHJhbnNpdGlvbiwgYXJncykge1xuICAgIHJldHVybiB0aGlzLnRyYW5zaXQodHJhbnNpdGlvbiwgdGhpcy5zdGF0ZSwgdGhpcy5zZWVrKHRyYW5zaXRpb24sIGFyZ3MpLCBhcmdzKTtcbiAgfSxcblxuICB0cmFuc2l0OiBmdW5jdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0bywgYXJncykge1xuXG4gICAgdmFyIGxpZmVjeWNsZSA9IHRoaXMuY29uZmlnLmxpZmVjeWNsZSxcbiAgICAgICAgY2hhbmdlZCAgID0gdGhpcy5jb25maWcub3B0aW9ucy5vYnNlcnZlVW5jaGFuZ2VkU3RhdGUgfHwgKGZyb20gIT09IHRvKTtcblxuICAgIGlmICghdG8pXG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0Lm9uSW52YWxpZFRyYW5zaXRpb24odHJhbnNpdGlvbiwgZnJvbSwgdG8pO1xuXG4gICAgaWYgKHRoaXMuaXNQZW5kaW5nKCkpXG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0Lm9uUGVuZGluZ1RyYW5zaXRpb24odHJhbnNpdGlvbiwgZnJvbSwgdG8pO1xuXG4gICAgdGhpcy5jb25maWcuYWRkU3RhdGUodG8pOyAgLy8gbWlnaHQgbmVlZCB0byBhZGQgdGhpcyBzdGF0ZSBpZiBpdCdzIHVua25vd24gKGUuZy4gY29uZGl0aW9uYWwgdHJhbnNpdGlvbiBvciBnb3RvKVxuXG4gICAgdGhpcy5iZWdpblRyYW5zaXQoKTtcblxuICAgIGFyZ3MudW5zaGlmdCh7ICAgICAgICAgICAgIC8vIHRoaXMgY29udGV4dCB3aWxsIGJlIHBhc3NlZCB0byBlYWNoIGxpZmVjeWNsZSBldmVudCBvYnNlcnZlclxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICAgIGZyb206ICAgICAgIGZyb20sXG4gICAgICB0bzogICAgICAgICB0byxcbiAgICAgIGZzbTogICAgICAgIHRoaXMuY29udGV4dFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMub2JzZXJ2ZUV2ZW50cyhbXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25CZWZvcmUudHJhbnNpdGlvbiksXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25CZWZvcmVbdHJhbnNpdGlvbl0pLFxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uTGVhdmUuc3RhdGUpIDogVU5PQlNFUlZFRCxcbiAgICAgIGNoYW5nZWQgPyB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkxlYXZlW2Zyb21dKSA6IFVOT0JTRVJWRUQsXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub24udHJhbnNpdGlvbiksXG4gICAgICBjaGFuZ2VkID8gWyAnZG9UcmFuc2l0JywgWyB0aGlzIF0gXSAgICAgICAgICAgICAgICAgICAgICAgOiBVTk9CU0VSVkVELFxuICAgICAgY2hhbmdlZCA/IHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uRW50ZXIuc3RhdGUpIDogVU5PQlNFUlZFRCxcbiAgICAgIGNoYW5nZWQgPyB0aGlzLm9ic2VydmVyc0ZvckV2ZW50KGxpZmVjeWNsZS5vbkVudGVyW3RvXSkgICA6IFVOT0JTRVJWRUQsXG4gICAgICBjaGFuZ2VkID8gdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25bdG9dKSAgICAgICAgOiBVTk9CU0VSVkVELFxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzRm9yRXZlbnQobGlmZWN5Y2xlLm9uQWZ0ZXIudHJhbnNpdGlvbiksXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25BZnRlclt0cmFuc2l0aW9uXSksXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNGb3JFdmVudChsaWZlY3ljbGUub25bdHJhbnNpdGlvbl0pXG4gICAgXSwgYXJncyk7XG4gIH0sXG5cbiAgYmVnaW5UcmFuc2l0OiBmdW5jdGlvbigpICAgICAgICAgIHsgdGhpcy5wZW5kaW5nID0gdHJ1ZTsgICAgICAgICAgICAgICAgIH0sXG4gIGVuZFRyYW5zaXQ6ICAgZnVuY3Rpb24ocmVzdWx0KSAgICB7IHRoaXMucGVuZGluZyA9IGZhbHNlOyByZXR1cm4gcmVzdWx0OyB9LFxuICBmYWlsVHJhbnNpdDogIGZ1bmN0aW9uKHJlc3VsdCkgICAgeyB0aGlzLnBlbmRpbmcgPSBmYWxzZTsgLyp0aHJvdyByZXN1bHQ7Ki8gfSxcbiAgZG9UcmFuc2l0OiAgICBmdW5jdGlvbihsaWZlY3ljbGUpIHsgdGhpcy5zdGF0ZSA9IGxpZmVjeWNsZS50bzsgICAgICAgICAgIH0sXG5cbiAgb2JzZXJ2ZTogZnVuY3Rpb24oYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdmFyIG9ic2VydmVyID0ge307XG4gICAgICBvYnNlcnZlclthcmdzWzBdXSA9IGFyZ3NbMV07XG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKGFyZ3NbMF0pO1xuICAgIH1cbiAgfSxcblxuICBvYnNlcnZlcnNGb3JFdmVudDogZnVuY3Rpb24oZXZlbnQpIHsgLy8gVE9ETzogdGhpcyBjb3VsZCBiZSBjYWNoZWRcbiAgICB2YXIgbiA9IDAsIG1heCA9IHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCwgb2JzZXJ2ZXIsIHJlc3VsdCA9IFtdO1xuICAgIGZvciggOyBuIDwgbWF4IDsgbisrKSB7XG4gICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzW25dO1xuICAgICAgaWYgKG9ic2VydmVyW2V2ZW50XSlcbiAgICAgICAgcmVzdWx0LnB1c2gob2JzZXJ2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gWyBldmVudCwgcmVzdWx0LCB0cnVlIF1cbiAgfSxcblxuICBvYnNlcnZlRXZlbnRzOiBmdW5jdGlvbihldmVudHMsIGFyZ3MsIHByZXZpb3VzRXZlbnQsIHByZXZpb3VzUmVzdWx0KSB7XG4gICAgaWYgKGV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZFRyYW5zaXQocHJldmlvdXNSZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBwcmV2aW91c1Jlc3VsdCk7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50ICAgICA9IGV2ZW50c1swXVswXSxcbiAgICAgICAgb2JzZXJ2ZXJzID0gZXZlbnRzWzBdWzFdLFxuICAgICAgICBwbHVnZ2FibGUgPSBldmVudHNbMF1bMl07XG5cbiAgICBhcmdzWzBdLmV2ZW50ID0gZXZlbnQ7XG4gICAgaWYgKGV2ZW50ICYmIHBsdWdnYWJsZSAmJiBldmVudCAhPT0gcHJldmlvdXNFdmVudClcbiAgICAgIHBsdWdpbi5ob29rKHRoaXMsICdsaWZlY3ljbGUnLCBhcmdzKTtcblxuICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBldmVudHMuc2hpZnQoKTtcbiAgICAgIHJldHVybiB0aGlzLm9ic2VydmVFdmVudHMoZXZlbnRzLCBhcmdzLCBldmVudCwgcHJldmlvdXNSZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBvYnNlcnZlciA9IG9ic2VydmVycy5zaGlmdCgpLFxuICAgICAgICAgIHJlc3VsdCA9IG9ic2VydmVyW2V2ZW50XS5hcHBseShvYnNlcnZlciwgYXJncyk7XG4gICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnRoZW4odGhpcy5vYnNlcnZlRXZlbnRzLmJpbmQodGhpcywgZXZlbnRzLCBhcmdzLCBldmVudCkpXG4gICAgICAgICAgICAgICAgICAgICAuY2F0Y2godGhpcy5mYWlsVHJhbnNpdC5iaW5kKHRoaXMpKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmRUcmFuc2l0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlRXZlbnRzKGV2ZW50cywgYXJncywgZXZlbnQsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG9uSW52YWxpZFRyYW5zaXRpb246IGZ1bmN0aW9uKHRyYW5zaXRpb24sIGZyb20sIHRvKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcInRyYW5zaXRpb24gaXMgaW52YWxpZCBpbiBjdXJyZW50IHN0YXRlXCIsIHRyYW5zaXRpb24sIGZyb20sIHRvLCB0aGlzLnN0YXRlKTtcbiAgfSxcblxuICBvblBlbmRpbmdUcmFuc2l0aW9uOiBmdW5jdGlvbih0cmFuc2l0aW9uLCBmcm9tLCB0bykge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJ0cmFuc2l0aW9uIGlzIGludmFsaWQgd2hpbGUgcHJldmlvdXMgdHJhbnNpdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzc1wiLCB0cmFuc2l0aW9uLCBmcm9tLCB0bywgdGhpcy5zdGF0ZSk7XG4gIH1cblxufSk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEpTTTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIG1peGluICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgICBjYW1lbGl6ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMiksXG4gICAgcGx1Z2luICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIENvbmZpZyAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSxcbiAgICBKU00gICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFB1YmxpY01ldGhvZHMgPSB7XG4gIGlzOiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHN0YXRlKSAgICAgICB7IHJldHVybiB0aGlzLl9mc20uaXMoc3RhdGUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIGNhbjogICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHRyYW5zaXRpb24pICB7IHJldHVybiB0aGlzLl9mc20uY2FuKHRyYW5zaXRpb24pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIGNhbm5vdDogICAgICAgICAgICAgIGZ1bmN0aW9uKHRyYW5zaXRpb24pICB7IHJldHVybiB0aGlzLl9mc20uY2Fubm90KHRyYW5zaXRpb24pICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIG9ic2VydmU6ICAgICAgICAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9mc20ub2JzZXJ2ZShhcmd1bWVudHMpICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIHRyYW5zaXRpb25zOiAgICAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9mc20udHJhbnNpdGlvbnMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIGFsbFRyYW5zaXRpb25zOiAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9mc20uYWxsVHJhbnNpdGlvbnMoKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIGFsbFN0YXRlczogICAgICAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9mc20uYWxsU3RhdGVzKCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gIG9uSW52YWxpZFRyYW5zaXRpb246IGZ1bmN0aW9uKHQsIGZyb20sIHRvKSB7IHJldHVybiB0aGlzLl9mc20ub25JbnZhbGlkVHJhbnNpdGlvbih0LCBmcm9tLCB0bykgICAgICAgICAgICAgIH0sXG4gIG9uUGVuZGluZ1RyYW5zaXRpb246IGZ1bmN0aW9uKHQsIGZyb20sIHRvKSB7IHJldHVybiB0aGlzLl9mc20ub25QZW5kaW5nVHJhbnNpdGlvbih0LCBmcm9tLCB0bykgICAgICAgICAgICAgIH0sXG59XG5cbnZhciBQdWJsaWNQcm9wZXJ0aWVzID0ge1xuICBzdGF0ZToge1xuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZnNtLnN0YXRlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3VzZSB0cmFuc2l0aW9ucyB0byBjaGFuZ2Ugc3RhdGUnKVxuICAgIH1cbiAgfVxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFN0YXRlTWFjaGluZShvcHRpb25zKSB7XG4gIHJldHVybiBhcHBseSh0aGlzIHx8IHt9LCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gZmFjdG9yeSgpIHtcbiAgdmFyIGNzdG9yLCBvcHRpb25zO1xuICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNzdG9yICAgPSBhcmd1bWVudHNbMF07XG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgfVxuICBlbHNlIHtcbiAgICBjc3RvciAgID0gZnVuY3Rpb24oKSB7IHRoaXMuX2ZzbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH07XG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50c1swXSB8fCB7fTtcbiAgfVxuICB2YXIgY29uZmlnID0gbmV3IENvbmZpZyhvcHRpb25zLCBTdGF0ZU1hY2hpbmUpO1xuICBidWlsZChjc3Rvci5wcm90b3R5cGUsIGNvbmZpZyk7XG4gIGNzdG9yLnByb3RvdHlwZS5fZnNtLmNvbmZpZyA9IGNvbmZpZzsgLy8gY29udmVuaWVuY2UgYWNjZXNzIHRvIHNoYXJlZCBjb25maWcgd2l0aG91dCBuZWVkaW5nIGFuIGluc3RhbmNlXG4gIHJldHVybiBjc3Rvcjtcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGFwcGx5KGluc3RhbmNlLCBvcHRpb25zKSB7XG4gIHZhciBjb25maWcgPSBuZXcgQ29uZmlnKG9wdGlvbnMsIFN0YXRlTWFjaGluZSk7XG4gIGJ1aWxkKGluc3RhbmNlLCBjb25maWcpO1xuICBpbnN0YW5jZS5fZnNtKCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuZnVuY3Rpb24gYnVpbGQodGFyZ2V0LCBjb25maWcpIHtcbiAgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JykgfHwgQXJyYXkuaXNBcnJheSh0YXJnZXQpKVxuICAgIHRocm93IEVycm9yKCdTdGF0ZU1hY2hpbmUgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBvYmplY3RzJyk7XG4gIHBsdWdpbi5idWlsZCh0YXJnZXQsIGNvbmZpZyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgUHVibGljUHJvcGVydGllcyk7XG4gIG1peGluKHRhcmdldCwgUHVibGljTWV0aG9kcyk7XG4gIG1peGluKHRhcmdldCwgY29uZmlnLm1ldGhvZHMpO1xuICBjb25maWcuYWxsVHJhbnNpdGlvbnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zaXRpb24pIHtcbiAgICB0YXJnZXRbY2FtZWxpemUodHJhbnNpdGlvbildID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZnNtLmZpcmUodHJhbnNpdGlvbiwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgIH1cbiAgfSk7XG4gIHRhcmdldC5fZnNtID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fZnNtID0gbmV3IEpTTSh0aGlzLCBjb25maWcpO1xuICAgIHRoaXMuX2ZzbS5pbml0KGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5TdGF0ZU1hY2hpbmUudmVyc2lvbiAgPSAnMy4wLjEnO1xuU3RhdGVNYWNoaW5lLmZhY3RvcnkgID0gZmFjdG9yeTtcblN0YXRlTWFjaGluZS5hcHBseSAgICA9IGFwcGx5O1xuU3RhdGVNYWNoaW5lLmRlZmF1bHRzID0ge1xuICB3aWxkY2FyZDogJyonLFxuICBpbml0OiB7XG4gICAgbmFtZTogJ2luaXQnLFxuICAgIGZyb206ICdub25lJ1xuICB9XG59XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZU1hY2hpbmU7XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWVzc2FnZSwgdHJhbnNpdGlvbiwgZnJvbSwgdG8sIGN1cnJlbnQpIHtcbiAgdGhpcy5tZXNzYWdlICAgID0gbWVzc2FnZTtcbiAgdGhpcy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgdGhpcy5mcm9tICAgICAgID0gZnJvbTtcbiAgdGhpcy50byAgICAgICAgID0gdG87XG4gIHRoaXMuY3VycmVudCAgICA9IGN1cnJlbnQ7XG59XG5cblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7Il19