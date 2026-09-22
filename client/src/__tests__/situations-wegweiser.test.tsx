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

  it("führt Unsicherheit direkt zu professioneller Hilfe und erlaubt Rücknavigation", () => {
    vi.useFakeTimers();
    render(<SituationsWegweiser />);
    fireEvent.click(
      screen.getByRole("button", { name: "Suiziddrohung oder Suizidgedanken" })
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
      screen.getByRole("button", { name: "Suiziddrohung oder Suizidgedanken" })
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
      screen.getByRole("button", { name: "Suiziddrohung oder Suizidgedanken" })
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
