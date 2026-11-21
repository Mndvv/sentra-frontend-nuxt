# Design Specification: Modul 2 - Program Kerja (Inisiatif Nawasena)

**Date:** 2026-11-21  
**Project:** SENTRA Frontend (Nuxt 4 + Tailwind CSS v4)  
**Scope:** `app/pages/program.vue` and `app/components/program/*` (`ProkerStats.vue`, `ProkerFilterTabs.vue`, `ProkerCard.vue`)  
**Design Standard:** Impeccable (Operate & Persuade modes), Antislop, Humanizer, UI-UX Pro Max, Ponytail, Karpathy Guidelines.

---

## 1. Context & Objectives
Halaman Program Kerja adalah direktori inisiatif dan laporan progres kerja Kabinet Nawasena (OSIS & MPK SMAN 2 Jonggol).
Halaman ini harus memadukan:
1. **Otoritas Editorial:** Masthead bersih tanpa banner klise atau eyebrow badges bertumpuk.
2. **Mission Control Dashboard:** Ringkasan metrik status program yang fungsional, taktis, dan responsif di PC maupun smartphone.
3. **Pencarian & Filtrasi Cepat:** Filter status bersanding dengan live text search.
4. **Hierarki Kartu yang Rapi:** Kartu program yang informatif tanpa animasi berlebihan atau pergeseran tata letak (layout shift).

---

## 2. Design Tokens & Palette Lock (Strict `app/css/global.css`)
- **Backgrounds:**
  - Base: `var(--bg-primary)` (`#f3f1fe` light, `#060b14` dark)
  - Card: `var(--bg-card)` (`#ffffff` light, `#0f172a` dark)
  - Card 2: `var(--bg-card-2)` (`#f8f7ff` light, `#131f35` dark)
- **Borders:** `var(--border)` (`rgba(99, 102, 241, 0.11)` light, `rgba(255, 255, 255, 0.07)` dark)
- **Text:**
  - Main: `var(--text-main)` (`#1c1a3e` light, `#f1f5f9` dark)
  - Muted: `var(--text-muted)` (`#6b6882` light, `#94a3b8` dark)
  - Subtle: `var(--text-subtle)` (`#a09dbf` light, `#64748b` dark)
- **Accent:** `var(--accent)` (`#6366f1`), `var(--accent-hover)` (`#4f46e5`), `var(--accent-soft)`
- **Status Badges (Standardized Tokens):**
  - Berjalan: `bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]`
  - Selesai: `bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]`
  - Direncanakan: `bg-[var(--badge-plan-bg)] text-[var(--badge-plan-text)]`
  - Dibatalkan: `bg-rose-500/10 text-rose-500 border border-rose-500/20`

---

## 3. Anti-Slop & Craft Floor Enforcements
1. **Zero Eyebrow Kickers:** Hapus tag pill bertuliskan `PROGRAM KERJA` di atas heading utama.
2. **Zero Em Dashes:** Dilarang menggunakan tanda pisah panjang (`—`) dalam salinan bahasa Indonesia. Gunakan strip biasa `-`, koma, atau tanda kurung.
3. **Zero Gradient Text Clipping:** Judul dan teks harus menggunakan warna kontras solid (`text-text-main` atau `text-accent`).
4. **Zero Layout Shifts on Drawers:** Pembukaan agenda terkait atau link dokumentasi pada kartu program harus menggunakan transisi tinggi yang halus tanpa melompatkan posisi kartu tetangga.
5. **Human Copy:** Gunakan diksi siswa SMA Indonesia yang hangat, lugas, dan terpercaya.

---

## 4. Component Architecture & Interactions

### A. Masthead & Layout (`app/pages/program.vue`)
- Container: `max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8` (konsisten dengan Navbar & Footer).
- Heading: `h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-main m-0"` -> `Inisiatif <span class="text-accent">Nawasena</span> <span class="text-text-muted font-normal text-2xl sm:text-3xl">2025/2026</span>`.
- Subtitle: `Target capaian dan status pelaksanaan program kerja OSIS dan MPK SMAN 2 Jonggol.`
- Toolbar: Penataan responsif antara `ProkerFilterTabs` dan input pencarian live.

### B. Mission Control Dashboard (`ProkerStats.vue`)
- Menggantikan diagram donat SVG yang kaku dengan Mission Control strip modern:
  - **Left Section (Progres Keseluruhan):**
    - Gauge persentase program selesai (`% selesai`).
    - Bar progres visual dengan warna aksen bertingkat.
    - Metrik pembagian BPH vs Sekbid.
  - **Right Section (Interactive Metric Chips):**
    - 4 kartu status interaktif (`Semua`, `Berjalan`, `Selesai`, `Direncanakan`).
    - Klik pada kartu langsung memicu filter aktif.
    - Indikator aktif yang tegas dengan keyboard focus indicator.

### C. Controls & Filter Bar (`ProkerFilterTabs.vue` + Search Input)
- **Segmented Pill Tabs:**
  - Tombol pill horizontal yang rapi: `Semua`, `Berjalan`, `Selesai`, `Direncanakan`, `Dibatalkan`.
  - Status aktif: `bg-accent text-white shadow-sm`.
- **Live Search Input:**
  - Input teks terintegrasi: `w-full sm:w-64 relative`.
  - Icon pencarian di kiri, tombol clear (X) ketika ada teks.
  - Mencari di: nama program, deskripsi, nama sekbid, dan nomor sekbid.

### D. Card Anatomy (`ProkerCard.vue`)
- Container: `bg-bg-card border border-border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-accent/40 transition-all hover:-translate-y-0.5`.
- Header:
  - Kiri: Badge Scope (`BPH` / `Sekbid X`) + Status pill (`Berjalan`, `Selesai`, dsb.).
  - Kanan: Indikator jumlah tautan artikel/agenda jika ada.
- Body:
  - Judul: `text-base font-bold text-text-main line-clamp-2`.
  - Deskripsi: `text-xs sm:text-sm text-text-muted line-clamp-3 leading-relaxed mt-1`.
  - Target: Chip batas waktu / jadwal dengan ikon kalender.
- Footer Links Drawer:
  - Tautan Dokumentasi: Pill rapi menuju `/dokumentasi/[slug]` dengan ikon artikel.
  - Agenda Terkait: Tombol akordion interaktif yang membuka detail tanggal dan keterangan agenda dengan transisi mulus.
