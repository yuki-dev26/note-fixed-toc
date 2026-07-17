(function () {
  "use strict";

  const { SELECTORS, TIMING, ICONS, STORAGE_KEYS } = window.NoteToc;
  const { createElement } = window.NoteToc.utils;
  const { state: tocState, generateTocContent, updateActiveSection, resetState } = window.NoteToc.toc;

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.theme) === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // ignore quota / privacy mode errors
    }
  }

  function applyTheme(floater, theme) {
    floater.classList.toggle("dark", theme === "dark");
    const themeBtn = floater.querySelector(".note-toc-theme");
    if (!themeBtn) return;

    themeBtn.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;
    themeBtn.title = theme === "dark" ? "ライトモード" : "ダークモード";
    themeBtn.setAttribute("aria-label", themeBtn.title);
  }

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
      <div class="note-toc-header-left">
        <h3 class="note-toc-title">
          ${ICONS.list}
          目次
        </h3>
        <button type="button" class="note-toc-theme" title="ダークモード" aria-label="ダークモード">
          ${ICONS.moon}
        </button>
      </div>
      <button type="button" class="note-toc-toggle" title="最小化">
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

  function setupThemeToggle(floater, header) {
    const themeBtn = header.querySelector(".note-toc-theme");
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextTheme = floater.classList.contains("dark") ? "light" : "dark";
      applyTheme(floater, nextTheme);
      saveTheme(nextTheme);
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
      if (e.target.closest(".note-toc-theme")) return;
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

    applyTheme(floater, getSavedTheme());
    generateTocContent(content);
    setupThemeToggle(floater, header);
    setupToggleBehavior(floater, header, minIcon, content);
    setupScrollListener(content);
  }

  window.NoteToc.floater = {
    createFloater,
    removeFloater,
  };
})();
