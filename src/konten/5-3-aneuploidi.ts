import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.3 — Aneuploidi dan gagal berpisah
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 1.5.3.2
 * dan 6.2). Menyentuh kelainan pada manusia: bahan belajar, bukan nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const aneuploidi: Pelajaran = {
  slug: "aneuploidi-gagal-berpisah",
  nomor: "5.3",
  level: 5,
  judul: "Aneuploidi dan gagal berpisah",
  ringkas:
    "Bila kromosom gagal berpisah saat meiosis, gamet menjadi n + 1 atau n − 1 dan zigotnya aneuploid: trisomi, monosomi, atau nulisomi. Contoh: sindrom Down (trisomi 21, makin sering dengan usia ibu), Turner (45,X), Klinefelter (47,XXY).",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "gagal-berpisah",
      tajuk: "Gagal berpisah",
      tahap: "nondisjunction",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "gagal berpisah (nondisjunction)", fokus: "utuh", label: "Gagal berpisah (nondisjunction)" },
        { kata: "kelebihan satu", fokus: "gamet", label: "Gamet n + 1 dan n − 1" },
      ],
      narasi:
        "Kadang sepasang kromosom gagal berpisah saat meiosis — disebut gagal berpisah (nondisjunction). Akibatnya satu gamet mendapat kelebihan satu kromosom, dan gamet lain kekurangan satu.",
    },
    {
      id: "meiosis-i-ii",
      tajuk: "Meiosis I atau II",
      tahap: "nondisjunction",
      fokus: "gamet",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "di meiosis I", fokus: "gamet", label: "Meiosis I: homolog tak terpisah" },
        { kata: "di meiosis II", fokus: "dua", label: "Meiosis II: kromatid saudara tak terpisah" },
      ],
      narasi:
        "Gagal berpisah bisa terjadi di meiosis I, saat homolog tidak terpisah, atau di meiosis II, saat kromatid saudara tidak terpisah. Keduanya menghasilkan gamet yang kelebihan dan kekurangan satu kromosom.",
    },
    {
      id: "istilah",
      tajuk: "Trisomi, monosomi, nulisomi",
      tahap: "aneuploid",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "aneuploidi (aneuploidy)", fokus: "utuh", label: "Aneuploidi: jumlah kromosom menyimpang" },
        { kata: "Trisomi", fokus: "tri", label: "Trisomi: 2n + 1" },
        { kata: "monosomi", fokus: "mono", label: "Monosomi: 2n − 1" },
        { kata: "nulisomi", fokus: "nuli", label: "Nulisomi: 2n − 2" },
      ],
      narasi:
        "Bila gamet itu dibuahi, jumlah kromosom zigot menyimpang — disebut aneuploidi (aneuploidy). Trisomi (trisomy) berarti satu kromosom ada tiga; monosomi (monosomy) berarti hanya satu; nulisomi berarti sepasang hilang sama sekali.",
    },
    {
      id: "down",
      tajuk: "Sindrom Down",
      tahap: "down",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "trisomi 21", fokus: "k21", label: "Trisomi 21: tiga kromosom 21" },
        { kata: "usia ibu", fokus: "usia", label: "Peluang naik seiring usia ibu" },
      ],
      narasi:
        "Sindrom Down disebabkan trisomi 21: tiga salinan kromosom 21. Peluangnya meningkat seiring usia ibu — sekitar satu per 1.500 kelahiran pada ibu berusia 20 tahun, dan sekitar satu per 100 pada usia 40 tahun.",
    },
    {
      id: "kromosom-kelamin",
      tajuk: "Turner dan Klinefelter",
      tahap: "kelaminAneu",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Sindrom Turner", fokus: "turner", label: "Turner: 45,X" },
        { kata: "Sindrom Klinefelter", fokus: "klinefelter", label: "Klinefelter: 47,XXY" },
      ],
      narasi:
        "Aneuploidi kromosom kelamin lebih sering bertahan. Sindrom Turner (45,X) terjadi pada perempuan yang hanya memiliki satu X. Sindrom Klinefelter (47,XXY) terjadi pada laki-laki yang memiliki satu X tambahan.",
    },
    {
      id: "ternak",
      tajuk: "Aneuploidi pada ternak",
      tahap: "aneuploid",
      fokus: "ternak",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "gugur dini", fokus: "ternak", label: "Kebanyakan embrio aneuploid gugur dini" },
        { kata: "63,X", fokus: "ternak", label: "Kuda betina 63,X: biasanya mandul" },
      ],
      narasi:
        "Aneuploidi juga terjadi pada ternak. Sebagian besar embrio aneuploid gugur dini — salah satu penyebab kegagalan kebuntingan. Kuda betina yang hanya memiliki satu X (63,X) biasanya mandul.",
    },
  ],

  poinKunci: [
    "Gagal berpisah (nondisjunction) di meiosis I (homolog) atau meiosis II (kromatid saudara) menghasilkan gamet n + 1 dan n − 1.",
    "Aneuploidi: trisomi (2n + 1), monosomi (2n − 1), nulisomi (2n − 2). Pada manusia hanya trisomi 13, 18, 21 dan aneuploidi kromosom kelamin yang sering lahir hidup.",
    "Sindrom Down (47,+21): ± 1/1.500 pada ibu 20 tahun, ± 1/100 pada 40 tahun; sebagian besar karena gagal berpisah meiosis I pada ibu.",
    "Turner 45,X (perempuan, biasanya mandul); Klinefelter 47,XXY (laki-laki, biasanya mandul); juga 47,XXX dan 47,XYY.",
    "Ternak: aneuploidi penyebab penting kematian embrio dini; kuda betina 63,X (normal 64,XX) umumnya mandul. Ini bahan belajar, bukan nasihat medis.",
  ],

  istilah: [
    { id: "Gagal berpisah", en: "nondisjunction", arti: "Kromosom atau kromatid tidak terpisah saat pembelahan." },
    { id: "Aneuploidi", en: "aneuploidy", arti: "Jumlah kromosom kurang atau lebih satu atau beberapa." },
    { id: "Trisomi", en: "trisomy", arti: "Satu jenis kromosom ada tiga salinan (2n + 1)." },
    { id: "Monosomi", en: "monosomy", arti: "Satu jenis kromosom hanya satu salinan (2n − 1)." },
    { id: "Nulisomi", en: "nullisomy", arti: "Sepasang kromosom hilang (2n − 2)." },
  ],

  rujukan: [
    { teks: "Hassold T, Hunt P. To err (meiotically) is human: the genesis of human aneuploidy. Nature Reviews Genetics 2:280–291, 2001." },
    { teks: "Morris JK, dkk. Revised estimates of the maternal age specific live birth prevalence of Down's syndrome. Journal of Medical Screening 9:2–6, 2002." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 1.5.3.2 dan 6.2." },
    { teks: "Nicholas FW. Introduction to Veterinary Genetics, edisi ke-3. Wiley-Blackwell, 2010." },
  ],
};
