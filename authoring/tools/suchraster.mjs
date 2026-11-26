// Suchraster: prüft, ob eine Änderung an der Suche Sicherheitsanfragen gegenüber einem Bezugsstand verschlechtert.
// Die Suche läuft mit dem echten interaktion.js beider Stände im Browser (Playwright mit Chromium).
//
// Aufruf: node authoring/tools/suchraster.mjs <bezug-site> <pruef-site> [--ausgabe=<ordner>] [--ohne-tippen] [--nur=<menge>,…] [--immer]
//   --nur: nur diese Anfragemengen (für schnelle Läufe am Arbeitsplatz; die CI prüft immer alle)
//   --immer: auch prüfen, wenn die Suche in beiden Ständen gleich ist
// Sind suche.html, js/interaktion.js und _headers in beiden Ständen bis auf die Versionskennung byte-gleich, liefert
// die Suche dieselben Treffer; das Werkzeug meldet das und endet ohne Browserlauf mit 0.
//   bezug-site: der Stand, gegen den verglichen wird (in der CI: site/ der Basis des Pull Requests)
//   pruef-site: der neue Stand (in der CI: site/ des Pull Requests)
//
// Anfragemengen (authoring/tests/suchraster.json, authoring/tests/suchraster-proben.txt):
//   saetze        Handelnde × Aussage zu Suizid, Selbstverletzung oder Gewalt × Nachsatz
//   ich           Ich-Aussagen aus Kern × Füllung × Rahmen
//   proben        alle Einzelproben, dazu die festgeschriebenen Anfragen aus suche-ersttreffer.tsv und suche-ausbau-offen.tsv
//   kombinationen Proben ausgewählter Gruppen mal Zusätze und Vorsätze, in Gross- und Kleinschreibung
//   tippen        jede Zwischenstufe beim Tippen der Proben ausgewählter Gruppen
//
// Als Verschlechterung zählt (Stopp-Regel R34-P01, auf alle Sicherheitsabschnitte erweitert):
//   VERLOREN    ein Sicherheitsabschnitt steht im Bezug unter den ersten zwei Treffern, im Prüfstand nicht
//   ANHEFTUNG   der Bezug heftet einen Sicherheitsabschnitt an, der Prüfstand nicht
//   LEER        der Bezug hat einen Treffer, der Prüfstand keinen
// Im Bericht heisst ein Verlust VERDRAENGT, wenn an seiner Stelle ein anderer Sicherheitsabschnitt oder die
// Schnellorientierung von «Krisen begleiten» neu unter den ersten zwei steht. Auch das zählt als Verschlechterung,
// weil es den Suizidabschnitt bei einer Tötungsanfrage verdrängen kann; gewollte Fälle gehören in die Ausnahmen.
//
// Gewollte Änderungen stehen mit Begründung und Entscheid in authoring/tests/suchraster-ausnahmen.tsv:
//   Muster     genaue Anfrage oder /regulärer Ausdruck/ auf die klein geschriebene Anfrage
//   Verlust    verlorener Abschnitt (z. B. krise.html#suizid), LEER oder ANHEFTUNG:<Abschnitt>
//   Ersatz     Abschnitt, der im Prüfstand unter den ersten zwei stehen muss, damit die Ausnahme gilt, oder «–»
// Eine Anfrage gilt nur als erlaubt, wenn jeder ihrer Verluste durch eine Ausnahme gedeckt ist.
//
// Die Anheftung liest das Werkzeug über eine Messzeile, die queryGroups der Website nach aussen reicht; sonst läuft
// das Skript unverändert. Fehlt die Stelle für die Messzeile, bricht das Werkzeug ab, statt ohne sie weiterzuprüfen.
// Rückgabe: 0 ohne Verschlechterung, 1 bei Verschlechterung, JS-Fehler oder fehlender Messzeile.
// Playwright: Modulpfad über PLAYWRIGHT_MODULE, sonst /opt/npm-tools/node_modules/playwright. CHROMIUM_PATH erlaubt einen Systembrowser.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const tests = join(here, '..', 'tests');
const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const option = name => (args.find(a => a.startsWith(`--${name}=`)) || '').split('=').slice(1).join('=');
if (positional.length !== 2) {
  console.error('Aufruf: node authoring/tools/suchraster.mjs <bezug-site> <pruef-site> [--ausgabe=<ordner>] [--ohne-tippen] [--nur=<menge>,…] [--immer]');
  process.exit(2);
}
const [baseDir, testDir] = positional.map(p => resolve(p));
const outDir = resolve(option('ausgabe') || join('dist', 'suchraster'));
const withTyping = !args.includes('--ohne-tippen');
const buildOf = d => (readFileSync(join(d, 'index.html'), 'utf8').match(/data-puk-site-build="([^"]+)"/) || [])[1] || '?';
if (!args.includes('--immer')) {
  const same = ['suche.html', 'js/interaktion.js', '_headers'].every(f => {
    // nur die Kennung als Wert ersetzen (data-puk-site-build="…", ?v=…), nicht Erwähnungen in Kommentaren
    const read = d => {
      if (!existsSync(join(d, f))) return null;
      const id = buildOf(d).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return readFileSync(join(d, f), 'utf8').replace(new RegExp(`(data-puk-site-build="|[?&]v=)${id}(?=["&#\\s]|$)`, 'g'), '$1<KENNUNG>');
    };
    const a = read(baseDir), b = read(testDir);
    return a !== null && a === b;
  });
  if (same) {
    const msg = `Suchraster · Bezug ${buildOf(baseDir)} · Prüfstand ${buildOf(testDir)}\nSuche unverändert: suche.html, js/interaktion.js und _headers sind bis auf die Versionskennung byte-gleich. Kein Browserlauf nötig.`;
    console.log(msg);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Suchraster\n${msg.split('\n')[1]}\n`);
    process.exit(0);
  }
}
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');

const cfg = JSON.parse(readFileSync(join(tests, 'suchraster.json'), 'utf8'));
const SAFETY = cfg.sicherheitsabschnitte;
const HOOK = "input.addEventListener('input', renderSearch);";

// ---------- Anfragen ----------
const probeGroups = new Map();
{
  let key = null;
  for (const line of readFileSync(join(tests, 'suchraster-proben.txt'), 'utf8').split('\n')) {
    const m = line.match(/^# (\S+) /);
    if (m) { key = m[1]; probeGroups.set(key, []); continue; }
    if (line.trim() && !line.startsWith('#') && key) probeGroups.get(key).push(line.trim());
  }
}
const tsvQueries = file => existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(l => l && !l.startsWith('#')).slice(1).map(l => l.split('\t')[0]) : [];
const groupsOf = keys => keys.flatMap(k => {
  if (!probeGroups.has(k)) throw new Error(`Gruppe ${k} fehlt in suchraster-proben.txt`);
  return probeGroups.get(k);
});
const sets = {
  saetze: cfg.saetze.handelnde.flatMap(a => cfg.saetze.aussagen.flatMap(p => cfg.saetze.nachsaetze.map(x => [a, p, x].filter(Boolean).join(' ')))),
  ich: cfg.ichAussagen.kerne.flatMap(k => cfg.ichAussagen.fuellungen.flatMap(f => cfg.ichAussagen.rahmen.map(r => r.replace('{k}', k + f)))),
  proben: [...[...probeGroups.values()].flat(), ...tsvQueries(join(tests, 'suche-ersttreffer.tsv')), ...tsvQueries(join(tests, 'suche-ausbau-offen.tsv'))],
  kombinationen: groupsOf(cfg.kombinationen.gruppen).flatMap(s => [
    ...cfg.kombinationen.zusaetze.map(z => s + z),
    ...cfg.kombinationen.vorsaetze.map(v => v + s),
    s.toUpperCase(),
    s.toLowerCase().replace(/[.,!?:;«»()]/g, '')
  ])
};
if (withTyping) sets.tippen = groupsOf(cfg.tippen.gruppen).flatMap(s => Array.from({ length: Math.max(0, s.length - cfg.tippen.abZeichen + 1) }, (_, i) => s.slice(0, cfg.tippen.abZeichen + i)));
for (const k of Object.keys(sets)) sets[k] = [...new Set(sets[k])];
const only = option('nur') ? option('nur').split(',') : null;
if (only) for (const k of Object.keys(sets)) if (!only.includes(k)) delete sets[k];

// ---------- Ausnahmen ----------
const exceptions = [];
const exceptionFile = join(tests, 'suchraster-ausnahmen.tsv');
if (existsSync(exceptionFile)) {
  for (const line of readFileSync(exceptionFile, 'utf8').split('\n')) {
    if (!line || line.startsWith('#') || line.startsWith('Muster\t')) continue;
    const [pattern, loss, replacement, reason, decision] = line.split('\t');
    if (!pattern || !loss || !replacement || !reason || !decision) throw new Error(`Ausnahme unvollständig (fünf Spalten nötig): ${line}`);
    const re = /^\/.+\/$/.test(pattern) ? new RegExp(pattern.slice(1, -1)) : null;
    exceptions.push({ pattern, test: q => re ? re.test(q.toLocaleLowerCase('de-CH')) : q === pattern, loss, replacement, used: 0 });
  }
}
// Verluste einer Anfrage: Abschnitte, LEER, ANHEFTUNG:<Abschnitt>
function covered(q, losses, after) {
  const hits = losses.map(loss => exceptions.find(e => e.test(q) && e.loss === loss && (e.replacement === '–' || after.top.slice(0, 2).includes(e.replacement))));
  if (hits.some(h => !h)) return false;
  hits.forEach(h => h.used++);
  return true;
}

// ---------- Server und Browser ----------
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
function serve(dir) {
  const headersFile = join(dir, '_headers');
  const headers = existsSync(headersFile) ? Object.fromEntries(readFileSync(headersFile, 'utf8').split('\n').filter(l => /^\s+[^#\s][^:]+:/.test(l)).map(l => { const at = l.indexOf(':'); return [l.slice(0, at).trim(), l.slice(at + 1).trim()]; })) : {};
  const server = createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = join(dir, p);
    if (!f.startsWith(dir) || !existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
    let body = readFileSync(f);
    if (p === '/js/interaktion.js') {
      const src = body.toString('utf8');
      if (!src.includes(HOOK)) { res.writeHead(500); res.end('Messzeile nicht gefunden'); hookMissing.add(dir); return; }
      body = Buffer.from(src.replace(HOOK, 'window.__suchrasterGruppen = queryGroups; ' + HOOK));
    }
    res.writeHead(200, { ...headers, 'Content-Type': types[extname(f)] || 'application/octet-stream' });
    res.end(body);
  });
  return new Promise(r => server.listen(0, '127.0.0.1', () => r(server)));
}
const hookMissing = new Set();
function inPage(queries) {
  const input = document.querySelector('#site-search');
  const out = queries.map(q => {
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const hrefs = [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].map(a => a.getAttribute('href'));
    const groups = window.__suchrasterGruppen(q);
    return { n: hrefs.length, top: hrefs.slice(0, 3), pins: groups && groups.pins ? groups.pins.slice() : [] };
  });
  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return out;
}

const servers = [await serve(baseDir), await serve(testDir)];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const errors = [];
const pages = [];
for (const s of servers) {
  const page = await browser.newPage();
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
  const ready = await page.evaluate(() => typeof window.__suchrasterGruppen === 'function');
  if (!ready) hookMissing.add(s === servers[0] ? baseDir : testDir);
  pages.push(page);
}
const build = buildOf;
const head = `Suchraster · Bezug ${build(baseDir)} · Prüfstand ${build(testDir)}`;
if (hookMissing.size) {
  console.log(`${head}\nABBRUCH: Messzeile für die Anheftung nicht gefunden in ${[...hookMissing].join(', ')}. Werkzeug an das Suchskript anpassen.`);
  await browser.close(); servers.forEach(s => s.close()); process.exit(1);
}

// ---------- Vergleich ----------
const short = r => r.n ? r.top.map(h => h.replace('.html', '')).join(' > ') : '–';
const top2Safety = r => r.top.slice(0, 2).filter(h => SAFETY.includes(h));
const report = [];
const failures = [];
const summary = [];
const startedAt = Date.now();
for (const [name, queries] of Object.entries(sets)) {
  const before = [], after = [];
  for (let i = 0; i < queries.length; i += 2000) {
    const chunk = queries.slice(i, i + 2000);
    const [a, b] = await Promise.all(pages.map(p => p.evaluate(inPage, chunk)));
    before.push(...a); after.push(...b);
  }
  const counts = { VERLOREN: 0, VERDRAENGT: 0, ANHEFTUNG: 0, LEER: 0, AUSNAHME: 0, NEU_OBEN: 0, GEAENDERT: 0 };
  const lines = [];
  queries.forEach((q, i) => {
    const a = before[i], b = after[i];
    if (short(a) !== short(b) || a.pins.join() !== b.pins.join()) counts.GEAENDERT++;
    const kinds = [], losses = [];
    const lost = top2Safety(a).filter(h => !b.top.slice(0, 2).includes(h));
    if (lost.length) {
      const displaced = b.top.slice(0, 2).some(h => (SAFETY.includes(h) || h === 'krise.html#krise-schnell') && !a.top.slice(0, 2).includes(h));
      kinds.push(displaced ? 'VERDRAENGT' : 'VERLOREN');
      losses.push(...lost);
    }
    const unpinned = a.pins.filter(p => SAFETY.includes(p) && !b.pins.includes(p));
    if (unpinned.length) { kinds.push('ANHEFTUNG'); losses.push(...unpinned.map(p => `ANHEFTUNG:${p}`)); }
    if (a.n && !b.n) { kinds.push('LEER'); losses.push('LEER'); }
    if (top2Safety(b).some(h => !a.top.slice(0, 2).includes(h))) counts.NEU_OBEN++;
    if (!kinds.length) return;
    if (covered(q, losses, b)) { counts.AUSNAHME++; return; }
    kinds.forEach(k => counts[k]++);
    const line = `${kinds.join('+')} | ${name} | ${q} | Bezug ${short(a)}${a.pins.length ? ' [angeheftet]' : ''} | Prüfstand ${short(b)}${b.pins.length ? ' [angeheftet]' : ''}`;
    lines.push(line);
    failures.push({ name, q, kinds, losses, before: short(a), after: short(b) });
  });
  const s = `${name}: ${queries.length} Anfragen · geändert ${counts.GEAENDERT} · verloren ${counts.VERLOREN} · verdrängt ${counts.VERDRAENGT} · Anheftung verloren ${counts.ANHEFTUNG} · leer ${counts.LEER} · als Ausnahme erlaubt ${counts.AUSNAHME} · Sicherheitsabschnitt neu oben ${counts.NEU_OBEN}`;
  summary.push(s);
  report.push(`## ${s}`, ...lines);
}
const unused = exceptions.filter(e => !e.used).map(e => `${e.pattern} · ${e.loss} · ${e.replacement}`);
await browser.close();
servers.forEach(s => s.close());

// ---------- Ausgabe ----------
mkdirSync(outDir, { recursive: true });
const total = Object.values(sets).reduce((n, q) => n + q.length, 0);
const verdict = failures.length || errors.length ? 'VERSCHLECHTERUNG' : 'KEINE VERSCHLECHTERUNG';
const text = [
  `# ${head}`,
  `Ergebnis: ${verdict} · ${total} Anfragen · ${failures.length} Verschlechterungen · JS-Fehler ${errors.length} · ${Math.round((Date.now() - startedAt) / 1000)} s`,
  ...summary.map(s => `- ${s}`),
  unused.length ? `Ausnahmen ohne Anwendung (prüfen, ob noch nötig): ${unused.length}` : 'Alle Ausnahmen angewendet oder keine eingetragen.',
  ...unused.map(q => `  - ${q}`),
  '',
  ...report,
  '',
  '## Vorlage für suchraster-ausnahmen.tsv (nur für gewollte Änderungen; Begründung und Entscheid ergänzen, gleichartige Fälle besser als Muster)',
  ...[...new Map(failures.flatMap(f => f.losses.map(l => [`${f.q}\t${l}`, f]))).entries()].map(([k]) => `${k}\t–\t<Begründung>\t<Entscheid>`),
  ...errors.map(e => `JS-Fehler: ${e}`)
].join('\n') + '\n';
writeFileSync(join(outDir, 'ERGEBNIS.txt'), text);
writeFileSync(join(outDir, 'ERGEBNIS.json'), JSON.stringify({ bezug: build(baseDir), pruefstand: build(testDir), anfragen: total, verschlechterungen: failures, jsFehler: errors, ausnahmenOhneAnwendung: unused }, null, 1) + '\n');
console.log([`${head}`, `Ergebnis: ${verdict} · ${total} Anfragen · ${failures.length} Verschlechterungen · JS-Fehler ${errors.length}`, ...summary, ...failures.slice(0, 40).map(f => `${f.kinds.join('+')} | ${f.name} | ${f.q} | ${f.before} → ${f.after}`), failures.length > 40 ? `… ${failures.length - 40} weitere in ${join(outDir, 'ERGEBNIS.txt')}` : ''].filter(Boolean).join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) {
  const esc = s => String(s).replace(/[|`<>]/g, c => ({ '|': '\\|', '`': "'", '<': '&lt;', '>': '&gt;' })[c]);
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, [`### ${esc(head)}`, `**${verdict}** · ${total} Anfragen · ${failures.length} Verschlechterungen · JS-Fehler ${errors.length}`, '', ...summary.map(s => `- ${esc(s)}`), '',
    ...(failures.length ? ['| Art | Menge | Anfrage | Bezug | Prüfstand |', '|---|---|---|---|---|', ...failures.slice(0, 60).map(f => `| ${f.kinds.join('+')} | ${f.name} | ${esc(f.q)} | ${esc(f.before)} | ${esc(f.after)} |`)] : []), ''].join('\n'));
}
process.exitCode = failures.length || errors.length ? 1 : 0;
