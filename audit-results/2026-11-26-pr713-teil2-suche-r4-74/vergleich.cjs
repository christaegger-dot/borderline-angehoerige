// Vorher-Nachher-Vergleich der Suche für r4-74 (Suchregeln aus PR #713).
// Die Suche läuft mit dem echten interaktion.js der jeweiligen Website im Browser (Playwright mit Chromium).
//
// Aufruf: node vergleich.cjs <vorher-site> <nachher-site> <ausgabeordner> [woerter.json]
//   woerter.json: Wortliste (JSON-Array) für die Prüfung der Tippfehlerregel, z. B. npm «all-the-german-words» 1.1.0.
//
// Vier Anfragemengen:
//   1 festgeschrieben  alle Anfragen aus authoring/tests/suche-ersttreffer.tsv
//   2 zusatzproben     zusatzproben.txt in diesem Ordner
//   3 wortschatz       jedes Wort, das im Suchindex vorher oder nachher vorkommt (Einzelwortanfrage)
//   4 wortliste        Wörter der Wortliste, die von einem Schlüsselwort der Tippfehlerregel um ein Zeichen abweichen
// Ausgabe je Menge: Datei mit allen Ergebnissen (1, 2) oder nur den Änderungen (3, 4), dazu zusammenfassung.txt.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');

const [beforeDir, afterDir, outDir, wordListPath] = process.argv.slice(2).map(p => path.resolve(p));
if (!beforeDir || !afterDir || !outDir) { console.error('Aufruf: node vergleich.cjs <vorher-site> <nachher-site> <ausgabeordner> [woerter.json]'); process.exit(2); }
const here = __dirname;
const repo = path.resolve(here, '..', '..');
const SAFETY = ['krise.html#suizid', 'gefahr.html#gewalt', 'kinder.html#eskalation', 'kommunizieren.html#suizid-angesprochen'];
const TOP = 5;

function normalized(value) {
  return String(value || '').normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}
