import type { ReactNode } from "react";
import { BASA, INTI, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";

/**
 * HIASAN LATAR BERNUANSA GENETIKA (permintaan Nely, 25 Sep 2026)
 *
 * Gambar-gambar kecil bergaris tipis — heliks DNA, sepasang kromosom, sel,
 * mitokondria, RNA, silsilah, kotak Punnett, nukleosom, kariotipe — diulang
 * seperti kertas dinding, jauh di belakang semua menu dan kartu. Samar
 * (opasitas di .latar-genetika, globals.css) supaya tidak bersaing dengan isi.
 *
 * Dibuat dari nol dengan kode (AGENTS.md aturan 5), dan tiap benda memakai
 * warna tetapnya sendiri dari src/lib/warna.ts: hiasan pun tidak mengajarkan
 * warna yang salah. Silsilah dan kotak Punnett bukan benda biologis, jadi
 * bertinta. Heliks digambar PUTAR KANAN seperti DNA-B: bagian depan untainya
 * miring "/" (naik ke kanan).
 */

const bulat = (n: number) => Math.round(n * 10) / 10;
const UBIN = 560;

export function LatarGenetika() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="latar-genetika pointer-events-none fixed inset-0 -z-10 h-full w-full"
    >
      <defs>
        <pattern
          id="pola-genetika"
          width={UBIN}
          height={UBIN}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <Heliks cx={84} y0={22} tinggi={256} />
          <g transform="rotate(-14 256 110)">
            <KromosomX x={238} y={110} warna={SEL.kromatin.warna} />
            <KromosomX x={276} y={114} warna={INTI.kromosomAyah.warna} />
          </g>
          <Sel x={448} y={128} />
          <Rna x0={178} y0={214} />
          <g transform="rotate(22 440 300)">
            <Mitokondria x={440} y={300} panjang={84} tebal={34} />
          </g>
          <Silsilah x={130} y={330} />
          <Punnett x={292} y={318} />
          <Nukleosom x0={36} y0={484} />
          <Kariotipe x={448} y={412} />
          {/* butiran kecil: ribosom, lisosom, peroksisom */}
          <circle cx={352} cy={58} r={2.4} fill={SEL.ribosom.warna} />
          <circle cx={366} cy={70} r={1.8} fill={SEL.ribosom.warna} />
          <circle cx={524} cy={246} r={2.4} fill={SEL.ribosom.warna} />
          <circle cx={372} cy={430} r={5} fill={SEL.lisosom.warna} fillOpacity={0.35} stroke={SEL.lisosom.warna} strokeWidth={1.2} />
          <circle cx={530} cy={352} r={4.5} fill={SEL.peroksisom.warna} fillOpacity={0.35} stroke={SEL.peroksisom.warna} strokeWidth={1.2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pola-genetika)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const PASANGAN: Record<KodeBasa, KodeBasa> = { A: "T", T: "A", G: "C", C: "G", U: "A" };
const URUTAN: KodeBasa[] = ["A", "T", "G", "C", "C", "G", "T", "A", "G", "C", "A", "T", "T", "G", "C", "A", "G", "A", "C", "T", "G"];

/** Heliks ganda tegak. Urutan gambar: untai belakang → anak tangga basa → untai depan. */
function Heliks({ cx, y0, tinggi }: { cx: number; y0: number; tinggi: number }) {
  const A = 18;
  const k = (2 * Math.PI) / 84;
  /* dua untai bergeser ± 140°: celah besar dan kecil seperti DNA-B */
  const fase = [0, Math.PI * 0.78];
  const belakang: ReactNode[] = [];
  const depan: ReactNode[] = [];

  fase.forEach((s, u) => {
    let titik: string[] = [];
    let diDepan: boolean | null = null;
    const tutup = () => {
      if (titik.length < 2) return;
      const el = (
        <polyline
          key={`${u}-${belakang.length + depan.length}`}
          points={titik.join(" ")}
          fill="none"
          stroke={MOLEKUL.dna.warna}
          strokeWidth={diDepan ? 2.2 : 1.6}
          strokeOpacity={diDepan ? 1 : 0.4}
          strokeLinecap="round"
        />
      );
      (diDepan ? depan : belakang).push(el);
    };
    for (let y = 0; y <= tinggi; y += 2) {
      const x = cx + A * Math.sin(k * y + s);
      /* putar kanan: di layar, bagian yang miring "/" (x bertambah saat naik) ada di depan;
         y SVG menurun ke bawah, jadi depan = dx/dy < 0 = cos < 0 */
      const d = Math.cos(k * y + s) < 0;
      const p = `${bulat(x)},${bulat(y0 + y)}`;
      if (diDepan !== null && d !== diDepan) {
        tutup();
        titik = [titik[titik.length - 1]];
      }
      diDepan = d;
      titik.push(p);
    }
    tutup();
  });

  const anakTangga: ReactNode[] = [];
  for (let i = 0, y = 7; y < tinggi - 4; y += 12, i++) {
    const x1 = cx + A * Math.sin(k * y + fase[0]);
    const x2 = cx + A * Math.sin(k * y + fase[1]);
    if (Math.abs(x2 - x1) < 6) continue; // terlalu pendek di titik silang
    const tengah = (x1 + x2) / 2;
    const basa = URUTAN[i % URUTAN.length];
    const yy = bulat(y0 + y);
    anakTangga.push(
      <g key={i} strokeWidth={2.4} strokeLinecap="round">
        <line x1={bulat(x1)} y1={yy} x2={bulat(tengah)} y2={yy} stroke={BASA[basa].warna} />
        <line x1={bulat(tengah)} y1={yy} x2={bulat(x2)} y2={yy} stroke={BASA[PASANGAN[basa]].warna} />
      </g>,
    );
  }

  return (
    <g>
      {belakang}
      {anakTangga}
      {depan}
    </g>
  );
}

/** Kromosom berbentuk X: dua kromatid saudara bersilang di sentromer, ujungnya telomer. */
function KromosomX({ x, y, warna }: { x: number; y: number; warna: string }) {
  const kromatid = (sudut: number) => (
    <g transform={`rotate(${sudut} ${x} ${y})`}>
      <rect x={x - 6} y={y - 32} width={12} height={64} rx={6} fill={warna} fillOpacity={0.35} stroke={warna} strokeWidth={1.5} />
      <circle cx={x} cy={y - 29} r={3} fill={INTI.telomer.warna} />
      <circle cx={x} cy={y + 29} r={3} fill={INTI.telomer.warna} />
    </g>
  );
  return (
    <g>
      {kromatid(-13)}
      {kromatid(13)}
      <circle cx={x} cy={y} r={3.6} fill={INTI.sentromer.warna} />
    </g>
  );
}

/** Mitokondria: selaput luar lonjong, krista berkelok di dalamnya. */
function Mitokondria({ x, y, panjang, tebal }: { x: number; y: number; panjang: number; tebal: number }) {
  const w = panjang / 2;
  const h = tebal / 2;
  const krista: string[] = [];
  const n = 7;
  for (let i = 0; i <= n; i++) {
    const xx = x - w + 10 + (i * (panjang - 20)) / n;
    krista.push(`${bulat(xx)},${bulat(i % 2 ? y + h - 6 : y - h + 6)}`);
  }
  const warna = SEL.mitokondria.warna;
  return (
    <g>
      <rect x={x - w} y={y - h} width={panjang} height={tebal} rx={h} fill={warna} fillOpacity={0.25} stroke={warna} strokeWidth={1.8} />
      <polyline points={krista.join(" ")} fill="none" stroke={warna} strokeWidth={1.4} strokeLinejoin="round" />
    </g>
  );
}

/** Sel hewan kecil: membran, inti dengan nukleolus, RE, Golgi, mitokondria, ribosom. */
function Sel({ x, y }: { x: number; y: number }) {
  const ribosom = [
    [-28, -20],
    [-34, 4],
    [22, 28],
    [30, -26],
    [-12, 34],
    [36, 10],
  ];
  return (
    <g>
      <circle cx={x} cy={y} r={50} fill={SEL.sitoplasma.warna} fillOpacity={0.4} stroke={SEL.membranSel.warna} strokeWidth={2} />
      <circle cx={x + 10} cy={y - 8} r={17} fill={SEL.membranInti.warna} fillOpacity={0.3} stroke={SEL.inti.warna} strokeWidth={1.6} />
      <circle cx={x + 14} cy={y - 10} r={5} fill={SEL.nukleolus.warna} fillOpacity={0.8} />
      <path
        d={`M ${x - 12} ${y - 26} q 8 -8 24 -8 M ${x - 16} ${y - 18} q 10 -10 30 -10`}
        fill="none"
        stroke={SEL.reKasar.warna}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d={`M ${x + 28} ${y + 8} q 6 8 0 16 M ${x + 22} ${y + 6} q 7 10 0 20 M ${x + 16} ${y + 5} q 8 11 0 22`}
        fill="none"
        stroke={SEL.golgi.warna}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <g transform={`rotate(-28 ${x - 16} ${y + 18})`}>
        <Mitokondria x={x - 16} y={y + 18} panjang={30} tebal={13} />
      </g>
      {ribosom.map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={1.8} fill={SEL.ribosom.warna} />
      ))}
    </g>
  );
}

