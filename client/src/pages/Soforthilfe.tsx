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
import { Phone, AlertTriangle, Clock, Baby, User, Users, Shield, Heart, Pill, Info, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  kontaktById,
} from "@/data/kontakte";

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
    { id: "block-rot",    label: "Lebensgefahr",         sub: "144 · 117 · 112",  bg: "#C0392B" },
    { id: "block-orange", label: "Psychiatr. Krise",      sub: "PUK 24/7",         bg: "#C67A5C" },
    { id: "block-gruen",  label: "Jemand zum Reden",      sub: "143",              bg: "#6B9E78" },
  ] as const;

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      style={{ marginBottom: 0 }}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container">
          <div className="flex gap-1.5 py-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-label={`Zu Abschnitt: ${item.label}`}
                className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-2 py-2 sm:py-2.5 rounded-lg text-white font-medium text-xs sm:text-sm transition-all hover:brightness-90 active:scale-[0.97] shadow-sm"
                style={{ backgroundColor: item.bg }}
              >
                <span className="font-semibold leading-tight text-center">{item.label}</span>
                <span className="text-white/80 text-[10px] sm:text-xs leading-tight">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grosse Notruf-Karte (ROT) ───────────────────────────

function NotfallKarte({ nummer, label, hinweis, tel }: { nummer: string; label: string; hinweis: string; tel: string }) {
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
          <p className="font-bold text-white text-xl sm:text-2xl leading-none mb-0.5">{nummer}</p>
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

function PukKarte({ nummer, label, fuerWen, tel, icon }: { nummer: string; label: string; fuerWen: string; tel: string; icon: React.ReactNode }) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-orange-200 hover:border-orange-400 hover:shadow-md active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-orange-700 mb-0.5">{fuerWen}</p>
          <p className="font-bold text-foreground text-lg sm:text-xl leading-none mb-0.5">{nummer}</p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-snug">{label}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-all">
        <Phone className="w-5 h-5 text-orange-700" />
      </div>
    </a>
  );
}

// ─── Grüne Karte (Entlastung) ─────────────────────────────

function EntlastungKarte({ nummer, label, hinweis, tel, badge }: { nummer: string; label: string; hinweis: string; tel: string; badge?: string }) {
  return (
    <a
      href={`tel:${tel}`}
      className="flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-green-200 hover:border-green-400 hover:shadow-md active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
        </div>
        <div className="min-w-0">
          {badge && (
            <span className="inline-block text-[10px] font-semibold text-green-700 bg-green-100 rounded px-1.5 py-0.5 mb-0.5">{badge}</span>
          )}
          <p className="font-bold text-foreground text-lg sm:text-xl leading-none mb-0.5">{nummer}</p>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">{label}</p>
          <p className="text-muted-foreground text-xs leading-snug mt-0.5">{hinweis}</p>
        </div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-all">
        <Phone className="w-5 h-5 text-green-700" />
      </div>
    </a>
  );
}

// ─── Soforthilfe-Seite ────────────────────────────────────

