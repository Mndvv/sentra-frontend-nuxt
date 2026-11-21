# Landing Page Total Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the SENTRA landing page (`app/pages/index.vue` and `app/components/beranda/*`) into an award-winning, responsive editorial portal while preserving 100% of the established color palette and data layer.

**Architecture:** Modern Bento Grid & Editorial Masthead architecture. Unifies the fragmented sections into a cohesive, high-density layout: an authoritative Hero, an integrated Bento Hub (Philosophy + Live Radio + Agenda Timeline), an interactive Program Kerja showcase, an editorial Documentation reel, and an Aurora suggestion callout.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS (v4 theme tokens), Nuxt UI, Iconify (@iconify-json/material-symbols).

**Spec:** `docs/superpowers/specs/2026-11-21-landing-page-rebuild-design.md`

## Global Constraints
- Preserve exact color tokens from `app/css/global.css`: `--bg-primary`, `--bg-card`, `--bg-card-2`, `--text-main`, `--text-muted`, `--text-subtle`, `--accent` (#6366f1), `--accent-hover` (#4f46e5), and status badge colors.
- Maintain seamless support for both Light and Dark modes (`body.dark-theme`, `.dark`).
- Impeccable bans: No kickers/eyebrows above headings, no thick colored borders (>1px) on cards, no gradient text, no emoji icons.
- UI/UX Pro Max: Minimum 44x44px touch targets for clickable controls, WCAG AA contrast (≥4.5:1), visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-accent`), zero layout shift (CLS < 0.1).
- Data integrity: Do not break or alter API calls (`useAgenda`, `useProgram`, `useDokumentasi`, `useMusicPlayer`).

## Review Focus
- Mobile responsiveness: Grid layouts must stack cleanly on 320px–640px screens without horizontal scroll.
- Radio player synchronization: Toggling play/pause in Hero or Radio widget must synchronize reactively with `useMusicPlayer` state.
- Empty states & loading skeletons: When API returns 0 items or is fetching, display elegant skeletons or dashed empty states without breaking layout.
- Dark theme contrast: All text, icons, card backgrounds, and hairline borders must maintain sharp contrast in dark mode.
- Footer duplication: Ensure only the layout's `AppFooter` is rendered; remove obsolete `<BerandaFooter />` in `index.vue`.

---

### Task 1: Rebuild Editorial Hero Section (`HeroSection.vue`)

**Files:**
- Modify: `app/components/beranda/HeroSection.vue`

**Interfaces:**
- Consumes: `useMusicPlayer()` (`isPlaying`, `playlist`, `currentTrack`, `loadPlaylist`, `togglePlay`)
- Produces: Emits click scrolls to content and triggers audio playback

- [ ] **Step 1: Inspect and prepare `HeroSection.vue` structure**
  - Replace the old ruled paper lines and uppercase eyebrow badge with an editorial masthead.
  - Implement an asymmetric layout: left-aligned on desktop with clean, large display typography (`clamp(2.4rem, 6vw, 4.5rem)`), tight tracking (`tracking-tight` / `-0.035em`), and no gradient text.
  - Add a live cabinet status badge: `Kabinet Nawasena · SMAN 2 Jonggol 2025/2026` with a pulsing accent indicator.
  - Include an articulate lede paragraph explaining Nawasena's mission.
  - Primary CTA `Jelajahi Portal` with smooth scroll to `#bento-hub`.
  - Secondary CTA `Putar Radio` with synchronized waveform EQ and reactive pause/play state.
  - Now Playing mini ticker when radio is active.

- [ ] **Step 2: Verify component rendering and theme compatibility**
  - Verify syntax and styling in both light and dark themes.

- [ ] **Step 3: Commit**
  ```bash
  git add app/components/beranda/HeroSection.vue
  git commit -m "feat(beranda): rebuild HeroSection with editorial masthead and live audio controls"
  ```

---

### Task 2: Refactor Section Header (`SectionHeader.vue`)

**Files:**
- Modify: `app/components/beranda/SectionHeader.vue`

**Interfaces:**
- Consumes: Props (`title: string`, `subtitle?: string`, optional `action` slot)
- Produces: Clean, accessible section heading without banned eyebrows/kickers

- [ ] **Step 1: Remove banned kicker/eyebrow tag**
  - Remove the uppercase pill badge above the heading in `SectionHeader.vue`.
  - Let the heading carry its own weight: `text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-text-main`.
  - Pair with a refined subtitle in `text-text-muted text-sm md:text-base`.
  - Provide an optional right-aligned `#action` slot for view-all links.
  - Replace the arbitrary thick underline with a minimal hairline rule or clean spacing.

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/SectionHeader.vue
  git commit -m "refactor(beranda): clean SectionHeader according to impeccable craft floor"
  ```

---

### Task 3: Redesign Filosofi Card (`FilosofiSection.vue`)

**Files:**
- Modify: `app/components/beranda/FilosofiSection.vue`

**Interfaces:**
- Consumes: `useScrollReveal()`
- Produces: Integrated compass origin card for the Bento Grid

- [ ] **Step 1: Eliminate 4px colored border-left and refactor into modern bento card**
  - Replace the 4px left-border with clean `border border-border bg-bg-card` and subtle tinted elevation shadow.
  - Add an atmospheric compass motif / subtle background watermark.
  - Refine Sanskrit etymology chips ("Nawa", "Sena", "Nawasena") with high-contrast text and icons.
  - Ensure rich typography highlighting the core quote ("Masa depan yang cerah bukan sekadar angan...").

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/FilosofiSection.vue
  git commit -m "feat(beranda): modernize FilosofiSection into a refined bento card"
  ```

---

### Task 4: Redesign Live Radio Widget (`RadioSection.vue`)

**Files:**
- Modify: `app/components/beranda/RadioSection.vue`

**Interfaces:**
- Consumes: `useMusicPlayer()`
- Produces: Interactive Bento audio streaming component

- [ ] **Step 1: Enhance Radio player widget layout and controls**
  - Retain full functionality: `prevTrack()`, `togglePlay()`, `nextTrack()`, `playTrack(idx)`.
  - Design a compact, broadcast-quality audio player card with live equalizer animation, track status ("Sedang Mengudara" / "Offline"), track title truncation, and play/pause button with 44x44px touch target.
  - Refine the playlist scroller with custom themed scrollbar and active track highlight.
  - Ensure dark and light mode background contrast (`bg-bg-card`, `bg-bg-card-2`).

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/RadioSection.vue
  git commit -m "feat(beranda): enhance RadioSection into an integrated bento player"
  ```

---

### Task 5: Redesign Agenda Card (`AgendaCard.vue`)

**Files:**
- Modify: `app/components/beranda/AgendaCard.vue`

**Interfaces:**
- Consumes: `agenda` prop (`judul`, `ket`, `start_date`, `end_date`), `useAgenda().formatDate`
- Produces: Sleek calendar card for the Agenda list

- [ ] **Step 1: Remove 4px left border and style modern agenda card**
  - Strip the `w-[4px] bg-accent` line.
  - Use a dedicated date chip (day numeral + month abbreviation) with accent tint.
  - Display title in `font-bold text-text-main group-hover:text-accent transition-colors`.
  - Clean 2-line truncated description.
  - Card hover elevation with soft blur shadow and hairline border transition.

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/AgendaCard.vue
  git commit -m "feat(beranda): modernize AgendaCard with calendar date pill"
  ```

---

### Task 6: Redesign Program Kerja Cards (`ProkerCard.vue`)

**Files:**
- Modify: `app/components/beranda/ProkerCard.vue`

**Interfaces:**
- Consumes: `program` prop (`nama`, `deskripsi`, `status`, `sekbid_name`)
- Produces: Interactive program kerja card

- [ ] **Step 1: Modernize card structure and status indicators**
  - Replace generic box with an elevated card featuring a status indicator dot (`Berjalan` amber, `Selesai` green, `Direncanakan` violet/indigo).
  - Sekbid tag pill with clean border.
  - Distinct title and description with high-contrast text.
  - Smooth hover lift (`hover:-translate-y-1 hover:shadow-md hover:border-accent/40`).

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/ProkerCard.vue
  git commit -m "feat(beranda): overhaul ProkerCard with polished status pills and hover effects"
  ```

---

### Task 7: Redesign Dokumentasi Card (`DokumCard.vue`)

**Files:**
- Modify: `app/components/beranda/DokumCard.vue`

**Interfaces:**
- Consumes: `ev` prop, `isFeatured?: boolean`, `useImageUrl`, `articleSlug`, `formatDate`
- Produces: Editorial documentation article card

- [ ] **Step 1: Refactor DokumCard for magazine-grade presentation**
  - High-performance image container with subtle hover zoom.
  - Category / tag pill on top of thumbnail with backdrop blur.
  - Date stamp with icon.
  - Headline with clean typography and hover color transition.
  - "Baca Artikel" arrow micro-interaction that shifts right on hover.

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/DokumCard.vue
  git commit -m "feat(beranda): upgrade DokumCard to editorial visual style"
  ```

---

### Task 8: Redesign Kotak Saran Callout (`KotakSaranCta.vue`)

**Files:**
- Modify: `app/components/beranda/KotakSaranCta.vue`

**Interfaces:**
- Consumes: `isAuroraOpen` state
- Produces: Engaging suggestion box CTA banner

- [ ] **Step 1: Build an inspiring, accessible AURORA CTA banner**
  - Create a dual-tone card with soft radial indigo glow.
  - Icon container with mail/aspiration icon and subtle glow.
  - Heading: "Suaramu Membentuk Nawasena".
  - Supporting text reassuring anonymity and student council responsiveness.
  - High-contrast button "Sampaikan Aspirasi" triggering `openAurora()`.

- [ ] **Step 2: Commit**
  ```bash
  git add app/components/beranda/KotakSaranCta.vue
  git commit -m "feat(beranda): modernize KotakSaranCta with ambient glow and clear CTA"
  ```

---

### Task 9: Assemble & Reorganize Landing Page (`app/pages/index.vue`)

**Files:**
- Modify: `app/pages/index.vue`

**Interfaces:**
- Consumes: All `Beranda*` components, `useAgenda`, `useProgram`, `useDokumentasi`, `useSeoMeta`
- Produces: The complete rewritten Beranda landing page

- [ ] **Step 1: Orchestrate sections into Modern Bento Architecture**
  - Section 1: `<BerandaHeroSection />`
  - Section 2: `#bento-hub` — An integrated Bento Grid combining:
    - Left/Top (7 cols): `<BerandaFilosofiSection />`
    - Right/Top (5 cols): `<BerandaRadioSection />`
    - Bottom (12 cols): Agenda Terdekat subsection with 3-card grid + view-all link.
  - Section 3: Program Kerja Showcase with interactive status filter and grid.
  - Section 4: Dokumentasi & Rekam Jejak with 1-lead-plus-companions layout.
  - Section 5: Kotak Saran AURORA CTA.
  - Remove duplicate `<BerandaFooter />` element (as `default.vue` already renders `AppFooter`).

- [ ] **Step 2: Verify page transitions and scroll behavior**
  - Verify smooth scrolling between hero buttons and `#bento-hub`.

- [ ] **Step 3: Commit**
  ```bash
  git add app/pages/index.vue
  git commit -m "feat(beranda): complete landing page rebuild with Bento Grid orchestration"
  ```

---

### Task 10: Full Verification & Quality Assurance

- [ ] **Step 1: Run typecheck / build check**
  Run: `npm run build` or `npx nuxi prepare`
  Verify: 0 build errors, 0 syntax errors.

- [ ] **Step 2: Dark mode & Light mode visual verification**
  Verify all CSS variables and contrast levels.

- [ ] **Step 3: Impeccable detect check**
  Run: `& "C:\Users\Hype GLK\.gemini\config\skills\impeccable\scripts\impeccable.cmd" detect --json app/pages/index.vue`
  Verify: No critical design regression issues.
