import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Accessibility,
  Check,
  Keyboard,
  Monitor,
  Eye,
  MessageCircle,
} from "lucide-react";

const conformanceItems = [
  "Skip-Navigation zum Hauptinhalt (WCAG 2.4.1)",
  "Tastaturnavigation für alle interaktiven Elemente",
  "ARIA-Rollen und -Labels für Menüs, Dialoge und Navigation",
  "Farbkontraste nach WCAG AA (mind. 4.5:1 für Text)",
  "Responsives Design für alle Bildschirmgrössen",
  "Semantische HTML-Struktur (Überschriften-Hierarchie, Landmarks)",
  "Fokus-Management bei modalen Dialogen und Dropdown-Menüs",
  "Reduzierte Bewegung wird respektiert (prefers-reduced-motion)",
];

const knownLimitations = [
  "PDF-Downloads sind derzeit nicht vollständig barrierefrei aufbereitet",
  "Einzelne interaktive Übungen (Übungsszenarien) können mit Screenreadern eingeschränkt nutzbar sein",
];

export default function Barrierefreiheit() {
  return (
    <Layout>
      <SEO
        title="Barrierefreiheit"
        description="Erklärung zur Barrierefreiheit dieser Website: Konformitätsziel, umgesetzte Massnahmen und Kontaktmöglichkeit bei Problemen."
        path="/barrierefreiheit"
      />

      <section className="py-10 md:py-14 bg-gradient-to-b from-sage-wash/60 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              Erklärung zur Barrierefreiheit
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Wir sind bestrebt, diese Website für alle Menschen zugänglich zu
              gestalten — unabhängig von körperlichen, sensorischen oder
              kognitiven Einschränkungen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="border-sage/30 bg-sage-light/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-sage-dark mt-0.5 shrink-0" />
                  <div>
                    <h2 className="font-semibold text-foreground mb-2">
                      Konformitätsziel
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Diese Website orientiert sich an den{" "}
                      <strong>
                        Web Content Accessibility Guidelines (WCAG) 2.1, Stufe
                        AA
                      </strong>
                      . Wir arbeiten kontinuierlich daran, die Barrierefreiheit
                      zu verbessern.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-sage-mid" />
                Umgesetzte Massnahmen
              </h2>
              <div className="grid gap-2">
                {conformanceItems.map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/40"
                  >
                    <Check className="w-4 h-4 text-sage-dark mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-sage-mid" />
                Bekannte Einschränkungen
              </h2>
              <div className="grid gap-2">
                {knownLimitations.map(item => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/40"
                  >
                    <span className="text-sage-mid mt-0.5 shrink-0">—</span>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-sage-dark mt-0.5 shrink-0" />
                  <div>
                    <h2 className="font-semibold text-foreground mb-2">
                      Feedback und Kontakt
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Wenn Sie auf Barrieren stossen oder
                      Verbesserungsvorschläge haben, kontaktieren Sie uns bitte.
                      Wir nehmen Ihr Feedback ernst und arbeiten an Lösungen.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nutzen Sie dafür unsere{" "}
                      <a
                        href="/feedback"
                        className="text-sage-dark hover:text-sage-darker underline underline-offset-2"
                      >
                        Feedback-Seite
                      </a>{" "}
                      oder wenden Sie sich direkt an die im{" "}
                      <a
                        href="/impressum"
                        className="text-sage-dark hover:text-sage-darker underline underline-offset-2"
                      >
                        Impressum
                      </a>{" "}
                      genannte verantwortliche Person.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground">
              Stand: April 2026
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
