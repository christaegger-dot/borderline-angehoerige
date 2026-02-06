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

// Platzhalter: Infografiken werden Kategorie für Kategorie neu erstellt
const infografiken: Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  url: string;
  isNew?: boolean;
}> = [];

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
