import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Brain, Heart, AlertCircle, Lightbulb, ArrowRight, Download, Image, FileText, Waves, UserX, Fingerprint, Contrast, Zap, Scissors, Clock, RefreshCw, Layers, Users, Activity, XCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";

export default function Verstehen() {
  return (
    <Layout>
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[oklch(0.88_0.04_145)]/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.04_145)] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[oklch(0.45_0.08_145)]" />
              </div>
              <span className="text-sm font-medium text-[oklch(0.45_0.08_145)]">Lesezeit: 15 Minuten</span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Borderline verstehen
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Die Borderline-Persönlichkeitsstörung ist eine komplexe Erkrankung, die das Erleben und Verhalten tiefgreifend beeinflusst. Hier erfahren Sie, was dahinter steckt – und warum dieses Wissen Ihnen helfen kann.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="border-l-4 border-l-[oklch(0.65_0.08_145)] bg-[oklch(0.88_0.04_145)]/20">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic">
                    "Wenn ich verstehe, warum mein Angehöriger so reagiert, kann ich anders damit umgehen. Nicht besser oder schlechter – anders. Und das macht einen riesigen Unterschied."
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">— Eine Angehörige</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Was ist Borderline */}
            <ContentSection
              title="Was ist Borderline?"
              icon={<Brain className="w-7 h-7 text-[oklch(0.65_0.08_145)]" />}
              id="was-ist-borderline"
              defaultOpen={true}
              preview="Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die durch intensive Emotionen, instabile Beziehungen und ein schwankendes Selbstbild gekennzeichnet ist."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Die Borderline-Persönlichkeitsstörung (BPS) ist eine psychische Erkrankung, die durch intensive Emotionen, instabile Beziehungen und ein schwankendes Selbstbild gekennzeichnet ist. Menschen mit Borderline erleben Gefühle oft viel intensiver als andere – sowohl positive als auch negative.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Stellen Sie sich vor, Sie hätten keine "Haut" für Ihre Emotionen. Jedes Gefühl trifft Sie mit voller Wucht, ohne Puffer. Das ist die Realität vieler Menschen mit Borderline.
                </p>
              </div>
            </ContentSection>

            {/* Die 9 DSM-5 Kriterien */}
            <ContentSection
              title="Die 9 DSM-5 Kriterien"
              icon={<AlertCircle className="w-7 h-7 text-[oklch(0.65_0.12_55)]" />}
              id="symptome"
              preview="Für eine Diagnose müssen mindestens 5 von 9 Kriterien erfüllt sein."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Für eine Diagnose müssen mindestens <strong>5 von 9 Kriterien</strong> erfüllt sein. Hier sind alle Kriterien verständlich erklärt:
              </p>
              
              <div className="space-y-3">
                {[
                  {
                    num: "1",
                    title: "Verzweifelte Bemühungen, Verlassenwerden zu vermeiden",
                    example: "Panische Anrufe, wenn der Partner später kommt; extreme Reaktionen auf kleine Trennungen",
                    color: "oklch(0.55_0.15_25)"
                  },
                  {
                    num: "2",
                    title: "Instabile, intensive Beziehungen",
                    example: "Wechsel zwischen Idealisierung («Du bist perfekt!») und Entwertung («Du bist das Schlimmste!»)",
                    color: "oklch(0.65_0.12_55)"
                  },
                  {
                    num: "3",
                    title: "Identitätsstörung: instabiles Selbstbild",
                    example: "Unsicherheit über Ziele, Werte, Berufswahl, Freundschaften, sexuelle Orientierung",
                    color: "oklch(0.45_0.08_250)"
                  },
                  {
                    num: "4",
                    title: "Impulsivität in mindestens zwei Bereichen",
                    example: "Geldausgaben, Essanfälle, Substanzmissbrauch, riskantes Fahren, ungeschützter Sex",
                    color: "oklch(0.60_0.15_85)"
                  },
                  {
                    num: "5",
                    title: "Wiederkehrende Suiziddrohungen oder Selbstverletzung",
                    example: "Ritzen, Verbrennen, Suizidankündigungen – oft als Versuch, unerträgliche Gefühle zu regulieren",
                    color: "oklch(0.50_0.18_25)"
                  },
                  {
                    num: "6",
                    title: "Affektive Instabilität",
                    example: "Intensive Stimmungswechsel innerhalb von Stunden – von Euphorie zu Verzweiflung",
                    color: "oklch(0.55_0.12_55)"
                  },
                  {
                    num: "7",
                    title: "Chronisches Gefühl der Leere",
                    example: "«Ich fühle mich wie ein schwarzes Loch» – ein tiefes, anhaltendes Gefühl von Hohlheit",
                    color: "oklch(0.35_0.02_250)"
                  },
                  {
                    num: "8",
                    title: "Unangemessene, heftige Wut",
                    example: "Wutausbrüche, die für Aussenstehende übertrieben wirken; Schwierigkeit, Wut zu kontrollieren",
                    color: "oklch(0.55_0.20_25)"
                  },
                  {
                    num: "9",
                    title: "Vorübergehende paranoide oder dissoziative Symptome",
                    example: "Unter Stress: Misstrauen, Gefühl der Unwirklichkeit, «neben sich stehen»",
                    color: "oklch(0.45_0.05_250)"
                  }
                ].map((item) => (
                  <Card key={item.num} className="border-l-4" style={{ borderLeftColor: item.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.num}
                        </span>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground italic">{item.example}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Diagnostic and Statistical Manual of Mental Disorders, 5th Edition (DSM-5), American Psychiatric Association
              </p>
            </ContentSection>

            {/* Ursachen: Bio-Psycho-Soziales Modell */}
            <ContentSection
              title="Ursachen: Das Bio-Psycho-Soziale Modell"
              icon={<Layers className="w-7 h-7 text-[oklch(0.55_0.10_145)]" />}
              id="ursachen"
              preview="Borderline entsteht nicht durch eine Ursache, sondern durch das Zusammenspiel biologischer, psychologischer und sozialer Faktoren."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Borderline entsteht nicht durch <em>eine</em> Ursache, sondern durch das Zusammenspiel mehrerer Faktoren. Niemand ist «schuld» – weder die Betroffenen noch die Angehörigen.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-t-4 border-t-[oklch(0.55_0.15_25)]">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.95_0.05_25)] flex items-center justify-center mb-3">
                      <Brain className="w-5 h-5 text-[oklch(0.55_0.15_25)]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Biologisch</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Genetische Veranlagung (30-60%)</li>
                      <li>• Veränderungen in Hirnstrukturen</li>
                      <li>• Überempfindliches Stresssystem</li>
                      <li>• Neurotransmitter-Ungleichgewicht</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.95_0.03_145)] flex items-center justify-center mb-3">
                      <Heart className="w-5 h-5 text-[oklch(0.55_0.10_145)]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Psychologisch</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Frühe Bindungserfahrungen</li>
                      <li>• Emotionale Vernachlässigung</li>
                      <li>• Traumatische Erlebnisse</li>
                      <li>• Invalidierung von Gefühlen</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-t-4 border-t-[oklch(0.45_0.08_250)]">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.95_0.02_250)] flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-[oklch(0.45_0.08_250)]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Sozial</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Instabile Familienverhältnisse</li>
                      <li>• Fehlende soziale Unterstützung</li>
                      <li>• Mobbing oder Ausgrenzung</li>
                      <li>• Kulturelle Faktoren</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-[oklch(0.95_0.02_145)]/50 border-[oklch(0.55_0.10_145)]/30">
                <CardContent className="p-5">
                  <p className="text-foreground leading-relaxed">
                    <strong>Wichtig für Angehörige:</strong> Auch wenn frühe Erfahrungen eine Rolle spielen, bedeutet das nicht, dass Eltern «schuld» sind. Viele Faktoren liegen ausserhalb der Kontrolle von Familien. Schuldzuweisungen helfen niemandem – Verständnis und Unterstützung schon.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quelle: Linehan, M.M. (1993); Paris, J. (2019). Borderline Personality Disorder
              </p>
            </ContentSection>

            {/* Neurobiologie */}
            <ContentSection
              title="Das Gehirn bei Borderline"
              icon={<Activity className="w-7 h-7 text-[oklch(0.50_0.12_320)]" />}
              id="neurobiologie"
              preview="Neurowissenschaftliche Forschung zeigt: Bei Borderline funktionieren bestimmte Hirnregionen anders."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Neurowissenschaftliche Forschung zeigt: Bei Borderline funktionieren bestimmte Hirnregionen anders. Das erklärt, warum Betroffene Emotionen so intensiv erleben.
              </p>
              
              <div className="space-y-4">
                <Card className="border-l-4 border-l-[oklch(0.55_0.20_25)]">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[oklch(0.55_0.20_25)] text-white flex items-center justify-center text-sm font-bold">A</span>
                      Amygdala – Das Alarmzentrum
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Die Amygdala ist bei Borderline <strong>überaktiv</strong>. Sie reagiert stärker und schneller auf emotionale Reize – besonders auf Gesichtsausdrücke, die als bedrohlich interpretiert werden könnten.
                    </p>
                    <div className="bg-[oklch(0.95_0.03_25)] rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> Deshalb können neutrale Gesichtsausdrücke als ablehnend wahrgenommen werden. Es ist keine Absicht – das Gehirn interpretiert anders.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.55_0.10_145)]">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[oklch(0.55_0.10_145)] text-white flex items-center justify-center text-sm font-bold">H</span>
                      Hippocampus – Das Gedächtniszentrum
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Der Hippocampus ist bei vielen Betroffenen <strong>verkleinert</strong>. Er ist zuständig für Gedächtnis und das Einordnen von Erfahrungen in einen Kontext.
                    </p>
                    <div className="bg-[oklch(0.95_0.02_145)] rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> In Krisen kann es schwer sein, sich an positive Erfahrungen zu erinnern. «Du hast mich NIE unterstützt» ist keine Lüge – in diesem Moment ist die Erinnerung blockiert.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-[oklch(0.45_0.08_250)]">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[oklch(0.45_0.08_250)] text-white flex items-center justify-center text-sm font-bold">P</span>
                      Präfrontaler Kortex – Die Kontrollinstanz
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Der präfrontale Kortex ist für rationales Denken, Impulskontrolle und Emotionsregulation zuständig. Bei Borderline ist die <strong>Verbindung zur Amygdala geschwächt</strong>.
                    </p>
                    <div className="bg-[oklch(0.95_0.02_250)] rounded-lg p-3">
                      <p className="text-xs text-foreground">
                        <strong>Für Angehörige:</strong> In emotionalen Momenten ist der «rationale Teil» des Gehirns quasi offline. Deshalb helfen logische Argumente in Krisen nicht – erst muss die Amygdala beruhigt werden.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-[oklch(0.92_0.04_55)]/30 border-[oklch(0.65_0.12_55)]/50">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground mb-2">Die gute Nachricht: Neuroplastizität</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Das Gehirn kann sich verändern. Durch Therapie (besonders DBT) können neue neuronale Verbindungen entstehen. Studien zeigen, dass sich die Hirnaktivität nach erfolgreicher Therapie normalisieren kann.
                  </p>
                </CardContent>
              </Card>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quellen: Marcus Jähn, U.M.W.E.G.©-Methode; Schmahl & Bremner (2006); Ruocco et al. (2013)
              </p>
            </ContentSection>

            {/* Häufige Missverständnisse */}
            <ContentSection
              title="Häufige Missverständnisse"
              icon={<XCircle className="w-7 h-7 text-[oklch(0.55_0.15_25)]" />}
              id="missverstaendnisse"
              preview="Über Borderline kursieren viele Mythen. Hier ist, was nicht stimmt."
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Über Borderline kursieren viele Mythen. Hier ist, was <strong>nicht</strong> stimmt:
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    myth: "«Borderliner manipulieren absichtlich»",
                    truth: "Das Verhalten ist keine bewusste Strategie, sondern ein verzweifelter Versuch, mit überwältigenden Emotionen umzugehen. Es fehlen oft die Fähigkeiten, Bedürfnisse anders auszudrücken."
                  },
                  {
                    myth: "«Borderline ist unheilbar»",
                    truth: "Studien zeigen: 85-90% der Betroffenen erfüllen nach 10 Jahren nicht mehr die Diagnosekriterien. Mit Therapie ist deutliche Besserung möglich."
                  },
                  {
                    myth: "«Sie könnten sich zusammenreissen, wenn sie wollten»",
                    truth: "Borderline ist eine anerkannte psychische Erkrankung mit neurobiologischen Grundlagen. Es ist keine Frage des Willens, sondern der Fähigkeiten – die erlernbar sind."
                  },
                  {
                    myth: "«Nur Frauen haben Borderline»",
                    truth: "Borderline betrifft alle Geschlechter etwa gleich häufig. Männer werden jedoch seltener diagnostiziert, da sie oft andere Symptome zeigen (mehr Wut, weniger Selbstverletzung)."
                  },
                  {
                    myth: "«Borderliner sind gefährlich»",
                    truth: "Menschen mit Borderline sind viel häufiger Opfer als Täter. Die Aggression richtet sich meist gegen sich selbst, nicht gegen andere."
                  },
                  {
                    myth: "«Das ist nur Aufmerksamkeitssuche»",
                    truth: "Selbstverletzendes Verhalten ist ein ernsthafter Bewältigungsversuch für unerträgliche Gefühle – kein Ruf nach Aufmerksamkeit. Es verdient Mitgefühl, nicht Verurteilung."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-[oklch(0.55_0.15_25)] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-[oklch(0.55_0.15_25)] mb-2">{item.myth}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            <strong className="text-foreground">Realität:</strong> {item.truth}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Quellen: APA Practice Guideline (2024); Zanarini et al. (2012); Grant et al. (2008)
              </p>
            </ContentSection>

            {/* Kernsymptome */}
            <ContentSection
              title="Die Kernsymptome im Überblick"
              icon={<AlertCircle className="w-7 h-7 text-[oklch(0.65_0.12_55)]" />}
              id="kernsymptome"
              preview="Emotionale Instabilität, Verlassensangst, instabiles Selbstbild und weitere Kernsymptome verständlich erklärt."
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Emotionale Instabilität",
                    description: "Schnelle, intensive Stimmungswechsel, die von aussen oft nicht nachvollziehbar erscheinen.",
                    icon: Waves,
                    color: "oklch(0.65_0.12_55)",
                    bgColor: "oklch(0.92_0.06_55)"
                  },
                  {
                    title: "Verlassensangst",
                    description: "Intensive Angst vor Zurückweisung oder Verlassenwerden, die zu verzweifelten Versuchen führen kann, dies zu verhindern.",
                    icon: UserX,
                    color: "oklch(0.55_0.15_25)",
                    bgColor: "oklch(0.92_0.05_25)"
                  },
                  {
                    title: "Instabiles Selbstbild",
                    description: "Unsicherheit darüber, wer man ist, was man will und welche Werte man hat.",
                    icon: Fingerprint,
                    color: "oklch(0.45_0.08_250)",
                    bgColor: "oklch(0.92_0.03_250)"
                  },
                  {
                    title: "Schwarz-Weiss-Denken",
                    description: "Die Tendenz, Menschen und Situationen als entweder 'ganz gut' oder 'ganz schlecht' zu sehen.",
                    icon: Contrast,
                    color: "oklch(0.35_0.02_250)",
                    bgColor: "oklch(0.92_0.01_250)"
                  },
                  {
                    title: "Impulsivität",
                    description: "Handlungen ohne Nachdenken über die Konsequenzen, oft in Bereichen wie Geldausgaben, Essen oder Beziehungen.",
                    icon: Zap,
                    color: "oklch(0.60_0.15_85)",
                    bgColor: "oklch(0.92_0.05_85)"
                  },
                  {
                    title: "Selbstverletzendes Verhalten",
                    description: "Handlungen, die dem eigenen Körper schaden, oft als Versuch, intensive Emotionen zu regulieren.",
                    icon: Scissors,
                    color: "oklch(0.65_0.08_145)",
                    bgColor: "oklch(0.92_0.04_145)"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: item.bgColor }}
                          >
                            <Icon className="w-6 h-6" style={{ color: item.color }} />
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ContentSection>

            {/* Emotionale Demenz */}
            <ContentSection
              title="«Emotionale Demenz» – Warum Argumente nicht helfen"
              icon={<Clock className="w-7 h-7 text-[oklch(0.55_0.15_25)]" />}
              id="emotionale-demenz"
              preview="In akuter emotionaler Überflutung existiert weder Vergangenheit noch Zukunft – nur das überwältigende Jetzt."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Wenn ein Mensch in akuter emotionaler Überflutung ist, funktioniert sein Gehirn anders. Marcus Jähn beschreibt dies als <strong>«emotionale Demenz»</strong>: In diesem Zustand existiert weder Vergangenheit noch Zukunft – nur das überwältigende Jetzt.
                </p>
                
                <Card className="bg-[oklch(0.95_0.03_25)]/50 border-[oklch(0.55_0.15_25)]/30 mb-6">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Warum das wichtig ist:</strong> Logische Argumente helfen in Krisenmomenten nicht. Das Gehirn kann sie schlicht nicht verarbeiten. Erst wenn die Amygdala (das Angstzentrum) beruhigt ist, wird der präfrontale Kortex (rationales Denken) wieder zugänglich.
                    </p>
                  </CardContent>
                </Card>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[oklch(0.95_0.02_25)] border border-[oklch(0.55_0.15_25)]/20">
                    <span className="text-lg font-medium text-foreground block mb-2">❌ Was nicht hilft:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>«Beruhige dich doch!»</li>
                      <li>«Das ist doch nicht so schlimm»</li>
                      <li>«Denk mal logisch nach»</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[oklch(0.95_0.03_145)] border border-[oklch(0.55_0.10_145)]/20">
                    <span className="text-lg font-medium text-foreground block mb-2">✓ Was hilft:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Präsent sein, ohne zu urteilen</li>
                      <li>Gefühle anerkennen</li>
                      <li>Warten, bis die Welle abebbt</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Quelle: Marcus Jähn, U.M.W.E.G.©-Methode; Neurowissenschaftliche Grundlagen nach LeDoux (1996)
                </p>
              </div>
            </ContentSection>

            {/* 4-Phasen-Zyklus */}
            <ContentSection
              title="Der 4-Phasen-Zyklus"
              icon={<RefreshCw className="w-7 h-7 text-[oklch(0.45_0.08_250)]" />}
              id="4-phasen-zyklus"
              preview="Viele Angehörige berichten von einem wiederkehrenden Muster: Explosion, Schweigen, Freundlichkeit, Verschlechterung."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Viele Angehörige berichten von einem wiederkehrenden Muster. Dieses Muster zu kennen, hilft Ihnen, nicht jede Phase persönlich zu nehmen – und sich auf die nächste vorzubereiten.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { phase: "1", title: "Explosion", desc: "Intensive Emotionen brechen aus", color: "oklch(0.55_0.20_25)", bgColor: "oklch(0.95_0.05_25)" },
                    { phase: "2", title: "Schweigen", desc: "Rückzug und Isolation", color: "oklch(0.45_0.08_250)", bgColor: "oklch(0.95_0.03_250)" },
                    { phase: "3", title: "Freundlichkeit", desc: "Ruhige, oft liebevolle Phase", color: "oklch(0.55_0.10_145)", bgColor: "oklch(0.95_0.03_145)" },
                    { phase: "4", title: "Verschlechterung", desc: "Spannung baut sich auf", color: "oklch(0.55_0.12_55)", bgColor: "oklch(0.95_0.04_55)" }
                  ].map((item) => (
                    <div key={item.phase} className="text-center p-4 rounded-xl" style={{ backgroundColor: item.bgColor }}>
                      <div 
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.phase}
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <Card className="mt-6 border-l-4 border-l-[oklch(0.55_0.10_145)] bg-[oklch(0.95_0.02_145)]/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Wichtig:</strong> Dieser Zyklus ist kein Schicksal. Mit Therapie und Unterstützung können die Phasen weniger intensiv werden und die stabilen Zeiten länger dauern.
                    </p>
                  </CardContent>
                </Card>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Quelle: Mason & Kreger, «Schluss mit dem Eiertanz» (2010)
                </p>
              </div>
            </ContentSection>

            {/* Warum ist das wichtig */}
            <ContentSection
              title="Warum ist dieses Wissen wichtig?"
              icon={<Lightbulb className="w-7 h-7 text-[oklch(0.60_0.15_85)]" />}
              id="warum-wichtig"
              preview="Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen nicht gegen Sie gerichtet ist, können Sie anders reagieren."
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Wenn Sie verstehen, dass das Verhalten Ihres Angehörigen nicht gegen Sie gerichtet ist, sondern Ausdruck einer Erkrankung, können Sie anders reagieren. Sie können:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { text: "Verhalten von Person trennen", sub: "und weniger persönlich nehmen", icon: "🎯" },
                    { text: "Muster erkennen", sub: "und früher deeskalieren", icon: "🔍" },
                    { text: "Mitgefühl entwickeln", sub: "ohne sich selbst aufzugeben", icon: "💚" },
                    { text: "Realistische Erwartungen haben", sub: "an sich und an Ihren Angehörigen", icon: "⚖️" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[oklch(0.97_0.015_85)] border border-border/30">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <span className="font-medium text-foreground block">{item.text}</span>
                        <span className="text-sm text-muted-foreground">{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContentSection>

            {/* Materialien zum Download – Kategorie 1: Verstehen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
              id="materialien"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <Download className="w-8 h-8 text-[oklch(0.45_0.08_145)]" />
                Infografiken zum Thema
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Diese Infografiken fassen die wichtigsten Konzepte zum Verstehen von Borderline zusammen. 
                Klicken Sie auf ein Bild für die Vollansicht oder laden Sie es direkt herunter.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1.1 Leuchtturm */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zUJsXECPDUPuIxKP.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/zUJsXECPDUPuIxKP.webp" 
                        alt="Der Leuchtturm – Ihre Rolle als Angehörige/r"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Der Leuchtturm</h3>
                    <p className="text-sm text-muted-foreground mb-3">Ihre Rolle als Angehörige/r: Stabil bleiben trotz Sturm.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/aGFxQRURQcMiVRbs.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* 1.2 Eisberg */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ZwsWnqLofvcvpMaZ.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ZwsWnqLofvcvpMaZ.webp" 
                        alt="Der Eisberg – Wut ist oft die Spitze"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Der Eisberg</h3>
                    <p className="text-sm text-muted-foreground mb-3">Wut ist oft nur die Spitze – darunter liegen Schmerz und Angst.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ctvGVbdDNWreFnVo.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* 1.3 Spaltung */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BwqZmzcxPLdpGBOL.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BwqZmzcxPLdpGBOL.webp" 
                        alt="Spaltung – das Pendel zwischen Extremen"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Spaltung</h3>
                    <p className="text-sm text-muted-foreground mb-3">Das Pendel zwischen Extremen – die Grauzone stärken.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MmTaAMmsDWFnKegB.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* 1.4 Alarm-Modus vs. Denk-Modus */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UwkFCuhnGKuGlfxd.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UwkFCuhnGKuGlfxd.webp" 
                        alt="Alarm-Modus vs. Denk-Modus"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Alarm-Modus vs. Denk-Modus</h3>
                    <p className="text-sm text-muted-foreground mb-3">Erst beruhigen, dann klären – warum Logik manchmal nicht ankommt.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/xEugiONCOEPRnzAk.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* 1.5 4-Phasen-Zyklus */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BVJkEshGOYQYPKXY.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/BVJkEshGOYQYPKXY.webp" 
                        alt="Der 4-Phasen-Zyklus"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Der 4-Phasen-Zyklus</h3>
                    <p className="text-sm text-muted-foreground mb-3">Das vorhersehbare Muster – Krisen folgen oft einem Ablauf.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/ixtfXLgxmZJawKhi.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* 1.6 Gehirn verstehen */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/lrvRCgtlqzJxXloX.webp" target="_blank" rel="noopener noreferrer">
                    <div className="aspect-[3/4] bg-muted">
                      <img 
                        src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/lrvRCgtlqzJxXloX.webp" 
                        alt="Das Gehirn verstehen"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">Das Gehirn verstehen</h3>
                    <p className="text-sm text-muted-foreground mb-3">Neurobiologie einfach erklärt – warum Stress Denken blockiert.</p>
                    <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KVAAxkRpNMpEuKyQ.pdf" download>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        PDF herunterladen
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 text-center">
                <Link href="/materialien">
                  <Button variant="outline">
                    Alle Materialien anzeigen
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hoffnung */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-[oklch(0.88_0.04_145)]/30 border-[oklch(0.65_0.08_145)]">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-[oklch(0.65_0.08_145)] flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        Genesung ist möglich
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Die Forschung zeigt: Mit der richtigen Behandlung können die meisten Menschen mit Borderline eine deutliche Verbesserung erleben. Nach 10 Jahren erfüllen etwa 85% der Betroffenen nicht mehr die diagnostischen Kriterien.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quelle: Zanarini et al. (2012), Journal of Personality Disorders
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6">
                Jetzt, da Sie die Grundlagen verstehen, erfahren Sie, wie Sie konkret unterstützen können.
              </p>
              <Link href="/unterstuetzen/uebersicht">
                <Button size="lg" className="bg-[oklch(0.65_0.12_55)] hover:bg-[oklch(0.55_0.14_55)] text-white">
                  Weiter zu: Unterstützen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
