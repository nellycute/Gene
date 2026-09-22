import { BASA, MOLEKUL, SEL, type KodeBasa } from "@/lib/warna";
import { Keterangan, LabelBagian, Panah, SelBulat, bulat } from "./bagian";
import { IntiSel } from "./IntiSel";
import { SelHewan } from "./SelHewan";

/**
 * PERBESARAN — gambar utama pelajaran 0.1
 *
 * Perjalanan memperbesar satu titik di tubuh sampai bertemu DNA:
 *   tubuh → jaringan → sel → (teori sel, prokariot, skala) → inti → dna
 *
 * Tubuh, jaringan, dan pembanding ukuran digambar netral (tinta) karena bukan
 * entitas biologi yang punya warna tetap. Sel, inti, dan DNA memakai warna
 * dari src/lib/warna.ts — sama persis dengan pelajaran lain.
 */

type Props = { tahap?: string; sorot?: string[] };

export function Perbesaran({ tahap = "tubuh" }: Props) {
  switch (tahap) {
    case "jaringan":
      return <Jaringan />;
    case "sel":
      return <SelHewan sorot={[]} tampilkanLabel={false} />;
    case "dua-sel":
      return <TeoriSel />;
    case "prokariot":
      return <Prokariot />;
    case "skala":
      return <Skala />;
    case "inti":
      return <IntiSel tahap="utuh" />;
    case "dna":
      return <HeliksDNA />;
    default:
      return <Tubuh />;
  }
}

const TINTA = "#1b2430";
const TINTA_LEMBUT = "#5c6878";
const TINTA_SAMAR = "#93897a";
const NETRAL = "#d9d2c5";

/* ---------- tubuh manusia, satu titik ditandai ---------- */
function Tubuh() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Siluet tubuh manusia dengan satu titik di lengan yang akan diperbesar">
      <g fill={NETRAL}>
        <circle cx="250" cy="96" r="36" />
        <rect x="212" y="140" width="76" height="160" rx="30" />
        <rect x="170" y="150" width="34" height="140" rx="17" transform="rotate(14 187 220)" />
        <rect x="296" y="150" width="34" height="140" rx="17" transform="rotate(-14 313 220)" />
        <rect x="216" y="290" width="32" height="200" rx="16" />
        <rect x="252" y="290" width="32" height="200" rx="16" />
      </g>

      {/* titik yang diperbesar: kulit lengan */}
      <rect x="318" y="248" width="22" height="22" rx="3" fill="none" stroke={SEL.membranSel.warna} strokeWidth="3" />
      <line x1="340" y1="248" x2="470" y2="150" stroke={SEL.membranSel.warna} strokeWidth="2" strokeDasharray="5 5" />
      <line x1="340" y1="270" x2="470" y2="410" stroke={SEL.membranSel.warna} strokeWidth="2" strokeDasharray="5 5" />

      {/* kaca pembesar berisi cuplikan jaringan */}
      <circle cx="600" cy="280" r="130" fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="4" />
      <g clipPath="url(#kaca)">
        <SelUbin dx={600 - 400} dy={280 - 285} skala={0.55} />
      </g>
      <defs>
        <clipPath id="kaca">
          <circle cx="600" cy="280" r="127" />
        </clipPath>
      </defs>

      <Keterangan x={600} y={452} ukuran={26} tebal={800}>
        ± 37 triliun sel
      </Keterangan>
      <Keterangan x={600} y={478} ukuran={13} warna={TINTA_LEMBUT}>
        dalam satu tubuh manusia dewasa
      </Keterangan>
    </svg>
  );
}

