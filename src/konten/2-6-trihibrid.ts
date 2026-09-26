import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.6 — Trihibrid dan rumus cepat
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 6).
 * Rumus 2ⁿ, 3ⁿ, 4ⁿ, (3 : 1)ⁿ untuk n pasangan alel heterozigot dengan
 * dominansi penuh dan gen tak terpaut.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 2 (Mendel3D).
 */

export const trihibrid: Pelajaran = {
  slug: "trihibrid-dan-rumus-cepat",
  nomor: "2.6",
  level: 2,
  judul: "Trihibrid dan rumus cepat",
  ringkas:
    "Tiga sifat sekaligus: delapan macam gamet, enam puluh empat kotak, dua puluh tujuh genotip, delapan fenotip. Rumus 2ⁿ, 3ⁿ, dan (3 : 1)ⁿ, diagram garpu, dan contoh hitungan peluang.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "tiga-sifat",
      tajuk: "Sifat ketiga",
      tahap: "gamet8",
      fokus: "induk",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "warna bunga", fokus: "induk", sorot: ["bungaUngu", "bungaPutih"], label: "Bunga ungu (P) dominan atas putih (p)" },
        { kata: "bergenotip RrYyPp", fokus: "induk", label: "F1 trihibrid: RrYyPp" },
      ],
      narasi:
        "Tambahkan sifat ketiga: warna bunga, ungu (P) dominan atas putih (p). Tanaman F1 trihibrid (trihybrid) bergenotip RrYyPp.",
    },
    {
      id: "delapan-gamet",
      tajuk: "Delapan macam gamet",
      tahap: "gamet8",
      fokus: "cabang",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dua pilihan", fokus: "cabang", label: "Tiap pasangan: 2 pilihan" },
        { kata: "delapan macam gamet", fokus: "cabang", sorot: ["gamet"], label: "2 × 2 × 2 = 8 gamet" },
      ],
      narasi:
        "Berapa macam gametnya? Setiap pasangan alel memberi dua pilihan, sehingga tiga pasangan memberi dua kali dua kali dua, yaitu delapan macam gamet.",
    },
    {
      id: "punnett64",
      tajuk: "Enam puluh empat kotak",
      tahap: "punnett64",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "enam puluh empat kotak", fokus: "utuh", label: "8 × 8 = 64 kotak" },
        { kata: "memakai rumus", fokus: "dekat", label: "Terlalu besar → pakai rumus" },
      ],
      narasi:
        "Kotak Punnett-nya menjadi delapan kali delapan: enam puluh empat kotak. Menggambarnya lama dan mudah salah. Karena itu ahli genetika memakai rumus.",
    },
    {
      id: "rumus",
      tajuk: "Rumus untuk n sifat",
      tahap: "rumus",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "macam gamet", fokus: "utuh", label: "Gamet: 2ⁿ" },
        { kata: "macam genotip", fokus: "utuh", label: "Genotip: 3ⁿ" },
        { kata: "macam fenotip", fokus: "utuh", label: "Fenotip: 2ⁿ · rasio (3 : 1)ⁿ" },
      ],
      narasi:
        "Untuk n pasangan alel heterozigot: macam gamet dua pangkat n, macam genotip tiga pangkat n, dan — bila dominansinya penuh — macam fenotip dua pangkat n, dengan perbandingan tiga banding satu pangkat n.",
    },
    {
      id: "trihibrid",
      tajuk: "Hasil trihibrid",
      tahap: "rumus",
      fokus: "tiga",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "delapan macam gamet", fokus: "tiga", label: "n = 3: 8 gamet · 27 genotip · 8 fenotip" },
        { kata: "27 : 9 : 9 : 9", fokus: "tiga", label: "27 : 9 : 9 : 9 : 3 : 3 : 3 : 1" },
      ],
      narasi:
        "Untuk trihibrid: delapan macam gamet, dua puluh tujuh macam genotip, dan delapan macam fenotip, dengan perbandingan 27 : 9 : 9 : 9 : 3 : 3 : 3 : 1.",
    },
    {
      id: "garpu",
      tajuk: "Diagram garpu",
      tahap: "garpu",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "diagram garpu", fokus: "utuh", label: "Diagram garpu" },
        { kata: "kalikan cabangnya", fokus: "ujung", label: "Kalikan sepanjang cabang" },
      ],
      narasi:
        "Rasio itu mudah disusun dengan diagram garpu (forked-line): uraikan setiap sifat menjadi tiga perempat dominan dan seperempat resesif, lalu kalikan cabangnya satu per satu.",
    },
    {
      id: "contoh-fenotip",
      tajuk: "Contoh: satu fenotip",
      tahap: "garpu",
      fokus: "contoh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "bulat, hijau", fokus: "contoh", sorot: ["bijiHijau", "bungaUngu"], label: "Bulat, hijau, ungu?" },
        { kata: "9/64", fokus: "contoh", label: "¾ × ¼ × ¾ = 9/64" },
      ],
      narasi:
        "Contoh: berapa peluang keturunan RrYyPp × RrYyPp berbiji bulat, hijau, dan berbunga ungu? Tiga perempat kali seperempat kali tiga perempat, yaitu 9/64.",
    },
    {
      id: "contoh-genotip",
      tajuk: "Contoh: satu genotip",
      tahap: "rumus",
      fokus: "genotip",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Peluang RrYYpp", fokus: "genotip", label: "RrYYpp?" },
        { kata: "1/32", fokus: "genotip", label: "½ × ¼ × ¼ = 1/32" },
      ],
      narasi:
        "Genotip tertentu pun bisa dihitung. Peluang RrYYpp: Rr setengah, YY seperempat, pp seperempat. Kalikan ketiganya: 1/32.",
    },
    {
      id: "penutup",
      tajuk: "Tingkat 2 selesai",
      tahap: "generasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Tingkat 2 selesai", fokus: "utuh", label: "Segregasi + asortasi bebas" },
        { kata: "Tingkat 3", fokus: "utuh", label: "Berikutnya: perluasan Hukum Mendel" },
      ],
      narasi:
        "Tingkat 2 selesai: segregasi dan asortasi bebas cukup untuk meramal banyak persilangan. Tetapi tidak semua sifat patuh pada rasio ini. Di Tingkat 3 kita bertemu dominansi tidak sempurna, alel ganda, dan gen yang saling memengaruhi.",
    },
  ],

  poinKunci: [
    "Untuk n pasangan alel heterozigot (gen tak terpaut, dominansi penuh): macam gamet 2ⁿ, kombinasi gamet 4ⁿ, macam genotip 3ⁿ, macam fenotip 2ⁿ, rasio fenotip (3 : 1)ⁿ, rasio genotip (1 : 2 : 1)ⁿ.",
    "Trihibrid (n = 3): 8 gamet, 64 kombinasi, 27 genotip, 8 fenotip; rasio 27 : 9 : 9 : 9 : 3 : 3 : 3 : 1.",
    "Diagram garpu: uraikan tiap sifat menjadi ¾ dominan dan ¼ resesif, lalu kalikan sepanjang cabang.",
    "Peluang satu fenotip = hasil kali peluang tiap sifat; peluang satu genotip = hasil kali peluang tiap pasangan (½ untuk heterozigot, ¼ untuk homozigot dari Aa × Aa).",
    "Contoh: RrYyPp × RrYyPp → P(bulat, hijau, ungu) = ¾ × ¼ × ¾ = 9/64; P(RrYYpp) = ½ × ¼ × ¼ = 1/32.",
  ],

  istilah: [
    { id: "Trihibrid", en: "trihybrid cross", arti: "Persilangan dengan tiga sifat beda." },
    { id: "Diagram garpu", en: "forked-line (branch) diagram", arti: "Cara menyusun rasio dengan mengalikan peluang sepanjang cabang." },
    { id: "Dominansi penuh", en: "complete dominance", arti: "Heterozigot tampak sama dengan homozigot dominan." },
  ],

  rujukan: [
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 3." },
    { teks: "Klug WS, dkk. Concepts of Genetics, edisi ke-12. Pearson, 2019. Bab 3." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 6." },
  ],
};
