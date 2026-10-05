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
      "Besserung ist möglich. Diagnostische Remission, Alltag und Teilhabe sowie persönliche Recovery beschreiben unterschiedliche Aspekte und müssen sich nicht gleichzeitig verändern.",
    intro: [
      "Forschung und Versorgung verwenden unterschiedliche Begriffe für Veränderung. Dieses Blatt trennt diagnostische Remission, Alltag und Teilhabe sowie persönliche Recovery.",
      "Keiner dieser Begriffe bewertet den Wert eines Menschen oder schreibt ein bestimmtes Ziel oder Tempo vor.",
    ],
    sections: [
      {
        title: "Diagnostische Remission",
        bullets: [
          "In Verlaufsstudien bedeutet Remission, dass die Diagnosekriterien während eines festgelegten Zeitraums nicht mehr erfüllt sind.",
          "Die genaue Definition und die verlangte Dauer unterscheiden sich zwischen Studien.",
          "Remission bedeutet nicht automatisch, dass alle Beschwerden verschwunden sind oder keine Unterstützung mehr nötig ist.",
        ],
      },
      {
        title: "Alltag und Teilhabe",
        bullets: [
          "Beziehungen, Arbeit oder Ausbildung, Wohnen und Alltag sind eigene Lebensbereiche.",
          "Sie können sich anders und in einem anderen Tempo verändern als Symptome.",
          "Erneute Beschwerden oder Belastungen machen bereits erreichte Veränderungen nicht ungeschehen.",
        ],
      },
      {
        title: "Persönliche Recovery",
        bullets: [
          "Persönliche Recovery beschreibt einen individuellen Weg zu einem selbstbestimmten und als sinnvoll erlebten Leben.",
          "Dazu können Hoffnung, Verbundenheit, Identität, Teilhabe und eigene Handlungsmöglichkeiten gehören.",
          "Welche Ziele bedeutsam sind, bestimmt die betroffene Person selbst.",
        ],
      },
      {
        title: "Zum Begriff «Heilung»",
        bullets: [
          "«Heilung» wird unterschiedlich verstanden und ist bei Borderline kein einheitlich definierter wissenschaftlicher Endpunkt.",
          "Für sachliche Informationen sind präzisere Begriffe wie Remission, Funktionsfähigkeit, Lebensqualität und persönliche Recovery hilfreicher.",
          "Eine Einteilung in «geheilt» oder «für immer krank» wird individuellen Verläufen nicht gerecht.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Veränderung hat mehrere Seiten",
        calloutText:
          "Symptome, Funktionsfähigkeit, Lebensqualität und persönliche Recovery können sich unterschiedlich entwickeln. Ein einzelner Begriff beschreibt nicht den ganzen Genesungsweg.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Vermeiden Sie Vorgaben von aussen dazu, wie schnell oder wie weit Veränderung gehen soll.",
          "Fragen Sie die Person, welche Veränderungen für sie selbst bedeutsam sind, statt Fortschritt von aussen festzulegen.",
          "Nehmen Sie erneute Belastungen ernst, ohne sie als persönliches Scheitern zu deuten.",
          "Achten Sie zugleich auf Ihre eigenen Grenzen und Ihren Unterstützungsbedarf.",
        ],
      },
    ],
    sourceLine:
      "Quellen: APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024); NICE CG78; Zanarini et al. (2012, 2024); AWMF-S3 Psychosoziale Therapien bei schweren psychischen Erkrankungen (2025), Kap. 7.2.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
  createHandoutTextVersion("5-faktoren-genesung", {
    kicker: "Textversion",
    summary:
      "Behandlung, körperliche und psychische Gesundheit, gewünschte Beziehungen, Lebensbedingungen und der individuelle Verlauf können bedeutsam sein. Ihre Bedeutung ist von Person zu Person verschieden.",
    intro: [
      "Die fünf Bereiche sind eine redaktionelle Orientierung, kein validiertes Vorhersagemodell und keine Rangliste.",
      "Sie beschreiben mögliche persönliche, soziale und professionelle Bedingungen. Angehörige müssen keinen dieser Bereiche herstellen oder absichern.",
    ],
    sections: [
      {
        title: "Fünf mögliche Bereiche",
        cards: [
          {
            title: "Strukturierte Behandlung",
            text: "Ein personenzentrierter Behandlungsplan und eine strukturierte Psychotherapie können zentrale Bestandteile der Behandlung sein.",
          },
          {
            title: "Körperliche und psychische Gesundheit",
            text: "Körperliche Beschwerden und weitere psychische Erkrankungen werden als eigenständige Themen berücksichtigt. Medikamente sind kein allgemeiner Genesungsfaktor.",
          },
          {
            title: "Gewählte Beziehungen und Unterstützung",
            text: "Soziale oder praktische Unterstützung kann hilfreich sein, wenn sie gewünscht ist. Angehörige müssen Genesung nicht absichern.",
          },
          {
            title: "Lebensbedingungen und Teilhabe",
            text: "Wohnen, finanzielle Sicherheit, Ausbildung oder Arbeit, sinnvolle Tätigkeiten und der Zugang zu Hilfe können entlasten oder belasten.",
          },
          {
            title: "Zeit und individueller Verlauf",
            text: "Veränderung hat keinen festen Zeitplan und verläuft nicht nach einer vorgeschriebenen Reihenfolge.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Keine Fünf-Punkte-Formel",
        calloutText:
          "Die fünf Bereiche sind eine Orientierung. Ziele, Prioritäten und gewünschte Unterstützung werden mit der betroffenen Person geklärt.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Fragen Sie, ob und welche Unterstützung überhaupt gewünscht ist.",
          "Bieten Sie nur an, was für Sie freiwillig, möglich und sicher ist.",
          "Behalten Sie auch praktische oder strukturelle Belastungen im Blick; nicht alles lässt sich innerhalb einer Familie lösen.",
          "Erinnern Sie sich: Genesung ist individuell und keine Leistung der Familie.",
        ],
      },
    ],
    sourceLine:
      "Quellen: APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024); NICE CG78. Redaktionelle Orientierung, kein validiertes Fünf-Faktoren-Modell.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
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
            text: "Auf Wunsch Informationen oder Begleitung anbieten. Über Behandlung entscheidet die betroffene Person gemeinsam mit den Behandelnden.",
          },
        ],
      },
      {
        title: "Was nicht Ihre Aufgabe ist",
        cards: [
          {
            title: "Fachliche Behandlung übernehmen",
            text: "Angehörige ersetzen keine Behandlung und müssen sie nicht koordinieren.",
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
            text: "Sie können freiwillig unterstützen. Für den Genesungsweg sind Sie nicht verantwortlich.",
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
          "Prüfen Sie regelmässig: Ist das, was ich anbiete, gewünscht, freiwillig, sicher und für mich tragbar?",
          "Sprechen Sie mit Fachpersonen, wenn Sie bei Zuständigkeiten oder Grenzen unsicher sind.",
          "Erinnern Sie sich: Ihre Gesundheit ist kein Beitrag, den Sie einer anderen Person schulden.",
        ],
      },
    ],
    sourceLine:
      "Quellen: APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024); NICE CG78; NICE NG150.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
];
