/**
 * Tier-A Hero-Illustrations für die Tier-1-Pages der Site.
 *
 * Konsistente Bildsprache (Cream-Halo, Sage-Hügel, Aubergine, Cream-
 * Lichtkerne, Sterne, Hand-drawn Bodenlinie). Hex-Farben hardcoded auf
 * die aktuelle Token-Palette (--accent-primary #5b3a4e,
 * --accent-label #4f6b5e). Bei Theme-Änderungen nachziehen.
 *
 * Mapping zu Pages:
 *   /                      → HeroLeuchtturmIllustration (Phase 1, Editorial-Hero)
 *   /verstehen             → EisbergIllustration
 *   /kommunizieren         → FadenIllustration
 *   /grenzen               → InnenraeumeIllustration (umbenannt aus Source-«BogenIllustration»)
 *   /selbstfuersorge       → SchaleIllustration
 *   /genesung              → AufgangIllustration
 *
 * Phase-2-Konsumenten importieren von hier:
 *   import { EisbergIllustration } from "@/components/illustrations";
 */
export { default as EisbergIllustration } from "./EisbergIllustration";
export { default as FadenIllustration } from "./FadenIllustration";
export { default as InnenraeumeIllustration } from "./InnenraeumeIllustration";
export { default as SchaleIllustration } from "./SchaleIllustration";
export { default as AufgangIllustration } from "./AufgangIllustration";
export { HeroLeuchtturmIllustration } from "./HeroLeuchtturmIllustration";
