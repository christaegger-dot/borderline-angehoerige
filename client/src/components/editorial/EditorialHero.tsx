import type { ReactNode } from "react";
import { EditorialSection } from "./EditorialSection";

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
  /** Visueller Anker rechts (Aside-Spalte), z.B. <HeroLeuchtturmIllustration /> */
  illustrationSlot?: ReactNode;
}

/**
 * Editorial Hero auf Basis der EditorialSection-Hülle (Phase 1.5).
 *
 * Body trägt eyebrow / H1 / lede / optionale Meta-Zeile. Wenn ein
 * illustrationSlot gesetzt ist, sitzt er in der Aside-Spalte rechtsbündig
 * (margin-left: auto, max-width 560 px, height fills body).
 *
 * Public-API unverändert seit PR #391 — Pages müssen nicht angepasst
 * werden. Layout darunter migriert von eigenem 2-Spalten-Grid (1.2fr/1fr)
 * zu Standard EditorialSection (200px / 608px / 1fr).
 */
export function EditorialHero({
  eyebrow,
  title,
  lede,
  meta,
  illustrationSlot,
}: EditorialHeroProps) {
  return (
    <EditorialSection variant="cream">
      <EditorialSection.Body>
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
      </EditorialSection.Body>

      {illustrationSlot && (
        <EditorialSection.Aside>
          <div
            className="ml-auto flex h-full w-full max-w-[560px] items-center"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(91, 58, 78, 0.12))",
            }}
          >
            {illustrationSlot}
          </div>
        </EditorialSection.Aside>
      )}
    </EditorialSection>
  );
}
