// Nachprüfung r4-64: Trennung von «Fachstelle Angehörigenarbeit» bei 320 px und 200 % Schrift, r4-61 und r4-64.
// Aufruf: node trennung.cjs <url-r4-61> <url-r4-64> <ausgabeordner>
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [, , urlA, urlB, out] = process.argv;
(async () => {
  const b = await pw.chromium.launch();
  for (const [tag, base] of [['r4-61', urlA], ['r4-64', urlB]]) for (const w of [320, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p); await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32 } });
    await p.goto(base + '/index.html', { waitUntil: 'load' });
    const h = p.locator('#puk-site-info-title'); await h.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    const info = await h.evaluate(el => { const t = el.firstChild, lines = []; let cur = '', top = null;
      for (let i = 0; i < t.length; i++) { const rg = document.createRange(); rg.setStart(t, i); rg.setEnd(t, i + 1); const rc = rg.getClientRects()[0];
        if (rc && top !== null && rc.top > top + 2) { lines.push(cur); cur = ''; } if (rc) top = rc.top; cur += t.data[i]; }
      lines.push(cur); const cs = getComputedStyle(el); return { lines, hyphens: cs.hyphens, limit: cs.hyphenateLimitChars, width: el.clientWidth }; });
    console.log(tag, w + ' px 200 %', JSON.stringify(info));
    await h.screenshot({ path: `${out}/trennung-${tag}-${w}-200.png`, animations: 'disabled' });
    await ctx.close();
  }
  await b.close();
})();
