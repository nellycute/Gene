import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.1 — Sel: unit terkecil kehidupan
 *
 * STATUS: DRAF. Ditulis Claude, BELUM ditinjau Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 */

export const selUnitKehidupan: Pelajaran = {
  slug: "sel-unit-terkecil-kehidupan",
  nomor: "0.1",
  level: 0,
  judul: "Sel: Unit Terkecil Kehidupan",
  ringkas:
    "Memperbesar satu titik di kulit lenganmu terus-menerus — dari tubuh, jaringan, sel, inti, sampai bertemu DNA — dan mengapa seluruh genetika dimulai dari sini.",
  tingkat: "Dasar",
  animasi: "perbesaran",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Tiga puluh tujuh triliun",
      tahap: "tubuh",
      durasi: 24,
      sorot: [],
      narasi:
        "Tubuhmu tersusun dari sekitar tiga puluh tujuh triliun sel. Angka itu terlalu besar untuk dibayangkan — jadi mari kita perbesar satu titik saja di kulit lenganmu, terus-menerus, sampai bertemu benda yang menjadi pokok seluruh pelajaran genetika.",
    },
    {
      id: "jaringan",
      tajuk: "Jaringan",
      tahap: "jaringan",
      durasi: 22,
      sorot: ["membranSel", "inti"],
      narasi:
        "Diperbesar seratus kali, kulit ternyata bukan lembaran polos. Ia tersusun dari sel-sel yang berjajar rapat seperti ubin — inilah jaringan (tissue). Setiap ubin adalah satu sel hidup, lengkap dengan intinya sendiri.",
    },
    {
      id: "sel",
      tajuk: "Satu sel",
      tahap: "sel",
      durasi: 25,
      sorot: [],
      narasi:
        "Kita perbesar lagi, dan satu ubin itu menjadi ini: sebuah sel (cell), unit terkecil yang masih bisa disebut hidup. Ia bernapas, mengolah makanan, membuang sampah, dan pada waktunya membelah diri. Lebarnya sekitar dua puluh mikrometer.",
    },
    {
      id: "teori-sel",
      tajuk: "Teori sel",
      tahap: "dua-sel",
      durasi: 27,
      sorot: ["membranSel", "inti"],
      narasi:
        "Tiga hal berlaku untuk semua makhluk hidup, dari bakteri sampai paus: tubuhnya tersusun dari sel; sel adalah satuan dasar kehidupan; dan setiap sel berasal dari sel yang sudah ada — tidak pernah muncul dari ketiadaan. Inilah teori sel (cell theory).",
    },
    {
      id: "prokariot",
      tajuk: "Dua rancangan sel",
      tahap: "prokariot",
      durasi: 26,
      sorot: ["dindingSel", "kromatin", "inti"],
      narasi:
        "Ada dua rancangan dasar sel. Sel bakteri disebut prokariot (prokaryote): kecil, dan DNA-nya mengambang bebas di dalam sitoplasma. Sel hewan, tumbuhan, dan jamur disebut eukariot (eukaryote): DNA-nya tersimpan rapi di dalam inti bermembran.",
    },
    {
      id: "skala",
      tajuk: "Seberapa kecil?",
      tahap: "skala",
      durasi: 25,
      sorot: ["membranSel"],
      narasi:
        "Seberapa kecil? Bakteri sekitar dua mikrometer. Sel darah merah delapan. Sel hewan pada umumnya dua puluh. Sehelai rambut, yang sudah terasa tipis, tebalnya delapan puluh mikrometer — artinya empat sel hewan berjajar.",
    },
    {
      id: "inti",
      tajuk: "Masuk ke inti",
      tahap: "inti",
      durasi: 25,
      sorot: ["inti", "membranInti", "kromatin", "nukleolus"],
      narasi:
        "Sekarang masuk ke dalam sel, menuju bulatan ungu di tengahnya: inti sel (nucleus). Di dalam inilah tersimpan hampir seluruh DNA-mu, terlindung selaput ganda, dan berbentuk benang-benang kusut yang disebut kromatin (chromatin).",
    },
    {
      id: "dna",
      tajuk: "DNA",
      tahap: "dna",
      durasi: 26,
      sorot: ["basaA", "basaT", "basaG", "basaC", "gulaFosfat"],
      narasi:
        "Perbesar satu benang itu ribuan kali lagi, dan inilah yang tampak: DNA. Dua untai berpilin, disatukan pasangan basa berwarna — adenin, timin, guanin, sitosin. Urutan keempat huruf inilah instruksi lengkap untuk membangun dan menjalankan tubuhmu.",
    },
    {
      id: "penutup",
      tajuk: "Dari sinilah genetika dimulai",
      tahap: "sel",
      durasi: 26,
      sorot: [],
      narasi:
        "Dan yang menakjubkan: hampir setiap sel dari tiga puluh tujuh triliun itu membawa salinan DNA yang sama. Genetika adalah ilmu tentang instruksi ini — cara ia disimpan, disalin, dibaca, diwariskan, dan berubah. Perjalanan kita dimulai dari sel.",
    },
  ],

  poinKunci: [
    "Sel adalah unit terkecil yang masih bisa disebut hidup: bernapas, mengolah makanan, membuang sampah, dan membelah diri.",
    "Teori sel: semua makhluk hidup tersusun dari sel, sel adalah satuan dasar kehidupan, dan setiap sel berasal dari sel yang sudah ada.",
    "Prokariot (bakteri) tidak punya inti; DNA-nya bebas di sitoplasma. Eukariot (hewan, tumbuhan, jamur) menyimpan DNA di dalam inti bermembran.",
    "Sel hewan berukuran sekitar 20 mikrometer — seperempat tebal sehelai rambut.",
    "Hampir setiap sel tubuh membawa salinan DNA yang sama; genetika adalah ilmu tentang instruksi itu.",
  ],

  istilah: [
    { id: "Sel", en: "cell", arti: "Unit terkecil yang masih menunjukkan ciri hidup." },
    { id: "Jaringan", en: "tissue", arti: "Kumpulan sel sejenis yang bekerja bersama." },
    { id: "Teori sel", en: "cell theory", arti: "Tiga prinsip dasar tentang sel yang berlaku untuk semua makhluk hidup." },
    { id: "Prokariot", en: "prokaryote", arti: "Sel tanpa inti bermembran; DNA-nya bebas di sitoplasma. Contoh: bakteri." },
    { id: "Eukariot", en: "eukaryote", arti: "Sel yang menyimpan DNA di dalam inti bermembran. Contoh: sel hewan dan tumbuhan." },
    { id: "Mikrometer", en: "micrometre (µm)", arti: "Seperseribu milimeter — satuan ukuran sel." },
    { id: "Inti sel", en: "nucleus", arti: "Organel bermembran ganda tempat DNA disimpan." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein, tampak seperti benang kusut." },
    { id: "DNA", en: "deoxyribonucleic acid", arti: "Molekul pembawa instruksi genetik, berbentuk heliks ganda." },
    { id: "Basa nitrogen", en: "nitrogenous base", arti: "Empat 'huruf' DNA: adenin, timin, guanin, sitosin." },
  ],

  rujukan: [
    { teks: "Bianconi E, dkk. An estimation of the number of cells in the human body. Ann Hum Biol. 2013;40(6):463-471." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021." },
  ],
};
