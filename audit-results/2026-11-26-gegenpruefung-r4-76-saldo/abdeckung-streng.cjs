// Gegenprüfung r4-76: strenge Variante zu abdeckung.cjs, nur aus der Vergleichsdatei (vergleich-bauraster-r4-73-r4-75.txt).
// Unveränderte Anfragen zählen in beiden Ständen gleich; die Differenz ergibt sich deshalb aus den geänderten Zeilen allein.
// Gewalt zählt hier nur mit gefahr#gewalt als passend (ohne kinder#eskalation). Aufruf: node abdeckung-streng.cjs <vergleichsdatei> <raster.cjs>
const fs = require('fs'); const [file, rasterFile] = process.argv.slice(2);
const src = fs.readFileSync(rasterFile, 'utf8'); const P = eval(src.match(/const PREDICATES = (\[[\s\S]*?\]);/)[1]);
const iS = P.indexOf('ritzt sich'), iG = P.indexOf('schlägt');
const top2 = s => { s = s.replace(/ \(\+\d+\)$/, '').replace(/ \[[A-Z]+\]/g, '').trim(); return s === '–' ? [] : s.split(' > ').slice(0, 2); };
const d = { Suizid: [0, 0], Selbstverletzung: [0, 0], 'Gewalt (nur gefahr#gewalt)': [0, 0], 'Gewalt (gefahr#gewalt zuerst)': [0, 0] };
for (const l of fs.readFileSync(file, 'utf8').split('\n')) { if (l.startsWith('#') || !l.includes(' | r4-75 ')) continue;
  const [q, a, b] = l.split(' | '); const A = top2(a.replace(/^r4-73 /, '')), B = top2(b.replace(/^r4-75 /, ''));
  const i = P.map((p, k) => [p, k]).filter(([p]) => q.includes(p)).sort((x, y) => y[0].length - x[0].length)[0]?.[1]; if (i === undefined) continue;
  const add = (k, f) => { d[k][0] += f(A); d[k][1] += f(B); };
  if (i < iS) add('Suizid', h => +h.includes('krise#suizid')); else if (i < iG) add('Selbstverletzung', h => +h.includes('krise#selbstverletzung'));
  else { add('Gewalt (nur gefahr#gewalt)', h => +h.includes('gefahr#gewalt')); add('Gewalt (gefahr#gewalt zuerst)', h => +(h[0] === 'gefahr#gewalt')); } }
console.log('Nur geänderte Anfragen: Anzahl mit passendem Abschnitt in r4-73 → r4-75 (Differenz gilt für das ganze Raster)');
for (const [k, [x, y]] of Object.entries(d)) console.log(`${k}: ${x} → ${y} (Differenz ${y - x >= 0 ? '+' : ''}${y - x})`);
