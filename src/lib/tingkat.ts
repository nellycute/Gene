/**
 * TUJUH WARNA TINGKAT
 * ===================
 *
 * Satu-satunya warna yang boleh dimiliki antarmuka. Di sinilah gambar referensi
 * Nely hidup: strip warna pelangi yang jenuh dan cerah, urut dari Level 0 sampai 6.
 *
 * Aturan pemakaian — ketat (KEPUTUSAN-DESAIN.md §1.5):
 *   1. Hanya boleh muncul sebagai: batang tegak 4 px, bingkai baris yang sedang
 *      terbuka (1,5 px), label mono kecil (TINGKAT 3), titik penanda pada tombol
 *      kembali, dan tujuh strip pada logo.
 *   2. TIDAK PERNAH jadi latar blok besar, tidak pernah jadi warna tombol, tidak
 *      pernah masuk ke dalam panggung animasi.
 *   3. `teks` dipakai kalau warnanya jadi tulisan — versi `batang` terlalu terang
 *      untuk dibaca di atas kertas.
 *
 * Karena warnanya tipis dan selalu di pinggir, tidak ada satu pun yang bisa
 * disangka warna organel.
 */

export type WarnaTingkat = {
  nomor: number;
  /** Warna batang, bingkai, titik, dan strip logo. */
  batang: string;
  /** Warna yang aman dibaca sebagai tulisan di atas kertas. */
  teks: string;
};

export const TINGKAT: readonly WarnaTingkat[] = [
  { nomor: 0, batang: "#2E9E4B", teks: "#1F7A37" },
  { nomor: 1, batang: "#A8BE1E", teks: "#6B7A0E" },
  { nomor: 2, batang: "#E8A600", teks: "#8A6400" },
  { nomor: 3, batang: "#F05423", teks: "#B33C11" },
  { nomor: 4, batang: "#D6156B", teks: "#A81053" },
  { nomor: 5, batang: "#7B2E8E", teks: "#6B2880" },
  { nomor: 6, batang: "#1E7FC4", teks: "#17629A" },
] as const;

/** Warna untuk sebuah nomor tingkat. Aman dipanggil dengan nomor apa pun. */
export function warnaTingkat(nomor: number): WarnaTingkat {
  return TINGKAT[nomor] ?? TINGKAT[0];
}

/**
 * Tinggi tiap strip pada logo, bervariasi 11–20 px agar tidak terlihat seperti
 * diagram batang. Urutannya mengikuti tingkat 0→6.
 */
export const TINGGI_STRIP_LOGO = [14, 20, 11, 17, 13, 19, 15] as const;
