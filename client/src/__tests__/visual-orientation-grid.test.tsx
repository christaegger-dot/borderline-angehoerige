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

function renderPreviewGrid() {
  return render(
    <Router>
      <VisualOrientationGrid
        maxItems={4}
        title="Vier Schlüsselbilder für den Anfang."
        intro="Kurzer Orientierungstext."
      />
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
      "Das Fortschritt-Paradox",
      "Spickzettel Krisenkommunikation",
    ];

    expectedOrder.forEach((title, idx) => {
      expect(
        within(tiles[idx]).getByRole("heading", { level: 3 })
      ).toHaveTextContent(title);
    });
  });

  it("uses thumbnail URLs (not full-resolution images)", () => {
    homeFeaturedInfografiken.forEach(tile => {
      // Thumbnails leben unter /infografiken/extras/thumbnails/, full Bilder unter /infografiken/
      expect(tile.thumbnailUrl).toMatch(
        /^\/infografiken\/extras\/thumbnails\//
      );
      expect(tile.thumbnailUrl).toMatch(/\.webp$/);
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
      "/genesung",
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
    const validHeights = new Set(["803", "848", "855"]);
    images.forEach(img => {
      expect(img.getAttribute("width")).toBe("600");
      // Height kommt jetzt per-Tile aus homeFeaturedInfografiken
      // (verhindert image-aspect-ratio-Mismatch — Lighthouse-Befund Phase 1.5)
      const height = img.getAttribute("height");
      expect(height).not.toBeNull();
      expect(validHeights.has(height!)).toBe(true);
      expect(img.getAttribute("loading")).toBe("lazy");
    });
  });

  it("can render a quieter four-tile Home preview with eager thumbnails", () => {
    renderPreviewGrid();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Vier Schlüsselbilder für den Anfang.",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Kurzer Orientierungstext.")).toBeInTheDocument();
    screen.getAllByRole("img").forEach(img => {
      expect(img.getAttribute("loading")).toBe("eager");
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
