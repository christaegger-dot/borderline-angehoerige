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
      "Besserung ist möglich. Symptomatische Remission, Alltag und Teilhabe sowie persönliche Recovery beschreiben unterschiedliche Aspekte und müssen sich nicht gleichzeitig verändern.",
    intro: [
      "Forschung und Versorgung verwenden unterschiedliche Begriffe für Veränderung. Dieses Blatt trennt symptomatische Remission, Alltag und Teilhabe sowie persönliche Recovery.",
      "Keiner dieser Begriffe bewertet den Wert eines Menschen oder schreibt ein bestimmtes Ziel oder Tempo vor.",
    ],
    sections: [
      {
        title: "Symptomatische Remission",
        bullets: [
          "In Verlaufsstudien bedeutet symptomatische Remission, dass die Diagnosekriterien während eines festgelegten Zeitraums nicht mehr erfüllt sind.",
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
          "«Heilung» wird unterschiedlich verstanden.",
          "Studien und Leitlinien sprechen meist nicht von «Heilung», sondern genauer von Remission, Alltag und Teilhabe, Lebensqualität oder persönlicher Recovery.",
          "Eine Einteilung in «geheilt» oder «für immer krank» wird individuellen Verläufen nicht gerecht.",
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Veränderung hat mehrere Seiten",
        calloutText:
          "Beschwerden, Alltag und Teilhabe, Lebensqualität und persönliche Recovery können sich unterschiedlich entwickeln. Ein einzelner Begriff beschreibt nicht den ganzen Genesungsweg.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Vermeiden Sie Vorgaben von aussen dazu, wie schnell oder wie weit Veränderung gehen soll.",
          "Fragen Sie – wenn die Person darüber sprechen möchte –, welche Veränderungen für sie selbst bedeutsam sind, statt Fortschritt von aussen festzulegen.",
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
      "Sie beschreiben mögliche persönliche, soziale und professionelle Einflussbereiche. Angehörige müssen keinen dieser Bereiche herstellen oder absichern.",
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
            text: "Körperliche Beschwerden und weitere psychische Erkrankungen werden eigenständig behandelt, bei Bedarf auch mit Medikamenten. Für Borderline selbst sind Medikamente keine Kernbehandlung; Änderungen nur mit der behandelnden Fachperson.",
          },
          {
            title: "Gewählte Beziehungen und Unterstützung",
            text: "Soziale, praktische oder Peer-Unterstützung kann hilfreich sein, wenn sie gewünscht ist. Angehörige müssen Genesung nicht absichern.",
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
          "Die fünf Bereiche sind eine Orientierung ohne Reihenfolge. Welche Bereiche wichtig sind und welche Unterstützung passt, bestimmt die betroffene Person selbst.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Fragen Sie, ob und welche Unterstützung überhaupt gewünscht ist.",
          "Bieten Sie nur an, was für Sie freiwillig, möglich und sicher ist.",
          "Praktische oder strukturelle Belastungen (z. B. Wohnen, Finanzen) lassen sich oft nicht innerhalb der Familie lösen; Sozialberatungen können unterstützen.",
          "Erinnern Sie sich: Genesung ist individuell und keine Leistung der Familie.",
        ],
      },
    ],
    sourceLine:
      "Quellen: APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024); NICE CG78; AWMF-S3 Psychosoziale Therapien bei schweren psychischen Erkrankungen (2025), Kap. 7.2. Redaktionelle Orientierung und Synthese, kein validiertes Fünf-Faktoren-Modell.",
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
      "Dieses Blatt richtet sich an Angehörige erwachsener Personen. Eltern Minderjähriger und Personen mit Beistandschaft oder ausdrücklich übernommenen Aufgaben klären ihre Rolle mit den Fachpersonen.",
    ],
    sections: [
      {
        title: "Was Sie freiwillig anbieten können",
        cards: [
          {
            title: "Absprachen",
            text: "Absprachen anbieten, soweit Sie diese einhalten können, und fragen, was gewünscht ist.",
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
            text: "Auf Wunsch Informationen oder Begleitung anbieten. Urteilsfähige Erwachsene entscheiden selbst über ihre Behandlung, gemeinsam mit den Behandelnden.",
          },
        ],
      },
      {
        title: "Was nicht Ihre Aufgabe ist",
        cards: [
          {
            title: "Fachliche Behandlung übernehmen",
            text: "Angehörige ersetzen keine Behandlung und müssen sie nicht koordinieren – ausser etwa als Eltern Minderjähriger oder Beistand.",
          },
          {
            title: "Genesung bewirken",
            text: "Genesung lässt sich nicht erzwingen und hängt von persönlichen, sozialen, materiellen und professionellen Bedingungen ab. Ein schwieriger Verlauf ist kein Beleg für fehlenden Willen.",
          },
          {
            title: "Immer verfügbar sein",
            text: "Sie brauchen auch Pausen. Eine Pause ist kein Beziehungsabbruch.",
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
          "Allgemeine Beratung ist auch ohne Zustimmung der betroffenen Person möglich; Auskünfte über ihre Behandlung nur mit ihrer Zustimmung. Bei Minderjährigen oder fehlender Urteilsfähigkeit gelten besondere Regeln.",
          "Erinnern Sie sich: Ihre Gesundheit zählt für sich – nicht erst als Beitrag zur Genesung einer anderen Person.",
        ],
      },
    ],
    sourceLine:
      "Quellen: APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024); NICE CG78; NICE NG150.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
];
