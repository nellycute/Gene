# Ruang Genetika — panduan kerja

Website edukasi genetika berbahasa Indonesia. Animasi terprogram (3D bergaris dan
SVG) + narasi + elemen interaktif. Gratis, tanpa login, tanpa database.

**Urutan kerja:** Tingkat 0 dinyatakan selesai oleh Nely pada 26 Sep 2026. Pada hari
yang sama **Tingkat 1–6 dibuat lengkap** atas permintaannya ("lanjutkan seluruh materi
… jangan tanya lagi"): 48 pelajaran seluruhnya. Tingkat 1–6 masih **Draf** sampai Nely
meninjau naskahnya. Pekerjaan berikutnya: perbaikan hasil tinjauan Nely, lalu Seri
Lanjutan (lihat `KURIKULUM.md`). Status tiap pelajaran ada di `KURIKULUM.md`.

Pemilik project: **Nely**, lulusan bidang genetika, **tanpa latar belakang programming**.

## Aturan paling penting

1. **Nely tidak pernah diminta menyentuh urusan teknis.** Tidak ada perintah terminal,
   tidak ada pengeditan kode, tidak ada pemilihan pustaka. Laporkan progres dalam
   bahasa non-teknis. Pertanyaan untuknya hanya seputar: benar tidak secara biologi,
   urutannya masuk akal tidak, nyaman dilihat tidak.
2. **Naskah tidak terbit sebelum Nely memeriksa akurasinya.** Pelajaran yang belum
   ditinjau wajib diberi `draf: true` agar peringatan muncul di halaman.
   *(25 Sep 2026: untuk Tingkat 0, Nely menyerahkan pemeriksaan akurasi kepada Claude.
   Label draf 0.1–0.8 dicabut setelah tiap naskah dicocokkan dengan rujukannya.
   Pelajaran baru tetap mulai dengan `draf: true`.)*
   *(26 Sep 2026: untuk Tingkat 1–6, Nely meninjau sendiri. Jangan cabut label Draf
   Tingkat 1–6 tanpa persetujuannya.)*
3. **Warna entitas biologi hanya boleh diambil dari `src/lib/warna.ts`.** Jangan pernah
   menulis warna organel/molekul langsung di dalam komponen. Satu entitas = satu warna
   tetap, sama di seluruh pelajaran, selamanya.
4. **Warna tidak pernah jadi satu-satunya penanda.** Selalu sertakan label teks.
5. **Tidak ada gambar dari buku teks, jurnal, atau internet.** Semua gambar dan model
   3D dibuat dari nol dengan kode.
6. **Istilah teknis selalu didampingi padanan Inggris** pada kemunculan pertama.

## Keterbatasan lingkungan — BACA SEBELUM MENGUBAH PERKAKAS

Lingkungan di komputer Nely punya tiga jebakan yang sudah pernah menghabiskan waktu.
Jangan diulang.

**25 Sep 2026: Nely sendiri MEMATIKAN Smart App Control** (agar Git bisa mengirim ke
GitHub). Sejak itu berkas biner tidak diblokir lagi, dan Smart App Control tidak bisa
dinyalakan kembali tanpa memasang ulang Windows. Penyelesaian di tabel ini **tetap
dipakai** karena sudah terbukti jalan — jangan ganti perkakas hanya karena kini bisa.

| Jebakan | Akibat | Penyelesaian yang sudah dipakai |
|---|---|---|
| **Smart App Control AKTIF** (sampai 25 Sep 2026) | Semua berkas biner `.node` diblokir Windows | Next.js otomatis memakai SWC versi WASM. |
| **Turbopack butuh biner asli** | `next dev` gagal total | Skrip `dev` dan `build` memakai `--webpack`. Jangan hapus tanda itu. |
| **Tailwind v4 butuh biner asli** | Halaman error 500 | Project memakai **Tailwind v3** (JavaScript murni). Jangan naikkan ke v4. |
| **OneDrive mengunci `node_modules`** | `npm install` gagal dengan EPERM | Project sengaja berada di `C:\Users\LENOVO\Projects\`, **di luar OneDrive**. Jangan pindahkan ke folder Documents. |

Installer MSI Node.js juga gagal (Error 1723) karena sebab yang sama. Node dipasang dari
berkas zip resmi ke `%LOCALAPPDATA%\Programs\nodejs`.

## Menjalankan

**Nely** membuka website lewat ikon **"Ruang Genetika" di Desktop** — pintasan ke
`Buka Ruang Genetika.cmd` di root project. Peluncur itu menyalakan `npm run dev` di
jendela terminal yang diminimalkan, menunggu sampai port 3000 menjawab, lalu membuka
browser. Kalau port 3000 sudah menyala, peluncur hanya membuka browser. Menutup
jendela "Ruang Genetika" di taskbar = mematikan website. Berkas `.cmd` itu harus
tetap berakhiran baris Windows (CRLF) dan hanya berisi huruf ASCII.

**Claude:** kalau http://localhost:3000 sudah menjawab (Nely sedang menyalakannya),
pakai server itu lewat `navigate` — jangan jalankan server kedua.

```
npm run dev      # http://localhost:3000
npm run build
npx tsc --noEmit # periksa tipe
npm run suara    # rekam narasi yang baru/berubah (Edge TTS) — lihat "Suara narasi"
```

Kalau `node` tidak dikenali di shell baru:
`$env:Path = "$env:LOCALAPPDATA\Programs\nodejs;$env:APPDATA\npm;$env:Path"`

## Terbit di internet: https://ruang-genetika.vercel.app (24 Sep 2026)

Nely meminta website bisa dibuka dari HP dan oleh orang lain. Terbit di **Vercel**,
akun Nely **"Nelyta"** (paket gratis Hobby), proyek `nelyta/ruang-genetika`.

- **Vercel tidak tersambung ke Git.** Repo ini punya remote GitHub (lihat di bawah),
  tetapi push ke GitHub TIDAK menerbitkan apa pun. Menerbitkan ulang dari root project:
  `$env:VERCEL_TELEMETRY_DISABLED="1"; npx --yes vercel@latest deploy --prod --yes`
  (± 2 menit; build berjalan di server Vercel, bukan di laptop — aman dari Smart App
  Control). Cek hasilnya tanpa cookie: `curl.exe -I https://ruang-genetika.vercel.app/`.
- **Menerbitkan = mengubah situs publik**: lakukan hanya bila Nely meminta atau
  menyetujuinya. Tawarkan di akhir pekerjaan ("mau kuterbitkan sekarang?").
- Login Vercel CLI tersimpan di laptop ini (izin perangkat, 24 Sep 2026). Kalau
  kedaluwarsa: jalankan `npx vercel login` di latar belakang, buka alamat
  `vercel.com/oauth/device?user_code=…` dari keluarannya di browser Claude (Nely
  sudah login di sana), cocokkan kodenya, lalu klik "Allow Access".
- `.vercelignore` mencegah buku/gambar rujukan (berhak cipta), peluncur `.cmd`, dan
  `alat/` ikut terunggah. Periksa ulang kalau menambah berkas besar di root.
- Pelajaran berstatus draf tetap terlihat publik, dengan lencana "Draf" — pilihan Nely.

## Cadangan di GitHub: github.com/nellycute/Gene (25 Sep 2026)

Nely meminta seluruh folder proyek disimpan di GitHub miliknya (repositori **publik**).
Remote `origin` = `https://github.com/nellycute/Gene.git`, cabang `main`. Push pertama
berhasil 25 Sep 2026.

- Login: **Git Credential Manager** menyimpan login GitHub Nely (Nely sendiri yang login
  lewat jendelanya, 25 Sep 2026). Claude tidak pernah memegang kata sandi atau token.
- Shell Claude menyetel `GCM_INTERACTIVE=never`. Selama login tersimpan, `git push`
  jalan biasa. Kalau login kedaluwarsa (`Cannot prompt because user interactivity has
  been disabled`): beri tahu Nely lebih dulu, lalu jalankan push di latar belakang
  dengan `$env:GCM_INTERACTIVE="always"`. Jendela login akan muncul di layarnya.
- Sebelum Smart App Control dimatikan, HTTPS Git gagal (`libcurl-4.dll` tidak bertanda
  tangan, diblokir). Kalau itu terulang, jalur cadangannya SSH bawaan Windows
  (`C:\Windows\System32\OpenSSH\ssh.exe`, bertanda tangan Microsoft) + deploy key.
- Commit dan push hanya bila Nely meminta. **Jangan pernah force-push.**
- `.gitignore` menahan buku rujukan (`Referensi*.pdf`) dan `Gambar referensi.jpg`
  (berhak cipta) agar tidak ikut terunggah — sama seperti `.vercelignore`.

## Ikon aplikasi (25 Sep 2026)

- **Ikon aplikasi** digambar dari `model-bola-sel.ts` lewat
  `studio.potret()` (PNG satu bingkai, latar tembus pandang), disusun di kanvas 2D
  (latar kertas + bayangan melayang), lalu disimpan lewat halaman + rute API
  SEMENTARA yang langsung dihapus lagi. Membuat ulang: tulis lagi keduanya, jangan
  pakai `sharp` (biner, diblokir Smart App Control).

## Suara narasi (24 Sep 2026)

Narasi dibacakan **Edge TTS, suara perempuan `id-ID-GadisNeural`, laju −5%** —
SEMENTARA, atas permintaan Nely, sampai ada pengisi suara. Komputer Nely tidak punya
Python, jadi pustaka Python `edge-tts` tidak dipakai; protokolnya ditulis ulang di
`alat/edge-tts.mjs` memakai WebSocket bawaan Node (tanpa paket tambahan, tanpa biner).

- `npm run suara` (`alat/buat-suara.mjs`) membaca semua naskah `src/konten/*.ts`
  (tipe dibuang dengan paket `typescript` — **jangan pakai tsx/esbuild**, biner),
  lalu hanya merekam adegan yang narasinya baru atau berubah. Hasilnya:
  `public/suara/<slug>/<id>.mp3` dan `src/konten/suara.json` (lama rekaman + waktu
  tiap kata). `--semua` merekam ulang semuanya.
- **Setiap kali narasi diubah, jalankan `npm run suara`.** Kalau lupa, adegan itu
  tayang tanpa suara (bukan suara yang salah): `daftar-pelajaran.ts` hanya memasang
  rekaman yang teksnya sama persis dengan narasi.
- Padanan Inggris di dalam kurung **tidak dibacakan** (suara Indonesia melafalkannya
  dengan ejaan Indonesia); tetap tampil di subtitel. Lafal khusus (Meiosis I → "satu",
  2n → "dua en", p/q → "pe"/"ki", ZW → "zet we", 46,XY → "empat puluh enam, eks ye")
  ada di daftar `LAFAL` di `buat-suara.mjs`. Padanan Inggris yang berisi angka, seperti
  "(trisomy 21)", tidak tertangkap pola kurung otomatis — tambahkan ke `LAFAL`.
  Begitu pula lambang (³²P), (³⁵S), dan kurung bertanda petik seperti "(Chargaff's
  rules)". Tanda ujung untai dibaca "5′" → "lima aksen", "3′" → "tiga aksen" (pakai
  tanda ′ U+2032 di naskah, bukan petik biasa).
