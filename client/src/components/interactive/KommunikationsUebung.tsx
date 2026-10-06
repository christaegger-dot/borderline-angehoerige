import { useState, useCallback, useId, useRef } from "react";
import AppLink from "@/components/AppLink";
import { Button } from "@/components/ui/button";
import { RotateCcw, Lightbulb, Heart, Shield, Scale } from "lucide-react";

// ─── Types ────────────────────────────────────────────────

type Technique = "Zugewandtheit" | "DEAR" | "Validierung";

interface AnswerOption {
  id: string;
  text: string;
  possibleEffect: string;
  prerequisites: string;
  ownBoundary: string;
  otherPerspective: string;
}

interface Scenario {
  id: string;
  title: string;
  /** The technique being practiced */
  technique: Technique;
  /** Scene-setting context */
  context: string;
  /** The responding position changes between the fictional scenes. */
  respondingRole: string;
  /** What one person in the fictional scene says */
  statement: string;
  /** Available response options */
  options: AnswerOption[];
  /** Educational note shown after answering */
  learnNote: string;
}

// ─── Scenario data ────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: "set-1",
    title: "«Du bist nie für mich da!»",
    technique: "Zugewandtheit",
    context:
      "Eine nahestehende Person ist nach einem schwierigen Tag aufgewühlt. Sie wissen noch nicht, welcher konkrete Moment hinter dem Vorwurf steht.",
    respondingRole: "Sie antworten als die angesprochene Person.",
    statement:
      "«Du bist nie für mich da! Niemand versteht mich! Du machst alles nur schlimmer!»",
    options: [
      {
        id: "a",
        text: "«Ich kann dir jetzt eine Weile zuhören. Welcher Moment war heute besonders schwierig für dich?»",
        possibleEffect:
          "Eine konkrete Frage kann Raum für das Anliegen öffnen, ohne ein verborgenes Gefühl oder Motiv festzulegen.",
        prerequisites:
          "Sie haben gerade Zeit und Kraft zum Zuhören; die andere Person möchte erzählen.",
        ownBoundary:
          "Zuhören bedeutet keine unbegrenzte Verfügbarkeit und keine Zustimmung zu jedem Vorwurf.",
        otherPerspective:
          "Eine Frage kann willkommen sein oder sich zunächst wie eine weitere Anforderung anfühlen. Die andere Person darf noch nicht antworten wollen.",
      },
      {
        id: "b",
        text: "«Ich möchte verstehen, was dir gefehlt hat. Gleichzeitig trifft mich der Satz, ich würde alles schlimmer machen. Können wir über den konkreten Moment sprechen?»",
        possibleEffect:
          "Die Antwort verbindet Interesse am Anliegen mit der eigenen Sicht, statt die pauschale Aussage einfach zu übernehmen.",
        prerequisites:
          "Beide können gerade unterschiedliche Sichtweisen hören; die Frage ist als Einladung gemeint.",
        ownBoundary:
          "Sie dürfen benennen, dass Sie ein Vorwurf verletzt. Das verpflichtet die andere Person nicht, sofort Ihre Sicht zu bestätigen.",
        otherPerspective:
          "Die eigene Sicht kann Orientierung geben, aber auch als Rechtfertigung ankommen. Fragen Sie nach, statt eine bestimmte Wirkung anzunehmen.",
      },
      {
        id: "c",
        text: "«Ich merke, dass ich gerade zu aufgewühlt bin, um aufmerksam zuzuhören. Ich mache jetzt eine Pause und entscheide danach, was für mich möglich ist.»",
        possibleEffect:
          "Eine offen benannte Pause kann verhindern, dass Sie aus Überforderung verletzend reagieren.",
        prerequisites:
          "Sie brauchen eine Unterbrechung und können sie ohne zusätzliche Abwertung mitteilen.",
        ownBoundary:
          "Eine Pause oder ein Gesprächsende ist auch ohne Rückkehrversprechen möglich.",
        otherPerspective:
          "Eine Unterbrechung kann entlasten oder enttäuschen. Beides darf benannt werden, ohne daraus eine Pflicht zum Weiterreden abzuleiten.",
      },
    ],
    learnNote:
      "Interesse, die eigene Sicht und eine Pause sind unterschiedliche Möglichkeiten. Welche passt, hängt von Zeit, Kraft und Gesprächswunsch ab; keine Formulierung garantiert den Verlauf.",
  },
  {
    id: "set-2",
    title: "Ein Zeitpunkt, zwei Vorstellungen",
    technique: "Zugewandtheit",
    context:
      "Alex und Robin haben «am Abend zusammen kochen» vereinbart. Alex dachte an 18 Uhr, Robin an 20 Uhr. Beide haben nach ihrer eigenen Vorstellung geplant und den Zeitpunkt nicht geklärt.",
    respondingRole:
      "Sie antworten als Robin; Sie sind erst um 20 Uhr angekommen.",
    statement:
      "Alex sagt: «Ich dachte, wir fangen um sechs an. Jetzt bin ich hungrig und enttäuscht.»",
    options: [
      {
        id: "a",
        text: "«Ich hatte acht Uhr im Kopf und habe nicht nachgefragt. Wollen wir für heute schauen, was noch passt, und nächstes Mal eine Uhrzeit festhalten?»",
        possibleEffect:
          "Die unterschiedlichen Vorstellungen werden sichtbar; ein konkreter nächster Schritt kann das Missverständnis begrenzen.",
        prerequisites:
          "Beide möchten den heutigen Plan noch abstimmen. Der Vorschlag ist verhandelbar.",
        ownBoundary:
          "Sie übernehmen Ihren Anteil an der unklaren Absprache, ohne die gesamte Verantwortung für den Abend zu übernehmen.",
        otherPerspective:
          "Alex kann eine Lösung wünschen oder erst über die Enttäuschung sprechen wollen. Der Vorschlag muss nicht sofort angenommen werden.",
      },
      {
        id: "b",
        text: "«Du hast schon gewartet und bist enttäuscht. Magst du zuerst erzählen, was du dir für den Abend gewünscht hattest? Danach möchte ich auch meine Vorstellung erklären.»",
        possibleEffect:
          "Beide Erwartungen können hörbar werden, bevor über den Plan entschieden wird.",
        prerequisites:
          "Es ist Zeit für ein Gespräch, und beide sind bereit, einander zuzuhören.",
        ownBoundary:
          "Auch Ihre Vorstellung darf vorkommen. Zuhören verpflichtet Sie nicht, den ursprünglichen Plan nachzuholen.",
        otherPerspective:
          "Alex könnte lieber zuerst essen als reden. Eine kurze Klärung oder ein anderer Zeitpunkt kann dann passender sein.",
      },
      {
        id: "c",
        text: "«Ich sehe das Missverständnis. Für gemeinsames Kochen habe ich heute keine Kraft mehr. Ich esse für mich; wir können später besprechen, ob wir neu planen möchten.»",
        possibleEffect:
          "Eine klare Grenze macht die eigene Möglichkeit sichtbar, ohne die Enttäuschung der anderen Person zu bestreiten.",
        prerequisites:
          "Ihre Kraft reicht heute nicht mehr aus; Sie können die Planänderung klar mitteilen.",
        ownBoundary:
          "Sie dürfen den gemeinsamen Plan ablehnen. Ein neues Treffen bleibt eine gemeinsame Entscheidung.",
        otherPerspective:
          "Alex kann weiterhin enttäuscht sein und ebenfalls für sich entscheiden. Eine Grenze muss nicht beiden gefallen, um ausgesprochen werden zu dürfen.",
      },
    ],
    learnNote:
      "Ein Missverständnis ist nicht automatisch die Schuld einer Person. Beide dürfen ihren Anteil benennen, Wünsche erklären und eine gemeinsame Aktivität ablehnen.",
  },
  {
    id: "dear-1",
    title: "Eigene Bedürfnisse ansprechen",
    technique: "DEAR",
    context:
      "Eine nahestehende Person hat drei gemeinsame Termine kurzfristig abgesagt. Sie möchten benennen, was das für Ihre Planung bedeutet, ohne den Grund für die Absagen zu behaupten.",
    respondingRole:
      "Sie antworten als die Person, die mehr Planbarkeit wünscht.",
    statement: "Wie möchten Sie Ihre gemeinsame Zeit ansprechen?",
    options: [
      {
        id: "a",
        text: "«Unsere letzten drei Termine sind kurzfristig ausgefallen. Das macht mich traurig, weil mir die Zeit mit dir wichtig ist. Können wir einen Termin wählen, der für uns beide passt? Dann kann ich besser planen.»",
        possibleEffect:
          "Die Antwort verbindet eine konkrete Beobachtung, eine Ich-Botschaft, eine Bitte und den möglichen Nutzen der Absprache.",
        prerequisites:
          "Beide möchten weitere Treffen und können über einen verlässlichen Termin verhandeln.",
        ownBoundary:
          "Eine Bitte ist keine Verpflichtung für die andere Person. Sie entscheiden selbst, wie viel Planung Sie übernehmen möchten.",
        otherPerspective:
          "Die Person kann den Wunsch teilen oder gerade keinen Termin zusagen können. Ein Nein darf Teil der Klärung sein.",
      },
      {
        id: "b",
        text: "«Die kurzfristigen Absagen sind für meine Planung schwierig. Ich möchte künftig erst dann einen Abend freihalten, wenn wir beide zugesagt haben. So kann ich auch andere Dinge verabreden.»",
        possibleEffect:
          "Die Antwort benennt eine eigene Grenze und ihren praktischen Nutzen, ohne der anderen Person ein Motiv zuzuschreiben.",
        prerequisites:
          "Sie können die angekündigte Grenze selbst umsetzen und verwenden sie nicht als Strafe.",
        ownBoundary:
          "Sie dürfen Ihre Zeit anders planen. Die andere Person darf weiterhin ein Treffen absagen.",
        otherPerspective:
          "Die Änderung kann als Entlastung oder als mehr Abstand erlebt werden. Besprechen Sie die Bedeutung, ohne eine Reaktion vorzugeben.",
      },
      {
        id: "c",
        text: "«Mir ist unsere Zeit wichtig. Feste Termine scheinen gerade schwierig zu sein. Möchtest du eher spontan fragen? Ich würde dann jedes Mal schauen, ob es für mich passt.»",
        possibleEffect:
          "Ein anderes Format kann gemeinsame Zeit ermöglichen, ohne von beiden dieselbe Planbarkeit zu verlangen.",
        prerequisites:
          "Spontane Treffen passen auch zu Ihren Bedürfnissen; beide können ohne Vorwurf Nein sagen.",
        ownBoundary:
          "Sie müssen sich nicht freihalten. Wenn spontane Treffen Sie belasten, passt diese Möglichkeit für Sie nicht.",
        otherPerspective:
          "Mehr Flexibilität kann willkommen sein; die andere Person kann aber ebenfalls feste Absprachen bevorzugen.",
      },
    ],
    learnNote:
      "DEAR umfasst die ersten vier inhaltlichen Schritte von DEAR MAN: Beschreiben, Ausdrücken, Bitten und Verstärken (positive Folgen benennen). Die Beispiele setzen unterschiedliche Schwerpunkte; nicht jeder Satz enthält alle vier Schritte. Mindful, Appear confident und Negotiate werden hier nicht trainiert.",
  },
  {
    id: "dear-2",
    title: "Unterstützung anbieten, Entscheidung lassen",
    technique: "DEAR",
    context:
      "Eine nahestehende Person hatte erwähnt, vielleicht einen Therapieplatz suchen zu wollen. Sie machen sich Sorgen und möchten Ihre Rolle klären, ohne die Behandlungsentscheidung zu übernehmen.",
    respondingRole:
      "Sie antworten als die Person, die Unterstützung anbieten möchte.",
    statement: "Wie sprechen Sie Ihre Sorge und Ihre Möglichkeiten an?",
    options: [
      {
        id: "a",
        text: "«Du hattest eine mögliche Therapieplatzsuche erwähnt. Ich merke, dass ich mir Sorgen mache. Möchtest du darüber sprechen? Wenn ich weiss, welche Unterstützung du möchtest, kann ich schauen, was ich anbieten kann.»",
        possibleEffect:
          "Eine Beobachtung und eine Ich-Botschaft öffnen eine Einladung, ohne aus der früheren Äusserung eine Pflicht zu machen.",
        prerequisites:
          "Die andere Person möchte das Thema besprechen. Sie können auch eine Ablehnung stehen lassen.",
        ownBoundary:
          "Sie bieten nur Unterstützung an, die für Sie möglich ist; Sie übernehmen keine Behandlungsentscheidung.",
        otherPerspective:
          "Die Nachfrage kann hilfreich sein oder als Druck ankommen. Ob eine Therapie gesucht wird, entscheidet die betroffene Person.",
      },
      {
        id: "b",
        text: "«Falls du Unterstützung möchtest, kann ich dir einmal bei einer praktischen Aufgabe helfen. Ich möchte die Suche aber nicht organisieren. So bleibt klar, was ich übernehmen kann und was nicht.»",
        possibleEffect:
          "Ein begrenztes Angebot macht die eigene Rolle konkret und lässt die Entscheidung bei der anderen Person.",
        prerequisites:
          "Praktische Hilfe ist gewünscht; Umfang und Aufgabe werden gemeinsam geklärt.",
        ownBoundary:
          "Sie dürfen die Organisation ablehnen oder ein Angebot zurücknehmen, wenn es Ihre Möglichkeiten übersteigt.",
        otherPerspective:
          "Das Angebot kann passen oder am aktuellen Wunsch vorbeigehen. Die andere Person muss es weder nutzen noch begründen, warum sie es ablehnt.",
      },
      {
        id: "c",
        text: "«Ich möchte das Thema nicht immer wieder aufbringen. Ob du eine Therapie suchst, entscheidest du. Wenn du von dir aus darüber sprechen möchtest, frage mich gern; ich schaue dann, was für mich möglich ist.»",
        possibleEffect:
          "Die Entscheidung bleibt ausdrücklich bei der anderen Person; wiederholter Druck durch Nachfragen kann abnehmen.",
        prerequisites:
          "Sie möchten keine weitere Nachfrage stellen und meinen die Entscheidungsfreiheit ernst.",
        ownBoundary:
          "Sie müssen sich nicht dauerhaft bereithalten und dürfen bei einer späteren Anfrage Nein sagen.",
        otherPerspective:
          "Weniger Nachfragen kann entlasten oder als weniger Interesse erlebt werden. Die Bedeutung ist nicht aus der Formulierung allein ableitbar.",
      },
    ],
    learnNote:
      "DEAR kann helfen, eigene Sorge, eine Bitte oder eine Grenze klar auszudrücken. Es begründet keinen Anspruch auf eine bestimmte Behandlungsentscheidung. Unterstützung wird angeboten, nicht vorausgesetzt; die andere Person darf sie ablehnen.",
  },
  {
    id: "val-1",
    title: "«Niemand nimmt mich ernst!»",
    technique: "Validierung",
    context:
      "Eine nahestehende Person fühlt sich nach einem Arztbesuch nicht gehört. Sie möchten nach dem Erleben fragen, ohne eine Erklärung oder Lösung vorauszusetzen.",
    respondingRole: "Sie antworten als die zuhörende Person.",
    statement:
      "«Der Arzt hat mich überhaupt nicht ernst genommen! Ich habe versucht zu erklären, wie es mir geht, und er hat einfach auf seinen Computer gestarrt. Niemand hört mir zu!»",
    options: [
      {
        id: "a",
        text: "«Du kommst vom Arzt und fühlst dich nicht gehört. Was war für dich an dem Gespräch besonders schwierig?»",
        possibleEffect:
          "Das ausdrücklich Gesagte wird aufgegriffen. Eine offene Frage lässt Raum für die eigene Beschreibung.",
        prerequisites:
          "Die Person möchte erzählen und hat gerade Kraft für eine Frage.",
        ownBoundary:
          "Sie müssen den Arztbesuch nicht beurteilen oder eine Lösung finden, um zuzuhören.",
        otherPerspective:
          "Eine offene Frage kann passen; manchmal ist stilles Zuhören oder eine Pause eher gewünscht.",
      },
      {
        id: "b",
        text: "«Das klingt frustrierend. Möchtest du, dass ich einfach zuhöre, oder möchtest du mit mir überlegen, was du jetzt brauchst?»",
        possibleEffect:
          "Die Antwort bietet eine Wahl zwischen Zuhören und gemeinsamem Nachdenken, ohne eine Lösung als Auftrag zu setzen.",
        prerequisites:
          "Beide angebotenen Möglichkeiten sind für Sie möglich; die Person kann auch etwas anderes wünschen.",
        ownBoundary:
          "Sie dürfen sagen, wenn Sie für eine gewünschte Unterstützung nicht die passende Person sind.",
        otherPerspective:
          "Eine Wahl kann Orientierung geben oder gerade zu viel sein. Es braucht keine sofortige Entscheidung.",
      },
      {
        id: "c",
        text: "«Ich kenne eine ähnliche Erfahrung. Wäre es gerade hilfreich, wenn ich davon erzähle, oder möchtest du erst bei deinem Besuch bleiben?»",
        possibleEffect:
          "Eine eigene Erfahrung kann verbinden. Die Nachfrage lässt offen, ob sie im aktuellen Gespräch erwünscht ist.",
        prerequisites:
          "Die Person möchte Ihre Erfahrung hören; Sie können bei einem Nein beim Anliegen der anderen Person bleiben.",
        ownBoundary:
          "Sie entscheiden, was Sie von sich erzählen möchten, und müssen keine persönliche Erfahrung offenlegen.",
        otherPerspective:
          "Eine ähnliche Erfahrung kann sich verbindend anfühlen oder den Fokus verschieben. Fragen Sie nach, statt beides vorauszusetzen.",
      },
    ],
    learnNote:
      "Validierung bedeutet nicht, einer Aussage zuzustimmen. Fragen Sie nach, statt ein verborgenes Gefühl oder Motiv festzulegen; ein Lösungsvorschlag ist nicht automatisch falsch und kann passen, wenn er gewünscht ist.",
  },
  {
    id: "val-2",
    title: "Der eigene Kommentar wurde anders verstanden",
    technique: "Validierung",
    context:
      "Alex sagte beim Aufräumen: «Na, das hast du ja toll gemacht.» Alex meinte es scherzhaft, Robin hörte darin eine Abwertung. Beide hatten zuvor nicht über diesen Humor gesprochen.",
    respondingRole:
      "Hier wechseln Sie die Sprecherposition: Sie antworten als Alex, dessen eigener Kommentar Robin verletzt hat.",
    statement:
      "Robin sagt: «Dein Spruch hat mich getroffen. Ich dachte, du machst dich über mich lustig.»",
    options: [
      {
        id: "a",
        text: "«Mein Kommentar hat dich getroffen. Es tut mir leid, dass ich so gesprochen habe. Wie ist er bei dir angekommen?»",
        possibleEffect:
          "Die Antwort nimmt die mitgeteilte Wirkung auf und übernimmt Verantwortung für den eigenen Satz, ohne Robin eine Reaktion vorzuschreiben.",
        prerequisites:
          "Die Entschuldigung ist ernst gemeint; Sie sind bereit, auch eine andere Wirkung als Ihre Absicht zu hören.",
        ownBoundary:
          "Verantwortung für den eigenen Kommentar bedeutet nicht, jedes weitere Urteil über sich übernehmen zu müssen.",
        otherPerspective:
          "Robin kann die Entschuldigung annehmen oder noch Zeit brauchen. Eine Entschuldigung schafft keinen Anspruch auf Vergebung.",
      },
      {
        id: "b",
        text: "«Ich wollte einen Scherz machen und höre, dass es anders angekommen ist. Ich möchte solche Kommentare beim Aufräumen lassen. Können wir sagen, was uns dabei wichtig ist?»",
        possibleEffect:
          "Absicht und Wirkung können nebeneinanderstehen. Eine konkrete Änderung macht Verantwortung praktisch sichtbar.",
        prerequisites:
          "Sie können die angekündigte Änderung umsetzen und verwenden Ihre Absicht nicht, um die Verletzung abzustreiten.",
        ownBoundary:
          "Auch Ihre Wünsche für den Umgang dürfen benannt werden; eine gemeinsame Absprache bleibt verhandelbar.",
        otherPerspective:
          "Robin kann eine Änderung wichtiger finden als eine Erklärung der Absicht. Vielleicht ist gerade noch kein gemeinsames Gespräch gewünscht.",
      },
      {
        id: "c",
        text: "«Ich höre, dass mein Satz verletzt hat, und möchte das nicht wegreden. Ich brauche einen Moment, bevor ich weiter darüber sprechen kann.»",
        possibleEffect:
          "Die mitgeteilte Verletzung wird anerkannt, während Sie die eigene aktuelle Grenze benennen.",
        prerequisites:
          "Sie brauchen eine Pause und nutzen sie nicht, um die Verantwortung für den Kommentar abzuweisen.",
        ownBoundary:
          "Beide dürfen pausieren oder ein Gespräch beenden. Sie müssen keinen festen Rückkehrzeitpunkt versprechen.",
        otherPerspective:
          "Robin kann ebenfalls Abstand brauchen oder enttäuscht sein. Eine Pause erledigt die Verletzung nicht automatisch.",
      },
    ],
    learnNote:
      "Alle Beteiligten können verletzend reagieren und Verantwortung für das eigene Verhalten übernehmen. Eine andere Absicht hebt die berichtete Wirkung nicht auf. Zugleich dürfen beide Grenzen setzen und ein Gespräch unterbrechen.",
  },
];

