# Spec: Modul 1 — Global Shell (Floating Pill Navbar & Mini Player) & Struktur Organisasi

## 1. Intent & Scope
- **Target Surfaces:**
  1. `app/components/AppNavbar.vue` (Global Floating Pill Navbar)
  2. `app/components/AppMiniPlayer.vue` (Global Floating Audio Controller)
  3. `app/pages/struktur.vue` (Halaman Struktur Organisasi)
  4. `app/components/struktur/PengurusCard.vue`
  5. `app/components/struktur/PengurusModal.vue`
  6. `app/components/struktur/SekbidCard.vue`
  7. `app/components/struktur/SekbidModal.vue`
- **Design Philosophy:** Editorial Modern & High-Craft (`impeccable`), Bebas AI Slop (`antislop`), Bahasa Manusiawi (`humanizer`), dan Solusi Ringkas & Tepat Guna (`ponytail` + `karpathy-guidelines`).
- **Palet Warna:** 100% konsisten dengan `app/css/global.css` (tidak mengubah hex maupun CSS variables yang ada).

---

## 2. Global Shell: Floating Pill Navbar & Mini Player
- **Floating Pill Navbar (`AppNavbar.vue`):**
  - Mengubah navbar dari full-width top bar kaku menjadi *floating pill* mengambang di bagian atas tengah:
    - Desktop: `fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[960px] h-[54px] rounded-full bg-bg-card/85 backdrop-blur-md border border-border shadow-md z-[1000]`
    - Logo: Teks `SENTRA.` tebal dengan titik aksen indigo.
    - Nav links: Teks proporsional (`text-xs font-semibold`), active state pill dengan background `bg-accent-soft text-accent`.
    - Tombol ganti tema (Dark/Light mode) & tombol pemicu modal Aspirasi (AURORA).
    - Mobile: Menu drawer sheet yang rapi, tombol hamburger dengan `aria-label` dan transisi mulus.
- **Floating Mini Player (`AppMiniPlayer.vue`):**
  - Desain pill mengambang di pojok kanan bawah yang kompak (`bottom-5 right-5`).
  - Mode terlipat (hanya tombol bulat 44x44px dengan equalizer) dan mode terbuka (menampilkan judul lagu, tombol play/pause, next track, dan toggle daftar putar tanpa merusak tata letak).

---

## 3. Halaman Struktur Organisasi (`/struktur`)
- **Editorial Masthead:**
  - Menghilangkan *eyebrow pill* klise ("Struktur Organisasi").
  - Judul tegas: `Kabinet Nawasena 2025/2026`.
  - Subtitle deskriptif yang manusiawi (tanpa jargon "mercusuar revolusioner").
  - Ringkasan statistik kepengurusan (Pengurus Inti, Sekbid/Komisi, Total Anggota) dengan card pill ringkas.
- **Tab Organisasi (OSIS vs MPK):**
  - Segmented pill switch yang jelas dan responsif.
  - Dukungan empty state jika MPK/data belum terisi dengan pesan yang jelas.
- **Pengurus Inti Section:**
  - Hierarki tegas: Ketua & Wakil Ketua mendapatkan kartu *Featured* dengan foto beresolusi tajam, motto kepengurusan yang elegan, dan detail jabatan.
  - Kartu Pengurus lainnya menggunakan rasio kartu yang proporsional, foto berbingkai rapi, dan efek hover lift yang halus.
- **Seksi Bidang (Sekbid) / Komisi Section:**
  - Grid 10 Sekbid / 5 Komisi dengan tata letak adaptif (2 kolom di mobile, 3 di tablet, 4-5 di desktop).
  - Badge nomor sekbid/komisi, nama seksi bidang, jumlah anggota, dan program kerja yang dinaungi.
- **Modal Profil Pengurus (`PengurusModal.vue`):**
  - Bebas dari gradient ungu artifisial.
  - Biodata lengkap yang mudah dibaca, visi & misi, serta daftar program kerja terkait.
  - Aksesibilitas: Mendukung penutupan dengan tombol `Escape`, fokus keyboard yang terlihat, dan dialog yang ramah pembaca layar.
- **Modal Sekbid (`SekbidModal.vue`):**
  - Header sekbid dengan warna aksen tematik dari `useSekbidMeta`.
  - Daftar anggota lengkap dengan penanda Koordinator Sekbid.
  - Daftar program kerja sekbid dengan status badge yang jelas.
  - Aksesibilitas penuh dan integrasi klik profil anggota.

---

## 4. Antislop & Karpathy Constraints
- Tanpa em dash (`—`).
- Tanpa gradient text clip (`bg-clip-text text-transparent`).
- Tanpa border kiri/kanan berwarna tebal (>1px).
- Tanpa animasi perulangan tak terbatas yang mengganggu (kecuali equalizer radio aktif).
- Kode bersih, minim abstraksi liar, berbasis komponen Nuxt/Vue native (`ponytail`).
