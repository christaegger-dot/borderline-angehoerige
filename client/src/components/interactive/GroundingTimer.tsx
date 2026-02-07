/**
 * GroundingTimer – Interaktives Element #5
 * Geführte 5-4-3-2-1 Übung mit Countdown pro Sinneskanal.
 *
 * Audio: Komplett über HTML5 <audio> DOM-Elemente (KEIN Web Audio API).
 * iOS-Unlock: unmute-ios-audio Paket + manueller play()-Aufruf bei pointerdown.
 * Fehlerhandling: Bei rejected play() → Hinweismeldung an User.
 *
 * Design-Lock: Inter, Tokens, kein Dark Mode. Nur Fix, kein neues UI.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye, Ear, Hand, Wind as Nose, Coffee,
  Play, RotateCcw, Pause, CheckCircle2,
  Volume2, VolumeX, AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import unmuteAudio from "unmute-ios-audio";

/* ── Grounding Steps ─────────────────────────────────── */

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
    count: 5, sense: "Sehen", icon: Eye,
    color: "var(--color-sage-mid)", bgColor: "var(--color-sage-wash)",
    instruction: "Benennen Sie 5 Dinge, die Sie sehen.",
    prompt: "Schauen Sie sich um. Was fällt Ihnen auf?",
  },
  {
    count: 4, sense: "Hören", icon: Ear,
    color: "var(--color-slate-dark)", bgColor: "var(--color-slate-wash)",
    instruction: "Benennen Sie 4 Dinge, die Sie hören.",
    prompt: "Schliessen Sie kurz die Augen. Was hören Sie?",
  },
  {
    count: 3, sense: "Fühlen", icon: Hand,
    color: "var(--color-terracotta-mid)", bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 3 Dinge, die Sie berühren/fühlen.",
    prompt: "Berühren Sie etwas. Wie fühlt es sich an?",
  },
  {
    count: 2, sense: "Riechen", icon: Nose,
    color: "var(--color-sand-mid)", bgColor: "var(--color-sand-muted)",
    instruction: "Benennen Sie 2 Dinge, die Sie riechen.",
    prompt: "Atmen Sie bewusst ein. Was riechen Sie?",
  },
  {
    count: 1, sense: "Schmecken", icon: Coffee,
    color: "var(--color-terracotta-dark)", bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 1 Ding, das Sie schmecken.",
    prompt: "Konzentrieren Sie sich auf Ihren Geschmack.",
  },
];

/* ── Audio CDN URLs ──────────────────────────────────── */

const AUDIO_URLS = {
  start: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GKtjZNZDuEaUAmbl.mp3",
  transition: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NuJzTwfObzgArAmO.mp3",
  complete: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xIUYbPjSjZIjAzza.mp3",
} as const;

type SoundKey = keyof typeof AUDIO_URLS;

/* ── Types ───────────────────────────────────────────── */

type Phase = "idle" | "running" | "paused" | "done";

/* ── Component ───────────────────────────────────────── */

