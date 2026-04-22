import { materials, type MaterialCategory } from "./materialien";
import { genesungItems } from "./genesung";
import { grenzenItems } from "./grenzen";
import { kommItems } from "./kommunizieren";
import { selbstfuersorgeInfografiken } from "./selbstfuersorge";
import type { HandoutTextVersion } from "./handoutTextVersionTypes";
import { unterstuetzenItems } from "./unterstuetzen";
import { verstehenInfografiken } from "./verstehen";

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
  if (material) {
    const pdfSourceUrl = material.pdfUrl ?? material.downloadUrl;
    if (!pdfSourceUrl) {
      throw new Error(`Material item is missing a PDF source: ${id}`);
    }

    return {
      title: material.title,
      description: material.description,
      category: material.category,
      kind: material.kind,
      previewImageUrl: material.url,
      topic: TOPIC_META[material.category],
      pdfSourceUrl,
    };
  }

  const verstehenMaterial = verstehenInfografiken.find(item => item.id === id);
  if (verstehenMaterial) {
    return {
      title: verstehenMaterial.title,
      description: verstehenMaterial.description,
      category: "verstehen" as const,
      kind: "Infografik" as const,
      previewImageUrl: verstehenMaterial.webpUrl,
      topic: TOPIC_META.verstehen,
      pdfSourceUrl: verstehenMaterial.pdfUrl,
    };
  }

  const unterstuetzenMaterial = unterstuetzenItems.find(item => item.id === id);
  if (unterstuetzenMaterial) {
    return {
      title: unterstuetzenMaterial.title,
      description: unterstuetzenMaterial.title,
      category: "unterstuetzen" as const,
      kind: "Infografik" as const,
      previewImageUrl: unterstuetzenMaterial.url,
      topic: TOPIC_META.unterstuetzen,
      pdfSourceUrl: unterstuetzenMaterial.pdfUrl,
    };
  }

  const kommunizierenMaterial = kommItems.find(item => item.id === id);
  if (kommunizierenMaterial) {
    return {
      title: kommunizierenMaterial.title,
      description: kommunizierenMaterial.description,
      category: "kommunizieren" as const,
      kind: "Infografik" as const,
      previewImageUrl: kommunizierenMaterial.url,
      topic: TOPIC_META.kommunizieren,
      pdfSourceUrl: kommunizierenMaterial.pdfUrl,
    };
  }

  const grenzenMaterial = grenzenItems.find(item => item.id === id);
  if (grenzenMaterial) {
    return {
      title: grenzenMaterial.title,
      description: grenzenMaterial.description,
      category: "grenzen" as const,
      kind: "Infografik" as const,
      previewImageUrl: grenzenMaterial.url,
      topic: TOPIC_META.grenzen,
      pdfSourceUrl: grenzenMaterial.pdfUrl,
    };
  }

  const selbstfuersorgeMaterial = selbstfuersorgeInfografiken.find(
    item => item.id === id
  );
  if (selbstfuersorgeMaterial) {
    return {
      title: selbstfuersorgeMaterial.title,
      description: selbstfuersorgeMaterial.desc,
      category: "selbstfuersorge" as const,
      kind: "Infografik" as const,
      previewImageUrl: selbstfuersorgeMaterial.webp,
      topic: TOPIC_META.selbstfuersorge,
      pdfSourceUrl: selbstfuersorgeMaterial.pdf,
    };
  }

  const genesungMaterial = genesungItems.find(item => item.id === id);
  if (genesungMaterial) {
    return {
      title: genesungMaterial.title,
      description: genesungMaterial.desc,
      category: "genesung" as const,
      kind: "Infografik" as const,
      previewImageUrl: genesungMaterial.img,
      topic: TOPIC_META.genesung,
      pdfSourceUrl: genesungMaterial.pdf,
    };
  }

  throw new Error(`Unknown material item: ${id}`);
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
  const {
    title,
    description,
    category,
    kind,
    previewImageUrl,
    topic,
    pdfSourceUrl,
  } = requireMaterial(id);

  return {
    id,
    path: `/materialien/text/${id}`,
    title,
    description,
    topicLabel: topic.label,
    topicHref: topic.href,
    category,
    kind,
    previewImageUrl,
    pdfSourceUrl,
    ...config,
  };
}

