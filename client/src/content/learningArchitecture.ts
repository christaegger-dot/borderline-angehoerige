import { quellenLinks } from "./quellenLinks";

export interface LearningResource {
  id: string;
  purpose: string;
}

export interface LearningStep {
  id: string;
  href: string;
  title: string;
  navigationLabel?: string;
  purpose: string;
  goal: string;
  canonicalTopics: string[];
  materials: LearningResource[];
  furtherLinks: { href: string; title: string }[];
  baseModelId?: string;
}

// One ordered source for the overview, page transitions, material curation and
// primary navigation. Position is orientation, never a test or completed status.
export const learningSteps: readonly LearningStep[] = [
  {
    id: "orientierung",
    href: "/",
    title: "Orientierung finden",
    purpose:
      "Zweck, Grenzen und passende Einstiege dieser Website kennenlernen.",
    goal: "Sie können ein Anliegen wählen und wissen, wo Sie Information, eigene Beratung oder akute Hilfe finden.",
    canonicalTopics: ["orientierung"],
    materials: [],
    furtherLinks: [
      { href: "/wegweiser", title: "Nach Situation einsteigen" },
      { href: "/fachstelle", title: "Eigene Beratung finden" },
    ],
  },
  {
    id: "verstehen",
    href: "/verstehen",
    title: "Borderline verstehen",
    navigationLabel: "Verstehen",
    purpose:
      "Diagnose, individuelles Erleben und mögliche Kontexte auseinanderhalten.",
    goal: "Sie können Beschreibungen einordnen, ohne aus einer Diagnose Motive, Gefahr oder eine feste Rolle abzuleiten.",
    canonicalTopics: ["diagnose", "erleben"],
    materials: [
      {
        id: "eisberg",
        purpose: "Sichtbares Verhalten und mögliche Kontexte unterscheiden.",
      },
    ],
    furtherLinks: [
      { href: "/verstehen/diagnostik", title: "Diagnostik vertiefen" },
      {
        href: "/verstehen/beziehungen",
        title: "Beziehungen aus mehreren Perspektiven",
      },
    ],
    baseModelId: "eisberg",
  },
  {
    id: "rolle",
    href: "/unterstuetzen/uebersicht",
    title: "Die eigene Rolle klären",
    navigationLabel: "Unterstützen",
    purpose:
      "Freiwillige Unterstützung, eigene Verantwortung und professionelle Aufgaben unterscheiden.",
    goal: "Sie können klären, was Sie anbieten möchten und können, ohne Behandlung, Beruhigung oder Genesung übernehmen zu müssen.",
    canonicalTopics: ["angehoerigenrolle"],
    materials: [
      {
        id: "rolle-klaeren",
        purpose: "Eigene Möglichkeiten und Zuständigkeiten sortieren.",
      },
    ],
    furtherLinks: [
      { href: "/unterstuetzen/alltag", title: "Absprachen im Alltag" },
      { href: "/unterstuetzen/therapie", title: "Therapie begleiten" },
    ],
    baseModelId: "rollen-orbit",
  },
  {
    id: "kommunikation",
    href: "/kommunizieren",
    title: "Miteinander kommunizieren",
    navigationLabel: "Kommunizieren",
    purpose:
      "Zuhören, Nachfragen, eigene Anliegen und Gesprächspausen verbinden.",
    goal: "Sie können Erleben anerkennen und Ihre eigene Sicht behalten. Ein Gespräch braucht Bereitschaft auf beiden Seiten und garantiert keine bestimmte Reaktion.",
    canonicalTopics: ["kommunikation"],
    materials: [
      {
        id: "zuhoeren-ohne-zustimmen",
        purpose: "Anerkennen und Zustimmung unterscheiden.",
      },
      {
        id: "pause-statt-streit",
        purpose: "Eine Pause oder ein Gesprächsende benennen.",
      },
    ],
    furtherLinks: [
      { href: "/uebungen", title: "Gesprächsmöglichkeiten erproben" },
    ],
    baseModelId: "validierung",
  },
  {
    id: "grenzen",
    href: "/grenzen",
    title: "Grenzen und Sicherheit wahren",
    navigationLabel: "Grenzen",
    purpose:
      "Eigene Grenzen klären, aussprechen und bei Bedrohung Schutz priorisieren.",
    goal: "Sie können eine eigene Grenze oder nächste Unterstützung benennen. Zustimmung und Sicherheit lassen sich durch eine Gesprächstechnik nicht erzwingen.",
    canonicalTopics: ["grenzen", "sicherheit"],
    materials: [
      {
        id: "4-arten-von-grenzen",
        purpose: "Einen Bereich für die eigene Grenze auswählen.",
      },
      {
        id: "dear",
        purpose:
          "Ein Anliegen vorbereiten, wenn ein Gespräch gewollt und sicher ist.",
      },
    ],
    furtherLinks: [
      { href: "/unterstuetzen/krise", title: "Unterstützung in Krisen" },
    ],
    baseModelId: "vier-grenzen",
  },
  {
    id: "eigene-gesundheit",
    href: "/selbstfuersorge",
    title: "Die eigene Gesundheit und Unterstützung",
    navigationLabel: "Selbstfürsorge",
    purpose:
      "Eigene Belastung, Bedürfnisse und erreichbare Unterstützung ernst nehmen.",
    goal: "Sie können ein eigenes Bedürfnis oder einen Hilfebedarf benennen. Beschwerden brauchen gegebenenfalls fachliche Abklärung; Entlastung ist keine Frage perfekten Verhaltens.",
    canonicalTopics: ["belastungszeichen", "eigene-unterstuetzung"],
    materials: [
      {
        id: "warnsignale",
        purpose:
          "Eigene Veränderungen betrachten, ohne eine Belastungsstufe zu berechnen.",
      },
      {
        id: "energie-konto",
        purpose:
          "Belastende und stärkende Bedingungen ohne Punktesystem sortieren.",
      },
    ],
    furtherLinks: [
      { href: "/beratung", title: "Beratung und Netzwerke finden" },
      { href: "/fachstelle", title: "Eigene Angehörigenberatung" },
    ],
    baseModelId: "energie-haushalt",
  },
  {
    id: "genesung",
    href: "/genesung",
    title: "Genesung einordnen",
    navigationLabel: "Genesung",
    purpose:
      "Hoffnung, unterschiedliche Verläufe und Grenzen des eigenen Einflusses verbinden.",
    goal: "Sie können Symptomveränderung und Lebensqualität unterscheiden, ohne eine individuelle Prognose oder einen festen Genesungsfahrplan abzuleiten.",
    canonicalTopics: ["genesung"],
    materials: [
      {
        id: "remission-heilung",
        purpose: "Remission und alltagsbezogene Genesung unterscheiden.",
      },
      {
        id: "garten",
        purpose:
          "Mögliche unterstützende Bedingungen betrachten, ohne eine Fürsorgepflicht abzuleiten.",
      },
    ],
    furtherLinks: [
      {
        href: "/unterstuetzen/therapie",
        title: "Behandlung und Mitwirkung vertiefen",
      },
    ],
    baseModelId: "garten",
  },
  {
    id: "vertiefung",
    href: "/materialien",
    title: "Vertiefen und Unterstützung finden",
    purpose:
      "Passende Materialien und Quellen auswählen und Unterstützung bei Bedarf erreichen.",
    goal: "Sie können gezielt weiterlesen oder Beratung suchen. Sie müssen diese Strecke weder vollständig noch in einer bestimmten Reihenfolge bearbeiten.",
    canonicalTopics: ["vertiefung"],
    materials: [
      {
        id: "kinder",
        purpose:
          "Bei Bedarf Kinder altersgerecht informieren, schützen und entlasten.",
      },
    ],
    furtherLinks: [
      { href: "/quellen", title: "Quellen und Aussagegrenzen prüfen" },
      { href: "/beratung", title: "Beratung und Netzwerke" },
      { href: "/fachstelle", title: "Kontakt zur Angehörigenberatung" },
    ],
  },
];

