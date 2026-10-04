import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KommunikationsUebung from "@/components/interactive/KommunikationsUebung";

describe("Kommunikationsübung: Validierung nach einem Arztbesuch", () => {
  it("ordnet die eigene Erfahrung als mögliche Verbindung oder Fokusverschiebung ein", async () => {
    render(<KommunikationsUebung />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Ach, das kenne ich.*Bei meinem letzten Arztbesuch/i,
      })
    );

    expect(
      await screen.findByText(/Eine eigene Erfahrung kann verbinden/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Die Formulierung ist nicht automatisch falsch/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/fühlt sich dadurch erneut nicht gehört/i)
    ).not.toBeInTheDocument();
  });
});
