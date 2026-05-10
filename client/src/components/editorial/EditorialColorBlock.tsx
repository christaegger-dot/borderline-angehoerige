import type { ReactNode } from "react";
import { EyebrowLabel } from "./EyebrowLabel";

export type EditorialColorBlockVariant = "sage-wash" | "cream-deep";

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
}: EditorialColorBlockProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <section
      className="editorial-color-block px-[var(--container-pad)] py-20 md:px-[var(--container-pad-md)] md:py-[120px]"
      style={{ background: styles.bg }}
      data-variant={variant}
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
    bg: "#eef0ea",
    title: "#1f2a37",
    contentClass: "editorial-color-block-content--sage-wash",
  },
  "cream-deep": {
    bg: "#f3eee3",
    title: "#1f2a37",
    contentClass: "editorial-color-block-content--cream-deep",
  },
};
