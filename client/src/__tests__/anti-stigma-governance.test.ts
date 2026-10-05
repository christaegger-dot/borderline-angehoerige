import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getHandoutGovernance,
  isHandoutVisualPublished,
} from "@/content/handoutGovernance";
import { HANDOUT_TEXT_VERSION_IDS } from "@/content/handoutTextMetas";
import { collectReferencedInfografikAssets } from "@/content/infografikAssetRefs";
import { handoutTextVersions as genesungTextVersions } from "@/content/handoutTextVersionContent/genesung.content";
import { handoutTextVersions as kommunizierenTextVersions } from "@/content/handoutTextVersionContent/kommunizieren.content";
import { handoutTextVersions as grenzenTextVersions } from "@/content/handoutTextVersionContent/grenzen.content";
import { handoutTextVersions as soforthilfeTextVersions } from "@/content/handoutTextVersionContent/soforthilfe.content";
import { handoutTextVersions as verstehenTextVersions } from "@/content/handoutTextVersionContent/verstehen.content";
import { homeFeaturedInfografiken } from "@/content/homeFeaturedInfografiken";
import { materials } from "@/content/materialien";
import { searchableContent } from "@/content/searchIndex";
import { unterstuetzenItems } from "@/content/unterstuetzen";
import { verstehenInfografiken } from "@/content/verstehen";

function listFilesRecursively(root: string): string[] {
  if (!fs.existsSync(root)) return [];

  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(root, entry.name);
    return entry.isDirectory()
      ? listFilesRecursively(absolutePath)
      : [absolutePath];
  });
}

function normalizedSource(value: string): string {
  return value.replace(/\s+/g, " ");
}

