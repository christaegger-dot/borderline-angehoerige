import SEO from "@/components/SEO";
/**
 * Soforthilfe-Seite – überarbeitet gemäss Auftrag 2026-03-09
 *
 * Struktur:
 *   BLOCK 1 (ROT)    – Lebensgefahr: 144 / 117 / 112
 *   BLOCK 2 (ORANGE) – Akute psychiatrische Krise: PUK 24/7 (altersdifferenziert)
 *   BLOCK 3 (GRÜN)   – Jemand zum Reden / Entlastung: 143, Elternnotruf, 147
 *   BLOCK 4 (SPEZIAL)– Vergiftung: 145 Tox Info Suisse
 *   BLOCK 5 (GRAU)   – Weitere Kontakte (nachrangig): Ärztefon, PUK Zentrale
 *
 * Korrekturen:
 *   - 143 NICHT als "kostenlos" bezeichnet → "anonym, vertraulich"
 *   - KIZ (058 384 65 00) nur nachrangig, NICHT als Haupt-CTA
 *   - PUK Zentrale (058 384 21 11) nur in "Weitere Kontakte"
 *   - 145 Tox Info Suisse als eigener Block sichtbar
 *   - Floating-Button und Scroll-Button überdecken keine Nummern mehr
 */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Phone,
  AlertTriangle,
  Clock,
  Baby,
  User,
  Users,
  Shield,
  Heart,
  Pill,
  Info,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { kontaktByIdStrict } from "@/data/kontakte";

// ─── Sticky Ampel-Leiste ──────────────────────────────────

