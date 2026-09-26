import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 5.4 — Poliploidi
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R3 6.2).
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 5 (Mutasi3D).
 */

export const poliploidi: Pelajaran = {
  slug: "poliploidi",
  nomor: "5.4",
  level: 5,
  judul: "Poliploidi",
  ringkas:
    "Poliploid memiliki lebih dari dua set kromosom: triploid (3n), tetraploid (4n), heksaploid (6n). Semangka tanpa biji triploid; kolkisin menggandakan set kromosom; gandum roti alopoliploid heksaploid dari tiga genom (42 kromosom).",
  tingkat: "Menengah",
  animasi: "mutasi",
  draf: true,

  adegan: [
    {
      id: "set-kromosom",
      tajuk: "Lebih dari dua set",
      tahap: "ploidi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "poliploidi (polyploidy)", fokus: "utuh", label: "Poliploidi: set kromosom bertambah" },
        { kata: "triploid", fokus: "utuh", label: "2n · 3n · 4n · 6n" },
        { kata: "umum pada tumbuhan", fokus: "utuh", label: "Jarang pada hewan, umum pada tumbuhan" },
      ],
      narasi:
        "Pada poliploidi (polyploidy), seluruh set kromosom bertambah. Organisme triploid punya tiga set, tetraploid empat, dan heksaploid enam. Poliploidi jarang pada hewan, tetapi umum pada tumbuhan.",
    },
    {
      id: "semangka",
      tajuk: "Semangka tanpa biji",
      tahap: "semangka",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Semangka tetraploid", fokus: "induk", label: "4n × 2n" },
        { kata: "buah triploid", fokus: "buah", label: "Buah 3n: tanpa biji" },
        { kata: "tidak bisa berpasangan", fokus: "buah", label: "Tiga set tak bisa berpasangan rapi" },
      ],
      narasi:
        "Semangka tanpa biji adalah triploid. Semangka tetraploid disilangkan dengan semangka diploid, menghasilkan buah triploid. Tiga set kromosom tidak bisa berpasangan rapi saat meiosis, sehingga bijinya tidak berkembang.",
    },
    {
      id: "kolkisin",
      tajuk: "Kolkisin",
      tahap: "kolkisin",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "kolkisin (colchicine)", fokus: "utuh", label: "Kolkisin: benang gelendong tak terbentuk" },
        { kata: "dua kali lipat", fokus: "ganda", label: "Set kromosom menjadi dua kali lipat" },
      ],
      narasi:
        "Tanaman tetraploid dibuat dengan kolkisin (colchicine), zat yang mencegah terbentuknya benang gelendong. Kromosom sudah tergandakan tetapi sel tidak membelah, sehingga jumlah set kromosomnya menjadi dua kali lipat.",
    },
    {
      id: "auto-alo",
      tajuk: "Auto dan alo",
      tahap: "ploidi",
      fokus: "alo",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Autopoliploidi", fokus: "auto", label: "Auto: set satu spesies berlipat" },
        { kata: "Alopoliploidi", fokus: "alo", label: "Alo: set dua spesies bergabung" },
      ],
      narasi:
        "Autopoliploidi (autopolyploidy) berasal dari penggandaan set kromosom satu spesies. Alopoliploidi (allopolyploidy) berasal dari persilangan dua spesies berbeda, yang set kromosom gabungannya lalu tergandakan.",
    },
    {
      id: "gandum-roti",
      tajuk: "Gandum roti",
      tahap: "gandumRoti",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "heksaploid", fokus: "utuh", label: "Gandum roti: heksaploid" },
        { kata: "A, B, dan D", fokus: "genom", label: "Genom A + B + D, masing-masing 7 pasang" },
        { kata: "kromosomnya 42", fokus: "genom", label: "6 × 7 = 42 kromosom" },
      ],
      narasi:
        "Gandum roti adalah alopoliploid heksaploid. Ia memadukan tiga genom leluhur — A, B, dan D — masing-masing tujuh pasang kromosom, sehingga jumlah kromosomnya 42.",
    },
    {
      id: "manfaat",
      tajuk: "Tanaman budidaya poliploid",
      tahap: "ploidi",
      fokus: "tanaman",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "lebih besar", fokus: "tanaman", label: "Sel dan organ cenderung lebih besar" },
        { kata: "pisang triploid", fokus: "tanaman", label: "Pisang 3n · kentang 4n · stroberi 8n" },
      ],
      narasi:
        "Poliploid sering lebih besar dan lebih kuat — buah, bunga, dan umbinya membesar. Karena itu banyak tanaman budidaya bersifat poliploid: pisang triploid, kentang tetraploid, dan stroberi oktoploid.",
    },
  ],

  poinKunci: [
    "Euploidi: kelipatan utuh set kromosom (n, 2n, 3n, …). Poliploid: 3n (triploid), 4n (tetraploid), 6n (heksaploid), 8n (oktoploid).",
    "Triploid umumnya mandul karena tiga homolog tidak bisa berpasangan dua-dua saat meiosis — dimanfaatkan untuk semangka dan pisang tanpa biji.",
    "Kolkisin mengikat tubulin sehingga benang gelendong tak terbentuk; kromosom yang sudah tergandakan tertahan dalam satu sel.",
    "Autopoliploid: set dari satu spesies (kentang 4x). Alopoliploid: set dari spesies berbeda (gandum roti AABBDD, 2n = 6x = 42; kapas; kanola).",
    "Poliploidi jarang pada hewan karena mengganggu penentuan kelamin dan perkembangan, tetapi ada pada sebagian ikan, amfibi, dan serangga.",
  ],

  istilah: [
    { id: "Poliploidi", en: "polyploidy", arti: "Memiliki lebih dari dua set kromosom." },
    { id: "Triploid", en: "triploid", arti: "Memiliki tiga set kromosom (3n)." },
    { id: "Autopoliploidi", en: "autopolyploidy", arti: "Penggandaan set kromosom satu spesies." },
    { id: "Alopoliploidi", en: "allopolyploidy", arti: "Gabungan set kromosom dua spesies atau lebih." },
    { id: "Kolkisin", en: "colchicine", arti: "Zat yang mencegah terbentuknya benang gelendong." },
  ],

  rujukan: [
    { teks: "Kihara H, Nishiyama I. Different compatibility in reciprocal crosses of Avena. Japanese Journal of Botany 5:245–305, 1932." },
    { teks: "International Wheat Genome Sequencing Consortium. Shifting the limits in wheat research and breeding using a fully annotated reference genome. Science 361:eaar7191, 2018." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 17." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 6.2." },
  ],
};
