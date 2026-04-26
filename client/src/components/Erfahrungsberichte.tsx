import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

interface Erfahrungsbericht {
  title: string;
  text: string;
  icon: "partner" | "eltern" | "geschwister";
  highlight?: string;
}

const berichte: Erfahrungsbericht[] = [
  {
    title: "Wenn Helfen nur noch mehr Druck erzeugt",
    text: "Viele Angehörige erleben, dass jeder gut gemeinte Versuch zu helfen die Lage scheinbar weiter verschärft. Entlastung beginnt oft dort, wo Verantwortung klarer getrennt wird: Sie sind nicht für die Gefühle des anderen zuständig, aber für Ihre eigene Reaktion und Ihre Grenzen.",
    icon: "partner",
    highlight:
      "Sie sind nicht für die Gefühle des anderen zuständig, aber für Ihre eigene Reaktion.",
  },
  {
    title: "Wenn Fürsorge in Selbstverlust kippt",
    text: "Gerade Eltern geraten leicht in die Dynamik, immer mehr zu tragen, zu regulieren und aufzufangen. Ein Wendepunkt ist oft die Einsicht, dass Zugewandtheit und Grenzsetzung kein Widerspruch sind. Beziehung wird damit nicht härter, sondern häufig klarer.",
    icon: "eltern",
    highlight: "Sie können zugewandt bleiben, ohne alles zu tragen.",
  },
  {
    title: "Wenn Rückschläge alles wieder infrage stellen",
    text: "Krisen, Kontaktabbrüche und neue Annäherungen können sich über Jahre abwechseln. Vielen Angehörigen hilft es, Entwicklung nicht nur an einzelnen Eskalationen zu messen. Austausch mit anderen Angehörigen oder eine Beratung kann helfen, diese Langstreckenbelastung besser zu tragen.",
    icon: "geschwister",
    highlight: "Entwicklung verläuft selten geradlinig.",
  },
  {
    title: "Wenn Wut, Trauer und Mitgefühl nebeneinander stehen",
    text: "Angehörige erleben oft nicht nur Sorge, sondern auch Wut, Trauer, Erschöpfung und zeitweise Rückzug. Diese Ambivalenz ist kein Zeichen fehlender Liebe, sondern Teil einer hoch belasteten Beziehungssituation. Entlastend wird es meist, wenn diese Widersprüche benannt werden dürfen.",
    icon: "partner",
    highlight: "Ambivalenz ist in belasteten Beziehungen normal.",
  },
];

const iconMap = {
  partner: Heart,
  eltern: Users,
  geschwister: User,
};

interface ErfahrungsberichteProps {
  maxBerichte?: number;
  showTitle?: boolean;
  variant?: "full" | "compact" | "carousel";
}

function BerichtCard({ bericht }: { bericht: Erfahrungsbericht }) {
  const Icon = iconMap[bericht.icon];
  return (
    <Card className="h-full border-border/50 hover:border-sage transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sage-lighter flex items-center justify-center">
            <Icon className="w-5 h-5 text-sage-mid" />
          </div>
          <p className="font-medium text-foreground">{bericht.title}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
          {bericht.text}
        </p>

        {bericht.highlight && (
          <div className="bg-sage-wash rounded-lg p-3 border-l-2 border-sage">
            <p className="text-sm font-medium text-foreground italic">
              {bericht.highlight}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Erfahrungsberichte({
  maxBerichte = 4,
  showTitle = true,
  variant = "carousel",
}: ErfahrungsberichteProps) {
  const displayBerichte = berichte.slice(0, maxBerichte);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const togglePause = () => {
    const next = !isPausedRef.current;
    isPausedRef.current = next;
    setIsPaused(next);
  };

  useEffect(() => {
    if (variant !== "carousel") return;

    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setDirection(1);
        setActiveIndex(i => (i + 1) % displayBerichte.length);
      }
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [variant, displayBerichte.length]);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex(
      i => (i - 1 + displayBerichte.length) % displayBerichte.length
    );
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex(i => (i + 1) % displayBerichte.length);
  };

  const heading = showTitle ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <span className="kicker">Erfahrungen von Angehörigen</span>
      <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
        Was viele kennen – <em>und selten benennen können</em>
      </h2>
      <hr className="rule rule-narrow rule-center mb-5" />
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Diese kurzen Verdichtungen fassen Erfahrungen zusammen, die in der
        Angehörigenarbeit häufig geschildert werden. Sie sollen Wiedererkennung
        ermöglichen, nicht einzelne echte Biografien nachstellen.
      </p>
    </motion.div>
  ) : null;

  if (variant === "carousel") {
    return (
      <section
        className="py-8 md:py-12"
        aria-label="Erfahrungen von Angehörigen"
        aria-roledescription="Karussell"
      >
        <div className="container">
          {heading}
          <div
            className="relative max-w-2xl mx-auto"
            onMouseEnter={() => {
              isPausedRef.current = true;
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
              setIsPaused(false);
            }}
          >
            <div
              className="overflow-hidden rounded-xl"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <BerichtCard bericht={displayBerichte[activeIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              aria-label="Vorheriger Bericht"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-sage-wash transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={goNext}
              aria-label="Nächster Bericht"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-sage-wash transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Dots + Pause-Button */}
            <div className="flex justify-center items-center gap-3 mt-5">
              <div className="flex gap-2">
                {displayBerichte.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Bericht ${i + 1} anzeigen`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex
                        ? "bg-sage-dark w-5"
                        : "bg-sage-light hover:bg-sage w-2"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={togglePause}
                aria-label={
                  isPaused
                    ? "Automatisches Wechseln fortsetzen"
                    : "Automatisches Wechseln pausieren"
                }
                className="w-7 h-7 rounded-full border border-border bg-white flex items-center justify-center hover:bg-sage-wash transition-colors"
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Die Texte sind redaktionell verdichtete Erfahrungsmuster aus der
            Angehörigenarbeit.
          </motion.p>
        </div>
      </section>
    );
  }

  const gridClasses =
    variant === "full" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        {heading}
        <div className={`grid gap-6 ${gridClasses}`}>
          {displayBerichte.map((bericht, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, ease: "easeOut" }}
            >
              <BerichtCard bericht={bericht} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Die Texte sind redaktionell verdichtete Erfahrungsmuster aus der
          Angehörigenarbeit.
        </motion.p>
      </div>
    </section>
  );
}
