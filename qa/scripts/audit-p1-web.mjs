import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4173";
const executablePath =
  process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = [
  "/materialien/text/radikale-akzeptanz",
  "/materialien/text/gespraeche-kippen",
  "/materialien/text/beispiel-dialog",
];
const viewports = [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 768, height: 900 },
  { width: 1440, height: 1000 },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function inspectLayout(
  page,
  route,
  viewport,
  suffix = "",
  checkDocument = true
) {
  const result = await page.locator(".handout-visual").evaluate(figure => {
    const figureRect = figure.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const protruding = Array.from(figure.querySelectorAll("*"))
      .filter(element => {
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 &&
          (rect.left < figureRect.left - 1 || rect.right > figureRect.right + 1)
        );
      })
      .map(element => ({
        tag: element.tagName.toLowerCase(),
        className: element.className,
      }));
    const documentProtruding = Array.from(document.body.querySelectorAll("*"))
      .filter(element => {
        const rect = element.getBoundingClientRect();
        return (
          rect.width > 0 && (rect.left < -1 || rect.right > viewportWidth + 1)
        );
      })
      .slice(0, 12)
      .map(element => ({
        tag: element.tagName.toLowerCase(),
        className: element.className,
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
      }));

    return {
      documentOverflow:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      figureOverflow: figure.scrollWidth > figure.clientWidth + 1,
      protruding,
      documentProtruding,
      geometry: {
        viewportWidth,
        figure: {
          left: Math.round(figureRect.left),
          right: Math.round(figureRect.right),
          width: Math.round(figureRect.width),
          minWidth: getComputedStyle(figure).minWidth,
          overflowWrap: getComputedStyle(figure).overflowWrap,
        },
        parent: figure.parentElement
          ? {
              left: Math.round(
                figure.parentElement.getBoundingClientRect().left
              ),
              right: Math.round(
                figure.parentElement.getBoundingClientRect().right
              ),
              width: Math.round(
                figure.parentElement.getBoundingClientRect().width
              ),
            }
          : null,
      },
    };
  });

  if (checkDocument) {
    assert(
      !result.documentOverflow,
      `${route} ${viewport.width}px${suffix}: horizontal document overflow ${JSON.stringify({ elements: result.documentProtruding, geometry: result.geometry })}`
    );
  }
  assert(
    !result.figureOverflow,
    `${route} ${viewport.width}px${suffix}: figure overflow`
  );
  assert(
    result.protruding.length === 0,
    `${route} ${viewport.width}px${suffix}: protruding content ${JSON.stringify(result.protruding)}`
  );
}

async function run() {
  const browser = await chromium.launch({ executablePath, headless: true });
  const results = [];

  try {
    for (const route of routes) {
      for (const viewport of viewports) {
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();
        const runtimeErrors = [];
        page.on("console", message => {
          if (message.type() === "error") runtimeErrors.push(message.text());
        });
        page.on("pageerror", error => runtimeErrors.push(error.message));

        await page.goto(new URL(route, BASE_URL).toString(), {
          waitUntil: "networkidle",
          timeout: 60_000,
        });
        await page.evaluate(() => document.fonts.ready);

        const figure = page.locator(".handout-visual");
        await figure.waitFor({ state: "visible" });
        assert(
          (await figure.locator('[role="note"]').count()) === 1,
          `${route} ${viewport.width}px: safety note missing or duplicated`
        );
        assert(
          (await page.getByRole("link", { name: "PDF öffnen" }).count()) === 1,
          `${route} ${viewport.width}px: PDF link missing`
        );

        await inspectLayout(page, route, viewport);

        const summary = figure.locator("summary");
        await summary.focus();
        const focus = await summary.evaluate(element => {
          const style = getComputedStyle(element);
          return {
            outlineStyle: style.outlineStyle,
            outlineWidth: style.outlineWidth,
          };
        });
        assert(
          focus.outlineStyle !== "none" &&
            Number.parseFloat(focus.outlineWidth) >= 2,
          `${route} ${viewport.width}px: summary has no clear focus indicator`
        );
        await page.keyboard.press("Enter");
        assert(
          await figure.locator("details").evaluate(details => details.open),
          `${route} ${viewport.width}px: text description cannot be opened by keyboard`
        );

        if (viewport.width === 360 || viewport.width === 1440) {
          const axe = await new AxeBuilder({ page })
            .include(".handout-visual")
            .analyze();
          assert(
            axe.violations.length === 0,
            `${route} ${viewport.width}px: axe violations ${axe.violations
              .map(violation => violation.id)
              .join(", ")}`
          );
        }

        await page.evaluate(() => {
          document.documentElement.style.fontSize = "200%";
        });
        // This package owns the semantic figure, not the surrounding legacy
        // page chrome. At text zoom, assert that the new figure itself reflows
        // without clipped or protruding content.
        await inspectLayout(page, route, viewport, " at 200% text size", false);

        assert(
          runtimeErrors.length === 0,
          `${route} ${viewport.width}px: console/page errors ${runtimeErrors.join(" | ")}`
        );
        results.push({ route, viewport, status: "pass" });
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`P1 web audit passed: ${results.length} route/viewport cases`);
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
