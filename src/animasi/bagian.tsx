import { INTI, SEL } from "@/lib/warna";

/**
 * Potongan gambar yang dipakai bersama oleh beberapa animasi.
 * Semua warna diambil dari src/lib/warna.ts — tidak ada yang ditulis langsung.
 */

/**
 * Bulatkan koordinat hasil hitungan (cos, sin, pembagian) ke dua desimal.
 * Server dan browser bisa berbeda di digit ke-13 — cukup untuk membuat React
 * mengeluh bahwa HTML server dan klien tidak sama. Dua desimal sudah lebih
 * halus dari yang bisa dilihat mata.
 */
export const bulat = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ *
 * LABEL BAGIAN — nama di samping bagian yang disorot.
 * Warna tidak pernah jadi satu-satunya penanda.
 * ------------------------------------------------------------------ */
export function LabelBagian({
  x,
  y,
  teks,
  warna,
  arah = "kanan",
  kecil = false,
}: {
  x: number;
  y: number;
  teks: string;
  warna: string;
  arah?: "kiri" | "kanan";
  kecil?: boolean;
}) {
  const ukuran = kecil ? 12.5 : 15;
  const tinggi = kecil ? 24 : 30;
  const lebar = teks.length * (kecil ? 7 : 8.4) + (kecil ? 22 : 30);
  const tx = arah === "kanan" ? x + 14 : x - lebar - 14;
  return (
    <g style={{ pointerEvents: "none" }}>
      <circle cx={x} cy={y} r={kecil ? 4 : 5} fill={warna} />
      <line x1={x} y1={y} x2={arah === "kanan" ? tx : tx + lebar} y2={y} stroke={warna} strokeWidth="2" />
      <rect x={tx} y={y - tinggi / 2} width={lebar} height={tinggi} rx={tinggi / 2} fill={warna} />
      <text
        x={tx + lebar / 2}
        y={y + ukuran * 0.36}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={ukuran}
        fontWeight="650"
        fontFamily="var(--font-jakarta), system-ui, sans-serif"
      >
        {teks}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * KETERANGAN — tulisan tinta di atas kertas, untuk angka dan nama tahap.
 * ------------------------------------------------------------------ */
export function Keterangan({
  x,
  y,
  children,
  ukuran = 14,
  tebal = 600,
  warna = "#1b2430",
  rata = "middle",
  mono = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  ukuran?: number;
  tebal?: number;
  warna?: string;
  rata?: "start" | "middle" | "end";
  mono?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={rata}
      fill={warna}
      fontSize={ukuran}
      fontWeight={tebal}
      fontFamily={
        mono
          ? "var(--font-mono-kode), ui-monospace, monospace"
          : "var(--font-jakarta), system-ui, sans-serif"
      }
      letterSpacing={mono ? "0.06em" : undefined}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ *
 * PANAH — penunjuk arah proses.
 * ------------------------------------------------------------------ */
export function Panah({
  x1,
  y1,
  x2,
  y2,
  warna = "#93897a",
  tebal = 2.4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  warna?: string;
  tebal?: number;
}) {
  const sudut = Math.atan2(y2 - y1, x2 - x1);
  const p = 9;
  const ax = bulat(x2 - p * Math.cos(sudut - 0.5));
  const ay = bulat(y2 - p * Math.sin(sudut - 0.5));
  const bx = bulat(x2 - p * Math.cos(sudut + 0.5));
  const by = bulat(y2 - p * Math.sin(sudut + 0.5));
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={warna} strokeWidth={tebal} strokeLinecap="round" />
      <path d={`M ${ax} ${ay} L ${x2} ${y2} L ${bx} ${by}`} fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * KROMOSOM — bentuk X (dua kromatid) atau batang tunggal (satu kromatid).
 * Tiap lengan digambar sebagai garis berujung bulat, jadi terlihat seperti
 * batang kapsul. Pindah silang digambar sebagai ujung lengan yang memakai
 * warna pasangannya.
 * ------------------------------------------------------------------ */
export type Tukar = {
  /** Kromatid mana: 0 (kiri) atau 1 (kanan). */
  kromatid: 0 | 1;
  lengan: "p" | "q";
  /** Bagian lengan dari ujung yang bertukar, 0–1. */
  porsi: number;
  warna: string;
};

export function Kromosom({
  x,
  y,
  tinggi = 90,
  warna = SEL.kromatin.warna,
  kromatid = 2,
  rasioP = 0.4,
  tebal = 13,
  putar = 0,
  sentromer = true,
  telomer = false,
  tukar = [],
  redup = false,
}: {
  x: number;
  y: number;
  tinggi?: number;
  warna?: string;
  kromatid?: 1 | 2;
  rasioP?: number;
  tebal?: number;
  putar?: number;
  sentromer?: boolean;
  telomer?: boolean;
  tukar?: Tukar[];
  redup?: boolean;
}) {
  const pLen = tinggi * rasioP;
  const qLen = tinggi * (1 - rasioP);
  // Kromatid membuka sedikit dari sentromer agar bentuk X terbaca.
  const buka = kromatid === 2 ? tebal * 0.62 : 0;
  const posisiKromatid = kromatid === 2 ? [-1, 1] : [0];

  const ujung = (k: number, lengan: "p" | "q") => {
    const arah = lengan === "p" ? -1 : 1;
    const panjang = lengan === "p" ? pLen : qLen;
    return { x: k * (buka + panjang * 0.12), y: arah * panjang };
  };

  return (
    <g transform={`translate(${x} ${y}) rotate(${putar})`} opacity={redup ? 0.35 : 1}>
      {posisiKromatid.map((k, i) => (
        <g key={i}>
          {(["p", "q"] as const).map((lengan) => {
            const u = ujung(k, lengan);
            const awalX = k * buka * 0.5;
            return (
              <line
                key={lengan}
                x1={awalX}
                y1={0}
                x2={u.x}
                y2={u.y}
                stroke={warna}
                strokeWidth={tebal}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      ))}

      {/* potongan yang bertukar saat pindah silang */}
      {tukar.map((t, i) => {
        const k = kromatid === 2 ? (t.kromatid === 0 ? -1 : 1) : 0;
        const u = ujung(k, t.lengan);
        const awalX = k * buka * 0.5;
        const sx = awalX + (u.x - awalX) * (1 - t.porsi);
        const sy = 0 + (u.y - 0) * (1 - t.porsi);
        return (
          <line
            key={i}
            x1={sx}
            y1={sy}
            x2={u.x}
            y2={u.y}
            stroke={t.warna}
            strokeWidth={tebal}
            strokeLinecap="round"
          />
        );
      })}

      {telomer &&
        posisiKromatid.flatMap((k) =>
          (["p", "q"] as const).map((lengan) => {
            const u = ujung(k, lengan);
            return (
              <circle
                key={`${k}-${lengan}`}
                cx={u.x}
                cy={u.y}
                r={tebal * 0.42}
                fill={INTI.telomer.warna}
              />
            );
          }),
        )}

      {sentromer && (
        <ellipse rx={buka + tebal * 0.72} ry={tebal * 0.5} fill={INTI.sentromer.warna} />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * SEL BULAT — sel sederhana untuk adegan pembelahan.
 * ------------------------------------------------------------------ */
export function SelBulat({
  cx,
  cy,
  rx,
  ry = rx,
  inti = true,
  rInti,
  children,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  inti?: boolean;
  rInti?: number;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="5" />
      {inti && (
        <circle
          cx={cx}
          cy={cy}
          r={rInti ?? Math.min(rx, ry) * 0.62}
          fill={SEL.inti.warna}
          fillOpacity="0.16"
          stroke={SEL.membranInti.warna}
          strokeWidth="4"
        />
      )}
      {children}
    </g>
  );
}
