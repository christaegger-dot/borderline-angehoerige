"""Mechanische Prüfung einer Teil-CSV: Spalten, Pflichtfelder, Original im Quelltext (Text ohne Tags)."""
import csv, sys, re, os, html
from collections import Counter
from bs4 import BeautifulSoup
COLS='vorl_id;seite;fundstelle;element;original;problem;kriterien;prioritaet;ersatzfassung;begruendung_ersatz;bedeutung_erhalten;evidenz;nutzerwirkung;akzeptanzkriterium;querverweis;freigabe_noetig;pruefbedarf'.split(';')
R='/home/claude/borderline-angehoerige'
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
    for g in ('authoring/site.config.json','authoring/js/interaktion.js'):
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
    for p in sys.argv[1:]: main(p)
