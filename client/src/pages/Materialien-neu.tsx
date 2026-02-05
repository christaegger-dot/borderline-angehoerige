import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, FileText, Filter, BookOpen, Heart, MessageCircle, Shield, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

// BEREINIGTE Infografiken-Daten - ohne Redundanzen, stilistisch konsistent
const infografiken = [
  // ═══════════════════════════════════════════════════════════════
  // KATEGORIE: VERSTEHEN
  // ═══════════════════════════════════════════════════════════════
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
  {
    id: "familiensystem",
    title: "Borderline im Familiensystem",
    description: "Wie die Störung das gesamte Familiensystem beeinflusst – Rollen und Dynamiken.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VljeyQzCXsdelHDp.png",
    isNew: false
  },
  {
    id: "transaktionales-modell",
    title: "Transaktionales Modell",
    description: "Wie Umwelt und Vulnerabilität bei Borderline zusammenwirken.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KSyqqXeMXVevPanR.png",
    isNew: false
  },

  // ═══════════════════════════════════════════════════════════════
  // KATEGORIE: UNTERSTÜTZEN
  // ═══════════════════════════════════════════════════════════════
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
    id: "eiertanz-pdf",
    title: "Der Eiertanz (Handout)",
    description: "Ausführliches PDF-Handout zum Eiertanz-Phänomen mit Lösungsansätzen.",
    category: "unterstuetzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EtZamHaKralgSpPi.pdf",
    isNew: false
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
  {
    id: "grenzsetzung-orientierung",
    title: "Grenzen als Geländer",
    description: "Warum Grenzen für Menschen mit BPD hilfreich sind – Struktur, Sicherheit, Fürsorge.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XHSLURAgeFTGugYr.png",
    isNew: true
  },

  // ═══════════════════════════════════════════════════════════════
  // KATEGORIE: KOMMUNIZIEREN
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // KATEGORIE: GRENZEN
  // ═══════════════════════════════════════════════════════════════
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
  {
    id: "grenzsetzung-pdf",
    title: "Grenzsetzung als Orientierung (Handout)",
    description: "Ausführliches PDF-Handout zur Grenzsetzung mit praktischen Beispielen.",
    category: "grenzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WnqfDwuBRErJrLPY.pdf",
    isNew: false
  },

  // ═══════════════════════════════════════════════════════════════
  // KATEGORIE: SELBSTFÜRSORGE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "fog-nebel",
    title: "Der Nebel (FOG)",
    description: "Fear, Obligation, Guilt – emotionale Muster erkennen und aus dem Nebel treten.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/doxRJKzyLuIwYzXV.png",
    isNew: true
  },
  {
    id: "nebel-pdf",
    title: "Der Nebel (FOG) – Handout",
    description: "Ausführliches PDF-Handout zu Fear, Obligation, Guilt und Auswegen.",
    category: "selbstfuersorge",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NKouihgSdwkyJtNV.pdf",
    isNew: false
  },
  // LÜCKE: Selbstfürsorge-Strategien Infografik fehlt noch
];

const categories = [
  { id: "alle", label: "Alle Materialien", icon: Filter, count: infografiken.length },
  { id: "verstehen", label: "Verstehen", icon: BookOpen, count: infografiken.filter(i => i.category === "verstehen").length },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart, count: infografiken.filter(i => i.category === "unterstuetzen").length },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle, count: infografiken.filter(i => i.category === "kommunizieren").length },
  { id: "grenzen", label: "Grenzen", icon: Shield, count: infografiken.filter(i => i.category === "grenzen").length },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: AlertTriangle, count: infografiken.filter(i => i.category === "selbstfuersorge").length },
];

export default function Materialien() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const filteredInfografiken = activeCategory === "alle" 
    ? infografiken 
    : infografiken.filter(i => i.category === activeCategory);

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
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Materialien & Infografiken
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Alle Infografiken und Handouts zum Herunterladen, Ausdrucken und Teilen. 
              Ideal für Beratungsgespräche, Selbsthilfegruppen oder zur persönlichen Vertiefung.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                {infografiken.filter(i => i.type === "png").length} Infografiken
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {infografiken.filter(i => i.type === "pdf").length} PDF-Handouts
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={activeCategory === cat.id 
                    ? "bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.50_0.12_145)]" 
                    : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
                  <span className="ml-2 text-xs opacity-70">({cat.count})</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materialien Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfografiken.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full border-border/50 hover:shadow-lg transition-all hover:border-[oklch(0.55_0.10_145)]/30">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.type === "pdf" 
                          ? "bg-[oklch(0.92_0.06_35)]" 
                          : "bg-[oklch(0.88_0.04_145)]"
                      }`}>
                        {item.type === "pdf" 
                          ? <FileText className="w-5 h-5 text-[oklch(0.50_0.15_35)]" />
                          : <ImageIcon className="w-5 h-5 text-[oklch(0.45_0.08_145)]" />
                        }
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="text-xs bg-[oklch(0.75_0.15_55)] text-white px-2 py-0.5 rounded-full font-medium">
                            NEU
                          </span>
                        )}
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      {item.type === "png" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setPreviewImage(item.url)}
                        >
                          Vorschau
                        </Button>
                      )}
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        download
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.50_0.12_145)]">
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
        </div>
      </section>

      {/* Lightbox Preview */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
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

      {/* Hinweis */}
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
    </Layout>
  );
}
