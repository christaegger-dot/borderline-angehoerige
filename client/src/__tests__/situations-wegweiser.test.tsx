import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SituationsWegweiser from "@/components/interactive/SituationsWegweiser";

describe("Situations-Wegweiser", () => {
  it("shows the same professional help path immediately, without a risk assessment", () => {
    render(<SituationsWegweiser />);

    const section = screen.getByRole("region", {
      name: "Professionelle Hilfe bei akuter Gefahr oder Unsicherheit",
    });
    expect(section).toHaveTextContent(
      "Die Fachstelle Angehörigenarbeit bietet Beratung und Orientierung, aber keine Krisenintervention."
    );
    expect(section).toHaveTextContent(
      "Bei akuter Gefahr oder wenn Sie die Dringlichkeit nicht sicher einschätzen können, wenden Sie sich an den zuständigen Notfalldienst."
    );

    const helpLink = within(section).getByRole("link", {
      name: "«Akute Hilfe und Notfallkontakte»",
    });
    expect(helpLink).toHaveAttribute("href", "/soforthilfe");
  });

  it("does not ask crisis questions, suggest urgency categories, or repeat contact numbers", () => {
    const { container } = render(<SituationsWegweiser />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Besteht unmittelbare Gefahr|Selbstverletzung/)
    ).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /\b(?:112|117|143|144|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/
    );
  });
});
