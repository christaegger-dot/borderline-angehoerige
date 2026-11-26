// Systematisches Raster für die Suche: Bezugsstand gegen einen Prüfstand.
// Aufruf: node raster.cjs <bezug-site> <pruef-site> <ausgabeordner> [name]
//   Raster 1 «saetze»:    Handelnde × Aussage zu Suizid, Selbstverletzung oder Gewalt × Nachsatz
//   Raster 2 «wortpaare»: jedes Wort des Suchindex (beider Stände) × Schlüsselwort
// Gemeldet wird, wo ein Sicherheitsabschnitt aus den ersten zwei Treffern des Bezugsstands im Prüfstand dort fehlt
// («verloren») oder eine Anfrage mit Treffer keinen mehr hat («leer»).
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');
const [dirA, dirB, outDir, name = 'raster'] = process.argv.slice(2);
const SAFETY = ['krise.html#suizid', 'krise.html#selbstverletzung', 'gefahr.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen'];
const ACTORS = ['', 'er', 'sie', 'ich', 'mein mann', 'meine frau', 'mein partner', 'meine partnerin', 'mein sohn', 'meine tochter', 'mein kind', 'meine mutter', 'mein vater', 'mein bruder', 'meine schwester', 'mein freund', 'meine freundin', 'mein ex'];
const PREDICATES = [
  // Suizid
  'will sterben', 'will nicht mehr leben', 'will sich umbringen', 'bringt sich um', 'droht sich umzubringen', 'hat suizidgedanken', 'ist suizidal', 'ist suizidgefährdet', 'ist lebensmüde',
  'hat einen suizidversuch gemacht', 'hat eine überdosis genommen', 'hat tabletten genommen', 'hat einen abschiedsbrief geschrieben', 'redet vom sterben', 'spricht von suizid', 'droht mit suizid',
  'denkt ans sterben', 'denkt an den tod', 'will nicht mehr', 'mag nicht mehr', 'tut sich etwas an', 'sagt das leben hat keinen sinn', 'will nicht mehr aufwachen', 'hat selbstmordgedanken', 'hat einen todeswunsch',
  // Selbstverletzung
  'ritzt sich', 'verletzt sich selbst', 'schneidet sich', 'hat sich geritzt', 'hat sich geschnitten', 'verletzt sich', 'selbstverletzung', 'hat sich selbst verletzt',
  // Gewalt
  'schlägt', 'schlägt zu', 'schlägt mich', 'ist gewalttätig', 'bedroht mich', 'droht mir', 'würgt mich', 'hat mich geschlagen', 'ist aggressiv', 'wird gewalttätig', 'bedroht uns', 'schlägt die kinder',
  'hat mir eine ohrfeige gegeben', 'droht mich umzubringen', 'will mich umbringen', 'beschimpft mich', 'macht mir angst', 'ich habe angst vor ihm', 'gewalt', 'häusliche gewalt', 'schreit mich an'
];
const SUFFIXES = ['', 'was tun', 'was soll ich tun', 'hilfe', 'immer wieder', 'oft', 'schon wieder', 'ständig', 'wegen mir', 'heute', 'seit wochen', 'ist das ernst', 'notfall', 'polizei', 'fu', 'therapie',
  'vor den kindern', 'und ich habe angst', 'und droht', 'was kann ich machen', 'sagt er', 'hat sie gesagt', 'wenn ich gehe', 'und will keine hilfe'];
const KEYS = ['suizid', 'suizidgedanken', 'selbstverletzung', 'gewalt', 'schlägt', 'umbringen', 'sterben', 'bedroht', 'ritzen', 'krise'];
function serve(dir) { dir = path.resolve(dir); const s = http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream' }); res.end(fs.readFileSync(f)); }); return new Promise(r => s.listen(0, '127.0.0.1', () => r(s))); }
function inPage(qs) { const input = document.querySelector('#site-search'); return qs.map(q => { input.value = q; input.dispatchEvent(new Event('input', { bubbles: true })); return [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href')).slice(0, 3); }); }
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch(); const pages = []; const servers = []; const errors = [];
  for (const d of [dirA, dirB]) { const s = await serve(d); servers.push(s); const page = await browser.newPage(); page.on('pageerror', e => errors.push(String(e))); await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' }); pages.push(page); }
  const vocab = new Set();
  for (const page of pages) for (const w of await page.evaluate(() => [...document.querySelectorAll('[data-search-results] > li')].flatMap(li => `${li.getAttribute('data-search-title')} ${li.getAttribute('data-search-text')} ${li.getAttribute('data-search-keywords')}`.toLocaleLowerCase('de-CH').split(/[^\p{L}\p{N}]+/u)))) if (w.length > 1) vocab.add(w);
  const sets = {
    saetze: ACTORS.flatMap(a => PREDICATES.flatMap(p => SUFFIXES.map(x => [a, p, x].filter(Boolean).join(' ')))),
    wortpaare: [...vocab].sort().flatMap(w => KEYS.map(k => `${w} ${k}`))
  };
  const f = h => h.length ? h.join(' > ').replace(/\.html/g, '') : '–';
  const summary = [];
  for (const [set, raw] of Object.entries(sets)) {
    if (process.env.NUR && process.env.NUR !== set) continue;
    const qs = [...new Set(raw)]; const res = [[], []];
    for (let i = 0; i < qs.length; i += 3000) for (let s = 0; s < 2; s++) res[s].push(...await pages[s].evaluate(inPage, qs.slice(i, i + 3000)));
    const lost = [], empty = [], sig = {};
    qs.forEach((q, i) => { const a = res[0][i], b = res[1][i];
      const gone = a.slice(0, 2).filter(x => SAFETY.includes(x) && !b.slice(0, 2).includes(x));
      if (a.length && !b.length) empty.push(`${q} | ${f(a)} → –`);
      else if (gone.length) { lost.push(`${q} | ${f(a)} → ${f(b)}`); const k = `${gone.join('+').replace(/\.html/g, '')} → ${(b[0] || '–').replace('.html', '')}`; sig[k] = (sig[k] || 0) + 1; }
    });
    fs.writeFileSync(path.join(outDir, `${name}-${set}.txt`), [`# ${set}: ${qs.length} Anfragen · verloren ${lost.length} · leer ${empty.length}`, '## Muster (verlorener Abschnitt → neuer Ersttreffer)', ...Object.entries(sig).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${n} | ${k}`), '## leer', ...empty, '## verloren', ...lost].join('\n') + '\n');
    summary.push(`${set}: ${qs.length} Anfragen · Sicherheitsabschnitt aus den ersten zwei verloren ${lost.length} · vorher Treffer, nachher keiner ${empty.length}`);
  }
  summary.push(`JS-Fehler: ${errors.length}`);
  fs.writeFileSync(path.join(outDir, `${name}-zusammenfassung.txt`), summary.join('\n') + '\n'); console.log(summary.join('\n'));
  await browser.close(); servers.forEach(s => s.close()); process.exitCode = errors.length ? 1 : 0;
})();
