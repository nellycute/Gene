import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.2 — Perbaikan DNA
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Tambahan (tidak ada di ketiga buku
 * rujukan). Menyentuh kanker dan penyakit: bahan belajar, bukan nasihat medis.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const perbaikanDNA: Pelajaran = {
  slug: "perbaikan-dna",
  nomor: "5.2",
  level: 5,
  judul: "Perbaikan DNA",
  ringkas:
    "DNA setiap sel rusak puluhan ribu kali sehari, tetapi hampir semuanya diperbaiki: penyuntingan oleh DNA polimerase, perbaikan salah pasang, perbaikan eksisi untuk dimer timin, dan penyambungan untai ganda yang patah. Bila perbaikan gagal, mutasi menumpuk.",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "kerusakan",
      tajuk: "Kerusakan setiap hari",
      tahap: "rusak",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "puluhan ribu kerusakan", fokus: "utuh", label: "± 10.000–100.000 kerusakan per sel per hari" },
        { kata: "terus memperbaikinya", fokus: "utuh", label: "Hampir semuanya diperbaiki" },
      ],
      narasi:
        "Setiap hari DNA di setiap sel kita mengalami puluhan ribu kerusakan, dari panas tubuh, zat hasil metabolisme, sampai sinar matahari. Namun hanya sedikit sekali yang menjadi mutasi, karena sel terus memperbaikinya.",
    },
    {
      id: "penyuntingan",
      tajuk: "Penyuntingan",
      tahap: "perbaikan",
      fokus: "baca",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "DNA polimerase memeriksa", fokus: "baca", sorot: ["enzim"], label: "DNA polimerase memeriksa tiap basa" },
        { kata: "langsung dibuang", fokus: "buang", sorot: [], label: "Basa salah dibuang, diganti" },
        { kata: "penyuntingan (proofreading)", fokus: "buang", label: "Penyuntingan (proofreading)" },
      ],
      narasi:
        "Perbaikan pertama terjadi saat replikasi. DNA polimerase memeriksa setiap basa yang baru dipasang; bila salah, basa itu langsung dibuang dan diganti. Ini disebut penyuntingan (proofreading).",
    },
    {
      id: "salah-pasang",
      tajuk: "Perbaikan salah pasang",
      tahap: "perbaikan",
      fokus: "salah",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "perbaikan salah pasang", fokus: "salah", label: "Perbaikan salah pasang (mismatch repair)" },
        { kata: "memotong", fokus: "potong", label: "Potong untai baru, salin ulang" },
        { kata: "satu miliar", fokus: "potong", label: "Tersisa ± 1 salah per 1 miliar basa" },
      ],
      narasi:
        "Salah pasang yang lolos ditangani perbaikan salah pasang (mismatch repair): enzim mengenali untai baru, memotong bagian yang salah, lalu menyalin ulang. Kesalahan tinggal sekitar satu per satu miliar basa.",
    },
    {
      id: "dimer-timin",
      tajuk: "Dimer timin",
      tahap: "uv",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Sinar ultraviolet", fokus: "utuh", label: "Sinar UV" },
        { kata: "dimer timin", fokus: "dimer", sorot: ["basaT"], label: "Dua T bersebelahan saling terikat" },
        { kata: "perbaikan eksisi", fokus: "eksisi", sorot: [], label: "Eksisi: potong, lalu isi kembali" },
      ],
      narasi:
        "Sinar ultraviolet membuat dua timin yang bersebelahan saling berikatan — dimer timin (thymine dimer) — sehingga untai DNA tertekuk. Enzim perbaikan eksisi (excision repair) memotong potongan yang rusak dan mengisinya kembali.",
    },
    {
      id: "patah-ganda",
      tajuk: "Kedua untai patah",
      tahap: "patah",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "patahnya kedua untai", fokus: "utuh", label: "Patah untai ganda: paling berbahaya" },
        { kata: "kromosom homolog", fokus: "sambung", label: "Homolog dipakai sebagai contekan" },
        { kata: "Bila gagal", fokus: "gagal", label: "Gagal → potongan hilang atau pindah" },
      ],
      narasi:
        "Kerusakan paling berbahaya adalah patahnya kedua untai sekaligus. Sel menyambungnya kembali, kadang memakai kromosom homolog sebagai contekan. Bila gagal, potongan kromosom bisa hilang atau tersambung ke tempat lain.",
    },
    {
      id: "bila-gagal",
      tajuk: "Bila perbaikan gagal",
      tahap: "gagal",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "xeroderma pigmentosum", fokus: "utuh", label: "Xeroderma pigmentosum: eksisi rusak" },
        { kata: "Banyak kanker", fokus: "kanker", label: "Kanker: mutasi gen pengatur pembelahan" },
      ],
      narasi:
        "Bila perbaikan gagal, mutasi menumpuk. Pada penderita xeroderma pigmentosum, enzim perbaikan eksisi rusak, sehingga kulitnya sangat peka sinar matahari. Banyak kanker bermula dari mutasi pada gen pengatur pembelahan sel.",
    },
  ],

  poinKunci: [
    "Kerusakan DNA spontan: depurinasi, deaminasi (sitosin → urasil), kerusakan oksidatif; ditambah UV dan zat kimia. Diperkirakan 10⁴–10⁵ kerusakan per sel per hari.",
    "Penyuntingan 3′→5′ oleh DNA polimerase menurunkan salah pasang dari ± 1/10⁵ menjadi ± 1/10⁷; perbaikan salah pasang menurunkannya lagi menjadi ± 1/10⁹–10¹⁰.",
    "UV membentuk dimer timin (dimer pirimidin); diperbaiki oleh perbaikan eksisi nukleotida (NER). Kerusakan NER → xeroderma pigmentosum.",
    "Patah untai ganda diperbaiki lewat penyambungan ujung (NHEJ, rawan salah) atau rekombinasi homolog (memakai kromatid saudara/homolog sebagai contekan).",
    "Mutasi pada gen pengatur pembelahan (proto-onkogen, penekan tumor seperti TP53, BRCA1/2) dapat memicu kanker. Ini bahan belajar, bukan nasihat medis.",
  ],

  istilah: [
    { id: "Penyuntingan", en: "proofreading", arti: "Pemeriksaan basa baru oleh DNA polimerase." },
    { id: "Perbaikan salah pasang", en: "mismatch repair", arti: "Memperbaiki basa salah pasang yang lolos penyuntingan." },
    { id: "Dimer timin", en: "thymine dimer", arti: "Dua timin bersebelahan yang terikat akibat sinar UV." },
    { id: "Perbaikan eksisi", en: "excision repair", arti: "Memotong bagian rusak lalu mengisinya kembali." },
    { id: "Patah untai ganda", en: "double-strand break", arti: "Kedua untai DNA putus di tempat yang sama." },
  ],

  rujukan: [
    { teks: "Lindahl T. Instability and decay of the primary structure of DNA. Nature 362:709–715, 1993." },
    { teks: "Hoeijmakers JHJ. DNA damage, aging, and cancer. New England Journal of Medicine 361:1475–1485, 2009." },
    { teks: "Kunkel TA. DNA replication fidelity. Journal of Biological Chemistry 279:16895–16898, 2004." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 16." },
  ],
};
