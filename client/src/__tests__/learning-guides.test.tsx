import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LearningGuide, {
  type LearningGuideKind,
} from "@/components/interactive/LearningGuide";
import guides from "@/content/learningGuides.json";

describe("interactive learning guides", () => {
  for (const kind of Object.keys(guides) as LearningGuideKind[]) {
    it(`${kind}: selection updates the explanation and retains help and reading alternatives`, () => {
      const { container } = render(<LearningGuide kind={kind} id="guide" />);
      const region = container.querySelector(
        '[aria-live="polite"]'
      ) as HTMLElement;
      const buttons = within(
        screen.getByRole("group", {
          name:
            kind === "dear" ? "DEAR-Schritt auswählen" : "Bereich auswählen",
        })
      ).getAllByRole("button");
      const last = buttons[buttons.length - 1];
      fireEvent.click(last);
      expect(last).toHaveAttribute("aria-pressed", "true");
      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      const expected = guides[kind].sections[0].cards!.at(-1)!;
      expect(within(region).getByText(expected.text)).toBeVisible();
      expect(within(region).getByText(expected.example)).toBeVisible();
      expect(
        screen.getByRole("link", { name: "Druckfassung als PDF" })
      ).toHaveAttribute(
        "href",
        expect.stringContaining("/api/material-download/")
      );
      expect(
        screen.getByRole("link", { name: "Vollständige Textfassung" })
      ).toHaveAttribute("href", `/materialien/text/${kind}`);
      expect(
        screen.getByRole("link", { name: "Eigene Beratung" })
      ).toHaveAttribute("href", "/fachstelle");
    });
  }
});
