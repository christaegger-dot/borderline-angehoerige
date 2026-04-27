import InvitationSection from "@/components/InvitationSection";
import RelatedLinks from "@/components/RelatedLinks";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Heart,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import SelbstfuersorgeInfografikenSection from "@/sections/SelbstfuersorgeInfografikenSection";
import SelbstfuersorgeCheck from "@/components/interactive/SelbstfuersorgeCheck";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import { permissionList } from "@/content/selbstfuersorge-page";
import { SelbstfuersorgeExercisesSection } from "@/sections/SelbstfuersorgeExercisesSection";
import { SelbstfuersorgeSignalsSection } from "@/sections/SelbstfuersorgeSignalsSection";
import { SelbstfuersorgeRoleNotesSection } from "@/sections/SelbstfuersorgeRoleNotesSection";
import EvidenceNote from "@/components/EvidenceNote";

const selbstfuersorgeIntroCards = [
  {
    icon: Heart,
    title: "Belastung ernst nehmen",
    text: "Selbstfürsorge beginnt oft nicht mit mehr Disziplin, sondern mit ehrlicher Wahrnehmung von Erschöpfung und Druck.",
    iconClass: "text-terracotta-mid",
    shellClass: "bg-terracotta-wash border-terracotta-light/80",
  },
  {
    icon: Sparkles,
    title: "Früher gegensteuern",
    text: "Warnsignale, kurze Pausen und kleine Regulationsschritte helfen oft mehr als spätes Durchhalten bis zur Überlastung.",
    iconClass: "text-sage-mid",
    shellClass: "bg-sage-wash border-sage-light/80",
  },
  {
    icon: Users,
    title: "Nicht allein tragen",
    text: "Entlastung entsteht leichter, wenn Sie Verantwortung, Beratung und Rückhalt mitdenken statt alles selbst zu halten.",
    iconClass: "text-slate-blue",
    shellClass: "bg-slate-wash border-slate-light/80",
  },
] as const;

const selbstfuersorgeQuickLinks = [
  {
    id: "warnsignale",
    title: "Warnsignale für Überlastung",
    text: "Wenn Sie zuerst prüfen möchten, woran Sie eigene Grenzen früh erkennen können.",
  },
  {
    id: "sofort-uebungen",
    title: "Sofort-Übungen für akute Entlastung",
    text: "Wenn Sie gerade etwas Praktisches brauchen, das Körper und Kopf rasch etwas beruhigt.",
  },
  {
    id: "erlaubnis",
    title: "Geben Sie sich die Erlaubnis",
    text: "Wenn Sie mit Schuldgefühlen, Loyalitätsdruck oder einem schlechten Gewissen ringen.",
  },
  {
    id: "beratung-netzwerke",
    title: "Beratung & Netzwerke",
    text: "Wenn Sie gezielt nach externer Entlastung und Orientierung suchen.",
  },
] as const;

