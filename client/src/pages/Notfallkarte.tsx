import { useCallback, useEffect, useRef, useState } from "react";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import ReviewBadge from "@/components/ReviewBadge";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { ROT, GELB, GRUEN, type Kontakt } from "@/data/kontakte";
import {
  NOTFALLKARTE_PRINT_STORAGE_KEY,
  NOTFALLKARTE_STORAGE_KEY,
  PERSONAL_NOTFALLKARTE_PATH,
} from "@/domain/notfallkarte";
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

const DEFAULT_STRATEGIES: CalmingStrategy[] = [
  { id: "s1", text: "Langsam ein- und ausatmen (4-7-8)" },
  { id: "s2", text: "Beide Füsse bewusst auf den Boden stellen" },
  { id: "s3", text: "Kaltes Wasser über die Handgelenke laufen lassen" },
];

const MAX_CONTACTS = 3;
const MAX_STRATEGIES = 4;

const NOTFALLKARTE_PRINT_MESSAGE_TYPE = "notfallkarte-print-data";

function createEmptyData(): NotfallkarteData {
  return {
    personalContacts: [],
    calmingStrategies: DEFAULT_STRATEGIES.map(strategy => ({ ...strategy })),
    notes: "",
  };
}

function normalizeData(raw: Partial<NotfallkarteData> | null | undefined) {
  const fallback = createEmptyData();

  return {
    personalContacts: Array.isArray(raw?.personalContacts)
      ? raw.personalContacts.slice(0, MAX_CONTACTS)
      : fallback.personalContacts,
    calmingStrategies:
      Array.isArray(raw?.calmingStrategies) && raw.calmingStrategies.length > 0
        ? raw.calmingStrategies.slice(0, MAX_STRATEGIES)
        : fallback.calmingStrategies,
    notes: typeof raw?.notes === "string" ? raw.notes : fallback.notes,
  };
}

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

const CARD_ROT = ROT.filter(k => k.id !== "ROT_118");
const CARD_GELB = GELB;
const CARD_GRUEN = GRUEN.filter(k => k.id === "GRUEN_143");

