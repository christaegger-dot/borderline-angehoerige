import { useState, useCallback } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Shield
} from "lucide-react";
import { kontaktById } from "@/data/kontakte";

interface Question {
  id: number;
  area: string;
  text: string;
  subtext: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    area: "Emotionale Belastung",
    text: "Wie oft fühlen Sie sich in den letzten zwei Wochen emotional erschöpft?",
    subtext: "Denken Sie an Ihren allgemeinen Zustand, nicht nur an einzelne Tage.",
    options: [
      { text: "Selten – ich habe genug Energie für meinen Alltag.", score: 0 },
      { text: "Manchmal – es gibt gute und schlechte Tage.", score: 1 },
      { text: "Häufig – ich fühle mich oft ausgelaugt oder überfordert.", score: 2 }
    ]
  },
  {
    id: 2,
    area: "Körperliche Signale",
    text: "Schlafen Sie gut und achten Sie auf Ihre körperlichen Bedürfnisse?",
    subtext: "Schlaf, Ernährung, Bewegung – die Grundlagen.",
    options: [
      { text: "Ja, ich schlafe meistens gut und achte auf mich.", score: 0 },
      { text: "Es schwankt – manchmal vergesse ich mich selbst.", score: 1 },
      { text: "Mein Schlaf ist schlecht, und ich vernachlässige meine Gesundheit.", score: 2 }
    ]
  },
  {
    id: 3,
    area: "Soziale Kontakte",
    text: "Haben Sie in der letzten Woche etwas unternommen, das nichts mit Ihrem Angehörigen zu tun hatte?",
    subtext: "Freunde treffen, ein Hobby, ein Spaziergang allein – alles zählt.",
    options: [
      { text: "Ja, mehrmals – ich pflege meine eigenen Interessen.", score: 0 },
      { text: "Einmal vielleicht – es fällt mir schwer, mir Zeit zu nehmen.", score: 1 },
      { text: "Nein – mein Leben dreht sich fast nur um meinen Angehörigen.", score: 2 }
    ]
  },
  {
    id: 4,
    area: "Grenzen",
    text: "Können Sie «Nein» sagen, wenn es Ihnen zu viel wird?",
    subtext: "Auch gegenüber Ihrem Angehörigen oder anderen Familienmitgliedern.",
    options: [
      { text: "Ja, ich kenne meine Grenzen und kommuniziere sie.", score: 0 },
      { text: "Manchmal – aber oft habe ich ein schlechtes Gewissen dabei.", score: 1 },
      { text: "Kaum – ich fühle mich verantwortlich für alles.", score: 2 }
    ]
  },
  {
    id: 5,
    area: "Unterstützung",
    text: "Haben Sie jemanden, mit dem Sie offen über Ihre Situation sprechen können?",
    subtext: "Eine Vertrauensperson, Selbsthilfegruppe oder Fachperson.",
    options: [
      { text: "Ja, ich habe mindestens eine Person, die mich versteht.", score: 0 },
      { text: "Teilweise – aber ich rede selten über das, was mich wirklich belastet.", score: 1 },
      { text: "Nein – ich fühle mich mit meiner Situation allein.", score: 2 }
    ]
  }
];

type ResultType = "gut" | "achtung" | "handeln";

interface ResultData {
  type: ResultType;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  message: string;
  tips: string[];
  linkText: string;
  linkHref: string;
}

