# Smart Mobile Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the clunky, cut-off top dropdown hamburger menu with an off-canvas Smart Mobile Sidebar that slides from the right edge, featuring high-craft iconography, frosted glass backdrop, body scroll locking, and smart footer actions.

**Architecture:**
1. Off-Canvas Drawer Architecture: Teleported right-hand drawer (`fixed inset-y-0 right-0 w-[300px] max-w-[85vw] h-[100dvh] bg-bg-card/95 backdrop-blur-lg border-l border-border shadow-2xl`) with backdrop overlay.
2. Smooth CSS Transitions: Slide transition (`translate-x-full` to `translate-x-0`) using Vue `<Transition>` with `ease-out`.
3. Navigation & Hierarchy:
   - Header: Sentra brand typography + clean close button.
   - Body: List of navigation links with semantic Google Material Symbols icons and clean active route state indicators.
   - Footer: Integrated theme toggle (Light / Dark) and quick action for Aspirasi (Aurora Modal).
4. Accessibility & UX Hygiene:
   - Body scroll locking when open.
   - Close on route change and Escape key.
   - ARIA attributes (`aria-label`, `aria-expanded`, `role="dialog"`).

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Nuxt Icon (Material Symbols).

**Spec:** `anti-slop/audit-003-2026-11-22.md` and user grill-me alignment (A1: Right slide-in drawer ~300px, A2: Comprehensive header, icons, and smart footer, A3: Frosted obsidian/clean glass).

## Global Constraints
- Zero em dashes (`—`).
- Desktop navbar (`md:flex`) remains completely untouched and pristine.
- Strict use of Sentra design tokens (`bg-bg-card`, `bg-bg-card-2`, `text-text-main`, `text-text-muted`, `accent`, `border-border`).
- Pure local git commit; NO REMOTE PUSH.

---

### Task 1: Re-architect Mobile Navigation in `AppNavbar.vue`
**Files:**
- Modify: `app/components/AppNavbar.vue`

**Steps:**
- [x] Replace the top dropdown `<nav>` with a right slide-in off-canvas drawer.
- [x] Implement header inside drawer: `SENTRA.` branding + close button with cross icon.
- [x] Structure menu links with icons:
  - Beranda (`material-symbols:home-outline-rounded`)
  - Struktur (`material-symbols:account-tree-outline-rounded`)
  - Program (`material-symbols:event-note-outline-rounded`)
  - Dokumentasi (`material-symbols:photo-library-outline-rounded`)
  - Sponsorship (`material-symbols:handshake-outline-rounded`)
  - Hall of Fame (`material-symbols:auto-awesome-outline-rounded`)
- [x] Add smart drawer footer:
  - Theme mode switch button with current mode label.
  - Aspirasi button (`material-symbols:chat-bubble-outline-rounded`) triggering `openAurora`.
- [x] Add body scroll locking on `isMenuOpen` toggle and cleanup on `onBeforeUnmount`.

---

### Task 2: Verification and Security Audit
**Files:**
- Run: `npm run build`
- Verify template safety and aria semantics.
- Commit changes locally with `caveman-commit` format, strictly without pushing.
