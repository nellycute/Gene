# Keputusan Desain — Ruang Genetika

> Berkas ini adalah hasil akhir brainstorming desain bersama Nely.
> Serahkan seluruh isinya ke Claude Code sebagai acuan membangun.
> Rancangan visualnya ada di berkas `Tiga Layar.dc.html` (buka di browser).
>
> Semua keputusan di bawah ini **sudah disetujui Nely**. Kalau ada yang
> bertentangan dengan kode yang ada sekarang, yang di bawah ini yang menang.
>
> **Diubah 23 September 2026** — setelah Nely meninjau website sementara, ia
> memilih: gambar benda bergaya **3D bergaris** (§3) dan layar menonton
> **"layar bioskop"** tanpa gulir (§5.3, §8.2, §8.3). Bagian yang berubah
> ditandai *(diubah 23 Sep 2026)*.
>
> **Diubah 25 September 2026** — Nely kecewa tampilannya "polos banget": sisi
> halaman kosong. Ia meminta **hiasan latar samar bernuansa genetika** di bawah
> semua menu, **sorotan lembut** pada tulisan tebal, dan di laptop **video ¾
> layar + Catatan ¼ di kanannya** (§1.1, §1.5, §5.3). Ditandai *(25 Sep 2026)*.

---

## 0. Ringkasan keputusan dalam satu layar

| Hal | Keputusan |
|---|---|
| Warna halaman | Kertas krem tenang. Antarmuka **tanpa warna** — hitam tinta. Pelangi hanya sebagai penanda tingkat. *(25 Sep 2026)* Ditambah hiasan latar samar bernuansa genetika dan stabilo lembut pada tulisan tebal — warnanya tetap warna entitas atau warna tingkat. |
| Warna biologi | **Dicerahkan** dari palet lama. 5 basa nitrogen **tidak diubah**. |
| Ilustrasi *(diubah 23 Sep 2026)* | Semua gambar benda (sel, organel, kromosom, DNA) **3D bergaris** seperti ilustrasi buku ajar. Diagram (Punnett, silsilah, grafik) tetap datar. |
| Layar menonton *(diubah 23 Sep 2026)* | **Layar bioskop**: judul, panggung, subtitel, kendali — tidak pernah digulir. Tulisan panjang di **Catatan**. *(25 Sep 2026)* Laptop: video ¾ layar, Catatan ¼ di kanannya, terbuka sejak awal. HP: Catatan hanya saat diminta. |
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

**Hiasan dan sorotan *(25 Sep 2026, permintaan Nely)*.** Halaman tidak lagi
polos, tetapi janji di atas tetap dijaga:
- **Hiasan latar** (`src/components/LatarGenetika.tsx`): gambar kecil bergaris
  tipis — heliks DNA, sepasang kromosom, sel, mitokondria, RNA, silsilah, kotak
  Punnett, nukleosom, kariotipe — diulang seperti kertas dinding di bawah semua
  menu dan kartu, **samar** (opasitas 0,2; mode gelap 0,13). Tiap benda memakai
  **warna tetapnya sendiri** dari `warna.ts`; silsilah dan Punnett bertinta.
  Dibuat dengan kode, bukan gambar dari internet. Heliksnya putar kanan.
- **Stabilo lembut** pada tulisan tebal (judul pelajaran, tab Catatan yang
  terbuka, nomor Ringkasan, nama istilah, adegan yang sedang diputar di Naskah):
  warna tipis seperti stabilo, **tidak mencolok**. Istilah organel/molekul
  memakai warna entitasnya ("Mitokondria" jingga, "Membran sel" biru); selain
  itu warna tingkat pelajaran.
- Gambar hiasan buatan AI (Higgsfield) boleh dipakai **hanya sebagai hiasan
  pinggir halaman depan**, tidak pernah sebagai gambar materi — gambar materi
  tetap dibuat dengan kode agar akurat.

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
   tidak pernah masuk ke dalam panggung animasi. *(25 Sep 2026)* Kecuali
   sebagai stabilo lembut (± 20–30%, bukan warna penuh) pada tulisan tebal —
   lihat §1.1.
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

## 3. Keputusan 2D atau 3D *(diubah 23 Sep 2026)*

### Keputusan: **semua gambar benda bergaya "3D bergaris".**

