import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialColorBlock } from "@/components/editorial/EditorialColorBlock";

/**
 * EditorialColorBlock ist ab Phase 1.5 nur noch für sage-wash und cream-deep
 * relevant. Die ehemalige aubergine-Variante wurde nach EditorialSection
 * migriert (PR #394). Tests für Aubergine-spezifisches H2/Eyebrow-Color-
 * Verhalten leben jetzt in editorial-section.test.tsx.
 */
describe("EditorialColorBlock", () => {
  it("applies sage-wash background token", () => {
    const { container } = render(
      <EditorialColorBlock variant="sage-wash" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section?.getAttribute("style")).toContain("var(--bg-sage-wash)");
    expect(section?.getAttribute("data-variant")).toBe("sage-wash");
  });

  it("applies cream-deep background token", () => {
    const { container } = render(
      <EditorialColorBlock variant="cream-deep" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section?.getAttribute("style")).toContain("var(--bg-cream-deep)");
    expect(section?.getAttribute("data-variant")).toBe("cream-deep");
  });

  it("exposes density rhythm tokens", () => {
    const { container } = render(
      <EditorialColorBlock variant="sage-wash" density="compact">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const section = container.querySelector("section.editorial-color-block");
    expect(section?.getAttribute("data-density")).toBe("compact");
    expect(section?.getAttribute("style")).toContain(
      "--section-y-mobile: var(--section-y-compact-mobile)"
    );
  });

  it("attaches the variant-specific content class for descendant CSS overrides", () => {
    const { container } = render(
      <EditorialColorBlock variant="sage-wash" title="Test">
        <p>Body</p>
      </EditorialColorBlock>
    );

    const content = container.querySelector(
      ".editorial-color-block-content--sage-wash"
    );
    expect(content).toBeTruthy();
  });

  it("renders without label and title (children-only)", () => {
    const { container } = render(
      <EditorialColorBlock variant="sage-wash">
        <p>Just children</p>
      </EditorialColorBlock>
    );

    expect(container.querySelector("h2")).toBeNull();
    expect(screen.getByText("Just children")).toBeTruthy();
  });

  it("renders label as Sage-Caps eyebrow", () => {
    render(
      <EditorialColorBlock variant="sage-wash" label="Test Label">
        <p>Body</p>
      </EditorialColorBlock>
    );
    const label = screen.getByText("Test Label");
    expect(label.style.color).toBe("rgb(79, 107, 94)");
  });
});
