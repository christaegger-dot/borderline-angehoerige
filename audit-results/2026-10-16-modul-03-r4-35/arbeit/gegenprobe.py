"""Gegenprobe Lesefluss: je Seite die zwei Abschnitte mit dem höchsten Anteil sehr kurzer Sätze (bis 6 Wörter)
und die zwei mit dem höchsten Verneinungsanteil (mindestens 3 Sätze), aus abschnitte-vorher.csv.
Gibt je Abschnitt die auslösenden Sätze aus und schreibt gegenprobe-auswahl.csv."""
import csv, re
S='/tmp/claude-0/-home-claude/5152fc6f-3c7f-59d2-afb8-de06005eb532/scratchpad/a03'
exec(open(f'{S}/werkzeug/kennzahlen_v2.py',encoding='utf-8').read().split('def page_stats')[0])
rows=[r for r in csv.DictReader(open(f'{S}/ergebnis/arbeit/abschnitte-vorher.csv',encoding='utf-8'),delimiter=';') if int(r['saetze'])>=3]
sel=[]
for p in sorted(set(r['seite'] for r in rows)):
    R=[r for r in rows if r['seite']==p]
    for k in ('bis6','verneinung'):
        for r in sorted(R,key=lambda r:-float(r[k]))[:2]:
            sel.append((p,r['abschnitt'],k,r[k],r['saetze']))
uniq=sorted(set((p,a) for p,a,*_ in sel))
befunde=list(csv.DictReader(open(f'{S}/ergebnis/2026-10-16-modul-03-r4-35/BEFUNDE.csv',encoding='utf-8'),delimiter=';'))
with open(f'{S}/ergebnis/arbeit/gegenprobe-auswahl.csv','w',encoding='utf-8',newline='') as fh:
    w=csv.writer(fh,delimiter=';'); w.writerow(['seite','abschnitt','kennzahl','wert','saetze','befunde_im_abschnitt'])
    for p,a,k,v,n in sel:
        ids=[b['id'] for b in befunde if b['fundstelle'].startswith(f'{p} › {a} ›')]
        w.writerow([p,a,k,v,n,' '.join(ids)])
print('Auswahlen',len(sel),'verschiedene Abschnitte',len(uniq))
import sys
if len(sys.argv)>1:
    for p,a in uniq:
        cur=None; out=[]
        for l in open(f'{S}/text-v2/{p}.md',encoding='utf-8'):
            h=re.match(r'## \S+ › (\S+)',l)
            if h: cur=h.group(1); continue
            if cur!=a: continue
            m=re.match(r'- §(\d+) \[([a-z0-9]+)([^\]]*)\] (.*)',l)
            if not m or m.group(2) not in ('p','li','dd','td','blockquote') or any(s in m.group(3) for s in SKIP): continue
            for s in sentences(m.group(4)):
                n=len(words(s)); neg=bool(NEG.search(s))
                if n<=6 or neg: out.append(f"§{m.group(1)}[{m.group(2)}{'K' if n<=6 else ''}{'V' if neg else ''}] {s[:110]}")
        ids=[b['id'] for b in befunde if b['fundstelle'].startswith(f'{p} › {a} ›')]
        print(f'\n### {p} › {a}  Befunde: {" ".join(ids) or "-"}'); print('\n'.join(out))
