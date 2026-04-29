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
      "Diese Seite macht den «Notfallplan bei psychischer Krise» direkt lesbar. Die Orientierung bleibt bewusst nah am Notfallplan, damit wichtige Hinweise auch ohne PDF-Ansicht schnell zugänglich sind.",
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
      "Der Leuchtturm verdichtet die wichtigste Haltung für Angehörige: Sie können Orientierung geben, ohne das Schiff steuern zu müssen. Die Bildidee macht die Kernaussage direkt zugänglich.",
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
            text: "Krisen kommen und gehen. Der Übergang erinnert daran, dass belastende Zustände nicht statisch bleiben.",
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
            text: "Bewahren Sie möglichst innere Ruhe, auch wenn es im Gegenüber stürmisch wird.",
          },
          {
            title: "2. Orientierung geben",
            text: "Geben Sie mit wenigen klaren Sätzen Orientierung statt immer neuen Erklärungen.",
          },
          {
            title: "3. Verlässlich bleiben",
            text: "Bleiben Sie möglichst berechenbar, auch wenn sich Zustände schnell ändern.",
          },
        ],
      },
      {
        title: "Orientierung",
        calloutTitle: "Was der Leuchtturm nicht bedeutet",
        calloutText:
          "Der Leuchtturm steht nicht für Kontrolle, sondern für Haltung: ruhig bleiben, Richtung geben und nicht in jeden Sturm hineingezogen werden.",
      },
    ],
    sourceLine:
      "Quelle: Nach Mason & Kreger (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("rolle-klaeren", {
    kicker: "Textversion",
    summary:
      "Sie können Orientierung, Hoffnung und klare Grenzen geben. Therapie ersetzen, Verhalten kontrollieren oder die Genesung tragen müssen Sie nicht.",
    intro: [
      "Rollenklarheit hilft, Unterstützung von Überverantwortung zu unterscheiden. Im Zentrum stehen drei Fragen: Was ist Ihr Beitrag, was ist nicht Ihre Aufgabe, und wann braucht es professionelle Hilfe?",
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
            title: "Geduldige Begleitung",
            text: "Zuhören, ohne zu urteilen.",
          },
          {
            title: "Übungsbegleitung",
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
            title: "Therapie übernehmen",
            text: "Die Therapie ersetzen oder kontrollieren.",
          },
          {
            title: "Retterrolle",
            text: "Alle Probleme lösen wollen.",
          },
          {
            title: "Kontrollinstanz",
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
    sourceLine:
      "Quelle: Gunderson et al., Family Guidelines; Mason & Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("im-krisenmodus", {
    kicker: "Textversion",
    summary:
      "In der Krise hilft weniger Logik, dafür mehr Ruhe, Präsenz und Orientierung. Ihre ruhige Haltung kann helfen, von Überforderung zu mehr Sicherheit zurückzufinden.",
    intro: [
      "Im Krisenmodus zählt weniger Erklärung und mehr Orientierung. Die Gegenüberstellung von Krise und beruhigtem Zustand zeigt, wie Ruhe und Präsenz wieder Handlungsspielraum öffnen können.",
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
      "Die drei Säulen beschreiben eine tragfähige Angehörigen-Haltung: Präsenz, Stabilität und Grenze. Sie geben Orientierung, wenn Unterstützung unübersichtlich wird.",
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
            text: "Zugewandt und ansprechbar bleiben, ohne alles lösen zu müssen.",
          },
          {
            title: "Stabilität – Ich bleibe ruhig.",
            text: "Innerlich ruhiger und berechenbar bleiben, auch wenn es angespannt wird.",
          },
          {
            title: "Grenze – Ich schütze mich.",
            text: "Eigene Bedürfnisse ernst nehmen und Nein sagen können, wenn es nötig ist.",
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
            text: "Wählen Sie eine Säule, auf die Sie diese Woche besonders achten wollen.",
          },
          {
            title: "2. Üben",
            text: "Üben Sie sie bewusst in kleinen, alltäglichen Situationen.",
          },
          {
            title: "3. Reflektieren",
            text: "Fragen Sie sich am Abend: Welche Säule hat heute am meisten geholfen?",
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
      "Das Konsistenz-Prinzip zeigt, wie ähnliche Reaktionen im Umfeld Sicherheit schaffen können. Es stellt einen hilfreichen und einen schwierigen Beziehungskreislauf gegenüber.",
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
            text: "Wenn Grenzen ähnlich formuliert und eingehalten werden, gibt es weniger Streit über die Grenze selbst.",
          },
          {
            title: "Inkonsistenz",
            text: "Widersprüchliche Reaktionen fördern Unsicherheit, Misstrauen und mehr Konflikte.",
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
        title: "Merkhilfe",
        calloutTitle: "Worum es bei Konsistenz wirklich geht",
        calloutText:
          "Nicht Härte macht den Unterschied, sondern Abstimmung: ähnliche Reaktionen, ähnliche Grenzen, weniger Ausspielen gegeneinander.",
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
            text: "Wählen Sie ein oder zwei gemeinsame Grenzen und halten Sie sie möglichst gleich ein.",
          },
          {
            title: "3. Unterschiede privat besprechen",
            text: "Besprechen Sie Unterschiede privat – nicht im Streitmoment.",
          },
        ],
      },
    ],
    sourceLine: "Quelle: Familienleitlinien und Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("beziehungs-achtsamkeit", {
    kicker: "Textversion",
    summary:
      "Innehalten, wahrnehmen, nicht bewerten und bewusst handeln helfen Angehörigen, aus dem Autopiloten auszusteigen und klarer zu reagieren.",
    intro: [
      "Beziehungs-Achtsamkeit übersetzt Achtsamkeit in vier konkrete Schritte für angespannte Beziehungssituationen: innehalten, wahrnehmen, nicht bewerten und bewusst handeln.",
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
            text: "Es ist, wie es ist. Eine Lösung muss nicht im selben Moment entstehen.",
          },
          {
            title: "Bewusst handeln",
            text: "Ich wähle bewusst: ein Satz, eine Grenze, eine Pause oder Hilfe.",
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
        title: "Merkhilfe",
        calloutTitle: "Achtsamkeit als Reihenfolge",
        calloutText:
          "Die vier Schritte helfen vor allem deshalb, weil sie Tempo aus dem Autopiloten nehmen: erst stoppen, dann wahrnehmen, dann einordnen, dann handeln.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Täglich üben",
            text: "Üben Sie die ersten beiden Schritte täglich in kleinen Situationen.",
          },
          {
            title: "2. Als Anti-Streit-Regel nutzen",
            text: "Nutzen Sie Schritt 3 als Anti-Streit-Regel: nicht sofort bewerten und nicht sofort reagieren.",
          },
          {
            title: "3. Konkret entscheiden",
            text: "Machen Sie Schritt 4 konkret: ein Satz, eine Grenze oder ein nächster Schritt.",
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
      "Die sechs Leitlinien bündeln evidenzbasierte Empfehlungen nach Gunderson in konkrete Alltagshinweise. Sie helfen, Unterstützung klar, verlässlich und begrenzt zugleich zu gestalten.",
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
            text: "Halten Sie Erwartungen an schnelle Fortschritte bewusst realistisch.",
          },
          {
            title: "2. Ruhige Umgebung schaffen",
            text: "Routinen und Vorhersehbarkeit geben oft mehr Sicherheit als ständige neue Lösungen.",
          },
          {
            title: "3. Zuhören statt verteidigen",
            text: "Hören Sie zuerst zu, ohne sich sofort zu verteidigen, auch wenn Vorwürfe unfair wirken.",
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
        title: "Merkhilfe",
        calloutTitle: "Lieber klein und verlässlich",
        calloutText:
          "Die Leitlinien wirken meist nicht als Gesamtprogramm, sondern dann, wenn Sie eine davon verlässlich in den Alltag bringen.",
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
            text: "Besprechen Sie sie, wenn möglich, mit Familie oder Mitbeteiligten.",
          },
          {
            title: "3. Reflektieren",
            text: "Reflektieren Sie: Was hat sich verändert?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Gunderson et al., Family Guidelines for Borderline Personality Disorder.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-alltags-tipps", {
    kicker: "Textversion",
    summary:
      "Kleine, konkrete Handlungen im Alltag helfen oft mehr als grosse Reden: mitüben, Fortschritte würdigen, verlässlich bleiben und gemeinsam Lösungen entwickeln.",
    intro: [
      "Die vier Alltags-Tipps fokussieren auf wenige Unterstützungsformen, die Angehörige direkt ausprobieren können. Der Schwerpunkt liegt auf kleinen, tragfähigen Schritten statt auf perfekten Lösungen.",
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
            text: "Unterstützen Sie beim Üben neuer Skills, ohne die Übung selbst zu übernehmen.",
          },
          {
            title: "Fortschritte anerkennen",
            text: "Würdigen Sie auch kleine Schritte und benennen Sie, was bereits gelingt.",
          },
          {
            title: "Vorhersehbar sein",
            text: "Klare Routinen, Absprachen und Verlässlichkeit entlasten oft mehr als spontane Rettungsversuche.",
          },
          {
            title: "Gemeinsam Probleme lösen",
            text: "Fragen Sie mit, statt sofort Lösungen vorzugeben. Unterstützen statt übernehmen.",
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
            text: "Wählen Sie einen Tipp, den Sie diese Woche bewusst ausprobieren wollen.",
          },
          {
            title: "2. In Ruhe üben",
            text: "Probieren Sie ihn zuerst in ruhigen Momenten aus.",
          },
          {
            title: "3. Hilfreich fragen",
            text: "Fragen Sie: Was wäre jetzt hilfreich?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: DBT-orientierte Angehörigenarbeit; Fruzzetti (2006), Family Psychoeducation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("eisberg", {
    kicker: "Textversion",
    summary:
      "Was sichtbar wie Wut, Vorwürfe oder Lautwerden wirkt, hat oft eine verdeckte Unterseite aus Angst, Scham, Trauer, Einsamkeit und Stress.",
    intro: [
      "Der Eisberg macht sichtbar, dass Verhalten oft nur die Oberfläche ist. Darunter liegen häufig Angst, Scham, Überforderung, Bedürfnisse oder Verletzlichkeit.",
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
        title: "Orientierung",
        calloutTitle: "Wie der Eisberg gelesen werden kann",
        calloutText:
          "Oben zeigt die Grafik sichtbares Verhalten. Unter der Oberfläche liegen oft Gefühle und Bedürfnisse, die im Streit leicht aus dem Blick geraten.",
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
      "Die Pendel-Metapher zeigt, wie Wahrnehmung unter Belastung zwischen Idealisierung und Entwertung kippen kann. Ziel ist, den ganzen Menschen wieder besser im Blick zu behalten.",
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
        title: "Orientierung",
        calloutTitle: "Worum es bei der Grauzone geht",
        calloutText:
          "Idealisierung und Entwertung sind beide verzerrte Stresszustände. Die Grauzone ist der realistischere Bereich, in dem Beziehung wieder differenzierter erlebt werden kann.",
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
      "Diese Seite macht den «Spickzettel Krisenkommunikation» such- und kopierbar. Die Struktur bleibt knapp und bildschirmfreundlich, damit Sie die Sätze in angespannten Momenten schnell finden.",
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
      "Alarm-Modus und Denk-Modus erklären, warum Gespräche unter hoher Anspannung so schnell eng werden. Unter Stress steht nicht dieselbe Denkfähigkeit zur Verfügung wie in ruhigeren Momenten.",
      "Für Angehörige ist das eine Entlastung und eine Handlungsorientierung zugleich. Nicht jede Eskalation ist böser Wille oder bewusste Verweigerung – oft ist sie Ausdruck eines neurobiologisch eingeengten Zustands.",
    ],
    sections: [
      {
        title: "Trigger",
        calloutTitle: "Was den Alarm auslösen kann",
        calloutText: "Kritik, Zurückweisung oder starke Überforderung.",
      },
      {
        title: "Die zwei Modi",
        intro:
          "Das Handout stellt einen hoch aktivierten Alarm-Zustand einem wieder zugänglichen Denk-Zustand gegenüber.",
        cards: [
          {
            title: "Alarm-Modus",
            text: "Der Körper geht in Kampf oder Flucht. Die Amygdala ist überaktiv, Denken eingeschränkt und Impulse werden schwerer steuerbar. Schuldgefühle kommen oft erst später.",
          },
          {
            title: "Denk-Modus",
            text: "Der präfrontale Kortex ist besser verfügbar. Zuhören, Abwägen und Planen werden wieder möglich, und erst dann trägt ein Gespräch eher.",
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
          "Im Alarm-Modus ist Ihr Gegenüber vorübergehend nicht erreichbar. Das ist keine Lüge und kein böser Wille, sondern eine neurobiologische Alarmreaktion.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Was in welchem Modus hilft",
        calloutText:
          "Im Alarm-Modus helfen Druck und Logik wenig. Zuerst braucht es Beruhigung, dann einen Übergang, erst danach wieder Klärung.",
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
      "Der 4-Phasen-Zyklus beschreibt ein wiederkehrendes Muster, das in belasteten Beziehungen immer wieder auftreten kann. Er hilft, Eskalationen früher einzuordnen.",
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
          "Der Zyklus wiederholt sich, bis das Muster früher erkannt und unterbrochen wird. Dazu können Sie beitragen.",
      },
      {
        title: "Orientierung",
        calloutTitle: "Wo Veränderung am ehesten möglich wird",
        calloutText:
          "Am meisten Spielraum entsteht meist schon in Phase 2, bevor aus Spannung wieder eine Explosion wird.",
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
      "Das Gehirn-Modell erklärt in einfacher Form, was bei emotionaler Überflutung passiert. Für Angehörige wird dadurch nachvollziehbarer, warum zuerst Beruhigung und erst danach Klärung hilft.",
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
            text: "Reagiert auf Bedrohung und löst Kampf oder Flucht aus. Bei einer Borderline-Persönlichkeitsstörung reagiert sie oft stärker und schneller.",
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
        title: "Orientierung",
        calloutTitle: "Was die Grafik verständlich machen will",
        calloutText:
          "Wenn Alarm übernimmt, wird Denken enger. Mit Beruhigung kommt Schritt für Schritt wieder mehr Zugang zu Reflexion und Gespräch zurück.",
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
      "Die Ampellogik hilft, eigene Überlastung früher wahrzunehmen. Grün, Gelb und Rot markieren unterschiedliche Belastungsstufen und zeigen, wann Gegensteuern nötig wird.",
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
            title: "1. Grün: früh gegensteuern",
            text: "Planen Sie bewusst kleine Dinge ein, die Sie stabilisieren: Pause, Schlaf, Bewegung oder ein entlastendes Gespräch.",
          },
          {
            title: "2. Gelb: Unterstützung aktivieren",
            text: "Holen Sie sich Beratung oder Begleitung, bevor Überlastung zum Dauerzustand wird.",
          },
          {
            title: "3. Rot: Hilfe dazuholen",
            text: "Wenn Sie sich stark erschöpft, hoffnungslos oder nicht mehr sicher fühlen, holen Sie umgehend Hilfe von aussen.",
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
      "Die Sauerstoffmaske erinnert daran, dass Selbstfürsorge kein Rückzug aus Verantwortung ist. Erst die eigene Maske aufsetzen, dann anderen helfen: Dieses Bild entlastet und klärt Prioritäten.",
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
        title: "Wendepunkt",
        calloutTitle: "Wo sich der Kreislauf verändert",
        calloutText:
          "Der entscheidende Wechsel passiert dort, wo Sie Selbstfürsorge nicht mehr verschieben, sondern als Voraussetzung für verlässliche Unterstützung behandeln.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Zeit nur für sich reservieren",
            text: "Planen Sie diese Woche bewusst etwas ein, das nicht dem Krisenmanagement gehört.",
          },
          {
            title: "2. Den eigenen Bedarf aussprechen",
            text: "Sagen Sie klar, was Sie brauchen, um zugewandt und verlässlich bleiben zu können.",
          },
          {
            title: "3. Hilfe annehmen üben",
            text: "Entlastung wird oft erst möglich, wenn Sie Unterstützung nicht nur anbieten, sondern auch selbst zulassen.",
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
      "Die STOPP-Technik schafft eine kurze Pause zwischen Reiz und Reaktion. Die fünf Schritte sind alltagsnah formuliert, damit sie in angespannten Momenten schnell nutzbar bleiben.",
      "Die fünf Buchstaben geben eine feste Reihenfolge vor: stoppen, atmen, orientieren, Perspektive weiten und dann erst handeln.",
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
            text: "Drei tiefe Atemzüge. Nur atmen, noch nicht reagieren.",
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
            text: "Wählen Sie eine konkrete nächste Handlung.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Im ruhigen Moment üben",
            text: "Üben Sie STOPP mehrmals in ruhigen Situationen, damit die Reihenfolge unter Stress verfügbarer wird.",
          },
          {
            title: "2. Anker-Satz bereitlegen",
            text: "Ein kurzer Satz wie «Ich habe einen Moment» hilft, nicht sofort zu reagieren.",
          },
          {
            title: "3. Abends kurz zurückblicken",
            text: "Fragen Sie sich am Abend: Wo hätte mir STOPP heute gutgetan?",
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
      "Das Energie-Konto macht sichtbar, was Kraft gibt und was Kraft kostet. Die Batterie-Metapher hilft, Belastung früher zu bemerken, bevor Erschöpfung zum Dauerzustand wird.",
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
        title: "Orientierung",
        calloutTitle: "Die einfache Prüffrage",
        calloutText:
          "Fragen Sie nicht nur, was Kraft kostet, sondern auch, was Ihr Energie-Konto verlässlich wieder auffüllt.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Stand ehrlich einschätzen",
            text: "Fragen Sie sich ohne Beschönigung: Wie voll ist mein Energie-Konto gerade?",
          },
          {
            title: "2. Einen Energiegeber terminieren",
            text: "Planen Sie diese Woche eine konkrete Auftank-Aktivität fest ein.",
          },
          {
            title: "3. Einen Energiefresser begrenzen",
            text: "Wählen Sie genau eine Belastung, die Sie diese Woche verkleinern oder unterbrechen.",
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
      "Die Erlaubnis-Karte sammelt Sätze, die Angehörige oft erst wieder lernen müssen. Sie ist nicht als Pflichtliste gemeint, sondern als entlastende Zusage zum Auswählen.",
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
        title: "Wie Sie die Karte lesen können",
        calloutTitle: "Nicht Leistung, sondern Erlaubnis",
        calloutText:
          "Die Karte will nichts zusätzlich von Ihnen. Sie erinnert Sie daran, was auch unter Belastung erlaubt bleibt.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Einen Satz auswählen",
            text: "Wählen Sie heute genau die Erlaubnis aus, die Ihnen im Moment am schwersten fällt.",
          },
          {
            title: "2. Sichtbar notieren",
            text: "Schreiben Sie diesen Satz an einen Ort, den Sie im Alltag sehen.",
          },
          {
            title: "3. Im Alltag wiederholen",
            text: "Wenn Schuldgefühle auftauchen, erinnern Sie sich bewusst: Auch das ist erlaubt.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Selbstfürsorge-orientierte Angehörigenarbeit, nach Mason/Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("schuld-verantwortung", {
    kicker: "Textversion",
    summary:
      "Schuldgefühle sind bei Angehörigen häufig und verständlich. Hilfreicher als der Blick zurück ist die Frage, was Sie heute beeinflussen können, ohne sich die ganze Verantwortung aufzuladen.",
    intro: [
      "Schuld und Verantwortung geraten bei Angehörigen leicht durcheinander. Diese Orientierung hilft, Selbstvorwürfe zu entlasten und den eigenen Einfluss realistischer zu sehen.",
      "Sie finden zuerst eine Einordnung von Schuldgefühlen, dann den Blick auf Forschung, den Unterschied zwischen Schuld und Verantwortung und typische Selbstvorwürfe mit einer realistischeren Gegenperspektive.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentrale Entlastung",
        calloutText:
          "Schuldgefühle gehören zu den häufigsten Belastungen von Angehörigen. Diese Gedanken sind verständlich, aber sie helfen weder Ihnen noch der betroffenen Person. Eine Borderline-Persönlichkeitsstörung hat keine einzelne Ursache, und kein einzelner Mensch ist dafür verantwortlich.",
      },
      {
        title: "Was die Forschung zeigt",
        intro:
          "Das Handout fasst die Entlastung bewusst sachlich zusammen: Borderline entsteht nicht durch einen einzelnen Auslöser und nicht durch eine einzelne Person.",
        cards: [
          {
            title: "Genetik und Temperament",
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
            text: "Sie sind kein Diagnostik-Team. Eine Borderline-Persönlichkeitsstörung wird selbst von Fachpersonen oft erst spät erkannt.",
          },
          {
            title:
              "«Wenn ich ein besserer Elternteil gewesen wäre, wäre das nicht passiert.»",
            text: "Eine Borderline-Persönlichkeitsstörung entsteht nie durch eine einzelne Person. Dass Sie jetzt da sind, zeigt Ihre Fürsorge.",
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
            text: "Eine Borderline-Persönlichkeitsstörung kommt in allen Familien vor – unabhängig von Bildung, Einkommen oder Erziehungsstil.",
          },
        ],
      },
      {
        title: "Vertiefung",
        calloutTitle: "Wenn Schuldgedanken wieder auftauchen",
        calloutText:
          "Fragen Sie sich nicht nur, was damals falsch lief, sondern auch, was heute schützt, entlastet und in Ihrer Verantwortung liegt.",
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
      "Radikale Akzeptanz bedeutet nicht Aufgeben. Sie hilft, die Realität anzuerkennen und Kraft wieder auf das zu richten, was heute beeinflussbar ist.",
      "Die Gegenüberstellung zeigt, was radikale Akzeptanz nicht ist, was sie ist, wie Sie sie in vier Schritten üben und worauf Sie Ihre Energie stattdessen richten können.",
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
          "Die Gegenüberstellung grenzt bewusst Missverständnisse ab. Akzeptanz bedeutet nicht, Belastendes schönzureden oder sich selbst aufzugeben.",
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
      "Harte Vorwürfe können Angehörige stark verunsichern. Die fünf Schuldzuweisungen helfen, typische Sätze einzuordnen und innerlich etwas mehr Abstand zu behalten.",
      "Sie finden eine entlastende Grundhaltung, fünf typische Schuldzuweisungen mit möglicher Einordnung und Antwort sowie einen abschliessenden Merksatz, der Mitgefühl und Selbstschutz zusammenhält.",
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
            text: "Dahinter stehen oft Verlustangst und Verzweiflung. Mögliche Antwort: «Ich höre, wie verzweifelt du bist. Ich bleibe damit nicht allein und hole jetzt Hilfe dazu.» Solche Sätze immer ernst nehmen.",
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
      "Wenn Gespräche kippen, hilft eine kurze Struktur mehr als lange Erklärungen. Die Schritte unterstützen Angehörige dabei, früher zu verlangsamen und Eskalation zu vermeiden.",
      "Sie finden drei Schritte, einen kurzen Pausenplan für Kipppunkte, die Kernaussage des Blatts, eine kleine Merkhilfe und drei alltagsnahe Hinweise.",
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
        title: "Wenn es kippt: Mini-Plan",
        bullets: [
          "Kündigen Sie eine begrenzte Pause von 10 bis 30 Minuten an.",
          "Sagen Sie klar, dass Sie den Kontakt nicht abbrechen, sondern das Gespräch nur unterbrechen.",
          "Nennen Sie nach Möglichkeit schon jetzt, wann Sie wieder ansprechbar sind.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Kurz, ruhig und wiederholbar wirkt in Krisen stärker als Argumente.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Die Reihenfolge zählt",
        calloutText:
          "Erst beruhigen, dann verbinden, dann begrenzen. In dieser Reihenfolge steigt die Chance, dass Ihr Satz überhaupt noch ankommt.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie die drei Schritte in ruhigen Momenten, damit sie unter Anspannung verfügbarer sind.",
          "Halten Sie Sätze so kurz, dass Sie sie im Stress wiederholen können.",
          "Verbinden Sie jede Pause mit einer Rückkehr: «Wir sprechen um [Uhrzeit] weiter.»",
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
      "Die 3-Teile-Formel hilft, Grenzen klar anzusprechen, ohne in Streitlogik hineingezogen zu werden. Sie verbindet Anerkennung, Grenze und nächsten Schritt.",
      "Sie finden die Formel, ein knappes Beispiel, eine Kernaussage, eine kurze Merkhilfe und drei kurze Umsetzungshinweise.",
    ],
    sections: [
      {
        title: "Die 3-Teile-Formel",
        cards: [
          {
            title: "Fakt",
            text: "Beschreiben Sie kurz, was passiert. Objektiv, ohne Bewertung. Beispiel: «Es ist jetzt das dritte Mal, dass du mich anschreist.»",
          },
          {
            title: "Ich-Grenze",
            text: "Sagen Sie in einem Satz, was für Sie nicht geht. Beispiel: «So kann ich nicht weiterreden.»",
          },
          {
            title: "Nächster Schritt",
            text: "Nennen Sie den nächsten Schritt konkret und machbar. Beispiel: «Pause 10 Minuten, dann sprechen wir weiter.»",
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
        title: "Merkhilfe",
        calloutTitle: "Ein Satz pro Teil genügt",
        calloutText:
          "Je knapper Sie bleiben, desto eher bleibt Ihre Grenze hörbar: Fakt, Ich-Grenze, nächster Schritt.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Schreiben Sie zwei oder drei typische Grenzsätze vorab aus.",
          "Üben Sie die Formel laut in Ihrer eigenen Sprache.",
          "Bleiben Sie bei einem Satz pro Teil, auch wenn Gegenwind kommt.",
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
      "Pause statt Streit hilft, Kipppunkte früher zu erkennen. Der Schwerpunkt liegt darauf, rechtzeitig auszusteigen, bevor ein Gespräch beide Seiten weiter verletzt.",
      "Sie finden drei Zustände, die Kernaussage, eine kurze Orientierung und drei praktische Hinweise für den Alltag.",
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
          "Kündigen Sie früh an: «Ich merke, es wird schwierig. Pause 10 Minuten.»",
        ],
      },
      {
        title: "Eskalation",
        bullets: [
          "Schreien, Beschimpfungen.",
          "Kontrolle geht verloren.",
          "Jetzt stoppen und Abstand schaffen.",
          "«Ich unterbreche das Gespräch jetzt. Wir sprechen um [Uhrzeit] weiter.»",
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
        title: "Orientierung",
        calloutTitle: "Was in welcher Stufe hilft",
        calloutText:
          "Stabil: im Gespräch bleiben. Warnstufe: Pause ankündigen. Eskalation: Gespräch stoppen und Rückkehr vereinbaren.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie Ihre persönliche Warnstufe: Woran merken Sie, dass es kippt?",
          "Üben Sie einen Stopp-Satz, der für Sie natürlich klingt.",
          "Planen Sie Rückkehrsätze vorab, damit Sie sie unter Stress nicht erst suchen müssen.",
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
      "Zuhören ohne Zustimmen zeigt, wie Anerkennung möglich ist, ohne die eigene Sicht aufzugeben. So kann Verbindung entstehen, ohne dass Grenzen verschwimmen.",
      "Sie finden anerkennende Sätze, Beispiele für ungünstige Zustimmung, eine Grenze mit Plan, die Kernaussage und drei kurze Übungshinweise.",
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
        intro:
          "Die folgenden Sätze wirken auf den ersten Blick beruhigend, kippen aber in Schuldübernahme oder Selbstaufgabe.",
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
          "Ich kann zuhören, ohne allem zuzustimmen. Wenn das Gespräch kippt, mache ich eine Pause und komme wieder.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Gefühle anerkennen, ohne die Interpretation zu übernehmen. Das ist keine Lüge, sondern Respekt.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Gefühl anerkennen, Deutung nicht schlucken",
        calloutText:
          "Sie können sagen, dass der Schmerz real ist, ohne automatisch die ganze Erklärung oder Schuld zu übernehmen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Üben Sie Sätze wie: «Ich sehe, dass es dir nicht gut geht.» und lassen Sie diesen Satz erst einmal stehen.",
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
      "Der Beispiel-Dialog zeigt einen möglichen Gesprächsablauf Schritt für Schritt. Er ist hilfreich, wenn sich konkrete Sätze greifbarer anfühlen als reine Regeln.",
      "Sie finden einen kurzen Dialogverlauf, die Kernaussage und drei Hinweise für das eigene Üben.",
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
            text: "«Ich mache jetzt 10 Minuten Pause. Wir sprechen um 15 Uhr weiter.»",
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
        title: "Was der Dialog zeigt",
        calloutTitle: "Nicht perfekt, sondern klar",
        calloutText:
          "Der Ablauf zeigt keine Zauberformel, sondern eine Richtung: erst wahrnehmen, dann Kontakt halten, dann Grenze und Rückkehr vereinbaren.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Lesen Sie den Dialog laut und markieren Sie die Sätze, die zu Ihrer Sprache passen.",
          "Üben Sie besonders Grenze und Rückkehr, weil genau diese beiden Schritte in Stress oft wegbrechen.",
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
      "Die DEAR-Technik unterstützt klare Wünsche und Grenzen ohne Vorwurfslogik. Sie hilft, beim eigenen Anliegen zu bleiben und trotzdem respektvoll zu formulieren.",
      "Die vier Schritte von DEAR werden mit kurzen Beispielen, einer Merkhilfe und drei alltagsnahen Übungshinweisen verbunden.",
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
          "Die Abfolge ist bewusst nach dem Akronym DEAR sortiert. Jeder Schritt kombiniert eine Funktion mit einem kurzen Beispielsatz.",
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
        title: "Merkhilfe",
        calloutTitle: "Vier Schritte, ein roter Faden",
        calloutText:
          "Erst beschreiben, dann Gefühl äussern, dann Wunsch klar sagen und zum Schluss den positiven Effekt benennen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Schreiben Sie einen DEAR-Satz für eine aktuelle Situation in Ihrer eigenen Sprache auf.",
          "Üben Sie ihn laut, bevor Sie ihn im Gespräch einsetzen.",
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
      "Spiegeln statt Aufsaugen hilft, empathisch zu bleiben, ohne alles zu übernehmen. Der Unterschied schützt Verbindung und Selbstgrenze zugleich.",
      "Sie finden zuerst die Kernfrage, dann den Unterschied zwischen Aufsaugen und Spiegeln und zum Schluss drei kurze Hinweise für den Alltag.",
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
            text: "Sie übernehmen Schmerz, Wut oder Leere der anderen Person fast wie Ihre eigenen Gefühle.",
          },
          {
            title: "Folge",
            text: "Das führt oft zu Erschöpfung, Schuldgefühlen und innerer Verstrickung.",
          },
          {
            title: "Typischer Satz",
            text: "Es ist meine Schuld, dass es dir schlecht geht.",
          },
          {
            title: "Innere Dynamik",
            text: "Ich muss diese Leere für die andere Person ausgleichen.",
          },
        ],
      },
      {
        title: "Spiegeln",
        cards: [
          {
            title: "Was passiert?",
            text: "Sie nehmen das Gefühl wahr, lassen es aber bei der anderen Person.",
          },
          {
            title: "Folge",
            text: "Das stärkt Selbstschutz und lässt Eigenverantwortung eher beim Gegenüber.",
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
          "Fragen Sie sich: Ist das mein Gefühl oder das der anderen Person?",
          "Sagen Sie: Ich verstehe, dass du leidest (nicht: Ich leide mit dir).",
          "Erinnern Sie sich: Die innere Leere der anderen Person können Sie nicht stellvertretend ausfüllen.",
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
      "Die vier Arten von Grenzen helfen, Schutzbedarf genauer zu benennen. So wird klarer, welche Grenze gerade verletzt ist und welche Reaktion dazu passt.",
      "Die vier Bereiche werden mit kurzen Beispielen und je einem Warnsignal verbunden.",
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
      "Körper und Seele melden oft früh, wenn eine Grenze überschritten ist. Die fünf Warnsignale unterstützen Angehörige dabei, Überlastung ernster zu nehmen.",
      "Sie finden eine Kernaussage, fünf typische Warnsignale und eine kurze Abschlussfrage zur Selbstbeobachtung.",
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
            text: "Magenschmerzen oder Übelkeit. Oft begleitet von dem klaren inneren Signal: Irgendetwas stimmt hier nicht.",
          },
          {
            title: "Die Enge in der Brust",
            text: "Druck, flache Atmung oder Herzrasen. Häufig ein Zeichen dafür, dass Sie mehr Raum oder Abstand brauchen.",
          },
          {
            title: "Die Anspannung im Nacken",
            text: "Verspannte Schultern oder Kopfschmerzen. Der Körper meldet: Das ist gerade zu viel Last.",
          },
          {
            title: "Die Erschöpfung ohne Grund",
            text: "Ständige Müdigkeit oder plötzliche Leere. Oft ein Hinweis, dass Ihre Grenzen schon länger übergangen werden.",
          },
          {
            title: "Der Impuls zu fliehen",
            text: "Unruhe, Zappeligkeit oder der starke Impuls, sofort weg zu wollen. Auch das kann ein Warnsignal sein.",
          },
        ],
      },
      {
        title: "Abschluss",
        calloutTitle: "Frage zur Selbstbeobachtung",
        calloutText:
          "Welches Signal kennen Sie am besten und in welchen Situationen taucht es immer wieder auf?",
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
      "Die LMK-Methode hilft, nach wiederholten Grenzverletzungen konsequent zu bleiben, ohne in Drohlogik zu geraten. Sie verbindet Lage, Mitteilung und Konsequenz.",
      "Sie finden drei Stufen: Grenze setzen, die eigene Kontrolle klären, logische Konsequenz ankündigen und bei Bedarf handeln. Dazu kommen eine kurze Merkhilfe und drei Hinweise für die Umsetzung.",
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
          "«Wenn du weiter schreist, gehe ich in mein Zimmer.»",
          "«Wenn das nochmals passiert, schlafe ich heute woanders.»",
        ],
      },
      {
        title: "Stufe 3: Handeln",
        calloutTitle: "Umsetzung",
        calloutText:
          "Setzen Sie die Konsequenz ruhig und ohne Vorwurf um. Nicht drohen, sondern tun.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Sie können Grenzen setzen. Sie können Konsequenzen umsetzen. Sie können nicht das Verhalten des anderen ändern.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Der Drehpunkt von LMK",
        calloutText:
          "Sie kontrollieren nicht das Verhalten der anderen Person, sondern nur Ihre Grenze und die Konsequenz, die Sie danach wirklich umsetzen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie vorab zwei oder drei logische, machbare Konsequenzen.",
          "Besprechen Sie diese möglichst in einem ruhigen Moment.",
          "Setzen Sie die Konsequenz ruhig um, ohne danach in eine neue Diskussion einzusteigen.",
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
      "Genesung in Zahlen stützt Hoffnung auf belastbare Verlaufsdaten, ohne den Weg zu romantisieren. Die Zahlen helfen, Fortschritt realistischer einzuordnen.",
      "Sie finden drei zentrale Kennzahlen, eine grobe zeitliche Einordnung, die Kernaussage des Handouts und drei konkrete Hinweise für den Alltag von Angehörigen.",
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
        title: "Begriffe kurz eingeordnet",
        calloutTitle: "Was die Grafik mit den Begriffen meint",
        calloutText:
          "Remission meint eine deutliche Abnahme der Symptome. Recovery beschreibt vollständige Genesung. Anhaltende Remission meint eine stabilere Besserung über längere Zeit.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Teilen Sie diese Zahlen mit Ihrem Angehörigen, wenn der Moment passt.",
          "Erinnern Sie sich: Rückschläge gehören zum Prozess und entwerten Fortschritt nicht automatisch.",
          "Bleiben Sie geduldig – Genesung ist eher ein Marathon als ein Sprint.",
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
      "Das Fortschritt-Paradox erklärt, warum Rückschritte den bisherigen Weg nicht automatisch entwerten. Es hilft, Einbrüche realistischer einzuordnen.",
      "Zuerst steht die Kernaussage im Vordergrund, danach folgen drei kurze Einordnungen und konkrete Hinweise für den Alltag.",
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
      "Remission und Heilung werden im Alltag oft vermischt. Diese Einordnung hilft, Besserung differenzierter und weniger schwarz-weiss zu verstehen.",
      "Heilung und Remission werden bewusst gegenübergestellt und mit einer knappen Kernaussage sowie drei alltagsnahen Hinweisen ergänzt.",
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
      "Die fünf Faktoren verbinden Hoffnung mit einem realistischen Blick auf wirksame Einflussfaktoren. Sie zeigen, was Entwicklung begünstigen kann, ohne sie zu garantieren.",
      "Sie finden fünf Faktoren, eine Kernaussage und drei Hinweise dazu, wie Angehörige den Prozess hilfreich begleiten können.",
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
      "Die Rolle von Angehörigen im Genesungsprozess ist wichtig, aber begrenzt. Diese Orientierung hilft, den eigenen Beitrag klarer von Überverantwortung zu unterscheiden.",
      "Sie finden hilfreiche Beiträge, klare Nicht-Aufgaben, die Kernbotschaft des Blatts und drei kurze Selbstchecks für den Alltag.",
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
        title: "Orientierung",
        calloutTitle: "Worum es bei Ihrer Rolle geht",
        calloutText:
          "Hilfreich ist, was Stabilität, Hoffnung und professionelle Unterstützung stärkt. Nicht Ihre Aufgabe ist es, Therapie zu ersetzen oder Genesung zu erzwingen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Prüfen Sie regelmässig: Bin ich noch in meiner Rolle oder rutsche ich in Überverantwortung?",
          "Sprechen Sie mit Fachpersonen, wenn Sie bei Zuständigkeiten oder Grenzen unsicher sind.",
          "Erinnern Sie sich: Ihre Stabilität ist Ihr wichtigster Beitrag.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Gunderson et al., Family Guidelines; Mason & Kreger (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("kinder", {
    kicker: "Textversion",
    summary:
      "Kinder merken meist, dass etwas anders ist. Eine altersgerechte Erklärung schafft Sicherheit, nimmt Schuld und stärkt das Vertrauen.",
    intro: [
      "Wenn Kinder grosse Gefühle in der Familie miterleben, brauchen sie einfache Worte und verlässliche Entlastung. Diese Orientierung unterstützt Angehörige beim kindgerechten Erklären und Schützen.",
      "Sie finden zuerst die entlastende Grundhaltung, dann altersbezogene Erklärungen, Hinweise für Geschwisterkinder, Schutzfaktoren und einen Merksatz, der Kinder konsequent von Verantwortung entlastet.",
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
      "Der Spickzettel Grenzen bündelt kurze Satzmuster für schwierige Gespräche. Er ist dafür gedacht, vor einem Gespräch schnell die wichtigsten Formulierungen durchzugehen.",
      "Die vier Bereiche sind direkt nutzbar aufgebaut: DEAR-Technik, Beispielsätze bei Grenzüberschreitungen, Spiegeln statt Aufsaugen und die L.M.K.-Exit-Strategie.",
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
