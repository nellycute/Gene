import type { Pelajaran } from "./tipe";
import { selUnitKehidupan } from "@/konten/0-1-sel-unit-kehidupan";
import { bagianBagianSel } from "@/konten/0-2-bagian-bagian-sel";
import { intiSel } from "@/konten/0-3-inti-sel";
import { kromosom } from "@/konten/0-4-kromosom";
import { mitosisMeiosis } from "@/konten/0-5-mitosis-meiosis";

/**
 * Pelajaran yang animasinya sudah jadi dan bisa ditonton, urut kurikulum.
 *
 * Berkas ini mengimpor naskah lengkap, jadi hanya boleh dipakai oleh halaman
 * yang memang membutuhkannya (halaman pelajaran). Untuk daftar tingkat dan
 * judul saja, pakai src/lib/kurikulum.ts yang jauh lebih ringan.
 */
export const PELAJARAN_SIAP: Pelajaran[] = [
  selUnitKehidupan,
  bagianBagianSel,
  intiSel,
  kromosom,
  mitosisMeiosis,
];

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
