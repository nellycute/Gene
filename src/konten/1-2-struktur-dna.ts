import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.2 — Struktur DNA dan heliks ganda
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R1 KB2; R2 bab 3; R3 7.2).
 * Ukuran heliks mengikuti makalah Watson–Crick 1953 dan buku ajar baku.
 *
 * Kekeliruan buku yang TIDAK diikuti (KURIKULUM.md, tabel kekeliruan):
 *  - R1 hlm. 1.12 dan R3 hlm. 153–154: satu putaran heliks 34 Å (3,4 nm),
 *    bukan 3,4 Å — 3,4 Å (0,34 nm) adalah jarak antarpasangan basa;
 *  - R3 hlm. 151: DNA bakteri untai ganda (sirkuler), bukan untai tunggal;
 *  - R3 hlm. 158: basa nitrogen bukan protein.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (StrukturDNA3D) — DNA yang dirakit dari nukleotida,
 * dipasangkan, lalu dipilin menjadi heliks ganda putar kanan.
 */

const BASA = ["basaA", "basaT", "basaG", "basaC"];
const SEMUA_DNA = ["gulaFosfat", ...BASA, "ikatanHidrogen"];

export const strukturDNA: Pelajaran = {
  slug: "struktur-dna",
  nomor: "1.2",
  level: 1,
  judul: "Struktur DNA dan heliks ganda",
  ringkas:
    "Dari satu nukleotida sampai heliks ganda: fosfat, gula, dan empat basa; pasangan A–T dan G–C; aturan Chargaff; foto sinar-X Franklin; dan model Watson–Crick yang berpilin ke kanan.",
  tingkat: "Dasar",
  animasi: "struktur-dna",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Memperbesar DNA",
      tahap: "molekul",
      fokus: "jauh",
      durasi: 18,
      sorot: [],
      isyarat: [
        { kata: "asam deoksiribonukleat", fokus: "jauh", label: "DNA · asam deoksiribonukleat" },
        { kata: "satuan berulang", fokus: "dekat", sorot: [], label: "Satuan berulang: nukleotida" },
      ],
      narasi:
        "DNA terbukti materi genetik. Kini kita perbesar molekulnya. Nama lengkapnya asam deoksiribonukleat (deoxyribonucleic acid): rantai sangat panjang yang tersusun dari satuan berulang bernama nukleotida (nucleotide).",
    },
    {
      id: "nukleotida",
      tajuk: "Satu nukleotida",
      tahap: "molekul",
      fokus: "nukleotida",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "gugus fosfat", fokus: "nukleotida", sorot: ["fosfat"], label: "Gugus fosfat" },
        { kata: "deoksiribosa", fokus: "nukleotida", sorot: ["gula"], label: "Gula deoksiribosa · 5 karbon" },
        { kata: "basa nitrogen", fokus: "nukleotida", sorot: ["basaA"], label: "Basa nitrogen" },
        { kata: "selalu sama", fokus: "nukleotida", sorot: ["gulaFosfat"], label: "Fosfat dan gula: selalu sama" },
      ],
      narasi:
        "Setiap nukleotida punya tiga bagian: gugus fosfat (phosphate group), gula berkarbon lima bernama deoksiribosa (deoxyribose), dan satu basa nitrogen (nitrogenous base). Fosfat dan gula selalu sama di setiap nukleotida; yang berbeda hanya basanya.",
    },
    {
      id: "empat-basa",
      tajuk: "Empat basa",
      tahap: "molekul",
      fokus: "empat",
      durasi: 20,
      sorot: BASA,
      isyarat: [
        { kata: "adenin", fokus: "empat", sorot: BASA, label: "A · G · C · T" },
        { kata: "Adenin dan guanin", fokus: "empat", sorot: ["purin"], label: "Purin · cincin ganda (A, G)" },
        { kata: "Sitosin dan timin", fokus: "empat", sorot: ["pirimidin"], label: "Pirimidin · cincin tunggal (C, T)" },
      ],
      narasi:
        "Ada empat macam basa: adenin (A), guanin (G), sitosin (C), dan timin (T). Adenin dan guanin termasuk purin (purine), bercincin ganda. Sitosin dan timin termasuk pirimidin (pyrimidine), bercincin tunggal.",
    },
    {
      id: "untai",
      tajuk: "Satu untai",
      tahap: "molekul",
      fokus: "empat",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "bersambung", fokus: "untai", sorot: [], label: "Nukleotida bersambung" },
        { kata: "terikat pada gula", fokus: "sambungan", sorot: ["gulaFosfat"], label: "Fosfat terikat pada gula sebelumnya" },
        { kata: "rangka gula-fosfat", fokus: "untai", sorot: ["gulaFosfat"], label: "Rangka gula-fosfat" },
        { kata: "gigi sisir", fokus: "untai", sorot: BASA, label: "Basa mencuat ke satu sisi" },
      ],
      narasi:
        "Nukleotida-nukleotida bersambung menjadi satu untai (strand): fosfat satu nukleotida terikat pada gula nukleotida sebelumnya. Terbentuklah rangka gula-fosfat (sugar-phosphate backbone), dengan basa-basa mencuat ke satu sisi seperti gigi sisir.",
    },
    {
      id: "arah",
      tajuk: "Ujung 5′ dan ujung 3′",
      tahap: "molekul",
      fokus: "arah",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "punya arah", fokus: "arah", sorot: [], label: "Untai DNA punya arah" },
        { kata: "ujung 5′", fokus: "ujung5", sorot: ["fosfat"], label: "Ujung 5′ · fosfat bebas" },
        { kata: "gugus hidroksil", fokus: "ujung3", sorot: ["gula"], label: "Ujung 3′ · gugus OH" },
      ],
      narasi:
        "Untai ini punya arah. Di satu ujung, fosfat yang terikat pada karbon nomor lima gula dibiarkan bebas: itulah ujung 5′ (five-prime end). Di ujung lain ada gugus hidroksil (hydroxyl group) pada karbon nomor tiga: ujung 3′.",
    },
    {
      id: "pasangan",
      tajuk: "A dengan T, G dengan C",
      tahap: "molekul",
      fokus: "pasang",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "A dengan T", fokus: "at", sorot: ["basaA", "basaT"], label: "A berpasangan dengan T" },
        { kata: "G dengan C", fokus: "gc", sorot: ["basaG", "basaC"], label: "G berpasangan dengan C" },
        { kata: "dua ikatan hidrogen", fokus: "at", sorot: ["basaA", "basaT", "ikatanHidrogen"], label: "A–T: 2 ikatan hidrogen" },
        { kata: "diikat tiga", fokus: "gc", sorot: ["basaG", "basaC", "ikatanHidrogen"], label: "G–C: 3 ikatan hidrogen" },
      ],
      narasi:
        "Dua untai bergabung lewat basanya, dan pasangannya selalu tetap: A dengan T, G dengan C — pasangan basa komplementer (complementary base pair). A dan T diikat dua ikatan hidrogen (hydrogen bond); G dan C diikat tiga, sehingga lebih kuat.",
    },
    {
      id: "lebar",
      tajuk: "Purin selalu dengan pirimidin",
      tahap: "lebar",
      fokus: "benar",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "purin dengan pirimidin", fokus: "benar", sorot: ["pasanganBenar"], label: "Purin + pirimidin: pas" },
        { kata: "Dua purin", fokus: "purin2", sorot: ["duaPurin"], label: "Dua purin: terlalu lebar" },
        { kata: "dua pirimidin", fokus: "pirimidin2", sorot: ["duaPirimidin"], label: "Dua pirimidin: terlalu sempit" },
        { kata: "sama panjang", fokus: "benar", sorot: ["pasanganBenar"], label: "Lebar DNA tetap ± 2 nm" },
      ],
      narasi:
        "Pasangannya selalu purin dengan pirimidin. Dua purin terlalu lebar, dua pirimidin terlalu sempit untuk rangka DNA. Karena itu setiap anak tangga sama panjang, dan lebar DNA tetap sekitar 2 nanometer di sepanjang molekul.",
    },
    {
      id: "chargaff",
      tajuk: "Aturan Chargaff",
      tahap: "chargaff",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Erwin Chargaff", fokus: "utuh", label: "1950 · Erwin Chargaff" },
        { kata: "jumlah A", fokus: "utuh", sorot: ["basaA", "basaT"], label: "A ≈ T" },
        { kata: "jumlah G", fokus: "utuh", sorot: ["basaG", "basaC"], label: "G ≈ C" },
        { kata: "berbeda antarspesies", fokus: "banding", sorot: BASA, label: "Manusia ≠ E. coli, tetapi A ≈ T dan G ≈ C" },
      ],
      narasi:
        "Petunjuk pasangan ini sudah ada sebelum 1953. Erwin Chargaff mengukur DNA berbagai makhluk: jumlah A selalu hampir sama dengan T, dan jumlah G hampir sama dengan C — walau kadar A–T dan G–C berbeda antarspesies. Inilah aturan Chargaff (Chargaff's rules).",
    },
    {
      id: "franklin",
      tajuk: "1952–1953 · Franklin, Watson, Crick",
      tahap: "franklin",
      fokus: "foto",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Rosalind Franklin", fokus: "foto", label: "Laboratorium Rosalind Franklin" },
        { kata: "pola silang", fokus: "silang", label: "Pola silang = tanda heliks" },
        { kata: "James Watson", fokus: "model", sorot: SEMUA_DNA, label: "1953 · model heliks ganda Watson–Crick" },
      ],
      narasi:
        "Tahun 1952, di laboratorium Rosalind Franklin, DNA dipotret dengan difraksi sinar-X (X-ray diffraction). Fotonya menampakkan pola silang, tanda bentuk heliks. Berbekal data itu dan aturan Chargaff, James Watson dan Francis Crick menyusun model heliks ganda tahun 1953.",
    },
    {
      id: "heliks",
      tajuk: "Heliks ganda putar kanan",
      tahap: "molekul",
      fokus: "pasang",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "berpilin ke kanan", fokus: "pilin", sorot: [], label: "Berpilin ke kanan" },
        { kata: "antiparalel", fokus: "antiparalel", sorot: ["gulaFosfat"], label: "Antiparalel: 5′→3′ dan 3′→5′" },
        { kata: "Rangka gula-fosfat di luar", fokus: "pilin", sorot: ["gulaFosfat"], label: "Rangka gula-fosfat di luar" },
        { kata: "pasangan basa di dalam", fokus: "pilin", sorot: [...BASA, "ikatanHidrogen"], label: "Pasangan basa di dalam" },
      ],
      narasi:
        "Dalam model itu, kedua untai berpilin ke kanan mengelilingi satu sumbu, seperti tangga spiral. Arah keduanya berlawanan — satu dari 5′ ke 3′, pasangannya dari 3′ ke 5′ — disebut antiparalel (antiparallel). Rangka gula-fosfat di luar, pasangan basa di dalam.",
    },
    {
      id: "ukuran",
      tajuk: "Ukuran heliks",
      tahap: "molekul",
      fokus: "ukuran",
      durasi: 26,
      sorot: [],
      isyarat: [
        { kata: "2 nanometer", fokus: "ukuran", label: "Lebar ± 2 nm" },
        { kata: "0,34 nanometer", fokus: "anakTangga", sorot: [...BASA, "ikatanHidrogen"], label: "Antarpasangan basa 0,34 nm" },
        { kata: "sepuluh pasang basa", fokus: "ukuran", sorot: [], label: "± 10 pasang basa per putaran" },
        { kata: "3,4 nanometer", fokus: "ukuran", label: "Satu putaran ± 3,4 nm" },
        { kata: "alur besar", fokus: "alur", sorot: ["gulaFosfat"], label: "Alur besar dan alur kecil" },
      ],
      narasi:
        "Ukurannya sangat kecil: lebar heliks sekitar 2 nanometer. Jarak antarpasangan basa 0,34 nanometer, dan satu putaran berisi sekitar sepuluh pasang basa — jadi satu putaran panjangnya sekitar 3,4 nanometer. Pilinannya menyisakan alur besar (major groove) dan alur kecil (minor groove).",
    },
    {
      id: "makna",
      tajuk: "Bentuk yang menjelaskan fungsi",
      tahap: "molekul",
      fokus: "ukuran",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "Urutan basa", fokus: "pilin", sorot: BASA, label: "Urutan basa = informasi" },
        { kata: "satu untai cukup", fokus: "buka", sorot: [], label: "Satu untai = cetakan pasangannya" },
      ],
      narasi:
        "Bentuk ini sekaligus menjawab dua syarat materi genetik. Urutan basa bisa apa saja, jadi informasi yang bisa disimpan nyaris tanpa batas. Dan karena pasangannya pasti, satu untai cukup untuk mencetak untai pasangannya — kunci penggandaan DNA.",
    },
  ],

  poinKunci: [
    "DNA adalah rantai nukleotida. Satu nukleotida = gugus fosfat + gula deoksiribosa + satu basa nitrogen (A, G, C, atau T).",
    "Purin (A, G) bercincin ganda; pirimidin (C, T) bercincin tunggal. Pasangan selalu purin–pirimidin: A–T dengan dua ikatan hidrogen, G–C dengan tiga.",
    "Nukleotida bersambung lewat ikatan fosfodiester: fosfat di karbon 5′ satu nukleotida terikat pada karbon 3′ gula sebelumnya. Karena itu tiap untai punya ujung 5′ dan ujung 3′.",
    "Aturan Chargaff: di DNA untai ganda, A ≈ T dan G ≈ C, tetapi kadar A+T terhadap G+C berbeda antarspesies. Angka di film dibulatkan dari data yang lazim dikutip buku ajar: manusia A 31%, T 29%, G 20%, C 20%; E. coli A 25%, T 24%, G 26%, C 26%.",
    "Heliks ganda Watson–Crick (1953): dua untai antiparalel berpilin ke kanan; lebar ± 2 nm, jarak antarpasangan basa 0,34 nm, ± 10 pasang basa per putaran, jadi satu putaran ± 3,4 nm (34 Å).",
    "Lebih rinci: DNA di dalam sel (bentuk B) berisi ± 10,5 pasang basa per putaran. Ada juga bentuk A (lebih gemuk) dan bentuk Z (berpilin ke kiri) dalam keadaan khusus.",
    "Deoksi berarti kurang satu oksigen: gula DNA tidak punya gugus OH di karbon 2′, berbeda dengan ribosa pada RNA (pelajaran 1.3).",
    "Sejarah: foto difraksi terkenal (“Foto 51”) diambil Raymond Gosling di bawah bimbingan Rosalind Franklin, Mei 1952. Watson melihatnya lewat Maurice Wilkins tanpa sepengetahuan Franklin. Nobel 1962 diberikan kepada Watson, Crick, dan Wilkins; Franklin wafat tahun 1958.",
    "Koreksi buku rujukan: satu putaran heliks 34 Å, bukan 3,4 Å (R1, R3); DNA bakteri untai ganda dan melingkar, bukan untai tunggal (R3); basa nitrogen bukan protein (R3).",
  ],

  istilah: [
    { id: "Asam deoksiribonukleat", en: "deoxyribonucleic acid (DNA)", arti: "Molekul pembawa informasi genetik." },
    { id: "Nukleotida", en: "nucleotide", arti: "Satuan penyusun DNA dan RNA: fosfat, gula, dan satu basa." },
    { id: "Gugus fosfat", en: "phosphate group", arti: "Bagian nukleotida yang menyambungkannya dengan nukleotida lain." },
    { id: "Deoksiribosa", en: "deoxyribose", arti: "Gula berkarbon lima pada DNA; tidak punya gugus OH di karbon 2′." },
    { id: "Basa nitrogen", en: "nitrogenous base", arti: "Bagian nukleotida yang berbeda-beda: A, G, C, T (dan U pada RNA)." },
    { id: "Purin", en: "purine", arti: "Basa bercincin ganda: adenin dan guanin." },
    { id: "Pirimidin", en: "pyrimidine", arti: "Basa bercincin tunggal: sitosin, timin, dan urasil." },
    { id: "Untai", en: "strand", arti: "Satu rantai nukleotida yang bersambung." },
    { id: "Rangka gula-fosfat", en: "sugar-phosphate backbone", arti: "Tulang punggung untai: gula dan fosfat berselang-seling." },
    { id: "Ikatan fosfodiester", en: "phosphodiester bond", arti: "Ikatan yang menyambung fosfat satu nukleotida dengan gula nukleotida sebelumnya." },
    { id: "Ujung 5′", en: "five-prime end", arti: "Ujung untai dengan fosfat bebas pada karbon 5′ gula." },
    { id: "Ujung 3′", en: "three-prime end", arti: "Ujung untai dengan gugus hidroksil (OH) bebas pada karbon 3′ gula." },
    { id: "Gugus hidroksil", en: "hydroxyl group", arti: "Gugus –OH; di ujung 3′ tempat nukleotida baru bisa disambungkan." },
    { id: "Pasangan basa komplementer", en: "complementary base pair", arti: "Pasangan tetap A–T dan G–C antara dua untai." },
    { id: "Ikatan hidrogen", en: "hydrogen bond", arti: "Ikatan lemah yang menyatukan pasangan basa; mudah dibuka saat DNA disalin." },
    { id: "Aturan Chargaff", en: "Chargaff's rules", arti: "Di DNA untai ganda, jumlah A ≈ T dan G ≈ C." },
    { id: "Difraksi sinar-X", en: "X-ray diffraction", arti: "Cara memotret susunan molekul dari pola hamburan sinar-X." },
    { id: "Heliks ganda", en: "double helix", arti: "Bentuk DNA: dua untai berpilin mengelilingi satu sumbu." },
    { id: "Antiparalel", en: "antiparallel", arti: "Dua untai sejajar tetapi berlawanan arah (5′→3′ dan 3′→5′)." },
    { id: "Alur besar dan alur kecil", en: "major and minor groove", arti: "Dua lekukan berselang-seling di permukaan heliks." },
    { id: "Pasangan basa", en: "base pair (bp)", arti: "Satu anak tangga DNA; juga satuan panjang DNA." },
  ],

  rujukan: [
    {
      teks: "Watson JD, Crick FHC. Molecular structure of nucleic acids: a structure for deoxyribose nucleic acid. Nature 171:737–738, 1953.",
      url: "https://doi.org/10.1038/171737a0",
    },
    {
      teks: "Franklin RE, Gosling RG. Molecular configuration in sodium thymonucleate. Nature 171:740–741, 1953.",
      url: "https://doi.org/10.1038/171740a0",
    },
    {
      teks: "Chargaff E. Chemical specificity of nucleic acids and mechanism of their enzymatic degradation. Experientia 6:201–209, 1950.",
      url: "https://doi.org/10.1007/BF02173653",
    },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 16.1." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 4." },
    { teks: "Rusfidra. Prinsip Dasar Pemuliaan Ternak, Modul 1 LUHT4326. Universitas Terbuka. KB2 (dengan koreksi, lihat Ringkasan)." },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 7.2 (dengan koreksi, lihat Ringkasan)." },
  ],
};
