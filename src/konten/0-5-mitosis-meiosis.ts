import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.5 — Mitosis dan meiosis
 *
 * STATUS: DRAF. Ditulis Claude, BELUM ditinjau Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Dipakai sel khayal 2n = 4 agar mudah diikuti — dinyatakan di adegan pembuka.
 */

export const mitosisMeiosis: Pelajaran = {
  slug: "mitosis-dan-meiosis",
  nomor: "0.5",
  level: 0,
  judul: "Mitosis dan Meiosis",
  ringkas:
    "Dua cara sel membelah: mitosis yang membuat salinan persis untuk tumbuh dan memperbaiki, dan meiosis yang mengocok lalu membagi dua untuk membuat sel telur dan sperma.",
  tingkat: "Dasar",
  animasi: "pembelahan",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Dari satu menjadi triliunan",
      tahap: "interfase",
      durasi: 27,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Kamu bermula dari satu sel. Sekarang tiga puluh tujuh triliun. Tiap luka yang sembuh, tiap rambut yang tumbuh, adalah hasil pembelahan sel. Agar mudah diikuti, kita pakai sel khayal dengan empat kromosom: dua dari ibu, dua dari ayah.",
    },
    {
      id: "siklus",
      tajuk: "Siklus sel",
      tahap: "siklus",
      durasi: 25,
      sorot: [],
      narasi:
        "Sel tidak membelah terus-menerus. Ia menjalani siklus sel (cell cycle): tumbuh (G1), menyalin seluruh DNA-nya (S), bersiap (G2), lalu membelah (M). Pembelahan hanya sebagian kecil dari siklus — sisanya disebut interfase (interphase).",
    },
    {
      id: "interfase",
      tajuk: "Sudah disalin",
      tahap: "interfase",
      durasi: 22,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Selama fase S, setiap kromosom disalin. Kini masing-masing punya dua kromatid saudara yang identik, menempel di sentromer. Kromatin masih longgar; inti masih utuh. Sel siap memulai mitosis (mitosis).",
    },
    {
      id: "profase",
      tajuk: "Profase",
      tahap: "profase",
      durasi: 24,
      sorot: ["kromatin", "membranInti", "sentriol", "sitoskeleton"],
      narasi:
        "Profase (prophase): kromatin memadat hingga tampak sebagai kromosom berbentuk X. Selaput inti pecah. Sentriol berpindah ke dua kutub dan mulai memancarkan serat gelendong (spindle fiber) — tali penarik dari mikrotubulus.",
    },
    {
      id: "metafase",
      tajuk: "Metafase",
      tahap: "metafase",
      durasi: 23,
      sorot: ["sentromer", "sitoskeleton"],
      narasi:
        "Metafase (metaphase): serat gelendong menangkap setiap sentromer, lalu menarik semua kromosom hingga berbaris di tengah sel — bidang ekuator. Sel memeriksa: semua sudah terpasang? Baru boleh lanjut.",
    },
    {
      id: "anafase",
      tajuk: "Anafase",
      tahap: "anafase",
      durasi: 21,
      sorot: ["sentromer", "kromatin", "kromosomAyah"],
      narasi:
        "Anafase (anaphase): sentromer terbelah. Dua kromatid saudara yang tadinya satu kromosom ditarik ke kutub yang berlawanan. Sejak detik ini, masing-masing kromatid disebut kromosom.",
    },
    {
      id: "telofase",
      tajuk: "Telofase dan sitokinesis",
      tahap: "telofase",
      durasi: 25,
      sorot: ["membranInti", "membranSel"],
      narasi:
        "Telofase (telophase) dan sitokinesis (cytokinesis): selaput inti terbentuk kembali di tiap kutub, kromosom mengendur jadi kromatin, dan sel mencekik dirinya di tengah. Hasilnya dua sel — masing-masing empat kromosom, salinan persis induknya.",
    },
    {
      id: "meiosis-pembuka",
      tajuk: "Mengapa harus setengah",
      tahap: "meiosis-pembuka",
      durasi: 26,
      sorot: [],
      narasi:
        "Untuk membuat sel telur dan sperma, sel butuh cara lain. Kalau keduanya membawa empat puluh enam, anaknya membawa sembilan puluh dua. Maka gamet dibuat dengan meiosis (meiosis): dua kali pembelahan, satu kali penyalinan — jumlah kromosom dibagi dua.",
    },
    {
      id: "sinapsis",
      tajuk: "Meiosis I: berpasangan",
      tahap: "sinapsis",
      durasi: 22,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Meiosis I dimulai berbeda: setiap kromosom mencari homolognya dan berpasangan rapat — sinapsis (synapsis). Ungu dari ibu berdampingan dengan toska dari ayah, gen sejajar dengan gen.",
    },
    {
      id: "pindah-silang",
      tajuk: "Pindah silang",
      tahap: "pindah-silang",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Saat berpasangan, lengan-lengan homolog saling menyilang dan bertukar potongan: pindah silang (crossing over). Lihat warnanya bertukar. Sejak ini, tidak ada kromosom yang murni dari ibu atau ayah lagi. Inilah sumber utama keragaman.",
    },
    {
      id: "meiosis-1",
      tajuk: "Meiosis I: pasangan dipisahkan",
      tahap: "meiosis-1",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah", "sitoskeleton"],
      narasi:
        "Lalu pasangan homolog berbaris di ekuator — berpasangan, bukan berbaris tunggal seperti mitosis — dan yang dipisahkan adalah pasangannya, bukan kromatidnya. Dua sel hasilnya sudah haploid: dua kromosom, masing-masing masih dua kromatid.",
    },
    {
      id: "meiosis-2",
      tajuk: "Meiosis II: empat sel",
      tahap: "meiosis-2",
      durasi: 22,
      sorot: ["kromatin", "kromosomAyah"],
      narasi:
        "Meiosis II berjalan seperti mitosis kecil, tanpa penyalinan DNA lagi: kromatid saudara dipisahkan. Hasil akhirnya empat sel haploid, dan tidak ada dua yang persis sama.",
    },
    {
      id: "perbandingan",
      tajuk: "Menyalin dan mengocok",
      tahap: "perbandingan",
      durasi: 25,
      sorot: [],
      narasi:
        "Bandingkan. Mitosis: satu pembelahan, dua sel, identik, diploid — untuk tumbuh dan memperbaiki. Meiosis: dua pembelahan, empat sel, berbeda, haploid — untuk berkembang biak. Yang satu menyalin, yang lain mengocok.",
    },
    {
      id: "penutup",
      tajuk: "Mengapa kamu tidak sama dengan saudaramu",
      tahap: "perbandingan",
      durasi: 25,
      sorot: [],
      narasi:
        "Setiap kali kromosom dikocok dan dibagi, muncul kombinasi baru — itulah sebabnya kamu mirip, tapi tidak sama dengan saudaramu. Level 3 nanti menelusuri akibatnya. Dan sebelum itu, Level 1: bagaimana DNA sendiri dibaca.",
    },
  ],

  poinKunci: [
    "Siklus sel: G1 (tumbuh) → S (DNA disalin) → G2 (bersiap) → M (membelah); G1+S+G2 disebut interfase.",
    "Mitosis: profase (memadat, selaput inti pecah) → metafase (berbaris di ekuator) → anafase (kromatid saudara berpisah) → telofase + sitokinesis (dua sel).",
    "Hasil mitosis: dua sel diploid yang identik dengan induknya — untuk tumbuh dan memperbaiki.",
    "Meiosis: dua kali pembelahan setelah satu kali penyalinan DNA, menghasilkan empat sel haploid.",
    "Di meiosis I, homolog berpasangan (sinapsis), bertukar potongan (pindah silang), lalu pasangannya yang dipisahkan; di meiosis II, kromatid saudara dipisahkan.",
    "Pindah silang dan pembagian acak homolog adalah sumber utama keragaman antar saudara.",
  ],

  istilah: [
    { id: "Siklus sel", en: "cell cycle", arti: "Rangkaian tumbuh, menyalin DNA, bersiap, dan membelah." },
    { id: "Interfase", en: "interphase", arti: "Bagian siklus sel di luar pembelahan: G1, S, dan G2." },
    { id: "Mitosis", en: "mitosis", arti: "Pembelahan inti yang menghasilkan dua sel dengan kromosom identik." },
    { id: "Profase", en: "prophase", arti: "Kromatin memadat, selaput inti pecah, gelendong terbentuk." },
    { id: "Metafase", en: "metaphase", arti: "Kromosom berbaris di bidang ekuator sel." },
    { id: "Anafase", en: "anaphase", arti: "Kromatid saudara ditarik ke kutub yang berlawanan." },
    { id: "Telofase", en: "telophase", arti: "Selaput inti terbentuk kembali di kedua kutub." },
    { id: "Sitokinesis", en: "cytokinesis", arti: "Pembelahan sitoplasma yang memisahkan dua sel anak." },
    { id: "Serat gelendong", en: "spindle fiber", arti: "Mikrotubulus yang menarik kromosom ke kutub sel." },
    { id: "Meiosis", en: "meiosis", arti: "Dua pembelahan berturut-turut yang menghasilkan empat sel haploid." },
    { id: "Sinapsis", en: "synapsis", arti: "Berpasangannya kromosom homolog pada awal meiosis I." },
    { id: "Pindah silang", en: "crossing over", arti: "Pertukaran potongan antara kromatid homolog; sumber keragaman." },
    { id: "Kiasma", en: "chiasma", arti: "Titik tempat kromatid homolog menyilang saat pindah silang." },
    { id: "Gamet", en: "gamete", arti: "Sel kelamin haploid: sel telur dan sperma." },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 17: The Cell Cycle." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 12 (Mitosis) dan 13 (Meiosis)." },
    { teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM). Meiosis and Fertilization.", url: "https://www.ncbi.nlm.nih.gov/books/NBK9901/" },
  ],
};
