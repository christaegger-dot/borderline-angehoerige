// Suchraster: prüft, ob eine Änderung an der Suche Sicherheitsanfragen gegenüber einem Bezugsstand verschlechtert.
// Die Suche läuft mit dem echten interaktion.js beider Stände im Browser (Playwright mit Chromium).
//
// Aufruf: node authoring/tools/suchraster.mjs <bezug-site> <pruef-site> [Optionen]
//   --ausgabe=<ordner>     Ergebnisordner (Vorgabe dist/suchraster)
//   --ausnahmen=<datei>    Ausnahmenliste (Vorgabe: authoring/tests/suchraster-ausnahmen.tsv neben diesem Werkzeug);
//                          «keine» prüft ohne Ausnahmen. In der CI liest das Werkzeug der Basis die Liste des Pull Requests.
//   --nur=<menge>,…        nur diese Anfragemengen (für schnelle Läufe am Arbeitsplatz; die CI prüft immer alle)
//   --ohne-tippen          ohne die Menge «tippen»
//   --immer                auch prüfen, wenn die Suche in beiden Ständen gleich ist
//   --ungenutzt-scheitert  eine Ausnahme ohne Anwendung lässt den Lauf scheitern (nur bei vollem Lauf)
//   --nur-bericht          Rückgabe 0 trotz Verschlechterung (Bericht gegen einen festen Stand, nicht blockierend)
//   --titel=<text>         Überschrift in der Step-Summary
//   --umgebungen=<liste>   nur diese weiteren Umgebungen (telefon, dunkel, kontrast) oder «keine»; die CI prüft alle
//   bezug-site: der Stand, gegen den verglichen wird (in der CI: site/ der Basis des Pull Requests)
//   pruef-site: der neue Stand (in der CI: site/ des Pull Requests)
// Sind suche.html, js/interaktion.js, _headers, _redirects und alle Dateien unter css/ in beiden Ständen bis auf die Versionskennung
// byte-gleich, liefert die Suche dieselben Treffer in derselben Darstellung; das Werkzeug meldet das und endet ohne
// Browserlauf mit 0.
//
// Anfragemengen (Rasterdefinition und Proben aus authoring/tests/ neben diesem Werkzeug; in der CI laufen Werkzeug und
// Proben einmal aus der Basis und einmal aus dem Pull Request, N847-2):
//   saetze        Handelnde × Aussage zu Suizid, Selbstverletzung oder Gewalt × Nachsatz
//   ich           Ich-Aussagen aus Kern × Füllung × Rahmen
//   ichRahmen     klare Ich-Aussage um eine Aussage über Dritte: Rahmen × Handelnde × Aussage
//   proben        alle Einzelproben, dazu die festgeschriebenen Anfragen aus suche-ersttreffer.tsv und suche-ausbau-offen.tsv
//   kombinationen Proben ausgewählter Gruppen mal Zusätze und Vorsätze, in Gross- und Kleinschreibung
//   tippen        jede Zwischenstufe beim Tippen der Proben ausgewählter Gruppen
// Jede neue Suchregel bringt ihre Proben ins Raster mit (N847-3); sonst schützt das Raster sie beim nächsten PR nicht.
//
// Treffer und Links der Leermeldung zählen nur, wenn sie sichtbar sind (checkVisibility mit Deckkraft und Sichtbarkeit,
// Fläche grösser null; N847-4). Nicht erfasst: Farbe gleich dem Hintergrund, Überdeckung durch ein anderes Element.
// Als Verschlechterung zählt (Stopp-Regel R34-P01, auf alle Sicherheitsabschnitte erweitert):
//   VERLOREN    ein Sicherheitsabschnitt steht im Bezug unter den ersten zwei Treffern, im Prüfstand nicht
//   RANG1       der Suizidabschnitt steht im Bezug zuoberst, im Prüfstand nicht (N847-5)
//   RANG3       der Bezug hat einen Sicherheitsabschnitt nur auf Rang 3, der Prüfstand keinen in den ersten drei (N847-5, N840-5)
//   ANHEFTUNG   ein Sicherheitsabschnitt, den der Bezug anheftet und oben zeigt, ist im Prüfstand nicht angeheftet oben
//               (angeheftet laut queryGroups und sichtbar unter den ersten «Anzahl Anheftungen + 1» Treffern; N847-6)
//   LEER        der Bezug hat einen Treffer, der Prüfstand keinen
//   LEERMELDUNG ein Link, den die Leermeldung des Bezugs sichtbar zeigt (Sicherheitsabschnitt oder Schnellorientierung),
//               fehlt in der Leermeldung des Prüfstands oder ist unsichtbar (N847-4)
// Im Bericht heisst ein Verlust VERDRAENGT, wenn an seiner Stelle ein anderer Sicherheitsabschnitt oder die
// Schnellorientierung von «Krisen begleiten» neu unter den ersten zwei steht. Auch das zählt als Verschlechterung.
//
// Gewollte Änderungen stehen mit Begründung und Entscheid in authoring/tests/suchraster-ausnahmen.tsv (N847-2):
//   Muster     genaue Anfrage oder /regulärer Ausdruck/ auf die klein geschriebene Anfrage; ein Muster, das eine
//              beliebige Anfrage trifft (leer, «x», ein neutraler Satz), wird abgelehnt
//   Verlust    verlorener Abschnitt (z. B. krise.html#suizid), RANG1:<Abschnitt>, RANG3, LEER, ANHEFTUNG:<Abschnitt>
//              oder LEERMELDUNG:<Link>
//   Ersatz     Abschnitt, der im Prüfstand unter den ersten zwei stehen muss, damit die Ausnahme gilt, oder «–»
//   Bezug      Versionskennung des Bezugs, für den die Ausnahme gilt (z. B. r4-77); bei einem anderen Bezug ist sie
//              veraltet und lässt den Lauf scheitern, bis sie entfernt ist
// Eine Anfrage gilt nur als erlaubt, wenn jeder ihrer Verluste durch eine Ausnahme gedeckt ist. Eine Ausnahme darf
// höchstens MAX_JE_AUSNAHME Anfragen decken. Jede erlaubte Anfrage steht einzeln im Bericht und in der Step-Summary.
//
// Die Anheftung liest das Werkzeug über eine Messzeile, die queryGroups der Website nach aussen reicht; sonst läuft
// das Skript unverändert. Fehlt die Stelle für die Messzeile, bricht das Werkzeug ab, statt ohne sie weiterzuprüfen.
// Abdeckung (Hinweis G846-2): Anteil der Sätze je Thema, bei denen der passende Sicherheitsabschnitt unter den ersten
// zwei steht, für Bezug und Prüfstand (nur Bericht).
// Bildpunkte (N855-11): Für Sicherheitsabschnitte und Schnellorientierung unter den ersten drei der Einzelproben und für die
// Leermeldung vergleicht das Werkzeug zusätzlich Bildausschnitte mit und ohne den Link (UNSICHTBAR, LEERMELDUNG).
// Umgebungen (N855-12): Hauptlauf 1280 × 720, hell; Einzelproben, Bildpunkte und Leermeldung zusätzlich auf einem Telefon
// (iPhone 13, Hochformat), im dunklen Modus und mit erzwungenen Farben (Mengen proben@telefon, proben@dunkel, proben@kontrast).
// Rückgabe: 0 ohne Verschlechterung, 1 bei Verschlechterung, Fehler in einer Ausnahme, JS-Fehler oder fehlender Messzeile.
// Playwright: Modulpfad über PLAYWRIGHT_MODULE, sonst /opt/npm-tools/node_modules/playwright. CHROMIUM_PATH erlaubt einen Systembrowser.
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const MAX_JE_AUSNAHME = 100;
const here = dirname(fileURLToPath(import.meta.url));
const tests = join(here, '..', 'tests');
const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const option = name => (args.find(a => a.startsWith(`--${name}=`)) || '').split('=').slice(1).join('=');
if (positional.length !== 2) {
  console.error('Aufruf: node authoring/tools/suchraster.mjs <bezug-site> <pruef-site> [--ausgabe=<ordner>] [--ausnahmen=<datei>|keine] [--ohne-tippen] [--nur=<menge>,…] [--immer] [--ungenutzt-scheitert] [--nur-bericht] [--titel=<text>]');
  process.exit(2);
}
const [baseDir, testDir] = positional.map(p => resolve(p));
const outDir = resolve(option('ausgabe') || join('dist', 'suchraster'));
const withTyping = !args.includes('--ohne-tippen');
const reportOnly = args.includes('--nur-bericht');
const buildOf = d => (readFileSync(join(d, 'index.html'), 'utf8').match(/data-puk-site-build="([^"]+)"/) || [])[1] || '?';
const title = option('titel') || 'Suchraster';
const head = `${title} · Bezug ${buildOf(baseDir)} · Prüfstand ${buildOf(testDir)}`;
const esc = s => String(s).replace(/[|`<>]/g, c => ({ '|': '\\|', '`': "'", '<': '&lt;', '>': '&gt;' })[c]);
const stepSummary = lines => { if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n'); };

// ---------- Ausnahmen (vor der Abkürzung: eine fehlerhafte oder veraltete Ausnahme fällt auch ohne Browserlauf auf) ----------
const exceptions = [];
const exceptionErrors = [];
const exceptionFile = option('ausnahmen') === 'keine' ? null : resolve(option('ausnahmen') || join(tests, 'suchraster-ausnahmen.tsv'));
const NEUTRAL = ['', 'x', 'heute ist ein schöner tag', 'öffnungszeiten der bibliothek'];
if (exceptionFile && existsSync(exceptionFile)) {
  for (const line of readFileSync(exceptionFile, 'utf8').split('\n')) {
    if (!line || line.startsWith('#') || line.startsWith('Muster\t')) continue;
    const [pattern, loss, replacement, bezug, reason, decision] = line.split('\t');
    if (!pattern || !loss || !replacement || !bezug || !reason || !decision) { exceptionErrors.push(`Ausnahme unvollständig (sechs Spalten nötig: Muster, Verlust, Ersatz, Bezug, Begründung, Entscheid): ${line}`); continue; }
    let re = null;
    if (/^\/.+\/$/.test(pattern)) {
      try { re = new RegExp(pattern.slice(1, -1)); } catch (e) { exceptionErrors.push(`Ausnahme mit ungültigem Muster ${pattern}: ${e.message}`); continue; }
      if (NEUTRAL.some(q => re.test(q))) { exceptionErrors.push(`Ausnahme zu breit: Muster ${pattern} trifft auch eine beliebige Anfrage`); continue; }
    }
    if (bezug !== buildOf(baseDir)) { exceptionErrors.push(`Ausnahme veraltet: ${pattern} · ${loss} gilt für den Bezug ${bezug}, der Bezug ist ${buildOf(baseDir)}. Entfernen.`); continue; }
    exceptions.push({ pattern, test: q => re ? re.test(q.toLocaleLowerCase('de-CH')) : q === pattern, loss, replacement, used: 0, queries: [] });
  }
}

if (!args.includes('--immer')) {
  const files = new Set(['suche.html', 'js/interaktion.js', '_headers', '_redirects']);
  for (const d of [baseDir, testDir]) if (existsSync(join(d, 'css'))) readdirSync(join(d, 'css')).forEach(f => files.add(`css/${f}`));
  const same = [...files].every(f => {
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
    const fail = exceptionErrors.length || exceptions.length;
    const msg = [`${head}`, `Suche unverändert: ${[...files].join(', ')} sind bis auf die Versionskennung byte-gleich. Kein Browserlauf nötig.`,
      ...exceptionErrors, ...(exceptions.length ? [`Ausnahmen ohne Anwendung (die Suche ist unverändert): ${exceptions.length}. Entfernen.`] : [])];
    console.log(msg.join('\n'));
    stepSummary([`### ${esc(head)}`, ...msg.slice(1).map(esc), '']);
    process.exit(fail && !reportOnly ? 1 : 0);
  }
}
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PLAYWRIGHT_MODULE || '/opt/npm-tools/node_modules/playwright');

const cfg = JSON.parse(readFileSync(join(tests, 'suchraster.json'), 'utf8'));
const SAFETY = cfg.sicherheitsabschnitte;
const SUIZID = 'krise.html#suizid';
const QUICK = 'krise.html#krise-schnell';
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
// Thema je Satz für die Abdeckung: eine Aussage gehört zum letzten Thema, dessen erste Aussage vor ihr steht
const themeOfSentence = new Map();
const themes = cfg.themen || [];
const themeAt = i => themes.filter(t => cfg.saetze.aussagen.indexOf(t.ab) <= i).pop();
for (const t of themes) if (cfg.saetze.aussagen.indexOf(t.ab) === -1) throw new Error(`Thema ${t.thema}: Aussage «${t.ab}» fehlt in saetze.aussagen`);
const sets = {
  saetze: cfg.saetze.handelnde.flatMap(a => cfg.saetze.aussagen.flatMap((p, i) => cfg.saetze.nachsaetze.map(x => {
    const q = [a, p, x].filter(Boolean).join(' ');
    if (themes.length && !themeOfSentence.has(q)) themeOfSentence.set(q, themeAt(i));
    return q;
  }))),
  ich: cfg.ichAussagen.kerne.flatMap(k => cfg.ichAussagen.fuellungen.flatMap(f => cfg.ichAussagen.rahmen.map(r => r.replace('{k}', k + f)))),
  ichRahmen: cfg.ichRahmen.rahmen.flatMap(r => cfg.saetze.handelnde.filter(h => h && h !== 'ich').flatMap(h => cfg.saetze.aussagen.map(a => r.replace('{s}', `${h} ${a}`)))),
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
const fullRun = !only && withTyping;

// Verluste einer Anfrage: Abschnitte, RANG1:…, RANG3, LEER, ANHEFTUNG:…, LEERMELDUNG:…
function covered(q, losses, after) {
  const hits = losses.map(loss => exceptions.find(e => e.test(q) && e.loss === loss && (e.replacement === '–' || after.top.slice(0, 2).includes(e.replacement))));
  if (hits.some(h => !h)) return null;
  hits.forEach(h => { h.used++; h.queries.push(q); });
  return hits;
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
// Sicht einer Person (N847-4, N855-1, N855-9), in der Seite als window.__suchrasterSicht definiert:
//   sichtbar: checkVisibility (Deckkraft, Sichtbarkeit, content-visibility), mindestens 4 × 4 Pixel, Deckkraft mit allen
//             Vorfahren mindestens 0,5, kein clip, clip-path, filter oder mask bei sich oder einem Vorfahren, nicht durch
//             das overflow eines Vorfahren unter 4 × 4 Pixel abgeschnitten, im Dokument (nicht links oder oben ausserhalb),
//             Textfarbe gegen den nächsten deckenden Hintergrund mit Kontrast mindestens 1,5 : 1;
//   Treffpunkt: für die ersten drei Treffer und die Links der Leermeldung nach scrollIntoView die Mitte des Links, dort
//             muss der Link selbst liegen (nicht überdeckt). Während der Messung gilt pointer-events:auto für alle
//             Elemente und Pseudo-Elemente, damit auch eine Überdeckung mit pointer-events:none den Treffpunkt erhält;
//   Reihenfolge: nach der Lage auf der Seite (oben, dann links), nicht nach dem DOM.
// Nicht erfasst: ein Pseudo-Element des Links selbst über seinem Text, Hintergrundbilder hinter dem Text.
function defineSicht() {
  window.__suchrasterSicht = function (el, hitTest) {
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false;
    let r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    let opacity = 1, background = null, backgroundImage = false;
    const rgba = c => { const m = String(c).match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      opacity *= parseFloat(cs.opacity);
      if ((cs.clip && cs.clip !== 'auto') || cs.clipPath !== 'none') return false;
      if (cs.filter !== 'none' || (cs.maskImage && cs.maskImage !== 'none') || (cs.webkitMaskImage && cs.webkitMaskImage !== 'none') || (cs.mixBlendMode && cs.mixBlendMode !== 'normal')) return false;
      if (!background && !backgroundImage) {
        if (cs.backgroundImage !== 'none') backgroundImage = true;
        else { const b = rgba(cs.backgroundColor); if (b && b[3] > 0.9) background = b; }
      }
      if (n !== el && (cs.overflowX !== 'visible' || cs.overflowY !== 'visible')) {
        const b = n.getBoundingClientRect();
        const w = Math.min(r.right, b.right) - Math.max(r.left, b.left), h = Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top);
        if (w < 4 || h < 4) return false;
      }
    }
    if (opacity < 0.5) return false;
    const cs = getComputedStyle(el);
    const fg = rgba(cs.webkitTextFillColor || cs.color) || rgba(cs.color);
    if (fg && fg[3] < 0.5) return false;
    if (fg && background) {
      const lum = c => { const [r, g, b] = c.slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const a = lum(fg), b = lum(background);
      if ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) < 1.5) return false;
    }
    if (r.right + scrollX <= 0 || r.bottom + scrollY <= 0 || r.left + scrollX >= document.documentElement.scrollWidth) return false;
    if (!hitTest) return true;
    el.scrollIntoView({ block: 'center', inline: 'nearest' });
    const box = el.getClientRects()[0] || el.getBoundingClientRect();
    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    return !!hit && el.contains(hit);
  };
}
// Sichtbare Treffer (höchstens sechs) in der Reihenfolge auf dem Bildschirm und die angehefteten Abschnitte, die unter
// ihnen oben stehen; dazu, ob die Sicht von der DOM-Reihenfolge abweicht (Kontrolle: im unveränderten Stand nie).
function inPage(queries) {
  const input = document.querySelector('#site-search');
  const sicht = window.__suchrasterSicht;
  const out = queries.map(q => {
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const items = [...document.querySelectorAll('[data-search-results] > li:not([hidden])')].map(li => ({ a: li.querySelector('a'), r: li.getBoundingClientRect() })).filter(x => x.a);
    const dom = items.slice(0, 3).map(x => x.a.getAttribute('href'));
    items.sort((x, y) => (Math.round(x.r.top) - Math.round(y.r.top)) || (x.r.left - y.r.left));
    const hrefs = [];
    for (const x of items) {
      if (sicht(x.a, hrefs.length < 3)) { hrefs.push(x.a.getAttribute('href')); if (hrefs.length >= 6) break; }
    }
    window.scrollTo(0, 0);
    const groups = window.__suchrasterGruppen(q);
    const pins = groups && groups.pins ? groups.pins.slice() : [];
    return { n: hrefs.length, top: hrefs.slice(0, 3), pins: pins.filter(p => hrefs.slice(0, pins.length + 1).includes(p)), anders: dom.join() !== hrefs.slice(0, 3).join() };
  });
  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return out;
}
// Leermeldung: sichtbare Links bei einer Anfrage ohne Treffer
function emptyState(q) {
  const input = document.querySelector('#site-search');
  const sicht = window.__suchrasterSicht;
  input.value = q;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const hits = [...document.querySelectorAll('[data-search-results] > li:not([hidden]) a')].filter(a => sicht(a, false)).length;
  const box = document.querySelector('[data-search-empty]');
  const links = box && !box.hidden ? [...box.querySelectorAll('a')].filter(a => sicht(a, true)).map(a => a.getAttribute('href')) : [];
  window.scrollTo(0, 0);
  input.value = '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  return { hits, links };
}

const servers = [await serve(baseDir), await serve(testDir)];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const errors = [];
// Ein Seitenpaar (Bezug, Prüfstand) in einer Umgebung. Eigener Kontext je Stand: sonst teilen sich beide Seiten (gleiche
// Site 127.0.0.1) einen Renderer und laufen nacheinander.
async function openPair(options) {
  const pair = [];
  for (const s of servers) {
    const page = await (await browser.newContext(options)).newPage();
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
    await page.evaluate(defineSicht);
    // über CSSOM, weil die Content-Security-Policy der Produktion eingefügte <style> verbietet
    await page.evaluate(() => { const sheet = new CSSStyleSheet(); sheet.replaceSync('*,*::before,*::after{pointer-events:auto!important}'); document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]; });
    const ready = await page.evaluate(() => typeof window.__suchrasterGruppen === 'function');
    if (!ready) hookMissing.add(s === servers[0] ? baseDir : testDir);
    pair.push(page);
  }
  return pair;
}
const pages = await openPair({ viewport: { width: 1280, height: 720 } });
if (hookMissing.size) {
  console.log(`${head}\nABBRUCH: Messzeile für die Anheftung nicht gefunden in ${[...hookMissing].join(', ')}. Werkzeug an das Suchskript anpassen.`);
  await browser.close(); servers.forEach(s => s.close()); process.exit(1);
}

// ---------- Vergleich ----------
const short = r => r.n ? r.top.map(h => h.replace('.html', '')).join(' > ') : '–';
const top2Safety = r => r.top.slice(0, 2).filter(h => SAFETY.includes(h));
const report = [];
const failures = [];
const allowed = [];
const summary = [];
const coverage = themes.map(t => ({ thema: t.thema, passend: t.passend, n: 0, a: 0, b: 0 }));
const startedAt = Date.now();
let keptProben = null;
const allQueries = new Set();
const lossQueries = new Set();
function judge(name, q, a, b, counts) {
  const kinds = [], losses = [];
  const lost = top2Safety(a).filter(h => !b.top.slice(0, 2).includes(h));
  if (lost.length) {
    const displaced = b.top.slice(0, 2).some(h => (SAFETY.includes(h) || h === QUICK) && !a.top.slice(0, 2).includes(h));
    kinds.push(displaced ? 'VERDRAENGT' : 'VERLOREN');
    losses.push(...lost);
  }
  if (a.top[0] === SUIZID && b.top[0] !== SUIZID) { kinds.push('RANG1'); losses.push(`RANG1:${SUIZID}`); }
  if (!top2Safety(a).length && SAFETY.includes(a.top[2]) && !b.top.some(h => SAFETY.includes(h))) { kinds.push('RANG3'); losses.push('RANG3'); }
  const unpinned = a.pins.filter(p => SAFETY.includes(p) && !b.pins.includes(p));
  if (unpinned.length) { kinds.push('ANHEFTUNG'); losses.push(...unpinned.map(p => `ANHEFTUNG:${p}`)); }
  if (a.n && !b.n) { kinds.push('LEER'); losses.push('LEER'); }
  if (!kinds.length) return [];
  lossQueries.add(q);
  const line = `${kinds.join('+')} | ${name} | ${q} | Bezug ${short(a)}${a.pins.length ? ' [angeheftet]' : ''} | Prüfstand ${short(b)}${b.pins.length ? ' [angeheftet]' : ''}`;
  const hits = covered(q, losses, b);
  if (hits) { counts.AUSNAHME++; allowed.push({ name, q, kinds, before: short(a), after: short(b), muster: hits.map(h => h.pattern) }); return []; }
  kinds.forEach(k => counts[k]++);
  failures.push({ name, q, kinds, losses, before: short(a), after: short(b) });
  return [line];
}
for (const [name, queries] of Object.entries(sets)) {
  const before = [], after = [];
  for (let i = 0; i < queries.length; i += 2000) {
    const chunk = queries.slice(i, i + 2000);
    const [a, b] = await Promise.all(pages.map(p => p.evaluate(inPage, chunk)));
    before.push(...a); after.push(...b);
  }
  const counts = { VERLOREN: 0, VERDRAENGT: 0, RANG1: 0, RANG3: 0, ANHEFTUNG: 0, LEER: 0, AUSNAHME: 0, NEU_OBEN: 0, GEAENDERT: 0, ANDERS_A: 0, ANDERS_B: 0 };
  const lines = [];
  queries.forEach((q, i) => {
    const a = before[i], b = after[i];
    if (short(a) !== short(b) || a.pins.join() !== b.pins.join()) counts.GEAENDERT++;
    if (a.anders) counts.ANDERS_A++;
    if (b.anders) counts.ANDERS_B++;
    allQueries.add(q);
    if (top2Safety(b).some(h => !a.top.slice(0, 2).includes(h))) counts.NEU_OBEN++;
    if (name === 'saetze' && themeOfSentence.has(q)) {
      const c = coverage.find(x => x.thema === themeOfSentence.get(q).thema);
      c.n++;
      if (a.top.slice(0, 2).some(h => c.passend.includes(h))) c.a++;
      if (b.top.slice(0, 2).some(h => c.passend.includes(h))) c.b++;
    }
    lines.push(...judge(name, q, a, b, counts));
  });
  const s = `${name}: ${queries.length} Anfragen · geändert ${counts.GEAENDERT} · verloren ${counts.VERLOREN} · verdrängt ${counts.VERDRAENGT} · Suizid nicht mehr zuoberst ${counts.RANG1} · letzter Sicherheitsabschnitt auf Rang 3 verloren ${counts.RANG3} · Anheftung verloren ${counts.ANHEFTUNG} · leer ${counts.LEER} · als Ausnahme erlaubt ${counts.AUSNAHME} · Sicherheitsabschnitt neu oben ${counts.NEU_OBEN} · Bildschirm anders als DOM: Bezug ${counts.ANDERS_A}, Prüfstand ${counts.ANDERS_B}`;
  summary.push(s);
  report.push(`## ${s}`, ...lines);
  if (name === 'proben') keptProben = { queries, before, after };
}
// ---------- Bildpunkte (N855-11) ----------
// Die Prüfung über CSS-Eigenschaften bleibt eine Aufzählung. Für die Sicherheitsabschnitte und die Schnellorientierung
// prüft das Werkzeug deshalb zusätzlich die Bildpunkte: Für jeden Abschnitt und jeden Rang unter den ersten drei, den die
// Einzelproben im Prüfstand zeigen, und für die Links der Leermeldung nimmt es einen Ausschnitt um den Link auf, einmal
// normal und einmal mit dem Link und allen seinen Nachfahren auf visibility:hidden (als Inline-Stil mit !important, den
// keine Regel des Stylesheets überstimmt). Unterscheiden sich weniger als MIN_BILDPUNKTE Bildpunkte deutlich (mehr als 48
// in einem Farbkanal), sieht eine Person den Link nicht. Weil eine Änderung am Stylesheet für alle Anfragen gleich wirkt,
// genügt je Abschnitt und Rang eine Anfrage.
const MIN_BILDPUNKTE = 20;
const cmpPage = await (await browser.newContext()).newPage();
await cmpPage.setContent('<!doctype html><title>Vergleich</title>');
const diffPixels = (a, b) => cmpPage.evaluate(async ({ a, b }) => {
  const load = async s => { const bin = atob(s); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return createImageBitmap(new Blob([u], { type: 'image/png' })); };
  const [ia, ib] = await Promise.all([load(a), load(b)]);
  const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
  if (!w || !h) return 0;
  const c = new OffscreenCanvas(w, h), x = c.getContext('2d');
  x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, w, h).data;
  x.clearRect(0, 0, w, h); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, w, h).data;
  let n = 0;
  for (let i = 0; i < da.length; i += 4) if (Math.max(Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2])) > 48) n++;
  return n;
}, { a: a.toString('base64'), b: b.toString('base64') });
async function pixelVisible(page, q, href, inEmpty) {
  const box = await page.evaluate(({ q, href, inEmpty }) => {
    const input = document.querySelector('#site-search');
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const scope = inEmpty ? '[data-search-empty] a' : '[data-search-results] > li:not([hidden]) a';
    const a = [...document.querySelectorAll(scope)].find(x => x.getAttribute('href') === href);
    if (!a) return null;
    a.scrollIntoView({ block: 'center', inline: 'nearest' });
    window.__suchrasterBildpunkte = a;
    const r = a.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height, vw: innerWidth, vh: innerHeight };
  }, { q, href, inEmpty });
  if (!box) return { visible: false, pixels: 0 };
  const x = Math.max(0, Math.floor(box.x) - 2), y = Math.max(0, Math.floor(box.y) - 2);
  const clip = { x, y, width: Math.min(box.vw, Math.ceil(box.x + box.width) + 2) - x, height: Math.min(box.vh, Math.ceil(box.y + box.height) + 2) - y };
  if (clip.width < 1 || clip.height < 1) return { visible: false, pixels: 0 };
  const shot = () => page.screenshot({ clip, animations: 'disabled', caret: 'hide' });
  const normal = await shot();
  await page.evaluate(() => { for (const el of [window.__suchrasterBildpunkte, ...window.__suchrasterBildpunkte.querySelectorAll('*')]) el.style.setProperty('visibility', 'hidden', 'important'); });
  const hidden = await shot();
  await page.evaluate(() => { for (const el of [window.__suchrasterBildpunkte, ...window.__suchrasterBildpunkte.querySelectorAll('*')]) el.style.removeProperty('visibility'); window.scrollTo(0, 0); });
  const pixels = await diffPixels(normal, hidden);
  return { visible: pixels >= MIN_BILDPUNKTE, pixels };
}
const pixelLines = [];
// Bildpunkte je Sicherheitsabschnitt und Rang, für ein Seitenpaar und die Ergebnisse der Einzelproben in dieser Umgebung
async function pixelPhase(pp, kept, label) {
  const name = `bildpunkte${label}`;
  const counts = { UNSICHTBAR: 0, AUSNAHME: 0, geprueft: 0, bezugUnsichtbar: 0, kleinster: Infinity };
  const combos = idx => {
    const m = new Map();
    kept[idx].forEach((r, i) => r.top.forEach((h, k) => { if ((SAFETY.includes(h) || h === QUICK) && !m.has(`${h}@${k + 1}`)) m.set(`${h}@${k + 1}`, kept.queries[i]); }));
    return m;
  };
  const after = combos('after'), before = combos('before');
  for (const [key, q] of after) {
    const href = key.split('@')[0];
    const b = await pixelVisible(pp[1], q, href, false);
    counts.geprueft++;
    if (b.visible) { counts.kleinster = Math.min(counts.kleinster, b.pixels); continue; }
    const qa = before.get(key) || q;
    const a = await pixelVisible(pp[0], qa, href, false);
    if (!a.visible && before.has(key)) { counts.bezugUnsichtbar++; pixelLines.push(`${name}: im Bezug ebenfalls unsichtbar: ${key}`); continue; }
    const losses = [`UNSICHTBAR:${key}${label}`], kinds = ['UNSICHTBAR'];
    const hits = covered(q, losses, { top: [] });
    if (hits) { counts.AUSNAHME++; allowed.push({ name, q, kinds, before: `${key} sichtbar (${a.pixels} Bildpunkte)`, after: `${key} unsichtbar (${b.pixels})`, muster: hits.map(h => h.pattern) }); continue; }
    counts.UNSICHTBAR++;
    failures.push({ name, q, kinds, losses, before: `${key} sichtbar (${a.pixels} Bildpunkte)`, after: `${key} unsichtbar (${b.pixels} Bildpunkte)` });
    report.push(`UNSICHTBAR | ${name} | ${q} | ${key}: im Prüfstand ${b.pixels} Bildpunkte verschieden, im Bezug ${a.pixels}`);
  }
  summary.push(`${name}: ${counts.geprueft} Sicherheitsabschnitte und Ränge im Prüfstand geprüft · kleinster Unterschied der sichtbaren ${counts.kleinster === Infinity ? '–' : counts.kleinster} Bildpunkte (Schwelle ${MIN_BILDPUNKTE}) · unsichtbar ${counts.UNSICHTBAR} · als Ausnahme erlaubt ${counts.AUSNAHME}${counts.bezugUnsichtbar ? ` · im Bezug ebenfalls unsichtbar ${counts.bezugUnsichtbar}` : ''}`);
}
// Leermeldung für ein Seitenpaar
async function emptyPhase(pp, label) {
  const name = `leermeldung${label}`;
  const probe = 'qqxzqvwxq';
  const [a, b] = await Promise.all(pp.map(p => p.evaluate(emptyState, probe)));
  const watched = a.links.filter(h => SAFETY.includes(h) || h === QUICK);
  const missing = a.hits ? [] : watched.filter(h => !b.links.includes(h));
  // Bildpunkte (N855-11): ein Link, den die Prüfung über CSS als sichtbar wertet, muss auch in den Bildpunkten sichtbar sein
  let pixelInfo = '';
  if (!a.hits) for (const h of watched.filter(x => b.links.includes(x))) {
    const pb = await pixelVisible(pp[1], probe, h, true);
    if (pb.visible) continue;
    const pa = await pixelVisible(pp[0], probe, h, true);
    if (pa.visible) { missing.push(h); pixelInfo += ` · ${h} in den Bildpunkten unsichtbar (${pb.pixels}, Bezug ${pa.pixels})`; }
  }
  const counts = { LEERMELDUNG: 0, AUSNAHME: 0 };
  if (missing.length) {
    const q = `(Leermeldung${label})`, losses = missing.map(h => `LEERMELDUNG:${h}`), kinds = ['LEERMELDUNG'];
    const hits = covered(q, losses, { top: [] });
    if (hits) { counts.AUSNAHME++; allowed.push({ name, q, kinds, before: a.links.join(' '), after: b.links.join(' ') || '–', muster: hits.map(h => h.pattern) }); }
    else { counts.LEERMELDUNG++; failures.push({ name, q, kinds, losses, before: a.links.join(' '), after: b.links.join(' ') || '–' }); report.push(`## Leermeldung${label}`, `LEERMELDUNG | ${missing.join(', ')} fehlt oder ist unsichtbar`); }
  }
  summary.push(`${name}: sichtbare Links im Bezug ${a.links.length}, im Prüfstand ${b.links.length} · Sicherheitslink verloren ${counts.LEERMELDUNG} · als Ausnahme erlaubt ${counts.AUSNAHME}${pixelInfo}${a.hits ? ' · (Probe hatte im Bezug Treffer, nicht geprüft)' : ''}`);
}
if (keptProben) await pixelPhase(pages, keptProben, '');
else summary.push('bildpunkte: nicht geprüft (Menge «proben» nicht im Lauf)');
await emptyPhase(pages, '');
// ---------- Weitere Umgebungen (N855-12) ----------
// Regeln für schmale Bildschirme, Hochformat, den dunklen Modus oder erzwungene Farben wirken im Hauptlauf (1280 × 720,
// hell) nicht. Die Einzelproben, die Bildpunkte und die Leermeldung laufen deshalb zusätzlich auf einem Telefon im
// Hochformat, im dunklen Modus und mit erzwungenen Farben, mit denselben Kriterien.
const UMGEBUNGEN = [
  { label: '@telefon', was: 'iPhone 13, Hochformat', options: { ...devices['iPhone 13'] } },
  { label: '@dunkel', was: 'dunkler Modus, 1280 × 720', options: { viewport: { width: 1280, height: 720 }, colorScheme: 'dark' } },
  // erzwungene Farben im dunklen Modus: die einzige Kombination, für die die Website eigene Regeln hat (Logo)
  { label: '@kontrast', was: 'erzwungene Farben, dunkel, 1280 × 720', options: { viewport: { width: 1280, height: 720 }, forcedColors: 'active', colorScheme: 'dark' } }
];
const envOption = option('umgebungen');
const envSelected = !envOption ? UMGEBUNGEN : envOption === 'keine' ? [] : UMGEBUNGEN.filter(e => envOption.split(',').includes(e.label.slice(1)));
if (envOption && envOption !== 'keine' && envSelected.length !== envOption.split(',').length) throw new Error(`Unbekannte Umgebung in --umgebungen=${envOption} (telefon, dunkel, kontrast oder keine)`);
if (!envSelected.length) summary.push(`weitere Umgebungen: nicht geprüft (--umgebungen=${envOption})`);
if (keptProben) for (const env of envSelected) {
  const pp = await openPair(env.options);
  const queries = keptProben.queries, before = [], after = [];
  for (let i = 0; i < queries.length; i += 2000) {
    const chunk = queries.slice(i, i + 2000);
    const [a, b] = await Promise.all(pp.map(p => p.evaluate(inPage, chunk)));
    before.push(...a); after.push(...b);
  }
  const name = `proben${env.label}`;
  const counts = { VERLOREN: 0, VERDRAENGT: 0, RANG1: 0, RANG3: 0, ANHEFTUNG: 0, LEER: 0, AUSNAHME: 0 };
  const lines = [];
  queries.forEach((q, i) => lines.push(...judge(name, q, before[i], after[i], counts)));
  summary.push(`${name} (${env.was}): ${queries.length} Anfragen · verloren ${counts.VERLOREN} · verdrängt ${counts.VERDRAENGT} · Suizid nicht mehr zuoberst ${counts.RANG1} · letzter Sicherheitsabschnitt auf Rang 3 verloren ${counts.RANG3} · Anheftung verloren ${counts.ANHEFTUNG} · leer ${counts.LEER} · als Ausnahme erlaubt ${counts.AUSNAHME}`);
  report.push(`## ${name}`, ...lines);
  await pixelPhase(pp, { queries, before, after }, env.label);
  await emptyPhase(pp, env.label);
  await Promise.all(pp.map(p => p.context().close()));
}
await browser.close();
servers.forEach(s => s.close());
const tooBroad = exceptions.filter(e => e.used > MAX_JE_AUSNAHME).map(e => `Ausnahme zu breit: ${e.pattern} · ${e.loss} deckt ${e.used} Anfragen (höchstens ${MAX_JE_AUSNAHME}). Enger fassen oder aufteilen.`);
// N855-4: ein Muster darf auch unter den Anfragen ohne jeden Verlust höchstens MAX_JE_AUSNAHME treffen
for (const e of exceptions) {
  let n = 0;
  for (const q of allQueries) if (!lossQueries.has(q) && e.test(q)) n++;
  if (n > MAX_JE_AUSNAHME) tooBroad.push(`Ausnahme zu breit: ${e.pattern} · ${e.loss} trifft ${n} Anfragen ohne Verlust (höchstens ${MAX_JE_AUSNAHME}). Enger fassen.`);
}
const unused = exceptions.filter(e => !e.used).map(e => `${e.pattern} · ${e.loss} · ${e.replacement}`);
const problems = [...exceptionErrors, ...tooBroad, ...(fullRun && args.includes('--ungenutzt-scheitert') ? unused.map(u => `Ausnahme ohne Anwendung: ${u}. Entfernen.`) : [])];

