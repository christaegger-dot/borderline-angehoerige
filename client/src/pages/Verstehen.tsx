import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Heart,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/UXEnhancements";
import ContentSection from "@/components/ContentSection";
import EvidenceNote from "@/components/EvidenceNote";
import VerstehenMaterialsSection from "@/sections/VerstehenMaterialsSection";
import {
  VerstehenDiagnosticSection,
  VerstehenMeaningSection,
  VerstehenRelationshipSection,
} from "@/sections/VerstehenSupportSections";

const verstehenIntroCards = [
  {
    icon: Heart,
    title: "Belastung einordnen",
    text: "Ambivalenz, Alarm, Erschöpfung und Loyalitätsdruck als typische Angehörigenrealität lesen.",
    iconClass: "text-sage-mid",
    shellClass: "bg-sage-wash border-sage-light/70",
  },
  {
    icon: Brain,
    title: "Dynamiken verstehen",
    text: "Überflutung, Bindungsstress und Denkverengung besser erkennen, statt nur auf sichtbare Reaktionen zu schauen.",
    iconClass: "text-slate-mid",
    shellClass: "bg-slate-wash border-slate-light/80",
  },
  {
    icon: RefreshCw,
    title: "Muster sehen",
    text: "Wiederkehrende Schleifen aus Eskalation, Rückzug und Schuld nüchterner lesen und benennen.",
    iconClass: "text-terracotta-mid",
    shellClass: "bg-terracotta-wash border-terracotta-light/80",
  },
] as const;

const verstehenQuickLinks = [
  {
    id: "angehoerige-erleben",
    title: "Was Angehörige oft erleben",
    text: "Wenn Sie zuerst Ihre eigene Belastungsrealität einordnen möchten.",
  },
  {
    id: "was-ist-borderline",
    title: "Was Borderline im Kern so belastend macht",
    text: "Wenn Sie das klinische Grundmuster besser verstehen wollen.",
  },
  {
    id: "muster",
    title: "Typische Muster in belasteten Beziehungen",
    text: "Wenn Sie wiederkehrende Schleifen in Ihrer Beziehung klarer sehen möchten.",
  },
] as const;

