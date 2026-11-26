#!/usr/bin/env python3
"""Nachprüfung #832: Varianten von site/ ausserhalb des Repositorys. Aufruf: varianten.py <site-Kopie> <Variante>
v0 unverändert
v1 Sicherheitskarte nur bei den zwei bekannten Formaten 2000 px tiefer (Breite <= 375 px und Höhe <= 760 px)
v2 Sicherheitskarte überall 60 px tiefer
v3 Figur von «Verstehen» in geschlossenem <details> (wie Probe B im Nachweis von #832)
v4 Startseite wirft einen JS-Fehler, dessen Text wie eine bekannte Meldung beginnt (String statt Error)
v5 wie v4, aber als Error-Objekt
v6 Sicherheitskarte bei den zwei bekannten Formaten behoben (Liste 400 px höher gezogen)
"""
import sys, re, pathlib
site, v = pathlib.Path(sys.argv[1]), sys.argv[2]
def sub(name, pattern, repl, count=1):
    p = site / name; t = p.read_text(encoding='utf-8'); n, k = re.subn(pattern, repl, t, count=count)
    assert k == count, f'{name}: {k} statt {count} Ersetzungen'; p.write_text(n, encoding='utf-8')
UL = r'(<ol class="[^"]*bl-paths-cards[^>]*>)'
if v == 'v1': sub('index.html', UL, r'<style>@media (max-width:375px) and (max-height:760px){.n832-sp{height:2000px}}</style><div class="n832-sp"></div>\1')
elif v == 'v2': sub('index.html', UL, r'<div style="height:60px"></div>\1')
elif v == 'v3':
    sub('verstehen.html', r'(<figure\b)', r'<details><summary>Probe</summary>\1'); sub('verstehen.html', r'(</figure>)', r'\1</details>')
elif v == 'v4': sub('index.html', r'(</body>)', r'<script>throw "safety card starts in first screen 375x667 (vorgetaeuscht)"</script>\1')
elif v == 'v5': sub('index.html', r'(</body>)', r'<script>throw new Error("safety card starts in first screen 375x667 (vorgetaeuscht)")</script>\1')
elif v == 'v6': sub('index.html', UL, r'<style>@media (max-width:375px) and (max-height:760px){.bl-paths-cards{margin-top:-400px!important}}</style>\1')
elif v != 'v0': sys.exit('unbekannte Variante')
