(function () {
  const fontStylesheetHref =
    "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap";

  document.documentElement.dataset.routePrerender =
    window.location.pathname === "/" ? "home" : "none";

  const appendLink = (rel, href, options = {}) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
      return;
    }

    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    Object.entries(options).forEach(([key, value]) => {
      if (value === true) {
        link.setAttribute(key, "");
        return;
      }
      link.setAttribute(key, String(value));
    });
    document.head.appendChild(link);
  };

  const loadFonts = () => {
    if (document.documentElement.dataset.fontsReady === "true") {
      return;
    }

    document.documentElement.dataset.fontsReady = "true";
    appendLink("preconnect", "https://fonts.googleapis.com");
    appendLink("preconnect", "https://fonts.gstatic.com", {
      crossorigin: true,
    });
    appendLink("stylesheet", fontStylesheetHref);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadFonts, { timeout: 1500 });
  } else {
    window.addEventListener("load", loadFonts, { once: true });
  }
})();
