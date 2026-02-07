import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield, Cookie, Server, Eye, Lock } from "lucide-react";

export default function Datenschutz() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sand-muted/50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Shield className="w-6 h-6 text-sage-darker" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Datenschutzerklärung
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Der Schutz Ihrer Privatsphäre ist uns wichtig. Diese Datenschutzerklärung informiert Sie über 
              die Verarbeitung personenbezogener Daten auf dieser Website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Grundsatz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-sage/30 bg-sage-light/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lock className="w-8 h-8 text-sage-mid flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Unser Grundsatz
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Diese Website wurde mit dem Ziel entwickelt, möglichst wenige personenbezogene Daten 
                        zu erheben. Wir verzichten bewusst auf Tracking-Tools, Werbung und Social-Media-Plugins. 
                        Ihre Privatsphäre hat Priorität.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Verantwortlich */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Verantwortliche Stelle
                  </h2>
                  <div className="text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">Christa Egger</p>
                    <p>Angehörigenberaterin</p>
                    <p className="mt-4 text-sm">
                      Bei Fragen zum Datenschutz können Sie sich an die oben genannte Person wenden.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Datenerhebung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-sage-mid" />
                    Erhebung und Verarbeitung von Daten
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Server-Logfiles</h3>
                      <p>
                        Bei jedem Zugriff auf diese Website werden automatisch Informationen in sogenannten 
                        Server-Logfiles gespeichert, die Ihr Browser automatisch übermittelt. Dies sind:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Browsertyp und Browserversion
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Verwendetes Betriebssystem
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Referrer URL (die zuvor besuchte Seite)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Hostname des zugreifenden Rechners
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          Uhrzeit der Serveranfrage
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sage-mid">•</span>
                          IP-Adresse (anonymisiert)
                        </li>
                      </ul>
                      <p className="mt-3 text-sm">
                        Diese Daten werden ausschliesslich zur Gewährleistung eines störungsfreien Betriebs 
                        der Website und zur Verbesserung unseres Angebots ausgewertet. Eine Zusammenführung 
                        dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-sage-mid" />
                    Cookies
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Diese Website verwendet ausschliesslich technisch notwendige Cookies, die für den 
                      Betrieb der Website erforderlich sind. Es werden <strong>keine Tracking-Cookies</strong> oder 
                      Cookies zu Werbezwecken eingesetzt.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">Technisch notwendige Cookies</h3>
                      <p className="text-sm">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können 
                        nicht deaktiviert werden. Sie speichern keine persönlich identifizierbaren Informationen.
                      </p>
                    </div>
                    <p className="text-sm">
                      Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert 
                      werden und Cookies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann 
                      die Funktionalität dieser Website eingeschränkt sein.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Keine Tracking-Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-sage-mid" />
                    Analyse- und Tracking-Tools
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Diese Website verwendet <strong>keine Analyse- oder Tracking-Tools</strong> wie Google Analytics, 
                      Facebook Pixel oder ähnliche Dienste. Wir erfassen keine Nutzungsprofile und geben 
                      keine Daten an Dritte weiter.
                    </p>
                    <p>
                      Es werden auch <strong>keine Social-Media-Plugins</strong> eingebunden, die Daten an 
                      soziale Netzwerke übertragen könnten.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Externe Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Externe Links
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Diese Website enthält Links zu externen Websites Dritter (z.B. Notfallressourcen, 
                    Selbsthilfegruppen). Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte 
                    der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. 
                    Bitte beachten Sie die Datenschutzerklärungen der jeweiligen externen Websites.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Downloads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Downloads und Materialien
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Die auf dieser Website angebotenen Infografiken und Handouts können heruntergeladen 
                    werden. Beim Download werden keine personenbezogenen Daten erfasst oder gespeichert. 
                    Die Materialien werden über einen Content Delivery Network (CDN) bereitgestellt.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ihre Rechte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Ihre Rechte
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                      Gemäss dem schweizerischen Datenschutzgesetz (DSG) und der EU-Datenschutz-Grundverordnung 
                      (DSGVO) haben Sie folgende Rechte:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten personenbezogenen Daten verlangen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid">•</span>
                        <span><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</span>
                      </li>
                    </ul>
                    <p className="text-sm">
                      Da wir jedoch keine personenbezogenen Daten speichern (ausser den anonymisierten 
                      Server-Logfiles), sind diese Rechte in der Praxis selten relevant.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Änderungen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Änderungen dieser Datenschutzerklärung
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
                    aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
                    in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die 
                    neue Datenschutzerklärung.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-center text-sm text-muted-foreground">
                Stand: Februar 2025
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
