/**
 * GroundingTimerNatur – Alternative Grounding-Übung mit Naturgeräuschen
 *
 * Statt Klangschalen-Töne: Kontinuierliche, beruhigende Naturgeräusche
 * pro Sinneskanal (Ozean, Vogelgesang, Regen, Wald, Bach).
 *
 * Audio: HTML5 <audio> DOM-Elemente mit loop + crossfade.
 * iOS-Unlock: unmute-ios-audio + direkter play() im User-Gesture-Handler.
 *
 * Design-Lock: Inter, Tokens, kein Dark Mode.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye, Ear, Hand, Wind as Nose, Coffee,
  Play, RotateCcw, Pause, CheckCircle2,
  Volume2, VolumeX, AlertCircle, TreePine,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import unmuteAudio from "unmute-ios-audio";

/* ── Grounding Steps with Nature Sounds ─────────────── */

interface GroundingStep {
  count: number;
  sense: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  instruction: string;
  prompt: string;
  natureName: string;
  natureEmoji: string;
}

const NATURE_AUDIO_URLS: Record<string, string> = {
  ocean: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/lyVGSDGEWtnqczwr.mp3",
  birds: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/klKBLiridsgVMQlj.mp3",
  rain: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ECkKpaHDGPAUMcwN.mp3",
  forest: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/AWMMDLSVXlGEFFth.mp3",
  stream: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/LLUsxuaKMPCjjdFH.mp3",
};

type NatureKey = keyof typeof NATURE_AUDIO_URLS;

const steps: GroundingStep[] = [
  {
    count: 5, sense: "Sehen", icon: Eye,
    color: "var(--color-sage-mid)", bgColor: "var(--color-sage-wash)",
    instruction: "Benennen Sie 5 Dinge, die Sie sehen.",
    prompt: "Schauen Sie sich um. Was fällt Ihnen auf?",
    natureName: "Ozeanwellen", natureEmoji: "🌊",
  },
  {
    count: 4, sense: "Hören", icon: Ear,
    color: "var(--color-slate-dark)", bgColor: "var(--color-slate-wash)",
    instruction: "Benennen Sie 4 Dinge, die Sie hören.",
    prompt: "Schliessen Sie kurz die Augen. Was hören Sie?",
    natureName: "Vogelgesang", natureEmoji: "🐦",
  },
  {
    count: 3, sense: "Fühlen", icon: Hand,
    color: "var(--color-terracotta-mid)", bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 3 Dinge, die Sie berühren/fühlen.",
    prompt: "Berühren Sie etwas. Wie fühlt es sich an?",
    natureName: "Sanfter Regen", natureEmoji: "🌧",
  },
  {
    count: 2, sense: "Riechen", icon: Nose,
    color: "var(--color-sand-mid)", bgColor: "var(--color-sand-muted)",
    instruction: "Benennen Sie 2 Dinge, die Sie riechen.",
    prompt: "Atmen Sie bewusst ein. Was riechen Sie?",
    natureName: "Waldatmosphäre", natureEmoji: "🌲",
  },
  {
    count: 1, sense: "Schmecken", icon: Coffee,
    color: "var(--color-terracotta-dark)", bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 1 Ding, das Sie schmecken.",
    prompt: "Konzentrieren Sie sich auf Ihren Geschmack.",
    natureName: "Plätschernder Bach", natureEmoji: "💧",
  },
];

const NATURE_KEYS: NatureKey[] = ["ocean", "birds", "rain", "forest", "stream"];

/* ── Types ───────────────────────────────────────────── */

type Phase = "idle" | "running" | "paused" | "done";

/* ── Debug logger ────────────────────────────────────── */

const dbg = (msg: string, ...args: unknown[]) => {
  if (typeof console !== "undefined") {
    console.log(`[GroundingNatur] ${msg}`, ...args);
  }
};

/* ── Component ───────────────────────────────────────── */

