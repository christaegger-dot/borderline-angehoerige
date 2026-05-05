import { cleanup, render, screen, waitFor } from "@testing-library/react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";

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

vi.mock("framer-motion", () => ({
  motion: new Proxy(
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
  ),
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

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
    route: "/diagnostik#anbieter",
    loadPage: () => import("@/pages/Diagnostik"),
    buttonName:
      /Abschnitt Wo eine Diagnose im Kanton Zürich gestellt werden kann/i,
    contentText: /Psychiatrische Universitätsklinik Zürich \(PUK\)/i,
  },
  {
    route: "/begleiterkrankungen#depression",
    loadPage: () => import("@/pages/Begleiterkrankungen"),
    buttonName: /Abschnitt Depression bei Borderline/i,
    contentText: /Forschung zeigt, dass im Lebenszeitverlauf/i,
  },
  {
    route: "/grenzen#gewalt",
    loadPage: () => import("@/pages/Grenzen"),
    buttonName: /Abschnitt Wenn der Angehörige körperlich übergriffig wird/i,
    contentText: /Körperliche Gewalt ist kein Beziehungsproblem/i,
  },
] as const;

describe("hash-linked content sections", () => {
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
});