- Tingkat 2–6 menambah lafal: genotip dieja per huruf ("Rr" → "er besar er kecil",
  daftar tertutup `PASANGAN_ALEL`), alel tunggal huruf kecil ("alel r" → "er kecil"),
  Iᴬ/Iᴮ/i, XᴮXᵇ/ZᴮW, XX/XY/XO, 45,X / 47,XXY, rumus Hardy-Weinberg (p = …, q = …,
  p + q = 1, p kuadrat, 2pq), h², SRY, PCR, SNP, STR, BLAD, BSE, PRRS, "10 + 7 = 17".
  **Menulis aturan `LAFAL` yang tumpang-tindih merusak ucapan** (dua suntingan pada
  huruf yang sama) — beri lookahead/lookbehind seperti yang sudah ada. Periksa dulu
  dengan `node alat/buat-suara.mjs --coba` (hanya mencetak, tidak merekam, tidak
  menghapus apa pun): pastikan hanya adegan yang memang berubah yang muncul.
- **Jangan menulis regex lewat `node -e` atau template string di shell** — garis
  miring terbalik bisa hilang (`\b` menjadi karakter backspace). Pakai alat Edit.
- Pemutar: lama adegan = `JEDA_AWAL` + rekaman + `JEDA_AKHIR` (`lamaAdegan` di
  `tipe.ts`; `durasi` di naskah hanya cadangan tanpa suara). Selama narasi terdengar,
  **rekamanlah jamnya**; subtitel dan isyarat dijadwalkan dari waktu kata
  (`detikNarasi` di `subtitel.ts`). Tombol suara (tombol `m`) disimpan di perangkat
  (`src/lib/bisu.ts`). Pindah tab = jeda, agar suara dan gambar tidak berpisah.
