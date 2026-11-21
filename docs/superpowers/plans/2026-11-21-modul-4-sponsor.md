# Modul 4: Sponsorship & Kemitraan Strategis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Sponsorship page (`/sponsor`) and its components (`StatCard.vue`, `TierCard.vue`, `SponsorForm.vue`, `SectionHeading.vue`) into an authoritative, professional partnership proposition with clear impact metrics, tiered packages, and a frictionless form-to-WhatsApp workflow.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Iconify Material Symbols.

**Spec:** `docs/superpowers/specs/2026-11-21-modul-4-sponsor-design.md`

## Global Constraints
- **Palette Lock:** Use only colors from `app/css/global.css`: `--bg-primary`, `--bg-card`, `--bg-card-2`, `--text-main`, `--text-muted`, `--text-subtle`, `--accent` (#6366f1), `--accent-hover` (#4f46e5), `--border`.
- **Antislop Rules:** No em dashes (`—`), no gradient text clip, no arbitrary border-left > 1px, no fake AI buzzwords.
- **Accessibility:** Minimum 44x44px touch targets, full keyboard navigation with visible focus indicators (`focus-visible:ring-2 focus-visible:ring-accent`), and accessible form validation errors.
- **Ponytail & Karpathy:** Surgical edits, native Vue 3 reactivity and Tailwind utilities.

---

### Task 1: Rebuild Section Heading & Stat Cards (`SectionHeading.vue` & `StatCard.vue`)

**Files:**
- Modify: `app/components/sponsor/SectionHeading.vue`
- Modify: `app/components/sponsor/StatCard.vue`

**Interfaces:**
- `SectionHeading.vue`: `title: string`, `subtitle?: string`, `id?: string`
- `StatCard.vue`: `icon: string`, `target: number`, `suffix?: string`, `label: string`

- [ ] **Step 1: Modernize SectionHeading and StatCard**
  - SectionHeading: Clean typography with `text-2xl sm:text-3xl font-extrabold text-text-main` and muted subtitle.
  - StatCard: Card with themed icon, animated counter with `prefers-reduced-motion` check, tabular-nums formatting, and hover lift.

---

### Task 2: Rebuild Tier Cards with Pre-selection (`TierCard.vue`)

**Files:**
- Modify: `app/components/sponsor/TierCard.vue`

**Interfaces:**
- Consumes: `icon: string`, `label: string`, `title: string`, `desc: string`, `price: string`, `perks: string[]`, `featured?: boolean`, `tierId?: string`
- Emits: `select: [tierId: string]`

- [ ] **Step 1: Modernize TierCard design and wire selection emit**
  - Card: `relative flex flex-col bg-bg-card rounded-2xl border p-6 sm:p-7 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-md`.
  - Featured card: Highlighted border `border-accent/40`, subtle glow, and "Pilihan Utama" pill badge.
  - Price: Bold tabular-nums text.
  - Perks: Benefit list with `material-symbols:check-circle-rounded` in accent color.
  - CTA Button: "Pilih Paket" button emitting `@select` and linking to `#sponsor-form`.

---

### Task 3: Modernize Partnership Form (`SponsorForm.vue`)

**Files:**
- Modify: `app/components/sponsor/SponsorForm.vue`

**Interfaces:**
- Consumes: `selectedTier?: string` (model or prop)
- Produces: Polished form with instant WhatsApp message generation

- [ ] **Step 1: Enhance form fields, accessibility, and tier synchronization**
  - Form inputs: 44px touch height, clear focus rings, dark theme contrast.
  - Tier selector: Dropdown or segmented buttons synchronized with `selectedTier`.
  - Accessible error banner with focus management.
  - Success feedback and clean WhatsApp link formation.

---

### Task 4: Rebuild Main Sponsorship Page Layout (`app/pages/sponsor.vue`)

**Files:**
- Modify: `app/pages/sponsor.vue`

**Interfaces:**
- Produces: Complete `/sponsor` layout conforming to the 1120px standard container

- [ ] **Step 1: Update hero masthead, partner types, and marquee**
  - Container: `max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8`.
  - Masthead: `Kemitraan Strategis <span class="text-accent">Nawasena</span> 2025/2026`.
  - Stats section with 4 StatCards.
  - Tiers grid passing selection handler down to `SponsorForm`.
  - Partner types grid (Dana, In-Kind, Media Partner).
  - Partners marquee with smooth infinite scroll and reduced motion support.
  - Contact CTA strip with email, WA, and Instagram links.

---

### Task 5: Verification & Review

- [ ] **Step 1: Code formatting & Impeccable detect**
  - Run `npx prettier --write` on all modified files.
  - Run `impeccable detect --json` to verify zero violations.
  - Verify clean git diff and commit changes.
