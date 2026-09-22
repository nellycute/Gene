"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { KunciAnimasi } from "@/lib/tipe";
import { SelHewan } from "./SelHewan";
import { Perbesaran } from "./Perbesaran";
import { IntiSel } from "./IntiSel";
import { Kromosom } from "./Kromosom";
import { Pembelahan } from "./Pembelahan";
import { SedangMemuat3D } from "./tiga-dimensi/Panggung3D";

/**
 * DAFTAR ANIMASI
 *
 * Menghubungkan kunci `animasi` di naskah pelajaran dengan komponen gambarnya.
 * Pemutar Pelajaran hanya tahu daftar ini — tidak tahu apa pun tentang tiap
 * pelajaran. Menambah pelajaran dengan gambar baru = menambah satu baris di sini.
 *
 * Komponen 3D dibungkus next/dynamic (ssr: false) agar three.js tidak pernah
 * ikut halaman depan, dan menampilkan gambar datarnya selama diunduh.
 */

export type PropsAnimasi = { tahap?: string; sorot?: string[] };

type Entri = {
  Datar: ComponentType<PropsAnimasi>;
  /** Komponen 3D, hanya untuk pelajaran yang disebut KEPUTUSAN-DESAIN.md §3. */
  Tiga?: ComponentType;
  /** Pemanggil impor, untuk memuat mesin 3D lebih awal saat pelajaran dibuka. */
  muat3D?: () => Promise<unknown>;
};

const SelHewan3D = dynamic(() => import("./tiga-dimensi/SelHewan3D"), {
  ssr: false,
  loading: () => (
    <SedangMemuat3D>
      <SelHewan sorot={[]} tampilkanLabel={false} />
    </SedangMemuat3D>
  ),
});

const Kromosom3D = dynamic(() => import("./tiga-dimensi/Kromosom3D"), {
  ssr: false,
  loading: () => (
    <SedangMemuat3D>
      <Kromosom tahap="anatomi" />
    </SedangMemuat3D>
  ),
});

export const ANIMASI: Record<KunciAnimasi, Entri> = {
  "sel-hewan": {
    Datar: ({ sorot }) => <SelHewan sorot={sorot ?? []} />,
    Tiga: SelHewan3D,
    muat3D: () => import("./tiga-dimensi/SelHewan3D"),
  },
  perbesaran: { Datar: Perbesaran },
  "inti-sel": { Datar: IntiSel },
  kromosom: {
    Datar: Kromosom,
    Tiga: Kromosom3D,
    muat3D: () => import("./tiga-dimensi/Kromosom3D"),
  },
  pembelahan: { Datar: Pembelahan },
};
