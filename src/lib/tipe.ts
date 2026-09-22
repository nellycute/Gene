/**
 * Bentuk data sebuah pelajaran.
 *
 * Satu pelajaran = rangkaian ADEGAN. Tiap adegan punya narasi, lama tayang,
 * dan daftar bagian yang disorot. Pemutar Pelajaran menjalankan adegan satu
 * per satu — persis seperti video, tapi seluruhnya digambar oleh kode.
 */

export type Tingkat = "Dasar" | "Menengah" | "Lanjut";

export type Adegan = {
  /** Kunci unik di dalam pelajaran ini. */
  id: string;

  /**
   * Lama adegan dalam detik.
   * Dipakai selama narasi suara belum ada. Begitu berkas audio dipasang,
   * lama audio yang menentukan.
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
   * "3d" = adegan ini memakai tampilan tiga dimensi yang bisa diputar.
   * Hanya untuk enam pelajaran yang bentuk ruangnya memang diajarkan
   * (KEPUTUSAN-DESAIN.md §3). Mesin 3D dimuat hanya saat pelajaran dibuka.
   */
  tampilan?: "3d";

  /** Berkas narasi suara, relatif terhadap /public. Diisi menyusul. */
  audio?: string;
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

  /** Animasi mana yang dipakai pelajaran ini. */
  animasi: "sel-hewan";

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

/** Total durasi sebuah pelajaran dalam detik. */
export function totalDurasi(p: Pelajaran): number {
  return p.adegan.reduce((jumlah, a) => jumlah + a.durasi, 0);
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
