import {
  buildCanonicalUrl,
  buildFullTitle,
  buildMedicalPageSchemaData,
  buildMetaDescription,
  buildOgImageUrl,
  buildWebsiteSchemaData,
} from "../client/src/lib/seoMetadata";
import { handoutTextVersionMetas } from "../client/src/content/handoutTextMetas";

export interface StaticRouteHeadMetadata {
  path: string;
  title: string;
  description: string;
  canonicalPath?: string;
  type?: "website" | "article";
  robots?: string;
  includeWebsiteSchema?: boolean;
  includeMedicalSchema?: boolean;
  medicalTitle?: string;
  medicalDescription?: string;
  medicalLastReviewed?: string | null;
}

export const STATIC_ROUTE_REDIRECTS = [
  { from: "/notfallkarte.html", to: "/notfallkarte", status: 301 },
  { from: "/notfall", to: "/soforthilfe", status: 301 },
  { from: "/unterstuetzen", to: "/unterstuetzen/uebersicht", status: 301 },
  { from: "/selbsthilfegruppen", to: "/beratung", status: 301 },
  {
    from: "/therapieangebote",
    to: "/unterstuetzen/therapie#therapieangebote",
    status: 301,
  },
] as const;

export const SOURCE_STATIC_HTML_ROUTES = new Map<string, string>([
  ["/soforthilfe", "soforthilfe/index.html"],
  ["/notfallkarte", "notfallkarte.html"],
]);

