import type { ReactNode } from "react";

export interface EditorialHeroMetaItem {
  label: string;
  value: string;
}

interface EditorialHeroProps {
  /** Sage-Eyebrow-Caps oberhalb der H1 */
  eyebrow?: ReactNode;
  /** Hauptüberschrift — H1 in Source Serif, Skalierung über --text-hero */
  title: ReactNode;
  /** Lede-Absatz unterhalb der H1 */
  lede?: ReactNode;
  /** Optionale Meta-Zeilen mit Hairline-Trenner — z.B. «Fachlich geprüft · 30.04.2026» */
  meta?: EditorialHeroMetaItem[];
  /** Visueller Anker rechts (xl 2-Spalten), z.B. <HeroLeuchtturmIllustration /> */
  illustrationSlot?: ReactNode;
}

/**
 * Editorial Hero mit asymmetrischem 2-Spalten-Grid (1.2fr / 1fr) und
 * Hero-typografie (`--text-hero`). Auf Mobile/Tablet einspaltig — Illustration
 * unter dem Text.
 *
 * Bricht aus der EditorialLayout-Lese-Spalte aus: eigener Wrapper mit
 * Container-Padding und max-width 1240px. Wird in Pages **vor** dem
 * EditorialLayout-Block gerendert.
 */
export function EditorialHero({
  eyebrow,
  title,
  lede,
  meta,
  illustrationSlot,
}: EditorialHeroProps) {
  return (
    <section
      className="bg-[var(--bg-primary)] px-[var(--container-pad)] pt-[var(--space-5)] pb-[var(--space-7)] md:px-[var(--container-pad-md)] md:pt-[var(--space-6)] md:pb-[var(--space-8)]"
      aria-label="Seiten-Hero"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
        <div>
          {eyebrow && (
            <span
              className="block text-xs font-medium uppercase"
              style={{
                color: "var(--accent-label)",
                letterSpacing: "var(--tracking-caps)",
                marginBottom: "var(--space-5)",
              }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
              marginBottom: "var(--space-5)",
            }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="max-w-[30em]"
              style={{
                fontSize: "1.375rem",
                lineHeight: "var(--lh-snug)",
                color: "var(--fg-secondary)",
              }}
            >
              {lede}
            </p>
          )}
          {meta && meta.length > 0 && (
            <dl
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-[13px]"
              style={{
                borderColor: "var(--rule-color)",
                color: "var(--fg-tertiary)",
              }}
            >
              {meta.map(item => (
                <div key={item.label} className="flex items-baseline gap-1.5">
                  <dt
                    className="font-medium"
                    style={{ color: "var(--fg-primary)" }}
                  >
                    {item.label}
                  </dt>
                  <dd>· {item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {illustrationSlot && (
          <div
            className="aspect-square w-full max-w-[520px] md:ml-auto"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(91, 58, 78, 0.12))",
            }}
          >
            {illustrationSlot}
          </div>
        )}
      </div>
    </section>
  );
}
