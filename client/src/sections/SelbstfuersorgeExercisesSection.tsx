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
    <article className="border-t border-[color:var(--rule-color)] pt-5">
      <div className="mb-4 flex items-center gap-3">
        <Wind className="h-6 w-6 text-[color:var(--accent-primary)]" />
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
            Übung
          </p>
          <span
            className="block text-base font-semibold text-foreground"
            role="heading"
            aria-level={2}
          >
            4-4-6 Atemübung
          </span>
        </div>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Diese Atemtechnik aktiviert den beruhigenden Teil Ihres Nervensystems
        und hilft, aus dem Stressmodus herauszukommen.
      </p>

      {isActive ? (
        <div
          className="rounded-[1rem] border px-4 py-6 text-center"
          style={{
            borderColor: "var(--rule-color)",
            backgroundColor:
              "color-mix(in oklch, var(--bg-primary) 72%, white)",
          }}
        >
          <div
            className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border"
            style={{
              borderColor:
                "color-mix(in oklch, var(--accent-primary) 22%, transparent)",
              backgroundColor:
                "color-mix(in oklch, var(--accent-primary) 8%, white)",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{ color: "var(--accent-primary)" }}
            >
              {count}
            </span>
          </div>
          <p
            className="text-lg font-medium"
            style={{ color: "var(--fg-primary)" }}
          >
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
              className="flex items-center gap-3 border-t pt-3 text-sm text-muted-foreground"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium"
                style={{
                  borderColor: "var(--rule-color)",
                  color: "var(--accent-primary)",
                  backgroundColor:
                    "color-mix(in oklch, var(--accent-primary) 6%, white)",
                }}
              >
                {index + 1}
              </span>
              {item}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={startUebung}
            className="mt-4 w-full gap-2 border-border/70 bg-background text-[color:var(--accent-primary)] shadow-none hover:bg-muted/20 hover:text-foreground"
            disabled={isActive}
          >
            Übung starten
          </Button>
        </div>
      )}
    </article>
  );
}

function StrategyIcon({
  icon,
  className,
}: {
  icon: "clock" | "heart" | "users" | "shield";
  className?: string;
}) {
  if (icon === "clock") return <Clock className={className} />;
  if (icon === "heart") return <Heart className={className} />;
  if (icon === "users") return <Users className={className} />;
  return <Shield className={className} />;
}

function UebungAkkordeon({
  title,
  icon,
  children,
}: {
  title: string;
  icon: "clock" | "heart" | "users" | "shield";
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t" style={{ borderColor: "var(--rule-color)" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 py-5 text-left transition-opacity hover:opacity-80"
        aria-expanded={isOpen}
        aria-label={`${title} ${isOpen ? "zuklappen" : "aufklappen"}`}
      >
        <div className="flex items-center gap-3">
          <StrategyIcon
            icon={icon}
            className="h-4 w-4 text-[color:var(--accent-label)]"
          />
          <span className="font-semibold text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="pb-5">{children}</div>}
    </div>
  );
}

export function SelbstfuersorgeExercisesSection() {
  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const titleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <>
      <ContentSection
        variant="editorial"
        title="Sofort-Übungen für akute Belastung"
        id="sofort-uebungen"
        preview="Atemübung, 5-4-3-2-1 Grounding und STOPP-Technik – jederzeit anwendbar."
      >
        <p className="mb-6" style={bodyStyle}>
          Diese Übungen können Sie jederzeit anwenden, wenn Sie merken, dass der
          Stress überhand nimmt:
        </p>

        <div className="grid gap-6 md:grid-cols-[7fr_5fr]">
          <AtemuebungCard />
          <GroundingTimer />
        </div>

        <div
          className="mt-8 border-t pt-5"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <h3 style={titleStyle}>STOPP-Technik</h3>
          <p className="mt-3" style={bodyStyle}>
            Wenn Sie merken, dass Sie in einen Strudel aus Sorgen oder Ärger
            geraten:
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { letter: "S", text: "Stopp – Innehalten" },
              { letter: "T", text: "Tief durchatmen" },
              { letter: "O", text: "Orientieren – Was passiert gerade?" },
              { letter: "P", text: "Planen – Was ist jetzt hilfreich?" },
              { letter: "P", text: "Praktizieren – Einen Schritt tun" },
            ].map(item => (
              <div
                key={`${item.letter}-${item.text}`}
                className="flex items-start gap-3 border-t pt-3"
                style={{ borderColor: "var(--rule-color)" }}
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border/60 text-xs font-semibold text-foreground">
                  {item.letter}
                </span>
                <span style={bodyStyle}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection
        variant="editorial"
        title="Langfristige Selbstfürsorge-Strategien"
        id="langfristige-strategien"
        preview="Tägliche Mini-Auszeiten, Bewegung, soziale Kontakte und professionelle Unterstützung."
      >
        <p className="mb-6" style={bodyStyle}>
          Neben den Sofort-Übungen brauchen Sie auch langfristige Strategien, um
          Ihre Gesundheit zu erhalten:
        </p>

        <div>
          {longTermStrategies.map(strategy => (
            <UebungAkkordeon
              key={strategy.title}
              title={strategy.title}
              icon={strategy.icon}
            >
              <div className="space-y-4 pt-4">
                <p style={bodyStyle}>{strategy.intro}</p>

                {strategy.checklist && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {strategy.checklist.map(item => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--accent-label)]" />
                        <span style={bodyStyle}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {strategy.noteTitle && strategy.noteText && (
                  <p
                    className="border-l pl-4"
                    style={{
                      ...bodyStyle,
                      borderColor: "var(--accent-label)",
                    }}
                  >
                    <strong style={{ color: "var(--fg-primary)" }}>
                      {strategy.noteTitle}
                    </strong>{" "}
                    {strategy.noteText}
                  </p>
                )}

                {strategy.cards && (
                  <div className="space-y-4">
                    {strategy.cards.map(card => (
                      <article
                        key={card.title}
                        className="border-t pt-4"
                        style={{ borderColor: "var(--rule-color)" }}
                      >
                        <h4 style={titleStyle}>{card.title}</h4>
                        <p className="mt-2" style={bodyStyle}>
                          {card.text}
                        </p>
                      </article>
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
