import * as THREE from "three";
import { INTI, SEL, ronaGelap } from "@/lib/warna";
import type { Studio } from "./studio";
import { bolaHalus } from "./bentuk";

/**
 * KROMOSOM 3D BERGARIS — dipakai pelajaran 0.5 sampai 0.8.
 *
 * Satu kromosom = satu atau dua kromatid. Tiap kromatid terdiri dari lengan
 * p (atas) dan lengan q (bawah) yang bertemu di sentromer; batangnya
 * menyempit di sentromer, beralur spiral (tanda serat yang tergulung rapat),
 * dan bertudung telomer di kedua ujung. Dua kromatid saudara menekuk
 * menjauhi satu sama lain dari sentromer — itulah huruf X.
 *
 * Warna: dari ibu = kromatin (ungu), dari ayah = kromosomAyah (toska) —
 * lihat catatan INTI di warna.ts. Pita gelap menandai letak gen yang sama
 * pada pasangan homolog. Potongan berwarna lain = hasil pindah silang.
 */

export type AsalKromosom = "kromatin" | "kromosomAyah";

export type OpsiKromosom = {
  /** Panjang lengan pendek (p) dan lengan panjang (q), dalam satuan. */
  p: number;
  q: number;
  jari?: number;
  asal: AsalKromosom;
  /** Pita letak gen, sebagai pecahan panjang dari ujung p (0) ke ujung q (1). */
  pita?: number[];
  /** Potongan hasil pindah silang pada kromatid tertentu (0 = kiri, 1 = kanan). */
  silang?: { kromatid: number; dari: number; sampai: number }[];
};

export type Kromatid3D = {
  grup: THREE.Group;
  lenganP: THREE.Group;
  lenganQ: THREE.Group;
};

export type Kromosom3D = {
  grup: THREE.Group;
  kromatid: Kromatid3D[];
  /** Simpul sentromer bersama — disembunyikan saat kromatid saudara berpisah. */
  simpul: THREE.Mesh;
  /** 0 = kedua kromatid rapat dan lurus, 1 = huruf X penuh. */
  buka: (t: number) => void;
};

/** Sudut tekuk lengan pada huruf X penuh (radian). */
const TEKUK = 0.24;

export function warnaAsal(asal: AsalKromosom) {
  return asal === "kromatin" ? SEL.kromatin.warna : INTI.kromosomAyah.warna;
}

export function lawanAsal(asal: AsalKromosom): AsalKromosom {
  return asal === "kromatin" ? "kromosomAyah" : "kromatin";
}

export function bangunKromosom(
  studio: Studio,
  induk: THREE.Object3D,
  o: OpsiKromosom,
  jumlahKromatid: 1 | 2 = 2,
): Kromosom3D {
  const grup = new THREE.Group();
  induk.add(grup);
  const jari = o.jari ?? 0.5;
  const geser = jari * 0.8;
  const kromatid: Kromatid3D[] = [];
  for (let k = 0; k < jumlahKromatid; k++) {
    const sisi = jumlahKromatid === 2 ? (k === 0 ? -1 : 1) : 0;
    const g = new THREE.Group();
    g.position.x = sisi * geser;
    grup.add(g);
    kromatid.push(bangunKromatid(studio, g, o, jari, k));
  }

  /* sentromer: simpul gelap yang menyatukan kromatid; tiap kromatid juga
     membawa manik sentromernya sendiri untuk saat mereka berpisah */
  const bahanSentromer = studio.bagian("sentromer", INTI.sentromer.warna, { garis: 0.003 });
  const bentukSimpul = bolaHalus(jari * 0.72, 20, 14);
  bentukSimpul.scale(jumlahKromatid === 2 ? 1.9 : 1.05, 0.85, 1.05);
  const simpul = studio.tambah(bahanSentromer, bentukSimpul, grup);
  for (const kr of kromatid) {
    const manik = bolaHalus(jari * 0.6, 16, 12);
    manik.scale(1, 0.85, 1);
    studio.tambah(bahanSentromer, manik, kr.grup);
  }

  const buka = (t: number) => {
    kromatid.forEach((kr, k) => {
      const sisi = kromatid.length === 2 ? (k === 0 ? -1 : 1) : 0;
      /* kromatid kiri menekuk ke kiri (lengan p berputar berlawanan jarum jam),
         kromatid kanan sebaliknya: kedua puncak tekukan bertemu di sentromer */
      kr.lenganP.rotation.z = -sisi * TEKUK * t;
      kr.lenganQ.rotation.z = sisi * TEKUK * t;
    });
  };
  buka(1);
  return { grup, kromatid, simpul, buka };
}

