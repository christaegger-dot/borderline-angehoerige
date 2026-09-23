"""Render the three revised PDFs and previews from the same copy as the web text.

Run from the repository root with reportlab, PyMuPDF and Pillow installed.
An editorial export is not a clinical sign-off.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
import hashlib
import fitz
from PIL import Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'client/src/content/revisedHandouts.json'
OUT = ROOT / 'client/public/infografiken'
TMP = ROOT / 'tmp/pdfs/revised-handouts'
TMP.mkdir(parents=True, exist_ok=True)
for name, filename in [('Body', 'DejaVuSans.ttf'), ('Bold', 'DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/dejavu/' + filename))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold')
INK = HexColor('#26343A')
PLUM = HexColor('#5B3A4E')
WASH = HexColor('#F1F3EE')
RULE = HexColor('#D8DAD3')
W, H = A4
WIDTH = W - 80
STYLES = {
    'body': ParagraphStyle('body', fontName='Body', fontSize=10.5, leading=14.6, textColor=INK, spaceAfter=5),
    'label': ParagraphStyle('label', fontName='Bold', fontSize=9, leading=12, textColor=PLUM, spaceAfter=10),
    'title': ParagraphStyle('title', fontName='Bold', fontSize=25, leading=29, textColor=PLUM, spaceAfter=12),
    'summary': ParagraphStyle('summary', fontName='Body', fontSize=12, leading=17, textColor=INK, spaceAfter=11),
    'heading': ParagraphStyle('heading', fontName='Bold', fontSize=13, leading=17, textColor=PLUM, spaceAfter=7),
    'card': ParagraphStyle('card', fontName='Bold', fontSize=11.2, leading=15, textColor=PLUM, spaceAfter=6),
    'small': ParagraphStyle('small', fontName='Body', fontSize=8, leading=10.5, textColor=INK),
}

def p(text, style='body'):
    return Paragraph(escape(text), STYLES[style])

def panel(flowables, width=WIDTH, color=WASH):
    table = Table([[flowables]], colWidths=[width])
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),color),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
    return table

def render(ident, data):
    stem = 'manus-' + ident + '-v3'
    story = [p(data['kicker'].upper(), 'label'), p(data['title'], 'title'), p(data['summary'], 'summary')]
    for line in data['intro']: story.append(p(line))
    story.append(Spacer(1, 6))
    for section in data['sections']:
        group = [p(section['title'], 'heading')]
        if 'intro' in section: group.append(p(section['intro']))
        if 'cards' in section:
            cards=section['cards']
            if ident == 'genesung-zahlen':
                # Each percentage stays with its definition, never an isolated figure.
                cells = [[p(c['title'],'card'),p(c['text'])] for c in cards]
                table = Table([[cells[0], '', cells[1]]], colWidths=[(WIDTH-12)/2,12,(WIDTH-12)/2])
                table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(0,0),WASH),('BACKGROUND',(2,0),(2,0),HexColor('#F4ECEF')),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
                group.append(table)
            else:
                for card in cards:
                    group.extend([p(card['title'],'card'),p(card['text']),Spacer(1,4)])
        for bullet in section.get('bullets', []):
            group.append(Paragraph('• '+escape(bullet), STYLES['body']))
        if section.get('calloutText'):
            group.append(panel([p(section['calloutTitle'],'card'),p(section['calloutText'])]))
        story.append(KeepTogether(group))
        story.append(Spacer(1,10))
    footer = data['sourceLine'] + '\n' + 'Dieses Blatt ersetzt keine persönliche Beratung oder Behandlung.'
    def decorate(canvas, doc):
        canvas.setTitle(data['title']); canvas.setAuthor('Christa Egger · Fachstelle Angehörigenarbeit')
        canvas.setStrokeColor(RULE); canvas.line(40,102,W-40,102)
        fp=p(footer,'small');fw,fh=fp.wrap(WIDTH,100);fp.drawOn(canvas,40,94-fh)
        canvas.setFillColor(PLUM);canvas.setFont('Body',7.8)
        canvas.drawString(40,28,data['standLine'])
        canvas.drawRightString(W-40,16,str(doc.page))
    target=OUT/(stem+'.pdf')
    doc=SimpleDocTemplate(str(target),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=32,bottomMargin=118,pageCompression=1,invariant=1)
    doc.build(story,onFirstPage=decorate,onLaterPages=decorate)
    pdf=fitz.open(target)
    if len(pdf)!=1: raise RuntimeError(f'{ident}: expected one page, got {len(pdf)}')
    pix=pdf[0].get_pixmap(matrix=fitz.Matrix(1.75,1.75))
    pix.save(str(TMP/(stem+'.png')))
    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    im.save(OUT/(stem+'.webp'),format='WEBP',quality=87,method=6)
    im.thumbnail((400,600))
    im.save(OUT/'extras/thumbnails'/(stem+'.webp'),format='WEBP',quality=82,method=6)
    text=' '.join(pdf[0].get_text().split())
    for section in data['sections']:
        assert section['title'] in text
    return {'id':ident,'stem':stem,'pages':len(pdf),'sourceSha256':hashlib.sha256(DATA.read_bytes()).hexdigest(),'pdfSha256':hashlib.sha256(target.read_bytes()).hexdigest()}

if __name__ == '__main__':
    result=[render(ident,data) for ident,data in json.loads(DATA.read_text()).items()]
    print(json.dumps(result,ensure_ascii=False,indent=2))
