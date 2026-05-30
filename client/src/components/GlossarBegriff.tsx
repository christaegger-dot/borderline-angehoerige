import type { ReactNode } from "react";
import { Link } from "wouter";
import { glossarHref } from "@/lib/glossarAnchor";

interface GlossarBegriffProps {
  /** Kanonischer Glossar-Begriff (bestimmt den Anker). */
  term: string;
  /**
   * Anzeigetext, falls er vom kanonischen Begriff abweicht (z. B. flektiert
   * oder im Plural). Ohne Angabe wird der Begriff selbst angezeigt.
   */
  children?: ReactNode;
}

/**
 * Verlinkt einen Fachbegriff bei Erstnennung dezent auf seinen Glossar-Eintrag.
 *
 * Bewusst nur ein semantischer Link (kein Tooltip): voll tastatur- und
 * screenreader-tauglich, das Glossar öffnet beim Begriff und scrollt dorthin.
 * Die Auszeichnung (gepunktete Unterstreichung, geerbte Farbe) bleibt dezent,
 * damit das editoriale Schriftbild im Fliesstext nicht bricht.
 */
export default function GlossarBegriff({
  term,
  children,
}: GlossarBegriffProps) {
  return (
    <Link
      href={glossarHref(term)}
      className="glossar-term"
      title={`${term} im Glossar nachschlagen`}
    >
      {children ?? term}
    </Link>
  );
}
