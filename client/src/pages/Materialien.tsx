import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Filter, BookOpen, Heart, MessageCircle, Shield, AlertTriangle, RefreshCw, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// ═══════════════════════════════════════════════════════════════════════════
// MATERIALIEN-SEITE – ÜBERARBEITUNG IN PROGRESS
// Stand: 06.02.2026
// ═══════════════════════════════════════════════════════════════════════════

// Kategorie 1: Verstehen (6 Infografiken)
const infografiken: Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  url: string;
  isNew?: boolean;
}> = [
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 1: VERSTEHEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "1-1-leuchtturm",
    title: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    description: "Zustandsdiagramm: Stabil bleiben trotz Sturm. Sie können das Schiff nicht steuern – aber Orientierung geben.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GlUhswKtlvohFlIh.png",
    isNew: true
  },
  {
    id: "1-2-eisberg",
    title: "Der Eisberg – Wut ist oft die Spitze",
    description: "Stock-&-Flow-Diagramm: Was Sie sehen (Wut) ist oft nur die Spitze – darunter liegen Schmerz, Angst, Scham.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PbEHipeLgAfCDHrD.png",
    isNew: true
  },
  {
    id: "1-3-spaltung",
    title: "Spaltung – das Pendel zwischen Extremen",
    description: "Zustandsdiagramm: Unter Stress kippt die Bewertung leicht ins Extreme – die Grauzone wird schwer erreichbar.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/QpYHKGyJuyXSDvFd.png",
    isNew: true
  },
  {
    id: "1-4-alarm-denk-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description: "Zustandsdiagramm: Im Alarm-Modus ist Logik oft nicht erreichbar – erst beruhigen, dann klären.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KbfVuBlwpRcOnfnK.png",
    isNew: true
  },
  {
    id: "1-5-vier-phasen-zyklus",
    title: "Der 4-Phasen-Zyklus – das vorhersehbare Muster",
    description: "Kausal-Loop: Krisen wirken chaotisch – folgen aber oft einem wiederkehrenden Ablauf.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gOBpgEsUQzJNRQhJ.png",
    isNew: true
  },
  {
    id: "1-6-gehirn-verstehen",
    title: "Das Gehirn verstehen – Neurobiologie einfach erklärt",
    description: "Sequenzdiagramm: Bei starkem Stress dominiert Alarm – erst danach wird klares Denken wieder möglich.",
    category: "verstehen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ijWNborYXfQWvfcG.png",
    isNew: true
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 2: KOMMUNIZIEREN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "2-1-drei-schritte",
    title: "Wenn Gespräche kippen: 3 Schritte, die helfen",
    description: "Timeline mit Reset-Loop: In Hochstress hilft ein Standardablauf – beruhigen, verbinden, begrenzen + Plan.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NHwJBJOisdMBlske.png",
    isNew: true
  },
  {
    id: "2-2-standardsatz",
    title: "Der Standardsatz: 2 Sätze, die deeskalieren",
    description: "Copy-ready Sätze zum Ablesen: Erst Gefühl anerkennen, dann Grenze + Plan – ohne Diskussion.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KnTbEkRJKARpfZUn.png",
    isNew: true
  },
  {
    id: "2-3-grenzen-setzen",
    title: "Grenzen setzen, ohne zu eskalieren",
    description: "3-Kacheln-Formel: Fakt + Ich-Grenze + nächster Schritt – kurz und klar.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PNJVxxvEPKiGWGEw.png",
    isNew: true
  },
  {
    id: "2-4-pause-exit",
    title: "Pause statt Streit: so beenden Sie ein Gespräch sicher",
    description: "Ampel-Zustandsdiagramm: Wenn Respekt nicht möglich ist, ist eine Pause die beste Deeskalation.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KwpkUVzgwMIXDJQA.png",
    isNew: true
  },
  {
    id: "2-5-zuhoeren-ohne-zustimmen",
    title: "Zuhören ohne Zustimmen – so geht das konkret",
    description: "2-Spalten mit Brücke: Sie können Gefühle anerkennen, ohne Verhalten gutzuheissen.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/AjwTxyISldFJZOAc.png",
    isNew: true
  },
  {
    id: "2-6-beispiel-dialog",
    title: "Beispiel-Dialog: kurz bleiben, ruhig bleiben",
    description: "Chat-Sequenzdiagramm: Kurz + ruhig + wiederholbar wirkt in Krisen stärker als Argumente.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/iEvsaSHHCkBeAxtw.png",
    isNew: true
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // SPICKZETTEL (A4, laminierbar)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "spickzettel-krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description: "Laminierbarer 1-Seiter mit allen Standardsätzen für die Krise – zum Ablesen in akuten Situationen.",
    category: "kommunizieren",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PuRcoSiRiDEyUyfJ.png",
    isNew: true
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 3: UNTERSTÜTZEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "k3-1-krisenmodus",
    title: "Im Krisenmodus – Orientierung geben",
    description: "Zustandsdiagramm: Wie ein verlorenes Kind braucht Ihr Gegenüber in der Krise Ruhe und Orientierung – nicht Argumente.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xtLfLjrMcXYGTwxM.png",
    isNew: true
  },
  {
    id: "k3-2-rolle-klaeren",
    title: "Ihre Rolle klären – Was Sie sein können (und was nicht)",
    description: "2-Spalten-Vergleich: Sie sind Angehörige/r – nicht Therapeut/in. Diese Klarheit entlastet beide Seiten.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vaCFqwCuuKxsdrNX.png",
    isNew: true
  },
  {
    id: "k3-3-drei-saeulen",
    title: "Drei Säulen hilfreicher Unterstützung",
    description: "3-Kacheln: Präsenz zeigen, Gefühle validieren, Stabilität bieten – das Fundament guter Begleitung.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YHowYJcztGiSoHgG.png",
    isNew: true
  },
  {
    id: "k3-4-konsistenz",
    title: "Konsistenz-Prinzip – als Team wird es leichter",
    description: "Kausal-Loop: Wenn alle ähnlich reagieren, entsteht Sicherheit – und Eskalationen werden seltener.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xTKHgAUyCVKxSkUf.png",
    isNew: true
  },
  {
    id: "k3-5-leitlinien",
    title: "6 Leitlinien für Angehörige – So können Sie unterstützen",
    description: "Evidenzbasierte Empfehlungen nach Gunderson: 6 konkrete Leitlinien zum Abhaken und Umsetzen.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XnTABWiNreMbJdDF.png",
    isNew: true
  },
  {
    id: "k3-6-achtsamkeit",
    title: "Beziehungs-Achtsamkeit – 4 Schritte im Alltag",
    description: "Timeline: Innehalten → Wahrnehmen → Nicht bewerten → Bewusst handeln – weniger Autopilot, mehr Klarheit.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/LpcrkEadNAXxIvPd.png",
    isNew: true
  },
  {
    id: "k3-7-alltags-tipps",
    title: "Was Sie konkret tun können – 4 Alltags-Tipps",
    description: "4-Kacheln-Checkliste: Übungspartner sein, Fortschritte anerkennen, Vorhersehbar sein, Gemeinsam Probleme lösen.",
    category: "unterstuetzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/uOrYGTcGgbyHKrGp.png",
    isNew: true
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // KATEGORIE 4: GRENZEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "k4-1-dear-technik",
    title: "Die DEAR-Technik – Grenzen setzen ohne Vorwürfe",
    description: "4-Stufen-Treppe: Beschreiben → Äussern → Behaupten → Verstärken. Die DBT-Methode für respektvolle Grenzsetzung.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/AgAggkliBSItqYDr.png",
    isNew: true
  },
  {
    id: "k4-2-spiegeln-aufsaugen",
    title: "Spiegeln statt Aufsaugen – Mitfühlen ohne Übernehmen",
    description: "Split-Screen-Vergleich: Schwamm vs. Spiegel. Sie können Gefühle anerkennen, ohne sie zu Ihren eigenen zu machen.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FqhUAZdQCSplTTDr.png",
    isNew: true
  },
  {
    id: "k4-3-vier-arten-grenzen",
    title: "Die 4 Arten von Grenzen – Wissen, was Sie schützen",
    description: "4-Quadranten: Physische, emotionale, zeitliche und materielle Grenzen – mit konkreten Beispielsätzen.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/pWWXLaHHMNteMPmi.png",
    isNew: true
  },
  {
    id: "k4-4-grenzen-erkennen",
    title: "Grenzen erkennen – 5 Warnsignale Ihres Körpers",
    description: "Körper-Silhouette mit 5 Signalen: Bauch, Brust, Nacken, Erschöpfung, Fluchtimpuls. Lernen Sie, auf Ihren Körper zu hören.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qutlJrbHtdlIisDv.png",
    isNew: true
  },
  {
    id: "k4-5-warum-grenzen-helfen",
    title: "Warum Grenzen auch dem Borderliner helfen",
    description: "5-Säulen-Modell: Identität, Struktur, Sicherheit, Intimität, Vorbild – Grenzen sind kein Liebesentzug.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JrawebXkisbnuqir.png",
    isNew: true
  },
  {
    id: "k4-6-lmk-exit-strategie",
    title: "L.M.K. (Lebe Mit Konsequenzen) – Wenn Grenzen nicht respektiert werden",
    description: "Entscheidungsbaum mit Anwendungskontext: Grenze → Reaktion → Konsequenz. Keine Strafe – sondern Selbstschutz.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JekVLuPUNFqETzWn.png",
    isNew: true
  },
  {
    id: "k4-7-grenzen-kommunizieren",
    title: "Grenzen kommunizieren – Beispielsätze für den Alltag",
    description: "4 Situationen mit fertigen Sätzen: Bei Beschimpfungen, Schuldzuweisungen, Forderungen, Drohungen.",
    category: "grenzen",
    type: "Infografik PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DanNemCkHZyosGIB.png",
    isNew: true
  },
  {
    id: "k4-8-spickzettel-grenzen",
    title: "Spickzettel Grenzen – Die wichtigsten Sätze",
    description: "A4-Spickzettel zum Laminieren: DEAR-Technik, L.M.K.-Formel, Spiegeln statt Aufsaugen – alle wichtigen Sätze auf einen Blick.",
    category: "grenzen",
    type: "Spickzettel PNG",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OCJYbdNwSvTdwMOB.png",
    isNew: true
  },
];

