import type { ReactNode } from "react";

interface EditorialSectionAsideProps {
  children: ReactNode;
}

/**
 * Aside-Slot der EditorialSection-Hülle: rechte Spalte für visuelle
 * Anker (Bilder, Pull-Quotes, Kontakt-Karten, Ornamente).
 *
 * Layout-Verhalten:
 * - Desktop (≥ 1024 px): nimmt die restliche Container-Breite (≥ 240 px)
 * - Tablet (768-1023 px): zweite Spalte neben dem Body
 * - Mobile (< 768 px): unterhalb des Bodys gestapelt
 *
 * Wenn die Aside einen eigenen Hintergrund-Container braucht (z.B.
 * Sage-Wash-Box auf Aubergine-Sektion oder Cream-Deep-Karte auf
 * Cream-Sektion), wird das auf der EditorialSection-Parent über die
 * `asideBackground`-Prop gesteuert — nicht direkt hier.
 */
export function EditorialSectionAside({
  children,
}: EditorialSectionAsideProps) {
  return <>{children}</>;
}
