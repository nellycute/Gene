/**
 * SISTEM WARNA RUANG GENETIKA
 * ===========================
 *
 * Satu-satunya sumber kebenaran untuk warna entitas biologi di seluruh website.
 *
 * Aturan yang tidak boleh dilanggar:
 *   1. Setiap entitas biologi punya SATU warna tetap. Mitokondria di pelajaran 0.2
 *      berwarna sama persis dengan mitokondria di pelajaran 6.4.
 *   2. Warna tidak pernah jadi satu-satunya penanda — selalu ada label teks.
 *   3. Tidak ada warna yang ditulis langsung di dalam komponen animasi.
 *      Semua mengambil dari berkas ini.
 *   4. Antarmuka (tombol, bilah, latar) TIDAK punya warna sendiri — hanya kertas
 *      dan tinta. Jadi setiap warna yang muncul di layar pasti punya arti biologis.
 *      Pengecualiannya cuma tujuh warna tingkat di src/lib/tingkat.ts.
 *
 * Nilai-nilai di bawah adalah hasil keputusan desain 22 September 2026
 * (KEPUTUSAN-DESAIN.md §2): palet lama dicerahkan agar terbaca di atas kertas
 * krem, KECUALI lima basa nitrogen yang sengaja dibiarkan.
 *
 * Nely memegang keputusan akhir. Halaman /peta-warna menampilkan seluruh daftar ini
 * agar mudah ditinjau dan dikoreksi.
 */

export type Entitas = {
  /** Kunci tetap yang dipakai di dalam kode. Jangan diubah sembarangan. */
  id: string;
  /** Nama yang dilihat penonton. */
  nama: string;
  /** Padanan Inggris — wajib ada, mahasiswa perlu siap membaca jurnal. */
  inggris: string;
  /** Warna tetap entitas ini. */
  warna: string;
  /** Penjelasan satu kalimat untuk legenda dan tooltip. */
  keterangan: string;
};

function daftar<T extends Record<string, Omit<Entitas, "id">>>(
  isi: T,
): { [K in keyof T]: Entitas } {
  return Object.fromEntries(
    Object.entries(isi).map(([id, nilai]) => [id, { id, ...nilai }]),
  ) as { [K in keyof T]: Entitas };
}

/* ------------------------------------------------------------------ *
 * STRUKTUR SEL
 * Warna dipilih agar organel yang berdekatan mudah dibedakan, dan agar
 * organel satu keluarga (RE kasar & RE halus) terasa bersaudara.
 * ------------------------------------------------------------------ */

