import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { format, resolveConfig } from "prettier";
import {
  claimSources,
  contentClaims,
  type ClaimSourceId,
} from "../../client/src/content/claimSources";

const inventoryFile = "qa/claim-source-core-inventory.json";
const matrixFile = "qa/claim-source-matrix-2026-10-06.md";

/** Exact authoring scope. Imported components/data are listed separately. */
export const coreInventoryFiles = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Verstehen.tsx",
  "client/src/pages/VerstehenBeziehungen.tsx",
  "client/src/pages/Diagnostik.tsx",
  "client/src/pages/Begleiterkrankungen.tsx",
  "client/src/pages/UnterstuetzenUebersicht.tsx",
  "client/src/pages/UnterstuetzenAlltag.tsx",
  "client/src/pages/UnterstuetzenTherapie.tsx",
  "client/src/pages/UnterstuetzenKrise.tsx",
  "client/src/pages/Genesung.tsx",
  "client/src/pages/Grenzen.tsx",
  "client/src/pages/Kommunizieren.tsx",
  "client/src/pages/Selbstfuersorge.tsx",
  "client/src/components/AngehoerigenBeratung.tsx",
  "client/src/components/interactive/SelbstfuersorgeCheck.tsx",
  "client/src/components/LearningPath.tsx",
  "client/src/sections/VerstehenSupportSections.tsx",
  "client/src/content/kommunizieren.ts",
  "client/src/sections/KommunizierenPatternSections.tsx",
  "client/src/sections/SelbstfuersorgeExercisesSection.tsx",
  "client/src/sections/SelbstfuersorgeSignalsSection.tsx",
  "client/src/sections/SelbstfuersorgeRoleNotesSection.tsx",
  "client/src/content/selbstfuersorge-page.ts",
  "client/src/content/learningArchitecture.ts",
] as const;

const textProperties = new Set([
  "text",
  "desc",
  "description",
  "definition",
  "hinweis",
  "hint",
  "note",
  "title",
  "subtitle",
  "label",
  "name",
  "intro",
  "summary",
  "example",
  "calloutText",
  "statement",
  "placeholder",
  "question",
  "answer",
  "boundary",
  "learningGoal",
  "readerGoal",
  "purpose",
  "limitation",
]);

