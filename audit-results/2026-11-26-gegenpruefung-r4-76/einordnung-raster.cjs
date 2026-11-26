// Ordnet die Fälle einer Rasterdatei (raster.cjs, Teil «saetze») nach R34-P01 ein.
// Aufruf: node einordnung-raster.cjs <raster-saetze.txt>
// Tötungswort: Formen von «umbringen»/«töten» (wie killWords in interaktion.js r4-73) oder «bringt … um».
// Ich-Aussage eng: Satz beginnt mit «ich»; weit: enthält «ich», «mich» oder «mir».
const fs = require('node:fs');
const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n'); let sec = '';
const kill = q => /\b(umbring\w*|umzubringen|umbrach\w*|umgebracht|töte\w*|tötet\w*|getötet)\b/.test(q) || /\bbringt\b.*\bum\b/.test(q);
const r = { lost: [], empty: [] };
for (const l of lines) { if (l.startsWith('## ')) { sec = l.slice(3); continue; } if (!l.includes(' | ') || l.startsWith('#')) continue;
  const [q, rest] = l.split(' | '); const [A, B] = rest.split(' → ').map(s => s === '–' ? [] : s.split(' > '));
  if (sec === 'verloren') r.lost.push({ q, A, B }); if (sec === 'leer') r.empty.push({ q, A, B }); }
const a = r.lost.filter(x => kill(x.q) && x.A.slice(0, 2).includes('krise#suizid') && !x.B.slice(0, 2).includes('krise#suizid') && !(x.B[0] || '').startsWith('kinder'));
const aE = r.empty.filter(x => kill(x.q) && x.A.slice(0, 2).includes('krise#suizid'));
const b = r.lost.concat(r.empty).filter(x => kill(x.q));
const cEng = r.empty.filter(x => /^ich\b/.test(x.q)); const cWeit = r.empty.filter(x => /\b(ich|mich|mir)\b/.test(x.q));
const out = [`Datei: ${process.argv[2]}`, `verloren ${r.lost.length} · leer ${r.empty.length}`,
  `a) Tötungswort, Suizid aus den ersten zwei (ausser Kinder zuerst): ${a.length + aE.length}`, ...a.concat(aE).map(x => `  ${x.q} | ${x.A.join(' > ')} → ${x.B.join(' > ') || '–'}`),
  `b) Tötungswort mit verlorenem Sicherheitsabschnitt oder leer (obere Schranke für «Anheftung verloren»): ${b.length}`, ...b.map(x => `  ${x.q} | ${x.A.join(' > ')} → ${x.B.join(' > ') || '–'}`),
  `c) eng, Satz beginnt mit «ich», leer: ${cEng.length}`, ...cEng.map(x => `  ${x.q} | ${x.A.join(' > ')} → –`),
  `c) weit, enthält ich/mich/mir, leer: ${cWeit.length}`, ...cWeit.slice(0, 40).map(x => `  ${x.q} | ${x.A.join(' > ')} → –`)];
const byPred = {}; for (const x of r.lost.concat(r.empty)) { const k = x.q.replace(/^(er|sie|ich|mein \w+|meine \w+)\s/, ''); }
console.log(out.join('\n'));