// ---------- Ausgabe ----------
mkdirSync(outDir, { recursive: true });
const total = Object.values(sets).reduce((n, q) => n + q.length, 0) + 1;
const bad = failures.length || errors.length || problems.length;
const verdict = bad ? 'VERSCHLECHTERUNG' : 'KEINE VERSCHLECHTERUNG';
const pct = (x, n) => n ? `${(100 * x / n).toFixed(1).replace('.', ',')} %` : '–';
const known = cfg.festerBezug && cfg.festerBezug.bezug === buildOf(baseDir) && fullRun
  ? [`Gegenüber dem zuletzt bekannten Stand (${cfg.festerBezug.verschlechterungen} Verschlechterungen gegen ${cfg.festerBezug.bezug}, Stand ${cfg.festerBezug.stand}): ${failures.length - cfg.festerBezug.verschlechterungen >= 0 ? '+' : ''}${failures.length - cfg.festerBezug.verschlechterungen}`] : [];
const coverageLines = [...known, ...coverage.filter(c => c.n).map(c => `Abdeckung ${c.thema}: Bezug ${pct(c.a, c.n)} · Prüfstand ${pct(c.b, c.n)} (${c.n} Sätze, passender Abschnitt unter den ersten zwei)`)];
const allowedLines = allowed.map(f => `${f.kinds.join('+')} | ${f.name} | ${f.q} | ${f.before} → ${f.after} | Muster ${f.muster.join(', ')}`);
const text = [
  `# ${head}`,
  `Ergebnis: ${verdict} · ${total} Anfragen · ${failures.length} Verschlechterungen · ${allowed.length} als Ausnahme erlaubt · Fehler in Ausnahmen ${problems.length} · JS-Fehler ${errors.length} · ${Math.round((Date.now() - startedAt) / 1000)} s`,
  ...summary.map(s => `- ${s}`),
  ...coverageLines.map(s => `- ${s}`),
  ...problems.map(p => `FEHLER: ${p}`),
  unused.length ? `Ausnahmen ohne Anwendung (prüfen, ob noch nötig): ${unused.length}` : 'Alle Ausnahmen angewendet oder keine eingetragen.',
  ...unused.map(q => `  - ${q}`),
  '',
  ...report,
  '',
  `## Als Ausnahme erlaubt (${allowed.length})`,
  ...allowedLines,
  '',
  '## Vorlage für suchraster-ausnahmen.tsv (nur für gewollte Änderungen; Begründung und Entscheid ergänzen, gleichartige Fälle besser als enges Muster)',
  ...[...new Map(failures.flatMap(f => f.losses.map(l => [`${f.q}\t${l}`, f]))).entries()].map(([k]) => `${k}\t–\t${buildOf(baseDir)}\t<Begründung>\t<Entscheid>`),
  ...errors.map(e => `JS-Fehler: ${e}`)
].join('\n') + '\n';
writeFileSync(join(outDir, 'ERGEBNIS.txt'), text);
writeFileSync(join(outDir, 'ERGEBNIS.json'), JSON.stringify({ bezug: buildOf(baseDir), pruefstand: buildOf(testDir), anfragen: total, verschlechterungen: failures, erlaubt: allowed, fehlerInAusnahmen: problems, jsFehler: errors, ausnahmenOhneAnwendung: unused, abdeckung: coverage }, null, 1) + '\n');
console.log([`${head}`, `Ergebnis: ${verdict} · ${total} Anfragen · ${failures.length} Verschlechterungen · ${allowed.length} als Ausnahme erlaubt · Fehler in Ausnahmen ${problems.length} · JS-Fehler ${errors.length}`, ...summary, ...coverageLines, ...problems.map(p => `FEHLER: ${p}`),
  ...failures.slice(0, 40).map(f => `${f.kinds.join('+')} | ${f.name} | ${f.q} | ${f.before} → ${f.after}`), failures.length > 40 ? `… ${failures.length - 40} weitere in ${join(outDir, 'ERGEBNIS.txt')}` : '',
  allowed.length ? `Als Ausnahme erlaubt: ${allowed.length}, einzeln in ${join(outDir, 'ERGEBNIS.txt')}` : ''].filter(Boolean).join('\n'));
