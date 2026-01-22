(function () {
  "use strict";

  let floaterCreated = false;

  function createFloater(originalToc) {
    if (floaterCreated || document.getElementById("note-toc-floater")) return;

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

    const updateLinks = () => {
      content.innerHTML = "";
      const list = document.createElement("ul");

      const items = originalToc.querySelectorAll(".o-tableOfContents__item");
      const articleBody =
        document.querySelector(".note-common-styles__textnote-body") ||
        document;
      const allHeadings = Array.from(
        articleBody.querySelectorAll("h2, h3, h4, h5, h6"),
      );

      items.forEach((item) => {
        const btn = item.querySelector(".o-tableOfContents__link");
        if (!btn) return;

        const text = btn.innerText.trim();
        if (text.includes("すべて表示")) return;

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = text;

        const level = item.getAttribute("data-level");
        if (level === "h3") { 
          a.style.paddingLeft = "24px";
        } else if (level === "h4") {
          a.style.paddingLeft = "36px";
        }

        a.addEventListener("click", (e) => {
          e.preventDefault();
          const targetHeading = allHeadings.find(
            (h) => h.innerText.trim() === text,
          );

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
    };

    updateLinks();

    floater.appendChild(header);
    floater.appendChild(minIcon);
    floater.appendChild(content);
    document.body.appendChild(floater);

    const toggleBtn = header.querySelector(".note-toc-toggle");
    const toggleIcon = header.querySelector(".note-toc-toggle svg");
    const toggle = () => {
      floater.classList.toggle("minimized");
      const isMin = floater.classList.contains("minimized");
      toggleBtn.title = isMin ? "表示" : "最小化";
      toggleIcon.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      toggleIcon.style.transform = isMin
        ? "rotate(180deg)"
        : "rotate(0deg)";
    };

    header.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    minIcon.addEventListener("click", toggle);

    floaterCreated = true;

    const observer = new MutationObserver(updateLinks);
    observer.observe(originalToc, { childList: true, subtree: true });
  }

  function findAndInit() {
    const originalToc = document.querySelector(".o-tableOfContents");
    if (originalToc) {
      createFloater(originalToc);
    }
  }

  findAndInit();

  const bodyObserver = new MutationObserver((mutations) => {
    findAndInit();
  });

  bodyObserver.observe(document.body, { childList: true, subtree: true });
})();
