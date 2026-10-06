import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("notfallplan-krise", {
    kicker: "Textversion",
    summary:
      "Konkrete Orientierung für Angehörige bei Suizidgedanken, Selbstverletzung oder akuter seelischer Krise: Beobachtungen ernst nehmen, direkt ansprechen und professionelle Hilfe einbeziehen.",
    intro: [
      "Diese Seite macht den «Notfallplan bei psychischer Krise» direkt lesbar. Die Orientierung bleibt bewusst nah am Notfallplan, damit wichtige Hinweise auch ohne PDF-Ansicht schnell zugänglich sind.",
      "Der Notfallplan richtet sich an Angehörige, wenn Suizidgedanken, Selbstverletzung oder eine akute psychische Krise im Raum stehen. Er ersetzt keine professionelle Beurteilung, soll aber helfen, in einer belastenden Situation klarer zu handeln.",
      "Selbstverletzung kann ohne Todesabsicht erfolgen, schliesst Suizidgedanken aber nicht aus. Auch eine klein wirkende Verletzung erlaubt keine Entwarnung. Sie müssen die Dringlichkeit nicht selbst beurteilen; holen Sie bei Sorge professionelle Einschätzung.",
    ],
    sections: [
      {
        title: "Bei Sorge um Sicherheit oder Unsicherheit",
        intro:
          "Diese Textversion nimmt keine Risikoeinschätzung vor und enthält keine Kontaktdaten. Passende Anlaufstellen finden Sie unter «Akute Hilfe und Notfallkontakte».",
      },
      {
        title: "Wichtiger Soforthinweis",
        calloutTitle: "Sicherheit vor Diskussion",
        calloutText:
          "Holen Sie bei möglicher unmittelbarer Gefahr zuerst professionelle Hilfe und folgen Sie den Anweisungen der Leitstelle. Bleiben Sie nur bei der Person oder in Kontakt, soweit dies für Sie sicher und möglich ist; daraus entsteht keine alleinige Überwachungs- oder Sicherungspflicht. Begrenzen Sie den Zugang zu Medikamenten, Alkohol oder gefährlichen Gegenständen nur ohne Eigengefährdung, möglichst gemeinsam und nach Anleitung der Leitstelle. Nehmen Sie nichts gegen Widerstand weg und greifen Sie nicht körperlich ein.",
      },
      {
        title:
          "4 Schritte in der Krise – wenn jemand Suizidgedanken äussert oder sich selbst verletzt",
        cards: [
          {
            title: "1. Eigenes Tempo reduzieren",
            text: "Ihre Angst ist verständlich. Wenn es Ihnen möglich ist, atmen Sie bewusst und sprechen Sie langsam. Das kann Ihnen helfen, Beobachtungen klar zu benennen und professionelle Hilfe einzubeziehen. Sie müssen weder vollkommen ruhig sein noch die Krise des anderen Menschen regulieren.",
          },
          {
            title: "2. Ernst nehmen und direkt ansprechen",
            text: "Jede Äusserung über Suizid oder Selbstverletzung sollte ernst genommen werden. Fragen Sie ausdrücklich: «Denkst du gerade daran, dir das Leben zu nehmen?» Nach bisherigem Forschungsstand verstärkt direktes Fragen Suizidgedanken nicht. Wenn Selbstverletzung im Raum steht, können Sie zusätzlich fragen: «Denkst du gerade daran, dich zu verletzen?» Warten Sie mit dem Hilfeholen nicht auf vollständige Antworten.",
          },
          {
            title: "3. Zuhören und Gefühle anerkennen",
            text: "Hören Sie zu, ohne vorschnell zu beruhigen, zu argumentieren oder sofort Lösungen anzubieten. Es geht zuerst darum, die Not wahrzunehmen. Beispiele: «Ich sehe, dass es dir gerade sehr schlecht geht.» und «Du musst das gerade nicht allein aushalten.»",
          },
          {
            title: "4. Professionelle Hilfe einbeziehen",
            text: "Sie müssen diese Situation nicht allein tragen oder beurteilen. Ziehen Sie professionelle Hilfe bei und folgen Sie den Anweisungen der Fachpersonen. Informieren Sie wenn möglich die behandelnde Fachperson oder nutzen Sie die zentrale Seite «Akute Hilfe und Notfallkontakte». Suizidgedanken und akute Selbstgefährdung sollten nicht als Geheimnis mitgetragen werden.",
          },
        ],
      },
      {
        title: "Das hilft",
        bullets: [
          "früh professionelle Hilfe holen und klare Beobachtungen weitergeben",
          "den Anweisungen der Leitstelle folgen und nur dann dableiben, wenn es für Sie sicher und möglich ist",
          "direkt und klar nachfragen",
          "Gefühle ernst nehmen und anerkennen",
          "die professionelle Einschätzung einer möglichen Gefährdung veranlassen",
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
          "versuchen, die Gefahr allein zu beurteilen oder die Person ohne professionelle Hilfe zu überwachen",
          "selbst in einer unsicheren oder bedrohlichen Situation bleiben",
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
          "Nach einer akuten Situation kann fachliche Nachsorge nötig sein. Bei erneuter Sorge um Sicherheit finden Sie passende Anlaufstellen unter «Akute Hilfe und Notfallkontakte». Angehörige müssen den Verlauf weder überwachen noch eine weitere Krise vorhersagen. Mögliche nächste Schritte sind:",
        bullets: [
          "mit der betroffenen Person und, wenn sie einverstanden ist, mit der Fachperson klären, welche Nachsorge vorgesehen ist",
          "die betroffene Person fragen, welche Unterstützung jetzt gewünscht ist oder nicht",
          "eigene Unterstützung für Angehörige organisieren",
          "einen vereinbarten professionellen Hilfeweg für erneute Sorge griffbereit halten",
          "Beobachtungen oder Wünsche nur freiwillig festhalten; es besteht keine Pflicht, Warnzeichen zu überwachen oder einen Auslöser zu bestimmen",
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
          "Passende Anlaufstellen für Angehörige finden Sie unter «Akute Hilfe und Notfallkontakte».",
          "eigene Gefühle (Angst, Wut, Erschöpfung) zulassen",
        ],
      },
      {
        title: "Akute Hilfe und Notfallkontakte",
        intro:
          "Diese Übersicht enthält keine Kontaktdaten. Die aktuellen Anlaufstellen finden Sie auf der zentralen Soforthilfe-Seite.",
      },
      {
        title: "Wichtiger Hinweis",
        calloutTitle: "Orientierung, kein Ersatz für Notfallbeurteilung",
        calloutText:
          "Dieser Notfallplan ersetzt keine professionelle Beurteilung und keine psychiatrische Diagnose. Er dient der allgemeinen Orientierung. Aktuelle Anlaufstellen finden Sie auf der zentralen Soforthilfe-Seite.",
      },
    ],
    sourceLine:
      "Quellen: Berkowitz, C. & Gunderson, J. G., BPD Family Guidelines (NEABPD); Project Air Strategy, Understanding Self-Harm & Suicidal Thinking for Families & Carers; Dazzi et al. (2014), PMID 24998511; NICE NG225 (2022), Self-harm: assessment, management and preventing recurrence.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Redaktionell aktualisiert: 06.10.2026; erneute Fachprüfung ausstehend.",
  }),
];
