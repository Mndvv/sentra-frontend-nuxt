# Leo Constellation Celestial UI/UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Leo Constellation hero section from an AI-slop infographic with muddy blur blobs and clunky static cards into an authentic, prestigious celestial cartography instrument with concentric coordinate rings for Regulus, an interactive glass telemetry card, and target scroll highlighting.

**Architecture:** 
1. SVG vector layer inside `HofLeoConstellation.vue` rendered with astronomical accuracy: fine coordinate curves, genuine Leo asterism edges, and rotating concentric celestial coordinate rings centered on Regulus (Alpha Leonis).
2. Clean starlight nodes for leadership periods: gleaming circular beacons with Roman numerals, free from obstructive static rectangular cards.
3. Interactive Focus / Glass Card: a floating celestial telemetry card anchored unobtrusively that provides rich cabinet details on hover/active star selection.
4. Target highlight pulse: `HofGenerationPanel.vue` receives an `is-highlighted` reactive prop from `hof.vue` to flash an amber focus ring when navigated to from the constellation.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, SVG Vector Geometry, TypeScript.

**Spec:** `anti-slop/audit-002-2026-11-22.md` and user grill-me alignment (A1: Interactive Focus / Glass Card, A2: Concentric Celestial Rings, A3: Direct Smooth Scroll + Target Highlight).

## Global Constraints
- Zero em dashes (`—`) in UI copy (Anti-Slop R-02).
- Zero raw CSS blur smudges (`blur-md` on amber/white) masquerading as starlight.
- Authentic astronomical stick-figure coordinates of Leo preserved.
- Native Vue/Tailwind and SVG vector capabilities prioritized (Ponytail: YAGNI, no heavy external dependencies).
- Strictly local git commit; NO PUSH to origin.

## Review Focus
- Constellation visibility: edges and nodes must remain clearly legible across all viewport widths (360px to 1920px).
- Regulus distinction: Regulus must immediately stand out as the brightest alpha beacon via concentric coordinate rings without blinding or muddying surrounding space.
- Hover & touch usability: on mobile touch, tapping a star focuses it and smoothly scrolls to the target panel.
- Clean typography: crisp font sizes, high contrast labels, zero overlapping boxes.
- Zero accessibility regressions: buttons retain semantic attributes, `aria-label`, and keyboard focus rings.

---

### Task 1: Redesign `HofLeoConstellation.vue` Core Astronomy & Concentric Rings
**Files:**
- Modify: `app/components/hof/HofLeoConstellation.vue`

**Steps:**
- [ ] Remove muddy CSS blur spans (`blur-md`, `blur-xs`) and heavy static card rectangles under the stars.
- [ ] Add SVG concentric celestial coordinate rings centered on Regulus (radius 18, 28, 38 with subtle dasharray and slow rotational animation).
- [ ] Refine the star beacons: crisp core orbs with Roman numerals (VII, VI) and glowing stellar halos created with precise SVG radial gradients instead of fuzzy CSS filters.
- [ ] Ensure non-generation guide stars of Leo remain subtle, elegant starlight pinpoints.

---

### Task 2: Implement Interactive Focus Glass Card
**Files:**
- Modify: `app/components/hof/HofLeoConstellation.vue`

**Steps:**
- [ ] Implement reactive `activeStarId` defaulting to `regulus` (the primary beacon representing the previous cabinet).
- [ ] Add an elegant floating glass telemetry card (anchored at the bottom or corner of the constellation canvas) styled with dark obsidian glass (`bg-[#090e1f]/90`, `backdrop-blur-md`, `border border-white/10`).
- [ ] Render the active star's cabinet metadata: title, angkatan, years, and if Regulus, the "Periode Sebelumnya (Regulus)" badge.
- [ ] Add direct click action to trigger `handleStarClick(star)` -> `emit('select', star.generation)`.

---

### Task 3: Add Target Highlight in `app/pages/hof.vue` and `HofGenerationPanel.vue`
**Files:**
- Modify: `app/pages/hof.vue`
- Modify: `app/components/hof/HofGenerationPanel.vue`

**Steps:**
- [ ] In `app/pages/hof.vue`, track `highlightedAngkatan` ref when `scrollToGeneration` is triggered, clearing after 2.5s.
- [ ] Pass `:is-highlighted="highlightedAngkatan === g.angkatan"` to `HofGenerationPanel`.
- [ ] In `HofGenerationPanel.vue`, add `isHighlighted?: boolean` prop and apply a golden pulse border/ring (`ring-2 ring-amber-400 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.25)] transition-all duration-500`) when highlighted.

---

### Task 4: Verification, Security Check, and Caveman Commit
**Files:**
- Run: `npm run build`
- Run security sanity check on template bindings
- Commit locally with `caveman-commit` format, strictly without pushing.
