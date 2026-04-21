import {
  Eye,
  Ear,
  Hand,
  Wind as Nose,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface GroundingStep {
  count: number;
  sense: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  instruction: string;
  prompt: string;
}

const steps: GroundingStep[] = [
  {
    count: 5,
    sense: "Sehen",
    icon: Eye,
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-wash)",
    instruction: "Benennen Sie 5 Dinge, die Sie sehen.",
    prompt: "Schauen Sie sich um. Was fällt Ihnen auf?",
  },
  {
    count: 4,
    sense: "Hören",
    icon: Ear,
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    instruction: "Benennen Sie 4 Dinge, die Sie hören.",
    prompt: "Hören Sie bewusst hin. Welche Geräusche sind da?",
  },
  {
    count: 3,
    sense: "Fühlen",
    icon: Hand,
    color: "var(--color-terracotta-mid)",
    bgColor: "var(--color-terracotta-wash)",
    instruction:
      "Benennen Sie 3 Dinge, die Sie berühren oder körperlich spüren.",
    prompt: "Achten Sie auf Kontaktflächen, Temperatur oder Druck.",
  },
  {
    count: 2,
    sense: "Riechen",
    icon: Nose,
    color: "var(--color-sand-mid)",
    bgColor: "var(--color-sand-muted)",
    instruction: "Benennen Sie 2 Dinge, die Sie riechen.",
    prompt: "Atmen Sie ruhig ein. Was ist wahrnehmbar?",
  },
  {
    count: 1,
    sense: "Schmecken",
    icon: Coffee,
    color: "var(--color-terracotta-dark)",
    bgColor: "var(--color-terracotta-wash)",
    instruction: "Benennen Sie 1 Ding, das Sie schmecken.",
    prompt:
      "Vielleicht ist noch ein Geschmack im Mund oder von einem Getränk da.",
  },
];

export default function GroundingTimer() {
  return (
    <Card className="bg-gradient-to-br from-slate-light/30 to-slate-wash/20 border-slate-dark">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Hand className="w-6 h-6 text-slate-dark" />
          <span
            className="font-semibold text-foreground text-base block"
            role="heading"
            aria-level={2}
          >
            5-4-3-2-1 Grounding
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Diese Übung kann helfen, sich in einem angespannten Moment wieder
          stärker im Hier und Jetzt zu verankern. Gehen Sie die Schritte in
          Ihrem eigenen Tempo durch. Es braucht keinen Timer und kein
          «richtiges» Ergebnis.
        </p>

        <div className="space-y-3">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.sense}
                className="rounded-xl border border-border/50 p-4"
                style={{ backgroundColor: step.bgColor }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {step.count} x {step.sense}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed mb-1">
                      {step.instruction}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.prompt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-sage-mid flex-shrink-0 mt-0.5" />
          Wenn Sie merken, dass die Übung Sie eher zusätzlich stresst, lassen
          Sie sie weg und orientieren Sie sich stattdessen an etwas Einfacherem:
          beide Füsse spüren, langsamer ausatmen oder eine vertraute Person
          kontaktieren.
        </p>
      </CardContent>
    </Card>
  );
}