Nely menilai gambar datar kurang hidup dan memberi tiga gambar rujukan: sel yang
dibelah sehingga isinya terlihat, organel bervolume, warna jenuh. Ia
membandingkan tiga contoh sel hewan terbelah — "3D lembut" (seperti render),
"3D bergaris" (seperti ilustrasi vektor buku ajar), dan gambar datar lama — lalu
memilih **3D bergaris**, yang paling dekat dengan `Gambar referensi.jpg`.
Keputusan lama ("datar di mana-mana, 3D hanya di enam pelajaran") tidak berlaku lagi.

**Yang digambar 3D:** semua benda yang punya bentuk — sel, organel, inti,
kromosom, DNA, protein, gamet. **Yang tetap datar:** diagram yang memang datar —
papan Punnett, silsilah, grafik, garis waktu, tabel kode genetik.

**Tidak ada gambar dari internet.** Model dibangun dari nol dengan kode (three.js).
Gambar dan model dari Google berhak cipta, warnanya tidak sama dengan Peta Warna,
dan bagian-bagiannya tidak bisa disorot satu per satu.

**Syarat teknis — tidak bisa ditawar:**

1. **Bahan toon tanpa kilau, tiga tingkat terang** (`MeshToonMaterial` dengan
   peta gradasi tiga langkah): gelap, tengah, terang. Tingkat paling terang =
   warna asli dari `warna.ts`, jadi warnanya tetap terbaca persis.
2. **Garis tepi gelap satu rona** — warna entitas itu sendiri yang digelapkan,
   bukan hitam. Bagian pipih dan butiran kecil tanpa garis.
3. **Bayangan jatuh tipis saja**, tidak pernah menghitamkan warna entitas.
4. Mesin 3D **dimuat hanya di halaman pelajaran** (dynamic import), tidak pernah
   ikut di halaman depan. Setelah sekali diunduh, tersimpan di HP.
5. **Hanya 3D** *(diubah 25 Sep 2026)*. Tombol "Pakai gambar datar" dihapus atas
   permintaan Nely — di dalam video tidak boleh ada pilihan atau tulisan selain
   label bagian. Kembaran datar tetap dibuat, tetapi hanya muncul otomatis di
   peramban yang sama sekali tidak bisa menggambar 3D (tanpa WebGL). "Kurangi
   gerakan" di perangkat tetap 3D; kameranya saja yang diam.
6. **Sorot bekerja sama seperti gambar datar:** bagian yang tidak dibahas memudar
   kelabu tembus pandang. Kamera bergeser pelan mendekati bagian yang dibahas;
   begitu penonton **menyeret** gambar, kamera berhenti sampai isyarat berikutnya.
   Klik atau ketukan (putar/jeda) tidak menghentikan kamera.

**Film, bukan salindia** *(24 Sep 2026)*. Nely menolak gambar yang hanya berganti
per adegan "seperti slide show PPT". Maka setiap pelajaran Tingkat 0 kini satu
film 3D yang terus bergerak: kamera berputar atau berayun pelan tanpa henti,
menyelam ke skala berikutnya saat berpindah set (tubuh → jaringan → sel → inti →
DNA), dan peristiwanya benar-benar terjadi di layar (sel membelah, kromatin
memadat, kromosom disalin, pindah silang bertukar warna). Perubahan gambar
dipicu **kata di narasi** (isyarat), bukan pergantian adegan — begitu kata
"mitokondria" diucapkan, kamera menuju mitokondria.

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
2. Blok sambutan: **bola sel 3D yang melayang** di kiri (84 px, laptop 104 px;
   gambar diam 23 KB yang sama dengan ikon aplikasi, bayangannya mengecil saat
   sel naik — 25 Sep 2026), di kanan judul dua baris + satu baris keterangan.
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
  - sudah siap → tombol putar bulat hitam 26 px, **tanpa keterangan durasi**
    (Nely, 25 Sep 2026);
  - belum siap → tulisan "Segera" berwarna pudar, tidak bisa diketuk.
- Di laptop isi tersusun tiga kolom; di HP satu kolom.
- Hanya satu tingkat terbuka pada satu waktu.

### 5.3 Layar menonton — "layar bioskop" *(diubah 23 Sep 2026)*

Nely menolak kolom teks yang memanjang ke bawah (laci di kolom kanan): menggulir
memalingkan mata dari video. Aturannya sekarang: **layar menonton tidak pernah
digulir**, di HP maupun laptop. Kaki halaman disembunyikan di layar ini.