export const canonicalTopics = [
  {
    id: "orientierung",
    title: "Orientierung",
    href: "/",
    scope: "Zweck und Einstiege; keine Risikoeinstufung.",
  },
  {
    id: "diagnose",
    title: "Diagnose und ihre Grenzen",
    href: "/verstehen#was-ist-borderline",
    scope:
      "Grundverständnis; Kriterien und Verfahren vertieft unter Diagnostik.",
  },
  {
    id: "erleben",
    title: "Erleben und Kontext",
    href: "/verstehen#scham-wut",
    scope: "Mögliche Erfahrungen, keine Ableitung innerer Motive.",
  },
  {
    id: "angehoerigenrolle",
    title: "Eigene Rolle und Verantwortung",
    href: "/unterstuetzen/uebersicht#rolle",
    scope: "Freiwillige Unterstützung; Alltag und Therapie wenden dies an.",
  },
  {
    id: "kommunikation",
    title: "Anerkennen ohne zustimmen zu müssen",
    href: "/kommunizieren#validierung",
    scope: "Grundhaltung; Grenzen und Übungen wenden sie an.",
  },
  {
    id: "grenzen",
    title: "Eigene Grenzen",
    href: "/grenzen#grenzen-arten",
    scope: "Grenzbereiche und eigene Handlungsmöglichkeiten.",
  },
  {
    id: "sicherheit",
    title: "Schutz bei Bedrohung und Gewalt",
    href: "/grenzen#gewalt",
    scope:
      "Schutz vor Gesprächsführung; akute Hilfe stets direkt über /soforthilfe.",
  },
  {
    id: "belastungszeichen",
    title: "Eigene Belastungszeichen",
    href: "/selbstfuersorge#warnsignale",
    scope: "Individuelle Veränderungen; keine Ampel oder Sicherheitsstufe.",
  },
  {
    id: "eigene-unterstuetzung",
    title: "Eigene Unterstützung",
    href: "/selbstfuersorge#beratung-netzwerke",
    scope: "Bedürfnisse und Hilfebedarf; Angebote im Beratungsbereich.",
  },
  {
    id: "genesung",
    title: "Genesung und Remission",
    href: "/genesung#remission",
    scope: "Unterschiedliche Verläufe; keine persönliche Prognose.",
  },
  {
    id: "vertiefung",
    title: "Materialien nach Anliegen",
    href: "/materialien#lernweg-materialien",
    scope: "Kuratierte Webtexte; kein Qualitätsnachweis für ältere Grafiken.",
  },
  {
    id: "krise",
    title: "Unterstützung in Krisen",
    href: "/unterstuetzen/krise",
    scope:
      "Handlungsmöglichkeiten und Zuständigkeitsgrenzen; akute Hilfe direkt /soforthilfe.",
  },
] as const;

