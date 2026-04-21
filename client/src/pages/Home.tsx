import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Compass,
  Download,
  FileText,
  Heart,
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
    color: "var(--color-sage-dark)",
    iconBg: "var(--color-sage-wash)",
  },
  {
    href: "/soforthilfe",
    icon: AlertTriangle,
    title: "Es kippt gerade oder eskaliert",
    text: "Wenn starke Anspannung, Konflikte oder Krisensignale im Vordergrund stehen.",
    color: "var(--color-alert)",
    iconBg: "var(--color-alert-wash)",
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Gespräche werden schwierig",
    text: "Wenn Worte verletzen, Vorwürfe dominieren oder alles sofort hochgeht.",
    color: "var(--color-slate-blue)",
    iconBg: "var(--color-slate-wash)",
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Ich bin selbst erschöpft",
    text: "Wenn Anspannung, Schuld, Rückzug oder innere Überforderung zu gross werden.",
    color: "var(--color-sage-mid)",
    iconBg: "var(--color-sage-wash)",
  },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Orientierung für Angehörige von Menschen mit Borderline: differenziert, fachlich fundiert und entlastend."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Orientierung für Angehörige"
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Muster."
        path="/"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[oklch(0.28_0.05_220)] to-navy-light/80 text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-sage-mid blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 w-56 h-56 rounded-full bg-amber blur-3xl" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-sage-dark blur-3xl" />
        </div>

        <div className="container relative z-10 py-16 md:py-20 lg:py-26">
          <div className="max-w-3xl">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-sage-dark text-white text-[11px] font-semibold tracking-[0.12em] uppercase mb-5">
                Für Angehörige von Menschen mit Borderline
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.12] tracking-tight mb-4">
                Orientierung in belasteten{" "}
                <span className="text-sage-light">Beziehungen</span>
              </h1>

              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-2xl font-light">
                Wenn Beziehungen von starker Anspannung, Eskalation, Rückzug,
                Schuld oder Erschöpfung geprägt sind, hilft nicht noch mehr
                Druck, sondern ein klarer nächster Schritt. Diese Website
                unterstützt Angehörige dabei, Dynamiken zu verstehen,
                hilfreicher zu reagieren und sich selbst nicht zu verlieren.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                  size="lg"
                  className="bg-sage-dark hover:bg-sage-mid text-white w-full sm:w-auto"
                  asChild
                >
                  <Link href="/verstehen">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Borderline besser verstehen
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/unterstuetzen/uebersicht">
                    <Heart className="w-5 h-5 mr-2" />
                    Was hilft in meiner Lage?
                  </Link>
                </Button>
              </div>

              <Link
                href="/soforthilfe"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors group text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Akute Krise? Soforthilfe</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
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
              className="text-sage-light hover:text-white text-sm font-medium underline underline-offset-2 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              Angebot & Kontakt
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div
        className="h-6"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.93 0.02 190 / 0.3), transparent)",
        }}
      />

      <section className="py-8 md:py-10 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-sage-dark/85 mb-3">
                <span className="w-6 h-px bg-sage-dark/30" />
                Orientierung
              </span>
              <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-3">
                Was ist gerade Ihre Lage?
              </h2>
              <p className="text-muted-foreground max-w-2xl">
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
                      className="h-full cursor-pointer bg-white border border-border rounded-[10px] border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                      style={{ borderLeftColor: item.color }}
                    >
                      <CardContent className="p-5 flex gap-4 items-start">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.iconBg }}
                        >
                          <Icon
                            className="w-[18px] h-[18px]"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-[13.5px] text-muted-foreground mb-2">
                            {item.text}
                          </p>
                          <span
                            className="text-xs font-semibold inline-flex items-center gap-1"
                            style={{ color: item.color }}
                          >
                            Zum passenden Bereich
                            <ArrowRight className="w-3.5 h-3.5" />
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

      <div
        className="h-6"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.93 0.02 190 / 0.3), transparent)",
        }}
      />

      <section className="py-10 md:py-14 bg-cream">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                {/* Linke Spalte: Text + Checkmarks */}
                <div>
                  <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-sage-dark/85 mb-3">
                    <span className="w-6 h-px bg-sage-dark/30" />
                    Unser Ansatz
                  </span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground mb-6">
                    Was diese Website besonders abdeckt
                  </h2>
                  <div className="flex flex-col gap-3">
                    {[
                      "Borderline differenziert aus Sicht von Angehörigen verstehen",
                      "Beziehungsmuster, Eskalation und Rückzug besser einordnen",
                      "Grenzen, Selbstschutz und Unterstützung zusammendenken",
                      "Fachliche Hilfe, Materialien und Beratungswege schnell finden",
                    ].map(item => (
                      <div
                        key={item}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border/40"
                      >
                        <span className="text-sage-dark mt-0.5">✓</span>
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/verstehen"
                    className="inline-flex items-center gap-2.5 text-sage-dark hover:text-sage-darker font-medium text-sm group transition-colors mt-5"
                  >
                    Mehr über Borderline erfahren
                    <span className="w-7 h-7 rounded-full bg-sage-wash group-hover:bg-sage-light/50 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

                {/* Rechte Spalte: Abstrakte Illustration */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-square">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, oklch(0.95 0.02 190 / 0.7), oklch(0.88 0.04 190 / 0.25))",
                      }}
                    />

                    {/* Dekorative Ringe */}
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-sage-mid/20" />
                    <div className="absolute inset-12 rounded-full border border-sage-mid/15" />

                    {/* Zentrale Ikone */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-border/40 flex items-center justify-center">
                        <Heart className="w-9 h-9 text-sage-dark" />
                      </div>
                    </div>

                    {/* Orbitale Icons */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-border/40 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-sage-mid" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-border/40 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-sage-mid" />
                      </div>
                    </div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-border/40 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-sage-mid" />
                      </div>
                    </div>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-border/40 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-sage-mid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-6"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.93 0.02 190 / 0.3), transparent)",
        }}
      />

      <section className="py-10 md:py-14 bg-sage-wash/40">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div>
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-sage-dark/85 mb-3">
                  <span className="w-6 h-px bg-sage-dark/30" />
                  Werkzeuge
                  <span className="w-6 h-px bg-sage-dark/30" />
                </span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Praktische Hilfen für Ihren Alltag
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {interactiveTools.map(tool => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.href} href={tool.href}>
                      <div className="group flex flex-col items-center text-center p-4 md:p-5 rounded-xl bg-white border border-border/40 hover:border-sage-mid/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-sage-wash flex items-center justify-center mb-3 group-hover:bg-sage-light/50 transition-colors">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-sage-dark" />
                        </div>
                        <span className="text-sm font-semibold text-foreground mb-0.5">
                          {tool.label}
                        </span>
                        <span className="text-xs text-muted-foreground leading-snug">
                          {tool.text}
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
