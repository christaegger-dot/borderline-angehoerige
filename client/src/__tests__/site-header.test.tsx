import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("does not add a separate brand/nav hairline separator", () => {
    const { container } = renderHeader();
    // Der Header soll als ruhige Editorial-Chrome wirken; ein eigener
    // Brand/Nav-Trenner fuehrte visuell zu einer zusaetzlichen Ebene.
    const separator = container.querySelector(
      'span[aria-hidden="true"].h-8.w-px'
    );
    expect(separator).toBeNull();
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

  it("renders the Soforthilfe link as a quiet alert outline on desktop", () => {
    const { container } = renderHeader();
    const soforthilfeLinks = Array.from(
      container.querySelectorAll('a[aria-label*="Soforthilfe"]')
    );
    // Mindestens ein Soforthilfe-Link (Desktop-Version mit Text)
    expect(soforthilfeLinks.length).toBeGreaterThan(0);

    // Desktop-Version bleibt sichtbar, aber ohne gefuellte Buttonflaeche.
    const desktopSoforthilfe = soforthilfeLinks.find(link =>
      link.className.includes("border-alert-light")
    );
    expect(desktopSoforthilfe).toBeTruthy();
    expect(desktopSoforthilfe?.className).toContain("text-alert-dark");
    expect(desktopSoforthilfe?.className).toContain("bg-transparent");
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

  it("opens the mobile menu across the full non-desktop breakpoint", () => {
    window.scrollTo = vi.fn();
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /Menü öffnen/i }));

    const mobileDialog = screen
      .getByRole("navigation", { name: /Mobile Navigation/i })
      .closest("#mobile-navigation-dialog");

    expect(mobileDialog).toBeTruthy();
    expect(mobileDialog?.className).toContain("lg:hidden");
    expect(mobileDialog?.className).not.toContain("md:hidden");
  });
});
