# Rückprobe r4-67 (aus der Nachprüfung r4-67, PR #802): ersetzt inSvg in Kopien von authoring/ (ausserhalb des Repositorys) und lässt den Selbsttest laufen.
# Aufruf: python3 rueckprobe-n67.py <Arbeitsbaum r4-67> <Arbeitsordner>
import os, shutil, subprocess, sys
wt, tmp = sys.argv[1], sys.argv[2]
NEW = "const inSvg = x => { for (let p = x; p; p = p.parent) { if (p.tag === 'svg') return true; if (p.tag === 'foreignobject' && p !== x) return false; } return false; };"
V = [
  ('r4-67 unverändert', NEW),
  ('inSvg von r4-65', "const inSvg = x => x.tag === 'svg' || !!up(x, y => y.tag === 'svg');"),
  ('Variante: foreignObject selbst gilt als HTML (ohne p !== x)', "const inSvg = x => { for (let p = x; p; p = p.parent) { if (p.tag === 'svg') return true; if (p.tag === 'foreignobject') return false; } return false; };"),
  ('Variante: jedes foreignObject darüber macht HTML, auch über verschachteltem svg', "const inSvg = x => { const a = q => { for (let p = x; p; p = p.parent) if (q(p)) return true; return false; }; return a(p => p.tag === 'svg') && !a(p => p !== x && p.tag === 'foreignobject'); };"),
]
for i, (name, line) in enumerate(V):
    d = os.path.join(tmp, f'rp{i}'); shutil.rmtree(d, ignore_errors=True)
    shutil.copytree(os.path.join(wt, 'authoring'), os.path.join(d, 'authoring'))
    p = os.path.join(d, 'authoring', 'tools', 'contract.js'); s = open(p, encoding='utf-8').read()
    assert s.count(NEW) == 1; open(p, 'w', encoding='utf-8').write(s.replace(NEW, line))
    out = subprocess.run(['node', 'authoring/tools/selftest.mjs'], cwd=d, capture_output=True, text=True).stdout.splitlines()
    print(f'## {name}'); [print(l) for l in out if l.startswith('FAIL') or l.startswith('Selbsttest:')]
