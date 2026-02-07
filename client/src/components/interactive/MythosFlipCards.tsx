/**
 * MythosFlipCards – Interaktives Element #1
 * 6 Missverständnisse als Flip-Cards: Klick dreht die Karte um und zeigt die Realität.
 * Einfügepunkt: /verstehen → Missverständnisse-Sektion
 * + localStorage-Fortschritts-Tracker
 */
import { useState } from "react";
import { XCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "./ProgressBar";

interface MythCard {
  myth: string;
  truth: string;
}

const myths: MythCard[] = [
  {
    myth: "«Borderliner manipulieren absichtlich»",
    truth: "Das Verhalten ist keine bewusste Strategie, sondern ein verzweifelter Versuch, mit überwältigenden Emotionen umzugehen. Es fehlen oft die Fähigkeiten, Bedürfnisse anders auszudrücken.",
  },
  {
    myth: "«Borderline ist unheilbar»",
    truth: "Studien zeigen: 85–90 % der Betroffenen erfüllen nach 10 Jahren nicht mehr die Diagnosekriterien. Mit Therapie ist deutliche Besserung möglich.",
  },
  {
    myth: "«Sie könnten sich zusammenreissen, wenn sie wollten»",
    truth: "Borderline ist eine neurobiologische Erkrankung. Das Gehirn verarbeitet Emotionen anders. Es ist, als würde man jemandem mit Kurzsichtigkeit sagen: «Schau einfach genauer hin.»",
  },
  {
    myth: "«Nur Frauen haben Borderline»",
    truth: "Borderline betrifft alle Geschlechter etwa gleich häufig. Männer werden jedoch seltener diagnostiziert, da sie oft andere Symptome zeigen (mehr Wut, weniger Selbstverletzung).",
  },
  {
    myth: "«Borderliner sind gefährlich»",
    truth: "Menschen mit Borderline sind viel häufiger Opfer als Täter. Die Aggression richtet sich meist gegen sich selbst, nicht gegen andere.",
  },
  {
    myth: "«Das ist nur Aufmerksamkeitssuche»",
    truth: "Selbstverletzendes Verhalten ist ein ernsthafter Bewältigungsversuch für unerträgliche Gefühle – kein Ruf nach Aufmerksamkeit. Es verdient Mitgefühl, nicht Verurteilung.",
  },
];

function FlipCard({
  card,
  index,
  wasRevealed,
  onReveal,
}: {
  card: MythCard;
  index: number;
  wasRevealed: boolean;
  onReveal: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    if (next) onReveal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="perspective-[800px]"
    >
      <button
        onClick={handleClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-mid focus-visible:ring-offset-2 rounded-xl"
        aria-label={isFlipped ? `Zurück zum Mythos: ${card.myth}` : `Aufdecken: ${card.myth}`}
        aria-pressed={isFlipped}
      >
        <div
          className="relative w-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front – Mythos */}
          <div
            className="w-full rounded-xl border-2 border-dashed border-terracotta-mid/40 bg-terracotta-wash p-5 min-h-[140px] flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-terracotta-mid flex-shrink-0 mt-0.5" />
              <p className="font-semibold text-foreground text-sm leading-snug">
                {card.myth}
              </p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-terracotta-mid flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Antippen für die Realität
              </p>
              {wasRevealed && !isFlipped && (
                <CheckCircle2 className="w-4 h-4 text-sage-mid/60" />
              )}
            </div>
          </div>

          {/* Back – Realität */}
          <div
            className="absolute inset-0 w-full rounded-xl border-2 border-sage-mid/40 bg-sage-wash p-5 min-h-[140px] flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage-mid flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-sage-dark mb-1">Realität:</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {card.truth}
                </p>
              </div>
            </div>
            <p className="text-xs text-sage-mid mt-3 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              Antippen für den Mythos
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function MythosFlipCards() {
  const progress = useProgress("mythos_flip", myths.length);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prev) => prev + 1);
    progress.reset();
  };

  return (
    <div className="mt-6">
      {/* Progress bar */}
      <div className="mb-4">
        <ProgressBar
          revealed={progress.revealed}
          total={progress.total}
          percentage={progress.percentage}
          color="var(--color-terracotta-mid)"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Tippen Sie auf eine Karte, um die Realität aufzudecken.
        </p>
        <button
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          aria-label="Alle Karten zurücksetzen"
        >
          <RotateCcw className="w-3 h-3" />
          Zurücksetzen
        </button>
      </div>

      <div key={key} className="grid sm:grid-cols-2 gap-4">
        {myths.map((card, index) => (
          <FlipCard
            key={index}
            card={card}
            index={index}
            wasRevealed={progress.isRevealed(index)}
            onReveal={() => progress.markRevealed(index)}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Quellen: APA Practice Guideline (2024); Zanarini et al. (2012); Grant et al. (2008)
      </p>
    </div>
  );
}
