import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 4.6 — Peta kromosom
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R2 bab 7–8;
 * R3 5.5). Contoh persilangan tiga titik memakai angka bulat sederhana.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 4 (Kelamin3D).
 */

export const petaKromosom: Pelajaran = {
  slug: "peta-kromosom",
  nomor: "4.6",
  level: 4,
  judul: "Peta kromosom",
  ringkas:
    "Frekuensi rekombinasi bisa dipakai sebagai jarak: 1% rekombinasi = 1 sentimorgan (cM). Sturtevant membuat peta pertama pada 1913. Persilangan tiga titik menentukan urutan gen; jarak jauh sebaiknya dijumlahkan dari jarak-jarak pendek.",
  tingkat: "Menengah",
  animasi: "kelamin",
  draf: true,

  adegan: [
    {
      id: "sturtevant",
      tajuk: "Peta pertama",
      tahap: "peta",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Alfred Sturtevant", fokus: "utuh", label: "Sturtevant, 1913" },
        { kata: "peta kromosom", fokus: "utuh", label: "Peta pertama: kromosom X lalat buah" },
      ],
      narasi:
        "Tahun 1913, Alfred Sturtevant, mahasiswa Morgan, mendapat gagasan: bila frekuensi rekombinasi sebanding dengan jarak, gen-gen bisa disusun menjadi peta. Ia membuat peta kromosom (genetic map) pertama, untuk kromosom X lalat buah.",
    },
    {
      id: "sentimorgan",
      tajuk: "Sentimorgan",
      tahap: "peta",
      fokus: "cm",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "sentimorgan (centimorgan)", fokus: "cm", label: "1% rekombinasi = 1 cM" },
        { kata: "17 persen", fokus: "cm", label: "hitam – sayap pendek: ± 17 cM" },
      ],
      narasi:
        "Satuannya sentimorgan (centimorgan): satu persen rekombinasi sama dengan satu sentimorgan. Gen warna hitam dan sayap pendek lalat buah menghasilkan 17 persen rekombinan, jadi jaraknya sekitar 17 sentimorgan.",
    },
    {
      id: "tiga-titik",
      tajuk: "Persilangan tiga titik",
      tahap: "tigaTitik",
      fokus: "utuh",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "persilangan tiga titik", fokus: "utuh", label: "Tiga gen sekaligus" },
        { kata: "A dan B 10", fokus: "ab", label: "A–B: 10 cM" },
        { kata: "B dan C 7", fokus: "bc", label: "B–C: 7 cM" },
        { kata: "A dan C 17", fokus: "ac", label: "A–C: 17 cM" },
        { kata: "B di tengah", fokus: "urut", label: "10 + 7 = 17 → urutan A – B – C" },
      ],
      narasi:
        "Untuk menentukan urutan, dipakai persilangan tiga titik (three-point cross). Misalnya jarak A dan B 10 sentimorgan, B dan C 7, serta A dan C 17. Karena 10 + 7 = 17, urutannya A, B, C — dengan B di tengah.",
    },
    {
      id: "ganda-terlewat",
      tajuk: "Jarak jauh terhitung kurang",
      tahap: "tigaTitik",
      fokus: "ganda",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "terlalu kecil", fokus: "ganda", label: "Pindah silang ganda tak terlihat" },
        { kata: "jarak-jarak pendek", fokus: "urut", label: "Jumlahkan jarak pendek" },
      ],
      narasi:
        "Jarak yang jauh cenderung terhitung terlalu kecil, karena pindah silang ganda tidak terlihat sebagai rekombinan. Karena itu peta yang teliti disusun dari jarak-jarak pendek yang dijumlahkan.",
    },
    {
      id: "genetik-fisik",
      tajuk: "Peta genetik dan peta fisik",
      tahap: "peta",
      fokus: "fisik",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "bukan dengan pasangan basa", fokus: "fisik", label: "Peta genetik: cM · peta fisik: pasangan basa" },
        { kata: "satu juta pasangan basa", fokus: "fisik", label: "Manusia: 1 cM ≈ 1 Mb (rata-rata)" },
      ],
      narasi:
        "Peta genetik mengukur jarak dengan rekombinasi, bukan dengan pasangan basa. Pada manusia, satu sentimorgan rata-rata setara sekitar satu juta pasangan basa, tetapi nilainya berbeda-beda di sepanjang kromosom.",
    },
    {
      id: "manfaat",
      tajuk: "Untuk apa peta?",
      tahap: "peta",
      fokus: "penanda",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "letak gen", fokus: "penanda", label: "Menemukan letak gen" },
        { kata: "Penanda DNA", fokus: "penanda", label: "Penanda DNA dekat gen sasaran → seleksi" },
      ],
      narasi:
        "Peta kromosom membantu menemukan letak gen penyebab penyakit dan gen sifat penting pada ternak. Penanda DNA yang berdekatan dengan gen sasaran ikut diwariskan bersamanya, sehingga bisa dipakai untuk seleksi — dibahas di Tingkat 6.",
    },
  ],

  poinKunci: [
    "Jarak peta = frekuensi rekombinasi: 1% rekombinan = 1 sentimorgan (cM), satuan untuk menghormati Morgan.",
    "Sturtevant (1913) menyusun peta pertama kromosom X Drosophila dari data rekombinasi.",
    "Persilangan tiga titik: jarak terpendek-terpendek menentukan urutan; bila jarak A–B + B–C = A–C, B berada di tengah. Kelompok rekombinan paling jarang = hasil pindah silang ganda.",
    "Jarak jauh terhitung kurang karena pindah silang ganda tidak tampak; rekombinasi tidak pernah melampaui 50%.",
    "Peta genetik (cM) berbeda dari peta fisik (pasangan basa); pada manusia rata-rata 1 cM ≈ 1 Mb, tetapi ada titik panas rekombinasi.",
    "Penanda DNA yang berpautan erat dengan gen sasaran dipakai dalam seleksi berbantuan penanda (marker-assisted selection).",
  ],

  istilah: [
    { id: "Peta kromosom", en: "genetic map", arti: "Urutan dan jarak gen menurut frekuensi rekombinasi." },
    { id: "Sentimorgan", en: "centimorgan", arti: "Satuan jarak peta; 1 cM = 1% rekombinasi." },
    { id: "Persilangan tiga titik", en: "three-point cross", arti: "Uji silang yang melibatkan tiga gen sekaligus." },
    { id: "Peta fisik", en: "physical map", arti: "Jarak gen dalam pasangan basa." },
    { id: "Penanda DNA", en: "DNA marker", arti: "Urutan DNA yang mudah dideteksi dan menandai suatu letak." },
  ],

  rujukan: [
    { teks: "Sturtevant AH. The linear arrangement of six sex-linked factors in Drosophila, as shown by their mode of association. J Exp Zool 14:43–59, 1913." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 4." },
    { teks: "Kong A, dkk. A high-resolution recombination map of the human genome. Nature Genetics 31:241–247, 2002." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 5.5." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 7–8." },
  ],
};
