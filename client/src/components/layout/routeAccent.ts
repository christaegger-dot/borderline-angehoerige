export interface RouteAccent {
  navActive: string;
  surfaceActive: string;
  breadcrumbChip: string;
  breadcrumbBack: string;
  textAccent: string;
  groupLabel: string;
}

const editorialAccent: RouteAccent = {
  navActive: "border-border/80 bg-white text-foreground shadow-none",
  surfaceActive: "border-border/75 bg-white text-foreground",
  breadcrumbChip: "border-border/70 bg-white/95 text-foreground",
  breadcrumbBack:
    "border-border/55 bg-transparent text-muted-foreground hover:bg-white/70 hover:text-foreground",
  textAccent: "text-[color:var(--accent-primary)]",
  groupLabel: "text-[color:var(--accent-label)]",
};

const alertAccent: RouteAccent = {
  navActive:
    "bg-alert text-white shadow-[0_16px_30px_-18px_rgba(197,95,61,0.9)]",
  surfaceActive: "border-alert-light/85 bg-alert-wash text-alert-dark",
  breadcrumbChip: "border-alert-light/85 bg-alert-wash/95 text-alert-dark",
  breadcrumbBack:
    "border-alert-light/80 bg-white/90 text-alert-dark hover:bg-alert-wash/85",
  textAccent: "text-alert-dark",
  groupLabel: "text-alert-dark/85",
};

function normalizePath(path: string) {
  return path.split("#")[0];
}

function matches(path: string, prefixes: string[]) {
  return prefixes.some(
    prefix => path === prefix || path.startsWith(`${prefix}/`)
  );
}

export function getRouteAccent(pathOrHref: string): RouteAccent {
  const path = normalizePath(pathOrHref);

  if (
    matches(path, ["/soforthilfe", "/notfallkarte"]) ||
    path === "/unterstuetzen/krise"
  ) {
    return alertAccent;
  }

  return editorialAccent;
}
