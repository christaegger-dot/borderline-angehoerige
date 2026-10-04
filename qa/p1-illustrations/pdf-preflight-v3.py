"""Read-only inventory for the P1 handouts; not a PDF/UA validator.

Run from a repository checkout with Python and pypdf 6.10.0:
  python qa/p1-illustrations/pdf-preflight-v3.py --repo-root . > /tmp/p1-preflight.json
The input files are never modified. Compare the hashes with the reviewed snapshot.
"""

import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path

import pypdf


def resolve(value):
    return value.get_object() if hasattr(value, "get_object") else value


def walk(value):
    value = resolve(value)
    if isinstance(value, list):
        for item in value:
            yield from walk(item)
    elif isinstance(value, dict):
        if "/S" in value:
            yield value
        if "/K" in value:
            yield from walk(value["/K"])


def pdf_inventory(path):
    reader = pypdf.PdfReader(path)
    catalog = reader.trailer["/Root"]
    tree = resolve(catalog.get("/StructTreeRoot", {}))
    nodes = list(walk(tree))
    roles = Counter(str(node["/S"]) for node in nodes)
    mark_info = resolve(catalog.get("/MarkInfo", {}))
    preferences = resolve(catalog.get("/ViewerPreferences", {}))
    fonts = []
    for page_number, page in enumerate(reader.pages, 1):
        for name, font_ref in resolve(page["/Resources"].get("/Font", {})).items():
            font = resolve(font_ref)
            descendant = resolve(font["/DescendantFonts"][0]) if "/DescendantFonts" in font else font
            descriptor = resolve(descendant.get("/FontDescriptor", {}))
            fonts.append({
                "page": page_number, "resource": str(name),
                "base_font": str(font.get("/BaseFont", "")),
                "font_program_present": any(key in descriptor for key in ("/FontFile", "/FontFile2", "/FontFile3")),
                "to_unicode_stream_present": "/ToUnicode" in font,
            })
    return {
        "pdf_header": reader.pdf_header,
        "catalog_version": catalog.get("/Version"),
        "pages": len(reader.pages),
        "media_boxes_points": [[float(v) for v in page.mediabox] for page in reader.pages],
        "document_info_title": reader.metadata.get("/Title") if reader.metadata else None,
        "catalog_language": catalog.get("/Lang"),
        "marked": getattr(mark_info.get("/Marked"), "value", None),
        "display_doc_title": getattr(preferences.get("/DisplayDocTitle"), "value", None),
        "structure_tree_present": "/StructTreeRoot" in catalog,
        "catalog_xmp_present": "/Metadata" in catalog,
        "role_map": {str(k): str(v) for k, v in resolve(tree.get("/RoleMap", {})).items()},
        "roles": dict(sorted(roles.items())),
        "heading_roles_in_tree_order": [str(n["/S"]) for n in nodes if str(n["/S"]).startswith("/H")],
        "figures": [{"alt": n.get("/Alt"), "actual_text": n.get("/ActualText")} for n in nodes if n["/S"] == "/Figure"],
        "page_tab_orders": [page.get("/Tabs") for page in reader.pages],
        "fonts": fonts,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=Path("."))
    args = parser.parse_args()
    root = args.repo_root
    manifest_path = root / "handouts/p1-illustrations/manifest.json"
    manifest = json.loads(manifest_path.read_text())
    entries = []
    for entry in manifest["entries"]:
        assets = {}
        for kind in ("pdf", "webp", "thumbnail"):
            expected = entry[kind]
            path = root / expected["path"]
            data = path.read_bytes()
            digest = hashlib.sha256(data).hexdigest()
            assets[kind] = {"path": expected["path"], "bytes": len(data), "sha256": digest,
                            "manifest_match": digest == expected["sha256"] and len(data) == expected["bytes"]}
        entries.append({"id": entry["id"], "version": entry["version"], "assets": assets,
                        "pdf_inventory": pdf_inventory(root / entry["pdf"]["path"])})
    print(json.dumps({
        "schema_version": 1,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "tool": {"name": "pypdf", "version": pypdf.__version__},
        "scope": "Read-only asset identity and PDF object inventory; no PDF/UA certification, human screenreader test or physical print test.",
        "manifest_sha256": hashlib.sha256(manifest_path.read_bytes()).hexdigest(),
        "all_asset_hashes_match_manifest": all(a["manifest_match"] for e in entries for a in e["assets"].values()),
        "entries": entries,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