export const SEL = daftar({
  membranSel: {
    nama: "Membran sel",
    inggris: "cell membrane",
    warna: "#1565B8",
    keterangan: "Pembatas sel dengan dunia luar; mengatur apa yang boleh masuk dan keluar.",
  },
  sitoplasma: {
    nama: "Sitoplasma",
    inggris: "cytoplasm",
    warna: "#D6EDF7",
    keterangan: "Seluruh isi sel di luar inti: cairan kental (sitosol) beserta organel di dalamnya.",
  },
  inti: {
    nama: "Inti sel",
    inggris: "nucleus",
    warna: "#8A2FD4",
    keterangan: "Ruang penyimpanan DNA — pusat kendali seluruh kegiatan sel.",
  },
  membranInti: {
    nama: "Membran inti",
    inggris: "nuclear envelope",
    warna: "#B569F0",
    keterangan: "Dua membran berpori yang membungkus inti dan menjaga isinya.",
  },
  nukleolus: {
    nama: "Nukleolus",
    inggris: "nucleolus",
    warna: "#5E1FA3",
    keterangan: "Titik padat di dalam inti tempat ribosom dirakit.",
  },
  kromatin: {
    nama: "Kromatin",
    inggris: "chromatin",
    warna: "#A94FE8",
    keterangan: "DNA yang terbungkus protein histon, tampak seperti benang kusut.",
  },
  mitokondria: {
    nama: "Mitokondria",
    inggris: "mitochondrion",
    warna: "#F4511E",
    keterangan: "Penghasil energi sel; punya DNA sendiri yang diwariskan dari ibu.",
  },
  ribosom: {
    nama: "Ribosom",
    inggris: "ribosome",
    warna: "#E8197A",
    keterangan: "Mesin perakit protein; membaca mRNA kodon demi kodon.",
  },
  reKasar: {
    nama: "Retikulum endoplasma kasar",
    inggris: "rough ER",
    warna: "#009898",
    keterangan: "Jaringan kantung bertabur ribosom; tempat protein dibuat dan dilipat.",
  },
  reHalus: {
    nama: "Retikulum endoplasma halus",
    inggris: "smooth ER",
    warna: "#2FD1B5",
    keterangan: "Tanpa ribosom; membuat lemak dan hormon, serta menetralkan racun.",
  },
  golgi: {
    nama: "Badan Golgi",
    inggris: "Golgi apparatus",
    warna: "#FFB300",
    keterangan: "Kantor pos sel: mengemas dan mengirim protein ke tujuannya.",
  },
  lisosom: {
    nama: "Lisosom",
    inggris: "lysosome",
    warna: "#B01A66",
    keterangan: "Kantung enzim pencerna; membongkar sampah dan bagian sel yang rusak.",
  },
  peroksisom: {
    nama: "Peroksisom",
    inggris: "peroxisome",
    warna: "#7CB518",
    keterangan: "Menetralkan senyawa berbahaya, termasuk hidrogen peroksida.",
  },
  vakuola: {
    nama: "Vakuola",
    inggris: "vacuole",
    warna: "#5BB3F0",
    keterangan: "Kantung penyimpan air dan zat; sangat besar pada sel tumbuhan.",
  },
  sitoskeleton: {
    nama: "Sitoskeleton",
    inggris: "cytoskeleton",
    warna: "#8497A8",
    keterangan: "Rangka serat yang menjaga bentuk sel dan menjadi jalur angkutan.",
  },
  sentriol: {
    nama: "Sentriol",
    inggris: "centriole",
    warna: "#6C4FD8",
    keterangan: "Silinder kecil dari mikrotubulus; sepasang sentriol menjadi pusat asal serat gelendong pada sel hewan.",
  },
  kloroplas: {
    nama: "Kloroplas",
    inggris: "chloroplast",
    warna: "#2EAF4B",
    keterangan: "Pada tumbuhan dan alga: mengubah cahaya matahari menjadi gula; punya DNA sendiri.",
  },
  dindingSel: {
    nama: "Dinding sel",
    inggris: "cell wall",
    warna: "#B79318",
    keterangan: "Lapisan kaku di luar membran sel pada tumbuhan, jamur, dan kebanyakan bakteri; sel hewan tidak punya.",
  },
});

/* ------------------------------------------------------------------ *
 * BASA NITROGEN — JANGAN DIUBAH
 * Memakai palet Okabe-Ito, palet baku yang dirancang agar tetap terbaca
 * oleh penyandang buta warna merah-hijau. Mencerahkannya akan menghancurkan
 * jaminan itu. Kelimanya sengaja tidak ikut dicerahkan saat palet lain
 * diperbarui (KEPUTUSAN-DESAIN.md §2.2).
 *
 * Catatan pedagogi: T dan U sengaja diberi warna bersaudara (jingga-merah
 * dan merah muda) karena keduanya menempati posisi yang sama — T di DNA,
 * U di RNA. Kemiripan warnanya membantu penonton menangkap penggantian itu.
 * ------------------------------------------------------------------ */

