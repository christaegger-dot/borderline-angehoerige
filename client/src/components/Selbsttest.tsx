/* Interactive self-check with weighted routing for Angehörigen-Orientierung. */
import { useCallback, useEffect, useRef, useState } from "react";
import AppLink from "@/components/AppLink";
import { m, AnimatePresence } from "framer-motion";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";

const immediateHelpAnswers = new Set(["akut", "unsicher"]);

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: {
    text: string;
    value: string;
    weight: Record<string, number>;
  }[];
}

interface Result {
  id: string;
  title: string;
  description: string;
  primaryLink: string;
  primaryText: string;
  secondaryLinks: { href: string; text: string }[];
}

const concernReasonLabels: Record<string, string> = {
  verstehen: "Sie möchten das Erleben Ihres Angehörigen besser einordnen.",
  helfen:
    "Sie suchen nach einer hilfreichen Rolle, ohne alles übernehmen zu müssen.",
  kommunikation:
    "Schwierige Gespräche und Eskalationen stehen für Sie im Vordergrund.",
  erschoepft: "Ihre eigene Erschöpfung braucht Raum und Unterstützung.",
  grenzen: "Sie möchten Ihre Grenzen klarer wahrnehmen und benennen.",
};

const wellbeingReasonLabels: Record<string, string> = {
  gut: "Sie haben Ihre eigene Kraft derzeit als tragfähig eingeschätzt.",
  okay: "Ihre Kraft ist vorhanden, die Situation kostet Sie aber zeitweise Energie.",
  erschoepft: "Sie haben angegeben, dringend Unterstützung zu brauchen.",
  ueberfordert: "Sie haben angegeben, im Moment nicht mehr weiterzuwissen.",
};

