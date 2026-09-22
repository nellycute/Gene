# Catatan Progres — Ruang Genetika

Catatan ini ditulis untuk Nely, bukan untuk programmer. Kalau ada istilah yang
membingungkan, itu kesalahan penulisnya, bukan kesalahanmu.

---

## 22 September 2026 — Desain baru diterapkan

Seluruh sepuluh butir daftar kerja di `KEPUTUSAN-DESAIN.md` §10 sudah dikerjakan
dan tersimpan. Website sekarang tampil persis mengikuti keputusan itu.

### Yang berubah dan bisa kamu lihat

| Bagian | Sekarang |
|---|---|
| Warna halaman | Kertas krem dan tinta. Tidak ada lagi tombol toska. |
| Warna biologi | 25 warna dicerahkan; 5 basa nitrogen dibiarkan |
| Logo | Tujuh strip pelangi + "Ruang Genetika"; heliks dihapus |
| Halaman pertama | Muat satu layar HP: sel kecil berdenyut + tujuh baris tingkat |
| Memilih materi | Baris tingkat membuka di tempat, bingkai warna tingkat |
| Menu di HP | Tombol tiga garis → panel turun; halaman di belakang meredup |
| Layar menonton | Dua kolom di laptop; subtitel di bawah panggung; tiga laci |
| Mode gelap | Halaman gelap, **panggung tetap terang** |
| Tombol kembali | `← Fondasi Sel` — kembali ke daftar dengan tingkatnya sudah terbuka |
| Gambar sel | Gradasi lembut satu rona + bayangan tipis ("datar berisi") |
| Adegan penutup 0.2 | **Sel 3D yang bisa diputar**, dengan tombol "Pakai gambar datar" |
| Gerakan | Semua 140–200 ms; berhenti total kalau HP-mu menyalakan "kurangi gerakan" |

### ⚠️ Yang butuh keputusanmu

1. **Subtitel melebihi batas 45 kata.** Aturan §8.1 membatasi satu adegan ≤ 45 kata,
   ≤ 3 baris di HP. Naskah 0.2 sekarang rata-rata 55–70 kata per adegan (di HP jadi
   6–9 baris). Ini naskah biologi, jadi aku **tidak memotongnya sendiri**. Pilihan:
   (a) kamu pangkas saat meninjau, (b) aku pecah adegan panjang jadi dua, atau
   (c) batas 45 kata dilonggarkan.
2. **Tiga jingga berdekatan** — mitokondria, RNA, dan basa T. Lihat kotak "Perlu
   ditinjau" di halaman Peta Warna dan putuskan apakah jaraknya cukup.
3. **43, bukan 42.** Kurikulum berisi 43 pelajaran. Angka itu tidak lagi ditulis di
   halaman depan, jadi tidak ada yang salah tampil — tapi kalau kamu ingin
   membulatkan ke 42, satu pelajaran harus dilebur.
4. **Berkas `Tiga Layar.dc.html` tidak ada di komputermu.** Aku membangun dari
   tulisan §5, yang untungnya sangat rinci. Kalau kamu masih punya berkasnya,
   simpan ke folder project — aku cocokkan ulang detail yang mungkin meleset.

### Yang sengaja belum / tidak bisa

- **Animasi halaman lama "menggeser keluar"** (§6 baris "Daftar → menonton") tidak
  aku buat. Teknologinya masih eksperimental di Next.js dan berisiko rusak; halaman
  baru tetap masuk dari kanan seperti yang direncanakan. Kalau nanti stabil, ditambah.
- **3D untuk lima pelajaran lain** (1.1, 0.4, 1.6, 4.6, 6.1) menunggu pelajarannya
  sendiri dibuat. Kerangkanya sudah ada; tinggal dipakai.
- **Narasi suara** masih menunggu naskah selesai kamu tinjau — alasannya sama seperti
  sebelumnya: kalau naskah berubah setelah suara dibuat, pekerjaannya terbuang.

---

## 22 September 2026 — Hari pertama

### Yang sudah jadi dan bisa kamu lihat

**Website-nya sudah hidup di komputermu.** Alamatnya `http://localhost:3000`.
Kata "localhost" berarti website ini baru berjalan di laptopmu sendiri, belum bisa
dibuka orang lain. Menerbitkannya ke internet adalah langkah terpisah nanti.

Tiga halaman sudah jadi:

