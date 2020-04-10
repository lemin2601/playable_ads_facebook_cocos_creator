
(function () {
var scripts = [{"deps":{"./assets/scripts/CBtnDownload":7,"./assets/scripts/CBtnStep1":5,"./assets/scripts/CBtnStep2":3,"./assets/scripts/CCard":8,"./assets/scripts/CBtnStep3":4,"./assets/scripts/CCircleAvatar":16,"./assets/scripts/CEffectWin":23,"./assets/scripts/CLayerGame":22,"./assets/scripts/CPlayer":17,"./assets/scripts/CProgressWaterAni":18,"./assets/scripts/CardUtils":6,"./assets/scripts/CTable":20,"./assets/scripts/GameController":9,"./assets/scripts/GameFake":21,"./assets/scripts/PlayableAds":10,"./assets/scripts/PlayableState":12,"./assets/scripts/PoolHandler":19,"./assets/scripts/Types":11,"./assets/scripts/Utility":24,"./assets/scripts/state-machine-history":13,"./assets/scripts/state-machine-visualize":14,"./assets/scripts/state-machine":15,"./assets/scripts/CAudio":25,"./assets/migration/use_v2.0.x_cc.Toggle_event":1,"./assets/scenes/Game":2},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scenes/Game.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnStep2.js"},{"deps":{"PlayableAds":10},"path":"preview-scripts/assets/scripts/CBtnStep3.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnStep1.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CardUtils.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnDownload.js"},{"deps":{"Types":11},"path":"preview-scripts/assets/scripts/CCard.js"},{"deps":{"PlayableState":12,"PoolHandler":19,"CCard":8,"CTable":20,"CPlayer":17,"Types":11,"GameFake":21,"PlayableAds":10,"CAudio":25},"path":"preview-scripts/assets/scripts/GameController.js"},{"deps":{},"path":"preview-scripts/assets/scripts/PlayableAds.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Types.js"},{"deps":{"state-machine":15,"state-machine-visualize":14},"path":"preview-scripts/assets/scripts/PlayableState.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine-history.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine-visualize.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CCircleAvatar.js"},{"deps":{"Types":11,"Utility":24},"path":"preview-scripts/assets/scripts/CPlayer.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CProgressWaterAni.js"},{"deps":{},"path":"preview-scripts/assets/scripts/PoolHandler.js"},{"deps":{"Types":11,"Utility":24},"path":"preview-scripts/assets/scripts/CTable.js"},{"deps":{"Types":11},"path":"preview-scripts/assets/scripts/GameFake.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CLayerGame.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CEffectWin.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Utility.js"},{"deps":{"GameFake":21},"path":"preview-scripts/assets/scripts/CAudio.js"}];
var entries = ["preview-scripts/__qc_index__.js"];

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

if (typeof global === 'undefined') {
    window.global = window;
}

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;
        
            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
        
            return path;
        });

        loadScripts(srcs, function () {
            self.run();
            cb();
        });
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    