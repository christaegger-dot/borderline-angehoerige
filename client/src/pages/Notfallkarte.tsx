/**
 * Notfallkarte — Editorial-Redesign Phase 5 (Page 9/9, Tier 2 — letzte
 * Page der Welle).
 *
 * Brief: docs/redesign/phase-5-tier2-master-brief.md, Abschnitt
 * «Page 9 — Notfallkarte».
 *
 * Form-Editor mit localStorage-Persistenz. Funktional-Logik komplett
 * unverändert: 6 Content-Blöcke (Notfallnummern / PUK-Krise / Jemand
 * zum Reden / Persönliche Kontakte / Beruhigungsstrategien /
 * Persönliche Notizen), Auto-Save bei jeder Änderung, Save-Button mit
 * Toast-Bestätigung, Print über window.open auf separate
 * `/notfallkarte-print.html` (Brief: separate Standalone-Datei wird
 * NICHT angefasst).
 *
 *   ── localStorage-Fallback-Warnung ──
 *   Vorher: fixed top-0 banner mit `bg-sand-accent` (volle Hintergrund-
 *   fläche).
 *   Editorial: border-l-4 mit --color-alert + dezenter
 *   --color-alert-wash bg, analog Wegweiser-safetyCritical. Position
 *   bleibt fixed top-0 (sicherheits-funktional: muss bei jedem Scroll
 *   sichtbar sein, sonst verliert User seine Eingaben unbemerkt).
 *   Begründung: dezent + sichtbar — Standardfall ist localStorage
 *   funktioniert (Banner soll dann nicht erscheinen), aber im Fallback
 *   muss er prominent genug sein, um Datenverlust zu verhindern.
 *
 *   ── Print-CSS-Pfad ──
 *   Alle `print:`-Tailwind-Klassen erhalten:
 *     - `print:hidden` für interaktive UI (Trash-Buttons, Hinzufügen,
 *       Action-Buttons, Banner-Warnung, Hero-Buttons)
 *     - `print:break-inside-avoid` für die 6 Content-Blöcke
 *     - `print:bg-none print:py-2 print:pb-2` für Hero (kein Gradient
 *       beim Druck)
 *     - `print:border-b print:border-t-0 print:border-l-0
 *       print:border-r-0 print:rounded-none print:px-0 print:py-0.5`
 *       für Form-Inputs (klassische Linien-Inputs beim Druck)
 *     - `print:text-base / print:text-2xl / print:text-sm` für
 *       responsive H-Sizes
 *     - `hidden print:block` für leere Kontakt-Linien beim Druck
 *     - `notfallkarte-print` Wrapper-Klasse
 *   Beim direkten Browser-Druck (Ctrl+P) erscheint die Karte ohne
 *   Editor-UI. (Standardfall: User klickt «Drucken» → öffnet
 *   `notfallkarte-print.html` in neuem Tab.)
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO from "@/components/SEO";
import { ROT, GELB, GRUEN, type Kontakt } from "@/data/kontakte";
import { Link } from "wouter";

interface PersonalContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface CalmingStrategy {
  id: string;
  text: string;
}

interface NotfallkarteData {
  personalContacts: PersonalContact[];
  calmingStrategies: CalmingStrategy[];
  notes: string;
}

const STORAGE_KEY = "notfallkarte-data";

const DEFAULT_STRATEGIES: CalmingStrategy[] = [
  { id: "s1", text: "Langsam ein- und ausatmen (4-7-8)" },
  { id: "s2", text: "Beide Füsse bewusst auf den Boden stellen" },
  { id: "s3", text: "Kaltes Wasser über die Handgelenke laufen lassen" },
];

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

const CARD_ROT = ROT.filter(k => k.id !== "ROT_118");
const CARD_GELB = GELB;
const CARD_GRUEN = GRUEN.filter(k => k.id === "GRUEN_143");

function loadData(): NotfallkarteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt data */
  }
  return {
    personalContacts: [],
    calmingStrategies: DEFAULT_STRATEGIES,
    notes: "",
  };
}

function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function saveData(data: NotfallkarteData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

// ─── Editorial-Style Konstanten ──────────────────────────

const labelStyle = {
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--fg-tertiary)",
  fontWeight: 500,
} as const;

const inputClass =
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none print:px-0 print:py-0.5";

const inputStyle = {
  borderColor: "var(--rule-color)",
  backgroundColor: "var(--bg-elevated)",
  color: "var(--fg-primary)",
} as const;

// ─── Sub-components ──────────────────────────────────────

