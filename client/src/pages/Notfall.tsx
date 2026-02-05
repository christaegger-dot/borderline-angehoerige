import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, AlertTriangle, ExternalLink, Clock, MapPin } from "lucide-react";

export default function Notfall() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.08_25)]/50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.20_25)] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Notfall & Krisenressourcen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hier finden Sie wichtige Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-6 bg-[oklch(0.55_0.20_25)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <AlertTriangle className="w-6 h-6" />
              <p className="font-semibold">
                Bei akuter Lebensgefahr: Sofort Notruf wählen!
              </p>
            </div>
            <a href="tel:144">
              <Button size="lg" className="bg-white text-[oklch(0.55_0.20_25)] hover:bg-white/90 font-bold">
                <Phone className="w-5 h-5 mr-2" />
                144 anrufen
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Sofort-Hilfe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Sofort-Hilfe (24/7)
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Sanitätsnotruf",
                    number: "144",
                    description: "Bei akuter Lebensgefahr, Selbstverletzung oder Suizidversuch",
                    color: "oklch(0.55 0.20 25)"
                  },
                  {
                    name: "Die Dargebotene Hand",
                    number: "143",
                    description: "Telefonseelsorge, 24 Stunden erreichbar, anonym und kostenlos",
                    color: "oklch(0.55 0.15 145)"
                  },
                  {
                    name: "Polizei",
                    number: "117",
                    description: "Bei Gewalt oder wenn Sie sich bedroht fühlen",
                    color: "oklch(0.45 0.05 250)"
                  }
                ].map((item, index) => (
                  <Card key={index} style={{ borderColor: item.color }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                        <a href={`tel:${item.number}`}>
                          <Button 
                            size="lg" 
                            className="font-bold text-lg"
                            style={{ backgroundColor: item.color }}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {item.number}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Psychiatrische Notdienste */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Psychiatrische Notdienste
              </h2>
              
              <Card className="border-border/50 mb-4">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    In der Schweiz gibt es in jedem Kanton psychiatrische Notdienste. Diese sind rund um die Uhr erreichbar und können bei akuten psychischen Krisen helfen.
                  </p>
                  <p className="text-foreground font-medium">
                    Fragen Sie bei der Dargebotenen Hand (143) nach dem zuständigen psychiatrischen Notdienst in Ihrer Region.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { city: "Zürich", name: "PUK Zürich Notfall", info: "Lenggstrasse 31" },
                  { city: "Bern", name: "UPD Bern Notfall", info: "Bolligenstrasse 111" },
                  { city: "Basel", name: "UPK Basel Notfall", info: "Wilhelm Klein-Strasse 27" },
                  { city: "Luzern", name: "Lups Notfall", info: "Schafmattstrasse 1" }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[oklch(0.55_0.15_35)] mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground">{item.city}</h3>
                          <p className="text-muted-foreground text-sm">{item.name}</p>
                          <p className="text-muted-foreground text-xs">{item.info}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Online-Ressourcen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Online-Ressourcen & Beratung
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Pro Mente Sana",
                    url: "https://www.promentesana.ch",
                    description: "Beratung für psychisch Betroffene und Angehörige"
                  },
                  {
                    name: "Stand by You",
                    url: "https://www.stand-by-you.ch",
                    description: "Netzwerk für Angehörige von Menschen mit psychischen Erkrankungen"
                  },
                  {
                    name: "Equilibrium",
                    url: "https://www.depressionen.ch",
                    description: "Verein zur Bewältigung von Depressionen"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50 hover:border-[oklch(0.65_0.12_55)] transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Website
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Krisenplan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Persönlicher Krisenplan
              </h2>
              
              <Card className="bg-[oklch(0.88_0.04_145)]/20 border-[oklch(0.65_0.08_145)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Erstellen Sie gemeinsam mit Ihrem Angehörigen einen persönlichen Krisenplan. Dieser sollte enthalten:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Frühwarnzeichen einer Krise",
                      "Strategien, die in der Vergangenheit geholfen haben",
                      "Wichtige Telefonnummern (Therapeut, Arzt, Vertrauensperson)",
                      "Medikamenteninformationen",
                      "Was Sie als Angehöriger tun können – und was nicht"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-[oklch(0.55_0.10_145)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[oklch(0.95_0.03_55)] border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Diese Seite ersetzt keine professionelle Beratung. Bei akuten Krisen wenden Sie sich bitte immer an die Notfallnummern oder den psychiatrischen Notdienst.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
