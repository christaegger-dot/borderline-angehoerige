import { useState, useRef } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, AlertCircle, Lightbulb, ArrowRight, ExternalLink, Image, FileText, Clock, RefreshCw, Layers, Users, Activity, XCircle, Download, Filter } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import MythosFlipCards from "@/components/interactive/MythosFlipCards";


const verstehenInfografiken = [
  {
    id: "leuchtturm",
    title: "Der Leuchtturm",
    description: "Ihre Rolle als Angehörige/r: Stabil bleiben trotz Sturm.",
    category: "grundlagen",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
    alt: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    featured: true,
  },
  {
    id: "eisberg",
    title: "Der Eisberg",
    description: "Wut ist oft nur die Spitze – darunter liegen Schmerz und Angst.",
    category: "grundlagen",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MLLwefeyaKvtThbK.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RNKtfQQMvhlSyiIp.pdf",
    alt: "Der Eisberg – Wut ist oft die Spitze",
  },
  {
    id: "spaltung",
    title: "Spaltung",
    description: "Das Pendel zwischen Extremen – die Grauzone stärken.",
    category: "grundlagen",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gNpeJqfUBZRASmzM.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BSFCCqVxxwxDolfw.pdf",
    alt: "Spaltung – das Pendel zwischen Extremen",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description: "Erst beruhigen, dann klären – warum Logik manchmal nicht ankommt.",
    category: "neurobiologie",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sSUJoOUTiuWgrkiZ.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tlKAOpYHdCNAtovE.pdf",
    alt: "Alarm-Modus vs. Denk-Modus",
  },
  {
    id: "4-phasen",
    title: "Der 4-Phasen-Zyklus",
    description: "Das vorhersehbare Muster – Krisen folgen oft einem Ablauf.",
    category: "neurobiologie",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BYDbBJaIhetrjHRq.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PBYpNxZamAxjOHYd.pdf",
    alt: "Der 4-Phasen-Zyklus",
  },
  {
    id: "gehirn",
    title: "Das Gehirn verstehen",
    description: "Neurobiologie einfach erklärt – warum Stress Denken blockiert.",
    category: "neurobiologie",
    webpUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ImASzOTHYdFpxOUI.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NViSBQtRBvGWOHPE.pdf",
    alt: "Das Gehirn verstehen",
  },
];

const verstehenCategories = [
  { id: "alle", label: "Alle", icon: Filter, count: verstehenInfografiken.length },
  { id: "grundlagen", label: "Grundlagen", icon: BookOpen, count: verstehenInfografiken.filter(i => i.category === "grundlagen").length },
  { id: "neurobiologie", label: "Neurobiologie", icon: Brain, count: verstehenInfografiken.filter(i => i.category === "neurobiologie").length },
];

