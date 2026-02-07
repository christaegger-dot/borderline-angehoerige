import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Heart, Clock, BookOpen, ExternalLink, ArrowRight, AlertTriangle, RefreshCw, Users, Download, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import { TableOfContents } from "@/components/UXEnhancements";

export default function Genesung() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.88_0.04_145)]/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[oklch(0.65_0.12_55)] blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[oklch(0.65_0.08_145)] blur-3xl" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[oklch(0.40_0.08_145)]" />
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Genesung ist <span className="text-[oklch(0.55_0.10_145)]">möglich</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Entgegen früherer Annahmen zeigt die Forschung: Die Borderline-Persönlichkeitsstörung 
              hat eine der besten Prognosen unter den schweren psychischen Erkrankungen. 
              Die meisten Betroffenen erleben im Laufe der Zeit eine deutliche Besserung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kernbotschaft – bleibt immer offen */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-[oklch(0.65_0.08_145)]/30 bg-gradient-to-br from-[oklch(0.95_0.03_145)] to-[oklch(0.98_0.01_85)]">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.65_0.08_145)] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                      Was die Forschung zeigt
                    </h2>
                    <p className="text-muted-foreground">
                      Langzeitstudien über 10–24 Jahre belegen eindrücklich: Die meisten Menschen 
                      mit Borderline erleben eine signifikante Verbesserung ihrer Symptome.
                    </p>
                  </div>
                </div>

                {/* Statistiken */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">
                      85–93%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine symptomatische Remission innerhalb von 10 Jahren
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">
                      50%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine vollständige Genesung mit guter Lebensqualität
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">
                      77%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine anhaltende Remission über 12+ Jahre
                    </p>
                  </div>
                </div>

                {/* Quellenhinweis */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    <strong>Quellen:</strong> McLean Study of Adult Development (Zanarini et al., 2010, 2012, 2024); 
                    Collaborative Longitudinal Personality Disorders Study (Gunderson et al., 2011)
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Aufklappbare Abschnitte */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex gap-8 max-w-6xl mx-auto">
            {/* Sidebar TOC – Desktop */}
            <TableOfContents />

            {/* Hauptinhalt */}
            <div className="flex-1 max-w-4xl">

              {/* ═══ 1. Was bedeutet Remission? ═══ */}
              <ContentSection
                title="Was bedeutet «Remission» und «Genesung»?"
                icon={<Clock className="w-6 h-6 text-[oklch(0.45_0.12_55)]" />}
                id="remission"
                defaultOpen={true}
                preview="In der Forschung werden diese Begriffe präzise definiert, um Fortschritte messbar zu machen."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  In der Forschung werden diese Begriffe präzise definiert, um Fortschritte messbar zu machen.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="h-full border-border/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.85_0.08_55)] flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-[oklch(0.45_0.12_55)]" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                        Symptomatische Remission
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Die Person erfüllt für mindestens 2 Jahre nicht mehr die diagnostischen Kriterien 
                        für BPD. Die typischen Symptome wie emotionale Instabilität, Impulsivität und 
                        Beziehungsprobleme sind deutlich zurückgegangen.
                      </p>
                      <div className="bg-[oklch(0.95_0.03_55)]/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          <strong>85–93%</strong> der Betroffenen erreichen dies innerhalb von 10 Jahren.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full border-border/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.04_145)] flex items-center justify-center mb-4">
                        <Heart className="w-5 h-5 text-[oklch(0.40_0.08_145)]" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                        Vollständige Genesung (Recovery)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Zusätzlich zur Remission: Die Person hat stabile Beziehungen, kann einer 
                        regelmässigen Arbeit oder Ausbildung nachgehen und erlebt eine gute 
                        allgemeine Lebensqualität.
                      </p>
                      <div className="bg-[oklch(0.88_0.04_145)]/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          <strong>50%</strong> erreichen diese umfassende Genesung innerhalb von 10 Jahren.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ContentSection>

              {/* ═══ 2. Das Fortschritt-Paradox ═══ */}
              <ContentSection
                title="Das Fortschritt-Paradox"
                icon={<RefreshCw className="w-6 h-6 text-[oklch(0.55_0.12_55)]" />}
                id="fortschritt-paradox"
                preview="Ein häufiges Phänomen: Gerade wenn es besser wird, kommt ein Rückfall."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ein häufiges Phänomen, das viele Angehörige verwirrt: Gerade wenn es besser wird, kommt ein Rückfall.
                </p>

                <Card className="border-l-4 border-l-[oklch(0.55_0.12_55)] bg-[oklch(0.95_0.04_55)]/30 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-[oklch(0.55_0.12_55)] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Warum passiert das?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Fortschritt bedeutet Veränderung – und Veränderung löst bei Menschen mit Borderline oft Angst aus. 
                          Die Verbesserung selbst kann als Bedrohung erlebt werden: «Was, wenn ich ohne meine Symptome 
                          nicht mehr ich bin?» oder «Was, wenn die anderen mich verlassen, wenn ich «gesund» bin?»
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { title: "Rückfälle nicht als Scheitern werten", desc: "Sie sind Teil des Prozesses, nicht das Ende" },
                    { title: "Fortschritte klein benennen", desc: "Konkret und spezifisch, nicht pauschal" },
                    { title: "Geduld haben", desc: "Genesung verläuft nicht linear" }
                  ].map((item, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Quelle: Gunderson, J.G. (2011), Guidelines for Families
                </p>
              </ContentSection>

              {/* ═══ 3. Realistische Erwartungen ═══ */}
              <ContentSection
                title="Realistische Erwartungen"
                icon={<Heart className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />}
                id="realistische-erwartungen"
                preview="Remission bedeutet nicht «Heilung» im klassischen Sinn."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Remission bedeutet nicht «Heilung» im klassischen Sinn. Viele Menschen mit Borderline berichten, 
                  dass sie auch nach Jahren der Besserung noch mit bestimmten Mustern kämpfen – aber sie haben gelernt, 
                  damit umzugehen.
                </p>

                <Card className="bg-[oklch(0.88_0.04_145)]/20 border-[oklch(0.55_0.10_145)]/30 mb-8">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg text-center italic">
                      «Das Ziel ist nicht Perfektion, sondern ein lebenswertes Leben.»
                    </p>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[oklch(0.95_0.02_25)] border border-[oklch(0.55_0.15_25)]/20">
                    <span className="text-lg font-medium text-foreground block mb-2">❌ Was Remission NICHT bedeutet:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Nie wieder schwierige Gefühle</li>
                      <li>Perfekte Beziehungen</li>
                      <li>Keine Unterstützung mehr nötig</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[oklch(0.95_0.03_145)] border border-[oklch(0.55_0.10_145)]/20">
                    <span className="text-lg font-medium text-foreground block mb-2">✓ Was Remission bedeutet:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Bessere Emotionsregulation</li>
                      <li>Stabilere Beziehungen</li>
                      <li>Mehr Lebensqualität</li>
                    </ul>
                  </div>
                </div>
              </ContentSection>

              {/* ═══ 4. Wie Sie zur Genesung beitragen können ═══ */}
              <ContentSection
                title="Wie Sie zur Genesung beitragen können"
                icon={<Users className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />}
                id="beitragen"
                preview="Als Angehöriger können Sie den Genesungsprozess positiv beeinflussen – ohne sich selbst aufzugeben."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Als Angehöriger können Sie den Genesungsprozess positiv beeinflussen – ohne sich selbst aufzugeben.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "Konsistenz", desc: "Bleiben Sie berechenbar und verlässlich. Ihre Stabilität gibt Halt." },
                    { title: "Realistische Hoffnung", desc: "Vermitteln Sie, dass Besserung möglich ist – ohne Druck." },
                    { title: "Eigene Grenzen", desc: "Ihre Stabilität ist Teil der Genesung. Achten Sie auf sich." },
                    { title: "Professionelle Hilfe", desc: "Unterstützen Sie den Therapieprozess, ohne ihn zu ersetzen." }
                  ].map((item, i) => (
                    <Card key={i} className="border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 5. Was fördert die Genesung? ═══ */}
              <ContentSection
                title="Was fördert die Genesung?"
                icon={<TrendingUp className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />}
                id="faktoren"
                preview="Die Forschung hat mehrere Faktoren identifiziert, die eine positive Entwicklung begünstigen."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Die Forschung hat mehrere Faktoren identifiziert, die eine positive Entwicklung begünstigen.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Spezialisierte Psychotherapie",
                      description: "Evidenzbasierte Therapien wie DBT (Dialektisch-Behaviorale Therapie), MBT (Mentalisierungsbasierte Therapie) oder Schematherapie zeigen die besten Ergebnisse. Die Therapie sollte von erfahrenen Fachpersonen durchgeführt werden.",
                      highlight: "DBT ist die am besten untersuchte Therapieform für BPD"
                    },
                    {
                      title: "Zeit und Geduld",
                      description: "Genesung ist ein Prozess, der Jahre dauern kann – nicht Wochen oder Monate. Die Langzeitstudien zeigen, dass viele Verbesserungen erst nach 4–10 Jahren sichtbar werden.",
                      highlight: "Die meisten Verbesserungen zeigen sich nach 4–10 Jahren"
                    },
                    {
                      title: "Stabile Beziehungen",
                      description: "Unterstützende Beziehungen – zu Familie, Freunden oder Partner:innen – können den Genesungsprozess positiv beeinflussen. Dabei ist es wichtig, dass Angehörige auch auf sich selbst achten.",
                      highlight: "Unterstützende Beziehungen fördern die Genesung"
                    },
                    {
                      title: "Strukturierter Alltag",
                      description: "Eine regelmässige Tagesstruktur, sinnvolle Beschäftigung (Arbeit, Ausbildung, Ehrenamt) und gesunde Routinen geben Halt und fördern die Stabilität.",
                      highlight: "Struktur und Beschäftigung geben Halt"
                    },
                    {
                      title: "Behandlung von Begleiterkrankungen",
                      description: "Viele Menschen mit BPD haben zusätzliche Diagnosen wie Depression, Angststörungen oder PTBS. Die Behandlung dieser Begleiterkrankungen ist wichtig für den Gesamtverlauf.",
                      highlight: "Begleiterkrankungen sollten mitbehandelt werden"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-[oklch(0.65_0.08_145)] flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-foreground mb-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {item.description}
                            </p>
                            <div className="inline-block bg-[oklch(0.95_0.03_145)] rounded-full px-3 py-1">
                              <p className="text-xs text-[oklch(0.40_0.08_145)] font-medium">
                                {item.highlight}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 6. Was bedeutet das für Angehörige? ═══ */}
              <ContentSection
                title="Was bedeutet das für Sie als Angehörige?"
                icon={<Heart className="w-6 h-6 text-[oklch(0.55_0.12_55)]" />}
                id="fuer-angehoerige"
                preview="Hoffnung ist berechtigt, Geduld ist wichtig, Ihre Rolle ist wertvoll."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Hoffnung ist berechtigt",
                      text: "Die Forschung zeigt klar: Die meisten Menschen mit Borderline erleben eine deutliche Besserung. Auch wenn der Weg lang sein kann – Veränderung ist möglich und wahrscheinlich. Diese Erkenntnis kann Ihnen helfen, auch in schwierigen Phasen durchzuhalten."
                    },
                    {
                      title: "Geduld ist wichtig",
                      text: "Genesung braucht Zeit – oft Jahre, nicht Monate. Rückschläge gehören dazu und bedeuten nicht, dass keine Fortschritte gemacht werden. Versuchen Sie, den Blick auf langfristige Entwicklungen zu richten, nicht auf einzelne Krisen."
                    },
                    {
                      title: "Ihre Rolle ist wertvoll",
                      text: "Unterstützende Beziehungen können den Genesungsprozess positiv beeinflussen. Gleichzeitig ist es wichtig, dass Sie Ihre eigenen Grenzen wahren und auf Ihre Selbstfürsorge achten. Sie können nur unterstützen, wenn es Ihnen selbst gut geht."
                    },
                    {
                      title: "Professionelle Hilfe ist entscheidend",
                      text: "Die besten Ergebnisse werden mit spezialisierter Psychotherapie erzielt. Ermutigen Sie Ihren Angehörigen, professionelle Hilfe anzunehmen – aber akzeptieren Sie auch, dass Sie diese Entscheidung nicht erzwingen können."
                    }
                  ].map((item, i) => (
                    <Card key={i} className="h-full bg-white border-[oklch(0.65_0.08_145)]/20">
                      <CardContent className="p-6">
                        <h3 className="font-display text-lg font-semibold text-[oklch(0.55_0.10_145)] mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 7. Evidenz & Grenzen ═══ */}
              <ContentSection
                title="Evidenz & Grenzen"
                icon={<BookOpen className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />}
                id="evidenz"
                preview="Wissenschaftliche Grundlage, Einschränkungen und weiterführende Literatur."
              >
                <Card className="border-border/50">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Wissenschaftliche Grundlage</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          Die hier präsentierten Statistiken stammen aus den beiden grössten und 
                          längsten prospektiven Studien zum Verlauf der Borderline-Persönlichkeitsstörung:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-[oklch(0.55_0.10_145)]">•</span>
                            <span><strong>McLean Study of Adult Development (MSAD)</strong> – 290 Teilnehmende, 
                            Follow-up über 24 Jahre (Zanarini et al.)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[oklch(0.55_0.10_145)]">•</span>
                            <span><strong>Collaborative Longitudinal Personality Disorders Study (CLPS)</strong> – 
                            175 Teilnehmende, Follow-up über 10 Jahre (Gunderson et al.)</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-foreground mb-2">Einschränkungen</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-[oklch(0.55_0.10_145)]">•</span>
                            <span>Die Studien wurden hauptsächlich in den USA durchgeführt; kulturelle 
                            Unterschiede können die Übertragbarkeit beeinflussen.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[oklch(0.55_0.10_145)]">•</span>
                            <span>Die meisten Teilnehmenden waren zu Beginn stationär behandelt worden – 
                            ambulante Patient:innen könnten andere Verläufe zeigen.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[oklch(0.55_0.10_145)]">•</span>
                            <span>Symptomatische Remission bedeutet nicht automatisch gute Lebensqualität – 
                            funktionelle Beeinträchtigungen können bestehen bleiben.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <h3 className="font-medium text-foreground mb-3">Weiterführende Literatur</h3>
                        <div className="space-y-2">
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/20395399/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[oklch(0.55_0.10_145)] hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Zanarini et al. (2010): Time-to-Attainment of Recovery from BPD
                          </a>
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/21464344/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[oklch(0.55_0.10_145)] hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Gunderson et al. (2011): Ten-Year Course of BPD
                          </a>
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/22737693/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[oklch(0.55_0.10_145)] hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Zanarini et al. (2012): 16-year prospective follow-up study
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ContentSection>

              {/* ═══ 8. Infografiken zum Herunterladen ═══ */}
              <ContentSection
                title="Genesung verstehen – auf einen Blick"
                icon={<ImageIcon className="w-6 h-6 text-[oklch(0.45_0.10_145)]" />}
                id="infografiken"
                preview="Alle Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken."
              >
                <p className="text-muted-foreground mb-6">
                  Alle Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Genesung in Zahlen",
                      desc: "Orientierungs-Tracker mit Langzeitdaten",
                      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ItokRaWotdNKpoEx.webp",
                      pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/deGKYGDYjvAXWWxE.pdf"
                    },
                    {
                      title: "Das Fortschritt-Paradox",
                      desc: "Warum Rückfälle zum Weg gehören",
                      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xjUbWjBdgOfAOBSO.webp",
                      pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KKJDrFZiXpfzzolY.pdf"
                    },
                    {
                      title: "Remission vs. Heilung",
                      desc: "Was Besserung wirklich bedeutet",
                      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tbZXsVZHQhEaDQKT.webp",
                      pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HBTJgTGVTPgZVhjh.pdf"
                    },
                    {
                      title: "5 Faktoren, die Genesung fördern",
                      desc: "Säulen-Modell: Was positiv beeinflusst",
                      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VIpkSYqaeNUrJASc.webp",
                      pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EbMUjOHuCQRAoyMK.pdf"
                    },
                    {
                      title: "Ihre Rolle im Genesungsprozess",
                      desc: "Was Sie tun können (und was nicht)",
                      img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/nFoVeLJURBcMhQBT.webp",
                      pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FxkhPJHjIBbWdpWl.pdf"
                    },
                  ].map((item, i) => (
                    <Card key={i} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
                      <div className="aspect-[3/4] overflow-hidden bg-muted">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top" loading="lazy" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            PDF herunterladen
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link href="/materialien">
                    <Button variant="outline">
                      Alle Materialien ansehen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </ContentSection>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[oklch(0.94_0.02_85)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Wie können Sie unterstützen?
              </h2>
              <p className="text-muted-foreground mb-8">
                Erfahren Sie mehr darüber, wie Sie Ihren Angehörigen auf dem Weg zur Genesung 
                begleiten können – ohne sich selbst zu verlieren.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/unterstuetzen/uebersicht">
                  <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)]">
                    Unterstützen lernen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/selbstfuersorge">
                  <Button variant="outline">
                    Selbstfürsorge
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
