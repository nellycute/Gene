import { MOLEKUL, SEL } from "@/lib/warna";

/**
 * Kembaran datar film 1.1 (BuktiDNA3D) — hanya tampil di peramban yang tidak
 * bisa menggambar 3D. Satu gambar sederhana per tahap.
 */

const TINTA = "#1b2430";
const KAPSUL = "#e9ddb4";

function Tulisan({ x, y, children, ukuran = 16 }: { x: number; y: number; children: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight={700} fill={TINTA} fontFamily="system-ui, sans-serif">
      {children}
    </text>
  );
}

function Bakteri({ x, y, kapsul }: { x: number; y: number; kapsul: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {kapsul && <ellipse rx={62} ry={100} fill={KAPSUL} opacity={0.6} />}
      <ellipse cy={-40} rx={38} ry={46} fill={SEL.dindingSel.warna} />
      <ellipse cy={40} rx={38} ry={46} fill={SEL.dindingSel.warna} />
    </g>
  );
}

const JUDUL: Record<string, string> = {
  kandidat: "Protein atau DNA?",
  syarat: "Empat syarat materi genetik",
  tikus: "Percobaan Griffith (1928)",
  transformasi: "R berubah menjadi S",
  avery: "Avery, MacLeod, McCarty (1944)",
  "avery-hasil": "Hanya DNase yang menghentikan transformasi",
  fag: "Bakteriofag T2",
  penanda: "³⁵S pada protein, ³²P pada DNA",
  infeksi: "Fag menyuntikkan DNA",
  blender: "Selubung terlepas",
  sentrifus: "³⁵S di cairan, ³²P di pelet",
};

export function BuktiDNA({ tahap }: { tahap?: string; sorot?: string[] }) {
  const t = tahap ?? "kandidat";
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Gambar percobaan bukti DNA">
      {t === "bakteri" ? (
        <g>
          <Bakteri x={270} y={270} kapsul />
          <Bakteri x={530} y={270} kapsul={false} />
          <Tulisan x={270} y={420}>Galur S · berkapsul</Tulisan>
          <Tulisan x={530} y={420}>Galur R · tanpa kapsul</Tulisan>
        </g>
      ) : (
        <g>
          <circle cx={300} cy={260} r={80} fill={MOLEKUL.protein.warna} opacity={0.5} />
          <rect x={440} y={180} width={120} height={160} rx={20} fill={MOLEKUL.dna.warna} opacity={0.5} />
          <Tulisan x={300} y={380}>Protein</Tulisan>
          <Tulisan x={500} y={380}>DNA</Tulisan>
          <Tulisan x={400} y={470} ukuran={18}>
            {JUDUL[t] ?? ""}
          </Tulisan>
        </g>
      )}
    </svg>
  );
}
