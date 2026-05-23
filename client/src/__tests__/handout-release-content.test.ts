import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { kontaktByIdStrict } from "@/data/kontakte";
import { handoutTextVersions as genesungTextVersions } from "@/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as grenzenTextVersions } from "@/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as kommunizierenTextVersions } from "@/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as selbstfuersorgeTextVersions } from "@/content/handoutTextVersionContent/selbstfuersorge.content";
import { handoutTextVersions as soforthilfeTextVersions } from "@/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as unterstuetzenTextVersions } from "@/content/handoutTextVersionContent/unterstuetzen.content";
import { handoutTextVersions as verstehenTextVersions } from "@/content/handoutTextVersionContent/verstehen.content";
import type { HandoutTextVersion } from "@/content/handoutTextVersionTypes";

const allTextVersions: HandoutTextVersion[] = [
  ...genesungTextVersions,
  ...grenzenTextVersions,
  ...kommunizierenTextVersions,
  ...selbstfuersorgeTextVersions,
  ...soforthilfeTextVersions,
  ...unterstuetzenTextVersions,
  ...verstehenTextVersions,
];

function textFor(id: string) {
  const version = allTextVersions.find(item => item.id === id);
  if (!version) {
    throw new Error(`Missing handout text version in test fixture: ${id}`);
  }

  return JSON.stringify(version);
}

const allHandoutText = JSON.stringify(allTextVersions);

describe("handout release content guardrails", () => {
  it("keeps every productive handout text version with source and stand lines", () => {
    for (const version of allTextVersions) {
      expect(version.sourceLine.trim(), `${version.id} sourceLine`).not.toBe(
        ""
      );
      expect(version.standLine.trim(), `${version.id} standLine`).toContain(
        "Stand:"
      );
    }
  });

  it("keeps crisis communication and emergency plan numbers synced to kontakte.ts", () => {
    const krisenkommunikation = textFor("krisenkommunikation");
    const notfallplan = textFor("notfallplan-krise");

    for (const id of [
      "ROT_144",
      "ROT_117",
      "GELB_PUK_ERW",
      "GELB_PUK_KJP",
      "GELB_PUK_65",
      "GRUEN_143",
    ]) {
      const nummer = kontaktByIdStrict(id).nummer;
      expect(`${krisenkommunikation} ${notfallplan}`).toContain(nummer);
    }

    expect(krisenkommunikation).toContain("kein akuter Einsatzdienst");
    expect(allHandoutText).not.toContain("044 384 21 11");
  });

  it("keeps recovery numbers contextual instead of presenting isolated percentages", () => {
    expect(textFor("genesung-zahlen")).not.toContain('"77%"');
    expect(textFor("genesung-zahlen")).toContain("keine individuelle Prognose");
    expect(textFor("fortschritt-paradox")).not.toContain(
      "Jeder Rückschlag ist kürzer"
    );
    expect(textFor("remission-heilung")).not.toContain(
      "Remission ist das realistische Ziel"
    );
  });

  it("keeps neurobiology handouts in didactic language without hard brain claims", () => {
    const alarmUndGehirn = `${textFor("alarm-modus")} ${textFor("gehirn")}`;

    expect(alarmUndGehirn).not.toContain("Amygdala ist überaktiv");
    expect(alarmUndGehirn).not.toContain("präfrontale Kortex");
    expect(alarmUndGehirn).not.toContain("vorübergehend offline");
    expect(alarmUndGehirn).not.toContain("Polyvagal");
  });

  it("does not connect Family Connections to the invalid PubMed entry", () => {
    const quellenPage = readFileSync("client/src/pages/Quellen.tsx", "utf8");

    expect(quellenPage).not.toContain("15943545");
  });
});