**Urut dari atas, satu kolom (HP dan laptop sama):**
1. Bilah atas: tombol kembali `← Nama Tingkat` (dengan titik warna tingkat).
2. **Satu baris judul**: nomor mono + judul pelajaran (terpotong kalau kepanjangan)
   + lencana "Draf" kalau belum ditinjau. Tanpa jumlah adegan dan durasi.
3. **Panggung** — perbandingan 800:570, latar `--panggung`, sudut 13 px. Lebarnya
   sebesar yang masih muat dalam tinggi layar. *(25 Sep 2026)* Di laptop panggung
   selebar kolom video (¾ layar) dan setinggi yang muat di layar — bingkainya
   **melebar**, paling lebar 2,6 : 1; gambar 3D menyesuaikan diri, isinya tetap
   sebesar semula. Di HP tetap 800:570. **Satu-satunya tulisan di dalam
   video:** lencana kiri atas berisi bagian yang sedang dibahas (titik warna +
   nama Indonesia + nama Inggris), tetap tampil selama bagian itu dibahas —
   dipilih Nely 25 Sep 2026. Nomor adegan ("4/13"), tombol gambar datar,
   petunjuk "Seret untuk memutar", dan tulisan "memuat" **dihapus** (25 Sep 2026):
   penonton harus bisa melihat videonya penuh.
4. **Subtitel** — kartu tersendiri **di bawah panggung, tidak pernah menimpanya.**
   Tampil **sepotong-sepotong** (satu kalimat atau setengah kalimat, ≤ 110 huruf)
   mengikuti waktu, seperti subtitel film.
5. **Bilah kendali, seperti YouTube** *(25 Sep 2026)* — **satu garis waktu utuh**
   selebar video di baris teratas (bukan lagi garis putus-putus per adegan;
   diketuk untuk melompat, digeser untuk mencari), lalu mundur / putar-jeda /
   maju bagian, waktu berjalan, CC, **tombol suara** (hitam = menyala), kecepatan,
   **tombol layar penuh**, dan tombol **Catatan**.

**Kendali ala YouTube** *(25 Sep 2026)*: spasi atau `k` = putar/jeda di mana pun
di halaman (tanpa harus mengeklik pemutar dulu); panah kiri/kanan = ±5 detik;
`j`/`l` = ±10 detik; `m` = suara; `c` = subtitel; `f` = layar penuh. Laptop: klik
sekali di video = putar/jeda, klik dua kali = layar penuh. HP: **ketuk dua kali**
di video = putar/jeda; satu ketukan hanya memunculkan kendali (di layar penuh).
Menyeret video tetap memutar gambar 3D.

**Layar penuh:** video sebesar layar — layar mendatar terisi penuh tanpa pita
gelap *(25 Sep 2026)*, layar tegak tetap 800:570 dengan latar gelap di atas dan
bawahnya (panggungnya tetap kertas); subtitel dan kendali melayang di bawah — satu-satunya
tempat subtitel boleh menimpa video — dan kendali menghilang sendiri setelah ±2,6
detik tanpa gerakan saat video berjalan. HP Android dimiringkan otomatis. iPhone
tidak mengizinkan layar penuh selain untuk berkas video, jadi di sana pemutar
menutup seluruh layar peramban.

**Catatan** berisi empat tab: Istilah · Ringkasan · Naskah (seluruh narasi,
adegan yang sedang diputar ditandai, bisa diketuk untuk melompat) · Rujukan.
- Laptop *(diubah 25 Sep 2026)*: **panel ¼ layar di kanan video** (paling sempit
  312 px), setinggi kolom video, **terbuka sejak halaman dibuka** — video ¾ layar.
  Bisa ditutup (×, Esc, tombol Catatan); video lalu di tengah. Terbuka sendiri
  tidak merebut fokus, jadi spasi tetap memutar/menjeda. Tersembunyi selama
  layar penuh.
- HP: **lembar dari bawah** (≤ 58% tinggi layar); panggung tetap terlihat di
  atasnya; pelajaran dijeda karena subtitel dan tombol tertutup.
- Isi Catatan digulir di dalam kotaknya sendiri. Ditutup dengan ×, Esc, atau
  mengetuk di luar lembar.

