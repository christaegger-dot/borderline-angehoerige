import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Lede } from "@/components/editorial";

describe("Lede", () => {
  it("renders default size with var(--text-lg)", () => {
    render(<Lede>Body lead</Lede>);
    const el = screen.getByText("Body lead");
    expect(el.tagName).toBe("P");
    expect(el.style.fontSize).toBe("var(--text-lg)");
    expect(el.style.lineHeight).toBe("var(--lh-snug)");
    expect(el.style.color).toBe("var(--fg-secondary)");
  });

  it("renders hero size with 1.375rem and max-w-[30em]", () => {
    render(<Lede size="hero">Hero lead</Lede>);
    const el = screen.getByText("Hero lead");
    expect(el.style.fontSize).toBe("1.375rem");
    expect(el).toHaveClass("max-w-[30em]");
  });

  it("appends className alongside size class", () => {
    render(
      <Lede size="hero" className="mt-6">
        Lead with mt
      </Lede>
    );
    const el = screen.getByText("Lead with mt");
    expect(el).toHaveClass("max-w-[30em]", "mt-6");
  });

  it("omits class attribute when no className and default size", () => {
    render(<Lede>Plain</Lede>);
    const el = screen.getByText("Plain");
    expect(el.hasAttribute("class")).toBe(false);
  });
});