- Kalau Edge menolak (403) setelah Microsoft memperbarui layanannya, cocokkan
  konstanta di `alat/edge-tts.mjs` dengan `src/edge_tts/constants.py` dan `drm.py`
  di github.com/rany2/edge-tts.

## Desain: sumber kebenarannya KEPUTUSAN-DESAIN.md

Seluruh keputusan tampilan ada di `KEPUTUSAN-DESAIN.md` (hasil brainstorming Nely
dengan Claude Design, 22 Sep 2026). Kalau kode dan berkas itu bertentangan, berkas
itu yang menang. Intinya:

- **Antarmuka tanpa warna** — kertas dan tinta. Tidak ada tombol berwarna, tidak ada
  aksen. Satu-satunya warna antarmuka adalah tujuh warna tingkat (`src/lib/tingkat.ts`),
  dan itu pun hanya sebagai batang 4 px, bingkai 1,5 px, label mono, titik, dan logo.
  **25 Sep 2026:** ditambah hiasan latar samar (`LatarGenetika`) dan stabilo lembut
  pada tulisan tebal (kelas `.sorot-*`). Warnanya tetap warna entitas (`warna.ts`,
  lihat `entitasDariIstilah`) atau warna tingkat — tidak ada warna tanpa arti.
- **Panggung animasi selalu kertas terang** (`--panggung`) walau mode gelap.
- **Halaman pertama muat satu layar HP**, tanpa paragraf. Tujuh baris tingkat membuka
  di tempat. Alur: buka → pilih → tonton.
