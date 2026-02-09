import { useState, useCallback } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Lightbulb
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  subtext: string;
  optionA: { text: string; mode: "clean" | "clear" };
  optionB: { text: string; mode: "clean" | "clear" };
}

const questions: Question[] = [
  {
    id: 1,
    text: "Es läuft gerade gut. Was denken Sie?",
    subtext: "Wählen Sie die Aussage, die Ihrem Gefühl näher kommt.",
    optionA: { 
      text: "«Endlich ist das Schlimmste überstanden – jetzt wird alles gut.»", 
      mode: "clean" 
    },
    optionB: { 
      text: "«Es läuft gut, und ich weiss, dass auch schwierigere Tage kommen können. Dafür haben wir einen Plan.»", 
      mode: "clear" 
    }
  },
  {
    id: 2,
    text: "Ihr Angehöriger hat einen schwierigen Tag. Wie reagieren Sie innerlich?",
    subtext: "Ehrlichkeit hilft – es gibt keine falsche Antwort.",
    optionA: { 
      text: "«Ich wusste es – die ganze Besserung war nur Fassade.»", 
      mode: "clean" 
    },
    optionB: { 
      text: "«Ein Rückschritt gehört dazu. Das ändert nichts an den Fortschritten der letzten Wochen.»", 
      mode: "clear" 
    }
  },
  {
    id: 3,
    text: "Wie gehen Sie mit den Therapie-Skills Ihres Angehörigen um?",
    subtext: "Denken Sie an die letzten Wochen.",
    optionA: { 
      text: "«Die Therapie hat gewirkt – Skills braucht man jetzt nicht mehr so intensiv.»", 
      mode: "clean" 
    },
    optionB: { 
      text: "«Skills sind wie Muskeltraining – sie brauchen regelmässige Übung, auch in guten Zeiten.»", 
      mode: "clear" 
    }
  }
];

type ResultType = "mostly-clear" | "mixed" | "mostly-clean";

interface ResultData {
  type: ResultType;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  message: string;
  tip: string;
}

const results: Record<ResultType, ResultData> = {
  "mostly-clear": {
    type: "mostly-clear",
    title: "«Klarer-Kopf»-Modus",
    icon: CheckCircle2,
    iconColor: "text-sage-mid",
    bgColor: "bg-sage-wash/50",
    borderColor: "border-sage-mid/30",
    message: "Sie haben eine realistische, hoffnungsvolle Haltung. Sie feiern Fortschritte, ohne die Augen vor möglichen Rückschritten zu verschliessen. Das ist genau die Balance, die Ihrem Angehörigen – und Ihnen – am meisten hilft.",
    tip: "Bleiben Sie bei dieser Haltung. Und erinnern Sie sich in schwierigen Momenten daran, dass Sie diesen klaren Blick haben."
  },
  "mixed": {
    type: "mixed",
    title: "Zwischen beiden Modi",
    icon: Lightbulb,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-200/50",
    message: "Sie schwanken zwischen Hoffnung und Sorge – das ist völlig normal und menschlich. Wichtig ist, dass Sie dieses Muster jetzt kennen. Allein das Bewusstsein hilft, in kritischen Momenten den «Klarer-Kopf»-Modus bewusst zu wählen.",
    tip: "Wenn Sie merken, dass Sie in Schwarz-Weiss-Denken rutschen, fragen Sie sich: «Ist das gerade der ‹Alles-überstanden›-Modus – oder sehe ich die Situation realistisch?»"
  },
  "mostly-clean": {
    type: "mostly-clean",
    title: "Tendenz zum «Alles-überstanden»-Modus",
    icon: AlertTriangle,
    iconColor: "text-terracotta-mid",
    bgColor: "bg-terracotta-wash/30",
    borderColor: "border-terracotta-mid/20",
    message: "Kein Grund zur Sorge – aber ein guter Moment zur Reflexion. Der «Alles-überstanden»-Modus ist verständlich: Man sehnt sich danach, dass es endlich vorbei ist. Aber wenn die Wachsamkeit ganz sinkt, können Rückschritte härter treffen als nötig.",
    tip: "Versuchen Sie, Erfolge zu feiern und gleichzeitig einen kleinen Notfallplan griffbereit zu haben. Das ist kein Pessimismus – sondern Vorbereitung."
  }
};

export default function CleanMindCheck() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<("clean" | "clear")[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = useCallback((mode: "clean" | "clear") => {
    const newAnswers = [...answers, mode];
    setAnswers(newAnswers);
    if (newAnswers.length >= questions.length) {
      setShowResult(true);
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [answers]);

  const reset = useCallback(() => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  }, []);

  const getResult = useCallback((): ResultData => {
    const cleanCount = answers.filter(a => a === "clean").length;
    if (cleanCount === 0) return results["mostly-clear"];
    if (cleanCount >= 2) return results["mostly-clean"];
    return results["mixed"];
  }, [answers]);

  if (showResult) {
    const result = getResult();
    const Icon = result.icon;
    return (
      <Card className={`${result.bgColor} border ${result.borderColor}`}>
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <Icon className={`w-6 h-6 ${result.iconColor} flex-shrink-0 mt-0.5`} />
            <div>
              <h4 className="font-semibold text-foreground mb-1">{result.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.message}</p>
            </div>
          </div>
          
          <div className="bg-background/60 rounded-lg p-4 mb-4">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-medium">Tipp:</span> {result.tip}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              type="button"
              variant="outline" 
              size="sm" 
              onClick={reset}
              className="gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nochmal
            </Button>
            <Link href="/glossar?q=DBT">
              <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <ArrowRight className="w-3.5 h-3.5" />
                Mehr über DBT im Glossar
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Dieser Kurzcheck ersetzt keine professionelle Beratung. Er basiert auf dem Clean-Mind/Clear-Mind-Konzept 
            aus Linehans DBT Skills Training (2015), Handout 17.
          </p>
        </CardContent>
      </Card>
    );
  }

  const q = questions[currentQ];

  return (
    <Card className="border-border/50 bg-background/80">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-sage-mid flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm">
              Kurzcheck: In welchem Modus bin ich?
            </h4>
            <p className="text-xs text-muted-foreground">
              Frage {currentQ + 1} von {questions.length}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-5">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < currentQ ? "bg-sage-mid" : i === currentQ ? "bg-sage-mid/50" : "bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-foreground font-medium mb-1.5">{q.text}</p>
            <p className="text-xs text-muted-foreground mb-5">{q.subtext}</p>

            <div className="space-y-3">
              {/* Randomize order to avoid bias */}
              {[q.optionA, q.optionB].map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(option.mode)}
                  className="w-full text-left p-4 rounded-lg border border-border/50 bg-background hover:border-sage-mid/50 hover:bg-sage-wash/20 transition-all duration-200 group"
                >
                  <p className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                    {option.text}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
