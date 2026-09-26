import * as THREE from "three";
import { SEL, SIFAT } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { alas, aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan, bangunBiji, bangunGamet, bangunTumpukan, bijiDari, GAMET, type Biji } from "./model-mendel";
import { bangunHomolog, garis, kali, lantai, muncul, selTembus, tahapan, tulis, type Homolog } from "./bantu";

/**
 * SET PELAJARAN 2.2 (dan persilangan 2.5) — monohibrid dan Hukum Mendel I.
 *
 *  silang     P: dua tumpukan biji galur murni × → F1 (dipakai juga dihibrid)
 *  hitung     F2: 5.474 bulat : 1.850 keriput; grafik batang tujuh sifat
 *  segregasi  sel tanaman Rr; pasangan alel berpisah ke dua gamet
 *  pembuahan  gamet ♀ dan ♂ bertemu acak → RR, Rr, rR, rr
 *  meiosis    metafase I → anafase I: homolog R dan r ditarik ke kutub berbeda
 *  sampel     empat biji bisa menyimpang; ratusan biji mendekati 3 : 1
 */

const NETRAL_TUA = "#a99f90";
const NETRAL_MUDA = "#e6dfd3";

/* ================================================================== *
 * SILANG — P × P → F1
 * ================================================================== */

export function buatSetSilang(o: { a: string; b: string; f1: string; ketA: string; ketB: string; ketF1: string }) {
  return (studio: Studio): Set3D => {
    const grup = new THREE.Group();
    const acak = pembuatAcak(o.a.length * 7);
    const induk = [
      { x: -7, gen: o.a, ket: o.ketA },
      { x: -1.6, gen: o.b, ket: o.ketB },
    ];
    for (const d of induk) {
      alas(studio, grup, d.x, 0, 2.1);
      const tp = bangunTumpukan(studio, grup, 20, bijiDari(d.gen), acak, 0.24);
      tp.position.set(d.x, 0.55, 0.3);
      const b = bangunBiji(studio, grup, bijiDari(d.gen), 0.7);
      b.position.set(d.x, 3.3, 0);
      tulis(grup, d.gen, 0.65, d.x, -0.45, 2.2);
      tulis(grup, d.ket, 0.48, d.x, -1.25, 2.2);
    }
    kali(grup, -4.3, 1.6, 0.8);
    tulis(grup, "P", 0.9, -4.3, 5.4);
    panah(studio, grup, [v(0.9, 1.8, 0), v(2.6, 2.4, 0), v(4.2, 1.8, 0)], 0.07);
    const f1 = new THREE.Group();
    f1.position.set(6.6, 0, 0);
    grup.add(f1);
    alas(studio, f1, 0, 0, 2.1);
    const tf = bangunTumpukan(studio, f1, 22, bijiDari(o.f1), acak, 0.24);
    tf.position.set(0, 0.55, 0.3);
    const bf = bangunBiji(studio, f1, bijiDari(o.f1), 0.7);
    bf.position.set(0, 3.3, 0);
    tulis(f1, o.f1, 0.65, 0, -0.45, 2.2);
    tulis(f1, o.ketF1, 0.48, 0, -1.25, 2.2);
    tulis(f1, "F1", 0.9, 0, 5.4);
    f1.visible = false;
    const putar = [bf];
    lantai(grup, 22, 6);
    return {
      grup,
      fokus: {
        utuh: lihat(-0.2, 2, 0, 24, 0, 1.25),
        p: lihat(-4.3, 2.2, 0, 17, 0, 1.25),
        f1: lihat(0.5, 2, 0, 23, 0.05, 1.25),
      },
      bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
      perbarui: (p, dt) => {
        const t = p.detik ?? 0;
        muncul(f1, p.fokus !== "p", dt, 1, 3);
        putar.forEach((b) => (b.rotation.y = t * 0.4));
      },
    };
  };
}

/* ================================================================== *
 * HITUNG — data F2
 * ================================================================== */

type DataSifat = { nama: string; dom: number; res: number; warnaDom?: [string, string]; warnaRes?: [string, string] };

