import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.6 — Kode genetik dan translasi
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R2 bab 3 gbr. 3.7–3.9,
 * tabel 3.2). Tabel kode genetik digambar datar di dalam film (usulan yang
 * disetujui). Situs A-P-E, goyangan (wobble), dan nama faktor-faktor di Ringkasan.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (Translasi3D). mRNA dan tRNA berangka jingga (RNA),
 * ribosom merah muda, asam amino kuning, rantai protein hijau.
 */

export const kodeGenetikTranslasi: Pelajaran = {
  slug: "kode-genetik-dan-translasi",
  nomor: "1.6",
  level: 1,
  judul: "Kode genetik dan translasi",
  ringkas:
    "Bagaimana empat huruf mRNA diterjemahkan menjadi dua puluh macam asam amino: kodon tiga huruf, tabel kode genetik, kerangka baca, lalu ribosom dan tRNA merangkai protein dari kodon mulai sampai kodon henti.",
  tingkat: "Dasar",
  animasi: "translasi",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Empat huruf, dua puluh kata",
      tahap: "mrna",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "empat huruf", fokus: "mrna", sorot: ["mrna", "basaA", "basaU", "basaG", "basaC"], label: "mRNA: A, U, G, C" },
        { kata: "dua puluh macam asam amino", fokus: "asam", sorot: ["asamAmino"], label: "20 macam asam amino" },
        { kata: "kodon", fokus: "utuh", sorot: [], label: "Jawabannya: kodon" },
      ],
      narasi:
        "Di sitoplasma, mRNA membawa pesan dalam empat huruf: A, U, G, dan C. Protein tersusun dari dua puluh macam asam amino. Bagaimana empat huruf bisa menunjuk dua puluh macam? Jawabannya: kodon.",
    },
    {
      id: "tiga-huruf",
      tajuk: "Mengapa tiga huruf",
      tahap: "hitung",
      fokus: "satu",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Satu huruf", fokus: "satu", label: "1 huruf: 4 pilihan" },
        { kata: "dua huruf", fokus: "dua", label: "2 huruf: 4 × 4 = 16" },
        { kata: "Tiga huruf", fokus: "tiga", label: "3 huruf: 4 × 4 × 4 = 64" },
        { kata: "kodon (codon)", fokus: "utuh", label: "Kodon = tiga basa" },
      ],
      narasi:
        "Satu huruf hanya memberi empat pilihan; dua huruf, enam belas — masih kurang. Tiga huruf memberi enam puluh empat kombinasi, lebih dari cukup. Karena itu kodon (codon) terdiri dari tiga basa berurutan.",
    },
    {
      id: "tabel",
      tajuk: "Tabel kode genetik",
      tahap: "tabel",
      fokus: "utuh",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "memetakan", fokus: "utuh", label: "Roda kode genetik: 64 kodon" },
        { kata: "61 kodon", fokus: "utuh", label: "61 kodon → asam amino" },
        { kata: "kodon henti", fokus: "henti", label: "UAA · UAG · UGA = kodon henti" },
        { kata: "Kodon AUG", fokus: "mulai", label: "AUG = metionin, kodon mulai" },
      ],
      narasi:
        "Tabel kode genetik (genetic code) memetakan keenam puluh empat kodon itu. Sebanyak 61 kodon menunjuk asam amino; tiga lainnya — UAA, UAG, dan UGA — adalah kodon henti (stop codon). Kodon AUG menunjuk metionin sekaligus menjadi kodon mulai (start codon).",
    },
    {
      id: "sifat-kode",
      tajuk: "Degeneratif dan hampir universal",
      tahap: "tabel",
      fokus: "leusin",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "lebih dari satu kodon", fokus: "leusin", label: "Degeneratif: satu asam amino, beberapa kodon" },
        { kata: "leusin", fokus: "leusin", label: "Leusin: 6 kodon" },
        { kata: "hampir universal", fokus: "utuh", label: "Hampir universal" },
      ],
      narasi:
        "Kode ini bersifat degeneratif (degenerate): sebagian besar asam amino ditunjuk lebih dari satu kodon — leusin bahkan oleh enam. Kode ini juga hampir universal: bakteri, tumbuhan, dan manusia memakai kamus yang sama.",
    },
    {
      id: "kerangka-baca",
      tajuk: "Kerangka baca",
      tahap: "baca",
      fokus: "benar",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tanpa jeda", fokus: "benar", label: "AUG | GCU | UCC | GAG …" },
        { kata: "kerangka baca", fokus: "benar", label: "Kerangka baca" },
        { kata: "Bergeser satu huruf", fokus: "geser", label: "Bergeser satu huruf: pesan kacau" },
      ],
      narasi:
        "mRNA dibaca berurutan tiga-tiga, tanpa jeda dan tanpa tumpang tindih, mulai dari kodon AUG pertama. Inilah kerangka baca (reading frame). Bergeser satu huruf saja, seluruh pesan sesudahnya berubah arti.",
    },
    {
      id: "pemain",
      tajuk: "Ribosom dan tRNA",
      tahap: "pemain",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Penerjemahnya ribosom", fokus: "ribosom", sorot: ["ribosom"], label: "Ribosom: penerjemah" },
        { kata: "diantar tRNA", fokus: "trna", sorot: ["trna", "asamAmino"], label: "tRNA: pengantar asam amino" },
        { kata: "Enzim khusus", fokus: "enzim", sorot: ["enzim", "asamAmino"], label: "Enzim memasang asam amino yang tepat" },
      ],
      narasi:
        "Penerjemahnya ribosom. Asam amino diantar tRNA; setiap tRNA membawa satu macam asam amino dan punya antikodon yang cocok dengan kodonnya. Enzim khusus memasang asam amino yang tepat pada tRNA-nya.",
    },
    {
      id: "inisiasi",
      tajuk: "Mulai di AUG",
      tahap: "translasi",
      fokus: "inisiasi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "subunit kecil", fokus: "inisiasi", sorot: ["subunitKecil", "mrna"], label: "Subunit kecil menempel pada mRNA" },
        { kata: "mencari kodon AUG", fokus: "inisiasi", label: "Bergeser mencari AUG" },
        { kata: "pembawa metionin", fokus: "inisiasi", sorot: ["trna", "asamAmino"], label: "tRNA-metionin berpasangan dengan AUG" },
        { kata: "subunit besar bergabung", fokus: "inisiasi", sorot: ["subunitBesar"], label: "Subunit besar bergabung" },
      ],
      narasi:
        "Translasi (translation) dimulai ketika subunit kecil ribosom menempel pada mRNA dan bergeser mencari kodon AUG. tRNA pembawa metionin berpasangan dengannya, lalu subunit besar bergabung. Ribosom siap bekerja.",
    },
    {
      id: "elongasi",
      tajuk: "Ikatan peptida",
      tahap: "translasi",
      fokus: "elongasi",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "tRNA kedua masuk", fokus: "elongasi", sorot: ["trna"], label: "tRNA kedua masuk" },
        { kata: "ikatan peptida", fokus: "ikatan", sorot: ["asamAmino", "protein", "subunitBesar"], label: "Ikatan peptida dibentuk rRNA" },
      ],
      narasi:
        "Lalu tRNA kedua masuk; antikodonnya berpasangan dengan kodon berikutnya. rRNA di subunit besar membentuk ikatan peptida (peptide bond): asam amino pertama dipindahkan dan disambungkan ke asam amino kedua.",
    },
    {
      id: "translokasi",
      tajuk: "Bergeser satu kodon",
      tahap: "translasi",
      fokus: "translokasi",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "bergeser tepat satu kodon", fokus: "translokasi", label: "Ribosom bergeser satu kodon" },
        { kata: "sudah kosong keluar", fokus: "translokasi", sorot: ["trna"], label: "tRNA kosong keluar" },
        { kata: "polipeptida", fokus: "translokasi", sorot: ["asamAmino", "protein"], label: "Rantai polipeptida memanjang" },
      ],
      narasi:
        "Ribosom bergeser tepat satu kodon. tRNA yang sudah kosong keluar, tempatnya diisi tRNA baru. Siklus ini berulang, dan rantai asam amino — polipeptida (polypeptide) — terus memanjang keluar dari ribosom.",
    },
    {
      id: "henti",
      tajuk: "Kodon henti",
      tahap: "translasi",
      fokus: "henti",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "kodon henti", fokus: "henti", label: "Kodon henti: tak ada tRNA yang cocok" },
        { kata: "Faktor pelepas", fokus: "henti", sorot: ["faktorPelepas"], label: "Faktor pelepas masuk" },
        { kata: "dilepaskan", fokus: "lepas", sorot: ["asamAmino", "protein"], label: "Polipeptida dilepaskan" },
        { kata: "terurai kembali", fokus: "lepas", sorot: ["ribosom"], label: "Ribosom terurai" },
      ],
      narasi:
        "Ketika ribosom tiba di kodon henti, tak ada tRNA yang cocok. Faktor pelepas (release factor) masuk, rantai polipeptida dilepaskan, dan ribosom terurai kembali menjadi dua subunit.",
    },
    {
      id: "melipat",
      tajuk: "Melipat menjadi protein",
      tahap: "lipat",
      fokus: "lurus",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "melipat", fokus: "lipat", sorot: ["protein", "asamAmino"], label: "Rantai melipat" },
        { kata: "tugas protein", fokus: "jadi", sorot: ["protein"], label: "Bentuk menentukan tugas" },
      ],
      narasi:
        "Rantai itu lalu melipat menjadi bentuk tiga dimensi yang khas. Bentuk inilah yang menentukan tugas protein: menjadi enzim, pengangkut, rangka sel, atau sinyal.",
    },
    {
      id: "polisom",
      tajuk: "Banyak ribosom sekaligus",
      tahap: "polisom",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "banyak ribosom sekaligus", fokus: "utuh", sorot: ["ribosom", "mrna"], label: "Polisom" },
        { kata: "banyak salinan protein", fokus: "dekat", sorot: ["asamAmino", "protein"], label: "Satu mRNA → banyak protein" },
      ],
      narasi:
        "Satu mRNA biasanya dibaca banyak ribosom sekaligus, berderet seperti manik-manik — disebut polisom (polysome). Dengan cara ini, satu mRNA menghasilkan banyak salinan protein yang sama.",
    },
  ],

  poinKunci: [
    "Kodon = tiga basa berurutan pada mRNA. 4³ = 64 kodon: 61 menunjuk asam amino, 3 kodon henti (UAA, UAG, UGA). AUG = metionin sekaligus kodon mulai.",
    "Kode genetik degeneratif (satu asam amino bisa ditunjuk beberapa kodon; leusin, serin, dan arginin masing-masing enam), tidak ambigu (satu kodon hanya menunjuk satu asam amino), dan hampir universal — pengecualian kecil ada, misalnya pada mitokondria (UGA menunjuk triptofan).",
    "Kode genetik dipecahkan tahun 1961–1966; percobaan pertama oleh Marshall Nirenberg dan Heinrich Matthaei menunjukkan UUU → fenilalanin. Nirenberg, Khorana, dan Holley mendapat Nobel 1968.",
    "Kerangka baca ditentukan oleh kodon mulai; mRNA dibaca tiga-tiga tanpa jeda. Sisipan atau hilangnya satu basa menggeser kerangka baca (lihat Tingkat 5, mutasi).",
    "Setiap tRNA dimuati asam amino yang tepat oleh enzim aminoasil-tRNA sintetase (aminoacyl-tRNA synthetase); ada satu enzim untuk tiap macam asam amino.",
    "Ribosom punya tiga tempat tRNA: A (masuk, aminoasil), P (pemegang rantai, peptidil), dan E (keluar). Ikatan peptida dibentuk rRNA subunit besar (ribozim).",
    "Goyangan (wobble): basa ketiga kodon boleh berpasangan tidak baku, sehingga satu tRNA bisa membaca beberapa kodon yang berbeda di huruf ketiga.",
    "Ribosom eukariot: 80S (subunit 40S + 60S); bakteri: 70S (30S + 50S). Kecepatan ± 2–6 asam amino per detik pada eukariot, ± 15–20 pada bakteri.",
    "Gambar di film disederhanakan: tRNA digambar tegak (bentuk aslinya huruf L, seperti di pelajaran 1.3), ribosom dan tRNA tidak berskala, dan protein digambar hanya beberapa asam amino.",
  ],

  istilah: [
    { id: "Kodon", en: "codon", arti: "Tiga basa mRNA yang menunjuk satu asam amino atau tanda henti." },
    { id: "Kode genetik", en: "genetic code", arti: "Kamus yang memetakan 64 kodon ke asam amino." },
    { id: "Kodon mulai", en: "start codon", arti: "AUG; tempat translasi dimulai dan menunjuk metionin." },
    { id: "Kodon henti", en: "stop codon", arti: "UAA, UAG, UGA; tanda akhir translasi." },
    { id: "Degeneratif", en: "degenerate", arti: "Satu asam amino dapat ditunjuk lebih dari satu kodon." },
    { id: "Kerangka baca", en: "reading frame", arti: "Cara membagi urutan menjadi kodon, ditentukan kodon mulai." },
    { id: "Translasi", en: "translation", arti: "Penerjemahan urutan mRNA menjadi rantai asam amino." },
    { id: "Antikodon", en: "anticodon", arti: "Tiga basa tRNA yang berpasangan dengan kodon." },
    { id: "Ikatan peptida", en: "peptide bond", arti: "Ikatan antara dua asam amino dalam rantai protein." },
    { id: "Polipeptida", en: "polypeptide", arti: "Rantai asam amino hasil translasi." },
    { id: "Faktor pelepas", en: "release factor", arti: "Protein yang mengenali kodon henti dan melepaskan polipeptida." },
    { id: "Aminoasil-tRNA sintetase", en: "aminoacyl-tRNA synthetase", arti: "Enzim pemasang asam amino yang tepat pada tRNA." },
    { id: "Polisom", en: "polysome", arti: "Satu mRNA yang dibaca banyak ribosom sekaligus." },
    { id: "Metionin", en: "methionine", arti: "Asam amino yang ditunjuk kodon AUG; asam amino pertama setiap protein baru." },
  ],

  rujukan: [
    {
      teks: "Nirenberg MW, Matthaei JH. The dependence of cell-free protein synthesis in E. coli upon naturally occurring or synthetic polyribonucleotides. PNAS 47:1588–1602, 1961.",
      url: "https://doi.org/10.1073/pnas.47.10.1588",
    },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 17.4." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 6." },
    { teks: "Clark MA, dkk. Biology 2e. OpenStax, 2018. Bab 15.1 dan 15.5.", url: "https://openstax.org/details/books/biology-2e" },
    { teks: "Arifin J, dkk. Buku Ajar Genetika Ternak. Bravo Press, 2025. Bab 3 (tabel kode genetik)." },
  ],
};
