import * as THREE from "three";
import { SEL } from "@/lib/warna";
import { lihat, type Studio } from "../studio";
import { pembuatAcak } from "../bentuk";
import { buatLabel } from "../label3d";
import { bangunSosok } from "../model-sosok";
import { bangunKromosom, KROMOSOM_MANUSIA, type AsalKromosom } from "../model-kromosom";
import { aturLabel, buatJamTahap, labelHidup, panah, pelan, v, type Set3D } from "../rangkai-set";
import { bahan } from "../mendel/model-mendel";
import { garis, kali, lantai, selTembus, tahapan, tulis } from "../mendel/bantu";
import { bangunBulir } from "../perluasan/model-perluasan";
import { bangunKromosomKelamin } from "../kelamin/model-kelamin";
import { bangunKromosomRuas, bangunSemangka, type Ruas } from "./model-mutasi";

/**
 * SET PELAJARAN 5.3–5.5 — aneuploidi, poliploidi, struktur kromosom.
 */

const kecil = (studio: Studio, induk: THREE.Object3D, asal: AsalKromosom, panjang = 1.6, jari = 0.2, kromatid: 1 | 2 = 1) => {
  const g = new THREE.Group();
  induk.add(g);
  bangunKromosom(studio, g, { p: panjang * 0.4, q: panjang * 0.6, jari, asal }, kromatid);
  return g;
};

/* ================================================================== *
 * NONDISJUNCTION
 * ================================================================== */

export function setNondisjunction(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const sel = selTembus(studio, grup, 2.4, "membranSel", SEL.membranSel.warna, "membranSel", 0.1);
  sel.position.set(-7, Y, 0);
  const pasangan = [kecil(studio, grup, "kromatin", 2, 0.24, 2), kecil(studio, grup, "kromosomAyah", 2, 0.24, 2)];
  tulis(grup, "pasangan homolog", 0.62, -7, Y + 3);
  /* empat gamet hasil: dua n + 1, dua n − 1 (meiosis I) atau n + 1, n − 1, n, n (meiosis II) */
  const gamet = [0, 1, 2, 3].map((i) => {
    const g = new THREE.Group();
    g.position.set(-0.5 + i * 3, Y, 0);
    grup.add(g);
    selTembus(studio, g, 1.2, "gametTembus", "#efe3c6", "gamet", 0.35);
    return g;
  });
  const isiMI = [
    [kecil(studio, gamet[0], "kromatin"), kecil(studio, gamet[0], "kromosomAyah")],
    [kecil(studio, gamet[1], "kromatin"), kecil(studio, gamet[1], "kromosomAyah")],
    [],
    [],
  ];
  isiMI[0][0].position.x = isiMI[1][0].position.x = -0.3;
  isiMI[0][1].position.x = isiMI[1][1].position.x = 0.3;
  const isiMII = [
    [kecil(studio, gamet[0], "kromatin"), kecil(studio, gamet[0], "kromatin")],
    [],
    [kecil(studio, gamet[2], "kromosomAyah")],
    [kecil(studio, gamet[3], "kromosomAyah")],
  ];
  isiMII[0][0].position.x = -0.3;
  isiMII[0][1].position.x = 0.3;
  const labelMI = ["n + 1", "n + 1", "n − 1", "n − 1"];
  const labelMII = ["n + 1", "n − 1", "n", "n"];
  const lG = [0, 1, 2, 3].map((i) => {
    const a = buatLabel(labelMI[i], 0.7);
    a.position.set(-0.5 + i * 3, Y - 1.9, 0.4);
    grup.add(a);
    const b = buatLabel(labelMII[i], 0.7);
    b.position.set(-0.5 + i * 3, Y - 1.9, 0.4);
    grup.add(b);
    return [a, b];
  });
  panah(studio, grup, [v(-4.4, Y, 0), v(-3.2, Y + 0.4, 0), v(-2, Y, 0)], 0.07);
  const lJudul = labelHidup(grup, "gagal berpisah di meiosis I", 0.65);
  const lJudul2 = labelHidup(grup, "gagal berpisah di meiosis II", 0.65);
  lantai(grup, 20, 5, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(-3, Y, 0, 17.5, 0, 1.4),
      gamet: lihat(-1.5, Y, 0, 17.5, 0, 1.4),
      dua: lihat(-1.5, Y, 0, 17.5, 0, 1.4),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 10 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const dua = f === "dua";
      const t = p.detik ?? 0;
      pasangan.forEach((k, i) => {
        k.position.set(-7 + (dua ? (i === 0 ? -0.4 : 0.4) : 0.2 * Math.sin(t) + (i === 0 ? -0.35 : 0.35)), Y, 0);
      });
      isiMI.flat().forEach((k) => (k.visible = !dua));
      isiMII.flat().forEach((k) => (k.visible = dua));
      lG.forEach(([a, b]) => {
        a.visible = !dua && f !== "utuh";
        b.visible = dua;
      });
      aturLabel(lJudul, !dua, dt, v(4, Y + 2.4, 0));
      aturLabel(lJudul2, dua, dt, v(4, Y + 2.4, 0));
    },
  };
}

