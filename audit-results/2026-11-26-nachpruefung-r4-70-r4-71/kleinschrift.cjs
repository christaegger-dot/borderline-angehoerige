const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const V = { 'r4-70': 'http://localhost:8802/', 'r4-71': 'http://localhost:8803/' };
(async () => { const b = await chromium.launch();
  for (const font of [12, 13, 14, 15]) for (const [v, base] of Object.entries(V)) { const r = [];
    for (const w of [600, 640, 680, 700, 720, 740, 760, 761]) {
      const ctx = await b.newContext({ viewport: { width: w, height: 400 } }); const pg = await ctx.newPage();
      const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } });
      await pg.goto(base + 'index.html', { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
      const x = await pg.evaluate(() => ({ ov: document.documentElement.scrollWidth - innerWidth, nav: [...document.querySelectorAll('.puk-web-nav a')].filter(a => a.getClientRects().length).length, util: [...document.querySelectorAll('.puk-site-utility a')].filter(a => a.getClientRects().length).length }));
      r.push(`${w}:${x.ov}/${x.nav}+${x.util}`); await ctx.close(); }
    console.log(`font ${font} ${v}  (Breite:Überlauf/sichtbare Nav-Links+Zeile)`, r.join(' ')); }
  await b.close(); })();
