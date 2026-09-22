# Catatan Progres — Ruang Genetika

Catatan ini ditulis untuk Nely, bukan untuk programmer. Kalau ada istilah yang
membingungkan, itu kesalahan penulisnya, bukan kesalahanmu.

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
