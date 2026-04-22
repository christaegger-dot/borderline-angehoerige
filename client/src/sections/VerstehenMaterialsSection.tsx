import { useRef, useState, type CSSProperties } from "react";
import {
  BookOpen,
  Brain,
  Download,
  ExternalLink,
  FileText,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  verstehenInfografiken,
  type VerstehenMaterialCategory,
} from "@/content/verstehen";
import { getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersionHrefBySource } from "@/content/handoutTextVersions";

const verstehenCategories = [
  {
    id: "alle",
    label: "Alle",
    icon: Filter,
    count: verstehenInfografiken.length,
  },
  {
    id: "grundlagen",
    label: "Grundlagen",
    icon: BookOpen,
    count: verstehenInfografiken.filter(i => i.category === "grundlagen")
      .length,
  },
  {
    id: "neurobiologie",
    label: "Stress & Gehirn",
    icon: Brain,
    count: verstehenInfografiken.filter(i => i.category === "neurobiologie")
      .length,
  },
] as const;

export default function VerstehenMaterialsSection() {
  const [activeFilter, setActiveFilter] =
    useState<VerstehenMaterialCategory>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? verstehenInfografiken
      : verstehenInfografiken.filter(item => item.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 wave-divider-top"
      id="materialien"
      style={{ "--wave-color": "var(--background)" } as CSSProperties}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
        <Download className="w-8 h-8 text-sage-dark" />
        Materialien zum Vertiefen
      </h2>

      <p className="text-muted-foreground mb-6">
        Diese Materialien ergänzen die Seite, ersetzen sie aber nicht. Wenn
        verfügbar, führt «Textversion» zur lesbaren Web-Version. Beginnen Sie
        mit den Grundlagen, wenn Sie gerade Orientierung brauchen.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {verstehenCategories.map(cat => (
          <Button
            key={cat.id}
            variant={activeFilter === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveFilter(cat.id);
              setTimeout(() => {
                gridRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 50);
            }}
            className={`whitespace-nowrap shrink-0 ${
              activeFilter === cat.id
                ? "bg-sage-dark hover:bg-sage-mid text-white"
                : ""
            }`}
          >
            <cat.icon className="w-4 h-4 mr-1.5" />
            {cat.label} ({cat.count})
          </Button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => {
          const textVersionHref = getHandoutTextVersionHrefBySource(
            item.pdfUrl
          );

          return (
            <Card
              key={item.id}
              className={`${item.featured && activeFilter === "alle" ? "md:col-span-2" : ""} overflow-hidden hover:shadow-lg transition-shadow`}
            >
              <button
                type="button"
                className="aspect-[3/4] bg-muted cursor-pointer w-full"
                onClick={() =>
                  window.open(item.webpUrl, "_blank", "noopener,noreferrer")
                }
                aria-label={`${item.alt} – Vorschau öffnen`}
              >
                <img
                  src={item.webpUrl}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  width={400}
                  height={223}
                  decoding="async"
                />
              </button>
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className="grid gap-2">
                  {textVersionHref ? (
                    <Link
                      href={textVersionHref}
                      aria-label={`Textversion lesen: ${item.title}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full bg-sage-dark hover:bg-sage-mid text-white transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Textversion
                    </Link>
                  ) : null}
                  <a
                    href={getHandoutOpenHref(item.pdfUrl) ?? item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                    className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    PDF öffnen
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/materialien">Alle Materialien anzeigen</Link>
        </Button>
      </div>
    </motion.div>
  );
}
