import {
  materials,
  type MaterialCategory,
  type MaterialItem,
} from "./materialien";

export interface HandoutTextCard {
  title: string;
  text: string;
}

export interface HandoutTextSection {
  title: string;
  intro?: string;
  cards?: HandoutTextCard[];
  bullets?: string[];
  calloutTitle?: string;
  calloutText?: string;
}

export interface HandoutTextVersion {
  id: string;
  path: string;
  title: string;
  description: string;
  summary: string;
  kicker: string;
  topicLabel: string;
  topicHref: string;
  category: Exclude<MaterialCategory, "alle">;
  kind: MaterialItem["kind"];
  previewImageUrl: string;
  pdfSourceUrl: string;
  intro: string[];
  sections: HandoutTextSection[];
  sourceLine: string;
  standLine: string;
}

const TOPIC_META: Record<
  Exclude<MaterialCategory, "alle">,
  { label: string; href: string }
> = {
  verstehen: { label: "Verstehen", href: "/verstehen" },
  unterstuetzen: { label: "Unterstützen", href: "/unterstuetzen/uebersicht" },
  kommunizieren: { label: "Kommunizieren", href: "/kommunizieren" },
  grenzen: { label: "Grenzen", href: "/grenzen" },
  selbstfuersorge: { label: "Selbstfürsorge", href: "/selbstfuersorge" },
  genesung: { label: "Genesung", href: "/genesung" },
  soforthilfe: { label: "Soforthilfe", href: "/soforthilfe" },
};

function requireMaterial(id: string) {
  const material = materials.find(item => item.id === id);
  if (!material) {
    throw new Error(`Unknown material item: ${id}`);
  }

  const pdfSourceUrl = material.pdfUrl ?? material.downloadUrl;
  if (!pdfSourceUrl) {
    throw new Error(`Material item is missing a PDF source: ${id}`);
  }

  return {
    material,
    topic: TOPIC_META[material.category],
    pdfSourceUrl,
  };
}

function createHandoutTextVersion(
  id: string,
  config: Omit<
    HandoutTextVersion,
    | "id"
    | "path"
    | "title"
    | "description"
    | "topicLabel"
    | "topicHref"
    | "category"
    | "kind"
    | "previewImageUrl"
    | "pdfSourceUrl"
  >
): HandoutTextVersion {
  const { material, topic, pdfSourceUrl } = requireMaterial(id);

  return {
    id,
    path: `/materialien/text/${id}`,
    title: material.title,
    description: material.description,
    topicLabel: topic.label,
    topicHref: topic.href,
    category: material.category,
    kind: material.kind,
    previewImageUrl: material.url,
    pdfSourceUrl,
    ...config,
  };
}

