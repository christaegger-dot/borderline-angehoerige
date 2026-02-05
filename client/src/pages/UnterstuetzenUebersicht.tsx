import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, ArrowRight, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenUebersicht() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.85_0.08_55)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/unterstuetzen" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.08_55)] flex items-center justify-center">
                <Compass className="w-6 h-6 text-[oklch(0.45_0.12_55)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.12_55)]">Lesezeit: 4 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Wie kann ich helfen?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Als Angehöriger wollen Sie helfen – das ist natürlich und verständlich. Aber wie? Hier erfahren Sie, welche Rolle Sie einnehmen können und wo die Grenzen liegen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Leuchtturm Metapher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.85_0.08_55)]/20 border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🏠</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        Die Leuchtturm-Metapher
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Stellen Sie sich vor, Sie sind ein Leuchtturm. Sie stehen fest auf Ihrem Fundament, während die Wellen um Sie herum toben. Sie können das Meer nicht beruhigen – aber Sie können Licht geben und Orientierung bieten. Sie zeigen den Weg, ohne selbst ins Wasser zu springen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ihre Rolle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Ihre Rolle klären
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Was Sie sind */}
                <Card className="border-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      Was Sie sein können
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Ein verlässlicher Anker",
                        "Ein geduldiger Zuhörer",
                        "Ein Übungspartner für neue Skills",
                        "Ein Mensch, der Hoffnung vermittelt",
                        "Jemand, der Grenzen setzt und hält"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-[oklch(0.55_0.10_145)]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Was Sie nicht sind */}
                <Card className="border-[oklch(0.55_0.15_25)]">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-[oklch(0.55_0.15_25)]" />
                      Was nicht Ihre Rolle ist
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Der Therapeut oder die Therapeutin",
                        "Der Retter, der alles löst",
                        "Der Sündenbock für alle Probleme",
                        "Der Kontrolleur des Verhaltens",
                        "Der Verantwortliche für die Genesung"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-[oklch(0.55_0.15_25)]">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Die drei Säulen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Die drei Säulen hilfreicher Unterstützung
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "1. Präsenz",
                    description: "Da sein, ohne zu urteilen. Zuhören, ohne sofort lösen zu wollen. Ihre blosse Anwesenheit kann beruhigend wirken.",
                    example: "\"Ich bin hier. Du musst das nicht alleine durchstehen.\""
                  },
                  {
                    title: "2. Validierung",
                    description: "Die Gefühle Ihres Angehörigen anerkennen, ohne ihnen zuzustimmen oder sie zu rechtfertigen. Verstehen heisst nicht gutheissen.",
                    example: "\"Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.\""
                  },
                  {
                    title: "3. Stabilität",
                    description: "Ein verlässlicher Anker sein. Berechenbar bleiben, auch wenn alles andere schwankt. Ihre Ruhe kann ansteckend sein.",
                    example: "Klare Routinen, verlässliche Absprachen, ruhiges Auftreten in Krisen."
                  }
                ].map((pillar, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-display font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-muted-foreground mb-3">{pillar.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">Beispiel: {pillar.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Wichtiger Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.95_0.03_85)] border-[oklch(0.60_0.10_85)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-[oklch(0.60_0.10_85)] flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        Denken Sie daran
                      </h3>
                      <p className="text-muted-foreground">
                        Unterstützen heisst nicht, sich selbst aufzugeben. Sie können nur dann ein guter Leuchtturm sein, wenn Ihr eigenes Fundament stabil ist. Achten Sie auf Ihre eigenen Grenzen und Bedürfnisse.
                      </p>
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
              <Link href="/unterstuetzen">
                <Button variant="ghost">
                  ← Übersicht
                </Button>
              </Link>
              <Link href="/unterstuetzen/alltag">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: Im Alltag unterstützen
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
