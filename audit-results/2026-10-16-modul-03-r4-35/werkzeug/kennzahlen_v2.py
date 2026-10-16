"""Kennzahlen je Seite für Audit 03 (nachrechenbar).
Aufruf: python3 -I kennzahlen_v2.py <textordner> [seite ...]  ·  je Abschnitt: python3 -I kennzahlen_v2.py --abschnitte <textordner> [seite ...]   (Textordner = Ausgabe von textfassung.py)
Gezählt werden Fliesstext-Blöcke: p, li, dd, td, blockquote – ohne Kicker, Figurtitel, Quellenverwendung, Quellenliste (Literaturangaben in .puk-longform__sources),
Nur-Screenreader-Texte und ohne Überschriften (h*, summary, dt, th).
Sätze: Trennung nach . ! ? (auch vor » oder ») gefolgt von Leerzeichen und Grossbuchstabe, «, Ziffer;
Abkürzungen (z. B., d. h., u. a., bzw., ca., Art., Abs., Nr., S., Dr., usw., etc., vgl., inkl., evtl., sog.) werden nicht getrennt.
Wörter: Folgen aus Buchstaben/Ziffern (Bindestrichwörter zählen als ein Wort).
"""
import sys, re, os, glob, statistics
ABBR = r'(?:z\. ?B|d\. ?h|u\. ?a|bzw|ca|Art|Abs|Nr|S|Dr|usw|etc|vgl|inkl|evtl|sog|Prof|lit|Ziff|Mio|al)\.'
SKIP = ('Kicker','Figurtitel','Quellenverwendung','Quellenliste','NUR SCREENREADER')
NEG = re.compile(r'\b(nicht|kein|keine|keinen|keinem|keiner|keines|nichts|nie|niemals|weder|niemand|ohne)\b', re.I)
def sentences(t):
    t = re.sub(ABBR, lambda m: m.group(0).replace('.', '§DOT§'), t)
    parts = re.split(r'(?<=[.!?])[»«"]?\s+(?=[A-ZÄÖÜ«0-9„])', t)
    return [p.replace('§DOT§', '.').strip() for p in parts if p.strip()]
def words(s): return re.findall(r"[A-Za-zÄÖÜäöüéèàâçß0-9]+(?:-[A-Za-zÄÖÜäöüéèàâçß0-9]+)*", s)
def page_stats(path, section=None):
    blocks=[]; cur=None
    for line in open(path, encoding='utf-8'):
        h=re.match(r'## \S+ › (\S+)', line)
        if h: cur=h.group(1); continue
        if section and cur!=section: continue
        m = re.match(r'- §\d+ \[([a-z0-9]+)([^\]]*)\] (.*)', line)
        if not m: continue
        tag, roles, text = m.group(1), m.group(2), m.group(3).strip()
        if tag not in ('p','li','dd','td','blockquote'): continue
        if any(s in roles for s in SKIP): continue
        blocks.append(text)
    sents=[s for b in blocks for s in sentences(b)]
    lens=[len(words(s)) for s in sents if words(s)]
    txt=' '.join(blocks); w=len(words(txt))
    if not lens: return None
    return dict(woerter=w, saetze=len(lens), mittel=round(statistics.mean(lens),1), median=statistics.median(lens),
        ueber25=round(100*sum(l>25 for l in lens)/len(lens),1), bis6=round(100*sum(l<=6 for l in lens)/len(lens),1),
        verneinung=round(100*sum(bool(NEG.search(s)) for s in sents)/len(sents),1),
        sie_muessen=len(re.findall(r'\bSie (?:müssen|sollten|dürfen)\b|\b(?:müssen|sollten|dürfen) Sie\b', txt)),
        koennen_pro100=round(100*len(re.findall(r'\b(?:kann|können|könnte|könnten)\b', txt))/max(w,1),1),
        gedankenstriche=txt.count(' – '), doppelpunkte=txt.count(':'),
        nicht_sondern=len(re.findall(r'\bnicht\b[^.!?]{0,80}\bsondern\b', txt)),
        laengster=max(lens))
def main():
    if len(sys.argv)>1 and sys.argv[1]=='--abschnitte':
        d=sys.argv[2]; pages=sys.argv[3:] or [os.path.basename(p)[:-3] for p in sorted(glob.glob(os.path.join(d,'*.md'))) if not os.path.basename(p).startswith('_')]
        cols=['woerter','saetze','mittel','ueber25','bis6','verneinung','laengster']
        print('seite;abschnitt;'+';'.join(cols))
        for p in pages:
            secs=[re.match(r'## \S+ › (\S+)',l).group(1) for l in open(os.path.join(d,p+'.md'),encoding='utf-8') if l.startswith('## ')]
            for s in secs:
                st=page_stats(os.path.join(d,p+'.md'),s)
                if st: print(p+';'+s+';'+';'.join(str(st[c]) for c in cols))
        return
    d=sys.argv[1]; pages=sys.argv[2:] or [os.path.basename(p)[:-3] for p in sorted(glob.glob(os.path.join(d,'*.md'))) if not os.path.basename(p).startswith('_')]
    cols=['woerter','saetze','mittel','median','ueber25','bis6','verneinung','sie_muessen','koennen_pro100','gedankenstriche','doppelpunkte','nicht_sondern','laengster']
    print('seite;'+';'.join(cols))
    for p in pages:
        s=page_stats(os.path.join(d,p+'.md'))
        if s: print(p+';'+';'.join(str(s[c]) for c in cols))
if __name__=='__main__': main()