function loadData(): NotfallkarteData {
  try {
    const raw = localStorage.getItem(NOTFALLKARTE_STORAGE_KEY);
    if (raw) return normalizeData(JSON.parse(raw) as Partial<NotfallkarteData>);
  } catch {
    /* ignore corrupt data */
  }
  return createEmptyData();
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
    localStorage.setItem(NOTFALLKARTE_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function savePrintData(data: NotfallkarteData): boolean {
  try {
    localStorage.setItem(NOTFALLKARTE_PRINT_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function deleteStoredData(): boolean {
  try {
    localStorage.removeItem(NOTFALLKARTE_STORAGE_KEY);
    localStorage.removeItem(NOTFALLKARTE_PRINT_STORAGE_KEY);
    sessionStorage.removeItem(NOTFALLKARTE_PRINT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

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
    <EditorialPillButton
      variant="primary"
      onClick={onClick}
      className="print:hidden"
    >
      {children}
    </EditorialPillButton>
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
    <EditorialPillButton
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      className="disabled:opacity-60 print:hidden"
    >
      {children}
    </EditorialPillButton>
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

export default function Notfallkarte() {
  const [data, setData] = useState<NotfallkarteData>(loadData);
  const [storageError, setStorageError] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const skipNextSaveRef = useRef(false);

  useEffect(() => {
    if (!isStorageAvailable()) setStorageError(true);
  }, []);
  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (!saveData(data)) setStorageError(true);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [data]);

  const handleDeleteData = useCallback(() => {
    const confirmed = window.confirm(
      "Lokale Notfallkarten-Daten auf diesem Gerät löschen?"
    );

    if (!confirmed) return;

    if (deleteStoredData()) {
      skipNextSaveRef.current = true;
      setData(createEmptyData());
      setAnnouncement("Lokale Notfallkarten-Daten wurden gelöscht.");
    } else {
      setStorageError(true);
      setAnnouncement("Daten konnten nicht gelöscht werden.");
    }
  }, []);

  const handlePrint = useCallback(() => {
    const printWindow = window.open(
      "/notfallkarte-print.html?print=1",
      "_blank"
    );

    if (!printWindow) {
      setAnnouncement("Druckansicht konnte nicht geöffnet werden");
      return;
    }

    if (!savePrintData(data)) {
      setStorageError(true);
    }

    const payload = {
      type: NOTFALLKARTE_PRINT_MESSAGE_TYPE,
      data,
    };
    let attempts = 0;
    let intervalId: number | null = null;

    const stopSending = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const sendPayload = () => {
      try {
        printWindow.postMessage(payload, window.location.origin);
      } catch {
        /* ignore cross-window delivery failures */
      }

      attempts += 1;
      if (attempts >= 10 || printWindow.closed) {
        stopSending();
      }
    };

    sendPayload();
    intervalId = window.setInterval(sendPayload, 150);
    window.setTimeout(stopSending, 1800);
  }, [data]);

  const addContact = useCallback(() => {
    let added = false;

    setData(prev => {
      if (prev.personalContacts.length >= MAX_CONTACTS) {
        return prev;
      }

      added = true;
      return {
        ...prev,
        personalContacts: [
          ...prev.personalContacts,
          { id: createId(), name: "", phone: "", relation: "" },
        ],
      };
    });

    setAnnouncement(
      added ? "Kontakt hinzugefügt" : "Maximal drei Kontakte sind möglich."
    );
  }, []);
  const updateContact = useCallback(
    (updated: PersonalContact) =>
      setData(prev => ({
        ...prev,
        personalContacts: prev.personalContacts.map(c =>
          c.id === updated.id ? updated : c
        ),
      })),
    []
  );
  const removeContact = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      personalContacts: prev.personalContacts.filter(c => c.id !== id),
    }));
    setAnnouncement("Kontakt entfernt");
  }, []);
  const addStrategy = useCallback(() => {
    setData(prev =>
      prev.calmingStrategies.length >= MAX_STRATEGIES
        ? prev
        : {
            ...prev,
            calmingStrategies: [
              ...prev.calmingStrategies,
              { id: createId(), text: "" },
            ],
          }
    );
    setAnnouncement("Strategie hinzugefügt");
  }, []);
  const updateStrategy = useCallback(
    (id: string, text: string) =>
      setData(prev => ({
        ...prev,
        calmingStrategies: prev.calmingStrategies.map(s =>
          s.id === id ? { ...s, text } : s
        ),
      })),
    []
  );
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
        path={PERSONAL_NOTFALLKARTE_PATH}
      />
      <MedicalPageSchema
        title="Persönliche Notfallkarte"
        description="Erstellen Sie Ihre persönliche Notfallkarte mit den wichtigsten Nummern, Kontaktpersonen und Beruhigungsstrategien – zum Ausdrucken oder Speichern."
        path={PERSONAL_NOTFALLKARTE_PATH}
      />
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
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
            gesperrter Speicher. Ihre Eingaben bleiben dann möglicherweise nicht
            auf diesem Gerät erhalten. Bitte{" "}
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
        <header className="pb-12 pt-16 md:pb-16 md:pt-24 print:hidden">
          <EyebrowLabel spacing="compact">Notfallkarte</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Persönliche <em>Notfallkarte</em>
          </DisplayHeading>
          <Lede className="mt-6">
            Die wichtigsten Nummern und Ihre persönlichen Strategien – alles auf
            einen Blick. Zum Ausdrucken, als PDF speichern oder jederzeit hier
            abrufen.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--fg-tertiary)",
            }}
          >
            Sofort Hilfe brauchen?{" "}
            <AppLink href="/soforthilfe" className="editorial-link">
              Soforthilfe-Nummern
            </AppLink>{" "}
            · Situation einschätzen?{" "}
            <Link href="/wegweiser" className="editorial-link">
              Situations-Wegweiser
            </Link>
          </p>
          <ReviewBadge path={PERSONAL_NOTFALLKARTE_PATH} />
        </header>
        <hr
          className="border-0 border-t print:hidden"
          style={{ borderColor: "var(--rule-color)" }}
        />
        <div className="notfallkarte-print mt-12 space-y-12 print:mt-0 print:space-y-3">
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Notfallnummern
            </p>
            <h2
              className="font-display print:text-base"
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
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Psychiatrische Krise
            </p>
            <h2
              className="font-display print:text-base"
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
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Beratung
            </p>
            <h2
              className="font-display print:text-base"
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
          <section className="space-y-3 print:break-inside-avoid">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="uppercase" style={labelStyle}>
                  Eigene Einträge
                </p>
                <h2
                  className="mt-1 font-display print:text-base"
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
                disabled={data.personalContacts.length >= MAX_CONTACTS}
                ariaLabel="Kontakt hinzufügen"
                title={
                  data.personalContacts.length >= MAX_CONTACTS
                    ? "Maximal drei Kontaktpersonen für die Druckversion"
                    : undefined
                }
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
                Therapeut:in, Vertrauensperson, Nachbar:in. Die Druckversion
                unterstützt bis zu drei Kontakte.
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
          </section>
          <section className="space-y-3 print:break-inside-avoid">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="uppercase" style={labelStyle}>
                  Eigene Einträge
                </p>
                <h2
                  className="mt-1 font-display print:text-base"
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
          <section className="space-y-3 print:break-inside-avoid">
            <p className="uppercase" style={labelStyle}>
              Eigene Einträge
            </p>
            <h2
              className="font-display print:text-base"
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
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <PrimaryButton onClick={handlePrint}>Drucken / Als PDF</PrimaryButton>
          <SecondaryButton
            onClick={handleDeleteData}
            ariaLabel="Lokale Notfallkarten-Daten löschen"
          >
            Daten löschen
          </SecondaryButton>
        </div>
        <EditorialSectionBlock rule>
          <EditorialProse>
            <p>
              <strong>Änderungen werden automatisch lokal gespeichert.</strong>{" "}
              Die Notfallkarte nutzt dafür den Speicher Ihres Browsers auf
              diesem Gerät. Die Angaben werden nicht an einen Server dieser
              Website übertragen. Auf gemeinsam genutzten Geräten können andere
              Personen diese Einträge sehen. Nutzen Sie «Daten löschen», wenn
              die Notfallkarte nicht auf diesem Gerät bleiben soll. Beim Drucken
              oder PDF-Export werden Ihre persönlichen Einträge mit ausgegeben.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
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
