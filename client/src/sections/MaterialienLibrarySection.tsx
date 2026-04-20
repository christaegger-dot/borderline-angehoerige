import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  categoryMeta,
  materials,
  quickStarts,
  type MaterialCategory,
  type MaterialItem,
} from "@/content/materialien";

function CategoryIcon({
  icon,
}: {
  icon:
    | "filter"
    | "alert-triangle"
    | "book-open"
    | "heart"
    | "message-circle"
    | "shield"
    | "sparkles"
    | "trending-up";
}) {
  if (icon === "alert-triangle")
    return <AlertTriangle className="w-4 h-4 mr-1.5" />;
  if (icon === "book-open") return <BookOpen className="w-4 h-4 mr-1.5" />;
  if (icon === "heart") return <Heart className="w-4 h-4 mr-1.5" />;
  if (icon === "message-circle")
    return <MessageCircle className="w-4 h-4 mr-1.5" />;
  if (icon === "shield") return <Shield className="w-4 h-4 mr-1.5" />;
  if (icon === "sparkles") return <Sparkles className="w-4 h-4 mr-1.5" />;
  if (icon === "trending-up") return <TrendingUp className="w-4 h-4 mr-1.5" />;
  return <Filter className="w-4 h-4 mr-1.5" />;
}

function MaterialCard({
  item,
  onPreview,
}: {
  item: MaterialItem;
  onPreview: (image: string, title: string) => void;
}) {
  const previewSrc = item.isHtml ? (item.previewUrl ?? item.url) : item.url;
  const openHref = item.downloadUrl ?? item.url;
  const downloadHref = item.pdfUrl ?? item.downloadUrl;
  const isCrossOriginDownload =
    !!downloadHref &&
    /^https?:\/\//i.test(downloadHref) &&
    !downloadHref.startsWith(window.location.origin);

  return (
    <Card className="h-full hover:shadow-lg transition-all hover:border-sage-mid/30 overflow-hidden">
      <button
        type="button"
        className="relative aspect-[4/3] bg-muted overflow-hidden group w-full"
        onClick={() => {
          if (item.isHtml) {
            window.open(openHref, "_blank");
          } else {
            onPreview(item.url, item.title);
          }
        }}
        aria-label={`${item.title} öffnen`}
      >
        <img
          src={previewSrc}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={300}
          decoding="async"
        />
        <div className="absolute top-2 left-2 bg-background/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">
          {item.kind}
        </div>
      </button>
      <CardContent className="p-5">
        <h3 className="font-semibold text-foreground mb-2 text-lg">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        <div className="flex gap-2 flex-wrap">
          <a
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 bg-sage-dark hover:bg-sage-dark/90 text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Öffnen
          </a>
          {downloadHref ? (
            <a
              href={downloadHref}
              download={isCrossOriginDownload ? undefined : ""}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 border border-sage-dark text-sage-dark hover:bg-sage-light/40 transition-colors"
            >
              <Download className="w-4 h-4" />
              Herunterladen
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MaterialienLibrarySection() {
  const [activeCategory, setActiveCategory] =
    useState<MaterialCategory>("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Vorschau");
  const gridRef = useRef<HTMLElement>(null);

  const coreMaterials = useMemo(
    () => materials.filter(item => item.priority === "core"),
    []
  );

  const secondaryMaterials = useMemo(
    () =>
      activeCategory === "alle"
        ? materials.filter(item => item.priority !== "core")
        : materials.filter(
            item => item.priority !== "core" && item.category === activeCategory
          ),
    [activeCategory]
  );

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <section className="py-10 wave-divider-top">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Was hilft gerade jetzt?
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {quickStarts.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(item.id);
                    scrollToResults();
                  }}
                  className="text-left rounded-xl border p-5 transition-all hover:shadow-md"
                  style={{ borderColor: item.color, backgroundColor: item.bg }}
                >
                  <p className="font-semibold text-foreground mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-sage-wash border-sage-light mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-6 h-6 text-sage-dark" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground mb-2 text-lg">
                      Empfohlene Kernmaterialien
                    </h2>
                    <p className="text-muted-foreground">
                      Wenn Sie gerade nicht lange suchen möchten, beginnen Sie
                      mit diesen Materialien. Sie decken Krise, Orientierung,
                      Kommunikation, Grenzen und Selbstfürsorge ab.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreMaterials.map(item => (
                <MaterialCard
                  key={item.id}
                  item={item}
                  onPreview={(image, title) => {
                    setPreviewImage(image);
                    setPreviewTitle(title);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={gridRef}
        className="py-12 md:py-16 border-t border-border/60"
      >
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-3 rounded-lg bg-sand border border-sand-subtle flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Vorschau = Web-Bild.
                </strong>{" "}
                «Öffnen» öffnet die Druckversion im neuen Tab. Die Notfallkarte
                öffnet als HTML-Seite.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
              {categoryMeta.map(cat => {
                const count =
                  cat.id === "alle"
                    ? materials.filter(item => item.priority !== "core").length
                    : materials.filter(
                        item =>
                          item.priority !== "core" && item.category === cat.id
                      ).length;
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id
                        ? "bg-sage-dark hover:bg-sage-dark text-white"
                        : ""
                    }`}
                  >
                    <CategoryIcon icon={cat.icon} />
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-90">({count})</span>
                  </Button>
                );
              })}
            </div>

            {secondaryMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryMaterials.map(item => (
                  <MaterialCard
                    key={item.id}
                    item={item}
                    onPreview={(image, title) => {
                      setPreviewImage(image);
                      setPreviewTitle(title);
                    }}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    In dieser Kategorie sind aktuell keine weiteren Materialien
                    sichtbar.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 wave-divider-top">
        <div className="container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="bg-sand-muted border-sand-mid">
              <CardContent className="p-6">
                <h2 className="font-semibold text-foreground mb-2 text-lg">
                  Besondere Konstellationen
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manche Materialien helfen besonders, wenn Kinder mitbetroffen
                  sind, wenn Schuld dominiert oder wenn Grenzen und Distanz zum
                  Thema werden.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("verstehen");
                      scrollToResults();
                    }}
                  >
                    Kinder & Familie
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("selbstfuersorge");
                      scrollToResults();
                    }}
                  >
                    Schuld & Erschöpfung
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setActiveCategory("grenzen");
                      scrollToResults();
                    }}
                  >
                    Grenzen & Selbstschutz
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sage-wash border-sage-light">
              <CardContent className="p-6">
                <h2 className="font-semibold text-foreground mb-2 text-lg">
                  Von hier aus weiter
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Wenn Sie gerade eher Orientierung als Downloads brauchen, sind
                  die Hauptseiten oft der bessere Einstieg.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/verstehen">
                    <Button variant="outline" size="sm">
                      Verstehen
                    </Button>
                  </Link>
                  <Link href="/kommunizieren">
                    <Button variant="outline" size="sm">
                      Kommunizieren
                    </Button>
                  </Link>
                  <Link href="/grenzen">
                    <Button variant="outline" size="sm">
                      Grenzen
                    </Button>
                  </Link>
                  <Link href="/selbstfuersorge">
                    <Button variant="outline" size="sm">
                      Selbstfürsorge
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              alt={`Vorschau: ${previewTitle}`}
              className="w-full h-auto rounded-lg shadow-2xl"
              width={1600}
              height={892}
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-white mt-4 text-sm">
              Klicken Sie irgendwo, um zu schliessen
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
}
