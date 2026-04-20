import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { kontaktByIdStrict } from "@/data/kontakte";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";

const rot144 = kontaktByIdStrict("ROT_144");
const gruen143 = kontaktByIdStrict("GRUEN_143");
const rot117 = kontaktByIdStrict("ROT_117");

type SearchEntry = {
  title: string;
  description: string;
  keywords: string[];
  href: string;
  section: string;
};

// Suchbare Inhalte der Website
const searchableContent: SearchEntry[] = [
  // Verstehen
  {
    title: "Was ist Borderline?",
    description: "Borderline aus Sicht von Angehörigen verstehen: Beziehungsmuster, Überflutung und Belastungsdynamik",
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
    description: "Die eigene Rolle klären und Unterstützung tragfähig mit Selbstschutz verbinden",
    keywords: ["helfen", "unterstützen", "rolle", "balance", "begleiten"],
    href: "/unterstuetzen/uebersicht",
    section: "Unterstützen"
  },
  {
    title: "Im Alltag unterstützen",
    description: "Im Alltag Orientierung, Verlässlichkeit und begrenzte Verfügbarkeit gestalten",
    keywords: ["alltag", "stabilität", "routine", "aktivitäten", "präsenz", "verfügbarkeit"],
    href: "/unterstuetzen/alltag",
    section: "Unterstützen"
  },
  {
    title: "Therapie begleiten",
    description: "Therapie realistisch begleiten und mit Rückschlägen oder Überforderung umgehen",
    keywords: ["therapie", "dbt", "dialektisch-behaviorale therapie", "skills", "fortschritte", "rückschläge", "behandlung"],
    href: "/unterstuetzen/therapie",
    section: "Unterstützen"
  },
  {
    title: "In der Krise unterstützen",
    description: "Krisen erkennen, deeskalieren und Sicherheit gewährleisten",
    keywords: ["krise", "eskalation", "deeskalation", "sicherheit", "notfall", "akut"],
    href: "/unterstuetzen/krise",
    section: "Unterstützen"
  },
  
  // Kommunizieren
  {
    title: "Validierung",
    description: "Gefühle und Erleben ernst nehmen, ohne jedem Vorwurf oder Verhalten zuzustimmen",
    keywords: ["validierung", "validieren", "anerkennen", "gefühle", "zuhören", "verstehen"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "Die 6 Stufen der Validierung",
    description: "Von aufmerksamem Zuhören bis zu echter Augenhöhe: eine hilfreiche Orientierung für Gespräche",
    keywords: ["stufen", "validierung", "aufmerksam", "spiegeln", "augenhöhe", "linehan"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "SET-Kommunikation",
    description: "Ein bekannter Gesprächsrahmen aus der Angehörigenliteratur für schwierige Situationen",
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
    description: "Wie Sie Grenzen klar, ruhig und ohne unnötige Eskalation formulieren",
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
    description: "Orientierung, Entlastung und alltagstaugliche Schritte für Ihre eigene Stabilität",
    keywords: ["selbstfürsorge", "strategien", "stabilität", "entlastung", "alltag", "achtsamkeit"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "Atem und Beruhigung",
    description: "Einfache Möglichkeiten, den Körper in angespannten Momenten wieder zu beruhigen",
    keywords: ["atem", "atmen", "beruhigung", "entspannung", "stress", "sofort"],
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
    description: "Was Langzeitstudien über Remission, Besserung und realistische Hoffnung zeigen",
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
    description: "Infografik: Orientierung, Verlässlichkeit und Selbstschutz in der Angehörigenrolle",
    keywords: ["leuchtturm", "rolle", "stabil", "orientierung", "metapher", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Der Eisberg: Was hinter Wut liegen kann",
    description: "Infografik: Hinter sichtbarer Wut liegen oft Schmerz, Angst oder Scham",
    keywords: ["eisberg", "wut", "trauer", "gefühle", "verborgen", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die Spaltung verstehen",
    description: "Infografik: Wie starke Idealisierung und Entwertung in Krisen entstehen können",
    keywords: ["spaltung", "pendel", "idealisierung", "entwertung", "ehrlich", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "U.M.W.E.G.© – Das Gesamtsystem",
    description: "Ältere Infografik zur Gesprächsorientierung in akuten Krisensituationen",
    keywords: ["umweg", "krise", "kommunikation", "empathie", "geduld", "system", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die U.M.W.-Formel: So sprechen Sie in der Krise",
    description: "Ältere Infografik mit Schritt-für-Schritt-Orientierung für akute Krisengespräche",
    keywords: ["umweg", "formel", "amygdala", "hippocampus", "cortex", "gehirn", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "U.M.W.E.G.© Praxis + Exit-Strategie",
    description: "Ältere Infografik mit Gesprächsbeispiel sowie Orientierung zu Grenzen und Konsequenzen",
    keywords: ["umweg", "praxis", "exit", "lmk", "konsequenzen", "dialog", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die U.M.W.-Formel in der Praxis",
    description: "Ältere Infografik mit möglichen Formulierungen für akute Krisensituationen",
    keywords: ["umweg", "formel", "praxis", "krise", "team", "dein", "dir", "wir", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  {
    title: "Die 5 Leitlinien für den Alltag",
    description: "Infografik: Orientierung für einen ruhigeren und klareren Alltag",
    keywords: ["leitlinien", "alltag", "hektik", "routinen", "ruhe", "team", "grenzen", "infografik"],
    href: "/materialien",
    section: "Materialien"
  },
  
  // Selbsttest
  {
    title: "Selbsttest: Finden Sie Ihren Weg",
    description: "Kurze Orientierung, welche Bereiche der Website im Moment am ehesten helfen könnten",
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
    description: "Ein zentraler und gut erforschter Therapieansatz bei Borderline",
    keywords: ["dbt", "dialektisch", "behavioral", "therapie", "linehan", "skills"],
    href: "/unterstuetzen/therapie",
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
    description: "Fachbegriffe rund um Borderline für Angehörige verständlich und knapp erklärt",
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
    description: "DBT-Struktur für klare Bitten und Grenzen in schwierigen Gesprächen",
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
    href: "/unterstuetzen/therapie",
    section: "Therapie"
  },
  {
    title: "DBT-Station PUK Zürich",
    description: "Stationäre DBT-Behandlung für Erwachsene in Rheinau",
    keywords: ["dbt", "station", "stationär", "rheinau", "puk", "erwachsene"],
    href: "/unterstuetzen/therapie",
    section: "Therapie"
  },
  {
    title: "HYPE ZÜRI – Frühintervention für Jugendliche",
    description: "Spezialisiertes Programm für Jugendliche ab 13 Jahren",
    keywords: ["hype", "jugendliche", "früh", "intervention", "13", "teenager"],
    href: "/unterstuetzen/therapie",
    section: "Therapie"
  },
  {
    title: "PUK Erwachsene (ab 65) Zürich",
    description: "Psychiatrische Versorgung für Erwachsene ab 65 Jahren",
    keywords: ["alter", "senioren", "65", "alterspsychiatrie", "puk"],
    href: "/unterstuetzen/therapie",
    section: "Therapie"
  },
  
  // FAQ
  {
    title: "Häufig gestellte Fragen (FAQ)",
    description: "Häufige Fragen von Angehörigen mit ruhigen und differenzierten Antworten",
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
  
  // Orientierung und Beispiele
  {
    title: "5-4-3-2-1 Grounding",
    description: "Schrittweise Orientierung über die fünf Sinne, um im gegenwärtigen Moment anzukommen",
    keywords: ["grounding", "5-4-3-2-1", "achtsamkeit", "sinne", "beruhigung", "gegenwart", "erdung"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "DEAR-Formulierungen",
    description: "Orientierung für klare und respektvolle Formulierungen in schwierigen Gesprächen",
    keywords: ["dear", "dearman", "satzbaukasten", "kommunikation", "formulierung", "übung"],
    href: "/grenzen",
    section: "Grenzen setzen"
  },
  {
    title: "Mythen und Einordnungen",
    description: "Häufige Missverständnisse über Borderline ruhig und differenziert eingeordnet",
    keywords: ["mythos", "fakt", "vorurteil", "aufklärung", "einordnung"],
    href: "/verstehen",
    section: "Verstehen"
  },
  {
    title: "Spiegeln und antworten",
    description: "Beispiele für hilfreiche und weniger hilfreiche Reaktionen in belastenden Situationen",
    keywords: ["spiegeln", "validierung", "empathie", "reformulieren", "beispiele"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },
  {
    title: "Belastung einordnen",
    description: "Ruhige Orientierung zu Warnsignalen von Überforderung und Selbstfürsorge",
    keywords: ["selbstfürsorge", "belastung", "wohlbefinden", "überlastung", "warnsignale"],
    href: "/selbstfuersorge",
    section: "Selbstfürsorge"
  },
  {
    title: "Validierungsstufenleiter",
    description: "Die sechs Stufen der Validierung ruhig erklärt, mit Beispielen und Stolpersteinen",
    keywords: ["validierung", "stufen", "leiter", "linehan", "beispiele", "kommunikation"],
    href: "/kommunizieren",
    section: "Kommunizieren"
  },

  // Unterstützen-Unterseiten
  {
    title: "Im Alltag unterstützen",
    description: "Stabilität bieten, Skills unterstützen, gemeinsame Aktivitäten – praktische Tipps für den Alltag",
    keywords: ["alltag", "stabilität", "routine", "skills", "unterstützen", "praktisch", "tipps"],
    href: "/unterstuetzen/alltag",
    section: "Unterstützen"
  },
  {
    title: "Therapie begleiten",
    description: "DBT und andere Therapien verstehen, Fortschritte würdigen, mit Rückschlägen umgehen",
    keywords: ["therapie", "dbt", "begleiten", "fortschritte", "rückschläge", "behandlung", "skills"],
    href: "/unterstuetzen/therapie",
    section: "Unterstützen"
  },
  {
    title: "In der Krise unterstützen",
    description: "Krisen erkennen, deeskalieren und Sicherheit gewährleisten – konkrete Handlungsschritte",
    keywords: ["krise", "deeskalation", "sicherheit", "notfall", "akut", "handeln"],
    href: "/unterstuetzen/krise",
    section: "Unterstützen"
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
    description: "Umgang mit Drohungen, Schuldvorwürfen und starkem Beziehungsdruck",
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
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useFocusTrap(isOpen);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollLock(isOpen);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      focusTimeoutRef.current = setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
    };
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
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (activeIndex < 0) {
      return;
    }

    const activeLink =
      resultsRef.current?.querySelectorAll<HTMLAnchorElement>("a")[activeIndex];
    activeLink?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  // Arrow key navigation in results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const link = resultsRef.current?.querySelectorAll("a")[activeIndex] as HTMLAnchorElement | undefined;
      link?.click();
    }
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
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/35 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div
              ref={dialogRef}
              className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <SearchIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Suchen Sie nach Themen, z.B. 'Validierung', 'Grenzen setzen', 'Notfall'..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  role="combobox"
                  aria-label="Website durchsuchen"
                  aria-autocomplete="list"
                  aria-expanded={results.length > 0}
                  aria-controls="search-results"
                  aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
                />
                {query && (
                  <button
                    type="button"
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
                          type="button"
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
                  <div className="py-2" ref={resultsRef} role="listbox" id="search-results" aria-live="polite">
                    {results.map((result, index) => (
                      <Link
                        key={`${result.href}-${index}`}
                        href={result.href}
                        onClick={handleResultClick}
                        id={`search-result-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`flex items-start gap-4 px-4 py-3 transition-colors group ${index === activeIndex ? "bg-muted/70" : "hover:bg-muted/50"}`}
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
                <span className="flex items-center gap-2">
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">↑↓</kbd>
                    {" "}navigieren
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">ESC</kbd>
                    {" "}schliessen
                  </span>
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
