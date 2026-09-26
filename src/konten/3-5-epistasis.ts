import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 3.5 — Epistasis, hipostasis, dan kriptomeri
 *
 * STATUS: DRAF — ditulis Claude 26 Sep 2026. Mengikuti KURIKULUM.md (R1 KB2;
 * R2 bab 7; R3 3.1.8–3.1.9). "Kriptomeri" adalah istilah buku ajar Indonesia
 * (tidak lazim di buku berbahasa Inggris); kasusnya Linaria maroccana.
 *
 * Tiap adegan ≤ 45 kata. Gambar: film Tingkat 3 (Perluasan3D).
 */

export const epistasis: Pelajaran = {
  slug: "epistasis-dan-kriptomeri",
  nomor: "3.5",
  level: 3,
  judul: "Epistasis, hipostasis, dan kriptomeri",
  ringkas:
    "Satu gen bisa menutupi pengaruh gen lain. Epistasis dominan pada labu (12 : 3 : 1), epistasis resesif pada tikus (9 : 3 : 4), kriptomeri pada Linaria (9 : 3 : 4), dan gen komplementer pada kacang manis (9 : 7). Semuanya turunan 9 : 3 : 3 : 1.",
  tingkat: "Menengah",
  animasi: "perluasan",
  draf: true,

  adegan: [
    {
      id: "epistasis",
      tajuk: "Gen yang menutupi",
      tahap: "labu",
      fokus: "p",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "disebut epistasis", fokus: "p", label: "Epistasis: gen yang menutupi" },
        { kata: "hipostasis", fokus: "p", label: "Hipostasis: gen yang tertutup" },
        { kata: "Berbeda dengan dominansi", fokus: "p", label: "Dominansi: antar-alel satu gen" },
      ],
      narasi:
        "Kadang satu gen menutupi pengaruh gen lain. Gen yang menutupi disebut epistasis (epistatic gene), dan gen yang tertutup disebut hipostasis (hypostatic gene). Berbeda dengan dominansi, yang terjadi di antara alel pada gen yang sama.",
    },
    {
      id: "labu",
      tajuk: "Warna labu: 12 : 3 : 1",
      tahap: "labu",
      fokus: "p",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "alel W", fokus: "p", sorot: ["labuPutih"], label: "W: menghalangi pigmen → putih" },
        { kata: "Tanpa W", fokus: "f1", sorot: [], label: "ww: Y_ kuning, yy hijau" },
        { kata: "F2 dari WwYy", fokus: "f2", label: "12 putih : 3 kuning : 1 hijau" },
      ],
      narasi:
        "Pada labu, alel W menghalangi pembentukan pigmen, sehingga buahnya putih apa pun gen warnanya. Tanpa W, alel Y memberi warna kuning dan yy hijau. F2 dari WwYy: 12 putih, 3 kuning, dan 1 hijau.",
    },
    {
      id: "epistasis-dominan",
      tajuk: "Epistasis dominan",
      tahap: "labu",
      fokus: "f2",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "epistasis dominan", fokus: "f2", label: "Epistasis dominan" },
        { kata: "dua belas", fokus: "f2", sorot: ["labuPutih"], label: "9 + 3 → 12 putih" },
      ],
      narasi:
        "Karena gen penutupnya dominan, ini disebut epistasis dominan (dominant epistasis). Kelompok sembilan dan kelompok tiga yang membawa W sama-sama putih, sehingga bergabung menjadi dua belas.",
    },
    {
      id: "epistasis-resesif",
      tajuk: "Epistasis resesif: 9 : 3 : 4",
      tahap: "tikusWarna",
      fokus: "p",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "epistasis resesif", fokus: "p", label: "Epistasis resesif" },
        { kata: "alel C", fokus: "p", label: "C: pembentuk pigmen · cc: albino" },
        { kata: "F2 dari AaCc", fokus: "f2", label: "9 agouti : 3 hitam : 4 albino" },
      ],
      narasi:
        "Pada epistasis resesif (recessive epistasis), gen penutup baru bekerja bila homozigot resesif. Pada tikus, alel C diperlukan untuk membuat pigmen. Tikus cc albino apa pun gen warnanya. F2 dari AaCc: 9 agouti, 3 hitam, 4 albino.",
    },
    {
      id: "kriptomeri",
      tajuk: "Kriptomeri: bunga Linaria",
      tahap: "linaria",
      fokus: "p",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "kriptomeri", fokus: "p", label: "Kriptomeri: gen B tersembunyi di induk putih" },
        { kata: "A dengan B", fokus: "f1", label: "A_B_: ungu · A_bb: merah · aa: putih" },
        { kata: "F2-nya", fokus: "f2", label: "9 ungu : 3 merah : 4 putih" },
      ],
      narasi:
        "Buku ajar di Indonesia menyebut kasus bunga Linaria maroccana sebagai kriptomeri (cryptomery). Gen A membentuk pigmen antosianin; gen B membuat cairan sel bersifat basa. A dengan B: ungu. A tanpa B: merah. Tanpa A: putih. F2-nya 9 : 3 : 4.",
    },
    {
      id: "komplementer",
      tajuk: "Gen komplementer: 9 : 7",
      tahap: "kacangManis",
      fokus: "p",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dua galur", fokus: "p", label: "P: putih (CCpp) × putih (ccPP)" },
        { kata: "F1-nya ungu", fokus: "f1", sorot: ["bungaUngu"], label: "F1: ungu (CcPp)" },
        { kata: "F2-nya", fokus: "f2", sorot: [], label: "9 ungu : 7 putih" },
      ],
      narasi:
        "Pada gen komplementer (complementary genes), dua gen harus hadir bersama. Bateson dan Punnett menyilangkan dua galur kacang manis berbunga putih — dan seluruh F1-nya ungu! F2-nya 9 ungu banding 7 putih.",
    },
    {
      id: "jalur",
      tajuk: "Dua enzim berurutan",
      tahap: "jalur",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Dua enzim", fokus: "utuh", sorot: ["enzim"], label: "Zat awal → enzim C → enzim P → ungu" },
        { kata: "salah satunya rusak", fokus: "putus", sorot: [], label: "cc atau pp: jalur putus → putih" },
      ],
      narasi:
        "Rasio 9 : 7 masuk akal bila jalurnya dilihat. Dua enzim bekerja berurutan: enzim pertama dari gen C, enzim kedua dari gen P. Bila salah satunya rusak — cc atau pp — jalur terputus dan tak ada pigmen ungu.",
    },
    {
      id: "ringkas",
      tajuk: "Semua dari 9 : 3 : 3 : 1",
      tahap: "kelompok",
      fokus: "9331",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "masih turunan", fokus: "9331", label: "9 : 3 : 3 : 1" },
        { kata: "dua belas dari", fokus: "1231", label: "12 : 3 : 1" },
        { kata: "empat dari", fokus: "934", label: "9 : 3 : 4" },
        { kata: "tujuh dari", fokus: "97", label: "9 : 7" },
      ],
      narasi:
        "Semua rasio ini masih turunan 9 : 3 : 3 : 1. Epistasis hanya menggabungkan kelompok: dua belas dari sembilan dan tiga, empat dari tiga dan satu, tujuh dari tiga, tiga, dan satu.",
    },
  ],

  poinKunci: [
    "Epistasis: satu gen menutupi ekspresi gen lain (gen epistasis menutupi, gen hipostasis tertutup). Dominansi terjadi antar-alel pada gen yang sama; epistasis antar-gen.",
    "Epistasis dominan — labu (Cucurbita pepo): W_ putih; wwY_ kuning; wwyy hijau → 12 : 3 : 1.",
    "Epistasis resesif — tikus: C diperlukan untuk pigmen; cc albino; A_C_ agouti, aaC_ hitam → 9 agouti : 3 hitam : 4 albino.",
    "Kriptomeri (istilah buku ajar Indonesia) — Linaria maroccana: A antosianin, B cairan sel basa. A_B_ ungu, A_bb merah, aa__ putih → 9 : 3 : 4. Gen B “tersembunyi” pada induk putih aaBB.",
    "Gen komplementer — kacang manis (Lathyrus odoratus): C_P_ ungu, selainnya putih → 9 : 7. Dua enzim dalam satu jalur; kerusakan salah satu cukup memutus jalur.",
    "Semua rasio ini adalah 9 : 3 : 3 : 1 yang kelompoknya digabung — segregasi dan asortasi bebas tetap berlaku.",
  ],

  istilah: [
    { id: "Epistasis", en: "epistasis", arti: "Gen yang menutupi pengaruh gen lain." },
    { id: "Hipostasis", en: "hypostasis", arti: "Gen yang pengaruhnya tertutup oleh gen lain." },
    { id: "Epistasis dominan", en: "dominant epistasis", arti: "Satu alel dominan gen penutup cukup untuk menutupi (12 : 3 : 1)." },
    { id: "Epistasis resesif", en: "recessive epistasis", arti: "Gen penutup menutupi bila homozigot resesif (9 : 3 : 4)." },
    { id: "Kriptomeri", en: "cryptomery", arti: "Gen dominan yang pengaruhnya tersembunyi sampai bertemu gen lain." },
    { id: "Gen komplementer", en: "complementary genes", arti: "Dua gen yang harus hadir bersama agar sifat muncul (9 : 7)." },
  ],

  rujukan: [
    { teks: "Bateson W, Saunders ER, Punnett RC. Experimental studies in the physiology of heredity. Reports to the Evolution Committee of the Royal Society 2:1–55, 1905." },
    { teks: "Griffiths AJF, dkk. Introduction to Genetic Analysis, edisi ke-12. W. H. Freeman, 2020. Bab 6." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 14.3." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 3.1.8–3.1.9." },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 7." },
  ],
};
