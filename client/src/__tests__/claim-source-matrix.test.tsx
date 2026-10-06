import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FAQ, { faqCategories } from "@/pages/FAQ";
import Glossar, { glossaryTerms } from "@/pages/Glossar";
import { claimById, claimSources, contentClaims } from "@/content/claimSources";
import { slugifyTerm } from "@/lib/glossarAnchor";
import {
  buildClaimMatrix,
  buildCoreInventory,
  validateClaimSources,
} from "../../../qa/scripts/audit-claim-sources";

afterEach(cleanup);

describe("Aussagen- und Quellenmatrix", () => {
  it("covers every actual FAQ question and renders its sources next to the answer", () => {
    render(<FAQ />);
    // Every authored question contains '?'; the existing filter opens matches.
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "?" } });
    const questions = faqCategories.flatMap(category => category.questions);
    const referencedIds = new Set<string>();

    for (const question of questions) {
      expect(question.claimIds.length).toBeGreaterThan(0);
      for (const id of question.claimIds) {
        referencedIds.add(id);
        const claim = claimById(id);
        const location = claim.locations.find(item => item.path === "/faq")!;
        expect(location).toBeDefined();
        const answer = document.querySelector(
          `[data-faq-id="${location.anchor}"]`
        );
        expect(answer).toBeVisible();
        expect(document.getElementById(location.anchor)?.textContent).toContain(
          question.question
        );
        const evidence = answer?.querySelector(`[data-claim-id="${id}"]`);
        expect(evidence).toBeVisible();
        expect(evidence?.textContent).toContain(claim.limitation);
        expect(claim.evidenceStatus).not.toBe("unmapped");
        for (const reference of claim.sourceRefs) {
          expect(
            evidence?.querySelector(
              `[data-claim-source="${reference.sourceId}"]`
            )
          ).toHaveAttribute("href", claimSources[reference.sourceId].url);
          expect(evidence?.textContent).toContain(reference.locator);
          expect(evidence?.textContent).toContain(
            claimSources[reference.sourceId].version
          );
        }
      }
    }
    expect([...referencedIds].sort()).toEqual(
      contentClaims
        .filter(claim => claim.locations.some(item => item.path === "/faq"))
        .map(claim => claim.id)
        .sort()
    );
  });

  it("covers every glossary term including the criteria list and exposes the limited source status", () => {
    render(<Glossar />);
    const referencedIds = new Set<string>();
    for (const term of glossaryTerms) {
      const anchor = document.getElementById(`term-${slugifyTerm(term.term)}`);
      expect(anchor).not.toBeNull();
      for (const id of term.claimIds) {
        referencedIds.add(id);
        const claim = claimById(id);
        expect(anchor?.querySelector(`[data-claim-id="${id}"]`)).toBeVisible();
        for (const location of claim.locations)
          expect(document.getElementById(location.anchor)).not.toBeNull();
      }
    }
    expect([...referencedIds].sort()).toEqual(
      contentClaims
        .filter(claim => claim.locations.some(item => item.path === "/glossar"))
        .map(claim => claim.id)
        .sort()
    );
    expect(
      screen.getAllByText(/Heutiger Abruf nicht lesbar/).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Bisherige Zuordnung; heute kein neuer vollständiger Textreview/
      ).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Kontextbeleg; die konkrete Übertragung/).length
    ).toBeGreaterThan(0);
  });

  it("preserves exact source versions and does not invent specialist approval", () => {
    expect(() => validateClaimSources()).not.toThrow();
    for (const claim of contentClaims) {
      expect(claim.reviewStatus.reviewer).toBeNull();
      expect(claim.reviewStatus.approvedAt).toBeNull();
    }
    expect(claimSources.zgb.version).toContain("01.07.2026");
    expect(claimById("faq-kesb-melderecht").sourceRefs[0].locator).toContain(
      "314c"
    );
    expect(claimById("faq-fu-voraussetzungen").sourceRefs[0].locator).toContain(
      "426"
    );
    expect(claimSources.eggshells2020.version).toContain("Dezember 2020");
  });

  it("keeps the QA matrix and the deliberately unreviewed core text inventory aligned with current files", async () => {
    expect(
      readFileSync(resolve("qa/claim-source-matrix-2026-10-06.md"), "utf8")
    ).toBe(await buildClaimMatrix());
    expect(
      JSON.parse(
        readFileSync(resolve("qa/claim-source-core-inventory.json"), "utf8")
      )
    ).toEqual(buildCoreInventory());
  });
});
