// Drei Stände vergleichen: node drei.cjs <r4-73> <r4-74> <r4-75> <Anfragedatei> [--alle]
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');
const [d73, d74, d75, file, flag] = process.argv.slice(2);
const SAFETY = ['krise.html#suizid', 'gefahr.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen'];
function serve(dir) { const s = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p); if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream' }); res.end(fs.readFileSync(f)); }); return new Promise(r => s.listen(0, '127.0.0.1', () => r(s))); }
(async () => {
  const qs = fs.readFileSync(file, 'utf8').split('\n').filter(l => l && !l.startsWith('#'));
  const browser = await chromium.launch(); const res = []; const servers = []; const errors = [];
  for (const d of [d73, d74, d75]) { const s = await serve(path.resolve(d)); servers.push(s); const page = await browser.newPage(); page.on('pageerror', e => errors.push(String(e))); await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    res.push(await page.evaluate(qs => { const input = document.querySelector('#site-search'); return qs.map(q => { input.value = q; input.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href')).slice(0, 3); }); }, qs)); }
  const f = h => h.length ? h.join(' > ').replace(/\.html/g, '') : '–';
  const top2 = h => h.slice(0, 2).filter(x => SAFETY.includes(x));
  // schlechter als die Bezugsfassung r4-73: Sicherheitsabschnitt der ersten zwei fehlt unter den ersten zwei, oder Treffer ganz weg
  const worse = (a, b) => top2(a).some(x => !b.slice(0, 2).includes(x)) || (a.length > 0 && b.length === 0);
  let w74 = 0, w75 = 0, same7375 = 0; const lines = [];
  qs.forEach((q, i) => { const a = res[0][i], b = res[1][i], c = res[2][i]; const x = worse(a, b), y = worse(a, c); if (x) w74++; if (y) w75++; if (f(a) === f(c)) same7375++;
    if (flag === '--alle' || x || y) lines.push(`${x ? 'r4-74 SCHLECHTER' : 'r4-74 ok        '} | ${y ? 'r4-75 SCHLECHTER' : 'r4-75 ok        '} | ${q} | r4-73 ${f(a)} | r4-74 ${f(b)} | r4-75 ${f(c)}`); });
  console.log(lines.join('\n'));
  console.log(`\n${qs.length} Anfragen · schlechter als r4-73: in r4-74 ${w74}, in r4-75 ${w75} · erste drei Treffer in r4-75 wie r4-73: ${same7375} · JS-Fehler ${errors.length}`);
  await browser.close(); servers.forEach(s => s.close());
})();