// ─── Helpers ──────────────────────────────────────────────

const TECHNIQUE_META: Record<
  Technique,
  {
    label: string;
    tintVar: string;
    icon: React.ElementType;
  }
> = {
  Zugewandtheit: {
    label: "Zugewandtheit & Klarheit",
    tintVar: "--color-sage-dark",
    icon: Heart,
  },
  DEAR: {
    label: "DEAR",
    tintVar: "--color-sand-mid",
    icon: Scale,
  },
  Validierung: {
    label: "Validierung",
    tintVar: "--color-sage-mid",
    icon: Shield,
  },
};

const TECHNIQUE_STEPS: Partial<
  Record<Technique, { letter: string; label: string; desc: string }[]>
> = {
  Zugewandtheit: [
    { letter: "1", label: "Präsenz", desc: "Nur anbieten, was möglich ist" },
    { letter: "2", label: "Offenheit", desc: "Fragen statt festlegen" },
    { letter: "3", label: "Klarheit", desc: "Grenzen und Sicherheit benennen" },
  ],
  DEAR: [
    { letter: "D", label: "Describe", desc: "Situation beschreiben" },
    { letter: "E", label: "Express", desc: "Gefühl ausdrücken" },
    { letter: "A", label: "Assert", desc: "Wunsch benennen" },
    {
      letter: "R",
      label: "Verstärken",
      desc: "Positive Folgen benennen",
    },
  ],
};

