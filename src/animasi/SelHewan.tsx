import { SEL } from "@/lib/warna";

/**
 * SEL HEWAN — gambar utama pelajaran 0.2
 *
 * Seluruh sel digambar sebagai satu SVG. Bagian yang sedang dibicarakan
 * menyala penuh dengan warna tetapnya, sisanya meredup jadi abu-abu.
 * Inilah wujud nyata prinsip "warna sebagai alat belajar".
 *
 * Bentuknya sengaja tidak simetris — sel sungguhan tidak pernah berupa
 * lingkaran sempurna.
 */

type Props = {
  /** Id entitas yang sedang disorot. Kosong = semua menyala bersama. */
  sorot?: string[];
  /** Tampilkan nama bagian yang disorot di atas gambar. */
  tampilkanLabel?: boolean;
};

/** Titik tempat label digantung untuk tiap bagian. */
const LABEL: Record<string, { x: number; y: number; arah: "kiri" | "kanan" }> = {
  membranSel: { x: 400, y: 20, arah: "kanan" },
  sitoplasma: { x: 470, y: 120, arah: "kanan" },
  inti: { x: 290, y: 250, arah: "kiri" },
  membranInti: { x: 290, y: 138, arah: "kiri" },
  nukleolus: { x: 262, y: 230, arah: "kiri" },
  kromatin: { x: 340, y: 300, arah: "kanan" },
  mitokondria: { x: 600, y: 128, arah: "kanan" },
  ribosom: { x: 250, y: 545, arah: "kanan" },
  reKasar: { x: 505, y: 345, arah: "kanan" },
  reHalus: { x: 660, y: 452, arah: "kanan" },
  golgi: { x: 430, y: 480, arah: "kiri" },
  lisosom: { x: 150, y: 128, arah: "kiri" },
  peroksisom: { x: 110, y: 275, arah: "kiri" },
  vakuola: { x: 118, y: 358, arah: "kiri" },
  sitoskeleton: { x: 640, y: 210, arah: "kanan" },
  sentriol: { x: 448, y: 146, arah: "kanan" },
};

