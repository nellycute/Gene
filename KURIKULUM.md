# Peta Kurikulum — Ruang Genetika

> Dokumen ini adalah kompas jangka panjang. **Nely yang memegang keputusan akhir** atas
> urutan, kedalaman, dan isi setiap pelajaran. Tandai apa pun yang keliru, kurang, atau
> terlalu dini muncul.
>
> Yang dikerjakan sekarang hanya **Level 0 dan Level 1**. Sisanya sengaja ditulis lebih
> dulu agar setiap pelajaran awal tahu ke mana ia bermuara.

## Cara membaca

Setiap pelajaran punya label tingkat: **Dasar** (bisa diikuti siswa SMA) · **Menengah**
(mahasiswa S1 awal) · **Lanjut** (S1 akhir dan ke atas). Pelajaran Dasar tidak menuntut
prasyarat apa pun.

Kolom "Inti visual" adalah animasi utama yang akan dibuat — ini yang membedakan pelajaran
di sini dari sekadar membaca buku.

---

## Level 0 — Fondasi Sel `Dasar`

Tujuan: penonton paham di mana materi genetik itu *berada* secara fisik, sebelum belajar
bagaimana ia bekerja.

| # | Pelajaran | Inti visual |
|---|---|---|
| 0.1 | Sel: unit terkecil kehidupan, dan mengapa genetika dimulai dari sini | Perbesaran bertahap: tubuh → jaringan → satu sel → inti → benang DNA |
| 0.2 | **Bagian-bagian sel dan fungsinya** *(pelajaran pilot)* | Satu sel utuh; tiap organel menyala bergantian dengan warna tetapnya |
| 0.3 | Inti sel: membran inti, kromatin, nukleolus | Potongan melintang inti; pori inti (nuclear pore) sebagai gerbang keluar-masuk |
| 0.4 | Kromosom, kariotipe, diploid vs haploid | Kromatin longgar memadat jadi kromosom; 46 kromosom manusia berbaris jadi kariotipe |
| 0.5 | Mitosis dan meiosis | Dua jalur berdampingan; pindah silang (crossing over) terlihat sebagai tukar warna |

**Catatan untuk ditinjau Nely:** apakah 0.4 dan 0.5 sebaiknya ditukar urutannya? Dan
apakah pindah silang terlalu dini di Level 0, atau justru pas karena visualnya kuat?

---

## Level 1 — Dogma Sentral `Dasar → Menengah`

Tujuan: penonton bisa menceritakan sendiri perjalanan dari DNA sampai protein jadi.

| # | Pelajaran | Inti visual |
|---|---|---|
| 1.1 | Struktur DNA: basa, gula, fosfat, heliks ganda | Heliks berputar; zoom ke pasangan basa A–T (2 ikatan hidrogen) dan G–C (3 ikatan) |
| 1.2 | RNA dan bedanya dengan DNA | DNA dan RNA berdampingan: urasil vs timin, ribosa vs deoksiribosa, untai tunggal vs ganda |
| 1.3 | Replikasi DNA | Garpu replikasi (replication fork): untai maju vs untai lambat, fragmen Okazaki |
| 1.4 | Transkripsi dan penyuntingan RNA | RNA polimerase berjalan di sepanjang gen; intron terpotong, ekson tersambung |
| 1.5 | Kode genetik dan kodon | Tabel kodon interaktif — klik tiga basa, lihat asam aminonya |
| 1.6 | Translasi: dari mRNA jadi protein | Ribosom bergerak kodon demi kodon; tRNA datang-pergi; rantai asam amino memanjang |

**Interaktif yang direncanakan di level ini:**
- *Simulator transkripsi* — geser RNA polimerase sendiri, lihat mRNA terbentuk basa demi basa
- *Ubah satu basa* — ganti satu nukleotida, lihat akibatnya pada protein (diam / salah makna / tanpa makna)

**Catatan untuk ditinjau Nely:** haruskah penyuntingan RNA (splicing) dipisah jadi pelajaran
sendiri? Ia sering jadi titik kebingungan mahasiswa, dan visualnya sangat kaya.

---

## Level 2 — Genom dan Pengaturannya `Menengah`

