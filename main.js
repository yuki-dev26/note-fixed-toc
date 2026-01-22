(function () {
  "use strict";

  let tocGenerated = false;
  let currentUrl = location.href;
  let retryTimeout = null;

  function isArticlePage() {
    return /note\.com\/[^/]+\/n\//.test(location.href);
  }

  function removeFloater() {
    const floater = document.getElementById("note-toc-floater");
    if (floater) {
      floater.remove();
    }
    tocGenerated = false;
    if (retryTimeout) {
      clearTimeout(retryTimeout);
      retryTimeout = null;
    }
  }

  function generateTocContent(content, retryCount = 0) {
    const maxRetries = 3;
    const retryDelay = 1000;

    content.innerHTML = "";

    const articleBody = document.querySelector(".note-common-styles__textnote-body");
    if (!articleBody) {
      if (retryCount < maxRetries) {
        content.innerHTML = "<p style='padding: 16px; color: #888;'>読み込み中...</p>";
        retryTimeout = setTimeout(() => {
          generateTocContent(content, retryCount + 1);
        }, retryDelay);
        return;
      }
      content.innerHTML = "<p style='padding: 16px; color: #888;'>記事本文が見つかりません</p>";
      return;
    }

    const allHeadings = Array.from(articleBody.querySelectorAll("h2, h3"));
    
    if (allHeadings.length === 0) {
      content.innerHTML = "<p style='padding: 16px; color: #888;'>見出しがありません</p>";
      return;
    }

    const list = document.createElement("ul");

    allHeadings.forEach((heading) => {
      const text = heading.innerText.trim();
      if (!text) return;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = text;

      if (heading.tagName.toLowerCase() === "h3") {
        a.style.paddingLeft = "24px";
      }

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const articleBody = document.querySelector(".note-common-styles__textnote-body");
        if (!articleBody) return;
        const allHeadings = Array.from(articleBody.querySelectorAll("h2, h3"));
        const targetHeading = allHeadings.find(h => h.innerText.trim() === text);
        if (targetHeading) {
          targetHeading.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      li.appendChild(a);
      list.appendChild(li);
    });

    content.appendChild(list);
    tocGenerated = true;
    updateActiveSection(content);
  }

  function updateActiveSection(content) {
    const articleBody = document.querySelector(".note-common-styles__textnote-body");
    if (!articleBody) return;

    const allHeadings = Array.from(articleBody.querySelectorAll("h2, h3"));
    if (allHeadings.length === 0) return;

    let currentHeading = null;
    const scrollPosition = window.scrollY + 150;

    for (let i = allHeadings.length - 1; i >= 0; i--) {
      const heading = allHeadings[i];
      if (heading.offsetTop <= scrollPosition) {
        currentHeading = heading;
        break;
      }
    }

    const links = content.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.remove("active");
      if (currentHeading && link.textContent.trim() === currentHeading.innerText.trim()) {
        link.classList.add("active");
      }
    });
  }

  function createFloater() {
    if (document.getElementById("note-toc-floater")) return;

    const floater = document.createElement("div");
    floater.id = "note-toc-floater";
    floater.className = "note-toc-floater";

    const header = document.createElement("div");
    header.className = "note-toc-header";
    header.innerHTML = `
      <h3 class="note-toc-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        目次
      </h3>
      <button class="note-toc-toggle" title="最小化">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    `;

    const minIcon = document.createElement("div");
    minIcon.className = "note-toc-min-icon";
    minIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;

    const content = document.createElement("div");
    content.className = "note-toc-content";

    floater.appendChild(header);
    floater.appendChild(minIcon);
    floater.appendChild(content);
    document.body.appendChild(floater);

    const toggleBtn = header.querySelector(".note-toc-toggle");
    const toggleIcon = header.querySelector(".note-toc-toggle svg");

    generateTocContent(content);

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

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (!tocGenerated) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => updateActiveSection(content), 50);
    }, { passive: true });
  }

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
      tocGenerated = false;
      setTimeout(updatePage, 100);
    }
  }

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    checkUrlChange();
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    checkUrlChange();
  };

  window.addEventListener("popstate", checkUrlChange);

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      removeFloater();
      tocGenerated = false;
      currentUrl = location.href;
      updatePage();
    }
  });

  setInterval(checkUrlChange, 500);

  updatePage();
})();
