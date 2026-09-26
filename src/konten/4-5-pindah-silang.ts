import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.5 — Pindah silang dan rekombinasi
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 5.2–5.4).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const pindahSilang: Pelajaran = {
  slug: "pindah-silang-rekombinasi",
  nomor: "4.5",
  level: 4,
  judul: "Pindah silang dan rekombinasi",
  ringkas:
    "Pada profase I, kromatid bukan-saudara dari homolog bertukar potongan (pindah silang) di kiasma. Hasilnya dua gamet tipe parental dan dua gamet rekombinan. Makin jauh jarak dua gen, makin sering pindah silang di antaranya; pindah silang ganda bisa menyembunyikan rekombinasi.",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "pertukaran",
      tajuk: "Homolog bertukar potongan",
      tahap: "silang",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "berpasangan rapat", fokus: "utuh", sorot: ["kromatin", "kromosomAyah"], label: "Profase I: homolog berpasangan" },
        { kata: "bertukar potongan", fokus: "tukar", sorot: [], label: "Kromatid bukan-saudara bertukar potongan" },
        { kata: "pindah silang (crossing over)", fokus: "tukar", label: "Pindah silang" },
      ],
      narasi:
        "Pada profase I meiosis, kromosom homolog berpasangan rapat. Kromatid bukan-saudara bisa patah di titik yang sama lalu bertukar potongan. Peristiwa ini disebut pindah silang (crossing over).",
    },
    {
      id: "kiasma",
      tajuk: "Kiasma",
      tahap: "silang",
      fokus: "kiasma",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "kiasma (chiasma)", fokus: "kiasma", label: "Kiasma: titik persilangan" },
        { kata: "setidaknya satu", fokus: "tukar", label: "Tiap pasang homolog: ≥ 1 pindah silang" },
      ],
      narasi:
        "Titik tempat kromatid bersilangan tampak di bawah mikroskop sebagai kiasma (chiasma), berbentuk seperti huruf X. Setiap pasangan homolog manusia biasanya mengalami setidaknya satu pindah silang di setiap meiosis.",
    },
    {
      id: "rekombinan",
      tajuk: "Parental dan rekombinan",
      tahap: "silang",
      fokus: "gamet",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tipe parental", fokus: "gamet", label: "AB dan ab: tipe parental" },
        { kata: "gamet rekombinan", fokus: "gamet", label: "Ab dan aB: rekombinan" },
      ],
      narasi:
        "Setelah meiosis selesai, dua dari empat gamet membawa kombinasi alel seperti induknya — gamet tipe parental. Dua lainnya membawa kombinasi baru — gamet rekombinan (recombinant).",
    },
    {
      id: "jarak",
      tajuk: "Jarak menentukan peluang",
      tahap: "jarak",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Makin jauh jarak", fokus: "jauh", label: "A–C jauh: sering terpisah" },
        { kata: "frekuensi rekombinasi", fokus: "utuh", label: "Frekuensi rekombinasi ∝ jarak" },
      ],
      narasi:
        "Makin jauh jarak dua gen di kromosom, makin besar peluang pindah silang terjadi di antara keduanya. Karena itu frekuensi rekombinasi (recombination frequency) bisa dipakai untuk mengukur jarak antargen.",
    },
    {
      id: "ganda",
      tajuk: "Pindah silang ganda",
      tahap: "ganda",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "dua kali", fokus: "utuh", label: "Dua titik pindah silang" },
        { kata: "mengembalikan susunan luar", fokus: "hasil", label: "A dan C kembali seperti induk; hanya B yang tertukar" },
      ],
      narasi:
        "Bila dua gen berjauhan, pindah silang bisa terjadi dua kali di antara keduanya — pindah silang ganda (double crossing over). Pertukaran kedua mengembalikan susunan luar, sehingga gamet tampak seperti tipe parental.",
    },
    {
      id: "variasi",
      tajuk: "Sumber variasi",
      tahap: "silang",
      fokus: "gamet",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "sumber variasi", fokus: "gamet", label: "Pindah silang + asortasi bebas → variasi" },
        { kata: "kembar identik", fokus: "gamet", label: "Saudara kandung tak pernah sama persis" },
      ],
      narasi:
        "Pindah silang adalah sumber variasi yang penting. Bersama asortasi bebas, ia membuat setiap gamet hampir pasti berbeda — alasan tidak ada dua saudara kandung yang sama persis, kecuali kembar identik.",
    },
  ],

  poinKunci: [
    "Pindah silang (crossing over): pertukaran potongan antara kromatid bukan-saudara dari kromosom homolog pada profase I (tahap pakiten); tampak sebagai kiasma.",
    "Satu pindah silang antara gen A dan B menghasilkan 2 gamet parental (AB, ab) dan 2 rekombinan (Ab, aB) dari satu meiosis.",
    "Frekuensi rekombinasi tidak pernah melebihi 50%: gen yang sangat berjauhan tampak berpadu bebas.",
    "Pindah silang ganda di antara dua gen luar mengembalikan kombinasi luar (A…C), sehingga rekombinasi terhitung terlalu sedikit; hanya gen di tengah yang tertukar.",
    "Manusia: rata-rata ± 50 pindah silang per meiosis; setiap pasang homolog umumnya mengalami minimal satu (kiasma wajib).",
  ],

  istilah: [
    { id: "Pindah silang", en: "crossing over", arti: "Pertukaran potongan antara kromatid homolog saat meiosis." },
    { id: "Kiasma", en: "chiasma", arti: "Titik persilangan kromatid yang terlihat di mikroskop (jamak: kiasmata)." },
    { id: "Rekombinasi", en: "recombination", arti: "Terbentuknya kombinasi alel baru." },
    { id: "Frekuensi rekombinasi", en: "recombination frequency", arti: "Persentase keturunan rekombinan." },
    { id: "Pindah silang ganda", en: "double crossing over", arti: "Dua pindah silang di antara dua gen." },
  ],

  rujukan: [
    { teks: "Creighton HB, McClintock B. A correlation of cytological and genetical crossing-over in Zea mays. PNAS 17:492–497, 1931." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 4." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 13.4 dan 15.3." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 5.2–5.4." },
  ],
};