/** Satu kromatid: lengan p ke atas dan lengan q ke bawah dari sentromer (y = 0). */
function bangunKromatid(studio: Studio, induk: THREE.Object3D, o: OpsiKromosom, jari: number, nomor: number): Kromatid3D {
  const panjang = o.p + o.q;
  const fc = o.p / panjang;
  const jariPada = (y: number) => jari * (1 - 0.45 * Math.exp(-((y / (jari * 1.2)) ** 2)));
  const alur = teksturAlur();
  const lenganP = new THREE.Group();
  const lenganQ = new THREE.Group();
  induk.add(lenganP, lenganQ);
  const lenganUntuk = (f: number) => (f <= fc ? lenganP : lenganQ);
  const yDari = (f: number) => o.p - f * panjang;
  const silang = (o.silang ?? []).filter((s) => s.kromatid === nomor);
  const asalPada = (f: number) => (silang.some((s) => f > s.dari && f < s.sampai) ? lawanAsal(o.asal) : o.asal);

  /* batang dipotong di sentromer dan di batas pindah silang */
  const batas = new Set<number>([0, fc, 1]);
  for (const s of silang) {
    batas.add(THREE.MathUtils.clamp(s.dari, 0, 1));
    batas.add(THREE.MathUtils.clamp(s.sampai, 0, 1));
  }
  const urut = [...batas].sort((a, b) => a - b);
  for (let i = 0; i < urut.length - 1; i++) {
    const a = urut[i];
    const b = urut[i + 1];
    if (b - a < 1e-3) continue;
    const tengah = (a + b) / 2;
    const asal = asalPada(tengah);
    studio.tambah(
      studio.bagian([asal, "kromosom"], warnaAsal(asal), { timbul: alur, garis: 0.004 }),
      batangBerjari(yDari(a), yDari(b), jariPada, 18),
      lenganUntuk(tengah),
    );
  }

  /* pita gen: cincin gelap tipis melingkari kromatid */
  for (const f of o.pita ?? []) {
    const y = yDari(f);
    const r = jariPada(y) * 1.03;
    const cincin = new THREE.CylinderGeometry(r, r, jari * 0.3, 24, 1, true);
    cincin.translate(0, y, 0);
    const asal = asalPada(f);
    studio.tambah(
      studio.bagian([asal, "kromosom", "pita"], ronaGelap(warnaAsal(asal), 0.38), { garis: false, sisi: THREE.DoubleSide }),
      cincin,
      lenganUntuk(f),
      false,
    );
  }

  /* telomer: tudung di kedua ujung */
  const telomer = studio.bagian("telomer", INTI.telomer.warna, { garis: 0.003 });
  for (const [y, lengan] of [
    [o.p, lenganP],
    [-o.q, lenganQ],
  ] as const) {
    const g = bolaHalus(jari * 0.98, 20, 14);
    g.scale(1, 0.6, 1);
    g.translate(0, y, 0);
    studio.tambah(telomer, g, lengan);
  }
  return { grup: induk as THREE.Group, lenganP, lenganQ };
}

/** Batang tegak dari yA ke yB (yA > yB) dengan jari-jari yang berubah sepanjang y. */
function batangBerjari(yA: number, yB: number, jari: (y: number) => number, sisi: number) {
  const segmen = Math.max(8, Math.ceil((yA - yB) * 10));
  const posisi: number[] = [];
  const normal: number[] = [];
  const uv: number[] = [];
  const indeks: number[] = [];
  for (let i = 0; i <= segmen; i++) {
    const y = yA - ((yA - yB) * i) / segmen;
    const r = jari(y);
    const turunan = (jari(y + 0.01) - jari(y - 0.01)) / 0.02;
    for (let j = 0; j <= sisi; j++) {
      const a = (j / sisi) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      posisi.push(c * r, y, s * r);
      const n = new THREE.Vector3(c, -turunan, s).normalize();
      normal.push(n.x, n.y, n.z);
      uv.push(j / sisi, y * 0.9);
    }
  }
  for (let i = 0; i < segmen; i++) {
    for (let j = 0; j < sisi; j++) {
      const a = i * (sisi + 1) + j;
      const b = a + sisi + 1;
      indeks.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(posisi, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(normal, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indeks);
  return g;
}

/** Alur spiral miring — tanda bahwa kromatid adalah serat yang tergulung rapat. */
function teksturAlur() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  if (g) {
    g.fillStyle = "#808080";
    g.fillRect(0, 0, 64, 64);
    g.strokeStyle = "rgba(0,0,0,0.55)";
    g.lineWidth = 7;
    for (let k = -2; k < 4; k++) {
      g.beginPath();
      g.moveTo(0, k * 22);
      g.lineTo(64, k * 22 + 26);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/**
 * Ukuran relatif kromosom manusia (kromosom 1 = 1) dan letak sentromernya
 * (pecahan panjang lengan p). Pembulatan dari ideogram baku — cukup untuk
 * gambar kariotipe, bukan untuk pengukuran.
 */
export const KROMOSOM_MANUSIA: { nama: string; panjang: number; p: number }[] = [
  { nama: "1", panjang: 1.0, p: 0.49 },
  { nama: "2", panjang: 0.97, p: 0.39 },
  { nama: "3", panjang: 0.8, p: 0.46 },
  { nama: "4", panjang: 0.76, p: 0.28 },
  { nama: "5", panjang: 0.73, p: 0.27 },
  { nama: "6", panjang: 0.69, p: 0.35 },
  { nama: "7", panjang: 0.64, p: 0.37 },
  { nama: "8", panjang: 0.58, p: 0.31 },
  { nama: "9", panjang: 0.55, p: 0.33 },
  { nama: "10", panjang: 0.54, p: 0.3 },
  { nama: "11", panjang: 0.54, p: 0.39 },
  { nama: "12", panjang: 0.53, p: 0.27 },
  { nama: "13", panjang: 0.46, p: 0.16 },
  { nama: "14", panjang: 0.43, p: 0.17 },
  { nama: "15", panjang: 0.41, p: 0.18 },
  { nama: "16", panjang: 0.36, p: 0.42 },
  { nama: "17", panjang: 0.33, p: 0.31 },
  { nama: "18", panjang: 0.32, p: 0.24 },
  { nama: "19", panjang: 0.24, p: 0.45 },
  { nama: "20", panjang: 0.26, p: 0.44 },
  { nama: "21", panjang: 0.19, p: 0.27 },
  { nama: "22", panjang: 0.2, p: 0.29 },
];
export const KROMOSOM_X = { nama: "X", panjang: 0.62, p: 0.39 };
export const KROMOSOM_Y = { nama: "Y", panjang: 0.23, p: 0.3 };
