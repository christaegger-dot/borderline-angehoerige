/**
 * RollenOrbitVisualisierung
 *
 * Orbit-Diagramm für die Therapie-Seite.
 * Zeigt die Rollen im Therapiesystem: Was ist Aufgabe der Angehörigen,
 * was gehört zur Therapie, was liegt beim Betroffenen.
 * Interaktiv: Klick auf eine Rolle zeigt Details.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stethoscope, User, X } from "lucide-react";

interface OrbitRolle {
  id: string;
  label: string;
  kurz: string;
  icon: React.ReactNode;
  farbe: string;
  farbeBg: string;
  farbeBorder: string;
  aufgaben: string[];
  nichtAufgaben: string[];
  position: { top: string; left: string };
}

const rollen: OrbitRolle[] = [
  {
    id: "angehoerige",
    label: "Sie als Angehörige/r",
    kurz: "Ihre Rolle",
    icon: <Heart className="w-5 h-5" />,
    farbe: "text-terracotta-mid",
    farbeBg: "bg-terracotta-wash",
    farbeBorder: "border-terracotta-light",
    aufgaben: [
      "Stabile Präsenz zeigen",
      "Eigene Grenzen kommunizieren",
      "Therapie emotional mittragen",
      "Eigene Entlastung suchen",
      "Verlässlich und berechenbar bleiben",
    ],
    nichtAufgaben: [
      "Therapieziele vorgeben",
      "Fortschritt kontrollieren",
      "Therapeut ersetzen",
      "Motivation übernehmen",
    ],
    position: { top: "10%", left: "10%" },
  },
  {
    id: "therapeut",
    label: "Therapeut/in",
    kurz: "Therapie",
    icon: <Stethoscope className="w-5 h-5" />,
    farbe: "text-slate-blue",
    farbeBg: "bg-slate-wash",
    farbeBorder: "border-slate-light",
    aufgaben: [
      "Behandlung planen und leiten",
      "Skills vermitteln (z.B. DBT)",
      "Krisen professionell begleiten",
      "Therapieziele mit Betroffenen setzen",
      "Angehörige ggf. einbeziehen",
    ],
    nichtAufgaben: [
      "Angehörige therapieren",
      "Familienprobleme lösen",
      "Rund-um-die-Uhr erreichbar sein",
    ],
    position: { top: "10%", left: "60%" },
  },
  {
    id: "betroffene",
    label: "Betroffene Person",
    kurz: "Betroffene/r",
    icon: <User className="w-5 h-5" />,
    farbe: "text-sage-mid",
    farbeBg: "bg-sage-wash",
    farbeBorder: "border-sage-light",
    aufgaben: [
      "Eigene Therapiemotivation entwickeln",
      "Skills im Alltag üben",
      "Verantwortung für eigenes Handeln",
      "Krisen-Signale früh kommunizieren",
    ],
    nichtAufgaben: [
      "Angehörige therapieren",
      "Allein für Beziehungsqualität sorgen",
    ],
    position: { top: "55%", left: "35%" },
  },
];

export default function RollenOrbitVisualisierung() {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const aktivRolle = rollen.find(r => r.id === aktiv);

  return (
    <div className="my-6 rounded-2xl border border-border/50 bg-background/60 p-5 md:p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)]">
      {/* Header */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-foreground mb-1">
          Rollen im Therapiesystem
        </p>
        <p className="text-xs text-muted-foreground">
          Wer trägt was? Klicken Sie auf eine Rolle, um Aufgaben und
          Abgrenzungen zu sehen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 items-start">
        {/* Orbit-Diagramm (vereinfacht als 3 Karten mit Verbindungslinien-Illusion) */}
        <div className="relative">
          {/* Zentraler Kreis */}
          <div className="relative mx-auto w-full max-w-[280px] aspect-square">
            {/* Orbit-Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-border/40" />
            <div className="absolute inset-12 rounded-full border border-border/25" />

            {/* Zentrum */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-border/50 flex items-center justify-center shadow-sm">
                <p className="text-[10px] font-semibold text-muted-foreground text-center leading-tight px-1">
                  Therapie-
                  <br />
                  system
                </p>
              </div>
            </div>

            {/* Rollen-Buttons auf dem Orbit */}
            {rollen.map((rolle, idx) => {
              // Gleichmässig auf dem Kreis verteilen
              const winkel = (idx / rollen.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 42; // % vom Container
              const x = 50 + radius * Math.cos(winkel);
              const y = 50 + radius * Math.sin(winkel);
              const isAktiv = aktiv === rolle.id;

              return (
                <button
                  key={rolle.id}
                  type="button"
                  onClick={() => setAktiv(isAktiv ? null : rolle.id)}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`
                    absolute w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center gap-0.5
                    transition-all duration-200 hover:scale-105 hover:shadow-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${isAktiv ? `${rolle.farbeBg} ${rolle.farbeBorder} shadow-md scale-105` : `bg-background ${rolle.farbeBorder}`}
                  `}
                  aria-label={rolle.label}
                  aria-pressed={isAktiv}
                >
                  <span className={rolle.farbe}>{rolle.icon}</span>
                  <span className="text-[9px] font-semibold text-foreground leading-tight text-center px-0.5">
                    {rolle.kurz}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legende */}
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {rollen.map(rolle => (
              <button
                key={rolle.id}
                type="button"
                onClick={() => setAktiv(aktiv === rolle.id ? null : rolle.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-opacity ${aktiv && aktiv !== rolle.id ? "opacity-40" : "opacity-100"}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${rolle.farbeBg} border ${rolle.farbeBorder}`}
                />
                <span className="text-muted-foreground">{rolle.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail-Panel */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            {aktivRolle ? (
              <motion.div
                key={aktivRolle.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl border p-4 ${aktivRolle.farbeBg} ${aktivRolle.farbeBorder}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={aktivRolle.farbe}>{aktivRolle.icon}</span>
                    <p className="text-sm font-semibold text-foreground">
                      {aktivRolle.label}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAktiv(null)}
                    className="w-6 h-6 rounded-full bg-background/70 flex items-center justify-center hover:bg-background transition-colors"
                    aria-label="Schliessen"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Aufgaben
                    </p>
                    <ul className="space-y-1">
                      {aktivRolle.aufgaben.map(a => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${aktivRolle.farbeBg} border ${aktivRolle.farbeBorder}`}
                            style={{ backgroundColor: "currentColor" }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border/30 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Nicht Ihre Aufgabe
                    </p>
                    <ul className="space-y-1">
                      {aktivRolle.nichtAufgaben.map(a => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border/60 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="leer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center rounded-xl border border-dashed border-border/40 p-6"
              >
                <p className="text-sm text-muted-foreground text-center">
                  Klicken Sie auf eine Rolle im Diagramm, um Aufgaben und
                  Abgrenzungen zu sehen.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