const questions: Question[] = [
  {
    id: 1,
    text: "Wie würden Sie die aktuelle Situation beschreiben?",
    subtext: "Wählen Sie die Beschreibung, die am besten passt.",
    options: [
      {
        text: "Akute Krise – Suizidgedanken, Selbstverletzung oder Gefahr",
        value: "akut",
        weight: { notfall: 10, krise: 5 },
      },
      {
        text: "Ich bin unsicher, ob gerade Gefahr besteht",
        value: "unsicher",
        weight: { notfall: 10 },
      },
      {
        text: "Hohe Anspannung – starke Emotionen, drohende Eskalation",
        value: "hoch",
        weight: { krise: 8, kommunizieren: 3 },
      },
      {
        text: "Angespannt – Konflikte, Missverständnisse, Rückzug",
        value: "mittel",
        weight: { kommunizieren: 6, grenzen: 4, verstehen: 2 },
      },
      {
        text: "Relativ stabil – Zeit zum Lernen und Vorbereiten",
        value: "stabil",
        weight: { verstehen: 5, unterstuetzen: 5, selbstfuersorge: 3 },
      },
    ],
  },
  {
    id: 2,
    text: "Was beschäftigt Sie gerade am meisten?",
    options: [
      {
        text: "Ich verstehe nicht, was in meinem Angehörigen vorgeht",
        value: "verstehen",
        weight: { verstehen: 8, unterstuetzen: 2 },
      },
      {
        text: "Ich weiss nicht, wie ich helfen kann",
        value: "helfen",
        weight: { unterstuetzen: 7, kommunizieren: 3 },
      },
      {
        text: "Die Kommunikation ist schwierig oder eskaliert oft",
        value: "kommunikation",
        weight: { kommunizieren: 8, grenzen: 2 },
      },
      {
        text: "Ich fühle mich überfordert und erschöpft",
        value: "erschoepft",
        weight: { selbstfuersorge: 8, grenzen: 4 },
      },
      {
        text: "Ich habe Mühe, Grenzen zu setzen",
        value: "grenzen",
        weight: { grenzen: 8, kommunizieren: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "Wie intensiv war die Belastung in den letzten Wochen?",
    subtext: "Dies hilft uns, passende Ressourcen zu empfehlen.",
    options: [
      {
        text: "Kaum spürbar — ich komme gut zurecht",
        value: "niedrig",
        weight: { verstehen: 4, unterstuetzen: 4 },
      },
      {
        text: "Deutlich spürbar — es kostet mich Kraft",
        value: "mittel",
        weight: { kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 },
      },
      {
        text: "Sehr stark — ich bin oft erschöpft",
        value: "hoch",
        weight: { selbstfuersorge: 6, grenzen: 3, kommunizieren: 2 },
      },
      {
        text: "Ich bin am Limit",
        value: "limit",
        weight: { selbstfuersorge: 8, krise: 3, grenzen: 2 },
      },
    ],
  },
  {
    id: 4,
    text: "Gibt es eine fachliche Einordnung?",
    subtext:
      "Die Auswahl steuert nur passende Informationen. Sie stellt keine Diagnose und bewertet keine Zustimmung oder Ablehnung.",
    options: [
      {
        text: "Eine Borderline-Diagnose wurde fachlich gestellt",
        value: "diagnose",
        weight: { unterstuetzen: 3, kommunizieren: 2, grenzen: 2 },
      },
      {
        text: "Eine fachliche Abklärung läuft",
        value: "abklaerung",
        weight: { diagnostik: 8, verstehen: 4 },
      },
      {
        text: "Keine Diagnose – ich suche Orientierung zu beobachtbaren Situationen",
        value: "vermutung",
        weight: { diagnostik: 8, verstehen: 5 },
      },
      {
        text: "Die Diagnose ist umstritten oder eine Zweitmeinung ist gewünscht",
        value: "abgelehnt",
        weight: { diagnostik: 7, kommunizieren: 3, grenzen: 3 },
      },
      {
        text: "Ich weiss es nicht oder möchte es nicht angeben",
        value: "unklar",
        weight: { diagnostik: 7, verstehen: 5 },
      },
    ],
  },
  {
    id: 5,
    text: "Wie geht es Ihnen selbst gerade?",
    options: [
      {
        text: "Gut – ich habe Energie und Ressourcen",
        value: "gut",
        weight: { verstehen: 3, unterstuetzen: 4, kommunizieren: 3 },
      },
      {
        text: "Okay – manchmal anstrengend, aber ich komme zurecht",
        value: "okay",
        weight: { selbstfuersorge: 3, kommunizieren: 3, grenzen: 2 },
      },
      {
        text: "Erschöpft – ich brauche dringend Unterstützung",
        value: "erschoepft",
        weight: { selbstfuersorge: 8, grenzen: 4 },
      },
      {
        text: "Überfordert – ich weiss nicht mehr weiter",
        value: "ueberfordert",
        weight: { selbstfuersorge: 6, notfall: 2, krise: 2 },
      },
    ],
  },
];

const intensityReflections: Record<string, string> = {
  limit: "Sie haben angegeben, gerade am Limit zu sein.",
  hoch: "Sie haben angegeben, sich oft erschöpft zu fühlen.",
  mittel: "Sie haben angegeben, dass die Belastung Sie Kraft kostet.",
  niedrig: "Sie haben angegeben, derzeit gut zurechtzukommen.",
};

const results: Result[] = [
  {
    id: "notfall",
    title: "Akute Hilfe und Notfallkontakte",
    description:
      "Diese Website nimmt keine Risikoeinschätzung vor. Bei akuter Gefahr oder wenn Sie die Dringlichkeit nicht sicher einschätzen können, finden Sie hier passende Anlaufstellen.",
    primaryLink: "/soforthilfe",
    primaryText: "Akute Hilfe und Notfallkontakte",
    secondaryLinks: [],
  },
  {
    id: "diagnostik",
    title: "Diagnostik einordnen",
    description:
      "Wenn eine fachliche Einordnung fehlt, offen ist oder nicht geteilt wird, hilft eine ruhige Orientierung: Was wurde beobachtet, welche Unsicherheiten gibt es, wer kann abklären oder eine Zweitmeinung anbieten – und wie lässt sich darüber sprechen, ohne zu drängen?",
    primaryLink: "/verstehen/diagnostik",
    primaryText: "Diagnostik verstehen",
    secondaryLinks: [
      { href: "/verstehen", text: "Borderline verstehen" },
      {
        href: "/verstehen/diagnostik#ablehnung",
        text: "Über Diagnose sprechen",
      },
    ],
  },
  {
    id: "krise",
    title: "Krise einordnen und Schutz wählen",
    description:
      "Sie finden Orientierung zu beobachtbaren Warnzeichen, professioneller Einschätzung, eigenem Schutz und passenden Hilfen. Sie müssen eine Krise nicht allein begleiten oder lösen.",
    primaryLink: "/unterstuetzen/krise",
    primaryText: "Krisenwege und Schutzmöglichkeiten",
    secondaryLinks: [
      { href: "/kommunizieren", text: "Kommunikationsstrategien" },
      { href: "/soforthilfe", text: "Soforthilfe" },
    ],
  },
  {
    id: "kommunizieren",
    title: "Kommunikation verbessern",
    description:
      "Zuhören, offen nachfragen und die eigene Grenze benennen können ein Gespräch unterstützen. Sie dürfen es auch pausieren oder beenden.",
    primaryLink: "/kommunizieren",
    primaryText: "Kommunikationstechniken entdecken",
    secondaryLinks: [
      { href: "/grenzen", text: "Grenzen setzen lernen" },
      { href: "/verstehen", text: "Borderline verstehen" },
    ],
  },
  {
    id: "verstehen",
    title: "Borderline verstehen",
    description:
      "Wissen kann Orientierung geben. Erfahren Sie, was die Diagnose beschreiben kann, wo ihre Grenzen liegen und wie unterschiedlich Menschen sie erleben.",
    primaryLink: "/verstehen",
    primaryText: "Borderline verstehen",
    secondaryLinks: [
      {
        href: "/verstehen/diagnostik",
        text: "Wie wird eine Diagnose gestellt?",
      },
      { href: "/unterstuetzen/uebersicht", text: "Unterstützungsstrategien" },
      { href: "/kommunizieren", text: "Kommunikation verbessern" },
    ],
  },
  {
    id: "unterstuetzen",
    title: "Unterstützung frei wählen",
    description:
      "Sie können Unterstützung anbieten, soweit sie gewollt, sicher und für Sie tragbar ist. Behandlung und Genesung sind nicht Ihre Verantwortung.",
    primaryLink: "/unterstuetzen/uebersicht",
    primaryText: "Unterstützungsstrategien entdecken",
    secondaryLinks: [
      { href: "/unterstuetzen/alltag", text: "Alltag gestalten" },
      {
        href: "/unterstuetzen/therapie",
        text: "Therapie und Angehörigenrolle",
      },
    ],
  },
  {
    id: "grenzen",
    title: "Grenzen setzen",
    description:
      "Grenzen beschreiben, was für Sie möglich, sicher und tragbar ist. Sie dürfen sie klar kommunizieren und brauchen dafür weder Zustimmung noch ein Rückkehrversprechen.",
    primaryLink: "/grenzen",
    primaryText: "Grenzen setzen lernen",
    secondaryLinks: [
      { href: "/selbstfuersorge", text: "Selbstfürsorge stärken" },
      { href: "/kommunizieren", text: "Kommunikationstechniken" },
    ],
  },
  {
    id: "selbstfuersorge",
    title: "Selbstfürsorge priorisieren",
    description:
      "Auch wenn Ihre Kraft knapp ist, dürfen Sie Unterstützung begrenzen und Hilfe für sich suchen. Ihre eigene Gesundheit ist genauso wichtig.",
    primaryLink: "/selbstfuersorge",
    primaryText: "Selbstfürsorge-Strategien",
    secondaryLinks: [
      { href: "/grenzen", text: "Grenzen setzen" },
      { href: "/materialien", text: "Materialien & Ressourcen" },
    ],
  },
];

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

const subtextStyle = {
  fontSize: "var(--text-md)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--fg-secondary)",
};

const bodyStyle = {
  fontSize: "var(--text-md)",
  lineHeight: "var(--lh-relaxed)",
  color: "var(--fg-secondary)",
};

const diagnosisNeedsGuidance = new Set([
  "abklaerung",
  "vermutung",
  "abgelehnt",
  "unklar",
]);

// ─── Sub-components ──────────────────────────────────────

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

function OptionButton({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <EditorialPillButton
      variant="choice"
      selected={selected}
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </EditorialPillButton>
  );
}

// ─── Main component ──────────────────────────────────────

export default function Selbsttest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusQuestionAfterChange = useRef(false);

  const setQuestionHeadingRef = useCallback(
    (heading: HTMLHeadingElement | null) => {
      questionHeadingRef.current = heading;
      if (heading && !showResult && focusQuestionAfterChange.current) {
        heading.focus({ preventScroll: true });
        focusQuestionAfterChange.current = false;
      }
    },
    [showResult]
  );

  useEffect(() => {
    if (showResult) {
      focusQuestionAfterChange.current = false;
      resultHeadingRef.current?.focus();
    }
  }, [showResult]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const handleAnswer = (option: Question["options"][0]) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedOption(option.value);

    const newScores = { ...scores };
    Object.entries(option.weight).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    setAnswers({ ...answers, [questions[currentQuestion].id]: option.value });

    // Krisensignale unterbrechen die Orientierung sofort, ohne Folgfragen
    // oder die sonstige Übergangsverzögerung.
    if (currentQuestion === 0 && immediateHelpAnswers.has(option.value)) {
      setShowResult(true);
      setIsTransitioning(false);
      return;
    }

    transitionTimer.current = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        focusQuestionAfterChange.current = true;
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      const prevQuestionId = questions[currentQuestion - 1].id;
      const prevAnswerValue = answers[prevQuestionId];
      if (prevAnswerValue) {
        const prevOption = questions[currentQuestion - 1].options.find(
          o => o.value === prevAnswerValue
        );
        if (prevOption) {
          const newScores = { ...scores };
          Object.entries(prevOption.weight).forEach(([key, value]) => {
            newScores[key] = (newScores[key] || 0) - value;
          });
          setScores(newScores);
        }
      }
      focusQuestionAfterChange.current = true;
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[prevQuestionId] || null);
    }
  };

  const restart = () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
    focusQuestionAfterChange.current = true;
    setShowResult(false);
    setSelectedOption(null);
    setIsTransitioning(false);
  };

  const getTopResult = (): Result => {
    if (immediateHelpAnswers.has(answers[1])) {
      return results.find(r => r.id === "notfall") || results[0];
    }

    let maxScore = 0;
    let topCategory = "verstehen";

    Object.entries(scores).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topCategory = category;
      }
    });

    return results.find(r => r.id === topCategory) || results[4];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // ── Resultat-Anzeige ──
  if (showResult) {
    const result = getTopResult();
    const diagnosisStatus = answers[4];
    const reflection = immediateHelpAnswers.has(answers[1])
      ? "Sie müssen keine weiteren Fragen beantworten. Bei Sorgen um die Sicherheit oder Unsicherheit können Sie passende Anlaufstellen auf der Soforthilfe-Seite finden."
      : (intensityReflections[answers[3]] ?? null);
    const secondaryLinks =
      result.id !== "notfall" &&
      diagnosisStatus &&
      diagnosisNeedsGuidance.has(diagnosisStatus)
        ? [
            ...result.secondaryLinks,
            ...(result.primaryLink === "/verstehen/diagnostik" ||
            result.secondaryLinks.some(
              link => link.href === "/verstehen/diagnostik"
            )
              ? []
              : [
                  {
                    href: "/verstehen/diagnostik",
                    text: "Diagnostik einordnen",
                  },
                ]),
          ]
        : result.secondaryLinks;
    const reasons =
      result.id === "notfall"
        ? []
        : [
            concernReasonLabels[answers[2]],
            wellbeingReasonLabels[answers[5]],
          ].filter((reason): reason is string => Boolean(reason));

    return (
      <m.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-live="polite"
        role="status"
      >
        <div>
          <p className="uppercase" style={labelStyle}>
            Redaktionelle Orientierung
          </p>
          <h2
            ref={resultHeadingRef}
            tabIndex={-1}
            className="mt-2"
            style={questionStyle}
          >
            {result.title}
          </h2>
          {reflection && (
            <p className="mt-4" style={{ ...bodyStyle, fontStyle: "italic" }}>
              {reflection}
            </p>
          )}
          <p className="mt-4" style={bodyStyle}>
            {result.description}
          </p>

          {reasons.length > 0 && (
            <div
              className="mt-6 border-t pt-5"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <p className="uppercase" style={labelStyle}>
                Warum dieser Einstieg erscheint
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2" style={bodyStyle}>
                {reasons.map(reason => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <p className="mt-3" style={bodyStyle}>
                Die Zuordnung folgt einer redaktionellen Gewichtung Ihrer
                Auswahl. Sie ist keine fachliche oder klinische Beurteilung.
              </p>
            </div>
          )}

          {/* Primary CTA — bleibt echter Button (Tier-1-Navigation) */}
          <p
            className="mt-8 flex flex-wrap gap-x-5 gap-y-1"
            style={{ fontSize: "var(--text-md)" }}
          >
            <AppLink
              href={result.primaryLink}
              className="inline-block rounded-full border px-5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: "var(--accent-primary)",
                backgroundColor: "var(--accent-primary)",
                color: "var(--bg-primary)",
                fontWeight: 500,
              }}
            >
              {result.primaryText}
            </AppLink>
          </p>

          {/* Secondary Links */}
          {result.id !== "notfall" && secondaryLinks.length > 0 && (
            <div
              className="mt-8 border-t pt-6"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <p className="uppercase" style={labelStyle}>
                Weitere relevante Themen
              </p>
              <p
                className="mt-3 flex flex-wrap gap-x-5 gap-y-1"
                style={{ fontSize: "var(--text-md)" }}
              >
                {secondaryLinks.map(link => (
                  <AppLink
                    key={link.href + link.text}
                    href={link.href}
                    className="editorial-link"
                  >
                    {link.text}
                  </AppLink>
                ))}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <NavPillButton onClick={restart} ariaLabel="Zurück zur Auswahl">
            Zurück zur Auswahl
          </NavPillButton>
        </div>
      </m.div>
    );
  }

  // ── Frage-Anzeige ──
  const question = questions[currentQuestion];

  return (
    <form
      aria-label="Passende Inhalte finden"
      className="space-y-8"
      onSubmit={e => e.preventDefault()}
    >
      {/* Progress-Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="uppercase" style={labelStyle}>
            Frage {currentQuestion + 1} von {questions.length}
          </p>
          {currentQuestion > 0 && (
            <NavPillButton onClick={goBack} ariaLabel="Eine Frage zurück">
              ← Zurück
            </NavPillButton>
          )}
        </div>
        <div
          className="h-px overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Fortschritt: Frage ${currentQuestion + 1} von ${questions.length}`}
          style={{ backgroundColor: "var(--rule-color)" }}
        >
          <m.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          <header className="space-y-2">
            <h2 ref={setQuestionHeadingRef} tabIndex={-1} style={questionStyle}>
              {question.text}
            </h2>
            {question.subtext && <p style={subtextStyle}>{question.subtext}</p>}
          </header>

          <fieldset className="m-0 space-y-3 border-0 p-0">
            <legend className="sr-only">{question.text}</legend>
            {question.options.map(option => (
              <OptionButton
                key={option.value}
                label={option.text}
                selected={selectedOption === option.value}
                disabled={isTransitioning}
                onClick={() => handleAnswer(option)}
              />
            ))}
          </fieldset>
        </m.div>
      </AnimatePresence>
    </form>
  );
}
