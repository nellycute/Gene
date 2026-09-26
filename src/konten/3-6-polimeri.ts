import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.6 — Polimeri dan sifat poligenik
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 7;
 * R3 3.1.3). Contoh: warna biji gandum (Nilsson-Ehle, 1909).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const polimeri: Pelajaran = {
  slug: "polimeri-dan-poligenik",
  nomor: "3.6",
  level: 3,
  judul: "Polimeri dan sifat poligenik",
  ringkas:
    "Beberapa gen bisa memengaruhi satu sifat dengan cara yang sama dan saling menjumlah. Gandum merah × putih memberi F2 15 merah : 1 putih, dengan merah bertingkat 1 : 4 : 6 : 4 : 1. Makin banyak gen, makin mulus kurva lonceng — sifat poligenik dan kuantitatif.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "polimeri",
      tajuk: "Gen yang saling menjumlah",
      tahap: "gandum",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "polimeri", fokus: "p", label: "Polimeri: pengaruh gen saling menjumlah" },
        { kata: "Nilsson-Ehle", fokus: "p", label: "Warna biji gandum · Nilsson-Ehle, 1909" },
      ],
      narasi:
        "Pada polimeri (polymeric genes), beberapa gen berbeda memengaruhi satu sifat dengan cara yang sama, dan pengaruhnya saling menjumlah. Contoh klasiknya warna biji gandum, diteliti Herman Nilsson-Ehle pada 1909.",
    },
    {
      id: "f2",
      tajuk: "F2: 15 : 1",
      tahap: "gandum",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "merah sedang", fokus: "f1", label: "F1: merah sedang (R₁r₁R₂r₂)" },
        { kata: "Pada F2", fokus: "f2", label: "15 merah : 1 putih" },
      ],
      narasi:
        "Gandum merah tua disilangkan dengan gandum putih. F1-nya merah sedang. Pada F2, lima belas dari enam belas biji berwarna merah dan hanya satu putih — rasio 15 : 1.",
    },
    {
      id: "gradasi",
      tajuk: "Merah yang bertingkat",
      tahap: "gandum",
      fokus: "gradasi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "bertingkat", fokus: "gradasi", label: "Merah bertingkat" },
        { kata: "1 : 4 : 6 : 4 : 1", fokus: "gradasi", label: "4 R : 3 R : 2 R : 1 R : 0 R = 1 : 4 : 6 : 4 : 1" },
        { kata: "pengaruh aditif", fokus: "gradasi", label: "Aditif: tiap R menambah warna" },
      ],
      narasi:
        "Namun merahnya bertingkat. Dikelompokkan menurut jumlah alel merah — empat, tiga, dua, satu, dan nol — hasilnya 1 : 4 : 6 : 4 : 1. Setiap alel merah menambah sedikit warna: inilah pengaruh aditif (additive effect).",
    },
    {
      id: "banyak-gen",
      tajuk: "Makin banyak gen, makin mulus",
      tahap: "kurva",
      fokus: "n1",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "satu gen", fokus: "n1", label: "1 gen: 3 kelas" },
        { kata: "dua gen", fokus: "n2", label: "2 gen: 5 kelas" },
        { kata: "tiga gen", fokus: "n3", label: "3 gen: 7 kelas" },
        { kata: "kurva lonceng", fokus: "banyak", label: "Banyak gen: kurva lonceng" },
      ],
      narasi:
        "Makin banyak gen yang terlibat, makin banyak kelas fenotipnya dan makin rapat jaraknya. Dengan satu gen ada tiga kelas, dua gen lima kelas, tiga gen tujuh kelas — sampai tampak seperti kurva lonceng yang mulus.",
    },
    {
      id: "poligenik",
      tajuk: "Sifat poligenik",
      tahap: "kurva",
      fokus: "banyak",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "sifat poligenik", fokus: "banyak", label: "Poligenik: diatur banyak gen" },
        { kata: "sifat kuantitatif", fokus: "banyak", label: "Kuantitatif: diukur, bukan dikelompokkan" },
      ],
      narasi:
        "Sifat yang diatur banyak gen seperti ini disebut sifat poligenik (polygenic trait). Nilainya berjenjang halus, sehingga diukur — dengan meter, kilogram, atau liter — bukan dikelompokkan. Karena itu disebut juga sifat kuantitatif (quantitative trait).",
    },
    {
      id: "manusia",
      tajuk: "Tinggi badan",
      tahap: "tinggi",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "Ribuan varian", fokus: "utuh", label: "Ribuan varian, masing-masing kecil" },
        { kata: "kurva lonceng", fokus: "kurva", label: "Tinggi badan: kurva lonceng" },
      ],
      narasi:
        "Tinggi badan manusia contohnya. Ribuan varian genetik ikut memengaruhinya, masing-masing hanya sedikit, ditambah lingkungan seperti gizi. Karena itu tinggi badan orang di satu populasi membentuk kurva lonceng.",
    },
    {
      id: "ternak",
      tajuk: "Sifat kuantitatif ternak",
      tahap: "kurva",
      fokus: "ternak",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "produksi susu", fokus: "ternak", label: "Susu, bobot, telur: kuantitatif" },
        { kata: "Tingkat 6", fokus: "ternak", label: "Lebih dalam: Tingkat 6" },
      ],
      narasi:
        "Pada ternak, produksi susu, pertambahan bobot badan, dan jumlah telur juga sifat kuantitatif. Seleksi sifat seperti ini memakai ukuran dan statistik, yang dibahas lebih dalam di Tingkat 6.",
    },
  ],

  poinKunci: [
    "Polimeri (gen aditif/duplikat kumulatif): beberapa gen berbeda memengaruhi satu sifat searah dan pengaruhnya dijumlahkan.",
    "Gandum (Nilsson-Ehle, 1909): R₁R₁R₂R₂ merah tua × r₁r₁r₂r₂ putih → F1 merah sedang → F2 15 berwarna : 1 putih, dengan kelas 1 : 4 : 6 : 4 : 1 menurut jumlah alel R (4, 3, 2, 1, 0).",
    "Dengan n gen aditif ada 2n + 1 kelas fenotip. Makin banyak gen, makin mulus sebarannya — ditambah pengaruh lingkungan, menjadi kurva lonceng (sebaran normal).",
    "Sifat poligenik/kuantitatif diukur (tinggi badan, bobot, produksi susu), bukan dikelompokkan seperti sifat kualitatif (warna biji ercis).",
    "Tinggi badan manusia dipengaruhi ribuan varian genetik, masing-masing berefek kecil, serta gizi dan kesehatan.",
  ],

  istilah: [
    { id: "Polimeri", en: "polymeric genes", arti: "Beberapa gen berbeda yang pengaruhnya pada satu sifat saling menjumlah." },
    { id: "Pengaruh aditif", en: "additive effect", arti: "Setiap alel menambah nilai sifat sedikit demi sedikit." },
    { id: "Sifat poligenik", en: "polygenic trait", arti: "Sifat yang diatur banyak gen." },
    { id: "Sifat kuantitatif", en: "quantitative trait", arti: "Sifat yang diukur dengan angka dan sebarannya bersambung." },
    { id: "Kurva lonceng", en: "bell curve", arti: "Sebaran normal: banyak di tengah, sedikit di kedua ujung." },
  ],

  rujukan: [
    { teks: "Nilsson-Ehle H. Kreuzungsuntersuchungen an Hafer und Weizen. Lunds Universitets Årsskrift 5(2):1–122, 1909." },
    { teks: "Yengo L, dkk. A saturated map of common genetic variants associated with human height. Nature 610:704–712, 2022." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 19." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.3." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 7 dan 11." },
  ],
};
