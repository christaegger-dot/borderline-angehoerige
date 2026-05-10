import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EyebrowLabel } from "@/components/editorial";

describe("EyebrowLabel", () => {
  it("renders default tone with accent-label color and bottom margin", () => {
    render(<EyebrowLabel>Anerkennung</EyebrowLabel>);
    const label = screen.getByText("Anerkennung");
    expect(label.tagName).toBe("P");
    expect(label).toHaveClass("text-xs", "uppercase");
    expect(label.style.color).toBe("var(--accent-label)");
    expect(label.style.marginBottom).toBe("var(--space-4)");
    expect(label.style.fontWeight).toBe("500");
  });

  it("renders light tone for aubergine backgrounds", () => {
    render(<EyebrowLabel tone="light">Grundgedanke</EyebrowLabel>);
    const label = screen.getByText("Grundgedanke");
    // hex equivalent of #d6c8be — browser may normalize to rgb()
    const color = label.style.color;
    expect(color === "#d6c8be" || color === "rgb(214, 200, 190)").toBe(true);
  });

  it("omits marginBottom when spacing is compact", () => {
    render(
      <EyebrowLabel spacing="compact">Aus der Angehörigenarbeit</EyebrowLabel>
    );
    const label = screen.getByText("Aus der Angehörigenarbeit");
    expect(label.style.marginBottom).toBe("");
  });

  it("appends additional className while keeping base classes", () => {
    render(
      <EyebrowLabel className="mt-8" spacing="compact">
        Stimme
      </EyebrowLabel>
    );
    const label = screen.getByText("Stimme");
    expect(label).toHaveClass("text-xs", "uppercase", "mt-8");
  });
});
