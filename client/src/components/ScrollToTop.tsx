import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop-Komponente
 *
 * Behebt das "Scroll-Restore"-Problem auf iOS/Safari:
 * Beim Navigieren merkt sich der Browser die Scroll-Position und setzt
 * den Nutzer auf der neuen Seite an eine ähnliche Stelle – statt ganz oben.
 *
 * Diese Komponente:
 * 1. Deaktiviert die automatische Scroll-Restoration des Browsers
 * 2. Scrollt bei jedem Route-Wechsel nach oben (0, 0)
 * 3. Behandelt auch den iOS/Safari bfcache via pageshow-Event
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const hasHashTarget = hash.length > 0;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!hasHashTarget) {
      window.scrollTo(0, 0);
      document.getElementById("main-content")?.focus({ preventScroll: true });
      return;
    }

    // Hash-Target nach lazy-load erneut anspringen: nach <Redirect> mit
    // Hash existiert das Ziel-Element beim ersten Browser-Scroll noch nicht
    // (Page wird lazy geladen). Wir pollen kurz und scrollen, sobald es da ist.
    let frame: number | null = null;
    let cancelled = false;
    const deadline = performance.now() + 2000;

    const tryScroll = () => {
      if (cancelled) return;
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      if (performance.now() < deadline) {
        frame = window.requestAnimationFrame(tryScroll);
      }
    };
    frame = window.requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [location]);

  useEffect(() => {
    // Zusätzlicher Handler für iOS/Safari bfcache
    const handlePageShow = (event: PageTransitionEvent) => {
      // pageshow triggert auch bei bfcache (iOS/Safari wichtig)
      if (event.persisted) {
        // Seite wurde aus dem bfcache geladen
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
