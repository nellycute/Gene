import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.1 — Mutasi gen: jenis dan akibatnya
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2).
 * Kodon memakai tabel kode genetik baku (pelajaran 1.6).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const mutasiGen: Pelajaran = {
  slug: "mutasi-gen",
  nomor: "5.1",
  level: 5,
  judul: "Mutasi gen: jenis dan akibatnya",
  ringkas:
    "Mutasi adalah perubahan urutan DNA. Substitusi satu basa bisa diam, salah makna, atau tanpa makna; insersi dan delesi menggeser kerangka baca. Mutasi terjadi spontan atau dipicu mutagen, dan menjadi sumber semua alel baru.",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "apa-itu",
      tajuk: "Perubahan urutan DNA",
      tahap: "kodon",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Mutasi (mutation)", fokus: "utuh", label: "Mutasi: perubahan urutan DNA" },
        { kata: "sel kelamin", fokus: "utuh", label: "Di sel kelamin → bisa diwariskan" },
        { kata: "semua alel baru", fokus: "utuh", label: "Sumber semua alel baru" },
      ],
      narasi:
        "Mutasi (mutation) adalah perubahan urutan DNA. Mutasi pada sel tubuh hanya berdampak pada individu itu; mutasi pada sel kelamin bisa diwariskan kepada keturunannya. Mutasi juga sumber semua alel baru.",
    },
    {
      id: "substitusi",
      tajuk: "Substitusi",
      tahap: "kodon",
      fokus: "utuh",
      durasi: 16,
      sorot: [],
      isyarat: [
        { kata: "substitusi (substitution)", fokus: "utuh", label: "Substitusi: satu basa diganti" },
        { kata: "tiga kemungkinan", fokus: "utuh", label: "Diam · salah makna · tanpa makna" },
      ],
      narasi:
        "Jenis paling sederhana adalah substitusi (substitution): satu basa diganti basa lain. Akibatnya bergantung pada kodon yang terbentuk. Ada tiga kemungkinan.",
    },
    {
      id: "diam",
      tajuk: "Mutasi diam",
      tahap: "kodon",
      fokus: "diam",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Mutasi diam", fokus: "diam", label: "Diam: asam amino sama" },
        { kata: "GAA dan GAG", fokus: "diam", label: "GAA → GAG: tetap glutamat" },
      ],
      narasi:
        "Mutasi diam (silent mutation): kodon baru menyandi asam amino yang sama. GAA dan GAG, misalnya, sama-sama menyandi glutamat, sehingga proteinnya tidak berubah.",
    },
    {
      id: "salah-makna",
      tajuk: "Mutasi salah makna",
      tahap: "kodon",
      fokus: "salah",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Mutasi salah makna", fokus: "salah", label: "Salah makna: asam amino lain" },
        { kata: "GAG berubah menjadi GUG", fokus: "salah", label: "GAG → GUG: glutamat → valin" },
      ],
      narasi:
        "Mutasi salah makna (missense): kodon baru menyandi asam amino lain. Pada anemia sel sabit, GAG berubah menjadi GUG, sehingga glutamat diganti valin pada hemoglobin.",
    },
    {
      id: "tanpa-makna",
      tajuk: "Mutasi tanpa makna",
      tahap: "kodon",
      fokus: "henti",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Mutasi tanpa makna", fokus: "henti", label: "Tanpa makna: menjadi kodon henti" },
        { kata: "UAC menjadi UAG", fokus: "henti", label: "UAC → UAG: rantai berhenti" },
      ],
      narasi:
        "Mutasi tanpa makna (nonsense): kodon berubah menjadi kodon henti, misalnya UAC menjadi UAG. Protein berhenti dibuat terlalu dini dan biasanya tidak berfungsi.",
    },
    {
      id: "geser",
      tajuk: "Pergeseran kerangka baca",
      tahap: "kodon",
      fokus: "geser",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Insersi (insertion)", fokus: "geser", label: "Insersi atau delesi satu basa" },
        { kata: "bergeser", fokus: "geser", label: "Semua kodon sesudahnya bergeser" },
        { kata: "kalimat", fokus: "kalimat", label: "IBU DAN AYU → IBD ANA YU…" },
      ],
      narasi:
        "Insersi (insertion) atau delesi (deletion) satu basa lebih berbahaya. Seluruh kodon sesudahnya bergeser — mutasi pergeseran kerangka baca (frameshift) — seperti kalimat tiga-huruf yang kehilangan satu huruf: semua kata sesudahnya kacau.",
    },
    {
      id: "penyebab",
      tajuk: "Penyebab mutasi",
      tahap: "penyebab",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "spontan", fokus: "utuh", label: "Spontan: salah salin saat replikasi" },
        { kata: "mutagen (mutagen)", fokus: "mutagen", label: "Mutagen: UV, sinar-X, zat kimia" },
      ],
      narasi:
        "Mutasi bisa terjadi spontan, misalnya salah salin saat replikasi. Bisa juga dipicu mutagen (mutagen): sinar ultraviolet, sinar-X, dan zat kimia tertentu, seperti yang terdapat dalam asap rokok.",
    },
    {
      id: "manfaat",
      tajuk: "Tidak selalu buruk",
      tahap: "penyebab",
      fokus: "manfaat",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kebanyakan mutasi", fokus: "mutagen", label: "Kebanyakan netral atau merugikan" },
        { kata: "bahan mentah", fokus: "manfaat", label: "Bahan mentah evolusi dan pemuliaan" },
      ],
      narasi:
        "Kebanyakan mutasi netral atau merugikan, tetapi sebagian menguntungkan. Mutasi adalah bahan mentah evolusi dan pemuliaan — misalnya mutasi yang membuat sapi tak bertanduk, dan gen leher gundul yang membantu ayam tahan panas.",
    },
  ],

  poinKunci: [
    "Mutasi somatik hanya berdampak pada individu; mutasi di sel galur germinal (sel kelamin) bisa diwariskan.",
    "Substitusi: transisi (purin↔purin, pirimidin↔pirimidin) atau transversi. Akibatnya: diam (asam amino sama), salah makna (asam amino lain), tanpa makna (kodon henti).",
    "Contoh: GAA/GAG = glutamat (diam); GAG → GUG = glutamat → valin pada β-globin, penyebab anemia sel sabit (salah makna); UAC (tirosin) → UAG (henti) (tanpa makna).",
    "Insersi atau delesi yang bukan kelipatan tiga menggeser kerangka baca: semua kodon sesudahnya berubah dan biasanya segera bertemu kodon henti.",
    "Mutagen: sinar UV (dimer timin), radiasi pengion (sinar-X, gamma), zat kimia (misalnya benzo[a]pirena dalam asap rokok).",
    "Mutasi bermanfaat di ternak: alel tak bertanduk (polled) pada sapi, gen leher gundul (Na) pada ayam yang membantu tahan panas.",
  ],

  istilah: [
    { id: "Mutasi", en: "mutation", arti: "Perubahan urutan DNA." },
    { id: "Substitusi", en: "substitution", arti: "Satu basa diganti basa lain." },
    { id: "Mutasi diam", en: "silent mutation", arti: "Kodon berubah tetapi asam aminonya sama." },
    { id: "Mutasi salah makna", en: "missense mutation", arti: "Kodon baru menyandi asam amino lain." },
    { id: "Mutasi tanpa makna", en: "nonsense mutation", arti: "Kodon berubah menjadi kodon henti." },
    { id: "Pergeseran kerangka baca", en: "frameshift", arti: "Insersi/delesi yang menggeser pembacaan kodon." },
    { id: "Mutagen", en: "mutagen", arti: "Faktor yang meningkatkan laju mutasi." },
  ],

  rujukan: [
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 16." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 17.5." },
    { teks: "Medugorac I, dkk. Bovine polledness – an autosomal dominant trait with allelic heterogeneity. PLoS ONE 7:e39477, 2012." },
    { teks: "Mahrous M, dkk. Effect of naked neck gene on performance of chickens under heat stress. International Journal of Poultry Science 7:45–54, 2008." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
  ],
};
