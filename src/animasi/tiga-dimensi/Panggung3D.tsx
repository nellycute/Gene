"use client";

import type { ComponentType, ReactNode } from "react";
import { useBisaWebGL } from "@/lib/jendela";
import type { PropsAnimasi } from "../daftar";

/**
 * Pembungkus tampilan 3D (KEPUTUSAN-DESAIN.md §3, diubah 25 Sep 2026):
 *  - Hanya 3D. Nely meminta tombol "Pakai gambar datar" dihapus: panggung harus
 *    bersih, tanpa pilihan dan tanpa tulisan di dalam video.
 *  - Gambar datar tetap dipakai DIAM-DIAM hanya bila peramban sama sekali tidak
 *    bisa menggambar 3D (WebGL tidak ada) — supaya layar tidak pernah kosong.
 *  - "Kurangi gerakan" di perangkat tidak lagi berarti datar: filmnya tetap 3D,
 *    kameranya saja yang diam (diatur di studio.ts).
 *
 * `Tiga` menerima tahap dan sorot adegan yang sedang berjalan. Komponennya
 * tetap terpasang selama adegan berganti — hanya propertinya yang berubah,
 * jadi model 3D tidak dibangun ulang tiap adegan.
 */
export function Panggung3D({
  Tiga,
  datar,
  ...adegan
}: {
  Tiga: ComponentType<PropsAnimasi>;
  datar: ReactNode;
} & PropsAnimasi) {
  const bisa3D = useBisaWebGL();
  return <div className="relative h-full w-full">{bisa3D ? <Tiga {...adegan} /> : datar}</div>;
}

/**
 * Selama mesin 3D diunduh (hanya sekali, ± 1–3 detik di HP): panggung polos.
 * Tidak ada tulisan "memuat" — permintaan Nely, 25 Sep 2026.
 */
export function SedangMemuat3D() {
  return <div className="h-full w-full" aria-hidden="true" />;
}