export default function Selbstfuersorge() {
  const openSection = (sectionId: string) => {
    window.dispatchEvent(
      new CustomEvent("open-section", { detail: { sectionId } })
    );
  };

  return (
    <Layout>
      <SEO
        title="Selbstfürsorge"
        description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen."
        path="/selbstfuersorge"
      />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-lighter/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="kicker text-sage-mid">
              Selbstfürsorge
              <span aria-hidden="true"> · </span>
              Lesezeit: 12 Minuten
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-4">
              Selbstfürsorge für <em>Angehörige</em>
            </h1>

            <hr className="rule rule-narrow mb-6" />

            <p className="lede">
              Wer dauerhaft mit Krisen und Loyalitätskonflikten lebt, braucht
              eigene Regeneration – nicht als Luxus, sondern als Grundlage.
            </p>

            <blockquote className="mt-6 border-l-2 border-sage-mid/40 pl-4 text-sm text-muted-foreground italic">
              «Viele Angehörige merken erst spät, wie erschöpft sie geworden
              sind. Selbstfürsorge beginnt damit, die eigene Belastung überhaupt
              ernst zu nehmen.»
            </blockquote>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-10 wave-divider-top">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.04fr_0.96fr]">
            <Card className="border-sage-light/70 bg-white/92 shadow-[0_28px_56px_-40px_rgba(94,120,99,0.32)]">
              <CardContent className="p-6 md:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-wash">
                    <Heart className="h-6 w-6 text-terracotta-mid" />
                  </div>
                  <div>
                    <span className="kicker text-sage-dark">Überblick</span>
                    <h2 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
                      Was auf dieser Seite besonders trägt
                    </h2>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Diese Seite versteht Selbstfürsorge nicht als Extra für gute
                  Tage, sondern als Schutzfaktor in einem dauerhaft fordernden
                  Angehörigenalltag. Im Zentrum stehen Warnsignale, kurze
                  Regulierung und die Erlaubnis, Ihre eigenen Grenzen ernst zu
                  nehmen.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {selbstfuersorgeIntroCards.map(item => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className={`rounded-2xl border p-4 ${item.shellClass}`}
                      >
                        <Icon className={`mb-3 h-5 w-5 ${item.iconClass}`} />
                        <h3 className="mb-2 text-sm font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-cream/95 shadow-[0_28px_56px_-40px_rgba(15,23,42,0.26)]">
              <CardContent className="p-6 md:p-7">
                <span className="kicker text-slate-dark">
                  Direkt einsteigen
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Wenn Sie nicht alles am Stück lesen möchten, springen Sie
                  direkt zu dem Baustein, der im Moment am meisten entlastet.
                </p>

                <div className="mt-5 space-y-3">
                  {selbstfuersorgeQuickLinks.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openSection(item.id)}
                      className="group w-full rounded-2xl border border-border/60 bg-white/90 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-sage-light hover:bg-sage-wash/45 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/35 focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-wash text-sage-darker transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-sage-light/60 bg-sage-wash/75 px-4 py-4">
                  <p className="text-sm leading-relaxed text-sage-darker">
                    Das Inhaltsverzeichnis bleibt die Langform-Navigation. Die
                    schnellen Einstiege hier sind für Momente gedacht, in denen
                    Sie sofort zu Warnsignalen, Übungen oder Entlastung springen
                    möchten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aufklappbare Abschnitte */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* ═══ 1. Warum Selbstfürsorge wichtig ist ═══ */}
            <ContentSection
              title="Warum Selbstfürsorge so wichtig ist"
              icon={<Heart className="w-6 h-6 text-terracotta-mid" />}
              id="selbstfuersorge-warum-wichtig"
              defaultOpen={true}
              preview="Angehörige tragen eine besondere Last. Selbstfürsorge ist keine Selbstsucht, sondern Selbsterhaltung."
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Angehörige von Menschen mit Borderline tragen oft eine
                  besondere Last. Die emotionale Intensität, die
                  Unvorhersehbarkeit und die dauernde innere Wachsamkeit können
                  zu chronischem Stress führen. Nicht jeder entwickelt daraus
                  eine psychische Erkrankung, aber viele geraten über längere
                  Zeit an Grenzen. Studien zeigen ein erhöhtes Risiko für:
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Erschöpfungsdepression",
                    "Angststörungen",
                    "Schlafstörungen",
                    "Körperliche Beschwerden",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-terracotta-mid" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed prose-editorial">
                  Selbstfürsorge ist daher keine Selbstsucht, sondern{" "}
                  <strong className="text-foreground">Selbsterhaltung</strong>.
                  Sie erhöht die Chance, dass Sie auf Dauer präsent bleiben
                  können, statt sich Schritt für Schritt zu erschöpfen.
                </p>
              </div>
            </ContentSection>

            {/* ═══ 2. Warnsignale für Überlastung ═══ */}
            <SelbstfuersorgeSignalsSection />

            {/* ═══ Selbstfürsorge-Kurzcheck ═══ */}
            <div className="my-6">
              <SelbstfuersorgeCheck />
            </div>

            <SelbstfuersorgeExercisesSection />

            {/* ═══ 5. Beratung & Netzwerke (Kurzhinweis) ═══ */}
            <ContentSection
              title="Beratung & Netzwerke"
              icon={<Users className="w-6 h-6 text-slate-blue" />}
              id="beratung-netzwerke"
              preview="Sie müssen das nicht allein tragen – professionelle Beratung und Austausch mit anderen Angehörigen helfen."
            >
              <Card className="bg-slate-light/20 border-slate-blue">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Austausch mit anderen Angehörigen kann enorm entlastend
                    sein. Professionelle Beratungsstellen und Selbsthilfegruppen
                    bieten Orientierung, praktische Tipps und das Gefühl, nicht
                    allein zu sein.
                  </p>
                  <Link href="/beratung">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-blue hover:text-slate-dark transition-colors cursor-pointer">
                      Alle Beratungsangebote & Netzwerke ansehen
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 6. Radikale Akzeptanz ═══ */}
            <ContentSection
              title="Radikale Akzeptanz"
              icon={<Sparkles className="w-6 h-6 text-sage-mid" />}
              id="radikale-akzeptanz"
              preview="«Es ist, wie es ist.» – Dieses DBT-Konzept kann auch für Angehörige befreiend sein."
            >
              <blockquote className="pull-quote mb-6">
                <p>«Es ist, wie es ist.»</p>
                <cite>– Dieser Satz kann befreiend sein.</cite>
              </blockquote>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Radikale Akzeptanz bedeutet nicht, dass Sie die Situation
                gutheissen. Es bedeutet, dass Sie aufhören, gegen die Realität
                zu kämpfen. Dieses Konzept aus der{" "}
                <Link
                  to="/glossar?q=DBT"
                  className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors"
                >
                  DBT (Dialektisch-Behaviorale Therapie)
                </Link>{" "}
                kann auch für Angehörige sehr hilfreich sein.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ❌ Was radikale Akzeptanz NICHT ist:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Aufgeben</li>
                    <li>• Gutheissen</li>
                    <li>• Passivität</li>
                    <li>• Resignation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                  <span className="text-lg font-medium text-foreground block mb-2">
                    ✓ Was radikale Akzeptanz IST:
                  </span>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Anerkennen, was Sie nicht ändern können</li>
                    <li>
                      • Energie sparen für das, was Sie beeinflussen können
                    </li>
                    <li>• Inneren Frieden finden trotz äusserer Turbulenzen</li>
                    <li>• Loslassen von «Es sollte anders sein»</li>
                  </ul>
                </div>
              </div>

              <Card className="border-l-4 border-l-sage-mid">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">
                    Übung: Radikale Akzeptanz praktizieren
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>
                      <strong>1.</strong> Benennen Sie die Situation: «Es ist
                      so, dass...»
                    </li>
                    <li>
                      <strong>2.</strong> Spüren Sie den Widerstand: «Ich
                      wünschte, es wäre anders.»
                    </li>
                    <li>
                      <strong>3.</strong> Lassen Sie los: «Ich kann diese
                      Realität nicht ändern.»
                    </li>
                    <li>
                      <strong>4.</strong> Richten Sie den Fokus neu: «Was kann
                      ich jetzt tun?»
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <EvidenceNote
                title="Quelle zur Radikalen Akzeptanz"
                definition="Das Konzept der Radikalen Akzeptanz ist ein zentrales Element der Dialektisch-Behavioralen Therapie (DBT). Es beschreibt eine Haltung, keine Kapitulation."
                reviewDate="26.04.2026"
                sources={[
                  {
                    label:
                      "Linehan, DBT Skills Training Manual, 2. Aufl. (2015)",
                    type: "wissenschaft",
                  },
                ]}
                className="mt-4"
              />
            </ContentSection>

            {/* ═══ 7. Erlaubnis geben ═══ */}
            <ContentSection
              title="Geben Sie sich die Erlaubnis"
              icon={<CheckCircle2 className="w-6 h-6 text-terracotta" />}
              id="erlaubnis"
              preview="Als Angehöriger dürfen Sie auch mal wütend sein, Nein sagen und Ihre eigenen Bedürfnisse ernst nehmen."
            >
              <Card className="bg-terracotta-light/20 border-terracotta">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Als Angehöriger dürfen Sie:
                  </p>
                  <ul className="space-y-3">
                    {permissionList.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ContentSection>

            {/* ═══ 8. Materialien zum Download ═══ */}
            <SelbstfuersorgeInfografikenSection />

            {/* ═══ 9. Hinweise für Ihre Situation ═══ */}
            <SelbstfuersorgeRoleNotesSection />

            {/* Evidenz-Layer (bleibt ausserhalb der Akkordeons) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    Worauf stützt sich das?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    Die Hinweise auf dieser Seite verbinden Forschung zu
                    Belastung und Regeneration mit klinischer Erfahrung aus der
                    Angehörigenarbeit.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • Angehörige von Menschen mit BPS berichten in Studien
                      häufig von erhöhter Belastung und Erschöpfung (u. a.
                      Hoffman et al., 2005)
                    </li>
                    <li>
                      • Atemübungen und andere kurze Regulationsübungen können
                      helfen, akute Anspannung im Körper zu senken (u. a.
                      Zaccaro et al., 2018)
                    </li>
                    <li>
                      • Soziale Unterstützung gilt als wichtiger Schutzfaktor
                      gegen Überlastung und Erschöpfung (u. a. Maslach & Leiter,
                      2016)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Abschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top [--wave-color:var(--background)]"
            >
              <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-light/30 border-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-sage-mid mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie sind wichtig. Ihre Gesundheit und Ihr Wohlbefinden sind
                    wichtig. Indem Sie gut für sich sorgen, sorgen Sie auch
                    besser für andere. Selbstfürsorge ist keine Selbstsucht –
                    sie ist die Grundlage dafür, langfristig für Ihren
                    Angehörigen da sein zu können.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Button asChild variant="ghost">
                <Link href="/grenzen">← Grenzen setzen</Link>
              </Button>
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-mid text-white"
              >
                <Link href="/materialien">
                  Alle Materialien
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <RelatedLinks
            links={[
              {
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Infografiken und Spickzettel zur Selbstfürsorge und Belastung – als PDF.",
                icon: BookOpen,
              },
              {
                href: "/beratung",
                title: "Beratung & Netzwerke",
                description:
                  "Professionelle Unterstützung und Selbsthilfegruppen für Angehörige.",
                icon: Heart,
              },
              {
                href: "/grenzen",
                title: "Grenzen setzen",
                description:
                  "Selbstfürsorge beginnt oft mit klaren Grenzen: Warnsignale, Priorisierung und Konsequenz.",
                icon: Shield,
              },
            ]}
          />
        </div>
      </div>
      <InvitationSection />
    </Layout>
  );
}
