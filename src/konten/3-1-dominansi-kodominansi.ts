import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.1 — Dominansi tidak sempurna dan kodominansi
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 5;
 * R3 3.1.2 & 3.1.4). Kekeliruan R3 hlm. 55 (sapi roan dari merah × merah) tidak
 * diikuti: roan lahir dari merah × putih.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const dominansiKodominansi: Pelajaran = {
  slug: "dominansi-tidak-sempurna-kodominansi",
  nomor: "3.1",
  level: 3,
  judul: "Dominansi tidak sempurna dan kodominansi",
  ringkas:
    "Tidak semua heterozigot tampak seperti homozigot dominan. Bunga pukul empat merah × putih memberi merah muda (dominansi tidak sempurna); golongan darah MN dan sapi roan menampilkan kedua alel sekaligus (kodominansi). F2 keduanya 1 : 2 : 1.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "bunga-pukul-empat",
      tajuk: "Merah × putih = merah muda",
      tahap: "mirabilis",
      fokus: "p",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Carl Correns", fokus: "p", label: "P: merah × putih" },
        { kata: "merah muda", fokus: "f1", label: "F1: semua merah muda" },
      ],
      narasi:
        "Pada kacang ercis, heterozigot tampak sama dengan homozigot dominan. Tidak semua gen begitu. Carl Correns menyilangkan bunga pukul empat (Mirabilis jalapa) berbunga merah dengan yang berbunga putih — dan seluruh F1-nya berbunga merah muda.",
    },
    {
      id: "tidak-sempurna",
      tajuk: "Dominansi tidak sempurna",
      tahap: "mirabilis",
      fokus: "f1",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "dominansi tidak sempurna", fokus: "f1", label: "Dominansi tidak sempurna" },
        { kata: "separuh jumlah pigmen", fokus: "f1", sorot: ["bungaMerahMuda"], label: "Satu alel merah → ± separuh pigmen" },
      ],
      narasi:
        "Inilah dominansi tidak sempurna (incomplete dominance): fenotip heterozigot berada di antara kedua induknya. Alel merah membuat pigmen; pada heterozigot, satu salinan alel itu hanya menghasilkan sekitar separuh jumlah pigmen, sehingga bunganya merah muda.",
    },
    {
      id: "f2",
      tajuk: "F2: 1 : 2 : 1",
      tahap: "mirabilis",
      fokus: "f2",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "F2-nya", fokus: "f2", label: "F2: 1 merah : 2 merah muda : 1 putih" },
        { kata: "rasio genotip", fokus: "f2", label: "Rasio fenotip = rasio genotip" },
      ],
      narasi:
        "Bila F1 merah muda disilangkan sesamanya, F2-nya terdiri atas merah, merah muda, dan putih dengan perbandingan satu banding dua banding satu. Di sini rasio fenotip sama dengan rasio genotip, karena setiap genotip punya tampilannya sendiri.",
    },
    {
      id: "bukan-campuran",
      tajuk: "Bukan pencampuran",
      tahap: "mirabilis",
      fokus: "f2",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "bukan pencampuran", fokus: "f2", label: "Bukan pencampuran seperti cat" },
        { kata: "muncul kembali utuh", fokus: "f2", sorot: ["bungaMerah", "bungaPutih"], label: "Merah dan putih kembali utuh" },
      ],
      narasi:
        "Ini bukan pencampuran seperti cat. Kalau alel bercampur, merah dan putih tak akan muncul lagi. Nyatanya keduanya muncul kembali utuh di F2 — alelnya tidak berubah, hanya cara keduanya tampil pada heterozigot.",
    },
    {
      id: "kodominansi",
      tajuk: "Kodominansi: golongan darah MN",
      tahap: "mn",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "golongan darah MN", fokus: "utuh", label: "Golongan darah MN" },
        { kata: "antigen M", fokus: "mm", sorot: ["antigenM"], label: "Golongan M: antigen M" },
        { kata: "antigen N", fokus: "nn", sorot: ["antigenN"], label: "Golongan N: antigen N" },
        { kata: "keduanya sekaligus", fokus: "mn", sorot: ["antigenM", "antigenN"], label: "Golongan MN: keduanya" },
      ],
      narasi:
        "Pada kodominansi (codominance), kedua alel tampak sepenuhnya pada heterozigot. Contohnya golongan darah MN. Orang bergolongan M membawa antigen M di sel darah merahnya, bergolongan N membawa antigen N, dan bergolongan MN membawa keduanya sekaligus.",
    },
    {
      id: "roan",
      tajuk: "Sapi roan",
      tahap: "roan",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Sapi merah", fokus: "utuh", sorot: ["buluMerah", "buluPutih"], label: "Shorthorn: merah × putih" },
        { kata: "anak roan", fokus: "anak", sorot: [], label: "Anak: roan" },
        { kata: "Dari dekat", fokus: "helai", label: "Tiap helai merah ATAU putih" },
      ],
      narasi:
        "Contoh ternak: sapi Shorthorn. Sapi merah yang disilangkan dengan sapi putih melahirkan anak roan — bulunya campuran helai merah dan helai putih. Dari dekat, setiap helai tetap merah atau putih: kedua alel tampil berdampingan.",
    },
    {
      id: "bedanya",
      tajuk: "Bedanya",
      tahap: "banding",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dominansi tidak sempurna", fokus: "kiri", label: "Tidak sempurna: di tengah-tengah" },
        { kata: "Pada kodominansi", fokus: "kanan", label: "Kodominansi: berdampingan" },
        { kata: "Keduanya memberi", fokus: "utuh", label: "Keduanya: F2 1 : 2 : 1" },
      ],
      narasi:
        "Bedanya: pada dominansi tidak sempurna, heterozigot tampak di tengah-tengah, seperti merah muda. Pada kodominansi, kedua fenotip tampak berdampingan, seperti roan. Keduanya memberi F2 satu banding dua banding satu, dan keduanya tetap patuh Hukum Mendel.",
    },
  ],

  poinKunci: [
    "Dominansi penuh: heterozigot = homozigot dominan (ercis). Dominansi tidak sempurna: heterozigot di antara keduanya (merah muda). Kodominansi: kedua fenotip tampil bersamaan (MN, roan).",
    "Pada dominansi tidak sempurna dan kodominansi, rasio F2 fenotip = rasio genotip = 1 : 2 : 1, karena heterozigot punya fenotip sendiri.",
    "Bunga pukul empat (Mirabilis jalapa): merah × putih → F1 merah muda → F2 1 merah : 2 merah muda : 1 putih. Alel tidak bercampur; merah dan putih muncul kembali utuh.",
    "Golongan darah MN (gen GYPA): genotip LᴹLᴹ → M, LᴹLᴺ → MN, LᴺLᴺ → N.",
    "Sapi Shorthorn: merah × putih → roan (helai merah dan helai putih bercampur). Koreksi buku rujukan: R3 hlm. 55 menulis roan dari merah × merah; yang benar merah × putih.",
    "Dominan–resesif menggambarkan hubungan antara ALEL pada satu gen, bukan kekuatan alel; alel dominan tidak selalu paling umum di populasi.",
  ],

  istilah: [
    { id: "Dominansi tidak sempurna", en: "incomplete dominance", arti: "Heterozigot tampak di antara kedua homozigot." },
    { id: "Kodominansi", en: "codominance", arti: "Kedua alel tampak sepenuhnya pada heterozigot." },
    { id: "Antigen", en: "antigen", arti: "Molekul di permukaan sel yang dikenali sistem kekebalan." },
    { id: "Roan", en: "roan", arti: "Bulu campuran helai merah dan helai putih pada sapi atau kuda." },
    { id: "Bunga pukul empat", en: "four o'clock flower", arti: "Mirabilis jalapa; bunganya mekar sore hari." },
  ],

  rujukan: [
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.3." },
    { teks: "Landsteiner K, Levine P. A new agglutinable factor differentiating individual human bloods. Proc Soc Exp Biol Med 24:600–602, 1927." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.2 dan 3.1.4 (dengan koreksi, lihat Ringkasan)." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 5." },
  ],
};
