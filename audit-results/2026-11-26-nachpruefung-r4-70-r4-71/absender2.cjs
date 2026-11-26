// Absenderzeile: Zeilen über Textbereiche (Range auf Textknoten, nicht Elementboxen); «Beratung:» und Adresse auf derselben Zeile?
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const V = { 'r4-69': 'http://localhost:8801/', 'r4-70': 'http://localhost:8802/', 'r4-71': 'http://localhost:8803/' };
(async () => { const b = await chromium.launch(); const pagesTest = ['index.html', 'krise.html', '404.html'];
  for (const [v, base] of Object.entries(V)) { const zeilen = [];
    for (const font of [16, 32, 48]) { const getrennt = [], einr = [], ov = []; let n = 0;
      for (let w = 300; w <= 1440; w += 20) for (const p of (w % 100 === 0 ? pagesTest : ['index.html'])) {
        const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
        if (font !== 16) { const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } }); }
        await pg.goto(base + p, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); n++;
        const r = await pg.evaluate(() => {
          const p = document.querySelector('.puk-site-sender'); const left = p.getBoundingClientRect().left;
          const tr = el => { if (!el || !el.getClientRects().length) return []; const rg = document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()].filter(x => x.width > 0.5); };
          const lab = tr(p.querySelector('.puk-site-sender__contact')), adr = tr(p.querySelector('a'));
          const sameLine = (a, b) => a && b && Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < 6;
          const getrennt = lab.length && adr.length ? !sameLine(lab[lab.length - 1], adr[0]) : null;
          // Zeilenanfänge über alle sichtbaren Textteile
          const all = [...p.querySelectorAll('span,a')].filter(e => !e.querySelector('span,a') || e.tagName === 'A').flatMap(tr);
          const lines = []; for (const x of all) { const c = (x.top + x.bottom) / 2; let L = lines.find(l => Math.abs(l.c - c) < 6); if (!L) lines.push(L = { c, l: x.left }); L.l = Math.min(L.l, x.left); }
          const einr = lines.filter(L => L.l > left + 1).map(L => Math.round(L.l - left));
          return { getrennt, einr, zeilen: lines.length, ov: document.documentElement.scrollWidth - innerWidth };
        });
        if (r.getrennt) getrennt.push(w + (p === 'index.html' ? '' : p.replace('.html', ''))); if (r.einr.length) einr.push(w + ':' + r.einr.join('/')); if (r.ov > 0) ov.push(w + ':' + r.ov);
        await ctx.close(); }
      console.log(`${v} Schrift ${font}px (${n} Läufe, 300–1440 px, Schritt 20): Adresse ohne «Beratung:» auf neuer Zeile bei [${getrennt.join(' ')}]; eingerückte Zeile bei [${einr.join(' ')}]; Überlauf bei [${ov.join(' ')}]`); } }
  await b.close(); })();
