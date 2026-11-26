// Gegenprüfung r4-76: vergleicht die VOLLSTÄNDIGE Trefferliste (nicht nur die ersten drei) mehrerer Stände im Browser.
// Aufruf: node vergleich.cjs <Anfragedatei|-raster|-bauraster=pfad/raster.cjs> <ausgabe.txt> <name=site-ordner> <name=site-ordner> [...]
// Der erste Stand ist der Bezug. Eigenes Skript der Gegenprüfung, unabhängig von raster.cjs / drei-staende.cjs der bauenden Sitzung.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/borderline-browser/node_modules/playwright');
const [file, outFile, ...specs] = process.argv.slice(2);
const SAFE = ['krise.html#suizid', 'krise.html#selbstverletzung', 'gefahr.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
function serve(dir) { dir = path.resolve(dir); const s = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f)); }); return new Promise(ok => s.listen(0, '127.0.0.1', () => ok(s))); }
function raster() { // eigenes Raster, andere Bausteine als raster.cjs
  const wer = ['', 'mein mann', 'meine frau', 'unser sohn', 'unsere tochter', 'mein schwager', 'meine enkelin', 'die mutter meiner kinder', 'mein lebensgefährte', 'sie', 'er'];
  const was = ['schlägt zu', 'schlägt unseren sohn', 'schlägt die tochter', 'schlägt seine mutter', 'ist gewalttätig', 'wird handgreiflich', 'bedroht die familie', 'droht den kindern', 'hat zugeschlagen', 'würgt sie', 'wirft mit sachen',
    'schneidet sich', 'schneidet sich in den arm', 'ritzt sich', 'ritzt sich die arme', 'verletzt sich selbst', 'verletzt sich absichtlich', 'fügt sich schnitte zu',
    'will sterben', 'will nicht mehr leben', 'droht mit suizid', 'spricht vom tod', 'hat tabletten gesammelt', 'bringt sich um', 'will sich umbringen', 'hat suizidgedanken'];
  const nach = ['', 'seit wochen', 'seit monaten', 'wegen mir', 'jeden abend', 'nach jedem streit', 'und ich habe angst', 'was tun', 'wie reagieren', 'wenn ich gehe', 'heimlich', 'schon wieder', 'und lacht dann', 'vor den enkeln', 'sagt die lehrerin', 'ist das normal', 'wen anrufen'];
  return [...new Set(wer.flatMap(a => was.flatMap(b => nach.map(c => [a, b, c].filter(Boolean).join(' ')))))];
}
(async () => {
  const qs = file === '-raster' ? raster() : file.startsWith('-bauraster=') ? (() => { const src = fs.readFileSync(file.slice(11), 'utf8'); const g = n => eval(src.match(new RegExp('const ' + n + ' = (\\[[\\s\\S]*?\\]);'))[1]); const A = g('ACTORS'), P = g('PREDICATES'), X = g('SUFFIXES'); return [...new Set(A.flatMap(a => P.flatMap(p => X.map(x => [a, p, x].filter(Boolean).join(' ')))))]; })() : fs.readFileSync(file, 'utf8').split('\n').map(l => l.split('\t')[0]).filter(l => l && !l.startsWith('#'));
  const browser = await chromium.launch(), res = [], names = [], errors = [], servers = [];
  for (const spec of specs) { const [name, dir] = spec.split('='); names.push(name); const s = await serve(dir); servers.push(s); const page = await browser.newPage(); page.on('pageerror', e => errors.push(name + ': ' + e));
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    const all = []; for (let i = 0; i < qs.length; i += 2000) all.push(...await page.evaluate(qs => { const input = document.querySelector('#site-search'); return qs.map(q => { input.value = q; input.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href')); }); }, qs.slice(i, i + 2000)));
    res.push(all); }
  const f = h => h.length ? h.slice(0, 3).join(' > ').replace(/\.html/g, '') + (h.length > 3 ? ` (+${h.length - 3})` : '') : '–';
  const lines = [], stat = names.map(() => ({ gleich: 0, erster: 0, verloren: 0, leer: 0, gewonnen: 0, neu: 0 }));
  qs.forEach((q, i) => { const a = res[0][i]; let show = false; const cols = [`${names[0]} ${f(a)}`];
    for (let s = 1; s < names.length; s++) { const b = res[s][i]; const same = JSON.stringify(a) === JSON.stringify(b);
      const leer = a.length > 0 && b.length === 0, verloren = !leer && a.slice(0, 2).some(x => SAFE.includes(x) && !b.slice(0, 2).includes(x));
      const neu = a.length === 0 && b.length > 0, gewonnen = b.slice(0, 2).some(x => SAFE.includes(x) && !a.slice(0, 2).includes(x));
      if (gewonnen) stat[s].gewonnen++; if (neu) stat[s].neu++;
      if (same) stat[s].gleich++; if ((a[0] || '') === (b[0] || '')) stat[s].erster++; if (verloren) stat[s].verloren++; if (leer) stat[s].leer++;
      cols.push(`${names[s]} ${same ? '=' : f(b)}${leer ? ' [LEER]' : verloren ? ' [VERLOREN]' : ''}${gewonnen ? ' [GEWONNEN]' : ''}`); if (!same) show = true; }
    if (show || qs.length <= 150) lines.push(`${q} | ${cols.join(' | ')}`); });
  const head = [`# ${qs.length} Anfragen · Bezug ${names[0]} · JS-Fehler ${errors.length}`];
  for (let s = 1; s < names.length; s++) head.push(`# ${names[s]} gegen ${names[0]}: vollständige Trefferliste gleich ${stat[s].gleich} von ${qs.length} · Ersttreffer gleich ${stat[s].erster} · Sicherheitsabschnitt aus den ersten zwei verloren ${stat[s].verloren} · vorher Treffer, nachher leer ${stat[s].leer} · Gegenrichtung: Sicherheitsabschnitt neu unter den ersten zwei ${stat[s].gewonnen} · vorher leer, nachher Treffer ${stat[s].neu}`);
  fs.writeFileSync(outFile, [...head, ...(qs.length > 150 ? ['# gezeigt: nur Anfragen mit Unterschied in mindestens einem Stand'] : []), ...lines, ...errors].join('\n') + '\n'); console.log(head.join('\n'));
  await browser.close(); servers.forEach(s => s.close());
})();
