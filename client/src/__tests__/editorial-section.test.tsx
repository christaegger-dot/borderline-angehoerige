import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialSection } from "@/components/editorial/EditorialSection";

describe("EditorialSection compound", () => {
  it("renders all three slots when provided", () => {
    render(
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span>MARGIN</span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p>Body content</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>ASIDE</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    expect(screen.getByText("MARGIN")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("ASIDE")).toBeInTheDocument();
  });

  it("places each slot in its grid-area cell", () => {
    const { container } = render(
      <EditorialSection variant="cream">
        <EditorialSection.MarginNote>
          <span>m</span>
        </EditorialSection.MarginNote>
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>a</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    expect(
      container.querySelector(".editorial-section-grid__margin")
    ).toBeTruthy();
    expect(
      container.querySelector(".editorial-section-grid__body")
    ).toBeTruthy();
    expect(
      container.querySelector(".editorial-section-grid__aside")
    ).toBeTruthy();
  });

  it("omits MarginNote cell when slot not provided", () => {
    const { container } = render(
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p>only body</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    expect(
      container.querySelector(".editorial-section-grid__margin")
    ).toBeNull();
    expect(
      container.querySelector(".editorial-section-grid__body")
    ).toBeTruthy();
    expect(
      container.querySelector(".editorial-section-grid__aside")
    ).toBeNull();
  });

  it("toggles --has-aside grid modifier based on Aside presence", () => {
    const { container, rerender } = render(
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    let grid = container.querySelector(".editorial-section-grid");
    expect(grid?.className).not.toContain("editorial-section-grid--has-aside");

    rerender(
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>a</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    grid = container.querySelector(".editorial-section-grid");
    expect(grid?.className).toContain("editorial-section-grid--has-aside");
  });

  it("ignores arbitrary non-slot children (no implicit body, no crash)", () => {
    const { container } = render(
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p>real body</p>
        </EditorialSection.Body>
        <p>orphan paragraph</p>
        <span>orphan span</span>
      </EditorialSection>
    );
    expect(screen.getByText("real body")).toBeInTheDocument();
    expect(screen.queryByText("orphan paragraph")).toBeNull();
    expect(screen.queryByText("orphan span")).toBeNull();
    // Sektion und Body-Cell sind da
    expect(container.querySelector("section.editorial-section")).toBeTruthy();
    expect(
      container.querySelector(".editorial-section-grid__body")
    ).toBeTruthy();
  });

  it("applies the cream variant background", () => {
    const { container } = render(
      <EditorialSection variant="cream">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    const section = container.querySelector("section.editorial-section");
    expect(section?.getAttribute("style")).toContain("var(--bg-primary)");
    expect(section?.getAttribute("data-variant")).toBe("cream");
  });

  it("applies the aubergine variant background", () => {
    const { container } = render(
      <EditorialSection variant="aubergine">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    const section = container.querySelector("section.editorial-section");
    expect(section?.getAttribute("style")).toContain("var(--accent-primary)");
    expect(section?.getAttribute("data-variant")).toBe("aubergine");
  });

  it("applies sage-wash and cream-deep variants correctly", () => {
    const { container, rerender } = render(
      <EditorialSection variant="sage-wash">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    expect(
      container
        .querySelector("section.editorial-section")
        ?.getAttribute("style")
    ).toContain("var(--bg-sage-wash)");

    rerender(
      <EditorialSection variant="cream-deep">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
      </EditorialSection>
    );
    expect(
      container
        .querySelector("section.editorial-section")
        ?.getAttribute("style")
    ).toContain("var(--bg-cream-deep)");
  });

  it("does not apply asideBackground container by default", () => {
    const { container } = render(
      <EditorialSection variant="aubergine">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>a</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    const aside = container.querySelector(".editorial-section-grid__aside");
    expect(aside?.getAttribute("style") ?? "").not.toContain("background");
  });

  it("applies sage-wash asideBackground container on aubergine variant", () => {
    const { container } = render(
      <EditorialSection variant="aubergine" asideBackground="sage-wash">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>a</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    const aside = container.querySelector(".editorial-section-grid__aside");
    expect(aside?.getAttribute("style")).toContain("var(--bg-sage-wash)");
    expect(aside?.getAttribute("style")).toContain("padding");
  });

  it("applies cream-deep asideBackground container on cream variant", () => {
    const { container } = render(
      <EditorialSection variant="cream" asideBackground="cream-deep">
        <EditorialSection.Body>
          <p>b</p>
        </EditorialSection.Body>
        <EditorialSection.Aside>
          <span>a</span>
        </EditorialSection.Aside>
      </EditorialSection>
    );
    const aside = container.querySelector(".editorial-section-grid__aside");
    expect(aside?.getAttribute("style")).toContain("var(--bg-cream-deep)");
  });

  it("exposes slot subcomponents as static properties", () => {
    expect(EditorialSection.MarginNote).toBeDefined();
    expect(EditorialSection.Body).toBeDefined();
    expect(EditorialSection.Aside).toBeDefined();
  });
});
