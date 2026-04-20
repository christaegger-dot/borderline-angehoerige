import { chromium } from "playwright";

const URL = "https://www.seconds-innovation.com/";
const OUT = "/home/user/borderline-angehoerige/_dev/screenshots";

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  });

  // Desktop viewport
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ignoreHTTPSErrors: true,
  });
  const desktopPage = await desktopCtx.newPage();

  console.log("Loading desktop page...");
  await desktopPage.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await desktopPage.waitForTimeout(3000); // wait for animations

  // Full page screenshot (desktop)
  await desktopPage.screenshot({
    path: `${OUT}/desktop-full.png`,
    fullPage: true,
  });
  console.log("Desktop full page screenshot saved");

  // Above-the-fold screenshot
  await desktopPage.screenshot({ path: `${OUT}/desktop-above-fold.png` });
  console.log("Desktop above-fold screenshot saved");

  // Scroll down and capture sections
  const totalHeight = await desktopPage.evaluate(
    () => document.body.scrollHeight
  );
  console.log(`Total page height: ${totalHeight}px`);

  // Capture at 25%, 50%, 75% scroll positions
  for (const pct of [25, 50, 75]) {
    const scrollY = Math.floor((totalHeight * pct) / 100);
    await desktopPage.evaluate(y => window.scrollTo(0, y), scrollY);
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: `${OUT}/desktop-${pct}pct.png` });
    console.log(`Desktop ${pct}% screenshot saved (scrollY=${scrollY})`);
  }

  // Scroll to footer
  await desktopPage.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight)
  );
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: `${OUT}/desktop-footer.png` });
  console.log("Desktop footer screenshot saved");

  // Mobile viewport
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    isMobile: true,
    ignoreHTTPSErrors: true,
  });
  const mobilePage = await mobileCtx.newPage();

  console.log("Loading mobile page...");
  await mobilePage.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await mobilePage.waitForTimeout(3000);

  await mobilePage.screenshot({
    path: `${OUT}/mobile-full.png`,
    fullPage: true,
  });
  console.log("Mobile full page screenshot saved");

  await mobilePage.screenshot({ path: `${OUT}/mobile-above-fold.png` });
  console.log("Mobile above-fold screenshot saved");

  // Extract page metadata
  const metadata = await desktopPage.evaluate(() => {
    const styles = getComputedStyle(document.body);
    const allLinks = Array.from(
      document.querySelectorAll("nav a, header a")
    ).map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute("href"),
    }));
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .slice(0, 20)
      .map(h => ({
        tag: h.tagName,
        text: h.textContent?.trim().substring(0, 100),
      }));
    const sections = Array.from(
      document.querySelectorAll('section, [class*="section"]')
    ).map((s, i) => ({
      index: i,
      className: s.className?.substring(0, 100),
      id: s.id,
      childCount: s.children.length,
    }));
    const meta = {};
    document.querySelectorAll("meta").forEach(m => {
      const name = m.getAttribute("name") || m.getAttribute("property");
      if (name) meta[name] = m.getAttribute("content")?.substring(0, 200);
    });
    const generator = document
      .querySelector('meta[name="generator"]')
      ?.getAttribute("content");
    const bodyClasses = document.body.className;
    const htmlClasses = document.documentElement.className;

    return {
      title: document.title,
      generator,
      bodyClasses,
      htmlClasses,
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      fontFamily: styles.fontFamily,
      navLinks: allLinks,
      headings,
      sections,
      meta,
      totalHeight: document.body.scrollHeight,
    };
  });

  // Write metadata to JSON
  const fs = await import("fs");
  fs.writeFileSync(`${OUT}/metadata.json`, JSON.stringify(metadata, null, 2));
  console.log("Metadata saved");
  console.log("Title:", metadata.title);
  console.log("Generator:", metadata.generator);
  console.log("Font:", metadata.fontFamily);
  console.log("Background:", metadata.backgroundColor);
  console.log("Text color:", metadata.color);
  console.log("Nav links:", metadata.navLinks?.length);
  console.log("Headings:", metadata.headings?.length);
  console.log("Sections:", metadata.sections?.length);

  await browser.close();
  console.log("Done!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
