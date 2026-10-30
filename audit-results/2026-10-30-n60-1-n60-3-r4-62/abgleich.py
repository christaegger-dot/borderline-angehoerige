# Nachprüfung r4-60: leitet aus der Chromium-Ausgabe (aria.mjs) die zu erwartenden Blocker ab und vergleicht sie
# mit den Gate-Ergebnissen (mutationen.mjs) zweier Stände (Kennung aus der Kopfzeile der Ausgaben).
# Erwartet: utility-nav, wenn der Zeilenlink verborgen ist oder nicht «Kurz und klar» heisst; nav ebenso für den
# Menülink; sender, wenn der Link der Absenderin verborgen ist; figure-alt, wenn das SVG weder verborgen noch benannt ist.
# Aufruf: python3 -I abgleich.py aria-ausgabe.txt mutationen-<alt>-ausgabe.txt mutationen-<neu>-ausgabe.txt
import sys, re
def parse(path):
    d = {}
    for line in open(path, encoding='utf-8'):
        if ' => ' in line and not line.startswith('#'):
            k, v = line.rstrip('\n').split(' => ', 1); d[k] = v.strip()
    return d
ax, g59, g60 = (parse(p) for p in sys.argv[1:4])
A, B = (open(p, encoding='utf-8').readline().split()[1] for p in sys.argv[2:4])
def expected(v):
    e = set(); parts = dict(p.split(': ', 1) for p in v.split(' | '))
    ok = lambda s: s.startswith('link «Kurz und klar»')
    if 'Zeilenlink' in parts and not ok(parts['Zeilenlink']): e.add('utility-nav')
    if 'Menülink' in parts and not ok(parts['Menülink']): e.add('nav')
    if 'Absenderin' in parts and parts['Absenderin'].startswith('VERBORGEN'): e.add('sender')
    if 'SVG' in parts and not parts['SVG'].startswith('VERBORGEN') and parts['SVG'].endswith('«»'): e.add('figure-alt')
    return e
got = lambda v: set() if v.startswith('keine') else {x.split(':', 1)[1] for x in v.split(' ; ')}
dev = {A: 0, B: 0}
for k, v in ax.items():
    e = expected(v); a, b = got(g59[k]), got(g60[k])
    m59, m60 = a != e, b != e
    dev[A] += m59; dev[B] += m60
    flag = (f'ABWEICHUNG {B}' if m60 else f'gleich {B}') + (f' / Abweichung {A}' if m59 else '')
    print(f"{k}\n   Chromium: {v}\n   erwartet: {', '.join(sorted(e)) or '—'} | {A}: {', '.join(sorted(a)) or '—'} | {B}: {', '.join(sorted(b)) or '—'} | {flag}")
print(f"# {len(ax)} Fälle · Abweichungen Gate ↔ Chromium: {A} {dev[A]}, {B} {dev[B]}")