- **Gambar benda bergaya 3D bergaris** (§3, dipilih Nely 23 Sep 2026): sel dibelah
  seperti buah, toon tiga tingkat terang, garis tepi = warna entitas yang digelapkan.
  Diagram (Punnett, silsilah, grafik) tetap datar. Dimuat dinamis. **Sejak 24 Sep
  2026 seluruh Tingkat 0 berupa "film" 3D** yang bergerak terus mengikuti kalimat
  narasi — Nely menolak tampilan yang berganti per adegan "seperti slide PPT".
  Mesinnya `studio.ts` + `Film3D.tsx`. **Sejak 25 Sep 2026 hanya 3D**: tombol "Pakai
  gambar datar" dihapus; kembaran datar hanya muncul otomatis tanpa WebGL.
- **Layar menonton tidak pernah digulir** (§5.3 "layar bioskop"): satu baris judul →
  panggung → subtitel berpotong → kendali. Istilah, ringkasan, naskah, dan rujukan ada
  di Catatan: lembar dari bawah di HP. **Laptop (25 Sep 2026): video ¾ layar + Catatan
  ¼ di kanannya, terbuka sejak awal** (`.tata-menonton` di `globals.css`). Tinggi
  panggung tetap dibatasi tinggi layar, jadi di laptop bingkainya melebar (maks. 2,6 : 1).
  Layar laptop Nely diperkirakan ± 1267 × 667 px CSS (dari tangkapan layarnya: layar
  lebar 1900-an px, skala 150%). **26 Sep 2026: tata letak itu DIKUNCI** — di layar
  ≥ 1024 px `KunciTataLaptop.tsx` memberi `html.tata-terkunci` dan `zoom` pada `<body>`
  = min(lebar/1267, tinggi/667), jadi tampilannya sama persis di semua layar dan zoom
  peramban. Ubah ukuran di kelas `.tata-terkunci` (globals.css), bukan lewat vh.
  `studio.ts` ikut memperhalus kanvas sesuai zoom (peristiwa `ubah-skala`).
- **Seperti YouTube** (§5.3, 25 Sep 2026): di dalam video HANYA label bagian yang
  dibahas — jangan tambahkan nomor adegan, tombol, petunjuk, atau tulisan "memuat".
  Satu garis waktu utuh; spasi/k, panah, j/l, m, c, f; klik video (laptop) atau ketuk
  dua kali (HP) = putar/jeda; tombol layar penuh. Suara tidak pernah menahan video
  lebih dari 0,3 detik.
