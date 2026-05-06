import { Link, useLocation } from "wouter";
import { getRouteAccent } from "@/components/layout/routeAccent";
import { getHandoutTextVersionMeta } from "@/content/handoutTextVersions";
import { PERSONAL_NOTFALLKARTE_PATH } from "@/domain/notfallkarte";
import { ArrowLeft, ChevronRight, Home } from "@/icons/root-icons";

const pageNames: Record<string, string> = {
  "/": "Startseite",
  "/verstehen": "Borderline verstehen",
  "/unterstuetzen": "Unterstützen",
  "/unterstuetzen/uebersicht": "Übersicht",
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
  [PERSONAL_NOTFALLKARTE_PATH]: "Persönliche Notfallkarte",
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
    <div className="border-b border-border/40 bg-background/92">
      <nav className="container py-2 md:py-3.5" aria-label="Breadcrumb">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <Link
            href={backHref}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors group sm:hidden ${accent.breadcrumbBack}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>

          <p
            className={`min-w-0 flex-1 truncate text-right text-[13px] font-medium sm:hidden ${accent.textAccent}`}
          >
            {pageName}
          </p>

          <ol className="hidden sm:flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
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
              <span className={`font-medium ${accent.textAccent}`}>
                {pageName}
              </span>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}
