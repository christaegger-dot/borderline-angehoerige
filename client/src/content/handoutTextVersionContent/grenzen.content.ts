import learningGuides from "../learningGuides.json";
import { createHandoutTextVersion } from "./shared";

export const handoutTextVersions = [
  createHandoutTextVersion("dear", learningGuides["dear"]),
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
      "Die Brücke steht für Verbindung, das Geländer für klare Grenzen und die Pfeiler für Absprachen, Pausen, Fachpersonen und Selbstschutz.",
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
            text: "«Ich bleibe ansprechbar.» Kontakt bedeutet: Ich ziehe mich nicht wortlos zurück. Ich bleibe in Beziehung, soweit es für mich sicher und tragbar ist.",
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
          "Eine Pause mit Rückkehrzeit vereinbaren.",
          "Verantwortung auf mehrere Schultern verteilen.",
          "Nach ruhigen Momenten wieder Kontakt aufnehmen.",
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
            text: "«Ich mache eine Pause und komme um [Uhrzeit] zurück.»",
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
          "Grenzen beenden nicht Beziehung – sie machen Kontakt sicherer.",
      },
      {
        title: "Geländer sind kein Liebesentzug",
        calloutTitle: "Einordnung",
        calloutText:
          "Eine Grenze sagt nicht: «Du bist mir egal.» Sie sagt: «So kann Kontakt sicherer bleiben.»",
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
