import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Heart,
  Shield,
  Scale,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────

type Technique = "Zugewandtheit" | "DEAR" | "Validierung";

interface AnswerOption {
  id: string;
  text: string;
  correct: boolean;
  /** Feedback shown after selecting this option */
  feedback: string;
  /** Which technique component this demonstrates */
  techniqueHint?: string;
}

interface Scenario {
  id: string;
  title: string;
  /** The technique being practiced */
  technique: Technique;
  /** Scene-setting context */
  context: string;
  /** What one person in the fictional scene says */
  statement: string;
  /** Available response options */
  options: AnswerOption[];
  /** Educational note shown after answering */
  learnNote: string;
}

// ─── Scenario data ────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  // ─── Zugewandtheit + Klarheit ───────────────────────
  {
    id: "set-1",
    title: "«Du bist nie für mich da!»",
    technique: "Zugewandtheit",
    context:
      "Eine nahestehende Person ist nach einem schwierigen Tag aufgewühlt und macht Ihnen Vorwürfe. Sie möchten begrenzt zugewandt reagieren, ohne ein Gefühl oder Motiv vorzugeben.",
    statement:
      "«Du bist nie für mich da! Niemand versteht mich! Du machst alles nur schlimmer!»",
    options: [
      {
        id: "a",
        text: "«Ich höre dir jetzt zu. Ich kann mir vorstellen, dass du dich gerade sehr allein fühlst. Lass uns gemeinsam überlegen, was dir in diesem Moment helfen könnte.»",
        correct: true,
        feedback:
          "Diese Antwort bietet begrenzte und wahrheitsgemässe Präsenz an, formuliert das mögliche Erleben ausdrücklich vorsichtig und öffnet eine gemeinsame Frage. Auch eine Pause oder ein Gesprächsende kann passend sein.",
        techniqueHint: "Präsenz → vorsichtig spiegeln → offen fragen",
      },
      {
        id: "b",
        text: "«Das stimmt doch gar nicht, ich bin ständig für dich da. Letzte Woche erst habe ich alles stehen und liegen lassen.»",
        correct: false,
        feedback:
          "Die Antwort verteidigt die eigene Sicht, ohne zuerst nach dem konkreten Erleben oder Anliegen zu fragen. Das kann ein Gespräch weiter verengen; Ihre eigene Sicht dürfen Sie später trotzdem benennen.",
        techniqueHint: "Rechtfertigung statt offener Frage",
      },
      {
        id: "c",
        text: "«So schlimm ist es doch nicht. Versuch mal, positiv zu denken.»",
        correct: false,
        feedback:
          "Die Formulierung kann bagatellisierend wirken, weil sie das geäusserte Erleben relativiert. Eine offene Frage lässt der Person mehr Raum, selbst zu beschreiben, was gerade wichtig ist.",
        techniqueHint: "Invalidierung",
      },
    ],
    learnNote:
      "Begrenzte Präsenz, vorsichtiges Spiegeln und eine offene Frage können ein Gespräch unterstützen. Das ist kein festes Schema: Je nach Situation kann eine andere Reihenfolge, eine Pause oder ein Gesprächsende passender sein.",
  },
  {
    id: "set-2",
    title: "«Ich brauche dich jetzt sofort!»",
    technique: "Zugewandtheit",
    context:
      "Es ist 23 Uhr. Ihr Angehöriger ruft an und verlangt, dass Sie sofort vorbeikommen. Sie haben morgen früh einen wichtigen Termin.",
    statement:
      "«Du musst jetzt sofort herkommen! Ich halte das nicht mehr aus! Wenn du nicht kommst, weiss ich nicht, was ich tue!»",
    options: [
      {
        id: "a",
        text: "«Ich komme sofort. Halte durch, ich bin gleich da.»",
        correct: false,
        feedback:
          "Das bietet sofortige persönliche Hilfe an, prüft aber weder die mögliche akute Gefahr noch Ihre eigene Grenze. Selbst hinzufahren ersetzt keine professionelle Einschätzung und kann Ihnen die alleinige Verantwortung zuschieben.",
        techniqueHint: "Hilfeversprechen ohne Sicherheitsklärung",
      },
      {
        id: "b",
        text: "«Ich nehme das ernst: Denkst du daran, dir etwas anzutun, oder bist du unmittelbar in Gefahr? Ich kann heute Nacht nicht kommen. Bei akuter Gefahr rufen wir jetzt 144; sonst holen wir eine professionelle Einschätzung beim psychiatrischen Notfalldienst. 143 kann zusätzlich im Gespräch entlasten.»",
        correct: true,
        feedback:
          "Diese Antwort nimmt die unklare Sicherheitsäusserung ernst, fragt direkt nach möglicher Selbstgefährdung, benennt die eigene Grenze und ordnet die Hilfen korrekt: 144 bei akuter Gefahr, psychiatrischer Notfalldienst zur Einschätzung und 143 nur ergänzend für ein entlastendes Gespräch.",
        techniqueHint: "Sicherheit klären → Grenze → passende Hilfe",
      },
      {
        id: "c",
        text: "«Du rufst immer so spät an. Das geht nicht. Ruf eine Beratungsstelle an.»",
        correct: false,
        feedback:
          "Die Grenze ist wichtig. Die Antwort klärt jedoch nicht, ob eine unmittelbare Gefahr oder Selbstgefährdung vorliegt, und nennt keine passend abgestufte professionelle Hilfe.",
        techniqueHint: "Nur T, ohne S und E",
      },
    ],
    learnNote:
      "Bei einer unklaren Aussage über die eigene Sicherheit hat die direkte Gefährdungsabklärung Vorrang vor einer Kommunikationsmethode. Fragen Sie direkt und ruhig nach Suizidgedanken und unmittelbarer Gefahr. Bei möglicher unmittelbarer Lebensgefahr 144 rufen; sonst professionelle psychiatrische Einschätzung einholen. 143 bietet zusätzliche Gesprächsentlastung, ist aber kein Einsatzdienst. Eigene Grenzen und Sicherheit bleiben wichtig.",
  },

  // ─── DEAR MAN scenarios ─────────────────────────────
  {
    id: "dear-1",
    title: "Eigene Bedürfnisse ansprechen",
    technique: "DEAR",
    context:
      "Ihr Angehöriger hat zum dritten Mal einen gemeinsamen Termin kurzfristig abgesagt. Sie möchten das Thema mit DEAR MAN ansprechen: Describe, Express, Assert, Reinforce.",
    statement:
      "Sie bereiten ein ruhiges Gespräch vor. Welche Formulierung nutzen Sie?",
    options: [
      {
        id: "a",
        text: "«In den letzten drei Wochen sind unsere gemeinsamen Termine ausgefallen. Das macht mich traurig, weil mir die Zeit mit dir wichtig ist. Ich wünsche mir, dass wir einen festen Tag vereinbaren, der für uns beide passt. Das würde mir helfen, mich auf unsere gemeinsame Zeit zu freuen.»",
        correct: true,
        feedback:
          "D: Die Situation wird sachlich beschrieben (3 Absagen). E: Gefühl mit Ich-Botschaft (macht mich traurig). A: Klarer, konkreter Wunsch (festen Tag). R: Positive Verstärkung (freuen auf gemeinsame Zeit).",
        techniqueHint: "D → E → A → R",
      },
      {
        id: "b",
        text: "«Du sagst ständig ab! Dir sind unsere Termine offensichtlich egal. Andere würden sich das nicht gefallen lassen.»",
        correct: false,
        feedback:
          "Das sind Du-Botschaften und Verallgemeinerungen («ständig», «offensichtlich»). Es fehlt eine sachliche Beschreibung, ein eigenes Gefühl und ein konkreter Wunsch.",
        techniqueHint: "Du-Botschaft statt DEAR",
      },
      {
        id: "c",
        text: "«Es ist okay, ich verstehe, dass es dir manchmal nicht gut geht. Mach dir keinen Stress.»",
        correct: false,
        feedback:
          "Das ist verständnisvoll, aber Ihre eigenen Bedürfnisse kommen nicht vor. DEAR MAN bedeutet, die eigene Position freundlich, aber klar zu vertreten – auch das gehört zur Beziehungspflege.",
        techniqueHint: "Nur Empathie, ohne A und R",
      },
    ],
    learnNote:
      "DEAR MAN hilft, eigene Bedürfnisse klar und respektvoll auszudrücken. D = Beschreiben (Fakten), E = Ausdrücken (Ich-Gefühl), A = Bitten (konkreter Wunsch), R = Verstärken (positive Folge).",
  },
  {
    id: "dear-2",
    title: "Abmachung neu verhandeln",
    technique: "DEAR",
    context:
      "Ihr Angehöriger hatte vor zwei Monaten erwähnt, vielleicht einen Therapieplatz suchen zu wollen. Sie machen sich Sorgen und möchten nachfragen, ohne die Behandlungsentscheidung zu übernehmen.",
    statement: "Wie formulieren Sie Ihr Anliegen?",
    options: [
      {
        id: "a",
        text: "«Du hast versprochen, dich um Therapie zu kümmern. Jetzt sind zwei Monate rum und nichts ist passiert. Du musst das endlich angehen.»",
        correct: false,
        feedback:
          "Die Formulierung macht aus einer früheren Äusserung eine Pflicht und übernimmt die Behandlungsentscheidung. Sie können Ihre Sorge benennen, ohne eine Therapieplatzsuche zu verlangen.",
        techniqueHint: "Druck statt eigener Bitte",
      },
      {
        id: "b",
        text: "«Vor zwei Monaten hast du eine mögliche Therapieplatzsuche erwähnt. Ich merke, dass ich mir Sorgen mache. Möchtest du darüber sprechen – und gibt es eine Unterstützung von mir, die du dir wünschst? Ob du eine Therapie suchst, entscheidest du.»",
        correct: true,
        feedback:
          "D: Die frühere Äusserung wird sachlich erinnert. E: Die Sorge bleibt eine Ich-Botschaft. A: Das Gespräch und mögliche Unterstützung werden mit Einverständnis angeboten. Die Behandlungsentscheidung bleibt ausdrücklich bei der betroffenen Person.",
        techniqueHint: "D → E → A → R",
      },
      {
        id: "c",
        text: "«Ist schon okay, du machst das, wenn du bereit bist. Ich will dich nicht drängen.»",
        correct: false,
        feedback:
          "Nicht zu drängen kann eine respektvolle Entscheidung sein, besonders wenn keine akute Gefahr besteht. Für diese DEAR-Übung fehlt lediglich eine konkrete Ich-Botschaft oder offene Frage; die Formulierung ist deshalb nicht grundsätzlich falsch.",
        techniqueHint: "Respektvoll, aber ohne eigene Bitte",
      },
    ],
    learnNote:
      "DEAR MAN kann helfen, Sorge und einen eigenen Wunsch ohne Vorwurf auszudrücken. Unterstützung wird angeboten, nicht vorausgesetzt; die betroffene Person darf sie ablehnen und entscheidet selbst über Behandlung. Bei akuter Gefahr gelten die Soforthilfewege.",
  },

  // ─── Validierungs-Szenarien ─────────────────────────
  {
    id: "val-1",
    title: "«Niemand nimmt mich ernst!»",
    technique: "Validierung",
    context:
      "Ihr Angehöriger kommt nach einem Arztbesuch nach Hause und ist aufgelöst. Die Person fühlt sich vom Arzt nicht gehört. Sie möchten validieren – die Gefühle anerkennen, ohne sofort zu bewerten oder zu lösen.",
    statement:
      "«Der Arzt hat mich überhaupt nicht ernst genommen! Ich habe versucht zu erklären, wie es mir geht, und er hat einfach auf seinen Computer gestarrt. Niemand hört mir zu!»",
    options: [
      {
        id: "a",
        text: "«Das klingt frustrierend. Vielleicht war er nur gestresst, versuch es nochmal bei einem anderen Arzt.»",
        correct: false,
        feedback:
          "Der erste Satz spiegelt das mögliche Erleben vorsichtig. Danach folgen jedoch eine Erklärung und ein Lösungsvorschlag, bevor geklärt ist, was die Person gerade braucht. Das kann den Fokus verschieben; ein Lösungsvorschlag ist nicht automatisch falsch und kann passen, wenn er gewünscht ist.",
        techniqueHint: "Erklärung und Lösung vor offener Nachfrage",
      },
      {
        id: "b",
        text: "«Du kommst vom Arzt und fühlst dich nicht gehört. War das für dich eher enttäuschend, wütend machend oder ganz anders?»",
        correct: true,
        feedback:
          "Die Antwort spiegelt nur das ausdrücklich Gesagte und fragt offen nach dem Erleben. Das Gegenüber muss keine vorgegebene Deutung korrigieren; andere Formulierungen können ebenfalls passen.",
        techniqueHint: "Spiegeln + offen nachfragen",
      },
      {
        id: "c",
        text: "«Ach, das kenne ich. Bei meinem letzten Arztbesuch war es genauso. Das ist leider normal heutzutage.»",
        correct: false,
        feedback:
          "Eine eigene Erfahrung kann verbinden. Hier kann sie den Fokus aber verschieben, bevor das aktuelle Erleben genauer gehört wurde; die Verallgemeinerung «normal heutzutage» kann den konkreten Arztbesuch zusätzlich überdecken. Die Formulierung ist nicht automatisch falsch – eine offene Nachfrage oder die Frage, ob die eigene Erfahrung gerade hilfreich ist, lässt mehr Wahl.",
        techniqueHint: "Eigene Erfahrung vor offener Nachfrage",
      },
    ],
    learnNote:
      "Validierung bedeutet nicht, einer Aussage zuzustimmen. Spiegeln Sie, was tatsächlich gesagt wurde, und fragen Sie offen nach, statt ein verborgenes Gefühl oder Motiv festzulegen. Das eigene Erleben kann verbinden oder den Fokus verschieben; fragen Sie im Zweifel, ob es gerade hilfreich ist.",
  },
  {
    id: "val-2",
    title: "«Es hat sowieso keinen Sinn»",
    technique: "Validierung",
    context:
      "Ihr Angehöriger ist nach einem Rückschlag in der Therapie hoffnungslos. Sie möchten validieren, ohne die Hoffnungslosigkeit zu verstärken oder wegzureden.",
    statement:
      "«Therapie bringt doch nichts. Ich werde nie besser. Es hat alles keinen Sinn.»",
    options: [
      {
        id: "a",
        text: "«Natürlich bringt Therapie etwas! Du hast doch letzte Woche selbst gesagt, dass es dir besser geht. Du darfst jetzt nicht aufgeben.»",
        correct: false,
        feedback:
          "Auch wenn alles inhaltlich stimmt: Das Gefühl (Hoffnungslosigkeit) wird komplett übergangen. «Du darfst nicht aufgeben» erzeugt Druck statt Verbindung.",
        techniqueHint: "Invalidierung + Druck",
      },
      {
        id: "b",
        text: "«Rückschläge gehören dazu. Morgen sieht alles anders aus.»",
        correct: false,
        feedback:
          "Gut gemeint, aber bagatellisierend. Für jemanden in einem tiefen Loch klingt «morgen sieht alles anders aus» wie eine leere Phrase. Der Schmerz jetzt braucht Anerkennung.",
        techniqueHint: "Plattitüde statt Validierung",
      },
      {
        id: "c",
        text: "«Ich höre, dass du gerade das Gefühl hast, es bringt nichts. Nach so einem Rückschlag ist es verständlich, dass sich alles sinnlos anfühlt. Ich bin trotzdem hier.»",
        correct: true,
        feedback:
          "Die Antwort spiegelt die Aussage, ordnet sie vorsichtig in den genannten Rückschlag ein und bietet begrenzte Präsenz an. Die Hoffnungslosigkeit wird weder bestätigt noch bekämpft.",
        techniqueHint: "Spiegeln → vorsichtig einordnen → Präsenz anbieten",
      },
    ],
    learnNote:
      "Bei Hoffnungslosigkeit ist der Impuls gross, dagegen zu argumentieren. Anerkennung kann eher Raum für weitere Perspektiven schaffen, garantiert aber keine bestimmte Reaktion. Bei Hinweisen auf Selbstgefährdung geht Sicherheitsklärung vor Gesprächstechnik.",
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
    label: "DEAR MAN",
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
    { letter: "R", label: "Reinforce", desc: "Positive Folge" },
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
  const [revealed, setRevealed] = useState(false);
  const meta = TECHNIQUE_META[scenario.technique];
  const TechniqueIcon = meta.icon;
  const tintStyle = {
    color: `var(${meta.tintVar})`,
  };
  const tintBadgeStyle = {
    color: `var(${meta.tintVar})`,
    borderColor: `color-mix(in oklch, var(${meta.tintVar}) 28%, transparent)`,
    backgroundColor: `color-mix(in oklch, var(${meta.tintVar}) 8%, white)`,
  };
  const tintPanelStyle = {
    borderColor: `color-mix(in oklch, var(${meta.tintVar}) 22%, transparent)`,
    backgroundColor: `color-mix(in oklch, var(${meta.tintVar}) 5%, var(--bg-primary))`,
  };

  const selectedOption = scenario.options.find(o => o.id === selectedId);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (revealed) return;
      setSelectedId(optionId);
      setRevealed(true);
    },
    [revealed]
  );

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setRevealed(false);
  }, []);

  return (
    <article
      className="overflow-hidden rounded-[1.35rem] border"
      style={{
        borderColor: "var(--rule-color)",
        backgroundColor: "var(--bg-elevated)",
      }}
    >
      {/* Header */}
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
        {/* Context */}
        <p
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--fg-secondary)",
          }}
        >
          {scenario.context}
        </p>

        {/* Statement (what the person says) */}
        <div
          className="rounded-[1rem] border-l-2 px-4 py-4"
          style={{
            borderColor: `var(${meta.tintVar})`,
            backgroundColor:
              "color-mix(in oklch, var(--bg-primary) 72%, white)",
          }}
        >
          <p
            className="italic"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-primary)",
              fontWeight: 500,
            }}
          >
            {scenario.statement}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <p className="text-sm font-medium text-foreground">
            Wie reagieren Sie?
          </p>
          {scenario.options.map(option => {
            const isSelected = selectedId === option.id;
            const showResult = revealed;

            let borderClass =
              "border-border/60 hover:border-[color:var(--rule-color-strong)]";
            let bgClass = "bg-background hover:bg-muted/20";

            if (showResult && isSelected && option.correct) {
              borderClass = "border-green-500/60";
              bgClass = "bg-green-50";
            } else if (showResult && isSelected && !option.correct) {
              borderClass = "border-blue-400/50";
              bgClass = "bg-blue-50/60";
            } else if (showResult && option.correct) {
              borderClass = "border-green-400/40";
              bgClass = "bg-green-50/50";
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={revealed}
                className={`w-full text-left p-4 rounded-xl border ${borderClass} ${bgClass} transition-all ${
                  !revealed
                    ? "cursor-pointer active:scale-[0.99]"
                    : "cursor-default"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {showResult && option.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : showResult && isSelected && !option.correct ? (
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {option.text}
                  </p>
                </div>

                {/* Per-option feedback */}
                <AnimatePresence>
                  {showResult && isSelected && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-3 pt-3 border-t text-sm leading-relaxed ${
                          option.correct
                            ? "border-green-200 text-green-800"
                            : "border-blue-200 text-blue-800"
                        }`}
                      >
                        <p>{option.feedback}</p>
                        {option.techniqueHint && (
                          <p className="mt-1.5 text-xs font-medium opacity-75">
                            Technik: {option.techniqueHint}
                          </p>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Preferred alternative for this didactic example */}
        <AnimatePresence>
          {revealed && selectedOption && !selectedOption.correct && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="overflow-hidden"
            >
              <div className="rounded-[1rem] border border-green-200 bg-green-50/70 p-4">
                <p className="text-sm font-medium text-green-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Eine in dieser Übung bevorzugte Alternative:
                </p>
                <p className="text-sm text-green-700 leading-relaxed">
                  {scenario.options.find(o => o.correct)?.feedback}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Learning note */}
        <AnimatePresence>
          {revealed && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="overflow-hidden"
            >
              <div className="rounded-[1rem] border p-4" style={tintPanelStyle}>
                <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" style={tintStyle} />
                  Merke
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.learnNote}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Reset */}
        {revealed && (
          <div className="flex justify-end pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Andere Antwort prüfen
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
      <p className="text-sm leading-relaxed text-muted-foreground">
        Die folgenden Szenarien sind fachlich adaptierte Übungsbeispiele. Sie
        zeigen mögliche Formulierungen, keine universellen Gesprächsrezepte. Die
        Rollen sind erfunden und nicht aus einer Diagnose ableitbar; die Übung
        trainiert bewusst nur eine mögliche Sprecherposition. Kontext, Beziehung
        und Sicherheit können eine andere Antwort, einen Rollenwechsel oder eine
        Pause sinnvoll machen; keine Formulierung garantiert den Verlauf.
      </p>
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
