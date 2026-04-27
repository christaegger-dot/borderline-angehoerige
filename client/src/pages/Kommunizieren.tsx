import InvitationSection from "@/components/InvitationSection";
import RelatedLinks from "@/components/RelatedLinks";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Lightbulb,
  MessageCircle,
  Shield,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import ValidierungsStufenleiter from "@/components/interactive/ValidierungsStufenleiter";
import KommunizierenMaterialsSection from "@/sections/KommunizierenMaterialsSection";
import {
  KommunizierenEscalationSection,
  KommunizierenRolesSection,
  KommunizierenSituationsSection,
} from "@/sections/KommunizierenPatternSections";

const kommunizierenIntroCards = [
  {
    icon: MessageCircle,
    title: "Haltung vor Technik",
    text: "Hilfreiche Kommunikation beginnt meist mit Tempo, Präsenz und innerer Klarheit, nicht mit dem perfekten Satz.",
    iconClass: "text-slate-blue",
    shellClass: "bg-slate-wash border-slate-light/80",
  },
  {
    icon: Heart,
    title: "Validierung zuerst",
    text: "Erleben ernst nehmen, ohne automatisch zuzustimmen. Genau das senkt oft den Druck für spätere Klärung.",
    iconClass: "text-terracotta-mid",
    shellClass: "bg-terracotta-wash border-terracotta-light/80",
  },
  {
    icon: ShieldAlert,
    title: "Bei Eskalation vereinfachen",
    text: "Weniger Inhalt, weniger Verteidigung, klarere Grenzen: so bleibt Gespräch eher regulierbar.",
    iconClass: "text-sand-warm",
    shellClass: "bg-sand-muted border-sand-border/80",
  },
] as const;

const kommunizierenQuickLinks = [
  {
    id: "haltung",
    title: "Kommunikation beginnt nicht mit Technik",
    text: "Wenn Sie zuerst Ihre Grundhaltung und den Gesprächsrahmen klären möchten.",
  },
  {
    id: "validierung",
    title: "Validierung: der wichtigste Ausgangspunkt",
    text: "Wenn Sie einen belastbaren Einstieg in schwierigere Gespräche suchen.",
  },
  {
    id: "eskalation",
    title: "Wenn Gespräche kippen",
    text: "Wenn Sie gerade vor allem Orientierung für eskalierende Momente brauchen.",
  },
  {
    id: "situationen",
    title: "Typische schwierige Situationen",
    text: "Wenn Sie konkrete Kommunikationsmuster im Alltag besser lesen möchten.",
  },
] as const;

