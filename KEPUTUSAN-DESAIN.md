# Keputusan Desain — Ruang Genetika

> Berkas ini adalah hasil akhir brainstorming desain bersama Nely.
> Serahkan seluruh isinya ke Claude Code sebagai acuan membangun.
> Rancangan visualnya ada di berkas `Tiga Layar.dc.html` (buka di browser).
>
> Semua keputusan di bawah ini **sudah disetujui Nely**. Kalau ada yang
> bertentangan dengan kode yang ada sekarang, yang di bawah ini yang menang.

---

## 0. Ringkasan keputusan dalam satu layar

| Hal | Keputusan |
|---|---|
| Warna halaman | Kertas krem tenang. Antarmuka **tanpa warna** — hitam tinta. Pelangi hanya sebagai penanda tingkat. |
| Warna biologi | **Dicerahkan** dari palet lama. 5 basa nitrogen **tidak diubah**. |
| Ilustrasi | Datar berisi di mana-mana; **3D hanya untuk 6 pelajaran** yang bentuk ruangnya memang diajarkan. |
| Huruf | Plus Jakarta Sans (judul + isi), JetBrains Mono (deret basa & angka). |
| Menemukan materi | 7 baris tingkat dalam satu layar; ketuk → isinya terbuka **di tempat**. |
| Menu | Bilah atas tipis; di HP tombol tiga garis → panel turun. |
| Gerakan | Halus dan singkat, 140–200 ms. |
| Halaman pertama | Sel kecil berdenyut + satu kalimat + 7 baris tingkat. Muat satu layar HP. |
| Mode gelap | Dipertahankan, dengan satu pengecualian penting (lihat §1.4). |
| Bunyi klik | **Tidak ada.** |

---

## 1. Palet warna website

### 1.1 Prinsip yang mengatur segalanya

Antarmuka **tidak boleh punya warna sendiri**. Tombol, bilah, garis, dan latar
semuanya netral — kertas dan tinta. Satu-satunya warna di antarmuka adalah
**warna tingkat tempat penonton berada**, dan itu pun hanya muncul sebagai
garis tipis dan label kecil.

Alasannya: ada 30 warna biologi yang harus dikenali otomatis. Kalau tombol
berwarna toska dan bilah berwarna hijau, penonton harus belajar dua bahasa
warna sekaligus. Dengan antarmuka netral, **setiap warna yang muncul di layar
pasti punya arti biologis** — kecuali tujuh garis tingkat yang selalu tipis dan
selalu di pinggir.

### 1.2 Warna antarmuka — mode terang

```css
--latar:        #FBF9F5;  /* kertas, latar utama seluruh halaman */
--latar-lembut: #F3EFE7;  /* panggung animasi & bilah kendali */
--permukaan:    #FFFFFF;  /* kartu, baris tingkat, panel */
--garis:        #EDE6D9;  /* garis pemisah biasa */
--garis-tegas:  #DED6C7;  /* garis tombol dan bingkai */
--teks:         #1B2430;  /* tinta — juga warna tombol utama */
--teks-lembut:  #5C6878;  /* keterangan, subtitel sekunder */
--teks-samar:   #93897A;  /* label kecil, satuan, jumlah */
--teks-pudar:   #B3AA9B;  /* status "Segera", nomor pelajaran mati */
```

