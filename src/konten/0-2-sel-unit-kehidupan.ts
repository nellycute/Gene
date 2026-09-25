import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.2 — Sel, unit terkecil kehidupan (dulu 0.1)
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu perjalanan 3D memperbesar (PerjalananSel3D). `isyarat` membuat
 * kamera dan sorotan berubah tepat saat kata kuncinya tampil di subtitel.
 * 25 Sep 2026: ditambah adegan Hooke 1665 (irisan gabus) dan nama-nama teori sel;
 * dikoreksi menurut pemeriksaan fakta (kulit terluar = sel mati, DNA prokariot
 * tidak "mengambang bebas", sel darah merah tidak berinti).
 */

export const selUnitKehidupan: Pelajaran = {
  slug: "sel-unit-terkecil-kehidupan",
  nomor: "0.2",
  level: 0,
  judul: "Sel, unit terkecil kehidupan",
  ringkas:
    "Memperbesar satu titik di kulit lenganmu terus-menerus — dari tubuh, jaringan, sel, inti, sampai bertemu DNA — dan mengapa seluruh genetika dimulai dari sini.",
  tingkat: "Dasar",
  animasi: "perbesaran",

  adegan: [
    {
      id: "pembuka",
      tajuk: "Tiga puluh tujuh triliun",
      tahap: "tubuh",
      durasi: 24,
      sorot: [],
      isyarat: [{ kata: "kulit lenganmu", fokus: "lengan", label: "Satu titik di kulit lengan" }],
      narasi:
        "Tubuhmu tersusun dari sekitar tiga puluh tujuh triliun sel. Angka itu terlalu besar untuk dibayangkan — jadi mari kita perbesar satu titik saja di kulit lenganmu, terus-menerus, sampai bertemu benda yang menjadi pokok seluruh pelajaran genetika.",
    },
    {
      id: "jaringan",
      tajuk: "Jaringan",
      tahap: "jaringan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "seperti ubin", sorot: ["membranSel"] },
        { kata: "Setiap ubin", fokus: "ubin", sorot: ["membranSel", "inti"] },
        { kata: "lengkap dengan intinya", fokus: "ubin", sorot: ["inti"] },
      ],
      narasi:
        "Diperbesar seratus kali, kulit ternyata bukan lembaran polos. Di bawah lapisan terluarnya — sel-sel mati yang terus mengelupas — sel-sel hidup berjajar rapat seperti ubin: inilah jaringan (tissue). Setiap ubin adalah satu sel, lengkap dengan intinya sendiri.",
    },
    {
      id: "sel",
      tajuk: "Satu sel",
      tahap: "sel",
      durasi: 25,
      sorot: [],
      isyarat: [
        { kata: "bernapas", fokus: "mitokondria", sorot: ["mitokondria"] },
        { kata: "membuang sampah", fokus: "lisosom", sorot: ["lisosom"] },
        { kata: "membelah diri", fokus: "utuh", sorot: [] },
      ],
      narasi:
        "Kita perbesar lagi, dan satu ubin itu menjadi ini: sebuah sel (cell), unit terkecil yang masih bisa disebut hidup. Ia bernapas, mengolah makanan, membuang sampah, dan pada waktunya membelah diri. Lebarnya sekitar dua puluh mikrometer.",
    },
    {
      id: "gabus",
      tajuk: "1665 · Sel pertama",
      tahap: "gabus",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Robert Hooke", fokus: "utuh", label: "1665 · Robert Hooke" },
        { kata: "dinding sel mati", fokus: "dekat", sorot: ["dindingSel"], label: "Hanya dinding sel yang tersisa" },
      ],
      narasi:
        "Sel pertama kali terlihat tahun 1665. Robert Hooke mengiris gabus dan melihat ruang-ruang kecil seperti kamar biara — ia menamainya sel. Yang ia lihat sebenarnya dinding sel mati (cell wall); isinya sudah lama hilang.",
    },
    {
      id: "teori-sel",
      tajuk: "Teori sel",
      tahap: "dua-sel",
      durasi: 27,
      sorot: ["membranSel", "inti"],
      isyarat: [
        { kata: "Schleiden", label: "1838–1839 · Schleiden dan Schwann" },
        { kata: "Rudolf Virchow", label: "1855 · Virchow" },
        { kata: "setiap sel berasal dari sel", fokus: "membelah", label: "Sel berasal dari sel" },
      ],
      narasi:
        "Hampir dua abad kemudian, Matthias Schleiden (1838) dan Theodor Schwann (1839) menyimpulkan: tumbuhan dan hewan tersusun dari sel. Tahun 1855, Rudolf Virchow menegaskan: setiap sel berasal dari sel yang sudah ada. Itulah teori sel (cell theory).",
    },
    {
      id: "prokariot",
      tajuk: "Dua rancangan sel",
      tahap: "prokariot",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "Sel bakteri", fokus: "bakteri", sorot: ["dindingSel", "kromatin", "membranSel"], label: "Bakteri · prokariot" },
        { kata: "tidak terbungkus membran", fokus: "bakteri", sorot: ["kromatin"], label: "DNA tanpa inti bermembran" },
        {
          kata: "Sel hewan, tumbuhan",
          fokus: "eukariot",
          sorot: ["inti", "membranInti", "kromatin", "nukleolus"],
          label: "Sel hewan · eukariot",
        },
      ],
      narasi:
        "Ada dua rancangan dasar sel. Sel bakteri disebut prokariot (prokaryote): kecil, dan DNA-nya tidak terbungkus membran, berkumpul begitu saja di sitoplasma. Sel hewan, tumbuhan, dan jamur disebut eukariot (eukaryote): DNA-nya tersimpan rapi di dalam inti bermembran.",
    },
    {
      id: "skala",
      tajuk: "Seberapa kecil?",
      tahap: "skala",
      durasi: 25,
      sorot: [],
      isyarat: [
        { kata: "Bakteri sekitar", fokus: "bakteri", label: "Bakteri · 2 µm" },
        { kata: "Sel darah merah", fokus: "darahMerah", label: "Sel darah merah · 8 µm" },
        { kata: "Sel hewan pada umumnya", fokus: "selHewan", label: "Sel hewan · 20 µm" },
        { kata: "Sehelai rambut", fokus: "rambut", label: "Tebal rambut · 80 µm" },
        { kata: "empat sel hewan berjajar", fokus: "empatSel", label: "Empat sel hewan = tebal rambut" },
      ],
      narasi:
        "Seberapa kecil? Bakteri sekitar dua mikrometer. Sel darah merah delapan. Sel hewan pada umumnya dua puluh. Sehelai rambut, yang sudah terasa tipis, tebalnya delapan puluh mikrometer — artinya empat sel hewan berjajar.",
    },
    {
      id: "inti",
      tajuk: "Masuk ke inti",
      tahap: "inti",
      durasi: 25,
      sorot: ["inti", "membranInti", "kromatin", "nukleolus"],
      isyarat: [
        { kata: "membran ganda", fokus: "membranInti", sorot: ["membranInti"] },
        { kata: "benang-benang kusut", fokus: "kromatin", sorot: ["kromatin"] },
      ],
      narasi:
        "Sekarang masuk ke dalam sel, menuju bulatan ungu di tengahnya: inti sel (nucleus). Di dalam inilah tersimpan hampir seluruh DNA-mu, terlindung membran ganda, dan berbentuk benang-benang kusut yang disebut kromatin (chromatin).",
    },
    {
      id: "dna",
      tajuk: "DNA",
      tahap: "dna",
      durasi: 26,
      sorot: ["basaA", "basaT", "basaG", "basaC", "gulaFosfat"],
      isyarat: [
        { kata: "Dua untai berpilin", sorot: ["gulaFosfat"] },
        { kata: "adenin", sorot: ["basaA"] },
        { kata: "timin", sorot: ["basaT"] },
        { kata: "guanin", sorot: ["basaG"] },
        { kata: "sitosin", sorot: ["basaC"] },
        { kata: "Urutan keempat huruf", sorot: ["basaA", "basaT", "basaG", "basaC"] },
      ],
      narasi:
        "Perbesar satu benang itu ribuan kali lagi, dan inilah yang tampak: DNA. Dua untai berpilin, disatukan pasangan basa berwarna — adenin, timin, guanin, sitosin. Urutan keempat huruf inilah instruksi lengkap untuk membangun dan menjalankan tubuhmu.",
    },
    {
      id: "penutup",
      tajuk: "Dari sinilah genetika dimulai",
      tahap: "sel",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "tiga puluh tujuh triliun itu", tahap: "tubuh", fokus: "utuh", label: "± 37 triliun sel" },
        { kata: "Perjalanan kita dimulai dari sel", tahap: "sel", fokus: "utuh" },
      ],
      narasi:
        "Dan yang menakjubkan: dari tiga puluh tujuh triliun itu, hampir setiap sel yang berinti membawa salinan DNA yang sama. Genetika adalah ilmu tentang instruksi ini — cara ia disimpan, disalin, dibaca, diwariskan, dan berubah. Perjalanan kita dimulai dari sel.",
    },
  ],

  poinKunci: [
    "Sel adalah unit terkecil yang masih bisa disebut hidup: bernapas, mengolah makanan, membuang sampah, dan membelah diri.",
    "Hooke melihat dan menamai sel pada 1665 (dinding sel gabus). Teori sel: semua makhluk hidup tersusun dari sel (Schleiden 1838, Schwann 1839), dan setiap sel berasal dari sel yang sudah ada (Virchow 1855).",
    "Prokariot (bakteri) tidak punya inti bermembran; DNA-nya berkumpul di sitoplasma. Eukariot (hewan, tumbuhan, jamur) menyimpan DNA di dalam inti bermembran.",
    "Sel hewan berukuran sekitar 20 mikrometer — seperempat tebal sehelai rambut.",
    "Hampir setiap sel tubuh yang berinti membawa salinan DNA yang sama (sel darah merah dewasa tidak berinti); genetika adalah ilmu tentang instruksi itu.",
  ],

  istilah: [
    { id: "Sel", en: "cell", arti: "Unit terkecil yang masih menunjukkan ciri hidup." },
    { id: "Jaringan", en: "tissue", arti: "Kumpulan sel sejenis yang bekerja bersama." },
    { id: "Dinding sel", en: "cell wall", arti: "Lapisan kaku di luar membran sel pada tumbuhan, jamur, dan kebanyakan bakteri." },
    { id: "Teori sel", en: "cell theory", arti: "Semua makhluk hidup tersusun dari sel, dan setiap sel berasal dari sel yang sudah ada." },
    { id: "Prokariot", en: "prokaryote", arti: "Sel tanpa inti bermembran; DNA-nya berkumpul di sitoplasma. Contoh: bakteri." },
    { id: "Eukariot", en: "eukaryote", arti: "Sel yang menyimpan DNA di dalam inti bermembran. Contoh: sel hewan dan tumbuhan." },
    { id: "Mikrometer", en: "micrometre (µm)", arti: "Seperseribu milimeter — satuan ukuran sel." },
    { id: "Inti sel", en: "nucleus", arti: "Organel bermembran ganda tempat DNA disimpan." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein, tampak seperti benang kusut." },
    { id: "DNA", en: "deoxyribonucleic acid", arti: "Molekul pembawa instruksi genetik, berbentuk heliks ganda." },
    { id: "Basa nitrogen", en: "nitrogenous base", arti: "Empat 'huruf' DNA: adenin, timin, guanin, sitosin." },
  ],

  rujukan: [
    { teks: "Bianconi E, dkk. An estimation of the number of cells in the human body. Ann Hum Biol. 2013;40(6):463-471." },
    { teks: "Encyclopaedia Britannica — Cell theory.", url: "https://www.britannica.com/science/cell-theory" },
    { teks: "OpenStax Anatomy and Physiology 2e — 5.1 Layers of the Skin.", url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/5-1-layers-of-the-skin" },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021." },
  ],
};
