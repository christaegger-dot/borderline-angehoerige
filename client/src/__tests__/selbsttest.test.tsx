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
        name: /Wie ist der Diagnose-Status\?/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Keine Diagnose, aber ich vermute Borderline/i,
      })
    ).toBeInTheDocument();
  });

  it.each([
    "Akute Krise – Suizidgedanken, Selbstverletzung oder Gefahr",
    "Ich bin unsicher, ob gerade Gefahr besteht",
  ])("zeigt bei %s sofort Hilfe statt Folgefragen", answer => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    fireEvent.click(screen.getByRole("button", { name: answer, exact: true }));

    const heading = screen.getByRole("heading", { name: "Sofortige Hilfe" });
    expect(heading).toHaveFocus();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Was beschäftigt Sie gerade am meisten?")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^144/ })).toHaveAttribute(
      "href",
      "tel:144"
    );
    expect(screen.getByRole("link", { name: /^117/ })).toHaveAttribute(
      "href",
      "tel:117"
    );
    expect(screen.getByRole("link", { name: /058 384 20 00/ })).toHaveAttribute(
      "href",
      "tel:+41583842000"
    );
    expect(screen.getByRole("link", { name: /058 384 66 66/ })).toHaveAttribute(
      "href",
      "tel:+41583846666"
    );
    expect(screen.getByRole("link", { name: /058 384 46 82/ })).toHaveAttribute(
      "href",
      "tel:+41583844682"
    );

    act(() => {
      vi.runAllTimers();
    });
    expect(
      screen.getByRole("heading", { name: "Sofortige Hilfe" })
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

  it("führt den nicht akuten Weg weiter und ergänzt Diagnostik bei Verdacht", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);
    const answers = [
      /Relativ stabil/,
      /Ich fühle mich überfordert und erschöpft/,
      /Sehr stark/,
      /Keine Diagnose, aber ich vermute Borderline/,
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
    expect(
      screen.getByRole("link", { name: "Diagnostik einordnen" })
    ).toHaveAttribute("href", "/verstehen/diagnostik");
  });
});
