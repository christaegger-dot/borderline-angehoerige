#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import tempfile
import urllib.request
from pathlib import Path

try:
    from pypdf import PdfReader
except ModuleNotFoundError as exc:  # pragma: no cover - user-facing guard
    raise SystemExit(
        "Missing dependency 'pypdf'. Run this script with the bundled Codex "
        "workspace Python or install pypdf in your current environment."
    ) from exc


REPO_ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = REPO_ROOT / "client" / "src" / "content"
MATERIALS_FILE = CONTENT_DIR / "materialien.ts"
LOCAL_PDFS = [
    REPO_ROOT / "client" / "public" / "Notfallkarte-Zuerich-Psychische-Krise.pdf",
    REPO_ROOT / "client" / "public" / "notfallplan-krise-v03.pdf",
]
REMOTE_PDF_RE = re.compile(r'https://files\.manuscdn\.com[^"\']+\.pdf')


def decode_ts_string(value: str) -> str:
    if "\\" in value:
        return bytes(value, "utf-8").decode("unicode_escape")
    return value


def analyze_pdf(path: Path) -> dict[str, object]:
    reader = PdfReader(str(path))
    page_text_lengths: list[int] = []
    sample_parts: list[str] = []

    for page in reader.pages:
        try:
            text = (page.extract_text() or "").strip()
        except Exception:
            text = ""

        page_text_lengths.append(len(text))
        if text and len(sample_parts) < 2:
            sample_parts.append(" ".join(text.split())[:240])

    return {
        "path": str(path),
        "pages": len(reader.pages),
        "bytes": path.stat().st_size,
        "text_chars_total": sum(page_text_lengths),
        "text_chars_by_page": page_text_lengths,
        "sample": sample_parts,
    }


def parse_material_entries() -> list[dict[str, object]]:
    text = MATERIALS_FILE.read_text()
    entries = re.findall(r"\{\n(.*?)\n  \},", text, re.S)
    parsed: list[dict[str, object]] = []

    for body in entries:
        fields: dict[str, object] = {}
        for key, value in re.findall(
            r'\s*(\w+):\s*("(?:[^"\\]|\\.)*"|true|false),?', body
        ):
            if value in {"true", "false"}:
                fields[key] = value == "true"
            else:
                fields[key] = decode_ts_string(value[1:-1])
        parsed.append(fields)

    return parsed


def collect_remote_pdfs() -> list[str]:
    seen: list[str] = []
    for path in sorted(CONTENT_DIR.glob("*.ts")):
        text = path.read_text()
        for url in REMOTE_PDF_RE.findall(text):
            if url not in seen:
                seen.append(url)
    return seen


def build_title_map() -> dict[str, str]:
    title_map: dict[str, str] = {}
    for path in sorted(CONTENT_DIR.glob("*.ts")):
        text = path.read_text()

        for pattern in (
            r'title:\s*"([^"]+)"[\s\S]*?downloadUrl:\s*"(https://files\.manuscdn\.com[^"]+\.pdf)"',
            r'title:\s*"([^"]+)"[\s\S]*?pdfUrl:\s*"(https://files\.manuscdn\.com[^"]+\.pdf)"',
            r'title:\s*"([^"]+)"[\s\S]*?pdf:\s*"(https://files\.manuscdn\.com[^"]+\.pdf)"',
        ):
            for title, url in re.findall(pattern, text):
                title_map.setdefault(url, decode_ts_string(title))

    return title_map


def main() -> None:
    materials = parse_material_entries()
    remote_urls = collect_remote_pdfs()
    title_map = build_title_map()

    core_remote = [
        item
        for item in materials
        if item.get("priority") == "core"
        and isinstance(item.get("title"), str)
        and isinstance(item.get("id"), str)
        and (
            str(item.get("pdfUrl", "")).startswith("https://")
            or str(item.get("downloadUrl", "")).startswith("https://")
        )
    ]

    report: dict[str, object] = {
        "repo_root": str(REPO_ROOT),
        "local_pdfs": [],
        "remote_summary": {},
        "core_remote_handouts": [],
    }

    for path in LOCAL_PDFS:
        analysis = analyze_pdf(path)
        analysis["label"] = path.name
        cast_list = report["local_pdfs"]
        assert isinstance(cast_list, list)
        cast_list.append(analysis)

    with tempfile.TemporaryDirectory(prefix="pdf-handout-scan.") as tmpdir:
        tmp = Path(tmpdir)
        remote_results: list[dict[str, object]] = []

        for url in remote_urls:
            local_path = tmp / url.rsplit("/", 1)[-1]
            urllib.request.urlretrieve(url, local_path)
            analysis = analyze_pdf(local_path)
            analysis["url"] = url
            analysis["title"] = title_map.get(url)
            remote_results.append(analysis)

        zero_text = sum(1 for item in remote_results if item["text_chars_total"] == 0)
        report["remote_summary"] = {
            "total_remote_pdfs": len(remote_results),
            "zero_text_remote_pdfs": zero_text,
            "remote_pdfs_with_text": len(remote_results) - zero_text,
        }

        by_url = {item["url"]: item for item in remote_results}
        core_results: list[dict[str, object]] = []
        for item in core_remote:
            url = str(item.get("pdfUrl") or item.get("downloadUrl"))
            result = dict(by_url[url])
            result["id"] = item["id"]
            result["title"] = item["title"]
            result["kind"] = item.get("kind")
            result["category"] = item.get("category")
            core_results.append(result)

        report["core_remote_handouts"] = core_results

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
