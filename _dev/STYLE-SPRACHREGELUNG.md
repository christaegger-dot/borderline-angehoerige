---
Datum: 2026-05-05
Zweck: Interne Sprachregelung für konsistente Formulierungen auf der Site
Geltungsbereich: Alle .tsx-Seiten und -Komponenten
---

# Sprachregelung — Interne Stilnotiz

## Primäre Formulierung: «betroffene Person»

Verwende «betroffene Person» (nicht «erkrankte Person») als Standardformulierung,
wenn auf die Person mit BPS verwiesen wird.

**Begründung:** «erkrankt» impliziert einen passiven, dauerhaften Krankheitszustand
und steht im Widerspruch zum Recovery-orientierten Framing der Site. «betroffen»
ist offener und entstigmatisierender.

**Ausnahmen:** Medizinische und klinische Kontexte (EvidenceNotes, Diagnostik-Seite,
Quellen-Belege) dürfen «erkrankt» verwenden, wenn es dem Quellen-Kontext entspricht.

## Bekannte normalisierte Stellen

- `Home.tsx:364` — korrigiert 2026-05-05 (Cluster-4-S1-PR)
- `Begleiterkrankungen.tsx:510, 514, 586` — korrigiert 2026-05-06 (Sprachregelung-Nachtrag-PR).
  Komorbidität-Kontext: «erkrankt» wäre zulässig, aber «betroffen» ist im Belastungs-Diskurs
  konsistenter mit dem Site-Framing.

## Bekannte Ausnahmen (bewusst belassen)

- `Diagnostik.tsx` — klinischer Kontext, «erkrankt» zulässig
- EvidenceNotes mit direkten Quellen-Zitaten — unverändert lassen
- `Selbsthilfegruppen.tsx:204` — «Angehörige von psychisch erkrankten Menschen»;
  etablierte Selbsthilfe-Phrasenformel. 1:1-Umstellung auf «psychisch betroffen»
  ist semantisch nicht kongruent.
- `Selbsthilfegruppen.tsx:339` — «Vereinigungen von Angehörigen psychisch Erkrankter»;
  historische Selbstbezeichnung im Kontext des alten VASK-Verbandsnamens (jetzt
  «Stand by You Schweiz»).
