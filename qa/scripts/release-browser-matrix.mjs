import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices, firefox, webkit } from "playwright";
import {
  BASE_URL,
  qaPath,
  routeUrl,
  writeJson,
} from "./a11y-shared.mjs";

const TODAY = "2026-05-02";
const REPORT_NAME = "release-browser-matrix.json";

function nowIso() {
  return new Date().toISOString();
}

function runLabel() {
  return `Production Browser Matrix ${TODAY}`;
}

function normalizeError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function chromeContextOptions() {
  return {
    viewport: { width: 1440, height: 960 },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  };
}

function desktopFirefoxContextOptions() {
  return {
    viewport: { width: 1440, height: 960 },
    locale: "de-CH",
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  };
}

function desktopSafariContextOptions() {
  return {
    viewport: { width: 1440, height: 960 },
    locale: "de-CH",
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  };
}

function iPhoneChromeEmulation() {
  return {
    ...devices["iPhone 13"],
    locale: "de-CH",
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
  };
}

function iPhoneSafariEmulation() {
  return {
    ...devices["iPhone 13"],
    locale: "de-CH",
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
  };
}

function androidChromeEmulation() {
  return {
    ...devices["Pixel 7"],
    locale: "de-CH",
    acceptDownloads: true,
    ignoreHTTPSErrors: true,
  };
}

