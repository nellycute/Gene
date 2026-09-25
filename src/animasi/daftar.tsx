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
};
