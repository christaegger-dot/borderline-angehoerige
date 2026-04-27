import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  Eye,
  FileText,
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
import { getHandoutDownloadHref, getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

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

const materialCategoryStyles = {
  verstehen: {
    label: "Verstehen",
    badge: "bg-sage-wash/90 text-sage-darker border-sage-light/80",
    dot: "bg-sage-dark",
    shell:
      "bg-[linear-gradient(160deg,rgba(221,239,236,0.95),rgba(247,248,246,1),rgba(232,241,239,0.92))]",
    frame: "border-sage-light/70",
    shadow: "shadow-[0_22px_44px_-26px_rgba(31,101,109,0.45)]",
  },
  unterstuetzen: {
    label: "Unterstützen",
    badge:
      "bg-terracotta-wash/95 text-terracotta-darker border-terracotta-light/80",
    dot: "bg-terracotta",
    shell:
      "bg-[linear-gradient(160deg,rgba(252,245,239,1),rgba(255,255,255,1),rgba(248,238,230,0.96))]",
    frame: "border-terracotta-light/80",
    shadow: "shadow-[0_22px_44px_-26px_rgba(165,97,55,0.35)]",
  },
  kommunizieren: {
    label: "Kommunizieren",
    badge: "bg-slate-wash/95 text-slate-dark border-slate-light/85",
    dot: "bg-slate-blue",
    shell:
      "bg-[linear-gradient(160deg,rgba(240,244,251,1),rgba(255,255,255,1),rgba(236,242,248,0.98))]",
    frame: "border-slate-light/85",
    shadow: "shadow-[0_22px_44px_-26px_rgba(82,109,158,0.35)]",
  },
  grenzen: {
    label: "Grenzen",
    badge: "bg-sand-muted/95 text-sand-accent border-sand-border/85",
    dot: "bg-sand-accent",
    shell:
      "bg-[linear-gradient(160deg,rgba(251,248,239,1),rgba(255,255,255,1),rgba(247,242,231,0.96))]",
    frame: "border-sand-border/90",
    shadow: "shadow-[0_22px_44px_-26px_rgba(161,126,56,0.3)]",
  },
  selbstfuersorge: {
    label: "Selbstfürsorge",
    badge: "bg-sage-pale/95 text-sage-darker border-sage-light/80",
    dot: "bg-sage-mid",
    shell:
      "bg-[linear-gradient(160deg,rgba(239,248,246,1),rgba(255,255,255,1),rgba(235,245,243,0.96))]",
    frame: "border-sage-light/80",
    shadow: "shadow-[0_22px_44px_-26px_rgba(59,127,117,0.35)]",
  },
  genesung: {
    label: "Genesung",
    badge: "bg-slate-wash/95 text-slate-dark border-slate-light/85",
    dot: "bg-slate-mid",
    shell:
      "bg-[linear-gradient(160deg,rgba(242,246,252,1),rgba(255,255,255,1),rgba(240,244,250,0.96))]",
    frame: "border-slate-light/85",
    shadow: "shadow-[0_22px_44px_-26px_rgba(91,103,141,0.35)]",
  },
  soforthilfe: {
    label: "Soforthilfe",
    badge: "bg-alert-wash/95 text-alert-dark border-alert-light/85",
    dot: "bg-alert",
    shell:
      "bg-[linear-gradient(160deg,rgba(254,246,243,1),rgba(255,255,255,1),rgba(252,240,233,0.96))]",
    frame: "border-alert-light/85",
    shadow: "shadow-[0_22px_44px_-26px_rgba(197,95,61,0.34)]",
  },
} satisfies Record<
  Exclude<MaterialCategory, "alle">,
  {
    label: string;
    badge: string;
    dot: string;
    shell: string;
    frame: string;
    shadow: string;
  }
>;

function MaterialCard({
  item,
  onPreview,
}: {
  item: MaterialItem;
  onPreview: (image: string, title: string) => void;
}) {
  const previewSrc = item.isHtml ? (item.previewUrl ?? item.url) : item.url;
  const categoryStyle = materialCategoryStyles[item.category];
  const pdfSource = item.pdfUrl ?? item.downloadUrl;
  const openHref = item.isHtml
    ? (item.downloadUrl ?? item.url)
    : (getHandoutOpenHref(pdfSource) ?? item.url);
  const downloadHref = getHandoutDownloadHref(pdfSource);
  const textVersionHref = item.isHtml
    ? null
    : getHandoutTextVersionHrefBySource(pdfSource);
  const openLabel = item.isHtml ? "Öffnen" : "PDF öffnen";
  const availabilityLabel = textVersionHref
    ? "Mit Textversion"
    : item.isHtml
      ? "Direkt im Browser"
      : "PDF im neuen Tab";

  return (
    <Card className="group h-full overflow-hidden border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sage-mid/30">
      <button
        type="button"
        className={`relative aspect-[4/3] overflow-hidden w-full ${categoryStyle.shell}`}
        onClick={() => {
          if (item.isHtml) {
            window.open(openHref, "_blank", "noopener,noreferrer");
          } else {
            onPreview(item.url, item.title);
          }
        }}
        aria-label={`${item.title} öffnen`}
      >
        <img
          aria-hidden="true"
          src={previewSrc}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-top opacity-30 blur-2xl"
          loading="lazy"
          width={400}
          height={300}
          decoding="async"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${categoryStyle.badge}`}
          >
            {categoryStyle.label}
          </span>
          <span className="inline-flex items-center rounded-full bg-background/86 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm ring-1 ring-white/60">
            {item.kind}
          </span>
        </div>
        <div className="absolute inset-x-6 top-16 bottom-5 flex items-end justify-center">
          <div
            className={`relative h-full w-full max-w-[16rem] overflow-hidden rounded-[1.4rem] border bg-white/96 ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 ${categoryStyle.frame} ${categoryStyle.shadow}`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-1.5 ${categoryStyle.dot}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,249,251,0.94))]" />
            <img
              src={previewSrc}
              alt={item.title}
              className="relative z-10 w-full h-full object-cover object-top"
              loading="lazy"
              width={400}
              height={300}
              decoding="async"
            />
            <div className="absolute left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/92 text-sage-dark shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="absolute inset-x-4 bottom-4 z-20 rounded-xl bg-white/92 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  <span
                    className={`h-2 w-2 rounded-full ${categoryStyle.dot}`}
                  />
                  Dokument-Vorschau
                </span>
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="mt-2 space-y-1.5" aria-hidden="true">
                <div className="h-1.5 w-4/5 rounded-full bg-slate-lighter/90" />
                <div className="h-1.5 w-3/5 rounded-full bg-slate-lighter/70" />
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
      </button>
      <CardContent className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          <span
            className={`inline-flex h-2 w-2 rounded-full ${categoryStyle.dot}`}
          />
          <span>{categoryStyle.label}</span>
          <span aria-hidden="true">·</span>
          <span>{availabilityLabel}</span>
          {item.verifiedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-normal normal-case tracking-normal">
                {item.verifiedAt}
              </span>
            </>
          ) : null}
        </div>
        <h3 className="font-semibold text-foreground mb-2 text-lg">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
          {item.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {textVersionHref ? (
            <Link
              href={textVersionHref}
              aria-label={`Textversion lesen: ${item.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium h-10 px-4 w-full bg-sage-dark hover:bg-sage-dark/90 text-white transition-colors group/button"
            >
              <FileText className="w-4 h-4" />
              Textversion lesen
              <ArrowRight className="w-4 h-4 opacity-80 transition-transform group-hover/button:translate-x-0.5" />
            </Link>
          ) : null}
          <a
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} öffnen`}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium h-10 px-4 transition-colors ${
              textVersionHref
                ? "border border-sage-dark/20 text-sage-dark hover:bg-sage-light/40"
                : "bg-sage-dark hover:bg-sage-dark/90 text-white"
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            {openLabel}
            {!textVersionHref ? (
              <ArrowRight className="w-4 h-4 opacity-80" />
            ) : null}
          </a>
          {downloadHref ? (
            <a
              href={downloadHref}
              download=""
              aria-label={`${item.title} herunterladen`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium h-10 px-4 border border-sage-dark/20 text-sage-dark hover:bg-sage-light/40 transition-colors"
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
      <section className="pt-4 pb-10 md:pt-6 wave-divider-top">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-5">
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
                  className={`group relative rounded-2xl border p-5 pr-14 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${item.cardClass}`}
                >
                  <p className="font-semibold text-foreground mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                  <span className="absolute right-4 bottom-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={scrollToResults}
                    className="h-10 rounded-full border-sage-dark/20 bg-white/80 px-4 text-sage-dark hover:bg-white"
                  >
                    Nach Kategorien filtern
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
                Wenn verfügbar, führt «Textversion lesen» zur lesbaren
                Web-Version. «PDF öffnen» öffnet die Druckversion im neuen Tab.
                Die Notfallkarte öffnet als HTML-Seite.
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
                  <Button asChild variant="outline" size="sm">
                    <Link href="/verstehen">Verstehen</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/kommunizieren">Kommunizieren</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/grenzen">Grenzen</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/selbstfuersorge">Selbstfürsorge</Link>
                  </Button>
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
