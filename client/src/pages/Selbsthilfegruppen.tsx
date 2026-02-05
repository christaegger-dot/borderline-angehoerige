import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, ExternalLink, Phone, Mail, MapPin, Heart, Globe, Calendar } from "lucide-react";

export default function Selbsthilfegruppen() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.05_145)]/50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.12_145)] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Selbsthilfegruppen & Netzwerke
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sie sind nicht allein. In der Schweiz gibt es verschiedene Angebote für Angehörige von Menschen 
              mit psychischen Erkrankungen – von Selbsthilfegruppen bis zu professioneller Beratung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Stand by You */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-[oklch(0.55_0.12_145)]/30 bg-[oklch(0.96_0.02_145)]/30 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[oklch(0.55_0.12_145)] flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
                        Stand by You Schweiz
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Ehemals VASK (Vereinigung Angehöriger von Schizophrenie/Psychisch-Kranken)
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Stand by You macht Angehörige und Vertraute von Menschen mit psychischen Erkrankungen 
                    in der Schweiz sicht-, hör- und spürbar. Die Organisation bietet Beratung, Kurse und 
                    vernetzt Angehörige untereinander.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[oklch(0.55_0.12_145)]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Beratungstelefon</p>
                        <a href="tel:0800840400" className="font-medium text-foreground hover:text-[oklch(0.55_0.12_145)]">
                          0800 840 400
                        </a>
                        <p className="text-xs text-muted-foreground">(kostenlos)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[oklch(0.55_0.12_145)]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a 
                          href="https://www.stand-by-you.ch" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-[oklch(0.55_0.12_145)]"
                        >
                          www.stand-by-you.ch
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Angebote von Stand by You:</h3>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.12_145)]">•</span>
                        Kostenlose telefonische Beratung für Angehörige
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.12_145)]">•</span>
                        Angehörigenkurse (z.B. "Wegweiser"-Kurs)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.12_145)]">•</span>
                        Podcast "Mal Mut, mal Wut" mit Erfahrungsberichten
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.12_145)]">•</span>
                        Vernetzung mit anderen Angehörigen
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Selbsthilfe Schweiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Selbsthilfegruppen für Borderline-Angehörige
              </h2>
              
              <Card className="border-border/50 mb-6">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <strong>Selbsthilfe Schweiz</strong> koordiniert Selbsthilfegruppen in der ganzen Schweiz. 
                    Über die Datenbank können Sie Gruppen speziell für Angehörige von Menschen mit Borderline finden.
                  </p>
                  <a 
                    href="https://www.selbsthilfeschweiz.ch/shch/de/selbsthilfeangebote/themenliste~thema~Borderline~.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Selbsthilfegruppen suchen
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {/* Zürich */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_55)] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[oklch(0.55_0.12_55)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Raum Zürich</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Selbsthilfegruppe für Angehörige von Menschen mit Borderline
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a 
                            href="https://www.selbsthilfeschweiz.ch" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" size="sm" className="gap-1 text-xs">
                              <ExternalLink className="w-3 h-3" />
                              Selbsthilfe Zürich
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Winterthur */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_55)] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[oklch(0.55_0.12_55)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Winterthur / Schaffhausen</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Selbsthilfegruppe Borderline-Angehörige
                        </p>
                        <a 
                          href="https://www.selbsthilfe-winterthur-schaffhausen.ch/shwin/de/selbsthilfe-gesucht/gruppenliste~thema~Borderline~.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-1 text-xs">
                            <ExternalLink className="w-3 h-3" />
                            Selbsthilfe Winterthur
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bern */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_55)] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[oklch(0.55_0.12_55)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">Raum Bern</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Selbsthilfegruppe für Angehörige von Menschen mit Borderline
                        </p>
                        <a 
                          href="https://www.selbsthilfe-be.ch/shbe/de/gruppen-finden/themenliste-a-z~thema~Borderline~.html" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-1 text-xs">
                            <ExternalLink className="w-3 h-3" />
                            Selbsthilfe Bern
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/50 mt-6 bg-muted/30">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-[oklch(0.55_0.12_145)]" />
                    <p className="font-medium text-foreground">Keine Gruppe in Ihrer Nähe?</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Rufen Sie die Infoline von Selbsthilfe Schweiz an – sie helfen Ihnen, eine passende 
                    Gruppe zu finden oder eine neue zu gründen.
                  </p>
                  <a href="tel:0848339900" className="font-bold text-[oklch(0.55_0.12_145)] hover:underline">
                    0848 33 99 00
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weitere Organisationen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Weitere Anlaufstellen
              </h2>
              
              <div className="space-y-4">
                {/* Pro Mente Sana */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Pro Mente Sana</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Beratung für psychisch Betroffene und Angehörige. Kostenlose Telefonberatung 
                          und E-Mail-Beratung.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <a href="tel:0848800858" className="text-[oklch(0.55_0.12_145)] hover:underline font-medium">
                            0848 800 858
                          </a>
                          <a 
                            href="https://www.promentesana.ch" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            www.promentesana.ch
                          </a>
                        </div>
                      </div>
                      <a 
                        href="https://www.promentesana.ch" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Equilibrium */}
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Equilibrium</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Verein zur Bewältigung von Depressionen. Bietet auch Unterstützung für 
                          Angehörige von Menschen mit Depressionen.
                        </p>
                        <a 
                          href="https://www.depressionen.ch" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          www.depressionen.ch
                        </a>
                      </div>
                      <a 
                        href="https://www.depressionen.ch" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Fachstelle Angehörigenarbeit PUK */}
                <Card className="border-[oklch(0.55_0.12_145)]/30 bg-[oklch(0.96_0.02_145)]/20">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Fachstelle Angehörigenarbeit PUK Zürich
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Kostenlose, vertrauliche Beratung für Angehörige von psychisch erkrankten 
                          Menschen im Kanton Zürich.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <a href="tel:+41583843800" className="text-[oklch(0.55_0.12_145)] hover:underline font-medium">
                            058 384 38 00
                          </a>
                          <a 
                            href="mailto:angehoerigenarbeit@pukzh.ch"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            angehoerigenarbeit@pukzh.ch
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Online-Angebote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Online-Angebote
              </h2>
              
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Podcast: "Mal Mut, mal Wut"</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Der Podcast von Stand by You Schweiz gibt Angehörigen eine Stimme. 
                        Erfahrungsberichte, Expertengespräche und praktische Tipps.
                      </p>
                      <a 
                        href="https://www.stand-by-you.ch" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[oklch(0.55_0.12_145)] hover:underline"
                      >
                        Zum Podcast →
                      </a>
                    </div>
                    
                    <div className="border-t border-border/50 pt-4">
                      <h3 className="font-semibold text-foreground mb-2">Online-Foren und Communities</h3>
                      <p className="text-muted-foreground text-sm">
                        Auf der Website von Selbsthilfe Schweiz finden Sie auch Online-Selbsthilfegruppen, 
                        die sich regelmässig per Video treffen – ideal, wenn keine Gruppe in Ihrer Nähe ist.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[oklch(0.95_0.03_55)] border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Warum Selbsthilfe?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In einer Selbsthilfegruppe treffen Sie Menschen, die ähnliche Erfahrungen machen. 
                    Der Austausch kann entlasten, neue Perspektiven eröffnen und das Gefühl geben, 
                    nicht allein zu sein. Selbsthilfe ersetzt keine professionelle Beratung, kann 
                    diese aber sinnvoll ergänzen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
