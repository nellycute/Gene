import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 2.1 — Mendel, kacang ercis, dan istilah dasar
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026 (Tingkat 2 dikerjakan atas
 * permintaan pemilik tanpa jeda tanya-jawab). Mengikuti KURIKULUM.md
 * (R1 KB2; R3 2.1–2.2). Data dan tahun dicocokkan dengan makalah Mendel 1866
 * (terjemahan Inggris) dan buku ajar baku di `rujukan`.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: film Tingkat 2 (Mendel3D). Warna sifat dari SIFAT di warna.ts.
 */

export const mendelKacangErcis: Pelajaran = {
  slug: "mendel-dan-kacang-ercis",
  nomor: "2.1",
  level: 2,
  judul: "Mendel, kacang ercis, dan istilah dasar",
  ringkas:
    "Mengapa percobaan Mendel berhasil: kacang ercis, penyerbukan silang buatan, galur murni, dan tujuh sifat — lalu istilah dasar genetika: gen, alel, lokus, genotip, fenotip, homozigot, heterozigot, dominan, resesif, P–F1–F2.",
  tingkat: "Dasar",
  animasi: "mendel",
  draf: true,

  adegan: [
    {
      id: "kebun",
      tajuk: "Kebun biara di Brno",
      tahap: "kebun",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Gregor Mendel", fokus: "utuh", label: "Gregor Mendel (1822–1884)" },
        { kata: "puluhan ribu", fokus: "dekat", label: "1856–1863 · puluhan ribu tanaman" },
        { kata: "aturan pewarisan", fokus: "utuh", label: "Terbit 1866" },
      ],
      narasi:
        "Di kebun biara Santo Thomas di Brno, antara 1856 dan 1863, Gregor Mendel menanam dan menyilangkan puluhan ribu tanaman kacang ercis (Pisum sativum). Ia mencatat sifat setiap keturunannya dengan teliti — dan menemukan aturan pewarisan.",
    },
    {
      id: "alasan",
      tajuk: "Mengapa kacang ercis",
      tahap: "bunga",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Tumbuhnya cepat", fokus: "utuh", label: "Cepat tumbuh, banyak keturunan" },
        { kata: "jelas berbeda", fokus: "utuh", sorot: ["bungaUngu", "bungaPutih"], label: "Sifat yang jelas berbeda" },
        { kata: "menyerbuk sendiri", fokus: "lunas", sorot: [], label: "Bunga tertutup: menyerbuk sendiri" },
      ],
      narasi:
        "Ercis dipilih dengan cermat. Tumbuhnya cepat, keturunannya banyak, dan sifat-sifatnya jelas berbeda — tinggi atau kerdil, ungu atau putih. Bunganya biasanya menyerbuk sendiri, tetapi bisa juga disilangkan dengan sengaja.",
    },
    {
      id: "menyilang",
      tajuk: "Menyilangkan dengan kuas",
      tahap: "bunga",
      fokus: "kastrasi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "membuang benang sari", fokus: "kastrasi", label: "Benang sari dibuang" },
        { kata: "dengan kuas", fokus: "kuas", label: "Serbuk sari tanaman lain dioleskan" },
        { kata: "siapa induk jantan", fokus: "hasil", label: "Induk jantan dan betina pasti diketahui" },
      ],
      narasi:
        "Untuk menyilangkan, Mendel membuang benang sari (stamen) dari bunga yang masih kuncup, lalu menaburkan serbuk sari (pollen) tanaman lain ke kepala putiknya (stigma) dengan kuas. Ia jadi tahu pasti siapa induk jantan dan betinanya.",
    },
    {
      id: "galur-murni",
      tajuk: "Galur murni",
      tahap: "galur",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "galur murni", fokus: "utuh", label: "Galur murni" },
        { kata: "generasi demi generasi", fokus: "bawah", label: "Selalu sama, generasi demi generasi" },
      ],
      narasi:
        "Ia memulai dengan galur murni (true-breeding): tanaman yang bila menyerbuk sendiri selalu menghasilkan keturunan yang sama sifatnya, generasi demi generasi. Galur murni biji bulat, misalnya, hanya pernah menghasilkan biji bulat.",
    },
    {
      id: "tujuh-sifat",
      tajuk: "Tujuh sifat",
      tahap: "tujuh",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "bentuk biji", fokus: "s1", label: "Bentuk biji: bulat / keriput" },
        { kata: "warna biji", fokus: "s2", label: "Warna biji: kuning / hijau" },
        { kata: "warna bunga", fokus: "s3", label: "Warna bunga: ungu / putih" },
        { kata: "bentuk polong", fokus: "s4", label: "Bentuk polong: gembung / bersekat" },
        { kata: "warna polong", fokus: "s5", label: "Warna polong: hijau / kuning" },
        { kata: "letak bunga", fokus: "s6", label: "Letak bunga: ketiak / ujung" },
        { kata: "tinggi batang", fokus: "s7", label: "Tinggi batang: tinggi / kerdil" },
      ],
      narasi:
        "Mendel mengamati tujuh sifat, masing-masing dengan dua bentuk yang kontras: bentuk biji, warna biji, warna bunga, bentuk polong, warna polong, letak bunga, dan tinggi batang.",
    },
    {
      id: "gen-alel",
      tajuk: "Gen, alel, lokus",
      tahap: "alel",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "gen (gene)", fokus: "utuh", label: "Gen · istilah Johannsen, 1909" },
        { kata: "alel (allele)", fokus: "lokus", label: "Alel: bentuk berbeda dari satu gen" },
        { kata: "lokus (locus)", fokus: "lokus", sorot: [], label: "Lokus: letak gen di kromosom" },
      ],
      narasi:
        "Mendel menyebut pembawa sifat itu “faktor”. Kini disebut gen (gene) — istilah dari Wilhelm Johannsen tahun 1909. Satu gen bisa punya beberapa bentuk yang disebut alel (allele), dan letaknya di kromosom disebut lokus (locus).",
    },
    {
      id: "genotip",
      tajuk: "Homozigot dan heterozigot",
      tahap: "genotip",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Susunan alel", fokus: "utuh", label: "Genotip = susunan alel" },
        { kata: "RR dan rr", fokus: "homo", label: "RR, rr: homozigot" },
        { kata: "Rr disebut heterozigot", fokus: "hetero", label: "Rr: heterozigot" },
      ],
      narasi:
        "Susunan alel disebut genotip (genotype), ditulis dengan huruf: R untuk alel biji bulat, r untuk alel biji keriput. RR dan rr disebut homozigot (homozygous) — kedua alelnya sama. Rr disebut heterozigot (heterozygous) — alelnya berbeda.",
    },
    {
      id: "dominan",
      tajuk: "Dominan dan resesif",
      tahap: "genotip",
      fokus: "hetero",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "sama seperti RR", fokus: "utuh", label: "RR dan Rr: sama-sama bulat" },
        { kata: "dominan (dominant)", fokus: "hetero", label: "R dominan" },
        { kata: "resesif (recessive)", fokus: "homo", label: "r resesif: tampak hanya pada rr" },
        { kata: "fenotip", fokus: "utuh", label: "Fenotip: yang tampak" },
      ],
      narasi:
        "Tanaman Rr berbiji bulat, sama seperti RR. Alel R bersifat dominan (dominant): satu salinan cukup untuk tampak. Alel r bersifat resesif (recessive): baru tampak bila tidak ada R, yaitu pada rr. Sifat yang tampak itulah fenotip.",
    },
    {
      id: "pati",
      tajuk: "Mengapa biji keriput",
      tahap: "pati",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "pati bercabang", fokus: "bulat", sorot: ["enzim"], label: "R: enzim pembuat pati bercabang" },
        { kata: "disisipi potongan DNA", fokus: "keriput", sorot: ["dna"], label: "r: gen tersisipi, enzim tak jadi" },
        { kata: "keriput saat mengering", fokus: "keriput", sorot: ["bijiKeriput"], label: "Gula menumpuk → biji keriput" },
      ],
      narasi:
        "Kini penyebabnya diketahui. Alel R menyandi enzim pembentuk pati bercabang. Pada alel r, gen itu disisipi potongan DNA sehingga enzimnya tak jadi; gula menumpuk, biji menyerap banyak air, lalu keriput saat mengering.",
    },
    {
      id: "generasi",
      tajuk: "P, F1, F2",
      tahap: "generasi",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "P (parental)", fokus: "p", label: "P: induk" },
        { kata: "F1 (first filial)", fokus: "f1", label: "F1: keturunan pertama" },
        { kata: "disebut F2", fokus: "f2", label: "F2: keturunan F1 × F1" },
      ],
      narasi:
        "Persilangan ditulis dengan lambang generasi. P (parental) adalah induk. Keturunan pertamanya disebut F1 (first filial), dan keturunan F1 yang menyerbuk sendiri disebut F2. Di pelajaran berikutnya kita ikuti hasil persilangan Mendel.",
    },
  ],

  poinKunci: [
    "Gregor Mendel (1822–1884) meneliti kacang ercis di biara Santo Thomas, Brno, 1856–1863; hasilnya dipresentasikan 1865 dan terbit 1866 (“Versuche über Pflanzen-Hybriden”).",
    "Kunci keberhasilannya: organisme yang tepat, galur murni, satu sifat pada satu waktu, jumlah keturunan besar, dan penghitungan yang teliti.",
    "Tujuh sifat (dominan / resesif): biji bulat/keriput, biji kuning/hijau, bunga ungu/putih, polong gembung/bersekat, polong hijau/kuning, bunga di ketiak/di ujung, batang tinggi/kerdil.",
    "Gen: satuan pewarisan (Johannsen, 1909). Alel: bentuk berbeda dari satu gen. Lokus: letak gen di kromosom. Genotip: susunan alel (RR, Rr, rr). Fenotip: sifat yang tampak.",
    "Homozigot: dua alel sama (RR, rr). Heterozigot: dua alel berbeda (Rr). Dominan: tampak walau hanya satu salinan; resesif: tampak hanya bila homozigot.",
    "Biji keriput: alel r pada gen SBE1 tersisipi elemen DNA (transposon) ± 0,8 kb, sehingga enzim pencabang pati tidak terbentuk (Bhattacharyya dkk., 1990).",
    "Kebiasaan penulisan: huruf besar untuk alel dominan, huruf kecil untuk resesif; P = induk, F1 = keturunan pertama, F2 = keturunan F1 × F1.",
  ],

  istilah: [
    { id: "Galur murni", en: "true-breeding line", arti: "Tanaman yang keturunannya selalu sama sifatnya bila menyerbuk sendiri." },
    { id: "Penyerbukan sendiri", en: "self-pollination", arti: "Serbuk sari membuahi putik pada bunga yang sama." },
    { id: "Penyerbukan silang", en: "cross-pollination", arti: "Serbuk sari dari tanaman lain membuahi putik." },
    { id: "Benang sari", en: "stamen", arti: "Bagian jantan bunga, penghasil serbuk sari." },
    { id: "Kepala putik", en: "stigma", arti: "Bagian betina bunga yang menerima serbuk sari." },
    { id: "Gen", en: "gene", arti: "Satuan pewarisan; potongan DNA pembawa satu instruksi." },
    { id: "Alel", en: "allele", arti: "Bentuk berbeda dari satu gen." },
    { id: "Lokus", en: "locus", arti: "Letak gen di kromosom (jamak: loci)." },
    { id: "Genotip", en: "genotype", arti: "Susunan alel suatu individu." },
    { id: "Fenotip", en: "phenotype", arti: "Sifat yang tampak atau terukur." },
    { id: "Homozigot", en: "homozygous", arti: "Kedua alel pada satu lokus sama." },
    { id: "Heterozigot", en: "heterozygous", arti: "Kedua alel pada satu lokus berbeda." },
    { id: "Dominan", en: "dominant", arti: "Alel yang tampak walau hanya satu salinan." },
    { id: "Resesif", en: "recessive", arti: "Alel yang tampak hanya bila homozigot." },
    { id: "Generasi P, F1, F2", en: "parental, first and second filial generations", arti: "Induk, keturunan pertama, keturunan kedua." },
  ],

  rujukan: [
    { teks: "Mendel G. Versuche über Pflanzen-Hybriden. Verhandlungen des naturforschenden Vereines in Brünn 4:3–47, 1866." },
    {
      teks: "Bhattacharyya MK, dkk. The wrinkled-seed character of pea described by Mendel is caused by a transposon-like insertion in a gene encoding starch-branching enzyme. Cell 60:115–122, 1990.",
      url: "https://doi.org/10.1016/0092-8674(90)90721-P",
    },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.1." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 2.1–2.2." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB2." },
  ],
};
