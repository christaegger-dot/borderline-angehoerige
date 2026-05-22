import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DisplayHeading } from "@/components/editorial";

describe("DisplayHeading", () => {
  it("renders level=1 as h1 with hero font-size", () => {
    render(<DisplayHeading level={1}>Hello</DisplayHeading>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("H1");
    expect(el.style.fontSize).toBe("var(--text-hero)");
    expect(el.style.lineHeight).toBe("var(--lh-tight)");
  });

  it("renders level=2 as h2 with text-2xl font-size", () => {
    render(<DisplayHeading level={2}>Section</DisplayHeading>);
    const el = screen.getByText("Section");
    expect(el.tagName).toBe("H2");
    expect(el.style.fontSize).toBe("var(--text-2xl)");
    expect(el.style.lineHeight).toBe("var(--lh-snug)");
  });

  it("uses fg-primary color in default tone", () => {
    render(<DisplayHeading level={2}>Section</DisplayHeading>);
    const el = screen.getByText("Section");
    expect(el.style.color).toBe("var(--fg-primary)");
  });

  it("uses cream-light color in light tone (for aubergine background)", () => {
    render(
      <DisplayHeading level={2} tone="light">
        On Aubergine
      </DisplayHeading>
    );
    const el = screen.getByText("On Aubergine");
    const color = el.style.color;
    expect(color === "#f5ece6" || color === "rgb(245, 236, 230)").toBe(true);
  });

  it("appends className while keeping font-display", () => {
    render(
      <DisplayHeading level={1} className="mt-8">
        Hero
      </DisplayHeading>
    );
    const el = screen.getByText("Hero");
    expect(el).toHaveClass("font-display", "mt-8");
  });

  it("renders size=page with mt-8 + text-3xl/4xl classes and no inline fontSize", () => {
    render(
      <DisplayHeading level={1} size="page">
        Page
      </DisplayHeading>
    );
    const el = screen.getByText("Page");
    expect(el.tagName).toBe("H1");
    expect(el).toHaveClass(
      "mt-8",
      "text-[var(--text-3xl)]",
      "md:text-[var(--text-4xl)]"
    );
    expect(el.style.fontSize).toBe("");
    expect(el.style.marginBottom).toBe("");
  });

  it("forwards id prop for deep-link anchors", () => {
    render(
      <DisplayHeading level={2} id="therapieangebote">
        Therapieangebote
      </DisplayHeading>
    );
    const el = screen.getByText("Therapieangebote");
    expect(el.id).toBe("therapieangebote");
  });

  it("renders spacing=compact with marginBottom 0 (for space-y containers)", () => {
    render(
      <DisplayHeading level={2} spacing="compact">
        Kategorie
      </DisplayHeading>
    );
    const el = screen.getByText("Kategorie");
    expect(el.style.marginBottom).toBe("0px");
  });
});
