"""Lesefassung je Seite mit stabilen Fundstellen.
Aufruf: python3 -I textfassung.py <repo> <ausgabeordner>
Liest authoring/content/<seite>.html (kanonische Quelle) und schreibt <seite>.md.
Fundstelle: <seite> › <abschnitt-id> › §n (fortlaufend je Abschnitt, Blöcke in Dokumentreihenfolge).
Markiert Figuren (data-visual-id), Rollen der Blöcke (Kernaussage, Kurztext, Beispiel, nur Screenreader, Vertiefung).
"""
import sys, os, re, glob
from bs4 import BeautifulSoup, NavigableString, Tag

BLOCK = {'h1','h2','h3','h4','h5','p','li','dt','dd','th','td','summary','caption','blockquote'}
ROLE = [
  ('puk-sr','NUR SCREENREADER'), ('puk-vis-kern','Kernaussage Figur'), ('puk-vis-short','Kurztext Figur'),
  ('puk-vis-ansatz','Ansatzpunkt Figur'), ('puk-vis-label','Figurtitel'), ('puk-longform__kicker','Kicker'),
  ('puk-longform__intro','Einleitung'), ('puk-say__item--hilfreich','Beispiel (hilfreich)'), ('puk-say__item','Beispiel'),
  ('puk-web-eyebrow','Kicker'), ('puk-longform__source-use','Quellenverwendung'), ('puk-longform__sources','Quellenliste'),
]
def norm(s): return re.sub(r'\s+',' ',s).strip()
def role(el):
    out=[]
    for e in [el]+list(el.parents):
        if not isinstance(e,Tag): continue
        cls=' '.join(e.get('class',[]))
        for c,r in ROLE:
            if re.search(r'(^| )'+re.escape(c)+r'( |$)',cls) and r not in out: out.append(r)
        if e.name=='details' and 'Vertiefung (aufklappbar)' not in out: out.append('Vertiefung (aufklappbar)')
        if e.name=='figure' and e.get('data-visual-id'): out.append('Figur '+e['data-visual-id'])
        if e.name=='table' and 'Tabelle' not in out: out.append('Tabelle')
    return out
def has_block_desc(el): return any(isinstance(d,Tag) and d.name in BLOCK for d in el.descendants)
def direct_text(el):
    parts=[]
    for c in el.children:
        if isinstance(c,NavigableString): parts.append(str(c))
        elif isinstance(c,Tag) and c.name not in BLOCK and not has_block_desc(c): parts.append(c.get_text(''))
    return norm(''.join(parts))

def main(repo,out):
    os.makedirs(out,exist_ok=True)
    for f in sorted(glob.glob(os.path.join(repo,'authoring/content/*.html'))):
        page=os.path.basename(f)[:-5]
        soup=BeautifulSoup(open(f,encoding='utf-8').read(),'html.parser')
        for sp in soup.find_all(True):
            cls=' '.join(sp.get('class',[]))
            if re.search(r'__(label|key|n)( |$)',cls) and sp.name!='p':
                sp.append(' · ')
            if sp.name=='br': sp.replace_with(' ')
        lines=[f'# {page}\n',f'Quelle: authoring/content/{page}.html. Fundstelle: {page} › Abschnitt › §n.\n']
        secs=soup.find_all('section')
        for si,sec in enumerate(secs):
            sid=sec.get('id') or ('kopf' if si==0 else f'abschnitt-{si+1}')
            lines.append(f'\n## {page} › {sid}\n')
            n=0
            for el in sec.find_all(True):
                if el.name not in BLOCK: continue
                if el.find_parent('section') is not sec: continue
                if has_block_desc(el):
                    t=direct_text(el)
                    if not t: continue
                else:
                    t=norm(el.get_text(''))
                    if not t: continue
                n+=1
                lab=el.find(class_='puk-say__label')
                r=role(el)
                tag=el.name
                lines.append(f'- §{n} [{tag}{"; "+"; ".join(r) if r else ""}] {t}')
            attrs=[]
            for el in sec.find_all(True):
                for a in ('aria-label','alt','title'):
                    if el.get(a): attrs.append(f'  - {a} an <{el.name}>: «{norm(el[a])}»')
            if attrs: lines.append('\n  Attribute mit Text:'); lines+=attrs
        open(os.path.join(out,page+'.md'),'w',encoding='utf-8').write('\n'.join(lines)+'\n')
        print(page, sum(1 for l in lines if l.startswith('- §')),'Blöcke')
if __name__=='__main__': main(sys.argv[1],sys.argv[2])
