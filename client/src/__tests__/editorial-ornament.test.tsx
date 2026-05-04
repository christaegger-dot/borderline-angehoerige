import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialOrnament } from "@/components/editorial/EditorialOrnament";

describe("EditorialOrnament", () => {
  it("renders dots-line variant with two circles and an arc", () => {
    const { container } = render(<EditorialOrnament variant="dots-line" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.querySelectorAll("circle")).toHaveLength(2);
    expect(svg?.querySelectorAll("path")).toHaveLength(1);
  });

  it("renders wave variant with a single curved path", () => {
    const { container } = render(<EditorialOrnament variant="wave" />);
    const svg = container.querySelector("svg");
    expect(svg?.querySelectorAll("path")).toHaveLength(1);
    expect(svg?.querySelectorAll("circle")).toHaveLength(0);
  });

  it("renders small-arc variant with a single short arc", () => {
    const { container } = render(<EditorialOrnament variant="small-arc" />);
    const svg = container.querySelector("svg");
    expect(svg?.querySelectorAll("path")).toHaveLength(1);
    expect(svg?.getAttribute("width")).toBe("40");
  });

  it("uses sage token for stroke/fill (not hex)", () => {
    const { container } = render(<EditorialOrnament variant="dots-line" />);
    const svg = container.querySelector("svg");
    const html = svg?.outerHTML ?? "";
    // Brand-Farben kommen aus Token
    expect(html).toContain("var(--accent-label)");
    // Defensive: keine hex-Codes in den fill/stroke
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it("marks itself as decorative (aria-hidden)", () => {
    const { container } = render(<EditorialOrnament variant="wave" />);
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
      "true"
    );
  });
});
