import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, ArrowRight, CheckCircle2, Heart, AlertTriangle, Download, FileText, Image, Clock, HeartHandshake, Home, Wallet, Users, Baby, UserCircle } from "lucide-react";
import { Link } from "wouter";

export default function Grenzen() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.06_35)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.06_35)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[oklch(0.50_0.15_35)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.50_0.15_35)]">Lesezeit: 12 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Grenzen setzen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Grenzen sind keine Mauern – sie sind Leitplanken. Sie schützen Sie und geben Ihrem Angehörigen Orientierung. Hier lernen Sie, wie Sie sie liebevoll, aber klar kommunizieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Warum Grenzen wichtig sind */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Warum Grenzen wichtig sind
              </h2>
              
              <Card className="bg-[oklch(0.92_0.06_35)]/20 border-[oklch(0.55_0.15_35)] mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed">
                    Grenzen zu setzen ist kein Zeichen von Lieblosigkeit – es ist ein Zeichen von Selbstachtung und Respekt. Klare Grenzen helfen beiden Seiten:
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Für Sie:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Schutz vor Burnout
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Erhalt der eigenen Identität
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Langfristige Beziehungsfähigkeit
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Für Ihren Angehörigen:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Klare Orientierung
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Sicherheit durch Berechenbarkeit
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        Modell für gesunde Beziehungen
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Arten von Grenzen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Arten von Grenzen
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Zeitliche Grenzen",
                    description: "Wann sind Sie erreichbar? Wann brauchen Sie Ruhe?",
                    example: "\"Nach 22 Uhr bin ich nicht mehr erreichbar für Telefonate.\"",
                    icon: Clock,
                    color: "oklch(0.55_0.12_250)",
                    bgColor: "oklch(0.92_0.04_250)"
                  },
                  {
                    title: "Emotionale Grenzen",
                    description: "Welches Verhalten können Sie tolerieren? Was nicht?",
                    example: "\"Wenn du mich anschreist, verlasse ich den Raum.\"",
                    icon: HeartHandshake,
                    color: "oklch(0.55_0.15_25)",
                    bgColor: "oklch(0.92_0.05_25)"
                  },
                  {
                    title: "Physische Grenzen",
                    description: "Ihr Körper, Ihr Raum, Ihre Privatsphäre.",
                    example: "\"Mein Zimmer ist mein Rückzugsort. Bitte klopfe an.\"",
                    icon: Home,
                    color: "oklch(0.55_0.10_145)",
                    bgColor: "oklch(0.92_0.04_145)"
                  },
                  {
                    title: "Finanzielle Grenzen",
                    description: "Wie viel Unterstützung können und wollen Sie geben?",
                    example: "\"Ich kann dir einmal im Monat mit X Franken helfen.\"",
                    icon: Wallet,
                    color: "oklch(0.55_0.12_85)",
                    bgColor: "oklch(0.92_0.04_85)"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-300" style={{ borderTopWidth: '4px', borderTopColor: item.color }}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: item.bgColor }}
                          >
                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 mt-3">
                          <p className="text-sm text-foreground italic">{item.example}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* Wie Grenzen kommunizieren */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Grenzen liebevoll kommunizieren
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die Art, wie Sie Grenzen kommunizieren, ist genauso wichtig wie die Grenze selbst. Verwenden Sie die <strong>LMK-Formel</strong>:
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    letter: "L",
                    title: "Liebe zeigen",
                    description: "Beginnen Sie mit einer Bestätigung der Beziehung.",
                    example: "\"Du bist mir wichtig, und deshalb sage ich dir das...\""
                  },
                  {
                    letter: "M",
                    title: "Meine Grenze benennen",
                    description: "Klar und konkret, ohne Vorwürfe.",
                    example: "\"Ich brauche jeden Abend eine Stunde für mich allein.\""
                  },
                  {
                    letter: "K",
                    title: "Konsequenz erklären",
                    description: "Was passiert, wenn die Grenze überschritten wird?",
                    example: "\"Wenn das nicht möglich ist, werde ich in ein anderes Zimmer gehen.\""
                  }
                ].map((item) => (
                  <Card key={item.letter} className="border-l-4 border-l-[oklch(0.65_0.12_55)]">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-lg bg-[oklch(0.65_0.12_55)] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-[oklch(0.85_0.08_55)]/20 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* DEAR-Technik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Die DEAR-Technik (nach Marsha Linehan)
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die DEAR-Technik aus der Dialektisch-Behavioralen Therapie (DBT) hilft Ihnen, Grenzen klar und respektvoll zu kommunizieren – ohne Vorwürfe, aber mit Wirkung.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    letter: "D",
                    title: "Describe (Beschreiben)",
                    description: "Beschreiben Sie die Situation sachlich, ohne Bewertung oder Interpretation.",
                    example: "«Wenn du mich anrufst und ich nicht sofort abhebe...»"
                  },
                  {
                    letter: "E",
                    title: "Express (Ausdrücken)",
                    description: "Drücken Sie Ihre Gefühle aus – mit Ich-Botschaften, nicht mit Vorwürfen.",
                    example: "«...fühle ich mich unter Druck gesetzt.»"
                  },
                  {
                    letter: "A",
                    title: "Assert (Bitten)",
                    description: "Formulieren Sie eine klare Bitte oder Grenze – konkret und umsetzbar.",
                    example: "«Ich möchte, dass du mir 30 Minuten Zeit gibst, bevor du erneut anrufst.»"
                  },
                  {
                    letter: "R",
                    title: "Reinforce (Verstärken)",
                    description: "Zeigen Sie die positiven Konsequenzen auf – was hat die andere Person davon?",
                    example: "«Dann kann ich entspannter mit dir sprechen und bin wirklich für dich da.»"
                  }
                ].map((item) => (
                  <Card key={item.letter} className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-full bg-[oklch(0.55_0.10_145)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-[oklch(0.92_0.04_145)]/50 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-[oklch(0.95_0.03_145)]/50 border-[oklch(0.55_0.10_145)]/30">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">Beispiel komplett:</h4>
                  <p className="text-foreground leading-relaxed italic">
                    «Wenn du mich anrufst und ich nicht sofort abhebe <span className="text-muted-foreground">(D)</span>, 
                    fühle ich mich unter Druck gesetzt <span className="text-muted-foreground">(E)</span>. 
                    Ich möchte, dass du mir 30 Minuten Zeit gibst, bevor du erneut anrufst <span className="text-muted-foreground">(A)</span>. 
                    Dann kann ich entspannter mit dir sprechen und bin wirklich für dich da <span className="text-muted-foreground">(R)</span>.»
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
              </p>
            </motion.div>

            {/* Konkrete Beispiel-Dialoge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Konkrete Formulierungen für schwierige Situationen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hier finden Sie Beispielsätze, die Sie direkt verwenden können. Das Prinzip: <strong>Spiegeln statt Aufnehmen</strong> – Sie nehmen die Gefühle wahr, ohne sie zu übernehmen.
              </p>
              
              <div className="space-y-6">
                {/* Situation 1 */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Bei Vorwürfen und Schuldzuweisungen</h3>
                    <div className="space-y-3">
                      <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Statt:</p>
                        <p className="text-sm text-foreground line-through">"Das stimmt doch gar nicht!" oder "Du bist ungerecht!"</p>
                      </div>
                      <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                        <p className="text-sm text-foreground font-medium">"Ich höre, dass du das so siehst. Ich sehe es anders, und ich möchte verstehen, was dich beschäftigt."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Situation 2 */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Bei intensiven Gefühlsausbrüchen</h3>
                    <div className="space-y-3">
                      <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Statt:</p>
                        <p className="text-sm text-foreground line-through">"Beruhige dich!" oder "Das ist doch nicht so schlimm!"</p>
                      </div>
                      <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                        <p className="text-sm text-foreground font-medium">"Ich sehe, dass du gerade sehr aufgewühlt bist. Das klingt wirklich schwer für dich. Ich bin hier."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Situation 3 */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Beim Grenzen setzen</h3>
                    <div className="space-y-3">
                      <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Statt:</p>
                        <p className="text-sm text-foreground line-through">"Ich halte das nicht mehr aus!" oder "Du machst mich fertig!"</p>
                      </div>
                      <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                        <p className="text-sm text-foreground font-medium">"Ich liebe dich, und gleichzeitig brauche ich jetzt eine Pause. Lass uns in einer Stunde weiterreden, wenn wir beide ruhiger sind."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Situation 4 */}
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Bei Drohungen oder Manipulation</h3>
                    <div className="space-y-3">
                      <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Statt:</p>
                        <p className="text-sm text-foreground line-through">Nachgeben aus Angst oder Schuldgefühlen</p>
                      </div>
                      <div className="bg-[oklch(0.92_0.05_145)] rounded-lg p-3">
                        <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                        <p className="text-sm text-foreground font-medium">"Ich nehme deine Gefühle ernst. Und ich bleibe bei meiner Entscheidung. Beides ist möglich."</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-[oklch(0.95_0.02_55)] border-[oklch(0.85_0.05_55)]">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tipp:</strong> Üben Sie diese Sätze laut vor dem Spiegel oder mit einer Vertrauensperson. In emotionalen Momenten ist es leichter, auf eingeübte Formulierungen zurückzugreifen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Häufige Fehler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-[oklch(0.55_0.15_25)]" />
                Häufige Fehler vermeiden
              </h2>
              
              <Card className="border-l-4 border-l-[oklch(0.55_0.15_25)] bg-[oklch(0.95_0.03_25)]">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      { wrong: "Grenzen im Affekt setzen", right: "In ruhigen Momenten besprechen" },
                      { wrong: "Grenzen als Strafe formulieren", right: "Als Selbstfürsorge erklären" },
                      { wrong: "Grenzen nicht durchhalten", right: "Konsequent bleiben" },
                      { wrong: "Zu viele Grenzen auf einmal", right: "Schrittweise einführen" },
                      { wrong: "Grenzen ohne Vorwarnung", right: "Ankündigen und erklären" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-[oklch(0.55_0.15_25)] flex-shrink-0">✗</span>
                        <span className="text-muted-foreground line-through">{item.wrong}</span>
                        <span className="text-[oklch(0.55_0.10_145)]">→</span>
                        <span className="text-foreground">{item.right}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Materialien zum Thema
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[

                  {
                    title: "Vier Arten von Grenzen",
                    description: "Zeitliche, emotionale, physische und Kommunikations-Grenzen",
                    type: "PNG",
                    rating: "NEU",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xBJjrppYdghIkNtF.png",
                    icon: Image,
                    isNew: true
                  },
                  {
                    title: "Die Grenzen-Leiter",
                    description: "Eskalationsstufen bei Grenzverletzungen",
                    type: "PNG",
                    rating: "NEU",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VGuivmsKMULEAWgP.png",
                    icon: Image,
                    isNew: true
                  },
                  {
                    title: "Grenzen setzen",
                    description: "Schritt-für-Schritt-Anleitung",
                    type: "PNG",
                    rating: "NEU",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yUNPfTDyQWmciNRz.png",
                    icon: Image,
                    isNew: true
                  },
                  {
                    title: "Grenzsetzung als Orientierung",
                    description: "Ausführliches PDF-Handout",
                    type: "PDF",
                    rating: "24/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WnqfDwuBRErJrLPY.pdf",
                    icon: FileText,
                    isNew: false
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[oklch(0.92_0.06_35)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-[oklch(0.50_0.15_35)]" />
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.isNew ? 'bg-[oklch(0.75_0.15_55)] text-white' : 'bg-[oklch(0.92_0.05_145)] text-[oklch(0.40_0.08_145)]'}`}>
                            {item.rating}
                          </span>
                        </div>
                        <h3 className="font-medium text-foreground text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{item.type}</span>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="link" className="text-[oklch(0.55_0.15_35)]">
                    Alle Materialien ansehen →
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hinweise für verschiedene Angehörigengruppen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-[oklch(0.55_0.12_250)]" />
                Hinweise für Ihre Situation
              </h2>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.15_35)] bg-[oklch(0.97_0.01_35)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.06_35)] flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-[oklch(0.55_0.15_35)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als Partner/in</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Die Entscheidung, in der Beziehung zu bleiben, ist Ihre – und beide Optionen sind legitim. Grenzen zu setzen bedeutet nicht, die Beziehung aufzugeben. Es bedeutet, sie auf eine gesündere Basis zu stellen. Erlauben Sie sich, auch Ihre eigenen Bedürfnisse ernst zu nehmen.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.12_250)] bg-[oklch(0.97_0.01_250)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_250)] flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[oklch(0.55_0.12_250)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als Elternteil</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sie tragen keine Verantwortung für die Erkrankung Ihres Kindes – aber Sie können ein stabilisierender Faktor sein. Grenzen zu setzen ist kein Zeichen von Ablehnung, sondern ein Modell für gesunde Beziehungen. Ihr erwachsenes Kind braucht Eltern, die auch auf sich selbst achten.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)] bg-[oklch(0.97_0.01_145)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_145)] flex items-center justify-center flex-shrink-0">
                        <UserCircle className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als erwachsenes Kind</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sie sind nicht verpflichtet, die emotionalen Bedürfnisse Ihres Elternteils zu erfüllen – das war nie Ihre Aufgabe. Grenzen zu setzen kann sich wie Verrat anfühlen, ist aber ein wichtiger Schritt zu Ihrer eigenen emotionalen Gesundheit. Sie dürfen Ihr eigenes Leben leben.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Wichtiger Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.88_0.04_145)]/30 border-[oklch(0.65_0.08_145)]">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Grenzen zu setzen fühlt sich am Anfang oft unangenehm an – für beide Seiten. Das ist normal. Bleiben Sie freundlich, aber bestimmt. Mit der Zeit werden klare Grenzen zu einem Fundament für eine gesündere Beziehung.
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
              <Link href="/kommunizieren">
                <Button variant="ghost">
                  ← Kommunizieren
                </Button>
              </Link>
              <Link href="/selbstfuersorge">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: Selbstfürsorge
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