function EmergencyRow({ kontakt }: { kontakt: Kontakt }) {
  return (
    <a
      href={`tel:${kontakt.tel}`}
      className="flex items-center justify-between gap-4 border-t py-3 transition-colors hover:bg-[var(--bg-elevated)] print:py-2"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <span className="min-w-0 flex-1">
        <span
          className="block text-sm leading-tight"
          style={{ color: "var(--fg-primary)", fontWeight: 600 }}
        >
          {kontakt.label}
        </span>
        {kontakt.hinweis && (
          <span
            className="block text-xs leading-tight"
            style={{ color: "var(--fg-tertiary)" }}
          >
            {kontakt.hinweis}
          </span>
        )}
      </span>
      <span
        className="shrink-0 text-lg tabular-nums tracking-wide"
        style={{ color: "var(--fg-primary)", fontWeight: 600 }}
      >
        {kontakt.nummer}
      </span>
    </a>
  );
}

function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 print:hidden"
      style={{
        borderColor: "var(--accent-primary)",
        backgroundColor: "var(--accent-primary)",
        color: "var(--bg-primary)",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  onClick,
  children,
  disabled,
  ariaLabel,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className="rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 print:hidden"
      style={{
        borderColor: "var(--rule-color)",
        backgroundColor: "var(--bg-elevated)",
        color: "var(--fg-secondary)",
      }}
      onMouseEnter={e => {
        if (!disabled)
          e.currentTarget.style.borderColor = "var(--accent-primary)";
      }}
      onMouseLeave={e => {
        if (!disabled) e.currentTarget.style.borderColor = "var(--rule-color)";
      }}
    >
      {children}
    </button>
  );
}

