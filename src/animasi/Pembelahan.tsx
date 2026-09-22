import { INTI, SEL } from "@/lib/warna";
import { Keterangan, Kromosom, LabelBagian, Panah, SelBulat, bulat, type Tukar } from "./bagian";

/**
 * PEMBELAHAN — gambar utama pelajaran 0.5: mitosis dan meiosis.
 *
 * Sel khayal dengan 2n = 4: dua pasang homolog. Ungu = dari ibu (warna
 * kromatin), toska = dari ayah. Pindah silang terlihat sebagai tukar warna.
 *
 * Tahap: siklus · interfase · profase · metafase · anafase · telofase ·
 *        meiosis-pembuka · sinapsis · pindah-silang · meiosis-1 · meiosis-2 ·
 *        perbandingan
 */

type Props = { tahap?: string; sorot?: string[] };

const UNGU = SEL.kromatin.warna;
const TOSKA = INTI.kromosomAyah.warna;
const GELENDONG = SEL.sitoskeleton.warna;
const TINTA = "#1b2430";
const TINTA_LEMBUT = "#5c6878";
const TINTA_SAMAR = "#93897a";

const PUSAT = { x: 400, y: 285 };

export function Pembelahan({ tahap = "interfase" }: Props) {
  switch (tahap) {
    case "siklus":
      return <Siklus />;
    case "profase":
      return <Mitosis fase="profase" />;
    case "metafase":
      return <Mitosis fase="metafase" />;
    case "anafase":
      return <Mitosis fase="anafase" />;
    case "telofase":
      return <Telofase />;
    case "meiosis-pembuka":
      return <MeiosisPembuka />;
    case "sinapsis":
      return <Sinapsis tukar={false} />;
    case "pindah-silang":
      return <Sinapsis tukar />;
    case "meiosis-1":
      return <MeiosisSatu />;
    case "meiosis-2":
      return <MeiosisDua />;
    case "perbandingan":
      return <Perbandingan />;
    default:
      return <Interfase />;
  }
}

