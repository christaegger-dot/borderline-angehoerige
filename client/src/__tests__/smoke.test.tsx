/**
 * Smoke Tests – Kernrouten und kritische Seiten
 *
 * Ziel: Sicherstellen dass Kernseiten rendern ohne zu crashen
 * und wichtige Inhalte vorhanden sind.
 */
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
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
        name: /Der Leuchtturm – Orientierung für Angehörige/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Sie können das Schiff nicht steuern/i)
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
        /Gefahr einschätzen, ruhig bleiben, direkt ansprechen/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Soforthilfe/i })
    ).toHaveAttribute("href", "/soforthilfe");
  });

  it("HandoutTextPage: rendert Krisenmodus-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "im-krisenmodus" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Im Krisenmodus – Orientierung geben/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /In der Krise hilft weniger Logik – mehr Ruhe, Präsenz und Orientierung\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Unterstützen/i })
    ).toHaveAttribute("href", "/unterstuetzen/uebersicht");
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
        /Präsenz, Stabilität und Grenze sind drei Säulen/i
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
        /Wenn alle ähnlich reagieren, entsteht Sicherheit – und Eskalationen werden seltener\./i
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
        /Innehalten – wahrnehmen – nicht bewerten – bewusst handeln\./i
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
        /Nicht alles auf einmal: Wählen Sie eine Leitlinie pro Woche\./i
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
      await screen.findByText(
        /Kleine Handlungen im Alltag machen den grössten Unterschied\./i
      )
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
      await screen.findByText(/Überlastung kommt nicht plötzlich/i)
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
        /Im Flugzeug gilt: Erst die eigene Maske aufsetzen, dann anderen helfen\. Für Angehörige gilt dasselbe\./i
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
        name: /Die STOPP-Technik/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /STOPP gibt Ihnen 30 Sekunden Abstand zwischen Reiz und Reaktion\./i
      )
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
        /Ihre Energie ist begrenzt\. Achten Sie darauf, dass Sie regelmässig auftanken – bevor das Konto leer ist\./i
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
        name: /Radikale Akzeptanz – Aufhören zu kämpfen, anfangen zu handeln/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Radikale Akzeptanz gibt Ihnen Ihre Energie zurück/i
      )
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
      await screen.findByText(/Schuldzuweisungen sind keine Tatsachen/i)
    ).toBeInTheDocument();
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
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Kurz, ruhig und wiederholbar wirkt in Krisen stärker als Argumente\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Kommunizieren/i })
    ).toHaveAttribute("href", "/kommunizieren");
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
      await screen.findByText(
        /Nicht rechtfertigen\. Nicht erklären\. Nicht streiten\./i
      )
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
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Kurz, ruhig, wiederholbar\. Nicht erklären, nicht rechtfertigen, nicht streiten\./i
      )
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
      await screen.findByText(/DEAR hilft Ihnen, Wünsche klar zu formulieren/i)
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
      await screen.findByText(/Wem gehört dieses Gefühl\?/i)
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
      screen.getByRole("heading", {
        name: /Die 4 Arten von Grenzen/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Grenzen sind keine Mauern, sondern Türen mit Schloss\./i
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
        name: /L\.M\.K\. \(Lebe Mit Konsequenzen\)/i,
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
        name: /Genesung in Zahlen – Was die Forschung zeigt/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Genesung ist möglich\. Sie braucht Zeit/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Fortschritt-Paradox-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "fortschritt-paradox" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Das Fortschritt-Paradox/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Rückschritte sind Teil des Weges – nicht das Ende\./i
      )
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
        /Remission ist das realistische Ziel – und ein grosser Erfolg\./i
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
      await screen.findByText(
        /Sie als Angehörige können bei den beeinflussbaren Faktoren unterstützen\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Genesung/i })
    ).toHaveAttribute("href", "/genesung");
  });

  it("HandoutTextPage: rendert Rolle-im-Genesungsprozess-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(
      <HandoutTextPage params={{ handoutId: "rolle-genesungsprozess" }} />
    );
    expect(
      screen.getByRole("heading", {
        name: /Ihre Rolle im Genesungsprozess/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Sie können unterstützen\. Sie müssen nicht retten\./i
      )
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
      await screen.findByText(/Kinder spüren, dass etwas anders ist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zum Themenbereich Verstehen/i })
    ).toHaveAttribute("href", "/verstehen");
  });

  it("HandoutTextPage: rendert 4-Phasen-Textversion", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "4-phasen" }} />);
    expect(
      screen.getByRole("heading", {
        name: /Der 4-Phasen-Zyklus/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Freundlichkeit, Verschlechterung, Explosion und Schweigen/i
      )
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
      await screen.findByText(/Emotionale Überflutung ist keine Absicht/i)
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
      await screen.findByText(/Was Sie sehen \(Wut\) ist oft nur die Spitze/i)
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
      await screen.findByText(
        /Unter Stress kippt die Bewertung Ihres Angehörigen/i
      )
    ).toBeInTheDocument();
  });

  it("HandoutTextPage: gibt dichten Karten mehr Leseraum", async () => {
    const { default: HandoutTextPage } =
      await import("@/pages/HandoutTextPage");
    withRouter(<HandoutTextPage params={{ handoutId: "spaltung" }} />);

    const denseCardText = await screen.findByText(
      /Erkennen Sie das Muster – bei Ihrem Angehörigen und bei sich selbst/i
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
        /Im Alarm-Modus ist Ihr Gegenüber vorübergehend nicht erreichbar/i
      )
    ).toBeInTheDocument();
  });

  it("Grenzen: zeigt Textversionen für Grenzen-Handouts", async () => {
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
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spiegeln statt Aufsaugen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/spiegeln-statt-aufsaugen");
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
        name: /Textversion lesen: L\.M\.K\. \(Lebe Mit Konsequenzen\)/i,
      })
    ).toHaveAttribute("href", "/materialien/text/lmk");
  });

  it("Kommunizieren: zeigt Textversionen für Kommunizieren-Handouts", async () => {
    const { default: Kommunizieren } = await import("@/pages/Kommunizieren");
    withRouter(<Kommunizieren />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Worte treffen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/wenn-worte-treffen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Gespräche kippen: 3 Schritte/i,
      })
    ).toHaveAttribute("href", "/materialien/text/gespraeche-kippen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Grenzen setzen, ohne zu eskalieren/i,
      })
    ).toHaveAttribute("href", "/materialien/text/grenzen-ohne-eskalation");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Pause statt Streit/i,
      })
    ).toHaveAttribute("href", "/materialien/text/pause-statt-streit");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Zuhören ohne Zustimmen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/zuhoeren-ohne-zustimmen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Beispiel-Dialog/i,
      })
    ).toHaveAttribute("href", "/materialien/text/beispiel-dialog");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Spickzettel Krisenkommunikation \(A4\)/i,
      })
    ).toHaveAttribute("href", "/materialien/text/krisenkommunikation");
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
        name: /Textversion lesen: Das Fortschritt-Paradox/i,
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
        name: /Textversion lesen: Ihre Rolle im Genesungsprozess/i,
      })
    ).toHaveAttribute("href", "/materialien/text/rolle-genesungsprozess");
  });

  it("Verstehen: zeigt Textversionen für Verstehen-Handouts", async () => {
    const { default: Verstehen } = await import("@/pages/Verstehen");
    withRouter(<Verstehen />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Der 4-Phasen-Zyklus/i,
      })
    ).toHaveAttribute("href", "/materialien/text/4-phasen");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Das Gehirn verstehen/i,
      })
    ).toHaveAttribute("href", "/materialien/text/gehirn");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Wenn Mama oder Papa grosse Gefühle hat/i,
      })
    ).toHaveAttribute("href", "/materialien/text/kinder");
  });

  it("Unterstützen: zeigt Textversionen für Unterstützen-Handouts", async () => {
    const { default: UnterstuetzenUebersicht } =
      await import("@/pages/UnterstuetzenUebersicht");
    withRouter(<UnterstuetzenUebersicht />);
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Im Krisenmodus – Orientierung geben/i,
      })
    ).toHaveAttribute("href", "/materialien/text/im-krisenmodus");
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

  it("Selbstfürsorge: zeigt Textversionen für Selbstfürsorge-Handouts", async () => {
    const { default: Selbstfuersorge } =
      await import("@/pages/Selbstfuersorge");
    withRouter(<Selbstfuersorge />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Abschnitt Materialien zum Download aufklappen/i,
      })
    );
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die Sauerstoffmaske/i,
      })
    ).toHaveAttribute("href", "/materialien/text/sauerstoffmaske");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Die STOPP-Technik/i,
      })
    ).toHaveAttribute("href", "/materialien/text/stopp-technik");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Ihr Energie-Konto/i,
      })
    ).toHaveAttribute("href", "/materialien/text/energie-konto");
    expect(
      screen.getByRole("link", {
        name: /Textversion lesen: Erlaubnis-Karte/i,
      })
    ).toHaveAttribute("href", "/materialien/text/erlaubnis-karte");
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
