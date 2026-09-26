import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.7 — Menebak interaksi dari rasionya
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 tabel 1).
 * Semua rasio dijelaskan sebagai penggabungan empat kelompok 9 : 3 : 3 : 1.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D), set "kelompok".
 */

export const menebakRasio: Pelajaran = {
  slug: "menebak-interaksi-dari-rasio",
  nomor: "3.7",
  level: 3,
  judul: "Menebak interaksi dari rasionya",
  ringkas:
    "Semua interaksi dua gen berawal dari AaBb × AaBb: empat kelompok 9 : 3 : 3 : 1. Menggabungkan kelompok memberi 9 : 3 : 4, 12 : 3 : 1, 9 : 7, 9 : 6 : 1, 15 : 1, dan 13 : 3. Dari hasil hitungan, interaksinya bisa ditebak lalu diuji dengan khi-kuadrat.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "enam-belas",
      tajuk: "Enam belas kombinasi",
      tahap: "kelompok",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "enam belas kombinasi", fokus: "utuh", label: "AaBb × AaBb: 16 kombinasi" },
        { kata: "empat kelompok", fokus: "9331", label: "A_B_ 9 · A_bb 3 · aaB_ 3 · aabb 1" },
      ],
      narasi:
        "Semua interaksi dua gen di tingkat ini berawal dari persilangan dua dihibrid, AaBb × AaBb. Hasilnya enam belas kombinasi dalam empat kelompok: sembilan membawa dua alel dominan, tiga dan tiga membawa salah satunya, dan satu tanpa keduanya.",
    },
    {
      id: "pola-934",
      tajuk: "9 : 3 : 3 : 1 dan 9 : 3 : 4",
      tahap: "kelompok",
      fokus: "9331",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "9 : 3 : 3 : 1", fokus: "9331", label: "Empat kelompok berbeda: 9 : 3 : 3 : 1" },
        { kata: "9 : 3 : 4", fokus: "934", label: "aaB_ = aabb: 9 : 3 : 4" },
      ],
      narasi:
        "Bila keempat kelompok tampak berbeda, rasionya 9 : 3 : 3 : 1, seperti jengger ayam. Bila kelompok tanpa A tampak sama dengan kelompok tanpa keduanya, rasionya 9 : 3 : 4 — epistasis resesif, seperti tikus albino.",
    },
    {
      id: "pola-1231",
      tajuk: "12 : 3 : 1 dan 9 : 7",
      tahap: "kelompok",
      fokus: "1231",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "12 : 3 : 1", fokus: "1231", label: "A_B_ = A_bb: 12 : 3 : 1" },
        { kata: "9 : 7", fokus: "97", label: "Hanya A_B_ berbeda: 9 : 7" },
      ],
      narasi:
        "Bila alel dominan A menutupi gen B, kelompok sembilan dan kelompok tiga yang membawa A bergabung: 12 : 3 : 1, seperti warna labu. Bila hanya kelompok sembilan yang berbeda, rasionya 9 : 7 — gen komplementer.",
    },
    {
      id: "pola-961",
      tajuk: "9 : 6 : 1 dan 15 : 1",
      tahap: "kelompok",
      fokus: "961",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "9 : 6 : 1", fokus: "961", label: "A_bb = aaB_: 9 : 6 : 1" },
        { kata: "15 : 1", fokus: "151", label: "Satu alel dominan cukup: 15 : 1" },
      ],
      narasi:
        "Bila kelompok yang membawa salah satu alel dominan tampak sama, rasionya 9 : 6 : 1 — misalnya bentuk buah labu: cakram, bulat, dan lonjong. Bila cukup satu alel dominan dari gen mana pun, rasionya 15 : 1 — polimeri.",
    },
    {
      id: "pola-133",
      tajuk: "13 : 3",
      tahap: "kelompok",
      fokus: "133",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "13 : 3", fokus: "133", label: "Hanya aaB_ berwarna: 13 : 3" },
        { kata: "Leghorn putih", fokus: "133", label: "Leghorn putih × Wyandotte putih" },
      ],
      narasi:
        "Rasio 13 : 3 muncul bila alel dominan satu gen menghambat warna, sementara homozigot resesif gen yang lain juga tak berwarna. Contohnya ayam Leghorn putih disilangkan dengan Wyandotte putih: F2-nya 13 putih banding 3 berwarna.",
    },
    {
      id: "cara-menebak",
      tajuk: "Cara menebak",
      tahap: "kelompok",
      fokus: "hitung",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "90 agouti", fokus: "hitung", label: "90 : 30 : 40 = 160" },
        { kata: "sepuluh kali enam belas", fokus: "tebak", label: "÷ 10 → 9 : 3 : 4" },
      ],
      narasi:
        "Cara menebaknya: jumlahkan keturunan, lalu bandingkan dengan pola enam belasan. Misalnya 90 agouti, 30 hitam, dan 40 albino — totalnya 160, atau sepuluh kali enam belas. Jadi 9 : 3 : 4, epistasis resesif.",
    },
    {
      id: "khi-kuadrat",
      tajuk: "Uji khi-kuadrat",
      tahap: "kelompok",
      fokus: "tebak",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "khi-kuadrat", fokus: "tebak", label: "Uji khi-kuadrat (χ²)" },
        { kata: "Tingkat 3 selesai", fokus: "utuh", label: "Berikutnya: kelamin dan pautan" },
      ],
      narasi:
        "Hasil nyata jarang tepat. Untuk memutuskan apakah selisihnya masih wajar, ahli genetika memakai uji khi-kuadrat (chi-square test). Tingkat 3 selesai — berikutnya, gen di kromosom kelamin dan gen yang berpautan.",
    },
  ],

  poinKunci: [
    "Titik awal: AaBb × AaBb → A_B_ 9 : A_bb 3 : aaB_ 3 : aabb 1 (garis bawah = alel apa pun).",
    "9 : 3 : 3 : 1 — keempat kelompok berbeda (jengger ayam). 9 : 3 : 4 — epistasis resesif, aaB_ = aabb (tikus albino, Linaria).",
    "12 : 3 : 1 — epistasis dominan, A_B_ = A_bb (warna labu). 9 : 7 — gen komplementer, hanya A_B_ berbeda (kacang manis).",
    "9 : 6 : 1 — A_bb = aaB_ (bentuk labu: cakram, bulat, lonjong). 15 : 1 — polimeri, hanya aabb berbeda (gandum). 13 : 3 — hanya aaB_ berwarna (ayam Leghorn × Wyandotte).",
    "Cara menebak: jumlah total ÷ 16, lalu cocokkan pola. Uji khi-kuadrat (χ²) memeriksa apakah selisih dari rasio harapan masih bisa dianggap kebetulan.",
  ],

  istilah: [
    { id: "Rasio harapan", en: "expected ratio", arti: "Perbandingan yang diramalkan dari hipotesis pewarisan." },
    { id: "Uji khi-kuadrat", en: "chi-square test", arti: "Uji statistik untuk membandingkan hasil nyata dengan harapan." },
    { id: "Epistasis", en: "epistasis", arti: "Gen yang menutupi pengaruh gen lain." },
    { id: "Gen komplementer", en: "complementary genes", arti: "Dua gen yang harus hadir bersama agar sifat muncul." },
    { id: "Polimeri", en: "polymeric genes", arti: "Beberapa gen yang pengaruhnya saling menjumlah." },
  ],

  rujukan: [
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Pierce BA. Genetics: A Conceptual Approach, edisi ke-6. W. H. Freeman, 2017. Bab 5." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3, tabel 1." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 7." },
  ],
};
