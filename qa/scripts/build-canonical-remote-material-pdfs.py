#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import urllib.request
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


REPO_ROOT = Path(__file__).resolve().parents[2]
PUBLIC_INFOGRAFIKEN_DIR = REPO_ROOT / "client" / "public" / "infografiken"
DEFAULT_TARGET_IDS = (
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
TEXT_EXPORT_SCRIPT = """
import { handoutTextVersions } from "./client/src/content/handoutTextVersionContent.ts";

const targetIds = new Set(%TARGET_IDS%);
const items = handoutTextVersions
  .filter(item => targetIds.has(item.id))
  .map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    topicLabel: item.topicLabel,
    kind: item.kind,
    previewImageUrl: item.previewImageUrl,
    kicker: item.kicker,
    summary: item.summary,
    intro: item.intro,
    sections: item.sections,
    sourceLine: item.sourceLine,
    standLine: item.standLine,
  }));

console.log(JSON.stringify(items, null, 2));
"""


def build_preview_path(item_id: str) -> Path:
    return PUBLIC_INFOGRAFIKEN_DIR / f"manus-{item_id}-v1.webp"


def build_pdf_path(item_id: str) -> Path:
    return PUBLIC_INFOGRAFIKEN_DIR / f"manus-{item_id}-v1.pdf"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build local canonical WebP/PDF asset pairs for handout ids."
    )
    parser.add_argument(
        "ids",
        nargs="*",
        help="Handout ids to build. Defaults to the original remote-material set.",
    )
    return parser.parse_args()


def resolve_target_ids(cli_ids: list[str]) -> tuple[str, ...]:
    if not cli_ids:
        return DEFAULT_TARGET_IDS

    ordered_unique: list[str] = []
    for item_id in cli_ids:
        if item_id not in ordered_unique:
            ordered_unique.append(item_id)
    return tuple(ordered_unique)


def load_target_items(target_ids: tuple[str, ...]) -> list[dict[str, object]]:
    script = TEXT_EXPORT_SCRIPT.replace("%TARGET_IDS%", json.dumps(list(target_ids)))
    result = subprocess.run(
        ["pnpm", "tsx", "-e", script],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    items = json.loads(result.stdout)
    if not isinstance(items, list):
        raise RuntimeError("Expected a JSON array from text version export.")
    return items


def fetch_binary(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "borderline-angehoerige canonical-pdf refresh"},
    )
    with urllib.request.urlopen(request) as response:
        return response.read()


def ensure_preview_image(source_url: str, target_path: Path) -> None:
    target_path.parent.mkdir(parents=True, exist_ok=True)

    if source_url.startswith("http://") or source_url.startswith("https://"):
        target_path.write_bytes(fetch_binary(source_url))
        return

    source_path = REPO_ROOT / "client" / "public" / source_url.lstrip("/")
    if source_path.resolve() == target_path.resolve():
        if not target_path.exists():
            raise FileNotFoundError(
                f"Preview image is expected at {target_path}, but the file is missing."
            )
        return

    shutil.copyfile(source_path, target_path)


def build_styles():
    base = getSampleStyleSheet()
    return {
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#5c6574"),
        ),
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textTransform=None,
            textColor=colors.HexColor("#6b4c5f"),
            alignment=TA_CENTER,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=25,
            textColor=colors.HexColor("#1f2430"),
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=11.5,
            leading=16,
            textColor=colors.HexColor("#2d3748"),
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#273142"),
            spaceAfter=8,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#1f2430"),
            spaceBefore=12,
            spaceAfter=6,
        ),
        "cardTitle": ParagraphStyle(
            "CardTitle",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=14,
            textColor=colors.HexColor("#1f2430"),
            spaceAfter=2,
        ),
        "calloutTitle": ParagraphStyle(
            "CalloutTitle",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=14,
            textColor=colors.HexColor("#5a3e51"),
            spaceAfter=2,
        ),
        "calloutBody": ParagraphStyle(
            "CalloutBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#2d3748"),
        ),
        "footnote": ParagraphStyle(
            "Footnote",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#667085"),
            spaceBefore=6,
        ),
    }


def scaled_preview(image_path: Path, max_width: float, max_height: float) -> Image:
    with PILImage.open(image_path) as image:
        width_px, height_px = image.size
    aspect = height_px / width_px if width_px else 1
    width = max_width
    height = width * aspect
    if height > max_height:
        height = max_height
        width = height / aspect if aspect else max_width
    preview = Image(str(image_path), width=width, height=height)
    preview.hAlign = "CENTER"
    return preview


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    safe = (
        text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br/>")
    )
    return Paragraph(safe, style)