// These pages apply or deepen a canonical explanation; they are not extra
// compulsory stages. Resource and legal pages retain their separate functions.
export const learningExtensions = [
  {
    href: "/verstehen/diagnostik",
    parentHref: "/verstehen",
    purpose: "Die diagnostische Abklärung und ihre Grenzen vertiefen.",
    goal: "Sie können fachliche Abklärung von eigener Beobachtung unterscheiden und offene Fragen für ein Gespräch sammeln.",
    topicIds: ["diagnose"],
  },
  {
    href: "/verstehen/beziehungen",
    parentHref: "/verstehen",
    purpose: "Wechselwirkungen aus beiden Erfahrungsperspektiven betrachten.",
    goal: "Sie können Ereignis, mögliche Deutung und Reaktion auseinanderhalten, ohne einer Person Motive oder eine feste Rolle zuzuschreiben.",
    topicIds: ["erleben", "angehoerigenrolle"],
  },
  {
    href: "/verstehen/begleiterkrankungen",
    parentHref: "/verstehen",
    purpose:
      "Begleitende Beschwerden und unterschiedliche Erklärungen einordnen.",
    goal: "Sie können offene Beschwerden fachlich abklären lassen, statt sie automatisch der Borderline-Diagnose zuzuordnen.",
    topicIds: ["diagnose"],
  },
  {
    href: "/unterstuetzen/alltag",
    parentHref: "/unterstuetzen/uebersicht",
    purpose:
      "Die freiwillige Angehörigenrolle auf alltägliche Absprachen anwenden.",
    goal: "Sie können eine tragbare Absprache oder ein eigenes Anliegen wählen. Das ist kein Auftrag, den Alltag einer anderen Person zu regulieren.",
    topicIds: ["angehoerigenrolle", "kommunikation", "grenzen"],
  },
  {
    href: "/unterstuetzen/krise",
    parentHref: "/unterstuetzen/uebersicht",
    purpose:
      "Eigene Handlungsmöglichkeiten und Zuständigkeitsgrenzen in Krisen klären.",
    goal: "Sie können Schutz und professionelle Unterstützung priorisieren. Akute Hilfe ist jederzeit direkt erreichbar; diese Seite ist keine notwendige Vorstufe.",
    topicIds: ["krise", "sicherheit", "angehoerigenrolle"],
  },
  {
    href: "/unterstuetzen/therapie",
    parentHref: "/unterstuetzen/uebersicht",
    purpose:
      "Behandlung, Einwilligung und die eigene freiwillige Mitwirkung unterscheiden.",
    goal: "Sie können Ihre angebotene Rolle, offene Fragen und Grenzen klären. Behandlungsentscheidungen und vertrauliche Informationen haben eigene Zuständigkeiten.",
    topicIds: ["angehoerigenrolle", "genesung"],
  },
] as const;

