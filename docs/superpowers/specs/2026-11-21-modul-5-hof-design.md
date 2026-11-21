# Design Specification: Modul 5 - Hall of Fame (Konstelasi Kepemimpinan Nawasena)

**Date:** 2026-11-21  
**Project:** SENTRA Frontend (Nuxt 4 + Tailwind CSS v4)  
**Scope:** `app/pages/hof.vue` and `app/components/hof/*` (`HofHero.vue`, `HofGenerationPanel.vue`, `HofDevCard.vue`, `HofModal.vue`)  
**Design Standard:** Impeccable (Persuade & Operate modes), Antislop, Humanizer, UI-UX Pro Max, Ponytail, Karpathy Guidelines.

---

## 1. Context & Objectives
Hall of Fame adalah etalase penghormatan purna bakti bagi pengurus terdahulu dan pengembang sistem SENTRA di SMAN 2 Jonggol.
Konsep desain mengusung pendekatan **Celestial Constellation Editorial**:
1. **Langit Malam Puitis (Night Sky Hero):** Starfield kosmik dengan konstelasi kepengurusan demisioner teranyar sebagai bintang paling terang.
2. **Panel Konstelasi Generasi:** Setiap angkatan kepengurusan dipetakan sebagai satu gugusan bintang interaktif yang dapat disentuh untuk mengenang pengurusnya.
3. **Penghormatan Pengembang (Di Balik Langit Ini):** Kartu pengembang sistem yang elegan dengan foto, peran dev, chips tech stack, dan kutipan filosofi teknologi yang abadi.
4. **Modal Angkatan & Profil Aksesibel:** Modal profil pengurus dan daftar anggota angkatan terdahulu dengan dukungan keyboard Escape dan scroll lock.

---

## 2. Design Tokens & Palette Lock (Strict `app/css/global.css`)
- **Backgrounds:**
  - Base: `var(--bg-primary)` (`#f3f1fe` light, `#060b14` dark)
  - Card: `var(--bg-card)` (`#ffffff` light, `#0f172a` dark)
  - Card 2: `var(--bg-card-2)` (`#f8f7ff` light, `#131f35` dark)
  - Night Sky Base: `#08071a` hingga `#131238` (tema langit malam kosmik yang telah didefinisikan di `app/css/global.css`)
- **Borders:** `var(--border)` (`rgba(99, 102, 241, 0.11)` light, `rgba(255, 255, 255, 0.07)` dark)
- **Text:**
  - Main: `var(--text-main)` (`#1c1a3e` light, `#f1f5f9` dark)
  - Muted: `var(--text-muted)` (`#6b6882` light, `#94a3b8` dark)
  - Subtle: `var(--text-subtle)` (`#a09dbf` light, `#64748b` dark)
- **Accent:** `var(--accent)` (`#6366f1`), `var(--accent-hover)` (`#4f46e5`), `var(--accent-soft)`

---

## 3. Anti-Slop & Craft Floor Enforcements
1. **Zero Eyebrow Kickers:** Hapus kicker pill berlebih di atas judul modal dan heading.
2. **Zero Em Dashes:** Dilarang menggunakan tanda pisah panjang (`—`) dalam salinan bahasa Indonesia. Gunakan strip biasa `-`, koma, atau tanda kurung.
3. **Zero Gradient Text Clipping:** Judul dan teks menggunakan warna kontras solid.
4. **Standard Container:** Gunakan container standar `max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8` agar layout PC lebar tidak tampak aneh atau melebar keluar proporsi.
5. **Escape Key & Scroll Lock:** `HofModal` wajib dapat ditutup dengan tombol Escape dan mengunci scroll `document.body` saat terbuka.

---

## 4. Component Architecture & Interactions

### A. Night Sky Hero (`HofHero.vue`)
- Latar langit kosmik dengan starfield seeded dan shooting star occasional (dengan dukungan reduced motion).
- Heading: `Hall of Fame` dengan subtitle puitis tentang bintang kepemimpinan Nawasena.
- Lineage chip: `{{ lineage }}` (misal: "X kabinet · Y pengurus").
- Map konstelasi interaktif untuk kabinet demisioner terbaru.
- Tombol CTA: "Telusuri jejak" yang scroll halus ke `#hof-lineage`.

### B. Linimasa Angkatan (`HofGenerationPanel.vue`)
- Panel per angkatan:
  - Header: Lambang angka Romawi (`Angkatan I, II, dst.`), judul kabinet, dan rentang tahun.
  - Badge `Kabinet Sebelumnya` untuk angkatan teranyar.
  - Peta konstelasi interaktif: bintang dapat diklik untuk membuka `HofModal` (profil pengurus).
  - Footer tombol organisasi (OSIS & MPK) dengan hitungan anggota dan transisi hover.

### C. Angkatan Terdahulu & Dev Team (`app/pages/hof.vue` & `HofDevCard.vue`)
- Tombol arsip angkatan terdahulu: Membuka modal daftar seluruh angkatan lawas.
- Bagian "Di Balik Langit Ini":
  - Grid kartu pengembang sistem (`HofDevCard.vue`): Foto pengembang, badge kode, peran dev, chips tech stack, dan kutipan filosofis.
  - Tombol kembali ke Beranda yang rapi.

### D. Modal Pengurus & Periode (`HofModal.vue`)
- Modal serbaguna:
  - Tipe `MEMBER_PROFILE`: Foto avatar dengan ring aksen, jabatan, nama, dan motto.
  - Tipe `PERIOD_MEMBERS`: Grid anggota pengurus angkatan terkait.
  - Tipe `OLDER_PERIODS`: Daftar kartu angkatan terdahulu.
- Aksesibilitas: Tombol tutup (44x44px), Escape key listener, scroll lock pada `document.body`.
