import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialBody } from "@/components/editorial";

describe("EditorialBody", () => {
  it("renders as <p> by default with text-md and fg-secondary", () => {
    render(<EditorialBody>Body</EditorialBody>);
    const el = screen.getByText("Body");
    expect(el.tagName).toBe("P");
    expect(el.style.fontSize).toBe("var(--text-md)");
    expect(el.style.lineHeight).toBe("var(--lh-relaxed)");
    expect(el.style.color).toBe("var(--fg-secondary)");
  });

  it("renders as <dd> when as='dd'", () => {
    render(
      <dl>
        <dt>Term</dt>
        <EditorialBody as="dd">Definition</EditorialBody>
      </dl>
    );
    const el = screen.getByText("Definition");
    expect(el.tagName).toBe("DD");
  });

  it("uses fg-primary in tone='strong'", () => {
    render(<EditorialBody tone="strong">Citation</EditorialBody>);
    const el = screen.getByText("Citation");
    expect(el.style.color).toBe("var(--fg-primary)");
  });

  it("appends className", () => {
    render(<EditorialBody className="mt-4">Body</EditorialBody>);
    const el = screen.getByText("Body");
    expect(el).toHaveClass("mt-4");
  });
});