/* ================================================================== *
 * ANEUPLOID — trisomi, monosomi, nulisomi
 * ================================================================== */

export function setAneuploid(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 3.4;
  const DATA: { kunci: string; judul: string; asal: AsalKromosom[] }[] = [
    { kunci: "normal", judul: "normal: 2n", asal: ["kromatin", "kromosomAyah"] },
    { kunci: "tri", judul: "trisomi: 2n + 1", asal: ["kromatin", "kromosomAyah", "kromatin"] },
    { kunci: "mono", judul: "monosomi: 2n − 1", asal: ["kromatin"] },
    { kunci: "nuli", judul: "nulisomi: 2n − 2", asal: [] },
  ];
  const fokus: Set3D["fokus"] = {};
  DATA.forEach((d, k) => {
    const x = (k - 1.5) * 5;
    /* dua pasang kromosom lain yang normal, lalu kromosom yang berubah */
    for (const [dx, pj] of [
      [-1.4, 1.4],
      [-0.9, 1.4],
    ] as const) kecil(studio, grup, dx < -1 ? "kromatin" : "kromosomAyah", pj, 0.2).position.set(x + dx, Y, 0);
    d.asal.forEach((a, i) => {
      const g = kecil(studio, grup, a, 2.6, 0.26);
      g.position.set(x + 0.2 + i * 0.6, Y, 0);
    });
    if (d.asal.length === 0) tulis(grup, "—", 0.9, x + 0.6, Y, 0.2);
    tulis(grup, d.judul, 0.5, x, Y - 2.4, 0.3);
    fokus[d.kunci] = lihat(x, Y - 0.4, 0, 9, 0, 1.4);
  });
  const ternak = new THREE.Group();
  grup.add(ternak);
  tulis(ternak, "sebagian besar embrio aneuploid gugur dini", 0.5, 0, Y + 2.6);
  tulis(ternak, "kuda betina 63,X: biasanya mandul", 0.5, 0, Y + 1.9);
  ternak.visible = false;
  fokus.utuh = lihat(0, Y - 0.4, 0, 20, 0, 1.4);
  fokus.ternak = lihat(0, Y, 0, 20, 0, 1.4);
  lantai(grup, 22, 4);
  return {
    grup,
    fokus,
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      ternak.visible = p.fokus === "ternak";
    },
  };
}

/* ================================================================== *
 * DOWN — kariotipe trisomi 21 dan usia ibu
 * ================================================================== */