const BASE_ROUTE_HEAD_METADATA: StaticRouteHeadMetadata[] = [
  {
    path: "/",
    title: "Startseite",
    description:
      "Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und transparent eingeordnet.",
    includeWebsiteSchema: true,
    includeMedicalSchema: true,
    medicalTitle: "Borderline: Orientierung für Angehörige",
    medicalDescription:
      "Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster.",
    medicalLastReviewed: "2026-04-30",
  },
  {
    path: "/soforthilfe",
    title: "Soforthilfe",
    description:
      "Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz. Robuste Direktseite für Soforthilfe, auch wenn die App nicht lädt.",
    includeMedicalSchema: true,
    medicalLastReviewed: "2026-04-30",
  },
  {
    path: "/notfallkarte",
    title: "Notfallkarte Zürich – Psychische Krise v07",
    description:
      "Notfallkarte Zürich: Alle wichtigen Nummern bei psychischen Krisen auf einer A4-Seite – für Angehörige.",
    includeMedicalSchema: true,
    medicalTitle: "Notfallkarte Zürich – Psychische Krise",
  },
  {
    path: "/notfallkarte/erstellen",
    title: "Persönliche Notfallkarte",
    description:
      "Erstellen Sie Ihre persönliche Notfallkarte mit den wichtigsten Nummern, Kontaktpersonen und Beruhigungsstrategien – zum Ausdrucken oder Speichern.",
    includeMedicalSchema: true,
  },
  {
    path: "/verstehen",
    title: "Borderline verstehen",
    description:
      "Borderline aus Sicht von Angehörigen verstehen: Beziehungsdynamik, Überflutung, Nähe-Distanz und hilfreiche Einordnung.",
    includeMedicalSchema: true,
  },
  {
    path: "/verstehen/diagnostik",
    title: "Diagnostik",
    description:
      "Wie eine Borderline-Diagnose entsteht: wer sie stellen darf, wie sie abläuft, was sie für Angehörige bedeutet — und wo im Kanton Zürich eine Abklärung möglich ist.",
    includeMedicalSchema: true,
  },
  {
    path: "/verstehen/begleiterkrankungen",
    title: "Begleiterkrankungen",
    description:
      "Komorbidität bei Borderline: warum Depression so oft dazukommt, was das für Angehörige bedeutet, und wie Behandlung sich dadurch verändert.",
    includeMedicalSchema: true,
  },
  {
    path: "/unterstuetzen/uebersicht",
    title: "Unterstützen – Übersicht",
    description:
      "Wie Angehörige hilfreich bleiben können: Rolle, Krisenlogik, Grenzen und tragfähige Unterstützung.",
    includeMedicalSchema: true,
  },
  {
    path: "/unterstuetzen/alltag",
    title: "Unterstützen im Alltag",
    description:
      "Wie Angehörige im Alltag hilfreich bleiben können: verlässlich, klar und ohne sich selbst zu verlieren.",
    includeMedicalSchema: true,
  },
  {
    path: "/unterstuetzen/therapie",
    title: "Therapie unterstützen",
    description:
      "Wie Angehörige Behandlung unterstützen können, ohne mitzubehandeln oder die Verantwortung zu übernehmen.",
    includeMedicalSchema: true,
  },
  {
    path: "/unterstuetzen/krise",
    title: "Krisenbegleitung",
    description:
      "Krisenbegleitung bei Borderline: Wie Sie in akuten Situationen deeskalieren, Grenzen wahren und professionelle Hilfe richtig einbeziehen.",
    includeMedicalSchema: true,
  },
  {
    path: "/kommunizieren",
    title: "Kommunizieren",
    description:
      "Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen.",
    includeMedicalSchema: true,
  },
  {
    path: "/grenzen",
    title: "Grenzen setzen",
    description:
      "Grenzen für Angehörige: Selbstschutz, Klarheit, Konsequenz und begrenzte Verfügbarkeit.",
    includeMedicalSchema: true,
  },
  {
    path: "/selbstfuersorge",
    title: "Selbstfürsorge",
    description:
      "Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen.",
    includeMedicalSchema: true,
  },
  {
    path: "/materialien",
    title: "Materialien",
    description:
      "Ausgewählte Materialien, Infografiken und Notfallhilfen für Angehörige von Menschen mit Borderline.",
  },
  {
    path: "/selbsttest",
    title: "Selbsttest",
    description:
      "Selbsttest für Angehörige: Wie stark sind Sie gerade belastet? Anonyme Einschätzung in wenigen Minuten – mit Hinweisen auf passende Hilfsangebote.",
  },
  {
    path: "/impressum",
    title: "Impressum",
    description: "Impressum und rechtliche Informationen.",
  },
  {
    path: "/datenschutz",
    title: "Datenschutz",
    description:
      "Datenschutzerklärung: Wie diese Website mit Daten umgeht, welche Cookies gesetzt werden und welche Rechte Sie haben.",
  },
  {
    path: "/genesung",
    title: "Genesung",
    description:
      "Genesung bei Borderline: realistische Hoffnung, Langzeitverlauf und was das für Angehörige bedeutet.",
    includeMedicalSchema: true,
  },
  {
    path: "/beratung",
    title: "Beratung & Netzwerke",
    description:
      "Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige von Menschen mit Borderline in der Schweiz.",
    includeMedicalSchema: true,
  },
  {
    path: "/feedback",
    title: "Feedback",
    description: "Rückmeldungen zur Website nehmen wir per E-Mail entgegen.",
  },
  {
    path: "/glossar",
    title: "Glossar",
    description:
      "Fachbegriffe rund um Borderline verständlich erklärt: von BPS über DBT bis Dysregulation – für Angehörige ohne Vorkenntnisse.",
  },
  {
    path: "/buchempfehlungen",
    title: "Buchempfehlungen",
    description:
      "Buchempfehlungen für Angehörige von Menschen mit Borderline: Ratgeber, Fachliteratur und DBT-Bücher – mit kurzen Einschätzungen zum Inhalt.",
  },
  {
    path: "/faq",
    title: "Häufige Fragen",
    description:
      "Häufige Fragen von Angehörigen zu Borderline: Verhalten in Krisen, Grenzen setzen, Kommunikation und Selbstschutz – klar und ohne Umschweife beantwortet.",
  },
  {
    path: "/ueber-uns",
    title: "Über uns",
    description: "Über das Projekt Borderline · Hilfe für Angehörige.",
  },
  {
    path: "/fachstelle",
    title: "Fachstelle Angehörigenarbeit",
    description:
      "Fachstelle Angehörigenarbeit der Psychiatrischen Universitätsklinik Zürich (PUK). Beratung, Orientierung und Materialien für Angehörige.",
  },
  {
    path: "/wegweiser",
    title: "Situations-Wegweiser",
    description:
      "Was tun, wenn Ihr Angehöriger in einer Krise ist? Unser interaktiver Wegweiser führt Sie Schritt für Schritt durch verschiedene Situationen.",
    includeMedicalSchema: true,
  },
  {
    path: "/uebungen",
    title: "Kommunikations-Übungen",
    description:
      "Üben Sie SET, DEAR MAN und Validierung anhand realistischer Szenarien – interaktiv, mit Feedback und Erklärungen.",
  },
  {
    path: "/quellen",
    title: "Quellen & Literatur",
    description:
      "Wissenschaftliche Grundlagen und Fachliteratur dieser Website: klinische Studien, DBT-Literatur, Angehörigenbücher und Diagnoseklassifikationen.",
    includeMedicalSchema: true,
  },
  {
    path: "/barrierefreiheit",
    title: "Barrierefreiheit",
    description:
      "Erklärung zur Barrierefreiheit dieser Website: Konformitätsziel, umgesetzte Massnahmen und Kontaktmöglichkeit bei Problemen.",
  },
  {
    path: "/404",
    title: "Seite nicht gefunden",
    description: "Die gesuchte Seite existiert leider nicht.",
    robots: "noindex, nofollow",
  },
];

