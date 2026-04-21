import type { CSSProperties } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  Users,
  BookOpen,
} from "lucide-react";
import { Link } from "wouter";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";
import SelbstfuersorgeCheck from "@/components/interactive/SelbstfuersorgeCheck";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import { permissionList } from "@/content/selbstfuersorge-page";
import { SelbstfuersorgeExercisesSection } from "@/sections/SelbstfuersorgeExercisesSection";
import { SelbstfuersorgeSignalsSection } from "@/sections/SelbstfuersorgeSignalsSection";
import { SelbstfuersorgeRoleNotesSection } from "@/sections/SelbstfuersorgeRoleNotesSection";

export default function Selbstfuersorge() {
  return (
    <Layout>
      <SEO
        title="Selbstfürsorge"
        description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen."
        path="/selbstfuersorge"
      />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-lighter/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-lighter flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-mid">
                Lesezeit: 12 Minuten
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Selbstfürsorge für Angehörige
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Wer dauerhaft mit Krisen, Unsicherheit und Loyalitätskonflikten
              lebt, braucht eigene Regeneration. Selbstfürsorge ist nicht
              Nebenbei-Pflege, sondern eine fachlich wichtige Grundlage, damit
              Sie handlungsfähig und innerlich beweglich bleiben.
            </p>

            <Card className="bg-sage-lighter/20 border-sage-mid">
              <CardContent className="p-5">
                <p className="text-foreground leading-relaxed italic">
                  "Viele Angehörige merken erst spät, wie erschöpft sie geworden
                  sind. Selbstfürsorge beginnt oft nicht mit grossen
                  Veränderungen, sondern damit, die eigene Belastung überhaupt
                  ernst zu nehmen."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Aufklappbare Abschnitte */}
      <section className="py-8 md:py-12 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* ═══ 1. Warum Selbstfürsorge wichtig ist ═══ */}
            <ContentSection
              title="Warum Selbstfürsorge so wichtig ist"
              icon={<Heart className="w-6 h-6 text-terracotta-mid" />}
              id="selbstfuersorge-warum-wichtig"
              defaultOpen={true}
              preview="Angehörige tragen eine besondere Last. Selbstfürsorge ist keine Selbstsucht, sondern Selbsterhaltung."
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Angehörige von Menschen mit Borderline tragen oft eine
                  besondere Last. Die emotionale Intensität, die
                  Unvorhersehbarkeit und die dauernde innere Wachsamkeit können
                  zu chronischem Stress führen. Nicht jeder entwickelt daraus
                  eine psychische Erkrankung, aber viele geraten über längere
                  Zeit an Grenzen. Studien zeigen ein erhöhtes Risiko für:
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Erschöpfungsdepression",
                    "Angststörungen",
                    "Schlafstörungen",
                    "Körperliche Beschwerden",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-terracotta-mid" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Selbstfürsorge ist daher keine Selbstsucht, sondern{" "}
                  <strong className="text-foreground">Selbsterhaltung</strong>.
                  Sie erhöht die Chance, dass Sie auf Dauer präsent bleiben
                  können, statt sich Schritt für Schritt zu erschöpfen.
                </p>
              </div>
            </ContentSection>

            {/* ═══ 2. Warnsignale für Überlastung ═══ */}
            <SelbstfuersorgeSignalsSection />

            {/* ═══ Selbstfürsorge-Kurzcheck ═══ */}
            <div className="my-6">
              <SelbstfuersorgeCheck />
            </div>

            <SelbstfuersorgeExercisesSection />

            {/* ═══ 5. Beratung & Netzwerke (Kurzhinweis) ═══ */}
            <ContentSection
              title="Beratung & Netzwerke"
              icon={<Users className="w-6 h-6 text-slate-blue" />}
              id="beratung-netzwerke"
              preview="Sie müssen das nicht allein tragen – professionelle Beratung und Austausch mit anderen Angehörigen helfen."
            >
              <Card className="bg-slate-light/20 border-slate-blue">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Austausch mit anderen Angehörigen kann enorm entlastend
                    sein. Professionelle Beratungsstellen und Selbsthilfegruppen
                    bieten Orientierung, praktische Tipps und das Gefühl, nicht
                    allein zu sein.
                  </p>
                  <Link href="/beratung">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-blue hover:text-slate-dark transition-colors cursor-pointer">
                      Alle Beratungsangebote & Netzwerke ansehen
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 6. Radikale Akzeptanz ═══ */}
            <ContentSection
              title="Radikale Akzeptanz"
              icon={<Sparkles className="w-6 h-6 text-sage-mid" />}
              id="radikale-akzeptanz"
              preview="«Es ist, wie es ist.» – Dieses DBT-Konzept kann auch für Angehörige befreiend sein."
            >
              <Card className="bg-sage-wash/50 border-sage-mid/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg italic text-center">
                    «Es ist, wie es ist.»
                  </p>
                  <p className="text-muted-foreground text-sm text-center mt-2">
                    – Dieser Satz kann befreiend sein.
                  </p>
                </CardContent>
              </Card>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Radikale Akzeptanz bedeutet nicht, dass Sie die Situation
                gutheissen. Es bedeutet, dass Sie aufhören, gegen die Realität
                zu kämpfen. Dieses Konzept aus der{" "}
                <Link
                  to="/glossar?q=DBT"
                  className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors"
                >
                  DBT (Dialektisch-Behaviorale Therapie)
                </Link>{" "}
                kann auch für Angehörige sehr hilfreich sein.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ❌ Was radikale Akzeptanz NICHT ist:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Aufgeben</li>
                    <li>• Gutheissen</li>
                    <li>• Passivität</li>
                    <li>• Resignation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ✓ Was radikale Akzeptanz IST:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Anerkennen, was Sie nicht ändern können</li>
                    <li>
                      • Energie sparen für das, was Sie beeinflussen können
                    </li>
                    <li>• Inneren Frieden finden trotz äusserer Turbulenzen</li>
                    <li>• Loslassen von «Es sollte anders sein»</li>
                  </ul>
                </div>
              </div>

              <Card className="border-l-4 border-l-sage-mid">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">
                    Übung: Radikale Akzeptanz praktizieren
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>
                      <strong>1.</strong> Benennen Sie die Situation: «Es ist
                      so, dass...»
                    </li>
                    <li>
                      <strong>2.</strong> Spüren Sie den Widerstand: «Ich
                      wünschte, es wäre anders.»
                    </li>
                    <li>
                      <strong>3.</strong> Lassen Sie los: «Ich kann diese
                      Realität nicht ändern.»
                    </li>
                    <li>
                      <strong>4.</strong> Richten Sie den Fokus neu: «Was kann
                      ich jetzt tun?»
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
              </p>
            </ContentSection>

            {/* ═══ 7. Erlaubnis geben ═══ */}
            <ContentSection
              title="Geben Sie sich die Erlaubnis"
              icon={<CheckCircle2 className="w-6 h-6 text-terracotta" />}
              id="erlaubnis"
              preview="Als Angehöriger dürfen Sie auch mal wütend sein, Nein sagen und Ihre eigenen Bedürfnisse ernst nehmen."
            >
              <Card className="bg-terracotta-light/20 border-terracotta">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Als Angehöriger dürfen Sie:
                  </p>
                  <ul className="space-y-3">
                    {permissionList.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 8. Materialien zum Download ═══ */}
            <SelbstfuersorgeInfografikenSection />

            {/* ═══ 9. Hinweise für Ihre Situation ═══ */}
            <SelbstfuersorgeRoleNotesSection />

            {/* Evidenz-Layer (bleibt ausserhalb der Akkordeons) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    Worauf stützt sich das?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • Studien zeigen erhöhte Belastung bei Angehörigen von
                      Menschen mit BPS (Hoffman et al., 2005)
                    </li>
                    <li>
                      • Atemübungen aktivieren den Parasympathikus und
                      reduzieren Cortisol (Zaccaro et al., 2018)
                    </li>
                    <li>
                      • Soziale Unterstützung ist ein wichtiger Schutzfaktor
                      gegen Burnout (Maslach & Leiter, 2016)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Abschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ "--wave-color": "var(--background)" } as CSSProperties}
            >
              <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-light/30 border-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-sage-mid mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie sind wichtig. Ihre Gesundheit und Ihr Wohlbefinden sind
                    wichtig. Indem Sie gut für sich sorgen, sorgen Sie auch
                    besser für andere. Selbstfürsorge ist keine Selbstsucht –
                    sie ist die Grundlage dafür, langfristig für Ihren
                    Angehörigen da sein zu können.
                  </p>
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
              <Link href="/grenzen">
                <Button variant="ghost">← Grenzen setzen</Button>
              </Link>
              <Link href="/materialien">
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
                  Alle Materialien
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