const DATA_MENDEL: DataSifat[] = [
  { nama: "bentuk biji", dom: 5474, res: 1850 },
  { nama: "warna biji", dom: 6022, res: 2001, warnaDom: ["bijiKuning", SIFAT.bijiKuning.warna], warnaRes: ["bijiHijau", SIFAT.bijiHijau.warna] },
  { nama: "warna bunga", dom: 705, res: 224, warnaDom: ["bungaUngu", SIFAT.bungaUngu.warna], warnaRes: ["bungaPutih", SIFAT.bungaPutih.warna] },
  { nama: "bentuk polong", dom: 882, res: 299 },
  { nama: "warna polong", dom: 428, res: 152, warnaDom: ["polongHijau", SIFAT.polongHijau.warna], warnaRes: ["polongKuning", SIFAT.polongKuning.warna] },
  { nama: "letak bunga", dom: 651, res: 207 },
  { nama: "tinggi batang", dom: 787, res: 277 },
];

export function setHitung(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(5474);
  /* tumpukan F2: 5.474 : 1.850 ≈ 45 : 15 biji */
  alas(studio, grup, -3, 0, 2.3);
  const bulat = bangunTumpukan(studio, grup, 45, { warna: "kuning", bentuk: "bulat" }, acak, 0.22);
  bulat.position.set(-4.2, 0.55, 0.2);
  const keriput = bangunTumpukan(studio, grup, 15, { warna: "kuning", bentuk: "keriput" }, acak, 0.22);
  keriput.position.set(-1.6, 0.55, 0.2);
  tulis(grup, "5.474 bulat", 0.45, -4.4, -0.45, 2.4);
  tulis(grup, "1.850 keriput", 0.45, -1.4, -0.45, 2.4);
  tulis(grup, "F2", 0.9, -3, 4.2);
  const lRasio = labelHidup(grup, "≈ 3 : 1", 0.7);

  /* grafik: tiap sifat satu batang setinggi 5; bagian bawah = dominan */
  const X0 = 6;
  const TINGGI = 5;
  const Y0 = 0.3;
  DATA_MENDEL.forEach((d, i) => {
    const x = X0 + i * 2.1;
    const fd = d.dom / (d.dom + d.res);
    const hd = TINGGI * fd;
    const bDom = bahan(studio, `batangDom-${d.warnaDom?.[0] ?? "netral"}`, [d.warnaDom?.[0] ?? "dominan"], d.warnaDom?.[1] ?? NETRAL_TUA, 0.004);
    const bRes = bahan(studio, `batangRes-${d.warnaRes?.[0] ?? "netral"}`, [d.warnaRes?.[0] ?? "resesif"], d.warnaRes?.[1] ?? NETRAL_MUDA, 0.004);
    const g1 = new THREE.BoxGeometry(1.1, hd, 0.6);
    g1.translate(x, Y0 + hd / 2, 0);
    studio.tambah(bDom, g1, grup);
    const g2 = new THREE.BoxGeometry(1.1, TINGGI - hd, 0.6);
    g2.translate(x, Y0 + hd + (TINGGI - hd) / 2, 0);
    studio.tambah(bRes, g2, grup);
    tulis(grup, d.nama, 0.4, x, i % 2 === 0 ? -0.25 : -0.95, 0.6);
    tulis(grup, `${(d.dom / d.res).toFixed(2).replace(".", ",")} : 1`, 0.42, x, Y0 + TINGGI + 0.5, 0);
  });
  const y34 = Y0 + TINGGI * 0.75;
  garis(studio, grup, v(X0 - 0.9, y34, 0.35), v(X0 + 6 * 2.1 + 0.9, y34, 0.35), 0.035);
  tulis(grup, "¾", 0.45, X0 - 1.4, y34, 0.35);
  tulis(grup, "bawah: sifat dominan · atas: sifat resesif", 0.45, X0 + 6.3, -1.8, 0.6);
  lantai(grup, 9, 5, -3);
  lantai(grup, 17, 4, X0 + 6.3);
  return {
    grup,
    fokus: {
      utuh: lihat(-3, 1.6, 0, 12.5, 0, 1.25),
      data: lihat(X0 + 6.3, 2.3, 0, 19.5, 0, 1.42),
    },
    bayangan: { pusat: v(4, 0, 0), jangkauan: 15 },
    perbarui: (p, dt) => aturLabel(lRasio, p.fokus !== "data", dt, v(-3, 3.2, 0)),
  };
}