export function SelHewan({ sorot = [], tampilkanLabel = true }: Props) {
  const adaSorot = sorot.length > 0;
  const menyala = (id: string) => !adaSorot || sorot.includes(id);

  /** Gaya tiap bagian: menyala penuh atau meredup jadi abu-abu. */
  const gaya = (id: string): React.CSSProperties => ({
    transition: "opacity 600ms ease, filter 600ms ease",
    opacity: menyala(id) ? 1 : 0.16,
    filter: menyala(id) ? "none" : "grayscale(1)",
  });

  return (
    <svg
      viewBox="0 0 800 570"
      className="h-full w-full"
      role="img"
      aria-label={
        adaSorot
          ? `Diagram sel hewan, bagian yang disorot: ${sorot
              .map((s) => SEL[s as keyof typeof SEL]?.nama ?? s)
              .join(", ")}`
          : "Diagram sel hewan dengan seluruh organel berwarna"
      }
    >
      <defs>
        {/* Isi sitoplasma dibuat bergradasi tipis agar tidak terasa datar */}
        <radialGradient id="isiSitoplasma" cx="42%" cy="38%" r="78%">
          <stop offset="0%" stopColor={SEL.sitoplasma.warna} stopOpacity="0.55" />
          <stop offset="100%" stopColor={SEL.sitoplasma.warna} stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="isiInti" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor={SEL.inti.warna} stopOpacity="0.28" />
          <stop offset="100%" stopColor={SEL.inti.warna} stopOpacity="0.46" />
        </radialGradient>
        <clipPath id="batasInti">
          <ellipse cx="290" cy="250" rx="112" ry="101" />
        </clipPath>
        <clipPath id="batasSel">
          <path d={BENTUK_SEL} />
        </clipPath>
      </defs>

      {/* ---- SITOPLASMA + MEMBRAN SEL ---- */}
      <g style={gaya("sitoplasma")}>
        <path d={BENTUK_SEL} fill="url(#isiSitoplasma)" />
      </g>
      <g style={gaya("membranSel")}>
        <path
          d={BENTUK_SEL}
          fill="none"
          stroke={SEL.membranSel.warna}
          strokeWidth="9"
        />
        {/* Lapisan dalam — membran sel itu dwilapis lemak, bukan garis tunggal */}
        <path
          d={BENTUK_SEL}
          fill="none"
          stroke={SEL.membranSel.warna}
          strokeWidth="3"
          opacity="0.5"
          transform="translate(400 285) scale(0.972) translate(-400 -285)"
        />
      </g>

      {/* ---- SITOSKELETON ---- */}
      <g style={gaya("sitoskeleton")} clipPath="url(#batasSel)">
        {SERAT_SITOSKELETON.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={SEL.sitoskeleton.warna}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}
      </g>

      {/* ---- RETIKULUM ENDOPLASMA HALUS ---- */}
      <g style={gaya("reHalus")}>
        <REHalus />
      </g>

      {/* ---- RETIKULUM ENDOPLASMA KASAR ---- */}
      <g style={gaya("reKasar")}>
        <REKasar />
      </g>

      {/* ---- RIBOSOM BEBAS ---- */}
      <g style={gaya("ribosom")}>
        {RIBOSOM_BEBAS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.2" fill={SEL.ribosom.warna} />
        ))}
      </g>

      {/* ---- BADAN GOLGI ---- */}
      <g style={gaya("golgi")}>
        <Golgi x={430} y={452} />
      </g>

      {/* ---- MITOKONDRIA ---- */}
      <g style={gaya("mitokondria")}>
        <Mitokondria x={600} y={150} putar={-16} />
        <Mitokondria x={672} y={330} putar={68} skala={0.88} />
        <Mitokondria x={232} y={462} putar={-24} skala={0.94} />
      </g>

      {/* ---- LISOSOM ---- */}
      <g style={gaya("lisosom")}>
        <Lisosom x={168} y={158} r={27} />
        <Lisosom x={520} y={212} r={21} />
      </g>

      {/* ---- PEROKSISOM ---- */}
      <g style={gaya("peroksisom")}>
        <Peroksisom x={128} y={296} r={18} />
        <Peroksisom x={352} y={108} r={15} />
      </g>

      {/* ---- VAKUOLA ---- */}
      <g style={gaya("vakuola")}>
        <circle
          cx="136"
          cy="388"
          r="33"
          fill={SEL.vakuola.warna}
          fillOpacity="0.45"
          stroke={SEL.vakuola.warna}
          strokeWidth="3.4"
        />
      </g>

      {/* ---- SENTRIOL ---- */}
      <g style={gaya("sentriol")}>
        <Sentriol x={452} y={176} />
      </g>

      {/* ---- INTI SEL ---- */}
      <g style={gaya("inti")}>
        <ellipse cx="290" cy="250" rx="112" ry="101" fill="url(#isiInti)" />
      </g>

      {/* Kromatin digunting agar tidak bocor keluar dari inti */}
      <g style={gaya("kromatin")} clipPath="url(#batasInti)">
        {BENANG_KROMATIN.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={SEL.kromatin.warna}
            strokeWidth="4.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      </g>

      <g style={gaya("nukleolus")}>
        <circle
          cx="262"
          cy="232"
          r="31"
          fill={SEL.nukleolus.warna}
          fillOpacity="0.85"
        />
        <circle cx="253" cy="223" r="9" fill="#ffffff" fillOpacity="0.18" />
      </g>

      {/* Membran inti digambar terakhir agar garisnya bersih di atas isi inti */}
      <g style={gaya("membranInti")}>
        <ellipse
          cx="290"
          cy="250"
          rx="112"
          ry="101"
          fill="none"
          stroke={SEL.membranInti.warna}
          strokeWidth="7"
        />
        <ellipse
          cx="290"
          cy="250"
          rx="104"
          ry="93"
          fill="none"
          stroke={SEL.membranInti.warna}
          strokeWidth="3"
          opacity="0.6"
        />
        {/* Pori inti — gerbang keluar-masuknya RNA dan protein */}
        {PORI_INTI.map((sudut, i) => {
          const rad = (sudut * Math.PI) / 180;
          const x = 290 + 108 * Math.cos(rad);
          const y = 250 + 97 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5.6"
              fill={SEL.inti.warna}
              stroke={SEL.membranInti.warna}
              strokeWidth="2.2"
            />
          );
        })}
      </g>

      {/* ---- LABEL BAGIAN YANG DISOROT ---- */}
      {tampilkanLabel &&
        sorot.map((id) => {
          const entitas = SEL[id as keyof typeof SEL];
          const posisi = LABEL[id];
          if (!entitas || !posisi) return null;
          return (
            <LabelBagian
              key={id}
              x={posisi.x}
              y={posisi.y}
              arah={posisi.arah}
              teks={entitas.nama}
              warna={entitas.warna}
            />
          );
        })}
    </svg>
  );
}

