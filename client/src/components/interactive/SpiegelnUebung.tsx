/**
 * SpiegelnUebung – Interaktives Element #4
 * Szenario-Karten mit „Aufdecken"-Button: erst das Szenario, dann die empfohlene Antwort.
 * Einfügepunkt: /grenzen → Formulierungen-Sektion (Spiegeln statt Aufnehmen)
 * + localStorage-Fortschritts-Tracker
 */
import { useState } from "react";
import { Eye, EyeOff, RotateCcw, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { kontaktById } from "@/data/kontakte";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "./ProgressBar";

interface Szenario {
  situation: string;
  kategorie: string;
  falsch: string;
  richtig: string;
  erklaerung: string;
}

const szenarien: Szenario[] = [
  {
    situation: "Ihr Angehöriger sagt: «Du bist schuld, dass es mir so schlecht geht!»",
    kategorie: "Vorwürfe",
    falsch: "«Das stimmt doch gar nicht!» oder «Du bist ungerecht!»",
    richtig: "«Ich höre, dass du das so siehst. Ich sehe es anders, und ich möchte verstehen, was dich beschäftigt.»",
    erklaerung: "Spiegeln statt Verteidigen: Sie nehmen das Gefühl wahr, ohne es zu übernehmen.",
  },
  {
    situation: "Ihr Angehöriger weint heftig und schreit: «Niemand versteht mich!»",
    kategorie: "Gefühlsausbruch",
    falsch: "«Beruhige dich!» oder «Das ist doch nicht so schlimm!»",
    richtig: "«Ich sehe, dass du gerade sehr aufgewühlt bist. Das klingt wirklich schwer für dich. Ich bin hier.»",
    erklaerung: "Validierung statt Minimierung: Gefühle anerkennen, ohne sie zu bewerten.",
  },
  {
    situation: "Sie brauchen eine Pause, aber Ihr Angehöriger will, dass Sie bleiben.",
    kategorie: "Grenzen",
    falsch: "«Ich halte das nicht mehr aus!» oder «Du machst mich fertig!»",
    richtig: "«Ich liebe dich, und gleichzeitig brauche ich jetzt eine Pause. Lass uns in einer Stunde weiterreden, wenn wir beide ruhiger sind.»",
    erklaerung: "Liebe und Grenze gleichzeitig: Beides ist möglich und notwendig.",
  },
  {
    situation: "Ihr Angehöriger droht: «Wenn du gehst, bringe ich mich um!»",
    kategorie: "Drohungen",
    falsch: "«Das sagst du nur, um mich zu erpressen!» oder einfach bleiben aus Angst.",
    richtig: `«Ich nehme das sehr ernst. Ich rufe jetzt die Dargebotene Hand an (${kontaktById("GRUEN_143")?.nummer ?? "143"}), damit du Unterstützung bekommst. Ich bin nicht die richtige Person, um dich in diesem Moment zu schützen.»`,
    erklaerung: "Professionelle Hilfe einschalten: Suiziddrohungen immer ernst nehmen, aber die Verantwortung an Fachpersonen übergeben.",
  },
];

function SzenarioCard({
  szenario,
  index,
  wasRevealed,
  onReveal,
}: {
  szenario: Szenario;
  index: number;
  wasRevealed: boolean;
  onReveal: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onReveal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-border bg-background overflow-hidden"
    >
      {/* Kategorie-Badge + Situation */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-slate-wash text-slate-dark">
            {szenario.kategorie}
          </span>
          {wasRevealed && !revealed && (
            <CheckCircle2 className="w-4 h-4 text-sage-mid/60" />
          )}
        </div>
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-terracotta-mid flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {szenario.situation}
          </p>
        </div>
      </div>

      {/* Aufdecken-Button oder Antwort */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pb-5"
          >
            <p className="text-xs text-muted-foreground mb-3 italic">
              Überlegen Sie kurz: Was würden Sie antworten?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReveal}
              className="w-full gap-2 border-sage-mid/50 text-sage-dark hover:bg-sage-wash"
            >
              <Eye className="w-4 h-4" />
              Empfohlene Antwort aufdecken
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            {/* Was nicht hilft */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs font-medium text-terracotta-mid mb-1">Weniger hilfreich:</p>
              <p className="text-sm text-muted-foreground line-through">{szenario.falsch}</p>
            </div>

            {/* Empfohlene Antwort */}
            <div className="px-5 py-3 bg-sage-wash/50">
              <p className="text-xs font-medium text-sage-dark mb-1">Empfohlene Antwort:</p>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                {szenario.richtig}
              </p>
            </div>

            {/* Erklärung */}
            <div className="px-5 py-3">
              <p className="text-xs text-muted-foreground italic">
                {szenario.erklaerung}
              </p>
            </div>

            <div className="px-5 pb-4">
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <EyeOff className="w-3 h-3" />
                Wieder verbergen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SpiegelnUebung() {
  const progress = useProgress("spiegeln_uebung", szenarien.length);
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
          color="var(--color-sage-mid)"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Lesen Sie die Situation und überlegen Sie, bevor Sie aufdecken.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          aria-label="Alle Karten zurücksetzen"
        >
          <RotateCcw className="w-3 h-3" />
          Zurücksetzen
        </button>
      </div>

      <div key={key} className="space-y-4">
        {szenarien.map((szenario, index) => (
          <SzenarioCard
            key={index}
            szenario={szenario}
            index={index}
            wasRevealed={progress.isRevealed(index)}
            onReveal={() => progress.markRevealed(index)}
          />
        ))}
      </div>
    </div>
  );
}
