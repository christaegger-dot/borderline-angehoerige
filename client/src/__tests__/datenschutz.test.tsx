import { fireEvent, render, screen } from "@testing-library/react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { pageGovernance } from "@/data/pageGovernance";
import Datenschutz from "@/pages/Datenschutz";

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
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: HTMLAttributes<HTMLElement> & {
          children?: ReactNode;
        }) => {
          const Tag = tag as ElementType;
          return (
            <Tag {...stripMotionProps(props as Record<string, unknown>)}>
              {children}
            </Tag>
          );
        },
    }
  );
  const passthrough = ({ children }: { children?: ReactNode }) => (
    <>{children}</>
  );
  return {
    motion,
    m: motion,
    AnimatePresence: passthrough,
    LazyMotion: passthrough,
    MotionConfig: passthrough,
    domAnimation: {},
  };
});

describe("Datenschutz", () => {
  it("explains that the retired personal tool may leave local browser data", () => {
    render(<Datenschutz />);

    const sectionToggle = screen.getByRole("button", {
      name: /Frühere persönliche Notfallkarte und lokale Daten/i,
    });
    expect(sectionToggle).toBeInTheDocument();
    fireEvent.click(sectionToggle);
    expect(document.body).toHaveTextContent(
      /lokal im Browser auf diesem Gerät liegen/i
    );
    expect(document.body).toHaveTextContent(
      /nicht an Server dieser Website übertragen/i
    );
    expect(
      screen.getByText(/Einstellungen Ihres Browsers/i)
    ).toBeInTheDocument();

    const cookiesToggle = screen.getByRole("button", {
      name: /Cookies/i,
    });
    fireEvent.click(cookiesToggle);
    expect(document.body).toHaveTextContent(
      /keine Tracking- oder Werbe-Cookies/i
    );
  });

  it("links to current emergency contacts and separates the text update from historical review", () => {
    render(<Datenschutz />);

    const editorialUpdated = pageGovernance["/datenschutz"]?.editorialUpdated;
    const expectedDate = editorialUpdated?.split("-").reverse().join(".");

    const emergencyLinks = screen.getAllByRole("link", {
      name: /Akute Hilfe und Notfallkontakte/i,
    });
    expect(emergencyLinks.length).toBeGreaterThan(0);
    for (const link of emergencyLinks) {
      expect(link).toHaveAttribute("href", "/soforthilfe");
    }
    expect(
      screen.getByText(
        new RegExp(`Redaktioneller Stand der Erklärung: ${expectedDate}`)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/30\.04\.2026 – frühere Prüfangabe im Projekt/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Freigabe des aktuellen Stands ausstehend")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Stand der Erklärung: 30.04.2026")
    ).not.toBeInTheDocument();
  });
});
