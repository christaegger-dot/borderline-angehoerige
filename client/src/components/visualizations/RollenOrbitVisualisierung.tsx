/**
 * RollenOrbitVisualisierung
 *
 * Orbit-Diagramm für die Therapie-Seite.
 * Zeigt mögliche Beiträge und Grenzen im Therapiesystem.
 * Interaktiv: Klick auf eine Rolle zeigt Details.
 */
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Heart, Stethoscope, User, X } from "lucide-react";

interface OrbitRolle {
  id: string;
  label: string;
  kurz: string;
  icon: React.ElementType;
  tintVar: string;
  moeglicheBeitraege: string[];
  nichtZuErwarten: string[];
}

const rollen: OrbitRolle[] = [
  {
    id: "angehoerige",
    label: "Sie als Angehörige/r",
    kurz: "Ihre Rolle",
    icon: Heart,
    tintVar: "--color-terracotta-mid",
    moeglicheBeitraege: [
      "Kontakt anbieten, wenn er gewünscht und für Sie tragbar ist",
      "Eigene Grenzen kommunizieren",
      "Auf Wunsch bei Behandlungsschritten unterstützen",
      "Eigene Entlastung suchen",
      "Vereinbarungen einhalten, soweit es möglich ist",
    ],
    nichtZuErwarten: [
      "Therapieziele bestimmen",
      "Fortschritt kontrollieren",
      "Behandlung oder Krisenhilfe ersetzen",
      "Motivation oder Genesung herstellen",
    ],
  },
  {
    id: "therapeut",
    label: "Therapeut/in",
    kurz: "Therapie",
    icon: Stethoscope,
    tintVar: "--color-slate-blue",
    moeglicheBeitraege: [
      "Behandlung gemeinsam planen und fachlich begleiten",
      "Skills anbieten und vermitteln (z. B. DBT)",
      "Krisen professionell begleiten",
      "Therapieziele mit der behandelten Person vereinbaren",
      "Angehörige mit Einwilligung einbeziehen",
    ],
    nichtZuErwarten: [
      "Angehörige therapieren",
      "Alle Beziehungsfragen stellvertretend lösen",
      "Rund-um-die-Uhr erreichbar sein",
    ],
  },
  {
    id: "betroffene",
    label: "Person in Behandlung",
    kurz: "Person",
    icon: User,
    tintVar: "--color-sage-mid",
    moeglicheBeitraege: [
      "Eigene Ziele und Wünsche für die Behandlung benennen",
      "Skills ausprobieren, wenn sie passen",
      "Verantwortung für eigenes Handeln soweit möglich übernehmen",
      "Warnzeichen mitteilen, wenn dies möglich und gewünscht ist",
    ],
    nichtZuErwarten: [
      "Angehörige therapieren",
      "Allein für Beziehungsqualität sorgen",
    ],
  },
];

export default function RollenOrbitVisualisierung() {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const aktivRolle = rollen.find(r => r.id === aktiv);
  const AktivIcon = aktivRolle?.icon;

  return (
    <section
      className="my-6 border-t border-b py-5"
      style={{ borderColor: "var(--rule-color)" }}
    >
      {/* Header */}
      <div className="mb-5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
          Visualisierung
        </p>
        <p className="text-sm font-semibold text-foreground mb-1">
          Rollen im Therapiesystem
        </p>
        <p className="text-xs text-muted-foreground">
          Wer kann was beitragen? Klicken Sie auf eine Rolle, um Möglichkeiten
          und Grenzen zu sehen. Was passt, hängt von Wünschen, Einwilligung,
          Situation und verfügbaren Kräften ab.
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/50 bg-background">
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
              const Icon = rolle.icon;
              const tintStyle = { color: `var(${rolle.tintVar})` };
              const chipStyle = isAktiv
                ? {
                    borderColor: `color-mix(in oklch, var(${rolle.tintVar}) 26%, transparent)`,
                    backgroundColor: `color-mix(in oklch, var(${rolle.tintVar}) 8%, white)`,
                  }
                : {
                    borderColor: "var(--rule-color)",
                    backgroundColor: "var(--bg-elevated)",
                  };

              return (
                <button
                  key={rolle.id}
                  type="button"
                  onClick={() => setAktiv(isAktiv ? null : rolle.id)}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    ...chipStyle,
                  }}
                  className={`
                    absolute flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-full border
                    transition-all duration-200 hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    ${isAktiv ? "scale-105" : ""}
                  `}
                  aria-label={rolle.label}
                  aria-pressed={isAktiv}
                >
                  <Icon
                    className="h-5 w-5"
                    style={tintStyle}
                    aria-hidden="true"
                  />
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
                  className="h-2 w-2 rounded-full border"
                  style={{
                    borderColor: `color-mix(in oklch, var(${rolle.tintVar}) 26%, transparent)`,
                    backgroundColor: `color-mix(in oklch, var(${rolle.tintVar}) 14%, white)`,
                  }}
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
              <m.div
                key={aktivRolle.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1rem] border p-4"
                style={{
                  borderColor: `color-mix(in oklch, var(${aktivRolle.tintVar}) 22%, transparent)`,
                  backgroundColor: `color-mix(in oklch, var(${aktivRolle.tintVar}) 5%, var(--bg-primary))`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {AktivIcon && (
                      <AktivIcon
                        className="h-5 w-5"
                        style={{ color: `var(${aktivRolle.tintVar})` }}
                        aria-hidden="true"
                      />
                    )}
                    <p className="text-sm font-semibold text-foreground">
                      {aktivRolle.label}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAktiv(null)}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-background/70 transition-colors hover:bg-background"
                    aria-label="Schliessen"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Mögliche Beiträge – wenn gewünscht und möglich
                    </p>
                    <ul className="space-y-1">
                      {aktivRolle.moeglicheBeitraege.map(a => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{
                              backgroundColor: `var(${aktivRolle.tintVar})`,
                            }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border/30 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Nicht von dieser Rolle zu erwarten
                    </p>
                    <ul className="space-y-1">
                      {aktivRolle.nichtZuErwarten.map(a => (
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
              </m.div>
            ) : (
              <m.div
                key="leer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center rounded-xl border border-dashed border-border/40 p-6"
              >
                <p className="text-sm text-muted-foreground text-center">
                  Klicken Sie auf eine Rolle im Diagramm, um mögliche Beiträge
                  und Grenzen zu sehen.
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Footer */}
      <p className="mt-4 border-t border-border/30 pt-3 text-xs text-muted-foreground">
        <span>
          Grundlage: Linehan, M. M. (1993); Gunderson, J. G. &amp; Hoffman, P.
          D. (2005); S3-Leitlinie Borderline-Persönlichkeitsstörung (AWMF,
          2022).
        </span>
      </p>
    </section>
  );
}