export const handoutTextVersions: HandoutTextVersion[] = [
  createHandoutTextVersion("leuchtturm", {
    kicker: "Textversion",
    summary:
      "Sie können die Krise nicht steuern, aber Sie können als Angehörige oder Angehöriger Orientierung geben: ruhig, klar und verlässlich.",
    intro: [
      "Diese Seite überträgt die Inhalte des Handouts «Der Leuchtturm» in eine lesbare Web-Version. Sie ist als barriereärmere Ergänzung zur gestalteten PDF-Fassung gedacht.",
      "Die Grafik stellt nicht die Gefühle der betroffenen Person in den Mittelpunkt, sondern Ihre Haltung als Angehörige oder Angehöriger: Zustände wechseln, Ihre Orientierung darf stabil bleiben.",
    ],
    sections: [
      {
        title: "Die Bildidee",
        intro:
          "Das Handout arbeitet mit einer einfachen Metapher: Krise und Alltag wechseln sich ab, der Leuchtturm bleibt trotzdem stehen.",
        cards: [
          {
            title: "Sturm",
            text: "Krise oder Überflutung: intensive Gefühle, hohe Anspannung, wenig Übersicht.",
          },
          {
            title: "Ruhe",
            text: "Stabilität oder Alltag: mehr Kontaktfähigkeit, mehr Orientierung, mehr Spielraum.",
          },
          {
            title: "Übergang",
            text: "Krisen kommen und Krisen gehen. Der Pfeil steht für diesen Wechsel zwischen Zuständen.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Was der Leuchtturm meint",
        calloutText:
          "Sie können das Schiff nicht steuern – aber Sie können Orientierung geben: ruhig, klar, verlässlich.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Stabilität wahren",
            text: "Bewahren Sie innere Ruhe. Lassen Sie sich nicht mitreissen.",
          },
          {
            title: "2. Orientierung geben",
            text: "Seien Sie ein verlässlicher Ankerpunkt.",
          },
          {
            title: "3. Verlässlich bleiben",
            text: "Seien Sie beständig da, unabhängig vom Zustand.",
          },
        ],
      },
      {
        title: "Legende der Grafik",
        cards: [
          {
            title: "Leuchtturm",
            text: "Der Leuchtturm steht für Ihre Haltung: stabil, ruhig und klar.",
          },
          {
            title: "Sturm und Ruhe",
            text: "Die Zustände wechseln. Sie sind wichtig, aber sie definieren nicht alles.",
          },
          {
            title: "Pfeile",
            text: "Die Pfeile markieren den Übergang: Krisen sind nicht statisch, und auch Ruhe ist nicht für immer gesichert.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Nach Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("rolle-klaeren", {
    kicker: "Textversion",
    summary:
      "Sie können Orientierung, Hoffnung und klare Grenzen geben. Therapie ersetzen, Verhalten kontrollieren oder die Genesung tragen müssen Sie nicht.",
    intro: [
      "Diese Seite überträgt die Infografik «Ihre Rolle klären» in eine lesbare Web-Version. Die Grundstruktur des Originals bleibt erhalten: Ihr Beitrag, nicht Ihre Aufgabe und die Rolle professioneller Hilfe.",
      "Das Handout hilft Angehörigen dabei, Unterstützung realistisch zu verstehen: zugewandt und stabil bleiben, ohne in Therapie, Kontrolle oder Selbstaufgabe abzurutschen.",
    ],
    sections: [
      {
        title: "Ihr Beitrag",
        intro:
          "Die linke Spalte des Handouts beschreibt, was Angehörige tatsächlich leisten können, ohne ihre Rolle zu überschreiten.",
        cards: [
          {
            title: "Verlässlicher Anker",
            text: "Berechenbar und stabil bleiben.",
          },
          {
            title: "Geduldige/r Zuhörer/in",
            text: "Zuhören, ohne zu urteilen.",
          },
          {
            title: "Übungspartner/in",
            text: "Neue Verhaltensweisen gemeinsam üben.",
          },
          {
            title: "Hoffnung geben",
            text: "Vermitteln, dass Besserung möglich ist.",
          },
          {
            title: "Grenzen halten",
            text: "Klar und konsequent bleiben.",
          },
        ],
      },
      {
        title: "Nicht Ihre Aufgabe",
        intro:
          "Die rechte Spalte grenzt bewusst ab, welche Rollen zwar verständlich erscheinen, aber Angehörige überfordern oder in problematische Dynamiken bringen.",
        cards: [
          {
            title: "Therapeut/in",
            text: "Die Therapie ersetzen oder kontrollieren.",
          },
          {
            title: "Retter/in",
            text: "Alle Probleme lösen wollen.",
          },
          {
            title: "Kontrolleur/in",
            text: "Verhalten überwachen oder erzwingen.",
          },
          {
            title: "Sündenbock",
            text: "Schuld für alles übernehmen.",
          },
          {
            title: "Verantwortlich für Genesung",
            text: "Die Genesung liegt nicht in Ihrer Hand.",
          },
        ],
      },
      {
        title: "Professionelle Hilfe",
        calloutTitle: "Was Fachpersonen übernehmen",
        calloutText:
          "Therapie, Psychiatrie und Beratung – das ist Aufgabe der Fachpersonen.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Sie können unterstützen und Grenzen halten. Sie müssen nicht therapieren.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "Regelmässig prüfen",
            text: "Fragen Sie sich: Bin ich noch in meiner Rolle oder rutsche ich ab?",
          },
          {
            title: "Mit Fachpersonen sprechen",
            text: "Holen Sie sich Rücksprache, wenn Sie unsicher sind oder die Rollen verschwimmen.",
          },
          {
            title: "Sich erinnern",
            text: "Ihre Stabilität ist Ihr wichtigster Beitrag.",
          },
        ],
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Sage = Ihr Beitrag",
          "Terracotta = Nicht Ihre Aufgabe",
          "Slate = Professionelle Hilfe",
        ],
      },
    ],
    sourceLine: "Quelle: Gunderson et al., Family Guidelines; Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("eisberg", {
    kicker: "Textversion",
    summary:
      "Was sichtbar wie Wut, Vorwürfe oder Lautwerden wirkt, hat oft eine verdeckte Unterseite aus Angst, Scham, Trauer, Einsamkeit und Stress.",
    intro: [
      "Diese Seite überträgt das Handout «Der Eisberg» in eine lesbare Web-Version. Die zentrale Bildidee bleibt erhalten: sichtbares Verhalten ist nur die Spitze, darunter liegen oft andere Gefühle und Bedürfnisse.",
      "Für Angehörige ist die Grafik als Einordnungshilfe gedacht. Sie soll Wut nicht verharmlosen, aber helfen, Verhalten differenzierter zu lesen und die eigene Reaktion bewusster zu wählen.",
    ],
    sections: [
      {
        title: "Sichtbar",
        intro:
          "Die obere Spitze des Eisbergs steht für das, was im Alltag direkt auffällt und oft schnell eskaliert.",
        cards: [
          {
            title: "Wut",
            text: "Starke Gereiztheit oder explosive Reaktionen, die sofort als Problem sichtbar werden.",
          },
          {
            title: "Vorwürfe",
            text: "Anklagen, Schuldzuweisungen oder harte Botschaften, die bei Angehörigen schnell Abwehr auslösen.",
          },
          {
            title: "Laut werden",
            text: "Erhöhte Lautstärke oder scharfer Ton als sichtbares Verhalten an der Oberfläche.",
          },
        ],
      },
      {
        title: "Darunter",
        intro:
          "Unter der Wasserlinie zeigt die Grafik die verborgenen Gefühle und Bedürfnisse, die an der Oberfläche nicht sofort erkennbar sind.",
        cards: [
          {
            title: "Angst",
            text: "Unsicherheit, Bedrohungsgefühl oder Verlassensangst können sich hinter Wut verbergen.",
          },
          {
            title: "Scham",
            text: "Starke innere Beschämung wird oft nicht direkt gezeigt, sondern über Abwehr oder Angriff nach aussen geleitet.",
          },
          {
            title: "Trauer",
            text: "Verlust, Schmerz oder Enttäuschung können verdeckt bleiben und trotzdem das Verhalten prägen.",
          },
          {
            title: "Einsamkeit",
            text: "Das Gefühl, nicht erreicht oder verstanden zu werden, kann unterm sichtbaren Konflikt liegen.",
          },
          {
            title: "Stress",
            text: "Überforderung und Anspannung verstärken sichtbare Reaktionen und engen den Handlungsspielraum ein.",
          },
        ],
      },
      {
        title: "Anspannung und Ventile",
        intro:
          "Die Grafik ergänzt den Eisberg um zwei Regler: mehr Trigger und Überforderung erhöhen den Druck, mehr Sicherheit, Skills und Erholung entlasten.",
        cards: [
          {
            title: "Anspannung",
            text: "Die Anzeige visualisiert, wie hoch die innere Aktivierung gerade ist.",
          },
          {
            title: "Mehr Trigger",
            text: "Stress, Überforderung und belastende Reize erhöhen den inneren Druck.",
          },
          {
            title: "Mehr Ventile",
            text: "Sicherheit, Skills und Erholung senken die Anspannung und schaffen wieder Spielraum.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Eisberg geht",
        calloutText:
          "Was Sie sehen (Wut) ist oft nur die Spitze – darunter liegen Schmerz, Angst, Scham und Überforderung.",
      },
      {
        title: "3 Schritte",
        cards: [
          {
            title: "1. Erkennen",
            text: "Was sehe ich? Was könnte darunter liegen?",
          },
          {
            title: "2. Verstehen",
            text: "Welches Gefühl oder Bedürfnis steckt dahinter?",
          },
          {
            title: "3. Handeln",
            text: "Wie kann ich darauf eingehen, ohne mich selbst zu verlieren?",
          },
        ],
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Spitze = sichtbares Verhalten",
          "Unter Wasser = verborgene Gefühle",
          "Ventile = Stresszufuhr oder Entlastung",
        ],
      },
    ],
    sourceLine:
      "Quelle: Psychoedukation, Emotionsmodell nach DBT (Linehan, 1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("spaltung", {
    kicker: "Textversion",
    summary:
      "Unter Stress kippt die Bewertung oft in Extreme. Angehörige werden dann vorübergehend idealisiert oder entwertet, während die Grauzone schwer erreichbar wird.",
    intro: [
      "Diese Seite überträgt das Handout «Spaltung – das Pendel zwischen Extremen» in eine lesbare Web-Version. Die zentrale Bildidee bleibt erhalten: Unter Belastung pendelt die Wahrnehmung zwischen Idealisierung und Entwertung, statt den ganzen Menschen zu sehen.",
      "Für Angehörige ist die Grafik als Orientierung gedacht. Sie erklärt, warum das Kippen so schmerzhaft und verwirrend wirkt, und zeigt, wie stabilisierende Reaktionen helfen können, die Grauzone wieder erreichbar zu machen.",
    ],
    sections: [
      {
        title: "Die drei Zustände",
        intro:
          "Das Handout stellt zwei verzerrte Bewertungszustände und die schwer erreichbare Grauzone dazwischen gegenüber.",
        cards: [
          {
            title: "Idealisierung",
            text: "«Du bist der beste Mensch der Welt!» So erleben Sie es: Ihr Angehöriger überhäuft Sie mit Lob und Zuneigung. Sie fühlen sich gebraucht und wichtig – aber auch unter Druck, diesem Bild gerecht zu werden.",
          },
          {
            title: "Grauzone",
            text: "«Du bist ein Mensch – mit Stärken und Schwächen.» Das Ziel: Ihr Angehöriger kann Sie als ganzen Menschen sehen – nicht nur als Retter oder Feind. Dieses Sowohl-als-auch ist das, was Therapie langfristig fördert.",
          },
          {
            title: "Entwertung",
            text: "«Du bist das Schlimmste. Du bist gegen mich!» So erleben Sie es: Plötzlich sind Sie der Feind – obwohl sich nichts geändert hat. Alles Gute scheint vergessen. Das tut weh und ist verwirrend.",
          },
        ],
      },
      {
        title: "Was das Pendel kippen kann",
        intro:
          "Die Grafik markiert kleine Auslöser, die von aussen oft banal wirken, unter Stress aber stark ins Gewicht fallen.",
        bullets: ["Stress", "Kritik", "Abstand", "Missverständnis"],
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Warum das Kippen so irritierend ist",
        calloutText:
          "Diese Trigger sind oft winzig – für Aussenstehende kaum erkennbar. Das Kippen ist kein böser Wille Ihres Angehörigen, sondern ein erlerntes Muster der Emotionsregulation.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Spaltung geht",
        calloutText:
          "Unter Stress kippt die Bewertung Ihres Angehörigen leicht ins Extreme – die Grauzone wird schwer erreichbar. Weder die Idealisierung noch die Entwertung sind ein realistisches Bild von Ihnen. Beides sind Verzerrungen. Sie sind derselbe Mensch – vor und nach dem Kippen.",
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Zwei Bewertungszustände = beide verzerrt, beide vorübergehend",
          "Trigger = kleine Enttäuschungen, die das Pendel kippen können",
          "Grauzone = der realistische Bereich – hier können Sie stabilisierend wirken",
        ],
      },
      {
        title: "3 Schritte zur Stabilisierung",
        cards: [
          {
            title: "1. Wahrnehmen",
            text: "Erkennen Sie das Muster – bei Ihrem Angehörigen und bei sich selbst. «Werde ich gerade idealisiert oder entwertet? Bin ich wirklich so gut oder so schlecht – oder ist das Pendel gekippt?» Allein dieses Erkennen schafft inneren Abstand.",
          },
          {
            title: "2. Pause",
            text: "Nicht sofort reagieren. Zeit gewinnen und Distanz schaffen. «Ich brauche einen Moment, bevor ich antworte.» Lassen Sie die erste Welle vorbeiziehen. Weder Gegenangriff noch Unterwerfung helfen.",
          },
          {
            title: "3. Integration",
            text: "Bleiben Sie konsistent – auch wenn die Bewertung schwankt. «Ich bin derselbe Mensch wie gestern. Ich habe dich lieb, auch wenn du gerade wütend auf mich bist.» Ihre Beständigkeit ist der Anker, der die Grauzone erreichbar macht. Sowohl-als-auch statt Entweder-oder.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Nach Linehan (2015), DBT Skills Training, Handouts 10, 15, 16. Gunderson et al. (2011), Family Psychoeducation for BPD.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("krisenkommunikation", {
    kicker: "Textversion",
    summary:
      "Wenn Gespräche kippen, helfen Verbindung, kurze Orientierung und eine klare Grenze oft mehr als langes Argumentieren.",
    intro: [
      "Diese Seite überträgt den «Spickzettel Krisenkommunikation» in eine such- und kopierbare Textfassung. Die Struktur bleibt nah am A4-Original, ist aber für das Lesen am Bildschirm aufbereitet.",
      "Die Grundidee ist bewusst knapp gehalten: zuerst Verbindung herstellen, dann Kontakt halten, dann Grenze und nächsten Schritt benennen.",
    ],
    sections: [
      {
        title: "1. Die 3 Schritte",
        cards: [
          {
            title: "Verbinden",
            text: "«Ich sehe, dass du gerade sehr aufgebracht bist.»",
          },
          {
            title: "Kontakt",
            text: "«Das klingt belastend. Ich bin hier.»",
          },
          {
            title: "Grenze + Plan",
            text: "«So kann ich nicht weiterreden. Pause 10 Min, dann weiter.»",
          },
        ],
      },
      {
        title: "2. Der Standardsatz",
        calloutTitle: "Standardsatz",
        calloutText:
          "Ich sehe, dass du gerade sehr angespannt bist. Und gleichzeitig gilt: So reden wir nicht. Pause 10 Minuten, dann weiter.",
      },
      {
        title: "3. Grenzen setzen",
        intro:
          "Die Grafik verdichtet Grenzsetzung auf drei Bausteine: erst benennen, was gerade passiert, dann Ihre Grenze, dann den nächsten Schritt.",
        cards: [
          {
            title: "Fakt",
            text: "Beschreiben Sie kurz und sachlich, was gerade geschieht, statt in Motive oder Gegenangriffe einzusteigen.",
          },
          {
            title: "Ich-Grenze",
            text: "Sagen Sie klar, was so für Sie nicht geht oder wo Sie das Gespräch unterbrechen müssen.",
          },
          {
            title: "Nächster Schritt",
            text: "Formulieren Sie, wie es konkret weitergeht: Pause, Uhrzeit oder nächster Kontaktpunkt.",
          },
        ],
      },
      {
        title: "4. Exit-Sätze",
        calloutTitle: "Exit-Sätze",
        calloutText:
          "Ich gehe nicht weg, ich mache nur eine Pause. Wir sprechen um [Uhrzeit] weiter. Ich bin wieder da.",
      },
      {
        title: "5. Notfallnummern",
        bullets: [
          "Dargebotene Hand 143",
          "Pro Mente Sana 0848 800 858",
          "Notfall PUK Zürich 044 384 21 11",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("alarm-modus", {
    kicker: "Textversion",
    summary:
      "Wenn der Alarm-Modus aktiv ist, ist Ihr Gegenüber vorübergehend schwer erreichbar. Erst beruhigen, dann klären: Die Brücke vom Alarm zum Denken braucht Sicherheit und weniger Druck.",
    intro: [
      "Diese Seite überträgt das Handout «Alarm-Modus vs. Denk-Modus» in eine lesbare Web-Version. Die Grundidee des Originals bleibt erhalten: Unter hoher Anspannung steht nicht dieselbe Denkfähigkeit zur Verfügung wie in ruhigeren Momenten.",
      "Für Angehörige ist das eine Entlastung und eine Handlungsorientierung zugleich. Nicht jede Eskalation ist böser Wille oder bewusste Verweigerung – oft ist sie Ausdruck eines neurobiologisch eingeengten Zustands.",
    ],
    sections: [
      {
        title: "Trigger",
        calloutTitle: "Was den Alarm auslösen kann",
        calloutText: "Kritik, Zurückweisung, Überforderung.",
      },
      {
        title: "Die zwei Modi",
        intro:
          "Das Handout stellt einen hoch aktivierten Alarm-Zustand einem wieder zugänglichen Denk-Zustand gegenüber.",
        cards: [
          {
            title: "Alarm-Modus",
            text: "Körper auf Kampf oder Flucht. Amygdala überaktiv. Denken eingeschränkt. Impulsivität hoch. Schuldgefühle kommen später.",
          },
          {
            title: "Denk-Modus",
            text: "Präfrontaler Kortex aktiv. Fähigkeiten verfügbar: Zuhören, Abwägen, Planen. Gespräch möglich. Lösungen finden.",
          },
          {
            title: "Übergang",
            text: "Erst beruhigen, dann klären. Die Brücke vom Alarm zum Denken entsteht nicht durch Druck, sondern durch Entlastung und Sicherheit.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Alarm-Modus geht",
        calloutText:
          "Im Alarm-Modus ist Ihr Gegenüber vorübergehend nicht erreichbar. Das ist keine Lüge, kein böser Wille – es ist Neurobiologie.",
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Terracotta = Alarm-Modus",
          "Sage = Denk-Modus",
          "Sand = Übergang",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Erkennen und Stopp",
            text: "Fragen Sie sich: Ist mein Gegenüber gerade im Alarm-Modus?",
          },
          {
            title: "2. Aktiv beruhigen",
            text: "Stimme senken, Tempo verlangsamen, Raum geben.",
          },
          {
            title: "3. Klärendes Gespräch",
            text: "Erst wenn der Denk-Modus zurück ist.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Porges (2011), Polyvagal-Theorie; Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("warnsignale", {
    kicker: "Textversion",
    summary:
      "Überlastung baut sich oft schrittweise auf. Wer erste Warnzeichen ernst nimmt, kann früher gegensteuern und rechtzeitig Hilfe holen.",
    intro: [
      "Diese Seite überträgt das Handout «Warnsignale der Überlastung» in eine lesbare Web-Version. Die Ampellogik des Originals bleibt inhaltlich erhalten: grün, gelb und rot markieren unterschiedliche Belastungsstufen.",
      "Die Grafik ist als frühzeitige Orientierung gedacht, nicht als Selbstvorwurf. Entscheidend ist, Belastung ernst zu nehmen, bevor Erschöpfung oder Krisen eskalieren.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText: "Überlastung kommt nicht plötzlich – sie kündigt sich an.",
      },
      {
        title: "Noch im Rahmen",
        intro:
          "Die grüne Stufe beschreibt erste, noch gut beeinflussbare Belastungszeichen. Sie sind ernst zu nehmen, aber noch ein günstiger Moment zum Gegensteuern.",
        cards: [
          {
            title: "Gelegentliche Gereiztheit",
            text: "Die innere Spannung steigt schneller als sonst, beruhigt sich aber noch wieder.",
          },
          {
            title: "Leichte Schlafprobleme",
            text: "Ein- oder Durchschlafen fällt schwerer, ohne dass der ganze Alltag schon kippt.",
          },
          {
            title: "Weniger Lust auf Hobbys",
            text: "Freude, Interesse oder Erholung kommen zu kurz.",
          },
        ],
      },
      {
        title: "Achtung, handeln",
        intro:
          "Die gelbe Stufe zeigt, dass Belastung bereits deutlicher in Stimmung, Körper und Beziehungen eingreift. Jetzt reicht blosses Durchhalten meist nicht mehr.",
        cards: [
          {
            title: "Emotionale Taubheit oder Dauerfrust",
            text: "Sie fühlen sich abgestumpft, leer oder dauerhaft gereizt.",
          },
          {
            title: "Körperliche Beschwerden",
            text: "Stress zeigt sich bereits spürbar körperlich.",
          },
          {
            title: "Sozialer Rückzug beginnt",
            text: "Kontakte werden weniger, Austausch wird anstrengender oder vermieden.",
          },
        ],
      },
      {
        title: "Hilfe suchen",
        intro:
          "Die rote Stufe steht für deutliche Warnsignale. Hier braucht es Unterstützung von aussen und nicht nur mehr Disziplin im Alltag.",
        cards: [
          {
            title: "Hoffnungslosigkeit",
            text: "Die Belastung wirkt festgefahren und ohne Ausweg.",
          },
          {
            title: "Kontrollverlust-Angst",
            text: "Sie haben das Gefühl, sich selbst oder die Situation nicht mehr im Griff zu haben.",
          },
          {
            title: "Eigene Identität verloren",
            text: "Sie erleben sich fast nur noch in der Angehörigenrolle.",
          },
          {
            title: "Körperliche Dauerbeschwerden",
            text: "Stresssymptome halten an und werden zu einem dauerhaften Problem.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Grün",
            text: "Selbstfürsorge aktivieren.",
          },
          {
            title: "2. Gelb",
            text: "Professionelle Beratung suchen.",
          },
          {
            title: "3. Rot",
            text: "Sofort Hilfe holen.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Maslach/Leiter (2016), Burnout-Prävention; Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("schuld-verantwortung", {
    kicker: "Textversion",
    summary:
      "Schuldgefühle sind bei Angehörigen häufig und verständlich. Hilfreicher als der Blick zurück ist die Frage, was Sie heute beeinflussen können, ohne sich die ganze Verantwortung aufzuladen.",
    intro: [
      "Diese Seite überträgt das Handout «Schuld, Verantwortung und was dazwischen liegt» in eine lesbare Web-Version. Sie richtet sich an Angehörige, die sich zwischen Selbstvorwurf, Fürsorge und Verantwortung verlieren.",
      "Die Struktur des Originals bleibt erhalten: zuerst die Einordnung von Schuldgefühlen, dann der Blick auf Forschung, der Vergleich zwischen Schuld und Verantwortung und schliesslich typische Selbstvorwürfe mit einer realistischeren Gegenperspektive.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentrale Entlastung",
        calloutText:
          "Schuldgefühle gehören zu den häufigsten Belastungen von Angehörigen. Diese Gedanken sind verständlich, aber sie helfen weder Ihnen noch der betroffenen Person. BPD hat keine einzelne Ursache, und kein einzelner Mensch ist dafür verantwortlich.",
      },
      {
        title: "Was die Forschung zeigt",
        intro:
          "Das Handout fasst die Entlastung bewusst sachlich zusammen: Borderline entsteht nicht durch einen einzelnen Auslöser und nicht durch eine einzelne Person.",
        cards: [
          {
            title: "Genetik & Temperament",
            text: "Vererbt werden Temperamentszüge – diese allein führen noch nicht zur Erkrankung.",
          },
          {
            title: "Zusammenspiel vieler Faktoren",
            text: "Es gibt keine einzelne Ursache – und keinen einzelnen Schuldigen.",
          },
          {
            title: "Wechselseitige Beziehung",
            text: "Ein empfindsames Kind stellt andere Anforderungen – das macht niemanden schuldig.",
          },
        ],
      },
      {
        title: "Schuld vs. Verantwortung",
        intro:
          "Das Handout stellt beide Haltungen bewusst gegenüber. Schuld fixiert auf das Vergangene, Verantwortung öffnet wieder Handlungsspielraum im Hier und Jetzt.",
        cards: [
          {
            title: "Blickrichtung",
            text: "Schuld fragt rückwärts: «Was habe ich falsch gemacht?» Verantwortung fragt vorwärts: «Was kann ich jetzt tun?»",
          },
          {
            title: "Wirkung",
            text: "Schuld lähmt und macht hilflos. Verantwortung macht handlungsfähiger und klarer.",
          },
          {
            title: "Fokus",
            text: "Schuld fixiert Fehler und Versagen. Verantwortung richtet den Blick auf Möglichkeiten und Einfluss.",
          },
          {
            title: "Ergebnis",
            text: "Schuld begünstigt Rückzug oder Überanpassung. Verantwortung erleichtert klare Entscheidungen und gesunde Grenzen.",
          },
        ],
      },
      {
        title:
          "5 Sätze, die Angehörige sich oft sagen – und was wirklich stimmt",
        cards: [
          {
            title: "«Ich hätte es früher merken müssen.»",
            text: "Sie sind kein Diagnostik-Team. BPD wird selbst von Fachpersonen oft erst spät erkannt.",
          },
          {
            title:
              "«Wenn ich ein besserer Elternteil gewesen wäre, wäre das nicht passiert.»",
            text: "BPD entsteht nie durch eine einzelne Person. Dass Sie jetzt da sind, zeigt Ihre Fürsorge.",
          },
          {
            title: "«Ich tue nicht genug.»",
            text: "Sie tun bereits viel. Genug ist, was Sie leisten können, ohne sich selbst zu verlieren.",
          },
          {
            title:
              "«Vielleicht bin ich der Grund, warum es nicht besser wird.»",
            text: "Genesung hängt von vielen Faktoren ab. Sie sind ein wichtiger – aber nicht der einzige.",
          },
          {
            title: "«Andere Familien haben dieses Problem nicht.»",
            text: "BPD kommt in allen Familien vor – unabhängig von Bildung, Einkommen oder Erziehungsstil.",
          },
        ],
      },
      {
        title: "Vertiefung",
        calloutTitle: "Weiterdenken statt im Schuld-Spiel stecken bleiben",
        calloutText:
          "Wie Sie aus dem Schuld-Spiel aussteigen, zeigt die Infografik «Raus aus dem Schuld-Spiel» (nach Fruzzetti).",
      },
      {
        title: "Merksatz",
        calloutTitle: "Was Sie sich merken dürfen",
        calloutText:
          "Sie haben die Erkrankung nicht verursacht. Sie können sie nicht heilen. Aber Sie können einen Unterschied machen – wenn Sie sich selbst dabei nicht verlieren. (Angelehnt an die «3 C's» der Angehörigenarbeit.)",
      },
    ],
    sourceLine:
      "Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] Fruzzetti, Hoffman & Buteau, Family Connections (NEABPD, 2005). [3] Gunderson et al., Nature Reviews Disease Primers (2018).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("radikale-akzeptanz", {
    kicker: "Textversion",
    summary:
      "Radikale Akzeptanz bedeutet nicht Aufgeben, sondern die Realität anzuerkennen und Energie für das Beeinflussbare zurückzugewinnen.",
    intro: [
      "Diese Seite überträgt das Handout «Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln» in eine lesbare Web-Version. Sie richtet sich an Angehörige, die sich im inneren Kampf gegen belastende Realität erschöpfen.",
      "Das Original arbeitet mit einem klaren Gegensatz: Was radikale Akzeptanz nicht ist, was sie ist, wie Sie sie in vier Schritten üben und worauf Sie Ihre Energie stattdessen richten können.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Es ist, wie es ist – und trotzdem können Sie handeln. Radikale Akzeptanz gibt Ihnen Ihre Energie zurück.",
      },
      {
        title: "Was Radikale Akzeptanz nicht ist",
        intro:
          "Die linke Spalte des Originals grenzt bewusst Missverständnisse ab. Akzeptanz bedeutet nicht, Belastendes schönzureden oder sich selbst aufzugeben.",
        cards: [
          {
            title: "Nicht Aufgeben",
            text: "Radikale Akzeptanz ist kein Rückzug aus dem Leben.",
          },
          {
            title: "Nicht Gutheissen",
            text: "Sie müssen schwierige Realität nicht gut finden, um sie anzuerkennen.",
          },
          {
            title: "Nicht Passivität",
            text: "Akzeptanz ersetzt Handeln nicht, sondern macht gezielteres Handeln wieder möglich.",
          },
          {
            title: "Nicht Resignation",
            text: "Es geht nicht darum, hoffnungslos zu werden, sondern inneren Widerstand zu lösen.",
          },
        ],
      },
      {
        title: "Was Radikale Akzeptanz ist",
        intro:
          "Die rechte Spalte fasst zusammen, worauf die Haltung zielt: Realität anerkennen, Kräfte bündeln und das Beeinflussbare wieder sehen.",
        cards: [
          {
            title: "Anerkennen, was nicht änderbar ist",
            text: "Sie benennen die Realität, statt gegen sie anzukämpfen.",
          },
          {
            title: "Energie sparen für Beeinflussbares",
            text: "Ihre Kraft bleibt nicht im inneren Widerstand stecken.",
          },
          {
            title: "Inneren Frieden finden",
            text: "Akzeptanz kann Anspannung senken und wieder mehr Boden unter die Füsse bringen.",
          },
          {
            title: "Loslassen von «Es sollte anders sein»",
            text: "Sie müssen nicht ständig gegen das kämpfen, was gerade faktisch da ist.",
          },
        ],
      },
      {
        title: "4-Schritte-Übung",
        cards: [
          {
            title: "1. Benennen",
            text: "Was ist die Realität?",
          },
          {
            title: "2. Spüren",
            text: "Was löst das in mir aus?",
          },
          {
            title: "3. Loslassen",
            text: "Ich höre auf zu kämpfen.",
          },
          {
            title: "4. Fokus",
            text: "Was kann ich beeinflussen?",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die 4 Schritte regelmässig in Ihrem Alltag. Starten Sie mit kleinen Situationen.",
          "Wiederholen Sie das Mantra «Es ist, wie es ist», wenn Sie sich gestresst fühlen.",
          "Richten Sie Ihre Energie bewusst auf Aufgaben, die Sie kontrollieren können, und lassen Sie den Rest los.",
        ],
      },
    ],
    sourceLine: "Quelle: Linehan (1993), DBT Skills Training.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("wenn-worte-treffen", {
    kicker: "Textversion",
    summary:
      "Schuldzuweisungen treffen oft hart, sagen aber meist mehr über Schmerz, Angst oder Hilflosigkeit als über Ihren Wert. Die Web-Version zeigt fünf häufige Sätze und ruhigere Antworten darauf.",
    intro: [
      "Diese Seite überträgt das Handout «Wenn Worte treffen – 5 häufige Schuldzuweisungen» in eine lesbare Web-Version. Es richtet sich an Angehörige, die in belasteten Gesprächen mit harten Vorwürfen oder entwertenden Sätzen konfrontiert werden.",
      "Die Struktur des Originals bleibt erhalten: eine entlastende Grundhaltung, fünf typische Schuldzuweisungen mit möglicher Einordnung und Antwort sowie ein abschliessender Merksatz, der Mitgefühl und Selbstschutz zusammenhält.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Schuldzuweisungen sind keine Tatsachen. Sie sind Ausdruck von Schmerz, der keinen anderen Weg findet. Das zu wissen schützt Sie – ohne den Schmerz des anderen zu entwerten.",
      },
      {
        title: "5 häufige Schuldzuweisungen – und was dahintersteckt",
        cards: [
          {
            title: "«Du bist schuld, dass es mir so schlecht geht.»",
            text: "Dahinter stehen oft Überforderung und Hilflosigkeit. Mögliche Antwort: «Ich sehe, dass es dir schlecht geht. Ich bin nicht die Ursache – aber ich bin da.»",
          },
          {
            title: "«Wenn du gehst, bringe ich mich um.»",
            text: "Dahinter stehen oft Verlustangst und Verzweiflung. Mögliche Antwort: «Ich höre, wie verzweifelt du bist. Ich gehe nicht weg – und ich rufe jetzt Hilfe.» Das Handout markiert hier zusätzlich: Fachperson informieren.",
          },
          {
            title: "«Du verstehst mich sowieso nicht.»",
            text: "Dahinter stehen oft Einsamkeit und Enttäuschung. Mögliche Antwort: «Vielleicht verstehe ich nicht alles. Aber ich versuche es. Erzähl mir mehr.»",
          },
          {
            title: "«Du bist genau wie alle anderen.»",
            text: "Dahinter stehen oft Angst vor Ablehnung und Spaltung. Mögliche Antwort: «Das tut mir weh. Ich bin hier, weil du mir wichtig bist – auch wenn es gerade schwierig ist.»",
          },
          {
            title: "«Ohne dich wäre alles besser.»",
            text: "Dahinter stehen oft Scham und nach aussen gerichteter Selbsthass. Mögliche Antwort: «Das ist ein harter Satz. Ich bleibe trotzdem. Aber ich brauche auch Respekt.»",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Mitfühlen und sich gleichzeitig schützen",
        calloutText:
          "Der Satz sagt etwas über den Schmerz – nicht über Sie. Sie dürfen mitfühlen und sich gleichzeitig schützen.",
      },
    ],
    sourceLine:
      "Quellen: [1] Gunderson & Berkowitz, BPD Family Guidelines (NEABPD). [2] APA, DSM-5. [3] Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
  }),
  createHandoutTextVersion("dear", {
    kicker: "Textversion",
    summary:
      "DEAR hilft, Wünsche klar und ohne Vorwürfe zu formulieren. Die vier Schritte geben Gesprächen Struktur und senken das Eskalationsrisiko.",
    intro: [
      "Diese Seite überträgt das Handout «Die DEAR-Technik – Grenzen setzen ohne Vorwürfe» in eine lesbare Web-Version. Es richtet sich an Angehörige, die eigene Wünsche und Grenzen klarer ansprechen möchten.",
      "Das Original verbindet die vier Schritte von DEAR mit kurzen Beispielen, einer Farblegende und drei alltagsnahen Übungshinweisen. Diese Struktur bleibt in der Web-Version erhalten.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "DEAR hilft Ihnen, Wünsche klar zu formulieren – ohne Vorwürfe, ohne Eskalation.",
      },
      {
        title: "Die 4 Schritte",
        intro:
          "Für die Web-Version ist die Abfolge bewusst nach dem Akronym DEAR sortiert. Jeder Schritt kombiniert eine Funktion mit einem kurzen Beispielsatz.",
        cards: [
          {
            title: "D = Describe (Beschreiben)",
            text: "Beschreiben Sie die Situation objektiv, ohne Bewertung. Beispiel: «Mir ist aufgefallen, dass du in den letzten Tagen oft spät nach Hause kommst.»",
          },
          {
            title: "E = Express (Äussern)",
            text: "Drücken Sie Ihre Gefühle aus. Ich-Botschaft. Beispiel: «Das macht mir Sorgen, weil ich mich dann allein fühle.»",
          },
          {
            title: "A = Assert (Behaupten)",
            text: "Sagen Sie klar, was Sie sich wünschen. Beispiel: «Ich wünsche mir, dass wir abends öfter zusammen essen.»",
          },
          {
            title: "R = Reinforce (Verstärken)",
            text: "Zeigen Sie den positiven Effekt auf. Beispiel: «Das würde mir helfen, mich verbundener zu fühlen.»",
          },
        ],
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Sand",
            text: "Beschreiben",
          },
          {
            title: "Sage",
            text: "Äussern",
          },
          {
            title: "Terracotta",
            text: "Behaupten",
          },
          {
            title: "Slate",
            text: "Verstärken",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Schreiben Sie einen DEAR-Satz für eine aktuelle Situation auf.",
          "Üben Sie den Satz laut, bevor Sie ihn im Gespräch einsetzen.",
          "Beginnen Sie mit kleinen Themen, bevor Sie grosse ansprechen.",
        ],
      },
    ],
    sourceLine: "Quelle: Linehan (1993), DBT Skills Training, DEAR MAN.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("grenzen-spickzettel", {
    kicker: "Textversion",
    summary:
      "Der Spickzettel bündelt konkrete Satzbausteine für klare Grenzen, Spiegeln ohne Aufsaugen und eine Exit-Strategie mit Liebe, Grenze und Konsequenz.",
    intro: [
      "Diese Seite überträgt den «Spickzettel Grenzen» in eine lesbare und kopierbare Web-Version. Er ist dafür gedacht, vor schwierigen Gesprächen kurz die wichtigsten Satzmuster durchzugehen.",
      "Die Struktur folgt den vier Bereichen des Originals: DEAR-Technik, Beispielsätze bei Grenzüberschreitungen, Spiegeln statt Aufsaugen und die L.M.K.-Exit-Strategie.",
    ],
    sections: [
      {
        title: "Wann anwenden?",
        calloutTitle: "Einsatz des Spickzettels",
        calloutText:
          "Wenn Sie eine Grenze setzen möchten, ohne die Beziehung zu gefährden. Ideal zum Üben vor schwierigen Gesprächen.",
      },
      {
        title: "Bereich 1: DEAR-Technik",
        cards: [
          {
            title: "D – Beschreiben",
            text: "Was ist passiert? Fakten. Ich beschreibe, was passiert ist...",
          },
          {
            title: "E – Äussern",
            text: "Was fühle ich? Ich-Aussage. Ich fühle mich dabei...",
          },
          {
            title: "A – Behaupten",
            text: "Was brauche ich? Klar sagen. Ich wünsche mir...",
          },
          {
            title: "R – Verstärken",
            text: "Was ist der Gewinn? Positiv. Das würde mir helfen, weil...",
          },
        ],
      },
      {
        title: "Bereich 2: Bei Grenzüberschreitungen",
        bullets: [
          "Ich verstehe, dass du aufgebracht bist. Ich bin trotzdem nicht bereit, mich anschreien zu lassen.",
          "Wenn das so weitergeht, werde ich den Raum verlassen.",
          "Ich liebe dich UND ich brauche jetzt eine Pause.",
        ],
      },
      {
        title: "Bereich 3: Spiegeln statt Aufsaugen",
        bullets: [
          "Ich sehe, dass du leidest.",
          "Das klingt wirklich schwer für dich.",
          "Ich bin für dich da – aber ich kann das Problem nicht für dich lösen.",
        ],
      },
      {
        title: "Bereich 4: L.M.K. (Lebe Mit Konsequenzen) – Exit-Strategie",
        cards: [
          {
            title: "L = Liebe zeigen",
            text: "Du bist mir wichtig...",
          },
          {
            title: "M = Meine Grenze",
            text: "Ich brauche...",
          },
          {
            title: "K = Konsequenz",
            text: "Wenn nicht, dann...",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Linehan (1993), DBT.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];

const handoutTextVersionsById = new Map(
  handoutTextVersions.map(version => [version.id, version])
);
const handoutTextVersionsBySource = new Map(
  handoutTextVersions.map(version => [version.pdfSourceUrl, version])
);

export function getHandoutTextVersion(id: string | undefined) {
  if (!id) {
    return null;
  }

  return handoutTextVersionsById.get(id) ?? null;
}

export function getHandoutTextVersionBySource(sourceUrl: string | undefined) {
  if (!sourceUrl) {
    return null;
  }

  return handoutTextVersionsBySource.get(sourceUrl) ?? null;
}

export function getHandoutTextVersionHrefBySource(
  sourceUrl: string | undefined
) {
  return getHandoutTextVersionBySource(sourceUrl)?.path ?? null;
}
