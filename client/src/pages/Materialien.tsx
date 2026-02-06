import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Filter, BookOpen, Heart, MessageCircle, Shield, ExternalLink, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// BEREINIGTE INFOGRAFIK-SAMMLUNG
// Qualitätsgeprüft: Keine Redundanzen, stilistisch konsistent, vollständig
// Stand: 05.02.2026
// ═══════════════════════════════════════════════════════════════════════════

const infografiken = [
  // ─────────────────────────────────────────────────────────────────────────
  // KATEGORIE: VERSTEHEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spaltungs-zyklus",
    title: "Der Spaltungs-Zyklus",
    description: "Das Schwarz-Weiss-Denken bei Borderline erklärt – Idealisierung, Enttäuschung, Abwertung, Versöhnung.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ftmYWlyHNOJrccxR.png",
    isNew: true
  },
  {
    id: "uebertragungsdynamik",
    title: "Die heisse Kartoffel",
    description: "Übertragungsdynamik – wie Gefühle (Scham, Wut, Schuld) unbewusst weitergegeben werden.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wHkzslYknZJsYcqO.png",
    isNew: true
  },



  // ─────────────────────────────────────────────────────────────────────────
  // KATEGORIE: UNTERSTÜTZEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "eiertanz",
    title: "Der Eiertanz",
    description: "Warum wir auf Zehenspitzen gehen – der Teufelskreis und der Ausweg.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/izUnFdVOmLVUwSFD.png",
    isNew: true
  },

  {
    id: "3-saeulen",
    title: "Die 3 Säulen der Unterstützung",
    description: "Präsenz, Validierung, Stabilität – wie Sie wirklich helfen können.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zmMFRewcjaAWQcZf.png",
    isNew: true
  },
  {
    id: "krisenbegleitung",
    title: "In der Krise unterstützen",
    description: "Das Ampel-System und 4 Schritte der Deeskalation.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zMFfHFCOztVWyzCA.png",
    isNew: true
  },
  // ─────────────────────────────────────────────────────────────────────────
  // KATEGORIE: KOMMUNIZIEREN
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "validierung-6-stufen",
    title: "Die 6 Stufen der Validierung",
    description: "Von aufmerksamem Zuhören bis radikaler Echtheit – das Stufenmodell nach Linehan.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UamrzhkaRxuPSDVi.png",
    isNew: true
  },
  {
    id: "set-kommunikation",
    title: "SET-Kommunikation",
    description: "Support, Empathy, Truth – die bewährte Kommunikationstechnik für schwierige Gespräche.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BkgLXBtsiscPljTj.png",
    isNew: true
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KATEGORIE: GRENZEN
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "vier-arten-grenzen",
    title: "Vier Arten von Grenzen",
    description: "Zeitliche, emotionale, physische und Kommunikations-Grenzen mit Beispielsätzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xBJjrppYdghIkNtF.png",
    isNew: true
  },
  {
    id: "grenzen-leiter",
    title: "Die Grenzen-Leiter",
    description: "Eskalationsstufen bei Grenzverletzungen – von freundlicher Erinnerung bis Kontaktpause.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VGuivmsKMULEAWgP.png",
    isNew: true
  },
  {
    id: "grenzen-setzen",
    title: "Grenzen setzen",
    description: "Schritt-für-Schritt-Anleitung zum Setzen von Grenzen – klar und respektvoll.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yUNPfTDyQWmciNRz.png",
    isNew: true
  },


  // ─────────────────────────────────────────────────────────────────────────
  // KATEGORIE: SELBSTFÜRSORGE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "selbstfuersorge-strategien",
    title: "Selbstfürsorge für Angehörige",
    description: "Die 4 Säulen der Selbstfürsorge: Körper, Geist, Beziehungen, Grenzen – mit Warnsignalen für Burnout.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wAgGnqlabUDXlySo.png",
    isNew: true
  },
  {
    id: "fog-nebel",
    title: "Der Nebel (FOG)",
    description: "Fear, Obligation, Guilt – emotionale Muster erkennen und aus dem Nebel treten.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/doxRJKzyLuIwYzXV.png",
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
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                {pngCount} Infografiken
              </span>
            </div>
            
            {/* Sammel-PDF Download */}
            <a 
              href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OKDeJmoLODeNjbpf.pdf" 
              download="Infografik-Sammlung-Eiertanz.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.50_0.12_145)] text-white font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Alle Infografiken als PDF (69 MB)
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Für Therapeuten & Beratungsstellen: Deckblatt, Inhaltsverzeichnis, alle 15 Infografiken, Quellenverzeichnis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
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

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
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
          
          {filteredInfografiken.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine Materialien in dieser Kategorie gefunden.</p>
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