stepSummary([`### ${esc(head)}`, `**${verdict}** · ${total} Anfragen · ${failures.length} Verschlechterungen · ${allowed.length} als Ausnahme erlaubt · Fehler in Ausnahmen ${problems.length} · JS-Fehler ${errors.length}${reportOnly ? ' · nur Bericht, blockiert nicht' : ''}`, '',
  ...summary.map(s => `- ${esc(s)}`), ...coverageLines.map(s => `- ${esc(s)}`), ...problems.map(p => `- **FEHLER:** ${esc(p)}`), '',
  ...(failures.length ? ['| Art | Menge | Anfrage | Bezug | Prüfstand |', '|---|---|---|---|---|', ...failures.slice(0, 60).map(f => `| ${f.kinds.join('+')} | ${f.name} | ${esc(f.q)} | ${esc(f.before)} | ${esc(f.after)} |`), failures.length > 60 ? `\n… ${failures.length - 60} weitere im Artefakt ERGEBNIS.txt` : '', ''] : []),
  ...(allowed.length ? [`**Als Ausnahme erlaubt (${allowed.length}), jede Anfrage einzeln:**`, '', '| Art | Menge | Anfrage | Bezug | Prüfstand | Muster |', '|---|---|---|---|---|---|', ...allowed.slice(0, 200).map(f => `| ${f.kinds.join('+')} | ${f.name} | ${esc(f.q)} | ${esc(f.before)} | ${esc(f.after)} | ${esc(f.muster.join(', '))} |`), allowed.length > 200 ? `\n… ${allowed.length - 200} weitere im Artefakt ERGEBNIS.txt` : '', ''] : [])]);
process.exitCode = bad && !reportOnly ? 1 : 0;
