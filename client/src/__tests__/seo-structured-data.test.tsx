import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";

describe("SEO structured data hydration", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("reuses prerendered static schema scripts instead of duplicating them", () => {
    document.head.innerHTML = `
      <script type="application/ld+json" data-static-schema="website">{"@type":"WebSite","url":"https://borderline-angehoerige.netlify.app"}</script>
      <script type="application/ld+json" data-static-schema="medical-/verstehen/diagnostik">{"@type":"MedicalWebPage","url":"https://borderline-angehoerige.netlify.app/verstehen/diagnostik"}</script>
    `;

    render(
      <>
        <WebsiteSchema />
        <MedicalPageSchema
          title="Diagnostik"
          description="Beschreibung"
          path="/verstehen/diagnostik"
        />
      </>
    );

    const scripts = document.head.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts).toHaveLength(2);
    expect(
      document.head.querySelectorAll('script[data-static-schema="website"]')
    ).toHaveLength(0);
    expect(
      document.head.querySelectorAll(
        'script[data-static-schema="medical-/verstehen/diagnostik"]'
      )
    ).toHaveLength(0);
    expect(
      document.head.querySelectorAll('script[data-schema="website"]')
    ).toHaveLength(1);
    expect(
      document.head.querySelectorAll(
        'script[data-schema="medical-/verstehen/diagnostik"]'
      )
    ).toHaveLength(1);
  });
});
