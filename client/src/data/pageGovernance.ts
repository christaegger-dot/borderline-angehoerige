export type RiskLevel = "high" | "medium" | "low";

export interface PageGovernance {
  riskLevel: RiskLevel;
  lastReviewed?: string; // YYYY-MM-DD: documented clinical review, never a build date
  editorialUpdated?: string; // Text update; not a new clinical sign-off
  contactCheck?: { date: string; scope: string; source: string };
  nextReviewDue?: string; // YYYY-MM-DD
  owner?: string;
}

const DEFAULT_OWNER = "Fachstelle Angehörigenarbeit";

export const pageGovernance: Record<string, PageGovernance> = {
  "/": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/unterstuetzen/uebersicht": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/wegweiser": {
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/soforthilfe": {
    editorialUpdated: "2026-09-23",
    contactCheck: {
      date: "2026-09-22",
      scope: "Die drei PUK-Notfallnummern (Kinder, Erwachsene, ab 65)",
      source:
        "https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/",
    },
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-07-31",
    owner: DEFAULT_OWNER,
  },
  "/notfallkarte": {
    contactCheck: {
      date: "2026-09-22",
      scope: "Die drei PUK-Notfallnummern (Kinder, Erwachsene, ab 65)",
      source:
        "https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/",
    },
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-07-31",
    owner: DEFAULT_OWNER,
  },
  "/notfallkarte/erstellen": {
    contactCheck: {
      date: "2026-09-22",
      scope: "Die drei PUK-Notfallnummern (Kinder, Erwachsene, ab 65)",
      source:
        "https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/",
    },
    editorialUpdated: "2026-09-22",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-07-31",
    owner: DEFAULT_OWNER,
  },
  "/unterstuetzen/krise": {
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/verstehen/diagnostik": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/verstehen/beziehungen": {
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-09-20",
    nextReviewDue: "2027-03-31",
    owner: DEFAULT_OWNER,
  },
  "/verstehen/begleiterkrankungen": {
    editorialUpdated: "2026-09-22",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/grenzen": {
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/beratung": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/datenschutz": {
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/quellen": {
    editorialUpdated: "2026-09-22",
    riskLevel: "high",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2026-10-31",
    owner: DEFAULT_OWNER,
  },
  "/faq": {
    riskLevel: "high",
    lastReviewed: "2026-04-16",
    nextReviewDue: "2026-10-16",
    owner: DEFAULT_OWNER,
  },
  "/unterstuetzen/therapie": {
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-04-16",
    nextReviewDue: "2026-10-16",
    owner: DEFAULT_OWNER,
  },
  "/fachstelle": {
    contactCheck: {
      date: "2026-09-22",
      scope: "Telefon und Zugang zur Angehörigenberatung",
      source:
        "https://www.pukzh.ch/patienten-angehoerige/informationen-fuer-angehoerige/",
    },
    editorialUpdated: "2026-09-23",
    riskLevel: "high",
    lastReviewed: "2026-03-24",
    nextReviewDue: "2026-09-24",
    owner: DEFAULT_OWNER,
  },
  "/verstehen": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/genesung": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/kommunizieren": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/selbstfuersorge": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-30",
    nextReviewDue: "2027-04-30",
    owner: DEFAULT_OWNER,
  },
  "/unterstuetzen/alltag": {
    editorialUpdated: "2026-09-23",
    riskLevel: "medium",
    lastReviewed: "2026-04-16",
    nextReviewDue: "2027-04-16",
    owner: DEFAULT_OWNER,
  },
};
