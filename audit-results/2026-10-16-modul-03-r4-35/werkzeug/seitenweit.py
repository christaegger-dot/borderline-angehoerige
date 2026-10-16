"""Lesefassung der seitenweiten Texte für Audit 03 (`_seitenweit.md`).
Aufruf: python3 -I seitenweit.py <repo> <ausgabe.md> [--stand <text>] [--mit-suchdaten]
Liest authoring/site.config.json (allgemeine Textfelder; je Seite title, navLabel, description, primaryTask),
Kopf und Fusszeile der gebauten Seiten site/index.html und site/behandlung.html sowie Zeichenketten aus
authoring/js/interaktion.js, die nach Text aussehen (Auswahl nach Muster, im Quelltext nachprüfen).
authoring/tools/search-index.mjs ist nicht enthalten; die Konsolidierung hat es direkt im Quelltext gelesen.
Nachbau des Erzeugers, den die bauende Sitzung am 16.10.2026 für den Lauf 2026-10-16-modul-03-r4-35 benutzt hat.

Ohne --mit-suchdaten lässt das Skript Zeichenketten aus interaktion.js weg, die nur aus Kleinbuchstaben und
Leerzeichen bestehen. Das sind interne Suchdaten (Stoppwörter, Suchwendungen), keine Texte, die jemand sieht oder
hört; das Audit hat sie nicht bewertet. Mit --mit-suchdaten und --stand "ff5016b, r4-35" entsteht auf ff5016b
die Datei des Laufs Byte für Byte.
--stand setzt die Angabe in der ersten Zeile; ohne Angabe gilt `git rev-parse --short HEAD` im Repository.
"""
import json, re, sys, os, subprocess
from bs4 import BeautifulSoup

def main(repo, out_path, stand, mit_suchdaten):
    out = [f'# Seitenweite Texte (Stand {stand})\n',
           'Quellen: authoring/site.config.json, gebaute Kopf- und Fusszeile in site/index.html und site/behandlung.html, Bedientexte in authoring/js/interaktion.js.\n']
    c = json.load(open(os.path.join(repo, 'authoring/site.config.json'), encoding='utf-8'))
    out.append('\n## site.config.json · allgemeine Textfelder\n')
    def walk(o, path):
        if isinstance(o, dict):
            for k, v in o.items():
                if k in ('pages', '$comment', 'releaseApproval', 'visualPlan'):
                    continue
                walk(v, path + [k])
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, path + [str(i)])
        elif isinstance(o, str) and re.search(r'[a-zäöü]{3,} [a-zäöü]{2,}', o) and not o.startswith('http'):
            out.append(f'- `{".".join(path)}`: «{o}»')
    walk(c, [])
    out.append('\n## site.config.json · je Seite: Titel, Navigation, Beschreibung, Einstiege\n')
    for p in c['pages']:
        for k in ('title', 'navLabel', 'description', 'primaryTask', 'teaser', 'summary', 'shortTitle'):
            if p.get(k):
                out.append(f'- `{p["id"]}.{k}`: «{p[k]}»')
    for f in ('site/index.html', 'site/behandlung.html'):
        s = BeautifulSoup(open(os.path.join(repo, f), encoding='utf-8').read(), 'html.parser')
        for part, sel in (('Kopf', 'header'), ('Fusszeile', 'footer')):
            el = s.find(sel)
            if el:
                out.append(f'\n## {f} · {part}\n')
                for b in el.find_all(['p', 'a', 'li', 'h2', 'h3', 'span', 'button', 'label']):
                    t = re.sub(r'\s+', ' ', b.get_text(' ')).strip()
                    if t and not b.find(['p', 'li']):
                        out.append(f'- [{b.name}] {t}')
                for b in el.find_all(True):
                    for a in ('aria-label', 'title', 'alt'):
                        if b.get(a):
                            out.append(f'  - {a} an <{b.name}>: «{b[a]}»')
    js = open(os.path.join(repo, 'authoring/js/interaktion.js'), encoding='utf-8').read()
    strs = sorted(set(m for m in re.findall(r"'([^'\n]{4,})'|\"([^\"\n]{4,})\"|`([^`\n]{4,})`", js) for m in m if m))
    ui = [s for s in strs if re.search(r'[A-ZÄÖÜa-zäöü]{3,} [a-zäöü]{2,}', s) and not re.search(r'[{}<>=;]|^\.|\\b|\(\?', s)]
    if not mit_suchdaten:
        ui = [s for s in ui if not re.fullmatch(r'[a-zäöüß ]+', s)]
    out.append('\n## authoring/js/interaktion.js · sichtbare oder vorgelesene Texte (Auswahl nach Muster, bitte im Quelltext nachprüfen)\n')
    for s in ui:
        out.append(f'- «{s}»')
    open(out_path, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    print(len(out), 'Zeilen')

if __name__ == '__main__':
    args = sys.argv[1:]
    mit = '--mit-suchdaten' in args
    args = [a for a in args if a != '--mit-suchdaten']
    stand = None
    if '--stand' in args:
        i = args.index('--stand')
        if i + 1 >= len(args):
            sys.exit('--stand braucht einen Wert')
        stand = args[i + 1]
        del args[i:i + 2]
    if len(args) != 2:
        sys.exit('Aufruf: python3 -I seitenweit.py <repo> <ausgabe.md> [--stand <text>] [--mit-suchdaten]')
    if stand is None:
        r = subprocess.run(['git', '-C', args[0], 'rev-parse', '--short', 'HEAD'], capture_output=True, text=True)
        stand = r.stdout.strip() or 'unbekannt'
    main(args[0], args[1], stand, mit)