| # | Pelajaran |
|---|---|
| 2.1 | Gen vs genom: apa isi 3 miliar pasang basa manusia |
| 2.2 | Bagian genom yang tidak menyandi protein — dan mengapa ia bukan "sampah" |
| 2.3 | Pengaturan ekspresi gen: promotor, enhancer, faktor transkripsi |
| 2.4 | Operon pada bakteri (lac operon) sebagai model paling jernih |
| 2.5 | Epigenetik: metilasi DNA dan modifikasi histon |
| 2.6 | Mengapa sel otot dan sel saraf berbeda padahal DNA-nya sama |

## Level 3 — Variasi dan Pewarisan `Menengah`

| # | Pelajaran |
|---|---|
| 3.1 | Mutasi: jenis, sebab, dan akibatnya |
| 3.2 | Perbaikan DNA (DNA repair) dan apa yang terjadi saat ia gagal |
| 3.3 | Hukum Mendel dan mengapa ia masih relevan |
| 3.4 | Membaca silsilah keluarga (pedigree) |
| 3.5 | Pewarisan yang tidak sesederhana Mendel: dominansi tak penuh, poligenik, pautan seks |
| 3.6 | Genetika populasi: Hardy-Weinberg, hanyutan genetik, seleksi |

## Level 4 — Teknik Laboratorium `Menengah → Lanjut`

> Inilah celah yang hampir kosong dalam bahasa Indonesia. Bagian paling bernilai dari
> seluruh project ini.

| # | Pelajaran |
|---|---|
| 4.1 | Ekstraksi DNA: dari jaringan sampai tabung |
| 4.2 | PCR: melipatgandakan satu potong DNA jadi jutaan |
| 4.3 | Elektroforesis gel: memisahkan DNA berdasarkan ukuran |
| 4.4 | Kloning DNA, plasmid, dan enzim restriksi |
| 4.5 | Sekuensing Sanger: metode klasik yang masih jadi baku emas |
| 4.6 | NGS / Illumina: sekuensing generasi baru, sintesis sambil membaca |
| 4.7 | Nanopore dan PacBio: membaca untai panjang |

## Level 5 — Bioinformatika Dasar `Lanjut`

| # | Pelajaran |
|---|---|
| 5.1 | Bentuk data genetik: FASTA dan FASTQ, dan arti skor mutunya |
| 5.2 | Penjajaran urutan (sequence alignment): global vs lokal |
| 5.3 | BLAST: mencari kemiripan di seluruh basis data dunia |
| 5.4 | Pemetaan bacaan ke genom rujukan (read mapping) |
| 5.5 | Pemanggilan varian (variant calling): dari tumpukan bacaan jadi daftar mutasi |
| 5.6 | Membaca dan menafsirkan hasil: VCF, anotasi, dan jebakannya |

## Level 6 — Aplikasi `Lanjut`

| # | Pelajaran |
|---|---|
| 6.1 | CRISPR-Cas9: cara kerja, ketepatan, dan batasnya |
| 6.2 | Terapi gen: janji, kegagalan, dan keadaan hari ini |
| 6.3 | Genetika forensik: profil DNA dan bagaimana ia dibaca di pengadilan |
| 6.4 | Farmakogenomik: mengapa obat yang sama berbeda efeknya pada tiap orang |
| 6.5 | GWAS: mencari kaitan antara varian dan penyakit |
| 6.6 | Tes genetik langsung ke konsumen: apa yang sebenarnya diukur |
| 6.7 | Etika: privasi data genetik, diskriminasi, dan batas yang perlu dijaga |

---

## Aturan mutu yang berlaku di semua pelajaran

1. **Setiap istilah teknis muncul dengan padanan Inggrisnya** pada kemunculan pertama —
   contoh: "penyalinan (transkripsi, *transcription*)". Mahasiswa harus siap membaca jurnal.
2. **Setiap pelajaran mencantumkan rujukan** dan tanggal tinjauan terakhir.
3. **Tidak ada gambar dari buku teks atau jurnal.** Semua diagram digambar dari nol.
4. **Warna setiap entitas biologi tetap sama di seluruh level.** Mitokondria di pelajaran 0.2
   berwarna sama persis dengan mitokondria di pelajaran 6.4.
5. **Tidak ada klaim medis.** Materi yang menyentuh penyakit dan tes genetik diberi
   pengingat bahwa ini bahan belajar, bukan nasihat medis.
6. **Naskah tidak terbit sebelum Nely mengoreksi akurasinya.**
