import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { kontaktById } from "@/data/kontakte";

const rot144 = kontaktById("ROT_144")!;
const gruen143 = kontaktById("GRUEN_143")!;
const rot117 = kontaktById("ROT_117")!;

// Suchbare Inhalte der Website
const searchableContent = [
  // Verstehen
  {
    title: "Was ist Borderline?",
    description: "Borderline-Persönlichkeitsstörung verstehen – Symptome, Ursachen und Auswirkungen",
    keywords: ["borderline", "bps", "persönlichkeitsstörung", "diagnose", "symptome", "emotionale instabilität", "verlassensangst", "impulsivität", "selbstbild"],
    href: "/verstehen",
    section: "Verstehen"
  },
  {
    title: "Emotionale Dysregulation",
    description: "Warum Emotionen bei Borderline so intensiv sind und schnell wechseln",
    keywords: ["emotionen", "gefühle", "dysregulation", "intensität", "stimmungsschwankungen", "wut", "angst", "trauer"],
    href: "/verstehen",
    section: "Verstehen"
  },
  {
    title: "Schwarz-Weiss-Denken",
    description: "Die Tendenz, Menschen und Situationen als entweder ganz gut oder ganz schlecht zu sehen",
    keywords: ["schwarz-weiss", "splitting", "idealisierung", "entwertung", "alles oder nichts"],
    href: "/verstehen",
    section: "Verstehen"
  },
  {
    title: "Verlassensangst",
    description: "Intensive Angst vor Zurückweisung oder Verlassenwerden",
    keywords: ["verlassensangst", "trennungsangst", "zurückweisung", "klammern", "abhängigkeit"],
    href: "/verstehen",
    section: "Verstehen"
  },
  
  // Unterstützen
  {
    title: "Wie kann ich helfen?",
    description: "Die Grundlagen: Ihre Rolle verstehen und die Balance zwischen Unterstützen und Selbstschutz finden",
    keywords: ["helfen", "unterstützen", "rolle", "balance", "begleiten"],
    href: "/unterstuetzen",
    section: "Unterstützen"
  },
  {
    title: "Im Alltag unterstützen",
    description: "Stabilität bieten, emotionale Verfügbarkeit zeigen und gemeinsame Aktivitäten gestalten",
    keywords: ["alltag", "stabilität", "routine", "aktivitäten", "präsenz", "verfügbarkeit"],
    href: "/unterstuetzen",
    section: "Unterstützen"
  },
  {
    title: "Therapie begleiten",
    description: "DBT-Skills verstehen, Fortschritte würdigen und mit Rückschlägen umgehen",
    keywords: ["therapie", "dbt", "dialektisch-behaviorale therapie", "skills", "fortschritte", "rückschläge", "behandlung"],
    href: "/unterstuetzen",
    section: "Unterstützen"
  },
  {
    title: "In der Krise unterstützen",
    description: "Krisen erkennen, deeskalieren und Sicherheit gewährleisten",
    keywords: ["krise", "eskalation", "deeskalation", "sicherheit", "notfall", "akut"],
    href: "/unterstuetzen",
    section: "Unterstützen"
  },
  
  // Kommunizieren
  {
    title: "Validierung",
    description: "Die wichtigste Kommunikationstechnik – Gefühle anerkennen ohne zuzustimmen",
    keywords: ["validierung", "validieren", "anerkennen", "gefühle", "zuhören", "verstehen"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "Die 6 Stufen der Validierung",
    description: "Von aufmerksam sein bis auf Augenhöhe bleiben – konkrete Techniken nach Linehan",
    keywords: ["stufen", "validierung", "aufmerksam", "spiegeln", "augenhöhe", "linehan"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "SET-Kommunikation",
    description: "Support, Empathy, Truth – ein Rahmen für schwierige Gespräche",
    keywords: ["set", "support", "empathy", "truth", "kommunikation", "gespräch", "technik"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "Ich-Botschaften",
    description: "Eigene Gefühle und Bedürfnisse ausdrücken ohne Vorwürfe",
    keywords: ["ich-botschaften", "bedürfnisse", "gefühle", "kommunikation", "vorwürfe"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  
  // Grenzen
  {
    title: "Warum Grenzen wichtig sind",
    description: "Grenzen sind keine Mauern – sie sind Leitplanken für beide Seiten",
    keywords: ["grenzen", "wichtig", "schutz", "selbstschutz", "respekt"],
    href: "/grenzen",
    section: "Grenzen setzen"
  },
  {
    title: "Arten von Grenzen",
    description: "Zeitliche, emotionale, physische und finanzielle Grenzen setzen",
    keywords: ["zeitlich", "emotional", "physisch", "finanziell", "grenzen", "arten"],
    href: "/grenzen",
    section: "Grenzen setzen"
  },
  {
    title: "Grenzen kommunizieren",
    description: "Wie Sie Grenzen liebevoll aber klar formulieren",
    keywords: ["kommunizieren", "formulieren", "aussprechen", "grenzen", "klar"],
    href: "/grenzen",
    section: "Grenzen setzen"
  },
  {
    title: "Grenzen durchhalten",
    description: "Konsequent bleiben auch wenn es schwer fällt",
    keywords: ["durchhalten", "konsequent", "konsistent", "grenzen", "bleiben"],
    href: "/grenzen",
    section: "Grenzen setzen"
  },
  
  // Selbstfürsorge
  {
    title: "Warnsignale für Überlastung",
    description: "Emotionale, körperliche und soziale Anzeichen erkennen",
    keywords: ["warnsignale", "überlastung", "burnout", "erschöpfung", "stress", "anzeichen"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "Selbstfürsorge-Strategien",
    description: "Konkrete Übungen und Techniken für Ihren Alltag",
    keywords: ["selbstfürsorge", "strategien", "übungen", "techniken", "entspannung", "achtsamkeit"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "Atemübung",
    description: "Eine einfache Atemübung zur sofortigen Beruhigung",
    keywords: ["atemübung", "atmen", "beruhigung", "entspannung", "stress", "sofort"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "Professionelle Unterstützung",
    description: "Wann und wo Sie selbst Hilfe holen sollten",
    keywords: ["professionell", "hilfe", "therapie", "beratung", "angehörigenberatung", "psychologe"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  
  // Notfall
  {
    title: "Notfallnummern Schweiz",
    description: `${rot144.nummer} ${rot144.label}, ${gruen143.nummer} ${gruen143.label}, ${rot117.nummer} ${rot117.label}`,
    keywords: ["notfall", "notruf", "144", "143", "117", "telefon", "hilfe", "akut"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "Psychiatrische Notdienste",
    description: "Regionale psychiatrische Notaufnahmen in der Schweiz",
    keywords: ["psychiatrie", "notdienst", "notaufnahme", "klinik", "zürich", "bern", "basel"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "Krisenplan erstellen",
    description: "Einen persönlichen Krisenplan gemeinsam vorbereiten",
    keywords: ["krisenplan", "vorbereitung", "notfall", "plan", "sicherheit"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  
  // Genesung
  {
    title: "Genesung ist möglich",
    description: "Evidenzbasierte Hoffnung – 85-93% erreichen Remission",
    keywords: ["genesung", "remission", "recovery", "hoffnung", "prognose", "besserung", "heilung"],
    href: "/genesung",
    section: "Genesung"
  },
  {
    title: "Remission vs. Recovery",
    description: "Was die Begriffe bedeuten und wie sie sich unterscheiden",
    keywords: ["remission", "recovery", "genesung", "unterschied", "definition"],
    href: "/genesung",
    section: "Genesung"
  },
  {
    title: "Faktoren für Genesung",
    description: "Was die Forschung über positive Verläufe zeigt",
    keywords: ["faktoren", "genesung", "therapie", "beziehungen", "zeit", "forschung"],
    href: "/genesung",
    section: "Genesung"
  },
  
  // Materialien
  {
    title: "Infografiken & Handouts",
    description: "Herunterladbare Materialien zu allen Themen",
    keywords: ["infografik", "handout", "download", "pdf", "material", "drucken"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Der Leuchtturm: Ihre Rolle als Angehörige/r",
    description: "Infografik: Stabil bleiben, Orientierung geben – die Leuchtturm-Metapher",
    keywords: ["leuchtturm", "rolle", "stabil", "orientierung", "metapher", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Der Eisberg: Wut = Trauer",
    description: "Infografik: Was Sie sehen ist nur die Spitze – darunter liegt Trauer",
    keywords: ["eisberg", "wut", "trauer", "gefühle", "verborgen", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die Spaltung verstehen",
    description: "Infografik: Warum Liebe und Hass BEIDE ehrlich sind",
    keywords: ["spaltung", "pendel", "idealisierung", "entwertung", "ehrlich", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "U.M.W.E.G.© – Das Gesamtsystem",
    description: "Infografik: Meta-Ebene (E.G.) + Akut-Ebene (U.M.W.) – das vollständige System",
    keywords: ["umweg", "krise", "kommunikation", "empathie", "geduld", "system", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die U.M.W.-Formel: So sprechen Sie in der Krise",
    description: "Infografik: Schritt-für-Schritt mit Gehirn-Mapping (Amygdala, Hippocampus, Präfrontaler Cortex)",
    keywords: ["umweg", "formel", "amygdala", "hippocampus", "cortex", "gehirn", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "U.M.W.E.G.© Praxis + Exit-Strategie",
    description: "Infografik: Beispiel-Dialog und L.M.K. (Lebe mit Konsequenzen) wenn nichts mehr geht",
    keywords: ["umweg", "praxis", "exit", "lmk", "konsequenzen", "dialog", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die U.M.W.-Formel in der Praxis",
    description: "Infografik: Exakte Formulierungen für die akute Krise mit Betonung auf DEIN, DIR und WIR",
    keywords: ["umweg", "formel", "praxis", "krise", "team", "dein", "dir", "wir", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die 5 Leitlinien für den Alltag",
    description: "Infografik: Keine Hektik, Routinen, Ruhe, Team, Grenzen",
    keywords: ["leitlinien", "alltag", "hektik", "routinen", "ruhe", "team", "grenzen", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  
  // Selbsttest
  {
    title: "Selbsttest: Finden Sie Ihren Weg",
    description: "Ein kurzer Test zur Orientierung auf der Website",
    keywords: ["selbsttest", "test", "orientierung", "fragen", "empfehlung"],
    href: "/selbsttest",
    section: "Selbsttest"
  },
  
  // Selbsthilfegruppen
  {
    title: "Beratung & Netzwerke",
    description: "Professionelle Beratung, Selbsthilfegruppen und Netzwerke für Angehörige",
    keywords: ["beratung", "selbsthilfe", "selbsthilfegruppe", "netzwerk", "gruppe", "austausch", "angehörige"],
    href: "/beratung",
    section: "Beratung & Netzwerke"
  },
  {
    title: "Stand by You Schweiz",
    description: "Netzwerk für Angehörige von Menschen mit psychischen Erkrankungen (ehemals VASK)",
    keywords: ["stand by you", "vask", "angehörige", "netzwerk", "beratung", "schweiz", "podcast"],
    href: "/beratung",
    section: "Beratung & Netzwerke"
  },
  {
    title: "Selbsthilfe Schweiz",
    description: "Datenbank für Selbsthilfegruppen in der ganzen Schweiz",
    keywords: ["selbsthilfe schweiz", "datenbank", "gruppen", "regional", "zürich", "bern", "winterthur"],
    href: "/beratung",
    section: "Beratung & Netzwerke"
  },
  {
    title: "Pro Mente Sana",
    description: "Beratung für psychisch Betroffene und Angehörige",
    keywords: ["pro mente sana", "beratung", "telefon", "email", "kostenlos"],
    href: "/beratung",
    section: "Beratung & Netzwerke"
  },
  {
    title: "Fachstelle Angehörigenarbeit PUK Zürich",
    description: "Kostenlose, vertrauliche Beratung für Angehörige im Kanton Zürich",
    keywords: ["fachstelle", "angehörigenarbeit", "puk", "zürich", "beratung", "kostenlos"],
    href: "/beratung",
    section: "Beratung & Netzwerke"
  },
  
  // Spezifische Begriffe
  {
    title: "DBT (Dialektisch-Behaviorale Therapie)",
    description: "Die wichtigste evidenzbasierte Therapie für Borderline",
    keywords: ["dbt", "dialektisch", "behavioral", "therapie", "linehan", "skills"],
    href: "/unterstuetzen",
    section: "Unterstützen"
  },
  {
    title: "PUK Zürich Notfall",
    description: "Psychiatrische Notdienste für Kinder, Erwachsene und Menschen ab 65",
    keywords: ["puk", "notfall", "psychiatrie", "zürich", "kinder", "erwachsene", "senioren", "kiz"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "McLean-Studie & CLPS-Studie",
    description: "Langzeitstudien zur Remission bei Borderline",
    keywords: ["mclean", "clps", "studie", "forschung", "zanarini", "gunderson", "langzeit"],
    href: "/genesung",
    section: "Genesung"
  },
  
  // Glossar
  {
    title: "Glossar – Fachbegriffe erklärt",
    description: "DBT, Validierung, SET-Kommunikation und weitere Begriffe verständlich erklärt",
    keywords: ["glossar", "fachbegriffe", "lexikon", "erklärung", "definition", "begriffe"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Splitting",
    description: "Schwarz-Weiss-Denken bei Borderline – Glossar-Eintrag",
    keywords: ["splitting", "schwarz-weiss", "idealisierung", "entwertung", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Mentalisierung",
    description: "Die Fähigkeit, Verhalten als Ausdruck von Gedanken und Gefühlen zu verstehen",
    keywords: ["mentalisierung", "mentalisieren", "verstehen", "gedanken", "gefühle", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Dissoziation",
    description: "Zustand der Abgetrenntheit von sich selbst oder der Umgebung",
    keywords: ["dissoziation", "dissoziieren", "abgetrennt", "unwirklich", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Co-Abhängigkeit",
    description: "Wenn das eigene Wohlbefinden vom Zustand des anderen abhängt",
    keywords: ["co-abhängigkeit", "abhängigkeit", "muster", "angehörige", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Enabling",
    description: "Unbeabsichtigtes Ermöglichen von problematischem Verhalten",
    keywords: ["enabling", "ermöglichen", "verstärken", "konsequenzen", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "DEARMAN",
    description: "DBT-Technik für effektive Kommunikation",
    keywords: ["dearman", "kommunikation", "dbt", "technik", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  {
    title: "Leuchtturm-Prinzip",
    description: "Metapher für die Rolle von Angehörigen – stabil sein, ohne zu steuern",
    keywords: ["leuchtturm", "prinzip", "metapher", "rolle", "angehörige", "glossar"],
    href: "/glossar",
    section: "Glossar"
  },
  
  // Buchempfehlungen
  {
    title: "Buchempfehlungen für Angehörige",
    description: "Kuratierte deutschsprachige Bücher für Partner, Eltern und Kinder",
    keywords: ["buch", "bücher", "buchempfehlung", "lesen", "ratgeber", "literatur"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen"
  },
  {
    title: "Schluss mit dem Eiertanz (Buch)",
    description: "Das Standardwerk von Mason & Kreger für Angehörige",
    keywords: ["eiertanz", "mason", "kreger", "buch", "partner", "angehörige"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen"
  },
  {
    title: "Ich hasse dich – verlass mich nicht",
    description: "Klassiker zum Verständnis von Borderline",
    keywords: ["ich hasse dich", "verlass mich nicht", "kreisman", "straus", "buch"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen"
  },
  {
    title: "Kinderbücher über psychische Erkrankungen",
    description: "Bücher, die Kindern helfen, psychische Erkrankungen zu verstehen",
    keywords: ["kinderbuch", "kinder", "erklären", "mama", "papa", "psychisch"],
    href: "/buchempfehlungen",
    section: "Buchempfehlungen"
  },
  
  // Therapieangebote (jetzt in Unterstützen/Therapie integriert)
  {
    title: "Therapieangebote im Kanton Zürich",
    description: "Spezialisierte Borderline-Behandlung an der PUK Zürich",
    keywords: ["therapie", "zürich", "puk", "behandlung", "angebot", "kanton"],
    href: "/unterstuetzen/therapie#therapieangebote",
    section: "Therapie"
  },
  {
    title: "DBT-Station PUK Zürich",
    description: "Stationäre DBT-Behandlung für Erwachsene in Rheinau",
    keywords: ["dbt", "station", "stationär", "rheinau", "puk", "erwachsene"],
    href: "/unterstuetzen/therapie#therapieangebote",
    section: "Therapie"
  },
  {
    title: "HYPE ZÜRI – Frühintervention für Jugendliche",
    description: "Spezialisiertes Programm für Jugendliche ab 13 Jahren",
    keywords: ["hype", "jugendliche", "früh", "intervention", "13", "teenager"],
    href: "/unterstuetzen/therapie#therapieangebote",
    section: "Therapie"
  },
  {
    title: "PUK Erwachsene (ab 65) Zürich",
    description: "Psychiatrische Versorgung für Erwachsene ab 65 Jahren",
    keywords: ["alter", "senioren", "65", "alterspsychiatrie", "puk"],
    href: "/unterstuetzen/therapie#therapieangebote",
    section: "Therapie"
  },
  
  // FAQ
  {
    title: "Häufig gestellte Fragen (FAQ)",
    description: "20 Fragen, die Angehörige am häufigsten stellen – mit Antworten",
    keywords: ["faq", "fragen", "antworten", "häufig", "gestellt"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Soll ich die Diagnose ansprechen?",
    description: "FAQ: Wann und wie über die Borderline-Diagnose sprechen",
    keywords: ["diagnose", "ansprechen", "gespräch", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Ist Borderline heilbar?",
    description: "FAQ: Prognose und Genesungschancen bei Borderline",
    keywords: ["heilbar", "heilung", "prognose", "chancen", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Wann ist eine Einweisung nötig?",
    description: "FAQ: Kriterien für psychiatrische Einweisung",
    keywords: ["einweisung", "klinik", "stationär", "wann", "nötig", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Darf ich meinen Angehörigen verlassen?",
    description: "FAQ: Trennung bei psychischer Erkrankung des Partners",
    keywords: ["verlassen", "trennung", "beziehung", "ende", "darf", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Mein Angehöriger will keine Therapie",
    description: "FAQ: Was tun, wenn Betroffene Behandlung ablehnen",
    keywords: ["therapie", "ablehnen", "will nicht", "verweigert", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Bin ich co-abhängig?",
    description: "FAQ: Warnsignale für Co-Abhängigkeit erkennen",
    keywords: ["co-abhängig", "abhängigkeit", "warnsignale", "muster", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  {
    title: "Wie schütze ich meine Kinder?",
    description: "FAQ: Kinder vor den Auswirkungen schützen",
    keywords: ["kinder", "schützen", "schutz", "familie", "faq"],
    href: "/faq",
    section: "FAQ"
  },
  
  // Krisenszenarien (Notfall-Seite)
  {
    title: "Suiziddrohung – Was tun?",
    description: "Schritt-für-Schritt-Anleitung bei Suiziddrohungen",
    keywords: ["suizid", "drohung", "selbstmord", "will nicht mehr", "umbringen"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "Selbstverletzung – Was tun?",
    description: "Anleitung bei Ritzen, Brennen oder anderen Selbstverletzungen",
    keywords: ["selbstverletzung", "ritzen", "schneiden", "brennen", "svv"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "Aggressive Eskalation – Was tun?",
    description: "Deeskalation bei Schreien, Drohen oder Gewalt",
    keywords: ["aggression", "eskalation", "gewalt", "schreien", "drohen", "wut"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
  {
    title: "Emotionale Erpressung – Was tun?",
    description: "Umgang mit manipulativen Drohungen und Schuldvorwürfen",
    keywords: ["erpressung", "manipulation", "schuld", "drohung", "wenn du gehst"],
    href: "/soforthilfe",
    section: "Krisenressourcen"
  },
];

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchableContent>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Body-Scroll-Lock: Verhindert Hintergrund-Scrollen auf iOS/Safari
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ").filter(t => t.length > 1);
    
    const matches = searchableContent.filter(item => {
      const searchText = [
        item.title,
        item.description,
        ...item.keywords,
        item.section
      ].join(" ").toLowerCase();
      
      return searchTerms.every(term => searchText.includes(term));
    });

    // Sort by relevance (title matches first)
    matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (aTitle.includes(queryLower) && !bTitle.includes(queryLower)) return -1;
      if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) return 1;
      return 0;
    });

    setResults(matches.slice(0, 8));
  }, [query]);

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <SearchIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Suchen Sie nach Themen, z.B. 'Validierung', 'Grenzen setzen', 'Notfall'..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                    aria-label="Sucheingabe löschen"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length < 2 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Geben Sie mindestens 2 Zeichen ein, um zu suchen
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {["Validierung", "Grenzen", "Krise", "Selbstfürsorge", "DBT"].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Nach ${term} suchen`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">
                      Keine Ergebnisse für "{query}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Versuchen Sie andere Suchbegriffe oder schauen Sie in der Navigation
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <Link
                        key={`${result.href}-${index}`}
                        href={result.href}
                        onClick={handleResultClick}
                        className="flex items-start gap-4 px-4 py-3 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-sage-mid bg-sage-lighter px-2 py-0.5 rounded">
                              {result.section}
                            </span>
                          </div>
                          <h4 className="font-medium text-foreground mt-1 group-hover:text-terracotta-mid transition-colors">
                            {result.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-6" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">ESC</kbd>
                  {" "}zum Schliessen
                </span>
                {results.length > 0 && (
                  <span>{results.length} Ergebnis{results.length !== 1 ? "se" : ""}</span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