/* ---------- jaringan: sel berjajar seperti ubin ---------- */
function SelUbin({ dx = 0, dy = 0, skala = 1, sorotTengah = false }: { dx?: number; dy?: number; skala?: number; sorotTengah?: boolean }) {
  const kolom = 9;
  const baris = 7;
  const lebar = 96;
  const tinggi = 84;
  const sel: { x: number; y: number; jitter: number; tengah: boolean }[] = [];
  for (let b = 0; b < baris; b++) {
    for (let k = 0; k < kolom; k++) {
      const x = 20 + k * lebar + (b % 2 ? lebar / 2 : 0);
      const y = 20 + b * tinggi;
      sel.push({ x, y, jitter: ((k * 7 + b * 13) % 5) - 2, tengah: b === 3 && k === 4 });
    }
  }
  return (
    <g transform={`translate(${dx} ${dy}) translate(400 285) scale(${skala}) translate(-400 -285)`}>
      {sel.map((s, i) => {
        const j = s.jitter;
        const titik = [
          [s.x - 46 + j, s.y - 16],
          [s.x - 20, s.y - 40 - j],
          [s.x + 22 + j, s.y - 38],
          [s.x + 46, s.y - 6 + j],
          [s.x + 20 - j, s.y + 36],
          [s.x - 24, s.y + 38 + j],
          [s.x - 48, s.y + 10],
        ];
        const d = `M ${titik.map((p) => p.join(" ")).join(" L ")} Z`;
        const sorot = sorotTengah && s.tengah;
        return (
          <g key={i}>
            <path d={d} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth={sorot ? 6 : 3} strokeLinejoin="round" />
            <circle cx={s.x + j} cy={s.y - 2} r="13" fill={SEL.inti.warna} fillOpacity="0.55" stroke={SEL.membranInti.warna} strokeWidth="2.5" />
            <circle cx={s.x + j - 3} cy={s.y - 5} r="4" fill={SEL.nukleolus.warna} />
          </g>
        );
      })}
    </g>
  );
}

function Jaringan() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Jaringan: sel-sel berjajar rapat seperti ubin">
      <SelUbin sorotTengah />
      <LabelBagian x={452} y={272} teks="satu sel" warna={SEL.membranSel.warna} />
      <rect x="318" y="526" width="164" height="30" rx="15" fill="#ffffff" fillOpacity="0.92" />
      <Keterangan x={400} y={546} ukuran={13} warna={TINTA_LEMBUT}>
        diperbesar ± 100 kali
      </Keterangan>
    </svg>
  );
}

/* ---------- teori sel: sel berasal dari sel ---------- */
function TeoriSel() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Satu sel membelah menjadi dua sel">
      <SelBulat cx={190} cy={290} rx={110} ry={100} />
      <Panah x1={318} y1={290} x2={402} y2={290} warna={TINTA_SAMAR} tebal={3} />
      <SelBulat cx={520} cy={290} rx={92} ry={86} />
      <SelBulat cx={700} cy={290} rx={92} ry={86} />
      <Keterangan x={190} y={440} ukuran={14} warna={TINTA_LEMBUT}>
        satu sel
      </Keterangan>
      <Keterangan x={610} y={440} ukuran={14} warna={TINTA_LEMBUT}>
        dua sel — dari sel yang sudah ada
      </Keterangan>
      <Keterangan x={400} y={90} ukuran={20} tebal={800}>
        Teori sel
      </Keterangan>
      <Keterangan x={400} y={118} ukuran={13.5} warna={TINTA_LEMBUT}>
        semua makhluk hidup tersusun dari sel · sel adalah satuan dasar kehidupan · sel berasal dari sel
      </Keterangan>
    </svg>
  );
}

