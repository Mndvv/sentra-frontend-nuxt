# Agenda Scroll Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the landing page Agenda section into a smooth, prestigious horizontal scroll carousel displaying all cabinet agendas, removing the misleading `/program` link, and introducing intuitive scroll navigation controls.

**Architecture:**
1. Horizontal Scroll Carousel in `app/pages/index.vue`:
   - Replace arbitrary `agendas.slice(0, 3)` with full `agendas` rendering in a horizontal scroll track.
   - CSS snap physics: `overflow-x-auto`, `snap-x snap-mandatory`, `scroll-smooth`, with each card taking `w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start`.
2. Header Navigation & Indicators:
   - Remove deceptive `NuxtLink to="/program"` ("Semua Agenda").
   - Add status pill badge: `${agendas.length} Agenda Terjadwal`.
   - Add paired navigation buttons (Previous & Next) with disabled state detection (`canScrollLeft`, `canScrollRight`).
3. Date formatting hygiene in `app/components/beranda/AgendaCard.vue`:
   - Replace en-dash unicode (`–`) with standard hyphen (` - `) to fulfill Anti-Slop R-02.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Nuxt Icon (Material Symbols).

**Spec:** `anti-slop/audit-004-2026-11-22.md` and user grill-me alignment (A1: Smooth Horizontal Scroll Carousel, A2: Ganti dengan Indikator Total Agenda & Kontrol Navigasi Geser).

## Global Constraints
- Zero em dashes (`—`) in UI copy.
- No heavy external slider/swiper libraries (Ponytail: YAGNI, native CSS scroll-snap + Vue reactivity only).
- Strict local git commit; NO REMOTE PUSH.

---

### Task 1: Overhaul Agenda Carousel in `app/pages/index.vue`
**Files:**
- Modify: `app/pages/index.vue`

**Steps:**
- [ ] Remove `NuxtLink to="/program"` in Agenda section.
- [ ] Add reactive `agendaTrackRef`, `canScrollLeft`, `canScrollRight`, and `scrollAgenda(direction: 'left' | 'right')` method.
- [ ] Insert header controls: badge indicator showing total scheduled agendas and prev/next scroll buttons.
- [ ] Wrap `<BerandaAgendaCard>` in horizontal scroll track with snap-start sizing (`w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start`).
- [ ] Render all items in `agendas` without slicing.

---

### Task 2: Typography Hygiene in `AgendaCard.vue`
**Files:**
- Modify: `app/components/beranda/AgendaCard.vue`

**Steps:**
- [ ] Replace en-dash (`–`) with standard hyphen (` - `) in `parsedDateRange`.

---

### Task 3: Build Verification & Caveman Commit
**Files:**
- Run: `npm run build`
- Verify clean compilation with exit code 0.
- Commit locally with `caveman-commit` format, strictly without pushing.
