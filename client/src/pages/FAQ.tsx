import { useCallback, useMemo, useState } from "react";
import ContentSection from "@/components/ContentSection";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
} from "@/components/editorial";
import EvidenceNote from "@/components/EvidenceNote";
import LastVerifiedBadge from "@/components/LastVerifiedBadge";
import Layout from "@/components/Layout";
import SEO, { FAQSchema } from "@/components/SEO";
import { kontaktByIdStrict } from "@/data/kontakte";
import { Link } from "wouter";

interface FAQItem {
  question: string;
  answer: string;
  bullets?: string[];
  links?: { text: string; url: string }[];
}

interface FAQCategory {
  title: string;
  questions: FAQItem[];
}

/** Slugifiziert für stabile Anker-IDs. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "und")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Öffnet eine ContentSection via Custom Event. */
function openSection(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("open-section", { detail: { sectionId } })
  );
}

const elternnotruf = kontaktByIdStrict("GRUEN_ELTERN");
const proJuventute147 = kontaktByIdStrict("GRUEN_147");

const faqCategories: FAQCategory[] = [
  {
    title: "Diagnose & Krankheitsverständnis",
    questions: [
      {
        question: "Soll ich die Diagnose ansprechen?",
        answer:
          "Das hängt von der Situation ab. Wenn Ihr Angehöriger die Diagnose bereits kennt und akzeptiert, kann ein offenes Gespräch hilfreich sein – es zeigt, dass Sie sich informieren und verstehen wollen. Vermeiden Sie jedoch, die Diagnose als «Waffe» zu benutzen («Du verhältst dich wieder so borderline-mässig»). Wenn die Diagnose noch nicht gestellt oder nicht akzeptiert wurde, konzentrieren Sie sich besser auf konkrete Verhaltensweisen und Gefühle statt auf Labels. Sagen Sie zum Beispiel: «Ich merke, dass du gerade sehr aufgewühlt bist» statt «Das ist deine Borderline».",
        links: [
          { text: "Mehr zur Kommunikation", url: "/kommunizieren" },
          { text: "Kommunikation üben", url: "/uebungen" },
        ],
      },
      {
        question: "Ist Borderline heilbar?",
        answer:
          "Die Prognose ist deutlich besser, als lange angenommen wurde – die meisten Betroffenen erreichen im Verlauf eine Remission. Entwicklung verläuft selten geradlinig, Rückschläge gehören dazu. Therapie unterstützt den Prozess, macht ihn aber nicht vollständig planbar.",
        links: [{ text: "Verlauf & Prognose im Detail", url: "/genesung" }],
      },
      {
        question: "Ist Borderline erblich? Bin ich schuld?",
        answer:
          "Die Forschung spricht für ein Zusammenspiel aus biologischer Empfindlichkeit und belastenden Entwicklungs- oder Beziehungserfahrungen. Eine erhöhte emotionale Sensibilität kann teilweise mitvererbt werden, nicht aber die Störung eins zu eins. Belastende Erfahrungen können das Risiko erhöhen, erklären Borderline aber nie allein. Die Ursachen sind komplex – Sie tragen keine Schuld.",
        links: [{ text: "Borderline verstehen", url: "/verstehen" }],
      },
      {
        question:
          "Warum verhält sich mein Angehöriger bei anderen regulierter und stabiler?",
        answer:
          "Dieses Phänomen ist häufig und nicht automatisch ein Zeichen von Manipulation. Menschen mit Borderline haben oft die grössten Schwierigkeiten in engen Beziehungen, weil dort die Verlassensangst am stärksten aktiviert wird. Bei Fremden oder in oberflächlichen Kontakten ist diese Angst geringer, daher können sie sich besser regulieren. Es ist paradox: Je wichtiger Sie Ihrem Angehörigen sind, desto intensiver können die Symptome sein. Das ist keine bewusste Entscheidung, sondern ein Muster, das in der Therapie bearbeitet wird.",
        links: [{ text: "Beziehungsmuster verstehen", url: "/verstehen" }],
      },
      {
        question: "Wer kann eine Borderline-Diagnose stellen?",
        answer:
          "Eine formelle Borderline-Diagnose stellen vor allem Psychiater:innen mit FMH-Anerkennung Psychiatrie und Psychotherapie sowie psychologische Psychotherapeut:innen mit Berufsausübungsbewilligung und entsprechender klinischer Qualifikation. Hausärzt:innen können einen Verdacht äussern und überweisen, stellen die Diagnose aber in der Regel nicht selbst. Die Abklärung findet ambulant oder stationär statt; sie umfasst meist mehrere Termine über Wochen oder Monate, nicht ein einzelnes Gespräch.",
        links: [
          { text: "Diagnostik-Seite — Wer & Wie", url: "/diagnostik#wer" },
        ],
      },
      {
        question: "Was, wenn die betroffene Person die Diagnose ablehnt?",
        answer:
          "Diagnose-Ablehnung ist eine häufige Reaktion und kein Versagen — Stigma, Scham oder Misstrauen gegenüber Psychiatrie sind verständliche Gründe. Drängen, Beweisen oder die Diagnose in Konflikten als Argument einzusetzen verschärft die Lage meist. Was möglich ist: die Diagnose für sich selbst als Orientierung nutzen, Beratung der Fachstelle in Anspruch nehmen, geduldig bleiben, konkrete Verhaltensweisen statt das Label ansprechen. Bei akuter Gefahr ist die Diagnose-Frage ohnehin nachrangig — dann zählt die Soforthilfe.",
        links: [
          {
            text: "Diagnostik-Seite — Diagnose-Ablehnung",
            url: "/diagnostik#ablehnung",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        question: "Wie lange dauert es, bis eine Diagnose feststeht?",
        answer:
          "Eine Borderline-Diagnose entsteht meist nicht in einem Termin. Anamnese, strukturierte Interviews und Verlaufsbeobachtung greifen ineinander; in der Regel sind dafür mehrere Sitzungen über Wochen oder Monate nötig. Diese Sorgfalt ist kein Warten ohne Ergebnis, sondern Teil der Diagnostik selbst — die Diagnose soll über die Zeit Bestand haben und nicht aus einem Momenteindruck stammen.",
        links: [
          {
            text: "Diagnostik-Seite — Wie läuft eine Diagnostik ab",
            url: "/diagnostik#wie",
          },
        ],
      },
      {
        question:
          "Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?",
        answer:
          "Bei Borderline tritt selten nur eine Diagnose auf. Häufig kommen Depression, Angststörungen, PTBS oder weitere Erkrankungen hinzu — Fachpersonen sprechen dann von Komorbidität oder Begleiterkrankungen. Das bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die in der Behandlung mitberücksichtigt wird. Komorbide Erkrankungen werden meistens integriert mitbehandelt; bei akut bedrohlichen Phasen (z. B. schwere Depression, Substanzgebrauchskrise) wird das vorrangig stabilisiert.",
        links: [
          { text: "Begleiterkrankungen", url: "/begleiterkrankungen" },
          { text: "Glossar — Komorbidität", url: "/glossar" },
        ],
      },
      {
        question:
          "Mein Angehöriger hat zusätzlich zur Borderline auch eine Depression — was bedeutet das?",
        answer:
          "Depression ist die häufigste Komorbidität bei Borderline. Borderline-typische Stimmungsschwankungen sind oft kürzer (Stunden bis Tage) und können schnell kippen, eine depressive Episode hält länger an (Wochen bis Monate). Die Differenzierung ist Aufgabe der behandelnden Fachperson — Sie als Angehörige müssen das nicht selbst leisten. Wichtig: Eine schwere depressive Episode erhöht das Suizidrisiko. Wenn Sie Anzeichen wie anhaltende Hoffnungslosigkeit oder konkrete Aussagen mit suizidalem Inhalt wahrnehmen, gehen Sie nicht davon aus, dass das «nur Borderline» ist. Nutzen Sie die Soforthilfe.",
        links: [
          {
            text: "Begleiterkrankungen — Depression",
            url: "/begleiterkrankungen#depression",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
    ],
  },
  {
    title: "Kommunikation & Konflikte",
    questions: [
      {
        question: "Wie reagiere ich auf bedrohlich wirkende Aussagen?",
        answer:
          "Bei Suizidäusserungen gilt: immer ernst nehmen und die Verantwortung an Fachpersonen weitergeben – sagen Sie klar: «Wenn du sagst, du willst dir etwas antun, hole ich Hilfe.» Bei anderen Aussagen aus Verzweiflung (z.B. «Dann verlasse ich dich») ruhig bleiben, das Gefühl dahinter ansprechen und nicht aus Angst nachgeben. Solche Aussagen entstehen meist aus grosser Verlassensangst, nicht aus rationaler Absicht – sie signalisieren innere Not, keine Strategie.",
        links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }],
      },
      {
        question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
        answer:
          "Vermeiden Sie Rechtfertigungen oder Gegenangriffe – das eskaliert die Situation. Nutzen Sie stattdessen Validierung: «Ich verstehe, dass du dich gerade verletzt fühlst» (validiert das Gefühl, nicht die Beschuldigung). Dann setzen Sie eine Grenze: «Ich möchte mit dir darüber sprechen, aber nicht, wenn du mich anschreist.» Wenn möglich, bieten Sie eine Pause an: «Lass uns in 20 Minuten weitersprechen, wenn wir beide ruhiger sind.» Wichtig: Sie müssen sich nicht für Dinge entschuldigen, die Sie nicht getan haben.",
        links: [
          { text: "SET-Kommunikation lernen", url: "/kommunizieren" },
          { text: "SET üben →", url: "/uebungen" },
        ],
      },
      {
        question: "Wie gehe ich mit dem Schwarz-Weiss-Denken um?",
        answer:
          "Das «Splitting» (Idealisierung und Abwertung) ist ein häufiges Merkmal bei Borderline, aber nicht bei allen Betroffenen gleich ausgeprägt. In einem Moment sind Sie der beste Mensch der Welt, im nächsten der schlimmste. Wichtig: Nehmen Sie weder die Idealisierung noch die Abwertung persönlich. Beides kann Ausdruck von innerer Anspannung und Beziehungssorge sein. Bleiben Sie konsistent in Ihrem Verhalten, auch wenn die Bewertung schwankt. Sagen Sie zum Beispiel: «Ich bin derselbe Mensch wie gestern. Ich liebe dich, auch wenn du gerade wütend auf mich bist.» Mit der Zeit und Therapie lernen Betroffene, Grautöne zu sehen.",
        links: [{ text: "Borderline verstehen", url: "/verstehen" }],
      },
      {
        question: "Soll ich lügen, um Konflikte zu vermeiden?",
        answer:
          "Nein. Kurzfristig mag eine Lüge Frieden bringen, aber langfristig zerstört sie Vertrauen – und Vertrauen ist für Menschen mit Borderline ohnehin schwierig. Stattdessen: Seien Sie ehrlich, aber taktvoll. Nutzen Sie «Ich»-Aussagen statt Vorwürfe. Wenn die Wahrheit schmerzhaft ist, validieren Sie zuerst das Gefühl: «Ich weiss, das ist nicht das, was du hören wolltest, und ich verstehe, dass dich das verletzt.» Ehrlichkeit mit Mitgefühl ist der Mittelweg zwischen brutaler Offenheit und Vermeidung.",
        links: [{ text: "Kommunikation & Validierung", url: "/kommunizieren" }],
      },
    ],
  },
  {
    title: "Grenzen & Selbstschutz",
    questions: [
      {
        question: "Wann ist eine Einweisung nötig?",
        answer:
          "Bei akuter Suizidalität mit konkreten Plänen oder Mitteln, schwerer Selbstverletzung mit Versorgungsbedarf, Fremdgefährdung oder völliger Dekompensation. In der Schweiz kann in solchen Situationen durch einen Arzt oder eine Ärztin eine fürsorgerische Unterbringung angeordnet werden – vereinfacht gesagt eine vorübergehende psychiatrische Einweisung zum Schutz der betroffenen Person. Im Zweifelsfall: psychiatrischen Notdienst anrufen – die können die Situation einschätzen.",
        links: [{ text: "Notfallnummern", url: "/soforthilfe" }],
      },
      {
        question: "Darf ich meinen Angehörigen verlassen?",
        answer:
          "Ja. Eine Beziehung zu beenden kann eine legitime und verantwortbare Entscheidung sein – auch wenn Ihr Angehöriger psychisch krank ist. Wenn die Beziehung Ihre psychische oder körperliche Gesundheit ernsthaft belastet oder gefährdet, braucht dieser Umstand ein grosses Gewicht. Wichtig ist, eine Trennung nach Möglichkeit nicht mitten in einer akuten Krise impulsiv zu vollziehen, sondern vorbereitet, mit Blick auf Sicherheit und – wenn nötig – mit fachlicher Begleitung. Wenn Drohungen, Gewalt, Kinder oder Suizidankündigungen im Raum stehen, braucht es oft zuerst Schutzplanung und zusätzliche Beratung. Und: Sie können eine Grenze ziehen oder gehen und trotzdem Mitgefühl behalten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        question: "Wie schütze ich meine Kinder?",
        answer:
          "Wichtig ist, alltägliche Belastung, wiederholte Eskalation, Kindeswohlgefährdung und akute Gefahr auseinanderzuhalten. Nicht jede überforderte Familie braucht sofort eine Meldung – aber Kinder brauchen Schutz vor Gewalt, massiver Alarmstimmung und unberechenbaren Krisen. Erklären Sie altersgerecht, dass starke Gefühle nicht die Schuld des Kindes sind, und schützen Sie Kinder aktiv vor Eskalationen.",
        bullets: [
          "Im Alltag helfen Routinen, verlässliche Bezugspersonen, Schlaf, Schule, Freunde und eine einfache Sprache: «Bei uns ist es gerade schwer. Du hast daran keine Schuld.»",
          `Bei wiederholten Eskalationen holen Sie früh Beratung dazu, zum Beispiel den ${elternnotruf.label} (${elternnotruf.nummer}). Zusätzlich kann eine Elternberatung wie die Pro Juventute Elternberatung 24/7 helfen.`,
          `Wenn ein Kind selbst stark belastet ist, nennen Sie konkrete Anlaufstellen: ${proJuventute147.nummer} für Kinder und Jugendliche, der schulpsychologische Dienst, die Kinder- und Jugendpsychiatrie oder die örtliche Mütter-/Väterberatung.`,
          "Bei ernsthafter Kindeswohlgefährdung – etwa bei Gewalt, massiver Vernachlässigung, Angst vor zuhause oder wenn ein Kind wiederholt Schutzräume braucht – ist eine Gefährdungsmeldung an die KESB oder eine lokale Kindesschutzstelle angemessen.",
          "Bei akuter Gefahr gehen Sie mit dem Kind aus der Situation und holen Sie Hilfe über 117 oder 144.",
        ],
        links: [
          { text: "Grenzen setzen", url: "/grenzen" },
          { text: "Selbstfürsorge als Elternteil", url: "/selbstfuersorge" },
          { text: "Jugendliche & Diagnostik", url: "/diagnostik#jugendliche" },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        question: "Bin ich co-abhängig?",
        answer:
          "«Co-Abhängigkeit» meint, dass sich Ihr eigenes Leben immer stärker um den Zustand des anderen dreht: Sie entschuldigen destruktives Verhalten, geben Ihr soziales Leben auf oder fühlen sich für die Gefühle des anderen verantwortlich. Das spricht nicht gegen Ihren Charakter, sondern zeigt ein belastendes Beziehungsmuster. Beratung, eigene Therapie oder eine Angehörigengruppe können helfen, wieder klarer zu werden.",
        links: [
          { text: "Selbstfürsorge", url: "/selbstfuersorge" },
          { text: "Glossar: Co-Abhängigkeit", url: "/glossar" },
        ],
      },
    ],
  },
  {
    title: "Therapie & Behandlung",
    questions: [
      {
        question: "Mein Angehöriger will keine Therapie – was tun?",
        answer:
          "Sie können niemanden zur Therapie zwingen (ausser bei akuter Gefährdung). Was Sie tun können: Informieren Sie sich selbst über Borderline und ändern Sie Ihr eigenes Verhalten – das kann indirekt helfen. Sprechen Sie Therapie als Möglichkeit an, ohne zu drängen. Nutzen Sie «Ich»-Aussagen: «Ich mache mir Sorgen und wünsche mir, dass du Unterstützung bekommst.» Setzen Sie Grenzen für inakzeptables Verhalten – manchmal motiviert das zur Veränderung. Und: Holen Sie sich selbst Unterstützung, unabhängig davon, ob Ihr Angehöriger Therapie macht.",
        links: [
          {
            text: "Therapieangebote Zürich",
            url: "/unterstuetzen/therapie#therapieangebote",
          },
        ],
      },
      {
        question: "Welche Therapie ist am besten?",
        answer:
          "Es gibt mehrere gut erforschte Methoden, zum Beispiel DBT (Dialektisch-Behaviorale Therapie), MBT (Mentalisierungsbasierte Therapie), Schematherapie oder TFP (Übertragungsfokussierte Psychotherapie). Alle können wirksam sein – wichtiger als die Methode ist oft die Passung zwischen Therapeut und Patient.",
        links: [
          { text: "Therapieformen erklärt", url: "/unterstuetzen/therapie" },
        ],
      },
      {
        question: "Helfen Medikamente bei Borderline?",
        answer:
          "Medikamente «heilen» Borderline nicht. Sie können aber sinnvoll sein, wenn zusätzlich Depression, Angst, Schlafprobleme, starke innere Anspannung oder andere Begleiterkrankungen behandelt werden sollen. Wichtig ist: Einnahme, Umstellung oder Absetzen gehören in ärztliche Begleitung. Angehörige müssen nicht zum Medikamenten-Management werden – hilfreicher ist meist, Beobachtungen ruhig weiterzugeben und die Verantwortung bei der behandelnden Fachperson zu lassen.",
        links: [
          { text: "Begleiterkrankungen", url: "/begleiterkrankungen" },
          { text: "Therapie begleiten", url: "/unterstuetzen/therapie" },
        ],
      },
      {
        question: "Soll ich an der Therapie teilnehmen?",
        answer:
          "Wenn Sie eingeladen werden: Ja, das kann sehr hilfreich sein. Angehörigensitzungen oder Familiengespräche können Verständnis, Zusammenarbeit und Alltagstransfer verbessern. Sie lernen, wie Sie unterstützen können, ohne zu schaden, und der Therapeut kann Kommunikationsmuster beobachten. Wichtig: Gehen Sie nicht hin, um sich zu beschweren oder Recht zu bekommen. Ziel ist gemeinsames Lernen. Wenn Sie nicht eingeladen werden: Respektieren Sie das. Ihr Angehöriger braucht einen geschützten Raum. Sie können trotzdem eigene Beratung suchen.",
        links: [
          { text: "Therapie unterstützen", url: "/unterstuetzen/therapie" },
        ],
      },
      {
        question: "Wie lange dauert die Behandlung?",
        answer:
          "Borderline-Behandlung ist häufig längerfristig angelegt. Je nach Belastung, Komorbidität, Setting und Krisenverlauf können Monate bis mehrere Jahre relevant sein. Stationäre Aufenthalte (z.B. DBT-Station) dauern oft einige Wochen und sind eher ein Baustein als «die ganze Lösung». Fortschritte sind nicht linear – Rückschläge sind normal und kein Zeichen von Versagen.",
        links: [{ text: "Genesung & Prognose", url: "/genesung" }],
      },
    ],
  },
  {
    title: "Alltag & Beziehung",
    questions: [
      {
        question: "Wie erkläre ich die Situation Freunden/Familie?",
        answer:
          "Sie müssen nicht alles erklären. Sagen Sie so viel, wie Sie möchten: «Eine mir nahestehende Person hat eine psychische Erkrankung, die starke Stimmungsschwankungen auslösen kann. Wir arbeiten daran.» Sie können auch Grenzen setzen: «Ich möchte nicht ins Detail gehen, aber ich schätze eure Unterstützung.» Wählen Sie sorgfältig aus, wem Sie was erzählen – nicht jeder muss alles wissen. Und: Bitten Sie um konkrete Hilfe statt allgemeinem Mitleid («Könntest du nächste Woche auf die Kinder aufpassen?»).",
      },
      {
        question:
          "Was, wenn Deutsch nicht die Hauptsprache ist oder psychische Erkrankung in unserer Familie tabuisiert ist?",
        answer:
          "Das ist häufiger, als viele denken. Hilfe kann auch dann sinnvoll sein, wenn das Wort «Borderline» in der Familie noch gar nicht fällt. Oft ist es leichter, zuerst über das Beobachtbare zu sprechen: Schlaf, Alarmzustand, Rückzug, Wutausbrüche, Selbstverletzung, Angst, Schule, Arbeit oder Sicherheit.",
        bullets: [
          "Verwenden Sie kurze, konkrete Sätze statt Fachsprache. Nicht jede Familie muss zuerst die Diagnose akzeptieren, bevor Unterstützung beginnen darf.",
          "Fragen Sie in Praxis, Klinik oder Beratungsstelle ausdrücklich nach professioneller Dolmetschung, wenn Deutsch nicht für alle sicher genug ist. Gerade bei Diagnose-, Krisen- oder Gewaltgesprächen sollten Kinder diese Rolle nicht übernehmen müssen.",
          "Wenn Scham, Angst vor Stigmatisierung oder Unsicherheit gegenüber Behörden gross sind, benennen Sie zuerst das Ziel: Schutz, Entlastung, weniger Eskalation, mehr Schlaf oder Sicherheit für die Kinder.",
          "Bei akuter Gefahr gilt trotzdem: Sicherheit geht vor. Dann lieber früh Hilfe holen, auch wenn noch nicht alle Begriffe, Hintergründe oder Familienkonflikte geklärt sind.",
        ],
        links: [
          { text: "Therapie begleiten", url: "/unterstuetzen/therapie" },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        question: "Wie gehe ich mit Eifersucht und Kontrolle um?",
        answer:
          "Eifersucht bei Borderline wurzelt aus Angehörigensicht häufig in Verlassensangst, nicht nur in Misstrauen. Verstehen Sie das, ohne es zu akzeptieren. Setzen Sie klare Grenzen: «Ich werde mein Handy nicht zeigen. Ich habe nichts zu verbergen, aber ich brauche Privatsphäre.» Geben Sie nicht nach, um Ruhe zu haben – das verstärkt das Muster. Gleichzeitig: Seien Sie transparent, wo es Ihnen möglich ist, ohne sich zu verbiegen. Ermutigen Sie Ihren Angehörigen, die Eifersucht in der Therapie zu bearbeiten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        question: "Kann ich noch ein normales Leben führen?",
        answer:
          "Ja, ein eigenes Leben ist weiterhin möglich, aber oft nicht ohne bewusste Gegenbewegung zur Belastung. Eigene Freundschaften, Interessen und Erholungszeiten sind kein Verrat, sondern wichtig für Ihre Stabilität. Gleichzeitig ist es realistisch, dass Ihr Alltag zeitweise stärker von Unsicherheit geprägt ist als der anderer Menschen. Ziel ist deshalb nicht ein «perfekt normales» Leben, sondern ein tragfähiger Alltag, in dem Beziehung, Selbstschutz und eigene Lebensbereiche nebeneinander Platz haben.",
        links: [
          { text: "Selbstfürsorge-Strategien", url: "/selbstfuersorge" },
          { text: "Beratung & Netzwerke", url: "/beratung" },
        ],
      },
      {
        question: "Wann wird es besser?",
        answer:
          "Das ist für viele Angehörige die schwierigste Frage. Die ehrliche Antwort lautet: Der Verlauf bleibt begrenzt vorhersehbar. Manche Betroffene zeigen nach Monaten deutliche Fortschritte, bei anderen dauert es deutlich länger – und nicht alle Verläufe sind gleich. Was Sie beeinflussen können, sind Ihr eigenes Verhalten, Ihre Grenzen und Ihre Selbstfürsorge. Was Sie nicht steuern können, ist der Zeitpunkt oder das Tempo der Veränderung Ihres Angehörigen. Hilfreich ist meist, auf Entwicklungen über längere Zeit zu achten statt auf einzelne Tage oder Krisen.",
        links: [{ text: "Genesung & Prognose", url: "/genesung" }],
      },
    ],
  },
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      // Categories: scroll. Questions (ContentSection ids): openSection() also scrolls.
      if (sectionId.startsWith("cat-")) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        openSection(sectionId);
      }
    },
    []
  );

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqCategories;
    return faqCategories
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(faq => {
          const haystack = [faq.question, faq.answer, ...(faq.bullets ?? [])]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter(cat => cat.questions.length > 0);
  }, [query]);

  const totalMatches = filteredCategories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  return (
    <Layout>
      <SEO
        title="Häufige Fragen"
        description="Häufige Fragen von Angehörigen zu Borderline: Verhalten in Krisen, Grenzen setzen, Kommunikation und Selbstschutz – klar und ohne Umschweife beantwortet."
        path="/faq"
      />
      <FAQSchema
        questions={faqCategories.flatMap(c =>
          c.questions.map(q => ({ question: q.question, answer: q.answer }))
        )}
      />

      <EditorialLayout width="narrow">
        {/* ── Hero ── */}
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Häufige Fragen
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
            Häufig gestellte <em>Fragen</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Antworten auf häufige Fragen von Angehörigen. Die FAQ sollen
            Orientierung geben, ohne schwierige Situationen zu stark zu
            vereinfachen oder eine individuelle Einschätzung zu ersetzen.
          </p>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Vollständig ca. 18 Min · Springen Sie zu einer Frage über das
            Inhaltsverzeichnis.
          </p>
          <LastVerifiedBadge path="/faq" className="mt-6" />
        </header>

        {/* ── Hinweis (vorher Card) ── */}
        <EditorialSectionBlock rule>
          <EditorialProse>
            <p>
              Manche Fragen lassen sich nicht allgemein beantworten, weil
              Sicherheit, Kinder, Gewalt, Trennung oder akute Suizidalität eine
              eigene Einschätzung brauchen. Nutzen Sie diese Seite als
              Orientierung und holen Sie bei Bedarf zusätzliche Beratung dazu.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>

        {/* ── Filter-Eingabe ── */}
        <div className="mt-12">
          <label
            htmlFor="faq-filter"
            className="block uppercase"
            style={labelStyle}
          >
            Fragen durchsuchen
          </label>
          <input
            id="faq-filter"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="z.B. Kinder, Einweisung, Medikamente"
            className="mt-2 w-full border-b bg-transparent py-2 outline-none focus:border-[color:var(--accent-primary)]"
            style={{
              borderColor: "var(--rule-color)",
              fontSize: "var(--text-md)",
              color: "var(--fg-primary)",
            }}
            aria-describedby="faq-filter-status"
          />
          {query.trim() && (
            <p
              id="faq-filter-status"
              className="mt-2"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--fg-tertiary)",
              }}
              aria-live="polite"
            >
              {totalMatches === 0
                ? "Keine Treffer."
                : `${totalMatches} ${totalMatches === 1 ? "Treffer" : "Treffer"}.`}
            </p>
          )}
        </div>

        {/* ── Kategorie-Sprungleiste ── */}
        {!query.trim() && (
          <nav
            aria-label="Kategorie-Sprungleiste"
            className="mt-8 border-t border-b py-4"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p
              className="flex flex-wrap gap-x-5 gap-y-2 uppercase"
              style={labelStyle}
            >
              {faqCategories.map(category => {
                const catId = `cat-${slugify(category.title)}`;
                return (
                  <a
                    key={catId}
                    href={`#${catId}`}
                    className="editorial-link"
                    onClick={e => handleAnchorClick(e, catId)}
                  >
                    {category.title}
                  </a>
                );
              })}
            </p>
          </nav>
        )}

        {/* ── FAQ-Kategorien ── */}
        {filteredCategories.length === 0 && query.trim() && (
          <p
            className="mt-12"
            style={{
              fontSize: "var(--text-md)",
              color: "var(--fg-secondary)",
            }}
          >
            Keine passenden Fragen gefunden. Versuchen Sie einen anderen
            Suchbegriff oder kontaktieren Sie die{" "}
            <Link href="/fachstelle" className="editorial-link">
              Fachstelle Angehörigenarbeit
            </Link>
            .
          </p>
        )}
        {filteredCategories.map(category => {
          const catId = `cat-${slugify(category.title)}`;
          return (
            <section key={category.title} id={catId}>
              <EditorialSectionBlock label="Themenfeld" title={category.title}>
                <div className="mt-2">
                  {category.questions.map(faq => {
                    const faqId = `faq-${slugify(faq.question)}`;
                    return (
                      <ContentSection
                        key={`${faqId}-${query.trim() ? "filtered" : "default"}`}
                        variant="editorial"
                        title={faq.question}
                        id={faqId}
                        defaultOpen={!!query.trim()}
                      >
                        <EditorialProse>
                          <p>{faq.answer}</p>
                          {faq.bullets && faq.bullets.length > 0 && (
                            <ul
                              className="mt-4 space-y-2"
                              style={{
                                fontSize: "var(--text-md)",
                                lineHeight: "var(--lh-relaxed)",
                                color: "var(--fg-secondary)",
                              }}
                            >
                              {faq.bullets.map(bullet => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {faq.links && faq.links.length > 0 && (
                            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                              {faq.links.map(link => (
                                <Link
                                  key={link.url + link.text}
                                  href={link.url}
                                  className="editorial-link"
                                >
                                  {link.text.replace(/\s*→\s*$/, "")}
                                </Link>
                              ))}
                            </p>
                          )}
                        </EditorialProse>
                      </ContentSection>
                    );
                  })}
                </div>
              </EditorialSectionBlock>
            </section>
          );
        })}

        {/* ── Quellen ── */}
        <div className="mt-12">
          <EvidenceNote
            variant="editorial"
            title="Quellen zu Prognose- und Therapieaussagen"
            definition="Kurzdefinition: Remission = Diagnosekriterien werden über längere Zeit nicht mehr erfüllt; Recovery = Remission plus stabiles soziales/berufliches Funktionsniveau."
            sources={[
              {
                label:
                  "Zanarini et al. (2010), Time to attainment of recovery from BPD",
                href: "https://pubmed.ncbi.nlm.nih.gov/20395399/",
              },
              {
                label:
                  "Zanarini et al. (2012), Sustained remission and recovery in BPD",
                href: "https://pubmed.ncbi.nlm.nih.gov/22737693/",
              },
              {
                label: "Gunderson et al. (2011), Ten-year course of BPD (CLPS)",
                href: "https://pubmed.ncbi.nlm.nih.gov/21464343/",
              },
              {
                label:
                  "Storebø et al. (2020), Psychological therapies for BPD (Cochrane)",
                href: "https://pubmed.ncbi.nlm.nih.gov/32368793/",
              },
            ]}
          />
        </div>

        {/* ── Weitere Fragen ── */}
        <EditorialSectionBlock
          label="Weiter"
          title="Ihre Frage ist nicht dabei?"
          rule
        >
          <EditorialProse>
            <p>
              Nutzen Sie die Suchfunktion oder kontaktieren Sie die{" "}
              <Link href="/fachstelle" className="editorial-link">
                Fachstelle Angehörigenarbeit
              </Link>{" "}
              der PUK Zürich für individuelle Beratung. Begriffe nachschlagen im{" "}
              <Link href="/glossar" className="editorial-link">
                Glossar
              </Link>
              .
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
