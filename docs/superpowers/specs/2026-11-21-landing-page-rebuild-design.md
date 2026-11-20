# Spec: Total Rebuild Landing Page SENTRA (OSIS Nawasena)

## 1. Intent & Context
- **Product:** SENTRA (Sistem Elektronik Terpadu Nawasena), portal resmi OSIS & MPK (OSPK) SMAN 2 Jonggol periode 2025/2026.
- **Target Audience:** Siswa-siswi, guru, pengurus organisasi, dan wali murid yang mencari informasi program kerja, agenda sekolah, radio streaming, dan dokumentasi kegiatan.
- **Goal:** Merombak total (*total rebuild*) landing page (`app/pages/index.vue` dan komponen pendukungnya) menjadi tampilan kelas dunia (*award-winning craft*), terarah, cepat, dan responsif dengan menerapkan prinsip **Impeccable** dan **UI/UX Pro Max**.
- **Hard Constraint:** **Palet warna tidak diubah sama sekali.** Tetap menggunakan token warna yang telah didefinisikan di `app/css/global.css`:
  - Light Ground: `--bg-primary: #f3f1fe`, `--bg-card: #ffffff`, `--bg-card-2: #f8f7ff`
  - Dark Ground: `--bg-primary: #060b14`, `--bg-card: #0f172a`, `--bg-card-2: #131f35`
  - Text: `--text-main`, `--text-muted`, `--text-subtle`
  - Accent: `--accent: #6366f1`, `--accent-hover: #4f46e5`, `--accent-soft`, `--accent-glow`
  - Border: `--border: rgba(99, 102, 241, 0.11)` (light) / `rgba(255, 255, 255, 0.07)` (dark)
  - Badges: ongoing (`#fbbf24`), done (`#4ade80`), plan (`#94a3b8`)

---

## 2. Impeccable & UI/UX Standards Checklist
- [x] **No kickers/eyebrows above headings:** Headings berdiri sendiri dengan bobot tipografi, ukuran, dan hierarki yang jelas.
- [x] **No thick colored borders (>1px):** Menghilangkan `border-left: 4px` pada kartu. Kedalaman diperoleh dari hairline border `border-border` dan tinted elevation shadow.
- [x] **No gradient text:** Penekanan headline dilakukan melalui bobot font (900/800) dan tracking ketat (-0.035em).
- [x] **Touch & Ergonomics:** Tombol dan elemen interaktif minimal 44x44px dengan `focus-visible:ring-2 focus-visible:ring-accent`.
- [x] **Bento Architecture:** Menggantikan tumpukan kartu seragam dengan grid asimetris yang memadukan Filosofi, Live Radio, dan Agenda.
- [x] **Layout Hygiene:** Menghapus `<BerandaFooter />` duplikat di `index.vue` karena `default.vue` sudah menyertakan `AppFooter.vue`.

---

## 3. Structural Sections

### Section 1: Editorial Hero Masthead (`HeroSection.vue`)
- **Headline:** `Membangun Masa Depan, Menyatukan Gerak Bersama.`
- **Tagline:** Penjelasan visi Nawasena sebagai mercusuar digital OSPK SMAN 2 Jonggol.
- **Action Group:**
  - Tombol primer: `Jelajahi Portal` (smooth scroll ke konten).
  - Tombol sekunder: `Putar Radio` (terhubung ke `useMusicPlayer`, menampilkan state playing + equalizer).
- **Live Status Ticker:** Baris ringkas yang menampilkan status siaran radio & agenda terdekat secara live.

### Section 2: Integrated Bento Hub (`BentoHubSection.vue`)
Grid asimetris 12-kolom:
- **Card 1 (Filosofi Nawasena - 7 cols / full on mobile):** Penjelasan makna Sanskerta "Nawa" (Baru), "Sena" (Kekuatan/Pasukan), dan "Nawasena" (Pasukan Pembawa Perubahan Menuju Masa Depan Cerah) dengan chip pill elegan dan motif kompas.
- **Card 2 (Live Radio Nawasena - 5 cols / full on mobile):** Pemutar radio dengan controller interaktif, visualisasi audio equalizer, judul lagu berjalan, dan playlist ringkas.
- **Card 3 (Agenda Mendatang - full width / 12 cols):** Timeline horizontal atau 3-card grid agenda kegiatan terdekat dengan format tanggal presisi dan skeleton loader.

### Section 3: Program Kerja Showcase (`ProkerSection.vue`)
- Header dengan action link `Lihat Semua Program ->`.
- Filter interaktif berbasis status (`Semua`, `Berjalan`, `Direncanakan`, `Selesai`).
- Grid card program kerja dengan indikator status dot, nama program, sekbid, dan deskripsi singkat.

### Section 4: Dokumentasi & Rekam Jejak (`DokumSection.vue`)
- Editorial layout: 1 kartu *Lead Highlight* besar (landscape) bersanding dengan kartu dokumentasi terbaru pendamping.
- Tag kegiatan, tanggal pelaksanaan, thumbnail responsif melalui `AppImg`, dan link detail artikel.

### Section 5: Kotak Saran Aspirasi (AURORA) (`KotakSaranCta.vue`)
- Card dengan background soft glow indigo, ikon surat terpadu, ajakan bersuara secara anonim, dan trigger modal aspirasi (`isAuroraOpen = true`).

---

## 4. Verification & Constraints
- Nuxt SSR & client hydration aman tanpa error hydration mismatch.
- Support Dark Mode dan Light Mode seamless.
- Accessibility WCAG AA compliance (kontras, alt image, tab navigation).
