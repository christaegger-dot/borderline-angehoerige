// Nachprüfung r4-64: axe-core (eigener Ordner ausserhalb des Repositorys) auf allen Seiten,
// bei 390 und 1280 px mit Standardschrift und bei 320 und 1440 px mit 200 % Schrift (CDP Page.setFontSizes).
// Aufruf: PLAYWRIGHT_MODULE=… node axe-r4-64.cjs <basis-url> <siteDir> <axe.min.js>
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const fs = require('fs');
const [base, site, axePath] = process.argv.slice(2);
const pages = fs.readdirSync(site).filter(f => f.endsWith('.html')).sort();
(async () => {
  const b = await chromium.launch(); let runs = 0, viol = 0; const build = new Set();
  for (const [w, font] of [[390, 16], [1280, 16], [320, 32], [1440, 32]]) for (const p of pages) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
    const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } });
    await pg.goto(base + '/' + p, { waitUntil: 'load' });
    build.add(await pg.getAttribute('html', 'data-puk-site-build'));
    await pg.addScriptTag({ path: axePath });
    const res = await pg.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
    runs++; viol += res.violations.length;
    for (const v of res.violations) console.log(`${w}/${font} ${p} ${v.id} (${v.nodes.length})`);
    await ctx.close();
  }
  const ver = JSON.parse(fs.readFileSync(require('path').join(axePath, '..', 'package.json'))).version;
  console.log(`build ${[...build].join(',')} · Seiten: ${pages.length} · Läufe: ${runs} · Verstösse: ${viol} · axe-core ${ver} · Chromium ${b.version()}`);
  await b.close();
})();