export const BASA = daftar({
  A: {
    nama: "Adenin",
    inggris: "adenine",
    warna: "#009E73",
    keterangan: "Basa purin. Berpasangan dengan T (di DNA) atau U (di RNA).",
  },
  T: {
    nama: "Timin",
    inggris: "thymine",
    warna: "#D55E00",
    keterangan: "Basa pirimidin, hanya ada di DNA. Berpasangan dengan A lewat 2 ikatan hidrogen.",
  },
  U: {
    nama: "Urasil",
    inggris: "uracil",
    warna: "#CC79A7",
    keterangan: "Basa pirimidin, hanya ada di RNA. Menggantikan posisi timin.",
  },
  G: {
    nama: "Guanin",
    inggris: "guanine",
    warna: "#E69F00",
    keterangan: "Basa purin. Berpasangan dengan C lewat 3 ikatan hidrogen.",
  },
  C: {
    nama: "Sitosin",
    inggris: "cytosine",
    warna: "#0072B2",
    keterangan: "Basa pirimidin. Berpasangan dengan G lewat 3 ikatan hidrogen.",
  },
});

export type KodeBasa = keyof typeof BASA;

/* ------------------------------------------------------------------ *
 * MOLEKUL DAN MESIN SEL
 * Rangka gula-fosfat dan ikatan hidrogen sengaja tetap kelabu: keduanya
 * adalah RANGKA, bukan tokoh. Kalau ikut dicerahkan, keduanya akan bersaing
 * dengan basa yang menempel di atasnya.
 * ------------------------------------------------------------------ */

export const MOLEKUL = daftar({
  dna: {
    nama: "DNA",
    inggris: "DNA",
    warna: "#1372D6",
    keterangan: "Untai ganda pembawa seluruh instruksi kehidupan.",
  },
  rna: {
    nama: "RNA",
    inggris: "RNA",
    warna: "#FF8A1F",
    keterangan: "Untai tunggal; salinan kerja dari sepotong DNA.",
  },
  protein: {
    nama: "Protein",
    inggris: "protein",
    warna: "#3DA832",
    keterangan: "Hasil akhir penerjemahan; pelaksana hampir semua tugas di dalam sel.",
  },
  enzim: {
    nama: "Enzim",
    inggris: "enzyme",
    warna: "#9251F5",
    keterangan: "Protein khusus yang mempercepat reaksi kimia.",
  },
  asamAmino: {
    nama: "Asam amino",
    inggris: "amino acid",
    warna: "#E3AE00",
    keterangan: "Batu bata penyusun protein; ada 20 jenis pada makhluk hidup.",
  },
  gulaFosfat: {
    nama: "Rangka gula-fosfat",
    inggris: "sugar-phosphate backbone",
    warna: "#7A8899",
    keterangan: "Tulang punggung untai DNA tempat basa menempel. Rangka RNA digambar dengan warna RNA agar kedua untai tak tertukar.",
  },
  ikatanHidrogen: {
    nama: "Ikatan hidrogen",
    inggris: "hydrogen bond",
    warna: "#AFBAC6",
    keterangan: "Ikatan lemah yang menyatukan pasangan basa; mudah dibuka saat disalin.",
  },
});

/* ------------------------------------------------------------------ *
 * ISI INTI DAN KROMOSOM
 * Dipakai mulai pelajaran 0.3. Kromosom memakai warna KROMATIN karena
 * keduanya benda yang sama dalam dua keadaan — pelajaran 0.2 menegaskan itu.
 *
 * Pasangan homolog butuh dua warna agar pindah silang (crossing over)
 * terlihat sebagai tukar warna. Kromosom dari IBU memakai warna kromatin
 * (SEL.kromatin) — tidak dibuat entitas baru agar satu warna tetap satu
 * entitas. Kromosom dari AYAH mendapat warna sendiri: toska.
 * Aturan pengaman: toska ini dekat dengan RE kasar (#009898), tapi retikulum
 * endoplasma tidak pernah tampil dalam adegan pembelahan sel — dan label
 * "dari ayah" selalu menyertainya.
 *
 * Serat gelendong (spindle) TIDAK punya entitas sendiri: ia mikrotubulus,
 * jadi memakai warna sitoskeleton dengan label "serat gelendong".
 * ------------------------------------------------------------------ */

