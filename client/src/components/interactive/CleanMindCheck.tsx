import { Brain, CheckCircle2, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reflexionspaare = [
  {
    situation: "Es läuft gerade gut.",
    wenigerHilfreich: "«Endlich ist das Schlimmste überstanden – jetzt wird alles gut.»",
    hilfreicher: "«Es läuft gut, und ich weiss, dass auch schwierigere Tage kommen können. Dafür haben wir einen Plan.»",
  },
  {
    situation: "Ihr Angehöriger hat einen schwierigen Tag.",
    wenigerHilfreich: "«Ich wusste es – die ganze Besserung war nur Fassade.»",
    hilfreicher: "«Ein Rückschritt gehört dazu. Das ändert nichts an den Fortschritten der letzten Wochen.»",
  },
  {
    situation: "Es geht um Therapie-Skills in ruhigeren Phasen.",
    wenigerHilfreich: "«Die Therapie hat gewirkt – Skills braucht man jetzt nicht mehr so intensiv.»",
    hilfreicher: "«Skills brauchen regelmässige Übung, auch in guten Zeiten.»",
  },
];

export default function CleanMindCheck() {
  return (
    <div className="mt-6 space-y-5">
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-sage-mid flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Klarer Blick statt Kurzcheck</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Angehörige schwanken oft zwischen Hoffnung, Erleichterung und Sorge. Hilfreich ist keine Einordnung
                in Typen, sondern die Frage: Welche Haltung hilft mir, Fortschritte ernst zu nehmen und zugleich auf
                schwierigere Phasen vorbereitet zu bleiben?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reflexionspaare.map((paar, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-foreground mb-3">{paar.situation}</p>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-terracotta-mid/20 bg-terracotta-wash/40 p-4">
                  <p className="text-xs font-medium text-terracotta-dark mb-2">Weniger hilfreich</p>
                  <p className="text-sm text-foreground leading-relaxed">{paar.wenigerHilfreich}</p>
                </div>

                <div className="rounded-lg border border-sage-mid/20 bg-sage-wash/40 p-4">
                  <p className="text-xs font-medium text-sage-dark mb-2">Hilfreicher</p>
                  <p className="text-sm text-foreground leading-relaxed">{paar.hilfreicher}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-sage-mid/20 bg-sage-wash/30">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-sage-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground leading-relaxed mb-2">
                Der hilfreiche Mittelweg lautet meist: Hoffnung zulassen, Rückschritte einordnen und bei Bedarf auf
                vereinbarte Schritte zurückkommen.
              </p>
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-mid flex-shrink-0 mt-0.5" />
                Diese Orientierung ersetzt keine professionelle Beratung. Sie greift das Clean-Mind/Clear-Mind-Konzept
                aus Linehans DBT auf, ohne es als Test darzustellen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
