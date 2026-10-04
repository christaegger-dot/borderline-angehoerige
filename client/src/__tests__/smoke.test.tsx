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

vi.mock("framer-motion", () => {
  const motion = new Proxy(
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
  );
  const passthrough = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  return {
    motion,
    m: motion,
    AnimatePresence: passthrough,
    useAnimation: () => ({ start: vi.fn() }),
    useInView: () => false,
    useReducedMotion: () => true,
    LazyMotion: passthrough,
    MotionConfig: passthrough,
    domAnimation: {},
  };
});

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

  it("Quellen: verlinkt die korrekten Zanarini-Verlaufsstudien", async () => {
    const { default: Quellen } = await import("@/pages/Quellen");
    const { container } = withRouter(<Quellen />);

    expect(
      screen.getByRole("heading", { name: /Quellen & Literatur/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Time to attainment of recovery from borderline/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Attainment and stability of sustained symptomatic/i)
    ).toBeInTheDocument();

    const hrefs = Array.from(container.querySelectorAll("a")).map(link =>
      link.getAttribute("href")
    );

    expect(hrefs).toContain("https://pubmed.ncbi.nlm.nih.gov/20395399/");
    expect(hrefs).toContain("https://pubmed.ncbi.nlm.nih.gov/22737693/");
    expect(hrefs).not.toContain("https://pubmed.ncbi.nlm.nih.gov/20595412/");
  });

  it("Notfallkarte: rendert Seite", async () => {
    const { default: Notfallkarte } = await import("@/pages/Notfallkarte");
    withRouter(<Notfallkarte />);
    expect(screen.getAllByText(/Notfallkarte/i)[0]).toBeInTheDocument();
    expect(
      screen.getByText(/Gemeinsam und mit Einverständnis ausfüllen/i)
    ).toBeInTheDocument();
  });

  it("Situations-Wegweiser: ordnet Situationen ohne Diagnose- oder Charakterurteil ein", async () => {
    const { default: Wegweiser } = await import("@/pages/Wegweiser");
    withRouter(<Wegweiser />);
    expect(
      screen.getByText(/kommen nicht bei allen Menschen mit Borderline vor/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nicht Diagnose, Motive oder Charakter/i)
    ).toBeInTheDocument();
  });

  it("HandoutTextPage: rendert Leuchtturm-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "leuchtturm" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Der Leuchtturm – eigene Orientierung finden/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Sie können die Reise einer anderen Person nicht steuern/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Worum es in diesem Handout geht/i,
      })
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
      await screen.findByText(
        /Beobachtungen ernst nehmen, direkt ansprechen und professionelle Hilfe einbeziehen/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Soforthilfe/i })
    ).toHaveAttribute("href", "/soforthilfe");
  });

  it("HandoutTextPage: rendert Drei-Säulen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "drei-saeulen" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Drei Säulen hilfreicher Unterstützung/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Drei freiwillige Fragen können Orientierung geben/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
  });

  it("HandoutTextPage: rendert Konsistenz-Prinzip-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "konsistenz-prinzip" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Konsistenz-Prinzip/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Konsistenz bedeutet keine starre Einheitsreaktion/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
  });

  it("HandoutTextPage: rendert Beziehungs-Achtsamkeit-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "beziehungs-achtsamkeit" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Beziehungs-Achtsamkeit/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Innehalten, beobachten, Unsicherheit anerkennen und bewusst wählen/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
  });

  it("HandoutTextPage: rendert 6-Leitlinien-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "6-leitlinien" }} />);
    expect(
      screen.getByRole("heading", {
        name: /6 Leitlinien für Angehörige/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Sechs freiwillige Orientierungspunkte können helfen/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
  });

  it("HandoutTextPage: rendert 4-Alltags-Tipps-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "4-alltags-tipps" }} />);
    expect(
      screen.getByRole("heading", {
        name: /4 Alltags-Tipps/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Vier freiwillige Fragen helfen zu klären/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
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
      await screen.findByText(/Überlastung kommt oft nicht plötzlich/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert Sauerstoffmaske-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "sauerstoffmaske" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Die Sauerstoffmaske/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Ihre Bedürfnisse zählen\. Sie dürfen zuerst oder ausschliesslich für die eigene Sicherheit und Gesundheit sorgen\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert STOPP-Technik-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "stopp-technik" }} />);
    expect(
      screen.getByRole("heading", {
        name: /STOPP: einen Moment innehalten/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Fünf Schritte können helfen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert Energie-Konto-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "energie-konto" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Ihr Energie-Konto/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Das Energie-Konto ist eine Selbstbeobachtungsmetapher/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
  });

  it("HandoutTextPage: rendert Erlaubnis-Karte-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "erlaubnis-karte" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Erlaubnis-Karte/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Gültig ab sofort\. Unbefristet\./i)
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
      await screen.findByText(
        /Schuldgefühle gehören zu den häufigsten Belastungen/i
      )
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
        name: /Radikale Akzeptanz – die Realität anerkennen und Handlungsspielraum finden/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findAllByText(
        /Diese Übung ist ein Angebot: «So ist es gerade/i
      )
    ).not.toHaveLength(0);
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Selbstfürsorge/i })
    ).toHaveAttribute("href", "/selbstfuersorge");
    expect(
      screen.queryByRole("link", { name: /PDF öffnen/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(/Schutz vor Akzeptanzübung/i);
    expect(
      screen.getAllByText(/fachlich-redaktionelle Freigabe ausstehend/i)
    ).not.toHaveLength(0);
  });

  it("HandoutTextPage: rendert Wenn-Worte-treffen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "wenn-worte-treffen" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Wenn Worte treffen – belastende Aussagen einordnen/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Von aussen lässt sich nicht sicher erkennen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Wenn Suizid angesprochen wird/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /PDF öffnen/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("HandoutTextPage: rendert Gespräche-kippen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "gespraeche-kippen" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Wenn Gespräche kippen: 3 Schritte/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findAllByText(
        /Keine Formulierung garantiert eine bestimmte Reaktion\./i
      )
    ).not.toHaveLength(0);
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(
      /Bei Bedrohung oder Gewalt.*117.*Bei vermuteter unmittelbarer Selbstgefährdung.*144/i
    );
    expect(screen.queryByText(/Worum es in diesem Handout geht/i)).toBeNull();
  });

  it("HandoutTextPage: rendert Grenzen-ohne-Eskalation-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "grenzen-ohne-eskalation" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Grenzen setzen, ohne zu eskalieren/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Nicht in lange Rechtfertigungen gehen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("HandoutTextPage: rendert Pause-statt-Streit-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "pause-statt-streit" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Pause statt Streit/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Ich stoppe jetzt – nicht weil ich aufgebe, sondern weil mir diese Beziehung wichtig ist\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("HandoutTextPage: rendert Zuhören-ohne-Zustimmen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "zuhoeren-ohne-zustimmen" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Zuhören ohne Zustimmen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Sie können Gefühle anerkennen, ohne die Interpretation zu übernehmen\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("HandoutTextPage: rendert Beispiel-Dialog-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "beispiel-dialog" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Beispiel-Dialog/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findAllByText(
        /Keine Formulierung garantiert eine bestimmte Reaktion\./i
      )
    ).not.toHaveLength(0);
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
    expect(screen.getAllByText(/keine Rückkehrpflicht/i)).not.toHaveLength(0);
    expect(
      screen.getByRole("note", { name: /Sicherheitshinweis/i })
    ).toHaveTextContent(
      /Bei Bedrohung oder Gewalt.*117.*Bei vermuteter unmittelbarer Selbstgefährdung.*144/i
    );
  });

  it("HandoutTextPage: rendert DEAR-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "dear" }} />);
    expect(
      await screen.findByRole("heading", {
        name: /DEAR: ein Anliegen klar formulieren/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/DEAR garantiert keine Kooperation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Grenzen/i })
    ).toHaveAttribute("href", "/grenzen");
  });

  it("HandoutTextPage: rendert Spiegeln-statt-Aufsaugen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "spiegeln-statt-aufsaugen" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Spiegeln statt Aufsaugen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Was habe ich beobachtet, was vermute ich/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Grenzen/i })
    ).toHaveAttribute("href", "/grenzen");
  });

  it("HandoutTextPage: rendert 4-Arten-von-Grenzen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "4-arten-von-grenzen" }} />
    );
    expect(
      await screen.findByRole("heading", {
        name: /Vier Arten von Grenzen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Eine Grenze beschreibt, was für Sie tragbar ist/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Grenzen/i })
    ).toHaveAttribute("href", "/grenzen");
  });

  it("HandoutTextPage: rendert Grenzen-erkennen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "grenzen-erkennen" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Grenzen erkennen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Ihr Körper weiss oft vor Ihrem Kopf, dass eine Grenze überschritten wurde\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Grenzen/i })
    ).toHaveAttribute("href", "/grenzen");
  });

  it("HandoutTextPage: rendert LMK-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "lmk" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Wenn Grenzen nicht respektiert werden/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Sie können Grenzen setzen\. Sie können Konsequenzen umsetzen\./i
      )
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
        name: /Genesung in Zahlen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Besserung ist möglich/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Textversion zu unterschiedlichen Veränderungsverläufen", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "fortschritt-paradox" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Veränderung verläuft unterschiedlich/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Veränderung kann unterschiedlich verlaufen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Remission-Heilung-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "remission-heilung" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Remission vs\. Heilung/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Symptome können deutlich zurückgehen; Funktionsfähigkeit/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert 5-Faktoren-Genesung-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "5-faktoren-genesung" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /5 Faktoren, die Genesung fördern/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Verantwortung liegt nicht bei Angehörigen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Textversion zu freiwilliger Unterstützung und eigenen Grenzen", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "rolle-genesungsprozess" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Freiwillige Unterstützung und eigene Grenzen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Angehörige können auf Wunsch etwas anbieten/i)
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
        name: /Kinder verstehen und entlasten/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Kinder brauchen verständliche Worte/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Verstehen/i })
    ).toHaveAttribute("href", "/verstehen");
  });

  it("HandoutTextPage: rendert Gehirn-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "gehirn" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Das Gehirn verstehen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Hohe Anspannung kann Denken verengen\. Daraus lässt sich keine Absicht ablesen/i
      )
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
        name: /Der Eisberg – sichtbares Verhalten und mögliche Kontexte/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Was Sie sehen, ist ein Teil der Situation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Verstehen/i })
    ).toHaveAttribute("href", "/verstehen");
  });

  it("HandoutTextPage: rendert die differenzierte Pendel-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "spaltung" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Wenn Bewertungen unter Stress einseitiger werden/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Weder eine sehr positive noch eine sehr negative Momentaufnahme/i
      )
    ).toBeInTheDocument();
  });

  it("HandoutTextPage: gibt dichten Karten mehr Leseraum", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "spaltung" }} />);

    const denseCardText = await screen.findByText(
      /Was wurde gerade tatsächlich gesagt oder getan/i
    );
    const cardGrid = denseCardText.closest(".grid");

    expect(cardGrid).toHaveClass("md:grid-cols-2");
    expect(cardGrid).not.toHaveClass("xl:grid-cols-3");
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
      await screen.findByText(
        /Hohe Anspannung kann Denken, Perspektivwechsel und Selbststeuerung verengen/i
      )
    ).toBeInTheDocument();
  });

  it("Grenzen: zeigt kuratierte Textversionen für Grenzen-Handouts", async () => {
    const { default: Grenzen } = await import("@/pages/Grenzen");
    withRouter(<Grenzen />);
    expect(
      screen.getByRole("heading", {
        name: /Drei Materialien für klare Grenzen/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die 4 Arten von Grenzen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/4-arten-von-grenzen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Grenzen erkennen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/grenzen-erkennen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spickzettel Grenzen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/grenzen-spickzettel");
  });

  it("Kommunizieren: zeigt kuratierte Textversionen für Kommunizieren-Handouts", async () => {
    const { default: Kommunizieren } = await import("@/pages/Kommunizieren");
    withRouter(<Kommunizieren />);
    expect(
      screen.getByRole("heading", {
        name: /Zwei Materialien für schwierige Gespräche/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Gespräche kippen: 3 Schritte/i,
      })
    ).toHaveAttribute("href", "/materialien/text/gespraeche-kippen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Beispiel-Dialog/i,
      })
    ).toHaveAttribute("href", "/materialien/text/beispiel-dialog");
    expect(
      screen.queryByRole("link", {
        name: /PDF öffnen: Wenn Gespräche kippen: 3 Schritte/i,
      })
    ).not.toBeInTheDocument();
  });

  it("Genesung: zeigt Textversionen für Genesung-Handouts", async () => {
    const { default: Genesung } = await import("@/pages/Genesung");
    withRouter(<Genesung />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Genesung in Zahlen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/genesung-zahlen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Veränderung verläuft unterschiedlich/i,
      })
    ).toHaveAttribute("href", "/materialien/text/fortschritt-paradox");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Remission vs\. Heilung/i,
      })
    ).toHaveAttribute("href", "/materialien/text/remission-heilung");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: 5 Faktoren, die Genesung fördern/i,
      })
    ).toHaveAttribute("href", "/materialien/text/5-faktoren-genesung");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Freiwillige Unterstützung und eigene Grenzen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/rolle-genesungsprozess");
    expect(
      screen.queryByRole("link", {
        name: /PDF öffnen: Remission vs\. Heilung/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /PDF öffnen: 5 Faktoren, die Genesung fördern/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: /PDF öffnen: Freiwillige Unterstützung und eigene Grenzen/i,
      })
    ).not.toBeInTheDocument();
  });

  it("Verstehen: zeigt Textversionen für Verstehen-Handouts", async () => {
    const { default: Verstehen } = await import("@/pages/Verstehen");
    withRouter(<Verstehen />);
    expect(screen.queryByText(/Der 4-Phasen-Zyklus/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Das Gehirn verstehen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/gehirn");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Kinder verstehen und entlasten/i,
      })
    ).toHaveAttribute("href", "/materialien/text/kinder");
    expect(
      screen.queryByRole("link", {
        name: /PDF öffnen: Das Gehirn verstehen/i,
      })
    ).not.toBeInTheDocument();
  });

  it("Unterstützen: zeigt Textversionen für Unterstützen-Handouts", async () => {
    const { default: UnterstuetzenUebersicht } =
      await import("@/pages/UnterstuetzenUebersicht");
    withRouter(<UnterstuetzenUebersicht />);
    expect(
      screen.queryByRole("link", {
        name: /Textversion lesen: Im Krisenmodus – Orientierung geben/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Drei Säulen hilfreicher Unterstützung/i,
      })
    ).toHaveAttribute("href", "/materialien/text/drei-saeulen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Konsistenz-Prinzip/i,
      })
    ).toHaveAttribute("href", "/materialien/text/konsistenz-prinzip");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Beziehungs-Achtsamkeit/i,
      })
    ).toHaveAttribute("href", "/materialien/text/beziehungs-achtsamkeit");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: 6 Leitlinien für Angehörige/i,
      })
    ).toHaveAttribute("href", "/materialien/text/6-leitlinien");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: 4 Alltags-Tipps/i,
      })
    ).toHaveAttribute("href", "/materialien/text/4-alltags-tipps");
  });

  it("Selbstfürsorge: zeigt kuratierte Textversionen für Selbstfürsorge-Handouts", async () => {
    const { default: Selbstfuersorge } =
      await import("@/pages/Selbstfuersorge");
    withRouter(<Selbstfuersorge />);
    // Materialien-Section ist nach Phase-2-Migration kein collapsible
    // ContentSection mehr — Content ist immer sichtbar.
    expect(
      screen.getByRole("heading", {
        name: /Drei Materialien, die Selbstfürsorge greifbar machen/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Radikale Akzeptanz/i,
      })
    ).toHaveAttribute("href", "/materialien/text/radikale-akzeptanz");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: STOPP: einen Moment innehalten/i,
      })
    ).toHaveAttribute("href", "/materialien/text/stopp-technik");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Ihr Energie-Konto/i,
      })
    ).toHaveAttribute("href", "/materialien/text/energie-konto");
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
