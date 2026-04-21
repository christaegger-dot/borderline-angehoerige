import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema } from "@/components/SEO";
import { getHandoutDownloadHref, getHandoutOpenHref } from "@/content/handouts";
import { getHandoutTextVersion } from "@/content/handoutTextVersions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NotFound from "@/pages/NotFound";
import type { RouteComponentProps } from "wouter";
import { Link } from "wouter";
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

export default function HandoutTextPage({
  params,
}: RouteComponentProps<HandoutTextPageParams>) {
  const handout = getHandoutTextVersion(params?.handoutId);

  if (!handout) {
    return <NotFound />;
  }

  const openHref =
    getHandoutOpenHref(handout.pdfSourceUrl) ?? handout.pdfSourceUrl;
  const downloadHref =
    getHandoutDownloadHref(handout.pdfSourceUrl) ?? handout.pdfSourceUrl;

  return (
    <Layout>
      <SEO
        title={`${handout.title} – Textversion`}
        description={`${handout.description} Diese Seite bietet eine lesbare Textversion des Handouts.`}
        path={handout.path}
      />
      <MedicalPageSchema
        title={`${handout.title} – Textversion`}
        description={handout.summary}
        path={handout.path}
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-sage-wash/50 via-background to-background">
        <div className="container">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.25fr_0.95fr] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-sage-dark px-4 py-1.5 text-sm font-medium text-white">
                  {handout.kicker}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-sm text-muted-foreground">
                  <Library className="w-4 h-4 text-sage-dark" />
                  {handout.topicLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/90 px-4 py-1.5 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-sage-dark" />
                  {handout.kind}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-5">
                {handout.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                {handout.summary}
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
                  <Link href="/materialien">
                    <ArrowLeft className="w-4 h-4" />
                    Zur Materialsammlung
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <Link
                  href={handout.topicHref}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-sage-dark" />
                  Zum Themenbereich {handout.topicLabel}
                </Link>
                <Link
                  href="/barrierefreiheit"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <FileText className="w-4 h-4 text-sage-dark" />
                  Warum diese Textversion hilfreich ist
                </Link>
              </div>
            </div>

            <Card className="overflow-hidden border-border/60 bg-white/90 shadow-sm">
              <img
                src={handout.previewImageUrl}
                alt={`Vorschau des Handouts ${handout.title}`}
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
                  Lesbare Web-Version statt bildbasiertem PDF
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {handout.intro.map(text => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto grid gap-6">
            {handout.sections.map(section => (
              <Card key={section.title} className="border-border/60 shadow-sm">
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
                    <div className="grid gap-4 md:grid-cols-3">
                      {section.cards.map(card => (
                        <div
                          key={`${section.title}-${card.title}`}
                          className="rounded-xl border border-border/60 bg-background p-5"
                        >
                          <h3 className="font-semibold text-foreground mb-2">
                            {card.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
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
                          className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-muted-foreground"
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
