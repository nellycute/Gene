import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.2 — Monohibrid dan Hukum Mendel I
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 5;
 * R3 2.3). Angka F2 dari makalah Mendel 1866 (5.474 : 1.850; 6.022 : 2.001;
 * 787 : 277). Kaitan dengan anafase I menyambung pelajaran 0.8.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 2 (Mendel3D).
 */

export const monohibrid: Pelajaran = {
  slug: "monohibrid-hukum-mendel-1",
  nomor: "2.2",
  level: 2,
  judul: "Monohibrid dan Hukum Mendel I",
  ringkas:
    "Persilangan satu sifat: F1 seragam, F2 tiga banding satu. Hukum segregasi — sepasang alel berpisah saat gamet dibentuk — dan dasar fisiknya pada anafase I meiosis.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "persilangan-p",
      tajuk: "Bulat × keriput",
      tahap: "silang",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "galur murni biji bulat", fokus: "p", sorot: ["bijiBulat"], label: "P: bulat (RR) × keriput (rr)" },
        { kata: "monohibrid (monohybrid)", fokus: "p", sorot: [], label: "Monohibrid: satu sifat" },
      ],
      narasi:
        "Mendel menyilangkan galur murni biji bulat (RR) dengan galur murni biji keriput (rr). Persilangan yang hanya memperhatikan satu sifat seperti ini disebut monohibrid (monohybrid).",
    },
    {
      id: "f1",
      tajuk: "F1: semua bulat",
      tahap: "silang",
      fokus: "f1",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Semua biji F1 bulat", fokus: "f1", sorot: ["bijiBulat"], label: "F1: 100% bulat" },
        { kata: "seolah lenyap", fokus: "f1", label: "Keriput seolah hilang…" },
        { kata: "semuanya Rr", fokus: "f1", label: "…padahal F1 = Rr" },
      ],
      narasi:
        "Semua biji F1 bulat. Sifat keriput seolah lenyap — padahal setiap tanaman F1 membawa alel r dari induk keriputnya. Genotip F1 semuanya Rr.",
    },
    {
      id: "f2",
      tajuk: "F2: tiga banding satu",
      tahap: "hitung",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "muncul kembali", fokus: "utuh", sorot: ["bijiKeriput"], label: "Keriput muncul kembali" },
        { kata: "5.474 bulat", fokus: "utuh", label: "5.474 bulat : 1.850 keriput" },
        { kata: "tiga banding satu", fokus: "utuh", sorot: [], label: "≈ 3 : 1 (2,96 : 1)" },
      ],
      narasi:
        "Lalu tanaman F1 dibiarkan menyerbuk sendiri. Pada F2, biji keriput muncul kembali: 5.474 bulat dan 1.850 keriput. Perbandingannya hampir tepat tiga banding satu.",
    },
    {
      id: "tujuh-data",
      tajuk: "Tujuh sifat, pola yang sama",
      tahap: "hitung",
      fokus: "data",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Warna biji", fokus: "data", label: "Kuning 6.022 : hijau 2.001" },
        { kata: "Tinggi batang", fokus: "data", label: "Tinggi 787 : kerdil 277" },
        { kata: "terlalu teratur", fokus: "data", label: "Semuanya ≈ 3 : 1" },
      ],
      narasi:
        "Keenam sifat lainnya memberi hasil serupa. Warna biji: 6.022 kuning dan 2.001 hijau. Tinggi batang: 787 tinggi dan 277 kerdil. Semuanya mendekati tiga banding satu — pola yang terlalu teratur untuk kebetulan.",
    },
    {
      id: "segregasi",
      tajuk: "Hukum Mendel I",
      tahap: "segregasi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "sepasang faktor", fokus: "utuh", label: "Setiap individu: sepasang alel" },
        { kata: "pasangan itu berpisah", fokus: "gamet", label: "Saat gamet dibentuk, pasangan berpisah" },
        { kata: "hukum segregasi", fokus: "gamet", label: "Hukum Mendel I: segregasi" },
      ],
      narasi:
        "Mendel menjelaskannya begini: setiap individu membawa sepasang faktor untuk satu sifat. Saat sel kelamin (gamete) dibentuk, pasangan itu berpisah, sehingga setiap gamet hanya membawa satu. Inilah Hukum Mendel I, hukum segregasi (law of segregation).",
    },
    {
      id: "pembuahan",
      tajuk: "Pertemuan acak",
      tahap: "pembuahan",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "sama banyak", fokus: "gamet", label: "Rr → ½ R + ½ r" },
        { kata: "bertemu secara acak", fokus: "utuh", label: "Gamet bertemu acak" },
        { kata: "satu banding dua banding satu", fokus: "utuh", label: "Genotip 1 RR : 2 Rr : 1 rr" },
        { kata: "fenotipnya tiga banding satu", fokus: "utuh", label: "Fenotip 3 bulat : 1 keriput" },
      ],
      narasi:
        "Tanaman Rr menghasilkan gamet R dan r sama banyak. Pada pembuahan, gamet bertemu secara acak: RR, Rr, dan rr muncul dengan perbandingan satu banding dua banding satu. RR dan Rr bulat, rr keriput — maka fenotipnya tiga banding satu.",
    },
    {
      id: "meiosis",
      tajuk: "Segregasi di meiosis",
      tahap: "meiosis",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "sepasang kromosom homolog", fokus: "utuh", sorot: ["kromatin", "kromosomAyah"], label: "R dan r di sepasang homolog" },
        { kata: "anafase I", fokus: "pisah", label: "Anafase I: homolog berpisah" },
        { kata: "dibayangkan Mendel", fokus: "pisah", sorot: [], label: "Segregasi = pemisahan homolog" },
      ],
      narasi:
        "Setengah abad kemudian, alasannya terlihat di bawah mikroskop. Alel R dan r terletak di sepasang kromosom homolog. Pada anafase I meiosis, kedua homolog itu ditarik ke kutub yang berbeda — itulah segregasi yang dibayangkan Mendel.",
    },
    {
      id: "sampel",
      tajuk: "Peluang, bukan jaminan",
      tahap: "sampel",
      fokus: "sedikit",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "peluang, bukan jaminan", fokus: "sedikit", label: "Sampel kecil: bisa menyimpang" },
        { kata: "Semakin banyak biji", fokus: "banyak", label: "Sampel besar: mendekati 3 : 1" },
      ],
      narasi:
        "Tiga banding satu adalah peluang, bukan jaminan. Dari empat biji F2 bisa saja tidak ada yang keriput. Semakin banyak biji yang dihitung, semakin dekat hasilnya ke tiga banding satu — karena itu Mendel menghitung ribuan.",
    },
  ],

  poinKunci: [
    "Monohibrid: persilangan dengan satu sifat beda. P: RR × rr → F1: semua Rr (bulat) → F2: 1 RR : 2 Rr : 1 rr (genotip), 3 bulat : 1 keriput (fenotip).",
    "Data Mendel untuk tujuh sifat F2 (dominan : resesif): biji bulat 5.474 : 1.850; biji kuning 6.022 : 2.001; bunga ungu 705 : 224; polong gembung 882 : 299; polong hijau 428 : 152; bunga ketiak 651 : 207; batang tinggi 787 : 277.",
    "Hukum Mendel I (segregasi): dua alel satu gen berpisah saat gamet dibentuk; tiap gamet membawa satu alel dengan peluang sama.",
    "Dasar fisik: alel berada di lokus yang sama pada kromosom homolog; homolog berpisah pada anafase I meiosis (Sutton dan Boveri, 1902 — teori kromosom pewarisan).",
    "Rasio adalah peluang: pada sampel kecil hasilnya bisa menyimpang jauh; makin besar sampel, makin dekat ke rasio harapan. Uji kecocokannya secara statistik memakai uji khi-kuadrat (χ²).",
  ],

  istilah: [
    { id: "Monohibrid", en: "monohybrid cross", arti: "Persilangan dengan satu sifat beda." },
    { id: "Hukum segregasi", en: "law of segregation", arti: "Hukum Mendel I: dua alel berpisah saat gamet dibentuk." },
    { id: "Gamet", en: "gamete", arti: "Sel kelamin; membawa satu alel dari setiap gen." },
    { id: "Kromosom homolog", en: "homologous chromosomes", arti: "Sepasang kromosom sejenis, satu dari ibu dan satu dari ayah." },
    { id: "Anafase I", en: "anaphase I", arti: "Tahap meiosis I saat kromosom homolog ditarik ke kutub berbeda." },
    { id: "Rasio fenotip", en: "phenotypic ratio", arti: "Perbandingan jumlah keturunan menurut sifat yang tampak." },
    { id: "Rasio genotip", en: "genotypic ratio", arti: "Perbandingan jumlah keturunan menurut susunan alel." },
    { id: "Uji khi-kuadrat", en: "chi-square test", arti: "Uji statistik untuk menilai kecocokan data dengan rasio harapan." },
  ],

  rujukan: [
    { teks: "Mendel G. Versuche über Pflanzen-Hybriden. Verhandlungen des naturforschenden Vereines in Brünn 4:3–47, 1866." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 2." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.1 dan 15.1." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 2.3." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 5." },
  ],
};