export function setDown(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const L = 2.4;
  const Y = 4;
  KROMOSOM_MANUSIA.forEach((k, i) => {
    const baris = Math.floor(i / 11);
    const x = -11 + (i % 11) * 1.3;
    const y = baris === 0 ? Y + 1.4 : Y - 1.4;
    const n = k.nama === "21" ? 3 : 2;
    for (let s = 0; s < n; s++) {
      const g = new THREE.Group();
      g.position.set(x + (s - (n - 1) / 2) * 0.4, y, 0);
      grup.add(g);
      bangunKromosom(studio, g, { p: L * k.panjang * k.p, q: L * k.panjang * (1 - k.p), jari: 0.14, asal: s % 2 === 0 ? "kromatin" : "kromosomAyah" }, 1);
    }
    tulis(grup, k.nama, k.nama === "21" ? 0.5 : 0.34, x, y - 1.7, 0.2);
  });
  /* X dan X */
  const kel = new THREE.Group();
  kel.position.set(4.4, Y - 1.4, 0);
  grup.add(kel);
  (["kromatin", "kromosomAyah"] as const).forEach((a, i) => {
    const h = bangunKromosomKelamin(studio, kel, "X", { L: 2.4, asal: a, jari: 0.14, ukuranHuruf: 0.35 });
    h.grup.position.x = (i - 0.5) * 0.4;
  });
  const x21 = -11 + (20 % 11) * 1.3;
  const cincin = new THREE.TorusGeometry(0.9, 0.06, 8, 30);
  cincin.scale(1, 1.4, 1);
  cincin.translate(x21, Y - 1.4, 0.3);
  const lingkar = studio.tambah(bahan(studio, "cincin21", ["tinta"], "#1b2430", false), cincin, grup, false);
  tulis(grup, "47,XX,+21", 0.6, -4.5, Y + 3.4);
  /* grafik: peluang per 1.000 kelahiran menurut usia ibu */
  const grafik = new THREE.Group();
  grafik.position.set(9, 0, 0);
  grup.add(grafik);
  const DATA = [
    [20, 0.67],
    [25, 0.8],
    [30, 1.1],
    [35, 2.9],
    [40, 10],
  ];
  const bBatang = bahan(studio, "batangUsia", ["hitungan"], "#b9ae9c", 0.004);
  DATA.forEach(([usia, n], i) => {
    const h = n * 0.5;
    const b = new THREE.BoxGeometry(0.8, h, 0.6);
    b.translate(i * 1.3, 0.3 + h / 2, 0);
    studio.tambah(bBatang, b, grafik);
    tulis(grafik, `${usia}`, 0.45, i * 1.3, -0.2, 0.4);
    tulis(grafik, n < 1 ? "≈ 1/1.500" : n < 2 ? "≈ 1/900" : n < 5 ? "≈ 1/350" : "≈ 1/100", 0.36, i * 1.3, 0.3 + h + 0.4, 0.3);
  });
  tulis(grafik, "usia ibu (tahun)", 0.46, 2.6, -0.9, 0.4);
  grafik.visible = false;
  lantai(grup, 30, 6, -1);
  return {
    grup,
    fokus: {
      utuh: lihat(-3.5, Y, 0, 20, 0, 1.4),
      k21: lihat(x21, Y - 1.6, 0, 7, 0, 1.4),
      usia: lihat(8, 3, 0, 20, 0, 1.4),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 14 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      grafik.visible = f === "usia";
      lingkar.visible = f !== "usia";
    },
  };
}

/* ================================================================== *
 * KELAMIN ANEU — Turner dan Klinefelter
 * ================================================================== */

export function setKelaminAneu(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const acak = pembuatAcak(6);
  bangunSosok(studio, grup, { entitas: "p", label: "Turner: 45,X (perempuan)", x: -4.5, tinggi: 0.95, rambut: "#3b302b", keriting: false, panjang: true, baju: "#cbbfae", ukuranLabel: 0.55 }, acak);
  bangunSosok(studio, grup, { entitas: "l", label: "Klinefelter: 47,XXY (laki-laki)", x: 4.5, tinggi: 1.05, rambut: "#3b302b", keriting: true, baju: "#c4b8a6", ukuranLabel: 0.55 }, acak);
  const set = (x: number, isi: ("X" | "Y")[]) => {
    const g = new THREE.Group();
    g.position.set(x, 6.6, 0);
    grup.add(g);
    isi.forEach((j, i) => {
      const h = bangunKromosomKelamin(studio, g, j, { L: 4.5, asal: i % 2 === 0 ? "kromatin" : "kromosomAyah", jari: 0.26, ukuranHuruf: 0.55 });
      h.grup.position.x = (i - (isi.length - 1) / 2) * 1.1;
    });
  };
  set(-4.5, ["X"]);
  set(4.5, ["X", "X", "Y"]);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, 4.2, 0, 20, 0, 1.3),
      turner: lihat(-4.5, 4.2, 0, 13, -0.1, 1.3),
      klinefelter: lihat(4.5, 4.2, 0, 13, 0.1, 1.3),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
  };
}

