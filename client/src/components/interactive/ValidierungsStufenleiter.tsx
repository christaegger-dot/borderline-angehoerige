/**
 * ValidierungsStufenleiter – Interaktives Element #3
 * Interaktiver Stepper: Klick auf jede Stufe zeigt Beispiel-Dialog mit Highlight.
 * Einfügepunkt: /kommunizieren → 6 Stufen der Validierung
 * + localStorage-Fortschritts-Tracker (tracks which steps have been visited)
 */
import { useState, useEffect } from "react";
import { Eye, MessageSquare, Sparkles, History, Users, Star, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "./ProgressBar";

interface Stufe {
  level: number;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  example: string;
  dialog: {
    angehoeriger: string;
    betroffener: string;
  };
  tipp: string;
}

const stufen: Stufe[] = [
  {
    level: 1,
    title: "Präsent sein",
    icon: Eye,
    color: "var(--color-sand-border)",
    description: "Aufmerksam zuhören, Blickkontakt halten, nicht abgelenkt sein.",
    example: "Sie legen das Handy weg und wenden sich Ihrem Angehörigen zu.",
    dialog: {
      betroffener: "Mir geht es nicht gut heute…",
      angehoeriger: "(Handy weglegen, Blickkontakt) Ich bin da. Erzähl mir.",
    },
    tipp: "Schon allein Ihre volle Aufmerksamkeit kann beruhigend wirken.",
  },
  {
    level: 2,
    title: "Genau reflektieren",
    icon: MessageSquare,
    color: "var(--color-terracotta)",
    description: "Das Gehörte in eigenen Worten wiedergeben – ohne Interpretation.",
    example: "«Du sagst, du fühlst dich allein gelassen.»",
    dialog: {
      betroffener: "Niemand ruft mich an. Alle haben mich vergessen.",
      angehoeriger: "Du sagst, du fühlst dich allein gelassen und vergessen.",
    },
    tipp: "Beginnen Sie mit «Du sagst…» oder «Ich höre, dass…».",
  },
  {
    level: 3,
    title: "Unausgesprochenes benennen",
    icon: Sparkles,
    color: "var(--color-sand-mid)",
    description: "Gefühle erkennen, die nicht direkt ausgesprochen werden.",
    example: "«Das klingt, als wärst du auch wütend darüber.»",
    dialog: {
      betroffener: "Mein Chef hat mich vor allen kritisiert. Egal.",
      angehoeriger: "Das klingt, als wärst du nicht nur enttäuscht, sondern auch wütend und verletzt.",
    },
    tipp: "Achten Sie auf Körpersprache und Tonfall – sie verraten oft mehr als Worte.",
  },
  {
    level: 4,
    title: "Aus der Geschichte erklären",
    icon: History,
    color: "var(--color-terracotta-mid)",
    description: "Das Verhalten im Kontext der Lebensgeschichte verstehen.",
    example: "«Nach allem, was du erlebt hast, ist es verständlich, dass du so reagierst.»",
    dialog: {
      betroffener: "Ich kann einfach niemandem vertrauen!",
      angehoeriger: "Nach dem, was du in deiner Kindheit erlebt hast, ist es verständlich, dass Vertrauen so schwer ist.",
    },
    tipp: "Das ist keine Entschuldigung für Verhalten, sondern ein Verstehen der Ursache.",
  },
  {
    level: 5,
    title: "Normalität bestätigen",
    icon: Users,
    color: "var(--color-terracotta-dark)",
    description: "Bestätigen, dass die Reaktion in dieser Situation normal ist.",
    example: "«Jeder würde in dieser Situation so fühlen.»",
    dialog: {
      betroffener: "Bin ich verrückt, dass mich das so trifft?",
      angehoeriger: "Nein, das ist eine ganz normale Reaktion. Jeder würde sich in dieser Situation verletzt fühlen.",
    },
    tipp: "Besonders wirksam bei Menschen, die ihre eigenen Gefühle oft in Frage stellen.",
  },
  {
    level: 6,
    title: "Radikale Echtheit",
    icon: Star,
    color: "var(--color-terracotta-dark)",
    description: "Echtes, tiefes Verständnis und Vertrauen in die Stärke des anderen.",
    example: "«Ich glaube an dich. Du schaffst das.»",
    dialog: {
      betroffener: "Ich weiss nicht, ob ich das jemals schaffe…",
      angehoeriger: "Ich sehe, wie hart du kämpfst. Und ich glaube an dich – du hast schon so viel geschafft.",
    },
    tipp: "Die höchste Stufe: Authentisch sein, nicht perfekt.",
  },
];

export default function ValidierungsStufenleiter() {
  const [activeLevel, setActiveLevel] = useState(0);
  const progress = useProgress("validierung_stufen", stufen.length);
  const current = stufen[activeLevel];

  // Mark current step as visited whenever it changes
  useEffect(() => {
    progress.markRevealed(activeLevel);
  }, [activeLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-6">
      {/* Progress bar */}
      <div className="mb-4">
        <ProgressBar
          revealed={progress.revealed}
          total={progress.total}
          percentage={progress.percentage}
          color="var(--color-terracotta)"
          label="besucht"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-5">
        Klicken Sie auf eine Stufe, um den Beispiel-Dialog zu sehen. Arbeiten Sie sich von Stufe 1 nach oben.
      </p>

      {/* Stufen-Leiste */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {stufen.map((stufe, index) => {
          const SIcon = stufe.icon;
          const isActive = index === activeLevel;
          const isVisited = progress.isRevealed(index);
          return (
            <button
              key={stufe.level}
              onClick={() => setActiveLevel(index)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-mid ${
                isActive
                  ? "text-white shadow-md"
                  : isVisited
                  ? "bg-sage-wash text-sage-dark"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
              style={isActive ? { backgroundColor: stufe.color } : undefined}
              aria-label={`Stufe ${stufe.level}: ${stufe.title}${isVisited && !isActive ? " (besucht)" : ""}`}
              aria-pressed={isActive}
            >
              {isVisited && !isActive ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <SIcon className="w-3.5 h-3.5" />
              )}
              <span>{stufe.level}</span>
            </button>
          );
        })}
      </div>

      {/* Aktive Stufe – Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-2" style={{ borderColor: current.color }}>
            <CardContent className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-9 h-9 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: current.color }}
                >
                  {current.level}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground text-base">
                    {current.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {current.description}
                  </p>
                </div>
              </div>

              {/* Dialog */}
              <div className="rounded-lg bg-muted/30 p-4 space-y-3 mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Beispiel-Dialog:
                </p>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-terracotta-mid bg-terracotta-wash px-2 py-0.5 rounded flex-shrink-0">
                    B
                  </span>
                  <p className="text-sm text-foreground italic">
                    {current.dialog.betroffener}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-sage-dark bg-sage-wash px-2 py-0.5 rounded flex-shrink-0">
                    A
                  </span>
                  <p
                    className="text-sm font-medium leading-relaxed rounded-md px-2 py-1"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${current.color} 10%, white)`,
                      color: current.color,
                    }}
                  >
                    {current.dialog.angehoeriger}
                  </p>
                </div>
              </div>

              {/* Tipp */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-background rounded-lg p-3 border border-border/50">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-sage-mid" />
                <p>{current.tipp}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveLevel(Math.max(0, activeLevel - 1))}
                  disabled={activeLevel === 0}
                  className="gap-1 text-xs"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Zurück
                </Button>
                <span className="text-xs text-muted-foreground">
                  {activeLevel + 1} / {stufen.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setActiveLevel(Math.min(stufen.length - 1, activeLevel + 1))
                  }
                  disabled={activeLevel === stufen.length - 1}
                  className="gap-1 text-xs"
                >
                  Weiter
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-muted-foreground mt-4">
        Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
      </p>
    </div>
  );
}
