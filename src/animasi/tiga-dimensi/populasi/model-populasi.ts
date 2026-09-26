import * as THREE from "three";
import { BASA, type KodeBasa } from "@/lib/warna";
import type { Studio } from "../studio";
import { bolaHalus, tabung } from "../bentuk";
import { buatLabel } from "../label3d";
import { bahanBulu, type WarnaBulu } from "../model-hewan";
import { bahan, TINTA } from "../mendel/model-mendel";
import { garis, tulis } from "../mendel/bantu";

/**
 * BENDA-BENDA TINGKAT 6 — populasi dan terapan.
 *
 *  - kambing (Etawa, Kacang, Peranakan Etawa);
 *  - grafik garis dan batang di bidang xy;
 *  - gel elektroforesis dengan sumur, lajur, dan pita;
 *  - manik alel (untuk lungkang gen dan hanyutan genetik).
 */

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ================================================================== *
 * Kambing
 * ================================================================== */

export type OpsiKambing = { besar?: boolean; telingaPanjang?: boolean; dasar: WarnaBulu; belang?: WarnaBulu; janggut?: boolean };

/** Kambing menghadap +x. Etawa: besar, telinga panjang menggantung, muka cembung. */
export function bangunKambing(studio: Studio, induk: THREE.Object3D, o: OpsiKambing) {
  const g = new THREE.Group();
  induk.add(g);
  const s = o.besar ? 1.25 : 0.85;
  const dasar = bahanBulu(studio, o.dasar);
  const belang = o.belang ? bahanBulu(studio, o.belang) : dasar;
  const badan = new THREE.CapsuleGeometry(0.62, 1.5, 8, 18);
  badan.rotateZ(Math.PI / 2);
  badan.translate(0, 1.55, 0);
  studio.tambah(dasar, badan, g);
  const pantat = bolaHalus(0.55, 14, 10);
  pantat.translate(-0.95, 1.6, 0);
  studio.tambah(belang, pantat, g);
  for (const [x, z] of [
    [-0.8, -0.3],
    [-0.8, 0.3],
    [0.75, -0.3],
    [0.75, 0.3],
  ]) {
    const k = new THREE.CapsuleGeometry(0.14, 0.95, 6, 10);
    k.translate(x, 0.55, z);
    studio.tambah(dasar, k, g);
  }
  const leher = new THREE.CapsuleGeometry(0.3, 0.7, 6, 12);
  leher.rotateZ(-0.6);
  leher.translate(1.25, 2.1, 0);
  studio.tambah(dasar, leher, g);
  const kepala = bolaHalus(0.36, 18, 12);
  kepala.scale(1.45, 0.85, 0.75);
  if (o.telingaPanjang) kepala.rotateZ(-0.25);
  kepala.translate(1.75, 2.55, 0);
  studio.tambah(belang, kepala, g);
  for (const z of [-1, 1]) {
    const t = bolaHalus(0.2, 12, 8);
    if (o.telingaPanjang) {
      t.scale(0.45, 1.9, 0.25);
      t.translate(1.5, 2.2, z * 0.32);
    } else {
      t.scale(1.1, 0.35, 0.5);
      t.translate(1.45, 2.75, z * 0.35);
    }
    studio.tambah(belang, t, g);
    const m = bolaHalus(0.05, 8, 6);
    m.translate(1.95, 2.68, z * 0.22);
    studio.tambah(bahan(studio, "mataKambing", ["mata"], "#1d1a18", false), m, g, false);
    const tanduk = new THREE.ConeGeometry(0.06, 0.4, 8);
    tanduk.rotateZ(0.6);
    tanduk.translate(1.5, 2.95, z * 0.15);
    studio.tambah(bahan(studio, "tandukKambing", ["tanduk"], "#cdbf9f", 0.003), tanduk, g);
  }
  if (o.janggut) {
    const j = new THREE.ConeGeometry(0.1, 0.35, 8);
    j.rotateX(Math.PI);
    j.translate(2.1, 2.2, 0);
    studio.tambah(belang, j, g);
  }
  studio.tambah(dasar, tabung([v(-1.2, 1.85, 0), v(-1.4, 2.1, 0), v(-1.45, 2.3, 0)], 0.07, 8, 6), g);
  g.scale.setScalar(s);
  return g;
}

/* ================================================================== *
 * Grafik
 * ================================================================== */

export type Sumbu = { lebar: number; tinggi: number; judulX?: string; judulY?: string };

/** Sumbu x–y tinta; titik (0,0) di pojok kiri bawah grup. */
export function bangunSumbu(studio: Studio, induk: THREE.Object3D, s: Sumbu) {
  const g = new THREE.Group();
  induk.add(g);
  garis(studio, g, v(0, 0, 0), v(s.lebar, 0, 0), 0.035);
  garis(studio, g, v(0, 0, 0), v(0, s.tinggi, 0), 0.035);
  if (s.judulX) tulis(g, s.judulX, 0.42, s.lebar / 2, -0.7, 0.1);
  if (s.judulY) tulis(g, s.judulY, 0.42, -0.4, s.tinggi + 0.45, 0.1);
  return g;
}

