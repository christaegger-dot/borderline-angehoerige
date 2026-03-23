import Layout from "@/components/Layout";
import Erfahrungsberichte from "@/components/Erfahrungsberichte";
import SEO, { WebsiteSchema, MedicalPageSchema } from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Shield, 
  Sparkles, 
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Compass,
  TrendingUp,

  Sprout,
  Download,
  FileText
} from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";
import Schnelleinstieg from "@/components/interactive/Schnelleinstieg";

const heroImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/XkvykpgJHYsCUUQW.webp";
const heroImage1280 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/smWfBdfAvQptVoCP.webp";
const heroImage768 = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VEYeFPLYdBHjfcQo.webp";
const heroImageMobile = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/fYVyThTdLUpjIoVU.webp";

const supportImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/QOtPbYSrYvKYybbO.webp";

const topics = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Verstehen",
    description: "Was ist Borderline? Symptome, Ursachen und wie die Störung das Erleben beeinflusst.",
    color: "var(--color-sage)", // Sage
    bgColor: "var(--color-sage-light)",
    time: "15 Min"
  },
  {
    href: "/unterstuetzen",
    icon: Heart,
    title: "Unterstützen",
    description: "Wie Sie Ihren Angehörigen im Alltag, in der Therapie und in Krisen begleiten können.",
    color: "var(--color-terracotta)", // Terracotta
    bgColor: "var(--color-terracotta-light)",
    time: "20 Min"
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Kommunizieren",
    description: "Validierung, SET-Kommunikation und wie Sie auch in schwierigen Momenten im Gespräch bleiben.",
    color: "var(--color-slate-blue)", // Slate Blue
    bgColor: "var(--color-slate-light)",
    time: "15 Min"
  },
  {
    href: "/grenzen",
    icon: Shield,
    title: "Grenzen setzen",
    description: "Warum Grenzen wichtig sind und wie Sie sie liebevoll, aber klar kommunizieren.",
    color: "var(--color-terracotta-mid)", // Warm Orange
    bgColor: "var(--color-terracotta-lighter)",
    time: "12 Min"
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Selbstfürsorge",
    description: "Wie Sie auf sich selbst achten, Burnout vermeiden und Ihre eigenen Ressourcen stärken.",
    color: "var(--color-sage-mid)", // Soft Purple
    bgColor: "var(--color-sage-lighter)",
    time: "10 Min"
  },
  {
    href: "/genesung",
    icon: Sprout,
    title: "Genesung",
    description: "Warum Genesung möglich ist, was Langzeitstudien zeigen und wie Sie Hoffnung bewahren können.",
    color: "var(--color-sage-mid)", // Teal
    bgColor: "var(--color-sage-light)",
    time: "8 Min"
  },
];

