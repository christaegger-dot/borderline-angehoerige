import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ContentSectionProps {
  /** Überschrift des Abschnitts */
  title: string;
  /** Icon-Komponente (Lucide). Im editorial-Variante ignoriert. */
  icon?: React.ReactNode;
  /** HTML-ID für Ankerlinks und Inhaltsverzeichnis */
  id?: string;
  /** Ob der Abschnitt initial geöffnet ist */
  defaultOpen?: boolean;
  /** Inhalt des Abschnitts */
  children: React.ReactNode;
  /** Kurze Vorschau, die im geschlossenen Zustand sichtbar bleibt */
  preview?: React.ReactNode;
  /**
   * "card" (Default): bestehendes Sanctuary-Calm-Layout (weisser Karten-BG,
   * sage-Akzent-Border, rounded-md, Icon im Header).
   * "editorial": Phase-4-Editorial-Pattern — kein Icon, kein Karten-BG,
   * hairline-Trenner zwischen Items, Display-Serif-Title, kantiger Radius.
   */
  variant?: "card" | "editorial";
}

/**
 * Aufklappbarer Inhaltsabschnitt mit sanfter Animation.
 * Unterstützt programmatisches Öffnen via Custom Event "open-section".
 * Nach dem Öffnen scrollt die Komponente sanft in den Viewport.
 */
export default function ContentSection({
  title,
  icon,
  id,
  defaultOpen = false,
  children,
  preview,
  variant = "card",
}: ContentSectionProps) {
  const isEditorial = variant === "editorial";
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef(false);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const scrollToSection = () => {
    if (!sectionRef.current) return;
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height || 80;
    const offset = headerHeight + 20;
    const top =
      sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Auf Custom Event "open-section" lauschen
  useEffect(() => {
    if (!id) return;

    const handleOpenSection = (e: Event) => {
      const detail = (e as CustomEvent<{ sectionId: string }>).detail;
      if (detail.sectionId === id) {
        if (!isOpenRef.current) {
          pendingScrollRef.current = true;
          setIsOpen(true);
        } else {
          scrollToSection();
        }
      }
    };

    window.addEventListener("open-section", handleOpenSection);
    return () => window.removeEventListener("open-section", handleOpenSection);
  }, [id]);

  // Nach dem Öffnen (State-Wechsel) sanft scrollen
  useEffect(() => {
    if (isOpen && pendingScrollRef.current) {
      pendingScrollRef.current = false;
      // Kurz warten bis die Animation begonnen hat
      const timer = setTimeout(() => {
        scrollToSection();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (isEditorial) {
    return (
      <div
        ref={sectionRef}
        id={id}
        className="border-t"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="group flex w-full items-center justify-between gap-3 py-5 text-left transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)]"
          aria-expanded={isOpen}
          aria-controls={id ? `section-content-${id}` : undefined}
          aria-label={`Abschnitt ${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            {title}
          </h2>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            style={{ color: "var(--fg-tertiary)" }}
            aria-hidden="true"
          />
        </button>
        {!isOpen && preview && (
          <p
            className="-mt-2 mb-5 line-clamp-2"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            {preview}
          </p>
        )}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div
                id={id ? `section-content-${id}` : undefined}
                className="pb-6"
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="mb-6" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        className="w-full text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-xl active:bg-sand-muted"
        aria-expanded={isOpen}
        aria-controls={id ? `section-content-${id}` : undefined}
        aria-label={`Abschnitt ${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
      >
        <div className="flex items-center justify-between gap-3 p-4 rounded-md bg-white hover:bg-sage-wash/50 active:bg-sage-wash/50 border border-border border-l-4 border-l-sage-dark transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            {icon}
            <h2 className="text-xl md:text-2xl font-normal text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {!isOpen && preview && (
          <p className="text-sm text-muted-foreground mt-2 px-4 line-clamp-2">
            {preview}
          </p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              id={id ? `section-content-${id}` : undefined}
              className="pt-5 px-1 text-sm leading-relaxed"
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
