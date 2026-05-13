import { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ContentSectionProps {
  /** Überschrift des Abschnitts */
  title: string;
  /** HTML-ID für Ankerlinks und Inhaltsverzeichnis */
  id?: string;
  /** Ob der Abschnitt initial geöffnet ist */
  defaultOpen?: boolean;
  /** Inhalt des Abschnitts */
  children: React.ReactNode;
  /** Kurze Vorschau, die im geschlossenen Zustand sichtbar bleibt */
  preview?: React.ReactNode;
  /** Kompatibilitäts-Prop für bestehende Callsites; nur editorial wird unterstützt. */
  variant?: "editorial";
}

/**
 * Aufklappbarer Inhaltsabschnitt mit sanfter Animation.
 * Unterstützt programmatisches Öffnen via Custom Event "open-section".
 * Nach dem Öffnen scrollt die Komponente sanft in den Viewport.
 */
export default function ContentSection({
  title,
  id,
  defaultOpen = false,
  children,
  preview,
  variant: _variant = "editorial",
}: ContentSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef(false);
  const pendingScrollBehaviorRef = useRef<ScrollBehavior>("smooth");
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const scrollToSection = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (!sectionRef.current) return;
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height || 80;
    const offset = headerHeight + 20;
    const top =
      sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior });
  }, []);

  const openFromHash = useCallback(() => {
    if (!id) return;

    const hashTarget = decodeURIComponent(
      window.location.hash.replace(/^#/, "")
    );
    if (hashTarget !== id) return;

    if (!isOpenRef.current) {
      pendingScrollRef.current = true;
      pendingScrollBehaviorRef.current = "auto";
      setIsOpen(true);
      return;
    }

    scrollToSection("auto");
  }, [id, scrollToSection]);

  // Auf Custom Event "open-section" lauschen
  useEffect(() => {
    if (!id) return;

    const handleOpenSection = (e: Event) => {
      const detail = (e as CustomEvent<{ sectionId: string }>).detail;
      if (detail.sectionId === id) {
        if (!isOpenRef.current) {
          pendingScrollRef.current = true;
          pendingScrollBehaviorRef.current = "smooth";
          setIsOpen(true);
        } else {
          scrollToSection("smooth");
        }
      }
    };

    window.addEventListener("open-section", handleOpenSection);
    return () => window.removeEventListener("open-section", handleOpenSection);
  }, [id, scrollToSection]);

  useEffect(() => {
    if (!id) return;

    const handleHashChange = () => openFromHash();

    openFromHash();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [id, openFromHash]);

  // Nach dem Öffnen (State-Wechsel) sanft scrollen
  useEffect(() => {
    if (isOpen && pendingScrollRef.current) {
      pendingScrollRef.current = false;
      const behavior = pendingScrollBehaviorRef.current;
      pendingScrollBehaviorRef.current = "smooth";

      // Nach dem DOM-Update in den nächsten Frame warten, damit geöffnete
      // Inhalte ihre Höhe bereits beisteuern. Für Hash-Navigation springen wir
      // direkt, für user-getriggerte Öffnungen bleibt smooth scrolling aktiv.
      let cancelled = false;
      const rafA = requestAnimationFrame(() => {
        const rafB = requestAnimationFrame(() => {
          if (!cancelled) {
            scrollToSection(behavior);
          }
        });

        if (cancelled) {
          cancelAnimationFrame(rafB);
        }
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(rafA);
      };
    }
  }, [isOpen, scrollToSection]);

  return (
    <div
      ref={sectionRef}
      id={id}
      data-content-section=""
      className="border-t"
      style={{ borderColor: "var(--rule-color)" }}
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
        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="group flex w-full items-center justify-between gap-3 py-5 text-left transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-primary)]"
          aria-expanded={isOpen}
          aria-controls={id ? `section-content-${id}` : undefined}
          aria-label={`Abschnitt ${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            style={{ color: "var(--fg-tertiary)" }}
            aria-hidden="true"
          />
        </button>
      </h2>
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
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div id={id ? `section-content-${id}` : undefined} className="pb-6">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
