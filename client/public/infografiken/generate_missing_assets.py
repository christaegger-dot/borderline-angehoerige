"""
Erzeugt fehlende Thumbnails (600px WebP) und PDFs (A4, einseitig) für 9 neue Infografik-Versionen.
Quelle: jeweils das vorhandene Vollbild-WebP im gleichen Verzeichnis.
"""

from PIL import Image
from pathlib import Path

stems = [
    "eisberg-der-eisberg-v8",
    "pendel-das-bewertungs-pendel-v16",
    "validierung-die-validierungs-treppe-v10",
    "deeskalation-der-deeskalations-pfad-v11",
    "ampel-das-ampel-system-v4",
    "alarm-der-alarm-modus-v4",
    "fortschritt-das-fortschritt-paradox-v5",
    "grenzen-die-4-arten-von-grenzen-v5",
    "sauerstoff-die-sauerstoffmaske-v5",
]

A4 = (1240, 1754)  # A4 hochkant @ 150 dpi
thumbs = Path("extras/thumbnails")
thumbs.mkdir(parents=True, exist_ok=True)

for s in stems:
    src = Path(f"{s}.webp")
    assert src.exists(), f"Vollbild fehlt: {src}"
    im = Image.open(src).convert("RGB")

    # Thumbnail: Breite 600, AR-treu
    w, h = im.size
    th = im.resize((600, round(600 * h / w)), Image.LANCZOS)
    th.save(thumbs / f"{s}.webp", "WEBP", quality=90, method=6)
    print(f"  Thumbnail: extras/thumbnails/{s}.webp ({600}x{round(600 * h / w)})")

    # PDF: A4 hochkant, contain, zentriert, weiss
    page = Image.new("RGB", A4, "white")
    scale = min(A4[0] / w, A4[1] / h)
    fitted = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    page.paste(fitted, ((A4[0] - fitted.width) // 2, (A4[1] - fitted.height) // 2))
    page.save(f"{s}.pdf", "PDF", resolution=150.0)
    pdf_kb = Path(f"{s}.pdf").stat().st_size // 1024
    print(f"  PDF:       {s}.pdf ({pdf_kb} KB)")

print(f"\nfertig: {len(stems)} Thumbnails + {len(stems)} PDFs")
