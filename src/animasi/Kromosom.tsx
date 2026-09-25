import { INTI, MOLEKUL, SEL } from "@/lib/warna";
import { Keterangan, Kromosom as BentukKromosom, LabelBagian, Panah, SelBulat, bulat } from "./bagian";
import { IntiSel } from "./IntiSel";

/**
 * KROMOSOM — gambar utama pelajaran 0.4
 *
 * Tahap:
 *   kromatin    inti dengan benang longgar (pinjam IntiSel)
 *   pemadatan   lima tingkat: DNA → nukleosom → serat → lengkung → kromosom
 *   anatomi     satu kromosom X: kromatid, sentromer, lengan p/q, telomer
 *   replikasi   satu kromatid → dua kromatid saudara
 *   kariotipe   23 pasang dijajarkan menurut ukuran
 *   homolog     satu pasang disorot: dari ibu (ungu) dan dari ayah (toska)
 *   ploidi      2n = 46 pada sel tubuh, n = 23 pada gamet
 *   kelamin     XX dan XY
 */

type Props = { tahap?: string; sorot?: string[] };

const UNGU = SEL.kromatin.warna;
const TOSKA = INTI.kromosomAyah.warna;
const TINTA_LEMBUT = "#5c6878";
const TINTA_SAMAR = "#93897a";

export function Kromosom({ tahap = "anatomi" }: Props) {
  switch (tahap) {
    case "kromatin":
      return <IntiSel tahap="utuh" />;
    case "pemadatan":
      return <Pemadatan />;
    case "replikasi":
      return <Replikasi />;
    case "kariotipe":
      return <Kariotipe />;
    case "homolog":
      return <Kariotipe sorotPasangan={3} />;
    case "ploidi":
      return <Ploidi />;
    case "kelamin":
      return <Kelamin />;
    default:
      return <Anatomi />;
  }
}