- **Batas kata mengikat** (§8.1): narasi ≤ 45 kata per adegan, judul pelajaran ≤ 8 kata, dst.
- HP di atas laptop, selalu.

## Susunan berkas

```
src/
├── lib/warna.ts            SUMBER KEBENARAN warna entitas biologi (30 entitas)
├── lib/tingkat.ts          tujuh warna tingkat — satu-satunya warna antarmuka
├── lib/tipe.ts             bentuk data Pelajaran dan Adegan
├── lib/kurikulum.ts        peta Tingkat 0-6, RINGAN (tanpa naskah) — dipakai bilah atas
├── lib/daftar-pelajaran.ts pelajaran siap + naskah lengkap — hanya untuk halaman pelajaran
├── lib/subtitel.ts         potongan subtitel + detikNarasi (kapan huruf ke-n terucap)
├── lib/isyarat.ts          jadwal isyarat: kata di narasi → gambar berubah
├── lib/jendela.ts          membaca alamat/lebar layar/tema lewat useSyncExternalStore
├── lib/tema.ts, bisu.ts    pilihan penonton yang disimpan di perangkat
├── konten/                 naskah pelajaran (satu berkas per pelajaran)
├── konten/suara.json       DIBUAT `npm run suara` — waktu kata tiap rekaman
├── animasi/                komponen SVG per topik (juga kembaran datar gambar 3D)
├── animasi/tiga-dimensi/   studio.ts (panggung, kamera, redup, pergantian set),
│                           Film3D.tsx (pembungkus React), satu film per pelajaran
│                           (PengantarGenetika3D, PerjalananSel3D, SelHewanPotong3D,
│                           IntiSel3D, KromosomFilm3D, PembelahanFilm3D,
│                           BuktiDNA3D, StrukturDNA3D, RNA3D, Replikasi3D,
│                           Transkripsi3D, Translasi3D, GenSifat3D),
│                           satu film per TINGKAT untuk Tingkat 2–6, masing-masing
│                           di foldernya: mendel/, perluasan/, kelamin/, mutasi/,
│                           populasi/ (Mendel3D, Perluasan3D, Kelamin3D, Mutasi3D,
│                           Populasi3D + set-*.ts + model-*.ts). `tahap` naskah =
│                           nama set; set dibangun saat pertama dipakai
│                           (`rangkaiSetMalas`),
│                           rangkai-set.ts (kerangka film: set + fokus, label, panah,
│                           buatJamTahap, rangkaiSetMalas — pakai untuk film baru),
│                           model-hewan.ts (sapi polos/roan/belang/kaki pendek, ayam
│                           dengan 4 jengger/lurik/Creeper/jantan, kelinci, tikus),
│                           model-sosok.ts (orang boneka kayu; botak, kulit albino),
│                           mendel/bantu.ts (tulis, papan berdiri, sel tembus,
│                           homolog berhuruf, muncul, teksDatar),
│                           perluasan/set-silang.ts (kerangka P → F1 → F2 umum),
│                           model-*.ts (benda: sel hewan, sel tumbuhan, kromosom, ...),
│                           model-dna.ts (heliks jadi, PUTAR KANAN — dibetulkan 26 Sep),
│                           model-dna-rakit.ts (DNA per nukleotida: tangga ↔ heliks, 1.2),
│                           model-mikroba.ts (bakteri, fag T2, tikus, tabung, enzim, 1.1),
│                           model-rna.ts (nukleotida/untai RNA, tRNA L dan tegak,
│                           ribosom, rantai protein — 1.3–1.7),
│                           model-garpu.ts (garpu replikasi, 1.4),
│                           model-bola-sel.ts (gambar ikon aplikasi, juga di 0.1),
│                           Panggung3D (datar hanya bila tanpa WebGL)
├── app/manifest.ts         aplikasi di layar HP; ikon di public/ikon/ + app/apple-icon.png
├── components/             Kepala, Logo, DaftarTingkat, PemutarPelajaran, Catatan, ...
│                           LatarGenetika (hiasan latar samar, dipasang di layout.tsx)
└── app/                    halaman
public/suara/               DIBUAT `npm run suara` — mp3 per adegan
alat/                       skrip Node untuk Claude (suara); bukan bagian website
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
   Tiap adegan ≤ 45 kata. Isi `tahap` untuk memilih gambar yang ditampilkan, dan
   `isyarat` (kata di narasi → `fokus`/`sorot`/`tahap`/`label`) agar gambar berubah
   di tengah kalimat, tepat saat kata itu diucapkan.
2. Kalau butuh gambar baru, buat komponen di `src/animasi/` dengan props
   `PropsAnimasi`, lalu daftarkan kuncinya di `KunciAnimasi` (`src/lib/tipe.ts`)
   dan di `ANIMASI` (`src/animasi/daftar.tsx`). Gambar benda dibuat sebagai film 3D
   bergaris di `src/animasi/tiga-dimensi/` (ikuti pola `PembelahanFilm3D`/`IntiSel3D`:
   `Film3D` + pembangun berisi beberapa set, `studio.bagian()` per entitas, sudut
   kamera per `fokus` dengan `lihat()`), dibungkus `next/dynamic` dengan
   `tiga: "semua"`, dan tetap punya kembaran datar. Ambil semua warna dari
   `src/lib/warna.ts`; pakai potongan bersama di `src/animasi/bagian.tsx`.
3. **Bulatkan semua koordinat hasil cos/sin/pembagian** dengan `bulat()` dari
   `bagian.tsx` — kalau tidak, server dan browser berbeda di digit ke-13 dan React
   melempar peringatan hidrasi.
4. Daftarkan di `src/lib/daftar-pelajaran.ts` (`PELAJARAN_SIAP`) dan isi `slug` pada
   butir yang sesuai di `src/lib/kurikulum.ts`.
5. Jalankan `npm run suara` — dan lagi setiap kali narasinya berubah.
6. Biarkan `draf: true` sampai Nely selesai meninjau.
7. Periksa tiap tahap gambar di browser: label panggung menutupi pojok kiri-atas —
   jangan taruh judul atau label di sana.
   Panel browser Claude yang tersembunyi menghentikan `requestAnimationFrame`, dan
   yang tampil pun hanya ± 3 bingkai/detik — film tampak lambat, dan tangkapan layar
   panel tersembunyi bisa basi. Buka panelnya dengan `preview_start {url}`, lompat
   dengan mengklik garis waktu, lalu majukan film secara manual lewat
   `window.__majukanFilm(n)` (n × 100 ms waktu film; hanya di mode dev, dipasang
   `Film3D.tsx`, bersama `window.__studioFilm`).
   Cara yang terbukti cepat (26 Sep 2026):
   - Tekan tombol layar penuh; panggungnya menjadi lebih besar.
   - Lompat lewat JS: kirim `pointerdown`/`pointerup` ke `[aria-label="Garis waktu"]`
     pada x = kiri + lebar × detik/total. `setPointerCapture` perlu ditimpa dengan
     fungsi kosong lebih dulu.
   - Tunggu ± 150 ms, lalu `__majukanFilm(n)`.
   - Tangkapan layar tertinggal satu bingkai: tunggu ± 1 detik dan majukan 2 bingkai
     lagi sebelum memotret.
   - Setelah mengubah kode film, muat ulang halaman. HMR membuat dua film bertumpuk.
   - Tangkapan layar panel kadang "terpotong-perbesar" 1,5× (hanya 2/3 kiri-atas
     halaman yang tampak, tulisan antarmuka ikut membesar). Itu salah tangkap panel,
     bukan salah gambar. Jangan menyetel kamera berdasarkan tangkapan seperti itu;
     periksa dengan `camera.position` atau muat ulang halaman lalu potret lagi.
   - Ukuran label: kira-kira 0,024 × jarak kamera (mis. 0,5 pada jarak 20). Lebih
     kecil dari itu tak terbaca di panggung laptop.
   - Label yang ditaruh di depan benda lain (z lebih besar) menutupinya; letakkan label
     induk di ATAS induk, bukan di depan kaki, bila di depannya ada keturunan.
   - Gerakan panjang yang melewati beberapa isyarat berfokus sama: pakai
     `buatJamTahap()` (rangkai-set.ts). Jam ini memakai `sejakFokus`, yaitu detik sejak
     tahap+fokus mulai berlaku, sehingga tetap benar saat penonton melompat.

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
