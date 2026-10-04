import learningGuides from "../learningGuides.json";
import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("dear", learningGuides["dear"]),
  createHandoutTextVersion("spiegeln-statt-aufsaugen", {
    kicker: "Textversion",
    summary:
      "Mitgefühl heisst nicht Übernehmen. Sie können Beobachtungen vorsichtig spiegeln, offen nachfragen und zugleich bei den eigenen Gefühlen und Grenzen bleiben.",
    intro: [
      "Spiegeln statt Aufsaugen ist eine Metapher für eine freiwillige Gesprächsoption: Wahrnehmen, was sichtbar oder gesagt wurde, ohne verborgene Gefühle festzulegen oder Verantwortung zu übernehmen.",
      "Sie finden zuerst eine Kernfrage, dann den Unterschied zwischen Beobachtung und Übernahme und zum Schluss Hinweise für den Alltag. Abstand oder ein Gesprächsende bleiben gleichwertige Möglichkeiten.",
    ],
    sections: [
      {
        title: "Kernfrage",
        calloutTitle: "Zentraler Prüfstein",
        calloutText:
          "Was habe ich beobachtet, was vermute ich – und was geschieht gerade in mir?",
      },
      {
        title: "Übernehmen",
        cards: [
          {
            title: "Was passiert?",
            text: "Aus einer Beobachtung wird die Annahme, Sie müssten das Erleben oder die Situation der anderen Person lösen.",
          },
          {
            title: "Mögliche Folge",
            text: "Das kann Druck, Schuldgefühle oder Erschöpfung verstärken. Die Wirkung ist individuell.",
          },
          {
            title: "Typischer Satz",
            text: "Es ist meine Schuld, dass es dir schlecht geht.",
          },
          {
            title: "Innere Annahme",
            text: "Ich glaube, dass ich die Lage der anderen Person ausgleichen muss.",
          },
        ],
      },
      {
        title: "Spiegeln",
        cards: [
          {
            title: "Was passiert?",
            text: "Sie benennen vorsichtig, was Sie beobachtet oder verstanden haben, und lassen Raum für Korrektur.",
          },
          {
            title: "Mögliche Wirkung",
            text: "Das kann Verständnis erleichtern, garantiert aber keine bestimmte Reaktion. Ihre Selbstgrenze bleibt bestehen.",
          },
          {
            title: "Typischer Satz",
            text: "Ich höre, dass es gerade schwer ist. Habe ich dich richtig verstanden?",
          },
          {
            title: "Eigene Orientierung",
            text: "Ich darf mitfühlen, nachfragen, widersprechen, pausieren oder das Gespräch beenden.",
          },
        ],
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Trennen Sie konkrete Beobachtung, eigene Reaktion und Vermutung.",
          "Spiegeln Sie vorsichtig und fragen Sie offen nach, statt ein Gefühl festzulegen.",
          "Erinnern Sie sich: Sie müssen das Erleben oder die Situation einer anderen Person nicht stellvertretend lösen.",
          "Wenn Sie selbst überflutet sind, ist Abstand oder Unterstützung hilfreicher als weiteres Spiegeln.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason, P. T. & Kreger, R. (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("bruecke-gelaender", {
    kicker: "Textversion",
    summary:
      "Die Brücken-Metapher verbindet Kontakt und Grenze: Beziehung bleibt tragfähiger, wenn Geländer, Pfeiler und Absprachen sichtbar sind.",
    intro: [
      "Die Brücke mit Geländer beschreibt eine Beziehungshaltung für Angehörige: Kontakt halten, ohne grenzenlos verfügbar zu werden.",
      "Die Brücke steht für möglichen Kontakt, das Geländer für klare Grenzen und die Pfeiler für Absprachen, Pausen, Fachpersonen und Selbstschutz. Sie müssen die Brücke nicht allein tragen und keinen Kontakt versprechen, der für Sie nicht sicher oder tragbar ist.",
    ],
    sections: [
      {
        title: "Merksatz",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText: "Kontakt braucht Geländer.",
      },
      {
        title: "Die drei Teile der Brücke",
        cards: [
          {
            title: "Verbindung",
            text: "«Ich entscheide, welcher Kontakt für mich möglich ist.» Verbindung kann Nähe, eine begrenzte Nachricht oder auch Abstand bedeuten. Massgeblich ist, was sicher und tragbar ist.",
          },
          {
            title: "Geländer",
            text: "«Ich sage, was geht – und was nicht.» Grenzen sind keine Strafe. Sie geben Orientierung und schützen beide Seiten vor weiterer Eskalation.",
          },
          {
            title: "Pfeiler",
            text: "«Ich trage nicht allein.» Absprachen, Pausen, Fachpersonen, andere Vertrauenspersonen und Selbstschutz machen Beziehung stabiler.",
          },
        ],
      },
      {
        title: "Was die Brücke belasten kann",
        bullets: ["Druck", "Schuld", "Angst", "Streit", "Daueranspannung"],
      },
      {
        title: "Was hilft",
        bullets: [
          "Früh sagen, was möglich ist.",
          "Die Grenze kurz und ruhig benennen.",
          "Eine Pause oder ein Gesprächsende ohne Rückkehrversprechen benennen.",
          "Verantwortung auf mehrere Schultern verteilen.",
          "Nur wenn es sicher und gewollt ist, später neuen Kontakt anbieten.",
        ],
      },
      {
        title: "Drei Sätze fürs Geländer",
        cards: [
          {
            title: "Verbindung",
            text: "«Ich bin da – und ich brauche einen ruhigen Ton.»",
          },
          {
            title: "Pause",
            text: "«Ich beende das Gespräch jetzt. Ob und wann ich wieder ansprechbar bin, entscheide ich später.»",
          },
          {
            title: "Unterstützung",
            text: "«Das kann ich nicht allein tragen. Wir holen Unterstützung dazu.»",
          },
        ],
      },
      {
        title: "Schutzsatz",
        calloutTitle: "Grenzen und Beziehung",
        calloutText:
          "Grenzen können Kontakt schützen. Sie dürfen ein Gespräch oder – wenn nötig – auch einen Kontakt beenden.",
      },
      {
        title: "Geländer sind kein Liebesentzug",
        calloutTitle: "Einordnung",
        calloutText:
          "Eine Grenze bewertet keinen Menschen. Sie beschreibt, was für Sie möglich, sicher und tragbar ist.",
      },
    ],
    sourceLine:
      "Quelle: Hoffman, P. D. et al. (2005), Family Connections; NICE CG78; Linehan, M. M.; Mason, P. T. & Kreger, R. (2014); Stand by You / Sotomo (2024).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 25.05.2026.",
  }),
  createHandoutTextVersion(
    "4-arten-von-grenzen",
    learningGuides["4-arten-von-grenzen"]
  ),
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
          "Welches Signal kennen Sie am besten und in welchen Situationen taucht es immer wieder auf? Warnsignale sind Hinweise, keine Diagnose – und Erschöpfung ist kein persönliches Versagen.",
      },
    ],
    sourceLine:
      "Quelle: Mason, P. T. & Kreger, R. (2014), Angehörigen-Psychoedukation.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("lmk", {
    kicker: "Textversion",
    summary:
      "Wenn Grenzen ignoriert werden, reicht eine Bitte oft nicht. Eine wirksame Konsequenz ist logisch, machbar und wird ruhig umgesetzt.",
    intro: [
      "Dieses Vorgehen hilft, nach wiederholten Grenzverletzungen konsequent zu bleiben, ohne in Drohlogik zu geraten.",
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
        title: "Stufe 2: Logische, machbare Konsequenz",
        intro:
          "Eine logische, machbare Konsequenz ist eine Folge, die Sie ruhig ankündigen und wirklich umsetzen können.",
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
        calloutTitle: "Der Drehpunkt",
        calloutText:
          "Sie kontrollieren nicht das Verhalten der anderen Person, sondern nur Ihre Grenze und die Konsequenz, die Sie danach wirklich umsetzen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Definieren Sie vorab zwei oder drei logische, machbare Konsequenzen.",
          "Besprechen Sie diese möglichst in einem ruhigen Moment.",
          "Setzen Sie die Konsequenz ruhig um, ohne danach in eine neue Diskussion einzusteigen.",
          "Bei Gewalt oder Bedrohung ist keine Kommunikationsformel gefragt, sondern Schutz und Hilfe.",
        ],
      },
    ],
    sourceLine: "Quelle: Mason, P. T. & Kreger, R. (2014).",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
  createHandoutTextVersion("grenzen-spickzettel", {
    kicker: "Textversion",
    summary:
      "Der Spickzettel bündelt konkrete Satzbausteine für klare Grenzen, Spiegeln ohne Aufsaugen und eine Exit-Strategie mit klaren Konsequenzen.",
    intro: [
      "Der Spickzettel Grenzen bündelt kurze Satzmuster für schwierige Gespräche. Er ist dafür gedacht, vor einem Gespräch schnell die wichtigsten Formulierungen durchzugehen.",
      "Die vier Bereiche sind direkt nutzbar aufgebaut: DEAR-Technik, Beispielsätze bei Grenzüberschreitungen, Spiegeln statt Aufsaugen und eine Exit-Strategie mit klaren Konsequenzen.",
    ],
    sections: [
      {
        title: "Wann anwenden?",
        calloutTitle: "Einsatz des Spickzettels",
        calloutText:
          "Wenn Sie eine Grenze setzen möchten, ohne die Beziehung zu gefährden. Ideal zum Üben vor schwierigen Gesprächen. Eine Grenze ist nur hilfreich, wenn sie realistisch haltbar ist.",
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
        title: "Bereich 4: Logische, machbare Konsequenz – Exit-Strategie",
        cards: [
          {
            title: "Logisch",
            text: "Die Konsequenz hat mit dem Verhalten zu tun.",
          },
          {
            title: "Machbar",
            text: "Ich kann sie wirklich umsetzen – keine leere Drohung.",
          },
          {
            title: "Ruhig",
            text: "Ich setze sie ohne Vorwurf um.",
          },
        ],
      },
    ],
    sourceLine:
      "Quelle: Mason, P. T. & Kreger, R. (2014); Linehan, M. M. (1993), DBT.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Stand: 03.02.2026.",
  }),
];