/* ================================================================== *
 * BENTUK-BENTUK DASAR
 * ================================================================== */

/** Batas luar sel — sengaja tidak simetris. */
const BENTUK_SEL = `M 400 36
  C 556 28, 720 94, 752 232
  C 780 354, 702 488, 556 524
  C 404 560, 198 542, 108 454
  C 30 376, 32 214, 122 124
  C 192 54, 300 42, 400 36 Z`;

const PORI_INTI = [22, 68, 118, 162, 208, 252, 298, 338];

const BENANG_KROMATIN = [
  "M 210 210 C 250 186, 268 232, 310 206 C 348 182, 372 220, 366 250",
  "M 198 268 C 238 250, 252 296, 296 282 C 338 268, 356 300, 344 322",
  "M 232 318 C 262 300, 286 330, 322 316",
  "M 306 180 C 334 168, 352 190, 348 208",
  "M 214 244 C 236 262, 224 288, 206 292",
];

const SERAT_SITOSKELETON = [
  "M 120 150 C 260 230, 420 120, 600 200 C 690 240, 730 320, 700 420",
  "M 90 330 C 220 380, 300 460, 470 500",
  "M 420 60 C 450 200, 520 300, 660 350",
  "M 150 480 C 260 420, 340 380, 520 400",
  "M 690 120 C 620 240, 560 300, 470 340",
];

const RIBOSOM_BEBAS: [number, number][] = [
  [452, 268], [478, 300], [430, 316], [498, 262], [520, 300],
  [186, 348], [212, 372], [166, 396], [242, 340],
  [560, 400], [596, 372], [536, 366],
  [352, 396], [388, 372], [318, 372],
  [432, 148], [404, 210], [472, 116],
  [624, 470], [588, 498], [268, 512], [318, 496], [206, 236],
];

