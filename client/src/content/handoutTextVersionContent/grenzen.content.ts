import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
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
