import { useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { Link } from "wouter";

type Material = {
  id: string;
  title: string;
  description: string;
  category:
    | "verstehen"
    | "unterstuetzen"
    | "kommunizieren"
    | "grenzen"
    | "selbstfuersorge"
    | "genesung"
    | "soforthilfe";
  kind: "Infografik" | "Spickzettel" | "Checkliste" | "Notfallkarte" | "Notfallplan";
  url: string;
  downloadUrl?: string;
  pdfUrl?: string;
  previewUrl?: string;
  isHtml?: boolean;
  priority?: "core" | "secondary";
};

const materials: Material[] = [
  {
    id: "notfallkarte-zuerich",
    title: "Notfallkarte Zürich – Psychische Krise",
    description:
      "Alle wichtigen Nummern für Angehörige auf einer A4-Seite. Für akute Orientierung, wenn rasches Handeln nötig ist.",
    category: "soforthilfe",
    kind: "Notfallkarte",
    url: "/notfallkarte.html",
    previewUrl: "/notfallkarte-preview.webp",
    downloadUrl: "/notfallkarte.html",
    pdfUrl: "/Notfallkarte-Zuerich-Psychische-Krise.pdf",
    isHtml: true,
    priority: "core",
  },
  {
    id: "notfallplan-krise",
    title: "Notfallplan Krise – Suizidgedanken & Selbstverletzung",
    description:
      "Knappe 4-Schritte-Anleitung für Angehörige bei Suizidgedanken oder Selbstverletzung.",
    category: "soforthilfe",
    kind: "Notfallplan",
    url: "/notfallplan-krise-v03-preview.webp",
    downloadUrl: "/notfallplan-krise-v03.pdf",
    priority: "core",
  },
  {
    id: "leuchtturm",
    title: "Der Leuchtturm – Ihre Rolle als Angehörige/r",
    description:
      "Orientierung zur Angehörigenrolle: stabil bleiben, ohne das Schiff steuern zu wollen.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GbFCyQhEWIKomzXw.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DNGijMOYFghXAsLm.pdf",
    priority: "core",
  },
  {
    id: "eisberg",
    title: "Der Eisberg – Wut ist oft die Spitze",
    description:
      "Wut, Schmerz, Angst und Scham als Beziehungsgeschehen verständlicher einordnen.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MLLwefeyaKvtThbK.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RNKtfQQMvhlSyiIp.pdf",
    priority: "core",
  },
  {
    id: "rolle-klaeren",
    title: "Ihre Rolle klären – Was Sie sein können (und was nicht)",
    description:
      "Klarheit über hilfreiche Unterstützung, Verantwortung und die Grenzen der Angehörigenrolle.",
    category: "unterstuetzen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WUiQpUWjKIjpSRDC.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/JMOjSacqrnDcAkoB.pdf",
    priority: "core",
  },
  {
    id: "krisenkommunikation",
    title: "Spickzettel Krisenkommunikation (A4)",
    description:
      "Kurze Formulierungen für akute Spannungszustände, wenn klare Sprache mehr hilft als lange Erklärungen.",
    category: "kommunizieren",
    kind: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tgVHTaXVryVEuEss.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/YvXkEbRmwIcCFtsj.pdf",
    priority: "core",
  },
  {
    id: "grenzen-spickzettel",
    title: "Spickzettel Grenzen – Die wichtigsten Sätze",
    description:
      "Knappe Formulierungen für klare, respektvolle Grenzsetzung im Alltag und in belasteten Gesprächen.",
    category: "grenzen",
    kind: "Spickzettel",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/avGqFKFuKFfFYANu.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/obwIZiRPiVPphIUX.pdf",
    priority: "core",
  },
  {
    id: "warnsignale",
    title: "Warnsignale der Überlastung",
    description:
      "Orientierung für Angehörige, wenn Erschöpfung, Alarmbereitschaft oder Rückzug zu viel Raum einnehmen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OEUNVdTyojBBYTic.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VdAxPxngFzgNImxg.pdf",
    priority: "core",
  },
  {
    id: "schuld-verantwortung",
    title: "Schuld, Verantwortung und was dazwischen liegt",
    description:
      "Hilft, Schuldgefühle bei Angehörigen zu entlasten und Verantwortung differenzierter zu sehen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/TgzrtmiUbRscTBlg.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/jPuhxPHHtFSjOTly.pdf",
    priority: "secondary",
  },
  {
    id: "spaltung",
    title: "Spaltung – das Pendel zwischen Extremen",
    description:
      "Einordnung von Idealisierung, Entwertung und dem erschwerten Zugang zu Grautönen unter Stress.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/WRORriPmZftmvKTL.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/RtdVgflJuCNAhEKk.pdf",
    priority: "secondary",
  },
  {
    id: "alarm-modus",
    title: "Alarm-Modus vs. Denk-Modus",
    description:
      "Warum logische Klärung unter starker Anspannung oft nicht erreichbar ist und zuerst Beruhigung hilft.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/sSUJoOUTiuWgrkiZ.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tlKAOpYHdCNAtovE.pdf",
    priority: "secondary",
  },
  {
    id: "wenn-worte-treffen",
    title: "Wenn Worte treffen – 5 häufige Schuldzuweisungen",
    description:
      "Typische anklagende Sätze einordnen und eigene Reaktionen ruhiger und klarer gestalten.",
    category: "kommunizieren",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/azZbLPyPkSupQskI.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/hEXKCmWYeiyUnwXr.pdf",
    priority: "secondary",
  },
  {
    id: "dear",
    title: "Die DEAR-Technik – Grenzen setzen ohne Vorwürfe",
    description:
      "DBT-orientierte Struktur für klare Bitten und Grenzsetzungen ohne unnötige Eskalation.",
    category: "grenzen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yBSkvBJGSeNvxINq.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DDkqUiaNJwizEtPv.pdf",
    priority: "secondary",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln",
    description:
      "Hilft Angehörigen, Realität anzuerkennen, ohne aufzugeben oder alles gutzuheissen.",
    category: "selbstfuersorge",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OmxdguWaaXAkElDp.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SkBpjnDHfNmPbmnd.pdf",
    priority: "secondary",
  },
  {
    id: "genesung-zahlen",
    title: "Genesung in Zahlen – Was die Forschung zeigt",
    description:
      "Langfristige Hoffnung mit realistischen Daten: Besserung ist möglich, aber selten linear.",
    category: "genesung",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tyFTHNjsUagqrXiS.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MunlHDCNqnsOhBFn.pdf",
    priority: "secondary",
  },
  {
    id: "kinder",
    title: "Wenn Mama oder Papa grosse Gefühle hat",
    description:
      "Altersgerechte Erklärung für Kinder und Hinweise zum Schutz von Kindern im belasteten Familiensystem.",
    category: "verstehen",
    kind: "Infografik",
    url: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/PrnKdbomSunLKPVv.webp",
    downloadUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/birikKPATMlHGPWf.pdf",
    priority: "secondary",
  },
];

const categoryMeta = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "soforthilfe", label: "Soforthilfe", icon: AlertTriangle },
  { id: "verstehen", label: "Verstehen", icon: BookOpen },
  { id: "unterstuetzen", label: "Unterstützen", icon: Heart },
  { id: "kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { id: "grenzen", label: "Grenzen", icon: Shield },
  { id: "selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
  { id: "genesung", label: "Genesung", icon: TrendingUp },
];

const quickStarts = [
  {
    id: "soforthilfe",
    title: "Akute Krise",
    text: "Wenn rasche Orientierung und Notfallnummern nötig sind.",
    color: "var(--color-alert)",
    bg: "var(--color-alert-wash)",
  },
  {
    id: "verstehen",
    title: "Ich brauche Orientierung",
    text: "Wenn Sie Dynamiken besser einordnen möchten.",
    color: "var(--color-sage-mid)",
    bg: "var(--color-sage-wash)",
  },
  {
    id: "kommunizieren",
    title: "Schwierige Gespräche",
    text: "Wenn Worte schnell kippen oder verletzen.",
    color: "var(--color-slate-blue)",
    bg: "var(--color-slate-wash)",
  },
  {
    id: "selbstfuersorge",
    title: "Ich bin selbst am Limit",
    text: "Wenn Erschöpfung, Schuld oder Daueranspannung dominieren.",
    color: "var(--color-terracotta-mid)",
    bg: "var(--color-terracotta-wash)",
  },
];

function MaterialCard({
  item,
  onPreview,
}: {
  item: Material;
  onPreview: (image: string, title: string) => void;
}) {
  const previewSrc = item.isHtml ? item.previewUrl ?? item.url : item.url;
  const openHref = item.downloadUrl ?? item.url;
  const downloadHref = item.pdfUrl ?? item.downloadUrl;
  const isCrossOriginDownload =
    !!downloadHref && /^https?:\/\//i.test(downloadHref) && !downloadHref.startsWith(window.location.origin);

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
        <h3 className="font-semibold text-foreground mb-2 text-lg">{item.title}</h3>
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

export default function Materialien() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("Vorschau");
  const gridRef = useRef<HTMLElement>(null);

  const coreMaterials = useMemo(
    () => materials.filter((item) => item.priority === "core"),
    [],
  );

  const secondaryMaterials = useMemo(
    () =>
      activeCategory === "alle"
        ? materials.filter((item) => item.priority !== "core")
        : materials.filter(
            (item) => item.priority !== "core" && item.category === activeCategory,
          ),
    [activeCategory],
  );

  const scrollToResults = () => {
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <Layout>
      <SEO
        title="Materialien"
        description="Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline."
        path="/materialien"
      />

      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Download className="w-6 h-6 text-sage-darker" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Materialien für Angehörige
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Hier finden Sie ausgewählte Handouts, Infografiken und Orientierungshilfen für
              belastende, unklare oder akute Situationen. Die Sammlung ist bewusst kuratiert: lieber
              wenige, wirklich hilfreiche Ressourcen als ein unübersichtliches Archiv.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 wave-divider-top">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Was hilft gerade jetzt?
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {quickStarts.map((item) => (
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
                  <p className="font-semibold text-foreground mb-2">{item.title}</p>
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
                      Wenn Sie gerade nicht lange suchen möchten, beginnen Sie mit diesen
                      Materialien. Sie decken Krise, Orientierung, Kommunikation, Grenzen und
                      Selbstfürsorge ab.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreMaterials.map((item) => (
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

      <section ref={gridRef} className="py-12 md:py-16 border-t border-border/60">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-3 rounded-lg bg-sand border border-sand-subtle flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Vorschau = Web-Bild.</strong> «Öffnen» öffnet
                die Druckversion im neuen Tab. Die Notfallkarte öffnet als HTML-Seite.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
              {categoryMeta.map((cat) => {
                const Icon = cat.icon;
                const count =
                  cat.id === "alle"
                    ? materials.filter((item) => item.priority !== "core").length
                    : materials.filter(
                        (item) => item.priority !== "core" && item.category === cat.id,
                      ).length;
                return (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id ? "bg-sage-dark hover:bg-sage-dark text-white" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {cat.label}
                    <span className="ml-1.5 text-xs opacity-90">({count})</span>
                  </Button>
                );
              })}
            </div>

            {secondaryMaterials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryMaterials.map((item) => (
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
                    In dieser Kategorie sind aktuell keine weiteren Materialien sichtbar.
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
                <h2 className="font-semibold text-foreground mb-2 text-lg">Besondere Konstellationen</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manche Materialien helfen besonders, wenn Kinder mitbetroffen sind, wenn Schuld
                  dominiert oder wenn Grenzen und Distanz zum Thema werden.
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
                <h2 className="font-semibold text-foreground mb-2 text-lg">Von hier aus weiter</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Wenn Sie gerade eher Orientierung als Downloads brauchen, sind die Hauptseiten oft
                  der bessere Einstieg.
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
    </Layout>
  );
}
