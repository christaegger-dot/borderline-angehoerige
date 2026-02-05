import { useState, useEffect } from "react";
import { ChevronUp, ChevronRight, Home } from "lucide-react";
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
          className="fixed bottom-20 sm:bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.45_0.12_145)] text-white shadow-lg flex items-center justify-center transition-colors"
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

// Inhaltsverzeichnis (Table of Contents)
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Alle H2 und H3 Überschriften finden
    const elements = document.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];
    
    elements.forEach((el, index) => {
      const id = el.id || `heading-${index}`;
      if (!el.id) el.id = id;
      
      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3
      });
    });
    
    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Body-Scroll-Lock für Mobile-Drawer: Verhindert Hintergrund-Scrollen auf iOS/Safari
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

  if (headings.length < 3) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Dynamischer Offset basierend auf Header-Höhe
      const header = document.querySelector('header');
      const headerHeight = header?.getBoundingClientRect().height || 80;
      const offset = headerHeight + 20; // Header + Puffer
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-20 sm:bottom-6 left-4 z-40 px-4 py-2 rounded-full bg-background border border-border shadow-lg flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <span>Inhalt</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-background z-50 shadow-xl overflow-y-auto"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Inhaltsverzeichnis</h3>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {headings.map(({ id, text, level }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToHeading(id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        level === 3 ? "pl-6" : ""
                      } ${
                        activeId === id
                          ? "bg-[oklch(0.85_0.08_55)] text-[oklch(0.35_0.08_55)] font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
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

      {/* Desktop Sidebar - nur auf grossen Bildschirmen */}
      <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 w-56 z-30">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-sm">
          <h4 className="font-display font-semibold text-foreground text-sm mb-3">Auf dieser Seite</h4>
          <nav>
            <ul className="space-y-1">
              {headings.slice(0, 8).map(({ id, text, level }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToHeading(id)}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors line-clamp-2 ${
                      level === 3 ? "pl-4" : ""
                    } ${
                      activeId === id
                        ? "bg-[oklch(0.85_0.08_55)] text-[oklch(0.35_0.08_55)] font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
