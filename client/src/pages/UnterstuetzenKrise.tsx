import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Phone, Shield, Clock, Download, FileText, Image } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenKrise() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.06_35)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/unterstuetzen/uebersicht" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.06_35)] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[oklch(0.50_0.15_35)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.50_0.15_35)]">Lesezeit: 6 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              In der Krise unterstützen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Krisen gehören zum Leben mit Borderline. Hier erfahren Sie, wie Sie Krisen erkennen, deeskalieren und Sicherheit gewährleisten – ohne sich selbst zu gefährden.
            </p>
            
            <div className="p-4 rounded-xl bg-[oklch(0.96_0.02_85)] border border-[oklch(0.90_0.04_85)]">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Unterschied Krise vs. Notfall:</strong> Diese Seite ist für <strong>emotionale Krisen und Eskalationen</strong> (starke Emotionen, Konflikte, Rückzug). Bei <strong>akuter Gefahr</strong> (Suizidgefahr, Selbstverletzung) gehen Sie direkt zu{" "}
                <Link href="/soforthilfe" className="text-[oklch(0.55_0.20_25)] hover:underline font-medium">Soforthilfe & Notfallnummern →</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-[oklch(0.55_0.20_25)]">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white text-center sm:text-left">
              <strong>Bei akuter Suizidgefahr:</strong> Rufen Sie sofort den Notruf 144 oder die Dargebotene Hand 143
            </p>
            <Link href="/soforthilfe">
              <Button variant="secondary" size="sm" className="bg-white text-[oklch(0.55_0.20_25)]">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Das Ampel-System: Krisen erkennen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nicht jede schwierige Situation ist eine Krise. Das Ampel-System hilft Ihnen, die Intensität einzuschätzen und angemessen zu reagieren.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    level: "Grün – Stabil",
                    description: "Alltägliche Stimmungsschwankungen, normale Belastungen",
                    action: "Präsent sein, zuhören, Routinen beibehalten",
                    color: "oklch(0.55 0.15 145)",
                    bgColor: "oklch(0.92 0.05 145)"
                  },
                  {
                    level: "Gelb – Angespannt",
                    description: "Erhöhte Reizbarkeit, Rückzug, erkennbare Trigger",
                    action: "Validieren, Skills anbieten, Raum geben",
                    color: "oklch(0.60 0.15 85)",
                    bgColor: "oklch(0.95 0.05 85)"
                  },
                  {
                    level: "Orange – Eskalierend",
                    description: "Starke Emotionen, verbale Aggression, Kontrollverlust",
                    action: "Deeskalieren, Sicherheit prüfen, Grenzen setzen",
                    color: "oklch(0.55 0.18 55)",
                    bgColor: "oklch(0.95 0.05 55)"
                  },
                  {
                    level: "Rot – Akute Krise",
                    description: "Suizidgedanken, Selbstverletzung, akute Gefahr",
                    action: "Professionelle Hilfe holen, Notruf wenn nötig",
                    color: "oklch(0.50 0.20 25)",
                    bgColor: "oklch(0.95 0.05 25)"
                  }
                ].map((item, index) => (
                  <Card key={index} style={{ borderColor: item.color, backgroundColor: item.bgColor }} className="border-l-4">
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">{item.level}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                      <p className="text-sm">
                        <strong className="text-foreground">Ihre Reaktion:</strong>{" "}
                        <span className="text-muted-foreground">{item.action}</span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* 4 Schritte der Deeskalation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                4 Schritte der Deeskalation
              </h2>
              
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
                        <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.15_35)] text-white flex items-center justify-center font-semibold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
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
            </motion.div>

            {/* Konkrete Formulierungen für die Krise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Was Sie in der Krise sagen können
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                In einer Krise zählt jedes Wort. Diese Formulierungen haben sich bewährt:
              </p>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Präsenz zeigen</h3>
                    <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich bin hier. Ich gehe nicht weg. Du bist nicht allein."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Gefühle validieren</h3>
                    <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich sehe, dass du gerade unglaublich viel Schmerz fühlst. Das muss sich furchtbar anfühlen."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Hoffnung vermitteln</h3>
                    <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Dieses Gefühl wird vorbeigehen. Es fühlt sich jetzt endlos an, aber es wird sich verändern."</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Konkrete Hilfe anbieten</h3>
                    <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Was brauchst du gerade am meisten? Soll ich einfach hier sitzen? Oder sollen wir zusammen atmen?"</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Bei Suizidgedanken direkt ansprechen</h3>
                    <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                      <p className="text-sm text-foreground font-medium">"Ich mache mir Sorgen um dich. Hast du gerade Gedanken, dir etwas anzutun?"</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Hinweis: Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Was Sie NICHT tun sollten */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Was Sie in der Krise vermeiden sollten
              </h2>
              
              <Card className="border-l-4 border-l-[oklch(0.55_0.20_25)] bg-[oklch(0.95_0.03_25)]">
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
                        <span className="text-[oklch(0.55_0.20_25)]">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Nach der Krise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[oklch(0.65_0.08_145)]" />
                Nach der Krise
              </h2>
              
              <Card className="bg-[oklch(0.88_0.04_145)]/20 border-[oklch(0.65_0.08_145)]">
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
                        <span className="text-[oklch(0.55_0.10_145)]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.50_0.15_35)]" />
                Materialien zum Thema
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "In der Krise unterstützen",
                    description: "Das Ampel-System und 4 Schritte der Deeskalation",
                    type: "PNG",
                    rating: "NEU",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zMFfHFCOztVWyzCA.png",
                    isNew: true,
                    icon: "image"
                  },
                  {
                    title: "Der Nebel (FOG)",
                    description: "Fear, Obligation, Guilt – emotionale Muster erkennen",
                    type: "PNG",
                    rating: "NEU",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/doxRJKzyLuIwYzXV.png",
                    isNew: true,
                    icon: "image"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[oklch(0.92_0.06_35)] flex items-center justify-center flex-shrink-0">
                          {item.icon === "image" ? <Image className="w-4 h-4 text-[oklch(0.50_0.15_35)]" /> : <FileText className="w-4 h-4 text-[oklch(0.50_0.15_35)]" />}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.isNew ? 'bg-[oklch(0.75_0.15_55)] text-white' : 'bg-[oklch(0.92_0.05_145)] text-[oklch(0.40_0.08_145)]'}`}>
                          {item.rating}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="link" className="text-[oklch(0.50_0.15_35)]">
                    Alle Materialien ansehen →
                  </Button>
                </Link>
              </div>
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
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
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
