import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import AppLink from "@/components/AppLink";
import ContentSection from "@/components/ContentSection";

const MOTION_PROPS = new Set([
  "animate",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "onAnimationComplete",
  "onUpdate",
  "transition",
  "variants",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function stripMotionProps(props: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key))
  );
}

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: HTMLAttributes<HTMLElement> & {
          children?: ReactNode;
        }) => {
          const Tag = tag as ElementType;
          return (
            <Tag {...stripMotionProps(props as Record<string, unknown>)}>
              {children}
            </Tag>
          );
        },
    }
  );
  const passthrough = ({ children }: { children?: ReactNode }) => (
    <>{children}</>
  );
  return {
    motion,
    m: motion,
    AnimatePresence: passthrough,
    LazyMotion: passthrough,
    MotionConfig: passthrough,
    domAnimation: {},
  };
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.stubGlobal("scrollTo", vi.fn());
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    })
  );
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
  vi.clearAllMocks();
});

function renderWithRoute(ui: React.ReactElement, route: string) {
  window.history.replaceState({}, "", route);
  return render(<Router>{ui}</Router>);
}

const HASH_CASES = [
  // /unterstuetzen/therapie#therapieangebote: nach Phase-3-Migration kein
  // collapsible ContentSection mehr — Therapieangebote-Block ist eine static
  // EditorialSection mit H2#therapieangebote (Anchor-Target erhalten,
  // Redirect /therapieangebote weiter funktional). Hash-Scroll-Verhalten
  // wird durch Browser nativ via fragment-anchor gehandhabt, nicht durch
  // Custom-Event-Toggle.
  {
    route: "/verstehen/diagnostik#anbieter",
    loadPage: () => import("@/pages/Diagnostik"),
    buttonName: /Abschnitt Wo eine Abklärung im Kanton Zürich möglich ist/i,
    contentText: /Psychiatrische Universitätsklinik Zürich \(PUK\)/i,
  },
] as const;

describe("hash-linked content sections", () => {
  it("links immediate danger from the everyday section directly to static emergency help", async () => {
    const { default: Page } = await import("@/pages/UnterstuetzenAlltag");
    renderWithRoute(<Page />, "/unterstuetzen/alltag");
    const section = document.getElementById("impulsivitaet")!;
    const help = within(section).getByRole("link", {
      name: "Akute Hilfe und Notfallkontakte",
    });
    expect(help).toHaveAttribute("href", "/soforthilfe");
    expect(
      within(section).queryByRole("link", { name: "Krisenbegleitung" })
    ).not.toBeInTheDocument();
  });
  it("opens a collapsed same-page canonical explanation through AppLink", async () => {
    renderWithRoute(
      <>
        <ContentSection id="erklaerung" title="Kanonische Erklärung">
          Vertiefender Inhalt
        </ContentSection>
        <AppLink href="/verstehen#erklaerung">Grundlage dieser Seite</AppLink>
      </>,
      "/verstehen"
    );
    const toggle = screen.getByRole("button", {
      name: /Abschnitt Kanonische Erklärung/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(
      screen.getByRole("link", { name: "Grundlage dieser Seite" })
    );
    await waitFor(() =>
      expect(toggle).toHaveAttribute("aria-expanded", "true")
    );
    expect(window.location.hash).toBe("#erklaerung");
    expect(screen.getByText("Vertiefender Inhalt")).toBeVisible();
    expect(window.scrollTo).toHaveBeenCalled();
  });
  it.each(HASH_CASES)(
    "opens and scrolls the requested section on first render for $route",
    async ({ route, loadPage, buttonName, contentText }) => {
      const { default: Page } = await loadPage();

      renderWithRoute(<Page />, route);

      const toggle = screen.getByRole("button", { name: buttonName });

      await waitFor(() => {
        expect(toggle).toHaveAttribute("aria-expanded", "true");
      });

      expect(screen.getByText(contentText)).toBeInTheDocument();
      expect(window.scrollTo).toHaveBeenCalled();
    }
  );

  it("scrollt bei Hash-Navigation zum jetzt offenen Abschnitt /verstehen/begleiterkrankungen#depression", async () => {
    const { default: Page } = await import("@/pages/Begleiterkrankungen");
    renderWithRoute(<Page />, "/verstehen/begleiterkrankungen#depression");

    // «Depressive Erkrankungen als mögliche Begleiterkrankung» ist offene
    // Prosa (collapsible={false}):
    // kein Toggle-Button, Inhalt direkt sichtbar, Deep-Link scrollt trotzdem.
    expect(
      screen.queryByRole("button", {
        name: /Abschnitt Depressive Erkrankungen als mögliche Begleiterkrankung/i,
      })
    ).toBeNull();
    expect(
      screen.getByText(/Depressive Erkrankungen werden in klinischen Studien/i)
    ).toBeInTheDocument();
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
  });

  it("scrollt bei Hash-Navigation zum jetzt offenen Abschnitt /grenzen#gewalt", async () => {
    const { default: Page } = await import("@/pages/Grenzen");
    renderWithRoute(<Page />, "/grenzen#gewalt");

    // «Wenn körperliche Gewalt oder Bedrohung vorkommt» ist offene Prosa:
    // kein Toggle-Button, Inhalt direkt sichtbar, Deep-Link scrollt trotzdem.
    expect(
      screen.queryByRole("button", {
        name: /Abschnitt Wenn körperliche Gewalt oder Bedrohung vorkommt/i,
      })
    ).toBeNull();
    expect(
      screen.getByText(/Körperliche Gewalt ist kein Beziehungsproblem/i)
    ).toBeInTheDocument();
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
  });

  it("opens a collapsed section from the new quick links", async () => {
    const { default: Page } = await import("@/pages/Grenzen");
    renderWithRoute(<Page />, "/grenzen");
    const nav = screen.getByRole("navigation", {
      name: "Direkt zur Hilfe auf dieser Seite",
    });
    const toggle = screen.getByRole("button", {
      name: /Abschnitt Was brauche ich für meine Grenzen/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(
      within(nav).getByRole("link", { name: "Eigene Grenzen klären" })
    );
    await waitFor(() =>
      expect(toggle).toHaveAttribute("aria-expanded", "true")
    );
    for (const link of within(nav).getAllByRole("link")) {
      expect(link.textContent).not.toMatch(/handleAnchorClick|[{}]/);
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1))
      ).not.toBeNull();
    }
  });

  it("does not crash when the URL hash contains malformed encoding", async () => {
    const { default: Page } = await import("@/pages/Grenzen");
    renderWithRoute(<Page />, "/grenzen#%E0%A4%A");

    expect(
      screen.getByRole("button", {
        name: /Abschnitt Was brauche ich für meine Grenzen\?/i,
      })
    ).toBeInTheDocument();
  });
});
