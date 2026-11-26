// r4-68 gegen r4-69: Lage und Grösse von Absendername, Footer-Links und Rechtsangaben, dazu die Seitenhöhe.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const fs = require('fs'); const [a, bUrl, site] = process.argv.slice(2);
const pages = fs.readdirSync(site).filter(f => f.endsWith('.html')).sort();
const sel = ['.puk-site-sender__name', '.puk-site-sender', '.puk-site-info-links', '.puk-site-legal'];
(async () => { const br = await chromium.launch(); let same = 0; const diff = [];
  for (const [w, f] of [[320,16],[390,16],[768,16],[1280,16],[320,32],[390,32],[1280,32],[320,48],[390,48]]) for (const p of pages) {
    const m = []; for (const base of [a, bUrl]) { const ctx = await br.newContext({ viewport: { width: w, height: 900 } }); const pg = await ctx.newPage();
      const cdp = await ctx.newCDPSession(pg); await cdp.send('Page.setFontSizes', { fontSizes: { standard: f } });
      await pg.goto(base + '/' + p, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
      m.push(await pg.evaluate(s => [document.documentElement.scrollHeight, ...s.map(x => { const e = document.querySelector(x); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)].join(','); })].join(' | '), sel)); await ctx.close(); }
    if (m[0] === m[1]) same++; else diff.push(`${w}/${f} ${p}\n  r4-68 ${m[0]}\n  r4-69 ${m[1]}`);
  }
  console.log('gleich', same, 'verschieden', diff.length); console.log(diff.slice(0, 60).join('\n')); await br.close(); })();
