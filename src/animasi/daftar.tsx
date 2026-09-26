"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { KunciAnimasi } from "@/lib/tipe";
import { SelHewan } from "./SelHewan";
import { Perbesaran } from "./Perbesaran";
import { IntiSel } from "./IntiSel";
import { Kromosom } from "./Kromosom";
import { Pembelahan } from "./Pembelahan";
import { Pengantar } from "./Pengantar";
import { BuktiDNA } from "./BuktiDNA";
import { StrukturDNA } from "./StrukturDNA";
import { buatDatarRingkas } from "./DatarRingkas";
import { buatDatarMendel } from "./DatarMendel";
import { SedangMemuat3D } from "./tiga-dimensi/Panggung3D";

/**
 * DAFTAR ANIMASI
 *
 * Menghubungkan kunci `animasi` di naskah pelajaran dengan komponen gambarnya.
 * Pemutar Pelajaran hanya tahu daftar ini — tidak tahu apa pun tentang tiap
 * pelajaran. Menambah pelajaran dengan gambar baru = menambah satu baris di sini.
 *
 * Komponen 3D dibungkus next/dynamic (ssr: false) agar three.js tidak pernah
 * ikut halaman depan. Selama diunduh, panggung dibiarkan polos (25 Sep 2026).
 *
 * Semua gambar Tingkat 0 adalah film 3D (`tiga: "semua"`). Kembaran datarnya
 * hanya muncul otomatis di peramban yang sama sekali tidak bisa menggambar 3D.
 */

export type PropsAnimasi = {
  /** Tahap/set gambar — dari adegan, atau dari isyarat subtitel yang sedang berlaku. */
  tahap?: string;
  /** Entitas yang disorot saat ini. */
  sorot?: string[];
  /** Sudut pandang kamera yang diminta (hanya gambar 3D). */
  fokus?: string;
  /** Waktu pelajaran dalam detik — penggerak gerak kamera; berhenti saat dijeda. */
  detik?: number;
  /** Detik sejak isyarat (atau adegan) yang berlaku dimulai — untuk gerakan berurutan. */
  sejak?: number;
  /** Detik sejak tahap+fokus yang berlaku dimulai tanpa putus (isyarat berfokus sama tidak mengulangnya). */
  sejakFokus?: number;
  /** Berubah setiap kali adegan atau isyarat berganti. */
  kunci?: string;
};

type Entri = {
  Datar: ComponentType<PropsAnimasi>;
  Tiga?: ComponentType<PropsAnimasi>;
  /** "semua" = setiap adegan memakai Tiga; "adegan" = hanya adegan bertanda `tampilan: "3d"`. */
  tiga?: "semua" | "adegan";
  /** Pemanggil impor, untuk memuat mesin 3D lebih awal saat pelajaran dibuka. */
  muat3D?: () => Promise<unknown>;
};

/* Pilihan next/dynamic ditulis langsung di tiap panggilan — pengompilasi Next
   menyisipkan data pemuatnya ke objek itu. */
