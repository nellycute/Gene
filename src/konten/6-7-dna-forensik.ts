import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.7 — DNA dalam forensik dan keseharian
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 7.4).
 * Pelajaran terakhir Tingkat 6 (dan seluruh jalur dasar).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const dnaForensik: Pelajaran = {
  slug: "dna-forensik-dan-keseharian",
  nomor: "6.7",
  level: 6,
  judul: "DNA dalam forensik dan keseharian",
  ringkas:
    "Sidik DNA membandingkan sekitar dua puluh lokus mikrosatelit (STR). Dipakai di forensik, identifikasi korban bencana, uji paternitas (satu alel dari ibu, satu dari ayah di setiap lokus), dan identifikasi spesies lewat barcode DNA. Data DNA sangat pribadi dan perlu dilindungi.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "sidik-dna",
      tajuk: "Sidik DNA",
      tahap: "sidik",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "kembar identik", fokus: "utuh", label: "DNA tiap orang berbeda (kecuali kembar identik)" },
        { kata: "Alec Jeffreys", fokus: "utuh", label: "Sidik DNA · Alec Jeffreys, 1984" },
      ],
      narasi:
        "Tidak ada dua orang yang DNA-nya sama persis, kecuali kembar identik. Sidik DNA (DNA fingerprinting), yang dikembangkan Alec Jeffreys pada 1984, memanfaatkan perbedaan ini untuk mengenali seseorang.",
    },
    {
      id: "str",
      tajuk: "Lokus STR",
      tahap: "sidik",
      fokus: "str",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "dua puluh lokus", fokus: "str", label: "± 20 lokus STR" },
        { kata: "dua alel", fokus: "str", label: "Tiap lokus: dua alel (jumlah ulangan)" },
        { kata: "satu per miliar", fokus: "str", label: "Cocok kebetulan: < 1 per miliar" },
      ],
      narasi:
        "Kini dipakai sekitar dua puluh lokus mikrosatelit (STR). Di setiap lokus seseorang membawa dua alel dengan jumlah ulangan tertentu. Peluang dua orang tak berkerabat cocok di semua lokus sangat kecil — kurang dari satu per miliar.",
    },
    {
      id: "forensik",
      tajuk: "Forensik",
      tahap: "sidik",
      fokus: "tkp",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tempat kejadian", fokus: "tkp", label: "Bukti: rambut, darah, air liur" },
        { kata: "korban bencana", fokus: "tkp", label: "Juga untuk mengenali korban bencana" },
      ],
      narasi:
        "Dalam forensik, profil DNA dari rambut, darah, atau air liur di tempat kejadian dibandingkan dengan profil tersangka. DNA juga dipakai untuk mengenali korban bencana.",
    },
    {
      id: "paternitas",
      tajuk: "Uji paternitas",
      tahap: "ayah",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "prinsip Mendel", fokus: "utuh", label: "Satu alel dari ibu, satu dari ayah" },
        { kata: "ayah biologisnya", fokus: "cocok", label: "Alel dari ayah harus ada pada ayah biologis" },
      ],
      narasi:
        "Uji paternitas memakai prinsip Mendel: setiap anak mewarisi satu alel dari ibu dan satu dari ayah di setiap lokus. Alel anak yang tidak berasal dari ibu harus ditemukan pada ayah biologisnya.",
    },
    {
      id: "spesies",
      tajuk: "Barcode DNA",
      tahap: "spesies",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "barcode DNA", fokus: "utuh", label: "Barcode DNA: potongan gen mitokondria" },
        { kata: "kehalalan daging", fokus: "daging", label: "Memeriksa kehalalan daging" },
        { kata: "satwa liar", fokus: "daging", label: "Melacak perdagangan satwa liar" },
      ],
      narasi:
        "Identifikasi spesies membaca potongan DNA penanda, misalnya gen sitokrom oksidase di mitokondria — disebut barcode DNA. Cara ini dipakai untuk memeriksa kehalalan daging dan melacak perdagangan satwa liar.",
    },
    {
      id: "etika",
      tajuk: "Data yang sangat pribadi",
      tahap: "etika",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "sangat pribadi", fokus: "utuh", label: "DNA bercerita tentang kita dan kerabat" },
        { kata: "izin", fokus: "utuh", label: "Izin · keamanan data · aturan hukum" },
      ],
      narasi:
        "Data DNA sangat pribadi: ia bercerita tentang kita dan juga kerabat kita. Karena itu pemakaiannya perlu izin, keamanan data, dan aturan hukum yang jelas.",
    },
    {
      id: "penutup",
      tajuk: "Tujuh tingkat selesai",
      tahap: "penutup",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tujuh tingkat", fokus: "utuh", label: "Sel → DNA → Mendel → … → populasi dan laboratorium" },
        { kata: "Terima kasih", fokus: "utuh", label: "Terima kasih sudah belajar bersama" },
      ],
      narasi:
        "Selesai sudah tujuh tingkat Ruang Genetika: dari sel, DNA, dan Mendel, sampai populasi dan laboratorium. Terima kasih sudah belajar bersama — genetika ada di setiap makhluk hidup di sekitar kita.",
    },
  ],

  poinKunci: [
    "Sidik DNA (Jeffreys, 1984) awalnya memakai minisatelit; kini profil DNA memakai ± 20 lokus STR inti (misalnya standar CODIS) plus penanda kelamin (amelogenin).",
    "Peluang kecocokan acak profil STR lengkap untuk orang tak berkerabat umumnya < 10⁻⁹; kerabat dekat lebih mungkin mirip.",
    "Uji paternitas: di setiap lokus, satu alel anak cocok dengan ibu; alel lainnya harus ada pada terduga ayah. Ketidakcocokan di beberapa lokus menyingkirkan terduga ayah.",
    "Barcode DNA: urutan pendek gen mitokondria (misalnya COI, sitokrom b) yang khas tiap spesies — dipakai untuk uji kehalalan, penipuan pangan, dan perdagangan satwa liar.",
    "Etika data genetik: persetujuan, kerahasiaan, dan batas penggunaan oleh penegak hukum atau perusahaan. Ini bahan belajar, bukan nasihat hukum atau medis.",
  ],

  istilah: [
    { id: "Sidik DNA", en: "DNA fingerprinting", arti: "Mengenali individu dari pola DNA-nya." },
    { id: "Profil DNA", en: "DNA profile", arti: "Kumpulan alel seseorang di lokus-lokus STR." },
    { id: "STR", en: "short tandem repeat", arti: "Ulangan pendek bersambung; nama lain mikrosatelit." },
    { id: "Uji paternitas", en: "paternity test", arti: "Pemeriksaan hubungan ayah–anak dengan DNA." },
    { id: "Barcode DNA", en: "DNA barcoding", arti: "Mengenali spesies dari potongan DNA pendek yang khas." },
  ],

  rujukan: [
    { teks: "Jeffreys AJ, Wilson V, Thein SL. Individual-specific 'fingerprints' of human DNA. Nature 316:76–79, 1985." },
    { teks: "Butler JM. Advanced Topics in Forensic DNA Typing: Methodology. Academic Press, 2012." },
    { teks: "Hebert PDN, dkk. Biological identifications through DNA barcodes. Proc R Soc B 270:313–321, 2003." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 7.4." },
  ],
};