const categories = [
  { id: "alle", label: "Alle Materialien", icon: Filter },
  { id: "verstehen", label: "Verstehen", icon: BookOpen },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { id: "grenzen", label: "Grenzen", icon: Shield },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: AlertTriangle },
];

export default function Materialien() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const filteredInfografiken = activeCategory === "alle" 
    ? infografiken 
    : infografiken.filter(i => i.category === activeCategory);

  // Zähler für Statistik
  const pngCount = infografiken.length;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.88_0.04_145)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <Download className="w-6 h-6 text-[oklch(0.40_0.08_145)]" />
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Materialien & Infografiken
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Alle Infografiken und Handouts zum Herunterladen, Ausdrucken und Teilen. 
              Ideal für Beratungsgespräche, Selbsthilfegruppen oder zur persönlichen Vertiefung.
            </p>
            
            {pngCount > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  {pngCount} Infografiken
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Überarbeitungs-Hinweis */}
      <section className="py-8">
        <div className="container">
          <Card className="bg-[oklch(0.95_0.04_85)] border-[oklch(0.75_0.10_85)]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.08_85)] flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-[oklch(0.50_0.12_85)]" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Downloads werden aktuell überarbeitet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Wir erstellen gerade neue, verbesserte Infografiken für Sie. 
                    Die neuen Materialien werden schrittweise Kategorie für Kategorie veröffentlicht.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Geplante Kategorien:</strong> Verstehen · Kommunizieren · Grenzen · Selbstfürsorge · Genesung
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filter (nur anzeigen wenn Infografiken vorhanden) */}
      {infografiken.length > 0 && (
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-10">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const count = cat.id === "alle" 
                  ? infografiken.length 
                  : infografiken.filter(i => i.category === cat.id).length;
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={activeCategory === cat.id ? "bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.50_0.12_145)]" : ""}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {cat.label}
                    <span className="ml-2 text-xs opacity-70">({count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Grid oder Platzhalter */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredInfografiken.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfografiken.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-[oklch(0.55_0.10_145)]/30 overflow-hidden">
                    {/* Vorschaubild */}
                    <div 
                      className="relative aspect-[4/3] bg-muted cursor-pointer group overflow-hidden"
                      onClick={() => setPreviewImage(item.url)}
                    >
                      <img 
                        src={item.url} 
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Badge */}
                      {item.isNew && (
                        <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-[oklch(0.75_0.15_55)] text-white font-medium">
                          NEU
                        </span>
                      )}
                    </div>
                    
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground uppercase">
                          {item.type}
                        </span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                          <Button size="sm" className="bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.50_0.12_145)]">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Die neuen Infografiken werden gerade erstellt.
              </p>
              <p className="text-sm text-muted-foreground">
                In der Zwischenzeit finden Sie hilfreiche Informationen auf unseren Themenseiten:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Link href="/verstehen">
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Verstehen
                  </Button>
                </Link>
                <Link href="/kommunizieren">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Kommunizieren
                  </Button>
                </Link>
                <Link href="/grenzen">
                  <Button variant="outline" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Grenzen
                  </Button>
                </Link>
                <Link href="/selbstfuersorge">
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Selbstfürsorge
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nutzungshinweis */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Card className="bg-[oklch(0.95_0.03_85)] border-[oklch(0.60_0.10_85)]">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-2">
                Nutzungshinweis
              </h3>
              <p className="text-sm text-muted-foreground">
                Alle Materialien dürfen für private und nicht-kommerzielle Zwecke frei verwendet werden. 
                Bei Weitergabe bitte die Quelle angeben: <strong>eiertanz.manus.space</strong> – 
                erstellt von Christa Egger, Angehörigenarbeit PUK Zürich.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lightbox für Bildvorschau */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl max-h-[90vh] overflow-auto"
          >
            <img 
              src={previewImage} 
              alt="Vorschau" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <p className="text-center text-white/70 mt-4 text-sm">
              Klicken Sie irgendwo, um zu schliessen
            </p>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