/* ---------- lima tingkat pemadatan ---------- */
function Pemadatan() {
  const kolom = [92, 246, 400, 554, 708];
  const cy = 250;
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Lima tingkat pemadatan DNA menjadi kromosom">
      {/* 1. DNA heliks */}
      <g transform={`translate(${kolom[0]} ${cy})`}>
        {[0, 1].map((s) => (
          <path
            key={s}
            d={Array.from({ length: 13 }, (_, i) => {
              const y = -120 + i * 20;
              const x = bulat((s ? -1 : 1) * 14 * Math.sin(i * 0.9));
              return `${i ? "L" : "M"} ${x} ${y}`;
            }).join(" ")}
            fill="none"
            stroke={MOLEKUL.gulaFosfat.warna}
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const y = -110 + i * 20;
          const x = bulat(14 * Math.sin((i + 0.5) * 0.9));
          return <line key={i} x1={-x} y1={y} x2={x} y2={y} stroke={MOLEKUL.dna.warna} strokeWidth="4" strokeLinecap="round" />;
        })}
      </g>

      {/* 2. nukleosom */}
      <g transform={`translate(${kolom[1]} ${cy})`}>
        <path d="M 0 -130 L 0 130" stroke={MOLEKUL.dna.warna} strokeWidth="3.5" />
        {[-96, -48, 0, 48, 96].map((y) => (
          <g key={y}>
            <circle cx={0} cy={y} r="17" fill={INTI.histon.warna} />
            <circle cx={0} cy={y} r="20" fill="none" stroke={MOLEKUL.dna.warna} strokeWidth="3.5" strokeDasharray="100 26" transform={`rotate(${y} 0 ${y})`} />
          </g>
        ))}
      </g>

      {/* 3. serat 30 nm: manik menggulung jadi spiral */}
      <g transform={`translate(${kolom[2]} ${cy})`}>
        <rect x="-30" y="-130" width="60" height="260" rx="30" fill={SEL.kromatin.warna} fillOpacity="0.18" />
        {Array.from({ length: 14 }, (_, i) => {
          const t = i * 0.9;
          return <circle key={i} cx={bulat(20 * Math.cos(t))} cy={-118 + i * 18} r="11" fill={INTI.histon.warna} stroke={MOLEKUL.dna.warna} strokeWidth="2.5" />;
        })}
      </g>

      {/* 4. lengkung-lengkung pada kerangka */}
      <g transform={`translate(${kolom[3]} ${cy})`}>
        <line x1="0" y1="-130" x2="0" y2="130" stroke={SEL.sitoskeleton.warna} strokeWidth="6" strokeLinecap="round" />
        {[-110, -70, -30, 10, 50, 90].map((y, i) => (
          <path
            key={y}
            d={`M 0 ${y} C ${i % 2 ? -70 : 70} ${y - 30}, ${i % 2 ? -70 : 70} ${y + 50}, 0 ${y + 20}`}
            fill="none"
            stroke={SEL.kromatin.warna}
            strokeWidth="7"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* 5. kromosom */}
      <BentukKromosom x={kolom[4]} y={cy} tinggi={260} tebal={30} telomer />

      {/* panah antar tingkat */}
      {kolom.slice(0, -1).map((x, i) => (
        <Panah key={i} x1={x + 58} y1={cy} x2={kolom[i + 1] - 58} y2={cy} warna={TINTA_SAMAR} />
      ))}

      {/* nama dan ukuran */}
      {[
        ["DNA", "2 nm"],
        ["nukleosom", "11 nm"],
        ["serat", "30 nm"],
        ["lengkung", "300 nm"],
        ["kromosom", "700 nm"],
      ].map(([nama, ukuran], i) => (
        <g key={nama}>
          <Keterangan x={kolom[i]} y={432} ukuran={14} tebal={700}>
            {nama}
          </Keterangan>
          <Keterangan x={kolom[i]} y={454} ukuran={12} warna={TINTA_LEMBUT} mono>
            {ukuran}
          </Keterangan>
        </g>
      ))}
      <Keterangan x={400} y={520} ukuran={13} warna={TINTA_SAMAR}>
        seluruhnya: ± 10.000 kali lebih pendek daripada DNA yang diluruskan
      </Keterangan>
    </svg>
  );
}

/* ---------- anatomi satu kromosom ---------- */
function Anatomi() {
  const x = 400;
  const y = 262;
  const tinggi = 370;
  const tebal = 40;
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Bagian-bagian kromosom: kromatid, sentromer, lengan p dan q, telomer">
      <BentukKromosom x={x} y={y} tinggi={tinggi} tebal={tebal} telomer />

      <LabelBagian x={x - 44} y={y - 120} teks="Kromatid saudara" warna={UNGU} arah="kiri" />
      <LabelBagian x={x + 44} y={y - 120} teks="Kromatid saudara" warna={UNGU} arah="kanan" />
      <LabelBagian x={x + 50} y={y} teks="Sentromer" warna={INTI.sentromer.warna} arah="kanan" />
      <LabelBagian x={x - 62} y={y - tinggi * 0.4} teks="Telomer" warna={INTI.telomer.warna} arah="kiri" />

      {/* lengan p (pendek, atas) dan q (panjang, bawah) */}
      <line x1={x - 150} y1={y - 8} x2={x - 150} y2={y - tinggi * 0.4 + 10} stroke={TINTA_SAMAR} strokeWidth="2" />
      <Keterangan x={x - 168} y={y - tinggi * 0.2} ukuran={15} tebal={800} rata="end" mono>
        p
      </Keterangan>
      <Keterangan x={x - 168} y={y - tinggi * 0.2 + 18} ukuran={11.5} rata="end" warna={TINTA_LEMBUT}>
        lengan pendek
      </Keterangan>
      <line x1={x - 150} y1={y + 8} x2={x - 150} y2={y + tinggi * 0.6 - 10} stroke={TINTA_SAMAR} strokeWidth="2" />
      <Keterangan x={x - 168} y={y + tinggi * 0.3} ukuran={15} tebal={800} rata="end" mono>
        q
      </Keterangan>
      <Keterangan x={x - 168} y={y + tinggi * 0.3 + 18} ukuran={11.5} rata="end" warna={TINTA_LEMBUT}>
        lengan panjang
      </Keterangan>

      <Keterangan x={400} y={536} ukuran={13} warna={TINTA_SAMAR}>
        satu kromosom = dua kromatid saudara dengan DNA yang persis sama
      </Keterangan>
    </svg>
  );
}

