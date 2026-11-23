# Documentation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul `README.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and `SECURITY.md` using Humanizer, Anti-Slop, and Impeccable principles, transforming them into authentic, high-craft, Indonesian documentation grounded in the SMAN 2 Jonggol student community and linking to `osissmanduajonggol@gmail.com`.

**Architecture:**
1. Linguistic & Tonal Grounding:
   - Language: Clear, professional Indonesian.
   - Identity: Official portal of OSIS & MPK Nawasena SMAN 2 Jonggol.
   - Humanizer Voice: Neutral, direct, specific. No corporate buzzwords ("enterprise-grade", "edge compute nodes", "distributed engineering teams").
   - Anti-Slop: No formulaic emoji headers, no em dashes (`—`), no fake email placeholders (`@sentracore.invalid`).
2. Target Files:
   - `README.md`: Comprehensive project overview, true feature breakdown, real tech stack (Nuxt 4, Tailwind v4, Vite, Nitro), local setup, and scripts.
   - `CODE_OF_CONDUCT.md`: Grounded community code of conduct for student developers, teachers, and contributors with `osissmanduajonggol@gmail.com`.
   - `CONTRIBUTING.md`: Step-by-step contribution guide, coding conventions, Anti-Slop standards (zero em dash, token alignment), and pull request workflow.
   - `SECURITY.md`: Realistic school portal security disclosure policy reporting to `osissmanduajonggol@gmail.com`.

**Tech Stack:** Markdown (GitHub Flavored Markdown).

**Spec:** `anti-slop/audit-008-2026-11-23.md` and user grill-me alignment (Bahasa Indonesia, Humanizer student-first tone, official email `osissmanduajonggol@gmail.com`).

## Global Constraints
- Zero em dashes (`—`) across all markdown files.
- Sole contact email: `osissmanduajonggol@gmail.com`.
- Strictly local git commit; NO REMOTE PUSH.

---

### Task 1: Rewrite `README.md`
**Files:**
- Modify: `README.md`

**Steps:**
- [ ] Remove corporate AI slop and boilerplate placeholders.
- [ ] Write authentic project introduction for SENTRA Nawasena SMAN 2 Jonggol.
- [ ] Document features: Pusat Kendali, Struktur, Program Kerja, Dokumentasi, Hall of Fame, Command Palette, dan Aspirasi.
- [ ] Document real tech stack, prerequisites, local setup, and build scripts.

---

### Task 2: Rewrite `CODE_OF_CONDUCT.md`
**Files:**
- Modify: `CODE_OF_CONDUCT.md`

**Steps:**
- [ ] Translate and adapt code of conduct into clear, respectful Indonesian.
- [ ] Set reporting contact to `osissmanduajonggol@gmail.com`.
- [ ] Remove boilerplate templates and em dashes.

---

### Task 3: Rewrite `CONTRIBUTING.md`
**Files:**
- Modify: `CONTRIBUTING.md`

**Steps:**
- [ ] Write clear contribution steps: branching, coding standards (Nuxt 4 `<script setup lang="ts">`, Tailwind v4), conventional commits.
- [ ] Add Anti-Slop design guidelines (zero em dash, design token adherence).
- [ ] Document local verification commands (`npm run build`).

---

### Task 4: Rewrite `SECURITY.md`
**Files:**
- Modify: `SECURITY.md`

**Steps:**
- [ ] Write practical security policy in Indonesian.
- [ ] Replace fake email with `osissmanduajonggol@gmail.com`.
- [ ] Detail responsible vulnerability disclosure procedure.

---

### Task 5: Build Verification and Caveman Commit
**Files:**
- Run: `npm run build` to confirm zero breaking changes.
- Commit locally with `caveman-commit` format, strictly without pushing.
