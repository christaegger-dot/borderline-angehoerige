// Prüft die festgeschriebenen Such-Ersttreffer (authoring/tests/suche-ersttreffer.tsv) gegen eine gebaute Website.
// Die Suche läuft mit dem echten interaktion.js im Browser (Playwright mit Chromium).
//
// Aufruf: node authoring/tools/suchtest.mjs <site-ordner> [tsv]
//   vor dem Export gegen den Entwurf (z. B. dist/site), danach gegen site/
// Erwartung «!href» heisst: Ersttreffer darf nicht href sein; «–» heisst: kein Treffer;
// «href1 > href2 > …» heisst: die ersten Treffer in genau dieser Reihenfolge (Sicherheitsabschnitte, r4-32).
// «!sicher» heisst: unter den ersten zwei Treffern steht keiner der vier Sicherheitsabschnitte (harmlose Gegenproben, r4-33).
// Playwright braucht PLAYWRIGHT_BROWSERS_PATH (hier /opt/pw-browsers).
// Playwright: Modulpfad über PLAYWRIGHT_MODULE, sonst /opt/npm-tools/node_modules/playwright.
// Die CI installiert Playwright und führt dieselbe Suchregression aus. CHROMIUM_PATH erlaubt einen Systembrowser.
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
  const headers = Object.fromEntries(readFileSync(join(siteDir, '_headers'), 'utf8').split('\n').filter(l => /^\s+[^#\s][^:]+:/.test(l)).map(l => { const at=l.indexOf(':'); return [l.slice(0,at).trim(),l.slice(at+1).trim()]; }));
  res.writeHead(200, { ...headers, 'Content-Type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.goto(`http://127.0.0.1:${port}/suche.html`, { waitUntil: 'networkidle' });
const safety = new Set(['krise.html#suizid', 'grenzen.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen']);
const fails = [];
for (const [query, expected] of rows) {
  await page.fill('#site-search', query);
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href')));
  const sequence = expected.includes(' > ') ? expected.split(' > ') : null;
  const got = sequence ? hrefs.slice(0, sequence.length).join(' > ') || '–' : expected === '!sicher' ? hrefs.slice(0, 2).join(' > ') || '–' : (hrefs[0] || '–');
  const ok = sequence ? got === expected : expected === '!sicher' ? !hrefs.slice(0, 2).some(h => safety.has(h)) : expected.startsWith('!') ? got !== expected.slice(1) : got === expected;
  if (!ok) fails.push({ query, expected, got });
}
await browser.close();
server.close();
for (const f of fails) console.log(`ABWEICHUNG | ${f.query} | erwartet ${f.expected} | erhalten ${f.got}`);
console.log(`Suchtest: ${rows.length - fails.length} von ${rows.length} Erwartungen wie festgeschrieben · JS-Fehler ${errors.length}`);
process.exitCode = fails.length || errors.length ? 1 : 0;
