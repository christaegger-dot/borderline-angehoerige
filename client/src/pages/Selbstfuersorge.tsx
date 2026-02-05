import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Heart, AlertTriangle, Users } from "lucide-react";
import { Link } from "wouter";

export default function Selbstfuersorge() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.05_320)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_320)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[oklch(0.50_0.12_320)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.50_0.12_320)]">Lesezeit: 10 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Selbstfürsorge
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Sie können nur dann für andere da sein, wenn Sie auch für sich selbst sorgen. Selbstfürsorge ist kein Luxus – sie ist eine Notwendigkeit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Warum Selbstfürsorge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.92_0.05_320)]/20 border-[oklch(0.55_0.12_320)]">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed text-lg italic">
                    "Wenn Sie sich um einen Menschen mit Borderline kümmern, ist es wie bei einem Langstreckenflug: Setzen Sie zuerst Ihre eigene Sauerstoffmaske auf, bevor Sie anderen helfen."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Warnsignale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Warnsignale für Überlastung
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Achten Sie auf diese Anzeichen – sie zeigen, dass Sie mehr Selbstfürsorge brauchen:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Ständige Erschöpfung, auch nach Schlaf",
                  "Reizbarkeit und kurze Zündschnur",
                  "Vernachlässigung eigener Bedürfnisse",
                  "Sozialer Rückzug von Freunden",
                  "Schlafprobleme oder Appetitveränderungen",
                  "Gefühl, nie genug zu tun",
                  "Hoffnungslosigkeit oder Resignation",
                  "Körperliche Beschwerden ohne Ursache"
                ].map((item, index) => (
                  <Card key={index} className="border-[oklch(0.55_0.15_35)]/30">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-[oklch(0.55_0.15_35)]">⚠</span>
                        {item}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Praktische Strategien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Praktische Strategien
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Tägliche Mini-Auszeiten",
                    description: "Planen Sie jeden Tag mindestens 15-30 Minuten nur für sich ein.",
                    examples: ["Spaziergang", "Kaffee in Ruhe", "Musik hören", "Lesen"]
                  },
                  {
                    title: "Bewegung und Körper",
                    description: "Körperliche Aktivität baut Stresshormone ab und hebt die Stimmung.",
                    examples: ["Yoga", "Schwimmen", "Tanzen", "Gartenarbeit"]
                  },
                  {
                    title: "Soziale Kontakte pflegen",
                    description: "Halten Sie Kontakt zu Menschen ausserhalb der Betreuungssituation.",
                    examples: ["Freunde treffen", "Telefonate", "Hobbys mit anderen"]
                  },
                  {
                    title: "Professionelle Unterstützung",
                    description: "Auch Sie dürfen sich Hilfe holen – das ist kein Zeichen von Schwäche.",
                    examples: ["Eigene Therapie", "Selbsthilfegruppe", "Beratung"]
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.examples.map((ex, i) => (
                          <span key={i} className="text-xs bg-[oklch(0.92_0.05_320)]/50 text-[oklch(0.40_0.10_320)] px-2 py-1 rounded-full">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Selbsthilfegruppen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-[oklch(0.45_0.05_250)]" />
                Selbsthilfegruppen für Angehörige
              </h2>
              
              <Card className="bg-[oklch(0.90_0.03_250)]/20 border-[oklch(0.45_0.05_250)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Austausch mit anderen Angehörigen kann enorm entlastend sein. Sie sind nicht allein mit Ihren Erfahrungen.
                  </p>
                  
                  <h3 className="font-display font-semibold text-foreground mb-3">Vorteile von Selbsthilfegruppen:</h3>
                  <ul className="space-y-2">
                    {[
                      "Austausch mit Menschen, die Ähnliches erleben",
                      "Praktische Tipps aus erster Hand",
                      "Entlastung durch Verständnis",
                      "Neue Perspektiven und Hoffnung"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Erlaubnis geben */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Geben Sie sich die Erlaubnis
              </h2>
              
              <Card className="bg-[oklch(0.85_0.08_55)]/20 border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Als Angehöriger dürfen Sie:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Auch mal wütend, frustriert oder traurig sein",
                      "Nicht immer die Lösung haben",
                      "Ihre eigenen Bedürfnisse ernst nehmen",
                      "Nein sagen, ohne sich schuldig zu fühlen",
                      "Freude empfinden, auch wenn es Ihrem Angehörigen schlecht geht",
                      "Professionelle Hilfe für sich selbst suchen",
                      "Pausen machen und auftanken"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.12_55)] mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Abschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-[oklch(0.92_0.05_320)]/30 to-[oklch(0.88_0.04_145)]/30 border-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-[oklch(0.55_0.12_320)] mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie sind wichtig. Ihre Gesundheit und Ihr Wohlbefinden sind wichtig. Indem Sie gut für sich sorgen, sorgen Sie auch besser für andere.
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
                <Button variant="ghost">
                  ← Grenzen setzen
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Zur Startseite
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
