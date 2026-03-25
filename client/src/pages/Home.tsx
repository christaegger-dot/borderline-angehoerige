import Layout from "@/components/Layout";
import SEO, { MedicalPageSchema, WebsiteSchema } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Compass,
  Download,
  Heart,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const heroImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XkvykpgJHYsCUUQW.webp";
const heroImage1280 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/smWfBdfAvQptVoCP.webp";
const heroImage768 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VEYeFPLYdBHjfcQo.webp";
const heroImageMobile = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fYVyThTdLUpjIoVU.webp";

const situationPaths = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Ich versuche zu verstehen, was passiert",
    text: "Wenn Nähe, Eskalation, Rückzug oder Widersprüche schwer einzuordnen sind.",
    color: "var(--color-sage-mid)",
    bg: "var(--color-sage-wash)",
  },
  {
    href: "/unterstuetzen/krise",
    icon: AlertTriangle,
    title: "Es kippt gerade oder eskaliert",
    text: "Wenn starke Anspannung, Konflikte oder Krisensignale im Vordergrund stehen.",
    color: "var(--color-alert)",
    bg: "var(--color-alert-wash)",
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Gespräche werden schwierig",
    text: "Wenn Worte verletzen, Vorwürfe dominieren oder alles sofort hochgeht.",
    color: "var(--color-slate-blue)",
    bg: "var(--color-slate-wash)",
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Ich bin selbst erschöpft",
    text: "Wenn Anspannung, Schuld, Rückzug oder innere Überforderung zu gross werden.",
    color: "var(--color-terracotta-mid)",
    bg: "var(--color-terracotta-wash)",
  },
];

