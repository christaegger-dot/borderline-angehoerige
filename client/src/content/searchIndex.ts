export type SearchEntry = {
  title: string;
  description: string;
  keywords: string[];
  href: string;
  section: string;
};

export const searchableContent: SearchEntry[] = [
  // Verstehen
  {
    title: "Was ist Borderline?",
    description:
      "Borderline aus Sicht von Angehörigen verstehen: Beziehungsmuster, Überflutung und Belastungsdynamik",
    keywords: [
      "borderline",
      "bps",
      "persönlichkeitsstörung",
      "diagnose",
      "symptome",
      "emotionale instabilität",
      "verlassensangst",
      "impulsivität",
      "selbstbild",
    ],
    href: "/verstehen",
    section: "Verstehen",
  },
  {
    title: "Emotionale Dysregulation",
    description:
      "Warum Emotionen bei Borderline so intensiv sind und schnell wechseln",
    keywords: [
      "emotionen",
      "gefühle",
      "dysregulation",
      "intensität",
      "stimmungsschwankungen",
      "wut",
      "angst",
      "trauer",
    ],
    href: "/verstehen",
    section: "Verstehen",
  },
  {
    title: "Schwarz-Weiss-Denken",
    description:
      "Die Tendenz, Menschen und Situationen als entweder ganz gut oder ganz schlecht zu sehen",
    keywords: [
      "schwarz-weiss",
      "splitting",
      "idealisierung",
      "entwertung",
      "alles oder nichts",
    ],
    href: "/verstehen",
    section: "Verstehen",
  },
  {
    title: "Verlassensangst",
    description: "Intensive Angst vor Zurückweisung oder Verlassenwerden",
    keywords: [
      "verlassensangst",
      "trennungsangst",
      "zurückweisung",
      "klammern",
      "abhängigkeit",
    ],
    href: "/verstehen",
    section: "Verstehen",
  },

  // Unterstützen
  {
    title: "Wie kann ich helfen?",
    description:
      "Die eigene Rolle klären und Unterstützung tragfähig mit Selbstschutz verbinden",
    keywords: ["helfen", "unterstützen", "rolle", "balance", "begleiten"],
    href: "/unterstuetzen/uebersicht",
    section: "Unterstützen",
  },
  {
    title: "Im Alltag unterstützen",
    description:
      "Im Alltag Orientierung, Verlässlichkeit und begrenzte Verfügbarkeit gestalten",
    keywords: [
      "alltag",
      "stabilität",
      "routine",
      "aktivitäten",
      "präsenz",
      "verfügbarkeit",
    ],
    href: "/unterstuetzen/alltag",
    section: "Unterstützen",
  },
  {
    title: "Therapie begleiten",
    description:
      "Therapie realistisch begleiten und mit Rückschlägen oder Überforderung umgehen",
    keywords: [
      "therapie",
      "dbt",
      "dialektisch-behaviorale therapie",
      "skills",
      "fortschritte",
      "rückschläge",
      "behandlung",
    ],
    href: "/unterstuetzen/therapie",
    section: "Unterstützen",
  },
  {
    title: "In der Krise unterstützen",
    description: "Krisen erkennen, deeskalieren und Sicherheit gewährleisten",
    keywords: [
      "krise",
      "eskalation",
      "deeskalation",
      "sicherheit",
      "notfall",
      "akut",
    ],
    href: "/unterstuetzen/krise",
    section: "Unterstützen",
  },

  // Kommunizieren
  {
    title: "Validierung",
    description:
      "Gefühle und Erleben ernst nehmen, ohne jedem Vorwurf oder Verhalten zuzustimmen",
    keywords: [
      "validierung",
      "validieren",
      "anerkennen",
      "gefühle",
      "zuhören",
      "verstehen",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },
  {
    title: "Die 6 Stufen der Validierung",
    description:
      "Von aufmerksamem Zuhören bis zu echter Augenhöhe: eine hilfreiche Orientierung für Gespräche",
    keywords: [
      "stufen",
      "validierung",
      "aufmerksam",
      "spiegeln",
      "augenhöhe",
      "linehan",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },
  {
    title: "SET-Kommunikation",
    description:
      "Ein bekannter Gesprächsrahmen aus der Angehörigenliteratur für schwierige Situationen",
    keywords: [
      "set",
      "support",
      "empathy",
      "truth",
      "kommunikation",
      "gespräch",
      "technik",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },
  {
    title: "Ich-Botschaften",
    description: "Eigene Gefühle und Bedürfnisse ausdrücken ohne Vorwürfe",
    keywords: [
      "ich-botschaften",
      "bedürfnisse",
      "gefühle",
      "kommunikation",
      "vorwürfe",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },

  // Grenzen
  {
    title: "Warum Grenzen wichtig sind",
    description:
      "Grenzen sind keine Mauern – sie sind Leitplanken für beide Seiten",
    keywords: ["grenzen", "wichtig", "schutz", "selbstschutz", "respekt"],
    href: "/grenzen",
    section: "Grenzen setzen",
  },
  {
    title: "Arten von Grenzen",
    description:
      "Zeitliche, emotionale, physische und finanzielle Grenzen setzen",
    keywords: [
      "zeitlich",
      "emotional",
      "physisch",
      "finanziell",
      "grenzen",
      "arten",
    ],
    href: "/grenzen",
    section: "Grenzen setzen",
  },
  {
    title: "Grenzen kommunizieren",
    description:
      "Wie Sie Grenzen klar, ruhig und ohne unnötige Eskalation formulieren",
    keywords: [
      "kommunizieren",
      "formulieren",
      "aussprechen",
      "grenzen",
      "klar",
    ],
    href: "/grenzen",
    section: "Grenzen setzen",
  },
  {
    title: "Grenzen durchhalten",
    description: "Konsequent bleiben auch wenn es schwer fällt",
    keywords: ["durchhalten", "konsequent", "konsistent", "grenzen", "bleiben"],
    href: "/grenzen",
    section: "Grenzen setzen",
  },

  // Selbstfürsorge
  {
    title: "Warnsignale für Überlastung",
    description: "Emotionale, körperliche und soziale Anzeichen erkennen",
    keywords: [
      "warnsignale",
      "überlastung",
      "burnout",
      "erschöpfung",
      "stress",
      "anzeichen",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },
  {
    title: "Selbstfürsorge-Strategien",
    description:
      "Orientierung, Entlastung und alltagstaugliche Schritte für Ihre eigene Stabilität",
    keywords: [
      "selbstfürsorge",
      "strategien",
      "stabilität",
      "entlastung",
      "alltag",
      "achtsamkeit",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },
  {
    title: "Atem und Beruhigung",
    description:
      "Einfache Möglichkeiten, den Körper in angespannten Momenten wieder zu beruhigen",
    keywords: [
      "atem",
      "atmen",
      "beruhigung",
      "entspannung",
      "stress",
      "sofort",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },
  {
    title: "Professionelle Unterstützung",
    description: "Wann und wo Sie selbst Hilfe holen sollten",
    keywords: [
      "professionell",
      "hilfe",
      "therapie",
      "beratung",
      "angehörigenberatung",
      "psychologe",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },

  // Notfall
  {
    title: "Notfallnummern Schweiz",
    description: "144 Sanitätsnotruf, 143 Die Dargebotene Hand, 117 Polizei",
    keywords: [
      "notfall",
      "notruf",
      "144",
      "143",
      "117",
      "telefon",
      "hilfe",
      "akut",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Psychiatrische Notdienste",
    description: "Regionale psychiatrische Notaufnahmen in der Schweiz",
    keywords: [
      "psychiatrie",
      "notdienst",
      "notaufnahme",
      "klinik",
      "zürich",
      "bern",
      "basel",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Krisenplan erstellen",
    description: "Einen persönlichen Krisenplan gemeinsam vorbereiten",
    keywords: ["krisenplan", "vorbereitung", "notfall", "plan", "sicherheit"],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },

  // Genesung
  {
    title: "Genesung ist möglich",
    description:
      "Was Langzeitstudien über Remission, Besserung und realistische Hoffnung zeigen",
    keywords: [
      "genesung",
      "remission",
      "recovery",
      "hoffnung",
      "prognose",
      "besserung",
      "heilung",
    ],
    href: "/genesung",
    section: "Genesung",
  },
  {
    title: "Remission vs. Recovery",
    description: "Was die Begriffe bedeuten und wie sie sich unterscheiden",
    keywords: [
      "remission",
      "recovery",
      "genesung",
      "unterschied",
      "definition",
    ],
    href: "/genesung",
    section: "Genesung",
  },
  {
    title: "Faktoren für Genesung",
    description: "Was die Forschung über positive Verläufe zeigt",
    keywords: [
      "faktoren",
      "genesung",
      "therapie",
      "beziehungen",
      "zeit",
      "forschung",
    ],
    href: "/genesung",
    section: "Genesung",
  },

  // Materialien
  {
    title: "Infografiken & Handouts",
    description: "Herunterladbare Materialien zu allen Themen",
    keywords: [
      "infografik",
      "handout",
      "download",
      "pdf",
      "material",
      "drucken",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Textversion: Notfallplan Krise",
    description:
      "Lesbare Web-Version des Akut-Handouts mit Sofortschritten bei Suizidgedanken, Selbstverletzung und psychischer Krise",
    keywords: [
      "textversion",
      "notfallplan",
      "suizidgedanken",
      "selbstverletzung",
      "psychische krise",
      "soforthilfe",
      "angehörige",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/notfallplan-krise",
    section: "Materialien",
  },
  {
    title: "Der Leuchtturm: Ihre Rolle als Angehörige/r",
    description:
      "Infografik: Orientierung, Verlässlichkeit und Selbstschutz in der Angehörigenrolle",
    keywords: [
      "leuchtturm",
      "rolle",
      "stabil",
      "orientierung",
      "metapher",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Textversion: Der Leuchtturm",
    description:
      "Lesbare Web-Version des Handouts zur Angehörigenrolle mit Kernaussage, Bildidee und 3 Schritten",
    keywords: [
      "textversion",
      "leuchtturm",
      "rolle",
      "angehörige",
      "stabilität",
      "orientierung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/leuchtturm",
    section: "Materialien",
  },
  {
    title: "Textversion: Im Krisenmodus – Orientierung geben",
    description:
      "Lesbare Web-Version zur Deeskalation mit Ruhe, Präsenz, Mini-Legende und 3 konkreten Schritten für Angehörige",
    keywords: [
      "textversion",
      "krisenmodus",
      "orientierung geben",
      "präsenz",
      "ruhe",
      "deeskalation",
      "unterstützen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/im-krisenmodus",
    section: "Materialien",
  },
  {
    title: "Textversion: Ihre Rolle klären",
    description:
      "Lesbare Web-Version zur Angehörigenrolle mit Abgrenzung zwischen eigenem Beitrag, professioneller Hilfe und klaren Grenzen",
    keywords: [
      "textversion",
      "rolle klären",
      "unterstützen",
      "angehörigenrolle",
      "grenzen",
      "professionelle hilfe",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/rolle-klaeren",
    section: "Materialien",
  },
  {
    title: "Textversion: Drei Säulen hilfreicher Unterstützung",
    description:
      "Lesbare Web-Version zu Präsenz, Stabilität, Grenze und drei kleinen Übungsschritten für Angehörige",
    keywords: [
      "textversion",
      "drei säulen",
      "präsenz",
      "stabilität",
      "grenze",
      "unterstützung",
      "angehörigen-haltung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/drei-saeulen",
    section: "Materialien",
  },
  {
    title: "Textversion: Konsistenz-Prinzip",
    description:
      "Lesbare Web-Version zum hilfreichen und schwierigen Beziehungskreislauf mit Merksatz, Legende und 3 Absprachen für Angehörige",
    keywords: [
      "textversion",
      "konsistenz-prinzip",
      "konsistenz",
      "grenzen",
      "vertrauen",
      "konflikte",
      "unterstützen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/konsistenz-prinzip",
    section: "Materialien",
  },
  {
    title: "Textversion: Beziehungs-Achtsamkeit",
    description:
      "Lesbare Web-Version zu Innehalten, Wahrnehmen, nicht Bewerten und bewusstem Handeln im Alltag",
    keywords: [
      "textversion",
      "beziehungs-achtsamkeit",
      "achtsamkeit",
      "innehalten",
      "wahrnehmen",
      "bewusst handeln",
      "unterstützen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/beziehungs-achtsamkeit",
    section: "Materialien",
  },
  {
    title: "Textversion: 6 Leitlinien für Angehörige",
    description:
      "Lesbare Web-Version mit sechs evidenzbasierten Empfehlungen, Merksatz und drei Reflexionsschritten für Angehörige",
    keywords: [
      "textversion",
      "6 leitlinien",
      "gunderson",
      "family guidelines",
      "unterstützen",
      "grenzen",
      "familie",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/6-leitlinien",
    section: "Materialien",
  },
  {
    title: "Textversion: 4 Alltags-Tipps",
    description:
      "Lesbare Web-Version zu Übungspartner sein, Fortschritte anerkennen, Vorhersehbarkeit und gemeinsamem Problemlösen",
    keywords: [
      "textversion",
      "4 alltags-tipps",
      "alltag",
      "fortschritte anerkennen",
      "vorhersehbar",
      "unterstützen",
      "skills",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/4-alltags-tipps",
    section: "Materialien",
  },
  {
    title: "Der Eisberg: Was hinter Wut liegen kann",
    description:
      "Infografik: Hinter sichtbarer Wut liegen oft Schmerz, Angst oder Scham",
    keywords: [
      "eisberg",
      "wut",
      "trauer",
      "gefühle",
      "verborgen",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Textversion: Der Eisberg",
    description:
      "Lesbare Web-Version des Eisberg-Handouts zu sichtbarer Wut, verborgenen Gefühlen und 3 Schritten zur Einordnung",
    keywords: [
      "textversion",
      "eisberg",
      "wut",
      "angst",
      "scham",
      "gefühle",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/eisberg",
    section: "Materialien",
  },
  {
    title: "Textversion: Spaltung",
    description:
      "Lesbare Web-Version zum Pendel zwischen Idealisierung, Entwertung und der schwer erreichbaren Grauzone",
    keywords: [
      "textversion",
      "spaltung",
      "idealisierung",
      "entwertung",
      "grauzone",
      "pendel",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/spaltung",
    section: "Materialien",
  },
  {
    title: "Die Spaltung verstehen",
    description:
      "Infografik: Wie starke Idealisierung und Entwertung in Krisen entstehen können",
    keywords: [
      "spaltung",
      "pendel",
      "idealisierung",
      "entwertung",
      "ehrlich",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "U.M.W.E.G.© – Das Gesamtsystem",
    description:
      "Ältere Infografik zur Gesprächsorientierung in akuten Krisensituationen",
    keywords: [
      "umweg",
      "krise",
      "kommunikation",
      "empathie",
      "geduld",
      "system",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Die U.M.W.-Formel: So sprechen Sie in der Krise",
    description:
      "Ältere Infografik mit Schritt-für-Schritt-Orientierung für akute Krisengespräche",
    keywords: [
      "umweg",
      "formel",
      "amygdala",
      "hippocampus",
      "cortex",
      "gehirn",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "U.M.W.E.G.© Praxis + Exit-Strategie",
    description:
      "Ältere Infografik mit Gesprächsbeispiel sowie Orientierung zu Grenzen und Konsequenzen",
    keywords: [
      "umweg",
      "praxis",
      "exit",
      "lmk",
      "konsequenzen",
      "dialog",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Die U.M.W.-Formel in der Praxis",
    description:
      "Ältere Infografik mit möglichen Formulierungen für akute Krisensituationen",
    keywords: [
      "umweg",
      "formel",
      "praxis",
      "krise",
      "team",
      "dein",
      "dir",
      "wir",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Die 5 Leitlinien für den Alltag",
    description:
      "Infografik: Orientierung für einen ruhigeren und klareren Alltag",
    keywords: [
      "leitlinien",
      "alltag",
      "hektik",
      "routinen",
      "ruhe",
      "team",
      "grenzen",
      "infografik",
    ],
    href: "/materialien",
    section: "Materialien",
  },
  {
    title: "Textversion: Spickzettel Krisenkommunikation",
    description:
      "Lesbare Web-Version mit 3 Schritten, Standardsatz, Exit-Sätzen und Notfallnummern",
    keywords: [
      "textversion",
      "krisenkommunikation",
      "spickzettel",
      "standardsatz",
      "exit-sätze",
      "grenze",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/krisenkommunikation",
    section: "Materialien",
  },
  {
    title: "Textversion: Alarm-Modus vs. Denk-Modus",
    description:
      "Lesbare Web-Version zur Unterscheidung zwischen Alarm-Zustand, Denk-Zustand und den passenden nächsten Schritten",
    keywords: [
      "textversion",
      "alarm-modus",
      "denk-modus",
      "neurobiologie",
      "trigger",
      "beruhigen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/alarm-modus",
    section: "Materialien",
  },
  {
    title: "Textversion: Der 4-Phasen-Zyklus",
    description:
      "Lesbare Web-Version zum wiederkehrenden Beziehungszyklus mit 4 Phasen, Kernaussage und möglichen Ansatzpunkten für Angehörige",
    keywords: [
      "textversion",
      "4-phasen-zyklus",
      "zyklus",
      "freundlichkeit",
      "verschlechterung",
      "explosion",
      "schweigen",
      "verstehen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/4-phasen",
    section: "Materialien",
  },
  {
    title: "Textversion: Das Gehirn verstehen",
    description:
      "Lesbare Web-Version zu Amygdala, Hippocampus, präfrontalem Kortex und 3 Schritten zur Beruhigung bei Überflutung",
    keywords: [
      "textversion",
      "gehirn verstehen",
      "amygdala",
      "hippocampus",
      "präfrontaler kortex",
      "überflutung",
      "beruhigung",
      "neurobiologie",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/gehirn",
    section: "Materialien",
  },
  {
    title: "Textversion: Warnsignale der Überlastung",
    description:
      "Lesbare Web-Version des Ampel-Handouts zu Überlastung, Frühwarnzeichen und nächsten Schritten",
    keywords: [
      "textversion",
      "warnsignale",
      "überlastung",
      "selbstfürsorge",
      "ampel",
      "burnout",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/warnsignale",
    section: "Materialien",
  },
  {
    title: "Textversion: Die Sauerstoffmaske",
    description:
      "Lesbare Web-Version zum negativen und hilfreichen Kreislauf der Selbstfürsorge mit drei konkreten Schritten",
    keywords: [
      "textversion",
      "sauerstoffmaske",
      "selbstfürsorge",
      "schuldgefühle",
      "erschöpfung",
      "kreislauf",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/sauerstoffmaske",
    section: "Materialien",
  },
  {
    title: "Textversion: Die STOPP-Technik",
    description:
      "Lesbare Web-Version zur 5-Schritte-Technik aus der Stressspirale mit Anker-Satz und Alltagsübung",
    keywords: [
      "textversion",
      "stopp-technik",
      "stopp",
      "stressspirale",
      "dbt",
      "selbstfürsorge",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/stopp-technik",
    section: "Materialien",
  },
  {
    title: "Textversion: Ihr Energie-Konto",
    description:
      "Lesbare Web-Version zu Energiegebern, Energiefressern, Batteriestand und drei Auftank-Schritten",
    keywords: [
      "textversion",
      "energie-konto",
      "energie",
      "burnout",
      "auftanken",
      "selbstfürsorge",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/energie-konto",
    section: "Materialien",
  },
  {
    title: "Textversion: Ihre Erlaubnis-Karte",
    description:
      "Lesbare Web-Version mit neun entlastenden Erlaubnissen, persönlicher Genehmigung und drei kleinen Alltagsschritten",
    keywords: [
      "textversion",
      "erlaubnis-karte",
      "erlaubnis",
      "grenzen",
      "eigene bedürfnisse",
      "selbstfürsorge",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/erlaubnis-karte",
    section: "Materialien",
  },
  {
    title: "Textversion: Schuld, Verantwortung und was dazwischen liegt",
    description:
      "Lesbare Web-Version zu Schuldgefühlen, Verantwortung, Entlastung und typischen Selbstvorwürfen von Angehörigen",
    keywords: [
      "textversion",
      "schuld",
      "verantwortung",
      "schuldgefühle",
      "selbstvorwurf",
      "entlastung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/schuld-verantwortung",
    section: "Materialien",
  },
  {
    title: "Textversion: Radikale Akzeptanz",
    description:
      "Lesbare Web-Version zu radikaler Akzeptanz, innerem Widerstand, 4 Schritten und dem Fokus auf das Beeinflussbare",
    keywords: [
      "textversion",
      "radikale akzeptanz",
      "akzeptanz",
      "loslassen",
      "dbt",
      "selbstfürsorge",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/radikale-akzeptanz",
    section: "Materialien",
  },
  {
    title: "Textversion: Wenn Worte treffen",
    description:
      "Lesbare Web-Version zu Schuldzuweisungen, typischen harten Sätzen und ruhigeren Antworten für Angehörige",
    keywords: [
      "textversion",
      "wenn worte treffen",
      "schuldzuweisungen",
      "vorwürfe",
      "anklage",
      "kommunikation",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/wenn-worte-treffen",
    section: "Materialien",
  },
  {
    title: "Textversion: Die DEAR-Technik",
    description:
      "Lesbare Web-Version zu DEAR mit Beschreiben, Äussern, Behaupten und Verstärken als klare Gesprächsstruktur",
    keywords: [
      "textversion",
      "dear",
      "dear man",
      "grenzen",
      "ich-botschaft",
      "wünsche formulieren",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/dear",
    section: "Materialien",
  },
  {
    title: "Textversion: Genesung in Zahlen",
    description:
      "Lesbare Web-Version zu Remission, Recovery, Langzeitdaten und realistisch hoffnungsvollen Prognosezahlen",
    keywords: [
      "textversion",
      "genesung in zahlen",
      "remission",
      "recovery",
      "prognose",
      "langzeitdaten",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/genesung-zahlen",
    section: "Materialien",
  },
  {
    title: "Textversion: Wenn Mama oder Papa grosse Gefühle hat",
    description:
      "Lesbare Web-Version zu altersgerechter Erklärung von Borderline, Entlastung von Kindern und Schutzfaktoren im Familiensystem",
    keywords: [
      "textversion",
      "kinder",
      "mama oder papa",
      "borderline erklären",
      "geschwister",
      "schutzfaktoren",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/kinder",
    section: "Materialien",
  },
  {
    title: "Textversion: Spickzettel Grenzen",
    description:
      "Lesbare Web-Version mit DEAR-Technik, Beispielsätzen für Grenzen und L.M.K.-Exit-Strategie",
    keywords: [
      "textversion",
      "spickzettel grenzen",
      "dear",
      "grenzen",
      "satzbausteine",
      "lmk",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/grenzen-spickzettel",
    section: "Materialien",
  },

  // Selbsttest
  {
    title: "Selbsttest: Finden Sie Ihren Weg",
    description:
      "Kurze Orientierung, welche Bereiche der Website im Moment am ehesten helfen könnten",
    keywords: ["selbsttest", "test", "orientierung", "fragen", "empfehlung"],
    href: "/selbsttest",
    section: "Selbsttest",
  },

  // Selbsthilfegruppen
  {
    title: "Beratung & Netzwerke",
    description:
      "Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige",
    keywords: [
      "beratung",
      "selbsthilfe",
      "selbsthilfegruppe",
      "netzwerk",
      "gruppe",
      "austausch",
      "angehörige",
    ],
    href: "/beratung",
    section: "Beratung & Netzwerke",
  },
  {
    title: "Stand by You Schweiz",
    description:
      "Netzwerk für Angehörige von Menschen mit psychischen Erkrankungen (ehemals VASK)",
    keywords: [
      "stand by you",
      "vask",
      "angehörige",
      "netzwerk",
      "beratung",
      "schweiz",
      "podcast",
    ],
    href: "/beratung",
    section: "Beratung & Netzwerke",
  },
  {
    title: "Selbsthilfe Schweiz",
    description: "Datenbank für Selbsthilfegruppen in der ganzen Schweiz",
    keywords: [
      "selbsthilfe schweiz",
      "datenbank",
      "gruppen",
      "regional",
      "zürich",
      "bern",
      "winterthur",
    ],
    href: "/beratung",
    section: "Beratung & Netzwerke",
  },
  {
    title: "Pro Mente Sana",
    description: "Beratung für psychisch Betroffene und Angehörige",
    keywords: ["pro mente sana", "beratung", "telefon", "email", "kostenlos"],
    href: "/beratung",
    section: "Beratung & Netzwerke",
  },
  {
    title: "Fachstelle Angehörigenarbeit PUK Zürich",
    description:
      "Kostenlose, vertrauliche Beratung für Angehörige im Kanton Zürich",
    keywords: [
      "fachstelle",
      "angehörigenarbeit",
      "puk",
      "zürich",
      "beratung",
      "kostenlos",
    ],
    href: "/beratung",
    section: "Beratung & Netzwerke",
  },

  // Spezifische Begriffe
  {
    title: "DBT (Dialektisch-Behaviorale Therapie)",
    description:
      "Ein zentraler und gut erforschter Therapieansatz bei Borderline",
    keywords: [
      "dbt",
      "dialektisch",
      "behavioral",
      "therapie",
      "linehan",
      "skills",
    ],
    href: "/unterstuetzen/therapie",
    section: "Unterstützen",
  },
  {
    title: "PUK Zürich Notfall",
    description:
      "Psychiatrische Notdienste für Kinder, Erwachsene und Menschen ab 65",
    keywords: [
      "puk",
      "notfall",
      "psychiatrie",
      "zürich",
      "kinder",
      "erwachsene",
      "senioren",
      "kiz",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "McLean-Studie & CLPS-Studie",
    description: "Langzeitstudien zur Remission bei Borderline",
    keywords: [
      "mclean",
      "clps",
      "studie",
      "forschung",
      "zanarini",
      "gunderson",
      "langzeit",
    ],
    href: "/genesung",
    section: "Genesung",
  },

  // Glossar
  {
    title: "Glossar – Fachbegriffe erklärt",
    description:
      "Fachbegriffe rund um Borderline für Angehörige verständlich und knapp erklärt",
    keywords: [
      "glossar",
      "fachbegriffe",
      "lexikon",
      "erklärung",
      "definition",
      "begriffe",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Splitting",
    description: "Schwarz-Weiss-Denken bei Borderline – Glossar-Eintrag",
    keywords: [
      "splitting",
      "schwarz-weiss",
      "idealisierung",
      "entwertung",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Mentalisierung",
    description:
      "Die Fähigkeit, Verhalten als Ausdruck von Gedanken und Gefühlen zu verstehen",
    keywords: [
      "mentalisierung",
      "mentalisieren",
      "verstehen",
      "gedanken",
      "gefühle",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Dissoziation",
    description: "Zustand der Abgetrenntheit von sich selbst oder der Umgebung",
    keywords: [
      "dissoziation",
      "dissoziieren",
      "abgetrennt",
      "unwirklich",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Co-Abhängigkeit",
    description: "Wenn das eigene Wohlbefinden vom Zustand des anderen abhängt",
    keywords: [
      "co-abhängigkeit",
      "abhängigkeit",
      "muster",
      "angehörige",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Enabling",
    description: "Unbeabsichtigtes Ermöglichen von problematischem Verhalten",
    keywords: [
      "enabling",
      "ermöglichen",
      "verstärken",
      "konsequenzen",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "DEARMAN",
    description:
      "DBT-Struktur für klare Bitten und Grenzen in schwierigen Gesprächen",
    keywords: ["dearman", "kommunikation", "dbt", "technik", "glossar"],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Leuchtturm-Prinzip",
    description:
      "Metapher für die Rolle von Angehörigen – stabil sein, ohne zu steuern",
    keywords: [
      "leuchtturm",
      "prinzip",
      "metapher",
      "rolle",
      "angehörige",
      "glossar",
    ],
    href: "/glossar",
    section: "Glossar",
  },

  // Buchempfehlungen
  {
    title: "Buchempfehlungen für Angehörige",
    description:
      "Kuratierte deutschsprachige Bücher für Partner, Eltern und Kinder",
    keywords: [
      "buch",
      "bücher",
      "buchempfehlung",
      "lesen",
      "ratgeber",
      "literatur",
    ],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen",
  },
  {
    title: "Schluss mit dem Eiertanz (Buch)",
    description: "Das Standardwerk von Mason & Kreger für Angehörige",
    keywords: ["eiertanz", "mason", "kreger", "buch", "partner", "angehörige"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen",
  },
  {
    title: "Ich hasse dich – verlass mich nicht",
    description: "Klassiker zum Verständnis von Borderline",
    keywords: [
      "ich hasse dich",
      "verlass mich nicht",
      "kreisman",
      "straus",
      "buch",
    ],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen",
  },
  {
    title: "Kinderbücher über psychische Erkrankungen",
    description:
      "Bücher, die Kindern helfen, psychische Erkrankungen zu verstehen",
    keywords: ["kinderbuch", "kinder", "erklären", "mama", "papa", "psychisch"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen",
  },

  // Therapieangebote (jetzt in Unterstützen/Therapie integriert)
  {
    title: "Therapieangebote im Kanton Zürich",
    description: "Spezialisierte Borderline-Behandlung an der PUK Zürich",
    keywords: ["therapie", "zürich", "puk", "behandlung", "angebot", "kanton"],
    href: "/unterstuetzen/therapie",
    section: "Therapie",
  },
  {
    title: "DBT-Station PUK Zürich",
    description: "Stationäre DBT-Behandlung für Erwachsene in Rheinau",
    keywords: ["dbt", "station", "stationär", "rheinau", "puk", "erwachsene"],
    href: "/unterstuetzen/therapie",
    section: "Therapie",
  },
  {
    title: "HYPE ZÜRI – Frühintervention für Jugendliche",
    description: "Spezialisiertes Programm für Jugendliche ab 13 Jahren",
    keywords: ["hype", "jugendliche", "früh", "intervention", "13", "teenager"],
    href: "/unterstuetzen/therapie",
    section: "Therapie",
  },
  {
    title: "PUK Erwachsene (ab 65) Zürich",
    description: "Psychiatrische Versorgung für Erwachsene ab 65 Jahren",
    keywords: ["alter", "senioren", "65", "alterspsychiatrie", "puk"],
    href: "/unterstuetzen/therapie",
    section: "Therapie",
  },

  // FAQ
  {
    title: "Häufig gestellte Fragen (FAQ)",
    description:
      "Häufige Fragen von Angehörigen mit ruhigen und differenzierten Antworten",
    keywords: ["faq", "fragen", "antworten", "häufig", "gestellt"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Soll ich die Diagnose ansprechen?",
    description: "FAQ: Wann und wie über die Borderline-Diagnose sprechen",
    keywords: ["diagnose", "ansprechen", "gespräch", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Ist Borderline heilbar?",
    description: "FAQ: Prognose und Genesungschancen bei Borderline",
    keywords: ["heilbar", "heilung", "prognose", "chancen", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Wann ist eine Einweisung nötig?",
    description: "FAQ: Kriterien für psychiatrische Einweisung",
    keywords: ["einweisung", "klinik", "stationär", "wann", "nötig", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Darf ich meinen Angehörigen verlassen?",
    description: "FAQ: Trennung bei psychischer Erkrankung des Partners",
    keywords: ["verlassen", "trennung", "beziehung", "ende", "darf", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Mein Angehöriger will keine Therapie",
    description: "FAQ: Was tun, wenn Betroffene Behandlung ablehnen",
    keywords: ["therapie", "ablehnen", "will nicht", "verweigert", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Bin ich co-abhängig?",
    description: "FAQ: Warnsignale für Co-Abhängigkeit erkennen",
    keywords: ["co-abhängig", "abhängigkeit", "warnsignale", "muster", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Wie schütze ich meine Kinder?",
    description: "FAQ: Kinder vor den Auswirkungen schützen",
    keywords: ["kinder", "schützen", "schutz", "familie", "faq"],
    href: "/faq",
    section: "FAQ",
  },

  // Orientierung und Beispiele
  {
    title: "5-4-3-2-1 Grounding",
    description:
      "Schrittweise Orientierung über die fünf Sinne, um im gegenwärtigen Moment anzukommen",
    keywords: [
      "grounding",
      "5-4-3-2-1",
      "achtsamkeit",
      "sinne",
      "beruhigung",
      "gegenwart",
      "erdung",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },
  {
    title: "DEAR-Formulierungen",
    description:
      "Orientierung für klare und respektvolle Formulierungen in schwierigen Gesprächen",
    keywords: [
      "dear",
      "dearman",
      "satzbaukasten",
      "kommunikation",
      "formulierung",
      "übung",
    ],
    href: "/grenzen",
    section: "Grenzen setzen",
  },
  {
    title: "Mythen und Einordnungen",
    description:
      "Häufige Missverständnisse über Borderline ruhig und differenziert eingeordnet",
    keywords: ["mythos", "fakt", "vorurteil", "aufklärung", "einordnung"],
    href: "/verstehen",
    section: "Verstehen",
  },
  {
    title: "Spiegeln und antworten",
    description:
      "Beispiele für hilfreiche und weniger hilfreiche Reaktionen in belastenden Situationen",
    keywords: [
      "spiegeln",
      "validierung",
      "empathie",
      "reformulieren",
      "beispiele",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },
  {
    title: "Belastung einordnen",
    description:
      "Ruhige Orientierung zu Warnsignalen von Überforderung und Selbstfürsorge",
    keywords: [
      "selbstfürsorge",
      "belastung",
      "wohlbefinden",
      "überlastung",
      "warnsignale",
    ],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge",
  },
  {
    title: "Validierungsstufenleiter",
    description:
      "Die sechs Stufen der Validierung ruhig erklärt, mit Beispielen und Stolpersteinen",
    keywords: [
      "validierung",
      "stufen",
      "leiter",
      "linehan",
      "beispiele",
      "kommunikation",
    ],
    href: "/kommunizieren",
    section: "Kommunizieren",
  },

  // Unterstützen-Unterseiten
  {
    title: "Im Alltag unterstützen",
    description:
      "Stabilität bieten, Skills unterstützen, gemeinsame Aktivitäten – praktische Tipps für den Alltag",
    keywords: [
      "alltag",
      "stabilität",
      "routine",
      "skills",
      "unterstützen",
      "praktisch",
      "tipps",
    ],
    href: "/unterstuetzen/alltag",
    section: "Unterstützen",
  },
  {
    title: "Therapie begleiten",
    description:
      "DBT und andere Therapien verstehen, Fortschritte würdigen, mit Rückschlägen umgehen",
    keywords: [
      "therapie",
      "dbt",
      "begleiten",
      "fortschritte",
      "rückschläge",
      "behandlung",
      "skills",
    ],
    href: "/unterstuetzen/therapie",
    section: "Unterstützen",
  },
  {
    title: "In der Krise unterstützen",
    description:
      "Krisen erkennen, deeskalieren und Sicherheit gewährleisten – konkrete Handlungsschritte",
    keywords: [
      "krise",
      "deeskalation",
      "sicherheit",
      "notfall",
      "akut",
      "handeln",
    ],
    href: "/unterstuetzen/krise",
    section: "Unterstützen",
  },

  // Krisenszenarien (Notfall-Seite)
  {
    title: "Suiziddrohung – Was tun?",
    description: "Schritt-für-Schritt-Anleitung bei Suiziddrohungen",
    keywords: [
      "suizid",
      "drohung",
      "selbstmord",
      "will nicht mehr",
      "umbringen",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Selbstverletzung – Was tun?",
    description:
      "Anleitung bei Ritzen, Brennen oder anderen Selbstverletzungen",
    keywords: ["selbstverletzung", "ritzen", "schneiden", "brennen", "svv"],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Aggressive Eskalation – Was tun?",
    description: "Deeskalation bei Schreien, Drohen oder Gewalt",
    keywords: [
      "aggression",
      "eskalation",
      "gewalt",
      "schreien",
      "drohen",
      "wut",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Emotionale Erpressung – Was tun?",
    description:
      "Umgang mit Drohungen, Schuldvorwürfen und starkem Beziehungsdruck",
    keywords: [
      "erpressung",
      "manipulation",
      "schuld",
      "drohung",
      "wenn du gehst",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },

  // Wegweiser
  {
    title: "Situations-Wegweiser",
    description:
      "Was tun in konkreten Situationen? Interaktiver Wegweiser durch Krise, Eskalation und Alltagssituationen",
    keywords: [
      "wegweiser",
      "situation",
      "was tun",
      "krise",
      "eskalation",
      "schritt für schritt",
      "anleitung",
      "konkret",
      "hilfe",
    ],
    href: "/wegweiser",
    section: "Tools",
  },

  // Übungsszenarien
  {
    title: "Kommunikations-Übungen",
    description:
      "SET, DEAR MAN und Validierung interaktiv üben – mit realistischen Szenarien und Feedback",
    keywords: [
      "üben",
      "szenarien",
      "kommunikation",
      "set",
      "dear man",
      "validierung",
      "feedback",
      "training",
      "rollenspiel",
      "interaktiv",
    ],
    href: "/uebungen",
    section: "Tools",
  },

  // Notfallkarte
  {
    title: "Notfallkarte erstellen",
    description:
      "Persönliche Notfallkarte für Krisenmomente: Notfallkontakte, Warnsignale und Deeskalationsschritte festhalten",
    keywords: [
      "notfallkarte",
      "notfall",
      "karte",
      "krisenplan",
      "kontakte",
      "warnsignale",
      "deeskalation",
      "vorbereitung",
    ],
    href: "/notfallkarte",
    section: "Tools",
  },

  // Fachstelle
  {
    title: "Fachstelle Angehörigenarbeit PUK Zürich",
    description:
      "Beratung, Orientierung und Materialien für Angehörige – Fachstelle der Psychiatrischen Universitätsklinik Zürich",
    keywords: [
      "fachstelle",
      "puk",
      "zürich",
      "beratung",
      "psychiatrie",
      "angehörigenarbeit",
      "professionnelle hilfe",
      "universitätsklinik",
    ],
    href: "/fachstelle",
    section: "Ressourcen",
  },

  // Quellen
  {
    title: "Quellenangaben & Literatur",
    description:
      "Wissenschaftliche Grundlagen und Studien, auf denen diese Website basiert",
    keywords: [
      "quellen",
      "literatur",
      "studien",
      "evidenz",
      "zanarini",
      "forschung",
      "bibliographie",
    ],
    href: "/quellen",
    section: "Ressourcen",
  },
];
