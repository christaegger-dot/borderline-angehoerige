import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, AlertCircle, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Verstehen() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.88_0.04_145)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[oklch(0.45_0.08_145)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.08_145)]">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Borderline verstehen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Die Borderline-Persönlichkeitsstörung ist eine komplexe Erkrankung, die das Erleben und Verhalten tiefgreifend beeinflusst. Hier erfahren Sie, was dahinter steckt – und warum dieses Wissen Ihnen helfen kann.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-l-4 border-l-[oklch(0.65_0.08_145)] bg-[oklch(0.88_0.04_145)]/20">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic">
                    "Wenn ich verstehe, warum mein Angehöriger so reagiert, kann ich anders damit umgehen. Nicht besser oder schlechter – anders. Und das macht einen riesigen Unterschied."
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">— Eine Angehörige</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Was ist Borderline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-[oklch(0.65_0.08_145)]" />
                Was ist Borderline?
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die durch intensive Emotionen, instabile Beziehungen und ein schwankendes Selbstbild gekennzeichnet ist. Menschen mit Borderline erleben Gefühle oft viel intensiver als andere – sowohl positive als auch negative.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stellen Sie sich vor, Sie hätten keine "Haut" für Ihre Emotionen. Jedes Gefühl trifft Sie mit voller Wucht, ohne Puffer. Das ist die Realität vieler Menschen mit Borderline.
                </p>
              </div>
            </motion.div>

            {/* Kernsymptome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Die Kernsymptome
              </h2>
              
              <div className="grid gap-4">
                {[
                  {
                    title: "Emotionale Instabilität",
                    description: "Schnelle, intensive Stimmungswechsel, die von aussen oft nicht nachvollziehbar erscheinen."
                  },
                  {
                    title: "Verlassensangst",
                    description: "Intensive Angst vor Zurückweisung oder Verlassenwerden, die zu verzweifelten Versuchen führen kann, dies zu verhindern."
                  },
                  {
                    title: "Instabiles Selbstbild",
                    description: "Unsicherheit darüber, wer man ist, was man will und welche Werte man hat."
                  },
                  {
                    title: "Schwarz-Weiss-Denken",
                    description: "Die Tendenz, Menschen und Situationen als entweder 'ganz gut' oder 'ganz schlecht' zu sehen."
                  },
                  {
                    title: "Impulsivität",
                    description: "Handlungen ohne Nachdenken über die Konsequenzen, oft in Bereichen wie Geldausgaben, Essen oder Beziehungen."
                  },
                  {
                    title: "Selbstverletzendes Verhalten",
                    description: "Handlungen, die dem eigenen Körper schaden, oft als Versuch, intensive Emotionen zu regulieren."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Warum ist das wichtig */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-[oklch(0.60_0.15_85)]" />
                Warum ist dieses Wissen wichtig?
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen nicht gegen Sie gerichtet ist, sondern Ausdruck einer Erkrankung, können Sie anders reagieren. Sie können:
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    "Verhalten von Person trennen – und weniger persönlich nehmen",
                    "Muster erkennen – und früher deeskalieren",
                    "Mitgefühl entwickeln – ohne sich selbst aufzugeben",
                    "Realistische Erwartungen haben – an sich und an Ihren Angehörigen"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.08_145)] mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Hoffnung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.88_0.04_145)]/30 border-[oklch(0.65_0.08_145)]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-[oklch(0.65_0.08_145)] flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        Genesung ist möglich
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Die Forschung zeigt: Mit der richtigen Behandlung können die meisten Menschen mit Borderline eine deutliche Verbesserung erleben. Nach 10 Jahren erfüllen etwa 85% der Betroffenen nicht mehr die diagnostischen Kriterien.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quelle: Zanarini et al. (2012), Journal of Personality Disorders
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6">
                Jetzt, da Sie die Grundlagen verstehen, erfahren Sie, wie Sie konkret unterstützen können.
              </p>
              <Link href="/unterstuetzen">
                <Button size="lg" className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter zu: Unterstützen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
