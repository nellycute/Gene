import { BASA, MOLEKUL } from "@/lib/warna";

/**
 * Kembaran datar film 1.2 (StrukturDNA3D) — hanya tampil di peramban yang
 * tidak bisa menggambar 3D. Satu gambar sederhana per tahap.
 */

const TINTA = "#1b2430";
const ABU = MOLEKUL.gulaFosfat.warna;

function Tulisan({ x, y, children, ukuran = 16 }: { x: number; y: number; children: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight={700} fill={TINTA} fontFamily="system-ui, sans-serif">
      {children}
    </text>
  );
}

const URUT = ["C", "G", "T", "A", "A", "T", "G", "C", "A", "G"] as const;
const PASANGAN = { A: "T", T: "A", G: "C", C: "G" } as const;

export function StrukturDNA({ tahap }: { tahap?: string; sorot?: string[] }) {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Gambar struktur DNA">
      {(tahap === "molekul" || !tahap) && (
        <g>
          <line x1={300} y1={70} x2={300} y2={500} stroke={ABU} strokeWidth={10} strokeLinecap="round" />
          <line x1={500} y1={70} x2={500} y2={500} stroke={ABU} strokeWidth={10} strokeLinecap="round" />
          {URUT.map((b, i) => {
            const y = 90 + i * 44;
            const p = PASANGAN[b];
            const purin = b === "A" || b === "G";
            const tengah = purin ? 420 : 380;
            return (
              <g key={i}>
                <rect x={300} y={y - 9} width={tengah - 306} height={18} rx={4} fill={BASA[b].warna} />
                <rect x={tengah + 6} y={y - 9} width={500 - tengah - 6} height={18} rx={4} fill={BASA[p].warna} />
                <text x={320} y={y + 5} fontSize={13} fontWeight={700} fill="#fff" fontFamily="monospace">
                  {b}
                </text>
                <text x={470} y={y + 5} fontSize={13} fontWeight={700} fill="#fff" fontFamily="monospace">
                  {p}
                </text>
              </g>
            );
          })}
          <Tulisan x={300} y={52}>5′</Tulisan>
          <Tulisan x={300} y={535}>3′</Tulisan>
          <Tulisan x={500} y={52}>3′</Tulisan>
          <Tulisan x={500} y={535}>5′</Tulisan>
        </g>
      )}
      {tahap === "lebar" && (
        <g>
          {[
            ["A", "T", "pas"],
            ["G", "C", "pas"],
            ["A", "G", "terlalu lebar"],
            ["C", "T", "terlalu sempit"],
          ].map(([a, b, t], i) => (
            <g key={i} transform={`translate(${130 + i * 180} 280)`}>
              <line x1={-60} y1={-80} x2={-60} y2={80} stroke={ABU} strokeWidth={8} />
              <line x1={60} y1={-80} x2={60} y2={80} stroke={ABU} strokeWidth={8} />
              <rect x={-56} y={-10} width={a === "A" || a === "G" ? 70 : 46} height={20} fill={BASA[a as "A"].warna} />
              <rect x={b === "A" || b === "G" ? -14 : 10} y={-10} width={b === "A" || b === "G" ? 70 : 46} height={20} fill={BASA[b as "A"].warna} opacity={0.85} />
              <Tulisan x={0} y={120}>{`${a}–${b}`}</Tulisan>
              <Tulisan x={0} y={146} ukuran={13}>
                {t}
              </Tulisan>
            </g>
          ))}
        </g>
      )}
      {tahap === "chargaff" && (
        <g>
          {[
            { nama: "Manusia", x: 120, nilai: [31, 29, 20, 20] },
            { nama: "E. coli", x: 470, nilai: [25, 24, 26, 26] },
          ].map((m) => (
            <g key={m.nama}>
              {(["A", "T", "G", "C"] as const).map((b, j) => (
                <g key={b}>
                  <rect x={m.x + j * 55} y={470 - m.nilai[j] * 10} width={44} height={m.nilai[j] * 10} fill={BASA[b].warna} />
                  <Tulisan x={m.x + j * 55 + 22} y={460 - m.nilai[j] * 10} ukuran={14}>{`${b} ${m.nilai[j]}%`}</Tulisan>
                </g>
              ))}
              <Tulisan x={m.x + 105} y={505}>
                {m.nama}
              </Tulisan>
            </g>
          ))}
        </g>
      )}
      {tahap === "franklin" && (
        <g>
          <rect x={220} y={90} width={360} height={400} rx={8} fill="#1e232a" />
          {[1, 2, 3, 5, 6].flatMap((l) =>
            [-1, 1].flatMap((sy) =>
              [-1, 1].map((sx) => <ellipse key={`${l}${sy}${sx}`} cx={400 + sx * (14 + l * 15)} cy={290 + sy * l * 24} rx={10} ry={6} fill="#f0ece2" opacity={0.85} />),
            ),
          )}
          <Tulisan x={400} y={530}>
            Pola difraksi sinar-X: bentuk X = heliks
          </Tulisan>
        </g>
      )}
    </svg>
  );
}