describe("anti-stigma governance", () => {
  it("keeps withdrawn deterministic crisis models out of active delivery", () => {
    const withdrawnIds = ["4-phasen", "im-krisenmodus"];
    const activeIds = [
      ...HANDOUT_TEXT_VERSION_IDS,
      ...materials.map(item => item.id),
      ...verstehenInfografiken.map(item => item.id),
      ...unterstuetzenItems.map(item => item.id),
      ...homeFeaturedInfografiken.map(item => item.id),
    ];

    for (const id of withdrawnIds) {
      expect(getHandoutGovernance(id)?.publicationStatus, id).toBe("withdrawn");
      expect(isHandoutVisualPublished(id), id).toBe(false);
      expect(activeIds, id).not.toContain(id);
      expect(
        searchableContent.some(entry => entry.href.includes(`/text/${id}`)),
        id
      ).toBe(false);
    }
  });

  it("does not expose revised text beside the superseded visuals", () => {
    for (const id of [
      "spaltung",
      "notfallplan-krise",
      "wenn-worte-treffen",
      "leuchtturm",
      "eisberg",
      "alarm-modus",
      "zustands-landkarte",
      "rolle-klaeren",
      "drei-saeulen",
      "konsistenz-prinzip",
      "beziehungs-achtsamkeit",
      "6-leitlinien",
      "4-alltags-tipps",
      "krisenkommunikation",
      "anspannungskurve",
      "grenzen-ohne-eskalation",
      "pause-statt-streit",
      "zuhoeren-ohne-zustimmen",
      "dear",
      "bruecke-gelaender",
      "grenzen-erkennen",
      "lmk",
      "grenzen-spickzettel",
      "energie-konto",
      "erlaubnis-karte",
      "sauerstoffmaske",
      "fortschritt-paradox",
      "schuld-verantwortung",
    ]) {
      expect(getHandoutGovernance(id)?.visualAssetStatus, id).toBe("text-only");
      expect(isHandoutVisualPublished(id), id).toBe(false);
      expect(HANDOUT_TEXT_VERSION_IDS, id).toContain(id);
    }
  });

  it.each([
    "Notfallkarte-Zuerich-Psychische-Krise.pdf",
    "notfallkarte-preview.webp",
    "infografiken/manus-4-phasen-v1.pdf",
    "infografiken/ampel-das-ampel-system-v4.pdf",
    "infografiken/pendel-das-bewertungs-pendel-v16.pdf",
    "infografiken/manus-wenn-worte-treffen-v3.pdf",
    "infografiken/manus-gehirn-v1.pdf",
    "infografiken/manus-remission-heilung-v1.pdf",
    "infografiken/manus-5-faktoren-genesung-v1.pdf",
    "infografiken/manus-rolle-genesungsprozess-v1.pdf",
    "infografiken/manus-rolle-klaeren-v3.pdf",
    "infografiken/manus-drei-saeulen-v1.pdf",
    "infografiken/manus-konsistenz-prinzip-v1.pdf",
    "infografiken/manus-beziehungs-achtsamkeit-v1.pdf",
    "infografiken/manus-6-leitlinien-v1.pdf",
    "infografiken/manus-4-alltags-tipps-v1.pdf",
    "infografiken/fortschritt-das-fortschritt-paradox-v5.pdf",
    "infografiken/manus-schuld-verantwortung-v3.pdf",
    "infografiken/manus-leuchtturm-v1.pdf",
    "infografiken/eisberg-der-eisberg-v8.pdf",
    "infografiken/alarm-der-alarm-modus-v4.pdf",
    "infografiken/deeskalation-der-deeskalations-pfad-v11.pdf",
    "infografiken/manus-anspannungskurve-v2.pdf",
    "infografiken/manus-grenzen-ohne-eskalation-v3.pdf",
    "infografiken/manus-pause-statt-streit-v3.pdf",
    "infografiken/validierung-die-validierungs-treppe-v10.pdf",
    "infografiken/manus-bruecke-gelaender-v2.pdf",
    "infografiken/manus-grenzen-erkennen-v1.pdf",
    "infografiken/manus-lmk-v1.pdf",
    "infografiken/manus-energie-konto-v1.pdf",
    "infografiken/manus-erlaubnis-karte-v1.pdf",
    "infografiken/sauerstoff-die-sauerstoffmaske-v5.pdf",
    "infografiken/puk-radikale-akzeptanz-v3.pdf",
    "infografiken/puk-gespraeche-kippen-v3.pdf",
    "infografiken/puk-beispiel-dialog-v3.pdf",
    "notfallplan-krise-v03.pdf",
    "notfallplan-krise-v03-preview.webp",
    "notfallplan-krise-v04.pdf",
    "notfallplan-krise-v04-preview.webp",
  ])("does not package the superseded public asset %s", relativePath => {
    expect(
      fs.existsSync(path.resolve(process.cwd(), "client/public", relativePath))
    ).toBe(false);
  });

  it("keeps withdrawn, text-only and draft families out of every public side channel", () => {
    const publicInfografikenRoot = path.resolve(
      process.cwd(),
      "client/public/infografiken"
    );
    const publicRelativePaths = listFilesRecursively(
      publicInfografikenRoot
    ).map(filePath =>
      path.relative(publicInfografikenRoot, filePath).toLowerCase()
    );
    const forbiddenFileTokens = [
      "4-phasen",
      "alarm-der-alarm-modus",
      "ampel-das-ampel-system",
      "anspannungskurve",
      "beispiel-dialog",
      "bruecke-gelaender",
      "deeskalation-der-deeskalations-pfad",
      "eisberg-der-eisberg",
      "5-faktoren-genesung",
      "gehirn",
      "zustands-landkarte",
      "gespraeche-kippen",
      "grenzen-ohne-eskalation",
      "manus-grenzen-erkennen",
      "manus-grenzen-spickzettel",
      "manus-lmk",
      "manus-energie-konto",
      "manus-erlaubnis-karte",
      "manus-rolle-klaeren",
      "manus-drei-saeulen",
      "manus-konsistenz-prinzip",
      "manus-beziehungs-achtsamkeit",
      "manus-6-leitlinien",
      "manus-4-alltags-tipps",
      "leuchtturm",
      "pause-statt-streit",
      "pendel-das-bewertungs-pendel",
      "radikale-akzeptanz",
      "remission-heilung",
      "rolle-genesungsprozess",
      "fortschritt-das-fortschritt-paradox",
      "manus-schuld-verantwortung",
      "sauerstoff-die-sauerstoffmaske",
      "validierung-die-validierungs-treppe",
      "wenn-worte-treffen",
    ];

    expect(
      publicRelativePaths.filter(filePath => filePath.endsWith(".zip"))
    ).toEqual([]);
    expect(
      publicRelativePaths.filter(filePath =>
        forbiddenFileTokens.some(token => filePath.includes(token))
      )
    ).toEqual([]);
    expect(publicRelativePaths).not.toContain("extras/uebersichtsbogen.pdf");
    expect(publicRelativePaths).not.toContain("extras/uebersichtsbogen.png");
    expect(
      fs.existsSync(
        path.resolve(
          process.cwd(),
          "client/public/website-screenreader-test.json"
        )
      )
    ).toBe(false);
  });

  it("packages only registered canonical infographic assets", () => {
    const publicInfografikenRoot = path.resolve(
      process.cwd(),
      "client/public/infografiken"
    );
    const packagedPaths = listFilesRecursively(publicInfografikenRoot)
      .map(
        filePath =>
          `/infografiken/${path
            .relative(publicInfografikenRoot, filePath)
            .split(path.sep)
            .join("/")}`
      )
      .sort();
    const registeredPaths = collectReferencedInfografikAssets()
      .map(asset => asset.path)
      .sort();

    expect(packagedPaths).toEqual(registeredPaths);
  });

  it("keeps the revised relationship models free of fixed motives and roles", () => {
    const leuchtturm = verstehenTextVersions.find(
      item => item.id === "leuchtturm"
    );
    const spaltung = verstehenTextVersions.find(item => item.id === "spaltung");
    const wennWorte = kommunizierenTextVersions.find(
      item => item.id === "wenn-worte-treffen"
    );
    const leuchtturmText = JSON.stringify(leuchtturm);
    const spaltungText = JSON.stringify(spaltung);
    const wennWorteText = JSON.stringify(wennWorte);

    expect(leuchtturm).toBeTruthy();
    expect(leuchtturmText).not.toMatch(
      /ruhig, klar, verlässlich|Stabilität wahren|Orientierung geben/
    );
    expect(leuchtturmText).toContain("eigene Orientierung");
    expect(spaltung).toBeTruthy();
    expect(spaltungText).not.toMatch(
      /Retter oder Feind|Plötzlich sind Sie der Feind|Ihre Beständigkeit ist der Anker|Unterwerfung/
    );
    expect(wennWorte).toBeTruthy();
    expect(wennWorteText).not.toMatch(
      /5 häufige Schuldzuweisungen|Dahinter stehen oft|Schuldzuweisungen sind keine Tatsachen/
    );
    expect(wennWorteText).toContain("Separates Sicherheitssignal");
  });

  it("allows pauses and endings without a return promise", () => {
    const affectedIds = [
      "krisenkommunikation",
      "anspannungskurve",
      "grenzen-ohne-eskalation",
      "pause-statt-streit",
      "zuhoeren-ohne-zustimmen",
      "bruecke-gelaender",
    ];
    const versions = [
      ...kommunizierenTextVersions,
      ...grenzenTextVersions,
    ].filter(item => affectedIds.includes(item.id));
    const copy = JSON.stringify(versions);

    expect(copy).not.toMatch(
      /Rückkehrzeit|Rückkehr vereinbaren|ich komme wieder|Ich bin wieder da|nicht nachgeben|Kontrolle geht verloren/
    );
    expect(copy).toContain("ohne Rückkehrversprechen");

    const exerciseSource = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/components/interactive/KommunikationsUebung.tsx"
      ),
      "utf8"
    );
    expect(exerciseSource).not.toMatch(
      /Gefühl, erpresst|nicht ernst nehmen.*nicht drängen|ich gehe nicht weg/
    );
    expect(exerciseSource).toContain("Bei akuter Gefahr rufen wir jetzt 144");
    expect(exerciseSource).toContain(
      "143 bietet zusätzliche Gesprächsentlastung, ersetzt aber keinen Notruf"
    );
  });

  it("keeps the Eisberg metaphor tentative instead of reading hidden causes", () => {
    const eisberg = verstehenTextVersions.find(item => item.id === "eisberg");
    const eisbergText = JSON.stringify(eisberg);
    const verstehenPage = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Verstehen.tsx"),
      "utf8"
    );

    expect(eisberg).toBeTruthy();
    expect(eisbergText).not.toMatch(
      /explosive Reaktionen|oft schnell eskaliert|Gefühl oder Bedürfnis steckt dahinter/
    );
    expect(eisbergText).toContain("nicht sicher ableiten");
    expect(verstehenPage).not.toMatch(
      /Wut oft als das dominierende Thema|Impulsdurchbruch/
    );
  });

  it("keeps active inline diagrams free of fixed burden roles and linear recovery goals", () => {
    const everydayPage = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/UnterstuetzenAlltag.tsx"),
      "utf8"
    );
    const recoveryPage = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Genesung.tsx"),
      "utf8"
    );
    const homeVisuals = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/content/homeFeaturedInfografiken.ts"
      ),
      "utf8"
    );

    expect(everydayPage).not.toMatch(/Mit Angehörigem|Ohne Belastung/);
    expect(everydayPage).toContain("Eigene Basislinie");
    expect(recoveryPage).not.toMatch(/Gesamttrend|>\s*Ziel\s*</);
    expect(`${recoveryPage}\n${homeVisuals}`).not.toMatch(
      /selten geradlinig|selten glatt|oft nicht geradlinig/i
    );
    expect(normalizedSource(recoveryPage)).toContain(
      "Keine Verlaufskurve ist eine Prognose oder ein Ziel"
    );
    expect(recoveryPage).toContain('data-layout="multiple-unranked-paths"');

    const recoveryTextVersions = JSON.stringify(genesungTextVersions);
    expect(recoveryTextVersions).not.toContain(
      "Genesung braucht eigene Motivation"
    );
    expect(recoveryTextVersions).toContain(
      "Ein schwieriger Verlauf ist kein Beleg für fehlenden Willen"
    );
  });

  it("keeps crisis follow-up optional and therapy contact observation-based", () => {
    const crisisPage = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/UnterstuetzenKrise.tsx"),
      "utf8"
    );
    const therapyPage = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/UnterstuetzenTherapie.tsx"),
      "utf8"
    );
    const crisisHandout = JSON.stringify(
      soforthilfeTextVersions.find(item => item.id === "notfallplan-krise")
    );

    expect(crisisPage).not.toMatch(
      /Was hat die Krise ausgelöst|Du sagst mir, wenn du merkst|Krisen sprachlich tragen/
    );
    expect(crisisPage).toContain(
      "Niemand ist verpflichtet, eine nächste Krise"
    );
    expect(crisisPage).toContain(
      "ohne Verantwortung für den Verlauf zu übernehmen"
    );

    expect(crisisHandout).not.toMatch(
      /nächste Stunden und Nacht nicht dem Zufall überlassen|Warnzeichen und Auslöser festhalten/
    );
    expect(crisisHandout).toContain(
      "den Verlauf weder überwachen noch eine weitere Krise vorhersagen"
    );
    expect(crisisHandout).toContain("wenn sie einverstanden ist");

    expect(therapyPage).not.toMatch(
      /Was sollte ich dem Behandlungsteam berichten|grösste Beziehungsherausforderungen|ob Behandlung tragfähig beginnt|Sind die Ziele realistisch|Welche Fortschritte|keine Veränderung/
    );
    expect(therapyPage).toContain("eigene konkrete Beobachtungen");
    expect(therapyPage).toMatch(
      /Behandlung weder beurteilen noch ihren Verlauf\s+kontrollieren/
    );
    expect(therapyPage).toMatch(
      /Behandlungsziele und\s+Fortschritt bewertet die betroffene Person/
    );
    expect(therapyPage).toMatch(
      /Bei möglicher akuter Gefahr nutzen Sie\s+sofort die Notfallwege/
    );
  });

  it("describes comorbidity without universal claims or reductive groups", () => {
    const overview = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/sections/VerstehenSupportSections.tsx"
      ),
      "utf8"
    );
    const page = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Begleiterkrankungen.tsx"),
      "utf8"
    );
    const graphic = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/components/infografik/BegleiterkrankungenSvg.tsx"
      ),
      "utf8"
    );
    const sourceGraphic = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/assets/infografik/a2-begleiterkrankungen.svg"
      ),
      "utf8"
    );
    const copy = `${overview}\n${page}\n${graphic}\n${sourceGraphic}`;

    expect(copy).toContain("viele, aber nicht alle");
    expect(copy).not.toMatch(
      /Borderline (?:tritt|kommt) selten allein|die meisten Betroffenen|AFFEKTIV|ANGST &amp;|IMPULS &amp;|VERHALTEN|Die Kreisgrösse zeigt/
    );
    expect(normalizedSource(page)).toContain(
      "Suizidale Aussagen oder Hinweise auf konkrete Pläne brauchen unabhängig von ihrer diagnostischen Zuordnung"
    );
    expect(graphic).toContain('data-layout="equal-list"');
    expect(sourceGraphic).toContain('data-layout="equal-list"');
    expect(copy).not.toContain("Borderline im Zentrum");
    expect(copy).not.toContain('r="64"');
    expect(copy).toContain(
      "weder Ursache noch individuelle Wahrscheinlichkeit oder Rangfolge"
    );
    expect(sourceGraphic).toContain(
      "Angehörige müssen Beschwerden nicht selbst diagnostisch zuordnen"
    );
    const equalList = sourceGraphic.match(
      /<g id="diagnosis-list"[\s\S]*?<\/g>/
    )?.[0];
    expect(equalList).toBeTruthy();
    expect(equalList).not.toContain("<line");
    expect(equalList?.match(/<circle[^>]*\br="68"/g)).toHaveLength(6);
    expect(page).not.toContain(
      "das Beziehungsgeschehen stiller, schwerer, hoffnungsloser wird"
    );
  });

  it("keeps relationship support voluntary and separation autonomous", () => {
    const everyday = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/UnterstuetzenAlltag.tsx"),
      "utf8"
    );
    const relationships = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/VerstehenBeziehungen.tsx"),
      "utf8"
    );
    const faq = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/FAQ.tsx"),
      "utf8"
    );
    const boundaries = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Grenzen.tsx"),
      "utf8"
    );
    const understanding = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Verstehen.tsx"),
      "utf8"
    );

    expect(everyday).not.toMatch(
      /Der Alltag ist oft nicht ruhig, sondern vorspannt|Beziehungen etwas vorhersehbarer, klarer und weniger reaktiv zu machen/
    );
    expect(normalizedSource(everyday)).toContain(
      "weder für die Vorhersehbarkeit einer Beziehung noch für die Regulation einer anderen Person verantwortlich"
    );
    expect(normalizedSource(everyday)).toContain(
      "Verlässlichkeit entsteht durch klare, anpassbare Absprachen"
    );
    expect(everyday).toContain("Absprachen klar und anpassbar halten");
    expect(normalizedSource(everyday)).toContain(
      "Ihre Möglichkeiten, Grenzen und Ihre Verfügbarkeit dürfen sich ändern"
    );
    expect(everyday).not.toMatch(
      /Vorhersehbar bleiben|nicht jedes Mal völlig anders reagieren/
    );
    expect(relationships).not.toContain("Sicherheit sei nur");
    expect(normalizedSource(relationships)).toContain(
      "Angehörige müssen keinen dieser Wege allein tragen"
    );
    expect(faq).toContain("Eine Krise verpflichtet Sie nicht");
    expect(faq).not.toContain(
      "eine Trennung nach Möglichkeit nicht mitten in einer akuten Krise"
    );
    expect(boundaries).not.toContain("verantwortlicher Elternschaft");
    expect(normalizedSource(boundaries)).toContain(
      "ohne moralische Bewertung entschieden"
    );
    expect(understanding).toContain(
      "weder Ursache der Borderline-Erkrankung noch"
    );
    expect(understanding).toContain("keine Schuldzuweisung");
  });

  it("uses observable situation labels and validation without a power contest", () => {
    const guide = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/components/interactive/SituationsWegweiser.tsx"
      ),
      "utf8"
    );
    const communication = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/content/kommunizieren.ts"),
      "utf8"
    );
    const exercise = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "client/src/components/interactive/KommunikationsUebung.tsx"
      ),
      "utf8"
    );

    expect(guide).toContain("Starke Verzweiflung oder anhaltendes Weinen");
    expect(guide).toContain("Konkrete Aussage und Wirkung benennen");
    expect(guide).toContain(
      "Fühlen Sie sich bedroht, eingeschüchtert oder unter Zwang?"
    );
    expect(guide).toContain("Stalking");
    expect(guide).not.toMatch(
      /Weinkrampf|Erkennen Sie das Muster|id: "manipulation"|id: "aggression"|keine körperliche Bedrohung/
    );
    expect(communication).toContain(
      "Gefühle anerkennen, ohne automatisch zuzustimmen"
    );
    expect(communication).not.toContain("Validieren ohne nachzugeben");
    expect(exercise).toContain("Eine eigene Erfahrung kann verbinden");
    expect(exercise).toContain(
      "ein Lösungsvorschlag ist nicht automatisch falsch"
    );
    expect(exercise).not.toMatch(
      /vermittelt: «Dein Gefühl ist nicht so wichtig|fühlt sich dadurch erneut nicht gehört|Thema gekapert/
    );
  });

  it("keeps legacy P1 labels out of visible search copy", () => {
    const visibleSearchCopy = searchableContent
      .map(entry => `${entry.title} ${entry.description}`)
      .join("\n");

    expect(visibleSearchCopy).not.toMatch(
      /Suiziddrohung|Aggressive Eskalation|Textversion: Der 4-Phasen-Zyklus|Textversion: Im Krisenmodus|U\.M\.W\.E\.G|U\.M\.W\.-Formel/
    );
  });
});