/** RNA: satu untai berkelok dengan basa-basanya (urasil menggantikan timin). */
function Rna({ x0, y0 }: { x0: number; y0: number }) {
  const titik: string[] = [];
  const basa: ReactNode[] = [];
  const urutan: KodeBasa[] = ["A", "U", "G", "C", "U", "A", "G", "G", "C", "U", "A", "C"];
  for (let i = 0; i <= 140; i += 4) {
    titik.push(`${bulat(x0 + i)},${bulat(y0 + 12 * Math.sin(i / 16) + i * 0.2)}`);
  }
  for (let j = 0; j < urutan.length; j++) {
    const i = 8 + j * 11;
    const xx = x0 + i;
    const yy = y0 + 12 * Math.sin(i / 16) + i * 0.2;
    basa.push(
      <line key={j} x1={bulat(xx)} y1={bulat(yy)} x2={bulat(xx)} y2={bulat(yy + 9)} stroke={BASA[urutan[j]].warna} strokeWidth={2.2} strokeLinecap="round" />,
    );
  }
  return (
    <g>
      {basa}
      <polyline points={titik.join(" ")} fill="none" stroke={MOLEKUL.rna.warna} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Silsilah: ayah (kotak) dan ibu (bulat), dua anak — satu bersifat (diarsir penuh). */
function Silsilah({ x, y }: { x: number; y: number }) {
  return (
    <g className="text-teks-lembut" stroke="currentColor" strokeWidth={1.6} fill="none">
      <rect x={x} y={y} width={16} height={16} />
      <circle cx={x + 54} cy={y + 8} r={8} />
      <path d={`M ${x + 16} ${y + 8} H ${x + 46} M ${x + 31} ${y + 8} V ${y + 30} M ${x + 14} ${y + 30} H ${x + 48} M ${x + 14} ${y + 30} V ${y + 38} M ${x + 48} ${y + 30} V ${y + 38}`} />
      <rect x={x + 7} y={y + 38} width={14} height={14} fill="currentColor" />
      <circle cx={x + 48} cy={y + 45} r={7} />
    </g>
  );
}

/** Kotak Punnett 2 × 2 dengan satu baris dan satu kolom kepala. */
function Punnett({ x, y }: { x: number; y: number }) {
  const s = 18;
  return (
    <g className="text-teks-lembut" stroke="currentColor" strokeWidth={1.4} fill="none">
      <rect x={x + s} y={y + s} width={s * 2} height={s * 2} />
      <path d={`M ${x + s * 2} ${y} V ${y + s * 3} M ${x} ${y + s * 2} H ${x + s * 3} M ${x + s} ${y} V ${y + s} M ${x} ${y + s} H ${x + s}`} />
      <circle cx={x + s * 1.5} cy={y + s * 1.5} r={3.5} fill={BASA.G.warna} stroke="none" />
      <circle cx={x + s * 2.5} cy={y + s * 2.5} r={3.5} fill={BASA.A.warna} stroke="none" />
    </g>
  );
}

/** Manik-manik pada tali: DNA melilit histon, disambung DNA penghubung. */
function Nukleosom({ x0, y0 }: { x0: number; y0: number }) {
  const manik = [34, 92, 150, 208];
  const tali: string[] = [];
  for (let i = 0; i <= 250; i += 5) tali.push(`${bulat(x0 + i)},${bulat(y0 + 8 * Math.sin(i / 14))}`);
  return (
    <g>
      <polyline points={tali.join(" ")} fill="none" stroke={MOLEKUL.dna.warna} strokeWidth={1.6} strokeLinecap="round" />
      {manik.map((dx, i) => {
        const cy = bulat(y0 + 8 * Math.sin(dx / 14));
        return (
          <g key={i}>
            <circle cx={x0 + dx} cy={cy} r={10} fill={INTI.histon.warna} fillOpacity={0.45} stroke={INTI.histon.warna} strokeWidth={1.4} />
            <circle cx={x0 + dx} cy={cy} r={13} fill="none" stroke={MOLEKUL.dna.warna} strokeWidth={1.8} />
          </g>
        );
      })}
    </g>
  );
}

/** Kariotipe mini: empat pasang kromosom, dari yang terpanjang. */
function Kariotipe({ x, y }: { x: number; y: number }) {
  const tinggi = [46, 38, 30, 22];
  return (
    <g>
      {tinggi.map((t, i) => (
        <g key={i}>
          {[SEL.kromatin.warna, INTI.kromosomAyah.warna].map((w, j) => (
            <rect
              key={j}
              x={x + i * 22 + j * 8}
              y={y + (46 - t)}
              width={6}
              height={t}
              rx={3}
              fill={w}
              fillOpacity={0.4}
              stroke={w}
              strokeWidth={1.2}
            />
          ))}
        </g>
      ))}
    </g>
  );
}
