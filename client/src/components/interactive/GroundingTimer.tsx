/**
 * GroundingTimer – Interaktives Element #5
 * Geführte 5-4-3-2-1 Übung mit Countdown pro Sinneskanal.
 * + Sanfte Klangschalen-Töne (Web Audio API) beim Stufenwechsel
 * Einfügepunkt: /selbstfuersorge → Sofort-Übungen (neben Atemübung)
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Ear, Hand, Wind as Nose, Coffee, Play, RotateCcw, Pause, CheckCircle2, Volume2, VolumeX } from "lucide-react";
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

/**
 * Synthesizes a gentle singing bowl / bell tone using Web Audio API.
 * Uses a sine wave with a slow exponential decay to mimic a resonating bowl.
 * Different frequencies for different contexts:
 * - "start": warm welcoming tone (392 Hz, G4)
 * - "transition": soft chime (523 Hz, C5)
 * - "complete": two-note resolution (392 Hz → 523 Hz)
 */
function useBowlSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && typeof AudioContext !== "undefined");
  }, []);

  const getContext = useCallback(() => {
    if (!audioCtxRef.current && isSupported) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, [isSupported]);

  const playTone = useCallback(
    (frequency: number, duration: number, volume: number = 0.3, delay: number = 0) => {
      const ctx = getContext();
      if (!ctx) return;

      // Resume if suspended (browser autoplay policy)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const startTime = ctx.currentTime + delay;

      // Main sine oscillator (fundamental)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, startTime);

      // Gentle overtone for warmth
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(frequency * 2, startTime);

      // Gain for main tone
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      // Gain for overtone (much quieter)
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(volume * 0.15, startTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);

      // Connect
      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      // Start and stop
      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + duration);
      osc2.stop(startTime + duration);
    },
    [getContext]
  );

  const playStart = useCallback(() => {
    // Warm welcoming tone: G4 (392 Hz)
    playTone(392, 2.5, 0.25);
  }, [playTone]);

  const playTransition = useCallback(() => {
    // Soft chime: C5 (523 Hz) – higher, lighter
    playTone(523.25, 2.0, 0.2);
  }, [playTone]);

  const playComplete = useCallback(() => {
    // Two-note resolution: G4 → C5 (perfect fourth, calming)
    playTone(392, 2.5, 0.25, 0);
    playTone(523.25, 3.0, 0.25, 0.6);
  }, [playTone]);

  const cleanup = useCallback(() => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  return { playStart, playTransition, playComplete, cleanup, isSupported };
}

export default function GroundingTimer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { playStart, playTransition, playComplete, cleanup, isSupported } = useBowlSound();

  const SECONDS_PER_ITEM = 8;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(
    (stepIndex: number) => {
      const step = steps[stepIndex];
      const totalTime = step.count * SECONDS_PER_ITEM;
      setTimeLeft(totalTime);

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            if (stepIndex < steps.length - 1) {
              // Play transition chime
              if (audioEnabled) {
                playTransition();
              }
              setTimeout(() => startStep(stepIndex + 1), 600);
            } else {
              // Play completion sound
              if (audioEnabled) {
                playComplete();
              }
              setPhase("done");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioEnabled, clearTimer, playTransition, playComplete]
  );

  const startStep = useCallback(
    (stepIndex: number) => {
      clearTimer();
      setCurrentStep(stepIndex);
      setPhase("running");
      startCountdown(stepIndex);
    },
    [clearTimer, startCountdown]
  );

  const handleStart = () => {
    if (audioEnabled) {
      playStart();
    }
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
            if (audioEnabled) {
              playTransition();
            }
            setTimeout(() => startStep(currentStep + 1), 600);
          } else {
            if (audioEnabled) {
              playComplete();
            }
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

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
      cleanup();
    };
  }, [clearTimer, cleanup]);

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <Card className="bg-gradient-to-br from-slate-light/30 to-slate-wash/20 border-slate-dark">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Hand className="w-6 h-6 text-slate-dark" />
            <span className="font-semibold text-foreground text-base block" role="heading" aria-level={2}>
              5-4-3-2-1 Grounding
            </span>
          </div>

          {/* Audio toggle */}
          {isSupported && (
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                audioEnabled
                  ? "bg-slate-dark text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
              aria-label={audioEnabled ? "Klänge deaktivieren" : "Klänge aktivieren"}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Klang an</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Klang aus</span>
                </>
              )}
            </button>
          )}
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
                {isSupported && (
                  <span className="block mt-1 text-xs">
                    {audioEnabled
                      ? "Sanfte Klangschalen-Töne begleiten den Wechsel zwischen den Sinnen."
                      : "Aktivieren Sie «Klang», um beruhigende Töne beim Stufenwechsel zu hören."}
                  </span>
                )}
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
                {audioEnabled && <Volume2 className="w-3.5 h-3.5 ml-1 opacity-60" />}
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
