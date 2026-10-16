"""Montagen zum Ansehen: je Figur 1280 Standard|Kontrast, 360 Standard|Kontrast|ohne Text, 32 px.
Usage: python3 -I montage.py <fotos> <out>"""
import sys, os
from PIL import Image, ImageDraw

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
IDS = ["v-vs-eisberg", "v-vs-anspannung", "v-vs-bewertungen", "v-bz-schleife", "v-bz-sichten", "v-ro-weg",
       "v-gr-dear", "v-be-kontakt", "v-ko-tassen", "v-ki-alltag", "v-sf-abend", "v-ge-forschung", "v-ge-trieb", "tabelle"]
MAXH = 1700


def side(files, gap=16):
    ims = [Image.open(os.path.join(SRC, f)).convert("RGB") for f in files if os.path.exists(os.path.join(SRC, f))]
    if not ims:
        return None
    w = sum(i.size[0] for i in ims) + gap * (len(ims) - 1)
    h = max(i.size[1] for i in ims)
    m = Image.new("RGB", (w, h), (255, 0, 255))
    x = 0
    for i in ims:
        m.paste(i, (x, 0))
        x += i.size[0] + gap
    return m


def save_chunks(m, name):
    n = 0
    for y in range(0, m.size[1], MAXH):
        m.crop((0, y, m.size[0], min(m.size[1], y + MAXH))).save(os.path.join(OUT, f"{name}-{n}.png"))
        n += 1
    return n


for vid in IDS:
    a = side([f"{vid}-1280-standard.png", f"{vid}-1280-kontrast.png"])
    if a:
        print(vid, "1280", save_chunks(a, f"{vid}-A1280"))
    b = side([f"{vid}-360-standard.png", f"{vid}-360-kontrast.png", f"{vid}-360-ohnetext.png"])
    if b:
        print(vid, "360", save_chunks(b, f"{vid}-B360"))
    c = side([f"{vid}-1280-ohnetext.png", f"{vid}-1280-zeichnung.png"])
    if c:
        print(vid, "ohne", save_chunks(c, f"{vid}-C-ohne"))
    d = side([f"{vid}-360-schrift32.png"])
    if d:
        # 32 px schmal: in Spalten nebeneinander legen
        h = d.size[1]
        cols = []
        for y in range(0, h, MAXH):
            cols.append(d.crop((0, y, d.size[0], min(h, y + MAXH))))
        for k in range(0, len(cols), 4):
            grp = cols[k:k + 4]
            w = sum(c.size[0] for c in grp) + 16 * (len(grp) - 1)
            mm = Image.new("RGB", (w, MAXH), (255, 0, 255))
            x = 0
            for c in grp:
                mm.paste(c, (x, 0)); x += c.size[0] + 16
            mm.save(os.path.join(OUT, f"{vid}-D360x32-{k // 4}.png"))
        print(vid, "32/360", (len(cols) + 3) // 4)
    e = side([f"{vid}-1280-schrift32.png"])
    if e:
        print(vid, "32/1280", save_chunks(e, f"{vid}-E1280x32"))
