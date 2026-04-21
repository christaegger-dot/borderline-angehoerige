import {
  CLICK_VIEWPORTS,
  ROUTES,
  interactiveSelector,
  launchBrowser,
  openRoute,
  writeJson,
} from "./a11y-shared.mjs";

function scrollPositions(totalHeight, viewportHeight) {
  const maxScroll = Math.max(totalHeight - viewportHeight, 0);
  const step = Math.max(Math.floor(viewportHeight * 0.85), 360);
  const positions = new Set([0, maxScroll]);

  for (let current = 0; current <= maxScroll; current += step) {
    positions.add(current);
  }

  return Array.from(positions).sort((left, right) => left - right);
}

function observationFor(meta) {
  if (meta.href?.startsWith("tel:")) return "protocol-link tel";
  if (meta.href?.startsWith("mailto:")) return "protocol-link mailto";
  if (meta.href) return `link to ${meta.href}`;
  if (
    meta.tag === "input" ||
    meta.tag === "textarea" ||
    meta.tag === "select"
  ) {
    return "focusable form control";
  }
  if (meta.ariaControls || meta.ariaExpanded !== null || meta.dataState) {
    return "stateful control";
  }
  return "trial click only";
}

async function run() {
  const browser = await launchBrowser();
  const results = [];

  try {
    for (const route of ROUTES) {
      for (const viewport of CLICK_VIEWPORTS) {
        const { context, page } = await openRoute(browser, route, viewport);
        const totalHeight = await page.evaluate(
          () => document.documentElement.scrollHeight
        );
        const locator = page.locator(interactiveSelector());
        const count = await locator.count();

        for (const position of scrollPositions(totalHeight, viewport.height)) {
          await page.evaluate(scrollY => window.scrollTo(0, scrollY), position);
          await page.waitForTimeout(150);

          for (let index = 0; index < count; index += 1) {
            const handle = await locator.nth(index).elementHandle();
            if (!handle) continue;

            const meta = await handle.evaluate((element, currentIndex) => {
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

              const name =
                element.getAttribute("aria-label")?.trim() ||
                element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ||
                "";

              return {
                key: [
                  element.tagName.toLowerCase(),
                  element.getAttribute("href") || "",
                  element.id || "",
                  name,
                  currentIndex,
                ].join("::"),
                index: currentIndex,
                tag: element.tagName.toLowerCase(),
                role: element.getAttribute("role"),
                name,
                href:
                  element instanceof HTMLAnchorElement
                    ? element.getAttribute("href")
                    : null,
                target:
                  element instanceof HTMLAnchorElement
                    ? element.getAttribute("target")
                    : null,
                ariaExpanded: element.getAttribute("aria-expanded"),
                ariaControls: element.getAttribute("aria-controls"),
                dataState: element.getAttribute("data-state"),
                type:
                  element instanceof HTMLInputElement
                    ? element.type || "text"
                    : null,
                scrollY: Math.round(window.scrollY),
              };
            }, index);

            if (!meta) continue;

            const entry = {
              route,
              viewport: viewport.name,
              element: meta,
              heuristic: true,
              result: "pass",
              observation: observationFor(meta),
            };

            try {
              await handle.click({ trial: true, timeout: 1_000 });
            } catch (error) {
              entry.result = "fail";
              entry.observation = `trial click failed: ${error.message}`;
            }

            results.push(entry);
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
      results.map(result => [
        `${result.route}::${result.viewport}::${result.element.key}`,
        result,
      ])
    ).values()
  );

  const summary = {
    total: deduped.length,
    failures: deduped.filter(result => result.result === "fail").length,
  };

  await writeJson("click-reachability.json", {
    generatedAt: new Date().toISOString(),
    summary,
    results: deduped,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
