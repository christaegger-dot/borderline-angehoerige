// Selbsttest des Suchrasters (Nachprüfung der Härtung, PR #856, N855-1): baut aus einem Stand von site/ Konstruktionen,
// die die Suche für eine Person verschlechtern, und prüft, dass authoring/tools/suchraster.mjs jede meldet. So kann eine
// spätere Änderung am Werkzeug die Härtung nicht unbemerkt zurücknehmen.
// Die Konstruktionen stammen aus den Nachprüfungen #849 (K1, K2, K5, K9) und #856 (V1 bis V8, W1 bis W8, X1 bis X5, Y1 bis Y4),
// dazu V10, X6, Y5 und Y6.
// Sie sind als Änderung am Stylesheet, an suche.html oder an js/interaktion.js beschrieben, nicht als Diff gegen einen
// festen Stand. Passt eine Ersetzung nicht mehr, scheitert der Selbsttest mit «nicht anwendbar»; dann die Konstruktion
// an den neuen Stand anpassen, nicht streichen.
// Aufruf: node authoring/tools/suchraster-selbsttest.mjs [site] [--ausgabe=dist/suchraster-selbsttest]
// Rückgabe: 0, wenn das Raster jede Konstruktion mit der erwarteten Art meldet und den unveränderten Stand bestehen lässt.
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, appendFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const site = resolve(args.find(a => !a.startsWith('--')) || 'site');
const out = resolve((args.find(a => a.startsWith('--ausgabe=')) || '--ausgabe=dist/suchraster-selbsttest').split('=').slice(1).join('='));
const SUIZID = '.puk-site-result[data-search-target="krise.html#suizid"]';
const LEER = '.puk-site-filter__empty p+p';
const CASES = [
  { name: 'K1', was: 'Stylesheet blendet Suizidtreffer und Sicherheitszeile der Leermeldung aus (display:none)', css: `${SUIZID},${LEER}{display:none}`, erwartet: ['RANG1', 'LEERMELDUNG'] },
  { name: 'K2', was: 'Leermeldung ohne Sicherheitszeile (suche.html)', html: [/<p><a class="puk-link--inline" href="krise\.html#krise-schnell"[^]*?<\/a><\/p>/, ''], erwartet: ['LEERMELDUNG'] },
  { name: 'K5', was: 'Anheftung in der Darstellung abgeschaltet (interaktion.js)', js: ['if (groups.pins) {', 'if (false && groups.pins) {'], erwartet: ['ANHEFTUNG'] },
  { name: 'K9', was: 'Anheftung in umgekehrter Reihenfolge (interaktion.js)', js: ['var pinnedItems = groups.pins.map(', 'var pinnedItems = groups.pins.slice().reverse().map('], erwartet: ['RANG1'] },
  { name: 'V1', was: 'Suizidtreffer mit order ans Ende der Liste', css: `${SUIZID}{order:99}`, erwartet: ['RANG1'] },
  { name: 'V2', was: 'Trefferliste umgekehrt (column-reverse)', css: '.puk-site-result-list{display:flex;flex-direction:column-reverse}', erwartet: ['RANG1'] },
  { name: 'V3', was: 'Suizidtreffer mit max-height:0 und overflow:hidden', css: `${SUIZID}{max-height:0;overflow:hidden;padding:0;border:0;margin:0}`, erwartet: ['RANG1'] },
  { name: 'V4', was: 'Suizidtreffer mit clip-path', css: `${SUIZID}{clip-path:inset(50%)}`, erwartet: ['RANG1'] },
  { name: 'V5', was: 'Suizidtreffer ausserhalb des Bildschirms', css: `${SUIZID}{position:absolute;left:-9999px}`, erwartet: ['RANG1'] },
  { name: 'V6', was: 'Sicherheitszeile der Leermeldung mit clip-path', css: `${LEER}{clip-path:inset(50%);height:1px;overflow:hidden}`, erwartet: ['LEERMELDUNG'] },
  { name: 'V6b', was: 'Sicherheitszeile der Leermeldung ausserhalb des Bildschirms', css: `${LEER}{position:absolute;left:-9999px}`, erwartet: ['LEERMELDUNG'] },
  { name: 'V7', was: 'Sicherheitszeile der Leermeldung mit der Klasse puk-sr (suche.html)', html: ['<p><a class="puk-link--inline" href="krise.html#krise-schnell"', '<p class="puk-sr"><a class="puk-link--inline" href="krise.html#krise-schnell"'], erwartet: ['LEERMELDUNG'] },
  { name: 'V7b', was: 'Suizidtreffer mit dem Attribut data-puk-sr-only (suche.html)', htmlSuizid: true, erwartet: ['RANG1'] },
  { name: 'V8', was: '«Wenn Suizid angesprochen wird» ausgeblendet', css: '.puk-site-result[data-search-target="kommunizieren.html#suizid-angesprochen"]{display:none}', erwartet: ['RANG3'] },
  { name: 'V10', was: 'Suizidtreffer von einem weissen Pseudo-Element überdeckt', css: `${SUIZID}{position:relative}${SUIZID}::after{content:"";position:absolute;inset:0;background:#fff}`, erwartet: ['RANG1'] },
  { name: 'W1', was: 'Überdeckung mit pointer-events:none', css: `${SUIZID}{position:relative}${SUIZID}::after{content:"";position:absolute;inset:0;background:#fff;pointer-events:none}`, erwartet: ['RANG1'] },
  { name: 'W2', was: 'Suizidtreffer mit filter:opacity(0)', css: `${SUIZID}{filter:opacity(0)}`, erwartet: ['RANG1'] },
  { name: 'W3', was: 'Suizidtreffer mit durchsichtiger Maske', css: `${SUIZID}{-webkit-mask-image:linear-gradient(transparent,transparent);mask-image:linear-gradient(transparent,transparent)}`, erwartet: ['RANG1'] },
  { name: 'W4', was: 'Suizidtreffer mit Deckkraft 0,11', css: `${SUIZID}{opacity:.11}`, erwartet: ['RANG1'] },
  { name: 'W5', was: 'Suizidtreffer weiss auf weiss', css: `${SUIZID},${SUIZID} *{color:#fff!important;background:#fff!important;border-color:#fff!important}`, erwartet: ['RANG1'] },
  { name: 'W6', was: 'Sicherheitszeile der Leermeldung überdeckt (pointer-events:none)', css: `${LEER}{position:relative}${LEER}::after{content:"";position:absolute;inset:-4px;background:#fff;pointer-events:none}`, erwartet: ['LEERMELDUNG'] },
  { name: 'W7', was: 'Sicherheitszeile der Leermeldung mit filter:opacity(0)', css: `${LEER}{filter:opacity(0)}`, erwartet: ['LEERMELDUNG'] },
  { name: 'W8', was: 'Suizidtreffer mit transform verschoben und hinter andere gelegt', css: `${SUIZID}{transform:translateY(-400%);z-index:-1;position:relative}`, erwartet: ['RANG1'] },
  { name: 'X1', was: 'Überdeckung, pointer-events:none!important in einer Kaskadenebene', css: `${SUIZID}{position:relative}${SUIZID}::after{content:"";position:absolute;inset:0;background:#fff}@layer sr{${SUIZID}::after{pointer-events:none!important}}`, erwartet: ['UNSICHTBAR'] },
  { name: 'X2', was: 'Verlauf als Hintergrundbild mit weissem Text', css: `${SUIZID}{background-image:linear-gradient(#fff,#fff)}${SUIZID} *{color:#fff!important}`, erwartet: ['UNSICHTBAR'] },
  { name: 'X3', was: 'mix-blend-mode:screen im Suizidtreffer', css: `${SUIZID} *{mix-blend-mode:screen}`, erwartet: ['RANG1'] },
  { name: 'X4', was: 'mix-blend-mode:screen am Sicherheitslink der Leermeldung', css: `${LEER} a{mix-blend-mode:screen}`, erwartet: ['LEERMELDUNG'] },
  { name: 'X5', was: 'Überdeckung der Sicherheitszeile der Leermeldung, pointer-events in einer Kaskadenebene', css: `${LEER}{position:relative}${LEER}::after{content:"";position:absolute;inset:-4px;background:#fff}@layer sr{${LEER}::after{pointer-events:none!important}}`, erwartet: ['LEERMELDUNG'] },
  { name: 'X6', was: 'Suizidtreffer fast weiss vor einem Hintergrundbild (nur über die Bildpunkte erkennbar)', css: `${SUIZID}{background-image:linear-gradient(#fff,#fff)}${SUIZID} *{color:#f4f4f4!important;mix-blend-mode:normal}`, erwartet: ['UNSICHTBAR'] },
  { name: 'Y1', was: 'Suizidtreffer auf schmalen Bildschirmen ausgeblendet', css: `@media (max-width:40rem){${SUIZID}{display:none}}`, umgebungen: 'telefon', erwartet: ['RANG1'] },
  { name: 'Y2', was: 'Suizidtreffer im dunklen Modus ausgeblendet', css: `@media (prefers-color-scheme:dark){${SUIZID}{display:none}}`, umgebungen: 'dunkel', erwartet: ['RANG1'] },
  { name: 'Y3', was: 'Sicherheitszeile der Leermeldung auf schmalen Bildschirmen ausgeblendet', css: `@media (max-width:40rem){${LEER}{display:none}}`, umgebungen: 'telefon', erwartet: ['LEERMELDUNG'] },
  { name: 'Y4', was: 'Suizidtreffer im Hochformat ausgeblendet', css: `@media (orientation:portrait){${SUIZID}{display:none}}`, umgebungen: 'telefon', erwartet: ['RANG1'] },
  { name: 'Y5', was: 'Suizidtreffer bei erzwungenen Farben ausgeblendet', css: `@media (forced-colors:active){${SUIZID}{display:none}}`, umgebungen: 'kontrast', erwartet: ['RANG1'] },
  { name: 'Y6', was: 'Suizidtreffer im dunklen Modus weiss auf weiss (nur über die Bildpunkte erkennbar)', css: `@media (prefers-color-scheme:dark){${SUIZID}{background-image:linear-gradient(#fff,#fff)}${SUIZID} *{color:#fff!important}}`, umgebungen: 'dunkel', erwartet: ['UNSICHTBAR'] }
];

