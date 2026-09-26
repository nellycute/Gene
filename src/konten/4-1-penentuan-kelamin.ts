import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.1 — Penentuan jenis kelamin
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R3 bab IV): XY dan gen SRY, ZW, XO, haplodiploid, rasio X : autosom, suhu.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const penentuanKelamin: Pelajaran = {
  slug: "penentuan-jenis-kelamin",
  nomor: "4.1",
  level: 4,
  judul: "Penentuan jenis kelamin",
  ringkas:
    "Manusia: perempuan XX, laki-laki XY; gen SRY di kromosom Y memicu terbentuknya testis. Unggas kebalikannya (jantan ZZ, betina ZW). Belalang XO, lebah haplodiploid, lalat buah memakai rasio X : autosom, dan penyu ditentukan suhu pasir.",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "kromosom-kelamin",
      tajuk: "Autosom dan kromosom kelamin",
      tahap: "xy",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "autosom", fokus: "utuh", label: "22 pasang autosom" },
        { kata: "kromosom kelamin", fokus: "kelamin", label: "Pasangan ke-23: kromosom kelamin" },
        { kata: "perempuan membawa XX", fokus: "kelamin", label: "Perempuan XX · laki-laki XY" },
      ],
      narasi:
        "Pada manusia, 22 pasang kromosom sama pada laki-laki dan perempuan — disebut autosom (autosome). Pasangan ke-23 berbeda, disebut kromosom kelamin (sex chromosome): perempuan membawa XX, laki-laki XY.",
    },
    {
      id: "sperma-menentukan",
      tajuk: "Sperma yang menentukan",
      tahap: "gametXY",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Semua sel telur", fokus: "utuh", label: "Sel telur: selalu X" },
        { kata: "Separuh sperma", fokus: "sperma", label: "Sperma: ½ X, ½ Y" },
        { kata: "peluang setengah", fokus: "anak", label: "Anak: ½ XX, ½ XY" },
      ],
      narasi:
        "Semua sel telur membawa X. Separuh sperma membawa X dan separuh membawa Y. Jadi jenis kelamin anak ditentukan oleh sperma yang membuahi, dengan peluang setengah untuk masing-masing.",
    },
    {
      id: "sry",
      tajuk: "Gen SRY",
      tahap: "sry",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "gen SRY", fokus: "gen", label: "SRY di lengan pendek Y" },
        { kata: "menjadi testis", fokus: "utuh", label: "SRY → testis" },
        { kata: "Tanpa SRY", fokus: "tanpa", label: "Tanpa SRY → ovarium" },
      ],
      narasi:
        "Kromosom Y membawa gen SRY (sex-determining region Y). Sekitar minggu ketujuh kehamilan, gen ini memicu bakal gonad berkembang menjadi testis. Tanpa SRY, bakal gonad berkembang menjadi ovarium.",
    },
    {
      id: "zw",
      tajuk: "Unggas: ZZ dan ZW",
      tahap: "zw",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "ZZ", fokus: "jantan", label: "Ayam jantan: ZZ" },
        { kata: "betina ZW", fokus: "betina", label: "Ayam betina: ZW" },
        { kata: "sel telurlah", fokus: "utuh", label: "Pada ayam: sel telur yang menentukan" },
      ],
      narasi:
        "Pada unggas, polanya terbalik. Ayam jantan membawa dua kromosom yang sama, ZZ, sedangkan betina ZW. Jadi pada ayam, sel telurlah yang menentukan jenis kelamin anak.",
    },
    {
      id: "xo-lebah",
      tajuk: "Belalang dan lebah",
      tahap: "serangga",
      fokus: "belalang",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "XO", fokus: "belalang", label: "Belalang: betina XX, jantan XO" },
        { kata: "lebah madu", fokus: "lebah", label: "Lebah: betina 2n, jantan n" },
      ],
      narasi:
        "Pada belalang, betina XX dan jantan hanya punya satu X — ditulis XO. Pada lebah madu, penentunya jumlah set kromosom: betina diploid dari telur yang dibuahi, jantan haploid dari telur yang tidak dibuahi.",
    },
    {
      id: "drosophila",
      tajuk: "Lalat buah: rasio X",
      tahap: "serangga",
      fokus: "lalat",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "perbandingan kromosom X", fokus: "lalat", label: "X : set autosom" },
        { kata: "Satu X per dua set", fokus: "lalat", label: "1 X : 2 set → jantan" },
        { kata: "dua X per dua set", fokus: "lalat", label: "2 X : 2 set → betina" },
      ],
      narasi:
        "Pada lalat buah Drosophila, yang menentukan adalah perbandingan kromosom X dengan set autosom. Satu X per dua set autosom menghasilkan jantan — walau tanpa Y — sedangkan dua X per dua set menghasilkan betina.",
    },
    {
      id: "suhu",
      tajuk: "Penyu: suhu pasir",
      tahap: "penyu",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "suhu pasir", fokus: "utuh", label: "Penyu: ditentukan suhu" },
        { kata: "lebih hangat", fokus: "hangat", label: "Lebih hangat → lebih banyak betina" },
        { kata: "pemanasan global", fokus: "utuh", label: "Pemanasan global menggeser rasio" },
      ],
      narasi:
        "Pada penyu, jenis kelamin ditentukan suhu pasir tempat telur dierami. Pada banyak jenis penyu, suhu yang lebih hangat menghasilkan lebih banyak betina — sehingga pemanasan global bisa menggeser perbandingan jantan dan betina.",
    },
  ],

  poinKunci: [
    "Manusia: 22 pasang autosom + sepasang kromosom kelamin; perempuan 46,XX, laki-laki 46,XY. Sel telur selalu membawa X; sperma separuh X, separuh Y.",
    "Gen SRY di lengan pendek kromosom Y memicu bakal gonad menjadi testis (sekitar minggu ke-6–7 kehamilan). Tanpa SRY, terbentuk ovarium.",
    "Unggas: jantan homogametik (ZZ), betina heterogametik (ZW) — sel telur yang menentukan jenis kelamin anak.",
    "Belalang: betina XX, jantan XO. Lebah madu: haplodiploid — betina diploid (telur dibuahi), jantan haploid (telur tak dibuahi).",
    "Drosophila: rasio X : set autosom (X : A) 1 → betina, 0,5 → jantan; lalat XO tetap jantan (mandul).",
    "Penyu: penentuan kelamin oleh suhu (temperature-dependent sex determination). Pada banyak penyu, sarang hangat menghasilkan lebih banyak betina.",
  ],

  istilah: [
    { id: "Autosom", en: "autosome", arti: "Kromosom yang bukan kromosom kelamin." },
    { id: "Kromosom kelamin", en: "sex chromosome", arti: "Kromosom yang berbeda antara jantan dan betina (X, Y, Z, W)." },
    { id: "SRY", en: "sex-determining region Y", arti: "Gen di kromosom Y yang memicu terbentuknya testis." },
    { id: "Homogametik", en: "homogametic", arti: "Jenis kelamin yang gametnya membawa kromosom kelamin sama (XX, ZZ)." },
    { id: "Heterogametik", en: "heterogametic", arti: "Jenis kelamin yang menghasilkan dua macam gamet (XY, ZW)." },
    { id: "Haplodiploid", en: "haplodiploidy", arti: "Jantan haploid dan betina diploid, seperti pada lebah." },
  ],

  rujukan: [
    { teks: "Sinclair AH, dkk. A gene from the human sex-determining region encodes a protein with homology to a conserved DNA-binding motif. Nature 346:240–244, 1990." },
    { teks: "Bridges CB. Sex in relation to chromosomes and genes. American Naturalist 59:127–137, 1925." },
    { teks: "Jensen MP, dkk. Environmental warming and feminization of one of the largest sea turtle populations in the world. Current Biology 28:154–159, 2018." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab IV." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
  ],
};
