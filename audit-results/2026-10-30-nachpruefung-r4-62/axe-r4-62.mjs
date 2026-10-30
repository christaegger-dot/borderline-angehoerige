// Nachprüfung r4-62: axe-core (eigener Ordner ausserhalb des Repositorys) auf allen veröffentlichten Seiten bei 390 und 1280 px.
// Aufruf: PLAYWRIGHT_MODULE=… node axe-r4-62.mjs <siteDir> <axe.min.js>
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [site, axePath] = process.argv.slice(2);
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.png': 'image/png' };
const pages = readdirSync(site).filter(f => f.endsWith('.html')).sort();
const b = await chromium.launch(); let runs = 0, viol = 0; const build = new Set();
for (const w of [390, 1280]) for (const p of pages) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
  await pg.route('http://pruef.local/**', async r => { const f = join(site, new URL(r.request().url()).pathname.slice(1)); return existsSync(f) ? r.fulfill({ status: 200, contentType: T[extname(f)] || 'application/octet-stream', body: readFileSync(f) }) : r.fulfill({ status: 404, body: '' }); });
  await pg.goto('http://pruef.local/' + p, { waitUntil: 'load' });
  build.add(await pg.getAttribute('html', 'data-puk-site-build'));
  await pg.addScriptTag({ path: axePath });
  const res = await pg.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
  runs++; viol += res.violations.length;
  for (const v of res.violations) console.log(`${w} ${p} ${v.id} (${v.nodes.length})`);
  await ctx.close();
}
console.log(`build ${[...build].join(',')} · Seiten: ${pages.length} · Läufe: ${runs} · Verstösse: ${viol} · Chromium ${b.version()}`);
await b.close();
