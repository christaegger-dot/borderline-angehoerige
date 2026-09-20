/**
 * Borderline und Beziehungen — Grundlagenbaustein
 *
 * Portiert aus dem internen redaktionellen Prototyp vom 20.09.2026
 * (Route /verstehen/beziehungen). Der Baustein erklärt, wie sich Ereignis,
 * Bedeutung, Gefühl und Reaktion zwischen zwei Menschen verstärken können.
 *
 * Verbindliche Leitplanken aus der Freigabeprüfung:
 * - Gruppenbefunde erklären keine bestimmte Person und lassen sich nicht auf
 *   ein konkretes Paar oder auf Eltern, Kinder, Geschwister übertragen.
 * - Erklärungsmodelle sind keine Aussagen über Absichten.
 * - Wechselseitiger Einfluss ist keine Aufteilung von Verantwortung, und bei
 *   Einschüchterung oder Gewalt gilt Schutz vor Musteranalyse.
 *
 * Redaktioneller Entwurf — eine institutionelle Fachfreigabe steht aus.
 */

export interface BeziehungsSprung {
  id: string;
  label: string;
}

export interface BeziehungsRessource {
  title: string;
  text: string;
}

export interface BeziehungsSchritt {
  label: string;
  kicker: string;
  title: string;
  text: string;
  question: string;
}

export interface BeziehungsThema {
  id: string;
  kicker: string;
  title: string;
  text: string;
  takeaway: string;
}

export interface BeziehungsBeispielSchritt {
  n: number;
  event: string;
  person: string;
  relative: string;
}

export interface BeziehungsHilfe {
  title: string;
  text: string;
  example: string;
}

/** Sprungmarken der Seite, in Lesereihenfolge. */
export const beziehungsSpruenge: BeziehungsSprung[] = [
  { id: "verbindung", label: "Was bereits verbindet" },
  { id: "bedeutungsschleife", label: "Ereignis, Bedeutung und Wirkung" },
  { id: "verletzlichkeit", label: "Was die Schleife verstärken kann" },
  { id: "wechselwirkung", label: "Wie sich Reaktionen verstärken können" },
  { id: "was-hilft", label: "Was Verbindung tragfähiger macht" },
  { id: "verantwortung", label: "Verantwortung und Schutz" },
];

export const beziehungsRessourcen: BeziehungsRessource[] = [
  {
    title: "Nähe ohne Leistungsdruck",
    text: "Gemeinsame Tätigkeiten, bei denen niemand etwas erklären, lösen oder beweisen muss.",
  },
  {
    title: "Verlässliche kleine Gesten",
    text: "Absprachen, Humor, Aufmerksamkeit oder Fürsorge, die tatsächlich als hilfreich erlebt werden.",
  },
  {
    title: "Unterschiede, die stehen bleiben dürfen",
    text: "Momente, in denen verschiedene Meinungen oder Bedürfnisse möglich sind, ohne dass die Beziehung infrage steht.",
  },
  {
    title: "Leben ausserhalb der Erkrankung",
    text: "Interessen, Rollen und gemeinsame Erfahrungen, in denen die Diagnose nicht im Mittelpunkt steht.",
  },
  {
    title: "Fähigkeiten beider Seiten stärken",
    text: "Hilfreiche Strategien sind oft bereits da. Beide können zu Nähe, Klärung und Veränderung beitragen; eine Person «handhabt» nicht die andere.",
  },
];

/** Die fünf Stationen der Bedeutungsschleife. */
export const beziehungsSchritte: BeziehungsSchritt[] = [
  {
    label: "Ereignis",
    kicker: "1 · Was beobachtbar ist",
    title: "Eine Nachricht bleibt länger unbeantwortet",
    text: "Zunächst steht nur fest: Eine Antwort ist noch nicht da. Gründe und Absichten sind nicht direkt sichtbar.",
    question: "Was weiss ich — und was ergänze ich bereits?",
  },
  {
    label: "Bedeutung",
    kicker: "2 · Was daraus innerlich wird",
    title: "«Ich bin ihr nicht wichtig»",
    text: "Bei hoher Zurückweisungsempfindlichkeit kann eine unklare Situation rasch als Distanz oder drohender Verlust verstanden werden. Die Zurückweisung kann aber auch real sein; beides muss offenbleiben.",
    question: "Welche andere Erklärung ist ebenfalls möglich?",
  },
  {
    label: "Gefühl",
    kicker: "3 · Was diese Bedeutung auslöst",
    title: "Angst, Verletzung oder Wut",
    text: "Starke Gefühle können das Abwarten und Prüfen verschiedener Erklärungen erschweren. Das erklärt einen engeren Handlungsspielraum, hebt Verantwortung aber nicht auf.",
    question: "Was brauche ich, bevor wir weiterklären können?",
  },
  {
    label: "Reaktion",
    kicker: "4 · Was sichtbar wird",
    title: "Vorwurf, Rückzug oder wiederholtes Nachfragen",
    text: "Die Reaktion versucht vielleicht, Sicherheit herzustellen oder Schmerz abzuwehren. Ihre Absicht lässt sich von aussen nicht sicher erkennen; ihre Wirkung darf trotzdem benannt werden.",
    question: "Wie kann ich Not und Grenze getrennt ansprechen?",
  },
  {
    label: "Wirkung",
    kicker: "5 · Was beim Gegenüber ankommt",
    title: "Druck, Verteidigung oder Distanz",
    text: "Das Gegenüber schützt sich möglicherweise, erklärt immer mehr oder zieht sich zurück. Dies kann die ursprüngliche Befürchtung verstärken und die Schleife von Neuem beginnen.",
    question: "An welcher Stelle könnten wir die Schleife unterbrechen?",
  },
];

