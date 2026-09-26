import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.4 — Genetika dalam pemuliaan
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB1;
 * R2 bab 1). Contoh Indonesia: kambing Peranakan Etawa, sapi Bali, sapi Madura.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const pemuliaan: Pelajaran = {
  slug: "genetika-dalam-pemuliaan",
  nomor: "6.4",
  level: 6,
  judul: "Genetika dalam pemuliaan",
  ringkas:
    "Pemuliaan memakai seleksi (memilih induk menurut nilai pemuliaannya, kini dibantu data DNA) dan sistem perkawinan (misalnya persilangan). Persilangan memberi heterosis, terbesar pada F1. Contoh: kambing Peranakan Etawa. Bangsa lokal menyimpan alel adaptasi yang perlu dijaga.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "dua-alat",
      tajuk: "Dua alat pemulia",
      tahap: "pemuliaan",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "seleksi", fokus: "seleksi", label: "Seleksi: memilih induk" },
        { kata: "sistem perkawinan", fokus: "kawin", label: "Sistem perkawinan: siapa dengan siapa" },
      ],
      narasi:
        "Pemuliaan ternak (animal breeding) memakai dua alat utama: seleksi — memilih induk terbaik — dan sistem perkawinan — memilih siapa dikawinkan dengan siapa. Keduanya bertujuan memperbaiki mutu genetik generasi berikutnya.",
    },
    {
      id: "nilai-pemuliaan",
      tajuk: "Nilai pemuliaan",
      tahap: "pemuliaan",
      fokus: "seleksi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "nilai pemuliaan", fokus: "seleksi", label: "Anak mewarisi ½ nilai pemuliaan tiap induk" },
        { kata: "seleksi genomik", fokus: "genomik", label: "Seleksi genomik: dibantu data DNA" },
      ],
      narasi:
        "Seleksi memanfaatkan pengaruh gen aditif: anak mewarisi separuh nilai pemuliaan (breeding value) tiap induknya. Nilai itu diperkirakan dari catatan produksi kerabat, dan kini makin sering dari data DNA — seleksi genomik.",
    },
    {
      id: "persilangan",
      tajuk: "Persilangan dan heterosis",
      tahap: "heterosis",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Persilangan (crossbreeding)", fokus: "utuh", label: "Persilangan: dua bangsa berbeda" },
        { kata: "heterosis", fokus: "grafik", label: "Heterosis: F1 di atas rata-rata tetua" },
        { kata: "kesuburan dan daya hidup", fokus: "grafik", label: "Terbesar pada sifat ber-h² rendah" },
      ],
      narasi:
        "Persilangan (crossbreeding) mengawinkan dua bangsa berbeda. Anaknya sering lebih unggul dari rata-rata kedua tetuanya — disebut heterosis (hybrid vigor). Heterosis paling besar pada sifat berheritabilitas rendah, seperti kesuburan dan daya hidup.",
    },
    {
      id: "kambing-pe",
      tajuk: "Kambing Peranakan Etawa",
      tahap: "kambing",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Peranakan Etawa", fokus: "utuh", label: "Etawa × Kacang → Peranakan Etawa" },
        { kata: "lebih besar", fokus: "pe", label: "PE: lebih besar, lebih banyak susu, tahan tropis" },
      ],
      narasi:
        "Contoh Indonesia: kambing Peranakan Etawa (PE), hasil persilangan kambing Etawa dari India dengan kambing Kacang lokal. PE lebih besar dan lebih banyak susunya daripada Kacang, tetapi tetap tahan iklim tropis.",
    },
    {
      id: "f1-terbaik",
      tajuk: "Heterosis terbesar pada F1",
      tahap: "heterosis",
      fokus: "grafik",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "persilangan pertama", fokus: "grafik", label: "F1: heterosis penuh" },
        { kata: "sebagian keunggulan itu hilang", fokus: "f2", label: "F2: tinggal ± separuh" },
      ],
      narasi:
        "Heterosis paling tampak pada persilangan pertama (F1). Bila F1 dikawinkan sesamanya, sebagian keunggulan itu hilang, karena heterozigositas berkurang pada generasi berikutnya.",
    },
    {
      id: "bangsa-lokal",
      tajuk: "Menjaga bangsa lokal",
      tahap: "pemuliaan",
      fokus: "lokal",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "sapi Bali", fokus: "lokal", label: "Sapi Bali · sapi Madura" },
        { kata: "alel adaptasi", fokus: "lokal", label: "Alel adaptasi: tahan panas, parasit, hemat pakan" },
        { kata: "menjaga keragaman", fokus: "lokal", label: "Menjaga keragaman genetik" },
      ],
      narasi:
        "Bangsa lokal seperti sapi Bali dan sapi Madura menyimpan alel adaptasi yang berharga: tahan panas, tahan parasit, dan hemat pakan. Karena itu pemuliaan juga berarti menjaga keragaman genetik, bukan hanya mengejar produksi.",
    },
  ],

  poinKunci: [
    "Nilai pemuliaan (breeding value) = nilai genetik aditif seekor ternak sebagai tetua; anak menerima rata-rata separuh nilai pemuliaan tiap tetua.",
    "Nilai pemuliaan diduga dari catatan sendiri dan kerabat (BLUP); seleksi genomik memakai puluhan ribu SNP untuk menduganya sejak lahir.",
    "Sistem perkawinan: silang dalam (inbreeding), silang luar (outbreeding), persilangan antarbangsa (crossbreeding), grading up.",
    "Heterosis = rata-rata F1 − rata-rata kedua tetua. Terbesar pada sifat ber-h² rendah (kesuburan, daya hidup); pada F2 tinggal ± separuh.",
    "Kambing Peranakan Etawa (PE): persilangan Etawa (Jamnapari, India) × Kacang, berkembang di Indonesia sejak awal abad ke-20.",
    "Sapi Bali (Bos javanicus domestik) dan sapi Madura adalah sumber daya genetik lokal yang adaptif; pelestariannya penting.",
  ],

  istilah: [
    { id: "Pemuliaan ternak", en: "animal breeding", arti: "Upaya memperbaiki mutu genetik ternak." },
    { id: "Nilai pemuliaan", en: "breeding value", arti: "Nilai genetik aditif seekor ternak sebagai tetua." },
    { id: "Persilangan", en: "crossbreeding", arti: "Perkawinan antara dua bangsa berbeda." },
    { id: "Heterosis", en: "hybrid vigor", arti: "Keunggulan keturunan silangan atas rata-rata tetuanya." },
    { id: "Seleksi genomik", en: "genomic selection", arti: "Seleksi berdasarkan nilai pemuliaan yang diduga dari data DNA." },
  ],

  rujukan: [
    { teks: "Bourdon RM. Understanding Animal Breeding, edisi ke-2. Prentice Hall, 2000." },
    { teks: "Meuwissen THE, Hayes BJ, Goddard ME. Prediction of total genetic value using genome-wide dense marker maps. Genetics 157:1819–1829, 2001." },
    { teks: "Sodiq A, Tawfik ES. Productivity and breeding strategies of sheep and goats in Indonesia: a review. Journal of Agriculture and Rural Development in the Tropics 105:71–82, 2004." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 1." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 1." },
  ],
};
