import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, ExternalLink, Phone, Mail, MapPin, Heart, Globe, Headphones, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { kontaktById, emailById, urlById, adresseById } from "@/data/kontakte";

const selbsthilfeCH = kontaktById("INFO_SELBSTHILFE_CH")!;
const selbsthilfeInfo = kontaktById("INFO_SELBSTHILFE_INFO")!;
const proMente = kontaktById("INFO_PROMENTE")!;
const fachstelleTel = kontaktById("INFO_FACHSTELLE")!;
const fachstelleEmail = emailById("EMAIL_ANGEHOERIGEN")!;
const pukUrl = urlById("URL_PUK")!;

export default function Selbsthilfegruppen() {
  return (
    <Layout>
      <SEO title="Beratung & Netzwerke" description="Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige von Menschen mit Borderline in der Schweiz." path="/beratung" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-lighter/50 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-mid flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Beratung & Netzwerke
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sie müssen das nicht allein tragen. Hier finden Sie professionelle Beratung, 
              Selbsthilfegruppen und Netzwerke für Angehörige in der Schweiz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* ═══ Professionelle Beratung ═══ */}
            <ContentSection
              title="Professionelle Beratung"
              icon={<Building2 className="w-7 h-7 text-sage-darker" />}
              id="professionelle-beratung"
              defaultOpen={true}
              preview="Kostenlose Beratungsangebote für Angehörige von psychisch erkrankten Menschen."
            >
              <div className="space-y-4">
                {/* Fachstelle Angehörigenarbeit PUK */}
                <Card className="border-sage-darker/20 bg-sage-wash/40 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      Fachstelle Angehörigenarbeit (PUK Zürich)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Die Fachstelle an der Psychiatrischen Universitätsklinik Zürich bietet kostenlose, 
                      vertrauliche Beratung für Angehörige von psychisch erkrankten Menschen.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Telefon</p>
                          <a href={`tel:${fachstelleTel.tel}`} className="font-medium text-foreground hover:text-sage-mid">
                            {fachstelleTel.nummer}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">E-Mail</p>
                          <a href={`mailto:${fachstelleEmail.adresse}`} className="font-medium text-foreground hover:text-sage-mid">
                            {fachstelleEmail.adresse}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-foreground text-sm">Lenggstrasse 31, Postfach</p>
                          <p className="text-foreground text-sm">8032 Zürich</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Website</p>
                          <a href={pukUrl.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-sage-mid">
                            {pukUrl.url.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link href="/fachstelle">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-sage-mid hover:text-sage-dark transition-colors cursor-pointer">
                        Mehr über die Fachstelle erfahren
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>

                {/* Pro Mente Sana */}
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground text-lg mb-2">Pro Mente Sana</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Beratung für psychisch Betroffene und Angehörige. Kostenlose Telefonberatung 
                      und E-Mail-Beratung zu Fragen rund um psychische Gesundheit.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <a href={`tel:${proMente.tel}`} className="inline-flex items-center gap-2 text-sage-mid hover:underline font-medium">
                        <Phone className="w-4 h-4" />
                        {proMente.nummer}
                      </a>
                      <a 
                        href="https://www.promentesana.ch" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="w-4 h-4" />
                        www.promentesana.ch
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* ═══ Peer-Angebote & Netzwerke ═══ */}
            <ContentSection
              title="Peer-Angebote & Netzwerke"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="peer-angebote"
              preview="Austausch mit anderen Angehörigen – von Beratungstelefon bis Podcast."
            >
              {/* Stand by You */}
              <Card className="border-sage-mid/30 bg-sage-wash/30 overflow-hidden mb-4">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold text-foreground text-lg mb-1">Stand by You Schweiz</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ehemals VASK (Vereinigung Angehöriger von Schizophrenie/Psychisch-Kranken)
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Stand by You macht Angehörige und Vertraute von Menschen mit psychischen Erkrankungen 
                    in der Schweiz sicht-, hör- und spürbar. Die Organisation bietet Beratung, Kurse und 
                    vernetzt Angehörige untereinander.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-sage-mid flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Beratungstelefon</p>
                        <a href={`tel:${selbsthilfeCH.tel}`} className="font-medium text-foreground hover:text-sage-mid">
                          {selbsthilfeCH.nummer}
                        </a>
                        <p className="text-xs text-muted-foreground">(kostenlos)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-sage-mid flex-shrink-0" />
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
                    <h4 className="font-semibold text-foreground mb-2">Angebote:</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Kostenlose telefonische Beratung für Angehörige
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Angehörigenkurse (z.B. «Wegweiser»-Kurs)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Podcast «Mal Mut, mal Wut» mit Erfahrungsberichten
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        Vernetzung mit anderen Angehörigen
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Equilibrium */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-2">Equilibrium</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Verein zur Bewältigung von Depressionen. Bietet auch Unterstützung für 
                    Angehörige von Menschen mit Depressionen.
                  </p>
                  <a 
                    href="https://www.depressionen.ch" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Globe className="w-4 h-4" />
                    www.depressionen.ch
                  </a>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ Selbsthilfegruppen nach Region ═══ */}
            <ContentSection
              title="Selbsthilfegruppen nach Region"
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

            {/* ═══ Online-Angebote ═══ */}
            <ContentSection
              title="Online-Angebote"
              icon={<Headphones className="w-7 h-7 text-terracotta" />}
              id="online-angebote"
              preview="Online-Foren und virtuelle Selbsthilfegruppen – Unterstützung von überall."
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Online-Selbsthilfegruppen</h3>
                      <p className="text-muted-foreground text-sm">
                        Auf der Website von Selbsthilfe Schweiz finden Sie auch Online-Selbsthilfegruppen, 
                        die sich regelmässig per Video treffen – ideal, wenn keine Gruppe in Ihrer Nähe ist.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ Nächste Schritte (Abschluss-Card) ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-sage-wash/60 border-sage-mid/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Nächste Schritte</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Egal wo Sie gerade stehen – der erste Schritt ist oft der schwierigste. 
                    Hier sind drei Möglichkeiten, wie Sie heute beginnen können:
                  </p>
                  <div className="space-y-3">
                    <Link href="/fachstelle">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Building2 className="w-5 h-5 text-sage-mid flex-shrink-0" />
                        <span className="text-sm text-foreground">Kontaktieren Sie die Fachstelle Angehörigenarbeit für ein erstes Gespräch</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                    <Link href="/selbstfuersorge">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Heart className="w-5 h-5 text-terracotta-mid flex-shrink-0" />
                        <span className="text-sm text-foreground">Lernen Sie Strategien zur Selbstfürsorge kennen</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                    <Link href="/kommunizieren">
                      <span className="flex items-center gap-3 p-3 rounded-lg bg-background/60 hover:bg-background transition-colors cursor-pointer">
                        <Users className="w-5 h-5 text-slate-blue flex-shrink-0" />
                        <span className="text-sm text-foreground">Entdecken Sie Kommunikationsstrategien für den Alltag</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
