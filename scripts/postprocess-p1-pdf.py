#!/usr/bin/env python3
"""Prepare one Chromium-generated P1 handout PDF for PDF/UA review.

The postprocessor adds synchronized XMP metadata and applies guarded,
content-derived repairs for Chromium's tagged-PDF output: list substructures,
decorative layout artifacts, pagination artifacts, source semantics, line-wrap
spaces and outline titles. Each conversion is fail-closed and is followed by
structural, text and raster checks in the generator. The remaining semantic
classification still requires a manual Matterhorn and assistive-technology
review. The script does not add ``pdfuaid:part`` unless explicitly requested
for a non-public validation candidate. That identifier is a conformance
declaration, not a substitute for the complete responsible review.
"""

from __future__ import annotations

import argparse
from datetime import date
import html
from io import BytesIO
import os
from pathlib import Path
import re
import tempfile
import unicodedata
from xml.etree import ElementTree as ET

import pypdf
from pypdf import PdfReader, PdfWriter
from pypdf._cmap import get_encoding
from pypdf.generic import (
    ArrayObject,
    ByteStringObject,
    ContentStream,
    DictionaryObject,
    NameObject,
    NullObject,
    NumberObject,
    TextStringObject,
)


FORBIDDEN_DECORATIVE_OPERATORS = {
    b"BT",
    b"ET",
    b"Tj",
    b"TJ",
    b"'",
    b'"',
    b"Do",
    b"sh",
    b"BI",
    b"ID",
    b"EI",
    b"INLINE IMAGE",
}

ALLOWED_DECORATIVE_OPERATORS = {
    b"cm",
    b"q",
    b"Q",
    b"RG",
    b"rg",
    b"G",
    b"g",
    b"K",
    b"k",
    b"gs",
    b"re",
    b"f",
    b"F",
    b"f*",
    b"S",
    b"s",
    b"B",
    b"B*",
    b"b",
    b"b*",
    b"W",
    b"W*",
    b"n",
    b"m",
    b"l",
    b"c",
    b"v",
    b"y",
    b"h",
    b"w",
    b"J",
    b"j",
    b"M",
    b"d",
    b"ri",
    b"i",
}

TEXT_SHOW_OPERATORS = {b"Tj", b"TJ", b"'", b'"'}
SOURCE_PREFIX = (
    "Eigene didaktische Darstellung der Fachstelle Angehörigenarbeit "
    "in Anlehnung an"
)
PAGE_NUMBER_PATTERN = re.compile(r"^Seite\s+\d+\s*/\s*\d+$", re.UNICODE)
BULLET_LABELS = {"•", "▪", "■"}
NUMBER_LABEL_PATTERN = re.compile(r"^\d+[.)]?$", re.UNICODE)

FORBIDDEN_PAGINATION_OPERATORS = {
    b"Do",
    b"sh",
    b"BI",
    b"ID",
    b"EI",
    b"INLINE IMAGE",
    b"re",
    b"f",
    b"F",
    b"f*",
    b"S",
    b"s",
    b"B",
    b"B*",
    b"b",
    b"b*",
    b"m",
    b"l",
    b"c",
    b"v",
    b"y",
    b"h",
}

ArtifactSpec = tuple[str, str | None]

