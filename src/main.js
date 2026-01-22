(function () {
  "use strict";

  const { TIMING } = window.NoteToc;
  const { updatePage, checkUrlChange, setupHistoryListeners } = window.NoteToc.navigation;

  function init() {
    setupHistoryListeners();
    setInterval(checkUrlChange, TIMING.urlCheckInterval);
    updatePage();
  }

  init();
})();
