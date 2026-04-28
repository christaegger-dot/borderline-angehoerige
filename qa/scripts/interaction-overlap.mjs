import {
  ROUTES,
  VIEWPORTS,
  launchBrowser,
  openRoute,
  writeJson,
} from "./a11y-shared.mjs";

function scrollPositions(totalHeight, viewportHeight) {
  const maxScroll = Math.max(totalHeight - viewportHeight, 0);
  const step = Math.max(Math.floor(viewportHeight * 0.75), 320);
  const positions = new Set([0, maxScroll]);

  for (let current = 0; current <= maxScroll; current += step) {
    positions.add(current);
  }

  return Array.from(positions).sort((left, right) => left - right);
}

async function run() {
  const browser = await launchBrowser();
  const findings = [];

  try {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        const { context, page } = await openRoute(browser, route, viewport);
        const totalHeight = await page.evaluate(
          () => document.documentElement.scrollHeight
        );

        for (const position of scrollPositions(totalHeight, viewport.height)) {
          await page.evaluate(scrollY => window.scrollTo(0, scrollY), position);
          await page.waitForTimeout(150);

          const pageFindings = await page.evaluate(() => {
            const candidates = Array.from(
              document.querySelectorAll(
                "a[href], button, input, textarea, select, [role='button'], [role='link']"
              )
            );

            const describe = node => ({
              tag: node.tagName.toLowerCase(),
              id: node.id || null,
              className:
                typeof node.className === "string"
                  ? node.className.trim().replace(/\s+/g, " ").slice(0, 120)
                  : null,
              text:
                node.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ||
                "",
            });

            return candidates
              .map((element, index) => {
                const rect = element.getBoundingClientRect();
                const style = getComputedStyle(element);

                if (
                  rect.width < 1 ||
                  rect.height < 1 ||
                  style.display === "none" ||
                  style.visibility === "hidden" ||
                  element.getAttribute("aria-hidden") === "true"
                ) {
                  return null;
                }

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                if (
                  centerX < 0 ||
                  centerY < 0 ||
                  centerX > window.innerWidth ||
                  centerY > window.innerHeight
                ) {
                  return null;
                }

                const topElement = document.elementFromPoint(centerX, centerY);
                if (
                  !topElement ||
                  topElement === element ||
                  topElement.contains(element) ||
                  element.contains(topElement)
                ) {
                  return null;
                }

                return {
                  key: [
                    element.tagName.toLowerCase(),
                    element.getAttribute("href") || "",
                    element.id || "",
                    element.textContent
                      ?.trim()
                      .replace(/\s+/g, " ")
                      .slice(0, 80) || "",
                    index,
                  ].join("::"),
                  index,
                  element: describe(element),
                  blockedBy: describe(topElement),
                  center: {
                    x: Number(centerX.toFixed(1)),
                    y: Number(centerY.toFixed(1)),
                  },
                  scrollY: Math.round(window.scrollY),
                };
              })
              .filter(Boolean);
          });

          for (const finding of pageFindings) {
            findings.push({
              route,
              viewport: viewport.name,
              ...finding,
            });
          }
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const deduped = Array.from(
    new Map(
      findings.map(finding => [
        `${finding.route}::${finding.viewport}::${finding.key}`,
        finding,
      ])
    ).values()
  );

  await writeJson("interaction-overlap.json", {
    generatedAt: new Date().toISOString(),
    findings: deduped,
    summary: {
      totalFindings: deduped.length,
    },
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
