# Design Specification: Modul 3 - Dokumentasi & Detail Artikel (Rekam Jejak Nawasena)

**Date:** 2026-11-21  
**Project:** SENTRA Frontend (Nuxt 4 + Tailwind CSS v4)  
**Scope:** `app/pages/dokumentasi/index.vue`, `app/pages/dokumentasi/[slug].vue`, and `app/components/dokum/*` (`GalleryCard.vue`, `LightboxModal.vue`)  
**Design Standard:** Impeccable (Operate & Persuade modes), Antislop, Humanizer, UI-UX Pro Max, Ponytail, Karpathy Guidelines.

---

## 1. Context & Objectives
Halaman Dokumentasi dan Detail Artikel adalah etalase visual utama rekam jejak, memori, dan arsip kegiatan Kabinet Nawasena (OSIS & MPK SMAN 2 Jonggol).
Halaman ini harus mengusung pendekatan **Editorial Photojournalism**:
1. **Otoritas Editorial:** Masthead bersih, elegan, dan informatif tanpa banner berlebihan atau tag klise.
2. **Pencarian & Filtrasi Instan:** Filter tag segmented pill bar yang halus berpadu dengan kolom pencarian live (cari kegiatan atau judul artikel).
3. **Featured Story Banner:** Liputan utama teratas (lead story) dalam aspek rasio sinematik 16:9, diikuti kartu 3-kolom foto jurnalistik yang rapi.
4. **Pengalaman Membaca Artikel Panjang (Longform):** Tata letak detail artikel (`[slug].vue`) dengan tombol kembali taktis, cover sinematik, tipografi artikel yang nyaman dibaca (`max-w-[760px]`), mosaik galeri foto terstruktur, dan Lightbox modal yang aksesibel.

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

---

## 3. Anti-Slop & Craft Floor Enforcements
1. **Zero Eyebrow Kickers:** Dilarang meletakkan eyebrow pill di atas heading utama.
2. **Zero Em Dashes:** Dilarang menggunakan tanda pisah panjang (`—`) dalam salinan bahasa Indonesia. Gunakan strip biasa `-`, koma, atau tanda kurung.
3. **Zero Gradient Text Clipping:** Judul dan teks harus menggunakan warna solid kontras tinggi (`text-text-main`).
4. **Standard Container:** Gunakan container standar `max-w-[1120px] mx-auto pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8` agar tidak tampak aneh di layar PC lebar.
5. **Escape Key & Scroll Lock:** Lightbox modal wajib menutup dengan tombol Escape dan mengunci scroll latar belakang.

---

## 4. Component Architecture & Interactions

### A. Halaman Arsip Dokumentasi (`app/pages/dokumentasi/index.vue`)
- **Masthead:**
  - Judul: `Rekam Jejak <span class="text-accent">Nawasena</span>` dalam font display berbobot hitam.
  - Subtitle: `Galeri dokumentasi kegiatan dan arsip memori perjalanan kepengurusan OSIS dan MPK SMAN 2 Jonggol.`
  - Counter chip: Jumlah kegiatan dan total foto terdokumentasi.
- **Controls Toolbar:**
  - Segmented pill bar untuk kategori / tag (`Semua`, `LDKS`, `Classmeet`, dsb.) dengan status aktif `bg-accent text-white shadow-sm`.
  - Kolom pencarian live (`input type="search"`): responsif di mobile & PC, mencari judul, tag, dan deskripsi kegiatan.
- **Lead Story & Grid Layout:**
  - Jika menampilkan semua tanpa filter, kartu teratas ditampilkan sebagai *Featured Lead Story* (horizontal banner pada desktop).
  - Kartu berikutnya ditampilkan dalam grid 3-kolom (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`).
  - Skeletons yang halus dan konsisten saat loading.
  - Empty state ramah dan komunikatif ketika hasil filter/pencarian nihil.

### B. Kartu Galeri Dokumentasi (`app/components/dokum/GalleryCard.vue`)
- Kartu tautan ke `/dokumentasi/[slug]`.
- Gambar thumbnail dengan aspect ratio 16:10 atau 4:3, tag pill di sudut, dan jumlah foto badge dengan ikon kamera.
- Tanggal pelaksanaan dengan format rapi tanpa em dash.
- Judul kegiatan dalam `font-bold text-text-main line-clamp-2`.
- Cuplikan deskripsi (excerpt) maksimal 2 baris.
- Tautan "Baca artikel" dengan panah transisi hover.
- Full keyboard focus ring: `focus-visible:ring-2 focus-visible:ring-accent`.

### C. Detail Artikel Kegiatan (`app/pages/dokumentasi/[slug].vue`)
- Tombol navigasi kembali: `Kembali ke Dokumentasi` pill button dengan ikon panah.
- **Hero Banner:** Gambar cover sinematik 16:9 dengan tag badge, judul artikel besar (`text-2xl sm:text-3xl md:text-4xl font-black text-text-main`), dan tanggal pelaksanaan terformat.
- **Prose Narasi:** Tipografi artikel yang nyaman dibaca dengan `max-w-[760px] mx-auto`, line-height lapang, paragraf terstruktur, dan catatan penutup/kredit.
- **Mosaik Galeri Foto:**
  - Grid mosaik foto kegiatan dengan layout yang seimbang.
  - Tombol aksi foto interaktif dengan hover zoom halus.
  - Tombol "Lihat semua X foto" yang membuka Lightbox.

### D. Modal Lightbox Foto (`app/components/dokum/LightboxModal.vue`)
- Backdrop gelap dengan opacity solid (`bg-black/90`).
- Bilah atas: Judul foto/kegiatan, counter aktif (`X / Y`), dan tombol tutup (ESC dismiss).
- Tombol panah navigasi: Prev dan Next yang ramah keyboard (`ArrowLeft`, `ArrowRight`).
- Stage: Gambar penuh dengan rasio proporsional dan takarir (caption).
- Thumbnail strip di bawah untuk melompat langsung ke foto pilihan.
- Scroll lock pada `document.body` saat modal terbuka.
