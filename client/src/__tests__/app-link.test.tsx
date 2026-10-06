import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
    expect(isHardNavigationHref("/notfallplan-krise-v04.pdf")).toBe(true);
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

  it("uses a native fragment change for a same-page link instead of a silent Wouter pushState", async () => {
    window.history.replaceState(null, "", "/kommunizieren");
    const pushStateSpy = vi.spyOn(window.history, "pushState");
    const hashChange = vi.fn();
    window.addEventListener("hashchange", hashChange);
    render(
      <Router>
        <AppLink href="/kommunizieren#validierung">Grundlage nachlesen</AppLink>
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: "Grundlage nachlesen" }));
    expect(window.location.pathname).toBe("/kommunizieren");
    expect(window.location.hash).toBe("#validierung");
    expect(pushStateSpy).not.toHaveBeenCalled();
    await waitFor(() => expect(hashChange).toHaveBeenCalled());
    window.removeEventListener("hashchange", hashChange);
  });

  it("scrolls a repeated same-page fragment and preserves a caller's prevented click", () => {
    window.history.replaceState(null, "", "/materialien#modell-eisberg");
    const scroll = vi.fn();
    const { container } = render(
      <Router>
        <div id="modell-eisberg">Modell</div>
        <AppLink href="/materialien#modell-eisberg">Modell nachlesen</AppLink>
        <AppLink
          href="/materialien#anderes"
          onClick={event => event.preventDefault()}
        >
          Eigener Klick
        </AppLink>
      </Router>
    );
    container.querySelector("#modell-eisberg")!.scrollIntoView = scroll;
    fireEvent.click(screen.getByRole("link", { name: "Modell nachlesen" }));
    expect(scroll).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
    fireEvent.click(screen.getByRole("link", { name: "Eigener Klick" }));
    expect(window.location.hash).toBe("#modell-eisberg");
  });
});
