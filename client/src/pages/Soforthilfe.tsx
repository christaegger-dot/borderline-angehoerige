import SEO from "@/components/SEO";
/**
 * Soforthilfe-Seite
 * Alle Kontakte aus @/data/kontakte.ts (Single Source of Truth).
 * Reihenfolge: ROT → GELB → GRÜN → INFO → Online → Krisensituationen → Krisenplan
 */
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, AlertTriangle, ExternalLink, Clock, Baby, User, Users, ChevronDown, Shield, Heart, Hand, MessageCircle, CheckCircle2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  WEBSITE_ROT,
  GELB,
  GRUEN,
  INFO,
  TEXTE,
  ADRESSEN,
  URLS,
  kontaktById,
  urlById,
  type Kontakt,
} from "@/data/kontakte";

// ─── Farben pro Kategorie ────────────────────────────────

const FARBEN = {
  rot: {
    bg: "var(--color-alert)",
    bgLight: "var(--color-alert-wash)",
    border: "var(--color-alert)",
    hover: "var(--color-alert)",
  },
  gelb: {
    bg: "var(--color-terracotta-mid)",
    bgLight: "var(--color-sand)",
    border: "var(--color-sand-accent)",
    hover: "var(--color-terracotta-mid)",
  },
  gruen: {
    bg: "var(--color-sage-mid)",
    bgLight: "var(--color-sage-pale)",
    border: "var(--color-sage-mid)",
    hover: "var(--color-sage-mid)",
  },
  info: {
    bg: "var(--color-terracotta-mid)",
    bgLight: "var(--color-slate-pale)",
    border: "var(--color-slate-mid)",
    hover: "var(--color-slate-mid)",
  },
} as const;

// ─── Wiederverwendbare Kontakt-Karte ─────────────────────

function KontaktButton({ kontakt }: { kontakt: Kontakt }) {
  const farbe = FARBEN[kontakt.kategorie];
  return (
    <a href={`tel:${kontakt.tel}`}>
      <Button
        size="lg"
        className="font-bold text-lg"
        style={{ backgroundColor: farbe.bg }}
      >
        <Phone className="w-4 h-4 mr-2" />
        {kontakt.nummer}
      </Button>
    </a>
  );
}

