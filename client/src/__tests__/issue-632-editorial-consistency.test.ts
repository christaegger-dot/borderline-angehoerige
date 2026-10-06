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

describe("Issue 632 redaktionelle Konsistenz", () => {
  it("grenzt Genesungsverantwortung auf Startseite und im Selbsttest eindeutig ab", () => {
    const home = normalizedSource("client/src/pages/Home.tsx");
    const selbsttest = readSource("client/src/components/Selbsttest.tsx");

    expect(home).toContain(
      "Sie sind nicht für die Genesung eines anderen Menschen verantwortlich."
    );
    expect(home).not.toContain(
      "Sie sind nicht allein für die Genesung eines anderen Menschen verantwortlich."
    );
    expect(selbsttest).toContain(
      "Behandlung und Genesung sind nicht Ihre Verantwortung."
    );
    expect(selbsttest).not.toContain(
      "Behandlung und Genesung bleiben nicht Ihre Verantwortung."
    );
  });

  it("verlinkt das Gespräch über die Diagnose auf den vorhandenen Diagnostik-Abschnitt", () => {
    const selbsttest = readSource("client/src/components/Selbsttest.tsx");
    const diagnostik = readSource("client/src/pages/Diagnostik.tsx");

    expect(selbsttest).toMatch(
      /href:\s*"\/verstehen\/diagnostik#ablehnung",\s*text:\s*"Über Diagnose sprechen"/
    );
    expect(diagnostik).toContain('id="ablehnung"');
  });

  it("hält die korrigierte Diagnostik-Erklärung und Kostenabklärung fest", () => {
    const diagnostik = normalizedSource("client/src/pages/Diagnostik.tsx");

    expect(diagnostik).toContain(
      "wer eine Borderline-Abklärung üblicherweise durchführt"
    );
    expect(diagnostik).toContain(
      "Klären Sie die Kostenübernahme bei der abklärenden Stelle und bei Ihrer Krankenversicherung vorab."
    );
    expect(diagnostik).not.toContain(
      "Klären Sie die Kostenübernahme bei der Fachstelle und Ihrer Versicherung vorab."
    );
  });

  it("spiegelt in der Gesprächshilfe, ohne Verlassenheitsangst zu unterstellen", () => {
    const stufenleiter = readSource(
      "client/src/components/interactive/ValidierungsStufenleiter.tsx"
    );

    expect(stufenleiter).toContain(
      "«Du hast gesagt, dass du dich heute allein gelassen gefühlt hast.»"
    );
    expect(stufenleiter).not.toContain(
      "«Wenn ich dich richtig verstehe, hast du Angst, verlassen zu werden.»"
    );
  });

  it("verspricht für zurückgehaltene Kommunikationsmaterialien nur die Textversion", () => {
    const kommunizieren = readSource("client/src/pages/Kommunizieren.tsx");

    expect(kommunizieren).toContain('title: "Materialien zur Kommunikation"');
    expect(kommunizieren).toContain(
      '"Als Textversion; die Druckfassungen werden überarbeitet."'
    );
    expect(kommunizieren).not.toContain(
      "Infografiken und Spickzettel zur Kommunikation – als PDF zum Mitnehmen."
    );
  });

  it("führt die Fachstellenberatung mit gemeinsamem Profil und offener Zugangsprüfung", () => {
    const diagnostik = normalizedSource("client/src/pages/Diagnostik.tsx");
    const selbstfuersorgeCheck = normalizedSource(
      "client/src/components/interactive/SelbstfuersorgeCheck.tsx"
    );

    expect(diagnostik).toContain(
      "Fachstelle Angehörigenarbeit der PUK kontaktieren"
    );
    for (const source of [diagnostik, selbstfuersorgeCheck]) {
      expect(source).toContain("fachstellenProfil.zugangHinweis");
      expect(source).toContain("fachstellenProfil.pruefHinweis");
      expect(source).not.toMatch(/berät kostenlos|Beratung kostet nichts/);
    }
    expect(`${diagnostik}\n${selbstfuersorgeCheck}`).not.toContain(
      "PUK-Angehörigenberatung"
    );
  });

  it("kennzeichnet Grenzen-Modelle als Ordnungshilfen und korrigiert das Prioritätenraster", () => {
    const grenzen = normalizedSource("client/src/pages/Grenzen.tsx");

    expect(grenzen).toContain(
      "Die folgenden vier Arten sind eine redaktionelle Ordnungshilfe. Sie sind keine fachliche Klassifikation, können sich überschneiden und legen nicht fest, welche Grenze für Sie richtig ist."
    );
    expect(grenzen).toContain(
      "Das folgende Raster ist eine redaktionelle Orientierungshilfe, keine fachliche Einstufung. Dringlichkeit und Belastung können sich je nach Situation verändern."
    );
    expect(grenzen).toContain("Eigene Gesundheit schützen");
    expect(grenzen).toContain(
      "Belastungen, die Ihre Gesundheit beeinträchtigen"
    );
    expect(grenzen).not.toContain("Sofort begrenzen");
    expect(grenzen).not.toContain("<li>Eigene Gesundheit</li>");
  });

  it("erhält Wahlfreiheit, belastungsfreie Krisensprache und realistische Schuldgefühle", () => {
    const grenzen = normalizedSource("client/src/pages/Grenzen.tsx");

    expect(grenzen).toContain(
      "Für Krisen nutzen wir die vereinbarten professionellen Hilfewege."
    );
    expect(grenzen).toContain(
      "Ob und wann ich weiterreden möchte, entscheide ich später."
    );
    expect(grenzen).toContain(
      "Erlaubnis, an einer Grenze festzuhalten, auch wenn Schuldgefühle bleiben."
    );
    expect(grenzen).toContain(
      "kann sich eher erholen. Schuldgefühle können dabei trotzdem bleiben"
    );
    expect(grenzen).not.toContain("Bei echten Notfällen");
    expect(grenzen).not.toContain(
      "Wir können es später weiterführen, wenn beide ruhiger sind."
    );
    expect(grenzen).not.toContain("ohne sich schuldig zu fühlen");
  });

  it("ordnet DEAR nicht mehr dem Kommunizieren-Teaser zu", () => {
    const grenzen = readSource("client/src/pages/Grenzen.tsx");

    expect(grenzen).toContain(
      '"Grenzen ruhig und klar formulieren: Validierung, verständliche Anliegen und Deeskalation."'
    );
    expect(grenzen).not.toContain(
      "Grenzen ruhig und klar formulieren: Validierung, DEAR-Technik und Deeskalation."
    );
  });

  it("zeigt den Beobachtungszeitraum als Kennzahl 10 Jahre", () => {
    const genesung = readSource("client/src/pages/Genesung.tsx");

    expect(genesung).toContain("<dt style={versalStyle}>10 Jahre</dt>");
    expect(genesung).not.toContain("<dt style={versalStyle}>Jahre</dt>");
  });

  it("führt die inhaltliche Weiter-Kette von Selbstfürsorge zu Genesung", () => {
    const selbstfuersorge = normalizedSource(
      "client/src/pages/Selbstfuersorge.tsx"
    );

    expect(selbstfuersorge).toContain(
      '<Link href="/genesung" className="editorial-link"> weiter zu Genesung'
    );
    expect(selbstfuersorge).toContain(
      '<Link href="/grenzen" className="editorial-link"> Grenzen setzen'
    );
  });
});
