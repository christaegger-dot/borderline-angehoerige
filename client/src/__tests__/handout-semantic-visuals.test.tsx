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
      screen.getByRole("heading", {
        name: /Vereinfachte Übung: vier mögliche Schritte/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/nicht bleiben, schweigen oder Gewalt tolerieren/i);
    expect(
      screen.getByText(/Radikale Akzeptanz ist kein Rückzug aus dem Leben/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Trauer, Wut oder Angst dürfen trotzdem da sein/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Die andere Person möchte heute keine Hilfe annehmen/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Sie machen nichts falsch/i)).not.toHaveLength(
      0
    );
    expect(screen.getAllByRole("list")).toHaveLength(4);
    expect(screen.getByText(/Dieses Blatt ersetzt/i)).toBeInTheDocument();
    expect(screen.getByText(/in Anlehnung an Linehan/i)).toBeInTheDocument();
  });

  it("keeps the three conversation steps and the safety stop visible", () => {
    renderVisualization("gespraeche-kippen");

    for (const title of ["Beruhigen", "Verbinden", "Begrenzen oder beenden"]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/Bei Bedrohung oder Gewalt.*117/i);
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/unmittelbarer Selbstgefährdung.*144/i);
    expect(screen.getAllByText(/keine Pflicht/i)).not.toHaveLength(0);
    expect(
      screen.getAllByText(/keine Formulierung garantiert/i)
    ).not.toHaveLength(0);
    expect(screen.getAllByRole("list")).toHaveLength(3);
    expect(screen.getByText(/Halten Sie Sätze so kurz/i)).toBeInTheDocument();
  });

  it("presents the dialogue as an adaptable example, not a script", () => {
    renderVisualization("beispiel-dialog");

    expect(screen.getByText(/keine Rückkehrpflicht/i)).toBeInTheDocument();
    expect(screen.getByText(/Verstehe ich dich richtig/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/keine Formulierung garantiert/i)
    ).not.toHaveLength(0);
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/Bei Bedrohung oder Gewalt.*117/i);
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/unmittelbarer Selbstgefährdung.*144/i);
    expect(
      screen.getByText(/Textbeschreibung der Darstellung/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(
      screen.getByText(/Üben Sie besonders einen klaren Grenz- und Pausensatz/i)
    ).toBeInTheDocument();
  });
});
