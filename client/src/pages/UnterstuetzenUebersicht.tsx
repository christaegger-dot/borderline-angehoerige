import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, ArrowRight, CheckCircle2, XCircle, Lightbulb, Download, Image, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function UnterstuetzenUebersicht() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.85_0.08_55)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/verstehen" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zu Verstehen
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.08_55)] flex items-center justify-center">
                <Compass className="w-6 h-6 text-[oklch(0.45_0.12_55)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.12_55)]">Lesezeit: 4 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Wie kann ich helfen?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Als Angehöriger wollen Sie helfen – das ist natürlich und verständlich. Aber wie? Hier erfahren Sie, welche Rolle Sie einnehmen können und wo die Grenzen liegen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Leuchtturm Metapher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.85_0.08_55)]/20 border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🏠</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        Die Leuchtturm-Metapher
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Stellen Sie sich vor, Sie sind ein Leuchtturm. Sie stehen fest auf Ihrem Fundament, während die Wellen um Sie herum toben. Sie können das Meer nicht beruhigen – aber Sie können Licht geben und Orientierung bieten. Sie zeigen den Weg, ohne selbst ins Wasser zu springen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ihre Rolle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Ihre Rolle klären
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Was Sie sind */}
                <Card className="border-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      Was Sie sein können
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Ein verlässlicher Anker",
                        "Ein geduldiger Zuhörer",
                        "Ein Übungspartner für neue Skills",
                        "Ein Mensch, der Hoffnung vermittelt",
                        "Jemand, der Grenzen setzt und hält"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-[oklch(0.55_0.10_145)]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Was Sie nicht sind */}
                <Card className="border-[oklch(0.55_0.15_25)]">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-[oklch(0.55_0.15_25)]" />
                      Was nicht Ihre Rolle ist
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Der Therapeut oder die Therapeutin",
                        "Der Retter, der alles löst",
                        "Der Sündenbock für alle Probleme",
                        "Der Kontrolleur des Verhaltens",
                        "Der Verantwortliche für die Genesung"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-[oklch(0.55_0.15_25)]">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Das verlorene Kind */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Das verlorene Kind verstehen
              </h2>
              
              <Card className="bg-[oklch(0.95_0.04_55)]/30 border-[oklch(0.65_0.12_55)]/50">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed mb-4">
                    Stellen Sie sich ein <strong>7-jähriges Kind</strong> vor, das sich allein auf dem Times Square verirrt hat. Es ist überwältigt, verängstigt und reagiert impulsiv. Würden Sie dieses Kind anschreien oder ihm Vorwürfe machen?
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Menschen mit Borderline erleben in emotionalen Krisen oft genau diesen Zustand: Sie fühlen sich verloren, überwältigt und allein – auch wenn sie erwachsen sind. Ihr emotionales Erleben entspricht in diesen Momenten dem eines verängstigten Kindes.
                  </p>
                  <div className="bg-[oklch(0.92_0.04_145)]/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Was hilft:</strong> Reagieren Sie so, wie Sie einem verlorenen Kind begegnen würden – mit Ruhe, Geduld und der Versicherung: «Ich bin hier. Du bist nicht allein.»
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-3">
                Quelle: Mason & Kreger, "Schluss mit dem Eiertanz" (2010)
              </p>
            </motion.div>

            {/* Konsistenz-Prinzip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Das Konsistenz-Prinzip
              </h2>
              
              <Card className="bg-[oklch(0.95_0.03_145)]/50 border-[oklch(0.55_0.10_145)]/30 mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    <strong>Kernaussage:</strong> Wenn mehrere Angehörige involviert sind, müssen alle an einem Strang ziehen.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Inkonsistentes Verhalten verschiedener Familienmitglieder kann die Situation verschlimmern. Wenn eine Person Grenzen setzt und eine andere sie aufhebt, entsteht Verwirrung und die Spaltungsdynamik wird verstärkt.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)]" />
                      Hilfreich
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Gemeinsame Absprachen treffen</li>
                      <li>• Einheitliche Grenzen setzen</li>
                      <li>• Regelmässige Familien-Meetings</li>
                      <li>• Sich gegenseitig unterstützen</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-[oklch(0.55_0.15_25)]">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[oklch(0.55_0.15_25)]" />
                      Vermeiden
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Widersprüchliche Botschaften</li>
                      <li>• «Guter Cop / Böser Cop»-Dynamik</li>
                      <li>• Heimliche Absprachen mit dem Betroffenen</li>
                      <li>• Sich gegeneinander ausspielen lassen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Gunderson, J.G. et al. (2011). Family Guidelines for BPD
              </p>
            </motion.div>

            {/* Die drei Säulen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Die drei Säulen hilfreicher Unterstützung
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "1. Präsenz",
                    description: "Da sein, ohne zu urteilen. Zuhören, ohne sofort lösen zu wollen. Ihre blosse Anwesenheit kann beruhigend wirken.",
                    example: "\"Ich bin hier. Du musst das nicht alleine durchstehen.\""
                  },
                  {
                    title: "2. Validierung",
                    description: "Die Gefühle Ihres Angehörigen anerkennen, ohne ihnen zuzustimmen oder sie zu rechtfertigen. Verstehen heisst nicht gutheissen.",
                    example: "\"Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.\""
                  },
                  {
                    title: "3. Stabilität",
                    description: "Ein verlässlicher Anker sein. Berechenbar bleiben, auch wenn alles andere schwankt. Ihre Ruhe kann ansteckend sein.",
                    example: "Klare Routinen, verlässliche Absprachen, ruhiges Auftreten in Krisen."
                  }
                ].map((pillar, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-display font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-muted-foreground mb-3">{pillar.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">Beispiel: {pillar.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* 15 Leitlinien Übersicht */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                15 evidenzbasierte Leitlinien
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Diese Leitlinien wurden von Dr. John Gunderson (McLean Hospital/Harvard) entwickelt und sind wissenschaftlich fundiert. Sie fassen zusammen, was wirklich hilft.
              </p>
              
              <div className="space-y-6">
                {/* Ziele */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Ziele: Langsam vorgehen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.10_145)] font-bold">1.</span>
                        <span><strong className="text-foreground">Veränderung ist schwierig</strong> – Fortschritt kann Verlassensängste auslösen und zu Rückfällen führen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.10_145)] font-bold">2.</span>
                        <span><strong className="text-foreground">Erwartungen senken</strong> – Kleine Schritte feiern, realistische Ziele setzen.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Familienumgebung */}
                <Card className="border-l-4 border-l-[oklch(0.65_0.12_55)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Familienumgebung gestalten</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.65_0.12_55)] font-bold">3.</span>
                        <span><strong className="text-foreground">Ruhe bewahren</strong> – Eine kühle, ruhige Atmosphäre schaffen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.65_0.12_55)] font-bold">4.</span>
                        <span><strong className="text-foreground">Routinen beibehalten</strong> – Struktur gibt Sicherheit.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.65_0.12_55)] font-bold">5.</span>
                        <span><strong className="text-foreground">Zeit zum Reden finden</strong> – Regelmässige, geplante Gespräche.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Krisen managen */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.15_35)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Krisen managen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.15_35)] font-bold">6.</span>
                        <span><strong className="text-foreground">Nicht defensiv werden</strong> – Nicht rechtfertigen oder verteidigen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.15_35)] font-bold">7.</span>
                        <span><strong className="text-foreground">Selbstverletzendes Verhalten ernst nehmen</strong> – Aufmerksamkeit geben, nicht ignorieren.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.15_35)] font-bold">8.</span>
                        <span><strong className="text-foreground">Zuhören</strong> – Gefühle anerkennen, nicht wegargumentieren.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Probleme angehen */}
                <Card className="border-l-4 border-l-[oklch(0.45_0.05_250)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Probleme angehen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.45_0.05_250)] font-bold">9.</span>
                        <span><strong className="text-foreground">Drei «Musts»</strong> – Einbeziehen, fragen ob sie können, fragen ob Hilfe gewünscht ist.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.45_0.05_250)] font-bold">10.</span>
                        <span><strong className="text-foreground">Familie handelt gemeinsam</strong> – Konsistenz zwischen allen Familienmitgliedern.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.45_0.05_250)] font-bold">11.</span>
                        <span><strong className="text-foreground">Kommunikation mit Therapeuten</strong> – Bedenken offen äussern.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Grenzen setzen */}
                <Card className="border-l-4 border-l-[oklch(0.50_0.12_320)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Grenzen setzen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.50_0.12_320)] font-bold">12.</span>
                        <span><strong className="text-foreground">Grenzen klar kommunizieren</strong> – Erwartungen deutlich machen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.50_0.12_320)] font-bold">13.</span>
                        <span><strong className="text-foreground">Natürliche Konsequenzen zulassen</strong> – Nicht vor der Realität schützen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.50_0.12_320)] font-bold">14.</span>
                        <span><strong className="text-foreground">Missbrauch nicht tolerieren</strong> – Verbale/körperliche Gewalt = rote Linie.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[oklch(0.50_0.12_320)] font-bold">15.</span>
                        <span><strong className="text-foreground">Drohungen und Ultimaten</strong> – Nur aussprechen, wenn Sie sie durchziehen können.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Gunderson, J.G. et al. (2011). Family Guidelines for BPD. McLean Hospital / NEA-BPD
              </p>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.45_0.12_55)]" />
                Materialien zum Thema
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Im Krisenmodus – Orientierung geben",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xtLfLjrMcXYGTwxM.png"
                  },
                  {
                    title: "Ihre Rolle klären",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vaCFqwCuuKxsdrNX.png"
                  },
                  {
                    title: "Drei Säulen hilfreicher Unterstützung",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YHowYJcztGiSoHgG.png"
                  },
                  {
                    title: "Konsistenz-Prinzip",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xTKHgAUyCVKxSkUf.png"
                  },
                  {
                    title: "6 Leitlinien für Angehörige",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XnTABWiNreMbJdDF.png"
                  },
                  {
                    title: "Beziehungs-Achtsamkeit",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/LpcrkEadNAXxIvPd.png"
                  },
                  {
                    title: "4 Alltags-Tipps",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/uOrYGTcGgbyHKrGp.png"
                  }
                ].map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">{item.title}</h4>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="outline" size="sm">
                    Alle Materialien anzeigen
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Wichtiger Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.95_0.03_85)] border-[oklch(0.60_0.10_85)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-[oklch(0.60_0.10_85)] flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        Denken Sie daran
                      </h3>
                      <p className="text-muted-foreground">
                        Unterstützen heisst nicht, sich selbst aufzugeben. Sie können nur dann ein guter Leuchtturm sein, wenn Ihr eigenes Fundament stabil ist. Achten Sie auf Ihre eigenen Grenzen und Bedürfnisse.
                      </p>
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
              <Link href="/verstehen">
                <Button variant="ghost">
                  ← Verstehen
                </Button>
              </Link>
              <Link href="/unterstuetzen/alltag">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: Im Alltag unterstützen
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
