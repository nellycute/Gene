import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.7 — Siklus sel dan mitosis
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Dipecah dari 0.5 lama (23 Sep 2026); meiosis pindah ke 0.8.
 * Dipakai sel khayal 2n = 4 agar mudah diikuti — dinyatakan di adegan pembuka.
 * 25 Sep 2026: dikoreksi menurut pemeriksaan fakta — "membran inti" (seragam
 * dengan 0.3–0.4), serat memancar dari sepasang sentriol di kutub, dan di
 * anafase ikatan di sentromer yang terlepas (bukan "sentromer terbelah").
 */

export const mitosis: Pelajaran = {
  slug: "siklus-sel-dan-mitosis",
  nomor: "0.7",
  level: 0,
  judul: "Siklus sel dan mitosis",
  ringkas:
    "Bagaimana satu sel menjadi dua yang persis sama: siklus sel, penyalinan DNA, lalu profase, metafase, anafase, dan telofase — untuk tumbuh dan memperbaiki tubuh.",
  tingkat: "Dasar",
  animasi: "pembelahan",

  adegan: [
    {
      id: "pembuka",
      tajuk: "Dari satu menjadi triliunan",
      tahap: "interfase",
      durasi: 27,
      sorot: [],
      isyarat: [{ kata: "dua dari ibu", sorot: ["kromatin", "kromosomAyah"], label: "Ungu dari ibu · toska dari ayah" }],
      narasi:
        "Kamu bermula dari satu sel. Sekarang tiga puluh tujuh triliun. Tiap luka yang sembuh, tiap rambut yang tumbuh, adalah hasil pembelahan sel. Agar mudah diikuti, kita pakai sel khayal dengan empat kromosom: dua dari ibu, dua dari ayah.",
    },
    {
      id: "siklus",
      tajuk: "Siklus sel",
      tahap: "siklus",
      durasi: 25,
      sorot: [],
      isyarat: [
        { kata: "tumbuh (G1)", fokus: "G1", label: "G1 · tumbuh" },
        { kata: "menyalin seluruh DNA-nya (S)", fokus: "S", label: "S · DNA disalin" },
        { kata: "bersiap (G2)", fokus: "G2", label: "G2 · bersiap" },
        { kata: "lalu membelah (M)", fokus: "M", label: "M · membelah" },
        { kata: "disebut interfase", fokus: "G2", sorot: ["interfase"], label: "Interfase = G1 + S + G2" },
      ],
      narasi:
        "Sel tidak membelah terus-menerus. Ia menjalani siklus sel (cell cycle): tumbuh (G1), menyalin seluruh DNA-nya (S), bersiap (G2), lalu membelah (M). Pembelahan hanya sebagian kecil dari siklus — sisanya disebut interfase (interphase).",
    },
    {
      id: "interfase",
      tajuk: "Sudah disalin",
      tahap: "interfase",
      durasi: 22,
      sorot: [],
      isyarat: [{ kata: "Kromatin masih longgar", sorot: ["kromatin", "kromosomAyah", "membranInti"] }],
      narasi:
        "Selama fase S, setiap kromosom disalin. Kini masing-masing punya dua kromatid saudara yang identik, menempel di sentromer. Kromatin masih longgar; inti masih utuh. Sel siap memulai mitosis (mitosis).",
    },
    {
      id: "profase",
      tajuk: "Profase",
      tahap: "profase",
      durasi: 24,
      sorot: ["kromatin", "kromosomAyah", "membranInti", "sentriol", "sitoskeleton", "membranSel"],
      fokus: "padat",
      isyarat: [
        { kata: "Membran inti pecah", fokus: "pecah", label: "Membran inti pecah" },
        { kata: "Sepasang sentriol berpindah", fokus: "kutub", sorot: ["sentriol", "kromatin", "kromosomAyah", "membranSel"] },
        { kata: "serat gelendong", fokus: "gelendong", sorot: ["sitoskeleton", "sentriol", "kromatin", "kromosomAyah", "membranSel"], label: "Serat gelendong" },
      ],
      narasi:
        "Profase (prophase): kromatin memadat hingga tampak sebagai kromosom berbentuk X. Membran inti pecah. Sepasang sentriol berpindah ke tiap kutub, dan dari sanalah memancar serat gelendong (spindle fiber) — tali penarik dari mikrotubulus (microtubule).",
    },
    {
      id: "metafase",
      tajuk: "Metafase",
      tahap: "metafase",
      durasi: 23,
      sorot: ["sentromer", "sitoskeleton", "kromatin", "kromosomAyah", "sentriol", "membranSel"],
      fokus: "tangkap",
      isyarat: [{ kata: "hingga semua berbaris", fokus: "baris", label: "Berbaris di bidang ekuator" }],
      narasi:
        "Metafase (metaphase): serat gelendong menangkap setiap kromosom di sentromernya, lalu menariknya hingga semua berbaris di tengah sel — bidang ekuator (equatorial plane). Sel memeriksa: semua sudah terpasang? Baru boleh lanjut.",
    },
    {
      id: "anafase",
      tajuk: "Anafase",
      tahap: "anafase",
      durasi: 21,
      sorot: ["sentromer", "kromatin", "kromosomAyah", "sitoskeleton", "sentriol", "membranSel"],
      fokus: "belah",
      isyarat: [{ kata: "ditarik ke kutub", fokus: "tarik", label: "Kromatid saudara berpisah" }],
      narasi:
        "Anafase (anaphase): ikatan kedua kromatid saudara di sentromer terlepas. Keduanya — yang tadinya satu kromosom — ditarik ke kutub yang berlawanan. Sejak detik ini, masing-masing kromatid disebut kromosom.",
    },
    {
      id: "telofase",
      tajuk: "Telofase dan sitokinesis",
      tahap: "telofase",
      durasi: 25,
      sorot: ["membranInti", "membranSel", "kromatin", "kromosomAyah"],
      isyarat: [
        { kata: "membran inti terbentuk kembali", fokus: "inti", label: "Dua inti baru" },
        { kata: "sel mencekik dirinya", fokus: "cekik", label: "Sitokinesis" },
        { kata: "Hasilnya dua sel", fokus: "dua", label: "Dua sel, masing-masing 2n" },
      ],
      narasi:
        "Telofase (telophase) dan sitokinesis (cytokinesis): membran inti terbentuk kembali di tiap kutub, kromosom mengendur jadi kromatin, dan sel mencekik dirinya di tengah. Hasilnya dua sel — masing-masing empat kromosom, salinan persis induknya.",
    },
    {
      id: "penutup",
      tajuk: "Satu menjadi dua yang sama",
      tahap: "telofase",
      fokus: "dua",
      durasi: 24,
      sorot: [],
      narasi:
        "Mitosis menyalin: satu sel menjadi dua yang identik, sama-sama diploid — untuk tumbuh, mengganti sel yang aus, dan menyembuhkan luka. Pelajaran berikutnya memperlihatkan cara membelah yang lain, yang justru membagi dua jumlah kromosom: meiosis.",
    },
  ],

  poinKunci: [
    "Siklus sel: G1 (tumbuh) → S (DNA disalin) → G2 (bersiap) → M (membelah); G1+S+G2 disebut interfase.",
    "Mitosis: profase (memadat, membran inti pecah) → metafase (berbaris di ekuator) → anafase (kromatid saudara berpisah) → telofase + sitokinesis (dua sel).",
    "Hasil mitosis: dua sel diploid yang identik dengan induknya — untuk tumbuh dan memperbaiki.",
  ],

  istilah: [
    { id: "Siklus sel", en: "cell cycle", arti: "Rangkaian tumbuh, menyalin DNA, bersiap, dan membelah." },
    { id: "Interfase", en: "interphase", arti: "Bagian siklus sel di luar pembelahan: G1, S, dan G2." },
    {
      id: "Mitosis",
      en: "mitosis",
      arti: "Pembelahan inti yang menghasilkan dua inti dengan kromosom identik; bersama sitokinesis, menjadi dua sel.",
    },
    { id: "Profase", en: "prophase", arti: "Kromatin memadat, membran inti pecah, gelendong terbentuk." },
    { id: "Metafase", en: "metaphase", arti: "Kromosom berbaris di bidang ekuator sel." },
    { id: "Bidang ekuator", en: "equatorial plane", arti: "Bidang khayal di tengah sel tempat kromosom berbaris saat metafase." },
    { id: "Anafase", en: "anaphase", arti: "Kromatid saudara ditarik ke kutub yang berlawanan." },
    { id: "Telofase", en: "telophase", arti: "Membran inti terbentuk kembali di kedua kutub." },
    { id: "Sitokinesis", en: "cytokinesis", arti: "Pembelahan sitoplasma yang memisahkan dua sel anak." },
    { id: "Serat gelendong", en: "spindle fiber", arti: "Mikrotubulus yang menarik kromosom ke kutub sel; memancar dari sentrosom (pusat berisi sepasang sentriol)." },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 17: The Cell Cycle." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 12: The Cell Cycle." },
  ],
};
