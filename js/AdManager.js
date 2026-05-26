(function () {
  "use strict";

  function TapAdManager() {
    this.spaceId = "1054324";
    this.rewardedVideoAd = null;
    this.rewardCallback = null;
    this.closeCallback = null;
    this.ready = false;
    this.initialized = false;
  }

  TapAdManager.prototype.init = function () {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    if (typeof tap === "undefined" || typeof tap.createRewardedVideoAd !== "function") {
      console.warn("[AdManager] TapTap rewarded video API is unavailable.");
      return;
    }

    this.rewardedVideoAd = tap.createRewardedVideoAd({
      adUnitId: this.spaceId
    });

    this.rewardedVideoAd.onLoad(function () {
      console.log("[AdManager] Rewarded video loaded.");
      window.adManager.ready = true;
    });

    this.rewardedVideoAd.onError(function (err) {
      window.adManager.ready = false;
      console.error("[AdManager] Rewarded video error:", err && (err.errMsg || err.message || err));
    });

    this.rewardedVideoAd.onClose(function (res) {
      if (res && res.isEnded && typeof window.adManager.rewardCallback === "function") {
        window.adManager.rewardCallback();
      } else {
        console.log("[AdManager] Rewarded video closed before completion.");
      }

      if (typeof window.adManager.closeCallback === "function") {
        window.adManager.closeCallback(res || {});
      }
    });

    if (typeof this.rewardedVideoAd.load === "function") {
      var loading = this.rewardedVideoAd.load();
      if (loading && typeof loading.catch === "function") {
        loading.catch(function (err) {
          console.error("[AdManager] Rewarded video preload failed:", err);
        });
      }
    }
  };

  TapAdManager.prototype.onReward = function (callback) {
    this.rewardCallback = typeof callback === "function" ? callback : null;
  };

  TapAdManager.prototype.onClose = function (callback) {
    this.closeCallback = typeof callback === "function" ? callback : null;
  };

  TapAdManager.prototype.showRewardedVideo = function () {
    if (!this.rewardedVideoAd || typeof this.rewardedVideoAd.show !== "function") {
      console.warn("[AdManager] Rewarded video is not ready.");
      return false;
    }

    this.rewardedVideoAd.show();
    return true;
  };

  window.adManager = new TapAdManager();
})();
