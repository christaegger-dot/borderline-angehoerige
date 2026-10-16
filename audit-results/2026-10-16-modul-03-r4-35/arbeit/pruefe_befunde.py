"""Mechanische Endprüfung von BEFUNDE.csv (Logik von werkzeug/pruefe_teil.py, Spalten der Konsolidierung,
zusätzlich search-index.mjs, die Kürzel der Spalte `quelle` gegen QUELLEN.csv und die Struktur aller CSV im Ordner).

Aufruf, aus jedem Verzeichnis:
  python3 -I pruefe_befunde.py [BEFUNDE.csv] [--quellen QUELLEN.csv] [--repo PFAD]

Ohne Angaben prüft das Skript ../BEFUNDE.csv und ../QUELLEN.csv neben seinem eigenen Ordner. Das Repository sucht es
ab dem Ordner der BEFUNDE.csv, dann ab seinem eigenen Ordner und zuletzt ab dem Arbeitsverzeichnis aufwärts
(Ordner mit authoring/site.config.json); sonst gilt --repo.
Struktur: Jede CSV im Ordner der BEFUNDE.csv und darunter muss in jeder Zeile so viele Felder haben wie im Kopf;
gemischte Zeilenenden in einer Datei sind ein Fehler, Dateien mit LF statt CRLF werden als Hinweis genannt.
Am Ende steht «Fehler: keine» oder die Liste der Fehler; bei Fehlern endet das Skript mit Exit-Code 1.
Die Originale beziehen sich auf den geprüften Stand ff5016b. Auf einem späteren Stand meldet das Skript Originale,
die inzwischen umgesetzt oder geändert sind, als «nicht wörtlich gefunden».
"""
import argparse, csv, html, io, os, re, sys
from collections import Counter
from pathlib import Path
from bs4 import BeautifulSoup

HIER = Path(__file__).resolve().parent
COLS = ('id;vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;kritikalitaet;ersatzfassung;'
        'begruendung_ersatz;bedeutung_erhalten;gegenpruefung;muster;evidenz;pruefmethode;nutzerwirkung;akzeptanzkriterium;'
        'quelle;querverweis;freigabe_noetig;pruefbedarf;status;nachteststatus').split(';')
MARKER = ('Prüfbedarf fachlich', 'Prüfbedarf Recht')


def finde_repo(start):
    for d in [Path(start).resolve(), *Path(start).resolve().parents]:
        if (d / 'authoring' / 'site.config.json').exists():
            return d
    return None


ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
ap.add_argument('befunde', nargs='?', default=str(HIER.parent / 'BEFUNDE.csv'))
ap.add_argument('--quellen', default=None, help='QUELLEN.csv (Standard: neben BEFUNDE.csv)')
ap.add_argument('--repo', default=None)
args = ap.parse_args()
BEF = Path(args.befunde).resolve()
QUE = Path(args.quellen).resolve() if args.quellen else BEF.parent / 'QUELLEN.csv'
R = Path(args.repo).resolve() if args.repo else (finde_repo(BEF.parent) or finde_repo(HIER) or finde_repo(os.getcwd()))
if R is None:
    sys.exit('Repository nicht gefunden; bitte --repo angeben.')


def norm(s): return re.sub(r'\s+', ' ', html.unescape(s)).strip()


cache = {}
def src(seite):
    if seite in cache: return cache[seite]
    parts = []; f = R / 'authoring' / 'content' / f'{seite}.html'
    if f.exists():
        s = BeautifulSoup(f.read_text(encoding='utf-8'), 'html.parser'); parts.append(norm(s.get_text('')))
        for el in s.find_all(True):
            for a in ('aria-label', 'alt', 'title'):
                if el.get(a): parts.append(norm(el[a]))
    for g in ('authoring/site.config.json', 'authoring/js/interaktion.js', 'authoring/tools/search-index.mjs'):
        parts.append(norm((R / g).read_text(encoding='utf-8').replace('\\"', '"')))
    cache[seite] = ' ‖ '.join(parts); return cache[seite]


FEHLER = []
def fehler(name, wert):
    if wert: FEHLER.append(name)

