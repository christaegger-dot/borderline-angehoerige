import { useEffect, useMemo } from "react";
import {
  buildBreadcrumbSchemaData,
  buildCanonicalUrl,
  buildFAQSchemaData,
  buildFullTitle,
  buildMedicalPageSchemaData,
  buildMetaDescription,
  buildOgImageUrl,
  buildWebsiteSchemaData,
  SITE_URL,
} from "@/lib/seoMetadata";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  robots?: string;
}

const getSiteUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return SITE_URL;
};
export {
  buildBreadcrumbSchemaData,
  buildCanonicalUrl,
  buildFAQSchemaData,
  buildFullTitle,
  buildMedicalPageSchemaData,
  buildMetaDescription,
  buildWebsiteSchemaData,
};

export default function SEO({
  title,
  description,
  path = "/",
  type = "website",
  canonicalPath,
  robots,
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
    const removeMeta = (name: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      document.querySelector(`meta[${attr}="${name}"]`)?.remove();
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
    if (robots) {
      updateMeta("robots", robots);
    } else {
      removeMeta("robots");
    }

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
  }, [canonicalPath, fullTitle, metaDescription, path, robots, type]);

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
  lastReviewed,
}: {
  title: string;
  description: string;
  path: string;
  lastReviewed?: string | null;
}) {
  const siteUrl = getSiteUrl();
  const schema = useMemo(
    () =>
      buildMedicalPageSchemaData({
        title,
        description,
        path,
        siteUrl,
        lastReviewed,
      }),
    [description, lastReviewed, path, siteUrl, title]
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
