import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.1 — Bukti bahwa DNA materi genetik
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026:
 * Tingkat 1 ditinjau Nely sendiri, label Draf tetap sampai ia menyetujui).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R3 7.1). Tahun, nama,
 * dan hasil percobaan dicocokkan dengan makalah aslinya di `rujukan`.
 *
 * Dua kekeliruan R3 yang TIDAK diikuti (KURIKULUM.md, tabel kekeliruan):
 *  - hlm. 141: yang berkapsul adalah galur virulen (S), bukan yang avirulen;
 *  - hlm. 145–146: hasil Hershey–Chase tertukar — ³²P (DNA) masuk ke bakteri
 *    dan ikut ke pelet, ³⁵S (protein) tertinggal di cairan.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (BuktiDNA3D) — kandidat, empat syarat, Griffith,
 * transformasi, Avery, bakteriofag, sentrifus.
 */

/** Semua bagian DNA di film ini: pita biru (potongan DNA) dan heliks berbasa. */
const DNA = ["dna", "gulaFosfat", "basaA", "basaT", "basaG", "basaC", "ikatanHidrogen"];

export const buktiDNA: Pelajaran = {
  slug: "bukti-dna-materi-genetik",
  nomor: "1.1",
  level: 1,
  judul: "Bukti bahwa DNA materi genetik",
  ringkas:
    "Protein atau DNA? Tiga percobaan — Griffith (1928), Avery dan rekan (1944), Hershey dan Chase (1952) — yang membuktikan bahwa DNA-lah pembawa pesan pewarisan.",
  tingkat: "Dasar",
  animasi: "bukti-dna",
  draf: true,

  adegan: [
    {
      id: "kandidat",
      tajuk: "Protein atau DNA?",
      tahap: "kandidat",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "protein dan DNA", fokus: "utuh", sorot: [], label: "Kromosom: protein + DNA" },
        { kata: "menjagokan protein", fokus: "protein", sorot: ["protein", "asamAmino"], label: "Protein · 20 macam asam amino" },
        { kata: "sedangkan DNA", fokus: "dna", sorot: DNA, label: "DNA · 4 macam basa" },
      ],
      narasi:
        "Di Tingkat 0 kita melihat kromosom tersusun dari protein dan DNA. Hingga 1940-an, banyak ilmuwan menjagokan protein sebagai materi genetik: ia tersusun dari dua puluh macam asam amino (amino acid), sedangkan DNA hanya dari empat macam basa.",
    },
    {
      id: "syarat",
      tajuk: "Empat syarat materi genetik",
      tahap: "syarat",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "menyimpan informasi", fokus: "simpan", label: "1 · Menyimpan informasi" },
        { kata: "digandakan dengan tepat", fokus: "ganda", label: "2 · Dapat digandakan dengan tepat" },
        { kata: "diterjemahkan menjadi sifat", fokus: "ekspresi", label: "3 · Dapat diterjemahkan menjadi sifat" },
        { kata: "cukup stabil", fokus: "mutasi", label: "4 · Stabil, tapi sesekali berubah" },
        { kata: "Tiga percobaan", fokus: "utuh", label: "Siapa yang memenuhinya?" },
      ],
      narasi:
        "Materi genetik harus memenuhi empat syarat: menyimpan informasi, dapat digandakan dengan tepat, dapat diterjemahkan menjadi sifat, dan cukup stabil — tetapi sesekali bisa berubah (mutasi, mutation) agar variasi muncul. Tiga percobaan menguji siapa yang memenuhinya.",
    },
    {
      id: "griffith-bakteri",
      tajuk: "1928 · Griffith",
      tahap: "bakteri",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Frederick Griffith", fokus: "utuh", label: "1928 · Frederick Griffith" },
        { kata: "galur S", fokus: "s", sorot: ["galurS"], label: "Galur S · berkapsul, mematikan" },
        { kata: "galur R", fokus: "r", sorot: ["galurR"], label: "Galur R · tanpa kapsul, tidak berbahaya" },
      ],
      narasi:
        "Tahun 1928, Frederick Griffith meneliti bakteri penyebab radang paru, Streptococcus pneumoniae. Ada dua galurnya (strain): galur S berselubung kapsul (capsule) yang licin dan mematikan, serta galur R tanpa kapsul yang tidak berbahaya.",
    },
    {
      id: "griffith-tikus",
      tajuk: "Empat suntikan",
      tahap: "tikus",
      fokus: "utuh",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "Galur S hidup", fokus: "tikus1", sorot: ["tikus1"], label: "S hidup → tikus mati" },
        { kata: "Galur R hidup", fokus: "tikus2", sorot: ["tikus2"], label: "R hidup → tikus sehat" },
        { kata: "dimatikan dengan pemanasan", fokus: "tikus3", sorot: ["tikus3"], label: "S dipanaskan → tikus sehat" },
        { kata: "Tetapi campuran", fokus: "tikus4", sorot: ["tikus4"], label: "R hidup + S mati → tikus mati!" },
      ],
      narasi:
        "Griffith menyuntikkan bakteri ke tikus. Galur S hidup: tikus mati. Galur R hidup: tikus sehat. Galur S yang dimatikan dengan pemanasan: tikus sehat. Tetapi campuran galur R hidup dan galur S mati membuat tikusnya mati.",
    },
    {
      id: "transformasi",
      tajuk: "Prinsip transformasi",
      tahap: "transformasi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "bakteri S hidup", fokus: "utuh", label: "Di darah tikus: bakteri S hidup" },
        { kata: "telah berubah", fokus: "masuk", sorot: ["dna", "galurR"], label: "Zat dari S mati masuk ke R" },
        { kata: "keturunannya tetap S", fokus: "anak", sorot: [], label: "R berubah menjadi S — dan keturunannya" },
        { kata: "prinsip transformasi", fokus: "akhir", sorot: ["dna"], label: "Prinsip transformasi · zat apa?" },
      ],
      narasi:
        "Dari darah tikus keempat, Griffith menemukan bakteri S hidup. Sebagian bakteri R telah berubah menjadi S, dan keturunannya tetap S. Suatu zat dari bakteri S mati mengubahnya — Griffith menyebutnya prinsip transformasi (transforming principle).",
    },
    {
      id: "avery-tabung",
      tajuk: "1944 · Avery, MacLeod, McCarty",
      tahap: "avery",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Tahun 1944", fokus: "utuh", label: "1944 · Avery, MacLeod, McCarty" },
        { kata: "memurnikan ekstrak", fokus: "utuh", sorot: ["dna", "rna", "protein"], label: "Ekstrak bakteri S mati" },
        { kata: "menghancurkan satu jenis molekul", fokus: "utuh", sorot: ["enzim"], label: "Tiap tabung: satu enzim penghancur" },
      ],
      narasi:
        "Zat apakah itu? Tahun 1944, Oswald Avery, Colin MacLeod, dan Maclyn McCarty memurnikan ekstrak bakteri S mati, lalu membaginya ke tiga tabung. Tiap tabung diberi enzim yang menghancurkan satu jenis molekul, kemudian dicampur dengan bakteri R hidup.",
    },
    {
      id: "avery-hasil",
      tajuk: "DNA-lah zat pengubahnya",
      tahap: "avery",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "penghancur protein", fokus: "tabung1", tahap: "avery-hasil", sorot: ["protein", "enzim", "hasil1"], label: "Protease → R tetap berubah jadi S" },
        { kata: "penghancur RNA", fokus: "tabung2", tahap: "avery-hasil", sorot: ["rna", "enzim", "hasil2"], label: "RNase → R tetap berubah jadi S" },
        { kata: "penghancur DNA", fokus: "tabung3", tahap: "avery-hasil", sorot: ["dna", "enzim", "hasil3"], label: "DNase → tidak ada transformasi" },
        { kata: "zat pengubah itu", fokus: "utuh", tahap: "avery-hasil", sorot: [], label: "Zat pengubah = DNA" },
      ],
      narasi:
        "Dengan enzim penghancur protein (protease), bakteri R tetap berubah menjadi S. Dengan enzim penghancur RNA (RNase), tetap berubah. Tetapi dengan enzim penghancur DNA (DNase), tidak ada yang berubah. Jadi zat pengubah itu adalah DNA.",
    },
    {
      id: "fag",
      tajuk: "1952 · Hershey dan Chase",
      tahap: "fag",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Alfred Hershey dan Martha Chase", fokus: "utuh", label: "1952 · Alfred Hershey dan Martha Chase" },
        { kata: "selubung protein", fokus: "kepala", sorot: ["protein"], label: "Selubung protein" },
        { kata: "DNA di dalamnya", fokus: "kepala", sorot: ["dna"], label: "DNA di dalam kepala virus" },
        { kata: "hanya salah satunya", fokus: "bakteri", sorot: [], label: "Siapa yang masuk ke bakteri?" },
      ],
      narasi:
        "Sebagian ilmuwan masih ragu. Tahun 1952, Alfred Hershey dan Martha Chase memakai bakteriofag T2 (bacteriophage), virus penyerang bakteri yang hanya terdiri dari selubung protein dan DNA di dalamnya. Saat menginfeksi, hanya salah satunya yang masuk ke bakteri.",
    },
    {
      id: "penanda",
      tajuk: "Dua penanda radioaktif",
      tahap: "penanda",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Belerang radioaktif", fokus: "fag1", sorot: ["penandaProtein"], label: "³⁵S menandai protein" },
        { kata: "Fosfor radioaktif", fokus: "fag2", sorot: ["penandaDNA"], label: "³²P menandai DNA" },
        { kata: "rangka DNA", fokus: "fag2", sorot: ["penandaDNA"], label: "Fosfat: ada di DNA, hampir tidak di protein" },
      ],
      narasi:
        "Mereka menyiapkan dua kelompok fag. Belerang radioaktif (³⁵S) menandai proteinnya, karena DNA tidak mengandung belerang. Fosfor radioaktif (³²P) menandai DNA-nya, karena fosfat ada di rangka DNA tetapi hampir tidak ada di protein.",
    },
    {
      id: "blender",
      tajuk: "Blender dan sentrifus",
      tahap: "infeksi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "menyuntikkan isinya", fokus: "suntik", sorot: ["dna"], label: "Fag menyuntikkan isinya" },
        { kata: "diaduk dalam blender", fokus: "utuh", tahap: "blender", sorot: [], label: "Blender: selubung terlepas" },
        { kata: "diputar dalam sentrifus", fokus: "utuh", tahap: "sentrifus", sorot: [], label: "Sentrifus" },
        { kata: "mengendap menjadi pelet", fokus: "pelet", tahap: "sentrifus", sorot: [], label: "Pelet: bakteri" },
        { kata: "tetap di cairan", fokus: "cairan", tahap: "sentrifus", sorot: [], label: "Cairan: selubung virus" },
      ],
      narasi:
        "Setelah fag menempel dan menyuntikkan isinya, campuran diaduk dalam blender agar selubung virus terlepas dari bakteri, lalu diputar dalam sentrifus (centrifuge). Bakteri yang berat mengendap menjadi pelet (pellet); selubung virus yang ringan tetap di cairan.",
    },
    {
      id: "hasil-fag",
      tajuk: "Yang masuk adalah DNA",
      tahap: "sentrifus",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "belerang radioaktif", fokus: "tabung1", sorot: ["protein"], label: "³⁵S di cairan, bersama selubung" },
        { kata: "fosfor radioaktif", fokus: "tabung2", sorot: ["dna"], label: "³²P di pelet, di dalam bakteri" },
        { kata: "fag baru", fokus: "baru", sorot: ["dna", "protein"], label: "Bakteri membuat fag baru" },
        { kata: "Yang masuk", fokus: "akhir", sorot: ["dna"], label: "DNA masuk; protein tertinggal" },
      ],
      narasi:
        "Sebagian besar belerang radioaktif tertinggal di cairan bersama selubung protein, sedangkan fosfor radioaktif ikut ke pelet, di dalam bakteri — dan bakteri itu kemudian menghasilkan fag baru. Yang masuk dan membawa instruksi adalah DNA, bukan protein.",
    },
    {
      id: "penutup",
      tajuk: "Tiga percobaan, satu jawaban",
      tahap: "kandidat",
      fokus: "dna",
      durasi: 20,
      sorot: DNA,
      isyarat: [
        { kata: "DNA-lah materi genetik", fokus: "dna", sorot: DNA, label: "DNA = materi genetik" },
        { kata: "empat huruf", fokus: "dekat", sorot: ["basaA", "basaT", "basaG", "basaC"], label: "Hanya empat huruf: A, T, G, C" },
        { kata: "heliks ganda", fokus: "dekat", sorot: DNA, label: "Berikutnya: heliks ganda" },
      ],
      narasi:
        "Tiga percobaan, satu jawaban: DNA-lah materi genetik (genetic material). Pertanyaan berikutnya: bagaimana molekul yang hanya punya empat huruf bisa menyimpan instruksi sebanyak itu? Jawabannya ada pada bentuknya — heliks ganda.",
    },
  ],

  poinKunci: [
    "Materi genetik harus menyimpan informasi, dapat digandakan dengan tepat, dapat diterjemahkan menjadi sifat, dan stabil tetapi sesekali bisa bermutasi.",
    "Griffith (1928): campuran bakteri R hidup dan bakteri S mati membunuh tikus — suatu zat dari S mati mengubah R menjadi S secara menurun (transformasi).",
    "Avery, MacLeod, dan McCarty (1944): transformasi berhenti hanya bila DNA dihancurkan (DNase), bukan bila protein atau RNA dihancurkan.",
    "Hershey dan Chase (1952): ³²P (penanda DNA) masuk ke bakteri dan ikut ke pelet; ³⁵S (penanda protein) tertinggal di cairan bersama selubung virus.",
    "Catatan sejarah: Avery bukan satu-satunya yang meyakinkan orang. Banyak ilmuwan baru menerima DNA sebagai materi genetik setelah Hershey–Chase dan model heliks ganda (1953). Hershey mendapat Nobel 1969.",
    "Galur S disebut begitu karena koloninya licin (smooth) di cawan agar — kapsul polisakaridanya melindungi bakteri dari sel darah putih. Galur R koloninya kasar (rough).",
    "Pada percobaan Griffith yang asli, galur R berasal dari tipe II dan galur S dari tipe III. Bakteri yang ditemukan di tikus keempat bertipe III — bukti bahwa kapsulnya berasal dari bakteri mati, bukan R yang kembali ke asal.",
    "Buku rujukan R3 (hlm. 141 dan 145–146) keliru menyebut galur avirulen berkapsul dan menukar hasil ³⁵S dan ³²P. Yang ditulis di pelajaran ini sesuai makalah aslinya.",
  ],

  istilah: [
    { id: "Materi genetik", en: "genetic material", arti: "Bahan pembawa pesan pewarisan; pada makhluk hidup, DNA." },
    { id: "Asam amino", en: "amino acid", arti: "Batu bata penyusun protein; ada 20 macam." },
    { id: "Mutasi", en: "mutation", arti: "Perubahan urutan materi genetik yang bisa diwariskan." },
    { id: "Galur", en: "strain", arti: "Kelompok bakteri satu spesies yang punya sifat khas yang sama." },
    { id: "Kapsul", en: "capsule", arti: "Selubung polisakarida di luar dinding sel bakteri; melindunginya dari sel darah putih." },
    { id: "Transformasi", en: "transformation", arti: "Berubahnya sifat bakteri karena mengambil DNA dari luar sel." },
    { id: "Prinsip transformasi", en: "transforming principle", arti: "Sebutan Griffith untuk zat pengubah yang belum ia ketahui; kini diketahui DNA." },
    { id: "Enzim", en: "enzyme", arti: "Protein yang mempercepat reaksi kimia, termasuk memotong molekul lain." },
    { id: "Protease", en: "protease", arti: "Enzim yang memotong protein." },
    { id: "RNase", en: "ribonuclease", arti: "Enzim yang memotong RNA." },
    { id: "DNase", en: "deoxyribonuclease", arti: "Enzim yang memotong DNA." },
    { id: "Bakteriofag", en: "bacteriophage", arti: "Virus yang menyerang bakteri; sering disingkat fag." },
    { id: "Penanda radioaktif", en: "radioactive label", arti: "Unsur radioaktif yang dipasang pada molekul agar letaknya bisa dilacak." },
    { id: "Sentrifus", en: "centrifuge", arti: "Alat pemutar cepat yang mengendapkan benda berat ke dasar tabung." },
    { id: "Pelet", en: "pellet", arti: "Endapan padat di dasar tabung setelah diputar sentrifus." },
  ],

  rujukan: [
    { teks: "Griffith F. The significance of pneumococcal types. Journal of Hygiene 27:113–159, 1928." },
    {
      teks: "Avery OT, MacLeod CM, McCarty M. Studies on the chemical nature of the substance inducing transformation of pneumococcal types. Journal of Experimental Medicine 79:137–158, 1944.",
      url: "https://doi.org/10.1084/jem.79.2.137",
    },
    {
      teks: "Hershey AD, Chase M. Independent functions of viral protein and nucleic acid in growth of bacteriophage. Journal of General Physiology 36:39–56, 1952.",
      url: "https://doi.org/10.1085/jgp.36.1.39",
    },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 16.1." },
    { teks: "Pierce BA. Genetics: A Conceptual Approach, edisi ke-6. W. H. Freeman, 2017. Bab 10." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 7.1 (dengan koreksi, lihat Ringkasan)." },
  ],
};
