import { Link, useLocation } from "wouter";
import { ArrowLeft, ChevronRight, Home } from "@/icons/root-icons";

const pageNames: Record<string, string> = {
  "/": "Startseite",
  "/verstehen": "Borderline verstehen",
  "/unterstuetzen": "Unterstützen",
  "/unterstuetzen/uebersicht": "Grundlagen",
  "/unterstuetzen/alltag": "Alltag",
  "/unterstuetzen/therapie": "Therapie",
  "/unterstuetzen/krise": "Krise",
  "/kommunizieren": "Kommunizieren",
  "/grenzen": "Grenzen setzen",
  "/selbstfuersorge": "Selbstfürsorge",
  "/soforthilfe": "Soforthilfe",
  "/materialien": "Materialien",
  "/selbsttest": "Selbsttest",
  "/genesung": "Genesung",
  "/beratung": "Beratung & Netzwerke",
  "/selbsthilfegruppen": "Selbsthilfegruppen",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutz",
  "/ueber-uns": "Über uns",
  "/faq": "Häufige Fragen",
  "/glossar": "Glossar",
  "/buchempfehlungen": "Buchempfehlungen",
  "/feedback": "Feedback",
  "/wegweiser": "Situations-Wegweiser",
  "/notfallkarte": "Persönliche Notfallkarte",
  "/uebungen": "Kommunikations-Übungen",
  "/quellen": "Quellen & Literatur",
  "/fachstelle": "Fachstelle Angehörigenarbeit",
};

function getParentInfo(
  location: string
): { href: string; label: string } | null {
  if (location.startsWith("/unterstuetzen/")) {
    return { href: "/unterstuetzen/uebersicht", label: "Unterstützen" };
  }

  return null;
}

export function Breadcrumbs() {
  const [location] = useLocation();

  if (location === "/") return null;

  const pageName =
    pageNames[location] || location.split("/").pop()?.replace(/-/g, " ") || "";
  const parent = getParentInfo(location);
  const backHref = parent?.href || "/";
  const backLabel = parent?.label || "Startseite";

  return (
    <div className="border-b border-border/40 bg-background/60">
      <nav className="container py-3" aria-label="Breadcrumb">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group sm:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>

          <ol className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Startseite</span>
              </Link>
            </li>
            {parent && (
              <li className="flex items-center gap-2">
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground/50"
                  aria-hidden="true"
                />
                <Link
                  href={parent.href}
                  className="hover:text-foreground transition-colors"
                >
                  {parent.label}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2">
              <ChevronRight
                className="w-4 h-4 text-muted-foreground/50"
                aria-hidden="true"
              />
              <span className="text-foreground font-medium">{pageName}</span>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}
