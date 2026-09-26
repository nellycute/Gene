import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.1 — Frekuensi alel dan Hardy-Weinberg
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R2 bab 10). Contoh: warna bulu sapi Shorthorn (merah RR, roan RW, putih WW).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const hardyWeinberg: Pelajaran = {
  slug: "frekuensi-alel-hardy-weinberg",
  nomor: "6.1",
  level: 6,
  judul: "Frekuensi alel dan Hardy-Weinberg",
  ringkas:
    "Frekuensi alel dihitung dari seluruh alel di populasi: p + q = 1. Dengan kawin acak dan tanpa pengubah, frekuensi genotip mengikuti p² + 2pq + q² = 1 (keseimbangan Hardy-Weinberg). Rumus ini dipakai untuk memperkirakan jumlah pembawa alel resesif.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "populasi",
      tajuk: "Lungkang gen",
      tahap: "populasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Genetika populasi", fokus: "utuh", label: "Genetika populasi" },
        { kata: "lungkang gen (gene pool)", fokus: "utuh", label: "Lungkang gen: semua alel populasi" },
      ],
      narasi:
        "Genetika populasi (population genetics) tidak melihat satu keluarga, tetapi seluruh populasi: kumpulan individu satu spesies yang saling kawin. Semua alel yang dimiliki populasi itu disebut lungkang gen (gene pool).",
    },
    {
      id: "frekuensi",
      tajuk: "Menghitung frekuensi alel",
      tahap: "populasi",
      fokus: "hitung",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "100 sapi Shorthorn", fokus: "hitung", label: "36 merah · 48 roan · 16 putih" },
        { kata: "200 alel", fokus: "alel", label: "100 sapi = 200 alel" },
        { kata: "72 + 48 = 120", fokus: "alel", label: "Alel merah: 72 + 48 = 120 → 0,6" },
      ],
      narasi:
        "Frekuensi alel adalah bagian dari semua alel di populasi. Misalnya dari 100 sapi Shorthorn: 36 merah, 48 roan, dan 16 putih. Ada 200 alel; alel merah berjumlah 72 + 48 = 120, jadi frekuensinya 0,6.",
    },
    {
      id: "p-q",
      tajuk: "p dan q",
      tahap: "populasi",
      fokus: "pq",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "p = 0,6", fokus: "pq", label: "p = 0,6 (alel merah)" },
        { kata: "q = 0,4", fokus: "pq", label: "q = 0,4 (alel putih)" },
        { kata: "p + q = 1", fokus: "pq", label: "p + q = 1" },
      ],
      narasi:
        "Frekuensi alel merah dilambangkan p = 0,6 dan frekuensi alel putih q = 0,4. Karena hanya ada dua alel, jumlah keduanya selalu satu: p + q = 1.",
    },
    {
      id: "hardy-weinberg",
      tajuk: "Hardy dan Weinberg",
      tahap: "hw",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Godfrey Hardy", fokus: "utuh", label: "Hardy dan Weinberg, 1908" },
        { kata: "p kuadrat untuk RR", fokus: "punnett", label: "RR: p² · RW: 2pq · WW: q²" },
      ],
      narasi:
        "Tahun 1908, Godfrey Hardy dan Wilhelm Weinberg menunjukkan: bila perkawinan acak, frekuensi genotip dapat diramal dari frekuensi alel — p kuadrat untuk RR, 2pq untuk RW, dan q kuadrat untuk WW.",
    },
    {
      id: "punnett-populasi",
      tajuk: "Punnett seluruh populasi",
      tahap: "hw",
      fokus: "punnett",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "kotak Punnett", fokus: "punnett", label: "Gamet populasi: R 0,6 · W 0,4" },
        { kata: "0,36 RR", fokus: "punnett", label: "0,36 RR · 0,48 RW · 0,16 WW" },
        { kata: "persis seperti", fokus: "punnett", label: "= 36 : 48 : 16 sapi" },
      ],
      narasi:
        "Ini seperti kotak Punnett untuk seluruh populasi: sperma dan sel telur membawa R dengan peluang 0,6 dan W dengan peluang 0,4. Hasilnya 0,36 RR, 0,48 RW, dan 0,16 WW — persis seperti sapi Shorthorn tadi.",
    },
    {
      id: "syarat",
      tajuk: "Lima syarat",
      tahap: "hw",
      fokus: "syarat",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "p² + 2pq + q² = 1", fokus: "utuh", label: "p² + 2pq + q² = 1" },
        { kata: "lima syarat", fokus: "syarat", label: "Besar · kawin acak · tanpa mutasi · tanpa migrasi · tanpa seleksi" },
      ],
      narasi:
        "Keseimbangan Hardy-Weinberg, p² + 2pq + q² = 1, hanya berlaku bila lima syarat terpenuhi: populasi besar, kawin acak, tanpa mutasi, tanpa migrasi, dan tanpa seleksi. Di alam, syarat ini jarang terpenuhi sempurna.",
    },
    {
      id: "pembawa",
      tajuk: "Memperkirakan pembawa",
      tahap: "hw",
      fokus: "resesif",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "satu dari 10.000", fokus: "resesif", label: "q² = 1/10.000" },
        { kata: "q = 0,01", fokus: "resesif", label: "q = 0,01" },
        { kata: "2 persen", fokus: "resesif", label: "2pq ≈ 0,02: 1 dari 50 orang pembawa" },
      ],
      narasi:
        "Rumus ini berguna untuk memperkirakan pembawa. Misalkan satu dari 10.000 anak menampakkan sifat resesif: q kuadrat = 0,0001, jadi q = 0,01 — dan sekitar 2 persen orang adalah pembawa.",
    },
  ],

  poinKunci: [
    "Frekuensi alel = jumlah salinan alel itu ÷ jumlah semua alel (2 × jumlah individu diploid). p + q = 1.",
    "Shorthorn: 36 RR, 48 RW, 16 WW → p(R) = (2×36 + 48)/200 = 0,6; q(W) = 0,4.",
    "Hardy-Weinberg (1908): dengan kawin acak, frekuensi genotip p² : 2pq : q² dan tetap dari generasi ke generasi bila tidak ada pengubah.",
    "Syarat: populasi besar, kawin acak, tanpa mutasi, tanpa migrasi, tanpa seleksi. Penyimpangan dari keseimbangan menandakan ada pengubah atau kawin tak acak.",
    "Menaksir pembawa: q² = frekuensi homozigot resesif → q = √q² → pembawa ≈ 2pq. Contoh q² = 1/10.000 → q = 0,01 → 2pq ≈ 0,0198 (± 1 dari 50).",
  ],

  istilah: [
    { id: "Genetika populasi", en: "population genetics", arti: "Cabang genetika yang mempelajari alel di dalam populasi." },
    { id: "Lungkang gen", en: "gene pool", arti: "Seluruh alel yang dimiliki sebuah populasi." },
    { id: "Frekuensi alel", en: "allele frequency", arti: "Bagian satu alel dari semua alel di lokus itu." },
    { id: "Keseimbangan Hardy-Weinberg", en: "Hardy-Weinberg equilibrium", arti: "Frekuensi alel dan genotip yang tetap tanpa pengubah." },
    { id: "Kawin acak", en: "random mating", arti: "Setiap individu berpeluang sama kawin dengan siapa pun." },
  ],

  rujukan: [
    { teks: "Hardy GH. Mendelian proportions in a mixed population. Science 28:49–50, 1908." },
    { teks: "Weinberg W. Über den Nachweis der Vererbung beim Menschen. Jahreshefte des Vereins für vaterländische Naturkunde in Württemberg 64:368–382, 1908." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 10." },
    { teks: "Falconer DS, Mackay TFC. Introduction to Quantitative Genetics, edisi ke-4. Longman, 1996. Bab 1." },
  ],
};
