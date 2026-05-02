import {
  Eye,
  Ear,
  Hand,
  Wind as Nose,
  Coffee,
  CheckCircle2,
} from "lucide-react";

interface GroundingStep {
  count: number;
  sense: string;
  icon: React.ElementType;
  toneClass: string;
  instruction: string;
  prompt: string;
}

const steps: GroundingStep[] = [
  {
    count: 5,
    sense: "Sehen",
    icon: Eye,
    toneClass: "text-[color:var(--accent-primary)]",
    instruction: "Benennen Sie 5 Dinge, die Sie sehen.",
    prompt: "Schauen Sie sich um. Was fällt Ihnen auf?",
  },
  {
    count: 4,
    sense: "Hören",
    icon: Ear,
    toneClass: "text-slate-blue",
    instruction: "Benennen Sie 4 Dinge, die Sie hören.",
    prompt: "Hören Sie bewusst hin. Welche Geräusche sind da?",
  },
  {
    count: 3,
    sense: "Fühlen",
    icon: Hand,
    toneClass: "text-terracotta-mid",
    instruction:
      "Benennen Sie 3 Dinge, die Sie berühren oder körperlich spüren.",
    prompt: "Achten Sie auf Kontaktflächen, Temperatur oder Druck.",
  },
  {
    count: 2,
    sense: "Riechen",
    icon: Nose,
    toneClass: "text-sand-warm",
    instruction: "Benennen Sie 2 Dinge, die Sie riechen.",
    prompt: "Atmen Sie ruhig ein. Was ist wahrnehmbar?",
  },
  {
    count: 1,
    sense: "Schmecken",
    icon: Coffee,
    toneClass: "text-terracotta-dark",
    instruction: "Benennen Sie 1 Ding, das Sie schmecken.",
    prompt:
      "Vielleicht ist noch ein Geschmack im Mund oder von einem Getränk da.",
  },
];

export default function GroundingTimer() {
  return (
    <section className="border-t border-[color:var(--rule-color)] pt-5">
      <div className="mb-4 flex items-center gap-3">
        <Hand className="h-6 w-6 text-[color:var(--accent-primary)]" />
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
            Übung
          </p>
          <span
            className="block text-base font-semibold text-foreground"
            role="heading"
            aria-level={2}
          >
            5-4-3-2-1 Grounding
          </span>
        </div>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        Diese Übung kann helfen, sich in einem angespannten Moment wieder
        stärker im Hier und Jetzt zu verankern. Gehen Sie die Schritte in Ihrem
        eigenen Tempo durch. Es braucht keinen Timer und kein «richtiges»
        Ergebnis.
      </p>

      <div className="space-y-3">
        {steps.map(step => {
          const Icon = step.icon;
          return (
            <div
              key={step.sense}
              className="border-t border-[color:var(--rule-color)] pt-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-background">
                  <Icon className={`h-5 w-5 ${step.toneClass}`} />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-foreground">
                    {step.count} x {step.sense}
                  </p>
                  <p className="mb-1 text-sm leading-relaxed text-foreground">
                    {step.instruction}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.prompt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 flex items-start gap-2 border-t border-[color:var(--rule-color)] pt-4 text-xs text-muted-foreground">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[color:var(--accent-primary)]" />
        Wenn Sie merken, dass die Übung Sie eher zusätzlich stresst, lassen Sie
        sie weg und orientieren Sie sich stattdessen an etwas Einfacherem: beide
        Füsse spüren, langsamer ausatmen oder eine vertraute Person
        kontaktieren.
      </p>
    </section>
  );
}
