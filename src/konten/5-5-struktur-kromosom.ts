import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.5 — Perubahan struktur kromosom
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 6.3).
 * Contoh ternak: translokasi robertsonian 1/29 pada sapi.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const strukturKromosom: Pelajaran = {
  slug: "perubahan-struktur-kromosom",
  nomor: "5.5",
  level: 5,
  judul: "Perubahan struktur kromosom",
  ringkas:
    "Kromosom yang patah bisa tersambung salah: delesi (hilang), duplikasi (berulang), inversi (terbalik), translokasi (pindah). Contoh: sindrom cri-du-chat (delesi 5p), translokasi robertsonian 1/29 pada sapi, dan kromosom 2 manusia hasil fusi dua kromosom leluhur.",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "patah",
      tajuk: "Patah dan tersambung salah",
      tahap: "struktur",
      fokus: "utuh",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "tersambung kembali", fokus: "utuh", label: "Patah → tersambung salah" },
        { kata: "empat jenis", fokus: "utuh", label: "Delesi · duplikasi · inversi · translokasi" },
      ],
      narasi:
        "Kromosom yang patah bisa tersambung kembali dengan cara yang salah. Hasilnya empat jenis perubahan struktur: delesi, duplikasi, inversi, dan translokasi.",
    },
    {
      id: "delesi",
      tajuk: "Delesi",
      tahap: "struktur",
      fokus: "delesi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Delesi (deletion)", fokus: "delesi", label: "Delesi: sepotong hilang" },
        { kata: "cri-du-chat", fokus: "delesi", label: "Cri-du-chat: ujung 5p hilang" },
      ],
      narasi:
        "Delesi (deletion): sepotong kromosom hilang. Contohnya sindrom cri-du-chat, akibat hilangnya ujung lengan pendek kromosom 5; tangis bayinya melengking seperti anak kucing.",
    },
    {
      id: "duplikasi",
      tajuk: "Duplikasi",
      tahap: "struktur",
      fokus: "duplikasi",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Duplikasi (duplication)", fokus: "duplikasi", label: "Duplikasi: sepotong berulang" },
        { kata: "tugas baru", fokus: "duplikasi", label: "Salinan gen → tugas baru (globin)" },
      ],
      narasi:
        "Duplikasi (duplication): sepotong kromosom berulang. Duplikasi penting dalam evolusi: salinan gen yang berlebih bisa berubah dan mendapat tugas baru, seperti gen-gen globin.",
    },
    {
      id: "inversi",
      tajuk: "Inversi",
      tahap: "struktur",
      fokus: "inversi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Inversi (inversion)", fokus: "inversi", label: "Inversi: sepotong terbalik" },
        { kata: "tak seimbang", fokus: "inversi", label: "Pindah silang di dalamnya → gamet tak seimbang" },
      ],
      narasi:
        "Inversi (inversion): sepotong kromosom terbalik arahnya. Gen tidak hilang, tetapi urutannya berubah, dan pindah silang di daerah itu sering menghasilkan gamet yang tak seimbang.",
    },
    {
      id: "translokasi",
      tajuk: "Translokasi",
      tahap: "struktur",
      fokus: "translokasi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Translokasi (translocation)", fokus: "translokasi", label: "Translokasi: pindah ke kromosom lain" },
        { kata: "robertsonian", fokus: "robertson", label: "Robertsonian: dua akrosentrik bersatu" },
      ],
      narasi:
        "Translokasi (translocation): sepotong kromosom pindah ke kromosom yang bukan homolognya. Pada translokasi robertsonian, dua kromosom akrosentrik bersatu di sentromernya menjadi satu kromosom besar.",
    },
    {
      id: "sapi",
      tajuk: "Translokasi 1/29 pada sapi",
      tahap: "struktur",
      fokus: "robertson",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "kromosom 1 dan 29", fokus: "robertson", label: "Sapi: translokasi 1/29" },
        { kata: "kesuburannya menurun", fokus: "robertson", label: "Pembawa sehat, kesuburan turun" },
        { kata: "diperiksa kariotipenya", fokus: "robertson", label: "Pejantan diperiksa sebelum dipakai" },
      ],
      narasi:
        "Pada sapi, translokasi robertsonian antara kromosom 1 dan 29 cukup umum. Pembawanya sehat, tetapi kesuburannya menurun, sehingga pejantan diperiksa kariotipenya sebelum dipakai untuk inseminasi buatan.",
    },
    {
      id: "kromosom-2",
      tajuk: "Kromosom 2 manusia",
      tahap: "fusi",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "48 kromosom", fokus: "utuh", label: "Kera besar 48 · manusia 46" },
        { kata: "penyatuan dua kromosom", fokus: "fusi", label: "Kromosom 2 = fusi dua kromosom leluhur" },
        { kata: "sisa telomer", fokus: "sisa", label: "Sisa telomer dan sentromer kedua" },
      ],
      narasi:
        "Fusi kromosom juga terjadi dalam evolusi. Kera besar punya 48 kromosom, manusia 46. Kromosom 2 manusia adalah hasil penyatuan dua kromosom leluhur — sisa telomer dan sentromer keduanya masih bisa ditemukan.",
    },
  ],

  poinKunci: [
    "Delesi: hilang (cri-du-chat, del 5p). Duplikasi: berulang (sumber gen baru, misalnya keluarga gen globin). Inversi: terbalik (parasentrik/perisentrik). Translokasi: pindah ke kromosom nonhomolog (resiprokal atau robertsonian).",
    "Pindah silang di dalam lingkar inversi menghasilkan kromatid dengan duplikasi dan delesi → gamet tak seimbang.",
    "Translokasi robertsonian: dua kromosom akrosentrik bersatu di sentromer. Pada manusia rob(14;21) dapat menyebabkan sindrom Down familial.",
    "Sapi: rob(1;29) menurunkan kesuburan ± 3–5%; pejantan inseminasi buatan diperiksa kariotipenya.",
    "Kromosom 2 manusia (46 kromosom) berasal dari fusi dua kromosom leluhur yang masih terpisah pada simpanse, gorila, dan orangutan (48 kromosom); jejak fusi telomer ada di 2q13.",
  ],

  istilah: [
    { id: "Delesi", en: "deletion", arti: "Hilangnya sepotong kromosom." },
    { id: "Duplikasi", en: "duplication", arti: "Berulangnya sepotong kromosom." },
    { id: "Inversi", en: "inversion", arti: "Sepotong kromosom terbalik arahnya." },
    { id: "Translokasi", en: "translocation", arti: "Sepotong kromosom pindah ke kromosom nonhomolog." },
    { id: "Translokasi robertsonian", en: "Robertsonian translocation", arti: "Dua kromosom akrosentrik bersatu di sentromer." },
    { id: "Akrosentrik", en: "acrocentric", arti: "Kromosom yang sentromernya sangat dekat ujung." },
  ],

  rujukan: [
    { teks: "Lejeune J, dkk. Trois cas de délétion partielle du bras court d'un chromosome 5. C R Acad Sci 257:3098–3102, 1963." },
    { teks: "Gustavsson I, Rockborn G. Chromosome abnormality in three cases of lymphatic leukaemia in cattle. Nature 203:990, 1964." },
    { teks: "IJdo JW, dkk. Origin of human chromosome 2: an ancestral telomere-telomere fusion. PNAS 88:9051–9055, 1991." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 6.3." },
  ],
};