const mainPaths = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Verstehen",
    description: "Borderline aus Sicht von Angehörigen: Beziehungsmuster, Scham, Überflutung und Nähe-Distanz.",
  },
  {
    href: "/unterstuetzen/uebersicht",
    icon: Heart,
    title: "Unterstützen",
    description: "Wie Unterstützung tragfähig bleiben kann, ohne dass Sie alles allein tragen.",
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Kommunizieren",
    description: "Hilfreiche Sprache in angespannten, verletzlichen oder eskalierenden Momenten.",
  },
  {
    href: "/grenzen",
    icon: Shield,
    title: "Grenzen",
    description: "Klarheit, Selbstschutz und begrenzte Verfügbarkeit ohne unnötige Eskalation.",
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Selbstfürsorge",
    description: "Warnsignale der Überlastung, Entlastung und Umgang mit eigener Erschöpfung.",
  },
  {
    href: "/beratung",
    icon: Users,
    title: "Beratung",
    description: "Fachstelle, Netzwerke und konkrete Anlaufstellen für Angehörige in der Schweiz.",
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
        description="Psychoedukative Unterstützung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung."
        path="/"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 640px)" srcSet={heroImageMobile} />
            <source media="(max-width: 768px)" srcSet={heroImage768} />
            <source media="(max-width: 1280px)" srcSet={heroImage1280} />
            <img
              src={heroImage}
              alt="Warme Landschaft als Hintergrundbild"
              className="w-full h-full object-cover opacity-50"
              srcSet={`${heroImage768} 768w, ${heroImage1280} 1280w, ${heroImage} 1920w`}
              sizes="100vw"
              width={1920}
              height={1071}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-sage-darker text-sm font-medium mb-6">
                Für Angehörige von Menschen mit Borderline
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-4">
                Orientierung in belasteten Beziehungen
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Wenn Beziehungen von starker Anspannung, Eskalation, Rückzug, Schuld oder Erschöpfung
                geprägt sind, hilft nicht noch mehr Druck, sondern bessere Einordnung. Diese Website
                unterstützt Angehörige dabei, Dynamiken zu verstehen, hilfreicher zu reagieren und
                sich selbst nicht zu verlieren.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/verstehen">
                  <Button size="lg" className="bg-terracotta hover:bg-terracotta-mid text-white w-full sm:w-auto">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Borderline besser verstehen
                  </Button>
                </Link>
                <Link href="/unterstuetzen/uebersicht">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Heart className="w-5 h-5 mr-2" />
                    Was hilft in meiner Lage?
                  </Button>
                </Link>
              </div>

              <div className="mt-4">
                <Link
                  href="/soforthilfe"
                  className="inline-flex items-center gap-2 text-alert hover:text-alert-dark font-medium transition-colors group"
                >
                  <Phone className="w-4 h-4" />
                  <span>Akute Krise? Soforthilfe</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-5 bg-sage-wash/50 border-b border-sage-mid/10">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                <Shield className="w-5 h-5 text-sage-mid" />
              </div>
              <p className="font-semibold text-foreground text-sm sm:text-base">
                Ein Angebot der Fachstelle Angehörigenarbeit (PUK Zürich)
              </p>
            </div>
            <p className="text-muted-foreground text-sm flex-1">
              Fachlich fundierte Orientierung, Beratung und Materialien für Angehörige.
            </p>
            <Link
              href="/fachstelle"
              className="text-sage-darker hover:text-slate-dark text-sm font-medium underline underline-offset-2 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              Angebot & Kontakt
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Was ist gerade Ihre Lage?
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Beginnen Sie dort, wo der Druck im Moment am grössten ist. Die Website ist nicht nur
                zum Lesen gedacht, sondern als Orientierung in belasteten Beziehungssituationen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {situationPaths.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Card
                      className="h-full cursor-pointer border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{ borderColor: item.color, backgroundColor: item.bg }}
                    >
                      <CardContent className="p-5">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: item.color }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.text}</p>
                        <span className="text-sm font-medium inline-flex items-center gap-1" style={{ color: item.color }}>
                          Zum passenden Bereich
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6">
              <Link href="/selbsttest">
                <Button variant="outline" size="sm" className="gap-2">
                  <Compass className="w-4 h-4" />
                  Oder den kurzen Selbsttest nutzen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-cream wave-divider-top" style={{ "--wave-color": "var(--color-cream)" } as React.CSSProperties}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Was diese Website besonders abdeckt
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Borderline differenziert aus Sicht von Angehörigen verstehen",
                  "Beziehungsmuster, Eskalation und Rückzug besser einordnen",
                  "Grenzen, Selbstschutz und Unterstützung zusammendenken",
                  "Fachliche Hilfe, Materialien und Beratungswege schnell finden",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border/40">
                    <span className="text-sage-mid mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 wave-divider-top" style={{ "--wave-color": "var(--background)" } as React.CSSProperties}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Die wichtigsten Wege durch die Website
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Die Hauptbereiche bauen aufeinander auf. Sie können trotzdem direkt dort einsteigen,
                wo Ihre aktuelle Lage es braucht.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <Link key={path.href} href={path.href}>
                    <Card className="h-full group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-border">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-sage-light mb-5">
                          <Icon className="w-7 h-7 text-sage-darker" />
                        </div>
                        <h3 className="font-semibold text-foreground text-xl mb-3">{path.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">{path.description}</p>
                        <span className="text-sm font-medium text-sage-darker flex items-center gap-1">
                          Mehr dazu
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-sand-muted wave-divider-top" style={{ "--wave-color": "var(--color-sand-muted)" } as React.CSSProperties}>
        <div className="container">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-white">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-terracotta-lighter flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-terracotta-mid" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Materialien</h3>
                <p className="text-muted-foreground mb-4">
                  Kuratierte Handouts, Notfallhilfen und Infografiken für akute, belastete oder
                  unklare Situationen.
                </p>
                <Link href="/materialien">
                  <Button variant="outline">Zu den Materialien</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-white">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-sage-darker" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Beratung & Netzwerke</h3>
                <p className="text-muted-foreground mb-4">
                  Fachstelle, Selbsthilfe und weitere Anlaufstellen für Angehörige, die nicht alles
                  allein tragen möchten.
                </p>
                <Link href="/beratung">
                  <Button variant="outline">Zu Beratung & Netzwerken</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-alert">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                In einer akuten Krise?
              </h2>
              <p className="text-white">
                Hier finden Sie sofortige Hilfe und Notfallnummern.
              </p>
            </div>
            <Link href="/soforthilfe">
              <Button size="lg" variant="secondary" className="bg-white text-alert hover:bg-white/90">
                <Phone className="w-5 h-5 mr-2" />
                Soforthilfe öffnen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
