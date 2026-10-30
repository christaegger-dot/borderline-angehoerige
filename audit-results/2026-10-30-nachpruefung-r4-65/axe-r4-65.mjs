// Nachprüfung r4-65: axe-core (eigener Ordner ausserhalb des Repositorys) auf allen Seiten von dist/site bei 390 und 1280 px.
// Aufruf: PLAYWRIGHT_MODULE=… node axe-r4-65.mjs <dist/site> <pfad/zu/axe.min.js>
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [dir, axePath] = process.argv.slice(2);
const pages = (await readdir(dir)).filter(f => f.endsWith('.html')).sort();
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.json': 'application/json', '.xml': 'application/xml' };
const browser = await chromium.launch();
let runs = 0, viol = 0; const out = [];
for (const w of [390, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  await ctx.route('http://pruef.test/**', async r => {
    const p = decodeURIComponent(new URL(r.request().url()).pathname.slice(1)) || 'index.html'; const f = join(dir, p);
    return existsSync(f) ? r.fulfill({ body: await readFile(f), contentType: T[extname(f)] || 'application/octet-stream' }) : r.fulfill({ status: 404, body: '' });
  });
  const pg = await ctx.newPage();
  for (const p of pages) {
    await pg.goto('http://pruef.test/' + p, { waitUntil: 'load' });
    await pg.addScriptTag({ path: axePath });
    const res = await pg.evaluate(async () => { const r = await axe.run(document, { resultTypes: ['violations'] }); return { v: axe.version, build: document.documentElement.getAttribute('data-puk-site-build') || document.body.getAttribute('data-puk-site-build'), violations: r.violations.map(x => x.id + ' (' + x.nodes.length + ')') }; });
    runs++; viol += res.violations.length;
    if (res.violations.length) out.push(`${w} ${p}: ${res.violations.join(', ')}`);
    if (runs === 1) out.unshift(`axe ${res.v} · Build ${res.build}`);
  }
  await ctx.close();
}
await browser.close();
console.log(out.join('\n') + `\nSeiten ${pages.length} · Läufe ${runs} · Verstösse ${viol}`);
