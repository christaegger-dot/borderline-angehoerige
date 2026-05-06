/* Decision tree for acute situations; crisis highlighting remains intentional. */
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { kontaktByIdStrict } from "@/data/kontakte";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";

interface Step {
  id: string;
  text: string;
  detail?: string;
  /** Indicates an emergency step – additional alert accent within block */
  emergency?: boolean;
  /** Phone contact IDs from kontakte.ts to display */
  kontakte?: string[];
  /** Link to another page */
  link?: { href: string; label: string };
}

interface Choice {
  label: string;
  nextId: string;
}

interface TreeNode {
  id: string;
  question: string;
  subtitle?: string;
  /** Sicherheits-kritischer Result-Block: alert-border-l + alert-wash bg */
  safetyCritical?: boolean;
  choices?: Choice[];
  /** If no choices, this is a leaf with steps */
  steps?: Step[];
}

// ─── Decision tree data (unverändert) ────────────────────

const TREE: TreeNode[] = [
  {
    id: "start",
    question: "Was passiert gerade?",
    subtitle: "Wählen Sie die Situation, die am ehesten zutrifft.",
    choices: [
      { label: "Suiziddrohung oder Suizidgedanken", nextId: "suizid" },
      { label: "Selbstverletzung", nextId: "selbstverletzung" },
      { label: "Starker Wutausbruch oder Aggression", nextId: "aggression" },
      { label: "Kontaktabbruch / Rückzug", nextId: "kontaktabbruch" },
      { label: "Starke Verzweiflung / Weinkrampf", nextId: "verzweiflung" },
      { label: "Manipulation / emotionale Erpressung", nextId: "manipulation" },
    ],
  },

  // ─── SUIZID ───
  {
    id: "suizid",
    question: "Besteht unmittelbare Gefahr?",
    subtitle:
      "Versuchen Sie einzuschätzen: Handelt Ihr Angehöriger gerade aktiv oder spricht er/sie davon?",
    choices: [
      {
        label: "Ja – akute Handlung oder konkreter Plan",
        nextId: "suizid_akut",
      },
      {
        label: "Nein – er/sie spricht darüber, aber keine akute Handlung",
        nextId: "suizid_gespraech",
      },
    ],
  },
  {
    id: "suizid_akut",
    question: "Akute Suizidgefahr",
    safetyCritical: true,
    steps: [
      {
        id: "s1",
        text: "Rufen Sie sofort den Notruf an",
        detail:
          "Bleiben Sie am Telefon und folgen Sie den Anweisungen der Leitstelle.",
        emergency: true,
        kontakte: ["ROT_144", "ROT_117"],
      },
      {
        id: "s2",
        text: "Bleiben Sie bei der Person",
        detail:
          "Lassen Sie Ihren Angehörigen nicht allein, bis professionelle Hilfe eintrifft. Sprechen Sie ruhig und klar.",
      },
      {
        id: "s3",
        text: "Sichern Sie die Umgebung",
        detail:
          "Entfernen Sie – wenn möglich – Medikamente, scharfe Gegenstände oder andere gefährliche Mittel aus der Reichweite.",
      },
      {
        id: "s4",
        text: "Holen Sie sich danach Entlastung",
        detail:
          "Solche Situationen sind extrem belastend. Rufen Sie danach die Dargebotene Hand an oder sprechen Sie mit einer Vertrauensperson.",
        kontakte: ["GRUEN_143"],
      },
    ],
  },
  {
    id: "suizid_gespraech",
    question: "Suizidgedanken – Gespräch führen",
    safetyCritical: true,
    steps: [
      {
        id: "s1",
        text: "Nehmen Sie es ernst – fragen Sie direkt nach",
        detail:
          "«Hast du gerade Gedanken, dir etwas anzutun?» Direktes Fragen erhöht das Risiko nicht, sondern zeigt, dass Sie die Situation ernst nehmen.",
      },
      {
        id: "s2",
        text: "Hören Sie zu, ohne zu urteilen",
        detail:
          "Vermeiden Sie Sätze wie «So schlimm ist es doch nicht» oder «Denk an deine Familie». Anerkennen Sie den Schmerz.",
      },
      {
        id: "s3",
        text: "Fragen Sie nach einem Plan",
        detail:
          "Gibt es einen konkreten Plan, ein Mittel, einen Zeitpunkt? Je konkreter, desto dringlicher ist professionelle Hilfe.",
      },
      {
        id: "s4",
        text: "Verbinden Sie mit professioneller Hilfe",
        detail:
          "Schlagen Sie vor, gemeinsam bei der PUK oder der Dargebotenen Hand anzurufen.",
        kontakte: ["GELB_PUK_ERW", "GRUEN_143"],
      },
      {
        id: "s5",
        text: "Vergessen Sie sich selbst nicht",
        detail:
          "Solche Gespräche sind enorm belastend. Holen Sie sich selbst Unterstützung.",
        link: { href: "/selbstfuersorge", label: "Zur Selbstfürsorge" },
      },
    ],
  },

  // ─── SELBSTVERLETZUNG ───
  {
    id: "selbstverletzung",
    question: "Wie schwer ist die Verletzung?",
    subtitle: "Versuchen Sie die Situation einzuschätzen.",
    choices: [
      {
        label: "Schwere Verletzung – braucht medizinische Hilfe",
        nextId: "selbstverletzung_schwer",
      },
      {
        label: "Leichte Verletzung – keine akute medizinische Gefahr",
        nextId: "selbstverletzung_leicht",
      },
    ],
  },
  {
    id: "selbstverletzung_schwer",
    question: "Schwere Selbstverletzung",
    safetyCritical: true,
    steps: [
      {
        id: "s1",
        text: "Rufen Sie den Rettungsdienst",
        detail:
          "Bei starker Blutung oder Vergiftungsverdacht: sofort 144 anrufen.",
        emergency: true,
        kontakte: ["ROT_144"],
      },
      {
        id: "s2",
        text: "Leisten Sie Erste Hilfe",
        detail:
          "Stillen Sie Blutungen mit sauberem Tuch, bringen Sie die Person in eine stabile Position.",
      },
      {
        id: "s3",
        text: "Bleiben Sie ruhig und präsent",
        detail: "«Ich bin da. Hilfe kommt.» Vermeiden Sie Vorwürfe.",
      },
    ],
  },
  {
    id: "selbstverletzung_leicht",
    question: "Leichte Selbstverletzung",
    steps: [
      {
        id: "s1",
        text: "Bleiben Sie ruhig – keine Panik zeigen",
        detail:
          "Selbstverletzung ist oft ein Versuch, unerträgliche Spannung abzubauen. Ihre Ruhe hilft.",
      },
      {
        id: "s2",
        text: "Versorgen Sie die Verletzung sachlich",
        detail:
          "Bieten Sie Pflaster oder Verband an, ohne die Verletzung zu dramatisieren oder zu ignorieren.",
      },
      {
        id: "s3",
        text: "Bieten Sie Alternativen an",
        detail:
          "«Möchtest du stattdessen Eiswürfel halten, kalt duschen oder etwas anderes Intensives spüren?»",
      },
      {
        id: "s4",
        text: "Sprechen Sie es später an",
        detail:
          "Nicht in der akuten Situation, aber danach: «Ich habe gesehen, dass es dir schlecht ging. Können wir darüber reden?»",
      },
      {
        id: "s5",
        text: "Professionelle Hilfe einbeziehen",
        detail:
          "Wenn Selbstverletzung wiederholt vorkommt, ist therapeutische Unterstützung wichtig.",
        kontakte: ["GELB_PUK_ERW"],
      },
    ],
  },

  // ─── AGGRESSION ───
  {
    id: "aggression",
    question: "Fühlen Sie sich körperlich bedroht?",
    subtitle: "Ihre Sicherheit geht vor.",
    choices: [
      {
        label: "Ja – ich fühle mich unsicher oder bedroht",
        nextId: "aggression_gefahr",
      },
      {
        label: "Nein – starke Emotionen, aber keine körperliche Bedrohung",
        nextId: "aggression_verbal",
      },
    ],
  },
  {
    id: "aggression_gefahr",
    question: "Sie fühlen sich bedroht",
    safetyCritical: true,
    steps: [
      {
        id: "s1",
        text: "Bringen Sie sich in Sicherheit",
        detail:
          "Verlassen Sie den Raum oder die Wohnung. Ihre Sicherheit hat absolute Priorität.",
      },
      {
        id: "s2",
        text: "Rufen Sie bei Bedarf die Polizei",
        detail: "Wenn Sie sich bedroht fühlen oder Gewalt droht.",
        emergency: true,
        kontakte: ["ROT_117"],
      },
      {
        id: "s3",
        text: "Sie tragen keine Schuld",
        detail:
          "Gewalt ist nie akzeptabel, auch nicht in einer Krise. Sich zu schützen ist kein Verrat.",
      },
      {
        id: "s4",
        text: "Holen Sie sich Unterstützung",
        detail:
          "Sprechen Sie über das Erlebte – mit einer Vertrauensperson oder einer Beratungsstelle.",
        kontakte: ["GRUEN_143"],
      },
    ],
  },
  {
    id: "aggression_verbal",
    question: "Verbale Eskalation deeskalieren",
    steps: [
      {
        id: "s1",
        text: "Sprechen Sie langsam und leise",
        detail:
          "Ihre ruhige Stimme kann ansteckend wirken. Senken Sie bewusst Lautstärke und Tempo.",
      },
      {
        id: "s2",
        text: "Validieren Sie die Emotion",
        detail:
          "«Ich sehe, dass du gerade extrem wütend bist. Das muss sich furchtbar anfühlen.»",
      },
      {
        id: "s3",
        text: "Setzen Sie eine klare Grenze",
        detail:
          "«Ich möchte für dich da sein, aber ich kann nicht bleiben, wenn du mich anschreist. Sollen wir 10 Minuten Pause machen?»",
      },
      {
        id: "s4",
        text: "Bieten Sie körperliche Entladung an",
        detail:
          "Kissen schlagen, Eiswürfel halten, kaltes Wasser – intensive Reize helfen, die Spannung abzubauen.",
      },
      {
        id: "s5",
        text: "Gehen Sie, wenn es nötig ist",
        detail:
          "Wenn die Eskalation nicht nachlässt, dürfen Sie den Raum verlassen. Das ist kein Aufgeben, sondern Selbstschutz.",
        link: { href: "/grenzen", label: "Mehr zu Grenzen setzen" },
      },
    ],
  },

  // ─── KONTAKTABBRUCH ───
  {
    id: "kontaktabbruch",
    question: "Kontaktabbruch oder Rückzug",
    steps: [
      {
        id: "s1",
        text: "Atmen Sie durch – Rückzug ist nicht Ihr Versagen",
        detail:
          "Kontaktabbruch kann ein Schutzmechanismus sein. Er bedeutet nicht, dass Sie etwas falsch gemacht haben.",
      },
      {
        id: "s2",
        text: "Senden Sie eine kurze, wertungsfreie Nachricht",
        detail:
          "«Ich bin da, wenn du bereit bist. Kein Druck.» Einmal senden, dann Raum lassen.",
      },
      {
        id: "s3",
        text: "Setzen Sie sich eine innere Frist",
        detail:
          "Überlegen Sie sich: Wie lange warten Sie, bevor Sie sich erneut melden? Z.B. nach 3 Tagen eine weitere kurze Nachricht.",
      },
      {
        id: "s4",
        text: "Drängen Sie nicht",
        detail:
          "Wiederholtes Anrufen oder Vorbeikommen kann den Rückzug verstärken. Respektieren Sie die Grenze, auch wenn es schwerfällt.",
      },
      {
        id: "s5",
        text: "Sorgen Sie für sich selbst",
        detail:
          "Kontaktabbruch tut weh. Sprechen Sie mit jemandem darüber – einer Freundin, einem Therapeuten oder der Dargebotenen Hand.",
        kontakte: ["GRUEN_143"],
        link: { href: "/selbstfuersorge", label: "Zur Selbstfürsorge" },
      },
      {
        id: "s6",
        text: "Wenn Sie sich Sorgen machen",
        detail:
          "Wenn der Rückzug untypisch ist und Sie Suizidgefahr befürchten, vertrauen Sie Ihrem Gefühl und handeln Sie.",
        kontakte: ["GELB_PUK_ERW"],
      },
    ],
  },

  // ─── VERZWEIFLUNG ───
  {
    id: "verzweiflung",
    question: "Starke Verzweiflung begleiten",
    steps: [
      {
        id: "s1",
        text: "Seien Sie einfach da",
        detail:
          "Sie müssen nichts Kluges sagen. «Ich bin hier» reicht oft. Setzen Sie sich daneben, halten Sie aus.",
      },
      {
        id: "s2",
        text: "Validieren Sie den Schmerz",
        detail:
          "«Das muss sich gerade furchtbar anfühlen. Es ist okay zu weinen.» Keine Ratschläge, kein Relativieren.",
      },
      {
        id: "s3",
        text: "Bieten Sie Körperliches an",
        detail:
          "Ein Glas Wasser, eine Decke, ein warmes Getränk. Kleine, konkrete Gesten helfen mehr als grosse Worte.",
      },
      {
        id: "s4",
        text: "Erden Sie sanft",
        detail:
          "Wenn die Person bereit ist: «Spürst du deine Füsse auf dem Boden? Kannst du langsam ein- und ausatmen?»",
        link: { href: "/selbstfuersorge#grounding", label: "Grounding-Übung" },
      },
      {
        id: "s5",
        text: "Wissen Sie, wann es zu viel wird",
        detail:
          "Wenn die Verzweiflung Stunden anhält oder Sie Suizidgedanken vermuten, ziehen Sie Hilfe hinzu.",
        kontakte: ["GRUEN_143", "GELB_PUK_ERW"],
      },
    ],
  },

  // ─── MANIPULATION ───
  {
    id: "manipulation",
    question: "Emotionale Erpressung / Manipulation",
    steps: [
      {
        id: "s1",
        text: "Erkennen Sie das Muster",
        detail:
          "«Wenn du gehst, bringe ich mich um» oder «Ohne dich kann ich nicht leben» – das sind Zeichen extremer Not, aber auch Versuche, Kontrolle zu behalten.",
      },
      {
        id: "s2",
        text: "Nehmen Sie die Not ernst, aber nicht die Verantwortung",
        detail:
          "Die Gefühle dahinter sind real. Aber Sie sind nicht dafür verantwortlich, was ein anderer Mensch mit seinem Leben tut.",
      },
      {
        id: "s3",
        text: "Bleiben Sie bei Ihrer Grenze",
        detail:
          "«Ich nehme deine Verzweiflung ernst. Aber ich kann diese Entscheidung nicht für dich treffen. Lass uns gemeinsam Hilfe holen.»",
      },
      {
        id: "s4",
        text: "Delegieren Sie an Profis",
        detail:
          "Wenn jemand mit Suizid droht, um Sie zu halten: Informieren Sie professionelle Hilfe. Das ist kein Verrat, sondern Fürsorge.",
        kontakte: ["GELB_PUK_ERW", "GRUEN_143"],
      },
      {
        id: "s5",
        text: "Schützen Sie sich",
        detail:
          "Emotionale Erpressung ist eine Form von Gewalt. Sie brauchen eigene Unterstützung, um damit umzugehen.",
        link: { href: "/grenzen", label: "Mehr zu Grenzen setzen" },
      },
    ],
  },
];