export default function GroundingTimer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [iosUnlocked, setIosUnlocked] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioEnabledRef = useRef(audioEnabled);
  const currentStepRef = useRef(currentStep);

  // DOM audio elements – created once, reused
  const audioElsRef = useRef<Record<SoundKey, HTMLAudioElement | null>>({
    start: null,
    transition: null,
    complete: null,
  });

  const SECONDS_PER_ITEM = 8;

  // Keep refs in sync
  useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);
  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  /* ── iOS global unlock (runs once) ─────────────────── */
  useEffect(() => {
    // unmute-ios-audio: registers pointerdown/touchend listeners globally
    // and plays a silent <audio> + AudioContext to unlock iOS audio pipeline
    unmuteAudio();
  }, []);

  /* ── Create DOM <audio> elements on mount ──────────── */
  useEffect(() => {
    const keys: SoundKey[] = ["start", "transition", "complete"];

    keys.forEach((key) => {
      const el = document.createElement("audio");
      el.preload = "auto";
      el.setAttribute("playsinline", "");
      el.setAttribute("x-webkit-airplay", "deny");
      el.crossOrigin = "anonymous";
      el.volume = 0.7;
      el.src = AUDIO_URLS[key];
      el.load();
      audioElsRef.current[key] = el;
    });

    return () => {
      keys.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el) {
          el.pause();
          el.removeAttribute("src");
          el.load();
          audioElsRef.current[key] = null;
        }
      });
    };
  }, []);

  /* ── Play a sound via DOM <audio> ──────────────────── */
  const playSound = useCallback((key: SoundKey) => {
    const el = audioElsRef.current[key];
    if (!el) return;

    el.currentTime = 0;
    el.volume = 0.7;

    const p = el.play();
    if (p) {
      p.catch(() => {
        // Playback rejected – iOS may still be locked
        // Don't set audioBlocked here for non-user-gesture calls;
        // the transition/complete sounds fire from timers, not gestures.
      });
    }
  }, []);

  /**
   * iOS unlock: play each audio element once from a direct user gesture.
   * This "warms" the audio elements so subsequent play() calls work.
   * Uses pointerdown timing (called from onClick which fires after pointerdown).
   */
  const unlockAndPreview = useCallback(() => {
    setAudioBlocked(false);

    const keys: SoundKey[] = ["start", "transition", "complete"];

    // First: play + immediately pause each audio to unlock them on iOS
    keys.forEach((key) => {
      const el = audioElsRef.current[key];
      if (el) {
        el.volume = 0.01; // nearly silent for unlock
        el.currentTime = 0;
        const p = el.play();
        if (p) {
          p.then(() => {
            el.pause();
            el.currentTime = 0;
            el.volume = 0.7;
          }).catch(() => {
            el.volume = 0.7;
          });
        }
      }
    });

    setIosUnlocked(true);

    // Then: play audible preview tone after a short delay
    setTimeout(() => {
      const preview = audioElsRef.current.transition;
      if (preview) {
        preview.currentTime = 0;
        preview.volume = 0.7;
        const p = preview.play();
        if (p) {
          p.catch(() => {
            setAudioBlocked(true);
          });
        }
      }
    }, 150);
  }, []);

  /* ── Timer helpers ─────────────────────────────────── */

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advanceToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= steps.length) {
      if (audioEnabledRef.current) playSound("complete");
      setPhase("done");
      return;
    }

    clearTimer();
    setCurrentStep(stepIndex);
    setPhase("running");
    const totalTime = steps[stepIndex].count * SECONDS_PER_ITEM;
    setTimeLeft(totalTime);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (stepIndex < steps.length - 1) {
            if (audioEnabledRef.current) playSound("transition");
            setTimeout(() => advanceToStep(stepIndex + 1), 600);
          } else {
            if (audioEnabledRef.current) playSound("complete");
            setPhase("done");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, playSound]);

  /* ── User actions ──────────────────────────────────── */

  const handleToggleAudio = () => {
    const newVal = !audioEnabled;
    setAudioEnabled(newVal);
    setAudioBlocked(false);

    if (newVal) {
      // Direct user gesture → unlock + preview
      unlockAndPreview();
    }
  };

  const handleStart = () => {
    // Always re-unlock on start (direct user gesture)
    if (audioEnabled && !iosUnlocked) {
      unlockAndPreview();
    }

    if (audioEnabled) {
      setTimeout(() => playSound("start"), 100);
    }

    clearTimer();
    setCurrentStep(0);
    setPhase("running");
    const totalTime = steps[0].count * SECONDS_PER_ITEM;
    setTimeLeft(totalTime);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (audioEnabledRef.current) playSound("transition");
          setTimeout(() => advanceToStep(1), 600);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    clearTimer();
    setPhase("paused");
  };

  const handleResume = () => {
    // Re-unlock on resume (direct user gesture)
    if (audioEnabled) {
      const keys: SoundKey[] = ["start", "transition", "complete"];
      keys.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el) {
          el.volume = 0.01;
          el.currentTime = 0;
          const p = el.play();
          if (p) {
            p.then(() => { el.pause(); el.currentTime = 0; el.volume = 0.7; })
              .catch(() => { el.volume = 0.7; });
          }
        }
      });
    }

    setPhase("running");
    const idx = currentStepRef.current;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (idx < steps.length - 1) {
            if (audioEnabledRef.current) playSound("transition");
            setTimeout(() => advanceToStep(idx + 1), 600);
          } else {
            if (audioEnabledRef.current) playSound("complete");
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
    setAudioBlocked(false);
  };

  // Cleanup on unmount
  useEffect(() => () => { clearTimer(); }, [clearTimer]);

  /* ── Render ────────────────────────────────────────── */

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <Card className="bg-gradient-to-br from-slate-light/30 to-slate-wash/20 border-slate-dark">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Hand className="w-6 h-6 text-slate-dark" />
            <span className="font-semibold text-foreground text-base block" role="heading" aria-level={2}>
              5-4-3-2-1 Grounding
            </span>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              audioEnabled
                ? "bg-slate-dark text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            aria-label={audioEnabled ? "Klänge deaktivieren" : "Klänge aktivieren"}
            aria-pressed={audioEnabled}
          >
            {audioEnabled ? (
              <><Volume2 className="w-3.5 h-3.5" /><span>Klang an</span></>
            ) : (
              <><VolumeX className="w-3.5 h-3.5" /><span>Klang aus</span></>
            )}
          </button>
        </div>

        {/* Audio blocked warning */}
        {audioBlocked && (
          <div className="flex items-center gap-2 p-2.5 mb-3 rounded-lg bg-terracotta-wash text-terracotta-dark text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Audio blockiert – bitte einmal auf den Bildschirm tippen und erneut «Klang an» drücken.</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── IDLE ─────────────────────────────────── */}
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-muted-foreground text-sm mb-4">
                Diese geführte Übung bringt Sie in den gegenwärtigen Moment zurück – Schritt für Schritt durch alle 5 Sinne.
                <span className="block mt-1 text-xs">
                  {audioEnabled
                    ? "Sanfte Klangschalen-Töne begleiten den Wechsel zwischen den Sinnen."
                    : "Aktivieren Sie «Klang», um beruhigende Töne beim Stufenwechsel zu hören."}
                </span>
              </p>

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

          {/* ── RUNNING / PAUSED ─────────────────────── */}
          {(phase === "running" || phase === "paused") && (
            <motion.div key="active" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {steps.map((s, i) => (
                  <div
                    key={s.count}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i < currentStep ? "bg-sage-mid" : i === currentStep ? "w-3 h-3" : "bg-muted"
                    }`}
                    style={i === currentStep ? { backgroundColor: step.color } : undefined}
                  />
                ))}
              </div>

              {/* Current step card */}
              <div className="text-center py-4 rounded-xl mb-4" style={{ backgroundColor: step.bgColor }}>
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: step.color }}
                >
                  <StepIcon className="w-7 h-7 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: step.color }}>
                  {step.count} × {step.sense}
                </p>
                <p className="text-sm text-foreground font-medium mb-1">{step.instruction}</p>
                <p className="text-xs text-muted-foreground italic">{step.prompt}</p>
              </div>

              {/* Timer */}
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-foreground tabular-nums">{timeLeft}</span>
                <span className="text-sm text-muted-foreground ml-1">Sek.</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {phase === "running" ? (
                  <Button variant="outline" size="sm" onClick={handlePause} className="flex-1 gap-2">
                    <Pause className="w-4 h-4" /> Pause
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleResume} className="flex-1 gap-2 bg-slate-dark hover:bg-charcoal text-white">
                    <Play className="w-4 h-4" /> Weiter
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1">
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── DONE ─────────────────────────────────── */}
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
              <p className="text-lg font-semibold text-foreground mb-2">Gut gemacht.</p>
              <p className="text-sm text-muted-foreground mb-4">
                Sie sind wieder im Hier und Jetzt. Wie fühlen Sie sich?
              </p>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Nochmal machen
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
