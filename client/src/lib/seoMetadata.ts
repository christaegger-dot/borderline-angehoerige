import { pageGovernance } from "../data/pageGovernance";

const IMPORT_META_ENV =
  (
    import.meta as ImportMeta & {
      env?: Record<string, string | undefined>;
    }
  ).env ?? {};

export const SITE_NAME = "Borderline · Hilfe für Angehörige";
export const BASE_DESCRIPTION =
  "Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Muster (Borderline-Persönlichkeitsstörung).";
export const DEFAULT_SITE_URL = "https://borderline-angehoerige.netlify.app";
export const SITE_URL = (
  IMPORT_META_ENV.VITE_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");
const MEDICAL_LAST_REVIEWED =
  IMPORT_META_ENV.VITE_MEDICAL_LAST_REVIEWED || null;

export function buildOgImageUrl(siteUrl = SITE_URL) {
  return `${siteUrl}/og-image.jpg`;
}

export function buildFullTitle(title?: string) {
  return title
    ? `${title} – ${SITE_NAME}`
    : `${SITE_NAME} – Evidenzbasierte Unterstützung`;
}

export function buildMetaDescription(description?: string) {
  return description || BASE_DESCRIPTION;
}

export function buildCanonicalUrl(path = "/", siteUrl = SITE_URL) {
  return `${siteUrl}${path}`;
}

export function buildWebsiteSchemaData(siteUrl = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Borderline Angehörige",
    url: siteUrl,
    description: BASE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: buildOgImageUrl(siteUrl),
      },
    },
    inLanguage: "de-CH",
  };
}

function resolveMedicalLastReviewed(
  path: string,
  lastReviewed?: string | null
): string | null {
  if (lastReviewed) {
    return lastReviewed;
  }

  return pageGovernance[path]?.lastReviewed ?? MEDICAL_LAST_REVIEWED;
}

export function buildMedicalPageSchemaData({
  title,
  description,
  path,
  siteUrl = SITE_URL,
  lastReviewed,
}: {
  title: string;
  description: string;
  path: string;
  siteUrl?: string;
  lastReviewed?: string | null;
}) {
  const resolvedLastReviewed = resolveMedicalLastReviewed(path, lastReviewed);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: buildCanonicalUrl(path, siteUrl),
    inLanguage: "de",
    about: {
      "@type": "MedicalCondition",
      name: "Persönlichkeitsstörung mit Borderline-Muster",
      alternateName: ["Borderline-Muster", "Borderline pattern"],
      code: {
        "@type": "MedicalCode",
        code: "6D11.5",
        codingSystem: "ICD-11",
      },
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Angehörige von Menschen mit Borderline-Muster",
    },
    ...(resolvedLastReviewed && { lastReviewed: resolvedLastReviewed }),
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Caregiver",
    },
  };
}

export function buildBreadcrumbSchemaData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFAQSchemaData(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(question => ({
      "@type": "Question",
      name: question.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.answer,
      },
    })),
  };
}
