import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, BookOpen, Shield, Users, Mail, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function UeberUns() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.88_0.04_145)]/40 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Über diese Website
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Warum es «Schluss mit dem Eiertanz» gibt – und wer dahinter steht.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Motivation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Warum diese Website?
              </h2>
              
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed mb-4">
                  Wenn ein nahestehender Mensch eine Borderline-Persönlichkeitsstörung hat, stehen Angehörige oft vor einer doppelten Herausforderung: Sie wollen helfen – und fühlen sich gleichzeitig hilflos. Sie lieben – und sind erschöpft. Sie verstehen nicht, was passiert – und haben Angst, etwas falsch zu machen.
                </p>
                
                <p className="leading-relaxed mb-4">
                  Der Begriff «Eiertanz» aus dem Standardwerk von Paul T. Mason und Randi Kreger beschreibt dieses Gefühl treffend: das ständige Auf-der-Hut-Sein, die Angst vor dem nächsten Ausbruch, das Gefühl, auf Eierschalen zu laufen.
                </p>
                
                <p className="leading-relaxed">
                  Diese Website möchte Angehörigen evidenzbasierte Werkzeuge an die Hand geben – nicht um die Erkrankung zu «heilen», sondern um den Alltag besser zu bewältigen, die Beziehung zu stärken und dabei auf sich selbst zu achten.
                </p>
              </div>
            </motion.div>

            {/* Prinzipien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Unsere Prinzipien
              </h2>
              
              <div className="grid gap-4">
                {[
                  {
                    icon: BookOpen,
                    title: "Evidenzbasiert",
                    description: "Alle Inhalte basieren auf wissenschaftlicher Forschung und bewährten Therapieansätzen wie DBT (Dialektisch-Behaviorale Therapie). Wir nennen unsere Quellen."
                  },
                  {
                    icon: Heart,
                    title: "Entstigmatisierend",
                    description: "Borderline ist eine behandelbare Erkrankung, keine Charakterschwäche. Wir vermeiden schuldzuweisende Sprache und fördern Verständnis für alle Beteiligten."
                  },
                  {
                    icon: Shield,
                    title: "Selbstfürsorge-orientiert",
                    description: "Angehörige können nur helfen, wenn sie selbst gesund bleiben. Grenzen setzen ist kein Verrat, sondern notwendig für eine nachhaltige Beziehung."
                  },
                  {
                    icon: Users,
                    title: "Praxisnah",
                    description: "Theorie allein hilft nicht. Wir bieten konkrete Techniken, Beispieldialoge und Handouts, die im Alltag direkt anwendbar sind."
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-5">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.04_145)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* Quellen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Wissenschaftliche Grundlagen
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die Inhalte dieser Website stützen sich auf etablierte Forschung und Therapieansätze:
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    title: "Dialektisch-Behaviorale Therapie (DBT)",
                    author: "Marsha M. Linehan",
                    description: "Die evidenzbasierte Standardtherapie für Borderline, entwickelt in den 1980er Jahren."
                  },
                  {
                    title: "Stop Walking on Eggshells",
                    author: "Paul T. Mason & Randi Kreger",
                    description: "Das Standardwerk für Angehörige, Grundlage für den Namen dieser Website."
                  },
                  {
                    title: "Ich hasse dich – verlass mich nicht",
                    author: "Jerold J. Kreisman & Hal Straus",
                    description: "Klassiker zum Verständnis der Borderline-Dynamik aus Betroffenen- und Angehörigensicht."
                  },
                  {
                    title: "Family Connections",
                    author: "NEA-BPD / Alan Fruzzetti",
                    description: "Evidenzbasiertes Programm für Angehörige, entwickelt an der University of Nevada."
                  }
                ].map((source, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[oklch(0.98_0.01_85)] border border-border/30">
                    <p className="font-medium text-foreground">{source.title}</p>
                    <p className="text-sm text-[oklch(0.55_0.10_145)]">{source.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Eine vollständige Liste unserer Buchempfehlungen finden Sie auf der{" "}
                <Link href="/buchempfehlungen" className="text-[oklch(0.55_0.12_55)] hover:underline">
                  Buchempfehlungen-Seite
                </Link>.
              </p>
            </motion.div>

            {/* Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="border-[oklch(0.55_0.15_55)]/30 bg-[oklch(0.98_0.02_55)]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Wichtiger Hinweis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Diese Website ersetzt keine professionelle Beratung, Therapie oder medizinische Behandlung. Die Inhalte dienen der Information und Orientierung. Bei akuten Krisen wenden Sie sich bitte an die{" "}
                    <Link href="/soforthilfe" className="text-[oklch(0.55_0.20_55)] hover:underline font-medium">
                      Notfallnummern
                    </Link>. Für eine individuelle Beratung empfehlen wir den Kontakt zu{" "}
                    <Link href="/selbsthilfegruppen" className="text-[oklch(0.55_0.12_55)] hover:underline font-medium">
                      Selbsthilfegruppen
                    </Link>{" "}oder{" "}
                    <Link href="/unterstuetzen/therapie#therapieangebote" className="text-[oklch(0.55_0.12_55)] hover:underline font-medium">
                      spezialisierten Therapeuten
                    </Link>.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Feedback & Kontakt
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Haben Sie Anregungen, Fragen oder möchten Sie einen Fehler melden? Wir freuen uns über Ihr Feedback.
              </p>
              
              <Link href="/feedback">
                <Card className="border-border/50 hover:border-[oklch(0.55_0.10_145)] transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Feedback geben</p>
                        <p className="text-sm text-muted-foreground">Ihre Rückmeldung hilft uns, diese Website zu verbessern</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
