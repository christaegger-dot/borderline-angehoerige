# Eigene Mutationen N811: mutate.py <verstehen.html> <probe> <layouttest.cjs>
import sys,re
f,kind,tool=sys.argv[1],sys.argv[2],sys.argv[3]
h=open(f,encoding='utf8').read()
OL='<ol class="puk-vis-build__steps bl-kurve__liste bl-phase-actions">'
C='.bl-phase-actions>li'
def css(s):
    global h; h=h.replace('</head>','<style>'+s+'</style></head>',1)
def card(n):
    a=h.index(OL); i=a
    for _ in range(n): i=h.index('<li>',i)+1
    i-=1; j=h.index('</li>',i)+5; return i,j
def edit_card(n,fn):
    global h; i,j=card(n); h=h[:i]+fn(h[i:j])+h[j:]
CSS={
 'M1-vierte-display-none':C+':nth-child(4){display:none}',
 'M2-handlung-weg':C+' p{display:none}',
 'M3-unten-3000':'.bl-fig-schutz{padding-bottom:3000px}',
 'M4-schutz-weg':'.bl-fig-schutz{display:none}',
 'M6-karten-300':C+':nth-child(4){padding-bottom:300px}',
 'M7-umgekehrt-300':'.puk-vis-figure .bl-phase-actions{display:flex;flex-direction:column-reverse}'+C+':nth-child(1){padding-bottom:300px}',
 'M9-vierte-visibility':C+':nth-child(4){visibility:hidden}',
 'M12-zweite-opacity':C+':nth-child(2){opacity:0}',
 'M13-unten-200-erlaubt':'.bl-fig-schutz{padding-bottom:200px}',
 'E2-ol-inert':None,'E3-ol-aria-hidden':None,
 'E4-vierte-cv-hidden':C+':nth-child(4){content-visibility:hidden}',
 'E5-cv-auto-alle':C+'{content-visibility:auto}',
 'E6-vierte-sr-only':C+':nth-child(4){position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important}',
 'E7-vierte-clip-path':C+':nth-child(4){clip-path:inset(100%)}',
 'E8-ol-abgeschnitten':'.bl-phase-actions{max-height:400px;overflow:hidden}',
 'E9-text-transparent':C+' *{color:transparent!important}',
 'E10-vierte-ausserhalb':C+':nth-child(4){transform:translateX(-200vw)}',
 'E14-schutz-visuell-unten':'.bl-fig-schutz{position:relative;top:420px}',
 'E15-schutz-opacity':'.bl-fig-schutz{opacity:0}',
 'E18-li-display-contents':'.puk-vis-figure '+C+'{display:contents!important}',
 'E19-vierte-top-300':C+':nth-child(4){position:relative;top:300px}',
 'E20-kombi-M1-M3':C+':nth-child(4){display:none}.bl-fig-schutz{padding-bottom:3000px}',
 'E21-vierte-scale':C+':nth-child(4){transform:scale(.02);transform-origin:top left}',
 'E22-figur-2400':'.bl-fig-schutz{padding-bottom:408px}',
 'E23-figur-2401':'.bl-fig-schutz{padding-bottom:409px}',
 'E24-ende-1800':C+':nth-child(4){padding-bottom:217px}',
 'E26-vierte-opacity-001':C+':nth-child(4){opacity:.01}',
 'E25-ende-1801':C+':nth-child(4){padding-bottom:218px}',
}
if kind=='P0':pass
elif kind=='M0-grenze1500':
    t=open(tool,encoding='utf8').read()
    t2=t.replace('r.curvePhases.end>1800','r.curvePhases.end>1500').replace('c.end>1800','c.end>1500').replace('B2C_PHASE_END_MAX=1800','B2C_PHASE_END_MAX=1500')
    assert t2!=t; open(tool,'w',encoding='utf8').write(t2)
elif kind=='M5-in-details':
    a=h.index(OL);b=h.index('</ol>',a)+5;h=h[:a]+'<details class="puk-vis-more"><summary>Phasen</summary>'+h[a:b]+'</details>'+h[b:]
elif kind=='M8-fuenf':
    a=h.index(OL);b=h.index('</ol>',a);h=h[:b]+'<li><div><h3>Fünf</h3><p>x</p></div></li>'+h[b:]
elif kind=='M10-schutz-nach-details':
    m=re.search(r'<p class="bl-fig-schutz">.*?</p>',h);blk=m.group(0);h=h[:m.start()]+h[m.end():];i=h.index('<figcaption class="puk-vis-caption">',m.start());h=h[:i]+blk+h[i:]
elif kind=='M11-titel-weg':
    a=h.index(OL);h=h[:a]+h[a:].replace('<h3>Es wird eng.</h3>','',1)
elif kind=='E1-vierte-hidden-attr':edit_card(4,lambda s:s.replace('<li>','<li hidden>',1))
elif kind=='E1b-vierte-until-found':edit_card(4,lambda s:s.replace('<li>','<li hidden="until-found">',1))
elif kind=='E2-ol-inert':h=h.replace(OL,OL[:-1]+' inert>',1)
elif kind=='E3-ol-aria-hidden':h=h.replace(OL,OL[:-1]+' aria-hidden="true">',1)
elif kind=='E11-vierte-nur-leerzeichen':edit_card(4,lambda s:re.sub(r'<h3>.*?</h3>','<h3> &nbsp; </h3>',re.sub(r'<p>.*?</p>','<p>\n  \t</p>',s)))
elif kind=='E12-vierte-nullbreite':edit_card(4,lambda s:re.sub(r'<h3>.*?</h3>','<h3>​</h3>',re.sub(r'<p>.*?</p>','<p>​</p>',s)))
elif kind=='E13-vierte-p-in-details-zu':edit_card(4,lambda s:re.sub(r'(<p>.*?</p>)',r'<details><summary>Was hilft</summary>\1</details>',s))
elif kind=='E13b-vierte-p-in-details-offen':edit_card(4,lambda s:re.sub(r'(<p>.*?</p>)',r'<details open><summary>Was hilft</summary>\1</details>',s))
elif kind=='E16-schutz-leer':h=re.sub(r'<p class="bl-fig-schutz">.*?</p>','<p class="bl-fig-schutz">  </p>',h)
elif kind=='E17-figur-in-details-offen':
    m=re.search(r'<figure class="puk-vis-figure" data-visual-id="v-vs-anspannung"',h);a=m.start();b=h.index('</figure>',a)+9
    h=h[:a]+'<details open><summary>Figur</summary>'+h[a:b]+'</details>'+h[b:]
elif kind in CSS and CSS[kind]: css(CSS[kind])
else: raise SystemExit('unbekannt '+kind)
open(f,'w',encoding='utf8').write(h)
