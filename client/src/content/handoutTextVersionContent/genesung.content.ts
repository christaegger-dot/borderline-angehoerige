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
];
