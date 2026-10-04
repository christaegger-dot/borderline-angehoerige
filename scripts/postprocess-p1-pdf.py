#!/usr/bin/env python3
"""Prepare one Chromium-generated P1 handout PDF for PDF/UA review.

The postprocessor adds synchronized XMP metadata, repairs Chromium's list
structure and maps source-specific vector groups to layout artifacts only after
a fail-closed operator check. Their semantic classification still requires the
manual Matterhorn review. The script does not add ``pdfuaid:part`` unless
explicitly requested for a non-public validation candidate. That identifier is
a conformance declaration, not a substitute for the complete manual PDF/UA and
Matterhorn review.
"""

from __future__ import annotations

import argparse
from datetime import date
import html
import os
from pathlib import Path
import tempfile
from xml.etree import ElementTree as ET

import pypdf
from pypdf import PdfReader, PdfWriter
from pypdf.generic import (
    ArrayObject,
    ContentStream,
    DictionaryObject,
    NameObject,
    NullObject,
    NumberObject,
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


def repair_list_structure(writer: PdfWriter) -> dict[int, set[int]]:
    tree = resolve(writer.root_object["/StructTreeRoot"])
    decorative_mcids: dict[int, set[int]] = {}

    for list_item in [
        node for node in iter_structure(tree) if str(node.get("/S")) == "/LI"
    ]:
        children = resolve(list_item.get("/K"))
        if isinstance(children, dict):
            role = str(children.get("/S"))
            if role == "/LBody":
                continue
            if role != "/NonStruct":
                raise RuntimeError(f"unexpected sole LI child role: {role}")
            children[NameObject("/S")] = NameObject("/LBody")
            continue
        if not isinstance(children, list):
            raise RuntimeError(
                f"unexpected LI /K type: {type(children).__name__}"
            )

        existing_roles = [
            str(resolve(child).get("/S"))
            for child in children
            if isinstance(resolve(child), dict)
        ]
        if existing_roles in (["/LBody"], ["/Lbl", "/LBody"]):
            continue
        if any(role in {"/Lbl", "/LBody"} for role in existing_roles):
            raise RuntimeError(f"malformed pre-existing LI roles: {existing_roles}")

        semantic_children = []
        direct_mcids = []
        for child_reference in children:
            child = resolve(child_reference)
            if isinstance(child, NumberObject):
                direct_mcids.append(int(child))
            else:
                semantic_children.append(child_reference)

        if direct_mcids:
            page = resolve(list_item.get("/Pg"))
            struct_parent = int(page.get("/StructParents"))
            decorative_mcids.setdefault(struct_parent, set()).update(direct_mcids)

        semantic_objects = [resolve(child) for child in semantic_children]
        first_role = (
            str(semantic_objects[0].get("/S"))
            if semantic_objects and isinstance(semantic_objects[0], dict)
            else None
        )
        is_numbered_step = first_role == "/NonStruct" and any(
            isinstance(child, dict) and str(child.get("/S")) in {"/H3", "/P"}
            for child in semantic_objects[1:]
        )

        if is_numbered_step:
            label_reference = semantic_children[0]
            semantic_objects[0][NameObject("/S")] = NameObject("/Lbl")
            body_children = ArrayObject(semantic_children[1:])
        else:
            label_reference = None
            body_children = ArrayObject(semantic_children)

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
            ([label_reference] if label_reference else []) + [body_reference]
        )

    for list_node in [
        node for node in iter_structure(tree) if str(node.get("/S")) == "/L"
    ]:
        list_children = resolve(list_node.get("/K"))
        if not isinstance(list_children, list):
            list_children = [list_children]
        ordered = False
        for list_item_reference in list_children:
            list_item = resolve(list_item_reference)
            if not isinstance(list_item, dict) or str(list_item.get("/S")) != "/LI":
                continue
            item_children = resolve(list_item.get("/K"))
            if not isinstance(item_children, list):
                item_children = [item_children]
            if item_children and str(resolve(item_children[0]).get("/S")) == "/Lbl":
                ordered = True
                break
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

    parent_tree_numbers = resolve(resolve(tree["/ParentTree"]).get("/Nums", []))
    for index in range(0, len(parent_tree_numbers), 2):
        key = int(parent_tree_numbers[index])
        parent_array = resolve(parent_tree_numbers[index + 1])
        for mcid in decorative_mcids.get(key, set()):
            parent_array[mcid] = NullObject()

    return decorative_mcids


def mark_decorative_content(
    writer: PdfWriter, decorative_mcids: dict[int, set[int]]
) -> None:
    for page in writer.pages:
        struct_parent = int(page.get("/StructParents"))
        targets = decorative_mcids.get(struct_parent, set())
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
                    rewritten.append(
                        (
                            [
                                NameObject("/Artifact"),
                                DictionaryObject(
                                    {NameObject("/Type"): NameObject("/Layout")}
                                ),
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


def assert_structure(reader: PdfReader) -> None:
    catalog = resolve(reader.trailer["/Root"])
    metadata_stream = catalog.get("/Metadata")
    if metadata_stream is None:
        raise RuntimeError("saved PDF is missing its catalog XMP stream")
    metadata_stream = resolve(metadata_stream)
    if metadata_stream.get("/Type") != NameObject("/Metadata"):
        raise RuntimeError("saved XMP stream is missing /Type /Metadata")
    if metadata_stream.get("/Subtype") != NameObject("/XML"):
        raise RuntimeError("saved XMP stream is missing /Subtype /XML")

    tree = resolve(catalog["/StructTreeRoot"])
    for node in iter_structure(tree):
        role = str(node.get("/S"))
        if role == "/Aside":
            raise RuntimeError("saved PDF still contains the PDF 2.0 Aside role")
        if role == "/LI":
            children = resolve(node.get("/K"))
            child_list = children if isinstance(children, list) else [children]
            child_roles = [str(resolve(child).get("/S")) for child in child_list]
            if child_roles not in (["/LBody"], ["/Lbl", "/LBody"]):
                raise RuntimeError(
                    f"saved list item has invalid child roles: {child_roles}"
                )


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

        decorative_mcids = repair_list_structure(writer)
        mark_decorative_content(writer, decorative_mcids)

        with tempfile.NamedTemporaryFile(
            prefix=f".{pdf_path.stem}-",
            suffix=".pdf",
            dir=pdf_path.parent,
            delete=False,
        ) as temporary_file:
            temporary_path = Path(temporary_file.name)
        writer.write(temporary_path)

        verified = PdfReader(temporary_path)
        assert_structure(verified)
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
