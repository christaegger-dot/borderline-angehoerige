const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => { const b = await chromium.launch();
  for (const [v, base] of [['r4-69','http://localhost:8801/'],['r4-70','http://localhost:8802/'],['r4-71','http://localhost:8803/']]) {
    const pg = await (await b.newContext({ viewport: { width: 375, height: 812 } })).newPage();
    await pg.goto(base + 'verstehen.html', { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
    const r = await pg.evaluate(() => { const f = document.querySelector('[data-visual-id="v-vs-anspannung"]'); const fr = f.getBoundingClientRect();
      const cards = [...f.querySelectorAll('li,article')].filter(e => e.getClientRects().length && e.querySelector('h3,h4,strong') && !e.closest('details'));
      return { figur: Math.round(fr.height), tiefsteKarteEnde: Math.round(Math.max(...cards.map(c => c.getBoundingClientRect().bottom)) - fr.top), karten: cards.length }; });
    console.log(v, JSON.stringify(r)); }
  await b.close(); })();
