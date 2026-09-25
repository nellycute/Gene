import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.4 — Inti sel dan DNA di luar inti (dulu 0.3)
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 * Gambar: IntiSel3D — inti besar yang dipotong seperdelapan, nukleosom, dan
 * mitokondria dengan DNA-nya sendiri. `isyarat` mengikuti subtitel.
 * Adegan "dna-mitokondria" BARU (24 Sep 2026).
 * 25 Sep 2026: istilah diseragamkan jadi "membran inti" (sama dengan 0.3 dan
 * Peta Warna); dikoreksi menurut pemeriksaan fakta (tanda pengenal = untuk
 * protein; DNA "tetap di dalam inti", bukan "tidak pernah keluar" — membran
 * inti terurai saat sel hewan membelah; eu/heterokromatin "umumnya").
 */

export const intiSel: Pelajaran = {
  slug: "inti-sel",
  nomor: "0.4",
  level: 0,
  judul: "Inti sel dan DNA di luar inti",
  ringkas:
    "Membongkar gudang arsip sel lapis demi lapis: membran gandanya, gerbang porinya, benang DNA dalam dua keadaan, gumpalan padat yang sibuk merakit ribosom — dan DNA yang tersimpan di luar inti.",
  tingkat: "Dasar",
  animasi: "inti-sel",

  adegan: [
    {
      id: "pembuka",
      tajuk: "Inti sel dari dekat",
      tahap: "utuh",
      durasi: 26,
      sorot: ["inti"],
      narasi:
        "Inilah inti sel (nucleus) dari dekat — bulatan selebar enam mikrometer yang menyimpan hampir seluruh DNA-mu. Pelajaran ini membongkar isinya lapis demi lapis: membrannya, gerbangnya, benang DNA-nya, dan satu gumpalan padat yang sibuk merakit ribosom.",
    },
    {
      id: "dua-lapis",
      tajuk: "Membran ganda",
      tahap: "dua-lapis",
      durasi: 25,
      sorot: ["membranInti", "reKasar"],
      isyarat: [
        { kata: "celah sempit", fokus: "selaput", sorot: ["membranInti"] },
        { kata: "bersambung langsung", fokus: "sambungRE", sorot: ["membranInti", "reKasar"] },
      ],
      narasi:
        "Membran inti (nuclear envelope) terdiri dari dua membran, dengan celah sempit di antaranya. Membran luarnya bersambung langsung dengan retikulum endoplasma kasar — jadi inti bukan kotak tertutup yang terpisah, melainkan bagian dari jaringan membran sel.",
    },
    {
      id: "pori",
      tajuk: "Pori inti",
      tahap: "pori",
      durasi: 24,
      sorot: ["membranInti", "protein"],
      isyarat: [{ kata: "kompleks protein", sorot: ["pori"], label: "Pori inti · kompleks protein" }],
      narasi:
        "Membran itu ditembus ribuan gerbang: pori inti (nuclear pore). Tiap pori adalah kompleks protein besar berbentuk cincin. Molekul kecil lewat bebas; protein besar harus membawa tanda pengenal berupa urutan asam amino tertentu.",
    },
    {
      id: "lalu-lintas",
      tajuk: "Lalu lintas dua arah",
      tahap: "lalu-lintas",
      durasi: 24,
      sorot: ["rna", "protein"],
      isyarat: [
        { kata: "Salinan RNA keluar", sorot: ["rna"], label: "RNA keluar lewat pori" },
        { kata: "masuk dari sitoplasma", sorot: ["protein"], label: "Protein masuk lewat pori" },
        { kata: "DNA aslinya sendiri", fokus: "kromatin", sorot: ["kromatin"], label: "DNA tetap di dalam inti" },
      ],
      narasi:
        "Lalu lintasnya dua arah. Salinan RNA keluar menuju sitoplasma untuk dibaca ribosom. Protein yang bekerja di inti — enzim penyalin, histon, faktor pengatur — masuk dari sitoplasma. DNA aslinya sendiri tetap di dalam inti.",
    },
    {
      id: "kromatin",
      tajuk: "Kromatin: dua keadaan",
      tahap: "kromatin",
      durasi: 27,
      sorot: ["kromatin"],
      isyarat: [
        { kata: "longgar disebut eukromatin", fokus: "eukromatin", sorot: ["eukromatin"], label: "Eukromatin · longgar" },
        {
          kata: "Bagian yang padat",
          fokus: "heterokromatin",
          sorot: ["heterokromatin"],
          label: "Heterokromatin · padat",
        },
      ],
      narasi:
        "Di dalam, DNA tidak telanjang. Ia terbungkus protein menjadi kromatin (chromatin). Bagian yang longgar disebut eukromatin (euchromatin) — gennya umumnya aktif dibaca. Bagian yang padat, banyak menempel di tepi inti, disebut heterokromatin (heterochromatin) — gennya umumnya dibungkam.",
    },
    {
      id: "nukleosom",
      tajuk: "Manik-manik pada tali",
      tahap: "nukleosom",
      durasi: 25,
      sorot: ["histon", "dna"],
      isyarat: [
        { kata: "melilit gulungan protein histon", fokus: "satu", sorot: ["histon"] },
        { kata: "Satu gulungan dengan DNA", fokus: "satu", sorot: ["histon", "dna"], label: "Nukleosom" },
        { kata: "Deretan nukleosom", fokus: "utuh", sorot: ["histon", "dna"] },
      ],
      narasi:
        "Perbesar benang kromatin: DNA melilit gulungan protein histon (histone), seperti benang pada kelos. Satu gulungan dengan DNA yang melilitnya disebut nukleosom (nucleosome). Deretan nukleosom ini tampak seperti manik-manik pada seutas tali.",
    },
    {
      id: "nukleolus",
      tajuk: "Nukleolus",
      tahap: "nukleolus",
      durasi: 25,
      sorot: ["nukleolus", "ribosom"],
      isyarat: [{ kata: "dikirim keluar lewat pori", fokus: "pori", sorot: ["ribosom"], label: "Subunit ribosom keluar" }],
      narasi:
        "Gumpalan padat di dalam inti adalah nukleolus (nucleolus). Tanpa membran. Di sinilah RNA ribosom dibuat dan subunit ribosom dirakit, lalu dikirim keluar lewat pori inti. Sel yang giat membuat protein punya nukleolus yang besar.",
    },
    {
      id: "ukuran",
      tajuk: "Dua meter dalam enam mikrometer",
      tahap: "ukuran",
      durasi: 26,
      sorot: ["dna", "inti"],
      isyarat: [{ kata: "kalau diluruskan", fokus: "urai", label: "± 2 meter DNA" }],
      narasi:
        "Angka yang perlu diingat: DNA satu sel manusia, kalau diluruskan, sekitar dua meter panjangnya. Semuanya harus muat dalam inti selebar enam mikrometer — sekitar tiga ratus ribu kali lebih pendek. Pelajaran berikutnya menjawab bagaimana itu mungkin.",
    },
    {
      id: "dna-mitokondria",
      tajuk: "DNA di luar inti",
      tahap: "mitokondria",
      durasi: 27,
      sorot: ["mitokondria", "dna"],
      isyarat: [
        { kata: "lingkaran kecil", fokus: "cincin", sorot: ["dna"], label: "DNA mitokondria · melingkar" },
        { kata: "hampir selalu berasal dari ibu", fokus: "utuh", sorot: ["mitokondria", "dna"], label: "Diwariskan dari ibu" },
      ],
      narasi:
        "Tidak semua DNA ada di inti. Mitokondria menyimpan DNA-nya sendiri: lingkaran kecil berisi 37 gen, dengan beberapa salinan di tiap mitokondria. Mitokondria sperma tidak ikut diwariskan, jadi DNA mitokondria hampir selalu berasal dari ibu. Kloroplas tumbuhan pun punya DNA sendiri.",
    },
    {
      id: "penutup",
      tajuk: "Gudang arsip yang hidup",
      tahap: "utuh",
      durasi: 25,
      sorot: [],
      narasi:
        "Jadi inti sel adalah gudang arsip yang hidup: membran ganda menjaga, pori mengatur lalu lintas, kromatin menyimpan dalam dua keadaan, dan nukleolus terus merakit mesin pembaca. Selanjutnya: bagaimana benang kusut ini memadat menjadi kromosom.",
    },
  ],

  poinKunci: [
    "Membran inti terdiri dari dua membran; membran luarnya bersambung dengan retikulum endoplasma kasar.",
    "Pori inti adalah kompleks protein berbentuk cincin: molekul kecil lewat bebas, protein besar butuh tanda pengenal.",
    "RNA keluar dari inti, protein tertentu masuk — DNA aslinya tetap di dalam inti.",
    "Eukromatin longgar dan gennya umumnya aktif; heterokromatin padat dan gennya umumnya dibungkam.",
    "Nukleosom = DNA yang melilit delapan histon; ini tingkat pemadatan pertama.",
    "Nukleolus tidak bermembran; di sanalah subunit ribosom dirakit.",
    "Dua meter DNA harus muat dalam inti selebar enam mikrometer.",
    "DNA juga ada di luar inti: DNA mitokondria melingkar, berisi 37 gen, dan hampir selalu diwariskan dari ibu; kloroplas juga punya DNA sendiri.",
  ],

  istilah: [
    { id: "Membran inti", en: "nuclear envelope", arti: "Dua membran berpori yang membungkus inti." },
    { id: "Pori inti", en: "nuclear pore", arti: "Kompleks protein pada membran inti yang mengatur keluar-masuk molekul." },
    { id: "Nukleoplasma", en: "nucleoplasm", arti: "Cairan di dalam inti tempat kromatin dan nukleolus berada." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein histon." },
    { id: "Eukromatin", en: "euchromatin", arti: "Kromatin longgar; gen di dalamnya umumnya aktif dibaca." },
    { id: "Heterokromatin", en: "heterochromatin", arti: "Kromatin padat; gen di dalamnya umumnya dibungkam." },
    { id: "Histon", en: "histone", arti: "Protein gulungan tempat DNA melilit." },
    { id: "Nukleosom", en: "nucleosome", arti: "Satu gulungan histon beserta DNA yang melilitnya." },
    { id: "Nukleolus", en: "nucleolus", arti: "Wilayah padat tanpa membran di dalam inti tempat ribosom dirakit." },
    { id: "Lamina inti", en: "nuclear lamina", arti: "Anyaman serat di bawah membran dalam yang menyangga bentuk inti." },
    { id: "DNA mitokondria", en: "mitochondrial DNA (mtDNA)", arti: "DNA melingkar milik mitokondria; hampir selalu diwariskan dari ibu." },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022." },
    { teks: "MedlinePlus Genetics — Mitochondrial DNA.", url: "https://medlineplus.gov/genetics/chromosome/mitochondrial-dna/" },
    { teks: "Lodish H, dkk. Molecular Cell Biology, edisi ke-9. Macmillan, 2021." },
    { teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM). The Nucleus.", url: "https://www.ncbi.nlm.nih.gov/books/NBK9845/" },
  ],
};
