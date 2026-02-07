import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronRight, Home, List, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

// Lesefortschritt-Anzeige
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Nur anzeigen wenn es etwas zu scrollen gibt
  if (progress === 0 && window.scrollY === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[oklch(0.65_0.12_55)] to-[oklch(0.55_0.10_145)]"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// Zurück-nach-oben-Button
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-auto sm:right-4 z-40 w-12 h-12 rounded-full bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.45_0.12_145)] text-white shadow-lg flex items-center justify-center transition-colors"
          aria-label="Nach oben scrollen"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Breadcrumb-Navigation
const pageNames: Record<string, string> = {
  "/": "Startseite",
  "/verstehen": "Borderline verstehen",
  "/unterstuetzen": "Unterstützen",
  "/unterstuetzen/uebersicht": "Unterstützen: Grundlagen",
  "/unterstuetzen/alltag": "Unterstützen: Alltag",
  "/unterstuetzen/therapie": "Unterstützen: Therapie",
  "/unterstuetzen/krise": "Unterstützen: Krise",
  "/kommunizieren": "Kommunizieren",
  "/grenzen": "Grenzen setzen",
  "/selbstfuersorge": "Selbstfürsorge",
  "/soforthilfe": "Soforthilfe",
  "/materialien": "Materialien",
  "/selbsttest": "Selbsttest",
  "/genesung": "Genesung",
  "/selbsthilfegruppen": "Selbsthilfegruppen",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
  "/ueber-uns": "Über uns"
};

export function Breadcrumbs() {
  const [location] = useLocation();
  
  // Nicht auf der Startseite anzeigen
  if (location === "/") return null;

  const pageName = pageNames[location] || location.replace("/", "");

  return (
    <nav className="container py-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Startseite</span>
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{pageName}</span>
        </li>
      </ol>
    </nav>
  );
}

