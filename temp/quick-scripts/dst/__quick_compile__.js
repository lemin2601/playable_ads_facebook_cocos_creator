
(function () {
var scripts = [{"deps":{"./assets/scripts/CAudio":31,"./assets/scripts/CBtnStep3":5,"./assets/scripts/CBtnStep2":9,"./assets/scripts/CBtnStep1":20,"./assets/scripts/CCHplay":17,"./assets/scripts/CCard":6,"./assets/scripts/CCircleAvatar":8,"./assets/scripts/CCoinFallEffect":11,"./assets/scripts/CCoinEffect":10,"./assets/scripts/CEffectWin":13,"./assets/scripts/CLayerGame":15,"./assets/scripts/CPlayer":1,"./assets/scripts/CProgressWaterAni":12,"./assets/scripts/CStep1":25,"./assets/scripts/CardUtils":22,"./assets/scripts/CSuggestGesture":14,"./assets/scripts/CTable":16,"./assets/scripts/CoinEffect":18,"./assets/scripts/GameController":7,"./assets/scripts/GameFake":23,"./assets/scripts/PlayableState":26,"./assets/scripts/PlayableAds":24,"./assets/scripts/PoolHandler":29,"./assets/scripts/Types":27,"./assets/scripts/Utility":28,"./assets/scripts/state-machine-history":4,"./assets/scripts/state-machine-visualize":3,"./assets/scripts/state-machine":30,"./assets/scripts/CBtnDownload":19,"./assets/scenes/Game":2,"./assets/migration/use_v2.0.x_cc.Toggle_event":21},"path":"preview-scripts/__qc_index__.js"},{"deps":{"Types":27,"Utility":28},"path":"preview-scripts/assets/scripts/CPlayer.js"},{"deps":{},"path":"preview-scripts/assets/scenes/Game.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine-visualize.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine-history.js"},{"deps":{"PlayableAds":24},"path":"preview-scripts/assets/scripts/CBtnStep3.js"},{"deps":{"Types":27},"path":"preview-scripts/assets/scripts/CCard.js"},{"deps":{"PlayableState":26,"PoolHandler":29,"CCard":6,"CTable":16,"CPlayer":1,"Types":27,"GameFake":23,"PlayableAds":24,"CAudio":31,"Utility":28},"path":"preview-scripts/assets/scripts/GameController.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CCircleAvatar.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnStep2.js"},{"deps":{"CoinEffect":18},"path":"preview-scripts/assets/scripts/CCoinEffect.js"},{"deps":{"CCoinEffect":10},"path":"preview-scripts/assets/scripts/CCoinFallEffect.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CProgressWaterAni.js"},{"deps":{"Utility":28},"path":"preview-scripts/assets/scripts/CEffectWin.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CSuggestGesture.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CLayerGame.js"},{"deps":{"Types":27,"Utility":28},"path":"preview-scripts/assets/scripts/CTable.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CCHplay.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CoinEffect.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnDownload.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CBtnStep1.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CardUtils.js"},{"deps":{"Types":27},"path":"preview-scripts/assets/scripts/GameFake.js"},{"deps":{},"path":"preview-scripts/assets/scripts/PlayableAds.js"},{"deps":{},"path":"preview-scripts/assets/scripts/CStep1.js"},{"deps":{"state-machine":30,"state-machine-visualize":3},"path":"preview-scripts/assets/scripts/PlayableState.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Types.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Utility.js"},{"deps":{},"path":"preview-scripts/assets/scripts/PoolHandler.js"},{"deps":{},"path":"preview-scripts/assets/scripts/state-machine.js"},{"deps":{"GameFake":23},"path":"preview-scripts/assets/scripts/CAudio.js"}];
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
    