function StickyAmpelLeiste() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = [
    {
      id: "block-rot",
      label: "Lebensgefahr",
      sub: "144 · 117 · 112",
      bg: "var(--color-sos-rot)",
    },
    {
      id: "block-orange",
      label: "Psychiatr. Krise",
      sub: "PUK 24/7",
      bg: "var(--color-sos-orange-text)",
    },
    {
      id: "block-gruen",
      label: "Jemand zum Reden",
      sub: "143",
      bg: "var(--color-sos-gruen-text)",
    },
  ] as const;

  return (
    <div
      className={`sticky top-16 md:top-20 z-40 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      style={{ marginBottom: 0 }}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container">
          <div className="flex gap-1.5 py-2">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-label={`Zu Abschnitt: ${item.label}`}
                className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-white font-medium text-[10px] sm:text-sm transition-all hover:brightness-90 active:scale-[0.97] shadow-sm min-h-[44px]"
                style={{ backgroundColor: item.bg }}
              >
                <span className="font-semibold leading-tight text-center">
                  {item.label}
                </span>
                <span className="text-white/80 text-[10px] sm:text-xs leading-tight">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grosse Notruf-Karte (ROT) ───────────────────────────

function NotfallKarte({
  nummer,
  label,
  hinweis,
  tel,
}: {
  nummer: string;
  label: string;
  hinweis: string;
  tel: string;
}) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 transition-all border border-white/20 group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-white text-xl sm:text-2xl leading-none mb-0.5">
            {nummer}
          </p>
          <p className="text-white/90 font-semibold text-sm">{label}</p>
          <p className="text-white/70 text-xs leading-snug mt-0.5">{hinweis}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
        <Phone className="w-5 h-5 text-white" />
      </div>
    </a>
  );
}

// ─── PUK-Karte (ORANGE) ──────────────────────────────────

function PukKarte({
  nummer,
  label,
  fuerWen,
  tel,
  icon,
}: {
  nummer: string;
  label: string;
  fuerWen: string;
  tel: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-sos-orange-border hover:border-sos-orange-border-h hover:shadow-md active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sos-orange-light flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-sos-orange-text mb-0.5">
            {fuerWen}
          </p>
          <p className="font-bold text-foreground text-lg sm:text-xl leading-none mb-0.5">
            {nummer}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
            {label}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sos-orange-light flex items-center justify-center group-hover:bg-sos-orange-border transition-all">
        <Phone className="w-5 h-5 text-sos-orange-text" />
      </div>
    </a>
  );
}

// ─── Grüne Karte (Entlastung) ─────────────────────────────

function EntlastungKarte({
  nummer,
  label,
  hinweis,
  tel,
  badge,
}: {
  nummer: string;
  label: string;
  hinweis: string;
  tel: string;
  badge?: string;
}) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-sos-gruen-border hover:border-sos-gruen-border-h hover:shadow-md active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sos-gruen-light flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-sos-gruen-text" />
        </div>
        <div className="min-w-0">
          {badge && (
            <span className="inline-block text-[10px] font-semibold text-sos-gruen-text bg-sos-gruen-light rounded px-1.5 py-0.5 mb-0.5">
              {badge}
            </span>
          )}
          <p className="font-bold text-foreground text-lg sm:text-xl leading-none mb-0.5">
            {nummer}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">
            {label}
          </p>
          <p className="text-muted-foreground text-xs leading-snug mt-0.5">
            {hinweis}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sos-gruen-light flex items-center justify-center group-hover:bg-sos-gruen-border transition-all">
        <Phone className="w-5 h-5 text-sos-gruen-text" />
      </div>
    </a>
  );
}

// ─── Soforthilfe-Seite ────────────────────────────────────

export default function Notfall() {
  const rot144 = kontaktByIdStrict("ROT_144");
  const rot117 = kontaktByIdStrict("ROT_117");
  const rot112 = kontaktByIdStrict("ROT_112");
  const pukKjp = kontaktByIdStrict("GELB_PUK_KJP");
  const pukErw = kontaktByIdStrict("GELB_PUK_ERW");
  const puk65 = kontaktByIdStrict("GELB_PUK_65");
  const gruen143 = kontaktByIdStrict("GRUEN_143");
  const gruenEltern = kontaktByIdStrict("GRUEN_ELTERN");
  const gruen147 = kontaktByIdStrict("GRUEN_147");
  const rot145 = kontaktByIdStrict("ROT_145");
  const infoAerztefon = kontaktByIdStrict("INFO_AERZTEFON");
  const infoPukZentrale = kontaktByIdStrict("INFO_PUK_ZENTRALE");
  const infoFachstelle = kontaktByIdStrict("INFO_FACHSTELLE");
  const infoKiz = kontaktByIdStrict("INFO_KIZ");

  return (
    <Layout>
      <SEO
        title="Soforthilfe"
        description="Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz – wenn sofortiges Handeln erforderlich ist."
        path="/soforthilfe"
      />

      {/* ═══ HERO ═══ */}
      <section className="py-6 md:py-16 bg-gradient-to-b from-sos-rot-wash to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-sos-rot flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-sos-rot uppercase tracking-wide">
                Soforthilfe
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Soforthilfe bei akuter Gefahr
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz –
              wenn sofortiges Handeln erforderlich ist.
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-5 bg-muted/40 px-3 py-1.5 rounded-full border border-border/50">
              <Info className="w-3.5 h-3.5 shrink-0" />
              Gilt für die <strong className="text-foreground">
                Schweiz
              </strong>{" "}
              (Schwerpunkt Kanton Zürich) — nicht für Deutschland oder
              Österreich.
            </p>

            <div className="p-4 rounded-xl bg-sos-amber-wash border border-sos-amber-border">
              <p className="text-sm text-sos-amber-dark leading-snug">
                <strong>Diese Seite ist für akute Gefahrensituationen.</strong>{" "}
                Für emotionale Krisen ohne akute Gefahr besuchen Sie die Seite{" "}
                <Link
                  href="/unterstuetzen/krise"
                  className="text-terracotta-mid hover:underline font-semibold"
                >
                  «In der Krise unterstützen» →
                </Link>
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-4 print:hidden">
              Nummern im Voraus notieren?{" "}
              <Link
                href="/notfallkarte"
                className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
              >
                Persönliche Notfallkarte →
              </Link>{" "}
              · Situation einschätzen?{" "}
              <Link
                href="/wegweiser"
                className="text-sage-dark underline underline-offset-2 hover:text-sage-mid"
              >
                Situations-Wegweiser →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ STICKY AMPEL ═══ */}
      <StickyAmpelLeiste />

      {/* ═══ INHALT ═══ */}
      <section className="py-6 md:py-12 pb-32 sm:pb-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* ─── BLOCK 1: LEBENSGEFAHR (ROT) ─── */}
            <motion.div
              id="block-rot"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-rot">
                <div className="flex items-center gap-3 mb-1">
                  <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Lebensgefahr – sofort handeln
                  </h2>
                </div>
                <p className="text-white/85 text-sm leading-snug ml-9">
                  Bei akuter Suizidgefahr, schwerer Selbstverletzung, Gewalt
                  oder unmittelbarer Bedrohung.
                </p>
              </div>

              {/* Nummern */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-sos-rot-body">
                <NotfallKarte
                  nummer={rot144.nummer}
                  label={rot144.label}
                  hinweis={rot144.hinweis}
                  tel={rot144.tel}
                />
                <NotfallKarte
                  nummer={rot117.nummer}
                  label={rot117.label}
                  hinweis={rot117.hinweis}
                  tel={rot117.tel}
                />
                <NotfallKarte
                  nummer={rot112.nummer}
                  label={rot112.label}
                  hinweis={rot112.hinweis}
                  tel={rot112.tel}
                />
              </div>

              {/* Merksatz */}
              <div className="px-5 py-3 sm:px-6 bg-sos-rot/20 border-t border-white/10">
                <p className="text-white text-xs sm:text-sm leading-snug">
                  <strong>Merke:</strong> Bei akuter Selbst- oder
                  Fremdgefährdung zuerst <strong>144 / 117 / 112</strong>{" "}
                  wählen. Wenn Sie unsicher sind, lassen Sie sich dort oder
                  durch eine psychiatrische Fachstelle sofort zum weiteren
                  Vorgehen anleiten.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 2: PSYCHIATRISCHE KRISE (ORANGE) ─── */}
            <motion.div
              id="block-orange"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-md border border-sos-orange-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-orange-wash border-b border-sos-orange-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-orange flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-sos-orange-dark">
                    Akute psychiatrische Krise
                  </h2>
                </div>
                <p className="text-sos-orange-mid text-sm leading-snug ml-11">
                  Schwere psychische Krise, starke Eskalation oder massiver
                  Kontrollverlust – aber{" "}
                  <strong>keine unmittelbare Lebensgefahr</strong>.
                </p>
              </div>

              {/* PUK-Karten */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <p className="text-sm text-muted-foreground mb-1">
                  Kontaktieren Sie die PUK Zürich – rund um die Uhr, 24/7:
                </p>

                <PukKarte
                  nummer={pukErw.nummer}
                  label="PUK Erwachsene (24/7)"
                  fuerWen="Erwachsene 18–64 Jahre"
                  tel={pukErw.tel}
                  icon={
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <PukKarte
                  nummer={pukKjp.nummer}
                  label="PUK Kinder & Jugendliche (24/7)"
                  fuerWen="Kinder & Jugendliche bis 18 Jahre"
                  tel={pukKjp.tel}
                  icon={
                    <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <PukKarte
                  nummer={puk65.nummer}
                  label="PUK Erwachsene ab 65 (24/7)"
                  fuerWen="Erwachsene ab 65 Jahren"
                  tel={puk65.tel}
                  icon={
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
              </div>

              {/* Hinweis */}
              <div className="px-5 py-3 sm:px-6 bg-sos-orange-wash border-t border-sos-orange-light">
                <p className="text-sos-orange-mid text-xs sm:text-sm leading-snug">
                  Am Telefon erfolgt eine kurze Einschätzung, was jetzt am
                  besten hilft.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 3: JEMAND ZUM REDEN (GRÜN) ─── */}
            <motion.div
              id="block-gruen"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-md border border-sos-gruen-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-gruen-wash border-b border-sos-gruen-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-gruen flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-sos-gruen-dark">
                    Jemand zum Reden / Entlastung
                  </h2>
                </div>
                <p className="text-sos-gruen-mid text-sm leading-snug ml-11">
                  Für Gespräch, Entlastung und Orientierung –{" "}
                  <strong>kein Einsatz vor Ort</strong>, keine unmittelbare
                  Gefahr.
                </p>
              </div>

              {/* Karten */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <EntlastungKarte
                  nummer={gruen143.nummer}
                  label="Dargebotene Hand"
                  hinweis="Anonym, vertraulich – Gesprächs- und Krisenangebot"
                  tel={gruen143.tel}
                  badge="24/7"
                />
                <EntlastungKarte
                  nummer={gruenEltern.nummer}
                  label="Elternnotruf"
                  hinweis="Beratung für Eltern – anonym, vertraulich"
                  tel={gruenEltern.tel}
                  badge="24/7 · Für Eltern"
                />
                <EntlastungKarte
                  nummer={gruen147.nummer}
                  label="Pro Juventute"
                  hinweis="Beratung für Kinder und Jugendliche – vertraulich"
                  tel={gruen147.tel}
                  badge="24/7 · Für Kinder & Jugendliche"
                />
              </div>

              {/* Hinweis */}
              <div className="px-5 py-3 sm:px-6 bg-sos-gruen-wash border-t border-sos-gruen-light">
                <p className="text-sos-gruen-mid text-xs sm:text-sm leading-snug">
                  <strong>Bei akuter Gefahr:</strong> Immer zuerst{" "}
                  <strong>144 / 117 / 112</strong> rufen.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 4: SPEZIALFALL VERGIFTUNG ─── */}
            <motion.div
              id="block-spezial"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-sm border border-sos-lila-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-4 bg-sos-lila-wash border-b border-sos-lila-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sos-lila flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-sos-lila-dark">
                    Spezialfall: Vergiftung
                  </h2>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-5 bg-white">
                <a
                  href={`tel:${rot145.tel}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-sos-lila-wash border border-sos-lila-border hover:border-sos-lila-border-h hover:shadow-md active:scale-[0.98] transition-all group"
                  aria-label={`${rot145.label} anrufen: ${rot145.nummer}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sos-lila-light flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-sos-lila-text" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xl leading-none mb-0.5">
                        {rot145.nummer}
                      </p>
                      <p className="text-muted-foreground text-sm font-medium">
                        {rot145.label}
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {rot145.hinweis}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sos-lila-light flex items-center justify-center group-hover:bg-sos-lila-border transition-all">
                    <Phone className="w-5 h-5 text-sos-lila-text" />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* ─── BLOCK 5: WEITERE KONTAKTE (NACHRANGIG) ─── */}
            <motion.div
              id="block-weitere"
              className="scroll-mt-40 rounded-2xl overflow-hidden shadow-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-3 sm:px-6 sm:py-4 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-sm sm:text-base font-normal text-muted-foreground">
                    Weitere Kontakte
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 ml-7">
                  Allgemeine Beratung und Auskunft – nicht für akute Notfälle
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 space-y-3 bg-background">
                {/* Ärztefon */}
                <a
                  href={`tel:${infoAerztefon.tel}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
                  aria-label={`${infoAerztefon.label} anrufen: ${infoAerztefon.nummer}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {infoAerztefon.nummer}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoAerztefon.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoAerztefon.hinweis}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </a>

                {/* PUK Zentrale – explizit als Auskunft, nicht Notfall */}
                <a
                  href={`tel:${infoPukZentrale.tel}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
                  aria-label={`${infoPukZentrale.label} anrufen: ${infoPukZentrale.nummer}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {infoPukZentrale.nummer}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoPukZentrale.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Allgemeine Auskunft – kein Notfalldienst
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </a>

                {/* Fachstelle Angehörigenarbeit */}
                <a
                  href={`tel:${infoFachstelle.tel}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
                  aria-label={`${infoFachstelle.label} anrufen: ${infoFachstelle.nummer}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {infoFachstelle.nummer}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoFachstelle.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoFachstelle.hinweis}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </a>

                {/* KIZ – Kriseninterventionszentrum */}
                <a
                  href={`tel:${infoKiz.tel}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
                  aria-label={`${infoKiz.label} anrufen: ${infoKiz.nummer}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {infoKiz.nummer}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoKiz.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {infoKiz.hinweis}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* ─── WEITERFÜHREND ─── */}
            <motion.div
              className="rounded-2xl border border-border/50 bg-muted/30 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                Für die Zeit nach der Krise
              </h3>
              <div className="space-y-2">
                <Link
                  href="/wegweiser"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-[var(--color-sage-dark)]/30 hover:border-[var(--color-sage-dark)]/50 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground font-medium">
                    Situations-Wegweiser: «Was tun wenn…»
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--color-sage-dark)] transition-colors" />
                </Link>
                <Link
                  href="/unterstuetzen/krise"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">
                    Deeskalation und Krisenbegleitung
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
                <Link
                  href="/selbstfuersorge"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">
                    Selbstfürsorge für Angehörige
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
                <Link
                  href="/beratung"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">
                    Beratung und Selbsthilfegruppen
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
              </div>
            </motion.div>

            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diese Informationen ersetzen keine medizinische oder rechtliche
                Beratung. In akuten Gefahrensituationen zählt das sofortige
                Einbeziehen von Notruf und Fachpersonen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
