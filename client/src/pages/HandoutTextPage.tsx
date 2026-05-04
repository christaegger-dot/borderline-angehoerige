import { useEffect, useState } from "react";
import AppLink from "@/components/AppLink";
import {
  EditorialLayout,
  EditorialProse,
  EditorialSectionBlock,
} from "@/components/editorial";
import Layout from "@/components/Layout";
import RelatedLinksEditorial from "@/components/RelatedLinksEditorial";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import {
  getHandoutDownloadHref,
  getHandoutOpenHref,
  prefersHandoutTextVersion,
} from "@/content/handouts";
import {
  getHandoutTextVersion,
  getHandoutTextVersionMeta,
  loadHandoutTextVersion,
} from "@/content/handoutTextVersions";
import type {
  HandoutTextCard,
  HandoutTextVersion,
} from "@/content/handoutTextVersionTypes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import NotFound from "@/pages/NotFound";
import type { RouteComponentProps } from "wouter";
import { Download, ExternalLink } from "lucide-react";

type HandoutTextPageParams = {
  handoutId?: string;
};

const LONG_CARD_TEXT_THRESHOLD = 210;

function getCardGridClass(cards: HandoutTextCard[]) {
  const hasDenseText = cards.some(
    card => card.text.length >= LONG_CARD_TEXT_THRESHOLD
  );

  if (cards.length <= 1) {
    return "grid gap-4";
  }

  if (cards.length === 2 || cards.length === 4 || hasDenseText) {
    return "grid gap-4 md:grid-cols-2";
  }

  return "grid gap-4 md:grid-cols-2 xl:grid-cols-3";
}

