import { fireEvent, render, screen } from "@testing-library/react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { pageGovernance } from "@/data/pageGovernance";
import { PERSONAL_NOTFALLKARTE_PATH } from "@/domain/notfallkarte";
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

vi.mock("framer-motion", () => ({
  motion: new Proxy(
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
  ),
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("Datenschutz", () => {
  it("explains local browser storage for the personal notfallkarte", () => {
    render(<Datenschutz />);

    const sectionToggle = screen.getByRole("button", {
      name: /Persönliche Notfallkarte und lokale Speicherung/i,
    });
    expect(sectionToggle).toBeInTheDocument();
    fireEvent.click(sectionToggle);
    expect(document.body).toHaveTextContent(
      /lokal im Browser auf Ihrem Gerät/i
    );
    expect(document.body).toHaveTextContent(
      /nicht an einen Server dieser Website übertragen/i
    );
    expect(
      screen.getByText(/gemeinsam genutzten Geräten/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/«Daten löschen»/i)).toBeInTheDocument();

    const cookiesToggle = screen.getByRole("button", {
      name: /Cookies/i,
    });
    fireEvent.click(cookiesToggle);
    expect(document.body).toHaveTextContent(
      /verwendet für ihre Einträge kein Cookie/i
    );
  });

  it("links the related card to the personal notfallkarte and keeps the stand in sync", () => {
    render(<Datenschutz />);

    const lastReviewed = pageGovernance["/datenschutz"]?.lastReviewed;
    const expectedDate = lastReviewed?.split("-").reverse().join(".");

    expect(
      screen.getByRole("link", { name: /persönliche notfallkarte/i })
    ).toHaveAttribute("href", PERSONAL_NOTFALLKARTE_PATH);
    expect(
      screen.getByText(new RegExp(`Stand der Erklärung: ${expectedDate}`))
    ).toBeInTheDocument();
  });
});