/* ================================================================== *
 * PLOIDI — 2n, 3n, 4n, 6n; auto dan alo
 * ================================================================== */

/** Satu set kromosom (x = 3 jenis): panjang berbeda, satu warna set. */
function setN(studio: Studio, induk: THREE.Object3D, asal: AsalKromosom, x: number, y: number) {
  [2.2, 1.6, 1.1].forEach((pj, i) => {
    const g = kecil(studio, induk, asal, pj, 0.17);
    g.position.set(x + i * 0.42, y, 0);
  });
}

export function setPloidi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.8;
  const KOLOM: { judul: string; n: number; x: number }[] = [
    { judul: "diploid 2n", n: 2, x: -8 },
    { judul: "triploid 3n", n: 3, x: -3.5 },
    { judul: "tetraploid 4n", n: 4, x: 1 },
    { judul: "heksaploid 6n", n: 6, x: 6.5 },
  ];
  const utama = new THREE.Group();
  grup.add(utama);
  for (const k of KOLOM) {
    for (let s = 0; s < k.n; s++) setN(studio, utama, s % 2 === 0 ? "kromatin" : "kromosomAyah", k.x - 0.5 + (s % 2) * 1.5, Y + 1 - Math.floor(s / 2) * 2);
    tulis(utama, k.judul, 0.55, k.x + 0.5, Y - 5.4 + 3.4 - 1, 0.3);
  }
  /* auto vs alo */
  const alo = new THREE.Group();
  grup.add(alo);
  setN(studio, alo, "kromatin", -7.5, Y);
  setN(studio, alo, "kromatin", -6.3, Y);
  tulis(alo, "spesies A (AA)", 0.5, -6.5, Y - 1.8, 0.3);
  kali(alo, -4, Y, 0.3, 0.8);
  setN(studio, alo, "kromosomAyah", -2.2, Y);
  setN(studio, alo, "kromosomAyah", -1, Y);
  tulis(alo, "spesies B (BB)", 0.5, -1.2, Y - 1.8, 0.3);
  panah(studio, alo, [v(0.8, Y, 0), v(1.8, Y + 0.4, 0), v(2.8, Y, 0)], 0.07);
  setN(studio, alo, "kromatin", 3.4, Y + 1);
  setN(studio, alo, "kromosomAyah", 4.6, Y + 1);
  setN(studio, alo, "kromatin", 3.4, Y - 1);
  setN(studio, alo, "kromosomAyah", 4.6, Y - 1);
  tulis(alo, "alopoliploid AABB", 0.55, 4.4, Y - 2.8, 0.3);
  alo.visible = false;
  const auto = new THREE.Group();
  grup.add(auto);
  setN(studio, auto, "kromatin", -3, Y);
  setN(studio, auto, "kromatin", -1.8, Y);
  panah(studio, auto, [v(0, Y, 0), v(1, Y + 0.4, 0), v(2, Y, 0)], 0.07);
  for (let s = 0; s < 4; s++) setN(studio, auto, "kromatin", 2.8 + (s % 2) * 1.2, Y + 1 - Math.floor(s / 2) * 2);
  tulis(auto, "autopoliploid: AA → AAAA", 0.55, 0.6, Y - 2.8, 0.3);
  auto.visible = false;
  const tanaman = new THREE.Group();
  grup.add(tanaman);
  tulis(tanaman, "pisang 3n · kentang 4n · stroberi 8n", 0.6, 0, Y + 3.6, 0);
  tanaman.visible = false;
  lantai(grup, 22, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.5, Y, 0, 20, 0, 1.4),
      auto: lihat(0.5, Y, 0, 14, 0, 1.4),
      alo: lihat(-1.5, Y, 0, 17, 0, 1.4),
      tanaman: lihat(-0.5, Y + 0.6, 0, 20, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 11 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      utama.visible = f === "utuh" || f === "tanaman";
      alo.visible = f === "alo";
      auto.visible = f === "auto";
      tanaman.visible = f === "tanaman";
    },
  };
}

/* ================================================================== *
 * SEMANGKA
 * ================================================================== */