/* ---------- siklus sel ---------- */
function Siklus() {
  const cx = 400;
  const cy = 290;
  const r = 170;
  const busur = (a0: number, a1: number) => {
    const p = (a: number) => [bulat(cx + r * Math.cos(a)), bulat(cy + r * Math.sin(a))];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    const besar = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${besar} 1 ${x1} ${y1}`;
  };
  // sudut mulai dari atas, searah jarum jam
  const atas = -Math.PI / 2;
  const fase = [
    { nama: "G1", inggris: "tumbuh", dari: atas + 0.42, sampai: atas + 2.7, warna: SEL.sitoplasma.warna, tebal: 42 },
    { nama: "S", inggris: "DNA disalin", dari: atas + 2.78, sampai: atas + 4.5, warna: SEL.inti.warna, tebal: 42 },
    { nama: "G2", inggris: "bersiap", dari: atas + 4.58, sampai: atas + 5.9, warna: SEL.sitoplasma.warna, tebal: 42 },
    { nama: "M", inggris: "membelah", dari: atas + 5.98, sampai: atas + 6.28 + 0.34, warna: UNGU, tebal: 42 },
  ];
  const tengah = (f: (typeof fase)[number]) => {
    const a = (f.dari + f.sampai) / 2;
    return [bulat(cx + (r + 62) * Math.cos(a)), bulat(cy + (r + 62) * Math.sin(a))];
  };
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Siklus sel: G1, S, G2, dan M">
      {fase.map((f) => (
        <path key={f.nama} d={busur(f.dari, f.sampai)} fill="none" stroke={f.warna} strokeWidth={f.tebal} strokeLinecap="round" opacity={f.nama === "M" ? 1 : 0.9} />
      ))}
      {fase.map((f) => {
        const [x, y] = tengah(f);
        return (
          <g key={f.nama}>
            <Keterangan x={x} y={y + 2} ukuran={20} tebal={800} mono>
              {f.nama}
            </Keterangan>
            <Keterangan x={x} y={y + 22} ukuran={12.5} warna={TINTA_LEMBUT}>
              {f.inggris}
            </Keterangan>
          </g>
        );
      })}
      <Keterangan x={cx} y={cy - 8} ukuran={15} tebal={700}>
        interfase
      </Keterangan>
      <Keterangan x={cx} y={cy + 14} ukuran={12.5} warna={TINTA_LEMBUT}>
        G1 + S + G2 · ± 90% waktu
      </Keterangan>
      <Keterangan x={cx} y={cy + 40} ukuran={12} warna={TINTA_SAMAR}>
        M = mitosis + sitokinesis
      </Keterangan>
    </svg>
  );
}

/* ---------- benang longgar dua warna, sudah disalin (berpasangan sejajar) ---------- */
function BenangLonggar({ cx, cy, skala = 1 }: { cx: number; cy: number; skala?: number }) {
  const benang: [string, string][] = [
    ["M -60 -40 C -30 -70, 10 -20, 40 -50", UNGU],
    ["M -70 10 C -40 40, 0 -10, 50 20", TOSKA],
    ["M -30 50 C 0 30, 30 70, 60 46", UNGU],
    ["M -55 -5 C -25 -30, 20 30, 55 -6", TOSKA],
  ];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${skala})`}>
      {benang.map(([d, warna], i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={warna} strokeWidth="4.5" strokeLinecap="round" />
          <path d={d} fill="none" stroke={warna} strokeWidth="4.5" strokeLinecap="round" transform="translate(4 6)" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

function Interfase() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Sel pada interfase: kromatin longgar, sudah disalin">
      <SelBulat cx={PUSAT.x} cy={PUSAT.y} rx={210} ry={168} rInti={100}>
        <BenangLonggar cx={PUSAT.x} cy={PUSAT.y} skala={1.1} />
      </SelBulat>
      <Sentriol x={PUSAT.x + 128} y={PUSAT.y - 96} />
      <LabelBagian x={PUSAT.x - 100} y={PUSAT.y - 70} teks="kromatin, sudah disalin" warna={UNGU} arah="kiri" kecil />
      <Keterangan x={400} y={520} ukuran={13} warna={TINTA_SAMAR}>
        sel khayal 2n = 4 · ungu dari ibu, toska dari ayah · tiap benang tampak ganda karena sudah disalin
      </Keterangan>
    </svg>
  );
}

function Sentriol({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-5" width="28" height="10" rx="3" fill={SEL.sentriol.warna} />
      <rect x="-5" y="-14" width="10" height="28" rx="3" fill={SEL.sentriol.warna} transform="translate(12 12)" />
    </g>
  );
}

/* ---------- mitosis: profase, metafase, anafase ---------- */
const EMPAT: { warna: string; tinggi: number }[] = [
  { warna: UNGU, tinggi: 96 },
  { warna: TOSKA, tinggi: 96 },
  { warna: UNGU, tinggi: 64 },
  { warna: TOSKA, tinggi: 64 },
];

function Serat({ dari, ke }: { dari: [number, number]; ke: [number, number][] }) {
  return (
    <g>
      {ke.map(([x, y], i) => (
        <line key={i} x1={dari[0]} y1={dari[1]} x2={x} y2={y} stroke={GELENDONG} strokeWidth="2.2" opacity="0.8" />
      ))}
    </g>
  );
}

function KromatidV({ x, y, arah, warna, panjang }: { x: number; y: number; arah: -1 | 1; warna: string; panjang: number }) {
  const l = panjang * 0.5;
  return (
    <g>
      <path d={`M ${x - arah * l * 0.9} ${y - l * 0.55} L ${x} ${y} L ${x - arah * l * 0.9} ${y + l * 0.55}`} fill="none" stroke={warna} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x} cy={y} r="7" fill={INTI.sentromer.warna} />
    </g>
  );
}

function Mitosis({ fase }: { fase: "profase" | "metafase" | "anafase" }) {
  const kutub: [[number, number], [number, number]] = [
    [PUSAT.x - 190, PUSAT.y],
    [PUSAT.x + 190, PUSAT.y],
  ];
  const yBaris = [-105, -35, 35, 105].map((d) => PUSAT.y + d);
  const rx = fase === "anafase" ? 250 : 220;

  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label={`Mitosis: ${fase}`}>
      <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={rx} ry={172} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="5" />

      {/* selaput inti pecah pada profase — digambar putus-putus */}
      {fase === "profase" && (
        <circle cx={PUSAT.x} cy={PUSAT.y} r="120" fill={SEL.inti.warna} fillOpacity="0.1" stroke={SEL.membranInti.warna} strokeWidth="4" strokeDasharray="16 14" />
      )}

      {/* sentriol di dua kutub */}
      <Sentriol x={kutub[0][0]} y={kutub[0][1]} />
      <Sentriol x={kutub[1][0]} y={kutub[1][1]} />

      {fase === "profase" && (
        <>
          <Serat dari={kutub[0]} ke={[[PUSAT.x - 120, PUSAT.y - 90], [PUSAT.x - 125, PUSAT.y], [PUSAT.x - 120, PUSAT.y + 90]]} />
          <Serat dari={kutub[1]} ke={[[PUSAT.x + 120, PUSAT.y - 90], [PUSAT.x + 125, PUSAT.y], [PUSAT.x + 120, PUSAT.y + 90]]} />
          {EMPAT.map((k, i) => (
            <Kromosom key={i} x={PUSAT.x + [-50, 40, -30, 55][i]} y={PUSAT.y + [-60, -40, 60, 40][i]} tinggi={k.tinggi} tebal={13} warna={k.warna} putar={[-20, 25, 15, -30][i]} />
          ))}
          <LabelBagian x={PUSAT.x - 120} y={PUSAT.y - 90} teks="selaput inti pecah" warna={SEL.membranInti.warna} arah="kiri" kecil />
          <LabelBagian x={PUSAT.x + 125} y={PUSAT.y + 4} teks="serat gelendong" warna={GELENDONG} arah="kanan" kecil />
        </>
      )}

      {fase === "metafase" && (
        <>
          <line x1={PUSAT.x} y1={PUSAT.y - 160} x2={PUSAT.x} y2={PUSAT.y + 160} stroke={TINTA_SAMAR} strokeWidth="1.5" strokeDasharray="6 6" />
          <Serat dari={kutub[0]} ke={yBaris.map((y) => [PUSAT.x - 10, y])} />
          <Serat dari={kutub[1]} ke={yBaris.map((y) => [PUSAT.x + 10, y])} />
          {EMPAT.map((k, i) => (
            <Kromosom key={i} x={PUSAT.x} y={yBaris[i]} tinggi={k.tinggi * 0.6} tebal={12} warna={k.warna} putar={90} />
          ))}
          <Keterangan x={PUSAT.x} y={PUSAT.y - 172} ukuran={12} warna={TINTA_LEMBUT}>
            bidang ekuator
          </Keterangan>
        </>
      )}

      {fase === "anafase" && (
        <>
          {yBaris.map((y, i) => (
            <g key={i}>
              <Serat dari={kutub[0]} ke={[[PUSAT.x - 110, y]]} />
              <Serat dari={kutub[1]} ke={[[PUSAT.x + 110, y]]} />
              <KromatidV x={PUSAT.x - 110} y={y} arah={-1} warna={EMPAT[i].warna} panjang={EMPAT[i].tinggi * 0.7} />
              <KromatidV x={PUSAT.x + 110} y={y} arah={1} warna={EMPAT[i].warna} panjang={EMPAT[i].tinggi * 0.7} />
            </g>
          ))}
          <LabelBagian x={PUSAT.x + 110} y={yBaris[0]} teks="kromatid saudara berpisah" warna={INTI.sentromer.warna} arah="kanan" kecil />
        </>
      )}
    </svg>
  );
}