print('Befunde', BEF); print('Repository', R)
rows = list(csv.reader(open(BEF, encoding='utf-8'), delimiter=';'))
print('Kopf korrekt' if rows[0] == COLS else 'Kopf abweichend'); fehler('Kopf', rows[0] != COLS)
d = [dict(zip(rows[0], r)) for r in rows[1:]]
print('Zeilen', len(d), 'Spaltenzahl ok' if all(len(r) == len(COLS) for r in rows) else 'Spaltenzahl FEHLER'); fehler('Spaltenzahl BEFUNDE.csv', not all(len(r) == len(COLS) for r in rows))
ids = [x['id'] for x in d]; print('IDs', ids[0], '…', ids[-1], 'lückenlos' if ids == [f'A03-{i:03d}' for i in range(39, 39 + len(d))] else 'LÜCKE'); fehler('IDs', ids != [f'A03-{i:03d}' for i in range(39, 39 + len(d))])
miss = [(x['id'], k) for x in d for k in COLS if k not in ('querverweis', 'pruefbedarf', 'muster') and not x[k].strip()]
print('leere Pflichtfelder', miss or 'keine'); fehler('leere Pflichtfelder', miss)
nf = []
for x in d:
    o = norm(re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', x['original'])).strip('«»" …')
    frag = [y for y in re.split(r'\s*(?:…|\.\.\.)\s*', o) if len(y) > 8]
    if frag and not all(norm(y) in src(x['seite']) for y in frag): nf.append(x['id'])
print('Original nicht wörtlich gefunden', nf or 'keine'); fehler('Original nicht gefunden', nf)
print('Priorität', dict(sorted(Counter(x['prioritaet'] for x in d).items())), 'Kritikalität', dict(Counter(x['kritikalitaet'] for x in d)))
print('status', set(x['status'] for x in d), 'nachtest', set(x['nachteststatus'] for x in d))
mehrfach = [k for k, v in Counter(x['fundstelle'] for x in d).items() if v > 1]
print('Fundstelle mehrfach', mehrfach or 'keine'); fehler('Fundstelle mehrfach', mehrfach)
gleich = [x['id'] for x in d if x['ersatzfassung'] == x['original']]
print('Ersatz == Original', gleich or 'keine'); fehler('Ersatz gleich Original', gleich)
zw = [x['id'] for x in d if 'zwang' in x['ersatzfassung'].lower() and 'zwang' not in x['original'].lower()]
print('zwang in Ersatz', zw or 'keine'); fehler('zwang in Ersatz', zw)
# Spalte quelle
if QUE.exists():
    qids = {q['quelle_id'] for q in csv.DictReader(open(QUE, encoding='utf-8'), delimiter=';')}
    unbek = [(x['id'], t) for x in d for t in (y.strip() for y in x['quelle'].split(';')) if t and t not in MARKER and t.split(' ')[0] not in qids]
    print('Kürzel in quelle nicht in QUELLEN.csv', unbek or 'keine'); fehler('unbekannte Kürzel in quelle', unbek)
else:
    print('QUELLEN.csv nicht gefunden:', QUE); fehler('QUELLEN.csv fehlt', True)
pb_ohne = [x['id'] for x in d if x['pruefbedarf'].startswith('fachlich') and 'Prüfbedarf fachlich' not in x['quelle']]
pb_ohne += [x['id'] for x in d if x['pruefbedarf'].startswith('Recht') and 'Prüfbedarf Recht' not in x['quelle']]
print('Prüfbedarf ohne Vermerk in quelle', pb_ohne or 'keine'); fehler('Prüfbedarf ohne Vermerk in quelle', pb_ohne)
print('Prüfbedarf', dict(Counter(x['pruefbedarf'].split(':')[0] for x in d if x['pruefbedarf'])))
ohne_b = [x['id'] for x in d if x['pruefbedarf'] and 'bestätig' not in x['akzeptanzkriterium'].lower()]
print('Prüfbedarf ohne Bestätigung im Akzeptanzkriterium', ohne_b or 'keine'); fehler('Prüfbedarf ohne Bestätigung im Akzeptanzkriterium', ohne_b)
bed = [x['id'] for x in d if 'prüfbedarf' in x['bedeutung_erhalten'].lower() and not x['pruefbedarf'].strip()]
print('«Prüfbedarf» in bedeutung_erhalten ohne Eintrag in pruefbedarf', bed or 'keine'); fehler('Prüfbedarf in bedeutung_erhalten ohne pruefbedarf', bed)
# Struktur aller CSV im Ordner
ordner = BEF.parent; lf = []
for f in sorted(ordner.rglob('*.csv')):
    roh = f.read_bytes(); name = f.relative_to(ordner)
    crlf = roh.count(b'\r\n'); nl = roh.count(b'\n')
    if crlf and crlf != nl: fehler(f'gemischte Zeilenenden {name}', True)
    elif not crlf: lf.append(str(name))
    z = list(csv.reader(io.StringIO(roh.decode('utf-8'), newline=''), delimiter=';'))
    falsch = [i + 1 for i, r in enumerate(z) if len(r) != len(z[0])]
    print('CSV', name, len(z), 'Zeilen,', len(z[0]), 'Felder', 'ok' if not falsch else f'FEHLER in Zeile {falsch[:5]}')
    fehler(f'Spaltenzahl {name}', falsch)
print('Zeilenenden: CRLF ausser', lf or 'keine')
print('Fehler:', FEHLER or 'keine')
sys.exit(1 if FEHLER else 0)
