import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, CheckCircle2, Heart, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function Kommunizieren() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.90_0.03_250)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.90_0.03_250)] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[oklch(0.45_0.05_250)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.05_250)]">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Kommunizieren
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Gute Kommunikation ist der Schlüssel zu einer stabilen Beziehung. Hier lernen Sie Techniken, die auch in schwierigen Momenten funktionieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Validierung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Validierung: Die wichtigste Technik
              </h2>
              
              <Card className="bg-[oklch(0.85_0.08_55)]/10 border-[oklch(0.65_0.12_55)] mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    <strong>Validierung</strong> bedeutet, die Gefühle und Erfahrungen eines Menschen anzuerkennen – ohne sie zu bewerten, zu korrigieren oder zu lösen.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Validierung ist nicht dasselbe wie Zustimmung. Sie können ein Gefühl anerkennen, ohne das Verhalten gutzuheissen. Das ist ein wichtiger Unterschied.
              </p>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Die 6 Stufen der Validierung</h3>
              
              <div className="space-y-3">
                {[
                  { level: 1, title: "Präsent sein", example: "Aufmerksam zuhören, Blickkontakt halten" },
                  { level: 2, title: "Genau reflektieren", example: "\"Du sagst, du fühlst dich allein gelassen.\"" },
                  { level: 3, title: "Unausgesprochenes benennen", example: "\"Das klingt, als wärst du auch wütend darüber.\"" },
                  { level: 4, title: "Verhalten aus der Geschichte erklären", example: "\"Nach allem, was du erlebt hast, ist es verständlich, dass du so reagierst.\"" },
                  { level: 5, title: "Normalität bestätigen", example: "\"Jeder würde in dieser Situation so fühlen.\"" },
                  { level: 6, title: "Radikale Echtheit", example: "\"Ich glaube an dich. Du schaffst das.\"" }
                ].map((item) => (
                  <Card key={item.level} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.65_0.12_55)] text-white text-sm flex items-center justify-center flex-shrink-0">
                          {item.level}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-muted-foreground text-sm italic">{item.example}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* SET-Kommunikation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                SET-Kommunikation
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                SET ist eine Kommunikationstechnik, die speziell für den Umgang mit Menschen mit Borderline entwickelt wurde. Sie besteht aus drei Elementen:
              </p>
              
              <div className="grid gap-4">
                {[
                  {
                    letter: "S",
                    title: "Support (Unterstützung)",
                    description: "Drücken Sie Ihre Sorge und Ihr Mitgefühl aus.",
                    example: "\"Ich mache mir Sorgen um dich. Ich möchte dir helfen.\"",
                    color: "oklch(0.65 0.08 145)"
                  },
                  {
                    letter: "E",
                    title: "Empathy (Empathie)",
                    description: "Zeigen Sie, dass Sie die Gefühle verstehen.",
                    example: "\"Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.\"",
                    color: "oklch(0.65 0.12 55)"
                  },
                  {
                    letter: "T",
                    title: "Truth (Wahrheit)",
                    description: "Benennen Sie die Realität und mögliche Konsequenzen.",
                    example: "\"Wenn du jetzt gehst, kann ich nicht wissen, ob es dir gut geht. Das macht mir Angst.\"",
                    color: "oklch(0.45 0.05 250)"
                  }
                ].map((item) => (
                  <Card key={item.letter} style={{ borderColor: item.color }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
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

            {/* Praktische Tipps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-[oklch(0.60_0.15_85)]" />
                Praktische Kommunikationstipps
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      Hilfreich
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Ich-Botschaften verwenden</li>
                      <li>• Ruhig und langsam sprechen</li>
                      <li>• Pausen zulassen</li>
                      <li>• Gefühle benennen</li>
                      <li>• Nachfragen statt annehmen</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-[oklch(0.55_0.15_25)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="text-[oklch(0.55_0.15_25)]">✗</span>
                      Vermeiden
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• "Du machst immer..."</li>
                      <li>• "Beruhige dich!"</li>
                      <li>• "Das ist doch nicht so schlimm"</li>
                      <li>• Sarkasmus oder Ironie</li>
                      <li>• Unterbrechen oder Augenrollen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Beispieldialoge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Beispiel: Vorher und Nachher
              </h2>
              
              <div className="grid gap-4">
                <Card className="border-[oklch(0.55_0.15_25)] bg-[oklch(0.95_0.02_25)]">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">❌ Weniger hilfreich:</h3>
                    <p className="text-muted-foreground italic">
                      "Du überreagierst mal wieder. Kannst du nicht einmal normal reagieren? Ich habe doch nur gesagt, dass ich später komme!"
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-[oklch(0.55_0.10_145)] bg-[oklch(0.92_0.03_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">✓ Hilfreicher:</h3>
                    <p className="text-muted-foreground italic">
                      "Ich sehe, dass dich das sehr aufgeregt hat. Es tut mir leid, dass ich nicht früher Bescheid gesagt habe. Ich verstehe, dass sich das für dich wie Zurückweisung anfühlen kann. Das war nicht meine Absicht."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen">
                <Button variant="ghost">
                  ← Unterstützen
                </Button>
              </Link>
              <Link href="/grenzen">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: Grenzen setzen
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