Tombol utama: latar `--teks` (#1B2430), tulisan putih. Tidak ada tombol berwarna.

### 1.3 Warna antarmuka — mode gelap

```css
--latar:        #11161D;
--latar-lembut: #1A212A;
--permukaan:    #1B2430;
--garis:        #2A3442;
--garis-tegas:  #3A4757;
--teks:         #E9EEF4;
--teks-lembut:  #A3B0BE;
--teks-samar:   #7B8898;
--teks-pudar:   #5E6B7A;
```

Tombol utama di mode gelap: latar `#E9EEF4`, tulisan `#11161D`.

### 1.4 Aturan mode gelap yang tidak boleh dilanggar

**Panggung animasi tetap kertas terang (`#F3EFE7`) walaupun halamannya gelap.**

Warna 30 entitas biologi dipilih dan diuji di atas latar terang. Kalau
latarnya berubah jadi hitam, mata membaca warna yang sama secara berbeda —
jingga mitokondria tampak lebih menyala, ungu inti tampak lebih gelap. Itu
merusak janji "satu bagian = satu warna".

Jadi: halaman boleh gelap, **kotak tempat animasi berjalan tidak pernah gelap.**
Tambahkan variabel khusus yang nilainya sama di kedua mode:

```css
--panggung: #F3EFE7;  /* sama persis di mode terang dan gelap */
```

### 1.5 Tujuh warna tingkat (pelangi)

Inilah tempat gambar referensi Nely hidup: strip warna jenuh dan cerah.

| Tingkat | Nama | Warna batang | Warna teks (di atas kertas) |
|---|---|---|---|
| 0 | Fondasi Sel | `#2E9E4B` | `#1F7A37` |
| 1 | Dogma Sentral | `#A8BE1E` | `#6B7A0E` |
| 2 | Genom dan Pengaturannya | `#E8A600` | `#8A6400` |
| 3 | Variasi dan Pewarisan | `#F05423` | `#B33C11` |
| 4 | Teknik Laboratorium | `#D6156B` | `#A81053` |
| 5 | Bioinformatika Dasar | `#7B2E8E` | `#6B2880` |
| 6 | Penerapan | `#1E7FC4` | `#17629A` |

**Aturan pemakaian — ketat:**

1. Hanya boleh muncul sebagai: batang tegak selebar **4 px**, bingkai baris
   yang sedang terbuka (**1,5 px**), label mono kecil (`TINGKAT 3`), titik
   penanda pada tombol kembali, dan tujuh strip pada logo.
2. **Tidak pernah** jadi latar blok besar, tidak pernah jadi warna tombol,
   tidak pernah masuk ke dalam panggung animasi.
3. Kolom "warna teks" dipakai kalau warnanya jadi tulisan — versi batang
   terlalu terang untuk dibaca di atas kertas.
4. Karena warnanya tipis dan selalu di pinggir, tidak ada satu pun yang bisa
   disangka warna organel.

### 1.6 Logo

Tujuh strip tegak berwarna pelangi (urut tingkat 0→6), tinggi bervariasi
11–20 px, lebar 3 px, jarak 2 px, sudut membulat 1,5 px — lalu kata
**Ruang Genetika** (bobot 800, jarak huruf −0,02em).

Heliks kecil yang lama dihapus. Alasannya: heliks dipakai semua orang dan
tidak mengatakan apa pun tentang situs ini. Tujuh strip mengatakan dua hal
sekaligus — "warna adalah alat belajar di sini" dan "ada tujuh tingkat".

---

## 2. Warna 30 entitas biologi — nilai baru

Ganti nilai di `src/lib/warna.ts`. **Struktur berkasnya tidak berubah**,
hanya nilai `warna` yang diganti.

### 2.1 Struktur sel (`SEL`)

| id | Nama | Lama | **Baru** |
|---|---|---|---|
| `membranSel` | Membran sel | `#2C5F8A` | **`#1565B8`** |
| `sitoplasma` | Sitoplasma | `#CFE0E8` | **`#D6EDF7`** |
| `inti` | Inti sel | `#7B4BA8` | **`#8A2FD4`** |
| `membranInti` | Membran inti | `#A585C9` | **`#B569F0`** |
| `nukleolus` | Nukleolus | `#4E2C74` | **`#5E1FA3`** |
| `kromatin` | Kromatin | `#9B6FC4` | **`#A94FE8`** |
| `mitokondria` | Mitokondria | `#E2603B` | **`#F4511E`** |
| `ribosom` | Ribosom | `#E0457B` | **`#E8197A`** |
| `reKasar` | RE kasar | `#2F8F8F` | **`#009898`** |
| `reHalus` | RE halus | `#63BFB0` | **`#2FD1B5`** |
| `golgi` | Badan Golgi | `#E0A32E` | **`#FFB300`** |
| `lisosom` | Lisosom | `#8B3A62` | **`#B01A66`** |
| `peroksisom` | Peroksisom | `#7FA650` | **`#7CB518`** |
| `vakuola` | Vakuola | `#86B8DC` | **`#5BB3F0`** |
| `sitoskeleton` | Sitoskeleton | `#94A3B3` | **`#8497A8`** |
| `sentriol` | Sentriol | `#6E5C93` | **`#6C4FD8`** |
| `kloroplas` | Kloroplas | `#4A9D5B` | **`#2EAF4B`** |
| `dindingSel` | Dinding sel | `#9C8A4E` | **`#B79318`** |

### 2.2 Basa nitrogen (`BASA`) — JANGAN DIUBAH

```
A  Adenin   #009E73
T  Timin    #D55E00
U  Urasil   #CC79A7
G  Guanin   #E69F00
C  Sitosin  #0072B2
```

Kelimanya memakai palet Okabe-Ito, palet baku yang dirancang agar tetap
terbaca oleh penyandang buta warna merah-hijau. Mencerahkannya akan
menghancurkan jaminan itu. **Biarkan apa adanya, selamanya.**

### 2.3 Molekul dan mesin sel (`MOLEKUL`)

| id | Nama | Lama | **Baru** |
|---|---|---|---|
| `dna` | DNA | `#2F6DB0` | **`#1372D6`** |
| `rna` | RNA | `#E07B39` | **`#FF8A1F`** |
| `protein` | Protein | `#5B9E4A` | **`#3DA832`** |
| `enzim` | Enzim | `#8E6BBF` | **`#9251F5`** |
| `asamAmino` | Asam amino | `#C9A227` | **`#E3AE00`** |
| `gulaFosfat` | Rangka gula-fosfat | `#7A8899` | `#7A8899` (tetap) |
| `ikatanHidrogen` | Ikatan hidrogen | `#AFBAC6` | `#AFBAC6` (tetap) |

Dua yang terakhir sengaja tetap kelabu: keduanya adalah **rangka**, bukan
tokoh. Kalau ikut dicerahkan, keduanya akan bersaing dengan basa yang
menempel di atasnya.

### 2.4 Peringatan yang harus ditindaklanjuti

Setelah dicerahkan, tiga warna jingga berdekatan:
`mitokondria #F4511E` · `RNA #FF8A1F` · `basa T #D55E00`.

Aturan pengaman:
- Mitokondria dan RNA **tidak pernah tampil menyala bersamaan** dalam satu
  adegan. Kalau satu adegan membutuhkan keduanya, salah satunya diredupkan
  seperti mekanisme `sorot` yang sudah ada.
- Basa T selalu muncul dalam konteks deret berhuruf (`A T G C`), jadi hurufnya
  sendiri sudah membedakan.
- Halaman `/peta-warna` wajib menampilkan ketiganya berdampingan agar Nely
  bisa menilai sendiri apakah jaraknya sudah cukup.

---

## 3. Keputusan 2D atau 3D

### Keputusan: **campuran, dengan 3D sebagai pengecualian yang dibatasi.**

**Aturan umum — semua ilustrasi datar berisi.** SVG datar seperti sekarang,
ditambah gradasi lembut satu warna (terang ke gelap dalam rona yang sama) dan
bayangan tipis. Terasa berisi, tapi warnanya tetap terbaca persis. Tambahan
unduhan nol.

**Pengecualian — 3D betulan, hanya di enam tempat:**

| Pelajaran | Kenapa perlu 3D |
|---|---|
| 1.1 Struktur DNA: heliks ganda | Bentuk pilinnya adalah pelajarannya |
| 0.2 Sel utuh (satu adegan penutup, bisa diputar) | Memahami sel sebagai ruang, bukan gambar |
| 0.4 Kromosom | Bentuk tiga dimensinya menjelaskan pemadatan |
| 1.6 Translasi / lipatan protein | Lipatan hanya masuk akal dalam ruang |
| 4.6 NGS dan Illumina | Susunan sel alir sulit dipahami datar |
| 6.1 CRISPR-Cas9 | Cara Cas9 mencengkeram DNA adalah soal bentuk |

**Syarat teknis untuk keenam pelajaran itu — tidak bisa ditawar:**

1. **Bahan gambarnya rata, tanpa kilau.** Pakai material tanpa pantulan
   (`MeshBasicMaterial` atau `MeshToonMaterial` dengan dua tingkat), bukan
   material mengkilap. Kilau putih adalah penyebab warna berubah.
2. **Maksimal tiga tingkat terang** untuk satu warna: warna asli, satu tingkat
   lebih terang, satu tingkat lebih gelap. Tidak ada yang mendekati putih atau
   hitam.
3. **Tanpa bayangan jatuh yang gelap.** Bayangan tipis di lantai saja.
4. Mesin 3D **dimuat hanya saat pelajaran itu dibuka** (dynamic import), tidak
   pernah ikut di halaman depan. Setelah sekali diunduh, tersimpan di HP.
5. Ada tombol "Pakai gambar datar" di pelajaran 3D untuk penonton dengan HP
   lemah, dan tampilan datar dipakai otomatis kalau perangkat menyalakan
   "kurangi gerakan".

**Alasan tidak semua 3D:** dengan 42+ pelajaran, 3D di mana-mana berarti setiap
pelajaran menguras kuota dan memanaskan HP kelas menengah — persis penonton
utama situs ini. Dan cahaya 3D mengubah warna, yang menghancurkan fondasi
ilmiah situs ini. 3D dipakai hanya ketika **bentuk ruangnya memang yang sedang
diajarkan.**

---

## 4. Jenis huruf

| Kegunaan | Huruf | Bobot |
|---|---|---|
| Judul halaman, judul pelajaran, nama tingkat | **Plus Jakarta Sans** | 700–800 |
| Isi, subtitel, keterangan | **Plus Jakarta Sans** | 400–600 |
| Deret basa (A T G C), nomor pelajaran, waktu, label kecil | **JetBrains Mono** | 400–600 |

Keduanya sudah terpasang di kode sekarang. **Tidak ada huruf baru** — setiap
huruf tambahan berarti unduhan tambahan untuk penonton berkuota terbatas.

Ukuran minimum:
- HP: isi dan subtitel **tidak pernah di bawah 13 px**; label mono minimum 9,5 px.
- Laptop: isi dan subtitel 14 px; judul pelajaran 21 px; judul halaman 26–30 px.
- Deret basa selalu `letter-spacing: 0.08em` dan `font-variant-ligatures: none`
  (sudah benar di `globals.css`, pertahankan).

---

## 5. Tiga layar utama

Rancangan visual lengkapnya ada di `Tiga Layar.dc.html`. Berikut aturannya
dalam bentuk tulisan.

### 5.1 Halaman pertama

**HP (satu layar, tanpa digulir):**
1. Bilah atas 54 px — logo kiri, tombol tiga garis kanan.
2. Blok sambutan: gambar sel 108×78 px di kiri (berdenyut pelan), di kanan
   judul dua baris + satu baris keterangan.
3. Tujuh baris tingkat, tinggi 52 px, jarak 7 px.
4. Satu baris kaki kecil: "Bebas dipakai mengajar · CC BY".

**Laptop:** sama, tetapi bilah atas memuat tiga tautan mendatar (Materi ·
Peta Warna · Tentang) dan tombol mode gelap — tanpa tombol tiga garis. Blok
sambutan mendatar, gambar sel 120×86 px. Baris tingkat memuat satu kalimat
keterangan tambahan dan jumlah pelajaran.

**Anatomi baris tingkat:** batang warna tingkat 4 px · label mono `TINGKAT n` ·
nama tingkat (700) · lencana tingkat kesulitan · jumlah pelajaran · tanda panah.

### 5.2 Layar memilih materi

**Bukan halaman baru.** Baris tingkat yang diketuk membuka isinya di tempat,
di dalam baris yang sama. Halaman tidak berpindah, posisi gulir tidak hilang.

- Baris yang terbuka: bingkai 1,5 px berwarna tingkat, label mono ikut berwarna.
- Isi: satu baris per pelajaran — nomor mono (`0.2`), judul, lalu **salah satu**:
  - sudah siap → durasi + tombol putar bulat hitam 26 px;
  - belum siap → tulisan "Segera" berwarna pudar, tidak bisa diketuk.
- Di laptop isi tersusun tiga kolom; di HP satu kolom.
- Hanya satu tingkat terbuka pada satu waktu.

### 5.3 Layar menonton

**HP, urut dari atas:**
1. Bilah atas: tombol kembali `← Nama Tingkat` (dengan titik warna tingkat) + tombol tiga garis.
2. Nomor mono + judul pelajaran.
3. **Panggung** — perbandingan 800:570, latar `--panggung`, sudut 13 px.
   Lencana nama bagian di kiri atas (titik warna + nama), penanda
   "Adegan 4 dari 13" di kanan atas.
4. **Subtitel** — kartu putih tersendiri **di bawah panggung, tidak pernah
   menimpanya.** Diagram tidak boleh tertutup teks.
5. **Bilah kendali** — garis kemajuan terbagi per adegan (bisa diketuk untuk
   melompat), lalu mundur / putar-jeda / maju, waktu, tombol subtitel, kecepatan.
6. **Sedang dibahas** — titik warna + nama Indonesia + nama Inggris.
7. Tiga laci tertutup: Pelajari lebih dalam · Daftar istilah · Rujukan.

**Laptop:** dua kolom. Kiri (lebar 660 px): panggung, subtitel, bilah kendali.
Kanan: judul pelajaran, kotak "Sedang dibahas" dengan keterangan satu kalimat,
tiga laci (Daftar istilah terbuka secara bawaan), dan di paling bawah kartu
hitam "Berikutnya" berisi pelajaran selanjutnya.

### 5.4 Kembali tanpa tersesat

Tombol kembali membawa penonton ke daftar materi **dengan tingkat itu sudah
terbuka** dan baris pelajaran yang barusan ditonton tersorot sebentar. Tombol
kembali bawaan HP melakukan hal yang sama. Tidak pernah kembali ke puncak
halaman kosong.

---

## 6. Daftar animasi

Semua memakai `ease-out` kecuali disebut lain. Prinsipnya: gerakan menjelaskan
perpindahan, bukan menghibur.

| Kapan | Apa yang bergerak | Lama |
|---|---|---|
| Halaman dibuka | Isi naik 8 px + muncul perlahan; baris tingkat menyusul berurutan 30 ms | 180 ms |
| Baris tingkat dibuka/ditutup | Tinggi membuka `cubic-bezier(.2,.8,.25,1)`; isinya muncul tertunda 60 ms | 200 ms |
| Daftar → menonton | Halaman lama geser −12 px + menghilang (140 ms); halaman baru masuk dari +12 px | 200 ms |
| Menu dibuka | Panel turun dari −8 px; lapisan gelap di belakang muncul | 180 ms |
| Menu ditutup | Kebalikannya | 140 ms |
| Terus-menerus di halaman pertama | Sel membesar 1 → 1,035 → 1 | 4,5 detik, berulang |
| Ganti adegan di panggung | Organel yang tidak dibahas meredup jadi kelabu (mekanisme `sorot` yang sudah ada) | 600 ms |
| Tombol ditekan | Mengecil ke 0,97 | 80 ms |
| Menunggu suara | Cincin kecil berputar | 900 ms, linear |

**Kalau penonton mematikan animasi di HP-nya** (`prefers-reduced-motion`):

- Semua perpindahan jadi seketika (aturan yang sudah ada di `globals.css` —
  pertahankan apa adanya).
- Denyut sel di halaman pertama **berhenti total**, bukan dipercepat.
- Peredupan organel tetap terjadi, tetapi seketika — informasinya tidak boleh
  hilang hanya karena animasi dimatikan.
- Pelajaran 3D otomatis memakai gambar datar.

---

## 7. Struktur menu

**Letak:** bilah atas tipis, menempel di puncak layar saat digulir.
Tinggi 54 px di HP, 52 px di laptop. Latar kertas, garis bawah 1 px.

**Cara membuka:**
- HP: tombol tiga garis 40×40 px di ujung kanan. Diketuk → berubah jadi tanda ×,
  panel turun dari bilah, isi halaman di belakangnya meredup 28%.
- Laptop: tidak ada tombol tiga garis. Tiga tautan tampil mendatar langsung di
  bilah, ditambah tombol mode gelap.

**Cara menutup (empat jalan):** ketuk tanda × · ketuk bagian yang meredup ·
tekan Esc · pilih salah satu isi menu.

**Isi menu — empat baris, tidak boleh bertambah:**
1. **Materi** (ikon empat strip pelangi kecil) — kembali ke daftar tingkat
2. **Peta Warna** (ikon empat kotak warna biologi) — halaman seluruh 30 warna
3. **Tentang** (ikon lingkaran)
4. *pemisah* — **Mode gelap** dengan sakelar

**Di layar menonton**, sisi kiri bilah berubah menjadi tombol kembali
`← Nama Tingkat` beserta titik warna tingkatnya. Tombol tiga garis tetap di
kanan.

---

## 8. Aturan "sedikit tulisan"

### 8.1 Batas kata yang mengikat

| Tempat | Batas |
|---|---|
| Judul halaman pertama | maksimal **10 kata** |
| Baris keterangan di halaman pertama | maksimal **8 kata**, satu baris |
| Nama tingkat | maksimal **4 kata** |
| Keterangan tingkat (hanya laptop) | maksimal **10 kata**, satu baris |
| Judul pelajaran | maksimal **8 kata** |
| Subtitel satu adegan | maksimal **45 kata**, maksimal 3 baris di HP |
| Tulisan yang terlihat di layar menonton, di luar subtitel | maksimal **25 kata** |

**Tidak ada paragraf di halaman pertama.** Halaman pertama bukan tempat
menjelaskan; halaman pertama tempat memilih.

### 8.2 Ke mana penjelasan panjang disembunyikan

Penjelasan tidak dihapus — dipindahkan ke tiga laci tertutup di bawah pemutar,
semuanya tertutup secara bawaan:

1. **Pelajari lebih dalam** — ringkasan lengkap, hal-hal yang terlalu rinci
   untuk narasi, dan catatan kalau ada perdebatan ilmiah.
2. **Daftar istilah (n)** — setiap istilah Indonesia berdampingan dengan
   padanan Inggrisnya. Aturan "istilah Inggris selalu didampingkan" dipenuhi
   di sini dan di dalam narasi.
3. **Rujukan (n)** — sumber ilmiah.

Di laptop, "Daftar istilah" terbuka secara bawaan karena ruangnya ada.

### 8.3 Batas gulir

Tidak ada halaman yang boleh melebihi **1,5 layar** gulir di HP. Kalau isinya
lebih panjang dari itu, isinya harus masuk laci — bukan memanjangkan halaman.

---

## 9. Hal lain yang sudah diputuskan

**Bunyi klik: tidak ada.** Banyak penonton membuka situs ini di kelas,
perpustakaan, atau angkutan umum. Narasi sudah mengisi telinga; bunyi tambahan
hanya mengganggu. Satu-satunya suara di situs ini adalah narasi pelajaran.

**Saat pelajaran dimuat:** gambar muncul **seketika** — animasinya digambar
oleh kode, bukan diunduh. Yang ditunggu hanya berkas suara. Selama menunggu:
adegan pertama sudah tergambar penuh, dengan cincin kecil berputar dan tulisan
"Menyiapkan suara" di sudut kanan bawah panggung. **Tidak boleh ada layar
kosong atau kotak abu-abu berdenyut.**

**Kalau jaringan putus:** tampilkan kartu "Suara belum bisa dimuat" dengan dua
tombol — "Tonton tanpa suara" (animasi + subtitel jalan penuh) dan "Coba lagi".
Pelajaran tidak pernah gagal total. Ini penting untuk penonton berkuota terbatas.

**Prioritas HP di atas laptop.** Kalau ada pilihan yang menguntungkan laptop
tapi merugikan HP, pilih yang menguntungkan HP. Sebagian besar penonton
memakai HP Android kelas menengah.

**Sasaran ukuran unduhan** halaman pertama: di bawah 150 KB termasuk huruf.
Pelajaran datar: di bawah 80 KB tambahan (di luar suara). Pelajaran 3D: mesin
3D dimuat terpisah, hanya sekali, hanya saat dibuka.

---

## 10. Daftar kerja untuk Claude Code

- [ ] `src/lib/warna.ts` — ganti 25 nilai warna sesuai §2.1 dan §2.3.
      **Jangan sentuh `BASA`.** Pertahankan seluruh struktur, tipe, dan komentar.
- [ ] `src/lib/warna.ts` (atau berkas baru `src/lib/tingkat.ts`) — tambahkan
      7 warna tingkat beserta pasangan warna teksnya (§1.5).
- [ ] `src/app/globals.css` — ganti seluruh palet antarmuka (§1.2, §1.3),
      hapus `--aksen` toska dan semua pemakaiannya, tambahkan `--panggung`
      yang nilainya sama di kedua mode (§1.4). Pertahankan blok
      `prefers-reduced-motion` yang sudah ada.
- [ ] `src/components/Kepala.tsx` — logo tujuh strip (§1.6), bilah tipis,
      menu turun di HP, tautan mendatar di laptop (§7).
- [ ] `src/app/page.tsx` — rombak total: blok sambutan kecil + tujuh baris
      tingkat yang membuka di tempat (§5.1, §5.2). Hapus tiga kotak "janji" dan
      daftar 42 pelajaran yang memanjang ke bawah.
- [ ] `src/components/PemutarPelajaran.tsx` — tombol jadi tinta (bukan toska),
      tombol kembali dengan nama tingkat, tiga laci tertutup, keadaan menunggu
      dan gagal jaringan (§5.3, §9).
- [ ] `src/animasi/SelHewan.tsx` — struktur tidak berubah; warnanya otomatis
      ikut `warna.ts`. Tambahkan gradasi lembut satu rona pada organel bervolume
      (§3, aturan umum).
- [ ] `src/app/peta-warna/page.tsx` — tampilkan tiga warna jingga berdampingan
      untuk ditinjau Nely (§2.4).
- [ ] Animasi perpindahan halaman sesuai §6.
- [ ] Komponen 3D terpisah, dimuat dinamis, hanya untuk enam pelajaran di §3.

---

## 11. Dua hal yang perlu diperiksa Nely

1. **42 atau 43 pelajaran?** `src/lib/daftar-pelajaran.ts` berisi
   5+6+6+6+7+6+7 = **43** butir, sedangkan brief menyebut 42. Perlu dipastikan
   mana yang benar sebelum angka itu ditulis di halaman depan.
2. **Durasi dan jumlah adegan** yang tertera pada rancangan ("5 mnt · 13 adegan")
   masih tebakan. Angka aslinya harus diambil dari data pelajaran.
