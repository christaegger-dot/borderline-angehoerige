import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, AlertTriangle, ExternalLink, Clock, MapPin, Baby, User, Users, ChevronDown, Shield, Heart, Hand, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Notfall() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.08_25)]/50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.20_25)] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Notfall & Krisenressourcen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hier finden Sie wichtige Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-6 bg-[oklch(0.55_0.20_25)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <AlertTriangle className="w-6 h-6" />
              <p className="font-semibold">
                Bei akuter Lebensgefahr: Sofort Notruf wählen!
              </p>
            </div>
            <a href="tel:144">
              <Button size="lg" className="bg-white text-[oklch(0.55_0.20_25)] hover:bg-white/90 font-bold">
                <Phone className="w-5 h-5 mr-2" />
                144 anrufen
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Sofort-Hilfe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Sofort-Hilfe (24/7)
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Sanitätsnotruf",
                    number: "144",
                    description: "Bei akuter Lebensgefahr, Selbstverletzung oder Suizidversuch",
                    color: "oklch(0.55 0.20 25)"
                  },
                  {
                    name: "Die Dargebotene Hand",
                    number: "143",
                    description: "Telefonseelsorge, 24 Stunden erreichbar, anonym und kostenlos",
                    color: "oklch(0.55 0.15 145)"
                  },
                  {
                    name: "Polizei",
                    number: "117",
                    description: "Bei Gewalt oder wenn Sie sich bedroht fühlen",
                    color: "oklch(0.45 0.05 250)"
                  }
                ].map((item, index) => (
                  <Card key={index} style={{ borderColor: item.color }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                        <a href={`tel:${item.number}`}>
                          <Button 
                            size="lg" 
                            className="font-bold text-lg"
                            style={{ backgroundColor: item.color }}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {item.number}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Psychiatrische Notdienste Kanton Zürich */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Psychiatrische Notdienste Kanton Zürich
              </h2>
              
              <Card className="border-border/50 mb-6">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Die <strong>Psychiatrische Universitätsklinik Zürich (PUK)</strong> bietet rund um die Uhr psychiatrische Notfalldienste für alle Altersgruppen.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Standort: Lenggstrasse 31, 8032 Zürich
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {/* Kinder und Jugendliche */}
                <Card className="border-l-4 border-[oklch(0.60_0.15_200)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_200)] flex items-center justify-center flex-shrink-0">
                        <Baby className="w-6 h-6 text-[oklch(0.50_0.15_200)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground mb-1">Kinder und Jugendliche</h3>
                        <p className="text-muted-foreground text-sm mb-3">Kinder- und Jugendpsychiatrie der PUK Zürich (bis 18 Jahre)</p>
                        <a href="tel:+41583846666">
                          <Button 
                            size="lg" 
                            className="font-bold bg-[oklch(0.50_0.15_200)] hover:bg-[oklch(0.45_0.15_200)]"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            058 384 66 66
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Erwachsene */}
                <Card className="border-l-4 border-[oklch(0.55_0.15_145)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_145)] flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[oklch(0.45_0.12_145)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground mb-1">Erwachsene</h3>
                        <p className="text-muted-foreground text-sm mb-3">Psychiatrische Notaufnahme für Erwachsene (ab 18 Jahren)</p>
                        <a href="tel:+41583842000">
                          <Button 
                            size="lg" 
                            className="font-bold bg-[oklch(0.45_0.12_145)] hover:bg-[oklch(0.40_0.12_145)]"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            058 384 20 00
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Senioren */}
                <Card className="border-l-4 border-[oklch(0.55_0.12_55)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_55)] flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-[oklch(0.50_0.12_55)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground mb-1">Senioren</h3>
                        <p className="text-muted-foreground text-sm mb-3">Alterspsychiatrie der PUK Zürich (ab 65 Jahren)</p>
                        <a href="tel:+41583844682">
                          <Button 
                            size="lg" 
                            className="font-bold bg-[oklch(0.50_0.12_55)] hover:bg-[oklch(0.45_0.12_55)]"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            058 384 46 82
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kriseninterventionszentrum */}
                <Card className="border-l-4 border-[oklch(0.50_0.10_280)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.04_280)] flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-[oklch(0.45_0.10_280)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground mb-1">Kriseninterventionszentrum (KIZ)</h3>
                        <p className="text-muted-foreground text-sm mb-3">Für akute psychiatrische Krisen bei Erwachsenen</p>
                        <a href="tel:+41583846500">
                          <Button 
                            size="lg" 
                            className="font-bold bg-[oklch(0.45_0.10_280)] hover:bg-[oklch(0.40_0.10_280)]"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            058 384 65 00
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weitere wichtige Nummern */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <h3 className="font-display font-semibold text-foreground mb-4">Weitere wichtige Nummern</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Ärztefon Zürich</p>
                          <p className="text-sm text-muted-foreground">Hausbesuche durch Notfall-Psychiater</p>
                        </div>
                        <a href="tel:0800336655" className="font-bold text-[oklch(0.55_0.15_145)] hover:underline">
                          0800 33 66 55
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">PUK Zentrale</p>
                          <p className="text-sm text-muted-foreground">Allgemeine Anfragen</p>
                        </div>
                        <a href="tel:+41583842111" className="font-bold text-[oklch(0.55_0.15_145)] hover:underline">
                          058 384 21 11
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            {/* Online-Ressourcen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Online-Ressourcen & Beratung
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Pro Mente Sana",
                    url: "https://www.promentesana.ch",
                    description: "Beratung für psychisch Betroffene und Angehörige"
                  },
                  {
                    name: "Stand by You",
                    url: "https://www.stand-by-you.ch",
                    description: "Netzwerk für Angehörige von Menschen mit psychischen Erkrankungen"
                  },
                  {
                    name: "Equilibrium",
                    url: "https://www.depressionen.ch",
                    description: "Verein zur Bewältigung von Depressionen"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:border-[oklch(0.65_0.12_55)] transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Website
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Krisenszenarien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Was tun in konkreten Krisensituationen?
              </h2>
              <p className="text-muted-foreground mb-6">
                Klicken Sie auf eine Situation für konkrete Schritt-für-Schritt-Anleitungen.
              </p>
              
              <Accordion type="single" collapsible className="space-y-4">
                {/* Suiziddrohung */}
                <AccordionItem value="suizid" className="border rounded-lg border-[oklch(0.55_0.20_25)] bg-[oklch(0.98_0.02_25)]">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.55_0.20_25)] flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">Suiziddrohung oder -gedanken</h3>
                        <p className="text-sm text-muted-foreground font-normal">«Ich will nicht mehr leben», «Ohne mich wärt ihr besser dran»</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-[oklch(0.55_0.20_25)]/10 rounded-lg border border-[oklch(0.55_0.20_25)]/30">
                        <p className="font-semibold text-[oklch(0.45_0.15_25)] mb-2">Wichtig zu wissen:</p>
                        <p className="text-sm text-muted-foreground">Suiziddrohungen bei Borderline sind ernst zu nehmen, aber nicht immer ein akuter Notfall. Unterscheiden Sie zwischen chronischer Suizidalität (wiederkehrende Gedanken) und akuter Krise (konkrete Pläne, Mittel vorhanden).</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.20_25)] text-white text-sm flex items-center justify-center">1</span>
                          Ruhe bewahren und zuhören
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Nehmen Sie die Äusserung ernst, ohne in Panik zu geraten</li>
                          <li>• Fragen Sie direkt: «Hast du konkrete Pläne, dir etwas anzutun?»</li>
                          <li>• Hören Sie zu, ohne zu urteilen oder zu beschwichtigen</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.20_25)] text-white text-sm flex items-center justify-center">2</span>
                          Risiko einschätzen
                        </h4>
                        <div className="ml-8 grid sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-[oklch(0.55_0.20_25)]/5 rounded-lg">
                            <p className="font-medium text-[oklch(0.45_0.15_25)] text-sm mb-1">Hohes Risiko → Notruf 144</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• Konkrete Pläne vorhanden</li>
                              <li>• Mittel beschafft (Medikamente, etc.)</li>
                              <li>• Früherer Suizidversuch</li>
                              <li>• Abschiedsbriefe geschrieben</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-[oklch(0.55_0.10_145)]/10 rounded-lg">
                            <p className="font-medium text-[oklch(0.45_0.10_145)] text-sm mb-1">Moderates Risiko → Fachperson</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• Gedanken, aber keine Pläne</li>
                              <li>• Kann Gründe zum Leben nennen</li>
                              <li>• Ist ansprechbar und kooperativ</li>
                              <li>• Hat Therapeut/Psychiater</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.20_25)] text-white text-sm flex items-center justify-center">3</span>
                          Handeln
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Bei hohem Risiko:</strong> Notruf 144 oder Polizei 117 – auch gegen den Willen der Person</li>
                          <li>• <strong>Bei moderatem Risiko:</strong> Therapeut/Psychiater kontaktieren, Krisenplan aktivieren</li>
                          <li>• Bleiben Sie bei der Person, bis professionelle Hilfe da ist</li>
                          <li>• Entfernen Sie wenn möglich Zugang zu Mitteln (Medikamente, scharfe Gegenstände)</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[oklch(0.88_0.04_145)]/30 rounded-lg border border-[oklch(0.55_0.10_145)]/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Validieren Sie das Leid, nicht die Lösung:</strong> «Ich höre, dass du gerade unglaublich leidest. Ich bin froh, dass du mir das sagst. Lass uns gemeinsam schauen, wie wir durch diese Nacht kommen.»
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Selbstverletzung */}
                <AccordionItem value="selbstverletzung" className="border rounded-lg border-[oklch(0.55_0.15_35)] bg-[oklch(0.98_0.02_35)]">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.55_0.15_35)] flex items-center justify-center flex-shrink-0">
                        <Hand className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">Selbstverletzung (Ritzen, Brennen, Schlagen)</h3>
                        <p className="text-sm text-muted-foreground font-normal">Akute Selbstverletzung oder Entdeckung von Verletzungen</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-[oklch(0.55_0.15_35)]/10 rounded-lg border border-[oklch(0.55_0.15_35)]/30">
                        <p className="font-semibold text-[oklch(0.45_0.12_35)] mb-2">Wichtig zu verstehen:</p>
                        <p className="text-sm text-muted-foreground">Selbstverletzung ist meist <strong>kein</strong> Suizidversuch, sondern ein Versuch, unerträgliche emotionale Schmerzen zu regulieren. Sie dient oft dazu, Spannung abzubauen oder «wieder etwas zu fühlen».</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.15_35)] text-white text-sm flex items-center justify-center">1</span>
                          Sofortmassnahmen
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Bei starker Blutung oder tiefen Wunden:</strong> Notruf 144</li>
                          <li>• Bei oberflächlichen Verletzungen: Wunde versorgen (reinigen, desinfizieren, verbinden)</li>
                          <li>• Ruhig bleiben – Ihre Panik verstärkt die Scham</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.15_35)] text-white text-sm flex items-center justify-center">2</span>
                          Kommunikation
                        </h4>
                        <div className="ml-8 grid sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-[oklch(0.55_0.10_145)]/10 rounded-lg">
                            <p className="font-medium text-[oklch(0.45_0.10_145)] text-sm mb-1">✓ Hilfreich</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• «Ich sehe, dass du leidest.»</li>
                              <li>• «Wie kann ich dir jetzt helfen?»</li>
                              <li>• «Lass uns die Wunde versorgen.»</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-[oklch(0.55_0.15_25)]/10 rounded-lg">
                            <p className="font-medium text-[oklch(0.45_0.12_25)] text-sm mb-1">✗ Vermeiden</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• «Warum tust du dir das an?»</li>
                              <li>• «Das ist doch Erpressung!»</li>
                              <li>• «Denk doch mal an uns!»</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.15_35)] text-white text-sm flex items-center justify-center">3</span>
                          Nachsorge
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Therapeut/Psychiater zeitnah informieren</li>
                          <li>• Gemeinsam über Alternativen sprechen (Eiswürfel, rote Farbe, Sport)</li>
                          <li>• Nicht überwachen oder kontrollieren – das verstärkt Heimlichkeit</li>
                          <li>• Eigene Gefühle mit Fachperson besprechen</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Aggressive Eskalation */}
                <AccordionItem value="aggression" className="border rounded-lg border-[oklch(0.50_0.15_280)] bg-[oklch(0.98_0.02_280)]">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.50_0.15_280)] flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">Aggressive Eskalation</h3>
                        <p className="text-sm text-muted-foreground font-normal">Schreien, Drohen, Werfen von Gegenständen, körperliche Gewalt</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-[oklch(0.55_0.20_25)]/10 rounded-lg border border-[oklch(0.55_0.20_25)]/30">
                        <p className="font-semibold text-[oklch(0.45_0.15_25)] mb-2">Ihre Sicherheit geht vor!</p>
                        <p className="text-sm text-muted-foreground">Bei körperlicher Gewalt oder konkreten Drohungen: Verlassen Sie die Situation und rufen Sie die Polizei (117). Borderline erklärt Verhalten, entschuldigt es aber nicht.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.50_0.15_280)] text-white text-sm flex items-center justify-center">1</span>
                          Deeskalieren (wenn sicher)
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Ruhig und langsam sprechen, Stimme senken</li>
                          <li>• Abstand halten, nicht in die Enge treiben</li>
                          <li>• Blickkontakt halten, aber nicht starren</li>
                          <li>• Offene Körperhaltung, Hände sichtbar</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.50_0.15_280)] text-white text-sm flex items-center justify-center">2</span>
                          Kommunikation
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Validieren: «Ich sehe, dass du gerade extrem wütend bist.»</li>
                          <li>• Grenze setzen: «Ich möchte dir zuhören, aber nicht wenn du schreist.»</li>
                          <li>• Option geben: «Sollen wir 10 Minuten Pause machen?»</li>
                          <li>• Nicht argumentieren, rechtfertigen oder beschuldigen</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.50_0.15_280)] text-white text-sm flex items-center justify-center">3</span>
                          Wenn Deeskalation nicht funktioniert
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Ankündigen:</strong> «Ich gehe jetzt in ein anderes Zimmer. Wir können später weiterreden.»</li>
                          <li>• <strong>Gehen:</strong> Raum verlassen, Tür nicht abschliessen</li>
                          <li>• <strong>Bei Gewalt:</strong> Haus verlassen, Polizei 117 rufen</li>
                          <li>• <strong>Später:</strong> Im ruhigen Moment über Konsequenzen sprechen</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[oklch(0.88_0.04_145)]/30 rounded-lg border border-[oklch(0.55_0.10_145)]/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Merke:</strong> Sie müssen sich nicht anschreien oder bedrohen lassen. Das Verlassen einer eskalierenden Situation ist keine Bestrafung, sondern Selbstschutz und gibt beiden Zeit zur Regulation.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Emotionale Erpressung */}
                <AccordionItem value="erpressung" className="border rounded-lg border-[oklch(0.55_0.10_85)] bg-[oklch(0.98_0.02_85)]">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.55_0.10_85)] flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">Emotionale Erpressung / Manipulation</h3>
                        <p className="text-sm text-muted-foreground font-normal">«Wenn du gehst, bringe ich mich um», «Du bist schuld, dass es mir so geht»</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-[oklch(0.55_0.10_85)]/10 rounded-lg border border-[oklch(0.55_0.10_85)]/30">
                        <p className="font-semibold text-[oklch(0.45_0.08_85)] mb-2">Wichtig zu verstehen:</p>
                        <p className="text-sm text-muted-foreground">Menschen mit Borderline manipulieren selten bewusst. Hinter solchen Äusserungen steckt meist extreme Verlassensangst und die verzweifelte Überzeugung, dass sie ohne Sie nicht überleben können.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_85)] text-white text-sm flex items-center justify-center">1</span>
                          Das Gefühl validieren, nicht die Forderung
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• «Ich höre, dass du gerade panische Angst hast, mich zu verlieren.»</li>
                          <li>• «Deine Angst ist real und ich nehme sie ernst.»</li>
                          <li>• <strong>Aber:</strong> «Ich kann nicht bleiben, weil du mir drohst.»</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_85)] text-white text-sm flex items-center justify-center">2</span>
                          Klare Grenze setzen
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• «Ich bin nicht verantwortlich für deine Entscheidungen.»</li>
                          <li>• «Wenn du sagst, du bringst dich um, muss ich den Notruf rufen.»</li>
                          <li>• «Ich liebe dich, aber ich lasse mich nicht erpressen.»</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_85)] text-white text-sm flex items-center justify-center">3</span>
                          Konsequent handeln
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Bei Suiziddrohung: Notruf 144 oder 143 – jedes Mal</li>
                          <li>• Nicht nachgeben, um «Ruhe zu haben» – das verstärkt das Muster</li>
                          <li>• Später im ruhigen Moment besprechen, was passiert ist</li>
                          <li>• Eigene Therapie/Beratung in Anspruch nehmen</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-[oklch(0.88_0.04_145)]/30 rounded-lg border border-[oklch(0.55_0.10_145)]/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Denken Sie daran:</strong> Sie können die Angst Ihres Angehörigen nicht wegnehmen, indem Sie Ihre eigenen Bedürfnisse aufgeben. Langfristig hilft nur, dass Ihr Angehöriger lernt, mit der Angst umzugehen – nicht, dass Sie sie vermeiden.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Krisenplan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Persönlicher Krisenplan
              </h2>
              
              <Card className="bg-[oklch(0.88_0.04_145)]/20 border-[oklch(0.65_0.08_145)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Erstellen Sie gemeinsam mit Ihrem Angehörigen einen persönlichen Krisenplan. Dieser sollte enthalten:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Frühwarnzeichen einer Krise",
                      "Strategien, die in der Vergangenheit geholfen haben",
                      "Wichtige Telefonnummern (Therapeut, Arzt, Vertrauensperson)",
                      "Medikamenteninformationen",
                      "Was Sie als Angehöriger tun können – und was nicht"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-[oklch(0.55_0.10_145)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
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
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Diese Seite ersetzt keine professionelle Beratung. Bei akuten Krisen wenden Sie sich bitte immer an die Notfallnummern oder den psychiatrischen Notdienst.
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
