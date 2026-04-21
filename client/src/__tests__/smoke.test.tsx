/**
 * Smoke Tests – Kernrouten und kritische Seiten
 *
 * Ziel: Sicherstellen dass Kernseiten rendern ohne zu crashen
 * und wichtige Inhalte vorhanden sind.
 */
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import { Router } from "wouter";

// ─── Mocks ───────────────────────────────────────────────────────────────────

// framer-motion: Animationen nicht benötigt in Tests
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
        (_t, tag: string) =>
        ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & {
          children?: React.ReactNode;
        }) => {
          const Tag = tag as React.ElementType;
          return (
            <Tag {...stripMotionProps(props as Record<string, unknown>)}>
              {children}
            </Tag>
          );
        },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useAnimation: () => ({ start: vi.fn() }),
  useInView: () => false,
  useReducedMotion: () => true,
}));

// matchMedia: jsdom hat das nicht
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
});

afterEach(cleanup);

function withRouter(ui: React.ReactElement) {
  return render(<Router>{ui}</Router>);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Smoke Tests – Kritische Seiten", () => {
  it("Home: rendert ohne Fehler", async () => {
    const { default: Home } = await import("@/pages/Home");
    const { container } = withRouter(<Home />);
    expect(container.firstChild).toBeTruthy();
  });

  it("Soforthilfe: rendert und enthält Notfallnummer 144", async () => {
    const { default: Soforthilfe } = await import("@/pages/Soforthilfe");
    withRouter(<Soforthilfe />);
    expect(screen.getAllByText(/144/)[0]).toBeInTheDocument();
  });

  it("Soforthilfe: enthält Lebensgefahr-Block", async () => {
    const { default: Soforthilfe } = await import("@/pages/Soforthilfe");
    withRouter(<Soforthilfe />);
    expect(screen.getAllByText(/Lebensgefahr/i)[0]).toBeInTheDocument();
  });

  it("Notfallkarte: rendert Seite", async () => {
    const { default: Notfallkarte } = await import("@/pages/Notfallkarte");
    withRouter(<Notfallkarte />);
    expect(screen.getAllByText(/Notfallkarte/i)[0]).toBeInTheDocument();
  });

  it("HandoutTextPage: rendert Leuchtturm-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "leuchtturm" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Der Leuchtturm – Ihre Rolle als Angehörige\/r/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sie können das Schiff nicht steuern/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zur Materialsammlung/i })
    ).toHaveAttribute("href", "/materialien");
  });

  it("HandoutTextPage: rendert Warnsignale-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "warnsignale" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Warnsignale der Überlastung/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Überlastung kommt nicht plötzlich/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("NotFound: rendert 404-Seite", async () => {
    const { default: NotFound } = await import("@/pages/NotFound");
    withRouter(<NotFound />);
    const el =
      screen.queryByText(/404/i) ??
      screen.queryByText(/nicht gefunden/i) ??
      screen.queryByText(/not found/i);
    expect(el).toBeInTheDocument();
  });
});
