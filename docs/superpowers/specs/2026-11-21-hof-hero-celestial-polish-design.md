# Design Specification: Hall of Fame Hero & Constellation Polish
**Date:** 2026-11-21  
**Project:** SENTRA Frontend (Nuxt 4 + Tailwind CSS v4)  
**Scope:** `app/components/hof/HofHero.vue`, `app/components/hof/HofLeoConstellation.vue`, `app/components/hof/HofStarfield.vue`  
**Aesthetic Direction:** Editorial Celestial Cartography (Planetarium Otentik)  
**Standard Enforcements:** Impeccable (Experience/Persuade mode), Anti-Slop Core Filter, UI-UX Pro Max, Ponytail, Karpathy Guidelines.

---

## 1. Intent & Context
Hall of Fame SMAN 2 Jonggol adalah ruang penghormatan abadi bagi kabinet OSIS & MPK terdahulu ("Nawasena").
Hero section saat ini terbebani oleh ornamen AI klise: gradasi ungu kebiruan generik, capsule pill berkedip-kedip, ikon sparkle, floating badge yang saling bertumpuk di layar HP, serta distorsi geometris rasi bintang Leo pada rasio layar berbeda.

Tujuan perubahan:
Transformasi hero section dan konstelasi Leo menjadi **Peta Bintang Planetarium Otentik (Celestial Cartography)** yang elegan, presisi, berkarakter kuat, dan bebas dari AI slop.

---

## 2. Pilihan Pendekatan (Approaches) & Keputusan Pengguna
1. **Pendekatan 1: Minimal Refactor (Hanya ganti warna & kurangi glow)**  
   *Trade-off:* Cepat, namun masalah fundamental distorsi rasi bintang di mobile dan badge yang bertumpuk tetap tidak terselesaikan. *(Ditolak)*
2. **Pendekatan 2: Editorial Celestial Cartography + Interactive Inspection HUD** *(Dipilih oleh Pengguna)*  
   - Langit obsidian kosmik pekat (`#05070e` ke `#090d1a`), garis koordinat deklinas/RA halus (astronomical grid lines).
   - Rasio geometris rasi Leo terkunci akurat (SVG aspect ratio preserved, `viewBox="0 0 1000 600"` dengan `xMidYMid meet`).
   - Node bintang murni sebagai titik cahaya celestial berbasis magnitudo nyata (Regulus = Alpha Leonis paling terang).
   - Menghapus badge melayang yang berantakan; digantikan dengan **Celestial HUD / Inspection Card** yang responsif dan elegan saat bintang disentuh/dipilih.
   - Responsif sempurna di mobile tanpa distorsi dan tanpa teks terpotong.
3. **Pendekatan 3: Full Canvas 3D WebGL / Three.js Universe**  
   *Trade-off:* Beban library besar (Three.js), performa berat di HP low-end, melanggar prinsip Ponytail (YAGNI & platform-native first). *(Ditolak)*

---

## 3. Design Tokens & Palette (Strict)
- **Night Sky Canvas:** `#05070e` (Deep Obsidian Void) menuju `#090e1f` (Celestial Horizon)
- **Celestial Gridlines / Coordinates:** `rgba(148, 163, 184, 0.08)` hingga `rgba(165, 180, 252, 0.12)`
- **Constellation Connectors (Stick Figure Leo):**
  - Faint line: `rgba(199, 210, 254, 0.35)`
  - Active/Hover line: `rgba(255, 255, 255, 0.85)`
- **Star Luminance:**
  - Regulus (Alpha Leonis): Core `#fffbeb`, Corona `#f59e0b` (subtle amber-gold, bukan neon glow), Magnitudo 1.35
  - Major Stars (Denebola, Algieba, Zosma): Core `#ffffff`, Corona `rgba(224, 231, 255, 0.6)`
  - Guide Stars: Point `rgba(255, 255, 255, 0.4)`
- **Text & Inspection HUD:**
  - Header: Solid high-contrast white `#f8fafc`, subtitle `#94a3b8`
  - HUD Card: Solid dark surface `#0a0f1d` dengan border `rgba(255, 255, 255, 0.12)` (tanpa glassmorphism berlebihan)

---

## 4. Architectural Changes

### A. `HofHero.vue`
- Bersihkan gradasi ungu AI. Gunakan canvas celestial obsidian dengan subtle astronomical declination grid.
- Tipografi: Judul "Hall of Fame" dengan micro-label astronomis "ARSIP KEHORMATAN KEPEMIMPINAN NAWASENA", subtitle puitis berwibawa tanpa em-dash (R-02).
- Lineage metric: Desain data bar yang bersih dan presisi tanpa capsule pill berkedip.
- CTA: Tombol anchor yang tegas dan elegan ("Telusuri Angkatan").

### B. `HofLeoConstellation.vue`
- Koordinat SVG: Transformasi sistem koordinat ke `viewBox="0 0 1000 600"` dengan `preserveAspectRatio="xMidYMid meet"`, menjaga bentuk singa (Leo) tetap astronomis di semua rasio layar (desktop lebar, tablet, maupun layar smartphone 360px).
- Bintang:
  - Bersihkan `animate-ping`, `animate-pulse`, `★` unicode, dan sparkle icon.
  - Node bintang berupa tombol interaktif dengan ring astronomis dan pendaran optik murni SVG.
  - Tambahkan label nama rasi kecil & romawi yang terintegrasi rapi.
- Inspection HUD:
  - Saat bintang dipilih (default terpilih adalah Regulus / angkatan terbaru), tampilkan panel inspeksi celestial di area bawah konstelasi yang menyajikan:
    - Nama Bintang & Posisi (misal: "Regulus · Alpha Leonis")
    - Angkatan & Nama Kabinet (misal: "Angkatan 4 · Nawasena Mahardika")
    - Periode Masa Bakti (misal: "2024 / 2025")
    - Tombol aksi menuju detail kepengurusan.

### C. `HofStarfield.vue`
- Kurangi intensitas kedipan dan singkirkan loop shooting star yang terasa generik jika tidak diperlukan, atau buat transisi shooting star lebih natural, tenang, dan menghormati `prefers-reduced-motion`.

---

## 5. Anti-Slop & Craft Floor Checklist
- [x] R-01: Tidak ada gradasi ungu-ke-pink AI default.
- [x] R-02: Zero em-dash (`—`) dalam seluruh salinan teks.
- [x] R-03: Responsif sempurna tanpa overflow horizontal dan tanpa distorsi SVG di 360px mobile.
- [x] R-04: Nol generic sparkle icon / magic wand.
- [x] R-08: Tidak ada arrow icon dekoratif yang mubazir.
- [x] R-09: Tidak ada pill berkedip tanpa fungsi.
- [x] R-10: Bebas glassmorphism berlebihan.
- [x] R-13: Bebas glow radioaktif berlebih.
- [x] R-25: Kontras teks memenuhi standar WCAG AA (min 4.5:1).
- [x] R-32: Navigasi keyboard penuh (`Tab`, `Enter`, `Space`) pada semua node bintang dengan indikator fokus tajam.
