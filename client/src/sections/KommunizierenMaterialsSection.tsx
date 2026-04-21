import { useRef, useState, type CSSProperties } from "react";
import {
  Download,
  ExternalLink,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  kommItems,
  kommSubcategories,
  type KommunikationsKategorie,
} from "@/content/kommunizieren";
import { getHandoutOpenHref } from "@/content/handouts";

function CategoryIcon({
  icon,
}: {
  icon: "filter" | "heart" | "shield-alert" | "message-circle";
}) {
  if (icon === "heart") return <Heart className="w-4 h-4 mr-1.5" />;
  if (icon === "shield-alert")
    return <ShieldAlert className="w-4 h-4 mr-1.5" />;
  if (icon === "message-circle")
    return <MessageCircle className="w-4 h-4 mr-1.5" />;
  return <Filter className="w-4 h-4 mr-1.5" />;
}

export default function KommunizierenMaterialsSection() {
  const [activeFilter, setActiveFilter] =
    useState<KommunikationsKategorie>("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "alle"
      ? kommItems
      : kommItems.filter(item => item.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 wave-divider-top"
      style={{ "--wave-color": "var(--background)" } as CSSProperties}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
        <Download className="w-8 h-8 text-slate-blue" />
        Materialien zum Thema
      </h2>
      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
        <Eye className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF
          öffnen» öffnet die A4-Druckversion im neuen Tab.
        </span>
      </p>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-1 px-1">
        {kommSubcategories.map(category => {
          const count =
            category.id === "alle"
              ? kommItems.length
              : kommItems.filter(item => item.category === category.id).length;

          return (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveFilter(category.id);
                setTimeout(() => {
                  gridRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 50);
              }}
              className={`whitespace-nowrap shrink-0 ${
                activeFilter === category.id
                  ? "bg-terracotta-mid hover:bg-terracotta-dark text-white"
                  : ""
              }`}
            >
              <CategoryIcon icon={category.icon} />
              {category.label}
              <span className="ml-1.5 text-xs opacity-90">({count})</span>
            </Button>
          );
        })}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {filteredItems.map((item, index) => (
          <Card
            key={item.title}
            className={`overflow-hidden hover:shadow-lg transition-all duration-500 group ${
              filteredItems.length > 1 && index === 0 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="aspect-[4/3] bg-muted">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={400}
                height={223}
                decoding="async"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-foreground text-sm mb-2">
                {item.title}
              </h3>
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="/materialien">Alle Materialien ansehen</Link>
        </Button>
      </div>
    </motion.div>
  );
}
