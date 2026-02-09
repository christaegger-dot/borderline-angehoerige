/**
 * SETDragDrop – Interaktive SET-Kommunikation Zuordnungsübung
 * Aussagen per Klick den richtigen SET-Kategorien (Support, Empathy, Truth) zuordnen.
 * Touch-friendly: Statt echtem Drag-and-Drop nutzen wir ein "Select & Place"-Pattern.
 * Einfügepunkt: /kommunizieren → nach der SET-Kommunikation-Sektion
 */
import { useState, useCallback, useMemo } from "react";
import { CheckCircle2, XCircle, RotateCcw, Sparkles, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "./ProgressBar";

interface SETItem {
  id: number;
  text: string;
  correct: "S" | "E" | "T";
  explanation: string;
}

const setItems: SETItem[] = [
  {
    id: 1,
    text: "«Ich mache mir Sorgen um dich und möchte für dich da sein.»",
    correct: "S",
    explanation: "Dies drückt Ihre persönliche Sorge und Unterstützungsbereitschaft aus – ein klares Support-Statement.",
  },
  {
    id: 2,
    text: "«Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.»",
    correct: "E",
    explanation: "Sie zeigen, dass Sie die Gefühle des anderen nachvollziehen können – das ist Empathie.",
  },
  {
    id: 3,
    text: "«Wenn du jetzt gehst, ohne Bescheid zu sagen, mache ich mir grosse Sorgen. Lass uns eine Lösung finden.»",
    correct: "T",
    explanation: "Sie benennen die Realität und mögliche Konsequenzen – das ist der Truth-Teil.",
  },
  {
    id: 4,
    text: "«Ich bin hier, egal was passiert. Du bist mir wichtig.»",
    correct: "S",
    explanation: "Eine bedingungslose Unterstützungszusage – Support in seiner reinsten Form.",
  },
  {
    id: 5,
    text: "«Das klingt, als hättest du dich sehr allein gefühlt in dem Moment.»",
    correct: "E",
    explanation: "Sie spiegeln das unausgesprochene Gefühl – empathisches Verstehen.",
  },
  {
    id: 6,
    text: "«Die Therapeutin hat gesagt, dass regelmässige Termine wichtig sind. Wie können wir das zusammen schaffen?»",
    correct: "T",
    explanation: "Sie benennen eine objektive Tatsache und suchen gemeinsam nach Lösungen – Truth mit Kooperation.",
  },
  {
    id: 7,
    text: "«Es tut mir leid, dass du so leidest. Ich wünschte, ich könnte es leichter machen.»",
    correct: "S",
    explanation: "Mitgefühl und der Wunsch zu helfen – ein Support-Statement, das Nähe schafft.",
  },
  {
    id: 8,
    text: "«Ich sehe, dass du gerade überfordert bist. Das ist eine Menge auf einmal.»",
    correct: "E",
    explanation: "Sie erkennen den emotionalen Zustand an, ohne zu bewerten – Empathie.",
  },
  {
    id: 9,
    text: "«Wir haben vereinbart, dass wir bei Streit eine Pause machen. Ich schlage vor, wir halten uns daran.»",
    correct: "T",
    explanation: "Sie erinnern an eine gemeinsame Vereinbarung – eine sachliche Wahrheit, die Struktur gibt.",
  },
];

const categories = [
  {
    key: "S" as const,
    label: "Support",
    subtitle: "Unterstützung",
    color: "var(--color-sage)",
    bgClass: "bg-sage-wash",
    borderClass: "border-sage-mid/50",
    textClass: "text-sage-dark",
  },
  {
    key: "E" as const,
    label: "Empathy",
    subtitle: "Empathie",
    color: "var(--color-terracotta)",
    bgClass: "bg-terracotta-wash",
    borderClass: "border-terracotta-mid/50",
    textClass: "text-terracotta-dark",
  },
  {
    key: "T" as const,
    label: "Truth",
    subtitle: "Wahrheit",
    color: "var(--color-slate-blue)",
    bgClass: "bg-slate-wash",
    borderClass: "border-slate-dark/50",
    textClass: "text-slate-dark",
  },
];

type Assignment = Record<number, "S" | "E" | "T">;
type Feedback = Record<number, boolean>;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SETDragDrop() {
  const progress = useProgress("set_dragdrop", setItems.length);
  const [shuffledItems] = useState(() => shuffleArray(setItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assignments, setAssignments] = useState<Assignment>({});
  const [feedback, setFeedback] = useState<Feedback>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [phase, setPhase] = useState<"playing" | "done">("playing");
  const [key, setKey] = useState(0);

  const currentItem = shuffledItems[currentIndex];

  const correctCount = useMemo(
    () => Object.values(feedback).filter(Boolean).length,
    [feedback]
  );

  const handleAssign = useCallback(
    (category: "S" | "E" | "T") => {
      if (!currentItem || feedback[currentItem.id] !== undefined) return;

      const isCorrect = currentItem.correct === category;
      setAssignments((prev) => ({ ...prev, [currentItem.id]: category }));
      setFeedback((prev) => ({ ...prev, [currentItem.id]: isCorrect }));
      setShowExplanation(true);

      if (isCorrect) {
        progress.markRevealed(currentItem.id - 1);
      }
    },
    [currentItem, feedback, progress]
  );

  const handleNext = useCallback(() => {
    setShowExplanation(false);
    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase("done");
    }
  }, [currentIndex, shuffledItems.length]);

  const handleReset = useCallback(() => {
    setKey((prev) => prev + 1);
    setAssignments({});
    setFeedback({});
    setShowExplanation(false);
    setCurrentIndex(0);
    setPhase("playing");
    progress.reset();
  }, [progress]);

  return (
    <div className="mt-6" key={key}>
      {/* Progress bar */}
      <div className="mb-4">
        <ProgressBar
          revealed={progress.revealed}
          total={progress.total}
          percentage={progress.percentage}
          color="var(--color-slate-blue)"
          label="richtig"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Ordnen Sie jede Aussage der richtigen SET-Kategorie zu.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          aria-label="Übung zurücksetzen"
        >
          <RotateCcw className="w-3 h-3" />
          Neu starten
        </button>
      </div>

      <AnimatePresence mode="wait">
        {phase === "playing" && currentItem && (
          <motion.div
            key={`item-${currentItem.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Current statement */}
            <Card className="mb-4 border-2 border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Aussage {currentIndex + 1} von {shuffledItems.length}
                  </span>
                  {feedback[currentItem.id] !== undefined && (
                    <span className={`text-xs font-medium flex items-center gap-1 ${
                      feedback[currentItem.id] ? "text-sage-mid" : "text-terracotta-mid"
                    }`}>
                      {feedback[currentItem.id] ? (
                        <><CheckCircle2 className="w-3.5 h-3.5" /> Richtig</>
                      ) : (
                        <><XCircle className="w-3.5 h-3.5" /> Nicht ganz</>
                      )}
                    </span>
                  )}
                </div>

                <p className="text-foreground font-medium leading-relaxed text-sm">
                  {currentItem.text}
                </p>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-4 p-3 rounded-lg border text-sm ${
                        feedback[currentItem.id]
                          ? "bg-sage-wash/50 border-sage-mid/30"
                          : "bg-terracotta-wash/50 border-terracotta-mid/30"
                      }`}>
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground text-xs mb-1">
                              {!feedback[currentItem.id] && (
                                <span className="font-medium">
                                  Richtige Antwort: {categories.find(c => c.key === currentItem.correct)?.label} ({categories.find(c => c.key === currentItem.correct)?.subtitle}).{" "}
                                </span>
                              )}
                              {currentItem.explanation}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNext}
                        size="sm"
                        className="mt-3 w-full gap-2 bg-slate-dark hover:bg-charcoal text-white"
                      >
                        {currentIndex < shuffledItems.length - 1 ? (
                          <>Nächste Aussage <ArrowRight className="w-3.5 h-3.5" /></>
                        ) : (
                          <>Ergebnis anzeigen <CheckCircle2 className="w-3.5 h-3.5" /></>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Category buttons */}
            {!showExplanation && (
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.key}
                    onClick={() => handleAssign(cat.key)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-center
                      hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                      ${cat.bgClass} ${cat.borderClass}`}

                    aria-label={`Zuordnen zu ${cat.label} (${cat.subtitle})`}
                  >
                    <span
                      className="block text-2xl font-bold mb-1"
                      style={{ color: cat.color }}
                    >
                      {cat.key}
                    </span>
                    <span className={`block text-xs font-medium ${cat.textClass}`}>
                      {cat.label}
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {cat.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Hint */}
            {!showExplanation && (
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                Tipp: S = Ihre Sorge, E = Gefühle verstehen, T = Realität benennen
              </p>
            )}
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-sage-mid/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-sage-wash flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-sage-mid" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  Übung abgeschlossen
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  Sie haben <span className="font-semibold text-foreground">{correctCount}</span> von{" "}
                  <span className="font-semibold text-foreground">{shuffledItems.length}</span> Aussagen
                  richtig zugeordnet.
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  {correctCount === shuffledItems.length
                    ? "Ausgezeichnet! Sie beherrschen die SET-Kommunikation."
                    : correctCount >= shuffledItems.length * 0.7
                    ? "Gut gemacht! Mit etwas Übung wird es noch sicherer."
                    : "Kein Problem – SET braucht Übung. Versuchen Sie es nochmal."}
                </p>

                {/* Summary */}
                <div className="text-left space-y-2 mb-6">
                  {shuffledItems.map((item) => {
                    const isCorrect = feedback[item.id];
                    const assigned = assignments[item.id];
                    const correctCat = categories.find((c) => c.key === item.correct);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                          isCorrect ? "bg-sage-wash/50" : "bg-terracotta-wash/50"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage-mid flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-terracotta-mid flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-foreground leading-snug">{item.text}</p>
                          {!isCorrect && (
                            <p className="text-muted-foreground mt-0.5">
                              Ihre Antwort: {assigned} → Richtig: {correctCat?.label}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Nochmal üben
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mt-4">
        Quelle: Jerold J. Kreisman & Hal Straus, «I Hate You – Don't Leave Me» (2010)
      </p>
    </div>
  );
}
