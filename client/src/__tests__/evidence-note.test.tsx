import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvidenceNote from "@/components/EvidenceNote";

describe("EvidenceNote", () => {
  it("groups scientific and service sources and renders the review date", () => {
    render(
      <EvidenceNote
        title="Quellenhinweis"
        reviewDate="24.03.2026"
        sources={[
          {
            label: "APA Practice Guideline",
            href: "https://example.com/apa",
            type: "wissenschaft",
          },
          {
            label: "PUK Zürich",
            href: "https://example.com/puk",
            type: "versorgung",
            note: "Regionale Versorgung",
          },
        ]}
      />
    );

    expect(screen.getByText("Wissenschaftliche Evidenz")).toBeInTheDocument();
    expect(screen.getByText("Versorgung / Hilfe")).toBeInTheDocument();
    expect(
      screen.getByText(/Zuletzt redaktionell geprüft: 24\.03\.2026/)
    ).toBeInTheDocument();
    expect(screen.getByText(/PUK Zürich/)).toBeInTheDocument();
    expect(screen.getByText(/Regionale Versorgung/)).toBeInTheDocument();
  });
});
