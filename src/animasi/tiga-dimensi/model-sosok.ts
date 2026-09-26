import * as THREE from "three";
import type { Studio } from "./studio";
import { bolaHalus } from "./bentuk";
import { buatLabel } from "./label3d";

/**
 * SOSOK MANUSIA — boneka kayu sederhana, dipakai 0.1 (keluarga) dan
 * Tingkat 2 ke atas (keluarga dan silsilah). Warna netral, selalu berlabel.
 */

const KULIT = "#e2b690";
const CELANA = "#7f7869";
const MATA = "#2a2522";

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export type Sosok = {
  entitas: string;
  label: string;
  x: number;
  tinggi: number;
  rambut: string;
  keriting: boolean;
  panjang?: boolean;
  baju: string;
  /** Warna kulit lain (misalnya albino); bawaan kulit sawo matang. */
  kulit?: string;
  ukuranLabel?: number;
  /** Botak di ubun-ubun: hanya lingkar rambut di belakang dan samping kepala. */
  botak?: boolean;
};

/** Sosok sederhana bergaya boneka kayu — tanpa wajah rinci, supaya ramah dan tidak menyeramkan. */
export function bangunSosok(studio: Studio, induk: THREE.Object3D, s: Sosok, acak: () => number) {
  const { bagian, tambah } = studio;
  const g = new THREE.Group();
  induk.add(g);
  const kulit = bagian(s.entitas, s.kulit ?? KULIT, { garis: 0.004 });
  const baju = bagian(s.entitas, s.baju, { garis: 0.004 });
  const celana = bagian(s.entitas, CELANA, { garis: 0.004 });
  const rambut = bagian(s.entitas, s.rambut, { garis: 0.004 });
  const mata = bagian(s.entitas, MATA, { garis: false });

  for (const x of [-0.3, 0.3]) {
    const kaki = new THREE.CapsuleGeometry(0.24, 1.25, 6, 14);
    kaki.translate(x, 0.87, 0);
    tambah(celana, kaki, g);
  }
  const badan = new THREE.CapsuleGeometry(0.6, 1.15, 8, 22);
  badan.translate(0, 2.5, 0);
  tambah(baju, badan, g);
  for (const sisi of [-1, 1]) {
    const lengan = new THREE.CapsuleGeometry(0.19, 1.05, 6, 12);
    lengan.rotateZ(sisi * 0.2);
    lengan.translate(sisi * 0.86, 2.4, 0);
    tambah(baju, lengan, g);
    const tangan = bolaHalus(0.21, 16, 12);
    tangan.translate(sisi * 1.0, 1.66, 0);
    tambah(kulit, tangan, g);
  }
  const Y_KEPALA = 4.0;
  const kepala = bolaHalus(0.62, 32, 24);
  kepala.translate(0, Y_KEPALA, 0);
  tambah(kulit, kepala, g);
  for (const x of [-0.2, 0.2]) {
    const m = new THREE.SphereGeometry(0.07, 10, 8);
    m.translate(x, Y_KEPALA + 0.04, 0.58);
    tambah(mata, m, g, false);
  }

  if (s.botak) {
    const lingkar = new THREE.SphereGeometry(0.66, 32, 12, Math.PI * 0.15, Math.PI * 1.7, Math.PI * 0.42, Math.PI * 0.2);
    lingkar.rotateY(Math.PI / 2);
    lingkar.translate(0, Y_KEPALA, 0);
    tambah(rambut, lingkar, g);
  } else if (s.keriting) {
    /* rambut ikal: gumpalan bola kecil di atas dan belakang kepala */
    for (let i = 0; i < 34; i++) {
      const kutub = acak() * Math.PI * 0.55;
      const sudut = acak() * Math.PI * 2;
      const d = v(Math.sin(kutub) * Math.cos(sudut), Math.cos(kutub), Math.sin(kutub) * Math.sin(sudut));
      if (d.z > 0.55 && d.y < 0.75) continue; // wajah tetap terbuka
      const bulir = bolaHalus(0.19 + acak() * 0.06, 12, 10);
      bulir.translate(d.x * 0.62, Y_KEPALA + d.y * 0.62, d.z * 0.62);
      tambah(rambut, bulir, g);
    }
  } else {
    const topi = new THREE.SphereGeometry(0.67, 32, 18, 0, Math.PI * 2, 0, Math.PI * 0.5);
    topi.translate(0, Y_KEPALA + 0.02, -0.03);
    tambah(rambut, topi, g);
    if (s.panjang) {
      const belakang = new THREE.CapsuleGeometry(0.55, 0.9, 8, 18);
      belakang.scale(1.08, 1, 0.55);
      belakang.translate(0, Y_KEPALA - 0.55, -0.32);
      tambah(rambut, belakang, g);
    }
  }
  g.scale.setScalar(s.tinggi);
  g.position.x = s.x;

  const label = buatLabel(s.label, s.ukuranLabel ?? 0.5);
  label.position.set(s.x, -0.45, 1.1);
  induk.add(label);
  return g;
}
