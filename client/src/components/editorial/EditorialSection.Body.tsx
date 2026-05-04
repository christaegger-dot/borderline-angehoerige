import type { ReactNode } from "react";

interface EditorialSectionBodyProps {
  children: ReactNode;
}

/**
 * Body-Slot der EditorialSection-Hülle: die Lese-Spalte.
 * Bleibt typografisch auf 608 px Komfort-Breite (`var(--measure)`),
 * unabhängig davon ob MarginNote oder Aside vorhanden sind.
 *
 * Inhalt: Eyebrow, H1/H2, Prosa, Footnotes — alles, was zur primären
 * Lese-Erfahrung gehört.
 */
export function EditorialSectionBody({ children }: EditorialSectionBodyProps) {
  return <>{children}</>;
}