// Inhaltsverzeichnis (Table of Contents) mit aktiver Markierung und Mobile Drawer
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  // Scroll-basierte aktive Markierung (kein IntersectionObserver nötig)
  const activeNavRef = useRef<HTMLButtonElement | null>(null);

  // Headings scannen
  useEffect(() => {
    // Kurz warten, damit ContentSections gerendert sind
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("h2, h3");
      const items: TOCItem[] = [];
      
      elements.forEach((el, index) => {
        // Prüfen ob das Heading innerhalb einer ContentSection liegt
        const contentSectionWrapper = el.closest('[id]:not(h2):not(h3)');
        const isInsideContentSection = contentSectionWrapper?.querySelector('[aria-expanded]') !== null;
        
        let id: string;
        if (isInsideContentSection && contentSectionWrapper?.id && !contentSectionWrapper.id.startsWith('heading-')) {
          id = contentSectionWrapper.id;
        } else {
          id = el.id || `heading-${index}`;
          if (!el.id) el.id = id;
        }
        
        // Duplikate vermeiden
        if (!items.some(item => item.id === id)) {
          items.push({
            id,
            text: el.textContent || "",
            level: el.tagName === "H2" ? 2 : 3
          });
        }
      });
      
      setHeadings(items);
      // Ersten Eintrag als aktiv setzen
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-basierte aktive Markierung
  useEffect(() => {
    if (headings.length === 0) return;

    // Scroll-basierte Erkennung: Welcher Abschnitt ist am nächsten am oberen Viewport-Rand?
    const handleScroll = () => {
      const headerHeight = 80;
      let bestId = headings[0]?.id || "";
      let bestDistance = -Infinity;

      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        const distance = rect.top - headerHeight;
        
        // Wähle den letzten Abschnitt, der den Header-Bereich passiert hat (distance <= 100)
        // oder noch knapp darunter ist
        if (distance <= 100 && distance > bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      // Fallback: Wenn kein Abschnitt den Header passiert hat, nimm den ersten
      if (bestDistance === -Infinity) {
        bestId = headings[0]?.id || "";
      }

      // Wenn wir ganz unten sind, den letzten Eintrag aktivieren
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        bestId = headings[headings.length - 1]?.id || bestId;
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial ausführen

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  // Aktiven Eintrag in der Desktop-Sidebar in den sichtbaren Bereich scrollen
  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  // Body-Scroll-Lock für Mobile-Drawer
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isContentSection = el.querySelector('[aria-expanded]') !== null;

      if (isContentSection) {
        window.dispatchEvent(
          new CustomEvent("open-section", { detail: { sectionId: id } })
        );
      } else {
        const header = document.querySelector('header');
        const headerHeight = header?.getBoundingClientRect().height || 80;
        const offset = headerHeight + 20;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }

      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  if (headings.length < 3) return null;

  // Aktiver Eintrag Styling
  const activeClass = "bg-[oklch(0.92_0.06_55)] text-[oklch(0.35_0.10_55)] font-semibold border-l-2 border-l-[oklch(0.55_0.12_55)]";
  const inactiveClass = "text-muted-foreground hover:text-foreground hover:bg-muted/60";

  return (
    <>
      {/* ─── Mobile: Floating TOC Button ─── */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-20 sm:bottom-6 left-4 z-40 h-11 px-4 rounded-full bg-background border border-border shadow-lg flex items-center gap-2 text-sm font-medium text-foreground"
        whileTap={{ scale: 0.95 }}
        aria-label="Inhaltsverzeichnis öffnen"
      >
        <List className="w-4 h-4" />
        <span>Inhalt</span>
      </motion.button>

      {/* ─── Mobile: Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Mobile: Drawer von unten ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="lg:hidden fixed left-0 right-0 bottom-0 max-h-[70vh] bg-background z-50 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-foreground text-base">Inhaltsverzeichnis</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
                aria-label="Schliessen"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Drawer Content */}
            <nav className="overflow-y-auto overscroll-contain px-3 py-3 flex-1">
              <ul className="space-y-0.5">
                {headings.map(({ id, text, level }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToHeading(id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        level === 3 ? "pl-7" : ""
                      } ${
                        activeId === id ? activeClass : inactiveClass
                      }`}
                    >
                      {text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Desktop: Sticky Sidebar ─── */}
      <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 w-56 z-30 max-h-[70vh]">
        <div className="bg-background/90 backdrop-blur-md rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col max-h-[70vh]">
          <div className="px-4 pt-4 pb-2">
            <h4 className="font-display font-semibold text-foreground text-sm">Auf dieser Seite</h4>
          </div>
          <nav className="overflow-y-auto overscroll-contain px-2 pb-3 flex-1">
            <ul className="space-y-0.5">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    ref={activeId === id ? activeNavRef : null}
                    onClick={() => scrollToHeading(id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 line-clamp-2 ${
                      level === 3 ? "pl-5" : ""
                    } ${
                      activeId === id ? activeClass : inactiveClass
                    }`}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

// Tastaturnavigation-Hinweis
export function KeyboardShortcuts() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Zeige Hinweis bei "?" Taste
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        setShowHint(prev => !prev);
      }
      
      // Schnellnavigation mit Zahlen (nur wenn kein Input fokussiert)
      if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        const shortcuts: Record<string, string> = {
          "1": "/verstehen",
          "2": "/unterstuetzen",
          "3": "/kommunizieren",
          "4": "/grenzen",
          "5": "/selbstfuersorge",
          "n": "/soforthilfe",
          "h": "/"
        };
        
        if (shortcuts[e.key]) {
          window.location.href = shortcuts[e.key];
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background rounded-xl p-4 shadow-xl"
        >
          <h4 className="font-semibold mb-2">Tastaturkürzel</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <div><kbd className="px-1.5 py-0.5 bg-background/20 rounded text-xs">1-5</kbd> Hauptseiten</div>
            <div><kbd className="px-1.5 py-0.5 bg-background/20 rounded text-xs">N</kbd> Notfall</div>
            <div><kbd className="px-1.5 py-0.5 bg-background/20 rounded text-xs">H</kbd> Startseite</div>
            <div><kbd className="px-1.5 py-0.5 bg-background/20 rounded text-xs">⌘K</kbd> Suche</div>
            <div><kbd className="px-1.5 py-0.5 bg-background/20 rounded text-xs">?</kbd> Diese Hilfe</div>
          </div>
          <p className="text-xs mt-2 opacity-70">Drücken Sie ? zum Schliessen</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