/** Garis grafik dari titik-titik (koordinat grafik). Kembali: mesh tabung yang bisa diganti panjang tampaknya lewat drawRange. */
export function bangunGaris(studio: Studio, induk: THREE.Object3D, titik: THREE.Vector3[], warna = TINTA, jari = 0.05, kunci = "garisGrafik") {
  /* centripetal: tidak melampaui titik data (garis tidak menembus sumbu) */
  const kurva = new THREE.CatmullRomCurve3(titik, false, "centripetal");
  const geo = new THREE.TubeGeometry(kurva, Math.max(40, titik.length * 6), jari, 6);
  return studio.tambah(bahan(studio, `${kunci}-${warna}`, [kunci], warna, false), geo, induk, false);
}

/** Tampakkan sebagian tabung (0–1) dari awal — untuk garis yang "digambar". */
export function tampakSebagian(m: THREE.Mesh, u: number) {
  const g = m.geometry as THREE.BufferGeometry;
  const total = g.index ? g.index.count : g.attributes.position.count;
  const per = 6 * 6;
  g.setDrawRange(0, Math.max(0, Math.floor((total / per) * Math.min(1, Math.max(0, u)))) * per);
}

/* ================================================================== *
 * Gel elektroforesis
 * ================================================================== */

export type Gel = { grup: THREE.Group; pita: THREE.Mesh[][]; lajurX: number[]; tinggi: number };

/**
 * Lempeng gel mendatar (menghadap +z, agak dimiringkan oleh pemanggil).
 * `lajur[i]` = daftar panjang potongan (pasangan basa); letak pita ∝ −log(pb).
 */
export function bangunGel(studio: Studio, induk: THREE.Object3D, lajur: { nama: string; pb: number[] }[], o: { lebar?: number; tinggi?: number } = {}): Gel {
  const g = new THREE.Group();
  induk.add(g);
  const L = o.lebar ?? 9;
  const T = o.tinggi ?? 6;
  const lempeng = new THREE.BoxGeometry(L, T, 0.4);
  studio.tambah(bahan(studio, "gel", ["gel"], "#e6ece8", 0.004), lempeng, g);
  const langkah = L / (lajur.length + 1);
  const lajurX = lajur.map((_, i) => -L / 2 + langkah * (i + 1));
  const bSumur = bahan(studio, "sumur", ["gel"], "#b8c2bd", false);
  const bPita = bahan(studio, "pita", ["pitaDNA"], "#39424c", false);
  const pita = lajur.map((d, i) => {
    const s = new THREE.BoxGeometry(langkah * 0.6, 0.25, 0.45);
    s.translate(lajurX[i], T / 2 - 0.45, 0.02);
    studio.tambah(bSumur, s, g, false);
    tulis(g, d.nama, 0.45, lajurX[i], T / 2 + 0.5, 0.3);
    return d.pb.map((pb) => {
      const m = studio.tambah(bPita, new THREE.BoxGeometry(langkah * 0.58, 0.13, 0.08), g, false);
      m.userData.pb = pb;
      m.position.set(lajurX[i], T / 2 - 0.45, 0.24);
      return m;
    });
  });
  tulis(g, "−", 0.8, -L / 2 - 0.5, T / 2 - 0.4, 0.3);
  tulis(g, "+", 0.8, -L / 2 - 0.5, -T / 2 + 0.4, 0.3);
  return { grup: g, pita, lajurX, tinggi: T };
}

/** Letak akhir pita menurut panjangnya (log): 100 pb jauh di bawah, 3.000 pb dekat sumur. */
export const yPita = (pb: number, T: number) => {
  const u = (Math.log10(3000) - Math.log10(pb)) / (Math.log10(3000) - Math.log10(80));
  return T / 2 - 0.9 - u * (T - 1.6);
};

/** Gerakkan pita: u = 0 di sumur, u = 1 di letak akhirnya. */
export function jalankanGel(gel: Gel, u: number) {
  for (const lajur of gel.pita)
    for (const m of lajur) {
      const akhir = yPita(m.userData.pb as number, gel.tinggi);
      m.position.y = THREE.MathUtils.lerp(gel.tinggi / 2 - 0.45, akhir, u);
      m.visible = u > 0.02;
    }
}

/* ================================================================== *
 * Manik alel
 * ================================================================== */

export const bahanManik = (studio: Studio, b: KodeBasa) => bahan(studio, `manik-${b}`, [`basa${b}`], BASA[b].warna, 0.003);

export function bangunManik(studio: Studio, induk: THREE.Object3D, b: KodeBasa, r = 0.22) {
  return studio.tambah(bahanManik(studio, b), bolaHalus(r, 12, 8), induk);
}

/** Label angka yang ikut bergerak — praktis untuk grafik batang. */
export function labelAngka(induk: THREE.Object3D, teks: string, ukuran = 0.4) {
  const l = buatLabel(teks, ukuran);
  induk.add(l);
  return l;
}