export default function HandoutTextPage({
  params,
}: RouteComponentProps<HandoutTextPageParams>) {
  const handoutId = params?.handoutId;
  const handoutMeta = getHandoutTextVersionMeta(handoutId);
  const [handout, setHandout] = useState<HandoutTextVersion | null>(() =>
    getHandoutTextVersion(handoutId)
  );

  useEffect(() => {
    const cachedHandout = getHandoutTextVersion(handoutId);
    setHandout(cachedHandout);

    if (!handoutMeta || cachedHandout) {
      return;
    }

    let cancelled = false;

    void loadHandoutTextVersion(handoutId).then(version => {
      if (!cancelled) {
        setHandout(version);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [handoutId, handoutMeta]);

  if (!handoutMeta) {
    return <NotFound />;
  }

  const pageTitle = handout?.title ?? handoutMeta.title;
  const pageDescription =
    handout?.description ??
    `${handoutMeta.description} Diese Seite bietet eine lesbare Textversion des Handouts.`;
  const pageSummary =
    handout?.summary ?? "Die Textversion dieses Handouts wird geladen.";
  const pageTopicLabel = handout?.topicLabel ?? handoutMeta.topicLabel;
  const pageTopicHref = handout?.topicHref ?? handoutMeta.topicHref;
  const pageKind = handout?.kind ?? handoutMeta.kind;
  const pagePreviewImageUrl =
    handout?.previewImageUrl ?? handoutMeta.previewImageUrl;
  const pdfSourceUrl = handout?.pdfSourceUrl ?? handoutMeta.pdfSourceUrl;

  const openHref = getHandoutOpenHref(pdfSourceUrl) ?? pdfSourceUrl;
  const downloadHref = getHandoutDownloadHref(pdfSourceUrl) ?? pdfSourceUrl;
  const textVersionPreferred = prefersHandoutTextVersion(pdfSourceUrl);
  const pageKicker = handout?.kicker ?? "Textversion";

  const leadStyle = {
    fontSize: "var(--text-lg)",
    lineHeight: "var(--lh-snug)",
    color: "var(--fg-secondary)",
  };

  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const metaStyle = {
    fontSize: "var(--text-sm)",
    color: "var(--fg-tertiary)",
  };

  const sectionCardTitleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <Layout>
      <SEO
        title={`${pageTitle} – Textversion`}
        description={pageDescription}
        path={handoutMeta.path}
      />
      <MedicalPageSchema
        title={`${pageTitle} – Textversion`}
        description={pageSummary}
        path={handoutMeta.path}
      />

      <EditorialLayout width="wide">
        <header className="pb-12 pt-12 md:pb-16 md:pt-16">
          <p
            className="text-xs uppercase"
            style={{
              color: "var(--accent-label)",
              letterSpacing: "var(--tracking-caps)",
              fontWeight: 500,
            }}
          >
            {pageKicker}
          </p>
          <p className="mt-4" style={metaStyle}>
            {pageTopicLabel} · {pageKind}
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
            {pageTitle}
          </h1>
          <p className="mt-6" style={leadStyle}>
            {pageSummary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="border-[color:var(--accent-primary)] bg-[color:var(--accent-primary)] text-[color:var(--bg-primary)] shadow-none hover:border-[color:var(--accent-primary-h)] hover:bg-[color:var(--accent-primary-h)] hover:text-[color:var(--bg-primary)]"
            >
              <a href={openHref} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                PDF öffnen
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={downloadHref} download="">
                <Download className="w-4 h-4" />
                PDF herunterladen
              </a>
            </Button>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
            style={bodyStyle}
          >
            <AppLink href={pageTopicHref} className="editorial-link">
              Zum Themenbereich {pageTopicLabel}
            </AppLink>
            <AppLink href="/materialien" className="editorial-link">
              Zur Materialsammlung
            </AppLink>
            <AppLink href="/barrierefreiheit" className="editorial-link">
              Warum diese Textversion hilfreich ist
            </AppLink>
          </div>

          {textVersionPreferred ? (
            <p
              className="mt-8 border-t pt-4"
              style={{
                ...bodyStyle,
                borderColor: "var(--rule-color)",
              }}
            >
              Diese Textversion ist die empfohlene Lesefassung. Das PDF bleibt
              als Druck- und Layoutversion verfügbar.
            </p>
          ) : null}

          <figure
            className="mt-10 border-t pt-5"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <img
              src={pagePreviewImageUrl}
              alt={`Vorschau des Handouts ${pageTitle}`}
              className="w-full h-auto border object-cover object-top"
              style={{ borderColor: "var(--rule-color)" }}
              loading="eager"
              width={720}
              height={900}
              decoding="async"
            />
            <figcaption className="mt-3" style={metaStyle}>
              Vorschau der Druckversion. Für ruhiges Lesen ist diese Textfassung
              gedacht.
            </figcaption>
          </figure>
        </header>

        <EditorialSectionBlock
          label="Überblick"
          title="Worum es in diesem Handout geht"
        >
          {handout ? (
            <EditorialProse>
              {handout.intro.map(text => (
                <p key={text}>{text}</p>
              ))}
            </EditorialProse>
          ) : (
            <div className="flex items-center gap-3" style={bodyStyle}>
              <Spinner className="size-5 text-[color:var(--accent-primary)]" />
              <p>Die ausführliche Textversion wird geladen.</p>
            </div>
          )}
        </EditorialSectionBlock>

        {handout ? (
          <>
            {handout.sections.map(section => (
              <EditorialSectionBlock
                key={section.title}
                title={section.title}
                rule
              >
                {section.intro ? (
                  <EditorialProse>
                    <p>{section.intro}</p>
                  </EditorialProse>
                ) : null}

                {section.calloutTitle && section.calloutText ? (
                  <div
                    className="mt-6 border-l pl-4"
                    style={{ borderColor: "var(--accent-label)" }}
                  >
                    <h3 style={sectionCardTitleStyle}>
                      {section.calloutTitle}
                    </h3>
                    <p className="mt-2" style={bodyStyle}>
                      {section.calloutText}
                    </p>
                  </div>
                ) : null}

                {section.cards?.length ? (
                  <div className={`mt-6 ${getCardGridClass(section.cards)}`}>
                    {section.cards.map(card => (
                      <article
                        key={`${section.title}-${card.title}`}
                        className="border-t pt-4"
                        style={{ borderColor: "var(--rule-color)" }}
                      >
                        <h3 style={sectionCardTitleStyle}>{card.title}</h3>
                        <p className="mt-2" style={bodyStyle}>
                          {card.text}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}

                {section.bullets?.length ? (
                  <ul className="mt-6 space-y-3 pl-5 list-disc marker:text-[color:var(--accent-label)]">
                    {section.bullets.map(item => (
                      <li key={item} style={bodyStyle}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </EditorialSectionBlock>
            ))}

            <EditorialSectionBlock label="Quelle & Stand" rule>
              <p style={bodyStyle}>{handout.sourceLine}</p>
              <p className="mt-2" style={bodyStyle}>
                {handout.standLine}
              </p>
            </EditorialSectionBlock>
          </>
        ) : (
          <EditorialSectionBlock title="Textversion lädt" rule>
            <div className="flex items-center gap-3" style={bodyStyle}>
              <Spinner className="size-5 text-[color:var(--accent-primary)]" />
              <p>Die Abschnitte dieser Textversion werden geladen.</p>
            </div>
          </EditorialSectionBlock>
        )}

        <RelatedLinksEditorial
          links={[
            {
              href: pageTopicHref,
              title: `${pageTopicLabel} vertiefen`,
              description:
                "Zur vertiefenden Themenseite mit Kontext, Einordnung und weiterführenden Hinweisen.",
            },
            {
              href: "/materialien",
              title: "Weitere Materialien",
              description:
                "Weitere Handouts, PDFs und lesbare Textversionen nach Themenbereich durchsuchen.",
            },
            {
              href: "/barrierefreiheit",
              title: "Barrierefreiheit & Lesbarkeit",
              description:
                "Einordnung zur Lesbarkeit, Nutzung mit Assistenztechnologien und Grenzen bildbasierter PDFs.",
            },
          ]}
        />
      </EditorialLayout>
    </Layout>
  );
}
