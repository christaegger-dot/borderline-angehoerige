import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import AppLink, { isHardNavigationHref } from "@/components/AppLink";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.replaceState(null, "", "/");
});

describe("AppLink", () => {
  it("classifies static crisis routes and assets as hard navigation", () => {
    expect(isHardNavigationHref("/soforthilfe")).toBe(true);
    expect(isHardNavigationHref("/notfall")).toBe(true);
    expect(isHardNavigationHref("/notfallkarte")).toBe(true);
    expect(isHardNavigationHref("/notfallplan-krise-v03.pdf")).toBe(true);
    expect(isHardNavigationHref("/verstehen")).toBe(false);
  });

  it("keeps browser navigation for direct crisis pages", () => {
    const pushStateSpy = vi.spyOn(window.history, "pushState");

    render(
      <Router>
        <AppLink href="/soforthilfe">Soforthilfe</AppLink>
      </Router>
    );

    const link = screen.getByRole("link", { name: /soforthilfe/i });
    let defaultPrevented = true;

    link.addEventListener("click", event => {
      defaultPrevented = event.defaultPrevented;
      event.preventDefault();
    });

    fireEvent.click(link);

    expect(defaultPrevented).toBe(false);
    expect(pushStateSpy).not.toHaveBeenCalled();
  });

  it("uses SPA navigation for regular internal routes", () => {
    const pushStateSpy = vi.spyOn(window.history, "pushState");

    render(
      <Router>
        <AppLink href="/verstehen">Verstehen</AppLink>
      </Router>
    );

    const link = screen.getByRole("link", { name: /verstehen/i });
    fireEvent.click(link);

    expect(pushStateSpy).toHaveBeenCalledWith(null, "", "/verstehen");
    expect(window.location.pathname).toBe("/verstehen");
  });
});
