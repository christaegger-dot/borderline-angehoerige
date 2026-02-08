import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import ContentSection from "@/components/ContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, ArrowRight, CheckCircle2, XCircle, Lightbulb, Download, ExternalLink, Image, RefreshCw, Users, Shield, BookOpen, Filter, Eye, Heart, ListChecks, Anchor, HandHeart } from "lucide-react";
import { Link } from "wouter";
import { useState, useRef } from "react";

const unterstuetzenSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "grundlagen", label: "Grundlagen", icon: Compass },
  { id: "haltung", label: "Haltung", icon: Heart },
  { id: "alltag", label: "Alltag", icon: ListChecks },
];

const unterstuetzenItems = [
  {
    title: "Im Krisenmodus – Orientierung geben",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gOumJSiPiJFGkSFy.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FOZYnweFmVcMXYyr.pdf",
    category: "grundlagen"
  },
  {
    title: "Ihre Rolle klären",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mTlmmrXfScSCxoiC.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/LEKuHRVBIRdTClYJ.pdf",
    category: "grundlagen"
  },
  {
    title: "Drei Säulen hilfreicher Unterstützung",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TaDXhEgHiyBeiQsT.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/bWugGxMdeykNGBUW.pdf",
    category: "grundlagen"
  },
  {
    title: "Konsistenz-Prinzip",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MCMaGcrhifsekEqb.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vfDYZzjEwJsEhzch.pdf",
    category: "haltung"
  },
  {
    title: "6 Leitlinien für Angehörige",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UYzFtDygMzdBJaVD.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GaQLbgKUokbWwUUi.pdf",
    category: "alltag"
  },
  {
    title: "Beziehungs-Achtsamkeit",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xwVvAHgRQPALOgcm.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/umhOiOvEhETLRqtq.pdf",
    category: "haltung"
  },
  {
    title: "4 Alltags-Tipps",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/rnwlrkNLwFQsLjnU.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IokELYIzmFREYEyL.pdf",
    category: "alltag"
  }
];

