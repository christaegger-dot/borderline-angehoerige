import { describe, expect, it } from "vitest";
import {
  buildBreadcrumbSchemaData,
  buildCanonicalUrl,
  buildFAQSchemaData,
  buildFullTitle,
  buildMedicalPageSchemaData,
  buildMetaDescription,
  buildWebsiteSchemaData,
} from "@/components/SEO";

describe("SEO helpers", () => {
  it("builds the full title for page-specific titles", () => {
    expect(buildFullTitle("FAQ")).toBe(
      "FAQ – Borderline · Hilfe für Angehörige"
    );
  });

  it("falls back to the base title when no title is passed", () => {
    expect(buildFullTitle()).toBe(
      "Borderline · Hilfe für Angehörige – Evidenzbasierte Unterstützung"
    );
  });

  it("builds canonical URLs consistently", () => {
    expect(buildCanonicalUrl("/faq")).toBe(
      "https://borderline-angehoerige.netlify.app/faq"
    );
  });

  it("uses the base description as fallback", () => {
    expect(buildMetaDescription()).toContain("Evidenzbasierte Unterstützung");
  });

  it("builds website schema with the expected site URL", () => {
    const schema = buildWebsiteSchemaData();
    expect(schema.url).toBe("https://borderline-angehoerige.netlify.app");
    expect(schema["@type"]).toBe("WebSite");
  });

  it("builds medical schema with ICD-11 borderline pattern code", () => {
    const schema = buildMedicalPageSchemaData({
      title: "Borderline verstehen",
      description: "Beschreibung",
      path: "/verstehen",
    });

    expect(schema["@type"]).toBe("MedicalWebPage");
    expect(schema.about.code.code).toBe("6D11.5");
    expect(schema.url).toBe(
      "https://borderline-angehoerige.netlify.app/verstehen"
    );
  });

  it("uses page governance review dates for medical schema when available", () => {
    const schema = buildMedicalPageSchemaData({
      title: "Diagnostik",
      description: "Beschreibung",
      path: "/verstehen/diagnostik",
    });

    expect(schema.lastReviewed).toBe("2026-04-30");
  });

  it("builds breadcrumb schema with correct positions", () => {
    const schema = buildBreadcrumbSchemaData([
      { name: "Home", url: "https://example.com/" },
      { name: "FAQ", url: "https://example.com/faq" },
    ]);

    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].name).toBe("FAQ");
  });

  it("builds FAQ schema entries", () => {
    const schema = buildFAQSchemaData([
      { question: "Frage?", answer: "Antwort." },
    ]);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity[0].name).toBe("Frage?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("Antwort.");
  });
});
