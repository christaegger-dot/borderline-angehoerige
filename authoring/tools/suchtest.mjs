// Prüft die festgeschriebenen Such-Ersttreffer (authoring/tests/suche-ersttreffer.tsv) gegen eine gebaute Website.
// Die Suche läuft mit dem echten interaktion.js im Browser (Playwright mit Chromium).
//
// Aufruf: node authoring/tools/suchtest.mjs <site-ordner> [tsv]
//   z. B. node authoring/tools/suchtest.mjs site
// Playwright: Modulpfad über PLAYWRIGHT_MODULE, sonst /opt/npm-tools/node_modules/playwright.
// Nicht Teil der CI (dort fehlt Playwright); in jeder Änderungsrunde mit Änderungen an Suche oder Inhalt ausführen.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const siteDir = resolve(process.argv[2] || 'site');
const tsvPath = resolve(process.argv[3] || join(here, '..', 'tests', 'suche-ersttreffer.tsv'));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');

const rows = readFileSync(tsvPath, 'utf8').split('\n').filter(l => l && !l.startsWith('#')).slice(1).map(l => l.split('\t'));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(siteDir, p);
  if (!f.startsWith(siteDir) || !existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.goto(`http://127.0.0.1:${port}/suche.html`, { waitUntil: 'networkidle' });
const fails = [];
for (const [query, expected] of rows) {
  await page.fill('#site-search', query);
  const got = await page.evaluate(() => { const a = document.querySelector('[data-search-results] > li:not([hidden]) a'); return a ? a.getAttribute('href') : '–'; });
  if (got !== expected) fails.push({ query, expected, got });
}
await browser.close();
server.close();
for (const f of fails) console.log(`ABWEICHUNG | ${f.query} | erwartet ${f.expected} | erhalten ${f.got}`);
console.log(`Suchtest: ${rows.length - fails.length} von ${rows.length} Ersttreffern wie festgeschrieben · JS-Fehler ${errors.length}`);
process.exitCode = fails.length || errors.length ? 1 : 0;
