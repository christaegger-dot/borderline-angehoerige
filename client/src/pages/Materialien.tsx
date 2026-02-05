import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, FileText, Image, Filter, BookOpen, Heart, MessageCircle, Shield } from "lucide-react";
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
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jtiefECukwYuyZwf.png",
    rating: "NEU",
    isNew: true
  },

  {
    id: "fog-nebel-neu",
    title: "Der Nebel – FOG (Website-Stil)",
    description: "Fear, Obligation, Guilt – was uns gefangen hält und wie wir entkommen.",
    category: "selbstfuersorge",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kLAbCmpxnOxbIMUH.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "grenzen-setzen-neu",
    title: "Grenzen setzen (Website-Stil)",
    description: "Schritt-für-Schritt-Anleitung zum Setzen von Grenzen – im einheitlichen Design.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OyvpiurGzlIPaQWH.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "set-kommunikation-neu",
    title: "SET-Kommunikation (Website-Stil)",
    description: "Support, Empathy, Truth – die bewährte Kommunikationstechnik im einheitlichen Design.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BNKeTgeVWhbfziTn.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "validierung-neu",
    title: "Validierungs-Stufenmodell (Website-Stil)",
    description: "Gefühle anerkennen in 4 Schritten – im einheitlichen Design.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GoCqBXFdUGHQltmS.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "krisenbegleitung-neu",
    title: "In der Krise unterstützen (Website-Stil)",
    description: "Das Ampel-System und 4 Schritte der Deeskalation – im einheitlichen Design.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JkxTXiXzrhakizYL.png",
    rating: "NEU",
    isNew: true
  },
  {
    id: "3-saeulen-neu",
    title: "Die 3 Säulen der Unterstützung (Website-Stil)",
    description: "Präsenz, Validierung, Stabilität – wie Sie wirklich helfen können.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jYYFqLdDeSRVGztK.png",
    rating: "NEU",
    isNew: true
  },
  // Verstehen
  {
    id: "spaltungs-zyklus",
    title: "Der Spaltungs-Zyklus",
    description: "Wie Idealisierung und Entwertung zusammenhängen und was dahinter steckt.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VnytmZxwbgjonttZ.png",
    rating: "20/24"
  },
  {
    id: "beziehungszyklus",
    title: "Beziehungszyklus: Idealisierung & Entwertung",
    description: "Die typischen Phasen in Beziehungen mit Menschen mit Borderline.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IVAvSOConfhmllvC.png",
    rating: "19/24"
  },
  {
    id: "4-dynamiken",
    title: "Borderline-Beziehungen: 4 Dynamiken verstehen",
    description: "Die vier häufigsten Beziehungsdynamiken erklärt.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vEpxOsKMPzqkImlS.png",
    rating: "19/24"
  },
  {
    id: "transaktionales-modell",
    title: "Transaktionales Modell der Borderline-Dynamik",
    description: "Wie Umwelt und Vulnerabilität zusammenwirken.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/iqfZXeFRSzQUzrsq.png",
    rating: "18/24"
  },
  {
    id: "familiensystem",
    title: "Borderline im Familiensystem",
    description: "Wie die Störung das gesamte Familiensystem beeinflusst.",
    category: "verstehen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/kSDkJzYVaqdcyggV.png",
    rating: "18/24"
  },
  // Unterstützen
  {
    id: "eiertanz",
    title: "Der Eiertanz: Angst lähmt Beziehung",
    description: "Warum wir auf Zehenspitzen gehen und wie wir da rauskommen.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tKVRaACvFlfsVotW.png",
    rating: "23/24"
  },
  {
    id: "eiertanz-pdf",
    title: "Der Eiertanz (PDF-Handout)",
    description: "Ausführliches Handout zum Eiertanz-Phänomen mit Lösungsansätzen.",
    category: "unterstuetzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/vGabdRGfjgBiGNSS.pdf",
    rating: "23/24"
  },
  {
    id: "uebertragung",
    title: "Die Übertragungsdynamik (Heisse Kartoffel)",
    description: "Wie Gefühle übertragen werden und was Sie dagegen tun können.",
    category: "unterstuetzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ckmhZvvCJWYMerqA.pdf",
    rating: "23/24"
  },
  {
    id: "raus-eiertanz",
    title: "Raus aus dem Eiertanz: Strategien",
    description: "Konkrete Strategien, um aus dem Eiertanz auszubrechen.",
    category: "unterstuetzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JYbDWQjxdCSntzVZ.png",
    rating: "21/24"
  },
  // Kommunizieren
  {
    id: "validierung",
    title: "Validierungs-Stufenmodell",
    description: "Die 6 Stufen der Validierung nach Linehan.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fHCgKTQDJKRYmUvj.png",
    rating: "22/24"
  },
  {
    id: "set-kommunikation",
    title: "SET-Kommunikation",
    description: "Support, Empathy, Truth – die bewährte Kommunikationstechnik.",
    category: "kommunizieren",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qGWtMGfiRJzqWJEz.png",
    rating: "22/24"
  },
  // Grenzen setzen
  {
    id: "grenzen-praktisch",
    title: "Grenzen setzen: Praktische Anleitung",
    description: "Schritt-für-Schritt-Anleitung zum Setzen von Grenzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FhSNwNMQxOkbvjRF.png",
    rating: "24/24"
  },
  {
    id: "grenzen-emotional",
    title: "Grenzen setzen: Emotionale Unterstützung",
    description: "Wie Sie Grenzen setzen und gleichzeitig emotional unterstützen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mwwMCocczTtmKrfM.png",
    rating: "23/24"
  },
  {
    id: "grenzen-5-ansaetze",
    title: "Grenzen setzen: 5 praktische Ansätze",
    description: "Fünf bewährte Methoden für das Setzen von Grenzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DLqPLzKxrfPhVjbx.png",
    rating: "23/24"
  },
  {
    id: "grenzen-pyramide",
    title: "Die Grenzen-Pyramide",
    description: "Hierarchie der Grenzen von weich bis hart.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VMXGFPguowqwxleh.png",
    rating: "22/24"
  },
  {
    id: "grenzen-leiter",
    title: "Die Grenzen-Leiter",
    description: "Schrittweise Eskalation von Grenzen.",
    category: "grenzen",
    type: "png",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SRoNBnzXeOlTKcQo.png",
    rating: "22/24"
  },
  {
    id: "grenzsetzung-pdf",
    title: "Grenzsetzung als Orientierung (PDF)",
    description: "Ausführliches Handout zur Grenzsetzung.",
    category: "grenzen",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/iZlDzSNGeurWekaN.pdf",
    rating: "24/24"
  },
  // Selbstfürsorge

  {
    id: "nebel-pdf",
    title: "Der Nebel (FOG) – PDF-Handout",
    description: "Fear, Obligation, Guilt – und wie Sie daraus entkommen.",
    category: "selbstfuersorge",
    type: "pdf",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/cHROAICvNENBQJCA.pdf",
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
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.04_145)] flex items-center justify-center flex-shrink-0">
                        {item.type === "pdf" ? (
                          <FileText className="w-5 h-5 text-[oklch(0.40_0.08_145)]" />
                        ) : (
                          <Image className="w-5 h-5 text-[oklch(0.40_0.08_145)]" />
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.isNew ? 'bg-[oklch(0.65_0.12_55)] text-white' : 'bg-[oklch(0.92_0.05_145)] text-[oklch(0.40_0.08_145)]'}`}>
                        {item.rating}
                      </span>
                    </div>
                    
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
