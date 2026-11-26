import sys,re
f,kind,tool=sys.argv[1],sys.argv[2],sys.argv[3]
h=open(f,encoding='utf8').read()
m=re.search(r'<figure class="puk-vis-figure" data-visual-id="v-vs-anspannung"',h);a=m.start();b=h.index('</figure>',a)+9
fig=h[a:b]
dummy='<figure class="n813-dummy"><p>Platzhalterfigur</p></figure>'
if kind=='P0':pass
elif kind=='P1-wrap-offen':h=h[:a]+'<details open><summary>Figur</summary>'+fig+'</details>'+h[b:]
elif kind=='P2-wrap-zu':h=h[:a]+'<details><summary>Figur</summary>'+fig+'</details>'+h[b:]
elif kind=='P3-wrap-zu-dummy':
    h=h[:a]+dummy+'<details><summary>Figur</summary>'+fig+'</details>'+h[b:]
elif kind=='P4-details-offen-in-figur':
    i=fig.index('<ol class="puk-vis-build__steps bl-kurve__liste bl-phase-actions');j=fig.index('</ol>',i)+5
    fig2=fig[:i]+'<details open><summary>Phasen</summary>'+fig[i:j]+'</details>'+fig[j:]
    h=h[:a]+fig2+h[b:]
elif kind=='P5-wrap-offen-schutz-weg':
    h=h[:a]+'<details open><summary>Figur</summary>'+fig+'</details>'+h[b:]
    h=h.replace('</head>','<style>.bl-fig-schutz{display:none}</style></head>',1)
elif kind=='P6-hidden-div-dummy':
    h=h[:a]+dummy+'<div hidden>'+fig+'</div>'+h[b:]
elif kind=='P7-wrap-offen-plus700':
    h=h[:a]+'<details open><summary>Figur</summary>'+fig+'</details>'+h[b:]
    h=h.replace('</head>','<style>.bl-fig-schutz{padding-bottom:700px}</style></head>',1)
else: raise SystemExit('unbekannt '+kind)
open(f,'w',encoding='utf8').write(h)
