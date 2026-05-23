import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
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
            text: "erreichen in grossen Längsschnittstudien innerhalb von etwa 10 Jahren eine symptomatische Remission. Die genaue Zahl hängt von Definition und Stichprobe ab.",
          },
          {
            title: "Recovery",
            text: "umfasst mehr als Symptomrückgang: soziale, berufliche oder alltagsbezogene Stabilität. Diese umfassendere Genesung ist seltener als reine Remission.",
          },
          {
            title: "Langzeitverlauf",
            text: "Langzeitdaten zeigen, dass Remission häufig stabil bleiben kann. Einzelne Prozentwerte sind ohne Studienkontext keine individuelle Prognose.",
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
          "Remission meint eine deutliche Abnahme der Symptome. Recovery beschreibt zusätzlich mehr Stabilität in Alltag, Beziehungen, Arbeit oder Ausbildung. Diese Zahlen stammen aus Längsschnittstudien und sind keine individuelle Prognose.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Teilen Sie diese Zahlen nur dann, wenn sie entlasten und nicht Druck machen.",
          "Erinnern Sie sich: Rückschläge können vorkommen und entwerten Fortschritt nicht automatisch.",
          "Bleiben Sie geduldig – Genesung ist eher ein Marathon als ein Sprint.",
        ],
      },
    ],
    sourceLine:
      "Quellen: Zanarini et al. (2010/2012); Gunderson et al. (2011).",
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
          "Genesung verläuft selten linear. Rückschritte können Teil eines Veränderungsprozesses sein und müssen trotzdem ernst genommen werden.",
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
            text: "Ein Rückschritt bedeutet nicht, dass alles Erreichte verloren ist.",
          },
          {
            title: "Der Weg zurück",
            text: "Manchmal gelingt der Weg zurück in Stabilität schneller, manchmal braucht es erneut Unterstützung.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Ordnen Sie Rückfälle als mögliches Signal ein, nicht als persönliches Scheitern.",
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
      "Symptome können deutlich zurückgehen, und Alltag, Beziehungen sowie Lebensqualität können stabiler werden. Remission, Recovery und Heilung bedeuten nicht dasselbe.",
    intro: [
      "Remission und Heilung werden im Alltag oft vermischt. Diese Einordnung hilft, Besserung differenzierter und weniger schwarz-weiss zu verstehen.",
      "Heilung und Remission werden bewusst gegenübergestellt und mit einer knappen Kernaussage sowie drei alltagsnahen Hinweisen ergänzt.",
    ],
    sections: [
      {
        title: "Heilung",
        bullets: [
          "Wird im Alltag oft als «alles ist weg» verstanden.",
          "Ist bei Borderline kein einheitlich definierter Forschungsbegriff.",
          "Sollte nicht als Versprechen oder als Gegenpol zu «für immer krank» verwendet werden.",
        ],
      },
      {
        title: "Remission",
        bullets: [
          "Symptome deutlich reduziert.",
          "Krisen werden seltener oder weniger intensiv.",
          "Der Alltag wird besser handhabbar.",
        ],
      },
      {
        title: "Recovery",
        bullets: [
          "Symptomverbesserung plus mehr Funktionsfähigkeit.",
          "Mehr Stabilität in Beziehungen, Arbeit, Ausbildung oder Alltag.",
          "Ein individueller Prozess, nicht nur eine Zahl.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Symptome können deutlich zurückgehen; Funktionsfähigkeit und Lebensqualität können sich verbessern. Das ist ein grosser Erfolg, auch wenn Entwicklung selten perfekt oder linear ist.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Setzen Sie realistische Erwartungen: Besserung ja, Perfektion nein.",
          "Feiern Sie kleine Fortschritte, statt nur auf ein Alles-oder-nichts-Ergebnis zu schauen.",
          "Akzeptieren Sie, dass manche Muster bleiben können – aber handhabbar werden.",
        ],
      },
    ],
    sourceLine: "Quelle: Zanarini et al. (2012); in Anlehnung an Paris (2020).",
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
          "Genesung ist möglich – und Angehörige können beeinflussbare Faktoren unterstützen. Sie können den Prozess aber nicht garantieren oder alleine herstellen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Prüfen Sie: Welchen Faktor können Sie unterstützen?",
          "Konzentrieren Sie sich auf das Beeinflussbare.",
          "Erinnern Sie sich: Genesung ist individuell und selten linear.",
        ],
      },
    ],
    sourceLine: "Quelle: Zanarini et al. (2012); in Anlehnung an Paris (2020).",
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
          "Hilfreich ist, was Stabilität, Hoffnung und professionelle Unterstützung stärkt. Sie können Rahmen und Beziehung mitgestalten; Sie können Genesung nicht machen.",
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
];
