/**
 * Soforthilfe — Editorial-Redesign Phase 6 (Sonderfall, letzte
 * inhaltliche Migration der Welle).
 *
 * Brief: Editorial-Redesign Master-Brief, Phase 6 «Soforthilfe-
 * Spezialfall».
 *
 * Sonderfall-Disziplin: Sicherheit über Editorial-Reduktion. Triage-
 * Logik, Sticky-Ampelleiste und 5 Notruf-Blöcke sind klinisch
 * sorgfältig komponiert und panik-tauglich — strukturell unverändert.
 * Was sich ändert: Hero, Action-Buttons-Position, einzelne
 * typografische Akzente, Token-Migration. Die Ampel bleibt Ampel.
 *
 *   ── Hero ──
 *   Bewusst zurückhaltender als Tier-1-Pages: knapper Hero-Padding
 *   (`pt-12 pb-8 md:pt-16 md:pb-10` statt `pt-16 pb-12 md:pt-24
 *   md:pb-16`), damit Triage schneller sichtbar wird ohne Scroll.
 *   Caps-Kicker + Source-Serif-H1 mit Italic-Akzent auf «Gefahr».
 *   Lead einzeilig, knapp.
 *
 *   ── Meta-Zeile ──
 *   Konsolidiert LastVerifiedBadge + Geltungsbereich-Pill +
 *   Disclaimer-Box zu einer einzelnen `--text-sm`/`--fg-tertiary`-
 *   Zeile direkt unter Hero. Vollständiges LastVerifiedBadge
 *   zusätzlich am Seitenende (Trust-Signal für Wiederbesucher).
 *
 *   ── Disclaimer «Für emotionale Krisen ohne akute Gefahr → krise» ──
 *   Vorher amber-Wash-Card → editorial-entschärft als border-l mit
 *   --color-alert + dezenter alert-wash bg, analog Wegweiser-
 *   safetyCritical. Wortlaut unverändert.
 *
 *   ── 5 Notruf-Blöcke ──
 *   Strukturell komplett unverändert. Typografische Akzente:
 *   - H2-Header in Display-Serif (statt font-bold sans)
 *   - Outer-Border auf --rule-color statt farbig (ausser Block 1 ROT,
 *     der --color-alert-Kontext darf voll farbig bleiben — sicherheits-
 *     akut)
 *   - Shadows entfernt (entschärft per Brief)
 *   - Header-Wash + Content-white + Hinweis-Wash bleibt erhalten
 *   - Telefonnummern bleiben prominent (KontaktKarte und InfoKarte
 *     unverändert), NICHT zu editorial-link degradiert
 *
 *   ── Vorbereitungs-Sektion (NEU) ──
 *   Drei Aktionen («PDF drucken», «Notfallkarte erstellen»,
 *   «Situations-Wegweiser nutzen») aus dem Hero entfernt und in eine
 *   eigene Sektion am Seitenende verschoben — NACH dem letzten
 *   Notruf-Block, VOR dem rechtlichen Disclaimer. Begründung: in
 *   akuter Krise braucht User die Notfallnummern, nicht das PDF zum
 *   Druck. Die Vorbereitungs-Aktionen sind für ruhige Momente.
 *   `print:hidden` — beim Druck der Soforthilfe-Karte erscheint diese
 *   Sektion nicht.
 *
 *   ── Sticky-Ampelleiste ──
 *   Vollständig unverändert (Schwellwert 280, Items, Animation).
 *
 *   ── Telefon-Leitfaden «Erste 30 Sekunden am Telefon» ──
 *   Strukturell unverändert (in Block 1).
 */
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Baby,
  Clock,
  Heart,
  Info,
  Phone,
  Pill,
  Shield,
  User,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { kontaktByIdStrict } from "@/data/kontakte";