export const STATIC_ROUTE_HEAD_METADATA: StaticRouteHeadMetadata[] = [
  ...BASE_ROUTE_HEAD_METADATA,
  ...handoutTextVersionMetas.map(meta => ({
    path: meta.path,
    title: `${meta.title} – Textversion`,
    description: meta.description,
    includeMedicalSchema: true,
  })),
];

const STATIC_ROUTE_HEAD_METADATA_BY_PATH = new Map(
  STATIC_ROUTE_HEAD_METADATA.map(meta => [meta.path, meta])
);

export function getStaticRouteHeadMetadata(pathname: string) {
  return STATIC_ROUTE_HEAD_METADATA_BY_PATH.get(pathname) ?? null;
}

export function getGeneratedStaticRouteHeadMetadata() {
  return STATIC_ROUTE_HEAD_METADATA.filter(
    meta => !SOURCE_STATIC_HTML_ROUTES.has(meta.path)
  );
}

export function getGeneratedStaticHtmlOutputPath(pathname: string) {
  if (pathname === "/") {
    return "index.html";
  }

  if (pathname === "/404") {
    return "404.html";
  }

  return `${pathname.replace(/^\/+/, "")}.html`;
}

export function getStaticHtmlCandidates(pathname: string) {
  if (pathname === "/") {
    return ["index.html"];
  }

  const trimmed = pathname.replace(/^\/+/, "");
  const sourceStaticHtml = SOURCE_STATIC_HTML_ROUTES.get(pathname);

  return [
    ...(sourceStaticHtml ? [sourceStaticHtml] : []),
    `${trimmed}.html`,
    `${trimmed}/index.html`,
  ];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeStaticSchemaScripts(html: string) {
  return html.replace(
    /\s*<script[^>]+data-static-schema="[^"]+"[^>]*>[\s\S]*?<\/script>/gi,
    ""
  );
}

