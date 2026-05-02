/* Interactive self-check with weighted routing and unchanged result logic. */
import { useEffect, useRef, useState } from "react";
import AppLink from "@/components/AppLink";
import { motion, AnimatePresence } from "framer-motion";
import { EditorialPillButton } from "@/components/ui/EditorialPillButton";

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
  /** Sicherheits-kritisches Resultat: alert-border-l + alert-wash bg */
  safetyCritical?: boolean;
}

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
    text: "Wie lange begleiten Sie Ihren Angehörigen schon?",
    subtext: "Dies hilft uns, passende Ressourcen zu empfehlen.",
    options: [
      {
        text: "Die Diagnose ist neu (unter 6 Monate)",
        value: "neu",
        weight: { verstehen: 6, unterstuetzen: 4 },
      },
      {
        text: "Seit einiger Zeit (6 Monate bis 2 Jahre)",
        value: "mittel",
        weight: { kommunizieren: 4, grenzen: 3, selbstfuersorge: 3 },
      },
      {
        text: "Schon lange (über 2 Jahre)",
        value: "lang",
        weight: { selbstfuersorge: 5, grenzen: 3, kommunizieren: 2 },
      },
      {
        text: "Keine offizielle Diagnose, aber ich vermute Borderline",
        value: "vermutung",
        weight: { verstehen: 7, unterstuetzen: 3 },
      },
    ],
  },
  {
    id: 4,
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

const results: Result[] = [
  {
    id: "notfall",
    title: "Sofortige Hilfe",
    description:
      "In einer akuten Krise ist schnelles Handeln wichtig. Hier finden Sie Notfallnummern und Anlaufstellen.",
    primaryLink: "/soforthilfe",
    primaryText: "Zu den Notfallressourcen",
    secondaryLinks: [
      { href: "/unterstuetzen/krise", text: "Krisenbegleitung lernen" },
    ],
    safetyCritical: true,
  },
  {
    id: "krise",
    title: "Krisenbegleitung",
    description:
      "Sie können lernen, Ihren Angehörigen in schwierigen Momenten zu begleiten – ohne sich selbst zu verlieren.",
    primaryLink: "/unterstuetzen/krise",
    primaryText: "Krisenbegleitung lernen",
    secondaryLinks: [
      { href: "/kommunizieren", text: "Kommunikationsstrategien" },
      { href: "/soforthilfe", text: "Soforthilfe" },
    ],
  },
  {
    id: "kommunizieren",
    title: "Kommunikation verbessern",
    description:
      "Validierung und SET-Kommunikation können helfen, auch in schwierigen Momenten im Gespräch zu bleiben.",
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
      "Wissen schafft Verständnis. Erfahren Sie, was Borderline ist und wie die Störung das Erleben beeinflusst.",
    primaryLink: "/verstehen",
    primaryText: "Borderline verstehen",
    secondaryLinks: [
      { href: "/diagnostik", text: "Wie wird eine Diagnose gestellt?" },
      { href: "/unterstuetzen/uebersicht", text: "Unterstützungsstrategien" },
      { href: "/kommunizieren", text: "Kommunikation verbessern" },
    ],
  },
  {
    id: "unterstuetzen",
    title: "Unterstützung geben",
    description:
      "Sie können einen wichtigen Beitrag leisten – nicht als Therapeut, sondern als verlässlicher Begleiter.",
    primaryLink: "/unterstuetzen/uebersicht",
    primaryText: "Unterstützungsstrategien entdecken",
    secondaryLinks: [
      { href: "/unterstuetzen/alltag", text: "Alltag gestalten" },
      { href: "/unterstuetzen/therapie", text: "Therapie unterstützen" },
    ],
  },
  {
    id: "grenzen",
    title: "Grenzen setzen",
    description:
      "Grenzen sind kein Zeichen von Ablehnung, sondern von Selbstfürsorge. Lernen Sie, sie liebevoll zu kommunizieren.",
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
      "Sie können nur helfen, wenn Sie selbst Kraft haben. Ihre eigene Gesundheit ist genauso wichtig.",
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

    transitionTimer.current = setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
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
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[prevQuestionId] || null);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
    setShowResult(false);
    setSelectedOption(null);
  };

  const getTopResult = (): Result => {
    let maxScore = 0;
    let topCategory = "verstehen";

    Object.entries(scores).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topCategory = category;
      }
    });

    return results.find(r => r.id === topCategory) || results[3];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // ── Resultat-Anzeige ──
  if (showResult) {
    const result = getTopResult();
    const isSafetyCritical = result.safetyCritical === true;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        aria-live="polite"
        role="status"
      >
        <div
          className={isSafetyCritical ? "border-l-4 pl-6 py-4" : ""}
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
          <p className="uppercase" style={labelStyle}>
            Unsere Empfehlung für Sie
          </p>
          <h2 className="mt-2" style={questionStyle}>
            {result.title}
          </h2>
          <p className="mt-4" style={bodyStyle}>
            {result.description}
          </p>

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
          {result.secondaryLinks.length > 0 && (
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
                {result.secondaryLinks.map(link => (
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
          <NavPillButton onClick={restart} ariaLabel="Test wiederholen">
            ↻ Test wiederholen
          </NavPillButton>
        </div>
      </motion.div>
    );
  }

  // ── Frage-Anzeige ──
  const question = questions[currentQuestion];

  return (
    <div role="form" aria-label="Selbsttest" className="space-y-8">
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
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          <header className="space-y-2">
            <h2 style={questionStyle}>{question.text}</h2>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
