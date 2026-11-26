#!/usr/bin/env python3
"""Nachprüfung PR #829: Varianten von site/ für Gegenproben zu N813-5.
Aufruf: varianten.py <site-quelle> <zielordner>  (schreibt <ziel>/s0..s5/site)"""
import re, shutil, sys, pathlib
src, dst = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
FIG = re.compile(r'<figure\b.*?</figure>', re.S)
def edit(name, page, fn):
    d = dst / name / 'site'
    if d.exists(): shutil.rmtree(d)
    shutil.copytree(src, d)
    if page:
        f = d / (page + '.html'); t = f.read_text(encoding='utf-8'); m = FIG.search(t)
        assert m, page
        f.write_text(t[:m.start()] + fn(m.group(0)) + t[m.end():], encoding='utf-8')
edit('s0', None, None)                                                                   # unverändert
edit('s1', 'verstehen', lambda g: '<details><summary>Probe</summary>' + g + '</details>')  # Figur in geschlossenem <details>
edit('s2', 'kinder', lambda g: '')                                                       # Seite ohne figure
edit('s3', 'genesung', lambda g: g.replace('<figure', '<figure style="display:none"', 1)) # erste versteckt, zweite sichtbar
edit('s4', 'verstehen', lambda g: '<details open><summary>Probe</summary>' + g + '</details>') # Figur in offenem <details>
edit('s5', 'behandlung', lambda g: g.replace('<figure', '<figure hidden', 1))            # einzige Figur mit hidden
print('ok')
