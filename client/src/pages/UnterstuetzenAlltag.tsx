import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Heart,
  Clock,
  Users,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenAlltag() {
  return (
    <Layout>
      <SEO
        title="Unterstützen im Alltag"
        description="Wie Angehörige im Alltag hilfreich bleiben können: verlässlich, klar und ohne sich selbst zu verlieren."
        path="/unterstuetzen/alltag"
      />

      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Link
              href="/unterstuetzen/uebersicht"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1"
            >
              ← Zurück zur Übersicht
            </Link>

            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-sage-wash flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sage-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">Lesezeit: 8 Minuten</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Im Alltag unterstützen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Belastete Beziehungen bestehen nicht nur aus Krisen. Meist prägen sie den Alltag:
              Anspannung in der Luft, vorsichtiges Abtasten, Rückzug nach Konflikten, Schuldgefühle,
              Erreichbarkeitsdruck und die Frage, wie viel Nähe gerade hilfreich ist. Diese Seite
              geht darum, was im Alltag trägt und was eher erschöpft.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Der Alltag ist oft nicht ruhig, sondern vorspannt"
              icon={<Clock className="w-7 h-7 text-sage" />}
              id="alltagsspannung"
              defaultOpen={true}
              preview="Viele Angehörige leben nicht in dauernder Krise, sondern in dauernder Vorahnung von Krise. Gerade das kann zermürbend sein."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige kennen weniger den permanenten Ausnahmezustand als einen Alltag,
                  der unterschwellig unter Spannung steht: Man beobachtet Stimmungen, wägt Worte ab,
                  rechnet mit plötzlichem Rückzug oder Ärger und versucht gleichzeitig, Normalität
                  aufrechtzuerhalten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Diese dauernde innere Wachsamkeit ist anstrengend. Sie kostet Energie, auch wenn
                  äusserlich gerade "nichts passiert". Hilfreiche Alltagsunterstützung beginnt oft
                  damit, diese Belastung ernst zu nehmen und nicht nur auf sichtbare Eskalationen zu
                  reagieren.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Alltagshilfe bedeutet deshalb nicht, immer mehr zu tun. Oft bedeutet sie,
                      Beziehungen etwas vorhersehbarer, klarer und weniger reaktiv zu machen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was im Alltag oft wirklich hilft"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="was-hilft"
              preview="Nicht grosse Gesten, sondern Klarheit, Verlässlichkeit, ruhige Präsenz und begrenzte Verfügbarkeit tragen häufig am meisten."
            >
              <div className="grid gap-4">
                {[
                  {
                    title: "Verlässliche Absprachen",
                    description:
                      "Regelmässigkeit und angekündigte Änderungen entlasten oft stärker als spontane intensive Zuwendung.",
                    example:
                      "\"Ich rufe dich heute Abend nach dem Essen an. Wenn ich mich verspäte, sage ich Bescheid.\"",
                  },
                  {
                    title: "Klar sagen, was Sie meinen",
                    description:
                      "Doppeldeutigkeiten, Beschwichtigungen oder halbe Zusagen schaffen im Alltag oft mehr Unruhe als ehrliche Klarheit.",
                    example:
                      "\"Ich brauche heute Abend Ruhe und bin morgen wieder ansprechbar.\"",
                  },
                  {
                    title: "Ruhige Präsenz statt hektisches Reparieren",
                    description:
                      "Nicht jede Stimmung muss sofort gelöst werden. Oft hilft es mehr, ansprechbar und klar zu bleiben, ohne alles zu optimieren.",
                    example:
                      "\"Ich merke, dass heute viel Anspannung da ist. Ich bin da, aber wir müssen das nicht sofort lösen.\"",
                  },
                  {
                    title: "Begrenzte Verfügbarkeit",
                    description:
                      "Alltag wird tragfähiger, wenn Nähe nicht mit permanenter Erreichbarkeit verwechselt wird.",
                    example:
                      "\"Nach 22 Uhr bin ich nicht mehr am Handy. Wenn es ernst wird, holen wir zusätzliche Hilfe dazu.\"",
                  },
                ].map((item) => (
                  <Card key={item.title} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                      <div className="bg-sage-light/30 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">{item.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Nach Konflikten und Rückzug"
              icon={<Users className="w-7 h-7 text-sage-mid" />}
              id="rueckzug"
              preview="Viele Beziehungen leiden weniger nur an Streit als an dem, was danach folgt: Schweigen, Unsicherheit, Funkstille oder ein vorsichtiger Neustart."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Nach Konflikten entsteht oft ein belastender Zwischenraum. Angehörige wissen nicht,
                  ob sie nachgehen oder Abstand lassen sollen, ob Schweigen beruhigt oder eskaliert,
                  ob ein Gespräch hilfreich wäre oder zu früh käme.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">Hilfreich kann sein</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>ein kurzes, klares Kontaktangebot</li>
                        <li>nicht drängen, aber auch nicht strafen</li>
                        <li>später aufgreifen, was passiert ist</li>
                        <li>zwischen Raum geben und Beziehungsabbruch unterscheiden</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">Weniger hilfreich ist oft</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>mehrfach nachfassen aus Panik</li>
                        <li>Gegenrückzug aus Verletzung</li>
                        <li>so tun, als wäre nichts gewesen</li>
                        <li>mitten im Alarm sofort alles klären wollen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-terracotta-light/10 border-terracotta">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Im Alltag ist nach einem Bruch oft nicht Perfektion gefragt, sondern ein
                      ruhiger, begrenzter Wiedereinstieg in Kontakt.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Beziehungs-Achtsamkeit im echten Alltag"
              icon={<Users className="w-7 h-7 text-slate-blue" />}
              id="beziehungs-achtsamkeit"
              preview="Bewusst wahrnehmen, was gerade passiert, hilft vor allem dann, wenn Sie sonst in Alarm, Rechtfertigung oder Überanpassung kippen würden."
            >
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "kurz innehalten",
                    description:
                      "Nicht sofort reagieren, wenn Sie merken, dass Sie innerlich in Alarm gehen.",
                  },
                  {
                    step: "2",
                    title: "die Lage genauer lesen",
                    description:
                      "Was ist gerade wirklich los: Angst, Kränkung, Rückzug, Überforderung, alte Dynamik?",
                  },
                  {
                    step: "3",
                    title: "auch sich selbst wahrnehmen",
                    description:
                      "Sind Sie gerade hilfsbereit, erschöpft, gereizt, schuldig oder im Rettungsmodus?",
                  },
                  {
                    step: "4",
                    title: "bewusst und begrenzt handeln",
                    description:
                      "Nicht alles tun, was Beziehung sofort beruhigt, sondern das, was längerfristig tragfähig ist.",
                  },
                ].map((item) => (
                  <Card key={item.step} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-full bg-sage-mid text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.step}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Kleine positive Inseln schaffen"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="positive-inseln"
              preview="Beziehung darf nicht nur aus Klärung, Kontrolle, Sorge und Krisenmanagement bestehen. Kleine unbelastete Momente sind kein Luxus."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Wenn eine Beziehung fast nur noch um Symptome, Anspannung und Konflikt kreist,
                  verliert sie ihre tragenden Anteile. Alltagshilfe heisst deshalb auch, kleine
                  gemeinsame Momente zu schützen, die nicht sofort funktional sein müssen.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "kurzer Spaziergang", examples: "ohne sofortiges Problemgespräch" },
                    { title: "gemeinsames Essen", examples: "mit klarer zeitlicher Begrenzung" },
                    { title: "etwas Vertrautes wiederholen", examples: "ein kleines Ritual, das nicht überfordert" },
                    { title: "15 ruhige Minuten", examples: "ohne Lösungssuche, ohne Handy, ohne Druck" },
                  ].map((item) => (
                    <Card key={item.title} className="border-border/50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.examples}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="mt-2 bg-sand-muted border-sand-mid">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Wichtig:</strong> Positive Momente sind
                      keine Gegenbeweise gegen Belastung. Sie sind eher kleine Ressourceninseln, die
                      Beziehungen etwas atmungsfähiger machen können.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Sie konkret tun können"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="konkrete-schritte"
              preview="Praktische Alltagshilfen sind oft einfach, aber nicht leicht: klar bleiben, Rückmeldungen dosieren, Fortschritte benennen und nicht alles übernehmen."
            >
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Fortschritte benennen</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Nicht überloben, aber wahrnehmen, wenn etwas weniger zerstörerisch, etwas
                      bewusster oder etwas klarer gelungen ist.
                    </p>
                    <div className="bg-sage-lighter/50 rounded-lg p-3">
                      <p className="text-sm text-foreground italic">
                        "Ich habe gemerkt, dass du dich heute zurückgezogen hast, ohne dass es ganz
                        eskaliert ist. Das war nicht leicht."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Fragen statt übernehmen</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Alltagshilfe wird tragfähiger, wenn Sie nicht alles lösen, sondern Beteiligung
                      und Eigenanteil offenlassen.
                    </p>
                    <div className="space-y-2">
                      {[
                        "Was wäre dein Vorschlag?",
                        "Was brauchst du gerade von mir, und was eher nicht?",
                        "Soll ich einfach da sein oder mit dir mitdenken?",
                      ].map((item) => (
                        <div key={item} className="bg-sage-lighter/50 rounded-lg p-3">
                          <p className="text-sm text-foreground italic">"{item}"</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Vorhersehbar bleiben</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Änderungen möglichst früh ankündigen",
                        "Versprechen halten oder offen revidieren",
                        "Erreichbarkeit klar benennen",
                        "nicht jedes Mal völlig anders reagieren",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Grenzen der Alltagsunterstützung"
              icon={<AlertTriangle className="w-7 h-7 text-terracotta-mid" />}
              id="grenzen"
              preview="Auch im Alltag gibt es Grenzen. Sie müssen nicht perfekt sein, aber Sie sollten Ihre Erschöpfung und Ihre roten Linien ernst nehmen."
            >
              <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Auch im Alltag können Sie nicht alles halten. Sie können nicht:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "die Emotionen Ihres Angehörigen dauerhaft regulieren",
                      "alle Trigger vermeiden",
                      "jede Eskalation verhindern",
                      "Therapie oder Krisenhilfe ersetzen",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-terracotta-mid">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <strong className="text-foreground">Das ist keine Niederlage.</strong> Alltag
                    wird nicht durch Perfektion tragfähig, sondern durch Klarheit, Wiederholbarkeit
                    und die Bereitschaft, auch Ihre eigene Grenze ernst zu nehmen.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/uebersicht">
                <Button variant="ghost">← Wie kann ich helfen?</Button>
              </Link>
              <Link href="/unterstuetzen/therapie">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Therapie begleiten
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
