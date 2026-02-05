import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Stethoscope, ArrowRight, CheckCircle2, Brain, Heart, RefreshCw, Lightbulb, Download, Image, MapPin, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenTherapie() {
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
            <Link href="/unterstuetzen" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.90_0.03_250)] flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-[oklch(0.45_0.05_250)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.05_250)]">Lesezeit: 10 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Therapie begleiten
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Professionelle Therapie ist der wichtigste Baustein der Genesung. Sie können diesen Prozess unterstützen – ohne selbst zum Therapeuten zu werden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Wirksame Therapien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-[oklch(0.45_0.05_250)]" />
                Wirksame Therapieformen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Es gibt mehrere evidenzbasierte Therapien für Borderline. Die bekannteste und am besten erforschte ist die DBT (Dialektisch-Behaviorale Therapie).
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    name: "DBT (Dialektisch-Behaviorale Therapie)",
                    description: "Kombiniert Verhaltenstherapie mit Achtsamkeit. Vermittelt konkrete Skills zur Emotionsregulation.",
                    highlight: "Goldstandard"
                  },
                  {
                    name: "MBT (Mentalisierungsbasierte Therapie)",
                    description: "Fokussiert auf das Verstehen eigener und fremder Gedanken und Gefühle.",
                    highlight: "Evidenzbasiert"
                  },
                  {
                    name: "Schematherapie",
                    description: "Arbeitet mit frühen Prägungen und Beziehungsmustern.",
                    highlight: "Evidenzbasiert"
                  }
                ].map((therapy, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-2">{therapy.name}</h3>
                          <p className="text-muted-foreground text-sm">{therapy.description}</p>
                        </div>
                        <span className="text-xs bg-[oklch(0.88_0.04_145)] text-[oklch(0.40_0.08_145)] px-2 py-1 rounded-full whitespace-nowrap">
                          {therapy.highlight}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Link zu Therapieangeboten */}
              <Card className="mt-6 bg-[oklch(0.92_0.04_145)] border-[oklch(0.80_0.08_145)]">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.88_0.05_145)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[oklch(0.45_0.10_145)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Therapieangebote im Kanton Zürich
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Übersicht über spezialisierte DBT-Stationen und Behandlungsangebote der PUK Zürich – für Kinder, Jugendliche, Erwachsene und Senioren.
                      </p>
                      <Link href="/therapieangebote">
                        <Button size="sm" variant="outline" className="border-[oklch(0.70_0.08_145)] hover:bg-[oklch(0.88_0.05_145)]">
                          Therapieangebote ansehen
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* DBT-Skills für Angehörige */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                DBT-Skills verstehen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die DBT vermittelt vier Gruppen von Skills. Wenn Sie diese kennen, können Sie Ihren Angehörigen besser unterstützen – und einige Skills auch selbst nutzen.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Achtsamkeit",
                    description: "Im Moment sein, ohne zu urteilen. Wahrnehmen, was ist.",
                    color: "oklch(0.65 0.08 145)"
                  },
                  {
                    title: "Stresstoleranz",
                    description: "Krisen überstehen, ohne sie schlimmer zu machen.",
                    color: "oklch(0.55 0.15 35)"
                  },
                  {
                    title: "Emotionsregulation",
                    description: "Gefühle verstehen und beeinflussen lernen.",
                    color: "oklch(0.65 0.12 55)"
                  },
                  {
                    title: "Zwischenmenschliche Skills",
                    description: "Beziehungen pflegen, Grenzen setzen, Konflikte lösen.",
                    color: "oklch(0.45 0.05 250)"
                  }
                ].map((skill, index) => (
                  <Card key={index} style={{ borderColor: skill.color }} className="border-2">
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">{skill.title}</h3>
                      <p className="text-muted-foreground text-sm">{skill.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-[oklch(0.85_0.08_55)]/10 border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-[oklch(0.65_0.12_55)]" />
                    So können Sie unterstützen
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Fragen Sie, welche Skills gerade geübt werden",
                      "Bieten Sie an, gemeinsam zu üben (z.B. Achtsamkeitsübungen)",
                      "Erinnern Sie sanft an Skills in angespannten Momenten",
                      "Loben Sie, wenn Skills angewendet werden"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fortschritte würdigen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Fortschritte würdigen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Genesung ist kein linearer Prozess. Kleine Fortschritte zu erkennen und zu würdigen ist wichtig – für Sie beide.
              </p>
              
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">Beispiele für Fortschritte</h3>
                  <ul className="space-y-3">
                    {[
                      "Eine Krise wurde ohne Selbstverletzung überstanden",
                      "Ein Konflikt wurde ohne Eskalation gelöst",
                      "Ein Skill wurde in einer schwierigen Situation angewendet",
                      "Ein Termin wurde trotz Angst wahrgenommen",
                      "Ein Gefühl wurde benannt statt ausagiert"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mit Rückschlägen umgehen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Mit Rückschlägen umgehen
              </h2>
              
              <Card className="border-l-4 border-l-[oklch(0.55_0.15_35)] bg-[oklch(0.95_0.03_35)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Rückschläge gehören zur Genesung. Sie sind keine Zeichen des Scheiterns, sondern Teil des Prozesses. Wenn ein Rückschlag passiert:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Vermeiden Sie Vorwürfe – weder an sich noch an Ihren Angehörigen",
                      "Erinnern Sie an bisherige Fortschritte",
                      "Fokussieren Sie auf den nächsten kleinen Schritt",
                      "Ermutigen Sie zur Rückkehr in die Therapie"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-[oklch(0.55_0.15_35)]">→</span>
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
                <Download className="w-8 h-8 text-[oklch(0.45_0.05_250)]" />
                Materialien zum Thema
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Validierungs-Stufenmodell",
                    description: "Die 6 Stufen der Validierung",
                    type: "PNG",
                    rating: "22/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xLQHqLJRQTkLMXqV.png"
                  },
                  {
                    title: "Eiertanz-Dynamik",
                    description: "Die Beziehungsdynamik verstehen",
                    type: "PNG",
                    rating: "21/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vMQZPNhJYhLgkJWc.png"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[oklch(0.90_0.03_250)] flex items-center justify-center flex-shrink-0">
                          <Image className="w-4 h-4 text-[oklch(0.45_0.05_250)]" />
                        </div>
                        <span className="text-xs bg-[oklch(0.92_0.05_145)] text-[oklch(0.40_0.08_145)] px-2 py-0.5 rounded-full">
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
                  <Button variant="link" className="text-[oklch(0.45_0.05_250)]">
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
              <Link href="/unterstuetzen/alltag">
                <Button variant="ghost">
                  ← Im Alltag unterstützen
                </Button>
              </Link>
              <Link href="/unterstuetzen/krise">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: In der Krise unterstützen
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
