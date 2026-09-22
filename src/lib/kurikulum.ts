import type { Tingkat } from "./tipe";

/* ------------------------------------------------------------------ *
 * PETA SELURUH KURIKULUM
 * Sengaja terpisah dari daftar-pelajaran.ts dan TIDAK mengimpor naskah
 * apa pun: berkas ini dipakai bilah atas di semua halaman, jadi harus tetap
 * ringan. Rinciannya ada di KURIKULUM.md.
 * ------------------------------------------------------------------ */

export type Butir = {
  nomor: string;
  judul: string;
  /** Diisi kalau pelajarannya sudah bisa ditonton. */
  slug?: string;
};

export type Level = {
  nomor: number;
  nama: string;
  /** Satu kalimat, maksimal 10 kata — hanya tampil di laptop. */
  ringkas: string;
  tingkat: Tingkat;
  isi: Butir[];
};

export const LEVEL: Level[] = [
  {
    nomor: 0,
    nama: "Fondasi Sel",
    ringkas: "Di mana materi genetik berada sebelum kita tahu cara kerjanya.",
    tingkat: "Dasar",
    isi: [
      { nomor: "0.1", judul: "Sel: unit terkecil kehidupan", slug: "sel-unit-terkecil-kehidupan" },
      { nomor: "0.2", judul: "Bagian-bagian sel dan fungsinya", slug: "bagian-bagian-sel" },
      { nomor: "0.3", judul: "Inti sel: membran inti, kromatin, nukleolus", slug: "inti-sel" },
      { nomor: "0.4", judul: "Kromosom, kariotipe, diploid dan haploid", slug: "kromosom-kariotipe" },
      { nomor: "0.5", judul: "Mitosis dan meiosis", slug: "mitosis-dan-meiosis" },
    ],
  },
  {
    nomor: 1,
    nama: "Dogma Sentral",
    ringkas: "Dari DNA menjadi RNA, lalu menjadi protein yang bekerja.",
    tingkat: "Dasar",
    isi: [
      { nomor: "1.1", judul: "Struktur DNA: basa, gula, fosfat, heliks ganda" },
      { nomor: "1.2", judul: "RNA dan bedanya dengan DNA" },
      { nomor: "1.3", judul: "Replikasi DNA" },
      { nomor: "1.4", judul: "Transkripsi dan penyuntingan RNA" },
      { nomor: "1.5", judul: "Kode genetik dan kodon" },
      { nomor: "1.6", judul: "Translasi: dari mRNA jadi protein" },
    ],
  },
  {
    nomor: 2,
    nama: "Genom dan Pengaturannya",
    ringkas: "Isi tiga miliar pasang basa, dan gen mana yang dinyalakan.",
    tingkat: "Menengah",
    isi: [
      { nomor: "2.1", judul: "Gen dan genom" },
      { nomor: "2.2", judul: "Bagian genom yang tidak menyandi protein" },
      { nomor: "2.3", judul: "Pengaturan ekspresi gen" },
      { nomor: "2.4", judul: "Operon pada bakteri" },
      { nomor: "2.5", judul: "Epigenetik" },
      { nomor: "2.6", judul: "Mengapa sel otot dan sel saraf berbeda" },
    ],
  },
  {
    nomor: 3,
    nama: "Variasi dan Pewarisan",
    ringkas: "Bagaimana perbedaan muncul dan berpindah antar generasi.",
    tingkat: "Menengah",
    isi: [
      { nomor: "3.1", judul: "Mutasi: jenis, sebab, dan akibat" },
      { nomor: "3.2", judul: "Perbaikan DNA dan saat ia gagal" },
      { nomor: "3.3", judul: "Hukum Mendel" },
      { nomor: "3.4", judul: "Membaca silsilah keluarga" },
      { nomor: "3.5", judul: "Pewarisan di luar pola Mendel" },
      { nomor: "3.6", judul: "Genetika populasi" },
    ],
  },
  {
    nomor: 4,
    nama: "Teknik Laboratorium",
    ringkas: "Dari tabung sampai mesin sequencing.",
    tingkat: "Lanjut",
    isi: [
      { nomor: "4.1", judul: "Ekstraksi DNA" },
      { nomor: "4.2", judul: "PCR" },
      { nomor: "4.3", judul: "Elektroforesis gel" },
      { nomor: "4.4", judul: "Kloning DNA, plasmid, enzim restriksi" },
      { nomor: "4.5", judul: "Sekuensing Sanger" },
      { nomor: "4.6", judul: "NGS dan Illumina" },
      { nomor: "4.7", judul: "Nanopore dan PacBio" },
    ],
  },
  {
    nomor: 5,
    nama: "Bioinformatika Dasar",
    ringkas: "Apa yang terjadi pada data setelah mesin selesai bekerja.",
    tingkat: "Lanjut",
    isi: [
      { nomor: "5.1", judul: "FASTA, FASTQ, dan skor mutu" },
      { nomor: "5.2", judul: "Penjajaran urutan" },
      { nomor: "5.3", judul: "BLAST" },
      { nomor: "5.4", judul: "Pemetaan bacaan ke genom rujukan" },
      { nomor: "5.5", judul: "Pemanggilan varian" },
      { nomor: "5.6", judul: "Membaca dan menafsirkan hasil" },
    ],
  },
  {
    nomor: 6,
    nama: "Penerapan",
    ringkas: "Ke mana semua ini bermuara di dunia nyata.",
    tingkat: "Lanjut",
    isi: [
      { nomor: "6.1", judul: "CRISPR-Cas9" },
      { nomor: "6.2", judul: "Terapi gen" },
      { nomor: "6.3", judul: "Genetika forensik" },
      { nomor: "6.4", judul: "Farmakogenomik" },
      { nomor: "6.5", judul: "GWAS" },
      { nomor: "6.6", judul: "Tes genetik langsung ke konsumen" },
      { nomor: "6.7", judul: "Etika dan privasi data genetik" },
    ],
  },
];

export const JUMLAH_RENCANA = LEVEL.reduce((j, l) => j + l.isi.length, 0);

/** Tingkat tempat sebuah pelajaran berada, dicari dari slug-nya. */
export function levelDariSlug(slug: string): Level | undefined {
  return LEVEL.find((l) => l.isi.some((b) => b.slug === slug));
}

/** Pelajaran berikutnya di dalam kurikulum (yang sudah siap saja). */
export function berikutnyaDariSlug(slug: string): (Butir & { level: Level }) | undefined {
  const semua = LEVEL.flatMap((level) => level.isi.map((b) => ({ ...b, level })));
  const i = semua.findIndex((b) => b.slug === slug);
  if (i < 0) return undefined;
  return semua.slice(i + 1).find((b) => b.slug);
}
