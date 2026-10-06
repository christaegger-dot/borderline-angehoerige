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

const faqCategories: FAQCategory[] = [
  {
    title: "Diagnose & Krankheitsverständnis",
    questions: [
      {
        question: "Soll ich die Diagnose ansprechen?",
        answer:
          "Das hängt von der Situation ab. Wenn die betroffene Person die Diagnose kennt und darüber sprechen möchte, kann ein offenes Gespräch hilfreich sein. Fragen Sie, welche Begriffe für sie passen und was sie von Ihnen braucht. Verwenden Sie die Diagnose nicht als Erklärung für jedes Verhalten oder als Argument im Konflikt («Das ist wieder deine Borderline»). Wenn keine Diagnose gestellt wurde oder die Einordnung nicht geteilt wird, bleiben Sie bei konkreten Beobachtungen und Ihrem eigenen Erleben: «Ich merke, dass unser Gespräch gerade sehr angespannt ist.»",
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
        question:
          "Was, wenn die betroffene Person die Diagnose nicht teilt oder unsicher ist?",
        answer:
          "Eine Diagnose kann hilfreich sein, muss sich für die betroffene Person aber nicht stimmig anfühlen. Es können fachliche Fragen, andere Erklärungen, frühere Erfahrungen im Versorgungssystem oder Sorge vor Stigmatisierung dahinterstehen. Drängen, Beweisen oder das Etikett im Konflikt einzusetzen hilft nicht. Fragen Sie, was unklar ist, sprechen Sie über konkrete Beobachtungen und respektieren Sie die Entscheidung der Person. Wenn sie das möchte, können das Behandlungsteam oder eine zweite fachliche Einschätzung offene Fragen klären. Eigene Angehörigenberatung ist auch ohne Diagnose möglich. Bei akuter Gefahr ist die Diagnose-Frage nachrangig — dann zählt die Soforthilfe.",
        links: [
          {
            text: "Diagnostik-Seite — offene Fragen und Zweitmeinung",
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
          "Begleiterkrankungen wie Depression, Angststörungen oder PTBS kommen bei Borderline häufig vor, aber nicht bei allen Menschen. Fachpersonen sprechen dann von Komorbidität. Das bedeutet nicht «doppelt schlimm», sondern beschreibt eine Kombination, die in der Behandlung mitberücksichtigt wird. Welche Beschwerden gemeinsam oder nacheinander behandelt werden, wird individuell mit der betroffenen Person entschieden; akut bedrohliche Situationen brauchen zuerst Sicherheit und passende Hilfe.",
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
          "Depressive Beschwerden oder eine depressive Erkrankung können zusätzlich zu Borderline auftreten, aber nicht bei allen Menschen. Dauer oder Wechsel einer Stimmung reichen für Angehörige nicht aus, um die Ursache einzuordnen; das ist Aufgabe einer fachlichen Abklärung. Wichtig: Eine schwere depressive Episode kann das Suizidrisiko erhöhen. Wenn Sie anhaltende Hoffnungslosigkeit oder konkrete Aussagen mit suizidalem Inhalt wahrnehmen, nehmen Sie diese ernst und nutzen Sie die Soforthilfe — unabhängig von einer bestehenden Diagnose.",
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
          "Suizidäusserungen immer ernst nehmen und professionelle Hilfe einschalten – sagen Sie klar: «Wenn du sagst, du willst dir etwas antun, hole ich Hilfe.» Bei anderen bedrohlich wirkenden Aussagen bleiben Sie bei dem, was Sie tatsächlich wahrnehmen: Fragen Sie nach der Bedeutung, achten Sie auf konkrete Hinweise auf Gefahr und benennen Sie Ihre Grenze. Ein Motiv lässt sich von aussen nicht sicher ableiten. Bei Bedrohung oder Gewalt haben Abstand und Schutz Vorrang vor dem Gespräch.",
        links: [{ text: "Krisenszenarien-Anleitungen", url: "/soforthilfe" }],
      },
      {
        question: "Was sage ich, wenn mein Angehöriger mich beschuldigt?",
        answer:
          "Rechtfertigungen oder Gegenangriffe können ein angespanntes Gespräch weiter verschärfen. Versuchen Sie zunächst zu klären, was die andere Person erlebt: «Ich höre, dass dich das verletzt hat.» Damit erkennen Sie ihr Erleben an, ohne einer Beschuldigung zuzustimmen. Wenn Sie angeschrien werden, können Sie eine Grenze benennen: «Ich möchte darüber sprechen, aber nicht, solange wir schreien.» Eine Pause kann helfen; Sie dürfen auch sagen, wenn Sie das Gespräch heute nicht fortsetzen. Sie müssen sich nicht für etwas entschuldigen, das Sie nicht getan haben.",
        links: [
          { text: "Gesprächshilfen kennenlernen", url: "/kommunizieren" },
          { text: "Gespräche üben →", url: "/uebungen" },
        ],
      },
      {
        question: "Was hilft bei stark wechselnden Bewertungen?",
        answer:
          "Unter hoher Anspannung kann es vorübergehend schwerer sein, widersprüchliche Gefühle und Eindrücke gleichzeitig wahrzunehmen. Das kann sich als stark wechselnde Bewertung einer Person oder Situation zeigen, tritt aber nicht bei allen Menschen mit Borderline auf und sagt nichts Sicheres über Absicht oder Charakter. Bleiben Sie bei Ihrer Wahrnehmung und fragen Sie nach: «Gestern haben wir uns nah gefühlt; gerade erlebe ich viel Distanz. Wie ist es für dich?» Sie dürfen zugleich Ihre eigene Sicht und Ihre Grenzen behalten.",
        links: [{ text: "Borderline verstehen", url: "/verstehen" }],
      },
      {
        question: "Soll ich lügen, um Konflikte zu vermeiden?",
        answer:
          "Ehrlichkeit und ein Recht auf Privatsphäre sind in jeder Beziehung wichtig. Frühere Verletzungen, aktuelle Unsicherheit oder Erfahrungen mit Stigmatisierung können Vertrauen erschweren; das ist individuell verschieden und nicht allein durch eine Diagnose erklärt. Sprechen Sie ehrlich und respektvoll, verwenden Sie «Ich»-Aussagen und teilen Sie nur, was Sie verantworten können. Wenn ein Gespräch belastet, können Sie das Erleben anerkennen, ohne etwas Unwahres zu sagen. Ehrlichkeit mit Mitgefühl liegt zwischen verletzender Offenheit und Vermeidung.",
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
          "Ob eine stationäre Aufnahme oder eine fürsorgerische Unterbringung angezeigt und rechtlich zulässig ist, können Angehörige nicht selbst entscheiden. Das braucht eine professionelle Einschätzung; die fürsorgerische Unterbringung ist zusätzlich gesetzlich geregelt und hängt von der konkreten Situation und Zuständigkeit ab. Bei akuter Gefahr oder Unsicherheit finden Sie passende Anlaufstellen auf der Soforthilfe-Seite.",
        links: [
          { text: "Akute Hilfe und Notfallkontakte", url: "/soforthilfe" },
        ],
      },
      {
        question: "Darf ich meinen Angehörigen verlassen?",
        answer:
          "Ja. Eine Krise verpflichtet Sie nicht, in einer Beziehung oder an einem Ort zu bleiben. Ihre Sicherheit und Selbstbestimmung haben Vorrang; Sie dürfen eine Beziehung beenden oder eine Situation verlassen, auch wenn die andere Person psychisch erkrankt oder akut belastet ist. Wenn es für Sie sicher und gewünscht ist, können Vorbereitung, Schutzplanung oder fachliche Beratung helfen. Bei Drohungen, Gewalt, betroffenen Kindern oder Suizidankündigungen holen Sie zusätzliche Hilfe, ohne die Verantwortung allein zu übernehmen. Sie können gehen und trotzdem Mitgefühl behalten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        question: "Wie schütze ich meine Kinder?",
        answer:
          "Wichtig ist, alltägliche Belastung, wiederholte Eskalation, Kindeswohlgefährdung und akute Gefahr auseinanderzuhalten. Nicht jede überforderte Familie braucht sofort eine Meldung – aber Kinder brauchen Schutz vor Gewalt, massiver Alarmstimmung und Krisensituationen, die sie nicht einschätzen können. Erklären Sie altersgerecht, dass starke Gefühle nicht die Schuld des Kindes sind, und schützen Sie Kinder aktiv vor Eskalationen.",
        bullets: [
          "Im Alltag helfen Routinen, verlässliche Bezugspersonen, Schlaf, Schule, Freunde und eine einfache Sprache: «Bei uns ist es gerade schwer. Du hast daran keine Schuld.»",
          "Bei wiederholten Eskalationen holen Sie früh fachliche Beratung dazu. Anlaufstellen finden Sie auf der Soforthilfe-Seite.",
          "Wenn ein Kind selbst stark belastet ist, können der schulpsychologische Dienst, die Kinder- und Jugendpsychiatrie oder die örtliche Mütter-/Väterberatung passende Unterstützung bieten.",
          "Bei ernsthafter Kindeswohlgefährdung – etwa bei Gewalt, massiver Vernachlässigung, Angst vor zuhause oder wenn ein Kind wiederholt Schutzräume braucht – ist eine Gefährdungsmeldung an die KESB oder eine lokale Kindesschutzstelle angemessen.",
          "Bei akuter Gefahr bringen Sie sich und das Kind in Sicherheit und holen Sie professionelle Hilfe.",
        ],
        links: [
          { text: "Grenzen setzen", url: "/grenzen" },
          { text: "Selbstfürsorge als Elternteil", url: "/selbstfuersorge" },
          {
            text: "Jugendliche & Diagnostik",
            url: "/verstehen/diagnostik#jugendliche",
          },
          { text: "Akute Hilfe und Notfallkontakte", url: "/soforthilfe" },
        ],
      },
      {
        question: "Woran merke ich, dass mein eigenes Leben zu kurz kommt?",
        answer:
          "«Co-Abhängigkeit» ist keine klar abgegrenzte klinische Diagnose und kann Angehörige vorschnell etikettieren. Hilfreicher sind konkrete Fragen: Vernachlässigen Sie Schlaf, Gesundheit, Freundschaften oder Arbeit? Fühlen Sie sich für Gefühle und Entscheidungen der anderen Person verantwortlich? Übernehmen Sie mehr, als Sie wollen oder tragen können? Solche Reaktionen können unter anhaltender Belastung entstehen und sind kein persönliches Versagen. Beratung, eigene Therapie oder eine Angehörigengruppe können helfen, Bedürfnisse, Verantwortung und Grenzen neu zu sortieren.",
        links: [
          { text: "Selbstfürsorge", url: "/selbstfuersorge" },
          { text: "Glossar: Co-Abhängigkeit einordnen", url: "/glossar" },
        ],
      },
    ],
  },
  {
    title: "Therapie & Behandlung",
    questions: [
      {
        question: "Was, wenn die nahestehende Person keine Therapie möchte?",
        answer:
          "Ob jemand eine Therapie beginnt, entscheidet die betroffene Person. Sprechen Sie Unterstützung als Möglichkeit an, ohne zu drängen: «Ich mache mir Sorgen. Möchtest du gemeinsam nach Angeboten schauen?» Fragen Sie, was gegen eine Behandlung spricht und welche Form von Hilfe vorstellbar wäre. Eigene Grenzen dienen Ihrem Schutz und Ihren Bedürfnissen, nicht als Druckmittel für eine Behandlung. Holen Sie sich selbst Unterstützung, unabhängig davon, wie die andere Person entscheidet. Bei akuter Gefährdung gelten die beschriebenen Notfallwege; eine notwendige Intervention beurteilen die zuständigen Fachpersonen.",
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
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
        ],
      },
      {
        question: "Soll ich an der Therapie teilnehmen?",
        answer:
          "Wenn die betroffene Person und die behandelnde Fachperson Sie einladen und alle Beteiligten zustimmen, können Angehörigensitzungen oder Familiengespräche Verständnis und Zusammenarbeit fördern. Klären Sie vorab Ziel, Rolle und Vertraulichkeit. Bringen Sie Ihre eigene Perspektive ein und hören Sie auch die anderen Sichtweisen an; es geht nicht darum, Schuld oder Recht zu verteilen. Wenn Sie nicht eingeladen werden, respektieren Sie die Entscheidung und den geschützten Therapieraum. Eigene Angehörigenberatung bleibt unabhängig davon möglich.",
        links: [
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
        ],
      },
      {
        question: "Wie lange dauert die Behandlung?",
        answer:
          "Borderline-Behandlung ist häufig längerfristig angelegt. Je nach Belastung, Komorbidität, Setting und Krisenverlauf können Monate bis mehrere Jahre relevant sein. Stationäre Aufenthalte (z.B. DBT-Station) dauern oft einige Wochen und sind eher ein Baustein als «die ganze Lösung». Verläufe unterscheiden sich; schwierigere Phasen können auftreten und sind kein Zeichen von Versagen.",
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
          "Sie müssen nicht alles erklären und sollten die Privatsphäre der betroffenen Person mitbedenken. Sagen Sie nur so viel, wie für Ihre eigene Unterstützung nötig ist: «Eine mir nahestehende Person erlebt gerade psychische Belastungen. Ich möchte ihre Privatsphäre wahren, brauche aber selbst etwas Unterstützung.» Sie können Grenzen setzen: «Ich möchte nicht ins Detail gehen.» Wählen Sie sorgfältig aus, wem Sie was erzählen, und bitten Sie um konkrete Hilfe, zum Beispiel: «Könntest du nächste Woche auf die Kinder aufpassen?»",
      },
      {
        question:
          "Was, wenn Deutsch nicht die Hauptsprache ist oder psychische Erkrankung in unserer Familie tabuisiert ist?",
        answer:
          "Das ist häufiger, als viele denken. Hilfe kann auch dann sinnvoll sein, wenn das Wort «Borderline» in der Familie noch gar nicht fällt. Oft ist es leichter, zuerst über das Beobachtbare zu sprechen: Schlaf, starke Anspannung, Rückzug, laut geführte Konflikte, Selbstverletzung, Angst, Schule, Arbeit oder Sicherheit.",
        bullets: [
          "Verwenden Sie kurze, konkrete Sätze statt Fachsprache. Nicht jede Familie muss zuerst die Diagnose akzeptieren, bevor Unterstützung beginnen darf.",
          "Fragen Sie in Praxis, Klinik oder Beratungsstelle ausdrücklich nach professioneller Dolmetschung, wenn Deutsch nicht für alle sicher genug ist. Gerade bei Diagnose-, Krisen- oder Gewaltgesprächen sollten Kinder diese Rolle nicht übernehmen müssen.",
          "Wenn Scham, Angst vor Stigmatisierung oder Unsicherheit gegenüber Behörden gross sind, benennen Sie zuerst das Ziel: Schutz, Entlastung, weniger Eskalation, mehr Schlaf oder Sicherheit für die Kinder.",
          "Bei akuter Gefahr gilt trotzdem: Sicherheit geht vor. Dann lieber früh Hilfe holen, auch wenn noch nicht alle Begriffe, Hintergründe oder Familienkonflikte geklärt sind.",
        ],
        links: [
          {
            text: "Therapie und Angehörigenrolle",
            url: "/unterstuetzen/therapie",
          },
          { text: "Soforthilfe", url: "/soforthilfe" },
        ],
      },
      {
        question: "Wie gehe ich mit Eifersucht und Kontrolle um?",
        answer:
          "Eifersucht und kontrollierendes Verhalten können viele Ursachen haben; aus einer Borderline-Diagnose lässt sich das Motiv nicht ableiten. Unterscheiden Sie zwischen einem nachvollziehbaren Gefühl und einem Verhalten, das Ihre Privatsphäre oder Sicherheit verletzt. Sie können Unsicherheit anerkennen und zugleich eine Grenze benennen: «Ich sehe, dass dich das verunsichert. Mein Handy bleibt privat.» Die Grenze schützt Ihre Privatsphäre; sie soll die andere Person weder bestrafen noch zu einer Veränderung zwingen. Wenn die betroffene Person das möchte, kann sie solche Situationen in einer Therapie oder einem gemeinsamen Beratungsgespräch bearbeiten.",
        links: [{ text: "Grenzen setzen", url: "/grenzen" }],
      },
      {
        question: "Wie kann ich mein eigenes Leben behalten?",
        answer:
          "Eigene Freundschaften, Interessen und Erholungszeiten sind kein Verrat, sondern gehören zu Ihrem Leben. Unter hoher Belastung braucht es manchmal bewusste Entscheidungen, damit diese Bereiche nicht vollständig verschwinden. Ein tragfähiger Alltag darf Beziehung, Selbstschutz, Freude und eigene Ziele nebeneinander enthalten. Beratung oder Austausch mit anderen Angehörigen kann helfen, dafür wieder Raum zu schaffen.",
        links: [
          { text: "Selbstfürsorge-Strategien", url: "/selbstfuersorge" },
          { text: "Beratung & Netzwerke", url: "/beratung" },
        ],
      },
      {
        question: "Wann wird es besser?",
        answer:
          "Das ist für viele Angehörige eine schwierige Frage. Der Verlauf bleibt begrenzt vorhersehbar: Manche Menschen erleben nach Monaten deutliche Fortschritte, bei anderen dauert es länger, und Genesung kann unterschiedlich aussehen. Sie sind nicht für Zeitpunkt, Tempo oder Erfolg der Genesung verantwortlich. Entscheiden können Sie über Ihre eigenen Reaktionen, Grenzen und Unterstützung. Hilfreich ist meist, Entwicklungen über längere Zeit zu betrachten statt einzelne Tage oder Krisen.",
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
