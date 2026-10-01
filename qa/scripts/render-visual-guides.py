"""Draw three A4 visual guides from learningGuides.json.

Illustrations are original vector drawings. Text remains searchable; visual copy
is deliberately shorter than the full web text. No clinical sign-off is implied.
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json, math, hashlib
import fitz
from PIL import Image
from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfdoc import PDFString
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'client/public/infografiken'
TMP=ROOT/'tmp/pdfs/visual-guides'
DATA=ROOT/'client/src/content/learningGuides.json'
W,H=A4
BLUE=HexColor('#3155DC'); BRIGHT=HexColor('#3C64FF'); INK=HexColor('#222222')
MUTED=HexColor('#505C70'); WASH=HexColor('#EFF3FF'); PALE=HexColor('#DBE5FF')
LINE=HexColor('#C2D0F2'); LIGHT=HexColor('#F7F9FF')
M=38; CW=W-2*M
for name,file in [('Rubik','Rubik-Regular.ttf'),('RubikMedium','Rubik-Medium.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(ROOT/'client/public/fonts'/file)))
pdfmetrics.registerFontFamily('Rubik',normal='Rubik',bold='RubikMedium')

class Page:
    def __init__(self,c): self.c=c; self.text_boxes=[]
    def text(self,text,x,top,width,size=13,leading=None,bold=False,color=INK,max_height=None,align=0):
        style=ParagraphStyle('copy',fontName='RubikMedium' if bold else 'Rubik',fontSize=size,leading=leading or size*1.28,textColor=color,alignment=align)
        p=Paragraph(escape(text).replace('\n','<br/>'),style)
        _,height=p.wrap(width,H)
        if max_height is not None and height>max_height+.01:
            raise ValueError(f'Text too tall ({height:.1f}>{max_height}): {text}')
        if x<25 or x+width>W-25 or top<20 or top+height>H-20:
            raise ValueError(f'Text outside safe page area: {text}')
        for x0,t0,x1,t1,previous in self.text_boxes:
            if min(x+width,x1)-max(x,x0)>.5 and min(top+height,t1)-max(top,t0)>.5:
                raise ValueError(f'Overlapping text: {previous} / {text}')
        p.drawOn(self.c,x,H-top-height)
        self.text_boxes.append((x,top,x+width,top+height,text))
        return height
    def box(self,x,top,width,height,fill=WASH,stroke=None,r=12):
        self.c.setFillColor(fill or white);self.c.setStrokeColor(stroke or fill or white)
        self.c.setLineWidth(.8);self.c.roundRect(x,H-top-height,width,height,r,fill=1,stroke=bool(stroke))
    def line(self,x1,t1,x2,t2,color=LINE,width=1):
        self.c.setStrokeColor(color);self.c.setLineWidth(width);self.c.line(x1,H-t1,x2,H-t2)
    def circle(self,x,top,r,fill=BLUE,stroke=None):
        self.c.setFillColor(fill);self.c.setStrokeColor(stroke or fill);self.c.circle(x,H-top,r,fill=1,stroke=bool(stroke))
    def art(self,fn,x,top,width,height):
        self.c.saveState();self.c.translate(x,H-top-height);self.c.scale(width/140,height/120)
        self.c.setLineWidth(2.4);self.c.setLineCap(1);self.c.setLineJoin(1);self.c.setStrokeColor(BLUE);self.c.setFillColor(PALE)
        fn(self.c);self.c.restoreState()

def path(c,points,fill=None,stroke=BLUE,width=2.4):
    p=c.beginPath()
    for kind,coords in points:
        getattr(p,kind)(*coords)
    c.setStrokeColor(stroke);c.setLineWidth(width)
    if fill is not None:c.setFillColor(fill)
    c.drawPath(p,fill=int(fill is not None),stroke=1)

def line(c,x1,y1,x2,y2,width=2.4,color=BLUE):
    c.setStrokeColor(color);c.setLineWidth(width);c.line(x1,y1,x2,y2)

def disk(c,x,y,r,fill=PALE,stroke=None):
    c.setFillColor(fill);c.setStrokeColor(stroke or fill);c.circle(x,y,r,fill=1,stroke=bool(stroke))

def rr(c,x,y,w,h,r=6,fill=white,stroke=BLUE):
    c.setFillColor(fill);c.setStrokeColor(stroke);c.setLineWidth(2.2);c.roundRect(x,y,w,h,r,fill=1,stroke=1)

def leaf(c,x,y,dx,dy):
    path(c,[('moveTo',(x,y)),('curveTo',(x+dx*.1,y+dy*.9,x+dx*.7,y+dy*1.2,x+dx,y+dy)),('curveTo',(x+dx*.8,y+dy*.2,x+dx*.2,y-dy*.1,x,y))],PALE)

def plant(c,x=101,y=23,s=1):
    c.saveState();c.translate(x,y);c.scale(s,s)
    line(c,0,0,0,49,2.6);leaf(c,0,16,-23,20);leaf(c,0,31,24,20)
    c.restoreState()

def ground(c):
    c.setFillColor(PALE);c.ellipse(6,8,135,29,fill=1,stroke=0)
    line(c,16,22,128,22,1.5)

def room(c):
    disk(c,70,57,53,WASH)
    path(c,[('moveTo',(29,27)),('lineTo',(29,83)),('lineTo',(70,107)),('lineTo',(111,83)),('lineTo',(111,27))],None)
    rr(c,49,26,43,59,3,white)
    disk(c,81,54,2,BLUE)
    disk(c,61,66,6,PALE,BLUE)
    path(c,[('moveTo',(51,34)),('lineTo',(51,49)),('curveTo',(51,60,72,60,72,49)),('lineTo',(72,34))],PALE)
    line(c,21,26,118,26,2)
    # Open space beside the person, protected by the room rather than a prison.
    line(c,95,38,105,38,1.8);line(c,95,44,108,44,1.8)

def feelings(c):
    disk(c,72,59,52,WASH)
    path(c,[('moveTo',(28,69)),('curveTo',(13,110,66,116,70,87)),('curveTo',(81,115,130,100,114,70)),('curveTo',(102,53,82,40,70,31)),('curveTo',(53,42,37,55,28,69))],PALE)
    rr(c,8,15,52,31,9,white)
    path(c,[('moveTo',(23,17)),('lineTo',(19,8)),('lineTo',(34,17))],white)
    for x in [22,34,46]:disk(c,x,31,2,BLUE)
    rr(c,84,10,47,28,8,white)
    line(c,96,24,119,24,2.7)

def clock(c):
    disk(c,68,63,47,WASH)
    disk(c,64,62,37,white,BLUE)
    for i in range(12):
        a=math.radians(i*30);line(c,64+31*math.sin(a),62+31*math.cos(a),64+33*math.sin(a),62+33*math.cos(a),1.6)
    line(c,64,62,64,83,3);line(c,64,62,83,51,3);disk(c,64,62,3,BLUE)
    rr(c,98,14,26,49,4,PALE);line(c,107,20,115,20,1.3)
    path(c,[('moveTo',(33,106)),('curveTo',(15,91,13,66,20,48))],None,width=1.8)

def wallet(c):
    disk(c,72,56,51,WASH)
    rr(c,24,26,91,55,8,PALE)
    path(c,[('moveTo',(29,80)),('lineTo',(90,100)),('lineTo',(101,81))],white)
    rr(c,89,43,31,23,5,white);disk(c,99,54,2.6,BLUE)
    disk(c,36,30,13,white,BLUE);disk(c,57,23,13,white,BLUE)
    for x,y in [(36,30),(57,23)]:line(c,x-4,y,x+4,y,1.6);line(c,x,y-4,x,y+4,1.6)

def phone(c):
    disk(c,70,60,51,WASH);rr(c,41,12,56,96,9,white)
    rr(c,47,26,44,66,3,PALE);line(c,63,19,75,19,2);line(c,64,100,73,100,2)
    path(c,[('moveTo',(57,76)),('curveTo',(59,56,69,47,81,47)),('lineTo',(85,56)),('lineTo',(75,62)),('lineTo',(71,56)),('curveTo',(65,58,63,64,62,68)),('lineTo',(68,73)),('lineTo',(64,82)),('close',())],white,width=1.6)
    path(c,[('moveTo',(108,81)),('curveTo',(116,69,116,51,109,40))],None,width=2)
    path(c,[('moveTo',(28,81)),('curveTo',(20,69,20,51,27,40))],None,width=2)

def battery(c):
    disk(c,70,61,49,WASH)
    rr(c,19,42,91,41,5,white);rr(c,110,52,10,20,2,PALE)
    rr(c,25,48,19,29,2,PALE)
    line(c,42,25,57,18,2);line(c,91,25,75,18,2)

def quiet(c):
    disk(c,70,61,51,WASH);rr(c,46,12,51,93,7,white)
    rr(c,51,25,41,61,3,PALE);line(c,64,18,78,18,1.8)
    # Crescent moon on the silent screen.
    path(c,[('moveTo',(77,76)),('curveTo',(48,80,48,44,76,43)),('curveTo',(60,52,60,67,77,76))],white,width=1.7)
    line(c,14,30,34,30,2);line(c,19,39,34,39,2)

def listen(c):
    disk(c,70,61,51,WASH)
    path(c,[('moveTo',(46,45)),('curveTo',(27,54,32,96,60,98)),('curveTo',(94,100,100,65,78,49)),('curveTo',(68,44,77,26,60,22)),('curveTo',(50,21,45,28,46,34))],white)
    path(c,[('moveTo',(49,55)),('curveTo',(44,71,47,82,60,83)),('curveTo',(78,83,80,67,69,58)),('lineTo',(60,58)),('lineTo',(62,45))],None,width=2.3)
    for k in range(2):path(c,[('moveTo',(105+k*11,82)),('curveTo',(114+k*11,70,114+k*11,56,105+k*11,43))],None,width=1.8)

def water(c):
    ground(c);plant(c,104,22,.93)
    # A tilted can with spout and visible drops reaching the soil.
    rr(c,12,47,43,33,5,white)
    path(c,[('moveTo',(13,73)),('curveTo',(-1,93,27,104,33,80))],None)
    path(c,[('moveTo',(55,67)),('lineTo',(71,83)),('lineTo',(79,77)),('lineTo',(56,54))],PALE)
    line(c,73,83,83,73,3)
    for x,y in [(86,66),(93,57),(89,51)]:
        path(c,[('moveTo',(x,y+6)),('curveTo',(x-6,y,x-3,y-4,x,y-4)),('curveTo',(x+4,y-4,x+5,y,x,y+6))],PALE,width=1.4)
    leaf(c,30,23,-10,14)

def bench(c):
    ground(c)
    # Empty seat explicitly reserves room for the carer's own life.
    rr(c,24,51,77,31,4,white);line(c,30,60,95,60,1.5);line(c,30,71,95,71,1.5)
    rr(c,18,39,91,10,3,PALE);line(c,31,39,31,22,3);line(c,95,39,95,22,3)
    line(c,23,40,23,62,2.8);line(c,103,40,103,62,2.8)
    # Open book on the bench.
    path(c,[('moveTo',(55,48)),('lineTo',(54,67)),('curveTo',(60,70,67,67,70,64)),('curveTo',(77,69,83,69,87,68)),('lineTo',(88,48)),('curveTo',(80,50,74,50,70,47)),('curveTo',(64,50,60,50,55,48))],PALE,width=1.4)
    line(c,70,47,70,64,1.2)
    plant(c,119,24,.53)
    disk(c,25,99,9,white,BLUE)
    for a in [0,60,120,180]:
        rad=math.radians(a);line(c,25+14*math.cos(rad),99+14*math.sin(rad),25+18*math.cos(rad),99+18*math.sin(rad),1.3)

def growth(c):
    ground(c);plant(c,72,22,1.05)
    # Roots and weather show conditions beyond direct personal control.
    path(c,[('moveTo',(72,22)),('lineTo',(72,10)),('lineTo',(64,3))],None,width=1.4)
    line(c,72,15,84,8,1.4)
    disk(c,107,98,12,white,BLUE)
    for a in [0,45,90,135,180,225,270,315]:
        rad=math.radians(a);line(c,107+17*math.cos(rad),98+17*math.sin(rad),107+21*math.cos(rad),98+21*math.sin(rad),1.3)
    path(c,[('moveTo',(16,94)),('curveTo',(9,94,7,107,20,109)),('curveTo',(24,122,45,119,47,109)),('curveTo',(60,109,62,94,51,94)),('close',())],white,width=1.8)
    for x in [22,35,48]:line(c,x,86,x-3,80,1.5)

def header(p,v,series):
    p.text('ORIENTIERUNG FÜR ANGEHÖRIGE',M,30,420,9.2,bold=True,color=BLUE)
    p.text(series,W-95,30,57,9.2,color=BLUE,align=2)
    p.text(v['title'],M,55,CW,24.5,28.5,bold=True,color=BLUE,max_height=61)
    # All titles fit one line except deliberately composed garden line.
    p.text(v['subtitle'],M,92,CW,14,18,bold=True,max_height=36)
    p.text(v['opening'],M,122,CW,12.7,16.5,max_height=34)

def footer(p,data,ident):
    p.line(M,775,W-M,775)
    p.text(data['visual']['source'],M,783,CW,7.2,9,color=MUTED,max_height=20)
    p.text('C. Egger | Redaktioneller Stand: 23.09.2026 | Fachliche Freigabe ausstehend',M,810,CW-25,7.2,9,color=MUTED,max_height=10)
    p.text('1',W-M-15,810,15,7.2,9,color=MUTED,align=2)
    # Short human-readable destination; full accessible text remains online.
    p.c.linkURL('https://borderline-angehoerige.netlify.app/materialien', (M,20,W-M,45),relative=0,thickness=0)

def boundaries(p,d):
    v=d['visual'];header(p,v,'GRENZEN')
    gap=14;ww=(CW-gap)/2
    for i,(copy,fn) in enumerate(zip(v['cards'],[room,feelings,clock,wallet])):
        x=M+(ww+gap)*(i%2);t=174+237*(i//2)
        p.box(x,t,ww,222,LIGHT,LINE,13)
        p.art(fn,x+(ww-108)/2,t+6,108,79)
        p.text(copy['title'],x+15,t+91,ww-30,13.4,16.5,bold=True,color=BLUE,max_height=17)
        p.text(copy['body'],x+15,t+117,ww-30,12.3,15.3,max_height=46)
        p.text(copy['quote'],x+15,t+167,ww-30,12.8,16.2,bold=True,max_height=49)
    p.text(v['noteTitle'],M,653,CW,14,18,bold=True,color=BLUE,max_height=20)
    p.text(v['note'],M,680,CW,12.1,15.5,max_height=47)
    p.line(M,735,M+4,735,BLUE,4)
    p.text(v['safety'],M+14,731,CW-14,11.5,14.4,max_height=31)

def dear(p,d):
    v=d['visual'];header(p,v,'DEAR')
    # Connected letter markers establish a clear reading sequence.
    p.line(60,194,60,600,LINE,2.5)
    for i,(copy,fn) in enumerate(zip(v['cards'],[phone,battery,quiet,listen])):
        t=176+117*i
        p.box(85,t,W-M-85,107,LIGHT,LINE,11)
        p.circle(60,t+26,20,BLUE)
        p.text(copy['letter'],43,t+11,34,23,27,bold=True,color=white,align=1,max_height=30)
        p.art(fn,90,t+18,73,68)
        x=176;ww=W-M-x-15
        p.text(copy['title'],x,t+11,ww,14,17,bold=True,color=BLUE,max_height=18)
        p.text(copy['body'],x,t+35,ww,11.4,14.2,max_height=15)
        p.text(copy['quote'],x,t+57,ww,12.7,16.1,bold=True,max_height=49)
    p.text(v['noteTitle'],M,659,CW,14,18,bold=True,color=BLUE,max_height=20)
    p.text(v['note'],M,686,CW,12.1,15.5,max_height=32)
    p.text(v['safety'],M,734,CW,11.5,14.4,max_height=29)

def garden(p,d):
    v=d['visual'];header(p,v,'GARTEN')
    # Three garden scenes, not chronological stages or a causal recovery model.
    for i,(copy,fn) in enumerate(zip(v['cards'],[water,bench,growth])):
        t=178+156*i
        p.box(M,t,CW,143,LIGHT,None,14)
        p.art(fn,M+10,t+9,159,128)
        x=222;ww=W-M-x-15
        p.text(copy['title'],x,t+12,ww,14.3,18,bold=True,color=BLUE,max_height=37)
        body_top=t+43
        p.text(copy['body'],x,body_top,ww,12.5,16,max_height=49)
        p.text(copy['quote'],x,t+99,ww,12.5,16,bold=True,max_height=33)
    p.text(v['noteTitle'],M,665,CW,15,19,bold=True,color=BLUE,max_height=21)
    p.text(v['note'],M,695,CW,12.4,16,max_height=33)
    p.text(v['safety'],M,744,CW,10.1,12.7,color=MUTED,max_height=14)

DRAW={'4-arten-von-grenzen':boundaries,'dear':dear,'garten':garden}

def render(ident,data):
    OUT.mkdir(parents=True,exist_ok=True);TMP.mkdir(parents=True,exist_ok=True)
    stem='puk-'+ident+'-v1';target=OUT/(stem+'.pdf')
    c=canvas.Canvas(str(target),pagesize=A4,pageCompression=1,invariant=1)
    c.setTitle(data['visual']['title']+' '+data['visual']['subtitle'])
    c.setAuthor('C. Egger');c.setSubject('Visuelle Orientierung für Angehörige. Redaktionelle Fassung; fachliche Freigabe ausstehend.')
    c._doc.Catalog.Lang=PDFString('de-CH')
    p=Page(c);DRAW[ident](p,data);footer(p,data,ident);c.showPage();c.save()
    assert len(PdfReader(target,strict=True).pages)==1
    doc=fitz.open(target)
    assert len(doc)==1 and abs(doc[0].rect.width-W)<.1
    extracted=' '.join(doc[0].get_text().split())
    for card in data['visual']['cards']:
        assert card['title'] in extracted,card['title']
        assert ' '.join(card['quote'].split()) in extracted,card['quote']
    pix=doc[0].get_pixmap(matrix=fitz.Matrix(1.65,1.65),alpha=False)
    pix.save(str(TMP/(stem+'.png')))
    im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    im.save(OUT/(stem+'.webp'),format='WEBP',quality=92,method=6)
    im.thumbnail((400,600))
    im.save(OUT/'extras/thumbnails'/(stem+'.webp'),format='WEBP',quality=89,method=6)
    (TMP/(stem+'-text.txt')).write_text(doc[0].get_text())
    return {'id':ident,'pages':1,'words':len(extracted.split()),'pdfSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'sourceSha256':hashlib.sha256(json.dumps(data['visual'],sort_keys=True,ensure_ascii=False).encode()).hexdigest()}

if __name__=='__main__':
    data=json.loads(DATA.read_text())
    print(json.dumps([render(key,data[key]) for key in DRAW],indent=2,ensure_ascii=False))