/* ---------- telofase dan sitokinesis ---------- */
function Telofase() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Telofase dan sitokinesis: dua sel baru">
      {/* sel mencekik di tengah */}
      <path
        d="M 400 150 C 330 150, 300 120, 230 120 C 100 120, 60 220, 60 285 C 60 350, 100 450, 230 450 C 300 450, 330 420, 400 420 C 470 420, 500 450, 570 450 C 700 450, 740 350, 740 285 C 740 220, 700 120, 570 120 C 500 120, 470 150, 400 150 Z"
        fill={SEL.sitoplasma.warna}
        stroke={SEL.membranSel.warna}
        strokeWidth="5"
      />
      {[230, 570].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={285} r="92" fill={SEL.inti.warna} fillOpacity="0.16" stroke={SEL.membranInti.warna} strokeWidth="4" />
          <BenangLonggarTunggal cx={cx} cy={285} />
        </g>
      ))}
      <Panah x1={400} y1={90} x2={400} y2={140} warna={TINTA_SAMAR} />
      <Panah x1={400} y1={480} x2={400} y2={430} warna={TINTA_SAMAR} />
      <Keterangan x={400} y={78} ukuran={12.5} warna={TINTA_LEMBUT}>
        sitokinesis: sel mencekik diri
      </Keterangan>
      <Keterangan x={400} y={520} ukuran={14} tebal={700}>
        dua sel · masing-masing 2n = 4 · salinan persis
      </Keterangan>
    </svg>
  );
}