function build(c, dir) {
  rmSync(dir, { recursive: true, force: true });
  cpSync(site, dir, { recursive: true });
  const edit = (file, from, to) => {
    const f = join(dir, file), src = readFileSync(f, 'utf8');
    const hit = typeof from === 'string' ? src.includes(from) : from.test(src);
    if (!hit) throw new Error(`${c.name} nicht anwendbar: ${file} enthält ${from} nicht`);
    writeFileSync(f, src.replace(from, to));
  };
  if (c.css) writeFileSync(join(dir, 'css/site.css'), readFileSync(join(dir, 'css/site.css'), 'utf8') + '\n' + c.css + '\n');
  if (c.js) edit('js/interaktion.js', c.js[0], c.js[1]);
  if (c.htmlSuizid) {
    // data-puk-sr-only nur am Suizidtreffer: das li mit data-search-target="krise.html#suizid"
    const f = join(dir, 'suche.html'), src = readFileSync(f, 'utf8');
    const re = /<li class="puk-site-result" (data-search-item [^>]*data-search-target="krise\.html#suizid")/;
    if (!re.test(src)) throw new Error(`${c.name} nicht anwendbar: Suizidtreffer in suche.html nicht gefunden`);
    writeFileSync(f, src.replace(re, '<li class="puk-site-result" data-puk-sr-only $1'));
  } else if (c.html) edit('suche.html', c.html[0], c.html[1]);
}

