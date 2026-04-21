(function () {
  const hasHomePrerender =
    document.documentElement?.dataset.routePrerender === "home";

  const revealFallback = () => {
    if (hasHomePrerender) return;
    if (document.body?.dataset.appReady === "true") return;
    document.body?.setAttribute("data-startup-fallback-visible", "true");
  };

  const startupTimer = window.setTimeout(revealFallback, 2500);

  window.addEventListener("error", revealFallback, { once: true });
  window.addEventListener("unhandledrejection", revealFallback, {
    once: true,
  });
  window.addEventListener(
    "app-ready",
    () => {
      window.clearTimeout(startupTimer);
    },
    { once: true }
  );
})();
