import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.2 — Bagian-bagian Sel
 *
 * STATUS: DRAF. Ditulis Claude, BELUM ditinjau Nely.
 * Setiap kalimat di bawah ini perlu diperiksa akurasinya sebelum terbit.
 */

export const bagianBagianSel: Pelajaran = {
  slug: "bagian-bagian-sel",
  nomor: "0.2",
  level: 0,
  judul: "Bagian-bagian Sel dan Fungsinya",
  ringkas:
    "Berkeliling ke dalam satu sel hewan: mengenali membran, inti, mitokondria, ribosom, dan organel lain lewat warna yang akan kamu temui lagi di seluruh pelajaran berikutnya.",
  tingkat: "Dasar",
  animasi: "sel-hewan",
  draf: true,

  adegan: [
    {
      id: "pembuka",
      tajuk: "Satu sel hewan",
      durasi: 26,
      sorot: [],
      narasi:
        "Inilah satu sel hewan. Lebarnya kira-kira dua puluh mikrometer — sekitar lima kali lebih tipis daripada sehelai rambutmu. Di dalam ruang sesempit itu, ratusan pekerjaan berlangsung serentak sepanjang waktu. Mari kita masuk dan berkenalan satu per satu. Perhatikan warnanya: setiap bagian punya warna tetap yang akan kamu temui lagi di seluruh pelajaran berikutnya.",
    },
    {
      id: "membran",
      tajuk: "Membran sel",
      durasi: 28,
      sorot: ["membranSel"],
      narasi:
        "Yang biru tua di tepi adalah membran sel (cell membrane). Ia bukan tembok mati, melainkan dua lapis lemak yang lentur dan hidup. Perhatikan bahwa garisnya digambar ganda — itu bukan hiasan. Membran sel memang tersusun dari dwilapis fosfolipid (phospholipid bilayer). Tugasnya memilih: air dan oksigen boleh lewat, sementara zat lain harus diperiksa dulu lewat protein gerbang.",
    },
    {
      id: "sitoplasma",
      tajuk: "Sitoplasma",
      durasi: 24,
      sorot: ["sitoplasma"],
      narasi:
        "Seluruh ruang di dalam membran, di luar inti, disebut sitoplasma (cytoplasm). Ia bukan air biasa, melainkan cairan kental penuh protein, garam, dan gula. Cairannya sendiri bernama sitosol (cytosol), sementara sitoplasma mencakup sitosol beserta semua organel yang mengapung di dalamnya.",
    },
    {
      id: "inti",
      tajuk: "Inti sel",
      durasi: 27,
      sorot: ["inti"],
      narasi:
        "Bulatan ungu besar ini adalah inti sel atau nukleus (nucleus) — ruang paling penting bagi kita yang belajar genetika. Di sinilah hampir seluruh DNA-mu disimpan. Kalau seluruh sel ini sebuah pabrik, inti adalah ruang arsip tempat cetak biru asli dijaga, dan cetak biru itu tidak pernah boleh dibawa keluar.",
    },
    {
      id: "membran-inti",
      tajuk: "Membran inti dan porinya",
      durasi: 30,
      sorot: ["membranInti"],
      narasi:
        "Inti dibungkus membran inti (nuclear envelope) berwarna ungu muda — dan lagi-lagi ia berlapis dua. Lihat titik-titik di sepanjang tepinya: itu pori inti (nuclear pore). Lewat gerbang inilah salinan RNA keluar menuju sitoplasma, dan protein yang dibutuhkan inti masuk ke dalam. Inilah sebabnya DNA aslinya tetap aman di dalam sementara pesannya tetap bisa sampai ke luar.",
    },
    {
      id: "nukleolus",
      tajuk: "Nukleolus",
      durasi: 25,
      sorot: ["nukleolus"],
      narasi:
        "Gumpalan ungu tua di dalam inti bernama nukleolus (nucleolus). Ia bukan organel bermembran, melainkan wilayah padat tempat RNA ribosom dibuat dan bagian-bagian ribosom dirakit. Jadi sebelum pabrik protein bisa bekerja di luar, komponennya dibuat lebih dulu di sini.",
    },
    {
      id: "kromatin",
      tajuk: "Kromatin",
      durasi: 29,
      sorot: ["kromatin"],
      narasi:
        "Benang-benang kusut di dalam inti adalah kromatin (chromatin): DNA yang terbungkus rapi pada protein histon. Panjang total DNA dalam satu sel manusia hampir dua meter — dan semuanya harus muat di ruang selebar enam mikrometer. Saat sel hendak membelah, benang longgar ini memadat menjadi kromosom yang bisa kita lihat di mikroskop. Kromatin dan kromosom adalah benda yang sama dalam dua keadaan berbeda.",
    },
    {
      id: "mitokondria",
      tajuk: "Mitokondria",
      durasi: 32,
      sorot: ["mitokondria"],
      narasi:
        "Bentuk lonjong jingga ini mitokondria (mitochondrion) — penghasil energi sel. Lipatan berkelok di dalamnya disebut krista (cristae); lipatan itu memperluas permukaan tempat energi dipanen. Dan inilah yang membuatnya istimewa bagi ahli genetika: mitokondria punya DNA sendiri, terpisah dari DNA di inti, berbentuk lingkaran, dan hampir seluruhnya diwariskan dari ibu. Kita akan kembali ke fakta ini saat membahas pelacakan garis keturunan.",
    },
    {
      id: "ribosom",
      tajuk: "Ribosom",
      durasi: 27,
      sorot: ["ribosom"],
      narasi:
        "Titik-titik merah muda kecil yang bertebaran itu ribosom (ribosome) — mesin perakit protein. Ia tidak punya membran, dan ukurannya jauh lebih kecil daripada organel lain. Sebagian mengapung bebas di sitoplasma, sebagian lagi menempel pada permukaan retikulum endoplasma. Di pelajaran Level 1 nanti, ribosom inilah yang akan kita lihat membaca kode genetik kodon demi kodon.",
    },
    {
      id: "re-kasar",
      tajuk: "Retikulum endoplasma kasar",
      durasi: 28,
      sorot: ["reKasar", "ribosom"],
      narasi:
        "Tumpukan kantung hijau kebiruan di samping inti adalah retikulum endoplasma kasar (rough endoplasmic reticulum). Disebut kasar justru karena permukaannya bertabur ribosom — lihat titik merah muda yang menempel di sepanjang tubuhnya. Protein yang akan dikirim keluar sel atau ditanam di membran dibuat dan dilipat di sini.",
    },
    {
      id: "re-halus",
      tajuk: "Retikulum endoplasma halus",
      durasi: 26,
      sorot: ["reHalus"],
      narasi:
        "Saudaranya yang berwarna hijau muda adalah retikulum endoplasma halus (smooth endoplasmic reticulum). Warnanya sengaja dibuat sekeluarga karena keduanya memang satu jaringan yang bersambung. Bedanya, yang ini tanpa ribosom. Tugasnya membuat lemak dan hormon steroid, menyimpan kalsium, serta menawarkan racun — di sel hati, bagian ini sangat berkembang.",
    },
    {
      id: "golgi",
      tajuk: "Badan Golgi",
      durasi: 28,
      sorot: ["golgi"],
      narasi:
        "Tumpukan kantung keemasan ini badan Golgi (Golgi apparatus) — kantor pos sel. Protein yang datang dari retikulum endoplasma diperiksa, disempurnakan, diberi label alamat, lalu dikemas dalam gelembung kecil dan dikirim ke tujuannya. Lihat gelembung yang baru lepas di tepinya: itulah paket yang sedang berangkat.",
    },
    {
      id: "lisosom",
      tajuk: "Lisosom",
      durasi: 27,
      sorot: ["lisosom"],
      narasi:
        "Bulatan merah keunguan ini lisosom (lysosome), kantung berisi enzim pencerna. Bagian dalamnya sengaja dibuat lebih asam daripada sitoplasma di sekelilingnya. Ia membongkar sampah, bakteri yang tertelan, dan organel yang sudah rusak, lalu bahan hasil bongkarannya dipakai lagi. Sel, ternyata, adalah pendaur ulang yang sangat tertib.",
    },
    {
      id: "peroksisom",
      tajuk: "Peroksisom",
      durasi: 25,
      sorot: ["peroksisom"],
      narasi:
        "Yang hijau zaitun ini peroksisom (peroxisome). Ia memecah asam lemak rantai panjang, dan menangani hidrogen peroksida — senyawa berbahaya yang justru muncul sebagai sisa reaksinya sendiri. Enzim katalase di dalamnya langsung mengubah racun itu menjadi air dan oksigen.",
    },
    {
      id: "rangka",
      tajuk: "Sitoskeleton dan sentriol",
      durasi: 29,
      sorot: ["sitoskeleton", "sentriol"],
      narasi:
        "Garis-garis abu-abu yang melintas ke segala arah adalah sitoskeleton (cytoskeleton) — rangka serat yang menjaga bentuk sel sekaligus menjadi rel bagi organel yang berpindah tempat. Dua silinder ungu yang saling tegak lurus itu sentriol (centriole). Saat sel membelah, sentriol mengatur serat yang menarik kromosom ke kutub yang berlawanan.",
    },
    {
      id: "penutup",
      tajuk: "Satu sel, satu sistem",
      durasi: 30,
      sorot: [],
      tampilan: "3d",
      narasi:
        "Sekarang lihat semuanya sekaligus. Dari membran sel di tepi, sampai kromatin di dalam inti — semua bekerja sebagai satu sistem yang tersambung. Ingat baik-baik warnanya, karena warna-warna ini tidak akan berubah. Ungu akan selalu berarti inti sel, jingga akan selalu berarti mitokondria, sampai pelajaran terakhir nanti. Di pelajaran berikutnya kita masuk lebih dalam ke inti sel — dan mulai membuka benang DNA itu sendiri.",
    },
  ],

  poinKunci: [
    "Membran sel adalah dwilapis fosfolipid yang memilih apa yang boleh keluar-masuk — bukan sekadar dinding pembatas.",
    "Inti sel menyimpan DNA; membran inti berlapis dua dan berpori, sehingga pesan bisa keluar tanpa DNA aslinya ikut keluar.",
    "Kromatin dan kromosom adalah benda yang sama: DNA terbungkus histon, dalam keadaan longgar atau memadat.",
    "Mitokondria punya DNA sendiri berbentuk lingkaran yang hampir seluruhnya diwariskan dari ibu.",
    "Ribosom tidak bermembran, dan bisa bebas di sitoplasma atau menempel di retikulum endoplasma kasar.",
    "Retikulum endoplasma kasar dan halus adalah satu jaringan bersambung; yang membedakan hanya ada-tidaknya ribosom di permukaannya.",
  ],

  istilah: [
    { id: "Membran sel", en: "cell membrane / plasma membrane", arti: "Dwilapis fosfolipid yang membatasi sel dengan lingkungannya." },
    { id: "Sitoplasma", en: "cytoplasm", arti: "Seluruh isi sel di dalam membran, di luar inti." },
    { id: "Sitosol", en: "cytosol", arti: "Bagian cair dari sitoplasma, tanpa menghitung organelnya." },
    { id: "Inti sel", en: "nucleus", arti: "Organel bermembran ganda tempat DNA disimpan." },
    { id: "Membran inti", en: "nuclear envelope", arti: "Selaput ganda berpori yang membungkus inti." },
    { id: "Pori inti", en: "nuclear pore", arti: "Gerbang pada membran inti tempat RNA keluar dan protein masuk." },
    { id: "Nukleolus", en: "nucleolus", arti: "Wilayah padat di dalam inti tempat ribosom dirakit." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein histon." },
    { id: "Krista", en: "cristae", arti: "Lipatan membran dalam mitokondria yang memperluas permukaan kerja." },
    { id: "Retikulum endoplasma", en: "endoplasmic reticulum", arti: "Jaringan kantung dan tabung tempat protein dan lemak diolah." },
    { id: "Badan Golgi", en: "Golgi apparatus", arti: "Tumpukan kantung yang menyempurnakan, melabeli, dan mengirim protein." },
    { id: "Lisosom", en: "lysosome", arti: "Kantung enzim pencerna dengan bagian dalam yang asam." },
    { id: "Peroksisom", en: "peroxisome", arti: "Organel pemecah asam lemak dan penetral hidrogen peroksida." },
    { id: "Sitoskeleton", en: "cytoskeleton", arti: "Rangka serat penjaga bentuk sel dan jalur angkutan organel." },
    { id: "Sentriol", en: "centriole", arti: "Sepasang silinder yang mengatur pembagian kromosom saat sel membelah." },
  ],

  rujukan: [
    {
      teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022.",
    },
    {
      teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021.",
    },
    {
      teks: "Lodish H, dkk. Molecular Cell Biology, edisi ke-9. Macmillan, 2021.",
    },
    {
      teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK9839/",
    },
  ],
};