function nodeById(id: string): TreeNode | undefined {
  return TREE.find(n => n.id === id);
}

// ─── Editorial-Style Konstanten ──────────────────────────

const labelStyle = {
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-caps)",
  color: "var(--fg-tertiary)",
  fontWeight: 500,
} as const;

const questionStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: "var(--weight-display)",
  lineHeight: "var(--lh-snug)",
  color: "var(--fg-primary)",
  letterSpacing: "var(--tracking-tight)",
};

const subtitleStyle = {
  fontSize: "var(--text-md)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--fg-secondary)",
};

const stepTitleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-md)",
  fontWeight: "var(--weight-display)",
  lineHeight: "var(--lh-snug)",
  color: "var(--fg-primary)",
  letterSpacing: "var(--tracking-tight)",
};

const detailStyle = {
  fontSize: "var(--text-sm)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--fg-secondary)",
};

// ─── Sub-components ──────────────────────────────────────

function KontaktInline({ kontaktId }: { kontaktId: string }) {
  const k = kontaktByIdStrict(kontaktId);
  return (
    <a
      href={`tel:${k.tel}`}
      className="editorial-link"
      style={{ fontSize: "var(--text-sm)" }}
    >
      Telefon {k.nummer} – {k.label}
    </a>
  );
}

function ChoiceButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <EditorialPillButton variant="choice" onClick={onClick}>
      {label}
    </EditorialPillButton>
  );
}

function NavPillButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <EditorialPillButton
      variant="secondary"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </EditorialPillButton>
  );
}

// ─── Main component ──────────────────────────────────────

export default function SituationsWegweiser() {
  const [history, setHistory] = useState<string[]>(["start"]);
  const currentId = history[history.length - 1];
  const node = nodeById(currentId);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const navigate = useCallback((nextId: string) => {
    setHistory(prev => [...prev, nextId]);
    scrollToResult();
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
    scrollToResult();
  }, []);

  const reset = useCallback(() => {
    setHistory(["start"]);
  }, []);

  if (!node) return null;

  const isStart = currentId === "start";
  const depth = history.length - 1;
  const isSafetyCritical = node.safetyCritical === true;

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb ── */}
      {!isStart && (
        <p
          aria-label="Wegweiser-Pfad"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 uppercase"
          style={labelStyle}
        >
          <button type="button" onClick={reset} className="editorial-link">
            Start
          </button>
          {history.slice(1).map((hId, i) => {
            const hNode = nodeById(hId);
            const isLast = i === history.length - 2;
            return (
              <span key={hId} className="flex items-center gap-x-2">
                <span aria-hidden="true">·</span>
                {isLast ? (
                  <span style={{ color: "var(--fg-primary)" }}>
                    {hNode?.question}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHistory(history.slice(0, i + 2))}
                    className="editorial-link"
                  >
                    {hNode?.question}
                  </button>
                )}
              </span>
            );
          })}
        </p>
      )}

      {/* ── Frage / Resultat ── */}
      <div ref={resultRef} className="scroll-mt-24 md:scroll-mt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/*
            Sicherheits-kritische Resultat-Blöcke (suizid_akut,
            suizid_gespraech, selbstverletzung_schwer, aggression_gefahr)
            bekommen alert-border-l + alert-wash bg. Per-Brief-Erlaubnis
            analog Grenzen-`gewalt`-Sektion.
          */}
            <div
              className={isSafetyCritical ? "border-l-4 pl-6 py-2" : ""}
              style={
                isSafetyCritical
                  ? {
                      borderColor: "var(--color-alert)",
                      backgroundColor:
                        "var(--color-alert-wash, rgba(197,95,61,0.05))",
                    }
                  : undefined
              }
            >
              <header className="space-y-2">
                <h2 style={questionStyle}>{node.question}</h2>
                {node.subtitle && <p style={subtitleStyle}>{node.subtitle}</p>}
              </header>

              {/* Choice-Buttons */}
              {node.choices && (
                <div className="mt-8 space-y-3">
                  {node.choices.map(choice => (
                    <ChoiceButton
                      key={choice.nextId}
                      label={choice.label}
                      onClick={() => navigate(choice.nextId)}
                    />
                  ))}
                </div>
              )}

              {/* Steps (Resultat) */}
              {node.steps && (
                <ol className="mt-8 space-y-8">
                  {node.steps.map((step, i) => (
                    <li
                      key={step.id}
                      className="border-t pt-6"
                      style={{ borderColor: "var(--rule-color)" }}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: step.emergency
                              ? "var(--color-alert)"
                              : "var(--accent-primary)",
                            color: "var(--bg-primary)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 600,
                          }}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 space-y-2">
                          <h3 style={stepTitleStyle}>{step.text}</h3>
                          {step.detail && (
                            <p style={detailStyle}>{step.detail}</p>
                          )}
                          {step.kontakte && step.kontakte.length > 0 && (
                            <p className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
                              {step.kontakte.map(kId => (
                                <KontaktInline key={kId} kontaktId={kId} />
                              ))}
                            </p>
                          )}
                          {step.link && (
                            <p
                              className="pt-1"
                              style={{ fontSize: "var(--text-sm)" }}
                            >
                              <a
                                href={step.link.href}
                                className="editorial-link"
                              >
                                {step.link.label}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between gap-3">
        {!isStart ? (
          <NavPillButton onClick={goBack} ariaLabel="Eine Frage zurück">
            ← Zurück
          </NavPillButton>
        ) : (
          <div />
        )}
        {depth > 0 && (
          <NavPillButton onClick={reset} ariaLabel="Wegweiser neu starten">
            Von vorne beginnen
          </NavPillButton>
        )}
      </div>
    </div>
  );
}
