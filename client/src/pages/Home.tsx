import Layout from "@/components/Layout";
import Erfahrungsberichte from "@/components/Erfahrungsberichte";
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
  Info
} from "lucide-react";

const heroImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wNcJxGFEHelzxZEE.png";

const supportImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/QQWESvrKXIWrtzrh.png";

const topics = [
  {
    href: "/verstehen",
    icon: BookOpen,
    title: "Verstehen",
    description: "Was ist Borderline? Symptome, Ursachen und wie die Störung das Erleben beeinflusst.",
    color: "oklch(0.65 0.08 145)", // Sage
    bgColor: "oklch(0.88 0.04 145)",
    time: "15 Min"
  },
  {
    href: "/unterstuetzen",
    icon: Heart,
    title: "Unterstützen",
    description: "Wie Sie Ihren Angehörigen im Alltag, in der Therapie und in Krisen begleiten können.",
    color: "oklch(0.65 0.12 55)", // Terracotta
    bgColor: "oklch(0.85 0.08 55)",
    time: "20 Min"
  },
  {
    href: "/kommunizieren",
    icon: MessageCircle,
    title: "Kommunizieren",
    description: "Validierung, SET-Kommunikation und wie Sie auch in schwierigen Momenten im Gespräch bleiben.",
    color: "oklch(0.45 0.05 250)", // Slate Blue
    bgColor: "oklch(0.90 0.03 250)",
    time: "15 Min"
  },
  {
    href: "/grenzen",
    icon: Shield,
    title: "Grenzen setzen",
    description: "Warum Grenzen wichtig sind und wie Sie sie liebevoll, aber klar kommunizieren.",
    color: "oklch(0.55 0.15 35)", // Warm Orange
    bgColor: "oklch(0.92 0.06 35)",
    time: "12 Min"
  },
  {
    href: "/selbstfuersorge",
    icon: Sparkles,
    title: "Selbstfürsorge",
    description: "Wie Sie auf sich selbst achten, Burnout vermeiden und Ihre eigenen Ressourcen stärken.",
    color: "oklch(0.55 0.12 320)", // Soft Purple
    bgColor: "oklch(0.92 0.05 320)",
    time: "10 Min"
  },
];

