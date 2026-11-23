# Command Palette (Cmd+K) & SEO / PWA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a lightning-fast, accessible Command Palette (`Cmd+K` / `Ctrl+K`) for global site-wide search across Pages, Program Kerja, Pengurus, and Dokumentasi; integrate desktop & mobile navbar triggers; eliminate em dashes in `nuxt.config.ts`; and configure complete PWA Web Manifest & OpenGraph metadata.

**Architecture:**
1. State & Hotkey Architecture:
   - Shared reactive state `const isCommandPaletteOpen = useState('isCommandPaletteOpen', () => false)`.
   - Global keyboard listener (`(e.metaKey || e.ctrlKey) && e.key === 'k'`) to open/toggle palette, and `Escape` to close.
2. Command Palette Component (`app/components/AppCommandPalette.vue`):
   - Teleported modal dialog with `role="dialog"`, `aria-modal="true"`, and body scroll locking.
   - Search input with auto-focus and debounce.
   - Grouped search results:
     - Halaman (Beranda, Struktur, Program, Dokumentasi, Sponsorship, Hall of Fame, Aspirasi)
     - Program Kerja (from `useProgram()`)
     - Pengurus & Sekbid (from `useApi().fetchPengurus()`)
     - Dokumentasi (from `useDokumentasi()`)
   - Keyboard navigation: `ArrowDown`, `ArrowUp`, and `Enter` for direct routing.
3. Navbar Integration (`app/components/AppNavbar.vue`):
   - Desktop: Spotlight search trigger button with `⌘K` / `Ctrl K` badge.
   - Mobile: Search icon button (`material-symbols:search-rounded`) next to theme toggle.
4. Layout Mounting (`app/layouts/default.vue`):
   - Mount `<AppCommandPalette />`.
5. SEO & PWA Manifest (`public/site.webmanifest`, `nuxt.config.ts`):
   - `public/site.webmanifest` with PWA standalone specifications.
   - `nuxt.config.ts`: replace em dashes (`—`) in title template and description, register manifest and OpenGraph tags.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Nuxt Icon (Material Symbols).

**Spec:** `anti-slop/audit-006-2026-11-23.md` and user grill-me alignment (A1: Grouped Instant Search, A2: Search bar di desktop + ikon di mobile, A3: PWA & OpenGraph lengkap).

## Global Constraints
- Zero em dashes (`—`) in UI copy and config.
- No heavy external search libraries (Ponytail: native reactive filtering & computed grouping).
- Strictly local git commit; NO REMOTE PUSH.

---

### Task 1: Create `public/site.webmanifest` & Update `nuxt.config.ts`
**Files:**
- Create: `public/site.webmanifest`
- Modify: `nuxt.config.ts`

**Steps:**
- [x] Create `public/site.webmanifest` with standalone display, colors, and application name.
- [x] In `nuxt.config.ts`, eliminate em dashes (`—`) in `titleTemplate` and `description`.
- [x] Link `site.webmanifest` in app head link configuration and enhance OpenGraph tags.

---

### Task 2: Build `app/components/AppCommandPalette.vue`
**Files:**
- Create: `app/components/AppCommandPalette.vue`

**Steps:**
- [x] Implement reactive search query and grouped results logic.
- [x] Implement keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- [x] Build high-craft modal dialog with obsidian/frosted backdrop and search input.
- [x] Style grouped categories with icons and active focus state.
- [x] Add body scroll locking when open.

---

### Task 3: Integrate Triggers in `AppNavbar.vue` & Mount in `default.vue`
**Files:**
- Modify: `app/components/AppNavbar.vue`
- Modify: `app/layouts/default.vue`

**Steps:**
- [x] Add desktop search button trigger with `⌘K` / `Ctrl K` badge in `AppNavbar.vue`.
- [x] Add mobile search icon button in `AppNavbar.vue`.
- [x] Add global hotkey listener `(e.metaKey || e.ctrlKey) && e.key === 'k'`.
- [x] Mount `<AppCommandPalette />` in `app/layouts/default.vue`.

---

### Task 4: Build Verification and Caveman Commit
**Files:**
- Run: `npm run build`
- Verify clean compilation with code 0.
- Commit locally with `caveman-commit` format, strictly without pushing.
