import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedStat from "@/components/AnimatedStat";
import Erfahrungsberichte from "@/components/Erfahrungsberichte";
import InvitationSection from "@/components/InvitationSection";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  MessageCircle,
  MessageSquare,
  Phone,
  Shield,
  Sparkles,
} from "@/icons/root-icons";

const interactiveTools = [
  {
    href: "/selbsttest",
    icon: ClipboardCheck,
    label: "Selbsttest",
    text: "Belastung einschätzen",
  },
  {
    href: "/wegweiser",
    icon: Compass,
    label: "Wegweiser",
    text: "Passende Hilfe finden",
  },
  {
    href: "/notfallkarte",
    icon: FileText,
    label: "Notfallkarte",
    text: "Persönlicher Krisenplan",
  },
  {
    href: "/uebungen",
    icon: MessageSquare,
    label: "Übungen",
    text: "Gesprächstechniken üben",
  },
  {
    href: "/materialien",
    icon: Download,
    label: "Materialien",
    text: "Handouts & PDFs",
  },
];

const situationPaths = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Ich versuche zu verstehen, was passiert",
    text: "Wenn Nähe, Eskalation, Rückzug oder Widersprüche schwer einzuordnen sind.",
    accentBorderClass: "border-l-sage-dark",
    accentTextClass: "text-sage-dark",
    iconBgClass: "bg-sage-wash",
  },
  {
    href: "/soforthilfe",
    icon: AlertTriangle,
    title: "Es kippt gerade oder eskaliert",
    text: "Wenn starke Anspannung, Konflikte oder Krisensignale im Vordergrund stehen.",
    accentBorderClass: "border-l-alert",
    accentTextClass: "text-alert",
    iconBgClass: "bg-alert-wash",
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Gespräche werden schwierig",
    text: "Wenn Worte verletzen, Vorwürfe dominieren oder alles sofort hochgeht.",
    accentBorderClass: "border-l-slate-blue",
    accentTextClass: "text-slate-blue",
    iconBgClass: "bg-slate-wash",
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Ich bin selbst erschöpft",
    text: "Wenn Anspannung, Schuld, Rückzug oder innere Überforderung zu gross werden.",
    accentBorderClass: "border-l-sage-mid",
    accentTextClass: "text-sage-mid",
    iconBgClass: "bg-sage-wash",
  },
];