export default function Verstehen() {
  const openSection = (sectionId: string) => {
    window.dispatchEvent(
      new CustomEvent("open-section", { detail: { sectionId } })
    );
  };

  return (
    <Layout>
      <SEO
        title="Borderline verstehen"
        description="Borderline aus Sicht von Angehörigen verstehen: Beziehungsdynamik, Überflutung, Nähe-Distanz und hilfreiche Einordnung."
        path="/verstehen"
      />
      <TableOfContents />

      <section className="py-12 md:py-20 bg-gradient-to-b from-sage-light/30 to-background wave-divider">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-sage-dark" />
              </div>
              <span className="text-sm font-medium text-sage-dark">
                Lesezeit: 15 Minuten
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Borderline verstehen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Für Angehörige ist Borderline oft nicht nur schwer zu begreifen,
              sondern schwer auszuhalten. Situationen können rasch kippen,
              Reaktionen widersprüchlich wirken und die eigene Rolle unklar
              werden. Diese Seite hilft Ihnen, typische innere und
              zwischenmenschliche Dynamiken besser einzuordnen, ohne Verhalten
              zu beschönigen oder zu verurteilen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-10 wave-divider-top">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Card className="border-sage-light/70 bg-white/92 shadow-[0_28px_56px_-40px_rgba(31,101,109,0.35)]">
              <CardContent className="p-6 md:p-7">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-wash">
                    <Brain className="h-6 w-6 text-sage-dark" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-sage-dark/85">
                      <span className="h-px w-6 bg-sage-dark/30" />
                      Überblick
                    </span>
                    <h2 className="mt-2 text-2xl font-normal text-foreground md:text-3xl">
                      Worum es hier vor allem geht
                    </h2>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Diese Seite erklärt Borderline nicht als Etikett, sondern als
                  Belastungsdynamik in Beziehungen. Entscheidend ist meist nicht
                  nur, was sichtbar passiert, sondern was darunter an
                  Überflutung, Bindungsstress, Scham oder Alarm mitläuft.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {verstehenIntroCards.map(item => {
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

            <Card className="border-border/60 bg-cream/95 shadow-[0_28px_56px_-40px_rgba(15,23,42,0.3)]">
              <CardContent className="p-6 md:p-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-dark/85">
                  <span className="h-px w-6 bg-slate-dark/30" />
                  Direkt einsteigen
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Wenn Sie nicht linear lesen möchten, springen Sie direkt zum
                  Abschnitt, der Ihre Situation gerade am ehesten trifft.
                </p>

                <div className="mt-5 space-y-3">
                  {verstehenQuickLinks.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openSection(item.id)}
                      className="group w-full rounded-2xl border border-border/60 bg-white/90 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-sage-light hover:bg-sage-wash/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-offset-2"
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
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-wash text-sage-darker transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-sage-light/60 bg-sage-wash/80 px-4 py-4">
                  <p className="text-sm leading-relaxed text-sage-darker">
                    Das Inhaltsverzeichnis bleibt der rote Faden. Es hilft
                    besonders dann, wenn Sie später gezielt zu einzelnen
                    Themenblöcken zurückkehren möchten.
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="border-l-4 border-l-sage bg-sage-light/20">
                <CardContent className="p-6">
                  <p className="text-foreground leading-relaxed italic">
                    "Verstehen hat mir nicht alles leichter gemacht. Aber ich
                    habe aufgehört, jede Eskalation nur als Bosheit, jede
                    Distanz nur als Ablehnung und jede Krise nur als mein
                    persönliches Versagen zu lesen."
                  </p>
                  <p className="text-muted-foreground text-sm mt-3">
                    — Eine Angehörige
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <ContentSection
              title="Was Angehörige oft erleben"
              icon={<Heart className="w-7 h-7 text-sage-mid" />}
              id="angehoerige-erleben"
              defaultOpen={true}
              preview="Viele Angehörige erleben nicht nur schwierige Gespräche, sondern ein ständiges Schwanken zwischen Nähe, Alarm, Hoffnung, Wut, Schuld und Erschöpfung."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Für Angehörige wirkt Borderline oft widersprüchlich: Nähe kann
                  sehr intensiv werden und kurz darauf in Angriff, Rückzug oder
                  Funkstille kippen. Eine Beziehung kann sich gleichzeitig
                  bedeutsam, erschöpfend, zart und bedrohlich anfühlen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Viele Angehörige schwanken deshalb nicht nur zwischen
                  Mitgefühl und Hilfsbereitschaft, sondern auch zwischen Angst,
                  Wut, Selbstzweifel, Loyalität und dem Wunsch nach Abstand.
                  Diese Ambivalenz ist nicht Ausdruck mangelnder Liebe, sondern
                  oft Teil der Belastungsrealität.
                </p>
                <Card className="bg-cream border-border/50">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Wichtig:</strong> Verstehen kann entlasten, weil
                      es Muster einordnen hilft. Es ersetzt aber weder
                      Grenzsetzung noch Selbstschutz noch professionelle Hilfe.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Was Borderline im Kern so belastend macht"
              icon={<Brain className="w-7 h-7 text-sage" />}
              id="was-ist-borderline"
              preview="Borderline ist kein einzelnes Verhalten, sondern ein Muster aus starker innerer Anspannung, erschwerter Emotionsregulation und instabilem Beziehungserleben."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Die Borderline-Persönlichkeitsstörung ist ein komplexes
                  Störungsbild. Typisch sind starke emotionale Reagibilität,
                  Schwierigkeiten mit innerer Stabilität und ein
                  Beziehungserleben, das unter Bindungsstress schnell ins Wanken
                  geraten kann.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nicht alle Menschen mit Borderline zeigen dieselben Muster.
                  Manche wirken vor allem impulsiv und explosiv, andere eher
                  verzweifelt, zurückgezogen, leer oder selbstabwertend.
                  Ausprägung, Verlauf und Belastung unterscheiden sich deutlich.
                </p>
                <Card className="bg-sage-wash/50 border-sage-mid/30">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      Für Angehörige ist vor allem wichtig: Hinter heftigen
                      Reaktionen liegen oft Überflutung, Angst, Scham oder
                      Verlassenheitsstress. Das macht Verhalten nicht folgenlos,
                      hilft aber, es genauer einzuordnen.
                    </p>
                  </CardContent>
                </Card>
                <EvidenceNote
                  title="Quellen zur diagnostischen und klinischen Einordnung"
                  definition="Die Störung zeigt je nach Person unterschiedliche Ausprägungen. Für Angehörige ist vor allem relevant, dass Bindungsstress, Affektregulation und Scham-/Überflutungserleben klinisch gut beschrieben sind."
                  reviewDate="24.03.2026"
                  sources={[
                    {
                      label:
                        "WHO ICD-11: Borderline pattern specifier (6D11.5)",
                      href: "https://icd.who.int/browse/2025-01/mms/en#2006821354",
                      type: "wissenschaft",
                    },
                    {
                      label:
                        "APA Practice Guideline for the Treatment of Patients With Borderline Personality Disorder (2024)",
                      href: "https://psychiatryonline.org/doi/book/10.1176/appi.books.9780890424896",
                      type: "wissenschaft",
                    },
                    {
                      label:
                        "Linehan, Cognitive-Behavioral Treatment of Borderline Personality Disorder",
                      type: "wissenschaft",
                      note: "Grundlagenwerk zu Emotionsregulation und Bindungsstress",
                    },
                  ]}
                  className="mt-4"
                />
              </div>
            </ContentSection>

            <VerstehenRelationshipSection />

            <ContentSection
              title="Scham, Wut und innere Überflutung"
              icon={<Layers className="w-7 h-7 text-terracotta-mid" />}
              id="scham-wut"
              preview="Wut ist oft sichtbar. Darunter liegen nicht selten Scham, Angst, Kränkung, Leere oder der Versuch, unerträgliche Spannung loszuwerden."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Angehörige erleben Wut oft als das dominierende Thema. Sie ist
                  laut, verletzend und schwer zu übersehen. Gleichzeitig ist Wut
                  bei Borderline häufig nicht der ganze Kern, sondern eher eine
                  Reaktion auf tiefer liegende Zustände wie Scham,
                  Verlassenheitsangst, Ohnmacht oder innere Leere.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Scham spielt dabei eine besonders grosse Rolle. Wer sich tief
                  beschämt, blossgestellt oder innerlich wertlos fühlt, reagiert
                  leichter mit Angriff, Rückzug, Selbstentwertung oder abruptem
                  Kontaktabbruch. Für Angehörige wirkt das oft hart und kalt,
                  innerlich ist es nicht selten hochverletzlich.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-terracotta-wash border border-terracotta-mid/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      Was sichtbar werden kann
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Wutausbruch oder Vorwurf</li>
                      <li>Rückzug oder Schweigen</li>
                      <li>Abwertung oder Beziehungsabbruch</li>
                      <li>Selbstverletzung oder Impulsdurchbruch</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-sage-wash border border-sage-mid/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      Was darunter liegen kann
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Scham und Kränkung</li>
                      <li>Angst vor Verlust oder Abwertung</li>
                      <li>innere Leere oder Überflutung</li>
                      <li>das Gefühl, nicht mehr regulieren zu können</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              title="Wenn Denken unter Stress enger wird"
              icon={<Activity className="w-7 h-7 text-slate-mid" />}
              id="stressmodus"
              preview="Unter starker Anspannung werden Grautöne, Perspektivenwechsel und logische Einordnung oft schlechter erreichbar."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Unter hoher emotionaler Überflutung verengt sich das Erleben
                  häufig stark auf den aktuellen Schmerz, die aktuelle Angst
                  oder den aktuellen Konflikt. Dann verlieren Menschen leichter
                  den Zugang zu Grautönen, Beziehungsgeschichte und nüchterner
                  Einordnung.
                </p>
                <div className="grid gap-4">
                  <Card className="border-l-4 border-l-alert">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Alarmmodus
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Das innere Alarmsystem reagiert rasch und heftig.
                        Neutrale Signale können leichter als Distanz, Kritik
                        oder Bedrohung gelesen werden.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-slate-dark">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Tunnelblick
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        In diesem Zustand kommen Argumente, Erklärungen und
                        Korrekturen oft kaum an. Hilfreicher ist meist zuerst
                        Beruhigung, Orientierung und emotionale Anerkennung.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-sage-mid">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Dissoziation und Entfremdung
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Unter starkem Stress können auch Unwirklichkeitsgefühle,
                        innere Abspaltung oder das Gefühl auftreten, nicht mehr
                        richtig präsent zu sein. Das ist für Betroffene wie
                        Angehörige oft verstörend.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-slate-wash border-slate-mid/20">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Für Angehörige heisst das:</strong> Nicht zuerst
                      überzeugen, sondern zuerst stabilisieren. Erst wenn die
                      Anspannung sinkt, wird gemeinsames Denken eher wieder
                      möglich.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <ContentSection
              title="Typische Muster in belasteten Beziehungen"
              icon={<RefreshCw className="w-7 h-7 text-slate-dark" />}
              id="muster"
              preview="Viele Angehörige berichten von wiederkehrenden Mustern. Diese können ähnlich aussehen, verlaufen aber nie bei allen gleich."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Manche Beziehungen folgen über längere Zeit wiederkehrenden
                  Schleifen: Eskalation, Rückzug, Wiederannäherung, Hoffnung,
                  neue Spannung. Das ist kein starres Gesetz, aber ein Muster,
                  das Angehörigen helfen kann, Entwicklungen nüchterner zu
                  lesen.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Idealisierung und Entwertung
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Eine Person kann zeitweise als einzig sicher und
                        verstehend erlebt werden, kurz darauf aber als kalt,
                        ungerecht oder gefährlich. Für Angehörige ist das oft
                        tief verunsichernd.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Rückzug und Funkstille
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nach Konflikten kann Schweigen, Abbruch oder
                        Distanzierung folgen. Das ist nicht zwingend
                        Gleichgültigkeit, für Angehörige aber oft besonders
                        schwer auszuhalten.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Schuldspiralen
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Angehörige geben aus Angst oder Schuld nach, fühlen sich
                        danach ausgenutzt, reagieren irgendwann härter und
                        empfinden dann erneut Schuld. So entsteht ein Kreislauf,
                        der beide Seiten belastet.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-2">
                        Nähe und Selbstschutz zugleich
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Viele Angehörige möchten bleiben und gleichzeitig
                        Abstand. Gerade diese Ambivalenz verdient Ernstnahme
                        statt moralische Bewertung.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ContentSection>

            <VerstehenMeaningSection />

            <ContentSection
              title="Verstehen hat Grenzen"
              icon={<AlertCircle className="w-7 h-7 text-terracotta-mid" />}
              id="grenzen-des-verstehens"
              preview="Verstehen ist wichtig. Es ersetzt aber weder Selbstschutz noch Grenzsetzung noch professionelle Hilfe."
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Verstehen bedeutet nicht, alles auszuhalten. Es bedeutet auch
                  nicht, dass Sie jede Eskalation auffangen, jedes Verhalten
                  korrekt einordnen oder jede Krise mit der richtigen Reaktion
                  entschärfen könnten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mitgefühl und Selbstschutz widersprechen sich nicht. Gerade in
                  belasteten Beziehungen kann es verantwortungsvoll sein,
                  Grenzen zu setzen, Distanz zu schaffen oder Hilfe von aussen
                  einzubeziehen.
                </p>
                <Card className="bg-terracotta-lighter/30 border-terracotta/50">
                  <CardContent className="p-5">
                    <p className="text-foreground leading-relaxed">
                      <strong>Merksatz für Angehörige:</strong> Verstehen hilft,
                      ruhiger und klarer zu handeln. Es verpflichtet Sie nicht
                      dazu, sich selbst zu verlieren.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ContentSection>

            <VerstehenDiagnosticSection />

            <VerstehenMaterialsSection />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 wave-divider-top"
              style={
                { "--wave-color": "var(--background)" } as React.CSSProperties
              }
            >
              <Card className="bg-sage-light/30 border-sage">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-sage flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Verstehen ist nur der erste Schritt
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Wenn Sie Dynamiken besser einordnen können, wird oft
                        klarer, wie Sie hilfreicher reagieren, Grenzen besser
                        halten und die eigene Belastung ernster nehmen können.
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Link href="/unterstuetzen/uebersicht">
                          <ArrowRight className="w-4 h-4" />
                          Weiter zu: Unterstützen
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6">
                Als Nächstes geht es darum, wie Unterstützung tragfähig bleiben
                kann, ohne dass Sie sich selbst verlieren.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-terracotta hover:bg-terracotta-mid text-white"
              >
                <Link href="/unterstuetzen/uebersicht">
                  Weiter zu: Unterstützen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
