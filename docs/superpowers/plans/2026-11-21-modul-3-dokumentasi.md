# Modul 3: Dokumentasi & Detail Artikel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Dokumentasi page (`/dokumentasi`), Detail Artikel page (`/dokumentasi/[slug]`), and documentation components (`GalleryCard.vue`, `LightboxModal.vue`) into an editorial photojournalism experience with instant live search, standardized design tokens, zero AI slop, and accessible keyboard navigation.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Iconify Material Symbols, Nuxt Image IPX.

**Spec:** `docs/superpowers/specs/2026-11-21-modul-3-dokumentasi-design.md`

## Global Constraints
- **Palette Lock:** Use only colors from `app/css/global.css`: `--bg-primary`, `--bg-card`, `--bg-card-2`, `--text-main`, `--text-muted`, `--text-subtle`, `--accent` (#6366f1), `--accent-hover` (#4f46e5), `--border`.
- **Antislop Rules:** No em dashes (`—`), no gradient text clip, no arbitrary border-left > 1px, no fake AI buzzwords.
- **Accessibility:** Minimum 44x44px touch targets, full keyboard navigation with visible focus indicators (`focus-visible:ring-2 focus-visible:ring-accent`), and Escape key modal dismissal for the lightbox.
- **Ponytail & Karpathy:** Surgical changes, native Vue 3 reactivity and Tailwind utilities, no unneeded wrappers.

---

### Task 1: Rebuild Gallery Card (`app/components/dokum/GalleryCard.vue`)

**Files:**
- Modify: `app/components/dokum/GalleryCard.vue`

**Interfaces:**
- Consumes: `ev` prop (`any`), `isFeatured?: boolean`, `delay?: number`
- Produces: Photojournalism card linking to `/dokumentasi/[slug]`

- [ ] **Step 1: Convert raw CSS to Tailwind v4 utilities and clean tokens**
  - Cover image: 16:10 or 4:3 with smooth hover scale (`group-hover:scale-[1.03]`).
  - Corner tag badge & photo count badge with camera icon.
  - Date formatting without em dashes.
  - High contrast title (`text-text-main font-bold`).
  - Description excerpt (2 lines clamp).
  - Hover transition arrow.
  - Keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-accent`).

---

### Task 2: Rebuild Dokumentasi Directory Layout & Search (`app/pages/dokumentasi/index.vue`)

**Files:**
- Modify: `app/pages/dokumentasi/index.vue`

**Interfaces:**
- Consumes: `useDokumentasi()`
- Produces: Main gallery directory layout with tags and live search.

- [ ] **Step 1: Replace raw CSS with standard container and editorial masthead**
  - Container: `max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8`.
  - Masthead: `Rekam Jejak <span class="text-accent">Nawasena</span>` with subtitle and activity/photo counters.
  - Controls Toolbar: Responsive row with tag pill buttons (`Semua`, tags) + live search input.
  - Reactive search & tag filter: Filter by title, tag, or description.
  - Archive listing: Group by year or clean grid with featured card support.
  - Skeletons and friendly human empty state.

---

### Task 3: Modernize Lightbox Modal (`app/components/dokum/LightboxModal.vue`)

**Files:**
- Modify: `app/components/dokum/LightboxModal.vue`

**Interfaces:**
- Consumes: `useDokumentasi()` (`isLightboxModalOpen`, `selectedPhotos`, `selectedPhotoIndex`, `closeLightboxModal`)
- Produces: Full-screen accessible photo gallery lightbox

- [ ] **Step 1: Clean up styles and ensure keyboard & touch accessibility**
  - Solid dark backdrop (`bg-black/90 backdrop-blur-sm`).
  - Close button with 44x44px touch target, Escape key dismiss.
  - Left/right navigation buttons with ArrowLeft/ArrowRight support.
  - High-res photo display with caption and counter.
  - Bottom thumbnail track with active indicator.
  - Scroll lock on `document.body` while open.

---

### Task 4: Rebuild Detail Article Page (`app/pages/dokumentasi/[slug].vue`)

**Files:**
- Modify: `app/pages/dokumentasi/[slug].vue`

**Interfaces:**
- Consumes: `route.params.slug`, `useDokumentasi()`
- Produces: Longform editorial article layout

- [ ] **Step 1: Convert raw CSS to clean editorial layout**
  - Back button pill (`Kembali ke Dokumentasi`) with hover lift.
  - Cinematic hero cover image (16:9) with tag chip, bold title, and date.
  - Article prose: `max-w-[760px] mx-auto text-text-main leading-relaxed text-base sm:text-lg`.
  - Photo mosaic gallery: Structured grid of event photos opening the Lightbox on click.
  - Not found empty state with friendly copy.

---

### Task 5: Verification & Review

- [ ] **Step 1: Code formatting & Impeccable detect**
  - Run `npx prettier --write` on all modified files.
  - Run `impeccable detect --json` to verify zero violations.
  - Verify clean git diff and commit changes.
