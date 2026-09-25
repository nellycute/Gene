import { BASA, INTI, SEL } from "@/lib/warna";

/**
 * Kembaran datar film 0.1 (PengantarGenetika3D) — hanya tampil di peramban yang
 * tidak bisa menggambar 3D. Satu gambar sederhana per tahap.
 */

const NETRAL = "#d9d2c5";
const NETRAL_GELAP = "#c4b8a6";
const TINTA = "#1b2430";
const TINTA_LEMBUT = "#5c6878";
const KULIT = "#e2b690";
const RAMBUT_GELAP = "#3b302b";
const RAMBUT_TERANG = "#9d6e4c";
const DAUN = "#93b171";
const KAYU = "#a88b6d";

function Tulisan({ x, y, children, ukuran = 16 }: { x: number; y: number; children: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight={700} fill={TINTA} fontFamily="system-ui, sans-serif">
      {children}
    </text>
  );
}

function Orang({ x, skala, rambut, label }: { x: number; skala: number; rambut: string; label: string }) {
  return (
    <g transform={`translate(${x} 470) scale(${skala})`}>
      <rect x={-30} y={-200} width={60} height={120} rx={30} fill={NETRAL_GELAP} />
      <rect x={-26} y={-90} width={22} height={90} rx={11} fill="#7f7869" />
      <rect x={4} y={-90} width={22} height={90} rx={11} fill="#7f7869" />
      <circle cx={0} cy={-240} r={34} fill={KULIT} />
      <path d="M-35 -246 A35 35 0 0 1 35 -246 Z" fill={rambut} />
      <Tulisan x={0} y={40}>
        {label}
      </Tulisan>
    </g>
  );
}

export function Pengantar({ tahap }: { tahap?: string; sorot?: string[] }) {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Gambar pengantar genetika">
      {(tahap === "keluarga" || !tahap) && (
        <g>
          <Orang x={220} skala={1.1} rambut={RAMBUT_GELAP} label="Ayah" />
          <Orang x={340} skala={1} rambut={RAMBUT_TERANG} label="Ibu" />
          <Orang x={470} skala={0.8} rambut={RAMBUT_TERANG} label="Anak" />
          <Orang x={580} skala={0.68} rambut={RAMBUT_GELAP} label="Anak" />
        </g>
      )}
      {tahap === "pertanyaan" && (
        <g>
          {["Apa yang diwariskan?", "Bagaimana ia bekerja?", "Bagaimana ia diteruskan?"].map((t, i) => (
            <g key={t} transform={`translate(${170 + i * 230} 300)`}>
              <circle r={70} fill={[SEL.inti.warna, SEL.sitoplasma.warna, INTI.kromosomAyah.warna][i]} opacity={0.35} />
              <Tulisan x={0} y={12} ukuran={44}>
                ?
              </Tulisan>
              <Tulisan x={0} y={120} ukuran={15}>
                {t}
              </Tulisan>
            </g>
          ))}
        </g>
      )}
      {tahap === "garis-waktu" && (
        <g>
          <line x1={80} y1={300} x2={720} y2={300} stroke={NETRAL_GELAP} strokeWidth={8} strokeLinecap="round" />
          {["1866", "1900", "1902", "1944–1952", "1953"].map((t, i) => (
            <g key={t} transform={`translate(${110 + i * 145} 300)`}>
              <circle r={16} fill={[DAUN, NETRAL, SEL.kromatin.warna, BASA.G.warna, BASA.A.warna][i]} stroke={TINTA} strokeWidth={2} />
              <Tulisan x={0} y={52}>
                {t}
              </Tulisan>
            </g>
          ))}
        </g>
      )}
      {tahap === "cabang" && (
        <g stroke={KAYU} strokeLinecap="round" fill="none">
          <path d="M400 500 L400 330" strokeWidth={22} />
          <path d="M400 340 Q330 280 230 220" strokeWidth={12} />
          <path d="M400 330 L400 170" strokeWidth={12} />
          <path d="M400 340 Q470 280 570 220" strokeWidth={12} />
          {[
            [230, 200, "Genetika klasik"],
            [400, 150, "Genetika molekuler"],
            [570, 200, "Genetika populasi"],
          ].map(([x, y, t]) => (
            <g key={t as string} stroke="none">
              <circle cx={x as number} cy={y as number} r={50} fill={DAUN} />
              <text x={x as number} y={(y as number) - 64} textAnchor="middle" fontSize={15} fontWeight={700} fill={TINTA_LEMBUT}>
                {t as string}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