export const beziehungsThemen: BeziehungsThema[] = [
  {
    id: "bez-zurueckweisung",
    kicker: "Zurückweisung",
    title: "Ein innerer Beziehungsalarm kann früh anspringen",
    text: "Unklare Signale können schneller als Ablehnung, Abwertung oder drohender Verlust gelesen werden. Das bedeutet weder, dass jede Person so reagiert, noch dass erlebte Zurückweisung immer eingebildet ist.",
    takeaway:
      "Zuerst erkunden, welche Bedeutung ein Ereignis bekommen hat — ohne dieser Bedeutung automatisch zuzustimmen.",
  },
  {
    id: "bez-mentalisieren",
    kicker: "Mentalisieren und Mitgefühl",
    title: "Vermutungen können sich wie Gewissheiten anfühlen",
    text: "Unter hoher Anspannung kann es schwerer werden, Annahmen über Gedanken und Absichten anderer als Annahmen zu erkennen. Auch Angehörige können in solche Gewissheiten geraten. Etwas stark mitzufühlen, zutreffend zu verstehen und hilfreich zu reagieren sind zudem verschiedene Fähigkeiten.",
    takeaway:
      "Beobachtung, Deutung und Gefühl trennen. Vermutungen als überprüfbare Fragen formulieren. Die Diagnose erlaubt weder die Aussage «keine Empathie» noch «besonders empathisch».",
  },
  {
    id: "bez-anspannung",
    kicker: "Hohe Anspannung",
    title: "Starke Gefühle können den Handlungsspielraum verengen",
    text: "In einem stark belasteten Moment kann es schwerer werden, abzuwarten, verschiedene Erklärungen zu prüfen oder eine Enttäuschung auszuhalten, ohne sofort zu handeln. Das erklärt nicht jede Reaktion und bedeutet nicht, dass Verhalten grundsätzlich unbeeinflussbar wäre.",
    takeaway:
      "Zuerst Anspannung senken, dann gemeinsam klären. Ein engerer Handlungsspielraum hebt Verantwortung nicht auf.",
  },
  {
    id: "bez-naehe",
    kicker: "Nähe und Eigenständigkeit",
    title:
      "Unterstützung kann gleichzeitig erwünscht und schwer auszuhalten sein",
    text: "Nähe kann Sicherheit geben und zugleich verletzlich machen. Das Bedürfnis nach Hilfe und der Wunsch nach Selbstbestimmung können nebeneinander bestehen.",
    takeaway:
      "Nicht erraten, sondern begrenzt absprechen: Was soll ich übernehmen, was möchten Sie selbst tun, wann prüfen wir die Aufteilung?",
  },
  {
    id: "bez-gegensaetze",
    kicker: "Gegensätze halten",
    title: "Das aktuelle Gefühl kann das Gesamtbild überdecken",
    text: "Im Konflikt kann die enttäuschende Seite einer Person so stark in den Vordergrund treten, dass frühere gute Erfahrungen kaum noch zugänglich sind. Frühere Zuneigung war deshalb nicht automatisch unecht.",
    takeaway:
      "Zwei Wahrheiten üben: «Ich bin verletzt — und du bist mir wichtig.»",
  },
  {
    id: "bez-scham",
    kicker: "Scham und Rückmeldung",
    title:
      "Aus einem Fehler kann innerlich ein Urteil über die ganze Person werden",
    text: "Wenn eine konkrete Kritik als «Ich bin schlecht und nicht liebenswert» ankommt, können Abwehr, Selbstabwertung oder Rückzug die Klärung erschweren. Ob dies im Einzelfall zutrifft, bleibt offen.",
    takeaway:
      "Das Verhalten konkret benennen, ohne den Wert der Person zu beurteilen: «Die Beschimpfung hat mich verletzt. Du bist deshalb nicht als ganzer Mensch schlecht.»",
  },
  {
    id: "bez-kontext",
    kicker: "Beziehungskontext",
    title: "Dass etwas anderswo gelingt, beweist weder Täuschung noch Ursache",
    text: "Verschiedene Beziehungen sind mit unterschiedlichen Erwartungen, Erfahrungen und emotionaler Bedeutung verbunden. Eine Fähigkeit kann deshalb in einem Kontext zugänglich und unter hoher Belastung in einem anderen schwerer erreichbar sein.",
    takeaway:
      "Unterschiedliches Verhalten beweist weder bewusste Kontrolle noch, dass Angehörige die Schwierigkeiten verursacht haben. Verletzungen sind kein Liebesbeweis.",
  },
  {
    id: "bez-dissoziation",
    kicker: "Dissoziation",
    title:
      "Plötzliche Entfernung oder eine andere Erinnerung hat nicht nur eine Erklärung",
    text: "Verstummen, Unwirklichkeitsgefühle oder abweichende Erinnerungen können viele Gründe haben. Dissoziation ist eine mögliche Erklärung, aber keine, die Angehörige aus dem Verhalten allein feststellen können.",
    takeaway:
      "Weder beweist eine abweichende Erinnerung absichtliches Lügen, noch macht der Hinweis auf Dissoziation jede Aussage automatisch zutreffend. Wiederkehrende Erfahrungen gehören in die Behandlung.",
  },
];

