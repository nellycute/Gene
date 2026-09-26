import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.2 — Alel ganda: golongan darah ABO
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R2 bab 7; R3 3.1.5). Menyentuh transfusi darah: bahan belajar, bukan nasihat
 * medis (lihat Ringkasan).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const alelGanda: Pelajaran = {
  slug: "alel-ganda-golongan-darah",
  nomor: "3.2",
  level: 3,
  judul: "Alel ganda: golongan darah ABO",
  ringkas:
    "Satu gen bisa punya lebih dari dua alel di dalam populasi, walau tiap individu hanya membawa dua. Golongan darah ABO: tiga alel, enam genotip, empat fenotip. Juga warna bulu kelinci dengan empat alel.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "alel-ganda",
      tajuk: "Lebih dari dua alel",
      tahap: "abo",
      fokus: "alel",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "alel ganda", fokus: "alel", label: "Alel ganda: lebih dari dua alel" },
        { kata: "membawa dua saja", fokus: "orang", label: "Tiap orang: dua alel" },
      ],
      narasi:
        "Sejauh ini setiap gen yang kita bahas punya dua alel. Di dalam populasi, satu gen bisa punya lebih dari dua alel — disebut alel ganda (multiple alleles). Namun setiap orang tetap membawa dua saja, satu dari ayah dan satu dari ibu.",
    },
    {
      id: "tiga-alel",
      tajuk: "Iᴬ, Iᴮ, i",
      tahap: "abo",
      fokus: "alel",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "tiga alel", fokus: "alel", label: "Tiga alel: Iᴬ, Iᴮ, i" },
        { kata: "antigen A", fokus: "sel", sorot: ["antigenA"], label: "Iᴬ → antigen A" },
        { kata: "antigen B", fokus: "sel", sorot: ["antigenB"], label: "Iᴮ → antigen B" },
        { kata: "tidak membuat keduanya", fokus: "sel", sorot: [], label: "i → tanpa antigen" },
      ],
      narasi:
        "Golongan darah ABO diatur satu gen dengan tiga alel. Alel Iᴬ membuat antigen A di permukaan sel darah merah, alel Iᴮ membuat antigen B, dan alel i tidak membuat keduanya.",
    },
    {
      id: "empat-golongan",
      tajuk: "Empat golongan",
      tahap: "abo",
      fokus: "sel",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "kodominan", fokus: "sel", label: "Iᴬ dan Iᴮ kodominan; keduanya dominan atas i" },
        { kata: "kedua antigen", fokus: "sel", sorot: ["antigenA", "antigenB"], label: "AB: kedua antigen" },
        { kata: "dan O", fokus: "sel", sorot: [], label: "O: tanpa antigen A dan B" },
      ],
      narasi:
        "Iᴬ dan Iᴮ sama-sama dominan terhadap i, tetapi kodominan satu sama lain. Hasilnya empat golongan darah: A, B, AB — yang membawa kedua antigen — dan O, yang tidak membawa antigen A maupun B.",
    },
    {
      id: "enam-genotip",
      tajuk: "Enam genotip, empat fenotip",
      tahap: "tabelABO",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "enam genotip", fokus: "utuh", label: "6 genotip · 4 fenotip" },
        { kata: "golongan AB hanya", fokus: "ab", label: "AB: hanya IᴬIᴮ · O: hanya ii" },
      ],
      narasi:
        "Tiga alel membentuk enam genotip tetapi hanya empat fenotip. Golongan A bisa IᴬIᴬ atau Iᴬi, golongan B bisa IᴮIᴮ atau Iᴮi, golongan AB hanya IᴬIᴮ, dan golongan O hanya ii.",
    },
    {
      id: "contoh-silang",
      tajuk: "A × B bisa punya anak O",
      tahap: "keluargaABO",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Ayah bergolongan A", fokus: "utuh", label: "Iᴬi × Iᴮi" },
        { kata: "masing-masing", fokus: "anak", label: "A, B, AB, O: masing-masing ¼" },
      ],
      narasi:
        "Ayah bergolongan A dengan genotip Iᴬi dan ibu bergolongan B dengan genotip Iᴮi bisa mempunyai anak bergolongan A, B, AB, atau O — masing-masing dengan peluang seperempat. Golongan darah anak bisa berbeda dari kedua orang tuanya.",
    },
    {
      id: "transfusi",
      tajuk: "Mengapa darah dicocokkan",
      tahap: "transfusi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "antibodi (antibody)", fokus: "utuh", sorot: ["antibodi"], label: "Antibodi: protein berbentuk Y" },
        { kata: "anti-B", fokus: "gumpal", sorot: ["antibodi", "antigenB"], label: "Anti-B + sel golongan B → menggumpal" },
      ],
      narasi:
        "Golongan darah penting dalam transfusi. Tubuh membuat antibodi (antibody) terhadap antigen A atau B yang tidak dimilikinya. Orang bergolongan A membawa antibodi anti-B, sehingga sel darah golongan B yang masuk akan digumpalkan.",
    },
    {
      id: "kelinci",
      tajuk: "Empat alel pada kelinci",
      tahap: "kelinci",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "liar atau agouti", fokus: "c1", label: "C: agouti (liar)" },
        { kata: "chinchilla", fokus: "c2", label: "cᶜʰ: chinchilla" },
        { kata: "himalaya,", fokus: "c3", label: "cʰ: himalaya" },
        { kata: "albino.", fokus: "c4", label: "c: albino" },
        { kata: "Kelinci himalaya", fokus: "c3", label: "Himalaya: pigmen hanya di bagian dingin" },
      ],
      narasi:
        "Alel ganda juga ada pada hewan. Warna bulu kelinci diatur empat alel dengan urutan dominansi: liar atau agouti, lalu chinchilla, himalaya, dan albino. Kelinci himalaya putih dengan ujung tubuh gelap — seperti kucing Siam, pigmennya hanya terbentuk di bagian tubuh yang dingin.",
    },
  ],

  poinKunci: [
    "Alel ganda: di populasi ada lebih dari dua alel untuk satu gen, tetapi setiap individu diploid hanya membawa dua.",
    "ABO: Iᴬ dan Iᴮ kodominan satu sama lain dan sama-sama dominan atas i. Genotip → golongan: IᴬIᴬ, Iᴬi → A; IᴮIᴮ, Iᴮi → B; IᴬIᴮ → AB; ii → O.",
    "Alel Iᴬ dan Iᴮ menyandi enzim glikosiltransferase yang menempelkan gula berbeda pada antigen H; alel i tidak menghasilkan enzim yang aktif, sehingga antigen H dibiarkan apa adanya.",
    "Orang bergolongan A membawa antibodi anti-B, golongan B anti-A, golongan O keduanya, dan golongan AB tidak keduanya. Karena itu golongan darah donor dan penerima dicocokkan. Ini bahan belajar, bukan nasihat medis.",
    "Kelinci: C (agouti) > cᶜʰ (chinchilla) > cʰ (himalaya) > c (albino). Alel himalaya menyandi enzim tirosinase yang peka suhu, seperti pada kucing Siam (pelajaran 1.7).",
    "Anak bergolongan O dari ayah A dan ibu B mungkin saja: keduanya bisa pembawa i. Golongan darah saja tidak cukup untuk memastikan hubungan orang tua–anak.",
  ],

  istilah: [
    { id: "Alel ganda", en: "multiple alleles", arti: "Lebih dari dua alel untuk satu gen di dalam populasi." },
    { id: "Golongan darah", en: "blood group", arti: "Penggolongan darah menurut antigen di permukaan sel darah merah." },
    { id: "Antigen", en: "antigen", arti: "Molekul di permukaan sel yang dikenali sistem kekebalan." },
    { id: "Antibodi", en: "antibody", arti: "Protein berbentuk Y yang mengikat antigen asing." },
    { id: "Aglutinasi", en: "agglutination", arti: "Penggumpalan sel darah oleh antibodi." },
    { id: "Transfusi", en: "blood transfusion", arti: "Pemindahan darah dari donor ke penerima." },
  ],

  rujukan: [
    { teks: "Landsteiner K. Über Agglutinationserscheinungen normalen menschlichen Blutes. Wiener klinische Wochenschrift 14:1132–1134, 1901." },
    { teks: "Yamamoto F, dkk. Molecular genetic basis of the histo-blood group ABO system. Nature 345:229–233, 1990." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.5." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
  ],
};
