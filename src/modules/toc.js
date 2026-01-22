(function () {
  "use strict";

  const { TIMING, MESSAGES } = window.NoteToc;
  const { getArticleBody, getHeadings, createElement, showMessage } = window.NoteToc.utils;

  const state = {
    tocGenerated: false,
    retryTimeout: null,
  };

  function generateTocContent(content, retryCount = 0) {
    content.innerHTML = "";

    const articleBody = getArticleBody();
    if (!articleBody) {
      if (retryCount < TIMING.maxRetries) {
        showMessage(content, MESSAGES.loading);
        state.retryTimeout = setTimeout(() => {
          generateTocContent(content, retryCount + 1);
        }, TIMING.retryDelay);
        return;
      }
      showMessage(content, MESSAGES.noArticle);
      return;
    }

    const headings = getHeadings(articleBody);
    if (headings.length === 0) {
      showMessage(content, MESSAGES.noHeadings);
      return;
    }

    const list = createElement("ul");

    headings.forEach((heading) => {
      const text = heading.innerText.trim();
      if (!text) return;

      const li = createElement("li");
      const a = createElement("a", { textContent: text });
      a.href = "#";

      if (heading.tagName.toLowerCase() === "h3") {
        a.style.paddingLeft = "24px";
      }

      a.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToHeading(text);
      });

      li.appendChild(a);
      list.appendChild(li);
    });

    content.appendChild(list);
    state.tocGenerated = true;
    updateActiveSection(content);
  }

  function scrollToHeading(text) {
    const articleBody = getArticleBody();
    if (!articleBody) return;

    const headings = getHeadings(articleBody);
    const targetHeading = headings.find((h) => h.innerText.trim() === text);

    if (targetHeading) {
      targetHeading.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function updateActiveSection(content) {
    const floater = content.closest(".note-toc-floater");
    if (floater && floater.classList.contains("minimized")) return;

    const articleBody = getArticleBody();
    if (!articleBody) return;

    const headings = getHeadings(articleBody);
    if (headings.length === 0) return;

    const scrollPosition = window.scrollY + TIMING.scrollOffset;
    let currentHeading = null;

    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].offsetTop <= scrollPosition) {
        currentHeading = headings[i];
        break;
      }
    }

    const links = content.querySelectorAll("a");
    let activeLink = null;

    links.forEach((link) => {
      link.classList.remove("active");
      if (currentHeading && link.textContent.trim() === currentHeading.innerText.trim()) {
        link.classList.add("active");
        activeLink = link;
      }
    });

    if (activeLink) {
      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  function clearRetryTimeout() {
    if (state.retryTimeout) {
      clearTimeout(state.retryTimeout);
      state.retryTimeout = null;
    }
  }

  function resetState() {
    state.tocGenerated = false;
    clearRetryTimeout();
  }

  window.NoteToc.toc = {
    state,
    generateTocContent,
    updateActiveSection,
    resetState,
  };
})();
