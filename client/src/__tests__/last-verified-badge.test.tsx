import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
} from "@/data/pageGovernance";

const originalGenesung = { ...pageGovernance["/genesung"] };

describe("LastVerifiedBadge", () => {
  afterEach(() => {
    pageGovernance["/genesung"] = { ...originalGenesung };
  });

  it("prefers governance dates when a path is provided", () => {
    pageGovernance["/genesung"] = {
      riskLevel: "medium",
      lastReviewed: "2026-04-30",
      nextReviewDue: "2027-04-30",
      owner: "Fachstelle Angehörigenarbeit",
    };

    render(<LastVerifiedBadge path="/genesung" date="16.04.2026" />);

    expect(
      screen.getByText("Frühere Prüfangabe: 30.04.2026")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Frühere Prüfangaben belegen keine Freigabe des aktuellen Stands. ${CURRENT_PUBLICATION_STATUS.notice}`
      )
    ).toBeVisible();
  });

  it("falls back to the explicit date when no governance metadata exists", () => {
    render(<LastVerifiedBadge date="24.03.2026" />);

    expect(screen.getByText("Stand: 24.03.2026")).toBeInTheDocument();
  });

  it("makes an overdue review visible without changing the verified date", () => {
    pageGovernance["/genesung"] = {
      riskLevel: "high",
      contactCheck: {
        date: "2026-09-22",
        scope: "Kontaktweg",
        source: "https://example.com",
      },
      lastReviewed: "2026-04-30",
      nextReviewDue: "2026-09-24",
    };

    render(<LastVerifiedBadge path="/genesung" />);

    expect(
      screen.getByText(
        "Früherer Kontaktabgleich: 22.09.2026 · erneute Prüfung ausstehend seit 24.09.2026"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/bestätigt keine heutige Erreichbarkeit/)
    ).toBeVisible();
  });

  it("does not treat a text update as a clinical review when no review date is recorded", () => {
    pageGovernance["/genesung"] = {
      riskLevel: "medium",
      editorialUpdated: "2026-10-06",
    };

    render(<LastVerifiedBadge path="/genesung" />);

    expect(screen.getByText("Text aktualisiert: 06.10.2026")).toBeVisible();
    expect(screen.queryByText(/Frühere Prüfangabe:/)).not.toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(CURRENT_PUBLICATION_STATUS.notice))
    ).toBeVisible();
  });
});
