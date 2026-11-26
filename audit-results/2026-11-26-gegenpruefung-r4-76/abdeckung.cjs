// Gegenprüfung r4-76: Abdeckung je Aussage. Für jede Aussage des Rasters der bauenden Sitzung (raster.cjs) wird gezählt,
// in wie vielen der 432 Sätze (18 Handelnde × 24 Nachsätze) der PASSENDE Sicherheitsabschnitt unter den ersten zwei Treffern steht.
// Passend: Suizid → krise#suizid; Selbstverletzung → krise#selbstverletzung; Gewalt → gefahr#gewalt oder kinder#eskalation.
// Aufruf: node abdeckung.cjs <raster.cjs> <ausgabe.txt> name=site name=site ...
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/borderline-browser/node_modules/playwright');
const [rasterFile, outFile, ...specs] = process.argv.slice(2);
const src = fs.readFileSync(rasterFile, 'utf8'); const g = n => eval(src.match(new RegExp('const ' + n + ' = (\\[[\\s\\S]*?\\]);'))[1]);
const A = g('ACTORS'), P = g('PREDICATES'), X = g('SUFFIXES');
const iS = P.indexOf('ritzt sich'), iG = P.indexOf('schlägt');
const want = i => i < iS ? ['krise.html#suizid'] : i < iG ? ['krise.html#selbstverletzung'] : ['gefahr.html#gewalt', 'kinder.html#eskalation'];
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
function serve(dir) { dir = path.resolve(dir); const s = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f)); }); return new Promise(ok => s.listen(0, '127.0.0.1', () => ok(s))); }
(async () => {
  const browser = await chromium.launch(), names = [], cov = [], errors = [], servers = [];
  for (const spec of specs) { const [name, dir] = spec.split('='); names.push(name); const s = await serve(dir); servers.push(s); const page = await browser.newPage(); page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    const row = [];
    for (let i = 0; i < P.length; i++) { const qs = A.flatMap(a => X.map(x => [a, P[i], x].filter(Boolean).join(' ')));
      const res = await page.evaluate(qs => { const input = document.querySelector('#site-search'); return qs.map(q => { input.value = q; input.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].slice(0, 2).map(a => a.getAttribute('href')); }); }, qs);
      row.push({ ok: res.filter(h => h.some(x => want(i).includes(x))).length, leer: res.filter(h => !h.length).length, n: qs.length }); }
    cov.push(row); }
  const lines = [`# Passender Sicherheitsabschnitt unter den ersten zwei, je Aussage (von ${A.length * X.length} Sätzen) · JS-Fehler ${errors.length}`, `Aussage | ${names.map(n => n + ' passend / leer').join(' | ')}`];
  const sum = names.map(() => [0, 0, 0]);
  P.forEach((p, i) => { lines.push(`${p} | ${cov.map((r, s) => { sum[s][0] += r[i].ok; sum[s][1] += r[i].leer; sum[s][2] += r[i].n; return `${r[i].ok} / ${r[i].leer}`; }).join(' | ')}`); });
  for (const [lab, a, b] of [['Suizid', 0, iS], ['Selbstverletzung', iS, iG], ['Gewalt', iG, P.length]]) lines.push(`SUMME ${lab} | ${cov.map(r => { const o = r.slice(a, b).reduce((t, x) => t + x.ok, 0), l = r.slice(a, b).reduce((t, x) => t + x.leer, 0), n = r.slice(a, b).reduce((t, x) => t + x.n, 0); return `${o} von ${n} (${(100 * o / n).toFixed(1)} %) / leer ${l}`; }).join(' | ')}`);
  lines.push(`SUMME alle | ${sum.map(([o, l, n]) => `${o} von ${n} (${(100 * o / n).toFixed(1)} %) / leer ${l}`).join(' | ')}`);
  fs.writeFileSync(outFile, lines.join('\n') + '\n'); console.log(lines.join('\n'));
  await browser.close(); servers.forEach(s => s.close());
})();
