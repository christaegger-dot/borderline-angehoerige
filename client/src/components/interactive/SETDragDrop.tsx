/**
 * Ruhige SET-Einordnung statt Übung.
 * Der inhaltliche Nutzen bleibt erhalten, aber ohne Zuordnungslogik,
 * Richtig/Falsch-Feedback oder Trainingscharakter.
 */
import { HeartHandshake, Heart, MessageSquare, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SETItem {
  id: number;
  text: string;
  correct: "S" | "E" | "T";
  explanation: string;
}

const setItems: SETItem[] = [
  {
    id: 1,
    text: "«Ich mache mir Sorgen um dich und möchte für dich da sein.»",
    correct: "S",
    explanation: "Dies drückt Ihre persönliche Sorge und Unterstützungsbereitschaft aus.",
  },
  {
    id: 2,
    text: "«Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.»",
    correct: "E",
    explanation: "Sie zeigen, dass Sie die Gefühle des anderen nachvollziehen können.",
  },
  {
    id: 3,
    text: "«Wenn du jetzt gehst, ohne Bescheid zu sagen, mache ich mir grosse Sorgen. Lass uns eine Lösung finden.»",
    correct: "T",
    explanation: "Sie benennen die Situation klar und verbinden das mit einem Vorschlag.",
  },
  {
    id: 4,
    text: "«Ich bin hier, egal was passiert. Du bist mir wichtig.»",
    correct: "S",
    explanation: "Das schafft Beziehungssicherheit und zeigt Verbundenheit.",
  },
  {
    id: 5,
    text: "«Das klingt, als hättest du dich sehr allein gefühlt in dem Moment.»",
    correct: "E",
    explanation: "Sie spiegeln das mögliche innere Erleben, ohne zu bewerten.",
  },
  {
    id: 6,
    text: "«Die Therapeutin hat gesagt, dass regelmässige Termine wichtig sind. Wie können wir das zusammen schaffen?»",
    correct: "T",
    explanation: "Sie bleiben bei der Realität und richten den Blick auf den nächsten Schritt.",
  },
  {
    id: 7,
    text: "«Es tut mir leid, dass du so leidest. Ich wünschte, ich könnte es leichter machen.»",
    correct: "S",
    explanation: "Das zeigt Mitgefühl und Unterstützung, ohne das Problem kleinzureden.",
  },
  {
    id: 8,
    text: "«Ich sehe, dass du gerade überfordert bist. Das ist eine Menge auf einmal.»",
    correct: "E",
    explanation: "Sie benennen die Überforderung und helfen, das Erleben einzuordnen.",
  },
  {
    id: 9,
    text: "«Wir haben vereinbart, dass wir bei Streit eine Pause machen. Ich schlage vor, wir halten uns daran.»",
    correct: "T",
    explanation: "Sie erinnern an eine Vereinbarung und geben der Situation Struktur.",
  },
];

const categories = [
  {
    key: "S" as const,
    label: "Support",
    subtitle: "Unterstützung",
    icon: Heart,
    bgClass: "bg-sage-wash",
    borderClass: "border-sage-mid/40",
    textClass: "text-sage-dark",
    intro: "Support zeigt: Ich bin Ihnen zugewandt und lasse Sie mit der Situation nicht allein.",
  },
  {
    key: "E" as const,
    label: "Empathy",
    subtitle: "Empathie",
    icon: MessageSquare,
    bgClass: "bg-terracotta-wash",
    borderClass: "border-terracotta-mid/40",
    textClass: "text-terracotta-dark",
    intro: "Empathy zeigt: Ich versuche nachzuvollziehen, was innerlich gerade passiert.",
  },
  {
    key: "T" as const,
    label: "Truth",
    subtitle: "Klarheit",
    icon: Scale,
    bgClass: "bg-slate-wash",
    borderClass: "border-slate-dark/30",
    textClass: "text-slate-dark",
    intro: "Truth bringt Realität, Grenze oder nächsten Schritt ein, ohne die Beziehung zu verlassen.",
  },
];

export default function SETDragDrop() {
  return (
    <div className="mt-6 space-y-5">
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-slate-dark flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">SET als ruhige Orientierung</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Viele hilfreiche Sätze enthalten mehrere Anteile gleichzeitig. Die Einteilung in Support, Empathy und Truth
                ist deshalb kein Test, sondern eine Orientierungshilfe: Was stärkt gerade die Beziehung, was zeigt Verstehen
                und wo braucht es zusätzlich Klarheit?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const items = setItems.filter((item) => item.correct === category.key);

          return (
            <Card key={category.key} className={`border ${category.borderClass} ${category.bgClass}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${category.textClass}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${category.textClass}`}>{category.label}</h4>
                    <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {category.intro}
                </p>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-lg border border-background/70 bg-background/70 p-3">
                      <p className="text-sm font-medium text-foreground leading-relaxed mb-2">{item.text}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
