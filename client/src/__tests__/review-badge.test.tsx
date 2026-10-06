import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ReviewBadge from "@/components/ReviewBadge";
import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
} from "@/data/pageGovernance";

const originalDiagnostik = { ...pageGovernance["/verstehen/diagnostik"] };
const originalSoforthilfe = { ...pageGovernance["/soforthilfe"] };

describe("ReviewBadge", () => {
  afterEach(() => {
    pageGovernance["/verstehen/diagnostik"] = { ...originalDiagnostik };
    pageGovernance["/soforthilfe"] = { ...originalSoforthilfe };
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
      screen.getByText("Frühere Prüfangabe: 30.04.2026")
    ).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(
      screen.getByText("Freigabe des aktuellen Stands ausstehend")
    ).toBeVisible();
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
    expect(screen.getByText("Frühere Prüfangabe:")).toBeInTheDocument();
    expect(
      screen.getByText(
        "30.04.2026 – frühere Prüfangabe im Projekt; kein Nachweis einer Freigabe für den aktuellen Stand"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(CURRENT_PUBLICATION_STATUS.notice)
    ).toBeInTheDocument();
    expect(screen.getByText("Nächste Prüfung:")).toBeInTheDocument();
    expect(screen.getByText("31.10.2026")).toBeInTheDocument();
    expect(screen.getByText("Projektzuordnung:")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fachstelle Angehörigenarbeit; namentlich verantwortete Freigabe ausstehend"
      )
    ).toBeInTheDocument();
  });

  it("separates a text update from clinical review and flags overdue review", () => {
    pageGovernance["/soforthilfe"] = {
      riskLevel: "high",
      lastReviewed: "2020-04-30",
      editorialUpdated: "2026-09-22",
      nextReviewDue: "2020-07-31",
    };
    render(<ReviewBadge path="/soforthilfe" />);
    expect(
      screen.getByText("Text aktualisiert: 22.09.2026")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/30.04.2020 – frühere Prüfangabe im Projekt/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keine neue fachliche Freigabe/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/erneute Fachprüfung ausstehend/)
    ).toBeInTheDocument();
  });

  it("renders a fallback when no review date is present", () => {
    pageGovernance["/soforthilfe"] = {
      riskLevel: "high",
    };

    render(<ReviewBadge path="/soforthilfe" />);

    expect(
      screen.getByText("Keine frühere Prüfangabe im Projekt vermerkt")
    ).toBeInTheDocument();
  });
});
