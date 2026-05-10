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
});
