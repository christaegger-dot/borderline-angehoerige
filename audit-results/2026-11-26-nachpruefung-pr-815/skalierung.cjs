// Eigene Messung N815: Skalieren alle Textgrössen mit der Standardschrift? Überlauf/Abschneiden bei 200 % und 300 %?
// Aufruf: PLAYWRIGHT_MODULE=… node skalierung.cjs <basis-url> <siteDir>
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const fs = require('fs');
const [base, site] = process.argv.slice(2);
const pages = fs.readdirSync(site).filter(f => f.endsWith('.html')).sort();
async function snap(b, w, font, p) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } });
  await pg.goto(base + '/' + p, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  const r = await pg.evaluate(() => {
    const out = { sizes: [], clipped: [], hscroll: document.documentElement.scrollWidth - innerWidth, html: getComputedStyle(document.documentElement).fontSize, textScaleMeta: !!document.querySelector('meta[name="text-scale"][content="scale"]') };
    const els = [...document.querySelectorAll('body *')].filter(e => e.checkVisibility && e.checkVisibility({ visibilityProperty: true, opacityProperty: true }));
    els.forEach((e, i) => {
      const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (own) out.sizes.push([i, e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''), parseFloat(getComputedStyle(e).fontSize)]);
      const cs = getComputedStyle(e);
      const clipX = /hidden|clip/.test(cs.overflowX), clipY = /hidden|clip/.test(cs.overflowY);
      if ((clipX || clipY) && e.innerText && e.innerText.trim() && e.getBoundingClientRect().width > 2) {
        if ((clipY && e.scrollHeight > e.clientHeight + 1) || (clipX && e.scrollWidth > e.clientWidth + 1))
          out.clipped.push(e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className : '') + ` ${e.scrollWidth}x${e.scrollHeight}>${e.clientWidth}x${e.clientHeight}`);
      }
      if (cs.whiteSpace === 'nowrap' && own && e.parentElement) {
        const rb = e.getBoundingClientRect();
        if (rb.right > innerWidth + 1) out.clipped.push('nowrap-out ' + e.tagName.toLowerCase() + '.' + e.className + ' right=' + Math.round(rb.right));
      }
    });
    return out;
  });
  await ctx.close(); return r;
}
(async () => {
  const b = await chromium.launch(); const sum = { pages: pages.length, notScaling: [], clipped: [], hscroll: [], meta: 0, chromium: b.version() };
  for (const p of pages) {
    for (const w of [320, 390, 1280]) {
      const a = await snap(b, w, 16, p), d = await snap(b, w, 32, p), t = await snap(b, w, 48, p);
      if (w === 390) { if (a.textScaleMeta) sum.meta++; if (p === 'verstehen.html') sum.htmlFont = [a.html, d.html, t.html]; }
      // Index-Abgleich nur, wenn dieselbe Elementliste
      const m = new Map(d.sizes.map(s => [s[0] + s[1], s[2]]));
      for (const s of a.sizes) { const v = m.get(s[0] + s[1]); if (v !== undefined && Math.abs(v / s[2] - 2) > 0.02) sum.notScaling.push(`${w} ${p} ${s[1]} ${s[2]}→${v}`); }
      for (const [f, r] of [[32, d], [48, t]]) { if (r.hscroll > 0) sum.hscroll.push(`${w}/${f} ${p} +${r.hscroll}px`); for (const c of r.clipped) sum.clipped.push(`${w}/${f} ${p} ${c}`); }
    }
  }
  sum.notScalingUnique = [...new Set(sum.notScaling.map(x => x.split(' ').slice(2).join(' ').replace(/ \d.*/, '') + ' ' + x.split(' ').slice(3).join(' ')))].slice(0, 40);
  console.log(JSON.stringify(sum, null, 1)); await b.close();
})();
