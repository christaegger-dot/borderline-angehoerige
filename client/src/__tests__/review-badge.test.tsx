import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ReviewBadge from "@/components/ReviewBadge";
import { pageGovernance } from "@/data/pageGovernance";

const originalDiagnostik = { ...pageGovernance["/verstehen/diagnostik"] };
const originalNotfallkarte = { ...pageGovernance["/notfallkarte"] };

describe("ReviewBadge", () => {
  afterEach(() => {
    pageGovernance["/verstehen/diagnostik"] = { ...originalDiagnostik };
    pageGovernance["/notfallkarte"] = { ...originalNotfallkarte };
  });

  it("renders a compact review summary by default", () => {
    pageGovernance["/verstehen/diagnostik"] = {
      riskLevel: "high",
      lastReviewed: "2026-04-30",
      nextReviewDue: "2026-10-31",
      owner: "Fachstelle Angehörigenarbeit",
    };

    render(<ReviewBadge path="/verstehen/diagnostik" />);

    expect(
      screen.getByText("Fachlich geprüft: 30.04.2026")
    ).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.queryByText("Stand und Prüfung")).not.toBeInTheDocument();
  });

  it("keeps detailed review metadata available", () => {
    pageGovernance["/verstehen/diagnostik"] = {
      riskLevel: "high",
      lastReviewed: "2026-04-30",
      nextReviewDue: "2026-10-31",
      owner: "Fachstelle Angehörigenarbeit",
    };

    render(<ReviewBadge path="/verstehen/diagnostik" variant="detailed" />);

    expect(screen.getByText("Stand und Prüfung")).toBeInTheDocument();
    expect(screen.getByText("Fachlicher Review:")).toBeInTheDocument();
    expect(screen.getByText("geprüft am 30.04.2026")).toBeInTheDocument();
    expect(screen.getByText("Nächste Prüfung:")).toBeInTheDocument();
    expect(screen.getByText("31.10.2026")).toBeInTheDocument();
    expect(screen.getByText("Verantwortlich:")).toBeInTheDocument();
    expect(
      screen.getByText("Fachstelle Angehörigenarbeit")
    ).toBeInTheDocument();
  });

  it("separates a text update from clinical review and flags overdue review", () => {
    pageGovernance["/notfallkarte"] = {
      riskLevel: "high",
      lastReviewed: "2020-04-30",
      editorialUpdated: "2026-09-22",
      nextReviewDue: "2020-07-31",
    };
    render(<ReviewBadge path="/notfallkarte" />);
    expect(
      screen.getByText("Text aktualisiert: 22.09.2026")
    ).toBeInTheDocument();
    expect(screen.getByText("geprüft am 30.04.2020")).toBeInTheDocument();
    expect(
      screen.getByText(/keine neue fachliche Freigabe/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/erneute Fachprüfung ausstehend/)
    ).toBeInTheDocument();
  });

  it("renders a fallback when no review date is present", () => {
    pageGovernance["/notfallkarte"] = {
      riskLevel: "high",
    };

    render(<ReviewBadge path="/notfallkarte" />);

    expect(
      screen.getByText("Noch kein Reviewdatum gesetzt")
    ).toBeInTheDocument();
  });
});