/** Erfundenes Alltagsbeispiel — keine untersuchte Einzelfallschilderung. */
export const beziehungsBeispiel: BeziehungsBeispielSchritt[] = [
  {
    n: 1,
    event: "Die Schwester sagt den Besuch ab.",
    person: "«Wenn es mir schlecht geht, bin ich allein.»",
    relative: "«Heute schaffe ich es nicht. Ich brauche Ruhe.»",
  },
  {
    n: 2,
    event: "Es folgen mehrere vorwurfsvolle Nachrichten.",
    person: "«Vielleicht versteht sie so, wie verletzt ich bin.»",
    relative: "«Meine ganze Unterstützung wird entwertet.»",
  },
  {
    n: 3,
    event: "Die Schwester erklärt und verteidigt sich zunehmend schärfer.",
    person: "«Sie hört meinen Schmerz nicht und will nur recht haben.»",
    relative: "«Ich muss diese falsche Darstellung richtigstellen.»",
  },
  {
    n: 4,
    event: "Das Gespräch wird beendet.",
    person: "«Jetzt geht sie tatsächlich weg.»",
    relative: "«Ich halte den Druck nicht mehr aus und muss mich schützen.»",
  },
];

export const beziehungsHilfen: BeziehungsHilfe[] = [
  {
    title: "Zuerst klären: zuhören oder lösen?",
    text: "Gesprächsversuche können sich verfehlen, wenn eine Person Verständnis sucht und die andere bereits Lösungen anbietet.",
    example:
      "«Möchtest du gerade, dass ich zuhöre, oder sollen wir gemeinsam nach einer Lösung suchen?»",
  },
  {
    title: "Zugewandt und begrenzt bleiben",
    text: "Verbindung zeigen, ohne vollständige Verfügbarkeit zu versprechen. Eine kleine verlässliche Zusage ist hilfreicher als ein grosses Versprechen, das nicht hält.",
    example:
      "«Du bist mir wichtig. Heute kann ich nicht kommen. Morgen können wir telefonieren.»",
  },
  {
    title: "Unterschiedlichkeit aushalten",
    text: "Verschiedene Gefühle, Meinungen oder Bedürfnisse nach Nähe sind nicht automatisch ein Zeichen fehlender Liebe.",
    example: "«Wir müssen nicht dasselbe fühlen, um einander wichtig zu sein.»",
  },
  {
    title: "Verletzungen bearbeiten",
    text: "Beruhigung ist nicht dasselbe wie Klärung. Verantwortung, Wiedergutmachung und neue Verlässlichkeit brauchen manchmal ein späteres Gespräch.",
    example:
      "«Meine Angst erklärt etwas davon, macht meine Worte aber nicht in Ordnung.»",
  },
  {
    title: "Unterstützung auf mehrere Schultern verteilen",
    text: "Eine Beziehung kann helfen, sollte aber weder alle Regulation übernehmen noch Behandlung ersetzen. Eigene Strategien, weitere Bezugspersonen und Fachhilfe erweitern den Spielraum.",
    example:
      "«Ich begleite dich dabei — und ich kann das nicht allein tragen.»",
  },
];

/** Die vier Fragen, die Erklärung von Verantwortung trennen. */
export const verantwortungsFragen: string[] = [
  "Was könnte die Person innerlich erleben?",
  "Was tut sie tatsächlich?",
  "Welche Wirkung hat das auf andere?",
  "Was braucht es für Verantwortung und Schutz?",
];

export const beziehungsQuellen: string[] = [
  "American Psychiatric Association (2024): Behandlungsleitlinie Borderline-Persönlichkeitsstörung",
  "NICE: Borderline personality disorder — Empfehlungen, einschliesslich Familien und Angehörigen",
  "Foxhall et al. (2019): Zurückweisungssensibilität — systematischer Review und Metaanalyse",
  "McLaren et al. (2022): Hypermentalisieren — metaanalytische Übersicht",
  "Cavicchioli et al. (2021): Scham — Metaanalyse",
  "Sutherland et al. (2020): Unterstützung und Belastung von Angehörigen — systematischer Review",
  "Leonards et al. (2024): Empathie, emotionale Ansteckung und Mitgefühl — Metaanalyse",
];
