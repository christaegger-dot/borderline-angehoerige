import SEO from "@/components/SEO";
import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Sparkles, ArrowRight, CheckCircle2, Heart, AlertTriangle, Users, 
  Clock, Brain, Wind, Lightbulb, Shield, BookOpen, Phone, Download, ExternalLink,
  ChevronDown, ChevronUp, UserCircle, Filter, Activity, Zap
} from "lucide-react";
import { Link } from "wouter";
import { kontaktById } from "@/data/kontakte";
import GroundingTimer from "@/components/interactive/GroundingTimer";
import SelbstfuersorgeCheck from "@/components/interactive/SelbstfuersorgeCheck";


const proMente = kontaktById("INFO_PROMENTE")!;
// useState and useRef imported at top
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";

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
    <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-wash/20 border-sage-mid">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-6 h-6 text-sage-mid" />
          <span className="font-semibold text-foreground text-base block" role="heading" aria-level={2}>4-4-6 Atemübung</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          Diese Atemtechnik aktiviert Ihren Parasympathikus und hilft, aus dem Stressmodus herauszukommen.
        </p>
        
        {isActive ? (
          <div className="text-center py-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-sage-mid/20 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-sage-dark">{count}</span>
            </div>
            <p className="text-lg font-medium text-sage-dark">
              {phase === 'einatmen' && 'Einatmen...'}
              {phase === 'halten' && 'Halten...'}
              {phase === 'ausatmen' && 'Langsam ausatmen...'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-sage-mid/20 flex items-center justify-center text-xs font-medium">1</span>
              4 Sekunden einatmen
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-sage-mid/20 flex items-center justify-center text-xs font-medium">2</span>
              4 Sekunden halten
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-sage-mid/20 flex items-center justify-center text-xs font-medium">3</span>
              6 Sekunden ausatmen
            </div>
            <Button 
              onClick={startUebung}
              className="w-full mt-4 bg-sage-mid hover:bg-sage-dark text-white"
            >
              Übung starten
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Akkordeon für Übungen (innerhalb der ContentSections)
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
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
        aria-expanded={isOpen}
        aria-label={`${title} ${isOpen ? 'zuklappen' : 'aufklappen'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-foreground">{title}</span>
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

const selbstfuersorgeInfografiken = [
  {
    id: "warnsignale",
    title: "Warnsignale der Überlastung",
    desc: "Ampel-Stufenmodell: Grün → Gelb → Rot – erkennen Sie rechtzeitig, wann es zu viel wird.",
    category: "erkennen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OEUNVdTyojBBYTic.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VdAxPxngFzgNImxg.pdf",
    featured: true,
  },
  {
    id: "sauerstoffmaske",
    title: "Die Sauerstoffmaske",
    desc: "Kreislauf-Diagramm: Teufelskreis vs. positiver Kreislauf – warum Selbstfürsorge keine Selbstsucht ist.",
    category: "erkennen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/IQwhlqUMporMKdmH.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/yIWenSfOeiUHdMIc.pdf",
  },
  {
    id: "radikale-akzeptanz",
    title: "Radikale Akzeptanz",
    desc: "2-Spalten-Vergleich: Was Radikale Akzeptanz NICHT ist vs. was sie IST, plus 4-Schritte-Übung.",
    category: "techniken",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OmxdguWaaXAkElDp.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/SkBpjnDHfNmPbmnd.pdf",
  },
  {
    id: "stopp-technik",
    title: "Die STOPP-Technik",
    desc: "5 Schritte aus der Stressspirale: Stopp, Tief atmen, Orientieren, Perspektive, Plan – in 30 Sekunden.",
    category: "techniken",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qvJDZrQvvOlErFQu.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/VnQKfkkQbPunhDed.pdf",
  },
  {
    id: "energie-konto",
    title: "Ihr Energie-Konto",
    desc: "Stock-&-Flow-Diagramm: Was füllt Ihre Batterie auf, was leert sie? Achten Sie auf die Balance.",
    category: "ressourcen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xqJbxqEDoAqplbhl.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/gvhhnlTvDmgPHFUq.pdf",
  },
  {
    id: "erlaubnis-karte",
    title: "Erlaubnis-Karte",
    desc: "9 Erlaubnisse, die sich Angehörige oft nicht geben – gültig ab sofort, unbefristet.",
    category: "ressourcen",
    webp: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/OMXnbczdvCPBRNTA.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DSOVugQyCvvOACIO.pdf",
  },
];

const selbstfuersorgeCategories = [
  { id: "alle", label: "Alle", icon: Filter, count: selbstfuersorgeInfografiken.length },
  { id: "erkennen", label: "Erkennen", icon: Activity, count: selbstfuersorgeInfografiken.filter(i => i.category === "erkennen").length },
  { id: "techniken", label: "Techniken", icon: Zap, count: selbstfuersorgeInfografiken.filter(i => i.category === "techniken").length },
  { id: "ressourcen", label: "Ressourcen", icon: Heart, count: selbstfuersorgeInfografiken.filter(i => i.category === "ressourcen").length },
];

export default function Selbstfuersorge() {
  const [sfActiveFilter, setSfActiveFilter] = useState("alle");
  const sfGridRef = useRef<HTMLDivElement>(null);
  const sfFilteredItems = sfActiveFilter === "alle" ? selbstfuersorgeInfografiken : selbstfuersorgeInfografiken.filter(i => i.category === sfActiveFilter);

  return (
    <Layout>
      <SEO title="Selbstfürsorge" description="Selbstfürsorge für Angehörige: Burnout vermeiden und eigene Bedürfnisse wahrnehmen." path="/selbstfuersorge" />
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-lighter flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-sage-mid" />
              </div>
              <span className="text-sm font-medium text-sage-mid">Lesezeit: 12 Minuten</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Selbstfürsorge für Angehörige
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Sie können nur dann für andere da sein, wenn Sie auch für sich selbst sorgen. Selbstfürsorge ist kein Luxus – sie ist eine Notwendigkeit für Ihre Gesundheit und Ihre Beziehung.
            </p>

            <Card className="bg-sage-lighter/20 border-sage-mid">
              <CardContent className="p-5">
                <p className="text-foreground leading-relaxed italic">
                  "Wenn Sie sich um einen Menschen mit Borderline kümmern, ist es wie bei einem Langstreckenflug: Setzen Sie zuerst Ihre eigene Sauerstoffmaske auf, bevor Sie anderen helfen."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Aufklappbare Abschnitte */}
      <section className="py-8 md:py-12 wave-divider-top">
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
                        <div className="w-2 h-2 rounded-full bg-terracotta-mid" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Selbstfürsorge ist daher keine Selbstsucht, sondern <strong className="text-foreground">Selbsterhaltung</strong>. Sie ermöglicht es Ihnen, langfristig für Ihren Angehörigen da zu sein – ohne selbst krank zu werden.
                  </p>
                </div>
              </ContentSection>

              {/* ═══ 2. Warnsignale für Überlastung ═══ */}
              <ContentSection
                title="Warnsignale für Überlastung"
                icon={<AlertTriangle className="w-6 h-6 text-terracotta-mid" />}
                id="warnsignale"
                preview="Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen:
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 [&>*:first-child]:sm:col-span-2">
                  <Card className="border-t-4 border-t-sand-mid bg-sand">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-sand-mid flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground">Emotional</h3>
                      </div>
                      <ul className="space-y-2">
                        {["Gereiztheit", "Hoffnungslosigkeit", "Emotionale Taubheit", "Schuldgefühle", "Kontrollverlust-Angst"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-sand-mid flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-t-4 border-t-terracotta-mid bg-terracotta-wash">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-terracotta-mid flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground">Körperlich</h3>
                      </div>
                      <ul className="space-y-2">
                        {["Erschöpfung", "Schlafprobleme", "Appetitveränderung", "Kopfschmerzen", "Infektanfälligkeit"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-terracotta-mid flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-t-4 border-t-slate-mid bg-slate-pale">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-mid flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground">Sozial</h3>
                      </div>
                      <ul className="space-y-2">
                        {["Rückzug", "Hobbys vernachlässigt", "Isolationsgefühl", "Vermeidung", "Nur noch Angehöriger"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-slate-mid flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6 bg-terracotta-mid/10 border-terracotta-mid">
                  <CardContent className="p-5">
                    <p className="text-foreground font-medium">
                      Wenn Sie mehrere dieser Warnsignale bei sich bemerken, ist es Zeit zu handeln. Sprechen Sie mit Ihrem Hausarzt oder suchen Sie professionelle Unterstützung.
                    </p>
                  </CardContent>
                </Card>
              </ContentSection>

              {/* ═══ Selbstfürsorge-Kurzcheck ═══ */}
              <div className="my-6">
                <SelbstfuersorgeCheck />
              </div>

              {/* ═══ 3. Sofort-Übungen ═══ */}
              <ContentSection
                title="Sofort-Übungen für akute Belastung"
                icon={<Clock className="w-6 h-6 text-sage-mid" />}
                id="sofort-uebungen"
                preview="Atemübung, 5-4-3-2-1 Grounding und STOPP-Technik – jederzeit anwendbar."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Diese Übungen können Sie jederzeit anwenden, wenn Sie merken, dass der Stress überhand nimmt:
                </p>
                
                <div className="grid md:grid-cols-[7fr_5fr] gap-4 mb-6">
                  <AtemuebungCard />
                  
                  <GroundingTimer />
                </div>

                
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-3">STOPP-Technik</h3>
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
                          <span className="w-8 h-8 rounded-lg bg-terracotta/20 flex items-center justify-center font-bold text-terracotta-mid">
                            {item.letter}
                          </span>
                          <span className="text-sm text-muted-foreground">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ContentSection>

              {/* ═══ 4. Langfristige Strategien ═══ */}
              <ContentSection
                title="Langfristige Selbstfürsorge-Strategien"
                icon={<Heart className="w-6 h-6 text-terracotta" />}
                id="langfristige-strategien"
                preview="Tägliche Mini-Auszeiten, Bewegung, soziale Kontakte und professionelle Unterstützung."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Neben den Sofort-Übungen brauchen Sie auch langfristige Strategien, um Ihre Gesundheit zu erhalten:
                </p>
                
                <div className="space-y-3">
                  <UebungAkkordeon 
                    title="Tägliche Mini-Auszeiten" 
                    icon={Clock}
                    color="bg-sage-mid"
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
                            <CheckCircle2 className="w-4 h-4 text-sage-mid" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Card className="bg-sage-wash/50 border-transparent">
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
                    color="bg-terracotta"
                  >
                    <div className="space-y-4 pt-4">
                      <p className="text-muted-foreground text-sm">
                        Körperliche Aktivität baut Stresshormone ab und setzt Endorphine frei. Schon 20 Minuten machen einen Unterschied.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {["Spaziergang in der Natur", "Yoga oder Stretching", "Schwimmen", "Tanzen (auch alleine zuhause)", "Gartenarbeit", "Radfahren"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-terracotta" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Card className="bg-terracotta-wash/50 border-transparent">
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
                    color="bg-slate-dark"
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
                            <CheckCircle2 className="w-4 h-4 text-slate-dark mt-0.5" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </UebungAkkordeon>
                  
                  <UebungAkkordeon 
                    title="Professionelle Unterstützung" 
                    icon={Shield}
                    color="bg-sage-mid"
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
              </ContentSection>

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
                      Der Austausch mit anderen Angehörigen kann enorm entlastend sein. Professionelle Beratungsstellen 
                      und Selbsthilfegruppen bieten Orientierung, praktische Tipps und das Gefühl, nicht allein zu sein.
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
                <Card className="bg-sage-wash/50 border-sage-mid/30 mb-6">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg italic text-center">
                      «Es ist, wie es ist.»
                    </p>
                    <p className="text-muted-foreground text-sm text-center mt-2">
                      – Dieser Satz kann befreiend sein.
                    </p>
                  </CardContent>
                </Card>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Radikale Akzeptanz bedeutet nicht, dass Sie die Situation gutheissen. Es bedeutet, dass Sie aufhören, gegen die Realität zu kämpfen. Dieses Konzept aus der <Link to="/glossar?q=DBT" className="underline decoration-sage-mid/40 underline-offset-2 hover:decoration-sage-mid transition-colors">DBT (Dialektisch-Behaviorale Therapie)</Link> kann auch für Angehörige sehr hilfreich sein.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">❌ Was radikale Akzeptanz NICHT ist:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Aufgeben</li>
                      <li>• Gutheissen</li>
                      <li>• Passivität</li>
                      <li>• Resignation</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">✓ Was radikale Akzeptanz IST:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Anerkennen, was Sie nicht ändern können</li>
                      <li>• Energie sparen für das, was Sie beeinflussen können</li>
                      <li>• Inneren Frieden finden trotz äusserer Turbulenzen</li>
                      <li>• Loslassen von «Es sollte anders sein»</li>
                    </ul>
                  </div>
                </div>
                
                <Card className="border-l-4 border-l-sage-mid">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-foreground mb-2">Übung: Radikale Akzeptanz praktizieren</h4>
                    <ol className="text-sm text-muted-foreground space-y-2">
                      <li><strong>1.</strong> Benennen Sie die Situation: «Es ist so, dass...»</li>
                      <li><strong>2.</strong> Spüren Sie den Widerstand: «Ich wünschte, es wäre anders.»</li>
                      <li><strong>3.</strong> Lassen Sie los: «Ich kann diese Realität nicht ändern.»</li>
                      <li><strong>4.</strong> Richten Sie den Fokus neu: «Was kann ich jetzt tun?»</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Quelle: Marsha M. Linehan, DBT Skills Training Manual (2015)
                </p>
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
                          <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ContentSection>

              {/* ═══ 8. Materialien zum Download ═══ */}
              <ContentSection
                title="Materialien zum Download"
                icon={<Download className="w-6 h-6 text-sage-mid" />}
                id="materialien-download"
                preview="Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken."
              >
                <p className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selbstfuersorgeCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={sfActiveFilter === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSfActiveFilter(cat.id);
                        setTimeout(() => {
                          sfGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                      className={`whitespace-nowrap shrink-0 ${sfActiveFilter === cat.id ? "bg-sage-dark hover:bg-sage-mid text-white" : ""}`}
                    >
                      <cat.icon className="w-4 h-4 mr-1.5" />
                      {cat.label} ({cat.count})
                    </Button>
                  ))}
                </div>

                <div ref={sfGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sfFilteredItems.map((item) => (
                    <Card key={item.id} className={`overflow-hidden border-border/50 hover:shadow-md transition-shadow ${item.featured && sfActiveFilter === "alle" ? "md:col-span-2" : ""}`}>
                      <div className="aspect-[3/4] overflow-hidden bg-muted">
                        <img src={item.webp} alt={item.title} className="w-full h-full object-cover object-top" loading="lazy" width={400} height={223} decoding="async" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground mb-1 text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> PDF öffnen
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/materialien">
                    <Button variant="outline" size="sm">
                      Alle Materialien anzeigen
                    </Button>
                  </Link>
                </div>
              </ContentSection>

              {/* ═══ 9. Hinweise für Ihre Situation ═══ */}
              <ContentSection
                title="Hinweise für Ihre Situation"
                icon={<UserCircle className="w-6 h-6 text-slate-mid" />}
                id="ihre-situation"
                preview="Spezifische Hinweise für Partner/innen, Elternteile und erwachsene Kinder."
              >
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-terracotta-lighter flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-terracotta-mid" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Als Partner/in</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Ihre Beziehung ist nicht Ihre einzige Identität. Pflegen Sie Freundschaften und Hobbys ausserhalb der Partnerschaft. Es ist kein Verrat, Zeit für sich zu beanspruchen – es ist Überlebensstrategie.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-slate-mid bg-slate-pale">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-lighter flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-slate-mid" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Als Elternteil</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Elterliche Schuldgefühle sind normal, aber oft unbegründet. Borderline hat komplexe Ursachen – Sie haben nicht «versagt». Erlauben Sie sich, auch stolz auf das zu sein, was Sie richtig gemacht haben. Und: Sie dürfen auch mal wütend sein.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-sage-mid bg-sage-pale">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sage-lighter flex items-center justify-center flex-shrink-0">
                          <UserCircle className="w-5 h-5 text-sage-mid" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Als erwachsenes Kind</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Sie mussten früh erwachsen werden und Verantwortung übernehmen, die nicht Ihre war. Selbstfürsorge kann sich fremd anfühlen – üben Sie sie trotzdem. Sie haben ein Recht auf ein eigenes Leben, ohne ständig verfügbar zu sein.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ContentSection>

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
                className="mb-12 wave-divider-top"
                style={{ '--wave-color': 'var(--background)' } as React.CSSProperties}
              >
                <Card className="bg-gradient-to-br from-sage-lighter/30 to-sage-light/30 border-transparent">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="w-10 h-10 text-sage-mid mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
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
                  <Button className="bg-terracotta hover:bg-terracotta-mid text-white">
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
