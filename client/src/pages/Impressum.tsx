import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, BookOpen, ExternalLink, Phone, Mail, MapPin } from "lucide-react";
import { kontaktById, emailById, WEBSITE_ROT } from "@/data/kontakte";

const fachstelle = kontaktById("INFO_FACHSTELLE")!;
const emailAngehoerigen = emailById("EMAIL_ANGEHOERIGEN")!;
const rot144 = kontaktById("ROT_144")!;
const rot117 = kontaktById("ROT_117")!;
const gruen143 = kontaktById("GRUEN_143")!;

export default function Impressum() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.94_0.02_85)]/50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[oklch(0.40_0.08_145)]" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Impressum
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Verantwortlich */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Verantwortlich für den Inhalt
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p className="font-medium text-foreground">Christa Egger</p>
                    <p>Angehörigenberaterin</p>
                    <p className="mt-4 text-sm">
                      Diese Website ist eine private Ressource für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung. 
                      Sie wurde im Rahmen der Angehörigenberatung erstellt und wird von Angehörigenberater:innen 
                      gezielt an Ratsuchende weitergegeben.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-[oklch(0.55_0.10_145)]/30 bg-[oklch(0.95_0.04_145)]/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Beratung für Angehörige
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die <strong>Fachstelle Angehörigenarbeit</strong> an der Psychiatrischen Universitätsklinik Zürich (PUK) 
                    bietet Unterstützung und Beratung für Angehörige von psychisch erkrankten Menschen.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.90_0.05_145)] flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[oklch(0.45_0.10_145)]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <a href={`tel:${fachstelle.tel}`} className="font-medium text-foreground hover:text-[oklch(0.55_0.10_145)] transition-colors">
                          {fachstelle.nummer}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.90_0.05_145)] flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[oklch(0.45_0.10_145)]" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-Mail</p>
                        <a href={`mailto:${emailAngehoerigen.adresse}`} className="font-medium text-foreground hover:text-[oklch(0.55_0.10_145)] transition-colors">
                          {emailAngehoerigen.adresse}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      Die Beratung ist <strong>kostenlos</strong> und steht allen Angehörigen von psychisch kranken Menschen 
                      im Kanton Zürich vertraulich zur Verfügung.
                    </p>
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
              <Card className="border-[oklch(0.65_0.12_55)]/30 bg-[oklch(0.95_0.04_55)]/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Wichtiger Hinweis
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Diese Website ist <strong>keine offizielle Website</strong> der Psychiatrischen Universitätsklinik Zürich (PUK) 
                    oder einer anderen Institution. Sie stellt eine unabhängige Informationsressource dar, die auf Basis 
                    evidenzbasierter Fachliteratur und praktischer Erfahrung in der Angehörigenberatung erstellt wurde.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Zweck */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Zweck der Website
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    «Schluss mit dem Eiertanz» bietet Angehörigen von Menschen mit Borderline-Persönlichkeitsstörung:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-[oklch(0.55_0.10_145)]">•</span>
                      Evidenzbasierte Informationen zum Verständnis der Störung
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[oklch(0.55_0.10_145)]">•</span>
                      Praktische Strategien für den Alltag und Krisensituationen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[oklch(0.55_0.10_145)]">•</span>
                      Kommunikationstechniken für schwierige Gespräche
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[oklch(0.55_0.10_145)]">•</span>
                      Ressourcen zur Selbstfürsorge und Burnout-Prävention
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Haftungsausschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Haftungsausschluss
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, 
                      Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
                    </p>
                    <p>
                      <strong>Diese Website ersetzt keine professionelle Beratung, Diagnose oder Behandlung.</strong> Bei 
                      psychischen Krisen oder Notfällen wenden Sie sich bitte umgehend an die entsprechenden 
                      Notfallnummern ({rot144.nummer} / {rot117.nummer}) oder den psychiatrischen Notdienst.
                      Zur Entlastung: {gruen143.label} ({gruen143.nummer}).
                    </p>
                    <p>
                      Für externe Links wird keine Haftung übernommen. Für den Inhalt der verlinkten Seiten 
                      sind ausschliesslich deren Betreiber verantwortlich.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quellenangaben */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                    Quellenangaben
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Die Inhalte dieser Website basieren auf anerkannter Fachliteratur und evidenzbasierten Methoden, 
                    insbesondere:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="border-l-2 border-[oklch(0.65_0.08_145)] pl-4">
                      <p className="font-medium text-foreground">Mason, P. T. & Kreger, R.</p>
                      <p className="text-sm">Schluss mit dem Eiertanz: Für Angehörige von Menschen mit Borderline. 
                      Balance Buch + Medien Verlag.</p>
                    </li>
                    <li className="border-l-2 border-[oklch(0.65_0.08_145)] pl-4">
                      <p className="font-medium text-foreground">Linehan, M. M.</p>
                      <p className="text-sm">Dialektisch-Behaviorale Therapie der Borderline-Persönlichkeitsstörung. 
                      CIP-Medien.</p>
                    </li>
                    <li className="border-l-2 border-[oklch(0.65_0.08_145)] pl-4">
                      <p className="font-medium text-foreground">Fruzzetti, A. E.</p>
                      <p className="text-sm">The High-Conflict Couple: A Dialectical Behavior Therapy Guide. 
                      New Harbinger Publications.</p>
                    </li>
                    <li className="border-l-2 border-[oklch(0.65_0.08_145)] pl-4">
                      <p className="font-medium text-foreground">Gunderson, J. G. & Hoffman, P. D.</p>
                      <p className="text-sm">Understanding and Treating Borderline Personality Disorder. 
                      American Psychiatric Publishing.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Urheberrecht */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Urheberrecht
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. 
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb 
                    der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung. Downloads und Kopien 
                    dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Die Infografiken und Handouts dürfen im Rahmen der Angehörigenberatung und für den 
                    persönlichen Gebrauch verwendet werden.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-center text-sm text-muted-foreground">
                Stand: Februar 2026
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
