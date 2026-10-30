// Auswertung von footer-messung.cjs: je Zustand (Breite, Schrift) Spannen über alle Seiten.
const d = JSON.parse(require('fs').readFileSync(process.argv[2]));
const key = r => `${r.w} px, ${r.font === 32 ? '200 %' : '100 %'}`;
const rng = a => { const s = [...new Set(a)].sort((x, y) => x - y); return s.length === 1 ? String(s[0]) : `${s[0]}–${s[s.length - 1]}`; };
console.log('Zustand | Seiten | Footer r4-61 | Footer r4-64 | Diff | Gewicht 61→64 | Zeilen «Fachstelle …» 61→64 | hyphens 64 | Abstand vor Hinweis 61→64 | Kontrast min 64 | Überlauf 64 | Wortbruch 61 | Wortbruch 64');
const A = d['r4-61'], B = d['r4-64'];
const states = [...new Set(B.map(key))];
for (const s of states) {
  const a = A.filter(r => key(r) === s), b = B.filter(r => key(r) === s);
  const diff = b.map(r => r.footer - a.find(x => x.page === r.page).footer);
  const fs = rs => rs.map(r => r.headings.find(h => h.text.startsWith('Fachstelle'))).filter(Boolean);
  const mw = rs => [...new Set(rs.flatMap(r => r.headings.flatMap(h => h.midWord)))].join('; ') || '–';
  console.log([s, b.length, rng(a.map(r => r.footer)), rng(b.map(r => r.footer)), rng(diff),
    [...new Set(a.flatMap(r => r.headings.map(h => h.weight)))] + '→' + [...new Set(b.flatMap(r => r.headings.map(h => h.weight)))],
    rng(fs(a).map(h => h.lines)) + '→' + rng(fs(b).map(h => h.lines)),
    [...new Set(b.flatMap(r => r.headings.map(h => h.hyphens)))].join(','),
    rng(a.map(r => r.gapBeforeBoundary)) + '→' + rng(b.map(r => r.gapBeforeBoundary)),
    Math.min(...b.flatMap(r => r.headings.map(h => h.contrast))),
    b.filter(r => r.overflowX).length, mw(a), mw(b)].join(' | '));
}
