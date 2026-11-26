const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => { const b = await chromium.launch();
  for (const [v, base] of [['r4-70', 'http://localhost:8802/'], ['r4-71', 'http://localhost:8803/']]) {
    const ctx = await b.newContext({ viewport: { width: 375, height: 812 } }); const pg = await ctx.newPage();
    await pg.goto(base + 'suche.html', { waitUntil: 'load' });
    // Tastatur: ab Seitenanfang tabben bis Menüknopf, öffnen mit Enter, dann Tab durch das Menü
    const seq = [];
    for (let i = 0; i < 3; i++) { await pg.keyboard.press('Tab'); seq.push(await pg.evaluate(() => (document.activeElement.textContent || '').trim().slice(0, 20) || document.activeElement.tagName)); }
    await pg.keyboard.press('Enter');
    const exp = await pg.evaluate(() => document.querySelector('.puk-site-menu .puk-disclosure__button').getAttribute('aria-expanded'));
    const ring = [];
    for (let i = 0; i < 9; i++) { await pg.keyboard.press('Tab'); ring.push(await pg.evaluate(() => { const e = document.activeElement, s = getComputedStyle(e), r = e.getBoundingClientRect(); return `${(e.textContent || '').trim().slice(0, 14)}[fv=${e.matches(':focus-visible')} ring=${s.boxShadow !== 'none' || s.outlineStyle !== 'none'} h=${Math.round(r.height)} sichtbar=${r.bottom <= innerHeight && r.top >= 0} cur=${e.getAttribute('aria-current')}]`; })); }
    await pg.keyboard.press('Shift+Tab'); await pg.keyboard.press('Shift+Tab');
    await pg.keyboard.press('Escape');
    const esc = await pg.evaluate(() => ({ exp: document.querySelector('.puk-site-menu .puk-disclosure__button').getAttribute('aria-expanded'), fokus: (document.activeElement.textContent || document.activeElement.tagName).trim().slice(0, 20) }));
    await pg.locator('.puk-site-menu .puk-disclosure__button').click();
    const snap = await pg.locator('header').ariaSnapshot();
    console.log(v, 'Tab bis Knopf:', seq.join(' > '), '| nach Enter expanded=', exp);
    console.log('  im Menü:', ring.join(' > '));
    console.log('  Escape im Menü:', JSON.stringify(esc));
    console.log('  Bildschirmleser (Kopf, Menü offen):\n' + snap.split('\n').map(l => '    ' + l).join('\n'));
    await ctx.close(); }
  await b.close(); })();
