import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Stethoscope, ArrowRight, CheckCircle2, Brain, Heart, RefreshCw, Lightbulb, Download, MapPin, ExternalLink, Home, Calendar, Building2, Baby, User, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import { kontaktById, emailById, GELB } from "@/data/kontakte";

const hype = kontaktById("INFO_PUK_KJPP_HYPE")!;
const emailKjpp = emailById("EMAIL_KJPP")!;
const pukZentrale = kontaktById("INFO_PUK_ZENTRALE")!;
const emailHard = emailById("EMAIL_HARD")!;

export default function UnterstuetzenTherapie() {
  return (
    <Layout>
      <SEO title="Therapie unterstützen" description="Wie Sie die Therapie eines Menschen mit Borderline sinnvoll begleiten können." path="/unterstuetzen/therapie" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Link href="/unterstuetzen/uebersicht" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zur Übersicht
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-slate-light flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-slate-blue" />
              </div>
              <span className="text-sm font-medium text-slate-blue">Lesezeit: 10 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Therapie begleiten
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Professionelle Therapie ist der wichtigste Baustein der Genesung. Sie können diesen Prozess unterstützen – ohne selbst zum Therapeuten zu werden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Wirksame Therapien */}
            <ContentSection
              title="Wirksame Therapieformen"
              icon={<Brain className="w-7 h-7 text-slate-blue" />}
              id="therapieformen"
              defaultOpen={true}
              preview="DBT, MBT und Schematherapie – die drei evidenzbasierten Therapien für Borderline im Überblick."
            >
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
                          <h3 className="font-semibold text-foreground mb-2">{therapy.name}</h3>
                          <p className="text-muted-foreground text-sm">{therapy.description}</p>
                        </div>
                        <span className="text-xs bg-sage-light text-sage-darker px-2 py-1 rounded-full whitespace-nowrap">
                          {therapy.highlight}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-sage-lighter border-sage-light">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sage-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        Therapieangebote im Kanton Zürich
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Weiter unten finden Sie eine Übersicht über spezialisierte DBT-Stationen und Behandlungsangebote der PUK Zürich – für Kinder, Jugendliche, Erwachsene und Erwachsene ab 65.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* DBT-Skills für Angehörige */}
            <ContentSection
              title="DBT-Skills verstehen"
              icon={<Lightbulb className="w-7 h-7 text-terracotta" />}
              id="dbt-skills"
              preview="Achtsamkeit, Stresstoleranz, Emotionsregulation, Zwischenmenschliche Skills – die vier Säulen der DBT."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die DBT vermittelt vier Gruppen von Skills. Wenn Sie diese kennen, können Sie Ihren Angehörigen besser unterstützen – und einige Skills auch selbst nutzen.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Achtsamkeit",
                    description: "Im Moment sein, ohne zu urteilen. Wahrnehmen, was ist.",
                    color: "var(--color-sage)"
                  },
                  {
                    title: "Stresstoleranz",
                    description: "Krisen überstehen, ohne sie schlimmer zu machen.",
                    color: "var(--color-terracotta-mid)"
                  },
                  {
                    title: "Emotionsregulation",
                    description: "Gefühle verstehen und beeinflussen lernen.",
                    color: "var(--color-terracotta)"
                  },
                  {
                    title: "Zwischenmenschliche Skills",
                    description: "Beziehungen pflegen, Grenzen setzen, Konflikte lösen.",
                    color: "var(--color-slate-blue)"
                  }
                ].map((skill, index) => (
                  <Card key={index} style={{ borderColor: skill.color }} className={`border-2 ${index === 0 ? "sm:col-span-2" : ""}`}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">{skill.title}</h3>
                      <p className="text-muted-foreground text-sm">{skill.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-terracotta-light/10 border-terracotta">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-terracotta" />
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
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Fortschritte würdigen */}
            <ContentSection
              title="Fortschritte würdigen"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="fortschritte"
              preview="Genesung ist kein linearer Prozess. Kleine Fortschritte zu erkennen und zu würdigen ist wichtig."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Genesung ist kein linearer Prozess. Kleine Fortschritte zu erkennen und zu würdigen ist wichtig – für Sie beide.
              </p>
              
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Beispiele für Fortschritte</h3>
                  <ul className="space-y-3">
                    {[
                      "Eine Krise wurde ohne Selbstverletzung überstanden",
                      "Ein Konflikt wurde ohne Eskalation gelöst",
                      "Ein Skill wurde in einer schwierigen Situation angewendet",
                      "Ein Termin wurde trotz Angst wahrgenommen",
                      "Ein Gefühl wurde benannt statt ausagiert"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage-mid mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Mit Rückschlägen umgehen */}
            <ContentSection
              title="Mit Rückschlägen umgehen"
              icon={<RefreshCw className="w-7 h-7 text-terracotta-mid" />}
              id="rueckschlaege"
              preview="Rückschläge gehören zur Genesung. Sie sind keine Zeichen des Scheiterns, sondern Teil des Prozesses."
            >
              <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
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
                        <span className="text-terracotta-mid">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Therapieangebote Kanton Zürich */}
            <ContentSection
              title="Therapieangebote im Kanton Zürich"
              icon={<MapPin className="w-7 h-7 text-sage-dark" />}
              id="therapieangebote"
              preview="PUK Zürich: Spezialisierte DBT-Stationen für Jugendliche (HYPE ZÜRI), Erwachsene und Ältere."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die Psychiatrische Universitätsklinik Zürich (PUK) bietet spezialisierte Behandlungsangebote für verschiedene Altersgruppen – ambulant, teilstationär und stationär.
              </p>
              
              {/* Settings-Übersicht */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: Home, label: "Ambulant", desc: "Regelmässige Termine, Leben zu Hause" },
                  { icon: Calendar, label: "Teilstationär", desc: "Tagesklinik, abends zu Hause" },
                  { icon: Building2, label: "Stationär", desc: "Aufenthalt in der Klinik" }
                ].map((setting, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
                    <setting.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-foreground text-sm">{setting.label}</span>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Kinder und Jugendliche */}
              <Card className="border-2 border-slate-light mb-4">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-lighter flex items-center justify-center">
                      <Baby className="w-5 h-5 text-slate-mid" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">HYPE ZÜRI</h3>
                      <p className="text-xs text-muted-foreground">Helping Young People Early – Jugendliche ab 13 Jahren</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Frühinterventionsprogramm für Jugendliche mit Verdacht, erhöhtem Risiko oder bereits diagnostizierter Borderline-Störung. Max. 16 Sitzungen über 6-9 Monate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href={`tel:${hype.tel}`} className="text-sm text-slate-mid hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {hype.nummer}
                    </a>
                    <a href={`mailto:${emailKjpp.adresse}`} className="text-sm text-slate-mid hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {emailKjpp.adresse}
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              {/* Erwachsene */}
              <Card className="border-2 border-sage-light mb-4">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center">
                      <User className="w-5 h-5 text-sage-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">DBT-Station für Erwachsene</h3>
                      <p className="text-xs text-muted-foreground">Station B2 – Erwachsene 18-65 Jahre</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Spezialisierte DBT-Station mit strukturiertem Therapieprogramm: Einzeltherapie, Skillstraining, Achtsamkeit und Körpertherapie.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href={`tel:${pukZentrale.tel}`} className="text-sm text-sage-dark hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {pukZentrale.nummer}
                    </a>
                    <a href={`mailto:${emailHard.adresse}`} className="text-sm text-sage-dark hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {emailHard.adresse}
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              {/* Weitere Angebote */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-1">Clienia Schlössli – Station A2</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Stationäres Integratives Therapieprogramm für Emotionsregulation (SITE)
                    </p>
                    <a href="https://www.clienia.ch/de/standorte/clienia-schloessli/stationen/a2/" target="_blank" rel="noopener noreferrer" className="text-xs text-sage-dark hover:underline flex items-center gap-1">
                      Website besuchen <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground text-sm mb-1">DBT-Therapeuten finden</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Therapeutenlandkarte mit zertifizierten DBT-Therapeuten in der Schweiz
                    </p>
                    <a href="https://www.dachverband-dbt.de/dbt-therapieangebote" target="_blank" rel="noopener noreferrer" className="text-xs text-sage-dark hover:underline flex items-center gap-1">
                      Therapeutensuche <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              {/* Notfall-Nummern */}
              <Card className="mt-4 bg-terracotta-wash border-sand-border">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-terracotta-mid" />
                    Notfall-Nummern PUK Zürich (24/7)
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {GELB.filter(k => k.id !== "GELB_KIZ").map((k) => (
                      <div key={k.id}>
                        <p className="text-xs text-muted-foreground">{k.fuerWen || k.label}</p>
                        <a href={`tel:${k.tel}`} className="text-sm font-semibold text-foreground hover:underline">{k.nummer}</a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-slate-blue" />
                Materialien zum Thema
              </h2>
              
              <Card className="bg-sand-muted border-sand-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-5 h-5 text-sand-warm" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Downloads werden überarbeitet</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Neue Infografiken zum Thema "Therapie" werden gerade erstellt.
                      </p>
                      <Link href="/materialien">
                        <Button variant="outline" size="sm">
                          Zur Materialien-Seite
                        </Button>
                      </Link>
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
              <Link href="/unterstuetzen/alltag">
                <Button variant="ghost">
                  ← Im Alltag unterstützen
                </Button>
              </Link>
              <Link href="/unterstuetzen/krise">
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
