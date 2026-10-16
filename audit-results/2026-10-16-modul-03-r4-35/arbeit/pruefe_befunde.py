"""Mechanische Endprüfung BEFUNDE.csv (Logik von werkzeug/pruefe_teil.py, Spalten der Konsolidierung, zusätzlich search-index.mjs)."""
import csv, sys, re, os, html
from collections import Counter
from bs4 import BeautifulSoup
R='/home/claude/borderline-angehoerige'
COLS='id;vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;kritikalitaet;ersatzfassung;begruendung_ersatz;bedeutung_erhalten;gegenpruefung;muster;evidenz;pruefmethode;nutzerwirkung;akzeptanzkriterium;querverweis;freigabe_noetig;pruefbedarf;status;nachteststatus'.split(';')
def norm(s): return re.sub(r'\s+',' ',html.unescape(s)).strip()
cache={}
def src(seite):
    if seite in cache: return cache[seite]
    parts=[]; f=f'{R}/authoring/content/{seite}.html'
    if os.path.exists(f):
        s=BeautifulSoup(open(f,encoding='utf-8').read(),'html.parser'); parts.append(norm(s.get_text('')))
        for el in s.find_all(True):
            for a in ('aria-label','alt','title'):
                if el.get(a): parts.append(norm(el[a]))
    for g in ('authoring/site.config.json','authoring/js/interaktion.js','authoring/tools/search-index.mjs'):
        parts.append(norm(open(f'{R}/{g}',encoding='utf-8').read().replace('\\"','"')))
    cache[seite]=' ‖ '.join(parts); return cache[seite]
rows=list(csv.reader(open(sys.argv[1],encoding='utf-8'),delimiter=';'))
print('Kopf korrekt' if rows[0]==COLS else 'Kopf abweichend')
d=[dict(zip(rows[0],r)) for r in rows[1:]]
print('Zeilen',len(d),'Spaltenzahl ok' if all(len(r)==len(COLS) for r in rows) else 'Spaltenzahl FEHLER')
ids=[x['id'] for x in d]; print('IDs', ids[0], '…', ids[-1], 'lückenlos' if ids==[f'A03-{i:03d}' for i in range(39,39+len(d))] else 'LÜCKE')
miss=[(x['id'],k) for x in d for k in COLS if k not in ('querverweis','pruefbedarf','muster') and not x[k].strip()]
print('leere Pflichtfelder', miss or 'keine')
nf=[]
for x in d:
    o=norm(re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',x['original'])).strip('«»" …')
    frag=[y for y in re.split(r'\s*(?:…|\.\.\.)\s*',o) if len(y)>8]
    if frag and not all(norm(y) in src(x['seite']) for y in frag): nf.append(x['id'])
print('Original nicht wörtlich gefunden', nf or 'keine')
print('Priorität', dict(sorted(Counter(x['prioritaet'] for x in d).items())), 'Kritikalität', dict(Counter(x['kritikalitaet'] for x in d)))
print('status', set(x['status'] for x in d), 'nachtest', set(x['nachteststatus'] for x in d))
print('Fundstelle mehrfach', [k for k,v in Counter(x['fundstelle'] for x in d).items() if v>1] or 'keine')
print('Ersatz == Original', [x['id'] for x in d if x['ersatzfassung']==x['original']] or 'keine')
print('zwang in Ersatz', [x['id'] for x in d if 'zwang' in x['ersatzfassung'].lower() and 'zwang' not in x['original'].lower()] or 'keine')
