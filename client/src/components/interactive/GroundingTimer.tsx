/**
 * GroundingTimer – Interaktives Element #5
 * Geführte 5-4-3-2-1 Übung mit Countdown pro Sinneskanal.
 * Einfügepunkt: /selbstfuersorge → Sofort-Übungen (neben Atemübung)
 * Design: Tokens only, Inter only, mobile-first (375px safe)
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Ear, Hand, Wind as Nose, Coffee, Play, RotateCcw, Pause, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GroundingStep {
  count: number;
  sense: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  instruction: string;
  prompt: string;
}

const steps: GroundingStep[] = [
  {
    count: 5,
    sense: "Sehen",
    icon: Eye,
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-wash)",
    instruction: "Benennen Sie 5 Dinge, die Sie sehen.",
    prompt: "Schauen Sie sich um. Was fällt Ihnen auf?",
  },
  {
    count: 4,
    sense: "Hören",
    icon: Ear,
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    instruction: "Benennen Sie 4 Dinge, die Sie hören.",
    prompt: "Schliessen Sie kurz die Augen. Was hören Sie?",
  },
  {
    count: 3,
    sense: "Fühlen",
    icon: Hand,
    color: "var(--color-terracotta-mid)",
    bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 3 Dinge, die Sie berühren/fühlen.",
    prompt: "Berühren Sie etwas. Wie fühlt es sich an?",
  },
  {
    count: 2,
    sense: "Riechen",
    icon: Nose,
    color: "var(--color-sand-mid)",
    bgColor: "var(--color-sand-muted)",
    instruction: "Benennen Sie 2 Dinge, die Sie riechen.",
    prompt: "Atmen Sie bewusst ein. Was riechen Sie?",
  },
  {
    count: 1,
    sense: "Schmecken",
    icon: Coffee,
    color: "var(--color-terracotta-dark)",
    bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 1 Ding, das Sie schmecken.",
    prompt: "Konzentrieren Sie sich auf Ihren Geschmack.",
  },
];

type Phase = "idle" | "running" | "paused" | "done";

export default function GroundingTimer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SECONDS_PER_ITEM = 8; // 8 seconds per item to find

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startStep = useCallback(
    (stepIndex: number) => {
      clearTimer();
      const step = steps[stepIndex];
      const totalTime = step.count * SECONDS_PER_ITEM;
      setTimeLeft(totalTime);
      setCurrentStep(stepIndex);
      setPhase("running");

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            // Move to next step or finish
            if (stepIndex < steps.length - 1) {
              setTimeout(() => startStep(stepIndex + 1), 600);
            } else {
              setPhase("done");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clearTimer]
  );

  const handleStart = () => {
    startStep(0);
  };

  const handlePause = () => {
    clearTimer();
    setPhase("paused");
  };

  const handleResume = () => {
    setPhase("running");
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (currentStep < steps.length - 1) {
            setTimeout(() => startStep(currentStep + 1), 600);
          } else {
            setPhase("done");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleReset = () => {
    clearTimer();
    setPhase("idle");
    setCurrentStep(0);
    setTimeLeft(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <Card className="bg-gradient-to-br from-slate-light/30 to-slate-wash/20 border-slate-dark">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Hand className="w-6 h-6 text-slate-dark" />
          <span className="font-semibold text-foreground text-base block" role="heading" aria-level={2}>
            5-4-3-2-1 Grounding
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-muted-foreground text-sm mb-4">
                Diese geführte Übung bringt Sie in den gegenwärtigen Moment zurück – Schritt für Schritt durch alle 5 Sinne.
              </p>

              {/* Preview steps */}
              <div className="space-y-2 mb-4">
                {steps.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <div key={s.count} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.count}
                      </span>
                      <SIcon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
                      <span>{s.instruction}</span>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={handleStart}
                className="w-full bg-slate-dark hover:bg-charcoal text-white gap-2"
              >
                <Play className="w-4 h-4" />
                Übung starten
              </Button>
            </motion.div>
          )}

          {(phase === "running" || phase === "paused") && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {steps.map((s, i) => (
                  <div
                    key={s.count}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i < currentStep
                        ? "bg-sage-mid"
                        : i === currentStep
                        ? "w-3 h-3"
                        : "bg-muted"
                    }`}
                    style={
                      i === currentStep
                        ? { backgroundColor: step.color }
                        : undefined
                    }
                  />
                ))}
              </div>

              {/* Current step */}
              <div
                className="text-center py-4 rounded-xl mb-4"
                style={{ backgroundColor: step.bgColor }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: step.color }}
                >
                  <StepIcon className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: step.color }}>
                  {step.count} × {step.sense}
                </p>
                <p className="text-sm text-foreground font-medium mb-1">
                  {step.instruction}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {step.prompt}
                </p>
              </div>

              {/* Timer */}
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {timeLeft}
                </span>
                <span className="text-sm text-muted-foreground ml-1">Sek.</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {phase === "running" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePause}
                    className="flex-1 gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleResume}
                    className="flex-1 gap-2 bg-slate-dark hover:bg-charcoal text-white"
                  >
                    <Play className="w-4 h-4" />
                    Weiter
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-sage-mid/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-sage-mid" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">
                Gut gemacht.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Sie sind wieder im Hier und Jetzt. Wie fühlen Sie sich?
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Nochmal machen
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
