(function () {
  "use strict";

  const { SELECTORS, TIMING, ICONS } = window.NoteToc;
  const { createElement } = window.NoteToc.utils;
  const { state: tocState, generateTocContent, updateActiveSection, resetState } = window.NoteToc.toc;

  function removeFloater() {
    const floater = document.getElementById(SELECTORS.floater);
    if (floater) {
      floater.remove();
    }
    resetState();
  }

  function createFloaterHeader() {
    const header = createElement("div", { className: "note-toc-header" });
    header.innerHTML = `
      <h3 class="note-toc-title">
        ${ICONS.list}
        目次
      </h3>
      <button class="note-toc-toggle" title="最小化">
        ${ICONS.chevronUp}
      </button>
    `;
    return header;
  }

  function createMinIcon() {
    return createElement("div", {
      className: "note-toc-min-icon",
      innerHTML: ICONS.listLarge,
    });
  }

  function setupToggleBehavior(floater, header, minIcon, content) {
    const toggleBtn = header.querySelector(".note-toc-toggle");
    const toggleIcon = header.querySelector(".note-toc-toggle svg");

    const toggle = () => {
      const isMin = floater.classList.contains("minimized");

      if (isMin) {
        generateTocContent(content);
      }

      floater.classList.toggle("minimized");
      const newIsMin = floater.classList.contains("minimized");
      toggleBtn.title = newIsMin ? "表示" : "最小化";
      toggleIcon.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      toggleIcon.style.transform = newIsMin ? "rotate(180deg)" : "rotate(0deg)";
    };

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    minIcon.addEventListener("click", toggle);
  }

  function setupScrollListener(content) {
    let scrollTimeout;
    window.addEventListener(
      "scroll",
      () => {
        if (!tocState.tocGenerated) return;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => updateActiveSection(content), TIMING.scrollDebounce);
      },
      { passive: true }
    );
  }

  function createFloater() {
    if (document.getElementById(SELECTORS.floater)) return;

    const floater = createElement("div", {
      id: SELECTORS.floater,
      className: "note-toc-floater",
    });

    const header = createFloaterHeader();
    const minIcon = createMinIcon();
    const content = createElement("div", { className: "note-toc-content" });

    floater.appendChild(header);
    floater.appendChild(minIcon);
    floater.appendChild(content);
    document.body.appendChild(floater);

    generateTocContent(content);
    setupToggleBehavior(floater, header, minIcon, content);
    setupScrollListener(content);
  }

  window.NoteToc.floater = {
    createFloater,
    removeFloater,
  };
})();