export const handoutTextVersions: HandoutTextVersion[] = [
  createHandoutTextVersion("notfallplan-krise", {
    kicker: "Textversion",
    summary:
      "Konkrete Orientierung für Angehörige bei Suizidgedanken, Selbstverletzung oder akuter seelischer Krise: Gefahr einschätzen, ruhig bleiben, direkt ansprechen und Hilfe einbeziehen.",
    intro: [
      "Diese Seite überträgt den «Notfallplan bei psychischer Krise» in eine lesbare Web-Version. Sie hält die Struktur des PDFs bewusst eng bei, damit die Orientierung auch ohne Vorschau oder Download zugänglich bleibt.",
      "Der Notfallplan richtet sich an Angehörige, wenn Suizidgedanken, Selbstverletzung oder eine akute psychische Krise im Raum stehen. Er ersetzt keine professionelle Beurteilung, soll aber helfen, in einer belastenden Situation klarer zu handeln.",
    ],
    sections: [
      {
        title: "Akute Gefahr? Sofort handeln.",
        intro: "Sofort 144 anrufen, wenn die Person:",
        bullets: [
          "sich gerade verletzt",
          "eine Überdosis eingenommen hat oder eine schwere Intoxikation vermutet wird",
          "bewusstlos ist",
          "einen konkreten Suizidplan äussert oder unmittelbar in Gefahr ist",
        ],
      },
      {
        title: "Wichtige Nummern im Akutfall",
        cards: [
          {
            title: "144 Sanität",
            text: "Akute Lebensgefahr, laufende Suizidhandlung, schwere Selbstverletzung, Bewusstlosigkeit oder schwere Intoxikation.",
          },
          {
            title: "0800 33 66 55 – Ärztefon",
            text: "Dringende medizinische oder psychiatrische Notfall-Triage, 24/7.",
          },
          {
            title: "058 384 20 00 – PUK Zürich Notfall Erwachsene",
            text: "Direkte psychiatrische Notfallstelle, 24/7.",
          },
        ],
      },
      {
        title: "Wichtiger Soforthinweis",
        calloutTitle: "Sicherheit vor Diskussion",
        calloutText:
          "Person möglichst nicht allein lassen. Gefährliche Gegenstände, Medikamente, Alkohol oder andere Mittel wenn möglich entfernen. Bei Unsicherheit lieber einmal zu viel Hilfe holen als einmal zu wenig.",
      },
      {
        title:
          "4 Schritte in der Krise – wenn jemand Suizidgedanken äussert oder sich selbst verletzt",
        cards: [
          {
            title: "1. Ruhe bewahren",
            text: "Ihre Angst ist verständlich. Panik, hektisches Sprechen oder Druck verstärken die Krise oft zusätzlich. Atmen Sie bewusst, sprechen Sie langsam und bleiben Sie so ruhig wie möglich. Ihre Ruhe kann der betroffenen Person vorübergehend Halt geben.",
          },
          {
            title: "2. Ernst nehmen und direkt ansprechen",
            text: "Jede Äusserung über Suizid oder Selbstverletzung sollte ernst genommen werden. Sprechen Sie das Thema offen und klar an – das erhöht das Risiko nicht, sondern kann entlastend sein. Beispiele: «Ich habe gehört, was du gesagt hast. Ich nehme das ernst.» und «Denkst du daran, dir etwas anzutun?»",
          },
          {
            title: "3. Zuhören und Gefühle anerkennen",
            text: "Hören Sie zu, ohne vorschnell zu beruhigen, zu argumentieren oder sofort Lösungen anzubieten. Es geht zuerst darum, die Not wahrzunehmen. Beispiele: «Ich sehe, dass es dir gerade sehr schlecht geht.» und «Du musst das gerade nicht allein aushalten.»",
          },
          {
            title: "4. Professionelle Hilfe einbeziehen",
            text: "Sie müssen diese Situation nicht allein tragen. Ziehen Sie frühzeitig professionelle Hilfe bei. Informieren Sie wenn möglich die behandelnde Fachperson oder nutzen Sie die Notfallnummern. Suizidgedanken und akute Selbstgefährdung sollten nicht als Geheimnis mitgetragen werden.",
          },
        ],
      },
      {
        title: "Das hilft",
        bullets: [
          "ruhig bleiben und dableiben",
          "direkt und klar nachfragen",
          "Gefühle ernst nehmen und anerkennen",
          "Gefährdung einschätzen und Hilfe holen",
          "Fachpersonen oder Notfallstellen einbeziehen",
          "konkrete Sicherheit vor Diskussion stellen",
        ],
      },
      {
        title: "Das schadet eher",
        bullets: [
          "Panik, Vorwürfe oder Druck",
          "bagatellisieren oder ablenken",
          "lange Diskussionen, warum das Leben doch schön sei",
          "argumentieren oder überzeugen wollen",
          "drohen oder bestrafen",
          "die Person trotz akuter Gefahr allein lassen",
          "Suizidgedanken als Geheimnis für sich behalten",
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Leitsatz für die Akutsituation",
        calloutText:
          "«Ich nehme dich ernst. Ich bin da. Und ich hole Hilfe – für dich und für mich.»",
      },
      {
        title: "Nach der akuten Situation",
        intro:
          "Auch wenn sich die Lage zunächst beruhigt hat, ist die Krise oft noch nicht vorbei. Wichtig ist danach:",
        bullets: [
          "behandelnde Fachperson informieren",
          "gemeinsam überlegen, was jetzt Sicherheit gibt",
          "Unterstützung auch für Angehörige organisieren",
          "nächste Stunden und Nacht nicht dem Zufall überlassen",
          "Warnzeichen und Auslöser festhalten",
        ],
      },
      {
        title: "Selbstfürsorge für Angehörige",
        intro:
          "Auch Sie brauchen Unterstützung. Krisen belasten Angehörige stark – das ist normal und kein Zeichen von Schwäche.",
        bullets: [
          "eigene Belastungsgrenze wahrnehmen",
          "Gespräch mit eigener Fachperson suchen",
          "nicht alles allein tragen müssen",
          "Fachstelle Angehörigenarbeit PUK kontaktieren",
          "Dargebotene Hand 143 – auch für Angehörige",
          "eigene Gefühle (Angst, Wut, Erschöpfung) zulassen",
        ],
      },
      {
        title: "Notfallnummern – Kurzreferenz",
        cards: [
          {
            title: "144 – Sanität",
            text: "Akute Lebensgefahr.",
          },
          {
            title: "0800 33 66 55 – Ärztefon",
            text: "Triage 24/7.",
          },
          {
            title: "058 384 20 00 – PUK Notfall Erwachsene",
            text: "Psychiatrischer Notfall, 24/7.",
          },
          {
            title: "143 – Dargebotene Hand",
            text: "Anonym, 24/7.",
          },
          {
            title: "117 – Polizei",
            text: "Bedrohung oder Gewalt.",
          },
          {
            title: "058 384 38 00 – Fachstelle Angehörigenarbeit PUK",
            text: "Unterstützung für Angehörige.",
          },
        ],
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Orientierung, kein Ersatz für Notfallbeurteilung",
        calloutText:
          "Dieser Notfallplan ersetzt keine professionelle Beurteilung und keine psychiatrische Diagnose. Er dient der Orientierung in einer akuten Situation. Bei akuter Lebensgefahr sofort 144 anrufen.",
      },
    ],
    sourceLine:
      "Quellen: Gunderson & Berkowitz, BPD Family Guidelines (NEABPD); Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 10.03.2026.",
  }),
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
  createHandoutTextVersion("im-krisenmodus", {
    kicker: "Textversion",
    summary:
      "In der Krise hilft weniger Logik, dafür mehr Ruhe, Präsenz und Orientierung. Ihre ruhige Haltung kann helfen, von Überforderung zu mehr Sicherheit zurückzufinden.",
    intro: [
      "Diese Seite überträgt die Infografik «Im Krisenmodus – Orientierung geben» in eine lesbare Web-Version. Die Grafik ist bewusst knapp: Krise und beruhigter Zustand werden gegenübergestellt, verbunden durch Ihre Ruhe und Präsenz.",
      "Für Angehörige ist die Kernaussage klar: In akuter Überforderung bringt langes Erklären oft wenig. Wichtiger sind ein ruhiger Ton, Präsenz und das Verschieben schwieriger Diskussionen.",
    ],
    sections: [
      {
        title: "Von Krise zu Beruhigung",
        intro:
          "Die Infografik stellt zwei Zustände gegenüber und markiert den Übergang dazwischen.",
        cards: [
          {
            title: "Krise",
            text: "überwältigt, verängstigt, impulsiv",
          },
          {
            title: "Ihr Beitrag",
            text: "Ihre Ruhe + Präsenz",
          },
          {
            title: "Beruhigt",
            text: "orientiert, verbunden, sicherer",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es im Krisenmodus geht",
        calloutText:
          "In der Krise hilft weniger Logik – mehr Ruhe, Präsenz und Orientierung.",
      },
      {
        title: "Mini-Legende",
        bullets: [
          "Symbol = emotionaler Zustand",
          "Pfeil = Übergang durch Ihr Verhalten",
          "Herz = beruhigter Zustand",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Atmen Sie durch",
            text: "Atmen Sie durch und sprechen Sie leise und langsam.",
          },
          {
            title: "2. Präsenzsatz sagen",
            text: "Sagen Sie einen Präsenzsatz: «Ich bin da. Wir schaffen das.»",
          },
          {
            title: "3. Diskussion verschieben",
            text: "Verschieben Sie Diskussionen: «Wir reden später – jetzt beruhigen wir uns.»",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Psychoedukation, Angehörigenarbeit (DBT-nah).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("drei-saeulen", {
    kicker: "Textversion",
    summary:
      "Präsenz, Stabilität und Grenze sind drei Säulen, die Angehörigen Halt geben und die Beziehung stärken. Hilfreiche Unterstützung braucht alle drei zusammen.",
    intro: [
      "Diese Seite überträgt die Infografik «Drei Säulen hilfreicher Unterstützung» in eine lesbare Web-Version. Das Handout bündelt Angehörigen-Haltung in drei einfache Grundpfeiler.",
      "Die Grafik ist als praktische Orientierung gedacht: zugewandt bleiben, innerlich ruhig bleiben und gleichzeitig den eigenen Schutz nicht verlieren.",
    ],
    sections: [
      {
        title: "Die drei Säulen",
        intro:
          "Die Infografik beschreibt drei Haltungen, die sich ergänzen und zusammen tragfähige Unterstützung ermöglichen.",
        cards: [
          {
            title: "Präsenz – Ich bin da.",
            text: "Gefühl zeigen. Zuverlässig sein.",
          },
          {
            title: "Stabilität – Ich bleibe ruhig.",
            text: "Klare Haltung. Nicht mitreissen lassen.",
          },
          {
            title: "Grenze – Ich schütze mich.",
            text: "Eigene Bedürfnisse. Nein sagen können.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei den drei Säulen geht",
        calloutText:
          "Präsenz, Stabilität und Grenze – drei Säulen, die Angehörigen Halt geben und die Beziehung stärken.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Wählen",
            text: "Wählen Sie eine Säule für diese Woche.",
          },
          {
            title: "2. Üben",
            text: "Üben Sie in kleinen Situationen.",
          },
          {
            title: "3. Reflektieren",
            text: "Reflektieren Sie abends: Was hat geholfen?",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Gunderson (2011).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("konsistenz-prinzip", {
    kicker: "Textversion",
    summary:
      "Wenn Angehörige ähnlich reagieren und gemeinsame Grenzen einhalten, entstehen mehr Sicherheit, Vertrauen und weniger Eskalationen.",
    intro: [
      "Diese Seite überträgt die Infografik «Konsistenz-Prinzip – als Team wird es leichter» in eine lesbare Web-Version. Das Handout stellt einen hilfreichen und einen schwierigen Beziehungskreislauf gegenüber.",
      "Die Grundidee ist einfach: Gleiche Grenzen führen zu mehr Sicherheit. Widersprüchliche Reaktionen machen es leichter, Grenzen gegeneinander auszuspielen, und erhöhen Konflikte.",
    ],
    sections: [
      {
        title: "Zwei Kreisläufe im Vergleich",
        intro:
          "Die Infografik zeigt links einen hilfreichen Kreislauf und rechts einen schwierigen Kreislauf.",
        cards: [
          {
            title: "Konsistenz",
            text: "Vertrauen, weniger Ausspielen und ein hilfreicher Beziehungskreislauf.",
          },
          {
            title: "Gemeinsame Grenze",
            text: "Gleiche Grenzen – weniger Streit über die Grenzen.",
          },
          {
            title: "Inkonsistenz",
            text: "Unsicherheit, mehr Konflikte, Misstrauen und ein schwieriger Beziehungskreislauf.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es beim Konsistenz-Prinzip geht",
        calloutText:
          "Wenn alle ähnlich reagieren, entsteht Sicherheit – und Eskalationen werden seltener.",
      },
      {
        title: "Mini-Legende",
        bullets: [
          "Kreis = verstärkender Kreislauf",
          "Grün = hilfreich / Rot = schwierig",
          "Pfeile = was sich gegenseitig beeinflusst",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Kurze Absprachen",
            text: "Machen Sie kurze Absprachen: wer sagt was, wann Pause ist und welche Grenze gemeinsam gilt.",
          },
          {
            title: "2. Gemeinsam dranbleiben",
            text: "Halten Sie 1–2 gemeinsame Grenzen gleich ein.",
          },
          {
            title: "3. Unterschiede privat besprechen",
            text: "Besprechen Sie Unterschiede privat – nicht im Streitmoment.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Familienleitlinien/Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beziehungs-achtsamkeit", {
    kicker: "Textversion",
    summary:
      "Innehalten, wahrnehmen, nicht bewerten und bewusst handeln helfen Angehörigen, aus dem Autopiloten auszusteigen und klarer zu reagieren.",
    intro: [
      "Diese Seite überträgt die Infografik «Beziehungs-Achtsamkeit – 4 Schritte im Alltag» in eine lesbare Web-Version. Das Handout übersetzt Achtsamkeit in vier konkrete Schritte für Beziehungssituationen.",
      "Die Struktur ist bewusst alltagsnah: erst stoppen, dann wahrnehmen, nicht vorschnell bewerten und am Schluss bewusst einen nächsten Schritt wählen.",
    ],
    sections: [
      {
        title: "4 Schritte im Alltag",
        intro:
          "Die Grafik beschreibt eine Reihenfolge, die helfen soll, impulsive Reaktionen zu unterbrechen.",
        cards: [
          {
            title: "Innehalten",
            text: "Moment mal – Stopp.",
          },
          {
            title: "Wahrnehmen",
            text: "Was passiert gerade – in mir und im Gegenüber?",
          },
          {
            title: "Nicht bewerten",
            text: "Es ist, wie es ist (noch keine Lösung).",
          },
          {
            title: "Bewusst handeln",
            text: "Ich wähle: Satz / Grenze / Pause / Hilfe.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es bei Beziehungs-Achtsamkeit geht",
        calloutText:
          "Innehalten – wahrnehmen – nicht bewerten – bewusst handeln.",
      },
      {
        title: "Mini-Legende",
        bullets: [
          "Pfeile = Reihenfolge",
          "Jeder Schritt = bewusste Entscheidung",
          "Ziel = weniger Autopilot, mehr Klarheit",
        ],
      },
      {
        title: "Action Box",
        cards: [
          {
            title: "1. Täglich üben",
            text: "Üben Sie Schritt 1–2 täglich in kleinen Situationen.",
          },
          {
            title: "2. Als Anti-Streit-Regel nutzen",
            text: "Nutzen Sie Schritt 3 als Anti-Streit-Regel: erst später bewerten.",
          },
          {
            title: "3. Konkret entscheiden",
            text: "Entscheiden Sie Schritt 4 konkret: ein Satz, eine Grenze, ein nächster Schritt.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Achtsamkeitsbasierte Angehörigenarbeit, nach DBT (Linehan, 1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("6-leitlinien", {
    kicker: "Textversion",
    summary:
      "Sechs alltagsnahe Leitlinien helfen Angehörigen, ruhig, klar und gemeinsam zu unterstützen, ohne vorschnelle Erwartungen oder unnötige Eskalationen.",
    intro: [
      "Diese Seite überträgt das Handout «6 Leitlinien für Angehörige – So können Sie unterstützen» in eine lesbare Web-Version. Die Vorlage bündelt evidenzbasierte Empfehlungen nach Gunderson in sechs konkrete Alltagshinweise.",
      "Die Aussagen bleiben bewusst praktisch: Erwartungen realistisch halten, Sicherheit fördern, zuhören, Selbstverletzung ernst nehmen, als Familie gemeinsam handeln und Grenzen durchhaltbar setzen.",
    ],
    sections: [
      {
        title: "Die 6 Leitlinien",
        intro:
          "Die Grafik zeigt sechs konkrete Empfehlungen, die Angehörige im Alltag Schritt für Schritt umsetzen können.",
        cards: [
          {
            title: "1. Veränderung braucht Zeit",
            text: "Senken Sie Ihre Erwartungen an schnelle Fortschritte.",
          },
          {
            title: "2. Ruhige Umgebung schaffen",
            text: "Routinen und Vorhersehbarkeit geben Sicherheit.",
          },
          {
            title: "3. Zuhören statt verteidigen",
            text: "Hören Sie zu, ohne sich zu verteidigen – auch wenn Vorwürfe unfair erscheinen.",
          },
          {
            title: "4. Selbstverletzung ernst nehmen",
            text: "Nicht ignorieren, nicht dramatisieren, Hilfe anbieten.",
          },
          {
            title: "5. Gemeinsam handeln",
            text: "Handeln Sie als Familie gemeinsam – gleiche Regeln, weniger Konflikte.",
          },
          {
            title: "6. Klare Grenzen setzen",
            text: "Setzen Sie klare Grenzen – aber nur solche, die Sie auch durchhalten können.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es bei den Leitlinien geht",
        calloutText:
          "Nicht alles auf einmal: Wählen Sie eine Leitlinie pro Woche.",
      },
      {
        title: "Mini-Legende",
        bullets: [
          "Jede Kachel = eine konkrete Empfehlung",
          "Farben = Themenbereiche",
          "Haken = zum Abhaken",
        ],
      },
      {
        title: "Action",
        cards: [
          {
            title: "1. Leitlinie wählen",
            text: "Wählen Sie eine Leitlinie für diese Woche.",
          },
          {
            title: "2. Gemeinsam besprechen",
            text: "Besprechen Sie sie mit Ihrer Familie oder Gruppe.",
          },
          {
            title: "3. Reflektieren",
            text: "Reflektieren Sie: Was hat sich verändert?",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Gunderson et al., Family Guidelines for BPD.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-alltags-tipps", {
    kicker: "Textversion",
    summary:
      "Kleine, konkrete Handlungen im Alltag helfen oft mehr als grosse Reden: mitüben, Fortschritte würdigen, verlässlich bleiben und gemeinsam Lösungen entwickeln.",
    intro: [
      "Diese Seite überträgt das Handout «Was Sie konkret tun können – 4 Alltags-Tipps» in eine lesbare Web-Version. Die Vorlage fokussiert bewusst auf wenige, direkt umsetzbare Unterstützungsformen.",
      "Das Handout bleibt praktisch: Sie müssen nicht alles übernehmen. Oft reicht es, verlässlich präsent zu sein, kleine Fortschritte sichtbar zu machen und hilfreiche Fragen zu stellen.",
    ],
    sections: [
      {
        title: "4 Alltags-Tipps",
        intro:
          "Die Grafik bündelt vier konkrete Handlungsfelder für den Alltag mit einer nahestehenden Person.",
        cards: [
          {
            title: "Übungspartner sein",
            text: "Helfen Sie beim Üben neuer Skills. Unterstützen Sie aktiv.",
          },
          {
            title: "Fortschritte anerkennen",
            text: "Auch kleine Schritte würdigen. Positives benennen.",
          },
          {
            title: "Vorhersehbar sein",
            text: "Klare Routinen und Absprachen. Verlässlichkeit zeigen.",
          },
          {
            title: "Gemeinsam Probleme lösen",
            text: "Fragen statt Lösungen vorgeben. Unterstützen statt übernehmen.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es im Alltag geht",
        calloutText:
          "Kleine Handlungen im Alltag machen den grössten Unterschied.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Einen Tipp wählen",
            text: "Wählen Sie einen Tipp für diese Woche.",
          },
          {
            title: "2. In Ruhe üben",
            text: "Üben Sie in ruhigen Momenten.",
          },
          {
            title: "3. Hilfreich fragen",
            text: "Fragen Sie: Was wäre jetzt hilfreich?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: DBT-handlungsbasiert; Fruzzetti (2006), Family Psychoeducation.",
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
  createHandoutTextVersion("4-phasen", {
    kicker: "Textversion",
    summary:
      "Freundlichkeit, Verschlechterung, Explosion und Schweigen können sich als wiederkehrender Zyklus verstärken. Entscheidend ist, das Muster früh zu erkennen und in Phase 2 anders zu reagieren.",
    intro: [
      "Diese Seite überträgt die Infografik «Der 4-Phasen-Zyklus» in eine lesbare Web-Version. Sie zeigt ein wiederkehrendes Muster, das in belasteten Beziehungen immer wieder auftreten kann.",
      "Die Grafik versteht den Zyklus nicht als fixes Schicksal, sondern als Muster, das erkannt und unterbrochen werden kann. Genau dort liegt der entlastende Kern für Angehörige.",
    ],
    sections: [
      {
        title: "Die 4 Phasen",
        intro:
          "Die Infografik beschreibt vier Zustände, die sich gegenseitig verstärken und im Kreis wiederholen können.",
        cards: [
          {
            title: "Phase 1: Freundlichkeit",
            text: "Alles scheint gut. Nähe, Harmonie.",
          },
          {
            title: "Phase 2: Verschlechterung",
            text: "Spannung steigt. Reizbarkeit, Rückzug, Misstrauen.",
          },
          {
            title: "Phase 3: Explosion",
            text: "Krise. Vorwürfe, Drohungen, Kontrollverlust.",
          },
          {
            title: "Phase 4: Schweigen",
            text: "Rückzug. Schuldgefühle. Erschöpfung.",
          },
        ],
      },
      {
        title: "Verstärkende Schleife",
        calloutTitle: "Warum sich das Muster so fest anfühlen kann",
        calloutText:
          "Die Grafik zeigt den Zyklus als verstärkende Schleife: Jede Phase bereitet oft schon den Boden für die nächste, wenn niemand das Muster bewusst unterbricht.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim 4-Phasen-Zyklus geht",
        calloutText:
          "Der Zyklus wiederholt sich – bis jemand das Muster durchbricht. Das können Sie sein.",
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Sage = Freundlichkeit",
          "Sand = Verschlechterung",
          "Terracotta = Explosion",
          "Slate = Schweigen",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "Erkennen",
            text: "In welcher Phase sind wir gerade?",
          },
          {
            title: "Verstehen",
            text: "Der Zyklus ist ein Muster, kein Schicksal.",
          },
          {
            title: "Verändern",
            text: "Reagieren Sie in Phase 2 anders als früher.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("gehirn", {
    kicker: "Textversion",
    summary:
      "Bei emotionaler Überflutung übernimmt das Alarm-System. Das Denken kommt erst zurück, wenn der Körper wieder etwas ruhiger ist.",
    intro: [
      "Diese Seite überträgt die Infografik «Das Gehirn verstehen» in eine lesbare Web-Version. Sie erklärt in einfacher Form, was bei emotionaler Überflutung im Gehirn passiert.",
      "Für Angehörige ist die Grafik vor allem als Einordnungshilfe gedacht: Überflutung ist keine Absicht, sondern eine neurobiologische Reaktion. Deshalb hilft zuerst Beruhigung und erst danach Klärung.",
    ],
    sections: [
      {
        title: "Die drei Bereiche der Grafik",
        intro:
          "Die Infografik stellt drei Hirn-Bereiche mit ihren Funktionen und ihrer Rolle unter Stress gegenüber.",
        cards: [
          {
            title: "Amygdala – Alarm-Zentrale",
            text: "Reagiert auf Bedrohung. Löst Kampf- oder Flucht aus. Bei BPS: überaktiv, reagiert stärker und schneller.",
          },
          {
            title: "Hippocampus – Erinnerungsspeicher",
            text: "Ordnet Erlebnisse zeitlich ein. Unterscheidet Vergangenheit von Gegenwart. Bei Stress: Funktion eingeschränkt.",
          },
          {
            title: "Präfrontaler Kortex – Denk-Zentrale",
            text: "Planung, Impulskontrolle, Reflexion. Bei Überflutung: vorübergehend offline.",
          },
        ],
      },
      {
        title: "Was dann oft passiert",
        cards: [
          {
            title: "Überflutet",
            text: "Die Alarmreaktion übernimmt, und der innere Spielraum wird klein.",
          },
          {
            title: "Beruhigung fehlt",
            text: "Ohne Beruhigung bleibt das System in Alarm oder Übergang hängen.",
          },
          {
            title: "Beruhigung → Denken kommt zurück",
            text: "Wenn der Körper ruhiger wird, wird Denken wieder zugänglicher.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Überflutung geht",
        calloutText:
          "Emotionale Überflutung ist keine Absicht, sondern eine neurobiologische Reaktion. Das Gehirn braucht Zeit, um wieder klar zu denken.",
      },
      {
        title: "Legende der Grafik",
        bullets: [
          "Terracotta = Alarm",
          "Sand = Übergang",
          "Sage = Beruhigung",
          "Pfeile = Wirkungsrichtung",
        ],
      },
      {
        title: "3 Schritte zur Beruhigung",
        cards: [
          {
            title: "1. Atmen und Wahrnehmen",
            text: "4 Sekunden ein, 6 Sekunden aus. Benennen Sie, was Sie spüren.",
          },
          {
            title: "2. Pausieren und Bewegen",
            text: "Raum wechseln, kurz gehen, Wasser trinken.",
          },
          {
            title: "3. Fokus und Einordnen",
            text: "Erst wenn der Körper ruhig ist, kann das Gespräch weitergehen.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Porges (2011); LeDoux (1996).",
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
  createHandoutTextVersion("sauerstoffmaske", {
    kicker: "Textversion",
    summary:
      "Selbstfürsorge ist keine Selbstsucht. Wer zuerst die eigene Maske aufsetzt, hat mehr Energie, weniger Schuldgefühle und kann verlässlicher unterstützen.",
    intro: [
      "Diese Seite überträgt das Handout «Die Sauerstoffmaske – Warum Selbstfürsorge keine Selbstsucht ist» in eine lesbare Web-Version. Die Bildidee aus dem Flugzeug bleibt erhalten: erst die eigene Maske aufsetzen, dann anderen helfen.",
      "Die Grafik stellt zwei Kreisläufe gegenüber. Links zeigt sie, wie Überforderung und Schuldgefühle entstehen, wenn Angehörige nur noch für andere da sind. Rechts zeigt sie den hilfreicheren Kreislauf, wenn Selbstfürsorge bewusst Platz bekommt.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei der Sauerstoffmaske geht",
        calloutText:
          "Im Flugzeug gilt: Erst die eigene Maske aufsetzen, dann anderen helfen. Für Angehörige gilt dasselbe.",
      },
      {
        title: "Negativer Kreislauf",
        intro:
          "Die linke Seite der Grafik beschreibt einen Kreislauf, in dem Selbstfürsorge ausfällt und die Belastung zunimmt.",
        cards: [
          {
            title: "Nur für andere da sein",
            text: "Der ganze Fokus liegt auf dem Gegenüber, nicht mehr auch auf Ihnen selbst.",
          },
          {
            title: "Eigene Bedürfnisse ignorieren",
            text: "Pausen, Schlaf oder Unterstützung werden aufgeschoben oder weggedrückt.",
          },
          {
            title: "Schuldgefühle",
            text: "Es entsteht das Gefühl, nie genug zu tun und trotzdem nicht zu genügen.",
          },
          {
            title: "Erschöpfung und Gereiztheit",
            text: "Die Belastung steigt, die Kraft sinkt und hilfreiche Unterstützung wird schwerer.",
          },
        ],
      },
      {
        title: "Hilfreicher Kreislauf",
        intro:
          "Die rechte Seite zeigt, was sich verändert, wenn Selbstfürsorge nicht als Egoismus, sondern als Voraussetzung verstanden wird.",
        cards: [
          {
            title: "Eigene Maske zuerst aufsetzen",
            text: "Sie nehmen Ihre Bedürfnisse ernst und sorgen bewusst für Stabilität.",
          },
          {
            title: "Weniger Schuldgefühle",
            text: "Selbstfürsorge entlastet innerlich und macht klarer, was realistisch möglich ist.",
          },
          {
            title: "Energie und Klarheit",
            text: "Mit mehr Kraft und Übersicht reagieren Sie ruhiger und gezielter.",
          },
          {
            title: "Bessere Unterstützung möglich",
            text: "Gerade weil Sie auf sich achten, können Sie verlässlicher für andere da sein.",
          },
        ],
      },
      {
        title: "Legende",
        bullets: [
          "Rot = negativer Kreislauf",
          "Grün = hilfreicher Kreislauf",
          "Wendepunkt = Ihre Entscheidung",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Etwas nur für sich planen",
            text: "Planen Sie eine Aktivität nur für sich.",
          },
          {
            title: "2. Den Bedarf aussprechen",
            text: "Sagen Sie: Ich brauche das, damit ich für dich da sein kann.",
          },
          {
            title: "3. Hilfe annehmen üben",
            text: "Üben Sie, Hilfe anzunehmen.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("stopp-technik", {
    kicker: "Textversion",
    summary:
      "Die STOPP-Technik schafft in etwa 30 Sekunden Abstand zwischen Reiz und Reaktion. Das gibt Körper und Kopf wieder etwas mehr Handlungsspielraum.",
    intro: [
      "Diese Seite überträgt das Handout «Die STOPP-Technik – 5 Schritte aus der Stressspirale» in eine lesbare Web-Version. Das Original fasst die DBT-Technik so zusammen, dass sie im Alltag schnell nutzbar bleibt.",
      "Die fünf Buchstaben bilden eine feste Reihenfolge: stoppen, atmen, orientieren, Perspektive wechseln und dann erst eine konkrete Handlung planen.",
    ],
    sections: [
      {
        title: "Zentraler Satz",
        calloutTitle: "Worum es bei STOPP geht",
        calloutText:
          "Wenn die Emotionen überkochen: STOPP gibt Ihnen 30 Sekunden Abstand zwischen Reiz und Reaktion.",
      },
      {
        title: "Die 5 STOPP-Schritte",
        intro:
          "Die Grafik zeigt die Technik als kurze Folge von fünf Schritten, die Sie in hoher Anspannung abrufen können.",
        cards: [
          {
            title: "S = STOPP",
            text: "Halten Sie inne. Tun Sie nichts.",
          },
          {
            title: "T = TIEF ATMEN",
            text: "Drei tiefe Atemzüge. 4–4–4.",
          },
          {
            title: "O = ORIENTIEREN",
            text: "Was passiert gerade wirklich?",
          },
          {
            title: "P = PERSPEKTIVE",
            text: "Wie sehe ich das in einer Woche?",
          },
          {
            title: "P = PLAN",
            text: "Wählen Sie EINE konkrete Handlung.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Mehrmals üben",
            text: "Üben Sie STOPP dreimal diese Woche.",
          },
          {
            title: "2. Anker-Satz bereitlegen",
            text: "Anker-Satz: Ich habe 30 Sekunden.",
          },
          {
            title: "3. Abends notieren",
            text: "Notieren Sie abends: Wann hätte STOPP geholfen?",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Linehan (1993), DBT Skills Training.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("energie-konto", {
    kicker: "Textversion",
    summary:
      "Ihre Energie ist begrenzt. Wenn Sie im Blick behalten, was auftankt und was Energie kostet, können Sie früher gegensteuern statt erst im Leerlauf zu reagieren.",
    intro: [
      "Diese Seite überträgt das Handout «Ihr Energie-Konto – Was füllt, was leert» in eine lesbare Web-Version. Die Grafik arbeitet mit einer Batterie-Metapher: Energie kann gefüllt, entleert und auch bis in den Burnout-Bereich erschöpft werden.",
      "Die Grundidee ist bewusst praktisch. Statt nur über Belastung nachzudenken, hilft die Gegenüberstellung von Energiegebern und Energiefressern dabei, konkrete Veränderungen im Alltag zu planen.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es beim Energie-Konto geht",
        calloutText:
          "Ihre Energie ist begrenzt. Achten Sie darauf, dass Sie regelmässig auftanken – bevor das Konto leer ist.",
      },
      {
        title: "Was füllt",
        intro:
          "Die linke Spalte nennt typische Energiegeber, die das Konto wieder auffüllen können.",
        cards: [
          {
            title: "Bewegung und Sport",
            text: "Körperliche Aktivität kann spürbar Energie zurückgeben.",
          },
          {
            title: "Soziale Kontakte pflegen",
            text: "Tragender Kontakt kann entlasten und verbinden.",
          },
          {
            title: "Hobbys und Interessen",
            text: "Eigene Interessen erinnern daran, dass Ihr Leben mehr umfasst als Belastung.",
          },
          {
            title: "Natur und Ruhe",
            text: "Rückzug, Stille und Natur können Nervensystem und Gedanken beruhigen.",
          },
          {
            title: "Professionelle Unterstützung",
            text: "Begleitung von aussen kann entlasten und strukturieren.",
          },
          {
            title: "Schlaf und Erholung",
            text: "Regeneration ist kein Luxus, sondern Grundversorgung.",
          },
        ],
      },
      {
        title: "Was leert",
        intro:
          "Die rechte Spalte zeigt typische Belastungen, die das Energie-Konto nach unten ziehen.",
        cards: [
          {
            title: "Krisen begleiten",
            text: "Akute Belastung kostet Kraft, auch wenn Hilfe nötig und sinnvoll ist.",
          },
          {
            title: "Ständige Erreichbarkeit",
            text: "Dauerbereitschaft verhindert echte Erholung.",
          },
          {
            title: "Schuldgefühle und Grübeln",
            text: "Innere Kreise ohne Lösung verbrauchen viel Energie.",
          },
          {
            title: "Konflikte und Vorwürfe",
            text: "Wiederholte Auseinandersetzungen ziehen Kraft und Ruhe ab.",
          },
          {
            title: "Isolation und Rückzug",
            text: "Allein mit allem zu bleiben entlastet selten dauerhaft.",
          },
          {
            title: "Eigene Bedürfnisse ignorieren",
            text: "Wer sich selbst ständig übergeht, leert das Konto weiter.",
          },
        ],
      },
      {
        title: "Legende",
        bullets: [
          "Grüne Pfeile = Energie geben",
          "Rote Pfeile = Energie kosten",
          "Batterie-Icon = aktueller Stand",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Ehrlich prüfen",
            text: "Prüfen Sie ehrlich: Wie voll ist Ihr Konto gerade?",
          },
          {
            title: "2. Auftank-Aktivität planen",
            text: "Planen Sie diese Woche eine konkrete Auftank-Aktivität.",
          },
          {
            title: "3. Einen Energiefresser streichen",
            text: "Streichen Sie eine energiefressende Gewohnheit – nur eine.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Maslach und Leiter (2016), Burnout-Prävention.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("erlaubnis-karte", {
    kicker: "Textversion",
    summary:
      "Die Erlaubnis-Karte bündelt neun Sätze, die Angehörigen oft guttun: eigene Bedürfnisse ernst nehmen, Grenzen setzen und ein eigenes Leben behalten.",
    intro: [
      "Diese Seite überträgt das Handout «Ihre Erlaubnis-Karte – Was Sie sich erlauben dürfen» in eine lesbare Web-Version. Das Original ist bewusst als persönliches Zertifikat aufgebaut: nicht als Pflichtliste, sondern als Erlaubnis zum Ankreuzen.",
      "Der Fokus ist entlastend. Die Grafik erinnert daran, dass Selbstfürsorge, Grenzen und eigene Gefühle nicht gegen die Beziehung stehen, sondern zu gesunder Angehörigenarbeit dazugehören.",
    ],
    sections: [
      {
        title: "Erlaubnis",
        intro:
          "Die Karte nennt neun Dinge, die Sie sich ausdrücklich erlauben dürfen.",
        bullets: [
          "Nein sagen, ohne sich schuldig zu fühlen.",
          "Eigene Bedürfnisse haben und äussern.",
          "Pausen machen, wenn es zu viel wird.",
          "Hilfe annehmen und um Hilfe bitten.",
          "Wütend, traurig oder überfordert sein.",
          "Grenzen setzen, auch wenn es Widerstand gibt.",
          "Sich zurückziehen, ohne Erklärung.",
          "Freude empfinden, auch wenn es dem Angehörigen schlecht geht.",
          "Ihr eigenes Leben leben.",
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Gültigkeit",
        calloutText: "Gültig ab sofort. Unbefristet.",
      },
      {
        title: "Legende",
        bullets: [
          "Checkbox = Erlaubnis zum Ankreuzen",
          "Zertifikat = Ihre persönliche Genehmigung",
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Sichtbar machen",
            text: "Drucken Sie diese Karte aus und hängen Sie sie sichtbar auf.",
          },
          {
            title: "2. Heute ankreuzen",
            text: "Kreuzen Sie an, was Ihnen heute besonders schwer fällt.",
          },
          {
            title: "3. Täglich erinnern",
            text: "Erinnern Sie sich täglich: Diese Erlaubnis gilt.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Selbstfürsorge-Konzept, nach Mason/Kreger (2014).",
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
  createHandoutTextVersion("gespraeche-kippen", {
    kicker: "Textversion",
    summary:
      "Wenn Gespräche kippen, helfen oft nicht mehr Erklärungen, sondern drei kurze Schritte: beruhigen, verbinden, begrenzen.",
    intro: [
      "Diese Seite überträgt das Handout «Wenn Gespräche kippen – Was Sie tun können, bevor es eskaliert» in eine lesbare Web-Version. Es richtet sich an Angehörige, die in angespannten Momenten eine kurze, klare Gesprächsstruktur brauchen.",
      "Die Struktur des Originals bleibt erhalten: drei Schritte, ein kurzer Pausenplan für Kipppunkte, die Kernaussage des Blatts, die Legende und drei alltagsnahe Hinweise.",
    ],
    sections: [
      {
        title: "Die 3 Schritte",
        cards: [
          {
            title: "Schritt 1: Beruhigen",
            text: "Atmen Sie durch. Senken Sie Ihre Stimme. Verlangsamen Sie das Tempo.",
          },
          {
            title: "Schritt 2: Verbinden",
            text: "«Ich sehe, dass es dir gerade nicht gut geht. Ich bin da.» Benennen Sie das Gefühl, nicht das Verhalten.",
          },
          {
            title: "Schritt 3: Begrenzen + Plan",
            text: "«So kann ich nicht weiterreden. Pause 10 Minuten, dann sprechen wir weiter.»",
          },
        ],
      },
      {
        title: "Wenn es kippt",
        bullets: [
          "Pause 10–30 Minuten.",
          "Ich gehe nicht weg, ich mache nur eine Pause.",
          "Wir sprechen um [Uhrzeit] weiter.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz, ruhig und wiederholbar wirkt in Krisen stärker als Argumente.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Beruhigen",
            text: "Tempo und Tonfall senken.",
          },
          {
            title: "Verbinden",
            text: "Gefühl benennen und Kontakt halten.",
          },
          {
            title: "Begrenzen",
            text: "Klare Grenze plus Plan.",
          },
          {
            title: "Wenn es kippt",
            text: "Pause mit Rückkehrangebot.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die 3 Schritte in ruhigen Momenten, damit sie in der Krise abrufbar sind.",
          "Nutzen Sie kurze, klare Sätze. Vermeiden Sie Erklärungen und Rechtfertigungen.",
          "Bieten Sie immer eine Rückkehr an: Wir sprechen um [Uhrzeit] weiter.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Linehan (1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("grenzen-ohne-eskalation", {
    kicker: "Textversion",
    summary:
      "Die 3-Teile-Formel hält Grenzsetzung knapp: Fakt, Ich-Grenze, nächster Schritt. So bleiben Sie klar, ohne in Rechtfertigungen zu geraten.",
    intro: [
      "Diese Seite überträgt das Handout «Grenzen setzen ohne Eskalation – Die 3-Teile-Formel» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Grenzen klar ansprechen wollen, ohne in Streitlogik hineingezogen zu werden.",
      "Das Original kombiniert die Formel mit einem knappen Beispiel, einer Kernaussage, einer kleinen Farblegende und drei kurzen Umsetzungshinweisen.",
    ],
    sections: [
      {
        title: "Die 3-Teile-Formel",
        cards: [
          {
            title: "Fakt",
            text: "Was passiert. Objektiv, ohne Bewertung. Beispiel: «Es ist jetzt das dritte Mal, dass du mich anschreist.»",
          },
          {
            title: "Ich-Grenze",
            text: "Sagen Sie, was Sie brauchen. Ich-Aussage. Beispiel: «So kann ich nicht weiterreden.»",
          },
          {
            title: "Nächster Schritt",
            text: "Bieten Sie einen Plan an. Konkret und machbar. Beispiel: «Pause 10 Minuten, dann sprechen wir weiter.»",
          },
        ],
      },
      {
        title: "Beispielsatz",
        calloutTitle: "Kurzform des Handouts",
        calloutText:
          "Es eskaliert gerade. Ich bleibe ansprechbar, aber nicht im Streit. Pause 10 Min, dann weiter.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Nicht rechtfertigen. Nicht erklären. Nicht streiten. Einfach sagen, was ist.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Sand",
            text: "Fakt.",
          },
          {
            title: "Terracotta",
            text: "Ich-Grenze.",
          },
          {
            title: "Slate",
            text: "Nächster Schritt.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Formulieren Sie Ihre 3 wichtigsten Grenzen vorab schriftlich.",
          "Üben Sie die Formel in ruhigen Momenten laut.",
          "Bleiben Sie bei Ihrer Aussage, auch wenn Gegenwind kommt.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("pause-statt-streit", {
    kicker: "Textversion",
    summary:
      "Nicht jede Anspannung ist noch gesprächsfähig. Das Handout unterscheidet stabil, Warnstufe und Eskalation und zeigt, wann Sie stoppen sollten.",
    intro: [
      "Diese Seite überträgt das Handout «Pause statt Streit – Wann Sie stoppen sollten und wie» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Kipppunkte früher erkennen und rechtzeitig aus eskalierenden Gesprächen aussteigen möchten.",
      "Die Struktur des Originals bleibt erhalten: drei Zustände, die Kernaussage, eine kurze Legende und drei praktische Hinweise für den Alltag.",
    ],
    sections: [
      {
        title: "Stabil",
        bullets: [
          "Gespräch möglich.",
          "Zuhören funktioniert.",
          "Körper entspannt.",
          "Bleiben Sie im Gespräch.",
          "Nutzen Sie klare, kurze Sätze.",
        ],
      },
      {
        title: "Warnstufe",
        bullets: [
          "Stimme wird lauter.",
          "Vorwürfe beginnen.",
          "Körper spannt sich an.",
          "Ankündigen: Ich merke, es wird schwierig. Pause 10 Minuten.",
        ],
      },
      {
        title: "Eskalation",
        bullets: [
          "Schreien, Beschimpfungen.",
          "Kontrolle geht verloren.",
          "Sofort stoppen.",
          "Ich gehe jetzt. Wir sprechen um [Uhrzeit] weiter.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Ich stoppe jetzt – nicht weil ich aufgebe, sondern weil mir diese Beziehung wichtig ist.",
      },
      {
        title: "Zusatzhinweis",
        calloutTitle: "Bei Gefahr",
        calloutText: "Bei Gefahr: Notfallplan aktivieren.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Sage",
            text: "Stabil.",
          },
          {
            title: "Sand",
            text: "Warnstufe.",
          },
          {
            title: "Terracotta",
            text: "Eskalation.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie Ihre persönliche Warnstufe: Woran merken Sie, dass es kippt?",
          "Üben Sie den Stopp-Satz: Ich mache jetzt Pause.",
          "Planen Sie die Rückkehr: Wir sprechen um [Uhrzeit] weiter.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Deeskalation nach DBT, Linehan (1993); Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("zuhoeren-ohne-zustimmen", {
    kicker: "Textversion",
    summary:
      "Validieren ist nicht nachgeben. Sie können Gefühle anerkennen, ohne Schuld zu übernehmen oder der Interpretation zustimmen zu müssen.",
    intro: [
      "Diese Seite überträgt das Handout «Zuhören ohne Zustimmen – Anerkennen ist nicht gleich Recht geben» in eine lesbare Web-Version. Es richtet sich an Angehörige, die empathisch bleiben wollen, ohne dabei ihre eigene Sicht aufzugeben.",
      "Die Struktur folgt dem Original: anerkennen, nicht zustimmen, Grenze plus Plan, dazu Kernaussage, Legende und drei kurze Übungshinweise.",
    ],
    sections: [
      {
        title: "Anerkennen",
        bullets: [
          "Ich sehe, dass du gerade sehr leidest.",
          "Das klingt wirklich belastend für dich.",
          "Ich verstehe, dass du das so empfindest.",
        ],
      },
      {
        title: "Nicht zustimmen",
        bullets: [
          "Du hast recht, ich bin schuld.",
          "Ja, ich hätte anders reagieren sollen.",
          "Okay, dann mache ich es so, wie du willst.",
        ],
      },
      {
        title: "Grenze + Plan",
        calloutTitle: "Kombination aus Respekt und Selbstschutz",
        calloutText:
          "Ich kann zuhören, aber ich muss nicht allem zustimmen. Wenn es zu viel wird: Pause.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Gefühle anerkennen, ohne die Interpretation zu übernehmen. Das ist keine Lüge, sondern Respekt.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Sage",
            text: "Anerkennen (validieren).",
          },
          {
            title: "Grenze",
            text: "Nicht zustimmen.",
          },
          {
            title: "Slate",
            text: "Grenze + Plan.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie Sätze wie: Ich sehe, dass es dir nicht gut geht. Ohne Aber.",
          "Trennen Sie Gefühl und Inhalt: Das Gefühl ist echt, die Interpretation muss nicht stimmen.",
          "Bleiben Sie bei sich: Sie dürfen anderer Meinung sein, ohne das Gefühl abzuwerten.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Fruzzetti (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beispiel-dialog", {
    kicker: "Textversion",
    summary:
      "Ein kurzer Beispiel-Dialog zeigt, wie Verbinden, Kontakt, Grenze, Plan und Rückkehr in einem eskalierenden Gespräch zusammenspielen können.",
    intro: [
      "Diese Seite überträgt das Handout «Beispiel-Dialog – So könnte ein Gespräch aussehen» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Technik-Schritte lieber an einem konkreten Ablauf als an reinen Regeln üben.",
      "Das Original zeigt einen kurzen Dialogverlauf, die Kernaussage, eine Legende und drei Hinweise für das eigene Üben. Diese Struktur bleibt hier erhalten.",
    ],
    sections: [
      {
        title: "Dialogverlauf",
        cards: [
          {
            title: "Vorwurf",
            text: "«Du bist nie für mich da! Du denkst nur an dich!»",
          },
          {
            title: "Verbinden",
            text: "«Ich sehe, dass du gerade sehr aufgebracht bist.»",
          },
          {
            title: "Kontakt",
            text: "«Das klingt wirklich belastend. Ich bin hier.»",
          },
          {
            title: "Grenze",
            text: "«So kann ich nicht weiterreden.»",
          },
          {
            title: "Plan",
            text: "«Pause 10 Minuten. Wir sprechen um 15 Uhr weiter.»",
          },
          {
            title: "Rückkehr",
            text: "«Ich bin wieder da. Wie geht es dir jetzt?»",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz, ruhig, wiederholbar. Nicht erklären, nicht rechtfertigen, nicht streiten.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Terracotta",
            text: "Angehöriger.",
          },
          {
            title: "Sage",
            text: "Sie.",
          },
          {
            title: "Labels",
            text: "Technik-Schritte.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Lesen Sie den Dialog laut vor und üben Sie Ihre Antworten.",
          "Passen Sie die Sätze an Ihre eigene Sprache an.",
          "Erinnern Sie sich: Es geht nicht um Perfektion, sondern um Richtung.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014); Fruzzetti (2006).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
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
  createHandoutTextVersion("spiegeln-statt-aufsaugen", {
    kicker: "Textversion",
    summary:
      "Mitgefühl heisst nicht Übernehmen. Sie können Leid anerkennen, ohne Schmerz, Wut oder Leere des anderen zu Ihren eigenen zu machen.",
    intro: [
      "Diese Seite überträgt das Handout «Spiegeln statt Aufsaugen – Mitfühlen ohne Übernehmen» in eine lesbare Web-Version. Es richtet sich an Angehörige, die empathisch bleiben wollen, ohne sich dabei selbst zu verlieren.",
      "Die Struktur des Originals bleibt erhalten: zuerst die Kernfrage, dann der Unterschied zwischen Aufsaugen und Spiegeln und zum Schluss drei kurze Hinweise für den Alltag.",
    ],
    sections: [
      {
        title: "Kernfrage",
        calloutTitle: "Zentraler Prüfstein",
        calloutText: "Wem gehört dieses Gefühl?",
      },
      {
        title: "Aufsaugen",
        cards: [
          {
            title: "Was passiert?",
            text: "Sie übernehmen den Schmerz und die Wut des anderen.",
          },
          {
            title: "Folge",
            text: "Erschöpfung, Schuldgefühle.",
          },
          {
            title: "Typischer Satz",
            text: "Es ist meine Schuld, dass es dir schlecht geht.",
          },
          {
            title: "Innere Dynamik",
            text: "Ich muss das schwarze Loch füllen.",
          },
        ],
      },
      {
        title: "Spiegeln",
        cards: [
          {
            title: "Was passiert?",
            text: "Sie reflektieren die Gefühle zurück zum Eigentümer.",
          },
          {
            title: "Folge",
            text: "Selbstschutz, Eigenverantwortung.",
          },
          {
            title: "Typischer Satz",
            text: "Ich sehe, dass du leidest. Ich bin für dich da, aber ich kann es nicht für dich fühlen.",
          },
          {
            title: "Innere Haltung",
            text: "Das sind deine Gefühle, nicht meine.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Fragen Sie sich: Ist das mein Gefühl oder seins/ihres?",
          "Sagen Sie: Ich verstehe, dass du leidest (nicht: Ich leide mit dir).",
          "Erinnern Sie sich: Nur der Betroffene kann seine Leere füllen.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-arten-von-grenzen", {
    kicker: "Textversion",
    summary:
      "Grenzen sind nicht nur emotional. Auch Körper, Zeit und materielle Ressourcen dürfen geschützt werden.",
    intro: [
      "Diese Seite überträgt das Handout «Die 4 Arten von Grenzen – Wissen, was Sie schützen» in eine lesbare Web-Version. Es hilft Angehörigen, Grenzverletzungen genauer einzuordnen und den eigenen Schutzbedarf klarer zu benennen.",
      "Das Original arbeitet mit vier Bereichen, kurzen Beispielen und je einem Warnsignal. Diese Struktur bleibt hier bewusst erhalten.",
    ],
    sections: [
      {
        title: "Kernbotschaft",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Grenzen sind keine Mauern, sondern Türen mit Schloss. Sie entscheiden, wann Sie öffnen.",
      },
      {
        title: "Die vier Bereiche",
        cards: [
          {
            title: "Physische Grenzen",
            text: "Schutz Ihres Körpers und Ihrer körperlichen Unversehrtheit. Beispiele: «Ich möchte jetzt nicht umarmt werden.» und «Bitte klopfe an, bevor du mein Zimmer betrittst.» Warnsignal: Wenn jemand Ihren persönlichen Raum ohne Erlaubnis betritt.",
          },
          {
            title: "Emotionale Grenzen",
            text: "Trennung zwischen Ihren Gefühlen und denen anderer. Beispiele: «Ich kann deine Trauer verstehen, aber ich muss sie nicht übernehmen.» und «Deine Wut ist deine Wut, nicht meine Schuld.» Warnsignal: Wenn Sie sich für die Gefühle anderer verantwortlich fühlen.",
          },
          {
            title: "Zeitliche Grenzen",
            text: "Schutz Ihrer Zeit und Energie. Beispiele: «Ich bin heute Abend nicht verfügbar.» und «Ich kann maximal eine Stunde telefonieren.» Warnsignal: Wenn Ihre gesamte Freizeit von einer Person beansprucht wird.",
          },
          {
            title: "Materielle Grenzen",
            text: "Schutz Ihrer Ressourcen und Besitztümer. Beispiele: «Ich kann dir kein Geld leihen.» und «Bitte frage, bevor du meine Sachen benutzt.» Warnsignal: Wenn Sie sich finanziell ausgenutzt fühlen.",
          },
        ],
      },
      {
        title: "Merke",
        calloutTitle: "Abschlusssatz des Handouts",
        calloutText:
          "Alle vier Grenzen sind gleichwertig. Sie haben das Recht, jede davon zu schützen.",
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("grenzen-erkennen", {
    kicker: "Textversion",
    summary:
      "Oft meldet sich eine Grenzverletzung zuerst im Körper. Wer die eigenen Warnsignale kennt, kann früher gegensteuern.",
    intro: [
      "Diese Seite überträgt das Handout «Grenzen erkennen – 5 Warnsignale Ihres Körpers und Ihrer Seele» in eine lesbare Web-Version. Es unterstützt Angehörige dabei, frühe Überlastungszeichen ernster zu nehmen.",
      "Die Struktur folgt dem Original: eine Kernaussage, fünf typische Warnsignale und eine kurze Abschlussfrage zur Selbstbeobachtung.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Ihr Körper weiss oft vor Ihrem Kopf, dass eine Grenze überschritten wurde. Lernen Sie, auf ihn zu hören.",
      },
      {
        title: "Die 5 Warnsignale",
        cards: [
          {
            title: "Der Knoten im Bauch",
            text: "Körperlich: Magenschmerzen, Übelkeit. Emotional: Irgendetwas stimmt hier nicht.",
          },
          {
            title: "Die Enge in der Brust",
            text: "Druck, flache Atmung, Herzrasen. Eingeengt. Mehr Raum nötig.",
          },
          {
            title: "Die Anspannung im Nacken",
            text: "Verspannte Schultern, Kopfschmerzen. Zu viel Last.",
          },
          {
            title: "Die Erschöpfung ohne Grund",
            text: "Ständige Müdigkeit. Ich bin leer.",
          },
          {
            title: "Der Impuls zu fliehen",
            text: "Unruhe, Zappeligkeit. Ich will hier weg.",
          },
        ],
      },
      {
        title: "Abschluss",
        calloutTitle: "Frage zur Selbstbeobachtung",
        calloutText: "Welches Signal kennen Sie? Wann tritt es auf?",
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("lmk", {
    kicker: "Textversion",
    summary:
      "Wenn Grenzen ignoriert werden, reicht eine Bitte oft nicht. L.M.K. verbindet klare Ansage, logische Konsequenz und ruhiges Handeln.",
    intro: [
      "Diese Seite überträgt das Handout «Wenn Grenzen nicht respektiert werden – Die LMK-Methode» in eine lesbare Web-Version. Es richtet sich an Angehörige, die nach wiederholten Grenzverletzungen konsequent und ohne Drohlogik handeln wollen.",
      "Die Struktur des Originals bleibt erhalten: Stufe 1 Grenze setzen, die Dichotomie der Kontrolle, Stufe 2 logische Konsequenz, Stufe 3 handeln und drei kurze Hinweise für die Umsetzung.",
    ],
    sections: [
      {
        title: "Stufe 1: Grenze setzen",
        cards: [
          {
            title: "Beispiel",
            text: "Ich kann so nicht weiterreden. Pause 10 Minuten.",
          },
          {
            title: "Wenn die Grenze respektiert wird",
            text: "Gespräch wird fortgesetzt. Grenze hält.",
          },
          {
            title: "Wenn die Grenze nicht respektiert wird",
            text: "Grenze wird ignoriert oder übertreten.",
          },
        ],
      },
      {
        title: "Dichotomie der Kontrolle",
        cards: [
          {
            title: "Was ich kontrollieren kann",
            text: "Meine Reaktion, meine Grenzen, mein Verhalten.",
          },
          {
            title: "Was ich nicht kontrollieren kann",
            text: "Das Verhalten meines Angehörigen.",
          },
        ],
      },
      {
        title: "Stufe 2: L.M.K. – logische, machbare Konsequenz",
        bullets: [
          "Wenn du weiter schreist, gehe ich in mein Zimmer.",
          "Wenn das nochmal passiert, schlafe ich heute woanders.",
        ],
      },
      {
        title: "Stufe 3: Handeln",
        calloutTitle: "Umsetzung",
        calloutText:
          "Konsequenz umsetzen. Ruhig, ohne Vorwurf. Nicht drohen, sondern tun.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Grenzen setzen. Sie können Konsequenzen umsetzen. Sie können nicht das Verhalten des anderen ändern.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Grenze hält",
            text: "Die gesetzte Grenze wird respektiert.",
          },
          {
            title: "LMK",
            text: "Logische, machbare Konsequenz.",
          },
          {
            title: "Handeln",
            text: "Die Konsequenz wird ruhig umgesetzt.",
          },
          {
            title: "Grenze nicht respektiert",
            text: "Die gesetzte Grenze wird ignoriert oder übertreten.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie vorab 2–3 logische, machbare Konsequenzen.",
          "Besprechen Sie diese in einem ruhigen Moment.",
          "Setzen Sie die Konsequenz um – ruhig und ohne Diskussion.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("genesung-zahlen", {
    kicker: "Textversion",
    summary:
      "Langzeitdaten machen Hoffnung: Genesung ist möglich, aber sie braucht Zeit, Rückschläge, Geduld und professionelle Unterstützung.",
    intro: [
      "Diese Seite überträgt das Handout «Genesung in Zahlen – Was die Forschung zeigt» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Hoffnung auf belastbare Daten stützen möchten, ohne den Weg zu romantisieren.",
      "Die Struktur des Originals bleibt erhalten: drei zentrale Kennzahlen, eine grobe zeitliche Einordnung, die Kernaussage des Handouts und drei konkrete Hinweise für den Alltag von Angehörigen.",
    ],
    sections: [
      {
        title: "Was die Forschung zeigt",
        cards: [
          {
            title: "85–93%",
            text: "erreichen innerhalb von 10 Jahren eine symptomatische Remission.",
          },
          {
            title: "50%",
            text: "erreichen eine vollständige Genesung im Sinn von Recovery.",
          },
          {
            title: "77%",
            text: "zeigen über 16 Jahre eine anhaltende Remission.",
          },
        ],
      },
      {
        title: "Zeitliche Orientierung",
        intro:
          "Die Zeitachse des Handouts ist keine feste Prognose, sondern eine grobe Orientierung dafür, wie Entwicklung über Jahre statt über Wochen gedacht werden sollte.",
        cards: [
          {
            title: "Jahr 0",
            text: "Diagnose",
          },
          {
            title: "2–4 Jahre",
            text: "Erste Remission möglich",
          },
          {
            title: "4–6 Jahre",
            text: "Stabilere Phasen",
          },
          {
            title: "6–10 Jahre",
            text: "Hohe Remissionsrate",
          },
          {
            title: "10+ Jahre",
            text: "Anhaltende Remission",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Genesung ist möglich. Sie braucht Zeit, Geduld und professionelle Hilfe.",
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Remission",
            text: "Die Grafik verwendet diesen Begriff für die symptomatische Remission.",
          },
          {
            title: "Recovery",
            text: "Die Grafik verwendet diesen Begriff für vollständige Genesung.",
          },
          {
            title: "Anhaltende Remission",
            text: "Die Grafik verwendet diesen Begriff für länger anhaltende Remission.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Teilen Sie diese Zahlen mit Ihrem Angehörigen, wenn der Moment passt.",
          "Erinnern Sie sich: Rückfälle gehören zum Prozess.",
          "Bleiben Sie geduldig – Genesung ist ein Marathon, kein Sprint.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Zanarini et al. (2012), McLean Study; Gunderson et al. (2011).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("fortschritt-paradox", {
    kicker: "Textversion",
    summary:
      "Genesung verläuft nicht linear. Rückschläge gehören zum Weg und entwerten bereits Erreichtes nicht automatisch.",
    intro: [
      "Diese Seite überträgt das Handout «Das Fortschritt-Paradox – Warum Rückschritte zum Weg gehören» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Einbrüche realistischer einordnen möchten.",
      "Die Struktur bleibt eng am Original: zuerst die Kernaussage, dann drei kurze Einordnungen und zum Schluss drei konkrete Hinweise für den Alltag.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Genesung verläuft nicht linear. Rückschritte sind Teil des Weges – nicht das Ende.",
      },
      {
        title: "Wichtige Einordnungen",
        cards: [
          {
            title: "Veränderung braucht Zeit",
            text: "Veränderung braucht Zeit und Geduld.",
          },
          {
            title: "Rückschläge entwerten nicht alles",
            text: "Jeder Rückschlag ist kürzer als der vorherige.",
          },
          {
            title: "Der Weg zurück",
            text: "Der Weg zurück wird schneller.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Sehen Sie Rückfälle als Teil des Prozesses.",
          "Vergleichen Sie mit früher, nicht mit gestern.",
          "Feiern Sie kleine Fortschritte.",
        ],
      },
    ],
    sourceLine: "Quelle: Zanarini et al. (2012); Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("remission-heilung", {
    kicker: "Textversion",
    summary:
      "Remission ist oft das realistische Ziel: Symptome können deutlich abnehmen, Alltag und Beziehungen stabiler werden, auch wenn nicht alles vollständig verschwindet.",
    intro: [
      "Diese Seite überträgt das Handout «Remission vs. Heilung – Was realistisch ist» in eine lesbare Web-Version. Es hilft Angehörigen, Besserung differenzierter und weniger schwarz-weiss einzuordnen.",
      "Das Original stellt Heilung und Remission bewusst gegenüber und ergänzt die Einordnung mit einer knappen Kernaussage und drei alltagsnahen Hinweisen.",
    ],
    sections: [
      {
        title: "Heilung",
        bullets: [
          "Alle Symptome gelöst.",
          "Keine Therapie mehr nötig.",
          "Persönlichkeit verändert.",
          "Selten realistisch.",
        ],
      },
      {
        title: "Remission",
        bullets: [
          "Symptome deutlich reduziert.",
          "Stabilität im Alltag.",
          "Fähigkeit zu Beziehungen.",
          "Realistisches Ziel.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Remission ist das realistische Ziel – und ein grosser Erfolg.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Setzen Sie realistische Erwartungen: Besserung ja, Perfektion nein.",
          "Feiern Sie kleine Fortschritte, statt auf die komplette Heilung zu warten.",
          "Akzeptieren Sie, dass manche Muster bleiben können – aber handhabbar werden.",
        ],
      },
    ],
    sourceLine: "Quelle: Zanarini et al. (2012); Paris (2020).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("5-faktoren-genesung", {
    kicker: "Textversion",
    summary:
      "Genesung wird eher gefördert, wenn Behandlung, Medikation, Beziehungen, Lebensqualität und Zeit zusammenspielen. Angehörige können vor allem das Beeinflussbare unterstützen.",
    intro: [
      "Diese Seite überträgt das Handout «5 Faktoren der Genesung – Was Forschung zeigt» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Hoffnung mit einem realistischen Blick auf wirksame Einflussfaktoren verbinden möchten.",
      "Die Struktur folgt dem Original: fünf Faktoren, eine Kernaussage und drei Hinweise dazu, wie Angehörige den Prozess hilfreich begleiten können.",
    ],
    sections: [
      {
        title: "Die fünf Faktoren",
        cards: [
          {
            title: "Therapie",
            text: "Professionelle Behandlung als Säule.",
          },
          {
            title: "Medikation",
            text: "Unterstützend, nicht allein.",
          },
          {
            title: "Soziales Netz",
            text: "Verlässliche Beziehungen.",
          },
          {
            title: "Lebensqualität",
            text: "Sinnvolle Aktivitäten und Struktur.",
          },
          {
            title: "Zeit",
            text: "Genesung braucht Jahre, nicht Wochen.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Genesung ist möglich – und Sie als Angehörige können bei den beeinflussbaren Faktoren unterstützen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Prüfen Sie: Welchen Faktor können Sie unterstützen?",
          "Konzentrieren Sie sich auf das Beeinflussbare.",
          "Geben Sie nicht auf – Veränderung braucht Zeit.",
        ],
      },
    ],
    sourceLine: "Quelle: Zanarini et al. (2012); Paris (2020).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("rolle-genesungsprozess", {
    kicker: "Textversion",
    summary:
      "Angehörige können Genesung unterstützen, aber nicht herstellen. Der wichtigste Beitrag ist oft die eigene Stabilität, nicht das Retten.",
    intro: [
      "Diese Seite überträgt das Handout «Ihre Rolle im Genesungsprozess – Was Sie tun können – und was nicht» in eine lesbare Web-Version. Es hilft Angehörigen, ihren Beitrag klarer von Überverantwortung zu unterscheiden.",
      "Die Originalstruktur bleibt erhalten: hilfreiche Beiträge, klare Nicht-Aufgaben, die Kernaussage des Blatts, die Farblegende und drei kurze Selbstchecks für den Alltag.",
    ],
    sections: [
      {
        title: "Was Sie tun können",
        cards: [
          {
            title: "Konsistenz",
            text: "Berechenbar und verlässlich bleiben.",
          },
          {
            title: "Realistische Hoffnung",
            text: "Genesung ist möglich – vermitteln Sie das.",
          },
          {
            title: "Eigene Grenzen",
            text: "Klar und konsequent bleiben.",
          },
          {
            title: "Fortschritte benennen",
            text: "Kleine Erfolge sichtbar machen.",
          },
          {
            title: "Professionelle Hilfe unterstützen",
            text: "Therapie fördern, nicht ersetzen.",
          },
        ],
      },
      {
        title: "Was nicht Ihre Aufgabe ist",
        cards: [
          {
            title: "Therapie ersetzen",
            text: "Das ist Aufgabe der Fachpersonen.",
          },
          {
            title: "Veränderung erzwingen",
            text: "Genesung braucht eigene Motivation.",
          },
          {
            title: "Immer verfügbar sein",
            text: "Sie brauchen auch Pausen.",
          },
          {
            title: "Eigene Bedürfnisse zurückstellen",
            text: "Ihre Gesundheit zählt.",
          },
          {
            title: "Für Genesung verantwortlich sein",
            text: "Das liegt nicht in Ihrer Hand.",
          },
        ],
      },
      {
        title: "Merksätze",
        cards: [
          {
            title: "Ihre Stabilität",
            text: "Ihre Stabilität ist Teil der Genesung.",
          },
          {
            title: "Kernaussage",
            text: "Sie können unterstützen. Sie müssen nicht retten.",
          },
        ],
      },
      {
        title: "Legende",
        cards: [
          {
            title: "Sage",
            text: "Ihr Beitrag.",
          },
          {
            title: "Terracotta",
            text: "Nicht Ihre Aufgabe.",
          },
          {
            title: "Slate",
            text: "Kernbotschaft.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Prüfen Sie regelmässig: Bin ich in meiner Rolle oder rutsche ich ab?",
          "Sprechen Sie mit Fachpersonen, wenn Sie unsicher sind.",
          "Erinnern Sie sich: Ihre Stabilität ist Ihr wichtigster Beitrag.",
        ],
      },
    ],
    sourceLine: "Quelle: Gunderson et al., Family Guidelines; Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("kinder", {
    kicker: "Textversion",
    summary:
      "Kinder merken meist, dass etwas anders ist. Eine altersgerechte Erklärung schafft Sicherheit, nimmt Schuld und stärkt das Vertrauen.",
    intro: [
      "Diese Seite überträgt das Handout «Wenn Mama oder Papa grosse Gefühle hat» in eine lesbare Web-Version. Es richtet sich an Angehörige, die Borderline kindgerecht erklären und Kinder im Familiensystem besser schützen möchten.",
      "Die Struktur des Originals bleibt erhalten: zuerst die entlastende Grundhaltung, dann altersbezogene Erklärungen, Hinweise für Geschwisterkinder, Schutzfaktoren und ein Merksatz, der Kinder konsequent von Verantwortung entlastet.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Worum es im Handout geht",
        calloutText:
          "Kinder spüren, dass etwas anders ist – auch wenn niemand darüber spricht. Schweigen schützt sie nicht. Eine altersgerechte Erklärung gibt ihnen Sicherheit, nimmt ihnen die Schuld und stärkt das Vertrauen.",
      },
      {
        title: "So können Sie es erklären – nach Alter",
        cards: [
          {
            title: "4–7 Jahre: Bildsprache",
            text: "«Mama/Papa hat manchmal ganz grosse Gefühle – wie ein Sturm im Kopf. Das ist nicht deine Schuld. Wir sind für dich da.» Vermeiden Sie das Wort krank und sprechen Sie von grossen Gefühlen.",
          },
          {
            title: "8–12 Jahre: Einfache Erklärung",
            text: "«Das Gehirn verarbeitet Gefühle anders. Es gibt Fachleute, die helfen. Es ist nicht deine Aufgabe, Mama/Papa besser zu machen.» Benennen Sie klar: Das Kind trägt keine Verantwortung.",
          },
          {
            title: "13+ Jahre: Ehrliches Gespräch",
            text: "«Mama/Papa hat eine Diagnose, die Borderline heisst. Gefühle werden extrem stark erlebt. Es ist behandelbar. Du darfst Fragen stellen – jederzeit.» Bieten Sie an, gemeinsam verlässliche Infos zu lesen.",
          },
        ],
      },
      {
        title: "Wenn ein Geschwisterkind betroffen ist",
        bullets: [
          "Unter 12: Dein Bruder/deine Schwester braucht mehr Hilfe. Du bist genauso wichtig.",
          "12+: Du musst nicht die Rolle der Erwachsenen übernehmen. Deine Gefühle sind erlaubt.",
        ],
      },
      {
        title: "3 Schutzfaktoren für Kinder",
        cards: [
          {
            title: "Stabilität",
            text: "Verlässliche Bezugsperson. Routinen beibehalten.",
          },
          {
            title: "Offenheit",
            text: "Erklären statt schweigen. Gefühle aktiv erfragen.",
          },
          {
            title: "Entlastung",
            text: "Du bist nicht schuld. Eigene Freiräume geben.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Ein Satz, der immer wieder gesagt werden darf",
        calloutText:
          "«Du bist nicht schuld. Und du musst das nicht allein verstehen.» Dieser Satz darf in jeder Altersgruppe fallen – so oft wie nötig.",
      },
    ],
    sourceLine:
      "Quellen: [1] Lenz, A. (2014): Kinder psychisch kranker Eltern. Hogrefe. [2] Mattejat, F. & Lisofsky, B. (2008): Nicht von schlechten Eltern. Balance Verlag. [3] BApK: Geschwister psychisch erkrankter Menschen.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 09.02.2026.",
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

export function getFullHandoutTextVersion(id: string | undefined) {
  if (!id) {
    return null;
  }

  return handoutTextVersionsById.get(id) ?? null;
}