function PersonalContactRow({
  contact,
  onUpdate,
  onRemove,
}: {
  contact: PersonalContact;
  onUpdate: (c: PersonalContact) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-2 py-2 print:py-1">
      <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3 print:grid-cols-3">
        <input
          type="text"
          value={contact.name}
          onChange={e => onUpdate({ ...contact, name: e.target.value })}
          placeholder="Name"
          aria-label="Name der Kontaktperson"
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="tel"
          value={contact.phone}
          onChange={e => onUpdate({ ...contact, phone: e.target.value })}
          placeholder="Telefonnummer"
          aria-label="Telefonnummer der Kontaktperson"
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="text"
          value={contact.relation}
          onChange={e => onUpdate({ ...contact, relation: e.target.value })}
          placeholder="Beziehung (z.B. Therapeut:in)"
          aria-label="Beziehung oder Rolle der Kontaktperson"
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1.5 px-2 py-1 text-xs transition-colors print:hidden"
        style={{ color: "var(--fg-tertiary)" }}
        aria-label={`${contact.name || "Kontakt"} entfernen`}
      >
        entfernen
      </button>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────

export default function Notfallkarte() {
  const [data, setData] = useState<NotfallkarteData>(loadData);
  const [saved, setSaved] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isStorageAvailable()) setStorageError(true);
  }, []);

  useEffect(() => {
    if (!saveData(data)) setStorageError(true);
  }, [data]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const handleSave = useCallback(() => {
    saveData(data);
    setSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  }, [data]);

  const handlePrint = useCallback(() => {
    try {
      sessionStorage.setItem("notfallkarte-print-data", JSON.stringify(data));
    } catch {
      /* ignore – Print-Seite fällt auf leere Felder zurück */
    }
    window.open("/notfallkarte-print.html", "_blank");
  }, [data]);

  const addContact = useCallback(() => {
    setData(prev => ({
      ...prev,
      personalContacts: [
        ...prev.personalContacts,
        { id: createId(), name: "", phone: "", relation: "" },
      ],
    }));
    setAnnouncement("Kontakt hinzugefügt");
  }, []);

  const updateContact = useCallback((updated: PersonalContact) => {
    setData(prev => ({
      ...prev,
      personalContacts: prev.personalContacts.map(c =>
        c.id === updated.id ? updated : c
      ),
    }));
  }, []);

  const removeContact = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      personalContacts: prev.personalContacts.filter(c => c.id !== id),
    }));
    setAnnouncement("Kontakt entfernt");
  }, []);

  const MAX_STRATEGIES = 4;

  const addStrategy = useCallback(() => {
    setData(prev => {
      if (prev.calmingStrategies.length >= MAX_STRATEGIES) return prev;
      return {
        ...prev,
        calmingStrategies: [
          ...prev.calmingStrategies,
          { id: createId(), text: "" },
        ],
      };
    });
    setAnnouncement("Strategie hinzugefügt");
  }, []);

  const updateStrategy = useCallback((id: string, text: string) => {
    setData(prev => ({
      ...prev,
      calmingStrategies: prev.calmingStrategies.map(s =>
        s.id === id ? { ...s, text } : s
      ),
    }));
  }, []);

  const removeStrategy = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      calmingStrategies: prev.calmingStrategies.filter(s => s.id !== id),
    }));
    setAnnouncement("Strategie entfernt");
  }, []);

  return (
    <Layout>
      <SEO
        title="Persönliche Notfallkarte"
        description="Erstellen Sie Ihre persönliche Notfallkarte mit den wichtigsten Nummern, Kontaktpersonen und Beruhigungsstrategien – zum Ausdrucken oder Speichern."
        path="/notfallkarte"
      />

      {/* A11y: announce add/remove actions to screen readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/*
        localStorage-Fallback-Warnung: dezent (border-l-4 + alert-wash),
        aber sicherheits-funktional fixed top-0 (User darf Eingaben nicht
        unbemerkt verlieren). Im Standardfall (storage funktioniert)
        erscheint dieser Banner gar nicht.
      */}
      {storageError && (
        <div
          role="alert"
          className="fixed top-0 left-0 right-0 z-50 border-b border-l-4 px-4 py-3 print:hidden"
          style={{
            borderLeftColor: "var(--color-alert)",
            borderBottomColor: "var(--rule-color)",
            backgroundColor: "var(--color-alert-wash, rgba(197,95,61,0.05))",
          }}
        >
          <p
            className="text-sm"
            style={{
              color: "var(--fg-primary)",
              lineHeight: "var(--lh-relaxed)",
            }}
          >
            <strong>Speichern nicht möglich</strong> – privater Modus oder
            gesperrter Speicher. Bitte{" "}
            <button
              type="button"
              onClick={handlePrint}
              className="editorial-link"
            >
              jetzt drucken
            </button>{" "}
            bevor Sie die Seite verlassen.
          </p>
        </div>
      )}

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-12 pt-16 md:pb-16 md:pt-24 print:hidden">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Notfallkarte
          </p>
          <h1
            className="mt-8 font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)]"
            style={{
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg-primary)",
              fontWeight: "var(--weight-display)",
            }}
          >
            Persönliche <em>Notfallkarte</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Die wichtigsten Nummern und Ihre persönlichen Strategien – alles auf
            einen Blick. Zum Ausdrucken, als PDF speichern oder jederzeit hier
            abrufen.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            Sofort Hilfe brauchen?{" "}
            <Link href="/soforthilfe" className="editorial-link">
              Soforthilfe-Nummern
            </Link>{" "}
            · Situation einschätzen?{" "}
            <Link href="/wegweiser" className="editorial-link">
              Situations-Wegweiser
            </Link>
          </p>
        </header>

        {/* ── Hairline-Trenner Editorial-Hero → funktionales Tool ── */}
        <hr
          className="border-0 border-t print:hidden"
          style={{ borderColor: "var(--rule-color)" }}
        />

        {/* ── Karten-Inhalt (printable) ── */}
        <div className="notfallkarte-print mt-12 space-y-12 print:mt-0 print:space-y-3">
          {/* BLOCK 1: Notfallnummern */}
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Notfallnummern
            </p>
            <h2
              className="font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-display)",
                color: "var(--fg-primary)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Notruf &amp; Polizei
            </h2>
            <div>
              {CARD_ROT.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </section>

          {/* BLOCK 2: Psychiatrische Krise */}
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Psychiatrische Krise
            </p>
            <h2
              className="font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-display)",
                color: "var(--fg-primary)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              PUK Zürich (24/7)
            </h2>
            <div>
              {CARD_GELB.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </section>

          {/* BLOCK 3: Jemand zum Reden */}
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Beratung
            </p>
            <h2
              className="font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-display)",
                color: "var(--fg-primary)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Jemand zum Reden
            </h2>
            <div>
              {CARD_GRUEN.map(k => (
                <EmergencyRow key={k.id} kontakt={k} />
              ))}
            </div>
          </section>

          {/* BLOCK 4: Persönliche Kontakte */}
          <section className="space-y-3 print:break-inside-avoid">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="uppercase" style={labelStyle}>
                  Eigene Einträge
                </p>
                <h2
                  className="mt-1 font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--weight-display)",
                    color: "var(--fg-primary)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Meine Kontaktpersonen
                </h2>
              </div>
              <SecondaryButton
                onClick={addContact}
                ariaLabel="Kontakt hinzufügen"
              >
                + Hinzufügen
              </SecondaryButton>
            </div>

            {data.personalContacts.length === 0 ? (
              <p
                className="print:hidden"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--lh-relaxed)",
                  color: "var(--fg-secondary)",
                }}
              >
                Fügen Sie hier Ihre persönlichen Kontaktpersonen hinzu – z.B.
                Therapeut:in, Vertrauensperson, Nachbar:in.
              </p>
            ) : (
              <div className="space-y-0.5">
                {data.personalContacts.map(c => (
                  <PersonalContactRow
                    key={c.id}
                    contact={c}
                    onUpdate={updateContact}
                    onRemove={() => removeContact(c.id)}
                  />
                ))}
              </div>
            )}

            {/* Print-only: empty lines if no contacts */}
            {data.personalContacts.length === 0 && (
              <div className="mt-2 hidden space-y-3 print:block">
                {[1, 2, 3].map(i => (
                  <div key={i} className="grid grid-cols-3 gap-4">
                    <div
                      className="border-b py-2 text-xs"
                      style={{
                        borderColor: "var(--rule-color)",
                        color: "var(--fg-tertiary)",
                      }}
                    >
                      Name
                    </div>
                    <div
                      className="border-b py-2 text-xs"
                      style={{
                        borderColor: "var(--rule-color)",
                        color: "var(--fg-tertiary)",
                      }}
                    >
                      Telefon
                    </div>
                    <div
                      className="border-b py-2 text-xs"
                      style={{
                        borderColor: "var(--rule-color)",
                        color: "var(--fg-tertiary)",
                      }}
                    >
                      Beziehung
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* BLOCK 5: Beruhigungsstrategien */}
          <section className="space-y-3 print:break-inside-avoid">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="uppercase" style={labelStyle}>
                  Eigene Einträge
                </p>
                <h2
                  className="mt-1 font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--weight-display)",
                    color: "var(--fg-primary)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Meine Beruhigungsstrategien
                </h2>
              </div>
              <SecondaryButton
                onClick={addStrategy}
                disabled={data.calmingStrategies.length >= MAX_STRATEGIES}
                ariaLabel="Strategie hinzufügen"
                title={
                  data.calmingStrategies.length >= MAX_STRATEGIES
                    ? "Maximal 4 Strategien – passend zur Druckseite"
                    : undefined
                }
              >
                + Hinzufügen
              </SecondaryButton>
            </div>
            <ol className="space-y-2">
              {data.calmingStrategies.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      color: "var(--bg-primary)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={s.text}
                    onChange={e => updateStrategy(s.id, e.target.value)}
                    placeholder="Strategie eingeben…"
                    aria-label={`Beruhigungsstrategie ${i + 1}`}
                    className={`flex-1 ${inputClass}`}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => removeStrategy(s.id)}
                    className="px-2 py-1 text-xs transition-colors print:hidden"
                    style={{ color: "var(--fg-tertiary)" }}
                    aria-label="Strategie entfernen"
                  >
                    entfernen
                  </button>
                </li>
              ))}
            </ol>
          </section>

          {/* BLOCK 6: Persönliche Notizen */}
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Eigene Einträge
            </p>
            <h2
              className="font-display print:text-base print:!mt-0 print:!mb-0 print:!pb-0 print:!border-none"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "var(--weight-display)",
                color: "var(--fg-primary)",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Persönliche Notizen
            </h2>
            <textarea
              value={data.notes}
              onChange={e =>
                setData(prev => ({ ...prev, notes: e.target.value }))
              }
              placeholder="z.B. Medikamente, Allergien, wichtige Hinweise für Helfer:innen…"
              aria-label="Persönliche Notizen"
              rows={3}
              className={`resize-y ${inputClass} print:resize-none`}
              style={inputStyle}
            />
          </section>
        </div>

        {/* ── Aktions-Buttons (Save + Print) ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <PrimaryButton onClick={handlePrint}>Drucken / Als PDF</PrimaryButton>
          <SecondaryButton
            onClick={handleSave}
            ariaLabel="Im Browser speichern"
          >
            {saved ? "Gespeichert ✓" : "Im Browser speichern"}
          </SecondaryButton>
        </div>

        {/* ── Datenschutz-Hinweis ── */}
        <EditorialSection rule>
          <EditorialProse>
            <p>
              <strong>Ihre Daten bleiben bei Ihnen.</strong> Alle Angaben werden
              nur lokal in Ihrem Browser gespeichert – sie verlassen nie Ihr
              Gerät. Beim Drucken oder PDF-Export werden Ihre persönlichen
              Einträge mit ausgegeben.
            </p>
          </EditorialProse>
        </EditorialSection>

        <RelatedLinksEditorial
          links={[
            {
              href: "/soforthilfe",
              title: "Soforthilfe",
              description: "Alle Notfallnummern auf einen Blick.",
            },
            {
              href: "/wegweiser",
              title: "Situations-Wegweiser",
              description:
                "Schritt-für-Schritt-Hilfe für konkrete Krisensituationen.",
            },
            {
              href: "/unterstuetzen/krise",
              title: "Krisenbegleitung",
              description:
                "Deeskalation, Ampel-System, was sagen / was vermeiden.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