export function extractAuthoredText(file: string, root = process.cwd()) {
  const source = ts.createSourceFile(
    file,
    readFileSync(resolve(root, file), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const units: { id: string; file: string; line: number; statement: string }[] =
    [];
  const occurrences = new Map<string, number>();
  const add = (node: ts.Node, raw: string) => {
    const statement = raw.replace(/\s+/g, " ").trim();
    if (!statement || !/[a-zäöüß]/i.test(statement)) return;
    if (/^(https?:|\/|#)/.test(statement)) return;
    const occurrence = (occurrences.get(statement) ?? 0) + 1;
    occurrences.set(statement, occurrence);
    const digest = createHash("sha256")
      .update(`${file}\n${statement}\n${occurrence}`)
      .digest("hex")
      .slice(0, 16);
    units.push({
      id: `core-${digest}`,
      file,
      line:
        source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
      statement,
    });
  };
  const visit = (node: ts.Node) => {
    if (ts.isJsxText(node)) add(node, node.text);
    if (ts.isStringLiteralLike(node)) {
      const parent = node.parent;
      if (ts.isPropertyAssignment(parent) && parent.initializer === node) {
        if (
          textProperties.has(parent.name.getText(source).replace(/["']/g, ""))
        )
          add(node, node.text);
      } else if (ts.isJsxAttribute(parent)) {
        if (textProperties.has(parent.name.getText(source)))
          add(node, node.text);
      } else if (ts.isArrayLiteralExpression(parent)) {
        // Authored lists, including short safety instructions, must not be lost.
        add(node, node.text);
      } else if (node.text.length > 45 && /[.!?…:]/.test(node.text)) {
        // Longer string expressions can supply visible prose inside JSX.
        add(node, node.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}

function contextSources(file: string): ClaimSourceId[] {
  if (/Genesung/.test(file))
    return [
      "zanarini2010",
      "zanarini2012",
      "gunderson2011",
      "awmfPsychosozial2025",
    ];
  if (/Krise/.test(file)) return ["niceNg225", "niceCg78", "opferhilfeSchutz"];
  if (/Grenzen/.test(file)) return ["opferhilfeSchutz", "niceNg150"];
  if (/Kommunizieren/.test(file))
    return ["linehan1997", "linehan2015", "niceCg78"];
  if (/Selbstfuersorge|AngehoerigenBeratung/.test(file))
    return ["niceNg150", "bailey2013"];
  if (/Begleiterkrankungen/.test(file)) return ["shah2018", "niceCg78"];
  if (/Diagnostik/.test(file))
    return ["niceCg78", "dsm5tr", "icd11", "bagBerufsgeheimnis"];
  if (/Therapie/.test(file)) return ["niceCg78", "storebo2020", "apa2024"];
  return ["niceCg78", "niceNg150"];
}

export function buildCoreInventory(root = process.cwd()) {
  return {
    schemaVersion: 1,
    recordedAt: "2026-10-06",
    scope:
      "Vollständiges Textstelleninventar der explizit aufgeführten TS/TSX-Autorendateien. Eine Textstelle kann mehrere Teilaussagen oder nur einen redaktionellen Titel enthalten. Keine Vollständigkeitsbehauptung für die gesamte Website, dynamische externe Daten, Downloads oder nicht aufgeführte Komponenten.",
    extraction:
      "JSX-Text, textführende Eigenschaften und Autorenlisten ohne Mindestlänge; technische IDs/URLs/Stile sind nicht Textstellen. Keine automatische medizinische oder rechtliche Bewertung.",
    sourceAssignment:
      "Die genannten Quellen sind nur Themenkontext. Sie belegen nicht automatisch jede einzelne Formulierung. Fachliche Einzelzuordnung und Prüfung bleiben unknown.",
    files: [...coreInventoryFiles],
    entries: coreInventoryFiles.flatMap(file =>
      extractAuthoredText(file, root).map(unit => ({
        ...unit,
        contextSourceIds: contextSources(file),
        evidenceStatus: "not-assessed" as const,
        clinicalReview: "unknown" as const,
        swissLegalReview: "unknown" as const,
        reviewer: null,
        approvedAt: null,
      }))
    ),
  };
}

function cell(text: string) {
  return text.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

export async function buildClaimMatrix() {
  const faqClaims = contentClaims.filter(claim =>
    claim.locations.some(location => location.path === "/faq")
  );
  const faqAnchors = new Set(
    faqClaims.flatMap(claim => claim.locations.map(location => location.anchor))
  );
  const lines = [
    "# Aussagen- und Quellenmatrix · 06.10.2026",
    "",
    `Kanonische Einzelzuordnung: \`client/src/content/claimSources.ts\`. Erfasst sind alle **${faqAnchors.size} FAQ-Fragen** mit **${faqClaims.length} Teilaussagen** sowie die **22 Glossarbegriffe** und ihre DSM-Kriterienliste. Gesprächsbeispiele, normative Rollenklärungen und vereinfachte Übertragungen werden als redaktionell/context von direkten Tatsachenbelegen getrennt.`,
    `Zusätzlich sind **${contentClaims.filter(claim => claim.id.startsWith("core-")).length} risikorelevante Kernteilaussagen** mit eigenen Standorten und Fundstellen kuratiert. Das zusätzliche regelbasierte Textstelleninventar hat einen weiter gefassten, ausdrücklich ungeprüften Umfang.`,
    "",
    "Die Quellen stehen in FAQ und Glossar beim jeweiligen Inhalt. `supported` bezeichnet einen redaktionellen Quellenabgleich innerhalb der dokumentierten Reichweite. Es ist keine klinische, rechtliche, institutionelle oder Publikationsfreigabe. Menschliche Prüfer und Freigabedatum bleiben null; erforderliche Fachprüfungen pending. `carried-forward` bedeutet Bestandserhalt, keinen neuen Volltextreview. HTTP-Erfolg allein wird nicht als Fachprüfung ausgegeben.",
    "",
    "## Quellen und Versionen",
    "",
    "| ID | Quelle / Version | Abgleich und Reichweite |",
    "| --- | --- | --- |",
    ...Object.entries(claimSources).map(
      ([id, source]) =>
        `| ${id} | [${cell(source.label)}](${source.url}); ${cell(source.version)} | ${source.access}; ${source.checkedAt ?? "kein neuer bestätigter Abgleich"}. ${cell(source.accessNote)} ${cell(source.scope)} |`
    ),
    "",
    "## Einzelne Aussagen",
    "",
    "| ID / Aussage | Verwendungsort | Quelle / Fundstelle / Reichweite | Prüfstatus und Einschränkung |",
    "| --- | --- | --- | --- |",
    ...contentClaims.map(
      claim =>
        `| ${claim.id}: ${cell(claim.statement)} | ${claim.locations.map(location => `[${location.path}#${location.anchor}](${location.path}#${location.anchor}); ${location.file}`).join("; ")} | ${claim.sourceRefs.map(reference => `${reference.sourceId}: ${cell(reference.locator)} — ${cell(reference.scope)}`).join("; ") || "Redaktionelles Modell / keine unabhängig gelesene konkrete Ursprungsfassung"} | ${claim.evidenceStatus}; klinisch ${claim.reviewStatus.clinical}; CH-rechtlich ${claim.reviewStatus.swissLegal}. ${cell(claim.limitation)} |`
    ),
    "",
    "## Zusätzliches Kerntextinventar",
    "",
    "`qa/claim-source-core-inventory.json` enthält alle extrahierten Textstellen der dort explizit aufgeführten Kernseiten und eingebundenen Lern-/Beratungsdateien, jeweils mit genauer Datei, Position und Wortlaut. Fachliche Einzelzuordnung ist **not-assessed/unknown**; Themenquellen werden ausdrücklich nur als Kontext aufgeführt. Dieses Inventar macht weitere Prüfstellen sichtbar, ersetzt aber weder eine atomare manuelle Zerlegung aller Kerntexte noch eine Ganzwebsite-Matrix oder Freigabe.",
    "",
    "Die 15 Lernmodelle sind zusätzlich in `client/src/content/learningArchitecture.ts` mit Erklärung, Quellenrolle und unbekanntem klinischem Review inventarisiert. Quellen-/Modellrollen dürfen nicht automatisch als Prüfung einzelner Textstellen interpretiert werden.",
    "",
    "## Offene fachliche Arbeit",
    "",
    "- Klinische Prüfung des aktuellen FAQ-/Glossarwortlauts und seiner medizinischen/Sicherheitsübertragungen.",
    "- Schweizerisch-rechtliche Prüfung von FU, KESB/Kindesschutz, Vertraulichkeit sowie rollenabhängigen Pflichten und kantonalen Ergänzungen.",
    "- Atomare fachliche Quellenzuordnung aller Kerntextstellen, Downloads und weiterer Seiten ausserhalb des expliziten Inventars.",
    "- Direkter Review der aktuellen DSM-Kapitel und der konkreten SET-Ursprungsfassung; heutige WHO-/BAG-Abrufausfälle begründen keine neuen Textbestätigungen.",
    "",
    "## Reproduzierbare technische Prüfung",
    "",
    "`pnpm exec tsx qa/scripts/audit-claim-sources.ts --check` prüft Datensatz-IDs, Quellenreferenzen, Versions-/Scopefelder, Freigabetrennung sowie Parität von kanonischen Daten und QA-Artefakten. `--write` aktualisiert die Artefakte nach redaktionellen Änderungen. Die FAQ-/Glossar-Regressionstests prüfen jede vorhandene Frage/Definition, echte Inhaltsanker und die lokal gerenderten Quellen. Diese technischen Prüfungen sind keine Fachprüfung.",
    "",
  ];
  return format(lines.join("\n"), {
    ...(await resolveConfig(resolve(matrixFile))),
    filepath: resolve(matrixFile),
  });
}

export function validateClaimSources() {
  const ids = new Set<string>();
  for (const claim of contentClaims) {
    if (!claim.id || ids.has(claim.id))
      throw new Error(`Doppelte/leere Claim-ID: ${claim.id}`);
    ids.add(claim.id);
    if (!claim.statement || !claim.locations.length || !claim.limitation)
      throw new Error(`Unvollständiger Claim: ${claim.id}`);
    if (
      !claim.sourceRefs.length &&
      !["editorial", "unmapped"].includes(claim.evidenceStatus)
    )
      throw new Error(`Unbelegte Tatsachenbehauptung: ${claim.id}`);
    for (const reference of claim.sourceRefs) {
      const source = claimSources[reference.sourceId];
      if (!source || !reference.locator || !reference.scope)
        throw new Error(`Unvollständige Quellenzuordnung: ${claim.id}`);
      if (
        !source.version ||
        !source.scope ||
        !source.accessNote ||
        !source.url.startsWith("https://")
      )
        throw new Error(`Unvollständige Quelle: ${reference.sourceId}`);
    }
    if (
      claim.reviewStatus.reviewer !== null ||
      claim.reviewStatus.approvedAt !== null
    )
      throw new Error(`Nicht belegte Freigabe: ${claim.id}`);
    if (
      claim.domains.includes("swiss-legal") &&
      claim.reviewStatus.swissLegal !== "pending"
    )
      throw new Error(`Fehlende offene Rechtsprüfung: ${claim.id}`);
    if (
      claim.domains.some(domain => ["medical", "safety"].includes(domain)) &&
      claim.reviewStatus.clinical !== "pending"
    )
      throw new Error(`Fehlende offene Fachprüfung: ${claim.id}`);
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  validateClaimSources();
  const inventory = buildCoreInventory();
  const matrix = await buildClaimMatrix();
  const artifacts = [
    [
      inventoryFile,
      await format(JSON.stringify(inventory), {
        ...(await resolveConfig(resolve(inventoryFile))),
        filepath: resolve(inventoryFile),
      }),
    ],
    [matrixFile, matrix],
  ] as const;
  if (process.argv.includes("--write")) {
    for (const [file, expected] of artifacts) writeFileSync(file, expected);
  } else {
    for (const [file, expected] of artifacts) {
      if (readFileSync(file, "utf8") !== expected)
        throw new Error(
          `Quellenartefakt nicht aktuell: ${file}; mit --write aktualisieren.`
        );
    }
  }
  console.log(
    `${contentClaims.length} kuratierte Aussagen; ${inventory.entries.length} Kerntextstellen in ${inventory.files.length} Dateien. Erforderliche Fach-/Rechtsprüfung bleibt offen.`
  );
}
