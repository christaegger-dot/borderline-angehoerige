import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Antwort = "ja" | "manchmal" | "nein" | null;

interface CheckPunkt {
  id: string;
  bereich: string;
  frage: string;
  einordnung: Record<Exclude<Antwort, null>, string>;
  hinweis: string;
}

const checkPunkte: CheckPunkt[] = [
  {
    id: "warnsignale",
    bereich: "Warnsignale erkennen",
    frage:
      "Merke ich meistens erst im Nachhinein, dass eine Grenze nötig gewesen wäre?",
    einordnung: {
      ja: "Das ist häufig. Grenzen werden oft erst sichtbar, wenn sie überschritten wurden. Es lohnt sich, im Ruhigen zu überlegen: Welche Situationen kosten mich regelmässig Energie?",
      manchmal:
        "Sie haben schon ein gewisses Gespür für Warnsignale. Üben Sie, diese früher zu benennen – auch innerlich, ohne sofort handeln zu müssen.",
      nein: "Sie erkennen Warnsignale gut. Die Herausforderung liegt oft weniger im Erkennen als im Handeln.",
    },
    hinweis: "Warnsignale: Erschöpfung, Groll, das Gefühl «schon wieder».",
  },
  {
    id: "formulierung",
    bereich: "Grenzen formulieren",
    frage:
      "Fällt es mir schwer, eine Grenze klar und ruhig auszusprechen – ohne Vorwurf, aber auch ohne Entschuldigung?",
    einordnung: {
      ja: "Das ist eine der häufigsten Schwierigkeiten. Grenzen klingen oft entweder zu hart oder zu weich. Kurze, ich-bezogene Sätze helfen: «Ich brauche jetzt eine Pause.» statt «Du bist immer so…»",
      manchmal:
        "Manchmal gelingt es, manchmal nicht – das ist normal. Oft hängt es von der eigenen Erschöpfung ab. Je früher Sie eine Grenze setzen, desto ruhiger klingt sie.",
      nein: "Sie können Grenzen klar formulieren. Achten Sie darauf, dass Klarheit nicht in Kälte kippt – Ton und Timing bleiben wichtig.",
    },
    hinweis:
      "Kurze Ich-Sätze: «Ich mache das nicht mit.» «Ich melde mich morgen.»",
  },
  {
    id: "konsequenz",
    bereich: "Konsequenz halten",
    frage:
      "Weiche ich Grenzen, die ich gesetzt habe, oft wieder auf – aus Schuldgefühl, Mitleid oder Angst vor Eskalation?",
    einordnung: {
      ja: "Das ist sehr verständlich und sehr häufig. Konsequenz ist nicht Härte – es ist Verlässlichkeit. Wenn Grenzen immer wieder aufgeweicht werden, verlieren sie ihre Wirkung für beide Seiten.",
      manchmal:
        "Sie halten Grenzen manchmal, aber nicht immer. Überlegen Sie: In welchen Situationen weichen Sie eher nach? Was löst das aus?",
      nein: "Sie können Konsequenz halten. Achten Sie darauf, dass Sie dabei nicht in Starrheit kippen – Grenzen dürfen auch bewusst angepasst werden.",
    },
    hinweis:
      "Konsequenz heisst: Ihr Handeln passt zu dem, was Sie angekündigt haben.",
  },
  {
    id: "schuld",
    bereich: "Schuldgefühle",
    frage:
      "Fühle ich mich nach dem Setzen einer Grenze häufig schuldig oder wie eine schlechte Person?",
    einordnung: {
      ja: "Schuldgefühle nach Grenzen sind fast universell bei Angehörigen. Sie bedeuten nicht, dass Sie falsch gehandelt haben. Schuldgefühl und Schuld sind nicht dasselbe.",
      manchmal:
        "Manchmal taucht Schuld auf, manchmal nicht. Beobachten Sie, wann sie stärker ist – oft hängt es mit der Reaktion der anderen Person zusammen.",
      nein: "Sie können Grenzen setzen, ohne sich dauerhaft schuldig zu fühlen. Das ist eine wichtige Ressource.",
    },
    hinweis: "Grenzen schützen die Beziehung – sie zerstören sie nicht.",
  },
  {
    id: "eskalation",
    bereich: "Eskalationsangst",
    frage:
      "Vermeide ich Grenzen, weil ich Angst habe, dass die andere Person eskaliert, sich verletzt oder die Beziehung abbricht?",
    einordnung: {
      ja: "Diese Angst ist real und nachvollziehbar. Sie führt aber oft dazu, dass Grenzen nie gesetzt werden – und die Belastung steigt. Grenzen können mit Ankündigung, Ruhe und Vorbereitung gesetzt werden.",
      manchmal:
        "Manchmal hält Eskalationsangst Sie zurück, manchmal nicht. Überlegen Sie: Welche Grenzen trauen Sie sich zu setzen, welche nicht?",
      nein: "Eskalationsangst hält Sie nicht zurück. Achten Sie trotzdem auf Timing und Ton – auch wenn Sie keine Angst haben, kann die Reaktion der anderen Person schwierig sein.",
    },
    hinweis:
      "Grenzen setzen und Eskalation verhindern schliessen sich nicht aus.",
  },
];

const antwortLabels: Record<Exclude<Antwort, null>, string> = {
  ja: "Ja, oft",
  manchmal: "Manchmal",
  nein: "Eher nicht",
};

const antwortFarben: Record<Exclude<Antwort, null>, string> = {
  ja: "border-sand-border bg-sand-muted/60 text-sand-warm",
  manchmal: "border-sage-light bg-sage-wash/60 text-sage-mid-dark",
  nein: "border-slate-light bg-slate-wash/60 text-slate-blue",
};

