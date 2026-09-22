# Brief untuk Claude Design — Ruang Genetika

> Salin seluruh isi berkas ini, tempel sebagai pesan pertama ke Claude Design.

---

Halo. Aku Nely. Aku lulusan bidang genetika, dan aku sedang membangun website edukasi
genetika berbahasa Indonesia bernama **Ruang Genetika**. Aku **bukan desainer dan bukan
programmer**. Aku ingin kamu membantuku menentukan desain website ini lewat brainstorming.

## Cara aku ingin kamu bekerja — baca ini dulu

1. **Jangan langsung membuat rancangan.** Tanya aku dulu sampai kamu benar-benar paham
   apa yang kumau. Baru setelah itu buat rancangannya.
2. **Bahasa sederhana.** Tanpa istilah desain atau teknis. Kalau terpaksa memakai satu,
   jelaskan artinya dalam satu kalimat pendek.
3. **Maksimal 3–4 pertanyaan per giliran.** Jangan membanjiriku.
4. **Setiap pertanyaan beri 2–4 pilihan konkret**, masing-masing dengan akibatnya.
   Jangan bertanya terbuka seperti "kamu mau gaya apa?" — aku tidak tahu nama-nama gaya.
   Lebih baik: "Pilihan A begini, akibatnya begitu. Pilihan B begini, akibatnya begitu."
5. **Kalau dua keinginanku bertabrakan, katakan terus terang.** Jangan dipaksakan
   keduanya lalu hasilnya tanggung. Bantu aku memilih.
6. **Kalau kamu bisa menunjukkan contoh visual**, tunjukkan. Aku lebih mudah memilih
   dari gambar daripada dari deskripsi.
7. Hasil akhirmu nanti akan kuberikan ke asisten lain (Claude Code) untuk dibangun.
   Jadi tulis keputusan akhirnya dengan cukup jelas agar bisa diikuti orang yang tidak
   ikut percakapan ini.

## Tentang website-nya

- **Isi:** materi genetika dari yang paling dasar (sel, DNA, RNA) sampai yang rumit
  (teknik sequencing, bioinformatika, CRISPR). Total direncanakan 42 pelajaran dalam
  7 tingkat.
- **Bentuk materi:** setiap pelajaran adalah "video" yang sebenarnya animasi terprogram —
  gambar sel atau molekul yang bergerak, dengan narasi suara dan subtitel. Ditambah
  beberapa bagian interaktif yang bisa diklik dan digeser.
- **Untuk siapa:** terutama mahasiswa S1 (biologi, kedokteran, pertanian), tapi siswa SMA
  juga harus bisa mengikuti dari tingkat paling dasar. Sebagian besar akan membuka dari
  **HP Android kelas menengah dengan kuota terbatas** — ini penting.
- **Gratis, tanpa login, tanpa daftar.** Tidak ada halaman yang dikunci.
- **Alur yang sudah kuputuskan dan tidak mau kuubah:** **Buka situs → pilih materi →
  langsung tonton.** Tiga langkah, tidak lebih. Tidak ada halaman perantara.

## Yang sudah ada sekarang — boleh kamu ubah

Website versi pertama sudah jadi. Ini kondisinya, supaya kamu tahu titik berangkatnya:

- Latar **krem hangat** dengan aksen **hijau toska**. Huruf Plus Jakarta Sans.
- Halaman depan berisi judul besar, gambar sel, tiga kotak penjelasan, lalu **daftar
  panjang 42 pelajaran** ke bawah. Jujur: halaman ini terlalu panjang dan terlalu banyak
  tulisan — aku tidak suka.
- Halaman pelajaran: pemutar animasi di atas, subtitel di bawahnya, tombol kendali,
  lalu ringkasan, daftar istilah, dan rujukan di bawah.
- Menu di atas: Materi, Peta Warna, Tentang, dan tombol mode gelap.
- Gambar sel dibuat **2D datar** (grafik vektor), bukan 3D.

Semua ini **boleh kamu bongkar**. Aku belum terikat pada apa pun di atas.

## Yang TIDAK boleh diubah — ini fondasi ilmiahnya

Ada satu hal yang bukan soal selera, tapi soal cara belajar:

**Setiap bagian biologi punya satu warna tetap yang tidak pernah berubah di seluruh
website.** Mitokondria selalu jingga. Inti sel selalu ungu. DNA selalu biru. Basa
adenin selalu hijau. Sudah ada 30 bagian yang punya warna tetapnya masing-masing.
Tujuannya: penonton mengenali bagian dari warnanya sekali, lalu pengenalan itu bekerja
otomatis di semua pelajaran berikutnya.

Konsekuensinya untukmu: **warna-warna website tidak boleh bertabrakan atau bersaing
dengan warna-warna biologi itu.** Kalau tombol dan latar sama mencoloknya dengan
mitokondria, penonton bingung mana yang materi dan mana yang hiasan.

Dua aturan lain yang juga tetap:
- Warna tidak pernah jadi satu-satunya penanda — selalu ada nama bagian di sampingnya
  (untuk penyandang buta warna).
- Setiap istilah teknis didampingi padanan Inggrisnya.

