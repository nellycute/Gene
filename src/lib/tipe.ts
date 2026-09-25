/**
 * Bentuk data sebuah pelajaran.
 *
 * Satu pelajaran = rangkaian ADEGAN. Tiap adegan punya narasi, lama tayang,
 * dan daftar bagian yang disorot. Pemutar Pelajaran menjalankan adegan satu
 * per satu — persis seperti video, tapi seluruhnya digambar oleh kode.
 */

export type Tingkat = "Dasar" | "Menengah" | "Lanjut";

/** Kunci animasi yang tersedia. Daftarnya (komponen datar + 3D) ada di src/animasi/daftar.ts. */
export type KunciAnimasi =
  | "pengantar"
  | "sel-hewan"
  | "perbesaran"
  | "inti-sel"
  | "kromosom"
  | "pembelahan";

/**
 * Isyarat di tengah adegan: begitu `kata` tampil di subtitel, gambar ikut
 * berubah — kamera menuju bagian lain, sorotan berganti, atau set berganti.
 * Inilah yang membuat gambar bergerak seirama narasi, bukan berganti per slide.
 */
export type Isyarat = {
  /** Potongan kalimat di narasi adegan ini (tidak peka huruf besar-kecil). */
  kata: string;
  /** Sudut pandang kamera yang dituju — kuncinya dimengerti komponen gambar. */
  fokus?: string;
  /** Ganti sorotan mulai saat ini. */
  sorot?: string[];
  /** Ganti set/tahap gambar mulai saat ini. */
  tahap?: string;
  /** Tulisan di lencana panggung, untuk benda yang tidak punya entitas warna. */
  label?: string;
};

/**
 * Rekaman narasi satu adegan. Dibuat oleh `npm run suara` (alat/buat-suara.mjs)
 * dan dipasang otomatis di src/lib/daftar-pelajaran.ts — tidak ditulis tangan.
 */
export type SuaraAdegan = {
  /** Alamat berkas mp3 di folder public. */
  berkas: string;
  /** Lama rekaman, detik. */
  durasi: number;
  /** Setiap kata yang diucapkan: [posisi huruf di narasi, detik mulai di rekaman]. */
  kata: [number, number][];
};

export type Adegan = {
  /** Kunci unik di dalam pelajaran ini. */
  id: string;

  /**
   * Lama adegan dalam detik — dipakai hanya selama adegan ini belum punya
   * rekaman suara. Begitu ada, lama rekaman yang menentukan (lihat lamaAdegan).
   */
  durasi: number;

  /**
   * Naskah narasi. Satu teks ini dipakai tiga kali sekaligus:
   * jadi subtitel di layar, jadi naskah untuk suara, dan jadi teks yang
   * dibaca mesin pencari Google.
   */
  narasi: string;

  /** Tajuk kecil yang muncul di pojok layar animasi. */
  tajuk?: string;

  /** Id entitas dari src/lib/warna.ts yang disorot pada adegan ini. */
  sorot?: string[];

  /**
   * Tahap gambar yang ditampilkan — kunci bebas yang dimengerti komponen
   * animasi pelajaran ini (misal "jaringan", "metafase"). Kalau kosong,
   * animasi menampilkan tahap bawaannya.
   */
  tahap?: string;

  /** Sudut pandang kamera awal adegan (gambar 3D). Kosong = diturunkan dari sorot/tahap. */
  fokus?: string;

  /** Perubahan gambar di tengah adegan, mengikuti subtitel. */
  isyarat?: Isyarat[];

  /**
   * "3d" = adegan ini memakai tampilan tiga dimensi yang bisa diputar.
   * Hanya perlu untuk gambar yang belum seluruhnya 3D; gambar yang sudah dibuat
   * ulang dalam gaya 3D bergaris memakai 3D di semua adegan (`tiga: "semua"` di
   * src/animasi/daftar.tsx, KEPUTUSAN-DESAIN.md §3). Mesin 3D dimuat hanya saat
   * pelajaran dibuka.
   */
  tampilan?: "3d";

  /** Rekaman narasi — dipasang otomatis, jangan diisi di berkas naskah. */
  suara?: SuaraAdegan;
};

export type Istilah = {
  /** Istilah dalam bahasa Indonesia. */
  id: string;
  /** Padanan Inggrisnya — wajib, agar siap membaca jurnal. */
  en: string;
  /** Penjelasan satu kalimat. */
  arti: string;
};

export type Rujukan = {
  teks: string;
  url?: string;
};

export type Pelajaran = {
  /** Bagian alamat web, contoh: "bagian-bagian-sel". */
  slug: string;
  /** Nomor urut kurikulum, contoh: "0.2". */
  nomor: string;
  level: number;
  judul: string;
  /** Satu kalimat untuk kartu di halaman depan dan untuk Google. */
  ringkas: string;
  tingkat: Tingkat;

  /** Animasi mana yang dipakai pelajaran ini — kuncinya ada di src/animasi/daftar.ts. */
  animasi: KunciAnimasi;

  adegan: Adegan[];

  /** Poin yang ditampilkan setelah pelajaran selesai. */
  poinKunci: string[];

  istilah: Istilah[];
  rujukan: Rujukan[];

  /** Tanggal Nely terakhir memeriksa akurasi isinya. */
  ditinjau?: string;

  /** Belum ditinjau Nely = tampil peringatan di halaman. */
  draf?: boolean;
};

/** Jeda sebelum suara adegan mulai — memberi waktu gambar berpindah lebih dulu. */
export const JEDA_AWAL = 0.5;
/** Jeda setelah rekaman habis (rekaman sendiri sudah berekor hening ± 0,9 detik). */
export const JEDA_AKHIR = 0.9;

/** Lama tayang satu adegan, detik: mengikuti rekaman suaranya bila ada. */
export function lamaAdegan(a: Adegan): number {
  return a.suara ? JEDA_AWAL + a.suara.durasi + JEDA_AKHIR : a.durasi;
}

/** Total durasi sebuah pelajaran dalam detik. */
export function totalDurasi(p: Pelajaran): number {
  return p.adegan.reduce((jumlah, a) => jumlah + lamaAdegan(a), 0);
}

/** Ubah detik jadi tulisan "6 menit" atau "4 mnt 30 dtk". */
export function formatDurasi(detik: number): string {
  const menit = Math.floor(detik / 60);
  const sisa = Math.round(detik % 60);
  if (menit === 0) return `${sisa} detik`;
  if (sisa === 0) return `${menit} menit`;
  return `${menit} mnt ${sisa} dtk`;
}

/** Versi ringkas untuk baris daftar: "7 mnt", "12 mnt", "45 dtk". */
export function formatDurasiRingkas(detik: number): string {
  const menit = Math.round(detik / 60);
  if (menit === 0) return `${Math.round(detik)} dtk`;
  return `${menit} mnt`;
}

/** Ubah detik jadi penanda waktu 0:00 untuk pemutar. */
export function jam(detik: number): string {
  const m = Math.floor(detik / 60);
  const d = Math.floor(detik % 60);
  return `${m}:${d.toString().padStart(2, "0")}`;
}