const antwortAktivFarben: Record<Exclude<Antwort, null>, string> = {
  ja: "border-sand-warm bg-sand-muted ring-2 ring-sand-warm/30 text-sand-warm font-semibold",
  manchmal:
    "border-sage-mid bg-sage-wash ring-2 ring-sage-mid/30 text-sage-mid-dark font-semibold",
  nein: "border-slate-blue bg-slate-wash ring-2 ring-slate-blue/30 text-slate-blue font-semibold",
};

export default function GrenzenCheck() {
  const [antworten, setAntworten] = useState<Record<string, Antwort>>({});
  const [offenePunkte, setOffenePunkte] = useState<Record<string, boolean>>({});
  const [abgeschlossen, setAbgeschlossen] = useState(false);

  const setzeAntwort = (id: string, antwort: Antwort) => {
    setAntworten(prev => ({ ...prev, [id]: antwort }));
    // Einordnung automatisch öffnen
    setOffenePunkte(prev => ({ ...prev, [id]: true }));
  };

  const togglePunkt = (id: string) => {
    setOffenePunkte(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const anzahlBeantwortet = Object.values(antworten).filter(Boolean).length;
  const alleBeantwortet = anzahlBeantwortet === checkPunkte.length;
  const anzahlJa = Object.values(antworten).filter(a => a === "ja").length;
  const anzahlManchmal = Object.values(antworten).filter(
    a => a === "manchmal"
  ).length;

  const getGesamtEinordnung = () => {
    if (anzahlJa >= 4) {
      return {
        ton: "alert",
        text: "Sie tragen gerade viel. In mehreren Bereichen zeigen sich deutliche Schwierigkeiten mit Grenzen. Das ist kein Versagen – es ist ein Hinweis, dass Unterstützung sinnvoll wäre. Professionelle Begleitung kann helfen, Grenzen einzuüben.",
      };
    }
    if (anzahlJa >= 2 || anzahlManchmal >= 3) {
      return {
        ton: "sand",
        text: "Sie kennen die Herausforderungen beim Grenzen setzen gut. In einigen Bereichen haben Sie bereits Ressourcen, in anderen lohnt sich gezieltes Üben oder Unterstützung.",
      };
    }
    return {
      ton: "sage",
      text: "Sie haben in vielen Bereichen bereits ein gutes Fundament. Grenzen setzen ist trotzdem ein fortlaufender Prozess – kein einmaliger Entscheid.",
    };
  };

  return (
    <div className="mt-6 space-y-5">
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-sage-mid-dark flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Orientierung zu Grenzen im Alltag
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dieser Check hilft Ihnen, fünf häufige Schwierigkeiten beim
                Grenzen setzen ruhig zu reflektieren. Es gibt keine richtigen
                oder falschen Antworten – nur ehrliche.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {checkPunkte.map((punkt, index) => {
          const antwort = antworten[punkt.id] ?? null;
          const istOffen = offenePunkte[punkt.id] ?? false;

          return (
            <Card
              key={punkt.id}
              className={`border-border/50 transition-all ${antwort ? "border-border/70" : ""}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-wash text-sage-mid-dark text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-sage-mid-dark mb-1">
                      {punkt.bereich}
                    </p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {punkt.frage}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 ml-9 flex-wrap">
                  {(["ja", "manchmal", "nein"] as const).map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setzeAntwort(punkt.id, option)}
                      className={`px-3 py-1.5 rounded-xl border text-sm transition-all ${
                        antwort === option
                          ? antwortAktivFarben[option]
                          : antwortFarben[option] + " hover:opacity-80"
                      }`}
                    >
                      {antwortLabels[option]}
                    </button>
                  ))}
                </div>

                {antwort && (
                  <div className="ml-9 mt-3">
                    <button
                      type="button"
                      onClick={() => togglePunkt(punkt.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {istOffen ? (
                        <>
                          <ChevronUp className="w-3 h-3" />
                          Einordnung ausblenden
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3" />
                          Einordnung anzeigen
                        </>
                      )}
                    </button>

                    {istOffen && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {punkt.einordnung[antwort]}
                        </p>
                        <p className="text-xs text-muted-foreground/70 italic">
                          {punkt.hinweis}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {alleBeantwortet && !abgeschlossen && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-sage-mid text-sage-mid-dark hover:bg-sage-wash"
            onClick={() => setAbgeschlossen(true)}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Gesamteinordnung anzeigen
          </Button>
        </div>
      )}

      {abgeschlossen &&
        (() => {
          const einordnung = getGesamtEinordnung();
          const istAlert = einordnung.ton === "alert";
          const istSand = einordnung.ton === "sand";
          return (
            <Card
              className={`${
                istAlert
                  ? "border-alert/20 bg-alert/5"
                  : istSand
                    ? "border-sand-border/60 bg-sand-muted/40"
                    : "border-sage-mid/20 bg-sage-wash/30"
              }`}
            >
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    {istAlert ? (
                      <AlertTriangle className="w-5 h-5 text-alert flex-shrink-0 mt-0.5" />
                    ) : (
                      <Shield
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${istSand ? "text-sand-warm" : "text-sage-dark"}`}
                      />
                    )}
                    <p className="text-sm text-foreground leading-relaxed">
                      {einordnung.text}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed ml-8">
                    Die Fachstelle Angehörigenarbeit (PUK Zürich) bietet
                    Beratung: 058 384 38 00. Grenzen setzen lässt sich üben –
                    manchmal hilft ein Gespräch mehr als jeder Ratgeber.
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })()}

      {!alleBeantwortet && anzahlBeantwortet > 0 && (
        <p className="text-xs text-center text-muted-foreground">
          {checkPunkte.length - anzahlBeantwortet} von {checkPunkte.length}{" "}
          Fragen noch offen
        </p>
      )}
    </div>
  );
}
