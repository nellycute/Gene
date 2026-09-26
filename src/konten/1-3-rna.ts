import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 1.3 — RNA dan bedanya dengan DNA
 *
 * STATUS: DRAF — menunggu tinjauan penuh Nely (keputusannya 26 Sep 2026).
 * Ditulis Claude 26 Sep 2026 mengikuti KURIKULUM.md (R2 bab 3; R3 7.5).
 *
 * Catatan rujukan: R3 hlm. 161 menyebut RNA "tidak terpilin". Untai RNA memang
 * tunggal, tetapi bagian yang saling komplementer berpasangan dan membentuk
 * heliks pendek (jepit rambut). Yang ditulis di sini mengikuti buku ajar baku.
 *
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: satu film 3D (RNA3D). Rangka RNA digambar dengan warna RNA (jingga)
 * agar untai RNA tidak tertukar dengan untai DNA (rangka kelabu).
 */

const BASA_RNA = ["basaA", "basaU", "basaG", "basaC"];

export const rna: Pelajaran = {
  slug: "rna",
  nomor: "1.3",
  level: 1,
  judul: "RNA dan bedanya dengan DNA",
  ringkas:
    "RNA, salinan kerja DNA: gula ribosa, urasil pengganti timin, untai tunggal yang bisa melipat, dan tiga jenisnya — mRNA, tRNA, rRNA — beserta dogma sentral.",
  tingkat: "Dasar",
  animasi: "rna",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Salinan kerja DNA",
      tahap: "pembuka",
      fokus: "dna",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "jarang dipakai langsung", fokus: "dna", sorot: ["gulaFosfat", "basaA", "basaT", "basaG", "basaC", "ikatanHidrogen"], label: "DNA: arsip instruksi" },
        { kata: "asam ribonukleat", fokus: "rna", sorot: ["rna", ...BASA_RNA], label: "RNA · asam ribonukleat" },
        { kata: "tiga perbedaan", fokus: "utuh", sorot: [], label: "Tiga perbedaan DNA dan RNA" },
      ],
      narasi:
        "DNA menyimpan instruksi, tetapi jarang dipakai langsung. Sel membuat salinan kerja dari potongan DNA: RNA, asam ribonukleat (ribonucleic acid). RNA juga rantai nukleotida, tetapi ada tiga perbedaan penting.",
    },
    {
      id: "gula",
      tajuk: "1 · Gula ribosa",
      tahap: "banding",
      fokus: "gula",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "deoksiribosa", fokus: "gulaDNA", sorot: ["gulaDNA"], label: "DNA: deoksiribosa" },
        { kata: "ribosa (ribose)", fokus: "gulaRNA", sorot: ["gulaRNA", "gugusOH"], label: "RNA: ribosa · ada OH di karbon 2′" },
        { kata: "lebih mudah terurai", fokus: "gula", sorot: ["gugusOH"], label: "RNA: salinan sementara" },
      ],
      narasi:
        "Perbedaan pertama ada pada gulanya. DNA memakai deoksiribosa; RNA memakai ribosa (ribose), yang masih punya gugus OH pada karbon nomor dua. Gugus inilah yang membuat RNA lebih mudah terurai — cocok untuk salinan sementara.",
    },
    {
      id: "urasil",
      tajuk: "2 · Urasil pengganti timin",
      tahap: "banding",
      fokus: "basa",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "tidak memakai timin", fokus: "basa", sorot: ["basaT"], label: "Timin (T): hanya di DNA" },
        { kata: "urasil (uracil", fokus: "basa", sorot: ["basaU"], label: "Urasil (U): pengganti T di RNA" },
        { kata: "gugus metil", fokus: "metil", sorot: ["basaT", "metil"], label: "Timin = urasil + gugus metil" },
      ],
      narasi:
        "Perbedaan kedua: RNA tidak memakai timin. Tempatnya diganti urasil (uracil), yang juga berpasangan dengan adenin. Timin sebenarnya urasil yang membawa satu gugus metil (methyl group) tambahan.",
    },
    {
      id: "untai-tunggal",
      tajuk: "3 · Untai tunggal yang melipat",
      tahap: "untai",
      fokus: "lurus",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "untai tunggal", fokus: "lurus", sorot: [], label: "Untai tunggal" },
        { kata: "bisa melipat", fokus: "lipat", sorot: [], label: "Untai melipat pada dirinya sendiri" },
        { kata: "G dengan C", fokus: "lipat", sorot: BASA_RNA, label: "G–C dan A–U berpasangan" },
        { kata: "jepit rambut", fokus: "lipat", sorot: [], label: "Jepit rambut (hairpin)" },
      ],
      narasi:
        "Perbedaan ketiga: RNA biasanya berupa untai tunggal (single strand). Tetapi untai itu bisa melipat: bagian-bagiannya yang saling komplementer berpasangan — G dengan C, A dengan U — membentuk jepit rambut (hairpin) dan bentuk rumit lainnya.",
    },
    {
      id: "pendek",
      tajuk: "Jauh lebih pendek",
      tahap: "pembuka",
      fokus: "panjang",
      durasi: 20,
      sorot: [],
      isyarat: [
        { kata: "ratusan juta pasang basa", fokus: "panjang", label: "Satu kromosom: puluhan–ratusan juta pasang basa" },
        { kata: "beberapa ribu nukleotida", fokus: "rna", sorot: ["rna", ...BASA_RNA], label: "Satu RNA: puluhan–ribuan nukleotida" },
        { kata: "salinan satu gen", fokus: "utuh", sorot: [], label: "RNA = salinan satu gen" },
      ],
      narasi:
        "RNA juga jauh lebih pendek. Satu kromosom manusia berisi puluhan sampai ratusan juta pasang basa, sedangkan satu RNA biasanya hanya puluhan sampai beberapa ribu nukleotida — salinan satu gen, bukan seluruh kromosom.",
    },
    {
      id: "tiga-jenis",
      tajuk: "Tiga jenis RNA",
      tahap: "jenis",
      fokus: "utuh",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "RNA duta", fokus: "mrna", sorot: ["mrna"], label: "mRNA · RNA duta" },
        { kata: "RNA transfer", fokus: "trna", sorot: ["trna"], label: "tRNA · RNA transfer" },
        { kata: "RNA ribosom", fokus: "rrna", sorot: ["ribosom"], label: "rRNA · RNA ribosom" },
        { kata: "Ketiganya disalin", fokus: "utuh", sorot: [], label: "Ketiganya disalin dari DNA" },
      ],
      narasi:
        "Untuk membuat protein, sel memakai tiga jenis RNA utama: RNA duta (messenger RNA) atau mRNA, RNA transfer (transfer RNA) atau tRNA, dan RNA ribosom (ribosomal RNA) atau rRNA. Ketiganya disalin dari DNA.",
    },
    {
      id: "mrna",
      tajuk: "mRNA · pembawa pesan",
      tahap: "perjalanan",
      fokus: "inti",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dari inti", fokus: "pori", sorot: ["mrna", "membranInti"], label: "mRNA keluar lewat pori inti" },
        { kata: "ke sitoplasma", fokus: "ribosom", sorot: ["mrna", "ribosom"], label: "Menuju ribosom di sitoplasma" },
        { kata: "kodon (codon)", fokus: "kodon", sorot: ["mrna"], label: "Kodon: tiga basa" },
      ],
      narasi:
        "RNA duta membawa salinan instruksi satu gen dari inti ke sitoplasma, tempat ribosom berada. Urutan basanya dibaca tiga-tiga; setiap tiga basa disebut kodon (codon) dan menunjuk satu asam amino.",
    },
    {
      id: "trna",
      tajuk: "tRNA · pembawa asam amino",
      tahap: "jenis",
      fokus: "trna",
      durasi: 22,
      sorot: ["trna"],
      isyarat: [
        { kata: "huruf L", fokus: "trna", sorot: ["trna"], label: "tRNA berbentuk L" },
        { kata: "mengikat asam amino", fokus: "trnaAtas", sorot: ["asamAmino"], label: "Ujung 3′: asam amino" },
        { kata: "antikodon (anticodon)", fokus: "trnaBawah", sorot: ["antikodon"], label: "Antikodon: pasangan kodon" },
      ],
      narasi:
        "RNA transfer berbentuk seperti huruf L, panjangnya sekitar tujuh puluh sampai sembilan puluh nukleotida. Satu ujungnya mengikat asam amino; di ujung lain ada antikodon (anticodon), tiga basa yang berpasangan dengan kodon pada mRNA.",
    },
    {
      id: "rrna",
      tajuk: "rRNA · mesin perakit",
      tahap: "jenis",
      fokus: "rrna",
      durasi: 22,
      sorot: ["ribosom"],
      isyarat: [
        { kata: "puluhan protein", fokus: "rrna", sorot: ["ribosom"], label: "rRNA + protein = ribosom" },
        { kata: "besar dan kecil", fokus: "rrna", sorot: ["subunitBesar", "subunitKecil"], label: "Subunit besar dan subunit kecil" },
        { kata: "seperti enzim", fokus: "rrna", sorot: ["subunitBesar"], label: "rRNA bekerja seperti enzim (ribozim)" },
      ],
      narasi:
        "RNA ribosom bergabung dengan puluhan protein membentuk ribosom, yang terdiri dari subunit besar dan kecil. rRNA-lah yang merangkai asam amino menjadi rantai, jadi RNA ini bekerja seperti enzim.",
    },
    {
      id: "dogma",
      tajuk: "Dogma sentral",
      tahap: "dogma",
      fokus: "utuh",
      durasi: 24,
      sorot: [],
      isyarat: [
        { kata: "Francis Crick", fokus: "utuh", label: "1958 · dogma sentral (Crick)" },
        { kata: "lewat replikasi", fokus: "replikasi", label: "DNA → DNA · replikasi" },
        { kata: "lewat transkripsi", fokus: "transkripsi", label: "DNA → RNA · transkripsi" },
        { kata: "lewat translasi", fokus: "translasi", label: "RNA → protein · translasi" },
        { kata: "Tiga pelajaran berikutnya", fokus: "utuh", label: "Berikutnya: 1.4 · 1.5 · 1.6" },
      ],
      narasi:
        "Alurnya dirangkum Francis Crick tahun 1958 sebagai dogma sentral (central dogma): DNA disalin menjadi DNA lewat replikasi, DNA disalin menjadi RNA lewat transkripsi, lalu RNA diterjemahkan menjadi protein lewat translasi. Tiga pelajaran berikutnya membahasnya satu per satu.",
    },
  ],

  poinKunci: [
    "RNA (asam ribonukleat) adalah salinan kerja dari potongan DNA, juga berupa rantai nukleotida.",
    "Tiga perbedaan utama: gula RNA adalah ribosa (ada gugus OH di karbon 2′); RNA memakai urasil (U) sebagai pengganti timin (T); RNA biasanya untai tunggal.",
    "Timin = urasil + satu gugus metil. U berpasangan dengan A, sama seperti T.",
    "Untai tunggal RNA bisa melipat: bagian yang komplementer berpasangan (G–C, A–U) membentuk jepit rambut. Karena itu buku rujukan R3 (hlm. 161) keliru menyebut RNA “tidak terpilin” — batang jepit rambut berupa heliks pendek.",
    "mRNA membawa instruksi satu gen ke ribosom; tRNA (± 70–90 nukleotida, berbentuk L) membawa asam amino dan antikodon; rRNA bersama puluhan protein membentuk ribosom dan merangkai asam amino.",
    "Di dalam sel, rRNA adalah RNA terbanyak (± 80% dari seluruh RNA); mRNA hanya beberapa persen.",
    "Gambar tRNA di film berbentuk L — bentuk tiga dimensinya. Di buku, tRNA sering digambar datar seperti daun semanggi (cloverleaf); keduanya molekul yang sama.",
    "Dogma sentral (Crick, 1958): DNA → DNA (replikasi), DNA → RNA (transkripsi), RNA → protein (translasi). Pengecualian: sebagian virus menyimpan materi genetiknya sebagai RNA, dan retrovirus seperti HIV menyalin RNA menjadi DNA (transkripsi balik).",
    "Warna di film: rangka RNA digambar jingga (warna RNA), rangka DNA kelabu — agar kedua untai tidak tertukar saat tampil bersama.",
  ],

  istilah: [
    { id: "RNA", en: "ribonucleic acid", arti: "Asam ribonukleat; salinan kerja dari potongan DNA." },
    { id: "Ribosa", en: "ribose", arti: "Gula berkarbon lima pada RNA; punya gugus OH di karbon 2′." },
    { id: "Urasil", en: "uracil", arti: "Basa pirimidin pengganti timin pada RNA; berpasangan dengan adenin." },
    { id: "Gugus metil", en: "methyl group", arti: "Gugus –CH₃; yang membedakan timin dari urasil." },
    { id: "Untai tunggal", en: "single strand", arti: "Satu rantai nukleotida tanpa untai pasangan." },
    { id: "Jepit rambut", en: "hairpin", arti: "Lipatan RNA: batang berpasangan dengan simpul di ujungnya." },
    { id: "RNA duta", en: "messenger RNA (mRNA)", arti: "Pembawa salinan instruksi satu gen ke ribosom." },
    { id: "RNA transfer", en: "transfer RNA (tRNA)", arti: "Pembawa asam amino ke ribosom; punya antikodon." },
    { id: "RNA ribosom", en: "ribosomal RNA (rRNA)", arti: "RNA penyusun ribosom; merangkai asam amino." },
    { id: "Kodon", en: "codon", arti: "Tiga basa berurutan pada mRNA yang menunjuk satu asam amino." },
    { id: "Antikodon", en: "anticodon", arti: "Tiga basa pada tRNA yang berpasangan dengan kodon." },
    { id: "Ribosom", en: "ribosome", arti: "Mesin perakit protein dari rRNA dan protein; dua subunit." },
    { id: "Ribozim", en: "ribozyme", arti: "RNA yang bekerja seperti enzim." },
    { id: "Dogma sentral", en: "central dogma", arti: "Alur informasi DNA → RNA → protein (Crick, 1958)." },
    { id: "Transkripsi", en: "transcription", arti: "Penyalinan DNA menjadi RNA." },
    { id: "Translasi", en: "translation", arti: "Penerjemahan urutan RNA menjadi rantai asam amino." },
  ],

  rujukan: [
    { teks: "Crick FHC. On protein synthesis. Symposia of the Society for Experimental Biology 12:138–163, 1958." },
    { teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021. Bab 5.5 dan 17.1." },
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 6." },
    { teks: "Clark MA, dkk. Biology 2e. OpenStax, 2018. Bab 14–15.", url: "https://openstax.org/details/books/biology-2e" },
    { teks: "Effendi Y. Buku Ajar Genetika Dasar. Pustaka Rumah C1nta, 2020. Bab 7.5 (dengan koreksi, lihat Ringkasan)." },
  ],
};
