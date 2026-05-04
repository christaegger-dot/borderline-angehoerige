import type { ReactNode } from "react";

interface EditorialSectionMarginNoteProps {
  children: ReactNode;
}

/**
 * Marginalien-Slot der EditorialSection-Hülle. Default-Optik: Sage-Caps,
 * geeignet für Anker-Worte («AMBIVALENZ», «WEGWEISER»),
 * Quellenverweise oder kleine Hairline-Trenner.
 *
 * Konsumenten dürfen den eigenen Inhalt typografisch frei gestalten —
 * MarginNote selbst macht nur Layout-Slot, keine Style-Vorgabe.
 *
 * Layout-Verhalten:
 * - Desktop (≥ 1024 px): eigene 200-px-Spalte links
 * - Tablet (768-1023 px): kleine Zeile oben über dem Body
 * - Mobile (< 768 px): inline oben über dem Body
 */
export function EditorialSectionMarginNote({
  children,
}: EditorialSectionMarginNoteProps) {
  return <>{children}</>;
}
