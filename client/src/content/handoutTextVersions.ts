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
