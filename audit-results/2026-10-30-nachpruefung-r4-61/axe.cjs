// Nachprüfung r4-61 · axe-core auf allen Seiten von <siteDir> bei 390 und 1280 px.
// axe-core liegt in einem eigenen Ordner ausserhalb des Repositorys und wird per page.addScriptTag geladen.
// Aufruf: PLAYWRIGHT_MODULE=… node axe.cjs <siteDir> <pfad/zu/axe.min.js>
const { readFileSync, existsSync, readdirSync } = require('node:fs');
const { join, extname } = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [siteDir, axePath] = process.argv.slice(2);
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png' };
(async () => {
  const pages = readdirSync(siteDir).filter(f => f.endsWith('.html')).sort();
  const browser = await chromium.launch();
  let runs = 0, total = 0; const build = new Set();
  for (const w of [390, 1280]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    await ctx.route('http://np61.test/**', r => { const p = new URL(r.request().url()).pathname.slice(1) || 'index.html'; const f = join(siteDir, p); return existsSync(f) ? r.fulfill({ status: 200, contentType: T[extname(f)] || 'application/octet-stream', body: readFileSync(f) }) : r.fulfill({ status: 404, body: '' }); });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto('http://np61.test/' + p, { waitUntil: 'load' });
      build.add(await page.getAttribute('html', 'data-puk-site-build'));
      await page.addScriptTag({ path: axePath });
      const res = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ['violations'] })).violations.map(v => `${v.id} (${v.impact}, ${v.nodes.length})`));
      runs++; total += res.length;
      if (res.length) console.log(`${w} px ${p}: ${res.join('; ')}`);
    }
    await ctx.close();
  }
  console.log(`axe ${require(axePath.replace(/axe\.min\.js$/, 'package.json')).version} · Build ${[...build].join(',')} · Seiten ${pages.length} · Läufe ${runs} · Verstösse ${total}`);
  await browser.close();
})();