const PengantarGenetika3D = dynamic(() => import("./tiga-dimensi/PengantarGenetika3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const SelHewanPotong3D = dynamic(() => import("./tiga-dimensi/SelHewanPotong3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const PerjalananSel3D = dynamic(() => import("./tiga-dimensi/PerjalananSel3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const IntiSel3D = dynamic(() => import("./tiga-dimensi/IntiSel3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const KromosomFilm3D = dynamic(() => import("./tiga-dimensi/KromosomFilm3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const PembelahanFilm3D = dynamic(() => import("./tiga-dimensi/PembelahanFilm3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});

const BuktiDNA3D = dynamic(() => import("./tiga-dimensi/BuktiDNA3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const StrukturDNA3D = dynamic(() => import("./tiga-dimensi/StrukturDNA3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const RNA3D = dynamic(() => import("./tiga-dimensi/RNA3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Replikasi3D = dynamic(() => import("./tiga-dimensi/Replikasi3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Transkripsi3D = dynamic(() => import("./tiga-dimensi/Transkripsi3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Translasi3D = dynamic(() => import("./tiga-dimensi/Translasi3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const GenSifat3D = dynamic(() => import("./tiga-dimensi/GenSifat3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Mendel3D = dynamic(() => import("./tiga-dimensi/mendel/Mendel3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Perluasan3D = dynamic(() => import("./tiga-dimensi/perluasan/Perluasan3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Kelamin3D = dynamic(() => import("./tiga-dimensi/kelamin/Kelamin3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Mutasi3D = dynamic(() => import("./tiga-dimensi/mutasi/Mutasi3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});
const Populasi3D = dynamic(() => import("./tiga-dimensi/populasi/Populasi3D"), {
  ssr: false,
  loading: () => <SedangMemuat3D />,
});

export const ANIMASI: Record<KunciAnimasi, Entri> = {
  pengantar: {
    Datar: Pengantar,
    Tiga: PengantarGenetika3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/PengantarGenetika3D"),
  },
  "sel-hewan": {
    Datar: ({ sorot }) => <SelHewan sorot={sorot ?? []} />,
    Tiga: SelHewanPotong3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/SelHewanPotong3D"),
  },
  perbesaran: {
    Datar: Perbesaran,
    Tiga: PerjalananSel3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/PerjalananSel3D"),
  },
  "inti-sel": {
    Datar: IntiSel,
    Tiga: IntiSel3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/IntiSel3D"),
  },
  kromosom: {
    Datar: Kromosom,
    Tiga: KromosomFilm3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/KromosomFilm3D"),
  },
  pembelahan: {
    Datar: Pembelahan,
    Tiga: PembelahanFilm3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/PembelahanFilm3D"),
  },
  "bukti-dna": {
    Datar: BuktiDNA,
    Tiga: BuktiDNA3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/BuktiDNA3D"),
  },
  "struktur-dna": {
    Datar: StrukturDNA,
    Tiga: StrukturDNA3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/StrukturDNA3D"),
  },
  rna: {
    Datar: buatDatarRingkas({
      pembuka: "RNA: salinan kerja DNA",
      banding: "Ribosa dan urasil",
      untai: "Untai tunggal yang melipat",
      jenis: "mRNA · tRNA · rRNA",
      perjalanan: "mRNA menuju ribosom",
      dogma: "DNA → RNA → protein",
    }),
    Tiga: RNA3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/RNA3D"),
  },
  replikasi: {
    Datar: buatDatarRingkas({
      buka: "Tiap untai menjadi cetakan",
      model: "Tiga kemungkinan hasil",
      meselson: "Percobaan Meselson–Stahl",
      garpu: "Garpu replikasi",
    }),
    Tiga: Replikasi3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/Replikasi3D"),
  },
  transkripsi: {
    Datar: buatDatarRingkas({
      transkripsi: "DNA disalin menjadi RNA",
      olah: "Tudung, ekor, dan penyambungan",
      keluar: "mRNA menuju ribosom",
      bakteri: "Bakteri: transkripsi dan translasi bersamaan",
    }),
    Tiga: Transkripsi3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/Transkripsi3D"),
  },
  translasi: {
    Datar: buatDatarRingkas({
      mrna: "Empat huruf, dua puluh asam amino",
      hitung: "Kodon: tiga huruf, 64 kombinasi",
      tabel: "Tabel kode genetik",
      baca: "Kerangka baca",
      pemain: "Ribosom dan tRNA",
      translasi: "Ribosom menerjemahkan mRNA",
      lipat: "Rantai melipat menjadi protein",
      polisom: "Polisom",
    }),
    Tiga: Translasi3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/Translasi3D"),
  },
  "gen-sifat": {
    Datar: buatDatarRingkas({
      alur: "Gen → mRNA → protein → sifat",
      jalur: "Satu gen – satu enzim",
      albino: "Tirosinase dan melanin",
      sabit: "Anemia sel sabit",
      kucing: "Kucing Siam: lingkungan ikut menentukan",
      sapi: "P = G + L",
      genom: "Genom",
      satuan: "bp · kb · Mb",
    }),
    Tiga: GenSifat3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/GenSifat3D"),
  },
  mendel: {
    Datar: buatDatarMendel({
      kebun: "Kebun biara di Brno",
      bunga: "Menyilangkan bunga ercis",
      galur: "Galur murni",
      tujuh: "Tujuh sifat Mendel",
      alel: "Gen, alel, dan lokus",
      genotip: "Genotip: homozigot dan heterozigot",
      pati: "Mengapa biji keriput",
      generasi: "P, F1, F2",
      silang: "Persilangan monohibrid",
      hitung: "F2: 3 : 1",
      segregasi: "Hukum Mendel I: segregasi",
      pembuahan: "Gamet bertemu acak",
      meiosis: "Anafase I memisahkan alel",
      sampel: "Peluang dan jumlah sampel",
      punnett: "Diagram Punnett",
      koin: "Kaidah peluang",
      keluarga: "Peluang pada manusia",
      uji: "Uji silang",
      balik: "Silang balik",
      sapi: "Uji silang pada sapi",
      dihibrid: "Persilangan dihibrid",
      hitung2: "F2: 9 : 3 : 3 : 1",
      gamet4: "Empat macam gamet",
      punnett16: "Punnett 4 × 4",
      asortasi: "Hukum Mendel II: asortasi bebas",
      gamet8: "Delapan macam gamet",
      punnett64: "Punnett 8 × 8",
      rumus: "Rumus 2ⁿ dan 3ⁿ",
      garpu: "Diagram garpu",
    }),
    Tiga: Mendel3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/mendel/Mendel3D"),
  },
  perluasan: {
    Datar: buatDatarMendel({
      mirabilis: "Bunga pukul empat: merah × putih",
      mn: "Golongan darah MN",
      roan: "Sapi roan",
      banding: "Tidak sempurna vs kodominan",
      abo: "Golongan darah ABO",
      tabelABO: "Enam genotip, empat golongan",
      keluargaABO: "A × B: anak A, B, AB, O",
      transfusi: "Antigen dan antibodi",
      kelinci: "Empat alel warna kelinci",
      tikus: "Tikus kuning: 2 : 1",
      punnettLetal: "Kotak yang tak pernah lahir",
      creeper: "Ayam Creeper",
      dexter: "Sapi Dexter",
      jengger: "Empat bentuk jengger",
      silangAyam: "Rose × pea",
      labu: "Warna labu: 12 : 3 : 1",
      tikusWarna: "Tikus albino: 9 : 3 : 4",
      linaria: "Linaria: 9 : 3 : 4",
      kacangManis: "Kacang manis: 9 : 7",
      jalur: "Dua enzim berurutan",
      kelompok: "Menggabungkan 9 : 3 : 3 : 1",
      gandum: "Warna biji gandum",
      kurva: "Menuju kurva lonceng",
      tinggi: "Tinggi badan",
    }),
    Tiga: Perluasan3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/perluasan/Perluasan3D"),
  },
  kelamin: {
    Datar: buatDatarMendel({
      xy: "Autosom dan kromosom kelamin",
      gametXY: "Sperma X atau Y",
      sry: "Gen SRY",
      zw: "Unggas: ZZ dan ZW",
      serangga: "Belalang, lebah, lalat buah",
      penyu: "Penyu: suhu pasir",
      terpautX: "Gen di kromosom X",
      punnettX: "Ibu pembawa × ayah normal",
      silsilahRatu: "Hemofilia keluarga Ratu Victoria",
      lurik: "Ayam lurik: terpaut Z",
      botak: "Kebotakan",
      domba: "Tanduk domba",
      ayrshire: "Sapi Ayrshire",
      dibatasi: "Produksi susu",
      lalat: "Lalat buah",
      pautan: "Pautan gen",
      ujiLalat: "Uji silang lalat buah",
      silang: "Pindah silang",
      jarak: "Jarak dan rekombinasi",
      ganda: "Pindah silang ganda",
      peta: "Peta kromosom",
      tigaTitik: "Persilangan tiga titik",
      silsilah: "Membaca silsilah",
    }),
    Tiga: Kelamin3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/kelamin/Kelamin3D"),
  },
  mutasi: {
    Datar: buatDatarMendel({
      kodon: "Kodon dan asam amino",
      penyebab: "Penyebab mutasi",
      rusak: "Kerusakan DNA",
      perbaikan: "Perbaikan DNA",
      uv: "Dimer timin",
      patah: "Patah untai ganda",
      gagal: "Bila perbaikan gagal",
      nondisjunction: "Gagal berpisah",
      aneuploid: "Trisomi dan monosomi",
      down: "Trisomi 21",
      kelaminAneu: "Turner dan Klinefelter",
      ploidi: "Poliploidi",
      semangka: "Semangka tanpa biji",
      kolkisin: "Kolkisin",
      gandumRoti: "Gandum roti heksaploid",
      struktur: "Perubahan struktur kromosom",
      fusi: "Kromosom 2 manusia",
      penyakit: "Penyakit genetik",
      talasemia: "Talasemia",
      ternakPenyakit: "Penyakit genetik ternak",
    }),
    Tiga: Mutasi3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/mutasi/Mutasi3D"),
  },
  populasi: {
    Datar: buatDatarMendel({
      populasi: "Lungkang gen sapi Shorthorn",
      hw: "Hardy-Weinberg",
      pengubah: "Empat pengubah frekuensi",
      seleksi: "Seleksi",
      migrasi: "Aliran gen",
      hanyutan: "Hanyutan genetik",
      kuanti: "Sifat kuantitatif",
      ragam: "Ragam dan heritabilitas",
      pemuliaan: "Pemuliaan ternak",
      heterosis: "Heterosis",
      kambing: "Peranakan Etawa",
      lab: "Isolasi DNA",
      pcr: "PCR",
      gel: "Elektroforesis gel",
      sanger: "Sekuensing Sanger",
      ngs: "Sekuensing generasi baru",
      penanda: "Penanda genetik",
      sidik: "Sidik DNA",
      ayah: "Uji paternitas",
      spesies: "Barcode DNA",
      etika: "Etika data DNA",
      penutup: "Tujuh tingkat",
    }),
    Tiga: Populasi3D,
    tiga: "semua",
    muat3D: () => import("./tiga-dimensi/populasi/Populasi3D"),
  },
};
