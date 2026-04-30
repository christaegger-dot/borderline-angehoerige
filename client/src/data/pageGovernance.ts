export type RiskLevel = "high" | "medium" | "low";

export interface PageGovernance {
  riskLevel: RiskLevel;
  lastReviewed?: string; // YYYY-MM-DD
  nextReviewDue?: string; // YYYY-MM-DD
  owner?: string;
}

const DEFAULT_OWNER = "Fachstelle Angehörigenarbeit";

export const pageGovernance: Record<string, PageGovernance> = {
  "/soforthilfe": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-07-31",
    owner: DEFAULT_OWNER,
  },
  "/notfallkarte": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-07-31",
    owner: DEFAULT_OWNER,
  },
  "/unterstuetzen/krise": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/diagnostik": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/begleiterkrankungen": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/grenzen": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/verstehen": {
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/kommunizieren": {
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/selbstfuersorge": {
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
};
