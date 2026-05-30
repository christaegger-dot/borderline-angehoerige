import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EvidenceNote from "@/components/EvidenceNote";

describe("EvidenceNote", () => {
  it("renders the editorial evidence note by default", () => {
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

    expect(screen.getByText(/Quellenhinweis \(2\)/)).toBeInTheDocument();
    expect(screen.getByText("APA Practice Guideline")).toBeInTheDocument();
    expect(screen.getByText("Versorgung / Hilfe")).toBeInTheDocument();
    expect(
      screen.getByText(/Zuletzt redaktionell geprüft: 24\.03\.2026/)
    ).toBeInTheDocument();
    expect(screen.getByText(/PUK Zürich/)).toBeInTheDocument();
    expect(screen.getByText(/Regionale Versorgung/)).toBeInTheDocument();
  });

  it("collapses the source list behind a details/summary toggle", () => {
    const { container } = render(
      <EvidenceNote
        title="Quellen"
        sources={[
          {
            label: "Studie A",
            href: "https://example.com/a",
            type: "wissenschaft",
          },
        ]}
      />
    );

    const details = container.querySelector(
      "details.evidence-note__disclosure"
    );
    expect(details).toBeInTheDocument();
    // standardmässig eingeklappt (kein open-Attribut)
    expect(details).not.toHaveAttribute("open");
    expect(container.querySelector("summary")).toBeInTheDocument();
  });
});
