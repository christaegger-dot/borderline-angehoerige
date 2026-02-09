import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ContentSectionProps {
  /** Überschrift des Abschnitts */
  title: string;
  /** Icon-Komponente (Lucide) */
  icon: React.ReactNode;
  /** HTML-ID für Ankerlinks und Inhaltsverzeichnis */
  id?: string;
  /** Ob der Abschnitt initial geöffnet ist */
  defaultOpen?: boolean;
  /** Inhalt des Abschnitts */
  children: React.ReactNode;
  /** Kurze Vorschau, die im geschlossenen Zustand sichtbar bleibt */
  preview?: React.ReactNode;
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
}: ContentSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef(false);

  // Auf Custom Event "open-section" lauschen
  useEffect(() => {
    if (!id) return;

    const handleOpenSection = (e: Event) => {
      const detail = (e as CustomEvent<{ sectionId: string }>).detail;
      if (detail.sectionId === id) {
        if (!isOpen) {
          pendingScrollRef.current = true;
          setIsOpen(true);
        } else {
          // Bereits offen → direkt scrollen
          scrollToSection();
        }
      }
    };

    window.addEventListener("open-section", handleOpenSection);
    return () => window.removeEventListener("open-section", handleOpenSection);
  }, [id, isOpen]);

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

  const scrollToSection = () => {
    if (!sectionRef.current) return;
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height || 80;
    const offset = headerHeight + 20;
    const top =
      sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6"
      id={id}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isOpen}
        aria-label={`Abschnitt ${title} ${isOpen ? 'zuklappen' : 'aufklappen'}`}
      >
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-cream hover:bg-sand-muted border border-border/40 transition-all duration-400">
          <div className="flex items-center gap-3 min-w-0">
            {icon}
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-500 ${
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 px-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
