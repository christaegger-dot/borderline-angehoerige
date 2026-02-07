import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, CheckCircle2, Heart, Clock, Users, Lightbulb, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenAlltag() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Link href="/unterstuetzen/uebersicht" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sage-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">Lesezeit: 8 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Im Alltag unterstützen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Der Alltag bietet viele Gelegenheiten, Ihren Angehörigen zu unterstützen – ohne grosse Gesten, sondern durch beständige, kleine Handlungen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Stabilität bieten */}
            <ContentSection
              title="Stabilität und Struktur bieten"
              icon={<Clock className="w-7 h-7 text-sage" />}
              id="stabilitaet"
              defaultOpen={true}
              preview="Menschen mit Borderline erleben oft inneres Chaos. Äussere Struktur kann helfen, dieses Chaos zu regulieren."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Menschen mit Borderline erleben oft inneres Chaos. Äussere Struktur kann helfen, dieses Chaos zu regulieren. Sie können Stabilität bieten durch:
              </p>
              
              <div className="grid gap-4">
                {[
                  {
                    title: "Verlässliche Routinen",
                    description: "Regelmässige Essenszeiten, feste Termine für gemeinsame Aktivitäten, vorhersehbare Abläufe.",
                    example: "\"Jeden Sonntag frühstücken wir zusammen – das ist unser Ritual.\""
                  },
                  {
                    title: "Klare Kommunikation",
                    description: "Sagen Sie, was Sie meinen. Vermeiden Sie Doppeldeutigkeiten und unausgesprochene Erwartungen.",
                    example: "\"Ich komme um 18 Uhr nach Hause\" statt \"Ich komme später\"."
                  },
                  {
                    title: "Berechenbarkeit",
                    description: "Halten Sie Versprechen. Kündigen Sie Änderungen frühzeitig an. Seien Sie zuverlässig.",
                    example: "Wenn Sie absagen müssen, tun Sie es rechtzeitig und mit Erklärung."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
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

            {/* Emotionale Verfügbarkeit */}
            <ContentSection
              title="Emotionale Verfügbarkeit zeigen"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="emotionale-verfuegbarkeit"
              preview="Emotionale Verfügbarkeit bedeutet nicht, immer verfügbar zu sein. Es bedeutet, in den Momenten, in denen Sie da sind, wirklich präsent zu sein."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Emotionale Verfügbarkeit bedeutet nicht, immer verfügbar zu sein. Es bedeutet, in den Momenten, in denen Sie da sind, wirklich präsent zu sein.
              </p>
              
              <Card className="bg-terracotta-light/10 border-terracotta">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Praktische Tipps</h3>
                  <ul className="space-y-3">
                    {[
                      "Legen Sie das Handy weg, wenn Sie miteinander sprechen",
                      "Halten Sie Blickkontakt und nicken Sie, um zu zeigen, dass Sie zuhören",
                      "Fragen Sie nach: \"Wie geht es dir wirklich?\"",
                      "Akzeptieren Sie auch Schweigen – manchmal ist Ihre Anwesenheit genug",
                      "Zeigen Sie Interesse an den Dingen, die Ihrem Angehörigen wichtig sind"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Beziehungs-Achtsamkeit */}
            <ContentSection
              title="Beziehungs-Achtsamkeit"
              icon={<Users className="w-7 h-7 text-sage-mid" />}
              id="beziehungs-achtsamkeit"
              preview="Bewusst und nicht-wertend wahrnehmen, was in der Interaktion gerade passiert – bei Ihnen und bei Ihrem Gegenüber."
            >
              <Card className="bg-sage-wash/50 border-sage-mid/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed">
                    <strong>Beziehungs-Achtsamkeit</strong> bedeutet, bewusst und nicht-wertend wahrzunehmen, was in der Interaktion gerade passiert – bei Ihnen und bei Ihrem Gegenüber.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dieses Konzept aus dem Family Connections Programm hilft Ihnen, automatische Reaktionsmuster zu unterbrechen und bewusster zu handeln.
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Innehalten",
                    description: "Bevor Sie reagieren, halten Sie kurz inne. Atmen Sie einmal tief durch."
                  },
                  {
                    step: "2",
                    title: "Wahrnehmen",
                    description: "Was passiert gerade? Was fühlen Sie? Was fühlt Ihr Gegenüber vermutlich?"
                  },
                  {
                    step: "3",
                    title: "Nicht bewerten",
                    description: "Beobachten Sie ohne zu urteilen. «Es ist, wie es ist.»"
                  },
                  {
                    step: "4",
                    title: "Bewusst handeln",
                    description: "Wählen Sie Ihre Reaktion bewusst, statt automatisch zu reagieren."
                  }
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
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Family Connections Program (NEA-BPD)
              </p>
            </ContentSection>

            {/* Gemeinsame Aktivitäten */}
            <ContentSection
              title="Gemeinsame Aktivitäten gestalten"
              icon={<Users className="w-7 h-7 text-slate-blue" />}
              id="gemeinsame-aktivitaeten"
              preview="Positive gemeinsame Erlebnisse stärken die Beziehung und schaffen Ressourcen für schwierige Zeiten."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Positive gemeinsame Erlebnisse stärken die Beziehung und schaffen Ressourcen für schwierige Zeiten. Wichtig ist: Die Aktivität sollte beiden Freude machen.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Bewegung", examples: "Spaziergang, Yoga, Schwimmen" },
                  { title: "Kreativität", examples: "Kochen, Malen, Musik hören" },
                  { title: "Natur", examples: "Garten, Park, Ausflüge" },
                  { title: "Entspannung", examples: "Film schauen, Lesen, Kaffee trinken" }
                ].map((item, index) => (
                  <Card key={index} className={`border-border/50 ${index === 0 ? "md:col-span-2" : ""}`}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.examples}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-sand-muted border-sand-mid">
                <CardContent className="p-5">
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Tipp:</strong> Planen Sie regelmässige «Positiv-Termine» ein – auch wenn es nur 15 Minuten sind. Qualität zählt mehr als Quantität.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Konkrete Tipps */}
            <ContentSection
              title="Was Sie konkret tun können"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="konkrete-tipps"
              preview="Praktische Handlungen, die im Alltag einen Unterschied machen."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hier sind praktische Handlungen, die im Alltag einen Unterschied machen:
              </p>
              
              <div className="space-y-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Übungspartner für Skills sein</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Wenn Ihr Angehöriger in Therapie ist, können Sie beim Üben neuer Fähigkeiten helfen:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Gemeinsam Atemübungen machen (auch wenn keine Krise ist)</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Bei Achtsamkeitsübungen mitmachen</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Sanft an Skills erinnern: «Möchtest du die Übung ausprobieren, die dir letztens geholfen hat?»</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Fortschritte anerkennen</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Kleine Erfolge zu bemerken und zu benennen stärkt die Motivation:
                    </p>
                    <div className="bg-sage-lighter/50 rounded-lg p-3">
                      <p className="text-sm text-foreground italic">
                        «Ich habe bemerkt, dass du heute ruhig geblieben bist, obwohl die Situation schwierig war. Das war stark.»
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      <strong>Wichtig:</strong> Anerkennen Sie den Fortschritt, aber betonen Sie auch, dass Sie wissen, wie schwer es ist. Das verhindert Überforderung.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Vorhersehbar sein</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Menschen mit Borderline reagieren stark auf Unsicherheit. Sie können helfen durch:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Änderungen frühzeitig ankündigen</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Versprechen halten oder erklären, warum nicht</span>
                      </li>
                      <li className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span>Klare Zeiten für Erreichbarkeit kommunizieren</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Gemeinsam Probleme lösen</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Statt Lösungen vorzugeben, fragen Sie:
                    </p>
                    <div className="space-y-2">
                      <div className="bg-sage-lighter/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">«Was wäre dein Vorschlag?»</p>
                      </div>
                      <div className="bg-sage-lighter/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">«Wie kann ich dir dabei helfen?»</p>
                      </div>
                      <div className="bg-sage-lighter/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">«Was brauchst du gerade von mir?»</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Grenzen der Alltagsunterstützung */}
            <ContentSection
              title="Grenzen der Alltagsunterstützung"
              icon={<AlertTriangle className="w-7 h-7 text-terracotta-mid" />}
              id="grenzen"
              preview="Auch im Alltag gibt es Grenzen. Sie müssen nicht perfekt sein – nur beständig und wohlwollend."
            >
              <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Auch im Alltag gibt es Grenzen. Sie können nicht:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Die Emotionen Ihres Angehörigen kontrollieren",
                      "Alle Trigger vermeiden",
                      "Immer die richtige Reaktion haben",
                      "Die Therapie ersetzen"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-terracotta-mid">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    <strong className="text-foreground">Das ist in Ordnung.</strong> Sie müssen nicht perfekt sein – nur beständig und wohlwollend.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/uebersicht">
                <Button variant="ghost">
                  ← Wie kann ich helfen?
                </Button>
              </Link>
              <Link href="/unterstuetzen/therapie">
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