export const INTI = daftar({
  histon: {
    nama: "Histon",
    inggris: "histone",
    warna: "#A0785A",
    keterangan: "Protein gulungan tempat DNA melilit; delapan histon + DNA = satu nukleosom.",
  },
  kromosomAyah: {
    nama: "Kromosom dari ayah",
    inggris: "paternal chromosome",
    warna: "#1EA7A0",
    keterangan: "Pasangan homolog dari kromosom ibu (yang memakai warna kromatin); berbeda warna agar pindah silang terlihat.",
  },
  sentromer: {
    nama: "Sentromer",
    inggris: "centromere",
    warna: "#3F2A6E",
    keterangan: "Pinggang kromosom tempat dua kromatid saudara menempel dan serat gelendong menarik.",
  },
  telomer: {
    nama: "Telomer",
    inggris: "telomere",
    warna: "#F48FB1",
    keterangan: "Tudung pelindung di kedua ujung kromosom; memendek setiap kali sel membelah.",
  },
});

/* ------------------------------------------------------------------ *
 * PERINGATAN: TIGA JINGGA YANG BERDEKATAN
 * Setelah dicerahkan, mitokondria (#F4511E), RNA (#FF8A1F), dan basa T
 * (#D55E00) berada di rona yang sama. Aturan pengamannya:
 *   - Mitokondria dan RNA tidak pernah tampil menyala bersamaan dalam satu
 *     adegan; salah satunya diredupkan lewat mekanisme `sorot`.
 *   - Basa T selalu muncul dalam deret berhuruf, jadi hurufnya membedakan.
 * Halaman /peta-warna menampilkan ketiganya berdampingan untuk ditinjau.
 * ------------------------------------------------------------------ */

export const TIGA_JINGGA = [SEL.mitokondria, MOLEKUL.rna, BASA.T] as const;

/* ------------------------------------------------------------------ *
 * PENCARIAN WARNA
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * SIFAT YANG TAMPAK (FENOTIP) — mulai Tingkat 2
 * Warna alami makhluk percobaan pewarisan (kacang ercis Mendel, dan
 * seterusnya). Sama di setiap pelajaran, supaya "biji kuning" di 2.2 sama
 * dengan "biji kuning" di 2.6. Bijih kuning dekat dengan kuning asam amino;
 * keduanya tidak pernah tampil di adegan yang sama tanpa label.
 * ------------------------------------------------------------------ */

