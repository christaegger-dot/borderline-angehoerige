// Nachprüfung r4-65 (PR #784): Selbsttest von r4-65 mit Regeln von r4-64, gesamt und einzeln.
// Aufruf: node selbsttest-varianten.cjs <arbeitsbaum-r4-65> <leeres-arbeitsverzeichnis>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [wt, work] = process.argv.slice(2);
const orig = fs.readFileSync(path.join(wt, 'authoring/tools/contract.js'), 'utf8');
const R = {
  H: ["const hiddenFlag = x => (!inSvg(x) && (has(x, 'hidden') || has(x, 'inert'))) || ariaHiddenFlag(x);",
      "const hiddenFlag = x => has(x, 'hidden') || has(x, 'inert') || ariaHiddenFlag(x);"],
  F: ["if (!svgSilenced(sv) && !up(sv, x => x.attrs.role === 'img')",
      "if (!hiddenFlag(sv) && !up(sv, x => hiddenFlag(x) || x.attrs.role === 'img')"],
  X: ["const svgSilenced = sv => ariaHiddenFlag(sv) || !!up(sv, x => ariaHiddenFlag(x) || (has(x, 'inert') && !inSvg(x)));",
      "const svgSilenced = sv => ariaHiddenFlag(sv) || !!up(sv, x => ariaHiddenFlag(x));"],
  S: ["const inSvg = x => x.tag === 'svg' || !!up(x, y => y.tag === 'svg');", "const inSvg = x => false;"],
};
const V = [['V0 r4-65 unverändert', []], ['V1 hiddenFlag von r4-64', ['H']], ['V2 SVG-Prüfung in Abbildungen von r4-64', ['F']],
  ['V3 hiddenFlag und SVG-Prüfung von r4-64', ['H', 'F']], ['V4 zu streng: inert am HTML-Vorfahren zählt nicht', ['X']], ['V5 inSvg immer falsch', ['S']]];
for (const [name, keys] of V) {
  const dir = path.join(work, 'v'); fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(path.join(wt, 'authoring'), path.join(dir, 'authoring'), { recursive: true });
  let src = orig;
  for (const k of keys) { const [a, b] = R[k]; if (src.split(a).length !== 2) throw new Error('Ersetzung nicht eindeutig: ' + k); src = src.replace(a, b); }
  fs.writeFileSync(path.join(dir, 'authoring/tools/contract.js'), src);
  let out; try { out = execFileSync('node', [path.join(dir, 'authoring/tools/selftest.mjs')], { encoding: 'utf8' }); } catch (e) { out = e.stdout; }
  console.log('== ' + name + (keys.length ? ' (ersetzt: ' + keys.join('+') + ')' : ''));
  for (const l of out.split('\n')) if (/^FAIL|^Selbsttest/.test(l)) console.log('   ' + l);
  fs.rmSync(dir, { recursive: true, force: true });
}
