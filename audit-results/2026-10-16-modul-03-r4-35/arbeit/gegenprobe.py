"""Gegenprobe Lesefluss: je Seite die zwei Abschnitte mit dem höchsten Anteil sehr kurzer Sätze (bis 6 Wörter)
und die zwei mit dem höchsten Verneinungsanteil (mindestens 3 Sätze). Schreibt gegenprobe-auswahl.csv und gibt mit
--saetze je Abschnitt die auslösenden Sätze aus.

Aufruf, aus jedem Verzeichnis:
  python3 -I gegenprobe.py --out AUSGABEORDNER [--text LESEFASSUNG] [--befunde BEFUNDE.csv]
                           [--werkzeug ORDNER] [--repo PFAD] [--saetze]

--out       Hier entstehen gegenprobe-auswahl.csv und abschnitte-vorher.csv. Pflicht, damit die Ergebnisse des
            Laufs in arbeit/ nicht überschrieben werden.
--text      Ordner mit der Lesefassung v2. Ohne Angabe erzeugt das Skript sie mit werkzeug/textfassung_v2.py aus
            dem Repository in AUSGABEORDNER/text-v2.
--befunde   Standard: BEFUNDE.csv im Ordner über diesem Skript (nur für die Spalte befunde_im_abschnitt).
--werkzeug  Standard: werkzeug/ im Ordner über diesem Skript.
--repo      Standard: erster übergeordneter Ordner mit authoring/site.config.json, ab diesem Skript, sonst ab dem
            Arbeitsverzeichnis. Nur nötig, wenn --text fehlt.

Die Kennzahlen je Abschnitt rechnet das Skript selbst mit kennzahlen_v2.py --abschnitte.
arbeit/gegenprobe-ergebnis.csv enthält die Einordnung jedes ausgewählten Abschnitts durch die Konsolidierung im Lauf
vom 16.10.2026; diese Einordnung ist gelesen, nicht berechnet, und entsteht nicht mit diesem Skript.
"""
import argparse, csv, io, os, re, shutil, subprocess, sys
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
ap.add_argument('--saetze', action='store_true', help='auslösende Sätze je Abschnitt ausgeben')
args = ap.parse_args()
OUT = Path(args.out).resolve(); OUT.mkdir(parents=True, exist_ok=True)
WZ = Path(args.werkzeug).resolve()
KZ = WZ / 'kennzahlen_v2.py'
if not KZ.exists():
    sys.exit(f'{KZ} fehlt; bitte --werkzeug angeben.')
if args.text:
    TXT = Path(args.text).resolve()
else:
    repo = Path(args.repo).resolve() if args.repo else (finde_repo(HIER) or finde_repo(os.getcwd()))
    if repo is None:
        sys.exit('Repository nicht gefunden; bitte --repo oder --text angeben.')
    TXT = OUT / 'text-v2'
    if TXT.exists(): shutil.rmtree(TXT)
    subprocess.run([sys.executable, '-I', str(WZ / 'textfassung_v2.py'), str(repo), str(TXT)], check=True, capture_output=True)

# Satz- und Wortzählung, Verneinungsmuster und auszulassende Rollen aus kennzahlen_v2.py
exec(KZ.read_text(encoding='utf-8').split('def page_stats')[0])

ab = subprocess.run([sys.executable, '-I', str(KZ), '--abschnitte', str(TXT)], capture_output=True, text=True, check=True).stdout
(OUT / 'abschnitte-vorher.csv').write_text(ab, encoding='utf-8')
rows = [r for r in csv.DictReader(io.StringIO(ab), delimiter=';') if int(r['saetze']) >= 3]
sel = []
for p in sorted(set(r['seite'] for r in rows)):
    Rp = [r for r in rows if r['seite'] == p]
    for k in ('bis6', 'verneinung'):
        for r in sorted(Rp, key=lambda r: -float(r[k]))[:2]:
            sel.append((p, r['abschnitt'], k, r[k], r['saetze']))
uniq = sorted(set((p, a) for p, a, *_ in sel))
befunde = list(csv.DictReader(open(args.befunde, encoding='utf-8'), delimiter=';')) if Path(args.befunde).exists() else []
with open(OUT / 'gegenprobe-auswahl.csv', 'w', encoding='utf-8', newline='') as fh:
    w = csv.writer(fh, delimiter=';'); w.writerow(['seite', 'abschnitt', 'kennzahl', 'wert', 'saetze', 'befunde_im_abschnitt'])
    for p, a, k, v, n in sel:
        ids = [b['id'] for b in befunde if b['fundstelle'].startswith(f'{p} › {a} ›')]
        w.writerow([p, a, k, v, n, ' '.join(ids)])
print('Lesefassung', TXT); print('Ausgabe', OUT)
print('Auswahlen', len(sel), 'verschiedene Abschnitte', len(uniq))
if args.saetze:
    for p, a in uniq:
        cur = None; out = []
        for l in open(TXT / f'{p}.md', encoding='utf-8'):
            h = re.match(r'## \S+ › (\S+)', l)
            if h: cur = h.group(1); continue
            if cur != a: continue
            m = re.match(r'- §(\d+) \[([a-z0-9]+)([^\]]*)\] (.*)', l)
            if not m or m.group(2) not in ('p', 'li', 'dd', 'td', 'blockquote') or any(s in m.group(3) for s in SKIP): continue
            for s in sentences(m.group(4)):
                n = len(words(s)); neg = bool(NEG.search(s))
                if n <= 6 or neg: out.append(f"§{m.group(1)}[{m.group(2)}{'K' if n <= 6 else ''}{'V' if neg else ''}] {s[:110]}")
        ids = [b['id'] for b in befunde if b['fundstelle'].startswith(f'{p} › {a} ›')]
        print(f'\n### {p} › {a}  Befunde: {" ".join(ids) or "-"}'); print('\n'.join(out))
