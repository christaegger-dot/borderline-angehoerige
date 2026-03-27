import { useEffect } from "react";

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
// Build-time date: set VITE_MEDICAL_LAST_REVIEWED in CI or .env to pin.
// Fallback: the date of the build (Vite inlines import.meta.env at build).
const MEDICAL_LAST_REVIEWED =
  import.meta.env.VITE_MEDICAL_LAST_REVIEWED ||
  import.meta.env.VITE_BUILD_DATE ||
  new Date().toISOString().slice(0, 10);

const getSiteUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return SITE_URL;
};

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
  canonicalPath,
}: SEOProps) {
  const fullTitle = title
    ? `${title} – ${SITE_NAME}`
    : `${SITE_NAME} – Evidenzbasierte Unterstützung`;
  const metaDescription = description || BASE_DESCRIPTION;

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonicalOrPath = canonicalPath || path;
    const ogImage = `${siteUrl}/og-image.jpg`;

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
    updateMeta("og:url", `${siteUrl}${canonicalOrPath}`, true);
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
    canonical.href = `${siteUrl}${canonicalOrPath}`;
  }, [canonicalPath, fullTitle, metaDescription, path, type]);

  return null;
}

// Schema.org structured data for the website
export function WebsiteSchema() {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const schema = {
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
          url: `${siteUrl}/og-image.jpg`,
        },
      },
      inLanguage: "de-CH",
    };

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: description,
    url: `${siteUrl}${path}`,
    inLanguage: "de",
    about: {
      "@type": "MedicalCondition",
      name: "Persönlichkeitsstörung mit Borderline-Muster",
      alternateName: ["Borderline-Muster", "Borderline pattern"],
      code: {
        "@type": "MedicalCode",
        code: "6D11",
        codingSystem: "ICD-11",
      },
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Angehörige von Menschen mit Borderline-Muster",
    },
    lastReviewed: MEDICAL_LAST_REVIEWED,
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Caregiver",
    },
  };

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
  }, [description, path, siteUrl, title]);

  return null;
}

// BreadcrumbList schema
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

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
  }, [items]);

  return null;
}

// FAQ schema for FAQ page
export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

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
  }, [questions]);

  return null;
}
