# Nachtrag zur Nachprüfung r4-60: leitet aus der Chromium-Ausgabe (aria.mjs) die zu erwartenden Blocker ab und vergleicht sie
# mit den Gate-Ergebnissen (mutationen.mjs) von r4-59 und r4-60.
# Erwartet: utility-nav, wenn der Zeilenlink verborgen ist oder nicht «Kurz und klar» heisst; nav ebenso für den
# Menülink; sender, wenn der Link der Absenderin verborgen ist; figure-alt, wenn das SVG weder verborgen noch benannt ist.
# Aufruf: python3 -I abgleich.py aria-ausgabe.txt mutationen-r4-59-ausgabe.txt mutationen-r4-60-ausgabe.txt
import sys, re
def parse(path):
    d = {}
    for line in open(path, encoding='utf-8'):
        if ' => ' in line and not line.startswith('#'):
            k, v = line.rstrip('\n').split(' => ', 1); d[k] = v.strip()
    return d
ax, g59, g60 = (parse(p) for p in sys.argv[1:4])
def expected(v):
    e = set(); parts = dict(p.split(': ', 1) for p in v.split(' | '))
    ok = lambda s: s.startswith('link «Kurz und klar»')
    if 'Zeilenlink' in parts and not ok(parts['Zeilenlink']): e.add('utility-nav')
    if 'Menülink' in parts and not ok(parts['Menülink']): e.add('nav')
    if 'Absenderin' in parts and parts['Absenderin'].startswith('VERBORGEN'): e.add('sender')
    if 'SVG' in parts and not parts['SVG'].startswith('VERBORGEN') and parts['SVG'].endswith('«»'): e.add('figure-alt')
    return e
got = lambda v: set() if v.startswith('keine') else {x.split(':', 1)[1] for x in v.split(' ; ')}
dev = {'r4-59': 0, 'r4-60': 0}
for k, v in ax.items():
    e = expected(v); a, b = got(g59[k]), got(g60[k])
    m59, m60 = a != e, b != e
    dev['r4-59'] += m59; dev['r4-60'] += m60
    flag = ('ABWEICHUNG r4-60' if m60 else 'gleich r4-60') + (' / Abweichung r4-59' if m59 else '')
    print(f"{k}\n   Chromium: {v}\n   erwartet: {', '.join(sorted(e)) or '—'} | r4-59: {', '.join(sorted(a)) or '—'} | r4-60: {', '.join(sorted(b)) or '—'} | {flag}")
print(f"# {len(ax)} Fälle · Abweichungen Gate ↔ Chromium: r4-59 {dev['r4-59']}, r4-60 {dev['r4-60']}")
