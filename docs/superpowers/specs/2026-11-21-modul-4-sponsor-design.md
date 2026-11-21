# Design Specification: Modul 4 - Sponsorship & Kemitraan Strategis

**Date:** 2026-11-21  
**Project:** SENTRA Frontend (Nuxt 4 + Tailwind CSS v4)  
**Scope:** `app/pages/sponsor.vue` and `app/components/sponsor/*` (`StatCard.vue`, `TierCard.vue`, `SponsorForm.vue`, `SectionHeading.vue`)  
**Design Standard:** Impeccable (Persuade mode), Antislop, Humanizer, UI-UX Pro Max, Ponytail, Karpathy Guidelines.

---

## 1. Context & Objectives
Halaman Sponsorship adalah proposal kemitraan publik untuk calon mitra usaha, instansi pendidikan, dan sponsor kegiatan Kabinet Nawasena (OSIS & MPK SMAN 2 Jonggol).
Halaman ini harus:
1. **Otoritas Kemitraan:** Menampilkan profil jangkauan siswa secara kredibel dan transparan melalui kartu metrik dampak.
2. **Paket Kemitraan Modular:** 4 tingkat paket (Platinum, Gold, Silver, Bronze) yang disajikan secara terstruktur dengan keuntungan yang jelas.
3. **Alur Form Terintegrasi:** Menghubungkan tombol "Pilih Paket" pada kartu tier langsung ke formulir kemitraan terpadu dengan pra-seleksi tier dan pengiriman WhatsApp resmi.

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
- **Badge Tokens:**
  - Sukses: `bg-[var(--badge-done-bg)] text-[var(--badge-done-text)]`
  - Berjalan: `bg-[var(--badge-ongoing-bg)] text-[var(--badge-ongoing-text)]`

---

## 3. Anti-Slop & Craft Floor Enforcements
1. **Zero Eyebrow Kickers:** Hapus label klise atau floating chip di atas judul utama.
2. **Zero Em Dashes:** Dilarang menggunakan tanda pisah panjang (`—`) dalam salinan bahasa Indonesia. Gunakan strip biasa `-`, koma, atau tanda kurung.
3. **Zero Gradient Text Clipping:** Judul dan teks menggunakan warna solid kontras tinggi (`text-text-main` dan `text-accent`).
4. **Standard Container:** Gunakan container standar `max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8` agar tidak tampak aneh di PC besar.
5. **Aksesibilitas Form:** Validasi input dengan pesan error yang jelas, `aria-invalid`, `aria-describedby`, dan touch target input/button minimal 44px.

---

## 4. Component Architecture & Interactions

### A. Masthead & Hero (`app/pages/sponsor.vue`)
- Container: `max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8`.
- Heading: `h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-main leading-tight"` -> `Kemitraan Strategis <span class="text-accent">Nawasena</span> <span class="text-text-muted font-normal text-2xl sm:text-3xl">2025/2026</span>`.
- Subtitle: `Peluang kerjasama dan kolaborasi positif bersama OSIS dan MPK SMAN 2 Jonggol untuk mendukung pengembangan potensi generasi muda.`
- Action buttons:
  - "Ajukan Kerjasama": scroll halus ke `#sponsor-form`.
  - "Lihat Paket Sponsorship": scroll halus ke `#sponsor-tiers`.

### B. Metrik Dampak (`StatCard.vue`)
- Grid 4-kolom responsif:
  - 800+ Siswa Aktif di Sekolah
  - 10 Seksi Bidang Kreatif
  - 20+ Agenda & Program Tahunan
  - 100% Dukungan Sekolah Resmi
- Angka counter animasi halus dengan fallback bagi mode `prefers-reduced-motion`.

### C. Kartu Paket Sponsorship (`TierCard.vue`)
- 4 Paket: Platinum (Featured), Gold, Silver, Bronze.
- Anatomi Kartu:
  - Badge tingkatan (Tier Name) dengan aksen warna yang rapi.
  - Nominal kontribusi (/ paket) dalam font tabular-nums tebal.
  - Deskripsi nilai manfaat.
  - Daftar perolehan benefit dengan ikon centang `material-symbols:check-circle-rounded` dalam `text-accent`.
  - Tombol "Pilih Paket" dengan event emit `@select="onSelectTier(tier.id)"` yang mengarahkan langsung ke form dan memilih tier secara otomatis.

### D. Tipe Kemitraan & Mitra Berjalan (`SectionHeading.vue` + Marquee)
- 3 Kartu Tipe Kemitraan: Sponsor Dana (Financial), Mitra Produk/Barter (In-Kind), Media Partner.
- Mitra Berjalan: Teks berjalan (marquee) dengan pause on hover dan fallback flex wrap saat reduced motion.

### E. Formulir Pengajuan Kemitraan (`SponsorForm.vue`)
- Container: `bg-bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm`.
- Field Input:
  - Nama / Lembaga (text)
  - Kontak WhatsApp / Email (text)
  - Pilihan Paket Tier (Select / segmented buttons)
  - Rencana Kerjasama / Pesan (textarea)
- Validasi instan dengan summary error yang aksesibel.
- Submit action: Menghasilkan pesan WhatsApp yang terformat rapi dan mengarahkan ke nomor kontak resmi OSIS SMAN 2 Jonggol.