/** Benang longgar satu salinan (tidak lagi ganda): dua ungu, dua toska. */
function BenangLonggarTunggal({ cx, cy, skala = 1 }: { cx: number; cy: number; skala?: number }) {
  const benang: [string, string][] = [
    ["M -50 -34 C -24 -58, 8 -16, 34 -42", UNGU],
    ["M -58 8 C -34 34, 0 -8, 42 16", TOSKA],
    ["M -26 42 C 0 24, 26 58, 50 38", UNGU],
    ["M -46 -4 C -20 -26, 16 26, 46 -6", TOSKA],
  ];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${skala})`}>
      {benang.map(([d, warna], i) => (
        <path key={i} d={d} fill="none" stroke={warna} strokeWidth="4.5" strokeLinecap="round" />
      ))}
    </g>
  );
}

/* ---------- mengapa gamet harus setengah ---------- */
function MeiosisPembuka() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Kalau gamet membawa 46 kromosom, anak membawa 92">
      <g opacity="0.55">
        <Keterangan x={150} y={150} ukuran={40} tebal={800} mono>
          46
        </Keterangan>
        <Keterangan x={270} y={150} ukuran={30} tebal={800} warna={TINTA_SAMAR}>
          +
        </Keterangan>
        <Keterangan x={390} y={150} ukuran={40} tebal={800} mono>
          46
        </Keterangan>
        <Keterangan x={510} y={150} ukuran={30} tebal={800} warna={TINTA_SAMAR}>
          =
        </Keterangan>
        <Keterangan x={640} y={150} ukuran={40} tebal={800} mono warna="#b33c11">
          92
        </Keterangan>
        <line x1={590} y1={165} x2={690} y2={120} stroke="#b33c11" strokeWidth="4" strokeLinecap="round" />
        <Keterangan x={400} y={190} ukuran={13} warna={TINTA_LEMBUT}>
          kalau sel telur dan sperma masing-masing membawa 46 — jumlahnya berlipat tiap generasi
        </Keterangan>
      </g>

      <Keterangan x={150} y={340} ukuran={40} tebal={800} mono>
        23
      </Keterangan>
      <Keterangan x={270} y={340} ukuran={30} tebal={800} warna={TINTA_SAMAR}>
        +
      </Keterangan>
      <Keterangan x={390} y={340} ukuran={40} tebal={800} mono>
        23
      </Keterangan>
      <Keterangan x={510} y={340} ukuran={30} tebal={800} warna={TINTA_SAMAR}>
        =
      </Keterangan>
      <Keterangan x={640} y={340} ukuran={40} tebal={800} mono warna="#1f7a37">
        46
      </Keterangan>
      <Keterangan x={400} y={382} ukuran={13} warna={TINTA_LEMBUT}>
        maka gamet dibuat haploid: jumlah kromosom dibagi dua lebih dulu
      </Keterangan>

      <Keterangan x={400} y={470} ukuran={16} tebal={700}>
        meiosis = 1 kali penyalinan DNA, 2 kali pembelahan
      </Keterangan>
      <Keterangan x={400} y={496} ukuran={13} warna={TINTA_SAMAR}>
        hasilnya 4 sel, masing-masing separuh kromosom
      </Keterangan>
    </svg>
  );
}

/* ---------- sinapsis dan pindah silang ---------- */
const TUKAR_PANJANG_UNGU: Tukar[] = [{ kromatid: 1, lengan: "q", porsi: 0.42, warna: TOSKA }];
const TUKAR_PANJANG_TOSKA: Tukar[] = [{ kromatid: 0, lengan: "q", porsi: 0.42, warna: UNGU }];
const TUKAR_PENDEK_UNGU: Tukar[] = [{ kromatid: 1, lengan: "p", porsi: 0.5, warna: TOSKA }];
const TUKAR_PENDEK_TOSKA: Tukar[] = [{ kromatid: 0, lengan: "p", porsi: 0.5, warna: UNGU }];

function Sinapsis({ tukar }: { tukar: boolean }) {
  const yA = PUSAT.y - 70;
  const yB = PUSAT.y + 80;
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label={tukar ? "Pindah silang: homolog bertukar potongan" : "Sinapsis: homolog berpasangan"}>
      <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={220} ry={172} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="5" />

      {/* pasangan panjang */}
      <Kromosom x={PUSAT.x - 22} y={yA} tinggi={120} tebal={13} warna={UNGU} tukar={tukar ? TUKAR_PANJANG_UNGU : []} />
      <Kromosom x={PUSAT.x + 22} y={yA} tinggi={120} tebal={13} warna={TOSKA} tukar={tukar ? TUKAR_PANJANG_TOSKA : []} />
      {/* pasangan pendek */}
      <Kromosom x={PUSAT.x - 22} y={yB} tinggi={80} tebal={13} warna={UNGU} tukar={tukar ? TUKAR_PENDEK_UNGU : []} />
      <Kromosom x={PUSAT.x + 22} y={yB} tinggi={80} tebal={13} warna={TOSKA} tukar={tukar ? TUKAR_PENDEK_TOSKA : []} />

      {tukar ? (
        <>
          {/* tanda silang di titik pertukaran */}
          <circle cx={PUSAT.x} cy={yA + 40} r="16" fill="none" stroke={TINTA} strokeWidth="2.5" strokeDasharray="4 4" />
          <circle cx={PUSAT.x} cy={yB - 22} r="14" fill="none" stroke={TINTA} strokeWidth="2.5" strokeDasharray="4 4" />
          <LabelBagian x={PUSAT.x + 16} y={yA + 40} teks="kiasma — titik silang" warna={TINTA} arah="kanan" kecil />
          <Keterangan x={400} y={520} ukuran={14} tebal={700}>
            potongan lengan bertukar: tidak ada lagi kromosom yang murni ibu atau ayah
          </Keterangan>
        </>
      ) : (
        <>
          <LabelBagian x={PUSAT.x - 30} y={yA - 60} teks="dari ibu" warna={UNGU} arah="kiri" kecil />
          <LabelBagian x={PUSAT.x + 30} y={yA - 60} teks="dari ayah" warna={TOSKA} arah="kanan" kecil />
          <Keterangan x={400} y={520} ukuran={14} tebal={700}>
            homolog berpasangan rapat: gen sejajar dengan gen
          </Keterangan>
        </>
      )}
    </svg>
  );
}

/* ---------- meiosis I: pasangan yang dipisahkan ---------- */
function MeiosisSatu() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Meiosis I: pasangan homolog dipisahkan menjadi dua sel haploid">
      {/* metafase I */}
      <ellipse cx={200} cy={270} rx={150} ry={120} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="4" />
      <line x1={200} y1={165} x2={200} y2={375} stroke={TINTA_SAMAR} strokeWidth="1.2" strokeDasharray="5 5" />
      <Sentriol x={70} y={270} />
      <Sentriol x={330} y={270} />
      <Serat dari={[70, 270]} ke={[[186, 220], [186, 320]]} />
      <Serat dari={[330, 270]} ke={[[214, 220], [214, 320]]} />
      <Kromosom x={186} y={220} tinggi={70} tebal={9} warna={UNGU} tukar={TUKAR_PANJANG_UNGU} />
      <Kromosom x={214} y={220} tinggi={70} tebal={9} warna={TOSKA} tukar={TUKAR_PANJANG_TOSKA} />
      <Kromosom x={186} y={320} tinggi={48} tebal={9} warna={UNGU} tukar={TUKAR_PENDEK_UNGU} />
      <Kromosom x={214} y={320} tinggi={48} tebal={9} warna={TOSKA} tukar={TUKAR_PENDEK_TOSKA} />
      <Keterangan x={200} y={430} ukuran={14} tebal={700}>
        metafase I
      </Keterangan>
      <Keterangan x={200} y={450} ukuran={12} warna={TINTA_LEMBUT}>
        berbaris berpasangan
      </Keterangan>

      <Panah x1={370} y1={270} x2={440} y2={270} warna={TINTA_SAMAR} tebal={3} />

      {/* dua sel hasil */}
      {[
        { cx: 560, cy: 170, isi: [{ warna: UNGU, tukar: TUKAR_PANJANG_UNGU, t: 70 }, { warna: UNGU, tukar: TUKAR_PENDEK_UNGU, t: 48 }] },
        { cx: 560, cy: 380, isi: [{ warna: TOSKA, tukar: TUKAR_PANJANG_TOSKA, t: 70 }, { warna: TOSKA, tukar: TUKAR_PENDEK_TOSKA, t: 48 }] },
      ].map((s, i) => (
        <g key={i}>
          <ellipse cx={s.cx} cy={s.cy} rx={104} ry={84} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="4" />
          <circle cx={s.cx} cy={s.cy} r={60} fill={SEL.inti.warna} fillOpacity="0.14" stroke={SEL.membranInti.warna} strokeWidth="3" />
          <Kromosom x={s.cx - 22} y={s.cy} tinggi={s.isi[0].t} tebal={9} warna={s.isi[0].warna} tukar={s.isi[0].tukar} />
          <Kromosom x={s.cx + 22} y={s.cy + 4} tinggi={s.isi[1].t} tebal={9} warna={s.isi[1].warna} tukar={s.isi[1].tukar} />
        </g>
      ))}
      <Keterangan x={720} y={170} ukuran={13} tebal={700} rata="middle" mono>
        n = 2
      </Keterangan>
      <Keterangan x={720} y={380} ukuran={13} tebal={700} rata="middle" mono>
        n = 2
      </Keterangan>
      <Keterangan x={560} y={520} ukuran={13} warna={TINTA_LEMBUT}>
        sudah haploid — tapi tiap kromosom masih dua kromatid
      </Keterangan>
    </svg>
  );
}

/* ---------- meiosis II: kromatid saudara dipisahkan ---------- */
function MeiosisDua() {
  const selAwal = [
    { cx: 150, cy: 170, warna: UNGU, tukar: [TUKAR_PANJANG_UNGU, TUKAR_PENDEK_UNGU] },
    { cx: 150, cy: 400, warna: TOSKA, tukar: [TUKAR_PANJANG_TOSKA, TUKAR_PENDEK_TOSKA] },
  ];
  const hasil = [
    { cx: 560, cy: 90, kromatid: [[UNGU, TOSKA], [UNGU, UNGU]] },
    { cx: 560, cy: 250, kromatid: [[UNGU, UNGU], [UNGU, TOSKA]] },
    { cx: 560, cy: 410, kromatid: [[TOSKA, UNGU], [TOSKA, TOSKA]] },
    { cx: 560, cy: 530, kromatid: [[TOSKA, TOSKA], [TOSKA, UNGU]] },
  ];
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Meiosis II: kromatid saudara dipisahkan, menghasilkan empat sel haploid">
      {selAwal.map((s, i) => (
        <g key={i}>
          <ellipse cx={s.cx} cy={s.cy} rx={104} ry={82} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="4" />
          <Kromosom x={s.cx - 22} y={s.cy} tinggi={70} tebal={9} warna={s.warna} tukar={s.tukar[0]} />
          <Kromosom x={s.cx + 22} y={s.cy + 4} tinggi={48} tebal={9} warna={s.warna} tukar={s.tukar[1]} />
          <Panah x1={s.cx + 118} y1={s.cy} x2={s.cx + 210} y2={s.cy} warna={TINTA_SAMAR} tebal={2.5} />
        </g>
      ))}
      {hasil.map((h, i) => (
        <g key={i} transform={i === 3 ? "translate(0 -22)" : i === 0 ? "translate(0 22)" : ""}>
          <ellipse cx={h.cx} cy={h.cy} rx={80} ry={58} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="3.5" />
          <circle cx={h.cx} cy={h.cy} r={40} fill={SEL.inti.warna} fillOpacity="0.14" stroke={SEL.membranInti.warna} strokeWidth="2.5" />
          {/* dua kromatid tunggal, ujung lengan boleh berwarna pasangannya */}
          <Kromosom x={h.cx - 16} y={h.cy} tinggi={50} tebal={8} kromatid={1} warna={h.kromatid[0][0]} tukar={h.kromatid[0][1] !== h.kromatid[0][0] ? [{ kromatid: 0, lengan: "q", porsi: 0.42, warna: h.kromatid[0][1] }] : []} />
          <Kromosom x={h.cx + 16} y={h.cy + 3} tinggi={36} tebal={8} kromatid={1} warna={h.kromatid[1][0]} tukar={h.kromatid[1][1] !== h.kromatid[1][0] ? [{ kromatid: 0, lengan: "p", porsi: 0.5, warna: h.kromatid[1][1] }] : []} />
        </g>
      ))}
      <Keterangan x={720} y={300} ukuran={14} tebal={700} mono>
        4 × n = 2
      </Keterangan>
      <Keterangan x={720} y={322} ukuran={12} warna={TINTA_LEMBUT}>
        tidak ada dua
      </Keterangan>
      <Keterangan x={720} y={338} ukuran={12} warna={TINTA_LEMBUT}>
        yang sama
      </Keterangan>
    </svg>
  );
}

/* ---------- perbandingan mitosis vs meiosis ---------- */
function SelKecil({ cx, cy, r, isi }: { cx: number; cy: number; r: number; isi: { warna: string; t: number; tukar?: Tukar[] }[] }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="3.5" />
      {isi.map((k, i) => (
        <Kromosom key={i} x={cx + (i - (isi.length - 1) / 2) * 16} y={cy + (i % 2) * 4} tinggi={k.t} tebal={7} kromatid={1} warna={k.warna} tukar={k.tukar ?? []} sentromer={false} />
      ))}
    </g>
  );
}

function Perbandingan() {
  const empat = [
    { warna: UNGU, t: 40 },
    { warna: TOSKA, t: 40 },
    { warna: UNGU, t: 28 },
    { warna: TOSKA, t: 28 },
  ];
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Perbandingan mitosis dan meiosis">
      <line x1="400" y1="40" x2="400" y2="520" stroke="#ede6d9" strokeWidth="2" />

      {/* mitosis */}
      <Keterangan x={200} y={86} ukuran={20} tebal={800}>
        Mitosis
      </Keterangan>
      <SelKecil cx={200} cy={168} r={50} isi={empat} />
      <Panah x1={200} y1={226} x2={200} y2={272} warna={TINTA_SAMAR} />
      <SelKecil cx={140} cy={336} r={46} isi={empat} />
      <SelKecil cx={260} cy={336} r={46} isi={empat} />
      {[
        ["1 pembelahan", 436],
        ["2 sel · identik · diploid", 458],
        ["tumbuh dan memperbaiki", 480],
      ].map(([t, y]) => (
        <Keterangan key={t} x={200} y={Number(y)} ukuran={13} warna={TINTA_LEMBUT}>
          {t}
        </Keterangan>
      ))}

      {/* meiosis */}
      <Keterangan x={600} y={86} ukuran={20} tebal={800}>
        Meiosis
      </Keterangan>
      <SelKecil cx={600} cy={148} r={42} isi={empat} />
      <Panah x1={600} y1={198} x2={600} y2={226} warna={TINTA_SAMAR} />
      <SelKecil cx={540} cy={266} r={36} isi={[{ warna: UNGU, t: 40, tukar: [{ kromatid: 0, lengan: "q", porsi: 0.4, warna: TOSKA }] }, { warna: UNGU, t: 28 }]} />
      <SelKecil cx={660} cy={266} r={36} isi={[{ warna: TOSKA, t: 40, tukar: [{ kromatid: 0, lengan: "q", porsi: 0.4, warna: UNGU }] }, { warna: TOSKA, t: 28 }]} />
      <Panah x1={540} y1={308} x2={540} y2={334} warna={TINTA_SAMAR} />
      <Panah x1={660} y1={308} x2={660} y2={334} warna={TINTA_SAMAR} />
      <SelKecil cx={500} cy={372} r={30} isi={[{ warna: UNGU, t: 34, tukar: [{ kromatid: 0, lengan: "q", porsi: 0.4, warna: TOSKA }] }, { warna: UNGU, t: 24 }]} />
      <SelKecil cx={580} cy={372} r={30} isi={[{ warna: UNGU, t: 34 }, { warna: UNGU, t: 24, tukar: [{ kromatid: 0, lengan: "p", porsi: 0.5, warna: TOSKA }] }]} />
      <SelKecil cx={620} cy={372} r={30} isi={[{ warna: TOSKA, t: 34, tukar: [{ kromatid: 0, lengan: "q", porsi: 0.4, warna: UNGU }] }, { warna: TOSKA, t: 24 }]} />
      <SelKecil cx={700} cy={372} r={30} isi={[{ warna: TOSKA, t: 34 }, { warna: TOSKA, t: 24, tukar: [{ kromatid: 0, lengan: "p", porsi: 0.5, warna: UNGU }] }]} />
      {[
        ["2 pembelahan", 436],
        ["4 sel · berbeda · haploid", 458],
        ["berkembang biak", 480],
      ].map(([t, y]) => (
        <Keterangan key={t} x={600} y={Number(y)} ukuran={13} warna={TINTA_LEMBUT}>
          {t}
        </Keterangan>
      ))}
    </svg>
  );
}
