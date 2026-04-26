import { RefreshCw, ShieldAlert, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContentSection from "@/components/ContentSection";
import {
  escalationCards,
  roleCommunicationCards,
  typicalSituationCards,
} from "@/content/kommunizieren";

export function KommunizierenEscalationSection() {
  return (
    <ContentSection
      title="Wenn Gespräche kippen"
      icon={<ShieldAlert className="w-7 h-7 text-terracotta-mid" />}
      id="eskalation"
      preview="In eskalierenden Momenten hilft oft nicht mehr Inhalt, sondern weniger: weniger Worte, weniger Verteidigung, weniger Tempo."
    >
      <div className="space-y-4">
        <div className="grid gap-3">
          {escalationCards.map(item => (
            <Card key={item.title} className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash/30">
          <CardContent className="p-5">
            <h4 className="font-semibold text-foreground mb-3">
              Ein möglicher Ablauf
            </h4>
            <ol className="space-y-2 text-sm text-foreground">
              <li>1. «Ich sehe, dass es gerade sehr viel ist.»</li>
              <li>2. «Ich möchte zuhören, aber nicht in diesem Ton.»</li>
              <li>
                3. «Lass uns 10 Minuten Pause machen und dann weitersehen.»
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </ContentSection>
  );
}

export function KommunizierenSituationsSection() {
  return (
    <ContentSection
      title="Typische schwierige Situationen"
      icon={<RefreshCw className="w-7 h-7 text-slate-mid" />}
      id="situationen"
      preview="Nicht jede Situation verlangt dieselbe Antwort. Trotzdem gibt es Muster, auf die sich Angehörige vorbereiten können."
    >
      <div className="space-y-4">
        {typicalSituationCards.map(item => (
          <Card key={item.title} className="border-border/50">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentSection>
  );
}

export function KommunizierenRolesSection() {
  return (
    <ContentSection
      title="Kommunikation aus verschiedenen Angehörigenrollen"
      icon={<Users className="w-7 h-7 text-slate-mid" />}
      id="rollen"
      preview="Partner, Eltern und erwachsene Kinder sprechen aus unterschiedlichen Beziehungsgeschichten. Das verändert auch den Ton und die Belastung."
    >
      <div className="space-y-4">
        {roleCommunicationCards.map(item => {
          const cardClass =
            item.tone === "terracotta"
              ? "border-l-4 border-l-terracotta-mid bg-terracotta-wash"
              : item.tone === "slate"
                ? "border-l-4 border-l-slate-mid bg-slate-pale"
                : "border-l-4 border-l-sage-mid bg-sage-pale";

          return (
            <Card key={item.title} className={cardClass}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ContentSection>
  );
}
