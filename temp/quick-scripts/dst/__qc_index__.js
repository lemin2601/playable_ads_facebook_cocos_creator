
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/scenes/Game');
require('./assets/scripts/CAudio');
require('./assets/scripts/CBtnDownload');
require('./assets/scripts/CBtnStep1');
require('./assets/scripts/CBtnStep2');
require('./assets/scripts/CBtnStep3');
require('./assets/scripts/CCHplay');
require('./assets/scripts/CCard');
require('./assets/scripts/CCircleAvatar');
require('./assets/scripts/CCoinEffect');
require('./assets/scripts/CCoinFallEffect');
require('./assets/scripts/CEffectWin');
require('./assets/scripts/CLayerGame');
require('./assets/scripts/CPlayer');
require('./assets/scripts/CProgressWaterAni');
require('./assets/scripts/CStep1');
require('./assets/scripts/CSuggestGesture');
require('./assets/scripts/CTable');
require('./assets/scripts/CardUtils');
require('./assets/scripts/CoinEffect');
require('./assets/scripts/GameController');
require('./assets/scripts/GameFake');
require('./assets/scripts/PlayableAds');
require('./assets/scripts/PlayableState');
require('./assets/scripts/PoolHandler');
require('./assets/scripts/Types');
require('./assets/scripts/Utility');
require('./assets/scripts/state-machine-history');
require('./assets/scripts/state-machine-visualize');
require('./assets/scripts/state-machine');

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