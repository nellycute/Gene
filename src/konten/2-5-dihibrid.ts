import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.5 — Dihibrid dan Hukum Mendel II
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R2 bab 6; R3 2.4). Data F2 dari Mendel 1866 (315 : 108 : 101 : 32).
 * Kekeliruan R1 hlm. 1.23 ("9 : 3 : 3 : 3") tidak diikuti: 9 : 3 : 3 : 1.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 2 (Mendel3D).
 */

export const dihibrid: Pelajaran = {
  slug: "dihibrid-hukum-mendel-2",
  nomor: "2.5",
  level: 2,
  judul: "Dihibrid dan Hukum Mendel II",
  ringkas:
    "Dua sifat sekaligus: bulat-kuning × keriput-hijau menghasilkan F2 sembilan banding tiga banding tiga banding satu. Hukum asortasi bebas, kotak Punnett enam belas, dan dasar fisiknya pada metafase I.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "dua-sifat",
      tajuk: "Dua sifat sekaligus",
      tahap: "dihibrid",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "biji bulat kuning", fokus: "p", label: "P: bulat kuning (RRYY) × keriput hijau (rryy)" },
        { kata: "dihibrid (dihybrid)", fokus: "p", label: "Dihibrid: dua sifat beda" },
      ],
      narasi:
        "Bagaimana bila dua sifat diperhatikan sekaligus? Mendel menyilangkan galur murni biji bulat kuning (RRYY) dengan biji keriput hijau (rryy). Inilah persilangan dihibrid (dihybrid).",
    },
    {
      id: "f1",
      tajuk: "F1: RrYy",
      tahap: "dihibrid",
      fokus: "f1",
      durasi: 18,
      sorot: [],
      isyarat: [{ kata: "bergenotip RrYy", fokus: "f1", sorot: ["bijiKuning", "bijiBulat"], label: "F1: semua bulat kuning, RrYy" }],
      narasi: "Semua F1 berbiji bulat kuning, bergenotip RrYy — bulat dominan atas keriput, dan kuning dominan atas hijau.",
    },
    {
      id: "f2",
      tajuk: "F2: 9 : 3 : 3 : 1",
      tahap: "hitung2",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "315 bulat kuning", fokus: "utuh", label: "315 bulat kuning" },
        { kata: "108 bulat hijau", fokus: "utuh", label: "108 bulat hijau · 101 keriput kuning" },
        { kata: "32 keriput hijau", fokus: "utuh", label: "32 keriput hijau" },
        { kata: "sembilan banding tiga", fokus: "utuh", label: "≈ 9 : 3 : 3 : 1" },
      ],
      narasi:
        "F1 dibiarkan menyerbuk sendiri. Dari 556 biji F2: 315 bulat kuning, 108 bulat hijau, 101 keriput kuning, dan 32 keriput hijau — mendekati sembilan banding tiga banding tiga banding satu.",
    },
    {
      id: "kombinasi-baru",
      tajuk: "Kombinasi baru",
      tahap: "hitung2",
      fokus: "baru",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "tidak ada pada induk", fokus: "baru", label: "Baru: bulat hijau, keriput kuning" },
        { kata: "sendiri-sendiri", fokus: "baru", label: "Bentuk dan warna diwariskan sendiri-sendiri" },
      ],
      narasi:
        "Perhatikan: muncul dua kombinasi yang tidak ada pada induk — bulat hijau dan keriput kuning. Artinya, bentuk dan warna biji diwariskan sendiri-sendiri, tidak selalu bersama.",
    },
    {
      id: "hukum-2",
      tajuk: "Hukum Mendel II",
      tahap: "gamet4",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "asortasi bebas", fokus: "utuh", label: "Hukum Mendel II: asortasi bebas" },
        { kata: "empat macam gamet", fokus: "gamet", sorot: ["gamet"], label: "RrYy → RY, Ry, rY, ry (masing-masing ¼)" },
      ],
      narasi:
        "Inilah Hukum Mendel II, hukum asortasi bebas (law of independent assortment): pasangan alel satu sifat memisah tanpa bergantung pada pasangan alel sifat lain. Tanaman RrYy menghasilkan empat macam gamet sama banyak: RY, Ry, rY, dan ry.",
    },
    {
      id: "punnett16",
      tajuk: "Enam belas kotak",
      tahap: "punnett16",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "enam belas kotak", fokus: "utuh", label: "4 × 4 = 16 kotak" },
        { kata: "sembilan bulat kuning", fokus: "kelompok", label: "9 : 3 : 3 : 1" },
      ],
      narasi:
        "Dengan empat macam gamet dari masing-masing induk, kotak Punnett-nya berisi enam belas kotak. Bila dikelompokkan: sembilan bulat kuning, tiga bulat hijau, tiga keriput kuning, dan satu keriput hijau.",
    },
    {
      id: "peluang",
      tajuk: "Cara cepat: peluang",
      tahap: "punnett16",
      fokus: "kelompok",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Bulat tiga perempat", fokus: "kelompok", label: "Bulat ¾ · kuning ¾" },
        { kata: "sembilan per enam belas", fokus: "kelompok", label: "¾ × ¾ = 9/16" },
      ],
      narasi:
        "Hasil yang sama didapat lebih cepat dengan peluang. Bulat tiga perempat, kuning tiga perempat; bulat dan kuning sekaligus: tiga perempat kali tiga perempat, yaitu sembilan per enam belas.",
    },
    {
      id: "metafase",
      tajuk: "Dasarnya: metafase I",
      tahap: "asortasi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Dua pasang kromosom homolog", fokus: "utuh", sorot: ["kromatin", "kromosomAyah"], label: "Metafase I: dua pasang homolog" },
        { kata: "Susunan pertama", fokus: "satu", label: "Susunan 1 → RY dan ry" },
        { kata: "susunan kedua", fokus: "dua", label: "Susunan 2 → Ry dan rY" },
      ],
      narasi:
        "Dasar fisiknya ada pada metafase I meiosis. Dua pasang kromosom homolog berjajar di bidang tengah dengan arah yang acak. Susunan pertama menghasilkan gamet RY dan ry; susunan kedua menghasilkan Ry dan rY.",
    },
    {
      id: "syarat",
      tajuk: "Syaratnya",
      tahap: "asortasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "kromosom berbeda", fokus: "utuh", label: "Berlaku: gen di kromosom berbeda" },
        { kata: "pautan (linkage)", fokus: "utuh", label: "Gen berdekatan: pautan (Tingkat 4)" },
      ],
      narasi:
        "Asortasi bebas berlaku bila kedua gen terletak di kromosom berbeda, atau berjauhan pada kromosom yang sama. Gen yang berdekatan cenderung diwariskan bersama — pautan (linkage), yang kita bahas di Tingkat 4.",
    },
  ],

  poinKunci: [
    "Dihibrid: P RRYY × rryy → F1 RrYy (bulat kuning) → F2 9 bulat kuning : 3 bulat hijau : 3 keriput kuning : 1 keriput hijau.",
    "Data Mendel: 315 : 108 : 101 : 32 dari 556 biji (harapan 312,75 : 104,25 : 104,25 : 34,75).",
    "Hukum Mendel II (asortasi bebas): pemisahan alel satu gen tidak bergantung pada gen lain; RrYy membentuk RY, Ry, rY, ry masing-masing ¼.",
    "Tiap sifat tetap 3 : 1 (bulat 416 : keriput 140; kuning 416 : hijau 140) — dihibrid = dua monohibrid yang berjalan bersamaan: (3 : 1) × (3 : 1) = 9 : 3 : 3 : 1.",
    "Dasar fisik: orientasi acak pasangan homolog pada metafase I.",
    "Berlaku untuk gen tak terpaut. Gen bentuk biji (R) dan warna biji (I, sering ditulis Y) ercis terletak di kromosom berbeda.",
    "Koreksi buku rujukan: R1 hlm. 1.23 menulis “9 : 3 : 3 : 3”; yang benar 9 : 3 : 3 : 1.",
  ],

  istilah: [
    { id: "Dihibrid", en: "dihybrid cross", arti: "Persilangan dengan dua sifat beda." },
    { id: "Asortasi bebas", en: "independent assortment", arti: "Hukum Mendel II: alel gen berbeda berpisah tanpa saling bergantung." },
    { id: "Kombinasi baru", en: "recombinant phenotype", arti: "Paduan sifat yang tidak ada pada kedua induk." },
    { id: "Metafase I", en: "metaphase I", arti: "Tahap meiosis I saat pasangan homolog berjajar di bidang tengah." },
    { id: "Pautan", en: "linkage", arti: "Kecenderungan gen yang berdekatan di satu kromosom diwariskan bersama." },
  ],

  rujukan: [
    { teks: "Mendel G. Versuche über Pflanzen-Hybriden. Verhandlungen des naturforschenden Vereines in Brünn 4:3–47, 1866." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 3." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.1 dan 15.1." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 2.4." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB2 (dengan koreksi, lihat Ringkasan)." },
  ],
};
