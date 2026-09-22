import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.3 — Inti sel: membran inti, kromatin, nukleolus
 *
 * STATUS: DRAF. Ditulis Claude, BELUM ditinjau Nely.
 * Tiap adegan ≤ 45 kata (KEPUTUSAN-DESAIN.md §8.1).
 */

export const intiSel: Pelajaran = {
  slug: "inti-sel",
  nomor: "0.3",
  level: 0,
  judul: "Inti Sel: Membran Inti, Kromatin, Nukleolus",
  ringkas:
    "Membongkar gudang arsip sel lapis demi lapis: selaput gandanya, gerbang porinya, benang DNA dalam dua keadaan, dan gumpalan padat yang sibuk merakit ribosom.",
  tingkat: "Dasar",
  animasi: "inti-sel",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Inti sel dari dekat",
      tahap: "utuh",
      durasi: 26,
      sorot: ["inti"],
      narasi:
        "Inilah inti sel (nucleus) dari dekat — bulatan selebar enam mikrometer yang menyimpan hampir seluruh DNA-mu. Pelajaran ini membongkar isinya lapis demi lapis: selaputnya, gerbangnya, benang DNA-nya, dan satu gumpalan padat yang sibuk merakit ribosom.",
    },
    {
      id: "dua-lapis",
      tajuk: "Selaput ganda",
      tahap: "dua-lapis",
      durasi: 25,
      sorot: ["membranInti", "reKasar"],
      narasi:
        "Selaput inti (nuclear envelope) berlapis dua, dengan celah sempit di antaranya. Lapisan luarnya bersambung langsung dengan retikulum endoplasma kasar — jadi inti bukan kotak tertutup yang terpisah, melainkan bagian dari jaringan membran sel.",
    },
    {
      id: "pori",
      tajuk: "Pori inti",
      tahap: "pori",
      durasi: 24,
      sorot: ["membranInti", "protein"],
      narasi:
        "Selaput itu ditembus ribuan gerbang: pori inti (nuclear pore). Tiap pori adalah kompleks protein besar berbentuk cincin. Molekul kecil lewat bebas; molekul besar harus membawa tanda pengenal berupa urutan asam amino tertentu.",
    },
    {
      id: "lalu-lintas",
      tajuk: "Lalu lintas dua arah",
      tahap: "lalu-lintas",
      durasi: 24,
      sorot: ["rna", "protein"],
      narasi:
        "Lalu lintasnya dua arah. Salinan RNA keluar menuju sitoplasma untuk dibaca ribosom. Protein yang bekerja di inti — enzim penyalin, histon, faktor pengatur — masuk dari sitoplasma. DNA aslinya sendiri tidak pernah keluar.",
    },
    {
      id: "kromatin",
      tajuk: "Kromatin: dua keadaan",
      tahap: "kromatin",
      durasi: 27,
      sorot: ["kromatin"],
      narasi:
        "Di dalam, DNA tidak telanjang. Ia terbungkus protein menjadi kromatin (chromatin). Bagian yang longgar disebut eukromatin (euchromatin) — gennya aktif dibaca. Bagian yang padat, menempel di tepi inti, disebut heterokromatin (heterochromatin) — gennya sedang dibungkam.",
    },
    {
      id: "nukleosom",
      tajuk: "Manik-manik pada tali",
      tahap: "nukleosom",
      durasi: 25,
      sorot: ["histon", "dna"],
      narasi:
        "Perbesar benang kromatin: DNA melilit gulungan protein histon (histone), seperti benang pada kelos. Satu gulungan dengan DNA yang melilitnya disebut nukleosom (nucleosome). Deretan nukleosom ini tampak seperti manik-manik pada seutas tali.",
    },
    {
      id: "nukleolus",
      tajuk: "Nukleolus",
      tahap: "nukleolus",
      durasi: 25,
      sorot: ["nukleolus", "ribosom"],
      narasi:
        "Gumpalan padat di dalam inti adalah nukleolus (nucleolus). Tanpa membran. Di sinilah RNA ribosom dibuat dan subunit ribosom dirakit, lalu dikirim keluar lewat pori inti. Sel yang giat membuat protein punya nukleolus yang besar.",
    },
    {
      id: "ukuran",
      tajuk: "Dua meter dalam enam mikrometer",
      tahap: "ukuran",
      durasi: 26,
      sorot: ["dna", "inti"],
      narasi:
        "Angka yang perlu diingat: DNA satu sel manusia, kalau diluruskan, hampir dua meter panjangnya. Semuanya harus muat dalam inti selebar enam mikrometer — sekitar tiga ratus ribu kali lebih pendek. Pelajaran berikutnya menjawab bagaimana itu mungkin.",
    },
    {
      id: "penutup",
      tajuk: "Gudang arsip yang hidup",
      tahap: "utuh",
      durasi: 25,
      sorot: [],
      narasi:
        "Jadi inti sel adalah gudang arsip yang hidup: selaput ganda menjaga, pori mengatur lalu lintas, kromatin menyimpan dalam dua keadaan, dan nukleolus terus merakit mesin pembaca. Selanjutnya: bagaimana benang kusut ini memadat menjadi kromosom.",
    },
  ],

  poinKunci: [
    "Selaput inti berlapis dua; lapisan luarnya bersambung dengan retikulum endoplasma kasar.",
    "Pori inti adalah kompleks protein berbentuk cincin: molekul kecil lewat bebas, molekul besar butuh tanda pengenal.",
    "RNA keluar dari inti, protein tertentu masuk — DNA aslinya tidak pernah keluar.",
    "Eukromatin longgar dan gennya aktif; heterokromatin padat dan gennya dibungkam.",
    "Nukleosom = DNA yang melilit delapan histon; ini tingkat pemadatan pertama.",
    "Nukleolus tidak bermembran; di sanalah subunit ribosom dirakit.",
    "Dua meter DNA harus muat dalam inti selebar enam mikrometer.",
  ],

  istilah: [
    { id: "Selaput inti", en: "nuclear envelope", arti: "Membran ganda berpori yang membungkus inti." },
    { id: "Pori inti", en: "nuclear pore", arti: "Kompleks protein pada selaput inti yang mengatur keluar-masuk molekul." },
    { id: "Nukleoplasma", en: "nucleoplasm", arti: "Cairan di dalam inti tempat kromatin dan nukleolus berada." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein histon." },
    { id: "Eukromatin", en: "euchromatin", arti: "Kromatin longgar; gen di dalamnya aktif dibaca." },
    { id: "Heterokromatin", en: "heterochromatin", arti: "Kromatin padat; gen di dalamnya dibungkam." },
    { id: "Histon", en: "histone", arti: "Protein gulungan tempat DNA melilit." },
    { id: "Nukleosom", en: "nucleosome", arti: "Satu gulungan histon beserta DNA yang melilitnya." },
    { id: "Nukleolus", en: "nucleolus", arti: "Wilayah padat tanpa membran di dalam inti tempat ribosom dirakit." },
    { id: "Lamina inti", en: "nuclear lamina", arti: "Anyaman serat di bawah selaput dalam yang menyangga bentuk inti." },
  ],

  rujukan: [
    { teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022. Bab 12: Intracellular Membrane Traffic." },
    { teks: "Lodish H, dkk. Molecular Cell Biology, edisi ke-9. Macmillan, 2021." },
    { teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM). The Nucleus.", url: "https://www.ncbi.nlm.nih.gov/books/NBK9845/" },
  ],
};