const crisisMatrix = [
  {
    level: "akut",
    title: "Akute Krise",
    description: "Suizidgedanken, Selbstverletzung, akute Gefahr",
    action: "Sofort handeln",
    href: "/notfall",
    color: "oklch(0.55 0.20 25)",
    bgColor: "oklch(0.95 0.05 25)",
    icon: AlertTriangle
  },
  {
    level: "hoch",
    title: "Hohe Anspannung",
    description: "Starke Emotionen, drohende Eskalation",
    action: "Deeskalieren",
    href: "/unterstuetzen/krise",
    color: "oklch(0.60 0.15 55)",
    bgColor: "oklch(0.95 0.04 55)",
    icon: Clock
  },
  {
    level: "mittel",
    title: "Angespannte Situation",
    description: "Konflikte, Missverständnisse, Rückzug",
    action: "Kommunizieren",
    href: "/kommunizieren",
    color: "oklch(0.55 0.10 85)",
    bgColor: "oklch(0.95 0.03 85)",
    icon: MessageCircle
  },
  {
    level: "stabil",
    title: "Stabile Phase",
    description: "Ruhige Zeit, Gelegenheit zum Lernen",
    action: "Vertiefen",
    href: "/verstehen",
    color: "oklch(0.55 0.10 145)",
    bgColor: "oklch(0.95 0.03 145)",
    icon: CheckCircle2
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        
        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.88_0.04_145)] text-[oklch(0.40_0.08_145)] text-sm font-medium mb-6">
                Für Angehörige von Menschen mit Borderline
              </span>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-4">
                Schluss mit dem{" "}
                <span className="text-[oklch(0.65_0.12_55)]">Eiertanz</span>
              </h1>
              
              <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30 max-w-xl">
                <Info className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">«Eiertanz»</span> – so beschreiben Paul T. Mason und Randi Kreger in ihrem Standardwerk das Gefühl vieler Angehöriger: ständig auf der Hut, um niemanden zu verletzen.{" "}
                  <Link href="/buchempfehlungen" className="text-[oklch(0.55_0.12_55)] hover:underline">Zum Buch →</Link>
                </p>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Sie können helfen – und dabei auf sich achten. Evidenzbasierte Strategien für den Alltag mit einem Menschen, der an Borderline leidet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/unterstuetzen">
                  <Button size="lg" className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white w-full sm:w-auto">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Crisis Matrix */}
      <section className="py-12 md:py-16 bg-[oklch(0.99_0.008_85)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crisisMatrix.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Card 
                      className="group h-full border-2 border-dashed transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-solid hover:scale-[1.02] cursor-pointer"
                      style={{ 
                        borderColor: item.color,
                        backgroundColor: item.bgColor 
                      }}
                    >
                      <CardContent className="p-5">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: item.color }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                        <span 
                          className="text-sm font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                          style={{ color: item.color }}
                        >
                          {item.action}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Themen erkunden
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wählen Sie ein Thema, das Sie interessiert. Alle Inhalte sind evidenzbasiert und praxisorientiert.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={topic.href}>
                    <Card className="h-full group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-transparent hover:border-border">
                      <CardContent className="p-6">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: topic.bgColor }}
                        >
                          <Icon 
                            className="w-7 h-7" 
                            style={{ color: topic.color }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-display text-xl font-semibold text-foreground">
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
      <section className="py-16 md:py-24 bg-[oklch(0.94_0.02_85)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={supportImage} 
                alt="Unterstützung symbolisiert durch zwei Hände" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[oklch(0.85_0.08_55)] text-[oklch(0.45_0.10_55)] text-sm font-medium mb-4">
                Neue Perspektive
              </span>
              
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Sie sind nicht allein – und Sie können helfen
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Als Angehöriger fühlen Sie sich vielleicht hilflos, frustriert oder erschöpft. Das ist verständlich. Aber Sie können einen wichtigen Beitrag zur Genesung leisten – nicht als Therapeut, sondern als verlässlicher, verständnisvoller Begleiter.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Genesung ist möglich – 85–93% erreichen Remission",
                  "Ihre Unterstützung macht einen Unterschied",
                  "Sie müssen nicht perfekt sein, nur präsent"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/unterstuetzen">
                <Button size="lg" className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Unterstützungsstrategien entdecken
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Genesung ist möglich */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="w-16 h-16 rounded-full bg-[oklch(0.88_0.04_145)] flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-[oklch(0.55_0.10_145)]" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Genesung ist möglich
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Entgegen früherer Annahmen zeigt die Langzeitforschung: Die meisten Menschen mit Borderline 
                erleben eine deutliche Besserung ihrer Symptome.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[oklch(0.95_0.03_145)] rounded-xl"
              >
                <div className="text-4xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">85–93%</div>
                <p className="text-sm text-muted-foreground">erreichen symptomatische Remission</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 bg-[oklch(0.95_0.03_145)] rounded-xl"
              >
                <div className="text-4xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">50%</div>
                <p className="text-sm text-muted-foreground">erreichen vollständige Genesung</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-[oklch(0.95_0.03_145)] rounded-xl"
              >
                <div className="text-4xl font-display font-bold text-[oklch(0.55_0.10_145)] mb-2">10 J.</div>
                <p className="text-sm text-muted-foreground">Follow-up der Langzeitstudien</p>
              </motion.div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Erfahrungsberichte */}
      <Erfahrungsberichte maxBerichte={3} />

      {/* Emergency CTA */}
      <section className="py-12 md:py-16 bg-[oklch(0.55_0.20_25)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
                In einer akuten Krise?
              </h2>
              <p className="text-white/80">
                Hier finden Sie sofortige Hilfe und Notfallnummern.
              </p>
            </div>
            <Link href="/notfall">
              <Button size="lg" variant="secondary" className="bg-white text-[oklch(0.55_0.20_25)] hover:bg-white/90">
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
