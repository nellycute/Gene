import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.3 — Sifat kuantitatif dan heritabilitas
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB1;
 * R2 bab 11). Nilai heritabilitas: kisaran umum dari pustaka pemuliaan sapi.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const heritabilitas: Pelajaran = {
  slug: "sifat-kuantitatif-heritabilitas",
  nomor: "6.3",
  level: 6,
  judul: "Sifat kuantitatif dan heritabilitas",
  ringkas:
    "Sifat kuantitatif diukur dan menyebar seperti lonceng; fenotipnya P = G + L (ditambah interaksi G × L). Ragam fenotip dipecah menjadi ragam genetik dan lingkungan. Heritabilitas (h²) adalah bagian ragam dari gen aditif; kemajuan seleksi R = h² × S.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "kualitatif",
      tajuk: "Kualitatif dan kuantitatif",
      tahap: "kuanti",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Sifat kualitatif", fokus: "kuali", label: "Kualitatif: dikelompokkan" },
        { kata: "Sifat kuantitatif", fokus: "utuh", label: "Kuantitatif: diukur, sebaran lonceng" },
      ],
      narasi:
        "Sifat kualitatif (qualitative trait), seperti warna bulu, bisa dikelompokkan dan biasanya diatur sedikit gen. Sifat kuantitatif, seperti bobot badan dan produksi susu, harus diukur, dan sebarannya berbentuk lonceng.",
    },
    {
      id: "pgl",
      tajuk: "P = G + L",
      tahap: "kuanti",
      fokus: "pgl",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "P = G + L", fokus: "pgl", label: "Fenotip = genetik + lingkungan" },
        { kata: "interaksi", fokus: "gxl", label: "Interaksi G × L" },
      ],
      narasi:
        "Fenotip sifat kuantitatif adalah jumlah pengaruh genetik dan lingkungan: P = G + L. Kadang ada juga interaksi genetik dengan lingkungan: genotip terbaik di satu tempat belum tentu terbaik di tempat lain.",
    },
    {
      id: "ragam",
      tajuk: "Ragam",
      tahap: "ragam",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "ragam (variance)", fokus: "utuh", label: "Ragam: ukuran keragaman" },
        { kata: "dipecah", fokus: "pecah", label: "Ragam fenotip = ragam genetik + ragam lingkungan" },
        { kata: "lewat seleksi", fokus: "pecah", label: "Bagian gen aditif → bisa diseleksi" },
      ],
      narasi:
        "Ahli pemuliaan mengukur keragaman dengan ragam (variance). Ragam fenotip dipecah menjadi ragam genetik dan ragam lingkungan. Bagian yang berasal dari gen yang diwariskan itulah yang bisa diperbaiki lewat seleksi.",
    },
    {
      id: "heritabilitas",
      tajuk: "Heritabilitas",
      tahap: "ragam",
      fokus: "h2",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Heritabilitas (heritability)", fokus: "h2", label: "h² = ragam aditif ÷ ragam fenotip" },
        { kata: "nol sampai satu", fokus: "h2", label: "0 ≤ h² ≤ 1" },
      ],
      narasi:
        "Heritabilitas (heritability), ditulis h², adalah bagian ragam fenotip yang berasal dari pengaruh gen aditif. Nilainya dari nol sampai satu.",
    },
    {
      id: "contoh",
      tajuk: "Contoh pada sapi",
      tahap: "ragam",
      fokus: "contoh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "bobot sapih", fokus: "contoh", label: "Bobot sapih: 0,2–0,3" },
        { kata: "produksi susu", fokus: "contoh", label: "Produksi susu: ± 0,3" },
        { kata: "kesuburan", fokus: "contoh", label: "Kesuburan: ± 0,05" },
      ],
      narasi:
        "Contohnya, heritabilitas bobot sapih sapi sekitar 0,2 sampai 0,3, produksi susu sekitar 0,3, sedangkan daya hidup dan kesuburan hanya sekitar 0,05. Sifat dengan h² tinggi lebih cepat diperbaiki lewat seleksi.",
    },
    {
      id: "respon",
      tajuk: "Meramal kemajuan seleksi",
      tahap: "ragam",
      fokus: "respon",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "respon seleksi", fokus: "respon", label: "R = h² × S" },
        { kata: "selisih seleksi", fokus: "respon", label: "S: keunggulan induk terpilih" },
      ],
      narasi:
        "Kemajuan seleksi bisa diramal: respon seleksi sama dengan heritabilitas dikali selisih seleksi — seberapa unggul induk-induk terpilih dibanding rata-rata kawanannya.",
    },
  ],

  poinKunci: [
    "Kualitatif: kelas terpisah, sedikit gen, sedikit pengaruh lingkungan. Kuantitatif: sebaran bersambung, banyak gen (poligenik), pengaruh lingkungan besar.",
    "P = G + L (+ G × L). G = A (aditif) + D (dominansi) + I (epistasis).",
    "Ragam fenotip V_P = V_G + V_L. Heritabilitas arti sempit h² = V_A ÷ V_P; arti luas H² = V_G ÷ V_P.",
    "Kisaran h² pada sapi: bobot sapih 0,2–0,3; bobot setahun ± 0,4; produksi susu ± 0,3; kesuburan dan daya hidup ± 0,05.",
    "Respon seleksi R = h² × S (S = selisih seleksi). Contoh: h² = 0,3 dan induk terpilih 20 kg di atas rata-rata → anak ± 6 kg lebih berat dari rata-rata.",
  ],

  istilah: [
    { id: "Sifat kualitatif", en: "qualitative trait", arti: "Sifat yang bisa dikelompokkan dalam kelas terpisah." },
    { id: "Ragam", en: "variance", arti: "Ukuran seberapa jauh nilai-nilai menyebar dari rata-ratanya." },
    { id: "Heritabilitas", en: "heritability", arti: "Bagian ragam fenotip yang berasal dari gen aditif (h²)." },
    { id: "Respon seleksi", en: "response to selection", arti: "Kemajuan rata-rata anak akibat seleksi induk." },
    { id: "Selisih seleksi", en: "selection differential", arti: "Beda rata-rata induk terpilih dengan rata-rata populasi." },
    { id: "Interaksi genotip-lingkungan", en: "genotype-by-environment interaction", arti: "Urutan keunggulan genotip berubah antarlingkungan." },
  ],

  rujukan: [
    { teks: "Falconer DS, Mackay TFC. Introduction to Quantitative Genetics, edisi ke-4. Longman, 1996. Bab 8–11." },
    { teks: "Bourdon RM. Understanding Animal Breeding, edisi ke-2. Prentice Hall, 2000." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 1." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 11." },
  ],
};
