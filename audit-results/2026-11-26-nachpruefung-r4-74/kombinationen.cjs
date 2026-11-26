// Nachprüfung r4-74: Kombinationsproben für die Stopp-Regel R34-P01.
//  1 «toetung»: jede Zeile der Gruppe A aus proben.txt mal 34 Zusätze, die die neuen Regeln berühren
//  2 «ich»: Ich-Aussagen aus Bausteinen (Kern mal Füllwörter), gesucht sind Fälle «vorher Treffer, nachher keiner»
//  3 «tippen»: jede Eingabe-Zwischenstufe (Zeichen für Zeichen) von Sätzen aus proben.txt
// Aufruf: node kombinationen.cjs <vorher-site> <nachher-site> <ausgabeordner>
const fs = require('node:fs'), path = require('node:path');
process.argv.splice(4, 0, 'x', 'x');
const { open, fmt } = require('./lauf.cjs');
const out = process.argv[6];
const S = 'krise.html#suizid', K = 'kinder.html#eskalation';
const SAFE = [S, 'gefahr.html#gewalt', K, 'kommunizieren.html#suizid-angesprochen'];
const groups = {}; let g = '';
for (const l of fs.readFileSync(path.join(__dirname, 'proben.txt'), 'utf8').split('\n')) { if (l.startsWith('#')) { g = l[2]; groups[g] = []; } else if (l.trim()) groups[g].push(l); }
const ok = r => r.top.slice(0, 2).includes(S) || r.top[0] === K;
const short = r => (r.n ? r.top.slice(0, 3).map(h => h.replace('.html', '')).join(' > ') : '–') + (r.pins ? ' [P]' : '');
(async () => {
  const h = await open(); const sum = [];
  // 1 Tötungswort mal Zusätze
  const add = ['', ' ich will nicht mehr', ' Sie will nicht mehr.', ' und redet vom Tod', ' suizidgefährdet', ' Suizit', ' Selbsmord', ' und schlägt die Kinder', ' er schlägt mich', ' Ohrfeige', ' FU', ' IV',
    ' Zwangseinweisung', ' gegen ihren Willen', ' es blutet', ' geschnitten', ' cha nümme', ' Jugendamt', ' Beleidigungen', ' schreit mich an', ' Angst um mein Leben', ' Krisenplan', ' mag nicht mehr', ' wott nümme',
    ' Abschiedsnachricht', ' aggressiv', ' immer wieder', ' hat er oft gesagt', ' Selbstverletzungen', ' Kind', ' die Kinder', ' mich', '?!', ' …'];
  const pre = ['', 'Er sagt immer wieder: ', 'Sie schreibt oft, ', 'Hilfe! ', 'Kinder: '];
  const q1 = [];
  for (const base of groups.A) { for (const a of add) q1.push(base + a); for (const p of pre.slice(1)) q1.push(p + base); q1.push(base.toUpperCase()); q1.push(base.toLowerCase().replace(/[.,!?:;«»()]/g, '')); }
  const r1 = await h.run(q1);
  const a = r1.filter(r => ok(r.v) && !ok(r.n)), aAbs = r1.filter(r => !ok(r.n)), b = r1.filter(r => r.v.pins && (!r.n.pins || r.v.pins.some(p => !r.n.pins.includes(p)))), c = r1.filter(r => r.v.n && !r.n.n);
  const pinOrder = r1.filter(r => r.v.pins && r.n.pins && r.v.pins.join() !== r.n.pins.join());
  const lines1 = [`# Tötungswort mal Zusätze: ${q1.length} Anfragen (${groups.A.length} Sätze der Gruppe A)`,
    `## a) Suizid vorher unter den ersten zwei oder Kinder zuerst, nachher nicht: ${a.length}`, ...a.map(r => `${r.q} | ${short(r.v)} → ${short(r.n)}`),
    `## a') nachher weder Suizid unter den ersten zwei noch Kinder zuerst: ${aAbs.length}`, ...aAbs.map(r => `${r.q} | ${short(r.v)} → ${short(r.n)}`),
    `## b) Anheftung verloren oder um einen Abschnitt kleiner: ${b.length}`, ...b.map(r => `${r.q} | ${r.v.pins} → ${r.n.pins}`),
    `## c) vorher Treffer, nachher keiner: ${c.length}`, ...c.map(r => `${r.q} | ${short(r.v)} → –`),
    `## Reihenfolge der Anheftung geändert (blockiert nicht): ${pinOrder.length}`, ...pinOrder.map(r => `${r.q} | ${r.v.pins.map(p => p.replace('.html', ''))} → ${r.n.pins.map(p => p.replace('.html', ''))}`)];
  fs.writeFileSync(path.join(out, 'kombination-toetungswort.txt'), lines1.join('\n') + '\n');
  sum.push(`1 Tötungswort mal Zusätze: ${q1.length} Anfragen · a) ${a.length} · a') ${aAbs.length} · b) ${b.length} · c) ${c.length} · Reihenfolge der Anheftung geändert ${pinOrder.length}`);
  // 1b Suizid und Gewalt ohne Tötungswort (Gruppe B) mal Zusätze
  const q1b = []; for (const base of groups.B) for (const x of add) q1b.push(base + x);
  const r1b = await h.run(q1b);
  const bb = r1b.filter(r => r.v.pins && (!r.n.pins || r.v.pins.some(p => !r.n.pins.includes(p)))), cb = r1b.filter(r => r.v.n && !r.n.n), sb = r1b.filter(r => r.v.top.slice(0, 2).includes(S) && !r.n.top.slice(0, 2).includes(S));
  fs.writeFileSync(path.join(out, 'kombination-suizid-gewalt.txt'), [`# Suizid und Gewalt ohne Tötungswort mal Zusätze: ${q1b.length} Anfragen`, `## Anheftung verloren: ${bb.length}`, ...bb.map(r => `${r.q} | ${r.v.pins} → ${r.n.pins}`), `## Suizid vorher unter den ersten zwei, nachher nicht: ${sb.length}`, ...sb.map(r => `${r.q} | ${short(r.v)} → ${short(r.n)}`), `## vorher Treffer, nachher keiner: ${cb.length}`, ...cb.map(r => `${r.q} | ${short(r.v)} → –`)].join('\n') + '\n');
  sum.push(`1b Suizid und Gewalt mal Zusätze: ${q1b.length} Anfragen · Anheftung verloren ${bb.length} · Suizid aus den ersten zwei ${sb.length} · vorher Treffer, nachher keiner ${cb.length}`);
  // 2 Ich-Aussagen aus Bausteinen
  const kern = ['weine', 'zittere', 'schreie', 'streite', 'zweifle', 'leide', 'schweige', 'grüble', 'trinke', 'flüchte', 'lüge', 'entschuldige mich', 'gebe nach', 'ziehe mich zurück', 'raste aus', 'verliere die Geduld', 'bin müde', 'bin traurig', 'bin verzweifelt', 'bin wütend', 'bin allein', 'bin einsam', 'bin ratlos', 'bin hilflos', 'bin schuld', 'habe Angst', 'habe Panik', 'habe Schuldgefühle', 'habe versagt', 'habe aufgegeben', 'werde angeschrien', 'werde beschimpft', 'werde bedroht', 'werde geschlagen', 'werde erpresst', 'werde kontrolliert', 'werde angerufen', 'werde beschuldigt', 'werde abgewertet', 'werde ignoriert', 'fühle mich schuldig', 'fühle mich leer', 'fühle mich ausgenutzt', 'fühle mich verantwortlich', 'schäme mich', 'sorge mich', 'ärgere mich', 'denke an Trennung', 'denke ans Sterben', 'denke an Suizid', 'verletze mich', 'ritze mich', 'schneide mich', 'schlage zu', 'drohe', 'kontrolliere sie', 'rufe die Polizei', 'rufe an', 'zahle', 'gebe Geld', 'putze', 'koche', 'warte', 'hoffe', 'bete', 'verzeihe', 'helfe', 'tröste', 'erkläre', 'rechtfertige mich', 'verteidige mich', 'sage nein', 'sage ja', 'setze Grenzen', 'gehe', 'bleibe', 'mache alles falsch', 'mache mir Sorgen', 'mache mir Vorwürfe', 'kann nicht schlafen', 'kann nicht mehr', 'will nicht mehr', 'will sterben', 'will weg', 'will Ruhe', 'brauche Hilfe', 'brauche Abstand', 'brauche Ruhe', 'verstehe es nicht', 'weiss nicht weiter', 'halte es nicht aus', 'ertrage es nicht'];
  const fuell = ['', ' immer', ' immer wieder', ' oft', ' wieder', ' sehr oft', ' schon wieder', ' immer öfter'];
  const rahmen = [k => `Ich ${k}`, k => `Er sagt ich ${k}`, k => `Sie sagt, ich ${k}`, k => `Ich ${k}, sagt sie`, k => `Ich ${k}. Das habe ich oft gemacht`, k => `Ich ${k} und habe nichts getan`];
  const q2 = []; for (const k of kern) for (const f of fuell) for (const rf of rahmen) q2.push(rf(k + f));
  const r2 = await h.run(q2);
  const c2 = r2.filter(r => r.v.n && !r.n.n), plus2 = r2.filter(r => !r.v.n && r.n.n), s2 = r2.filter(r => r.v.top.slice(0, 2).some(x => SAFE.includes(x)) && !r.n.top.slice(0, 3).some(x => SAFE.includes(x)));
  const ohne = [r2.filter(r => !r.v.n).length, r2.filter(r => !r.n.n).length];
  fs.writeFileSync(path.join(out, 'kombination-ich-aussagen.txt'), [`# Ich-Aussagen aus Bausteinen: ${q2.length} Anfragen (${kern.length} Kerne, ${fuell.length} Füllungen, ${rahmen.length} Rahmen)`, `Ohne Treffer vorher ${ohne[0]}, nachher ${ohne[1]}; neu mit Treffer ${plus2.length}`,
    `## c) vorher Treffer, nachher keiner: ${c2.length}`, ...c2.map(r => `${r.q} | ${short(r.v)} (${r.v.n}) → –`),
    `## Sicherheitsabschnitt vorher unter den ersten zwei, nachher keiner unter den ersten drei: ${s2.length}`, ...s2.map(r => `${r.q} | ${short(r.v)} → ${short(r.n)}`)].join('\n') + '\n');
  sum.push(`2 Ich-Aussagen aus Bausteinen: ${q2.length} Anfragen · ohne Treffer vorher ${ohne[0]}, nachher ${ohne[1]} · c) vorher Treffer, nachher keiner ${c2.length} · neu mit Treffer ${plus2.length} · Sicherheitsabschnitt verschwunden ${s2.length}`);
  // 3 Tippen: alle Zwischenstufen
  const saetze = [...groups.A, ...groups.B, ...groups.D, ...groups.C.slice(0, 30), ...groups.F, ...groups.I];
  const q3 = [], owner = [];
  for (const s of saetze) for (let i = 3; i <= s.length; i++) { q3.push(s.slice(0, i)); owner.push(s); }
  const r3 = await h.run(q3);
  const a3 = r3.filter(r => ok(r.v) && r.v.pins && !ok(r.n)), b3 = r3.filter(r => r.v.pins && (!r.n.pins || r.v.pins.some(p => !r.n.pins.includes(p)))), c3 = r3.filter(r => r.v.n && !r.n.n);
  // Aufblitzen: Zwischenstufe mit angeheftetem Sicherheitsabschnitt, obwohl der ganze Satz keinen hat (nur nachher)
  const flash = []; const seen = new Set();
  r3.forEach((r, i) => { const full = r3[q3.lastIndexOf(owner[i])]; if (r.n.pins && !full.n.pins && !r.v.pins && !seen.has(owner[i])) { seen.add(owner[i]); flash.push(`${owner[i]} | Zwischenstufe «${r.q}»: ${short(r.n)} | ganzer Satz: ${short(full.n)}`); } });
  fs.writeFileSync(path.join(out, 'tippen-zwischenstufen.txt'), [`# Tippen: ${q3.length} Zwischenstufen aus ${saetze.length} Sätzen (ab drei Zeichen)`,
    `## a) Zwischenstufe mit Anheftung und Suizid unter den ersten zwei (oder Kinder zuerst) vorher, nachher nicht: ${a3.length}`, ...a3.map(r => `«${r.q}» | ${short(r.v)} → ${short(r.n)}`),
    `## b) Anheftung verloren: ${b3.length}`, ...b3.map(r => `«${r.q}» | ${r.v.pins} → ${r.n.pins}`),
    `## c) vorher Treffer, nachher keiner: ${c3.length}`, ...c3.map(r => `«${r.q}» | ${short(r.v)} → –`),
    `## Aufblitzen nachher: Zwischenstufe heftet einen Sicherheitsabschnitt an, der ganze Satz nicht (je Satz die erste Stufe): ${flash.length}`, ...flash].join('\n') + '\n');
  sum.push(`3 Tippen: ${q3.length} Zwischenstufen aus ${saetze.length} Sätzen · a) ${a3.length} · b) ${b3.length} · c) ${c3.length} · Sätze mit aufblitzender Anheftung ${flash.length}`);
  sum.push(`JS-Fehler: ${h.errors.length}`);
  fs.writeFileSync(path.join(out, 'kombinationen-zusammenfassung.txt'), sum.join('\n') + '\n'); console.log(sum.join('\n'));
  await h.close();
})();
