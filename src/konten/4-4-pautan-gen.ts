import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.4 — Pautan gen
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 8;
 * R3 5.1). Data uji silang b–vg lalat buah: 965 : 944 : 206 : 185 (Morgan;
 * seperti dikutip Campbell Biology bab 15).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const pautanGen: Pelajaran = {
  slug: "pautan-gen",
  nomor: "4.4",
  level: 4,
  judul: "Pautan gen",
  ringkas:
    "Gen yang terletak di kromosom yang sama cenderung diwariskan bersama, sehingga Hukum Mendel II tidak berlaku bagi keduanya. Uji silang lalat buah abu-abu bersayap normal: kombinasi induk jauh lebih banyak daripada kombinasi baru (17%).",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "morgan",
      tajuk: "Lalat buah Morgan",
      tahap: "lalat",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Thomas Hunt Morgan", fokus: "utuh", label: "Morgan, Universitas Columbia, 1910-an" },
        { kata: "diwariskan bersama", fokus: "dekat", label: "Sebagian sifat cenderung diwariskan bersama" },
      ],
      narasi:
        "Pada 1910-an, Thomas Hunt Morgan dan murid-muridnya meneliti lalat buah (Drosophila melanogaster). Mereka menemukan bahwa sebagian pasangan sifat tidak berpadu secara bebas — keduanya cenderung diwariskan bersama.",
    },
    {
      id: "sekromosom",
      tajuk: "Satu kromosom, dua gen",
      tahap: "pautan",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "kromosom yang sama", fokus: "taut", label: "Dua gen di satu kromosom" },
        { kata: "pautan (linkage)", fokus: "taut", label: "Pautan (linkage)" },
      ],
      narasi:
        "Penjelasannya: gen-gen itu terletak di kromosom yang sama. Selama tidak terpisah, alel-alel yang sekromosom ikut bergerak bersama saat meiosis, seperti gerbong dalam satu rangkaian. Keadaan ini disebut pautan (linkage).",
    },
    {
      id: "dua-gamet",
      tajuk: "Dua macam gamet, bukan empat",
      tahap: "pautan",
      fokus: "bebas",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "di kromosom berbeda", fokus: "bebas", label: "Kromosom berbeda: 4 macam gamet" },
        { kata: "berpautan sempurna", fokus: "taut", label: "Berpautan: 2 macam gamet" },
        { kata: "tidak berlaku", fokus: "utuh", label: "Hukum Mendel II tak berlaku bagi gen berpautan" },
      ],
      narasi:
        "Individu yang heterozigot untuk dua gen di kromosom berbeda membentuk empat macam gamet. Bila kedua gen itu berpautan sempurna, hanya dua macam gamet yang terbentuk. Asortasi bebas — Hukum Mendel II — tidak berlaku bagi gen yang berpautan.",
    },
    {
      id: "uji-silang",
      tajuk: "Uji silang lalat",
      tahap: "ujiLalat",
      fokus: "induk",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "uji silang", fokus: "induk", label: "Betina heterozigot × jantan hitam bersayap pendek" },
        { kata: "sama banyak", fokus: "harapan", label: "Harapan bila bebas: 1 : 1 : 1 : 1" },
      ],
      narasi:
        "Morgan melakukan uji silang: lalat betina heterozigot untuk warna tubuh dan bentuk sayap disilangkan dengan jantan homozigot resesif — hitam bersayap pendek. Bila kedua gen berpadu bebas, keempat kelompok keturunan akan sama banyak.",
    },
    {
      id: "hasil",
      tajuk: "Kombinasi induk mendominasi",
      tahap: "ujiLalat",
      fokus: "hasil",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "965", fokus: "hasil", label: "965 abu-abu normal · 944 hitam pendek" },
        { kata: "206 dan 185", fokus: "baru", label: "206 + 185 kombinasi baru" },
        { kata: "tanda pautan", fokus: "hasil", label: "Kombinasi induk jauh lebih banyak → pautan" },
      ],
      narasi:
        "Hasilnya: 965 lalat abu-abu bersayap normal dan 944 hitam bersayap pendek — seperti induknya — tetapi hanya 206 dan 185 kombinasi baru. Kombinasi induk jauh lebih banyak: itulah tanda pautan.",
    },
    {
      id: "tak-sempurna",
      tajuk: "Pautan tidak sempurna",
      tahap: "ujiLalat",
      fokus: "baru",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "17 persen", fokus: "baru", label: "(206 + 185) ÷ 2.300 ≈ 17%" },
        { kata: "bertukar potongan", fokus: "baru", label: "Homolog bertukar potongan → kombinasi baru" },
      ],
      narasi:
        "Namun kombinasi baru tetap muncul, sekitar 17 persen. Artinya pautan tidak sempurna: sesekali kromosom homolog bertukar potongan saat meiosis. Pertukaran inilah yang dibahas di pelajaran berikutnya.",
    },
  ],

  poinKunci: [
    "Pautan (linkage): gen-gen di kromosom yang sama cenderung diwariskan bersama; asortasi bebas (Hukum Mendel II) tidak berlaku bagi keduanya.",
    "Dihibrid tak berpautan membentuk 4 macam gamet sama banyak; berpautan sempurna hanya 2 macam (tipe parental).",
    "Uji silang lalat buah (b⁺b vg⁺vg × bb vgvg): 965 abu-abu normal, 944 hitam pendek (parental), 206 abu-abu pendek, 185 hitam normal (rekombinan). Harapan bila bebas: masing-masing ± 575.",
    "Frekuensi rekombinasi = (206 + 185) ÷ 2.300 × 100% ≈ 17%. Di bawah 50% berarti berpautan; 50% setara dengan asortasi bebas.",
    "Kelompok pautan (linkage group): semua gen di satu kromosom; jumlahnya sama dengan jumlah kromosom haploid (manusia 23, lalat buah 4).",
  ],

  istilah: [
    { id: "Pautan", en: "linkage", arti: "Kecenderungan gen sekromosom diwariskan bersama." },
    { id: "Tipe parental", en: "parental type", arti: "Kombinasi alel seperti pada induk." },
    { id: "Rekombinan", en: "recombinant", arti: "Kombinasi alel baru yang tidak ada pada induk." },
    { id: "Kelompok pautan", en: "linkage group", arti: "Semua gen yang terletak di satu kromosom." },
    { id: "Lalat buah", en: "fruit fly", arti: "Drosophila melanogaster, hewan model genetika." },
  ],

  rujukan: [
    { teks: "Morgan TH. Random segregation versus coupling in Mendelian inheritance. Science 34:384, 1911." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 15.3." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 4." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 5.1." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 8." },
  ],
};
