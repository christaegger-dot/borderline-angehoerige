import { useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, AlertCircle, Lightbulb, ArrowRight, ExternalLink, FileText, Clock, RefreshCw, Layers, Users, Activity, XCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import MythosFlipCards from "@/components/interactive/MythosFlipCards";
import EvidenceNote from "@/components/EvidenceNote";
import VerstehenInfografikenSection from "@/sections/VerstehenInfografikenSection";


export default function Verstehen() {
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
              Die Borderline-Persönlichkeitsstörung ist ein komplexes Störungsbild. Für Angehörige ist es oft entlastend zu verstehen, warum Situationen so schnell kippen können, ohne Verhalten vorschnell zu entschuldigen oder zu verurteilen.
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

            <EvidenceNote
              className="mb-8"
              title="Evidenzbasis dieser Seite"
              sources={[
                { label: "Linehan, M.M. (1993), Cognitive-Behavioral Treatment of BPD" },
                { label: "Paris, J. (2019), Stepped Care for BPD" },
                { label: "Schmahl & Bremner (2006), Neuroimaging in BPD", href: "https://pubmed.ncbi.nlm.nih.gov/16490414/" },
                { label: "Ruocco et al. (2013), Neural correlates of emotion dysregulation", href: "https://pubmed.ncbi.nlm.nih.gov/23260332/" },
              ]}
            />

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
                  Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die mit starker emotionaler Anspannung, Schwierigkeiten in Beziehungen und einem oft instabilen Selbstbild einhergehen kann. Nicht jeder Mensch mit BPS zeigt dieselben Muster, und Ausprägung sowie Verlauf unterscheiden sich deutlich.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Viele Betroffene beschreiben, dass Gefühle sie sehr rasch und mit grosser Wucht erfassen. Für Angehörige ist wichtig: Hinter heftigen Reaktionen liegen oft nicht Bosheit oder Berechnung, sondern Überforderung, Angst, innere Spannungszustände oder Scham. Das macht Verhalten nicht folgenlos, hilft aber, es genauer einzuordnen.
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
                Für eine Diagnose müssen mindestens <strong>5 von 9 Kriterien</strong> erfüllt sein. Die Liste kann helfen, häufige Muster besser zu verstehen, ersetzt aber keine fachliche Abklärung. Entscheidend ist immer das Gesamtbild über längere Zeit und in verschiedenen Lebensbereichen.
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
                Quelle: Diagnostic and Statistical Manual of Mental Disorders, 5th Edition, Text Revision (DSM-5-TR), American Psychiatric Association
              </p>
            </ContentSection>

            <ContentSection
              title="DSM-5-TR und ICD-11 im Überblick"
              icon={<FileText className="w-7 h-7 text-slate-dark" />}
              id="dsm-icd-ueberblick"
              preview="DSM-5-TR bleibt für die Kriterienliste zentral; im DACH-Raum ist zusätzlich die ICD-11-Einordnung relevant."
            >
              <Card className="border-l-4 border-l-slate-dark bg-slate-wash/40">
                <CardContent className="p-5 space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>DSM-5-TR:</strong> Auf dieser Seite nutzen wir weiterhin die 9 Kriterien als psychoedukative Orientierung für Angehörige.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>ICD-11:</strong> Im Versorgungskontext in DACH wird Borderline als Muster innerhalb der ICD-11-Persönlichkeitsstörungsdiagnostik eingeordnet (u. a. Borderline-Pattern-Qualifier, im Schema aktuell als <em>6D11</em> referenziert).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Praktisch heisst das: Beide Systeme beschreiben ähnliche klinische Muster, nutzen aber unterschiedliche Struktur- und Kodierungslogiken.
                  </p>
                </CardContent>
              </Card>
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
                Neurowissenschaftliche Forschung legt nahe, dass Stressverarbeitung, Emotionsregulation und Impulskontrolle bei vielen Menschen mit Borderline anders belastet sind. Diese Modelle erklären etwas, aber nie die ganze Person.
              </p>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-alert">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-alert text-white flex items-center justify-center text-sm font-bold">A</span>
                      Amygdala – Das Alarmzentrum
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Die Amygdala kann bei Borderline <strong>überaktiv</strong> sein. Sie reagiert stärker und schneller auf emotionale Reize – besonders auf Gesichtsausdrücke, die als bedrohlich interpretiert werden könnten.
                    </p>
                    <div className="bg-terracotta-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> Deshalb können neutrale Signale schneller als Ablehnung oder Distanz erlebt werden. Das ist nicht einfach «Übertreibung», sondern oft Ausdruck eines hochsensiblen Alarmsystems.
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
                      Der Hippocampus kann bei manchen Betroffenen <strong>verkleinert</strong> sein. Er ist zuständig für Gedächtnis und das Einordnen von Erfahrungen in einen Kontext.
                    </p>
                    <div className="bg-sage-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> In Krisen kann es schwer sein, positive Beziehungserfahrungen innerlich verfügbar zu halten. Pauschale Vorwürfe müssen nicht bewusst unwahr gemeint sein, fühlen sich für Sie aber trotzdem verletzend an.
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
                      Der präfrontale Kortex ist für rationales Denken, Impulskontrolle und <Link to="/glossar?q=Emotionale+Dysregulation" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">Emotionsregulation</Link> zuständig. Bei Borderline kann die <strong>Verbindung zur Amygdala geschwächt</strong> sein.
                    </p>
                    <div className="bg-slate-wash rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> Unter hoher Anspannung ist reflektiertes Denken oft deutlich eingeschränkt. Deshalb bringt reines Argumentieren in Krisen meist wenig, bevor sich die Anspannung etwas gesenkt hat.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-terracotta-lighter/30 border-terracotta/50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">Die gute Nachricht: Neuroplastizität</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Das Gehirn kann sich verändern. Durch Therapie (besonders <Link to="/glossar?q=DBT" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">DBT</Link>) können neue neuronale Verbindungen entstehen. Studien zeigen, dass sich die Hirnaktivität nach erfolgreicher Therapie normalisieren kann.
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
              title="Tunnelblick unter Stress – Warum Argumente oft nicht ankommen"
              icon={<Clock className="w-7 h-7 text-terracotta-mid" />}
              id="emotionale-demenz"
              preview="Unter hoher emotionaler Überflutung verengt sich der Blick. Dann helfen zuerst Beruhigung und Orientierung, nicht Diskussionen."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn ein Mensch emotional überflutet ist, verengt sich das Erleben oft stark auf den aktuellen Schmerz, die aktuelle Angst oder den aktuellen Konflikt. In diesem Zustand sind Einordnung, Abwägung und Perspektivenwechsel deutlich erschwert.
                </p>
                
                <Card className="bg-terracotta-wash/50 border-terracotta-mid/30 mb-6">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Warum das wichtig ist:</strong> Logische Argumente oder Korrekturen kommen in solchen Momenten oft kaum an. Hilfreicher ist zunächst, die Lage zu beruhigen, Sicherheit herzustellen und das emotionale Erleben anzuerkennen. Erst danach wird gemeinsames Nachdenken eher möglich.
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
                  Quelle: Neurowissenschaftliche Grundlagen nach LeDoux (1996) und aktueller Forschung zu Stressverarbeitung und Emotionsregulation
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
                  Viele Angehörige berichten von einem wiederkehrenden Muster. Aus Angehörigenperspektive kann es hilfreich sein, dieses Muster zu kennen, um nicht jede Phase persönlich zu nehmen – und sich auf die nächste vorzubereiten.
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
                      <strong>Wichtig:</strong> Dieser Zyklus ist kein Schicksal und zeigt sich nicht bei allen Betroffenen gleich. Mit Therapie und Unterstützung können die Phasen häufig weniger intensiv werden und die stabilen Zeiten länger dauern.
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
                  Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen aus Angehörigensicht oft nicht gegen Sie gerichtet wirkt, sondern häufig Ausdruck innerer Not und einer Erkrankung ist, können Sie anders reagieren. Sie können:
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
            <VerstehenInfografikenSection />

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
