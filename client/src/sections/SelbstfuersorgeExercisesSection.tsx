import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  Shield,
  Users,
  Wind,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentSection from "@/components/ContentSection";
import GroundingTimer from "@/components/interactive/GroundingTimer";
import { longTermStrategies } from "@/content/selbstfuersorge-page";

function AtemuebungCard() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"einatmen" | "halten" | "ausatmen">(
    "einatmen"
  );
  const [count, setCount] = useState(4);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startUebung = () => {
    if (isActive) {
      return;
    }

    setIsActive(true);
    setPhase("einatmen");
    setCount(4);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const runPhase = (
      nextPhase: "einatmen" | "halten" | "ausatmen",
      seconds: number,
      onDone: () => void
    ) => {
      setPhase(nextPhase);
      let current = seconds;
      setCount(current);
      timerRef.current = setInterval(() => {
        current -= 1;
        setCount(current);
        if (current === 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          onDone();
        }
      }, 1000);
    };

    runPhase("einatmen", 4, () =>
      runPhase("halten", 4, () =>
        runPhase("ausatmen", 6, () => {
          setIsActive(false);
        })
      )
    );
  };

  return (
    <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-wash/20 border-sage-mid">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-6 h-6 text-sage-mid" />
          <span
            className="font-semibold text-foreground text-base block"
            role="heading"
            aria-level={2}
          >
            4-4-6 Atemübung
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          Diese Atemtechnik aktiviert Ihren Parasympathikus und hilft, aus dem
          Stressmodus herauszukommen.
        </p>

        {isActive ? (
          <div className="text-center py-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-sage-mid/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-sage-dark">{count}</span>
            </div>
            <p className="text-lg font-medium text-sage-dark">
              {phase === "einatmen" && "Einatmen..."}
              {phase === "halten" && "Halten..."}
              {phase === "ausatmen" && "Langsam ausatmen..."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {[
              "4 Sekunden einatmen",
              "4 Sekunden halten",
              "6 Sekunden ausatmen",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-6 h-6 rounded-full bg-sage-mid/20 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
            <Button
              onClick={startUebung}
              className="w-full mt-4 bg-sage-mid hover:bg-sage-dark text-white"
              disabled={isActive}
            >
              Übung starten
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StrategyIcon({
  icon,
}: {
  icon: "clock" | "heart" | "users" | "shield";
}) {
  if (icon === "clock") return <Clock className="w-5 h-5 text-white" />;
  if (icon === "heart") return <Heart className="w-5 h-5 text-white" />;
  if (icon === "users") return <Users className="w-5 h-5 text-white" />;
  return <Shield className="w-5 h-5 text-white" />;
}

function UebungAkkordeon({
  title,
  icon,
  color,
  children,
}: {
  title: string;
  icon: "clock" | "heart" | "users" | "shield";
  color: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
        aria-expanded={isOpen}
        aria-label={`${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
          >
            <StrategyIcon icon={icon} />
          </div>
          <span className="font-semibold text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <CardContent className="pt-0 pb-5 px-5">{children}</CardContent>
      )}
    </Card>
  );
}

export function SelbstfuersorgeExercisesSection() {
  return (
    <>
      <ContentSection
        title="Sofort-Übungen für akute Belastung"
        icon={<Clock className="w-6 h-6 text-sage-mid" />}
        id="sofort-uebungen"
        preview="Atemübung, 5-4-3-2-1 Grounding und STOPP-Technik – jederzeit anwendbar."
      >
        <p className="text-muted-foreground leading-relaxed mb-6">
          Diese Übungen können Sie jederzeit anwenden, wenn Sie merken, dass der
          Stress überhand nimmt:
        </p>

        <div className="grid md:grid-cols-[7fr_5fr] gap-4 mb-6">
          <AtemuebungCard />
          <GroundingTimer />
        </div>

        <Card className="border-border/50">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-3">
              STOPP-Technik
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Wenn Sie merken, dass Sie in einen Strudel aus Sorgen oder Ärger
              geraten:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { letter: "S", text: "Stopp – Innehalten" },
                { letter: "T", text: "Tief durchatmen" },
                { letter: "O", text: "Orientieren – Was passiert gerade?" },
                { letter: "P", text: "Planen – Was ist jetzt hilfreich?" },
                { letter: "P", text: "Praktizieren – Einen Schritt tun" },
              ].map(item => (
                <div
                  key={`${item.letter}-${item.text}`}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-lg bg-terracotta/20 flex items-center justify-center font-bold text-terracotta-mid">
                    {item.letter}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection
        title="Langfristige Selbstfürsorge-Strategien"
        icon={<Heart className="w-6 h-6 text-terracotta" />}
        id="langfristige-strategien"
        preview="Tägliche Mini-Auszeiten, Bewegung, soziale Kontakte und professionelle Unterstützung."
      >
        <p className="text-muted-foreground leading-relaxed mb-6">
          Neben den Sofort-Übungen brauchen Sie auch langfristige Strategien, um
          Ihre Gesundheit zu erhalten:
        </p>

        <div className="space-y-3">
          {longTermStrategies.map(strategy => (
            <UebungAkkordeon
              key={strategy.title}
              title={strategy.title}
              icon={strategy.icon}
              color={strategy.colorClass}
            >
              <div className="space-y-4 pt-4">
                <p className="text-muted-foreground text-sm">
                  {strategy.intro}
                </p>

                {strategy.checklist && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {strategy.checklist.map(item => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {strategy.noteTitle && strategy.noteText && (
                  <Card className="bg-muted/30 border-transparent">
                    <CardContent className="p-4">
                      <p className="text-sm text-foreground">
                        <strong>{strategy.noteTitle}</strong>{" "}
                        {strategy.noteText}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {strategy.cards && (
                  <div className="space-y-3">
                    {strategy.cards.map(card => (
                      <Card key={card.title} className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">
                            {card.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {card.text}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </UebungAkkordeon>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
