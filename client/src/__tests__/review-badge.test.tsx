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

  it("renders the review date, next review date, and owner", () => {
    pageGovernance["/verstehen/diagnostik"] = {
      riskLevel: "high",
      lastReviewed: "2026-04-30",
      nextReviewDue: "2026-10-31",
      owner: "Fachstelle Angehörigenarbeit",
    };

    render(<ReviewBadge path="/verstehen/diagnostik" />);

    expect(screen.getByText("Review & Governance")).toBeInTheDocument();
    expect(screen.getByText("Fachlicher Review:")).toBeInTheDocument();
    expect(screen.getByText("geprüft am 30.04.2026")).toBeInTheDocument();
    expect(screen.getByText("Nächste Prüfung:")).toBeInTheDocument();
    expect(screen.getByText("31.10.2026")).toBeInTheDocument();
    expect(screen.getByText("Verantwortlich:")).toBeInTheDocument();
    expect(
      screen.getByText("Fachstelle Angehörigenarbeit")
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
