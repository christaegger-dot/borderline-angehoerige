const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const V = { 'r4-69': 'http://localhost:8801/', 'r4-70': 'http://localhost:8802/', 'r4-71': 'http://localhost:8803/' };
(async () => { const b = await chromium.launch();
  for (const p of ['index.html', 'krise.html', 'verstehen.html']) for (const [v, base] of Object.entries(V)) { const vals = []; let src = new Set();
    for (let i = 0; i < 4; i++) { const ctx = await b.newContext({ viewport: { width: 375, height: 812 } }); const pg = await ctx.newPage();
      await pg.addInitScript(() => { window.__cls = 0; window.__src = []; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; for (const s of e.sources || []) window.__src.push((s.node && (s.node.className || s.node.nodeName) || '?') + ''); } }).observe({ type: 'layout-shift', buffered: true }); });
      await pg.goto(base + p, { waitUntil: 'load' }); await pg.waitForTimeout(1000);
      const r = await pg.evaluate(() => ({ c: window.__cls, s: window.__src })); vals.push(Math.round(r.c * 1000) / 1000); r.s.forEach(x => src.add(String(x).slice(0, 40))); await ctx.close(); }
    console.log(`${v} ${p} CLS 4 Läufe:`, vals.join(' '), '| Quellen:', [...src].slice(0, 6).join(' ; ')); }
  await b.close(); })();
