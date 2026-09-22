import { INTI, MOLEKUL, SEL } from "@/lib/warna";
import { Keterangan, LabelBagian, Panah, bulat } from "./bagian";

/**
 * INTI SEL — gambar utama pelajaran 0.3, juga dipinjam pelajaran 0.1 (tahap "inti").
 *
 * Tahap:
 *   utuh        inti dari dekat, lengkap
 *   dua-lapis   selaput ganda + sambungan ke RE kasar disorot
 *   pori        satu pori diperbesar sebagai cincin protein
 *   lalu-lintas RNA keluar, protein masuk
 *   kromatin    eukromatin longgar vs heterokromatin padat di tepi
 *   nukleosom   DNA melilit histon — manik-manik pada tali
 *   nukleolus   nukleolus dan subunit ribosom yang keluar
 *   ukuran      perbandingan 2 meter vs 6 mikrometer
 */

type Props = { tahap?: string; sorot?: string[] };

const PUSAT = { x: 400, y: 290 };
const RX = 236;
const RY = 196;

export function IntiSel({ tahap = "utuh" }: Props) {
  if (tahap === "pori") return <PoriDekat />;
  if (tahap === "nukleosom") return <Nukleosom />;
  if (tahap === "ukuran") return <Ukuran />;

  const sorotSelaput = tahap === "dua-lapis";
  const sorotKromatin = tahap === "kromatin";
  const sorotNukleolus = tahap === "nukleolus";
  const laluLintas = tahap === "lalu-lintas";

  const redup = (aktif: boolean) => (tahap === "utuh" || aktif ? 1 : 0.28);

  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Potongan melintang inti sel">
      <defs>
        <radialGradient id="isiIntiBesar" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor={SEL.inti.warna} stopOpacity="0.22" />
          <stop offset="100%" stopColor={SEL.inti.warna} stopOpacity="0.42" />
        </radialGradient>
        <clipPath id="dalamInti">
          <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={RX - 8} ry={RY - 8} />
        </clipPath>
      </defs>

      {/* sitoplasma di sekeliling */}
      <rect x="0" y="0" width="800" height="570" fill={SEL.sitoplasma.warna} fillOpacity="0.5" />

      {/* RE kasar menyambung ke selaput luar */}
      <g opacity={redup(sorotSelaput)}>
        {[
          "M 636 250 C 690 230, 730 262, 770 244",
          "M 638 292 C 692 272, 732 306, 772 288",
          "M 630 334 C 686 316, 728 348, 768 332",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={SEL.reKasar.warna} strokeWidth="12" strokeLinecap="round" />
        ))}
        {[
          [660, 240], [700, 246], [740, 252], [662, 282], [704, 290], [744, 296], [656, 324], [700, 334], [742, 340],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.6" fill={SEL.ribosom.warna} />
        ))}
      </g>

      {/* isi inti */}
      <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={RX} ry={RY} fill="url(#isiIntiBesar)" />

      {/* kromatin */}
      <g clipPath="url(#dalamInti)" opacity={redup(sorotKromatin || laluLintas)}>
        {/* eukromatin: benang longgar di tengah */}
        {BENANG_LONGGAR.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={SEL.kromatin.warna} strokeWidth="4.6" strokeLinecap="round" opacity="0.85" />
        ))}
        {/* heterokromatin: gumpalan padat menempel di tepi */}
        {GUMPALAN_PADAT.map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill={SEL.kromatin.warna} opacity="0.9" transform={`rotate(${i * 37} ${x} ${y})`} />
        ))}
      </g>

      {/* nukleolus */}
      <g opacity={redup(sorotNukleolus)}>
        <circle cx="352" cy="262" r="46" fill={SEL.nukleolus.warna} fillOpacity="0.9" />
        <circle cx="338" cy="248" r="12" fill="#ffffff" fillOpacity="0.16" />
        {sorotNukleolus && (
          <>
            {/* subunit ribosom berangkat menuju pori */}
            {[
              [412, 232, 560, 130],
              [404, 296, 596, 372],
            ].map(([x1, y1, x2, y2], i) => (
              <g key={i}>
                <Panah x1={x1} y1={y1} x2={x2 - 26} y2={y2 - 6} warna={SEL.ribosom.warna} />
                <circle cx={x1 + (x2 - x1) * 0.45} cy={y1 + (y2 - y1) * 0.45} r="7" fill={SEL.ribosom.warna} />
                <circle cx={x1 + (x2 - x1) * 0.75} cy={y1 + (y2 - y1) * 0.75} r="5.5" fill={SEL.ribosom.warna} />
              </g>
            ))}
          </>
        )}
      </g>

      {/* selaput ganda */}
      <g opacity={redup(sorotSelaput || laluLintas)}>
        <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={RX} ry={RY} fill="none" stroke={SEL.membranInti.warna} strokeWidth="8" />
        <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={RX - 16} ry={RY - 16} fill="none" stroke={SEL.membranInti.warna} strokeWidth="5" opacity="0.75" />
        {/* lamina: anyaman serat di bawah selaput dalam */}
        <ellipse cx={PUSAT.x} cy={PUSAT.y} rx={RX - 26} ry={RY - 26} fill="none" stroke={SEL.sitoskeleton.warna} strokeWidth="1.6" strokeDasharray="6 7" opacity="0.7" />
        {/* pori */}
        {SUDUT_PORI.map((s, i) => {
          const rad = (s * Math.PI) / 180;
          const x = bulat(PUSAT.x + (RX - 8) * Math.cos(rad));
          const y = bulat(PUSAT.y + (RY - 8) * Math.sin(rad));
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="11" fill={SEL.inti.warna} stroke={SEL.membranInti.warna} strokeWidth="3.5" />
              <circle cx={x} cy={y} r="3.2" fill={SEL.membranInti.warna} />
            </g>
          );
        })}
      </g>

      {/* lalu lintas dua arah */}
      {laluLintas && (
        <g>
          {/* RNA keluar lewat pori kanan-atas */}
          <Panah x1={470} y1={190} x2={610} y2={112} warna={MOLEKUL.rna.warna} tebal={3} />
          {[0.25, 0.5, 0.75].map((t, i) => (
            <path
              key={i}
              d={`M ${470 + 140 * t - 10} ${190 - 78 * t} q 5 -8 10 0 q 5 8 10 0`}
              fill="none"
              stroke={MOLEKUL.rna.warna}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
          <LabelBagian x={640} y={96} teks="RNA keluar" warna={MOLEKUL.rna.warna} kecil />

          {/* protein masuk lewat pori kiri-bawah */}
          <Panah x1={172} y1={470} x2={318} y2={392} warna={MOLEKUL.protein.warna} tebal={3} />
          {[0.2, 0.5, 0.8].map((t, i) => (
            <circle key={i} cx={172 + 146 * t} cy={470 - 78 * t} r="7" fill={MOLEKUL.protein.warna} />
          ))}
          <LabelBagian x={150} y={484} teks="Protein masuk" warna={MOLEKUL.protein.warna} arah="kanan" kecil />
        </g>
      )}

      {/* label tahap */}
      {sorotSelaput && (
        <>
          <LabelBagian x={PUSAT.x} y={PUSAT.y - RY} teks="Selaput luar" warna={SEL.membranInti.warna} />
          <LabelBagian x={PUSAT.x - 60} y={PUSAT.y - RY + 16} teks="Selaput dalam" warna={SEL.membranInti.warna} arah="kiri" />
          <LabelBagian x={636} y={250} teks="RE kasar" warna={SEL.reKasar.warna} />
        </>
      )}
      {sorotKromatin && (
        <>
          <LabelBagian x={420} y={330} teks="Eukromatin — longgar" warna={SEL.kromatin.warna} />
          <LabelBagian x={214} y={382} teks="Heterokromatin — padat" warna={SEL.kromatin.warna} arah="kanan" />
        </>
      )}
      {sorotNukleolus && <LabelBagian x={352} y={262} teks="Nukleolus" warna={SEL.nukleolus.warna} arah="kiri" />}
      {tahap === "utuh" && (
        <>
          <LabelBagian x={PUSAT.x - RX} y={PUSAT.y} teks="Membran inti" warna={SEL.membranInti.warna} arah="kanan" kecil />
          <LabelBagian x={352} y={262} teks="Nukleolus" warna={SEL.nukleolus.warna} arah="kiri" kecil />
          <LabelBagian x={470} y={330} teks="Kromatin" warna={SEL.kromatin.warna} kecil />
        </>
      )}
    </svg>
  );
}

/* ---------- pori inti diperbesar ---------- */
function PoriDekat() {
  const cx = 400;
  const cy = 300;
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Kompleks pori inti diperbesar">
      {/* sitoplasma atas, nukleoplasma bawah */}
      <rect x="0" y="0" width="800" height="260" fill={SEL.sitoplasma.warna} fillOpacity="0.5" />
      <rect x="0" y="340" width="800" height="230" fill={SEL.inti.warna} fillOpacity="0.2" />
      <Keterangan x={760} y={236} rata="end" warna="#5c6878" ukuran={13} mono>
        SITOPLASMA
      </Keterangan>
      <Keterangan x={760} y={540} rata="end" warna="#5c6878" ukuran={13} mono>
        DALAM INTI
      </Keterangan>

      {/* dua lapis selaput, terputus di tempat pori */}
      {[268, 332].map((y, i) => (
        <g key={i}>
          <rect x="0" y={y - 7} width={cx - 120} height="14" fill={SEL.membranInti.warna} rx="7" />
          <rect x={cx + 120} y={y - 7} width="400" height="14" fill={SEL.membranInti.warna} rx="7" />
        </g>
      ))}
      {/* selaput melengkung menyatu di tepi pori */}
      <path d={`M ${cx - 120} 268 C ${cx - 100} 268, ${cx - 100} 332, ${cx - 120} 332`} fill="none" stroke={SEL.membranInti.warna} strokeWidth="14" strokeLinecap="round" />
      <path d={`M ${cx + 120} 268 C ${cx + 100} 268, ${cx + 100} 332, ${cx + 120} 332`} fill="none" stroke={SEL.membranInti.warna} strokeWidth="14" strokeLinecap="round" />

      {/* cincin protein: delapan bagian, di atas dan di bawah */}
      {[-1, 1].map((sisi) =>
        [-3, -2, -1, 0, 1, 2, 3].map((k) => (
          <ellipse
            key={`${sisi}-${k}`}
            cx={cx + k * 30}
            cy={cy + sisi * 58}
            rx="16"
            ry="20"
            fill={MOLEKUL.protein.warna}
            stroke={SEL.membranInti.warna}
            strokeWidth="2"
          />
        )),
      )}
      {/* saluran tengah dengan anyaman penyaring */}
      <rect x={cx - 92} y={cy - 32} width="184" height="64" rx="32" fill={SEL.inti.warna} fillOpacity="0.25" stroke={MOLEKUL.protein.warna} strokeWidth="3" />
      {[-60, -30, 0, 30, 60].map((dx) => (
        <line key={dx} x1={cx + dx} y1={cy - 24} x2={cx + dx * 0.6} y2={cy + 24} stroke={MOLEKUL.protein.warna} strokeWidth="2" opacity="0.6" />
      ))}

      {/* molekul kecil lewat bebas; molekul besar butuh tanda pengenal */}
      <circle cx={cx - 40} cy={110} r="6" fill={SEL.sitoskeleton.warna} />
      <Panah x1={cx - 40} y1={124} x2={cx - 40} y2={400} warna={SEL.sitoskeleton.warna} tebal={2} />
      <Keterangan x={cx - 40} y={92} ukuran={12.5} warna="#5c6878">
        kecil: lewat bebas
      </Keterangan>

      <circle cx={cx + 60} cy={150} r="16" fill={MOLEKUL.protein.warna} />
      <rect x={cx + 70} y={132} width="22" height="12" rx="3" fill={INTI.telomer.warna} />
      <Panah x1={cx + 60} y1={170} x2={cx + 60} y2={400} warna={MOLEKUL.protein.warna} tebal={2.4} />
      <Keterangan x={cx + 60} y={118} ukuran={12.5} warna="#5c6878">
        besar: perlu tanda pengenal
      </Keterangan>

      <LabelBagian x={cx + 120} y={300} teks="Kompleks pori inti" warna={MOLEKUL.protein.warna} />
    </svg>
  );
}