export default function Kommunizieren() {
  const openSection = (sectionId: string) => {
    window.dispatchEvent(
      new CustomEvent("open-section", { detail: { sectionId } })
    );
  };

  return (
    <Layout>
      <SEO
        title="Kommunizieren"
        description="Kommunikation für Angehörige: Validierung, Timing, Deeskalation und klare Sprache in belasteten Gesprächen."
        path="/kommunizieren"
      />
      <TableOfContents />

      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="kicker text-slate-blue">
              Kommunizieren
              <span aria-hidden="true"> · </span>
              Lesezeit: 14 Minuten
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-4">
              Gespräche in <em>belasteten Beziehungen</em>
            </h1>

            <hr className="rule rule-narrow mb-6" />

            <p className="lede">
              Kommunikation löst keine Grunddynamik – sie kann aber Eskalation
              bremsen und Ihre eigene Position klärer machen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-10 wave-divider-top">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <Card className="border-slate-light/75 bg-white/92 shadow-[0_28px_56px_-40px_rgba(82,109,158,0.35)]">
              <CardContent className="p-6 md:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-wash">
                    <MessageCircle className="h-6 w-6 text-slate-blue" />
                  </div>
                  <div>
                    <span className="kicker text-slate-dark">Überblick</span>
                    <h2 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
                      Was auf dieser Seite besonders wichtig ist
                    </h2>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Diese Seite ordnet Kommunikation nicht als Sammlung kluger
                  Formulierungen, sondern als Beziehungsregulation unter
                  Belastung ein. Relevant sind vor allem Timing, Validierung,
                  Begrenzung und die Frage, ob überhaupt schon Gesprächsraum da
                  ist.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {kommunizierenIntroCards.map(item => {
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

            <Card className="border-border/60 bg-cream/95 shadow-[0_28px_56px_-40px_rgba(15,23,42,0.28)]">
              <CardContent className="p-6 md:p-7">
                <span className="kicker text-slate-dark">
                  Direkt einsteigen
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Wenn Sie nicht alles am Stück lesen möchten, springen Sie
                  direkt zum Kommunikationsblock, der Ihre aktuelle Lage am
                  ehesten trifft.
                </p>

                <div className="mt-5 space-y-3">
                  {kommunizierenQuickLinks.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openSection(item.id)}
                      className="group w-full rounded-2xl border border-border/60 bg-white/90 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-slate-light hover:bg-slate-wash/45 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-dark/35 focus-visible:ring-offset-2"
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
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-wash text-slate-dark transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-light/70 bg-slate-wash/80 px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-dark">
                    Das Inhaltsverzeichnis bleibt die Langform-Navigation. Die
                    schnellen Einstiege hier sind für Momente gedacht, in denen
                    Sie sofort zu Haltung, Validierung oder Deeskalation
                    springen möchten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ContentSection
              title="Kommunikation beginnt nicht mit Technik"
              icon={<MessageCircle className="w-7 h-7 text-slate-blue" />}
              id="haltung"
              defaultOpen={true}
              preview="Viele Gespräche scheitern nicht nur am Wortlaut, sondern daran, dass beide Seiten bereits im Alarmzustand, in Rechtfertigung oder in Kränkung sprechen."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed prose-editorial">
                  In belasteten Beziehungen kippt Kommunikation oft schnell in
                  Verteidigung, Beschuldigung, Rückzug oder Übererklärung. Dann
                  ist die Frage nicht nur, welcher Satz "richtig" wäre, sondern
                  ob überhaupt schon ein Moment für Gespräch da ist.
                </p>
                <blockquote className="pull-quote">
                  <p>
                    Hilfreiche Kommunikation ist meist kürzer, langsamer und
                    klarer. Sie versucht nicht sofort zu überzeugen, sondern
                    zuerst Beziehungsspannung etwas zu senken.
                  </p>
                </blockquote>
              </div>
            </ContentSection>

            <ContentSection
              title="Validierung: der wichtigste Ausgangspunkt"
              icon={<Heart className="w-7 h-7 text-terracotta" />}
              id="validierung"
              preview="Validierung heisst nicht zustimmen. Sie signalisiert: Ich nehme dein Erleben ernst, auch wenn ich nicht jede Sichtweise teile."
            >
              <div className="space-y-4">
                <Card className="bg-terracotta-light/10 border-terracotta">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg mb-3">
                      <strong>Validierung</strong> bedeutet, dass Sie das
                      Erleben Ihres Gegenübers als nachvollziehbar behandeln,
                      ohne jeden Vorwurf, jede Interpretation oder jedes
                      Verhalten zu bestätigen.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      In Beziehungen mit Borderline ist das oft deshalb so
                      wichtig, weil Nichtgesehenwerden, Kränkung oder Unklarheit
                      rasch zusätzlichen Druck erzeugen. Validierung kann diesen
                      Druck etwas senken und den Boden für spätere Klärung
                      bereiten.
                    </p>
                  </CardContent>
                </Card>

                <ValidierungsStufenleiter />

                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground font-medium text-sm">
                      Ein hilfreicher innerer Satz für Angehörige: Ich muss
                      nicht recht bekommen, um zuerst zu zeigen, dass ich den
                      Schmerz wahrnehme.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Timing ist oft wichtiger als der perfekte Satz"
              icon={<Lightbulb className="w-7 h-7 text-sand-mid" />}
              id="timing"
              preview="Viele Gespräche scheitern daran, dass Inhalte zu früh geklärt werden sollen, während Anspannung, Scham oder Wut noch den ganzen Raum füllen."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher jetzt
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>kurz spiegeln, was Sie wahrnehmen</li>
                      <li>Ton und Tempo beruhigen</li>
                      <li>klare Begrenzung bei Beschimpfung oder Druck</li>
                      <li>vorschlagen, später weiterzureden</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      Eher später
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Fakten prüfen und Missverständnisse sortieren</li>
                      <li>Konsequenzen besprechen</li>
                      <li>grössere Beziehungsfragen klären</li>
                      <li>lange Erklärungen oder Rechtfertigungen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <KommunizierenEscalationSection />

            <KommunizierenSituationsSection />

            <KommunizierenRolesSection />

            <KommunizierenMaterialsSection />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              <Button asChild variant="ghost">
                <Link href="/unterstuetzen/uebersicht">← Unterstützen</Link>
              </Button>
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-mid text-white"
              >
                <Link href="/grenzen">
                  Weiter: Grenzen setzen
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
                href: "/grenzen",
                title: "Grenzen setzen",
                description:
                  "Wie Sie klare, tragfähige Grenzen formulieren und auch einhalten können.",
                icon: Shield,
              },
              {
                href: "/materialien",
                title: "Materialien & Handouts",
                description:
                  "Infografiken und Spickzettel zur Kommunikation – als PDF zum Mitnehmen.",
                icon: BookOpen,
              },
              {
                href: "/selbstfuersorge",
                title: "Selbstfürsorge",
                description:
                  "Warnsignale, Sofort-Übungen und die Erlaubnis, die eigene Belastung ernst zu nehmen.",
                icon: Sparkles,
              },
            ]}
          />
        </div>
      </div>
      <InvitationSection />
    </Layout>
  );
}