**Berikutnya** muncul di kartu "Pelajaran selesai" di atas panggung, bersama
tombol Putar ulang.

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
| Ganti adegan, gambar 3D | Kamera bergeser pelan mendekati bagian yang dibahas, lalu berayun ± 11° | ± 1,5 detik; ayunan 18 detik |
| Ganti potongan subtitel | Potongan baru muncul perlahan | 180 ms |
| Catatan dibuka | Laptop: panel masuk dari kanan +12 px. HP: lembar naik dari bawah +24 px, latar meredup 18% | 200 ms |
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
| Subtitel satu adegan | maksimal **45 kata** (panduan menulis). Di layar tampil sepotong-sepotong ≤ 110 huruf, jadi tidak pernah lebih dari 3 baris di HP |
| Tulisan yang terlihat di layar menonton, di luar subtitel | maksimal **25 kata** |

**Tidak ada paragraf di halaman pertama.** Halaman pertama bukan tempat
menjelaskan; halaman pertama tempat memilih.

### 8.2 Ke mana penjelasan panjang disembunyikan *(diubah 23 Sep 2026)*

Penjelasan tidak dihapus — dipindahkan ke **Catatan** (§5.3): di HP hanya
muncul saat tombolnya diketuk; di laptop terbuka sejak awal di kanan video
*(25 Sep 2026)*. Empat tab:

1. **Istilah (n)** — tab yang terbuka pertama. Setiap istilah Indonesia
   berdampingan dengan padanan Inggrisnya. Aturan "istilah Inggris selalu
   didampingkan" dipenuhi di sini dan di dalam narasi.
2. **Ringkasan** — poin kunci (dulu "Pelajari lebih dalam"), hal-hal yang terlalu
   rinci untuk narasi, dan catatan kalau ada perdebatan ilmiah.
3. **Naskah** — seluruh narasi pelajaran; juga tempat Nely membaca ulang naskah
   saat meninjau.
4. **Rujukan (n)** — sumber ilmiah, tanggal tinjauan, pengingat "bahan belajar,
   bukan nasihat medis", dan lisensi.

### 8.3 Batas gulir *(diubah 23 Sep 2026)*

**Layar menonton: nol gulir.** Halaman lain tidak boleh melebihi **1,5 layar**
gulir di HP. Kalau isinya lebih panjang dari itu, isinya harus masuk Catatan —
bukan memanjangkan halaman.

---

## 9. Hal lain yang sudah diputuskan

**Bunyi klik: tidak ada.** Banyak penonton membuka situs ini di kelas,
perpustakaan, atau angkutan umum. Narasi sudah mengisi telinga; bunyi tambahan
hanya mengganggu. Satu-satunya suara di situs ini adalah narasi pelajaran.

**Tidak ada tampilan "memuat"** *(diubah 25 Sep 2026)*. Nely tidak mau ada
tulisan seperti "Menyiapkan suara". Maka: suara adegan ini dan dua adegan
berikutnya diunduh lebih dulu; awal kalimat boleh ditunggu paling lama 0,3 detik;
lebih dari itu video jalan terus dan suaranya menyusul ke titik yang sama. Saat
mesin 3D pertama kali diunduh (± 1–3 detik di HP), panggung tampil polos tanpa
tulisan apa pun.

**Kalau jaringan putus:** tidak ada kartu peringatan. Adegan yang suaranya gagal
dimuat tetap berjalan dengan gambar dan subtitel; adegan berikutnya mencoba
suaranya sendiri. Pelajaran tidak pernah gagal total — penting untuk penonton
berkuota terbatas.

**Ikon aplikasi** *(25 Sep 2026)*: "Tambahkan ke layar utama" memasang ikon **bola
sel yang melayang** — sel hewan berbentuk bola, diiris seperdelapan sehingga inti
dan organelnya tampak, di atas bayangan lembut dan latar kertas. Digambar dari
model 3D sendiri (`model-bola-sel.ts`), bukan gambar internet. Dibuka dari ikon
itu, website tampil penuh seperti aplikasi (tanpa kolom alamat).

**Narasi suara** *(24 Sep 2026, sementara)*: suara perempuan mesin Edge TTS
("Gadis", bahasa Indonesia), dipilih Nely sampai ada pengisi suara. Suara,
subtitel, dan gambar **serempak per kata**: potongan subtitel tampil saat kata
pertamanya diucapkan, dan isyarat gambar jatuh tepat pada kata kuncinya. Lama
adegan mengikuti rekamannya (setengah detik jeda sebelum, ± 1,8 detik hening
sesudah). Padanan Inggris dalam kurung **tidak dibacakan** — suara Indonesia
akan melafalkannya salah — tetapi tetap tertulis di subtitel. Pindah tab atau
layar HP terkunci menjeda pelajaran, agar suara tidak berjalan tanpa gambarnya.

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
