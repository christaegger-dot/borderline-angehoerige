#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path

from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parents[2]
PUBLIC_INFOGRAFIKEN_DIR = REPO_ROOT / "client" / "public" / "infografiken"
TARGET_IDS = (
    "leuchtturm",
    "grenzen-spickzettel",
    "warnsignale",
    "schuld-verantwortung",
    "wenn-worte-treffen",
    "dear",
    "radikale-akzeptanz",
    "genesung-zahlen",
    "kinder",
)
A4_MM = (210.0, 297.0)
SIZE_TOLERANCE_MM = 3.0


def build_pdf_path(item_id: str) -> Path:
    return PUBLIC_INFOGRAFIKEN_DIR / f"manus-{item_id}-v1.pdf"


def points_to_mm(points: float) -> float:
    return round(points * 25.4 / 72.0, 1)


def is_a4_like(width_mm: float, height_mm: float) -> bool:
    return (
        abs(width_mm - A4_MM[0]) <= SIZE_TOLERANCE_MM
        and abs(height_mm - A4_MM[1]) <= SIZE_TOLERANCE_MM
    )


def analyze_pdf(path: Path) -> dict[str, object]:
    reader = PdfReader(str(path))
    first_page = reader.pages[0]
    width_mm = points_to_mm(float(first_page.mediabox.width))
    height_mm = points_to_mm(float(first_page.mediabox.height))
    text_lengths: list[int] = []

    for page in reader.pages:
        try:
            text = (page.extract_text() or "").strip()
        except Exception:
            text = ""
        text_lengths.append(len(text))

    metadata = reader.metadata or {}
    title = metadata.get("/Title")

    return {
        "path": str(path.relative_to(REPO_ROOT)),
        "pages": len(reader.pages),
        "sizeMm": [width_mm, height_mm],
        "a4Like": is_a4_like(width_mm, height_mm),
        "titleMeta": title,
        "textCharsTotal": sum(text_lengths),
        "textCharsByPage": text_lengths,
    }


def main() -> None:
    report: dict[str, object] = {
        "scope": list(TARGET_IDS),
        "files": [],
        "summary": {},
    }

    files: list[dict[str, object]] = []
    for item_id in TARGET_IDS:
        path = build_pdf_path(item_id)
        if not path.exists():
            raise FileNotFoundError(f"Missing canonical PDF: {path}")

        analysis = analyze_pdf(path)
        analysis["id"] = item_id
        files.append(analysis)

    report["files"] = files
    report["summary"] = {
        "total": len(files),
        "withTextLayer": sum(1 for item in files if item["textCharsTotal"] > 0),
        "withTitleMeta": sum(1 for item in files if item["titleMeta"]),
        "a4Like": sum(1 for item in files if item["a4Like"]),
    }

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
