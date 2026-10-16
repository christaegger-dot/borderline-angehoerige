"""Dump visible text of a section (by id) of a built page, in reading order, marking SR-only,
details, figure and say-components. Usage: python3 -I sectext.py <file> <sectionId>"""
import sys, re
from bs4 import BeautifulSoup, NavigableString

path, sid = sys.argv[1], sys.argv[2]
soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")
sec = soup.find(id=sid)
LEAF = ("p", "li", "dt", "dd", "summary", "th", "td", "caption", "h2", "h3", "h4", "figcaption")
for b in sec.find_all(LEAF):
    if b.find_parent("svg"):
        continue
    if b.find(["p", "li", "dt", "dd", "ul", "ol", "dl", "table", "h3"]):
        continue
    tags = []
    if "puk-sr" in " ".join(b.get("class", [])) or b.find_parent(class_="puk-sr"):
        tags.append("SR")
    if b.find_parent("details"):
        tags.append("DET")
    if b.find_parent("figure"):
        tags.append("FIG")
    if b.find_parent(class_="puk-say"):
        tags.append("SAY")
    if b.find_parent(attrs={"data-responsibility-inline": True}) or b.has_attr("data-responsibility-inline"):
        tags.append("VERWEIS")
    t = re.sub(r"\s+", " ", b.get_text(" ", strip=True))
    cls = ".".join(b.get("class", []))
    print(f"[{','.join(tags)}] {b.name}{'.'+cls if cls else ''}: {t}")
