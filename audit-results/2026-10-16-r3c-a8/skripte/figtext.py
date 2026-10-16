"""Sichtbarer Text je Figur (und Abschnitt anerkennen) alt gegen neu, als Zeilendiff.
Aufruf: python3 -I figtext.py <base>
<base>/old/<seite>.html und <base>/new/<seite>.html vorher anlegen, z. B.
  git show 02dba06:site/verstehen.html > <base>/old/verstehen.html   (r4-28; für den R2-K-Stand 5d5aed4)
  cp site/verstehen.html <base>/new/verstehen.html                    (03cb635)
Seiten: verstehen beziehungen rolle grenzen behandlung kommunizieren kinder selbstfuersorge genesung
(kinder fehlt in 5d5aed4)."""
import sys, difflib, re
from bs4 import BeautifulSoup

BASE = sys.argv[1]
FIGS = [
    ("verstehen", "v-vs-eisberg"), ("verstehen", "v-vs-anspannung"), ("verstehen", "v-vs-bewertungen"),
    ("beziehungen", "v-bz-schleife"), ("beziehungen", "v-bz-sichten"), ("rolle", "v-ro-weg"),
    ("grenzen", "v-gr-dear"), ("behandlung", "v-be-kontakt"), ("kommunizieren", "v-ko-tassen"),
    ("kinder", "v-ki-alltag"), ("selbstfuersorge", "v-sf-abend"), ("genesung", "v-ge-forschung"),
    ("genesung", "v-ge-trieb"),
]
BLOCKS = ["h2", "h3", "h4", "p", "li", "dt", "dd", "summary", "figcaption", "span", "th", "td", "caption", "div"]


def lines(el):
    out = []
    for b in el.find_all(True):
        if b.name == "svg" or b.find_parent("svg"):
            continue
        # leaf-ish blocks only: no block children with text
        if b.name in ("p", "li", "dt", "dd", "summary", "th", "td", "caption", "h2", "h3", "h4", "figcaption"):
            if b.find(["p", "li", "dt", "dd", "ul", "ol", "dl", "table"]):
                continue
            cls = " ".join(b.get("class", []))
            hidden = ""
            if "puk-sr" in cls or b.find_parent(class_="puk-sr"):
                hidden = "[SR] "
            if b.find_parent("details"):
                hidden += "[Vertiefung] "
            t = re.sub(r"\s+", " ", b.get_text(" ", strip=True))
            if t:
                out.append(f"{hidden}<{b.name}.{cls}> {t}")
    return out


def get(ver, page, vid):
    soup = BeautifulSoup(open(f"{BASE}/{ver}/{page}.html", encoding="utf-8").read(), "html.parser")
    f = soup.find("figure", attrs={"data-visual-id": vid})
    if f is None:
        return None
    return lines(f)


def table(ver):
    soup = BeautifulSoup(open(f"{BASE}/{ver}/kommunizieren.html", encoding="utf-8").read(), "html.parser")
    sec = soup.find(id="anerkennen")
    return lines(sec) if sec else None


for page, vid in FIGS:
    o = get("old", page, vid) or []
    n = get("new", page, vid) or []
    print("=" * 30, page, vid, f"old {len(o)} lines, new {len(n)} lines")
    for l in difflib.unified_diff(o, n, lineterm="", n=200):
        if l.startswith(("---", "+++", "@@")):
            continue
        print(l)

print("=" * 30, "kommunizieren #anerkennen (Abschnitt)")
o = table("old") or []
n = table("new") or []
for l in difflib.unified_diff(o, n, lineterm="", n=200):
    if l.startswith(("---", "+++", "@@")):
        continue
    print(l)
