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
      "Borderline personen- und perspektivenbewusst verstehen: individuelle Erfahrungen, diagnostische Grenzen und Orientierung für Angehörige",
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
    title: "Emotionen unter hoher Anspannung",
    description:
      "Wie intensive Gefühle in bestimmten Situationen erlebt und reguliert werden können",
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
    title: "Bewertungen unter Stress",
    description:
      "Warum unter hoher Belastung zeitweise nur eine Seite einer Person oder Situation präsent sein kann",
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
    title: "Sorge vor Beziehungsverlust",
    description:
      "Intensive Sorge, eine wichtige Beziehung zu verlieren – individuell und kontextabhängig",
    keywords: [
      "verlassensangst",
      "trennungsangst",
      "zurückweisung",
      "nähe",
      "beziehung",
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
    title: "Therapie und Angehörigenrolle",
    description:
      "Behandlung verstehen, Autonomie achten und die eigene Angehörigenrolle klären",
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
    description:
      "Warnzeichen einordnen lassen, den eigenen Schutz wahren und professionelle Hilfe einbeziehen",
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
      "Begriff aus der Angehörigenliteratur — im Glossar erklärt, kein empfohlenes Schema",
    keywords: [
      "set",
      "support",
      "empathy",
      "truth",
      "kommunikation",
      "gespräch",
      "technik",
      "glossar",
    ],
    href: "/glossar",
    section: "Kommunizieren",
  },
  {
    title: "Borderline und Beziehungen",
    description:
      "Grundlagen: wie Ereignis, Bedeutung, Gefühl und Reaktion zwischen beiden Seiten zusammenwirken",
    keywords: [
      "beziehung",
      "beziehungen",
      "bedeutungsschleife",
      "zurückweisung",
      "mentalisieren",
      "nähe",
      "distanz",
      "scham",
      "dissoziation",
      "wechselwirkung",
      "verstehen",
    ],
    href: "/verstehen/beziehungen",
    section: "Verstehen",
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
    title: "Notruf und Gesprächsangebote in der Schweiz",
    description:
      "Notruf bei akuter Gefahr und Angebote für Entlastung und Gespräch – mit getrennten Zuständigkeiten",
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
    title: "Psychiatrische Krisenhilfe im Kanton Zürich",
    description:
      "PUK-Krisenkontakte für den Kanton Zürich und Hinweise zur zuständigen Hilfe in anderen Kantonen",
    keywords: [
      "psychiatrie",
      "notdienst",
      "notaufnahme",
      "klinik",
      "zürich",
      "kanton",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Kein Therapieplatz: nächste Schritte",
    description:
      "Anmeldung, Kosten, Wartezeit, Zwischenhilfe und einen nächsten Kontakt mit einer Fachperson klären",
    keywords: [
      "therapieplatz",
      "warteliste",
      "wartezeit",
      "anmeldung",
      "anordnung",
      "kosten",
      "zwischenhilfe",
      "versorgung",
    ],
    href: "/unterstuetzen/therapie#versorgungszugang",
    section: "Unterstützen",
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
      "krisenplan",
      "vorbereitung",
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
    title: "Textversion: Der Leuchtturm – eigene Orientierung finden",
    description:
      "Lesbare Web-Version zur Selbstorientierung an eigenen Werten, Grenzen, Möglichkeiten und passender Unterstützung",
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
    title: "Textversion: Drei Fragen zur Selbstklärung",
    description:
      "Lesbare Web-Version zu freiwilliger Präsenz, Selbstorientierung, Pause, Grenze und zusätzlicher Hilfe",
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
    title: "Textversion: Klare und anpassbare Absprachen",
    description:
      "Lesbare Web-Version zu transparenten, freiwilligen Absprachen ohne feste Wirkung oder einheitliche Angehörigenrolle",
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
      "Lesbare Web-Version zum Trennen von Beobachtung und Vermutung sowie zum freien Wählen von Satz, Grenze, Pause oder Hilfe",
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
    title: "Textversion: 6 Orientierungspunkte für Angehörige",
    description:
      "Lesbare Web-Version mit sechs freiwilligen Orientierungspunkten zu Autonomie, Sicherheit, Absprachen und eigenen Grenzen",
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
    title: "Textversion: 4 Fragen für den Alltag",
    description:
      "Lesbare Web-Version zu vier Fragen: Ist Hilfe gewünscht, was ist freiwillig möglich und wo liegen eigene Grenzen?",
    keywords: [
      "textversion",
      "4 alltags-tipps",
      "alltag",
      "unterstützung erfragen",
      "freiwillig",
      "unterstützen",
      "skills",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/4-alltags-tipps",
    section: "Materialien",
  },
  {
    title: "Textversion: Der Eisberg",
    description:
      "Lesbare Web-Version zu sichtbarem Verhalten, möglichen Kontexten und drei Schritten für beobachtungsnahes Nachfragen",
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
    title: "Textversion: Bewertungen unter Stress",
    description:
      "Lesbare Web-Version dazu, wie Bewertungen unter hoher Belastung zeitweise einseitiger werden können",
    keywords: [
      "textversion",
      "spaltung",
      "idealisierung",
      "entwertung",
      "perspektivwechsel",
      "pendel",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/spaltung",
    section: "Materialien",
  },
  {
    title: "Textversion: Anspannung, Kontakt und Handlungsspielraum",
    description:
      "Lesbare Web-Version einer persönlichen Zustands-Landkarte ohne festen Phasenablauf, Vorhersage oder Regulierungsauftrag",
    keywords: [
      "textversion",
      "zustands-landkarte",
      "anspannung",
      "kontaktwunsch",
      "handlungsspielraum",
      "nähe",
      "abstand",
      "momentaufnahme",
      "kein phasenmodell",
      "handout",
    ],
    href: "/materialien/text/zustands-landkarte",
    section: "Materialien",
  },
  {
    title: "Textversion: Spickzettel Krisenkommunikation",
    description:
      "Lesbare Web-Version mit drei wählbaren Schritten, Ausstiegssätzen ohne Rückkehrpflicht und Notfallnummern",
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
    title: "Textversion: Die Anspannungskurve",
    description:
      "Lesbare Web-Version zur Anspannungskurve: wann ein Gespräch möglich ist und wann Pause, Abstand oder ein Gesprächsende helfen können",
    keywords: [
      "textversion",
      "anspannungskurve",
      "anspannung",
      "gesprächsfähigkeit",
      "im gespräch",
      "rückzug",
      "alarm",
      "pause",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/anspannungskurve",
    section: "Materialien",
  },
  {
    title: "Textversion: Alarm-Modus vs. Denk-Modus",
    description:
      "Lesbare Web-Version eines vereinfachten Stressmodells mit Wahlmöglichkeiten für weniger Druck, Pause, Abstand und Selbstschutz",
    keywords: [
      "textversion",
      "alarm-modus",
      "denk-modus",
      "neurobiologie",
      "trigger",
      "weniger druck",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/alarm-modus",
    section: "Materialien",
  },
  {
    title: "Textversion: Hohe Anspannung verstehen",
    description:
      "Lesbare Web-Version eines funktionalen Stressmodells zu Aufmerksamkeit, Einordnung und Handlungsspielraum – ohne anatomische Festschreibung",
    keywords: [
      "textversion",
      "hohe anspannung",
      "stressmodell",
      "aufmerksamkeit",
      "einordnung",
      "handlungsspielraum",
      "kognitive flexibilität",
      "kein borderline-gehirn",
      "grenzen",
      "handout",
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
      "Lesbare Web-Version zur Selbstfürsorge als eigenem Recht – unabhängig davon, wie viel Unterstützung Angehörige geben",
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
    title: "Textversion: Energie-Konto: Belastungen und Ressourcen",
    description:
      "Lesbare Web-Version zu individuellen Belastungen, Entlastung und Unterstützungsbedarf – ohne Mess- oder Balanceversprechen",
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
      "Lesbare Web-Version zu radikaler Akzeptanz als freiwilligem Angebot, vier möglichen Schritten und dem eigenen Handlungsspielraum",
    keywords: [
      "textversion",
      "radikale akzeptanz",
      "akzeptanz",
      "handlungsspielraum",
      "dbt",
      "selbstfürsorge",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/radikale-akzeptanz",
    section: "Materialien",
  },
  {
    title: "Textversion: Wenn Worte treffen – belastende Aussagen einordnen",
    description:
      "Lesbare Web-Version, um belastende Aussagen ohne Motivzuschreibung einzuordnen, mögliche Antworten zu finden und Sicherheitssignale getrennt zu behandeln",
    keywords: [
      "textversion",
      "wenn worte treffen",
      "schuldzuweisungen",
      "vorwürfe",
      "sicherheitssignal",
      "kommunikation",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/wenn-worte-treffen",
    section: "Materialien",
  },
  {
    title: "Textversion: Wenn Gespräche kippen",
    description:
      "Lesbare Web-Version zu drei Wahlmöglichkeiten: Tempo senken, vorsichtig spiegeln, begrenzen und Pausen ohne Rückkehrpflicht",
    keywords: [
      "textversion",
      "gespräche kippen",
      "eskalation",
      "eigenes tempo",
      "tempo senken",
      "verbinden",
      "begrenzen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/gespraeche-kippen",
    section: "Materialien",
  },
  {
    title: "Textversion: Grenzen setzen, ohne zu eskalieren",
    description:
      "Lesbare Web-Version zur 3-Teile-Formel mit Beobachtung, Ich-Grenze und einem selbst verantwortbaren nächsten Schritt",
    keywords: [
      "textversion",
      "grenzen setzen ohne eskalation",
      "3 teile formel",
      "ich grenze",
      "nächster schritt",
      "kommunizieren",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/grenzen-ohne-eskalation",
    section: "Materialien",
  },
  {
    title: "Textversion: Pause statt Streit",
    description:
      "Lesbare Web-Version zu Stabil, Warnstufe und Eskalation mit klaren Stoppsätzen ohne Rückkehrpflicht",
    keywords: [
      "textversion",
      "pause statt streit",
      "warnstufe",
      "eskalation",
      "deeskalation",
      "stopp satz",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/pause-statt-streit",
    section: "Materialien",
  },
  {
    title: "Textversion: Zuhören ohne Zustimmen",
    description:
      "Lesbare Web-Version zu Anerkennung ohne automatische Zustimmung, Schuldübernahme oder Rückkehrversprechen",
    keywords: [
      "textversion",
      "zuhören ohne zustimmen",
      "validierung",
      "anerkennen",
      "grenze",
      "plan",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/zuhoeren-ohne-zustimmen",
    section: "Materialien",
  },
  {
    title: "Textversion: Beispiel-Dialog",
    description:
      "Lesbare Web-Version eines Gesprächsbeispiels mit vorsichtigem Spiegeln, Grenze, Pause und optionalem Wiedereinstieg",
    keywords: [
      "textversion",
      "beispiel dialog",
      "gesprächsbeispiel",
      "kontakt",
      "grenze",
      "rückkehr",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/beispiel-dialog",
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
    title: "Textversion: Die Brücke mit Geländer",
    description:
      "Lesbare Web-Version zur Brücken-Metapher für freiwilligen Kontakt, Grenzen, geteilte Verantwortung und Selbstschutz",
    keywords: [
      "textversion",
      "brücke mit geländer",
      "bruecke",
      "geländer",
      "grenzen",
      "kontakt",
      "beziehung",
      "selbstschutz",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/bruecke-gelaender",
    section: "Materialien",
  },
  {
    title: "Textversion: Spiegeln statt Aufsaugen",
    description:
      "Lesbare Web-Version zu Mitfühlen ohne Übernehmen, Selbstschutz und Eigenverantwortung in belasteten Beziehungen",
    keywords: [
      "textversion",
      "spiegeln statt aufsaugen",
      "mitfühlen",
      "übernehmen",
      "selbstschutz",
      "eigenverantwortung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/spiegeln-statt-aufsaugen",
    section: "Materialien",
  },
  {
    title: "Textversion: Die 4 Arten von Grenzen",
    description:
      "Lesbare Web-Version zu physischen, emotionalen, zeitlichen und materiellen Grenzen mit Beispielen und Warnsignalen",
    keywords: [
      "textversion",
      "4 arten von grenzen",
      "physische grenzen",
      "emotionale grenzen",
      "zeitliche grenzen",
      "materielle grenzen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/4-arten-von-grenzen",
    section: "Materialien",
  },
  {
    title: "Textversion: Belastung wahrnehmen, Grenzen prüfen",
    description:
      "Lesbare Web-Version zu möglichen Stresszeichen, Selbstbeobachtung und Grenzen – ohne ihre Ursache vorwegzunehmen",
    keywords: [
      "textversion",
      "grenzen erkennen",
      "warnsignale",
      "körper",
      "überlastung",
      "selbstwahrnehmung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/grenzen-erkennen",
    section: "Materialien",
  },
  {
    title: "Textversion: Grenze benennen – eigenen Schritt wählen",
    description:
      "Lesbare Web-Version zum eigenen Handlungsspielraum – ohne Strafe, Verhaltenssteuerung oder Wirkungsgarantie",
    keywords: [
      "textversion",
      "grenzen",
      "eigener schritt",
      "handlungsspielraum",
      "selbstschutz",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/lmk",
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
    title: "Textversion: Der Garten",
    description:
      "Lesbare Web-Version zur Garten-Metapher: Bedingungen schaffen, Grenzen halten und Genesung nicht erzwingen",
    keywords: [
      "textversion",
      "garten",
      "genesung",
      "unterstützen",
      "wachstum",
      "bedingungen schaffen",
      "grenzen",
      "selbstschutz",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/garten",
    section: "Materialien",
  },
  {
    title: "Textversion: Veränderung verläuft unterschiedlich",
    description:
      "Lesbare Web-Version zu unterschiedlichen Genesungswegen, ohne festes Rückfallmuster oder Bewertung von aussen",
    keywords: [
      "textversion",
      "veränderung",
      "schwierigere phasen",
      "genesung",
      "individueller verlauf",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/fortschritt-paradox",
    section: "Materialien",
  },
  {
    title: "Textversion: Remission, Alltag und persönliche Recovery",
    description:
      "Lesbare Web-Version zu diagnostischer Remission, Alltag und Teilhabe, persönlicher Recovery und dem ungenauen Heilungsbegriff",
    keywords: [
      "textversion",
      "remission",
      "heilung",
      "genesung",
      "stabilität",
      "realistische erwartungen",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/remission-heilung",
    section: "Materialien",
  },
  {
    title: "Textversion: Fünf Bereiche rund um Genesung",
    description:
      "Lesbare Web-Version zu Behandlung, Gesundheit, gewünschten Beziehungen, Lebensbedingungen und individuellem Verlauf – ohne Kausalmodell",
    keywords: [
      "textversion",
      "5 faktoren",
      "genesung",
      "therapie",
      "lebensbedingungen",
      "teilhabe",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/5-faktoren-genesung",
    section: "Materialien",
  },
  {
    title: "Textversion: Freiwillige Unterstützung und eigene Grenzen",
    description:
      "Lesbare Web-Version zu freiwilligen Angeboten, eigenen Grenzen und klarer Abgrenzung von Genesungsverantwortung",
    keywords: [
      "textversion",
      "freiwillige unterstützung",
      "angehörige",
      "eigene grenzen",
      "keine genesungsverantwortung",
      "handout",
      "pdf",
    ],
    href: "/materialien/text/rolle-genesungsprozess",
    section: "Materialien",
  },
  {
    title: "Textversion: Kinder verstehen und entlasten",
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
      "Lesbare Web-Version mit DEAR-Technik, Beispielsätzen für Grenzen und einer Exit-Strategie mit klaren Konsequenzen",
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
    title: "Passende Inhalte finden",
    description:
      "Kurze Orientierung, welche Bereiche der Website im Moment am ehesten helfen könnten",
    keywords: ["selbsttest", "test", "orientierung", "fragen", "empfehlung"],
    href: "/selbsttest",
    section: "Orientierung",
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
    title: "Gewalt, Bedrohung oder Übergriff",
    description:
      "Soforthilfe bei häuslicher, körperlicher oder sexueller Gewalt: Polizei, Opferhilfe und Spurensicherung",
    keywords: [
      "gewalt",
      "bedrohung",
      "übergriff",
      "opferhilfe",
      "polizei",
      "117",
      "forensic nurses",
      "spurensicherung",
      "häusliche gewalt",
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
    title: "Bewertungen unter hoher Belastung",
    description:
      "Einordnung eines beschreibenden Modells, das keine feste Eigenschaft oder Absicht bezeichnet",
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
    title: "Überanpassung und übernommene Verantwortung",
    description:
      "Wenn Angehörige eigene Bedürfnisse wiederholt zurückstellen oder sich übermässig verantwortlich fühlen",
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
    title: "Unbeabsichtigte Wirkung von Hilfe",
    description:
      "Wie konkrete Hilfen neben Entlastung auch unerwünschte Wirkungen haben können",
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
    title: "DEAR MAN",
    description:
      "DBT-Struktur für klare Bitten und Grenzen in schwierigen Gesprächen",
    keywords: ["dearman", "kommunikation", "dbt", "technik", "glossar"],
    href: "/glossar",
    section: "Glossar",
  },
  {
    title: "Leuchtturm-Prinzip",
    description:
      "Metapher für die Selbstorientierung von Angehörigen – ohne feste Stabilitäts- oder Führungsrolle",
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
    description:
      "Historisch einflussreicher Ratgeber von Mason & Kreger – kritisch eingeordnet",
    keywords: ["eiertanz", "mason", "kreger", "buch", "partner", "angehörige"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen",
  },
  {
    title: "Ich hasse dich – verlass mich nicht",
    description:
      "Historisch einflussreicher Ratgeber mit verallgemeinernden Aussagen – kritisch eingeordnet",
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
    title: "Die nahestehende Person möchte keine Therapie",
    description:
      "FAQ: Autonomie respektieren, Möglichkeiten ansprechen und die eigene Rolle klären",
    keywords: ["therapie", "ablehnen", "will nicht", "autonomie", "faq"],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Kommt mein eigenes Leben zu kurz?",
    description:
      "FAQ: Übernommene Verantwortung und die eigenen Bedürfnisse einordnen",
    keywords: [
      "co-abhängig",
      "überanpassung",
      "verantwortung",
      "bedürfnisse",
      "faq",
    ],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Wie schütze ich meine Kinder?",
    description: "FAQ: Kinder vor den Auswirkungen schützen",
    keywords: [
      "kinder",
      "schützen",
      "schutz",
      "familie",
      "kindeswohl",
      "kesb",
      "kjpd",
      "schulpsychologischer dienst",
      "elternnotruf",
      "147",
      "faq",
    ],
    href: "/faq",
    section: "FAQ",
  },
  {
    title:
      "Was, wenn Deutsch nicht die Hauptsprache ist oder psychische Erkrankung tabuisiert ist?",
    description:
      "FAQ: Hilfe suchen, wenn Sprache, Scham oder Migration Gespräche erschweren",
    keywords: [
      "sprache",
      "dolmetschung",
      "migration",
      "kulturell",
      "scham",
      "tabu",
      "familie",
      "übersetzen",
      "faq",
    ],
    href: "/faq",
    section: "FAQ",
  },
  {
    title: "Helfen Medikamente bei Borderline?",
    description:
      "FAQ: Was Medikamente leisten können und was sie nicht ersetzen",
    keywords: [
      "medikamente",
      "borderline",
      "tabletten",
      "antidepressiva",
      "symptome",
      "faq",
    ],
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
    keywords: [
      "mythos",
      "fakt",
      "vorurteil",
      "aufklärung",
      "einordnung",
      "manipulation",
      "frauen",
      "männer",
      "suizid ansprechen",
      "schuld",
    ],
    href: "/verstehen#mythen-realitaet",
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
      "Freiwillige Absprachen, eigene Grenzen und gemeinsame Aktivitäten – praktische Orientierung für den Alltag",
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
    title: "Therapie und Angehörigenrolle",
    description:
      "DBT und andere Therapien verstehen, Autonomie achten und die eigene Angehörigenrolle klären",
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
      "Warnzeichen einordnen lassen, den eigenen Schutz wahren und professionelle Hilfe einbeziehen – konkrete Handlungsschritte",
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
    title: "Suizidgedanken oder Suizidankündigung – was tun?",
    description:
      "Orientierung bei suizidbezogenen Äusserungen oder möglicher unmittelbarer Gefahr",
    keywords: [
      "suizid",
      "suizidankündigung",
      "selbstmord",
      "will nicht mehr",
      "umbringen",
    ],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Orientierung nach Selbstverletzung",
    description:
      "Medizinische Versorgung, fachliche Unterstützung und nächste sichere Schritte",
    keywords: ["selbstverletzung", "ritzen", "schneiden", "brennen", "svv"],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },
  {
    title: "Wenn eine Situation bedrohlich wird",
    description: "Schutz und Hilfewege bei Schreien, Drohen oder Gewalt",
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
    title: "Wenn Druck oder Drohungen auftreten",
    description:
      "Eigene Grenzen, Sicherheit und professionelle Unterstützung bei starkem Beziehungsdruck",
    keywords: ["schuld", "drohung", "wenn du gehst"],
    href: "/soforthilfe",
    section: "Krisenressourcen",
  },

  // Wegweiser
  {
    title: "Situations-Wegweiser",
    description:
      "Bei akuter Gefahr oder unklarer Dringlichkeit professionelle Hilfe finden – ohne eigene Risikoeinschätzung",
    keywords: [
      "wegweiser",
      "situation",
      "was tun",
      "krise",
      "eskalation",
      "hilfe",
    ],
    href: "/wegweiser",
    section: "Tools",
  },

  // Übungsszenarien
  {
    title: "Kommunikations-Übungen",
    description:
      "Offene Fragen, klare Grenzen, die vier DEAR-Schritte und Validierung interaktiv üben – mit anpassbaren Szenarien und Feedback",
    keywords: [
      "üben",
      "szenarien",
      "kommunikation",
      "offene fragen",
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
