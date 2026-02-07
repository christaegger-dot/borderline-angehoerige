import { useState } from "react";
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
  preview?: string;
}

/**
 * Aufklappbarer Inhaltsabschnitt mit sanfter Animation.
 * Ersetzt die statischen motion.div-Wrapper auf langen Inhaltsseiten.
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6"
      id={id}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[oklch(0.97_0.01_85)] hover:bg-[oklch(0.95_0.02_85)] border border-border/40 transition-all duration-200">
          <div className="flex items-center gap-3 min-w-0">
            {icon}
            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
              {title}
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 px-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
