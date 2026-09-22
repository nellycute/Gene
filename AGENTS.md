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

## Desain: sumber kebenarannya KEPUTUSAN-DESAIN.md

Seluruh keputusan tampilan ada di `KEPUTUSAN-DESAIN.md` (hasil brainstorming Nely
dengan Claude Design, 22 Sep 2026). Kalau kode dan berkas itu bertentangan, berkas
itu yang menang. Intinya:

- **Antarmuka tanpa warna** — kertas dan tinta. Tidak ada tombol berwarna, tidak ada
  aksen. Satu-satunya warna antarmuka adalah tujuh warna tingkat (`src/lib/tingkat.ts`),
  dan itu pun hanya sebagai batang 4 px, bingkai 1,5 px, label mono, titik, dan logo.
- **Panggung animasi selalu kertas terang** (`--panggung`) walau mode gelap.
- **Halaman pertama muat satu layar HP**, tanpa paragraf. Tujuh baris tingkat membuka
  di tempat. Alur: buka → pilih → tonton.
- **3D hanya untuk enam pelajaran** yang bentuk ruangnya diajarkan (§3). Material
  toon tanpa kilau, dimuat dinamis, ada tombol "Pakai gambar datar".
- **Batas kata mengikat** (§8.1): subtitel ≤ 45 kata, judul pelajaran ≤ 8 kata, dst.
- HP di atas laptop, selalu.

## Susunan berkas

```
src/
├── lib/warna.ts            SUMBER KEBENARAN warna entitas biologi (30 entitas)
├── lib/tingkat.ts          tujuh warna tingkat — satu-satunya warna antarmuka
├── lib/tipe.ts             bentuk data Pelajaran dan Adegan
├── lib/kurikulum.ts        peta Level 0-6, RINGAN (tanpa naskah) — dipakai bilah atas
├── lib/daftar-pelajaran.ts pelajaran siap + naskah lengkap — hanya untuk halaman pelajaran
├── lib/jendela.ts          membaca alamat/lebar layar/tema lewat useSyncExternalStore
├── lib/tema.ts, tampilan3d.ts  pilihan penonton yang disimpan di perangkat
├── konten/                 naskah pelajaran (satu berkas per pelajaran)
├── animasi/                komponen SVG per topik
├── animasi/tiga-dimensi/   SelHewan3D (three.js) + Panggung3D (pemuat dinamis)
├── components/             Kepala, Logo, DaftarTingkat, PemutarPelajaran, Laci, ...
└── app/                    halaman
KEPUTUSAN-DESAIN.md         SUMBER KEBENARAN desain — yang menang kalau bertentangan
KURIKULUM.md                peta seluruh materi — wilayah tinjauan Nely
PROGRESS.md                 catatan progres untuk dibaca Nely
```

## Pola React yang dipakai (lint `react-hooks/set-state-in-effect` aktif)

- Jangan `setState` langsung di badan `useEffect`. Untuk membaca keadaan browser
  (alamat, lebar layar, tema, localStorage) pakai hook di `src/lib/jendela.ts`
  yang berbasis `useSyncExternalStore`.
- Keadaan turunan dari props/alamat: simpan "pilihan pengguna" (`undefined` = belum
  menyentuh) dan turunkan nilai akhirnya saat render — lihat `DaftarTingkat.tsx`.
- Perpindahan adegan pemutar diputuskan di dalam detak `requestAnimationFrame`,
  bukan lewat efek yang mengawasi `waktu`.

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
