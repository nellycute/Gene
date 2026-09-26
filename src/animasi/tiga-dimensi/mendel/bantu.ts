import * as THREE from "three";
import type { PropsAnimasi } from "../../daftar";
import type { Studio } from "../studio";
import { bolaHalus, lantaiBayang, teksturBayang } from "../bentuk";
import { buatLabel } from "../label3d";
import { bangunKromosom, type AsalKromosom, type Kromosom3D } from "../model-kromosom";
import { mulus, v } from "../rangkai-set";
import { bahan, KERTAS, TINTA } from "./model-mendel";

/**
 * Bantuan kecil yang dipakai set-set film Mendel.
 */

export const KAYU = "#b49a7b";
export const TANAH = "#c9b394";

/** Nilai 0 → 1 yang bergerak halus; disimpan di userData benda itu sendiri. */
export function muncul(o: THREE.Object3D, tampak: boolean, dt: number, skala = 1, laju = 4) {
  const n = (o.userData.nilai as number | undefined) ?? 0;
  const baru = n + ((tampak ? 1 : 0) - n) * Math.min(1, dt * laju);
  o.userData.nilai = baru;
  o.visible = baru > 0.01;
  o.scale.setScalar(Math.max(0.001, mulus(baru) * skala));
  return baru;
}

/** Bagian 0–1 dari sebuah gerakan yang mulai di `mulai` detik dan berlangsung `lama` detik. */
export const tahapan = (jam: number, mulai: number, lama: number) => mulus((jam - mulai) / lama);

export function lantai(grup: THREE.Object3D, lebar: number, dalam: number, x = 0) {
  const m = lantaiBayang(teksturBayang(), lebar, dalam, 0.01);
  /* lebih samar dari bawaan: set Mendel dilihat dari sudut rendah, bayangan
     memanjang jadi terlihat seperti pita gelap */
  (m.material as THREE.MeshBasicMaterial).opacity = 0.16;
  m.position.x = x;
  grup.add(m);
}

export function tulis(induk: THREE.Object3D, teks: string, ukuran: number, x: number, y: number, z = 0) {
  const l = buatLabel(teks, ukuran);
  l.position.set(x, y, z);
  induk.add(l);
  return l;
}

/** Tulisan yang menempel datar di permukaan (sisi koin, papan) — ikut berputar bersama bendanya. */
export function teksDatar(teks: string, tinggi: number, warna = "#1b2430") {
  const c = document.createElement("canvas");
  const lebar = Math.max(128, teks.length * 72);
  c.width = lebar;
  c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    g.font = "700 96px system-ui, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = warna;
    g.fillText(teks, lebar / 2, 68);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const b = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false });
  b.userData.outlineParameters = { visible: false };
  return new THREE.Mesh(new THREE.PlaneGeometry((lebar / 128) * tinggi, tinggi), b);
}

/** Papan kertas berdiri di atas dua kaki kayu — tempat diagram (Punnett, tabel). */
export function papanBerdiri(studio: Studio, induk: THREE.Object3D, lebar: number, tinggi: number, x: number, yTengah: number, z = 0) {
  const g = new THREE.Group();
  induk.add(g);
  const papan = new THREE.BoxGeometry(lebar, tinggi, 0.14);
  papan.translate(x, yTengah, z - 0.12);
  studio.tambah(bahan(studio, "papan", ["papan"], KERTAS, 0.004), papan, g);
  const kayu = bahan(studio, "kayu", ["papan"], KAYU, 0.004);
  const bawah = yTengah - tinggi / 2;
  for (const s of [-1, 1]) {
    const kaki = new THREE.CylinderGeometry(0.09, 0.11, bawah + 0.4, 10);
    kaki.translate(x + s * (lebar / 2 - 0.6), (bawah + 0.4) / 2, z - 0.3);
    studio.tambah(kayu, kaki, g);
  }
  return g;
}

/** Garis tinta lurus a → b. */
export function garis(studio: Studio, induk: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, jari = 0.04, warna = TINTA, kunci = "tinta") {
  const g = new THREE.CylinderGeometry(jari, jari, a.distanceTo(b), 8);
  g.applyMatrix4(
    new THREE.Matrix4().compose(
      a.clone().add(b).multiplyScalar(0.5),
      new THREE.Quaternion().setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize()),
      v(1, 1, 1),
    ),
  );
  return studio.tambah(bahan(studio, `garis-${kunci}-${warna}`, [kunci], warna, false), g, induk, false);
}

/** Tanda × di antara dua induk persilangan. */
export const kali = (induk: THREE.Object3D, x: number, y: number, z = 0, ukuran = 0.9) => tulis(induk, "×", ukuran, x, y, z);

/** Sel pembungkus tembus pandang (sel tanaman, sel induk gamet). */
export function selTembus(studio: Studio, induk: THREE.Object3D, r: number, kunci = "selInduk", warna = "#e9e3d6", entitas = kunci, tembus = 0.18) {
  return studio.tambah(bahan(studio, kunci, [entitas], warna, 0.003, tembus, THREE.DoubleSide), bolaHalus(r, 40, 28), induk, false);
}

/**
 * Satu kromosom homolog beserta huruf alelnya — bisa digeser sendiri
 * (segregasi, asortasi). Sentromer di titik asal grup; huruf di sisi `sisi`.
 */
export type Homolog = { grup: THREE.Group; kromosom: Kromosom3D; huruf: THREE.Sprite };

export function bangunHomolog(
  studio: Studio,
  induk: THREE.Object3D,
  alel: string,
  asal: AsalKromosom,
  o: { p?: number; q?: number; lokus?: number; kromatid?: 1 | 2; sisi?: -1 | 1; ukuranHuruf?: number; jari?: number } = {},
): Homolog {
  const grup = new THREE.Group();
  induk.add(grup);
  const p = o.p ?? 0.9;
  const q = o.q ?? 1.6;
  const lokus = o.lokus ?? 0.62;
  const jari = o.jari ?? 0.3;
  const kromosom = bangunKromosom(studio, grup, { p, q, jari, asal }, o.kromatid ?? 1);
  if (o.kromatid === 2) kromosom.buka(0.35);
  /* penanda lokus: gelang terang yang tebal — pita gelap bawaan kromosom
     terlalu samar di warna ungu/toska tua */
  const yLokus = p - lokus * (p + q);
  const gelang = bahan(studio, "gelangLokus", ["lokus"], "#f6f1e6", 0.003);
  for (const kr of kromosom.kromatid) {
    const c = new THREE.CylinderGeometry(jari * 1.12, jari * 1.12, jari * 0.55, 24);
    c.translate(0, yLokus, 0);
    studio.tambah(gelang, c, lokus <= p / (p + q) ? kr.lenganP : kr.lenganQ);
  }
  const huruf = buatLabel(alel, o.ukuranHuruf ?? 0.55);
  huruf.position.set((o.sisi ?? 1) * ((o.kromatid === 2 ? 0.55 : 0.3) + 0.4), yLokus, 0.2);
  grup.add(huruf);
  return { grup, kromosom, huruf };
}

/** Nomor adegan di dalam pelajaran (dari kunci gambar "indeks:isyarat"). */
export const nomorAdegan = (p: PropsAnimasi) => Number((p.kunci ?? "0").split(":")[0]) || 0;
