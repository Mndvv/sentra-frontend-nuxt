# SENTRA Nawasena

Portal web resmi OSIS dan MPK Nawasena SMAN 2 Jonggol periode 2026/2027.

SENTRA adalah platform digital karya siswa yang merawat arsip digital, mempublikasikan program kerja, menyiarkan agenda kegiatan, menyediakan radio streaming sekolah, serta menampung aspirasi siswa secara transparan.

## Fitur Utama

- **Pusat Kendali (Bento Hub):** Tampilan ringkas agenda terdekat, siaran Radio SMAN 2 Jonggol, dan carosel horizontal kegiatan sekolah.
- **Struktur Organisasi:** Direktori pengurus OSIS dan MPK lengkap dengan profil tugas dan kontak divisi.
- **Inisiatif Program Kerja (Mission Control):** Pelacak kemajuan program kerja tiap seksi bidang secara terbuka dan terstruktur.
- **Dokumentasi Kegiatan:** Galeri dokumentasi foto dan arsip kegiatan sekolah yang tersaring berdasarkan kategori.
- **Hall of Fame:** Visualisasi interaktif Peta Konstelasi Leo yang menampilkan jejak pengurus kabinet sebelumnya, dengan bintang Regulus sebagai poros kepengurusan terdahulu.
- **Command Palette (`Cmd+K` / `Ctrl+K`):** Akses cepat navigasi halaman, pencarian pengurus, dan pencarian agenda langsung dari papan ketik.
- **Kotak Saran Aspirasi:** Saluran pengiriman masukan, kritik, dan gagasan bagi seluruh warga sekolah secara aman dan transparan.

## Teknologi

Aplikasi ini dibangun menggunakan teknologi web modern:

- **Nuxt 4:** Kerangka kerja Vue full-stack untuk perutean dan rendering halaman.
- **Vue 3:** Komponen antarmuka berbasis Composition API (`<script setup lang="ts">`).
- **Tailwind CSS v4 & Nuxt UI:** Penataan gaya berbasis utility dengan palet warna terstandarisasi.
- **Nuxt Icon:** Ikonografi antarmuka menggunakan kumpulan ikon Material Symbols.
- **Nitro:** Engine server untuk rendering dan optimasi aset produksi.

## Persiapan dan Menjalankan Aplikasi

Pastikan lingkungan kerja lokal Anda memenuhi kebutuhan berikut:

- **Node.js:** Versi 18.x atau lebih baru.
- **Manajer Paket:** `npm` (disarankan), `pnpm`, atau `bun`.

### 1. Salin Repositori

```bash
git clone https://github.com/osis-sman2jonggol/sentra-frontend-nuxt.git
cd sentra-frontend-nuxt
```

### 2. Pasang Dependensi

```bash
npm install
```

### 3. Konfigurasi Lingkungan

Salin berkas contoh konfigurasi lingkungan dan sesuaikan variabel yang dibutuhkan:

```bash
cp .env.example .env
```

### 4. Jalankan Server Pengembangan

```bash
npm run dev
```

Aplikasi dapat diakses melalui peramban di `http://localhost:3000`. Fitur Hot Module Replacement (HMR) aktif secara otomatis untuk mempermudah pengembangan.

## Perintah Proyek

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan lokal di port 3000 |
| `npm run build` | Melakukan kompilasi aplikasi untuk lingkungan produksi |
| `npm run preview` | Menjalankan pratinjau lokal dari hasil kompilasi produksi |
| `npm run generate` | Melakukan pre-rendering halaman secara statis |

## Panduan Berkontribusi

Kami mengundang siswa SMAN 2 Jonggol dan kontributor komunitas untuk bersama-sama mengembangkan SENTRA. Silakan membaca [CONTRIBUTING.md](./CONTRIBUTING.md) untuk alur kerja cabang, konvensi kode, dan pengujian. Seluruh interaksi wajib mematuhi [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Lisensi dan Pengelola

Proyek ini dirilis di bawah lisensi MIT. Silakan melihat berkas [LICENSE](./LICENSE) untuk ketentuan lengkap.

Dikelola secara aktif oleh Tim Pengembang OSIS & MPK SMAN 2 Jonggol. Pertanyaan, kerja sama, atau kendala dapat disampaikan melalui email resmi: [osissmanduajonggol@gmail.com](mailto:osissmanduajonggol@gmail.com).
