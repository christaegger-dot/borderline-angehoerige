import type { ReactNode } from "react";

export type EditorialColorBlockVariant =
  | "aubergine"
  | "sage-wash"
  | "cream-deep";

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
 * Vollflächige Akzent-Sektion (bricht aus der Lese-Spalte aus). Setzt für
 * dunkle Variants (aubergine) explizite Hex-Farben auf eyebrow/title via
 * Inline-Style — kein `var()`-Token, kein `inherit`. Damit ist die
 * Spezifizitäts-Falle (globale `h2.display { color: var(--fg-primary) }`)
 * nicht aktiv: Inline-Styles haben höhere Spezifität als jede Klassen-Regel.
 *
 * Für Children-Text-Elemente (Prose, Drop-Cap, Links) hängen passende
 * scoped CSS-Regeln in `index.css` (Suffix `editorial-color-block-content--*`).
 *
 * TODO (Phase 1.5 / Schritt 6 Konsolidierung): Variant `aubergine` wird
 * nicht mehr genutzt — die Aubergine-Sektion auf der Home läuft jetzt
 * über `EditorialSection variant="aubergine"`. Variant aus dem Union-Type
 * entfernen + zugehörige scoped CSS in index.css aufräumen, sobald
 * auch `sage-wash`/`cream-deep` migriert sind oder explizit als Legacy
 * akzeptiert werden.
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
        {label && (
          <p
            className="text-xs uppercase"
            style={{
              color: styles.label,
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            {label}
          </p>
        )}
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
    label: string;
    title: string;
    contentClass: string;
  }
> = {
  aubergine: {
    bg: "#5b3a4e",
    label: "#d6c8be",
    title: "#f5ece6",
    contentClass: "editorial-color-block-content--aubergine",
  },
  "sage-wash": {
    bg: "#eef0ea",
    label: "#4f6b5e",
    title: "#1f2a37",
    contentClass: "editorial-color-block-content--sage-wash",
  },
  "cream-deep": {
    bg: "#f3eee3",
    label: "#4f6b5e",
    title: "#1f2a37",
    contentClass: "editorial-color-block-content--cream-deep",
  },
};
