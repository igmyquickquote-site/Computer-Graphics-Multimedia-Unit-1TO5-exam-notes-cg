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
- 2026-06 (Cheat Card + Unit 2): Pocket Cheat Card (formulas + memory hooks, 2-min read) added to each unit's final_sections, rendered right after cover with sidebar/mobile-menu links. Unit 2 added (`content_unit2.py`, 8 topics: Bresenham line w/ solved (2,3)→(8,6) table, Midpoint circle w/ r=5 solved table, Polygon fill, 2D transforms, Reflection & Shear, Homogeneous/composite, Window-Viewport, Clipping) with 6 new hand-coded SVGs (DiagramsC.jsx) and a Unit 1/Unit 2 switcher in the header. Tested (iteration_2: backend 14/14, frontend 100%).
- 2026-06 (Unit 3): Unit 3 added (`content_unit3.py`, 8 topics: 3D concepts, 3D translate/scale w/ solved (2,3,4)→(6,10,14), 3D rotation w/ solved Rz90°(1,2,3)→(−2,1,3), Parallel projection, Perspective w/ solved P(6,8,10),d=5→(3,4) + Parallel-vs-Perspective table, Hidden surface removal (back-face/Z-buffer/painter), Bezier w/ solved B(0.5)=(4,3), B-spline + comparison table) with 5 new SVGs (DiagramsD.jsx: axes-3d, projection-tree, parallel-vs-perspective, zbuffer, bezier) and its own cheat card. Tested (iteration_3: backend 24/24, frontend 100%).

- 2026-06 (Unit 4): Unit 4 Multimedia Basics added (`content_unit4.py`, 8 topics: Intro to multimedia, Components T-I-A-V-A, Text & images (bitmap vs vector), Digital audio & MIDI, Digital video, Animation, Compression, Applications & authoring tools) with 4 solved numericals (image 1.44 MB, audio 1.76 MB, video 230 MB, RLE 10→8), 3 comparison tables and 6 new SVGs (DiagramsE.jsx: mm-components, bitmap-vector, audio-sampling, video-frames, keyframe-tween, compression-tree) + own cheat card. Tested (iteration_4: backend 37/37, frontend 100%).

- 2026-06 (Unit 5 — syllabus complete): Unit 5 added (`content_unit5.py`, 8 topics: JPEG, MPEG I/P/B, Huffman solved tree, CD-ROM/DVD, Streaming/VoD, VR & AR, Project stages, File formats) with 3 comparison tables and 6 SVGs (DiagramsF.jsx) + own cheat card. All 5 units live. Tested (iteration_5: backend 49/49, frontend 100%).
- 2026-06 (Factual corrections pass): User-requested targeted corrections applied across all 5 units without redesign: DDA nearest-pixel rounding (no universal ".5 rounds up"), CMY "in theory approaches black, K for practical black", zero "HSI" mentions in Unit 1, Unit 2 composite order tied to column vectors + Cohen-Sutherland OR=0000 accept / AND≠0000 reject, Unit 3 back-face redefined with V = surface→viewer ⇒ N·V < 0 hidden (consistent in topic/cheat/LMR/definitions) + "eliminates many faces" wording, Unit 4 PAL ≈ 25 / NTSC ≈ 30 fps + qualitative compression ratios, Unit 5 quantization = MAIN lossy step (chroma subsampling noted), MPEG P/B via reference frames + residuals, MP4 = container for MPEG-4. Diagram labels updated in DiagramsE/F. Verified (iteration_6: backend 73/73, frontend 100%, no regressions).

## Backlog / Remaining
- P2: Quick quiz per unit, combined all-units print, question predictions section.
- P2: Restore full "long version" toggle (compact vs detailed view) — long content retrievable from git history.
- P2: Search/keyword filter, mark-as-mastered checkboxes, question predictions section.

## Notes
- Frontend is JSX (template default), not TypeScript as in original statement — accepted tradeoff.
- Backend regression tests: `/app/backend/tests/backend_test.py` — updated by testing agent to the compact 2-unit schema (14 tests, all pass).
- Bresenham topic intentionally reuses the `dda-grid` SVG (same pixels for that line); editing that diagram affects both units.
