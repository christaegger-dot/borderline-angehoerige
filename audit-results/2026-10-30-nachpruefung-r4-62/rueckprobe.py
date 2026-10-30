# Nachprüfung r4-62: setzt in einer Kopie von authoring/ (r4-62) einzelne Regeln auf r4-61 zurück und lässt den Selbsttest laufen.
# Aufruf: python3 -I rueckprobe.py <authoring-r4-62> <zielordner>
import sys, shutil, subprocess, os
src, out = sys.argv[1], sys.argv[2]
OLD_HF = "const hiddenFlag = x => has(x, 'hidden') || has(x, 'inert') || (has(x, 'aria-hidden') && !ariaHiddenOff.has(String(x.attrs['aria-hidden']).toLowerCase()));"
NEW_HF = "const hiddenFlag = x => (!inSvg(x) && (has(x, 'hidden') || has(x, 'inert'))) || ariaHiddenFlag(x);"
OLD_SVG = "for (const sv of all(f, x => x.tag === 'svg')) if (!hiddenFlag(sv) && !up(sv, x => hiddenFlag(x) || x.attrs.role === 'img') &&"
NEW_SVG = "for (const sv of all(f, x => x.tag === 'svg')) if (!svgSilenced(sv) && !up(sv, x => x.attrs.role === 'img') &&"
NEW_SIL = "const svgSilenced = sv => ariaHiddenFlag(sv) || !!up(sv, x => ariaHiddenFlag(x) || (has(x, 'inert') && !inSvg(x)));"
STRICT_SIL = "const svgSilenced = sv => ariaHiddenFlag(sv) || !!up(sv, x => ariaHiddenFlag(x));"
LAX_SIL = "const svgSilenced = sv => ariaHiddenFlag(sv) || !!up(sv, x => ariaHiddenFlag(x) || ((has(x, 'inert') || has(x, 'hidden')) && !inSvg(x)));"
LAX_HF = "const hiddenFlag = x => has(x, 'hidden') || (!inSvg(x) && has(x, 'inert')) || ariaHiddenFlag(x);"
variants = {
  'unverändert r4-62': [],
  'hiddenFlag und SVG-Prüfung von r4-61': [(NEW_HF, OLD_HF), (NEW_SVG, OLD_SVG)],
  'nur hiddenFlag von r4-61': [(NEW_HF, OLD_HF)],
  'nur SVG-Prüfung von r4-61': [(NEW_SVG, OLD_SVG)],
  'zu streng: inert am HTML-Vorfahren zählt nicht': [(NEW_SIL, STRICT_SIL)],
  'zu mild: hidden am HTML-Vorfahren zählt in der SVG-Prüfung': [(NEW_SIL, LAX_SIL)],
  'zu mild: hidden an SVG zählt in hiddenFlag': [(NEW_HF, LAX_HF)],
}
for name, reps in variants.items():
  d = os.path.join(out, 'v'); shutil.rmtree(d, ignore_errors=True); shutil.copytree(src, d)
  p = os.path.join(d, 'tools', 'contract.js'); s = open(p, encoding='utf-8').read()
  for a, b in reps:
    assert s.count(a) == 1, (name, a[:40]); s = s.replace(a, b)
  open(p, 'w', encoding='utf-8').write(s)
  r = subprocess.run(['node', os.path.join(d, 'tools', 'selftest.mjs')], capture_output=True, text=True)
  lines = r.stdout.splitlines()
  print('## ' + name)
  for l in lines:
    if l.startswith('FAIL') or l.startswith('Selbsttest:'): print(l)
