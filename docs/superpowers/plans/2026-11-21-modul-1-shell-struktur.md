# Modul 1: Global Shell & Struktur Organisasi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Global Shell (Floating Pill Navbar and Mini Player) and the entire Struktur Organisasi page (`/struktur` and its components/modals) into an editorial, high-craft, anti-slop interface with natural human Indonesian copy, strict palette adherence, and surgical code changes.

**Architecture:** Floating Pill Shell (top floating navbar + bottom floating audio controller) and Editorial Directory Layout (authoritative masthead, segmented org toggle, tiered leadership cards, and accessible detail modals).

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Iconify Material Symbols, Nuxt Image IPX.

**Spec:** `docs/superpowers/specs/2026-11-21-modul-1-shell-struktur-design.md`

## Global Constraints
- **Palette Lock:** Use only colors from `app/css/global.css`: `--bg-primary`, `--bg-card`, `--bg-card-2`, `--text-main`, `--text-muted`, `--text-subtle`, `--accent` (#6366f1), `--accent-hover` (#4f46e5), and status badge tokens.
- **Antislop Rules:** No em dashes (`—`), no gradient text clip (`bg-clip-text text-transparent`), no arbitrary border-left > 1px, no fake AI buzzwords, no non-functional dead controls.
- **Humanizer:** Natural, high-school-appropriate Indonesian copy. No inflated corporate slogans.
- **Ponytail & Karpathy:** Minimal, readable, native platform features first. No unnecessary abstraction wrappers. Surgical edits.
- **Accessibility:** Minimum 44x44px touch targets, full keyboard navigation with visible focus indicators (`focus-visible:ring-2 focus-visible:ring-accent`), Escape key modal dismissal.

## Review Focus
- Modal accessibility: Both `PengurusModal` and `SekbidModal` must dismiss on Escape key press and prevent background page scrolling while open.
- Responsive Navigation: Floating pill navbar must gracefully convert to a clean mobile sheet on screens under 768px.
- Dark theme contrast: All text, avatar borders, and badges must pass WCAG AA contrast in both light and dark modes.
- API Data preservation: Maintain existing composables (`useStruktur`, `useSekbidMeta`, `useImageUrl`, `useMusicPlayer`) without breaking reactivity.

---

### Task 1: Rebuild Global Floating Pill Navbar (`AppNavbar.vue`)

**Files:**
- Modify: `app/components/AppNavbar.vue`

**Interfaces:**
- Consumes: `useColorMode()`, `useState('isAuroraOpen')`
- Produces: Floating pill navigation header for all pages

- [ ] **Step 1: Implement floating pill navigation shell**
  - Replace full-width top bar with a centered floating pill: `fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[960px] h-[54px] rounded-full bg-bg-card/90 backdrop-blur-md border border-border shadow-md z-[1000] px-4 sm:px-6 flex items-center justify-between`.
  - Brand: `SENTRA.` with accent dot.
  - Centered navigation links (Beranda, Struktur, Program, Dokumentasi, Sponsor) with pill active state (`!bg-accent-soft !text-accent font-bold`).
  - Actions: Theme toggle button + Aspirasi button triggering `openAurora()`.
  - Mobile menu: Clean floating sheet with backdrop overlay when open, keyboard accessible with Escape dismiss.

- [ ] **Step 2: Verify desktop & mobile responsiveness**
  - Verify that no content is clipped on 320px–1440px viewports.

---

### Task 2: Refactor Global Mini Player (`AppMiniPlayer.vue`)

**Files:**
- Modify: `app/components/AppMiniPlayer.vue`

**Interfaces:**
- Consumes: `useMusicPlayer()`
- Produces: Floating bottom audio controller

- [ ] **Step 1: Modernize floating mini player into a sleek pill**
  - Collapsed state: Compact circular button with pulsing radio icon when playing.
  - Expanded state: Sleek pill container showing track title, live equalizer bars, play/pause, next track, and playlist drawer.
  - Touch targets minimum 44x44px, focus rings, no awkward margin jumps.

---

### Task 3: Redesign Struktur Masthead & Tabs (`app/pages/struktur.vue`)

**Files:**
- Modify: `app/pages/struktur.vue`

**Interfaces:**
- Consumes: `useStruktur()`
- Produces: Main layout and masthead for `/struktur`

- [ ] **Step 1: Overhaul masthead, stat summary, and organization tabs**
  - Remove banned uppercase eyebrow pill.
  - Masthead: `Kabinet Nawasena 2025/2026` in large display font, humanized description of OSIS & MPK.
  - Compact stat chips: Pengurus Inti count, Sekbid/Komisi count, Total Anggota.
  - Org toggle: Segmented pill button (`OSIS` vs `MPK`) with active states.
  - Empty state for MPK with friendly, human copy.

---

### Task 4: Redesign Pengurus Card (`PengurusCard.vue`)

**Files:**
- Modify: `app/components/struktur/PengurusCard.vue`

**Interfaces:**
- Consumes: `pengurus` prop, `isFeatured?: boolean`, `useImageUrl`
- Produces: Leadership cards with clear visual hierarchy

- [ ] **Step 1: Refactor PengurusCard into high-craft portrait card**
  - Remove arbitrary gradient borders.
  - Featured card (Ketua / Wakil): Elegant horizontal or prominent card on desktop with portrait, name, motto quote, and role badge.
  - Regular cards: Consistent grid cards with avatar, name, jabatan pill, and hover lift.
  - Accessible click handler and focus rings.

---

### Task 5: Redesign Sekbid Card (`SekbidCard.vue`)

**Files:**
- Modify: `app/components/struktur/SekbidCard.vue`

**Interfaces:**
- Consumes: `sekbid` prop, `index`, `useSekbidMeta`
- Produces: Grid cards for 10 Sekbid / 5 Komisi

- [ ] **Step 1: Overhaul SekbidCard with clean typography and badges**
  - Distinct sekbid icon in rounded container using `--sekbid-color` accent.
  - Chip label (`Sekbid 1` / `Komisi A`).
  - Title in high-contrast text.
  - Bottom counters for members and programs.
  - Subtle hover border transition.

---

### Task 6: Modernize Pengurus Modal (`PengurusModal.vue`)

**Files:**
- Modify: `app/components/struktur/PengurusModal.vue`

**Interfaces:**
- Consumes: `useStruktur()` (`isPengurusModalOpen`, `selectedPengurus`, `closePengurusModal`)
- Produces: Accessible detail modal for leadership profiles

- [ ] **Step 1: Clean PengurusModal from AI slop & add full accessibility**
  - Solid backdrop with `role="dialog"`, `aria-modal="true"`.
  - Window Escape key handler to close modal.
  - 2-column desktop layout: Left panel (Avatar, name, jabatan, kelas, hobi, motto), Right panel (Biodata list, visi-misi, program kerja).
  - Clean hairline borders, zero gradient text, high contrast.

---

### Task 7: Modernize Sekbid Modal (`SekbidModal.vue`)

**Files:**
- Modify: `app/components/struktur/SekbidModal.vue`

**Interfaces:**
- Consumes: `useStruktur()` (`isSekbidModalOpen`, `selectedSekbid`, `closeSekbidModal`)
- Produces: Accessible detail modal for Sekbid/Komisi

- [ ] **Step 1: Clean SekbidModal and organize member & program lists**
  - Header with thematic sekbid color and icon.
  - Member grid with Koordinator crown and avatar zoom.
  - Program list with clear status pills (`Berjalan`, `Selesai`, `Direncanakan`).
  - Escape key dismiss and focus management.

---

### Task 8: Verification & Subagent Review

- [ ] **Step 1: Code formatting & Impeccable detect**
  - Run Prettier and `impeccable detect --json` on all modified files.
  - Verify 0 errors, 0 design violations.

- [ ] **Step 2: Commit all changes**
  - Create clean conventional git commit for Modul 1.
