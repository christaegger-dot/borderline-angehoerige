/**
 * ValidierungsStufenleiter – Interaktives Element #3
 * Interaktiver Stepper: Klick auf jede Stufe zeigt Beispiel-Dialog mit Highlight.
 * Einfügepunkt: /kommunizieren → 6 Stufen der Validierung
 * + localStorage-Fortschritts-Tracker (tracks which steps have been visited)
 * 
 * Inhalt basiert auf: Marsha M. Linehan, DBT Skills Training Manual (2015),
 * Handout 18: A "How To" Guide to Validation – 6 Levels of Validation.
 * Angepasst für Angehörige von Menschen mit Borderline.
 */
import { useState, useEffect } from "react";
import { Eye, MessageSquare, Sparkles, History, Users, Star, ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "./ProgressBar";

interface Stufe {
  level: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  ziel: string;
  soGehts: string[];
  beispielsaetze: string[];
  typischerFehler: string;
  dialog: {
    angehoeriger: string;
    betroffener: string;
  };
}

const stufen: Stufe[] = [
  {
    level: 1,
    title: "Aufmerksam sein",
    subtitle: "«Ich bin jetzt wirklich da.»",
    icon: Eye,
    color: "var(--color-sand-border)",
    ziel: "Sicherheit durch Präsenz.",
    soGehts: [
      "Kurz innehalten, Blick und Körper zuwenden",
      "Handy weg, nicht nebenbei «argumentieren»",
      "Ruhige Stimme",
    ],
    beispielsaetze: [
      "«Ich bin da. Sag mir, was los ist.»",
      "«Ich möchte dich verstehen. Erzähl.»",
    ],
    typischerFehler: "Gleich Lösungen, Ratschläge oder Logik («Du musst doch nur…»).",
    dialog: {
      betroffener: "Mir geht es nicht gut heute…",
      angehoeriger: "(Handy weglegen, Blickkontakt) Ich bin da. Erzähl mir, was los ist.",
    },
  },
  {
    level: 2,
    title: "Spiegeln",
    subtitle: "«Ich habe verstanden, was du meinst.»",
    icon: MessageSquare,
    color: "var(--color-terracotta)",
    ziel: "Missverständnisse reduzieren, Tempo rausnehmen.",
    soGehts: [
      "In eigenen Worten zusammenfassen",
      "Ohne Bewertung, ohne Ironie",
    ],
    beispielsaetze: [
      "«Du fühlst dich gerade total verletzt, weil du meinst, ich hätte dich ignoriert.»",
      "«Wenn ich dich richtig verstehe: Du hast Angst, dass ich dich verlasse.»",
    ],
    typischerFehler: "Spiegeln mit «aber» («Ich verstehe, ABER…») – das fühlt sich oft wie Abwertung an.",
    dialog: {
      betroffener: "Niemand ruft mich an. Alle haben mich vergessen.",
      angehoeriger: "Du fühlst dich gerade allein gelassen und vergessen. Stimmt das so?",
    },
  },
  {
    level: 3,
    title: "Zwischen den Zeilen verstehen",
    subtitle: "«Kann es sein, dass…?»",
    icon: Sparkles,
    color: "var(--color-sand-mid)",
    ziel: "Das Gefühl hinter der Reaktion erkennen (z. B. Scham hinter Wut).",
    soGehts: [
      "Vorsichtige Vermutung äussern",
      "Korrektur erlauben – nachfragen statt behaupten",
    ],
    beispielsaetze: [
      "«Ich frage mich, ob da auch Angst dabei ist – stimmt das?»",
      "«Bist du gerade eher verletzt als wütend?»",
    ],
    typischerFehler: "Gedankenlesen als Tatsache («Du bist doch nur eifersüchtig!»).",
    dialog: {
      betroffener: "Mein Chef hat mich vor allen kritisiert. Egal.",
      angehoeriger: "Kann es sein, dass du nicht nur enttäuscht bist, sondern auch wütend und verletzt?",
    },
  },
  {
    level: 4,
    title: "Nachvollziehen",
    subtitle: "«Es macht Sinn, dass das dich triggert.»",
    icon: History,
    color: "var(--color-terracotta-mid)",
    ziel: "Bedeutung geben, ohne zu bewerten.",
    soGehts: [
      "Gründe benennen: Stress, Vergangenheit, Trigger, Überforderung",
      "Sinn machen statt recht haben",
    ],
    beispielsaetze: [
      "«Wenn du dich schnell verlassen fühlst, ist es logisch, dass das Warten dich so stresst.»",
      "«Bei dem, was du heute schon alles hattest, ist klar, dass die Nerven dünn sind.»",
    ],
    typischerFehler: "Bagatellisieren («So schlimm ist das doch nicht.»).",
    dialog: {
      betroffener: "Ich kann einfach niemandem vertrauen!",
      angehoeriger: "Nach dem, was du erlebt hast, macht es Sinn, dass Vertrauen so schwer ist.",
    },
  },
  {
    level: 5,
    title: "Das Gültige anerkennen",
    subtitle: "«Diesen Teil kann ich gut nachvollziehen.»",
    icon: Users,
    color: "var(--color-terracotta-dark)",
    ziel: "Den «wahren Kern» finden – auch wenn anderes nicht okay war.",
    soGehts: [
      "Gefühl oder Bedürfnis anerkennen (z. B. Nähe, Sicherheit, Respekt)",
      "Ggf. Verhalten später getrennt ansprechen",
    ],
    beispielsaetze: [
      "«Dass du dir Nähe wünschst, ist völlig verständlich.»",
      "«Ich sehe, dass du gerade dringend Sicherheit brauchst.»",
      "«Ich verstehe, dass du verzweifelt bist – und ich kann nicht angeschrien werden.»",
      "«Ich sehe deine Angst – und ich bleibe bei meinem Nein.»",
    ],
    typischerFehler: "Validierung mit Nachgeben verwechseln.",
    dialog: {
      betroffener: "Bin ich verrückt, dass mich das so trifft?",
      angehoeriger: "Nein – dass du dir Sicherheit wünschst, ist völlig verständlich. Und ich sage dir auch ehrlich, wo meine Grenze ist.",
    },
  },
  {
    level: 6,
    title: "Auf Augenhöhe bleiben",
    subtitle: "«Wir sind zwei gleichwertige Menschen.»",
    icon: Star,
    color: "var(--color-terracotta-dark)",
    ziel: "Keine Überlegenheit, keine Herablassung, keine «Therapeutenrolle».",
    soGehts: [
      "Respektvoll, klar, ruhig",
      "Kein Spott, keine Diagnosen als Keule («Du bist halt Borderliner…»)",
      "Kein «Ich weiss schon, was du brauchst»",
    ],
    beispielsaetze: [
      "«Ich nehme dich ernst. Und ich sage dir auch ehrlich, wie es bei mir ankommt.»",
      "«Wir finden einen Weg, der für uns beide passt.»",
    ],
    typischerFehler: "Belehren, analysieren, «psychologisieren».",
    dialog: {
      betroffener: "Du verstehst mich sowieso nicht…",
      angehoeriger: "Ich nehme dich ernst. Und ich sage dir auch ehrlich, wie es bei mir ankommt. Lass uns zusammen schauen.",
    },
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
        Klicken Sie auf eine Stufe, um Beispielsätze und den typischen Fehler zu sehen. Arbeiten Sie sich von Stufe 1 nach oben.
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
              <div className="flex items-center gap-3 mb-1">
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
                  <p className="text-sm text-muted-foreground italic">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              {/* Ziel */}
              <div className="mt-4 mb-4">
                <p className="text-sm text-foreground">
                  <strong>Ziel:</strong> {current.ziel}
                </p>
              </div>

              {/* So geht's */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">So geht's:</p>
                <ul className="space-y-1.5">
                  {current.soGehts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-mid flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beispielsätze */}
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Beispielsätze:</p>
                <div className="space-y-2">
                  {current.beispielsaetze.map((satz, i) => (
                    <div
                      key={i}
                      className="text-sm font-medium leading-relaxed rounded-md px-3 py-2"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${current.color} 10%, white)`,
                        color: current.color,
                      }}
                    >
                      {satz}
                    </div>
                  ))}
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

              {/* Typischer Fehler */}
              <div className="flex items-start gap-2 text-xs bg-terracotta-wash/50 rounded-lg p-3 border border-terracotta-mid/20">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-terracotta-mid" />
                <p className="text-foreground">
                  <strong className="text-terracotta-mid">Typischer Fehler:</strong>{" "}
                  {current.typischerFehler}
                </p>
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
        Quelle: Marsha M. Linehan, DBT Skills Training Handouts and Worksheets, 2nd Edition (2015), Handout 18: A "How To" Guide to Validation.
      </p>
    </div>
  );
}