## Yang ingin aku jelajahi bersamamu

### 1. Warna website
Bukan warna bagian biologi (itu sudah tetap), tapi warna latar, tombol, menu, judul.
Aku punya satu gambar referensi: **deretan strip warna pelangi berjajar rapi — hijau,
kuning, jingga, merah, magenta, ungu, biru — jenuh, cerah, seperti kertas warna.**
Itu rasa yang kumau: **colorful yang berani tapi rapi, bukan pastel yang malu-malu.**
Tapi aku juga mau **nyaman dilihat lama** — ini bahan belajar, bukan poster.
Bantu aku menemukan titik temunya.

### 2. Ilustrasi: 2D atau 3D?
Sekarang semua gambar 2D datar. Aku penasaran apakah 3D akan lebih memikat. Tapi aku
tidak tahu akibatnya. Tolong jelaskan dengan jujur kelebihan dan kekurangan masing-masing
**untuk situasiku**: penonton pakai HP kelas menengah, kuota terbatas, dan warna setiap
bagian harus tetap konsisten.

### 3. Animasi saat membuka, menutup, dan menggeser halaman
Aku ingin website-nya terasa hidup — ada gerakan saat halaman dibuka, saat berpindah
dari daftar materi ke video, saat menu muncul dan hilang. Tapi jangan sampai lambat
atau bikin pusing. Seperti apa yang pantas?

### 4. Menu yang bisa dibuka-tutup
Aku ingin menu tidak selalu tampak memenuhi layar. Muncul saat dibutuhkan, hilang saat
tidak. Di mana letaknya? Bagaimana cara membukanya? Apa isinya?

### 5. Sedikit scroll, sedikit tulisan
Aku **tidak mau** website yang panjang ke bawah dan penuh paragraf. Aku mau orang
datang, melihat, memilih, menonton. Tapi ada 42 pelajaran yang harus bisa dipilih, dan
materi belajar tetap butuh penjelasan. Bagaimana caranya semua itu muat tanpa scroll
panjang dan tanpa tulisan bertele-tele?

### 6. Alur tiga langkah
Buka situs → pilih materi → tonton. Bagaimana tampilan tiap langkah supaya terasa
mulus dan cepat, terutama di HP?

### 7. Hal-hal yang belum sempat kupikirkan
Tolong angkat juga hal-hal ini kalau menurutmu penting:
- Jenis huruf — yang sekarang oke, tapi aku terbuka.
- Bentuk ikon dan tombol.
- **Lima detik pertama** saat orang membuka situs — apa yang mereka lihat dan rasakan?
- Tampilan di HP dibanding laptop — mana yang harus jadi prioritas?
- Mode gelap — perlu dipertahankan?
- Logo dan identitas — sekarang cuma tulisan "RuangGenetika" dengan ikon heliks kecil.
- Apa yang terlihat saat menunggu video dimuat.
- Cara kembali dari video ke daftar materi tanpa tersesat.
- Apakah perlu efek bunyi kecil saat mengklik — atau itu mengganggu?
- Kesan yang kumau: **cerah dan menyenangkan, tapi tetap dipercaya sebagai bahan
  kuliah.** Bukan seperti buku anak, bukan pula seperti jurnal yang dingin.

## Yang aku sadari mungkin bertabrakan — tolong bantu putuskan

Aku sudah menyadari beberapa keinginanku saling tarik-menarik. Jangan dihindari —
bahas satu per satu:

- **Website warna pelangi** vs **warna biologi yang harus menonjol.** Kalau seluruh
  website berwarna-warni, gambar sel yang berwarna-warni jadi tenggelam.
- **Ilustrasi 3D** vs **HP kelas menengah dan kuota terbatas.**
- **Ilustrasi 3D** vs **satu bagian = satu warna tetap.** Bayangan dan pantulan cahaya
  pada 3D membuat warna terlihat berubah-ubah.
- **Sedikit tulisan** vs **materi kuliah yang butuh penjelasan.**
- **Sedikit scroll** vs **42 pelajaran yang harus bisa ditemukan.**
- **Banyak animasi** vs **penonton yang mudah pusing, dan HP yang lambat.**

## Hasil akhir yang kuharapkan darimu

Setelah brainstorming selesai, tolong buatkan satu rangkuman keputusan yang berisi:

1. **Palet warna website** — lengkap dengan kode warnanya, dan penjelasan singkat
   bagaimana ia hidup berdampingan dengan 30 warna biologi yang sudah tetap.
2. **Keputusan 2D atau 3D**, beserta alasannya.
3. **Jenis huruf** untuk judul, isi, dan deret DNA.
4. **Sketsa tiga layar utama:** halaman pertama, layar memilih materi, layar menonton.
   Versi HP dan versi laptop.
5. **Daftar animasi:** apa yang bergerak, kapan, berapa lama, dan apa yang terjadi
   untuk penonton yang mematikan animasi di HP-nya.
6. **Struktur menu:** letak, cara buka-tutup, isinya.
7. **Aturan "sedikit tulisan":** batas berapa kata per layar, dan ke mana penjelasan
   panjang disembunyikan tanpa hilang.

Mulailah dengan pertanyaan pertamamu.
