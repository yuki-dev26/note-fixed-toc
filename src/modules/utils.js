(function () {
  "use strict";

  const { SELECTORS } = window.NoteToc;

  function isArticlePage() {
    return /note\.com\/[^/]+\/n\//.test(location.href);
  }

  function getArticleBody() {
    return document.querySelector(SELECTORS.articleBody);
  }

  function getHeadings(articleBody) {
    if (!articleBody) return [];
    return Array.from(articleBody.querySelectorAll("h2, h3")).filter(
      (heading) => !heading.closest(SELECTORS.tocContainer)
    );
  }

  function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.id) el.id = options.id;
    if (options.className) el.className = options.className;
    if (options.innerHTML) el.innerHTML = options.innerHTML;
    if (options.textContent) el.textContent = options.textContent;
    if (options.style) Object.assign(el.style, options.style);
    return el;
  }

  function showMessage(container, message) {
    container.innerHTML = `<p style='padding: 16px; color: #888;'>${message}</p>`;
  }

  window.NoteToc.utils = {
    isArticlePage,
    getArticleBody,
    getHeadings,
    createElement,
    showMessage,
  };
})();
