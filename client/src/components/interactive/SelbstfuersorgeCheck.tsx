import { Heart, Shield, AlertTriangle } from "lucide-react";
import { kontaktById } from "@/data/kontakte";

const orientierungspunkte = [
  {
    area: "Emotionale Belastung",
    frage:
      "Fühle ich mich in den letzten zwei Wochen häufig erschöpft, gereizt oder innerlich leer?",
    einordnung:
      "Wenn ja, ist das kein Versagen, sondern ein Hinweis darauf, dass Ihre Belastungsgrenze näher rückt.",
  },
  {
    area: "Körperliche Signale",
    frage:
      "Kommen Schlaf, Essen, Bewegung und medizinische Selbstfürsorge noch ausreichend vor?",
    einordnung:
      "Wenn Grundbedürfnisse dauerhaft wegrutschen, ist das meist ein frühes Warnsignal für Überforderung.",
  },
  {
    area: "Soziale Kontakte",
    frage:
      "Gibt es in meinem Alltag noch etwas, das nicht nur mit meinem Angehörigen zu tun hat?",
    einordnung:
      "Eigene Kontakte, Interessen und kurze Auszeiten sind kein Luxus, sondern Teil der Stabilisierung.",
  },
  {
    area: "Grenzen",
    frage:
      "Kann ich Grenzen setzen, ohne mich danach vollständig schuldig zu fühlen?",
    einordnung:
      "Wenn Nein-Sagen kaum möglich ist, lohnt es sich, Unterstützung beim Einüben von Grenzen zu holen.",
  },
  {
    area: "Unterstützung",
    frage:
      "Habe ich wenigstens eine Person oder Stelle, bei der ich offen über meine Situation sprechen kann?",
    einordnung:
      "Anhaltende Isolation verstärkt Belastung oft deutlich. Unterstützung entlastet nicht nur emotional, sondern auch praktisch.",
  },
];

export default function SelbstfuersorgeCheck() {
  return (
    <div className="mt-6 space-y-5">
      <section className="border-t border-[color:var(--rule-color)] pt-5">
        <div className="flex items-start gap-3">
          <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--accent-primary)]" />
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
              Reflexion
            </p>
            <h3 className="mb-1 font-semibold text-foreground">
              Orientierung zur eigenen Belastung
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Statt eines Kurztests kann es hilfreicher sein, einige Bereiche
              ruhig für sich durchzugehen. Nicht jede Frage muss mit Ja
              beantwortet werden, damit Unterstützung sinnvoll ist. Schon
              einzelne deutliche Warnsignale verdienen Aufmerksamkeit.
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {orientierungspunkte.map((punkt, index) => (
          <section
            key={index}
            className="border-t border-[color:var(--rule-color)] pt-5"
          >
            <p className="mb-2 text-xs font-medium text-[color:var(--accent-label)]">
              {punkt.area}
            </p>
            <p className="mb-2 text-sm font-medium leading-relaxed text-foreground">
              {punkt.frage}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {punkt.einordnung}
            </p>
          </section>
        ))}
      </div>

      <section className="border-t border-[color:var(--rule-color-strong)] pt-5">
        <div className="space-y-3 border border-border/60 bg-muted/20 p-5">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--accent-primary)]" />
            <p className="text-sm leading-relaxed text-foreground">
              Wenn Sie sich in mehreren Punkten wiedererkennen, kann es
              entlastend sein, gezielt Unterstützung zu holen, statt zu warten,
              bis gar nichts mehr geht.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-alert" />
            <p className="text-sm leading-relaxed text-foreground">
              Die Fachstelle Angehörigenarbeit (PUK Zürich) bietet Beratung:{" "}
              {kontaktById("INFO_FACHSTELLE")?.nummer ?? "058 384 38 00"}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
