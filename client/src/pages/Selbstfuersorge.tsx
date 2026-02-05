import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Sparkles, ArrowRight, CheckCircle2, Heart, AlertTriangle, Users, 
  Clock, Brain, Wind, Lightbulb, Shield, BookOpen, Phone, Download,
  ChevronDown, ChevronUp, UserCircle
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { TableOfContents } from "@/components/UXEnhancements";

// Atemübung Komponente
function AtemuebungCard() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'einatmen' | 'halten' | 'ausatmen' | 'pause'>('einatmen');
  const [count, setCount] = useState(4);

  const startUebung = () => {
    setIsActive(true);
    setPhase('einatmen');
    setCount(4);
    
    const cycle = () => {
      // Einatmen 4s
      setPhase('einatmen');
      let c = 4;
      const einatmenInterval = setInterval(() => {
        c--;
        setCount(c);
        if (c === 0) {
          clearInterval(einatmenInterval);
          // Halten 4s
          setPhase('halten');
          c = 4;
          setCount(c);
          const haltenInterval = setInterval(() => {
            c--;
            setCount(c);
            if (c === 0) {
              clearInterval(haltenInterval);
              // Ausatmen 6s
              setPhase('ausatmen');
              c = 6;
              setCount(c);
              const ausatmenInterval = setInterval(() => {
                c--;
                setCount(c);
                if (c === 0) {
                  clearInterval(ausatmenInterval);
                  setIsActive(false);
                }
              }, 1000);
            }
          }, 1000);
        }
      }, 1000);
    };
    
    cycle();
  };

  return (
    <Card className="bg-gradient-to-br from-[oklch(0.92_0.05_145)]/30 to-[oklch(0.95_0.02_145)]/20 border-[oklch(0.55_0.10_145)]">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-6 h-6 text-[oklch(0.55_0.10_145)]" />
          <h3 className="font-display font-semibold text-foreground">4-4-6 Atemübung</h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          Diese Atemtechnik aktiviert Ihren Parasympathikus und hilft, aus dem Stressmodus herauszukommen.
        </p>
        
        {isActive ? (
          <div className="text-center py-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-[oklch(0.55_0.10_145)]/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-display font-bold text-[oklch(0.45_0.10_145)]">{count}</span>
            </div>
            <p className="text-lg font-medium text-[oklch(0.45_0.10_145)]">
              {phase === 'einatmen' && 'Einatmen...'}
              {phase === 'halten' && 'Halten...'}
              {phase === 'ausatmen' && 'Langsam ausatmen...'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_145)]/20 flex items-center justify-center text-xs font-medium">1</span>
              4 Sekunden einatmen
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_145)]/20 flex items-center justify-center text-xs font-medium">2</span>
              4 Sekunden halten
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-[oklch(0.55_0.10_145)]/20 flex items-center justify-center text-xs font-medium">3</span>
              6 Sekunden ausatmen
            </div>
            <Button 
              onClick={startUebung}
              className="w-full mt-4 bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.45_0.12_145)] text-white"
            >
              Übung starten
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Akkordeon für Übungen
function UebungAkkordeon({ title, icon: Icon, children, color }: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  color: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="border-border/50 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-semibold text-foreground">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {isOpen && (
        <CardContent className="pt-0 pb-5 px-5">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

export default function Selbstfuersorge() {
  return (
    <Layout>
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.92_0.05_320)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.92_0.05_320)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[oklch(0.50_0.12_320)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.50_0.12_320)]">Lesezeit: 12 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Selbstfürsorge für Angehörige
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Sie können nur dann für andere da sein, wenn Sie auch für sich selbst sorgen. Selbstfürsorge ist kein Luxus – sie ist eine Notwendigkeit für Ihre Gesundheit und Ihre Beziehung.
            </p>

            <Card className="bg-[oklch(0.92_0.05_320)]/20 border-[oklch(0.55_0.12_320)]">
              <CardContent className="p-5">
                <p className="text-foreground leading-relaxed italic">
                  "Wenn Sie sich um einen Menschen mit Borderline kümmern, ist es wie bei einem Langstreckenflug: Setzen Sie zuerst Ihre eigene Sauerstoffmaske auf, bevor Sie anderen helfen."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            
            {/* Warum Selbstfürsorge wichtig ist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Warum Selbstfürsorge so wichtig ist
              </h2>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Angehörige von Menschen mit Borderline tragen eine besondere Last. Die emotionale Intensität, die Unvorhersehbarkeit und die ständige Sorge können zu chronischem Stress führen. Studien zeigen, dass Angehörige ein erhöhtes Risiko für:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Erschöpfungsdepression",
                    "Angststörungen", 
                    "Schlafstörungen",
                    "Körperliche Beschwerden"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-[oklch(0.55_0.15_35)]" />
                      {item}
                    </div>
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Selbstfürsorge ist daher keine Selbstsucht, sondern <strong className="text-foreground">Selbsterhaltung</strong>. Sie ermöglicht es Ihnen, langfristig für Ihren Angehörigen da zu sein – ohne selbst krank zu werden.
                </p>
              </div>
            </motion.div>

            {/* Warnsignale für Überlastung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-[oklch(0.55_0.15_35)]" />
                Warnsignale für Überlastung
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen:
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-t-4 border-t-[oklch(0.60_0.15_85)] bg-[oklch(0.97_0.02_85)]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[oklch(0.60_0.15_85)] flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">Emotional</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Gereiztheit",
                        "Hoffnungslosigkeit",
                        "Emotionale Taubheit",
                        "Schuldgefühle",
                        "Kontrollverlust-Angst"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-[oklch(0.60_0.15_85)] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-[oklch(0.55_0.15_25)] bg-[oklch(0.97_0.02_25)]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[oklch(0.55_0.15_25)] flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">Körperlich</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Erschöpfung",
                        "Schlafprobleme",
                        "Appetitveränderung",
                        "Kopfschmerzen",
                        "Infektanfälligkeit"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-[oklch(0.55_0.15_25)] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-[oklch(0.50_0.12_250)] bg-[oklch(0.97_0.02_250)]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[oklch(0.50_0.12_250)] flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">Sozial</h3>
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Rückzug",
                        "Hobbys vernachlässigt",
                        "Isolationsgefühl",
                        "Vermeidung",
                        "Nur noch Angehöriger"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-[oklch(0.50_0.12_250)] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-[oklch(0.55_0.15_35)]/10 border-[oklch(0.55_0.15_35)]">
                <CardContent className="p-5">
                  <p className="text-foreground font-medium">
                    Wenn Sie mehrere dieser Warnsignale bei sich bemerken, ist es Zeit zu handeln. Sprechen Sie mit Ihrem Hausarzt oder suchen Sie professionelle Unterstützung.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sofort-Übungen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-[oklch(0.55_0.10_145)]" />
                Sofort-Übungen für akute Belastung
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Diese Übungen können Sie jederzeit anwenden, wenn Sie merken, dass der Stress überhand nimmt:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <AtemuebungCard />
                
                <Card className="bg-gradient-to-br from-[oklch(0.90_0.05_250)]/30 to-[oklch(0.95_0.02_250)]/20 border-[oklch(0.45_0.08_250)]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-6 h-6 text-[oklch(0.45_0.08_250)]" />
                      <h3 className="font-display font-semibold text-foreground">5-4-3-2-1 Grounding</h3>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      Diese Technik hilft, aus Grübeln und Sorgen in den gegenwärtigen Moment zurückzukehren.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.45_0.08_250)]/20 flex items-center justify-center text-xs font-medium">5</span>
                        Dinge, die Sie sehen
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.45_0.08_250)]/20 flex items-center justify-center text-xs font-medium">4</span>
                        Dinge, die Sie hören
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.45_0.08_250)]/20 flex items-center justify-center text-xs font-medium">3</span>
                        Dinge, die Sie fühlen (berühren)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.45_0.08_250)]/20 flex items-center justify-center text-xs font-medium">2</span>
                        Dinge, die Sie riechen
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-[oklch(0.45_0.08_250)]/20 flex items-center justify-center text-xs font-medium">1</span>
                        Ding, das Sie schmecken
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3">STOPP-Technik</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Wenn Sie merken, dass Sie in einen Strudel aus Sorgen oder Ärger geraten:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { letter: "S", text: "Stopp – Innehalten" },
                      { letter: "T", text: "Tief durchatmen" },
                      { letter: "O", text: "Orientieren – Was passiert gerade?" },
                      { letter: "P", text: "Planen – Was ist jetzt hilfreich?" },
                      { letter: "P", text: "Praktizieren – Einen Schritt tun" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[oklch(0.65_0.12_55)]/20 flex items-center justify-center font-display font-bold text-[oklch(0.55_0.14_55)]">
                          {item.letter}
                        </span>
                        <span className="text-sm text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Langfristige Strategien */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[oklch(0.65_0.12_55)]" />
                Langfristige Selbstfürsorge-Strategien
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Neben den Sofort-Übungen brauchen Sie auch langfristige Strategien, um Ihre Gesundheit zu erhalten:
              </p>
              
              <div className="space-y-3">
                <UebungAkkordeon 
                  title="Tägliche Mini-Auszeiten" 
                  icon={Clock}
                  color="bg-[oklch(0.55_0.10_145)]"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Planen Sie jeden Tag mindestens 15-30 Minuten nur für sich ein – nicht verhandelbar, nicht verschiebbar.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Morgens: 10 Min. Kaffee in Ruhe",
                        "Mittags: Kurzer Spaziergang",
                        "Abends: Entspannungsübung",
                        "Vor dem Schlaf: Lesen oder Musik"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)]" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Card className="bg-[oklch(0.95_0.02_145)]/50 border-transparent">
                      <CardContent className="p-4">
                        <p className="text-sm text-foreground">
                          <strong>Tipp:</strong> Tragen Sie diese Zeiten in Ihren Kalender ein wie einen wichtigen Termin.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </UebungAkkordeon>
                
                <UebungAkkordeon 
                  title="Bewegung und Körper" 
                  icon={Heart}
                  color="bg-[oklch(0.65_0.12_55)]"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Körperliche Aktivität baut Stresshormone ab und setzt Endorphine frei. Schon 20 Minuten machen einen Unterschied.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Spaziergang in der Natur",
                        "Yoga oder Stretching",
                        "Schwimmen",
                        "Tanzen (auch alleine zuhause)",
                        "Gartenarbeit",
                        "Radfahren"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.12_55)]" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Card className="bg-[oklch(0.95_0.02_55)]/50 border-transparent">
                      <CardContent className="p-4">
                        <p className="text-sm text-foreground">
                          <strong>Evidenz:</strong> Studien zeigen, dass regelmässige Bewegung bei der Prävention und Behandlung von Depressionen ähnlich wirksam sein kann wie Antidepressiva.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </UebungAkkordeon>
                
                <UebungAkkordeon 
                  title="Soziale Kontakte pflegen" 
                  icon={Users}
                  color="bg-[oklch(0.45_0.08_250)]"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Isolation ist einer der grössten Risikofaktoren für Angehörige. Halten Sie aktiv Kontakt zu Menschen ausserhalb der Betreuungssituation.
                    </p>
                    <div className="space-y-2">
                      {[
                        "Verabreden Sie sich regelmässig mit Freunden",
                        "Pflegen Sie mindestens eine Freundschaft, in der Borderline kein Thema ist",
                        "Treten Sie einer Gruppe bei (Sport, Hobby, Chor)",
                        "Nutzen Sie Selbsthilfegruppen für Angehörige"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.45_0.08_250)] mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </UebungAkkordeon>
                
                <UebungAkkordeon 
                  title="Professionelle Unterstützung" 
                  icon={Shield}
                  color="bg-[oklch(0.50_0.12_320)]"
                >
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-sm">
                      Auch Sie dürfen sich Hilfe holen – das ist kein Zeichen von Schwäche, sondern von Stärke und Selbstfürsorge.
                    </p>
                    <div className="space-y-3">
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">Eigene Therapie</h4>
                          <p className="text-sm text-muted-foreground">
                            Eine eigene Psychotherapie kann Ihnen helfen, mit der Belastung umzugehen und eigene Muster zu erkennen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">Angehörigenberatung</h4>
                          <p className="text-sm text-muted-foreground">
                            Spezialisierte Beratungsstellen bieten Unterstützung speziell für Angehörige von Menschen mit psychischen Erkrankungen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">Selbsthilfegruppen</h4>
                          <p className="text-sm text-muted-foreground">
                            Der Austausch mit anderen Angehörigen kann enorm entlastend sein. Sie sind nicht allein.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </UebungAkkordeon>
              </div>
            </motion.div>

            {/* Selbsthilfegruppen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-[oklch(0.45_0.05_250)]" />
                Selbsthilfegruppen für Angehörige
              </h2>
              
              <Card className="bg-[oklch(0.90_0.03_250)]/20 border-[oklch(0.45_0.05_250)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Der Austausch mit anderen Angehörigen kann enorm entlastend sein. Sie sind nicht allein mit Ihren Erfahrungen.
                  </p>
                  
                  <h3 className="font-display font-semibold text-foreground mb-3">Vorteile von Selbsthilfegruppen:</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Austausch mit Menschen, die Ähnliches erleben",
                      "Praktische Tipps aus erster Hand",
                      "Entlastung durch Verständnis",
                      "Neue Perspektiven und Hoffnung",
                      "Keine Erklärungen nötig – alle verstehen"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.10_145)] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="font-display font-semibold text-foreground mb-3">Anlaufstellen in der Schweiz:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Stand by You (Angehörige psychisch Kranker): <a href="http://www.stand-by-you.ch" className="text-[oklch(0.45_0.08_250)] underline">www.stand-by-you.ch</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Pro Mente Sana Beratung: 0848 800 858</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Erlaubnis geben */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Geben Sie sich die Erlaubnis
              </h2>
              
              <Card className="bg-[oklch(0.85_0.08_55)]/20 border-[oklch(0.65_0.12_55)]">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Als Angehöriger dürfen Sie:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Auch mal wütend, frustriert oder traurig sein",
                      "Nicht immer die Lösung haben",
                      "Ihre eigenen Bedürfnisse ernst nehmen",
                      "Nein sagen, ohne sich schuldig zu fühlen",
                      "Freude empfinden, auch wenn es Ihrem Angehörigen schlecht geht",
                      "Professionelle Hilfe für sich selbst suchen",
                      "Pausen machen und auftanken",
                      "Grenzen setzen, die Ihre Gesundheit schützen",
                      "Manchmal nicht wissen, was richtig ist"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.12_55)] mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Materialien zum Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.50_0.12_320)]" />
                Materialien zum Download
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border-border/50 hover:border-[oklch(0.55_0.10_145)] transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[oklch(0.92_0.05_145)] flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-[oklch(0.45_0.10_145)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">Selbstfürsorge für Angehörige</h3>
                        <p className="text-sm text-muted-foreground mb-2">Die 4 Säulen der Selbstfürsorge mit Warnsignalen</p>
                        <span className="inline-flex items-center gap-1 text-xs bg-[oklch(0.75_0.15_55)] text-white px-2 py-1 rounded-full">
                          NEU · PNG
                        </span>
                      </div>
                    </div>
                    <a 
                      href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/wAgGnqlabUDXlySo.png"
                      download
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[oklch(0.55_0.10_145)] hover:bg-[oklch(0.45_0.12_145)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Herunterladen
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 hover:border-[oklch(0.65_0.12_55)] transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[oklch(0.92_0.05_55)] flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-[oklch(0.55_0.14_55)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-1">Der Nebel (FOG)</h3>
                        <p className="text-sm text-muted-foreground mb-2">Fear, Obligation, Guilt – emotionale Muster erkennen</p>
                        <span className="inline-flex items-center gap-1 text-xs bg-[oklch(0.75_0.15_55)] text-white px-2 py-1 rounded-full">
                          NEU · PNG
                        </span>
                      </div>
                    </div>
                    <a 
                      href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/doxRJKzyLuIwYzXV.png"
                      download
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Herunterladen
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/materialien">
                  <Button variant="outline" className="gap-2">
                    Alle Materialien ansehen
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hinweise für verschiedene Angehörigengruppen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-[oklch(0.55_0.12_250)]" />
                Hinweise für Ihre Situation
              </h2>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.15_35)] bg-[oklch(0.97_0.01_35)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.06_35)] flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-[oklch(0.55_0.15_35)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als Partner/in</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ihre Beziehung ist nicht Ihre einzige Identität. Pflegen Sie Freundschaften und Hobbys ausserhalb der Partnerschaft. Es ist kein Verrat, Zeit für sich zu beanspruchen – es ist Überlebensstrategie.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.12_250)] bg-[oklch(0.97_0.01_250)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_250)] flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[oklch(0.55_0.12_250)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als Elternteil</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Elterliche Schuldgefühle sind normal, aber oft unbegründet. Borderline hat komplexe Ursachen – Sie haben nicht «versagt». Erlauben Sie sich, auch stolz auf das zu sein, was Sie richtig gemacht haben. Und: Sie dürfen auch mal wütend sein.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)] bg-[oklch(0.97_0.01_145)]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.92_0.04_145)] flex items-center justify-center flex-shrink-0">
                        <UserCircle className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">Als erwachsenes Kind</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sie mussten früh erwachsen werden und Verantwortung übernehmen, die nicht Ihre war. Selbstfürsorge kann sich fremd anfühlen – üben Sie sie trotzdem. Sie haben ein Recht auf ein eigenes Leben, ohne ständig verfügbar zu sein.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Evidenz-Layer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    Worauf stützt sich das?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Studien zeigen erhöhte Belastung bei Angehörigen von Menschen mit BPS (Hoffman et al., 2005)</li>
                    <li>• Atemübungen aktivieren den Parasympathikus und reduzieren Cortisol (Zaccaro et al., 2018)</li>
                    <li>• Soziale Unterstützung ist ein wichtiger Schutzfaktor gegen Burnout (Maslach & Leiter, 2016)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Abschluss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-[oklch(0.92_0.05_320)]/30 to-[oklch(0.88_0.04_145)]/30 border-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 text-[oklch(0.55_0.12_320)] mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Denken Sie daran
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sie sind wichtig. Ihre Gesundheit und Ihr Wohlbefinden sind wichtig. Indem Sie gut für sich sorgen, sorgen Sie auch besser für andere. Selbstfürsorge ist keine Selbstsucht – sie ist die Grundlage dafür, langfristig für Ihren Angehörigen da sein zu können.
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
              <Link href="/grenzen">
                <Button variant="ghost">
                  ← Grenzen setzen
                </Button>
              </Link>
              <Link href="/materialien">
                <Button className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Alle Materialien
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
