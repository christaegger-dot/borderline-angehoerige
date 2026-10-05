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
      "Körperliche, emotionale und gedankliche Veränderungen können Anlass sein, innezuhalten und die eigene Belastung zu prüfen. Sie beweisen keine Grenzverletzung.",
    intro: [
      "Stress und Überlastung können sich sehr unterschiedlich zeigen. Manche Menschen bemerken körperliche Anspannung, andere veränderte Gefühle, Gedanken, Verhalten oder ein stärkeres Erholungsbedürfnis.",
      "Die Beispiele sind eine Einladung zur Selbstbeobachtung, kein Test und keine Diagnose.",
    ],
    sections: [
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Ein Signal sagt nicht automatisch, was die Ursache ist. Es kann ein guter Anlass sein, innezuhalten: Was belastet mich, was brauche ich, und welcher nächste Schritt ist für mich möglich?",
      },
      {
        title: "Mögliche Signale",
        cards: [
          {
            title: "Körper",
            text: "Zum Beispiel Anspannung, flache Atmung, Magenbeschwerden, Kopfschmerzen oder ungewöhnliche Müdigkeit.",
          },
          {
            title: "Gefühle",
            text: "Zum Beispiel Gereiztheit, Angst, Traurigkeit, innere Leere oder das Gefühl, kaum noch etwas aufnehmen zu können.",
          },
          {
            title: "Gedanken",
            text: "Zum Beispiel ständiges Kreisen, Katastrophengedanken, Konzentrationsprobleme oder das Gefühl, für alles verantwortlich zu sein.",
          },
          {
            title: "Verhalten",
            text: "Zum Beispiel dauernde Erreichbarkeit, Rückzug, Aufschieben eigener Bedürfnisse oder häufigere Konflikte.",
          },
          {
            title: "Erholung",
            text: "Zum Beispiel das Bedürfnis nach Ruhe, Abstand, Schlaf, einem Gespräch oder praktischer Entlastung.",
          },
        ],
      },
      {
        title: "Abschluss",
        calloutTitle: "Frage zur Selbstbeobachtung",
        calloutText:
          "Was beobachten Sie, in welchem Zusammenhang tritt es auf, und was würde Sie jetzt entlasten? Signale sind Hinweise, keine Diagnose – und Erschöpfung ist kein persönliches Versagen. Neue, starke oder anhaltende körperliche Beschwerden sollten medizinisch abgeklärt werden.",
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: WHO, Stress – Questions and Answers (30. März 2026); NICE NG150, Supporting adult carers (2020, aktualisiert). Eigene didaktische Zusammenstellung zur Selbstbeobachtung; kein diagnostisches Instrument.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
  }),
  createHandoutTextVersion("lmk", {
    kicker: "Textversion",
    summary:
      "Eine Grenze beschreibt, was für Sie sicher, möglich und tragbar ist. Übersetzen Sie sie in einen Schritt, den Sie selbst umsetzen können – nicht in eine Strafe oder Wirkungsgarantie.",
    intro: [
      "Benennen Sie knapp Ihre Grenze und einen Schritt, den Sie selbst umsetzen können. Die andere Person muss der Grenze nicht zustimmen; ihre Reaktion lässt sich jedoch nicht steuern.",
      "Die neue Orientierung verbindet eine klare Grenze mit einer selbst steuerbaren Schutzhandlung. Sie schreibt weder ein Gespräch noch eine spätere Rückkehr vor und muss an Abhängigkeiten, Minderjährigkeit und Sicherheit angepasst werden.",
    ],
    sections: [
      {
        title: "1. Grenze benennen",
        calloutTitle: "Klar und beim eigenen Erleben bleiben",
        calloutText:
          "Benennen Sie, was für Sie gerade nicht mehr tragbar ist: «Ich möchte dieses Gespräch so nicht weiterführen.» Eine Begründung kann helfen, ist aber keine Voraussetzung für eine Grenze.",
      },
      {
        title: "2. Eigenen Spielraum klären",
        calloutTitle: "Selbst steuerbar statt kontrollierend",
        calloutText:
          "Wählen Sie einen Schritt, den Sie selbst umsetzen können und der keine Grundversorgung, Sicherheit oder Betreuungspflicht entzieht: Pause, Raum verlassen, Gespräch beenden oder Unterstützung holen.",
      },
      {
        title: "3. Schutzschritt umsetzen",
        calloutTitle: "Ohne Strafe und ohne Wirkungsgarantie",
        calloutText:
          "Kündigen Sie den eigenen Schritt kurz an und setzen Sie ihn um, wenn das sicher möglich ist: «Ich beende das Gespräch jetzt.» Sie müssen keine Verhaltensänderung erreichen und keine spätere Fortsetzung versprechen.",
      },
      {
        title: "Kernaussage",
        calloutTitle: "Zentraler Satz des Handouts",
        calloutText:
          "Eine Grenze schützt den eigenen Handlungsspielraum. Sie ist kein Mittel, einen anderen Menschen zu bestrafen, zu erziehen oder zu einer bestimmten Reaktion zu bringen.",
      },
      {
        title: "Was können Sie tun?",
        bullets: [
          "Formulieren Sie eine Grenze und genau einen eigenen, machbaren Schutzschritt.",
          "Prüfen Sie Abhängigkeiten und Pflichten: Bei Minderjährigen, Betreuung oder gemeinsamer Versorgung darf der Schritt notwendige Unterstützung nicht entziehen.",
          "Sie dürfen die Situation neu beurteilen und einen anderen Schritt wählen. Verlässlichkeit bedeutet nicht Starrheit.",
        ],
      },
      {
        title: "Sicherheit",
        calloutTitle: "Wenn Schutz wichtiger ist als ein Gespräch",
        calloutText:
          "Diese Schutzregel gilt diagnoseunabhängig in jeder Beziehung. Bei Gewalt, Bedrohung oder unmittelbarer Gefahr geht es nicht um eine Kommunikationsformel. Bringen Sie sich in Sicherheit und holen Sie passende professionelle Hilfe. Sie müssen keine unsichere Situation aushalten.",
      },
    ],
    sourceLine:
      "Fachliche Bezugspunkte: NICE CG78 zu gemeinsamer Krisenplanung, Wahlfreiheit und Angehörigeneinbezug mit Zustimmung; AWMF-S3 Borderline-Persönlichkeitsstörung (2022, seit 31.05.2026 abgelaufen), Empfehlungen 38–39; SA Health, What is BPD? (2025). Eigene didaktische Orientierung, keine standardisierte Methode.",
    standLine:
      "Für Angehörige – Fachstelle Angehörigenarbeit, PUK Zürich – Ch. Egger | Entwurf – fachlich-redaktionelle Freigabe ausstehend | Stand: 05.10.2026.",
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
