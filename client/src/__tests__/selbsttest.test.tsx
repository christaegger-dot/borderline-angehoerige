import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Selbsttest from "@/components/Selbsttest";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  motion: {
    div: ({ children, ...props }: ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

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

  it("lässt das Notfall-Ergebnis dominant und ergänzt Diagnostik bei Verdacht", () => {
    vi.useFakeTimers();
    render(<Selbsttest />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Akute Krise – Suizidgedanken, Selbstverletzung oder Gefahr/i,
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
        name: /Ich verstehe nicht, was in meinem Angehörigen vorgeht/i,
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
        name: /Kaum spürbar — ich komme gut zurecht/i,
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

    fireEvent.click(
      screen.getByRole("button", {
        name: /Keine Diagnose, aber ich vermute Borderline/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(
      screen.getByRole("heading", {
        name: /Wie geht es Ihnen selbst gerade\?/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Überfordert – ich weiss nicht mehr weiter/i,
      })
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(
      screen.getByRole("heading", { name: /Sofortige Hilfe/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zu den Notfallressourcen/i })
    ).toHaveAttribute("href", "/soforthilfe");
    expect(
      screen.getByRole("link", { name: /Diagnostik einordnen/i })
    ).toHaveAttribute("href", "/verstehen/diagnostik");
  });
});
