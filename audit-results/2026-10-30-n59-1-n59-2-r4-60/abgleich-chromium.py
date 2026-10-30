import re,sys
aria=open(sys.argv[1],encoding='utf-8').read().split('\n'); gate=open(sys.argv[2],encoding='utf-8').read().split('\n')
g={}
for l in gate:
    m=re.match(r'^(P\d+\.\d+) .*? => (.*)$',l)
    if m: g[m.group(1)]=m.group(2)
cur=None; res={}
for l in aria:
    m=re.match(r'^(P\d+\.\d+) (.*)$',l)
    if m: cur=m.group(1); res[cur]={'name':m.group(2)}; continue
    if cur and 'CDP Zeilenlink' in l:
        for k in ['Zeilenlink','Menülink','Absenderin']:
            mm=re.search(r'CDP '+k+r': ([^|]*)',l); res[cur][k]=mm.group(1).strip() if mm else ''
bad=0; n=0
for p,r in res.items():
    if 'Zeilenlink' not in r or p not in g: continue
    n+=1
    exp=set()
    z=r['Zeilenlink']; me=r['Menülink']; a=r['Absenderin']
    if z.startswith('VERBORGEN') or (z.startswith('link') and z!='link «Kurz und klar»'): exp.add('utility-nav')
    if me.startswith('VERBORGEN') or (me.startswith('link') and me!='link «Kurz und klar»'): exp.add('nav')
    if a.startswith('VERBORGEN'): exp.add('sender')
    got=set(re.findall(r':(utility-nav|nav|sender)«',g[p]))
    if exp!=got:
        bad+=1; print(f"{p} {r['name']}\n   Chromium erwartet {sorted(exp)} | Gate {sorted(got)} | Z={z} M={me} A={a}")
print(f'Fälle mit Chromium-Messung: {n}, Abweichungen Gate↔Chromium: {bad}')