export default function Verstehen() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);
  const filteredItems = activeFilter === "alle" ? verstehenInfografiken : verstehenInfografiken.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO title="Borderline verstehen" description="Was ist Borderline-Persönlichkeitsstörung? Symptome, Ursachen und Auswirkungen verständlich erklärt." path="/verstehen" />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-sage-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Borderline verstehen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Die Borderline-Persönlichkeitsstörung ist eine komplexe Erkrankung, die das Erleben und Verhalten tiefgreifend beeinflusst. Hier erfahren Sie, was dahinter steckt – und warum dieses Wissen Ihnen helfen kann.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="border-l-4 border-l-sage bg-sage-light/20">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic">
                    "Wenn ich verstehe, warum mein Angehöriger so reagiert, kann ich anders damit umgehen. Nicht besser oder schlechter – anders. Und das macht einen riesigen Unterschied."
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">— Eine Angehörige</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Was ist Borderline */}
            <ContentSection
              title="Was ist Borderline?"
              icon={<Brain className="w-7 h-7 text-sage" />}
              id="was-ist-borderline"
              defaultOpen={true}
              preview="Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die durch intensive Emotionen, instabile Beziehungen und ein schwankendes Selbstbild gekennzeichnet ist."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die durch intensive Emotionen, instabile Beziehungen und ein schwankendes Selbstbild gekennzeichnet ist. Menschen mit Borderline erleben Gefühle oft viel intensiver als andere – sowohl positive als auch negative.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stellen Sie sich vor, Sie hätten keine "Haut" für Ihre Emotionen. Jedes Gefühl trifft Sie mit voller Wucht, ohne Puffer. Das ist die Realität vieler Menschen mit Borderline.
                </p>
              </div>
            </ContentSection>

            {/* Die 9 DSM-5 Kriterien */}
            <ContentSection
              title="Die 9 DSM-5 Kriterien"
              icon={<AlertCircle className="w-7 h-7 text-terracotta" />}
              id="symptome"
              preview="Für eine Diagnose müssen mindestens 5 von 9 Kriterien erfüllt sein."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Für eine Diagnose müssen mindestens <strong>5 von 9 Kriterien</strong> erfüllt sein. Hier sind alle Kriterien verständlich erklärt:
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    num: "1",
                    title: "Verzweifelte Bemühungen, Verlassenwerden zu vermeiden",
                    example: "Panische Anrufe, wenn der Partner später kommt; extreme Reaktionen auf kleine Trennungen",
                    color: "var(--color-terracotta-mid)"
                  },
                  {
                    num: "2",
                    title: "Instabile, intensive Beziehungen",
                    example: "Wechsel zwischen Idealisierung («Du bist perfekt!») und Entwertung («Du bist das Schlimmste!»)",
                    color: "var(--color-terracotta)"
                  },
                  {
                    num: "3",
                    title: "Identitätsstörung: instabiles Selbstbild",
                    example: "Unsicherheit über Ziele, Werte, Berufswahl, Freundschaften, sexuelle Orientierung",
                    color: "var(--color-slate-dark)"
                  },
                  {
                    num: "4",
                    title: "Impulsivität in mindestens zwei Bereichen",
                    example: "Geldausgaben, Essanfälle, Substanzmissbrauch, riskantes Fahren, ungeschützter Sex",
                    color: "var(--color-sand-mid)"
                  },
                  {
                    num: "5",
                    title: "Wiederkehrende Suiziddrohungen oder Selbstverletzung",
                    example: "Ritzen, Verbrennen, Suizidankündigungen – oft als Versuch, unerträgliche Gefühle zu regulieren",
                    color: "var(--color-terracotta-mid)"
                  },
                  {
                    num: "6",
                    title: "Affektive Instabilität",
                    example: "Intensive Stimmungswechsel innerhalb von Stunden – von Euphorie zu Verzweiflung",
                    color: "var(--color-terracotta-mid)"
                  },
                  {
                    num: "7",
                    title: "Chronisches Gefühl der Leere",
                    example: "«Ich fühle mich wie ein schwarzes Loch» – ein tiefes, anhaltendes Gefühl von Hohlheit",
                    color: "var(--color-charcoal)"
                  },
                  {
                    num: "8",
                    title: "Unangemessene, heftige Wut",
                    example: "Wutausbrüche, die für Aussenstehende übertrieben wirken; Schwierigkeit, Wut zu kontrollieren",
                    color: "var(--color-alert)"
                  },
                  {
                    num: "9",
                    title: "Vorübergehende paranoide oder dissoziative Symptome",
                    example: "Unter Stress: Misstrauen, Gefühl der Unwirklichkeit, «neben sich stehen»",
                    color: "var(--color-slate-blue)"
                  }
                ].map((item) => (
                  <Card key={item.num} className="border-l-4" style={{ borderLeftColor: item.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.num}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground italic">{item.example}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Diagnostic and Statistical Manual of Mental Disorders, 5th Edition (DSM-5), American Psychiatric Association
              </p>
            </ContentSection>

            {/* Ursachen: Bio-Psycho-Soziales Modell */}
            <ContentSection
              title="Ursachen: Das Bio-Psycho-Soziale Modell"
              icon={<Layers className="w-7 h-7 text-sage-mid" />}
              id="ursachen"
              preview="Borderline entsteht nicht durch eine Ursache, sondern durch das Zusammenspiel biologischer, psychologischer und sozialer Faktoren."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Borderline entsteht nicht durch <em>eine</em> Ursache, sondern durch das Zusammenspiel mehrerer Faktoren. Niemand ist «schuld» – weder die Betroffenen noch die Angehörigen.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 border-t-4 border-t-terracotta-mid">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-terracotta-wash flex items-center justify-center mb-3">
                      <Brain className="w-5 h-5 text-terracotta-mid" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Biologisch</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Genetische Veranlagung (30-60%)</li>
                      <li>• Veränderungen in Hirnstrukturen</li>
                      <li>• Überempfindliches Stresssystem</li>
                      <li>• Neurotransmitter-Ungleichgewicht</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-sage-mid">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-sage-wash flex items-center justify-center mb-3">
                      <Heart className="w-5 h-5 text-sage-mid" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Psychologisch</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Frühe Bindungserfahrungen</li>
                      <li>• Emotionale Vernachlässigung</li>
                      <li>• Traumatische Erlebnisse</li>
                      <li>• Invalidierung von Gefühlen</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-slate-dark">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-slate-wash flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-slate-dark" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Sozial</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Instabile Familienverhältnisse</li>
                      <li>• Fehlende soziale Unterstützung</li>
                      <li>• Mobbing oder Ausgrenzung</li>
                      <li>• Kulturelle Faktoren</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-sage-wash/50 border-sage-mid/30">
                <CardContent className="p-5">
                  <p className="text-foreground leading-relaxed">
                    <strong>Wichtig für Angehörige:</strong> Auch wenn frühe Erfahrungen eine Rolle spielen, bedeutet das nicht, dass Eltern «schuld» sind. Viele Faktoren liegen ausserhalb der Kontrolle von Familien. Schuldzuweisungen helfen niemandem – Verständnis und Unterstützung schon.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Linehan, M.M. (1993); Paris, J. (2019). Borderline Personality Disorder
              </p>
            </ContentSection>

            {/* Neurobiologie */}
            <ContentSection
              title="Das Gehirn bei Borderline"
              icon={<Activity className="w-7 h-7 text-sage-mid" />}
              id="neurobiologie"
              preview="Neurowissenschaftliche Forschung zeigt: Bei Borderline funktionieren bestimmte Hirnregionen anders."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Neurowissenschaftliche Forschung zeigt: Bei Borderline funktionieren bestimmte Hirnregionen anders. Das erklärt, warum Betroffene Emotionen so intensiv erleben.
              </p>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-alert">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-alert text-white flex items-center justify-center text-sm font-bold">A</span>
                      Amygdala – Das Alarmzentrum
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Die Amygdala ist bei Borderline <strong>überaktiv</strong>. Sie reagiert stärker und schneller auf emotionale Reize – besonders auf Gesichtsausdrücke, die als bedrohlich interpretiert werden könnten.
                    </p>
                    <div className="bg-terracotta-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> Deshalb können neutrale Gesichtsausdrücke als ablehnend wahrgenommen werden. Es ist keine Absicht – das Gehirn interpretiert anders.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-sage-mid text-white flex items-center justify-center text-sm font-bold">H</span>
                      Hippocampus – Das Gedächtniszentrum
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Der Hippocampus ist bei vielen Betroffenen <strong>verkleinert</strong>. Er ist zuständig für Gedächtnis und das Einordnen von Erfahrungen in einen Kontext.
                    </p>
                    <div className="bg-sage-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> In Krisen kann es schwer sein, sich an positive Erfahrungen zu erinnern. «Du hast mich NIE unterstützt» ist keine Lüge – in diesem Moment ist die Erinnerung blockiert.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-slate-dark">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-slate-dark text-white flex items-center justify-center text-sm font-bold">P</span>
                      Präfrontaler Kortex – Die Kontrollinstanz
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Der präfrontale Kortex ist für rationales Denken, Impulskontrolle und Emotionsregulation zuständig. Bei Borderline ist die <strong>Verbindung zur Amygdala geschwächt</strong>.
                    </p>
                    <div className="bg-slate-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> In emotionalen Momenten ist der «rationale Teil» des Gehirns quasi offline. Deshalb helfen logische Argumente in Krisen nicht – erst muss die Amygdala beruhigt werden.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-terracotta-lighter/30 border-terracotta/50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">Die gute Nachricht: Neuroplastizität</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Das Gehirn kann sich verändern. Durch Therapie (besonders DBT) können neue neuronale Verbindungen entstehen. Studien zeigen, dass sich die Hirnaktivität nach erfolgreicher Therapie normalisieren kann.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quellen: Marcus Jähn, U.M.W.E.G.©-Methode; Schmahl & Bremner (2006); Ruocco et al. (2013)
              </p>
            </ContentSection>

            {/* Häufige Missverständnisse */}
            <ContentSection
              title="Häufige Missverständnisse"
              icon={<XCircle className="w-7 h-7 text-terracotta-mid" />}
              id="missverstaendnisse"
              preview="Über Borderline kursieren viele Mythen. Hier ist, was nicht stimmt."
            >
              <p className="text-muted-foreground leading-relaxed mb-2">
                Über Borderline kursieren viele Mythen. Tippen Sie auf eine Karte, um die Realität aufzudecken:
              </p>
              
              <MythosFlipCards />
            </ContentSection>

            {/* Emotionale Demenz */}
            <ContentSection
              title="«Emotionale Demenz» – Warum Argumente nicht helfen"
              icon={<Clock className="w-7 h-7 text-terracotta-mid" />}
              id="emotionale-demenz"
              preview="In akuter emotionaler Überflutung existiert weder Vergangenheit noch Zukunft – nur das überwältigende Jetzt."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn ein Mensch in akuter emotionaler Überflutung ist, funktioniert sein Gehirn anders. Marcus Jähn beschreibt dies als <strong>«emotionale Demenz»</strong>: In diesem Zustand existiert weder Vergangenheit noch Zukunft – nur das überwältigende Jetzt.
                </p>
                
                <Card className="bg-terracotta-wash/50 border-terracotta-mid/30 mb-6">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Warum das wichtig ist:</strong> Logische Argumente helfen in Krisenmomenten nicht. Das Gehirn kann sie schlicht nicht verarbeiten. Erst wenn die Amygdala (das Angstzentrum) beruhigt ist, wird der präfrontale Kortex (rationales Denken) wieder zugänglich.
                    </p>
                  </CardContent>
                </Card>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">❌ Was nicht hilft:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>«Beruhige dich doch!»</li>
                      <li>«Das ist doch nicht so schlimm»</li>
                      <li>«Denk mal logisch nach»</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">✓ Was hilft:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Präsent sein, ohne zu urteilen</li>
                      <li>Gefühle anerkennen</li>
                      <li>Warten, bis die Welle abebbt</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Quelle: Marcus Jähn, U.M.W.E.G.©-Methode; Neurowissenschaftliche Grundlagen nach LeDoux (1996)
                </p>
              </div>
            </ContentSection>

            {/* 4-Phasen-Zyklus */}
            <ContentSection
              title="Der 4-Phasen-Zyklus"
              icon={<RefreshCw className="w-7 h-7 text-slate-dark" />}
              id="4-phasen-zyklus"
              preview="Viele Angehörige berichten von einem wiederkehrenden Muster: Explosion, Schweigen, Freundlichkeit, Verschlechterung."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Viele Angehörige berichten von einem wiederkehrenden Muster. Dieses Muster zu kennen, hilft Ihnen, nicht jede Phase persönlich zu nehmen – und sich auf die nächste vorzubereiten.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { phase: "1", title: "Explosion", desc: "Intensive Emotionen brechen aus", color: "var(--color-alert)", bgColor: "var(--color-terracotta-wash)" },
                    { phase: "2", title: "Schweigen", desc: "Rückzug und Isolation", color: "var(--color-slate-dark)", bgColor: "var(--color-slate-wash)" },
                    { phase: "3", title: "Freundlichkeit", desc: "Ruhige, oft liebevolle Phase", color: "var(--color-sage-mid)", bgColor: "var(--color-sage-wash)" },
                    { phase: "4", title: "Verschlechterung", desc: "Spannung baut sich auf", color: "var(--color-terracotta-mid)", bgColor: "var(--color-terracotta-wash)" }
                  ].map((item) => (
                    <div key={item.phase} className="text-center p-4 rounded-xl" style={{ backgroundColor: item.bgColor }}>
                      <div 
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.phase}
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <Card className="mt-6 border-l-4 border-l-sage-mid bg-sage-wash/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Wichtig:</strong> Dieser Zyklus ist kein Schicksal. Mit Therapie und Unterstützung können die Phasen weniger intensiv werden und die stabilen Zeiten länger dauern.
                    </p>
                  </CardContent>
                </Card>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Quelle: Mason & Kreger, «Schluss mit dem Eiertanz» (2010)
                </p>
              </div>
            </ContentSection>

            {/* Warum ist das wichtig */}
            <ContentSection
              title="Warum ist dieses Wissen wichtig?"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="verstehen-warum-wichtig"
              preview="Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen nicht gegen Sie gerichtet ist, können Sie anders reagieren."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen nicht gegen Sie gerichtet ist, sondern Ausdruck einer Erkrankung, können Sie anders reagieren. Sie können:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { text: "Verhalten von Person trennen", sub: "und weniger persönlich nehmen", icon: "🎯" },
                    { text: "Muster erkennen", sub: "und früher deeskalieren", icon: "🔍" },
                    { text: "Mitgefühl entwickeln", sub: "ohne sich selbst aufzugeben", icon: "💚" },
                    { text: "Realistische Erwartungen haben", sub: "an sich und an Ihren Angehörigen", icon: "⚖️" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-cream border border-border/30">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <span className="font-medium text-foreground block">{item.text}</span>
                        <span className="text-sm text-muted-foreground">{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContentSection>

            {/* Materialien zum Download – Kategorie 1: Verstehen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              id="materialien"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-sage-dark" />
                Infografiken zum Thema
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Vorschau = Web-Bild. «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {verstehenCategories.map((cat) => (
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
                    className={`whitespace-nowrap shrink-0 ${activeFilter === cat.id ? "bg-sage-dark hover:bg-sage-mid text-white" : ""}`}
                  >
                    <cat.icon className="w-4 h-4 mr-1.5" />
                    {cat.label} ({cat.count})
                  </Button>
                ))}
              </div>
              
              <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className={`${item.featured && activeFilter === "alle" ? "md:col-span-2" : ""} overflow-hidden hover:shadow-lg transition-shadow`}>
                    <button type="button" className="aspect-[3/4] bg-muted cursor-pointer w-full" onClick={() => window.open(item.webpUrl, '_blank')} aria-label={`${item.alt} – Vorschau öffnen`}>
                      <img
                        src={item.webpUrl}
                        alt={item.alt}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                    </button>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" aria-label={`PDF öffnen: ${item.title} (neuer Tab)`} className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        PDF öffnen
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien anzeigen
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hoffnung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <Card className="bg-sage-light/30 border-sage">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-sage flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Genesung ist möglich
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Borderline ist keine lebenslange Diagnose. Die Forschung zeigt, dass sich die Prognose mit der richtigen Behandlung deutlich verbessert.
                      </p>
                      <Link href="/genesung">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Mehr über Genesung erfahren
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6">
                Jetzt, da Sie die Grundlagen verstehen, erfahren Sie, wie Sie konkret unterstützen können.
              </p>
              <Link href="/unterstuetzen/uebersicht">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta-mid text-white">
                  Weiter zu: Unterstützen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
