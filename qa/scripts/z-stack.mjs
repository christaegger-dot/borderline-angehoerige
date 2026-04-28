import {
  CLICK_VIEWPORTS,
  ROUTES,
  launchBrowser,
  openRoute,
  writeJson,
} from "./a11y-shared.mjs";

async function run() {
  const browser = await launchBrowser();
  const entries = [];

  try {
    for (const route of ROUTES) {
      for (const viewport of CLICK_VIEWPORTS) {
        const { context, page } = await openRoute(browser, route, viewport);

        const result = await page.evaluate(() => {
          const nodes = Array.from(document.querySelectorAll("*"));
          return nodes
            .map((element, index) => {
              const style = getComputedStyle(element);
              const hasExplicitZIndex =
                style.zIndex !== "auto" && style.zIndex !== "";
              const interestingPosition = [
                "absolute",
                "fixed",
                "sticky",
              ].includes(style.position);

              if (!hasExplicitZIndex && !interestingPosition) {
                return null;
              }

              const zIndex = Number(style.zIndex);
              const numericZIndex = Number.isFinite(zIndex) ? zIndex : null;
              return {
                index,
                tag: element.tagName.toLowerCase(),
                id: element.id || null,
                className:
                  typeof element.className === "string"
                    ? element.className
                        .trim()
                        .replace(/\s+/g, " ")
                        .slice(0, 140)
                    : null,
                text:
                  element.textContent
                    ?.trim()
                    .replace(/\s+/g, " ")
                    .slice(0, 80) || "",
                position: style.position,
                zIndex: style.zIndex,
                numericZIndex,
                anomaly:
                  numericZIndex !== null && numericZIndex > 100
                    ? "z-index > 100"
                    : null,
              };
            })
            .filter(Boolean)
            .sort((left, right) => {
              const leftValue = left.numericZIndex ?? -1;
              const rightValue = right.numericZIndex ?? -1;
              return rightValue - leftValue;
            });
        });

        entries.push({
          route,
          viewport: viewport.name,
          items: result,
          anomalyCount: result.filter(item => item.anomaly).length,
        });

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  await writeJson("z-stack.json", {
    generatedAt: new Date().toISOString(),
    entries,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
