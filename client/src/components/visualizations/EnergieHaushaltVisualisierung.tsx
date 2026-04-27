/**
 * EnergieHaushaltVisualisierung
 *
 * Visuelles Balkenmodell für die Alltag-Seite.
 * Zeigt was Energie kostet vs. was sie zurückgibt –
 * als interaktive Waage/Balance-Metapher.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface EnergieItem {
  label: string;
  wert: number; // 1–5
  hinweis?: string;
}

const KOSTET: EnergieItem[] = [
  {
    label: "Ständige Wachsamkeit",
    wert: 5,
    hinweis: "Immer auf das nächste Kippen gefasst sein",
  },
  {
    label: "Gespräche, die eskalieren",
    wert: 4,
    hinweis: "Auch wenn sie gut gemeint beginnen",
  },
  {
    label: "Schuldgefühle & Grübeln",
    wert: 4,
    hinweis: "Nächte, in denen Sie Gespräche wiederholen",
  },
  {
    label: "Unvorhersehbarkeit",
    wert: 3,
    hinweis: "Nicht wissen, wie der Abend wird",
  },
  {
    label: "Eigene Bedürfnisse zurückstellen",
    wert: 3,
    hinweis: "Weil gerade wieder kein guter Moment ist",
  },
];

const GIBT_ZURUECK: EnergieItem[] = [
  {
    label: "Klare Grenzen & Routinen",
    wert: 4,
    hinweis: "Vorhersehbarkeit schützt beide Seiten",
  },
  {
    label: "Eigene Auszeiten",
    wert: 5,
    hinweis: "Nicht als Luxus, sondern als Schutzfaktor",
  },
  {
    label: "Gespräche mit Vertrauenspersonen",
    wert: 4,
    hinweis: "Jemand, der zuhört ohne zu urteilen",
  },
  {
    label: "Körperliche Bewegung",
    wert: 3,
    hinweis: "Auch kurze Spaziergänge helfen",
  },
  {
    label: "Momente ohne Rolle",
    wert: 3,
    hinweis: "Zeiten, in denen Sie nicht Angehöriger sind",
  },
];

function EnergieBalken({
  item,
  richtung,
}: {
  item: EnergieItem;
  richtung: "kostet" | "gibt";
}) {
  const [hover, setHover] = useState(false);
  const isKostet = richtung === "kostet";
  const farbe = isKostet
    ? "bg-[var(--color-sos-orange-text)]"
    : "bg-[var(--color-sage-mid)]";
  const farbeBg = isKostet
    ? "bg-[var(--color-sos-orange-wash)]"
    : "bg-sage-wash";
  const borderFarbe = isKostet
    ? "border-[var(--color-sos-orange-border)]"
    : "border-sage-light/70";

  return (
    <div
      className={`relative rounded-xl border p-3 transition-all duration-200 cursor-default ${farbeBg} ${borderFarbe} ${hover ? "shadow-sm" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isKostet ? "bg-[var(--color-sos-orange-light)]" : "bg-sage-lighter"}`}
        >
          {isKostet ? (
            <Minus className="w-3.5 h-3.5 text-[var(--color-sos-orange-text)]" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-sage-mid" />
          )}
        </div>

        {/* Label + Balken */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-tight mb-1.5">
            {item.label}
          </p>
          <div className="h-1.5 rounded-full bg-border/30 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${farbe}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${(item.wert / 5) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
          </div>
        </div>

        {/* Stärke-Dots */}
        <div className="shrink-0 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i < item.wert ? farbe : "bg-border/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Hinweis-Tooltip */}
      {hover && item.hinweis && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-muted-foreground leading-relaxed pl-10"
        >
          {item.hinweis}
        </motion.p>
      )}
    </div>
  );
}

export default function EnergieHaushaltVisualisierung() {
  return (
    <div className="my-6 rounded-2xl border border-border/50 bg-background/60 p-5 md:p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)]">
      {/* Header */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground mb-1">
          Energie-Haushalt im Angehörigenalltag
        </p>
        <p className="text-xs text-muted-foreground">
          Was typischerweise Energie kostet – und was sie zurückgibt. Fahren Sie
          über einen Punkt für mehr Details.
        </p>
      </div>

      {/* Zwei Spalten */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kostet */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sos-orange-text)]" />
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-sos-orange-dark)]">
              Kostet Energie
            </p>
          </div>
          <div className="space-y-2">
            {KOSTET.map(item => (
              <EnergieBalken key={item.label} item={item} richtung="kostet" />
            ))}
          </div>
        </div>

        {/* Gibt zurück */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-sage-mid)]" />
            <p className="text-xs font-bold uppercase tracking-wide text-sage-dark">
              Gibt Energie zurück
            </p>
          </div>
          <div className="space-y-2">
            {GIBT_ZURUECK.map(item => (
              <EnergieBalken key={item.label} item={item} richtung="gibt" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-4 text-xs text-muted-foreground text-center border-t border-border/30 pt-3">
        Selbstfürsorge beginnt mit ehrlicher Wahrnehmung der eigenen
        Energiebilanz.
      </p>
    </div>
  );
}
