import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Heart, Clock, BookOpen, ExternalLink, ArrowRight, AlertTriangle, RefreshCw, Users, Download, Image as ImageIcon, Filter, Search, HandHeart } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import CleanMindCheck from "@/components/interactive/CleanMindCheck";
import ContentSection from "@/components/ContentSection";
import { TableOfContents } from "@/components/UXEnhancements";

const genesungCategories = [
  { id: "alle", label: "Alle", icon: Filter },
  { id: "verstehen", label: "Verstehen", icon: Search },
  { id: "handeln", label: "Handeln", icon: HandHeart },
];

const genesungItems = [
  {
    title: "Genesung in Zahlen",
    desc: "Orientierungs-Tracker mit Langzeitdaten",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/tyFTHNjsUagqrXiS.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/MunlHDCNqnsOhBFn.pdf",
    category: "verstehen",
  },
  {
    title: "Das Fortschritt-Paradox",
    desc: "Warum Rückfälle zum Weg gehören",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/DPkqytVYFcreeBlC.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/UFLdEEGIDxKdRUZO.pdf",
    category: "verstehen",
  },
  {
    title: "Remission vs. Heilung",
    desc: "Was Besserung wirklich bedeutet",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/HPRsNmCUFirjnraj.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/KMjqRDjDjWVZpjhJ.pdf",
    category: "verstehen",
  },
  {
    title: "5 Faktoren, die Genesung fördern",
    desc: "Säulen-Modell: Was positiv beeinflusst",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/mFhtxtPMBkCEVPII.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/qgrRYtMKOvwWmuah.pdf",
    category: "handeln",
  },
  {
    title: "Ihre Rolle im Genesungsprozess",
    desc: "Was Sie tun können (und was nicht)",
    img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/GhgPDkJhqlqJkYzE.webp",
    pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/CZdiDaadpIWNOBFb.pdf",
    category: "handeln",
  },
];

