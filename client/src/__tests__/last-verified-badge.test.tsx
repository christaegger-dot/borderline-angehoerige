import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import { pageGovernance } from "@/data/pageGovernance";

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
      screen.getByText("Zuletzt verifiziert: 30.04.2026")
    ).toBeInTheDocument();
  });

  it("falls back to the explicit date when no governance metadata exists", () => {
    render(<LastVerifiedBadge date="24.03.2026" />);

    expect(
      screen.getByText("Zuletzt verifiziert: 24.03.2026")
    ).toBeInTheDocument();
  });
});
