"""
Verifikations-Audit Screenshots
Erstellt Full-Page-Screenshots der 5 Editorial-Seiten + 2 App-Modus-Kontrollseiten.

Konfiguration via Env-Vars (Defaults setzen lokale Erwartung):
  AUDIT_BASE_URL=http://localhost:4173 python3 _dev/take_screenshots.py
  AUDIT_OUT_DIR=/tmp/screenshots      python3 _dev/take_screenshots.py
"""
import asyncio
import os
from pathlib import Path

from playwright.async_api import async_playwright

BASE_URL = os.environ.get("AUDIT_BASE_URL", "http://127.0.0.1:4173")
OUT_DIR = os.environ.get(
    "AUDIT_OUT_DIR",
    str(Path(__file__).resolve().parent / "screenshots"),
)
os.makedirs(OUT_DIR, exist_ok=True)

PAGES = [
    ("home", "/"),
    ("verstehen", "/verstehen"),
    ("genesung", "/genesung"),
    ("kommunizieren", "/kommunizieren"),
    ("selbstfuersorge", "/selbstfuersorge"),
    ("soforthilfe", "/soforthilfe"),        # App-Modus Kontrollseite
    ("notfallkarte", "/notfallkarte"),      # App-Modus Kontrollseite
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})

        for name, path in PAGES:
            url = BASE_URL + path
            print(f"Screenshot: {name} ({url})")
            await page.goto(url, wait_until="networkidle", timeout=15000)
            await page.wait_for_timeout(1000)
            out = os.path.join(OUT_DIR, f"{name}.png")
            await page.screenshot(path=out, full_page=True)
            print(f"  → {out}")

        await browser.close()
    print("Alle Screenshots fertig.")

asyncio.run(main())
