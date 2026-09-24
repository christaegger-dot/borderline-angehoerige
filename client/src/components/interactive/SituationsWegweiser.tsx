/* Decision tree for acute situations; crisis highlighting remains intentional. */
import { useCallback, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
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

// ─── Orientierung zu Hilfewegen, keine Risikoeinstufung ──

const TREE: TreeNode[] = [
  {
    id: "start",
    question: "Was passiert gerade?",
    subtitle: "Wählen Sie die Situation, die am ehesten zutrifft.",
    choices: [
      { label: "Suizidgedanken oder Suizidankündigung", nextId: "suizid" },
      { label: "Selbstverletzung", nextId: "selbstverletzung" },
      { label: "Starker Wutausbruch oder Aggression", nextId: "aggression" },
      { label: "Kontaktabbruch / Rückzug", nextId: "kontaktabbruch" },
      { label: "Starke Verzweiflung / Weinkrampf", nextId: "verzweiflung" },
      { label: "Druck, Vorwürfe oder Drohungen", nextId: "manipulation" },
    ],
  },

  // ─── SUIZID ───
  {
    id: "suizid",
    question: "Besteht unmittelbare Gefahr?",
    subtitle:
      "Sie müssen das nicht sicher beurteilen können. Auch ohne sichtbare Handlung oder bekannten Plan kann Gefahr bestehen. Wenn Sie unsicher sind, holen Sie professionelle Einschätzung.",
    choices: [
      {
        label: "Ja – akute Handlung oder konkreter Plan",
        nextId: "suizid_akut",
      },
      {
        label: "Suizidgedanken werden geäussert – keine Handlung erkennbar",
        nextId: "suizid_gespraech",
      },
      {
        label:
          "Ich weiss es nicht – ich brauche eine professionelle Einschätzung",
        nextId: "gefahr_unklar",
      },
    ],
  },
  {
    id: "gefahr_unklar",
    question: "Unsicherheit – jetzt Unterstützung holen",
    safetyCritical: true,
    subtitle:
      "Sie müssen die Dringlichkeit nicht allein einschätzen. Fehlende sichtbare Handlungen oder ein nicht bekannter Plan bedeuten keine Sicherheit.",
    steps: [
      {
        id: "s1",
        text: "Bei möglicher unmittelbarer Lebensgefahr den Rettungsdienst rufen",
        detail:
          "Bei Gewalt oder Bedrohung rufen Sie die Polizei. Bringen Sie sich selbst nicht in Gefahr und folgen Sie den Anweisungen der Leitstelle.",
        emergency: true,
        kontakte: ["ROT_144", "ROT_117"],
      },
      {
        id: "s2",
        text: "Psychiatrische Einschätzung einholen",
        detail:
          "Wenn keine unmittelbare Lebensgefahr erkennbar ist, Sie sich aber um die Sicherheit sorgen, kontaktieren Sie jetzt den psychiatrischen Notfalldienst. Beschreiben Sie, was Sie beobachten und was Ihnen unklar ist. Die PUK-Notfalldienste sind rund um die Uhr erreichbar.",
        kontakte: ["GELB_PUK_KJP", "GELB_PUK_ERW", "GELB_PUK_65"],
      },
      {
        id: "s3",
        text: "Bis zur Hilfe die eigene Sicherheit beachten",
        detail:
          "Bleiben Sie bei der Person oder in Kontakt, soweit dies für Sie sicher möglich ist. Versuchen Sie nicht, gefährliche Gegenstände gegen Widerstand wegzunehmen.",
        link: { href: "/soforthilfe", label: "Alle Notfallkontakte" },
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
        text: "Rufen Sie sofort den Rettungsdienst",
        detail:
          "Bei Lebensgefahr rufen Sie 144, bei Gewalt oder Bedrohung 117. Bleiben Sie am Telefon und folgen Sie den Anweisungen der Leitstelle.",
        emergency: true,
        kontakte: ["ROT_144", "ROT_117"],
      },
      {
        id: "s2",
        text: "Bleiben Sie bei der Person, soweit Sie selbst sicher sind",
        detail:
          "Bleiben Sie bis zum Eintreffen professioneller Hilfe bei der Person oder in Kontakt, soweit dies ohne Eigengefährdung möglich ist. Bei Bedrohung bringen Sie sich in Sicherheit und informieren die Leitstelle.",
      },
      {
        id: "s3",
        text: "Sichern Sie die Umgebung",
        detail:
          "Begrenzen Sie den Zugang zu Medikamenten oder gefährlichen Gegenständen nur ohne Eigengefährdung, möglichst gemeinsam und nach Anleitung der Leitstelle. Nehmen Sie nichts aus der Hand oder gegen Widerstand weg; greifen Sie nicht körperlich ein.",
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
    subtitle:
      "Keine sichtbare Handlung bedeutet keine Entwarnung. Bei neuer oder möglicher unmittelbarer Lebensgefahr den Rettungsdienst rufen; bei Unsicherheit jetzt professionelle Einschätzung holen.",
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
          "Fragen Sie nach einem Plan, verfügbaren Mitteln oder einem Zeitpunkt und teilen Sie die Antworten der Fachperson mit. Auch ohne bekannten Plan kann Gefahr bestehen. Warten Sie mit dem Hilfeholen nicht auf vollständige Antworten.",
      },
      {
        id: "s4",
        text: "Verbinden Sie mit professioneller Hilfe",
        detail:
          "Kontaktieren Sie zur Einschätzung den psychiatrischen Notfalldienst, wenn möglich gemeinsam. Bei unmittelbarer Gefahr rufen Sie den Rettungsdienst. Die Dargebotene Hand bietet Entlastung im Gespräch, ersetzt aber keine medizinische Notfallabklärung.",
        kontakte: ["ROT_144", "GELB_PUK_ERW"],
        link: {
          href: "/soforthilfe",
          label: "Notfalldienste für alle Altersgruppen",
        },
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
    question: "Braucht die Situation sofort medizinische Hilfe?",
    subtitle:
      "Starke Blutung, Bewusstseinsstörung, Atemprobleme oder eine mögliche Vergiftung brauchen sofortige Abklärung. Sie müssen die Schwere nicht selbst bestimmen können.",
    choices: [
      {
        label: "Ja – oder ich bin unsicher, ob sofort Hilfe nötig ist",
        nextId: "selbstverletzung_schwer",
      },
      {
        label: "Keine solchen Anzeichen erkennbar – wie weiter?",
        nextId: "selbstverletzung_danach",
      },
    ],
  },
  {
    id: "selbstverletzung_schwer",
    question: "Jetzt medizinische Hilfe holen",
    safetyCritical: true,
    steps: [
      {
        id: "s1",
        text: "Rufen Sie den Rettungsdienst",
        detail:
          "Bei starker Blutung, Bewusstseinsstörung, Atemproblemen oder möglicher unmittelbarer Lebensgefahr rufen Sie 144. Auch wenn Sie nicht wissen, ob die Verletzung lebensbedrohlich ist: Beschreiben Sie der Leitstelle, was Sie beobachten.",
        emergency: true,
        kontakte: ["ROT_144"],
      },
      {
        id: "s2",
        text: "Folgen Sie den Anweisungen der Leitstelle",
        detail:
          "Leisten Sie Erste Hilfe nach deren Anleitung und nur ohne Eigengefährdung. Bleiben Sie bei der Person oder in Kontakt, soweit dies für Sie sicher möglich ist.",
      },
      {
        id: "s3",
        text: "Bei möglicher Vergiftung sofort Beratung einholen",
        detail:
          "Tox Info Suisse berät auch dann, wenn noch keine Beschwerden sichtbar sind. Bei akuten schweren Beschwerden hat der Rettungsdienst Vorrang. Lösen Sie kein Erbrechen aus; folgen Sie den individuellen Anweisungen.",
        kontakte: ["ROT_145"],
      },
    ],
  },
  {
    id: "selbstverletzung_danach",
    question: "Nach einer Selbstverletzung",
    safetyCritical: true,
    subtitle:
      "Eine klein wirkende Verletzung sagt nichts über die seelische Not oder Suizidgefahr aus. Wenn Sie unsicher sind, holen Sie jetzt professionelle Einschätzung.",
    steps: [
      {
        id: "s1",
        text: "Fragen Sie, was gerade gebraucht wird",
        detail:
          "«Ich sehe, dass du verletzt bist. Was brauchst du gerade?» Sie dürfen selbst erschrocken sein. Sie müssen die Situation nicht mit den richtigen Worten lösen.",
      },
      {
        id: "s2",
        text: "Körperliche Folgen abklären lassen",
        detail:
          "Bieten Sie Unterstützung bei der ärztlichen Versorgung an. Wenn unklar ist, wie die Verletzung versorgt werden muss, holen Sie medizinischen Rat. Bei möglicher Vergiftung rufen Sie sofort Tox Info Suisse, bei möglicher Lebensgefahr den Rettungsdienst.",
        kontakte: ["ROT_145", "ROT_144"],
      },
      {
        id: "s3",
        text: "Professionelle Unterstützung einbeziehen",
        detail:
          "Auch eine erstmalige Selbstverletzung verdient fachliche Abklärung. Kontaktieren Sie das Behandlungsteam oder bei dringender Sorge den psychiatrischen Notfalldienst der passenden Altersgruppe. Warten Sie nicht auf eine Wiederholung.",
        kontakte: ["GELB_PUK_KJP", "GELB_PUK_ERW", "GELB_PUK_65"],
      },
      {
        id: "s4",
        text: "An Bekanntes anknüpfen, wenn es gewünscht ist",
        detail:
          "Fragen Sie nach Strategien, die die Person bereits mit ihrer Fachperson vereinbart hat und jetzt nutzen möchte. Drängen Sie keine Übung auf. Ein vorhandener Krisenplan kann beim Hilfeholen unterstützen; er ersetzt keine aktuelle Abklärung.",
      },
      {
        id: "s5",
        text: "Auch Ihre Belastung zählt",
        detail:
          "Sie müssen die weitere Begleitung nicht allein übernehmen. Sprechen Sie mit einer Vertrauensperson oder holen Sie eigene Angehörigenberatung.",
        link: { href: "/fachstelle", label: "Beratung für Angehörige" },
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
    question: "Wenn ein Gespräch eskaliert",
    subtitle:
      "Wählen Sie, was gerade möglich ist. Sie müssen diese Vorschläge nicht der Reihe nach umsetzen. Bei Bedrohung geht Ihre Sicherheit vor.",
    steps: [
      {
        id: "s1",
        text: "Wenige Worte können reichen",
        detail:
          "Wenn es Ihnen möglich ist, sprechen Sie kurz und ohne zusätzliche Vorwürfe. Ob die andere Person sich beruhigt, liegt nicht allein bei Ihnen.",
      },
      {
        id: "s2",
        text: "Nachfragen, statt Gefühle festzulegen",
        detail:
          "«Das scheint dich sehr zu ärgern. Verstehe ich dich richtig?» Die Person darf Sie korrigieren. Sie können zuhören, ohne einer Beschuldigung zuzustimmen.",
      },
      {
        id: "s3",
        text: "Setzen Sie eine klare Grenze",
        detail:
          "«Ich möchte nicht angeschrien werden. Ich unterbreche das Gespräch jetzt.» Sie brauchen dafür kein Einverständnis. Einen späteren Kontakt können Sie anbieten, wenn er für Sie möglich und sicher ist.",
      },
      {
        id: "s4",
        text: "Reize reduzieren oder Abstand anbieten",
        detail:
          "Wenn es passt: «Möchtest du etwas Ruhe oder soll ich dir Raum lassen?» Lassen Sie die Person wählen. Sie müssen keine Technik anleiten oder eine Beruhigung erreichen.",
      },
      {
        id: "s5",
        text: "Gehen Sie, wenn es nötig ist",
        detail:
          "Sie dürfen ein Gespräch auch frühzeitig beenden. Bei Bedrohung bringen Sie sich in Sicherheit und holen Hilfe; Sie müssen keine weiteren Gesprächsschritte versuchen.",
        kontakte: ["ROT_117"],
        link: { href: "/grenzen", label: "Mehr zu Grenzen setzen" },
      },
    ],
  },

  // ─── KONTAKTABBRUCH ───
  {
    id: "kontaktabbruch",
    question: "Kontaktabbruch oder Rückzug",
    subtitle:
      "Wenn Sie sich um die Sicherheit sorgen, holen Sie jetzt professionelle Einschätzung. Warten Sie dann keine Kontaktfrist ab.",
    steps: [
      {
        id: "s1",
        text: "Atmen Sie durch – Rückzug ist nicht Ihr Versagen",
        detail:
          "Rückzug kann unterschiedliche Gründe haben. Aus dem Schweigen allein lässt sich weder ein Motiv noch Ihre Verantwortung ableiten.",
      },
      {
        id: "s2",
        text: "Senden Sie eine kurze, wertungsfreie Nachricht",
        detail:
          "Wenn Sie Kontakt anbieten möchten: «Du kannst dich melden, wenn du möchtest.» Versprechen Sie nur eine Erreichbarkeit, die für Sie möglich ist.",
      },
      {
        id: "s3",
        text: "Klären Sie Ihren eigenen nächsten Schritt",
        detail:
          "Es gibt keine passende Wartefrist für alle. Überlegen Sie, ob und wann Sie erneut Kontakt anbieten möchten. Absprachen, Ihre eigenen Bedürfnisse und mögliche Sorgen um die Sicherheit spielen dabei eine Rolle.",
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
          "Beschreiben Sie dem psychiatrischen Notfalldienst, was Sie beobachtet haben und was Sie befürchten. Bei möglicher unmittelbarer Lebensgefahr rufen Sie den Rettungsdienst.",
        kontakte: ["ROT_144", "GELB_PUK_KJP", "GELB_PUK_ERW", "GELB_PUK_65"],
      },
    ],
  },

  // ─── VERZWEIFLUNG ───
  {
    id: "verzweiflung",
    question: "Starke Verzweiflung begleiten",
    subtitle:
      "Wenn Sie Suizidgedanken vermuten oder sich um die Sicherheit sorgen, fragen Sie direkt nach und holen Sie jetzt professionelle Einschätzung. Sie müssen nicht abwarten, wie lange die Verzweiflung anhält.",
    steps: [
      {
        id: "s1",
        text: "Nähe anbieten, wenn sie passt",
        detail:
          "«Möchtest du, dass ich bei dir sitze, oder brauchst du etwas Raum?» Sie müssen weder alles aushalten noch allein für die Begleitung sorgen.",
      },
      {
        id: "s2",
        text: "Validieren Sie den Schmerz",
        detail:
          "«Das wirkt gerade sehr schmerzhaft. Magst du erzählen?» Hören Sie zu, soweit Sie können, und lassen Sie sich korrigieren.",
      },
      {
        id: "s3",
        text: "Bieten Sie Körperliches an",
        detail:
          "Wenn es zur Situation passt: «Möchtest du ein Glas Wasser oder eine Decke?» Ein Angebot darf abgelehnt werden.",
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
        text: "Hilfe holen, wenn Sie sich sorgen oder Entlastung brauchen",
        detail:
          "Der psychiatrische Notfalldienst hilft bei dringender Einschätzung; bei möglicher unmittelbarer Lebensgefahr rufen Sie 144. Für Ihre eigene Entlastung im Gespräch ist auch die Dargebotene Hand da. Sie ersetzt keine medizinische Abklärung.",
        kontakte: [
          "ROT_144",
          "GELB_PUK_KJP",
          "GELB_PUK_ERW",
          "GELB_PUK_65",
          "GRUEN_143",
        ],
      },
    ],
  },

  // ─── MANIPULATION ───
  {
    id: "manipulation",
    question: "Mit Druck und Drohungen umgehen",
    safetyCritical: true,
    subtitle:
      "Eine Suizidankündigung braucht professionelle Einschätzung – auch in einem Konflikt. Bei möglicher unmittelbarer Lebensgefahr rufen Sie 144; bei Gewalt oder Bedrohung 117.",
    steps: [
      {
        id: "s1",
        text: "Erkennen Sie das Muster",
        detail:
          "Sätze wie «Wenn du gehst, bringe ich mich um» können enormen Druck erzeugen. Sie müssen nicht entscheiden, welches Motiv dahintersteht, um Hilfe zu holen und sich zu schützen.",
      },
      {
        id: "s2",
        text: "Nehmen Sie die Not ernst, aber nicht die Verantwortung",
        detail:
          "Nehmen Sie die Ankündigung ernst und holen Sie Unterstützung. Sie können die Sicherheit eines anderen Menschen nicht allein gewährleisten.",
      },
      {
        id: "s3",
        text: "Eine Grenze darf bestehen bleiben",
        detail:
          "«Ich nehme das ernst und hole Hilfe. Ich kann jetzt nicht bei dir bleiben.» Sie dürfen Hilfe verständigen, ohne eine Forderung zu erfüllen oder sich selbst zu gefährden.",
      },
      {
        id: "s4",
        text: "Professionelle Hilfe hinzuziehen",
        detail:
          "Bei möglicher Lebensgefahr den Rettungsdienst rufen, bei Bedrohung die Polizei. Für eine dringende psychiatrische Einschätzung erreichen Sie die PUK-Notfalldienste nach Altersgruppe.",
        kontakte: [
          "ROT_144",
          "ROT_117",
          "GELB_PUK_KJP",
          "GELB_PUK_ERW",
          "GELB_PUK_65",
        ],
      },
      {
        id: "s5",
        text: "Schützen Sie sich",
        detail:
          "Anhaltender Druck dieser Art ist real und kann Sie selbst verletzen. Sie brauchen eigene Unterstützung, um damit umzugehen.",
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
          <m.div
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
          </m.div>
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
