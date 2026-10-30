// Nachtrag zur Nachprüfung r4-60 (übernommen aus der Nachprüfung r4-59): axe-core auf allen Seiten von <siteDir>, 390 und 1280 px, per page.addScriptTag.
// Aufruf: PLAYWRIGHT_MODULE=… node axe.mjs <siteDir> <pfad/zu/axe.min.js>
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [siteDir, axePath] = process.argv.slice(2);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png' };
const pages = readdirSync(siteDir).filter(f => f.endsWith('.html')).sort();
const browser = await chromium.launch();
let runs = 0, total = 0; const build = new Set();
for (const width of [390, 1280]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  await ctx.route('http://pruefung.test/**', route => {
    const f = join(siteDir, new URL(route.request().url()).pathname.slice(1) || 'index.html');
    if (!existsSync(f)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: MIME[extname(f)] || 'application/octet-stream', body: readFileSync(f) });
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto('http://pruefung.test/' + p, { waitUntil: 'load' });
    build.add(await page.getAttribute('html', 'data-puk-site-build'));
    await page.addScriptTag({ path: axePath });
    const r = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
    runs++; total += r.violations.length;
    for (const v of r.violations) console.log(`${width}px ${p}: ${v.id} (${v.impact}) ${v.nodes.length} Knoten`);
  }
  await ctx.close();
}
const ver = JSON.parse(readFileSync(join(axePath, '../package.json'), 'utf8')).version;
console.log(`axe ${ver}, build ${[...build].join(',')} · Läufe: ${runs} · Seiten: ${pages.length} · Verstösse: ${total}`);
await browser.close();
