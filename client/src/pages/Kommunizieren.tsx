import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Lightbulb, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import ValidierungsStufenleiter from "@/components/interactive/ValidierungsStufenleiter";
import KommunizierenMaterialsSection from "@/sections/KommunizierenMaterialsSection";
import {
  KommunizierenEscalationSection,
  KommunizierenRolesSection,
  KommunizierenSituationsSection,
} from "@/sections/KommunizierenPatternSections";

export default function Kommunizieren() {
  return (
    <Layout>
      <SEO
        title="Kommunizieren"
        description="Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen."
        path="/kommunizieren"
      />
      <TableOfContents />

      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-light flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-slate-blue" />
              </div>
              <span className="text-sm font-medium text-slate-blue">
                Lesezeit: 14 Minuten
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Kommunizieren
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kommunikation löst keine Grunddynamik. Sie kann aber Eskalation
              bremsen, Missverständnisse begrenzen und Ihre eigene Position
              klarer machen. Gerade in belasteten Beziehungen ist deshalb nicht
              nur wichtig, was Sie sagen, sondern wann, in welchem Ton und mit
              welcher inneren Haltung.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Kommunikation beginnt nicht mit Technik"
              icon={<MessageCircle className="w-7 h-7 text-slate-blue" />}
              id="haltung"
              defaultOpen={true}
              preview="Viele Gespräche scheitern nicht nur am Wortlaut, sondern daran, dass beide Seiten bereits im Alarmzustand, in Rechtfertigung oder in Kränkung sprechen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  In belasteten Beziehungen kippt Kommunikation oft schnell in
                  Verteidigung, Beschuldigung, Rückzug oder Übererklärung. Dann
                  ist die Frage nicht nur, welcher Satz "richtig" wäre, sondern
                  ob überhaupt schon ein Moment für Gespräch da ist.
                </p>
                <Card className="bg-slate-wash border-slate-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Hilfreiche Kommunikation ist meist kürzer, langsamer und
                      klarer. Sie versucht nicht sofort zu überzeugen, sondern
                      zuerst Beziehungsspannung etwas zu senken.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Validierung: der wichtigste Ausgangspunkt"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="validierung"
              preview="Validierung heisst nicht zustimmen. Sie signalisiert: Ich nehme dein Erleben ernst, auch wenn ich nicht jede Sichtweise teile."
            >
              <div className="space-y-4">
                <Card className="bg-terracotta-light/10 border-terracotta">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg mb-3">
                      <strong>Validierung</strong> bedeutet, dass Sie das
                      Erleben Ihres Gegenübers als nachvollziehbar behandeln,
                      ohne jeden Vorwurf, jede Interpretation oder jedes
                      Verhalten zu bestätigen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      In Beziehungen mit Borderline ist das oft deshalb so
                      wichtig, weil Nichtgesehenwerden, Kränkung oder Unklarheit
                      rasch zusätzlichen Druck erzeugen. Validierung kann diesen
                      Druck etwas senken und den Boden für spätere Klärung
                      bereiten.
                    </p>
                  </CardContent>
                </Card>

                <ValidierungsStufenleiter />

                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground font-medium text-sm">
                      Ein hilfreicher innerer Satz für Angehörige: Ich muss
                      nicht recht bekommen, um zuerst zu zeigen, dass ich den
                      Schmerz wahrnehme.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Timing ist oft wichtiger als der perfekte Satz"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="timing"
              preview="Viele Gespräche scheitern daran, dass Inhalte zu früh geklärt werden sollen, während Anspannung, Scham oder Wut noch den ganzen Raum füllen."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher jetzt
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>kurz spiegeln, was Sie wahrnehmen</li>
                      <li>Ton und Tempo beruhigen</li>
                      <li>klare Begrenzung bei Beschimpfung oder Druck</li>
                      <li>vorschlagen, später weiterzureden</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher später
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Fakten prüfen und Missverständnisse sortieren</li>
                      <li>Konsequenzen besprechen</li>
                      <li>grössere Beziehungsfragen klären</li>
                      <li>lange Erklärungen oder Rechtfertigungen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <KommunizierenEscalationSection />

            <KommunizierenSituationsSection />

            <KommunizierenRolesSection />

            <KommunizierenMaterialsSection />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Button asChild variant="ghost">
                <Link href="/unterstuetzen/uebersicht">← Unterstützen</Link>
              </Button>
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-mid text-white"
              >
                <Link href="/grenzen">
                  Weiter: Grenzen setzen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
