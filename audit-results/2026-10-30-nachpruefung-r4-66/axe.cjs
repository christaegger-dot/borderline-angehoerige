// axe-core auf allen veröffentlichten Seiten bei 390 und 1280 px. Aufruf: node axe.cjs <dist-Ordner> <axe.min.js>
const { readFileSync, existsSync } = require('node:fs');
const { join, extname } = require('node:path');
const pw = require(process.env.PLAYWRIGHT_MODULE);
const [dist, axePath] = process.argv.slice(2);
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.json': 'application/json', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
(async () => {
  const pages = require('node:fs').readdirSync(dist).filter(f => f.endsWith('.html')).sort();
  const browser = await pw.chromium.launch();
  let runs = 0, viol = 0, build = '';
  for (const w of [390, 1280]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    await ctx.route('http://t/**', r => { const p = decodeURIComponent(new URL(r.request().url()).pathname.slice(1)) || 'index.html'; const f = join(dist, p); return existsSync(f) ? r.fulfill({ status: 200, contentType: MIME[extname(f)] || 'application/octet-stream', body: readFileSync(f) }) : r.fulfill({ status: 404, body: '' }); });
    for (const p of pages) {
      const pg = await ctx.newPage();
      await pg.goto('http://t/' + p, { waitUntil: 'load' });
      await pg.addScriptTag({ path: axePath });
      const res = await pg.evaluate(async () => { const r = await axe.run(document); return { v: r.violations.map(v => `${v.id} (${v.nodes.length})`), b: document.documentElement.getAttribute('data-puk-site-build') || (document.querySelector('[data-puk-site-build]') || {}).getAttribute?.('data-puk-site-build') }; });
      build = res.b || build; runs++; viol += res.v.length;
      if (res.v.length) console.log(`${w}px ${p}: ${res.v.join(', ')}`);
      await pg.close();
    }
    await ctx.close();
  }
  const ver = JSON.parse(readFileSync(join(axePath, '../package.json'), 'utf8')).version;
  console.log(`axe ${ver} · Build ${build} · Seiten ${pages.length} · Läufe ${runs} · Verstösse ${viol}`);
  await browser.close();
})();
