import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { fachstellenProfil } from "@/data/kontakte";
import { searchableContent } from "@/content/searchIndex";
import Fachstelle from "@/pages/Fachstelle";
import Selbsthilfegruppen from "@/pages/Selbsthilfegruppen";

afterEach(cleanup);

describe("gemeinsames Fachstellenprofil", () => {
  for (const [name, Page] of [
    ["Fachstelle", Fachstelle],
    ["Beratung", Selbsthilfegruppen],
  ] as const) {
    it(`${name} zeigt zentrale Kontaktangaben und den offenen aktuellen Abgleich`, () => {
      render(<Page />);

      expect(screen.getByText(fachstellenProfil.pruefHinweis)).toBeVisible();
      expect(screen.getByText(fachstellenProfil.adresse.adresse)).toBeVisible();
      expect(
        screen.getByRole("link", { name: fachstellenProfil.telefon.nummer })
      ).toHaveAttribute("href", `tel:${fachstellenProfil.telefon.tel}`);
      expect(
        screen.getByRole("link", { name: fachstellenProfil.email.adresse })
      ).toHaveAttribute("href", `mailto:${fachstellenProfil.email.adresse}`);
      expect(
        screen.queryByText(/Kostenlose, vertrauliche Beratung/)
      ).toBeNull();
      expect(
        screen.queryByText(/Kostenlos – Daten werden nicht an die Krankenkasse/)
      ).toBeNull();
    });
  }

  it("verwendet dieselbe qualifizierte Auskunft in beiden Suchtreffern", () => {
    const entries = searchableContent.filter(
      entry => entry.title === fachstellenProfil.name
    );
    expect(entries).toHaveLength(2);
    expect(entries.map(entry => entry.href).sort()).toEqual([
      "/beratung",
      "/fachstelle",
    ]);
    for (const entry of entries) {
      expect(entry.description).toBe(fachstellenProfil.suchBeschreibung);
      expect(entry.description).toContain("offen");
      expect(entry.description).not.toMatch(/kostenlos|kostenfrei/);
    }
  });
});
