import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.5 — Transkripsi: dari DNA ke RNA
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R1 KB2; R2 bab 3 gbr. 3.6),
 * ditambah tudung 5′ dan ekor poli-A (usulan yang disetujui). Faktor
 * transkripsi, kotak TATA, dan cara berhenti pada eukariot di Ringkasan.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (Transkripsi3D). DNA berangka kelabu, RNA berangka
 * jingga; RNA polimerase ungu (enzim) tembus pandang agar gelembungnya terlihat.
 */

const BASA_SEMUA = ["basaA", "basaT", "basaG", "basaC", "basaU"];

export const transkripsi: Pelajaran = {
  slug: "transkripsi",
  nomor: "1.5",
  level: 1,
  judul: "Transkripsi: dari DNA ke RNA",
  ringkas:
    "Bagaimana satu gen disalin menjadi RNA: promotor, RNA polimerase, gelembung transkripsi, untai cetakan dan untai pengode, terminator — lalu pengolahan pra-mRNA: tudung 5′, ekor poli-A, dan penyambungan ekson.",
  tingkat: "Dasar",
  animasi: "transkripsi",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Menyalin satu gen",
      tahap: "transkripsi",
      fokus: "utuh",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "ratusan sampai ribuan gen", fokus: "utuh", label: "Satu kromosom: ratusan–ribuan gen" },
        { kata: "satu gen", fokus: "gen", sorot: ["gen"], label: "Satu gen" },
        { kata: "transkripsi (transcription)", fokus: "gen", label: "Transkripsi: DNA → RNA" },
      ],
      narasi:
        "Satu kromosom memuat ratusan sampai ribuan gen. Untuk memakai satu gen, sel menyalin urutannya menjadi RNA. Proses ini disebut transkripsi (transcription), dan pada eukariot terjadi di dalam inti sel.",
    },
    {
      id: "promotor",
      tajuk: "Promotor",
      tahap: "transkripsi",
      fokus: "gen",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "RNA polimerase", fokus: "promotor", sorot: ["enzim"], label: "RNA polimerase" },
        { kata: "promotor (promoter)", fokus: "promotor", sorot: ["enzim", "promotor"], label: "Promotor: titik mulai dan arah" },
      ],
      narasi:
        "Penyalinnya adalah RNA polimerase (RNA polymerase). Ia tidak mulai sembarangan: ia menempel pada promotor (promoter), urutan khusus di depan gen yang menandai titik mulai dan arah penyalinan.",
    },
    {
      id: "gelembung",
      tajuk: "Gelembung transkripsi",
      tahap: "transkripsi",
      fokus: "buka",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "belasan pasang basa", fokus: "buka", label: "Heliks terbuka ± 12–14 pasang basa" },
        { kata: "untai cetakan", fokus: "cetakan", sorot: ["untai1"], label: "Untai cetakan: yang dibaca" },
        { kata: "untai pengode", fokus: "cetakan", sorot: ["untai0"], label: "Untai pengode" },
      ],
      narasi:
        "RNA polimerase membuka heliks sepanjang belasan pasang basa, membentuk gelembung transkripsi. Hanya satu untai yang dibaca, yaitu untai cetakan (template strand). Untai lainnya disebut untai pengode (coding strand).",
    },
    {
      id: "elongasi",
      tajuk: "RNA dirangkai 5′ → 3′",
      tahap: "transkripsi",
      fokus: "jalan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "menyusuri cetakan", fokus: "jalan", label: "Polimerase menyusuri cetakan" },
        { kata: "tanpa perlu primer", fokus: "jalan", label: "RNA tumbuh 5′ → 3′, tanpa primer" },
        { kata: "A dengan U", fokus: "pasang", sorot: BASA_SEMUA, label: "A–U · T–A · G–C · C–G" },
      ],
      narasi:
        "RNA polimerase menyusuri cetakan dan merangkai RNA dari 5′ ke 3′ — tanpa perlu primer. Setiap basa cetakan dipasangi: A dengan U, T dengan A, G dengan C, C dengan G.",
    },
    {
      id: "pengode",
      tajuk: "Salinan untai pengode",
      tahap: "transkripsi",
      fokus: "lanjut",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "sama dengan urutan untai pengode", fokus: "lanjut", sorot: ["rna", "untai0"], label: "RNA = untai pengode, T → U" },
        { kata: "menutup kembali", fokus: "lanjut", sorot: [], label: "Heliks menutup di belakangnya" },
        { kata: "terlepas menjuntai", fokus: "ekor", sorot: ["rna"], label: "RNA menjuntai keluar" },
      ],
      narasi:
        "Hasilnya, urutan RNA sama dengan urutan untai pengode, hanya T diganti U. Di belakang polimerase, heliks DNA menutup kembali, dan RNA yang terbentuk terlepas menjuntai.",
    },
    {
      id: "terminasi",
      tajuk: "Terminator",
      tahap: "transkripsi",
      fokus: "akhir",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "urutan pengakhir", fokus: "akhir", sorot: ["terminator", "enzim"], label: "Terminator" },
        { kata: "melepaskan DNA", fokus: "lepas", sorot: [], label: "Polimerase dan RNA terlepas" },
        { kata: "berkali-kali", fokus: "lepas", label: "Satu gen bisa disalin berulang kali" },
      ],
      narasi:
        "Di ujung gen ada urutan pengakhir (terminator). Begitu mencapainya, RNA polimerase melepaskan DNA dan RNA yang baru jadi. Satu gen bisa disalin berkali-kali, bahkan oleh banyak polimerase sekaligus.",
    },
    {
      id: "pra-mrna",
      tajuk: "Pra-mRNA",
      tahap: "olah",
      fokus: "pra",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "masih mentah", fokus: "pra", label: "Pra-mRNA: salinan mentah" },
        { kata: "diolah tiga kali", fokus: "pra", label: "Tudung · ekor · potong-sambung" },
      ],
      narasi:
        "Pada eukariot, salinan pertama ini masih mentah, disebut pra-mRNA (pre-mRNA). Sebelum keluar dari inti, ia diolah tiga kali: diberi tudung, diberi ekor, dan dipotong-sambung.",
    },
    {
      id: "tudung-ekor",
      tajuk: "Tudung 5′ dan ekor poli-A",
      tahap: "olah",
      fokus: "tudung",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "diberi tudung", fokus: "tudung", sorot: ["tudung"], label: "Tudung 5′: guanin termodifikasi" },
        { kata: "ekor poli-A", fokus: "ekor", sorot: ["ekor"], label: "Ekor poli-A: ± 200 adenin" },
        { kata: "melindungi mRNA", fokus: "olahUtuh", sorot: ["tudung", "ekor"], label: "Pelindung dan tanda pengenal" },
      ],
      narasi:
        "Ujung 5′ diberi tudung (five-prime cap), sebuah guanin yang dimodifikasi. Ujung 3′ diberi ekor poli-A (poly-A tail), sekitar dua ratus adenin berderet. Keduanya melindungi mRNA dari penguraian dan membantu ribosom mengenalinya.",
    },
    {
      id: "penyambungan",
      tajuk: "Intron dibuang, ekson disambung",
      tahap: "olah",
      fokus: "olahUtuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "disebut intron", fokus: "olahUtuh", sorot: ["intron"], label: "Intron: dibuang" },
        { kata: "ekson (exon)", fokus: "olahUtuh", sorot: ["ekson"], label: "Ekson: dipertahankan" },
        { kata: "Spliseosom", fokus: "potong", sorot: ["enzim", "intron"], label: "Spliseosom memotong intron" },
        { kata: "penyambungan (splicing)", fokus: "sambung", sorot: ["ekson"], label: "Ekson disambung: mRNA matang" },
      ],
      narasi:
        "Gen eukariot umumnya terputus-putus. Bagian yang dibuang disebut intron; bagian yang dipertahankan disebut ekson (exon). Spliseosom (spliceosome) memotong intron dan menyambung ekson-ekson menjadi satu. Proses ini disebut penyambungan (splicing).",
    },
    {
      id: "alternatif",
      tajuk: "Satu gen, banyak protein",
      tahap: "olah",
      fokus: "sambung",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "susunan berbeda", fokus: "alternatif", sorot: ["ekson"], label: "Penyambungan alternatif" },
        { kata: "dua puluh ribu gen", fokus: "alternatif", label: "± 20.000 gen → lebih banyak macam protein" },
      ],
      narasi:
        "Ekson yang sama bisa disambung dengan susunan berbeda — penyambungan alternatif (alternative splicing). Karena itu sekitar dua puluh ribu gen manusia bisa menghasilkan jauh lebih banyak macam protein.",
    },
    {
      id: "keluar",
      tajuk: "Keluar menuju ribosom",
      tahap: "keluar",
      fokus: "pori",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "lewat pori inti", fokus: "pori", sorot: ["mrna", "membranInti"], label: "mRNA matang keluar lewat pori" },
        { kata: "menuju ribosom", fokus: "ribosom", sorot: ["mrna", "ribosom"], label: "Menuju ribosom" },
        { kata: "Pada bakteri", tahap: "bakteri", fokus: "utuh", sorot: [], label: "Bakteri: transkripsi + translasi bersamaan" },
      ],
      narasi:
        "mRNA yang sudah matang keluar dari inti lewat pori inti menuju ribosom di sitoplasma. Pada bakteri yang tak berinti, ribosom bahkan mulai menerjemahkan mRNA saat transkripsi masih berjalan.",
    },
  ],

  poinKunci: [
    "Transkripsi menyalin urutan satu gen menjadi RNA; pada eukariot berlangsung di dalam inti.",
    "RNA polimerase menempel pada promotor di depan gen. Pada eukariot, penempelan itu dibantu faktor transkripsi (transcription factors); banyak promotor memiliki kotak TATA sekitar 25–30 pasang basa sebelum titik mulai. mRNA disalin oleh RNA polimerase II.",
    "Hanya untai cetakan yang dibaca (3′ → 5′); RNA dirangkai 5′ → 3′ tanpa primer. Urutan RNA sama dengan untai pengode, dengan U menggantikan T.",
    "Pasangan saat transkripsi: basa cetakan A → U, T → A, G → C, C → G.",
    "Pada bakteri, transkripsi berhenti di terminator. Pada eukariot, pra-mRNA dipotong sedikit setelah sinyal poliadenilasi (AAUAAA), lalu ekor poli-A dipasang.",
    "Pengolahan pra-mRNA eukariot: tudung 5′ (7-metilguanosin), ekor poli-A (± 200 adenin pada mamalia), dan penyambungan: intron dibuang, ekson disambung oleh spliseosom — kompleks RNA dan protein.",
    "Penyambungan alternatif membuat satu gen menghasilkan beberapa macam mRNA dan protein; pada manusia hampir semua gen berekson banyak mengalaminya.",
    "Pada bakteri (tanpa inti), transkripsi dan translasi berlangsung bersamaan; gen bakteri umumnya tidak berintron.",
    "Gambar di film disederhanakan: gen digambar hanya puluhan pasang basa (gen sungguhan ribuan), dan RNA polimerase digambar sebagai gumpalan ungu tembus pandang.",
  ],

  istilah: [
    { id: "Transkripsi", en: "transcription", arti: "Penyalinan urutan DNA satu gen menjadi RNA." },
    { id: "RNA polimerase", en: "RNA polymerase", arti: "Enzim penyusun RNA dari cetakan DNA." },
    { id: "Promotor", en: "promoter", arti: "Urutan di depan gen tempat RNA polimerase menempel." },
    { id: "Gelembung transkripsi", en: "transcription bubble", arti: "Bagian heliks yang terbuka selama penyalinan." },
    { id: "Untai cetakan", en: "template strand", arti: "Untai DNA yang dibaca RNA polimerase." },
    { id: "Untai pengode", en: "coding strand", arti: "Untai DNA yang urutannya sama dengan RNA (T menggantikan U)." },
    { id: "Terminator", en: "terminator", arti: "Urutan pengakhir transkripsi." },
    { id: "Pra-mRNA", en: "pre-mRNA", arti: "Salinan mentah sebelum diolah." },
    { id: "Tudung 5′", en: "5′ cap", arti: "Guanin termodifikasi di ujung 5′ mRNA." },
    { id: "Ekor poli-A", en: "poly-A tail", arti: "Deretan adenin di ujung 3′ mRNA." },
    { id: "Intron", en: "intron", arti: "Bagian gen yang dibuang dari pra-mRNA." },
    { id: "Ekson", en: "exon", arti: "Bagian gen yang dipertahankan dalam mRNA matang." },
    { id: "Spliseosom", en: "spliceosome", arti: "Kompleks RNA–protein pemotong intron dan penyambung ekson." },
    { id: "Penyambungan", en: "splicing", arti: "Pembuangan intron dan penyambungan ekson." },
    { id: "Penyambungan alternatif", en: "alternative splicing", arti: "Ekson disambung dengan susunan berbeda-beda." },
    { id: "Faktor transkripsi", en: "transcription factor", arti: "Protein pembantu RNA polimerase menempel pada promotor." },
  ],

  rujukan: [
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 17.2–17.3." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 6." },
    { teks: "Clark MA, dkk. Biology 2e. OpenStax, 2018. Bab 15.2–15.4.", url: "https://openstax.org/details/books/biology-2e" },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB2." },
  ],
};
