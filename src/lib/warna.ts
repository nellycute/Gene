/**
 * SISTEM WARNA RUANG GENETIKA
 * ===========================
 *
 * Satu-satunya sumber kebenaran untuk warna seluruh website.
 *
 * Aturan yang tidak boleh dilanggar:
 *   1. Setiap entitas biologi punya SATU warna tetap. Mitokondria di pelajaran 0.2
 *      berwarna sama persis dengan mitokondria di pelajaran 6.4.
 *   2. Warna tidak pernah jadi satu-satunya penanda — selalu ada label teks.
 *   3. Tidak ada warna yang ditulis langsung di dalam komponen animasi.
 *      Semua mengambil dari berkas ini.
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
    warna: "#2C5F8A",
    keterangan: "Pembatas sel dengan dunia luar; mengatur apa yang boleh masuk dan keluar.",
  },
  sitoplasma: {
    nama: "Sitoplasma",
    inggris: "cytoplasm",
    warna: "#CFE0E8",
    keterangan: "Cairan kental tempat seluruh organel mengapung dan bekerja.",
  },
  inti: {
    nama: "Inti sel",
    inggris: "nucleus",
    warna: "#7B4BA8",
    keterangan: "Ruang penyimpanan DNA — pusat kendali seluruh kegiatan sel.",
  },
  membranInti: {
    nama: "Membran inti",
    inggris: "nuclear envelope",
    warna: "#A585C9",
    keterangan: "Selaput ganda berpori yang membungkus inti dan menjaga isinya.",
  },
  nukleolus: {
    nama: "Nukleolus",
    inggris: "nucleolus",
    warna: "#4E2C74",
    keterangan: "Titik padat di dalam inti tempat ribosom dirakit.",
  },
  kromatin: {
    nama: "Kromatin",
    inggris: "chromatin",
    warna: "#9B6FC4",
    keterangan: "DNA yang terbungkus protein histon, tampak seperti benang kusut.",
  },
  mitokondria: {
    nama: "Mitokondria",
    inggris: "mitochondrion",
    warna: "#E2603B",
    keterangan: "Penghasil energi sel; punya DNA sendiri yang diwariskan dari ibu.",
  },
  ribosom: {
    nama: "Ribosom",
    inggris: "ribosome",
    warna: "#E0457B",
    keterangan: "Mesin perakit protein; membaca mRNA kodon demi kodon.",
  },
  reKasar: {
    nama: "Retikulum endoplasma kasar",
    inggris: "rough ER",
    warna: "#2F8F8F",
    keterangan: "Jaringan kantung bertabur ribosom; tempat protein dibuat dan dilipat.",
  },
  reHalus: {
    nama: "Retikulum endoplasma halus",
    inggris: "smooth ER",
    warna: "#63BFB0",
    keterangan: "Tanpa ribosom; mengurus lemak, hormon, dan penawar racun.",
  },
  golgi: {
    nama: "Badan Golgi",
    inggris: "Golgi apparatus",
    warna: "#E0A32E",
    keterangan: "Kantor pos sel: mengemas dan mengirim protein ke tujuannya.",
  },
  lisosom: {
    nama: "Lisosom",
    inggris: "lysosome",
    warna: "#8B3A62",
    keterangan: "Kantung enzim pencerna; membongkar sampah dan bagian sel yang rusak.",
  },
  peroksisom: {
    nama: "Peroksisom",
    inggris: "peroxisome",
    warna: "#7FA650",
    keterangan: "Menetralkan senyawa berbahaya, termasuk hidrogen peroksida.",
  },
  vakuola: {
    nama: "Vakuola",
    inggris: "vacuole",
    warna: "#86B8DC",
    keterangan: "Kantung penyimpan air dan zat; sangat besar pada sel tumbuhan.",
  },
  sitoskeleton: {
    nama: "Sitoskeleton",
    inggris: "cytoskeleton",
    warna: "#94A3B3",
    keterangan: "Rangka serat yang menjaga bentuk sel dan menjadi jalur angkutan.",
  },
  sentriol: {
    nama: "Sentriol",
    inggris: "centriole",
    warna: "#6E5C93",
    keterangan: "Sepasang silinder yang menarik kromosom saat sel membelah.",
  },
  kloroplas: {
    nama: "Kloroplas",
    inggris: "chloroplast",
    warna: "#4A9D5B",
    keterangan: "Khusus sel tumbuhan: mengubah cahaya matahari menjadi gula.",
  },
  dindingSel: {
    nama: "Dinding sel",
    inggris: "cell wall",
    warna: "#9C8A4E",
    keterangan: "Khusus sel tumbuhan: lapisan kaku di luar membran sel.",
  },
});

/* ------------------------------------------------------------------ *
 * BASA NITROGEN
 * Memakai palet Okabe-Ito, palet baku yang dirancang agar tetap terbaca
 * oleh penyandang buta warna merah-hijau.
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
 * ------------------------------------------------------------------ */

export const MOLEKUL = daftar({
  dna: {
    nama: "DNA",
    inggris: "DNA",
    warna: "#2F6DB0",
    keterangan: "Untai ganda pembawa seluruh instruksi kehidupan.",
  },
  rna: {
    nama: "RNA",
    inggris: "RNA",
    warna: "#E07B39",
    keterangan: "Untai tunggal; salinan kerja dari sepotong DNA.",
  },
  protein: {
    nama: "Protein",
    inggris: "protein",
    warna: "#5B9E4A",
    keterangan: "Hasil akhir penerjemahan; pelaksana hampir semua tugas di dalam sel.",
  },
  enzim: {
    nama: "Enzim",
    inggris: "enzyme",
    warna: "#8E6BBF",
    keterangan: "Protein khusus yang mempercepat reaksi kimia.",
  },
  asamAmino: {
    nama: "Asam amino",
    inggris: "amino acid",
    warna: "#C9A227",
    keterangan: "Batu bata penyusun protein; ada 20 jenis pada makhluk hidup.",
  },
  gulaFosfat: {
    nama: "Rangka gula-fosfat",
    inggris: "sugar-phosphate backbone",
    warna: "#7A8899",
    keterangan: "Tulang punggung untai DNA dan RNA tempat basa menempel.",
  },
  ikatanHidrogen: {
    nama: "Ikatan hidrogen",
    inggris: "hydrogen bond",
    warna: "#AFBAC6",
    keterangan: "Ikatan lemah yang menyatukan pasangan basa; mudah dibuka saat disalin.",
  },
});

/* ------------------------------------------------------------------ *
 * PENCARIAN WARNA
 * ------------------------------------------------------------------ */

export const SEMUA_ENTITAS: Record<string, Entitas> = {
  ...SEL,
  ...MOLEKUL,
  ...Object.fromEntries(
    Object.entries(BASA).map(([kode, e]) => [`basa${kode}`, e]),
  ),
};

/** Ambil warna sebuah entitas dari id-nya. Aman dipakai di mana saja. */
export function warnaDari(id: string, cadangan = "#94A3B3"): string {
  return SEMUA_ENTITAS[id]?.warna ?? cadangan;
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
    judul: "Basa nitrogen",
    catatan:
      "Memakai palet Okabe-Ito yang dirancang agar tetap terbaca oleh penyandang buta warna. Timin dan urasil sengaja bersaudara karena menempati posisi yang sama.",
    isi: Object.values(BASA),
  },
  {
    judul: "Molekul dan mesin sel",
    catatan: "Dipakai mulai Level 1 ke atas.",
    isi: Object.values(MOLEKUL),
  },
] as const;
