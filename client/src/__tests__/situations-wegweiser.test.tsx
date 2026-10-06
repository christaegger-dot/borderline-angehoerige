import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SituationsWegweiser from "@/components/interactive/SituationsWegweiser";

vi.mock("framer-motion", () => {
  const motion = {
    div: ({ children, ...props }: ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  };
  const passthrough = ({ children }: { children: ReactNode }) => children;
  return {
    motion,
    m: motion,
    AnimatePresence: passthrough,
    LazyMotion: passthrough,
    MotionConfig: passthrough,
    domAnimation: {},
  };
});

describe("Situations-Wegweiser: Unsicherheit und Sicherheitsgrenzen", () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("benennt beobachtbare Gesprächs- und Bedrohungssituationen ohne Aggressionsetikett", () => {
    render(<SituationsWegweiser />);

    expect(
      screen.getByRole("button", {
        name: "Ein Gespräch kippt oder ich fühle mich bedroht",
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Starker Wutausbruch oder Aggression",
      })
    ).not.toBeInTheDocument();
  });

  it("führt auch nicht-körperliche Bedrohung klar in den Sicherheitsweg", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Ein Gespräch kippt oder ich fühle mich bedroht",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Fühlen Sie sich bedroht, eingeschüchtert oder unter Zwang?",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Auch Einschüchterung, Stalking oder Zwang/)
    ).toHaveTextContent(/nicht nur körperliche Gewalt/);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Bedrohung, Einschüchterung, Stalking, Zwang oder Gewalt/,
      })
    );

    expect(
      screen.getByRole("heading", { name: "Ihre Sicherheit hat Vorrang" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
    expect(
      screen.getByText(/Bedrohung, Einschüchterung, Stalking, Zwang und Gewalt/)
    ).toHaveTextContent(/kein Motiv beurteilen/);
  });

  it("fokussiert neue Fragen sowie Rückkehr- und Neustartziele", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken oder Suizidankündigung",
      })
    );
    expect(
      screen.getByRole("heading", { name: "Besteht unmittelbare Gefahr?" })
    ).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(
      screen.getByRole("heading", { name: "Was passiert gerade?" })
    ).toHaveFocus();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken oder Suizidankündigung",
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Wegweiser neu starten" })
    );
    expect(
      screen.getByRole("heading", { name: "Was passiert gerade?" })
    ).toHaveFocus();
  });

  it("leitet bei körperlichen Sorgen zur zentralen Seite mit Anlaufstellen", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(screen.getByRole("button", { name: "Selbstverletzung" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Ja – oder ich bin unsicher/ })
    );
    expect(
      screen.getByRole("heading", { name: "Jetzt medizinische Hilfe holen" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
    expect(screen.getByText(/nur ohne Eigengefährdung/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(
      screen.getByRole("button", { name: /Keine solchen Anzeichen erkennbar/ })
    ).toBeInTheDocument();
  });

  it("verwechselt unauffällige körperliche Folgen nicht mit Entwarnung und erschliesst Hilfe für jedes Alter", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(screen.getByRole("button", { name: "Selbstverletzung" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Keine solchen Anzeichen erkennbar/ })
    );
    expect(
      screen.getByText(/Eine klein wirkende Verletzung sagt nichts/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Warten Sie nicht auf eine Wiederholung/)
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
        .length
    ).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
    expect(
      screen.queryByText(/Eiswürfel|kalte Dusche|intensive Reize/)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Beratung für Angehörige" })
    ).toHaveAttribute("href", "/fachstelle");
  });

  it("zeigt auch bei Druck durch Suizidankündigungen den zentralen Soforthilfeweg", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", { name: "Druck, Vorwürfe oder Drohungen" })
    );
    expect(
      screen.getByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(
      screen.getByText(/ohne eine Forderung zu erfüllen/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
  });

  it("führt Unsicherheit direkt zu professioneller Hilfe und erlaubt Rücknavigation", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken oder Suizidankündigung",
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Ich weiss es nicht – ich brauche/ })
    );
    expect(
      screen.getByRole("heading", {
        name: "Unsicherheit – jetzt Unterstützung holen",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
    expect(
      screen.getByText(
        /Nehmen Sie gefährliche Gegenstände nicht gegen Widerstand weg/
      )
    ).toHaveTextContent(/greifen Sie nicht körperlich ein/);
    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(
      screen.getByRole("button", { name: /Ich weiss es nicht – ich brauche/ })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Wegweiser neu starten" })
    );
    expect(
      screen.getByRole("heading", { name: "Was passiert gerade?" })
    ).toBeInTheDocument();
  });

  it("gibt ohne sichtbare Handlung keine Entwarnung und zeigt den medizinischen Hilfeweg", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken oder Suizidankündigung",
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken werden geäussert – keine Handlung erkennbar",
      })
    );
    expect(
      screen.getByText(/Keine sichtbare Handlung bedeutet keine Entwarnung/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Akute Hilfe und Notfallkontakte/ })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
  });

  it("nennt Eigengefährdung und Widerstand direkt bei der Handlung zur Umgebungssicherung", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Suizidgedanken oder Suizidankündigung",
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Ja – akute Handlung oder konkreter Plan",
      })
    );
    const step = screen
      .getByRole("heading", { name: "Sichern Sie die Umgebung" })
      .closest("li");
    expect(step).not.toBeNull();
    expect(
      within(step!).getByText(/nur ohne Eigengefährdung/)
    ).toHaveTextContent(/gegen Widerstand/);
    expect(
      within(step!).getByText(/nur ohne Eigengefährdung/)
    ).toHaveTextContent(/greifen Sie nicht körperlich ein/);
  });
});