export const SIFAT = daftar({
  tanaman: {
    nama: "Daun dan batang",
    inggris: "leaf and stem",
    warna: "#93B171",
    keterangan: "Tubuh tanaman percobaan; hijau redup agar tidak tertukar dengan kloroplas.",
  },
  bijiKuning: {
    nama: "Biji kuning",
    inggris: "yellow seed",
    warna: "#E6C84F",
    keterangan: "Warna biji ercis yang dominan (alel Y).",
  },
  bijiHijau: {
    nama: "Biji hijau",
    inggris: "green seed",
    warna: "#8DB84A",
    keterangan: "Warna biji ercis yang resesif (yy).",
  },
  bungaUngu: {
    nama: "Bunga ungu",
    inggris: "purple flower",
    warna: "#9E5A9C",
    keterangan: "Warna bunga ercis yang dominan (alel P).",
  },
  bungaPutih: {
    nama: "Bunga putih",
    inggris: "white flower",
    warna: "#F4F0E6",
    keterangan: "Warna bunga ercis yang resesif (pp).",
  },
  polongHijau: {
    nama: "Polong hijau",
    inggris: "green pod",
    warna: "#6FA544",
    keterangan: "Warna polong ercis yang dominan.",
  },
  polongKuning: {
    nama: "Polong kuning",
    inggris: "yellow pod",
    warna: "#D9C45E",
    keterangan: "Warna polong ercis yang resesif.",
  },
  bungaMerah: {
    nama: "Bunga merah",
    inggris: "red flower",
    warna: "#D8434E",
    keterangan: "Bunga pukul empat (Mirabilis) homozigot merah — Tingkat 3.",
  },
  bungaMerahMuda: {
    nama: "Bunga merah muda",
    inggris: "pink flower",
    warna: "#EFA0AE",
    keterangan: "Heterozigot pada dominansi tidak sempurna — Tingkat 3.",
  },
  /* bulu hewan — satu warna bulu = satu warna tetap, apa pun hewannya */
  buluHitam: {
    nama: "Bulu hitam",
    inggris: "black coat",
    warna: "#2F2A28",
    keterangan: "Bulu hitam: sapi Angus (dominan), tikus hitam, ujung tubuh kelinci himalaya.",
  },
  buluMerah: {
    nama: "Bulu merah",
    inggris: "red coat",
    warna: "#8E3B2B",
    keterangan: "Bulu merah kecokelatan: sapi Angus merah (resesif), sapi Shorthorn merah.",
  },
  buluPutih: {
    nama: "Bulu putih",
    inggris: "white coat",
    warna: "#F2EEE6",
    keterangan: "Bulu putih: sapi Shorthorn putih, ayam, kelinci dan tikus albino.",
  },
  buluKuning: {
    nama: "Bulu kuning",
    inggris: "yellow coat",
    warna: "#D9A441",
    keterangan: "Bulu tikus kuning (alel letal Aʸ) — Tingkat 3.",
  },
  buluAgouti: {
    nama: "Bulu agouti",
    inggris: "agouti coat",
    warna: "#7F6650",
    keterangan: "Warna liar abu-cokelat: tiap helai berpita gelap-terang (tikus, kelinci).",
  },
  buluChinchilla: {
    nama: "Bulu chinchilla",
    inggris: "chinchilla coat",
    warna: "#A3A4A6",
    keterangan: "Kelinci chinchilla: kelabu keperakan (alel cᶜʰ).",
  },
  mataAlbino: {
    nama: "Mata albino",
    inggris: "albino eye",
    warna: "#C95F6B",
    keterangan: "Mata merah muda hewan albino: pembuluh darah terlihat karena tak ada pigmen.",
  },
  buluMahoni: {
    nama: "Bulu mahoni",
    inggris: "mahogany coat",
    warna: "#5B2A22",
    keterangan: "Merah kecokelatan tua pada sapi Ayrshire jantan (dipengaruhi kelamin).",
  },
  tubuhLalat: {
    nama: "Tubuh lalat liar",
    inggris: "wild-type body",
    warna: "#B39466",
    keterangan: "Lalat buah tipe liar: tubuh abu-abu kecokelatan (b⁺).",
  },
  tubuhHitam: {
    nama: "Tubuh lalat hitam",
    inggris: "black body",
    warna: "#2B2624",
    keterangan: "Lalat buah mutan hitam (b), resesif.",
  },
  mataLalat: {
    nama: "Mata merah lalat",
    inggris: "red eye",
    warna: "#B8322A",
    keterangan: "Mata merah lalat buah tipe liar.",
  },
  kulitSemangka: {
    nama: "Kulit semangka",
    inggris: "watermelon rind",
    warna: "#3F7F3A",
    keterangan: "Kulit buah semangka bergaris hijau tua — Tingkat 5 (poliploidi).",
  },
  dagingSemangka: {
    nama: "Daging semangka",
    inggris: "watermelon flesh",
    warna: "#E0555A",
    keterangan: "Daging buah semangka yang merah.",
  },
  bijiSemangka: {
    nama: "Biji semangka",
    inggris: "watermelon seed",
    warna: "#2B2624",
    keterangan: "Biji semangka diploid; tidak berkembang pada semangka triploid.",
  },
  jengger: {
    nama: "Jengger",
    inggris: "comb",
    warna: "#CF4A40",
    keterangan: "Jengger dan pial ayam; bentuknya (rose, pea, walnut, single) yang diwariskan.",
  },
  labuPutih: {
    nama: "Labu putih",
    inggris: "white squash",
    warna: "#ECE7D6",
    keterangan: "Buah labu putih — alel W menghalangi pigmen (epistasis dominan).",
  },
  labuKuning: {
    nama: "Labu kuning",
    inggris: "yellow squash",
    warna: "#E3B634",
    keterangan: "Buah labu kuning (ww Y_).",
  },
  labuHijau: {
    nama: "Labu hijau",
    inggris: "green squash",
    warna: "#5E8C3A",
    keterangan: "Buah labu hijau (ww yy).",
  },
  gandum0: {
    nama: "Biji gandum putih",
    inggris: "white wheat kernel",
    warna: "#EBDDB8",
    keterangan: "Tanpa alel R: putih (polimeri gandum Nilsson-Ehle).",
  },
  gandum1: {
    nama: "Biji gandum merah muda",
    inggris: "light red wheat kernel",
    warna: "#DDB285",
    keterangan: "Satu alel R.",
  },
  gandum2: {
    nama: "Biji gandum merah sedang",
    inggris: "medium red wheat kernel",
    warna: "#C98B5E",
    keterangan: "Dua alel R.",
  },
  gandum3: {
    nama: "Biji gandum merah",
    inggris: "red wheat kernel",
    warna: "#AE6641",
    keterangan: "Tiga alel R.",
  },
  gandum4: {
    nama: "Biji gandum merah tua",
    inggris: "dark red wheat kernel",
    warna: "#8A4429",
    keterangan: "Empat alel R: merah paling tua.",
  },
});

