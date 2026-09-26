import { totalDurasi, type Pelajaran, type SuaraAdegan } from "./tipe";
import { apaItuGenetika } from "@/konten/0-1-apa-itu-genetika";
import { selUnitKehidupan } from "@/konten/0-2-sel-unit-kehidupan";
import { bagianBagianSel } from "@/konten/0-3-bagian-bagian-sel";
import { intiSel } from "@/konten/0-4-inti-sel";
import { kromosom } from "@/konten/0-5-kromosom";
import { kariotipe } from "@/konten/0-6-kariotipe";
import { mitosis } from "@/konten/0-7-siklus-sel-mitosis";
import { meiosis } from "@/konten/0-8-meiosis-gamet";
import { buktiDNA } from "@/konten/1-1-bukti-dna";
import { strukturDNA } from "@/konten/1-2-struktur-dna";
import { rna } from "@/konten/1-3-rna";
import { replikasiDNA } from "@/konten/1-4-replikasi-dna";
import { transkripsi } from "@/konten/1-5-transkripsi";
import { kodeGenetikTranslasi } from "@/konten/1-6-kode-genetik-translasi";
import { genKeSifat } from "@/konten/1-7-gen-ke-sifat";
import { mendelKacangErcis } from "@/konten/2-1-mendel-kacang-ercis";
import { monohibrid } from "@/konten/2-2-monohibrid";
import { punnettPeluang } from "@/konten/2-3-punnett-peluang";
import { ujiSilang } from "@/konten/2-4-uji-silang";
import { dihibrid } from "@/konten/2-5-dihibrid";
import { trihibrid } from "@/konten/2-6-trihibrid";
import { dominansiKodominansi } from "@/konten/3-1-dominansi-kodominansi";
import { alelGanda } from "@/konten/3-2-alel-ganda";
import { alelLetal } from "@/konten/3-3-alel-letal";
import { jenggerAyam } from "@/konten/3-4-jengger-ayam";
import { epistasis } from "@/konten/3-5-epistasis";
import { polimeri } from "@/konten/3-6-polimeri";
import { menebakRasio } from "@/konten/3-7-menebak-rasio";
import { penentuanKelamin } from "@/konten/4-1-penentuan-kelamin";
import { terpautKelamin } from "@/konten/4-2-terpaut-kelamin";
import { dipengaruhiKelamin } from "@/konten/4-3-dipengaruhi-dibatasi-kelamin";
import { pautanGen } from "@/konten/4-4-pautan-gen";
import { pindahSilang } from "@/konten/4-5-pindah-silang";
import { petaKromosom } from "@/konten/4-6-peta-kromosom";
import { silsilah } from "@/konten/4-7-silsilah";
import { mutasiGen } from "@/konten/5-1-mutasi-gen";
import { perbaikanDNA } from "@/konten/5-2-perbaikan-dna";
import { aneuploidi } from "@/konten/5-3-aneuploidi";
import { poliploidi } from "@/konten/5-4-poliploidi";
import { strukturKromosom } from "@/konten/5-5-struktur-kromosom";
import { penyakitGenetik } from "@/konten/5-6-penyakit-genetik";
import { hardyWeinberg } from "@/konten/6-1-hardy-weinberg";
import { pengubahFrekuensi } from "@/konten/6-2-pengubah-frekuensi";
import { heritabilitas } from "@/konten/6-3-heritabilitas";
import { pemuliaan } from "@/konten/6-4-pemuliaan";
import { pcrElektroforesis } from "@/konten/6-5-pcr-elektroforesis";
import { sekuensingPenanda } from "@/konten/6-6-sekuensing-penanda";
import { dnaForensik } from "@/konten/6-7-dna-forensik";
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
  buktiDNA,
  strukturDNA,
  rna,
  replikasiDNA,
  transkripsi,
  kodeGenetikTranslasi,
  genKeSifat,
  mendelKacangErcis,
  monohibrid,
  punnettPeluang,
  ujiSilang,
  dihibrid,
  trihibrid,
  dominansiKodominansi,
  alelGanda,
  alelLetal,
  jenggerAyam,
  epistasis,
  polimeri,
  menebakRasio,
  penentuanKelamin,
  terpautKelamin,
  dipengaruhiKelamin,
  pautanGen,
  pindahSilang,
  petaKromosom,
  silsilah,
  mutasiGen,
  perbaikanDNA,
  aneuploidi,
  poliploidi,
  strukturKromosom,
  penyakitGenetik,
  hardyWeinberg,
  pengubahFrekuensi,
  heritabilitas,
  pemuliaan,
  pcrElektroforesis,
  sekuensingPenanda,
  dnaForensik,
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
