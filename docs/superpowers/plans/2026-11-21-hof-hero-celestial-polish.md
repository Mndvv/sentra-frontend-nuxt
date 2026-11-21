# Hall of Fame Hero & Constellation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Hall of Fame hero section and Leo constellation into an authentic, editorial celestial cartography experience, eliminating all AI slop patterns, fixing mobile geometry distortion, and providing a clean interactive star HUD.

**Architecture:** Refactor `HofHero.vue`, `HofLeoConstellation.vue`, and `HofStarfield.vue` to use an astronomical coordinate space with preserved aspect ratio, deep obsidian palette, surgical minimal star nodes, and a responsive inspection HUD card.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, Tailwind CSS v4, SVG Cartography, TypeScript.

**Spec:** `docs/superpowers/specs/2026-11-21-hof-hero-celestial-polish-design.md`

## Global Constraints

- Zero em dashes (`—`) in any copy (R-02); use comma, period, colon, or parentheses.
- Zero AI slop patterns: no generic purple-to-blue gradient, no sparkle icons, no capsule badges with pulsing dots, no radioactive ping glows.
- Mobile responsiveness (R-03): zero horizontal overflow, SVG aspect ratio preserved via `preserveAspectRatio="xMidYMid meet"`, tap target minimum 44x44px.
- Ponytail rule: minimal code, native SVG and CSS features before complex libraries, delete unneeded decorative code.
- Karpathy rule: surgical changes, trace every line to user requirements, eliminate dead code/orphaned imports.
- Keyboard accessibility (R-32): all star buttons must be focusable via Tab, activatable with Enter/Space, with clear `:focus-visible` ring.

## Review Focus

1. Mobile viewport (360px - 400px width): Verify that the constellation does not warp, stars do not overlap, and the inspection HUD fits cleanly within the screen.
2. Aspect ratio stability: Verify SVG lines and star nodes align across different aspect ratios (desktop ultra-wide, standard laptop, tablet, mobile).
3. Star selection interaction: Verify clicking any star updates the active star state, displays the correct cabinet details in the HUD, and emits the `select` event.
4. Keyboard focus & accessibility: Verify Tab navigation through stars highlights active star with high-contrast ring.
5. Contrast & text legibility: Verify all text against the obsidian sky passes WCAG AA contrast (minimum 4.5:1).

---

### Task 1: Refactor Constellation Geometry & Astronomical Coordinate System (`HofLeoConstellation.vue`)

**Files:**
- Modify: `app/components/hof/HofLeoConstellation.vue`

**Interfaces:**
- Consumes: `props.generations: any[]`
- Produces: Emits `select(generation: any)` when a star is clicked or activated from the HUD card.

- [ ] **Step 1: Define locked astronomical coordinates and SVG viewBox**
  Update `LEO_STARS` and `LEO_EDGES` to use a precise `1000 x 600` astronomical coordinate space.
  Set SVG `viewBox="0 0 1000 600"` and `preserveAspectRatio="xMidYMid meet"`.

- [ ] **Step 2: Implement minimal astronomical star nodes and connectors**
  Strip out `animate-ping`, `animate-pulse`, `blur-md`, unicode `★`, and sparkle icons.
  Implement SVG connector lines with authentic astronomical styling (faint primary lines with coordinate ticks).
  Render interactive star nodes as accessible buttons with proper ARIA attributes, sized by stellar magnitude (Regulus Alpha = largest, Denebola/Algieba = medium, guide stars = subtle).

- [ ] **Step 3: Implement Celestial Inspection HUD Card**
  Add state `selectedStarId` (defaulting to `"regulus"`).
  Render a sleek inspection HUD card at the bottom of the constellation container displaying the selected cabinet's title, angkatan, years, and an action button to jump directly to its full profile/details.

- [ ] **Step 4: Verify in terminal / build check**
  Run: `npx nuxi typecheck` or test build to verify no TypeScript or template syntax errors in `HofLeoConstellation.vue`.

- [ ] **Step 5: Commit**
  ```bash
  git add app/components/hof/HofLeoConstellation.vue
  git commit -m "feat(hof): polish Leo constellation with celestial cartography and inspection HUD"
  ```

---

### Task 2: Polish Hero Section Layout & Editorial Typography (`HofHero.vue`)

**Files:**
- Modify: `app/components/hof/HofHero.vue`

**Interfaces:**
- Consumes: `generations`, `generation`, `loading`, `lineage`
- Produces: Emits `select` and `cta` to parent page.

- [ ] **Step 1: Replace generic AI purple gradient with deep celestial obsidian canvas**
  Change background to `#05070e` with subtle dark navy depth `#090e1f` and astronomical declination grid lines.

- [ ] **Step 2: Upgrade typography and lineage metric**
  Remove generic drop shadow and pill badges with glowing dots.
  Apply refined editorial typography: micro category label "ARSIP KEHORMATAN KEPEMIMPINAN NAWASENA", elegant title "Hall of Fame", and balanced prose without em dashes.
  Display the lineage metric as an authentic astronomical telemetry badge.

- [ ] **Step 3: Refine CTA button**
  Replace generic floating pill button with an architectural celestial anchor button ("Telusuri Angkatan").

- [ ] **Step 4: Verify build**
  Run: `npx nuxi typecheck` to ensure clean compilation.

- [ ] **Step 5: Commit**
  ```bash
  git add app/components/hof/HofHero.vue
  git commit -m "feat(hof): polish hero section with editorial typography and obsidian canvas"
  ```

---

### Task 3: Refine Ambient Starfield & Optical Luminance (`HofStarfield.vue`)

**Files:**
- Modify: `app/components/hof/HofStarfield.vue`

**Interfaces:**
- Consumes: `density`, `seed`, `tone`, `shooting`

- [ ] **Step 1: Calibrate starfield density and natural twinkle**
  Ensure stars have natural variation in size and opacity, avoiding harsh flickering.
  Ensure shooting star respects `prefers-reduced-motion` and has a quiet, realistic trajectory.

- [ ] **Step 2: Verify build**
  Run: `npx nuxi typecheck`

- [ ] **Step 3: Commit**
  ```bash
  git add app/components/hof/HofStarfield.vue
  git commit -m "feat(hof): calibrate ambient starfield luminance and natural motion"
  ```

---

### Task 4: Whole-Page Integration, Responsive Verification, and Visual Testing (`app/pages/hof.vue`)

**Files:**
- Modify: `app/pages/hof.vue` (if horizon transition needs color alignment with new obsidian canvas)

- [ ] **Step 1: Align horizon transition with `#05070e` obsidian canvas**
  Update horizon gradient from `#241d57` to `#05070e` / `#090e1f` so the visual seam to `#hof-lineage` blends seamlessly.

- [ ] **Step 2: Build verification**
  Run: `npm run build` or `npx nuxi build` to verify full compilation without errors.

- [ ] **Step 3: Visual inspection via DevTools / Browser test**
  Verify desktop (1280px) and mobile (375px) layout, ensuring zero horizontal overflow, crisp text, and smooth star selection.

- [ ] **Step 4: Commit**
  ```bash
  git add app/pages/hof.vue
  git commit -m "feat(hof): align horizon transition with celestial obsidian theme"
  ```
