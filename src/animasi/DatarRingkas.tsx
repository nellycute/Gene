import type { ComponentType } from "react";
import { BASA, MOLEKUL } from "@/lib/warna";

/**
 * Kembaran datar RINGKAS untuk film Tingkat 1 (1.3 dst.) — hanya tampil di
 * peramban yang sama sekali tidak bisa menggambar 3D. Isinya satu gambar
 * sederhana (tangga DNA dan untai RNA) beserta judul bagian yang sedang
 * dibahas, supaya panggung tidak pernah kosong. Penjelasan lengkap tetap ada di
 * subtitel dan Catatan.
 */

const TINTA = "#1b2430";
const URUT = ["A", "U", "G", "G", "C", "U", "U", "C", "C", "G"] as const;

export function buatDatarRingkas(judul: Record<string, string>): ComponentType<{ tahap?: string; sorot?: string[] }> {
  function DatarRingkas({ tahap }: { tahap?: string; sorot?: string[] }) {
    return (
      <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label={judul[tahap ?? ""] ?? "Gambar pelajaran"}>
        <line x1={120} y1={200} x2={680} y2={200} stroke={MOLEKUL.gulaFosfat.warna} strokeWidth={10} strokeLinecap="round" />
        {URUT.map((b, i) => (
          <rect key={`d${i}`} x={140 + i * 54} y={206} width={30} height={46} rx={5} fill={BASA[b === "U" ? "T" : b].warna} />
        ))}
        <line x1={120} y1={330} x2={680} y2={330} stroke={MOLEKUL.rna.warna} strokeWidth={10} strokeLinecap="round" />
        {URUT.map((b, i) => (
          <rect key={`r${i}`} x={140 + i * 54} y={278} width={30} height={46} rx={5} fill={BASA[b].warna} />
        ))}
        <text x={400} y={450} textAnchor="middle" fontSize={22} fontWeight={700} fill={TINTA} fontFamily="system-ui, sans-serif">
          {judul[tahap ?? ""] ?? ""}
        </text>
      </svg>
    );
  }
  return DatarRingkas;
}
