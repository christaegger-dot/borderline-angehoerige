import { XCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MythCard {
  myth: string;
  truth: string;
}

const myths: MythCard[] = [
  {
    myth: "«Borderliner manipulieren absichtlich»",
    truth: "Das Verhalten ist meist keine bewusste Strategie, sondern ein oft verzweifelter Versuch, mit überwältigenden Emotionen umzugehen.",
  },
  {
    myth: "«Borderline ist unheilbar»",
    truth: "Langzeitstudien zeigen, dass bei vielen Betroffenen mit der Zeit eine deutliche Besserung und oft auch Remission möglich ist.",
  },
  {
    myth: "«Sie könnten sich zusammenreissen, wenn sie wollten»",
    truth: "Borderline ist keine Frage von Willenskraft. Unter hoher Anspannung sind Emotionsregulation und Impulskontrolle oft deutlich erschwert.",
  },
  {
    myth: "«Nur Frauen haben Borderline»",
    truth: "Borderline betrifft alle Geschlechter. Unterschiede zeigen sich eher in Diagnostik und Ausdrucksformen als in der grundsätzlichen Häufigkeit.",
  },
  {
    myth: "«Menschen mit Borderline sind gefährlich»",
    truth: "Die Belastung richtet sich häufig eher gegen die eigene Person. Pauschale Gefährlichkeitsbilder stigmatisieren und helfen Angehörigen nicht weiter.",
  },
  {
    myth: "«Das ist nur Aufmerksamkeitssuche»",
    truth: "Selbstverletzendes oder eskalierendes Verhalten ist oft Ausdruck von Überforderung und ernstem Leiden, nicht bloss der Wunsch nach Aufmerksamkeit.",
  },
];

export default function MythosFlipCards() {
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        Über Borderline kursieren viele vereinfachende oder stigmatisierende Vorstellungen. Hilfreicher als ein
        Aufdecken von «richtigen» Antworten ist eine ruhige Gegenüberstellung von Mythos und Einordnung.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {myths.map((card, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-5">
              <div className="rounded-lg border border-terracotta-mid/20 bg-terracotta-wash/30 p-4 mb-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-terracotta-mid flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-terracotta-dark mb-1">Mythos</p>
                    <p className="text-sm font-semibold text-foreground leading-snug">{card.myth}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-sage-mid/20 bg-sage-wash/30 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sage-mid flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-sage-dark mb-1">Einordnung</p>
                    <p className="text-sm text-foreground leading-relaxed">{card.truth}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Quellen: APA Practice Guideline (2024); Zanarini et al. (2012); Grant et al. (2008)
      </p>
    </div>
  );
}
