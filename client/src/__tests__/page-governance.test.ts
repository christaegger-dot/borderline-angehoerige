import { describe, expect, it } from "vitest";
import { pageGovernance } from "@/data/pageGovernance";

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
  "/notfallkarte",
  "/notfallkarte/erstellen",
  "/quellen",
  "/unterstuetzen/alltag",
  "/unterstuetzen/krise",
  "/unterstuetzen/therapie",
] as const;

describe("pageGovernance", () => {
  it("sets review metadata for every high-risk page", () => {
    const highRiskEntries = Object.entries(pageGovernance).filter(
      ([, meta]) => meta.riskLevel === "high"
    );

    expect(highRiskEntries.length).toBeGreaterThan(0);

    for (const [path, meta] of highRiskEntries) {
      expect(meta.lastReviewed, `${path} needs lastReviewed`).toMatch(
        isoDatePattern
      );
      expect(meta.nextReviewDue, `${path} needs nextReviewDue`).toMatch(
        isoDatePattern
      );
      expect(meta.owner, `${path} needs owner`).toBeTruthy();
    }
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
