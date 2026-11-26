// Nachprüfung r4-74: die ganze Wortliste (npm all-the-german-words 1.1.0) durch die Umschreibung der Suche (fixTypos mit baseWord).
// Aufruf: node wortliste.cjs <vorher-site> <nachher-site> <woerter.json> <ausgabeordner>
// 1 Welche Wörter schreibt die Suche um (Wortstamm-Regel oder Tippfehlerregel)? 2 Welche Wortanfänge (Tippen) schreibt sie um?
const fs = require('node:fs'), path = require('node:path');
const [dirA, dirB, wl, out] = process.argv.slice(2);
process.argv.splice(4, 0, 'x', 'x');
const { open } = require('./lauf.cjs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
(async () => {
  const h = await open(); await h.close(); // prüft nur, dass die Messzeile greift
  // eigener Seitenzugriff auf den Nachher-Stand
  const http = require('node:http'); const dir = path.resolve(dirB); const HOOK = "input.addEventListener('input', renderSearch);";
  const s = http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p); if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; } let b = fs.readFileSync(f); if (p === '/js/interaktion.js') b = Buffer.from(b.toString('utf8').replace(HOOK, 'window.__ft = fixTypos; window.__norm = normalized; window.__stems = suicideStems; window.__targets = typoTargets; ' + HOOK)); res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'text/javascript' : 'text/css' }); res.end(b); });
  await new Promise(r => s.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch(); const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${s.address().port}/suche.html`, { waitUntil: 'networkidle' });
  const words = JSON.parse(fs.readFileSync(wl, 'utf8'));
  const rewrite = async list => { const res = []; for (let i = 0; i < list.length; i += 100000) res.push(...await page.evaluate(ws => ws.map(w => { const n = window.__norm(w); if (n.indexOf(' ') !== -1) return null; const f = window.__ft(n); return f === n ? null : [w, n, f, window.__stems.some(st => n.indexOf(st[0]) !== -1) ? 'Wortstamm' : 'Tippfehler']; }).filter(Boolean), list.slice(i, i + 100000))); return res; };
  const targets = await page.evaluate(() => window.__targets.length);
  const full = await rewrite(words);
  const stem = full.filter(r => r[3] === 'Wortstamm'), typo = full.filter(r => r[3] === 'Tippfehler');
  const stemWords = new Set(stem.map(r => r[1])), typoWords = new Set(typo.map(r => r[1]));
  fs.writeFileSync(path.join(out, 'wortliste-umschreibungen.txt'), [`# ${words.length} Wörter, ${targets} Schlüsselwörter der Tippfehlerregel`, `## Wortstamm-Regel schreibt um: ${stemWords.size} verschiedene Wörter (normalisiert)`, ...[...new Map(stem.map(r => [r[1], `${r[0]} → ${r[2]}`])).values()], `## Tippfehlerregel schreibt um: ${typoWords.size} verschiedene Wörter (normalisiert)`, ...[...new Map(typo.map(r => [r[1], `${r[0]} → ${r[2]}`])).values()]].join('\n') + '\n');
  // Wortanfänge ab fünf Zeichen: Zwischenstufen beim Tippen
  const prefixes = new Map();
  for (const w of words) { const n = String(w).toLowerCase(); for (let i = 5; i < n.length; i++) { const p = n.slice(0, i); if (!prefixes.has(p)) prefixes.set(p, w); } }
  const plist = [...prefixes.keys()];
  const pre = await rewrite(plist);
  // harmlos = das ganze Wort wird selbst nicht umgeschrieben (weder Wortstamm noch Tippfehler) und ist kein Schlüsselwort
  const fullRewritten = new Set(full.map(r => String(r[0]).toLowerCase()));
  const tset = new Set(await page.evaluate(() => window.__targets));
  const norm = w => page.evaluate(x => window.__norm(x), w);
  const byTarget = {}; const harmless = [];
  for (const r of pre) {
    // alle Wörter mit diesem Anfang, die nicht selbst umgeschrieben werden
    const ex = prefixes.get(r[0]);
    harmless.push([r[0], r[2], ex]);
  }
  // Beispiele je Wortanfang: ganze Wörter suchen, die nicht zur Familie des Schlüsselworts gehören
  const famOf = t => t.slice(0, Math.min(t.length, 6));
  const outLines = []; let n = 0;
  const wordsLower = words.map(w => String(w).toLowerCase());
  const preMap = new Map(pre.map(r => [r[0], r[2]]));
  const hits = new Map();
  for (const w of wordsLower) { for (let i = 5; i < w.length; i++) { const p = w.slice(0, i); const t = preMap.get(p); if (t && !fullRewritten.has(w)) { const key = p + '→' + t; if (!hits.has(key)) hits.set(key, []); if (hits.get(key).length < 6) hits.get(key).push(w); } } }
  for (const [key, list] of [...hits].sort()) outLines.push(`${key} | beim Tippen von z. B.: ${list.join(', ')}`);
  fs.writeFileSync(path.join(out, 'wortliste-wortanfaenge.txt'), [`# Wortanfänge ab fünf Zeichen aus ${words.length} Wörtern: ${plist.length} verschiedene; die Suche schreibt ${pre.length} davon um.`, `# Unten: Wortanfänge, die umgeschrieben werden, obwohl das fertig getippte Wort der Liste nicht umgeschrieben wird: ${hits.size}`, ...outLines].join('\n') + '\n');
  console.log(`Wortstamm ${stemWords.size} · Tippfehler ${typoWords.size} · Wortanfänge umgeschrieben ${pre.length}, davon mit fertigem Wort ohne Umschreibung ${hits.size}`);
  await browser.close(); s.close();
})();