EXPECTED_SEMANTICS = {
    "Radikale Akzeptanz · Praxisblatt": {
        "layout": 6,
        "blockquote": 0,
        "outline": 11,
    },
    "Wenn Gespräche kippen · Praxisblatt": {
        "layout": 5,
        "blockquote": 0,
        "outline": 8,
    },
    "Beispiel-Dialog · Praxisblatt": {
        "layout": 11,
        "blockquote": 1,
        "outline": 10,
    },
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--description", required=True)
    parser.add_argument("--creator", required=True)
    parser.add_argument("--creator-tool", required=True)
    parser.add_argument(
        "--metadata-date",
        required=True,
        help="Source-controlled document/version date in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--pdf-ua-candidate",
        action="store_true",
        help="Add pdfuaid:part=1 to a non-public candidate for final validation.",
    )
    return parser.parse_args()


def resolve(value):
    return value.get_object() if hasattr(value, "get_object") else value


def iter_structure(value):
    obj = resolve(value)
    if isinstance(obj, list):
        for item in obj:
            yield from iter_structure(item)
    elif isinstance(obj, dict):
        if "/S" in obj:
            yield obj
        if "/K" in obj:
            yield from iter_structure(obj["/K"])


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", value)).strip()


def normalize_outer(value: str) -> str:
    return unicodedata.normalize("NFKC", value).strip()


def compact_text(value: str) -> str:
    return re.sub(r"\s+", "", normalize_text(value))


def children_of(node: dict) -> list:
    children = resolve(node.get("/K"))
    if children is None:
        return []
    return list(children) if isinstance(children, list) else [children]


def set_children(node: dict, children: list) -> None:
    if not children:
        node.pop(NameObject("/K"), None)
    elif len(children) == 1:
        node[NameObject("/K")] = children[0]
    else:
        node[NameObject("/K")] = ArrayObject(children)


def direct_mcid(value) -> int | None:
    obj = resolve(value)
    if isinstance(obj, NumberObject):
        return int(obj)
    if isinstance(obj, dict) and "/S" not in obj and "/MCID" in obj:
        return int(obj["/MCID"])
    return None


def struct_parent_for(node: dict, inherited: int | None = None) -> int | None:
    page = resolve(node.get("/Pg"))
    if isinstance(page, dict) and "/StructParents" in page:
        return int(page["/StructParents"])
    return inherited


def extract_mcid_text(reader: PdfReader) -> dict[tuple[int, int], str]:
    fragments: dict[tuple[int, int], list[str]] = {}

    for page in reader.pages:
        if "/StructParents" not in page:
            continue
        struct_parent = int(page["/StructParents"])
        active_mcids: list[int | None] = []

        def before(operator, operands, _cm, _tm):
            if operator == b"BDC":
                properties = resolve(operands[1]) if len(operands) > 1 else {}
                active_mcids.append(
                    int(properties["/MCID"])
                    if isinstance(properties, dict) and "/MCID" in properties
                    else None
                )
            elif operator == b"BMC":
                active_mcids.append(None)
            elif operator == b"EMC" and active_mcids:
                active_mcids.pop()

        def visit_text(text, _cm, _tm, _font, _size):
            if not text:
                return
            mcid = next(
                (candidate for candidate in reversed(active_mcids) if candidate is not None),
                None,
            )
            if mcid is not None:
                fragments.setdefault((struct_parent, mcid), []).append(text)

        page.extract_text(
            visitor_operand_before=before,
            visitor_text=visit_text,
        )

    return {key: "".join(parts) for key, parts in fragments.items()}


def descendant_mcid_keys(
    value,
    inherited_struct_parent: int | None = None,
) -> list[tuple[int, int]]:
    obj = resolve(value)
    if not isinstance(obj, dict):
        return []
    struct_parent = struct_parent_for(obj, inherited_struct_parent)
    keys: list[tuple[int, int]] = []
    for child in children_of(obj):
        mcid = direct_mcid(child)
        if mcid is not None:
            if struct_parent is None:
                raise RuntimeError("structure content is missing its page association")
            keys.append((struct_parent, mcid))
            continue
        child_obj = resolve(child)
        if isinstance(child_obj, dict) and "/S" in child_obj:
            keys.extend(descendant_mcid_keys(child_obj, struct_parent))
    return keys


def text_for_structure(
    node: dict,
    text_by_mcid: dict[tuple[int, int], str],
    inherited_struct_parent: int | None = None,
) -> str:
    return normalize_text(
        "".join(
            text_by_mcid.get(key, "")
            for key in descendant_mcid_keys(node, inherited_struct_parent)
        )
    )


def add_artifact_spec(
    specs: dict[int, dict[int, ArtifactSpec]],
    key: tuple[int, int],
    artifact_type: str,
    subtype: str | None = None,
) -> None:
    struct_parent, mcid = key
    existing = specs.setdefault(struct_parent, {}).get(mcid)
    requested = (artifact_type, subtype)
    if existing is not None and existing != requested:
        raise RuntimeError(
            f"MCID {mcid} has conflicting artifact roles: {existing} vs {requested}"
        )
    specs[struct_parent][mcid] = requested


def font_decoder(page, pdf) -> dict[str, tuple[str, dict]]:
    resources = resolve(page.get("/Resources", {}))
    fonts = resolve(resources.get("/Font", {}))
    decoders: dict[str, tuple[str, dict]] = {}
    for name, font_reference in fonts.items():
        encoding, translation = get_encoding(resolve(font_reference))
        if not isinstance(encoding, str) or not isinstance(translation, dict):
            raise RuntimeError(f"unsupported font mapping for {name}")
        decoders[str(name)] = (encoding, translation)
    return decoders


def original_string_bytes(value) -> bytes:
    if isinstance(value, ByteStringObject):
        return bytes(value)
    if hasattr(value, "get_original_bytes"):
        raw = value.get_original_bytes()
        return raw[2:] if raw.startswith(b"\xfe\xff") else raw
    raise RuntimeError(f"unsupported PDF text operand: {type(value).__name__}")


def decode_pdf_string(value, decoder: tuple[str, dict]) -> str:
    encoding, translation = decoder
    encoded = original_string_bytes(value)
    try:
        mapped = encoded.decode(encoding)
    except UnicodeDecodeError as error:
        raise RuntimeError("unable to decode a PDF text operand") from error
    return "".join(str(translation.get(character, character)) for character in mapped)


def text_from_operation(
    operands,
    operator: bytes,
    decoder: tuple[str, dict],
) -> str:
    if operator == b"TJ":
        parts = resolve(operands[0])
        return "".join(
            decode_pdf_string(part, decoder)
            for part in parts
            if isinstance(part, (ByteStringObject, TextStringObject))
        )
    if operator in {b"Tj", b"'"}:
        return decode_pdf_string(operands[0], decoder)
    if operator == b'"':
        return decode_pdf_string(operands[2], decoder)
    return ""


def encoded_space(decoder: tuple[str, dict]) -> bytes:
    encoding, translation = decoder
    candidates = [
        character for character, mapped in translation.items() if mapped == " "
    ]
    if len(candidates) != 1:
        raise RuntimeError(
            f"expected one encoded space, found {len(candidates)} candidates"
        )
    return str(candidates[0]).encode(encoding)


def add_wrap_spaces(writer: PdfWriter) -> int:
    """Encode spaces at verified line wraps without changing the raster.

    Chromium creates a new text object for many wrapped lines but may omit the
    separating space from the content stream. A space painted immediately
    before the preceding ``ET`` remains invisible because the following text
    object resets its matrix, while the logical text gains the required U+0020.
    """

    inserted = 0
    for page in writer.pages:
        content = ContentStream(page.get_contents(), writer)
        decoders = font_decoder(page, writer)
        marked_content: list[int | None] = []
        text_object = None
        records = []

        for index, (operands, operator) in enumerate(content.operations):
            if operator == b"BDC":
                properties = resolve(operands[1]) if len(operands) > 1 else {}
                marked_content.append(
                    int(properties["/MCID"])
                    if isinstance(properties, dict) and "/MCID" in properties
                    else None
                )
                continue
            if operator == b"BMC":
                marked_content.append(None)
                continue
            if operator == b"EMC":
                if marked_content:
                    marked_content.pop()
                continue
            if operator == b"BT":
                text_object = {
                    "mcid": next(
                        (
                            candidate
                            for candidate in reversed(marked_content)
                            if candidate is not None
                        ),
                        None,
                    ),
                    "font": None,
                    "last_font": None,
                    "x": None,
                    "y": None,
                    "text": [],
                    "end": None,
                }
                continue
            if text_object is None:
                continue
            if operator == b"Tf":
                font_name = str(operands[0])
                if font_name not in decoders:
                    raise RuntimeError(f"missing decoder for font {font_name}")
                text_object["font"] = font_name
                continue
            if operator == b"Tm" and text_object["x"] is None:
                text_object["x"] = float(operands[4])
                text_object["y"] = float(operands[5])
                continue
            if operator in TEXT_SHOW_OPERATORS:
                font_name = text_object["font"]
                if font_name is None:
                    raise RuntimeError("text-show operator without a selected font")
                text_object["text"].append(
                    text_from_operation(operands, operator, decoders[font_name])
                )
                text_object["last_font"] = font_name
                continue
            if operator == b"ET":
                text_object["end"] = index
                if text_object["mcid"] is not None and text_object["text"]:
                    text_object["text"] = "".join(text_object["text"])
                    records.append(text_object)
                text_object = None

        insertions: dict[int, tuple[list, bytes]] = {}
        for previous, following in zip(records, records[1:]):
            if previous["mcid"] != following["mcid"]:
                continue
            if previous["y"] is None or following["y"] is None:
                continue
            if abs(previous["y"] - following["y"]) < 0.5:
                continue
            before = str(previous["text"])
            after = str(following["text"])
            if not before or not after:
                continue
            if before[-1].isspace() or after[0].isspace():
                continue
            if before.endswith(("-", "\u00ad")):
                continue
            if after[0] in ".,;:!?)]}»":
                continue
            end_index = int(previous["end"])
            font_name = str(previous["last_font"])
            insertions[end_index] = (
                [ByteStringObject(encoded_space(decoders[font_name]))],
                b"Tj",
            )

        if insertions:
            rewritten = []
            for index, operation in enumerate(content.operations):
                if index in insertions:
                    rewritten.append(insertions[index])
                    inserted += 1
                rewritten.append(operation)
            content.operations = rewritten
            page[NameObject("/Contents")] = writer._add_object(content)

    return inserted


def parent_tree_arrays(tree: dict) -> dict[int, list]:
    arrays: dict[int, list] = {}

    def visit(node) -> None:
        obj = resolve(node)
        numbers = resolve(obj.get("/Nums", [])) if isinstance(obj, dict) else []
        for index in range(0, len(numbers), 2):
            arrays[int(numbers[index])] = resolve(numbers[index + 1])
        for child in resolve(obj.get("/Kids", [])) if isinstance(obj, dict) else []:
            visit(child)

    visit(resolve(tree["/ParentTree"]))
    return arrays


def clear_artifact_parent_tree(
    tree: dict,
    artifact_specs: dict[int, dict[int, ArtifactSpec]],
) -> None:
    arrays = parent_tree_arrays(tree)
    for struct_parent, targets in artifact_specs.items():
        parent_array = arrays.get(struct_parent)
        if parent_array is None:
            raise RuntimeError(f"ParentTree is missing key {struct_parent}")
        for mcid in targets:
            if mcid >= len(parent_array):
                raise RuntimeError(
                    f"ParentTree key {struct_parent} is missing MCID {mcid}"
                )
            parent_array[mcid] = NullObject()


def artifact_inventory(pdf) -> list[tuple[str | None, str | None]]:
    inventory = []
    for page in pdf.pages:
        content = ContentStream(page.get_contents(), pdf)
        for operands, operator in content.operations:
            if operator != b"BDC" or str(operands[0]) != "/Artifact":
                continue
            properties = resolve(operands[1]) if len(operands) > 1 else {}
            inventory.append(
                (
                    str(properties.get("/Type")) if isinstance(properties, dict) else None,
                    str(properties.get("/Subtype"))
                    if isinstance(properties, dict) and "/Subtype" in properties
                    else None,
                )
            )
    return inventory


def repair_semantic_structure(
    writer: PdfWriter,
    text_by_mcid: dict[tuple[int, int], str],
    artifact_specs: dict[int, dict[int, ArtifactSpec]],
) -> None:
    tree = resolve(writer.root_object["/StructTreeRoot"])
    existing_pagination = artifact_inventory(writer).count(("/Pagination", "/Footer"))
    source_nodes = 0
    page_number_nodes = 0

    def visit(node: dict, inherited_struct_parent: int | None = None) -> None:
        nonlocal source_nodes, page_number_nodes
        struct_parent = struct_parent_for(node, inherited_struct_parent)
        original_children = children_of(node)
        semantic_children = [
            child
            for child in original_children
            if isinstance(resolve(child), dict) and "/S" in resolve(child)
        ]
        retained = []

        for child in original_children:
            mcid = direct_mcid(child)
            if (
                mcid is not None
                and semantic_children
                and struct_parent is not None
                and not normalize_text(text_by_mcid.get((struct_parent, mcid), ""))
            ):
                add_artifact_spec(
                    artifact_specs,
                    (struct_parent, mcid),
                    "Layout",
                )
                continue
            retained.append(child)
        if retained != original_children:
            set_children(node, retained)

        role = str(node.get("/S"))
        node_text = text_for_structure(node, text_by_mcid, struct_parent)
        if role in {"/P", "/BibEntry"} and compact_text(node_text).startswith(
            compact_text(SOURCE_PREFIX)
        ):
            node[NameObject("/S")] = NameObject("/BibEntry")
            source_nodes += 1

        for child in list(children_of(node)):
            child_obj = resolve(child)
            if not isinstance(child_obj, dict) or "/S" not in child_obj:
                continue
            child_text = text_for_structure(child_obj, text_by_mcid, struct_parent)
            if (
                str(child_obj.get("/S")) == "/P"
                and PAGE_NUMBER_PATTERN.fullmatch(normalize_text(child_text))
            ):
                keys = descendant_mcid_keys(child_obj, struct_parent)
                if not keys:
                    raise RuntimeError("page-number structure has no marked content")
                for key in keys:
                    add_artifact_spec(artifact_specs, key, "Pagination", "Footer")
                remaining = [
                    candidate
                    for candidate in children_of(node)
                    if resolve(candidate) is not child_obj
                ]
                set_children(node, remaining)
                page_number_nodes += 1
                continue
            visit(child_obj, struct_parent)

    for child in children_of(tree):
        child_obj = resolve(child)
        if isinstance(child_obj, dict) and "/S" in child_obj:
            visit(child_obj)

    if source_nodes != 1:
        raise RuntimeError(f"expected one source BibEntry, found {source_nodes}")
    if page_number_nodes == 0 and existing_pagination == 1:
        return
    if page_number_nodes != 1 or existing_pagination != 0:
        raise RuntimeError(
            "expected exactly one structured or existing Pagination/Footer page number"
        )


def repair_outline_titles(
    writer: PdfWriter,
    text_by_mcid: dict[tuple[int, int], str],
) -> None:
    outlines = resolve(writer.root_object.get("/Outlines"))
    if not isinstance(outlines, dict) or "/First" not in outlines:
        raise RuntimeError("PDF is missing its document outline")

    seen = 0

    def visit(first) -> None:
        nonlocal seen
        current = first
        while current is not None:
            item = resolve(current)
            structure = resolve(item.get("/SE"))
            if not isinstance(structure, dict):
                raise RuntimeError("outline item is missing its /SE structure link")
            canonical = text_for_structure(structure, text_by_mcid)
            current_title = normalize_text(str(item.get("/Title", "")))
            if not canonical:
                raise RuntimeError("outline item points to an empty heading")
            if compact_text(current_title) != compact_text(canonical):
                raise RuntimeError(
                    f"outline title does not match heading: {current_title!r} vs {canonical!r}"
                )
            item[NameObject("/Title")] = TextStringObject(canonical)
            seen += 1
            if "/First" in item:
                visit(item["/First"])
            current = item.get("/Next")

    visit(outlines["/First"])
    if seen == 0:
        raise RuntimeError("PDF outline is empty")


def xmp_packet(args: argparse.Namespace) -> bytes:
    metadata_date = date.fromisoformat(args.metadata_date).isoformat()
    metadata_timestamp = f"{metadata_date}T00:00:00Z"
    keywords = "Angehörige, Borderline, Psychoedukation, PUK Zürich"
    pdfua_namespace = (
        ' xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"'
        if args.pdf_ua_candidate
        else ""
    )
    pdfua_identifier = (
        "   <pdfuaid:part>1</pdfuaid:part>\n"
        if args.pdf_ua_candidate
        else ""
    )
    return f'''<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="pypdf {pypdf.__version__}">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:pdf="http://ns.adobe.com/pdf/1.3/"
   xmlns:xmp="http://ns.adobe.com/xap/1.0/"{pdfua_namespace}>
   <dc:format>application/pdf</dc:format>
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">{html.escape(args.title)}</rdf:li><rdf:li xml:lang="de-CH">{html.escape(args.title)}</rdf:li></rdf:Alt></dc:title>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">{html.escape(args.description)}</rdf:li><rdf:li xml:lang="de-CH">{html.escape(args.description)}</rdf:li></rdf:Alt></dc:description>
   <dc:creator><rdf:Seq><rdf:li>{html.escape(args.creator)}</rdf:li></rdf:Seq></dc:creator>
   <dc:language><rdf:Bag><rdf:li>de-CH</rdf:li></rdf:Bag></dc:language>
   <pdf:Producer>Chromium/Skia PDF; PDF/UA-Prüfvorbereitung mit pypdf</pdf:Producer>
   <pdf:Keywords>{html.escape(keywords)}</pdf:Keywords>
   <xmp:CreatorTool>{html.escape(args.creator_tool)}</xmp:CreatorTool>
   <xmp:CreateDate>{metadata_timestamp}</xmp:CreateDate>
   <xmp:ModifyDate>{metadata_timestamp}</xmp:ModifyDate>
   <xmp:MetadataDate>{metadata_timestamp}</xmp:MetadataDate>
{pdfua_identifier}  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''.encode("utf-8")


def repair_list_structure(
    writer: PdfWriter,
    text_by_mcid: dict[tuple[int, int], str],
) -> None:
    tree = resolve(writer.root_object["/StructTreeRoot"])

    for list_item in [
        node for node in iter_structure(tree) if str(node.get("/S")) == "/LI"
    ]:
        children = children_of(list_item)

        existing_roles = [
            str(resolve(child).get("/S"))
            for child in children
            if isinstance(resolve(child), dict) and "/S" in resolve(child)
        ]
        if existing_roles == ["/Lbl", "/LBody"]:
            continue
        if any(role in {"/Lbl", "/LBody"} for role in existing_roles):
            raise RuntimeError(f"malformed pre-existing LI roles: {existing_roles}")

        semantic_children = []
        direct_content = []
        for child_reference in children:
            if direct_mcid(child_reference) is not None:
                direct_content.append(child_reference)
            else:
                semantic_children.append(child_reference)

        semantic_objects = [resolve(child) for child in semantic_children]
        if len(semantic_objects) < 2 or not all(
            isinstance(child, dict) and "/S" in child for child in semantic_objects
        ):
            diagnostic = [
                (
                    str(child.get("/S")) if isinstance(child, dict) else type(child).__name__,
                    text_for_structure(child, text_by_mcid)
                    if isinstance(child, dict) and "/S" in child
                    else "",
                )
                for child in semantic_objects
            ]
            raise RuntimeError(
                f"list item lacks a distinct label and body: {diagnostic}"
            )

        label_text = text_for_structure(
            semantic_objects[0],
            text_by_mcid,
        )
        if (
            normalize_text(label_text) not in BULLET_LABELS
            and not NUMBER_LABEL_PATTERN.fullmatch(normalize_text(label_text))
        ):
            raise RuntimeError(f"unrecognized list label: {label_text!r}")

        label_reference = semantic_children[0]
        semantic_objects[0][NameObject("/S")] = NameObject("/Lbl")
        body_children = ArrayObject(semantic_children[1:])

        body = DictionaryObject(
            {
                NameObject("/Type"): NameObject("/StructElem"),
                NameObject("/S"): NameObject("/LBody"),
                NameObject("/P"): list_item.indirect_reference,
                NameObject("/K"): body_children,
            }
        )
        body_reference = writer._add_object(body)
        for child in map(resolve, body_children):
            if isinstance(child, dict):
                child[NameObject("/P")] = body_reference
        list_item[NameObject("/K")] = ArrayObject(
            direct_content + [label_reference, body_reference]
        )

    for list_node in [
        node for node in iter_structure(tree) if str(node.get("/S")) == "/L"
    ]:
        list_children = resolve(list_node.get("/K"))
        if not isinstance(list_children, list):
            list_children = [list_children]
        label_texts = []
        for list_item_reference in list_children:
            list_item = resolve(list_item_reference)
            if not isinstance(list_item, dict) or str(list_item.get("/S")) != "/LI":
                continue
            label = next(
                (
                    resolve(child)
                    for child in children_of(list_item)
                    if isinstance(resolve(child), dict)
                    and str(resolve(child).get("/S")) == "/Lbl"
                ),
                None,
            )
            if label is None:
                raise RuntimeError("list item is missing its label")
            label_texts.append(text_for_structure(label, text_by_mcid))
        if not label_texts:
            raise RuntimeError("list is empty")
        ordered = all(
            NUMBER_LABEL_PATTERN.fullmatch(normalize_text(label))
            for label in label_texts
        )
        unordered = all(normalize_text(label) in BULLET_LABELS for label in label_texts)
        if not ordered and not unordered:
            raise RuntimeError(f"list has inconsistent labels: {label_texts}")
        attributes = resolve(list_node.get("/A"))
        if attributes is None:
            attributes = DictionaryObject()
        if not isinstance(attributes, dict):
            raise RuntimeError(
                f"unexpected list /A type: {type(attributes).__name__}"
            )
        attributes[NameObject("/O")] = NameObject("/List")
        attributes[NameObject("/ListNumbering")] = NameObject(
            "/Decimal" if ordered else "/Square"
        )
        list_node[NameObject("/A")] = attributes


def mark_artifact_content(
    writer: PdfWriter,
    artifact_specs: dict[int, dict[int, ArtifactSpec]],
) -> None:
    for page in writer.pages:
        struct_parent = int(page.get("/StructParents"))
        targets = artifact_specs.get(struct_parent, {})
        content = ContentStream(page.get_contents(), writer)
        active_mcids = []
        target_operators = {mcid: [] for mcid in targets}

        for operands, operator in content.operations:
            if operator == b"BDC":
                properties = resolve(operands[1]) if len(operands) > 1 else {}
                active_mcids.append(
                    int(properties["/MCID"])
                    if isinstance(properties, dict) and "/MCID" in properties
                    else None
                )
            elif operator == b"BMC":
                active_mcids.append(None)
            elif operator == b"EMC":
                if active_mcids:
                    active_mcids.pop()
            else:
                for mcid in active_mcids:
                    if mcid in target_operators:
                        target_operators[mcid].append(operator)

        for mcid, operators in target_operators.items():
            operator_set = set(operators)
            artifact_type, artifact_subtype = targets[mcid]
            if artifact_type == "Layout":
                forbidden = sorted(operator_set & FORBIDDEN_DECORATIVE_OPERATORS)
                if forbidden:
                    raise RuntimeError(
                        f"MCID {mcid} is not safely decorative: {forbidden}"
                    )
                unknown = sorted(operator_set - ALLOWED_DECORATIVE_OPERATORS)
                if unknown:
                    raise RuntimeError(
                        f"MCID {mcid} contains unknown decorative operators: {unknown}"
                    )
            elif artifact_type == "Pagination" and artifact_subtype == "Footer":
                forbidden = sorted(operator_set & FORBIDDEN_PAGINATION_OPERATORS)
                if forbidden:
                    raise RuntimeError(
                        f"MCID {mcid} is not safely a page-number footer: {forbidden}"
                    )
                if not operator_set & TEXT_SHOW_OPERATORS:
                    raise RuntimeError(
                        f"MCID {mcid} page-number footer has no text-show operator"
                    )
            else:
                raise RuntimeError(
                    f"unsupported artifact role for MCID {mcid}: {targets[mcid]}"
                )

        depth = 0
        rewritten = []
        artifact_open = False
        outside_operators = []

        for operands, operator in content.operations:
            if operator == b"BDC":
                properties = resolve(operands[1]) if len(operands) > 1 else {}
                mcid = (
                    int(properties["/MCID"])
                    if isinstance(properties, dict) and "/MCID" in properties
                    else None
                )
                if depth == 0 and artifact_open:
                    rewritten.append(([], b"EMC"))
                    artifact_open = False
                if mcid in targets:
                    artifact_type, artifact_subtype = targets[mcid]
                    artifact_properties = {
                        NameObject("/Type"): NameObject(f"/{artifact_type}")
                    }
                    if artifact_subtype is not None:
                        artifact_properties[NameObject("/Subtype")] = NameObject(
                            f"/{artifact_subtype}"
                        )
                    rewritten.append(
                        (
                            [
                                NameObject("/Artifact"),
                                DictionaryObject(artifact_properties),
                            ],
                            b"BDC",
                        )
                    )
                else:
                    rewritten.append((operands, operator))
                depth += 1
            elif operator == b"BMC":
                if depth == 0 and artifact_open:
                    rewritten.append(([], b"EMC"))
                    artifact_open = False
                rewritten.append((operands, operator))
                depth += 1
            elif operator == b"EMC":
                rewritten.append((operands, operator))
                depth -= 1
                if depth < 0:
                    raise RuntimeError("unbalanced marked content")
            elif depth == 0:
                outside_operators.append(operator)
                if not artifact_open:
                    rewritten.append(([NameObject("/Artifact")], b"BMC"))
                    artifact_open = True
                rewritten.append((operands, operator))
            else:
                rewritten.append((operands, operator))

        if artifact_open:
            rewritten.append(([], b"EMC"))
        if depth:
            raise RuntimeError("unbalanced marked content")

        outside_set = set(outside_operators)
        forbidden = sorted(outside_set & FORBIDDEN_DECORATIVE_OPERATORS)
        if forbidden:
            raise RuntimeError(f"refusing outside operators: {forbidden}")
        unknown = sorted(outside_set - ALLOWED_DECORATIVE_OPERATORS)
        if unknown:
            raise RuntimeError(f"unknown outside operators: {unknown}")

        content.operations = rewritten
        page[NameObject("/Contents")] = writer._add_object(content)


def structure_identity(node: dict) -> tuple[str, int, int] | tuple[str, int]:
    reference = getattr(node, "indirect_reference", None)
    if reference is not None:
        return ("indirect", int(reference.idnum), int(reference.generation))
    return ("direct", id(node))


def artifact_records(pdf) -> list[dict]:
    records = []
    for page in pdf.pages:
        content = ContentStream(page.get_contents(), pdf)
        decoders = font_decoder(page, pdf)
        stack = []
        current_font = None
        for operands, operator in content.operations:
            if operator == b"BDC":
                if str(operands[0]) == "/Artifact":
                    properties = resolve(operands[1]) if len(operands) > 1 else {}
                    record = {
                        "type": str(properties.get("/Type"))
                        if isinstance(properties, dict) and "/Type" in properties
                        else None,
                        "subtype": str(properties.get("/Subtype"))
                        if isinstance(properties, dict) and "/Subtype" in properties
                        else None,
                        "operators": [],
                        "text": [],
                    }
                    records.append(record)
                    stack.append(record)
                else:
                    stack.append(None)
                continue
            if operator == b"BMC":
                stack.append(None)
                continue
            if operator == b"EMC":
                if stack:
                    stack.pop()
                continue
            if operator == b"Tf":
                current_font = str(operands[0])
            for record in (candidate for candidate in stack if candidate is not None):
                record["operators"].append(operator)
                if operator in TEXT_SHOW_OPERATORS:
                    if current_font is None or current_font not in decoders:
                        raise RuntimeError("artifact text has no decodable font")
                    record["text"].append(
                        text_from_operation(operands, operator, decoders[current_font])
                    )
    for record in records:
        record["text"] = "".join(record["text"])
    return records


def assert_parent_tree_bijection(reader: PdfReader, tree: dict) -> None:
    owners: dict[tuple[int, int], dict] = {}

    def collect(node: dict, inherited_struct_parent: int | None = None) -> None:
        struct_parent = struct_parent_for(node, inherited_struct_parent)
        for child in children_of(node):
            mcid = direct_mcid(child)
            if mcid is not None:
                if struct_parent is None:
                    raise RuntimeError("structured MCID lacks a page association")
                key = (struct_parent, mcid)
                if key in owners:
                    raise RuntimeError(f"structured MCID has two owners: {key}")
                owners[key] = node
                continue
            child_obj = resolve(child)
            if isinstance(child_obj, dict) and "/S" in child_obj:
                collect(child_obj, struct_parent)

    for child in children_of(tree):
        child_obj = resolve(child)
        if isinstance(child_obj, dict) and "/S" in child_obj:
            collect(child_obj)

    occurrences: dict[tuple[int, int], int] = {}
    for page in reader.pages:
        struct_parent = int(page.get("/StructParents"))
        content = ContentStream(page.get_contents(), reader)
        for operands, operator in content.operations:
            if operator != b"BDC":
                continue
            properties = resolve(operands[1]) if len(operands) > 1 else {}
            if not isinstance(properties, dict) or "/MCID" not in properties:
                continue
            key = (struct_parent, int(properties["/MCID"]))
            occurrences[key] = occurrences.get(key, 0) + 1

    arrays = parent_tree_arrays(tree)
    for key, owner in owners.items():
        if occurrences.get(key) != 1:
            raise RuntimeError(
                f"structured MCID must occur once in content: {key} -> {occurrences.get(key, 0)}"
            )
        struct_parent, mcid = key
        parent_array = arrays.get(struct_parent)
        if parent_array is None or mcid >= len(parent_array):
            raise RuntimeError(f"ParentTree is missing structured MCID {key}")
        parent_owner = resolve(parent_array[mcid])
        if isinstance(parent_owner, NullObject):
            raise RuntimeError(f"ParentTree nulls structured MCID {key}")
        if structure_identity(parent_owner) != structure_identity(owner):
            raise RuntimeError(f"ParentTree points to the wrong owner for {key}")

    for key, count in occurrences.items():
        if count != 1:
            raise RuntimeError(f"content MCID occurs {count} times: {key}")
        if key not in owners:
            raise RuntimeError(f"content MCID has no structure owner: {key}")

    for struct_parent, parent_array in arrays.items():
        for mcid, parent_owner_reference in enumerate(parent_array):
            parent_owner = resolve(parent_owner_reference)
            if isinstance(parent_owner, NullObject):
                continue
            key = (struct_parent, mcid)
            if key not in owners or key not in occurrences:
                raise RuntimeError(f"non-null ParentTree slot is orphaned: {key}")


def assert_structure(reader: PdfReader, expected_title: str) -> None:
    catalog = resolve(reader.trailer["/Root"])
    metadata_stream = catalog.get("/Metadata")
    if metadata_stream is None:
        raise RuntimeError("saved PDF is missing its catalog XMP stream")
    metadata_stream = resolve(metadata_stream)
    if metadata_stream.get("/Type") != NameObject("/Metadata"):
        raise RuntimeError("saved XMP stream is missing /Type /Metadata")
    if metadata_stream.get("/Subtype") != NameObject("/XML"):
        raise RuntimeError("saved XMP stream is missing /Subtype /XML")

    expected = EXPECTED_SEMANTICS.get(expected_title)
    if expected is None:
        raise RuntimeError(f"missing semantic contract for {expected_title!r}")

    tree = resolve(catalog["/StructTreeRoot"])
    text_by_mcid = extract_mcid_text(reader)
    source_nodes = []
    blockquotes = []
    figures = []
    headings = []
    structured_page_numbers = []
    references = []

    for node in iter_structure(tree):
        role = str(node.get("/S"))
        text = text_for_structure(node, text_by_mcid)
        if role == "/Aside":
            raise RuntimeError("saved PDF still contains the PDF 2.0 Aside role")
        if role == "/Reference":
            references.append(node)
        if role == "/BibEntry" and compact_text(text).startswith(
            compact_text(SOURCE_PREFIX)
        ):
            source_nodes.append(node)
        if role == "/BlockQuote":
            blockquotes.append(text)
        if role == "/Figure":
            figures.append(node)
        if role in {"/H1", "/H2", "/H3"}:
            headings.append(node)
        if role == "/P" and PAGE_NUMBER_PATTERN.fullmatch(normalize_text(text)):
            structured_page_numbers.append(node)

        semantic_children = [
            child
            for child in children_of(node)
            if isinstance(resolve(child), dict) and "/S" in resolve(child)
        ]
        struct_parent = struct_parent_for(node)
        for child in children_of(node):
            mcid = direct_mcid(child)
            if (
                mcid is not None
                and semantic_children
                and struct_parent is not None
                and not normalize_text(text_by_mcid.get((struct_parent, mcid), ""))
            ):
                raise RuntimeError(
                    f"semantic container still owns decorative MCID {mcid}"
                )

        if role == "/LI":
            child_list = children_of(node)
            child_roles = [str(resolve(child).get("/S")) for child in child_list]
            if child_roles != ["/Lbl", "/LBody"]:
                raise RuntimeError(
                    f"saved list item has invalid child roles: {child_roles}"
                )
            label_text = text_for_structure(resolve(child_list[0]), text_by_mcid)
            if not normalize_text(label_text):
                raise RuntimeError("saved list label has no accessible text")
        if role == "/L":
            attributes = resolve(node.get("/A"))
            numbering = str(attributes.get("/ListNumbering"))
            labels = []
            for list_item_reference in children_of(node):
                list_item = resolve(list_item_reference)
                label = next(
                    resolve(child)
                    for child in children_of(list_item)
                    if str(resolve(child).get("/S")) == "/Lbl"
                )
                labels.append(normalize_text(text_for_structure(label, text_by_mcid)))
            expected_numbering = (
                "/Decimal"
                if all(NUMBER_LABEL_PATTERN.fullmatch(label) for label in labels)
                else "/Square"
            )
            if numbering != expected_numbering:
                raise RuntimeError(
                    f"list numbering {numbering} does not match labels {labels}"
                )

    if len(source_nodes) != 1:
        raise RuntimeError(f"expected one source BibEntry, found {len(source_nodes)}")
    if references:
        raise RuntimeError("external source is incorrectly tagged as /Reference")
    if structured_page_numbers:
        raise RuntimeError("page number remains in the document structure")
    if len(blockquotes) != expected["blockquote"]:
        raise RuntimeError(
            f"expected {expected['blockquote']} BlockQuote elements, found {len(blockquotes)}"
        )
    for quote in blockquotes:
        if not (quote.startswith("«") and quote.endswith("»")):
            raise RuntimeError(f"styled callout remains a BlockQuote: {quote!r}")
    if len(figures) != 1 or str(figures[0].get("/Alt", "")) != (
        "Psychiatrische Universitätsklinik Zürich"
    ):
        raise RuntimeError("logo Figure or its alternative text is invalid")

    records = artifact_records(reader)
    layout_records = [record for record in records if record["type"] == "/Layout"]
    pagination_records = [
        record
        for record in records
        if (record["type"], record["subtype"]) == ("/Pagination", "/Footer")
    ]
    if len(layout_records) != expected["layout"]:
        raise RuntimeError(
            f"expected {expected['layout']} Layout artifacts, found {len(layout_records)}"
        )
    for record in layout_records:
        operators = set(record["operators"])
        if operators & FORBIDDEN_DECORATIVE_OPERATORS:
            raise RuntimeError("Layout artifact contains semantic text or image content")
        if operators - ALLOWED_DECORATIVE_OPERATORS:
            raise RuntimeError("Layout artifact contains an unknown operator")
    if len(pagination_records) != 1:
        raise RuntimeError(
            f"expected one Pagination/Footer artifact, found {len(pagination_records)}"
        )
    if normalize_text(pagination_records[0]["text"]) != "Seite 1 / 1":
        raise RuntimeError(
            f"Pagination/Footer contains wrong text: {pagination_records[0]['text']!r}"
        )

    outlines = resolve(catalog.get("/Outlines"))
    if not isinstance(outlines, dict) or "/First" not in outlines:
        raise RuntimeError("saved PDF is missing its document outline")
    outline_headings = []

    def assert_outlines(first) -> None:
        current = first
        while current is not None:
            item = resolve(current)
            structure = resolve(item.get("/SE"))
            if not isinstance(structure, dict) or str(structure.get("/S")) not in {
                "/H1",
                "/H2",
                "/H3",
            }:
                raise RuntimeError("outline item does not point to a heading")
            canonical = text_for_structure(structure, text_by_mcid)
            if normalize_outer(str(item.get("/Title", ""))) != normalize_outer(
                canonical
            ):
                raise RuntimeError(
                    f"outline title differs from its heading: {item.get('/Title')!r} vs {canonical!r}"
                )
            outline_headings.append(structure_identity(structure))
            if "/First" in item:
                assert_outlines(item["/First"])
            current = item.get("/Next")

    assert_outlines(outlines["/First"])
    heading_ids = [structure_identity(heading) for heading in headings]
    if len(outline_headings) != expected["outline"]:
        raise RuntimeError(
            f"expected {expected['outline']} outline items, found {len(outline_headings)}"
        )
    if sorted(outline_headings) != sorted(heading_ids):
        raise RuntimeError("outline and heading structures are not one-to-one")

    probe = PdfWriter(clone_from=reader)
    missing_wraps = add_wrap_spaces(probe)
    if missing_wraps:
        raise RuntimeError(
            f"saved PDF still omits {missing_wraps} spaces at line wraps"
        )

    assert_parent_tree_bijection(reader, tree)


def assert_metadata(
    reader: PdfReader,
    args: argparse.Namespace,
    pdf_date: str,
    producer: str,
) -> bytes:
    info = reader.metadata
    expected_info = {
        "/Title": args.title,
        "/Author": args.creator,
        "/Subject": args.description,
        "/Keywords": "Angehörige, Borderline, Psychoedukation, PUK Zürich",
        "/Creator": args.creator_tool,
        "/Producer": producer,
        "/CreationDate": pdf_date,
        "/ModDate": pdf_date,
    }
    for key, expected in expected_info.items():
        if str(info.get(key, "")) != expected:
            raise RuntimeError(f"saved Info metadata mismatch for {key}")

    xmp_bytes = resolve(reader.trailer["/Root"]["/Metadata"]).get_data()
    root = ET.fromstring(xmp_bytes)
    namespaces = {
        "dc": "http://purl.org/dc/elements/1.1/",
        "pdf": "http://ns.adobe.com/pdf/1.3/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "xmp": "http://ns.adobe.com/xap/1.0/",
    }

    def text_at(xpath: str) -> str:
        node = root.find(xpath, namespaces)
        return node.text if node is not None and node.text is not None else ""

    metadata_timestamp = f"{args.metadata_date}T00:00:00Z"
    expected_xmp = {
        ".//dc:title/rdf:Alt/rdf:li": args.title,
        ".//dc:description/rdf:Alt/rdf:li": args.description,
        ".//dc:creator/rdf:Seq/rdf:li": args.creator,
        ".//dc:language/rdf:Bag/rdf:li": "de-CH",
        ".//pdf:Producer": producer,
        ".//pdf:Keywords": expected_info["/Keywords"],
        ".//xmp:CreatorTool": args.creator_tool,
        ".//xmp:CreateDate": metadata_timestamp,
        ".//xmp:ModifyDate": metadata_timestamp,
        ".//xmp:MetadataDate": metadata_timestamp,
    }
    for xpath, expected in expected_xmp.items():
        if text_at(xpath) != expected:
            raise RuntimeError(f"saved XMP metadata mismatch for {xpath}")
    return xmp_bytes


def main() -> None:
    args = parse_args()
    if pypdf.__version__ != "6.10.0":
        raise RuntimeError(
            f"pypdf 6.10.0 required, found {pypdf.__version__}; "
            "the postprocessor relies on version-specific object APIs"
        )
    metadata_date = date.fromisoformat(args.metadata_date)
    pdf_date = f"D:{metadata_date.strftime('%Y%m%d')}000000Z"
    producer = "Chromium/Skia PDF; PDF/UA-Prüfvorbereitung mit pypdf"
    pdf_path = args.pdf.resolve()
    if not pdf_path.is_file():
        raise FileNotFoundError(pdf_path)
    original_mode = pdf_path.stat().st_mode & 0o777

    temporary_path: Path | None = None
    try:
        reader = PdfReader(pdf_path)
        writer = PdfWriter(clone_from=reader)
        writer.pdf_header = "%PDF-1.7"

        add_wrap_spaces(writer)
        intermediate = BytesIO()
        writer.write(intermediate)
        intermediate.seek(0)
        reader = PdfReader(intermediate)
        text_by_mcid = extract_mcid_text(reader)
        writer = PdfWriter(clone_from=reader)
        writer.pdf_header = "%PDF-1.7"

        writer.add_metadata(
            {
                "/Title": args.title,
                "/Author": args.creator,
                "/Subject": args.description,
                "/Keywords": "Angehörige, Borderline, Psychoedukation, PUK Zürich",
                "/Creator": args.creator_tool,
                "/Producer": producer,
                "/CreationDate": pdf_date,
                "/ModDate": pdf_date,
            }
        )
        writer.xmp_metadata = xmp_packet(args)
        metadata_stream = resolve(writer.root_object["/Metadata"])
        metadata_stream[NameObject("/Type")] = NameObject("/Metadata")
        metadata_stream[NameObject("/Subtype")] = NameObject("/XML")

        repair_list_structure(writer, text_by_mcid)
        artifact_specs: dict[int, dict[int, ArtifactSpec]] = {}
        repair_semantic_structure(writer, text_by_mcid, artifact_specs)
        repair_outline_titles(writer, text_by_mcid)
        tree = resolve(writer.root_object["/StructTreeRoot"])
        clear_artifact_parent_tree(tree, artifact_specs)
        mark_artifact_content(writer, artifact_specs)

        with tempfile.NamedTemporaryFile(
            prefix=f".{pdf_path.stem}-",
            suffix=".pdf",
            dir=pdf_path.parent,
            delete=False,
        ) as temporary_file:
            temporary_path = Path(temporary_file.name)
        writer.write(temporary_path)

        verified = PdfReader(temporary_path)
        assert_structure(verified, args.title)
        xmp_bytes = assert_metadata(verified, args, pdf_date, producer)
        has_identifier = b"<pdfuaid:part>1</pdfuaid:part>" in xmp_bytes
        if has_identifier != args.pdf_ua_candidate:
            raise RuntimeError(
                "saved PDF/UA identifier does not match the requested mode"
            )

        os.chmod(temporary_path, original_mode)
        os.replace(temporary_path, pdf_path)
        temporary_path = None
    finally:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
