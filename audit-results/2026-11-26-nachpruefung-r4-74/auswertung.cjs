// Wertet eine Ergebnisdatei von lauf.cjs (Modus «proben») nach R34-P01 aus und gibt die geänderten Fälle knapp aus.
const fs = require('node:fs');
const S = 'krise.html#suizid', K = 'kinder.html#eskalation';
const SAFE = [S, 'gefahr.html#gewalt', K, 'kommunizieren.html#suizid-angesprochen'];
const norm = v => String(v).normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, ' ').trim();
const KILL = /\b(umbring\w*|umzubringen|umgebracht|umbracht\w*|toet\w*|getoetet)\b|\bbr(ing|acht)\w*\b.*\bum\b/;
const parse = s => { const pins = (s.match(/\[angeheftet: ([^\]]+)\]/) || [])[1]; const body = s.replace(/ \[angeheftet.*$/, '').replace(/ … \(\d+\)$/, ''); return { top: body === '–' ? [] : body.split(' > '), pins: pins ? pins.split(', ') : null }; };
const short = r => (r.top.length ? r.top.slice(0, 3).map(h => h.replace('.html', '')).join(' > ') : '–') + (r.pins ? ' [P]' : '');
const file = process.argv[2]; const quiet = process.argv[3] === 'kurz';
let group = ''; const a = [], b = [], c = [], aAbs = [], changed = []; let total = 0, kills = 0;
for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
  if (line.startsWith('#')) { group = line.slice(2, 3); continue; }
  if (!line) continue;
  const m = line.split(' | '); const q = m[1], v = parse(m[2].replace(/^vorher /, '')), n = parse(m[3].replace(/^nachher /, ''));
  total++;
  const kill = KILL.test(norm(q)); if (kill) kills++;
  const ok = r => r.top.slice(0, 2).includes(S) || r.top[0] === K;
  if (kill && ok(v) && !ok(n)) a.push(`${group} | ${q} | ${short(v)} → ${short(n)}`);
  if (kill && !ok(n)) aAbs.push(`${group} | ${q} | ${short(v)} → ${short(n)}`);
  if (v.pins && (!n.pins || v.pins.some(p => !n.pins.includes(p)))) b.push(`${group} | ${q} | ${v.pins} → ${n.pins}`);
  if (v.top.length && !n.top.length) c.push(`${group} | ${q} | ${short(v)} → –`);
  if (line.startsWith('GEÄNDERT')) changed.push(`${group} | ${q} | ${short(v)} → ${short(n)}`);
}
console.log(`Anfragen ${total}, davon mit Tötungswort ${kills}; geändert ${changed.length}`);
console.log(`a) Tötungswort, Suizid vorher unter den ersten zwei (oder Kinder zuerst), nachher nicht: ${a.length}`); a.forEach(l => console.log('   ' + l));
console.log(`a') Tötungswort, nachher weder Suizid unter den ersten zwei noch Kinder zuerst (unabhängig vom Vorher): ${aAbs.length}`); aAbs.forEach(l => console.log('   ' + l));
console.log(`b) Anheftung vorher, nachher keine oder ein angehefteter Abschnitt weniger: ${b.length}`); b.forEach(l => console.log('   ' + l));
console.log(`c) vorher Treffer, nachher keiner: ${c.length}`); c.forEach(l => console.log('   ' + l));
if (!quiet) { console.log('Geänderte Fälle (erste drei Treffer, [P] = angeheftet):'); changed.forEach(l => console.log('   ' + l)); }
