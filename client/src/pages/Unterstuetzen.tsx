import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Compass, Calendar, Stethoscope, AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

const subPages = [
  {
    href: "/unterstuetzen/uebersicht",
    icon: Compass,
    title: "Wie kann ich helfen?",
    description: "Die Grundlagen: Ihre Rolle verstehen und die Balance zwischen Unterstützen und Selbstschutz finden.",
    time: "4 Min",
    color: "oklch(0.65 0.12 55)"
  },
  {
    href: "/unterstuetzen/alltag",
    icon: Calendar,
    title: "Im Alltag unterstützen",
    description: "Stabilität bieten, emotionale Verfügbarkeit zeigen und gemeinsame Aktivitäten gestalten.",
    time: "8 Min",
    color: "oklch(0.65 0.08 145)"
  },
  {
    href: "/unterstuetzen/therapie",
    icon: Stethoscope,
    title: "Therapie begleiten",
    description: "DBT-Skills verstehen, Fortschritte würdigen und mit Rückschlägen umgehen.",
    time: "10 Min",
    color: "oklch(0.45 0.05 250)"
  },
  {
    href: "/unterstuetzen/krise",
    icon: AlertTriangle,
    title: "In der Krise unterstützen",
    description: "Krisen erkennen, deeskalieren und Sicherheit gewährleisten – ohne sich selbst zu gefährden.",
    time: "6 Min",
    color: "oklch(0.55 0.15 35)"
  }
];

export default function Unterstuetzen() {
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.08_55)] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[oklch(0.45_0.12_55)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.12_55)]">Gesamtlesezeit: 28 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Unterstützen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sie können einen wichtigen Beitrag zur Genesung leisten – nicht als Therapeut, sondern als verlässlicher, verständnisvoller Begleiter. Hier erfahren Sie, wie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Message */}
      <section className="py-8 bg-[oklch(0.99_0.008_85)]">
        <div className="container">
          <Card className="border-l-4 border-l-[oklch(0.65_0.12_55)] bg-[oklch(0.85_0.08_55)]/10">
            <CardContent className="p-6">
              <p className="text-foreground leading-relaxed text-lg">
                <strong className="text-[oklch(0.65_0.12_55)]">Die zentrale Botschaft:</strong> Unterstützen bedeutet nicht, alle Probleme zu lösen. Es bedeutet, präsent zu sein, zu validieren und Stabilität zu bieten – während Sie gleichzeitig auf sich selbst achten.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sub-Pages Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Wählen Sie ein Thema
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jedes Kapitel behandelt einen anderen Aspekt der Unterstützung. Beginnen Sie dort, wo es für Sie am relevantesten ist.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {subPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={page.href}>
                    <Card className="h-full group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-transparent hover:border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `color-mix(in oklch, ${page.color} 20%, white)` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: page.color }} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-display text-lg font-semibold text-foreground">
                                {page.title}
                              </h3>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {page.time}
                              </span>
                            </div>
                            
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {page.description}
                            </p>
                            
                            <span 
                              className="text-sm font-medium flex items-center gap-1"
                              style={{ color: page.color }}
                            >
                              Lesen
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Pillars Preview */}
      <section className="py-12 md:py-16 bg-[oklch(0.94_0.02_85)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Die drei Säulen hilfreicher Unterstützung
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diese Prinzipien ziehen sich durch alle Kapitel und bilden das Fundament Ihrer Unterstützung.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Präsenz",
                description: "Da sein, ohne zu urteilen. Zuhören, ohne sofort lösen zu wollen.",
                icon: "🏠"
              },
              {
                title: "Validierung",
                description: "Gefühle anerkennen, ohne ihnen zuzustimmen. Verstehen, ohne zu rechtfertigen.",
                icon: "💬"
              },
              {
                title: "Stabilität",
                description: "Ein verlässlicher Anker sein. Berechenbar bleiben, auch wenn alles andere schwankt.",
                icon: "⚓"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <span className="text-4xl mb-4 block">{pillar.icon}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