/* ------------------------------------------------------------------ *
 * DARAH — golongan darah (Tingkat 3 ke atas)
 * Sel darah merah netral kemerahan; antigen dibedakan warna DAN bentuk
 * (A bulat, B kotak, M kerucut, N cincin) supaya warna bukan satu-satunya
 * penanda. Antibodi adalah protein, jadi memakai warna protein.
 * ------------------------------------------------------------------ */

export const DARAH = daftar({
  selDarahMerah: {
    nama: "Sel darah merah",
    inggris: "red blood cell",
    warna: "#D9867C",
    keterangan: "Cakram cekung dua sisi; antigen golongan darah menempel di permukaannya.",
  },
  antigenA: {
    nama: "Antigen A",
    inggris: "A antigen",
    warna: "#3F6FD0",
    keterangan: "Dibuat oleh alel Iᴬ. Digambar sebagai bulatan.",
  },
  antigenB: {
    nama: "Antigen B",
    inggris: "B antigen",
    warna: "#E08A2E",
    keterangan: "Dibuat oleh alel Iᴮ. Digambar sebagai kotak.",
  },
  antigenM: {
    nama: "Antigen M",
    inggris: "M antigen",
    warna: "#2F9C8E",
    keterangan: "Golongan darah MN (kodominan). Digambar sebagai kerucut.",
  },
  antigenN: {
    nama: "Antigen N",
    inggris: "N antigen",
    warna: "#B8559B",
    keterangan: "Golongan darah MN (kodominan). Digambar sebagai cincin.",
  },
  antibodi: {
    nama: "Antibodi",
    inggris: "antibody",
    warna: "#3DA832",
    keterangan: "Protein berbentuk Y yang mengikat antigen asing — warnanya warna protein.",
  },
});

export const SEMUA_ENTITAS: Record<string, Entitas> = {
  ...SEL,
  ...INTI,
  ...MOLEKUL,
  ...SIFAT,
  ...DARAH,
  ...Object.fromEntries(
    Object.entries(BASA).map(([kode, e]) => [`basa${kode}`, e]),
  ),
};

/** Ambil warna sebuah entitas dari id-nya. Aman dipakai di mana saja. */
export function warnaDari(id: string, cadangan = "#8497A8"): string {
  return SEMUA_ENTITAS[id]?.warna ?? cadangan;
}

/* Istilah yang namanya tidak persis sama dengan nama entitasnya. */
const ALIAS_ISTILAH: Record<string, string> = {
  /* kromosom dan kromatin benda yang sama, jadi warnanya pun sama —
     BUKAN toska "Kromosom dari ayah" walau awal namanya mirip */
  kromosom: "kromatin",
  "retikulum endoplasma": "reKasar",
  sitosol: "sitoplasma",
};

/**
 * Entitas yang dimaksud sebuah istilah di Catatan ("Vakuola pusat" → vakuola,
 * "DNA mitokondria" → DNA). Dipakai untuk sorotan lembut di Catatan
 * (25 Sep 2026): istilah organel dan molekul memakai warna tetapnya sendiri.
 * Istilah yang bukan entitas (Gen, Genetika, Mikrometer) → undefined.
 */
