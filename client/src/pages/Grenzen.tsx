import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, ArrowRight, CheckCircle2, Heart, AlertTriangle, Download, FileText, Image } from "lucide-react";
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
              
              <div className="space-y-4">
                {[
                  {
                    title: "Zeitliche Grenzen",
                    description: "Wann sind Sie erreichbar? Wann brauchen Sie Ruhe?",
                    example: "\"Nach 22 Uhr bin ich nicht mehr erreichbar für Telefonate.\""
                  },
                  {
                    title: "Emotionale Grenzen",
                    description: "Welches Verhalten können Sie tolerieren? Was nicht?",
                    example: "\"Wenn du mich anschreist, verlasse ich den Raum.\""
                  },
                  {
                    title: "Physische Grenzen",
                    description: "Ihr Körper, Ihr Raum, Ihre Privatsphäre.",
                    example: "\"Mein Zimmer ist mein Rückzugsort. Bitte klopfe an.\""
                  },
                  {
                    title: "Finanzielle Grenzen",
                    description: "Wie viel Unterstützung können und wollen Sie geben?",
                    example: "\"Ich kann dir einmal im Monat mit X Franken helfen.\""
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">{item.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                    title: "Grenzen setzen: Praktische Anleitung",
                    type: "PNG",
                    rating: "24/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FhSNwNMQxOkbvjRF.png",
                    icon: Image
                  },
                  {
                    title: "Grenzsetzung als Orientierung",
                    type: "PDF",
                    rating: "24/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/iZlDzSNGeurWekaN.pdf",
                    icon: FileText
                  },
                  {
                    title: "Grenzen setzen: 5 praktische Ansätze",
                    type: "PNG",
                    rating: "23/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DLqPLzKxrfPhVjbx.png",
                    icon: Image
                  },
                  {
                    title: "Die Grenzen-Pyramide",
                    type: "PNG",
                    rating: "22/24",
                    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VMXGFPguowqwxleh.png",
                    icon: Image
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
