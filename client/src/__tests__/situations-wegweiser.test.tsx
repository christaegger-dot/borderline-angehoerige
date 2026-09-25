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

  it("bietet bei unklaren körperlichen Folgen sofort Rettungsdienst und Vergiftungsberatung an", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(screen.getByRole("button", { name: "Selbstverletzung" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Ja – oder ich bin unsicher/ })
    );
    expect(
      screen.getByRole("heading", { name: "Jetzt medizinische Hilfe holen" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Telefon 144/ })).toHaveAttribute(
      "href",
      "tel:144"
    );
    expect(screen.getByRole("link", { name: /Telefon 145/ })).toHaveAttribute(
      "href",
      "tel:145"
    );
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
    for (const nummer of [
      "144",
      "145",
      "058 384 66 66",
      "058 384 20 00",
      "058 384 46 82",
    ]) {
      expect(
        screen.getByRole("link", {
          name: new RegExp("Telefon " + nummer + " –"),
        })
      ).toBeInTheDocument();
    }
    expect(
      screen.queryByText(/Eiswürfel|kalte Dusche|intensive Reize/)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Beratung für Angehörige" })
    ).toHaveAttribute("href", "/fachstelle");
  });

  it("zeigt auch bei Druck durch Suizidankündigungen direkt die Notfallkontakte", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", { name: "Druck, Vorwürfe oder Drohungen" })
    );
    expect(screen.getByRole("link", { name: /Telefon 144/ })).toHaveAttribute(
      "href",
      "tel:144"
    );
    expect(screen.getByRole("link", { name: /Telefon 117/ })).toHaveAttribute(
      "href",
      "tel:117"
    );
    expect(
      screen.getByText(/ohne eine Forderung zu erfüllen/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Telefon 058 384 66 66/ })
    ).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: /Telefon 144/ })).toHaveAttribute(
      "href",
      "tel:144"
    );
    expect(
      screen.getByRole("link", { name: /Telefon 058 384 20 00/ })
    ).toHaveAttribute("href", "tel:+41583842000");
    expect(
      screen.getByRole("link", { name: /Telefon 058 384 66 66/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Telefon 058 384 46 82/ })
    ).toBeInTheDocument();
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
      screen.getByRole("link", { name: /Telefon 144/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Telefon 058 384 20 00/ })
    ).toBeInTheDocument();
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
