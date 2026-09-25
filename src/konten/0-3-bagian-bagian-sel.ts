import type { Pelajaran } from "@/lib/tipe";

/**
 * PELAJARAN 0.3 — Bagian-bagian sel dan fungsinya (dulu 0.2)
 *
 * STATUS: TERBIT 25 Sep 2026. Ditulis Claude; akurasinya diperiksa Claude atas izin Nely.
 * Gambarnya sel hewan 3D bergaris yang dibelah (KEPUTUSAN-DESAIN.md §3) —
 * narasi merujuk pada apa yang tampak di model itu — dan, sejak 25 Sep 2026,
 * sel tumbuhan (tahap "tumbuhan").
 * 25 Sep 2026: semua adegan dipadatkan ke ≤ 45 kata (§8.1) dan dikoreksi
 * menurut pemeriksaan fakta (membran sel bukan "dinding"; membran inti = dua
 * membran; rambut = empat kali lebar sel; sentriol tidak menarik kromosom
 * sendiri; "menetralkan", bukan "menawarkan", racun).
 */

export const bagianBagianSel: Pelajaran = {
  slug: "bagian-bagian-sel",
  nomor: "0.3",
  level: 0,
  judul: "Bagian-bagian sel dan fungsinya",
  ringkas:
    "Berkeliling ke dalam satu sel hewan — membran, inti, mitokondria, ribosom, dan organel lain lewat warna yang akan kamu temui lagi — lalu melihat apa yang membuat sel tumbuhan berbeda.",
  tingkat: "Dasar",
  animasi: "sel-hewan",

  adegan: [
    {
      id: "pembuka",
      tajuk: "Satu sel hewan",
      durasi: 22,
      sorot: [],
      narasi:
        "Inilah satu sel hewan, kita belah seperti membelah buah agar isinya terlihat. Lebarnya kira-kira dua puluh mikrometer — seperempat tebal sehelai rambutmu. Perhatikan warnanya: setiap bagian punya warna tetap yang akan kamu temui lagi di seluruh pelajaran berikutnya.",
    },
    {
      id: "membran",
      tajuk: "Membran sel",
      durasi: 22,
      sorot: ["membranSel"],
      isyarat: [
        { kata: "dua lapis lemak", fokus: "tepiMembran" },
        { kata: "Tugasnya memilih", fokus: "membranSel" },
      ],
      narasi:
        "Selaput biru tua yang membungkus semuanya adalah membran sel (cell membrane): dua lapis lemak yang lentur, disebut dwilapis fosfolipid (phospholipid bilayer). Tugasnya memilih: oksigen, karbon dioksida, dan air bisa lewat; kebanyakan zat lain harus melalui protein gerbang.",
    },
    {
      id: "sitoplasma",
      tajuk: "Sitoplasma",
      durasi: 20,
      sorot: ["sitoplasma"],
      narasi:
        "Seluruh ruang di dalam membran, di luar inti, disebut sitoplasma (cytoplasm). Cairannya — sitosol (cytosol) — kental, penuh protein, garam, dan gula. Sitoplasma mencakup sitosol itu beserta semua organel (organelle) yang mengapung di dalamnya.",
    },
    {
      id: "inti",
      tajuk: "Inti sel",
      durasi: 22,
      sorot: ["inti"],
      narasi:
        "Bola ungu besar yang sepotongnya kita buka ini adalah inti sel atau nukleus (nucleus). Di sinilah hampir seluruh DNA-mu disimpan. Kalau sel ini sebuah pabrik, inti adalah ruang arsip tempat cetak biru asli dijaga — yang keluar hanya salinannya.",
    },
    {
      id: "membran-inti",
      tajuk: "Membran inti dan porinya",
      durasi: 24,
      sorot: ["membranInti"],
      isyarat: [{ kata: "Cincin-cincin kecil", fokus: "poriInti" }],
      narasi:
        "Inti dibungkus membran inti (nuclear envelope) berwarna ungu muda. Bedanya dengan membran sel: ini dua membran, masing-masing dwilapis fosfolipid. Cincin-cincin kecil di permukaannya adalah pori inti (nuclear pore): lewat gerbang ini RNA keluar dan protein masuk, sementara DNA aslinya tetap di dalam.",
    },
    {
      id: "nukleolus",
      tajuk: "Nukleolus",
      durasi: 20,
      sorot: ["nukleolus"],
      narasi:
        "Gumpalan ungu tua di dalam inti bernama nukleolus (nucleolus). Ia tidak bermembran; di wilayah padat inilah RNA ribosom dibuat dan bagian-bagian ribosom dirakit. Jadi sebelum pabrik protein bekerja di luar, komponennya dirakit lebih dulu di sini.",
    },
    {
      id: "kromatin",
      tajuk: "Kromatin",
      durasi: 24,
      sorot: ["kromatin"],
      narasi:
        "Benang-benang kusut di dalam inti adalah kromatin (chromatin): DNA yang terbungkus protein histon (histone). DNA satu sel manusia panjangnya sekitar dua meter, tetapi muat dalam inti selebar enam mikrometer. Saat sel membelah, benang ini memadat menjadi kromosom (chromosome) — benda yang sama dalam keadaan berbeda.",
    },
    {
      id: "mitokondria",
      tajuk: "Mitokondria",
      durasi: 22,
      sorot: ["mitokondria"],
      isyarat: [
        { kata: "Lipatan berkelok", fokus: "krista" },
        { kata: "mitokondria punya DNA sendiri", fokus: "mitokondria" },
      ],
      narasi:
        "Bentuk lonjong jingga ini mitokondria (mitochondrion) — penghasil energi sel. Lipatan berkelok di dalamnya, krista (cristae), memperluas permukaan tempat energi dipanen. Yang istimewa bagi ahli genetika: mitokondria punya DNA sendiri, berbentuk lingkaran, dan hampir selalu diwariskan dari ibu.",
    },
    {
      id: "ribosom",
      tajuk: "Ribosom",
      durasi: 22,
      sorot: ["ribosom"],
      isyarat: [{ kata: "sebagian lagi menempel", fokus: "riboER" }],
      narasi:
        "Titik-titik merah muda kecil itu ribosom (ribosome) — mesin perakit protein, tanpa membran dan jauh lebih kecil daripada organel lain. Sebagian mengapung bebas di sitoplasma, sebagian lagi menempel pada retikulum endoplasma. Di Tingkat 1, ribosom inilah yang membaca kode genetik.",
    },
    {
      id: "re-kasar",
      tajuk: "Retikulum endoplasma kasar",
      durasi: 22,
      sorot: ["reKasar", "ribosom"],
      narasi:
        "Tumpukan kantung hijau kebiruan di samping inti adalah retikulum endoplasma kasar (rough endoplasmic reticulum). Disebut kasar karena permukaannya bertabur ribosom — lihat titik merah muda di sepanjang tubuhnya. Protein yang akan dikirim keluar sel atau ditanam di membran dibuat dan dilipat di sini.",
    },
    {
      id: "re-halus",
      tajuk: "Retikulum endoplasma halus",
      durasi: 22,
      sorot: ["reHalus"],
      narasi:
        "Saudaranya yang hijau muda adalah retikulum endoplasma halus (smooth endoplasmic reticulum) — satu jaringan yang bersambung dengan yang kasar, tetapi tanpa ribosom. Tugasnya membuat lemak dan hormon steroid, menyimpan kalsium, dan menetralkan racun; di sel hati, bagian ini sangat berkembang.",
    },
    {
      id: "golgi",
      tajuk: "Badan Golgi",
      durasi: 22,
      sorot: ["golgi"],
      isyarat: [{ kata: "Lihat gelembung", fokus: "vesikel" }],
      narasi:
        "Tumpukan kantung keemasan ini badan Golgi (Golgi apparatus) — kantor pos sel. Protein yang datang dari retikulum endoplasma diperiksa, disempurnakan, diberi label alamat, lalu dikemas dalam gelembung kecil dan dikirim ke tujuannya. Lihat gelembung yang baru lepas di tepinya: itulah paket yang sedang berangkat.",
    },
    {
      id: "lisosom",
      tajuk: "Lisosom",
      durasi: 22,
      sorot: ["lisosom"],
      narasi:
        "Bulatan merah keunguan ini lisosom (lysosome), kantung berisi enzim pencerna. Bagian dalamnya dijaga lebih asam daripada sitoplasma di sekelilingnya. Ia membongkar sampah, bakteri yang tertelan, dan organel yang sudah rusak, lalu bahan hasil bongkarannya dipakai lagi. Sel, ternyata, adalah pendaur ulang yang sangat tertib.",
    },
    {
      id: "peroksisom",
      tajuk: "Peroksisom",
      durasi: 20,
      sorot: ["peroksisom"],
      narasi:
        "Yang hijau zaitun ini peroksisom (peroxisome). Ia memecah asam lemak rantai sangat panjang, dan menangani hidrogen peroksida — senyawa berbahaya yang justru muncul sebagai sisa reaksinya sendiri. Enzim katalase (catalase) di dalamnya langsung mengubah racun itu menjadi air dan oksigen.",
    },
    {
      id: "rangka",
      tajuk: "Sitoskeleton dan sentriol",
      durasi: 22,
      sorot: ["sitoskeleton", "sentriol"],
      isyarat: [{ kata: "Dua silinder ungu", fokus: "sentriol", sorot: ["sentriol"] }],
      narasi:
        "Garis-garis abu-abu yang melintas ke segala arah adalah sitoskeleton (cytoskeleton): rangka serat penjaga bentuk sel sekaligus rel bagi organel yang berpindah. Dua silinder ungu yang saling tegak lurus itu sentriol (centriole). Saat sel hewan membelah, sepasang sentriol menjadi pusat asal serat penarik kromosom.",
    },
    {
      id: "sel-tumbuhan",
      tajuk: "Sel tumbuhan",
      tahap: "tumbuhan",
      durasi: 22,
      sorot: [],
      isyarat: [
        { kata: "dinding sel", fokus: "dinding", sorot: ["dindingSel", "membranSel"] },
        { kata: "kloroplas", fokus: "kloroplas", sorot: ["kloroplas"] },
        { kata: "vakuola pusat", fokus: "vakuola", sorot: ["vakuola"] },
      ],
      narasi:
        "Sel tumbuhan punya sebagian besar bagian yang sama, ditambah tiga ciri khas: dinding sel (cell wall) dari selulosa di luar membran; kloroplas (chloroplast) tempat fotosintesis, yang juga punya DNA sendiri; dan vakuola pusat (central vacuole) yang bisa memenuhi hampir seluruh sel.",
    },
    {
      id: "penutup",
      tajuk: "Satu sel, satu sistem",
      durasi: 22,
      sorot: [],
      narasi:
        "Kini lihat semuanya sekaligus — seret gambarnya untuk memutar sel. Dari membran di tepi sampai kromatin di dalam inti, semuanya bekerja sebagai satu sistem. Ingat warnanya: jingga selalu mitokondria, biru tua selalu membran sel. Pelajaran berikutnya masuk lebih dalam ke inti sel.",
    },
  ],

  poinKunci: [
    "Membran sel adalah dwilapis fosfolipid yang memilih apa yang boleh keluar-masuk — bukan sekadar pembatas.",
    "Inti sel menyimpan DNA; membran inti terdiri dari dua membran dan berpori, sehingga pesan bisa keluar tanpa DNA aslinya ikut keluar.",
    "Kromatin dan kromosom adalah benda yang sama: DNA terbungkus histon, dalam keadaan longgar atau memadat.",
    "Mitokondria punya DNA sendiri berbentuk lingkaran yang hampir selalu diwariskan dari ibu.",
    "Ribosom tidak bermembran, dan bisa bebas di sitoplasma atau menempel di retikulum endoplasma kasar.",
    "Retikulum endoplasma kasar dan halus adalah satu jaringan bersambung; yang membedakan terutama ada-tidaknya ribosom di permukaannya.",
    "Sel tumbuhan punya dinding sel, kloroplas (yang juga ber-DNA sendiri), dan vakuola pusat yang besar; umumnya tanpa sentriol.",
  ],

  istilah: [
    { id: "Membran sel", en: "cell membrane / plasma membrane", arti: "Dwilapis fosfolipid yang membatasi sel dengan lingkungannya." },
    { id: "Organel", en: "organelle", arti: "Bagian sel dengan tugas khusus, misalnya mitokondria dan badan Golgi." },
    { id: "Sitoplasma", en: "cytoplasm", arti: "Seluruh isi sel di dalam membran, di luar inti: sitosol beserta organelnya." },
    { id: "Sitosol", en: "cytosol", arti: "Bagian cair dari sitoplasma, tanpa menghitung organelnya." },
    { id: "Inti sel", en: "nucleus", arti: "Organel bermembran ganda tempat DNA disimpan." },
    { id: "Membran inti", en: "nuclear envelope", arti: "Dua membran berpori yang membungkus inti." },
    { id: "Pori inti", en: "nuclear pore", arti: "Gerbang pada membran inti tempat RNA keluar dan protein masuk." },
    { id: "Nukleolus", en: "nucleolus", arti: "Wilayah padat di dalam inti tempat ribosom dirakit." },
    { id: "Histon", en: "histone", arti: "Protein tempat DNA melilit di dalam kromatin." },
    { id: "Kromatin", en: "chromatin", arti: "DNA yang terbungkus protein histon." },
    { id: "Krista", en: "cristae", arti: "Lipatan membran dalam mitokondria yang memperluas permukaan kerja." },
    { id: "Retikulum endoplasma", en: "endoplasmic reticulum", arti: "Jaringan kantung dan tabung tempat protein dan lemak diolah." },
    { id: "Badan Golgi", en: "Golgi apparatus", arti: "Tumpukan kantung yang menyempurnakan, melabeli, dan mengirim protein." },
    { id: "Lisosom", en: "lysosome", arti: "Kantung enzim pencerna dengan bagian dalam yang asam." },
    { id: "Peroksisom", en: "peroxisome", arti: "Organel pemecah asam lemak dan penetral hidrogen peroksida." },
    { id: "Sitoskeleton", en: "cytoskeleton", arti: "Rangka serat penjaga bentuk sel dan jalur angkutan organel." },
    {
      id: "Sentriol",
      en: "centriole",
      arti: "Silinder kecil dari mikrotubulus; sepasang sentriol menjadi pusat asal serat gelendong pada sel hewan.",
    },
    { id: "Dinding sel", en: "cell wall", arti: "Lapisan kaku di luar membran sel tumbuhan (dari selulosa), jamur, dan kebanyakan bakteri." },
    { id: "Kloroplas", en: "chloroplast", arti: "Organel fotosintesis pada tumbuhan dan alga; punya DNA sendiri." },
    { id: "Vakuola pusat", en: "central vacuole", arti: "Kantung besar berisi air dan zat pada sel tumbuhan; bisa mengisi hampir seluruh sel." },
  ],

  rujukan: [
    {
      teks: "Alberts B, dkk. Molecular Biology of the Cell, edisi ke-7. W. W. Norton, 2022.",
    },
    {
      teks: "Urry LA, dkk. Campbell Biology, edisi ke-12. Pearson, 2021.",
    },
    {
      teks: "OpenStax Biology 2e — 4.3 Eukaryotic Cells.",
      url: "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells",
    },
    {
      teks: "Nature Scitable — Plant Cells, Chloroplasts, and Cell Walls.",
      url: "https://www.nature.com/scitable/topicpage/plant-cells-chloroplasts-and-cell-walls-14053956/",
    },
    {
      teks: "NCBI Bookshelf — The Cell: A Molecular Approach (Cooper GM)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK9839/",
    },
  ],
};
