import type { Tingkat } from "./tipe";

/* ------------------------------------------------------------------ *
 * PETA SELURUH KURIKULUM
 * Sengaja terpisah dari daftar-pelajaran.ts dan TIDAK mengimpor naskah
 * apa pun: berkas ini dipakai bilah atas di semua halaman, jadi harus tetap
 * ringan. Rinciannya ada di KURIKULUM.md (draf kedua, 23 Sep 2026 — disusun
 * mengikuti alur tiga buku rujukan Nely).
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
    ringkas: "Di mana materi genetik berada, dan cara sel membaginya.",
    tingkat: "Dasar",
    isi: [
      { nomor: "0.1", judul: "Apa itu genetika?", slug: "apa-itu-genetika" },
      { nomor: "0.2", judul: "Sel, unit terkecil kehidupan", slug: "sel-unit-terkecil-kehidupan" },
      { nomor: "0.3", judul: "Bagian-bagian sel dan fungsinya", slug: "bagian-bagian-sel" },
      { nomor: "0.4", judul: "Inti sel dan DNA di luar inti", slug: "inti-sel" },
      { nomor: "0.5", judul: "Kromosom: bagian, bentuk, dan jumlah", slug: "kromosom" },
      { nomor: "0.6", judul: "Kariotipe: memotret seluruh kromosom", slug: "kariotipe" },
      { nomor: "0.7", judul: "Siklus sel dan mitosis", slug: "siklus-sel-dan-mitosis" },
      { nomor: "0.8", judul: "Meiosis dan pembentukan gamet", slug: "meiosis-dan-gamet" },
    ],
  },
  {
    nomor: 1,
    nama: "DNA dan Ekspresi Gen",
    ringkas: "Apa materi genetik itu, dan bagaimana ia bekerja.",
    tingkat: "Dasar",
    isi: [
      { nomor: "1.1", judul: "Bukti bahwa DNA materi genetik", slug: "bukti-dna-materi-genetik" },
      { nomor: "1.2", judul: "Struktur DNA dan heliks ganda", slug: "struktur-dna" },
      { nomor: "1.3", judul: "RNA dan bedanya dengan DNA", slug: "rna" },
      { nomor: "1.4", judul: "Replikasi DNA", slug: "replikasi-dna" },
      { nomor: "1.5", judul: "Transkripsi: dari DNA ke RNA", slug: "transkripsi" },
      { nomor: "1.6", judul: "Kode genetik dan translasi", slug: "kode-genetik-dan-translasi" },
      { nomor: "1.7", judul: "Dari gen ke sifat", slug: "dari-gen-ke-sifat" },
    ],
  },
  {
    nomor: 2,
    nama: "Hukum Mendel",
    ringkas: "Bagaimana sifat diwariskan dari induk ke anak.",
    tingkat: "Dasar",
    isi: [
      { nomor: "2.1", judul: "Mendel, kacang ercis, dan istilah dasar", slug: "mendel-dan-kacang-ercis" },
      { nomor: "2.2", judul: "Monohibrid dan Hukum Mendel I", slug: "monohibrid-hukum-mendel-1" },
      { nomor: "2.3", judul: "Diagram Punnett dan hukum peluang", slug: "punnett-dan-peluang" },
      { nomor: "2.4", judul: "Uji silang dan silang balik", slug: "uji-silang-dan-silang-balik" },
      { nomor: "2.5", judul: "Dihibrid dan Hukum Mendel II", slug: "dihibrid-hukum-mendel-2" },
      { nomor: "2.6", judul: "Trihibrid dan rumus cepat", slug: "trihibrid-dan-rumus-cepat" },
    ],
  },
  {
    nomor: 3,
    nama: "Perluasan Hukum Mendel",
    ringkas: "Pola pewarisan yang tidak sesederhana rasio Mendel.",
    tingkat: "Menengah",
    isi: [
      { nomor: "3.1", judul: "Dominansi tidak sempurna dan kodominansi", slug: "dominansi-tidak-sempurna-kodominansi" },
      { nomor: "3.2", judul: "Alel ganda: golongan darah ABO", slug: "alel-ganda-golongan-darah" },
      { nomor: "3.3", judul: "Alel letal", slug: "alel-letal" },
      { nomor: "3.4", judul: "Interaksi gen: bentuk jengger ayam", slug: "interaksi-gen-jengger-ayam" },
      { nomor: "3.5", judul: "Epistasis, hipostasis, dan kriptomeri", slug: "epistasis-dan-kriptomeri" },
      { nomor: "3.6", judul: "Polimeri dan sifat poligenik", slug: "polimeri-dan-poligenik" },
      { nomor: "3.7", judul: "Menebak interaksi dari rasionya", slug: "menebak-interaksi-dari-rasio" },
    ],
  },
  {
    nomor: 4,
    nama: "Kelamin dan Pautan",
    ringkas: "Kromosom kelamin, gen yang terangkai, dan peta kromosom.",
    tingkat: "Menengah",
    isi: [
      { nomor: "4.1", judul: "Penentuan jenis kelamin", slug: "penentuan-jenis-kelamin" },
      { nomor: "4.2", judul: "Sifat terpaut kromosom kelamin", slug: "sifat-terpaut-kelamin" },
      { nomor: "4.3", judul: "Sifat dipengaruhi dan dibatasi kelamin", slug: "sifat-dipengaruhi-dibatasi-kelamin" },
      { nomor: "4.4", judul: "Pautan gen", slug: "pautan-gen" },
      { nomor: "4.5", judul: "Pindah silang dan rekombinasi", slug: "pindah-silang-rekombinasi" },
      { nomor: "4.6", judul: "Peta kromosom", slug: "peta-kromosom" },
      { nomor: "4.7", judul: "Membaca silsilah keluarga", slug: "membaca-silsilah-keluarga" },
    ],
  },
  {
    nomor: 5,
    nama: "Mutasi dan Variasi",
    ringkas: "Bagaimana materi genetik berubah, dan apa akibatnya.",
    tingkat: "Menengah",
    isi: [
      { nomor: "5.1", judul: "Mutasi gen: jenis dan akibatnya", slug: "mutasi-gen" },
      { nomor: "5.2", judul: "Perbaikan DNA", slug: "perbaikan-dna" },
      { nomor: "5.3", judul: "Aneuploidi dan gagal berpisah", slug: "aneuploidi-gagal-berpisah" },
      { nomor: "5.4", judul: "Poliploidi", slug: "poliploidi" },
      { nomor: "5.5", judul: "Perubahan struktur kromosom", slug: "perubahan-struktur-kromosom" },
      { nomor: "5.6", judul: "Penyakit genetik pada manusia dan ternak", slug: "penyakit-genetik" },
    ],
  },
  {
    nomor: 6,
    nama: "Populasi dan Terapan",
    ringkas: "Dari satu individu ke populasi, lalu ke laboratorium.",
    tingkat: "Lanjut",
    isi: [
      { nomor: "6.1", judul: "Frekuensi alel dan Hardy-Weinberg", slug: "frekuensi-alel-hardy-weinberg" },
      { nomor: "6.2", judul: "Empat pengubah frekuensi alel", slug: "pengubah-frekuensi-alel" },
      { nomor: "6.3", judul: "Sifat kuantitatif dan heritabilitas", slug: "sifat-kuantitatif-heritabilitas" },
      { nomor: "6.4", judul: "Genetika dalam pemuliaan", slug: "genetika-dalam-pemuliaan" },
      { nomor: "6.5", judul: "Isolasi DNA, PCR, dan elektroforesis", slug: "isolasi-dna-pcr-elektroforesis" },
      { nomor: "6.6", judul: "Sekuensing dan penanda genetik", slug: "sekuensing-dan-penanda-genetik" },
      { nomor: "6.7", judul: "DNA dalam forensik dan keseharian", slug: "dna-forensik-dan-keseharian" },
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