export function setSemangka(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const induk = new THREE.Group();
  grup.add(induk);
  const a = bangunSemangka(studio, induk, { biji: true });
  a.position.set(-5, 1.4, -1);
  const b = bangunSemangka(studio, induk, { biji: true });
  b.position.set(-1, 1.4, -1);
  tulis(induk, "tetraploid 4n", 0.5, -5, -0.2, 0.5);
  tulis(induk, "diploid 2n", 0.5, -1, -0.2, 0.5);
  kali(induk, -3, 1.5, 0, 0.8);
  panah(studio, grup, [v(1, 1.6, 0), v(2, 2, 0), v(3, 1.6, 0)], 0.07);
  const buah = new THREE.Group();
  grup.add(buah);
  const c = bangunSemangka(studio, buah, { biji: false, terbelah: true });
  c.position.set(5.4, 1.6, 0);
  tulis(buah, "triploid 3n: tanpa biji", 0.55, 5.4, -0.3, 0.5);
  const d = bangunSemangka(studio, buah, { biji: true, terbelah: true });
  d.position.set(9, 1.2, -0.6);
  d.scale.setScalar(0.7);
  tulis(buah, "diploid: berbiji", 0.45, 9, -0.2, 0.2);
  lantai(grup, 18, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(2, 2, 0, 19, 0, 1.35),
      induk: lihat(-3, 1.6, 0, 11, 0, 1.3),
      buah: lihat(6.8, 1.9, 0, 11, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      const t = p.detik ?? 0;
      a.rotation.y = b.rotation.y = t * 0.2;
    },
  };
}

/* ================================================================== *
 * KOLKISIN
 * ================================================================== */

export function setKolkisin(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4;
  const sel = selTembus(studio, grup, 3, "membranSel", SEL.membranSel.warna, "membranSel", 0.1);
  sel.position.set(0, Y, 0);
  const kromosom = [0, 1, 2, 3].map((i) => {
    const g = kecil(studio, grup, i % 2 === 0 ? "kromatin" : "kromosomAyah", 1.8, 0.22, 2);
    return g;
  });
  const benang = new THREE.Group();
  grup.add(benang);
  for (let i = 0; i < 6; i++) {
    const y = Y - 1.2 + i * 0.5;
    garis(studio, benang, v(-2.6, Y, 0), v(0, y, 0), 0.025, "#7d8791", "benang");
    garis(studio, benang, v(2.6, Y, 0), v(0, y, 0), 0.025, "#7d8791", "benang");
  }
  const lKolkisin = labelHidup(grup, "kolkisin: benang gelendong tak terbentuk", 0.5);
  const lGanda = labelHidup(grup, "tak membelah → set kromosom berlipat dua", 0.5);
  const jam = buatJamTahap();
  lantai(grup, 12, 6);
  return {
    grup,
    fokus: {
      utuh: lihat(0, Y, 0, 12, 0, 1.35),
      ganda: lihat(0, Y, 0, 12, 0, 1.35),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 7 },
    perbarui: (p, dt) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = f === "ganda" ? tahapan(j, 0, 1.5) : 0;
      benang.visible = f === "utuh" && j < 1.2;
      kromosom.forEach((k, i) => {
        const x = (i - 1.5) * 0.9;
        k.position.set(x * (1 + t * 0.4), Y + (i % 2 === 0 ? 0.4 : -0.4) * t, 0);
      });
      sel.scale.setScalar(pelan(sel.scale.x, 1 + t * 0.25, 4, dt));
      aturLabel(lKolkisin, f === "utuh", dt, v(0, Y - 3.6, 0.5));
      aturLabel(lGanda, f === "ganda", dt, v(0, Y - 3.8, 0.5));
    },
  };
}

/* ================================================================== *
 * GANDUM ROTI — AABBDD
 * ================================================================== */

