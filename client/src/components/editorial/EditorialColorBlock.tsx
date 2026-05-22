import type { CSSProperties, ReactNode } from "react";
import { EyebrowLabel } from "./EyebrowLabel";

export type EditorialColorBlockVariant = "sage-wash" | "cream-deep";
type EditorialColorBlockDensity = "compact" | "normal" | "spacious";

interface EditorialColorBlockProps {
  /** Farbflächen-Variant — bestimmt Hintergrund und Text-Overrides */
  variant: EditorialColorBlockVariant;
  /** Sage-Eyebrow oberhalb des Titels (optional) */
  label?: string;
  /** H2-Titel der Sektion (optional) */
  title?: ReactNode;
  children: ReactNode;
  /** Inner max-width — Default `var(--measure)` (608 px). Für breitere Blöcke wie das Testimonial 45rem (720 px). */
  maxWidth?: string;
  /** Vertikaler Makro-Rhythmus. Default `normal`, für ruhige Zwischenrufe `compact`. */
  density?: EditorialColorBlockDensity;
}

/**
 * Vollflächige Akzent-Sektion auf hellem Hintergrund (sage-wash, cream-deep).
 *
 * Aubergine-Variante wurde in Phase 1.5 nach EditorialSection migriert
 * (PR #394 + Schritt-6-Cleanup #397). Diese Komponente bedient nur noch
 * die helleren Variants — H2/Eyebrow nutzen Default-Tokens (dunkler Text
 * auf hellem Cream/Sage-Wash-Hintergrund), keine WCAG-Hex-Overrides nötig.
 *
 * Zukünftige Migration: Testimonial-Sektion auf Home (einziger Konsument
 * von sage-wash) auf EditorialSection umstellen, dann diese Komponente
 * komplett entfernen.
 */
export function EditorialColorBlock({
  variant,
  label,
  title,
  children,
  maxWidth = "var(--measure)",
  density = "normal",
}: EditorialColorBlockProps) {
  const styles = VARIANT_STYLES[variant];
  const rhythm = DENSITY_Y[density];
  const sectionStyle = {
    background: styles.bg,
    "--section-y-mobile": rhythm.mobile,
    "--section-y-desktop": rhythm.desktop,
  } as CSSProperties;

  return (
    <section
      className="editorial-color-block px-[var(--container-pad)] py-[var(--section-y-mobile)] md:px-[var(--container-pad-md)] md:py-[var(--section-y-desktop)]"
      style={sectionStyle}
      data-variant={variant}
      data-density={density}
    >
      <div
        className={`mx-auto space-y-[var(--space-4)] ${styles.contentClass}`}
        style={{ maxWidth }}
      >
        {label && <EyebrowLabel tone="muted">{label}</EyebrowLabel>}
        {title && (
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              lineHeight: "var(--lh-snug)",
              color: styles.title,
              fontWeight: "var(--weight-display)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

const VARIANT_STYLES: Record<
  EditorialColorBlockVariant,
  {
    bg: string;
    title: string;
    contentClass: string;
  }
> = {
  "sage-wash": {
    bg: "var(--bg-sage-wash)",
    title: "var(--fg-primary)",
    contentClass: "editorial-color-block-content--sage-wash",
  },
  "cream-deep": {
    bg: "var(--bg-cream-deep)",
    title: "var(--fg-primary)",
    contentClass: "editorial-color-block-content--cream-deep",
  },
};

const DENSITY_Y: Record<
  EditorialColorBlockDensity,
  { mobile: string; desktop: string }
> = {
  compact: {
    mobile: "var(--section-y-compact-mobile)",
    desktop: "var(--section-y-compact-desktop)",
  },
  normal: {
    mobile: "var(--section-y-normal-mobile)",
    desktop: "var(--section-y-normal-desktop)",
  },
  spacious: {
    mobile: "var(--section-y-spacious-mobile)",
    desktop: "var(--section-y-spacious-desktop)",
  },
};
