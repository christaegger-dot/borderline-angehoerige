// Nachprüfung r4-65 (PR #784): axe-core auf allen veröffentlichten Seiten bei 390 und 1280 px.
// axe-core liegt in einem eigenen Ordner ausserhalb des Repositorys und wird mit page.addScriptTag geladen.
// Aufruf: PLAYWRIGHT_MODULE=$(npm root -g)/playwright node axe-pr784.mjs <arbeitsbaum> <pfad/zu/axe.min.js>
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, extname } from 'node:path';
const [wt, axePath] = process.argv.slice(2);
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const cfg = JSON.parse(readFileSync(join(wt, 'authoring/site.config.json'), 'utf8'));
const pages = cfg.pages.filter(p => p.status === 'published').map(p => p.href);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json' };
const browser = await chromium.launch();
let runs = 0, viol = 0; const out = [];
for (const w of [390, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  await ctx.route('http://pruef.local/**', r => {
    const p = new URL(r.request().url()).pathname.replace(/^\//, '') || 'index.html';
    const fp = join(wt, 'site', p);
    return existsSync(fp) ? r.fulfill({ status: 200, contentType: MIME[extname(fp)] || 'application/octet-stream', body: readFileSync(fp) }) : r.fulfill({ status: 404, body: '' });
  });
  for (const href of pages) {
    const page = await ctx.newPage();
    await page.goto('http://pruef.local/' + href, { waitUntil: 'load' });
    const build = await page.getAttribute('html', 'data-puk-site-build');
    await page.addScriptTag({ path: axePath });
    const res = await page.evaluate(async () => { const r = await window.axe.run(document); return { v: r.violations.map(x => `${x.id} (${x.nodes.length})`), version: window.axe.version }; });
    runs++; viol += res.v.length;
    out.push(`${w}px | ${href} | build ${build} | axe ${res.version} | Verstösse: ${res.v.length ? res.v.join(', ') : 0}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
for (const l of out) console.log(l);
console.log(`Läufe: ${runs} · Seiten: ${pages.length} · Verstösse: ${viol}`);
