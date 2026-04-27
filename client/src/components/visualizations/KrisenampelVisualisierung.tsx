/**
 * KrisenampelVisualisierung
 *
 * Interaktive Drei-Stufen-Ampel für die Krisenbegleitung.
 * Zeigt Gelb / Orange / Rot mit Hover-Details und Scroll-Anker.
 * Kein Bild – reine React/Tailwind-Komponente.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown } from "lucide-react";

interface AmpelStufe {
  id: string;
  farbe: "gelb" | "orange" | "rot";
  label: string;
  beschreibung: string;
  signale: string[];
  reaktion: string;
  anker?: string; // Scroll-Anker auf der Seite
}

const stufen: AmpelStufe[] = [
  {
    id: "gelb",
    farbe: "gelb",
    label: "Gelb – Anspannung steigt",
    beschreibung: "Die Situation ist noch handhabbar, aber die Energie kippt.",
    signale: [
      "Erhöhte Reizbarkeit oder Rückzug",
      "Erkennbare Trigger werden aktiv",
      "Kommunikation wird einsilbiger",
      "Körperliche Anspannung sichtbar",
    ],
    reaktion: "Validieren, Raum geben, Skills gemeinsam erinnern",
    anker: "ampel-system",
  },
  {
    id: "orange",
    farbe: "orange",
    label: "Orange – Eskalation",
    beschreibung: "Starke Emotionen dominieren, Kontrolle nimmt ab.",
    signale: [
      "Verbale Aggression oder Vorwürfe",
      "Starke Emotionen, Kontrollverlust",
      "Logisches Gespräch nicht mehr möglich",
      "Körperliche Unruhe oder Erstarrung",
    ],
    reaktion: "Deeskalieren, Sicherheit prüfen, eigene Grenzen setzen",
    anker: "deeskalation",
  },
  {
    id: "rot",
    farbe: "rot",
    label: "Rot – Akute Krise",
    beschreibung: "Akute Gefahr für sich oder andere. Soforthandeln nötig.",
    signale: [
      "Suizidgedanken oder -drohungen",
      "Selbstverletzung oder Fremdgefährdung",
      "Totale Dissoziation oder Kontaktverlust",
      "Akute psychiatrische Dekompensation",
    ],
    reaktion: "Professionelle Hilfe holen – 144 / 117 / 112",
    anker: "krise-formulierungen",
  },
];

const FARB_TOKENS = {
  gelb: {
    dot: "bg-[oklch(0.75_0.12_85)]",
    dotActive: "bg-[oklch(0.65_0.15_85)] ring-4 ring-[oklch(0.65_0.15_85)]/25",
    border: "border-[oklch(0.75_0.12_85)]",
    borderActive: "border-[oklch(0.65_0.15_85)]",
    bg: "bg-[oklch(0.97_0.02_85)]",
    bgActive: "bg-[oklch(0.94_0.03_85)]",
    text: "text-[oklch(0.45_0.1_85)]",
    badge: "bg-[oklch(0.92_0.04_85)] text-[oklch(0.45_0.1_85)]",
    line: "bg-[oklch(0.75_0.12_85)]",
  },
  orange: {
    dot: "bg-[var(--color-sos-orange-text)]",
    dotActive:
      "bg-[var(--color-sos-orange-text)] ring-4 ring-[var(--color-sos-orange-text)]/25",
    border: "border-[var(--color-sos-orange-border)]",
    borderActive: "border-[var(--color-sos-orange-text)]",
    bg: "bg-[var(--color-sos-orange-wash)]",
    bgActive: "bg-[var(--color-sos-orange-light)]",
    text: "text-[var(--color-sos-orange-dark)]",
    badge:
      "bg-[var(--color-sos-orange-light)] text-[var(--color-sos-orange-dark)]",
    line: "bg-[var(--color-sos-orange-text)]",
  },
  rot: {
    dot: "bg-[var(--color-sos-rot)]",
    dotActive:
      "bg-[var(--color-sos-rot)] ring-4 ring-[var(--color-sos-rot)]/25",
    border: "border-[var(--color-sos-rot)]/40",
    borderActive: "border-[var(--color-sos-rot)]",
    bg: "bg-[var(--color-sos-rot-wash)]",
    bgActive: "bg-[oklch(0.96_0.03_25)]",
    text: "text-[var(--color-sos-rot)]",
    badge: "bg-[var(--color-sos-rot-wash)] text-[var(--color-sos-rot)]",
    line: "bg-[var(--color-sos-rot)]",
  },
};

export default function KrisenampelVisualisierung() {
  const [aktiv, setAktiv] = useState<string | null>(null);

  const scrollToAnker = (anker?: string) => {
    if (!anker) return;
    const el = document.getElementById(anker);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="my-6 rounded-2xl border border-border/50 bg-background/60 p-5 md:p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <AlertTriangle className="w-5 h-5 text-sand-warm shrink-0" />
        <p className="text-sm font-semibold text-foreground">
          Krisenampel – auf einen Blick
        </p>
        <span className="ml-auto text-xs text-muted-foreground hidden sm:block">
          Stufe auswählen für Details
        </span>
      </div>

      {/* Ampel-Leiste */}
      <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-stretch">
        {/* Verbindungslinie (nur Desktop) */}
        <div className="hidden sm:block absolute top-[22px] left-[calc(16.66%)] right-[calc(16.66%)] h-0.5 bg-border/50 z-0" />

        {stufen.map((stufe, idx) => {
          const t = FARB_TOKENS[stufe.farbe];
          const isAktiv = aktiv === stufe.id;

          return (
            <div
              key={stufe.id}
              className="flex-1 flex flex-col items-center relative z-10"
            >
              {/* Dot + Linie (Mobile: links, Desktop: oben) */}
              <div className="flex sm:flex-col items-center gap-3 sm:gap-2 w-full sm:w-auto">
                {/* Verbindungslinie Mobile */}
                {idx < stufen.length - 1 && (
                  <div
                    className={`sm:hidden w-0.5 h-6 ${t.line} absolute left-[22px] top-[44px]`}
                  />
                )}

                <button
                  type="button"
                  onClick={() => setAktiv(isAktiv ? null : stufe.id)}
                  className={`
                    w-full sm:w-auto flex sm:flex-col items-center gap-3 sm:gap-2
                    rounded-xl border p-3 sm:p-4 transition-all duration-200
                    hover:-translate-y-0.5 hover:shadow-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${isAktiv ? `${t.bgActive} ${t.borderActive}` : `${t.bg} ${t.border}`}
                  `}
                  aria-expanded={isAktiv}
                >
                  {/* Ampel-Punkt */}
                  <span
                    className={`
                      shrink-0 w-11 h-11 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${isAktiv ? t.dotActive : t.dot}
                    `}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/40" />
                  </span>

                  {/* Label */}
                  <div className="text-left sm:text-center flex-1 sm:flex-none">
                    <p
                      className={`text-xs font-bold uppercase tracking-wide ${t.text}`}
                    >
                      {stufe.farbe.charAt(0).toUpperCase() +
                        stufe.farbe.slice(1)}
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
                      {stufe.label.split(" – ")[1]}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    className={`shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-200 ml-auto sm:ml-0 ${isAktiv ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Detail-Panel */}
              <AnimatePresence>
                {isAktiv && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="w-full overflow-hidden"
                  >
                    <div
                      className={`rounded-xl border p-4 ${t.bg} ${t.borderActive}`}
                    >
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {stufe.beschreibung}
                      </p>

                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                        Typische Signale
                      </p>
                      <ul className="space-y-1 mb-3">
                        {stufe.signale.map(s => (
                          <li
                            key={s}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${t.dot}`}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>

                      <div className={`rounded-lg px-3 py-2.5 ${t.badge}`}>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5">
                          Ihre Reaktion
                        </p>
                        <p className="text-sm font-medium">{stufe.reaktion}</p>
                      </div>

                      {stufe.anker && (
                        <button
                          type="button"
                          onClick={() => scrollToAnker(stufe.anker)}
                          className={`mt-3 text-xs font-medium underline underline-offset-2 ${t.text} hover:opacity-80 transition-opacity`}
                        >
                          Mehr dazu ↓
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer-Hinweis */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Bei akuter Lebensgefahr sofort{" "}
        <a
          href="tel:144"
          className="font-semibold text-[var(--color-sos-rot)] underline underline-offset-2"
        >
          144
        </a>{" "}
        anrufen. Diese Ampel ersetzt keine professionelle Krisenberatung.
      </p>
    </div>
  );
}
