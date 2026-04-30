import { useEffect, useMemo } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  canonicalPath?: string;
}

const SITE_NAME = "Borderline · Hilfe für Angehörige";
const BASE_DESCRIPTION =
  "Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Muster (Borderline-Persönlichkeitsstörung).";
const DEFAULT_SITE_URL = "https://borderline-angehoerige.netlify.app";
const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(
  /\/+$/,
  ""
);

// Medical content must define review dates explicitly.
const MEDICAL_LAST_REVIEWED =
  import.meta.env.VITE_MEDICAL_LAST_REVIEWED || null;

const buildOgImageUrl = (siteUrl = SITE_URL) => `${siteUrl}/og-image.jpg`;

const getSiteUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return SITE_URL;
};

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

export function buildMedicalPageSchemaData({
  title,
  description,
  path,
  siteUrl = SITE_URL,
}: {
  title: string;
  description: string;
  path: string;
  siteUrl?: string;
}) {
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
    ...(MEDICAL_LAST_REVIEWED && { lastReviewed: MEDICAL_LAST_REVIEWED }),
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

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
  canonicalPath,
}: SEOProps) {
  const fullTitle = buildFullTitle(title);
  const metaDescription = buildMetaDescription(description);

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonicalOrPath = canonicalPath || path;
    const canonicalUrl = buildCanonicalUrl(canonicalOrPath, siteUrl);
    const ogImage = buildOgImageUrl(siteUrl);

    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("description", metaDescription);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", metaDescription, true);
    updateMeta("og:type", type, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", metaDescription);
    updateMeta("twitter:image", ogImage);

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalPath, fullTitle, metaDescription, path, type]);

  return null;
}

// Schema.org structured data for the website
export function WebsiteSchema() {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const schema = buildWebsiteSchemaData(siteUrl);

    let el = document.querySelector('script[data-schema="website"]');
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-schema", "website");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      el?.remove();
    };
  }, []);

  return null;
}

// Schema.org MedicalWebPage for health-related pages
export function MedicalPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const siteUrl = getSiteUrl();
  const schema = useMemo(
    () => buildMedicalPageSchemaData({ title, description, path, siteUrl }),
    [description, path, siteUrl, title]
  );

  useEffect(() => {
    let el = document.querySelector(`script[data-schema="medical-${path}"]`);
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-schema", `medical-${path}`);
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      el?.remove();
    };
  }, [schema, path]);

  return null;
}

// BreadcrumbList schema
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = useMemo(() => buildBreadcrumbSchemaData(items), [items]);

  useEffect(() => {
    const key = items.map(i => i.url).join("-");
    let el = document.querySelector(`script[data-schema="breadcrumb-${key}"]`);
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-schema", `breadcrumb-${key}`);
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      el?.remove();
    };
  }, [schema, items]);

  return null;
}

// FAQ schema for FAQ page
export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = useMemo(() => buildFAQSchemaData(questions), [questions]);

  useEffect(() => {
    let el = document.querySelector('script[data-schema="faq"]');
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-schema", "faq");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      el?.remove();
    };
  }, [schema, questions]);

  return null;
}
