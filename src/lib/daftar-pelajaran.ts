import type { Pelajaran } from "./tipe";
import { bagianBagianSel } from "@/konten/0-2-bagian-bagian-sel";

/**
 * Pelajaran yang animasinya sudah jadi dan bisa ditonton.
 *
 * Berkas ini mengimpor naskah lengkap, jadi hanya boleh dipakai oleh halaman
 * yang memang membutuhkannya (halaman pelajaran). Untuk daftar tingkat dan
 * judul saja, pakai src/lib/kurikulum.ts yang jauh lebih ringan.
 */
export const PELAJARAN_SIAP: Pelajaran[] = [bagianBagianSel];

export function cariPelajaran(slug: string): Pelajaran | undefined {
  return PELAJARAN_SIAP.find((p) => p.slug === slug);
}

/** Durasi dan jumlah adegan tiap pelajaran siap, untuk daftar tanpa naskah. */
export const RINGKASAN_SIAP: Record<string, { durasi: number; adegan: number }> =
  Object.fromEntries(
    PELAJARAN_SIAP.map((p) => [
      p.slug,
      {
        durasi: p.adegan.reduce((j, a) => j + a.durasi, 0),
        adegan: p.adegan.length,
      },
    ]),
  );

export { LEVEL, JUMLAH_RENCANA, levelDariSlug, berikutnyaDariSlug } from "./kurikulum";
export type { Butir, Level } from "./kurikulum";