/* ---------- nukleosom: manik-manik pada tali ---------- */
function Nukleosom() {
  const manik = [
    [130, 300], [230, 250], [330, 320], [430, 258], [530, 316], [630, 262],
  ];
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="DNA melilit histon membentuk nukleosom">
      <rect x="0" y="0" width="800" height="570" fill={SEL.inti.warna} fillOpacity="0.1" />

      {/* DNA penghubung antar manik */}
      <path
        d={`M 60 330 ${manik.map(([x, y]) => `L ${x - 34} ${y + 8}`).join(" ")} L 740 300`}
        fill="none"
        stroke={MOLEKUL.dna.warna}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {manik.map(([x, y], i) => (
        <g key={i}>
          {/* delapan histon = satu gulungan */}
          <circle cx={x} cy={y} r="30" fill={INTI.histon.warna} />
          {[0, 60, 120, 180, 240, 300].map((s) => (
            <circle key={s} cx={bulat(x + 14 * Math.cos((s * Math.PI) / 180))} cy={bulat(y + 14 * Math.sin((s * Math.PI) / 180))} r="8" fill={INTI.histon.warna} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
          ))}
          {/* DNA melilit hampir dua kali */}
          <circle cx={x} cy={y} r="35" fill="none" stroke={MOLEKUL.dna.warna} strokeWidth="5" strokeDasharray="190 30" transform={`rotate(${-120 + i * 20} ${x} ${y})`} />
          <circle cx={x} cy={y} r="41" fill="none" stroke={MOLEKUL.dna.warna} strokeWidth="5" strokeDasharray="170 90" transform={`rotate(${40 + i * 20} ${x} ${y})`} />
        </g>
      ))}

      <LabelBagian x={430} y={258} teks="Histon — delapan gulungan protein" warna={INTI.histon.warna} arah="kanan" />
      <LabelBagian x={280} y={344} teks="DNA melilit ±1,7 kali" warna={MOLEKUL.dna.warna} arah="kanan" kecil />
      <Keterangan x={400} y={470} ukuran={15} warna="#5c6878">
        Satu gulungan + DNA yang melilitnya = satu nukleosom (nucleosome)
      </Keterangan>
      <Keterangan x={400} y={500} ukuran={13} warna="#93897a" mono>
        11 nm
      </Keterangan>
    </svg>
  );
}

