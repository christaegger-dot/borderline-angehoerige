import AxeBuilder from "@axe-core/playwright";
import {
  LIGHTHOUSE_ROUTES,
  VIEWPORTS,
  launchBrowser,
  openRoute,
  writeJson,
} from "./a11y-shared.mjs";

const DESKTOP_VIEWPORT = VIEWPORTS.find(
  viewport => viewport.name === "desktop"
);

async function run() {
  const browser = await launchBrowser();
  const results = [];

  try {
    for (const route of LIGHTHOUSE_ROUTES) {
      const { context, page } = await openRoute(
        browser,
        route,
        DESKTOP_VIEWPORT
      );
      const axe = new AxeBuilder({ page });
      const result = await axe.analyze();

      results.push({
        route,
        violations: result.violations.map(violation => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.map(node => ({
            target: node.target,
            failureSummary: node.failureSummary,
          })),
        })),
        passes: result.passes.length,
        incomplete: result.incomplete.length,
      });

      await context.close();
    }
  } finally {
    await browser.close();
  }

  await writeJson("axe-routes.json", {
    generatedAt: new Date().toISOString(),
    viewport: DESKTOP_VIEWPORT,
    results,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
