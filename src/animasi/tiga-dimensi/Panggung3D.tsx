"use client";

import type { ComponentType, ReactNode } from "react";
import { useMediaCocok } from "@/lib/jendela";
import { aturPakaiDatar, usePakaiDatar } from "@/lib/tampilan3d";

/**
 * Pembungkus tampilan 3D (KEPUTUSAN-DESAIN.md §3 syarat 4–5, §9):
 *  - Komponen 3D (`Tiga`) sudah dibungkus next/dynamic di src/animasi/daftar.tsx,
 *    jadi mesin 3D tidak pernah ikut halaman depan.
 *  - Selama mesin diunduh, `Tiga` menampilkan gambar datarnya sendiri dengan
 *    tulisan kecil "Menyiapkan tampilan 3D" — tidak ada layar kosong.
 *  - Tombol "Pakai gambar datar" untuk HP lemah; pilihannya diingat.
 *  - Kalau perangkat menyalakan "kurangi gerakan", otomatis datar, tanpa tombol.
 */
export function Panggung3D({ Tiga, datar }: { Tiga: ComponentType; datar: ReactNode }) {
  const kurangiGerak = useMediaCocok("(prefers-reduced-motion: reduce)");
  const pakaiDatar = usePakaiDatar();
  const tampilDatar = kurangiGerak || pakaiDatar;

  return (
    <div className="relative h-full w-full">
      {tampilDatar ? datar : <Tiga />}

      {!kurangiGerak && (
        <button
          type="button"
          onClick={() => aturPakaiDatar(!pakaiDatar)}
          className="absolute bottom-3 left-3 rounded-full border border-[#ded6c7] bg-white/90 px-3 py-1.5 text-[11.5px] font-semibold text-[#1b2430] shadow-sm transition active:scale-[0.97]"
        >
          {pakaiDatar ? "Lihat versi 3D" : "Pakai gambar datar"}
        </button>
      )}

      {!tampilDatar && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10.5px] font-medium text-[#5c6878] shadow-sm">
          Seret untuk memutar
        </span>
      )}
    </div>
  );
}

/** Ditampilkan selama berkas 3D diunduh: gambar datar + penanda kecil. */
export function SedangMemuat3D({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full">
      {children}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-medium text-[#5c6878] shadow-sm">
        <span
          className="anim-putar h-3.5 w-3.5 rounded-full border-[2px] border-[#d4c9b8] border-t-[#1b2430]"
          aria-hidden="true"
        />
        Menyiapkan tampilan 3D
      </div>
    </div>
  );
}