function upsertTitle(html: string, title: string) {
  const tag = `<title>${escapeHtml(title)}</title>`;

  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function upsertMetaTag(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string
) {
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
    "i"
  );
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function removeMetaTag(
  html: string,
  attribute: "name" | "property",
  key: string
) {
  const pattern = new RegExp(
    `\\s*<meta[^>]+${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
    "gi"
  );

  return html.replace(pattern, "");
}

function upsertLinkTag(
  html: string,
  rel: string,
  href: string,
  extraAttributes = ""
) {
  const pattern = new RegExp(
    `<link[^>]+rel=["']${escapeRegExp(rel)}["'][^>]*>`,
    "i"
  );
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}"${extraAttributes} />`;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function buildStaticSchemaScripts(meta: StaticRouteHeadMetadata) {
  const schemas: Array<{ key: string; data: Record<string, unknown> }> = [];

  if (meta.includeWebsiteSchema) {
    schemas.push({ key: "website", data: buildWebsiteSchemaData() });
  }

  if (meta.includeMedicalSchema) {
    schemas.push({
      key: `medical-${meta.path}`,
      data: buildMedicalPageSchemaData({
        title: meta.medicalTitle ?? meta.title,
        description: meta.medicalDescription ?? meta.description,
        path: meta.canonicalPath ?? meta.path,
        lastReviewed: meta.medicalLastReviewed ?? null,
      }),
    });
  }

  return schemas
    .map(
      schema =>
        `  <script type="application/ld+json" data-static-schema="${schema.key}">${JSON.stringify(schema.data).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n");
}

function buildRoutePrerenderSection(meta: StaticRouteHeadMetadata) {
  const primaryHref = meta.path === "/" ? "/verstehen" : "/";
  const primaryLabel =
    meta.path === "/" ? "Borderline besser verstehen" : "Zur Startseite";
  const secondaryHref =
    meta.path === "/" ? "/unterstuetzen/uebersicht" : "/materialien";
  const secondaryLabel =
    meta.path === "/" ? "Was hilft in meiner Lage?" : "Materialien öffnen";
  const kicker =
    meta.path === "/404"
      ? "Diese Seite wurde nicht gefunden"
      : "Die gewünschte Seite lädt";
  const note =
    meta.path === "/404"
      ? "Nutzen Sie die Startseite oder Soforthilfe, um einen sicheren nächsten Schritt zu wählen."
      : "Die vollständige Website lädt im Hintergrund.";

  return [
    '<section id="route-prerender">',
    '  <div class="route-prerender-shell">',
    '    <div class="route-prerender-topbar">',
    '      <a class="route-prerender-brand" href="/">',
    '        <span class="route-prerender-mark" aria-hidden="true">',
    "          <svg",
    '            viewBox="0 0 24 24"',
    '            fill="none"',
    '            stroke="currentColor"',
    '            stroke-width="2"',
    '            stroke-linecap="round"',
    '            stroke-linejoin="round"',
    "          >",
    '            <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />',
    '            <circle cx="12" cy="12" r="10" />',
    "          </svg>",
    "        </span>",
    "        <span>Borderline · Hilfe für Angehörige</span>",
    "      </a>",
    "    </div>",
    '    <div class="route-prerender-body">',
    '      <div class="route-prerender-card">',
    `        <p class="route-prerender-kicker">${escapeHtml(kicker)}</p>`,
    `        <h1 class="route-prerender-title">${escapeHtml(meta.title)}</h1>`,
    `        <p class="route-prerender-copy">${escapeHtml(meta.description)}</p>`,
    '        <div class="route-prerender-actions">',
    `          <a class="route-prerender-primary" href="${primaryHref}">${escapeHtml(primaryLabel)}</a>`,
    `          <a href="${secondaryHref}">${escapeHtml(secondaryLabel)}</a>`,
    "        </div>",
    '        <a class="route-prerender-crisis" href="/soforthilfe">',
    "          Akute Krise? Soforthilfe",
    "        </a>",
    `        <p class="route-prerender-note">${escapeHtml(note)}</p>`,
    "      </div>",
    "    </div>",
    "  </div>",
    "</section>",
  ].join("\n");
}

function replaceRoutePrerenderSection(
  html: string,
  meta: StaticRouteHeadMetadata
) {
  const prerenderSection = buildRoutePrerenderSection(meta);

  if (/<section id="route-prerender">[\s\S]*?<\/section>/i.test(html)) {
    return html.replace(
      /<section id="route-prerender">[\s\S]*?<\/section>/i,
      prerenderSection
    );
  }

  return html.replace("</body>", `${prerenderSection}\n  </body>`);
}

export function renderStaticRouteHtml(
  baseHtml: string,
  meta: StaticRouteHeadMetadata
) {
  const fullTitle = buildFullTitle(meta.title);
  const description = buildMetaDescription(meta.description);
  const canonicalUrl = buildCanonicalUrl(meta.canonicalPath ?? meta.path);
  const htmlType = meta.type ?? "website";
  const ogImageUrl = buildOgImageUrl();
  const staticSchemaScripts = buildStaticSchemaScripts(meta);

  let html = removeStaticSchemaScripts(baseHtml);

  html = upsertTitle(html, fullTitle);
  html = upsertMetaTag(html, "name", "description", description);
  html = upsertMetaTag(html, "property", "og:type", htmlType);
  html = upsertMetaTag(html, "property", "og:title", fullTitle);
  html = upsertMetaTag(html, "property", "og:description", description);
  html = upsertMetaTag(html, "property", "og:url", canonicalUrl);
  html = upsertMetaTag(html, "property", "og:image", ogImageUrl);
  html = upsertMetaTag(html, "property", "og:image:width", "1200");
  html = upsertMetaTag(html, "property", "og:image:height", "630");
  html = upsertMetaTag(html, "property", "og:locale", "de_CH");
  html = upsertMetaTag(
    html,
    "property",
    "og:site_name",
    "Borderline · Hilfe für Angehörige"
  );
  html = upsertMetaTag(html, "name", "twitter:card", "summary_large_image");
  html = upsertMetaTag(html, "name", "twitter:title", fullTitle);
  html = upsertMetaTag(html, "name", "twitter:description", description);
  html = upsertMetaTag(html, "name", "twitter:image", ogImageUrl);
  html = upsertLinkTag(html, "canonical", canonicalUrl);

  html = meta.robots
    ? upsertMetaTag(html, "name", "robots", meta.robots)
    : removeMetaTag(html, "name", "robots");

  if (staticSchemaScripts) {
    html = html.replace("</head>", `${staticSchemaScripts}\n</head>`);
  }

  if (meta.path !== "/") {
    html = replaceRoutePrerenderSection(html, meta);
  }

  return html;
}
