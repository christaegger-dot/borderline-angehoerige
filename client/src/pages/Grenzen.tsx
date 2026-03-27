import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";

import { grenzenSubcategories, grenzenItems } from "@/content/grenzen";

export default function Grenzen() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? grenzenItems
      : grenzenItems.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO
        title="Grenzen setzen"
        description="Grenzen für Angehörige: Selbstschutz, Klarheit, Konsequenz und begrenzte Verfügbarkeit."
        path="/grenzen"
      />

      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sand-muteder flex items-center justify-center">
                <Shield className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 12 Minuten
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Grenzen setzen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Grenzen sind kein Gegenpol zu Mitgefühl, sondern oft seine
              Voraussetzung. Sie schützen Ihre Integrität, machen Beziehungen
              berechenbarer und verhindern, dass Unterstützung in Selbstaufgabe
              kippt. Gleichzeitig können Grenzen Spannungen auslösen. Genau
              deshalb brauchen sie Klarheit, Wiederholbarkeit und Konsequenz.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Warum Grenzen so wichtig sind"
              icon={<Shield className="w-7 h-7 text-sage-mid" />}
              id="warum-grenzen"
              defaultOpen={true}
              preview="Grenzen helfen nicht deshalb, weil danach sofort Ruhe einkehrt, sondern weil Beziehungen ohne Klarheit oft instabiler und erschöpfender werden."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  In belasteten Beziehungen entsteht leicht der Eindruck,
                  Grenzen würden die Lage verschärfen. Kurzfristig kann das
                  sogar so wirken. Langfristig machen fehlende Grenzen
                  Beziehungen aber oft chaotischer, unklarer und
                  krisenanfälliger.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Für Sie
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Grenzen schützen vor Überlastung, Dauererreichbarkeit,
                        Schuldspiralen und dem Verlust der eigenen Orientierung.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Für die Beziehung
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Grenzen schaffen Berechenbarkeit. Sie signalisieren, was
                        Kontakt trägt und was ihn beschädigt.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Woran Sie merken, dass eine Grenze nötig ist"
              icon={<AlertTriangle className="w-7 h-7 text-sand-mid" />}
              id="warnsignale"
              preview="Grenzen werden oft erst dann sichtbar, wenn Sie längst überschritten wurden: durch Erschöpfung, Druck, Angst, Groll oder innere Härte."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Sie sagen aus Angst ja, obwohl innerlich längst nein da ist.",
                  "Sie fühlen sich dauernd zuständig, beobachtend oder auf Abruf.",
                  "Sie werden gereizt, hart oder ziehen sich innerlich zurück.",
                  "Sie merken, dass Hilfe nur noch aus Schuld oder Panik geschieht.",
                ].map(item => (
                  <Card key={item} className="border-border/50">
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mt-4 bg-sand-muted border-sand-mid">
                <CardContent className="p-5">
                  <p className="text-foreground leading-relaxed">
                    Grenzen beginnen oft nicht mit dem Satz an den anderen,
                    sondern mit dem ernsten Wahrnehmen Ihrer eigenen Belastung.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            <ContentSection
              title="Welche Arten von Grenzen häufig relevant sind"
              icon={<Clock className="w-7 h-7 text-slate-mid" />}
              id="arten"
              preview="Grenzen betreffen nicht nur Lautstärke oder Streit, sondern Zeit, Erreichbarkeit, Raum, Geld und emotionale Zumutbarkeit."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Zeitliche Grenzen",
                    text: "Wann sind Sie erreichbar, wann nicht? Wann ist Pause nötig?",
                  },
                  {
                    title: "Emotionale Grenzen",
                    text: "Welcher Ton, welche Vorwürfe, welche Dynamiken überschreiten Ihre Grenze?",
                  },
                  {
                    title: "Räumliche Grenzen",
                    text: "Wo brauchen Sie Rückzug, Distanz oder Schutz des eigenen Raums?",
                  },
                  {
                    title: "Materielle Grenzen",
                    text: "Wie weit gehen finanzielle Hilfe, Ausleihen oder praktische Übernahmen?",
                  },
                ].map(item => (
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

            <ContentSection
              title="Wie Grenzen eher gut kommuniziert werden"
              icon={<Heart className="w-7 h-7 text-sage-dark" />}
              id="kommunizieren"
              preview="Hilfreiche Grenzen sind meist konkret, ruhig und wiederholbar. Sie erklären sich nicht endlos und werden nicht als moralischer Angriff formuliert."
            >
              <div className="space-y-4">
                <Card className="bg-sage-light/10 border-sage">
                  <CardContent className="p-5">
                    <p className="text-muted-foreground leading-relaxed">
                      Grenzen tragen eher, wenn sie
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>konkret statt abstrakt sind,</li>
                      <li>auf Ihr Handeln bezogen bleiben,</li>
                      <li>nicht mit Vorwürfen überladen werden,</li>
                      <li>
                        nicht bei jedem Gespräch neu verhandelt werden müssen.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Eher hilfreich
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Ich spreche weiter mit dir, aber nicht, wenn du mich
                        anschreist."
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Eher problematisch
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Du bist unmöglich. So rede ich nie wieder mit dir."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Konsequenz ist oft der schwierigste Teil"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="konsequenz"
              preview="Viele Grenzen scheitern nicht an der Formulierung, sondern daran, dass Angst, Schuld oder Hoffnung sie sofort wieder aufweichen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Grenzen wirken selten, wenn sie nur angekündigt, aber nicht
                  umgesetzt werden. Genau hier geraten viele Angehörige in
                  Loyalitätskonflikte: Sie wollen klar sein, fürchten aber
                  Eskalation, Ablehnung oder Schuld.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Konsequenz heisst nicht Härte. Es heisst, dass Ihr Handeln
                      zu dem passt, was Sie angekündigt haben.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Häufige Fehler beim Grenzen setzen"
              icon={<AlertTriangle className="w-7 h-7 text-sage-mid" />}
              id="fehler"
              preview="Grenzen werden oft im Affekt, zu gross, zu unklar oder aus Kränkung formuliert. Dann tragen sie selten lange."
            >
              <div className="space-y-3">
                {[
                  {
                    wrong: "Grenzen im Affekt setzen",
                    right: "besser in ruhigen Momenten vorbereiten",
                  },
                  {
                    wrong: "zu viele Grenzen auf einmal",
                    right: "wenige zentrale Grenzen priorisieren",
                  },
                  {
                    wrong: "Grenzen als Strafe formulieren",
                    right: "Grenzen als Selbstschutz erklären",
                  },
                  {
                    wrong: "Grenzen nicht durchhalten",
                    right: "nur ankündigen, was Sie tragen können",
                  },
                  {
                    wrong: "bei Schuld sofort zurückrudern",
                    right: "Schuldgefühl nicht automatisch als Fehler lesen",
                  },
                ].map(item => (
                  <Card key={item.wrong} className="border-border/50">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">{item.wrong}</span>
                        <span className="mx-2 text-sage-mid">→</span>
                        <span className="text-foreground">{item.right}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            <ContentSection
              title="Grenzen in verschiedenen Angehörigenrollen"
              icon={<Users className="w-7 h-7 text-slate-mid" />}
              id="rollen"
              preview="Partner, Eltern und erwachsene Kinder geraten auf unterschiedliche Weise in Loyalitätsdruck. Das verändert auch, wie schwer Grenzen sich anfühlen."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Partner/in
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      In Partnerschaften fühlen sich Grenzen oft schnell wie
                      Beziehungsgefahr an. Gerade deshalb sind sie wichtig: Sie
                      unterscheiden zwischen Nähe und Verschmelzung, Mitgefühl
                      und Selbstaufgabe.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als Elternteil
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Eltern erleben Grenzen oft als Widerspruch zu Fürsorge.
                      Bei erwachsenen Kindern ist Begrenzung aber häufig Teil
                      verantwortlicher Elternschaft, nicht ihr Gegenstück.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Als erwachsenes Kind
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Wer seinem Elternteil Grenzen setzt, erlebt oft besonders
                      starke Schuld. Ihre emotionale Gesundheit ist dennoch
                      nicht nachrangig. Sie dürfen Ihr eigenes Leben schützen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-sage-mid" />
                Materialien zum Thema Grenzen
              </h2>
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">
                    Vorschau = Web-Bild.
                  </strong>{" "}
                  «PDF öffnen» öffnet die A4-Druckversion im neuen Tab.
                </span>
              </p>

              <div className="flex flex-wrap gap-2 pb-3 mb-6 -mx-1 px-1">
                {grenzenSubcategories.map(cat => {
                  const Icon = cat.icon;
                  const count =
                    cat.id === "alle"
                      ? grenzenItems.length
                      : grenzenItems.filter(i => i.category === cat.id).length;
                  return (
                    <Button
                      key={cat.id}
                      variant={activeFilter === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setActiveFilter(cat.id);
                        setTimeout(() => {
                          gridRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }, 50);
                      }}
                      className={`whitespace-nowrap ${
                        activeFilter === cat.id
                          ? "bg-sage-mid hover:bg-sage-dark text-white"
                          : ""
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {cat.label}
                      <span className="ml-1.5 text-xs opacity-90">
                        ({count})
                      </span>
                    </Button>
                  );
                })}
              </div>

              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.title}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${
                      filteredItems.length > 1 && index === 0
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm text-foreground mb-2">
                        {item.title}
                      </h3>
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        PDF öffnen
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien ansehen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-sage-light/30 border-sage">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Grenzen fühlen sich anfangs oft unangenehm an. Das bedeutet
                    nicht automatisch, dass sie falsch sind. In belasteten
                    Beziehungen braucht gute Begrenzung meist Wiederholung,
                    innere Festigkeit und die Erlaubnis, auch Schuldgefühle zu
                    überstehen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/kommunizieren">
                <Button variant="ghost">← Kommunizieren</Button>
              </Link>
              <Link href="/selbstfuersorge">
                <Button className="bg-sage-dark hover:bg-sage-mid text-white">
                  Weiter: Selbstfürsorge
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