function groupByTechnique(
  scenarios: Scenario[]
): Record<Technique, Scenario[]> {
  const grouped: Record<Technique, Scenario[]> = {
    Zugewandtheit: [],
    DEAR: [],
    Validierung: [],
  };
  for (const s of scenarios) grouped[s.technique].push(s);
  return grouped;
}

// ─── Scenario card (single scenario) ─────────────────────

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: Scenario;
  index: number;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const uid = useId();
  const titleId = `${uid}-title`;
  const contextId = `${uid}-context`;
  const roleId = `${uid}-role`;
  const questionId = `${uid}-question`;
  const detailId = `${uid}-detail`;
  const detailTitleId = `${uid}-detail-title`;
  const meta = TECHNIQUE_META[scenario.technique];
  const TechniqueIcon = meta.icon;
  const tintStyle = { color: `var(${meta.tintVar})` };
  const tintBadgeStyle = {
    color: `var(${meta.tintVar})`,
    borderColor: `color-mix(in oklch, var(${meta.tintVar}) 28%, transparent)`,
    backgroundColor: `color-mix(in oklch, var(${meta.tintVar}) 8%, white)`,
  };
  const selectedOption = scenario.options.find(o => o.id === selectedId);

  const handleSelect = useCallback(
    (optionId: string) => {
      setSelectedId(optionId);
      setStatusMessage(
        `Reaktion ${optionId.toUpperCase()} angezeigt: ${scenario.title}. Sie können eine andere Reaktion vergleichen.`
      );
    },
    [scenario.title]
  );

  const handleReset = useCallback(() => {
    // Focus the still-mounted choice before the reset control disappears.
    if (selectedId) optionRefs.current[selectedId]?.focus();
    setSelectedId(null);
    setStatusMessage(
      `Vergleich zurückgesetzt: ${scenario.title}. Keine Reaktion ist ausgewählt; Sie können erneut vergleichen.`
    );
  }, [selectedId, scenario.title]);

  return (
    <article
      aria-labelledby={titleId}
      className="overflow-hidden rounded-[1.35rem] border"
      style={{
        borderColor: "var(--rule-color)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      <div
        className="border-b px-5 py-4"
        style={{
          borderColor: "var(--rule-color)",
          backgroundColor: "color-mix(in oklch, var(--bg-primary) 78%, white)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
            style={tintBadgeStyle}
          >
            <TechniqueIcon className="w-4 h-4" aria-hidden="true" />
            {meta.label}
          </span>
          <span
            style={{ fontSize: "var(--text-xs)", color: "var(--fg-tertiary)" }}
          >
            Szenario {index + 1}
          </span>
        </div>
        <h3
          id={titleId}
          className="leading-tight"
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--fg-primary)",
            fontWeight: 600,
          }}
        >
          {scenario.title}
        </h3>
      </div>

      <div className="p-5 space-y-4">
        <p
          id={contextId}
          className="text-sm leading-relaxed text-muted-foreground"
        >
          {scenario.context}
        </p>
        <p id={roleId} className="text-sm leading-relaxed text-foreground">
          {scenario.respondingRole}
        </p>
        <blockquote
          className="rounded-[1rem] border-l-2 px-4 py-4 text-sm italic leading-relaxed"
          style={{
            borderColor: `var(${meta.tintVar})`,
            backgroundColor:
              "color-mix(in oklch, var(--bg-primary) 72%, white)",
          }}
        >
          {scenario.statement}
        </blockquote>

        <div
          role="group"
          aria-labelledby={questionId}
          aria-describedby={`${contextId} ${roleId}`}
          className="space-y-2.5"
        >
          <p id={questionId} className="text-sm font-medium text-foreground">
            Welche Reaktion möchten Sie vergleichen?
          </p>
          {scenario.options.map(option => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                ref={node => {
                  optionRefs.current[option.id] = node;
                }}
                type="button"
                aria-pressed={isSelected}
                aria-controls={detailId}
                onClick={event => {
                  event.currentTarget.focus();
                  handleSelect(option.id);
                }}
                className={`w-full rounded-xl border p-4 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-[color:var(--rule-color-strong)] bg-muted/30"
                    : "border-border/60 bg-background hover:bg-muted/20"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span aria-hidden="true" className="font-semibold">
                    {option.id.toUpperCase()}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {option.text}
                  </span>
                </span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="mt-2 block text-xs font-medium"
                  >
                    Ausgewählt zum Vergleich
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <section
          id={detailId}
          hidden={!selectedOption}
          aria-labelledby={detailTitleId}
          className="rounded-[1rem] border p-4"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <h4 id={detailTitleId} className="mb-3 text-sm font-semibold">
            Perspektiven zur Reaktion {selectedId?.toUpperCase()}
          </h4>
          {selectedOption && (
            <dl className="space-y-3 text-sm leading-relaxed">
              {[
                ["Mögliche Wirkung", selectedOption.possibleEffect],
                ["Voraussetzungen", selectedOption.prerequisites],
                ["Eigene Grenze", selectedOption.ownBoundary],
                ["Andere Perspektive", selectedOption.otherPerspective],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="font-medium text-foreground">{label}</dt>
                  <dd className="mt-1 text-muted-foreground">{text}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-4 border-t pt-3 text-sm leading-relaxed">
            <p className="mb-1 flex items-center gap-1.5 font-medium">
              <Lightbulb
                className="h-4 w-4"
                style={tintStyle}
                aria-hidden="true"
              />
              Zum Vergleich
            </p>
            <p className="text-muted-foreground">{scenario.learnNote}</p>
          </div>
        </section>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {statusMessage}
        </p>
        {selectedOption && (
          <div className="flex justify-end pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Vergleich zurücksetzen
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Section for a technique group ────────────────────────

function TechniqueSection({
  technique,
  scenarios,
}: {
  technique: Technique;
  scenarios: Scenario[];
}) {
  const meta = TECHNIQUE_META[technique];
  const TechniqueIcon = meta.icon;
  const tintStyle = {
    color: `var(${meta.tintVar})`,
  };
  const tintBadgeStyle = {
    color: `var(${meta.tintVar})`,
    borderColor: `color-mix(in oklch, var(${meta.tintVar}) 24%, transparent)`,
    backgroundColor: `color-mix(in oklch, var(${meta.tintVar}) 6%, var(--bg-primary))`,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[0.9rem] border"
          style={tintBadgeStyle}
        >
          <TechniqueIcon className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-xl)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            {meta.label}
          </h2>
          <p
            style={{ fontSize: "var(--text-xs)", color: "var(--fg-tertiary)" }}
          >
            {scenarios.length}{" "}
            {scenarios.length === 1 ? "Szenario" : "Szenarien"}
          </p>
        </div>
      </div>

      {/* Technique component breakdown */}
      {TECHNIQUE_STEPS[technique] && (
        <div className="mb-5 rounded-[1rem] border p-3" style={tintBadgeStyle}>
          <p className="mb-2.5 text-xs font-medium" style={tintStyle}>
            Aufbau der Technik
          </p>
          <div className="flex flex-wrap gap-2">
            {TECHNIQUE_STEPS[technique]!.map(comp => (
              <div
                key={comp.letter}
                className="flex items-center gap-1.5 rounded-[0.8rem] border px-2.5 py-1.5"
                style={{
                  borderColor: "var(--rule-color)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <span className="text-sm font-bold" style={tintStyle}>
                  {comp.letter}
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">
                    {comp.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    {comp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-5">
        {scenarios.map((s, i) => (
          <ScenarioCard key={s.id} scenario={s} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────

export default function KommunikationsUebung() {
  const grouped = groupByTechnique(SCENARIOS);

  return (
    <div className="space-y-10">
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Redaktioneller Entwurf.</strong>{" "}
          Die fachliche Prüfung sowie unabhängige Rückmeldungen von einer Person
          mit eigener Borderline-Erfahrung und einer angehörigen Person stehen
          aus. Reale VoiceOver- und NVDA-Prüfungen sind ebenfalls offen.
        </p>
        <p>
          Diese erfundenen Szenarien sind eigene didaktische Ableitungen aus den
          auf der{" "}
          <AppLink href="/kommunizieren" className="editorial-link">
            Kommunikations-Seite
          </AppLink>{" "}
          erläuterten Ansätzen. Sie sind kein auf Wirksamkeit geprüftes
          Übungsprogramm. Die Rollen sind nicht aus einer Diagnose ableitbar;
          die Sprecherposition wechselt zwischen den Alltagsszenarien.
        </p>
        <p>
          Vergleichen Sie die Voraussetzungen, Grenzen und möglichen Wirkungen
          der drei Reaktionen. Sie sind je nach Kontext unterschiedlich passend;
          keine Formulierung garantiert den Verlauf. Alle Beteiligten dürfen
          Grenzen setzen, pausieren und Verantwortung für eigenes verletzendes
          Verhalten übernehmen.
        </p>
        <p>
          Diese Kommunikationsübung nimmt keine Risikoeinschätzung vor.
          Allgemeine Hinweise zu Anlaufstellen finden Sie unter{" "}
          <AppLink href="/soforthilfe" className="editorial-link">
            Akute Hilfe und Notfallkontakte
          </AppLink>
          .
        </p>
      </div>
      {(["Zugewandtheit", "DEAR", "Validierung"] as Technique[]).map(
        tech =>
          grouped[tech].length > 0 && (
            <TechniqueSection
              key={tech}
              technique={tech}
              scenarios={grouped[tech]}
            />
          )
      )}
    </div>
  );
}