// ─── Sticky Ampel-Leiste (UNVERÄNDERT — sicherheits-kritisch) ───

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
      buttonClass: "bg-sos-rot",
    },
    {
      id: "block-orange",
      label: "Psychiatr. Krise",
      sub: "PUK 24/7",
      buttonClass: "bg-sos-orange-text",
    },
    {
      id: "block-gruen",
      label: "Jemand zum Reden",
      sub: "143",
      buttonClass: "bg-sos-gruen-text",
    },
  ] as const;

  return (
    <div
      className={`sticky top-16 md:top-20 z-40 mb-0 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
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
                className={`flex-1 flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-1.5 py-2 text-[10px] font-medium text-white shadow-sm transition-all hover:brightness-90 active:scale-[0.97] sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm ${item.buttonClass}`}
              >
                <span className="font-semibold leading-tight text-center">
                  {item.label}
                </span>
                <span className="text-white text-[10px] sm:text-xs leading-tight">
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

// ─── Unified KontaktKarte (UNVERÄNDERT — Phone numbers prominent) ───

type KarteVariant = "danger" | "orange" | "green" | "lila";

interface KontaktKarteProps {
  variant: KarteVariant;
  nummer: string;
  label: string;
  tel: string;
  hinweis?: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

const KARTE_STYLES: Record<
  KarteVariant,
  {
    container: string;
    iconBox: string;
    numberCls: string;
    subLabelCls: string;
    labelCls: string;
    hinweisCls: string;
    arrowBox: string;
    arrowIconCls: string;
  }
> = {
  danger: {
    container:
      "bg-white/15 hover:bg-white/25 active:bg-white/30 border-white/20",
    iconBox: "rounded-full bg-white/20",
    numberCls: "text-white text-xl sm:text-2xl",
    subLabelCls: "text-white text-xs font-semibold",
    labelCls: "text-white font-semibold text-sm",
    hinweisCls: "text-white/90 text-xs leading-snug mt-0.5",
    arrowBox: "bg-white/20 group-hover:bg-white/30",
    arrowIconCls: "text-white",
  },
  orange: {
    container:
      "bg-white border-sos-orange-border hover:border-sos-orange-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-orange-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls: "text-xs font-medium text-sos-orange-text",
    labelCls: "text-muted-foreground text-xs sm:text-sm leading-snug",
    hinweisCls: "text-muted-foreground text-xs leading-snug mt-0.5",
    arrowBox: "bg-sos-orange-light group-hover:bg-sos-orange-border",
    arrowIconCls: "text-sos-orange-text",
  },
  green: {
    container:
      "bg-white border-sos-gruen-border hover:border-sos-gruen-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-gruen-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls:
      "text-[10px] font-semibold text-sos-gruen-text bg-sos-gruen-light rounded px-1.5 py-0.5",
    labelCls: "text-muted-foreground text-xs sm:text-sm font-medium",
    hinweisCls: "text-muted-foreground text-xs leading-snug mt-0.5",
    arrowBox: "bg-sos-gruen-light group-hover:bg-sos-gruen-border",
    arrowIconCls: "text-sos-gruen-text",
  },
  lila: {
    container:
      "bg-sos-lila-wash border-sos-lila-border hover:border-sos-lila-border-h hover:shadow-md active:scale-[0.98]",
    iconBox: "rounded-xl bg-sos-lila-light",
    numberCls: "text-foreground text-lg sm:text-xl",
    subLabelCls: "text-xs font-medium text-sos-lila-text",
    labelCls: "text-muted-foreground text-sm font-medium",
    hinweisCls: "text-muted-foreground text-xs mt-0.5",
    arrowBox: "bg-sos-lila-light group-hover:bg-sos-lila-border",
    arrowIconCls: "text-sos-lila-text",
  },
};

function KontaktKarte({
  variant,
  nummer,
  label,
  tel,
  hinweis,
  subLabel,
  icon,
}: KontaktKarteProps) {
  const s = KARTE_STYLES[variant];
  const defaultIcon =
    variant === "danger" ? (
      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    ) : variant === "orange" ? (
      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
    ) : variant === "lila" ? (
      <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-sos-lila-text" />
    ) : (
      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-sos-gruen-text" />
    );
  return (
    <a
      href={`tel:${tel}`}
      className={`flex items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border transition-all group ${s.container}`}
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 ${s.iconBox}`}
        >
          {icon ?? defaultIcon}
        </div>
        <div className="min-w-0">
          {subLabel && (
            <span className={`inline-block mb-0.5 ${s.subLabelCls}`}>
              {subLabel}
            </span>
          )}
          <p className={`font-bold leading-none mb-0.5 ${s.numberCls}`}>
            {nummer}
          </p>
          <p className={s.labelCls}>{label}</p>
          {hinweis && <p className={s.hinweisCls}>{hinweis}</p>}
        </div>
      </div>
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${s.arrowBox}`}
      >
        <Phone className={`w-5 h-5 ${s.arrowIconCls}`} />
      </div>
    </a>
  );
}

// ─── InfoKarte (UNVERÄNDERT — nachrangige Kontakte) ───

function InfoKarte({
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
      className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 hover:border-border hover:shadow-sm active:scale-[0.98] transition-all group"
      aria-label={`${label} anrufen: ${nummer}`}
    >
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm">{nummer}</p>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-muted-foreground text-xs">{hinweis}</p>
      </div>
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all">
        <Phone className="w-4 h-4 text-muted-foreground" />
      </div>
    </a>
  );
}

// ─── Editorial-Style Konstanten (für Hero und Vorbereitungs-Sektion) ──

const labelStyle = {
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--fg-tertiary)",
  fontWeight: 500,
} as const;

// Block-H2 Display-Serif (auf farbigem Block-Header)
const blockHeadingClass = "font-display text-lg sm:text-xl";
const blockHeadingStyle = {
  fontWeight: "var(--weight-display)",
  letterSpacing: "var(--tracking-tight)",
  lineHeight: "var(--lh-snug)",
} as const;

// ─── Soforthilfe-Seite ───────────────────────────────────

const VERIFIED_DATE = "16.04.2026";

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

      {/* ═══ HERO (entschärft, knapperer Padding) ═══ */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-10 print:py-2">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs uppercase"
              style={{
                color: "var(--accent-label)",
                letterSpacing: "var(--tracking-caps)",
                fontWeight: 500,
              }}
            >
              Soforthilfe
            </p>
            <h1
              className="mt-4 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
              style={{
                lineHeight: "var(--lh-tight)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--fg-primary)",
                fontWeight: "var(--weight-display)",
              }}
            >
              Soforthilfe bei akuter <em>Gefahr</em>
            </h1>
            <p
              className="mt-4"
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "var(--lh-snug)",
                color: "var(--fg-secondary)",
              }}
            >
              Notfallnummern und Anlaufstellen für akute Krisen in der Schweiz –
              wenn sofortiges Handeln erforderlich ist.
            </p>

            {/* Meta-Zeile (konsolidiert: Geltungsbereich · zuletzt geprüft) */}
            <p
              className="mt-3"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--fg-tertiary)",
                lineHeight: "var(--lh-relaxed)",
              }}
            >
              Schweiz · Schwerpunkt Kanton Zürich · zuletzt geprüft{" "}
              {VERIFIED_DATE}
            </p>

            {/*
              Disclaimer «Für emotionale Krisen ohne akute Gefahr»:
              dezent als border-l mit --color-alert + alert-wash bg,
              analog Wegweiser-safetyCritical. Wortlaut unverändert.
            */}
            <div
              className="mt-5 border-l-4 py-3 px-4"
              style={{
                borderColor: "var(--color-alert)",
                backgroundColor:
                  "var(--color-alert-wash, rgba(197,95,61,0.05))",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-primary)",
                }}
              >
                <strong>Diese Seite ist für akute Gefahrensituationen.</strong>{" "}
                Für emotionale Krisen ohne akute Gefahr besuchen Sie die Seite{" "}
                <Link href="/unterstuetzen/krise" className="editorial-link">
                  «In der Krise unterstützen»
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRIAGE (UNVERÄNDERT — Sicherheits-Pills) ═══ */}
      <section className="bg-[var(--bg-elevated)] border-y border-[var(--rule-color)] py-4 print:hidden">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ color: "var(--fg-tertiary)" }}
            >
              Was ist gerade los?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-rot")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--color-sos-rot-wash)] border-2 border-[var(--color-sos-rot)]/50 hover:border-[var(--color-sos-rot)] hover:bg-[var(--color-sos-rot)]/10 transition-all text-left group"
              >
                <span className="w-3 h-3 rounded-full bg-[var(--color-sos-rot)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-sos-rot)]">
                  Akute Lebensgefahr
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-orange")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--color-sos-orange-wash)] border-2 border-[var(--color-sos-orange-text)]/40 hover:border-[var(--color-sos-orange-text)] hover:bg-[var(--color-sos-orange-light)] transition-all text-left group"
              >
                <span className="w-3 h-3 rounded-full bg-[var(--color-sos-orange-text)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-sos-orange-dark)]">
                  Psychiatrische Krise
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("block-gruen")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--color-sos-gruen-wash)] border-2 border-[var(--color-sos-gruen-text)]/40 hover:border-[var(--color-sos-gruen-text)] hover:bg-[var(--color-sos-gruen-light)] transition-all text-left group"
              >
                <span className="w-3 h-3 rounded-full bg-[var(--color-sos-gruen-text)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-sos-gruen-dark)]">
                  Jemand zum Reden
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY AMPEL (UNVERÄNDERT — Schwellwert 280) ═══ */}
      <StickyAmpelLeiste />

      {/* ═══ INHALT (5 Notruf-Blöcke + Vorbereitung + Disclaimer) ═══ */}
      <section className="py-6 md:py-12 pb-32 sm:pb-12">
        <div className="container">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              Diese Seite ersetzt keine professionelle Notfallberatung. Im
              Zweifel direkt{" "}
              <strong className="text-foreground">144 / 117</strong> anrufen.
            </p>

            {/* ─── BLOCK 1: LEBENSGEFAHR (ROT — voll farbig per Brief) ─── */}
            <div
              id="block-rot"
              className="scroll-mt-40 rounded-2xl overflow-clip"
            >
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-rot">
                <div className="flex items-center gap-3 mb-1">
                  <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
                  <h2
                    className={`${blockHeadingClass} text-white`}
                    style={blockHeadingStyle}
                  >
                    Lebensgefahr – sofort handeln
                  </h2>
                </div>
                <p className="text-white text-sm leading-snug ml-9">
                  Bei akuter Suizidgefahr, schwerer Selbstverletzung, Gewalt
                  oder unmittelbarer Bedrohung.
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-sos-rot-body">
                <KontaktKarte
                  variant="danger"
                  nummer={rot144.nummer}
                  label={rot144.label}
                  hinweis={rot144.hinweis}
                  tel={rot144.tel}
                />
                <KontaktKarte
                  variant="danger"
                  nummer={rot117.nummer}
                  label={rot117.label}
                  hinweis={rot117.hinweis}
                  tel={rot117.tel}
                />
                <KontaktKarte
                  variant="danger"
                  nummer={rot112.nummer}
                  label={rot112.label}
                  hinweis={rot112.hinweis}
                  tel={rot112.tel}
                />
              </div>

              <div className="px-5 py-3 sm:px-6 bg-sos-rot/20 border-t border-white/10">
                <p className="text-white text-xs sm:text-sm leading-snug">
                  <strong>Merke:</strong> Bei akuter Selbst- oder
                  Fremdgefährdung zuerst <strong>144 / 117 / 112</strong>{" "}
                  wählen. Wenn Sie unsicher sind, lassen Sie sich dort oder
                  durch eine psychiatrische Fachstelle sofort zum weiteren
                  Vorgehen anleiten.
                </p>
              </div>

              {/* Telefon-Leitfaden — UNVERÄNDERT */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-rot-body border-t border-white/10">
                <p className="text-white/90 text-xs font-semibold uppercase tracking-wide mb-3">
                  Die ersten 30 Sekunden am Telefon
                </p>
                <div className="space-y-2">
                  {[
                    {
                      nr: "1",
                      text: "Name nennen + Beziehung: «Ich bin [Name], ich rufe für meine Tochter/meinen Partner/…»",
                    },
                    {
                      nr: "2",
                      text: "Art der Situation: «Es geht um eine Suizidgefahr / Selbstverletzung / unkontrolliertes Verhalten»",
                    },
                    {
                      nr: "3",
                      text: "Was passiert gerade: «Sie sitzt in ihrem Zimmer und sagt, sie will nicht mehr leben»",
                    },
                    {
                      nr: "4",
                      text: "Sicherheit klären: «Ich bin bei ihr / sie ist alleine / wir sind in Sicherheit»",
                    },
                  ].map(item => (
                    <div
                      key={item.nr}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/20"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center">
                        {item.nr}
                      </span>
                      <p className="text-white text-sm leading-snug">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── BLOCK 2: PSYCHIATRISCHE KRISE (ORANGE — Border auf --rule-color) ─── */}
            <div
              id="block-orange"
              className="scroll-mt-40 rounded-2xl overflow-clip border"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-orange-wash border-b border-sos-orange-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-orange flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    className={`${blockHeadingClass} text-sos-orange-dark`}
                    style={blockHeadingStyle}
                  >
                    Akute psychiatrische Krise
                  </h2>
                </div>
                <p className="text-sos-orange-mid text-sm leading-snug ml-11">
                  Schwere psychische Krise, starke Eskalation oder massiver
                  Kontrollverlust – aber{" "}
                  <strong>keine unmittelbare Lebensgefahr</strong>.
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <p className="text-sm text-muted-foreground mb-1">
                  Kontaktieren Sie die PUK Zürich – rund um die Uhr, 24/7:
                </p>
                <KontaktKarte
                  variant="orange"
                  nummer={pukErw.nummer}
                  label="PUK Erwachsene (24/7)"
                  subLabel="Erwachsene 18–64 Jahre"
                  tel={pukErw.tel}
                  icon={
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <KontaktKarte
                  variant="orange"
                  nummer={pukKjp.nummer}
                  label="PUK Kinder & Jugendliche (24/7)"
                  subLabel="Kinder & Jugendliche bis 18 Jahre"
                  tel={pukKjp.tel}
                  icon={
                    <Baby className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
                <KontaktKarte
                  variant="orange"
                  nummer={puk65.nummer}
                  label="PUK Erwachsene ab 65 (24/7)"
                  subLabel="Erwachsene ab 65 Jahren"
                  tel={puk65.tel}
                  icon={
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sos-orange-text" />
                  }
                />
              </div>

              <div className="px-5 py-3 sm:px-6 bg-sos-orange-wash border-t border-sos-orange-light">
                <p className="text-sos-orange-mid text-xs sm:text-sm leading-snug">
                  Am Telefon erfolgt eine kurze Einschätzung, was jetzt am
                  besten hilft.
                </p>
              </div>
            </div>

            {/* ─── BLOCK 3: JEMAND ZUM REDEN (GRÜN — Border auf --rule-color) ─── */}
            <div
              id="block-gruen"
              className="scroll-mt-40 rounded-2xl overflow-clip border"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-sos-gruen-wash border-b border-sos-gruen-border">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-sos-gruen flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    className={`${blockHeadingClass} text-sos-gruen-dark`}
                    style={blockHeadingStyle}
                  >
                    Jemand zum Reden / Entlastung
                  </h2>
                </div>
                <p className="text-sos-gruen-mid text-sm leading-snug ml-11">
                  Für Gespräch, Entlastung und Orientierung –{" "}
                  <strong>kein Einsatz vor Ort</strong>, keine unmittelbare
                  Gefahr.
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-3 bg-white">
                <KontaktKarte
                  variant="green"
                  nummer={gruen143.nummer}
                  label="Dargebotene Hand"
                  hinweis="Anonym, vertraulich – Gesprächs- und Krisenangebot"
                  tel={gruen143.tel}
                  subLabel="24/7"
                />
                <KontaktKarte
                  variant="green"
                  nummer={gruenEltern.nummer}
                  label="Elternnotruf"
                  hinweis="Beratung für Eltern – anonym, vertraulich"
                  tel={gruenEltern.tel}
                  subLabel="24/7 · Für Eltern"
                />
                <KontaktKarte
                  variant="green"
                  nummer={gruen147.nummer}
                  label="Pro Juventute"
                  hinweis="Beratung für Kinder und Jugendliche – vertraulich"
                  tel={gruen147.tel}
                  subLabel="24/7 · Für Kinder & Jugendliche"
                />
              </div>

              <div className="px-5 py-3 sm:px-6 bg-sos-gruen-wash border-t border-sos-gruen-light">
                <p className="text-sos-gruen-mid text-xs sm:text-sm leading-snug">
                  <strong>Bei akuter Gefahr:</strong> Immer zuerst{" "}
                  <strong>144 / 117 / 112</strong> rufen.
                </p>
              </div>
            </div>

            {/* ─── BLOCK 4: SPEZIALFALL VERGIFTUNG (LILA — Border auf --rule-color) ─── */}
            <div
              id="block-spezial"
              className="scroll-mt-40 rounded-2xl overflow-clip border"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <div className="px-5 py-4 sm:px-6 sm:py-4 bg-sos-lila-wash border-b border-sos-lila-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sos-lila flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    className={`${blockHeadingClass} text-sos-lila-dark`}
                    style={blockHeadingStyle}
                  >
                    Spezialfall: Vergiftung
                  </h2>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-5 bg-white">
                <KontaktKarte
                  variant="lila"
                  nummer={rot145.nummer}
                  label={rot145.label}
                  hinweis={rot145.hinweis}
                  tel={rot145.tel}
                />
              </div>
            </div>

            {/* ─── BLOCK 5: WEITERE KONTAKTE (NACHRANGIG — Border auf --rule-color) ─── */}
            <div
              id="block-weitere"
              className="scroll-mt-40 rounded-2xl overflow-clip border"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <div className="px-5 py-3 sm:px-6 sm:py-4 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-muted-foreground" />
                  <h2
                    className={`${blockHeadingClass} text-muted-foreground`}
                    style={{
                      ...blockHeadingStyle,
                      fontSize: "var(--text-md)",
                    }}
                  >
                    Weitere Kontakte
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 ml-7">
                  Allgemeine Beratung und Auskunft – nicht für akute Notfälle
                </p>
              </div>

              <div className="px-4 py-4 sm:px-5 space-y-3 bg-background">
                <InfoKarte
                  nummer={infoAerztefon.nummer}
                  label={infoAerztefon.label}
                  hinweis={infoAerztefon.hinweis}
                  tel={infoAerztefon.tel}
                />
                <InfoKarte
                  nummer={infoPukZentrale.nummer}
                  label={infoPukZentrale.label}
                  hinweis="Allgemeine Auskunft – kein Notfalldienst"
                  tel={infoPukZentrale.tel}
                />
                <InfoKarte
                  nummer={infoFachstelle.nummer}
                  label={infoFachstelle.label}
                  hinweis={infoFachstelle.hinweis}
                  tel={infoFachstelle.tel}
                />
                <InfoKarte
                  nummer={infoKiz.nummer}
                  label={infoKiz.label}
                  hinweis={infoKiz.hinweis}
                  tel={infoKiz.tel}
                />
              </div>
            </div>

            {/* ─── VORBEREITUNG FÜR LATER (NEU — print:hidden) ─── */}
            <section
              className="mt-12 border-t pt-8 print:hidden"
              style={{ borderColor: "var(--rule-color)" }}
              aria-labelledby="vorbereitung-heading"
            >
              <p className="uppercase" style={labelStyle}>
                Vorbereitung
              </p>
              <h2
                id="vorbereitung-heading"
                className="mt-2 font-display"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "var(--weight-display)",
                  color: "var(--fg-primary)",
                  letterSpacing: "var(--tracking-tight)",
                  lineHeight: "var(--lh-snug)",
                }}
              >
                Für nicht-akute Momente
              </h2>
              <p
                className="mt-3"
                style={{
                  fontSize: "var(--text-md)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Diese Werkzeuge sind für ruhige Momente, in denen Sie sich
                vorbereiten oder aufarbeiten möchten — nicht für die akute Krise
                selbst.
              </p>

              <ul className="mt-6 space-y-6">
                <li>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    <a
                      href="/soforthilfe-print.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      Soforthilfe-Karte als PDF drucken
                    </a>
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Alle Notfallnummern auf einer A4-Seite — zum Aufhängen am
                    Kühlschrank, neben dem Telefon, in der Tasche.
                  </p>
                </li>
                <li>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    <Link href="/notfallkarte" className="editorial-link">
                      Persönliche Notfallkarte erstellen
                    </Link>
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Mit eigenen Kontaktpersonen, Strategien und Notizen ergänzen
                    — wird lokal im Browser gespeichert.
                  </p>
                </li>
                <li>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    <Link href="/wegweiser" className="editorial-link">
                      Situations-Wegweiser nutzen
                    </Link>
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Schritt-für-Schritt-Hilfe für konkrete Krisen- Szenarien —
                    was war das gerade, was ist jetzt sinnvoll.
                  </p>
                </li>
                <li>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    <Link
                      href="/unterstuetzen/krise"
                      className="editorial-link"
                    >
                      Deeskalation und Krisenbegleitung lernen
                    </Link>
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Hintergründe, Ampel-System, deeskalierende Techniken.
                  </p>
                </li>
                <li>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--fg-primary)",
                    }}
                  >
                    <Link href="/selbstfuersorge" className="editorial-link">
                      Selbstfürsorge für Angehörige
                    </Link>
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    Eigene Belastung ernst nehmen, Warnsignale erkennen,
                    Regeneration ermöglichen.
                  </p>
                </li>
              </ul>
            </section>

            {/* ─── Rechtlicher Disclaimer ─── */}
            <div
              className="mt-12 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-tertiary)",
                }}
              >
                Diese Informationen ersetzen keine medizinische oder rechtliche
                Beratung. In akuten Gefahrensituationen zählt das sofortige
                Einbeziehen von Notruf und Fachpersonen.
              </p>

              {/* LastVerifiedBadge erhalten am Seitenende — Trust-Signal */}
              <div className="mt-4 print:hidden">
                <LastVerifiedBadge date={VERIFIED_DATE} />
              </div>

              {/* Hidden link für Tier-1-Cross-References mit Shield-Icon */}
              <p
                className="mt-3 print:hidden"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-tertiary)",
                }}
              >
                <Shield
                  className="inline-block w-4 h-4 mr-1 align-text-bottom"
                  aria-hidden="true"
                />
                Krisenbegleitung danach:{" "}
                <Link href="/unterstuetzen/krise" className="editorial-link">
                  Deeskalation und Ampel-System
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
