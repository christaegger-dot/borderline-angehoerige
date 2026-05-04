import type { ReactNode } from "react";

export type EditorialSectionAsideBackground = "sage-wash" | "cream-deep";

interface EditorialSectionAsideProps {
  children: ReactNode;
  /**
   * Optional eigener Hintergrund-Container. Auf Aubergine-Section ist
   * `sage-wash` typisch (Pull-Quote-Box hebt sich ab), auf Cream-Section
   * `cream-deep` (z.B. Kontakt-Karte). Default: transparent.
   */
  background?: EditorialSectionAsideBackground;
}

const ASIDE_BG: Record<EditorialSectionAsideBackground, string> = {
  "sage-wash": "var(--bg-sage-wash)",
  "cream-deep": "var(--bg-cream-deep)",
};

/**
 * Aside-Slot der EditorialSection-Hülle: rechte Spalte für visuelle
 * Anker (Bilder, Pull-Quotes, Kontakt-Karten, Ornamente).
 *
 * Layout-Verhalten:
 * - Desktop (≥ 1024 px): nimmt die restliche Container-Breite (≥ 240 px)
 * - Tablet (768-1023 px): zweite Spalte neben dem Body
 * - Mobile (< 768 px): unterhalb des Bodys gestapelt
 *
 * Wenn ein eigener Hintergrund-Container nötig ist, via `background`-
 * Prop setzen — die Aside zeichnet ihren eigenen Container, mit Padding
 * und leichtem Border-Radius.
 */
export function EditorialSectionAside({
  children,
  background,
}: EditorialSectionAsideProps) {
  return (
    <div
      className="editorial-section-grid__aside"
      style={
        background
          ? {
              background: ASIDE_BG[background],
              padding: "var(--space-5)",
              borderRadius: "0.25rem",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