const crisisMatrix = [
  {
    level: "akut",
    title: "Akute Krise",
    description: "Suizidgedanken, Selbstverletzung, akute Gefahr",
    action: "Sofort handeln",
    href: "/soforthilfe",
    color: "var(--color-alert)",
    bgColor: "var(--color-alert-wash)",
    icon: AlertTriangle
  },
  {
    level: "hoch",
    title: "Hohe Anspannung",
    description: "Starke Emotionen, drohende Eskalation",
    action: "Deeskalieren",
    href: "/unterstuetzen/krise",
    color: "var(--color-sand-mid)",
    bgColor: "var(--color-terracotta-wash)",
    icon: Clock
  },
  {
    level: "mittel",
    title: "Angespannte Situation",
    description: "Konflikte, Missverständnisse, Rückzug",
    action: "Kommunizieren",
    href: "/kommunizieren",
    color: "var(--color-sand-warm)",
    bgColor: "var(--color-sand-muted)",
    icon: MessageCircle
  },
  {
    level: "stabil",
    title: "Stabile Phase",
    description: "Ruhige Zeit, Gelegenheit zum Lernen",
    action: "Vertiefen",
    href: "/verstehen",
    color: "var(--color-sage-mid)",
    bgColor: "var(--color-sage-wash)",
    icon: CheckCircle2
  },
  {
    level: "erschoepft",
    title: "Ich bin am Limit",
    description: "Erschöpfung, Überforderung, eigene Grenzen erreicht",
    action: "Für mich sorgen",
    href: "/selbstfuersorge",
    color: "var(--color-slate-dark)",
    bgColor: "var(--color-slate-wash)",
    icon: Sparkles
  },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Startseite"
        description="Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung. Verstehen, unterstützen, kommunizieren – ohne sich selbst zu verlieren."
        path="/"
      />
      <WebsiteSchema />
      <MedicalPageSchema
        title="Borderline: Hilfe für Angehörige – Evidenzbasierte Unterstützung"
        description="Evidenzbasierte Strategien für den Alltag mit einem Menschen mit Borderline-Persönlichkeitsstörung."
        path="/"
      />
      {/* Hero Section */}
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
                Sie können{" "}
                <span className="text-terracotta">helfen</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Orientierung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung: fachlich fundiert, psychologisch differenziert und alltagsnah. Damit Sie besser einordnen können, was geschieht, und tragfähige Wege im Umgang damit finden.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/unterstuetzen/uebersicht">
                  <Button size="lg" className="bg-terracotta hover:bg-terracotta-mid text-white w-full sm:w-auto">
                    <Heart className="w-5 h-5 mr-2" />
                    Wie kann ich helfen?
                  </Button>
                </Link>
                <Link href="/verstehen">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Borderline verstehen
                  </Button>
                </Link>
              </div>
              <div className="mt-4">
                <Link href="/soforthilfe" className="inline-flex items-center gap-2 text-alert hover:text-alert-dark font-medium transition-colors group">
                  <Phone className="w-4 h-4" />
                  <span>Akute Krise? Soforthilfe</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust-Block: Absender-Einordnung */}
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
              Beratung, Orientierung und Materialien für Angehörige.
            </p>
            <Link href="/fachstelle" className="text-sage-darker hover:text-slate-dark text-sm font-medium underline underline-offset-2 transition-colors flex items-center gap-1 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-darker">
              Angebot & Kontakt
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schnelleinstieg */}
      <Schnelleinstieg />

      {/* Crisis Matrix */}
      <section className="py-12 md:py-16 bg-cream wave-divider-top" style={{ '--wave-color': 'var(--color-cream)' } as React.CSSProperties}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Wo stehen Sie gerade?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Wählen Sie die Situation, die am besten zu Ihrer aktuellen Lage passt.
            </p>
            <Link href="/selbsttest">
              <Button variant="outline" size="sm" className="gap-2">
                <Compass className="w-4 h-4" />
                Oder machen Sie unseren kurzen Selbsttest
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {crisisMatrix.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Link href={item.href}>
                    <Card 
                      className="group h-full border-2 border-dashed transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-solid hover:scale-[1.02] cursor-pointer"
                      style={{ 
                        borderColor: item.color,
                        backgroundColor: item.bgColor 
                      }}
                    >
                      <CardContent className="p-5">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundColor: item.color }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        <span 
                          className="text-sm font-medium flex items-center gap-1 transition-all duration-500 group-hover:gap-2"
                          style={{ color: item.color }}
                        >
                          {item.action}
                          <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 md:py-24 wave-divider-top" style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Themen erkunden
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wählen Sie ein Thema, das Sie interessiert. Alle Inhalte sind evidenzbasiert und praxisorientiert.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const isFeatured = index === 0;
              return (
                <motion.div
                  key={topic.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
                >
                  <Link href={topic.href}>
                    <Card className={`h-full group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-transparent hover:border-border ${
                      isFeatured ? 'bg-sage-lighter/40 border-sage-light/50' : ''
                    }`}>
                      <CardContent className={isFeatured ? 'p-8 md:flex md:items-center md:gap-8' : 'p-6'}>
                        <div 
                          className={`rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
                            isFeatured ? 'w-16 h-16 md:w-20 md:h-20 mb-5 md:mb-0 flex-shrink-0' : 'w-14 h-14 mb-5'
                          }`}
                          style={{ backgroundColor: topic.bgColor }}
                        >
                          <Icon 
                            className={isFeatured ? 'w-8 h-8 md:w-10 md:h-10' : 'w-7 h-7'}
                            style={{ color: topic.color }}
                          />
                        </div>
                        
                        <div className={isFeatured ? 'flex-1' : ''}>
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className={`font-semibold text-foreground ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
                              {topic.title}
                            </h3>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {topic.time}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {topic.description}
                          </p>
                          
                          <span 
                            className="text-sm font-medium flex items-center gap-1 transition-colors"
                            style={{ color: topic.color }}
                          >
                            Mehr erfahren
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 md:py-24 bg-sand-muted wave-divider-top" style={{ '--wave-color': 'var(--color-sand-muted)' } as React.CSSProperties}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img 
                src={supportImage} 
                alt="Unterstützung symbolisiert durch zwei Hände" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
                width={800}
                height={446}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta-light text-terracotta-dark text-sm font-medium mb-4">
                Neue Perspektive
              </span>
              
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Sie sind nicht allein – und Sie können helfen
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Als Angehöriger fühlen Sie sich vielleicht hilflos, frustriert oder erschöpft. Das ist verständlich. Aber Sie können einen wichtigen Beitrag zur Genesung leisten – nicht als Therapeut, sondern als verlässlicher, verständnisvoller Begleiter.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Genesung ist möglich – Langzeitstudien zeigen hohe Remissionsraten",
                  "Ihre Unterstützung macht einen Unterschied",
                  "Sie müssen nicht perfekt sein, nur präsent"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage-mid mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/unterstuetzen/uebersicht">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta-mid text-white">
                  Unterstützungsstrategien entdecken
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Genesung ist möglich */}
      <section className="py-16 md:py-24 wave-divider-top" style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-sage-mid" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Genesung ist möglich
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Entgegen früherer Annahmen zeigt die Langzeitforschung: Die meisten Menschen mit Borderline 
                erleben eine deutliche Besserung ihrer Symptome.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <AnimatedStat
                end={93}
                prefix="85–"
                suffix="%"
                label="erreichen symptomatische Remission"
                duration={2200}
                delay={0}
              />
              <AnimatedStat
                end={50}
                suffix="%"
                label="erreichen vollständige Genesung"
                duration={1800}
                delay={0.1}
              />
              <AnimatedStat
                end={10}
                suffix=" J."
                label="Follow-up der Langzeitstudien"
                duration={1500}
                delay={0.2}
              />
            </div>

            <div className="text-center">
              <Link href="/genesung">
                <Button variant="outline" size="lg" className="gap-2">
                  Mehr über Genesung erfahren
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">
                Quellen: McLean Study (Zanarini et al.), CLPS Study (Gunderson et al.)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Orientierungswerte aus Langzeitstudien; individuelle Verläufe können abweichen.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Remission = diagnostische Kriterien über eine definierte Zeit nicht mehr erfüllt. Genesung = zusätzlich alltags- und funktionsbezogene Stabilität.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materialien CTA */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="border-2 border-dashed border-sand-border bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 md:w-10 md:h-10 text-terracotta-mid" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                      Materialien herunterladen
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      31 Materialien als A4-PDF – Infografiken, Spickzettel &amp; Notfallkarte
                    </p>
                    <Link href="/materialien">
                      <Button className="bg-terracotta hover:bg-terracotta-mid text-white gap-2">
                        <Download className="w-4 h-4" />
                        31 Materialien durchsuchen
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Erfahrungsberichte */}
      <Erfahrungsberichte maxBerichte={4} variant="carousel" />

      {/* Emergency CTA */}
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
