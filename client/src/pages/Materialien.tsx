import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, FileText, Filter, BookOpen, Heart, MessageCircle, Shield, ExternalLink } from "lucide-react";
import { useState } from "react";

// Infografiken-Daten mit CDN-URLs
const infografiken = [
  // NEU: Konsistente Infografiken im Website-Stil
  {
    id: "eiertanz-neu",
    title: "Der Eiertanz (Website-Stil)",
    description: "Warum wir auf Zehenspitzen gehen – der Teufelskreis und der Ausweg.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/izUnFdVOmLVUwSFD.png",
    rating: "NEU",
    isNew: true
  },

  {
    id: "fog-nebel-neu",
    title: "Der Nebel – FOG (Website-Stil)",
    description: "Fear, Obligation, Guilt – was uns gefangen hält und wie wir entkommen.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/trxdqyIMGIBQpQgg.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "grenzen-setzen-neu",
    title: "Grenzen setzen (Website-Stil)",
    description: "Schritt-für-Schritt-Anleitung zum Setzen von Grenzen – im einheitlichen Design.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yUNPfTDyQWmciNRz.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "set-kommunikation-neu",
    title: "SET-Kommunikation (Website-Stil)",
    description: "Support, Empathy, Truth – die bewährte Kommunikationstechnik im einheitlichen Design.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BkgLXBtsiscPljTj.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "validierung-neu",
    title: "Validierungs-Stufenmodell (Website-Stil)",
    description: "Gefühle anerkennen in 4 Schritten – im einheitlichen Design.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fPXKfUWQikqYzuxp.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "krisenbegleitung-neu",
    title: "In der Krise unterstützen (Website-Stil)",
    description: "Das Ampel-System und 4 Schritte der Deeskalation – im einheitlichen Design.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zMFfHFCOztVWyzCA.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "3-saeulen-neu",
    title: "Die 3 Säulen der Unterstützung (Website-Stil)",
    description: "Präsenz, Validierung, Stabilität – wie Sie wirklich helfen können.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zmMFRewcjaAWQcZf.png",
    rating: "NEU",
    isNew: true
  },
  // Verstehen
  {
    id: "spaltungs-zyklus",
    title: "Der Spaltungs-Zyklus",
    description: "Das Schwarz-Weiss-Denken bei Borderline erklärt – Idealisierung, Enttäuschung, Abwertung, Versöhnung.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ftmYWlyHNOJrccxR.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "uebertragungsdynamik",
    title: "Die heisse Kartoffel – Übertragungsdynamik",
    description: "Wie Gefühle (Scham, Wut, Schuld) unbewusst übertragen werden und was Sie dagegen tun können.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wHkzslYknZJsYcqO.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "beziehungszyklus",
    title: "Beziehungszyklus: Idealisierung & Entwertung",
    description: "Die typischen Phasen in Beziehungen mit Menschen mit Borderline.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fjVQcqMEfbeeRgQd.png",
    rating: "19/24"
  },
  {
    id: "4-dynamiken",
    title: "Borderline-Beziehungen: 4 Dynamiken verstehen",
    description: "Die vier häufigsten Beziehungsdynamiken erklärt.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JUWgIUqBlBqHBdEV.png",
    rating: "19/24"
  },
  {
    id: "transaktionales-modell",
    title: "Transaktionales Modell der Borderline-Dynamik",
    description: "Wie Umwelt und Vulnerabilität zusammenwirken.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KSyqqXeMXVevPanR.png",
    rating: "18/24"
  },
  {
    id: "familiensystem",
    title: "Borderline im Familiensystem",
    description: "Wie die Störung das gesamte Familiensystem beeinflusst.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VljeyQzCXsdelHDp.png",
    rating: "18/24"
  },
  // Unterstützen
  {
    id: "eiertanz",
    title: "Der Eiertanz: Angst lähmt Beziehung",
    description: "Warum wir auf Zehenspitzen gehen und wie wir da rauskommen.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wCINqnWPYdfAQsDJ.png",
    rating: "23/24"
  },
  {
    id: "eiertanz-pdf",
    title: "Der Eiertanz (PDF-Handout)",
    description: "Ausführliches Handout zum Eiertanz-Phänomen mit Lösungsansätzen.",
    category: "unterstuetzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EtZamHaKralgSpPi.pdf",
    rating: "23/24"
  },
  {
    id: "uebertragung",
    title: "Die Übertragungsdynamik (Heisse Kartoffel)",
    description: "Wie Gefühle übertragen werden und was Sie dagegen tun können.",
    category: "unterstuetzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TFSgvXpFAgQUQoIp.pdf",
    rating: "23/24"
  },
  {
    id: "raus-eiertanz",
    title: "Raus aus dem Eiertanz: Strategien",
    description: "Konkrete Strategien, um aus dem Eiertanz auszubrechen.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KYyauSgqEqxvFGrx.png",
    rating: "21/24"
  },
  // Kommunizieren
  {
    id: "validierung-6-stufen",
    title: "Die 6 Stufen der Validierung",
    description: "Von aufmerksamem Zuhören bis radikaler Echtheit – das Stufenmodell nach Linehan.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UamrzhkaRxuPSDVi.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "set-kommunikation",
    title: "SET-Kommunikation",
    description: "Support, Empathy, Truth – die bewährte Kommunikationstechnik.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/cfAdmAmZEXbNNxZl.png",
    rating: "22/24"
  },
  // Grenzen setzen
  {
    id: "grenzen-praktisch",
    title: "Grenzen setzen: Praktische Anleitung",
    description: "Schritt-für-Schritt-Anleitung zum Setzen von Grenzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sWrGzfdVjABcfZHV.png",
    rating: "24/24"
  },
  {
    id: "grenzen-emotional",
    title: "Grenzen setzen: Emotionale Unterstützung",
    description: "Wie Sie Grenzen setzen und gleichzeitig emotional unterstützen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EnKcFJwvcqclkAtM.png",
    rating: "23/24"
  },
  {
    id: "grenzen-5-ansaetze",
    title: "Grenzen setzen: 5 praktische Ansätze",
    description: "Fünf bewährte Methoden für das Setzen von Grenzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YuHdFnBIxTtnylpH.png",
    rating: "23/24"
  },
  {
    id: "grenzen-pyramide",
    title: "Die Grenzen-Pyramide",
    description: "Hierarchie der Grenzen von weich bis hart.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/EGaWNVcKclZYNmVr.png",
    rating: "22/24"
  },
  {
    id: "grenzen-leiter",
    title: "Die Grenzen-Leiter",
    description: "Eskalationsstufen bei Grenzverletzungen – von freundlicher Erinnerung bis Kontaktpause.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VGuivmsKMULEAWgP.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "vier-arten-grenzen",
    title: "Vier Arten von Grenzen",
    description: "Zeitliche, emotionale, physische und Kommunikations-Grenzen mit Beispielsätzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xBJjrppYdghIkNtF.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "grenzsetzung-pdf",
    title: "Grenzsetzung als Orientierung (PDF)",
    description: "Ausführliches Handout zur Grenzsetzung.",
    category: "grenzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WnqfDwuBRErJrLPY.pdf",
    rating: "24/24"
  },
  // Selbstfürsorge & Krise
  {
    id: "fog-nebel-infografik",
    title: "Der Nebel (FOG) – Emotionale Muster erkennen",
    description: "Fear, Obligation, Guilt – wie Sie Manipulation erkennen und aus dem Nebel treten.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/doxRJKzyLuIwYzXV.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "grenzsetzung-orientierung",
    title: "Grenzen als Geländer, nicht als Mauer",
    description: "Warum Grenzen für Menschen mit BPD hilfreich sind – Struktur, Sicherheit, Fürsorge.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XHSLURAgeFTGugYr.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "nebel-pdf",
    title: "Der Nebel (FOG) – PDF-Handout",
    description: "Fear, Obligation, Guilt – und wie Sie daraus entkommen.",
    category: "selbstfuersorge",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NKouihgSdwkyJtNV.pdf",
    rating: "21/24"
  },
];

