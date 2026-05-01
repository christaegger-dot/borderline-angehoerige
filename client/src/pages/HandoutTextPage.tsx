import { useEffect, useState } from "react";
import AppLink from "@/components/AppLink";
import Layout from "@/components/Layout";
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
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import NotFound from "@/pages/NotFound";
import type { RouteComponentProps } from "wouter";
import {
  ArrowLeft,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Library,
} from "lucide-react";

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

      <section className="py-12 md:py-16 bg-gradient-to-b from-sage-wash/50 via-background to-background">
        <div className="container">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.25fr_0.95fr] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-sage-dark px-4 py-1.5 text-sm font-medium text-white">
                  {handout?.kicker ?? "Textversion"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-sm text-muted-foreground">
                  <Library className="w-4 h-4 text-sage-dark" />
                  {pageTopicLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-sage-dark" />
                  {pageKind}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight mb-5">
                {pageTitle}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                {pageSummary}
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <Button
                  asChild
                  className="bg-sage-dark hover:bg-sage-mid text-white"
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
                <Button asChild variant="outline">
                  <AppLink href="/materialien">
                    <ArrowLeft className="w-4 h-4" />
                    Zur Materialsammlung
                  </AppLink>
                </Button>
              </div>

              {textVersionPreferred ? (
                <p className="mb-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  Diese Textversion ist die empfohlene Lesefassung. Das PDF
                  bleibt als Druck- und Layoutversion verfügbar.
                </p>
              ) : null}

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <AppLink
                  href={pageTopicHref}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-sage-dark" />
                  Zum Themenbereich {pageTopicLabel}
                </AppLink>
                <AppLink
                  href="/barrierefreiheit"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <FileText className="w-4 h-4 text-sage-dark" />
                  Warum diese Textversion hilfreich ist
                </AppLink>
              </div>
            </div>

            <Card className="overflow-hidden border-border/60 bg-white/90 shadow-sm">
              <img
                src={pagePreviewImageUrl}
                alt={`Vorschau des Handouts ${pageTitle}`}
                className="w-full h-auto object-cover object-top"
                loading="eager"
                width={720}
                height={900}
                decoding="async"
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Card className="border-sage-light bg-sage-wash/70">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Worum es in diesem Handout geht
                </h2>
                {handout ? (
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    {handout.intro.map(text => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Spinner className="size-5 text-sage-dark" />
                    <p>Die ausführliche Textversion wird geladen.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto grid gap-6">
            {handout ? (
              <>
                {handout.sections.map(section => (
                  <Card
                    key={section.title}
                    className="border-border/60 shadow-sm"
                  >
                    <CardContent className="p-6 md:p-7">
                      <h2 className="text-2xl font-semibold text-foreground mb-3">
                        {section.title}
                      </h2>

                      {section.intro ? (
                        <p className="text-muted-foreground leading-relaxed mb-5">
                          {section.intro}
                        </p>
                      ) : null}

                      {section.calloutTitle && section.calloutText ? (
                        <div className="rounded-xl border border-sage-light/80 bg-sage-wash/50 p-5 mb-5">
                          <h3 className="font-semibold text-foreground mb-2">
                            {section.calloutTitle}
                          </h3>
                          <p className="text-base leading-relaxed text-foreground">
                            {section.calloutText}
                          </p>
                        </div>
                      ) : null}

                      {section.cards?.length ? (
                        <div className={getCardGridClass(section.cards)}>
                          {section.cards.map(card => (
                            <div
                              key={`${section.title}-${card.title}`}
                              className="rounded-xl border border-border/60 bg-background p-5"
                            >
                              <h3 className="font-semibold text-foreground mb-2">
                                {card.title}
                              </h3>
                              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                                {card.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {section.bullets?.length ? (
                        <ul className="grid gap-3">
                          {section.bullets.map(item => (
                            <li
                              key={item}
                              className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm md:text-base text-muted-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-border/60 bg-muted/20">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      {handout.sourceLine}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {handout.standLine}
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-border/60 bg-muted/20">
                <CardContent className="p-6 flex items-center gap-3 text-muted-foreground">
                  <Spinner className="size-5 text-sage-dark" />
                  <p>Die Abschnitte dieser Textversion werden geladen.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
