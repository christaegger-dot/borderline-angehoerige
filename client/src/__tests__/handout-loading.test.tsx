import { act, cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import type { HandoutTextVersion } from "@/content/handoutTextVersionTypes";
import { createHandoutTextVersionMeta } from "@/content/handoutTextVersionRegistry";
import HandoutTextPage from "@/pages/HandoutTextPage";

const loader = vi.hoisted(() => ({
  getHandoutTextVersion: vi.fn(),
  loadHandoutTextVersion: vi.fn(),
}));

vi.mock("@/content/handoutTextVersions", async importOriginal => ({
  ...(await importOriginal<typeof import("@/content/handoutTextVersions")>()),
  ...loader,
}));

vi.mock("@/components/Layout", () => ({
  default: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));

function pageFor(handoutId: string) {
  return (
    <Router>
      <HandoutTextPage params={{ handoutId }} />
    </Router>
  );
}

beforeEach(() => {
  loader.getHandoutTextVersion.mockReset().mockReturnValue(null);
  loader.loadHandoutTextVersion.mockReset();
});

afterEach(cleanup);

describe("handout loading recovery", () => {
  it("replaces loading placeholders with an alert and a full-page retry link", async () => {
    loader.loadHandoutTextVersion.mockRejectedValue(new Error("Offline"));

    render(pageFor("warnsignale"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Bitte prüfen Sie Ihre Internetverbindung"
    );
    expect(
      screen.getByRole("link", { name: "Seite erneut laden" })
    ).toHaveAttribute("href", "/materialien/text/warnsignale");
    expect(
      screen.queryByText(/wird geladen|werden geladen|Textversion lädt/)
    ).not.toBeInTheDocument();
    expect(loader.loadHandoutTextVersion).toHaveBeenCalledTimes(1);
  });

  it("also stops loading when no content is returned for a registered handout", async () => {
    loader.loadHandoutTextVersion.mockResolvedValue(null);

    render(pageFor("gespraeche-kippen"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(
      screen.queryByText("Die barrierefreie Darstellung wird geladen.")
    ).not.toBeInTheDocument();
  });

  it("ignores a failed request after navigation to a different handout", async () => {
    let rejectPrevious: (error: Error) => void = () => {};
    const previousRequest = new Promise<HandoutTextVersion>(
      (_resolve, reject) => {
        rejectPrevious = reject;
      }
    );
    const nextHandout: HandoutTextVersion = {
      ...createHandoutTextVersionMeta("dear"),
      kicker: "Textversion",
      summary: "Geladene Testfassung",
      intro: ["Einleitung der Testfassung"],
      sections: [],
      sourceLine: "Testquelle",
      standLine: "Stand der Testfassung",
    };
    loader.loadHandoutTextVersion
      .mockReturnValueOnce(previousRequest)
      .mockResolvedValueOnce(nextHandout);

    const view = render(pageFor("warnsignale"));
    view.rerender(pageFor("dear"));
    await screen.findByText("Geladene Testfassung");

    await act(async () => {
      rejectPrevious(new Error("Late request failure"));
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Geladene Testfassung")).toBeInTheDocument();
  });
});
