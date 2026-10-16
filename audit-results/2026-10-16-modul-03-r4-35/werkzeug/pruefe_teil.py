"""Mechanische Prüfung einer Teil-CSV: Spalten, Pflichtfelder, Original im Quelltext (Text ohne Tags).
Aufruf: python3 -I pruefe_teil.py [--repo <pfad>] <teil.csv> [...]   (--repo an beliebiger Stelle)
Ohne --repo sucht das Skript das Repository ab seinem eigenen Ordner aufwärts (Ordner mit authoring/site.config.json),
sonst ab dem aktuellen Arbeitsverzeichnis.
Erwartet für teile/G1 bis G6: 24 Teilbefunde «nicht wörtlich gefunden», Liste in LIESMICH.md. Sie verbinden mehrere
Fundstellen in einem Feld oder umschreiben eine Vorlage; in BEFUNDE.csv sind sie je Fundstelle aufgeteilt.
Durchsucht: authoring/content/<seite>.html (Text und aria-label, alt, title), authoring/site.config.json,
authoring/js/interaktion.js und authoring/tools/search-index.mjs.
"""
import csv, sys, re, os, html
from collections import Counter
from bs4 import BeautifulSoup
COLS='vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;ersatzfassung;begruendung_ersatz;bedeutung_erhalten;evidenz;nutzerwirkung;akzeptanzkriterium;querverweis;freigabe_noetig;pruefbedarf'.split(';')
def find_repo(start):
    d=os.path.abspath(start)
    while True:
        if os.path.exists(os.path.join(d,'authoring','site.config.json')): return d
        n=os.path.dirname(d)
        if n==d: return None
        d=n
R=None
def norm(s): return re.sub(r'\s+',' ',html.unescape(s)).strip()
cache={}
def source_text(seite):
    if seite in cache: return cache[seite]
    parts=[]
    f=f'{R}/authoring/content/{seite}.html'
    if os.path.exists(f):
        s=BeautifulSoup(open(f,encoding='utf-8').read(),'html.parser')
        parts.append(norm(s.get_text('')))
        for el in s.find_all(True):
            for a in ('aria-label','alt','title'):
                if el.get(a): parts.append(norm(el[a]))
    for g in ('authoring/site.config.json','authoring/js/interaktion.js','authoring/tools/search-index.mjs'):
        parts.append(norm(open(f'{R}/{g}',encoding='utf-8').read().replace('\\"','"')))
    cache[seite]=' ‖ '.join(parts); return cache[seite]
def main(p):
    rows=list(csv.reader(open(p,encoding='utf-8'),delimiter=';'))
    head=rows[0]; ok=head==COLS
    print(os.path.basename(p),'Kopf korrekt' if ok else f'Kopf abweichend: {head}')
    pr=Counter(); miss=[]; nf=[]
    for r in rows[1:]:
        if len(r)!=len(head): print('  Spaltenzahl',r[0],len(r)); continue
        d=dict(zip(head,r)); pr[d['prioritaet']]+=1
        for k in ('fundstelle','original','problem','prioritaet','ersatzfassung'):
            if not d.get(k,'').strip(): miss.append((d['vorl_id'],k))
        o=norm(re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',d['original'])).strip('«»" …')
        frag=[x for x in re.split(r'\s*(?:…|\.\.\.)\s*',o) if len(x)>8]
        if frag and not all(norm(x) in source_text(d['seite']) for x in frag): nf.append(d['vorl_id'])
    print('  Befunde',len(rows)-1,dict(sorted(pr.items())))
    print('  fehlende Pflichtfelder',miss or 'keine')
    print('  Original nicht wörtlich gefunden',nf or 'keine')
if __name__=='__main__':
    import argparse
    ap=argparse.ArgumentParser(description='Mechanische Prüfung einer Teil-CSV von Audit 03.')
    ap.add_argument('--repo',help='Repository-Wurzel (Ordner mit authoring/site.config.json)')
    ap.add_argument('csv',nargs='+',help='Teil-CSV, z. B. teile/G1-befunde.csv')
    a=ap.parse_intermixed_args()
    if a.repo:
        R=os.path.abspath(a.repo)
    else:
        R=find_repo(os.path.dirname(os.path.abspath(__file__))) or find_repo(os.getcwd())
    if not R or not os.path.exists(os.path.join(R,'authoring','site.config.json')):
        sys.exit('Repository nicht gefunden: --repo <pfad> angeben')
    for p in a.csv: main(p)
