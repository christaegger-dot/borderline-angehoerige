import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function normalizedSource(relativePath: string): string {
  return readSource(relativePath).replace(/\s+/g, " ");
}

describe("Issue 633 fachliche Quellen und Tatsachen", () => {
  it("ersetzt die falsche Lamberti-Zuordnung durch Qian und differenziert Trauma", () => {
    const verstehen = normalizedSource("client/src/pages/Verstehen.tsx");
    const quellen = normalizedSource("client/src/pages/Quellen.tsx");

    expect(`${verstehen} ${quellen}`).not.toContain("Lamberti");
    expect(verstehen).toContain("Qian et al. (2022)");
    expect(quellen).toContain("10.1371/journal.pone.0279015");
    expect(verstehen).toContain("viele, aber nicht alle Menschen");
    expect(verstehen).toContain("weder notwendig noch hinreichend");
    expect(quellen).toContain("10.1111/acps.13118");
  });

  it("belegt die direkte Suizidansprache ohne Krisenwege umzuschreiben", () => {
    const verstehen = normalizedSource("client/src/pages/Verstehen.tsx");
    const quellen = normalizedSource("client/src/pages/Quellen.tsx");

    expect(verstehen).toContain(
      "Solche Fragen lösen nach heutigem Wissensstand keine suizidale Handlung aus"
    );
    expect(verstehen).toContain('href="/soforthilfe"');
    expect(quellen).toContain("Suicide: Questions and answers");
    expect(quellen).toContain(
      "https://www.who.int/news-room/questions-and-answers/item/suicide"
    );
  });

  it("trennt DSM-5-TR, ICD-11 und den Schweizer stationären Kodierkontext", () => {
    const diagnostik = normalizedSource("client/src/pages/Diagnostik.tsx");

    expect(diagnostik).toContain("neun Kriterien");
    expect(diagnostik).toContain("mindestens fünf");
    expect(diagnostik).toContain(
      "anhaltendes, situationsübergreifendes Muster"
    );
    expect(diagnostik).toContain("Borderline-Muster 6D11.5");
    expect(diagnostik).toContain("ICD-10-GM 2024");
    expect(diagnostik).toContain("F60.31");
    expect(diagnostik).toContain(
      "Wer führt eine Borderline-Abklärung üblicherweise durch?"
    );
    expect(diagnostik).not.toContain("wer sie stellen darf");
  });

  it("ordnet Begleiterkrankungen ohne pauschale Rangfolge oder Prozentzahl ein", () => {
    const begleiterkrankungen = normalizedSource(
      "client/src/pages/Begleiterkrankungen.tsx"
    );

    expect(begleiterkrankungen).toContain(
      "Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung (ADHS)"
    );
    expect(begleiterkrankungen).toContain("keine Häufigkeitsrangliste");
    expect(begleiterkrankungen).toContain("Shah & Zanarini (2018)");
    expect(begleiterkrankungen).toContain("Weiner, Perroud & Weibel (2019)");
    expect(begleiterkrankungen).not.toMatch(/75\s*[–-]\s*80\s*%/);
    expect(begleiterkrankungen).not.toContain(
      "die häufigste Begleiterkrankung"
    );
  });

  it("weist die sechs Validierungsstufen Linehan zu und trennt die Kontexte", () => {
    const validation = normalizedSource(
      "client/src/components/interactive/ValidierungsStufenleiter.tsx"
    );

    expect(validation).toContain("Linehans Validierungsstufen");
    expect(validation).toContain("Linehan (1997)");
    expect(validation).toContain("Im biografischen Kontext verstehen");
    expect(validation).toContain("Im aktuellen Kontext nachvollziehen");
    expect(validation).toContain("Radikale Echtheit: auf Augenhöhe bleiben");
    expect(validation).toContain(
      "Nach einer öffentlichen Kritik verletzt und aufgewühlt zu sein"
    );
    expect(validation).toContain(
      "Eine unbekannte Biografie deuten oder einen Zusammenhang als Ursache behaupten"
    );
    expect(validation).not.toContain("Wenn du dich schnell verlassen fühlst");
  });

  it("kennzeichnet DEAR als Teilmenge von DEAR MAN und übersetzt Reinforce präzise", () => {
    const guides = normalizedSource("client/src/content/learningGuides.json");
    const exercise = normalizedSource(
      "client/src/components/interactive/KommunikationsUebung.tsx"
    );
    const glossary = normalizedSource("client/src/pages/Glossar.tsx");

    expect(guides).toContain(
      "DEAR sind die ersten vier inhaltlichen Schritte der DBT-Fertigkeit DEAR MAN"
    );
    expect(guides).toContain("Mindful, Appear confident und Negotiate");
    expect(guides).toContain("Verstärken (positive Folgen benennen)");
    expect(guides).not.toContain("Nutzen erklären");
    expect(exercise).toContain('label: "DEAR"');
    expect(glossary).toContain("Describe (beschreiben)");
    expect(glossary).toContain("Mindful (achtsam beim Ziel bleiben)");
    expect(glossary).toContain("Negotiate (verhandeln)");
  });

  it("gleicht Warnsignale an fünf Bereiche an und entfernt Infektanfälligkeit", () => {
    const selfcare = normalizedSource(
      "client/src/content/selbstfuersorge-page.ts"
    );
    const section = normalizedSource(
      "client/src/sections/SelbstfuersorgeSignalsSection.tsx"
    );

    for (const title of [
      "Körper",
      "Gefühle",
      "Gedanken",
      "Verhalten",
      "Erholungsbedarf",
    ]) {
      expect(selfcare).toContain(`title: "${title}"`);
    }
    expect(selfcare).not.toContain("Infektanfälligkeit");
    expect(section).toContain("eigene didaktische Ordnung");
    expect(section).toContain("whoStress2026");
    expect(section).toContain("niceNg150");
  });

  it("belegt Angehörigenbelastung und Genesungsverlauf mit passenden Quellen", () => {
    const selfcare = normalizedSource("client/src/pages/Selbstfuersorge.tsx");
    const recovery = normalizedSource("client/src/pages/Genesung.tsx");

    expect(selfcare).toContain("Bailey & Grenyer (2013)");
    expect(selfcare).not.toContain("Hoffman et al., 2005");
    expect(recovery).toContain("(Zanarini et al., 2010)");
    expect(recovery).toContain("16-Jahres-Follow-up");
    expect(recovery).toContain("kein validiertes Fünf-Faktoren-Modell");
  });

  it("hält die veraltete DEAR-Druckgrafik bis zur Neugestaltung zurück", () => {
    const governance = normalizedSource(
      "client/src/content/handoutGovernance.ts"
    );

    expect(governance).toMatch(
      /dear:\s*\{[^}]*approvedVersion:\s*"puk-dear-v1"[^}]*visualAssetStatus:\s*"text-only"/
    );
    expect(
      fs.existsSync(
        path.join(repoRoot, "client/public/infografiken/puk-dear-v1.pdf")
      )
    ).toBe(false);
    expect(
      fs.existsSync(
        path.join(
          repoRoot,
          "qa/withheld-handouts/issue-633-fachquellen-2026-10-05/infografiken/puk-dear-v1.pdf"
        )
      )
    ).toBe(true);
  });
});