export default function Notfall() {
  const rot144 = kontaktById("ROT_144")!;
  const rot117 = kontaktById("ROT_117")!;
  const rot112 = kontaktById("ROT_112")!;
  const pukKjp = kontaktById("GELB_PUK_KJP")!;
  const pukErw = kontaktById("GELB_PUK_ERW")!;
  const puk65  = kontaktById("GELB_PUK_65")!;
  const gruen143   = kontaktById("GRUEN_143")!;
  const gruenEltern = kontaktById("GRUEN_ELTERN")!;
  const gruen147   = kontaktById("GRUEN_147")!;
  const rot145         = kontaktById("ROT_145")!;
  const infoAerztefon  = kontaktById("INFO_AERZTEFON")!;
  const infoPukZentrale = kontaktById("INFO_PUK_ZENTRALE")!;

  return (
    <Layout>
      <SEO
        title="Soforthilfe"
        description="Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz – wenn sofortiges Handeln erforderlich ist."
        path="/soforthilfe"
      />

      {/* ═══ HERO ═══ */}
      <section className="py-6 md:py-16 bg-gradient-to-b from-red-50 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">Soforthilfe</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Soforthilfe bei akuter Gefahr
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz – wenn sofortiges Handeln erforderlich ist.
            </p>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-900 leading-snug">
                <strong>Diese Seite ist für akute Gefahrensituationen.</strong> Für emotionale Krisen ohne akute Gefahr besuchen Sie die Seite{" "}
                <Link href="/unterstuetzen/krise" className="text-terracotta-mid hover:underline font-semibold">
                  «In der Krise unterstützen» →
                </Link>
              </p>
            </div>
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
              className="scroll-mt-24 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5" style={{ backgroundColor: "#C0392B" }}>
                <div className="flex items-center gap-3 mb-1">
                  <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">Lebensgefahr – sofort handeln</h2>
                </div>
                <p className="text-white/85 text-sm leading-snug ml-9">
                  Bei akuter Suizidgefahr, schwerer Selbstverletzung, Gewalt oder unmittelbarer Bedrohung.
                </p>
              </div>

              {/* Nummern */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3" style={{ backgroundColor: "#D44333" }}>
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
              <div className="px-5 py-3 sm:px-6 bg-red-900/20 border-t border-white/10">
                <p className="text-white/90 text-xs sm:text-sm leading-snug" style={{ color: "#fff" }}>
                  <strong>Merke:</strong> Bei akuter Lebensgefahr immer zuerst <strong>144 / 117 / 112</strong> – auch gegen den Willen der Person.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 2: PSYCHIATRISCHE KRISE (ORANGE) ─── */}
            <motion.div
              id="block-orange"
              className="scroll-mt-24 rounded-2xl overflow-hidden shadow-md border border-orange-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-orange-50 border-b border-orange-200">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-orange-900">Akute psychiatrische Krise</h2>
                </div>
                <p className="text-orange-800 text-sm leading-snug ml-11">
                  Schwere psychische Krise, starke Eskalation oder massiver Kontrollverlust – aber <strong>keine unmittelbare Lebensgefahr</strong>.
                </p>
              </div>

              {/* PUK-Karten */}
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <p className="text-sm text-muted-foreground mb-1">
                  Kontaktieren Sie die PUK Zürich – rund um die Uhr, 24/7:
                </p>

                <PukKarte
                  nummer={pukKjp.nummer}
                  label="PUK Kinder & Jugendliche (24/7)"
                  fuerWen="Kinder & Jugendliche bis 18 Jahre"
                  tel={pukKjp.tel}
                  icon={<Baby className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700" />}
                />
                <PukKarte
                  nummer={pukErw.nummer}
                  label="PUK Erwachsene (24/7)"
                  fuerWen="Erwachsene ab 18 Jahren"
                  tel={pukErw.tel}
                  icon={<User className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700" />}
                />
                <PukKarte
                  nummer={puk65.nummer}
                  label="PUK Erwachsene (24/7)"
                  fuerWen="Erwachsene ab 65 Jahren"
                  tel={puk65.tel}
                  icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700" />}
                />
              </div>

              {/* Hinweis */}
              <div className="px-5 py-3 sm:px-6 bg-orange-50 border-t border-orange-100">
                <p className="text-orange-800 text-xs sm:text-sm leading-snug">
                  Am Telefon erfolgt eine kurze Einschätzung, was jetzt am besten hilft.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 3: JEMAND ZUM REDEN (GRÜN) ─── */}
            <motion.div
              id="block-gruen"
              className="scroll-mt-24 rounded-2xl overflow-hidden shadow-md border border-green-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Block-Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-green-50 border-b border-green-200">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-green-900">Jemand zum Reden / Entlastung</h2>
                </div>
                <p className="text-green-800 text-sm leading-snug ml-11">
                  Für Gespräch, Entlastung und Orientierung – <strong>kein Einsatz vor Ort</strong>, keine unmittelbare Gefahr.
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
              <div className="px-5 py-3 sm:px-6 bg-green-50 border-t border-green-100">
                <p className="text-green-800 text-xs sm:text-sm leading-snug">
                  <strong>Bei akuter Gefahr:</strong> Immer zuerst <strong>144 / 117 / 112</strong> rufen.
                </p>
              </div>
            </motion.div>

            {/* ─── BLOCK 4: SPEZIALFALL VERGIFTUNG ─── */}
            <motion.div
              id="block-spezial"
              className="scroll-mt-24 rounded-2xl overflow-hidden shadow-sm border border-purple-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-4 bg-purple-50 border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-purple-900">Spezialfall: Vergiftung</h2>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-5 bg-white">
                <a
                  href={`tel:${rot145.tel}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200 hover:border-purple-400 hover:shadow-md active:scale-[0.98] transition-all group"
                  aria-label={`${rot145.label} anrufen: ${rot145.nummer}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xl leading-none mb-0.5">{rot145.nummer}</p>
                      <p className="text-muted-foreground text-sm font-medium">{rot145.label}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{rot145.hinweis}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-all">
                    <Phone className="w-5 h-5 text-purple-700" />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* ─── BLOCK 5: WEITERE KONTAKTE (NACHRANGIG) ─── */}
            <motion.div
              id="block-weitere"
              className="scroll-mt-24 rounded-2xl overflow-hidden shadow-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="px-5 py-3 sm:px-6 sm:py-4 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-sm sm:text-base font-semibold text-muted-foreground">Weitere Kontakte</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 ml-7">Allgemeine Beratung und Auskunft – nicht für akute Notfälle</p>
              </div>

              <div className="px-4 py-4 sm:px-5 space-y-3 bg-background">
                {/* Ärztefon */}
                <a
                  href={`tel:${infoAerztefon.tel}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
                  aria-label={`${infoAerztefon.label} anrufen: ${infoAerztefon.nummer}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{infoAerztefon.nummer}</p>
                    <p className="text-muted-foreground text-xs">{infoAerztefon.label}</p>
                    <p className="text-muted-foreground text-xs">{infoAerztefon.hinweis}</p>
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
                    <p className="font-semibold text-foreground text-sm">{infoPukZentrale.nummer}</p>
                    <p className="text-muted-foreground text-xs">{infoPukZentrale.label}</p>
                    <p className="text-muted-foreground text-xs">Allgemeine Auskunft – kein Notfalldienst</p>
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
                  href="/unterstuetzen/krise"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">Deeskalation und Krisenbegleitung</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
                <Link
                  href="/selbstfuersorge"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">Selbstfürsorge für Angehörige</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
                <Link
                  href="/beratung"
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-terracotta/40 hover:shadow-sm transition-all group"
                >
                  <span className="text-sm text-foreground">Beratung und Selbsthilfegruppen</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-terracotta-mid transition-colors" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
