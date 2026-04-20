import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "wouter";
import { describe, expect, it } from "vitest";
import MaterialienLibrarySection from "@/sections/MaterialienLibrarySection";

describe("MaterialienLibrarySection", () => {
  it("shows core materials and filters secondary materials by category", () => {
    render(
      <Router>
        <MaterialienLibrarySection />
      </Router>
    );

    expect(screen.getByText("Empfohlene Kernmaterialien")).toBeInTheDocument();
    expect(
      screen.getByText("Notfallkarte Zürich – Psychische Krise")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Genesung\s*\(1\)/ }));

    expect(
      screen.getByText("Genesung in Zahlen – Was die Forschung zeigt")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Schuld, Verantwortung und was dazwischen liegt")
    ).not.toBeInTheDocument();
  });
});
