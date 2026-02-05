import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Phone, 
  Mail, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Users, 
  Building2, 
  Home, 
  Calendar,
  Baby,
  User,
  UserCircle,
  CheckCircle2,
  Info,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

/*
 * Design: Warm, informativ, übersichtlich
 * Farben: Sage Green für Therapie, Terracotta für Kontakt
 * Struktur: Nach Altersgruppen und Settings gegliedert
 */

export default function Therapieangebote() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.90_0.05_145)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.05_145)] flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-[oklch(0.45_0.10_145)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.10_145)]">Kanton Zürich</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Therapieangebote bei Borderline
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Spezialisierte Behandlungsangebote der Psychiatrischen Universitätsklinik Zürich (PUK) 
              für verschiedene Altersgruppen – ambulant, teilstationär und stationär.
            </p>

            <Card className="bg-[oklch(0.95_0.03_55)] border-[oklch(0.85_0.08_55)]">
              <CardContent className="p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-[oklch(0.55_0.12_55)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Für Angehörige:</strong> Diese Übersicht hilft Ihnen, 
                  passende Behandlungsangebote für Ihren Angehörigen zu finden. Die Anmeldung erfolgt 
                  in der Regel durch Fachpersonen oder als Selbstanmeldung.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Settings-Übersicht */}
      <section className="py-8 border-b border-border/50">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Home, label: "Ambulant", desc: "Regelmässige Termine, Leben zu Hause" },
              { icon: Calendar, label: "Teilstationär", desc: "Tagesklinik, abends zu Hause" },
              { icon: Building2, label: "Stationär", desc: "Aufenthalt in der Klinik" }
            ].map((setting, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-lg">
                <setting.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <span className="font-medium text-foreground text-sm">{setting.label}</span>
                  <p className="text-xs text-muted-foreground">{setting.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinder und Jugendliche */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.90_0.08_280)] flex items-center justify-center">
                <Baby className="w-5 h-5 text-[oklch(0.50_0.15_280)]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Kinder und Jugendliche
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Spezialisierte Angebote der Kinder- und Jugendpsychiatrie der PUK Zürich für 
              Jugendliche ab 13 Jahren mit Borderline-Symptomen oder erhöhtem Risiko.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* HYPE ZÜRI */}
            <Card className="border-2 border-[oklch(0.85_0.08_280)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium bg-[oklch(0.90_0.08_280)] text-[oklch(0.45_0.15_280)] px-2 py-1 rounded-full">
                      Ambulant
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-3">
                      HYPE ZÜRI
                    </h3>
                    <p className="text-sm text-muted-foreground">Helping Young People Early</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.95_0.05_280)] flex items-center justify-center">
                    <Home className="w-6 h-6 text-[oklch(0.50_0.15_280)]" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  Frühinterventionsprogramm für Jugendliche ab 13 Jahren mit Verdacht, erhöhtem 
                  Risiko oder bereits diagnostizierter Borderline-Störung. Wissenschaftlich geprüft 
                  und seit 2019 erfolgreich im Einsatz.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Jugendliche ab 13 Jahren</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Max. 16 Sitzungen über 6-9 Monate</span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground text-sm mb-2">Das Angebot umfasst:</h4>
                  <ul className="space-y-1">
                    {[
                      "Psychoedukation und Diagnostik",
                      "Einzeltherapie",
                      "Eltern- und Familiengespräche",
                      "Bei Bedarf: Hometreatment (2x/Woche)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Ambulatorium Zürich</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href="tel:+41583846600" className="text-sm text-[oklch(0.50_0.15_280)] hover:underline">
                      +41 58 384 66 00
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href="mailto:kjpp.ambizh@pukzh.ch" className="text-sm text-[oklch(0.50_0.15_280)] hover:underline">
                      kjpp.ambizh@pukzh.ch
                    </a>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <a href="https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerung/" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Elterngruppe */}
            <Card className="border-2 border-[oklch(0.85_0.08_55)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium bg-[oklch(0.90_0.08_55)] text-[oklch(0.45_0.12_55)] px-2 py-1 rounded-full">
                      Für Angehörige
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-3">
                      Elterngruppe Borderline
                    </h3>
                    <p className="text-sm text-muted-foreground">Gruppe für Eltern von Jugendlichen</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.95_0.05_55)] flex items-center justify-center">
                    <Users className="w-6 h-6 text-[oklch(0.55_0.12_55)]" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  Spezielles Gruppenangebot für Eltern von Jugendlichen mit der Diagnose einer 
                  Borderline-Störung oder dem Risiko, eine solche zu entwickeln. Austausch mit 
                  anderen betroffenen Eltern und fachliche Begleitung.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Eltern von betroffenen Jugendlichen</span>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href="mailto:kjpp.ambizh@pukzh.ch" className="text-sm text-[oklch(0.55_0.12_55)] hover:underline">
                      kjpp.ambizh@pukzh.ch
                    </a>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <a href="https://www.pukzh.ch/unsere-angebote/kinder-und-jugendpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerung/gruppe-eltern-von-jugendlichen-mit-einer-borderline-persoenlichkeitsstoerung/" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Erwachsene */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.88_0.05_145)] flex items-center justify-center">
                <User className="w-5 h-5 text-[oklch(0.45_0.10_145)]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Erwachsene (18–65 Jahre)
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Die Erwachsenenpsychiatrie der PUK Zürich bietet eine offiziell zertifizierte 
              DBT-Station sowie ambulante Angebote für Menschen mit Borderline-Persönlichkeitsstörung.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* DBT-Station */}
            <Card className="border-2 border-[oklch(0.80_0.08_145)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs font-medium bg-[oklch(0.88_0.05_145)] text-[oklch(0.40_0.10_145)] px-2 py-1 rounded-full">
                        Stationär
                      </span>
                      <span className="text-xs font-medium bg-[oklch(0.90_0.08_55)] text-[oklch(0.45_0.12_55)] px-2 py-1 rounded-full">
                        ⭐ Zertifiziert
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      DBT-Station 62B
                    </h3>
                    <p className="text-sm text-muted-foreground">Dialektisch-Behaviorale Therapie</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.04_145)] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[oklch(0.45_0.10_145)]" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  Offiziell zertifizierte DBT-Station für Erwachsene mit emotional-instabiler 
                  Persönlichkeitsstörung vom Borderline-Typ. Ziel ist die Wiederherstellung der 
                  ambulanten Therapiefähigkeit und soziale Integration.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Erwachsene 18–65 Jahre</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Mehrere Wochen Aufenthalt</span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground text-sm mb-2">Das Angebot umfasst:</h4>
                  <ul className="space-y-1">
                    {[
                      "Kognitiv-verhaltenstherapeutische Einzeltherapie",
                      "DBT-Skillsgruppen (Achtsamkeit, Stresstoleranz, Emotionsregulation, Selbstwert)",
                      "Kunst-, Gestaltungs- und Bewegungstherapie",
                      "Pflegerische Angebote (Akupunktur, Entspannung)",
                      "Sozialberatung"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">ZIP Rheinau</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href="tel:+41583849491" className="text-sm text-[oklch(0.45_0.10_145)] hover:underline">
                      +41 58 384 94 91
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href="mailto:station62b@pukzh.ch" className="text-sm text-[oklch(0.45_0.10_145)] hover:underline">
                      station62b@pukzh.ch
                    </a>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <a href="https://www.pukzh.ch/unsere-angebote/erwachsenenpsychiatrie/behandlungsschwerpunkte/persoenlichkeitsstoerungen/station-fuer-dialektisch-behaviorale-therapie/" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Triage / Ambulant */}
            <Card className="border-2 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      Erste Anlaufstelle
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-3">
                      Triage Erwachsenenpsychiatrie
                    </h3>
                    <p className="text-sm text-muted-foreground">Zentrale Anmeldung und Beratung</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  Die zentrale Triage-Stelle berät Sie bei der Wahl des passenden Behandlungsangebots 
                  und koordiniert die Anmeldung. Hier können sich Betroffene, Angehörige und 
                  Fachpersonen melden.
                </p>

                <div className="bg-[oklch(0.95_0.03_55)] border border-[oklch(0.85_0.08_55)] rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[oklch(0.55_0.12_55)]" />
                    Selbstanmeldung möglich
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Sie können sich selbst anmelden oder über Ihren Hausarzt, Psychiater oder 
                    andere Fachpersonen zugewiesen werden.
                  </p>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href="tel:+41583842000" className="text-sm text-foreground hover:underline font-medium">
                      +41 58 384 20 00
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href="mailto:triage.erwachsenenpsychiatrie@pukzh.ch" className="text-sm text-foreground hover:underline">
                      triage.erwachsenenpsychiatrie@pukzh.ch
                    </a>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full mt-4">
                  <a href="https://www.pukzh.ch/unsere-angebote/erwachsenenpsychiatrie/" target="_blank" rel="noopener noreferrer">
                    Alle Angebote ansehen <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Senioren */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[oklch(0.90_0.05_35)] flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-[oklch(0.55_0.12_35)]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Senioren (ab 65 Jahre)
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Die Alterspsychiatrie der PUK Zürich bietet spezialisierte Behandlung für 
              ältere Menschen mit psychischen Erkrankungen, einschliesslich Persönlichkeitsstörungen.
            </p>
          </motion.div>

          <Card className="border-2 border-[oklch(0.85_0.08_35)] max-w-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium bg-[oklch(0.90_0.05_35)] text-[oklch(0.50_0.12_35)] px-2 py-1 rounded-full">
                    Alterspsychiatrie
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-3">
                    Zentrum für Alterspsychiatrie
                  </h3>
                  <p className="text-sm text-muted-foreground">Ambulant, teilstationär und stationär</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.95_0.03_35)] flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-[oklch(0.55_0.12_35)]" />
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                Das Zentrum für Alterspsychiatrie bietet umfassende psychiatrische Versorgung 
                für Menschen ab 65 Jahren. Die Behandlung wird individuell auf die Bedürfnisse 
                und Lebensumstände älterer Patientinnen und Patienten abgestimmt.
              </p>

              <div className="border-t border-border/50 pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href="tel:+41583844682" className="text-sm text-[oklch(0.55_0.12_35)] hover:underline font-medium">
                    +41 58 384 46 82
                  </a>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full mt-4">
                <a href="https://www.pukzh.ch/unsere-angebote/alterspsychiatrie/" target="_blank" rel="noopener noreferrer">
                  Mehr erfahren <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weitere Angebote */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Weitere Angebote im Kanton Zürich
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Neben der PUK Zürich gibt es weitere spezialisierte Einrichtungen für die 
              Behandlung von Borderline-Persönlichkeitsstörungen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Clienia Schlössli – Station A2
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Stationäres Integratives Therapieprogramm für Emotionsregulation (SITE) – 
                  spezialisiert auf Borderline und Emotionsregulationsstörungen.
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                  <a href="https://www.clienia.ch/de/standorte/clienia-schloessli/stationen/a2/" target="_blank" rel="noopener noreferrer">
                    Website besuchen <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  DBT-Therapeuten finden
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Der Dachverband DBT bietet eine Therapeutenlandkarte mit zertifizierten 
                  DBT-Therapeutinnen und -Therapeuten in der Schweiz.
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                  <a href="https://www.dachverband-dbt.de/dbt-therapieangebote" target="_blank" rel="noopener noreferrer">
                    Therapeutensuche <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notfall-Hinweis */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Card className="bg-[oklch(0.95_0.05_25)] border-[oklch(0.75_0.12_25)] max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[oklch(0.55_0.15_25)]" />
                Notfall-Nummern PUK Zürich
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Bei akuten Krisen sind die Notfalldienste der PUK Zürich rund um die Uhr erreichbar:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Kinder & Jugendliche</p>
                  <a href="tel:+41583846666" className="font-semibold text-foreground hover:underline">
                    058 384 66 66
                  </a>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Erwachsene (ab 18)</p>
                  <a href="tel:+41583842000" className="font-semibold text-foreground hover:underline">
                    058 384 20 00
                  </a>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Senioren (ab 65)</p>
                  <a href="tel:+41583844682" className="font-semibold text-foreground hover:underline">
                    058 384 46 82
                  </a>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link href="/notfall">
                  <Button variant="outline" size="sm">
                    Alle Notfall-Ressourcen <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weiterführende Links */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Weiterführende Informationen
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/unterstuetzen/therapie">
                <Button variant="outline">
                  Therapie begleiten
                </Button>
              </Link>
              <Link href="/glossar">
                <Button variant="outline">
                  Glossar (DBT, MBT etc.)
                </Button>
              </Link>
              <Link href="/genesung">
                <Button variant="outline">
                  Genesung ist möglich
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