export function setGandumRoti(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const bulir = new THREE.Group();
  bulir.position.set(-8, 0.2, 0);
  bulir.scale.setScalar(1.2);
  grup.add(bulir);
  bangunBulir(studio, bulir, 2);
  tulis(grup, "gandum roti (Triticum aestivum)", 0.5, -8, -0.5, 0.6);
  const genom = new THREE.Group();
  grup.add(genom);
  const GENOM: { h: string; asal: AsalKromosom; x: number }[] = [
    { h: "A", asal: "kromatin", x: -3 },
    { h: "B", asal: "kromosomAyah", x: 1.5 },
    { h: "D", asal: "kromatin", x: 6 },
  ];
  for (const d of GENOM) {
    for (let i = 0; i < 7; i++) {
      for (const s of [-1, 1]) {
        const g = kecil(studio, genom, d.asal, 1.2 + (i % 3) * 0.3, 0.13);
        g.position.set(d.x - 1.5 + i * 0.5 + s * 0.12, 4.6, 0);
      }
    }
    tulis(genom, `genom ${d.h}: 7 pasang`, 0.5, d.x, 2.6, 0.3);
  }
  tulis(genom, "3 × 14 = 42 kromosom (6n)", 0.6, 1.5, 6.6);
  lantai(grup, 22, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-1.5, 3.4, 0, 20, 0, 1.35),
      genom: lihat(1.5, 4.2, 0, 15, 0, 1.4),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 11 },
  };
}

/* ================================================================== *
 * STRUKTUR — delesi, duplikasi, inversi, translokasi, robertsonian
 * ================================================================== */

export function setStruktur(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const R = (h: string, asal?: AsalKromosom): Ruas => ({ h, asal });
  const NORMAL = ["A", "B", "C", "D", "E", "F", "G"].map((h) => R(h));
  const normal = bangunKromosomRuas(studio, grup, NORMAL, { sentromer: 2, hurufDiKiri: true });
  normal.position.set(-5, Y, 0);
  tulis(grup, "normal", 0.55, -5, Y + 3.8);
  const VARIAN: Record<string, { ruas: Ruas[]; judul: string; kedua?: Ruas[] }> = {
    delesi: { ruas: [R("A"), R("B"), R("E"), R("F"), R("G")], judul: "delesi: C–D hilang" },
    duplikasi: { ruas: [R("A"), R("B"), R("C"), R("D"), R("C"), R("D"), R("E"), R("F"), R("G")], judul: "duplikasi: C–D berulang" },
    inversi: { ruas: [R("A"), R("B"), R("E"), R("D"), R("C"), R("F"), R("G")], judul: "inversi: C–D–E terbalik" },
    translokasi: {
      ruas: [R("A"), R("B"), R("C"), R("D"), R("E"), R("Q", "kromosomAyah"), R("R", "kromosomAyah")],
      judul: "translokasi: ujung bertukar",
      kedua: [R("M", "kromosomAyah"), R("N", "kromosomAyah"), R("O", "kromosomAyah"), R("P", "kromosomAyah"), R("F"), R("G")],
    },
  };
  const varian: Record<string, THREE.Group> = {};
  for (const [k, d] of Object.entries(VARIAN)) {
    const g = new THREE.Group();
    grup.add(g);
    const c = bangunKromosomRuas(studio, g, d.ruas, { sentromer: 2 });
    c.position.set(1, Y, 0);
    if (d.kedua) {
      const c2 = bangunKromosomRuas(studio, g, d.kedua, { sentromer: 2 });
      c2.position.set(4, Y, 0);
    }
    tulis(g, d.judul, 0.55, 2, Y + 3.8);
    g.visible = false;
    varian[k] = g;
  }
  /* robertsonian: dua akrosentrik → satu */
  const rob = new THREE.Group();
  grup.add(rob);
  const ak = (x: number, asal: AsalKromosom, pj: number) => {
    const g = new THREE.Group();
    g.position.set(x, Y, 0);
    rob.add(g);
    bangunKromosom(studio, g, { p: 0.15, q: pj, jari: 0.4, asal }, 1);
    return g;
  };
  ak(-6, "kromatin", 3);
  ak(-4.5, "kromosomAyah", 1.6);
  tulis(rob, "akrosentrik 1 dan 29", 0.5, -5.2, Y - 3.8);
  panah(studio, rob, [v(-2.8, Y - 1, 0), v(-1.2, Y - 0.6, 0), v(0.4, Y - 1, 0)], 0.07);
  const gabung = new THREE.Group();
  gabung.position.set(2.5, Y, 0);
  rob.add(gabung);
  bangunKromosom(studio, gabung, { p: 1.6, q: 3, jari: 0.4, asal: "kromatin", silang: [{ kromatid: 0, dari: 0, sampai: 0.34 }] }, 1);
  tulis(rob, "rob(1;29)", 0.55, 2.5, Y - 3.8);
  rob.visible = false;
  lantai(grup, 14, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-2, Y + 0.5, 0, 16.5, 0, 1.4),
      delesi: lihat(-1.5, Y + 0.5, 0, 15.5, 0, 1.4),
      duplikasi: lihat(-1.5, Y + 0.5, 0, 16.5, 0, 1.4),
      inversi: lihat(-1.5, Y + 0.5, 0, 15.5, 0, 1.4),
      translokasi: lihat(-0.5, Y + 0.5, 0, 16.5, 0, 1.4),
      robertson: lihat(-1.5, Y - 0.6, 0, 14, 0, 1.4),
    },
    bayangan: { pusat: v(-1, 0, 0), jangkauan: 8 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      for (const [k, g] of Object.entries(varian)) g.visible = k === f;
      rob.visible = f === "robertson";
      normal.visible = f !== "robertson";
    },
  };
}