export default function UnterstuetzenUebersicht() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === "alle"
    ? unterstuetzenItems
    : unterstuetzenItems.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO title="Unterstützen – Übersicht" description="Wie Sie einen Menschen mit Borderline unterstützen können: Alltag, Therapie und Krisenbegleitung." path="/unterstuetzen/uebersicht" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-terracotta-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Link href="/verstehen" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
              ← Zurück zu Verstehen
            </Link>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              <div className="w-12 h-12 rounded-xl bg-terracotta-light flex items-center justify-center">
                <Compass className="w-6 h-6 text-terracotta-dark" />
              </div>
              <span className="text-sm font-medium text-terracotta-dark">Lesezeit: 4 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Wie kann ich helfen?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Als Angehöriger wollen Sie helfen – das ist natürlich und verständlich. Aber wie? Hier erfahren Sie, welche Rolle Sie einnehmen können und wo die Grenzen liegen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Leuchtturm Metapher – immer offen als Einstieg */}
            <ContentSection
              title="Die Leuchtturm-Metapher"
              icon={<Compass className="w-7 h-7 text-terracotta" />}
              id="leuchtturm"
              defaultOpen={true}
              preview="Sie können das Meer nicht beruhigen – aber Sie können Licht geben und Orientierung bieten."
            >
              <Card className="bg-terracotta-light/20 border-terracotta">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🏠</span>
                    <div>
                      <p className="text-muted-foreground leading-relaxed">
                        Stellen Sie sich vor, Sie sind ein Leuchtturm. Sie stehen fest auf Ihrem Fundament, während die Wellen um Sie herum toben. Sie können das Meer nicht beruhigen – aber Sie können Licht geben und Orientierung bieten. Sie zeigen den Weg, ohne selbst ins Wasser zu springen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Ihre Rolle */}
            <ContentSection
              title="Ihre Rolle klären"
              icon={<Users className="w-7 h-7 text-sage-dark" />}
              id="rolle"
              preview="Was Sie sein können – und was nicht Ihre Aufgabe ist."
            >
              <div className="grid md:grid-cols-2 gap-6 [&>*:first-child]:md:col-span-2">
                <Card className="border-sage-mid">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sage-mid" />
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
                          <span className="text-sage-mid">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-terracotta-mid">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-terracotta-mid" />
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
                          <span className="text-terracotta-mid">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Das verlorene Kind */}
            <ContentSection
              title="Das verlorene Kind verstehen"
              icon={<Lightbulb className="w-7 h-7 text-terracotta-mid" />}
              id="verlorenes-kind"
              preview="Menschen mit Borderline erleben in Krisen oft den Zustand eines verängstigten Kindes – und brauchen entsprechende Reaktionen."
            >
              <div className="space-y-4">
                {/* Szenario */}
                <Card className="bg-terracotta-wash/30 border-terracotta/50">
                  <CardContent className="p-5 sm:p-6">
                    <p className="text-foreground leading-relaxed">
                      Stellen Sie sich ein <strong>siebenjähriges Kind</strong> vor, das sich allein auf dem Times Square verirrt hat. Umgeben von Lärm, blinkenden Lichtern und Fremden ist es völlig überwältigt, starr vor Angst oder reagiert kopflos und impulsiv. Würden Sie dieses Kind für seine Panik bestrafen, es anschreien oder ihm Vorwürfe machen? Sicherlich nicht.
                    </p>
                  </CardContent>
                </Card>

                {/* Kernaussage 1: Neurologische Erklärung */}
                <blockquote className="border-l-4 border-terracotta-mid bg-terracotta-wash/20 rounded-r-lg px-4 py-3 sm:px-5 sm:py-4">
                  <p className="text-foreground leading-relaxed text-[0.95rem] italic">
                    Menschen mit einer Borderline-Persönlichkeitsstörung erleben in emotionalen Krisen einen fast identischen Zustand: Das limbische System im Gehirn schlägt Alarm, als bestünde Lebensgefahr.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Auch wenn sie äusserlich erwachsen sind, entspricht ihr inneres Erleben in diesem Moment dem eines verängstigten, schutzlosen Kindes.
                  </p>
                </blockquote>

                {/* Was hilft */}
                <div className="pt-1">
                  <p className="text-foreground font-semibold mb-2 text-base">Was in diesem Moment wirklich hilft:</p>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                    Reagieren Sie so, wie Sie diesem verlorenen Kind begegnen würden – nicht indem Sie die (vielleicht unsachlichen) Vorwürfe diskutieren, sondern indem Sie die Not dahinter adressieren:
                  </p>
                </div>

                {/* Drei Handlungsempfehlungen als Karten */}
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 bg-sage-wash/40 rounded-lg p-3.5 sm:p-4 border border-sage-mid/20">
                    <div className="w-8 h-8 rounded-full bg-sage-mid/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Anchor className="w-4 h-4 text-sage-mid" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Sicherheit durch Ruhe</p>
                      <p className="text-muted-foreground text-sm mt-0.5">Ihre eigene Gelassenheit ist der Anker.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-wash/40 rounded-lg p-3.5 sm:p-4 border border-slate-dark/10">
                    <div className="w-8 h-8 rounded-full bg-slate-dark/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-4 h-4 text-slate-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Präsenz zeigen</p>
                      <p className="text-muted-foreground text-sm mt-0.5">«Ich sehe, dass es dir gerade schlecht geht. Ich bin hier. Du bist nicht allein.»</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-sand-muted/40 rounded-lg p-3.5 sm:p-4 border border-sand-mid/20">
                    <div className="w-8 h-8 rounded-full bg-sand-mid/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HandHeart className="w-4 h-4 text-sand-mid" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Validierung</p>
                      <p className="text-muted-foreground text-sm mt-0.5">Akzeptieren Sie den Schmerz als real, auch wenn der Auslöser für Sie klein erscheint.</p>
                    </div>
                  </div>
                </div>

                {/* Wichtig-Hinweis */}
                <blockquote className="border-l-4 border-sage-mid bg-sage-lighter/50 rounded-r-lg px-4 py-3 sm:px-5 sm:py-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>Wichtig:</strong> Dieses Bild dient dazu, in der akuten Krise mit Empathie statt mit Gegendruck zu reagieren. Es bedeutet nicht, dass Sie dauerhaft die Verantwortung für das Handeln des anderen übernehmen – aber es verhindert, dass das Feuer der Krise durch gegenseitige Vorwürfe weiter geschürt wird.
                  </p>
                </blockquote>
              </div>
              
              <p className="text-xs text-muted-foreground mt-3">
                Quelle: Mason & Kreger, «Schluss mit dem Eiertanz» (2010)
              </p>
            </ContentSection>

            {/* Konsistenz-Prinzip */}
            <ContentSection
              title="Das Konsistenz-Prinzip"
              icon={<Shield className="w-7 h-7 text-sage-mid" />}
              id="konsistenz"
              preview="Wenn mehrere Angehörige involviert sind, müssen alle an einem Strang ziehen."
            >
              <Card className="bg-sage-wash/50 border-sage-mid/30 mb-6">
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
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-base">
                      <CheckCircle2 className="w-4 h-4 text-sage-mid" />
                      Hilfreich
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Gemeinsame Absprachen treffen</li>
                      <li>• Einheitliche Grenzen setzen</li>
                      <li>• Regelmässige Familien-Meetings</li>
                      <li>• Sich gegenseitig unterstützen</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-terracotta-mid">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-base">
                      <XCircle className="w-4 h-4 text-terracotta-mid" />
                      Vermeiden
                    </h3>
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
                Quelle: Mason & Kreger, "Schluss mit dem Eiertanz" (2010)
              </p>
            </ContentSection>

            {/* Die drei Säulen */}
            <ContentSection
              title="Die drei Säulen hilfreicher Unterstützung"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="drei-saeulen"
              preview="Präsenz, Validierung und Stabilität – die drei Grundpfeiler, die wirklich helfen."
            >
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
                      <h3 className="font-semibold text-foreground mb-2">{pillar.title}</h3>
                      <p className="text-muted-foreground mb-3">{pillar.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm text-foreground italic">Beispiel: {pillar.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            {/* 15 Leitlinien Übersicht */}
            <ContentSection
              title="15 evidenzbasierte Leitlinien"
              icon={<BookOpen className="w-7 h-7 text-slate-blue" />}
              id="leitlinien"
              preview="Von Dr. John Gunderson (McLean Hospital/Harvard) entwickelt – wissenschaftlich fundierte Leitlinien für Angehörige."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Diese Leitlinien wurden von Dr. John Gunderson (McLean Hospital/Harvard) entwickelt und sind wissenschaftlich fundiert. Sie fassen zusammen, was wirklich hilft.
              </p>
              
              <div className="space-y-6">
                {/* Ziele */}
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Ziele: Langsam vorgehen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">1.</span>
                        <span><strong className="text-foreground">Veränderung ist schwierig</strong> – Fortschritt kann Verlassensängste auslösen und zu Rückfällen führen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">2.</span>
                        <span><strong className="text-foreground">Erwartungen senken</strong> – Kleine Schritte feiern, realistische Ziele setzen.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Familienumgebung */}
                <Card className="border-l-4 border-l-terracotta">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Familienumgebung gestalten</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta font-bold">3.</span>
                        <span><strong className="text-foreground">Ruhe bewahren</strong> – Eine kühle, ruhige Atmosphäre schaffen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta font-bold">4.</span>
                        <span><strong className="text-foreground">Routinen beibehalten</strong> – Struktur gibt Sicherheit.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta font-bold">5.</span>
                        <span><strong className="text-foreground">Zeit zum Reden finden</strong> – Regelmässige, geplante Gespräche.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Krisen managen */}
                <Card className="border-l-4 border-l-terracotta-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Krisen managen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta-mid font-bold">6.</span>
                        <span><strong className="text-foreground">Nicht defensiv werden</strong> – Nicht rechtfertigen oder verteidigen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta-mid font-bold">7.</span>
                        <span><strong className="text-foreground">Selbstverletzendes Verhalten ernst nehmen</strong> – Aufmerksamkeit geben, nicht ignorieren.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-terracotta-mid font-bold">8.</span>
                        <span><strong className="text-foreground">Zuhören</strong> – Gefühle anerkennen, nicht wegargumentieren.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Probleme angehen */}
                <Card className="border-l-4 border-l-slate-blue">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Probleme angehen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-blue font-bold">9.</span>
                        <span><strong className="text-foreground">Drei «Musts»</strong> – Einbeziehen, fragen ob sie können, fragen ob Hilfe gewünscht ist.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-blue font-bold">10.</span>
                        <span><strong className="text-foreground">Familie handelt gemeinsam</strong> – Konsistenz zwischen allen Familienmitgliedern.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-blue font-bold">11.</span>
                        <span><strong className="text-foreground">Kommunikation mit Therapeuten</strong> – Bedenken offen äussern.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Grenzen setzen */}
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Grenzen setzen</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">12.</span>
                        <span><strong className="text-foreground">Grenzen klar kommunizieren</strong> – Erwartungen deutlich machen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">13.</span>
                        <span><strong className="text-foreground">Natürliche Konsequenzen zulassen</strong> – Nicht vor der Realität schützen.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">14.</span>
                        <span><strong className="text-foreground">Missbrauch nicht tolerieren</strong> – Verbale/körperliche Gewalt = rote Linie.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sage-mid font-bold">15.</span>
                        <span><strong className="text-foreground">Drohungen und Ultimaten</strong> – Nur aussprechen, wenn Sie sie durchziehen können.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Gunderson, J.G. et al. (2011). Family Guidelines for BPD. McLean Hospital / NEA-BPD
              </p>
            </ContentSection>

            {/* Materialien zum Download – bleibt als motion.div */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-terracotta-dark" />
                Materialien zum Thema
              </h2>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span><strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.</span>
              </p>
              {/* Filter-Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-1 px-1">
                {unterstuetzenSubcategories.map((cat) => {
                  const Icon = cat.icon;
                  const count = cat.id === "alle"
                    ? unterstuetzenItems.length
                    : unterstuetzenItems.filter(i => i.category === cat.id).length;
                  return (
                    <Button
                      key={cat.id}
                      variant={activeFilter === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setActiveFilter(cat.id);
                        setTimeout(() => {
                          gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                      className={`whitespace-nowrap shrink-0 ${activeFilter === cat.id ? "bg-terracotta-mid hover:bg-terracotta-dark text-white" : ""}`}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {cat.label}
                      <span className="ml-1.5 text-xs opacity-90">({count})</span>
                    </Button>
                  );
                })}
              </div>
              
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item, index) => (
                  <Card key={item.title} className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${filteredItems.length > 1 && index === 0 ? "sm:col-span-2" : ""}`}>
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      width={400}
                      height={223}
                      decoding="async"
                    />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm text-foreground mb-2">{item.title}</h3>
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        PDF öffnen
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
              <Card className="bg-sand-muted border-sand-mid">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-sand-mid flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
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
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
