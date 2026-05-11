import type { ReactNode } from "react";
import { DisplayHeading } from "./DisplayHeading";
import { EditorialSection } from "./EditorialSection";
import { Lede } from "./Lede";

export interface EditorialHeroMetaItem {
  label: string;
  value: string;
}

interface EditorialHeroProps {
  /** Sage-Caps-Anker (sitzt in der MarginNote-Spalte links, nicht im Body) */
  eyebrow?: ReactNode;
  /** Hauptüberschrift — H1 in Source Serif, Skalierung über --text-hero */
  title: ReactNode;
  /** Lede-Absatz unterhalb der H1 */
  lede?: ReactNode;
  /** Optionale Meta-Zeilen mit Hairline-Trenner */
  meta?: EditorialHeroMetaItem[];
  /** Visueller Anker rechts (Aside-Spalte), z.B. <HeroLeuchtturmIllustration /> */
  illustrationSlot?: ReactNode;
}

/**
 * Editorial Hero auf Basis der EditorialSection-Hülle (Phase 1.5).
 *
 * Layout:
 * - MarginNote (160 px links): Sage-Caps-Anker (Eyebrow), wirkt wie
 *   Magazintitel/Kapitelmarker
 * - Body (608 px Mitte): H1 / Lede / optionale Meta
 * - Aside (1fr rechts): illustrationSlot, quadratisch (aspect-ratio 1:1),
 *   max-w 560 px, rechtsbündig
 *
 * Public-API unverändert seit PR #391 — Pages müssen nicht angepasst
 * werden. H1 + Lede sind intern auf <DisplayHeading> und <Lede>
 * umgestellt; Eyebrow-MarginNote bleibt handgerollt (text-xs statt
 * 13px-Variante der anderen MarginNotes).
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
      {eyebrow && (
        <EditorialSection.MarginNote>
          <span
            className="block text-xs font-medium uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              lineHeight: 1.4,
            }}
          >
            {eyebrow}
          </span>
        </EditorialSection.MarginNote>
      )}
      <EditorialSection.Body>
        <DisplayHeading level={1}>{title}</DisplayHeading>
        {lede && <Lede size="hero">{lede}</Lede>}
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
            className="ml-auto block w-full max-w-[560px] min-h-[320px] md:min-h-[380px]"
            style={{
              aspectRatio: "1 / 1",
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
