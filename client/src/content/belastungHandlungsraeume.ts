/**
 * Belastung und Handlungsräume
 *
 * Ersetzt die frühere Krisenampel. Grundlage ist das Orientierungsblatt
 * «Wenn Belastung zunimmt» aus der redaktionellen Freigabeprüfung vom
 * 20.09.2026 (reduziertes Publikationsset v05, Identifier
 * `wenn-belastung-zunimmt`).
 *
 * Verbindliche Vorgaben aus der Fachfreigabe-Matrix:
 * - Die Bereiche ordnen ausschliesslich beobachtbare Belastung und
 *   verfügbare Handlungsmöglichkeiten.
 * - Keine Einteilung von Suizid- oder Selbstverletzungsrisiko in
 *   niedrig, mittel oder hoch.
 * - Farbe, Reihenfolge und Symbolik dürfen keine Sicherheitsskala
 *   nahelegen; deshalb keine Grün-Gelb-Rot-Codierung.
 * - Sicherheitsbedenken können in jedem Bereich auftreten und werden
 *   ausserhalb dieser Einteilung behandelt.
 *
 * Quellenbasis: NICE NG225 (keine globale Risikostratifikation),
 * NICE CG78 (Krisenmanagement und gemeinsames Verstehen).
 *
 * Redaktioneller Entwurf — eine institutionelle Fachfreigabe steht aus.
 */

export interface Handlungsraum {
  id: string;
  /** Beschreibt, wie weit die eigenen Mittel tragen — keine Risikostufe. */
  label: string;
  beschreibung: string;
  /** Konkrete Möglichkeiten, bewusst nicht als Pflichtsequenz. */
  hilfreich: string[];
}

export const belastungLead =
  "Die drei Bereiche ordnen beobachtbare Belastung und Handlungsmöglichkeiten. Sie bewerten keine Diagnose und sagen nicht voraus, wie sich eine Situation entwickeln wird.";

export const keineSicherheitsbewertung = {
  titel: "Die Bereiche sind keine Sicherheitsbewertung",
  text: "Die Einteilung zeigt nur, wie weit eigene Mittel gerade tragen. Sie kann nicht beurteilen, ob eine Situation sicher ist. Wenn Sie sich um die Sicherheit einer Person sorgen, verlassen Sie diese Einteilung und holen professionelle Unterstützung.",
} as const;

export const wichtigeAbgrenzung =
  "Kein Bereich bedeutet automatisch «sicher» oder «gefährlich». Die Einteilung entscheidet weder über Behandlung noch über die Dringlichkeit von Hilfe.";

export const handlungsraeume: Handlungsraum[] = [
  {
    id: "mittel-tragen-noch",
    label: "Eigene Mittel tragen noch",
    beschreibung:
      "Kontakt und einfache Absprachen sind möglich. Alltagsschritte gelingen zumindest teilweise. Fragen Sie, was hilfreich wäre, und respektieren Sie auch ein Nein.",
    hilfreich: [
      "zuhören",
      "bei einem Thema bleiben",
      "vorhandene Strategien nutzen",
    ],
  },
  {
    id: "mittel-reichen-knapp",
    label: "Eigene Mittel reichen knapp",
    beschreibung:
      "Das Gespräch wird enger, schneller oder wiederholt sich. Reduzieren Sie Tempo und Anforderungen. Beachten Sie auch Ihre eigene Belastung.",
    hilfreich: [
      "weniger Themen",
      "Bedenkzeit oder eine Pause",
      "fragen, ob Zuhören, Klären oder Abstand gewünscht ist",
    ],
  },
  {
    id: "mittel-reichen-nicht-mehr",
    label: "Eigene Mittel reichen nicht mehr",
    beschreibung:
      "Ein tragfähiger nächster Schritt gelingt nicht mehr. Holen Sie Unterstützung von aussen. Welche Hilfe passt, hängt von den aktuellen Bedürfnissen und der Situation ab.",
    hilfreich: [
      "Unterstützung von aussen holen",
      "die eigene Belastung benennen",
      "nicht allein entscheiden müssen",
    ],
  },
];
