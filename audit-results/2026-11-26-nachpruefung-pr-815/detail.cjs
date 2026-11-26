// Detail N815: (1) Skalierung je Element über stabilen Pfad, (2) Verursacher des waagrechten Überlaufs.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const fs = require('fs');
const [base, site] = process.argv.slice(2);
const pages = fs.readdirSync(site).filter(f => f.endsWith('.html')).sort();
async function snap(b, w, font, p) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: font } });
  await pg.goto(base + '/' + p, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  const r = await pg.evaluate(() => {
    const path = e => { const a = []; while (e && e !== document.body) { let i = 1, s = e; while ((s = s.previousElementSibling)) i++; a.unshift(e.tagName.toLowerCase() + ':' + i); e = e.parentElement; } return a.join('>'); };
    const sizes = {}; const over = [];
    for (const e of document.querySelectorAll('body *')) {
      if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) sizes[path(e)] = [parseFloat(getComputedStyle(e).fontSize), e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/)[0] : ''), e.checkVisibility()];
      const rb = e.getBoundingClientRect();
      if (rb.width && rb.right > innerWidth + 1 && e.checkVisibility()) over.push([e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className : ''), Math.round(rb.left), Math.round(rb.right), Math.round(rb.width), getComputedStyle(e).minWidth, (e.innerText || '').trim().slice(0, 40)]);
    }
    return { sizes, over, sw: document.documentElement.scrollWidth };
  });
  await ctx.close(); return r;
}
(async () => {
  const b = await chromium.launch(); const ns = new Map(); const overs = {};
  for (const p of pages) for (const w of [320, 390, 1280]) {
    const a = await snap(b, w, 16, p), d = await snap(b, w, 32, p);
    for (const [k, [v, tag, vis]] of Object.entries(a.sizes)) { const x = d.sizes[k]; if (!x || !vis) continue; const ratio = x[0] / v; if (Math.abs(ratio - 2) > 0.02) { const key = `${w} ${tag} ${v}→${x[0]}`; ns.set(key, (ns.get(key) || []).concat(p)); } }
    if (w !== 1280) { const t = await snap(b, w, 48, p); if (t.over.length) overs[`${w}/48 ${p}`] = t.over.slice(0, 6); }
  }
  console.log('NICHT x2 (Breite Tag alt→neu: Seiten)'); for (const [k, v] of ns) console.log(k, ':', [...new Set(v)].length, [...new Set(v)].slice(0, 4).join(','));
  const ks = Object.keys(overs); console.log('\nÜBERLAUF 48px', ks.length); for (const k of ks.slice(0, 4)) console.log(k, JSON.stringify(overs[k]));
  await b.close();
})();
