# Custom Error Page (404/500/Timeout) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom `app/error.vue` error page using the Editorial Clean design system that intelligently adapts to 404 (Not Found), 500 (Server Error), and 504/Timeout errors with recovery controls, theme consistency, and collapsible technical diagnostic details.

**Architecture:**
1. Nuxt Error Infrastructure:
   - Root error handler in `app/error.vue` accepting `error: Object as () => NuxtError`.
   - Recovery triggers using `clearError({ redirect: '/' })` and `window.location.reload()`.
2. Adaptive Error State Logic:
   - Computed mapping based on `error.statusCode`:
     - 404: "Halaman yang Anda Cari Tidak Tersedia" (`material-symbols:search-off-rounded`)
     - 500: "Server Sedang Mengalami Kendala" (`material-symbols:dns-outline-rounded`)
     - 504 / 408: "Koneksi Server Terputus" (`material-symbols:timer-off-outline-rounded`)
     - Default: "Terjadi Kesalahan Tak Terduga" (`material-symbols:error-outline-rounded`)
3. Layout & UX Affordances:
   - Full viewport centered card with subtle background grid/ambient border.
   - Large bold status code display (`text-6xl sm:text-7xl font-black text-accent`).
   - Action buttons: "Kembali ke Beranda" (primary solid) + "Muat Ulang Halaman" (secondary outlined).
   - Collapsible diagnostic details accordion for `error.message` / `error.statusMessage`.
4. Theme & SEO:
   - Synchronized with `useColorMode()`, `bg-bg-primary`, `text-text-main`, `border-border`.
   - `useSeoMeta` for appropriate title and description.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Nuxt Icon (Material Symbols).

**Spec:** `anti-slop/audit-005-2026-11-23.md` and user grill-me alignment (A1: Editorial Clean, A2: Komprehensif Adaptif, A3: Beranda + Reload + Collapsible Accordion).

## Global Constraints
- Zero em dashes (`—`) in UI copy.
- No raw CSS blur blobs or generic AI stock graphics.
- Strictly local git commit; NO REMOTE PUSH.

---

### Task 1: Create `app/error.vue`
**Files:**
- Create: `app/error.vue`

**Steps:**
- [x] Define Nuxt error props and imports.
- [x] Implement adaptive error computed property covering 404, 500, 504/timeout, and generic codes.
- [x] Construct Editorial Clean centered card layout with large status code and semantic icon.
- [x] Add primary "Kembali ke Beranda" (`clearError({ redirect: '/' })`) and secondary "Muat Ulang Halaman" buttons.
- [x] Add collapsible technical error details accordion (`showDetails`).
- [x] Integrate AppNavbar brand or header if appropriate, or clean standalone layout matching Sentra identity.

---

### Task 2: Build Verification and Caveman Commit
**Files:**
- [x] Run: `npm run build`
- [x] Verify clean compilation with code 0.
- [x] Commit locally with `caveman-commit` format, strictly without pushing.
