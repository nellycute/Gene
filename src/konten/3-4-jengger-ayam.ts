import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.4 — Interaksi gen: bentuk jengger ayam
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 3.1.7).
 * Kekeliruan R3 hlm. 65 (R dan P bersama → pea) tidak diikuti: R_P_ = walnut.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const jenggerAyam: Pelajaran = {
  slug: "interaksi-gen-jengger-ayam",
  nomor: "3.4",
  level: 3,
  judul: "Interaksi gen: bentuk jengger ayam",
  ringkas:
    "Dua gen, R dan P, bersama-sama menentukan bentuk jengger ayam: rose, pea, walnut, dan single. Rose × pea memberi F1 walnut dan F2 9 : 3 : 3 : 1 — rasio dihibrid, tetapi untuk satu sifat.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "empat-jengger",
      tajuk: "Empat bentuk jengger",
      tahap: "jengger",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "rose atau mawar", fokus: "j1", sorot: ["jengger"], label: "Rose (mawar)" },
        { kata: "pea atau biji", fokus: "j2", label: "Pea (biji)" },
        { kata: "walnut atau kenari", fokus: "j3", label: "Walnut (kenari)" },
        { kata: "single atau tunggal", fokus: "j4", label: "Single (tunggal)" },
      ],
      narasi:
        "William Bateson dan Reginald Punnett meneliti bentuk jengger ayam pada awal 1900-an. Ada empat bentuk: rose atau mawar, pea atau biji, walnut atau kenari, dan single atau tunggal.",
    },
    {
      id: "dua-gen",
      tajuk: "Dua gen, satu jengger",
      tahap: "jengger",
      fokus: "gen",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Alel R saja", fokus: "j1", label: "R_pp: rose" },
        { kata: "alel P saja", fokus: "j2", label: "rrP_: pea" },
        { kata: "keduanya bersama", fokus: "j3", label: "R_P_: walnut" },
        { kata: "tanpa keduanya", fokus: "j4", label: "rrpp: single" },
      ],
      narasi:
        "Bentuk jengger diatur dua gen, R dan P, di kromosom yang berbeda. Alel R saja menghasilkan rose, alel P saja menghasilkan pea, keduanya bersama menghasilkan walnut, dan tanpa keduanya — rrpp — jengger single.",
    },
    {
      id: "persilangan",
      tajuk: "Rose × pea",
      tahap: "silangAyam",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Ayam rose", fokus: "p", label: "P: rose (RRpp) × pea (rrPP)" },
        { kata: "walnut, RrPp", fokus: "f1", label: "F1: walnut (RrPp)" },
      ],
      narasi:
        "Ayam rose galur murni, RRpp, disilangkan dengan ayam pea galur murni, rrPP. Semua keturunan F1 berjengger walnut, RrPp — bentuk yang tidak dimiliki kedua induknya.",
    },
    {
      id: "f2",
      tajuk: "F2: 9 : 3 : 3 : 1",
      tahap: "silangAyam",
      fokus: "f2",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "F2-nya", fokus: "f2", label: "9 walnut : 3 rose : 3 pea : 1 single" },
        { kata: "satu sifat saja", fokus: "f2", label: "Rasio dihibrid untuk SATU sifat" },
      ],
      narasi:
        "Bila F1 walnut dikawinkan sesamanya, F2-nya terdiri atas sembilan walnut, tiga rose, tiga pea, dan satu single. Rasionya tetap 9 : 3 : 3 : 1 seperti dihibrid Mendel — tetapi keempatnya adalah bentuk dari satu sifat saja.",
    },
    {
      id: "interaksi",
      tajuk: "Interaksi gen",
      tahap: "jengger",
      fokus: "gen",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "interaksi gen", fokus: "gen", label: "Interaksi gen: dua gen, satu sifat" },
        { kata: "Hukum Mendel tetap berlaku", fokus: "utuh", label: "Segregasi dan asortasi bebas tetap berlaku" },
      ],
      narasi:
        "Inilah interaksi gen (gene interaction): dua gen bersama-sama menentukan satu sifat. Hukum Mendel tetap berlaku — kedua pasang alel memisah dan berpadu secara bebas. Yang baru hanyalah cara hasil perpaduannya tampak.",
    },
    {
      id: "penutup",
      tajuk: "Berikutnya: gen saling menutupi",
      tahap: "kelompok",
      fokus: "9331",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "keempat kelompok tampak berbeda", fokus: "9331", label: "9 : 3 : 3 : 1" },
        { kata: "saling menutupi", fokus: "gabung", label: "12 : 3 : 1 · 9 : 3 : 4 · 9 : 7" },
      ],
      narasi:
        "Pada jengger ayam, keempat kelompok tampak berbeda. Di pelajaran berikutnya, dua gen bisa saling menutupi, sehingga rasio 9 : 3 : 3 : 1 berubah menjadi 12 : 3 : 1, 9 : 3 : 4, atau 9 : 7.",
    },
  ],

  poinKunci: [
    "Jengger ayam: R_pp → rose, rrP_ → pea, R_P_ → walnut, rrpp → single (garis bawah = alel apa pun).",
    "Rose (RRpp) × pea (rrPP) → F1 walnut (RrPp) → F2 9 walnut : 3 rose : 3 pea : 1 single.",
    "Interaksi gen: dua gen atau lebih bersama menentukan satu sifat. Pewarisan tiap gen tetap mengikuti segregasi dan asortasi bebas.",
    "Contoh ras: Wyandotte (rose), Brahma (pea), Leghorn (single); walnut umum pada hasil silangan.",
    "Koreksi buku rujukan: R3 hlm. 65 menulis R dan P dominan bersama menghasilkan pea; yang benar walnut.",
  ],

  istilah: [
    { id: "Interaksi gen", en: "gene interaction", arti: "Dua gen atau lebih bersama menentukan satu sifat." },
    { id: "Jengger", en: "comb", arti: "Tonjolan merah di kepala ayam." },
    { id: "Rose", en: "rose comb", arti: "Jengger pipih lebar berbintil dengan taji ke belakang." },
    { id: "Pea", en: "pea comb", arti: "Jengger rendah dengan tiga baris." },
    { id: "Walnut", en: "walnut comb", arti: "Jengger bulat berlekuk seperti buah kenari." },
    { id: "Single", en: "single comb", arti: "Jengger tegak bergerigi satu baris." },
  ],

  rujukan: [
    { teks: "Bateson W, Punnett RC. Experimental studies in the physiology of heredity. Reports to the Evolution Committee of the Royal Society 2:1–99, 1905; 4:1–60, 1908." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Wright D, dkk. Copy number variation in intron 1 of SOX5 causes the pea-comb phenotype in chickens. PLoS Genetics 5:e1000512, 2009." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.7 (dengan koreksi, lihat Ringkasan)." },
  ],
};