export function entitasDariIstilah(istilah: string): Entitas | undefined {
  const t = istilah.trim().toLowerCase();
  const alias = ALIAS_ISTILAH[t];
  if (alias) return SEMUA_ENTITAS[alias];
  let terbaik: Entitas | undefined;
  for (const e of Object.values(SEMUA_ENTITAS)) {
    const nama = e.nama.toLowerCase();
    if (t === nama) return e;
    if (t.startsWith(`${nama} `) && (!terbaik || nama.length > terbaik.nama.length)) terbaik = e;
  }
  return terbaik;
}

/**
 * Turunan satu rona untuk ilustrasi "datar berisi" (KEPUTUSAN-DESAIN.md §3):
 * warna asli, satu tingkat lebih terang, satu tingkat lebih gelap.
 * Tidak pernah mendekati putih atau hitam — itulah yang menjaga warna tetap
 * dikenali walau diberi gradasi.
 */
export function ronaTerang(hex: string, porsi = 0.18): string {
  return campur(hex, "#FFFFFF", porsi);
}

export function ronaGelap(hex: string, porsi = 0.14): string {
  return campur(hex, "#000000", porsi);
}

function campur(a: string, b: string, porsi: number): string {
  const [r1, g1, b1] = keRGB(a);
  const [r2, g2, b2] = keRGB(b);
  const r = Math.round(r1 + (r2 - r1) * porsi);
  const g = Math.round(g1 + (g2 - g1) * porsi);
  const bl = Math.round(b1 + (b2 - b1) * porsi);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function keRGB(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Kelompok untuk halaman Peta Warna. */
export const KELOMPOK_WARNA = [
  {
    judul: "Struktur sel",
    catatan:
      "Dipakai di Level 0. Organel satu keluarga sengaja diberi warna bersaudara — retikulum endoplasma kasar dan halus, misalnya.",
    isi: Object.values(SEL),
  },
  {
    judul: "Isi inti dan kromosom",
    catatan:
      "Dipakai mulai pelajaran 0.3. Kromosom memakai warna kromatin karena keduanya benda yang sama. Kromosom dari ayah diberi toska agar pindah silang terlihat sebagai tukar warna; retikulum endoplasma tidak pernah tampil di adegan yang sama.",
    isi: Object.values(INTI),
  },
  {
    judul: "Basa nitrogen",
    catatan:
      "Memakai palet Okabe-Ito yang dirancang agar tetap terbaca oleh penyandang buta warna. Timin dan urasil sengaja bersaudara karena menempati posisi yang sama. Kelimanya tidak ikut dicerahkan saat palet lain diperbarui.",
    isi: Object.values(BASA),
  },
  {
    judul: "Molekul dan mesin sel",
    catatan:
      "Dipakai mulai Level 1 ke atas. Rangka gula-fosfat dan ikatan hidrogen sengaja kelabu — keduanya rangka, bukan tokoh. Rangka untai RNA memakai jingga RNA, sehingga saat transkripsi untai DNA (kelabu) dan RNA (jingga) langsung terbedakan. Semua enzim memakai satu ungu dan dibedakan lewat bentuk serta labelnya.",
    isi: Object.values(MOLEKUL),
  },
  {
    judul: "Sifat yang tampak",
    catatan:
      "Dipakai mulai Tingkat 2: warna alami biji, bunga, dan polong pada persilangan. Satu sifat = satu warna tetap di semua pelajaran pewarisan. Selalu disertai label sifat dan huruf alelnya.",
    isi: Object.values(SIFAT),
  },
  {
    judul: "Golongan darah",
    catatan:
      "Dipakai mulai Tingkat 3. Antigen dibedakan warna dan bentuk sekaligus: A bulat, B kotak, M kerucut, N cincin. Antibodi adalah protein dan memakai warna protein.",
    isi: Object.values(DARAH),
  },
] as const;