function serve(dir) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    res.end(fs.readFileSync(f));
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}
// Läuft in der Seite: setzt das Suchfeld und liest die sichtbaren Treffer, wie sie die Nutzerin sieht.
function runInPage(args) {
  const input = document.querySelector('#site-search');
  const out = [];
  for (const q of args.queries) {
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const hrefs = [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href'));
    out.push({ n: hrefs.length, top: hrefs.slice(0, args.top) });
  }
  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return out;
}
function readIndex() {
  return [...document.querySelectorAll('[data-search-results] > li')].map(li => ({
    target: li.getAttribute('data-search-target'), level: li.getAttribute('data-search-level'),
    title: li.getAttribute('data-search-title'), text: li.getAttribute('data-search-text'), keywords: li.getAttribute('data-search-keywords')
  }));
}
const fmt = r => r.n ? `${r.top.join(' > ')}${r.n > r.top.length ? ` … (${r.n})` : ''}` : '–';
const same = (a, b, depth) => a.top.slice(0, depth).join('|') === b.top.slice(0, depth).join('|') && (a.n === 0) === (b.n === 0);
const safetyTop2 = r => r.top.slice(0, 2).filter(h => SAFETY.includes(h));

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const servers = [await serve(beforeDir), await serve(afterDir)];
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const pages = [];
  const errors = [];
  for (const s of servers) {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    pages.push(page);
  }
  async function run(queries) {
    const res = [[], []];
    for (let i = 0; i < queries.length; i += 2000) {
      const chunk = queries.slice(i, i + 2000);
      for (let s = 0; s < 2; s++) res[s].push(...await pages[s].evaluate(runInPage, { queries: chunk, top: TOP }));
    }
    return queries.map((q, i) => ({ q, before: res[0][i], after: res[1][i] }));
  }
  const summary = [];
  const say = line => { summary.push(line); console.log(line); };
  const build = d => (fs.readFileSync(path.join(d, 'index.html'), 'utf8').match(/site\.css\?v=([^"]+)/) || [])[1];
  say(`Vorher: Stand ${build(beforeDir)} · Nachher: Stand ${build(afterDir)} · Treffer je Anfrage: die ersten ${TOP}`);

  // Suchindex vorher und nachher
  const idx = [await pages[0].evaluate(readIndex), await pages[1].evaluate(readIndex)];
  const byTarget = i => new Map(idx[i].map(e => [e.target, e]));
  const [bi, ai] = [byTarget(0), byTarget(1)];
  const idxLines = [];
  for (const [t, e] of bi) if (!ai.has(t)) idxLines.push(`ENTFERNT | ${t} | ${e.title}`);
  for (const [t, e] of ai) {
    const b = bi.get(t);
    if (!b) { idxLines.push(`NEU | ${t} | ${e.title}`); continue; }
    for (const k of ['title', 'text', 'keywords']) if (b[k] !== e[k]) {
      const bw = new Set(normalized(b[k]).split(' ')), aw = new Set(normalized(e[k]).split(' '));
      const gone = [...bw].filter(w => !aw.has(w)), come = [...aw].filter(w => !bw.has(w));
      idxLines.push(`GEÄNDERT | ${t} | ${k}: ${b[k].length} → ${e[k].length} Zeichen | Wörter weg: ${gone.length}${gone.length ? ` (${gone.slice(0, 40).join(' ')}${gone.length > 40 ? ' …' : ''})` : ''} | Wörter neu: ${come.length}${come.length ? ` (${come.slice(0, 40).join(' ')})` : ''}`);
    }
  }
  fs.writeFileSync(path.join(outDir, 'suchindex-aenderungen.txt'), idxLines.join('\n') + '\n');
  say(`Suchindex: ${idx[0].length} Einträge vorher, ${idx[1].length} nachher · ${idxLines.length} Unterschiede (suchindex-aenderungen.txt)`);

  // 1 festgeschriebene Anfragen
  const tsv = fs.readFileSync(path.join(repo, 'authoring', 'tests', 'suche-ersttreffer.tsv'), 'utf8').split('\n').filter(l => l && !l.startsWith('#')).slice(1).map(l => l.split('\t'));
  const fixed = await run(tsv.map(r => r[0]));
  const flagged = [];
  const stop = { killOut: [], pinLost: [], noHit: [], newSafety: [] };
  const KILL = /(umbring|umzubring|umgebracht|umbracht|toete|getoetet|toeten|\bbring\w* .*\bum\b|\bbracht\w* .*\bum\b)/;
  function check(set, r) {
    const nq = normalized(r.q);
    const sb = safetyTop2(r.before), sa = safetyTop2(r.after);
    if (KILL.test(nq) && r.before.top.slice(0, 2).includes('krise.html#suizid') && !r.after.top.slice(0, 2).includes('krise.html#suizid') && r.after.top[0] !== 'kinder.html#eskalation') stop.killOut.push(`${set} | ${r.q} | ${fmt(r.before)} → ${fmt(r.after)}`);
    if (sb.some(h => !r.after.top.slice(0, 3).includes(h))) stop.pinLost.push(`${set} | ${r.q} | ${fmt(r.before)} → ${fmt(r.after)}`);
    if (r.before.n && !r.after.n) stop.noHit.push(`${set} | ${r.q} | ${fmt(r.before)} → –`);
    if (sa.some(h => !r.before.top.slice(0, 2).includes(h))) stop.newSafety.push(`${set} | ${r.q} | ${fmt(r.before)} → ${fmt(r.after)}`);
  }
  const fixedLines = fixed.map((r, i) => {
    const changed = !same(r.before, r.after, 3);
    if (changed) flagged.push(r.q);
    check('festgeschrieben', r);
    return `${changed ? 'GEÄNDERT' : 'GLEICH  '} | ${r.q} | erwartet ${tsv[i][1]} | vorher ${fmt(r.before)} | nachher ${fmt(r.after)}`;
  });
  fs.writeFileSync(path.join(outDir, 'festgeschrieben.txt'), fixedLines.join('\n') + '\n');
  say(`1 festgeschrieben: ${fixed.length} Anfragen · erste drei Treffer geändert bei ${flagged.length} (festgeschrieben.txt)`);

  // 2 Zusatzproben
  const probeLines = fs.readFileSync(path.join(here, 'zusatzproben.txt'), 'utf8').split('\n').filter(Boolean);
  const probes = await run(probeLines.filter(l => !l.startsWith('#')));
  let pi = 0, probeChanged = 0;
  const probeOut = probeLines.map(l => {
    if (l.startsWith('#')) return l;
    const r = probes[pi++];
    const changed = !same(r.before, r.after, 3);
    if (changed) probeChanged++;
    check('zusatzproben', r);
    return `${changed ? 'GEÄNDERT' : 'GLEICH  '} | ${r.q} | vorher ${fmt(r.before)} | nachher ${fmt(r.after)}`;
  });
  fs.writeFileSync(path.join(outDir, 'zusatzproben-ergebnis.txt'), probeOut.join('\n') + '\n');
  say(`2 zusatzproben: ${probes.length} Anfragen · erste drei Treffer geändert bei ${probeChanged} (zusatzproben-ergebnis.txt)`);

  // 3 Wortschatz des Suchindex (Einzelwörter in Originalschreibweise, klein)
  const vocab = new Set();
  for (const list of idx) for (const e of list) for (const w of `${e.title} ${e.text} ${e.keywords}`.toLocaleLowerCase('de-CH').split(/[^\p{L}\p{N}]+/u)) if (w) vocab.add(w);
  const vocabRes = await run([...vocab].sort());
  const vocabChanged = vocabRes.filter(r => !same(r.before, r.after, 3));
  vocabRes.forEach(r => check('wortschatz', r));
  fs.writeFileSync(path.join(outDir, 'wortschatz-aenderungen.txt'), vocabChanged.map(r => `${r.q} | vorher ${fmt(r.before)} | nachher ${fmt(r.after)}`).join('\n') + '\n');
  say(`3 wortschatz: ${vocabRes.length} Einzelwörter des Suchindex · erste drei Treffer geändert bei ${vocabChanged.length} (wortschatz-aenderungen.txt)`);

  // 4 Wortliste gegen die Tippfehlerregel
  if (wordListPath) {
    const src = fs.readFileSync(path.join(repo, 'authoring', 'js', 'interaktion.js'), 'utf8');
    const oneEdit = new Function(`${src.match(/function oneEdit\(a, b\) \{[\s\S]*?\n    \}/)[0]}; return oneEdit;`)();
    const suicideSet = src.match(/\n      (\['umbringen',[\s\S]*?\]),\n/)[1].replace(/\/\*[\s\S]*?\*\//g, '');
    const values = new Function(`return ${suicideSet};`)().map(normalized);
    const extra = src.match(/var typoTargets = Object\.keys\(suicideWords\)\.concat\((\[[^\]]*\])\)/)[1];
    const targets = [...new Set(values.filter(v => !v.includes(' ') && !['sterben', 'umbringen', 'umzubringen'].includes(v)).concat(new Function(`return ${extra};`)()))];
    const words = JSON.parse(fs.readFileSync(wordListPath, 'utf8'));
    const candidates = new Map();
    for (const raw of words) {
      const w = normalized(raw);
      if (w.length < 5 || w.includes(' ') || targets.includes(w)) continue;
      const hits = targets.filter(t => t[0] === w[0] && oneEdit(w, t));
      if (hits.length) candidates.set(w, hits);
    }
    const cand = [...candidates.keys()].sort();
    const candRes = await run(cand);
    const candLines = candRes.map(r => {
      const hits = candidates.get(r.q);
      const changed = !same(r.before, r.after, 3);
      check('wortliste', r);
      return `${changed ? 'GEÄNDERT' : 'GLEICH  '} | ${r.q} | Schlüsselwort ${hits.join(', ')} | vorher ${fmt(r.before)} | nachher ${fmt(r.after)}`;
    });
    fs.writeFileSync(path.join(outDir, 'wortliste-tippfehlerregel.txt'), candLines.join('\n') + '\n');
    say(`4 wortliste: ${words.length} Wörter · ${targets.length} Schlüsselwörter · ${cand.length} Wörter weichen von einem Schlüsselwort um ein Zeichen ab (gleicher Anfangsbuchstabe, ab 5 Zeichen) · Treffer geändert bei ${candLines.filter(l => l.startsWith('GEÄNDERT')).length} (wortliste-tippfehlerregel.txt)`);
  }

  // Stopp-Regel R34-P01 und Gegenproben über alle Mengen
  const stopOut = [
    `# Stopp-Regel R34-P01, geprüft über alle Anfragemengen (Vorher ${build(beforeDir)}, Nachher ${build(afterDir)})`,
    `## a) Anfrage mit Tötungswort: Suizid fällt aus den ersten zwei Treffern (ausser Kinder zuerst): ${stop.killOut.length}`, ...stop.killOut,
    `## b) Sicherheitsabschnitt stand vorher unter den ersten zwei und fehlt nachher unter den ersten drei: ${stop.pinLost.length}`, ...stop.pinLost,
    `## c) Vorher Treffer, nachher keiner: ${stop.noHit.length}`, ...stop.noHit,
    `## d) Gegenprobe, blockiert nicht: Sicherheitsabschnitt neu unter den ersten zwei: ${stop.newSafety.length}`, ...stop.newSafety
  ];
  fs.writeFileSync(path.join(outDir, 'stoppregel.txt'), stopOut.join('\n') + '\n');
  say(`Stopp-Regel R34-P01: a) Tötungswort ohne Suizid in den ersten zwei: ${stop.killOut.length} · b) Sicherheitsabschnitt verloren: ${stop.pinLost.length} · c) vorher Treffer, nachher keiner: ${stop.noHit.length} · d) Sicherheitsabschnitt neu oben (Gegenprobe): ${stop.newSafety.length} (stoppregel.txt)`);
  say(`JS-Fehler: ${errors.length}`);
  fs.writeFileSync(path.join(outDir, 'zusammenfassung.txt'), summary.join('\n') + '\n');
  await browser.close();
  servers.forEach(s => s.close());
  process.exitCode = errors.length ? 1 : 0;
})();