/* ================================================================== *
 * SEGREGASI — pasangan alel berpisah ke gamet
 * ================================================================== */

export function setSegregasi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3.6;
  const sel = selTembus(studio, grup, 2.6, "selTanaman", "#e4ecd8");
  sel.position.set(0, Y, 0);
  tulis(grup, "sel tanaman Rr", 0.5, 0, Y + 3.1);
  const homolog: Homolog[] = [
    bangunHomolog(studio, grup, "R", "kromatin", { sisi: -1, ukuranHuruf: 0.6 }),
    bangunHomolog(studio, grup, "r", "kromosomAyah", { sisi: 1, ukuranHuruf: 0.6 }),
  ];
  homolog.forEach((h) => h.grup.scale.setScalar(1.35));
  const gamet = [-1, 1].map((s) => {
    const g = new THREE.Group();
    g.position.set(s * 6.2, Y, 0);
    grup.add(g);
    selTembus(studio, g, 1.7, "gametTembus", GAMET, "gamet", 0.4);
    return g;
  });
  const lGamet = [labelHidup(grup, "gamet R", 0.5), labelHidup(grup, "gamet r", 0.5)];
  const lPasang = labelHidup(grup, "sepasang alel", 0.5);
  const jam = buatJamTahap();
  let pisah = 0;
  lantai(grup, 16, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y, 0, 14, 0, 1.35),
      gamet: lihat(0, Y, 0, 18.5, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = f === "gamet" ? tahapan(j, 0.4, 2.2) : 0;
      pisah = pelan(pisah, t, 6, dt);
      homolog.forEach((h, i) => {
        const s = i === 0 ? -1 : 1;
        h.grup.position.set(s * (0.55 + 5.65 * pisah), Y + 0.35 + Math.sin(pisah * Math.PI) * 0.8, 0);
      });
      gamet.forEach((g) => muncul(g, f === "gamet", dt, 1, 3));
      lGamet.forEach((l, i) => aturLabel(l, f === "gamet" && pisah > 0.8, dt, v((i === 0 ? -1 : 1) * 6.2, Y - 2.4, 0.6)));
      aturLabel(lPasang, f !== "gamet", dt, v(0, Y - 2, 0.8));
      sel.scale.setScalar(1 - 0.15 * pisah);
    },
  };
}

/* ================================================================== *
 * PEMBUAHAN — gamet bertemu acak
 * ================================================================== */

