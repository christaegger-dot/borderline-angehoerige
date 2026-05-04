import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { HeaderNav } from "@/components/layout/HeaderNav";

function renderHeader() {
  return render(
    <Router>
      <HeaderNav onSearchOpen={() => {}} />
    </Router>
  );
}

describe("SiteHeader (HeaderNav)", () => {
  it("renders the Aubergine Brand-Mark with primary variant", () => {
    const { container } = renderHeader();
    // BrandMark variant="primary" rendert einen runden Container mit
    // Aubergine-Background-Token
    const brandMark = container.querySelector(
      '[aria-hidden="true"].rounded-full'
    );
    expect(brandMark).toBeTruthy();
    // Klassen-Marker für primary-variant: bg via accent-primary-Token
    expect(brandMark?.className).toContain("accent-primary");
    // Compass-Icon darin
    expect(brandMark?.querySelector("svg")).toBeTruthy();
  });

  it("renders the vertical hairline separator between brand and nav", () => {
    const { container } = renderHeader();
    // Trenner: 1 px × 32 px (h-8 w-px), rule-color-strong, nur xl+
    const separator = container.querySelector(
      'span[aria-hidden="true"].h-8.w-px'
    );
    expect(separator).toBeTruthy();
    expect(separator?.getAttribute("style")).toContain(
      "var(--rule-color-strong)"
    );
  });

  it("renders nav items with fg-secondary by default and fg-primary on active", () => {
    const { container } = renderHeader();
    const nav = container.querySelector('nav[aria-label="Hauptnavigation"]');
    expect(nav).toBeTruthy();
    const links = nav?.querySelectorAll("a") ?? [];
    expect(links.length).toBeGreaterThan(0);

    // Default (nicht aktiv): fg-secondary
    // Aktiv: fg-primary mit Aubergine-Underline
    const inactiveLinks = Array.from(links).filter(
      a => !a.hasAttribute("aria-current")
    );
    const activeLinks = Array.from(links).filter(
      a => a.getAttribute("aria-current") === "page"
    );

    // Mindestens ein Inactive-Link existiert (Test rendert Root "/", die meisten Items sind nicht /)
    expect(inactiveLinks.length).toBeGreaterThan(0);
    inactiveLinks.forEach(link => {
      expect(link.className).toContain("fg-secondary");
    });

    // Optional: Active-State kann existieren (wenn die Test-Route matcht)
    activeLinks.forEach(link => {
      expect(link.className).toContain("fg-primary");
      expect(link.className).toContain("font-medium");
    });
  });

  it("renders the Soforthilfe pill with the white live-dot prefix on desktop", () => {
    const { container } = renderHeader();
    const soforthilfeLinks = Array.from(
      container.querySelectorAll('a[aria-label*="Soforthilfe"]')
    );
    // Mindestens ein Soforthilfe-Link (Desktop-Version mit Text)
    expect(soforthilfeLinks.length).toBeGreaterThan(0);

    // Desktop-Version (sm:inline-flex) hat einen weissen Live-Punkt vor dem Text
    const desktopSoforthilfe = soforthilfeLinks.find(link =>
      link.querySelector("span.bg-white\\/85")
    );
    expect(desktopSoforthilfe).toBeTruthy();
  });

  it("renders the Brand wordmark with shortened text Borderline · Angehörige", () => {
    renderHeader();
    expect(screen.getByText(/Borderline · Angehörige/)).toBeInTheDocument();
  });

  it("renders the Brand-Sub Fachstelle · PUK Zürich in sage caps", () => {
    renderHeader();
    const brandSub = screen.getByText(/Fachstelle · PUK Zürich/);
    expect(brandSub).toBeInTheDocument();
    // Sage-Color via accent-label-Token im inline style
    expect(brandSub.getAttribute("style")).toContain("var(--accent-label)");
  });
});