/* ---------- sebelum dan sesudah penyalinan DNA ---------- */
function Replikasi() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Kromosom sebelum dan sesudah DNA disalin">
      <BentukKromosom x={220} y={270} tinggi={300} tebal={34} kromatid={1} telomer />
      <Keterangan x={220} y={470} ukuran={16} tebal={700}>
        1 kromatid
      </Keterangan>
      <Keterangan x={220} y={494} ukuran={13} warna={TINTA_LEMBUT}>
        sepanjang hidup sel
      </Keterangan>

      <Panah x1={330} y1={270} x2={470} y2={270} warna={TINTA_SAMAR} tebal={3} />
      <Keterangan x={400} y={244} ukuran={13} tebal={700} mono>
        fase S
      </Keterangan>
      <Keterangan x={400} y={300} ukuran={12} warna={TINTA_LEMBUT}>
        DNA disalin
      </Keterangan>

      <BentukKromosom x={580} y={270} tinggi={300} tebal={34} telomer />
      <Keterangan x={580} y={470} ukuran={16} tebal={700}>
        2 kromatid saudara
      </Keterangan>
      <Keterangan x={580} y={494} ukuran={13} warna={TINTA_LEMBUT}>
        tetap satu kromosom · DNA persis sama
      </Keterangan>
    </svg>
  );
}

/* ---------- kariotipe: 23 pasang ---------- */
const TINGGI_PASANGAN = [
  64, 62, 58, 54, 52, 48, 46, 44, 42, 42, 40, 40, 36, 34, 32, 30, 30, 28, 26, 26, 24, 24,
];

function Kariotipe({ sorotPasangan }: { sorotPasangan?: number }) {
  const baris = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23],
  ];
  const yBaris = [88, 208, 318, 420];
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Kariotipe manusia: 22 pasang autosom dan sepasang kromosom kelamin">
      {baris.map((isi, b) =>
        isi.map((n, i) => {
          const lebarSlot = 760 / isi.length;
          const cx = 20 + lebarSlot * (i + 0.5);
          const cy = yBaris[b];
          const kelamin = n === 23;
          const tinggi = kelamin ? 40 : TINGGI_PASANGAN[n - 1];
          const disorot = sorotPasangan === n;
          const redup = sorotPasangan !== undefined && !disorot;
          return (
            <g key={n}>
              <BentukKromosom x={cx - 14} y={cy} tinggi={tinggi} tebal={9} rasioP={0.38 + (n % 3) * 0.06} warna={UNGU} redup={redup} />
              <BentukKromosom
                x={cx + 14}
                y={cy}
                tinggi={kelamin ? 22 : tinggi}
                tebal={9}
                rasioP={kelamin ? 0.4 : 0.38 + (n % 3) * 0.06}
                warna={disorot ? TOSKA : UNGU}
                redup={redup}
              />
              <Keterangan x={cx} y={cy + tinggi * 0.62 + 18} ukuran={11} warna={redup ? "#b3aa9b" : TINTA_LEMBUT} mono>
                {kelamin ? "XY" : n}
              </Keterangan>
            </g>
          );
        }),
      )}

      {sorotPasangan !== undefined ? (
        <>
          <LabelBagian x={20 + 152 * (sorotPasangan - 0.5) - 14} y={yBaris[0] - 34} teks="dari ibu" warna={UNGU} arah="kiri" kecil />
          <LabelBagian x={20 + 152 * (sorotPasangan - 0.5) + 14} y={yBaris[0] + 40} teks="dari ayah" warna={TOSKA} arah="kanan" kecil />
          <Keterangan x={400} y={530} ukuran={14} warna={TINTA_LEMBUT}>
            sepasang homolog: gen yang sama, posisi yang sama — versinya bisa berbeda
          </Keterangan>
        </>
      ) : (
        <Keterangan x={400} y={530} ukuran={14} warna={TINTA_LEMBUT}>
          22 pasang autosom + 1 pasang kromosom kelamin = 46 kromosom
        </Keterangan>
      )}
    </svg>
  );
}

/* ---------- diploid dan haploid ---------- */
function TigaPasang({ cx, cy, skala = 1, setengah = false }: { cx: number; cy: number; skala?: number; setengah?: boolean }) {
  const s = skala;
  const posisi = [
    [-40, -14],
    [0, 8],
    [40, -14],
  ];
  return (
    <g>
      {posisi.map(([dx, dy], i) => (
        <g key={i}>
          <BentukKromosom x={cx + (dx - (setengah ? 0 : 9)) * s} y={cy + dy * s} tinggi={(54 - i * 8) * s} tebal={8 * s} warna={UNGU} kromatid={1} />
          {!setengah && (
            <BentukKromosom x={cx + (dx + 9) * s} y={cy + dy * s} tinggi={(54 - i * 8) * s} tebal={8 * s} warna={TOSKA} kromatid={1} />
          )}
        </g>
      ))}
    </g>
  );
}