def build_story(item: dict[str, object], preview_path: Path) -> list[object]:
    styles = build_styles()
    story: list[object] = []
    page_width, page_height = A4
    content_width = page_width - 2 * 18 * mm
    content_height = page_height - 2 * 18 * mm - 16 * mm

    story.append(
        paragraph(
            f"{item['topicLabel']} · {item['kind']} · Lokale kanonische PDF-Fassung",
            styles["eyebrow"],
        )
    )
    story.append(Spacer(1, 5 * mm))
    story.append(scaled_preview(preview_path, content_width, content_height))
    story.append(Spacer(1, 4 * mm))
    story.append(
        paragraph(
            "Die visuelle Vorschau bleibt auf Seite 1 erhalten. Die barrierearme Textversion folgt auf den nächsten Seiten.",
            styles["meta"],
        )
    )
    story.append(PageBreak())

    story.append(paragraph(str(item["title"]), styles["title"]))
    story.append(paragraph(str(item["summary"]), styles["summary"]))
    story.append(
        paragraph(
            f"{item['kicker']} · {item['topicLabel']} · {item['kind']}",
            styles["meta"],
        )
    )
    story.append(Spacer(1, 4 * mm))

    for intro in item["intro"]:
        story.append(paragraph(str(intro), styles["body"]))

    for section in item["sections"]:
        story.append(paragraph(str(section["title"]), styles["section"]))

        intro = section.get("intro")
        if intro:
            story.append(paragraph(str(intro), styles["body"]))

        cards = section.get("cards") or []
        for card in cards:
            story.append(paragraph(str(card["title"]), styles["cardTitle"]))
            story.append(paragraph(str(card["text"]), styles["body"]))

        bullets = section.get("bullets") or []
        if bullets:
            bullet_items = [
                ListItem(paragraph(str(bullet), styles["body"]), leftIndent=0)
                for bullet in bullets
            ]
            story.append(
                ListFlowable(
                    bullet_items,
                    bulletType="bullet",
                    start="circle",
                    bulletFontName="Helvetica",
                    bulletFontSize=8,
                    leftPadding=14,
                )
            )
            story.append(Spacer(1, 2 * mm))

        callout_title = section.get("calloutTitle")
        callout_text = section.get("calloutText")
        if callout_title or callout_text:
            if callout_title:
                story.append(paragraph(str(callout_title), styles["calloutTitle"]))
            if callout_text:
                story.append(paragraph(str(callout_text), styles["calloutBody"]))

    story.append(Spacer(1, 5 * mm))
    story.append(paragraph(str(item["sourceLine"]), styles["footnote"]))
    story.append(paragraph(str(item["standLine"]), styles["footnote"]))
    story.append(
        paragraph(
            "Lokale PDF-Fassung mit integrierter Textversion, Titel-Metadaten und A4-Ausgabe.",
            styles["footnote"],
        )
    )
    return story


def draw_page_chrome(canvas, _doc) -> None:
    canvas.setAuthor("borderline-angehoerige")
    canvas.setCreator("Codex canonical Manus PDF refresh")
    canvas.setProducer("ReportLab PDF Library (opensource)")
    canvas.setSubject("Lokale kanonische PDF-Fassung mit integrierter Textversion")
    canvas.setKeywords("Borderline, Angehoerige, Handout, A4, Textversion")

    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d9d3ca"))
    canvas.setLineWidth(0.4)
    canvas.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#667085"))
    canvas.drawString(18 * mm, 8 * mm, "borderline-angehoerige")
    canvas.drawRightString(A4[0] - 18 * mm, 8 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


def build_pdf(item: dict[str, object], preview_path: Path, pdf_path: Path) -> None:
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=str(item["title"]),
    )
    story = build_story(item, preview_path)

    def on_page(canvas, doc):
        canvas.setTitle(str(item["title"]))
        draw_page_chrome(canvas, doc)

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


def main() -> None:
    args = parse_args()
    target_ids = resolve_target_ids(args.ids)
    items = load_target_items(target_ids)
    by_id = {str(item["id"]): item for item in items}

    missing_ids = [item_id for item_id in target_ids if item_id not in by_id]
    if missing_ids:
        raise RuntimeError(f"Missing handout text versions for ids: {missing_ids}")

    for item_id in target_ids:
        item = by_id[item_id]
        preview_path = build_preview_path(item_id)
        pdf_path = build_pdf_path(item_id)
        ensure_preview_image(str(item["previewImageUrl"]), preview_path)
        build_pdf(item, preview_path, pdf_path)
        print(f"Generated {preview_path.relative_to(REPO_ROOT)}")
        print(f"Generated {pdf_path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
