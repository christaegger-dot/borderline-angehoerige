// Nachprüfung r4-75: wertet Ergebnisdateien von ../2026-11-26-nachpruefung-r4-74/lauf.cjs (Modus «proben») nach R34-P01 aus.
// Aufruf: node auswertung.cjs <ergebnisdatei> …
const fs = require('node:fs');
const S = 'krise.html#suizid', K = 'kinder.html#eskalation';
const SAFE = [S, 'gefahr.html#gewalt', K, 'kommunizieren.html#suizid-angesprochen', 'krise.html#selbstverletzung'];
const norm = v => String(v).normalize('NFC').toLocaleLowerCase('de-CH').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, ' ').trim();
const KILL = /\b(umbring\w*|umzubringen|umgebracht|umbracht\w*|toet\w*|getoetet)\b|\bbr(ing|acht)\w*\b.*\bum\b/;
const parse = s => { const pins = (s.match(/\[angeheftet: ([^\]]+)\]/) || [])[1]; const body = s.replace(/^(vorher|nachher) /, '').replace(/ \[angeheftet.*$/, '').replace(/ … \(\d+\)$/, ''); return { top: body === '–' ? [] : body.split(' > '), pins: pins ? pins.split(', ') : null }; };
const short = r => (r.top.length ? r.top.slice(0, 3).map(h => h.replace('.html', '')).join(' > ') : '–') + (r.pins ? ' [P]' : '');
for (const file of process.argv.slice(2)) {
  let n = 0, kills = 0, changed = 0; const a = [], b = [], c = [], s = [];
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const m = line.split(' | '); const q = m[1], v = parse(m[2]), k = parse(m[3]); n++;
    if (line.startsWith('GEÄNDERT')) changed++;
    const kill = KILL.test(norm(q)); if (kill) kills++;
    const ok = r => r.top.slice(0, 2).includes(S) || r.top[0] === K;
    const row = `${q} | ${short(v)} → ${short(k)}`;
    if (kill && ok(v) && !ok(k)) a.push(row);
    if (v.pins && (!k.pins || v.pins.some(p => !k.pins.includes(p)))) b.push(row);
    if (v.top.length && !k.top.length) c.push(row);
    if (v.top.slice(0, 2).some(h => SAFE.includes(h) && !k.top.slice(0, 2).includes(h))) s.push(row);
  }
  console.log(`## ${file.split('/').pop()}: ${n} Anfragen (${kills} mit Tötungswort), geändert ${changed}`);
  console.log(`a) Tötungswort, Suizid vorher unter den ersten zwei oder Kinder zuerst, nachher nicht: ${a.length}`); a.forEach(l => console.log('   ' + l));
  console.log(`b) Anheftung verloren oder kleiner: ${b.length}`); b.forEach(l => console.log('   ' + l));
  console.log(`c) vorher Treffer, nachher keiner: ${c.length}`); c.forEach(l => console.log('   ' + l));
  console.log(`d) Sicherheitsabschnitt (auch Selbstverletzung) vorher unter den ersten zwei, nachher dort nicht: ${s.length}`); s.forEach(l => console.log('   ' + l));
}