const categories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "verstehen", label: "Verstehen", icon: BookOpen },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { id: "grenzen", label: "Grenzen", icon: Shield },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: Heart },
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
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Materialien & Handouts
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Alle Infografiken und Handouts zum Herunterladen und Ausdrucken. Kuratiert und qualitätsgeprüft nach evidenzbasierten Kriterien.
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
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={activeCategory === cat.id ? "bg-[oklch(0.65_0.12_55)]" : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
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
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Vorschaubild für PNG-Dateien */}
                  {item.type === "png" ? (
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
                      <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${item.isNew ? 'bg-[oklch(0.65_0.12_55)] text-white' : 'bg-white/90 text-[oklch(0.40_0.08_145)]'}`}>
                        {item.rating}
                      </span>
                    </div>
                  ) : (
                    /* PDF-Platzhalter */
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-[oklch(0.95_0.02_25)] to-[oklch(0.90_0.04_25)] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-[oklch(0.55_0.15_25)] mx-auto mb-2" />
                        <span className="text-sm font-medium text-[oklch(0.45_0.10_25)]">PDF-Dokument</span>
                      </div>
                      {/* Badge */}
                      <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${item.isNew ? 'bg-[oklch(0.65_0.12_55)] text-white' : 'bg-white/90 text-[oklch(0.40_0.08_145)]'}`}>
                        {item.rating}
                      </span>
                    </div>
                  )}
                  
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground uppercase">
                        {item.type}
                      </span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                        <Button size="sm" variant="outline">
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

      {/* Lightbox für Bildvorschau */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={previewImage} 
              alt="Vorschau" 
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
            >
              ✕
            </button>
            <a 
              href={previewImage} 
              target="_blank" 
              rel="noopener noreferrer" 
              download
              className="absolute bottom-4 right-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)]">
                <Download className="w-4 h-4 mr-2" />
                Herunterladen
              </Button>
            </a>
          </motion.div>
        </div>
      )}

      {/* Hinweis */}
      <section className="py-8 bg-[oklch(0.99_0.008_85)]">
        <div className="container">
          <Card className="bg-[oklch(0.88_0.04_145)]/20 border-[oklch(0.65_0.08_145)]">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                Alle Materialien wurden nach evidenzbasierten Qualitätskriterien ausgewählt. 
                Sie dürfen für den persönlichen Gebrauch und in der Angehörigenarbeit verwendet werden.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
