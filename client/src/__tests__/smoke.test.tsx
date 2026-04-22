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

  it("HandoutTextPage: rendert Notfallplan-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "notfallplan-krise" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Notfallplan Krise – Suizidgedanken & Selbstverletzung/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Gefahr einschätzen, ruhig bleiben, direkt ansprechen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Soforthilfe/i })
    ).toHaveAttribute("href", "/soforthilfe");
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

  it("HandoutTextPage: rendert Schuld-und-Verantwortung-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "schuld-verantwortung" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Schuld, Verantwortung und was dazwischen liegt/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Schuldgefühle gehören zu den häufigsten Belastungen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert Radikale-Akzeptanz-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "radikale-akzeptanz" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Radikale Akzeptanz gibt Ihnen Ihre Energie zurück/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert Wenn-Worte-treffen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "wenn-worte-treffen" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Wenn Worte treffen – 5 häufige Schuldzuweisungen/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Schuldzuweisungen sind keine Tatsachen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("HandoutTextPage: rendert DEAR-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "dear" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Die DEAR-Technik – Grenzen setzen ohne Vorwürfe/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/DEAR hilft Ihnen, Wünsche klar zu formulieren/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Grenzen/i })
    ).toHaveAttribute("href", "/grenzen");
  });

  it("HandoutTextPage: rendert Genesung-in-Zahlen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "genesung-zahlen" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Genesung in Zahlen – Was die Forschung zeigt/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Genesung ist möglich\. Sie braucht Zeit/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Kinder-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "kinder" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Wenn Mama oder Papa grosse Gefühle hat/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kinder spüren, dass etwas anders ist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Verstehen/i })
    ).toHaveAttribute("href", "/verstehen");
  });

  it("HandoutTextPage: rendert Eisberg-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "eisberg" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Der Eisberg – Wut ist oft die Spitze/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Was Sie sehen \(Wut\) ist oft nur die Spitze/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Verstehen/i })
    ).toHaveAttribute("href", "/verstehen");
  });

  it("HandoutTextPage: rendert Spaltung-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "spaltung" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Spaltung – das Pendel zwischen Extremen/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Unter Stress kippt die Bewertung Ihres Angehörigen/i)
    ).toBeInTheDocument();
  });

  it("HandoutTextPage: rendert Alarm-Modus-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "alarm-modus" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Alarm-Modus vs\. Denk-Modus/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Im Alarm-Modus ist Ihr Gegenüber vorübergehend nicht erreichbar/i
      )
    ).toBeInTheDocument();
  });

  it("Grenzen: zeigt Textversion für Spickzettel Grenzen", async () => {
    const { default: Grenzen } = await import("@/pages/Grenzen");
    withRouter(<Grenzen />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spickzettel Grenzen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/grenzen-spickzettel");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die DEAR-Technik/i,
      })
    ).toHaveAttribute("href", "/materialien/text/dear");
  });

  it("Kommunizieren: zeigt Textversion für Wenn Worte treffen", async () => {
    const { default: Kommunizieren } = await import("@/pages/Kommunizieren");
    withRouter(<Kommunizieren />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Worte treffen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/wenn-worte-treffen");
  });

  it("Genesung: zeigt Textversion für Genesung in Zahlen", async () => {
    const { default: Genesung } = await import("@/pages/Genesung");
    withRouter(<Genesung />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Genesung in Zahlen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/genesung-zahlen");
  });

  it("Verstehen: zeigt Textversion für Kinder-Handout", async () => {
    const { default: Verstehen } = await import("@/pages/Verstehen");
    withRouter(<Verstehen />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Mama oder Papa grosse Gefühle hat/i,
      })
    ).toHaveAttribute("href", "/materialien/text/kinder");
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
