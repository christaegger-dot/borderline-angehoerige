import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
}

const SITE_NAME = "Borderline · Hilfe für Angehörige";
const BASE_DESCRIPTION = "Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung.";
const OG_IMAGE = "https://borderline-angehoerige.netlify.app/og-image.jpg";

export default function SEO({ title, description, path = "/", type = "website" }: SEOProps) {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Evidenzbasierte Unterstützung`;
  const metaDescription = description || BASE_DESCRIPTION;

  useEffect(() => {
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
    updateMeta("og:url", `https://borderline-angehoerige.netlify.app${path}`, true);
    updateMeta("og:image", OG_IMAGE, true);
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", metaDescription);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://borderline-angehoerige.netlify.app${path}`;
  }, [fullTitle, metaDescription, path, type]);

  return null;
}

// Schema.org structured data for the website
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "alternateName": "Borderline Angehörige",
    "url": "https://borderline-angehoerige.netlify.app",
    "description": BASE_DESCRIPTION,
    "inLanguage": "de",
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": "https://borderline-angehoerige.netlify.app/og-image.jpg"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://borderline-angehoerige.netlify.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  useEffect(() => {
    let el = document.querySelector('script[data-schema="website"]');
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute("data-schema", "website");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
  }, []);

  return null;
}

// Schema.org MedicalWebPage for health-related pages
export function MedicalPageSchema({ title, description, path }: { title: string; description: string; path: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": title,
    "description": description,
    "url": `https://borderline-angehoerige.netlify.app${path}`,
    "inLanguage": "de",
    "about": {
      "@type": "MedicalCondition",
      "name": "Borderline-Persönlichkeitsstörung",
      "alternateName": ["BPS", "Emotional instabile Persönlichkeitsstörung"],
      "code": {
        "@type": "MedicalCode",
        "code": "F60.3",
        "codingSystem": "ICD-10"
      }
    },
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Angehörige von Menschen mit Borderline-Persönlichkeitsstörung"
    },
    "lastReviewed": "2026-03-09",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    }
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
    return () => { el?.remove(); };
  }, [path]);

  return null;
}

// BreadcrumbList schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
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
    return () => { el?.remove(); };
  }, [items]);

  return null;
}

// FAQ schema for FAQ page
export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
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
    return () => { el?.remove(); };
  }, [questions]);

  return null;
}
