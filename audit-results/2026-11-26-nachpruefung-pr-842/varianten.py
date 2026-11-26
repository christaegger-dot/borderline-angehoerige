#!/usr/bin/env python3
"""Nachprüfung #842: Varianten einer Kopie von site/. Aufruf: varianten.py <site-Kopie> <Variante>
Verschiebungen wirken nur auf die erste Sicherheitskarte und nur bei Breite <= 375 px und Höhe <= 760 px
(also 375 x 667 und 360 x 740, nicht 375 x 812, 390 x 844, 1024 x 768), über position:relative; top, damit der Wert exakt ist.
o0       unverändert
o8       +8 px   (erwartet 810 / 871: an der Grenze, bekannt)
o9       +9 px   (erwartet 811 / 872: über der Grenze, neu)
o8.4     +8,4 px (Rohwerte 801,77 / 863,16 -> 810 / 872: nur 360 x 740 neu)
o2000    +2000 px (Probe v1 der Nachprüfung #832)
fix      -400 px (Karte im ersten Bildschirm, beide Einträge nicht mehr aufgetreten)
nur667   +9 px nur bei 375 x 667 (min-width 370 px), 360 x 740 unverändert
v4       Startseite wirft einen String mit genau dem Text der heutigen Meldung (Probe v4 der Nachprüfung #832, verschärft)
v5       dasselbe als Error-Objekt (Probe v5)
v4alt    String wie in der Nachprüfung #832 («(vorgetaeuscht)»)
v4o2000  +2000 px und ein geworfener String mit genau dem Text der dann gemessenen Meldung 375x667 (top 2802px)
"""
import sys, re, pathlib
site, v = pathlib.Path(sys.argv[1]), sys.argv[2]
def sub(name, pattern, repl):
    p = site / name; t = p.read_text(encoding='utf-8'); n, k = re.subn(pattern, repl, t, count=1)
    assert k == 1, f'{name}: {k} Ersetzungen'; p.write_text(n, encoding='utf-8')
def shift(px, mq='(max-width:375px) and (max-height:760px)'):
    sub('index.html', r'(</head>)', '<style>@media %s{.bl-paths-cards li:first-child{position:relative;top:%spx}}</style>\\1' % (mq, px))
def throw(js):
    sub('index.html', r'(</body>)', '<script>%s</script>\\1' % js)
K = 'safety card starts in first screen 375x667 (top %spx)'
if v == 'o0': pass
elif v == 'o8': shift(8)
elif v == 'o9': shift(9)
elif v == 'o8.4': shift(8.4)
elif v == 'o2000': shift(2000)
elif v == 'fix': shift(-400)
elif v == 'nur667': shift(9, '(min-width:370px) and (max-width:375px) and (max-height:760px)')
elif v == 'v4': throw('throw "%s"' % (K % 802))
elif v == 'v5': throw('throw new Error("%s")' % (K % 802))
elif v == 'v4alt': throw('throw "safety card starts in first screen 375x667 (vorgetaeuscht)"')
elif v == 'v4o2000': shift(2000); throw('throw "%s"' % (K % 2802))
else: sys.exit('unbekannte Variante')
