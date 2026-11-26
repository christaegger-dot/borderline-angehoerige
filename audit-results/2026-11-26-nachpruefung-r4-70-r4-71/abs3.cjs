const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => { const b = await chromium.launch();
  for (const [v, base] of [['r4-69','http://localhost:8801/'],['r4-71','http://localhost:8803/']]) for (const [w, f] of [[320,16],[600,32],[980,48],[840,16],[1100,32]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
    if (f !== 16) { const c = await ctx.newCDPSession(pg); await c.send('Page.setFontSizes', { fontSizes: { standard: f } }); }
    await pg.goto(base + 'index.html', { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
    const r = await pg.evaluate(() => { const p = document.querySelector('.puk-site-sender'); const lines = [];
      const add = (el, name) => { if (!el || !el.getClientRects().length) return; const rg = document.createRange(); rg.selectNodeContents(el); for (const x of rg.getClientRects()) { if (x.width < 1) continue; const c = (x.top + x.bottom) / 2; let L = lines.find(l => Math.abs(l.c - c) < 6); if (!L) lines.push(L = { c, t: [] }); if (!L.t.includes(name)) L.t.push(name); } };
      add(p.querySelector('.puk-site-sender__label'), 'Bezeichnung'); add(p.querySelector('.puk-site-sender__name'), 'Name'); add(p.querySelector('.puk-site-sender__contact'), 'Beratung:'); add(p.querySelector('a'), 'Adresse');
      return lines.sort((a, b) => a.c - b.c).map(l => l.t.join('+')).join(' | '); });
    console.log(`${v} ${w}px Schrift ${f}: ${r}`); await ctx.close(); }
  await b.close(); })();
