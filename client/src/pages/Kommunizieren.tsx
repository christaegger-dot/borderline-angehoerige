import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, CheckCircle2, XCircle, Heart, Lightbulb, Download, ExternalLink, Eye, Sparkles, Users, UserCircle, RefreshCw, Filter, BookOpen, ShieldAlert, Wrench } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import ValidierungsStufenleiter from "@/components/interactive/ValidierungsStufenleiter";
import SETDragDrop from "@/components/interactive/SETDragDrop";


const kommSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "techniken", label: "Techniken", icon: BookOpen },
  { id: "konflikte", label: "Konflikte", icon: ShieldAlert },
  { id: "praxis", label: "Praxis", icon: Wrench },
];

const kommItems = [
  {
    title: "Wenn Gespräche kippen: 3 Schritte",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kWTjVSZAwAXAymgw.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eEpcTcWSbYQpNzJv.pdf",
    category: "techniken"
  },
  {
    title: "Der Standardsatz: 2 Sätze",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BhSMyAxexIXKHZAr.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DzgeeeiROfGFvSfv.pdf",
    category: "techniken"
  },
  {
    title: "Grenzen setzen, ohne zu eskalieren",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/QrgVLpdeorAWgKvg.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YyBYayMoMIGwTZtM.pdf",
    category: "konflikte"
  },
  {
    title: "Pause statt Streit",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VCooXJsQnRmSZGul.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fGgpuKMuDfzJYgrc.pdf",
    category: "konflikte"
  },
  {
    title: "Zuhören ohne Zustimmen",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eeZIHGmfprWnoPPf.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/toeDsBefZFNbxXYc.pdf",
    category: "techniken"
  },
  {
    title: "Beispiel-Dialog",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YZGoCcmXszaQGVtV.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WZdsgoAKaJwvMCjp.pdf",
    category: "praxis"
  },
  {
    title: "Spickzettel Krisenkommunikation (A4)",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tgVHTaXVryVEuEss.webp",
    pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YvXkEbRmwIcCFtsj.pdf",
    category: "praxis"
  }
];

