import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Heart, Users, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Erfahrungsbericht {
  text: string;
  autor: string;
  beziehung: string;
  icon: "partner" | "eltern" | "geschwister";
  highlight?: string;
}

const berichte: Erfahrungsbericht[] = [
  {
    text: "Am Anfang dachte ich, ich mache alles falsch. Jeder Versuch zu helfen schien die Situation zu verschlimmern. Erst als ich lernte, dass ich nicht für seine Gefühle verantwortlich bin – aber für meine Reaktion darauf – begann sich etwas zu verändern. Heute, nach drei Jahren, haben wir eine Beziehung, die ich mir damals nicht vorstellen konnte.",
    autor: "Sandra, 42",
    beziehung: "Partnerin",
    icon: "partner",
    highlight: "Ich bin nicht für seine Gefühle verantwortlich – aber für meine Reaktion darauf."
  },
  {
    text: "Als Mutter einer Tochter mit Borderline habe ich jahrelang versucht, sie zu 'retten'. Ich habe mich selbst dabei verloren. Der Wendepunkt kam, als mir eine Therapeutin sagte: 'Sie können ein Leuchtturm sein, aber nicht das Schiff steuern.' Heute setze ich Grenzen – aus Liebe, nicht aus Ablehnung. Und unsere Beziehung ist ehrlicher als je zuvor.",
    autor: "Monika, 58",
    beziehung: "Mutter",
    icon: "eltern",
    highlight: "Sie können ein Leuchtturm sein, aber nicht das Schiff steuern."
  },
  {
    text: "Mein Bruder wurde mit 25 diagnostiziert. Die ersten Jahre waren eine Achterbahn – Krisen, Klinikaufenthalte, Funkstille. Was mir geholfen hat: Eine Selbsthilfegruppe für Angehörige. Zu merken, dass ich nicht allein bin. Und zu akzeptieren, dass Heilung kein gerader Weg ist. Er macht Fortschritte, in seinem Tempo. Und ich habe gelernt, dabei zu sein, ohne mich aufzugeben.",
    autor: "Thomas, 34",
    beziehung: "Bruder",
    icon: "geschwister",
    highlight: "Heilung ist kein gerader Weg."
  },
  {
    text: "Nach der Diagnose meiner Frau war ich wütend – auf die Ärzte, auf sie, auf mich selbst. Warum hat niemand das früher erkannt? Dann kam die Trauer. Und irgendwann die Akzeptanz. Heute weiss ich: Borderline ist ein Teil von ihr, aber nicht alles. Sie ist auch die Frau, die ich liebe, mit all ihrer Tiefe und Intensität.",
    autor: "Marco, 47",
    beziehung: "Ehemann",
    icon: "partner",
    highlight: "Borderline ist ein Teil von ihr, aber nicht alles."
  }
];

const iconMap = {
  partner: Heart,
  eltern: Users,
  geschwister: User
};

interface ErfahrungsberichteProps {
  maxBerichte?: number;
  showTitle?: boolean;
  variant?: "full" | "compact" | "carousel";
}

export default function Erfahrungsberichte({ 
  maxBerichte = 4, 
  showTitle = true,
  variant = "carousel" 
}: ErfahrungsberichteProps) {
  const displayBerichte = berichte.slice(0, maxBerichte);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % displayBerichte.length, 1);
  }, [current, displayBerichte.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + displayBerichte.length) % displayBerichte.length, -1);
  }, [current, displayBerichte.length, goTo]);

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (isPaused || variant !== "carousel") return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, isPaused, variant]);

  // Grid variant (original)
  if (variant !== "carousel") {
    return (
      <section className="py-12 md:py-16">
        <div className="container">
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Stimmen von Angehörigen
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Sie sind nicht allein. Andere Angehörige teilen ihre Erfahrungen – 
                die Herausforderungen, aber auch die Hoffnung.
              </p>
            </motion.div>
          )}
          
          <div className={`grid gap-6 ${variant === "full" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {displayBerichte.map((bericht, index) => {
              const Icon = iconMap[bericht.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: "easeOut" }}
                >
                  <Card className="h-full border-border/50 hover:border-terracotta transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-terracotta-lighter flex items-center justify-center">
                          <Icon className="w-5 h-5 text-terracotta-mid" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{bericht.autor}</p>
                          <p className="text-sm text-muted-foreground">{bericht.beziehung}</p>
                        </div>
                      </div>
                      
                      <Quote className="w-8 h-8 text-terracotta-light mb-3" />
                      
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                        {bericht.text}
                      </p>
                      
                      {bericht.highlight && (
                        <div className="bg-terracotta-wash rounded-lg p-3 border-l-2 border-terracotta">
                          <p className="text-sm font-medium text-foreground italic">
                            "{bericht.highlight}"
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
          * Die Erfahrungsberichte sind redaktionell nachempfunden und basieren auf typischen Erfahrungen von Angehörigen. Namen und Details wurden verändert.
        </motion.p>
      </div>
    </section>
  );
  }

  // Carousel variant
  const bericht = displayBerichte[current];
  const Icon = iconMap[bericht.icon];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Stimmen von Angehörigen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sie sind nicht allein. Andere Angehörige teilen ihre Erfahrungen – 
              die Herausforderungen, aber auch die Hoffnung.
            </p>
          </motion.div>
        )}
        
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Vorheriger Bericht"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Nächster Bericht"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Card container with fixed height */}
          <div className="overflow-hidden px-2" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-terracotta-lighter flex items-center justify-center">
                        <Icon className="w-6 h-6 text-terracotta-mid" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-lg">{bericht.autor}</p>
                        <p className="text-sm text-muted-foreground">{bericht.beziehung}</p>
                      </div>
                    </div>
                    
                    <Quote className="w-10 h-10 text-terracotta-light mb-4" />
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                      {bericht.text}
                    </p>
                    
                    {bericht.highlight && (
                      <div className="bg-terracotta-wash rounded-xl p-4 border-l-3 border-terracotta">
                        <p className="text-base font-medium text-foreground italic">
                          "{bericht.highlight}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-0 mt-6">
            {displayBerichte.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goTo(index, index > current ? 1 : -1)}
                className="relative flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label={`Bericht ${index + 1}`}
              >
                <span className={`block transition-all duration-500 rounded-full ${
                  index === current 
                    ? "w-8 h-2.5 bg-terracotta" 
                    : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground/40"
                }`} />
              </button>
            ))}
          </div>

          {/* Progress bar */}
          {!isPaused && (
            <div className="mt-3 max-w-xs mx-auto h-0.5 bg-border rounded-full overflow-hidden">
              <motion.div
                key={current}
                className="h-full bg-terracotta rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>
          )}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          * Die Erfahrungsberichte sind redaktionell nachempfunden und basieren auf typischen Erfahrungen von Angehörigen. Namen und Details wurden verändert.
        </motion.p>
      </div>
    </section>
  );
}
