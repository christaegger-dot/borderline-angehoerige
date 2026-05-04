import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { VisualOrientationGrid } from "@/components/visualizations/VisualOrientationGrid";
import { homeFeaturedInfografiken } from "@/content/homeFeaturedInfografiken";

function renderGrid() {
  return render(
    <Router>
      <VisualOrientationGrid />
    </Router>
  );
}

describe("VisualOrientationGrid", () => {
  it("renders exactly 8 tiles in narrative order", () => {
    renderGrid();
    const tiles = screen.getAllByRole("listitem");
    expect(tiles).toHaveLength(8);

    const expectedOrder = [
      "Der Eisberg",
      "Alarm-Modus vs. Denk-Modus",
      "Das Ampel-System",
      "Die Validierungs-Treppe",
      "Die 4 Arten von Grenzen",
      "Die Sauerstoffmaske",
      "Das Bewertungs-Pendel",
      "Der Deeskalations-Pfad",
    ];

    expectedOrder.forEach((title, idx) => {
      expect(
        within(tiles[idx]).getByRole("heading", { level: 3 })
      ).toHaveTextContent(title);
    });
  });

  it("uses thumbnail URLs (not full-resolution PNGs)", () => {
    homeFeaturedInfografiken.forEach(tile => {
      // Thumbnails leben unter /infografiken/extras/thumbnails/, full PNGs unter /infografiken/
      expect(tile.thumbnailUrl).toMatch(
        /^\/infografiken\/extras\/thumbnails\//
      );
      expect(tile.thumbnailUrl).toMatch(/\.png$/);
    });
  });

  it("links each tile to an existing content page (not an infografik detail page)", () => {
    // Erlaubte Targets: bestehende Inhaltsseiten — keine /infografiken/-Detail-URLs
    const allowedHrefs = new Set([
      "/verstehen",
      "/unterstuetzen/krise",
      "/kommunizieren",
      "/grenzen",
      "/selbstfuersorge",
    ]);

    homeFeaturedInfografiken.forEach(tile => {
      expect(tile.href).not.toMatch(/^\/infografiken\//);
      expect(allowedHrefs.has(tile.href)).toBe(true);
    });
  });

  it("contains no duplicate slugs", () => {
    const ids = homeFeaturedInfografiken.map(t => t.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("renders thumbnails with width/height for layout-shift prevention", () => {
    renderGrid();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(8);
    images.forEach(img => {
      expect(img.getAttribute("width")).toBe("600");
      expect(img.getAttribute("height")).toBe("848");
      expect(img.getAttribute("loading")).toBe("lazy");
    });
  });

  it("renders the section eyebrow + title", () => {
    renderGrid();
    expect(screen.getByText("Visuelle Orientierung")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Acht Konzepte, in Lese-Reihenfolge/,
      })
    ).toBeInTheDocument();
  });
});
