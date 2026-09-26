import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.6 — Sekuensing dan penanda genetik
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 4).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const sekuensingPenanda: Pelajaran = {
  slug: "sekuensing-dan-penanda-genetik",
  nomor: "6.6",
  level: 6,
  judul: "Sekuensing dan penanda genetik",
  ringkas:
    "Sekuensing membaca urutan basa: metode Sanger (1977) memakai basa penghenti bertanda warna; mesin generasi baru membaca miliaran potongan sekaligus. Penanda genetik (mikrosatelit, SNP) dipakai untuk mengukur keragaman, memastikan silsilah, dan seleksi genomik.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "sanger",
      tajuk: "Metode Sanger",
      tahap: "sanger",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Sekuensing DNA", fokus: "utuh", label: "Sekuensing: membaca urutan basa" },
        { kata: "Frederick Sanger", fokus: "utuh", label: "Sanger, 1977" },
        { kata: "menghentikan penyalinan", fokus: "potong", label: "Basa penghenti bertanda warna" },
      ],
      narasi:
        "Sekuensing DNA (DNA sequencing) berarti membaca urutan basa. Frederick Sanger mengembangkan caranya pada 1977: DNA disalin dengan tambahan basa khusus yang menghentikan penyalinan, masing-masing bertanda warna berbeda.",
    },
    {
      id: "membaca",
      tajuk: "Membaca warna",
      tahap: "sanger",
      fokus: "potong",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "menurut panjang", fokus: "potong", label: "Potongan diurutkan menurut panjang" },
        { kata: "urutan warna", fokus: "baca", label: "Urutan warna = urutan basa" },
      ],
      narasi:
        "Potongan-potongan hasilnya dipisahkan menurut panjang. Karena setiap potongan berakhir pada basa bertanda, urutan warna dari yang terpendek sampai terpanjang langsung menjadi urutan basa.",
    },
    {
      id: "generasi-baru",
      tajuk: "Sekuensing generasi baru",
      tahap: "ngs",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "miliaran potongan", fokus: "utuh", label: "Miliaran potongan sekaligus" },
        { kata: "13 tahun", fokus: "utuh", label: "Genom manusia: 13 tahun → kurang dari sehari" },
      ],
      narasi:
        "Kini mesin sekuensing generasi baru membaca miliaran potongan sekaligus. Genom manusia yang dulu dibaca selama 13 tahun dengan biaya miliaran dolar kini bisa dibaca dalam sehari.",
    },
    {
      id: "penanda",
      tajuk: "Penanda genetik",
      tahap: "penanda",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Penanda genetik", fokus: "utuh", label: "Penanda: titik DNA yang berbeda antarindividu" },
        { kata: "mikrosatelit", fokus: "mikro", label: "Mikrosatelit: ulangan pendek, jumlahnya beragam" },
        { kata: "SNP", fokus: "snp", label: "SNP: beda satu basa" },
      ],
      narasi:
        "Penanda genetik (genetic marker) adalah titik di DNA yang berbeda-beda antarindividu. Dua yang paling sering dipakai: mikrosatelit, yaitu ulangan pendek yang jumlahnya bervariasi, dan SNP, perbedaan satu basa.",
    },
    {
      id: "keragaman",
      tajuk: "Mengukur keragaman",
      tahap: "penanda",
      fokus: "keragaman",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "keragaman genetik", fokus: "keragaman", label: "Keragaman ternak lokal" },
        { kata: "Makin beragam", fokus: "keragaman", label: "Makin beragam → bekal menghadapi perubahan" },
      ],
      narasi:
        "Penanda dipakai untuk mengukur keragaman genetik ternak lokal, memastikan silsilah, dan mencari gen penting. Makin beragam alel di satu populasi, makin besar bekalnya menghadapi perubahan.",
    },
    {
      id: "genomik",
      tajuk: "Chip SNP",
      tahap: "penanda",
      fokus: "chip",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Chip SNP", fokus: "chip", label: "Chip SNP: puluhan ribu penanda" },
        { kata: "seleksi genomik", fokus: "chip", label: "Seleksi genomik sejak lahir" },
      ],
      narasi:
        "Chip SNP membaca puluhan ribu penanda seekor sapi sekaligus. Dari situ nilai pemuliaannya bisa diperkirakan sejak anak sapi lahir — itulah seleksi genomik yang kini dipakai di banyak negara.",
    },
  ],

  poinKunci: [
    "Metode Sanger (terminasi rantai, 1977): dideoksinukleotida (ddNTP) bertanda fluoresen menghentikan penyalinan; potongan dipisah menurut panjang (elektroforesis kapiler).",
    "Sekuensing generasi baru (NGS) membaca jutaan–miliaran potongan pendek secara paralel; Proyek Genom Manusia (1990–2003) menelan ± 3 miliar dolar AS.",
    "Mikrosatelit (STR): ulangan 1–6 basa, sangat beragam, dipakai untuk uji silsilah dan keragaman. SNP: variasi satu basa, sangat banyak dan mudah dibaca otomatis.",
    "Chip SNP ternak (misalnya 50 ribu SNP pada sapi) menjadi dasar seleksi genomik; akurasi dugaan nilai pemuliaan naik dan interval generasi memendek.",
  ],

  istilah: [
    { id: "Sekuensing DNA", en: "DNA sequencing", arti: "Menentukan urutan basa DNA." },
    { id: "Sekuensing generasi baru", en: "next-generation sequencing", arti: "Membaca banyak potongan DNA secara serentak." },
    { id: "Penanda genetik", en: "genetic marker", arti: "Letak DNA yang berbeda antarindividu dan mudah diperiksa." },
    { id: "Mikrosatelit", en: "microsatellite", arti: "Urutan pendek yang berulang, jumlah ulangannya beragam." },
    { id: "SNP", en: "single nucleotide polymorphism", arti: "Perbedaan satu basa di satu letak DNA." },
  ],

  rujukan: [
    { teks: "Sanger F, Nicklen S, Coulson AR. DNA sequencing with chain-terminating inhibitors. PNAS 74:5463–5467, 1977." },
    { teks: "International Human Genome Sequencing Consortium. Finishing the euchromatic sequence of the human genome. Nature 431:931–945, 2004." },
    { teks: "Matukumalli LK, dkk. Development and characterization of a high density SNP genotyping assay for cattle. PLoS ONE 4:e5350, 2009." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 4." },
  ],
};
