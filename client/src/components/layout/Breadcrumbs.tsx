import { Link, useLocation } from "wouter";
import { getHandoutTextVersionMeta } from "@/content/handoutTextVersions";
import { PERSONAL_NOTFALLKARTE_PATH } from "@/domain/notfallkarte";
import { ArrowLeft, ChevronRight, Home } from "@/icons/root-icons";

const pageNames: Record<string, string> = {
  "/": "Startseite",
  "/verstehen": "Borderline verstehen",
  "/verstehen/diagnostik": "Diagnostik",
  "/verstehen/begleiterkrankungen": "Begleiterkrankungen",
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

function decodeUriComponentSafely(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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

  if (
    normalizedLocation.startsWith("/unterstuetzen/") &&
    normalizedLocation !== "/unterstuetzen/uebersicht"
  ) {
    return { href: "/unterstuetzen/uebersicht", label: "Unterstützen" };
  }

  if (normalizedLocation.startsWith("/verstehen/")) {
    return { href: "/verstehen", label: "Borderline verstehen" };
  }

  return null;
}

export function shouldShowBreadcrumbs(location: string) {
  const normalizedLocation = normalizeLocation(location);
  if (normalizedLocation === "/") return false;
  return getParentInfo(normalizedLocation) !== null;
}

export function getPageName(location: string) {
  const normalizedLocation = normalizeLocation(location);

  if (normalizedLocation.startsWith("/materialien/text/")) {
    const handoutId = decodeUriComponentSafely(
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

  if (!shouldShowBreadcrumbs(location)) return null;

  const pageName = getPageName(location);
  const parent = getParentInfo(location);
  const backHref = parent?.href || "/";
  const backLabel = parent?.label || "Startseite";

  return (
    <div className="breadcrumb-shell">
      <nav className="container breadcrumb-shell__nav" aria-label="Breadcrumb">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <Link href={backHref} className="breadcrumb-shell__back sm:hidden">
            <ArrowLeft className="h-4 w-4" />
            <span>{backLabel}</span>
          </Link>

          <p className="breadcrumb-shell__mobile-current sm:hidden">
            {pageName}
          </p>

          <ol className="breadcrumb-shell__list">
            <li>
              <Link href="/" className="breadcrumb-shell__link">
                <Home className="h-3.5 w-3.5" />
                <span>Startseite</span>
              </Link>
            </li>
            {parent && (
              <li className="flex items-center gap-1.5">
                <ChevronRight
                  className="breadcrumb-shell__separator"
                  aria-hidden="true"
                />
                <Link href={parent.href} className="breadcrumb-shell__link">
                  {parent.label}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <ChevronRight
                className="breadcrumb-shell__separator"
                aria-hidden="true"
              />
              <span className="breadcrumb-shell__current">{pageName}</span>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}
