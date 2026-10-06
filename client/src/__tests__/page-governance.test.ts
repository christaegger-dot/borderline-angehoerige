import { describe, expect, it } from "vitest";
import {
  CURRENT_PUBLICATION_STATUS,
  pageGovernance,
} from "@/data/pageGovernance";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const governanceBackedBadgePaths = [
  "/beratung",
  "/verstehen/begleiterkrankungen",
  "/datenschutz",
  "/verstehen/diagnostik",
  "/fachstelle",
  "/faq",
  "/genesung",
  "/grenzen",
  "/quellen",
  "/unterstuetzen/alltag",
  "/unterstuetzen/krise",
  "/unterstuetzen/therapie",
] as const;

describe("pageGovernance", () => {
  it("preserves review metadata for high-risk pages without inventing review dates", () => {
    const highRiskEntries = Object.entries(pageGovernance).filter(
      ([, meta]) => meta.riskLevel === "high"
    );

    expect(highRiskEntries.length).toBeGreaterThan(0);

    for (const [path, meta] of highRiskEntries) {
      if (meta.lastReviewed) {
        expect(meta.lastReviewed, `${path} needs a valid review date`).toMatch(
          isoDatePattern
        );
        expect(meta.nextReviewDue, `${path} needs nextReviewDue`).toMatch(
          isoDatePattern
        );
      } else {
        expect(CURRENT_PUBLICATION_STATUS.clinicalReview).toBe("pending");
        expect(meta.editorialUpdated).toMatch(isoDatePattern);
      }
      expect(meta.owner, `${path} needs owner`).toBeTruthy();
    }
  });

  it("keeps current approval open despite historical review dates", () => {
    expect(CURRENT_PUBLICATION_STATUS.clinicalReview).toBe("pending");
    expect(CURRENT_PUBLICATION_STATUS.institutionalDecision).toBe("pending");
    expect(CURRENT_PUBLICATION_STATUS.publicationApproval).toBe("pending");
    expect(pageGovernance["/verstehen/diagnostik"].editorialUpdated).toBe(
      "2026-10-06"
    );
    expect(pageGovernance["/verstehen/diagnostik"].lastReviewed).toBe(
      "2026-04-30"
    );
    expect(pageGovernance["/soforthilfe"].nextReviewDue).toBe("2026-07-31");
  });

  it("does not restore governance entries for the retired emergency card routes", () => {
    expect(pageGovernance["/notfallkarte"]).toBeUndefined();
    expect(pageGovernance["/notfallkarte/erstellen"]).toBeUndefined();
  });

  it("uses future review due dates after the last review date", () => {
    for (const [path, meta] of Object.entries(pageGovernance)) {
      if (!meta.lastReviewed || !meta.nextReviewDue) continue;

      expect(
        meta.nextReviewDue > meta.lastReviewed,
        `${path} nextReviewDue must be after lastReviewed`
      ).toBe(true);
    }
  });

  it("covers every path-backed review or verification badge", () => {
    for (const path of governanceBackedBadgePaths) {
      expect(
        pageGovernance[path],
        `${path} needs governance metadata for badge rendering`
      ).toBeDefined();
      expect(
        pageGovernance[path]?.lastReviewed,
        `${path} needs lastReviewed for LastVerifiedBadge`
      ).toMatch(isoDatePattern);
    }
  });
});