function Mitokondria({
  x,
  y,
  putar = 0,
  skala = 1,
}: {
  x: number;
  y: number;
  putar?: number;
  skala?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar}) scale(${skala})`}>
      <path
        d="M -50 -8 C -53 -28, -28 -35, -6 -30 C 18 -25, 48 -28, 50 -5
           C 52 18, 27 32, 2 27 C -23 22, -47 14, -50 -8 Z"
        fill={SEL.mitokondria.warna}
        fillOpacity="0.28"
        stroke={SEL.mitokondria.warna}
        strokeWidth="4"
      />
      {/* Krista — lipatan membran dalam tempat energi dihasilkan */}
      {[-34, -16, 2, 20, 36].map((cx, i) => (
        <path
          key={i}
          d={`M ${cx} ${-26 + i * 0.8} C ${cx + 11} ${-12}, ${cx - 9} ${2}, ${cx + 6} ${18 - i}`}
          fill="none"
          stroke={SEL.mitokondria.warna}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.82"
        />
      ))}
    </g>
  );
}

function REKasar() {
  /* Kantung berlapis tepat di sebelah inti, bertabur ribosom di permukaannya */
  const lapisan = [
    "M 402 296 C 452 276, 520 306, 574 288",
    "M 400 322 C 452 302, 524 332, 580 314",
    "M 404 348 C 456 328, 526 358, 578 342",
    "M 412 374 C 462 356, 522 382, 568 370",
  ];
  const titikRibosom: [number, number][] = [
    [424, 288], [462, 285], [500, 294], [538, 293], [566, 285],
    [422, 314], [460, 311], [500, 320], [540, 321], [572, 312],
    [428, 340], [466, 337], [504, 346], [542, 348], [570, 340],
    [436, 367], [472, 363], [508, 372], [544, 371],
  ];
  return (
    <g>
      {lapisan.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={SEL.reKasar.warna}
          strokeWidth="11"
          strokeLinecap="round"
        />
      ))}
      {titikRibosom.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.4" fill={SEL.ribosom.warna} />
      ))}
    </g>
  );
}

function REHalus() {
  /* Tabung bercabang tanpa ribosom, jauh dari inti */
  const tabung = [
    "M 592 452 C 630 426, 660 470, 700 444",
    "M 600 482 C 640 458, 668 498, 712 472",
    "M 616 424 C 646 404, 668 430, 694 416",
    "M 640 500 C 668 486, 690 504, 716 494",
  ];
  return (
    <g>
      {tabung.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={SEL.reHalus.warna}
          strokeWidth="10"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

function Golgi({ x, y }: { x: number; y: number }) {
  const lebar = [46, 54, 60, 54, 44];
  return (
    <g transform={`translate(${x} ${y}) rotate(-8)`}>
      {lebar.map((l, i) => (
        <path
          key={i}
          d={`M ${-l} ${i * 15 - 30} C ${-l * 0.4} ${i * 15 - 42}, ${l * 0.4} ${i * 15 - 42}, ${l} ${i * 15 - 30}`}
          fill="none"
          stroke={SEL.golgi.warna}
          strokeWidth="9"
          strokeLinecap="round"
        />
      ))}
      {/* Gelembung kiriman yang baru lepas dari Golgi */}
      {[
        [-66, 26],
        [70, 18],
        [14, 44],
      ].map(([gx, gy], i) => (
        <circle
          key={i}
          cx={gx}
          cy={gy}
          r={7 - i}
          fill={SEL.golgi.warna}
          fillOpacity="0.75"
        />
      ))}
    </g>
  );
}

function Lisosom({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={r}
        fill={SEL.lisosom.warna}
        fillOpacity="0.32"
        stroke={SEL.lisosom.warna}
        strokeWidth="3.6"
      />
      {/* Butiran enzim pencerna di dalamnya */}
      {[
        [-7, -6],
        [6, -3],
        [-2, 8],
        [9, 7],
      ].map(([bx, by], i) => (
        <circle
          key={i}
          cx={bx * (r / 27)}
          cy={by * (r / 27)}
          r={3 * (r / 27)}
          fill={SEL.lisosom.warna}
        />
      ))}
    </g>
  );
}

function Peroksisom({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={r}
        fill={SEL.peroksisom.warna}
        fillOpacity="0.34"
        stroke={SEL.peroksisom.warna}
        strokeWidth="3.4"
      />
      {/* Inti kristal yang khas pada peroksisom */}
      <rect
        x={-r * 0.36}
        y={-r * 0.36}
        width={r * 0.72}
        height={r * 0.72}
        rx="2"
        fill={SEL.peroksisom.warna}
        transform="rotate(18)"
      />
    </g>
  );
}

function Sentriol({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Dua silinder yang selalu tegak lurus satu sama lain */}
      <g transform="rotate(-12)">
        <rect
          x="-26"
          y="-9"
          width="52"
          height="18"
          rx="4"
          fill={SEL.sentriol.warna}
          fillOpacity="0.35"
          stroke={SEL.sentriol.warna}
          strokeWidth="3"
        />
        {[-18, -9, 0, 9, 18].map((lx) => (
          <line
            key={lx}
            x1={lx}
            y1="-9"
            x2={lx}
            y2="9"
            stroke={SEL.sentriol.warna}
            strokeWidth="2.2"
          />
        ))}
      </g>
      <g transform="translate(6 24) rotate(78)">
        <rect
          x="-24"
          y="-8"
          width="48"
          height="16"
          rx="4"
          fill={SEL.sentriol.warna}
          fillOpacity="0.35"
          stroke={SEL.sentriol.warna}
          strokeWidth="3"
        />
        {[-16, -8, 0, 8, 16].map((lx) => (
          <line
            key={lx}
            x1={lx}
            y1="-8"
            x2={lx}
            y2="8"
            stroke={SEL.sentriol.warna}
            strokeWidth="2.2"
          />
        ))}
      </g>
    </g>
  );
}

/** Nama bagian yang disorot — warna tidak boleh jadi satu-satunya penanda. */
function LabelBagian({
  x,
  y,
  teks,
  warna,
  arah,
}: {
  x: number;
  y: number;
  teks: string;
  warna: string;
  arah: "kiri" | "kanan";
}) {
  const lebar = teks.length * 8.4 + 30;
  const tx = arah === "kanan" ? x + 14 : x - lebar - 14;
  return (
    <g style={{ pointerEvents: "none" }}>
      <circle cx={x} cy={y} r="5" fill={warna} />
      <line
        x1={x}
        y1={y}
        x2={arah === "kanan" ? tx : tx + lebar}
        y2={y}
        stroke={warna}
        strokeWidth="2"
      />
      <rect
        x={tx}
        y={y - 15}
        width={lebar}
        height="30"
        rx="15"
        fill={warna}
      />
      <text
        x={tx + lebar / 2}
        y={y + 5}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="15"
        fontWeight="650"
        fontFamily="var(--font-jakarta), system-ui, sans-serif"
      >
        {teks}
      </text>
    </g>
  );
}
