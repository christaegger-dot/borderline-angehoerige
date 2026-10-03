import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HandoutSemanticVisual from "@/components/HandoutSemanticVisual";
import { handoutTextVersions as kommunizierenTextVersions } from "@/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as selbstfuersorgeTextVersions } from "@/content/handoutTextVersionContent/selbstfuersorge.content";
import { resolveHandoutVisualization } from "@/content/handoutVisualizations";

const versions = [...selbstfuersorgeTextVersions, ...kommunizierenTextVersions];

function renderVisualization(id: string) {
  const handout = versions.find(item => item.id === id);
  const visualization = resolveHandoutVisualization(handout);
  if (!visualization) {
    throw new Error(`Missing semantic visualization: ${id}`);
  }
  render(<HandoutSemanticVisual visualization={visualization} />);
  return visualization;
}

describe("accessible P1 handout visualizations", () => {
  it("distinguishes acceptance from tolerating danger", () => {
    renderVisualization("radikale-akzeptanz");

    expect(
      screen.getByRole("figure", { name: "Radikale Akzeptanz" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Vier Schritte zurück/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/nicht bleiben, schweigen oder Gewalt tolerieren/i);
    expect(screen.getAllByRole("list")).toHaveLength(3);
  });

  it("keeps the three conversation steps and the safety stop visible", () => {
    renderVisualization("gespraeche-kippen");

    for (const title of ["Beruhigen", "Verbinden", "Begrenzen + Plan"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/Abstand schaffen und Hilfe holen/i);
    expect(screen.getAllByRole("list")).toHaveLength(2);
  });

  it("presents the dialogue as an adaptable example, not a script", () => {
    renderVisualization("beispiel-dialog");

    expect(screen.getByText(/keine Zauberformel/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Passen Sie die Sätze an Ihre Sprache und Situation an/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/Dialog abbrechen und Hilfe holen/i);
    expect(
      screen.getByText(/Textbeschreibung der Darstellung/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("list")).toHaveLength(1);
  });
});
