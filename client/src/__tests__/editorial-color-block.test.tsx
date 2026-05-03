import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialColorBlock } from "@/components/editorial/EditorialColorBlock";

/**
 * Verifiziert die Spezifizitäts-Falle aus dem Phase-1-Brief: H2 auf der
 * Aubergine-Akzentfläche muss explizit als Hex gesetzt sein, NICHT als
 * `var(--fg-primary)`. Sonst greift die globale `h2`-Regel mit dem dunklen
 * Default-Foreground und der H2 wird auf Aubergine unsichtbar.
 */
describe("EditorialColorBlock", () => {
  it("renders aubergine H2 with explicit #f5ece6 (not var(--fg-primary))", () => {
    render(
      <EditorialColorBlock
        variant="aubergine"
        label="Grundgedanke"
        title="Mitgefühl und Selbstschutz sind kein Widerspruch."
      >
        <p>Body</p>
      </EditorialColorBlock>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    // Inline-Style ist als Hex gesetzt — JSDOM resolved es zu rgb()
    expect(heading.style.color).toBe("rgb(245, 236, 230)");
    // Defensive: das color-Property selbst darf nie ein var()-Token sein
    // (andere Style-Properties wie font-family dürfen var() nutzen)
    expect(heading.style.color).not.toContain("var(");
  });

  it("renders aubergine eyebrow with explicit #d6c8be", () => {
    render(
      <EditorialColorBlock
        variant="aubergine"
        label="Grundgedanke"
        title="Test"
      >
        <p>Body</p>
      </EditorialColorBlock>
    );

    const eyebrow = screen.getByText("Grundgedanke");
    expect(eyebrow.style.color).toBe("rgb(214, 200, 190)");
  });

  it("applies aubergine background via inline style", () => {
    const { container } = render(
      <EditorialColorBlock variant="aubergine" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section).toBeTruthy();
    expect(section?.getAttribute("style")).toContain("rgb(91, 58, 78)");
    expect(section?.getAttribute("data-variant")).toBe("aubergine");
  });

  it("applies sage-wash background (#eef0ea)", () => {
    const { container } = render(
      <EditorialColorBlock variant="sage-wash" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section?.getAttribute("style")).toContain("rgb(238, 240, 234)");
  });

  it("applies cream-deep background (#f3eee3)", () => {
    const { container } = render(
      <EditorialColorBlock variant="cream-deep" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section?.getAttribute("style")).toContain("rgb(243, 238, 227)");
  });

  it("attaches the variant-specific content class for descendant CSS overrides", () => {
    const { container } = render(
      <EditorialColorBlock variant="aubergine" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const content = container.querySelector(
      ".editorial-color-block-content--aubergine"
    );
    expect(content).toBeTruthy();
  });

  it("renders without label and title (children-only)", () => {
    const { container } = render(
      <EditorialColorBlock variant="aubergine">
        <p>Just children</p>
      </EditorialColorBlock>
    );

    expect(container.querySelector("h2")).toBeNull();
    expect(screen.getByText("Just children")).toBeTruthy();
  });
});
