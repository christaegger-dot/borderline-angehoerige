"""
Verifikations-Audit Screenshots
Erstellt Full-Page-Screenshots der 5 Editorial-Seiten + 2 App-Modus-Kontrollseiten.
"""
import asyncio
from playwright.async_api import async_playwright
import os

BASE_URL = "http://localhost:3001"
OUT_DIR = "/home/ubuntu/borderline-angehoerige/_dev/screenshots"
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