function GenesungInfografiken() {
  const [activeFilter, setActiveFilter] = useState("alle");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === "alle"
    ? genesungItems
    : genesungItems.filter(i => i.category === activeFilter);

  return (
    <ContentSection
      title="Genesung verstehen – auf einen Blick"
      icon={<ImageIcon className="w-6 h-6 text-sage-dark" />}
      id="infografiken"
      preview="Alle Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken."
    >
      <p className="text-muted-foreground mb-6">
        Alle Infografiken als hochauflösende PDFs zum Herunterladen und Ausdrucken.{" "}
        <strong className="text-foreground">Vorschau = Web-Bild.</strong> «PDF öffnen» öffnet die A4-Druckversion im neuen Tab – Download im PDF-Viewer oben rechts.
      </p>

      {/* Filter-Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genesungCategories.map(cat => {
          const count = cat.id === "alle" ? genesungItems.length : genesungItems.filter(i => i.category === cat.id).length;
          return (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveFilter(cat.id);
                setTimeout(() => {
                  gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className={`whitespace-nowrap shrink-0 ${activeFilter === cat.id ? "bg-terracotta-mid hover:bg-terracotta-dark text-white" : ""}`}
            >
              <cat.icon className="w-4 h-4 mr-1.5" />
              {cat.label} ({count})
            </Button>
          );
        })}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <Card key={item.title} className={`overflow-hidden border-border/50 hover:shadow-lg transition-all duration-500 group ${filteredItems.length > 1 && index === 0 ? "sm:col-span-2" : ""}`}>
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" width={400} height={223} decoding="async" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PDF öffnen: ${item.title} (neuer Tab)`}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-3 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                PDF öffnen
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/materialien">
          <Button variant="outline">
            Alle Materialien ansehen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </ContentSection>
  );
}

export default function Genesung() {
  return (
    <Layout>
      <SEO title="Genesung" description="Genesungswege bei Borderline – was Angehörige über Therapieerfolge wissen sollten." path="/genesung" />
      {/* Inhaltsverzeichnis */}
      <TableOfContents />
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/40 to-background relative overflow-hidden wave-divider">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-terracotta blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-sage blur-3xl" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-sage-darker" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Genesung ist <span className="text-sage-mid">möglich</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Entgegen früherer Annahmen zeigt die Forschung: Die Borderline-Persönlichkeitsstörung 
              hat eine der besten Prognosen unter den schweren psychischen Erkrankungen. 
              Die meisten Betroffenen erleben im Laufe der Zeit eine deutliche Besserung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kernbotschaft – bleibt immer offen */}
      <section className="py-12 md:py-16 wave-divider-top">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-sage/30 bg-gradient-to-br from-sage-wash to-cream">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      Was die Forschung zeigt
                    </h2>
                    <p className="text-muted-foreground">
                      Langzeitstudien über 10–24 Jahre belegen eindrücklich: Die meisten Menschen 
                      mit Borderline erleben eine signifikante Verbesserung ihrer Symptome.
                    </p>
                  </div>
                </div>

                {/* Statistiken */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 [&>*:first-child]:md:col-span-2">
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      85–93%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine symptomatische Remission innerhalb von 10 Jahren
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      50%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine vollständige Genesung mit guter Lebensqualität
                    </p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-sage-mid mb-2">
                      77%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      erreichen eine anhaltende Remission über 12+ Jahre
                    </p>
                  </div>
                </div>

                {/* Quellenhinweis */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    <strong>Quellen:</strong> McLean Study of Adult Development (Zanarini et al., 2010, 2012, 2024); 
                    Collaborative Longitudinal Personality Disorders Study (Gunderson et al., 2011)
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Aufklappbare Abschnitte */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">

              {/* ═══ 1. Was bedeutet Remission? ═══ */}
              <ContentSection
                title="Was bedeutet «Remission» und «Genesung»?"
                icon={<Clock className="w-6 h-6 text-terracotta-dark" />}
                id="remission"
                defaultOpen={true}
                preview="In der Forschung werden diese Begriffe präzise definiert, um Fortschritte messbar zu machen."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  In der Forschung werden diese Begriffe präzise definiert, um Fortschritte messbar zu machen.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-6">
                  <Card className="h-full border-border/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-terracotta-dark" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Symptomatische Remission
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Die Person erfüllt für mindestens 2 Jahre nicht mehr die diagnostischen Kriterien 
                        für BPD. Die typischen Symptome wie emotionale Instabilität, Impulsivität und 
                        Beziehungsprobleme sind deutlich zurückgegangen.
                      </p>
                      <div className="bg-terracotta-wash/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          <strong>85–93%</strong> der Betroffenen erreichen dies innerhalb von 10 Jahren.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full border-border/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center mb-4">
                        <Heart className="w-5 h-5 text-sage-darker" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Vollständige Genesung (Recovery)
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        Zusätzlich zur Remission: Die Person hat stabile Beziehungen, kann einer 
                        regelmässigen Arbeit oder Ausbildung nachgehen und erlebt eine gute 
                        allgemeine Lebensqualität.
                      </p>
                      <div className="bg-sage-light/30 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          <strong>50%</strong> erreichen diese umfassende Genesung innerhalb von 10 Jahren.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ContentSection>

              {/* ═══ 2. Das Fortschritt-Paradox ═══ */}
              <ContentSection
                title="Das Fortschritt-Paradox"
                icon={<RefreshCw className="w-6 h-6 text-terracotta-mid" />}
                id="fortschritt-paradox"
                preview="Fortschritt ist real – und trotzdem sind Rückschritte möglich. Das ist kein Scheitern, sondern ein bekanntes Muster."
              >
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ein häufiges Phänomen, das viele Angehörige verunsichert: Gerade wenn es besser wird, 
                  kommt ein Rückschritt. <span className="font-medium text-foreground">Das heisst nicht, dass alles umsonst war.</span> Oft 
                  sinkt in «guten Phasen» die Wachsamkeit – oder man steigert Tempo und Erwartungen zu schnell.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Hilfreich ist, Erfolge zu feiern <span className="italic">und</span> gleichzeitig einen kleinen Plan 
                  für schwierige Momente bereit zu haben.
                </p>

                {/* Warum passiert das? */}
                <Card className="border-l-4 border-l-terracotta-mid bg-terracotta-wash/30 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-terracotta-mid flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Warum passiert das?</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          In der <Link href="/glossar" className="text-foreground font-medium underline decoration-terracotta-mid/40 hover:decoration-terracotta-mid transition-colors">Dialektisch-Behavioralen Therapie (DBT)</Link> beschreibt Marsha Linehan ein Muster, 
                          das genau dieses Paradox erklärt – mit zwei typischen «Denkfallen»:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-terracotta-wash/50 border border-terracotta-mid/20">
                            <span className="text-sm font-semibold text-foreground block mb-1">🔴 «Alles-überstanden»-Modus</span>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Man fühlt sich sicher und denkt: «Das Problem liegt hinter mir.» 
                              Die Wachsamkeit sinkt, Warnsignale werden übersehen, alte Muster 
                              schleichen sich unbemerkt zurück.
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-sage-wash border border-sage-mid/20">
                            <span className="text-sm font-semibold text-foreground block mb-1">🟢 «Klarer-Kopf»-Modus</span>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Man freut sich über Fortschritte <span className="italic">und</span> bleibt realistisch: 
                              «Es läuft gut – und ich weiss, dass schwierige Momente kommen können. 
                              Dafür habe ich einen Plan.»
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                          Der «Klarer-Kopf»-Modus ist kein Pessimismus – er ist das Gegenteil: 
                          Erfolge geniessen, ohne die Augen zu verschliessen.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Praktischer Leitfaden */}
                <h3 className="font-semibold text-foreground mb-4">Was Sie als Angehörige konkret tun können</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { 
                      title: "Rückschritte nicht dramatisieren", 
                      desc: "Ein Rückschritt ist kein Beweis, dass ‹alles kaputt› ist. Er ist ein Signal, früh gegenzusteuern – nicht aufzugeben.",
                      color: "bg-terracotta-wash border-terracotta-mid/20"
                    },
                    { 
                      title: "Fortschritte konkret benennen", 
                      desc: "Statt ‹Du bist so viel besser› lieber: ‹Mir ist aufgefallen, dass du gestern ruhig geblieben bist, als es stressig wurde.›",
                      color: "bg-sage-wash border-sage-mid/20"
                    },
                    { 
                      title: "Tempo nicht übersteuern", 
                      desc: "Wenn es besser läuft, steigt die Versuchung, schnell ‹alles nachzuholen›. Besser: kleine Schritte beibehalten.",
                      color: "bg-sand-light border-border/50"
                    },
                    { 
                      title: "Einen Plan für schwierige Momente haben", 
                      desc: "Besprechen Sie gemeinsam vorher: ‹Was machen wir, wenn es wieder schwieriger wird?› Das nimmt beiden Seiten die Angst.",
                      color: "bg-sand-light border-border/50"
                    }
                  ].map((item, i) => (
                    <Card key={i} className={`border ${item.color}`}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Interaktiver Selbsttest */}
                <div className="mb-6">
                  <CleanMindCheck />
                </div>

                {/* Angehörigen-Zitat */}
                <div className="bg-background/60 border border-border/40 rounded-lg p-5 mb-6">
                  <blockquote className="text-foreground/80 italic leading-relaxed text-center">
                    <p className="mb-2">
                      «Am Anfang hat mich jeder Rückfall völlig aus der Bahn geworfen. Heute weiss ich: Ein schlechter Tag ist kein schlechtes Leben. Meine Tochter kämpft – und ich kämpfe mit ihr, aber nicht mehr gegen mich selbst.»
                    </p>
                    <footer className="text-sm text-muted-foreground not-italic">
                      – Angehörige, Selbsthilfegruppe Zürich
                    </footer>
                  </blockquote>
                </div>

                {/* Kernbotschaft */}
                <Card className="bg-sage-light/20 border-sage-mid/30 mb-6">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed text-center">
                      <span className="text-lg italic block mb-2">«Erwarte das Beste – und plane für die Stolperstellen.»</span>
                      <span className="text-sm text-muted-foreground">
                        Wie Spitzensportler: Sie glauben daran, jedes Rennen gewinnen zu können – 
                        obwohl sie wissen, dass sie auch schon verloren haben und wieder verlieren werden.
                      </span>
                    </p>
                  </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground">
                  Quellen: Linehan, M.M. (2015), <span className="italic">DBT Skills Training Handouts and Worksheets</span>, 2. Aufl., Handouts 17–18; 
                  Gunderson, J.G. (2011), <span className="italic">Guidelines for Families</span>
                </p>
              </ContentSection>

              {/* ═══ 3. Realistische Erwartungen ═══ */}
              <ContentSection
                title="Realistische Erwartungen"
                icon={<Heart className="w-6 h-6 text-sage-mid" />}
                id="realistische-erwartungen"
                preview={<>Was bedeutet <Link href="/glossar" className="underline decoration-sage-mid/40 hover:decoration-sage-mid transition-colors">Remission</Link> wirklich – und was nicht?</>}
              >
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <Link href="/glossar" className="text-foreground font-medium underline decoration-sage-mid/40 hover:decoration-sage-mid transition-colors">Remission</Link> bedeutet 
                  nicht «Heilung» im klassischen Sinn. Viele Menschen mit Borderline berichten, 
                  dass sie auch nach Jahren der Besserung noch mit bestimmten Mustern kämpfen – 
                  aber sie haben gelernt, damit umzugehen.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  In der <Link href="/glossar" className="text-foreground font-medium underline decoration-sage-mid/40 hover:decoration-sage-mid transition-colors">DBT</Link> gibt 
                  es dafür ein hilfreiches Prinzip: <span className="font-medium text-foreground">«Voll auf Kurs bleiben – 
                  und für Stolperstellen planen.»</span> Das bedeutet: Man strebt das Bestmögliche an, 
                  weiss aber, dass ein Ausrutscher kein Grund ist, alles hinzuwerfen. Stattdessen: 
                  früh gegensteuern, reparieren, weitermachen.
                </p>

                {/* Angehörigen-Zitat */}
                <Card className="bg-sage-light/20 border-sage-mid/30 mb-8">
                  <CardContent className="p-6">
                    <p className="text-foreground leading-relaxed text-lg text-center italic mb-3">
                      «Ich habe gelernt, mich über kleine Schritte zu freuen – und nicht mehr 
                      zu erwarten, dass alles auf einmal «gut» wird. Das hat uns beiden den Druck genommen.»
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      – Angehörige, Selbsthilfegruppe Zürich
                    </p>
                  </CardContent>
                </Card>

                {/* Was Remission bedeutet / nicht bedeutet */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">❌ Was Remission NICHT bedeutet:</span>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>Nie wieder schwierige Gefühle</li>
                      <li>Perfekte Beziehungen</li>
                      <li>Keine Unterstützung mehr nötig</li>
                      <li>Dass ein Rückschritt «Scheitern» bedeutet</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <span className="text-lg font-medium text-foreground block mb-2">✓ Was Remission bedeutet:</span>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>Bessere Emotionsregulation</li>
                      <li>Stabilere Beziehungen</li>
                      <li>Mehr Lebensqualität</li>
                      <li>Werkzeuge, um mit Rückschlägen umzugehen</li>
                    </ul>
                  </div>
                </div>

                {/* DBT-Prinzip: Dialectical Abstinence */}
                <Card className="border-l-4 border-l-sage-mid bg-sage-wash/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-6 h-6 text-sage-mid flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Was tun nach einem Rückschritt?</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                          Die <Link href="/glossar" className="text-foreground font-medium underline decoration-sage-mid/40 hover:decoration-sage-mid transition-colors">DBT</Link> empfiehlt 
                          ein klares Vorgehen – statt Schuld oder Panik:
                        </p>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {[
                            { step: "1", text: "Nicht dramatisieren – ein Ausrutscher ist kein Weltuntergang" },
                            { step: "2", text: "Sofort schauen: Was hat den Rückschritt ausgelöst?" },
                            { step: "3", text: "Wieder einsteigen – mit dem, was vorher funktioniert hat" }
                          ].map((item) => (
                            <div key={item.step} className="p-2.5 rounded-lg bg-background/60 border border-sage-mid/10">
                              <span className="text-sage-mid font-bold text-sm block mb-1">Schritt {item.step}</span>
                              <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          «Ein Ausrutscher ist kein Grund zur Katastrophe. Bleiben Sie weg von Schwarz-Weiss-Denken.» 
                          – Linehan (2015), Handout 17a
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground">
                  Quellen: Linehan, M.M. (2015), <span className="italic">DBT Skills Training Handouts and Worksheets</span>, 2. Aufl., Handouts 17–17a (Dialectical Abstinence); 
                  Zanarini et al. (2012), <span className="italic">Journal of Personality Disorders</span>
                </p>
              </ContentSection>

              {/* ═══ 4. Wie Sie zur Genesung beitragen können ═══ */}
              <ContentSection
                title="Wie Sie zur Genesung beitragen können"
                icon={<Users className="w-6 h-6 text-sage-mid" />}
                id="beitragen"
                preview="Als Angehöriger können Sie den Genesungsprozess positiv beeinflussen – ohne sich selbst aufzugeben."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Als Angehöriger können Sie den Genesungsprozess positiv beeinflussen – ohne sich selbst aufzugeben.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "Konsistenz", desc: "Bleiben Sie berechenbar und verlässlich. Ihre Stabilität gibt Halt." },
                    { title: "Realistische Hoffnung", desc: "Vermitteln Sie, dass Besserung möglich ist – ohne Druck." },
                    { title: "Eigene Grenzen", desc: "Ihre Stabilität ist Teil der Genesung. Achten Sie auf sich." },
                    { title: "Professionelle Hilfe", desc: "Unterstützen Sie den Therapieprozess, ohne ihn zu ersetzen." }
                  ].map((item, i) => (
                    <Card key={i} className={`border-border/50 hover:shadow-md transition-shadow ${i === 0 ? "sm:col-span-2" : ""}`}>
                      <CardContent className="p-5">
                        <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 5. Was fördert die Genesung? ═══ */}
              <ContentSection
                title="Was fördert die Genesung?"
                icon={<TrendingUp className="w-6 h-6 text-sage-mid" />}
                id="faktoren"
                preview="Die Forschung hat mehrere Faktoren identifiziert, die eine positive Entwicklung begünstigen."
              >
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Die Forschung hat mehrere Faktoren identifiziert, die eine positive Entwicklung begünstigen.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Spezialisierte Psychotherapie",
                      description: "Evidenzbasierte Therapien wie DBT (Dialektisch-Behaviorale Therapie), MBT (Mentalisierungsbasierte Therapie) oder Schematherapie zeigen die besten Ergebnisse. Die Therapie sollte von erfahrenen Fachpersonen durchgeführt werden.",
                      highlight: "DBT ist die am besten untersuchte Therapieform für BPD"
                    },
                    {
                      title: "Zeit und Geduld",
                      description: "Genesung ist ein Prozess, der Jahre dauern kann – nicht Wochen oder Monate. Die Langzeitstudien zeigen, dass viele Verbesserungen erst nach 4–10 Jahren sichtbar werden.",
                      highlight: "Die meisten Verbesserungen zeigen sich nach 4–10 Jahren"
                    },
                    {
                      title: "Stabile Beziehungen",
                      description: "Unterstützende Beziehungen – zu Familie, Freunden oder Partner:innen – können den Genesungsprozess positiv beeinflussen. Dabei ist es wichtig, dass Angehörige auch auf sich selbst achten.",
                      highlight: "Unterstützende Beziehungen fördern die Genesung"
                    },
                    {
                      title: "Strukturierter Alltag",
                      description: "Eine regelmässige Tagesstruktur, sinnvolle Beschäftigung (Arbeit, Ausbildung, Ehrenamt) und gesunde Routinen geben Halt und fördern die Stabilität.",
                      highlight: "Struktur und Beschäftigung geben Halt"
                    },
                    {
                      title: "Behandlung von Begleiterkrankungen",
                      description: "Viele Menschen mit BPD haben zusätzliche Diagnosen wie Depression, Angststörungen oder PTBS. Die Behandlung dieser Begleiterkrankungen ist wichtig für den Gesamtverlauf.",
                      highlight: "Begleiterkrankungen sollten mitbehandelt werden"
                    }
                  ].map((item, index) => (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                              {item.description}
                            </p>
                            <div className="inline-block bg-sage-wash rounded-full px-3 py-1">
                              <p className="text-xs text-sage-darker font-medium">
                                {item.highlight}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 6. Was bedeutet das für Angehörige? ═══ */}
              <ContentSection
                title="Was bedeutet das für Sie als Angehörige?"
                icon={<Heart className="w-6 h-6 text-terracotta-mid" />}
                id="fuer-angehoerige"
                preview="Hoffnung ist berechtigt, Geduld ist wichtig, Ihre Rolle ist wertvoll."
              >
                <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-6">
                  {[
                    {
                      title: "Hoffnung ist berechtigt",
                      text: "Die Forschung zeigt klar: Die meisten Menschen mit Borderline erleben eine deutliche Besserung. Auch wenn der Weg lang sein kann – Veränderung ist möglich und wahrscheinlich. Diese Erkenntnis kann Ihnen helfen, auch in schwierigen Phasen durchzuhalten."
                    },
                    {
                      title: "Geduld ist wichtig",
                      text: "Genesung braucht Zeit – oft Jahre, nicht Monate. Rückschläge gehören dazu und bedeuten nicht, dass keine Fortschritte gemacht werden. Versuchen Sie, den Blick auf langfristige Entwicklungen zu richten, nicht auf einzelne Krisen."
                    },
                    {
                      title: "Ihre Rolle ist wertvoll",
                      text: "Unterstützende Beziehungen können den Genesungsprozess positiv beeinflussen. Gleichzeitig ist es wichtig, dass Sie Ihre eigenen Grenzen wahren und auf Ihre Selbstfürsorge achten. Sie können nur unterstützen, wenn es Ihnen selbst gut geht."
                    },
                    {
                      title: "Professionelle Hilfe ist entscheidend",
                      text: "Die besten Ergebnisse werden mit spezialisierter Psychotherapie erzielt. Ermutigen Sie Ihren Angehörigen, professionelle Hilfe anzunehmen – aber akzeptieren Sie auch, dass Sie diese Entscheidung nicht erzwingen können."
                    }
                  ].map((item, i) => (
                    <Card key={i} className="h-full bg-white border-sage/20">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-sage-mid mb-4">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContentSection>

              {/* ═══ 7. Evidenz & Grenzen ═══ */}
              <ContentSection
                title="Evidenz & Grenzen"
                icon={<BookOpen className="w-6 h-6 text-sage-mid" />}
                id="evidenz"
                preview="Wissenschaftliche Grundlage, Einschränkungen und weiterführende Literatur."
              >
                <Card className="border-border/50">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Wissenschaftliche Grundlage</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          Die hier präsentierten Statistiken stammen aus den beiden grössten und 
                          längsten prospektiven Studien zum Verlauf der Borderline-Persönlichkeitsstörung:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-sage-mid">•</span>
                            <span><strong>McLean Study of Adult Development (MSAD)</strong> – 290 Teilnehmende, 
                            Follow-up über 24 Jahre (Zanarini et al.)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-sage-mid">•</span>
                            <span><strong>Collaborative Longitudinal Personality Disorders Study (CLPS)</strong> – 
                            175 Teilnehmende, Follow-up über 10 Jahre (Gunderson et al.)</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-foreground mb-2">Einschränkungen</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-sage-mid">•</span>
                            <span>Die Studien wurden hauptsächlich in den USA durchgeführt; kulturelle 
                            Unterschiede können die Übertragbarkeit beeinflussen.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-sage-mid">•</span>
                            <span>Die meisten Teilnehmenden waren zu Beginn stationär behandelt worden – 
                            ambulante Patient:innen könnten andere Verläufe zeigen.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-sage-mid">•</span>
                            <span>Symptomatische Remission bedeutet nicht automatisch gute Lebensqualität – 
                            funktionelle Beeinträchtigungen können bestehen bleiben.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <h3 className="font-medium text-foreground mb-3">Weiterführende Literatur</h3>
                        <div className="space-y-2">
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/20395399/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-sage-mid hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Zanarini et al. (2010): Time-to-Attainment of Recovery from BPD
                          </a>
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/21464343/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-sage-mid hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Gunderson et al. (2011): Ten-Year Course of BPD
                          </a>
                          <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/22737693/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-sage-mid hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Zanarini et al. (2012): 16-year prospective follow-up study
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ContentSection>

              {/* ═══ 8. Infografiken zum Herunterladen ═══ */}
              <GenesungInfografiken />

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-sand-muted wave-divider-top">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Wie können Sie unterstützen?
              </h2>
              <p className="text-muted-foreground mb-8">
                Erfahren Sie mehr darüber, wie Sie Ihren Angehörigen auf dem Weg zur Genesung 
                begleiten können – ohne sich selbst zu verlieren.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/unterstuetzen/uebersicht">
                  <Button className="bg-terracotta hover:bg-terracotta-mid">
                    Unterstützen lernen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/selbstfuersorge">
                  <Button variant="outline">
                    Selbstfürsorge
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
