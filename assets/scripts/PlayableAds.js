module.exports = {
    onCTAClick:function(){
        try{
            FbPlayableAd.onCTAClick();
            console.log("onCTAClick finish");
        }catch (e) {
            console.log("onCTAClick redirect");
            let r = confirm("Not playableAds, open store?");
            if (r === true) {
                window.location.href = "https://play.google.com/store/apps/details?id=com.rummy.pusoy.dos";
            }
        }
    }
};