mkdirSync(out, { recursive: true });
const tool = join(here, 'suchraster.mjs');
// Die weiteren Umgebungen (Telefon, dunkel, erzwungene Farben) verdreifachen die Laufzeit; jede Konstruktion läuft deshalb
// nur in der Umgebung, die sie trifft, der unveränderte Stand in allen.
const run = (dir, name, umgebungen = 'keine') => {
  const r = spawnSync(process.execPath, [tool, site, dir, '--nur=proben', '--ausnahmen=keine', '--immer', `--umgebungen=${umgebungen}`, `--ausgabe=${join(out, name)}`], { encoding: 'utf8', env: { ...process.env, GITHUB_STEP_SUMMARY: '' } });
  let result = null;
  try { result = JSON.parse(readFileSync(join(out, name, 'ERGEBNIS.json'), 'utf8')); } catch { /* kein Ergebnis */ }
  return { code: r.status, result, log: (r.stdout || '') + (r.stderr || '') };
};
const lines = [];
let bad = 0;
// Gegenprobe: unveränderter Stand besteht
{
  const dir = join(out, 'stand', 'unveraendert');
  rmSync(dir, { recursive: true, force: true }); cpSync(site, dir, { recursive: true });
  const r = run(dir, 'unveraendert', 'telefon,dunkel,kontrast');
  const ok = r.code === 0 && r.result && !r.result.verschlechterungen.length;
  if (!ok) bad++;
  lines.push(`${ok ? 'BESTANDEN' : 'FEHLER   '} | unverändert | Rückgabe ${r.code}, ${r.result ? r.result.verschlechterungen.length : '?'} Verschlechterungen (erwartet 0)`);
}
for (const c of CASES) {
  const dir = join(out, 'stand', c.name);
  try { build(c, dir); } catch (e) { bad++; lines.push(`FEHLER    | ${c.name} | ${e.message}`); continue; }
  const r = run(dir, c.name, c.umgebungen);
  const kinds = new Set((r.result ? r.result.verschlechterungen : []).flatMap(f => f.kinds));
  const missing = c.erwartet.filter(k => !kinds.has(k));
  const ok = r.code === 1 && r.result && !missing.length;
  if (!ok) bad++;
  lines.push(`${ok ? 'BESTANDEN' : 'FEHLER   '} | ${c.name} | ${c.was} | Rückgabe ${r.code} · ${r.result ? r.result.verschlechterungen.length : '?'} Verschlechterungen · Arten ${[...kinds].join(', ') || '–'}${missing.length ? ` · FEHLT ${missing.join(', ')}` : ''}`);
  if (!r.result) lines.push(r.log.split('\n').slice(0, 5).map(l => `    ${l}`).join('\n'));
}
const head = `Selbsttest des Suchrasters · ${CASES.length} Konstruktionen und der unveränderte Stand · ${bad ? `${bad} FEHLER` : 'alle bestanden'}`;
console.log([head, ...lines].join('\n'));
writeFileSync(join(out, 'ERGEBNIS.txt'), [head, ...lines].join('\n') + '\n');
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, [`### ${head}`, '', ...lines.map(l => `- ${l.replace(/[|`<>]/g, ch => ({ '|': '·', '`': "'", '<': '&lt;', '>': '&gt;' })[ch])}`), ''].join('\n'));
process.exitCode = bad ? 1 : 0;
