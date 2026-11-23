# OpenGraph Social Preview Asset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate the official 1200x630px OpenGraph image asset (`public/og-default.png` and `public/og-image.png`) and declare complete OpenGraph dimensions and MIME types so WhatsApp, Telegram, and Discord reliably render the rich preview card.

**Architecture:**
1. SVG Design Vector:
   - Dimensions: 1200x630 px.
   - Background: Deep obsidian gradient `#05070e` to `#090e1f` with astronomical grid and faint celestial stars.
   - Brand Typography: Crisp `SENTRA.` with accent dot, `NAWASENA SMAN 2 JONGGOL`, and badge `PORTAL RESMI OSIS & MPK`.
   - Editorial clean tagline: `Pusat Kendali Informasi, Program Kerja, Dokumentasi, dan Arsip Digital Kepengurusan`.
2. Rasterization:
   - Convert SVG vector into high-quality PNG using native `sharp` library in Node.js.
   - Save to `public/og-default.png` and duplicate as `public/og-image.png`.
3. Metadata Declaration:
   - In `app/app.vue`: add `ogImageWidth: 1200`, `ogImageHeight: 630`, `ogImageType: 'image/png'`.
   - In `nuxt.config.ts`: add `og:image`, `og:image:width`, `og:image:height`, `og:image:type`, and `twitter:image` defaults.

**Tech Stack:** Node.js, `sharp`, Nuxt 4, SVG.

**Spec:** `anti-slop/audit-007-2026-11-23.md`.

## Global Constraints
- Zero em dashes (`—`).
- File size optimized (<300KB) for rapid crawler fetching on mobile networks.
- Strictly local git commit; NO REMOTE PUSH.

---

### Task 1: Generate `public/og-default.png` & `public/og-image.png`
**Files:**
- Create: `scripts/generate-og.cjs` (scratch script)
- Output: `public/og-default.png`, `public/og-image.png`

**Steps:**
- [x] Write SVG vector layout with 1200x630 resolution.
- [x] Execute script with `node` to render PNG files using `sharp`.
- [x] Confirm file generation on disk.

---

### Task 2: Update Metadata in `app/app.vue` & `nuxt.config.ts`
**Files:**
- Modify: `app/app.vue`
- Modify: `nuxt.config.ts`

**Steps:**
- [x] In `app/app.vue`: Add explicit `ogImageWidth: 1200`, `ogImageHeight: 630`, `ogImageType: 'image/png'`.
- [x] In `nuxt.config.ts`: Add `og:image`, `og:image:width`, `og:image:height`, `og:image:type`, and `twitter:image` defaults.

---

### Task 3: Build Verification and Caveman Commit
**Files:**
- Run: `npm run build`
- Verify clean compilation with code 0.
- Commit locally with `caveman-commit` format, strictly without pushing.
