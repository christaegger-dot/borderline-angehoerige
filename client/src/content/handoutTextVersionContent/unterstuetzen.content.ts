import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("rolle-klaeren", {
    kicker: "Textversion",
    summary:
      "Sie können Unterstützung anbieten, wenn sie gewünscht und für Sie tragbar ist. Therapie, Kontrolle und Verantwortung für die Genesung gehören nicht zu Ihrer Rolle.",
    intro: [
      "Rollenklarheit hilft, freiwillige Unterstützung von Überverantwortung zu unterscheiden. Im Zentrum stehen drei Fragen: Was möchte und kann ich anbieten, was ist nicht meine Aufgabe, und wann braucht es professionelle Hilfe?",
      "Unterstützung kann unterschiedlich aussehen. Entscheidend ist, was die Beteiligten möchten, was für Sie möglich ist und was in der jeweiligen Situation sicher bleibt.",
    ],
    sections: [
      {
        title: "Was Sie anbieten können",
        intro:
          "Diese Möglichkeiten sind Angebote, keine Erwartungen. Sie dürfen sie an Ihre Beziehung, Ihre Kräfte und die Wünsche der betroffenen Person anpassen.",
        cards: [
          {
            title: "Absprachen anbieten",
            text: "Absprachen treffen und einhalten, soweit sie gemeinsam gewünscht und für Sie möglich sind.",
          },
          {
            title: "Zuhören anbieten",
            text: "Zuhören, wenn die andere Person das möchte und Sie dafür Raum haben.",
          },
          {
            title: "Übungsbegleitung",
            text: "Gemeinsam üben, wenn dies gewünscht und vereinbart ist.",
          },
          {
            title: "Zuversicht teilen",
            text: "Eigene Zuversicht teilen, ohne Druck, Versprechen oder Erwartung.",
          },
          {
            title: "Eigene Grenzen benennen",
            text: "Sagen, was Sie freiwillig übernehmen können und was nicht.",
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
            title: "Alles übernehmen",
            text: "Alle Probleme stellvertretend lösen.",
          },
          {
            title: "Kontrollinstanz",
            text: "Verhalten überwachen oder erzwingen.",
          },
          {
            title: "Alle Schuld übernehmen",
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
          "Therapie, Psychiatrie und Beratung werden von Fachpersonen angeboten. Sie müssen Behandlung, Krisenhilfe oder Kontrolle nicht übernehmen.",
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
            text: "Fragen Sie sich: Passt das noch zu dem, was ich freiwillig und sicher übernehmen kann?",
          },
          {
            title: "Mit Fachpersonen sprechen",
            text: "Holen Sie sich Rücksprache, wenn Sie unsicher sind oder die Rollen verschwimmen.",
          },
          {
            title: "Sich erinnern",
            text: "Ihre eigenen Bedürfnisse, Grenzen und Möglichkeiten zählen ebenfalls.",
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
      "Quelle: Berkowitz, C. & Gunderson, J. G., Family Guidelines; Mason, P. T. & Kreger, R. (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("drei-saeulen", {
    kicker: "Textversion",
    summary:
      "Drei freiwillige Fragen können Orientierung geben: Möchte und kann ich gerade präsent sein? Was hilft mir, mich selbst zu orientieren? Welche Grenze oder zusätzliche Unterstützung brauche ich?",
    intro: [
      "Die drei Bereiche Präsenz, Selbstorientierung und Grenze sind Wahlmöglichkeiten, keine Pflicht zu einer bestimmten Angehörigen-Haltung.",
      "Sie dürfen je nach Beziehung, Situation und eigener Kraft unterschiedlich gewichtet werden. Abstand, ein Gesprächsende oder professionelle Unterstützung können ebenfalls passende Schritte sein.",
    ],
    sections: [
      {
        title: "Die drei Säulen",
        intro:
          "Die Textversion beschreibt drei mögliche Orientierungspunkte. Keiner davon muss in jeder Situation erfüllt sein.",
        cards: [
          {
            title: "Präsenz – wenn ich da sein möchte.",
            text: "Zuhören oder ansprechbar sein kann ein Angebot sein, wenn es gewünscht und für Sie möglich ist.",
          },
          {
            title: "Selbstorientierung – ich darf pausieren.",
            text: "Eigene Gefühle und Grenzen wahrnehmen, Tempo herausnehmen oder das Gespräch beenden.",
          },
          {
            title: "Grenze – Ich schütze mich.",
            text: "Eigene Bedürfnisse ernst nehmen, Nein sagen und bei Bedarf Abstand oder Hilfe wählen.",
          },
        ],
      },
      {
        title: "Kernaussage",
        calloutTitle: "Worum es bei den drei Säulen geht",
        calloutText:
          "Die drei Bereiche helfen bei der Selbstklärung. Sie messen weder die Qualität einer Beziehung noch, ob Sie genug unterstützen.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Prüfen",
            text: "Fragen Sie sich, ob Sie gerade etwas anbieten möchten und können.",
          },
          {
            title: "2. Wählen",
            text: "Wählen Sie Präsenz, Pause, Grenze oder zusätzliche Hilfe – je nachdem, was passt.",
          },
          {
            title: "3. Nachjustieren",
            text: "Prüfen Sie später, was für Sie tragbar war. Sie dürfen Ihre Entscheidung verändern.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Mason, P. T. & Kreger, R. (2014); Gunderson, J. G. et al. (2011).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("konsistenz-prinzip", {
    kicker: "Textversion",
    summary:
      "Transparente, wiedererkennbare Absprachen können Orientierung geben. Sie dürfen an Situation, Sicherheit und Möglichkeiten der Beteiligten angepasst werden.",
    intro: [
      "Das Konsistenz-Prinzip zeigt, wie transparente und wiedererkennbare Absprachen Orientierung geben können. Es vergleicht mögliche Folgen klarer und unklarer Kommunikation, ohne eine bestimmte Reaktion vorherzusagen.",
      "Es geht nicht darum, dass alle immer gleich reagieren. Absprachen sollten die betroffene Person einbeziehen, soweit sie das möchte, und sich an Situation, Sicherheit und Möglichkeiten anpassen lassen.",
    ],
    sections: [
      {
        title: "Zwei Kommunikationssituationen im Vergleich",
        intro:
          "Die Textversion stellt mögliche Erfahrungen gegenüber. Sie beschreibt keine feste Ursache-Wirkungs-Kette.",
        cards: [
          {
            title: "Konsistenz",
            text: "Transparenz, Verlässlichkeit und ein hilfreicher Beziehungskreislauf.",
          },
          {
            title: "Gemeinsame Grenze",
            text: "Gemeinsam besprochene Grenzen können Rückfragen erleichtern. Unterschiedliche Grenzen bleiben erlaubt.",
          },
          {
            title: "Unklare oder wechselnde Absprachen",
            text: "Sie können für Beteiligte schwer verständlich sein. Was daraus folgt, ist individuell und nicht aus einer Diagnose ableitbar.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es beim Konsistenz-Prinzip geht",
        calloutText:
          "Wiedererkennbare Absprachen können Orientierung geben. Konsistenz bedeutet keine starre Einheitsreaktion und keine Garantie für eine bestimmte Wirkung.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Worum es bei Konsistenz wirklich geht",
        calloutText:
          "Nicht Härte macht den Unterschied, sondern transparente Abstimmung. Vereinbarungen dürfen verändert werden, wenn Bedürfnisse, Möglichkeiten oder Sicherheit es erfordern. Bei Gefahr oder Krise hat das Hilfeholen Vorrang.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Kurze Absprachen",
            text: "Klären Sie gemeinsam, wer was übernehmen möchte, wann eine Pause möglich ist und welche Grenzen gelten.",
          },
          {
            title: "2. Gemeinsam dranbleiben",
            text: "Wählen Sie ein oder zwei Absprachen, die für die Beteiligten verständlich und tragbar sind.",
          },
          {
            title: "3. Unterschiede transparent besprechen",
            text: "Besprechen Sie Unterschiede in einem ruhigen Moment und beziehen Sie Betroffene ein, soweit sie das möchten.",
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
      "Innehalten, beobachten, Unsicherheit anerkennen und bewusst wählen können helfen, aus automatischen Reaktionen auszusteigen.",
    intro: [
      "Beziehungs-Achtsamkeit übersetzt Achtsamkeit in vier freiwillige Schritte für angespannte Situationen: innehalten, beobachten, Deutungen offenlassen und einen nächsten Schritt wählen.",
      "Die Struktur ist ein Angebot, kein Auftrag zur Beruhigung oder zum Beziehungserhalt. Auch Abstand, ein Gesprächsende oder Hilfeholen können passende Entscheidungen sein.",
    ],
    sections: [
      {
        title: "4 Schritte im Alltag",
        intro:
          "Die Grafik beschreibt eine Reihenfolge, die helfen soll, vorschnelle Reaktionen zu unterbrechen.",
        cards: [
          {
            title: "Innehalten",
            text: "Moment mal – Stopp.",
          },
          {
            title: "Beobachten",
            text: "Was beobachte ich zwischen uns – und was geschieht in mir? Was über die andere Person weiss ich nicht?",
          },
          {
            title: "Deutungen offenlassen",
            text: "Eine Beobachtung ist nicht automatisch eine Erklärung. Eine Lösung muss nicht im selben Moment entstehen.",
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
          "Innehalten – beobachten – Unsicherheit anerkennen – bewusst wählen. Eigene Warnsignale und Sicherheit haben Vorrang.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Achtsamkeit als Reihenfolge",
        calloutText:
          "Die vier Schritte können Tempo aus automatischen Reaktionen nehmen: erst stoppen, dann beobachten, Deutungen offenlassen und eine Option wählen.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Ausprobieren",
            text: "Probieren Sie einen Schritt in einer kleinen Situation aus, wenn Sie das möchten.",
          },
          {
            title: "2. Unsicherheit benennen",
            text: "Trennen Sie, was Sie beobachtet haben, von dem, was Sie vermuten.",
          },
          {
            title: "3. Frei entscheiden",
            text: "Wählen Sie einen Satz, eine Grenze, eine Pause, ein Gesprächsende oder zusätzliche Hilfe.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Achtsamkeitsbasierte Angehörigenarbeit, nach DBT (Linehan, M. M., 1993).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("6-leitlinien", {
    kicker: "Textversion",
    summary:
      "Sechs freiwillige Orientierungspunkte können helfen, Erwartungen, Kommunikation, Sicherheit, Absprachen und eigene Grenzen zu klären.",
    intro: [
      "Die sechs Leitlinien übersetzen familienbezogene Empfehlungen in Wahlmöglichkeiten für den Alltag. Sie schreiben Angehörigen weder Ruhe noch Einigkeit oder ständige Verfügbarkeit vor.",
      "Welche Orientierung passt, hängt von Beziehung, Einwilligung, eigener Kraft und Sicherheit ab. Unterschiedliche Angehörige dürfen unterschiedliche Grenzen haben.",
    ],
    sections: [
      {
        title: "Die 6 Leitlinien",
        intro:
          "Die Textversion beschreibt sechs mögliche Orientierungspunkte. Sie müssen nicht gemeinsam oder vollständig umgesetzt werden.",
        cards: [
          {
            title: "1. Veränderung braucht Zeit",
            text: "Verläufe sind individuell. Vermeiden Sie Zeitdruck und feste Fortschrittserwartungen.",
          },
          {
            title: "2. Absprachen klären",
            text: "Transparente Absprachen können Orientierung geben, wenn alle Beteiligten sie möchten und anpassen dürfen.",
          },
          {
            title: "3. Zuhören oder begrenzen",
            text: "Sie können zuhören, nachfragen, widersprechen, pausieren oder ein Gespräch beenden. Respekt gilt für alle Beteiligten.",
          },
          {
            title: "4. Selbstverletzung ernst nehmen",
            text: "Direkt nach Sicherheit fragen und bei unmittelbarer Gefahr den Notruf nutzen. Sie müssen die Situation nicht allein beurteilen oder absichern.",
          },
          {
            title: "5. Zuständigkeiten besprechen",
            text: "Wenn mehrere Menschen beteiligt sind, können freiwillige Absprachen helfen. Niemand muss dieselbe Rolle oder Grenze übernehmen.",
          },
          {
            title: "6. Eigene Grenzen benennen",
            text: "Sagen Sie, was Sie übernehmen können und was nicht. Grenzen dürfen sich verändern.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es bei den Leitlinien geht",
        calloutText:
          "Die Leitlinien sind Angebote. Sie dürfen einen Punkt wählen, anpassen oder ganz weglassen.",
      },
      {
        title: "Merkhilfe",
        calloutTitle: "Lieber klein und verlässlich",
        calloutText:
          "Es gibt keine Garantie für eine bestimmte Wirkung. Sicherheit und die Autonomie aller Beteiligten haben Vorrang.",
      },
      {
        title: "Action",
        cards: [
          {
            title: "1. Passung prüfen",
            text: "Fragen Sie sich, ob einer der Punkte für Sie überhaupt hilfreich ist.",
          },
          {
            title: "2. Wünsche erfragen",
            text: "Besprechen Sie mögliche Absprachen nur, wenn die Beteiligten das möchten.",
          },
          {
            title: "3. Nachjustieren",
            text: "Prüfen Sie, was tragbar war, und verändern oder beenden Sie die Abmachung bei Bedarf.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Berkowitz, C. & Gunderson, J. G., Family Guidelines for Borderline Personality Disorder.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("4-alltags-tipps", {
    kicker: "Textversion",
    summary:
      "Vier freiwillige Fragen helfen zu klären, ob Unterstützung gewünscht ist, was Sie anbieten können und wo Ihre Grenzen liegen.",
    intro: [
      "Die vier Alltags-Tipps sind keine Aufgabenliste für Angehörige. Sie helfen, Unterstützung als freiwillige, gemeinsam geklärte Möglichkeit zu verstehen.",
      "Auch Nichtverfügbarkeit, Abstand oder eine eigene Beratung können angemessene Entscheidungen sein.",
    ],
    sections: [
      {
        title: "4 Alltags-Tipps",
        intro:
          "Die Textversion bündelt vier Fragen für den Alltag mit einer nahestehenden Person.",
        cards: [
          {
            title: "Ist gemeinsames Üben gewünscht?",
            text: "Bieten Sie es nur an, wenn die Person es möchte und Sie die Rolle freiwillig übernehmen können.",
          },
          {
            title: "Welche Veränderung ist der Person wichtig?",
            text: "Fragen Sie nach, statt Fortschritt von aussen zu definieren oder zu bewerten.",
          },
          {
            title: "Welche Absprachen passen?",
            text: "Treffen Sie nur Absprachen, die gemeinsam gewünscht, verständlich und für Sie tragbar sind.",
          },
          {
            title: "Welche Hilfe wird gewünscht?",
            text: "Fragen Sie offen. Eine mögliche Antwort ist auch: keine Hilfe, später oder von jemand anderem.",
          },
        ],
      },
      {
        title: "Merksatz",
        calloutTitle: "Worum es im Alltag geht",
        calloutText:
          "Unterstützung ist ein Angebot, keine Pflicht. In akuter Gefahr haben Sicherheit und professionelle Hilfe Vorrang.",
      },
      {
        title: "Was können Sie tun?",
        cards: [
          {
            title: "1. Wunsch klären",
            text: "Fragen Sie, ob Unterstützung gewünscht ist.",
          },
          {
            title: "2. Eigene Möglichkeit prüfen",
            text: "Klären Sie, was Sie freiwillig und sicher anbieten können.",
          },
          {
            title: "3. Offen nachfragen",
            text: "Fragen Sie: Was wäre hilfreich – und was eher nicht?",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: DBT-orientierte Angehörigenarbeit; Fruzzetti, A. E. (2006), Family Psychoeducation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
