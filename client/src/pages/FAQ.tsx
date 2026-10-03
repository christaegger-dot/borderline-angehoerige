import { useCallback, useMemo, useState } from "react";
import ContentSection from "@/components/ContentSection";
import {
  DisplayHeading,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
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
          "Der Begriff «heilbar» ist dafür zu ungenau. Remission bedeutet, dass die Diagnosekriterien nicht mehr erfüllt sind; Recovery umfasst darüber hinaus persönliche Lebensqualität, Beziehungen und Teilhabe. Viele Menschen erreichen im Verlauf eine deutliche Besserung oder Remission, doch Zeitpunkt, Ausmass und persönliche Genesung unterscheiden sich. Therapie kann den Prozess unterstützen, macht ihn aber nicht vollständig planbar.",
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
          "Dass jemand in verschiedenen Beziehungen unterschiedlich wirkt, ist nicht automatisch ein Zeichen von Manipulation. Nähe, Erwartungen, Sicherheit, Stress und eingeübte Rollen können die Regulation beeinflussen. Bei manchen Menschen aktiviert eine enge Beziehung besonders starke Verlust- oder Bindungssorgen; bei anderen spielen andere Gründe mit. Die Absicht lässt sich von aussen nicht sicher feststellen. Fragen Sie nach, beschreiben Sie beobachtbares Verhalten und behalten Sie Ihre eigene Grenze im Blick.",
        links: [{ text: "Beziehungsmuster verstehen", url: "/verstehen" }],
      },
      {
        question: "Wer kann eine Borderline-Diagnose stellen?",
        answer:
          "Eine vertiefte Borderline-Abklärung wird häufig von Fachärzt:innen für Psychiatrie und Psychotherapie oder entsprechend qualifizierten psychologischen Psychotherapeut:innen durchgeführt. Hausärzt:innen können Beschwerden einordnen, andere Ursachen mitprüfen und an geeignete Fachpersonen überweisen. Wer die diagnostische Gesamtbeurteilung übernimmt und wie viele Termine nötig sind, hängt von Qualifikation, Fragestellung und Setting ab; entscheidend ist eine sorgfältige Beurteilung über mehr als einen Momenteindruck.",
        links: [
          {
            text: "Diagnostik-Seite — Wer & Wie",
            url: "/verstehen/diagnostik#wer",
          },
        ],
      },
      {
        question: "Was, wenn die betroffene Person die Diagnose ablehnt?",
        answer:
          "Diagnose-Ablehnung ist eine häufige Reaktion und kein Versagen — Stigma, Scham oder Misstrauen gegenüber Psychiatrie sind verständliche Gründe. Drängen, Beweisen oder die Diagnose in Konflikten als Argument einzusetzen verschärft die Lage meist. Was möglich ist: die Diagnose für sich selbst als Orientierung nutzen, Beratung der Fachstelle in Anspruch nehmen, geduldig bleiben, konkrete Verhaltensweisen statt das Label ansprechen. Bei akuter Gefahr ist die Diagnose-Frage ohnehin nachrangig — dann zählt die Soforthilfe.",
        links: [
          {
            text: "Diagnostik-Seite — Diagnose-Ablehnung",
            url: "/verstehen/diagnostik#ablehnung",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        question: "Wie lange dauert es, bis eine Diagnose feststeht?",
        answer:
          "Dafür gibt es keine feste Dauer. Anamnese, strukturierte Gespräche, Differenzialdiagnostik und Informationen zum Verlauf können je nach Fragestellung in unterschiedlich vielen Terminen zusammengeführt werden. Entscheidend ist, dass die Einordnung nicht nur auf einem Momenteindruck beruht und verbleibende Unsicherheit offen benannt wird.",
        links: [
          {
            text: "Diagnostik-Seite — Wie läuft eine Diagnostik ab",
            url: "/verstehen/diagnostik#wie",
          },
        ],
      },
      {
        question:
          "Was bedeutet es, wenn mehrere Diagnosen gleichzeitig genannt werden?",
        answer:
          "Bei Borderline tritt selten nur eine Diagnose auf. Häufig kommen Depression, Angststörungen, PTBS oder weitere Erkrankungen hinzu — Fachpersonen sprechen dann von Komorbidität oder Begleiterkrankungen. Das bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die in der Behandlung mitberücksichtigt wird. Komorbide Erkrankungen werden meistens integriert mitbehandelt; bei akut bedrohlichen Phasen (z. B. schwere Depression, Substanzgebrauchskrise) wird das vorrangig stabilisiert.",
        links: [
          {
            text: "Begleiterkrankungen",
            url: "/verstehen/begleiterkrankungen",
          },
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
            url: "/verstehen/begleiterkrankungen#depression",
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
          "Suizidäusserungen immer ernst nehmen und professionelle Hilfe einschalten – sagen Sie klar: «Wenn du sagst, du willst dir etwas antun, hole ich Hilfe.» Bei anderen bedrohlich wirkenden Aussagen ruhig bleiben, nach der Bedeutung fragen und nicht aus Angst nachgeben. Von aussen lässt sich nicht sicher erkennen, ob Verzweiflung, Verlassensangst, Druck, bewusste Absicht oder mehrere Faktoren mitwirken. Entscheidend sind Sicherheit, beobachtbares Verhalten und Ihre Grenze, nicht eine vermutete Motivation.",
        links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }],
      },
      {
        question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
        answer:
          "Vermeiden Sie Rechtfertigungen oder Gegenangriffe – das eskaliert die Situation. Nutzen Sie stattdessen Validierung: «Ich verstehe, dass du dich gerade verletzt fühlst» (validiert das Gefühl, nicht die Beschuldigung). Dann setzen Sie eine Grenze: «Ich möchte mit dir darüber sprechen, aber nicht, wenn du mich anschreist.» Wenn möglich, bieten Sie eine Pause an: «Lass uns in 20 Minuten weitersprechen, wenn wir beide ruhiger sind.» Wichtig: Sie müssen sich nicht für Dinge entschuldigen, die Sie nicht getan haben.",
        links: [
          { text: "Gesprächshilfen kennenlernen", url: "/kommunizieren" },
          { text: "Gespräche üben →", url: "/uebungen" },
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
          "Ob eine stationäre Aufnahme oder eine fürsorgerische Unterbringung angezeigt und rechtlich zulässig ist, können Angehörige nicht selbst entscheiden. Das braucht eine professionelle Einschätzung; die fürsorgerische Unterbringung ist zusätzlich gesetzlich geregelt und hängt von der konkreten Situation und Zuständigkeit ab. Bei unmittelbarer Gefahr rufen Sie 144 beziehungsweise bei Gewalt 117. Wenn Sie unsicher sind, kontaktieren Sie den psychiatrischen Notfalldienst der passenden Altersgruppe.",
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
          {
            text: "Jugendliche & Diagnostik",
            url: "/verstehen/diagnostik#jugendliche",
          },
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
          "Es gibt keine einzelne Therapie, die für alle Menschen am besten ist. Empfohlen wird eine strukturierte Psychotherapie, die auf die zentralen Schwierigkeiten der Borderline-Persönlichkeitsstörung ausgerichtet ist. Dazu gehören zum Beispiel DBT, MBT, Schematherapie oder TFP; auch strukturierte generalistische Behandlungen können wirksam sein. Methode, Qualifikation der Fachperson, gemeinsam vereinbarte Ziele, verlässlicher Rahmen, Zugänglichkeit und therapeutische Zusammenarbeit sind gemeinsam wichtig.",
        links: [
          { text: "Therapieformen erklärt", url: "/unterstuetzen/therapie" },
        ],
      },
      {
        question: "Helfen Medikamente bei Borderline?",
        answer:
          "Es gibt keine etablierte medikamentöse Kernbehandlung der Borderline-Persönlichkeitsstörung; strukturierte Psychotherapie steht im Zentrum. Medikamente können für klar benannte Begleiterkrankungen oder in einzelnen Situationen zeitlich begrenzt erwogen werden. Ziel, erwarteter Nutzen, Risiken, Dauer und Überprüfung sollten ärztlich festgelegt werden; unwirksame oder nicht mehr nötige Medikamente gehören überprüft. Einnahme, Umstellung oder Absetzen erfolgen ärztlich begleitet. Angehörige müssen nicht zum Medikamenten-Management werden.",
        links: [
          {
            text: "Begleiterkrankungen",
            url: "/verstehen/begleiterkrankungen",
          },
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
        <header className="pb-16 pt-12 md:pb-24 md:pt-16">
          <EyebrowLabel spacing="compact">Häufige Fragen</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Häufig gestellte Fragen
          </DisplayHeading>
          <Lede className="mt-6">
            Antworten auf häufige Fragen von Angehörigen. Die FAQ sollen
            Orientierung geben, ohne schwierige Situationen zu stark zu
            vereinfachen oder eine individuelle Einschätzung zu ersetzen.
          </Lede>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-tertiary)",
            }}
          >
            Alle Antworten zusammen ca. 18 Min · Einzelne Fragen sind direkt
            über das Inhaltsverzeichnis erreichbar.
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
