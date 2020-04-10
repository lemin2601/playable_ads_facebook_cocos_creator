"use strict";
cc._RF.push(module, 'ce239sy/55Ox5FRnSgYmiSY', 'PlayableAds');
// scripts/PlayableAds.js

"use strict";

module.exports = {
  onCTAClick: function onCTAClick() {
    try {
      FbPlayableAd.onCTAClick();
      console.log("onCTAClick finish");
    } catch (e) {
      console.log("onCTAClick redirect");
      var r = confirm("Not playableAds, open store?");

      if (r === true) {
        window.location.href = "https://play.google.com/store/apps/details?id=com.rummy.pusoy.dos";
      }
    }
  }
};

cc._RF.pop();