async function launchBrowserForEngine(engine) {
  if (engine === "chromium") {
    return chromium.launch({
      headless: true,
      executablePath:
        process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
  }

  if (engine === "firefox") {
    return firefox.launch({ headless: true });
  }

  if (engine === "webkit") {
    return webkit.launch({ headless: true });
  }

  throw new Error(`Unbekannte Browser-Engine: ${engine}`);
}

async function openPage(browser, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(60_000);
  return { context, page };
}

async function visit(page, route) {
  await page.goto(routeUrl(route), { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
}

async function runFlow(page, profile) {
  const steps = [];
  const findings = [];

  async function step(name, fn) {
    const startedAt = nowIso();
    console.error(`[browser-matrix] ${profile.slug}: ${name}`);
    try {
      await fn();
      steps.push({ name, status: "passed", startedAt, finishedAt: nowIso() });
    } catch (error) {
      const message = normalizeError(error);
      steps.push({
        name,
        status: "failed",
        startedAt,
        finishedAt: nowIso(),
        message,
      });
      findings.push(`${name}: ${message}`);
    }
  }

  const isMobile = profile.kind === "mobile";
  const searchOpenButton = isMobile
    ? page.locator('button[aria-label="Suche öffnen"]').first()
    : page.locator('button[aria-label="Suchen"]').first();
  const mobileMenuButton = page
    .locator('button[aria-label="Menü öffnen"]')
    .first();
  const searchInput = page.locator(
    'input[role="combobox"][aria-label="Website durchsuchen"]'
  );

  await step("Startseite direkt öffnen", async () => {
    await visit(page, "/");
    await page.getByRole("heading", { level: 1 }).first().waitFor();
  });

  await step("Suche öffnen und schließen", async () => {
    await searchOpenButton.waitFor();
    await searchOpenButton.click();
    const dialog = page.getByRole("dialog", { name: "Suche" });
    await dialog.waitFor();
    await searchInput.waitFor();
    await searchInput.fill("Notfallkarte");
    const queryValue = await searchInput.inputValue();
    if (queryValue !== "Notfallkarte") {
      throw new Error("Sucheingabe wurde nicht übernommen");
    }
    await page.getByRole("button", { name: "Suche schliessen" }).click();
    await dialog.waitFor({ state: "hidden" });
  });

  if (isMobile) {
    await step("Mobiles Menü öffnen und schließen", async () => {
      await mobileMenuButton.waitFor();
      await mobileMenuButton.click();
      await page.getByRole("dialog").waitFor();
      await page.getByRole("button", { name: "Menü schliessen" }).click();
      await page.getByRole("dialog").waitFor({ state: "hidden" });
    });
  }

  await step("Sticky Header über Scrollstrecke sichtbar", async () => {
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight * 0.65)
    );
    const control = isMobile ? mobileMenuButton : searchOpenButton;
    await control.waitFor();
  });

  await step("/soforthilfe direkt öffnen", async () => {
    await visit(page, "/soforthilfe");
    await page.getByRole("heading", { level: 1 }).first().waitFor();
    const telCount = await page.locator('a[href^="tel:"]').count();
    if (telCount < 3) {
      throw new Error(`erwartet mindestens 3 tel:-Links, gefunden ${telCount}`);
    }
  });

  await step("/notfallkarte direkt öffnen", async () => {
    await visit(page, "/notfallkarte");
    await page.getByRole("heading", { level: 1 }).first().waitFor();
  });

  await step("/notfallkarte/erstellen direkt öffnen", async () => {
    await visit(page, "/notfallkarte/erstellen");
    await page
      .getByRole("heading", { level: 1, name: /Persönliche Notfallkarte/i })
      .waitFor();
  });

  await step("Notfallkarte Eingaben + Reload + Zurück/Vorwärts", async () => {
    await page.getByRole("button", { name: "Kontakt hinzufügen" }).click();
    await page.getByLabel("Name der Kontaktperson").fill("Testkontakt");
    await page
      .getByLabel("Telefonnummer der Kontaktperson")
      .fill("079 123 45 67");
    await page
      .getByLabel("Beziehung oder Rolle der Kontaktperson")
      .fill("Vertrauensperson");
    await page
      .getByLabel("Persönliche Notizen")
      .fill(`Browser-Matrix ${profile.slug}`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await page.getByLabel("Name der Kontaktperson").waitFor();
    const nameValue = await page
      .getByLabel("Name der Kontaktperson")
      .inputValue();
    const notesValue = await page
      .getByLabel("Persönliche Notizen")
      .inputValue();
    if (
      nameValue !== "Testkontakt" ||
      notesValue !== `Browser-Matrix ${profile.slug}`
    ) {
      throw new Error("Notfallkarten-Daten über Reload nicht stabil");
    }
    await visit(page, "/soforthilfe");
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    const notesAfterBack = await page
      .getByLabel("Persönliche Notizen")
      .inputValue();
    if (notesAfterBack !== `Browser-Matrix ${profile.slug}`) {
      throw new Error("Daten nach Zurück-Navigation verloren");
    }
    await page.goForward({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
  });

  await step("Notfallkarte Druckansicht", async () => {
    const popupPromise = page.waitForEvent("popup", { timeout: 15_000 });
    await page.getByRole("button", { name: "Drucken / Als PDF" }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    await popup.waitForLoadState("networkidle");
    await popup.waitForTimeout(800);
    const fieldValues = await popup
      .locator("input, textarea")
      .evaluateAll(nodes => nodes.map(node => node.value));
    if (!popup.url().includes("/notfallkarte-print.html")) {
      throw new Error(`unerwartete Druck-URL: ${popup.url()}`);
    }
    if (
      !fieldValues.includes(`Browser-Matrix ${profile.slug}`) ||
      !fieldValues.includes("Testkontakt")
    ) {
      throw new Error("persönliche Daten fehlen in der Druckansicht");
    }
    await popup.close();
  });

  await step("Notfallkarte löschen", async () => {
    page.once("dialog", dialog => dialog.accept());
    await page
      .getByRole("button", { name: "Lokale Notfallkarten-Daten löschen" })
      .click();
    await page.getByLabel("Persönliche Notizen").waitFor();
    const notesValue = await page
      .getByLabel("Persönliche Notizen")
      .inputValue();
    const contactCount = await page
      .getByLabel("Name der Kontaktperson")
      .count();
    if (notesValue !== "" || contactCount !== 0) {
      throw new Error(
        "lokale Notfallkarten-Daten wurden nicht vollständig gelöscht"
      );
    }
  });

  await step("/materialien + Filter", async () => {
    await visit(page, "/materialien");
    await page
      .getByRole("heading", { level: 1, name: /Materialien/i })
      .waitFor();
    await page
      .locator("button[aria-pressed]")
      .filter({ hasText: "Verstehen" })
      .first()
      .click();
    await page.locator("article").first().waitFor();
  });

  await step("Materialien Textversion öffnen", async () => {
    const textLink = page
      .locator('article a[aria-label^="Textversion lesen"]')
      .first();
    await textLink.waitFor();
    await textLink.click();
    await page.waitForLoadState("networkidle");
    if (
      !page.url().includes("/textversion/") &&
      !page.url().includes("/materialien/text/")
    ) {
      throw new Error(`Textversion-URL unerwartet: ${page.url()}`);
    }
    await page.getByRole("heading", { level: 1 }).first().waitFor();
    await page.goBack({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
  });

  await step("Materialien PDF inline öffnen", async () => {
    const inlineHref = await page
      .locator('article a[href*="/api/material-download/"]:not([download])')
      .first()
      .getAttribute("href");
    if (!inlineHref) {
      throw new Error("kein Inline-PDF-Link gefunden");
    }

    const inlinePage = await page.context().newPage();
    const inlineUrl = new URL(inlineHref, BASE_URL).toString();

    try {
      await inlinePage.goto(inlineUrl, {
        waitUntil: "domcontentloaded",
      });
      if (!inlinePage.url().includes("/api/material-download/")) {
        throw new Error(`unerwartete Inline-PDF-URL: ${inlinePage.url()}`);
      }
    } catch (error) {
      const message = normalizeError(error);
      if (!message.includes("Download is starting")) {
        throw error;
      }
    }

    const response = await fetch(inlineUrl, { redirect: "follow" });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.includes("application/pdf")) {
      throw new Error(
        `Inline-PDF-Response unerwartet: ${response.status} ${contentType}`
      );
    }

    await inlinePage.close();
  });

  await step("Materialien PDF herunterladen", async () => {
    const downloadHref = await page
      .locator("article a[download]")
      .first()
      .getAttribute("href");
    if (!downloadHref) {
      throw new Error("kein Download-Link gefunden");
    }

    const response = await fetch(new URL(downloadHref, BASE_URL).toString(), {
      redirect: "follow",
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.includes("application/pdf")) {
      throw new Error(
        `Download-Response unerwartet: ${response.status} ${contentType}`
      );
    }
  });

  for (const route of ["/diagnostik", "/grenzen", "/beratung", "/quellen"]) {
    await step(`${route} direkt öffnen`, async () => {
      await visit(page, route);
      await page.getByRole("heading", { level: 1 }).first().waitFor();
    });
  }

  return { steps, findings };
}

function unavailableProfile({ device, browser, optional = false, notes }) {
  return {
    device,
    browser,
    optional,
    status: optional ? "optional" : "offen",
    testedAt: TODAY,
    testedBy: "Codex",
    notes,
    findings: [],
    steps: [],
    available: false,
  };
}

async function runProfile(browser, profile) {
  const startedAt = nowIso();
  console.error(`[browser-matrix] start profile ${profile.slug}`);
  const { context, page } = await openPage(browser, profile.contextOptions);

  try {
    const { steps, findings } = await runFlow(page, profile);
    const hasFailures = steps.some(step => step.status === "failed");

    return {
      device: profile.device,
      browser: profile.browser,
      optional: Boolean(profile.optional),
      status: hasFailures ? "nicht bestanden" : profile.passStatus,
      testedAt: TODAY,
      testedBy: "Codex",
      notes: profile.notes,
      findings,
      steps,
      available: true,
      startedAt,
      finishedAt: nowIso(),
    };
  } finally {
    console.error(`[browser-matrix] finish profile ${profile.slug}`);
    await context.close();
  }
}

async function runProfileBatch({ engine, profiles, unavailableNotes }) {
  let browser;

  try {
    browser = await launchBrowserForEngine(engine);
  } catch (error) {
    return profiles.map(profile =>
      unavailableProfile({
        device: profile.device,
        browser: profile.browser,
        optional: profile.optional,
        notes: unavailableNotes(profile, error),
      })
    );
  }

  try {
    const results = [];

    for (const profile of profiles) {
      results.push(await runProfile(browser, profile));
    }

    return results;
  } finally {
    await browser.close();
  }
}

function markdownReport(report) {
  const lines = [
    "## Browser-Matrix",
    "",
    `- Release / PR: main`,
    `- Commit / Deploy-Stand: ${report.gitHead}`,
    `- Datum: ${TODAY}`,
    `- Basis-URL: ${report.baseUrl}`,
    "",
    "| Gerät | Browser | Status | Notizen |",
    "| --- | --- | --- | --- |",
  ];

  for (const profile of report.profiles) {
    lines.push(
      `| ${profile.device} | ${profile.browser} | ${profile.status} | ${profile.notes.replace(/\|/g, "\\|")} |`
    );
  }

  lines.push("", "### Kritische Befunde", "");

  const failures = report.profiles.flatMap(profile =>
    profile.findings.map(
      finding => `- ${profile.device} ${profile.browser}: ${finding}`
    )
  );

  if (failures.length === 0) {
    lines.push("- keine technischen Blocker im durchgeführten Scope");
  } else {
    lines.push(...failures);
  }

  lines.push("", "### Freigabeentscheidung", "");
  lines.push(
    report.releaseDecision === "green"
      ? "- [x] Matrix vollständig grün"
      : "- [ ] Matrix vollständig grün"
  );
  lines.push(
    report.releaseDecision === "green-with-notes"
      ? "- [x] grün mit dokumentierten Resthinweisen"
      : "- [ ] grün mit dokumentierten Resthinweisen"
  );
  lines.push(
    report.releaseDecision === "blocked"
      ? "- [x] nicht freigabefähig"
      : "- [ ] nicht freigabefähig"
  );

  lines.push("", "### Methodik", "");
  lines.push(
    "- Desktop Chrome und Desktop Firefox wurden automatisiert über Playwright gegen Production geprüft, sofern die jeweiligen Browser-Binaries auf diesem Rechner verfügbar waren."
  );
  lines.push(
    "- iPhone Safari wurde als Playwright-WebKit-Profil mit iPhone-13-Emulation geprüft; das ist eine starke WebKit-Abdeckung, aber kein physischer iOS-Hardwarelauf."
  );
  lines.push(
    "- iPhone Chrome und Android Chrome wurden als mobile Chrome-Profile in Chromium emuliert und als technische Cross-Checks mitgeführt."
  );
  lines.push(
    "- Optionales macOS Safari wird als zusätzlicher WebKit-Desktoplauf geführt, wenn WebKit lokal verfügbar ist; es bleibt ein Zusatzcheck außerhalb der Pflichtmatrix."
  );

  return `${lines.join("\n")}\n`;
}

async function gitHead() {
  try {
    const headPath = qaPath("../.git/HEAD");
    const head = await fs.readFile(headPath, "utf8");
    if (head.startsWith("ref: ")) {
      const ref = head.slice(5).trim();
      const refPath = qaPath(`../.git/${ref}`);
      const hash = (await fs.readFile(refPath, "utf8")).trim();
      return hash.slice(0, 7);
    }
    return head.trim().slice(0, 7);
  } catch {
    return "unbekannt";
  }
}

async function main() {
  const write = process.argv.includes("--write");
  const profiles = [];

  profiles.push(
    ...(await runProfileBatch({
      engine: "webkit",
      profiles: [
        {
          slug: "iphone-safari",
          device: "iPhone",
          browser: "Safari",
          kind: "mobile",
          contextOptions: iPhoneSafariEmulation(),
          passStatus: "bestanden mit Hinweis",
          notes:
            "Playwright WebKit mit iPhone-13-Emulation; starke WebKit-Abdeckung, aber kein physisches iOS-Gerät",
        },
        {
          slug: "desktop-safari",
          device: "optional macOS",
          browser: "Safari",
          kind: "desktop",
          optional: true,
          contextOptions: desktopSafariContextOptions(),
          passStatus: "bestanden mit Hinweis",
          notes:
            "Playwright WebKit-Desktoplauf als Safari-Näherung; optionaler Zusatzcheck",
        },
      ],
      unavailableNotes: (profile, error) =>
        profile.optional
          ? `optional – WebKit nicht verfügbar: ${normalizeError(error)}`
          : `offen – WebKit nicht verfügbar: ${normalizeError(error)}`,
    }))
  );

  profiles.push(
    ...(await runProfileBatch({
      engine: "chromium",
      profiles: [
        {
          slug: "iphone-chrome",
          device: "iPhone",
          browser: "Chrome",
          kind: "mobile",
          contextOptions: iPhoneChromeEmulation(),
          passStatus: "bestanden mit Hinweis",
          notes:
            "mobile Chrome-Emulation in Chromium; kein echter iOS-Lauf, aber Pflichtpfade und Flows technisch grün",
        },
        {
          slug: "android-chrome",
          device: "Android",
          browser: "Chrome",
          kind: "mobile",
          contextOptions: androidChromeEmulation(),
          passStatus: "bestanden mit Hinweis",
          notes:
            "mobile Chrome-Emulation in Chromium; Pflichtpfade und Flows technisch grün",
        },
        {
          slug: "desktop-chrome",
          device: "Desktop",
          browser: "Chrome",
          kind: "desktop",
          contextOptions: chromeContextOptions(),
          passStatus: "bestanden",
          notes: "Playwright-Lauf gegen Production mit System-Chrome/Chromium",
        },
      ],
      unavailableNotes: (_profile, error) =>
        `offen – Chromium/Chrome nicht verfügbar: ${normalizeError(error)}`,
    }))
  );

  profiles.push(
    ...(await runProfileBatch({
      engine: "firefox",
      profiles: [
        {
          slug: "desktop-firefox",
          device: "Desktop",
          browser: "Firefox",
          kind: "desktop",
          contextOptions: desktopFirefoxContextOptions(),
          passStatus: "bestanden",
          notes: "Playwright-Firefox-Lauf gegen Production",
        },
      ],
      unavailableNotes: (_profile, error) =>
        `offen – Firefox nicht verfügbar: ${normalizeError(error)}`,
    }))
  );

  const hasHardFailure = profiles.some(
    profile => profile.status === "nicht bestanden" && !profile.optional
  );
    const hasMandatoryOpen =
      profiles.some(
        profile =>
          !profile.optional && profile.status === "offen"
      ) ||
      profiles.some(
        profile =>
          profile.device === "iPhone" &&
          profile.browser === "Safari" &&
          profile.status === "offen"
      );

  const report = {
    label: runLabel(),
    createdAt: nowIso(),
    baseUrl: BASE_URL,
    gitHead: await gitHead(),
    profiles,
    releaseDecision:
      hasHardFailure || hasMandatoryOpen ? "blocked" : "green-with-notes",
  };

  const markdown = markdownReport(report);

  if (write) {
    await writeJson(REPORT_NAME, report);

    const matrixPath = path.resolve(qaPath("release-browser-matrix.md"));
    const original = await fs.readFile(matrixPath, "utf8");
    const marker = "\n## Letzter Lauf\n";
    const nextContent = original.includes(marker)
      ? `${original.split(marker)[0]}${marker}\n${markdown}`
      : `${original.trimEnd()}\n\n## Letzter Lauf\n\n${markdown}`;
    await fs.writeFile(matrixPath, `${nextContent.trimEnd()}\n`);
  }

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

await main();
