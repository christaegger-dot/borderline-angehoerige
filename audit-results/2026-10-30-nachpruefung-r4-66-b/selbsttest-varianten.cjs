// Nachprüfung r4-66: Selbsttest von r4-66 mit veränderten Fassungen von ctlTxt/accTxt in einer Kopie von authoring/ (ausserhalb des Repositorys).
// Aufruf: node selbsttest-varianten.cjs <Arbeitsbaum r4-66> <Arbeitsordner>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [WT, W] = process.argv.slice(2).map(p => path.resolve(p));
const src = fs.readFileSync(path.join(WT, 'authoring/tools/contract.js'), 'utf8');
const CTL = `const ctlTxt = c => c.tag === 'img' ? ' ' + (c.attrs.alt || '') + ' '\n  : c.tag === 'input' ? (String(c.attrs.type || '').toLowerCase() === 'hidden' ? '' : ' ' + (c.attrs.value || '[Eingabefeld]') + ' ') : null;`;
const ACC = `const accTxt = node => (node.children || []).map(c => c.tag === '#text' ? c.text : RAW.has(c.tag) || hiddenFlag(c) ? '' : ctlTxt(c) ?? accTxt(c)).join('');`;
if (!src.includes(CTL) || !src.includes(ACC)) throw new Error('Ausgangszeilen nicht gefunden');
const V = [
  ['V0 unverändert (r4-66)', s => s],
  ['V1 ohne ctlTxt (accTxt wie r4-65)', s => s.replace(ACC, `const accTxt = node => (node.children || []).map(c => c.tag === '#text' ? c.text : RAW.has(c.tag) || hiddenFlag(c) ? '' : accTxt(c)).join('');`)],
  ['V2 nur img, kein input', s => s.replace(CTL, `const ctlTxt = c => c.tag === 'img' ? ' ' + (c.attrs.alt || '') + ' ' : null;`)],
  ['V3 nur input, kein img', s => s.replace(CTL, `const ctlTxt = c => c.tag === 'input' ? (String(c.attrs.type || '').toLowerCase() === 'hidden' ? '' : ' ' + (c.attrs.value || '[Eingabefeld]') + ' ') : null;`)],
  ['V4 leeres alt zählt als «Bild»', s => s.replace(`' ' + (c.attrs.alt || '') + ' '`, `' ' + (c.attrs.alt || 'Bild') + ' '`)],
  ['V5 ctlTxt vor hiddenFlag (verborgene Bilder und Felder zählen)', s => s.replace(ACC, `const accTxt = node => (node.children || []).map(c => c.tag === '#text' ? c.text : ctlTxt(c) ?? (RAW.has(c.tag) || hiddenFlag(c) ? '' : accTxt(c))).join('');`)],
  ['V6 type=hidden zählt mit', s => s.replace(`String(c.attrs.type || '').toLowerCase() === 'hidden'`, 'false')],
  ['V7 ohne Platzhalter [Eingabefeld]', s => s.replace(`(c.attrs.value || '[Eingabefeld]')`, `(c.attrs.value || '')`)],
  ['V8 type ohne toLowerCase', s => s.replace(`String(c.attrs.type || '').toLowerCase()`, `String(c.attrs.type || '')`)],
  ['V9 img ohne Leerzeichen um alt', s => s.replace(`' ' + (c.attrs.alt || '') + ' '`, `(c.attrs.alt || '')`)],
  ['V10 Bild nur verborgen, wenn selbst hidden (Vorfahren egal)', s => s.replace(ACC, `const accTxt = node => (node.children || []).map(c => c.tag === '#text' ? c.text : RAW.has(c.tag) || hiddenFlag(c) ? (c.tag === 'span' ? accTxt(c) : '') : ctlTxt(c) ?? accTxt(c)).join('');`)],
];
const out = [];
for (const [name, f] of V) {
  const dir = path.join(W, name.split(' ')[0]); fs.rmSync(dir, { recursive: true, force: true }); fs.cpSync(path.join(WT, 'authoring'), path.join(dir, 'authoring'), { recursive: true });
  const t = f(src); if (name[1] !== '0' && t === src) { out.push(`== ${name}\nVariante nicht anwendbar`); continue; }
  fs.writeFileSync(path.join(dir, 'authoring/tools/contract.js'), t);
  let r; try { r = execFileSync('node', [path.join(dir, 'authoring/tools/selftest.mjs')], { encoding: 'utf8' }); } catch (e) { r = (e.stdout || '') + (e.stderr || ''); }
  const lines = r.split('\n'); out.push(`== ${name}`, ...lines.filter(l => l.startsWith('FAIL')), lines.filter(l => l.startsWith('Selbsttest:')).join(' '));
}
console.log(out.join('\n'));
