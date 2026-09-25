# PUK presentation and interactive guides

## Scope

The work starts from main `d160d7b`, preserving changes 609, 611 and 612, including the relationships page, the immediate crisis interruption, uncertainty paths and the 27-material catalogue.

The supplied prototype is a design reference. Its routing, crisis logic, risk categories, percentage scores and older exercise text are not imported.

The site uses locally hosted Rubik fonts, the supplied static PUK symbol and three supplied SVG illustrations. The theme preserves semantic emergency colours. Smaller metadata uses stronger contrast than the prototype. The institution-status statement is retained; the redesign is not an institutional or clinical sign-off.

## Shared content

`client/src/content/learningGuides.json` drives the boundaries, DEAR and garden interactive guides, their text versions and their PDFs. Examples are original editorial wording. The garden is explicitly described as a metaphor. Interactions offer choices and examples without computing scores or predicting outcomes.

`client/src/content/revisedHandouts.json` remains the source for STOPP, children and recovery statistics. These three PDFs now use the same typography and colour foundations. The other existing infographic files remain available and are not represented as newly clinically reviewed or fully redesigned.

Regenerate the six print files from the repository root:

```sh
python qa/scripts/render-revised-handouts.py
```

The generator requires ReportLab, PyMuPDF and Pillow and uses the Rubik TTFs included in `client/public/fonts`. Existing source asset files are retained for saved external links. New guide PDFs have new stable filenames. Preview images are generated from those PDFs.

## Checks

- All six PDFs were rendered and visually inspected; each is one A4 page, with searchable text.
- Type checking, lint and the production build passed. All 394 unit tests across 56 files passed.
- The supervised local browser preview could not start in the available environment. This does not count as a completed responsive or browser accessibility review.
- Existing CI screenshot comparisons require review and replacement where the requested redesign changes the expected image. Failed comparisons must not be described as passed.
- An actual iPhone check and an independent clinical/institutional release remain outside this automated implementation.

## Delivery status

The implementation is committed locally on `codex/puk-interactive-refresh`. Automatic approval review blocked the GitHub push because it requires explicit approval to transmit the changes, including the supplied design assets, to the public repository `christaegger-dot/borderline-angehoerige`. The repository was subsequently verified as the existing project that contains the approved change 612; no alternate upload or deployment was attempted. A new hosted preview, CI screenshot review and production publication are therefore not complete.

## Visual handout revision

Following the user's clarification about emotionally burdened lay readers, the three guide PDFs now use illustrated short versions instead of the full web text. The shared `learningGuides.json` contains explicitly separate `visual` copy for this purpose; the full web text remains available. Four illustrated everyday areas explain boundaries, a connected D/E/A/R sequence illustrates one conversation, and three garden scenes distinguish offering support, caring for oneself and limits of influence. The garden scenes are not stages of recovery.

`qa/scripts/render-visual-guides.py` creates original vector drawings, searchable Rubik text, full previews and thumbnails. The existing six-handout generator delegates these three guides to that renderer, so regeneration preserves the visual versions. Main explanations use approximately 12–13 pt text; headings and examples provide a second clear reading level. Safety information remains beside the guidance. Colour is not needed to distinguish meaning.

All three pages were inspected visually in colour and in a grayscale rendering. Each is one A4 page with 165–171 words including sources and metadata. Strict independent PDF parsing, language metadata, complete examples and page text bounds were checked. The renderer rejects overlapping text boxes and text outside its reserved area. These checks are not a user comprehension study or a PDF/UA accessibility certification. An additional three-page PDF combines the sheets for review and printing.

Design reference: CDC Clear Communication Index, especially clear main messages and explanatory visuals: https://www.cdc.gov/ccindex/tool/description-examples-parta.html and https://www.cdc.gov/ccindex/tool/page-4.html . No validated Index score is claimed.

## Sources

- User-supplied PUK design system version 1.7.25 and prototype archive.
- NICE CG78, information for families and carers: https://www.nice.org.uk/guidance/cg78/ifp/chapter/information-for-families-and-carers
- Linehan (2015), DBT Skills Training Manual, second edition; own adapted examples for DEAR, which is part of DEAR MAN.
- Rubik font licence: https://github.com/google/fonts/blob/main/ofl/rubik/OFL.txt (included with font files).
