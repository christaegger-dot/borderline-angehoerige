# Vergleicht live gegen site/ nach Parser-Normalisierung (Attribute sortiert, Netlify-Pretty-URL-Umschreibung von href zurückgeführt).
import sys,os,re
from html.parser import HTMLParser
site,live=sys.argv[1:3]
def norm_href(v):
    m=re.match(r"^/([a-z0-9-]*)(#.*)?$",v or '')
    if m:
        p=m.group(1) or 'index'; return p+'.html'+(m.group(2) or '')
    m=re.match(r"^/([a-z0-9-]+\.html)(#.*)?$",v or '')
    if m: return m.group(1)+(m.group(2) or '')
    return v
class P(HTMLParser):
    def __init__(s,fix): super().__init__(convert_charrefs=True); s.t=[]; s.fix=fix
    def handle_starttag(s,tag,a):
        a=[(k,norm_href(v) if (s.fix and k=='href') else v) for k,v in a]; s.t.append(('S',tag,tuple(sorted(a))))
    def handle_endtag(s,tag): s.t.append(('E',tag))
    def handle_data(s,d): s.t.append(('D',d))
def tok(path,fix):
    p=P(fix); p.feed(open(path,encoding='utf-8').read()); return p.t
same=0;diff=[]
for f in sorted(x for x in os.listdir(site) if x.endswith('.html')):
    a=tok(os.path.join(site,f),False); b=tok(os.path.join(live,f),True)
    a2=[(t[0],t[1],tuple((k,norm_href(v) if k=='href' else v) for k,v in t[2])) if t[0]=='S' else t for t in a]
    if a2==b: same+=1
    else:
        i=next(i for i,(x,y) in enumerate(zip(a2,b)) if x!=y) if any(x!=y for x,y in zip(a2,b)) else min(len(a2),len(b))
        diff.append((f,len(a2),len(b),a2[i:i+1],b[i:i+1]))
print('DOM gleich nach Normalisierung:',same,'abweichend:',len(diff))
for d in diff[:5]: print(d)
