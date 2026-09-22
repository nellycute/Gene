# Ruang Genetika — panduan kerja

Website edukasi genetika berbahasa Indonesia. Animasi terprogram (SVG) + narasi +
elemen interaktif. Gratis, tanpa login, tanpa database.

Pemilik project: **Nely**, lulusan bidang genetika, **tanpa latar belakang programming**.

## Aturan paling penting

1. **Nely tidak pernah diminta menyentuh urusan teknis.** Tidak ada perintah terminal,
   tidak ada pengeditan kode, tidak ada pemilihan pustaka. Laporkan progres dalam
   bahasa non-teknis. Pertanyaan untuknya hanya seputar: benar tidak secara biologi,
   urutannya masuk akal tidak, nyaman dilihat tidak.
2. **Naskah tidak terbit sebelum Nely memeriksa akurasinya.** Pelajaran yang belum
   ditinjau wajib diberi `draf: true` agar peringatan muncul di halaman.
3. **Warna entitas biologi hanya boleh diambil dari `src/lib/warna.ts`.** Jangan pernah
   menulis warna organel/molekul langsung di dalam komponen. Satu entitas = satu warna
   tetap, sama di seluruh pelajaran, selamanya.
4. **Warna tidak pernah jadi satu-satunya penanda.** Selalu sertakan label teks.
5. **Tidak ada gambar dari buku teks atau jurnal.** Semua diagram digambar dari nol.
6. **Istilah teknis selalu didampingi padanan Inggris** pada kemunculan pertama.

## Keterbatasan lingkungan — BACA SEBELUM MENGUBAH PERKAKAS

Lingkungan di komputer Nely punya tiga jebakan yang sudah pernah menghabiskan waktu.
Jangan diulang.

| Jebakan | Akibat | Penyelesaian yang sudah dipakai |
|---|---|---|
| **Smart App Control AKTIF** | Semua berkas biner `.node` diblokir Windows | Next.js otomatis memakai SWC versi WASM. **Jangan sarankan mematikan Smart App Control** — sekali mati tidak bisa dinyalakan lagi tanpa memasang ulang Windows. |
| **Turbopack butuh biner asli** | `next dev` gagal total | Skrip `dev` dan `build` memakai `--webpack`. Jangan hapus tanda itu. |
| **Tailwind v4 butuh biner asli** | Halaman error 500 | Project memakai **Tailwind v3** (JavaScript murni). Jangan naikkan ke v4. |
| **OneDrive mengunci `node_modules`** | `npm install` gagal dengan EPERM | Project sengaja berada di `C:\Users\LENOVO\Projects\`, **di luar OneDrive**. Jangan pindahkan ke folder Documents. |

Installer MSI Node.js juga gagal (Error 1723) karena sebab yang sama. Node dipasang dari
berkas zip resmi ke `%LOCALAPPDATA%\Programs\nodejs`.

## Menjalankan

```
npm run dev      # http://localhost:3000
npm run build
npx tsc --noEmit # periksa tipe
```

Kalau `node` tidak dikenali di shell baru:
`$env:Path = "$env:LOCALAPPDATA\Programs\nodejs;$env:APPDATA\npm;$env:Path"`

## Susunan berkas

```
src/
├── lib/warna.ts            SUMBER KEBENARAN warna entitas biologi
├── lib/tipe.ts             bentuk data Pelajaran dan Adegan
├── lib/daftar-pelajaran.ts daftar pelajaran siap + peta kurikulum Level 0-6
├── konten/                 naskah pelajaran (satu berkas per pelajaran)
├── animasi/                komponen SVG per topik
├── components/             Pemutar Pelajaran, kepala, kaki, lencana
└── app/                    halaman
KURIKULUM.md                peta seluruh materi — wilayah tinjauan Nely
PROGRESS.md                 catatan progres untuk dibaca Nely
```

## Cara menambah pelajaran baru

1. Buat berkas naskah di `src/konten/<nomor>-<slug>.ts` mengikuti bentuk `Pelajaran`.
2. Kalau butuh gambar baru, buat komponen di `src/animasi/`. Ambil semua warna dari
   `src/lib/warna.ts`. Beri tiap bagian id yang sama dengan id entitasnya.
3. Daftarkan di `src/lib/daftar-pelajaran.ts`: tambahkan ke `PELAJARAN_SIAP`, lalu isi
   `slug` pada butir kurikulum yang sesuai.
4. Biarkan `draf: true` sampai Nely selesai meninjau.

## Gaya penulisan kode

- Nama variabel, fungsi, dan berkas memakai **bahasa Indonesia** (`warnaDari`,
  `PemutarPelajaran`, `totalDurasi`). Ini disengaja: pemilik project berbahasa Indonesia
  dan harus bisa mengenali isi berkas dari namanya.
- Komentar menjelaskan **alasan**, bukan mengulang apa yang sudah jelas dari kode.
- Warna antarmuka (latar, teks, garis) lewat kelas Tailwind bahasa Indonesia yang
  didefinisikan di `tailwind.config.ts` — `bg-latar`, `text-teks-lembut`, `border-garis`.
- Penanda transparansi Tailwind (`bg-latar/85`) **tidak bisa dipakai** pada warna kita
  karena nilainya berupa variabel CSS. Pakai kelas `.kaca` atau `.kaca-latar`.
