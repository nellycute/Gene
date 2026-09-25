import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.6 — Kariotipe: memotret seluruh kromosom
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Dipecah dari 0.4 lama (23 Sep 2026).
 * 25 Sep 2026: ditambah cara membuat kariotipe (kolkisin, larutan hipotonik,
 * pewarnaan pita, penjajaran) dan kariotipe sapi (2n = 60); dikoreksi menurut
 * pemeriksaan fakta (kariotipe diambil saat sel SEDANG membelah, di metafase).
 */

export const kariotipe: Pelajaran = {
  slug: "kariotipe",
  nomor: "0.6",
  level: 0,
  judul: "Kariotipe: memotret seluruh kromosom",
  ringkas:
    "Memotret seluruh kromosom satu sel saat sedang membelah, menjajarkannya menurut ukuran, sentromer, dan pita, lalu membaca jumlah dan jenis kelaminnya — pada manusia dan pada sapi.",
  tingkat: "Dasar",
  animasi: "kromosom",

  adegan: [
    {
      id: "kariotipe",
      tajuk: "Kariotipe: 46 kromosom",
      tahap: "kariotipe",
      durasi: 25,
      sorot: [],
      isyarat: [
        { kata: "empat puluh enam kromosom", label: "46 kromosom" },
        { kata: "dijajarkan menurut ukuran", label: "Dijajarkan dari yang terbesar" },
        { kata: "dua puluh dua pasang autosom", label: "22 pasang autosom" },
        { kata: "sepasang kromosom kelamin", fokus: "xy", label: "Sepasang kromosom kelamin" },
      ],
      narasi:
        "Manusia punya empat puluh enam kromosom. Kalau dipotret saat memadat lalu dijajarkan menurut ukuran, letak sentromer, dan pola pita, hasilnya disebut kariotipe (karyotype): dua puluh dua pasang autosom (autosome), ditambah sepasang kromosom kelamin (sex chromosome).",
    },
    {
      id: "cara-membuat",
      tajuk: "Cara membuat kariotipe",
      tahap: "kariotipe",
      fokus: "sebar",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "diberi kolkisin", label: "Kolkisin: pembelahan berhenti di metafase" },
        { kata: "Larutan hipotonik", label: "Sel menggembung, kromosom tersebar" },
        { kata: "diwarnai hingga berpita", label: "Pewarnaan G: pita terang-gelap" },
        { kata: "lalu dijajarkan", fokus: "utuh", label: "Dijajarkan berpasangan" },
      ],
      narasi:
        "Caranya: sel darah putih dibiakkan, lalu diberi kolkisin (colchicine) agar pembelahannya berhenti di metafase (metaphase). Larutan hipotonik (hypotonic solution) membuat sel menggembung, kromosomnya disebar di kaca, diwarnai hingga berpita, dipotret, lalu dijajarkan menurut ukuran, sentromer, dan pita.",
    },
    {
      id: "membaca",
      tajuk: "Membaca kariotipe",
      tahap: "kelamin",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      isyarat: [
        { kata: "dua X pada", fokus: "xx", label: "46,XX · perempuan" },
        { kata: "X dan Y pada", fokus: "xy", label: "46,XY · laki-laki" },
        { kata: "jumlah seluruh kromosom", tahap: "kariotipe", fokus: "utuh", label: "Tepat 46?" },
      ],
      narasi:
        "Pasangan terakhir, pasangan ke-23, memberi tahu jenis kelamin kromosomnya: umumnya dua X pada perempuan, X dan Y pada laki-laki — ditulis 46,XX dan 46,XY. Dari gambar yang sama, jumlah seluruh kromosom juga bisa dihitung: tepat empat puluh enam, atau tidak.",
    },
    {
      id: "sapi",
      tajuk: "Kariotipe sapi",
      tahap: "kariotipe-sapi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Sapi punya", label: "Sapi · 2n = 60" },
        { kata: "semuanya akrosentrik", label: "29 pasang autosom akrosentrik" },
        { kata: "X-nya besar", fokus: "xy", label: "X besar · Y kecil" },
      ],
      narasi:
        "Tiap spesies punya kariotipe khasnya. Sapi punya enam puluh kromosom: dua puluh sembilan pasang autosom yang semuanya akrosentrik (acrocentric) — sentromernya dekat ujung — ditambah sepasang kromosom kelamin; X-nya besar, Y-nya kecil.",
    },
    {
      id: "penutup",
      tajuk: "Potret saat sel membelah",
      tahap: "kariotipe",
      durasi: 20,
      sorot: [],
      narasi:
        "Kariotipe adalah potret kromosom yang diambil saat sel sedang membelah. Pelajaran berikutnya memperlihatkan pembelahan itu sendiri: siklus sel dan mitosis.",
    },
  ],

  poinKunci: [
    "Kariotipe adalah susunan seluruh kromosom satu sel, dipotret saat sel membelah lalu dijajarkan menurut ukuran, letak sentromer, dan pola pita.",
    "Cara membuatnya: sel dibiakkan, dihentikan di metafase dengan kolkisin, digembungkan dengan larutan hipotonik, disebar di kaca, diwarnai (pewarnaan G), dipotret, lalu dijajarkan.",
    "Kariotipe manusia: 46 kromosom = 22 pasang autosom + 1 pasang kromosom kelamin; ditulis 46,XX atau 46,XY.",
    "Dari kariotipe, jumlah kromosom bisa dihitung — kelebihan atau kekurangan satu kromosom akan terlihat.",
    "Sapi: 2n = 60, dengan 29 pasang autosom yang semuanya akrosentrik.",
  ],

  istilah: [
    { id: "Kariotipe", en: "karyotype", arti: "Susunan seluruh kromosom sel, dijajarkan menurut ukuran, sentromer, dan pola pita." },
    { id: "Kolkisin", en: "colchicine", arti: "Zat yang merusak serat gelendong sehingga sel berhenti membelah di metafase." },
    { id: "Larutan hipotonik", en: "hypotonic solution", arti: "Larutan yang membuat sel menyerap air dan menggembung, agar kromosomnya tersebar." },
    { id: "Pewarnaan G", en: "G-banding", arti: "Pewarnaan Giemsa yang memberi setiap kromosom pola pita terang-gelap yang khas." },
    { id: "Autosom", en: "autosome", arti: "Kromosom selain kromosom kelamin; pada manusia 22 pasang." },
    { id: "Kromosom kelamin", en: "sex chromosome", arti: "Pasangan ke-23: umumnya XX pada perempuan, XY pada laki-laki." },
  ],

  rujukan: [
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 13 dan 15." },
    { teks: "NHGRI — Karyotype (Talking Glossary of Genomic and Genetic Terms)", url: "https://www.genome.gov/genetics-glossary/Karyotype" },
    { teks: "Nature Scitable — Karyotyping for Chromosomal Abnormalities.", url: "https://www.nature.com/scitable/topicpage/karyotyping-for-chromosomal-abnormalities-298/" },
    { teks: "Singh dkk. Cytogenetic characterization of cattle and buffalo. ICAR, 2017.", url: "https://epubs.icar.org.in/index.php/JLB/article/download/157910/56316/434335" },
  ],
};