function KontaktKarte({ kontakt, icon }: { kontakt: Kontakt; icon?: React.ReactNode }) {
  const farbe = FARBEN[kontakt.kategorie];
  return (
    <Card style={{ borderColor: farbe.border }} className="border-l-4">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {icon && (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${farbe.bg}20` }}
            >
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{kontakt.label}</h3>
                <p className="text-muted-foreground text-sm">{kontakt.hinweis}</p>
              </div>
              <KontaktButton kontakt={kontakt} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── PUK-Karte mit Icon ──────────────────────────────────

const PUK_ICONS: Record<string, React.ReactNode> = {
  GELB_PUK_KJP: <Baby className="w-6 h-6 text-terracotta-mid" />,
  GELB_PUK_ERW: <User className="w-6 h-6 text-terracotta-mid" />,
  GELB_PUK_65: <Users className="w-6 h-6 text-terracotta-mid" />,
  GELB_KIZ: <AlertTriangle className="w-6 h-6 text-terracotta-mid" />,
};

// ─── Online-Ressourcen aus Master ────────────────────────

const ONLINE_RESSOURCEN = [
  { id: "URL_PROMENTE", beschreibung: "Beratung für psychisch Betroffene und Angehörige" },
  { id: "URL_STANDBYYOU", beschreibung: "Netzwerk für Angehörige von Menschen mit psychischen Erkrankungen" },
  { id: "URL_DEPRESS", beschreibung: "Verein zur Bewältigung von Depressionen" },
];

// ─── Sticky Ampel-Leiste ───────────────────────────────────────────

function StickyAmpelLeiste() {
  const [visible, setVisible] = useState(false);
  const rot144 = kontaktById("ROT_144")!;
  const rot117 = kontaktById("ROT_117")!;
  const rot112 = kontaktById("ROT_112")!;
  const gruen143 = kontaktById("GRUEN_143")!;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const ampelItems = [
    {
      id: "rot",
      label: "Lebensgefahr",
      sublabel: `${rot144.nummer} / ${rot117.nummer} / ${rot112.nummer}`,
      bg: "var(--color-alert)",
      hoverBg: "var(--color-alert)",
    },
    {
      id: "gelb",
      label: "Psychiatrische Krise",
      sublabel: "PUK 24/7",
      bg: "var(--color-terracotta-mid)",
      hoverBg: "var(--color-terracotta-mid)",
    },
    {
      id: "gruen",
      label: "Jemand zum Reden",
      sublabel: gruen143.nummer,
      bg: "var(--color-sage-mid)",
      hoverBg: "var(--color-sage-mid)",
    },
  ] as const;

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 shadow-md"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container py-2">
          <div className="flex flex-col sm:flex-row gap-2">
            {ampelItems.map((item) => (
                <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                style={{ backgroundColor: item.bg }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = item.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = item.bg)}
              >
                <span className="font-semibold">{item.label}</span>
                <span className="text-white text-xs hidden sm:inline">→ {item.sublabel}</span>
                <span className="text-white text-xs sm:hidden">({item.sublabel})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Soforthilfe-Seite ──────────────────────────────────────────────

export default function Notfall() {
  // Nummern für Fliesstext-Verweise in Krisensituationen
  const rot144 = kontaktById("ROT_144")!;
  const rot117 = kontaktById("ROT_117")!;
  const rot112 = kontaktById("ROT_112")!;

  // INFO-Kontakte für Soforthilfe (nur Ärztefon + PUK Zentrale)
  const soforthilfeInfo = INFO.filter(
    (k) => k.id === "INFO_AERZTEFON" || k.id === "INFO_PUK_ZENTRALE"
  );

  return (
    <Layout>
      <SEO title="Soforthilfe" description="Sofortige Hilfe in Krisensituationen – Notfallnummern und Handlungsanleitungen." path="/soforthilfe" />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-alert-light/50 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-alert flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Soforthilfe bei akuter Gefahr
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz – wenn sofortiges Handeln erforderlich ist.
            </p>
            
            <div className="p-4 rounded-xl bg-sand border border-sand-subtle">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Unterschied Notfall vs. Krise:</strong> Diese Seite ist für <strong>akute Gefahrensituationen</strong> (Suizidgefahr, Selbstverletzung, Gewalt). Für Deeskalationstechniken bei <strong>emotionalen Krisen ohne akute Gefahr</strong> besuchen Sie unsere Seite{" "}
                <Link href="/unterstuetzen/krise" className="text-terracotta-mid hover:underline font-medium">In der Krise unterstützen →</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Sticky Ampel-Leiste ═══ */}
      <StickyAmpelLeiste />

      {/* Content */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* ═══ ROT: Sofort-Hilfe (24/7) ═══ */}
            <div id="rot" className="scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Sofort-Hilfe (24/7)
              </h2>
              
              <div className="space-y-4">
                {WEBSITE_ROT.map((kontakt) => (
                  <Card key={kontakt.id} style={{ borderColor: FARBEN.rot.bg }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{kontakt.label}</h3>
                          <p className="text-muted-foreground text-sm">{kontakt.hinweis}</p>
                        </div>
                        <KontaktButton kontakt={kontakt} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            </div>

            {/* ═══ GELB: Psychiatrische Notdienste PUK Zürich (24/7) ═══ */}
            <div id="gelb" className="scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 flex items-center gap-3">
                <Clock className="w-8 h-8 text-sand-accent" />
                Psychiatrische Notdienste Kanton Zürich
              </h2>
              <p className="text-sm text-muted-foreground mb-6 ml-11">
                Wenn eine akute psychische Krise vorliegt, aber keine unmittelbare Lebensgefahr besteht.
              </p>
              
              {/* Info-Box: Was ist PUK? */}
              <Card className="border-l-4 border-sand-accent bg-sand mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">PUK Zürich – psychiatrische Notfallhilfe (24/7)</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {TEXTE.pukEinleitung}
                  </p>
                  <div className="p-3 rounded-md bg-sand-muted border border-sand-subtle">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Was passiert beim Anruf?</strong> {TEXTE.pukTriage}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Standort: {ADRESSEN[0].adresse}
                  </p>
                </CardContent>
              </Card>
              
              {/* Wahlhilfe: Für wen? */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm font-medium text-foreground">Für wen?</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-terracotta-wash text-terracotta-dark border border-terracotta/30">
                  <Baby className="w-3.5 h-3.5" /> bis 18
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-terracotta-wash text-terracotta-dark border border-terracotta/30">
                  <User className="w-3.5 h-3.5" /> ab 18
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-terracotta-wash text-terracotta-dark border border-terracotta/30">
                  <Users className="w-3.5 h-3.5" /> ab 65
                </span>
              </div>

              <div className="space-y-4">
                {GELB.map((kontakt) => (
                  <KontaktKarte
                    key={kontakt.id}
                    kontakt={kontakt}
                    icon={PUK_ICONS[kontakt.id]}
                  />
                ))}
              </div>

              {/* Beratung & Fachstellen (INFO, nur Soforthilfe-relevante) */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  Beratung & Fachstellen
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {soforthilfeInfo.map((kontakt) => (
                    <Card key={kontakt.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{kontakt.label}</p>
                            <p className="text-sm text-muted-foreground">{kontakt.hinweis}</p>
                          </div>
                          <a href={`tel:${kontakt.tel}`}>
                            <Button variant="outline" size="sm" className="font-bold border-slate-mid text-slate-dark hover:bg-slate-wash">
                              <Phone className="w-3.5 h-3.5 mr-1.5" />
                              {kontakt.nummer}
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            </div>

            {/* ═══ GRÜN: Zuhören & Entlastung ═══ */}
            <div id="gruen" className="scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-sage-mid" />
                Zuhören & Entlastung
              </h2>
              <p className="text-sm text-muted-foreground mb-3 ml-11">
                Kein Einsatzdienst – es kommt niemand vorbei. Für emotionale Unterstützung und Entlastung.
              </p>
              <div className="ml-11 mb-6 p-3 rounded-lg bg-alert-wash border border-alert-light">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Bei akuter Gefahr:</strong> Immer zuerst <strong>{rot144.nummer} / {rot117.nummer} / {rot112.nummer}</strong> rufen.
                </p>
              </div>
              
              <div className="space-y-4">
                {GRUEN.map((kontakt) => (
                  <Card key={kontakt.id} style={{ borderColor: FARBEN.gruen.border }} className="border-l-4">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{kontakt.label}</h3>
                          <p className="text-muted-foreground text-sm">{kontakt.hinweis}</p>
                        </div>
                        <KontaktButton kontakt={kontakt} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>


            </motion.div>

            </div>

            {/* ═══ Krisensituationen ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Was tun in konkreten Krisensituationen?
              </h2>
              <p className="text-muted-foreground mb-6">
                Klicken Sie auf eine Situation für konkrete Schritt-für-Schritt-Anleitungen.
              </p>
              
              <Accordion type="single" collapsible className="space-y-4">
                {/* Suiziddrohung */}
                <AccordionItem value="suizid" className="border rounded-lg border-alert bg-alert-wash">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-alert flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Suiziddrohung oder -gedanken</h3>
                        <p className="text-sm text-muted-foreground font-normal">«Ich will nicht mehr leben», «Ohne mich wärt ihr besser dran»</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-alert/10 rounded-lg border border-alert/30">
                        <p className="font-semibold text-alert-dark mb-2">Wichtig zu wissen:</p>
                        <p className="text-sm text-muted-foreground">Suiziddrohungen bei Borderline sind ernst zu nehmen, aber nicht immer ein akuter Notfall. Unterscheiden Sie zwischen chronischer Suizidalität (wiederkehrende Gedanken) und akuter Krise (konkrete Pläne, Mittel vorhanden).</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-alert text-white text-sm flex items-center justify-center">1</span>
                          Ruhe bewahren und zuhören
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Nehmen Sie die Äusserung ernst, ohne in Panik zu geraten</li>
                          <li>• Fragen Sie direkt: «Hast du konkrete Pläne, dir etwas anzutun?»</li>
                          <li>• Hören Sie zu, ohne zu urteilen oder zu beschwichtigen</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-alert text-white text-sm flex items-center justify-center">2</span>
                          Risiko einschätzen
                        </h4>
                        <div className="ml-8 grid sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-alert/5 rounded-lg">
                            <p className="font-medium text-alert-dark text-sm mb-1">Hohes Risiko → Notruf {rot144.nummer}</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• Konkrete Pläne vorhanden</li>
                              <li>• Mittel beschafft (Medikamente, etc.)</li>
                              <li>• Früherer Suizidversuch</li>
                              <li>• Abschiedsbriefe geschrieben</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-sage-mid/10 rounded-lg">
                            <p className="font-medium text-sage-dark text-sm mb-1">Moderates Risiko → Fachperson</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• Gedanken, aber keine Pläne</li>
                              <li>• Kann Gründe zum Leben nennen</li>
                              <li>• Ist ansprechbar und kooperativ</li>
                              <li>• Hat Therapeut/Psychiater</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-alert text-white text-sm flex items-center justify-center">3</span>
                          Handeln
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Bei hohem Risiko:</strong> Notruf {rot144.nummer} oder Polizei {rot117.nummer} – auch gegen den Willen der Person</li>
                          <li>• <strong>Bei moderatem Risiko:</strong> Therapeut/Psychiater kontaktieren, Krisenplan aktivieren</li>
                          <li>• Bleiben Sie bei der Person, bis professionelle Hilfe da ist</li>
                          <li>• Entfernen Sie wenn möglich Zugang zu Mitteln (Medikamente, scharfe Gegenstände)</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-sage-light/30 rounded-lg border border-sage-mid/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Validieren Sie das Leid, nicht die Lösung:</strong> «Ich höre, dass du gerade unglaublich leidest. Ich bin froh, dass du mir das sagst. Lass uns gemeinsam schauen, wie wir durch diese Nacht kommen.»
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Selbstverletzung */}
                <AccordionItem value="selbstverletzung" className="border rounded-lg border-terracotta-mid bg-cream">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-terracotta-mid flex items-center justify-center flex-shrink-0">
                        <Hand className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Selbstverletzung (Ritzen, Brennen, Schlagen)</h3>
                        <p className="text-sm text-muted-foreground font-normal">Akute Selbstverletzung oder Entdeckung von Verletzungen</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-terracotta-mid/10 rounded-lg border border-terracotta-mid/30">
                        <p className="font-semibold text-terracotta-dark mb-2">Wichtig zu verstehen:</p>
                        <p className="text-sm text-muted-foreground">Selbstverletzung ist meist <strong>kein</strong> Suizidversuch, sondern ein Versuch, unerträgliche emotionale Schmerzen zu regulieren. Sie dient oft dazu, Spannung abzubauen oder «wieder etwas zu fühlen».</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-terracotta-mid text-white text-sm flex items-center justify-center">1</span>
                          Sofortmassnahmen
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Bei starker Blutung oder tiefen Wunden:</strong> Notruf {rot144.nummer}</li>
                          <li>• Bei oberflächlichen Verletzungen: Wunde versorgen (reinigen, desinfizieren, verbinden)</li>
                          <li>• Ruhig bleiben – Ihre Panik verstärkt die Scham</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-terracotta-mid text-white text-sm flex items-center justify-center">2</span>
                          Kommunikation
                        </h4>
                        <div className="ml-8 grid sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-sage-mid/10 rounded-lg">
                            <p className="font-medium text-sage-dark text-sm mb-1">✓ Hilfreich</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• «Ich sehe, dass du leidest.»</li>
                              <li>• «Wie kann ich dir jetzt helfen?»</li>
                              <li>• «Lass uns die Wunde versorgen.»</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-terracotta-mid/10 rounded-lg">
                            <p className="font-medium text-alert-dark text-sm mb-1">✗ Vermeiden</p>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                              <li>• «Warum tust du dir das an?»</li>
                              <li>• «Das ist doch Erpressung!»</li>
                              <li>• «Denk doch mal an uns!»</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-terracotta-mid text-white text-sm flex items-center justify-center">3</span>
                          Nachsorge
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Therapeut/Psychiater zeitnah informieren</li>
                          <li>• Gemeinsam über Alternativen sprechen (Eiswürfel, rote Farbe, Sport)</li>
                          <li>• Nicht überwachen oder kontrollieren – das verstärkt Heimlichkeit</li>
                          <li>• Eigene Gefühle mit Fachperson besprechen</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Aggressive Eskalation */}
                <AccordionItem value="aggression" className="border rounded-lg border-slate-mid bg-slate-pale">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-slate-mid flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Aggressive Eskalation</h3>
                        <p className="text-sm text-muted-foreground font-normal">Schreien, Drohen, Werfen von Gegenständen, körperliche Gewalt</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-alert/10 rounded-lg border border-alert/30">
                        <p className="font-semibold text-alert-dark mb-2">Ihre Sicherheit geht vor!</p>
                        <p className="text-sm text-muted-foreground">Bei körperlicher Gewalt oder konkreten Drohungen: Verlassen Sie die Situation und rufen Sie die Polizei ({rot117.nummer}). Borderline erklärt Verhalten, entschuldigt es aber nicht.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-mid text-white text-sm flex items-center justify-center">1</span>
                          Deeskalieren (wenn sicher)
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Ruhig und langsam sprechen, Stimme senken</li>
                          <li>• Abstand halten, nicht in die Enge treiben</li>
                          <li>• Blickkontakt halten, aber nicht starren</li>
                          <li>• Offene Körperhaltung, Hände sichtbar</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-mid text-white text-sm flex items-center justify-center">2</span>
                          Kommunikation
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Validieren: «Ich sehe, dass du gerade extrem wütend bist.»</li>
                          <li>• Grenze setzen: «Ich möchte dir zuhören, aber nicht wenn du schreist.»</li>
                          <li>• Option geben: «Sollen wir 10 Minuten Pause machen?»</li>
                          <li>• Nicht argumentieren, rechtfertigen oder beschuldigen</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-mid text-white text-sm flex items-center justify-center">3</span>
                          Wenn Deeskalation nicht funktioniert
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• <strong>Ankündigen:</strong> «Ich gehe jetzt in ein anderes Zimmer. Wir können später weiterreden.»</li>
                          <li>• <strong>Gehen:</strong> Raum verlassen, Tür nicht abschliessen</li>
                          <li>• <strong>Bei Gewalt:</strong> Haus verlassen, Polizei {rot117.nummer} rufen</li>
                          <li>• <strong>Später:</strong> Im ruhigen Moment über Konsequenzen sprechen</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-sage-light/30 rounded-lg border border-sage-mid/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Merke:</strong> Sie müssen sich nicht anschreien oder bedrohen lassen. Das Verlassen einer eskalierenden Situation ist keine Bestrafung, sondern Selbstschutz und gibt beiden Zeit zur Regulation.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Emotionale Erpressung */}
                <AccordionItem value="erpressung" className="border rounded-lg border-sand-warm bg-cream">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-lg bg-sand-warm flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Emotionale Erpressung / Manipulation</h3>
                        <p className="text-sm text-muted-foreground font-normal">«Wenn du gehst, bringe ich mich um», «Du bist schuld, dass es mir so geht»</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2">
                      <div className="p-4 bg-sand-warm/10 rounded-lg border border-sand-warm/30">
                        <p className="font-semibold text-terracotta-dark mb-2">Wichtig zu verstehen:</p>
                        <p className="text-sm text-muted-foreground">Menschen mit Borderline manipulieren selten bewusst. Hinter solchen Äusserungen steckt meist extreme Verlassensangst und die verzweifelte Überzeugung, dass sie ohne Sie nicht überleben können.</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sand-warm text-white text-sm flex items-center justify-center">1</span>
                          Das Gefühl validieren, nicht die Forderung
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• «Ich höre, dass du gerade panische Angst hast, mich zu verlieren.»</li>
                          <li>• «Deine Angst ist real und ich nehme sie ernst.»</li>
                          <li>• <strong>Aber:</strong> «Ich kann nicht bleiben, weil du mir drohst.»</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sand-warm text-white text-sm flex items-center justify-center">2</span>
                          Klare Grenze setzen
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• «Ich bin nicht verantwortlich für deine Entscheidungen.»</li>
                          <li>• «Wenn du sagst, du bringst dich um, muss ich den Notruf rufen.»</li>
                          <li>• «Ich liebe dich, aber ich lasse mich nicht erpressen.»</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sand-warm text-white text-sm flex items-center justify-center">3</span>
                          Konsequent handeln
                        </h4>
                        <ul className="ml-8 space-y-1 text-sm text-muted-foreground">
                          <li>• Bei akuter Gefahr: Notruf {rot144.nummer} oder Polizei {rot117.nummer} oder {rot112.nummer} – jedes Mal</li>
                          <li>• Nicht nachgeben, um «Ruhe zu haben» – das verstärkt das Muster</li>
                          <li>• Später im ruhigen Moment besprechen, was passiert ist</li>
                          <li>• Eigene Therapie/Beratung in Anspruch nehmen</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-sage-light/30 rounded-lg border border-sage-mid/30">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Denken Sie daran:</strong> Sie können die Angst Ihres Angehörigen nicht wegnehmen, indem Sie Ihre eigenen Bedürfnisse aufgeben. Langfristig hilft nur, dass Ihr Angehöriger lernt, mit der Angst umzugehen – nicht, dass Sie sie vermeiden.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>


            {/* ═══ Notfallkarte zum Ausdrucken ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Notfallkarte zum Ausdrucken
              </h2>

              <Card className="bg-card border overflow-hidden">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Vorschau-Bild */}
                    <div className="md:w-1/3 bg-sand p-4 flex items-center justify-center">
                      <img
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mSoGIXZAiMAbFAFL.webp"
                        alt="Notfallkarte Zürich – Vorschau"
                        className="rounded-lg shadow-md max-h-64 w-auto"
                        width={400}
                        height={223}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Text + Download */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-center">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        Notfallkarte Zürich (PDF, A4)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Alle wichtigen Nummern auf einer Seite – zum Ausdrucken, Aufhängen oder Weitergeben.
                        Enthält die Ampel-Logik (ROT / GELB / GRÜN) und den Schnell-Entscheid.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/FTdjCPHRXUSxwbVS.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm text-white transition-colors"
                          style={{ backgroundColor: "var(--color-sage-mid)" }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          PDF herunterladen
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        Stand: 06.02.2026 · Version 04 · Quelle: pukzh.ch
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ═══ Online-Ressourcen & Beratung ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Online-Ressourcen & Beratung
              </h2>
              
              <div className="space-y-4">
                {ONLINE_RESSOURCEN.map((res) => {
                  const url = urlById(res.id);
                  if (!url) return null;
                  return (
                    <Card key={res.id} className="border-border/50 hover:border-terracotta transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{url.label}</h3>
                            <p className="text-muted-foreground text-sm">{res.beschreibung}</p>
                          </div>
                          <a href={url.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Website
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>


            {/* ═══ Persönlicher Krisenplan ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Persönlicher Krisenplan
              </h2>
              
              <Card className="bg-sage-light/20 border-sage">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Erstellen Sie gemeinsam mit Ihrem Angehörigen einen persönlichen Krisenplan. Dieser sollte enthalten:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Frühwarnzeichen einer Krise",
                      "Strategien, die in der Vergangenheit geholfen haben",
                      "Wichtige Telefonnummern (Therapeut, Arzt, Vertrauensperson)",
                      "Medikamenteninformationen",
                      "Was Sie als Angehöriger tun können – und was nicht"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-sage-mid">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* ═══ Hinweis ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-terracotta-wash border-terracotta">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Diese Seite ersetzt keine professionelle Beratung. Bei akuten Krisen wenden Sie sich bitte immer an die Notfallnummern oder den psychiatrischen Notdienst.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