/* ---------- prokariot vs eukariot ---------- */
function Prokariot() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Sel bakteri tanpa inti dibandingkan sel hewan dengan inti">
      {/* bakteri */}
      <g transform="translate(40 200)">
        <rect x="0" y="0" width="330" height="140" rx="70" fill={SEL.dindingSel.warna} />
        <rect x="9" y="9" width="312" height="122" rx="61" fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="5" />
        {/* nukleoid: DNA mengambang bebas */}
        {[
          "M 110 70 C 140 40, 170 100, 200 66 C 230 40, 250 92, 230 100 C 200 116, 160 60, 130 92 C 110 110, 96 86, 110 70 Z",
          "M 150 52 C 180 30, 214 44, 224 70",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={SEL.kromatin.warna} strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
        ))}
        {[[50, 40], [70, 100], [270, 44], [290, 96], [40, 74], [300, 70], [180, 116]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" fill={SEL.ribosom.warna} />
        ))}
        {/* flagelum */}
        <path d="M 330 70 C 360 40, 380 100, 410 70 C 430 50, 450 90, 470 72" fill="none" stroke={SEL.sitoskeleton.warna} strokeWidth="4" strokeLinecap="round" />
      </g>
      <LabelBagian x={190} y={262} teks="DNA bebas, tanpa inti" warna={SEL.kromatin.warna} arah="kanan" kecil />
      <Keterangan x={205} y={400} ukuran={17} tebal={800}>
        Prokariot
      </Keterangan>
      <Keterangan x={205} y={424} ukuran={13} warna={TINTA_LEMBUT}>
        bakteri · ± 2 µm
      </Keterangan>

      {/* eukariot: sel hewan, diperkecil */}
      <g transform="translate(470 120) scale(0.4)">
        <SelHewan sorot={[]} tampilkanLabel={false} />
      </g>
      <Keterangan x={630} y={400} ukuran={17} tebal={800}>
        Eukariot
      </Keterangan>
      <Keterangan x={630} y={424} ukuran={13} warna={TINTA_LEMBUT}>
        hewan, tumbuhan, jamur · ± 20 µm
      </Keterangan>
      <Keterangan x={400} y={500} ukuran={12} warna={TINTA_SAMAR} mono>
        tidak sesuai skala — bakteri sebenarnya 10× lebih kecil
      </Keterangan>
    </svg>
  );
}

/* ---------- skala: 1 µm = 3 px ---------- */
function Skala() {
  const px = 3;
  const dasar = 380;
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Perbandingan ukuran bakteri, sel darah merah, sel hewan, dan tebal rambut">
      {/* rambut: pita tegak selebar 80 µm */}
      <rect x={560} y={70} width={80 * px} height={380} fill={NETRAL} rx="6" />
      <Keterangan x={560 + 120} y={480} ukuran={14} tebal={700}>
        tebal rambut
      </Keterangan>
      <Keterangan x={560 + 120} y={500} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        80 µm
      </Keterangan>

      {/* sel hewan 20 µm */}
      <circle cx={430} cy={dasar - 30} r={10 * px} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="3" />
      <circle cx={430} cy={dasar - 30} r={4 * px} fill={SEL.inti.warna} fillOpacity="0.55" stroke={SEL.membranInti.warna} strokeWidth="2" />
      <Keterangan x={430} y={480} ukuran={14} tebal={700}>
        sel hewan
      </Keterangan>
      <Keterangan x={430} y={500} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        20 µm
      </Keterangan>

      {/* sel darah merah 8 µm */}
      <circle cx={300} cy={dasar - 12} r={4 * px} fill="none" stroke={TINTA} strokeWidth="2.5" />
      <circle cx={300} cy={dasar - 12} r={1.6 * px} fill="none" stroke={TINTA} strokeWidth="1.5" />
      <Keterangan x={300} y={480} ukuran={14} tebal={700}>
        sel darah merah
      </Keterangan>
      <Keterangan x={300} y={500} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        8 µm
      </Keterangan>

      {/* bakteri 2 µm */}
      <rect x={170 - 3} y={dasar - 3 * px} width={2 * px} height={3 * px * 2} rx={px} fill={TINTA} />
      <Keterangan x={170} y={480} ukuran={14} tebal={700}>
        bakteri
      </Keterangan>
      <Keterangan x={170} y={500} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        2 µm
      </Keterangan>

      {/* garis dasar dan skala */}
      <line x1={120} y1={dasar + 30} x2={760} y2={dasar + 30} stroke={TINTA_SAMAR} strokeWidth="1.5" />
      <line x1={120} y1={dasar + 22} x2={120} y2={dasar + 38} stroke={TINTA_SAMAR} strokeWidth="1.5" />
      <line x1={120 + 10 * px} y1={dasar + 22} x2={120 + 10 * px} y2={dasar + 38} stroke={TINTA_SAMAR} strokeWidth="1.5" />
      <Keterangan x={120 + 5 * px} y={dasar + 56} ukuran={11} warna={TINTA_SAMAR} mono>
        10 µm
      </Keterangan>
      <Keterangan x={400} y={60} ukuran={13} warna={TINTA_LEMBUT}>
        semuanya sesuai skala · 1 µm = seperseribu milimeter
      </Keterangan>
    </svg>
  );
}