const approachHighlights = [
  {
    icon: BookOpen,
    title: "Verstehen statt rätseln",
    text: "Borderline differenziert aus Sicht von Angehörigen einordnen.",
  },
  {
    icon: MessageCircle,
    title: "Muster benennen",
    text: "Eskalation, Rückzug und schwierige Gespräche besser lesen.",
  },
  {
    icon: Shield,
    title: "Grenzen schützen",
    text: "Unterstützung und Selbstschutz gemeinsam denken.",
  },
  {
    icon: Compass,
    title: "Nächste Schritte finden",
    text: "Materialien, Beratung und praktische Werkzeuge schnell öffnen.",
  },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und transparent eingeordnet."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster."
        path="/"
      />

      <section className="home-hero-surface relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-sage-mid blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-56 h-56 rounded-full bg-sand-accent blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-sage-dark blur-3xl" />
        </div>

        <div className="container relative z-10 py-20 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/60 mb-5">
              Fachstelle Angehörigenarbeit
              <span aria-hidden="true"> · </span>
              Psychiatrische Universitätsklinik Zürich
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.12] tracking-tight mb-4">
              Wenn jemand, den Sie lieben, eine{" "}
              <em className="text-sage-light not-italic">
                Borderline-Persönlichkeitsstörung
              </em>{" "}
              hat
            </h1>

            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl font-light italic">
              Eine Begleitung für Partnerinnen, Eltern, Geschwister und
              erwachsene Kinder – die dabei oft vergessen werden.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                size="lg"
                className="bg-sage-dark hover:bg-sage-mid text-white w-full sm:w-auto"
                asChild
              >
                <Link href="/wegweiser">
                  Wo soll ich anfangen?
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 w-full sm:w-auto"
                asChild
              >
                <Link href="/verstehen">
                  Direkt zu «Verstehen»
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </Link>
              </Button>
            </div>

            <Link
              href="/soforthilfe"
              className="inline-flex items-center gap-3 text-white/90 hover:text-white font-medium transition-colors group text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Akute Krise? Soforthilfe</span>
              </span>
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/20 bg-white/8 transition-all group-hover:translate-x-0.5 group-hover:bg-white/14">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-5 bg-gradient-to-r from-navy via-navy to-navy-light/30 text-white border-b border-navy-light/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/90" />
              </div>
              <p className="font-semibold text-white text-sm sm:text-base">
                Ein Angebot der Fachstelle Angehörigenarbeit (PUK Zürich)
              </p>
            </div>
            <p className="text-white/90 text-sm flex-1">
              Fachlich fundierte Orientierung, Beratung und Materialien für
              Angehörige.
            </p>
            <Link
              href="/fachstelle"
              className="inline-flex items-center gap-2.5 text-sage-light hover:text-white text-sm font-medium transition-colors group flex-shrink-0"
            >
              <span>Angebot & Kontakt</span>
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/12 bg-white/8 transition-all group-hover:translate-x-0.5 group-hover:bg-white/14">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      <section className="py-10 md:py-12 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="kicker text-sage-dark">Orientierung</span>
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
                Was ist gerade Ihre Lage?
              </h2>
              <p className="text-muted-foreground prose-editorial">
                Beginnen Sie dort, wo der Druck im Moment am grössten ist. Die
                Website ist nicht nur zum Lesen gedacht, sondern als
                Orientierung in belasteten Beziehungssituationen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {situationPaths.map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Card
                      className={`group h-full cursor-pointer bg-white border border-border rounded-xl border-l-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${item.accentBorderClass}`}
                    >
                      <CardContent className="p-5 flex gap-4 items-start">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBgClass}`}
                        >
                          <Icon
                            className={`w-[18px] h-[18px] ${item.accentTextClass}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.text}
                          </p>
                          <span
                            className={`text-xs font-semibold inline-flex items-center gap-2 ${item.accentTextClass}`}
                          >
                            <span>Zum passenden Bereich</span>
                            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-current/10 transition-all group-hover:translate-x-0.5">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href="/selbsttest">
                  <Compass className="w-4 h-4" />
                  Oder den kurzen Selbsttest nutzen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      <section className="relative overflow-hidden py-12 md:py-16 bg-cream">
        <div className="container">
          <div className="max-w-6xl mx-auto lg:-mx-6 xl:-mx-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-navy-light/20 bg-navy text-white shadow-[0_35px_120px_-60px_rgba(16,33,51,0.9)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-sage-mid/18 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sand-accent/15 blur-3xl" />
                <div className="absolute inset-y-0 left-[47%] w-px bg-white/8 hidden lg:block" />
              </div>

              <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-8 md:p-10 lg:p-12">
                  <span className="kicker text-sage-light/90">
                    Unser Ansatz
                  </span>

                  <h2 className="text-3xl md:text-4xl font-normal leading-tight mb-5">
                    Was diese Website besonders abdeckt
                  </h2>

                  <p className="text-white/82 leading-relaxed max-w-xl mb-8">
                    Nicht nur Symptome, sondern Beziehungsgeschehen,
                    Überforderung und alltagstaugliche nächste Schritte. Die
                    Website ist für Situationen gebaut, in denen Angehörige
                    Orientierung brauchen, bevor wieder Ruhe möglich wird.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                      <p className="kicker text-sage-light/80">Fokus</p>
                      <p className="text-sm text-white/88">
                        Verstehen, kommunizieren, Grenzen, Selbstfürsorge und
                        Soforthilfe in einer Linie gedacht.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                      <p className="kicker text-sage-light/80">Einstieg</p>
                      <p className="text-sm text-white/88">
                        Sie starten dort, wo der Druck gerade am grössten ist,
                        statt sich durch ein Archiv zu arbeiten.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/verstehen"
                    className="inline-flex items-center gap-3 text-white font-medium text-sm group transition-colors"
                  >
                    <span>Mehr über Borderline erfahren</span>
                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/10 border border-white/10 transition-all group-hover:translate-x-0.5 group-hover:bg-white/16">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                <div className="bg-white/96 text-foreground p-6 md:p-8 lg:p-10 border-t border-white/10 lg:border-t-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {approachHighlights.map(item => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-border/60 bg-white px-5 py-5 shadow-sm"
                        >
                          <div className="w-11 h-11 rounded-xl bg-sage-wash flex items-center justify-center mb-4">
                            <Icon className="w-5 h-5 text-sage-dark" />
                          </div>
                          <h3 className="text-base font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border border-sage-light/70 bg-sage-wash/70 px-5 py-5">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Nicht alles auf einmal.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Die Seite ist so gebaut, dass Sie von einer konkreten Lage
                      aus weitergehen können: erst Orientierung, dann passende
                      Materialien oder der nächste handhabbare Schritt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      <section className="py-10 md:py-14 bg-sage-wash/40">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div>
              <div className="text-center mb-8">
                <span className="kicker text-sage-dark">Werkzeuge</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Praktische Hilfen für Ihren Alltag
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {interactiveTools.map(tool => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.href} href={tool.href}>
                      <div className="group flex h-full flex-col items-center text-center p-4 md:p-5 rounded-xl bg-white border border-border/40 hover:border-sage-mid/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-sage-wash flex items-center justify-center mb-3 group-hover:bg-sage-light/50 transition-colors">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-sage-dark" />
                        </div>
                        <span className="text-sm font-semibold text-foreground mb-0.5">
                          {tool.label}
                        </span>
                        <span className="text-xs text-muted-foreground leading-snug">
                          {tool.text}
                        </span>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sage-dark">
                          <span>Direkt öffnen</span>
                          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-sage-wash transition-all group-hover:translate-x-0.5 group-hover:bg-sage-light/50">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/materialien"
                  className="inline-flex items-center gap-2.5 text-sage-dark hover:text-sage-darker font-medium text-sm group transition-colors"
                >
                  Alle Materialien entdecken
                  <span className="w-7 h-7 rounded-full bg-white group-hover:bg-sage-light/30 flex items-center justify-center transition-colors shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      <section className="py-12 md:py-16 bg-sage-wash/50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="kicker text-sage-dark">Forschung & Praxis</span>
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
                Was Forschung und Praxis zeigen
              </h2>
              <p className="text-muted-foreground prose-editorial mx-auto text-sm">
                Borderline-Verläufe sind heterogen – aber die Datenlage ist
                deutlich hoffnungsvoller, als viele Angehörige erwarten.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedStat
                end={93}
                suffix="%"
                label="erreichen innerhalb von 10 Jahren eine symptomatische Remission"
                delay={0}
              />
              <AnimatedStat
                end={50}
                suffix="%"
                label="erreichen eine vollständige Genesung (Recovery)"
                delay={0.15}
              />
              <AnimatedStat
                end={10}
                suffix=" J."
                label="typischer Horizont für nachhaltige Verbesserung"
                delay={0.3}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Quellen: Zanarini et al. (2006, 2012), Paris & Zweig-Frank (2001).{" "}
              <Link
                href="/quellen"
                className="underline hover:text-foreground transition-colors"
              >
                Alle Quellen ansehen
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      {/* Story-Sektion: anonymisierte Erfahrungsgeschichte als Fliesstext */}
      <section className="py-14 md:py-20 bg-sage-pale/40">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <span className="kicker">Eine Geschichte von vielen</span>
            <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
              «Ich habe alles versucht –{" "}
              <em>und trotzdem nicht gewusst, was ich falsch mache.</em>»
            </h2>
            <hr className="rule rule-narrow mb-6" />
            <div className="prose-editorial text-muted-foreground leading-relaxed space-y-4">
              <p>
                Martina, Mutter eines erwachsenen Sohnes, beschreibt es so: Sie
                habe jahrelang das Gefühl gehabt, auf Eierschalen zu laufen.
                Jedes Gespräch konnte kippen. Jeder gut gemeinte Satz wurde
                falsch verstanden. Sie habe sich zurückgezogen, dann wieder
                angenähert – und immer das Gefühl gehabt, dass sie das Problem
                sei.
              </p>
              <p>
                Was ihr schliesslich geholfen hat: zu verstehen, dass die
                Dynamik nicht an ihr lag. Dass Borderline bestimmte
                Beziehungsmuster erzeugt, die für Angehörige fast unmöglich zu
                durchschauen sind – solange man sie nicht kennt. Und dass
                Grenzen setzen keine Kälte ist, sondern Schutz für beide Seiten.
              </p>
              <p className="text-sm italic text-muted-foreground/70">
                Martina ist ein Kompositum aus Erfahrungen, die in der
                Angehörigenarbeit häufig geschildert werden. Keine echte
                Einzelperson.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="home-section-divider h-6" />

      <Erfahrungsberichte />

      <div className="home-section-divider h-6" />

      {/* Invitation-Sektion */}
      <InvitationSection />

      <div className="home-section-divider h-6" />

      <section className="py-8 md:py-12 bg-gradient-to-r from-alert-dark via-alert to-alert-dark">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-2">
                In einer akuten Krise?
              </h2>
              <p className="text-white">
                Hier finden Sie sofortige Hilfe und Notfallnummern.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-alert hover:bg-white/90"
              asChild
            >
              <Link href="/soforthilfe">
                <Phone className="w-5 h-5 mr-2" />
                Soforthilfe öffnen
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