export type ModelClassification =
  | "wissenschaftliche-theorie"
  | "klinische-heuristik"
  | "eigene-didaktik";
export const modelClassificationLabels: Record<ModelClassification, string> = {
  "wissenschaftliche-theorie": "Wissenschaftlicher Theoriebezug",
  "klinische-heuristik": "Klinische Heuristik",
  "eigene-didaktik": "Eigene didaktische Darstellung",
};

export interface LearningModel {
  id: string;
  title: string;
  classification: ModelClassification;
  role: "bezugspunkt" | "basis" | "vertiefung";
  explanationHref: string;
  purpose: string;
  limitation: string;
  sourceRole: string;
  sources: { label: string; href: string }[];
  clinicalReview: "unknown";
}

const linehan = {
  label: "Linehan: DBT und Emotionsregulation",
  href: quellenLinks.linehan1993,
};
const nice = {
  label: "NICE CG78: Angehörigenperspektive",
  href: quellenLinks.niceCg78,
};
const didactic =
  "Die Veranschaulichung ist eine redaktionelle Synthese. Die verlinkten Fachquellen stützen Bezugspunkte, nicht die Gültigkeit dieser Grafik oder ihrer Kategorien.";

export const learningModels: readonly LearningModel[] = [
  {
    id: "emotionsregulation",
    title: "Emotionsregulation im DBT-Bezug",
    classification: "wissenschaftliche-theorie",
    role: "bezugspunkt",
    explanationHref: "/verstehen#was-ist-borderline",
    purpose:
      "Ein theoretischer Bezug zur Einordnung intensiver Gefühle und ihres Kontexts.",
    limitation:
      "Eine klinische Theorie ist kein vollständiges Erklärungsmodell für eine Person. Sie belegt keine Motive, Schuld oder individuelle Wirkung einer Massnahme.",
    sourceRole:
      "Linehan ist ein theoretisch-klinischer Bezugspunkt. Die Website bietet eine vereinfachte Einführung, keine vollständige Darstellung oder Prüfung des Modells.",
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "eisberg",
    title: "Eisberg",
    classification: "eigene-didaktik",
    role: "basis",
    explanationHref: "/materialien/text/eisberg",
    purpose: "Beobachtbares Verhalten und mögliche Kontexte auseinanderhalten.",
    limitation:
      "Unter der Oberfläche liegende Gefühle oder Motive sind nicht sicher ablesbar. Das Bild erklärt keine konkrete Person.",
    sourceRole: didactic,
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus und Denk-Modus",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/alarm-modus",
    purpose:
      "Eine mögliche Verengung des Gesprächs unter Anspannung veranschaulichen.",
    limitation:
      "Keine zwei eindeutig messbaren Zustände, kein Gehirnabbild und keine sichere Zuordnung von aussen. Beruhigung ist kein Auftrag an Angehörige.",
    sourceRole: didactic,
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "hohe-anspannung",
    title: "Hohe Anspannung verstehen",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/gehirn",
    purpose:
      "Aufmerksamkeit, Einordnung und Handlungsspielraum als mögliche Belastungsbereiche betrachten.",
    limitation:
      "Kein Abbild eines «Borderline-Gehirns» und keine getrennten Gehirnsysteme zur Beurteilung einer Person. Alternative zum Alarmbild, keine zusätzliche Diagnostik.",
    sourceRole: didactic,
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "anspannungskurve",
    title: "Anspannungskurve",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/anspannungskurve",
    purpose:
      "Gesprächsbereitschaft, eigene Grenzen und Pausen gemeinsam bedenken.",
    limitation:
      "Illustrative Kurve, kein validiertes Messinstrument. Weder Gesprächsfähigkeit, Gesprächswunsch noch Sicherheit lassen sich daraus zuverlässig ableiten.",
    sourceRole: didactic,
    sources: [linehan, nice],
    clinicalReview: "unknown",
  },
  {
    id: "zustands-landkarte",
    title: "Persönliche Zustands-Landkarte",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/zustands-landkarte",
    purpose:
      "Anspannung, Kontaktwunsch und Handlungsspielraum getrennt und freiwillig betrachten.",
    limitation:
      "Momentaufnahme ohne festen Phasenablauf, Vorhersage oder Gefährdungsmessung. Kein Beobachtungs- oder Regulierungsauftrag für Angehörige.",
    sourceRole: didactic,
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "pendel",
    title: "Bewertungs-Pendel",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/spaltung",
    purpose:
      "Eine mögliche Verengung von Bewertungen unter Stress illustrieren.",
    limitation:
      "Keine feste Eigenschaft, Absicht oder Diagnose; nicht jede wechselnde Bewertung folgt diesem Bild. Beide Beteiligten können ihren Blick überprüfen.",
    sourceRole: didactic,
    sources: [linehan],
    clinicalReview: "unknown",
  },
  {
    id: "rollen-orbit",
    title: "Rollen und Zuständigkeiten",
    classification: "eigene-didaktik",
    role: "basis",
    explanationHref: "/unterstuetzen/uebersicht#rolle",
    purpose:
      "Eigene Möglichkeiten von Entscheidungen der betroffenen Person und professionellen Aufgaben trennen.",
    limitation:
      "Redaktionelle Sortierung, keine klinische Rollentheorie. Beteiligung richtet sich nach Wunsch, Einwilligung, Sicherheit und eigenen Möglichkeiten.",
    sourceRole: didactic,
    sources: [nice],
    clinicalReview: "unknown",
  },
  {
    id: "leuchtturm",
    title: "Leuchtturm",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/leuchtturm",
    purpose: "Eigene Werte und Grenzen als Orientierung betrachten.",
    limitation:
      "Alternative zur Rollensortierung. Angehörige sind weder Rettungsinstanz noch dafür verantwortlich, eine andere Person zu steuern.",
    sourceRole: didactic,
    sources: [nice],
    clinicalReview: "unknown",
  },
  {
    id: "validierung",
    title: "Validierung und Stufenleiter",
    classification: "klinische-heuristik",
    role: "basis",
    explanationHref: "/kommunizieren#validierung",
    purpose:
      "Erleben anerkennen und offen nachfragen, ohne zustimmen zu müssen.",
    limitation:
      "DBT-bezogene Gesprächshilfe; die Stufen sind keine Bewertung oder Pflicht zum perfekten Reagieren. Wirkung und Zustimmung sind nicht garantiert.",
    sourceRole:
      "DBT-bezogene klinische Gesprächsheuristik. Auswahl, Stufenleiter und Website-Beispiele sind redaktionell vereinfacht, kein validiertes Testverfahren.",
    sources: [
      { label: "Linehan: DBT Skills Training", href: quellenLinks.linehan2015 },
    ],
    clinicalReview: "unknown",
  },
  {
    id: "vier-grenzen",
    title: "Vier Arten von Grenzen",
    classification: "eigene-didaktik",
    role: "basis",
    explanationHref: "/grenzen#grenzen-arten",
    purpose:
      "Körper, Gefühle, Zeit und materielle Möglichkeiten im Alltag sortieren.",
    limitation:
      "Die vier Kategorien sind eine Auswahl, kein vollständiges oder validiertes System. Auch die andere Person darf Grenzen setzen.",
    sourceRole: didactic,
    sources: [nice],
    clinicalReview: "unknown",
  },
  {
    id: "dear",
    title: "DEAR als Gesprächsstruktur",
    classification: "klinische-heuristik",
    role: "vertiefung",
    explanationHref: "/grenzen#dear",
    purpose:
      "Ein Anliegen beschreiben, ausdrücken, konkret erbitten und seinen Sinn erklären.",
    limitation:
      "Hier wird der DEAR-Teil von DEAR MAN vereinfacht angeboten. Er garantiert keine Zustimmung und ist kein Schutzverfahren bei Gewalt.",
    sourceRole:
      "DBT-bezogene Gesprächsheuristik nach Linehan; vereinfachte Angehörigenfassung und Beispiele redaktionell.",
    sources: [
      { label: "Linehan: DBT Skills Training", href: quellenLinks.linehan2015 },
    ],
    clinicalReview: "unknown",
  },
  {
    id: "energie-haushalt",
    title: "Energie-Haushalt und Energie-Konto",
    classification: "eigene-didaktik",
    role: "basis",
    explanationHref: "/materialien/text/energie-konto",
    purpose:
      "Belastende, stärkende und veränderbare Bedingungen der eigenen Gesundheit sortieren.",
    limitation:
      "Keine messbare Bilanz oder Belastungsstufe. Weniger Entlastung ist kein persönliches Versagen; Krankheit und Rahmenbedingungen brauchen gegebenenfalls professionelle Hilfe.",
    sourceRole: didactic,
    sources: [nice],
    clinicalReview: "unknown",
  },
  {
    id: "sauerstoffmaske",
    title: "Sauerstoffmaske",
    classification: "eigene-didaktik",
    role: "vertiefung",
    explanationHref: "/materialien/text/sauerstoffmaske",
    purpose:
      "Die Berechtigung eigener Bedürfnisse als alternative Erinnerung veranschaulichen.",
    limitation:
      "Selbstfürsorge garantiert keine Entlastung und muss nicht begründet werden, indem sie einer anderen Person nützt. Schuldgefühle belegen kein Versagen.",
    sourceRole: didactic,
    sources: [nice],
    clinicalReview: "unknown",
  },
  {
    id: "garten",
    title: "Garten",
    classification: "eigene-didaktik",
    role: "basis",
    explanationHref: "/genesung#garten",
    purpose: "Mehrere mögliche Bedingungen für Genesung betrachten.",
    limitation:
      "Menschen sind keine zu pflegenden Pflanzen. Keine Versorgungspflicht für Angehörige, keine Steuerbarkeit oder persönliche Prognose.",
    sourceRole: didactic,
    sources: [
      nice,
      {
        label: "Zanarini: Verläufe und Recovery",
        href: quellenLinks.zanarini2012,
      },
    ],
    clinicalReview: "unknown",
  },
];

export function getLearningStep(path: string) {
  return learningSteps.find(step => step.href === path.split(/[?#]/)[0]);
}

export function getLearningTransition(path: string) {
  const index = learningSteps.findIndex(
    step => step.href === path.split(/[?#]/)[0]
  );
  if (index < 0) return null;
  return {
    index,
    current: learningSteps[index],
    previous: learningSteps[index - 1] ?? null,
    next: learningSteps[index + 1] ?? null,
  };
}
