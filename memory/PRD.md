# PRD — CG Unit 1 Exam Revision Booklet

## Original Problem Statement
Web app rendering "Computer Graphics — Unit 1: Quick & Easy Exam Revision Notes" as a clean, print-optimized document with one-click Print/Export PDF (A4, B&W friendly). React + FastAPI + MongoDB. 10 syllabus topics in a 7-step pattern, hand-coded SVG diagrams, DDA solved example, final revision sections, sticky sidebar (hidden in print).

## User Personas
- M.Sc CS Sem-IV student (MGSU Bikaner) revising for the 21-Aug CG & Multimedia exam (exam ~3 PM same day as last request — extreme time crunch).
- Later: classmates, Units 2–5.

## Architecture
- Backend: FastAPI (`/app/backend/server.py`), content in `/app/backend/content_unit1.py` (UNIT_1 dict), seeded to Mongo `units` collection on startup (idempotent replace_one upsert). Routes: `GET /api/units`, `GET /api/units/{unit_id}`.
- Frontend: React (JSX, CRA/craco). `App.js` fetches `/api/units/cg-unit-1`. Components: `Sidebar.jsx`, `TopicCard.jsx`, `Boxes.jsx`, `FinalSections.jsx`, `diagrams/` (10 hand-coded SVGs: intro-flow, display-tree, crt, raster, random, rgb, cmy, hsv, dda-grid, scan-flow).
- Print CSS in `App.css`: A4, compact 10.5px, topics flow continuously, avoid-break on blocks, sidebar/header hidden.
- No auth, no third-party integrations.

## What's Been Implemented
- 2026-06 (MVP): Full booklet — 10 topics × 7-step pattern, DDA solved example (2,3)→(8,6) verified, 4 final sections, sidebar scroll-spy, print button, mobile menu. Tested (iteration_1: backend 100%, frontend 95%; mobile over-scroll fixed via deferred scrollIntoView).
- 2026-06 (Compaction, user request — 4-5 hrs before exam): Content condensed to "Rapid Revision" — shorter definitions/working, only 2 comparison tables (Raster vs Random ★, RGB vs CMY ★), removed answer-structure blocks, removed Diagram Gallery + 8 Answer Templates sections, must-memorize trimmed to 12, print CSS compacted → PDF ≈ 6 pages (was ~15).

## Backlog / Remaining
- P1: Units 2–5 content (schema already supports; just add dicts + seed).
- P2: Restore full "long version" toggle (compact vs detailed view) — long content was replaced, retrievable from git history.
- P2: Search/keyword filter, mark-as-mastered checkboxes (design guidelines extras, not built).
- P2: DDA interactive calculator.

## Notes
- Frontend is JSX (template default), not TypeScript as in original statement — accepted tradeoff.
- Backend regression tests: `/app/backend/tests/backend_test.py` (written against the ORIGINAL long schema — needs updating for compact schema: key_points→quick_facts, final_sections now has only 2 keys, DDA table 4 cols).