/* ================================================================== *
 * FUSI — kromosom 2 manusia
 * ================================================================== */

export function setFusi(studio: Studio): Set3D {
  const grup = new THREE.Group();
  const Y = 4.4;
  const kera = new THREE.Group();
  grup.add(kera);
  const k2a = new THREE.Group();
  k2a.position.set(-6.5, Y, 0);
  kera.add(k2a);
  bangunKromosom(studio, k2a, { p: 0.8, q: 2, jari: 0.4, asal: "kromatin" }, 1);
  const k2b = new THREE.Group();
  k2b.position.set(-4.5, Y, 0);
  kera.add(k2b);
  bangunKromosom(studio, k2b, { p: 1, q: 2.3, jari: 0.4, asal: "kromosomAyah" }, 1);
  tulis(kera, "simpanse: 2A dan 2B (48 kromosom)", 0.5, -5.5, Y - 3.4);
  const manusia = new THREE.Group();
  manusia.position.set(4, Y, 0);
  grup.add(manusia);
  bangunKromosom(studio, manusia, { p: 2.6, q: 3, jari: 0.4, asal: "kromatin", silang: [{ kromatid: 0, dari: 0.48, sampai: 1 }] }, 1);
  tulis(grup, "manusia: kromosom 2 (46 kromosom)", 0.5, 4, Y - 3.8);
  panah(studio, grup, [v(-2.8, Y, 0), v(-0.8, Y + 0.6, 0), v(1.8, Y, 0)], 0.08);
  const sisa = new THREE.Group();
  grup.add(sisa);
  const cincin = bahan(studio, "cincinSisa2", ["tinta"], "#1b2430", false);
  for (const [y, teks] of [
    [Y + 2.6 - 0.48 * 5.6 + 0.25, "sisa telomer (2q13)"],
    [Y - 1.8, "sisa sentromer kedua"],
  ] as const) {
    const r = new THREE.TorusGeometry(0.55, 0.05, 8, 24);
    r.translate(4, y, 0.4);
    studio.tambah(cincin, r, sisa, false);
    tulis(sisa, teks, 0.46, 6.6, y, 0.4);
  }
  sisa.visible = false;
  const jam = buatJamTahap();
  lantai(grup, 18, 5);
  return {
    grup,
    fokus: {
      utuh: lihat(-0.5, Y, 0, 17, 0, 1.4),
      fusi: lihat(-0.5, Y, 0, 17, 0, 1.4),
      sisa: lihat(4.5, Y, 0, 11, 0, 1.4),
    },
    bayangan: { pusat: v(0, 0, 0), jangkauan: 9 },
    perbarui: (p) => {
      const f = p.fokus ?? "utuh";
      const j = jam(p);
      const t = f === "fusi" ? tahapan(j, 0.2, 2) : 0;
      k2a.position.x = -6.5 + t * 1.2;
      k2b.position.x = -4.5 - t * 0.2;
      sisa.visible = f === "sisa";
    },
  };
}