export function setPembuahan(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const SUMBER = {
    betina: { R: v(-7, 5, 0), r: v(-4.4, 5, 0), induk: v(-5.7, 7.6, 0) },
    jantan: { R: v(4.4, 5, 0), r: v(7, 5, 0), induk: v(5.7, 7.6, 0) },
  };
  for (const [k, s] of Object.entries(SUMBER)) {
    const g = bangunGamet(studio, grup, "Rr", 0.8);
    g.position.copy(s.induk);
    tulis(grup, k === "betina" ? "induk betina" : "induk jantan", 0.5, s.induk.x, s.induk.y + 1.3, 0);
  }
  const gametSumber = [
    ...(["R", "r"] as const).map((a) => ({ g: bangunGamet(studio, grup, a, 0.55), pos: SUMBER.betina[a] })),
    ...(["R", "r"] as const).map((a) => ({ g: bangunGamet(studio, grup, a, 0.55), pos: SUMBER.jantan[a] })),
  ];
  gametSumber.forEach(({ g, pos }) => g.position.copy(pos));
  const lSetengah = [
    labelHidup(grup, "½ R", 0.5),
    labelHidup(grup, "½ r", 0.5),
    labelHidup(grup, "½ R", 0.5),
    labelHidup(grup, "½ r", 0.5),
  ];
  /* empat pertemuan: (♀, ♂) */
  const KOMBINASI: [string, string][] = [
    ["R", "R"],
    ["R", "r"],
    ["r", "R"],
    ["r", "r"],
  ];
  const X = [-4.8, -1.6, 1.6, 4.8];
  const Y_ANAK = 1.3;
  const pertemuan = KOMBINASI.map(([b, j], i) => {
    const gb = bangunGamet(studio, grup, b, 0.45);
    const gj = bangunGamet(studio, grup, j, 0.45);
    const anak = new THREE.Group();
    anak.position.set(X[i], Y_ANAK, 0);
    grup.add(anak);
    const gen = b === "R" || j === "R" ? (b === "R" && j === "R" ? "RR" : "Rr") : "rr";
    const biji = bangunBiji(studio, anak, bijiDari(gen), 0.7);
    biji.position.y = 0.25;
    tulis(anak, gen, 0.7, 0, -0.95, 0.9);
    tulis(anak, gen === "rr" ? "keriput" : "bulat", 0.48, 0, -1.75, 0.9);
    anak.visible = false;
    return {
      gb,
      gj,
      anak,
      biji,
      dari: [SUMBER.betina[b as "R" | "r"], SUMBER.jantan[j as "R" | "r"]],
    };
  });
  const papan = new THREE.BoxGeometry(12.6, 0.4, 2.6);
  papan.translate(0, 0.2, 0);
  studio.tambah(bahan(studio, "alasPanjang", ["alas"], "#e4dfd5", 0.004), papan, grup);
  const jam = buatJamTahap();
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 3.8, 0, 22, 0, 1.36),
      gamet: lihat(0, 5.6, 0, 19, 0, 1.36),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = p.detik ?? 0;
      lSetengah.forEach((l, i) => aturLabel(l, true, dt, gametSumber[i].pos.clone().add(v(0, -1, 0.5))));
      pertemuan.forEach((m, i) => {
        /* di fokus gamet belum ada pertemuan; di utuh berjalan satu per satu */
        const u = f === "utuh" ? tahapan(j, 0.3 + i * 0.9, 1.3) : 0;
        const tujuan = v(X[i], Y_ANAK + 0.1, 0);
        const jalan = (dari: THREE.Vector3, sisi: number) => {
          const tengah = dari.clone().lerp(tujuan, 0.5).add(v(sisi * 0.8, 1.2, 0.6));
          return new THREE.QuadraticBezierCurve3(dari, tengah, tujuan).getPoint(Math.min(1, u));
        };
        m.gb.position.copy(jalan(m.dari[0], -1));
        m.gj.position.copy(jalan(m.dari[1], 1));
        const tiba = u > 0.97;
        m.gb.visible = m.gj.visible = u > 0.01 && !tiba;
        muncul(m.anak, tiba, dt, 1, 5);
        m.biji.rotation.y = t * 0.5 + i;
      });
    },
  };
}

/* ================================================================== *
 * MEIOSIS — anafase I memisahkan R dan r
 * ================================================================== */

