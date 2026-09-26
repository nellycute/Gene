import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 6.2 — Empat pengubah frekuensi alel
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R2 bab 10). Contoh Indonesia: badak jawa di Ujung Kulon (leher botol).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 6 (Populasi3D).
 */

export const pengubahFrekuensi: Pelajaran = {
  slug: "pengubah-frekuensi-alel",
  nomor: "6.2",
  level: 6,
  judul: "Empat pengubah frekuensi alel",
  ringkas:
    "Frekuensi alel berubah karena mutasi (sumber alel baru, sangat pelan), seleksi (alami atau buatan), migrasi (aliran gen), dan hanyutan genetik (kebetulan, kuat pada populasi kecil dan setelah leher botol). Kawin sedarah menambah homozigot tanpa mengubah frekuensi alel.",
  tingkat: "Lanjut",
  animasi: "populasi",
  draf: true,

  adegan: [
    {
      id: "evolusi",
      tajuk: "Frekuensi yang berubah",
      tahap: "pengubah",
      fokus: "utuh",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "berevolusi", fokus: "utuh", label: "Frekuensi alel berubah = evolusi" },
        { kata: "empat pengubah", fokus: "utuh", label: "Mutasi · seleksi · migrasi · hanyutan" },
      ],
      narasi:
        "Bila frekuensi alel berubah dari generasi ke generasi, populasi itu berevolusi. Ada empat pengubah utama: mutasi, seleksi, migrasi, dan hanyutan genetik.",
    },
    {
      id: "mutasi",
      tajuk: "Mutasi",
      tahap: "pengubah",
      fokus: "mutasi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Mutasi menambah", fokus: "mutasi", label: "Mutasi: sumber alel baru" },
        { kata: "sangat pelan", fokus: "mutasi", label: "± 1/100.000 – 1/1.000.000 gamet per generasi" },
      ],
      narasi:
        "Mutasi menambah alel baru, tetapi sangat pelan: laju mutasi satu gen umumnya sekitar satu per seratus ribu hingga satu per sejuta gamet tiap generasi. Mutasi menyediakan bahan; pengubah lain yang menggeser frekuensinya.",
    },
    {
      id: "seleksi",
      tajuk: "Seleksi",
      tahap: "seleksi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Seleksi (selection)", fokus: "utuh", label: "Seleksi: sebagian genotip lebih banyak beranak" },
        { kata: "seleksi buatan", fokus: "buatan", label: "Seleksi buatan: peternak memilih induk" },
      ],
      narasi:
        "Seleksi (selection): individu dengan genotip tertentu lebih banyak bertahan dan beranak. Peternak melakukan seleksi buatan — memilih induk terbaik — sehingga frekuensi alel yang diinginkan naik dengan cepat.",
    },
    {
      id: "migrasi",
      tajuk: "Migrasi",
      tahap: "migrasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "aliran gen (gene flow)", fokus: "utuh", label: "Migrasi = aliran gen" },
        { kata: "pejantan impor", fokus: "pindah", label: "Pejantan dari luar membawa alelnya" },
      ],
      narasi:
        "Migrasi atau aliran gen (gene flow): individu pindah dari satu populasi ke populasi lain dan membawa alelnya. Mendatangkan pejantan impor ke sebuah peternakan adalah contoh aliran gen.",
    },
    {
      id: "hanyutan",
      tajuk: "Hanyutan genetik",
      tahap: "hanyutan",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Hanyutan genetik", fokus: "utuh", label: "Hanyutan: kebetulan semata" },
        { kata: "populasi kecil", fokus: "kecil", label: "Populasi kecil: alel bisa hilang atau tetap" },
      ],
      narasi:
        "Hanyutan genetik (genetic drift): perubahan frekuensi alel karena kebetulan semata. Pada populasi kecil, sebuah alel bisa hilang, atau justru menjadi satu-satunya, hanya karena nasib.",
    },
    {
      id: "leher-botol",
      tajuk: "Leher botol",
      tahap: "hanyutan",
      fokus: "botol",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "leher botol (bottleneck)", fokus: "botol", label: "Leher botol: populasi menyusut tajam" },
        { kata: "Badak jawa", fokus: "botol", label: "Badak jawa: tinggal puluhan ekor" },
      ],
      narasi:
        "Peristiwa leher botol (bottleneck) — populasi tiba-tiba menyusut — memperkuat hanyutan. Badak jawa, yang kini tinggal puluhan ekor di Ujung Kulon, telah kehilangan banyak keragaman genetiknya.",
    },
    {
      id: "kawin-sedarah",
      tajuk: "Kawin sedarah",
      tahap: "hanyutan",
      fokus: "kawin",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Kawin sedarah", fokus: "kawin", label: "Kawin sedarah: homozigot bertambah" },
        { kata: "depresi silang dalam", fokus: "kawin", label: "Depresi silang dalam" },
      ],
      narasi:
        "Kawin sedarah (inbreeding) tidak mengubah frekuensi alel, tetapi menambah homozigot. Akibatnya alel resesif yang merugikan lebih sering tampak — disebut depresi silang dalam (inbreeding depression).",
    },
  ],

  poinKunci: [
    "Mutasi: laju per lokus per generasi umumnya 10⁻⁵–10⁻⁶; sendirian hanya menggeser frekuensi sangat pelan.",
    "Seleksi alami dan buatan mengubah frekuensi alel menurut kebugaran (fitness). Seleksi terhadap alel resesif langka lambat, karena kebanyakan salinannya tersembunyi pada heterozigot.",
    "Migrasi (aliran gen) menyamakan frekuensi alel antarpopulasi; pejantan impor dan inseminasi buatan adalah aliran gen pada ternak.",
    "Hanyutan genetik kuat pada populasi kecil; leher botol dan efek pendiri (founder effect) mengurangi keragaman — contoh badak jawa (Rhinoceros sondaicus) di Ujung Kulon.",
    "Kawin sedarah menaikkan homozigositas di semua lokus (koefisien inbreeding F) dan memunculkan depresi silang dalam; tidak mengubah frekuensi alel dengan sendirinya.",
  ],

  istilah: [
    { id: "Seleksi", en: "selection", arti: "Perbedaan kelangsungan hidup dan jumlah anak antargenotip." },
    { id: "Aliran gen", en: "gene flow", arti: "Pindahnya alel antarpopulasi lewat migrasi." },
    { id: "Hanyutan genetik", en: "genetic drift", arti: "Perubahan frekuensi alel karena kebetulan." },
    { id: "Leher botol", en: "bottleneck", arti: "Penyusutan tajam ukuran populasi." },
    { id: "Kawin sedarah", en: "inbreeding", arti: "Perkawinan antarindividu berkerabat." },
    { id: "Depresi silang dalam", en: "inbreeding depression", arti: "Turunnya kebugaran akibat kawin sedarah." },
  ],

  rujukan: [
    { teks: "Falconer DS, Mackay TFC. Introduction to Quantitative Genetics, edisi ke-4. Longman, 1996. Bab 2–5." },
    { teks: "Hartl DL, Clark AG. Principles of Population Genetics, edisi ke-4. Sinauer, 2007." },
    { teks: "Fernando P, dkk. Genetic diversity, phylogeny and conservation of the Javan rhinoceros. Conservation Genetics 7:439–448, 2006." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 10." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak (LUHT4326), Modul 1. Universitas Terbuka. KB 2." },
  ],
};
