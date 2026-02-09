import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, ArrowRight, CheckCircle2, Heart, AlertTriangle, Download, FileText, Image, Clock, HeartHandshake, Home, Wallet, Users, Baby, UserCircle, ExternalLink, Eye, Filter, Search, MessageSquare, HandMetal } from "lucide-react";
import { Link } from "wouter";
import ContentSection from "@/components/ContentSection";
import { useState, useRef } from "react";
import SpiegelnUebung from "@/components/interactive/SpiegelnUebung";
import DEARSatzbaukasten from "@/components/interactive/DEARSatzbaukasten";

const grenzenSubcategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "erkennen", label: "Erkennen", icon: Search },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageSquare },
  { id: "handeln", label: "Handeln", icon: HandMetal },
];

export default function Grenzen() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const grenzenItems = [
    {
      title: "Die DEAR-Technik",
      description: "4 Schritte für respektvolle Grenzsetzung",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yBSkvBJGSeNvxINq.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DDkqUiaNJwizEtPv.pdf",
      category: "kommunizieren"
    },
    {
      title: "Spiegeln statt Aufsaugen",
      description: "Mitfühlen ohne Übernehmen",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/rbDvjxTUWJMXQCPj.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jJFieYXEiIxbrazO.pdf",
      category: "kommunizieren"
    },
    {
      title: "Die 4 Arten von Grenzen",
      description: "Physisch, emotional, zeitlich, materiell",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/otBFiwevLwWQsinR.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KiiZJfLHYOlNVTsn.pdf",
      category: "erkennen"
    },
    {
      title: "Grenzen erkennen",
      description: "5 Warnsignale Ihres Körpers",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pPRcjWVKERfSWUPL.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FftUeWuOzmxjrUEi.pdf",
      category: "erkennen"
    },
    {
      title: "Warum Grenzen helfen",
      description: "Grenzen sind kein Liebesentzug",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OThoeNNdbDhNrJNh.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DpeSphZCAdlpzyAm.pdf",
      category: "erkennen"
    },
    {
      title: "L.M.K. (Lebe Mit Konsequenzen)",
      description: "Wenn Grenzen nicht respektiert werden",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/izBLuzTFtMDeQYoc.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/eyhngTnxXoekiWwJ.pdf",
      category: "handeln"
    },
    {
      title: "Grenzen kommunizieren",
      description: "Beispielsätze für den Alltag",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pnhMjTPpcABZhMju.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WtwEVMqmpQQAvNJC.pdf",
      category: "kommunizieren"
    },
    {
      title: "Spickzettel Grenzen",
      description: "A4 zum Laminieren – alle Sätze auf einen Blick",
      url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/avGqFKFuKFfFYANu.webp",
      pdfUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/obwIZiRPiVPphIUX.pdf",
      category: "handeln"
    }
  ];

  const filteredItems = activeFilter === "alle"
    ? grenzenItems
    : grenzenItems.filter(i => i.category === activeFilter);

  return (
    <Layout>
      <SEO title="Grenzen setzen" description="Gesunde Grenzen setzen und wahren – für Angehörige von Menschen mit Borderline." path="/grenzen" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-terracotta-lighter/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-terracotta-lighter flex items-center justify-center">
                <Shield className="w-6 h-6 text-terracotta-mid" />
              </div>
              <span className="text-sm font-medium text-terracotta-mid">Lesezeit: 12 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Grenzen setzen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Grenzen sind keine Mauern – sie sind Leitplanken. Sie schützen Sie und geben Ihrem Angehörigen Orientierung. Hier lernen Sie, wie Sie sie liebevoll, aber klar kommunizieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Warum Grenzen wichtig sind */}
            <ContentSection
              title="Warum Grenzen wichtig sind"
              icon={<Shield className="w-7 h-7 text-terracotta-mid" />}
              id="warum-grenzen"
              defaultOpen={true}
              preview="Grenzen zu setzen ist kein Zeichen von Lieblosigkeit – es ist ein Zeichen von Selbstachtung und Respekt."
            >
              <Card className="bg-terracotta-lighter/20 border-terracotta-mid mb-6">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed">
                    Grenzen zu setzen ist kein Zeichen von Lieblosigkeit – es ist ein Zeichen von Selbstachtung und Respekt. Klare Grenzen helfen beiden Seiten:
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Für Sie:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Schutz vor Burnout
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Erhalt der eigenen Identität
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Langfristige Beziehungsfähigkeit
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">Für Ihren Angehörigen:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Klare Orientierung
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Sicherheit durch Berechenbarkeit
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage-mid mt-0.5 flex-shrink-0" />
                        Modell für gesunde Beziehungen
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            {/* Arten von Grenzen */}
            <ContentSection
              title="Arten von Grenzen"
              icon={<Clock className="w-7 h-7 text-slate-mid" />}
              id="arten-von-grenzen"
              preview="Zeitliche, emotionale, physische und finanzielle Grenzen – mit konkreten Beispielen."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Zeitliche Grenzen",
                    description: "Wann sind Sie erreichbar? Wann brauchen Sie Ruhe?",
                    example: "\"Nach 22 Uhr bin ich nicht mehr erreichbar für Telefonate.\"",
                    icon: Clock,
                    color: "var(--color-slate-mid)",
                    bgColor: "var(--color-slate-lighter)"
                  },
                  {
                    title: "Emotionale Grenzen",
                    description: "Welches Verhalten können Sie tolerieren? Was nicht?",
                    example: "\"Wenn du mich anschreist, verlasse ich den Raum.\"",
                    icon: HeartHandshake,
                    color: "var(--color-terracotta-mid)",
                    bgColor: "var(--color-terracotta-lighter)"
                  },
                  {
                    title: "Physische Grenzen",
                    description: "Ihr Körper, Ihr Raum, Ihre Privatsphäre.",
                    example: "\"Mein Zimmer ist mein Rückzugsort. Bitte klopfe an.\"",
                    icon: Home,
                    color: "var(--color-sage-mid)",
                    bgColor: "var(--color-sage-lighter)"
                  },
                  {
                    title: "Finanzielle Grenzen",
                    description: "Wie viel Unterstützung können und wollen Sie geben?",
                    example: "\"Ich kann dir einmal im Monat mit X Franken helfen.\"",
                    icon: Wallet,
                    color: "var(--color-sand-warm)",
                    bgColor: "var(--color-sand-muted)"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className={`border-border/50 hover:shadow-md transition-all duration-500 ${index === 0 ? "sm:col-span-2" : ""}`} style={{ borderTopWidth: '4px', borderTopColor: item.color }}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: item.bgColor }}
                          >
                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 mt-3">
                          <p className="text-sm text-foreground italic">{item.example}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ContentSection>

            {/* Wie Grenzen kommunizieren */}
            <ContentSection
              title="Grenzen liebevoll kommunizieren"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="grenzen-kommunizieren"
              preview="Die LMK-Formel: Liebe zeigen, Meine Grenze benennen, Konsequenz erklären."
            >
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
                  <Card key={item.letter} className="border-l-4 border-l-terracotta">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-lg bg-terracotta text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-terracotta-light/20 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ContentSection>

            {/* DEAR-Technik */}
            <ContentSection
              title="Die DEAR-Technik (nach Marsha Linehan)"
              icon={<CheckCircle2 className="w-7 h-7 text-sage-mid" />}
              id="dear-technik"
              preview="Describe, Express, Assert, Reinforce – 4 Schritte für respektvolle Grenzsetzung aus der DBT."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die DEAR-Technik aus der Dialektisch-Behavioralen Therapie (DBT) hilft Ihnen, Grenzen klar und respektvoll zu kommunizieren – ohne Vorwürfe, aber mit Wirkung.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    letter: "D",
                    title: "Describe (Beschreiben)",
                    description: "Beschreiben Sie die Situation sachlich, ohne Bewertung oder Interpretation.",
                    example: "«Wenn du mich anrufst und ich nicht sofort abhebe...»"
                  },
                  {
                    letter: "E",
                    title: "Express (Ausdrücken)",
                    description: "Drücken Sie Ihre Gefühle aus – mit Ich-Botschaften, nicht mit Vorwürfen.",
                    example: "«...fühle ich mich unter Druck gesetzt.»"
                  },
                  {
                    letter: "A",
                    title: "Assert (Bitten)",
                    description: "Formulieren Sie eine klare Bitte oder Grenze – konkret und umsetzbar.",
                    example: "«Ich möchte, dass du mir 30 Minuten Zeit gibst, bevor du erneut anrufst.»"
                  },
                  {
                    letter: "R",
                    title: "Reinforce (Verstärken)",
                    description: "Zeigen Sie die positiven Konsequenzen auf – was hat die andere Person davon?",
                    example: "«Dann kann ich entspannter mit dir sprechen und bin wirklich für dich da.»"
                  }
                ].map((item) => (
                  <Card key={item.letter} className="border-l-4 border-l-sage-mid">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-full bg-sage-mid text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {item.letter}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="bg-sage-lighter/50 rounded-lg p-3">
                            <p className="text-sm text-foreground italic">{item.example}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-sage-wash/50 border-sage-mid/30">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">Beispiel komplett:</h4>
                  <p className="text-foreground leading-relaxed italic">
                    «Wenn du mich anrufst und ich nicht sofort abhebe <span className="text-muted-foreground">(D)</span>, 
                    fühle ich mich unter Druck gesetzt <span className="text-muted-foreground">(E)</span>. 
                    Ich möchte, dass du mir 30 Minuten Zeit gibst, bevor du erneut anrufst <span className="text-muted-foreground">(A)</span>. 
                    Dann kann ich entspannter mit dir sprechen und bin wirklich für dich da <span className="text-muted-foreground">(R)</span>.»
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
              </p>

              {/* Interaktiver DEAR-Satzbaukasten */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-semibold text-foreground mb-1">Jetzt selbst ausprobieren</h4>
                <p className="text-sm text-muted-foreground mb-0">
                  Formulieren Sie Ihren eigenen DEAR-Satz für eine aktuelle Situation:
                </p>
                <DEARSatzbaukasten />
              </div>
            </ContentSection>

            {/* Konkrete Beispiel-Dialoge */}
            <ContentSection
              title="Konkrete Formulierungen für schwierige Situationen"
              icon={<HeartHandshake className="w-7 h-7 text-terracotta-mid" />}
              id="grenzen-formulierungen"
              preview="Spiegeln statt Aufnehmen – Beispielsätze für Vorwürfe, Gefühlsausbrüche, Grenzsetzung und Drohungen."
            >
              <p className="text-muted-foreground leading-relaxed mb-2">
                Lesen Sie die Situation und überlegen Sie kurz, bevor Sie die empfohlene Antwort aufdecken. Das Prinzip: <strong>Spiegeln statt Aufnehmen</strong> – Sie nehmen die Gefühle wahr, ohne sie zu übernehmen.
              </p>
              
              <SpiegelnUebung />
              
              <Card className="mt-6 bg-terracotta-wash border-terracotta-light">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tipp:</strong> Üben Sie diese Sätze laut vor dem Spiegel oder mit einer Vertrauensperson. In emotionalen Momenten ist es leichter, auf eingeübte Formulierungen zurückzugreifen.
                  </p>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Häufige Fehler */}
            <ContentSection
              title="Häufige Fehler vermeiden"
              icon={<AlertTriangle className="w-7 h-7 text-terracotta-mid" />}
              id="haeufige-fehler"
              preview="Die 5 häufigsten Fehler beim Grenzen setzen – und wie Sie es besser machen."
            >
              <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
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
                        <span className="text-terracotta-mid flex-shrink-0">✗</span>
                        <span className="text-muted-foreground line-through">{item.wrong}</span>
                        <span className="text-sage-mid">→</span>
                        <span className="text-foreground">{item.right}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* Hinweise für verschiedene Angehörigengruppen */}
            <ContentSection
              title="Hinweise für Ihre Situation"
              icon={<Users className="w-7 h-7 text-slate-mid" />}
              id="grenzen-angehoerigengruppen"
              preview="Spezifische Hinweise zum Grenzen setzen für Partner, Eltern und erwachsene Kinder."
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
                          Die Entscheidung, in der Beziehung zu bleiben, ist Ihre – und beide Optionen sind legitim. Grenzen zu setzen bedeutet nicht, die Beziehung aufzugeben. Es bedeutet, sie auf eine gesündere Basis zu stellen. Erlauben Sie sich, auch Ihre eigenen Bedürfnisse ernst zu nehmen.
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
                          Sie tragen keine Verantwortung für die Erkrankung Ihres Kindes – aber Sie können ein stabilisierender Faktor sein. Grenzen zu setzen ist kein Zeichen von Ablehnung, sondern ein Modell für gesunde Beziehungen. Ihr erwachsenes Kind braucht Eltern, die auch auf sich selbst achten.
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
                          Sie sind nicht verpflichtet, die emotionalen Bedürfnisse Ihres Elternteils zu erfüllen – das war nie Ihre Aufgabe. Grenzen zu setzen kann sich wie Verrat anfühlen, ist aber ein wichtiger Schritt zu Ihrer eigenen emotionalen Gesundheit. Sie dürfen Ihr eigenes Leben leben.
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
                <Download className="w-8 h-8 text-terracotta-mid" />
                Infografiken zum Thema Grenzen
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Alle Infografiken können Sie herunterladen, ausdrucken und teilen.
              </p>
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span><strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.</span>
              </p>

              {/* Filter-Tabs */}
              <div className="flex flex-wrap gap-2 pb-3 mb-6 -mx-1 px-1">
                {grenzenSubcategories.map((cat) => {
                  const Icon = cat.icon;
                  const count = cat.id === "alle"
                    ? grenzenItems.length
                    : grenzenItems.filter(i => i.category === cat.id).length;
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
                      className={`whitespace-nowrap ${activeFilter === cat.id ? "bg-terracotta-mid hover:bg-terracotta-dark text-white" : ""}`}
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
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={400}
                        height={223}
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-white">{item.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-3">
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
              
              <div className="mt-6 text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien ansehen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Wichtiger Hinweis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <Card className="bg-sage-light/30 border-sage">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
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
                <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
