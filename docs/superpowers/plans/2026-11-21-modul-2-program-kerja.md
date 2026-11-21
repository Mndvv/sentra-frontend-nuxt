# Modul 2: Program Kerja (Inisiatif Nawasena) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Program Kerja page (`/program`) and its components (`ProkerStats.vue`, `ProkerFilterTabs.vue`, `ProkerCard.vue`) into an editorial, mission-control directory with live instant search, standardized design tokens, zero AI slop, and accessible keyboard navigation.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Iconify Material Symbols.

**Spec:** `docs/superpowers/specs/2026-11-21-modul-2-program-kerja-design.md`

## Global Constraints
- **Palette Lock:** Use only colors from `app/css/global.css`: `--bg-primary`, `--bg-card`, `--bg-card-2`, `--text-main`, `--text-muted`, `--text-subtle`, `--accent` (#6366f1), `--border`, and badge variables (`--badge-ongoing-*`, `--badge-done-*`, `--badge-plan-*`).
- **Antislop Rules:** No em dashes (`—`), no gradient text clip, no arbitrary border-left > 1px, no fake AI buzzwords, no non-functional decorative nonsense.
- **Accessibility:** Minimum 44x44px touch targets, full keyboard navigation with visible focus indicators (`focus-visible:ring-2 focus-visible:ring-accent`), and smooth drawer expansions.
- **Ponytail & Karpathy:** Minimal, readable, surgical code changes using native Vue 3 reactivity and Tailwind classes.

---

### Task 1: Redesign Mission Control Dashboard (`app/components/program/ProkerStats.vue`)

**Files:**
- Modify: `app/components/program/ProkerStats.vue`

**Interfaces:**
- Consumes: `programs` prop (`any[]`), `activeFilter` model (`string`)
- Emits: `update:activeFilter`

- [ ] **Step 1: Replace cluttered SVG ring with sleek Mission Control strip**
  - Left Section:
    - Overall completion rate percentage (`% Selesai`).
    - Visual progress bar using `--accent` and `--badge-done-bg`.
    - Division counter: Total program, BPH count, Sekbid count.
  - Right Section:
    - 4 interactive metric cards (`Semua`, `Berjalan`, `Selesai`, `Direncanakan`).
    - Design tokens for each status badge.
    - Active filter highlighted with crisp border and accent background.
    - Accessible buttons (`tabindex="0"`, `role="button"`, focus rings).

---

### Task 2: Redesign Filter & Search Bar (`app/components/program/ProkerFilterTabs.vue`)

**Files:**
- Modify: `app/components/program/ProkerFilterTabs.vue`

**Interfaces:**
- Consumes: `modelValue: string`
- Emits: `update:modelValue`

- [ ] **Step 1: Overhaul status filter tabs with segmented pill styling**
  - Pill buttons: `Semua`, `Berjalan`, `Selesai`, `Direncanakan`, `Dibatalkan`.
  - Active state: `bg-accent text-white shadow-sm font-semibold`.
  - Inactive state: `text-text-muted hover:text-text-main hover:bg-bg-card-2`.
  - Smooth horizontal scrolling for mobile with hidden scrollbars.

---

### Task 3: Redesign Program Card (`app/components/program/ProkerCard.vue`)

**Files:**
- Modify: `app/components/program/ProkerCard.vue`

**Interfaces:**
- Consumes: `prog: any`
- Produces: High-craft editorial program card

- [ ] **Step 1: Rebuild card hierarchy and link drawers**
  - Header:
    - Left: Scope pill (`BPH` or `Sekbid X`) + Status badge with standardized tokens (`--badge-ongoing-*`, `--badge-done-*`, etc.).
    - Right: Linked item count indicator (if documentation or agenda is attached).
  - Body:
    - Title: High-contrast `text-text-main font-bold`.
    - Department name: Sekbid or BPH role indicator.
    - Description: Muted readable copy, max 3 lines.
    - Target: Calendar icon with target timeline.
  - Footer Links:
    - Documentation link button linking to `/dokumentasi/[slug]` with article icon.
    - Agenda drawer button: Accordion with smooth transition displaying date range and agenda notes.
  - No layout shift or unstyled borders.

---

### Task 4: Rebuild Program Page Layout & Search (`app/pages/program.vue`)

**Files:**
- Modify: `app/pages/program.vue`

**Interfaces:**
- Consumes: `useProgram()`
- Produces: Main layout, editorial masthead, live search input, and responsive program grid.

- [ ] **Step 1: Update page masthead and controls toolbar**
  - Remove banned uppercase eyebrow pill.
  - Clean masthead: `Inisiatif Nawasena 2025/2026`.
  - Subtitle: Natural high school Indonesian copy.
  - Search bar: Integrated search input with search icon and clear button.
  - Filter computation: Combine `filteredPrograms` with `searchQuery` to filter by title, description, or department.
  - Skeletons: Clean pulse cards matching new `ProkerCard` geometry.
  - Empty state: Friendly human message when no programs match search or filter.

---

### Task 5: Verification & Review

- [ ] **Step 1: Code formatting & Impeccable detect**
  - Run `npx prettier --write` on all modified files.
  - Run `impeccable detect --json` to verify zero violations.
  - Verify clean git diff and commit changes.
