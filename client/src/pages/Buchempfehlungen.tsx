import { useCallback } from "react";
import {
  DisplayHeading,
  EditorialBody,
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
  EyebrowLabel,
  Lede,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

interface Book {
  title: string;
  author: string;
  publisher: string;
  year?: string;
  description: string;
  forWhom: string;
  highlight?: boolean;
  classification?: "critical";
  /**
   * Schweizer Bezugs-Link auf die konkrete Produktseite (Ex Libris, per
   * ISBN/EAN). Konvention: nur gesetzt, wenn eine verifizierte CH-Produktseite
   * vorliegt — sonst leer und im Render ausgeblendet (kein Verlags-Startseiten-
   * Link mehr).
   */
  bezugsUrl?: string;
}

interface BookCategory {
  id: string;
  title: string;
  subtitle: string;
  books: Book[];
}

const bookCategories: BookCategory[] = [
  {
    id: "partner",
    title: "Für Partner & Ehepartner",
    subtitle: "Wenn Ihr Partner oder Ihre Partnerin betroffen ist",
    books: [
      {
        title: "Schluss mit dem Eiertanz",
        author: "Paul T. Mason & Randi Kreger",
        publisher: "Psychiatrie-Verlag",
        year: "2010",
        description:
          "Ein historisch einflussreicher Ratgeber für Angehörige. Er enthält Ideen zu Kommunikation und Selbstschutz, verallgemeinert aber stellenweise Beziehungsmuster und Motive. Krisenhinweise nicht als heutige Notfallanleitung verwenden; mit kritischer Distanz lesen.",
        forWhom: "Partner, Familienmitglieder, enge Freunde",
        classification: "critical",
      },
      {
        title: "Ich hasse dich – verlass mich nicht",
        author: "Jerold J. Kreisman & Hal Straus",
        publisher: "Kösel",
        year: "2012",
        description:
          "Ein historisch einflussreicher Ratgeber, der Begriffe und Beziehungserleben anschaulich macht. Einige Aussagen und Motiverklärungen verallgemeinern; deshalb nicht als diagnostische Grundlage und nur mit kritischer Distanz lesen.",
        forWhom: "Alle Angehörigen, auch Betroffene selbst",
        classification: "critical",
      },
      {
        title: "Die Kunst, mit einem Vulkan zu sprechen",
        author: "Jerold J. Kreisman",
        publisher: "Kösel",
        year: "2020",
        description:
          "Ein Ratgeber zur SET-UP-Methode. Schon die Vulkanmetapher kann Menschen mit Borderline-Erfahrung als unberechenbar oder gefährlich darstellen; auch Motive und Beziehungsmuster werden teilweise verallgemeinert. Deshalb nur mit kritischer Distanz lesen und nicht als heutige Krisen- oder Gesprächsanleitung verwenden.",
        forWhom: "Angehörige, Partner",
        classification: "critical",
      },
      {
        title: "Borderline – Das Selbsthilfe-Buch für Angehörige",
        author: "Christa Windmüller",
        publisher: "TRIAS",
        year: "2025",
        description:
          "Aktueller Ratgeber mit Fokus auf Selbstfürsorge. Zeigt, wie Sie Stabilität im Alltag finden und ein positives Miteinander gestalten können – ohne sich selbst zu verlieren.",
        forWhom: "Partner, Familienmitglieder",
        bezugsUrl:
          "https://www.exlibris.ch/de/buecher-buch/deutschsprachige-buecher/christa-windmueller/borderline-das-selbsthilfe-buch-fuer-angehoerige/id/9783432120751/",
      },
      {
        title: "L(i)eben mit Borderline",
        author: "Udo Rauchfleisch",
        publisher: "Patmos",
        year: "2015",
        description:
          "Einfühlsam geschrieben von einem erfahrenen Psychotherapeuten. Verbindet fachliches Wissen mit praktischen Tipps für den Beziehungsalltag.",
        forWhom: "Partner, Angehörige",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783843606363",
      },
      {
        title: "Wenn lieben weh tut",
        author: "Manuela Rösel",
        publisher: "Starks-Sture",
        year: "2006",
        description:
          "Kommunikationsratgeber speziell für Partner in einer Borderline-Beziehung. Konkrete Gesprächsstrategien für schwierige Situationen.",
        forWhom: "Partner in Paarbeziehungen",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783980949675",
      },
    ],
  },
  {
    id: "eltern",
    title: "Für Eltern",
    subtitle: "Wenn Ihr Kind (Jugendliche oder Erwachsene) betroffen ist",
    books: [
      {
        title: "DBT-Familienskills: Ein Praxisleitfaden",
        author: "Claudia Trasselli",
        publisher: "Hogrefe",
        year: "2022",
        description:
          "Stellt erstmals im deutschen Sprachraum die von Alan Fruzzetti und Perry Hoffman entwickelten Familienskills vor. Praktische Fertigkeiten für den Familienalltag, basierend auf der Dialektisch-Behavioralen Therapie.",
        forWhom: "Eltern, Familien, auch für Fachpersonen",
        highlight: true,
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783801731816",
      },
      {
        title: "Ratgeber Borderline-Persönlichkeitsstörung",
        author: "Anne Kristin von Auer & Michael Kaess",
        publisher: "Hogrefe",
        year: "2022",
        description:
          "Informiert über Erscheinungsform, Ursachen und Behandlungsmöglichkeiten. Zeigt Eltern und weiteren Bezugspersonen, wie sie Jugendliche unterstützen und mit der eigenen Belastung umgehen können.",
        forWhom: "Eltern, Bezugspersonen",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783801727765",
      },
      {
        title: "Borderline verstehen und bewältigen",
        author: "Ewald Rahn & Karsten Giertz",
        publisher: "Psychiatrie-Verlag",
        year: "2023",
        description:
          "Mit passendem Begleitbuch. Liefert Tipps und Anleitungen, um die Erkrankung zu erkennen und Mut zu fassen für den gemeinsamen Weg.",
        forWhom: "Eltern, Familien",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783867393201",
      },
    ],
  },
  {
    id: "kinder",
    title: "Kinderbücher",
    subtitle: "Für Kinder, deren Elternteil betroffen ist",
    books: [
      {
        title: "Mama, Mia und das Schleuderprogramm",
        author: "Christiane Tilly & Anja Offermann",
        publisher: "Psychiatrie-Verlag",
        year: "2012, 3. Aufl. 2025",
        description:
          "Das einzige deutschsprachige Kinderbuch speziell zum Thema Borderline. Erklärt kindgerecht das 'Schleuderprogramm der Gefühle' und zeigt Kindern, dass sie geliebt werden – auch wenn Mama oder Papa es manchmal nicht zeigen können.",
        forWhom: "Kinder ab 6 Jahren",
        highlight: true,
        bezugsUrl:
          "https://www.exlibris.ch/de/buecher-buch/deutschsprachige-buecher/christiane-tilly/mama-mia-und-das-schleuderprogramm/id/9783867393614/",
      },
      {
        title: "Mamas Monster",
        author: "Erdmute von Mosch",
        publisher: "Psychiatrie-Verlag",
        year: "2024",
        description:
          "Einfühlsames Bilderbuch über Depression, aber gut übertragbar auf andere psychische Erkrankungen. Zeigt, dass das 'Monster' nicht die Schuld des Kindes ist.",
        forWhom: "Kinder ab 4 Jahren",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783867393447",
      },
      {
        title: "Was ist bloss mit Mama los?",
        author: "Karen Glistrup",
        publisher: "Kösel",
        description:
          "Hilft Kindern zu verstehen, wenn Eltern in seelische Krisen geraten. Mit Tipps, wie man mit Kindern über Angst, Depression, Stress und Trauma sprechen kann.",
        forWhom: "Kinder ab 5 Jahren, auch für Eltern",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783466310203",
      },
      {
        title: "Sonnige Traurigtage",
        author: "Schirin Homeier",
        publisher: "Mabuse-Verlag",
        description:
          "Ein Bilderbuch für Kinder psychisch kranker Eltern. Zeigt, dass Kinder nicht schuld sind und dass es Hilfe gibt.",
        forWhom: "Jüngere Kinder ab 4 Jahren",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783863215347",
      },
      {
        title: "Papas Seele hat Schnupfen",
        author: "Claudia Gliemann & Nadia Faichney",
        publisher: "Monterosa",
        description:
          "Ein erzählendes Kindersachbuch über die Welt der Psychiatrie. Nimmt Kindern die Angst vor dem Unbekannten.",
        forWhom: "Kinder ab 6 Jahren",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783942640213",
      },
    ],
  },
  {
    id: "erfahrungsberichte",
    title: "Erfahrungsberichte",
    subtitle: "Persönliche Geschichten von Betroffenen und Angehörigen",
    books: [
      {
        title: "Leben auf der Grenze",
        author: "Andreas Knuf (Hrsg.)",
        publisher: "Psychiatrie-Verlag",
        year: "2002",
        description:
          "Texte von Betroffenen und Angehörigen über ihr Erleben, ihre Gefühle und den Alltag mit Borderline. Hilfreich, wenn Sie unterschiedliche Innen- und Beziehungsperspektiven besser verstehen möchten.",
        forWhom: "Alle, die verstehen wollen",
        highlight: true,
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783867390033",
      },
      {
        title: "Borderline-Mütter und ihre Kinder",
        author: "Christine Ann Lawson",
        publisher: "Psychosozial-Verlag",
        year: "2006",
        description:
          "Für erwachsene Kinder, die belastende Kindheitserfahrungen einordnen möchten. Die typologischen Mutterbilder können jedoch stigmatisieren und individuelle Menschen auf Rollen reduzieren; nicht zur Diagnose einer Mutter verwenden und nur mit kritischer Distanz lesen.",
        forWhom: "Erwachsene Kinder von Betroffenen",
        classification: "critical",
      },
      {
        title: "Borderline-Störung: Wie mir die DBT geholfen hat",
        author: "Kröger & Unckel (Hrsg.)",
        publisher: "Hogrefe",
        year: "2006",
        description:
          "Betroffene berichten, wie ihnen die Dialektisch-Behaviorale Therapie geholfen hat. Gibt Hoffnung und zeigt, dass Veränderung möglich ist.",
        forWhom: "Angehörige, die Therapie verstehen wollen",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9783801720216",
      },
    ],
  },
  {
    id: "vertiefen",
    title: "Zum Vertiefen",
    subtitle:
      "Klinisch fundiert — für Angehörige und Fachpersonen, die tiefer einsteigen möchten",
    books: [
      {
        title: "Borderline – Die andere Art zu fühlen",
        author: "Alice Sendera & Martina Sendera",
        publisher: "Springer",
        year: "2016 (2. Aufl.)",
        description:
          "Klinisch fundiert (DBT, Schematheorie, Bindung), mit Lösungsansätzen, Übungen und Texten von Angehörigen. Anspruchsvoller als ein niederschwelliger Einstieg — auch Neurobiologie und Psychopharmakotherapie kommen vor.",
        forWhom: "Angehörige und Fachpersonen, die tiefer einsteigen wollen",
        bezugsUrl:
          "https://www.exlibris.ch/de/buecher-buch/deutschsprachige-buecher/alice-sendera/borderline-die-andere-art-zu-fuehlen/id/9783662480021/",
      },
    ],
  },
  {
    id: "englisch",
    title: "Englischsprachig",
    subtitle:
      "Ein englischsprachiger Titel — aufgenommen, weil es für Jugendliche mit Borderline keinen vergleichbaren deutschsprachigen Eltern-Ratgeber gibt.",
    books: [
      {
        title: "Borderline Personality Disorder in Adolescents",
        author: "Blaise Aguirre",
        publisher: "Fair Winds Press",
        year: "2014",
        description:
          "Englischsprachiges Standardwerk zu BPS bei Jugendlichen. Erklärt Entstehung, Diagnose und Behandlung aus der Perspektive von Eltern und Fachpersonen. Aguirre leitet das McLean-Hospital-Programm für Adoleszente.",
        forWhom: "Eltern, deren Kind (Jugendliche) betroffen ist",
        bezugsUrl: "https://www.exlibris.ch/de/suche/?query=9781592336494",
      },
    ],
  },
];

const currentBookCategories = bookCategories
  .map(category => ({
    ...category,
    books: category.books.filter(book => book.classification !== "critical"),
  }))
  .filter(category => category.books.length > 0);

const criticallyClassifiedBooks = bookCategories.flatMap(category =>
  category.books.filter(book => book.classification === "critical")
);

/** Slugifiziert Buchtitel für stabile Anker-IDs. */
function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Buchempfehlungen() {
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
      e.preventDefault();
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const titleStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-lg)",
    fontWeight: "var(--weight-display)",
    lineHeight: "var(--lh-snug)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
  };

  const categoryHeadingStyle = {
    ...titleStyle,
    fontSize: "var(--text-xl)",
  };

  const authorStyle = {
    fontSize: "var(--text-md)",
    color: "var(--fg-secondary)",
    fontStyle: "italic" as const,
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  const renderBook = (book: Book, headingLevel: 3 | 4) => {
    const bookId = "book-" + slugifyTitle(book.title);
    const BookHeading = headingLevel === 3 ? "h3" : "h4";

    return (
      <li
        key={book.title}
        id={bookId}
        className="border-t pt-8 space-y-3"
        style={{ borderColor: "var(--rule-color)" }}
      >
        {(book.highlight || book.classification === "critical") && (
          <p className="uppercase" style={labelStyle}>
            {book.classification === "critical"
              ? "Kritisch einzuordnen"
              : "Empfehlung"}
          </p>
        )}
        <BookHeading style={titleStyle}>{book.title}</BookHeading>
        <p style={authorStyle}>{book.author}</p>
        <p className="uppercase" style={labelStyle}>
          {book.publisher}
          {book.year && ", " + book.year}
        </p>
        <EditorialBody>{book.description}</EditorialBody>
        <p
          className="flex flex-wrap items-baseline gap-x-5 gap-y-1 pt-1"
          style={{ fontSize: "var(--text-sm)" }}
        >
          <span style={labelStyle} className="uppercase">
            Für: {book.forWhom}
          </span>
          {book.classification !== "critical" && book.bezugsUrl && (
            <a
              href={book.bezugsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              Bei Ex Libris (CH)
            </a>
          )}
        </p>
      </li>
    );
  };

  return (
    <Layout>
      <SEO
        title="Buchempfehlungen"
        description="Buchempfehlungen für Angehörige von Menschen mit Borderline: Ratgeber, Fachliteratur und DBT-Bücher – mit kurzen Einschätzungen zum Inhalt."
        path="/buchempfehlungen"
      />

      <EditorialLayout width="wide">
        {/* ── Hero ── */}
        <header className="pb-16 pt-12 md:pb-24 md:pt-16">
          <EyebrowLabel spacing="compact">Buchempfehlungen</EyebrowLabel>
          <DisplayHeading level={1} size="page">
            Bücher für Angehörige
          </DisplayHeading>
          <Lede className="mt-6">
            Kuratierte, überwiegend deutschsprachige Bücher für Angehörige. Die
            Auswahl verbindet Grundwissen, Beziehungsperspektiven,
            Selbstfürsorge und Erfahrungsnähe, ohne Anspruch auf
            Vollständigkeit. Aktuell empfohlene Titel stehen getrennt von
            Büchern, die historisch einflussreich oder wegen Verallgemeinerungen
            kritisch einzuordnen sind.
          </Lede>
        </header>

        {/* ── Kategorie-Sprungleiste ── */}
        <nav
          aria-label="Kategorie-Sprungleiste"
          className="border-t border-b py-4"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <p
            className="flex flex-wrap gap-x-5 gap-y-2 uppercase"
            style={labelStyle}
          >
            <a
              href="#aktuell-empfohlen"
              className="editorial-link"
              onClick={e => handleAnchorClick(e, "aktuell-empfohlen")}
            >
              Aktuell empfohlen
            </a>
            {bookCategories.map(category => (
              <a
                key={category.id}
                href={`#cat-${category.id}`}
                className="editorial-link"
                onClick={e => handleAnchorClick(e, `cat-${category.id}`)}
              >
                {category.title.replace(/^Für /, "")}
              </a>
            ))}
            <a
              href="#kritisch-eingeordnet"
              className="editorial-link"
              onClick={e => handleAnchorClick(e, "kritisch-eingeordnet")}
            >
              Kritisch eingeordnet
            </a>
          </p>
        </nav>

        {/* ── Aktuelle Empfehlungen, gruppiert nach Kategorie ── */}
        <section id="aktuell-empfohlen" className="mt-16 space-y-12">
          <div className="space-y-3">
            <DisplayHeading level={2} spacing="compact">
              Aktuell empfohlen
            </DisplayHeading>
            <EditorialBody>
              Die Titel sind nach Zielgruppen und Verwendungszweck geordnet.
              Kritisch eingeordnete Bücher folgen bewusst in einem getrennten
              Abschnitt.
            </EditorialBody>
          </div>
          <div className="space-y-20">
            {currentBookCategories.map(category => (
              <section
                key={category.id}
                id={`cat-${category.id}`}
                className="space-y-8"
              >
                {/* Kategorie-Kopf */}
                <div className="space-y-2">
                  <h3 style={categoryHeadingStyle}>{category.title}</h3>
                  <EditorialBody>{category.subtitle}</EditorialBody>
                </div>

                {/* Bücher-Liste */}
                <ul className="space-y-12">
                  {category.books.map(book => renderBook(book, 4))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {/* ── Historisch einflussreiche oder kritisch einzuordnende Titel ── */}
        <section
          id="kritisch-eingeordnet"
          className="mt-20 space-y-8 border-t pt-12"
          style={{ borderColor: "var(--rule-color)" }}
        >
          <div className="space-y-3">
            <DisplayHeading level={2} spacing="compact">
              Historisch einflussreich oder kritisch einzuordnen
            </DisplayHeading>
            <EditorialBody>
              Diese Titel werden nicht als gleichwertige aktuelle Empfehlungen
              geführt. Die bisherigen Einordnungen zu Verallgemeinerungen,
              stigmatisierender Sprache oder veralteten Krisenhinweisen bleiben
              sichtbar. Auf Bezugslinks wird in diesem Abschnitt bewusst
              verzichtet.
            </EditorialBody>
          </div>
          <ul className="space-y-12">
            {criticallyClassifiedBooks.map(book => renderBook(book, 3))}
          </ul>
        </section>

        {/* ── Hinweis ── */}
        <EditorialSectionBlock label="Hinweis" title="Zu den Empfehlungen" rule>
          <EditorialProse>
            <p>
              Diese Liste ist eine persönliche Auswahl und erhebt keinen
              Anspruch auf Vollständigkeit. Aktuelle Fach- und Praxisbücher
              stehen getrennt von historisch einflussreichen oder kritisch
              einzuordnenden Titeln. Solche Titel sind keine wissenschaftlichen
              Evidenzquellen; ihre Sprache, Verallgemeinerungen und
              Krisenhinweise müssen kritisch eingeordnet werden. Das Label
              «Empfehlung» bezeichnet eine redaktionelle Auswahl, keine
              wissenschaftliche Bewertung.
            </p>
            <p>
              Viele Bücher sind auch in Bibliotheken verfügbar oder können über
              die Fernleihe bestellt werden.
            </p>
          </EditorialProse>
        </EditorialSectionBlock>
      </EditorialLayout>
    </Layout>
  );
}
