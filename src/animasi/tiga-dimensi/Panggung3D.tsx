"use client";

import dynamic from "next/dynamic";
import { SelHewan } from "@/animasi/SelHewan";
import { useMediaCocok } from "@/lib/jendela";
import { aturPakaiDatar, usePakaiDatar } from "@/lib/tampilan3d";

/**
 * Pembungkus tampilan 3D (KEPUTUSAN-DESAIN.md §3 syarat 4–5, §9):
 *  - Mesin 3D diimpor dinamis: tidak pernah ikut halaman depan.
 *  - Selama mesin diunduh, gambar DATAR tampil lebih dulu — tidak ada layar
 *    kosong. Hanya ada tulisan kecil "Menyiapkan tampilan 3D".
 *  - Tombol "Pakai gambar datar" untuk HP lemah; pilihannya diingat.
 *  - Kalau perangkat menyalakan "kurangi gerakan", otomatis datar, tanpa tombol.
 */

const SelHewan3D = dynamic(() => import("./SelHewan3D"), {
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full">
      <SelHewan sorot={[]} tampilkanLabel={false} />
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-medium text-[#5c6878] shadow-sm">
        <span
          className="anim-putar h-3.5 w-3.5 rounded-full border-[2px] border-[#d4c9b8] border-t-[#1b2430]"
          aria-hidden="true"
        />
        Menyiapkan tampilan 3D
      </div>
    </div>
  ),
});

/** Panggil saat pelajaran dibuka agar mesin 3D sudah siap sebelum adegannya tiba. */
export function muatSel3D() {
  return import("./SelHewan3D");
}

export function Panggung3D() {
  const kurangiGerak = useMediaCocok("(prefers-reduced-motion: reduce)");
  const pakaiDatar = usePakaiDatar();
  const datar = kurangiGerak || pakaiDatar;

  return (
    <div className="relative h-full w-full">
      {datar ? <SelHewan sorot={[]} tampilkanLabel={false} /> : <SelHewan3D />}

      {!kurangiGerak && (
        <button
          type="button"
          onClick={() => aturPakaiDatar(!pakaiDatar)}
          className="absolute bottom-3 left-3 rounded-full border border-[#ded6c7] bg-white/90 px-3 py-1.5 text-[11.5px] font-semibold text-[#1b2430] shadow-sm transition active:scale-[0.97]"
        >
          {pakaiDatar ? "Lihat versi 3D" : "Pakai gambar datar"}
        </button>
      )}

      {!datar && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10.5px] font-medium text-[#5c6878] shadow-sm">
          Seret untuk memutar
        </span>
      )}
    </div>
  );
}