export function setMeiosis(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const sel = selTembus(studio, grup, 4.6, "membranSel", SEL.membranSel.warna, "membranSel", 0.1);
  sel.position.set(0, Y, 0);
  const kutub = [-1, 1].map((s) => {
    const k = studio.tambah(bahan(studio, "sentriol", ["sentriol"], SEL.sentriol.warna, 0.003), new THREE.CylinderGeometry(0.16, 0.16, 0.6, 12), grup);
    k.rotation.z = Math.PI / 2;
    k.position.set(s * 4, Y, 0);
    return k.position;
  });
  const homolog: Homolog[] = [
    bangunHomolog(studio, grup, "R", "kromatin", { sisi: -1, kromatid: 2, ukuranHuruf: 0.55 }),
    bangunHomolog(studio, grup, "r", "kromosomAyah", { sisi: 1, kromatid: 2, ukuranHuruf: 0.55 }),
  ];
  homolog.forEach((h) => h.grup.scale.setScalar(1.3));
  /* benang gelendong: kutub → sentromer, dibuat ulang tiap detak lewat skala */
  const benang = homolog.map((_, i) => {
    const g = new THREE.Group();
    grup.add(g);
    for (const dz of [-0.25, 0, 0.25]) {
      const m = garis(studio, g, v(0, 0, 0), v(1, 0, 0), 0.03, "#7d8791", "benang");
      m.position.z = dz;
    }
    g.userData.sisi = i === 0 ? -1 : 1;
    return g;
  });
  tulis(grup, "kutub", 0.45, -4, Y + 0.9, 0);
  tulis(grup, "kutub", 0.45, 4, Y + 0.9, 0);
  const lMeta = labelHidup(grup, "metafase I: homolog berpasangan di tengah", 0.5);
  const lAna = labelHidup(grup, "anafase I: homolog berpisah", 0.5);
  const jam = buatJamTahap();
  let pisah = 0;
  lantai(grup, 12, 7);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y - 0.3, 0, 15, 0.15, 1.35),
      pisah: lihat(0, Y - 0.3, 0, 15, 0.15, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 8 },
    perbarui: (p, dt) => {
      const j = jam(p);
      const sasaran = p.fokus === "pisah" ? tahapan(j, 0.3, 2.5) : 0;
      pisah = pelan(pisah, sasaran, 8, dt);
      homolog.forEach((h, i) => {
        const s = i === 0 ? -1 : 1;
        h.grup.position.set(s * (0.9 + 2 * pisah), Y + 0.5, 0);
        const b = benang[i];
        const ujung = h.grup.position;
        const awal = kutub[i];
        b.position.copy(awal);
        const panjang = Math.max(0.05, awal.distanceTo(ujung) - 0.3);
        b.rotation.z = Math.atan2(ujung.y - awal.y, ujung.x - awal.x);
        b.scale.x = panjang;
      });
      aturLabel(lMeta, p.fokus !== "pisah", dt, v(0, Y - 3.3, 1));
      aturLabel(lAna, p.fokus === "pisah", dt, v(0, Y - 3.3, 1));
    },
  };
}

/* ================================================================== *
 * SAMPEL — sedikit vs banyak
 * ================================================================== */

export function setSampel(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(1850);
  const nampan = bahan(studio, "nampan", ["nampan"], "#e4dfd5", 0.004);
  /* tiga percobaan empat biji: hasilnya berbeda-beda */
  const COBA: Biji["bentuk"][][] = [
    ["bulat", "bulat", "bulat", "bulat"],
    ["bulat", "keriput", "bulat", "keriput"],
    ["bulat", "bulat", "keriput", "bulat"],
  ];
  const HASIL = ["4 : 0", "2 : 2", "3 : 1"];
  COBA.forEach((c, i) => {
    const x = -10 + i * 3.2;
    const n = new THREE.BoxGeometry(2.7, 0.3, 1.6);
    n.translate(x, 0.15, 0);
    studio.tambah(nampan, n, grup);
    c.forEach((bentuk, k) => {
      const b = bangunBiji(studio, grup, { warna: "kuning", bentuk }, 0.3);
      b.position.set(x - 0.9 + k * 0.6, 0.6, 0);
    });
    tulis(grup, HASIL[i], 0.45, x, 1.6, 0);
  });
  tulis(grup, "4 biji: hasil berubah-ubah", 0.5, -6.8, -0.7, 1);
  /* ratusan biji: 90 : 30 */
  alas(studio, grup, 5.5, 0, 3);
  const bulat = bangunTumpukan(studio, grup, 90, { warna: "kuning", bentuk: "bulat" }, acak, 0.2);
  bulat.position.set(4.3, 0.55, 0);
  const keriput = bangunTumpukan(studio, grup, 30, { warna: "kuning", bentuk: "keriput" }, acak, 0.2);
  keriput.position.set(7.2, 0.55, 0);
  tulis(grup, "ratusan biji: ≈ 3 : 1", 0.5, 5.5, -0.7, 3.2);
  lantai(grup, 12, 4, -6.8);
  lantai(grup, 9, 7, 5.5);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.5, 1, 0, 24, 0, 1.2),
      sedikit: lihat(-6.8, 0.8, 0, 12, 0, 1.12),
      banyak: lihat(5.5, 1.2, 0, 12, 0.1, 1.12),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 12 },
  };
}
