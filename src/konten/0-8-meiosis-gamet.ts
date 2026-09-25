import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.8 — Meiosis dan pembentukan gamet
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Dipecah dari 0.5 lama (23 Sep 2026). Sel khayal 2n = 4 yang sama dengan 0.7.
 * 25 Sep 2026: ditambah sperma dan sel telur, pembuahan, dan gagal berpisah
 * (trisomi 21); dikoreksi menurut pemeriksaan fakta (pindah silang hanya
 * mengenai sebagian kromatid; arah tiap pasangan homolog acak; kembar identik
 * adalah pengecualian "tidak sama dengan saudaramu").
 */

export const meiosis: Pelajaran = {
  slug: "meiosis-dan-gamet",
  nomor: "0.8",
  level: 0,
  judul: "Meiosis dan pembentukan gamet",
  ringkas:
    "Cara membelah yang membagi dua jumlah kromosom — homolog berpasangan, bertukar potongan, lalu dipisahkan — hingga lahir sperma dan sel telur yang tidak ada duanya, bersatu kembali saat pembuahan.",
  tingkat: "Dasar",
  animasi: "pembelahan",

  adegan: [
    {
      id: "meiosis-pembuka",
      tajuk: "Mengapa harus setengah",
      tahap: "meiosis-pembuka",
      durasi: 26,
      sorot: [],
      narasi:
        "Untuk membuat sel telur (egg) dan sperma (sperm), sel butuh cara lain. Kalau keduanya membawa empat puluh enam, anaknya membawa sembilan puluh dua. Maka gamet (gamete) dibuat dengan meiosis (meiosis): dua kali pembelahan, satu kali penyalinan — jumlah kromosom dibagi dua.",
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
      fokus: "awal",
      isyarat: [{ kata: "bertukar potongan", fokus: "silang", label: "Pindah silang: warna bertukar" }],
      narasi:
        "Saat berpasangan, lengan-lengan homolog saling menyilang dan bertukar potongan: pindah silang (crossing over). Lihat warnanya bertukar. Sejak ini, sebagian kromatid tidak lagi murni dari ibu atau dari ayah, melainkan campuran keduanya. Inilah salah satu sumber utama keragaman.",
    },
    {
      id: "meiosis-1",
      tajuk: "Meiosis I: pasangan dipisahkan",
      tahap: "meiosis-1",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah", "sitoskeleton", "sentriol", "sentromer", "membranSel"],
      fokus: "baris",
      isyarat: [
        { kata: "arah tiap pasangan acak", label: "Arah tiap pasangan acak" },
        { kata: "yang dipisahkan adalah pasangannya", fokus: "pisah", label: "Pasangan homolog dipisahkan" },
        { kata: "Dua sel hasilnya", fokus: "dua", label: "Dua sel haploid" },
      ],
      narasi:
        "Lalu pasangan homolog berbaris di ekuator — berpasangan, bukan tunggal seperti mitosis, dengan arah tiap pasangan acak — dan yang dipisahkan adalah pasangannya, bukan kromatidnya. Dua sel hasilnya sudah haploid: dua kromosom, masing-masing masih dua kromatid.",
    },
    {
      id: "meiosis-2",
      tajuk: "Meiosis II: empat sel",
      tahap: "meiosis-2",
      durasi: 22,
      sorot: ["kromatin", "kromosomAyah", "sitoskeleton", "sentriol", "sentromer", "membranSel"],
      fokus: "baris2",
      isyarat: [
        { kata: "kromatid saudara dipisahkan", fokus: "pisah2", label: "Kromatid saudara dipisahkan" },
        { kata: "empat sel haploid", fokus: "empat", label: "Empat sel haploid" },
      ],
      narasi:
        "Meiosis II berjalan seperti mitosis kecil, tanpa penyalinan DNA lagi: kromatid saudara dipisahkan. Hasil akhirnya empat sel haploid, dan tidak ada dua yang persis sama.",
    },
    {
      id: "perbandingan",
      tajuk: "Menyalin dan mengocok",
      tahap: "perbandingan",
      durasi: 25,
      sorot: [],
      isyarat: [
        { kata: "Mitosis: satu pembelahan", fokus: "mitosis", label: "Mitosis · 2 sel identik · 2n" },
        { kata: "Meiosis: dua pembelahan", fokus: "meiosis", label: "Meiosis · 4 sel berbeda · n" },
        { kata: "Yang satu menyalin", fokus: "utuh" },
      ],
      narasi:
        "Bandingkan. Mitosis: satu pembelahan, dua sel, identik, diploid — untuk tumbuh dan memperbaiki. Meiosis: dua pembelahan, empat sel, berbeda, haploid — untuk berkembang biak. Yang satu menyalin, yang lain mengocok.",
    },
    {
      id: "gamet",
      tajuk: "Sperma dan sel telur",
      tahap: "gamet",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "empat sperma", fokus: "sperma", label: "1 sel induk → 4 sperma" },
        { kata: "satu sel telur besar", fokus: "telur", label: "1 sel telur besar" },
        { kata: "badan kutub", fokus: "kutub", label: "Badan kutub · kecil, lalu hilang" },
        { kata: "inti di kepala", fokus: "kepala", sorot: ["inti", "kromosomAyah"], label: "Kepala · inti" },
        { kata: "mitokondria di bagian tengah", fokus: "kepala", sorot: ["mitokondria"], label: "Bagian tengah · mitokondria" },
        { kata: "ekor untuk berenang", fokus: "sperma", sorot: ["sitoskeleton"], label: "Ekor · untuk berenang" },
      ],
      narasi:
        "Pada laki-laki, satu sel induk menghasilkan empat sperma. Pada perempuan, pembagiannya tidak seimbang: satu sel telur besar dan badan kutub (polar body) kecil yang akhirnya hilang. Sperma membawa inti di kepala, mitokondria di bagian tengah, dan ekor untuk berenang.",
    },
    {
      id: "pembuahan",
      tajuk: "Pembuahan",
      tahap: "pembuahan",
      fokus: "dekati",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "inti sperma dan inti sel telur", fokus: "masuk", label: "Sperma masuk" },
        { kata: "kembali menjadi 46", fokus: "bersatu", label: "23 + 23 = 46" },
        { kata: "zigot (zygote)", fokus: "bersatu", label: "Zigot · 2n = 46" },
        { kata: "membelah berkali-kali", fokus: "membelah", label: "Mitosis: 2 → 4 → 8 sel" },
      ],
      narasi:
        "Saat pembuahan (fertilization), inti sperma dan inti sel telur bertemu, kromosom keduanya bersatu: 23 dari ayah dan 23 dari ibu kembali menjadi 46. Sel pertama ini, zigot (zygote), lalu membelah berkali-kali dengan mitosis hingga menjadi seluruh tubuh.",
    },
    {
      id: "gagal-berpisah",
      tajuk: "Gagal berpisah",
      tahap: "gagal-berpisah",
      fokus: "baris",
      durasi: 26,
      sorot: ["kromatin", "kromosomAyah", "sitoskeleton", "sentriol", "sentromer", "membranSel"],
      isyarat: [
        { kata: "gagal berpisah (nondisjunction)", fokus: "gagal", label: "Sepasang tidak berpisah" },
        { kata: "Satu gamet lalu membawa", fokus: "dua", label: "n + 1 dan n − 1" },
        { kata: "trisomi 21", label: "Trisomi 21 · sindrom Down" },
        { kata: "usia ibu", label: "Risiko naik seiring usia ibu" },
      ],
      narasi:
        "Kadang sepasang kromosom tidak berpisah saat meiosis: gagal berpisah (nondisjunction). Satu gamet lalu membawa kromosom lebih, yang lain kurang. Bila sel telur dengan dua kromosom 21 dibuahi, anaknya membawa tiga — trisomi 21 (trisomy 21), penyebab sindrom Down. Risikonya naik seiring usia ibu.",
    },
    {
      id: "penutup",
      tajuk: "Mengapa kamu tidak sama dengan saudaramu",
      tahap: "perbandingan",
      durasi: 25,
      sorot: [],
      narasi:
        "Setiap kali kromosom dikocok dan dibagi, muncul kombinasi baru — itulah sebabnya kamu mirip, tapi tidak sama dengan saudaramu, kecuali kembar identik. Tingkat 2 nanti menelusuri akibatnya lewat Hukum Mendel. Sebelum itu, Tingkat 1: apa sebenarnya DNA, dan bagaimana ia dibaca.",
    },
  ],

  poinKunci: [
    "Meiosis: dua kali pembelahan setelah satu kali penyalinan DNA, menghasilkan sel haploid.",
    "Di meiosis I, homolog berpasangan (sinapsis), bertukar potongan (pindah silang), lalu pasangannya yang dipisahkan — dengan arah tiap pasangan acak; di meiosis II, kromatid saudara dipisahkan.",
    "Pindah silang dan pembagian acak homolog adalah dua sumber utama keragaman antar saudara.",
    "Satu sel induk menghasilkan empat sperma, tetapi hanya satu sel telur (ditambah badan kutub yang kecil).",
    "Pembuahan menyatukan n + n = 2n: zigot manusia kembali membawa 46 kromosom, lalu membelah dengan mitosis.",
    "Gagal berpisah menghasilkan gamet n + 1 atau n − 1; contohnya trisomi 21 (sindrom Down), yang risikonya naik seiring usia ibu.",
    "Mitosis menyalin (dua sel identik, diploid); meiosis mengocok (sel-sel berbeda, haploid).",
  ],

  istilah: [
    { id: "Meiosis", en: "meiosis", arti: "Dua pembelahan berturut-turut yang menghasilkan sel haploid." },
    { id: "Gamet", en: "gamete", arti: "Sel kelamin haploid: sel telur dan sperma." },
    { id: "Sinapsis", en: "synapsis", arti: "Berpasangannya kromosom homolog pada awal meiosis I." },
    { id: "Pindah silang", en: "crossing over", arti: "Pertukaran potongan antara kromatid homolog; sumber keragaman." },
    { id: "Kiasma", en: "chiasma", arti: "Titik tempat kromatid homolog menyilang saat pindah silang." },
    { id: "Badan kutub", en: "polar body", arti: "Sel kecil hasil pembagian yang tidak seimbang saat sel telur dibentuk; akhirnya hilang." },
    { id: "Pembuahan", en: "fertilization", arti: "Bersatunya sperma dan sel telur; kromosom keduanya berkumpul dalam satu sel, jumlahnya kembali 2n." },
    { id: "Zigot", en: "zygote", arti: "Sel pertama hasil pembuahan, yang membelah menjadi seluruh tubuh." },
    { id: "Gagal berpisah", en: "nondisjunction", arti: "Sepasang kromosom atau kromatid tidak berpisah saat pembelahan." },
    { id: "Trisomi 21", en: "trisomy 21", arti: "Tiga salinan kromosom 21; penyebab sindrom Down." },
  ],

  rujukan: [
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 13: Meiosis and Sexual Life Cycles." },
    { teks: "OpenStax Biology 2e — 11.1 The Process of Meiosis.", url: "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis" },
    { teks: "Nature Scitable — Chromosomal Abnormalities: Aneuploidies.", url: "https://www.nature.com/scitable/topicpage/chromosomal-abnormalities-aneuploidies-290/" },
    { teks: "MedlinePlus Genetics — Down syndrome.", url: "https://medlineplus.gov/genetics/condition/down-syndrome/" },
    { teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM). Meiosis and Fertilization.", url: "https://www.ncbi.nlm.nih.gov/books/NBK9901/" },
  ],
};
