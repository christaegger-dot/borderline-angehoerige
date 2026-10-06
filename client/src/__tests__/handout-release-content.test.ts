import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
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
      expect(version.standLine.trim(), `${version.id} standLine`).toMatch(
        /Stand:|Redaktionell aktualisiert:/
      );
    }
  });

  it("keeps operational contact details out of crisis handout text versions", () => {
    const krisenkommunikation = textFor("krisenkommunikation");
    const notfallplan = textFor("notfallplan-krise");
    const contactNumberPattern =
      /\b(?:112|117|143|144|145)\b|058\s*384|0800\s*33\s*66\s*55|0848\s*800\s*858/i;

    expect(krisenkommunikation).toContain("Akute Hilfe und Notfallkontakte");
    expect(notfallplan).toMatch(/Soforthilfe-Seite/);
    expect(`${krisenkommunikation} ${notfallplan}`).not.toMatch(
      contactNumberPattern
    );
    expect(allHandoutText).not.toContain("044 384 21 11");
  });

  it("keeps recovery numbers contextual instead of presenting isolated percentages", () => {
    expect(textFor("genesung-zahlen")).not.toContain('"77%"');
    expect(textFor("genesung-zahlen")).toMatch(
      /keine (individuelle|persönliche) Prognose/
    );
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
    expect(textFor("gehirn")).toContain("kein «typisches Borderline-Gehirn»");
    expect(textFor("gehirn")).toContain("Verstehen ist nicht entschuldigen");
    expect(textFor("gehirn")).toContain(
      "Mehrere Informationen oder Ziele gleichzeitig präsent zu halten"
    );
    expect(textFor("gehirn")).not.toMatch(
      /Impulse zu steuern|Impulskontrolle/i
    );
    expect(textFor("gehirn")).not.toContain("Orientierung für Angehörige");
  });

  it("replaces the fixed four-phase cycle with a non-linear state map", () => {
    const stateMap = textFor("zustands-landkarte");

    expect(stateMap).toContain("keine nummerierten Stufen");
    expect(stateMap).toContain("keine vorgeschriebene Reihenfolge");
    expect(stateMap).toContain("keine unvermeidliche Eskalation");
    expect(stateMap).toContain("kein Regulierungsauftrag");
    expect(stateMap).toContain("nicht automatisch gekoppelt");
    expect(stateMap).toContain("Kontakt gewünscht");
    expect(stateMap).not.toMatch(/voneinander unabhäng|Nähe hilfreich/i);
    expect(stateMap).not.toMatch(/Phase 1|Phase 2|Phase 3|Phase 4|Explosion/);
  });

  it("does not connect Family Connections to the invalid PubMed entry", () => {
    const quellenPage = readFileSync("client/src/pages/Quellen.tsx", "utf8");

    expect(quellenPage).not.toContain("15943545");
  });
});
