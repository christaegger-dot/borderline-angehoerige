import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { kontaktById } from "@/data/kontakte";

interface Szenario {
  situation: string;
  kategorie: string;
  falsch: string;
  richtig: string;
  erklaerung: string;
}

const szenarien: Szenario[] = [
  {
    situation: "Ihr Angehöriger sagt: «Du bist schuld, dass es mir so schlecht geht!»",
    kategorie: "Vorwürfe",
    falsch: "«Das stimmt doch gar nicht!» oder «Du bist ungerecht!»",
    richtig: "«Ich höre, dass du das so siehst. Ich sehe es anders, und ich möchte verstehen, was dich beschäftigt.»",
    erklaerung: "Spiegeln statt Verteidigen: Sie nehmen das Gefühl wahr, ohne es zu übernehmen.",
  },
  {
    situation: "Ihr Angehöriger weint heftig und schreit: «Niemand versteht mich!»",
    kategorie: "Gefühlsausbruch",
    falsch: "«Beruhige dich!» oder «Das ist doch nicht so schlimm!»",
    richtig: "«Ich sehe, dass du gerade sehr aufgewühlt bist. Das klingt wirklich schwer für dich. Ich bin hier.»",
    erklaerung: "Validierung statt Minimierung: Gefühle anerkennen, ohne sie zu bewerten.",
  },
  {
    situation: "Sie brauchen eine Pause, aber Ihr Angehöriger will, dass Sie bleiben.",
    kategorie: "Grenzen",
    falsch: "«Ich halte das nicht mehr aus!» oder «Du machst mich fertig!»",
    richtig: "«Ich liebe dich, und gleichzeitig brauche ich jetzt eine Pause. Lass uns in einer Stunde weiterreden, wenn wir beide ruhiger sind.»",
    erklaerung: "Liebe und Grenze können gleichzeitig ausgesprochen werden.",
  },
  {
    situation: "Ihr Angehöriger droht: «Wenn du gehst, bringe ich mich um!»",
    kategorie: "Drohungen",
    falsch: "«Das sagst du nur, um mich zu erpressen!» oder einfach bleiben aus Angst.",
    richtig: `«Ich nehme das sehr ernst. Ich rufe jetzt die Dargebotene Hand an (${kontaktById("GRUEN_143")?.nummer ?? "143"}), damit du Unterstützung bekommst.»`,
    erklaerung: "Suizidale Aussagen ernst nehmen und die Verantwortung an Fachpersonen übergeben.",
  },
];

export default function SpiegelnUebung() {
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        Die folgenden Beispiele sind keine Übung, die richtig gelöst werden muss. Sie sollen eher zeigen, wie ein
        belastender Satz aufgenommen werden kann, ohne ihn sofort zurückzuwerfen oder ganz zu übernehmen.
      </p>

      {szenarien.map((szenario, index) => (
        <Card key={index} className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-terracotta-mid flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-slate-dark mb-1">{szenario.kategorie}</p>
                <p className="text-sm font-medium text-foreground leading-relaxed">{szenario.situation}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 mb-3">
              <div className="rounded-lg border border-terracotta-mid/20 bg-terracotta-wash/30 p-4">
                <p className="text-xs font-medium text-terracotta-dark mb-2">Weniger hilfreich</p>
                <p className="text-sm text-foreground leading-relaxed">{szenario.falsch}</p>
              </div>

              <div className="rounded-lg border border-sage-mid/20 bg-sage-wash/30 p-4">
                <p className="text-xs font-medium text-sage-dark mb-2">Hilfreicher</p>
                <p className="text-sm text-foreground font-medium leading-relaxed">{szenario.richtig}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">{szenario.erklaerung}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