/* ---------- heliks ganda DNA, dua dimensi ---------- */
const URUTAN = "ATGCGTACCTAG".split("") as KodeBasa[];
const PASANGAN: Record<KodeBasa, KodeBasa> = { A: "T", T: "A", G: "C", C: "G", U: "A" };

function HeliksDNA() {
  const cy = 285;
  const A = 92;
  const mulai = 70;
  const jarak = 56;
  const periode = 336;
  const y1 = (x: number) => bulat(cy + A * Math.sin(((x - mulai) / periode) * Math.PI * 2));
  const y2 = (x: number) => bulat(cy - A * Math.sin(((x - mulai) / periode) * Math.PI * 2));
  const jalur = (f: (x: number) => number) => {
    let d = `M ${mulai - 40} ${f(mulai - 40)}`;
    for (let x = mulai - 40; x <= 760; x += 8) d += ` L ${x} ${f(x)}`;
    return d;
  };
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Heliks ganda DNA dengan pasangan basa berwarna">
      <rect x="0" y="0" width="800" height="570" fill={SEL.inti.warna} fillOpacity="0.08" />
      {/* pasangan basa */}
      {URUTAN.map((b, i) => {
        const x = mulai + i * jarak;
        const a = y1(x);
        const c = y2(x);
        const tengah = (a + c) / 2;
        const pasangan = PASANGAN[b];
        const tegak = Math.abs(a - c) > 40;
        return (
          <g key={i}>
            <line x1={x} y1={a} x2={x} y2={tengah} stroke={BASA[b].warna} strokeWidth="11" strokeLinecap="round" />
            <line x1={x} y1={c} x2={x} y2={tengah} stroke={BASA[pasangan].warna} strokeWidth="11" strokeLinecap="round" />
            {tegak && (
              <>
                <Keterangan x={x} y={(a + tengah) / 2 + 4} ukuran={11} tebal={800} warna="#ffffff" mono>
                  {b}
                </Keterangan>
                <Keterangan x={x} y={(c + tengah) / 2 + 4} ukuran={11} tebal={800} warna="#ffffff" mono>
                  {pasangan}
                </Keterangan>
              </>
            )}
          </g>
        );
      })}
      {/* rangka gula-fosfat */}
      <path d={jalur(y1)} fill="none" stroke={MOLEKUL.gulaFosfat.warna} strokeWidth="9" strokeLinecap="round" />
      <path d={jalur(y2)} fill="none" stroke={MOLEKUL.gulaFosfat.warna} strokeWidth="9" strokeLinecap="round" />

      {/* legenda basa */}
      {(["A", "T", "G", "C"] as KodeBasa[]).map((b, i) => (
        <g key={b} transform={`translate(${212 + i * 100} 500)`}>
          <circle r="9" fill={BASA[b].warna} />
          <Keterangan x={0} y={4} ukuran={10} tebal={800} warna="#ffffff" mono>
            {b}
          </Keterangan>
          <Keterangan x={16} y={5} ukuran={13} rata="start" warna={TINTA_LEMBUT}>
            {BASA[b].nama}
          </Keterangan>
        </g>
      ))}
      <Keterangan x={400} y={62} ukuran={13} warna={TINTA_LEMBUT}>
        diperbesar ± 1.000.000 kali · lebar heliks 2 nm
      </Keterangan>
    </svg>
  );
}