/* ---------- 2 meter vs 6 mikrometer ---------- */
function Ukuran() {
  return (
    <svg viewBox="0 0 800 570" className="h-full w-full" role="img" aria-label="Perbandingan panjang DNA dan lebar inti">
      {/* benang DNA panjang yang digulung memenuhi bidang */}
      <path
        d={GULUNGAN_PANJANG}
        fill="none"
        stroke={MOLEKUL.dna.warna}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <Keterangan x={400} y={176} ukuran={30} tebal={800}>
        2 meter
      </Keterangan>
      <Keterangan x={400} y={200} ukuran={14} warna="#5c6878">
        panjang seluruh DNA dalam satu sel, kalau diluruskan
      </Keterangan>

      <Panah x1={400} y1={218} x2={400} y2={262} warna="#93897a" />

      {/* inti kecil di tengah */}
      <ellipse cx="400" cy="336" rx="66" ry="56" fill={SEL.inti.warna} fillOpacity="0.35" stroke={SEL.membranInti.warna} strokeWidth="6" />
      <Keterangan x={400} y={342} ukuran={16} tebal={800} warna="#ffffff">
        6 µm
      </Keterangan>
      <Keterangan x={400} y={420} ukuran={14} warna="#5c6878">
        lebar inti sel
      </Keterangan>
      <Keterangan x={400} y={470} ukuran={22} tebal={800}>
        ≈ 330.000 kali lebih pendek
      </Keterangan>
      <Keterangan x={400} y={498} ukuran={13} warna="#93897a">
        Bagaimana caranya muat? Jawabannya di pelajaran 0.4.
      </Keterangan>
    </svg>
  );
}

/* ---------- data bentuk ---------- */

const BENANG_LONGGAR = [
  "M 250 200 C 300 170, 330 230, 390 200 C 450 170, 480 220, 520 196",
  "M 240 350 C 290 320, 320 380, 380 350 C 440 320, 470 372, 540 344",
  "M 300 300 C 340 280, 360 330, 420 302 C 470 280, 500 320, 560 290",
  "M 420 240 C 450 220, 470 250, 500 236",
  "M 270 250 C 300 268, 290 292, 262 300",
  "M 470 380 C 500 400, 520 372, 552 386",
];

const GUMPALAN_PADAT: [number, number, number][] = [
  [190, 250, 30], [200, 330, 26], [590, 220, 28], [612, 310, 30], [430, 118, 26], [380, 462, 28], [560, 420, 24],
];

const SUDUT_PORI = [12, 42, 74, 106, 140, 172, 204, 236, 268, 300, 332];

/* benang panjang berkelok memenuhi bagian atas */
const GULUNGAN_PANJANG = (() => {
  let d = "M 40 108";
  for (let i = 0; i < 30; i++) {
    const x = 40 + i * 25;
    d += ` C ${x + 8} 82, ${x + 17} 134, ${x + 25} 108`;
  }
  return d;
})();
