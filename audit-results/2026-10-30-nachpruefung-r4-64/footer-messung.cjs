// Nachprüfung r4-64: Footer von r4-61 und r4-64 messen (eigenes Skript, keine Übernahme aus dem Selbstbericht).
// Aufruf: node footer-messung.cjs <site-r4-61> <site-r4-64> <ausgabe.json> <url-r4-61> <url-r4-64>
// Die Seiten werden über einen lokalen HTTP-Server geladen, damit auch 404.html (Pfade ab /) ihr Stylesheet erhält.
const pw = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs'), path = require('path');
const [, , dirA, dirB, out, urlA, urlB] = process.argv;
const widths = [320, 390, 768, 1100, 1440], fonts = [16, 32];
function lum(c){const m=c.match(/[\d.]+/g).map(Number);const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2])}
(async () => {
  const b = await pw.chromium.launch();
  const res = {};
  for (const [tag, dir, base] of [['r4-61', dirA, urlA], ['r4-64', dirB, urlB]]) {
    const pages = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();
    res[tag] = [];
    for (const fs_ of fonts) for (const w of widths) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
      const p = await ctx.newPage();
      const cdp = await ctx.newCDPSession(p);
      await cdp.send('Page.setFontSizes', { fontSizes: { standard: fs_ } });
      for (const f of pages) {
        await p.goto(base + '/' + f, { waitUntil: 'networkidle' });
        const r = await p.evaluate(() => {
          const ft = document.querySelector('footer.puk-web-footer'); if (!ft) return null;
          const hs = [...ft.querySelectorAll('.puk-web-footer__heading')].map(h => {
            const cs = getComputedStyle(h), lh = parseFloat(cs.lineHeight);
            // Zeilenwechsel mitten im Wort suchen
            const t = h.firstChild, breaks = [];
            if (t && t.nodeType === 3) { let top = null; for (let i = 0; i < t.length; i++) { const rg = document.createRange(); rg.setStart(t, i); rg.setEnd(t, i + 1); const rc = rg.getClientRects()[0]; if (!rc || !rc.width) continue; if (top !== null && rc.top > top + 2) { const prev = t.data[i - 1]; if (prev !== ' ' && prev !== '-') breaks.push(t.data.slice(0, i) + '|' + t.data.slice(i)); } top = rc.top; } }
            return { text: h.textContent, weight: cs.fontWeight, size: cs.fontSize, color: cs.color, hyphens: cs.hyphens, lines: Math.round(h.getBoundingClientRect().height / lh), midWord: breaks };
          });
          const bd = ft.querySelector('.puk-web-footer__boundary'), prev = bd.previousElementSibling;
          let bg = 'rgb(255, 255, 255)'; for (let e = ft; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') { bg = c; break; } }
          return { footer: Math.round(ft.getBoundingClientRect().height), headings: hs, boundaryMarginTop: getComputedStyle(bd).marginTop,
            gapBeforeBoundary: Math.round(bd.getBoundingClientRect().top - prev.getBoundingClientRect().bottom), bg,
            overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth };
        });
        if (r) { r.headings.forEach(h => { const L = [lum(h.color), lum(r.bg)].sort((a, b) => b - a); h.contrast = +((L[0] + .05) / (L[1] + .05)).toFixed(2); }); res[tag].push({ page: f, w, font: fs_, ...r }); }
      }
      if (tag === 'r4-64' && w === 1440 && fs_ === 16) { await p.goto(base + '/index.html', { waitUntil: 'networkidle' }); const ft = p.locator('footer.puk-web-footer'); await ft.scrollIntoViewIfNeeded(); await p.waitForTimeout(800); await ft.screenshot({ animations: 'disabled', path: path.join(path.dirname(out), `footer-r4-64-1440.png`) }); }
      await ctx.close();
    }
  }
  await b.close();
  fs.writeFileSync(out, JSON.stringify(res));
})();
