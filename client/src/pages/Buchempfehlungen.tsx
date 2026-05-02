import { useCallback } from "react";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSection,
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
  shopLink?: string;
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
          "Ein langjähriger Standardtitel für Angehörige. Beschreibt typische Beziehungsmuster, Kommunikationsideen und Fragen des Selbstschutzes in engeren Beziehungen.",
        forWhom: "Partner, Familienmitglieder, enge Freunde",
        highlight: true,
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Ich hasse dich – verlass mich nicht",
        author: "Jerold J. Kreisman & Hal Straus",
        publisher: "Kösel",
        year: "2012",
        description:
          "Erklärt die Schwarz-Weiss-Welt der Borderline-Persönlichkeit aus beiden Perspektiven. Hilft zu verstehen, warum Betroffene zwischen Idealisierung und Entwertung schwanken – und wie man damit umgehen kann.",
        forWhom: "Alle Angehörigen, auch Betroffene selbst",
        highlight: true,
        shopLink: "https://www.koesel.de",
      },
      {
        title: "Borderline – Das Selbsthilfe-Buch für Angehörige",
        author: "Christa Windmüller",
        publisher: "Thieme",
        year: "2024",
        description:
          "Aktueller Ratgeber mit Fokus auf Selbstfürsorge. Zeigt, wie Sie Stabilität im Alltag finden und ein positives Miteinander gestalten können – ohne sich selbst zu verlieren.",
        forWhom: "Partner, Familienmitglieder",
        shopLink: "https://www.thieme.de",
      },
      {
        title: "L(i)eben mit Borderline",
        author: "Udo Rauchfleisch",
        publisher: "Patmos",
        year: "2015",
        description:
          "Einfühlsam geschrieben von einem erfahrenen Psychotherapeuten. Verbindet fachliches Wissen mit praktischen Tipps für den Beziehungsalltag.",
        forWhom: "Partner, Angehörige",
      },
      {
        title: "Wenn lieben weh tut",
        author: "Manuela Rösel",
        publisher: "Starks-Sture",
        year: "2006",
        description:
          "Kommunikationsratgeber speziell für Partner in einer Borderline-Beziehung. Konkrete Gesprächsstrategien für schwierige Situationen.",
        forWhom: "Partner in Paarbeziehungen",
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
        shopLink: "https://www.hogrefe.com/de",
      },
      {
        title: "Ratgeber Borderline-Persönlichkeitsstörung",
        author: "Martin Bohus & Martina Wolf-Arehult",
        publisher: "Hogrefe",
        year: "2018",
        description:
          "Informiert über Erscheinungsform, Ursachen und Behandlungsmöglichkeiten. Zeigt Eltern und Bezugspersonen, wie sie unterstützen können.",
        forWhom: "Eltern, Bezugspersonen",
      },
      {
        title: "Borderline – Ein Ratgeber für Betroffene und Angehörige",
        author: "Ewald Rahn",
        publisher: "Psychiatrie-Verlag",
        year: "2001",
        description:
          "Ein Klassiker, verständlich geschrieben. Bietet einen guten Überblick über die Störung und praktische Hinweise für den Umgang.",
        forWhom: "Alle Angehörigen",
      },
      {
        title: "Borderline verstehen und bewältigen",
        author: "Psychiatrie-Verlag",
        publisher: "Psychiatrie-Verlag",
        description:
          "Mit passendem Begleitbuch. Liefert Tipps und Anleitungen, um die Erkrankung zu erkennen und Mut zu fassen für den gemeinsamen Weg.",
        forWhom: "Eltern, Familien",
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
        author: "Psychiatrie-Verlag (Kids in BALANCE)",
        publisher: "Psychiatrie-Verlag",
        description:
          "Das einzige deutschsprachige Kinderbuch speziell zum Thema Borderline. Erklärt kindgerecht das 'Schleuderprogramm der Gefühle' und zeigt Kindern, dass sie geliebt werden – auch wenn Mama oder Papa es manchmal nicht zeigen können.",
        forWhom: "Kinder ab 6 Jahren",
        highlight: true,
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Mamas Monster",
        author: "Erdmute von Mosch",
        publisher: "Psychiatrie-Verlag",
        year: "2024",
        description:
          "Einfühlsames Bilderbuch über Depression, aber gut übertragbar auf andere psychische Erkrankungen. Zeigt, dass das 'Monster' nicht die Schuld des Kindes ist.",
        forWhom: "Kinder ab 4 Jahren",
      },
      {
        title: "Was ist bloss mit Mama los?",
        author: "Karen Glistrup",
        publisher: "Kösel",
        description:
          "Hilft Kindern zu verstehen, wenn Eltern in seelische Krisen geraten. Mit Tipps, wie man mit Kindern über Angst, Depression, Stress und Trauma sprechen kann.",
        forWhom: "Kinder ab 5 Jahren, auch für Eltern",
      },
      {
        title: "Sonnige Traurigtage",
        author: "Schirin Homeier",
        publisher: "Mabuse-Verlag",
        description:
          "Ein Bilderbuch für Kinder psychisch kranker Eltern. Zeigt, dass Kinder nicht schuld sind und dass es Hilfe gibt.",
        forWhom: "Jüngere Kinder ab 4 Jahren",
      },
      {
        title: "Papas Seele hat Schnupfen",
        author: "Claudia Gliemann & Nadia Faichney",
        publisher: "Monterosa",
        description:
          "Ein erzählendes Kindersachbuch über die Welt der Psychiatrie. Nimmt Kindern die Angst vor dem Unbekannten.",
        forWhom: "Kinder ab 6 Jahren",
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
        shopLink: "https://www.psychiatrie-verlag.de",
      },
      {
        title: "Borderline-Mütter und ihre Kinder",
        author: "Christine Ann Lawson",
        publisher: "Psychosozial-Verlag",
        year: "2006",
        description:
          "Für erwachsene Kinder, die ihre Kindheit mit einer Borderline-Mutter verstehen und verarbeiten möchten. Beschreibt verschiedene Mutter-Typen und Wege zur Bewältigung.",
        forWhom: "Erwachsene Kinder von Betroffenen",
      },
      {
        title: "Borderline-Störung: Wie mir die DBT geholfen hat",
        author: "Kröger & Unckel (Hrsg.)",
        publisher: "Hogrefe",
        year: "2006",
        description:
          "Betroffene berichten, wie ihnen die Dialektisch-Behaviorale Therapie geholfen hat. Gibt Hoffnung und zeigt, dass Veränderung möglich ist.",
        forWhom: "Angehörige, die Therapie verstehen wollen",
      },
    ],
  },
];

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

  const authorStyle = {
    fontSize: "var(--text-md)",
    color: "var(--fg-secondary)",
    fontStyle: "italic" as const,
  };

  const descStyle = {
    fontSize: "var(--text-md)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const labelStyle = {
    fontSize: "var(--text-xs)",
    letterSpacing: "var(--tracking-caps)",
    color: "var(--fg-tertiary)",
    fontWeight: 500,
  } as const;

  const categoryHeadingStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--weight-display)",
    color: "var(--fg-primary)",
    letterSpacing: "var(--tracking-tight)",
    lineHeight: "var(--lh-snug)",
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
        <header className="pb-16 pt-16 md:pb-24 md:pt-24">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            Buchempfehlungen
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
            Bücher für <em>Angehörige</em>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-snug)",
              color: "var(--fg-secondary)",
            }}
          >
            Kuratierte deutschsprachige Bücher für Angehörige. Die Auswahl
            verbindet Grundwissen, Beziehungsperspektiven, Selbstfürsorge und
            Erfahrungsnähe, ohne Anspruch auf Vollständigkeit.
          </p>
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
          </p>
        </nav>

        {/* ── Bücher gruppiert nach Kategorie ── */}
        <div className="mt-16 space-y-20">
          {bookCategories.map(category => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="space-y-8"
            >
              {/* Kategorie-Kopf */}
              <div className="space-y-2">
                <h2 style={categoryHeadingStyle}>{category.title}</h2>
                <p style={descStyle}>{category.subtitle}</p>
              </div>

              {/* Bücher-Liste */}
              <ul className="space-y-12">
                {category.books.map(book => {
                  const bookId = `book-${slugifyTitle(book.title)}`;
                  return (
                    <li
                      key={book.title}
                      id={bookId}
                      className="border-t pt-8 space-y-3"
                      style={{ borderColor: "var(--rule-color)" }}
                    >
                      {book.highlight && (
                        <p className="uppercase" style={labelStyle}>
                          Empfehlung
                        </p>
                      )}
                      <h3 style={titleStyle}>{book.title}</h3>
                      <p style={authorStyle}>{book.author}</p>
                      <p className="uppercase" style={labelStyle}>
                        {book.publisher}
                        {book.year && `, ${book.year}`}
                      </p>
                      <p style={descStyle}>{book.description}</p>
                      <p
                        className="flex flex-wrap items-baseline gap-x-5 gap-y-1 pt-1"
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        <span style={labelStyle} className="uppercase">
                          Für: {book.forWhom}
                        </span>
                        {book.shopLink && (
                          <a
                            href={book.shopLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link"
                          >
                            Beim Verlag
                          </a>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* ── Hinweis ── */}
        <EditorialSection label="Hinweis" title="Zu den Empfehlungen" rule>
          <EditorialProse>
            <p>
              Diese Liste ist eine persönliche Auswahl und erhebt keinen
              Anspruch auf Vollständigkeit. Die Bücher wurden nach
              Praxisrelevanz, Verständlichkeit und Aktualität ausgewählt. Einige
              ältere Titel sind Klassiker, die nach wie vor wertvoll sind.
            </p>
            <p>
              Viele Bücher sind auch in Bibliotheken verfügbar oder können über
              die Fernleihe bestellt werden.
            </p>
          </EditorialProse>
        </EditorialSection>
      </EditorialLayout>
    </Layout>
  );
}