const results: Record<ResultType, ResultData> = {
  "gut": {
    type: "gut",
    title: "Gute Selbstfürsorge",
    icon: CheckCircle2,
    iconColor: "text-sage-mid",
    bgColor: "bg-sage-wash/50",
    borderColor: "border-sage-mid/30",
    message: "Sie achten gut auf sich – das ist eine wichtige Stärke. Selbstfürsorge ist kein Zustand, den man einmal erreicht, sondern eine tägliche Entscheidung. Bleiben Sie aufmerksam für Veränderungen.",
    tips: [
      "Halten Sie Ihre Routinen aufrecht – auch wenn es gerade gut läuft.",
      "Teilen Sie Ihre Erfahrungen: Andere Angehörige können von Ihrem Weg lernen."
    ],
    linkText: "Langfristige Strategien entdecken",
    linkHref: "/selbstfuersorge#langfristige-strategien"
  },
  "achtung": {
    type: "achtung",
    title: "Erste Warnsignale",
    icon: Lightbulb,
    iconColor: "text-sos-amber-text",
    bgColor: "bg-sos-amber-wash/50",
    borderColor: "border-sos-amber-border/50",
    message: "Sie geben viel – und es zeigt sich. Einige Bereiche verdienen mehr Aufmerksamkeit. Das ist kein Versagen, sondern ein normales Zeichen dafür, dass Sie sich in einer anspruchsvollen Situation befinden.",
    tips: [
      "Planen Sie diese Woche eine konkrete Auszeit ein – auch wenn es nur 30 Minuten sind.",
      "Sprechen Sie mit einer Vertrauensperson über das, was Sie belastet.",
      "Lesen Sie die Sofort-Übungen auf dieser Seite – sie helfen in akuten Momenten."
    ],
    linkText: "Sofort-Übungen ansehen",
    linkHref: "/selbstfuersorge#sofort-uebungen"
  },
  "handeln": {
    type: "handeln",
    title: "Zeit zu handeln",
    icon: AlertTriangle,
    iconColor: "text-terracotta-mid",
    bgColor: "bg-terracotta-wash/30",
    borderColor: "border-terracotta-mid/20",
    message: "Ihre Antworten deuten darauf hin, dass Sie sich stark verausgaben. Das ist verständlich – aber auf Dauer gefährdet es Ihre Gesundheit und Ihre Fähigkeit, für Ihren Angehörigen da zu sein. Sie verdienen Unterstützung.",
    tips: [
      "Sprechen Sie zeitnah mit Ihrem Hausarzt über Ihre Belastung.",
      `Die Fachstelle Angehörigenarbeit (PUK Zürich) bietet kostenlose Beratung: ${kontaktById("INFO_FACHSTELLE")?.nummer ?? "058 384 38 00"}.`,
      "Erlauben Sie sich, Hilfe anzunehmen – das ist kein Zeichen von Schwäche."
    ],
    linkText: "Beratungsangebote ansehen",
    linkHref: "/beratung"
  }
};

export default function SelbstfuersorgeCheck() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = useCallback((score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    if (newScores.length >= questions.length) {
      setShowResult(true);
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }, [scores]);

  const reset = useCallback(() => {
    setCurrentQ(0);
    setScores([]);
    setShowResult(false);
  }, []);

  const getResult = useCallback((): ResultData => {
    const total = scores.reduce((sum, s) => sum + s, 0);
    if (total <= 3) return results["gut"];
    if (total <= 6) return results["achtung"];
    return results["handeln"];
  }, [scores]);

  if (showResult) {
    const result = getResult();
    const Icon = result.icon;
    const total = scores.reduce((sum, s) => sum + s, 0);
    
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

          {/* Visuelle Skala */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Gute Selbstfürsorge</span>
              <span>Handlungsbedarf</span>
            </div>
            <div className="h-2 bg-border/50 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${
                  total <= 3 ? "bg-sage-mid" : total <= 6 ? "bg-sos-amber-text" : "bg-terracotta-mid"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${(total / 10) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {result.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-background/60 rounded-lg p-3">
                <Shield className="w-4 h-4 text-sage-mid flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{tip}</p>
              </div>
            ))}
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
            <Link href={result.linkHref}>
              <Button type="button" variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <ArrowRight className="w-3.5 h-3.5" />
                {result.linkText}
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Dieser Kurzcheck ersetzt keine professionelle Diagnostik. Er dient als Orientierungshilfe 
            für Ihre Selbstreflexion. Bei anhaltender Belastung wenden Sie sich an eine Fachperson.
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
          <Heart className="w-5 h-5 text-terracotta-mid flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm">
              Kurzcheck: Wie steht es um meine Selbstfürsorge?
            </h4>
            <p className="text-xs text-muted-foreground">
              Frage {currentQ + 1} von {questions.length} · {q.area}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-5">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < currentQ ? "bg-terracotta-mid" : i === currentQ ? "bg-terracotta-mid/50" : "bg-border"
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
              {q.options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left p-4 rounded-lg border border-border/50 bg-background hover:border-terracotta-mid/50 hover:bg-terracotta-wash/20 transition-all duration-200 group"
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
