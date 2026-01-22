(function () {
  "use strict";

  const { TIMING } = window.NoteToc;
  const { isArticlePage } = window.NoteToc.utils;
  const { resetState } = window.NoteToc.toc;
  const { createFloater, removeFloater } = window.NoteToc.floater;

  let currentUrl = location.href;

  function updatePage() {
    if (isArticlePage()) {
      createFloater();
    } else {
      removeFloater();
    }
  }

  function checkUrlChange() {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      removeFloater();
      resetState();
      setTimeout(updatePage, TIMING.pageTransitionDelay);
    }
  }

  function setupHistoryListeners() {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      checkUrlChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      checkUrlChange();
    };

    window.addEventListener("popstate", checkUrlChange);

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        removeFloater();
        resetState();
        currentUrl = location.href;
        updatePage();
      }
    });
  }

  window.NoteToc.navigation = {
    updatePage,
    checkUrlChange,
    setupHistoryListeners,
  };
})();
