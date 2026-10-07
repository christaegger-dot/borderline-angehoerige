import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LearningGuide, {
  type LearningGuideKind,
} from "@/components/interactive/LearningGuide";
import guides from "@/content/learningGuides.json";
import { isHandoutVisualPublished } from "@/content/handoutGovernance";

describe("interactive learning guides", () => {
  it.each([false, true])(
    "opens all steps for printing and restores the previous open state (%s)",
    initiallyOpen => {
      const { container } = render(<LearningGuide kind="dear" id="guide" />);
      const details = container.querySelector(
        ".learning-tool__all"
      ) as HTMLDetailsElement;
      details.open = initiallyOpen;
      const choices = within(
        screen.getByRole("group", { name: "DEAR-Schritt auswählen" })
      ).getAllByRole("button");
      fireEvent.click(choices[2]);

      fireEvent(window, new Event("beforeprint"));
      fireEvent(window, new Event("beforeprint"));
      expect(details.open).toBe(true);
      for (const card of guides.dear.sections[0].cards!) {
        expect(within(details).getByText(card.title)).toBeVisible();
      }
      fireEvent(window, new Event("afterprint"));
      expect(details.open).toBe(initiallyOpen);
      expect(choices[2]).toHaveAttribute("aria-pressed", "true");
      fireEvent(window, new Event("afterprint"));
      expect(details.open).toBe(initiallyOpen);
    }
  );

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
      if (isHandoutVisualPublished(kind)) {
        expect(
          screen.getByRole("link", { name: "Druckfassung als PDF" })
        ).toHaveAttribute("href", expect.stringMatching(/^\/.*\.pdf$/));
      } else {
        expect(
          screen.queryByRole("link", { name: "Druckfassung als PDF" })
        ).not.toBeInTheDocument();
      }
      expect(
        screen.getByRole("link", { name: "Vollständige Textfassung" })
      ).toHaveAttribute("href", `/materialien/text/${kind}`);
      expect(
        screen.getByRole("link", { name: "Eigene Beratung" })
      ).toHaveAttribute("href", "/fachstelle");
    });
  }
});
