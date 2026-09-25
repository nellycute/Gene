import { totalDurasi, type Pelajaran, type SuaraAdegan } from "./tipe";
import { apaItuGenetika } from "@/konten/0-1-apa-itu-genetika";
import { selUnitKehidupan } from "@/konten/0-2-sel-unit-kehidupan";
import { bagianBagianSel } from "@/konten/0-3-bagian-bagian-sel";
import { intiSel } from "@/konten/0-4-inti-sel";
import { kromosom } from "@/konten/0-5-kromosom";
import { kariotipe } from "@/konten/0-6-kariotipe";
import { mitosis } from "@/konten/0-7-siklus-sel-mitosis";
import { meiosis } from "@/konten/0-8-meiosis-gamet";
import dataSuara from "@/konten/suara.json";

/**
 * Pelajaran yang animasinya sudah jadi dan bisa ditonton, urut kurikulum.
 *
 * Berkas ini mengimpor naskah lengkap, jadi hanya boleh dipakai oleh halaman
 * yang memang membutuhkannya (halaman pelajaran). Untuk daftar tingkat dan
 * judul saja, pakai src/lib/kurikulum.ts yang jauh lebih ringan.
 */
export const PELAJARAN_SIAP: Pelajaran[] = [
  apaItuGenetika,
  selUnitKehidupan,
  bagianBagianSel,
  intiSel,
  kromosom,
  kariotipe,
  mitosis,
  meiosis,
].map(pasangSuara);

export function cariPelajaran(slug: string): Pelajaran | undefined {
  return PELAJARAN_SIAP.find((p) => p.slug === slug);
}

/** Durasi dan jumlah adegan tiap pelajaran siap, untuk daftar tanpa naskah. */
export const RINGKASAN_SIAP: Record<string, { durasi: number; adegan: number }> =
  Object.fromEntries(
    PELAJARAN_SIAP.map((p) => [p.slug, { durasi: totalDurasi(p), adegan: p.adegan.length }]),
  );

type RekamanTersimpan = SuaraAdegan & { narasi: string };

/**
 * Memasang rekaman suara (src/konten/suara.json, dibuat `npm run suara`) pada
 * adegannya — hanya bila narasi yang direkam sama persis dengan narasi di
 * naskah. Narasi yang sudah diubah tetapi belum direkam ulang tayang tanpa
 * suara, supaya yang terdengar tidak pernah berbeda dari subtitel.
 */
function pasangSuara(p: Pelajaran): Pelajaran {
  const semua = dataSuara.pelajaran as unknown as Record<string, Record<string, RekamanTersimpan>>;
  const rekaman = semua[p.slug] ?? {};
  return {
    ...p,
    adegan: p.adegan.map((a) => {
      const r = rekaman[a.id];
      if (!r) return a;
      if (r.narasi !== a.narasi) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Suara ${p.slug}/${a.id} tertinggal dari narasinya — jalankan "npm run suara".`);
        }
        return a;
      }
      return { ...a, suara: { berkas: r.berkas, durasi: r.durasi, kata: r.kata } };
    }),
  };
}

export { LEVEL, JUMLAH_RENCANA, levelDariSlug, berikutnyaDariSlug } from "./kurikulum";
export type { Butir, Level } from "./kurikulum";
