import type { ComponentType } from "react";
import { SIFAT } from "@/lib/warna";

/**
 * Kembaran datar RINGKAS untuk film pewarisan (Tingkat 2 dst.) — hanya tampil
 * di peramban yang sama sekali tidak bisa menggambar 3D. Tiga biji bulat dan
 * satu biji keriput (3 : 1) beserta judul bagian yang sedang dibahas.
 */

const TINTA = "#1b2430";

export function buatDatarMendel(judul: Record<string, string>): ComponentType<{ tahap?: string; sorot?: string[] }> {
  function DatarMendel({ tahap }: { tahap?: string; sorot?: string[] }) {
    return (
      <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label={judul[tahap ?? ""] ?? "Gambar pelajaran"}>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={220 + i * 110} cy={250} r={42} fill={SIFAT.bijiKuning.warna} stroke={TINTA} strokeWidth={3} />
        ))}
        <path
          d="M 548 214 q 22 -12 40 6 q 20 -8 32 14 q 14 16 0 34 q 8 22 -16 30 q -12 18 -34 6 q -24 8 -34 -14 q -18 -12 -4 -34 q -6 -26 16 -42 z"
          fill={SIFAT.bijiKuning.warna}
          stroke={TINTA}
          strokeWidth={3}
        />
        <text x={330} y={340} textAnchor="middle" fontSize={20} fill={TINTA} fontFamily="system-ui, sans-serif">
          bulat
        </text>
        <text x={580} y={340} textAnchor="middle" fontSize={20} fill={TINTA} fontFamily="system-ui, sans-serif">
          keriput
        </text>
        <text x={400} y={450} textAnchor="middle" fontSize={22} fontWeight={700} fill={TINTA} fontFamily="system-ui, sans-serif">
          {judul[tahap ?? ""] ?? ""}
        </text>
      </svg>
    );
  }
  return DatarMendel;
}
