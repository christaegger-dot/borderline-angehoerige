import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, ExternalLink, Phone, Mail, MapPin, Heart, Globe, Calendar, Headphones, MessageCircle } from "lucide-react";
import { kontaktById, emailById, urlById } from "@/data/kontakte";

const selbsthilfeCH = kontaktById("INFO_SELBSTHILFE_CH")!;
const selbsthilfeInfo = kontaktById("INFO_SELBSTHILFE_INFO")!;
const proMente = kontaktById("INFO_PROMENTE")!;
const fachstelle = kontaktById("INFO_FACHSTELLE")!;
const emailAngehoerigen = emailById("EMAIL_ANGEHOERIGEN")!;
const urlStandByYou = urlById("URL_STANDBYYOU")!;
const urlSelbsthilfe = urlById("URL_SELBSTHILFE_CH")!;
const urlProMente = urlById("URL_PROMENTE")!;
const urlDepress = urlById("URL_DEPRESS")!;

export default function Selbsthilfegruppen() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-lighter/50 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-mid flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
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
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Stand by You – immer offen als Hauptanlaufstelle */}
            <ContentSection
              title="Stand by You Schweiz"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="stand-by-you"
              defaultOpen={true}
              preview="Die zentrale Anlaufstelle für Angehörige von Menschen mit psychischen Erkrankungen in der Schweiz."
            >
              <Card className="border-sage-mid/30 bg-sage-wash/30 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Ehemals VASK (Vereinigung Angehöriger von Schizophrenie/Psychisch-Kranken)
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Stand by You macht Angehörige und Vertraute von Menschen mit psychischen Erkrankungen 
                    in der Schweiz sicht-, hör- und spürbar. Die Organisation bietet Beratung, Kurse und 
                    vernetzt Angehörige untereinander.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sage-mid" />
                      <div>
                        <p className="text-sm text-muted-foreground">Beratungstelefon</p>
                        <a href={`tel:${selbsthilfeCH.tel}`} className="font-medium text-foreground hover:text-sage-mid">
                          {selbsthilfeCH.nummer}
                        </a>
                        <p className="text-xs text-muted-foreground">(kostenlos)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-sage-mid" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a 
                          href="https://www.stand-by-you.ch" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-sage-mid"
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
                        <span className="text-sage-mid">•</span>
                        Kostenlose telefonische Beratung für Angehörige
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Angehörigenkurse (z.B. "Wegweiser"-Kurs)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Podcast "Mal Mut, mal Wut" mit Erfahrungsberichten
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Vernetzung mit anderen Angehörigen
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Selbsthilfegruppen nach Region */}
            <ContentSection
              title="Selbsthilfegruppen für Borderline-Angehörige"
              icon={<MapPin className="w-7 h-7 text-terracotta-mid" />}
              id="selbsthilfegruppen"
              preview="Selbsthilfe Schweiz koordiniert Gruppen in der ganzen Schweiz – finden Sie eine Gruppe in Ihrer Nähe."
            >
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
                      <div className="w-10 h-10 rounded-lg bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-terracotta-mid" />
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
                      <div className="w-10 h-10 rounded-lg bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-terracotta-mid" />
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
                      <div className="w-10 h-10 rounded-lg bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-terracotta-mid" />
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
                    <Phone className="w-5 h-5 text-sage-mid" />
                    <p className="font-medium text-foreground">Keine Gruppe in Ihrer Nähe?</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Rufen Sie die Infoline von Selbsthilfe Schweiz an – sie helfen Ihnen, eine passende 
                    Gruppe zu finden oder eine neue zu gründen.
                  </p>
                  <a href={`tel:${selbsthilfeInfo.tel}`} className="font-bold text-sage-mid hover:underline">
                    {selbsthilfeInfo.nummer}
                  </a>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Weitere Organisationen */}
            <ContentSection
              title="Weitere Anlaufstellen"
              icon={<Globe className="w-7 h-7 text-slate-blue" />}
              id="weitere-anlaufstellen"
              preview="Pro Mente Sana, Equilibrium und die Fachstelle Angehörigenarbeit PUK Zürich bieten zusätzliche Unterstützung."
            >
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
                          <a href={`tel:${proMente.tel}`} className="text-sage-mid hover:underline font-medium">
                            {proMente.nummer}
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
                <Card className="border-sage-mid/30 bg-sage-wash/20">
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
                          <a href={`tel:${fachstelle.tel}`} className="text-sage-mid hover:underline font-medium">
                            {fachstelle.nummer}
                          </a>
                          <a 
                            href={`mailto:${emailAngehoerigen.adresse}`}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {emailAngehoerigen.adresse}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Online-Angebote */}
            <ContentSection
              title="Online-Angebote"
              icon={<Headphones className="w-7 h-7 text-terracotta" />}
              id="online-angebote"
              preview="Podcast, Online-Foren und virtuelle Selbsthilfegruppen – Unterstützung von überall."
            >
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
                        className="text-sm text-sage-mid hover:underline"
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
            </ContentSection>

            {/* Hinweis – bleibt als motion.div (Abschluss-Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-terracotta-wash border-terracotta">
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
