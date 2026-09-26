import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.4 — Uji silang dan silang balik
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 5;
 * R3 2.2.2). Kekeliruan R3 hlm. 32 ("kerdil (DD)") tidak diikuti: kerdil = dd.
 * Contoh ternak: sapi Angus hitam/merah (disederhanakan sebagai B/b; gen
 * sebenarnya MC1R — lihat Ringkasan).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 2 (Mendel3D).
 */

export const ujiSilang: Pelajaran = {
  slug: "uji-silang-dan-silang-balik",
  nomor: "2.4",
  level: 2,
  judul: "Uji silang dan silang balik",
  ringkas:
    "Membedakan RR dari Rr yang tampak sama: silangkan dengan homozigot resesif. Hasil seragam berarti homozigot; hasil satu banding satu berarti heterozigot. Juga silang balik dan penerapannya pada ternak.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "masalah",
      tajuk: "RR atau Rr?",
      tahap: "uji",
      fokus: "tanya",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "RR atau Rr", fokus: "tanya", label: "Bulat: RR atau Rr?" },
        { kata: "uji silang (testcross)", fokus: "tanya", label: "Uji silang" },
      ],
      narasi:
        "Biji bulat bisa bergenotip RR atau Rr, dan keduanya tampak sama. Bagaimana mengetahui genotip tanaman berbiji bulat tanpa melihat DNA-nya? Mendel punya caranya: uji silang (testcross).",
    },
    {
      id: "cara",
      tajuk: "Silangkan dengan rr",
      tahap: "uji",
      fokus: "tanya",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "homozigot resesif", fokus: "tanya", sorot: ["bijiKeriput"], label: "Penguji: rr" },
        { kata: "hanya bisa memberi alel r", fokus: "tanya", label: "rr hanya memberi r" },
      ],
      narasi:
        "Tanaman yang ingin diuji disilangkan dengan tanaman homozigot resesif, rr. Induk rr hanya bisa memberi alel r, sehingga fenotip keturunannya langsung memperlihatkan alel dari induk yang diuji.",
    },
    {
      id: "hasil-rr",
      tajuk: "Jika RR",
      tahap: "uji",
      fokus: "kiri",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "Jika yang diuji RR", fokus: "kiri", label: "RR × rr" },
        { kata: "seluruhnya bulat", fokus: "kiri", sorot: ["bijiBulat"], label: "Semua Rr: 100% bulat" },
      ],
      narasi: "Jika yang diuji RR, semua gametnya membawa R. Semua keturunan menjadi Rr — seluruhnya bulat.",
    },
    {
      id: "hasil-rr-hetero",
      tajuk: "Jika Rr",
      tahap: "uji",
      fokus: "kanan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Jika yang diuji Rr", fokus: "kanan", label: "Rr × rr" },
        { kata: "satu banding satu", fokus: "kanan", label: "½ bulat : ½ keriput = 1 : 1" },
      ],
      narasi:
        "Jika yang diuji Rr, separuh gametnya membawa R dan separuh membawa r. Keturunannya separuh bulat (Rr) dan separuh keriput (rr) — perbandingan satu banding satu.",
    },
    {
      id: "simpulan",
      tajuk: "Membaca hasilnya",
      tahap: "uji",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "satu saja keturunan keriput", fokus: "pastiRr", sorot: ["bijiKeriput"], label: "Ada keriput → pasti Rr" },
        { kata: "semuanya bulat", fokus: "pastiRR", sorot: ["bijiBulat"], label: "Semua bulat → hampir pasti RR" },
      ],
      narasi:
        "Jadi, satu saja keturunan keriput sudah membuktikan induk yang diuji heterozigot. Bila ratusan keturunan semuanya bulat, induk itu hampir pasti homozigot RR.",
    },
    {
      id: "silang-balik",
      tajuk: "Silang balik",
      tahap: "balik",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Silang balik", fokus: "utuh", label: "Silang balik: F1 × induknya" },
        { kata: "induk resesifnya", fokus: "resesif", label: "F1 × induk resesif = uji silang" },
      ],
      narasi:
        "Silang balik (backcross) adalah persilangan keturunan F1 dengan salah satu induknya. Bila F1 disilangkan balik dengan induk resesifnya, silang balik itu sekaligus sebuah uji silang.",
    },
    {
      id: "ternak",
      tajuk: "Menguji pejantan",
      tahap: "sapi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "sapi Angus", fokus: "utuh", sorot: ["buluHitam", "buluMerah"], label: "Angus: hitam (B) dominan atas merah (b)" },
        { kata: "alel merah tersembunyi", fokus: "pejantan", sorot: ["buluHitam"], label: "Pejantan hitam: BB atau Bb?" },
        { kata: "lahir anak merah", fokus: "anak", sorot: ["buluMerah"], label: "Ada anak merah → pejantan Bb" },
      ],
      narasi:
        "Uji silang dipakai peternak. Pada sapi Angus, warna hitam (B) dominan atas merah (b). Seekor pejantan hitam bisa membawa alel merah tersembunyi. Bila dikawinkan dengan betina merah dan lahir anak merah, pejantan itu pasti Bb.",
    },
  ],

  poinKunci: [
    "Uji silang: individu berfenotip dominan dengan genotip belum diketahui disilangkan dengan homozigot resesif.",
    "Semua keturunan berfenotip dominan → yang diuji homozigot dominan (dengan keyakinan makin tinggi bila keturunannya banyak). Perbandingan 1 : 1 → yang diuji heterozigot.",
    "Silang balik: F1 disilangkan dengan salah satu induknya; bila dengan induk homozigot resesif, silang balik = uji silang.",
    "Peluang “salah menyimpulkan RR” padahal Rr: (½)ⁿ untuk n keturunan yang semuanya dominan — 10 keturunan memberi peluang ± 0,1%.",
    "Warna sapi Angus sebenarnya diatur gen MC1R (alel Eᴰ hitam dominan, e merah resesif); di sini disederhanakan sebagai B dan b.",
    "Koreksi buku rujukan: R3 hlm. 32 menulis keturunan kerdil sebagai “DD”; yang benar dd.",
  ],

  istilah: [
    { id: "Uji silang", en: "testcross", arti: "Persilangan dengan homozigot resesif untuk mengungkap genotip." },
    { id: "Silang balik", en: "backcross", arti: "Persilangan F1 dengan salah satu induknya." },
    { id: "Homozigot resesif", en: "homozygous recessive", arti: "Individu dengan dua alel resesif (misal rr)." },
    { id: "Pejantan", en: "sire", arti: "Ternak jantan yang dipakai sebagai induk." },
    { id: "Betina induk", en: "dam", arti: "Ternak betina yang dipakai sebagai induk." },
  ],

  rujukan: [
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 2." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.1." },
    { teks: "Klungland H, dkk. The role of melanocyte-stimulating hormone (MSH) receptor in bovine coat color determination. Mammalian Genome 6:636–639, 1995." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 2.2.2 (dengan koreksi, lihat Ringkasan)." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 5." },
  ],
};
