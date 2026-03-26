import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Phone, Shield, Clock, Download, MessageCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import { kontaktByIdStrict } from "@/data/kontakte";

const rot144 = kontaktByIdStrict("ROT_144");
const gruen143 = kontaktByIdStrict("GRUEN_143");

export default function UnterstuetzenKrise() {
  return (
    <Layout>
      <SEO title="Krisenbegleitung" description="Wie Sie in akuten Krisen richtig reagieren und Hilfe leisten können." path="/unterstuetzen/krise" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-terracotta-lighter/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Link href="/unterstuetzen/uebersicht" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-terracotta-lighter flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-terracotta-mid" />
              </div>
              <span className="text-sm font-medium text-terracotta-mid">Lesezeit: 6 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              In der Krise unterstützen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Viele Angehörige erleben Phasen starker Anspannung, Eskalation oder Rückzug. Hier erfahren Sie, wie Sie Krisen besser einordnen, deeskalierend reagieren und Sicherheit im Blick behalten können, ohne Ihre eigene Grenze aus dem Blick zu verlieren.
            </p>
            
            <div className="p-4 rounded-xl bg-sand border border-sand-subtle">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Unterschied Krise vs. Notfall:</strong> Diese Seite ist für <strong>emotionale Krisen und Eskalationen</strong> (starke Emotionen, Konflikte, Rückzug). Bei <strong>akuter Gefahr</strong> (Suizidgefahr, Selbstverletzung) gehen Sie direkt zu{" "}
                <Link href="/soforthilfe" className="text-alert hover:underline font-medium">Soforthilfe & Notfallnummern →</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-alert wave-divider-top">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white text-center sm:text-left">
              <strong>Bei akuter Suizidgefahr:</strong> Rufen Sie sofort den Notruf{" "}
              <a href={`tel:${rot144.tel}`} className="underline font-bold">{rot144.nummer}</a>.
              Zur Entlastung danach:{" "}
              <a href={`tel:${gruen143.tel}`} className="underline">{gruen143.label} ({gruen143.nummer})</a>
            </p>
            <Link href="/soforthilfe">
              <Button variant="secondary" size="sm" className="bg-white text-alert">
                <Phone className="w-4 h-4 mr-2" />
                Alle Notfallnummern
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Ampel-System */}
            <ContentSection
              title="Das Ampel-System: Krisen erkennen"
              icon={<AlertTriangle className="w-7 h-7 text-terracotta-mid" />}
              id="ampel-system"
              defaultOpen={true}
              preview="Nicht jede schwierige Situation ist eine Krise. Das Ampel-System hilft Ihnen, die Intensität einzuschätzen."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nicht jede schwierige Situation ist eine Krise. Das Ampel-System hilft Ihnen, die Intensität einzuschätzen und angemessen zu reagieren.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    level: "Grün – Stabil",
                    description: "Alltägliche Stimmungsschwankungen, normale Belastungen",
                    action: "Präsent sein, zuhören, Routinen beibehalten",
                    color: "var(--color-sage-mid)",
                    bgColor: "var(--color-sage-lighter)"
                  },
                  {
                    level: "Gelb – Angespannt",
                    description: "Erhöhte Reizbarkeit, Rückzug, erkennbare Trigger",
                    action: "Validieren, Skills anbieten, Raum geben",
                    color: "var(--color-sand-mid)",
                    bgColor: "var(--color-sand-muted)"
                  },
                  {
                    level: "Orange – Eskalierend",
                    description: "Starke Emotionen, verbale Aggression, Kontrollverlust",
                    action: "Deeskalieren, Sicherheit prüfen, Grenzen setzen",
                    color: "var(--color-terracotta-mid)",
                    bgColor: "var(--color-terracotta-wash)"
                  },
                  {
                    level: "Rot – Akute Krise",
                    description: "Suizidgedanken, Selbstverletzung, akute Gefahr",
                    action: "Professionelle Hilfe holen, Notruf wenn nötig",
                    color: "var(--color-alert)",
                    bgColor: "var(--color-terracotta-wash)"
                  }
                ].map((item, index) => (
                  <Card key={index} style={{ borderColor: item.color, backgroundColor: item.bgColor }} className="border-l-4">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">{item.level}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <p className="text-sm">
                        <strong className="text-foreground">Ihre Reaktion:</strong>{" "}
                        <span className="text-muted-foreground">{item.action}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            {/* 4 Schritte der Deeskalation */}
            <ContentSection
              title="4 Schritte der Deeskalation"
              icon={<Shield className="w-7 h-7 text-terracotta-mid" />}
              id="deeskalation"
              preview="Sicherheit prüfen, Ruhe bewahren, Validieren, Skills anbieten – ein bewährtes Vorgehen."
            >
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Sicherheit prüfen",
                    description: "Sind Sie und Ihr Angehöriger sicher? Gibt es gefährliche Gegenstände in der Nähe?",
                    example: "Entfernen Sie unauffällig scharfe Gegenstände oder Medikamente."
                  },
                  {
                    step: 2,
                    title: "Ruhe bewahren",
                    description: "Ihre Ruhe kann ansteckend sein. Atmen Sie tief, sprechen Sie langsam und leise.",
                    example: "\"Ich bin hier. Wir schaffen das zusammen.\""
                  },
                  {
                    step: 3,
                    title: "Validieren",
                    description: "Anerkennen Sie die Gefühle, ohne sie zu bewerten oder zu lösen.",
                    example: "\"Ich sehe, dass du gerade sehr viel Schmerz fühlst. Das muss furchtbar sein.\""
                  },
                  {
                    step: 4,
                    title: "Skills anbieten",
                    description: "Erinnern Sie sanft an Strategien, die in der Vergangenheit geholfen haben.",
                    example: "\"Möchtest du die Atemübung ausprobieren, die dir letztens geholfen hat?\""
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-terracotta-mid text-white flex items-center justify-center font-semibold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            {/* Was Sie in der Krise sagen können */}
            <ContentSection
              title="Was Sie in der Krise sagen können"
              icon={<MessageCircle className="w-7 h-7 text-sage" />}
              id="krise-formulierungen"
              preview="In einer Krise zählt jedes Wort. Diese Formulierungen haben sich bewährt."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                In einer Krise zählt jedes Wort. Diese Formulierungen haben sich bewährt:
              </p>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Präsenz zeigen</h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich bin hier. Ich gehe nicht weg. Du bist nicht allein."</p>
                      <p className="text-xs text-muted-foreground mt-2">Wenn Nähe die Situation verschärft, kann auch eine ruhig angekündigte Distanz hilfreich sein: «Ich bleibe in der Nähe und komme in ein paar Minuten wieder.»</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Gefühle validieren</h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich sehe, dass du gerade unglaublich viel Schmerz fühlst. Das muss sich furchtbar anfühlen."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Hoffnung vermitteln</h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Dieses Gefühl wird vorbeigehen. Es fühlt sich jetzt endlos an, aber es wird sich verändern."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Konkrete Hilfe anbieten</h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Was brauchst du gerade am meisten? Soll ich einfach hier sitzen? Oder sollen wir zusammen atmen?"</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Bei Suizidgedanken direkt ansprechen</h3>
                    <div className="bg-sage-lighter rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich mache mir Sorgen um dich. Hast du gerade Gedanken, dir etwas anzutun?"</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Hinweis: Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.</p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Was Sie NICHT tun sollten */}
            <ContentSection
              title="Was Sie in der Krise vermeiden sollten"
              icon={<XCircle className="w-7 h-7 text-alert" />}
              id="vermeiden"
              preview="Drohen, Vorwürfe machen oder Gefühle herunterspielen – diese Reaktionen können die Krise verschärfen."
            >
              <Card className="border-l-4 border-l-alert bg-terracotta-wash">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      "Drohen oder Ultimaten stellen",
                      "Vorwürfe machen oder Schuld zuweisen",
                      "Die Gefühle herunterspielen (\"So schlimm ist es doch nicht\")",
                      "Logisch argumentieren oder überzeugen wollen",
                      "Die Person alleine lassen, wenn Suizidgefahr besteht",
                      "Sich selbst in Gefahr bringen"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-alert">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Nach der Krise */}
            <ContentSection
              title="Nach der Krise"
              icon={<Clock className="w-7 h-7 text-sage" />}
              id="nach-der-krise"
              preview="Wenn die akute Krise vorbei ist, ist es wichtig, das Erlebte zu verarbeiten – für Sie beide."
            >
              <Card className="bg-sage-light/20 border-sage">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Wenn die akute Krise vorbei ist, ist es wichtig, das Erlebte zu verarbeiten – für Sie beide:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Sprechen Sie später in Ruhe über das Geschehene",
                      "Fragen Sie, was geholfen hat und was nicht",
                      "Aktualisieren Sie gemeinsam den Krisenplan",
                      "Achten Sie auch auf Ihre eigenen Gefühle",
                      "Holen Sie sich bei Bedarf selbst Unterstützung"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-sage-mid">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-terracotta-mid" />
                Materialien zum Thema
              </h2>
              
              <Card className="bg-sand-muted border-sand-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                      <Download className="w-5 h-5 text-sage-mid" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Alle Materialien als PDF verfügbar</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Infografiken und Handouts zum Thema Krisenbegleitung finden Sie auf der Materialien-Seite.
                      </p>
                      <Link href="/materialien">
                        <Button variant="outline" size="sm">
                          Zur Materialien-Seite
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/therapie">
                <Button variant="ghost">
                  ← Therapie begleiten
                </Button>
              </Link>
              <Link href="/kommunizieren">
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
                  Weiter: Kommunizieren
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
