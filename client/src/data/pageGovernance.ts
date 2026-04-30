export type RiskLevel = "high" | "medium" | "low";

export interface PageGovernance {
  riskLevel: RiskLevel;
  lastReviewed?: string; // YYYY-MM-DD
  nextReviewDue?: string;
  owner?: string;
}

export const pageGovernance: Record<string, PageGovernance> = {
  "/soforthilfe": {
    riskLevel: "high",
  },
  "/notfallkarte": {
    riskLevel: "high",
  },
  "/unterstuetzen/krise": {
    riskLevel: "high",
  },
  "/diagnostik": {
    riskLevel: "high",
  },
  "/begleiterkrankungen": {
    riskLevel: "high",
  },
  "/grenzen": {
    riskLevel: "high",
  },
  "/verstehen": {
    riskLevel: "medium",
  },
  "/kommunizieren": {
    riskLevel: "medium",
  },
  "/selbstfuersorge": {
    riskLevel: "medium",
  },
};
