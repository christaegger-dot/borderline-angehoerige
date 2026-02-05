import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, CheckCircle2, XCircle, Heart, Lightbulb, Download, Image, Eye, MessageSquare, Sparkles, History, Users, Star, UserCircle } from "lucide-react";
import { Link } from "wouter";
import { TableOfContents } from "@/components/UXEnhancements";

export default function Kommunizieren() {
  return (
    <Layout>
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.90_0.03_250)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.90_0.03_250)] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[oklch(0.45_0.05_250)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.05_250)]">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Kommunizieren
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Gute Kommunikation ist der Schlüssel zu einer stabilen Beziehung. Hier lernen Sie Techniken, die auch in schwierigen Momenten funktionieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Validierung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Validierung: Die wichtigste Technik
              </h2>
              
              <Card className="bg-[oklch(0.85_0.08_55)]/10 border-[oklch(0.65_0.12_55)] mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg">
                    <strong>Validierung</strong> bedeutet, die Gefühle und Erfahrungen eines Menschen anzuerkennen – ohne sie zu bewerten, zu korrigieren oder zu lösen.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Validierung ist nicht dasselbe wie Zustimmung. Sie können ein Gefühl anerkennen, ohne das Verhalten gutzuheissen. Das ist ein wichtiger Unterschied.
              </p>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Die 6 Stufen der Validierung</h3>
              
              <div className="space-y-3">
                {[
                  { level: 1, title: "Präsent sein", example: "Aufmerksam zuhören, Blickkontakt halten", icon: Eye, color: "oklch(0.70_0.08_55)" },
                  { level: 2, title: "Genau reflektieren", example: "\"Du sagst, du fühlst dich allein gelassen.\"", icon: MessageSquare, color: "oklch(0.65_0.10_55)" },
                  { level: 3, title: "Unausgesprochenes benennen", example: "\"Das klingt, als wärst du auch wütend darüber.\"", icon: Sparkles, color: "oklch(0.60_0.12_55)" },
                  { level: 4, title: "Verhalten aus der Geschichte erklären", example: "\"Nach allem, was du erlebt hast, ist es verständlich, dass du so reagierst.\"", icon: History, color: "oklch(0.55_0.12_55)" },
                  { level: 5, title: "Normalität bestätigen", example: "\"Jeder würde in dieser Situation so fühlen.\"", icon: Users, color: "oklch(0.50_0.12_55)" },
                  { level: 6, title: "Radikale Echtheit", example: "\"Ich glaube an dich. Du schaffst das.\"", icon: Star, color: "oklch(0.45_0.14_55)" }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.level} className="border-border/50 hover:shadow-md transition-all duration-300" style={{ borderLeftWidth: '4px', borderLeftColor: item.color }}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-3">
                            <span 
                              className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.level}
                            </span>
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `color-mix(in oklch, ${item.color} 15%, white)` }}
                            >
                              <Icon className="w-5 h-5" style={{ color: item.color }} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                            <p className="text-muted-foreground text-sm mt-1 bg-muted/30 rounded-lg px-3 py-2 italic">{item.example}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* SET-Kommunikation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                SET-Kommunikation
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                SET ist eine Kommunikationstechnik, die speziell für den Umgang mit Menschen mit Borderline entwickelt wurde. Sie besteht aus drei Elementen:
              </p>
              
              <div className="grid gap-4">
                {[
                  {
                    letter: "S",
                    title: "Support (Unterstützung)",
                    description: "Drücken Sie Ihre Sorge und Ihr Mitgefühl aus.",
                    example: "\"Ich mache mir Sorgen um dich. Ich möchte dir helfen.\"",
                    color: "oklch(0.65 0.08 145)"
                  },
                  {
                    letter: "E",
                    title: "Empathy (Empathie)",
                    description: "Zeigen Sie, dass Sie die Gefühle verstehen.",
                    example: "\"Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.\"",
                    color: "oklch(0.65 0.12 55)"
                  },
                  {
                    letter: "T",
                    title: "Truth (Wahrheit)",
                    description: "Benennen Sie die Realität und mögliche Konsequenzen.",
                    example: "\"Wenn du jetzt gehst, kann ich nicht wissen, ob es dir gut geht. Das macht mir Angst.\"",
                    color: "oklch(0.45 0.05 250)"
                  }
                ].map((item) => (
                  <Card key={item.letter} style={{ borderColor: item.color }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Praktische Tipps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-[oklch(0.60_0.15_85)]" />
                Praktische Kommunikationstipps
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)] bg-[oklch(0.92_0.04_145)]/30">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.10_145)] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      Hilfreich
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Ich-Botschaften verwenden",
                        "Ruhig und langsam sprechen",
                        "Pausen zulassen",
                        "Gefühle benennen",
                        "Nachfragen statt annehmen"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.15_25)] bg-[oklch(0.92_0.05_25)]/30">
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.15_25)] flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-white" />
                      </div>
                      Vermeiden
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        "\"Du machst immer...\"",
                        "\"Beruhige dich!\"",
                        "\"Das ist doch nicht so schlimm\"",
                        "Sarkasmus oder Ironie",
                        "Unterbrechen oder Augenrollen"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground">
                          <XCircle className="w-4 h-4 text-[oklch(0.55_0.15_25)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.45_0.05_250)]" />
                Materialien zum Thema
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Validierungs-Stufenmodell",
                    type: "PNG",
                    rating: "22/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GpULhcISAfiJyzgJ.png"
                  },
                  {
                    title: "SET-Kommunikation",
                    type: "PNG",
                    rating: "22/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/cfAdmAmZEXbNNxZl.png"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[oklch(0.90_0.03_250)] flex items-center justify-center flex-shrink-0">
                          <Image className="w-4 h-4 text-[oklch(0.45_0.05_250)]" />
                        </div>
                        <span className="text-xs bg-[oklch(0.92_0.05_145)] text-[oklch(0.40_0.08_145)] px-2 py-0.5 rounded-full">
                          {item.rating}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground text-sm mb-2">{item.title}</h3>
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
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="link" className="text-[oklch(0.45_0.05_250)]">
                    Alle Materialien ansehen →
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Konkrete Beispiel-Dialoge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Konkrete Formulierungen für den Alltag
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hier finden Sie konkrete Sätze, die Sie in verschiedenen Situationen verwenden können. Passen Sie sie an Ihre Beziehung und Situation an.
              </p>

              {/* Situation 1: Intensive Emotionen */}
              <Card className="mb-4 border-[oklch(0.65_0.12_55)]/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 text-lg">
                    🌊 Wenn Ihr Angehöriger von Emotionen überflutet wird
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich sehe, dass dich das gerade sehr mitnimmt. Ich bin hier. Wir müssen das jetzt nicht lösen."</p>
                    </div>
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Das klingt wirklich schmerzhaft. Möchtest du mir mehr erzählen, oder soll ich einfach bei dir sein?"</p>
                    </div>
                    <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.15_25)]">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Beruhige dich!" / "Das ist doch nicht so schlimm." / "Du überreagierst."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 2: Vorwürfe */}
              <Card className="mb-4 border-[oklch(0.65_0.12_55)]/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 text-lg">
                    ⚡ Wenn Sie mit Vorwürfen konfrontiert werden
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich höre, dass du dich von mir im Stich gelassen fühlst. Das war nicht meine Absicht. Kannst du mir sagen, was du gerade brauchst?"</p>
                    </div>
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Es tut mir leid, dass mein Verhalten dich verletzt hat. Das wollte ich nicht. Lass uns darüber sprechen."</p>
                    </div>
                    <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.15_25)]">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Du bist unfair!" / "Das stimmt doch gar nicht!" / "Du verdrehst alles."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 3: Rückzug */}
              <Card className="mb-4 border-[oklch(0.65_0.12_55)]/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 text-lg">
                    🚪 Wenn Ihr Angehöriger sich zurückzieht
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich merke, dass du gerade Abstand brauchst. Das ist okay. Ich bin da, wenn du bereit bist."</p>
                    </div>
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Du musst jetzt nicht reden. Ich lasse dir Raum. Sag mir einfach, wenn du etwas brauchst."</p>
                    </div>
                    <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.15_25)]">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Rede endlich mit mir!" / "Du kannst nicht einfach weglaufen!" / "Typisch, du machst dicht."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 4: Schwarz-Weiss-Denken */}
              <Card className="mb-4 border-[oklch(0.65_0.12_55)]/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 text-lg">
                    ⚫⚪ Bei Schwarz-Weiss-Aussagen ("Du liebst mich nicht mehr!")
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich verstehe, dass es sich gerade so anfühlt. Meine Gefühle für dich haben sich nicht geändert, auch wenn wir gerade Schwierigkeiten haben."</p>
                    </div>
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Ich liebe dich. Und ich bin auch frustriert über diese Situation. Beides ist wahr."</p>
                    </div>
                    <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.15_25)]">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Das ist Quatsch!" / "Natürlich liebe ich dich, hör auf damit!" / "Schon wieder diese Diskussion."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 5: Nach einem Streit */}
              <Card className="mb-4 border-[oklch(0.65_0.12_55)]/30">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 text-lg">
                    🕊️ Nach einem Streit wieder ins Gespräch kommen
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich möchte über gestern sprechen, wenn du bereit bist. Nicht um Recht zu haben, sondern um zu verstehen."</p>
                    </div>
                    <div className="bg-[oklch(0.92_0.03_145)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.10_145)]">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Es tut mir leid, wie ich reagiert habe. Ich war überfordert. Können wir nochmal von vorne anfangen?"</p>
                    </div>
                    <div className="bg-[oklch(0.95_0.02_25)] rounded-lg p-4 border-l-4 border-[oklch(0.55_0.15_25)]">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Siehst du jetzt ein, dass du falsch lagst?" / "Können wir das einfach vergessen?" / Schweigen als Strafe.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                          In Partnerschaften ist die emotionale Intensität oft am höchsten. Validierung bedeutet nicht, dass Sie mit allem einverstanden sind. Sie können die Gefühle Ihres Partners anerkennen und trotzdem bei Ihrer eigenen Wahrnehmung bleiben.
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
                          Die Eltern-Kind-Dynamik macht Kommunikation besonders komplex. Alte Muster sitzen tief. Versuchen Sie, Ihr erwachsenes Kind als eigenständige Person zu sehen – nicht als das Kind, das Sie einmal großgezogen haben. Das verändert den Ton.
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
                          Sie haben vielleicht gelernt, Ihre eigenen Gefühle zu unterdrücken, um Ihren Elternteil nicht zu «provozieren». Ihre Gefühle sind genauso gültig. Sie dürfen auch mal sagen: «Ich brauche gerade Abstand» – ohne schlechtes Gewissen.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen">
                <Button variant="ghost">
                  ← Unterstützen
                </Button>
              </Link>
              <Link href="/grenzen">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter: Grenzen setzen
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
