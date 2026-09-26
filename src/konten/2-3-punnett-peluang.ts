import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.3 — Diagram Punnett dan hukum peluang
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md
 * (R3 2.2.1 dan 3.1.5). Contoh manusia: albinisme (dari 1.7), sebagai contoh
 * peluang, bukan nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 2 (Mendel3D).
 */

export const punnettPeluang: Pelajaran = {
  slug: "punnett-dan-peluang",
  nomor: "2.3",
  level: 2,
  judul: "Diagram Punnett dan hukum peluang",
  ringkas:
    "Meramal hasil persilangan dengan kotak Punnett, lalu dengan dua kaidah peluang: perkalian untuk kejadian bebas yang terjadi bersamaan, penjumlahan untuk jalan-jalan yang saling lepas.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "punnett",
      tajuk: "Kotak Punnett",
      tahap: "punnett",
      fokus: "kosong",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Reginald Punnett", fokus: "kosong", label: "Reginald Punnett · awal 1900-an" },
        { kata: "Rr dengan Rr", fokus: "kosong", label: "Rr × Rr" },
      ],
      narasi:
        "Untuk meramal hasil persilangan, ahli genetika Inggris Reginald Punnett membuat diagram kotak sederhana pada awal 1900-an. Kita coba pada persilangan Rr dengan Rr.",
    },
    {
      id: "susun",
      tajuk: "Mengisi kotak",
      tahap: "punnett",
      fokus: "kepala",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "ditulis di atas", fokus: "kepala", sorot: ["gamet"], label: "Gamet satu induk di atas" },
        { kata: "di samping", fokus: "kepala", sorot: ["gamet"], label: "Gamet induk lain di samping" },
        { kata: "Setiap kotak diisi", fokus: "isi", sorot: [], label: "Gabungkan baris dan kolom" },
      ],
      narasi:
        "Gamet dari satu induk ditulis di atas, gamet dari induk lainnya di samping. Setiap kotak diisi gabungan huruf dari baris dan kolomnya: RR, Rr, Rr, dan rr.",
    },
    {
      id: "baca",
      tajuk: "Membaca hasil",
      tahap: "punnett",
      fokus: "isi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Genotip:", fokus: "isi", label: "Genotip 1 RR : 2 Rr : 1 rr" },
        { kata: "Fenotip:", fokus: "isi", sorot: ["bijiBulat"], label: "Fenotip 3 bulat : 1 keriput" },
        { kata: "seperempat", fokus: "isi", sorot: [], label: "Tiap kotak: peluang ¼" },
      ],
      narasi:
        "Kini tinggal dihitung. Genotip: satu RR, dua Rr, satu rr — satu banding dua banding satu. Fenotip: tiga bulat dan satu keriput — tiga banding satu. Setiap kotak mewakili peluang yang sama, yaitu seperempat.",
    },
    {
      id: "peluang",
      tajuk: "Peluang",
      tahap: "koin",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "peluang (probability)", fokus: "utuh", label: "Peluang" },
        { kata: "adalah setengah", fokus: "satu", label: "Gamet R: peluang ½" },
      ],
      narasi:
        "Kotak Punnett sebenarnya alat menghitung peluang (probability). Peluang tanaman Rr memberikan gamet R adalah setengah, sama seperti peluang sebuah koin jatuh pada satu sisinya.",
    },
    {
      id: "perkalian",
      tajuk: "Kaidah perkalian",
      tahap: "koin",
      fokus: "dua",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kaidah perkalian", fokus: "dua", label: "Bebas dan bersamaan → kalikan" },
        { kata: "Peluang anak RR", fokus: "dua", label: "RR = ½ × ½ = ¼" },
      ],
      narasi:
        "Kaidah perkalian: peluang dua kejadian bebas terjadi bersamaan adalah hasil kali peluang masing-masing. Peluang anak RR sama dengan setengah untuk R dari ayah, kali setengah untuk R dari ibu — yaitu seperempat.",
    },
    {
      id: "penjumlahan",
      tajuk: "Kaidah penjumlahan",
      tahap: "koin",
      fokus: "tambah",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Kaidah penjumlahan", fokus: "tambah", label: "Jalan saling lepas → jumlahkan" },
        { kata: "dua jalan", fokus: "tambah", label: "Rr = ¼ + ¼ = ½" },
      ],
      narasi:
        "Kaidah penjumlahan: bila suatu hasil bisa terjadi lewat beberapa jalan yang saling lepas, peluangnya dijumlahkan. Rr bisa terjadi lewat dua jalan — R dari ayah, atau R dari ibu — sehingga seperempat ditambah seperempat, yaitu setengah.",
    },
    {
      id: "fenotip",
      tajuk: "Peluang biji bulat",
      tahap: "punnett",
      fokus: "isi",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Peluang biji bulat", fokus: "isi", sorot: ["bijiBulat"], label: "Bulat = ¼ + ½ = ¾" },
        { kata: "tanpa menggambar", fokus: "isi", sorot: [], label: "Sama dengan kotak Punnett" },
      ],
      narasi:
        "Peluang biji bulat sama dengan peluang RR ditambah peluang Rr: seperempat ditambah setengah, yaitu tiga perempat. Hasilnya sama dengan kotak Punnett, tetapi tanpa menggambar.",
    },
    {
      id: "manusia",
      tajuk: "Setiap kelahiran terpisah",
      tahap: "keluarga",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "setiap kelahiran", fokus: "utuh", label: "Tiap kelahiran: peluang terpisah" },
        { kata: "adalah seperempat", fokus: "sel", label: "Aa × Aa → ¼ aa (albino)" },
        { kata: "tidak mengubah peluang", fokus: "utuh", label: "Anak kedua: tetap ¼" },
      ],
      narasi:
        "Peluang berlaku pada setiap kelahiran secara terpisah. Bila kedua orang tua membawa satu alel albinisme (Aa), peluang tiap anak albino adalah seperempat — anak pertama yang albino tidak mengubah peluang anak kedua.",
    },
    {
      id: "manfaat",
      tajuk: "Punnett atau peluang?",
      tahap: "punnett",
      fokus: "isi",
      durasi: 18,
      sorot: [],
      isyarat: [{ kata: "jauh lebih ringkas", fokus: "isi", label: "Berikutnya: dihibrid dan trihibrid" }],
      narasi:
        "Punnett membantu memahami; peluang membuat cepat. Untuk dua atau tiga sifat sekaligus, cara peluang jauh lebih ringkas — seperti yang akan kita lihat pada persilangan dihibrid dan trihibrid.",
    },
  ],

  poinKunci: [
    "Kotak Punnett (R. C. Punnett): gamet satu induk di baris atas, gamet induk lain di kolom kiri; tiap kotak = satu kombinasi dengan peluang sama.",
    "Kaidah perkalian: P(A dan B) = P(A) × P(B) untuk kejadian yang saling bebas. Contoh: P(RR) dari Rr × Rr = ½ × ½ = ¼.",
    "Kaidah penjumlahan: P(A atau B) = P(A) + P(B) untuk kejadian yang saling lepas. Contoh: P(Rr) = ¼ + ¼ = ½; P(bulat) = ¼ + ½ = ¾.",
    "Setiap kelahiran adalah kejadian bebas: peluang tidak “ingat” hasil sebelumnya.",
    "Contoh manusia (albinisme, Aa × Aa): ¼ AA, ½ Aa (pembawa), ¼ aa (albino). Ini contoh hitungan peluang, bukan nasihat medis.",
  ],

  istilah: [
    { id: "Kotak Punnett", en: "Punnett square", arti: "Diagram kotak untuk meramal hasil persilangan." },
    { id: "Peluang", en: "probability", arti: "Besarnya kemungkinan suatu kejadian, antara 0 dan 1." },
    { id: "Kaidah perkalian", en: "product rule", arti: "Peluang dua kejadian bebas terjadi bersamaan = hasil kali peluangnya." },
    { id: "Kaidah penjumlahan", en: "sum rule", arti: "Peluang salah satu dari beberapa kejadian saling lepas = jumlah peluangnya." },
    { id: "Kejadian bebas", en: "independent events", arti: "Kejadian yang tidak memengaruhi satu sama lain." },
    { id: "Pembawa", en: "carrier", arti: "Heterozigot yang membawa alel resesif tanpa menampakkannya." },
  ],

  rujukan: [
    { teks: "Punnett RC. Mendelism. Macmillan and Bowes, 1905." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 2." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.2." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 2.2.1 dan 3.1.5." },
  ],
};
