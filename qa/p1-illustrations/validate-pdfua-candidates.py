#!/usr/bin/env python3
"""Validate temporary PDF/UA-1 candidates without changing repository assets.

The checked-in PDFs deliberately omit the PDF/UA identifier while the manual
Matterhorn review is pending. This script copies each PDF to a temporary or
explicit persistent candidate directory, adds the identifier to that exact
candidate with the production postprocessor, verifies text and raster parity,
and runs qpdf plus veraPDF's complete ``ua1`` profile.
"""

from __future__ import annotations

import argparse
from contextlib import nullcontext
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

import pypdf
from pypdf import PdfReader


EXPECTED_IDS = ["radikale-akzeptanz", "gespraeche-kippen", "beispiel-dialog"]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        check=True,
        text=True,
        capture_output=True,
    )


def version_line(result: subprocess.CompletedProcess[str]) -> str:
    output = result.stdout.strip() or result.stderr.strip()
    return output.splitlines()[0]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=Path("."))
    parser.add_argument("--verapdf", default="verapdf")
    parser.add_argument("--qpdf", default="qpdf")
    parser.add_argument(
        "--candidate-dir",
        type=Path,
        help=(
            "Persist the exact identifier-bearing candidates for manual review. "
            "Omit to validate disposable temporary copies."
        ),
    )
    args = parser.parse_args()

    root = args.repo_root.resolve()
    manifest_path = root / "handouts/p1-illustrations/manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    postprocessor = root / "scripts/postprocess-p1-pdf.py"
    ids = [entry["id"] for entry in manifest["entries"]]
    if ids != EXPECTED_IDS:
        raise RuntimeError(f"unexpected P1 package entries: {ids}")
    entries = []

    if args.candidate_dir:
        candidate_dir = args.candidate_dir.resolve()
        if candidate_dir.is_relative_to(root):
            raise RuntimeError(
                "persistent candidate directory must be outside the repository"
            )
        if candidate_dir.exists() and any(candidate_dir.iterdir()):
            raise RuntimeError(
                f"persistent candidate directory must be empty: {candidate_dir}"
            )
        candidate_dir.mkdir(parents=True, exist_ok=True)
        candidate_context = nullcontext(str(candidate_dir))
    else:
        candidate_context = tempfile.TemporaryDirectory(
            prefix="p1-pdfua-candidates-"
        )

    with candidate_context as temp:
        temp_root = Path(temp)
        for entry in manifest["entries"]:
            source = root / entry["pdf"]["path"]
            source_hash = sha256(source)
            if source_hash != entry["pdf"]["sha256"]:
                raise RuntimeError(
                    f"source PDF does not match manifest: {entry['id']}"
                )
            candidate = temp_root / source.name
            shutil.copy2(source, candidate)

            metadata = PdfReader(source).metadata
            title = str(metadata.get("/Title", ""))
            description = str(metadata.get("/Subject", ""))
            creator = str(metadata.get("/Author", ""))
            creator_tool = str(metadata.get("/Creator", ""))
            creation_date = str(metadata.get("/CreationDate", ""))
            date_match = re.match(r"^D:(\d{4})(\d{2})(\d{2})", creation_date)
            if (
                not title
                or not description
                or not creator
                or not creator_tool
                or not date_match
            ):
                raise RuntimeError(f"incomplete source metadata: {source}")
            metadata_date = "-".join(date_match.groups())

            run(
                [
                    sys.executable,
                    str(postprocessor),
                    "--pdf",
                    str(candidate),
                    "--title",
                    title,
                    "--description",
                    description,
                    "--creator",
                    creator,
                    "--creator-tool",
                    creator_tool,
                    "--metadata-date",
                    metadata_date,
                    "--pdf-ua-candidate",
                ]
            )
            run([args.qpdf, "--check", str(candidate)])

            source_text = run(["pdftotext", str(source), "-"]).stdout
            candidate_text = run(["pdftotext", str(candidate), "-"]).stdout
            source_layout_text = run(
                ["pdftotext", "-layout", str(source), "-"]
            ).stdout
            candidate_layout_text = run(
                ["pdftotext", "-layout", str(candidate), "-"]
            ).stdout
            if source_text != candidate_text or source_layout_text != candidate_layout_text:
                raise RuntimeError(
                    f"candidate text extraction changed: {entry['id']}"
                )

            source_png_base = temp_root / f"{source.stem}-source-raster"
            candidate_png_base = temp_root / f"{source.stem}-candidate-raster"
            for pdf, output_base in (
                (source, source_png_base),
                (candidate, candidate_png_base),
            ):
                run(
                    [
                        "pdftoppm",
                        "-f",
                        "1",
                        "-singlefile",
                        "-png",
                        "-scale-to-x",
                        "1600",
                        "-scale-to-y",
                        "-1",
                        str(pdf),
                        str(output_base),
                    ]
                )
            source_png = source_png_base.with_suffix(".png")
            candidate_png = candidate_png_base.with_suffix(".png")
            source_raster_hash = sha256(source_png)
            candidate_raster_hash = sha256(candidate_png)
            source_png.unlink()
            candidate_png.unlink()
            if source_raster_hash != candidate_raster_hash:
                raise RuntimeError(f"candidate raster changed: {entry['id']}")

            result = run(
                [
                    args.verapdf,
                    "-f",
                    "ua1",
                    "--format",
                    "json",
                    "--verbose",
                    str(candidate),
                ]
            )
            report = json.loads(result.stdout)
            validation = report["report"]["jobs"][0]["validationResult"][0]
            details = validation["details"]
            entries.append(
                {
                    "id": entry["id"],
                    "source_path": entry["pdf"]["path"],
                    "source_sha256": source_hash,
                    "candidate_sha256": sha256(candidate),
                    "candidate_path": (
                        str(candidate)
                        if args.candidate_dir
                        else "discarded temporary candidate"
                    ),
                    "pdfua_identifier_added_only_to_review_candidate": True,
                    "exact_text_parity": True,
                    "exact_layout_text_parity": True,
                    "source_raster_sha256": source_raster_hash,
                    "candidate_raster_sha256": candidate_raster_hash,
                    "profile_name": validation["profileName"],
                    "compliant": validation["compliant"],
                    "statement": validation["statement"],
                    "passed_rules": details["passedRules"],
                    "failed_rules": details["failedRules"],
                    "passed_checks": details["passedChecks"],
                    "failed_checks": details["failedChecks"],
                    "failed_rule_summaries": details.get("ruleSummaries", []),
                }
            )

    version = version_line(run([args.verapdf, "--version"]))
    qpdf_version = version_line(run([args.qpdf, "--version"]))
    pdftotext_version = version_line(run(["pdftotext", "-v"]))
    pdftoppm_version = version_line(run(["pdftoppm", "-v"]))
    candidate_files_persisted = args.candidate_dir is not None
    print(
        json.dumps(
            {
                "schema_version": 1,
                "generated_at_utc": datetime.now(timezone.utc).isoformat(),
                "scope": (
                    "Automated veraPDF PDF/UA-1 validation of "
                    f"{'persistent' if candidate_files_persisted else 'temporary'}, "
                    "unpublished candidates. This is not a manual Matterhorn, "
                    "screenreader or institutional publication approval."
                ),
                "tools": {
                    "veraPDF": version,
                    "qpdf": qpdf_version,
                    "pypdf": pypdf.__version__,
                    "python": sys.version.split()[0],
                    "pdftotext": pdftotext_version,
                    "pdftoppm": pdftoppm_version,
                },
                "profile": "ua1 (forced)",
                "manifest_sha256": sha256(manifest_path),
                "postprocessor_sha256": sha256(postprocessor),
                "validator_sha256": sha256(Path(__file__).resolve()),
                "repository_assets_changed": False,
                "candidate_files_persisted": candidate_files_persisted,
                "all_candidates_pass_verapdf_profile": (
                    len(entries) == len(EXPECTED_IDS)
                    and all(entry["compliant"] for entry in entries)
                ),
                "entries": entries,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
