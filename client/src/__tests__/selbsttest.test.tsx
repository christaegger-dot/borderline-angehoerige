import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Selbsttest from "@/components/Selbsttest";

vi.mock("framer-motion", () => {
  const motion = {
    div: ({
      children,
      initial: _initial,
      ...props
    }: ComponentPropsWithoutRef<"div"> & { initial?: unknown }) => (
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

describe("Selbsttest", () => {
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("trennt Begleitdauer und Diagnose-Status in zwei Fragen", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Relativ stabil – Zeit zum Lernen und Vorbereiten/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.getByRole("heading", {
        name: /Was beschäftigt Sie gerade am meisten\?/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Ich weiss nicht, wie ich helfen kann/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.getByRole("heading", {
        name: /Wie intensiv war die Belastung in den letzten Wochen\?/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Deutlich spürbar — es kostet mich Kraft/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(
      screen.getByRole("heading", {
        name: /Gibt es eine fachliche Einordnung\?/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Keine Diagnose – ich suche Orientierung zu beobachtbaren Situationen/i,
      })
    ).toBeInTheDocument();
  });

  it("setzt den Fokus nach einem Wechsel auf die neue Frage", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Relativ stabil – Zeit zum Lernen und Vorbereiten/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(
      screen.getByRole("heading", {
        name: /Was beschäftigt Sie gerade am meisten\?/i,
      })
    ).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(
      screen.getByRole("heading", {
        name: /Wie würden Sie die aktuelle Situation beschreiben\?/i,
      })
    ).toHaveFocus();
  });

  it.each([
    "Akute Krise – Suizidgedanken, Selbstverletzung oder Gefahr",
    "Ich bin unsicher, ob gerade Gefahr besteht",
  ])("zeigt bei %s sofort Hilfe statt Folgefragen", answer => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    fireEvent.click(screen.getByRole("button", { name: answer, exact: true }));

    const heading = screen.getByRole("heading", {
      name: "Akute Hilfe und Notfallkontakte",
    });
    expect(heading).toHaveFocus();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Was beschäftigt Sie gerade am meisten?")
    ).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link")
        .some(link => link.getAttribute("href") === "/soforthilfe")
    ).toBe(true);
    expect(screen.queryByRole("link", { name: /^Telefon / })).toBeNull();
    expect(screen.queryByText(/058 384|144|117/)).not.toBeInTheDocument();
    expect(
      screen.queryByText("Warum dieser Einstieg erscheint")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Weitere relevante Themen")
    ).not.toBeInTheDocument();

    act(() => {
      vi.runAllTimers();
    });
    expect(
      screen.getByRole("heading", {
        name: "Akute Hilfe und Notfallkontakte",
      })
    ).toBeInTheDocument();
    expect(screen.queryByText("Frage 2 von 5")).not.toBeInTheDocument();
  });

  it("erlaubt nach der Soforthilfe eine neue freiwillige Auswahl", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Ich bin unsicher, ob gerade Gefahr besteht/,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "Zurück zur Auswahl" }));
    expect(screen.getByText("Frage 1 von 5")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Relativ stabil/ }));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText("Frage 2 von 5")).toBeInTheDocument();
  });

  it("führt den nicht akuten Weg weiter und ergänzt fachliche Orientierung", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    const answers = [
      /Relativ stabil/,
      /Ich fühle mich überfordert und erschöpft/,
      /Sehr stark/,
      /Keine Diagnose – ich suche Orientierung zu beobachtbaren Situationen/,
      /Erschöpft – ich brauche dringend Unterstützung/,
    ];
    for (const name of answers) {
      fireEvent.click(screen.getByRole("button", { name }));
      act(() => {
        vi.advanceTimersByTime(300);
      });
    }
    expect(
      screen.getByRole("heading", { name: "Selbstfürsorge priorisieren" })
    ).toBeInTheDocument();
    expect(screen.getByText("Redaktionelle Orientierung")).toBeInTheDocument();
    expect(
      screen.getByText(/Ihre eigene Erschöpfung braucht Raum/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/dringend Unterstützung zu brauchen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keine fachliche oder klinische Beurteilung/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Sie können nur helfen, wenn Sie selbst Kraft haben/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Diagnostik einordnen" })
    ).toHaveAttribute("href", "/verstehen/diagnostik");
  });

  it("bricht eine ausstehende Antwort beim Zurückgehen ab und gewichtet die erneute Auswahl nur einmal", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    fireEvent.click(screen.getByRole("button", { name: /Hohe Anspannung/ }));
    act(() => vi.advanceTimersByTime(300));
    fireEvent.click(
      screen.getByRole("button", {
        name: "Ich verstehe nicht, was in meinem Angehörigen vorgeht",
      })
    );
    act(() => vi.advanceTimersByTime(100));
    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));

    expect(screen.getByText("Frage 1 von 5")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Ich verstehe nicht, was in meinem Angehörigen vorgeht",
      })
    ).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("Frage 1 von 5")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Hohe Anspannung/ })
    ).toBeEnabled();

    for (const name of [
      /Hohe Anspannung/,
      /Ich verstehe nicht, was in meinem Angehörigen vorgeht/,
      /Deutlich spürbar/,
      /Eine Borderline-Diagnose wurde fachlich gestellt/,
      /Gut – ich habe Energie und Ressourcen/,
    ]) {
      fireEvent.click(screen.getByRole("button", { name }));
      act(() => vi.advanceTimersByTime(300));
    }
    expect(
      screen.getByRole("heading", { name: "Kommunikation verbessern" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kommunikationstechniken entdecken" })
    ).toHaveAttribute("href", "/kommunizieren");
  });

  it("entfernt alte Fragen beim Zurückgehen sofort und verwendet nur die neu gewählten Antworten", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    for (const name of [
      /Relativ stabil/,
      /Die Kommunikation ist schwierig/,
      /Deutlich spürbar/,
    ]) {
      fireEvent.click(screen.getByRole("button", { name }));
      act(() => vi.advanceTimersByTime(300));
    }
    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(
      screen.queryByRole("button", {
        name: /Eine Borderline-Diagnose wurde fachlich gestellt/,
      })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Eine Frage zurück" }));
    expect(screen.getByText("Frage 2 von 5")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Deutlich spürbar/ })
    ).not.toBeInTheDocument();

    for (const name of [
      /Ich verstehe nicht, was in meinem Angehörigen vorgeht/,
      /Deutlich spürbar/,
      /Eine Borderline-Diagnose wurde fachlich gestellt/,
      /Gut – ich habe Energie und Ressourcen/,
    ]) {
      fireEvent.click(screen.getByRole("button", { name }));
      act(() => vi.advanceTimersByTime(300));
    }
    expect(
      screen.getByRole("heading", { name: "Borderline verstehen" })
    ).toBeInTheDocument();
  });
});