export default function GroundingTimerNatur() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioEnabledRef = useRef(audioEnabled);
  const currentStepRef = useRef(currentStep);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // DOM audio elements – one per nature sound
  const audioElsRef = useRef<Record<string, HTMLAudioElement | null>>({
    ocean: null, birds: null, rain: null, forest: null, stream: null,
  });

  const SECONDS_PER_ITEM = 8;

  // Keep refs in sync
  useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);
  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  /* ── iOS global unlock (runs once) ─────────────────── */
  useEffect(() => {
    unmuteAudio();
    dbg("unmute-ios-audio initialized");
  }, []);

  /* ── Create DOM <audio> elements on mount ──────────── */
  useEffect(() => {
    NATURE_KEYS.forEach((key) => {
      const el = document.createElement("audio");
      el.preload = "auto";
      el.setAttribute("playsinline", "");
      el.setAttribute("x-webkit-airplay", "deny");
      el.loop = true;
      el.volume = 0;
      el.src = NATURE_AUDIO_URLS[key];

      // Debug event listeners
      el.addEventListener("error", () => {
        dbg(`ERROR on ${key}:`, el.error?.code, el.error?.message);
      });
      el.addEventListener("stalled", () => {
        dbg(`STALLED on ${key}, networkState:`, el.networkState);
      });
      el.addEventListener("canplaythrough", () => {
        dbg(`READY ${key}, readyState:`, el.readyState);
      });
      el.addEventListener("playing", () => {
        dbg(`PLAYING ${key}`);
      });

      // Insert into DOM – iOS Safari requires this
      el.style.position = "absolute";
      el.style.width = "0";
      el.style.height = "0";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      document.body.appendChild(el);
      el.load();
      audioElsRef.current[key] = el;
      dbg(`Created & appended <audio> for ${key}`);
    });

    return () => {
      NATURE_KEYS.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el) {
          el.pause();
          el.removeAttribute("src");
          el.load();
          if (el.parentNode) el.parentNode.removeChild(el);
          audioElsRef.current[key] = null;
        }
      });
    };
  }, []);

  /* ── Fade a sound in or out ────────────────────────── */
  const fadeSound = useCallback((key: NatureKey, targetVol: number, duration = 1500) => {
    const el = audioElsRef.current[key];
    if (!el) return;

    const startVol = el.volume;
    const diff = targetVol - startVol;
    const stepMs = 50;
    const totalSteps = Math.max(1, Math.round(duration / stepMs));
    let step = 0;

    if (targetVol > 0 && el.paused) {
      el.volume = 0.01;
      const p = el.play();
      if (p) {
        p.then(() => dbg(`fadeSound(${key}): play() OK`))
          .catch((e: Error) => dbg(`fadeSound(${key}): play() REJECTED:`, e.name, e.message));
      }
    }

    const id = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      el.volume = Math.max(0, Math.min(1, startVol + diff * progress));

      if (step >= totalSteps) {
        clearInterval(id);
        el.volume = Math.max(0, Math.min(1, targetVol));
        if (targetVol === 0) {
          el.pause();
          el.currentTime = 0;
          dbg(`fadeSound(${key}): faded out & paused`);
        } else {
          dbg(`fadeSound(${key}): faded in to ${targetVol}`);
        }
      }
    }, stepMs);
  }, []);

  /* ── Switch nature sound for current step ──────────── */
  const switchNatureSound = useCallback((stepIndex: number) => {
    if (!audioEnabledRef.current) return;

    const activeKey = NATURE_KEYS[stepIndex];
    dbg(`Switching to nature sound: ${activeKey} for step ${stepIndex}`);

    // Fade out all others
    NATURE_KEYS.forEach((key) => {
      if (key !== activeKey) {
        const el = audioElsRef.current[key];
        if (el && !el.paused) {
          fadeSound(key, 0, 1000);
        }
      }
    });

    // Fade in the active one
    fadeSound(activeKey, 0.5, 1500);
  }, [fadeSound]);

  /* ── Stop all nature sounds ────────────────────────── */
  const stopAllSounds = useCallback(() => {
    NATURE_KEYS.forEach((key) => {
      const el = audioElsRef.current[key];
      if (el && !el.paused) {
        fadeSound(key, 0, 800);
      }
    });
  }, [fadeSound]);

  /**
   * Direct user-gesture handler: unlock all audio elements IMMEDIATELY.
   * No setTimeout – iOS requires play() in the synchronous call stack.
   */
  const handleToggleAudio = () => {
    const newVal = !audioEnabled;
    setAudioEnabled(newVal);
    setAudioBlocked(false);

    if (newVal) {
      dbg("Audio ON – unlocking all audio elements in user gesture");

      // Unlock ALL audio elements by playing them briefly (MUST be in gesture stack)
      let anyBlocked = false;
      NATURE_KEYS.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el) {
          el.volume = 0.01;
          el.currentTime = 0;
          const p = el.play();
          if (p) {
            p.then(() => {
              // Play a short preview of ocean waves
              if (key === "ocean") {
                el.volume = 0.4;
                dbg(`Preview: playing ${key}`);
                // Auto-stop after 3 seconds
                setTimeout(() => {
                  if (el && !el.paused) {
                    fadeSound(key as NatureKey, 0, 800);
                  }
                }, 3000);
              } else {
                el.pause();
                el.currentTime = 0;
                el.volume = 0;
              }
              dbg(`Unlock ${key}: OK`);
            }).catch((e: Error) => {
              anyBlocked = true;
              dbg(`Unlock ${key}: REJECTED:`, e.name, e.message);
              el.volume = 0;
            });
          }
        }
      });

      // Check after a short delay if any were blocked
      setTimeout(() => {
        if (anyBlocked) setAudioBlocked(true);
      }, 200);
    } else {
      dbg("Audio OFF – stopping all sounds");
      stopAllSounds();
    }
  };

  /* ── Timer helpers ─────────────────────────────────── */

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const advanceToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= steps.length) {
      stopAllSounds();
      setPhase("done");
      return;
    }

    clearTimer();
    setCurrentStep(stepIndex);
    setPhase("running");
    const totalTime = steps[stepIndex].count * SECONDS_PER_ITEM;
    setTimeLeft(totalTime);

    // Switch nature sound
    switchNatureSound(stepIndex);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (stepIndex < steps.length - 1) {
            setTimeout(() => advanceToStep(stepIndex + 1), 600);
          } else {
            stopAllSounds();
            setPhase("done");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, switchNatureSound, stopAllSounds]);

  /* ── User actions ──────────────────────────────────── */

  const handleStart = () => {
    dbg("handleStart, audioEnabled:", audioEnabled);

    // Re-unlock in direct user gesture
    if (audioEnabled) {
      NATURE_KEYS.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el) {
          el.volume = 0.01;
          el.currentTime = 0;
          const p = el.play();
          if (p) {
            p.then(() => {
              if (key !== "ocean") {
                el.pause();
                el.currentTime = 0;
              }
              el.volume = 0;
            }).catch(() => { el.volume = 0; });
          }
        }
      });
    }

    clearTimer();
    setCurrentStep(0);
    setPhase("running");
    const totalTime = steps[0].count * SECONDS_PER_ITEM;
    setTimeLeft(totalTime);

    // Start ocean waves for first step
    if (audioEnabled) {
      switchNatureSound(0);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
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
    // Fade down but don't stop
    if (audioEnabled) {
      const key = NATURE_KEYS[currentStepRef.current];
      const el = audioElsRef.current[key];
      if (el && !el.paused) {
        fadeSound(key, 0.1, 500);
      }
    }
  };

  const handleResume = () => {
    // Re-unlock in direct user gesture
    if (audioEnabled) {
      NATURE_KEYS.forEach((key) => {
        const el = audioElsRef.current[key];
        if (el && el.paused) {
          el.volume = 0.01;
          const p = el.play();
          if (p) {
            p.then(() => {
              if (key !== NATURE_KEYS[currentStepRef.current]) {
                el.pause();
                el.volume = 0;
              }
            }).catch(() => { el.volume = 0; });
          }
        }
      });

      // Fade current sound back up
      const activeKey = NATURE_KEYS[currentStepRef.current];
      fadeSound(activeKey, 0.5, 500);
    }

    setPhase("running");
    const idx = currentStepRef.current;
    const remaining = timeLeft;

    if (remaining <= 0) {
      advanceToStep(idx + 1);
      return;
    }

    setTimeLeft(remaining);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          if (idx < steps.length - 1) {
            setTimeout(() => advanceToStep(idx + 1), 600);
          } else {
            stopAllSounds();
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
    stopAllSounds();
    setPhase("idle");
    setCurrentStep(0);
    setTimeLeft(0);
    setAudioBlocked(false);
  };

  // Cleanup on unmount
  useEffect(() => () => {
    clearTimer();
    NATURE_KEYS.forEach((key) => {
      const el = audioElsRef.current[key];
      if (el) { el.pause(); }
    });
  }, [clearTimer]);

  /* ── Render ────────────────────────────────────────── */

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <Card className="bg-gradient-to-br from-sage-wash/40 to-slate-wash/20 border-sage-mid/30">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TreePine className="w-6 h-6 text-sage-mid" />
            <span className="font-semibold text-foreground text-base block" role="heading" aria-level={2}>
              5-4-3-2-1 mit Naturklängen
            </span>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              audioEnabled
                ? "bg-sage-mid text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
            aria-label={audioEnabled ? "Naturklänge deaktivieren" : "Naturklänge aktivieren"}
            aria-pressed={audioEnabled}
          >
            {audioEnabled ? (
              <><Volume2 className="w-3.5 h-3.5" /><span>Natur an</span></>
            ) : (
              <><VolumeX className="w-3.5 h-3.5" /><span>Natur aus</span></>
            )}
          </button>
        </div>

        {/* Audio blocked warning */}
        {audioBlocked && (
          <div className="flex items-center gap-2 p-2.5 mb-3 rounded-lg bg-terracotta-wash text-terracotta-dark text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Audio blockiert – bitte einmal auf den Bildschirm tippen und erneut «Natur an» drücken.</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── IDLE ─────────────────────────────────── */}
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-muted-foreground text-sm mb-4">
                Lassen Sie sich von beruhigenden Naturgeräuschen durch die Übung begleiten – jeder Sinn bekommt seine eigene Klanglandschaft.
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
                      <span className="flex-1">{s.instruction}</span>
                      {audioEnabled && (
                        <span className="text-xs text-muted-foreground/60">{s.natureEmoji} {s.natureName}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={handleStart}
                className="w-full bg-sage-mid hover:bg-sage-dark text-white gap-2"
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
              <div className="text-center py-4 rounded-xl mb-4 relative overflow-hidden" style={{ backgroundColor: step.bgColor }}>
                {/* Nature sound indicator */}
                {audioEnabled && (
                  <div className="absolute top-2 right-3 flex items-center gap-1 text-xs text-muted-foreground/60">
                    <span>{step.natureEmoji}</span>
                    <span>{step.natureName}</span>
                  </div>
                )}

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
                  <Button size="sm" onClick={handleResume} className="flex-1 gap-2 bg-sage-mid hover:bg-sage-dark text-white">
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
