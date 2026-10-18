// A03-218/219/253: Browserregression für Filter, Suche und thematische Akuthinweise.
// Wie suchtest.mjs: PLAYWRIGHT_MODULE und optional CHROMIUM_PATH setzen.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');
const site = resolve(process.argv[2] || 'dist/site');
const screenshots = process.argv[3] && resolve(process.argv[3]);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const file = resolve(site, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(site + sep) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
let browser;
let checks = 0;
const errors = [];
function check(actual, expected) { assert.deepEqual(actual, expected); checks++; }
try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(String(error)));
  const open = async name => {
    await page.goto(`http://127.0.0.1:${server.address().port}/${name}.html`);
    await page.locator('html[data-puk-js]').waitFor();
  };
  for (const [name, query, label, visible] of [
    ['behandlung', 'Jugendliche', 'Angeboten', 1],
    ['behandlung', 'DBT', 'Angeboten', 4],
    ['begriffe', 'Komorbidität', 'Begriffen', 1],
    ['quellen', 'Gewaltschutzgesetz', 'Quellengruppen', 1]
  ]) {
    await open(name);
    const root = page.locator('[data-puk-filter]');
    const selector = await root.getAttribute('data-filter-selector');
    const total = await root.locator(selector).count();
    await root.locator('[data-filter-input]').fill(query);
    check(await root.locator(selector).evaluateAll(items => items.filter(item => !item.hidden).length), visible);
    check(await root.locator('[data-filter-status]').textContent(), `${visible} von ${total} ${label} ${visible === 1 ? 'passt' : 'passen'} zu Ihrer Suche.`);
    await root.locator('[data-filter-input]').fill('zzzauditohnetreffer');
    check(await root.locator('[data-filter-status]').textContent(), `0 von ${total} ${label} passen zu Ihrer Suche.`);
    check(await root.locator('[data-filter-empty]').isVisible(), true);
    await root.locator('[data-filter-input]').fill('');
    check(await root.locator(selector).evaluateAll(items => items.every(item => !item.hidden)), true);
    check(await root.locator('[data-filter-empty]').isVisible(), false);
  }
  await open('suche');
  await page.locator('[data-search-input]').fill('Borderline');
  check(await page.locator('[data-search-item]:visible').count(), 20);
  check(/^Die ersten 20 von \d+ passenden Inhalten werden angezeigt\. Geben Sie einen genaueren Suchbegriff ein, um die Auswahl einzugrenzen\.$/.test(await page.locator('[data-search-status]').textContent()), true);
  await page.locator('[data-search-input]').fill('zzzauditohnetreffer');
  check(await page.locator('[data-search-status]').textContent(), 'Keine passenden Inhalte gefunden.');
  check((await page.locator('[data-search-empty]').textContent()).includes('Keine passenden Inhalte gefunden.'), false);
  check(await page.locator('[data-search-empty] a').getAttribute('href'), 'fragen.html');
  await page.locator('[data-search-input]').fill('');
  check(await page.locator('[data-search-directory]').isVisible(), true);
  const badExcerpts = await page.locator('[data-search-item] > p:last-child').evaluateAll(items => items.map(item => item.textContent).filter(text => text.endsWith('…')));
  check(badExcerpts, []);
  for (const name of ['kurz', 'verstehen', 'diagnose', 'grenzen', 'kommunizieren', 'krise', 'kinder']) {
    await open(name);
    const references = page.locator('[data-responsibility-inline]');
    check(await references.count() > 0, true);
    for (const reference of await references.all()) {
      check(await reference.locator('a[href="tel:144"]').textContent(), '144');
      check(await reference.locator('a[href="tel:117"]').textContent(), '117');
    }
    check(await page.locator('footer a[href="tel:144"], footer a[href="tel:117"]').count(), 0);
  }
  if (screenshots) mkdirSync(screenshots, { recursive: true });
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ['krise', 'genesung', 'grenzen', 'beziehungen', 'selbstfuersorge']) {
      await open(name);
      await page.locator('details').evaluateAll(items => items.forEach(item => { item.open = true; }));
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
      if (screenshots && width !== 320) {
        const target = name === 'genesung' ? '[data-visual-id="v-ge-forschung"]' : name === 'grenzen' ? '[data-visual-id="v-gr-dear"]' : name === 'beziehungen' ? '[data-visual-id="v-bz-sichten"]' : name === 'selbstfuersorge' ? '#eigenes-leben' : 'section[aria-labelledby="krise-schnell"]';
        const element = page.locator(target);
        await element.scrollIntoViewIfNeeded();
        await element.screenshot({ path: join(screenshots, `${name}-${width}.png`) });
      }
    }
  }
  check(errors, []);
  console.log(`Sprach-/UI-Test: ${checks} Prüfungen bestanden · JS-Fehler ${errors.length}`);
} finally {
  await browser?.close();
  server.close();
}
