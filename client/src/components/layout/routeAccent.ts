export interface RouteAccent {
  navActive: string;
  surfaceActive: string;
  breadcrumbChip: string;
  breadcrumbBack: string;
  textAccent: string;
  dot: string;
  groupLabel: string;
}

const accents = {
  sage: {
    navActive:
      "bg-sage-dark text-white shadow-[0_16px_30px_-18px_rgba(31,101,109,0.9)]",
    surfaceActive: "border-sage-light/70 bg-sage-wash text-sage-darker",
    breadcrumbChip: "border-sage-light/70 bg-sage-wash/95 text-sage-darker",
    breadcrumbBack:
      "border-sage-light/60 bg-white/90 text-sage-darker hover:bg-sage-wash/80",
    textAccent: "text-sage-darker",
    dot: "bg-sage-dark",
    groupLabel: "text-sage-dark/85",
  },
  terracotta: {
    navActive:
      "bg-terracotta text-white shadow-[0_16px_30px_-18px_rgba(165,97,55,0.9)]",
    surfaceActive:
      "border-terracotta-light/80 bg-terracotta-wash text-terracotta-darker",
    breadcrumbChip:
      "border-terracotta-light/80 bg-terracotta-wash/95 text-terracotta-darker",
    breadcrumbBack:
      "border-terracotta-light/70 bg-white/90 text-terracotta-darker hover:bg-terracotta-wash/85",
    textAccent: "text-terracotta-darker",
    dot: "bg-terracotta",
    groupLabel: "text-terracotta-dark/85",
  },
  slate: {
    navActive:
      "bg-slate-dark text-white shadow-[0_16px_30px_-18px_rgba(82,109,158,0.85)]",
    surfaceActive: "border-slate-light/85 bg-slate-wash text-slate-dark",
    breadcrumbChip: "border-slate-light/85 bg-slate-wash/95 text-slate-dark",
    breadcrumbBack:
      "border-slate-light/80 bg-white/90 text-slate-dark hover:bg-slate-wash/85",
    textAccent: "text-slate-dark",
    dot: "bg-slate-blue",
    groupLabel: "text-slate-dark/85",
  },
  sand: {
    navActive:
      "bg-sand-warm text-white shadow-[0_16px_30px_-18px_rgba(161,126,56,0.88)]",
    surfaceActive: "border-sand-border/85 bg-sand-muted text-sand-warm",
    breadcrumbChip: "border-sand-border/85 bg-sand-muted/95 text-sand-warm",
    breadcrumbBack:
      "border-sand-border/80 bg-white/90 text-sand-warm hover:bg-sand-muted/90",
    textAccent: "text-sand-warm",
    dot: "bg-sand-accent",
    groupLabel: "text-sand-warm/85",
  },
  selfCare: {
    navActive:
      "bg-sage-mid text-white shadow-[0_16px_30px_-18px_rgba(59,127,117,0.88)]",
    surfaceActive: "border-sage-light/80 bg-sage-pale text-sage-darker",
    breadcrumbChip: "border-sage-light/80 bg-sage-pale text-sage-darker",
    breadcrumbBack:
      "border-sage-light/70 bg-white/90 text-sage-darker hover:bg-sage-pale",
    textAccent: "text-sage-darker",
    dot: "bg-sage-mid",
    groupLabel: "text-sage-darker/85",
  },
  alert: {
    navActive:
      "bg-alert text-white shadow-[0_16px_30px_-18px_rgba(197,95,61,0.9)]",
    surfaceActive: "border-alert-light/85 bg-alert-wash text-alert-dark",
    breadcrumbChip: "border-alert-light/85 bg-alert-wash/95 text-alert-dark",
    breadcrumbBack:
      "border-alert-light/80 bg-white/90 text-alert-dark hover:bg-alert-wash/85",
    textAccent: "text-alert-dark",
    dot: "bg-alert",
    groupLabel: "text-alert-dark/85",
  },
  navy: {
    navActive:
      "bg-navy text-white shadow-[0_16px_30px_-18px_rgba(34,52,85,0.88)]",
    surfaceActive: "border-slate-light/85 bg-slate-pale text-navy",
    breadcrumbChip: "border-slate-light/85 bg-slate-pale text-navy",
    breadcrumbBack:
      "border-slate-light/80 bg-white/90 text-navy hover:bg-slate-pale/90",
    textAccent: "text-navy",
    dot: "bg-navy-light",
    groupLabel: "text-navy/80",
  },
} satisfies Record<string, RouteAccent>;

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
    return accents.alert;
  }

  if (matches(path, ["/kommunizieren", "/uebungen", "/genesung"])) {
    return accents.slate;
  }

  if (matches(path, ["/grenzen"])) {
    return accents.sand;
  }

  if (matches(path, ["/selbstfuersorge", "/selbsttest"])) {
    return accents.selfCare;
  }

  if (matches(path, ["/unterstuetzen", "/beratung", "/selbsthilfegruppen"])) {
    return accents.terracotta;
  }

  if (
    matches(path, [
      "/verstehen",
      "/materialien",
      "/wegweiser",
      "/faq",
      "/glossar",
      "/buchempfehlungen",
      "/quellen",
    ])
  ) {
    return accents.sage;
  }

  return accents.navy;
}
