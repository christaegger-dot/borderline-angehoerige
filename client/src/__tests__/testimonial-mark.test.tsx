import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestimonialMark } from "@/components/editorial/TestimonialMark";

describe("TestimonialMark", () => {
  it("renders an SVG marker with sage atmosphere and aubergine hand-lines", () => {
    const { container } = render(<TestimonialMark />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    // 1 sage atmosphere circle + 6 aubergine hand-line paths
    expect(svg?.querySelectorAll("circle")).toHaveLength(1);
    expect(svg?.querySelectorAll("path")).toHaveLength(6);
  });

  it("uses tokens for brand colors (not hex)", () => {
    const { container } = render(<TestimonialMark />);
    const html = container.querySelector("svg")?.outerHTML ?? "";
    expect(html).toContain("var(--accent-label)");
    expect(html).toContain("var(--accent-primary)");
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it("forwards className to the SVG element", () => {
    const { container } = render(<TestimonialMark className="mx-auto mb-8" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("class")).toContain("mx-auto");
    expect(svg?.getAttribute("class")).toContain("mb-8");
  });
});
