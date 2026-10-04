import learningGuides from "../learningGuides.json";
import revisedHandouts from "@/content/revisedHandouts.json";
import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("garten", learningGuides["garten"]),
  createHandoutTextVersion(
    "genesung-zahlen",
    revisedHandouts["genesung-zahlen"]
  ),
  createHandoutTextVersion("fortschritt-paradox", {
    kicker: "Textversion",
    summary:
      "Veränderung kann unterschiedlich verlaufen. Schwierigere Phasen können vorkommen, ohne frühere Erfahrungen und Fähigkeiten ungeschehen zu machen.",
    intro: [
      "Genesungswege sind individuell und folgen keinem festgelegten Muster. Die Darstellung hilft, schwierigere Phasen einzuordnen, ohne daraus einen vorgeschriebenen Verlauf abzuleiten.",
      "Zuerst steht die Kernaussage im Vordergrund, danach folgen drei kurze Einordnungen und konkrete Hinweise für den Alltag.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Genesungswege unterscheiden sich. Schwierigere Phasen können vorkommen und müssen ernst genommen werden; sie sind weder vorgeschrieben noch ein Beleg für fehlenden Willen.",
      },
      {
        title: "Wichtige Einordnungen",
        cards: [
          {
            title: "Veränderung braucht Zeit",
            text: "Veränderung braucht Zeit und Geduld.",
          },
          {
            title: "Schwierigere Phasen entwerten nicht alles",
            text: "Eine schwierigere Phase bedeutet nicht, dass alles Erreichte verloren ist.",
          },
          {
            title: "Individuelle Bedeutung",
            text: "Die betroffene Person bestimmt selbst, welche Veränderung bedeutsam ist und ob sie Unterstützung neu klären möchte.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Fragen Sie die betroffene Person, was die aktuelle Phase für sie bedeutet, statt den Verlauf von aussen zu bewerten.",
          "Nehmen Sie erneute Belastungen ernst, ohne sie als persönliches Scheitern zu deuten.",
          "Achten Sie auch auf Ihre eigenen Grenzen und holen Sie bei Bedarf Unterstützung.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Zanarini, M. C. et al. (2012); Mason, P. T. & Kreger, R. (2014).",
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
          "Symptome können deutlich zurückgehen; Funktionsfähigkeit und Lebensqualität können sich verbessern. Welche Veränderungen bedeutsam sind, bestimmt die betroffene Person selbst.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Vermeiden Sie Vorgaben von aussen dazu, wie schnell oder wie weit Veränderung gehen soll.",
          "Fragen Sie die Person, welche Veränderungen für sie selbst bedeutsam sind, statt Fortschritt von aussen festzulegen.",
          "Verläufe unterscheiden sich. Anhaltende Beschwerden können mit Fachpersonen besprochen werden, wenn die betroffene Person das möchte.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Zanarini, M. C. et al. (2012); in Anlehnung an Paris, J. (2020).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("5-faktoren-genesung", {
    kicker: "Textversion",
    summary:
      "Behandlung, körperliche Gesundheit, Beziehungen, Lebensbedingungen und Zeit können Genesungswege beeinflussen. Welche Faktoren wichtig sind, ist individuell.",
    intro: [
      "Die fünf Bereiche sind eine vereinfachte Orientierung, keine Formel für Genesung und keine Rangliste von Verantwortlichkeiten.",
      "Sie beschreiben mögliche persönliche, soziale und professionelle Bedingungen. Angehörige müssen keinen dieser Bereiche herstellen oder absichern.",
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
            title: "Körperliche und medikamentöse Behandlung",
            text: "Je nach Situation und gemeinsamer fachlicher Entscheidung.",
          },
          {
            title: "Soziales Umfeld",
            text: "Gewünschte Beziehungen, Gemeinschaft und praktische Unterstützung.",
          },
          {
            title: "Lebensqualität",
            text: "Sinnvolle Aktivitäten und Struktur.",
          },
          {
            title: "Zeit",
            text: "Verläufe und Zeiträume sind individuell.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Genesung ist ein individueller Prozess. Behandlungssystem, Lebensbedingungen und soziale Beziehungen können mitwirken; die Verantwortung liegt nicht bei Angehörigen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Fragen Sie, ob und welche Unterstützung überhaupt gewünscht ist.",
          "Bieten Sie nur an, was für Sie freiwillig, möglich und sicher ist.",
          "Erinnern Sie sich: Genesung ist individuell und keine Leistung der Familie.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Zanarini, M. C. et al. (2012); in Anlehnung an Paris, J. (2020).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("rolle-genesungsprozess", {
    kicker: "Textversion",
    summary:
      "Angehörige können auf Wunsch etwas anbieten, sind aber nicht für Genesung verantwortlich. Die eigene Gesundheit und das eigene Leben haben einen eigenständigen Wert.",
    intro: [
      "Beziehungen können Genesungswege berühren, doch es gibt keine einheitliche Angehörigenrolle. Diese Orientierung trennt freiwillige Angebote von Erwartungen und Überverantwortung.",
      "Sie finden mögliche Angebote, klare Nicht-Aufgaben und drei kurze Selbstchecks für den Alltag.",
    ],
    sections: [
      {
        title: "Was Sie freiwillig anbieten können",
        cards: [
          {
            title: "Absprachen",
            text: "Gemeinsame Absprachen anbieten, soweit Sie diese einhalten können.",
          },
          {
            title: "Zuversicht",
            text: "Eigene Zuversicht teilen, wenn das gewünscht ist – ohne Druck oder Versprechen.",
          },
          {
            title: "Eigene Grenzen",
            text: "Benennen, was Sie übernehmen können und was nicht.",
          },
          {
            title: "Nachfragen",
            text: "Die Person selbst fragen, welche Veränderungen für sie bedeutsam sind.",
          },
          {
            title: "Information anbieten",
            text: "Auf Wunsch Informationen oder Begleitung zu Angeboten bereitstellen; Behandlung bleibt die Entscheidung der Person und des Fachteams.",
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
            text: "Genesung lässt sich nicht erzwingen und hängt von persönlichen, sozialen, materiellen und professionellen Bedingungen ab. Ein schwieriger Verlauf ist kein Beleg für fehlenden Willen.",
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
            text: "Ihre Gesundheit und Ihr eigenes Leben zählen unabhängig vom Genesungsweg einer anderen Person.",
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
          "Sie können Beziehung und Unterstützung mitgestalten, wenn alle Beteiligten das möchten. Sie müssen weder Hoffnung erzeugen noch Behandlung steuern oder Genesung absichern.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Prüfen Sie regelmässig: Bin ich noch in meiner Rolle oder rutsche ich in Überverantwortung?",
          "Sprechen Sie mit Fachpersonen, wenn Sie bei Zuständigkeiten oder Grenzen unsicher sind.",
          "Erinnern Sie sich: Ihre Gesundheit ist kein Beitrag, den Sie einer anderen Person schulden.",
        ],
      },
    ],
    sourceLine:
      "Quelle: Berkowitz, C. & Gunderson, J. G., Family Guidelines; Mason, P. T. & Kreger, R. (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
