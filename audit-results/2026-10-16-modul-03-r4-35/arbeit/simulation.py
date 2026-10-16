"""Simulation: alle Ersatzfassungen aus BEFUNDE.csv auf eine Kopie von text-v2 anwenden (text-neu),
dann kennzahlen_v2.py je Seite und je Abschnitt neu rechnen und mit dem Ausgangsstand vergleichen.
Aufruf: python3 -I simulation.py
"""
import csv, re, os, shutil, subprocess, html, json
S = '/tmp/claude-0/-home-claude/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/a03'
A = f'{S}/ergebnis/arbeit'
SRC, DST = f'{S}/text-v2', f'{A}/text-neu'
KZ = f'{S}/werkzeug/kennzahlen_v2.py'

def norm(s): return re.sub(r'\s+', ' ', html.unescape(s)).strip()
def plain(s): return norm(re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', s))

if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

rows = list(csv.DictReader(open(f'{S}/ergebnis/2026-10-16-modul-03-r4-35/BEFUNDE.csv', encoding='utf-8'), delimiter=';'))
log, fail = [], []
files = {}
def lines_of(p):
    if p not in files: files[p] = open(f'{DST}/{p}.md', encoding='utf-8').read().split('\n')
    return files[p]

for r in rows:
    if r['seite'] == 'seitenweit':
        # Seitenbeschreibungen in _seitenweit.md mitführen (nicht Teil der Seitenkennzahlen)
        if 'description' in r['fundstelle']:
            L = lines_of('_seitenweit'); o = plain(r['original']); e = plain(r['ersatzfassung']); done = False
            for i, l in enumerate(L):
                if l is not None and o in norm(l): L[i] = norm(l).replace(o, e); done = True; break
            log.append((r['id'], 'seitenweit', 'ok' if done else 'nicht in _seitenweit.md'))
        else:
            log.append((r['id'], 'seitenweit', 'Code, nicht simuliert'))
        continue
    m = re.match(r'(\S+) › (\S+) › §(\d+)', r['fundstelle'])
    page, sec, n = m.group(1), m.group(2), m.group(3)
    L = lines_of(page)
    cur = None; idx = None
    for i, l in enumerate(L):
        if l is None: continue
        h = re.match(r'## \S+ › (\S+)', l)
        if h: cur = h.group(1); continue
        if cur == sec and re.match(rf'- §{n} \[', l): idx = i; break
    if idx is None: fail.append((r['id'], 'Zeile fehlt', r['fundstelle'])); continue
    l = L[idx]; mm = re.match(r'(- §\d+ \[[^\]]*\] )(.*)', l); pre, txt = mm.group(1), norm(mm.group(2))
    o, e = plain(r['original']), plain(r['ersatzfassung'])
    if e.startswith('[Absatz entfällt'):
        if o in txt: L[idx] = None; log.append((r['id'], page, 'Absatz gestrichen')); continue
    if e.startswith('Erster Absatz:'):
        a, b = [x.split(':', 1)[1].strip() for x in e.split(' | ')]
        if o in txt:
            L[idx] = pre + txt.replace(o, a); L.insert(idx + 1, re.sub(r'§(\d+)', r'§\1b', pre) + b)
            log.append((r['id'], page, 'ok (zwei Absätze)')); continue
    if o in txt:
        L[idx] = pre + txt.replace(o, e, 1); log.append((r['id'], page, 'ok'))
    else:
        # Lesefassung: Etikett vor Zitat («Tragfähiger · «…»»)
        fail.append((r['id'], 'Original nicht in Lesefassungszeile', r['fundstelle'], o[:80], txt[:120]))

for p, L in files.items():
    open(f'{DST}/{p}.md', 'w', encoding='utf-8').write('\n'.join(x for x in L if x is not None))

def run(args):
    return subprocess.run(['python3', '-I', KZ] + args, capture_output=True, text=True, check=True).stdout
open(f'{A}/kennzahlen-nachher.csv', 'w', encoding='utf-8').write(run([DST]))
open(f'{A}/kennzahlen-vorher-neu-gerechnet.csv', 'w', encoding='utf-8').write(run([SRC]))
open(f'{A}/abschnitte-nachher.csv', 'w', encoding='utf-8').write(run(['--abschnitte', DST]))
json.dump({'log': log, 'fail': fail}, open(f'{A}/simulation-log.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('angewendet', sum(1 for x in log if x[2].startswith('ok') or 'gestrichen' in x[2]), 'von', len(rows))
print('nicht angewendet', len(fail))
for f in fail: print('  ', f)
for x in log:
    if not (x[2].startswith('ok') or 'gestrichen' in x[2]): print('  ', x)
