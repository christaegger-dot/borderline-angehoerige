// Wörter der Wortliste mit einem Suizid-Wortstamm: Wohin führt die Suche?
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const [dirA, dirB, wl, out] = process.argv.slice(2);
function normalized(value) { return String(value || '').normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
const STEM = new RegExp(process.env.STEM || 'suizid|selbstmord|selbstmoerd|lebensmued|freitod|selbsttoetung|abschiedsbrief|todeswunsch|todeswuensch|ueberdos|selbstverletz|ritz');
function serve(dir) { const s = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p); if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream' }); res.end(fs.readFileSync(f)); }); return new Promise(r => s.listen(0, '127.0.0.1', () => r(s))); }
(async () => {
  const words = [...new Set(JSON.parse(fs.readFileSync(wl, 'utf8')).map(w => String(w).toLocaleLowerCase('de-CH')).filter(w => STEM.test(normalized(w)) && !normalized(w).includes(' ')))].sort();
  const browser = await chromium.launch();
  const res = [];
  const servers = [];
  for (const d of [dirA, dirB]) {
    const s = await serve(path.resolve(d)); servers.push(s);
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    res.push(await page.evaluate(qs => { const input = document.querySelector('#site-search'); return qs.map(q => { input.value = q; input.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href')).slice(0, 3); }); }, words));
  }
  const cls = (h, t) => !h.length ? 'kein Treffer' : h[0] === t ? 'zuerst' : h.slice(0, 2).includes(t) ? 'Platz 2' : 'anderer Treffer';
  const lines = words.map((w, i) => { const t = /selbstverletz|ritz/.test(normalized(w)) ? 'krise.html#selbstverletzung' : 'krise.html#suizid'; return `${w} | Ziel ${t} | vorher ${cls(res[0][i], t)} (${res[0][i].join(' > ') || '–'}) | nachher ${cls(res[1][i], t)} (${res[1][i].join(' > ') || '–'})`; });
  fs.writeFileSync(out, lines.join('\n') + '\n');
  const count = k => { const c = {}; lines.forEach(l => { const m = l.split(' | ')[k].replace(/ \(.*/, ''); c[m] = (c[m] || 0) + 1; }); return JSON.stringify(c); };
  console.log(words.length, 'Wörter', '\n', count(2), '\n', count(3));
  await browser.close(); servers.forEach(s => s.close());
})();
