import { Link, useLocation } from "wouter";
import { getRouteAccent } from "@/components/layout/routeAccent";
import { getHandoutTextVersionMeta } from "@/content/handoutTextVersions";
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
  "/barrierefreiheit": "Barrierefreiheit",
};

function normalizeLocation(location: string) {
  return location.split("#")[0];
}

export function getParentInfo(
  location: string
): { href: string; label: string } | null {
  const normalizedLocation = normalizeLocation(location);

  if (normalizedLocation.startsWith("/materialien/text/")) {
    return { href: "/materialien", label: "Materialien" };
  }

  if (normalizedLocation.startsWith("/unterstuetzen/")) {
    return { href: "/unterstuetzen/uebersicht", label: "Unterstützen" };
  }

  return null;
}

export function getPageName(location: string) {
  const normalizedLocation = normalizeLocation(location);

  if (normalizedLocation.startsWith("/materialien/text/")) {
    const handoutId = decodeURIComponent(
      normalizedLocation.replace("/materialien/text/", "")
    );
    return getHandoutTextVersionMeta(handoutId)?.title ?? "Textversion";
  }

  return (
    pageNames[normalizedLocation] ||
    normalizedLocation.split("/").pop()?.replace(/-/g, " ") ||
    ""
  );
}

export function Breadcrumbs() {
  const [location] = useLocation();
  const accent = getRouteAccent(location);

  if (location === "/") return null;

  const pageName = getPageName(location);
  const parent = getParentInfo(location);
  const backHref = parent?.href || "/";
  const backLabel = parent?.label || "Startseite";

  return (
    <div className="border-b border-border/40 bg-[linear-gradient(180deg,rgba(250,250,247,0.82),rgba(248,250,249,0.92))]">
      <nav className="container py-3 md:py-4" aria-label="Breadcrumb">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium shadow-sm shadow-black/5 transition-colors group sm:hidden ${accent.breadcrumbBack}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>

          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium sm:hidden ${accent.breadcrumbChip}`}
          >
            <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
            {pageName}
          </span>

          <ol className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-white/88 px-3 py-2 text-sm text-muted-foreground shadow-sm shadow-black/5 backdrop-blur-sm">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-muted/60 hover:text-foreground"
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
                  className={`transition-colors ${accent.textAccent}`}
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
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium ${accent.breadcrumbChip}`}
              >
                <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                {pageName}
              </span>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}
