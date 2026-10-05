#!/usr/bin/env python3
"""Add synchronized Info/XMP metadata without claiming PDF/UA conformance."""

from __future__ import annotations

import argparse
from datetime import date
import html
from pathlib import Path
import tempfile

import pypdf
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--description", required=True)
    parser.add_argument("--metadata-date", required=True)
    return parser.parse_args()


def xmp_packet(args: argparse.Namespace) -> bytes:
    stamp = f"{date.fromisoformat(args.metadata_date).isoformat()}T00:00:00Z"
    title = html.escape(args.title)
    description = html.escape(args.description)
    creator = "Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich"
    creator_xml = html.escape(creator)
    packet = f'''<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="pypdf {pypdf.__version__}">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:pdf="http://ns.adobe.com/pdf/1.3/"
   xmlns:xmp="http://ns.adobe.com/xap/1.0/">
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">{title}</rdf:li></rdf:Alt></dc:title>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">{description}</rdf:li></rdf:Alt></dc:description>
   <dc:creator><rdf:Seq><rdf:li>{creator_xml}</rdf:li></rdf:Seq></dc:creator>
   <dc:language><rdf:Bag><rdf:li>de-CH</rdf:li></rdf:Bag></dc:language>
   <pdf:Producer>Chromium/Skia PDF; Metadaten mit pypdf</pdf:Producer>
   <pdf:Keywords>Angehörige, Borderline, Psychoedukation, PUK Zürich</pdf:Keywords>
   <xmp:CreatorTool>Playwright/Chromium</xmp:CreatorTool>
   <xmp:CreateDate>{stamp}</xmp:CreateDate>
   <xmp:ModifyDate>{stamp}</xmp:ModifyDate>
   <xmp:MetadataDate>{stamp}</xmp:MetadataDate>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''
    return packet.encode("utf-8")


def main() -> None:
    args = parse_args()
    source = args.pdf.resolve()
    reader = PdfReader(source)
    writer = PdfWriter(clone_from=reader)
    parsed_date = date.fromisoformat(args.metadata_date)
    pdf_date = f"D:{parsed_date.strftime('%Y%m%d')}000000Z"
    writer.add_metadata(
        {
            "/Title": args.title,
            "/Author": "Fachstelle Angehörigenarbeit · Psychiatrische Universitätsklinik Zürich",
            "/Subject": args.description,
            "/Keywords": "Angehörige, Borderline, Psychoedukation, PUK Zürich",
            "/Creator": "Playwright/Chromium",
            "/Producer": "Chromium/Skia PDF; Metadaten mit pypdf",
            "/CreationDate": pdf_date,
            "/ModDate": pdf_date,
        }
    )
    writer.xmp_metadata = xmp_packet(args)
    metadata = writer.root_object["/Metadata"].get_object()
    metadata[NameObject("/Type")] = NameObject("/Metadata")
    metadata[NameObject("/Subtype")] = NameObject("/XML")

    with tempfile.NamedTemporaryFile(
        prefix=f".{source.name}.", suffix=".tmp", dir=source.parent, delete=False
    ) as temporary:
        temporary_path = Path(temporary.name)
        writer.write(temporary)
    temporary_path.replace(source)


if __name__ == "__main__":
    main()
