import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.6 — Penyakit genetik pada manusia dan ternak
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 9
 * dengan koreksi: BSE dan PRRS BUKAN penyakit genetik). Bahan belajar, bukan
 * nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const penyakitGenetik: Pelajaran = {
  slug: "penyakit-genetik",
  nomor: "5.6",
  level: 5,
  judul: "Penyakit genetik pada manusia dan ternak",
  ringkas:
    "Penyakit genetik berasal dari perubahan materi genetik. Talasemia (autosom resesif) umum di Indonesia; uji pembawa membantu keluarga memahami peluangnya. Pada ternak, uji DNA hampir menghapus BLAD dari sapi Holstein. BSE dan PRRS menular, bukan penyakit genetik.",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "pengantar",
      tajuk: "Penyakit genetik",
      tahap: "penyakit",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "satu gen", fokus: "utuh", label: "Satu gen: mengikuti pola Mendel" },
        { kata: "banyak gen", fokus: "utuh", label: "Banyak gen + lingkungan" },
        { kata: "bukan nasihat medis", fokus: "utuh", label: "Bahan belajar, bukan nasihat medis" },
      ],
      narasi:
        "Penyakit genetik disebabkan perubahan materi genetik. Sebagian ditentukan satu gen dan mengikuti pola Mendel; sebagian lain melibatkan banyak gen dan lingkungan. Ini bahan belajar, bukan nasihat medis.",
    },
    {
      id: "talasemia",
      tajuk: "Talasemia",
      tahap: "talasemia",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Talasemia", fokus: "utuh", label: "Talasemia: autosom resesif" },
        { kata: "tiga sampai sepuluh persen", fokus: "utuh", label: "Pembawa ± 3–10% penduduk Indonesia" },
        { kata: "Dua pembawa", fokus: "anak", label: "Pembawa × pembawa → ¼ talasemia mayor" },
      ],
      narasi:
        "Talasemia adalah penyakit darah autosom resesif yang cukup umum di Indonesia; pembawanya diperkirakan tiga sampai sepuluh persen penduduk. Dua pembawa berpeluang seperempat mempunyai anak penderita talasemia mayor.",
    },
    {
      id: "uji-pembawa",
      tajuk: "Uji pembawa",
      tahap: "talasemia",
      fokus: "uji",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "pemeriksaan darah dan DNA", fokus: "uji", label: "Pembawa diketahui lewat uji darah dan DNA" },
        { kata: "sebelum menikah", fokus: "uji", label: "Uji pembawa sebelum menikah" },
      ],
      narasi:
        "Karena pembawa tampak sehat, keberadaannya hanya bisa diketahui lewat pemeriksaan darah dan DNA. Uji pembawa sebelum menikah membantu keluarga memahami peluang bagi anak-anaknya.",
    },
    {
      id: "ternak",
      tajuk: "Penyakit genetik ternak",
      tahap: "ternakPenyakit",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "BLAD", fokus: "utuh", label: "BLAD: sapi Holstein, autosom resesif" },
        { kata: "hipertermia malignan", fokus: "babi", label: "Babi: hipertermia malignan (RYR1)" },
      ],
      narasi:
        "Ternak juga punya penyakit genetik. Contohnya BLAD pada sapi Holstein, yang melemahkan sel darah putih, dan hipertermia malignan pada babi, yang dipicu stres.",
    },
    {
      id: "seleksi",
      tajuk: "Diberantas lewat uji DNA",
      tahap: "ternakPenyakit",
      fokus: "uji",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "uji DNA", fokus: "uji", label: "Uji DNA pejantan" },
        { kata: "hampir hilang", fokus: "uji", label: "BLAD hampir hilang dalam beberapa tahun" },
      ],
      narasi:
        "Peternak memberantasnya dengan uji DNA: pejantan pembawa tidak dipakai untuk inseminasi buatan. Dengan cara ini, BLAD hampir hilang dari populasi Holstein dunia hanya dalam beberapa tahun.",
    },
    {
      id: "bukan-genetik",
      tajuk: "Bukan penyakit genetik",
      tahap: "ternakPenyakit",
      fokus: "bukan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "sapi gila (BSE)", fokus: "bukan", label: "BSE: prion" },
        { kata: "PRRS", fokus: "bukan", label: "PRRS: virus" },
        { kata: "bukan diwariskan", fokus: "bukan", label: "Menular, bukan diwariskan" },
      ],
      narasi:
        "Tidak semua penyakit di peternakan bersifat genetik. Penyakit sapi gila (BSE) disebabkan prion, dan PRRS pada babi disebabkan virus. Keduanya menular, bukan diwariskan lewat gen.",
    },
    {
      id: "penutup",
      tajuk: "Tingkat 5 selesai",
      tahap: "penyakit",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Tingkat 5 selesai", fokus: "utuh", label: "Dari satu basa sampai satu set kromosom" },
        { kata: "Tingkat 6", fokus: "utuh", label: "Berikutnya: populasi dan laboratorium" },
      ],
      narasi:
        "Tingkat 5 selesai: materi genetik bisa berubah, dari satu basa sampai satu set kromosom. Di Tingkat 6 kita beralih dari individu ke populasi, lalu ke laboratorium.",
    },
  ],

  poinKunci: [
    "Penyakit genetik: monogenik (pola Mendel), kromosom (aneuploidi, struktur), dan multifaktor (banyak gen + lingkungan).",
    "Talasemia β dan α: autosom resesif; frekuensi pembawa di Indonesia ± 3–10% (bervariasi antardaerah). Pembawa × pembawa → ¼ talasemia mayor, ½ pembawa, ¼ normal.",
    "Uji pembawa (skrining darah + analisis DNA) dan konseling genetik membantu keluarga memahami peluang; keputusan tetap milik keluarga. Ini bahan belajar, bukan nasihat medis.",
    "Ternak: BLAD (bovine leukocyte adhesion deficiency, gen ITGB2) pada Holstein; hipertermia malignan/sindrom stres babi (RYR1). Uji DNA pejantan hampir menghapus BLAD sejak 1990-an.",
    "Koreksi buku rujukan: R2 bab 9 menyebut BSE dan PRRS penyakit genetik. BSE disebabkan prion, PRRS oleh virus — keduanya penyakit menular.",
  ],

  istilah: [
    { id: "Penyakit genetik", en: "genetic disorder", arti: "Penyakit akibat perubahan materi genetik." },
    { id: "Talasemia", en: "thalassemia", arti: "Kelainan pembentukan hemoglobin, diwariskan autosom resesif." },
    { id: "Uji pembawa", en: "carrier screening", arti: "Pemeriksaan untuk mengetahui apakah seseorang pembawa." },
    { id: "Konseling genetik", en: "genetic counseling", arti: "Pendampingan keluarga memahami risiko genetik." },
    { id: "Prion", en: "prion", arti: "Protein salah lipat yang menular, penyebab BSE." },
  ],

  rujukan: [
    { teks: "Kementerian Kesehatan RI. Pedoman Nasional Pelayanan Kedokteran Tata Laksana Thalasemia. 2018." },
    { teks: "Shuster DE, dkk. Identification and prevalence of a genetic defect that causes leukocyte adhesion deficiency in Holstein cattle. PNAS 89:9225–9229, 1992." },
    { teks: "Fujii J, dkk. Identification of a mutation in porcine ryanodine receptor associated with malignant hyperthermia. Science 253:448–451, 1991." },
    { teks: "Prusiner SB. Prions. PNAS 95:13363–13383, 1998." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 9 (dengan koreksi, lihat Ringkasan)." },
  ],
};
