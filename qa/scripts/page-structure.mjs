import {
  ROUTES,
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
    for (const route of ROUTES) {
      const { context, page } = await openRoute(
        browser,
        route,
        DESKTOP_VIEWPORT
      );

      const summary = await page.evaluate(() => {
        const summarizeAccessibleName = element => {
          const ariaLabel = element.getAttribute("aria-label")?.trim();
          if (ariaLabel) return ariaLabel;

          const labelledBy = element.getAttribute("aria-labelledby");
          if (labelledBy) {
            const text = labelledBy
              .split(/\s+/)
              .map(id => document.getElementById(id)?.textContent?.trim() ?? "")
              .join(" ")
              .trim();
            if (text) return text;
          }

          if (
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement
          ) {
            const labelText = Array.from(element.labels ?? [])
              .map(label => label.textContent?.trim() ?? "")
              .join(" ")
              .trim();
            if (labelText) return labelText;
          }

          const title = element.getAttribute("title")?.trim();
          if (title) return title;

          const text = element.textContent?.trim();
          if (text) return text.replace(/\s+/g, " ");

          const alt = element.getAttribute("alt")?.trim();
          if (alt) return alt;

          return "";
        };

        const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"))
          .map((heading, index) => ({
            index,
            tag: heading.tagName.toLowerCase(),
            level: Number(heading.tagName.slice(1)),
            text: heading.textContent?.trim() ?? "",
          }))
          .filter(heading => heading.text);

        const headingJumps = [];
        for (let index = 1; index < headings.length; index += 1) {
          const previous = headings[index - 1];
          const current = headings[index];
          if (current.level > previous.level + 1) {
            headingJumps.push({
              from: `${previous.tag}: ${previous.text}`,
              to: `${current.tag}: ${current.text}`,
            });
          }
        }

        const controls = Array.from(
          document.querySelectorAll(
            "a[href], button, input, textarea, select, [role='button'], [role='link']"
          )
        ).map((element, index) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          const name = summarizeAccessibleName(element);
          const hidden =
            rect.width < 1 ||
            rect.height < 1 ||
            style.display === "none" ||
            style.visibility === "hidden" ||
            element.getAttribute("aria-hidden") === "true";

          return {
            index,
            tag: element.tagName.toLowerCase(),
            type:
              element instanceof HTMLInputElement
                ? element.type || "text"
                : null,
            role: element.getAttribute("role"),
            name,
            hidden,
          };
        });

        const unlabeledControls = controls.filter(
          control =>
            !control.hidden &&
            !control.name &&
            !(control.tag === "input" && control.type === "hidden")
        );

        const inputsWithoutLabels = controls.filter(
          control =>
            !control.hidden &&
            ["input", "textarea", "select"].includes(control.tag) &&
            control.type !== "hidden" &&
            !control.name
        );

        const images = Array.from(document.querySelectorAll("img")).map(
          (image, index) => ({
            index,
            src: image.getAttribute("src"),
            alt: image.getAttribute("alt"),
          })
        );

        const landmarks = {
          main: document.querySelectorAll("main, [role='main']").length,
          nav: document.querySelectorAll("nav, [role='navigation']").length,
          header: document.querySelectorAll("header, [role='banner']").length,
          footer: document.querySelectorAll("footer, [role='contentinfo']")
            .length,
        };

        return {
          title: document.title,
          h1Count: document.querySelectorAll("h1").length,
          headings,
          headingJumps,
          landmarks,
          imageSummary: {
            total: images.length,
            missingAlt: images.filter(image => image.alt === null).length,
            emptyAlt: images.filter(image => image.alt === "").length,
          },
          unlabeledControls,
          inputsWithoutLabels,
        };
      });

      results.push({ route, ...summary });
      await context.close();
    }
  } finally {
    await browser.close();
  }

  await writeJson("page-structure.json", {
    generatedAt: new Date().toISOString(),
    viewport: DESKTOP_VIEWPORT,
    results,
  });
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
