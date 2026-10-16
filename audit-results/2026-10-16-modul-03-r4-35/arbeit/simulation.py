"""Simulation: alle Ersatzfassungen aus BEFUNDE.csv auf eine Kopie der Lesefassung anwenden (text-neu)
und die Kennzahlen je Seite und je Abschnitt vorher und nachher rechnen.

Aufruf, aus jedem Verzeichnis:
  python3 -I simulation.py --out AUSGABEORDNER [--text LESEFASSUNG] [--befunde BEFUNDE.csv]
                           [--werkzeug ORDNER] [--repo PFAD]

--out       Hier entstehen text-neu/, kennzahlen-nachher.csv, kennzahlen-vorher-neu-gerechnet.csv,
            abschnitte-vorher.csv, abschnitte-nachher.csv und simulation-log.json. Pflicht, damit die
            Ergebnisse des Laufs in arbeit/ nicht überschrieben werden.
--text      Ordner mit der Lesefassung v2 (<seite>.md und _seitenweit.md). Ohne Angabe erzeugt das Skript sie
            mit werkzeug/textfassung_v2.py aus dem Repository in AUSGABEORDNER/text-v2 und legt
            werkzeug/_seitenweit.md dazu.
--befunde   Standard: BEFUNDE.csv im Ordner über diesem Skript.
--werkzeug  Standard: werkzeug/ im Ordner über diesem Skript (kennzahlen_v2.py, textfassung_v2.py, _seitenweit.md).
--repo      Standard: erster übergeordneter Ordner mit authoring/site.config.json, ab diesem Skript, sonst ab dem
            Arbeitsverzeichnis. Nur nötig, wenn --text fehlt.

Die Fundstellen der Befunde gelten für den geprüften Stand ff5016b. Auf einem späteren Stand meldet das Skript
Originale, die es in der Lesefassung nicht mehr findet, unter «nicht angewendet».
Die Dateien in arbeit/ (kennzahlen-vergleich.csv, wortdelta-je-befund.csv) stammen aus dem Lauf vom 16.10.2026 und aus
der Nachbesserung am selben Tag.
"""
import argparse, csv, html, json, os, re, shutil, subprocess, sys
from pathlib import Path

HIER = Path(__file__).resolve().parent


def finde_repo(start):
    for d in [Path(start).resolve(), *Path(start).resolve().parents]:
        if (d / 'authoring' / 'site.config.json').exists():
            return d
    return None


ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
ap.add_argument('--out', required=True)
ap.add_argument('--text', default=None)
ap.add_argument('--befunde', default=str(HIER.parent / 'BEFUNDE.csv'))
ap.add_argument('--werkzeug', default=str(HIER.parent / 'werkzeug'))
ap.add_argument('--repo', default=None)
args = ap.parse_args()
OUT = Path(args.out).resolve(); OUT.mkdir(parents=True, exist_ok=True)
WZ = Path(args.werkzeug).resolve()
KZ = WZ / 'kennzahlen_v2.py'
if not KZ.exists():
    sys.exit(f'{KZ} fehlt; bitte --werkzeug angeben.')

if args.text:
    SRC = Path(args.text).resolve()
else:
    repo = Path(args.repo).resolve() if args.repo else (finde_repo(HIER) or finde_repo(os.getcwd()))
    if repo is None:
        sys.exit('Repository nicht gefunden; bitte --repo oder --text angeben.')
    SRC = OUT / 'text-v2'
    if SRC.exists(): shutil.rmtree(SRC)
    subprocess.run([sys.executable, '-I', str(WZ / 'textfassung_v2.py'), str(repo), str(SRC)], check=True, capture_output=True)
    shutil.copy(WZ / '_seitenweit.md', SRC / '_seitenweit.md')
DST = OUT / 'text-neu'


def norm(s): return re.sub(r'\s+', ' ', html.unescape(s)).strip()
def plain(s): return norm(re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', s))


if DST.exists(): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

rows = list(csv.DictReader(open(args.befunde, encoding='utf-8'), delimiter=';'))
log, fail = [], []
files = {}
def lines_of(p):
    if p not in files: files[p] = (DST / f'{p}.md').read_text(encoding='utf-8').split('\n')
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
        fail.append((r['id'], 'Original nicht in Lesefassungszeile', r['fundstelle'], o[:80], txt[:120]))

for p, L in files.items():
    (DST / f'{p}.md').write_text('\n'.join(x for x in L if x is not None), encoding='utf-8')

def run(a):
    return subprocess.run([sys.executable, '-I', str(KZ)] + a, capture_output=True, text=True, check=True).stdout
(OUT / 'kennzahlen-nachher.csv').write_text(run([str(DST)]), encoding='utf-8')
(OUT / 'kennzahlen-vorher-neu-gerechnet.csv').write_text(run([str(SRC)]), encoding='utf-8')
(OUT / 'abschnitte-vorher.csv').write_text(run(['--abschnitte', str(SRC)]), encoding='utf-8')
(OUT / 'abschnitte-nachher.csv').write_text(run(['--abschnitte', str(DST)]), encoding='utf-8')
json.dump({'log': log, 'fail': fail}, open(OUT / 'simulation-log.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('Lesefassung', SRC); print('Ausgabe', OUT)
print('angewendet', sum(1 for x in log if x[2].startswith('ok') or 'gestrichen' in x[2]), 'von', len(rows))
print('nicht angewendet', len(fail))
for f in fail: print('  ', f)
for x in log:
    if not (x[2].startswith('ok') or 'gestrichen' in x[2]): print('  ', x)