function Ploidi() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Sel tubuh diploid, gamet haploid, dan zigot">
      {/* sel tubuh */}
      <SelBulat cx={170} cy={200} rx={120} ry={108} rInti={80}>
        <TigaPasang cx={170} cy={200} skala={1.1} />
      </SelBulat>
      <Keterangan x={170} y={346} ukuran={16} tebal={800}>
        sel tubuh · diploid
      </Keterangan>
      <Keterangan x={170} y={370} ukuran={14} warna={TINTA_LEMBUT} mono>
        2n = 46
      </Keterangan>

      {/* gamet */}
      <SelBulat cx={470} cy={140} rx={70} ry={64} rInti={46}>
        <TigaPasang cx={470} cy={140} skala={0.75} setengah />
      </SelBulat>
      <Keterangan x={470} y={230} ukuran={14} tebal={700}>
        sel telur · haploid
      </Keterangan>
      <Keterangan x={470} y={250} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        n = 23
      </Keterangan>

      <g transform="translate(470 350)">
        <ellipse cx={0} cy={0} rx={36} ry={30} fill={SEL.sitoplasma.warna} stroke={SEL.membranSel.warna} strokeWidth="4" />
        <path d="M 34 0 C 70 -20, 90 20, 130 0" fill="none" stroke={SEL.sitoskeleton.warna} strokeWidth="4" strokeLinecap="round" />
        <circle cx={0} cy={0} r={22} fill={SEL.inti.warna} fillOpacity="0.16" stroke={SEL.membranInti.warna} strokeWidth="3" />
        <TigaPasang cx={0} cy={0} skala={0.42} setengah />
      </g>
      <Keterangan x={470} y={410} ukuran={14} tebal={700}>
        sperma · haploid
      </Keterangan>
      <Keterangan x={470} y={430} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        n = 23
      </Keterangan>

      <Panah x1={560} y1={160} x2={640} y2={230} warna={TINTA_SAMAR} />
      <Panah x1={560} y1={340} x2={640} y2={270} warna={TINTA_SAMAR} />

      {/* zigot */}
      <SelBulat cx={710} cy={250} rx={74} ry={68} rInti={50}>
        <TigaPasang cx={710} cy={250} skala={0.72} />
      </SelBulat>
      <Keterangan x={710} y={346} ukuran={14} tebal={700}>
        zigot · diploid
      </Keterangan>
      <Keterangan x={710} y={366} ukuran={12.5} warna={TINTA_LEMBUT} mono>
        2n = 46
      </Keterangan>

      <Keterangan x={400} y={520} ukuran={12.5} warna={TINTA_SAMAR}>
        digambar 3 pasang saja dari 23 · ungu dari ibu, toska dari ayah
      </Keterangan>
    </svg>
  );
}

/* ---------- kromosom kelamin ---------- */
function Kelamin() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Kromosom kelamin XX pada perempuan dan XY pada laki-laki">
      <g>
        <BentukKromosom x={160} y={250} tinggi={230} tebal={26} warna={UNGU} telomer />
        <BentukKromosom x={250} y={250} tinggi={230} tebal={26} warna={TOSKA} telomer />
        <Keterangan x={205} y={430} ukuran={24} tebal={800} mono>
          XX
        </Keterangan>
        <Keterangan x={205} y={458} ukuran={15} warna={TINTA_LEMBUT}>
          perempuan
        </Keterangan>
      </g>
      <line x1="400" y1="80" x2="400" y2="490" stroke="#ede6d9" strokeWidth="2" />
      <g>
        <BentukKromosom x={550} y={250} tinggi={230} tebal={26} warna={UNGU} telomer />
        <BentukKromosom x={640} y={300} tinggi={90} tebal={24} warna={TOSKA} rasioP={0.42} telomer />
        <Keterangan x={595} y={430} ukuran={24} tebal={800} mono>
          XY
        </Keterangan>
        <Keterangan x={595} y={458} ukuran={15} warna={TINTA_LEMBUT}>
          laki-laki
        </Keterangan>
      </g>
      <LabelBagian x={550} y={140} teks="X · ± 900–1.400 gen" warna={UNGU} arah="kiri" kecil />
      <LabelBagian x={640} y={262} teks="Y · ± 70–200 gen" warna={TOSKA} arah="kanan" kecil />
      <Keterangan x={400} y={530} ukuran={13} warna={TINTA_SAMAR}>
        X dan Y homolog hanya di sebagian kecil ujungnya
      </Keterangan>
    </svg>
  );
}