| Halaman | Isinya |
|---|---|
| Halaman depan | Perkenalan, gambar sel utuh, dan daftar seluruh 42 pelajaran yang direncanakan |
| Pelajaran 0.2 | Pelajaran pertama yang sudah lengkap: Bagian-bagian Sel |
| Peta Warna | Daftar lengkap warna tetap setiap bagian biologi |

### Sistem warna sudah berdiri

Ini fondasi yang kamu minta, dan sudah selesai. Ada **30 entitas biologi** yang
masing-masing sudah punya satu warna tetap: 18 bagian sel, 5 basa nitrogen, dan
7 molekul. Mitokondria akan selalu jingga, inti sel akan selalu ungu — di pelajaran
mana pun, sampai pelajaran terakhir nanti.

Dua keputusan yang perlu kamu tahu:

1. **Basa nitrogen memakai palet Okabe-Ito**, palet baku yang dirancang khusus agar
   tetap terbaca oleh penyandang buta warna merah-hijau.
2. **Timin dan urasil sengaja diberi warna bersaudara** (jingga-kemerahan dan merah
   muda), karena keduanya menempati posisi yang sama — T di DNA, U di RNA. Harapannya
   kemiripan warna itu membantu penonton menangkap penggantiannya. **Ini keputusan
   pedagogi, dan kamu berhak membatalkannya.**

### Pelajaran pertama: Bagian-bagian Sel

Sudah jadi utuh: **16 adegan, sekitar 7 menit 21 detik.**

Cara kerjanya: satu gambar sel hewan digambar penuh dengan semua organelnya. Saat
narasi membahas mitokondria, ketiga mitokondria menyala jingga dan seluruh bagian lain
meredup jadi abu-abu, lalu namanya muncul otomatis. Begitu seterusnya untuk tiap bagian.

Sudah tersedia: subtitel, pengatur kecepatan, lompat antar adegan, mode gelap,
dan tampilan yang menyesuaikan layar HP.

### ⚠️ Yang paling butuh perhatianmu

**Naskahnya masih draf dan belum kamu periksa.** Aku yang menulisnya, dan aku bisa
keliru soal detail biologi. Halaman pelajaran sekarang menampilkan peringatan kuning
yang akan hilang setelah kamu selesai meninjau.

Beberapa hal yang secara khusus ingin aku pastikan padamu:

1. Apakah penyebutan "lima kali lebih tipis daripada sehelai rambut" itu tepat?
2. Apakah menyebut nukleolus sebagai "bukan organel bermembran" sudah benar caranya?
3. Aku menulis lisosom "lebih asam daripada sitoplasma" tanpa menyebut angka pH —
   apakah sebaiknya angkanya disebut?
4. Urutannya: apakah sitoskeleton dan sentriol pantas ditaruh di akhir, atau sebaiknya
   lebih awal?
5. Apakah 16 adegan terlalu panjang untuk satu pelajaran pertama?

### Yang BELUM ada

- **Narasi suara.** Masih berupa subtitel teks saja. Suaranya sengaja belum dibuat
  supaya kamu bisa mengoreksi naskahnya dulu — kalau suaranya dibuat sekarang lalu
  naskahnya berubah, pekerjaannya terbuang.
- **Elemen interaktif.** Baru direncanakan untuk Level 1.
- **Pelajaran lain.** Baru 1 dari 42.
- **Belum terbit di internet.**

---

## Catatan teknis (boleh dilewati)

Hari ini sebagian besar waktu habis untuk melawan tiga hambatan di laptopmu. Semuanya
sudah teratasi, dan tidak akan mengganggu lagi:

1. **Installer resmi Node.js gagal** karena fitur keamanan Windows (Smart App Control)
   memblokir salah satu berkas pendukungnya. Diatasi dengan memakai versi yang tidak
   pakai installer.
2. **OneDrive berebut berkas** dengan proses pembangunan website, yang menyebabkan
   kegagalan berulang. Diatasi dengan memindahkan rumah project ke luar OneDrive, ke
   `C:\Users\LENOVO\Projects\ruang-genetika`. Cadangan sekarang ditangani Git, yang
   menyimpan seluruh riwayat perubahan — lebih baik daripada sekadar salinan terakhir.
3. **Dua komponen pemercepat diblokir** oleh fitur keamanan yang sama. Diatasi dengan
   memakai versi yang seluruhnya ditulis dengan JavaScript biasa. Hasil yang dilihat
   penonton sama persis.

Smart App Control di laptopmu berstatus aktif, dan **sebaiknya dibiarkan begitu**.
Fitur itu tidak bisa dinyalakan kembali setelah dimatikan tanpa memasang ulang Windows.
