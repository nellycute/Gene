import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.3 — Alel letal
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 3.1.6).
 * Contoh ternak: ayam Creeper dan sapi Dexter (keduanya letal pada homozigot).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const alelLetal: Pelajaran = {
  slug: "alel-letal",
  nomor: "3.3",
  level: 3,
  judul: "Alel letal",
  ringkas:
    "Tikus kuning × tikus kuning selalu memberi 2 kuning : 1 agouti, bukan 3 : 1 — embrio homozigot kuning mati di dalam kandungan. Rasio 2 : 1 adalah tanda khas alel letal. Contoh ternak: ayam Creeper dan sapi Dexter.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "tikus-kuning",
      tajuk: "Tikus kuning Cuénot",
      tahap: "tikus",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tikus berbulu kuning", fokus: "utuh", sorot: ["buluKuning"], label: "Kuning × kuning" },
        { kata: "dua kuning banding satu", fokus: "anak", sorot: [], label: "Selalu 2 kuning : 1 agouti" },
        { kata: "tidak pernah", fokus: "kuning", label: "Tak ada tikus kuning galur murni" },
      ],
      narasi:
        "Tahun 1905, Lucien Cuénot menyilangkan tikus berbulu kuning dengan sesamanya. Ia mengharapkan tiga banding satu. Yang muncul selalu dua kuning banding satu agouti — dan tidak pernah ada tikus kuning yang murni.",
    },
    {
      id: "penjelasan",
      tajuk: "Satu kotak tak pernah lahir",
      tahap: "punnettLetal",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "dominan untuk warna", fokus: "utuh", label: "Aʸ: dominan untuk warna" },
        { kata: "mati di dalam kandungan", fokus: "coret", label: "AʸAʸ: mati sebelum lahir" },
      ],
      narasi:
        "Penjelasannya: alel kuning dominan untuk warna bulu, tetapi resesif untuk kematian. Embrio yang mewarisi dua alel kuning mati di dalam kandungan. Dari empat kotak Punnett, satu tidak pernah lahir.",
    },
    {
      id: "dua-banding-satu",
      tajuk: "Tanda khas: 2 : 1",
      tahap: "punnettLetal",
      fokus: "coret",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "tinggal tiga bagian", fokus: "coret", label: "Tersisa 3 bagian" },
        { kata: "dua banding satu", fokus: "sisa", label: "2 kuning (Aʸa) : 1 agouti (aa)" },
      ],
      narasi:
        "Yang lahir tinggal tiga bagian: dua heterozigot berbulu kuning dan satu homozigot resesif berbulu agouti. Maka rasionya dua banding satu. Rasio 2 : 1 dari persilangan dua heterozigot adalah tanda khas alel letal.",
    },
    {
      id: "jenis-letal",
      tajuk: "Letal resesif dan dominan",
      tahap: "tikus",
      fokus: "kuning",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "letal resesif", fokus: "kuning", label: "Letal resesif: mati bila homozigot" },
        { kata: "letal dominan", fokus: "utuh", label: "Letal dominan: jarang bertahan" },
      ],
      narasi:
        "Alel letal (lethal allele) menyebabkan kematian pembawanya. Kebanyakan bersifat letal resesif: pembawa satu salinan tetap hidup, kematian terjadi hanya pada homozigot. Alel letal dominan jarang bertahan, sebab pembawanya mati sebelum sempat mewariskannya.",
    },
    {
      id: "ayam-creeper",
      tajuk: "Ayam Creeper",
      tahap: "creeper",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "ayam Creeper", fokus: "utuh", label: "Ayam Creeper: kaki pendek" },
        { kata: "dua Creeper", fokus: "anak", label: "2 Creeper : 1 normal" },
      ],
      narasi:
        "Pada ternak, contohnya ayam Creeper yang berkaki pendek. Perkawinan Creeper dengan Creeper menghasilkan dua Creeper banding satu berkaki normal, karena embrio homozigot mati di dalam telur.",
    },
    {
      id: "sapi-dexter",
      tajuk: "Sapi Dexter",
      tahap: "dexter",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Sapi Dexter", fokus: "utuh", label: "Dexter berkaki pendek: heterozigot" },
        { kata: "gugur sebelum lahir", fokus: "gugur", label: "Homozigot: gugur" },
        { kata: "menghindari", fokus: "utuh", label: "Hindari kawin dua pembawa" },
      ],
      narasi:
        "Sapi Dexter serupa. Dexter berkaki pendek adalah heterozigot; bila dua ekor dikawinkan, anak homozigotnya — dikenal sebagai anak “bulldog” — gugur sebelum lahir. Karena itu peternak menghindari mengawinkan dua pembawa alel letal.",
    },
    {
      id: "penutup",
      tajuk: "Mendel tetap berlaku",
      tahap: "punnettLetal",
      fokus: "coret",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "tidak berarti", fokus: "utuh", label: "Segregasi tetap 1 : 2 : 1" },
        { kata: "tak bertahan hidup", fokus: "coret", label: "…satu kelompok tak terlihat" },
      ],
      narasi:
        "Jadi, rasio yang menyimpang tidak berarti Hukum Mendel gagal. Segregasi tetap satu banding dua banding satu; hanya saja satu kelompok tidak pernah terlihat karena tak bertahan hidup.",
    },
  ],

  poinKunci: [
    "Alel letal: alel yang menyebabkan kematian. Letal resesif mematikan hanya bila homozigot; letal dominan mematikan walau satu salinan, sehingga jarang bertahan di populasi.",
    "Tikus kuning (Cuénot, 1905): alel Aʸ dominan untuk warna kuning tetapi letal resesif. Aʸa × Aʸa → ¼ AʸAʸ (mati), ½ Aʸa (kuning), ¼ aa (agouti) → 2 kuning : 1 agouti.",
    "Rasio 2 : 1 pada keturunan dua heterozigot adalah tanda khas alel letal resesif; semua individu kuning yang hidup pasti heterozigot.",
    "Ayam Creeper (Cp): heterozigot berkaki pendek, homozigot mati sebagai embrio → 2 Creeper : 1 normal.",
    "Sapi Dexter (gen ACAN): heterozigot berkaki pendek; homozigot (“bulldog”) gugur. Peternak memakai uji pembawa untuk menghindari kawin dua pembawa.",
    "Pada manusia, akondroplasia (FGFR3) bersifat dominan untuk tinggi badan; bayi yang mewarisi dua alelnya biasanya tidak bertahan hidup.",
  ],

  istilah: [
    { id: "Alel letal", en: "lethal allele", arti: "Alel yang menyebabkan kematian pembawanya." },
    { id: "Letal resesif", en: "recessive lethal", arti: "Mematikan hanya bila homozigot." },
    { id: "Letal dominan", en: "dominant lethal", arti: "Mematikan walau hanya satu salinan." },
    { id: "Agouti", en: "agouti", arti: "Warna liar abu-cokelat; tiap helai bulu berpita gelap-terang." },
    { id: "Pembawa", en: "carrier", arti: "Heterozigot yang membawa alel resesif tanpa menampakkannya." },
  ],

  rujukan: [
    { teks: "Cuénot L. Les races pures et leurs combinaisons chez les souris. Arch Zool Exp Gén 3:cxxiii–cxxxii, 1905." },
    { teks: "Castle WE, Little CC. On a modified Mendelian ratio among yellow mice. Science 32:868–870, 1910." },
    { teks: "Cavanagh JAL, dkk. Bulldog dwarfism in Dexter cattle is caused by mutations in ACAN. Mammalian Genome 18:808–814, 2007." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.6." },
  ],
};
