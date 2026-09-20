/**
 * BelastungHandlungsraeume
 *
 * Drei Handlungsräume statt einer Krisenampel: die Einteilung zeigt, wie weit
 * die eigenen Mittel gerade tragen, und nicht, wie gefährlich eine Situation
 * ist. Ersetzt die frühere KrisenampelVisualisierung.
 *
 * Bewusst ohne Grün-Gelb-Rot-Codierung, ohne Signallisten zu Suizidalität oder
 * Selbstverletzung und ohne Reihenfolge, die als Sicherheitsskala lesbar wäre.
 * Begründung und Quellen stehen in content/belastungHandlungsraeume.ts.
 *
 * Der Sicherheitsausgang liegt bewusst ausserhalb der Einteilung: er steht im
 * Fuss der Komponente und gilt für jeden Bereich gleichermassen.
 *
 * Krisennummern werden aus der Single Source (kontakte.ts) bezogen.
 */
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Compass } from "lucide-react";
import { kontaktByIdStrict } from "@/data/kontakte";
import {
  belastungLead,
  handlungsraeume,
  keineSicherheitsbewertung,
  wichtigeAbgrenzung,
} from "@/content/belastungHandlungsraeume";

// Krisennummern aus Single Source (kontakte.ts)
const k144 = kontaktByIdStrict("ROT_144");
const k117 = kontaktByIdStrict("ROT_117");
const kPuk = kontaktByIdStrict("GELB_PUK_ERW");

export default function BelastungHandlungsraeume() {
  const [aktiv, setAktiv] = useState<string | null>(null);

  return (
    <div className="my-6 rounded-2xl border border-border/55 bg-background p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5">
        <Compass className="h-5 w-5 shrink-0 text-[color:var(--accent-primary)]" />
        <p className="text-sm font-semibold text-foreground">
          Wenn Belastung zunimmt
        </p>
        <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
          Bereich auswählen für Details
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {belastungLead}
      </p>

      {/* Abgrenzung zuerst: die Einteilung ist keine Sicherheitsbewertung */}
      <div className="mb-5 rounded-xl border border-border/55 bg-muted/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {keineSicherheitsbewertung.titel}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {keineSicherheitsbewertung.text}
        </p>
      </div>

      {/* Drei Handlungsräume — neutral gestaltet, nummeriert statt farbcodiert */}
      <ul className="flex list-none flex-col gap-3 p-0">
        {handlungsraeume.map((raum, idx) => {
          const isAktiv = aktiv === raum.id;

          return (
            <li key={raum.id}>
              <button
                type="button"
                onClick={() => setAktiv(isAktiv ? null : raum.id)}
                aria-expanded={isAktiv}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isAktiv
                    ? "border-[color:var(--rule-color-strong)] bg-muted/40"
                    : "border-border/55 bg-background hover:bg-muted/25"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/55 text-sm font-semibold text-muted-foreground"
                >
                  {idx + 1}
                </span>
                <span className="flex-1 text-sm font-semibold leading-tight text-foreground">
                  {raum.label}
                </span>
                <ChevronDown
                  className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isAktiv ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isAktiv && (
                  <m.div
                    key="detail"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border border-border/55 bg-muted/25 p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {raum.beschreibung}
                      </p>
                      <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-foreground">
                        Eher hilfreich
                      </p>
                      <ul className="space-y-1">
                        {raum.hilfreich.map(eintrag => (
                          <li
                            key={eintrag}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--rule-color-strong)]"
                            />
                            {eintrag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {wichtigeAbgrenzung}
      </p>

      {/* Sicherheitsausgang — gilt für jeden Bereich, ausserhalb der Einteilung */}
      <p className="mt-4 border-t border-border/55 pt-4 text-xs text-muted-foreground">
        Unabhängig von dieser Einteilung: bei akuter Lebensgefahr sofort{" "}
        <a
          href={`tel:${k144.tel}`}
          className="font-semibold text-[var(--color-sos-rot)] underline underline-offset-2"
        >
          {k144.nummer}
        </a>
        , bei Gewalt oder Bedrohung{" "}
        <a
          href={`tel:${k117.tel}`}
          className="font-semibold text-[var(--color-sos-rot)] underline underline-offset-2"
        >
          {k117.nummer}
        </a>
        . Bei akuter psychischer Krise ohne unmittelbare Lebensgefahr:{" "}
        <a
          href={`tel:${kPuk.tel}`}
          className="font-semibold text-foreground underline underline-offset-2"
        >
          PUK-Notfall Erwachsene {kPuk.nummer}
        </a>
        . Diese Orientierung ersetzt keine professionelle Krisenberatung.{" "}
        <span className="opacity-60">
          Grundlage: NICE NG225 und CG78; redaktionelle Freigabeprüfung vom
          20.09.2026.
        </span>
      </p>
    </div>
  );
}
