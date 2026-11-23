# Panduan Kontribusi SENTRA

Terima kasih telah meluangkan waktu untuk berkontribusi pada pengembangan SENTRA Nawasena. Platform ini dibangun dan dirawat oleh siswa SMAN 2 Jonggol sebagai wadah karya nyata, inovasi teknologi sekolah, dan pelayanan informasi digital.

## Alur Kerja Pengembangan

Kami menerapkan alur kerja berbasis Git yang teratur agar stabilitas kode portal tetap terjaga:

### 1. Percabangan (Branching)

1. Lakukan *fork* repositori ini ke akun GitHub Anda.
2. Buat cabang baru dari `main` dengan format penamaan berikut:
   - `feat/nama-fitur` untuk penambahan fitur baru.
   - `fix/nama-perbaikan` untuk perbaikan kutu atau galat bug.
   - `style/nama-perubahan` untuk pembaruan tampilan dan tata letak.
   - `docs/nama-dokumentasi` untuk perbaikan atau penambahan dokumentasi.

Contoh perintah:
```bash
git checkout -b feat/agenda-filter
```

### 2. Standar Penulisan Kode

- **Nuxt 4 dan Vue 3:** Gunakan Composition API dengan sintaks `<script setup lang="ts">`.
- **TypeScript:** Tulis tipe data yang jelas untuk props, emit, dan fungsi composable. Hindari penggunaan tipe `any`.
- **Komponen Modular:** Pecah antarmuka menjadi komponen yang fokus pada satu tanggung jawab. Letakkan komponen bersama di folder `app/components/`.

### 3. Pedoman Desain dan Anti-Slop

Seluruh kontribusi antarmuka wajib menaati panduan desain pada berkas `DESIGN.md`:

- **Token Warna:** Gunakan palet resmi (`ground`, `ground-dark`, `ink`, `muted`, `line`, `accent` indigo `#6366f1`). Jangan menggunakan sembarang warna hex atau gradien ungu generik.
- **Bebas Em Dash:** Dilarang menggunakan tanda baca em dash (tanda pisah panjang) pada teks tampilan maupun komentar kode. Gunakan tanda hubung standar (` - `) atau tanda titik tengah (` · `).
- **Tipografi:** Gunakan skala hierarki font yang konsisten. Hindari label huruf besar (all-caps) berjarak renggang di atas setiap judul heading.
- **Aksesibilitas:** Pastikan kontras teks memenuhi standar keterbacaan (rasio kontras minimal 4.5:1 untuk teks utama).

### 4. Format Pesan Komit

Kami menerapkan standar [Conventional Commits](https://www.conventionalcommits.org/id/v1.0.0/):

- `feat: tambah penyaring kategori pada galeri dokumentasi`
- `fix: atasi tata letak responsif pada carousel agenda`
- `docs: perbarui instruksi variabel lingkungan lokal`
- `style: selaraskan jarak padding pada kartu bento`

### 5. Pengujian Lokal

Sebelum mengirimkan pull request, pastikan kode berhasil dikompilasi tanpa galat:

```bash
npm run build
```

Pastikan proses build selesai dengan kode status keluar 0 (exit code 0).

### 6. Pengajuan Pull Request (PR)

1. Dorong cabang kerja Anda ke repositori *fork*.
2. Buat Pull Request ke cabang `main` repositori utama.
3. Jelaskan perubahan yang dilakukan, alasan perubahan tersebut, serta cara memverifikasinya.
4. Tim pengembang akan meninjau perubahan Anda dan memberikan masukan jika diperlukan.

## Bantuan dan Kontak

Apabila Anda memiliki pertanyaan seputar arsitektur proyek, ide fitur baru, atau butuh panduan teknis, silakan hubungi Tim Pengembang OSIS & MPK SMAN 2 Jonggol melalui email: [osissmanduajonggol@gmail.com](mailto:osissmanduajonggol@gmail.com).