export default function Kommunizieren() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === "alle"
    ? kommItems
    : kommItems.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO title="Kommunizieren" description="Wirksame Kommunikationsstrategien für den Umgang mit Menschen mit Borderline." path="/kommunizieren" />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-light flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-slate-blue" />
              </div>
              <span className="text-sm font-medium text-slate-blue">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Kommunizieren
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kommunikation löst nicht alles. Sie kann Konflikte aber entschärfen, Missverständnisse einordnen helfen und Ihre eigene Position klarer machen. Hier finden Sie Haltungen und Formulierungen für belastende Gespräche.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Validierung */}
            <ContentSection
              title="Validierung: Die wichtigste Technik"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="validierung"
              defaultOpen={true}
              preview="Validieren heisst: Ich zeige der anderen Person, dass ich sie ernst nehme und dass ihre Gefühle für mich Sinn machen."
            >
              {/* Was bedeutet validieren? */}
              <Card className="bg-terracotta-light/10 border-terracotta mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Was bedeutet «validieren»?</h3>
                  <p className="text-foreground leading-relaxed text-lg mb-3">
                    <strong>Validieren heisst:</strong> Ich zeige der anderen Person, dass ich <strong>sie ernst nehme</strong> und dass ihre Gefühle/Erlebnisse <strong>für mich Sinn machen</strong> – <em>auch wenn ich nicht alles gut finde oder nicht einverstanden bin.</em>
                  </p>
                  <p className="text-foreground leading-relaxed mb-3">
                    <Link to="/glossar?q=Validierung" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">Validierung</Link> ist <strong>keine Zustimmung</strong>, kein «Du hast recht», und auch kein «Ich gebe nach».
                  </p>
                  <p className="text-foreground leading-relaxed font-medium italic">
                    Es ist eher: «Ich verstehe, dass du dich so fühlst – und ich bleibe mit dir im Kontakt.»
                  </p>
                </CardContent>
              </Card>

              {/* Warum ist Validierung bei Borderline so wichtig? */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Warum ist Validierung bei Borderline so wichtig?</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Menschen mit Borderline erleben Gefühle oft <strong className="text-foreground">sehr intensiv</strong> und reagieren schnell auf Signale von <strong className="text-foreground">Ablehnung, Kritik, Distanz oder Unklarheit</strong>. Wenn sie sich <em>nicht gesehen</em> oder <em>missverstanden</em> fühlen, kann das die innere Anspannung massiv erhöhen (z.{"\u00A0"}B. Wut, Angst, Verzweiflung, Rückzug).
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-4">
                    <p className="text-foreground leading-relaxed font-medium">
                      Validierung wirkt oft wie ein emotionales Geländer: Sie kann Stress senken, Eskalation bremsen und den Boden für späteres Problemlösen bereiten.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Wann lohnt sich Validierung besonders? */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">Wann lohnt sich Validierung besonders?</h3>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  {[
                    "Wenn die Stimmung kippt (Wut, Tränen, Vorwürfe, Panik)",
                    "Bei Konflikten (\"Du liebst mich nicht!\", \"Du lässt mich allein!\")",
                    "Nach Selbstverletzung/Impulsdurchbrüchen (ohne Moralpredigt)",
                    'Wenn Sie merken: «Ich will erklären – aber es wird nur schlimmer.»',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-terracotta-mid flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Card className="bg-terracotta-wash border-terracotta-mid/20">
                  <CardContent className="p-4">
                    <p className="text-foreground font-medium text-sm">
                      Merksatz: <em>Erst beruhigen (Verbindung), dann klären (Inhalt).</em>
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">Die 6 Stufen der Validierung</h3>
              <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
                Einfach, praktisch, mit Beispielsätzen – basierend auf Marsha Linehans DBT-Modell.
              </p>
              
              <ValidierungsStufenleiter />

              {/* Mini-Leitfaden für schwierige Momente */}
              <div className="mt-10 pt-6 border-t border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-sand-mid" />
                  Mini-Leitfaden für schwierige Momente
                </h3>

                <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash/30 mb-5">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-foreground mb-3">Wenn es gerade eskaliert:</h4>
                    <ol className="space-y-3">
                      {[
                        { step: "Stoppen:", text: "«Warte kurz. Ich will nicht streiten.»" },
                        { step: "Validieren (Stufe 1–2):", text: "«Ich höre dich. Du bist gerade sehr verletzt.»" },
                        { step: "Benennen + Grenze:", text: "«Ich bleibe da, aber nicht bei Beschimpfungen.»" },
                        { step: "Vorschlag:", text: "«Lass uns 10 Minuten runterfahren und dann weiterreden.»" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-terracotta-mid text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-foreground">
                            <strong>{item.step}</strong> {item.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-foreground mb-3">Drei hilfreiche Sätze als Einstieg</h4>
                    <div className="space-y-2">
                      {[
                        "«Ich sehe, dass es dir gerade richtig schlecht geht.»",
                        "«Es macht Sinn, dass das dich so trifft.»",
                        "«Ich bin da – und wir schauen Schritt für Schritt.»",
                      ].map((satz, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-sage-mid flex-shrink-0 mt-0.5" />
                          <p className="text-foreground font-medium text-sm">{satz}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Kein Satz passt immer. Entscheidend sind Tonfall, Timing und ob sich Ihr Gegenüber in diesem Moment eher nach Nähe, Struktur oder Abstand sehnt.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Häufige Missverständnisse */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-slate-mid" />
                  Häufige Missverständnisse bei Angehörigen
                </h3>

                <div className="space-y-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">«Wenn ich validiere, verstärke ich doch die Situation.»</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nein. Sie bestätigen <strong className="text-foreground">das Erleben</strong>, nicht jede Interpretation. Sie können validieren und trotzdem sagen: «Ich sehe dich – und ich bleibe bei meiner Grenze.»
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">«Soll ich auch validieren, wenn Vorwürfe unfair sind?»</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Ja – <strong className="text-foreground">den emotionalen Kern</strong>, nicht den Vorwurf. Beispiel: «Ich sehe deine Angst/Verletzung» statt «Ja stimmt, ich bin schuld».
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">«Wann ist der richtige Zeitpunkt für Problemlösen?»</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Meist <strong className="text-foreground">erst nach</strong> etwas Beruhigung. Wenn die Anspannung hoch ist, wirkt Logik wie Ablehnung.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            {/* SET-Kommunikation */}
            <ContentSection
              title="SET-Kommunikation"
              icon={<MessageCircle className="w-7 h-7 text-slate-blue" />}
              id="set-kommunikation"
              preview="Support, Empathy, Truth – eine Kommunikationstechnik speziell für den Umgang mit Menschen mit Borderline."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                <Link to="/glossar?q=SET-Kommunikation" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">SET</Link> ist eine Kommunikationstechnik, die speziell für den Umgang mit Menschen mit Borderline entwickelt wurde. Sie besteht aus drei Elementen:
              </p>
              
              <div className="grid gap-4">
                {[
                  {
                    letter: "S",
                    title: "Support (Unterstützung)",
                    description: "Drücken Sie Ihre Sorge und Ihr Mitgefühl aus.",
                    example: "\"Ich mache mir Sorgen um dich. Ich möchte dir helfen.\"",
                    color: "var(--color-sage)"
                  },
                  {
                    letter: "E",
                    title: "Empathy (Empathie)",
                    description: "Zeigen Sie, dass Sie die Gefühle verstehen.",
                    example: "\"Ich kann verstehen, dass dich das wütend macht. Das klingt wirklich frustrierend.\"",
                    color: "var(--color-terracotta)"
                  },
                  {
                    letter: "T",
                    title: "Truth (Wahrheit)",
                    description: "Benennen Sie die Realität und mögliche Konsequenzen.",
                    example: "\"Wenn du jetzt gehst, kann ich nicht wissen, ob es dir gut geht. Das macht mir Angst.\"",
                    color: "var(--color-slate-blue)"
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
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
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

              {/* SET Zuordnungsübung */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="font-semibold text-foreground text-base mb-1">Übung: SET zuordnen</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Testen Sie Ihr Verständnis: Ordnen Sie Aussagen der richtigen SET-Kategorie zu.
                </p>
                <SETDragDrop />
              </div>
            </ContentSection>

            {/* Fallbeispiel */}
            <ContentSection
              title="Beispiel: Validierung in der Praxis"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="fallbeispiel"
              preview="Lisa kommt aufgelöst nach Hause: «Meine Kollegin hasst mich!» – So reagieren Sie richtig."
            >
                <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash/20">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-terracotta-mid bg-terracotta-light/30 px-2 py-1 rounded">Situation</span>
                    <p className="text-foreground mt-2 leading-relaxed">
                      Lisa kommt aufgelöst nach Hause: <span className="italic">«Meine Kollegin hasst mich! Sie hat mich heute nicht begrüsst!»</span>
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                      <span className="text-sm font-medium text-terracotta-mid block mb-2">❌ <Link to="/glossar?q=Invalidierung" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">Invalidierung</Link>:</span>
                      <p className="text-sm text-muted-foreground italic">«Das bildest du dir ein. Sie war bestimmt nur in Eile.»</p>
                    </div>
                    <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                      <span className="text-sm font-medium text-sage-mid block mb-2">✓ Mit Validierung:</span>
                      <p className="text-sm text-muted-foreground italic">«Das klingt wirklich verletzend. Ich kann verstehen, dass dich das beschäftigt.»</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-sage-lighter/50 rounded-xl">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Dann, wenn sie ruhiger ist:</h3>
                    <p className="text-sm text-muted-foreground italic">
                      «Könnte es sein, dass sie einfach in Eile war? Was denkst du?»
                    </p>
                      <p className="text-xs text-muted-foreground mt-2">
                      → Erst emotional andocken, dann gemeinsam prüfen.
                      </p>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Konkrete Beispiel-Dialoge */}
            <ContentSection
              title="Konkrete Formulierungen für den Alltag"
              icon={<MessageCircle className="w-7 h-7 text-terracotta" />}
              id="kommunizieren-formulierungen"
              preview="Konkrete Sätze für verschiedene Situationen: Emotionen, Vorwürfe, Rückzug, Schwarz-Weiss-Denken."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hier finden Sie konkrete Sätze, die Sie in verschiedenen Situationen verwenden können. Passen Sie sie an Ihre Beziehung und Situation an.
              </p>

              {/* Situation 1: Intensive Emotionen */}
              <Card className="mb-4 border-terracotta/30">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    🌊 Wenn Ihr Angehöriger von Emotionen überflutet wird
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich sehe, dass dich das gerade sehr mitnimmt. Ich bin hier. Wir müssen das jetzt nicht lösen."</p>
                    </div>
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Das klingt wirklich schmerzhaft. Möchtest du mir mehr erzählen, oder soll ich einfach bei dir sein?"</p>
                    </div>
                    <div className="bg-terracotta-wash rounded-lg p-4 border-l-4 border-terracotta-mid">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Beruhige dich!" / "Das ist doch nicht so schlimm." / "Du überreagierst."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 2: Vorwürfe */}
              <Card className="mb-4 border-terracotta/30">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    ⚡ Wenn Sie mit Vorwürfen konfrontiert werden
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich höre, dass du dich von mir im Stich gelassen fühlst. Das war nicht meine Absicht. Kannst du mir sagen, was du gerade brauchst?"</p>
                    </div>
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Es tut mir leid, dass mein Verhalten dich verletzt hat. Das wollte ich nicht. Lass uns darüber sprechen."</p>
                    </div>
                    <div className="bg-terracotta-wash rounded-lg p-4 border-l-4 border-terracotta-mid">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Du bist unfair!" / "Das stimmt doch gar nicht!" / "Du verdrehst alles."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 3: Rückzug */}
              <Card className="mb-4 border-terracotta/30">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    🚪 Wenn Ihr Angehöriger sich zurückzieht
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich merke, dass du gerade Abstand brauchst. Das ist okay. Ich bin da, wenn du bereit bist."</p>
                    </div>
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Du musst jetzt nicht reden. Ich lasse dir Raum. Sag mir einfach, wenn du etwas brauchst."</p>
                    </div>
                    <div className="bg-terracotta-wash rounded-lg p-4 border-l-4 border-terracotta-mid">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Rede endlich mit mir!" / "Du kannst nicht einfach weglaufen!" / "Typisch, du machst dicht."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 4: Schwarz-Weiss-Denken */}
              <Card className="mb-4 border-terracotta/30">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    ⚫⚪ Bei Schwarz-Weiss-Aussagen ("Du liebst mich nicht mehr!")
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich verstehe, dass es sich gerade so anfühlt. Meine Gefühle für dich haben sich nicht geändert, auch wenn wir gerade Schwierigkeiten haben."</p>
                    </div>
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Ich liebe dich. Und ich bin auch frustriert über diese Situation. Beides ist wahr."</p>
                    </div>
                    <div className="bg-terracotta-wash rounded-lg p-4 border-l-4 border-terracotta-mid">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Das ist Quatsch!" / "Natürlich liebe ich dich, hör auf damit!" / "Schon wieder diese Diskussion."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Situation 5: Nach einem Streit */}
              <Card className="mb-4 border-terracotta/30">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
                    🕊️ Nach einem Streit wieder ins Gespräch kommen
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Sagen Sie:</p>
                      <p className="text-foreground font-medium">"Ich möchte über gestern sprechen, wenn du bereit bist. Nicht um Recht zu haben, sondern um zu verstehen."</p>
                    </div>
                    <div className="bg-sage-lighter rounded-lg p-4 border-l-4 border-sage-mid">
                      <p className="text-sm text-muted-foreground mb-1">Oder:</p>
                      <p className="text-foreground font-medium">"Es tut mir leid, wie ich reagiert habe. Ich war überfordert. Können wir nochmal von vorne anfangen?"</p>
                    </div>
                    <div className="bg-terracotta-wash rounded-lg p-4 border-l-4 border-terracotta-mid">
                      <p className="text-sm text-muted-foreground mb-1">Vermeiden Sie:</p>
                      <p className="text-foreground">"Siehst du jetzt ein, dass du falsch lagst?" / "Können wir das einfach vergessen?" / Schweigen als Strafe.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Hinweise für verschiedene Situationen */}
            <ContentSection
              title="Hinweise für Ihre Situation"
              icon={<Users className="w-7 h-7 text-slate-mid" />}
              id="kommunizieren-situationen"
              preview="Spezifische Kommunikationstipps für Partner, Eltern und erwachsene Kinder."
            >
              <div className="space-y-4">
                <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-terracotta-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Als Partner/in</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          In Partnerschaften ist die emotionale Intensität oft am höchsten. Validierung bedeutet nicht, dass Sie mit allem einverstanden sind. Sie können die Gefühle Ihres Partners anerkennen und trotzdem bei Ihrer eigenen Wahrnehmung bleiben.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-lighter flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-slate-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Als Elternteil</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Die Eltern-Kind-Dynamik macht Kommunikation besonders komplex. Alte Muster sitzen tief. Versuchen Sie, Ihr erwachsenes Kind als eigenständige Person zu sehen – nicht als das Kind, das Sie einmal grossgezogen haben. Das verändert den Ton.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                        <UserCircle className="w-5 h-5 text-sage-mid" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Als erwachsenes Kind</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sie haben vielleicht gelernt, Ihre eigenen Gefühle zu unterdrücken, um Ihren Elternteil nicht zu «provozieren». Ihre Gefühle sind genauso gültig. Sie dürfen auch mal sagen: «Ich brauche gerade Abstand» – ohne schlechtes Gewissen.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-slate-blue" />
                Materialien zum Thema
              </h2>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span><strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.</span>
              </p>
              {/* Filter-Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
                {kommSubcategories.map((cat) => {
                  const Icon = cat.icon;
                  const count = cat.id === "alle"
                    ? kommItems.length
                    : kommItems.filter(i => i.category === cat.id).length;
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
              
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch mb-6">
                {filteredItems.map((item) => (
                  <Card key={item.title} className="h-full overflow-hidden hover:shadow-lg transition-all duration-500 group">
                    <div className="aspect-[4/3] bg-muted">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover object-top" loading="lazy" width={400} height={223} decoding="async" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground text-sm mb-2">{item.title}</h3>
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
              
              <div className="text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien ansehen
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Link href="/unterstuetzen/uebersicht">
                <Button variant="ghost">
                  ← Unterstützen
                </Button>
              </Link>
              <Link href="/grenzen">
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
